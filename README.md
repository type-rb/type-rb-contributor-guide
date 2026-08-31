# TypeRB Contributor Guide

A gentle, code-guided introduction to the TypeRB reference and Native
compilers.

This repository is for **language implementers and contributors**. The main
[TypeRB documentation](https://type-rb.github.io/docs/) remains the place for
people who want to learn and use the language.

The guide separates material by how quickly it changes:

- a completion-oriented tutorial carries a reader from setup to first change;
- shared foundations explain durable compiler concepts;
- a contributor glossary keeps compiler and evidence terms distinct;
- change journeys follow responsibilities and evidence;
- focused guides explain test selection, diagnostics, and Native evidence;
- versioned code clinics teach how to read one trace input in short excerpts;
- versioned big maps point to exact `type-rb` and `type-rb-native` source; and
- executable traces keep one visible path through each compiler checked in CI.

The published site is
[type-rb.github.io/type-rb-contributor-guide](https://type-rb.github.io/type-rb-contributor-guide/).

## Local development

Install dependencies and start the site:

```sh
bun install
bun run dev
```

Build the same static output used by GitHub Pages:

```sh
bun run build
```

Run the checked-in compiler traces:

```sh
./scripts/trace-reference.sh
./scripts/trace-native.sh
```

The Native trace downloads an immutable experimental compiler seed on supported
arm64 platforms. See the trace page for its exact boundary and prerequisites.

## Languages

English is the only authored language today. The content tree is already
locale-scoped so that a translation can keep the same page identity and path.
Read [LOCALIZATION.md](LOCALIZATION.md) before adding a locale.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for the writing standard, code-map update
rules, and trace expectations. The guide uses Astro and Starlight, but most
contributions only edit Markdown or a small trace fixture.
