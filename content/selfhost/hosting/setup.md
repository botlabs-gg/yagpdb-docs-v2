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

For simplicity, we will go over starting the bot in a container here.
If you wish to run a baremetal installation instead, please continue on the next page.

### Starting Dockerized

Before you can start the container, you will need some configuration values.
Go into the `yagpdb_docker` directory and opy `app.example.env` to `app.env` and `db.example.env` to `db.env`.
Open both in an editor of your choice.

For basic functionality, the following variables **must** be set.

```env
# file: app.env
YAGPDB_OWNER=... # Your Discord user ID
YAGPDB_BOTTOKEN=... # Obtained from the developer portal
YAGPDB_CLIENTID=... # see above
YAGPDB_CLIENTSECRET=... # see above
YAGPDB_HOST=... # domain or IP for the control panel. Can also be localhost
```

Furthermore, ensure that the following variables in `db.env` match the commented ones specified in `app.env`.

```env
# file: db.env
POSTGRES_DB=... # YAGPDB_PQHOST
POSTGRES_USER=... # YAGPDB_PQUSERNAME
POSTGRES_PASSWORD=... # YAGPDB_PQPASSWORD
```

Save both files and switch back to your terminal.
If everything is correct, you should be able to start the bot.

```shellsession
docker-compose -f docker-compose.yml up
```

During development, use the `docker-compose.dev.yml` file instead.

This will run everything the bot has to offer---some plugins may log some errors, but those can be safely ignored for now.
The control panel will be accessible on the ports `80` and `443`---if you prefer `5000` and `5001`, remove the `-pa` flag from the command in the compose file.
