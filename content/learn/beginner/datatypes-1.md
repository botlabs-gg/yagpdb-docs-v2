+++
title = "Data Types 1"
weight = 220
+++

In this chapter, we will go over the basic data types that are available in the bot's template actions. These data types
are used to store various types of data, such as numbers, strings, and more. We will also go over how to use variables
to temporarily store and manipulate data.

If you're completely new to programming, you might not know what a data type is. You can think of a data type as a way
to distinguish between different kinds of "things". As a real-life analogy, you can separate food into several
categories, such as fruits, vegetables, and meat. Each category is in that sense its own "data type".

In programming, we have similar categories, such as numbers, strings, and booleans (true / false values).
Each of these categories has its own set of operations that can be performed on them. For instance, you can add two
numbers together, but you cannot add two strings together (at least not in the way you might expect).

## Strings

A string is a sequence of characters. You can think of it as a word or a sentence. In the bot's template actions, you
can create a string by enclosing some text in double quotes (`"`). For instance, `"Hello, world!"` is a string. We call
those *quoted strings*.

Now, here we might run into a problem quite quickly: what if we want to include a double quote in our string? We can't
just write `"Peter said "Hello, world!""`, as the bot would interpret this in a nonsensical way. To solve this, we
must escape the double quote by adding a backslash (`\`) in front of it. This tells the bot that the double quote is
part of the string and not the end of it. In other words, `"Peter said \"Hello, world!\""` would yield the expected
result.

To insert a newline (you would press `Enter` on your keyboard), you can use the escape sequence `\n`. Consider the
string `"Hello\nWorld!"`, which would result in the following output:

```txt
Hello
World!
```

For a full list of escape sequences, you can refer to the [Go documentation](https://golang.org/ref/spec#Rune_literals).
Please note that not all escape sequences are supported by Discord.

### Raw String Literals

It should become relatively clear that a lot of new lines and other special characters can make a quoted string quite
hard to read. To make this easier, you can use backticks (`` ` ``) to create a *raw string literal*. This enables you to
*literally* press enter to insert a new line in your string, without having to use the `\n` escape sequence, like so:

```txt
`This is my
cool multiline string!

Look at all the new lines!`
```

To insert a backtick in a raw string literal, however, you must use its ASCII code, which is `\x60`. Escape sequences as
in quoted strings are not supported.

## Numbers

Numeric values can be represented in two ways, using integers (whole numbers) and floating-point numbers (numbers with a
decimal point). In the bot's template actions, you can create an integer by simply writing a number, such as `5`. For
floating-point numbers, you can add a decimal point, like so: `5.0`.

### Integers

In the bot's template actions, integers are represented as 64-bit signed integers. This means that you can store numbers
from `-9223372036854775808` to `9223372036854775807`. If you try to store a number outside this range, the bot will
return an error.

There are several ways to define an integer, specifically:

1. As a base-10 number, such as `42`. This will mean what you think, the number forty-two.
2. As a base-16 number, such as `0x2A`. This is the [hexadecimal representation][hex] of the number forty-two.
3. As a base-8 number, such as `052`. This is the [octal representation][oct] of the number forty-two.
4. As a base-2 number, such as `0b101010`. This is the [binary representation][bin] of the number forty-two.

[hex]: https://en.wikipedia.org/wiki/Hexadecimal
[oct]: https://en.wikipedia.org/wiki/Octal
[bin]: https://en.wikipedia.org/wiki/Binary_number

### Floating-Point Numbers

We represent floating-point numbers as 64-bit IEEE-754 floating-point numbers. This means that you can store numbers
with a precision of about 15 decimal places. If you try to store a number with more precision, the bot will round it to
the nearest representable number.

There are a lot of ways to define a floating-point number, but the most common way is to use the decimal point, such as
`3.14`. For a full list of ways to define a floating-point number, you can refer to the
[Go documentation](https://golang.org/ref/spec#Floating-point_literals).

### Imaginary Numbers

Go (the language the bot is written in) also supports imaginary numbers (and by extension complex numbers).

Defining them is quite similar to the formats discussed above, but with the addition of the imaginary unit `i`.
Please refer to the [Go documentation](https://golang.org/ref/spec#Imaginary_literals) for more information.

## Booleans

A boolean is a data type that can only have one of two values: `true` or `false`. Booleans are used to represent the
truth value of an expression. For instance, `5 > 3` would evaluate to `true`, while `5 < 3` would evaluate to `false`.

You can think of it as a light switch: it can either be on (`true`) or off (`false`). Booleans are used in conditional
statements, such as `if` statements, to determine which branch of the code should be executed.

## Variables

All this talk about data and data types is nice, but how do we actually use them in our code and keep them around for
later use? This is where variables come in. A variable is a way to store a value and give it a name. You can then refer
to this value by its name later in your code.

In Custom Commands, you can define a variable by starting with a `$`, its name, and the assignment operator `:=`. Take
the following code snippet, for example:

```go
{{ $name := "Alice" }}
{{ $age := 42 }}
{{ $isCool := true }}

{{ $name }}, aged {{ $age }}, is cool: {{ $isCool }}
```

Later on, we may wish to reassign a new value to a variable. We can do this by using the re-assignment operator `=`.
When and why this becomes necessary will be discussed in a later chapter.

When debugging your code, you might have to figure out the type of a certain variable. You can do this by using the
`printf` function with the `%T` verb, like so:

```go
{{ $name := "Alice" }}
{{ printf "%T" $name }}
```
