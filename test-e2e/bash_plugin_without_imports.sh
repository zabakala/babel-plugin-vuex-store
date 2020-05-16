#!/usr/bin/env bash

node_modules/.bin/cross-env
  PAGE_TITLE="Plugin - Imports - No" \
  FILE=/../app/vue-plugin/without-imports/index.html \
  STATIC=dist \
  SCRIPT=dist \
  npm test
