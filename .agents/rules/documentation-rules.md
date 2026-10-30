---
description: Canonical standard for writing and updating Collabase documentation and release notes. Applies to every MDX file in this docs project, in whichever repo you are reading it.
---

# Documentation Standards

This is the single source of truth for how Collabase documentation is written. Read it before you
write or edit any page.

It lives next to the docs themselves, so it is identical in both places the docs exist (see below).
If you find it contradicting anything else, this file wins and the other file is the bug.

### Where to look

| You are about to | Read |
|---|---|
| Write or edit any page | §2 audience, §5 structure, §6 voice, §7 terms, §23 quality bar |
| Pick a component | §9 and §19 (catalog with when and when not) |
| Set frontmatter, titles, descriptions | §4 and §20 |
| Add a screenshot, image or download | §10, §17, §21 |
| Build a guide or a setup page | §16 |
| Change navigation or `docs.json` | §11 and §22 |
| Write a release note | §12 |
| Use color or the palette | §25 |
| Translate to German | §14 and §15 |
| State a fact about the product | §18 |
| Check your work before the PR | §13 and §24 |

---

## 1. Where the docs live and how they ship

The docs exist in two repos, and they are byte-for-byte identical:

| Repo | Path | Role |
|---|---|---|
| `Collabase/collabase` (private) | `docs/docs/` | **Where you edit.** Changes land here as normal PRs. |
| The publish repo `Collabase/docs` (public) | repo root | **Where it deploys from.** Mintlify builds and publishes from its default branch. |

Edit the docs in the product repo. A maintainer copies merged changes into the publish repo and
deploys. You never need to change files in the publish repo directly.

**Because a maintainer copies files across, structure is a hard constraint:** never move, rename, or
restructure folders, and never change `docs.json` beyond adding or reordering pages. A change that
only works in one of the two repos breaks the copy and breaks the build.

---

## 2. Persona & perspective

**General audience, "Peter from IT."**
For all product, administration, and feature documentation, write for the IT administrator who
deploys, configures, and maintains Collabase. He is not a developer on this codebase.

- **No developer jargon.** No internal dependency or library names, no architecture (Prisma, BullMQ,
  Next.js, Vite, React Flow, service layer, container names, database fields, internal API routes).
- **Focus on action.** Answer "what do I do?", "what do I type?", and "what happens if it fails?".
- **Keep it simple.** Plain, professional language. The reader is running a product, not reading our
  source code.

**Developer & API audience, the exception.**
Pages under `developer/` and `api/` are written for engineers building extensions or integrating.

- Code examples, compilation steps, internal mechanics, and architecture detail are all welcome.
- Use precise technical language: host functions, hooks, WebAssembly, endpoints, webhooks.

**Never document how to run the source.** Give customers the exact commands for the ZIP deployment
they receive. Never tell a reader to pull from a private GitHub repo.

---

## 3. Project layout

```
docs.json              # Global nav, theme, logos, only touch it to add or reorder a page
index.mdx              # Docs landing page
introduction.mdx       # Platform introduction
installation.mdx
first-run.mdx
concepts/              # Core concepts (spaces, permissions, search)
docs/                  # Collabase Docs app
projects/              # Projects, tasks, sprints
automation/            # Automation app
test-management/       # Test Management app
time-tracking/         # Time Tracking app
intranet/              # Intranet app
registry/              # Registry app
admin/                 # Administration pages
api/                   # API reference pages
developer/             # Developer guides
changelog/             # Release notes (one page, one <Update> per release)
images/                # Screenshots (PNG only, named after the app)
snippets/              # Reusable text blocks, imported by pages (§19)
scripts/               # check-docs.mjs and docs-check.sh (§24), never published
styles/, .vale.ini     # Vale prose rules (§24), never published
```

### Where a new page belongs

| Content type | Folder | Example |
|---|---|---|
| App feature page | `<app-name>/` | `registry/schema-designer.mdx` |
| Platform concept | `concepts/` | `concepts/search.mdx` |
| Admin topic | `admin/` | `admin/backup.mdx` |
| Admin setup page for one area | `admin/` | `admin/saml-sso.mdx` |
| Admin guide (journey across pages or systems) | `admin/`, listed in the Guides tab | `admin/iam-microsoft-entra.mdx`, see §16 |
| API endpoint | `api/<group>/` | `api/automation/trigger-automation.mdx` |
| Release note | `changelog/overview.mdx` | One `<Update>` entry at the top, see §12 |

After creating a page, register it in `docs.json` (see §10). A page that is not in `docs.json` does
not exist on the site.

---

## 4. Frontmatter

Every `.mdx` file opens with YAML frontmatter. Use only the fields that apply.

```yaml
---
title: "Triggers"
sidebarTitle: "Overview"     # Only when the nav label should differ from the title
description: "One sentence describing what this page covers and why it matters."
---
```

- **`title`**: required on every page. Mintlify renders it as the page's H1 and uses it in the
  browser tab and in search results (`<title> - Collabase`). Sentence case, unless it is a proper
  noun. **Unique across the whole site**: a page without `title` falls back to its `sidebarTitle`,
  and seven app overviews once shipped as «Overview - Collabase».
- **`sidebarTitle`**: use `"Overview"` on overview pages to keep the nav short. Omit elsewhere.
- **`description`**: shown in search results and under the sidebar title. One sentence, present
  tense, at most 160 characters. It must communicate value, not just label the page.
  **Unique across the site and across collabase.ch.** The connector pages once carried the same
  sentence as the matching `/integrations/*` page of the website, which a crawler reports as 76
  duplicate descriptions. A docs description says how to set something up; the website says what it
  is for.
- **Connector pages** use `title: "<Name> connector"`, `sidebarTitle: "<Name>"` and a description
  built from the page itself: auth type, number of triggers and actions, one example of each.

---

## 5. Page structure

```
[frontmatter]

<div className="home-cards brand-cards">   ← wraps the rest of an app overview page

One short paragraph, no heading above it. What this is and why it matters.

## Section heading

Content.

## Next steps    ← app overview pages only

<CardGroup> linking to subpages

</div>   ← closes the wrapper of an app overview page
```

### Headings

- **No `# H1` in the body.** Mintlify renders `title` as the H1. A `# Heading` below the frontmatter
  is a second H1 on the page; a crawler once reported 94 pages with two.
- `##` for major sections, `###` for subsections. Never skip a level.
- Sentence case throughout: **"How it works"**, not **"How It Works"**.

---

## 6. Voice and tone

The docs have a consistent register. Match it.

### Active voice, second person

| Avoid | Use |
|---|---|
| "An automation can be created by clicking…" | "Create an automation by clicking…" |
| "The user should navigate to…" | "Navigate to…" |
| "It is possible to configure…" | "You can configure…" |

### Confident and direct

| Avoid | Use |
|---|---|
| "You might want to consider adding a trigger" | "Add a trigger to start the automation" |
| "This could potentially be used for…" | "Use this to…" |

### Technical, not cold

Precise and professional, but not stiff. Short sentences win. Explain what something means to the
reader, not just what the system does.

> From the existing docs: *"Most teams test their software informally. Cases live in spreadsheets,
> run results in chat threads, and the link between 'what was tested' and 'what was shipped' is a
> question nobody can answer confidently. Test Management closes that gap."*

That is the model: short declarative sentences, specific consequences, no filler.

### What to avoid

- Marketing language: "powerful", "seamless", "effortlessly", "out of the box".
- Filler openers: "please note that", "it is important to", "in order to".
- Colloquialisms and idioms: they translate badly and age badly.
- Over-explaining. Trust the reader.
- Restating the page title as prose to open a section.
- Placeholder text. Every section ships complete or not at all.

---

## 7. Terminology

Use these consistently on every page.

| Term | Not |
|---|---|
| Space | workspace, project, organisation |
| Member | Use for a person in a Space. `user` is allowed for an account, a role and UI names (**Admin → Users**, the role **User**). Do not use both words for the same thing in one sentence. |
| Collabase Docs | "Docs app", "wiki" |
| Test Management | "test module", "QA tool" |
| Automation | "workflow engine", "the automations" |
| Intranet | "blog", "announcements module" |
| Registry | "app registry", "data catalog" |
| Schema | "data model", "template" |
| Object Type | "entity", "table" |
| Object | "record", "entry", "item" |

`workspace`, `wiki` and `entity` are never used for Collabase concepts. `record` is allowed only for a test or time record, never for an Object.

---

## 8. Formatting

### UI elements

Bold every UI element the reader interacts with.

