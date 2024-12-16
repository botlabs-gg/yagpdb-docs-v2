+++
title = 'Triggers'
weight = 432
+++

Triggers define when a rule should be checked. This page will explain the available triggers and their configuration
options.

<!--more-->

## Quick Intro

This page lists all the available triggers in the order as they appear on the control panel. Use the Table of Contents
in the top left corner of this page alongside your browser's search function to quickly navigate to the trigger you're
looking for.

### Trigger Logic

Only one trigger has to be met for a rule to trigger — that is, the triggers are combined according to the logical OR
operator.

### List of Triggers

Following is a list of all available triggers, in the order they appear on the control panel.

#### All caps

This trigger fires when a message exceeds a certain percentage of uppercase characters. Following parameters are
available:

- **Min number of all caps**<br>
    The minimum number of uppercase characters in the message for the trigger to fire. (Default: 3)

- **Percentage of all caps**<br>
    The percentage of uppercase characters in the message for the trigger to fire. (Default: 100%)

- **Also match visually similar characters**<br>
    Whether to also match visually similar characters. (Default: off)

Both *Min number of all caps* and *Percentage of all caps* have to be met for this trigger to fire.

#### Message mentions

This trigger will fire when a message exceeds the configured threshold for *unique* user `@mention`s.

- **Min number of mentions**<br>
    The minimum number of unique mentions in the message for the trigger to fire. (Default: 4)

#### Any link

This trigger will fire when a message contains *any* valid link.[^1]

