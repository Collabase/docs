# Contributing to the Collabase documentation

This repository holds the source of the documentation published at <https://collabase.ch/docs>.
It is maintained by the Collabase team. Changes follow the same rules as code changes, with one
addition: the writing standard.

---

## Before you write

Read the standard:

```
.agents/rules/documentation-rules.md
```

It is binding, and it covers everything the review checks: audience, tone, page structure,
components, terminology, navigation, and release notes. Content that is factually correct but off
the standard still gets sent back, so read it first rather than after.

> **Never move, rename, or restructure folders, and never change `docs.json` beyond adding or
> reordering pages.** Also off-limits in a content change: theme, colors, and logos in `docs.json`.

---

## Workflow

1. **Branch:** `docs/<short-description>`.
2. **Write**, following `.agents/rules/documentation-rules.md`.
3. **Preview and run the checks:**
   ```bash
   npm i -g mint            # once
   mint dev                 # http://localhost:3000, run from the folder containing docs.json
   bash scripts/docs-check.sh   # build, links and anchors, accessibility, structure, prose
   ```
   The same check runs on every pull request.
4. **Commit** using Conventional Commits, for example `docs: correct the backup schedule path`.
5. **Open the pull request.** The title follows `<type>(<scope>): <Summary>`. The `Docs check` must be green.

---

## Checklist

- [ ] Read `.agents/rules/documentation-rules.md`
- [ ] Written for the right audience, no developer jargon outside `developer/` and `api/`
- [ ] Frontmatter present, with a `description` that says something useful
- [ ] Terminology matches the standard (Space, Member, Object Type, ...)
- [ ] Procedures use `<Steps>`
- [ ] New pages registered in `docs.json`
- [ ] A release note is one `<Update>` at the top of `changelog/overview.mdx`, with tags for its categories
- [ ] `bash scripts/docs-check.sh` finishes without errors
- [ ] Components are chosen as in section 19 of the standard, screenshots are redacted as in section 17
- [ ] No folder moved, renamed, or restructured
