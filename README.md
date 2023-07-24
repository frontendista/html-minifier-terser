# @frontendista/html-minifier-terser

HTML minifier that uses LightningCSS and ESBuild for minification.

# Installation

```sh
pnpm install @frontendista/html-minifier-terser
```

# Usage

```ts
import { Minifier } from "@frontendista/html-minifier-terser"

const minifier = new Minifier()
.withHTMLOptions({
    // Override the default Terser options.
})
.withCSSOptions({
    // Override the default LightningCSS options.
});
.withJSOptions({
    // Override the default ESBuild options.
});

const minifiedHTML = minifier.minify("")
```
