# Style Guide

This document outlines the general requirements for writing documentation for YAGPDB.
Some rules may be bent or broken if there's good reason to do so, but in general, the guidelines outlined here should be followed to ensure a consistent style across the documentation.

## In Short

If you try your best to mimic the already existing style in the documentation, you will likely be fine.

### Language

1. Use American English
2. Use the Oxford comma
3. Don't patronize the reader
4. Write in a semiformal style; not too cold and technical, but not too casual and conversational either.

### Formatting

1. Write one sentence per line (except in lists when necessary)
2. Use title case for headings
3. Use single asterisks for `*italics*` and double asterisks for `**bold**`
4. Use `-` for any unordered lists, even sub-lists
5. Properly number your ordered lists
7. Use backticks for `inline code` and triple backticks for code blocks

## In Detail

Below are the detailed explanations for the guidelines outlined above, as well as some additional information and examples.

### Language

#### Use American English

Using one form of English helps maintain consistency across the documentation, and American English is the de facto standard for technical writing.
For those reasons, it will be easiest for the average reader to understand the documentation when American English spelling and grammar is used.

You are of course free to use whichever form of English is most comfortable in your communication (e.g. commit messages).

#### Use the Oxford comma

Using the Oxford comma avoids ambiguity in lists.
This is simply about avoiding any possibility of misinterpretation, no matter how clear the context may seem to be to you.
The [Wikipedia entry](https://en.wikipedia.org/wiki/Serial_comma) has some excellent examples of where the Oxford comma can make a difference.

#### Don't Patronize the Reader

Don't talk down to the reader or assume that they don't know anything.
This especially applies to the custom command course (`content/learn/`), where we guide the reader through the script writing process by encouraging their own problem-solving.
Gently nudge them towards making discoveries on their own.

#### Semiformal Style

We're not writing some academic paper here; avoid too much technical jargon and try to keep the tone light and approachable.
On the other hand, we're also not writing a casual blog post; avoid slang and overly conversational language.
The goal is to strike a balance between being informative and being engaging, without being too dry or too casual.

This rule is a bit relaxed in the custom command course, where we do want it to be a bit more conversational and approachable, but it still applies to some extent.

### Formatting

#### One Sentence Per Line

Semantic Linefeeds (one sentence per line) make a lot of things easier.
You very quickly realize when sentences have grown too long or are unusually inconsistent in length, which can hurt readability.
It also makes it easier to review, edit, and track changes in version control, as you can see exactly which sentences were changed without any noise from reflowing wrapped text.

It does read somewhat awkward in source form, but that's not what the reader will see, and it's a small price to pay for the benefits it brings.

#### Headers

Headers should always use title case, this doesn't need much explanation.

If headers become ambiguous, give them a custom ID, e.g.

```markdown
### non-unique header{#a-different-id}
```

This tends to especially arise on lower levels of headings (e.g. h4 `####` and h5 `#####`), where you may have multiple sections that are about the same thing (e.g. "Examples"), but you still want to be able to link to them directly.
It helps to have a linter or similar tools that tell you when you have duplicate headers, so you don't forget to add the custom ID.

#### Emphasis / Bold Markers

Use single asterisks for `*italics*` and double asterisks for `**bold**`.
This makes it easier to later change it to the other style if we ever want to, and it doesn't lose much meaning compared to underscore `_italics_`.

These markers should not be applied to whole sentences or paragraphs, but rather to specific words or phrases that you want to emphasize.
If you want to emphasize a whole sentence or paragraph, consider using a [callout instead](#callouts).

Using CAPSLOCK and, worse, **BOLD CAPSLOCK** looks ugly, and is generally considered shouting in online communications.
Don't do it.

#### Lists

Use hyphens `-` for all unordered lists, even sub-lists.
This makes it easier for you to write (only one symbol to use) and it is more readable in source form.

Properly number your ordered lists.
Don't just use `1.` for every item (even though that properly renders to HTML); use the correct numbers for each item.
This forces the writer to carefully think about the order of the items and the structure of the list.

Lists should be surrounded by blank lines.

#### Code

Use backticks for `inline code` and triple backticks for code blocks.
Code blocks should be surrounded by blank lines and be properly tagged with the appropriate language (e.g. `yag` for custom command code).
Code inside code blocks should be indented and formatted properly.
Custom command code should have spaces after the `{{` and before the `}}` to improve readability.

````
```yag
{{/* custom command code goes here */}}
{{ sendMessage nil "Hello, world!" }}
```
````

### Additional Markdown Features

Hugo provides some additional features through shortcodes and other means, so feel free to use those when appropriate.

#### Callouts

The Doks theme provides us with a `callout` shortcode that we can use to create callouts for notes, tips, warnings, and dangers.

```
{{< callout context="note" title="Note" icon="outline/info-circle" >}}

This is a note callout.

{{< /callout >}}
```

Use callouts sparingly and only when they add value to the content, as they can easily become overwhelming and lose their impact if overused.
As a general rule of thumb, here's what each callout type should be used for:

- `danger`: Only use for things that have fatal consequences, like data loss, infinite loops, or similar.
- `warning`: Use for things that are generally problematic, like "this feature will not work and fail spectacularly".
- `note`: Use for things that are important to know, but don't have any negative consequence other than "minor inconvenience".
- `tip`: Use for things that are not strictly necessary to know, but can be helpful or improve the reader's experience.
- `premium`: Use it to indicate that a feature is only available to premium users.

Callouts are best accompanied by a meaningful title (e.g. `Note: Required Permissions`) to help screen readers provide useful context, and to make it easier for all readers to quickly understand the point of the callout.
When you feel your title is far too redundant with the content of the callout, that usually is clear indication that the callout is not necessary and the content can just be integrated into the main text instead.

> [!TIP]
> If you use VSCode, this project provides custom workspace snippets to insert callouts, which you can activate in Markdown files by typing <kbd>Ctrl</kbd> + <kbd>Space</kbd> followed by `note`, `tip`, `warning`, or `danger`.

#### Math

We use [KaTeX](https://katex.org/) to render math in the documentation, which supports a wide range of LaTeX math syntax.
To avoid unnecessarily loading the library on pages that don't need it, math rendering is opt-in on a per-page basis.
To enable math rendering on a page, you must add `katex = true` to the front matter of the page.

Refer to the [KaTeX documentation](https://katex.org/docs/supported.html) for the supported syntax and features.
Use `$$` for display math and `$` for inline math, just like in regular LaTeX.

#### Diagrams

For rendering diagrams, we load the [Mermaid](https://mermaid.js.org/intro/syntax-reference.html) library, which supports a variety of diagram types (flowcharts, sequence diagrams, class diagrams, etc.).
To create a mermaid diagram, simply use a code block with the language set to `mermaid`, and write your diagram using the Mermaid syntax.

````
```mermaid
(your diagram code goes here)
```
````