```
Click **New Automation**.
Toggle the automation to **Active**.
Open the **Settings** tab.
```

### Code and values

Inline code for file names and paths (`docs.json`), commands (`mint dev`), status values (`DRAFT`,
`FAILED`), API field names (`testRunId`), and template variables (`{{testCaseTitle}}`).

Fenced code blocks for multi-line commands, API examples, and diagrams.

### Tables

Use tables for reference content: field definitions, status meanings, roles, limits, keyboard
shortcuts. Bold the first column.

```
| Field | Description |
|---|---|
| **Title** | Short description of what the case verifies |
```

### Lists

Bullet lists for unordered sets. Numbered steps belong in `<Steps>`, never as raw Markdown numbered
lists.

---

## 9. Components

Use Mintlify components intentionally, not decoratively.

| Component | When |
|---|---|
| `<Steps>` + `<Step>` | Any sequential procedure, always prefer over numbered Markdown lists |
| `<CardGroup>` + `<Card>` | Linking to related pages ("How it works", "Next steps"), connected apps |
| `<AccordionGroup>` + `<Accordion>` | "Why use X" benefit lists, optional detail |
| `<Note>` | Clarification that is not a warning |
| `<Warning>` | Something destructive, or that breaks the feature if missed |
| `<Tip>` | Optional best practice or shortcut |
| `<img>` (not `![]()`) | App logo on overview pages: `width="60"`. Every other image is sized with `className`, see §21 |

A page with plain prose and one `<Steps>` block beats a page with five component types.

### App overview page pattern

```mdx
# App Name

[One-paragraph description]

## Why use [App]

<AccordionGroup>   ← 2–4 benefit accordions

## Key concepts

[Optional ASCII hierarchy diagram]

<AccordionGroup>   ← one accordion per concept

## How to access [App]

<Steps>

## Connected apps

<CardGroup cols={3}>

## Next steps

<CardGroup cols={3}>
```

### Subpage pattern

```mdx
---
title: "Feature Name"
description: "..."
---

[Opening paragraph, what this is, in one sentence]

## [First major concept]

[Content, tables, or CardGroup]

## How to [do the main thing]

<Steps>

[Optional Tip/Note/Warning]

## [Further reference sections as needed]
```

---

## 10. Images

- Screenshots go in `images/`.
- **Release images** live in `images/releases/<id>/` as WebP. They are exports of the product repo's
  generator (`tools/release-art/`), the one exception to PNG only, and never replaced by hand.
- **App icons** live in `images/apps/<app>-light.png` and `<app>-dark.png` (256 px, from the brand set
  `public/assets/brand_assets/v4/AppIcons/`). Every app overview page shows the pair at `width="60"` above the
  first paragraph, switched with `block dark:hidden` and `hidden dark:block`; the home page uses the light file
  as `Card` icon, the tile carries its own background in both modes. `collabase-ai.png` is the previous mark
  until the brand set has a new one. Never put app icons behind a headline as decoration; the
  app sections of a release note are the one exception (§12).
- **Logos and favicon** in `docs.json` are `images/logo-black.svg` (light), `images/logo-white.svg` (dark)
  and `images/favicon-light.png` / `images/favicon-dark.png` (the black icon tile, light and dark), copies from the brand
  folder. Never reference `images/01_Collabase Logo/` directly: the folder is 174 MB, contains an
  archive of retired logos and is excluded in `.mintignore` and `.gitignore`.
- Do not embed screenshots in subpages unless a UI state cannot be explained without one.

---

## 11. Navigation (`docs.json`)

Add a new page's slug to the correct `group` → `pages` array:

```json
{
  "group": "Registry",
  "pages": [
    "registry/overview",
    "registry/schema-designer",
    "registry/object-browser",
    "registry/settings"
  ]
}
```

- Slug is the path from the docs root, without `.mdx`.
- Order follows the user's journey, most important first.
- Never add a page to `docs.json` without the `.mdx` file, or the reverse.
- **Two languages.** `navigation.languages` holds `en` (default, full docs) and `de`. German pages
  live under `de/` with the same file name as the English page. The German navigation is never
  edited by hand: `scripts/build-de-navigation.mjs --write` generates it from the English one (same
  tabs, groups, icons and order, labels from `scripts/docs-de-navigation.json`, the `de/` twin where
  one exists, the English page otherwise), and `check-docs.mjs` fails on any difference. After every
  change to the English navigation or a new German page, run the generator. A reader who opens an
  English page from the German menu continues in the English menu; that is accepted. German currently covers the home page, the guides (getting started, HERMES, glossary,
  «Warum es Collabase gibt»), the guide «IAM mit Microsoft Entra ID» and security and privacy; the app reference is English only.
- **Header (en):** seven tabs, each with an icon and a click that opens its first page. The header
  tabs are plain links and carry no dropdown: everything below a tab is the sidebar. **Guides**
  (Welcome, Getting started, Core concepts, HERMES, IAM with Microsoft, Air-gapped installation) ·
  **Apps** (one collapsible group per app, each with its app icon from `images/apps/`) ·
  **Automation** (Overview, Build flows, Run and publish, Agents and AI, Share and reuse, Workspaces
  and plugs, Reference, then the four groups of Build plugs) · **Administration** · **Developers**
  (Overview, App SDK, Collakit, MCP, Plug SDK, AgentKit, each with its status) · **API reference** ·
  **Release notes**. A tab has `groups`, not a `menu`. A new app is a new group in the Apps tab with
  its icon, a new guide a new group in Guides, a new developer product a new page in the Developers
  group. The header is full at seven tabs, so a new tab replaces nothing without a reason. The
  Welcome group holds `index`, `introduction`, `about/story` and `glossary`; `index` stays in the
  navigation so it appears in the sitemap. Security and privacy statements live on the website, not
  in the docs.
- **Icons in the sidebar.** Every group and every page of the **Automation**, **Administration** and
  **Developers** tabs has an `icon` (lucide): the group in `docs.json`, the page in its frontmatter.
  A new page in one of these tabs ships with its icon, and a new group with its group icon. Pick a
  name that exists in lucide and is not already used by a neighbour in the same group. Apps groups
  use their app icon from `images/apps/`. Other tabs add icons only to hub pages.
- **Language switch.** Each language block has its own `navbar` with a link to the other language
  and the same primary button. The home pages repeat the link at the top right.
- **Removing a page** always adds an entry under `redirects` to its successor. Indexed URLs must
  not end in a 404.
- Do not touch theme, colors, logos, or navigation groups in a content PR.

---

## 12. Release notes

**Paused until Collabase 1.0.** The pre-1.0 release notes were removed; `changelog/overview` says
that release notes start with 1.0 and the old version URLs redirect to it. Do not add entries before
1.0. From 1.0 on: every user-facing change gets an entry. Release notes are customer-facing, hold
them to a higher bar than a page.

**Never auto-generate release notes or changelogs.** Skills, commands, and agents must not write,
update, or append a release note or changelog entry on their own initiative, not as a side effect of
another task, not "to be helpful". Write one only when the user explicitly asks. When a change
would warrant a release note, flag that it is due and let the user decide; do not create it unprompted.

### Format: the Mintlify changelog standard

Release notes use the changelog format of Mintlify, with labels, category tags and an RSS feed.

- **One page.** `changelog/overview.mdx` holds every release, newest first. There is no page per
  release, so `docs.json` does not change when you add one. Keep the page in the default page mode:
  `custom`, `center` and `wide` hide the tag filters and the table of contents.
- **Frontmatter** has `rss: true`, which shows the RSS button.
- **A new major** (x.0.0) opens its entry with the contour lines of its name in a `<Frame>` without a
  caption: `contour-light-wide.webp` with `className="block dark:hidden"`,
  `contour-dark-wide.webp` with `className="hidden dark:block"` (`images/releases/<id>/`).
- **One `<Update>` per release:**

  | Prop | Content |
  |---|---|
  | `label` | The version, for example `v1.1.0`. Becomes the entry in the table of contents and the anchor (`#v1-1-0`), the same in every language, which the release dialog of the app links to. Never change it once published. |
  | `description` | The month in the page's language and the name of its major, for example `November 2026 · Rigi` (`.agents/rules/release-ci.md` §6 in the product repo) |
  | `tags` | The sections and apps this release has, see below |
  | `rss` | Only if the entry has components or code: an object `{ title, description, date }` with plain text for subscribers |

