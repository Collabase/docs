# Documentation project instructions

Instructions for AI coding tools (Claude Code, Cursor, Copilot, Codex, …) working on the Collabase
documentation.

## The standard is binding

Read `.agents/rules/documentation-rules.md` before writing or editing any page. It is the single
source of truth for audience, tone, layout, frontmatter, components, terminology, `docs.json`
navigation, and release notes. Do not restate or summarize it elsewhere — point at it.

If anything here or in any other file contradicts it, `documentation-rules.md` wins.

## About this project

- A [Mintlify](https://mintlify.com) docs site. Pages are MDX with YAML frontmatter.
- Configuration and navigation live in `docs.json`.
- `mint dev` previews locally, `mint broken-links` validates internal links.
- The docs live in the [Collabase repo](https://github.com/Collabase/collabase) at `docs/docs/`, and
  are copied 1:1 into a private repo that Mintlify deploys from.

## Hard constraints

- **Never move, rename, or restructure folders.** The two repos are kept identical by a manual copy.
- **Never change `docs.json`** beyond adding or reordering pages unless the user asks for it. Theme,
  colors, logos, languages and redirects change only on an explicit request (see §11 and §15 of the
  rules).
- **No `# H1` in the body.** Mintlify renders `title` as the H1. Every page has a unique `title` and a
  unique `description` of at most 160 characters.
- **Removing a page adds a redirect** in `docs.json`.
- **Never register a page in `docs.json` without creating the `.mdx` file**, or the reverse.
- **Never leave placeholder text.** A section ships complete or not at all.
- **Never document running from source.** Give the commands for the ZIP deployment customers receive;
  never point a reader at a private GitHub repo.

## Audience

Write for **"Peter from IT"** — the administrator who deploys and runs Collabase, not a developer on
the codebase. No library names, no architecture, no database fields, no internal API routes.

`developer/` and `api/` are the exception: those are for engineers, and technical detail belongs there.

## Style

- Active voice, second person ("you"). Short sentences, one idea each.
- Sentence case for headings.
- Bold for UI elements: Click **Settings**.
- Inline code for file names, commands, paths, status values, and API field names.
- `<Steps>` for every procedure — never raw Markdown numbered lists.
- No marketing language ("powerful", "seamless", "out of the box") and no filler ("please note that",
  "in order to").

## Terminology

Space (not workspace) · Member (not user) · Collabase Docs (not wiki) · Object Type (not entity) ·
Object (not record). The full table is in `documentation-rules.md` §7.
