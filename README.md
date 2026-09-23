# Collabase Documentation

The user documentation for [Collabase](https://github.com/Collabase/collabase) — the source of the
public docs site. Built with [Mintlify](https://mintlify.com): every page is an MDX file with YAML
frontmatter, and `docs.json` defines the navigation.

Docs live in the main Collabase repo, next to the code they describe, so a feature and its
documentation change in the same pull request.

---

## Read this first

```
.agents/rules/documentation-rules.md
```

That is the writing standard, and it is binding: audience, tone, page structure, components,
terminology, `docs.json` navigation, and the release-note format. A PR that ignores it gets sent
back, no matter how correct the content is.

The short version:

- Write for **"Peter from IT"** — the admin who runs Collabase, not a developer on it. No library
  names, no architecture, no internal API routes. Exception: `developer/` and `api/` are written for
  engineers.
- Active voice, second person, short sentences. No marketing words, no filler.
- `<Steps>` for every procedure. Tables for reference content.
- Every new page goes into `docs.json`, or it does not exist on the site.

---

## Where the docs live, and how they publish

The docs exist in two repos, byte-for-byte identical:

| Repo | Path | Role |
|---|---|---|
| `Collabase/collabase` (private) | `docs/docs/` | **Where you edit.** PRs land here. |
| Publish repo (private) | repo root | **Where it deploys from.** Mintlify builds its default branch. |

Edit in the Collabase repo. A maintainer copies merged changes into the publish repo and deploys.
You never need access to the publish repo to contribute.

> **Structure is frozen.** A maintainer copies files across by hand, so never move, rename, or
> restructure folders, and never change `docs.json` beyond adding or reordering pages. A change that
> only works in one repo breaks the copy and breaks the site.

---

## Local preview

```bash
npm i -g mint          # once
mint dev               # preview at http://localhost:3000
mint broken-links      # every internal href must resolve
```

Run both from this folder — the one containing `docs.json`.

Troubleshooting: if a page 404s, check you are in the folder with `docs.json`. If the dev server
misbehaves, `mint update` pulls the latest CLI.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for the docs-specific workflow, and the
[Collabase contribution guide](https://github.com/Collabase/collabase/blob/main/CONTRIBUTING.md) for
the process that applies to every PR — issue first, CLA, and AI-tool disclosure.
