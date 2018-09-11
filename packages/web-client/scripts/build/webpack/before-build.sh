#!/bin/bash

# Keep in sync with $PROJECT/packages/shared/scripts/path/readlinkf.sh
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

PACKAGE=`readlinkf "$(dirname "$(readlinkf "${BASH_SOURCE[0]}")")/../../.."`

if [[ $NODE_ENV != "production" ]]; then
  vendor_manifest_path="$PACKAGE/build/webpack/vendor-manifest.json"

  if [ ! -f $vendor_manifest_path ]; then
    webpack_path="$PACKAGE/node_modules/.bin/webpack"
    webpack_vendor_config="$PACKAGE/resources/build/webpack/vendor.config.js"

    node --max_old_space_size=1000 "$webpack_path" --config "$webpack_vendor_config"
  fi
fi

