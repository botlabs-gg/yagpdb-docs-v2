+++
title = 'Effects'
weight = 434
description = 'Effects define what happens when a rule is triggered and all conditions are met. This page covers the different effect types in Advanced Automoderator.'
+++

Effects define what happens when a rule is triggered and all conditions are met.
This page covers the different effect types in Advanced Automoderator.

## Quick Intro

This page lists all the available effects in the order as they appear on the control panel.
Use the Table of Contents in the top left corner of this page alongside your browser's search function to quickly navigate to the effect you're looking for.

### Effect Logic

All effects will be executed once all prior checks are met — that is, the effects are combined according to the logical AND operator.

#### Delete Message

Delete the message that triggered the rule.

#### +Violation

Add a violation to the user's record.
This is useful for tracking user behavior over time.

- **Name**<br>
    The name of the violation. (Default: None)

#### Kick user

Kick the user that triggered the rule.

- **Custom message**<br>
    A custom reason for the kick. (Default: None)

#### Ban user

Ban the user that triggered the rule.

- **Duration**<br>
    The duration of the ban in minutes. 0 for permanent. (Default: 0)
- **Custom message**<br>
    A custom reason for the ban. (Default: None)
- **Number of days to delete**<br>
    How many days of that user's message history to delete. 0 to 7 days. (Default: 0)

#### Mute user

Mute the user that triggered the rule.

- **Duration**<br>
    The duration of the mute in minutes. 0 for permanent. (Default: 0)
- **Custom message**<br>
    A custom reason for the mute. (Default: None)

#### Warn user

Warn the user that triggered the rule.

- **Custom message**<br>
    A custom reason for the warning. (Default: None)

#### Set nickname

Set the nickname of the user that triggered the rule.

- **New Nickname** <br> The new nickname for the user.
    Empty for removal. (Default: None)

#### Reset violations

Reset the violations of the user that triggered the rule.

- **Name**<br>
    The name of the violation to reset. (Default: None)

#### Delete multiple messages

Delete multiple messages from the user that triggered the rule.

- **Number of messages**<br>
    The number of messages to delete. (Default: 3)
- **Max age**<br>
    The maximum age of the messages to delete in seconds. (Default: 15)

#### Give role

Give a role to the user that triggered the rule.

- **Duration**<br>
    The duration of the role in seconds. 0 for permanent. (Default: 0)
- **Role**<br>
    The role to give to the user. (Default: first role in hierarchy)

#### Enable Channel slowmode

Enable slowmode in the channel where the rule was triggered.

- **Duration**<br>
    The duration of the slowmode in seconds. 0 for permanent. (Default: 0)
- **Ratelimit**<br>
    The minimum time that has to pass between a single user's messages. (Default: 0)

#### Remove role

Remove a role from the user that triggered the rule.

- **Duration**<br>
    The duration of the role in seconds. 0 for permanent. (Default: 0)
- **Role**<br>
    The role to remove from the user. (Default: first role in hierarchy)

#### Send Message

Send a custom message.

- **Custom message** <br> The message to send.
    Max 280 characters. (Default: (empty))
- **Delete after** <br> The duration in seconds after which to delete the message. 0 for never.
    Max 3600 seconds. (Default: 0)
- **Ping user**<br>
    Whether to ping the user that triggered the rule. (Default: false)
- **Channel to send to**<br>
    The channel to send the message to. (Default: same channel)

#### Timeout user

Timeout the user that triggered the rule.
This is different from [Mute user](#mute-user) as it uses Discord's timeout functionality instead of applying a muted role.

- **Duration**<br>
    The duration of the timeout in minutes. (Default: 0)
- **Custom message**<br>
    A custom reason for the timeout. (Default: None)

#### Send Alert

Sends an embed to the specified channel with some information about the triggered rule, similar to Discord's inbuilt automoderator alerts.

- **Custom message** <br> The message to send.
    Max 280 characters. (Default: (empty))
- **Channel to send alert embed in**<br>
    The channel to send the alert to. (Default: same channel as the rule was triggered in)
