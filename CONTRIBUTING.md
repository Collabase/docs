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

1. **Branch:** `docs/<short-description>`.
2. **Write**, following `.agents/rules/documentation-rules.md`.
3. **Preview and run the checks:**
   ```bash
   npm i -g mint            # once
   mint dev                 # http://localhost:3000, run from the folder containing docs.json
   npm run docs:check       # in the product repo: build, links and anchors, accessibility, structure, prose
   ```
   The same check runs on every pull request that changes `docs/docs/`.
4. **Commit** using Conventional Commits — `docs: correct the backup schedule path`.
5. **Open the PR.** The title follows `<type>(<scope>): <Summary>`. Fill in the PR template;
   `CI OK` must be green.

---

## Checklist

- [ ] Read `.agents/rules/documentation-rules.md`
- [ ] Written for the right audience — no developer jargon outside `developer/` and `api/`
- [ ] Frontmatter present, with a `description` that says something useful
- [ ] Terminology matches the standard (Space, Member, Object Type, …)
- [ ] Procedures use `<Steps>`
- [ ] New pages registered in `docs.json`
- [ ] A release note is one `<Update>` at the top of `changelog/overview.mdx`, with tags for its categories
- [ ] `npm run docs:check` finishes without errors
- [ ] Components are chosen as in section 19 of the standard, screenshots are redacted as in section 17
- [ ] No folder moved, renamed, or restructured
