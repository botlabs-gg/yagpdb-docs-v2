# Contributing Guidelines

## <a name="question"></a> Got a Question?

Please do not open issues for general support such as "how to do reaction roles" — use the
[support server](https://discord.gg/4udtcA5) for that.

To keep this tracker clean, we will systematically close issues regarding general support and redirect to the
aforementioned support server.

## <a name="bug"></a> Found a Bug?

Do **not** use this tracker to file maybe-bugs in YAGPDB. We have a dedicated channel on the support server for that, to
which you can post after it was confirmed to be one.

Should there be general issues with the documentation (grammatical structure, general flow, clarification needed), do
feel free to open an issue clearly outlining what is wrong about it and consider suggesting how to fix it.

## Submission Guidelines

### Requirements

- An [editorconfig](https://editorconfig.org)-capable (text) editor.
- The latest extended release of [Hugo](https://gohugo.io).
- Optional: a webserver to serve a release build of the website.

### Instructions

1. Search this repo's issues and pull requests tab for any open or closed PRs / issues that relate to your submission.
   You wouldn't want to duplicate existing efforts.

2. [Fork](https://github.com/botlabs-gg/yagpdb-docs-v2/fork) and then clone your fork.

3. In your cloned repository, make your changes on a new branch stemming from `master`:

    ```shell
    git switch -c my-branch master
    ```

4. Launch the Hugo development environment via `hugo server`. It'll watch your worktree for changes and reload the page
   when changes are detected.

5. Make your changes, ensuring that the page still builds in release mode via `hugo`. You may need to run `hugo mod
   vendor` prior to that.

6. Commit your changes using a descriptive commit message following our [commit message conventions](#commit)

7. Push your branch to GitHub:

    ```shell
    git push origin my-branch
    ```

8. On GitHub, submit a pull request to `botlabs-gg:master`

Lastly, if you are unsure where to place a potential new file, do not hesitate to ask either on the support server or
open an issue.

## <a name="commit"></a> Commit Message Format

Formatting commit messages according to a specification makes it easier to parse and read commit history.

Each commit message consists of a header, a body, and a footer:

```txt
<header>
<blank line>
<body>
<blank line>
<footer
```

The `header` is *mandatory* and must conform to the [commit header](#commit-header) format.

The `body` is *strongly recommended*. The [commit body](#commit-body) structure describes how it should be used.

The `footer` is *optional*. The [commit footer](#commit-footer) format describes what the footer is used for.

### <a name="commit-header"></a> Commit Message Header

```txt
scope>: <short summary>
   |           |
   |           └─> Summary in imperative present tense. Not capitalized. No period at the end.
   |
   └─> Commit Scope: Where did this commit happen?
         e.g. core, customcommands, moderation, meta, repo, ...
```

#### Scope

The scope should be descriptive. If your commit contained multiple scopes, consider splitting them up appropriately and
sending individual pull requests should they not be tightly knit together.

There isn't a set list you have to pick from. Choose whatever seems most appropriate and most descriptive.

#### Summary

Use the summary to provide a succint description of the change.

* Use the imperative, present tense: "change", not "changed" nor "changes". Think of it as if you're giving the codebase
  the instruction to *do this* in order to achieve the new desired state.
* don't capitalise the first letter
* no dot (.) at the end
* in total no longer than 50 characters

Some people use email to receive and send commits around, having long headers makes listing them not very nice. Any
decent git-aware editor should tell you when you're exceeding these 50 characters.

### <a name="commit-body"></a> Commit Message Body

Just as in the summary, use the imperative, present tense: "fix", not "fixed", nor "fixes".

Explain the motivation for the change in the commit message body. This part should explain *why* you are making that
change and cleanly summarise what was changed for easier viewing in git logs.

Lines should be broken at 72 characters, unless you are including a terminal log dump, then do not break the lines. Any
decent git-capable editor should do this automatically for you.

### <a name="commit-footer"></a> Commit Message Footer

The footer can contain information about breaking changes (if any) and is also the place to reference GitHub issues and
other pull requests that this commit closes, or is related to, as well as Co-Authors:

```txt
BREAKING CHANGE: <breaking change summary>
<blank line>
<breaking change description + migrate instructions>
<blank line>
<blank line>
Closes #<issue number>
<blank line>
<blank line>
Co-authored-by: name <name@example.com>
```

We also recommend you sign-off your commits with `git commit -s`, thereby certifying the
[Developer Certificate of Origin](https://developercertificate.org/) and that you read these guidelines. If you do so,
include your realname and a proper email.

#### Revert commits

If the commit reverts a previous commit, it should begin with `revert:`, followed by the header of the reverted commit.
Obviously the header length limit of 50 characters does not apply to this.

The content of the commit message body should contain:

* information about the SHA of the commit being reverted in the following format: `This reverts commit <SHA>`,
* a clear description of the reason for reverting the commit message.
