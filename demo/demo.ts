import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

import { Minifier } from "../src";

const html = readFileSync(resolve(__dirname, "./index.html"), "utf-8");

new Minifier().minify(html).then((compressed) => {
	writeFileSync(resolve(__dirname, "./index.min.html"), compressed);
});
