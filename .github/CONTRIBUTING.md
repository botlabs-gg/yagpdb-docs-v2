# Contributing Guidelines

## Got a Question?

We welcome suggestions for improving the documentation on our issue tracker—outdated information, missing items, typos,
or clarity issues are all relevant.

General support queries and possible bugs in YAGPDB are **not** in scope and will be closed without comment; use the
[support server] instead.

[support server]: https://discord.gg/4udtcA5


## Submission Guide

Thanks for contributing to the YAGPDB documentation! Please take a moment to review this document in order to make the
contribution process easy and effective for everyone involved.

### Requirements

Small changes can be authored directly using the GitHub web interface, though we highly recommend an
[EditorConfig]-capable editor like VSCode or Neovim for any extended work.

To preview your changes locally, you will also need [Node.js], [NPM], and the latest **extended** release of [Hugo]. NPM
should come along with installing Node.js by default.

[Node.js]: https://nodejs.org/en
[NPM]: https://www.npmjs.com/
[Hugo]: https://gohugo.io/installation
[EditorConfig]: https://editorconfig.org/

### Instructions

The usual set of steps to contribute to anything hosted on GitHub applies: fork the repository, clone the fork,
cut a new branch from `master`, make and commit your changes, and submit a pull request. We've outlined key parts of
this process below.

> [!TIP]
> Though you could work directly on the `master` branch, it is recommended to isolate your changes into a separate
> branch. This way, you can work on multiple contributions simultaneously without them interfering with each other.
> To create a new branch, simply run `git switch -c <branch-name> master` in the cloned repository.

#### Preparing Your Environment

In your local clone, install the required dependencies via NPM by running the following command:

```shellsession
$ npm install
```

This will ensure that you can fully build the documentation site locally, including the custom syntax highlighting we
use.

#### Making Your Changes

##### Markdown Features

The documentation is written in Markdown, with some additional shortcodes provided by the [Doks theme]; refer to its
documentation for a complete list of features. If you are writing or editing custom command-related code, please use the
`yag` language in fenced code blocks for accurate syntax highlighting:

````markdown
```yag
{{/* your YAGPDB custom command code here */}}
```
````

For consistency within the raw Markdown, please **do not** use the four-space indentation for code blocks, even if you
don't intend on highlighting them.

Use headers if possible to structure your content more clearly. Hugo will generate a table of contents based on those
headers, displaying up to `h3` (`###`) headers on the right side of the page. Algolia indexes by section (which headers
introduce), so it's beneficial to have a clear structure to improve search results.

Ensure each header is unique in its respective file—if necessary, you can give them a custom ID to make them unique:

```markdown
### non-unique header{#my-unique-id}
```

This issue tends to especially arise on levels with a lower level of granularity, like `h4` (`####`) or `h5` (`#####`).
It helps to have a linter or similar tools that tell you when a header becomes ambiguous.

##### Repository Structure

```txt
content/
├── docs/
│  ├── core/
│  ├── custom-commands/
│  ├── fun/
│  ├── moderation/
│  │  └── advanced-automoderator/
│  ├── notifications/
│  ├── reference/
│  │  └── templates/
│  ├── tools-and-utilities/
│  └── welcome/
└── learn/
   ├── beginner/
   ├── intermediate/
   └── welcome/
```

All page files are located in the `content/` directory, with the documentation being in the `docs/` subdirectory and the
learning resources in `learn/`. From there on, we separate `docs/` into categories as seen on the control panel, with
the actual pages representing whichever feature is in said category.

If you wish to include images, please store them alongside the file you're including the image in, similar to how it is
already the case with the existing images and pages.

[Doks theme]: https://getdoks.org/docs/

#### Previewing Your Changes

In order to preview your changes locally, you will need to run a local instance of the documentation site. Assuming that
you have Node.js (and NPM) and Hugo installed, you can do so by running the following command:

```shellsession
$ npm run dev
```

This will run a local server on `http://localhost:1313` that will automatically update whenever you save a file, though
without our custom syntax highlighting. If you prefer to view the site as it would appear on production, run the
following commands instead:

```shellsession
$ npm run build && npm run preview
```

This will build the site, execute the highlighting post-processor, and run a local server on `http://localhost:4173`.

#### Committing Your Changes

Once you are happy with your changes and ensured that the page builds without errors, you can commit your changes. We
have a small set of rules for commit messages, which help both you and us keep track of changes more easily.

A commit message consists of a header, a body, and a footer:

```txt
<header>
<blank line>
<body>
<blank line>
<footer>
```

The header is mandatory and should ideally be limited to about 50 characters. GitHub will automatically break the header
line once it exceeds 72 characters, so consider that the hard limit. If your change is trivial enough, like a typo or
fixing a broken link, the header is all you need. It should be written in the imperative mood and be descriptive of what
precisely was changed.

```diff
- Update README.md
+ readme: fix broken link to support server
```

If you find yourself struggling to concisely summarize your changes in the header, consider splitting them up into
multiple commits or perhaps even multiple PRs if appropriate.

For more sophisticated changes that require a bit more context (and summary), you can add a body. Simply insert a blank
line after the header and write your body text. The body should be wrapped at 72 characters as well, but if you paste
logs or other pre-formatted output, please do not wrap those lines. Like the header, the body should be written in the
imperative mood, as if you were giving the codebase a command to apply the changes.

The footer is optional and should be used to reference issues or pull requests that are related to the commit. You can
also use it to close issues or pull requests by inserting `Closes #<issue-number>` or `Fixes #<issue-number>`. This is
also the place where you can add a `Signed-off-by` line, certifying that you have the right to submit the code under
[the license](../LICENSE) we publish this documentation under.

```txt
Signed-off-by: John Doe <john@doe.com>
```

Your sign-off should be with an identity that can be associated with you—for us, your GitHub username is sufficient, but
please make sure that your email address is valid and reachable (so no `noreply`-addresses). Git will automatically
append your sign-off to the commit message when you use the `-s` flag when committing, assuming you have properly
configured your committer identity.

> [!NOTE]
> *We* do **not** require you to sign off on your commits, but it is a good practice to do so. Some projects may
> actually require it and attach a bigger legal meaning to it, so it's good to get into the habit of doing it.

### Submitting the Pull Request

Once you have committed your changes, push your branch to your fork on GitHub and open a pull request against the
`master` branch of the main repository. If you prefer the CLI, GitHub provides a [CLI tool] that can help you with that.

[CLI tool]: https://cli.github.com/

> [!TIP]
> Using a header and body in your commit message will automatically fill in the pull request title and description on
> GitHub, respectively, saving you some typing work you'd have to do anyway.

Once your pull request is opened, some automated checks will run on it, and it will be reviewed by one of the
maintainers. Make sure to check back in a timely manner, you may already have received feedback!
Once everything is in order and the changes are approved, your pull request will be merged into the main repository.

Fret not if your pull request was only approved but not merged immediately. If there's a larger batch of changes that
need merging, we will merge them all at once as to not spam the GitHub servers with a bunch of deployments and
Algolia Docsearch with a ton of re-crawls.

> [!NOTE]
> If you prefer to use email to send your commits (for example because you don't have a GitHub account), please send
> your patches to `l-zeuch@email.de` using `git send-email`.
