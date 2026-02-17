+++
title = "Docker Installation"
weight = 220
description = "Selfhost YAGPDB using Docker. This page covers the configuration and setup of a Docker instance of YAGPDB."
+++

The easiest way to get your instance of YAGPDB running may be via Docker.
For that, you'll need Docker with the Docker Compose plugin installed.

You should already have a clone of the sources on your disk from the previous page.

## Configuration

Before you can start the container, you will need some configuration values.
Go into the `yagpdb_docker` directory and opy `app.example.env` to `app.env` and `db.example.env` to `db.env`.
Open both in an editor of your choice.

For basic functionality, the following variables **must** be set.

```dotenv
# file: app.env
YAGPDB_OWNER=... # Your Discord user ID
YAGPDB_BOTTOKEN=... # Obtained from the developer portal
YAGPDB_CLIENTID=... # see above
YAGPDB_CLIENTSECRET=... # see above
YAGPDB_HOST=... # domain or IP for the control panel. Can also be localhost
```

Furthermore, ensure that the following variables in `db.env` match the commented ones specified in `app.env`.

```dotenv
# file: db.env
POSTGRES_DB=... # YAGPDB_PQHOST
POSTGRES_USER=... # YAGPDB_PQUSERNAME
POSTGRES_PASSWORD=... # YAGPDB_PQPASSWORD
```

## Starting The Bot

Save both files and switch back to your terminal.
If everything is correct, you should be able to start the bot.

```shellsession
docker-compose -f docker-compose.dev.yml up
```

This will run everything the bot has to offer---some plugins may log some errors, but those can be safely ignored for now.
The control panel will be accessible on the ports `80` and `443`---if you prefer `5000` and `5001`, remove the `-pa` flag from the command in the compose file.

## Community Image

If you have no need to build your own image, for example because you don't intend on modifying the bot in any way, you can use a premade image like [teyker/yagpdb].
Edit the `docker-compose.yml` file such that that the `image` directive points to that image, and comment out all `build` directives.

[teyker/yagpdb]: https://hub.docker.com/r/teyker/yagpdb

```yaml
# file: yagpdb_docker/docker-compose.yml

services:
  app:
    # insert the image you wish to use here
    image: teyker/yagpdb
# comment the following three lines out
  build:
    context: ../
     dockerfile: yagpdb_docker/Dockerfile
# ...
```

