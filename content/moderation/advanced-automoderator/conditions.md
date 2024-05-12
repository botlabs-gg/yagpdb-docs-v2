+++
title = 'Conditions'
weight = 2
+++

Conditions impose more fine-grained control on Advanced Automoderator rules. This page will cover the different types
of conditions and how to use them.

<!--more-->

## Quick Intro

This page lists all the available conditions in the order as they appear on the control panel. Make extensive use of the
Table of Contents in the top left corner of this page, as well as your browser's search function to quickly navigate to
the condition you're looking for.

By extension, these conditions are also available as ruleset scoped conditions.

### Condition Logic

Conditions in YAGPDB's Advanced Automoderator follow the logical AND operator. That is, for a rule to be applicable
(after any of the [triggers](./triggers) have been met), all conditions must be met. Therefore, some conditions may be
mutually exclusive, resulting in your rule to *never* trigger.

#### Ignored Roles

Have the rule ignore users with selected roles. This is useful for excluding moderators or bots from the rule.

- **Roles**<br>
    The roles to ignore. Select as many as you like. (Default: None)

#### Require Roles

Like [Ignored Roles](#ignored-roles), with following optional setting:

- **Require all selected roles**<br>
    Whether the user must have all selected roles, or just any. (Default: off)

#### Ignore Channels

Have the rule ignore messages from selected channels, for example, to exclude a bot channel.

- **Channels**<br>
    The channels to ignore. Select as many as you like. (Default: None)

#### Active in channels

Just like [Ignore Channels](#ignore-channels), but only apply the rule to messages from selected channels.

#### Account age above

Only apply this rule if the user's account is older than the specified duration in minutes.

- **Age in minutes**<br>
    The minimum account age in minutes. (Default: 0)

#### Account age below

Only apply this rule if the user's account is younger than the specified duration in minutes.

- **Age in minutes**<br>
    The maximum account age in minutes. (Default: 0)

#### Server Member duration above

Only apply this rule if the user has been a member of the server for longer than the specified duration in minutes.

This condition directly conflicts with the *[New Member](./triggers#new-member)* trigger.

- **Age in minutes**<br>
    The minimum member duration in minutes. (Default: 0)

#### Server Member duration below

Like [Server Member duration above](#server-member-duration-above), but only apply this rule if the user has been a
member of the server for less than the specified duration in minutes.

#### Ignore Bots

Have the rule ignore messages from bots. This conflicts with the *[Only Bots](#only-bots)* condition.

#### Only Bots

Only apply this rule to messages from bots. This conflicts with the *[Ignore Bots](#ignore-bots)* condition.

#### Ignore Categories

Have the rule ignore messages from channels in selected categories.

- **Categories**<br>
    The categories to ignore. Select as many as you like. (Default: None)

#### Active in Categories

Only apply this rule if it was triggered in one of the selected categories.

- **Categories**<br>
    The categories to apply this rule to. Select as many as you like. (Default: None)

#### New message

Only apply this rule to a newly sent message. This condition is mutually exclusive with *[Edited message](#edited-message)*.

#### Edited message

Only apply this rule to an edited message. This condition is mutually exclusive with *[New message](#new-message)*.

#### Active in threads

Only apply this rule to messages in threads.

#### Ignore threads

Do not apply this rule to messages in threads.
