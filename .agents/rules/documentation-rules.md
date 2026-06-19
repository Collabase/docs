---
description: Standards and rules for writing and updating Collabase documentation and release notes. Applies to all MDX files in the docs project.
---

# Documentation Standards

This document defines the rules for writing documentation and release notes in the Collabase documentation project.

## 1. Persona & Perspective ("Peter from IT")

All documentation is written for the customer — specifically the IT Administrator ("Peter from IT") who deploys, configures, and maintains Collabase, as well as the end-users.

- **No Developer Jargon:** Do not use internal dependency names, library names, or architectural details (e.g., Prisma, BullMQ, Next.js, Vite, React Flow, internal container names, or internal code enums).
- **Focus on Action:** Explain clearly "What do I need to do?", "What do I type?", and "What happens if it fails?".
- **Keep it Simple:** Use plain, professional language. The reader is setting up or using a product, not reading our source code.

## 2. General Writing Rules

- **Code Snippets:** Provide the exact commands the customer should run based on the ZIP deployment they receive. Never suggest pulling directly from private GitHub repositories.
- **Tone:** Professional, direct, and helpful. 
- **Formatting:** Use short paragraphs, lists, and UI components (`<Steps>`, `<Note>`, `<Warning>`, `<CardGroup>`) to make the text easy to scan.

## 3. Release Notes & Changelogs

Release notes must follow a strict, customer-facing format.

- **No Stack Details for General Updates:** For general stability or layout updates, do not list dependency updates by library name (e.g., "Updated React to 18.3"). Summarize them generically.
- **Transparent Security:** In the `Security & Vulnerabilities` section, you **must** be transparent and list the specific library names and versions that were patched.

### Standard Categories

Always use the following categories (in this exact order) for release notes. If a category has no updates, you can omit it.

1. **### ✨ New features & improvements**
2. **### 🎨 Layout & UX**
3. **### 🛠 Stability & Maintenance**
4. **### 🔒 Security & Vulnerabilities**

### Security & Vulnerabilities Format

When reporting security patches, you **must** use a Markdown table to list the fixed vulnerabilities. The table must include the vulnerability identifier, the severity level, and a brief explanation.

**Example Format:**

```md
### 🔒 Security & Vulnerabilities

| Vulnerability | Severity | Description |
|---|---|---|
| CVE-202X-XXXX | High (8.5) | Resolves an issue where user input was not properly sanitized during import. |
| Library Update | Medium | Patched a vulnerability in a third-party document parsing library. |
```
