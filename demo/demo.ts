import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

import { minify } from "../src";

const html = readFileSync(resolve(__dirname, "./index.html"), "utf-8");

minify(html).then((compressed) => {
	writeFileSync(resolve(__dirname, "./index.min.html"), compressed);
});