- **Template and draft.** Every release starts from `docs/release-notes/TEMPLATE.mdx` in the
  product repo, copied to `docs/release-notes/vX.Y.Z.mdx` and kept current while the version is
  built. The draft lives outside `docs/docs/` on purpose: it is not synced, not published and not
  part of `npm run docs:check`. Only when the version is released (tag pushed, images published) is
  its `<Update>` moved to the top of `changelog/overview.mdx`, the draft file deleted, and the docs
  synced to the publish repo (`docs-update.md` in the product repo). Never sync a release note, or
  a page that describes an unreleased change, before its version is out.
- **Sections, in this order.** Omit a section, and a bold group inside it, that has no entry.

  | `###` section | What goes in |
  |---|---|
  | Lead (no heading) | One to three sentences on what the version is about. If it has a breaking change, a `<Warning>` that links to the update notice |
  | `New apps and features` | The highlights: a new app, or a feature a person will notice, one line each with a link |
  | One section per app (`Docs`, `Projects`, ...) | Every change in that app, grouped under the bold labels **New features**, **Improvements**, **Changed behaviour**, **Bug fixes**. Apps in the order of the Apps tab in `docs.json`, then the platform areas (Collabase AI, Search, Automation) |
  | `Security` | Vulnerabilities and security updates, in one of the two formats below |
  | `Administration` | Admin settings, permissions, users and groups, licence, App Store |
  | `Performance & stability` | Speed, reliability, resource use, maintenance |
  | `Update notice for self-hosters` | Always last. Bold groups **Breaking changes** (what breaks, for whom, the migration), **Before you update**, **What the update does** (migrations, new services, downtime), **Configuration** (environment variables) |

- **App headings** carry the app icon pair from `images/apps/` (24 px, light and dark switched with
  `inline-block dark:hidden` / `hidden dark:inline-block`) inside an `aria-hidden` span, so the feed
  and screen readers see only the name. An area without an app icon uses its `docs.json` group icon
  through `<Icon>`. This is the one place where an app icon sits in a heading (§10). Copy the markup
  from the template.
- **Tags** are the sections the entry has (`New apps`, `New features`, `Bug fixes`, `Security`,
  `Administration`, `Performance & stability`, `Breaking changes`) plus the name of every app with a
  section, so readers can filter by app.
- **German twin.** Every release note is drafted in both languages: `vX.Y.Z.mdx` and
  `vX.Y.Z.de.mdx`, same sections, same order, same entries, written together. At the release the
  German entry goes to the top of `de/changelog/overview.mdx` (from 1.0.0 on; the generated German
  navigation links it in the «Release Notes» tab). Headings and tags in German, UI terms stay English (§15):

  | English | German |
  |---|---|
  | New apps and features | Neue Apps und Funktionen |
  | New features | Neue Funktionen |
  | Improvements | Verbesserungen |
  | Changed behaviour | Geändertes Verhalten |
  | Bug fixes | Fehlerbehebungen |
  | Security | Sicherheit |
  | Administration | Administration |
  | Performance & stability | Leistung & Stabilität |
  | Update notice for self-hosters | Update-Hinweis für Self-Hoster |
  | Breaking changes | Breaking Changes |
  | Before you update | Vor dem Update |
  | What the update does | Was das Update macht |
  | Configuration | Konfiguration |
  | New apps | Neue Apps |

- **Filters and feed.** Readers filter by tag, several tags combine as AND, and the filter lives in
  the URL as `?tags=`. The feed is the page address plus `/rss.xml`, and it exists only on public
  docs. It contains plain Markdown only: components, code and HTML are left out, so every entry must
  read well without them. The feed publishes when you add an `<Update>` or change a heading of an
  existing one, so leave old headings alone: the v1.0.0 entry keeps the earlier category headings.

```mdx
<Update
  label="v1.1.0"
  description="November 2026 · Rigi"
  tags={["New features", "Bug fixes", "Docs"]}
  rss={{ title: "Collabase 1.1.0", description: "What changed for administrators in one plain sentence." }}
>
  One sentence on what this version is about.

  ### New apps and features

  - **Feature:** one line per change, written for the person who uses it. [Learn more](/page)

  ### Docs

  **Bug fixes**

  - What did not work, and that it works now.

  ### Update notice for self-hosters

  **What the update does**

  - One additive migration that runs on start, no step needed.
</Update>
```

**No stack details.** For stability or layout updates, never list dependency bumps by library name
("Updated React to 18.3"). Summarize generically.

**Security section: business impact and CVEs only.** Never list dev-dependencies (`vite`, `vitest`,
`playwright`). Name a production third-party library only for critical, widely known
vulnerabilities. Otherwise summarize by affected component.

### Security format, with CVEs

```md
### Security

| Vulnerability / CVE | Severity | Affected Component / Description |
|---|---|---|
| CVE-202X-XXXX | High (8.5) | Resolves a remote code execution vulnerability in the document processor. |
| Third-Party | Medium | Patched a vulnerability in a third-party AI module to prevent potential data leakage. |
```

### Security format, routine maintenance

```md
### Security

* Performed routine security updates and patched non-critical third-party dependencies in the
  backend and AI services.
```

---

## 13. Before you open the PR

```bash
npm i -g mint                   # once
mint dev                        # preview at localhost:3000
npm run docs:check              # in the product repo, runs everything below
mint validate                   # strict build check
mint broken-links --check-anchors
mint a11y                       # contrast and alt text
scripts/check-docs.mjs          # frontmatter, structure, style (§24)
```

Checklist:

- [ ] Frontmatter present with `title` and `description`, both unique, description ≤ 160 characters
- [ ] No `# H1` in the body
- [ ] Written for the right audience (§2), no developer jargon outside `developer/` and `api/`
- [ ] Terminology matches §7
- [ ] Procedures use `<Steps>`
- [ ] New pages registered in `docs.json`, with an `icon` on the page and the group in the Automation, Administration and Developers tabs (§11)
- [ ] `mint validate` and `mint broken-links --check-anchors` are clean
- [ ] `scripts/check-docs.mjs` and Vale report nothing new (§24)
- [ ] No folder moved, renamed, or restructured
- [ ] Every linked heading has an explicit `{#custom-id}`, and every guide phase links to the next one (§16)
- [ ] The page meets the quality bar (§23) and uses components as in §19
- [ ] Screenshots are named, redacted and resized as in §17
- [ ] Statements about behavior are checked against the product, estimates are labeled (§18)
- [ ] The German twin is updated where one exists (§15)

---

## 14. Collabase-Stilguide für Geschäftskommunikation (v1.3)

> **Scope:** Dieser Abschnitt gilt **nicht** für die englische Produktdokumentation oben (§1–§13),
> sondern für alle Collabase-**Geschäftstexte** auf Deutsch: Angebote, Blogbeiträge, Website-Texte,
> Berichte, Verträge und sonstige Geschäftskommunikation. Wo sich §14 und §1–§13 überschneiden
> würden, gilt für die Produktdoku §1–§13, für Geschäftstexte §14.

### 14.1 Grundtonalität und Haltung

Collabase-Texte klingen wie erfahrene Berater, die auf Augenhöhe sprechen: direkt, substanziell und
ohne Verkaufston. Der Leser soll das Gefühl haben, mit einem Partner zu kommunizieren, der weiss,
wovon er spricht, und der keine Zeit mit Worthülsen verschwendet.

**Die vier Grundprinzipien**
- **Direkt und konkret:** Jeder Satz beginnt mit dem Wesentlichen. Keine Einleitungsformeln, keine
  Aufwärmphrasen.
- **Substanziell:** Behauptungen werden mit Erfahrung, Referenzen oder konkreten Beispielen belegt.
  Allgemeinplätze ohne Substanz sind kein Inhalt.
- **Partnerschaftlich:** Wir schreiben mit dem Kunden, nicht über ihn. Kollegial, nicht devot, nicht
  belehrend.
- **Schweizer Schreibweise:** Konsequent «ss» statt «ß», für alle Texte, unabhängig vom Empfänger.

**Was Collabase nicht tut**
- Sales-Floskeln: «Gerne», «selbstverständlich», «im Rahmen dieser spannenden Herausforderung»
- Superlative ohne Substanz: «führend», «erstklassig», «unübertroffen»
- Unnötige Einleitungssätze, die den Inhalt verzögern
- Negierte Sätze, wo eine positive Formulierung möglich wäre
- Übermässiger Fettdruck: Fett nur für zentrale Begriffe, nie dekorativ

**Ansprache und Perspektive**
- **Angebote:** Kunde mit «Sie», Collabase in Wir-Form («Wir empfehlen…»), bei Unternehmensaussagen
  Wechsel auf den Namen («Collabase verfügt…»). Der Wechsel ist bewusst und verhindert einen
  Monolog-Eindruck.
