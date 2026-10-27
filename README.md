# Collabase Documentation

The user documentation for [Collabase](https://collabase.ch), published at
<https://collabase.ch/docs>. Built with [Mintlify](https://mintlify.com): every page is an MDX file
with YAML frontmatter, and `docs.json` defines the navigation.

The content is publicly readable. It is not open for reuse: see [LICENSE](LICENSE).

---

## Read this first

```
.agents/rules/documentation-rules.md
```

That is the writing standard, and it is binding: audience, tone, page structure, components,
terminology, `docs.json` navigation, and the release-note format. A change that ignores it gets sent
back, no matter how correct the content is.

The short version:

- Write for **"Peter from IT"**, the admin who runs Collabase, not a developer on it. No library
  names, no architecture, no internal API routes. Exception: `developer/` and `api/` are written for
  engineers.
- Active voice, second person, short sentences. No marketing words, no filler.
- `<Steps>` for every procedure. Tables for reference content.
- Every new page goes into `docs.json`, or it does not exist on the site.

> **Structure is frozen.** Never move, rename, or restructure folders, and never change `docs.json`
> beyond adding or reordering pages.

---

## Local preview and checks

```bash
npm i -g mint                          # once
mint dev                               # preview at http://localhost:3000
mint broken-links --check-anchors      # every internal link and anchor must resolve
bash scripts/docs-check.sh             # every check, as the pull request runs it
```

Run these from the folder containing `docs.json`. The same checks run on every pull request
(`.github/workflows/ci.yml`).

Troubleshooting: if a page 404s, check you are in the folder with `docs.json`. If the dev server
misbehaves, `mint update` pulls the latest CLI.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). This repository is maintained by the Collabase team; there
is no public issue tracker.

## Authorship and ownership

All code in Collabase and in this repository up to and including the v1.0.0 release is the private work
of Brian Trepto.

Work created after v1.0.0 is created in collaboration with Infometis AG. Who owns that later work has not
been settled yet. Until it is, a contribution made after v1.0.0 is not licensed beyond what the
`LICENSE` file of this repository states, and nobody should assume otherwise.
