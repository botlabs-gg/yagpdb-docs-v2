# YAGPDB Docs v2

YAGPDB's new documentation site, built with [Hugo](https://gohugo.io/) and the [Doks theme](https://getdoks.org/).

## Why?

The old documentation was built with GitBook and became excruciatingly slow to load as GitBook loaded more and more JavaScript, both on the user's and the editor's side.
The new documentation is built with Hugo, which generates static HTML files that can be served much faster.

Additionally, this new model is far more open to contributions; there is no web-based editor anymore so maintainers will actually have to look at the repository.

As an added bonus, we're also no longer split between separate repositories for the actual documentation, our custom command course, as well as a community-maintained selfhosting guide;
it's all in one repository, thus much easier to internally link between the sections and maintain a consistent style.

## Contributing

Contributions to the documentation are very welcome!
If you find an error or want to add something, please open a pull request with your changes.
Read the [contributing guidelines](CONTRIBUTING.md) for more information on how to contribute.

You need [Node.js](https://nodejs.org/) and [Hugo extended](https://gohugo.io/installation) installed to build the documentation locally.

## License

This documentation's text is distributed under the terms of the Creative Commons Attribution-ShareAlike 4.0 International License (CC BY-SA 4.0).
Please view the [LICENSE](LICENSE) file for more details.
