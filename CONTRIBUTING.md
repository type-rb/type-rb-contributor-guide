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

## Choose the page's job before writing

Do not mix every documentation mode into one page.

- A **tutorial** leads a first-time contributor through one successful path.
  Keep choices bounded and move optional detail to linked pages.
- A **how-to guide** helps a contributor complete one already-understood task.
- An **explanation** builds a mental model of ownership, responsibility, or
  evidence without prescribing one current file route.
- A **reference** makes facts, commands, terms, and source addresses easy to
  look up.

The first-change page is a tutorial. Foundations and change journeys are
explanations. The command matrix, glossary, and maps are references. A code
clinic is a guided reading lab tied to one versioned trace.

## Separate durable guidance from snapshots

Use these kinds of contributor material deliberately:

- **First-change guidance** completes setup, trace, reading, testing, change,
  verification, and review as one route.
- **Foundations** explain compiler concepts without repository paths.
- **Change journeys** explain responsibilities, handoffs, and evidence without
  depending on private helper names.
- **Code clinics** are versioned reading snapshots. They reuse a trace input and
  explain a few short source excerpts in producer-to-consumer order.
- **Big maps** are versioned snapshots with exact source links.
- **Executable traces** prove a small user-visible path in CI.

Do not place a filename in a foundation merely because it is convenient today.
Put the responsibility in the foundation or journey and the current address in
the matching big map. When code moves, first ask whether only an address moved
or whether responsibility changed. Only the second case should require a
conceptual rewrite.

The site check rejects full Git revisions outside versioned maps, code clinics,
and executable traces. This is a narrow guardrail: canonical specifications
and decision records may still be linked from durable guidance, while exact
source identities belong only on pages whose purpose is reproducibility.

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

## Update a code clinic

A code clinic must:

- reuse the exact small input from its executable trace;
- name the implementation version and full source revision;
- state whether its source is identical to or different from the matching map;
- show only the few lines needed to explain an implementation decision;
- connect each producer to its next consumer;
- teach required Go, TypeRB, or QBE notation beside the first excerpt that
  needs it instead of creating a separate language course;
- link to focused tests in the current checkout; and
- end with a few self-check questions and answers.

Prefer an excerpt of roughly 10–30 lines or less. Link to the complete source
instead of reproducing a long function. When a trace identity changes, update
its clinic in the same pull request. When only the wider implementation moves,
update the map and leave a still-correct clinic on its exact older snapshot.

## Update a trace

Every trace must be:

- small enough to read before running;
- deterministic;
- explicit about downloads and external tools;
- safe to run from any working directory;
- cleaned up after success or failure; and
- exercised by CI on a supported platform.

The script output should name each visible compiler boundary in plain language.
The trace page must name the exact source revision of the executable it runs and
explain its relationship to the matching code-map revision. Do not imply that a
newer map can be followed line for line when the trace executes an older seed.

## Check a change

```sh
bun install
bun run check
./scripts/trace-reference.sh
./scripts/trace-native.sh
```

The Native trace may stop after QBE IL on a machine without QBE. That is an
expected, documented boundary.

Use English for committed documentation, code comments, commit messages, and
pull request text.
