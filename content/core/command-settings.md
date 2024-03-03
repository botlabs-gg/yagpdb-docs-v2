+++
title = 'Command Settings'
weight = 3
+++

Fine-grained control over all of YAGPDB's inbuilt commands.

<!--more-->

## Overview

Command overrides enable you to impose fine-grained control over all of YAGPDB's inbuilt commands. Before we go into
greater detail, a quick overview of that page below.

![Overview of the Command Settings page.](command_settings_overview.png)

<center>

**1** Command prefix, default `-` **2** *All commands enabled* setting **3** Required roles **4** Ignored roles
**5** Autodelete trigger interval **6** Autodelete response interval **7** Command overrides **8** Channel overrides tabs

</center>

The prefix setting (**1**) should be relatively straight-forward; whatever you type in that text-box, that becomes your
prefix. Slash commands, which use Discord's API to add them to your client's interface, are obviously still prefixed
by a slash `/`.

As a small bonus, YAGPDB will also consider a ping at the start of a message as a command prefix, which is quite helpful
when you forgot it, as simply sending `@YAGPDB.xyz prefix` will help you remember it.

Commands will not work when *All commands enabled* (**2**) is not checked.

{{% notice style="tip" title="Flags and Switches" %}}

Flags and switches are ***not*** affected by your prefix setting.

For example, if your prefix is `?`, a command usage with flags and/or switches would look like the following:

```
?wouldyourather -raw
```

{{% /notice %}}

### Command Override Priority

Command overrides and related settings are checked and applied in a very specific order, later settings completely
overwriting earlier ones.

First, the bot checks whether all commands are enabled. After that, overrides found in *Global Settings* are applied,
which can enable or disable specific commands.

The penultimate step is applying *Channel Overrides*, if applicable. Finally, command overrides found in there are applied.

Admittedly, this is at first relatively confusing, however there is a system to this madness. Essentially it trickles
down from least specific to most specific, giving the most specific setting priority. If you know about CSS's cascading
rules, this should be somewhat familiar.

## Options

### Common Options

These options are common across all three sub-settings: global settings, channel overrides, and individual command
overrides.

#### Required and Ignored Roles

Clicking on either of these options (**3**,**4**) opens a drop-down menu with all the roles present on your server.
Select as many as you wish. YAGPDB will then either require any and all members to have any of these roles, or
completely ignore members with any of the ignored roles, server admins and owners included.

{{% notice style="note" %}}

YAGPDB was raised well and honors a "no" when told "no". In other words, ignored roles take precedence over required
roles.

This is a relatively common trip-hazard, so take great care when you set up both required and ignored roles, and
subsequently give those roles to your members.

{{% /notice %}}

#### Autodelete Trigger / Response Interval

This setting makes YAGPDB automatically delete the triggering message and/or the response from the bot after that many
seconds have passed. To activate it, make sure to click the checkbox next to the respective input field (**5**,**6**).

If 10 seconds are not enough, or too long, feel free to adjust as you see fit; the intervals need not be equal.

### Channel Override Options

These options are only available for channel overrides (**8**). To add a new one, head to the *New channel override*
tab on the command settings page.

#### Channels

With this setting, you can select individual channels this override should apply to. Select as many as you wish. When
there is no channel selected, it may not apply its settings, assuming you also did not select categories.

You find this setting in the top-left corner of any channel override.

#### Categories

Just like channels, this setting will make the override apply its settings to any channels (including future ones) in
the selected category. If there is no category selected, settings might not apply, given that you also did not select
any channels to apply to.

You find this setting in the top-right corner of any channel override, adjacent to its channels setting.

### Command Override Options

These options are only available for individual command overrides (**7**). To add a new one, go to either your
global settings or any channel override and click on *New command override*.

#### Commands

This setting allows you to select specific commands to apply the command override to. Select as many as you wish to
apply an override to. You cannot have two (or more) overrides for the same command in the same tab, i.e. global settings
or a specific channel override.

#### Enable Specified Commands

Toggling this option simply tells YAGPDB whether the commands you selected are enabled or disabled. This allows you to
disable some specific commands if, for example, you have a custom command that replaces an inbuilt one, thus
necessitating disabling said inbuilt command.
