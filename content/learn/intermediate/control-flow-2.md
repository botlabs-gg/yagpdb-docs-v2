+++
title = "Control Flow 2"
weight = 330
+++

In a previous chapter, we learned about [basic control flow](/learn/beginner/control-flow-1). In this chapter, we will
discuss more advanced control flow actions: namely, `range`, `while`, and `with` actions.

## Loop

Fundamentally, loops provide a way to perform repeated actions. There are two loop actions available in custom commands:
`range`, which repeats an action for each entry in a data structure, and `while`, which repeats an action as long as a
condition holds.

### Range

The `range` action performs an action for each entry in a slice or map; we say that range _iterates_ over the slice or
map. If you have worked with other programming languages, `range` is roughly equivalent to a for-each loop.

#### Ranging over slices

Consider the following program, which iterates over a slice of snacks and generates a line of output for each one.

```go
{{ $snacks := cslice
    (sdict "Name" "chips" "Calories" 540)
    (sdict "Name" "peanuts" "Calories" 580)
    (sdict "Name" "crackers" "Calories" 500)
}}
{{ range $snacks }}
    {{ .Name }} contain {{ .Calories }} calories.
{{ end }}
```

Within the range block, the dot `.` is set to successive elements of the slice. In the first iteration, for instance,
`.` holds the first element of the slice: `(sdict "Name" "chips" "Calories" 540)`. Hence

```txt
{{ .Name }} contain {{ .Calories }} calories.
```

evaluates to

```txt
chips contain 540 calories.
```

and likewise for the second and third elements. The complete output is

```txt
chips contain 540 calories.

    peanuts contain 580 calories.

    crackers contain 500 calories.
```

Observe that this output contains some unwanted whitespace; ideally, we want each snack to appear on a separate line
with no leading indentation. However, the extra whitespace is to be expected with our current program: the range block
is indented, and YAGPDB simply reproduces that indentation.

```go
{{ range $snacks }}
    {{ .Name }} contain {{ .Calories }} calories.
^^^^
{{ end }}
```

One solution, then, is to remove the whitespace in our source code, save the final newline:

```go
{{ range $snacks }}{{ .Name }} contains {{ .Calories }} calories
{{ end }}
```

Although this version works, we have sacrificed readability. To retain the indentation in our source code while
simultaneously avoiding unwanted whitespace in our output, we can use _trim markers_.

```go
{{ range $snacks }}
    {{- .Name }} contain {{ .Calories }} calories.
{{ end }}
```

`{{-` is a _left trim marker_ that instructs YAGPDB to ignore all leading whitespace, so this new version is
functionally equivalent to the previous solution. A right trim marker, `-}}`, also exists and trims all trailing
whitespace.

{{< callout context="tip" title="Tip: Trim Markers" icon="outline/rocket" >}}

Use trim markers `{{-` and `-}}` to remove unwanted whitespace in output while keeping your source code readable.

{{< /callout >}}

#### Ranging over maps

It is also possible to range over the (key, value) pairs of a map. To do so, assign two variables to the result of the
range action, corresponding to the key and value respectively:

```go
{{/* key is fruit; value is price */}}
{{ $fruitPrices := sdict "pineapple" 3.50 "apple" 1.50 "banana" 2.60 }}

{{/*
    Variable names are arbitrary:
        range $foo, $bar := $fruitPages
    would work too as long as you are consistent.
*/}}
{{ range $fruit, $price := $fruitPrices }}
    {{- $fruit }} costs ${{ printf "%.02f" $price }}.
    {{- /*
        As with a slice, in each iteration the dot . is set to the current value, so
            printf "%.02f" .
        also works.
    */}}
{{ end }}
```

The two-variable form of range can also be used with a slice, in which case the first variable tracks the position of
the element starting from `0`.

#### Rarer forms of range

There are a few other, less common ways to invoke the range action.

- **Iterating _n_ times.** To iterate a fixed number of times, provide an integer to `range`:

  ```go
  {{ range 5 }}
      {{/* executed 5 times */}}
  {{ end }}
  ```

  To iterate over an interval of integers (say, the integers between `5` and `10` exclusive), use the `seq`
  function to generate a slice of integers and then range over the result:

  ```go
  {{ range seq 5 10 }}
      {{/* executed with the dot . set to 5, 6, 7, 8, 9 in succession */}}
  {{ end }}
  ```

