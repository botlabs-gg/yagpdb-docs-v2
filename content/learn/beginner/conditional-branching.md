+++
title = "Conditional Branching"
weight = 230
+++

Until now, we have just written some linear code that executes from top to bottom. However, in real-world applications,
we often need to execute different code depending on certain states of our program. This is where _control flow_ comes
into play.

You already have an intuitive understanding of control flow. For instance, when you cross the street, you look left and
right to see if any cars are coming. If there are no cars, you cross the street. Otherwise ("else"), you wait until the
incoming cars have passed, then check again. This is a simple example of a decision-making process.

## If Statements

The most basic form of control flow is the `if` statement. An `if` statement checks a condition and executes a block of
code if the condition is true. If the condition is false, the block of code is skipped.

```yag
{{ if eq 5 5 }}
  {{/* It is conventional, though not required, to consistently indent inner blocks of code with spaces or tabs. */}}
  Five is equal to five!
{{ end }}
```

We use the `eq` comparison function to check whether its given arguments are equal; we will enumerate all comparison
functions in a [later section](#comparison-actions) on this page.

We can expand this to execute a different block of code if the condition is false by using an `else` block:

```yag
{{ if eq 5 3 }}
  Five is equal to three!
{{ else }}
  Five is not equal to three!
{{ end }}
```

This can be further expanded to check multiple conditions using `else if`, which are checked sequentially until one of
them is true:

```yag
{{ if eq 5 3 }}
  Five is equal to three!
{{ else if eq 5 5 }}
  Five is equal to five!
{{ else }}
  Five is not equal to three or five!
{{ end }}
```

{{< callout context="note" title="Note" icon="outline/info-circle" >}}

The condition of an `if` statement need not be a boolean: in general, an `if` statement will trigger if the condition is
_truthy_: that is, not empty or zero. (Conversely, empty and zero values are _falsy_.)

For example, consider how you would check whether a string `$s` is empty. One way is to explicitly compare the length of
the string to zero using `if gt (len $s) 0`, but since empty strings are falsy, the more idiomatic solution is to simply
write `if $s`, like so:

```yag
{{ $s := "" }}
{{ if $s }}
  not empty
{{ else }}
  empty
{{ end }}
```

{{< /callout >}}

#### Guard Clauses

As your code grows, you may find yourself nesting `if` statements inside each other. This can lead to code that is hard
to read and understand. One way to avoid this is to use _guard clauses_. A guard clause is an `if` statement that checks
for a condition and returns early via the `{{ return }}` action. Therefore, the condition we checked in the earlier
`if`/`else` construct must be negated.

Rewriting the second example to use these guard clauses yields the following code:

```yag
{{ if ne 5 3 }}
  Five is not equal to three!
  {{ return }}
{{ end }}

Five is equal to three!
```

Although this example may be a bit contrived, guard clauses can help you avoid deeply nested code and make your code
easier to read, especially when you come back to it at a later date.

## Comparison Actions

In programming, we can make decisions by comparing values to each other. We can compare numbers, strings, and other data
types. The result of a comparison is a _boolean_ value, which is either `true` or `false`. Normally, comparisons are
binary operators; however, in custom commands, we use functions to compare values.

{{< callout context="caution" title="Comparing across Types" icon="outline/alert-triangle" >}}

Just like you cannot quite compare apples and oranges, you cannot compare values of different types. For instance, you
cannot compare a number to a string. The bot will throw an error if you try to do so, you will have to convert either of
them to the other type first.

{{< /callout >}}

We provide the following comparison functions in custom commands:

- `eq` (equals `==`)
- `ne` (not equals `!=`)
- `lt` (less than `<`)
- `le` (less than or equal to `<=`)
- `gt` (greater than `>`)
- `ge` (greater than or equal to `>=`)

These functions can only compare basic data types as introduced in [Variables and Data Types][dtypes]. Strings
are compared on a byte-by-byte basis. Please refer to the [functions documentation](/docs/reference/templates/functions)
for the syntax of these functions.

[dtypes]: /learn/beginner/variables-and-data-types

## Blocks And Scope

In the previous chapter, we introduced the concept of variables. Variables are used to store values and give them a name.
In programming, variables have a _scope_, which defines where in the code the variable can be accessed. Think of each
scope as a "container" for things inside it.

Often, you will want to have a variable available across multiple scopes. In custom commands, the variable is accessible
in the scope in which it was defined, as well as all nested scopes within. Let us assume that we want to assign a
coolness value, which should be true if the user's name is "alice". We can achieve this by defining a variable in
the outer scope and re-assigning, using the `=` operator, its value in the inner scope:

```yag
{{ $isCool := false }}

{{ if eq .User.Username "alice" }}
  {{ $isCool = true }}
{{ end }}

Are you cool? {{ $isCool }}
```

It is considered good practice to define variables in the smallest scope possible. This makes your code easier to read
and understand, as you do not have to search through the entire codebase to find where a variable was defined.

{{< callout context="caution" title="Definition and Reassignment" icon="outline/alert-triangle" >}}

In custom commands, you use `:=` to define a variable, and `=` to reassign a variable. The bot will not throw an error
if you try to re-define a variable using `:=`. Rather, it will define a new variable, effectively overwriting the
existing variable, but only within that scope---the existing variable is untouched in the outer scope.

{{< /callout >}}

{{< callout context="danger" title="Unexpected EOF" icon="outline/alert-octagon" >}}

The following error appears when you are missing an `{{ end }}` action.

![Responses: template: :XX: unexpected EOF](unexpected-eof.png)

Each control structure must have a corresponding `{{ end }}` action. If you forget to do so, YAGPDB will not know where
your control structure terminates and hence issues the above error.

To fix this error, examine each `{{ if ... }}` in your program and verify that each has a matching `{{ end }}`. (The
same applies to other control structures introduced in future chapters, such as `{{ range ... }}`.)

If you are familiar with C-family programming languages, this error is analogous to forgetting the closing `}` of a
block of code.

{{< /callout >}}

## With Blocks

Just like the `if` action, `with` runs a block of code if the given expression is truthy. The only difference is that
`with` overwrites the dot `.` with the expression if it is truthy.

For instance, the following program

```yag
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


## Exercises

1. Write a Custom Command to determine if the number stored in a variable `$a` is even or odd and print `Number is Even`
   or `Number is Odd` depending on the case. Verify the output for the following values of `$a`: 1, 9, 0, 10021, -5.

2. Predict the output of the following code snippets. If there is an error in the snippet, what is the cause of the
   error, and how can it be fixed? Also note down potential improvements to the code that make it easier to follow.

   ```yag
   {{ $num1 := 10 }}
   {{ if $num1 }}
     {{ num1 := 6 }}
     {{ $num1 }}
   {{ end }}
   {{ if not (mod $num1 3) }}
     {{ $num1 }}
   {{ end }}
   {{ $num1 }}
   ```

   ```yag
   {{ $name := "John" }}
   {{ if eq $name "John" }}
     {{ $familyName := "Walters" }}
   {{ end }}
   My name is: {{ $name }} {{ $familyName }}
   ```

   ```yag
   {{ $mood := "happy" }}
   {{ if gt $mood "Sad" }}
     Be {{ $mood }}!
   {{ else }}
     Do not be {{ $mood }}!
   {{ end }}
   ```
