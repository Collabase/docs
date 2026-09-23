# Contributing to the Collabase documentation

This folder lives in the main [Collabase repo](https://github.com/Collabase/collabase) so that a
change to a feature and the change to its documentation travel in the same pull request.

Docs changes follow the same rules as code changes, with one addition: the writing standard.

---

## Before you write

Read the standard:

```
.agents/rules/documentation-rules.md
```

It is binding, and it covers everything the review checks — audience, tone, page structure,
components, terminology, navigation, and release notes. Content that is factually correct but off
the standard still gets sent back, so read it first rather than after.

---

## Where to edit

Edit the docs in the Collabase repo, under `docs/docs/`. That is the only place to change them.

The docs also exist in a private repo that Mintlify deploys from — a maintainer copies merged
changes over and publishes. You never need access to it.

> **Never move, rename, or restructure folders, and never change `docs.json` beyond adding or
> reordering pages.** The two copies must stay identical. A structural change breaks the copy and
> breaks the site.

Also off-limits in a content PR: theme, colors, and logos in `docs.json`.

---

## Workflow

1. **Open an issue first.** Every contribution to Collabase starts as an issue — see the
   [contribution guide](https://github.com/Collabase/collabase/blob/main/CONTRIBUTING.md). For an
   obvious factual fix (a wrong menu path, a stale setting name), say so in the issue and go ahead.
2. **Branch:** `docs/<short-description>`.
3. **Write**, following `.agents/rules/documentation-rules.md`.
4. **Preview and check links:**
   ```bash
   npm i -g mint      # once
   mint dev           # http://localhost:3000
   mint broken-links  # every internal href must resolve
   ```
   Run both from the folder containing `docs.json`.
5. **Commit** using Conventional Commits — `docs: correct the backup schedule path`.
6. **Open the PR.** The title follows `<type>(<scope>): <Summary>`. You must sign the CLA (once,
   automated via a PR comment) and disclose any AI tool use in the PR template.

**Typo-only PRs are rejected** — bundle small fixes into one meaningful PR, or file an issue.

---

## Checklist

- [ ] Read `.agents/rules/documentation-rules.md`
- [ ] Written for the right audience — no developer jargon outside `developer/` and `api/`
- [ ] Frontmatter present, with a `description` that says something useful
- [ ] Terminology matches the standard (Space, Member, Object Type, …)
- [ ] Procedures use `<Steps>`
- [ ] New pages registered in `docs.json`
- [ ] Release notes also registered in `changelog/overview.mdx`
- [ ] `mint broken-links` is clean
- [ ] No folder moved, renamed, or restructured
