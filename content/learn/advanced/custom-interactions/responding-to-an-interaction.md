+++
title ="Responding to an Interaction"
weight = 413
+++


While technically not required, responding to an interaction with one of Discord's allotted initial responses is crucial
if you don't want your users to see an error after interacting, greatly improving user experience. An interaction may be
responded to only once.

You can only respond to an interaction within the custom command triggered by said interaction, with the exception that
a CC executed with `execCC` by the triggered CC will be able to send initial responses to the triggering interaction as
well.

## Initial Response

An initial response is the first response sent to an interaction. This response **must** be sent within 3 seconds of the
interaction being received, or the user will see a "This application did not respond" error.

Possible initial responses:

- Output text in your script response field. This text will be sent as an interaction response.
  - You can even use the `ephemeralResponse` function to make it _ephemeral_.
- Use the `sendResponse` function to send a response as soon as the function runs.
  - You can also use this to send `embeds` or `complexMessages`.
  - You'll need to send a `complexMessage` and pass it `"ephemeral" true` as an argument to send _ephemeral_ messages.
  - `sendResponse` comes in `NoEscape` and `RetID` variants too.
  - When sending an initial response, `sendResponse` does not need an interaction token, `nil` can be used.
- Use the `sendModal` function to show the user a modal. You cannot respond to a user submitting a modal by sending them
  another modal.
- Use the `updateMessage` function to edit the message the command triggered from. This works the same way as editing a
  message, however because it automatically targets the triggering message, the only argument required is the new
  message.

[Interaction Function documentation](/docs/reference/templates/functions#interactions)

## Following Up

Followups allow you to continue responding to an interaction after the initial response has been made. You can followup
for up to 15 minutes after the user interacts, and you can follow up as many times as you'd like. Followups require the
interaction token of the interaction they should be following up on.

Possible followups:

- Output text in your script response field. This text will be sent as an interaction followup.
  - You can even use the `ephemeralResponse` function to make it _ephemeral_.
- Use the `sendResponse` function to send a followup as soon as the function runs. Note that this function morphs into
  sending followups if an initial response has already been made.
  - You can also use this to send `embeds` or `complexMessages`.
  - `sendResponse` comes in `NoEscape` and `RetID` variants too.
  - It's important to capture the message ID of any
    followups you'll want to edit or retrieve later, especially if you follow up ephemerally. If you follow up
    ephemerally without saving the message ID, you'll never be able to interface with that message again.
- Use the `editResponse` function to edit an initial response or a followup message.
  - When editing an initial response, the `messageID` argument should be `nil`.
  - When editing a followup message, the `messageID` argument is required.
  - You can still edit any initial responses or followups using the standard `editMessage` function as long as they
    aren't _ephemeral_.
- Use the `getResponse` function to get an initial response or a followup message.
  - When getting an initial response, the `messageID` argument should be `nil`.
  - When getting a followup message, the `messageID` argument is required.
  - You can still get any initial responses or followups using the standard `getMessage` function as long as they
    aren't _ephemeral_.

[Interaction Function documentation](/docs/reference/templates/functions#interactions)

## Snippet

Here is a basic scenario where you need to use `editResponse` and `getResponse` to work with an _ephemeral_ followup
message. You cannot use the standard `editMessage` or `getMessage` for this because it is an ephemeral message.

```yag
{{ $interactionToken := .Interaction.Token }}
{{ sendResponse nil "Here's the first message!" }}
{{ $followupID := sendResponseRetID $interactionToken (complexMessage "content" "Here's a sneaky one!" "ephemeral" true) }}
{{ sleep 2 }}
{{ editResponse $interactionToken $followupID (print "I've edited this message to say " noun) }}
{{ $editedResponse := getResponse $interactionToken $followupID }}
{{ editResponse $interactionToken nil $editedResponse.Content }}
```

Here's a scenario where you would want to update a message.

```yag
{{ $button := cbutton "label" "I won!" "custom_id" "i_won" }}
{{ $content := printf "Press this button when you win! The last person who won was %s! They wanted to say they are a %s %s." .User.Mention adjective noun }}

{{ $message := complexMessageEdit "content" $content "buttons" $button }}
{{ updateMessage $message }}
```
