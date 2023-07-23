import type { Options } from "html-minifier-terser";
import type { TransformAttributeOptions } from "lightningcss";
import type { TransformOptions } from "esbuild";

export type LightningCSSOptions = Pick<TransformAttributeOptions, "targets" | "visitor" | "analyzeDependencies">;
export type TerserOptions = Partial<Omit<Options, "minifyCSS" | "minifyJS">>;
export type ESBuildOptions = Partial<TransformOptions>;

export const DEFAULT_HTML_OPTIONS: Partial<Options> = {
	caseSensitive: true,
	collapseWhitespace: true,
	collapseBooleanAttributes: true,
	collapseInlineTagWhitespace: true,
	decodeEntities: true,
	html5: true,
	preserveLineBreaks: true,
	sortAttributes: true,
	processScripts: ["application/ld+json"],
	removeRedundantAttributes: true,
	removeScriptTypeAttributes: true,
	removeStyleLinkTypeAttributes: true
};

export const DEFAULT_CSS_OPTIONS: Partial<TransformAttributeOptions> = {};

export const DEFAULT_JS_OPTIONS: Partial<TransformOptions> = {};
