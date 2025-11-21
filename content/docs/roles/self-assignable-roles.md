+++
title = "Self Assignable Roles"
weight = 720
description = "how2 reaction role"
+++

<!--more-->

## Tutorial Video

{{< youtube IaTfJ4vqHhc >}}

## Role Commands

{{< callout context="caution" title="Warning: Required Bot Permissions" icon="outline/alert-triangle" >}}

Make sure that the bot has the _manage role_ permission and that the bot's role is **above** the role it is trying to assign.

{{< /callout >}}

{{< callout context="caution" title="Warning: Required User Permissions" icon="outline/alert-triangle" >}}

If you want to use any of the `rolemenu` commands, you **need** to have the `MANAGE_GUILD` permission, or the Manage Server permission.
This is hard-coded, meaning that command overrides will not affect it.

{{< /callout >}}

Simply give the role command a name and then select which role you want the bot to assign to the person.

![Creation of a role command](role_command_creation.png)

### Command Configuration

{{< callout context="caution" title="Warning: Required and Ignored Roles" icon="outline/alert-triangle" >}}

Do **not** set the required role to the role you are assigning.
You generally will not want to set the ignore role to the role you are assigning either, _unless_ you wish to prevent the user from removing that role through the role-menu.

{{< /callout >}}

- **Require roles**: require any of the selected roles.
- **Ignore roles**: ignore any of the selected roles.
- **Group:** Put the role in a role group (will be explained more further down).

## Role Groups

Role groups are useful for applying restrictions on a group of roles such as only being able to have one or the other role etc. They're also essential if you want to create a role menu.
To create one, simply give the role group a name and then select which mode you want the role group to use.

Every role group, even Ungrouped has the option to delete all roles inside that group, other groups will not be affected.
Be careful with that, it's permanent and can't be undone.

They're essential if you want to create a role menu.

![Creation of a role command group](role_command_group_creation.png)

### The different modes

1. None: This mode does nothing other than checking against the roles required and ignored roles.
2. Single: They can only have 1 role in the group. (e.g. for colors)
3. Multiple: You can set the minimum and maximum number of roles a member can have in the group.

### Groups Configuration

{{< callout context="caution" title="Warning: Required and Ignored Roles" icon="outline/alert-triangle" >}}

Do **not** set the required role to the role you are assigning.
You generally will not want to set the ignore role to the role you are assigning either, _unless_ you wish to prevent the user from removing that role through the rolemenu.

{{< /callout >}}

- **Require roles**: require any of the selected roles.
- **Ignore roles**: ignore any of the selected roles.
- **Mode**: Select between none, single, multiple to restrict the number of roles they can assign them themselves.

Role groups have additional options that can be enabled/disabled by selecting the corresponding checkbox such as:

- Requiring a user to have one of the following role at all time (after initial assignment).
- Removing the previous role when they assign themselves another role from the group.

#### Example usage

Say you have a server with 3 factions and want people to be able to assign their own faction when they join.
That's simple enough - all we have to do is:

- Create the 3 roles
- Create 3 role commands for those roles

Now everyone can assign themselves a faction!
There are a couple of issues with this setup though:

1. You can assign yourself more than 1 faction.
2. People can freely jump between factions.

To fix these problems we can create a new group with the mode `Single` and assign the previous role commands to that group.
Great!
Now we can only have 1 faction!
How can we solve jumping between factions then?
You can enable the `Require 1 role in group` setting, now they can't remove roles in the group, and they can have max. 1 role in the group, so they can't jump around anymore!

### Adding roles to the role group

{{< callout context="note" title="Note: One Group Only" icon="outline/info-circle" >}}

Roles can only be assigned to one group.

{{< /callout >}}

