---
description: Learn how range and with actions work.
---

# Control Flow 2

You've got to this point so far, and you've learned many, if not all, of the basic things you need for a YAGPDB Custom Command.

In Control Flow 2, you will learn two very useful ways which can help optimize your code - make it shorter, while doing the same thing, in addition to allowing you to do things that you couldn't have done before. How do we do this?

The Range Action\
\
The `range` action is defined like the following:
-------------------------------------------------

{% hint style="info" %}
If you've worked with other programming languages in the past, you can think of `range` as a `for` loop.
{% endhint %}

```go
{{/* Iterating over values */}}
{{ range pipeline }}
    {{/* Action executed with each value of this pipeline */}}
{{ else }} {{/* Note that this is optional, you can skip to the end clause */}}
    {{/* Action executed when the length of the pipeline is 0 */}}
{{ end }}

{{/* Iterating over key-value pairs */}}
{{ range $key, $value := pipeline }}
    {{/* $key and $value can be any variable */ }}
    {{/* Here, $key is the key (for maps / sdicts/ dicts) and the index, */}} 
    {{/* starting from 0 for arrays / slices. $value will be the corresponding */}}
    {{/* value. */}}
{{ else }} {{/* Optional */}}
    {{/* Action executed when length of pipeline is 0. */}}
{{ end }}
```

There's a lot of lingo here that might be new for you. `pipeline` is either an slice (a _cslice_ or normal _slice_) or map (a \_dict \_or _sdict_). We also refer to maps as key-value pairs, as that is what they are (keys corresponding to values). `Iterating` is a fancy word for "looping over", or doing an action for every element in the pipeline.

This really isn't the most useful example, so let's jump right in with a practical example of when you might use `range`.

## How do we manage roles in YAGPDB CC? Introducing the role functions:

Before starting off with these examples, let's introduce some functions that we'll be using throughout our examples.

{% hint style="info" %}
**Info:** Remember that IDs should always be of type _int64_, and should not be quoted: `addRoleID "123456789"` is incorrect and a bad practice (even though it works, as YAGPDB handles the string in this particular example). The correct way would be `addRoleID 123456789`. What is this `addRoleID` function we see here? Look no further...
{% endhint %}

### Removing and adding roles

#### `addRoleID <role id>`

Perhaps the most commonly used role function is `addRoleID`. It's very simple - it adds a role to the user who triggered the command, by ID.

#### `giveRoleName <user id> <role name>` and `giveRoleID <user id> <role id>`

Sometimes, you will want to give roles to people other than the user who triggered the command - `giveRoleName` and `giveRoleID` are how you'd do it. It gives the user provided the role ID provided (or role name, for `giveRoleName`. Very simple.

The counterpart of these functions are the functions which _remove_, rather than _add_ roles.

#### `removeRoleID <role id> (optional delay)`

This role function removes a given role from the user who triggered the command, using the ID of the role. You can also supply an optional delay in seconds.

#### `takeRoleName <user id> <role name> (optional delay)` and `takeRoleID <user id> <role id> (optional delay)`

These two functions remove roles from a given user ID, using the role name and ID respectively. Optional delay is also available for these functions, which are in seconds as well.

### Checking whether a user has a role

Sometimes, you may wish to do actions based on whether a user has or does not have a given role. How do we do this?

{% hint style="info" %}
**Note:** All the functions below return a _bool_, that is, true or false. This means that if you wanted to check whether a user _does not_ have a role, you can simply negate the Boolean using the `not` operator - i.e `not (hasRoleID 123456789).`
{% endhint %}

#### `hasRoleID <role id>` and `hasRoleName <role name>`

This particular function checks whether the triggering user has the role of the provided ID or name.

#### `targetHasRoleID <user id> <role id>` and `targetHasRoleName <user id> <role name>`

These two functions check whether a given user has the role ID or name provided.

Alright, now that we've learnt the role functions, let's begin on our journey of learning range!

## Adding multiple roles to users with the join message

It's likely a problem many of us have dealt with when we started our servers. You might have first started to look at Autorole to help. Unfortunately, it only supports giving one role. You might have ended there, but you may also have looked to join message, and the `addRoleID` template (or a similar template).

{% hint style="success" %}
**Pro Tip:** A simpler way of adding multiple roles to a user on join is using AutomoderatorV2 and an "On member joined" trigger with "give role" effect, but for educational purposes, this example will use join message.
{% endhint %}

Your final code in join message might have ended up looking a little bit like this (where x, y, z, a, b, and c are placeholders for IDs).

```go
{{ addRoleID x }}
{{ addRoleID y }}
{{ addRoleID z }}
{{ addRoleID a }}
{{ addRoleID b }}
{{ addRoleID c }}
// And so on
```

Some might have stopped here (I sure did when I did this the first time). But as you add more and more role IDs, it becomes harder and harder to maintain this code. How do we fix this?

