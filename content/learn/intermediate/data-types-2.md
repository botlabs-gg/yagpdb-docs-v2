+++
title = "Data Types 2"
weight = 320
+++

When you first started this course, you learned about [primitive data types](/learn/beginner/datatypes-1). In the
previous chapter we name-dropped two more types: "slice", and "sdict" ("map"), both without much elaboration.
In this chapter, we will explore these data types in more detail.

## Slices

Think of a slice as a list of items, that you can add to or remove from. You might have already heard of an array, which
is a fixed-size list of items. A slice is like an array, but it can grow or shrink in size. This makes slices more
powerful than a simple array.

In custom commands, we can **c**reate a **slice** with the `cslice` function, like so:

```go
{{ $mySlice := cslice 1 2 3 "hello" 4 5 "good bye" }}
```

As you can see, the data types of the elements in a slice need not be equal, they can be anything. You already
subconsciously used a slice with dictionaries as elements, when you created the `"fields"` slice for an embed in the
previous chapter.

For available operations on slices, please refer to [our template documentation][docs-slices].

[docs-slices]: /docs/reference/templates/syntax-and-data/#templatesslice

## Maps

A map is an unordered collection of key-value pairs for fast lookups. In custom commands, we have two kinds of maps:
`sdict` and `dict`. The difference between the two is that `sdict` only supports string keys, while `dict` supports any
[comparable data type][key-types].

We can create a map with either the `sdict` or `dict` function, like so:

[key-types]: https://go.dev/blog/maps#key-types

```go
{{ $myStringMap := sdict "key1" "value1" "key2" "value2" }}
{{ $myMap := dict 1 "value1" 2 "value2" }}
```

For available operations on maps, please refer to [our template documentation][docs-maps].

[docs-maps]: /docs/reference/templates/syntax-and-data/#templatessdict

{{< callout context="tip" title="Here be Dragons" icon="outline/rocket" >}}

Consider the following code:

```go
{{ $some_map := sdict "key3" "value3" "key1" "value1" "key4" "value4" "key2" "value2" }}
{{ $some_map }}

```

Yielding this output:

```txt
map[key1:value1 key2:value2 key3:value3 key4:value4]
```

Whilst its output may suggest that `$some_map` ends up ordered by key, this is not actually the case. This behavior is
implemented for convenient debugging, but is in no way representative of the actual layout in memory.
Maps are, by definition, unordered. If you expect your map to be ordered in some way, or attempt to sort it, you are
almost always using the wrong data structure and should consider using a slice instead.

{{< /callout >}}