For more fine-grained control, consider using the [Website denylist](#website-denylist) or
[Website allowlist](#website-allowlist) trigger.

#### X Violations in y minutes

This will trigger when the offending user has amassed x violations in y minutes, filtered by the violation name.

- **Violation name**<br>
    The name of the violation to check for. (Default: `name`)

- **Number of violations**<br>
    The number of violations in the specified time frame for the trigger to fire. (Default: 4)

- **Within (minutes)**<br>
    The time frame in which the violations have to occur for the trigger to fire. (Default: 60)

- **Ignore if a higher violation trigger of this name was activated**<br>
    Whether to ignore this if a trigger with a higher threshold for the same violation was activated. (Default: on)

#### Word denylist

This trigger will fire when a message contains any word from the specified list.

- **List**<br>
    The list to check against. (Default: first found list)

- **Also match visually similar characters**<br>
    Whether to also match visually similar characters, like `Ĥéĺĺó`. (Default: off)

#### Word allowlist

Triggers when a message contains words **not** in the specified list. See [Word denylist](#word-denylist) for
configuration.

#### Website denylist

This trigger will fire when a message contains any link to a domain from the specified list, subdomains included.

- **List**<br>
    The list to check against. (Default: first found list)

#### Website allowlist

Triggers when a message contains links **not** in the specified list. See [Website denylist](#website-denylist).

Depending on your use-case, it may be more time-efficient to use a allowlist instead of a denylist.

#### Server invites

This trigger will fire when a message contains a server invite link, not counting invites to the current server.

Also includes some third-party websites, namely `discord.me`, `invite.gg`, `discord.io`, `discord.li`, `disboard.org`,
and `discordy.com`, these however will not ignore the current server.

#### Google flagged bad links

This trigger will fire when a message contains a link that Google has flagged as malicious.

#### x user messages in y seconds

This trigger will fire when the offending user has sent x messages in y seconds.

- **Messages**<br>
    The number of messages in the specified time frame for the trigger to fire. (Default: 5)

- **Within (seconds)**<br>
    The time frame in which the messages have to be sent for the trigger to fire. (Default: 5)

#### x channel messages in y seconds

This trigger will fire when the channel has received x messages in y seconds.

- **Messages**<br>
    The number of messages in the specified time frame for the trigger to fire. (Default: 5)

- **Within (seconds)**<br>
    The time frame in which the messages have to be sent for the trigger to fire. (Default: 5)

#### user: x mentions within y seconds

This trigger will fire when the offending user has mentioned x users in y seconds across several messages in one
channel.[^2]

- **Mentions**<br>
    The number of mentions in the specified time frame for the trigger to fire. (Default: 20)

- **Within (seconds)**<br>
    The time frame in which the mentions have to occur for the trigger to fire. (Default: 10)

- **Count multiple mentions to the same user**<br>
    Whether to account for multiple mentions to the same user. (Default: off)

#### channel: x mentions within y seconds

See [user: x mentions within y seconds](#user-x-mentions-within-y-seconds), but now applied to the channel as a
whole, instead of a single user.

#### Message matches Regex

This trigger will fire when a message matches the specified regular expression.[^3]

- **Regex**<br>
    The regular expression to match against. (Default: (empty))
- **Also match visually similar characters**<br>
    Whether to also match visually similar characters, like `Ĥéĺĺó`. (Default: off)

#### Message not matching Regex

The inverse of [Message matches Regex](#message-matches-regex). See there for configuration.

#### X consecutive identical messages

This trigger will fire when the offending user has sent x identical messages in a row. Messages sent by other users
in-between are ignored.[^2]

- **Threshold**<br>
    The number of identical messages in a row for the trigger to fire. (Default: 4)
- **Within (seconds)**<br>
    The time frame in which the identical messages have to be sent for the trigger to fire. (Default: 60)
- **Also match visually similar characters**<br>
    Whether to also match visually similar characters, like `Ĥéĺĺó`. (Default: off)

#### Nickname matches regex

This trigger will fire when the nickname of the user matches the specified regular expression.

- **Regex**<br>
    The regular expression to match against. (Default: (empty))
- **Also match visually similar characters**<br>
    Whether to also match visually similar characters, like `Ĥéĺĺó`. (Default: off)

#### Nickname not matching regex

The inverse of [Nickname matches regex](#nickname-matches-regex). See there for configuration.

#### Nickname word allowlist

This trigger will fire when the nickname of the user contains words **not** in the specified list.

- **List**<br>
    The list to check against. (Default: first found list)
- **Also match visually similar characters**<br>
    Whether to also match visually similar characters, like `Ĥéĺĺó`. (Default: off)

#### Nickname word denylist

This trigger will fire when the nickname of the user contains any word from the specified list.
See [Nickname word allowlist](#nickname-word-allowlist) for configuration.

- **List**<br>
    The list to check against. (Default: first found list)
- **Also match visually similar characters**<br>
    Whether to also match visually similar characters, like `Ĥéĺĺó`. (Default: off)

#### X user attachments in Y seconds

This trigger will fire when the offending user has sent x attachments in y seconds, in one single channel.[^2]

- **Attachments**<br>
    The number of attachments in the specified time frame for the trigger to fire. (Default: 10)
- **Within (seconds)**<br>
    The time frame in which the attachments have to be sent for the trigger to fire. (Default: 60)
- **Also count multiple attachments in single messages**<br>
    Whether to count multiple attachments in a single message. (Default: off)

#### X channel attachments in Y seconds

See [X user attachments in Y seconds](#x-user-attachments-in-y-seconds), but now applied to the channel as a whole,
instead of a single user.

#### Join username word allowlist

This trigger will fire when the username of a user joining the server contains words **not** in the specified list.

- **List**<br>
    The list to check against. (Default: first found list)
- **Also match visually similar characters**<br>
    Whether to also match visually similar characters, like `Ĥéĺĺó`. (Default: off)

#### Join username word denylist

This trigger will fire when the username of a user joining the server contains any word from the specified list. See
[Join username word allowlist](#join-username-word-allowlist) for configuration.

#### Join username matches regex

This trigger will fire when the username of a user joining the server matches the specified regular expression.

- **Regex**<br>
    The regular expression to match against. (Default: (empty))
- **Also match visually similar characters**<br>
    Whether to also match visually similar characters, like `Ĥéĺĺó`. (Default: off)

#### Join username not matching regex

The inverse of [Join username matches regex](#join-username-matches-regex). See there for configuration.

#### Join username invite

This trigger will fire when the username of a user joining the server contains a server invite link.

#### New Member

This trigger will fire when a new member joins the server.

#### Message without attachments

This trigger will fire when a message does not contain any attachments.

#### Message with attachments

This trigger will fire when a message contains attachments.

#### Flagged Scam links

This trigger will fire when a message contains a link that has been flagged as a scam.

#### Message with more than x characters

This trigger will fire when a message contains more than x characters.

- **Length**<br>
    The minimum number of characters in the message for the trigger to fire. (Default: 0)

#### Message with less than x characters

This trigger will fire when a message contains less than x characters.
See [Message with more than x characters](#message-with-more-than-x-characters) for configuration.

#### X user links in Y seconds

This trigger will fire when the offending user has sent x links in y seconds, in one single channel.[^2]

- **Links**<br>
    The number of links in the specified time frame for the trigger to fire. (Default: 5)
- **Within (seconds)**<br>
    The time frame in which the links have to be sent for the trigger to fire. (Default: 60)
- **Also count multiple links in single message**<br>
    Whether to count multiple links in a single message. (Default: off)

#### X channel links in Y seconds

See [X user links in Y seconds](#x-user-links-in-y-seconds), but now applied to the channel as a whole, instead of a
single user.

#### Message triggers Discord Automod

This trigger will fire when a message triggers Discord's Automod.

- **Rule ID**<br>
    The ID of the Automod rule to watch out for. Leave blank for all. (Default: (blank))

<!-- footnotes -->

[^1]: The regular expression used to match links is the following:<br>
``(?i)([a-z\d]+://)([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])``

[^2]: Under the hood, the bot will only check the last 1000 messages in the channel. If you have a high-traffic channel
in combination with an extremely long time frame, the bot could (theoretically) miss some messages.

[^3]: The RegEx engine used in YAGPDB is RE2. Some features are not supported, like lookaheads and lookbehinds. See
    [regex101](https://regex101.com/?flavor=golang) for some help with writing RE2-compatible regular expressions.
