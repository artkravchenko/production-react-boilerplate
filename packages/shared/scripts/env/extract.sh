#!/bin/bash

readlinkf() {
  TARGET_FILE=$1

  cd `dirname $TARGET_FILE`
  TARGET_FILE=`basename $TARGET_FILE`

  # Iterate down a (possible) chain of symlinks
  while [ -L "$TARGET_FILE" ]
  do
    TARGET_FILE=`readlink $TARGET_FILE`
    cd `dirname $TARGET_FILE`
    TARGET_FILE=`basename $TARGET_FILE`
  done

  # Compute the canonicalized name by finding the physical path 
  # for the directory we're in and appending the target file.
  PHYS_DIR=`pwd -P`
  RESULT=$PHYS_DIR/$TARGET_FILE
  echo $RESULT
}

PACKAGE=`readlinkf "$(dirname "$(readlinkf "${BASH_SOURCE[0]}")")/../.."`

if [ -z "$ENV_CONFIG_PATH" ]; then
  env_file="$PACKAGE/resources/deployment/.env"
else
  env_file=$ENV_CONFIG_PATH
fi

if [ ! -f "$env_file" ]; then
  # echo "Config file has not been found: $env_file"
  exit 1
fi

env_kv_lines=$(grep '=' "$env_file" | sed -e 's/#.*//; s/\s*$//; /=$/d; /^$/d')

if [ -z "$env_kv_lines" ]; then
  exit
fi

template_envs=()

# Iterate through non-empty envs' key=value pairs from $env_file:
# export fulfilled ones (i.e. without nested vars) and
# push the others to $template_envs
env_key_pattern=[A-Za-z0-9_]
env_pattern='\$((\{'$env_key_pattern+'\})|('$env_key_pattern+'))'

while read env_kv; do
  env_key=$(sed 's/=.*$//' <<< "$env_kv")

  if [ ! -z "$(printenv $env_key)" ]; then
    continue
  fi

  env_value=$(sed 's/^.*=//' <<< "$env_kv")

  if [[ "$env_value" =~ $env_pattern ]]; then
    # Replace ${...} with $...
    env_value=$(sed -e 's/\${\([^}]*\)}/\$\1/g' <<< "$env_value")
    next_env_kv="$env_key=$env_value"

    template_envs+=("$next_env_kv")
    continue
  fi

  export "$env_kv"
  echo "export $env_kv"
done <<< $env_kv_lines

# Produce default values of env variables
# which are dynamic from one user to another
# if they're still unset (not exported) after previous step

default_envs=()

if [ -z "$(printenv "PROJECT_ROOT_PATH")" ]; then
  project_root_path="$PACKAGE/../.."
  default_envs+=("PROJECT_ROOT_PATH=$project_root_path")
fi

for env_kv in "${default_envs[@]}"; do
  env_key=$(sed 's/=.*$//' <<< "$env_kv")

  if [ -z "$(printenv $env_key)" ]; then
    export "$env_kv"
    echo "export $env_kv"
  fi
done

counter=${#template_envs[@]}

while [ ! "${#template_envs[@]}" -eq 0 ] && [ "$counter" -gt 0 ]; do
  next_template_envs=()

  for env_kv in "${template_envs[@]}"; do
    env_key=$(sed 's/=.*$//' <<< $env_kv)
    
    if [ ! -z "$(printenv $env_key)" ]; then
      continue
    fi

    env_val=$(sed 's/^.*=//' <<< $env_kv)
    env_refs=$(grep -Eo $env_pattern <<< "$env_val")

    if [ -z "$env_refs" ]; then
      continue
    fi

    next_env_val="$env_val"

    while read env_ref; do
      ref_env_key=$(grep -Eo $env_key_pattern+ <<< "$env_ref")

      ref_env_val=$(printenv $ref_env_key)
      ref_env_val=$(sed 's/\//\\\//g' <<< "$ref_env_val")

      if [ ! -z "$ref_env_val" ]; then
        # Replace $ref_env_key at the start of a line
        next_env_val=$(sed 's/^\$'"$ref_env_key"'/'"$ref_env_val"'/g' <<< "$next_env_val")

        # Replace x$ref_env_key unless x is a backslash
        next_env_val=$(sed 's/\([^\\]\)\$'"$ref_env_key"'/\1'"$ref_env_val"'/g' <<< "$next_env_val")
      fi
    done <<< $env_refs

    env_refs=$(grep -Eo $env_pattern <<< "$next_env_val")
    next_env_kv="$env_key=$next_env_val"

    if [ ! -z "$env_refs" ]; then
      next_template_envs+=("$next_env_kv")
      continue
    fi

    export "$next_env_kv"
    echo "export $next_env_kv"
  done

  let "counter -= 1"
  template_envs=("${next_template_envs[@]}")
done

if [ "${#template_envs[@]}" -eq 0 ]; then
  exit 1
fi

for env_kv in "${template_envs[@]}"; do
  # Replace $... with empty string since it wasn't in the env
  env_val=$(sed 's/^.*=//' <<< "$env_kv")
  env_val=$(sed 's/^\$\('"$env_key_pattern"'*\)}//g' <<< "$env_val")
  env_val=$(sed 's/\([^\\]\)\$\('"$env_key_pattern"'*\)/\1/g' <<< "$env_val")

  env_key=$(sed 's/=.*$//' <<< "$env_kv")
  next_env_kv="$env_key=$env_val"

  export "$next_env_kv"
  echo "export $next_env_kv"
done
