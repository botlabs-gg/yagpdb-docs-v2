+++
title = "Control Flow 2"
weight = 330
+++

In a previous chapter, we learned about [basic control flow](/learn/beginner/control-flow-1). In this chapter, we will
explore more advanced control flow structures, that is, loops and `with` blocks.

## Loops

Loops allow you to condense a block of code that is otherwise repeated multiple times. In custom commands, we provide to
looping constructs, `range`, and `while`. Superficially, they both do the same thing, i.e. repeat a block multiple times,
but they have different applications.

### Range

The `range` action is used to iterate over a slice, map, or integer. This is easier to show with some (minimal) code,
so let's dive right in.

To iterate just over some values, as you'd generally do with a slice, we'd write the following code. This might look
somewhat familiar to you if you have used some other programming languages before.

```go
{{ range $some_slice }}
    {{/* Action executed with each value of this pipeline */}}
{{ else }} {{/* Note that this is optional, you can skip to the end clause */}}
    {{/* Action executed when the length of the pipeline is 0 */}}
{{ end }}
```

Similarly, you can range over an integer, which will iterate from 0 to the given number. Formerly, this was only
achievable by creating a slice of numbers with `seq`. An `else` block is permitted here as well, although that would
only run if the given integer is 0.

```go
{{ range 5 }}
    {{/* Action executed with each value of this pipeline */}}
{{ end }}
```

If we have a map instead, and wish to iterate over its keys and values, we assign two variables to the result of the
range action:

```go
{{ range $key, $value := $some_map }}
    {{/*
         $key and $value can be any variable name.
         Here, $key is the key (for maps / sdicts / dicts) and the index,
         starting from 0 for slices.
         $value will be the corresponding value belonging to $key.
    */}}
{{ else }} {{/* Optional */}}
    {{/* Action executed when length of pipeline is 0. */}}
{{ end }}
```

Please note that you're not required to use this syntax when iterating over a map. The first example will work just
fine, though only give you the values stored in your map. Likewise, you can omit the `{{ else }}` clause if you don't
need it, the `{{ end }}` statement, however, is still required, as established earlier in this course.

{{< callout context="caution" title="Caution" icon="outline/alert-triangle" >}}

Inside the range block, the dot `{{ . }}` is set to the current value of the iteration. This means that if you were to
access some global context data like `.User`, it will not work as expected. To access this global context, you need to
prefix with `$`. For demonstration purposes, the following code is intentionally left broken, fixing it is an exercise
for the reader.

```go
{{ range 5 }}
  {{- .User.Username }}: {{ . }}!
{{ end }}
```

This does not apply to the optional `else` block following a `range` action.

{{< /callout >}}

### While

`while` iterates as long as the specified condition is true, or more generally evaluates to a non-empty value. The dot
(`.`) is not affected, unlike with the `range` action. Analogous to `range`, `while` introduces a new scope which is
concluded by the `end` action.

```go
{{ while $some_condition }}
    {{/* Action executed as long as $some_condition is true */}}
{{ else }}
    {{/* Action executed when $some_condition is false at beginning */}}
{{ end }}
```
Conditions can be combined using logical operators like `and`, `or`, and `not`. For example, to iterate as long as a
variable is less than 5 and greater than 0:

```go
{{ while and (lt $some_variable 5) (gt $some_variable 0) }}
    {{/* Action executed as long as $some_variable is between 0 and 5 */}}
    {{ $some_variable = sub $some_variable 1 }}
{{ end }}
```

### Break and Continue

In custom commands, we provide two actions to control the flow of loops: `{{ break }}` and `{{ continue }}`.
`break` is used to exit the loop prematurely, while `continue` skips the rest of the current iteration and jumps to the
next one. These can prove very useful to optimize your code for size and readability. `return`, which we previously
introduced, will exit the entire command, so be careful when using it in loops.

## With Blocks

Just like the `if` action, `with` runs a block of code if the given pipeline is truthy. However, unlike `if`, the dot
(`.`) is set to the value of the pipeline.

```go
{{ with $some_variable }}
    {{/*
         Action executed if $some_variable is truthy.
         The dot (.) is now set to the value of $some_variable.
    */}}
{{ else }}
    {{/* Action executed if $some_variable is falsy. */}}
{{ end }}
```

Be careful not to overuse `with` blocks, as they can make your code harder to follow. It makes only really sense to use
`with` when you drastically shorten your code by doing so, without compromising readability. Consider following negative
example and think of ways to improve it.

```go
{{ with .CmdArgs }}
    {{ with reFind `^\d+` (joinStr " " .) }}
        You sent the number {{ . }}!
    {{ else }}
        Not a valid number!
    {{ end }}
{{ else }}
    Please provide a valid number!
{{ end }}
```
