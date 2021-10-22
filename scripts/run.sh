#!/bin/bash

ROOTDIR="$(cd "$(dirname "${0}")/.." && pwd)"
readonly ROOTDIR

function main() {
  if [[ -e "${ROOTDIR}/dashboard" ]]; then
    echo "> Cleaning up old build state..."
    rm "${ROOTDIR}/dashboard"
  fi

  local dir
  dir="$(mktemp -d)"

  echo "> Building..."
  bash "${ROOTDIR}/scripts/build.sh" --output "${dir}/dashboard"

  echo "> Running ${dir}/dashboard..."
  "${dir}/dashboard"
}

main "${@:-}"
