#!/usr/bin/env bash

update_json() {
  local filter="$1"
  local file="$2"
  local tmp="$(mktemp)"

  if [ ! -f "$file" ] ; then
    echo '{}' > "$file"
  fi

  jq "$filter" "$file" > "$tmp" && mv -f "$tmp" "$file"
}

# ------------------------------------------------------------------------------

task:index() {
  local tasks=(
    'build'
    'check'
    'clean'
    'dev'
    'lint'
    'preview'
    'reinstall'
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

task:build() {
  task:clean

  echo
  echo "Compiling TypeScript for production..."
  npx vite build

  echo
  echo "Generating types definition file..."
  npx tsup ./src/lib/ntml.ts --dts-only
  # npx tsup ./src/lib/ntml.ts --dts-only --legacy-output
  # https://github.com/vitejs/vite/issues/3461#issuecomment-857125201

  # echo
  # echo "Minifying and gzipping ES modules..."
  # npx terser --ecma 6 --compress --mangle --module --output ./dist/ntml.es.min.js -- ./dist/ntml.es.js
  # gzip --best --to-stdout ./dist/ntml.es.min.js > ./dist/ntml.es.min.js.gz
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
  rm -fr ./dist
}

# ------------------------------------------------------------------------------

task:dev() {
  npx vite
}

# ------------------------------------------------------------------------------

task:lint() {
  echo
  echo "Linting..."
  npx eslint ./src --ext .js,.jsx,.ts,.tsx
}

# ------------------------------------------------------------------------------

task:preview() {
  npx vite preview
}

# ------------------------------------------------------------------------------

task:reinstall() {
  echo
  echo "Reinstalling dependencies..."

  rm ./package-lock.json
  rm -fr ./node_modules

  update_json '.dependencies = {} | .devDependencies = {}' ./package.json

  local dev_modules=()

  # Language
  dev_modules+=('typescript')
  dev_modules+=('terser')
  dev_modules+=('tsup')

  # Linting
  dev_modules+=('eslint')
  dev_modules+=('@typescript-eslint/parser')
  dev_modules+=('@typescript-eslint/eslint-plugin')
  # dev_modules+=('eslint-plugin-import')
  # dev_modules+=('eslint-plugin-json')
  # dev_modules+=('eslint-plugin-node')
  # dev_modules+=('eslint-plugin-promise')
  # dev_modules+=('eslint-config-prettier')
  # dev_modules+=('eslint-plugin-prettier')
  # dev_modules+=('eslint-config-standard')
  # dev_modules+=('eslint-plugin-standard')
  # dev_modules+=('eslint-import-resolver-typescript')
  # dev_modules+=('prettier')

  # Testing
  dev_modules+=('tsd')
  # dev_modules+=('jest')
  # dev_modules+=('@types/jest')
  # dev_modules+=('ts-jest')
  # dev_modules+=('fast-check')

  # Building
  dev_modules+=('rollup')
  dev_modules+=('vite')

  npm install --save-dev "${dev_modules[@]}"

  local modules=()

  modules+=('hyperapp')

  npm install --save "${modules[@]}"
}

# ------------------------------------------------------------------------------

# https://github.com/sindresorhus/np#release-script
task:release() {
  task:build
  echo
  echo "Releasing..."
  np --no-2fa
}

# ------------------------------------------------------------------------------

task:reset() {
  task:reinstall
  task:clean
}

# ------------------------------------------------------------------------------

task:test() {
  # TODO:
  return
  # npx jest
}

# ------------------------------------------------------------------------------

if [ -z "$1" ] ; then
  task:index
  exit 1
fi

"task:$1"