Refer back to the [optional features for roles](#command-configuration) and select the role group you want to assign the role to.

## Role Menu

{{< callout context="caution" title="Warning: Required Setup" icon="outline/alert-triangle" >}}

Make sure you created your [role commands](#role-commands) and assigned them a [role group](#role-groups) before starting.
Role menu will **not** work if you have not done so.

{{< /callout >}}

The role menu makes it possible to have people assign roles by adding reactions to a message.
If you'd like to create a message like in the example to create a rolemenu on, take a look at the [Custom Embeds](/docs/reference/custom-embeds) chapter.

![Example of a role menu](rolemenu_example.png)

{{< callout context="note" title="Note: Message Reactions Limit" icon="outline/info-circle" >}}

A role menu can only support up to 20 roles due to the reaction limit discord places on messages.
If your role group has more than twenty you have to use the `rolemenu finish` sub-command and then add the rest of roles to a new message using the `-skip` flag.

{{< /callout >}}

To set up a role menu, the related roles **have to be added to a role group**, then you invoke the command `-rolemenu create (role group name)`.

The group mode and other restrictions from the role group and role still apply to the roles in the role menu.

After you type in the command, you will be taken through the setup process.
If you want to disable DMs, create a custom message, or add new role to your role menu, be sure to read until the end.

### Step by step tutorial

Make sure you created your [role commands](#role-commands) and assigned them a [role group](#role-groups) before starting.
Role menu will **not** work if you have not done so.
All switches and flags (nodm, rr, etc...) start with hyphen symbol `-`, not your prefix.

Once you've made your role commands and assigned them to a role group, go to the channel in Discord where you want the role menu to be created.
Then type `-rolemenu create (group name)`; applying our "Sports" role group example, we'd have to send `-rolemenu create Sports`.

![Rolemenu Create command](rolemenu_create.png)

As you can see, the bot started creating the menu, and has asked you to add the emoji for the first role, **Soccer**.
I'll react on the message with my emoji of choice:

![First reaction on a rolemenu setup](rolemenu_react.png)

Now the bot wants you to react with the emoji for the second role, **Hockey:**

![Second reaction on a rolemenu setup](rolemenu_react_2.png)

And similar for the final role, **Basketball:**

![Third reaction on a rolemenu setup](rolemenu_react_3.png)

And we're done---people can start using the menu by clicking on the reaction associated with their desired role.
The setup message will be automatically deleted in a couple of minutes, but you can also delete it manually, if you so desire.

### Custom message

To create a custom message for your role menu like event role menu you saw above, you will need to send a message.
Then get the ID of the message by following the steps in [how to get a message ID](#how-to-get-a-message-id-desktop) and type in the following command, `-rolemenu create (group name) -m (message id)`.
You would then complete the role menu like you would any normal role menu.

### Disabling DM confirmation

If you do not want the bot to send you a DM when you are given or removed from a role, type in the following command `-rolemenu update (message id) -nodm`.

After you have finish editing or creating your role menu, it will display whether DM notifications are enabled or not.
Note that YAGPDB does not allow you to disable error messages such as cool-down messages with the `nodm` switch or any other method.

![Rolemenu flags display](rolemenu_flags.png)

### Remove roles on reaction remove

Remove roles on reaction remove, this means instead of the old toggling mode, adding reactions will strictly give you the role, and removing reactions will only take away the role from you.
This mode is on by default for new menus.

You can set old menus to use this switch using the command `rolemenu update (message id) -rr`.

## Role Menu options

### Removing a role menu

If you want to remove a role menu from a message, you can type in `-rolemenu remove (message id)` It will remove the role-menu from a message.
The message itself won't be deleted but the bot will now not do anything with reactions on that message.

### Editing a role menu

If you want to change the emote for one your reaction, you can do so by typing in `-rolemenu edit (message id)` After you type it the command it will ask you to react on the emote you want to change.
You will need to go to the role menu and react on the emote you want to change.
After you have reacted on the desired emote, it will ask you to react with your new emote on the role menu.

### Resetting all reactions

If you edit your reaction emotes or simply want to give your emote a new clean slate.
You can reset all the reactions by typing in `-rolemenu resetreactions (message id)`.
It will remove all reactions on this menu and re-adds them, can be used to fix the order.

### Updating a role menu

If you added a new role to your role group, you can update your role menu.
Update it by typing in `-rolemenu update (message id)` and follow the instructions given.

## How to get a message ID (Desktop)

Make sure you have enabled [developer mode](https://support.discordapp.com/hc/en-us/articles/206346498) in your Discord settings.

To get the ID of the message you want to set the custom role menu on, click on the three dots on the far right hand side of the message and click on `Copy Message ID`.

![Copying a message ID](copy_message_id.png)
