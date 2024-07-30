+++
title = 'Functions'
weight = 912
+++

Functions are used to take action within template scripts. Some functions accept arguments, and some functions return
values you can send in your response or use as arguments for other functions.

<!--more-->

## Channel

These functions relate to channels and threads.

{{< callout context="tip" title="Tip: Current Channel or Thread" icon="outline/rocket" >}}

Unless specified otherwise, these functions accept an ID, name, or `nil` for their thread or channel argument.

{{< /callout >}}

### addThreadMember

```yag
{{ addThreadMember <thread> <member> }}
```

Adds a member to an existing thread. Does nothing if either argument is invalid.

### createForumPost

```yag
{{ $post := createForumPost <channel> <name> <content> [values] }}
```

Creates a new forum post. Returns a channel object on success.

- `channel`: the forum channel to post to.
- `name`: The post title. May not be empty. Must be a string.
- `content`: the initial message's content; may be a string, an embed, or a complex message. May not be empty.
- `values` (optional): Additional options for the post. May include:
  - `"slowmode"`: The thread's slowmode in seconds.
  - `"tags"`: One or more forum tag name or ID. Duplicate and invalid tags are ignored.


### createThread

```yag
{{ $thread := createThread <channel> <messageID> <name> [private] [auto_archive_duration] [invitable] }}
```

Creates a new thread in the specified channel. Returns a channel object on success.

- `channel`: the parent channel to create the thread in.
- `message`: either `nil` to create a channel thread, or a message ID to create a message thread.
- `private`: whether the thread is private. Default `false`.
- `auto_archive_duration`: how long the thread will show in the channel list after inactivity.<br>
   Valid values are 60, 1440, 4320, and 10080 minutes. Defaults to 10080 (7 days).
- `invitable`: whether non-moderators can add other members to the thread. (true/false)

Note: There is no functional difference between a channel thread and a message thread.

Because the optional arguments are positional, you must provide the preceding ones if you wish to override a later
option. Consider the following example to create a public thread in the current channel with no message reference that
is archived after an hour and allows non-moderators to add others:

```yag
{{ createThread nil nil "new thread" false 60 true }}
```

### deleteForumPost

```yag
{{ deleteForumPost <post> }}
```

Deletes the given forum post.