- **Single-variable range.** Instead of using the dot `.` to access the current element or value, one
  can also assign it to a variable:

  ```go
  {{ $sports := cslice "tennis" "basketball" "soccer" }}
  {{ range $sport := $sports }}
      {{/* executed with $sport set to "tennis", "basketball", "soccer" in succession */}}
  {{ end }}
  ```

  Note that the dot `.` is still overwritten when using a variable.

- **Range with else branch.** Similar to an if conditional, a range action may also have an `else` block,
  executed if the slice or map is empty.

  ```go
  {{ $empty := cslice }}
  {{ range $empty }}
      {{/* ... */}}
  {{ else }}
      slice was empty
  {{ end }}
  ```

#### Accessing global context data in range

The following program illustrates a common error for first-time users of `range`.

```go
{{ $nums := cslice 1 2 3 }}
{{ range $nums }}
    {{/* ... */}}
    {{ .User.Username }} {{/* ERROR: can't evaluate field User in type inteface {} */}}
{{ end }}
```

The problem is that, inside the range block, the dot `.` is overwritten by successive elements of the slice `1`, `2`,
`3`. While this behavior is generally useful—we often _want_ to refer to the current element in a range action—it is
counterproductive here, as `.User.Username` tries to look up the field `User` on an integer (and fails to do so.) What
we really want is to access the global context data as it was before the range loop. One solution is to save the
original context data in a variable prior to the loop:

```go
{{ $dot := . }}
{{ range ... }}
    {{ $dot.User.Username }}
{{ end }}
```

To make this pattern easier, before each custom command execution, YAGPDB predefines the variable `$` as the initial
context data for you.

{{< callout context="caution" title="Warning: Common Error" icon="outline/alert-triangle" >}}

In a range block, the dot is overwritten by elements of the slice or map, so code such as `.User.Username` is likely to
error. If you need to access the global context data, do so through the predefined `$` variable instead.

```go
{{ range ... }}
    {{ $.User.Username }} {{/* instead of .User.Username */}}
{{ end }}
```

{{< /callout >}}

### While

`while` loops as long as the specified condition is truthy. Unlike the `range` action, the dot `.` is not affected.

For instance, the following code loops as long as `$n` is not 1. In each iteration, `$n` is updated to either `n/2` or
`3n+1`.

```go
{{ $n := 19 }}

{{ print $n " " -}}
{{ while ne $n 1 }}
    {{- if eq (mod $n 2) 0. }}
        {{- $n = div $n 2 }}
    {{- else }}
        {{- $n = mult $n 3 | add 1 }}
    {{- end -}}
    -> {{ print $n " " -}}
{{ end }}
```

As with `range`, it is also possible to attach a `else` branch to a `while` loop, executed if the condition is falsy
initially.

{{< callout context="tip" title="Tip" icon="outline/rocket" >}}

Many `while` loops can be written as a more idiomatic range loop instead. In particular, to iterate a fixed number of
times, use `{{ range n }}` as in `{{ range 5 }}` instead of maintaining your own counter variable with `while`.

{{< /callout >}}

### Break and Continue

In custom commands, we provide two actions to control the flow of loops: `{{ break }}` and `{{ continue }}`. `break`
exits the loop prematurely, whereas `continue` skips the remainder of the current iteration and jumps to the next one.
These can prove very useful to optimize your code for size and readability, with similar benefits to guard clauses with
`{{ return }}` introduced in earlier chapters.

## With Blocks

Just like the `if` action, `with` runs a block of code if the given expression is truthy. The only difference is that
`with` overwrites the dot `.` with the expression if it is truthy.

For instance, the following program

```go
{{ $msg := "I <3 the YAGPDB documentation!" }}
{{ with reFind `\d+` $msg }}
    pattern found in text; the dot {{ printf "%q" . }} contains the match
{{ else }}
    pattern did not match
{{ end }}
```

outputs

```text
pattern found in text; the dot "3" contains the match
```

Note that the dot `.` has been set to `"3"`—the result of `reFind`. See if you can change the text stored in `$msg` so
that the program hits the `else` branch instead.

{{< callout context="caution" title="Warning" icon="outline/alert-triangle" >}}

Be careful not to overuse `with` blocks, as they can make your code difficult to follow. In general, prefer using
a normal `if` conditional and only use `with` if it improves readability; do not use it just to shorten code.

{{< /callout >}}