- **Blogbeiträge:** Du-Form.
- Eigenlob ist erlaubt, wenn belegt. Ein konkreter Kompetenznachweis mit Beleg ist erlaubt, «Wir sind
  führend in…» ohne Beleg nicht.

**Umgang mit Unsicherheiten (besonders in Angeboten)**
Offenes wird klar und selbstsicher formuliert. Nicht: «Das könnte eventuell möglich sein.» Sondern:
«Den genauen Umfang stimmen wir in der Initialisierungsphase gemeinsam ab.» Offenheit ist eine
Stärke, Unklarheit eine Schwäche.

### 14.2 KI-typische Formulierungen vermeiden

Ziel ist nicht, KI-Einsatz zu verbergen, sondern Texte zu produzieren, die nach einem erfahrenen
Berater klingen.

**Verstärker und aufgeblähte Sprache**

| Besser so | Vermeiden |
|---|---|
| frühzeitig ansprechen | proaktiv adressieren |
| vollständige Dokumentation | lückenlose Dokumentation |
| wir setzen dies um | konsequent umsetzen |
| hat viel Erfahrung gesammelt | verfügt über einen breiten Erfahrungsschatz |
| sprechen wir offen an | adressieren wir transparent |
| je nach Thema | themenspezifisch |
| auf die Bedürfnisse ausgerichtet | bedürfnisorientiert |
| klar und umsetzbar | praxistauglich (wenn allein verwendet) |

**Das Gegensatzmuster**: «X ist keine Option, sondern Y» klingt bedeutungsschwanger, sagt aber
nichts aus, was eine direkte Formulierung nicht besser ausdrückt.

| Besser so | Vermeiden |
|---|---|
| In Microservice-Architekturen ist ein strukturierter API-Testing-Ansatz zentral für stabile Deployments. | Ein strukturierter API-Testing-Ansatz ist keine Option, sondern eine Grundvoraussetzung. |
| Qualität ist integraler Bestandteil jedes Entwicklungsschritts. | Qualität ist kein nachgelagerter Prüfschritt, sondern integraler Bestandteil. |
| Transparenz ist ein wichtiger Erfolgsfaktor. | Transparenz ist nicht optional, sondern zwingend erforderlich. |

**Der Gedankenstrich (Em-Dash)**: als rhetorisches Stilmittel ein verlässliches Erkennungszeichen
für KI-Text. Nur in strukturellen Aufzählungen, nie als rhetorische Pause mitten im Satz.

| Besser so | Vermeiden |
|---|---|
| Das Ergebnis: eine stabile, wartungsarme Lösung. | Das Ergebnis – eine stabile, wartungsarme Lösung – zeigt sich in der Praxis. |
| Drei Aspekte sind entscheidend: Strategie, Umsetzung und Transfer. | Drei Aspekte sind entscheidend – Strategie, Umsetzung und Transfer. |

**Drei Adjektive am Satzende**: drei kommagetrennte Adjektive/Adverbien am Satzschluss sind eines
der verlässlichsten Erkennungszeichen für uneditierten KI-Text.

| Besser so | Vermeiden |
|---|---|
| Das Ergebnis ist eine stabile und wartungsarme Lösung. | Das Ergebnis ist effizient, skalierbar und zukunftsorientiert. |
| Der Ansatz passt zu regulierten Umgebungen. | Der Ansatz ist sicher, compliant und bewährt. |

**Einstiegsfloskeln**: jeder Absatz beginnt mit dem Wesentlichen, nicht mit einer Aufwärmphrase.

| Besser so | Vermeiden |
|---|---|
| Collabase verarbeitet alle Daten ausschliesslich in Rechenzentren in der Schweiz. | In der heutigen Zeit ist Datensouveränität wichtiger denn je. |
| Das Assessment gliedert sich in vier Phasen. | Im Rahmen dieser Zusammenarbeit würden wir folgende Schritte vorschlagen. |
| Wir kennen dieses Spannungsfeld aus zahlreichen Kundenmandaten. | Viele Unternehmen stehen vor der Herausforderung, dass… |

**Das inhaltsleere Fazit**: am Ende steht ein konkreter nächster Schritt, eine klare Aussage oder
gar kein separates Fazit.

| Besser so | Vermeiden |
|---|---|
| Auf dieser Grundlage empfehlen wir, die Initialisierungsphase Ende August zu starten. | Zusammenfassend lässt sich sagen, dass Collabase der richtige Partner für dieses Vorhaben ist. |
| Den konkreten Zeitplan besprechen wir gerne in einem Erstgespräch. | Abschliessend möchten wir festhalten, dass wir uns auf eine Zusammenarbeit freuen. |

**Listen-Überfluss**: Aufzählungen nur bei tatsächlich gleichwertigen Elementen. Fliesstext zeigt
Denken, Listen zeigen Stichworte. Faustregel: Weniger als drei Punkte oder in einem Satz erklärbar →
Fliesstext.

**Weitere typische KI-Begriffe und Komposita**

| Wort vermeiden | Alternative / Hinweis |
|---|---|
| ganzheitlich | durch «holistisch» oder konkrete Beschreibung ersetzen |
| umfassend | konkret benennen, was gemeint ist |
| präzise (als Verstärker) | nur wenn tatsächlich Präzision gemeint ist |
| sauber (im übertragenen Sinn) | direkte Formulierung |
| nahtlos | «ohne Medienbruch», «direkt integriert» |
| nicht nur… sondern auch… | beide Aspekte gleichwertig direkt nennen |
| eintauchen (in ein Thema) | klingt nach Marketing, nicht nach Beratung |
| Qualitätssicherungslandschaft | Qualitätssicherungsszene, -branche oder direkte Beschreibung |
| themenspezifisch | «je nach Thema», «abhängig vom Inhalt» |
| hoher Enablement-Anspruch | «Wissenstransfer als fester Bestandteil jeder Phase» |

### 14.3 Collabase-eigene Stilbausteine

**Positive Sprache**: Probleme werden als Ausgangspunkte für Lösungen beschrieben.
- Sätze beginnen nicht mit «Aber», «Leider», «Leider müssen wir festhalten».
- Negativbeispiele nie als Einleitung: erst die Lösung, dann wenn nötig der Kontext.
- Einschränkungen als Rahmenbedingungen formulieren, nicht als Hindernisse.

| Besser so | Vermeiden |
|---|---|
| Die Rahmenbedingungen klären wir in der Initialisierungsphase gemeinsam. | Leider sind ohne klare Rahmenbedingungen keine verbindlichen Aussagen möglich. |
| Den Scope stimmen wir in Absprache mit dem Kunden ab. | Aber ohne definierten Scope ist eine Umsetzung nicht möglich. |
| Wo Anpassungsbedarf besteht, sprechen wir ihn frühzeitig an. | Leider zeigt die Erfahrung, dass viele Projekte an diesem Punkt scheitern. |

**Wörter mit negativer Konnotation ersetzen**: bei defensiv konnotierten Wörtern eine neutralere
Alternative wählen, ohne die Aussage zu verändern. Sinngemäss: «Problem» → «Fragestellung/Aufgabe»,
«Schwierigkeit» → «Herausforderung im Rahmen», «Fehler» → «Abweichung».

**Marktbegleiter statt Konkurrenz**: Collabase spricht nicht von Konkurrenz, Konkurrenten oder
Mitbewerbern. «Marktbegleiter» ist sachlich und signalisiert Stärke. Direkte Vergleiche mit anderen
Firmen vermeiden; eigene, belegte Stärken hervorheben.

**Belege und Nachweise richtig einsetzen**: Belege (technische Eigenschaften, Zertifikate,
Referenzen) sind Nachweise, keine Dekoration. Sie stützen eine konkrete Aussage und stehen nie als
Aufzählung am Ende.

| Besser so | Vermeiden |
|---|---|
| Dass Kundendaten die Schweiz nie verlassen, ist kein Versprechen, sondern durch die self-hosted Architektur technisch erzwungen. | Collabase ist Swiss-made, DSGVO-konform, self-hostable und vielseitig. |
| Weil die Instanz im eigenen Rechenzentrum läuft, ist die Datenhoheit nachprüfbar statt zugesichert. | Collabase bietet zahlreiche Vorteile, darunter volle Datensouveränität und hohe Sicherheit. |

