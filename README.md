# YAGPDB Docs v2

Experimental / Proof of Concept page to replace the current documentation which is built with GitBook.

This page is built with [Hugo](https://gohugo.io/) in conjunction with the
[Relearn theme](https://github.com/McShelby/hugo-theme-relearn/) as an experiment to see if it is a viable alternative.

## Contributing / Building

As always clone the repository first and change into it.

Install [Hugo](https://gohugo.io/getting-started/installing/), clone this repository and run `hugo server` to start a
local server. The server will automatically rebuild the page when you make changes.

Alternatively you can run `hugo` to build the page in release mode, which will output the static files to the `public`
directory, which you can serve with any web server; a quick way is to use Python's `http.server` module:

```shellsession
$ hugo
$ python3 -m http.server -d public/
```

By default, this will be accessible at `http://localhost:8000`.

### Editor Setup

As this project used the [EditorConfig](https://editorconfig.org/) standard, you will have to make sure that your
editor supports it. Most modern editors do, but if you are unsure, check the EditorConfig page.

### Adding a new page

Please read the Relearn theme's [documentation](https://mcshelby.github.io/hugo-theme-relearn) for a full guide as well
as its Markdown syntax.

## License

Currently, this project is not distributed under any license. This may or may not change in the future.
