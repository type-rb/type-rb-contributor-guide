# Design relationship to TypeRB

This guide is a separate site for a different audience, but it belongs to the
same TypeRB family.

## Shared family signals

Keep these elements recognizably close to the main TypeRB site:

- the `trb` brand mark and the TypeRB name;
- coral (`#d85b47`) as the primary brand color;
- Inter-style sans-serif text paired with a system monospace for code;
- dark, high-contrast code surfaces; and
- restrained rounded cards, borders, and compact labels.

These signals should survive a future redesign on either site. They make the
relationship visible without requiring the two sites to share a layout system.

## Intentional differences

The main TypeRB site serves language users. It should feel direct, bright, and
product-oriented: learn the language, try it, and find a reference answer.

The contributor guide serves language implementers. It can feel more like a
workbench: maps, boundaries, repository paths, evidence, and executable traces
are more prominent than product examples.

The guide therefore uses two secondary semantic colors:

- green means a successful path, verified boundary, or executable trace; and
- yellow marks a boundary, caution, or experimental status.

Neither color replaces coral as the family anchor.

## Content is part of the design

Visual consistency is not enough. Both sites should use the same TypeRB terms,
show TypeRB code with the same conventions, and link clearly between user and
implementer material. The contributor guide may explain internals, but it must
not silently redefine public language behavior.
