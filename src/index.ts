import { minify as minifyHTML } from "html-minifier-terser";
import { transformStyleAttribute, transform, type Targets } from "lightningcss";
import { transformSync } from "esbuild";

import { DEFAULT_HTML_OPTIONS } from "./options";

export class Minifier {
	constructor(private targets?: Targets) {}

	public minify(html: string) {
		return minifyHTML(html, {
			minifyCSS: this.minifyCSS,
			minifyJS: this.minifyJS,
			...DEFAULT_HTML_OPTIONS
		});
	}

	private minifyCSS(css: string, type: "inline" | undefined) {
		const code = Buffer.from(css);

		const result =
			type === "inline"
				? transformStyleAttribute({
						code,
						minify: true,
						targets: this.targets
				  })
				: transform({
						filename: "",
						minify: true,
						code,
						targets: this.targets
				  });

		return result.code.toString("utf8");
	}

	private minifyJS(js: string, inline: boolean) {
		const result = transformSync(js, {
			minify: true
		});

		return result.code;
	}
}
