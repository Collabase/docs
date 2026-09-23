---
description: Canonical standard for writing and updating Collabase documentation and release notes. Applies to every MDX file in this docs project, in whichever repo you are reading it.
---

# Documentation Standards

This is the single source of truth for how Collabase documentation is written. Read it before you
write or edit any page.

It lives next to the docs themselves, so it is identical in both places the docs exist (see below).
If you find it contradicting anything else, this file wins and the other file is the bug.

---

## 1. Where the docs live and how they ship

The docs exist in two repos, and they are byte-for-byte identical:

| Repo | Path | Role |
|---|---|---|
| `Collabase/collabase` (private) | `docs/docs/` | **Where you edit.** Changes land here as normal PRs. |
| The publish repo (private) | repo root | **Where it deploys from.** Mintlify builds and publishes from its default branch. |

Edit the docs in the product repo. A maintainer copies merged changes into the publish repo and
deploys. You never need access to the publish repo to change the docs.

**Because a maintainer copies files across, structure is a hard constraint:** never move, rename, or
restructure folders, and never change `docs.json` beyond adding or reordering pages. A change that
only works in one of the two repos breaks the copy and breaks the build.

---

## 2. Persona & perspective

**General audience — "Peter from IT."**
For all product, administration, and feature documentation, write for the IT administrator who
deploys, configures, and maintains Collabase. He is not a developer on this codebase.

- **No developer jargon.** No internal dependency or library names, no architecture (Prisma, BullMQ,
  Next.js, Vite, React Flow, service layer, container names, database fields, internal API routes).
- **Focus on action.** Answer "what do I do?", "what do I type?", and "what happens if it fails?".
- **Keep it simple.** Plain, professional language. The reader is running a product, not reading our
  source code.

**Developer & API audience — the exception.**
Pages under `developer/` and `api/` are written for engineers building extensions or integrating.

- Code examples, compilation steps, internal mechanics, and architecture detail are all welcome.
- Use precise technical language: host functions, hooks, WebAssembly, endpoints, webhooks.

**Never document how to run the source.** Give customers the exact commands for the ZIP deployment
they receive. Never tell a reader to pull from a private GitHub repo.

---

## 3. Project layout

```
docs.json              # Global nav, theme, logos — only touch it to add or reorder a page
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
changelog/             # Release notes
images/                # Screenshots (PNG only, named after the app)
```

### Where a new page belongs

| Content type | Folder | Example |
|---|---|---|
| App feature page | `<app-name>/` | `registry/schema-designer.mdx` |
| Platform concept | `concepts/` | `concepts/search.mdx` |
| Admin topic | `admin/` | `admin/backup.mdx` |
| API endpoint | `api/<group>/` | `api/automation/trigger-automation.mdx` |
| Release note | `changelog/` | `changelog/v0-10-0.mdx` |

After creating a page, register it in `docs.json` (see §10). A page that is not in `docs.json` does
not exist on the site.

---

## 4. Frontmatter

Every `.mdx` file opens with YAML frontmatter. Use only the fields that apply.

```yaml
---
title: "Triggers"
sidebarTitle: "Overview"     # Only when the nav label should differ from the h1
description: "One sentence describing what this page covers and why it matters."
---
```

- **`title`** — browser tab and search results. Sentence case, unless the heading is a proper noun.
- **`sidebarTitle`** — use `"Overview"` on overview pages to keep the nav short. Omit elsewhere.
- **`description`** — shown in search results and under the sidebar title. One sentence, present
  tense, no trailing period needed. It must communicate value, not just label the page.

---

## 5. Page structure

```
[frontmatter]

<img src="/images/<app>.png" alt="<App name>" width="60" />   ← overview pages only

# Page Title

One short paragraph, no heading above it. What this is and why it matters.

## Section heading

Content.

## Next steps    ← app overview pages only

<CardGroup> linking to subpages
```

### Headings

- One `# H1` per page, matching `title` in the frontmatter.
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
- Colloquialisms and idioms — they translate badly and age badly.
- Over-explaining. Trust the reader.
- Restating the page title as prose to open a section.
- Placeholder text. Every section ships complete or not at all.

---

## 7. Terminology

Use these consistently on every page.

| Term | Not |
|---|---|
| Space | workspace, project, organisation |
| Member | user, account |
| Collabase Docs | "Docs app", "wiki" |
| Test Management | "test module", "QA tool" |
| Automation | "workflow engine", "the automations" |
| Intranet | "blog", "announcements module" |
| Registry | "app registry", "data catalog" |
| Schema | "data model", "template" |
| Object Type | "entity", "table" |
| Object | "record", "entry", "item" |

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
| `<Steps>` + `<Step>` | Any sequential procedure — always prefer over numbered Markdown lists |
| `<CardGroup>` + `<Card>` | Linking to related pages ("How it works", "Next steps"), connected apps |
| `<AccordionGroup>` + `<Accordion>` | "Why use X" benefit lists, optional detail |
| `<Note>` | Clarification that is not a warning |
| `<Warning>` | Something destructive, or that breaks the feature if missed |
| `<Tip>` | Optional best practice or shortcut |
| `<img>` (not `![]()`) | App logo on overview pages only — always `width="60"` |

