import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

import { Minifier } from "../src";

const html = readFileSync(resolve(__dirname, "./index.html"), "utf-8");

const minifier = new Minifier().withCSSOptions({
	browserslist: "Chrome 101"
});

minifier.minify(html).then((compressed) => {
	writeFileSync(resolve(__dirname, "./index.min.html"), compressed);
});
