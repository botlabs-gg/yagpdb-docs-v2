# YAGPDB Docs v2

Experimental / proof of concept page to replace the current documentation which is built with GitBook.

This documentation is built with [Hugo](https://gohugo.io) in conjunction with the [Doks theme](https://getdoks.org/) as
an experiment to see if it is a viable alternative.

## Contributing / Building

Install [Node.js](https://nodejs.org/en), clone this repository, and use `npm run dev` to start a local server. The
server will automatically rebuild the page when you make changes.

To build the page in release mode, run `npm run build`, then server the generated `public/` directory with your
webserver of choice. Adjust the `--baseURL` flag provided to hugo as appropriate.

For more information, please view our [Contributing Guidelines](.github/CONTRIBUTING.md).

### Editor Setup

As this project used the [EditorConfig](https://editorconfig.org/) standard, you will have to make sure that your
editor supports it. Most modern editors do, but if you are unsure, check the EditorConfig page.

### Adding a new page

Pages are written in Markdown, with additional shortcodes provided by the Doks theme; refer to [its
documentation]((https://getdoks.org/docs/start-here/getting-started/)) for a complete list of features.

## License

This documentation's text is distributed under the terms of the Creative Commons Attribution ShareAlike 4.0 license
(SPDX-indentifer `CC-BY-SA`). Please view the [LICENSE](LICENSE) file for more information.