**Freude, Motivation und Teamgeist**: erlaubt als ehrliche Haltung, nicht als Floskel. Dosierung:
einmal pro Text, an einer inhaltlich passenden Stelle. Wird als Option vorgeschlagen, nie automatisch
eingebaut.

| Wann einsetzen | Bedingung |
|---|---|
| Angebot | Wenn Thema/Kontext echt zu Collabase passt. Spezifische Aussage zum Vorhaben, keine generelle Schlussformel. |
| Blogbeitrag | Am Anfang oder Ende, wenn das Team aktiv involviert ist. Teambezug besonders passend. |
| Nie | Als Schlussformel in jedem Angebot. Als Ersatz für Substanz. Ohne Bezug zur Arbeit von Collabase. |

Formulierungsbeispiele: «Das Thema liegt uns am Herzen. Wir würden uns freuen, es gemeinsam mit Ihnen
anzugehen.» (Angebot) / «Spitzenleistungen entstehen selten allein. Was wir in diesem Projekt gelernt
haben, wäre ohne den gemeinsamen Effort im Team nicht möglich gewesen.» (Blog)

### 14.4 Struktur und Formatierung

| Grundsatz | Beschreibung |
|---|---|
| Ein Gedanke pro Absatz | Zwei inhaltlich unabhängige Aussagen → trennen. |
| Tabellen für Strukturen | Vergleiche, Phasenmodelle, Rollen, Übersichten in Tabellen. Argumentation in Fliesstext. |
| Fettdruck sparsam | Nur für Begriffe, die im Lesefluss auffallen sollen. |
| Satzlänge variieren | Kurze Sätze setzen Akzente, längere erklären Zusammenhänge. |

**Länge je nach Texttyp**

| Texttyp | Empfehlung |
|---|---|
| Hoch gewichtete RfP-Frage | Ausführlich mit Beispielen und Referenzbezügen. Tiefe vor Breite. |
| Tief gewichtete RfP-Frage | Prägnant auf den Punkt. Kein Fülltext. |
| Referenzbeschreibung | Drei Blöcke: Ausgangslage, Leistung Collabase, Ergebnis. |
| Personenprofil | Maximal eine Seite. Fokus auf Mandatsrelevanz. |
| Blogbeitrag | Einstieg mit konkreter Beobachtung oder Frage. Du-Form. Eigene Perspektive. |

### 14.5 Themenspezifische Hinweise

- **Referenzen formulieren:** Referenzen zeigen, was Collabase geleistet hat, nicht welche Tools
  verwendet wurden. Fokus auf Beratung, Strategie und messbare Ergebnisse. Toolnamen nur als Kontext.
  SAFe, FINMA und reguliertes Umfeld explizit erwähnen, wo zutreffend.
- **Preisangaben:** Stundensatz statt Tagessatz. Abrechnung nach effektivem Aufwand. Spesen im
  Stundensatz inkludiert und explizit erwähnt. Datensouveränität als Qualitätsmerkmal: «Daten- und
  Informationsbearbeitung erfolgt vollständig in der Schweiz.»
- **KI-Themen:** KI nie als isoliertes Verkaufsargument, nie mit übertriebenen Versprechen.
  Realistische Einordnung im Gesamtmandat. Differenzierer immer im Kundenkontext, nie als
  eigenständiges Kapitel.

### 14.6 Abschlusscheckliste (Geschäftstexte)

Vor Einreichung jedes Geschäftstextes prüfen:
- [ ] Beginnt kein Satz mit «Aber», «Leider» oder einem Negativbeispiel?
- [ ] Steht «Marktbegleiter» statt «Konkurrenz»?
- [ ] Alle KI-typischen Verstärker, Komposita und Gegensatzmuster entfernt?
- [ ] Konsequent «ss» statt «ß»?
- [ ] Gedankenstriche auf ein Minimum reduziert (nur in Aufzählungen)?
- [ ] Belege und Nachweise kontextbezogen eingesetzt, nicht als Aufzählung?
- [ ] Stundensatz statt Tagessatz?
- [ ] Klingt der Text nach einem erfahrenen Berater auf Augenhöhe?
- [ ] Gibt es eine Stelle, wo Freude oder Teamgeist authentisch passen würde? Falls ja: einmal
  eingebaut, nicht öfter.

---

## 15. Publishing, SEO and positioning

These rules come from the move of the docs to `collabase.ch/docs` (September 2026).

### Where the docs are served

- The public address is **`https://collabase.ch/docs`**. The website (Next.js on Vercel) proxies
  `/docs`, `/_mintlify` and `/mintlify-assets` to the Mintlify deployment
  `collabase-5ba5d338.mintlify.site`; the base path `/docs` is set in the Mintlify dashboard.
- **No DNS change for this.** Never add the CNAME `@ → cname.mintlify.builders` that the dashboard
  offers: it would send the whole website to Mintlify.
- Internal links in MDX and in `<Card href>` are written without `/docs` (`/installation`).
  Mintlify adds the base path. In raw HTML inside a `mode: "custom"` page, write absolute URLs
  (`https://collabase.ch/docs/installation`); a relative `/docs/...` there collides with the
  `docs/` folder of the Collabase Docs app.

### Home page

- `index.mdx` and `de/index.mdx` use `mode: "custom"`: introduction, a large search button that
  opens the built-in search (`#search-bar-entry`), then guides, apps, run-and-extend and links to
  collabase.ch. Style with Tailwind and include `dark:` variants.

### Analytics and consent

- Google Analytics runs only after consent. `integrations.cookies` in `docs.json` waits for the
  local storage key `collabase-doku-messung` with value `erlaubt`. The website's consent banner
  writes that key (`src/lib/einwilligung.ts`, `DOKU_SCHLUESSEL`). Change both sides together or not
  at all; without the key, the docs do not measure.

### Facts and sources

- Every statement about Collabase comes from an existing page in this repo or from the website.
  Never invent UI paths, buttons, templates, certifications or deadlines. If a fact is missing,
  leave it out and ask.
- **HERMES** pages summarise the official reference manual in your own words and name it as the
  source. No verbatim text, no figures and no wording that suggests endorsement by the Swiss
  Federal Chancellery. The «In Collabase» sections describe documented features only.

### Positioning

- No prices, no «from X CHF», no free tier, no community edition, no licence bundle promise
  («everything in one licence»). Collabase is proprietary software of Infometis AG; the entry point
  is a proof of concept (`https://collabase.ch/anfrage`).
- No comparisons with other vendors. Third-party product names only as facts about connectors or
  imports.
- No ® after Collabase: the trademark is filed, not registered.

### German pages

German is on: Mintlify shows the language switcher. The navigation is generated (see «Two languages» in §11); `scripts/docs-de-navigation.json` holds the German navbar, footer, banner and the label translations, nothing else. A tab or group label without a translation stays English, so add the translation there when you add an English label.

- Swiss spelling (ss, never ß), Du-Form, no dashes as a stylistic device.
- UI and product terms stay English as in the product (Space, Member, Collabase Docs, Object
  Type). Links go to the German page if it exists, otherwise to the English reference.
- A German twin has the same path under `de/` and the same structure as the English page: same
  phases, same tables, same screenshots (the product UI in screenshots stays English). Its anchors
  follow the German headings, so check every `#anchor` again after translating.
- Translate the guide and its checkpoints together. A guide that mixes German steps with English
  checkpoints breaks the red thread.
- Terms for identity topics, so the pages read the same:

  | English | German |
  |---|---|
  | sign-in | Anmeldung |
  | account | Konto |
  | deactivate, reactivate | deaktivieren, reaktivieren |
  | identity provider | Identity Provider |
  | provisioning | Provisionierung |
  | pilot group | Pilotgruppe |
  | licensed seat | Lizenzplatz |
  | checkpoint | Kontrollpunkt |
  | claim, assertion, tenant, token | Claim, Assertion, Tenant, Token |

---

## 16. Admin journeys and guides

Admins do not read pages, they do a job. A job that spans several pages, or two systems, gets a
guide that carries the admin from the first check to the last test. The detail lives on the
pages the guide links to.

### When to write a guide

Write a guide when an admin has to do one of these:

- visit three or more Collabase pages in a fixed order to reach one result;
- work in an external product, such as an identity provider, in the same job;
- choose between two paths that share most steps.

A topic with one setting stays a reference page. Do not turn a reference page into a guide to make
it look complete.

### Three page types, one job each

| Page type | Job | Typical content |
|---|---|---|
| **Guide** | Carry the admin through the journey | Requirements, time, phases, checkpoints, troubleshooting by symptom |
| **Setup page** | Explain one area completely | Who can do this, settings table, account matching, best practices, troubleshooting |
| **Operations page** | Say what the product does with data | Supported operations tables, how existing data is handled, limits, troubleshooting with a log column |