### Range Use Case 1: Reducing repetitive code

The first, and arguably the simplest use of `range` is to reduce repetitive code. Given a template or function which is executed multiple times (in our case, `addRoleID` ) with varying arguments, we can put these arguments into a cslice and then loop over it with range, calling the function each iteration. We'll explain the abstract part of this later, but here's the simplified code for the above:

```go
{{ $ids := cslice x y z a b c }}
{{ range $ids }}
    {{- addRoleID . -}}
{{- end }}
```

Let's go through our code step-by-step, as this may read like gibberish to you at first - _What's that . doing there? What the heck are those hyphens after \{{ doing??_

1. `{{ $ids := cslice x y z a b c }}`: We construct a slice of role IDs. Very straightforward.\\
2. `{{ range $ids }}`: Here is where the fun really starts. The `range $ids` part declares the range statement itself. We declare it with the `range pipeline` syntax rather than `range $key, $value := pipeline` syntax as in this specific case we do not need the index of the slice we are iterating over.\\
3.  `{{- addRoleID . -}}` Let's start with the `{{-` rather than just `{{`: **White space is rendered as output in a range action,** meaning that if you have newlines or indents and are ranging over a large enough set of data, you may find that you're getting a "Response exceeded 2K characters" error for apparently no reason. For this reason, we strip the whitespace in both directions in every iteration, instead of at just the start and end. You will need to add this (`{{-` and `-}}`) for every line in your `range` action. Note that if you have multiple lines in your range action, `-}}` only needs to be added for the last line in the range action, and the ones before it can stay as `}}`. Note that if you nest your range actions, you will need to strip that as well.\
    \
    In this specific case, we do not necessarily need these as there 1) is not enough data for it to hit a 2K character error and 2) we send no text afterwards, so newlines would not be an issue. However, it's good practice and prevents some frustration when you see that strange "Response exceeded 2K characters" error without apparent cause.\\

    Lastly, the `addRoleID` function itself. We see the `addRoleID` function, but we also see this `.`. Normally, the dot refers to all the data available in CCs: for example, `.Guild`. However, when in a `range` or `with` action (covered later in this section) the dot is changed to the **current iteration value**. In this case, `.` would be either x, y, z, a, b or c, as those are the values of the slice `$ids`.\\
4. Lastly, we have this `{{- end }}`. The `end` action closes off the range action, and the `{{-` strips all white space to the left (read above for why this is necessary).

That wasn't too hard, was it? Let's now go to a common mistake that users make when working with range.

### Let's go deeper

Maybe you don't want to have to add role IDs every time you want to add an autorole - instead, let's say you want to use role names. How do we do this? The code is very similar to last time - but due to a limitation (`addRoleName` is not an available template, as of the time of writing) we have to use `giveRoleName`. This distinction is _very important_ because we have to use the user ID - you'll understand why later.

Alright, let's try this. First attempt:

{% hint style="danger" %}
The following code is **intentionally** left broken. Try to find out where we went wrong.
{% endhint %}

```go
{{ $rolenames := cslice "x" "y" "z" "a" "b" "c" "d"}}
{{ range $rolenames }}
    {{- giveRoleName .User.ID . -}}
{{- end }}
```

Try to see why the above code is broken.

Alright. If you were paying close attention to our line-by-line analysis of the last code provided, you would see that `.` is changed to the current iteration value in the range action. This means that in the above code, `.` is either x, y, z, a, b, c, or d. This means that it is a \_string. \_Strings do not have a user property, meaning that this will error. But how will we access the user ID?

**Method 1: Defining values outside of range**\
The first, and most obvious approach is to define the user ID outside of the range action, where it will not be affected. For example:

```go
{{ $rolenames := cslice "x" "y" "z" "a" "b" "c" "d" }}
{{ $user := .User.ID }}
{{ range $rolenames }}
    {{- giveRoleName $user . -}}
{{- end }}
```

This works fine, and it's short and simple. But there's an even better way of doing this.

**Method 2: Using $. instead of .**\
Let's just look at the resulting code first, and we'll explain how exactly it works after.

```go
{{ $rolenames := cslice "x" "y" "z" "a" "b" "c" "d"}}
{{ range $rolenames }}
    {{- giveRoleName $.User.ID . -}}
{{- end }}
```

What's this Narutp magic doing here?! Actually, it turns out that this is nothing magical. The variable `$` is always set to the starting value in a template (or CC). This means that it has all the properties like `$.User` (which is the exact same as `.User`). This is a nifty trick when working with `range`, and as we will see, `with`.

{% hint style="warning" %}
Remember that `$` is a variable (which you can write to). This means that if you added `{{ $ := "hello world!" }}` in the above code, $ would no longer have the properties `User` and all the other properties on `.`
{% endhint %}

