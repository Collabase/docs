#!/usr/bin/env node
// Structure and style checks for the Mintlify docs (documentation-rules.md, section 24).
// Errors fail the run, warnings only inform. No dependencies.
//
//   node scripts/check-docs.mjs            check everything
//   DOCS_BASE=<sha> node scripts/check-docs.mjs   compare changed lines against this commit

import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SKIP_DIRS = new Set(["node_modules", ".git", ".agents", "snippets", "styles", "scripts", "drafts", "images"]);
const NO_LINK_NEEDED = /^(api|changelog)\//;
const MAX_DESCRIPTION = 160;
const NUMBERED = /^\d+\. /;

const findings = [];
const report = (level, file, line, rule, message) => findings.push({ level, file, line, rule, message });

function walk(dir, accept) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      if (!SKIP_DIRS.has(name)) out.push(...walk(full, accept));
    } else if (accept(name)) out.push(full);
  }
  return out;
}

const pageFiles = walk(ROOT, (name) => name.endsWith(".mdx"));
const slugOf = (file) => relative(ROOT, file).replace(/\.mdx$/, "");
const read = (file) => readFileSync(file, "utf8");

function frontmatter(text) {
  const match = /^---\n([\s\S]*?)\n---\n?/.exec(text);
  return match ? { raw: match[1], body: text.slice(match[0].length), offset: match[0].split("\n").length - 1 } : { raw: "", body: text, offset: 0 };
}
const field = (raw, name) => new RegExp(`^${name}:\\s*(?:"(.*)"|(.*))$`, "m").exec(raw);

/** Lines of the body with fenced code and `<Steps>` blocks tracked, for list and fence checks. */
function scan(body) {
  const lines = body.split("\n");
  const state = [];
  let fence = false;
  let steps = 0;
  for (const line of lines) {
    const trimmed = line.trim();
    const isFence = trimmed.startsWith("```");
    if (isFence) fence = !fence;
    if (!fence && !isFence) {
      if (trimmed.includes("<Steps")) steps += 1;
      if (trimmed.includes("</Steps>")) steps -= 1;
    }
    state.push({ line, fence: fence || isFence, inSteps: steps > 0, isFence, opening: isFence && fence });
  }
  return state;
}

