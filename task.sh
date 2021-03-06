#!/usr/bin/env bash

task:index() {
  local tasks=(
    'build:dev'
    'build:prod'
    'check'
    'clean'
    'lint'
    'lint:fix'
    'lint:fix-dry-run'
    'release'
    'reset'
    'test'
  )

  echo "Available tasks:"

  for task in ${tasks[@]} ; do
    echo -e "\t$task"
  done
}

# ------------------------------------------------------------------------------

task:build:dev() {
  task:clean

  echo
  echo "Compiling TypeScript for development..."
  npx tsc --build

  # Exit if errors found.
  [ $? != 0 ] && return

  npx rollup --config

  echo
  echo "Copying compiled JavaScript to the distribution folder..."
  # https://stackoverflow.com/a/1313688/1935675
  rsync --archive ./output/typescript/ ./dist --exclude=tsconfig.tsbuildinfo
}

# ------------------------------------------------------------------------------

task:build:prod() {
  task:clean

  echo
  echo "Compiling TypeScript for production..."
  npx tsc --build --incremental false

  # Exit if errors found.
  [ $? != 0 ] && return

  npx rollup --config --environment prod

  echo
  echo "Copying compiled JavaScript to the distribution folder..."
  # https://stackoverflow.com/a/1313688
  rsync --archive ./output/typescript/ ./dist --exclude=tsconfig.tsbuildinfo

  echo
  echo "Minifying and gzipping ES modules..."
  npx terser --ecma 6 --compress --mangle --module --output ./dist/index.esm.min.js -- ./dist/index.esm.js
  gzip --best --to-stdout ./dist/index.esm.min.js > ./dist/index.esm.min.js.gz

  # echo
  # echo "Minifying and gzipping UMD modules..."
  # npx terser --ecma 6 --compress --mangle --output ./dist/index.umd.min.js -- ./dist/index.umd.js
  # gzip --best --to-stdout ./dist/index.umd.min.js > ./dist/index.umd.min.js.gz
}

# ------------------------------------------------------------------------------

task:check() {
  echo
  echo "Typechecking TypeScript code..."
  npx tsc --noEmit --incremental false
}

# ------------------------------------------------------------------------------

task:clean() {
  echo
  echo "Cleaning the distribution folder..."
  rm -fr ./dist && mkdir ./dist
}

# ------------------------------------------------------------------------------

task:lint() {
  echo
  echo "Linting..."
  npx eslint ./src --ext .js,.jsx,.ts,.tsx
}

# ------------------------------------------------------------------------------

task:lint:fix() {
  echo
  echo "Linting and automatically fixing as much as possible..."
  npx eslint ./src --ext .js,.jsx,.ts,.tsx --fix
}

# ------------------------------------------------------------------------------

task:lint:fix-dry-run() {
  echo
  echo "Linting and doing a dry-run of automatically fixing as much as possible..."
  npx eslint ./src --ext .js,.jsx,.ts,.tsx --fix-dry-run
}

# ------------------------------------------------------------------------------

# https://github.com/sindresorhus/np#release-script
task:release() {
  echo
  echo "Releasing..."
  np
}

# ------------------------------------------------------------------------------

# From `webdev-scaffolding`.
update_json() {
  local filter="$1"
  local file="$2"
  local tmp="$(mktemp)"

  if [ ! -f "$file" ] ; then
    echo '{}' > "$file"
  fi

  jq "$filter" "$file" > "$tmp" && mv -f "$tmp" "$file"
}

task:reset() {
  echo
  echo "Resetting dependencies..."

  rm ./package-lock.json
  rm -fr ./node_modules
  rm -fr ./output

  update_json '.dependencies = {} | .devDependencies = {}' ./package.json

  npm install --save hyperapp
  npm install --save-dev typescript rollup eslint terser prettier
  npm install --save-dev eslint-plugin-import eslint-plugin-json eslint-plugin-node eslint-plugin-promise
  npm install --save-dev eslint-config-prettier eslint-plugin-prettier
  npm install --save-dev eslint-config-standard eslint-plugin-standard
  npm install --save-dev eslint-import-resolver-typescript
  npm install --save-dev @typescript-eslint/eslint-plugin @typescript-eslint/parser
  npm install --save-dev tsd
  # npm install --save-dev jest ts-jest

  task:clean
}

# ------------------------------------------------------------------------------

task:test() {
  return

  # TODO:
  # echo "Error: no test specified" && exit 1
}

# ------------------------------------------------------------------------------

if [ -z "$1" ] ; then
  task:index
  exit 1
fi

"task:$1"
