+++
title = "Loops"
weight = 330
+++

In a previous chapter, we learned about [conditional branching](/learn/beginner/conditional-branching).
In this chapter, we will discuss more advanced control flow actions: namely, `range`, `while`, and `with` actions.

## Loop

Fundamentally, loops provide a way to perform repeated actions. There are two loop actions available in custom commands:
`range`, which repeats an action for each entry in a data structure, and `while`, which repeats an action as long as a
condition holds.

### Range

The `range` action performs an action for each entry in a slice or map; we say that range _iterates_ over the slice or
map. If you have experience with other programming languages, `range` is roughly equivalent to a for-each loop.

#### Ranging over slices

We will explain how `range` works with a slice using an illustrative example. The program below iterates over a slice of
snacks and generates a line of output for each one.

```yag
{{ $snacks := cslice
    (sdict "Name" "chips" "Calories" 540)
    (sdict "Name" "peanuts" "Calories" 580)
    (sdict "Name" "crackers" "Calories" 500)
}}
{{ range $snacks }}
    {{ .Name }} contain {{ .Calories }} calories.
{{ end }}
```

The loop body—that is, the code between the opening `range $snacks` and the closing `end`—is executed
multiple times, with the dot `.` set to each element of the slice in succession.

For instance, in the first iteration, the `.` holds the first element of the slice:
`(sdict "Name" "chips" "Calories" 540)`. So

```yag
{{ .Name }} contain {{ .Calories }} calories.
```

evaluates to

```txt
chips contain 540 calories.
```

Likewise, the second iteration produces `peanuts contain 580 calories`, and the third produces `crackers contain 500 calories.`
The complete output of the program is

```txt
chips contain 540 calories.

    peanuts contain 580 calories.

    crackers contain 500 calories.
```

Notice that this output contains some unwanted whitespace: ideally, we want each snack to appear on a separate line with
no leading indentation. However, the extra whitespace is to be expected with our current program; the range block is
indented, and YAGPDB is simply reproducing that indentation:

```yag
{{ range $snacks }}
    {{ .Name }} contain {{ .Calories }} calories.
^^^^
{{ end }}
```

To fix the excess whitespace in the output, then, one solution is to remove the corresponding whitespace in our source
code:

```yag
{{ range $snacks }}{{ .Name }} contains {{ .Calories }} calories.
{{ end }}
```

However, though this version works, we have sacrificed readability in the process. Can we find a way to keep our source
code indented while simultaneously hiding this indentation from the final output? It turns out that we can, by carefully
adding _trim markers_.

```yag
{{ range $snacks }}
    {{- .Name }} contain {{ .Calories }} calories.
    ^^^
{{ end }}
```

`{{-` is a _left trim marker_ that instructs YAGPDB to ignore all leading whitespace, so this new version is
functionally equivalent to the previous solution. A corresponding _right trim marker_, `-}}`, also exists and trims all
trailing whitespace.

{{< callout context="tip" title="Tip: Trim Markers" icon="outline/rocket" >}}

Use trim markers `{{-` and `-}}` to control the whitespace output by your program.

A mnemonic to help remember what `{{-` and `-}}` do is to view them as arrows that gobble up whitespace in the direction
they point; for instance, `{{-` points left, and eats all whitespace to the left.

{{< /callout >}}

#### Ranging over maps

It is also possible to range over the (key, value) pairs of a map. To do so, assign two variables to the result of the
range action, corresponding to the key and value respectively. (Note that the dot `.` is still overwritten when ranging
with variables.)

For example, the following program displays the prices of various types of fruit, formatted nicely to 2 decimal places
with the `printf` function.

```yag
{{ $fruitPrices := sdict "pineapple" 3.50 "apple" 1.50 "banana" 2.60 }}

{{ range $fruit, $price := $fruitPrices }}
    {{- $fruit }} costs ${{ printf "%.02f" $price }}.
{{ end }}
```

The names of the variables assigned to the key and value are arbitrary; instead of
`range $fruit, $price := $fruitPrices`, we could also have written `range $k, $v := $fruitPrices`.
However, if we use the names `$k`, `$v`, we must consistently refer to those in the loop body. That is, the following
program is erroneous:

```yag
{{ range $k, $v := $fruitPrices }}
    {{- /* ERROR: $fruit and $price are undefined; must use $k and $v instead */}}
    {{- $fruit }} costs ${{ printf "%.02f" $price }}.
{{ end }}
```

{{< callout context="note" title="Note" icon="outline/info-circle" >}}

The two-variable form of range can also be used with a slice, in which case the first variable tracks the position of
the element starting from `0`.

{{< /callout >}}

#### Rarer forms of range

There are a few other, less common ways to invoke the range action.

- **Iterating _n_ times.** To iterate a fixed number of times, provide an integer to `range`:

  ```yag
  {{ range 5 }}
      {{/* executed 5 times */}}
  {{ end }}
  ```

  To iterate over an interval of integers (say, the integers between `5` and `10` exclusive), use the `seq`
  function to generate a slice of integers and then range over the result:

  ```yag
  {{ range seq 5 10 }}
      {{/* executed with the dot . set to 5, 6, 7, 8, 9 in succession */}}
  {{ end }}
  ```

- **Single-variable range.** Instead of using the dot `.` to access the current element or value, one
  can also assign it to a variable:

  ```yag
  {{ $sports := cslice "tennis" "basketball" "soccer" }}
  {{ range $sport := $sports }}
      {{/* executed with $sport set to "tennis", "basketball", "soccer" in succession */}}
  {{ end }}
  ```

  Note that the dot `.` is still overwritten when using a variable.

- **Range with else branch.** Similar to an if conditional, a range action may also have an `else` block,
  executed if the slice or map is empty.

  ```yag
  {{ $users := cslice }} {{/* imagine this data is dynamically generated */}}
  {{ range $user := $users }}
      {{/* do something with $user */}}
  {{ else }}
      no users
  {{ end }}
  ```

#### Accessing global context data in range

The following program illustrates a common error for first-time users of `range`.

```yag
{{ $nums := cslice 1 2 3 }}
{{ range $nums }}
    {{/* ... */}}
    {{ .User.Username }} {{/* ERROR: can't evaluate field User in type interface {} */}}
{{ end }}
```

The problem is that, inside the range block, the dot `.` is overwritten by successive elements of the slice `1`, `2`,
`3`. While this behavior is generally useful—we often _want_ to refer to the current element in a range action—it is
counterproductive here, as `.User.Username` tries to look up the field `User` on an integer (and fails to do so.) What
we really want is to access the global context data as it was before the range loop. One solution is to save the
original context data in a variable prior to the loop:

```yag
{{ $dot := . }}
{{ range ... }}
    {{ $dot.User.Username }}
{{ end }}
```

To make this pattern easier, before each custom command execution, YAGPDB predefines the variable `$` as the initial
context data for you.

{{< callout context="caution" title="Accessing Global Context Data" icon="outline/alert-triangle" >}}

In a range block, the dot is overwritten by elements of the slice or map, so code such as `.User.Username` is likely to
error. If you need to access the global context data, do so through the predefined `$` variable instead.

```yag
{{ range ... }}
    {{ $.User.Username }} {{/* instead of .User.Username */}}
{{ end }}
```

{{< /callout >}}

### While

`while` loops as long as the specified condition is truthy. Unlike the `range` action, the dot `.` is not affected.

For instance, the following code loops as long as `$n` is not 1. In each iteration, `$n` is updated to either `n/2` or
`3n+1`.

```yag
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
