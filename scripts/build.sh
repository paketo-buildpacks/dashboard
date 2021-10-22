#!/bin/bash

ROOTDIR="$(cd "$(dirname "${0}")/.." && pwd)"
readonly ROOTDIR

function main() {
  local output

  while [[ "${#}" != 0 ]]; do
    case "${1}" in
      --output)
        output="${2}"
        shift 2
        ;;

      "")
        # skip if the argument is empty
        shift 1
        ;;

      *)
        util::print::error "unknown argument \"${1}\""
    esac
  done

  if [[ -z "${output}" ]]; then
    echo "--output is a required flag"
    exit 1
  fi

  pushd "${ROOTDIR}/web" > /dev/null || return
    yarn install
    yarn run build
  popd > /dev/null || return

  go build -o "${output}" .
}

main "${@:-}"
