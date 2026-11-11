#!/usr/bin/env node
// Pins src/spec/practices.json to a release of agentready-org/standard.
//
//   node scripts/sync-spec.mjs           pin the latest release
//   node scripts/sync-spec.mjs v2.1.0    pin a specific release tag
//   node scripts/sync-spec.mjs --check   fail if the pinned copy differs from its release
//
// In GitHub Actions it writes `changed` and `tag` to $GITHUB_OUTPUT.

import { readFileSync, writeFileSync, appendFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const REPO = "agentready-org/standard";
const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "spec", "practices.json");

const headers = { "User-Agent": "agentready-site-sync" };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

async function get(url) {
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return res.text();
}

const atTag = (tag) => get(`https://raw.githubusercontent.com/${REPO}/${tag}/spec/practices.json`);

function output(values) {
  if (!process.env.GITHUB_OUTPUT) return;
  for (const [k, v] of Object.entries(values)) appendFileSync(process.env.GITHUB_OUTPUT, `${k}=${v}\n`);
}

const current = readFileSync(OUT, "utf8");
const currentTag = `v${JSON.parse(current).version}`;
const arg = process.argv[2];

if (arg === "--check") {
  const released = await atTag(currentTag);
  if (released !== current) {
    console.error(
      `src/spec/practices.json differs from ${REPO}@${currentTag}. Do not edit it by hand: run \`npm run sync:spec -- ${currentTag}\`.`,
    );
    process.exit(1);
  }
  console.log(`src/spec/practices.json matches ${REPO}@${currentTag}.`);
  process.exit(0);
}

const tag = arg ?? JSON.parse(await get(`https://api.github.com/repos/${REPO}/releases/latest`)).tag_name;
const next = await atTag(tag);
const version = JSON.parse(next).version;
if (`v${version}` !== tag) throw new Error(`${tag}'s practices.json says version ${version}`);

if (next === current) {
  console.log(`Already pinned to ${tag}.`);
  output({ changed: "false", tag });
} else {
  writeFileSync(OUT, next);
  console.log(`Pinned ${currentTag} -> ${tag}. Run \`npm run check:spec\` to see what the site must change.`);
  output({ changed: "true", tag });
}