A page with plain prose and one `<Steps>` block beats a page with five component types.

### App overview page pattern

```mdx
<img src="/images/<app>.png" alt="<App Name>" width="60" />

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

[Opening paragraph — what this is, in one sentence]

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
- Filename is the lowercase app or feature name: `automation.png`, `registry.png`.
- Reference as `<img src="/images/filename.png" alt="Description" width="60" />`, overview pages only.
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
- Order follows the user's journey — most important first.
- Never add a page to `docs.json` without the `.mdx` file, or the reverse.
- Do not touch theme, colors, logos, or navigation groups in a content PR.

---

## 12. Release notes

Every user-facing change gets an entry under `changelog/`. Release notes are customer-facing — hold
them to a higher bar than a page.

**Never auto-generate release notes or changelogs.** Skills, commands, and agents must not write,
update, or append a release note or changelog entry on their own initiative — not as a side effect of
another task, not "to be helpful". Write one only when the user explicitly asks for it. When a change
would warrant a release note, flag that it is due and let the user decide; do not create it unprompted.

Use these categories, in this order. Omit a category that has no entries.

1. `### ✨ New features & improvements`
2. `### 🎨 Layout & UX`
3. `### 🛠 Stability & Maintenance`
4. `### 🔒 Security & Vulnerabilities`

**No stack details.** For stability or layout updates, never list dependency bumps by library name
("Updated React to 18.3"). Summarize generically.

**Security section: business impact and CVEs only.** Never list dev-dependencies (`vite`, `vitest`,
`playwright`). Name a production third-party library only for critical, widely known
vulnerabilities. Otherwise summarize by affected component.

**Every new release note must be registered twice:** in the `Release Notes` group in `docs.json`,
and as a `<Card>` on `changelog/overview.mdx`.

### Security format — with CVEs

```md
### 🔒 Security & Vulnerabilities

| Vulnerability / CVE | Severity | Affected Component / Description |
|---|---|---|
| CVE-202X-XXXX | High (8.5) | Resolves a remote code execution vulnerability in the document processor. |
| Third-Party | Medium | Patched a vulnerability in a third-party AI module to prevent potential data leakage. |
```

### Security format — routine maintenance

```md
### 🔒 Security & Vulnerabilities

* Performed routine security updates and patched non-critical third-party dependencies in the
  backend and AI services.
```

---

## 13. Before you open the PR

```bash
npm i -g mint      # once
mint dev           # preview at localhost:3000
mint broken-links  # every internal href must resolve
```

Checklist:

- [ ] Frontmatter present, `description` says something useful
- [ ] Written for the right audience (§2) — no developer jargon outside `developer/` and `api/`
- [ ] Terminology matches §7
- [ ] Procedures use `<Steps>`
- [ ] New pages registered in `docs.json`
- [ ] `mint broken-links` is clean
- [ ] No folder moved, renamed, or restructured

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
- **Schweizer Schreibweise:** Konsequent «ss» statt «ß» — für alle Texte, unabhängig vom Empfänger.

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

**Das Gegensatzmuster** — «X ist keine Option, sondern Y» klingt bedeutungsschwanger, sagt aber
nichts aus, was eine direkte Formulierung nicht besser ausdrückt.

| Besser so | Vermeiden |
|---|---|
| In Microservice-Architekturen ist ein strukturierter API-Testing-Ansatz zentral für stabile Deployments. | Ein strukturierter API-Testing-Ansatz ist keine Option, sondern eine Grundvoraussetzung. |
| Qualität ist integraler Bestandteil jedes Entwicklungsschritts. | Qualität ist kein nachgelagerter Prüfschritt, sondern integraler Bestandteil. |
| Transparenz ist ein wichtiger Erfolgsfaktor. | Transparenz ist nicht optional, sondern zwingend erforderlich. |

**Der Gedankenstrich (Em-Dash)** — als rhetorisches Stilmittel ein verlässliches Erkennungszeichen
für KI-Text. Nur in strukturellen Aufzählungen, nie als rhetorische Pause mitten im Satz.

