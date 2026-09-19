+++
title = "Command Settings"
weight = 230
description = "Configure command overrides to restrict access to YAGPDB commands and optional autodelete intervals."
+++

Fine-grained control over all of YAGPDB's inbuild commands.

## Overview

Command overrides allow you to restrict access to YAGPDB's inbuilt commands and optionally configure intervals after which the command trigger and response will be autodeleted.
The key features of the page are shown below.

<center>

**1** Command prefix.
**2** All commands enabled setting.
**3** Required roles.
**4** Ignored roles.
**5** Autodelete trigger interval.
**6** Autodelete response interval.
**7** Command overrides.
**8** Channel overrides tabs.

</center>

The prefix (**1**) is a short sequence of characters that trigger your server's custom commands.
By default, the prefix is `-`, so a custom command with the `Command` trigger `suggest` is invoked as `-suggest ...`.
If the prefix was instead `?`, one would use `?suggest ...`, and so on.

The prefix no longer applies to YAGPDB's built-in commands, which are run as slash commands.
See [Prefixed Commands Have Been Discontinued](#prefixed-commands-have-been-discontinued) below.

{{< callout context="tip" title="Tip: Mention Instead of the Prefix" icon="outline/rocket" >}}

You can also trigger commands by pinging the bot at the start of your message, and this works for both built-in and custom commands.
It is helpful if you forget your prefix, as sending `@YAGPDB.xyz prefix` will recall it.

{{< /callout >}}

### Prefixed Commands Have Been Discontinued

YAGPDB has retired the prefix as a way of running its **built-in** commands.
A message such as `-help` is now simply ignored; the bot will not respond to it at all.

There are two supported ways to run a built-in command:

- Discord's slash command interface: `/help`, `/logs`, `/warnings list`, and so on.
- A bot mention at the start of the message: `@YAGPDB.xyz help`.

This change is driven by Discord's message content access policy.
Reading every message in a server just to spot a leading `-` is a broad permission, and YAGPDB should only use that access for features that genuinely need it, such as moderation and custom commands.

{{< callout context="note" title="Note: Custom Commands Are Not Affected" icon="outline/info-circle" >}}

This only concerns YAGPDB's built-in commands.
Your own custom commands keep working exactly as they do today, including the ones with a plain text trigger.

{{< /callout >}}

You may still see two reminders about the change:

- A notice on the control panel, shown on the server selector and on each server's dashboard.
- A short message in Discord when someone uses a prefixed command. It is only sent on roughly every tenth attempt in a server, not on every single one, and never for a prefixed command invoked from within a custom command.

If you selfhost YAGPDB, both the cutoff and the reminders are under your control.
See the [prefixed commands section](/selfhosting/hosting/setup#prefixed-commands) of the selfhosting guide.

#### Finding the Slash Command Equivalent

Nearly every built-in command is now available as a slash command.
A handful of them were grouped under a shared name in the process, so the slash form takes two words:

| Prefixed command                                     | Slash command                            |
| ---------------------------------------------------- | ---------------------------------------- |
| `-catfact`, `-roll`, `-xkcd`, and other fun commands | `/fun catfact`, `/fun roll`, `/fun xkcd` |
| `-cc`, `-customcommands`                             | `/customcommands list`                   |
| `-evalcc`                                            | `/customcommands eval`                   |
| `-warnings`, `-warns`                                | `/warnings list`                         |
| `-delwarning`, `-delwarn`, `-dw`                     | `/warnings delete`                       |
| `-clearwarnings`, `-clw`                             | `/warnings clear`                        |
| `-rep`                                               | `/rep check`                             |
| `-giverep`, `-+rep`                                  | `/rep give`                              |
| `-takerep`, `--rep`                                  | `/rep take`                              |
| `-reminders`                                         | `/reminder list`                         |
| `-delreminder`, `-rmreminder`                        | `/reminder delete`                       |
| `-settimezone`, `-setz`                              | `/timezone set`                          |
| `-cshard`, `-currentshard`                           | `/guild shard`                           |

The old names still work as bot mentions, for example `@YAGPDB.xyz catfact`.
The full listing lives on the [All Commands](/docs/core/all-commands) page.

{{< callout context="note" title="Note: Slash Command Visibility" icon="outline/info-circle" >}}

Discord hides a slash command from members who lack the permission it advertises.
YAGPDB can only advertise a single permission per command, so commands that accept any one of several permissions stay visible to everyone and are checked when they actually run.
Seeing a command in the `/` menu therefore does not guarantee you are allowed to run it.

{{< /callout >}}

{{< callout context="caution" title="Caution: Flags and Switches" icon="outline/alert-triangle" >}}

Flags and switches are **_not_** affected by your prefix setting.

For example, if your prefix is `?`, a custom command usage with flags and/or switches is as follows:

```txt
?mycommand -raw
```

where the `raw` switch is still spelled `-raw`, not `?raw`.

{{< /callout >}}

### Command Override Priority

Command overrides are considered in the following order, with settings applied at later steps overwriting earlier ones:

1. If the _All commands enabled_ setting is not checked, all commands are initially disabled (otherwise enabled.)
2. General restrictions configured in _Global Settings_ are then applied, base restrictions before command-specific
   restrictions.
3. Channel-specific restrictions (_Override #1_, _Override #2_, ...) are applied analogously.

The order above trickles down from least specific to most specific, prioritizing the most specific setting---an analogy for developers would be CSS's cascading rules.

Though perhaps confusing at first, the priority order above is designed to make common configurations trivial.
For instance, to disable all but a specific command---say the `remindme` command---one can simply disable the _All commands enabled_ option and then create a command override that enables only `remindme`.
This is possible as command overrides are applied after the _All commands enabled_ setting.

## Options

### Common Options

These options are common across all three sub-settings: global settings, channel overrides, and individual command overrides.

#### Required and Ignored Roles

Clicking on either of these options (**3**, **4**) opens a drop-down menu with all the roles present on your server.
Select as many as you wish.
YAGPDB will then either require all members to have any of these roles in order to run commands, or completely ignore members with any of the ignored roles, server admins and owners included.

{{< callout context="note" title="Note: Priority of Ignored vs. Required Roles" icon="outline/info-circle" >}}

YAGPDB was raised well and honors a "no" when told "no".
In other words, ignored roles take precedence over required roles.

{{< /callout >}}

#### Autodelete Trigger / Response Interval

This setting makes YAGPDB automatically delete the triggering message and/or its response after the configured duration has passed.
To activate it, make sure to click the checkbox next to the respective input field (**5**, **6**).

If 10 seconds are not enough, or too long, feel free to adjust as you see fit; the intervals need not be equal.

#### Slash command response always ephemeral

Toggling this setting on will make YAGPDB always respond to slash commands with an ephemeral message.
This means that only the user who triggered the command will be able to see the response.

### Channel Override Options

These options are only available for channel overrides (**8**).
To add a new one, head to the _New channel override_ tab on the command settings page.

You must select at least one channel or category; otherwise, the settings of the override will not be applied.

#### Channels

With this setting, you can select individual channels to apply the override to.
Select as many as you wish.

You find this setting in the top-left corner of any channel override.

#### Categories

This setting will apply the override to all channels (including future ones) in the selected category.

You find this setting in the top-right corner of any channel override, adjacent to its channels setting.

### Command Override Options

These options are only available for individual command overrides (**7**).
To add a new one, go to either your global settings or any channel override and click on _New command override_.

#### Commands

This setting allows you to select specific commands to apply the command override to.
Select as many as you wish to apply an override to.
You cannot have two (or more) overrides for the same command in the same tab, i.e. global settings or a specific channel override.

#### Enable Specified Commands

Toggling this option simply tells YAGPDB whether the commands you selected are enabled or disabled.
This allows you to disable some specific commands, which may be useful if -- for example -- you have created a custom command that completely replaces an inbuilt one.
