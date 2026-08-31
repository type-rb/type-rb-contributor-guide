# Contributing

Thank you for helping people find their way into the TypeRB compilers.

## Write for a first-time reader

Assume the reader can program, but may never have studied a compiler.

- Use short sentences and one new idea at a time.
- Define a compiler term beside the first code that gives it meaning.
- Explain **what**, then **why**, then **where in the repository**.
- Prefer one small program followed across phases over several disconnected
  examples.
- Say when a detail is optional, experimental, historical, or target-specific.
- Link to source instead of copying a large implementation into the guide.

A reader should be able to stop after any section with a useful mental model.

## Keep the two audiences separate

This site teaches contributors how the language implementations work. User
guides, package documentation, tutorials, and the public language reference
belong in the main `type-rb` documentation.

Contributor material may link to the public language specification. It must not
quietly redefine public behavior.

## Update a code map

Each code map names a human-readable implementation version and an exact public
repository revision. The version helps readers understand the map's age. The
revision keeps every source link reproducible, including while a `-dev` version
spans several commits.

When an important path changes:

1. read the version from the implementation repository's canonical version
   declaration;
2. update the displayed version and exact revision;
3. link the version label to its declaration at that revision;
4. check every pinned source link on that page;
5. keep the conceptual description stable when only a filename moved; and
6. run the matching executable trace.

Do not turn a map into a complete package listing. It should answer where to
start and which boundary to follow next.

## Update a trace

Every trace must be:

- small enough to read before running;
- deterministic;
- explicit about downloads and external tools;
- safe to run from any working directory;
- cleaned up after success or failure; and
- exercised by CI on a supported platform.

The script output should name each visible compiler boundary in plain language.

## Check a change

```sh
bun install
bun run build
./scripts/trace-reference.sh
./scripts/trace-native.sh
```

The Native trace may stop after QBE IL on a machine without QBE. That is an
expected, documented boundary.

Use English for committed documentation, code comments, commit messages, and
pull request text.
