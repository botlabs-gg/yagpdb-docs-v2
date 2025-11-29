+++
title = "Initial Setup"
description = ""
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

## Obtain YAGPDB Sources

Clone the Git repository from <https://github.combotlabs-gg/yagpdb> and change into the clone.
From here on, you have two options: compile everything from source and run a baremetal installation, or use Docker.

{{< card-grid >}}
{{< link-card title="Docker" href="/selfhosting/hosting/docker" >}}
{{< link-card title="Baremetal" href="/selfhosting/hosting/baremetal" >}}
{{< /card-grid >}}
