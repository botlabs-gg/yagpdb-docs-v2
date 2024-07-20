+++
title = "Custom Command Database"
weight = 340
+++

Databases are used for storing persistent data that you want to keep between custom command executions. You access and
manipulate them with functions which we are going to elaborate on in this guide.

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
| .CreatedAt | When this entry was firstly created.                       |
| .UpdatedAt | When this entry was lastly updated.                        |
| .ExpiresAt | When this entry will expire.                               |
| .Key       | The key of this entry.                                     |
| .Value     | The value of this entry.                                   |


It is to note that the user ID doesn't actually have to point to a valid user - it can be any integer. If you,
for example, used `2000` as ID, this will be `.UserID`. If you used a non-user ID, the `.User` object will be invalid.

The fields `.CreatedAt`, `.UpdatedAt`, and `.ExpiresAt` all evaluate to the `time.Time` structure and can therefore be
used with [`time.Time` related methods](/docs/reference/templates/functions#time).

### Size Limitations

As everything that has to do with computers and data, there are limitations. Our YAGPDB database is no exception.
However, we tried to make them as large as possible, whilst still remaining somewhat conservative and not going
completely overboard.

In general, you can have `50 * Members` values (entries) in your server's database. If your server has premium activated,
this increases to `500 * Members`. Note that this will not immediately change as this value is cached, should your
members leave or newly join. If you go above your maximum entries, all new write functions will fail.

Please note though that this is not 50 (or 500 with premium) entries _per user_, but rather for everything.
This of course means that one user could take up every entry there is.
Refer to [Global vs. User Entries](#global-vs-user-entries) for more information.

Database keys are strings and are limited to 256 bytes in length (aka 256 characters). If used with `dbSet` or
`dbSetExpire`, the key argument will be internally converted to a string, so you can actually pass whatever you want.

Lastly, each value can hold up to 100 kB, which is, considering we only deal with characters (mostly), a lot.
Try writing a `.txt` document that is 100 kB large, then you know how much this seemingly small space can actually hold.

### Interaction Limits

To prevent spam and therefore possible lag across YAGPDB, we put interaction limits in place. First of all, you can't
use more than 10 overall interactions, so every function that starts with `db` counts towards that limit. This limit
increases to 50 if you have premium active. Moreover, there are so-called multiple interactions, namely `dbCount`,
`dbGetPattern`, `dbGetPatternReverse`, `dbTopEntries`, and `dbBottomEntries`. These are limited at two total calls per
custom command execution, 10 with premium. You don't have to understand how they work right now, we'll get later into
that. Just keep in mind that they are counting towards a second limit.

That concludes the overview, now let's get into basic interactions!

## Basic Interactions

These interactions are your constant companion when dealing with the database. You are most likely to use them more
often that the upcoming functions, so really get them into your muscle memory, then the rest will be super easy!

### dbSet

To start, let's take a look at the syntax:

```go
{{dbSet <UserID> <Key> <Value>}}
```

We've already covered `UserID` and `Key` further up. As a small refresher: `UserID` can be any integer, and `Key` is a
string, the name of the entry so to say. The `Value` can be anything that can also be stored in a variable, so strings,
integers, floats, slices, and maps.

### dbGet

Okay, we can now set a value into the database, but that's fairly useless if we cannot get it back.
Well, this is where `dbGet` comes in. As its name already suggests, it gets an entry (not the value!) from the database
with the given Key and ID.

```go
{{dbGet <UserID> <Key>}}
```

As you can see, we don't have a value as above, just simply `ID` and `Key`. The call of this function returns an entry
object, as described above. So, before you continue reading, take a moment to think about how to get the value.

### dbDel

Now we know how to set and get stuff with the database, but a good program also frees up unused memory, and custom
commands are no exemption to that. These cases are where we use `dbDel`.

```go
{{dbDel <UserID> <Key>}}
```

## Advanced Interactions

Now, you might want to become a little more special with your database---That's why we have a few more functions,
`dbIncr` and `dbSetExpire`. With these functions, you are able to do more complex things with the database that would
otherwise be quite hard to achieve, or at least not very efficient.

### dbIncr

`dbIncr` is quite a handy function, as it increases the value inside the entry by the given increment and returns the
increased value in the same moment, allowing you to save it to a variable. Said increment can be any valid number, so
integers and floats. Do note, however, that the return type of `dbIncr` is always a float. So if you are using integers
as increment and plan to use them as such, please don't forget to convert them. Now let us take a quick look at the
syntax.

```go
{{dbIncr <UserID> <Key> <Increment>}}
```

What's also noteworthy is the fact that `dbIncr` sets the value to the given increment, shouldn't the entry exist
already. Try thinking about how you would implement a custom command that increases a given entry by a set amount, gets
the value, but also sets a new entry if it doesn't already exist.

```go
{{$db := dbGet .User.ID "someKey"}}
{{$add := add (toFloat $db.Value) $x}}
{{dbSet .User.ID "someKey" (str $add)}}
{{$add}}
```

As you see, using only basic functions essentially requires you to waste a database function call you can probably
better use elsewhere. And as we discussed in the beginning, those are limited at 10 (50 with premium), so quite a
precious resource that should not be wasted.

### dbSetExpire

Now you might want to set entries which get deleted after a while. You could of course use a delay using `execCC`, or
instead just use `dbSetExpire`.

Why should we use `dbSetExpire`, though? You don't have to waste an `execCC` to delete the entry afterwards.
As we recall from the beginning, the `.ExpiresAt` field is of type `time.Time`, so the related functions are
available to us. Let's take a glimpse at the syntax:

```go
{{dbSetExpire <userID> <Key> <Value> <Expires in>}}
```

The `Expires in` is given in seconds, the rest is standard stuff as explained under
[Basic Interactions](#basic-interactions).

A common use case for this function is a cooldown: As long as the entry exists, the command is still on cooldown.

```go
{{if $db := (dbGet 2000 "cooldown")}}
    Command is on cooldown :(
    Cooldown will be over at {{$db.ExpiresAt.Format "Mon 02 Jan 15:04:05"}}
{{else}}
    Command is not on cooldown :)
    {{dbSetExpire 2000 "cooldown" "random value" 60}}
{{end}}
```

As a side effect, expired entries will be considered gone (i.e. deleted) by YAGPDB, but still remain in the underlying
database.

## Multiple Interactions

Lastly there are special functions which allow you to get multiple entries. We call those coincidentally multiple entry
interactions. Every function except one returns a slice of entries. Depending on what function you use, this slice is
sorted by certain criteria.

### dbCount

This is the only function interacting with multiple entries not returning a slice. Since this function is fairly easy to
understand, we'll start with that. Let's take a quick look at the syntax:

```go
{{dbCount <userID>}}
{{/* or */}}
{{dbCount <pattern>}}
{{/* or as query */}}
{{dbCount (sdict "userID" <userID> "pattern" <pattern>)}}
```

dbCount counts the entries either for the given database userID or the pattern for database keys. Alternatively, you can
make it count entries as one query by passing in an `sdict` with the keys `userID` for the ID and `pattern` for database
keys that are to be counted.

Please note that this function returns the amount of entries, so to avoid random spam, you'd have to store it into a
variable. Apart from that, this function is very simple to use and might come in handy for a few things.

### dbTopEntries / dbBottomEntries

These functions return a slice of entry objects, in case of `dbTopEntries` ordered by descending value, in case of
`dbBottomEntries` in ascending order. You cannot retrieve more than 100 elements in one call - honestly though, 100
entries in one go is definitely a lot, probably more you would have to actually deal with.

```go
{{dbTopEntries <pattern> <amount> <nSkip>}}
{{dbBottomEntries <pattern> <amount> <nSkip>}}
```

What's new here are three things: `pattern`, `amount`, and `nSkip.` Let's walk through them one by one. For `pattern`,
we use basic PostgreSQL patterns, you can read on them further down. The `amount` specifies how many entries we want to
retrieve. Lastly, you tell YAGPDB how many entries it should skip using the `nSkip` argument.

Now, to retrieve the value of each entry, we range over the given slice and access the `.Value` field:

```go
{{$entries := dbTopEntries "someKey" 10 0}}
{{range $entries}}
    Current Entry Value: {{.Value}}
{{end}}
```

In analogy to the above code example, you can access any other field as well.

### dbGetPattern / dbGetPatternReverse

These two functions allow you to get multiple entries under one user ID with matching keys, again using patterns. They
return a slice of entries sorted by value, just as the above functions. The only difference here is only the limitation
to one user or ID instead of all IDs.

```go
{{dbGetPattern <userID> <pattern> <amount> <nSkip>}}
{{/* or */}}
{{dbGetPatternReverse <userID> <pattern> <amount> <nSkip>}}
```

Just as above, we range over the given slice to access fields of the entry object. For simplicity's sake however, no
code example, as it should be pretty clear how to do this.

### dbDelMultiple

This function allows you to delete multiple entries in one go, making `dbDel` spam no longer necessary. Its syntax is a
little more intricate than other functions:

```go
{{dbDelMultiple <query> <amount> <skip>}}
```

`query` is a `sdict` with the following keys:

- `userID`: delete entries under this user ID. If this key is not provided, it'll default to all IDs.
- `pattern`: delete entries with keys matching this pattern.
- `reverse`:if true, start deleting entries with the lowest value first. Defaults to `false`.

`amount` specifies how many entries should be deleted in one go, maxing out at 100. `skip` specifies how many of
matching entries should be skipped. Note that this function returns the amount of deleted entries, so to avoid random
messages popping up, catch it by assigning it to a variable.

With all that in mind, you could use the following code to delete up to 100 matching entries the pattern `test%` under
the current user:

```go
{{$deleted := dbDelMultiple (sdict "userID" .User.ID "pattern" "test%") 100 0}}
Deleted {{$deleted}} entries!
```

### dbRank

This function returns the rank of a specified entry in the set of entries matching criteria provided by `query`.

```go
{{dbRank <query> <userID> <key>}}
```

`query` is as above a `sdict` with the following options:

- `userID`: search only through entries stored under this ID. Will default to all IDs, if not provided.
- `pattern`: only count entries with matching keys; defaults to entries with any key.
- `reverse`: if true, lower valued entries will have a higher (better) rank. Default is `false`.

As an example, to find the rank of the entry with the key `test` for the current user in all of this user's entries, you
may want to use the following code:

```go
{{$rank := dbRank (sdict "userID" .User.ID) .User.ID "test"}}
The specified entry's rank is {{$rank}}.
```

Note that this function **returns** the rank, so to avoid random spam, don't forget to assign it to a variable.

## Appendix

### Patterns

As mentioned earlier, we use patterns for a set of functions. Obviously, you need to know what they are and how to use
them. The patterns are based on PostgreSQL patterns, so if you're familiar with them, you're good to go. If not, don't
worry, they're quite easy to understand.

There's only two special characters you need to know: `%` and `_`. More are not used, just those two.
In case you need to escape those, prepend them with a backslash `\`. Their respective purpose is also quite simple:

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
to call to database will result in it becoming a `map[string] interface{}`.  The following code will showcase this
behavior:

```go
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
as a weird value, such as `5.241379415938826e+17`. This is because they're saved as floats, hence it being messed up.
To prevent this, simply convert them to a string before storing and converting back to `int` upon retrieving, like so:

```go
{{dbSet 2000 "someKey" (str .User.ID)}}
{{$userID_received := toInt (dbGet 2000 "someKey").Value}}
{{dbDel 2000 "someKey"}}
```

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
each value corresponds to the combination of the `userID` and key. Basically, two database entries are identical
(rather, the same) when they both have the same `userID` and key.

Each of the following line corresponds to and returns different database entries, since they don't share the same set of
user ID and key.

```go
{{ dbGet 20 "apple" }}
{{ dbGet 20 "banana" }}
{{ dbGet 30 "apple" }}
```

#### What do These Terms Mean?

Having understood DB entries, we can now define these terms in a better way:

- **Global Entries**: If everyone/everything refers to the same database entry, we conventionally call it a global entry.
- **User/Channel-specific entries**: If different users/channels refer to different entries based on any set conditions,
we call them per-user entries, or similar terms.

Before you write your code, you need to decide how your command will use databases and then take action accordingly.

Need a different database entry in each channel that is independent of the user? Use `dbSet channelID "key" value`.

Need different database entries in separate channels that are dependent on the user?
Use `dbSet .User.ID "channelID" value` or `dbSet channelID (str .User.ID) value` depending on what kind of data you're
expecting to get from `dbTopEntries`, or just any other custom command.

It's all about playing with the `userID` and `key` to get what you need. This should hopefully give you a little better
idea and push you to think in the right direction.
