+++
title = 'Commands'
weight = 1
+++

The commands page displays all custom commands and allows you to add, delete, or edit custom commands and custom command groups.

<!--more-->

![Overview of the Commands page.](commands_overview.png)

<center>

**1** Create Custom Command button **2** List of commands in the selected group **3** Edit this Custom Command **4** Delete this custom command **5** Run this Interval Commandnow **6** Selected group **7** Group tabs **8** Name of selected group **9** Delete selected group **10** Channel and Role Restrictions **11** Save group settings

</center>

## Creating a custom command

Clicking the Create a new Custom Command button (**1**) will instantly create a new command within the selected group (**6**) then redirect you to the edit page for the new CC.

A new custom command has the default response `Edit this to change the output of the custom command {{.CCID}}!` It also assigns the command an ID determined by the number of commands you have created.

{{% notice style="tip" title="Troubleshooting" %}}

If the bot is sending messages such as this in your server, you are likely accidentally triggering CCs with the default response. Check the commands page to find any CCs with empty responses.

{{% /notice %}}

## Command list

The commands page lists the commands (**2**) in the selected group (**6**). They are ordered by [ID](#id-and-name) and display their name (if set), [trigger type](#trigger-types), and trigger (if applicable). You can expand the command by clicking the down arrow, allowing you to preview the full, syntax-highlighted command response.

### Delete command button

Deleting a custom command (**4**) will **permanently** delete the command after confirmation. This cannot be undone.

### Run now

The Run now button (**5**) appears on [Interval trigger](#hourlyminute-interval) commands. It executes the command and resets the next run time based off the current time.

## Command Groups

Command groups allow you to organize your custom commands and apply role and channel restrictions to multiple commands.

The group tabs at the top of the page (**7**) allow you to switch to any of your created groups. The **+** button allows you to create a new group.

### Editing a group

Selecting a group allows you to edit it. Any changes must be saved (**11**) to take effect.

- **Name** (**8**): Name your custom command group (100 characters max).
- **Delete group** (**9**): Permanently delete the group after confirmation.
- **Role/Channel restrictions** (**10**): Restrict commands within the group based on roles or channels executed in.
- **Save group settings** (**11**): Update the group with the new values.

#### Role/Channel restrictions

Restricting a custom command (**10**) prevents it from triggering when not permitted to. A user who tries to run a custom command with the wrong roles/in the wrong channel will not trigger the response or an error.

Whitelisting roles or channels causes them to be required to run the command.

Blacklisted roles or channels will not be permitted to run the command.

{{% notice style="note" %}}

YAGPDB was raised well and honors a "no" when told "no". In other words, blacklists take precedence over whitelists.

This is a relatively common trip-hazard, so take great care when you set up both whitelists and blacklists.

{{% /notice %}}

## Editing a Custom Command

Editing a custom command (**3**) opens up a separate page for configuration.

![Overview of the CC edit page.](command_editor_overview.png)

<center>

**1** ID **2** Name **3** Trigger type **4** Trigger text **5** Case sensitivity toggle **6** Message edits trigger toggle **7** Response **8** Add response **9** Custom command group selection **10** Channel and Role Restrictions **11** Execution statistics **12** Error output toggle **13** Enable command toggle **14** Save command button **15** Delete command button

</center>

### ID and Name

Custom Commands are identified by either their ID or their name.

When a custom command is created, the system assigns it a numeric **ID** (**1**) starting at `1`. The number increases with each custom command created on your server. It is not based on the _current_ number of custom commands, but the total commands that have ever been created on the server. This ID is permanent, and cannot be changed or re-ordered.

The ID may be used to identify a CC for a variety of functions. Calling `.CCID` within a command response will return this ID. You must target a CC ID for `execCC`. You can use run the `CustomCommands` command with a CC ID to retrive info about that CC.

{{% notice warning %}}

Deleting a Custom Command does not allow its ID to be reassigned. If you delete a CC, its ID is lost forever.

{{% /notice %}}

A Custom Command's **name** (**2**), conversely, is defined by the user. It is an optional argument that can be used to identify the command in the control panel and with the `CustomCommands` command. It has a 100 character limit on length.

### Triggers

A trigger (**3**) defines what runs the command. Depending on the type of trigger you may also need to specify additional configuration. For example, most trigger types require a **Trigger** (**4**) field defining the text the command should match against new messages.

#### Trigger types

##### Command

Messages **starting with the prefix** for your server (- by default) _OR_ by mentioning the bot followed by the trigger text (**4**) will trigger the command.

###### Example

Trigger: `say`

Matches:
> -say
>
> -say hello
>
> @YAGPDB.xyz say hello

Doesn't match:

> say hello
>
> -sayl hello

##### Starts with

Messages **starting with** the trigger text (**4**) will trigger the command.

##### Contains

Messages **containing** the trigger text (**4**) will trigger the command.

##### Regex

Messages matching the trigger text (**4**) as a **[regex pattern](/reference/regex)** will trigger the command.

##### Exact match

Messages which **exactly** match the trigger text (**4**) will trigger the command.

##### Reaction

Reactions to a message will trigger the command.

Can specify **Added Only**, **Removed Only**, or **Both** to restrict which types of Reactions will trigger the command.

{{% notice style="tip" title="Filtering Emojis" %}}

You cannot specify which emojis the command will trigger on. If you'd like to limit which emojis run the code, you will need to write that code yourself in the response.

Example:

```go
  {{ if eq .Reaction.Emoji.APIName "😀" "⭐️" }}
    This is an allowed reaction!
  {{ else if eq .Reaction.Emoji.APIName "🦆" }}
    This is not an allowed reaction.
  {{ end }}
```

{{% /notice %}}

##### Hourly/Minute interval

Interval triggers will run the command at a set interval in the selected channel.

The Member in context is nil, and functions relying on the Member context will fail. However, `exec` will still run commands as the bot.

![Overview of interval configuration options.](interval_trigger_options.png?width=60vw)

<center>

**1** Interval **2** Channel **3** Excluding hours/weekdays

</center>

Interval (**1**) sets how often the command will run in **hours** or **minutes**.

Channel (**2**) specifies a channel to run the command in. The response will be sent to this channel.

Excluding hours and/or weekdays (**3**) prevents the command from triggering during those hours or weekdays. **This uses UTC time**, not your local timezone.

When editing an interval command, a **Run now** button appears at the bottom of the page. Clicking this executes the command and resets the next run time based off the current time.

{{% notice info %}}

You must specify a channel to run interval commands in even if the command doesn't output a message.

{{% /notice %}}

#### Case sensitivity

Any commands which allow you to specify trigger text (ex. Command, Regex, Exact match, etc.) have a **Case sensitive** toggle (**5**) which is off by default. A case sensitive trigger `yagPDB` will trigger on "yagPDB" but not "yagpdb" or "YAGPDB".

#### Edit message trigger

Commands which trigger on messages have a **Trigger on message edits** toggle (**6**) which is off by default. If a message is edited and matches the trigger text just like a message would, it will trigger the command.

The edited message toggle is an _additional_ trigger to the sent message trigger. If you'd like to _only_ trigger on message edits, you will need to conditional branch with `.IsMessageEdit`.

This feature is [premium only](/premium).

### Response

The response (**7**) defines the message the bot will send once the command is triggered.

Optionally define multiple responses which the bot will randomly select from when the command is run. Add a response with the plus button on the right of the response (**8**)

The response supports the custom template script, allowing for more complex functionality such as assigning roles, getting data from users, sending messages to other channels, and more. Visit the Templates reference page to learn more.

{{% button href="/reference/templates" style="transparent" %}}Templates{{% /button %}}

{{% notice style="tip" title="Keeping your code safe" %}}

It is reccommended to save local copies of your custom commands. There is no way to recover deleted or overwritten CCs. Use an editor like **Vim**, **VS Code**, or **Notepad++** for the best coding experience.

{{% /notice %}}

### Custom Command Group

Dropdown selection (**9**) to change which command group the command is in. Select `None` to ungroup the command.

### Channel and Role Restrictions

Restricting a custom command (**10**) prevents it from triggering when not permitted to. A user who tries to run a custom command with the wrong roles/in the wrong channel will not trigger the response or an error. A dropdown selection allows you to select a list of roles or channels, and the checkbox allows you to define the list as a blacklist or a whitelist.

#### Role Restrictions

{{% notice info %}}

Role restrictions ignores user permissions. Having `Administrator` permissions will not override these restrictions.

{{% /notice %}}

**Require at least one of the roles** in the following list causes the command to ignore any user who does not have _at least one_ of the roles in the list.

**Ignore the roles** in the following list causes the command to ignore any user who has _at least one_ of the roles in the list.

#### Channel Restrictions

**Only run** in the following channels causes the command to ignore the command if it's run outside of any of the selected channels.

**Ignore the channels** in the following list causes the command to ignore the command when it's run in any of the selected channels.

##### CC Groups

A user executing a command must pass both the overarching group's restrictions and the command restrictions. Command-specific restrictions will _not_ override the group restrictions.

#### Execution statistics

The execution statistics (**11**) show details about the custom command's executions. It's updated after the command runs.

##### Last error

The most recent error which occurred running the command, UTC Timestamped. The error display is not cleared when the command runs successfully.

##### Run count

A count of how many times the command executed the response. This counter increases even if the command errors, or does not send a response. It also increases if the command is run via `execCC`.

The run count will not increase if the user who ran the command did not pass the restrictions.

{{% notice style="tip" title="Troubleshooting" %}}

If your command fails to run, check the run count. If the run count increases when you attempt to run the command, the issue is with your code. Otherwise, the issue may be with YAGPDB's permissions in your server, or incorrectly setup Role/Channel Restrictions in the command and/or command group.

{{% /notice %}}

#### Last run

A UTC Timestamp of the last time the command executed the response.

#### Next scheduled Run

Only shown on Interval type commands. A UTC Timestamp of the next time the command is scheduled to run.

### Output errors as command response

This toggle (**12**) determines whether errors during command execution are sent in the command response after the command fails. Does not effect logging of Last error to the statistics.

### Command Enabled

This toggle (**13**) enables the command. A disabled command will never run (not even with `execCC`) or count against the trigger limit.

### Saving your command

Saving (**14**) the command updates it with the input values.

Alt + Shift + S also saves the custom command.

A custom command **will not save** if there is an error in your input. Examples of errors which prevent you from saving:

- There is a syntax error in the response
- You have reached the maximum CC limit
- You are attempting to save an empty response

If you save a command with an interval trigger which has never been run, it will run instantly upon saving.

{{% notice style="tip" title="Keeping your code safe" %}}

It is reccomended to code your custom command using a local editor on your device. You will not be able to save your code on the dashboard if there are syntax errors in your code. Use an editor like **Vim**, **VS Code**, or **Notepad++** for the best coding experience.

{{% /notice %}}

{{% notice warning %}}

Custom commands do not autosave.

{{% /notice %}}

### Delete command button

Deleting a custom command (**15**) will **permanently** delete the command after confirmation. This cannot be undone.
