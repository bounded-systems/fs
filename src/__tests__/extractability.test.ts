import { test } from "bun:test";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { assertSeam } from "@bounded-systems/seam-check";

const SRC = resolve(dirname(fileURLToPath(import.meta.url)), "..");

// The filesystem capability: the ONE place node:fs is allowed to live. It is a
// leaf — it depends on nothing else in the graph, so callers route through it
// and inherit a single, decoratable fs seam. node:path is path math only. The
// claim is the `prod` allowlist; @bounded-systems/seam-check proves it (imports
// stay in-allowlist, prod code holds no ambient authority — spawn / env).
test("@bounded-systems/fs upholds its seam claim", () => {
  assertSeam({
    root: SRC,
    prod: ["node:fs", "node:path"],
    test: ["@bounded-systems/fs", "@bounded-systems/seam-check"],
  });
});
