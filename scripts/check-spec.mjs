#!/usr/bin/env node
// Fails when the site disagrees with the pinned AgentReady spec release in
// src/spec/practices.json. Runs before every build (`prebuild`) and in CI.
//
// Checks, across every .ts/.tsx file under src/:
//   1. Every AR-*-NN identifier the site mentions exists in the spec and is
//      not retired.
//   2. Every requirement in the spec is mentioned somewhere on the site.
//   3. No hand-typed level next to an identifier ("AR-READ-02 · MUST")
//      disagrees with the spec. Prefer `level("AR-READ-02")` from @/lib/spec.
//   4. No practice hard-codes `strength: "..."`; definePractices reads it.
//
// Site wording is editorial and not compared.

import { readFileSync, readdirSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "src");
const spec = JSON.parse(readFileSync(join(src, "spec", "practices.json"), "utf8"));

const levels = new Map(spec.requirements.map((r) => [r.id, r.level]));
const retired = new Set(spec.retired);
const tag = `v${spec.version}`;

function* files(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* files(p);
    else if (/\.(ts|tsx)$/.test(e.name)) yield p;
  }
}

const errors = [];
const mentioned = new Set();

for (const file of files(src)) {
  const rel = relative(root, file);
  readFileSync(file, "utf8")
    .split("\n")
    .forEach((line, i) => {
      const at = `${rel}:${i + 1}`;

      for (const [id] of line.matchAll(/\bAR-[A-Z]+-\d{2}\b/g)) {
        mentioned.add(id);
        if (retired.has(id)) errors.push(`${at}: ${id} is retired in ${tag}`);
        else if (!levels.has(id)) errors.push(`${at}: ${id} is not in ${tag}`);
      }

      for (const [, id, typed] of line.matchAll(
        /\b(AR-[A-Z]+-\d{2})\b[^\w\n]{1,4}(MUST|SHOULD|MAY)\b/g,
      )) {
        const want = levels.get(id);
        if (want && want !== typed) {
          errors.push(`${at}: ${id} is shown as ${typed}, but ${tag} says ${want}. Use level("${id}").`);
        }
      }

      if (/\bstrength:\s*["'`]/.test(line)) {
        errors.push(`${at}: hard-coded strength. definePractices reads it from the spec.`);
      }
    });
}

for (const id of levels.keys()) {
  if (!mentioned.has(id)) errors.push(`src/: ${id} (${levels.get(id)}) is in ${tag} but not on the site`);
}

if (errors.length) {
  console.error(`The site disagrees with AgentReady ${tag}:\n  ${errors.join("\n  ")}`);
  process.exit(1);
}
console.log(`Site matches AgentReady ${tag}: ${levels.size} requirements, all present, no retired or unknown IDs.`);
