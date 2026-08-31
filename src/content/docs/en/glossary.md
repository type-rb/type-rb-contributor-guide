---
title: Contributor glossary
description: Plain-language definitions for the compiler, Native, and evidence terms used throughout this guide.
---

You do not need to memorize this page. Use it when two nearby terms begin to
blur together.

The definitions describe responsibilities rather than current type or package
names. A repository may rename an implementation without changing the meaning
of the term.

## Source and meaning

| Term | Plain meaning | TypeRB contributor note |
| --- | --- | --- |
| **Token** | One recognized piece of source, such as a keyword, name, operator, or literal | A useful token also retains its source spelling and location. |
| **Lexer** | The stage that groups source characters into tokens | Lexing recognizes pieces; it does not decide whether the whole program is well typed. |
| **Parser** | The stage that recognizes how tokens form declarations, statements, and expressions | Parsing answers “what shape was written?” before name and type questions. |
| **AST** | Abstract syntax tree: a nested representation of parsed source shape | It preserves authored structure. It is not yet the final execution meaning. |
| **Lossless** | Retaining enough original information to reproduce relevant source details | The formatter needs comments, literal spelling, and other details that a minimal AST may omit. |
| **Source span** | The start and end location of a source construct | Later phases carry spans so a diagnostic can still point back to the author's code. |
| **Resolver** | The stage that connects a written name to the declaration it denotes | Parsing can recognize `run()` without knowing which `run` it means. Resolution supplies that identity. |
| **Canonical identity** | A backend-independent identity for a declaration or operation | Generated Go, Ruby, TypeScript, or QBE names are projections, not the source-language identity. |
| **Type checker** | The stage that verifies types, calls, returns, and other semantic relationships | A checker rejects invalid meaning before a backend is asked to generate code. |
| **Diagnostic** | A structured explanation of a problem, including its owner and useful source location | Rendering text is only the last step. Detection, semantic facts, spans, severity, and stable codes may be separate concerns. |
| **Portable semantics** | The meaning shared by TypeRB programs across supported reference backends | A target mechanism may differ, but it must not quietly create a second language. |

## Transformation and execution

| Term | Plain meaning | TypeRB contributor note |
| --- | --- | --- |
| **Frontend** | The compiler responsibilities that determine what source means | Usually includes lexing, parsing, resolution, and checking. Project and package loading may surround it. |
| **Lowering** | Re-expressing checked meaning in a form better suited to the next stage | Lowering should preserve semantics while making operations and control flow more explicit. |
| **IR** | Intermediate representation: a compiler-owned form between source analysis and final output | The reference compiler uses typed IR as the shared input to its target generators. |
| **MIR** | A middle-level intermediate representation with execution details made more explicit | Native MIR owns native concerns such as representation, verification, and runtime interaction; it is not the language specification. |
| **Backend** | The part that projects checked meaning into one target | The reference backends emit Go, Ruby, or TypeScript. Native currently hands QBE IL to QBE. |
| **Code generation** | Producing target code or another lower-level program | Successful generation is not enough; the resulting program must preserve the required behavior. |
| **Runtime** | Support needed while a compiled program executes | Allocation, managed references, built-in operations, and process or platform integration can live here. |
| **ABI** | Application binary interface: rules for calls, values, layout, symbols, and platform interaction | It is a native execution contract, not TypeRB source syntax. |
| **QBE IL** | The textual intermediate language accepted by QBE | For Native it is a visible handoff between the TypeRB-authored compiler and an external code generator. |
| **Toolchain** | The external tools that complete a build | Depending on the path, this may include Go, Ruby, JavaScript tooling, QBE, an assembler, a C compiler boundary, or a linker. |
| **Target** | The selected execution environment or generated-language mode | A target selects mechanisms and ecosystem boundaries; it does not redefine portable TypeRB grammar. |
| **Target profile** | An exact experimental target contract | Native profiles make architecture, OS, QBE target, ABI, and tool boundaries explicit instead of assuming “native” is one environment. |

## Evidence and reproducibility

| Term | Plain meaning | TypeRB contributor note |
| --- | --- | --- |
| **Fixture** | A small checked-in input used by a test or trace | A good fixture teaches one behavior and has a clear reason to exist. |
| **Conformance case** | Evidence that an implementation agrees with required language behavior | Keep valid and invalid neighbors together so acceptance and rejection are both visible. |
| **Differential test** | Running equivalent cases through two implementations and comparing observable results | For Native, the reference compiler can be an oracle inside an exact declared compatibility boundary. |
| **Golden test** | Comparing output with an intentionally reviewed expected artifact | Useful for diagnostics, IR, or generated code, but sensitive to harmless formatting changes if the boundary is chosen poorly. |
| **Deterministic** | The same declared inputs produce the same required output | Determinism is essential for trustworthy generated artifacts and bootstrap comparisons. |
| **Trace** | A small executable tour through visible boundaries | A trace teaches. It is not a substitute for the broader test suite. |
| **Bootstrap** | Building a compiler using a compiler | Self-hosting becomes stronger when one generated compiler actually builds the next generation. |
| **Seed** | The trusted starting compiler or artifact for a bootstrap chain | Provenance, checksum, target identity, and the boundary between recovery and the ordinary chain matter. |
| **Generation** | One compiler artifact produced and then used at a named bootstrap step | Labels such as B1 or B2 describe positions in a chain, not compiler phases. |
| **Fixed point** | Repeated compiler generations satisfy an exact declared equality policy | A fixed point proves reproducibility under that policy. It does not alone prove language correctness. |
| **Gate** | A bounded Native experiment question with predeclared acceptance evidence | A gate is history and rationale, not a stage that every compiled application traverses. |
| **Provenance** | Evidence of where an artifact and its inputs came from | It lets a reader distinguish a published seed, a recovery artifact, and a compiler produced by the ordinary chain. |

## “Snapshot” has three meanings

The word **snapshot** is overloaded. Always name which kind you mean.

- A **code-map snapshot** is this guide's versioned view of repository
  addresses.
- A **bootstrap snapshot** is a versioned data boundary used by recovery or
  compiler construction.
- A **test snapshot** is expected output stored for comparison, also called a
  golden artifact.

They have different owners and compatibility rules. Similar names do not make
them interchangeable.

## Terms that are close but not equal

| Do not collapse | Why |
| --- | --- |
| Parser and checker | Recognizing a shape is different from proving that the shape has valid meaning. |
| IR and generated source | IR is compiler-owned shared meaning; generated source is one target projection. |
| Runtime and toolchain | Runtime support participates in program execution; a toolchain transforms or links artifacts. |
| Determinism and correctness | A result can be repeatably wrong. |
| Fixed point and self-hosting correctness | Equal generations need conformance and behavioral evidence beside them. |
| Version and revision | A development version can span many commits; a revision identifies one exact source state. |
| Gate and compiler phase | A gate asks whether an experiment passed; a phase transforms every relevant program. |

When a term remains unclear, return to the visible input and output. Naming the
boundary usually makes the vocabulary concrete.
