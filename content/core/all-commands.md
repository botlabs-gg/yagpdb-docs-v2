+++
title = 'All Commands'
weight = 4
menuPre = "<i class= 'fas fa-list'></i> "
+++

List of all available commands offered by YAGPDB and their syntax.

<!--more-->

## Legend

`<required arg>` `[optional arg]`

Text arguments containing multiple words needs be to put in quotes ("arg here") or code ticks (`arg here`) if it's not the last argument and there's more than 1 text argument.

For example with the poll command if you want the question to have multiple words: `-poll "whats your favorite color" red blue green2`

## General ℹ️

### Help

**Aliases:** commands/h/how/command

Shows help about all or one specific command


**Usage:**
```
Help [command:Text]
```

### Info

Responds with bot information


**Usage:**
```
Info
```

### Invite

Responds with bot invite link


**Usage:**
```
Invite
```

## Tools & Utilities 🔨

### Prefix

Shows command prefix of the current server, or the specified server


**Usage:**
```
Prefix [Server-ID:Whole number]
```

### Calc

**Aliases:** c/calculate

Calculator 2+2=5


**Usage:**
```
Calc <Expression:Text>
```

### CustomEmbed

**Aliases:** ce

Creates an embed from what you give it in json form: https://docs.yagpdb.xyz/others/custom-embeds
Example: `-ce {"title": "hello", "description": "wew"}`

**Usage:**
```
CustomEmbed <Json:Text>
```

### SimpleEmbed

**Aliases:** se

A more simpler version of CustomEmbed, controlled completely using switches.
You can edit existing messages by supplying the `-message` flag.


**Usage:**
```
SimpleEmbed
```
```
[-channel channel:Channel - Optional channel to send in]
[-message message:Whole number - Optional message ID to edit]
[-content content:Text - Text content for the message]
[-title title:Text]
[-desc desc:Text - Text in the 'description' field]
[-color color:Text - Either hex code or name]
[-url url:Text - Url of this embed]
[-thumbnail thumbnail:Text - Url to a thumbnail]
[-image image:Text - Url to an image]
[-author author:Text - The text in the 'author' field]
[-authoricon authoricon:Text - Url to a icon for the 'author' field]
[-authorurl authorurl:Text - Url of the 'author' field]
[-footer footer:Text - Text content for the footer]
[-footericon footericon:Text - Url to a icon for the 'footer' field]

```

### CurrentTime

**Aliases:** ctime/gettime

