# Style Guide

This document outlines the general requirements for writing documentation for YAGPDB.
Some rules may be bent or broken if there's good reason to do so, but in general, the guidelines outlined here should be followed to ensure a consistent style across the documentation.

## In Short

If you try your best to mimic the already existing style in the documentation, you will likely be fine.

### Language

1. Use American English
2. Use the Oxford comma
3. Don't patronize the reader
4. Write in a semi-formal style; not too cold and technical, but not too casual and conversational either.

### Formatting

1. Write one sentence per line (except in lists when necessary)
2. Use title case for headings
3. Use single asterisks for `*italics*` and double asterisks for `**bold**`
4. Use `-` for lists, even sublists
5. Properly number your ordered lists
7. Use backticks for `inline code` and triple backticks for code blocks

## In Detail

Below are the detailed explanations for the guidelines outlined above, as well as some additional information and examples.

### Language

#### Use American English

American English is the de-facto standard for technical writing, and using it helps maintain consistency across the documentation.
For that reason, readers may be more acquainted with American English spelling and grammar, and it may be easier for them to understand the documentation if it's written in that variant.

You are obviously free to use other English variants in your communication (e.g. commit messages).

#### Use the Oxford comma

Using the Oxford comma avoids ambiguity in lists.
This is simply about avoiding any possibility of misinterpretation, no matter how clear the context may seem to be to you.
The [Wikipedia entry](https://en.wikipedia.org/wiki/Serial_comma) has some really good examples of where the Oxford comma can make a difference.

#### Don't Patronize the Reader

Don't talk down to the reader or assume that they don't know anything.
This especially applies to the custom command course (`content/learn/`), where we guide the reader through discovering things on their own.
Gently nudge them towards discovering certain things on their own.

We understand that this may be difficult at times, so if you are unsure about it, step back for a while and read what you wrote with fresh eyes, or ask someone else to review it.
Also, please don't use caps.

#### Semi-formal Style

We're not writing some academic paper here; avoid too much technical jargon and try to keep the tone light and approachable.
On the other hand, we're also not writing a casual blog post; avoid slang and overly conversational language.
The goal is to strike a balance between being informative and being engaging, without being too dry or too casual.

This rule is a little bit relaxed in the custom command course, where we do want it to be a bit more conversational and approachable, but it still applies to some extent.

### Formatting

#### One Sentence Per Line

Semantic Linefeeds (one sentence per line) make a lot of things easier.
You very quickly realise when you have written a sentence that is simply too long, and it makes it easier to review and edit the text later on.
It also makes it easier to track changes in version control, as you can see exactly which sentences were changed, added, or removed, without any noise from reflowing text because they were wrapped at a certain character limit.
Semantic linefeeds could also help writing sentences that are roughly equal in length, which can improve readability.

It does read a little bit awkward in source form, but that's not what the reader will see, and it's a small price to pay for the benefits it brings.

#### Headers

Obviously headers use title case, this shouldn't need much explanation.

If headers become ambiguous, give them a custom ID, e.g.

```markdown
### non-unique header{#my-unique-id}
```

This tends to especially arise on lower levels of headings (e.g. h4 `####` and h5 `#####`), where you may have multiple sections that are about the same thing (e.g. "Examples"), but you still want to be able to link to them directly.
It helps to have a linter or similar tools that tell you when you have duplicate headers, so you don't forget to add the custom ID.

#### Emphasis / Bold Markers

Use single asterisks for `*italics*` and double asterisks for `**bold**`.
This makes it easier to later change it to the other style if we ever want to, and it doesn't lose much meaning compared to underscore `_italics_`.

These markers should not be applied to whole sentences or paragraphs, but rather to specific words or phrases that you want to emphasize.
If you want to emphasize a whole sentence or paragraph, consider using a callout instead (see below).

Using CAPSLOCK and, worse, **BOLD CAPSLOCK** looks ugly, and feels far too shouty.
Don't do it.

#### Lists

Use `-` for unordered lists, even sublists.
This makes it easier for you to write (only ever one symbol to use) and it also looks cleaner in source form.

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

#### Additional Markdown Features

Hugo provides some additional features through shortcodes and other means, so feel free to use those when appropriate.
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
- `note`: Use for things that are important to know, but don't have any negative consequence beyond "minor incovenience".
- `tip`: Use for things that are not strictly necessary to know, but can be helpful or improve the reader's experience.
- `premium`: Use it to indicate that a feature is only available to premium users.

Callouts are best accompanied with a meaningful title (e.g. `Note: Required Permissions`) to help those with a screen reader understanding what's going on, and to make it easier for all readers to quickly understand the point of the callout.
When you feel your title is far too redundant with the content of the callout, that generally is clear indication that the callout is not neceessary and the content can just be integrated into the main text instead.

> [!TIP]
> If you use VSCode, this project provides custom workspace snippets to insert callouts, which you can activate in Markdown files by typing <kbd>Ctrl</kbd> + <kbd>Space</kbd> followed by `note`, `tip`, `warning`, or `danger`.