A fact has one home. The guide repeats only what the admin needs to act, never a whole settings
table, and links to the page that owns it. When a guide and a page disagree, the page is the
source and the guide is the bug.

### Guide skeleton

1. **Introduction.** The result in two sentences, then one sentence on how to read the guide.
2. **At a glance.** A table with **Result**, **Time**, **You need** and **Edition**. Name the
   paths through the guide when there is more than one, for example sign-in only, or sign-in and
   provisioning.
3. **Requirements.** In three groups: in Collabase, in the external system, network. Each item is
   something the admin can check. A preparation phase of the guide handles what is missing.
4. **Overview.** A table of the phases with what the admin does, the time, and a link to each phase
   heading.
5. **Phases.** Each phase has the same parts, in this order:
   - a line in italics: *Phase n of N, about x minutes. Previous: link. Next: link.*
   - the work, in `<Steps>`, with exact UI labels in bold;
   - a `<Check>` titled **Checkpoint** that says what the admin sees when the phase worked, and where
     to go if it did not;
   - a **Next** link.
6. **Keep it running.** A table of everything that expires or needs a recurring look: secrets,
   certificates, tokens, licences.
7. **Troubleshooting.** Grouped by where the admin sees the problem. Each row has what is seen, the
   cause, and what to do. Link to the setup or operations page for more causes.
8. **Related pages.** A `<CardGroup>` to the setup and operations pages.

### The red thread

- Number the phases and say where the admin is. Every phase links to the previous and the next one.
- A checkpoint closes every phase. A guide with a phase that ends without a visible result has a
  dead end.
- Every reference to another page is a link, with an anchor when the answer is one section. Every
  mention of a decision that was made earlier links back to it.
- A failing step links to the troubleshooting group for that step.
- Put the choice before the work. If two options exist, compare them in a table, give a default for
  the reader who has no reason to choose otherwise, and make both options end at the same
  checkpoint.
- State the time as a typical value for a first run, rounded. Name the part that varies, such as a
  first sync. Do not state a time nobody has measured as a fact.

### Setup and operations pages

- Open with **Who can do this?** as a two-row table: **Role** and **Edition**.
- Follow with **Before you begin**, then how it works, then the procedure in `<Steps>`.
- Describe settings in a **Setting** and **Details** table, in the order the screen shows them. List
  every field the screen has and no field it does not have.
- Describe what the product does with existing data in a situation and result table, for example
  what happens at a first sign-in when no account, one account or two accounts match.
- Operations pages list supported operations in an **Operation** and **Notes** table, once for
  accounts and once for groups, and state the limits.
- Troubleshooting tables on operations pages add a **Recorded in the log** column, so the admin knows
  where to look.
- Put **Best practices** after the settings, as short items with a reason each.

### Navigation

- A guide appears once in the English navigation, as its own group in the Guides tab. The setup and
  operations pages sit in the Administration tab under **Members and access**.
- Each setup page opens with a `<Tip>` that links to the guide, and each guide links to the pages it
  relies on.
- Mintlify builds anchors from the heading text with its own rules, not GitHub's. Do not guess them:
  give every heading that is linked, or that contains punctuation, an explicit `{#custom-id}`, for
  example `## Phase 1: Plan {#phase-1-plan}`. The id stays when you reword the heading. Check links with
  `mint broken-links --check-anchors`.

---

## 17. Screenshots

Screenshots show a state that words cannot carry, such as a panel full of fields or a dialog. Text
with exact UI labels comes first.

### Name and store

- PNG files in `images/`, flat, lowercase with hyphens: `<topic>-<what>.png`, for example
  `iam-saml-settings.png`. Screenshots of another vendor's product add the vendor:
  `iam-entra-saml-claims.png`.
- Keep the original out of the repo. Store a copy at most 2000 px wide.

### Capture

- Light mode, English UI, a demo instance with no customer data.
- Capture the panel or the page region that matters. Include the navigation only when the shot
  shows where to click.
- Mark one thing with a red frame at most. Do not annotate more.
- Prefer text steps for third-party screens. They change without notice, so each one costs
  upkeep. Add one only where the reader cannot find the field without it.

### Redact before you copy

Cover values with a solid red bar. Do not blur, a blur can be undone.

| Always cover | Why |
|---|---|
| Tokens, secrets and keys, **completely** | A visible first line is a leaked prefix. Revoke any token that appeared, even in part. |
| Customer and demo host names | They identify a customer. The shared part, such as `.collabase.app`, can stay. |
| Tenant, client and object IDs | They identify your organization. |
| Names, email addresses and profile photos of real people | Personal data |

Open the finished file at full size and read it once before you copy it into `images/`.

### Embed

```mdx
<Frame caption="One sentence that says what the reader sees.">
  <img src="/images/iam-saml-settings.png" alt="What the screenshot shows" className="w-[420px]" />
</Frame>
```

- Use `<img>`, not `![]()`. Describe the content in `alt`.
- Give tall panels `className="w-[420px]"`. Wide pages need no size. Do not use the `style` prop.
- Inside a `<Step>`, indent the frame with the step text.
- When a label on a screen changes, replace the screenshot in the same change (see
  `.agents/rules/docs-update.md` in the product repo).

---

## 18. Verify before you write

Every statement about what Collabase does is checked against the code or the running product
before it ships. A page that is well written and wrong costs more than a page that is missing.

| What you write | Where you check it |
|---|---|
| A button, field or heading | `src/dictionaries/en.json`, word for word |
| A default, limit or period | `src/config/constants` and the policy definitions |
| A message the member sees | `src/dictionaries/en.json` |
| What happens in a situation | The service that decides it, and its tests |
| A step in another vendor's product | That vendor's own documentation, not memory |

- A statement with "never" or "always" needs the code path that makes it true.
- Do not document a field the screen does not have, and do not leave out one it has. If the screen
  lacks a setting that the page needs, that is a product gap. Raise it, do not paper over it.
- A setting an admin cannot change in the UI is described as fixed, with its value.
- What you cannot verify, leave out or label as an estimate. Name the unverified items in the pull
  request.
- Check every internal link and every `#anchor` with `mint broken-links --check-anchors` before the
  pull request.

---

## 19. Components: when to use which

Mintlify ships a fixed set of components. Use the one that fits the job, and never two to say the same
thing. One emphasis device per paragraph. Components without `className` support: Banner, MDX,
Visibility. Style with Tailwind classes written out in full (`className="w-[420px]"`), never with the
`style` prop, which can shift the layout on load.

| Component | Use it when (example in our docs) | Do not use it when | Props that matter |
|---|---|---|---|
| `Steps`, `Step` | A procedure with an order: Option A OAuth, connecting SCIM | The items have no order | `title` on each step, `id` for a deep link |
| `Tabs`, `Tab` | The same task in another environment: install the desktop app on macOS, Windows, Linux | You need each variant as a heading with an anchor, or the variants differ in more than a few lines | `title`, `sync` (same titles switch together), `defaultTabIndex` |
| `CodeGroup` | The same command per shell or platform, every block has a title | One command | a title on every code block, `dropdown` |
| `View` | A long page whose steps differ per variant: Docker, Swarm, Kubernetes. Sparingly. | Short differences, use Tabs | `title`, `icon`; one View per variant, the table of contents follows it |
| `Accordion`, `AccordionGroup` | FAQ, optional depth, more than six troubleshooting entries | Steps the reader must do | `title`, `defaultOpen`, `description` |
| `Expandable` | Nested fields in an API response | Prose | `title`, `defaultOpen` |
| `Note` | A neutral clarification | A warning | none |
| `Info` | Context the reader may need: edition, background | An instruction | none |
| `Tip` | An optional shortcut or best practice | Something required | none |
| `Warning` | Something breaks, is a security risk or cannot be undone: the token is shown once | A harmless remark | none |
| `Danger` | Data is lost for good: anonymize an account, delete | Anything less | none |
| `Check` | The checkpoint at the end of a guide phase, and any "this is what success looks like" | Prose | none |
| `Card`, `Columns` | Next steps, related pages, the app overview. Use `horizontal` for lists of links | Body text | `title`, `icon`, `href`, `horizontal`, `cols` (1 to 4) |
| `Tile` | A gallery with a preview image: templates, HERMES scenarios | No preview image exists | `href`, `title`, `description`; light and dark image |
| `Frame` | Every screenshot, with a `caption` | Logos and icons | `caption`, `hint` |
| `Tooltip` | A term at its first use, linked to the glossary: SCIM, Space | An explanation the reader needs to continue | `tip`, `headline`, `cta`, `href` |
| `Badge` | A status in a table or a heading: Enterprise, Beta, deprecated | Running text | `color`, `size`, `shape`, `stroke` |
| `Update` | Release notes, only there (§12) | Any other list | `label`, `description`, `tags`, `rss` |
| `Prompt` | A copyable instruction for an AI tool: the example questions in the CollabaseAI skills, the setup text for an agent | Normal commands | `description`, `actions` (`copy`, `cursor`) |
| `Icon` | A UI button in a step, with the lucide icon the product shows | Decoration | `icon`, `size` |
| Mermaid | A flow, a state or an architecture that a table cannot show: permission fallback, meeting lifecycle, sign-in flow, hosting. Always with a sentence that says what it shows. | A table is enough | the fence prop `actions`, `placement` |
| `Tree` | A folder layout: deployment package, backup folder, bucket | Menu paths | `Tree.Folder`, `Tree.File`, `defaultOpen`, `highlight` |
| `Panel` | API pages that pin `RequestExample` and `ResponseExample` | Concept pages | none |
| `Visibility` | Text only for AI agents, such as an exact path. Very sparingly, never for anything a person needs | Hiding sensitive content, it still reaches the browser | `for="humans"` or `"agents"` |
| `Banner` | A site-wide notice, set per language in `docs.json` | Inside a page | `content`, `dismissible`, `type` |
| `ParamField`, `ResponseField`, `RequestExample`, `ResponseExample` | The API reference (`api/`) | Admin and user pages | `path`/`body`/`query`/`header`, `type`, `required` |
| `Color`, `GitHub`, `MDX`, `Callout` | Not used. The typed callouts above cover every case | | |

