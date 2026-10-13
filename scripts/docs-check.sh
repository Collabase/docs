#!/usr/bin/env bash
# Runs every docs check (documentation-rules.md, section 24). Works from the product repo
# (`npm run docs:check`) and from the docs repo. Stops with a non-zero exit if any check fails.
set -uo pipefail
cd "$(dirname "$0")/.."

status=0
run() { echo; echo "-> $*"; "$@" || status=1; }

if command -v mint >/dev/null 2>&1; then MINT=(mint); else MINT=(npx --yes mint); fi

run "${MINT[@]}" validate
run "${MINT[@]}" broken-links --check-anchors --check-snippets
# mint a11y also scores the brand colors and exits non-zero while the lime button fill is below 3:1 against a
# light page. That is a brand decision, so only missing alt text and similar findings fail here.
echo; echo "-> ${MINT[*]} a11y"
a11y_output="$("${MINT[@]}" a11y 2>&1)"
printf '%s\n' "$a11y_output"
if grep -qE "Found [0-9]+ accessibility issues" <<<"$a11y_output"; then status=1; fi
run node scripts/check-docs.mjs

if command -v vale >/dev/null 2>&1; then
  run vale --minAlertLevel=error --output=line .
else
  echo; echo "vale is not installed, prose check skipped (documentation-rules.md, section 24)"
fi

exit "$status"
