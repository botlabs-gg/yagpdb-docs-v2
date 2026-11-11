+++
title = "Cards Against Humanity"
weight = 930
description = "Play Cards Against Humanity in a channel, and build your server's own card packs."
+++

YAGPDB can host a game of Cards Against Humanity in a text channel.
Everything happens in the channel itself, so nobody needs to have DMs open to play.

## Playing a Game

Start a game with `/cah create` in the channel you want to play in.

If you do not name any packs, YAGPDB shows you a menu to pick them from.
You can also type them instead, separated by spaces, or `*` for every available pack:

```txt
/cah create packs:main fantasy
/cah create packs:*
```

YAGPDB then posts the game message, which is where the whole game is played from.
It carries three buttons:

| Button | What it does                                       |
| ------ | -------------------------------------------------- |
| ➕      | Join the game.                                     |
| ➖      | Leave the game.                                    |
| ⏯      | Start the game, or pause and resume it afterwards. |

Once the game is running, each round works like the card game:

1. A prompt card is posted in the channel.
2. Every player picks their response from **their own cards**, shown to them privately in the channel.
3. The winning response is chosen, and the player who submitted it scores a point.

The first player to reach the server's points limit wins.

{{< callout context="note" title="Note: Your Cards Are Private" icon="outline/info-circle" >}}

Your hand is shown to you as a message only you can see, right in the channel.
YAGPDB does not DM you, so a game works even for members who have DMs from server members turned off.

If a prompt uses a blank card, picking it opens a small form where you type your own response.

{{< /callout >}}

### Choosing the Winner

There are two ways a round is decided, set per server and overridable per game:

- **Card czar**: one player each round reads the responses and picks their favourite.
- **Vote**: every player votes on the winner, and nobody sits the round out as czar.

Pass `mode` to `/cah create` to override the server default for one game:

```txt
/cah create mode:vote
/cah create mode:czar
```

### Ending a Game and Removing Players

- `/cah end` stops the game running in the channel. The player who started it can always end it, and so can anyone with server management permissions.
- `/cah kick <user>` removes a player from the game. Only the player who started the game can do this.
- `/cah packs` lists every pack available on the server, including your own.

## Server Settings

The **Cards Against Humanity** page on the control panel sets the defaults every new game uses.

| Setting                                  | Default | Notes                                         |
| ---------------------------------------- | ------- | --------------------------------------------- |
| Default packs                            | `main`  | Used when `/cah create` is run with no packs. |
| Vote mode                                | Off     | Players vote instead of having a card czar.   |
| Points needed to win                     | 10      | Between 1 and 25.                             |
| Maximum players                          | 10      | Between 2 and 11.                             |
| Seconds players have to pick their cards | 60      | Between 30 and 180.                           |
| Seconds to pick the winner               | 90      | Between 30 and 180.                           |

### Turning Packs Off

The **Built-in packs** section lists the packs that ship with the bot, with the number of prompts and responses in each.
Turning one off removes it from the game entirely: it cannot be picked in the menu, named in `/cah create`, or included by `*`.

This is how you keep the rougher packs out of a family-friendly server.

## Custom Packs

{{< callout context="premium" title="Premium: Custom Packs" icon="outline/sparkles" >}}

Writing and playing your own packs is a [premium](/docs/welcome/premium) feature.

A server that loses premium keeps its packs and can still delete them, but they will not appear in games until premium is active again.

{{< /callout >}}

A server can have up to **10** custom packs, each holding up to **500** cards.
Create one under **Custom packs** on the same page.

Each pack needs:

- A **name** with no spaces, since this is what players type in `/cah create`.
- A **description**, shown in the pack menu and in `/cah packs`.
- **Prompts** and **responses**, one per line.

### Writing Cards

Responses are plain lines of text, up to **200** characters each.

Prompts are the cards with a gap to fill in, up to **300** characters each.
Mark each gap with three or more underscores:

```txt
I never truly understood ___ until I encountered ___.
```

A prompt may have at most **3** blanks, and each blank makes players submit one more card.
A prompt written with no blank at all is treated as having one at the end, so you do not have to add it yourself.