### Choosing a callout

Ask in this order: does something break or leak, then `Warning`. Is data lost for good, then `Danger`.
Is it a success state, then `Check`. Is it optional, then `Tip`. Is it background, then `Info`.
Otherwise `Note`. More than two callouts on a screen means the text needs restructuring.

### Reuse: snippets

A statement that appears on three or more pages lives once in `snippets/` and is imported. The tag
name starts with a capital letter, and a nested snippet imports its own children.

| Snippet | Content | Props |
|---|---|---|
| `EnterpriseNote` | One line that the feature is part of the Enterprise Edition | none |
| `WhoCanDoThis` | The two-row **Role** and **Edition** table | `role`, `edition` |
| `TokenShownOnce` | The warning that a token is shown only once | `days` |

Values from an imported expression do not appear to crawlers and AI tools, so write facts that
matter as plain text and use snippets for text blocks only.

---

## 20. Frontmatter

Every page has `title` and `description`. The other fields are used where they help.

| Field | Use | Example |
|---|---|---|
| `title` | Required. Unique across the site, sentence case. Becomes the H1 and the browser title | `"SAML single sign-on"` |
| `sidebarTitle` | A shorter label in the navigation | `"Overview"` |
| `description` | Required. One sentence in the present tense, at most 160 characters, unique. It is also the text in `llms.txt`, which uses the first paragraph up to 300 characters | |
| `icon` | An icon next to the page in the sidebar. On every page of the Automation and Developers tabs, otherwise only on hub pages | `icon: "key-round"` |
| `tag` | A label next to the title in the sidebar: `Beta` only. Never `Enterprise`; say it in the page with `EnterpriseNote` | `tag: "Beta"` |
| `keywords` | Search terms that the text does not contain, as an array | `keywords: ["SAML", "SSO", "Entra"]` |
| `boost` | Raises the page in the site search, 0.1 to 10. Entry points get 2 to 5, legacy pages below 1 | `boost: 3` |
| `hideFooterPagination` | Hides the previous and next links on landing and changelog pages | `true` |
| `deprecated` | Marks a legacy page. Remove it from the navigation later with a redirect | `true` |
| `hidden` | Removes the page from the navigation and the search. Never write `false`, remove the line instead | `true` |
| `noindex`, `searchable` | `noindex: true` keeps a page out of search engines. `searchable: false` keeps it out of the site search only | |
| `contextual` | Overrides the page menu. `options: []` switches it off on the home page | |
| `timestamp`, `lastUpdatedDate` | The "last modified" line comes from Git. Set `lastUpdatedDate` only for content that Git does not date | `"2026-10-13"` |
| `thumbnail`, `og:image` | A custom social preview. Meta tags with a colon need quotes | `"og:image": "https://…"` |
| `rss` | Only on the release notes page: shows the RSS button | `true` |
| `mode` | Default for pages. `custom` only for the home pages. The release notes page stays in the default mode so tags and the table of contents work | |

Not used: `related` (needs a paid add-on), `groups` (needs authentication).

---

## 21. Images, files and downloads

- **Format:** PNG for screenshots, SVG for diagrams without `foreignObject` (export with formatted text
  switched off), at most 20 MB per file. Alt text always describes what the image shows.
- **Size:** `className="w-[420px]"` for narrow panels. No `style` prop.
- **Zoom:** images zoom on click. Add `noZoom` to logos and to images that are links.
- **Light and dark:** two files, `block dark:hidden` and `hidden dark:block`, when the image has a
  background that clashes with the other mode.
- **Decoration:** a purely decorative image sits inside an element with `aria-hidden="true"` and
  still has a short `alt`, because `mint a11y` rejects an empty one. No image has `alt=""`.
- **Home page backdrop:** Tailwind classes only, hidden below the `md` breakpoint.
- **Files:** Mintlify serves images, video, audio, JSON, YAML, CSS, JS and fonts. PDF, TXT, XML, CSV
  and ZIP need the Enterprise plan. Installers (`.dmg`, `.exe`, `.pkg`, `.msi`, `.AppImage`) are not
  supported at all.
- **Downloads:** installers and the deployment package are never part of the docs. Link to
  `https://collabase.ch/en/download` (German: `https://collabase.ch/download`). Never link to the
  GitHub repository of the product.
- **Unused files:** an image that no page uses is deleted in the same change that removes its last use.

---

## 22. `docs.json`

Change it only for a reason, and say the reason in the pull request. What we set, and why:

| Setting | Value or policy |
|---|---|
| `theme`, `colors`, `fonts`, `icons.library`, `background` | Brand: the `mint` theme, lime, Inter, lucide, page `#ffffff` and `#101010`. `colors.primary` is forest `#0f4d38` because it colors text and links, `light` and `dark` are lime `#ccfc75` |
| `description` | One sentence about Collabase for search engines and AI tools |
| `seo.metatags`, `seo.organization` | `og:site_name`, `twitter:card`, the organization with logo |
| `thumbnails` | Preset `headline`, eyebrow from the tab |
| `search.prompt` | The placeholder in the search field |
| `styling.eyebrows` | `breadcrumbs` |
| `errors.404` | A short text with a link to the home page |
| `footer.links` | Website, Trust center, Download, Support. Social profiles only when they exist |
| `navigation.languages[].navbar` and `.banner` | Language link per language, and the German notice that the app reference is English |
| `contextual.options` | `copy`, `view`, `chatgpt`, `claude`, `perplexity`, `mcp`, `add-mcp`, `cursor`, `vscode`. Never `download-pdf` (Enterprise) or `download-spec` (needs OpenAPI) |
| `markdown.instructions` | Two lines for AI agents: UI labels are English, Enterprise features are marked |
| `variables` | Not used. The link checker does not resolve `{{name}}` in a link target, so links hold the address |
| `metadata.timestamp` | On |
| `redirects` | One per removed page, see §11 |
| `integrations` | Analytics only behind the consent key, see §15 |

Navigation limits: at most seven header tabs (we have seven), a label of at most four words, verbs
for tasks and nouns for reference. A group can open a `root` page, and `directory` can list its
children as cards. `tag` marks Beta groups; Enterprise is never a sidebar label, the page says it
with `EnterpriseNote`. Only one kind of child per level.

Not configured because the plan does not offer them: page feedback, the assistant, analytics, CI
checks of Mintlify. The rules describe our own checks in §24.

---

## 23. Quality bar

A page is done when a reader can finish the task with it and nothing else. Check these before the
pull request. They apply to every page, in English and German.

1. **One job.** The page answers one question or does one task. The title says which.
2. **Answer first.** The first paragraph holds the result and who needs it, not history.
3. **Prerequisites and result.** Every procedure names what you need, says what you see afterwards,
   and says what to do when it does not work.
