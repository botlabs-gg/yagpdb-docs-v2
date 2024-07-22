+++
title = "Data Types 1"
weight = 220
+++

In this chapter, we will overview how to store data in variables and the basic data types available, which include
[strings](#strings), [numbers](#numbers), and [booleans](#booleans).

## Variables

Before we go over data types, we will cover how to store data and refer to it later. We can do this by using variables.
A variable is a way to store a value and give it a name, to which you can refer back to later.

In Custom Commands, you define a variable by starting with a `$`, its name, and the assignment operator `:=`. To
illustrate this, consider the following example:

```go
{{ $name := "Alice" }}
{{ $age := 42 }}
{{ $isCool := true }}

{{ $name }}, aged {{ $age }}, is cool: {{ $isCool }}
```

Later on, we may wish to reassign a new value to a variable. We can do this by using the re-assignment operator `=`.
When and why this becomes necessary will be discussed in a later chapter.

{{< callout context="tip" title="Tip" icon="outline/rocket" >}}

When debugging your code, you might have to figure out the type of a certain variable. You can do this by using the
[`printf` function](/docs/reference/templates/functions/#string-manipulation) with the `%T` format verb, like so:

```go
{{ $name := "Alice" }}
{{ printf "%T" $name }}
```

{{< /callout >}}

## Data Types

If you're completely new to programming, you might not know what a data type is. You can think of a data type as a way
to distinguish between different kinds of things. As a real-life analogy, you can separate food into several categories,
such as fruits, vegetables, and meat. Each category is in that sense its own data type.

In programming, we have similar categories, such as numbers, strings, and booleans (true / false values).
Each of these categories has its own set of operations that can be performed on them. For instance, you can add two
numbers together, but you cannot add two strings together (at least not in the way you might expect).


### Strings

A string is a sequence of zero or more characters. You can generally think of it as a word or a sentence.
In the bot's template actions, you can create a string by enclosing some text in double quotes (`"`). For instance,
`"Hello, world!"` is a string. We call those *double-quoted strings*.

Now, here we might run into a problem quite quickly: what if we want to include a double quote in our string? We can't
just write `"Peter said "Hello, world!""`, as the bot would think the string ends at the quotes before `Hello` and not
know that we want them included in the string. To solve this, we must escape the double quote by adding a backslash
(`\`) in front of it. This tells the bot that the double quote is not the end of the string. In other words,
`"Peter said \"Hello, world!\""` would yield the expected result.

To insert a newline (you would press `Enter` on your keyboard), you can use the escape sequence `\n`. For example the
string `"Hello\nWorld!"` would result in the following output:

```txt
Hello
World!
```

For a full list of escape sequences, you can refer to the [Go documentation](https://golang.org/ref/spec#Rune_literals).
Please note that not all escape sequences are supported by Discord.

#### Raw String Literals

It should become relatively clear that a lot of new lines and other special characters can make a quoted string quite
hard to read. To make this easier, you can use backticks (`` ` ``) to create a *raw string literal*. A raw string
literal does not attempt to interpret its contents in any way, and will simply contain the text between the opening ``
` `` and closing `` ` `` unmodified---we cannot even escape a backtick to include one in the string, but we will later
cover functions that solve this special case.

```txt
`This is my
cool multiline string!

Look at all the new lines!`
```

### Numbers

Numeric values can be represented in two ways, using integers (whole numbers) and floating-point numbers (numbers with a
decimal point). In the bot's template actions, you can create an integer by simply writing a whole number, such as `5`.
For floating-point numbers, you can add a decimal point, like so: `5.0`.

#### Integers

In the bot's template actions, integers are represented as 64-bit signed integers. This means that you can store numbers
from `-9223372036854775808` to `9223372036854775807`. If you try to store a number outside this range, the bot will
return an error.

The bot accepts several notations for integers:

1. As a base-10 number, such as `42`. This will mean what you think, the number forty-two.
2. As a base-16 number, such as `0x2A`. This is the [hexadecimal representation][hex] of the number forty-two.
3. As a base-8 number, such as `0o52`. This is the [octal representation][oct] of the number forty-two.
4. As a base-2 number, such as `0b101010`. This is the [binary representation][bin] of the number forty-two.

[hex]: https://en.wikipedia.org/wiki/Hexadecimal
[oct]: https://en.wikipedia.org/wiki/Octal
[bin]: https://en.wikipedia.org/wiki/Binary_number

#### Floating-Point Numbers

We represent floating-point numbers as 64-bit IEEE-754 floating-point numbers. This means that you can store numbers
with a precision of about 15 decimal places. If you try to store a number with more precision, the bot will round it to
the nearest representable number.

There are a lot of ways to define a floating-point number, but the most common way is to use the decimal point, such as
`3.14`. For a full list of ways to define a floating-point number, you can refer to the
[Go documentation](https://golang.org/ref/spec#Floating-point_literals).

### Booleans

A boolean is a data type that can only have one of two values: `true` or `false`. Booleans are used to represent the
truth value of an expression. For instance, `5 > 3` would evaluate to `true`, while `5 < 3` would evaluate to `false`.

You can think of it as a light switch: it can either be on (`true`) or off (`false`). Booleans are often used in
conditional statements, such as `if` statements, to determine which branch of the code should be executed.
