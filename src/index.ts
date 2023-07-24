import { minify as minifyHTML } from "html-minifier-terser";
import { transformStyleAttribute, transform, browserslistToTargets } from "lightningcss";
import bl from "browserslist";
import { transformSync } from "esbuild";

import {
	DEFAULT_CSS_OPTIONS,
	DEFAULT_HTML_OPTIONS,
	DEFAULT_JS_OPTIONS,
	type ESBuildOptions,
	type LightningCSSOptions,
	type TerserOptions
} from "./options";

export class Minifier {
	constructor(
		private htmlOptions = DEFAULT_HTML_OPTIONS,
		private cssOptions = DEFAULT_CSS_OPTIONS,
		private jsOptions = DEFAULT_JS_OPTIONS
	) {}

	public withHTMLOptions(options: TerserOptions) {
		this.htmlOptions = Object.assign(this.htmlOptions, options);

		return this;
	}

	public withCSSOptions({ browserslist, ...options }: LightningCSSOptions) {
		this.cssOptions = Object.assign(this.cssOptions, options);

		if (browserslist) {
			this.cssOptions.targets = browserslistToTargets(bl(browserslist));
		}

		return this;
	}

	public withJSOptions(options: ESBuildOptions) {
		this.jsOptions = Object.assign(this.jsOptions, options);

		return this;
	}

	public minify(html: string) {
		return minifyHTML(html, {
			minifyCSS: this.minifyCSS.bind(this),
			minifyJS: this.minifyJS.bind(this),
			...this.htmlOptions
		});
	}

	private minifyCSS(css: string, type: "inline" | undefined) {
		const code = Buffer.from(css);

		const result =
			type === "inline"
				? transformStyleAttribute({
						code,
						minify: true,
						...this.cssOptions
				  })
				: transform({
						filename: "",
						minify: true,
						code,
						...this.cssOptions
				  });

		return result.code.toString("utf8");
	}

	private minifyJS(js: string, inline: boolean) {
		const result = transformSync(js, {
			minify: true,
			...this.jsOptions
		});

		return result.code;
	}
}
