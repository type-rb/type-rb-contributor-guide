#!/bin/sh
set -eu

guide_root=$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)
source_file="$guide_root/traces/reference/answer.trb"
trb_command=${TYPE_RB_TRB:-trb}
workspace=$(mktemp -d "${TMPDIR:-/tmp}/typerb-reference-trace.XXXXXX")
trace_source="$workspace/answer.trb"

cleanup() {
	rm -rf -- "$workspace"
}
trap cleanup EXIT HUP INT TERM

if ! command -v "$trb_command" >/dev/null 2>&1; then
	printf 'trace-reference: cannot find %s\n' "$trb_command" >&2
	printf 'Install TypeRB or set TYPE_RB_TRB to a trb executable.\n' >&2
	exit 1
fi

cp "$source_file" "$trace_source"
cp "$guide_root/traces/reference/trbconfig.jsonc" "$workspace/trbconfig.jsonc"
cp "$guide_root/traces/reference/go.mod" "$workspace/go.mod"

printf '\n[1/4] Source: %s\n\n' "$source_file"
sed -n '1,80p' "$source_file"

printf '\n[2/4] Parse, resolve, and type-check\n\n'
"$trb_command" check "$trace_source"
printf 'check: ok\n'

printf '\n[3/4] Lower and generate Go (first 36 lines)\n\n'
"$trb_command" build --stdout "$trace_source" > "$workspace/answer.go"
sed -n '1,36p' "$workspace/answer.go"

printf '\n[4/4] Build and run through the Go toolchain\n\n'
"$trb_command" run "$trace_source"

printf '\ntrace-reference: complete\n'