Shows current time in different timezones. [Available timezones](https://pastebin.com/ZqSPUhc7)


**Usage:**
```
CurrentTime <Offset:Whole number>
CurrentTime <Zone:Text>
CurrentTime

```

### ListRoles

List roles, their id's, color hex code, and 'mention everyone' perms (useful if you wanna double check to make sure you didn't give anyone mention everyone perms that shouldn't have it)


**Usage:**
```
ListRoles
```
```
[-nomanaged nomanaged:Switch - Don't list managed/bot roles]

```

### Poll

Create very simple reaction poll. Example: `poll "favorite color?" blue red pink`


**Usage:**
```
Poll <Topic:Text - Description of the poll> <Option1:Text> <Option2:Text> [Option3:Text] [Option4:Text] [Option5:Text] [Option6:Text] [Option7:Text] [Option8:Text] [Option9:Text] [Option10:Text]
```

### Undelete

**Aliases:** ud

Views the first 10 recent deleted messages. By default, only the current user's deleted messages will show.
You can use the `-a` flag to view all users delete messages, or `-u` to view a specified user's deleted messages.
Both `-a` and `-u` require Manage Messages permission.
Note: `-u` overrides `-a` meaning even though `-a` might've been specified along with `-u` only messages from the user provided using `-u` will be shown.

**Usage:**
```
Undelete
```
```
[-a a:Switch - from all users]
[-u u:Mention/ID - from a specific user]
[-channel channel:Channel - Optional target channel]

```

### Stats

Shows server stats (if public stats are enabled)


**Usage:**
```
Stats
```

### CustomCommands

**Aliases:** cc

Shows a custom command specified by id, trigger, or name, or lists them all


**Usage:**
```
CustomCommands <ID:Whole number>
CustomCommands <Name-Or-Trigger:Text>
CustomCommands

```
```
[-file file:Switch - Send responses in file]
[-color color:Switch - Use syntax highlighting (Go)]
[-raw raw:Switch - Force raw output]

```

### Evalcc

executes custom command code (up to 1k characters)


**Usage:**
```
Evalcc <code:Text>
```

### Logs

**Aliases:** log

Creates a log of the last messages in the current channel.
This includes deleted messages within an hour (or 12 hours for premium servers)

**Usage:**
```
Logs [Count:Whole number]
```
```
[-channel channel:Channel - Optional channel to log instead]

```

### Whois

**Aliases:** whoami

Shows information about a user


**Usage:**
```
Whois [User:Member]
```

### Nicknames

**Aliases:** nn

Shows past nicknames of a user.


**Usage:**
```
Nicknames [User:User]
```

### Usernames

**Aliases:** unames/un

Shows past usernames of a user.


**Usage:**
```
Usernames [User:User]
```

### ResetPastNames

Reset your past usernames/nicknames.


**Usage:**
```
ResetPastNames
```

### Remindme

**Aliases:** remind/reminder

Schedules a reminder, example: 'remindme 1h30min are you still alive?'


**Usage:**
```
Remindme <Time:Duration> <Message:Text>
```
```
[-channel channel:Channel]

```

### Reminders

Lists your active reminders in the server, use in DM to see all your reminders


**Usage:**
```
Reminders
```

### CReminders

**Aliases:** channelreminders

Lists reminders in channel, only users with 'manage channel' permissions can use this.


**Usage:**
```
CReminders
```

### DelReminder

**Aliases:** rmreminder

Deletes a reminder. You can delete reminders from other users provided you are running this command in the same guild the reminder was created in and have the Manage Channel permission in the channel the reminder was created in.


**Usage:**
```
DelReminder [ID:Whole number]
```
```
[-a a:Switch - All]

```

### Role

Toggle a role on yourself or list all available roles, they have to be set up in the control panel first, under 'rolecommands'


**Usage:**
```
Role [Role:Text]
```

### settimezone

**Aliases:** setz/tzset

Sets your timezone, used for various purposes such as auto conversion. Give it your country.


**Usage:**
```
settimezone [Timezone:Text]
```
```
[-u u:Switch - Display current]
[-d d:Switch - Delete TZ record]

```

### ToggleTimeConversion

**Aliases:** toggletconv/ttc

Toggles automatic time conversion for people with registered timezones (setz) in this channel, it's on by default, toggle all channels by giving it `all`


**Usage:**
```
ToggleTimeConversion [flags:Text]
```

## Fun 🎉

### Define

**Aliases:** df/define/urban/urbandictionary

Look up an urban dictionary definition, default paginated view.


**Usage:**
```
Define <Topic:Text>
```
```
[-raw raw:Switch - Raw output]

```

### Weather

**Aliases:** w

Shows the weather somewhere


**Usage:**
```
Weather <Where:Text>
```

### Topic

Generates a conversation topic to help chat get moving.


**Usage:**
```
Topic
```

### CatFact

**Aliases:** cf/cat/catfacts

Cat Facts


**Usage:**
```
CatFact
```

### DadJoke

Generates a dad joke using the API from icanhazdadjoke.


**Usage:**
```
DadJoke
```

### DogFact

**Aliases:** dog/dogfacts

Dog Facts


**Usage:**
```
DogFact
```

### Advice

Don't be afraid to ask for advice!


**Usage:**
```
Advice [What:Text]
```

### Throw

Throwing things is cool.


**Usage:**
```
Throw [Target:User]
```

### Roll

Roll dices, specify nothing for 6 sides, specify a number for max sides, or rpg dice syntax.
Example: `-roll 2d6`

**Usage:**
```
Roll <Sides:Whole number>
Roll <RPG-Dice:Text>
Roll

```

### WouldYouRather

**Aliases:** wyr

Get presented with 2 options.


**Usage:**
```
WouldYouRather
```
```
[-raw raw:Switch - Raw output]

```

### Xkcd

An xkcd comic, by default returns random comic strip


**Usage:**
```
Xkcd [Comic-number:Whole number]
```
```
[-l l:Switch - Latest comic]

```

### HowLongToBeat

**Aliases:** hltb

Game information based on query from howlongtobeat.com.
Results are sorted by popularity, it's their default. Without -p returns the first result.
Switch -p gives paginated output using the Jaro-Winkler similarity metric sorting max 20 results.


**Usage:**
```
HowLongToBeat <Game-Title:Text>
```
```
[-c c:Switch - Compact output]
[-p p:Switch - Paginated output]

```

### Inspire

**Aliases:** insp

Shows 'inspirational' quotes from inspirobot.me


**Usage:**
```
Inspire [Season:Text]
```
```
[-mindfulness mindfulness:Switch - Generates Mindful Quotes!]

```

### Forex

**Aliases:** Money

💱 convert value from one currency to another.


**Usage:**
```
Forex <Amount:Decimal number> <From:Text> <To:Text>
```

### Roast

**Aliases:** insult

Sends a random roast


**Usage:**
```
Roast [Target:User]
```

### 8ball

Ask the magic 8ball a question


**Usage:**
```
8ball [Question:Text]
```

### dictionary

**Aliases:** owldict/owl/dict

Get the definition of an English word using dictionaryapi.dev


**Usage:**
```
dictionary <Query:Text - Word to search for>
```

### TakeRep

**Aliases:** -/tr/trep/-rep

Takes away rep from someone


**Usage:**
```
TakeRep <User:User> [Num:Whole number]
```

### GiveRep

**Aliases:** +/gr/grep/+rep

Gives rep to someone


**Usage:**
```
GiveRep <User:User> [Num:Whole number]
```

### SetRep

**Aliases:** SetRepID

Sets someones rep, this is an admin command and bypasses cooldowns and other restrictions.


**Usage:**
```
SetRep <User:Mention/ID> <Num:Whole number>
```

### DelRep

Deletes someone from the reputation list completely, this cannot be undone.


**Usage:**
```
DelRep <User:Mention/ID>
```

### RepLog

**Aliases:** replogs

Shows the rep log for the specified user.


**Usage:**
```
RepLog
RepLog <User:Mention/ID>
RepLog <Page:Whole number>
RepLog <User:Mention/ID> <Page:Whole number>

```

### Rep

Shows yours or the specified users current rep and rank


**Usage:**
```
Rep [User:User]
```

### TopRep

Shows rep leaderboard on the server


**Usage:**
```
TopRep [Page:Whole number]
```
```
[-user user:Mention/ID - User to search for in the leaderboard]

```

### Soundboard

**Aliases:** sb

Play, or list soundboard sounds


**Usage:**
```
Soundboard [Name:Text]
```

### SoundboardReset

**Aliases:** sbclose/sbReset

Reset Soundboard Player


**Usage:**
```
SoundboardReset
```

### cah Create

**Aliases:** c

Creates a Cards Against Humanity game in this channel, add packs after commands, or * for all packs. (-v for vote mode without a card czar).


**Usage:**
```
Create [packs:Text - Packs separated by space, or * for all of them.]
```
```
[-v v:Switch - Vote mode - players vote instead of having a card czar.]

```

### cah End

Ends a Cards Against Humanity game that is ongoing in this channel.


**Usage:**
```
End
```

### cah Kick

Kicks a player from the ongoing Cards Against Humanity game in this channel.


**Usage:**
```
Kick <user:Mention/ID>
```

### cah Packs

Lists all available packs.


**Usage:**
```
Packs
```

### Trivia

Asks a random question, you have got 30 seconds to answer!


**Usage:**
```
Trivia
```

## Debug & Maintenance 🖥

### Ping

Shows the latency from the bot to the discord servers.
Note that high latencies can be the fault of ratelimits and the bot itself, it's not a absolute metric.

**Usage:**
```
Ping
```

### ViewPerms

Shows you or the target's permissions in this channel


**Usage:**
```
ViewPerms [target:Mention/ID]
```

### TopServers

Responds with the top 20 servers I'm on. *Bot admin only.


**Usage:**
```
TopServers [Skip:Whole number - Entries to skip]
```
```
[-id id:Whole number]

```

### CurrentShard

**Aliases:** cshard

Shows the current shard this server is on (or the one specified)


**Usage:**
```
CurrentShard [serverid:Whole number]
```

### IsGuildUnavailable

Returns whether the specified guild is unavailable or not


**Usage:**
```
IsGuildUnavailable <guildid:Whole number>
```

### Yagstatus

**Aliases:** status

Shows yagpdb status, version, uptime, memory stats, and so on


**Usage:**
```
Yagstatus
```

### Roledbg

Returns count of autorole assignments currently being processed


**Usage:**
```
Roledbg
```

## Moderation 👮

### Ban

**Aliases:** banid

Bans a member, specify number of days of messages to delete with -ddays (0 to 7)


**Usage:**
```
Ban <User:Mention/ID> <Duration:Duration> <Reason:Text>
Ban <User:Mention/ID> <Reason:Text> <Duration:Duration>
Ban <User:Mention/ID> <Duration:Duration>
Ban <User:Mention/ID> <Reason:Text>
Ban <User:Mention/ID>

```
```
[-ddays ddays:Whole number - Number of days of messages to delete]

```

### Unban

**Aliases:** unbanid

Unbans a user. Reason requirement is same as ban command setting.


**Usage:**
```
Unban <User:Mention/ID> [Reason:Text]
```

### Kick

Kicks a member


**Usage:**
```
Kick <User:Mention/ID> [Reason:Text]
```
```
[-cl cl:Whole number - Messages to delete]

```

### Mute

Mutes a member


**Usage:**
```
Mute <User:Mention/ID> <Duration:Duration> <Reason:Text>
Mute <User:Mention/ID> <Reason:Text> <Duration:Duration>
Mute <User:Mention/ID> <Duration:Duration>
Mute <User:Mention/ID> <Reason:Text>
Mute <User:Mention/ID>

```

### Unmute

Unmutes a member


**Usage:**
```
Unmute <User:Mention/ID> [Reason:Text]
```

### Timeout

**Aliases:** to

Timeout a member


**Usage:**
```
Timeout <User:Mention/ID> <Duration:Duration> <Reason:Text>
Timeout <User:Mention/ID> <Reason:Text> <Duration:Duration>
Timeout <User:Mention/ID> <Duration:Duration>
Timeout <User:Mention/ID> <Reason:Text>
Timeout <User:Mention/ID>

```

### RemoveTimeout

**Aliases:** untimeout/cleartimeout/deltimeout/rto

Removes a member's timeout


**Usage:**
```
RemoveTimeout <User:Mention/ID> [Reason:Text]
```

### Report

Reports a member to the server's staff


**Usage:**
```
Report <User:Mention/ID> <Reason:Text>
```

### Clean

**Aliases:** clear/cl

Delete the last number of messages from chat, optionally filtering by user, max age and regex or ignoring pinned messages.
Specify a regex with "-r regex_here" and max age with "-ma 1h10m"
You can invert the regex match (i.e. only clear messages that do not match the given regex) by supplying the `-im` flag
Note: Will only look in the last 1k messages

**Usage:**
```
Clean <Num:Whole number>
Clean <Num:Whole number> <User:Mention/ID>
Clean <User:Mention/ID> <Num:Whole number>

```
```
[-r r:Text - Regex]
[-im im:Switch - Invert regex match]
[-ma ma:Duration - Max age]
[-minage minage:Duration - Min age]
[-i i:Switch - Regex case insensitive]
[-nopin nopin:Switch - Ignore pinned messages]
[-a a:Switch - Only remove messages with attachments]
[-to to:Whole number - Stop at this msg ID]
[-from from:Whole number - Start at this msg ID]

```

### Reason

Add/Edit a modlog reason


**Usage:**
```
Reason <Message-ID:Whole number> <Reason:Text>
```

### Warn

Warns a user, warnings are saved using the bot. Use -warnings to view them.


**Usage:**
```
Warn <User:Mention/ID> <Reason:Text>
```

### Warnings

**Aliases:** Warns

Lists warning of a user.


**Usage:**
```
Warnings <User:Mention/ID> [Page:Whole number]
```
```
[-id id:Whole number - Warning ID]

```

### EditWarning

Edit a warning, id is the first number of each warning from the warnings command


**Usage:**
```
EditWarning <Id:Whole number> <NewMessage:Text>
```

### DelWarning

**Aliases:** dw/delwarn/deletewarning

Deletes a warning, id is the first number of each warning from the warnings command


**Usage:**
```
DelWarning <Id:Whole number> [Reason:Text]
```

### ClearWarnings

**Aliases:** clw

Clears the warnings of a user


**Usage:**
```
ClearWarnings <User:Mention/ID> [Reason:Text]
```

### TopWarnings

**Aliases:** topwarns

Shows ranked list of warnings on the server


**Usage:**
```
TopWarnings [Page:Whole number]
```
```
[-id id:Switch - List userIDs]

```

### GiveRole

**Aliases:** grole/arole/addrole

Gives a role to the specified member, with optional expiry


**Usage:**
```
GiveRole <User:Mention/ID> <Role:Role> [Duration:Duration]
```

### RemoveRole

**Aliases:** rrole/takerole/trole

Removes the specified role from the target


**Usage:**
```
RemoveRole <User:Mention/ID> <Role:Role>
```

### automod Rulesets

**Aliases:** r/list/l

Lists all rulesets and their status


**Usage:**
```
Rulesets
```

### automod Toggle

**Aliases:** t

Toggles a ruleset on/off


**Usage:**
```
Toggle <Ruleset-Name:Text>
```

### automod Logs

**Aliases:** log

Shows the log of the last triggered automod rules, optionally filtering by user


**Usage:**
```
Logs [Page:Whole number]
```
```
[-user user:Mention/ID]

```

### automod ListViolations

**Aliases:** Violations/ViolationLogs/VLogs/VLog

Lists Violations of specified user
 old flag posts oldest violations in first page ( from oldest to newest ).


**Usage:**
```
ListViolations <User:Mention/ID> [Page-Number:Whole number]
```
```
[-old old:Switch - Oldest First]

```

### automod ListViolationsCount

**Aliases:** ViolationsCount/VCount

Lists Violations summary in entire server or of specified user optionally filtered by max violation age.
 Specify number of violations to skip while fetching using -skip flag ; max entries fetched 500


**Usage:**
```
ListViolationsCount [User:Mention/ID]
```
```
[-ma ma:Duration - Max Violation Age]
[-skip skip:Whole number - Amount Skipped]

```

### automod DeleteViolation

**Aliases:** DelViolation/DelV/DV

Deletes a Violation with the specified ID. ID is the first number of each Violation in the ListViolations command.


**Usage:**
```
DeleteViolation <ID:Whole number>
```

### automod ClearViolations

**Aliases:** ClearV/ClrViolations/ClrV

Clears Violations of specified user (or global if User ID = 0 or unspecified) optionally filtered by Name, Min/Max age and other conditions. By default, more recent violations are preferentially cleared. Maximum of 2000 can be cleared at a time.


**Usage:**
```
ClearViolations <User:Mention/ID> <Violation-Name:Text>
ClearViolations <User:Mention/ID>
ClearViolations <Violation-Name:Text>
ClearViolations

```
```
[-ma ma:Duration - Max Violation Age]
[-minage minage:Duration - Min Violation Age]
[-num num:Whole number - Max Violations Cleared]
[-old old:Switch - Preferentially Clear Older Violations]
[-skip skip:Whole number - Amount Skipped]

```

## Rolemenu 🔘

### RoleMenu Create

**Aliases:** c

Set up a role menu.
Specify a message with -m to use an existing message instead of having the bot make one

To get the id of a message you have to turn on developer mode in Discord's appearances settings then right click the message and copy id.

**Usage:**
```
Create <Group:Text - The role command group>
```
```
[-m m:Whole number - Message ID]
[-nodm nodm:Switch - Disable DM]
[-rr rr:Switch - Remove role on reaction removed]
[-skip skip:Whole number - Number of roles to skip]

```

### RoleMenu Remove

**Aliases:** rm

Removes a rolemenu from a message.
The message won't be deleted and the bot will not do anything with reactions on that message

To get the id of a message you have to turn on developer mode in Discord's appearances settings then right click the message and copy id.

**Usage:**
```
Remove <Message-ID:Whole number>
```

### RoleMenu Update

**Aliases:** u

Updates a rolemenu, toggling the provided flags and adding missing options, aswell as updating the order.


To get the id of a message you have to turn on developer mode in Discord's appearances settings then right click the message and copy id.

**Usage:**
```
Update <Message-ID:Whole number>
```
```
[-nodm nodm:Switch - Disable DM]
[-rr rr:Switch - Remove role on reaction removed]

```

### RoleMenu ResetReactions

**Aliases:** reset

Removes all reactions on the specified menu message and re-adds them.
Can be used to fix the order after updating it.

To get the id of a message you have to turn on developer mode in Discord's appearances settings then right click the message and copy id.

**Usage:**
```
ResetReactions <Message-ID:Whole number>
```

### RoleMenu EditOption

**Aliases:** edit

Allows you to reassign the emoji of an option, tip: use ResetReactions afterwards.


To get the id of a message you have to turn on developer mode in Discord's appearances settings then right click the message and copy id.

**Usage:**
```
EditOption <Message-ID:Whole number>
```

### RoleMenu Complete

**Aliases:** finish

Marks the menu as done.


To get the id of a message you have to turn on developer mode in Discord's appearances settings then right click the message and copy id.

**Usage:**
```
Complete <Message-ID:Whole number>
```

### RoleMenu Listgroups

**Aliases:** list/groups

Lists all role groups


**Usage:**
```
Listgroups
```

## Tickets 🎫

### tickets Open

**Aliases:** create/new/make

Opens a new ticket


**Usage:**
```
Open <subject:Text>
```

### tickets AddUser

Adds a user to the ticket in this channel


**Usage:**
```
AddUser <target:Member>
```

### tickets RemoveUser

Removes a user from the ticket


**Usage:**
```
RemoveUser <target:Member>
```

### tickets Rename

Renames the ticket


**Usage:**
```
Rename <new-name:Text>
```

### tickets Close

**Aliases:** end/delete

Closes the ticket


**Usage:**
```
Close [reason:Text]
```

### tickets AdminsOnly

**Aliases:** adminonly/ao

Toggle admins only mode for this ticket


**Usage:**
```
AdminsOnly
```

## Events 🎟

### events Create

**Aliases:** new/make

Creates an event, You will be led through an interactive setup


**Usage:**
```
Create
```

### events Edit

Edits an event


**Usage:**
```
Edit <ID:Whole number>
```
```
[-title title:Text - Change the title of the event]
[-time time:Text - Change the start time of the event]
[-max max:Whole number - Change max participants]

```

### events List

**Aliases:** ls

Lists all events in this server


**Usage:**
```
List
```

### events Delete

**Aliases:** rm/del

Deletes an event, specify the event ID of the event you wanna delete


**Usage:**
```
Delete <ID:Whole number>
```

### events StopSetup

**Aliases:** cancelsetup

Force cancels the current setup session in this channel


**Usage:**
```
StopSetup
```
