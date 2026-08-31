#!/bin/sh
set -eu

guide_root=$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)
source_file="$guide_root/traces/native/hello.trb"
workspace=$(mktemp -d "${TMPDIR:-/tmp}/typerb-native-trace.XXXXXX")
release_tag=bootstrap-seed-2026-08-30
release_source_revision=0058818314977633c50393796ef9b9f8f1fda50f
release_url="https://github.com/type-rb/type-rb-native/releases/download/$release_tag"

cleanup() {
	rm -rf -- "$workspace"
}
trap cleanup EXIT HUP INT TERM

sha256_file() {
	if command -v sha256sum >/dev/null 2>&1; then
		sha256sum "$1" | awk '{print $1}'
	else
		shasum -a 256 "$1" | awk '{print $1}'
	fi
}

if [ -n "${TYPE_RB_NATIVE_COMPILER:-}" ]; then
	compiler=$TYPE_RB_NATIVE_COMPILER
	expected_digest=
	asset=provided-compiler
else
	system=$(uname -s)
	architecture=$(uname -m)
	case "$system:$architecture" in
		Darwin:arm64)
			asset=type-rb-native-bootstrap-darwin-arm64
			expected_digest=ef438d13598c534766334b408a39715c56ff1b69db528910ebf7d90ec7720b65
			;;
		Linux:aarch64|Linux:arm64)
			asset=type-rb-native-bootstrap-linux-arm64
			expected_digest=b4307c244edc9e4da620f2a7c1b03a733e575da032efefae615f9edf75048a37
			;;
		*)
			printf 'trace-native: no published bootstrap seed for %s %s\n' "$system" "$architecture" >&2
			printf 'Set TYPE_RB_NATIVE_COMPILER to a compatible compiler executable.\n' >&2
			exit 1
			;;
	esac

	compiler="$workspace/$asset"
	printf '\n[1/5] Download the immutable Native seed\n\n'
	curl --fail --location --silent --show-error "$release_url/$asset" --output "$compiler"
	actual_digest=$(sha256_file "$compiler")
	if [ "$actual_digest" != "$expected_digest" ]; then
		printf 'trace-native: seed digest mismatch\n' >&2
		printf 'expected: %s\nactual:   %s\n' "$expected_digest" "$actual_digest" >&2
		exit 1
	fi
	chmod 0755 "$compiler"
	printf 'verified %s\n' "$actual_digest"
	printf 'seed source revision %s\n' "$release_source_revision"
fi

if [ ! -x "$compiler" ]; then
	printf 'trace-native: compiler is not executable: %s\n' "$compiler" >&2
	exit 1
fi

if [ "$asset" = provided-compiler ]; then
	printf '\n[1/5] Use the compiler supplied by TYPE_RB_NATIVE_COMPILER\n\n'
	printf '%s\n' "$compiler"
fi

printf '\n[2/5] Source: %s\n\n' "$source_file"
sed -n '1,80p' "$source_file"

printf '\n[3/5] Run the TypeRB-authored frontend\n\n'
"$compiler" check "$source_file"

printf '\n[4/5] Emit QBE IL\n\n'
"$compiler" emit-qbe "$source_file" > "$workspace/program.ssa"
printf '%s\n' '--- first data declaration ---'
grep -n -m 1 '^data ' "$workspace/program.ssa"
printf '%s\n' '--- exported entry ---'
grep -n -A 6 '^export function.*\$main' "$workspace/program.ssa"

qbe_command=${TYPE_RB_NATIVE_QBE:-qbe}
cc_command=${TYPE_RB_NATIVE_CC:-cc}
printf '\n[5/5] Build and run when QBE and cc are available\n\n'
if command -v "$qbe_command" >/dev/null 2>&1 && command -v "$cc_command" >/dev/null 2>&1; then
	"$compiler" build "$source_file" \
		--output "$workspace/hello" \
		--qbe "$(command -v "$qbe_command")" \
		--cc "$(command -v "$cc_command")"
	"$workspace/hello"
else
	printf 'Skipped native linking. Install QBE 1.3 and a C toolchain to run this final step.\n'
fi

printf '\ntrace-native: complete\n'
