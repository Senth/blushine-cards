#!/bin/bash

source .env

DIST_JS=dist/bundle.js

# Always build the bundle
yarn build

# Check that WWW_DIR has been set and exists
if [ -z "$WWW_DIR" ]; then
  echo "WWW_DIR is not set"
  exit 1
elif [ ! -d "$WWW_DIR" ]; then
  echo "WWW_DIR does not exist: $WWW_DIR"
  exit 1
fi

# Copy the bundle to WWW_DIR
cp "$DIST_JS" "$WWW_DIR/blushine-cards-dev.js"
