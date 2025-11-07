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

The prefix (**1**) is a short sequence of characters that trigger YAGPDB commands.
By default, the prefix is `-`.
Thus, for instance, the `remindme` command is invoked by prefixing the command name with a hyphen: `-remindme ...`.
If the prefix was instead `?`, one would use `?remindme ...`, and so on.

Slash commands are always triggered using the `/` character and hence do not depend on the prefix configured here.

{{< callout context="tip" title="Tip: Mention as a Command Prefix" icon="outline/rocket" >}}

In addition to the command prefix, you can trigger YAGPDB commands by pinging the bot at the start of your message.
This is helpful if you forget your prefix, as sending `@YAGPDB.xyz prefix` will recall it.

{{< /callout >}}

{{< callout context="caution" title="Caution: Flags and Switches" icon="outline/alert-triangle" >}}

Flags and switches are **_not_** affected by your prefix setting.

For example, if your prefix is `?`, a command usage with flags and/or switches is as follows:

```txt
?wouldyourather -raw
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
