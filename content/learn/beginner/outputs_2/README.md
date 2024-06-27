---
description: Advanced sending and editing messages.
---

# Outputs 2

## Sending Messages

Up until now we have seen how to use the default [response](https://yagpdb.gitbook.io/learnyagpdb/beginner/outputs\_1#response) to send an output. However it is sometimes a bit inconvenient to use the response for producing an output. Also the output is always sent in the same channel in which the custom command is running. To solve these issues and offer more flexibility in terms of producing outputs there are specific output actions.

### `sendMessage`

This is the most basic and simple form of an output action. The general syntax for `sendMessage` action is :

```go
{{sendMessage channel_id message_to_be_sent}}
```

The `channel_id` is the ID of the channel in which the message is to be sent. For sending the message in the same channel as the one in which the custom command is running, `channel_id` can be set to `nil`.

`message_to_be_sent` denotes the output that is to be sent as a message.In this chapter we will deal with only simple textual output (strings).\
\
It is important to note that `sendMessage` function by itself is an task type action , that is it does not produce a meaningful/usable output by itself. It simply directs the bot to send the content that is passed to it in a **separate message** from the custom command's default [response](https://yagpdb.gitbook.io/learnyagpdb/beginner/outputs\_1#response) message.

#### Example 1 :

`{{sendMessage nil "Hello World"}}`\
\
**Output:**

![](<../../.gitbook/assets/image (13).png>)

**Explanation :**\
As discussed earlier, the `sendMessage` action here simply sends the string as output message in the same channel as the one in which the custom command is running.

#### Example 2 :

`This is the response message{{sendMessage nil "This is a separate message"}}!`

**Output :**\\

***

![](<../../.gitbook/assets/image (14).png>)

**Explanation :**\
\
As discussed earlier, the `sendMessage` function sends a **separate message** as output which is different from the custom command's default response message. The `sendMessage` function being an task type action producing no meaningful output is also shown in the above example. That is the reason why the `!` appears directly after `message` in the response message although if you look at the original code the `sendMessage` function was placed between them.

{% hint style="info" %}
In the previous example it is important to note that the `sendMessage` function's output message is sent before the custom command's response message. The reason for this is that the response is generated only after the execution of the custom command is finished however the `sendMessage` function directs the bot to send a message during its execution.\
Example :\
`third{{sendMessage nil "first"}}{{sendMessage nil "second"}}`\
Output :\
![](<../../.gitbook/assets/image (15).png>)
{% endhint %}

### `sendMessageNoEscape`

As we have already mentioned earlier in case of [response](https://learn.yagpdb.xyz/beginner/outputs\_1#mentions-and-custom-emojis), certain mentions such as role mentions, `@everyone` and `@here` are escaped by default. This is also valid for `sendMessage` function as well. However if you want these mentions to be not escaped you should use `sendMessageNoescape` function. It is important to note that unlike response, using mention based functions such as `mentionHere` does not create a mention with `sendMessage` function. You must use `sendMessageNoEscape` for these special mentions to work. Also, just like `sendMessage` , `sendMessageNoEscape` is a purely action based function producing no meaningful/usable output.\
\
**Example :**

```go
{{sendMessage nil "@here"}}{{sendMessage nil (mentionEveryone)}}
{{sendMessageNoEscape nil "@here"}}
```

**Output :**

![](<../../.gitbook/assets/image (32).png>)

**Explanation :**

In the above example, as already discussed `sendMessage` function never produces a special mention no matter how the special mention is produced. The third output belongs to the `sendMessageNoEscape` function which produces a mention.

### `sendMessageRetID` and `sendMessageNoEscapeRetID`

These actions are very similar to their counterparts `sendMessage` and `sendMessageNoEscape` except that they also output the ID of the discord message posted by them during execution. Hence these two actions both perform and action and produce an output placing them under the third category of actions. This is especially useful for editing messages. The ID output by them can be simply captured by any variable just like any other action which produces an output for later use.

**Example :**

```go
First Message ID = {{sendMessageRetID nil "Yag is cool"}}
{{$ID:= sendMessageRetID nil "I know!" -}}
Second Message ID = {{$ID}}
```

**Output :**

![](<../../.gitbook/assets/image (28).png>)

**Explanation :**

The execution order is as follows - initially the first `sendMessage` function is executed and posts a message `Yag is cool`. It outputs it's message ID which becomes a part of the response since it is not captured by a variable. Then, the second `sendMessage` function is executed and posts the second message `I know!`. The ID of this message is captured by a variable $ID later used for forming the response. At the end of program execution, response is posted as a separate message.

{% hint style="info" %}
Note : These actions output an ID only if the bot was successful in posting a message. If it was unable to post an output, due to bot lacking permissions or invalid channel id passed, it produces no meaningful output just like `sendMessage` .\
The output in these cases is simply an empty string "" which corresponds to the zero value of String datatype! Interestingly, all pure action based actions also output an empty string.
{% endhint %}

## Editing Messages

We have seen how to send messages. Editing messages is an almost similar except it additionally requires you to also specify the ID of the message to edit. It is important to note that bots can only edit messages sent by the bot itself.

### `editMessage`

This action is very similar to the `sendMessage` function and just requires and additional message ID argument. The syntax is :

```go
{{editMessage channel_id message_id new_message}}
```

The `channel_id` is the ID of the channel in which the message to be edited exists and `message_id` is the ID of the message to be edited. `new_message` contains the new output or modification. In this chapter we will deal with only simple textual output (strings).

**Example :**

```go
{{$ID := sendMessageRetID nil "Yag is ..."}}{{sleep 1}}
{{editMessage nil $ID "Yag is ... very nice"}}
```

**Explanation :**

In the above snippet, bot first sends a message : `Yag is ...` . Since `sendMessageRetID` function is used, the ID of the message posted by the bot is also output by the action and stored in a variable $ID. Notice the usage of a new action called `sleep`. `sleep` function makes the bot wait without performing any action for a given amount in seconds(maximum cumulative 60 seconds of sleep per CC). In this case, `{{sleep 1}}` instructs the bot to not perform any action for 1 second. After that the message posted earlier is edited by using the `editMessage` function. Notice that `editMessage` function requires both the ID of the channel and the message itself to be edited. In the above case the channel id is `nil` since it refers to the same channel in which the CC is executed. The message id is stored in the variable $ID. The final edited output is : `Yag is ... very nice` .

### `editMessageNoEscape`

`editMessageNoEscape` is very similar to the `sendMessageNoEscape` function and simply requited the message id as an additional argument. Similar to `sendMessage` , `editMessage` function always suppresses/escapes all special mentions in message content (role mentions or @here or @everyone). Escape as usual means that the output will not create any pings or highlight. In order for special mentions to work, `editMessageNoEscape` must be used.

**Example :**

```go
{{$ID := sendMessageNoEscapeRetID nil "Hello @everyone"}}
{{sleep 1}}
{{editMessage nil $ID "Hello @everyone! Good Day!"}}
{{sleep 1}}
{{editMessageNoEscape nil $ID "Hello @everyone! Good Day!"}}
```

**Output :**

Initial Message sent by `sendMessageNoEscapeRetID`

![](<../../.gitbook/assets/image (29).png>)

After first edit by `editMessage`

![](<../../.gitbook/assets/image (30).png>)

After second edit by `editMessageNoEscape`

![](<../../.gitbook/assets/image (31).png>)

**Explanation :**

The first message is send used `sendMessageNoEscape` and hence produces an `@everyone` mention. It also outputs the ID of the message posted which is stored in variable $ID. Using this message ID, and with `nil` as channel ID, `editMessage` performs the first edit to the message after 1 second (due to `{{sleep 1}}`. `editMessage` function escapes all special mentions and hence the `@everyone` appears as plain text. After another 1 second, `editMessageNoEscape` re-edits the message producing the `@everyone` again.

## Example Codes

### Example 1

Following is a simple announce command.

```go
{{$args := parseArgs 2 "Syntax is -announce <channel> <text>" 
(carg "channel" "channel to send to")
(carg "string" "text to send")}}

{{sendMessageNoEscape ($args.Get 0).ID ($args.Get 1)}}
```

#### Explanation :

Above example represents a simple "announce" command. It accepts two arguments, the first being the channel (ID/Mention) of the channel to send message to and the second is the string which consists of all text passed after the first argument. Note that we use `sendMessageNoEscape` here rather than simple `sendMessage` because announcements often have certain special mentions which we do not intend to escape here.
