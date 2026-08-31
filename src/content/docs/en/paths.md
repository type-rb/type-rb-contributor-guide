---
title: Choose a path
description: Decide which compiler to explore first and see how the two repositories differ.
---

You do not need to learn both compilers at once. Pick the path closest to the
change you want to make.

## Start with the reference compiler when…

- you want to change TypeRB syntax or type checking;
- you want to improve diagnostics, formatting, editor support, or packages;
- you want to work on the Go, Ruby, or TypeScript output; or
- you want the clearest first tour through a complete compiler.

Follow one route in this order:

1. Run the [small reference trace](../reference-compiler/trace/).
2. Follow the same `6 * 7` expression in the
   [reference code clinic](../reference-compiler/code-clinic/).
3. Choose a focused check from the
   [workflow and test matrix](../contributor-workflow/).
4. Use the [reference change journey](../reference-compiler/change-journey/)
   to decide which responsibilities your change crosses.
5. Keep the [versioned map](../reference-compiler/map/) open as a source-address
   reference while you work.

## Start with the Native compiler when…

- you want to work on native code generation or the runtime;
- you are interested in self-hosting and bootstrap chains;
- you want to study Native MIR, QBE, ABI, or linker boundaries; or
- you want to run a carefully bounded compiler experiment.

Follow the matching Native route:

1. Run the [small Native trace](../native-compiler/trace/).
2. Follow its String and `puts` call in the
   [Native code clinic](../native-compiler/code-clinic/).
3. Choose a focused check from the
   [workflow and test matrix](../contributor-workflow/).
4. Use the [Native change journey](../native-compiler/change-journey/) to
   separate application, runtime, and bootstrap obligations.
5. Keep the [versioned map](../native-compiler/map/) open as a source-address
   reference while you work.

## The important difference

| Question | Reference compiler | Native compiler |
| --- | --- | --- |
| Main job | Define and implement portable TypeRB behavior | Experiment with a self-hosted native implementation |
| Implementation language | Go | TypeRB |
| Main output | Go, Ruby, or TypeScript | QBE IL, then a native executable |
| Language coverage | The supported portable language | A deliberately bounded subset |
| Best evidence | Compiler and cross-backend tests | Conformance, fixed-point, and measured gate evidence |

The TypeRB specification and accepted conformance behavior remain the source of
truth. A disagreement between the two implementations is something to
investigate; it is not permission for the Native compiler to invent different
language behavior.

## If compiler terms are new to you

Begin with [How a compiler works](../foundations/how-a-compiler-works/). It defines
the six terms used most often in both maps. Ten minutes there will make the
repository names much less mysterious.

Then read [Read a changing codebase](../foundations/reading-a-changing-codebase/).
It explains which parts of this guide are durable and which parts are pinned
snapshots that move with an implementation.

Keep the [contributor glossary](../glossary/) open while unfamiliar terms are
still frequent. Before implementing a change, use
[Test a compiler change](../foundations/testing-compiler-changes/) to choose
evidence at the responsibility boundary instead of at a private helper.

When you are ready to work in a checkout, continue with
[Make your first compiler change](../start-contributing/).
