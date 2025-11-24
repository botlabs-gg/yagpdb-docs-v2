+++
title = "Introduction"
description = "Start here!"
weight = 110
+++

This section is intended for users who wish to selfhost YAGPDB, either for development purposes or because they just want to run the bot on their own hardware.

## Support Disclaimer

Whilst the YAGPDB team (attempts to) provides documentation for this endeavour, please note that only a handful actually selfhosts the bot---therefore, we're unable to provide extensive support.
That is to say, unless you can reproduce an issue on the officially hosted instance, you're on your own resolving it.

Feel free, however, to discuss your questions in the `#self-hosting-discussion` channel on the [support server](/discord).

This guide will not go into the depths of system administration.
Securing your system and managing updates is entirely left to you.

## System Requirements

YAGPDB is, for small deployments, quite lean on resources.
In general, 1 GB of RAM should be sufficient for up to 100 guilds served, with some CPU to match.
About 20 GB of disk-storage (not counting the OS) are generally more than enough.

These are just general recommendations---you should always monitor your system resources and act accordingly!

Depending on your deployment goals, you will also need the following tools on the target machine.

### From Source

If you wish to run YAGPDB from source, for example because you intend to develop some patches, you will need

- the [latest Go toolchain](https://go.dev/dl/)
- Git
- [PostgreSQL](https://www.postgresql.org/download/)
- [Redis](https://redis.io/) or [Valkey](https://valkey.io/) (drop-in replacement for Redis).

Of course, check your distro's repositories if these packages are conveniently available (and up to date).
Obviously you can also cross-compile; Redis/Valkey and PostgreSQL are runtime dependencies and must be installed on the target machine.

### Dockerized

If you just want to pull up an instance of YAGPDB, Docker might be the easiest way.
For that, you need

- Docker with the [docker compose plugin](https://docs.docker.com/compose/)
- optionally Git such that you can build your own container from source.

## Release Schedule

YAGPDB does not follow a strict release schedule.
In general, releases are issued every two weeks for general updates, but critical bug fixes may be issued in-between.
Follow the [releases page](https://github.com/botlabs-gg/yagpdb/releases) for any updates.
