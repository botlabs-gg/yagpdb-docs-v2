+++
title = "Initial Setup"
description = "On this page, we will explain how to let Discord know about your bot and to configure YAGPDB accordingly."
weight = 210
+++

On this page, we will explain how to let Discord know about your bot and to configure YAGPDB accordingly.

## Discord

Every Discord user requires an identity, the same goes for any bot on Discord.
Follow the below steps to setup YAGPDB on the Discord side of your deployment.

### Creating a New Application

Login to the [Discord Developer Portal](https://discord.com/developers/applications) with the same credentials you use to login to Discord itself.

Create a new application and follow the instructions.
The name of the application will help you identify it later, it will not be your bot's username.

Head to your application's general configuration tab.
There you can change the name, description, and icon; the other settings are not relevant to us.

### Creating the Bot

Next, go to the Bot tab and add a bot to your application.
After you created a new bot, you can upload a profile picture and change its username.
On the same page, scroll down to the privileged gateway intents and make sure all are activated.
Without those, your instance of YAGPDB will not work.

Next, switch to the OAuth2 tab.

### OAuth2

We'll need two redirects that will allow you to login to the control panel of your instance.
Create them with the following URIs, where `YAGPDB_HOST` is the domain or IP you wish to use to access the control panel.
Of course, if you only intend to have the bot be local to your machine, `localhost` also works.

- `YAGPDB_HOST/confirm_login`
- `YAGPDB_HOST/manage`

If you're unsure yet, leave out this step and come back later.

## Configuring YAGPDB

YAGPDB reads its configuration from environment variables.
Every option has a dotted internal name, which maps to an environment variable by uppercasing it and replacing dots with underscores.
For example, `yagpdb.disable_prefix_commands` becomes `YAGPDB_DISABLE_PREFIX_COMMANDS`.
Boolean options accept `true`, `yes`, `on`, `enabled`, or `1`; anything else counts as false.

`cmd/yagpdb/sampleenvfile` in the repository lists the commonly used variables with comments.
Copy it, fill it in, and source it (or hand it to your process manager) before starting the bot.

### Host and HTTPS

`YAGPDB_HOST` is the domain or IP the control panel is served from, and it is more than cosmetic.
The web server derives its base URL from it, and that base URL is the only origin allowed to submit forms to the control panel.
If the value does not match what you actually type into your browser, every save on the control panel fails with a "Bad origin" error.

The scheme is taken from the HTTPS flags rather than from `YAGPDB_HOST`, so a reverse proxy that terminates TLS needs `-exthttps=true`:

- `-https=true` (the default): YAGPDB serves HTTPS itself, and the base URL is `https://$YAGPDB_HOST`.
- `-https=false -exthttps=true`: YAGPDB listens on plain HTTP behind a proxy that serves HTTPS. The base URL is still `https://$YAGPDB_HOST`.
- `-https=false -exthttps=false`: plain HTTP end to end, suitable for `localhost`. The base URL is `http://$YAGPDB_HOST`.

Getting this wrong behind a reverse proxy is the usual cause of a control panel that loads fine but refuses to save anything.
The session cookie is also marked `Secure` in the first two cases and `SameSite=Lax` in all of them.

### Privacy Defaults

Several options that affect what YAGPDB reads and stores are opt-in.
Nothing was removed, but the defaults changed, so an instance upgrading from an older version will behave differently unless you set these yourself.

| Variable                          | Default | Effect                                                                                                |
| --------------------------------- | ------- | ----------------------------------------------------------------------------------------------------- |
| `YAGPDB_ENABLE_PREFIX_COMMANDS`   | `false` | When true, built-in commands also run from typed messages. See [Text Commands](#text-commands) below. |
| `YAGPDB_ENABLE_USERNAME_TRACKING` | `false` | When true, records username and nickname history.                                                     |
| `YAGPDB_VERIFICATION_TRACK_IPS`   | `false` | When true, records the IP a member verified from, which is what alt detection compares against.       |
| `YAGPDB_ENABLE_MESSAGE_LOG_PURGE` | `true`  | When true, deletes message logs older than 30 days.                                                   |

What each one costs you when left at its default:

- **Username tracking** off means the `usernames`, `nicknames`, and `resetpastnames` commands stay unavailable, and the `pastUsernames` and `pastNicknames` custom command functions return an error. Rows already in `username_listings` and `nickname_listings` are left alone, so delete them yourself if you want that history gone.
- **Verification IP tracking** off means [alt detection](/docs/moderation/verification#alt-detection), including alt banning and alt reporting, does not run. Existing rows keep their stored IPs.
- **Message log purge** on means a backlog accumulated by an older instance is deleted on the first run. Take a backup first if you need it.

{{< callout context="warning" title="Warning: Renamed Variable" icon="outline/alert-triangle" >}}

`YAGPDB_DISABLE_PREFIX_COMMANDS` is gone, replaced by `YAGPDB_ENABLE_PREFIX_COMMANDS` with the opposite meaning.
If your env file still sets the old name, it does nothing, and built-in commands will no longer run from typed messages.

{{< /callout >}}

### Text Commands

The official instance no longer lets members run built-in commands by typing them into a channel, in favor of slash commands and bot mentions.
See [Text Commands Have Been Discontinued](/docs/core/command-settings#text-commands-have-been-discontinued) for the user-facing side.
Your own instance behaves the same way unless you set `YAGPDB_ENABLE_PREFIX_COMMANDS=true`.

Set `YAGPDB_ENABLE_PREFIX_COMMANDS_WARNING=true` to have YAGPDB reply to a typed built-in command with a short reminder naming the slash command to use.
That reply deletes itself after about 10 seconds, and is skipped when one of the server's own custom commands shares the name.
The reminder only appears while built-in commands are off, since there is nothing to warn about while they still work.

The activator your members use for custom commands is unaffected by any of this.

{{< callout context="note" title="Note: Only Built-In Commands" icon="outline/info-circle" >}}

Turning these off does not remove YAGPDB's need for the message content intent.
Custom commands, automoderator, and message logging still read message content.

{{< /callout >}}

## Obtain YAGPDB Sources

Clone the Git repository from <https://github.com/botlabs-gg/yagpdb> and change into the clone.
From here on, you have two options: compile everything from source and run a baremetal installation, or use Docker.

{{< card-grid >}}
{{< link-card title="Docker" href="/selfhosting/hosting/docker" >}}
{{< link-card title="Baremetal" href="/selfhosting/hosting/baremetal" >}}
{{< /card-grid >}}
