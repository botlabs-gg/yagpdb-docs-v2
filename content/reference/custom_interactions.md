+++
title = 'Custom Interactions'
weight = 6
+++

Buttons, Modals, Select Menus, Ephemeral Messages, and more!

<!--more-->

{{% notice warning %}}

Use of interactions within YAGPDB is an advanced topic; you will need a thorough understanding of YAGPDB's scripting
language before learning interactions.

We have a [comprehensive learning course](https://learn.yagpdb.xyz) for you to get started.

{{% /notice %}}

## The Basics

Interactions within Discord allow server members to use alternative, built-in features to trigger bots to take action
other than messages or reactions. These features include builtin buttons, dropdown selection menus, or submitting a
modal (basically a pop-up form). Within custom commands it is possible to not only create and customize these new
interactive features, but respond to them as well, opening up new possibilities for ephemeral message responses, modals,
and more within YAGPDB custom templating script.

### Interaction Lifetime

An interaction's lifetime starts with the initial *interaction* with an *interactive element*.

1. A server member clicks on a *button*, uses a *menu*, or submits a *modal* after filling it out.
2. This interaction is sent to YAGPDB, and becomes available to trigger any custom commands which match it.
3. Within the triggered custom command(s), YAGPDB should then *respond* once to the interaction, sending a message,
   updating the triggering message, or sending a modal. This may only be done within the CC which was triggered by the
   interaction.
4. *(optional)* Continue to send followup responses for up to 15 minutes until the interaction token expires.

{{< mermaid >}}
graph LR;
    A[Button pressed] --> B{CC Triggered}
    C[Menu used] --> B
    D[Modal submitted] --> B
    B --> E[Bot sends message response]
    B --> G[Bot sends modal response]
    B --> H[Bot updates message]
    E -.-> F(Bot sends followups)
    G -.-> F
    H -.-> F
{{< /mermaid >}}

### Definitions

Interaction
: A user engaging with YAGPDB through one of Discord's builtin features: Clicking a button, Making a
selection with a select menu, or Submitting a modal.

Response
: YAGPDB is required to respond promptly after receiving an interaction by either sending a message or modal, or by
updating the message on which the interaction was triggered. If it does not do this, the user triggering the interaction
will see a "This application did not respond" error. The bot cannot respond to an interaction more than once.

Followup
: Since YAGPDB may only *respond* to an *interaction* once, it is subsequently required to send an interaction
followup if it still needs to interface with the interaction. These followups can be sent up to 15 minutes after the initial
interaction, and you can send as many as you want. YAGPDB may only send a followup in one of the following ways: Sending
a followup message, editing an initial response or previous followup message, or getting an initial response or previous
followup message.

Interactive Elements
: Elements users can interact with to send *interactions*, i.e. buttons, menus, and modals.

Message Components
: *Interactive Elements* which can be attached to YAGPDB's Discord messages, i.e. buttons and menus.

Button
: A button appearing in or under a Discord message sent by YAGPDB. You can create and customize these
buttons' appearance and behavior with color, emoji, label text, etc. When a button is clicked, an *interaction* is sent
to the bot.

Menu
: A dropdown select menu appearing in or under a Discord message sent by YAGPDB. You can create and customize these
menus' appearance and behavior with placeholder text, predefined options with labels, descriptions, and/or emojis,
designate the entire menu as a user or role select menu instead, etc. When a select menu is used, an *interaction* is sent
to the bot.

Modal
: A pop-up form YAGPDB can send in response to an interaction. It allows users to privately input text which
is sent directly to YAGPDB for use in CC scripting. You can create and customize these modals' appearance and
behavior with a title and fields. YAGPDB can both **receive a submitted modal** (which is an
*interaction*), and **send a modal** for a member to fill out, (which is an interaction *response*).

Ephemeral
: An ephemeral message is sent to a server channel but only appears to a single user. YAGPDB cannot send
these ephemeral messages to users except in response to an *interaction*. Both *response* messages and *followup*
messages can be ephemeral.

## Creating Interactive Elements

Before you can start triggering Custom Commands with interactive elements, you'll need to have elements to interact
with. *Message Components* can be created and sent with `complexMessage` and `sendMessage`. *Modals* need a triggering
*interaction* to be sent, meaning you'll only be able to show a modal after a user has used a message component.

### Creating Message Components

#### Basics

Let's examine how to make a basic button.

```go
{{ $button := cbutton "label" "Button" }}
{{ $message := complexMessage "buttons" $button }}
{{ sendMessage nil $message }}
```

Result:

![A basic button](basic_button.png)

We've successfully made a basic button. Currently this button doesn't do anything when we click it. That's because it
doesn't have an ID that YAGPDB can use to trigger any other custom commands. For our next iteration, we'll add a custom
ID which can trigger a custom command.

##### Custom IDs

{{% notice info %}}

Multiple buttons and menus can not have the same custom ID in one message.

{{% /notice %}}

```go
{{ $button := cbutton "label" "Button" "custom_id" "buttons-duck" }}
{{ $message := complexMessage "buttons" $button }}
{{ sendMessage nil $message }}
```

This button will now trigger the following custom command:

![A custom command triggering on the message component custom ID "duck"](duck_trigger.png)

This custom command will trigger on any message component, either button or menu, whose custom ID contains the word "duck."

##### Multiple Components

Now, let's add some more buttons.

{{% notice info %}}

Buttons with the "link" style cannot have a Custom ID, and instead require a URL field.

Link style buttons do not trigger *interactions*.

{{% /notice %}}

```go
{{ $button1 := cbutton "label" "Duck One" "custom_id" "buttons-duck-alpha" "style" "success" }}
{{ $button2 := cbutton "emoji" (sdict "name" "🦆") "custom_id" "buttons-duck-beta" "style" "danger" }}
{{ $button3 := cbutton "label" "Duck Three" "emoji" (sdict "name" "🦆") "url" "https://yagpdb.xyz" "style" "link" }}
{{ $message := complexMessage "buttons" (cslice $button1 $button2 $button3) }}
{{ sendMessage nil $message }}
```

![Many buttons](many_buttons.png)

At this stage we have three buttons. Both of the first two buttons will trigger our duck trigger custom command, but the
third button will not trigger any custom command. Link buttons do not create *interactions*.

We can differentiate between the two buttons using `.StrippedID`, which, just like `.StrippedMsg`, returns our Custom ID
without the trigger and everything else before that. In our example, `.StrippedID` will return `-alpha` for the first
button and `-beta` for the second button.

Confirming this behavior will be left as an exercise to the reader (you).

Let's add in a select menu now.

```go
{{ $button1 := cbutton "label" "Duck One" "custom_id" "buttons-duck-alpha" "style" "success" }}
{{ $button2 := cbutton "emoji" (sdict "name" "🦆") "custom_id" "buttons-duck-beta" "style" "danger" }}
{{ $button3 := cbutton "label" "Duck Three" "emoji" (sdict "name" "🦆") "url" "https://yagpdb.xyz" "style" "link" }}

{{ $menu := cmenu
  "type" "text"
  "placeholder" "Choose a terrible thing"
  "custom_id" "menus-duck-alpha"
  "options" (cslice
    (sdict "label" "Ducks" "value" "opt-1" "default" true)
    (sdict "label" "Duck" "value" "opt-2" "emoji" (sdict "name" "🦆"))
    (sdict "label" "Half a Duck" "value" "opt-3" "description" "Don't let the smaller amount fool you."))
  "max_values" 3 }}

{{ $message := complexMessage "buttons" (cslice $button1 $button2 $button3) "menus" $menu }}
{{ sendMessage nil $message }}
```

![Buttons and menus](buttons_and_menus.png)

We now have two buttons and a menu which are triggering our duck custom command. We used to branch with `.StrippedID`,
but now since we have two components whose stripped IDs are `-alpha`, we'll need to branch with `.IsMenu` too. If our
custom command was triggered by the use of this select menu, we could also see that `.MenuType` returns `"string"`,
since this menu is a string select type menu.

##### Ordering Message Components

A message can have 5 rows of components.
A row of components can have 5 buttons, **or** 1 menu.

Let's say we want to play tic tac toe. If we just add 9 buttons into the same slice in our complex message, they'll just
fill the first row with 5 buttons and the second row with 4, which isn't what we're looking for. Here's a solution:

```go
{{ $blankEmoji := sdict "name" "⬜" }}

{{ $row1 := cslice (cbutton "emoji" $blankEmoji "custom_id" "tictactoe-button-1" "style" "secondary") (cbutton "emoji" $blankEmoji "custom_id" "tictactoe-button-2" "style" "secondary") (cbutton "emoji" $blankEmoji "custom_id" "tictactoe-button-3" "style" "secondary") }}
{{ $row2 := cslice (cbutton "emoji" $blankEmoji "custom_id" "tictactoe-button-4" "style" "secondary") (cbutton "emoji" $blankEmoji "custom_id" "tictactoe-button-5" "style" "secondary") (cbutton "emoji" $blankEmoji "custom_id" "tictactoe-button-6" "style" "secondary") }}
{{ $row3 := cslice (cbutton "emoji" $blankEmoji "custom_id" "tictactoe-button-7" "style" "secondary") (cbutton "emoji" $blankEmoji "custom_id" "tictactoe-button-8" "style" "secondary") (cbutton "emoji" $blankEmoji "custom_id" "tictactoe-button-9" "style" "secondary") }}

{{ $menu := cmenu
  "type" "text"
  "placeholder" "Control Panel"
  "custom_id" "tictactoe-menu"
  "options" (cslice
    (sdict "label" "Forfeit" "value" "forfeit")
    (sdict "label" "Toggle Notifications" "value" "notifs"))}}

{{ $message := complexMessage "buttons" $row1 "buttons" $row2 "buttons" $row3 "menus" (cmenu "type" "mentionable") }}
{{ sendMessage nil $message }}
```

![Tic Tac Toe](tictactoe.png)

#### Advanced (Variable Row Counts)

When working with multiple components in advanced flows where final number and order of buttons and menus is variable,
the basic structure of building components with `complexMessage` will be inefficient for your needs.

Take the following scenario: You are building a turn-based combat game with a variable number of enemies. For each enemy
you need a button to attack them, and a button to befriend them. You also want each enemy's buttons on a separate row.

If you always had three enemies, this code would look something like this:

```go
{{ $message := complexMessage
  "content" "Dragon, Ogre, Duck, attack you!"
  "buttons" (cslice
    (cbutton "label" "Attack Dragon" "style" "red" "custom_id" "attack-dragon")
    (cbutton "label" "Befriend Dragon" "style" "green" "custom_id" "befriend-dragon"))
  "buttons" (cslice
    (cbutton "label" "Attack Ogre" "style" "red" "custom_id" "attack-ogre")
    (cbutton "label" "Befriend Ogre" "style" "green" "custom_id" "befriend-ogre"))
  "buttons" (cslice
    (cbutton "label" "Attack Duck" "style" "red" "custom_id" "attack-duck")
    (cbutton "label" "Befriend Duck" "style" "green" "custom_id" "befriend-duck")) }}
{{ sendMessage nil $message }}
```

![Invariable Solution](invariable_solution.png)

However, we need the number of rows present on the message to be variable. With this method, it is impossible to do this
without building a completely different `complexMessage` for each number of enemies.

##### Quick Solution

A quick solution to this problem is to pass all of our buttons into one `"buttons"` value. Overflowing `"buttons"`,
`"menus"`, or even `"components"` with more components than the row can take (i.e 6+ buttons or 2+ menus) results in the
function automatically distributing the components to new rows.

```go
{{ $msg1 := complexMessage
  "content" "Message 1"
  "buttons" (cslice (cbutton "label" "Button") (cbutton "label" "Button") (cbutton "label" "Button") (cbutton "label" "Button") (cbutton "label" "Button") (cbutton "label" "Button") (cbutton "label" "Button"))
  "menus" (cslice (cmenu "type" "mentionable") (cmenu "type" "mentionable") (cmenu "type" "mentionable")) }}

{{ $msg2 := complexMessage
  "content" "Message 2"
  "components" (cslice (cbutton "label" "Button") (cmenu "type" "mentionable") (cmenu "type" "mentionable") (cbutton "label" "Button") (cbutton "label" "Button")) }}

{{ sendMessage nil $msg1 }}
{{ sendMessage nil $msg2 }}

```

![Distributed Components](distributed_components.png)

This solution fills up each row with as many components as it can hold and then starts a new one. This is all we need
for most commands, but for our turn-based combat scenario, we only want two or three buttons in each row.

##### Full Solution

To account for a variable amount of rows while maintaining full customization, we will introduce a new field:
`"components"`. Where `"buttons"` and `"menus"` must be a slice of buttons or menus respectively, `"components"`
must be a slice of `rows` of buttons/menus.

A `row` must also be a slice. It either contains 1-5 buttons, *or* a single select menu.

Below is an example of a `components` structure.

{{< mermaid >}}
graph TB
    subgraph Components
        subgraph Row 1
            b1((Button))
            b2((Button))
            b3((Button))
            b4((Button))
        end
        subgraph Row 2
            b5((Button))
            b6((Button))
        end
        subgraph Row 3
            m1[Select Menu]
        end
        subgraph Row 4
            b7((Button))
            b8((Button))
            b9((Button))
        end
        subgraph Row 5
            m2[Select Menu]
        end
    end
{{< /mermaid >}}

In scripting, this manifests from the following code:

```go
{{ $row1 := cslice (cbutton "label" "Button") (cbutton "label" "Button") (cbutton "label" "Button") (cbutton "label" "Button") }}
{{ $row2 := cslice (cbutton "label" "Button") (cbutton "label" "Button") }}
{{ $row3 := cslice (cmenu "type" "mentionable") }}
{{ $row4 := cslice (cbutton "label" "Button") (cbutton "label" "Button") (cbutton "label" "Button") }}
{{ $row5 := cslice (cmenu "type" "mentionable") }}

{{ $rows := cslice $row1 $row2 $row3 $row4 $row5 }}

{{ $message := complexMessage "components" $rows }}
{{ sendMessage nil $message }}
```

Which produces this message:

![Message with Manually Distributed Components](manually-distributed-components.png)

When applying this new skill to our turn-based combat game, the code looks something like this:

```go
{{ $rows := cslice }}
{{ $enemies := cslice "Dragon" "Ogre" "Duck" }}

{{ range $enemyName := $enemies }}
  {{ $nameButton := cbutton "label" $enemyName "style" "grey" "disabled" true }}
  {{ $attackButton := cbutton "label" "Attack" "style" "red" "custom_id" (print "attack-" (lower $enemyName)) }}
  {{ $befriendButton := cbutton "label" "Befriend" "style" "green" "custom_id" (print "befriend-" (lower $enemyName)) }}

  {{ $currentRow := cslice $nameButton $attackButton $befriendButton }}
  {{ $rows = $rows.Append $currentRow }}
{{ end }}

{{ $promptText := joinStr ", " "Suddenly" $enemies "attack you!" }}
{{ $message := complexMessage "content" $promptText "components" $rows }}
{{ sendMessage nil $message }}
```

![Result of the Full Solution Code](full-variable-row-solution.png)

#### Emojis in Message Components

Buttons and Select Menu Options both have an `"emoji"` field, but this field does not accept the regular unicode/name:id
formula like reactions do. Emojis in components follow the [partial emoji
object](https://discord.com/developers/docs/resources/emoji#emoji-object) structure.

|Field|Description|
|-|-|
|ID|ID of the emoji, only necessary when using Custom Emoji.|
|Name|Name of the emoji. For unicode (builtin) emojis, use the unicode character here.|
|Animated|Boolean, true if the emoji is animated.|

```go
{{ $unicodeEmojiButton := cbutton "emoji" (sdict "name" "😀") }}
{{ $customEmojiButton := cbutton "emoji" (sdict "name" "ye" "id" "733037741532643428") }}
{{ $animatedEmojiButton := cbutton "emoji" (sdict "name" "yenop" "id" "786307104247775302" "animated" true) }}

{{ $components := cslice $unicodeEmojiButton $customEmojiButton $animatedEmojiButton }}
{{ sendMessage nil (complexMessage "components" $components)}}
```

### Creating Modals

Modals are created, either as an `sdict` or using `cmodal`. After being created they are subsequently sent with
`sendModal`. Sending a modal is a *response* to an interaction, meaning it can only be sent once after a user clicks a
button or uses a select menu. You cannot send a modal as a response to a user submitting a modal.

#### Modal structure

|Field|Description|
|-|-|
|Title|The modal's title, appears at the top of the modal while a user is filling it out.|
|Custom ID|The Custom ID is referenced to trigger a custom command when the modal is submitted (which you'll need to do if you care about retrieving what the user inputted).|
|Fields|A slice of [discordgo.TextInputComponent](https://discord.com/developers/docs/interactions/message-components#text-input-object)s.|

```go
{{ $modal := sdict
  "title" "My Custom Modal"
  "custom_id" "modals-my_first_modal"
  "fields" (cslice
    (sdict "label" "Name" "placeholder" "Duck" "required" true)
    (sdict "label" "Do you like ducks?" "value" "Heck no")
    (sdict "label" "Duck hate essay" "min_length" 100 "style" 2)) }}
{{ sendModal $modal }}
```

![Modal Example](modal_example.png)

## Parsing an Interaction

Custom Commands with the [Message Component](/custom-commands/commands#component) or [Modal
Submission](/custom-commands/commands#modal) trigger allow you to take action upon the press of a button, use of a
select menu, or completion of a modal form. Interaction triggers provide new context data for templating.

Important interaction context data

|**Field**| **Description**|
|-| -|
|.Interaction.Token| The interaction's token. Is unique to each interaction. Required for sending [followup interactions](functions#interaction-followups).|
|.CustomID| The triggering component/modal's Custom ID. Note: This custom ID excludes the `templates-` prefix which is added to all components and modals under the hood.|
|.StrippedID| "Strips" or cuts off the triggering part of the custom ID and prints out everything else after that. Bear in mind, when using regex as trigger, for example `"day"` and input custom ID is `"have-a-nice-day-my-dear-YAG"` output will be `"-my-dear-YAG"`  - rest is cut off.|
|.Values| List of all options selected with a select menu, OR all values input into a modal in order.|

[Interaction object and context data](/reference/templates#interaction)

`.Interaction.Token` must be provided to any [followup](#following-up) functions you decide to use later. If you are
using these in subsequent script executions, it's a good idea to save this to database when the interaction occurs.

`.CustomID` can be used to identify which component or modal triggered the command. `.StrippedID` can be used to quickly
parse out arguments in your custom ID, and use them in your response.

Example: An UNO custom command system where all uno buttons are parsed in the same custom command, a component trigger
with the trigger field `uno-`. This can take individual action for a button with custom ID `uno-join` and one with
`uno-leave`.

```go
{{ if eq .StrippedID "join" }}
	{{ sendResponse nil "You joined the UNO game!" }}
{{ else if eq .StrippedID "leave" }}
	{{ sendResponse nil "You left the UNO game :(" }}
{{ end }}
```

`.Values` is used to capture values a user selected in a select menu or submitted to a modal. When creating a select
menu and defining the options, the `"value"` field for each option defines which values will show up in this slice if
chosen. A modal's values are simply the values of each field in order.

Example: A user has chosen an option in a select menu whose value is `blue-7`, triggering the following command which will
determine if it is a playable card.

```go
{{ $cardRaw := index .Values 0 }} {{/* "blue-7" */}}
{{ $cardSplit := split $cardRaw "-" }} {{/* ["blue" "7"] */}}
{{ $playedCard := sdict
  "Color" ( index $cardSplit 0 )
  "Number" ( index $cardSplit 1 )}}

{{ $previousCard := ( dbGet .Channel.ID "uno-last-card" ).Value }}
{{ $validCard := or
  (eq $playedCard.Color $previousCard.Color)
  (eq $playedCard.Number $previousCard.Number) }}

{{ if $validCard }}
  {{ sendResponse nil (print .User " played a " $playedCard.Color $playedCard.Number) }}
  {{ dbSet .Channel.ID "uno-last-card" $playedCard }}
{{ else }}
  {{ sendResponse nil "You can't play that card!" }}
{{ end }}
```

Example 2: A user is setting up a new UNO game with a modal, they've filled out a 'number of decks in play' and a
'minimum number of cards to play' field, triggering the following command which will update those values in database.

![A modal for setting up a game of UNO](uno-modal.png)

```go
{{ $numberOfDecks := index .Values 0 }}
{{ $minCardsForUNO := index .Values 1 }}

{{ dbSet .Channel.ID "uno-decks" ( toInt $numberOfDecks ) }}
{{ dbSet .Channel.ID "uno-min_for_uno" ( toInt $minCardsForUNO ) }}
```

## Responding to an Interaction

### Initial Response

While technically not required, responding to an interaction with one of Discord's allotted initial responses is crucial
if you don't want your users to see an error after interacting. An interaction may be responded to one time.

You can only respond to an interaction within the custom command triggered by said interaction.

Possible initial responses:

- Output text in your script response field. This text will be sent as an interaction response.
  - You can even use the `ephemeralResponse` function to turn it *ephemeral*.
- Use the `sendResponse` function to send a response as soon as the function runs.
  - You can also use this to send `embeds` or `complexMessages`.
  - You'll need to send a `complexMessage` and pass it `"ephemeral" true` as an argument to send *ephemeral* messages.
  - `sendResponse` comes in `NoEscape` and `RetID` variants too.
  - When sending an initial response, `sendResponse` does not need an interaction token, `nil` can be used.
- Use the `sendModal` function to show the user a modal. You cannot respond to a user submitting a modal by sending them
  another modal.
- Use the `updateMessage` function to edit the message the command triggered from. This works the same way as editing a
  message.

[Interaction Function documentation](/reference/templates/functions#interactions)

### Following Up

Followups allow you to continue responding to an interaction after the initial response has been made. You can followup
for up to 15 minutes after the user interacts, and you can follow up as many times as you'd like. Followups require the
interaction token of the interaction they should be following up on.

Possible initial responses:

- Output text in your script response field. This text will be sent as an interaction followup.
  - You can even use the `ephemeralResponse` function to turn it *ephemeral*.
- Use the `sendResponse` function to send a followup as soon as the function runs. Note that this function morphs into
  sending followups if an initial response has already been made.
  - You can also use this to send `embeds` or `complexMessages`.
  - `sendResponse` comes in `NoEscape` and `RetID` variants too.
  - It's important to capture the message ID of any
    followups you'll want to edit or retrieve later, especially if you followup ephemerally. If you followup ephemerally
    without saving the message ID, you'll never be able to interface with that message again.
- Use the `editResponse` function to edit an initial response or a followup message.
  - When editing an initial response, the `messageID` argument should be `nil`.
  - When editing a followup message, the `messageID` argument is required.
  - You can still edit any initial responses or followups using the standard `editMessage` function as long as they
    aren't *ephemeral*.
- Use the `getResponse` function to get an initial response or a followup message.
  - When getting an initial response, the `messageID` argument should be `nil`.
  - When getting a followup message, the `messageID` argument is required.
  - You can still get any initial responses or followups using the standard `getMessage` function as long as they
    aren't *ephemeral*.

[Interaction Function documentation](/reference/templates/functions#interactions)

### Snippet

Here is a basic scenario where you need to use `editResponse` and `getResponse` to work with an *ephemeral* followup
message. You couldn't use the standard `editMessage` or `getMessage` for this because it is an ephemeral message.

```go
{{ $interactionToken := .Interaction.Token }}
{{ sendResponse nil "Here's the first message!" }}
{{ $followupID := sendResponseRetID $interactionToken (complexMessage "content" "Here's a sneaky one!" "ephemeral" true) }}
{{ sleep 2 }}
{{ editResponse $interactionToken $followupID (print "I've edited this message to say " noun) }}
{{ $editedResponse := getResponse $interactionToken $followupID }}
{{ editResponse $interactionToken nil $editedResponse.Content }}
```
