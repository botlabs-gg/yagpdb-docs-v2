# YAGPDB Docs v2

Experimental / proof of concept page to replace the current documentation which is built with GitBook.

This documentation is built with [Hugo](https://gohugo.io) in conjunction with the [Doks theme](https://getdoks.org/) as
an experiment to see if it is a viable alternative.

## Contributing / Building

Install [Node.js](https://nodejs.org/en), clone this repository, install the dependencies with `npm install`, and run
`npm run dev` to start a local server. The server will automatically rebuild the page when you make changes.

To build the page in release mode, use `HUGO_BASEURL=... npm run build`, then serve the generated `public/` directory
with your webserver of choice.

For more information, please view our [Contributing Guidelines](.github/CONTRIBUTING.md).

### Editor Setup

As this project uses the [EditorConfig](https://editorconfig.org/) standard, you will have to make sure that your
editor supports it. Most modern editors do, but if you are unsure, check the EditorConfig page.

### Authoring content

Pages are written in Markdown with additional shortcodes provided by the Doks theme; refer to [its
documentation](<(https://getdoks.org/docs/start-here/getting-started/)>) for a complete list of features.

If you are editing pages related to custom commands, note that codeblocks support a custom `yag` language for accurate
syntax highlighting—do not use `go`. However, this feature is only enabled in production builds for performance, so `npm run dev` will _not_ highlight `yag` codeblocks. Use `npm run build` followed by `npm run preview` instead if you need to verify
that code is highlighted correctly.

> [!TIP]
> If you use VSCode, this project provides custom workspace snippets to insert callouts, which you can activate in
> Markdown files by typing <kbd>Ctrl</kbd> + <kbd>Space</kbd> followed by `note`, `tip`, `warning`, or `danger`.

## License

This documentation's text is distributed under the terms of the Creative Commons Attribution ShareAlike 4.0 license
(SPDX-indentifer `CC-BY-SA`). Please view the [LICENSE](LICENSE) file for more information.
