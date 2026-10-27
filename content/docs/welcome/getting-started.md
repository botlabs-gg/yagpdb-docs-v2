+++
title = "Getting Started"
weight = 120
description = "The first steps to setting up YAGPDB on your server."
+++

> The hardest thing about getting started, is getting started. - Guy Kawasaki

## Adding The Bot

{{< callout context="note" title="Note: Required User Permission" icon="outline/info-circle" >}}

You need to have the **Manage Server** permission to add the bot to your server.

{{< /callout >}}

1. Go to <https://yagpdb.xyz/manage>
2. Click on _Login with Discord_ in the top-right corner
3. Authorize the application to know what servers you are in
4. Select the server you want to add the bot to in the dropdown menu

### Quick Setup

The first time you bring the bot into a server, YAGPDB offers a quick setup page that turns on the features most servers want, without visiting each settings page yourself.
It can enable:

- **Moderation**: commands to ban, kick, mute and warn, with a log of what your moderators do.
- **Auto Moderation**: automatic rules against spam, bad words, and unwanted links.
- **Welcome Messages**: a greeting when someone joins.
- **Auto Role**: a role given to new members automatically.
- **Tickets**: private support channels members can open.
- **Verification**: a check new members pass before they get access.

Only features YAGPDB has the permissions for are offered, and anything you have already configured is left alone.
You can skip the page entirely and set everything up by hand, and you can reach it again later at `/manage/<server id>/setup`.

### First Steps

Before doing anything, you should first take a closer look at the Control Panel you just opened.
It is the main interface for configuring the bot, and is where you will spend most of your time.
Visit a few subpages to get a feel for the navigation and layout.

<!-- Yes, this is hacky. No, I don't know of a better way. -->
<div style="float: right; margin-left: 7px; margin-top: -10px;">

![Visual reference when all commands are enabled.](all_commands_enabled.png?classes=right)

</div>

Afterward, visit the Commands tab (Core > Command settings) and make sure to enable all commands, such that you can actually use YAGPDB.

Try some commands!
Something like `/fun catfact` or `/fun dadjoke`, to get the party going.
If those did not work, please read the FAQ on the support server.

## About this Documentation

This documentation aims to go through all of YAGPDB's features as they appear in the order on the control panel.
Reference material, or miscellaneous topics are in their own category as to not bloat things up with unnecessary detail.

We recommend reading this document in its entirety, from start to finish, exempting reference material, before or during setup.