This function is functionally the same to [deleteThread](#deletethread).
Use whichever function is semantically more meaningful in the context of your custom command.

### deleteThread

```yag
{{ deleteThread <thread> }}
```

Deletes the given thread.

This function is functionally the same to [deleteForumPost](#deleteforumpost).
Use whichever function is semantically more meaningful in the context of your custom command.

### editChannelName

```yag
{{ editChannelName <channel> <newName> }}
```

Edits the name of the given channel.

- `newName`: the new name for the channel. Must be a string.

This function is, together with [editChannelTopic](#editchanneltopic), limited to 10 calls per custom command execution.
In addition to this, Discord limits the number of channel modifications to 2 per 10 minutes.

### editChannelTopic

```yag
{{ editChannelTopic <channel> <newTopic> }}
```

Edits the topic of the given channel.

- `newTopic`: the channel's new topic. Must be a string. Discord markdown is supported.

This function is, together with [editChannelName](#editchannelname), limited to 10 calls per custom command execution.
In addition to this, Discord limits the number of channel modifications to 2 per 10 minutes.

### getChannelOrThread

```yag
{{ $channel := getChannelOrThread <channel> }}
```

Returns the full channel or thread object for the given channel.

### getChannelPins

```yag
{{ $pins := getChannelPins <channel> }}
```

Returns a slice of message objects pinned to the given channel or thread.

Rate-limited to 2 (premium: 4) calls per custom command execution.

### getChannel

```yag
{{ $channel := getChannel <channel> }}
```

Returns the full channel object for the given channel. Will not work for threads.

### getPinCount

```yag
{{ $numPins := getPinCount <channel> }}
```

Returns the number of pinned messages in given channel.

### getThread

```yag
{{ $thread := getThread <thread> }}
```

Returns the full thread object for the given thread. Will not work for channels.

### removeThreadMember

```yag
{{ removeThreadMember <thread> <member> }}
```

Removes the given member from the given thread.

## Database

These functions help you interact with the [custom command database](/learn/intermediate/database).

### dbBottomEntries

```yag
{{ $entries := dbBottomEntries <pattern> <amount> <nSkip> }}
```

Returns up to `amount` entries from the database, sorted in ascending order by the numeric value, then by entry ID.

- `amount`: the maximum number of entries to return, capped at 100.
- `pattern`: the PostgreSQL pattern to match entries against.
- `nSkip`: the number of entries to skip before returning results.

### dbCount

```yag
{{ $count := dbCount <userID|pattern|query> }}
```

Returns the count of all matching database entries that are not expired.

The argument must be one of the following:
- `userID`: count entries for the given user ID.
- `pattern`: count only entries with keys matching the given pattern.
- `query`: an sdict with the following (all optional) keys:
  - `userID`: only count entries with a matching UserID field. Defaults to all UserIDs.
  - `pattern`: only counts entries with keys matching the given pattern. Defaults to all keys.

### dbDelByID

```yag
{{ dbDelByID <userID> <ID> }}
```

Deletes a database entry under the given `userID` by its `ID`.

### dbDelMultiple

```yag
{{ $numDeleted := dbDelMultiple <query> <amount> <nSkip> }}
```

Deletes up to `amount` entries from the database matching the given criteria. Returns the number of deleted entries.

- `query`: an sdict with the following (all optional) keys:
  - `userID`: only delete entries with a matching UserID field. Defaults to all UserIDs.
  - `pattern`: only delete entries with keys matching the given pattern. Defaults to all keys.
  - `reverse`: whether to delete entries with the lowest value first. Default is `false` (highest value first).
- `amount`: the maximum number of entries to delete, capped at 100.
- `nSkip`: the number of entries to skip before deleting.

### dbDel

```yag
{{ dbDel <userID> <key> }}
```

Deletes the specified entry from the database.

### dbGetPatternReverse

```yag
{{ $entries := dbGetPatternReverse <userID> <pattern> <amount> <nSkip> }}
```

Retrieves up to `amount` entries from the database in descending order as a slice.

- `userID`: the user ID to retrieve entries for.
- `pattern`: the PostgreSQL pattern to match entries against.
- `amount`: the maximum number of entries to return, capped at 100.
- `nSkip`: the number of entries to skip before returning results.

See [dbGetPattern](#dbgetpattern) for a function that retrieves entries in ascending order.

### dbGetPattern

```yag
{{ $entries := dbGetPattern <userID> <pattern> <amount> <nSkip> }}
```

Returns up to `amount` entries from the database in ascending order as a slice.

- `userID`: the user ID to retrieve entries for.
- `pattern`: the PostgreSQL pattern to match entries against.
- `amount`: the maximum number of entries to return, capped at 100.
- `nSkip`: the number of entries to skip before returning results.

See [dbGetPatternReverse](#dbgetpatternreverse) for a function that retrieves entries in descending order.

### dbGet

```yag
{{ $entry := dbGet <userID> <key> }}
```

Returns the specified database entry.

### dbIncr

```yag
{{ $newValue := dbIncr <userID> <key> <incrBy> }}
```

Increments the value of the specified database entry by `incrBy`. Returns the new value as a floating-point number.

- `incrBy`: the amount to increment the value by. Must be a valid number.

### dbRank

```yag
{{ $rank := dbRank <query> <userID> <key> }}
```

Returns the rank of the specified entry in the set of entries as defined by `query`.

- `query`: an sdict with the following (all optional) keys:
  - `userID`: only include entries with the given user ID.
  - `pattern`: only include entries with keys matching the given pattern.
  - `reverse`: if `true`, entries with lower values have higher ranks. Default is `false`.

### dbSetExpire

```yag
{{ dbSetExpire <userID> <key> <value> <ttl> }}
```

Same as [dbSet](#dbset) but with an additional expiration `ttl` in seconds.

### dbSet

```yag
{{ dbSet <userID> <key> <value> }}
```

Sets the value for the specified `key` and `userID` to `value`.

- `value`: an arbitrary value to set.

### dbTopEntries

```yag
{{ $entries := dbTopEntries <pattern> <amount> <nSkip> }}
```

Returns up to `amount` entries from the database, sorted in descending order by the numeric value, then by entry ID.

- `pattern`: the PostgreSQL pattern to match entries against.
- `amount`: the maximum number of entries to return, capped at 100.
- `nSkip`: the number of entries to skip before returning results.

{{< callout context="caution" title="Caution: Storing Numerical Values" icon="outline/alert-triangle" >}}

Numerical values are stored as floating-point numbers in the database; large numbers such as user IDs will lose
precision. To avoid this, convert them to a string before writing to the database.

Numerical `dict` keys are retrieved as an `int64`, therefore you'd have to write<br>
`{{ $dict.Get (toInt64 N)}}` to retrieve the value associated with the numerical key `N`.

{{< /callout >}}

## ExecCC

{{< callout context="danger" title="Danger" icon="outline/alert-octagon" >}}

`execCC` calls are limited to 1 / CC for non-premium users and 10 / CC for premium users.

{{< /callout >}}

| **Function**                                   | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cancelScheduledUniqueCC` ccID key             | Cancels a previously scheduled custom command execution using `scheduleUniqueCC`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `execCC` ccID channel delay data               | Function that executes another custom command specified by `ccID`. With delay 0 the max recursion depth is 2 (using `.StackDepth` shows the current depth). `execCC` is rate-limited strictly at max 10 delayed custom commands executed per channel per minute, if you go over that it will be simply thrown away. Argument `channel` can be `nil`, channel's ID or name. The`delay` argument is execution delay of another CC is in seconds. The `data` argument is content that you pass to the other executed custom command. To retrieve that `data` you use `.ExecData`. This example is important > [execCC example](/docs/reference/custom-command-examples#countdown-example-exec-cc) also next snippet which shows you same thing run using the same custom command > [Snippets](#execcc-sections-snippets). `execCC` is also thoroughly covered in this [GitHub gist](https://gist.github.com/l-zeuch/9f10d128184509ad531778f26550ed6d). |
| `scheduleUniqueCC` ccID channel delay key data | Same as `execCC`except there can only be 1 scheduled cc execution per server per key (unique name for the scheduler), if key already exists then it is overwritten with the new data and delay (as above, in seconds).An example would be a mute command that schedules the unmute action sometime in the future. However, let's say you use the unmute command again on the same user, you would want to override the last scheduled unmute to the new one. This can be used for that.                                                                                                                                                                                                                                                                                                                                                                                                                                                             |

### ExecCC section's snippets

- To demonstrate execCC and .ExecData using the same CC.

```yag
{{ $yag := "YAGPDB rules! " }}
{{ $ctr := 0 }} {{ $yourCCID := .CCID }}
{{ if .ExecData }}
    {{ $ctr = add .ExecData.number 1 }}
    {{ $yag = print $yag $ctr }} {{ .ExecData.YAGPDB }}
{{ else }}
    So, someone rules.
    {{ $ctr = add $ctr 1 }} {{ $yag = print $yag 1 }}
{{ end }}
{{ if lt $ctr 5 }}
    {{ execCC $yourCCID nil 3 (sdict "YAGPDB" $yag "number" $ctr) }}
{{ else }} FUN'S OVER! {{ end }}
```

## Interactions

{{< callout context="tip" title="Tip" icon="outline/rocket" >}}

Use of interactions within YAGPDB is an advanced topic; the documentation should be used only as reference. To learn
about using interactions, [see here](/docs/reference/custom-interactions).

{{< /callout >}}

### Interaction Responses

- Only one interaction response may be sent to each interaction.
- If you do not send an interaction response, members will see "This application did not respond" on Discord.
- You may only send an interaction response to the interaction which triggered the command.
- Text output directly to the response is automatically sent as an interaction response if the interaction hasn't
  already been responded to.
- A CC executed with `execCC` by the triggered CC will be able to send initial responses to the triggering interaction.
- A response is not the same thing as a followup.

| **Function**                       | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sendModal` modal                  | Responds to an interaction by showing the member a modal. `modal` must be an `sdict` with the following keys: `title`, `custom_id`, and `fields`. The `fields` argument should be a slice of sdicts with the following keys: `label`, `placeholder`, `value` (default value if they don't enter anything), `required`, `style` (1 for short, 2 for long), `min_length`, and `max_length`, however only the `label` argument is required for each field. You cannot send a modal in response to a user submitting another modal. Example in section's [Snippets](#interactions-sections-snippets). |
| `updateMessage` newMessage         | Edits the message on which the button, select menu, or modal was triggered on.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `updateMessageNoEscape` newMessage | Edits the message triggered on and has same logic in escaping characters as `sendMessageNoEscape`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |

### Interaction Followups

- Interaction followups may be sent up to 15 minutes after an interaction.
- To send a followup, you must have the interaction token of the interaction you are following up.
- You can send as many followups as you'd like.
- Text output directly to the response is automatically sent as an interaction followup if the interaction has
  already been responded to.
- A followup is not the same thing as a response.

| **Function**                                                        | **Description**                                                                                                                                                                                                                                                                                                                   |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `editResponse` interactionToken messageID newMessageContent         | Edits one of the bot's responses to an interaction. `interactionToken` must be a valid token or `nil` to target the triggering interaction. `messageID` must be a valid message ID of a followup message, or `nil` to target the original interaction response. Example in section's [Snippets](#interactions-sections-snippets). |
| `editResponseNoEscape` interactionToken messageID newMessageContent | Edits the response and has same logic in escaping characters as `sendMessageNoEscape`.                                                                                                                                                                                                                                            |

### Interaction Response/Followup Hybrids

- Hybrid functions will send an interaction response if the interaction has not already been responded to, otherwise they will send the equivalent followup function.

| **Function**                                         | **Description**                                                                                                                                                                                                                                                                                |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sendResponse` interactionToken message              | Sends a message (string, embed, or complexMessage) in response to an interaction. Supports the `ephemeral` flag in `complexMessage`. `interactionToken` must be a valid token or `nil` to target the triggering interaction. Example in section's [Snippets](#interactions-sections-snippets). |
| `sendResponseNoEscape` interactionToken message      | Sends a message as a response, and doesn't escape mentions (e.g. role mentions, reply mentions or @here/@everyone).                                                                                                                                                                            |
| `sendResponseNoEscapeRetID` interactionToken message | Same as `sendResponseNoEscape`, but also returns messageID to assigned variable for later use.                                                                                                                                                                                                 |
| `sendResponseRetID` interactionToken message         | Same as `sendResponse`, but also returns messageID to assigned variable for later use. Example in section's [Snippets](#interactions-sections-snippets).                                                                                                                                       |

### Interaction Miscellaneous

| **Function**                             | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cbutton` "list of button values"        | Functions similarly to `cembed`. [Available values](https://discord.com/developers/docs/interactions/message-components#button-object) A Link style button must have a URL and cannot have a Custom ID. All other styles must have a Custom ID and cannot have a URL. All buttons must have either a label or an emoji. Example in section's [Snippets](#interactions-sections-snippets).                                                               |
| `cmenu` "list of select menu values"     | Functions similarly to `cembed`. [Available values](https://discord.com/developers/docs/interactions/message-components#select-menu-object) Type should be provided as a string, either `"text"`, `"user"`, `"role"`, `"mentionable"`, or `"channel"`. Text type menus must have `options`, all other types cannot. Example in section's [Snippets](#interactions-sections-snippets).                                                                   |
| `ephemeralResponse`                      | Send the response text ephemerally. Only works when triggered by an interaction. Works on responses and followups.                                                                                                                                                                                                                                                                                                                                      |
| `getResponse` interactionToken messageID | Can be used to get the bot's responses or followup messages, including ephemeral messages. Returns a [Message](/docs/reference/templates/syntax-and-data#message) object. `interactionToken` must be a valid token or `nil` to target the triggering interaction. `messageID` must be a valid message ID of a followup message, or `nil` to target the original interaction response. Example in section's [Snippets](#interactions-sections-snippets). |

### Interactions section's snippets

- To demonstrate creating buttons and menus

```yag
{{ $funButton := cbutton
  "label" "My Custom Button"
  "custom_id" "duck-button"
  "style" "success" }}
{{ $badButton := cbutton
  "label" "My Useless Button"
  "style" "secondary"
  "disabled" true }}
{{ $emojiButton := cbutton
  "emoji" ( sdict "name" "🦆" )
  "style" "link"
  "url" "https://yagpdb.xyz" }}
{{ $menu := cmenu
  "type" "text"
  "placeholder" "Choose a terrible thing"
  "custom_id" "duck-menus-my_first_menu"
  "options" (cslice
    (sdict "label" "Ducks" "value" "opt-1" "default" true)
    (sdict "label" "Duck" "value" "opt-2" "emoji" (sdict "name" "🦆"))
    (sdict "label" "Half a Duck" "value" "opt-3" "description" "Don't let the smaller amount fool you."))
  "max_values" 3 }}
{{ $message := complexMessage "buttons" (cslice $funButton $badButton $emojiButton) "menus" $menu }}
{{ sendMessage nil $message }}
```

- To demonstrate responding with a modal (this must be triggered by a component or modal submission)

```yag
{{ $modal := sdict
  "title" "My Custom Modal"
  "custom_id" "modals-my_first_modal"
  "fields" (cslice
    (sdict "label" "Name" "placeholder" "Duck" "required" true)
    (sdict "label" "Do you like ducks?" "value" "Heck no")
    (sdict "label" "Duck hate essay" "min_length" 100)) }}
{{ sendModal $modal }}
```

- To demonstrate sending, getting, and editing responses (this must be triggered by a component or modal submission)

```yag
{{ $interactionToken := .Interaction.Token }}
{{ sendResponse nil "Here's the first message!" }}
{{ $followupID := sendResponseRetID $interactionToken (complexMessage "content" "Here's a sneaky one!" "ephemeral" true) }}
{{ sleep 2 }}
{{ editResponse $interactionToken $followupID (print "I've edited this message to say " noun) }}
{{ $editedResponse := getResponse $interactionToken $followupID }}
{{ editResponse $interactionToken nil $editedResponse.Content }}
```

- To demonstrate updating the triggering message (this must be triggered by a component or modal submission)

```yag
{{ $button := cbutton "label" "I won!" "custom_id" "i_won" }}
{{ $content := printf "Press this button when you win! The last person who won was %s! They wanted to say they are a %s %s." .User.Mention adjective noun }}

{{ $message := complexMessageEdit "content" $content "buttons" $button }}
{{ updateMessage $message }}
```

## Math

{{< callout context="note" title="Note" icon="outline/info-circle" >}}

Boolean logic (and, not, or) and comparison operators (eq, gt, lt, etc.) are covered in [conditional
branching](/docs/reference/templates/syntax-and-data#if-conditional-branching).

{{< /callout >}}

| **Function**                    | **Description**                                                                                                                                                                                                                                                                                                                                                        |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `add` x y z ...                 | Returns x + y + z + ..., detects first number's type - is it _int_ or _float_ and based on that adds. (use `toFloat` on the first argument to force floating point math.)`{{add 5 4 3 2 -1}}` sums all these numbers and returns `13`.                                                                                                                                 |
| `bitwiseAnd` x y                | The output of bitwise AND is 1 if the corresponding bits of two operands is 1. If either bit of an operand is 0, the result of corresponding bit is evaluated to 0. Example: `{{bitwiseAnd 12 25}}` returns `8`, that in binary 00001100 AND 00011001 is 00001000.                                                                                                     |
| `bitwiseAndNot` x y             | This function is called bit clear because of AND NOT. For example in the expression z = x AND NOT y, each bit of z is 0 if the corresponding bit of y is 1; otherwise it equals to the corresponding bit of x. `{{bitwiseAndNot 7 12}}` returns `3`, that is 0111 AND NOT 1100 is 11.                                                                                  |
| `bitwiseNot` x                  | The bitwise NOT operator inverts the bits of the argument. Example: `{{bitwiseNot 7}}` returns `-8`. that in binary 0111 to 1000                                                                                                                                                                                                                                       |
| `bitwiseOr` x y z...            | The output of bitwise OR is 1 if at least one corresponding bit of two operands is 1. Example: `{{bitwiseOr 12 25}}` returns `29`, that in binary 00001100 OR 00011001 is 00011101.                                                                                                                                                                                    |
| `bitwiseXor` x y                | The result of bitwise XOR operator is 1 if the corresponding bits of two operands are opposite. Example: `{{bitwiseXor 12 25}}` returns `21`, that in binary 00001100 OR 00011001 is 00010101.                                                                                                                                                                         |
| `bitwiseLeftShift` x y          | Left shift operator shifts all bits towards left by a certain number of specified bits. The bit positions that have been vacated by the left shift operator are filled with 0. Example: `{{range seq 0 3}} {{bitwiseLeftShift 212 .}} {{end}}` returns `212 424 848`                                                                                                   |
| `bitwiseRightShift` x y         | Right shift operator shifts all bits towards right by certain number of specified bits. Example: `{{range seq 0 3}} {{bitwiseRightShift 212 .}} {{end}}` returns `212 106 53`.                                                                                                                                                                                         |
| `cbrt` x                        | Returns the cube root of given argument in type _float64_ e.g. `{{cbrt 64}}` returns `4`.                                                                                                                                                                                                                                                                              |
| `div` x y z ...                 | Division, like `add` or `mult`, detects first number's type first. `{{div 11 3}}` returns `3` whereas `{{div 11.1 3}}` returns `3.6999999999999997`                                                                                                                                                                                                                    |
| `fdiv` x y z ...                | Meant specifically for floating point numbers division.                                                                                                                                                                                                                                                                                                                |
| `log` x (base)                  | Log is a logarithm function using (log base of x). Arguments can be any type of numbers, as long as they follow logarithm logic. Return value is of type _float64_. If base argument is not given It is using natural logarithm (base e - The Euler's constant) as default.`{{ log "123" 2 }}` will return `6.94251450533924`.                                         |
| `mathConst` "arg"               | Function returns all constants available in go's math package as _float64_. `"arg"` has to be a case-insensitive _string_ from [math constants list](https://pkg.go.dev/math@go1.18.2#pkg-constants). For example `{{mathConst "sqrtphi"}}` would return `1.272019649514069`.                                                                                          |
| `max` x y                       | Returns the larger of x or y as type _float64_.                                                                                                                                                                                                                                                                                                                        |
| `min` x y                       | Returns the smaller of x or y as type _float64_.                                                                                                                                                                                                                                                                                                                       |
| `mod` x y                       | Mod returns the floating-point remainder of the division of x by y. For example, `mod 17 3` returns `2` as type _float64_.<br><br>Note that like Go's `[math.Mod](https://pkg.go.dev/math#Mod)` function, `mod` takes the sign of `x`, so `mod -5 3` results in `-2`, not `1`. To ensure a non-negative result, use `mod` twice, like such: `mod (add (mod x y) y) y`. |
| `mult` x y z ...                | Multiplication, like `add` or `div`, detects first number's type. `{{mult 3.14 2}}` returns `6.28`                                                                                                                                                                                                                                                                     |
| `pow` x y                       | Pow returns x\*\*y, the base-x exponential of y which have to be both numbers. Type is returned as _float64_. `{{ pow 2 3 }}` returns `8`.                                                                                                                                                                                                                             |
| `randInt` (stop, or start stop) | Returns a random integer between 0 and stop, or start - stop if two args are provided.Result will be `start &#x3C;= random number &#x3C; stop`. Without arguments, range is 0..10. Example in section's [Snippets](#math-sections-snippets).                                                                                                                           |
| `round` x                       | Returns the nearest integer, rounding half away from zero. Regular rounding > 10.4 is `10` and 10.5 is `11`. All round functions return type _float64_, so use conversion functions to get integers. For more complex rounding, example in section's [Snippets](#math-sections-snippets).                                                                              |
| `roundCeil` x                   | Returns the least integer value greater than or equal to input or rounds up. `{{roundCeil 1.1}}` returns `2`.                                                                                                                                                                                                                                                          |
| `roundEven` x                   | Returns the nearest integer, rounding ties to even.<br>`{{roundEven 10.5}}` returns `10 {{roundEven 11.5}}` returns `12`.                                                                                                                                                                                                                                              |
| `roundFloor` x                  | Returns the greatest integer value less than or equal to input or rounds down. `{{roundFloor 1.9}}` returns `1`.                                                                                                                                                                                                                                                       |
| `sqrt` x                        | Returns the square root of a number as type _float64_.<br>`{{sqrt 49}}` returns `7, {{sqrt 12.34 \|printf "%.4f"}} returns 3.5128`                                                                                                                                                                                                                                     |
| `sub` x y z ...                 | Returns x - y -z - ... Works like add, just subtracts.                                                                                                                                                                                                                                                                                                                 |

### Math section's snippets

- `{{$d := randInt 10}}` Stores random _int_ into variable `$d` (a random number from 0-9).
- To demonstrate rounding float to 2 decimal places.\
  `{{div (round (mult 12.3456 100)) 100}}` returns 12.35\
  `{{div (roundFloor (mult  12.3456 100)) 100}}` returns 12.34

## Member

| **Function**                                | **Description**                                                                                                                                                                        |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `getTargetPermissionsIn` memberID channelID | Returns target’s permissions in the given channel.                                                                                                                                     |
| `editNickname` "newNick"                    | Edits triggering user's nickname, argument has to be of type _string_. YAGPDB's highest role has to be above the highest role of the member and bot can't edit owner's nickname.       |
| `hasPermissions` arg                        | Returns true/false on whether triggering user has the permission bit _int64_ that is also set in .Permissions*.*                                                                       |
| `getMember` mention/userID                  | Function returns [Member object](/docs/reference/templates/syntax-and-data#member) having above methods. `{{(getMember .User.ID).JoinedAt}}` <br>is the same as `{{.Member.JoinedAt}}` |
| `onlineCount`                               | Returns the count of online users/members on current server.                                                                                                                           |
| `targetHasPermissions` memberID arg         | Returns true/false on whether targeted member has the permission bit _int64_.                                                                                                          |

Permissions are covered on
[Discord permissions documentation](https://discord.com/developers/docs/topics/permissions#permissions-bitwise-permission-flags). For example to get
permission bit for "use application commands" `{{bitwiseLeftShift 1 32}}` would return _int64_ `4294967296`.

## Mentions

| **Function**                 | **Description**                                                          |
| ---------------------------- | ------------------------------------------------------------------------ |
| `mentionEveryone`            | Mentions `@everyone`.                                                    |
| `mentionHere`                | Mentions `@here`.                                                        |
| `mentionRoleID` roleID       | Mentions the role found with the provided ID.                            |
| `mentionRoleName` "rolename" | Mentions the first role found with the provided name (case-insensitive). |

There is also .Mention method available for channel, role, user structs/objects.

### Mentions section's snippets

- `<@{{.User.ID}}>` Outputs a mention to the user that called the command and is the same as `{{.User.Mention}}`
- `<@###########>` Mentions the user that has the ID ###### (See [How to get IDs](/docs/reference/how-to-get-ids) to get ID).
- `<#&&&&&&&&&&&>` Mentions the channel that has ID &&&&&& (See [How to get IDs](/docs/reference/how-to-get-ids) to get ID).

* `<@&##########>` Mentions the role with ID ######## ([listroles](/docs/core/all-commands#listroles) command
  gives roleIDs). This is usable for example with `{{sendMessageNoEscape nil "Welcome to role <@&11111111...>"}}`.
  Mentioning that role has to be enabled server- side in Discord.

- `</cmdName:cmdID>` Mentions a slash command, and makes it clickable and interactive with proper arguments e.g.
  `</howlongtobeat:842397645104087061>`.

## Message

| **Function**                                                                                                         | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| -------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `addMessageReactions` channel messageID emojis...                                                                    | Same as `addReactions` or `addResponseReactions`, but can be used on any messages using its ID. `channel` can be either `nil`, channel's ID or its name.Emojis can be presented as a _cslice_. Example in section's [Snippets](#message-sections-snippets).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `addReactions` "👍" "👎" ...                                                                                         | Adds each emoji as a reaction to the message that triggered the command (recognizes Unicode emojis and `emojiName:emojiID`). Emojis can be presented as a _cslice_.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `addResponseReactions` "👍" "👎" ...                                                                                 | Adds each emoji as a reaction to the response message (recognizes Unicode emojis and `emojiName:emojiID`). Emojis can be presented as a _cslice_.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `complexMessage` "allowed_mentions" arg "content" arg "embed" arg "file" arg "filename" arg "reply" arg "silent" arg | `complexMessage` creates a _so-called_ bundle of different message fields for `sendMessage...` functions to send them out all together. Its arguments need to be preceded by predefined keys:<br>`"allowed_mentions"` sends out very specific mentions where `arg` is an _sdict_ having keys: `"parse"` that takes a _cslice_ with accepted values for a type to mention - "users", "roles", "everyone"; _sdict_ keys`"users"`, `"roles"` take a _cslice_ of IDs either for users or roles and `"replied_user"` is a _bool_ true/false for mentioning replied user.`"content"` for regular text; `"embed"` for embed arguments created by `cembed` or `sdict`. With `cslice` you can use up to 10 embeds as arguments for `"embed"`. `"file"` for printing out content as a file with default name `attachment_YYYY-MM-DD_HH-MM-SS.txt` (max size 100 000 characters ca 100kB). `"filename"` lets you define custom file name if `"file"` is used with max length of 64 characters, extension name remains `txt`. `"reply"`replies to a message, where `arg`is messageID. If replied message is in another channel, `sendMessage`channel must be also that channel. To "reply-ping", use `sendMessageNoEscape`.`"silent"` suppresses message's push and desktop notifications, `arg` is _bool_ true/false.Example in this section's [Snippets](#message-sections-snippets). |
| `complexMessageEdit` "allowed_mentions" arg "content" arg "embed" arg "silent" arg                                   | Special case for `editMessage` function - either if `complexMessage` is involved or works even with regular message. Has parameters "allowed_mentions",`"content", "embed"` and `"silent"` that edit the message and work the same way as for `complexMessage`. Example in this section's [Snippets](#message-sections-snippets).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `deleteAllMessageReactions` channel messageID (emojis...)                                                            | Deletes all reactions pointed message has. `channel` can be ID, "name" or `nil`. `emojis` argument is optional and works like it's described for the function `deleteMessageReaction`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `deleteMessage` channel messageID (delay)                                                                            | Deletes message with given `messageID` from `channel`. Channel can be either `nil`, channel's ID or its name. `(delay)` is optional and like following two delete functions, it defaults to 10 seconds, max being 1 day or 86400 seconds. Example in section's [Snippets](functions#message-sections-snippets).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `deleteMessageReaction` channel messageID userID emojis...                                                           | Deletes reaction(s) from a message. `channel` can be ID, "name" or `nil`. <br>`emojis` argument can be up to 10 emojis, syntax is `emojiName` for Unicode/Discord's default emojis and `emojiName:emojiID` for custom emotes. <br>Example: `{{deleteMessageReaction nil (index .Args 1) .User.ID "👍" "👎"}}` will delete current user's reactions with thumbsUp/Down emotes from current running channel's message which ID is given to command as first argument `(index .Args 1)`.<br>Also usable with [Reaction trigger](/docs/reference/templates/syntax-and-data#reaction).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `deleteResponse` (delay)                                                                                             | Deletes the response after a certain time from optional `delay` argument (max 86400 seconds = 1 day). Defaults to 10 seconds.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `deleteTrigger` (delay)                                                                                              | Deletes the trigger after a certain time from optional `delay` argument (max 86400 seconds = 1 day). Defaults to 10 seconds.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `editMessage` channel messageID newMessageContent                                                                    | Edits the message in channel, channel can be either `nil`, channel's ID or "name". Light example in section's [Snippets](#message-sections-snippets).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `editMessageNoEscape` channel messageID newMessageContent                                                            | Edits the message in channel and has same logic in escaping characters as `sendMessageNoEscape`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `getMessage` channel messageID                                                                                       | Returns a [Message](/docs/reference/templates/syntax-and-data#message) object. `channel` can be either its ID, name or nil for triggering channel.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `pinMessage` channel messageID                                                                                       | Pins a message by its ID in given channel. `channel` can be either its ID, name or nil for triggering channel. Can be called 5 times.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `publishMessage` channel messageID                                                                                   | Publishes a message by its ID in given announcement channel. `channel` can be either its ID, name or nil for triggering channel. Can be called once. This function will not work for leave or join messages.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `publishResponse`                                                                                                    | Publishes the response when executed in an announcement channel. This function will not work for leave or join messages.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `sendDM` "message here"                                                                                              | Sends the user a direct message, only one DM can be sent per custom command (accepts embed objects). YAG will only DM triggering user. This function will not work for leave messages.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `sendMessage` channel message                                                                                        | Sends `message (string or embed)` in `channel`, channel can be either `nil`, the channel ID or the channel's "name".                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `sendMessageNoEscape` channel message                                                                                | Sends `message (string or embed)` in `channel`, channel can be either `nil`, the channel ID or the channel "name". Doesn't escape mentions (e.g. role mentions, reply mentions or @here/@everyone).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `sendMessageNoEscapeRetID` channel message                                                                           | Same as `sendMessageNoEscape`, but also returns messageID to assigned variable for later use.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `sendMessageRetID` channel message                                                                                   | Same as `sendMessage`, but also returns messageID to assigned variable for later use. Example in section's [Snippets](#message-sections-snippets).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `unpinMessage` channel messageID                                                                                     | Unpins the message by its ID in given channel. `channel` can be either its ID, name or nil for triggering channel. Can be called 5 times.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |

### Message section's snippets

- Sends message to current channel `nil` and gets messageID to variable `$x`. Also adds reactions to this message. After
  5 seconds, deletes that message. >

  `{{$x := sendMessageRetID nil "Hello there!"}} {{addMessageReactions nil $x (cslice "👍" "👎") "`❤️`" }}
{{deleteMessage nil $x 5}}`

- To demonstrate `sleep` and slightly also `editMessage` functions. >\
   `{{$x := sendMessageRetID nil "Hello"}} {{sleep 3}} {{editMessage nil $x "There"}} {{sleep 3}} {{sendMessage nil "We
all know, that"}} {{sleep 3}} YAGPDB rules!`
- To demonstrate usage of `complexMessage` with `sendMessage`. `{{sendMessage nil (complexMessage "reply" .Message.ID
"content" "Who rules?" "embed" (cembed "description" "YAGPDB of course!" "color" 0x89aa00) "file" "Here we print
something nice - you all are doing awesome!" "filename" currentTime.Weekday)}}`
- To demonstrate usage of `complexMessageEdit` with `editMessage`.\
   `{{$mID := sendMessageRetID nil (complexMessage "content" "You know what is..." "silent" true "embed" (cembed "title"
"FUN!?" "color" 0xaa8900))}} {{sleep 3}} {{editMessage nil $mID (complexMessageEdit "embed" (cembed "title" "YAGPDB!"
"color" 0x89aa00) "content" "Yes, it's always working with...")}}{{sleep 3}}{{editMessage nil $mID (complexMessageEdit
"embed" nil` "content" "Will delete this message in a sec, goodbye YAG!"`)}}{{deleteMessage nil $mID 3}}`

## Miscellaneous

{{< callout context="note" title="Note" icon="outline/info-circle" >}}

`if`, `range`, `try-catch`, `while`, `with` actions are all covered on the [actions template documentation](/docs/reference/templates/syntax-and-data#actions).

{{< /callout >}}

| **Function**                                      | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `adjective`                                       | Returns a random adjective.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `cembed` "list of embed values"                   | Function to generate embed inside custom command. [In-depth custom embeds reference](/docs/reference/custom-embeds).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `createTicket` author topic                       | Creates a new ticket with the author and topic provided. [Ticket object documentation](/docs/reference/templates/syntax-and-data#tickets).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `cslice`, `sdict`                                 | Please see [custom type documentation](/docs/reference/templates/syntax-and-data#custom-types).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `dict` key1 value1 key2 value2 ...                | Creates an unordered collection of key-value pairs, a dictionary so to say. The number of parameters to form key-value pairs must be even. [Dictionary example script](/docs/reference/custom-command-examples#dictionary-example). Keys and values can be of any type. Key is not restricted to _string_ only as in case with `sdict`. `dict` also has helper methods .Del, .Get, .HasKey and .Set and they function the same way as `sdict` ones discussed in [templates.Sdict documentation](/docs/reference/templates/syntax-and-data#templates-sdict).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `exec` "command" "args" "args" "args" ...         | Executes a YAGPDB command (e.g. roll, kick etc) in a custom command. Exec can be run max 5 times per CC. If real command returns an embed - `exec` will return raw data of type embed, so you can use embed fields for better formatting - e.g. `{{$resp := exec "whois"}} {{$resp.Title}} Joined at > {{(index $resp.Fields 4).Value}}` will return the title (username#discriminator) and "Joined at" field's value from `whois` command.<br>**NB!** This will not work for commands with paginated embed returns, like `un/nn` commands!exec syntax is `exec "command" arguments` - this means you format it the same way as you would type the command regularly, just without the prefix, e.g. if you want to clear 2 messages and avoiding the pinned message > `{{exec "clear 2 -nopin"}}`, where `"command"` part is whole `"clear 2 -nopin"`. If you change that number inside CC somewhere then you have to use `arguments` part of exec formatting > `{{$x := 2}} {{exec "clear" $x "-nopin"}}` Here `"clear"` is the `"command"` and it is followed by `arguments`, one variable `$x` and one string `"-nopin"`. Last example is the same as `{{exec (joinStr " " "clear" $x "-nopin")}}`(also notice the space in `joinStr` separator). |
| `execAdmin` "command" "args" "args" "args" ...    | Functions same way as `exec` but effectively runs the command as the bot user (YAGPDB). This has essentially the same effect as if a user with the same permissions and roles as YAGPDB ran the command: for example, if YAGPDB had ban members permission but the user which ran the command did not, `{{exec "ban" 12345}}` would error due to insufficient permissions but `{{execAdmin "ban" 12345}}` would succeed.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `execTemplate` "template" data                    | Executes the associated template, optionally with data. A more detailed treatment of this function can be found in the [Associated Templates](/docs/reference/templates/syntax-and-data#associated-templates) section.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `getWarnings` user                                | Returns a _slice_ of warnings of type _[[]\*moderation.WarningModel](https://github.com/botlabs-gg/yagpdb/blob/master/moderation/models.go#L121)_ given to user argument which can be its ID or user object.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `hasPrefix` string prefix                         | `hasPrefix` tests whether the given `string` begins with `prefix` and returns _bool_. Example > `{{hasPrefix "YAGPDB" "YAG"}}` returns `true`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `hasSuffix` string suffix                         | hasSuffix tests whether the given `string` ends with `suffix` and returns _bool_. Example > `{{hasSuffix "YAGPDB" "YAG"}}` returns `false`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `humanizeThousands` arg                           | This function places comma to separate groups of thousands of a number. `arg` can be _int_ or _string_, has to be a whole number, e.g. `{{humanizeThousands "1234567890"}}` will return `1,234,567,890`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `in` list value                                   | Returns _bool_ true/false whether case-sensitive value is in list/_slice_. `{{ in (cslice "YAGPDB" "is cool") "yagpdb" }}` returns `false`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `index` arg ...keys                               | Returns the result by indexing its first argument with following arguments. Each indexed item must be a _map_, _slice_ or _array._ Indexed _string_ returns value in _uint8_. Example: `{{index .Args 1}}` returns first argument after trigger which is always at position 0. More than one positional keys can be used, in pseudo-code: `index X 0 1` is equivalent to calling `index (index X 0) 1`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `inFold` list value                               | Same as `in`, but is case-insensitive. `{{inFold (cslice "YAGPDB" "is cool") "yagpdb"}}` returns `true`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `kindOf` value (flag)                             | This function helps to determine what kind of data type we are dealing with. `flag` part is a _bool_ and if set as **true** (**false** is optional) returns the value where given `value` points to. Example: `{{kindOf cembed false}} {{kindOf cembed true}}` will return `ptr` and `struct`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `len` arg                                         | Returns the integer length of its argument. arg can be an _array_, _slice_, _map_, or _string._`{{ len (cslice 1 2 3) }}` returns `3`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `noun`                                            | Returns a random noun.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `parseArgs` required_args error_message `...carg` | Checks the arguments for a specific type. Has methods `.Get` and `.IsSet`. <br>`carg "type" "name"` is required by `parseArgs` and it defines the type of argument for `parseArgs`. An example in [Custom Command Examples.](/docs/reference/custom-command-examples.md#parseargs-example)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `sendTemplate` channel templateName (data)        | Function sends a formulated template to another channel and returns sent response's messageID.<br>Channel is like always either name, number or nil; and returns messageID. `data` is optional and is meant for additional data for the template. Example: `{{define "logsTemplate"}}This text will output on different channel, you can also use functions like {{currentTime}}. {{.TemplateArgs}} would be additional data sent out. {{end}}`Now we call that "logs" in the same custom command.`{{sendTemplate "logs" "logsTemplate" "YAG rules!"}}.`<br><br>[Template definition documentation](https://pkg.go.dev/text/template#hdr-Nested_template_definitions).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `sendTemplateDM` templateName (data)              | Works the same way as function above. Only channel's name is not in the arguments. YAGPDB **will only** DM the triggering user. This function will not work for leave messages.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `seq` start stop                                  | Creates a new _slice_ of type _int_, beginning from start number, increasing in sequence and ending at stop (not included). `{{seq -4 2}}` returns a _slice_ `[ -4 -3 -2 -1 0 1 ]`. Sequence's max length is 10 000.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `shuffle` list                                    | Returns a shuffled, randomized version of a list/_slice_.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `sleep` seconds                                   | Pauses execution of template's action-structure inside custom command for max 60 seconds combined. Argument `seconds` is an integer (whole number). Example in [snippets](#message-sections-snippets).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `sort` slice (...args)                            | Sorts a slice of same type values with optional arguments. These arguments are presented in an `sdict` as keys: `"reverse"` true/false and `"key"` with dictionary/map's key name as value. Example > `{{sort (cslice (sdict "name" "bob") (sdict "name" "alice") (sdict "name" "yagpdb")) (sdict "key" "name" "reverse" true)}}` would return `[map[name:yagpdb] map[name:bob] map[name:alice]]`. Sorting mixed types is not supported. Previous sorting options `"subslices"` and `"emptyslices"` have been removed.<br>Sort function is limited to 1/3 CC calls regular/premium.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `verb`                                            | Returns a random verb.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |

## Role functions

{{< callout context="note" title="Note" icon="outline/info-circle" >}}

In all role functions where userID is required as argument to target a user, it can also be full user object.

{{< /callout >}}

| **Function**                             | **Description**                                                                                                                                                                                                                  |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `addRoleID` roleID                       | Adds the role with the given ID to the user that triggered the command (use the `listroles` command for a list of roles).                                                                                                        |
| `addRoleName` roleName                   | Adds the role with given name to the user that triggered the command (use the `listroles` command for a list of roles).                                                                                                          |
| `getRole` role                           | Returns a [role object](https://discord.com/developers/docs/topics/permissions#role-object) of type _\*discordgo.Role._ `role` can be either role's ID or role's name.                                                           |
| `giveRoleID` userID roleID               | Gives a role by ID to the target.                                                                                                                                                                                                |
| `giveRoleName` userID "roleName"         | Gives a role by name to the target.                                                                                                                                                                                              |
| `hasRoleID` roleID                       | Returns true if the triggering user has the role with the specified ID (use the listroles command for a list of roles).                                                                                                          |
| `hasRoleName` "rolename"                 | Returns true if the triggering user has the role with the specified name (case-insensitive).                                                                                                                                     |
| `removeRoleID` roleID (delay)            | Removes the role with the given ID from the user that triggered the command (use the listroles command for a list of roles). `Delay` is optional argument in seconds.                                                            |
| `removeRoleName` roleName (delay)        | Removes the role with given name from the user that triggered the command (use the listroles command for a list of roles). `Delay` is optional argument in seconds.                                                              |
| `roleAbove` role1 role2                  | `roleAbove` compares two role objects e.g. `getRole`return and gives`true/false` value is `role1` positioned higher than `role2` or not.                                                                                         |
| `setRoles` userID roles                  | Overwrites the roles of the given user using the slice of roles provided, which should be a slice of role IDs. IDs can be ints or strings. Example: `{{setRoles .User.ID cslice}}` would clear the roles of the triggering user. |
| `takeRoleID` userID roleID (delay)       | Takes away a role by ID from the target. `Delay` is optional argument in seconds.                                                                                                                                                |
| `takeRoleName` userID "roleName" (delay) | Takes away a role by name from the target. `Delay` is optional argument in seconds.                                                                                                                                              |
| `targetHasRoleID` userID roleID          | Returns true if the given/targeted user has the role with the specified ID (use the listroles command for a list of roles). Example in section's Snippets.                                                                       |
| `targetHasRoleName` userID "roleName"    | Returns true if the given/targeted user has the role with the specified name (case-insensitive).                                                                                                                                 |

## String manipulation

{{< callout context="note" title="Note" icon="outline/info-circle" >}}

All regexp functions are limited to 10 different pattern calls per CC.

{{< /callout >}}

| **Function**                                         | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `joinStr` "separator" "str1" (arg1)(arg2) "str2" ... | Joins several strings into one, separated by the first argument`"separator"`, example:`{{joinStr "" "1" "2" "3"}}` returns `123`. Also if functions have _string, \[]string_ or easily convertible return, they can be used inside `joinStr` e.g. `{{joinStr ""` `"Let's calculate " (add (mult 13 3) 1 2) ", was returned at "` `(currentTime.Format "15:04") "."}}`                                                                                                                                                                                                                                                                                                                                                                           |
| `lower` "string"                                     | Converts the string to lowercase.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `print`, `printf`, `println`                         | These are GO template package's predefined functions and are aliases for [fmt.Sprint](https://golang.org/pkg/fmt/#Sprint), [fmt.Sprintf](https://golang.org/pkg/fmt/#Sprintf) and [fmt.Sprintln](https://golang.org/pkg/fmt/#Sprintln). Formatting is also discussed in [Go formatting documentation](https://golang.org/pkg/fmt/#hdr-Printing). [`printf` cheat sheet](https://yourbasic.org/golang/fmt-printf-reference-cheat-sheet/).<br><br>`printf` is usable for example to determine the type of the value > `{{printf "%T" currentTime}}` outputs `currentTime` functions output value type of `time.Time`. In many cases, `printf` is a great alternative to `joinStr` for concatenate strings.                                        |
| `reFind` "regex" "string"                            | Compares "string" to regex pattern and returns first match. `{{reFind "AG" "YAGPDB is cool!"}}`returns `AG` (regex pattern is case sensitive).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `reFindAll` "regex" "string" (count)                 | Adds all regex matches from the "string" to a _slice_. Example in section's [Snippets](functions.md#string-manipulation-sections-snippets). Optional `count` determines how many matches are made. **Example:** `{{reFindAll "a*" "abaabaccadaaae" 4}}` would return `[a aa a ].`                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `reFindAllSubmatches` "regex" "string" (count)       | Returns whole-pattern matches and also the sub-matches within those matches as _slices_ inside a _slice_. `{{reFindAllSubmatches "(?i)y([a-z]+)g" "youngish YAGPDB"}}` returns `[[young oun] [YAG A]]` (regex pattern here is case insensitive). Optional `count` works the same way as for `reFindAll`. So example above with `count` set to 1 would return `[[young oun]]`.                                                                                                                                                                                                                                                                                                                                                                   |
| `reQuoteMeta` "string"                               | `reQuoteMeta` returns a string that escapes all regular expression metacharacters inside the argument text; the returned string is a regular expression matching the literal text. Example in [package documentation](https://pkg.go.dev/regexp#QuoteMeta).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `reReplace` "regex" "string1" "string2"              | Replaces "string1" contents with "string2" at regex match point. `{{reReplace "I am" "I am cool!" "YAGPDB is"}}` returns `YAGPDB is cool!` (regex pattern here is case sensitive). <br>Inside "string2" dollar-sign, $ with numeric name like $1 or ${1} are interpreted as referrals to the submatches in "regex" pattern, so for instance $1 represents the text of the first submatch. To insert a literal $ in the output, use $$.                                                                                                                                                                                                                                                                                                          |
| `reSplit` "regex" "string" (count)                   | `reSplit` slices `string` into substrings separated by the `regex` expression and returns a _slice_ of the substrings between those expression matches. The optional `count` determines the number of substrings to return. If `count` is negative number the function returns all substrings, if 0 then none. If `count` is bigger than 0 it returns at most n substrings, the last substring being the unsplit remainder.**Example:** ` {{ $x := reSplit "a" "yagpdb has a lot of fame" 5}}``{{$x}} {{index $x 3}} ` would return `[y gpdb h s lot of f me]` and `lot of f.`                                                                                                                                                                  |
| `sanitizeText` "string"                              | Detects accented and confusable characters in input and turns these characters to normal, ISO-Latin ones. `{{ sanitizeText "𝔭𝒶ỿ𝕡𝕒ℓ" }}`would return `paypal`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `slice` arg integer (integer2)                       | Function's first argument must be of type _string_ or _slice_.Outputs the `arg` after cutting/slicing off integer (numeric) value of symbols (actually starting the string's index from integer through integer2) - e.g. `{{slice "Fox runs" 2}}`outputs `x runs`. When using also integer2 - e.g. `{{slice "Fox runs" 1 7}}`, it outputs `ox run`. For slicing whole arguments, let's say words, see example in section's [Snippets](#string-manipulation-sections-snippets). This `slice` function is not the same as basic dynamically-sized _slice_ data type discussed in this reference doc. Also it's custom, not having 3-indices as the default one from [text/template](https://golang.org/pkg/text/template/#hdr-Functions) package. |
| `split` "string" "sepr"                              | Splits given `"string"` to substrings separated by `"sepr"`arg and returns new _slice_ of the substrings between given separator e.g. `{{split "YAG, is cool!" ","}}` returns `[YAG  is cool!]` _slice_ where `YAG` is at `index` position 0 and `is cool!` at `index` position 1. Example also in section's [Snippets](functions.md#string-manipulation-sections-snippets).                                                                                                                                                                                                                                                                                                                                                                    |
| `title` "string"                                     | Returns the string with the first letter of each word capitalized.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `trimSpace` "string"                                 | Returns the string with all leading and trailing white space removed.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `upper` "string"                                     | Converts the string to uppercase.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `urlescape` "string"                                 | Escapes the _string_ so it can be safely placed inside a URL path segment - e.g. "Hello, YAGPDB!" becomes "Hello%2C%20YAGPDB%21"<br>There's also predefined template package function `urlquery` which is covered in [Go text/template documentation](https://pkg.go.dev/text/template#hdr-Functions).                                                                                                                                                                                                                                                                                                                                                                                                                                          |

{{< callout context="note" title="Note" icon="outline/info-circle" >}}

Special information we can include in the string is _escape sequences_. Escape sequences are two (or more) characters,
the first of which is a backslash `\`, which gives the remaining characters special meaning - let's call them
metacharacters. The most common escape sequence you will encounter is `\n`, which means "newline".&#x20;

{{< /callout >}}

{{< callout context="note" title="Note" icon="outline/info-circle" >}}

With regular expression patterns - when using quotes you have to "double-escape" metacharacters starting with backslash.
You can use backquotes/ticks to simplify this:`{{reFind "\\d+" (toString 42)}}` versus `` {{reFind `\d+` (toString
42)}} ``

{{< /callout >}}

### String manipulation section's snippets

- `{{$args:= (joinStr " " (slice .CmdArgs 1))}}` Saves all the arguments except the first one to a variable `$args`.&#x20;
- To demonstrate usage of `split` function. >\
  `{{$x := "Hello, World, YAGPDB, here!"}} {{range $k, $v := (split $x ", ")}}Word {{$k}}: __{{$v}}__ {{end}}`
- To demonstrate usage of `reFindAll`. > \
  `Before regex: {{$msg := "1 YAGPDB and over 100000 servers conquered."}} {{$re2 := reFindAll "[0-9]+" $msg}} {{$msg}}` \
  `After regex matches: {{println "Only" (index $re2 0) "YAGPDB and already" (index $re2 1) "servers captured."}}`

## Time

| **Function**                                           | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `currentTime`                                          | Gets the current time, value is of type _time.Time_ which can be used in a custom embed.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `formatTime` Time ("layout arg")                       | Outputs given time in RFC822 formatting, first argument `Time` shows it needs to be of type _time.Time_, also with extra layout if second argument is given - e.g. `{{formatTime currentUserCreated "3:04PM"}}` would output `11:22AM` if that would have been when user was created. Layout argument is covered in [Go time documentation](https://pkg.go.dev/time#pkg-constants).                                                                                                                                                                                                                                                                                                                                                                                   |
| `formatTime` Time ("layout arg")                       | Outputs given time in RFC822 formatting, first argument `Time` shows it needs to be of type _time.Time_, also with extra layout if second argument is given - e.g. `{{formatTime currentUserCreated "3:04PM"}}` would output `11:22AM` if that would have been when user was created. Layout argument is covered [here](https://pkg.go.dev/time#pkg-constants).                                                                                                                                                                                                                                                                                                                                                                                                       |
| `humanizeDurationHours`                                | Returns given integer (whole number) or _time.Duration_ argument in nanoseconds in human readable format - as how long it would take to get towards given time - e.g. `{{humanizeDurationHours 9000000000000000000}}` returns `285 years 20 weeks 6 days and 16 hours`. More in [Snippets](functions.md#time-sections-snippets).                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `humanizeDurationMinutes`                              | Same as `humanizeDurationHours`, this time duration is returned in minutes - e.g. `{{humanizeDurationMinutes 3500000000000}}` would return `58 minutes`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `humanizeDurationSeconds`                              | Same as both humanize functions above, this time duration is returned in seconds - e.g. `{{humanizeDurationSeconds 3500000000000}}` would return `58 minutes and 20 seconds`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `humanizeTimeSinceDays`                                | Returns time passed since given argument of type _time.Time_ in human readable format - e.g. `{{humanizeTimeSinceDays currentUserCreated}}.`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `loadLocation` "location"                              | Returns value of type _\*time.Location_ which can be used further in other golang's [time](https://pkg.go.dev/time) functions, for example `{{currentTime.In (loadLocation "Asia/Kathmandu")}}` would return current time in Nepal. <br>`location` is of type _string_ and has to be in [ZONEINFO syntax](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).                                                                                                                                                                                                                                                                                                                                                                                              |
| `newDate` year month day hour minute second (timezone) | Returns type _time.Time_ object in UTC using given syntax (all required arguments need to be of type _int_), for example > `{{humanizeDurationHours ((newDate 2059 1 2 12 34 56).Sub currentTime)}}` will give you how much time till year 2059 January 2nd 12:34:56. More examples in [Snippets](#time-sections-snippets). `timezone` is an optional argument of type _string_ which uses golang's [LoadLocation](https://golang.org/pkg/time/#LoadLocation) function and [ZONEINFO syntax](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). For example: `{{newDate 2020 4 20 12 34 56 "Atlantic/Reykjavik"}}` would return that time in GMT+0.                                                                                                       |
| `parseTime` value layout (location)                    | `parseTime` uses golang's [parseInLocation](https://pkg.go.dev/time#ParseInLocation) time function and returns value of type _time.Time_. Argument `value` is the time representation that needs to be parsed and has to be a string which matches and is formatted using `layout` argument. `layout` must be either a slice of strings or a single string and max number of layouts is 50. [Layout reference](https://pkg.go.dev/time#pkg-constants).<br> `location` is optional, defaulting to UTC; of type _string_ and has to be in [ZONEINFO syntax](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).<br><br>For example: `{{parseTime "July 18, 2016 at 12:38am" "January 2, 2006 at 3:04pm" "Asia/Kathmandu"}}` would return that time in +0545. |
| `snowflakeToTime` snowflake                            | Converts given [snowflake](https://discord.com/developers/docs/reference#snowflakes) to type _time.Time_ e.g. using bot's ID `{{snowflakeToTime .BotUser.ID}}` returns `2016-07-17 15:17:19 +0000 UTC`for YAGPDB.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `timestampToTime` arg                                  | Converts UNIX timestamp to _time.Time_. Example: \{{timestampToTime 1420070400\}} would return same time as `.DiscordEpoch`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `weekNumber` time                                      | Returns the week number as _int_ of given argument `time` of type _time.Time_. `{{weekNumber currentTime}}` would return the week number of current time.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |

{{< callout context="note" title="Note" icon="outline/info-circle" >}}

Discord Timestamp Styles referenced on
[Discord message documentation](https://discord.com/developers/docs/reference#message-formatting-timestamp-styles) can be done using `print`
function e.g.

`{{print "<t:" currentTime.Unix ":F>"}}` for "Long Date/Time" formatting.

{{< /callout >}}

### Time section's snippets

- To demonstrate `humanizeDurationHours` and also how to parse a timestamp, output will be like `whois` command shows
  user's _join server age_.\
  `{{humanizeDurationHours (currentTime.Sub .Member.JoinedAt.Parse)}}`
- To demonstrate `newDate` to get Epoch times.\
  `{{$unixEpoch := newDate 1970 1 1 0 0 0}} in seconds > {{$unixEpoch.Unix}}`\
  `{{$discordEpoch := newDate 2015 1 1 0 0 0}} in seconds > {{$discordEpoch.Unix}}`

## Type conversion

| Function               | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `json` value (flag)    | Traverses given `value` through MarshalJSON (see [Go json documentation](https://golang.org/pkg/encoding/json/#Marshal)) and returns it as type _string_. For example `{{json .TimeHour}}` outputs type _string_; before this `.TimeHour` was of type _time.Duration_. Basically it's good to use if multistep type conversion is needed `(toString (toInt value) )` and certain parts of `cembed` need this for example. `flag` part is a _bool_ and if set as **true** (**false** is optional) returns the value indented through MarshalIndent. |
| `jsonToSdict` value    | Returns `templates.SDict` from given JSON argument, e.g. `{{jsonToSdict `{"yagpdb":"is cool"}` }}` would print `map[yagpdb:is cool]`.                                                                                                                                                                                                                                                                                                                                                                                                              |
| `structToSdict` struct | Function converts exported field-value pairs of a _struct_ to an _sdict_. For example it is useful for editing embeds, rather than having to reconstruct the embed field by field manually. Example: `{{$x := cembed "title" "Something rules!" "color" 0x89aa00}} {{$x.Title}} {{$x = structToSdict $x}} {{- $x.Set "Title" "No, YAGPDB rules!!!" -}} {{$x.Title}} {{$x}}` will return No, YAGPDB rules!!! and whole sdict-mapped _cembed_.                                                                                                       |
| `toByte` "arg"         | Function converts input to a slice of bytes - meaning _[]uint8_. `{{toByte "YAG€"}}` would output `[89 65 71 226 130 172]`. `toString` is capable of converting that slice back to _string_.                                                                                                                                                                                                                                                                                                                                                       |
| `toDuration`           | Converts the argument, number or string to type _time.Duration_ - more duration related methods in [Go time documentation](https://pkg.go.dev/time#Duration). Number represents nanoseconds. String can be with time modifier (second, minute, hour, day etc) `s, m, h, d, w, mo, y`, without a modifier string will be converted to minutes. Usage: `(toDuration x)`. Example in section's [Snippets](#type-conversion-sections-snippets).                                                                                                        |
| `toFloat`              | Converts argument (_int_ or _string_ type of a number) to type _float64_. Usage: `(toFloat x)`. Function will return 0, if type can't be converted to _float64_.                                                                                                                                                                                                                                                                                                                                                                                   |
| `toInt`                | Converts something into an integer of type _int_. Usage: `(toInt x)`. Function will return 0, if type can't be converted to _int._                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `toInt64`              | Converts something into an _int64_. Usage: `(toInt64 x)`. Function will return 0, if type can't be converted to _int64._                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `toRune` "arg"         | Function converts input to a slice of runes - meaning _[]int32_. `{{toRune "YAG€"}}` would output `[89 65 71 8364]`. These two functions - the one above, are good for further analysis of Unicode strings. `toString` is capable of converting that slice back to _string_.                                                                                                                                                                                                                                                                       |
| `toString`             | Has alias `str`. Converts some other types into a _string_. Usage: `(toString x)`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

### Type conversion section's snippets

- To demonstrate `toDuration`, outputs 12 hours from current time in UTC.\
  `{{(currentTime.Add (toDuration (mult 12 .TimeHour))).Format "15:04"}}`is the same as`{{(currentTime.Add (toDuration "12h")).Format "15:04"}}` or`{{(currentTime.Add (toDuration 43200000000000)).Format "15:04"}}`

{{< callout context="tip" title="Tip" icon="outline/rocket" >}}

**Tip:** You can convert a Unicode code point back to its string equivalent using `printf "%c"`. For example, `printf
"%c" 99` would result in the string `c` as `99` is the Unicode code point for `c`.`printf` is briefly covered later on
in the next section, further documentation can be found in [Go formatting documentation](https://golang.org/pkg/fmt/).
[Printf cheat sheet](https://yourbasic.org/golang/fmt-printf-reference-cheat-sheet/).

{{< /callout >}}

## User

| **Function**                    | **Description**                                                                                                                                                                                                                                                       |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `currentUserAgeHuman`           | The account age of the current user in more human readable format.                                                                                                                                                                                                    |
| `currentUserAgeMinutes`         | The account age of the current user in minutes.                                                                                                                                                                                                                       |
| `currentUserCreated`            | Returns value of type _time.Time_ and shows when the current user was created.                                                                                                                                                                                        |
| \~`pastNicknames` userID offset | Same as `pastUsernames`.                                                                                                                                                                                                                                              |
| \~`pastUsernames` userID offset | Returns a _slice_ of type _[ ]\*logs.CCNameChange_ having fields .Name and .Time of previous 15 usernames and skips `offset` number in that list.`{{range pastUsernames .User.ID 0}}` <br>`{{.Name}} - {{.Time.Format "Jan _2 2006"}}` <br>`{{end}}`                  |
| `userArg` mention/userID        | Function that can be used to retrieve .User object from a mention or userID.`{{(userArg .User.ID).Mention}}` mentions triggering user. Explained more in [this section's snippets](#user-sections-snippets). Previous limit of 5 to this function is no longer there. |

### User section's snippets

`{{(userArg .Guild.OwnerID).String}}` this template's action-structure returns Guild/Server owner's username and
discriminator as of type _string_. First, `userArg` function is given `.Guild.OwnerID` as argument (what it does,
explained in [templates section](/docs/reference/templates/syntax-and-data#guild-server)). The parentheses surrounding them make `userArg` function return
`.User` as [.User object](/docs/reference/templates/syntax-and-data#user) which is handled further by `.String` method (ref.`.User.String`), giving a result
like > `YAGPDB#8760`.
