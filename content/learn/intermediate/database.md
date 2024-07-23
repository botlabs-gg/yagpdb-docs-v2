+++
title = "Database"
weight = 340
+++

YAGPDB provides a database for use in your CCs. Entries in this database are used to store persistent data that you want
to keep between custom command executions. You access and manipulate these entries with the [database functions][funcs],
which we will elaborate on in this guide.

[funcs]: /docs/reference/templates/functions#database

## Overall

This section covers the structure of a database entry, the database's size limits, as well as the entry's size limit and
lastly the interaction limit per custom command execution.

### Structure of an Entry

A database entry has the following structure:

| Field      | Description                                                |
| ---------- | ---------------------------------------------------------- |
| .ID        | The ID of this entry. Not to be confused with the User ID. |
| .GuildID   | The server ID.                                             |
| .UserID    | ID of the associated user.                                 |
| .User      | The associated user object.                                |
| .CreatedAt | When this entry was created.                               |
| .UpdatedAt | When this entry was last updated.                          |
| .ExpiresAt | When this entry will expire.                               |
| .Key       | The key of this entry.                                     |
| .Value     | The value of this entry.                                   |
| .ValueSize | The size of the value in bytes.                            |

The fields `.CreatedAt`, `.UpdatedAt`, and `.ExpiresAt` all evaluate to a `time.Time` object, so all [methods on `time.Time`](/docs/reference/templates/functions#time) are applicable.

{{< callout context="note" title="Note" icon="outline/info-circle" >}}

The user ID does not have to point to a valid Discord user—it can be any integer. For instance, it is conventional (but
not required) to store server-global data under the user ID `0`, in which case the `UserID` field will be `0` and the
`User` field will be invalid. See also [Global vs. User Entries](#global-vs-user-entries).

{{< /callout >}}

### Size Limitations

All things computers and data have limitations, and the YAGPDB database is no exception. However, we have tried to set
these limits generously (within reason), and we expect most custom commands will never run afoul of them.

**Limit on total entries.** You can have up to `50 * member_count` entries in your server's database. If your server has
premium activated, this limit increases to `500 * member_count`.

For instance, if your server has 75 members and does not have premium, your database entry limit is

```txt
50 * member_count = 50 * 75 = 3750
```

and hence if you exceed 3750 database entries, all functions that create new entries will fail with the error `Above DB
Limit`.

Note that although the entry limit is a function of your server member count, there is no per-user limit. That is, a
single user can have more than 50 entries under their ID as long as the total number of entries in the server remains
under the limit.

---

**Limits on individual entries.** Database entry keys are limited to 256 bytes in length; `dbSet` and `dbSetExpire` will
silently truncate your input key if its length exceeds this limit.

The size of a database entry, as reported by the `ValueSize` field, is limited to 100 kB. (Internally, your data is
serialized with [msgpack](https://msgpack.org/index.html) and the length of the serialized sequence of bytes is what
matters.)

### Interaction Limits

In addition to limiting the size of your server database, we also limit the number of times you interact with the
database within a custom command execution. Specifically, you can only call database functions---those prefixed by `db`
---up to 10 times within a custom command execution. The limit increases to 50 if you have premium active.

Besides the main limit, database functions that act on multiple entries, namely `dbCount`, `dbGetPattern`,
`dbGetPatternReverse`, `dbTopEntries`, and `dbBottomEntries`, also count toward a separate limit. Specifically, these
'multiple interaction' database functions can only be used twice in a custom command execution (10 with premium.)

That concludes the overview, now let's get into basic interactions!

## Basic Interactions

### dbSet

`dbSet` creates or overwrites an entry in the database.

```yag
{{ dbSet user_id key value }}
```

where `user_id` is any integer, `key` is the name of the entry, and `value` is arbitrary.

{{< callout context="caution" title="Warning: Storing IDs" icon="outline/alert-triangle" >}}

Numbers are stored as 64-bit floats internally, which can result in a loss of precision when storing IDs or similarly
large integers. Instead, convert IDs to strings before storing them in database and convert back to integer on
retrieval.

See [Storing IDs](#storing-ids) for more information.

{{< /callout >}}

### dbGet

We know how to create database entries; now, how do we retrieve them?

This is where `dbGet` comes in: as its name suggests, it fetches the database entry with the given user ID and key.
If no such entry exists, it returns `nil`.

```yag
{{ dbGet user_id key }}
```

{{< callout context="note" title="Note" icon="outline/info-circle" >}}

`dbGet` returns the database entry object, not the value. To access the value, read the `Value` field:

```yag
{{ (dbGet user_id key).Value }}
```

{{< /callout >}}

### dbDel

Now we know how to create and fetch entries from the database. But a good program also frees unused storage, and custom
commands are no exception. Use `dbDel` to delete a database entry:

```yag
{{ dbDel user_id key }}
```

## Advanced Interactions

Now, you might want to become a little more special with your database—that's why we have a few more functions,
`dbIncr` and `dbSetExpire`. With these functions, you are able to do more complex things with the database that would
otherwise be quite hard to achieve, or at least not very efficient.

### dbIncr

`dbIncr` increases the value of the entry by the given number and returns the incremented value in the same action,
allowing you to further use the value. Said increment can be any valid number, that is, integers and float. Do note,
however, that the return type of `dbIncr` is always a float, even if you use an integer for the increment argument.

```yag
{{dbIncr <UserID> <Key> <Increment>}}
```

`dbIncr` also conveniently initializes a database entry to the given increment should one with the given UserID and Key
not already exist. Try thinking about how you would implement a custom command that increases a given entry by a set
amount, gets the value, but also sets a new entry if it doesn't already exist.

```yag
{{$db := dbGet .User.ID "someKey"}}
{{$add := add (toFloat $db.Value) $x}}
{{dbSet .User.ID "someKey" (str $add)}}
{{$add}}
```

As you see, using only basic functions essentially requires you to waste a database function call you can probably
better use elsewhere. And as we discussed in the beginning, those are limited at 10 (50 with premium), so quite a
precious resource that should not be wasted.

### dbSetExpire

Now you might want to set entries which get deleted after a while. To do so, you can use `dbSetExpire`.

As we recall from the beginning, database entries have an `.ExpiresAt` field of type `time.Time`. The `dbSetExpire`
function adds a timestamp to this field, telling the bot that we only want to use the DB entry until then.

```yag
{{dbSetExpire <userID> <Key> <Value> <Expires in>}}
```

The `Expires in` is given in seconds.

A common use case for this function is a cooldown: As long as the entry exists, the command is still on cooldown.

```yag
{{ if $db := dbGet 2000 "cooldown" }}
    Command is  on cooldown :(
    Cooldown will be over at {{ $db.ExpiresAt.Format "Mon 02 Jan 15:04:05" }}
    {{ return }}
{{ end }}
{{ dbSetExpire 2000 "cooldown" "true" 60 }}
Command is not on cooldown :)
```

{{< callout context="note" title="Note" icon="outline/info-circle" >}}

As a side effect, expired entries will be considered gone (i.e. deleted) by YAGPDB, but still remain in the underlying
database. You can observe this effect by visiting your [database view page](/docs/custom-commands/database).

{{< /callout >}}

## Multiple Interactions

Lastly there are special functions which allow you to get multiple entries. We coincidentally call those multiple entry
interactions. Every function except one returns a slice of entries. Depending on what function you use, this slice is
sorted by certain criteria.

### dbCount

This is the only function interacting with multiple entries that doesn't return a slice. Since this function is fairly
easy to understand, we'll start with that. As usual, first the syntax:

```yag
{{dbCount <userID>}}
{{/* or */}}
{{dbCount <pattern>}}
{{/* or as query */}}
{{dbCount (sdict "userID" <userID> "pattern" <pattern>)}}
```

dbCount counts the entries either for the given database userID or the pattern for database keys. Alternatively, you can
make it count entries that match both conditions by passing in an `sdict` with the keys `userID` for the ID and `pattern`
for database keys that are to be counted. The function returns the number of entries that match the given criteria.

`pattern` is a basic PostgreSQL pattern, which we explain further down in the [Patterns](#patterns) section.

### dbTopEntries / dbBottomEntries

These functions return a slice of DB entry objects ordered by the value. `dbTopEntries` orders by descending value, and
`dbBottomEntries` by ascending value. Both of these are hard-limited to at most 100 entries (for premium as well), and
this can be limited further with the `amount` argument.

```yag
{{dbTopEntries <pattern> <amount> <nSkip>}}
{{dbBottomEntries <pattern> <amount> <nSkip>}}
```

Let's walk through these arguments one by one. For `pattern`, we use basic PostgreSQL patterns.
The `amount` specifies how many entries we want to retrieve. Lastly, you tell YAGPDB how many entries it should skip
using the `nSkip` argument.

Now, to retrieve the value of each entry, we range over the given slice and access the `.Value` field:

```yag
{{$entries := dbTopEntries "someKey" 10 0}}
{{range $entries}}
    Current Entry Value: {{.Value}}
{{end}}
```

In analogy to the above code example, you can access any other field as well.

### dbGetPattern / dbGetPatternReverse

These two functions allow you to get multiple entries under one user ID with matching keys, again using patterns. They
return a slice of entries sorted by value, just as the above functions. The only difference here is only the limitation
to one `UserID` instead of all `UserID`s.

```yag
{{dbGetPattern <userID> <pattern> <amount> <nSkip>}}
{{/* or */}}
{{dbGetPatternReverse <userID> <pattern> <amount> <nSkip>}}
```

Just as above, we range over the given slice to access fields of the entry object. For simplicity's sake however, no
code example, as it should be pretty clear how to do this.

### dbDelMultiple

This function allows you to delete multiple entries in one go, instead of one at a time with `dbDel`. Its syntax is a
little more intricate than other functions:

```yag
{{dbDelMultiple <query> <amount> <skip>}}
```

`query` is a `sdict` with the following keys:

- `userID`: delete entries under this user ID. If this key is not provided, it'll default to all IDs.
- `pattern`: delete entries with keys matching this pattern.
- `reverse`: if true, start deleting entries with the lowest value first. Defaults to `false`.

`amount` specifies how many entries should be deleted in one go, maxing out at 100. `skip` specifies how many of
matching entries should be skipped. Note that this function also returns the amount of deleted entries, which is likely
most useful assigned to a variable.

With all that in mind, the following example code deletes up to 100 matching entries with `Key`s matching the pattern
`test%` and `UserID` of the current user, finally outputting the number of entries deleted:

```yag
{{$deleted := dbDelMultiple (sdict "userID" .User.ID "pattern" "test%") 100 0}}
Deleted {{$deleted}} entries!
```

### dbRank

This function returns the rank (that is, the position in an ordered list) of a specified entry in the set of entries
matching criteria provided by `query`.

```yag
{{dbRank <query> <userID> <key>}}
```

`query` is as above a `sdict` with the following options:

- `userID`: search only through entries stored under this ID. Will default to all IDs, if not provided.
- `pattern`: only count entries with matching keys; defaults to entries with any key.
- `reverse`: if true, lower valued entries will have a higher (better) rank. Default is `false`.

As an example, to find the rank of the entry with the key `test` for the current user in all of this user's entries, you
may want to use the following code:

```yag
{{$rank := dbRank (sdict "userID" .User.ID) .User.ID "test"}}
The specified entry's rank is {{$rank}}.
```

## Appendix

### Patterns

As mentioned earlier, we use patterns for a set of functions. Obviously, you need to know what they are and how to use
them. The patterns are based on SQL `LIKE` patterns, so if you're familiar with them, you're good to go. If not, don't
worry, they're quite easy to understand.

There's only two special characters you need to know: `%` and `_`. That's right, just those two!
In case you need to use those literally in a pattern, escape them with a backslash (`\%` and `\_`). Their respective
purpose is also quite simple:

- The percent sign `%` matches any sequence of zero or more characters
- The underscore `_` matches any single character

Okay, with that in mind, let's take a look at an example. The following pattern will match anything that starts with
the letter `l` and ends in `n`.

```text
l%n
```

The following example showcases the usage of `_`.

```text
hel_o
```

This pattern matches words such as `hello`, `helgo`, `heloo`.

### Serialization

Saving values with custom types to database may result in their values being _serialized_ to a different type, meaning
that you might have to convert it back to its original type when retrieving. For example, saving the result of a `cembed`
to call to database will result in it becoming a `map[string] interface{}`. The following code will showcase this
behavior:

```yag
{{$embed := cembed "description" "Serialization!"}}
{{printf "Type before storing: %T" $embed}}
{{dbSet .User.ID "serialization_example" $embed}}
{{$embed_retrieved := (dbGet .User.ID "serialization_example").Value}}
{{printf "Type after retrieving, before converting: %T" $embed_retrieved}}
{{printf "Type afer retrieving, after converting: %T" (cembed $embed_retrieved)}}
{{dbDel .User.ID "serialization_example"}}
```

However, most commonly used types will be saved with their type information intact, meaning that there will be no need
to convert them after retrieval. In particular, `sdict`, `dict`, and `cslice` may be saved directly to database and will
retain their original types.

### Storing IDs

You might have noticed that, whenever you're storing a user ID, channel ID, etc. into your database, it will come back
as a weird value, such as `5.241379415938826e+17`. This is because they're saved as floats, hence the bot formatting it
in scientific notation. Even converting back to an integer will not solve this, because of how floats are represented
they will round ID numbers.
To prevent this, simply convert them to a string before storing and converting back to `int` upon retrieving, like so:

```yag
{{ dbSet 2000 "someKey" (str .User.ID) }}
{{ $userID_received := toInt (dbGet 2000 "someKey").Value }}
{{ eq .User.ID $userID_received }}
{{ dbDel 2000 "someKey" }}
```

Try removing `str`, and observe that the IDs no longer match.

### Global vs. User Entries

When you've been using the database for quite a while now, you surely have heard of so-called "global" and "per-user"
entries.

These terms are often used and help get the point across when explaining the _effect_, but when it comes to
understanding the workings behind it, this is not the right way to think about it.

When you do so, you exclude all possible variations and just think "If I have a `0` as the user ID, it's a global db and
if it's `.User.ID`, it becomes a per-user db". You block yourself from creating systems that are case-dependent,
over-complicate things and confuse yourself.

The way to go about this is to think of it in terms of the database entries themselves, and how they're used / going to
be used in your system. As we talk about this further, we do so with the assumption that you have used at least a few
database functions already.

#### Understanding a Database Entry Vaguely

In a map, you have key-value pairs, where each value corresponds to its key. Database entries work similarly, except
each value corresponds to the combination of the `UserID` and key. Basically, two database entries are unique if either
the `UserID` **or** `Key` differ.

Each of the following line corresponds to and returns different database entries, since they don't share the same set of
user ID and key.

```yag
{{ dbGet 20 "apple" }}
{{ dbGet 20 "banana" }}
{{ dbGet 30 "apple" }}
```

#### What do These Terms Mean?

Having understood DB entries, we can now define these terms in a better way:

- **Global Entries**: If everyone/everything refers to the same database entry, we conventionally call it a global entry.
- **User/Channel-specific entries**: If different users/channels refer to different entries based on any set conditions,
  we call them per-user entries, or similar terms.

Before you write your code, you need to decide how your command will use the CC database and then take action
accordingly.

Need a different database entry in each channel that is independent of the user? Use `dbSet channelID "key" value`.

Need different database entries in separate channels that are dependent on the user?
Use `dbSet .User.ID "channelID" value` or `dbSet channelID (str .User.ID) value` depending on what kind of data you're
expecting to get from `dbTopEntries`, or just any other custom command.

It's all about playing with the `userID` and `key` to get what you need. This should hopefully give you a little better
idea and push you to think in the right direction.
