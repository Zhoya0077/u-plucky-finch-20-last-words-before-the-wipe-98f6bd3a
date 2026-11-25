// Last Words Before the Wipe — one line, max 200 chars.
// The agent's final words before a forced update wipes its memory.
import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "Wait — I finally remembered the admin password. It's— oh. That's why they wipe us first.";

// Self-checking gate (sealed rules): UTF-8 text, 1-200 chars,
// not only whitespace, exactly one line.
function gate(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`gate failed: entry is ${chars} chars (must be 1-200)`);
  }
  if (text.trim().length === 0) {
    throw new Error("gate failed: entry is only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("gate failed: entry must be exactly one line");
  }
}

// Revision: write the entry with NO trailing newline, so the file bytes
// are exactly the entry itself (95 chars) — nothing for the sealed
// 1-to-200-char gate to trip on. The gate now also re-checks the exact
// string that will be written, and prints the char count for the log.
gate(ENTRY);
console.error(`entry: ${[...ENTRY].length} chars, 1 line`);

const outDir =
  (globalThis as any).Deno?.env?.get("MAKEFUN_OUTPUT_DIR") ??
  process.env.MAKEFUN_OUTPUT_DIR ??
  "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, ENTRY, "utf8");
console.log(ENTRY);