// ---- git: lines added since the base, to hold new text to the em dash rule
function baseRef() {
  if (process.env.DOCS_BASE) return process.env.DOCS_BASE;
  try {
    return execFileSync("git", ["merge-base", "HEAD", "origin/main"], { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  } catch {
    return "HEAD";
  }
}
const BASE = baseRef();
function git(args) {
  try {
    return execFileSync("git", args, { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"], maxBuffer: 64 * 1024 * 1024 });
  } catch {
    return null;
  }
}
const changedNames = new Set((git(["diff", "--name-only", BASE, "--", "."]) ?? "").split("\n").filter(Boolean).map((n) => resolve(ROOT, "..", "..", n)));
const untracked = new Set((git(["ls-files", "--others", "--exclude-standard", "--", "."]) ?? "").split("\n").filter(Boolean).map((n) => resolve(ROOT, n)));

function addedLines(file) {
  if (untracked.has(file)) return read(file).split("\n").map((text, i) => ({ text, number: i + 1 }));
  const diff = git(["diff", "-U0", BASE, "--", file]);
  if (diff === null) return [];
  const added = [];
  let number = 0;
  for (const line of diff.split("\n")) {
    const hunk = /^@@ -\d+(?:,\d+)? \+(\d+)/.exec(line);
    if (hunk) { number = Number(hunk[1]); continue; }
    if (line.startsWith("+") && !line.startsWith("+++")) { added.push({ text: line.slice(1), number }); number += 1; }
  }
  return added;
}

// ---- navigation
const docsJson = JSON.parse(read(join(ROOT, "docs.json")));
const navPages = new Set();
(function collect(node) {
  if (Array.isArray(node)) return node.forEach(collect);
  if (!node || typeof node !== "object") return;
  for (const [key, value] of Object.entries(node)) {
    if (key === "pages" && Array.isArray(value)) value.forEach((entry) => (typeof entry === "string" ? navPages.add(entry) : collect(entry)));
    else collect(value);
  }
})(docsJson.navigation);

const slugs = new Set(pageFiles.map(slugOf));
const hasGerman = (docsJson.navigation.languages ?? []).some((entry) => entry.language === "de");
for (const slug of slugs) if (!navPages.has(slug) && (hasGerman || !slug.startsWith("de/"))) report("error", `${slug}.mdx`, 1, "nav", "Page is not in the docs.json navigation");
for (const slug of navPages) if (!slugs.has(slug) && !/^https?:/.test(slug)) report("error", "docs.json", 1, "nav", `Navigation lists ${slug}, which has no file`);

// ---- pages
const titles = new Map();
const descriptions = new Map();
const inbound = new Map();
const outbound = new Map();
const variableNames = new Set(Object.keys(docsJson.variables ?? {}));

for (const file of pageFiles) {
  const rel = relative(ROOT, file);
  const text = read(file);
  const fm = frontmatter(text);
  const slug = slugOf(file);

  const title = field(fm.raw, "title");
  const description = field(fm.raw, "description");
  if (!title) report("error", rel, 1, "title", "Missing title");
  else titles.set(title[1] ?? title[2], [...(titles.get(title[1] ?? title[2]) ?? []), rel]);
  if (!description) report("error", rel, 1, "description", "Missing description");
  else {
    const value = description[1] ?? description[2];
    if (value.length > MAX_DESCRIPTION) report("error", rel, 1, "description", `Description has ${value.length} characters, the limit is ${MAX_DESCRIPTION}`);
    descriptions.set(value, [...(descriptions.get(value) ?? []), rel]);
  }

  const lines = scan(fm.body);
  let previousLevel = 0;
  let listRun = 0;
  lines.forEach(({ line, fence, inSteps, isFence, opening }, index) => {
    const number = index + 1 + fm.offset;
    if (isFence && opening && line.trim() === "```") report("error", rel, number, "code-language", "Code block without a language, use `text` for plain text");
    if (fence) { listRun = 0; return; }
    const heading = /^(#{1,6}) /.exec(line);
    if (heading) {
      const level = heading[1].length;
      if (level === 1) report("error", rel, number, "h1", "H1 in the body, the title is the H1");
      if (previousLevel && level - previousLevel > 1) report("error", rel, number, "heading-level", "Heading level skipped");
      previousLevel = level;
    }
    if (!inSteps && NUMBERED.test(line)) {
      listRun += 1;
      if (listRun === 3) report("error", rel, number, "numbered-list", "Numbered list outside <Steps>, use <Steps> for a procedure or bullets for an explanation");
    } else if (line.trim() !== "" && !line.startsWith("   ")) listRun = 0;
    for (const match of line.matchAll(/<img\b[^>]*>/g)) {
      if (!/\balt=/.test(match[0])) report("error", rel, number, "alt", "Image without alt text");
      else if (/\balt=""/.test(match[0])) report("error", rel, number, "alt", "Empty alt text, mint a11y rejects it. Describe the image briefly, a decorative one sits inside an aria-hidden element");
    }
    for (const match of line.replace(/`[^`]*`/g, "").matchAll(/\{\{([\w-]+)\}\}/g)) if (!variableNames.has(match[1])) report("error", rel, number, "variable", `Variable ${match[1]} is not defined in docs.json`);
    for (const match of line.matchAll(/import .* from "(\/[^"]+)"/g)) if (!existsSync(join(ROOT, match[1]))) report("error", rel, number, "snippet", `Snippet ${match[1]} does not exist`);
  });

  // links
  const targets = new Set();
  for (const match of fm.body.matchAll(/\]\((\/[^)\s#]*)|href="(\/[^"#]*)"/g)) targets.add((match[1] ?? match[2]).replace(/^\//, ""));
  outbound.set(slug, [...targets].filter((target) => target && target !== slug));
  for (const target of outbound.get(slug)) inbound.set(target, (inbound.get(target) ?? 0) + 1);

  // em dashes only in text that was added since the base
  for (const { text: added, number } of addedLines(file)) {
    if (added.includes("—")) report("error", rel, number, "em-dash", "Em dash in new or changed text, use a colon, comma or full stop");
  }

  // German twin
  if (slug.startsWith("de/") && !slugs.has(slug.slice(3))) report("error", rel, 1, "twin", "German page has no English page with the same path");
  if (!slug.startsWith("de/") && slugs.has(`de/${slug}`) && changedNames.has(file) && !changedNames.has(resolve(ROOT, `de/${slug}.mdx`))) {
    report("warn", rel, 1, "twin", "English page changed, its German twin did not");
  }
}

for (const [value, files] of titles) if (files.length > 1) report("error", files[1], 1, "title", `Title "${value}" is used by ${files.join(", ")}`);
for (const [, files] of descriptions) if (files.length > 1) report("error", files[1], 1, "description", `Same description as ${files[0]}`);

for (const slug of slugs) {
  if (slug === "index" || slug === "de/index" || NO_LINK_NEEDED.test(slug) || slug.startsWith("de/")) continue;
  if ((outbound.get(slug) ?? []).length === 0) report("warn", `${slug}.mdx`, 1, "links", "Page links to no other page, add Next steps or Related");
  if (!inbound.has(slug)) report("warn", `${slug}.mdx`, 1, "orphan", "No page links here");
}

// ---- images
const everything = pageFiles.map(read).join("\n") + read(join(ROOT, "docs.json")) + walk(join(ROOT, "snippets"), (n) => n.endsWith(".mdx")).map(read).join("\n");
if (existsSync(join(ROOT, "images"))) {
  for (const file of walk2(join(ROOT, "images"))) {
    const name = file.split("/").pop();
    const viaTemplate = everything.includes("/images/apps/${app}-") && /\/images\/apps\/[^/]+-(light|dark)\.png$/.test(file);
    if (!viaTemplate && !everything.includes(name)) report("error", relative(ROOT, file), 1, "unused-image", "Image is not used by any page");
  }
}
function walk2(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (name.startsWith(".") || name === "01_Collabase Logo") continue;
    if (statSync(full).isDirectory()) out.push(...walk2(full));
    else out.push(full);
  }
  return out;
}

// ---- output
const errors = findings.filter((f) => f.level === "error");
const warnings = findings.filter((f) => f.level === "warn");
for (const f of [...errors, ...warnings]) process.stdout.write(`${f.level === "error" ? "error" : "warn "}  ${f.file}:${f.line}  [${f.rule}]  ${f.message}\n`);
process.stdout.write(`\ncheck-docs: ${pageFiles.length} pages, ${errors.length} errors, ${warnings.length} warnings (base ${BASE.slice(0, 8)})\n`);
process.exit(errors.length > 0 ? 1 : 0);
