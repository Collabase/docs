---
description: Standards and rules for writing and updating Collabase documentation and release notes. Applies to all MDX files in the docs project.
---

# Documentation Standards

This document defines the rules for writing documentation and release notes in the Collabase documentation project.

## 1. Persona & Perspective

**General Audience ("Peter from IT"):**
For all general product, administration, and feature documentation, the target audience is the IT Administrator who deploys, configures, and maintains Collabase. 
- **No Developer Jargon:** Do not use internal dependency names, library names, or architectural details (e.g., Prisma, BullMQ, Next.js, Vite, React Flow, internal container names).
- **Focus on Action:** Explain clearly "What do I need to do?", "What do I type?", and "What happens if it fails?".
- **Keep it Simple:** Use plain, professional language. The reader is setting up or using a product, not reading our source code.

**Developer & API Audience ("Developers"):**
Documentation located in the `developer/` or `api/` directories is the **exception**. This content is aimed at software engineers building extensions or integrating via APIs.
- **Technically Detailed:** Code examples, compilation steps, internal mechanics, and architecture details are encouraged.
- **Language:** Use precise technical language (e.g., host functions, hooks, WebAssembly, endpoints, webhooks).

## 2. General Writing Rules

- **Code Snippets:** Provide the exact commands the customer should run based on the ZIP deployment they receive. Never suggest pulling directly from private GitHub repositories.
- **Tone:** Professional, direct, and helpful. 
- **Formatting:** Use short paragraphs, lists, and UI components (`<Steps>`, `<Note>`, `<Warning>`, `<CardGroup>`) to make the text easy to scan.

## 3. Release Notes & Changelogs

Release notes must follow a strict, customer-facing format.

- **No Stack Details for General Updates:** For general stability or layout updates, do not list dependency updates by library name (e.g., "Updated React to 18.3"). Summarize them generically.
- **Enterprise Security Standards:** In the `Security & Vulnerabilities` section, focus on **business impact and CVEs**. Never list dev-dependencies (like `vite`, `vitest`, `playwright`). Only list production-relevant third-party libraries if they address critical, widely known vulnerabilities. Otherwise, summarize them generically or by the affected product component.
- **Navigation Updates:** Every time a new release note is created, you MUST add it to the `Release Notes` section of the sidebar in `docs.json` and add a corresponding `<Card>` link to the `changelog/overview.mdx` page.

### Standard Categories

Always use the following categories (in this exact order) for release notes. If a category has no updates, you can omit it.

1. **### ✨ New features & improvements**
2. **### 🎨 Layout & UX**
3. **### 🛠 Stability & Maintenance**
4. **### 🔒 Security & Vulnerabilities**

### Security & Vulnerabilities Format

When reporting specific security patches, use a Markdown table focusing on the CVE or affected component. Do not list raw package bumps. If there are no specific CVEs but general updates, use a simple summary sentence instead of a table.

**Example Format (if CVEs/critical patches exist):**

```md
### 🔒 Security & Vulnerabilities

| Vulnerability / CVE | Severity | Affected Component / Description |
|---|---|---|
| CVE-202X-XXXX | High (8.5) | Resolves a remote code execution vulnerability in the document processor. |
| Third-Party | Medium | Patched a vulnerability in a third-party AI module (LangChain) to prevent potential data leakage. |
```

**Example Format (for routine maintenance without critical CVEs):**

```md
### 🔒 Security & Vulnerabilities

* Performed routine security updates and patched non-critical third-party dependencies in the backend and AI services.
```
