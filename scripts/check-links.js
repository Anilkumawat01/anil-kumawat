// scripts/check-links.js
// Reads config.js and verifies every URL is well-formed.
// Run: node scripts/check-links.js
// This is a pre-submission sanity check — it cannot test live HTTP status.

import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Parse config manually (config.js uses ES module export)
const configText = readFileSync(join(__dirname, "../src/config.js"), "utf8");

const urlRegex = /url:\s*["']([^"']+)["']/g;
const hrefRegex = /href:\s*["']([^"']+)["']/g;
const liveRegex = /live:\s*["']([^"']+)["']/g;
const githubRegex = /github:\s*["']([^"']+)["']/g;

const errors = [];
const warnings = [];
const checked = [];

function checkUrl(url, context) {
  if (!url || url === "" || url.startsWith("#") || url.startsWith("mailto:")) return;
  if (url.startsWith("/")) { warnings.push(`RELATIVE path (${context}): "${url}" — OK for local assets, but make sure it exists in public/`); return; }
  if (!url.startsWith("https://") && !url.startsWith("http://")) {
    errors.push(`INVALID URL (${context}): "${url}" — missing protocol (must start with https://)`);
    return;
  }
  if (/\s/.test(url)) {
    errors.push(`SPACE IN URL (${context}): "${url}"`);
    return;
  }
  checked.push(`✅ ${context}: ${url}`);
}

// Extract all URLs
let m;
while ((m = urlRegex.exec(configText)) !== null)    checkUrl(m[1], "social.url");
while ((m = liveRegex.exec(configText)) !== null)   checkUrl(m[1], "project.live");
while ((m = githubRegex.exec(configText)) !== null) checkUrl(m[1], "project.github");

console.log("\n── Link Checker Results ─────────────────────────────────\n");
checked.forEach(l => console.log(l));

if (warnings.length) {
  console.log("\n── Warnings ─────────────────────────────────────────────");
  warnings.forEach(w => console.warn("⚠️ ", w));
}

if (errors.length) {
  console.log("\n── Errors ───────────────────────────────────────────────");
  errors.forEach(e => console.error("❌", e));
  console.log(`\n${errors.length} error(s) found. Fix before submitting.\n`);
  process.exit(1);
} else {
  console.log(`\n✅ All ${checked.length} URLs look well-formed. No protocol/space errors found.`);
  console.log("⚠️  This tool checks URL format only. Manually click every link before submitting!\n");
}

