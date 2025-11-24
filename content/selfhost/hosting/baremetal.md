+++
title = "Baremetal Installation"
weight = 220
+++

Running a baremetal installation of YAGPDB is a little more involved, but comes with the benefit of reduced compilation times, as no container has to be rebuilt.
This is especially useful if you intend to contribute to the project by writing patches.

## Prerequisites

As mentioned in the introduction, you will need Git, Go, PostgreSQL, and Redis or Valkey installed.
Use your distro's package repositories if they're up to date, otherwise install those dependencies manually.

## Configuration

### PostgreSQL

We'll start with configuring PostgreSQL, the backend database for larger and/or infrequently accessed data.
Start by switching to the `postgres` user and connect to the database server (you may need to start it first).

```shellsession
su postgres
psql
```

Next, we create the database, a new database user for the bot to use and finally grant some permissions on said database.

```sql
create database yagpdb;
create user yagpdb with encrypted password 'mypassword';
grant all privileges on database yagpdb to yagpdb;
\c yagpdb
grant usage, create on schema public to yagpdb;
\q
```

### Redis/Valkey

Valkey is a drop-in replacement for Redis, they are functionally the same.
You shouldn't need to make any changes to the configuration file, but it may be pertinent to at least skim it for a bit.

Start the server via `systemctl start valkey` on a systemd distro.

### Environment

Make sure the following variables are available in your environment:

```env
YAGPDB_BOTTOKEN= # obtained via the discord developer portal
YAGPDB_CLIENTID= # see above
YAGPDB_CLIENTSECRET= # see above
YAGPDB_HOST= # domain or IP for the control panel; can also be localhost
YAGPDB_PQUSERNAME= # must match what you set as username during postgresql configuration
YAGPDB_PQPASSWORD= # see above
YAGPDB_REDIS= # the address of the redis server, if on the same machine localhost:6379
```

Most export them in their `~/.profile`, but tools like [direnv](https://direnv.net/) are also possible.

## Compiling YAGPDB

Now that we configured everything YAGPDB needs to work, we can compile it.
You should already have a copy of the source code on your machine.
Change into the `cmd/yagpdb/` directory of the repository.

To compile YAGPDB with a version such that it shows up in the `status` command, we have to checkout a release tag.
Find whichever is the latest one and run `git checkout vX.Y.Z`.
Afterwards, run the build script with `sh build.sh`.
This may take a moment as the Go toolchain downloads the necessary dependencies and compiles the binary.

Finally, we can start the bot with everything it has to offer.

```shellsession
./yagpdb -all
```

YAGPDB's web server can handle HTTPS traffic for you, but you may wish to disable it (for example because you are behind a reverse proxy).
For that, we provide the `-https=false` and `-exthttps=true` flags to the command.
If you want to completely disable HTTPS (good for `localhost`), adjust accordingly to `-https=false -exthttps=false`.

Also consider reading the help text from `./yagpdb -help`.
