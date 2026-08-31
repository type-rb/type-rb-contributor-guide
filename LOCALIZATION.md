# Localization

English is the source language today. The repository is structured so that
additional languages can be added without changing page identity.

## Content layout

English pages live under:

```text
src/content/docs/en/
```

A Japanese translation would use the same relative filenames under `ja`:

```text
src/content/docs/en/foundations/how-a-compiler-works.mdx
src/content/docs/ja/foundations/how-a-compiler-works.mdx
```

Keeping the relative path stable lets Starlight associate the pages and gives
readers predictable language-specific URLs.

## Add a locale

1. Add the locale to `locales` in `astro.config.mjs`.
2. Add translated sidebar labels without changing the page order.
3. Create the locale directory under `src/content/docs/`.
4. Translate one complete page at a time using the same relative filename.
5. Run `bun run build` and test the language switcher and links.

Starlight may fall back to English when a page has not been translated. A
translation should therefore never be represented by an empty placeholder.

## Translation rules

- Preserve code, commands, repository paths, symbol names, and diagnostic codes.
- Translate explanations and accessible labels.
- Keep links between guide pages relative so they can resolve within a locale.
- Keep links to pinned source revisions unchanged.
- Do not translate a public TypeRB term differently from the main language
  documentation without recording and resolving the terminology question.
- Update a translation when a technical fact changes, not merely when English
  wording is polished.

## What stays language-independent

Trace fixtures and scripts live outside the localized content tree. Every
translation describes the same executable evidence. Images that contain text
need a locale-specific alternative or text-free replacement before they are
used inside translated instructional content.
