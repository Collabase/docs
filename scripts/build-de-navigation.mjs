#!/usr/bin/env node
/**
 * Builds the German navigation from the English one, so both always have the same tabs, groups,
 * icons and order. A page with a German twin under `de/` is linked to the twin, every other page to
 * the English page. Labels come from `docs-de-navigation.json`; a label without a translation stays
 * English (app and product names). Navbar, footer and banner of the German site live there as well.
 * check-docs.mjs fails when docs.json differs from the generated navigation.
 *
 *   node scripts/build-de-navigation.mjs --write   writes the German navigation into docs.json
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DOCS_JSON = join(ROOT, "docs.json");
const LABEL_KEYS = ["tab", "group", "item", "anchor", "dropdown"];

/** The `navigation.languages` array docs.json must hold: English as written, German generated. */
export function expectedLanguages(docsJson) {
  const { labels, ...chrome } = JSON.parse(readFileSync(join(ROOT, "scripts/docs-de-navigation.json"), "utf8"));
  const germanPage = (page) => (existsSync(join(ROOT, `de/${page}.mdx`)) ? `de/${page}` : page);
  const translate = (node) => {
    if (Array.isArray(node)) return node.map(translate);
    if (!node || typeof node !== "object") return node;
    return Object.fromEntries(
      Object.entries(node).map(([key, value]) => {
        if (LABEL_KEYS.includes(key) && typeof value === "string") return [key, labels[value] ?? value];
        if (key === "pages" && Array.isArray(value)) return [key, value.map((entry) => (typeof entry === "string" ? germanPage(entry) : translate(entry)))];
        return [key, translate(value)];
      }),
    );
  };
  const english = docsJson.navigation.languages.find((entry) => entry.language === "en");
  return [english, { ...chrome, tabs: translate(english.tabs) }];
}

if (process.argv[1] === fileURLToPath(import.meta.url) && process.argv.includes("--write")) {
  const docsJson = JSON.parse(readFileSync(DOCS_JSON, "utf8"));
  docsJson.navigation.languages = expectedLanguages(docsJson);
  writeFileSync(DOCS_JSON, `${JSON.stringify(docsJson, null, 2)}\n`);
  console.log("build-de-navigation: docs.json updated");
}