4. **Concrete.** Values, limits, menu paths, defaults. No "easily", "various", "several".
5. **Verified.** Every statement about the product passed §18.
6. **Structure.** Headings are tasks or questions in sentence case, no level is skipped, a paragraph has
   two to four sentences, a sentence has about 25 words or fewer, a term means one thing.
7. **Scannable.** Settings and options are in tables with a header row, steps are in `<Steps>`,
   code blocks have a language and, in groups, a title.
8. **Linked.** The first use of a term links to its page or glossary entry. The page ends with
   **Next steps** or **Related**. A link text names the target, never "here".
9. **Failure.** A page with something that can go wrong has a **Troubleshooting** section built from
   real messages in `src/dictionaries/en.json`.
10. **Accessible.** Alt text, table headers, no information only in color or in an image.
11. **Findable.** Unique `title`, `description` in 160 characters or fewer, `keywords` for terms the
    text does not use.
12. **Readable by machines.** Descriptive link text, code language on every block, the fact as text
    and not only in a screenshot or a diagram.

Mintlify's four page types map onto ours: how-to and tutorial are guides and setup pages, concept
and reference are operations pages and reference pages (§16).

---

## 24. Checks and tools

The Mintlify plan we use has no CI checks, so we run our own, locally and in the product repo.

| Check | Command | What it finds |
|---|---|---|
| Build | `mint validate` | A page or `docs.json` that does not build |
| Links and anchors | `mint broken-links --check-anchors` | Dead internal links and anchors |
| Accessibility | `mint a11y` | Contrast and missing alt text |
| Score | `mint score https://collabase.ch/docs` | AI readiness of the live site, such as the `robots.txt` rules. Run it after a deploy, it needs the published URL |
| Structure and style | `scripts/check-docs.mjs` | Errors: missing, long or duplicate title and description, H1 in the body, skipped heading levels, em dashes in added text, numbered lists outside `<Steps>`, code without language, images without alt or unused, undefined variables, missing snippets, pages and navigation that do not match, German pages without an English page. Warnings: pages without links, orphans, a German twin that did not change with its English page |
| Prose | `vale .` | Forbidden words, headings not in sentence case, banned terms |
| All of it | `npm run docs:check` in the product repo | Runs build, links and anchors, accessibility, structure and prose in one go |

- `mint a11y` also scores the brand colors. The primary dark green passes at 7.2:1. It reports one failure that
  is by design: the lime button fill against a light page is 1.10:1, below the 3:1 for a component edge,
  while the dark text on the lime passes at 14:1. `docs-check.sh` prints that result and fails only on
  findings such as missing alt text. Changing the button is a brand decision, not a docs change.
- Vale is configured in `.vale.ini` with the style in `styles/Collabase/`. A word that is correct but
  flagged goes into `styles/config/vocabularies/Collabase/accept.txt`. Switch Vale off for a block with
  `{/* vale off */}` and `{/* vale on */}`, never between two `<Step>` elements.
- `scripts/`, `styles/` and `.vale.ini` are listed in `.mintignore` and are never published.
- The `docs` job in `.github/workflows/ci.yml` of the product repo runs `docs/docs/scripts/docs-check.sh`
  for every pull request that changes `docs/docs/`. `scripts/ci-changes.sh` decides when it runs.
- Em dashes: new and changed text has none. Old pages lose them when someone edits them, there is no
  sweep.

---

## 25. Color, surface and type

The docs follow the website's new design (`collabase-landingpage`, rule `design-neu.md`, live reference
`/styleguide-2.0`). The website is the source: the tokens in `style.css` are copies of `src/styles/geruest.css`, and a
change there is pulled into `style.css` the same day. Lime is the brand and sits on buttons and one headline marker. There
is no gold and no sage.

### Surfaces

Calm and flat: no boxes, no second edge, no shadow on content. A surface is separated by one 1px line.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--ds-bg` | `#ffffff` | `#101010` | The page (`docs.json` `background.color`) and every card |
| `--ds-bg-2` / `-3` / `-4` | `#fafafb` / `#f3f4f6` / `#edeff3` | `#161718` / `#1c1d1f` / `#232529` | Hover, a row, a fill inside a card |
| `--ds-linie` / `-2` / `-3` | `#eceef2` / `#e1e4ea` / `#cad0d9` | `#1f2023` / `#2a2d32` / `#383e47` | Lines, from the faintest to a hover edge |
| `--ds-text-1` to `-4` | `#17181a` to `#8f99a8` | `#f3f4f6` to `#6f7988` | Text, from headline to meta |

Radius: 10px for controls (search field, buttons), 12px for cards and screenshots.

### Colors

| Color | Light | Dark | Use |
|---|---|---|---|
| Lime `--ds-knopf` | `#ccfc75` | `#ccfc75` | Primary button, the headline marker, the banner. Always with dark text `#101010` |
| Accent text `--ds-akzent-text` | forest `#0f4d38` | lime `#ccfc75` | Links, active entries, tags |
| Signal `--ds-signal` | `#10a874` | `#1ae299` | Check marks, the green badge, focus |
| Band `--ds-band` | `#101010` | `#0a0a0a` | Code blocks, dark bands |

- Lime never carries text on white (1.1:1). Forest stands there.
- One marker per section. Light: dark text on a lime marker. Dark: lime text, no fill.
- Icons on cards are neutral (`--ds-text-2`). Colored stay the app icons, the integration logos and the logo.
- Contrast: forest on white 9.8, dark text on lime 14.4, lime on `#101010` 16.3. All pass AAA.

### Type

Inter for everything (`docs.json` `fonts`, headings 500, body 400), JetBrains Mono only for code. No fourth family.
Headlines carry tracking -0.03em, never weight 700 or 900. Home headline 56px with line height 1.05, section headline
24px. The label above a headline is `[ LABEL ]`: Inter 12px, uppercase, +0.06em, no fill (`home-pill`). Section heads
are not centered, except the home hero.

### Header and illustration

The header is flat, with the `--ds-kopf` backing. Illustrations are drawn, not scattered. A picture that says nothing
once the title is covered is dropped. Screenshots of procedures stay (the website's ban on screenshots is for its
marketing pages), framed with a 1px `--ds-bild-kante` line and a 12px radius.

### Home background

The home hero carries a dot field that fades out downwards (`home-dots`) and the seven app icons floating at the
edges (`home-float`). Rules: decoration only (`aria-hidden`, no clicks, never behind text, kept clear of the search
field), one float loop of 9 seconds with 10px and 2 degrees of travel, each icon with its own offset, hidden below
1100px width, still with `prefers-reduced-motion`. Light and dark use the matching icon file. Both home pages carry
the same markup. The floating icons are the only continuous motion on the screen. No other page gets them.

### App landing pages

An app overview page has no hero block. It opens with the theme's own header (breadcrumb, title, description) and one
short paragraph. Wrap the rest of the page in `<div className="home-cards brand-cards">` so its cards get the flat
card and the neutral icon.

### Announcement banner

Lime with dark text. The theme fixes the banner text to white, so `style.css` forces the dark text.

### How the docs apply it

The tokens live in `style.css`, which Mintlify loads on every page, and in `docs.json`. The docs are light by default
and dark on request (class `.dark`), so each token has a light and a dark value.

| Piece | How |
|---|---|
| Home cards and search | class `home-cards` on the wrapper, `home-search` on the field: 1px `--ds-linie-2`, no shadow |
| Headline marker | `<span className="brand-marker-action">word</span>` in the hero, `brand-marker` in a section. One word |
| Card icon | `className="brand-cards"` on the `Columns` that holds the cards. Not on cards with an image icon |
| Sidebar tag | `tag` in frontmatter or on a group: `--ds-bg-3` with a 1px line, forest or lime text |
| Green `Badge` | `<Badge color="green">`, the only badge color with the brand |
| Buttons | `colors.dark` in `docs.json` and the text rule in `style.css` |
| Text and links | `colors.primary` (forest) and `colors.light` in `docs.json` |
| Fonts | `fonts` in `docs.json`, mono and tracking in `style.css` |

Logo and favicon: `images/logo-black.svg` (light mode), `images/logo-white.svg` (dark mode) are the files of the
brand set `Collabase_Logo_E`. The favicon is the black icon tile in two files, `images/favicon-light.png` and
`images/favicon-dark.png`. Replace a file and keep its name when the brand set changes.

Not used: sage, gold, a gradient, green in callouts, or a second edge around a card. Screenshots of the product show
the product's own colors and are not recolored.