{% hint style="success" %}
What if, instead of running _similar_ code, you want to instead run the same action multiple times? This is where `seq` comes in. `seq` has the syntax `seq start end` where `start < end`. It generates a sequence which can be expressed as`[start, end)`. If you're not familiar with this notation, it simply means that `start` is included while `end` is not. For example - `seq 0 5` produces `[0, 1, 2, 3, 4]`.

Enough talk - let's get into an example.

```go
{{ range seq 0 5 }}
    {{- /* The dot is set to the current element of the slice generated */}}
    {{- print . ": Hello world\n" -}}
{{ end }}

{{/* This prints: */}}

{{/* > 0: Hello world */}}
{{/* > 1: Hello world */}}
{{/* > 2: Hello world */}}
{{/* > 3: Hello world */}}
{{/* > 4: Hello world */}}
```

Without `range`, our code would have looked like this:

```go
0. Hello world
1. Hello world
2. Hello world
3. Hello world
4. Hello world
```

This doesn't seem too bad, right? But imagine you want 100 "Hello world"s instead of just 5, and then what if you want to change the message? With the first one, you simply change one line, while in the second you need to change 100.
{% endhint %}

### Range Use Two: Putting the output of range into a variable

Let's say you have a _slice_ of fictional users, like this.

```go
{{ $data := cslice
    (sdict "name" "Bob" "age" 15)
    (sdict "name" "Joe" "age" 16)
    (sdict "name" "Bobby Joe" "age" 17)
}}
```

How would we loop over these users to produce an embed output like this?

![](../.gitbook/assets/CF2-1.png)

The first hint is the sentence itself - _loop over_. We should use `range` - but how? Try it yourself, and if you can't do it, feel free to come back.

What this involves is putting the output of `range` into a variable, however, the method of doing so might not be the most obvious at first. Let's take a look:

```go
{{ $data := cslice
    (sdict "name" "Bob" "age" 15)
    (sdict "name" "Joe" "age" 16)
    (sdict "name" "Bobby Joe" "age" 17)
}}
{{ $var := "" }}
{{ range $data }}
    {{- $var = joinStr "" $var "\n" "**" .name ":** " .age " years old" -}}
{{- end }}
{{ sendMessage nil (cembed "description" $var) }}
```

Essentially, what we are doing is writing to a variable and joining it every iteration with `joinStr`. Note the use of `=` rather than `:=` (refer to [Control Flow 1](https://learn.yagpdb.xyz/beginner/control\_flow\_1#blocks-and-scope) for why we do this).

## Bonus: The With Operator

If you've seen some other YAGPDB CCs, chances are that you've wandered upon the `with` operator. What is it? What does it do? That's what this bonus chapter will cover.

`with` is an action, just like `if`. It checks whether the pipeline provided is true, if so, it continues - but with one difference. It changes the value of the `.` inside the `with` action to the pipeline provided to `with`. Look at this example for more details:

```go
{{ with 1 }}
    {{ . }} {{/* 1 */}}
    {{ .User }} {{/* Errors, as . is 1, and does not have User property */}}
    {{ $.User }} {{/* This works fine */}}
{{ end }}
```

{% hint style="info" %}
`else if` cannot be used with the `with` action, only `else`. In the optional `else` clause, the dot is left unaffected. See below:
{% endhint %}

```go
{{ with false }} {{/* false is not truthy, so the following is not run */}}
    {{ . }} {{/* This is not ran */
{{ else }}
    {{ .User }} {{/* Works fine, as . is not affected here. Prints out your user tag */}}
{{ end }}
```

### When should we use `with`?

Be extremely careful to not overuse `with`. It is a tool to help shorten your code in some cases, but it does not help readability for others who might not know what `with` is. Avoid it unless you know exactly what it does. For example, let's show two cases where `with` is used:

**Bad use case:**

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

The flow here is a little hard to follow, as `.` is used extensively and it's not too clear what it is at first glance (there are two `with` actions, nested within each other). A better way to write this code would be to write it normally with `if`, as `with` does not provide any tangible advantage here.

**Good use case:**

```go
{{ if .StrippedMsg }}
    {{ $user := 0 }} {{ $chan := "" }}
    {{ with reFindAllSubmatches `<@!?(\d+)> <#(\d+)>` .StrippedMsg }}
        {{ $user = toInt64 (index . 0 1) }}
        {{ $chan = toInt64 (index . 0 2) }}
    {{ end }}
{{ end }}
```

Note that here we do not use `with` for the first statement, rather, it is only used for the `reFindAllSubmatches` call. This is a much better use case, because if we simply used `if`, we would have to repeat that line of code. With `with`, in this case, we shorten our code, save function calls, and keep readability.

{% hint style="success" %}
\*\*Pro Tip: \*\*Did you know that `index` can be called with more than 2 arguments? `index X 0 1` is equivalent to calling `index (index X 0) 1` and so on. This works well with `reFindAllSubmatches`, as it returns a 2D slice of matches rather than a normal slice.
{% endhint %}
