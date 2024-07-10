+++
title = "Inputs 1"
weight = 240
+++

When we were starting to write Custom Commands, we stuck to a somewhat static custom command---one that doesn't take
any arguments and has a fixed output. This is a good starting point, but it's not very useful in practice. In this
chapter, we'll learn how to create custom commands that take inputs.

## Parsing Arguments

Because parsing arguments is no easy task, we provide a convenience function, `parseArgs`, to parse the arguments passed
to a custom command. For simple commands, this is the recommended way. In a later chapter, we will explore a more
hands-on approach to parsing arguments.

### Defining Arguments

The first step is to define the arguments that the command will take. This is done using the aforementioned `parseArgs`
function. The syntax is as follows:

```go
{{ $args := parseArgs required_args error_message ...cargs }}
```

The first argument `required_args` is the number of required arguments.

After that, we can provide a custom error message that will be displayed if the arguments are not valid. Passing an
empty string `""` will generate one based on the argument definitions. This is useful for providing more context to
the user about what went wrong.

The `...carg` is a variadic argument, that is, it can take any number of arguments.
Each `carg` is a single argument definition. The `carg` function has the following syntax:

```go
{{ carg <"type"> <"description"> }}
```

Following types are supported:

- `int` (whole number)
- `float` (decimal number)
- `string` (text)
- `user` (user mentions, resolves to the [user](https://docs.yagpdb.xyz/reference/templates#user) structure)
- `userid` (mentions or user IDs, resolves to the ID itself)
- `member` (mentions or user IDs, resolves to the [member](https://docs.yagpdb.xyz/reference/templates#member)
 structure)
- `channel` (channel mention or ID, resolves to the channel structure)
- `role` (role name or ID, resolves as type _\*discordgo.Role_)
- `duration` (duration that is human-readable, i.e `10h5m` or `10 hour 5 minutes` would both resolve to the same
   duration)

The `description` is a human-readable description of the argument. This is used in the error message if the argument is
not valid.

Combining all of this, let's create a custom command that takes two arguments: a coolness level and a user that is part
of the server to apply said level to.

```go
{{ $args := parseArgs 2 "" (carg "int" "coolness level") (carg "member" "target member") }}
```

### Accessing Arguments

Currently, our code doesn't do anything with the arguments. To access the arguments, we use the `.Get` method on the
`$args` variable. The syntax is as follows:

```go
{{ $args.Get <index> }}
```

The `index` is the position of the argument, starting from 0. The arguments are stored in the order they are defined in
the `parseArgs` function call. Let us now modify our custom command to access these arguments:

```go
{{ $args := parseArgs 2 "" (carg "int" "coolness level") (carg "member" "target member") }}

coolness: {{ $args.Get 0 }}
member: {{ ($args.Get 1).Nick }}
```

### Validating Arguments

#### Specifying Valid Ranges

Now, we want to limit the coolness level to a number between 0 and 100. We can do this by adding a simple check:

```go
{{ $args := parseArgs 2 "" (carg "int" "coolness level") (carg "member" "target member") }}

{{ if or (gt ($args.Get 0) 100) (lt ($args.Get 0) 0) }}
Invalid coolness level. Must be between 0 and 100.
  {{ return }}
{{ end }}

coolness: {{ $args.Get 0 }}
member: {{ ($args.Get 1).Nick }}
```

There is one major thing to note about this code: we're starting to repeat a lot of our `$args.Get N` calls! Let's fix
that first.

```go
{{ $args := parseArgs 2 "" (carg "int" "coolness level") (carg "member" "target member") }}

{{ $coolness := $args.Get 0 }}
{{ $member := $args.Get 1 }}

{{ if or (gt $coolness 100) (lt $coolness 0) }}
  Invalid coolness level. Must be between 0 and 100.
  {{ return }}
{{ end }}

coolness: {{ $coolness }}
member: {{ $member.Nick }}
```

Now, we can make use of another great feature of `parseArgs`: Certain types support additional arguments that can be
used to validate the input. For example, the `int` type supports two additional arguments that can be used to specify a
range of valid values, such that the bot will do the validation for us.

```go
{{ $args := parseArgs 2 "" (carg "int" "coolness level" 0 100) (carg "member" "target member") }}

{{ $coolness := $args.Get 0 }}
{{ $member := $args.Get 1 }}

coolness: {{ $coolness }}
member: {{  $member.Nick }}
```

Following types support these validation ranges:

- `int`
- `float`
- `duration` (in seconds)

Make sure to use these instead of manually verifying a valid range, if possible, as it makes your code cleaner and
easier to read.

#### Testing For Optional Arguments

If you have optional arguments, you can check if they were provided by using the `.IsSet` method on the `$args`
variable. The syntax is as follows:

```go
{{ $args.IsSet <index> }}
```

Let us modify our custom command to introduce a third optional argument, a message to send to the user.

```go
{{ $args := parseArgs 2 "" (carg "int" "coolness level" 0 100) (carg "member" "target member")
    (carg "string" "message") }}

{{ $coolness := $args.Get 0 }}
{{ $member := $args.Get 1 }}

coolness: {{ $coolness }}
member: {{  $member.Nick }}
{{ if $args.IsSet 2 -}}
message: {{ $args.Get 2 }}
{{ end }}
```

Try it out and see how we only print `message:` and the message if it was provided.
