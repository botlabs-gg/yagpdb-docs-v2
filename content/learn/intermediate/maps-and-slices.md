+++
title = "Maps and Slices"
weight = 320
description = "No, we don't mean roadmaps or cake slices, but they are a piece of cake nevertheless!"
+++

When you first started this course, you learned about [primitive data types](/learn/beginner/variables-and-data-types).
In the previous chapter we name-dropped two more types: "slice", and "sdict" ("map"), both without much elaboration.
In this chapter, we will explore these data types in more detail.

## Slices

A slice is an ordered list of items. In custom commands, we can **c**reate a **slice** by providing the items in order
to the `cslice` function:

```yag
{{ $fruits := cslice "banana" "orange" "apple" }}
```

All the elements in the `$fruits` slice happen to have the same type (_string_), but this is not a requirement: it is
valid, though rare, for a slice to contain elements of different types.

Besides primitives, slices may also contain more complex data types. In previous chapters, for instance, we represented
the fields of an embed as a slice of dictionaries.

For available operations on slices, please refer to [our template documentation][docs-slices].

[docs-slices]: /docs/reference/templates/syntax-and-data/#templatesslice

{{< callout context="tip" title="Tip" icon="outline/rocket" >}}

Empty slices are _falsy_, so can be used directly in conditional statements; it is not necessary to explicitly check the
length:

```yag
{{ $users := cslice }} {{/* imagine this data is dynamically generated */}}
{{ if $users }}
    one or more users
{{ else }}
    no users
{{ end }}
```

{{< /callout >}}

## Maps

A map is a table that associates values with keys, such that it is easy and efficient to retrieve the value
corresponding to a given key.

For example, a program that implements a reputation system might wish to use a map from user IDs (key) to reputation
points (value) internally. Using this map, the program can quickly look up and modify the reputation points for any
given user.

Custom commands offer two kinds of maps: sdicts and dicts. A sdict only supports string keys (hence the name: **s**tring
**dict**ionary), whereas a dict supports all [comparable data types][key-types].

[key-types]: https://go.dev/blog/maps#key-types

To create a map, provide a sequence of key-value pairs to the `sdict` or the `dict` function as appropriate:

```yag
{{ $fruitPrices := sdict "pineapple" 3.50 "apple" 1.50 "banana" 2.60 }}

{{/* For readability, it's common to put each key/value pair on a new line. */}}
{{ $userReputation := dict
    935212563644420158 3
    204255221017214977 5
}}

{{/* Pass no arguments for an empty map. */}}
{{ $empty := sdict }}
```

As with slices, empty maps are falsy and so can be used directly in conditional statements.

For available operations on maps, please refer to [our template documentation][docs-maps].

[docs-maps]: /docs/reference/templates/syntax-and-data/#templates-sdict

{{< callout context="tip" title="Here be Dragons" icon="outline/rocket" >}}

Consider the following code that displays the value of `$fruitPrices` as defined in the previous example:

```yag
{{ $fruitPrices := sdict "pineapple" 3.50 "apple" 1.50 "banana" 2.60 }}
{{ $fruitPrices }}
```

yielding

```txt
map[apple:1.5 banana:2.6 pineapple:3.5]
```

Though the output is ordered by key, this feature is only implemented for ease for debugging: maps are otherwise
unordered data structures. If your program relies on the entries of a map being ordered, consider using a slice instead.

{{< /callout >}}
