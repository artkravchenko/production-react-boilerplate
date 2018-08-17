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

if [ -z $ENV_CONFIG_PATH ]; then
  env_file="$PACKAGE/resources/deployment/.env"
else
  env_file=$ENV_CONFIG_PATH
fi

if [ ! -f $env_file ]; then
  # echo "Config file has not been found: $env_file"
  exit 1
fi

env_kv_lines=$(grep '=' "$env_file" | sed -e 's/#.*//; s/\s*$//; /=$/d; /^$/d')

if [ -d "$env_kv_lines" ]; then
  exit
fi

while read env_kv; do
  env_key=$(sed 's/=.*$//' <<< $env_kv)

  if [ -z $(printenv $env_key) ]; then
    # export $env_kv
    echo "export $env_kv"
  fi
done <<< $env_kv_lines