| Besser so | Vermeiden |
|---|---|
| Das Ergebnis: eine stabile, wartungsarme Lösung. | Das Ergebnis – eine stabile, wartungsarme Lösung – zeigt sich in der Praxis. |
| Drei Aspekte sind entscheidend: Strategie, Umsetzung und Transfer. | Drei Aspekte sind entscheidend – Strategie, Umsetzung und Transfer. |

**Drei Adjektive am Satzende** — drei kommagetrennte Adjektive/Adverbien am Satzschluss sind eines
der verlässlichsten Erkennungszeichen für uneditierten KI-Text.

| Besser so | Vermeiden |
|---|---|
| Das Ergebnis ist eine stabile und wartungsarme Lösung. | Das Ergebnis ist effizient, skalierbar und zukunftsorientiert. |
| Der Ansatz passt zu regulierten Umgebungen. | Der Ansatz ist sicher, compliant und bewährt. |

**Einstiegsfloskeln** — jeder Absatz beginnt mit dem Wesentlichen, nicht mit einer Aufwärmphrase.

| Besser so | Vermeiden |
|---|---|
| Collabase verarbeitet alle Daten ausschliesslich in Rechenzentren in der Schweiz. | In der heutigen Zeit ist Datensouveränität wichtiger denn je. |
| Das Assessment gliedert sich in vier Phasen. | Im Rahmen dieser Zusammenarbeit würden wir folgende Schritte vorschlagen. |
| Wir kennen dieses Spannungsfeld aus zahlreichen Kundenmandaten. | Viele Unternehmen stehen vor der Herausforderung, dass… |

**Das inhaltsleere Fazit** — am Ende steht ein konkreter nächster Schritt, eine klare Aussage oder
gar kein separates Fazit.

| Besser so | Vermeiden |
|---|---|
| Auf dieser Grundlage empfehlen wir, die Initialisierungsphase Ende August zu starten. | Zusammenfassend lässt sich sagen, dass Collabase der richtige Partner für dieses Vorhaben ist. |
| Den konkreten Zeitplan besprechen wir gerne in einem Erstgespräch. | Abschliessend möchten wir festhalten, dass wir uns auf eine Zusammenarbeit freuen. |

**Listen-Überfluss** — Aufzählungen nur bei tatsächlich gleichwertigen Elementen. Fliesstext zeigt
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

**Positive Sprache** — Probleme werden als Ausgangspunkte für Lösungen beschrieben.
- Sätze beginnen nicht mit «Aber», «Leider», «Leider müssen wir festhalten».
- Negativbeispiele nie als Einleitung: erst die Lösung, dann wenn nötig der Kontext.
- Einschränkungen als Rahmenbedingungen formulieren, nicht als Hindernisse.

| Besser so | Vermeiden |
|---|---|
| Die Rahmenbedingungen klären wir in der Initialisierungsphase gemeinsam. | Leider sind ohne klare Rahmenbedingungen keine verbindlichen Aussagen möglich. |
| Den Scope stimmen wir in Absprache mit dem Kunden ab. | Aber ohne definierten Scope ist eine Umsetzung nicht möglich. |
| Wo Anpassungsbedarf besteht, sprechen wir ihn frühzeitig an. | Leider zeigt die Erfahrung, dass viele Projekte an diesem Punkt scheitern. |

**Wörter mit negativer Konnotation ersetzen** — bei defensiv konnotierten Wörtern eine neutralere
Alternative wählen, ohne die Aussage zu verändern. Sinngemäss: «Problem» → «Fragestellung/Aufgabe»,
«Schwierigkeit» → «Herausforderung im Rahmen», «Fehler» → «Abweichung».

**Marktbegleiter statt Konkurrenz** — Collabase spricht nicht von Konkurrenz, Konkurrenten oder
Mitbewerbern. «Marktbegleiter» ist sachlich und signalisiert Stärke. Direkte Vergleiche mit anderen
Firmen vermeiden; eigene, belegte Stärken hervorheben.

**Belege und Nachweise richtig einsetzen** — Belege (technische Eigenschaften, Zertifikate,
Referenzen) sind Nachweise, keine Dekoration. Sie stützen eine konkrete Aussage und stehen nie als
Aufzählung am Ende.

| Besser so | Vermeiden |
|---|---|
| Dass Kundendaten die Schweiz nie verlassen, ist kein Versprechen, sondern durch die self-hosted Architektur technisch erzwungen. | Collabase ist Swiss-made, DSGVO-konform, self-hostable und vielseitig. |
| Weil die Instanz im eigenen Rechenzentrum läuft, ist die Datenhoheit nachprüfbar statt zugesichert. | Collabase bietet zahlreiche Vorteile, darunter volle Datensouveränität und hohe Sicherheit. |

**Freude, Motivation und Teamgeist** — erlaubt als ehrliche Haltung, nicht als Floskel. Dosierung:
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
