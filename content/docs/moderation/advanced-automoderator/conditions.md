+++
title = 'Conditions'
weight = 433
+++

Conditions impose more fine-grained control on Advanced Automoderator rules. This page will cover the different types
of conditions and how to use them.

<!--more-->

## Quick Intro

This page lists all the available conditions in the order as they appear on the control panel. Use the Table of Contents
in the top left corner of this page alongside your browser's search function to quickly navigate to the condition you're
looking for.

By extension, these conditions are also available as ruleset scoped conditions.

### Condition Logic

All conditions have to be met in order for a rule to execute — that is, the conditions are combined according to the
logical AND operator.

{{< callout context="danger" title="Danger" icon="outline/alert-octagon" >}}

Ensure that the conditions you set are not in conflict or mutually exclusive, as this will cause your rule to never
trigger.

A common example of this is setting both _[Edited message](#edited-message)_ and _[New message](#new-message)_
conditions in the same rule. Since a message can't be both new and edited at the same time, the rule will never trigger.

{{< /callout >}}

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

This condition directly conflicts with the _[New Member](./triggers#new-member)_ trigger.

- **Age in minutes**<br>
  The minimum member duration in minutes. (Default: 0)

#### Server Member duration below

Like [Server Member duration above](#server-member-duration-above), but only apply this rule if the user has been a
member of the server for less than the specified duration in minutes.

#### Ignore Bots

Have the rule ignore messages from bots. This conflicts with the _[Only Bots](#only-bots)_ condition.

#### Only Bots

Only apply this rule to messages from bots. This conflicts with the _[Ignore Bots](#ignore-bots)_ condition.

#### Ignore Categories

Have the rule ignore messages from channels in selected categories.

- **Categories**<br>
  The categories to ignore. Select as many as you like. (Default: None)

#### Active in Categories

Only apply this rule if it was triggered in one of the selected categories.

- **Categories**<br>
  The categories to apply this rule to. Select as many as you like. (Default: None)

#### New message

Only apply this rule to a newly sent message. This condition is mutually exclusive with _[Edited message](#edited-message)_.

#### Edited message

Only apply this rule to an edited message. This condition is mutually exclusive with _[New message](#new-message)_.

#### Active in threads

Only apply this rule to messages in threads.

#### Ignore threads

Do not apply this rule to messages in threads.
