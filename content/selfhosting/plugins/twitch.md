+++
title = "Twitch"
description = "Twitch setup for selfhosted YAGPDB"
weight = 330
+++

In order for you to enable Twitch feeds you'll need to get Twitch API credentials and then add them to your bot setup.

## Creating a Twitch App

1. Go to the [Twitch Developer Console](https://dev.twitch.tv/console/apps) and log in with your Twitch account.
2. Click on "Register Your Application".
3. Fill in the required fields:
   - **Name**: Choose a name for your application.
   - **OAuth Redirect URLs**: You can use `http://localhost` if you're just testing locally.
   - **Category**: Select the appropriate category for your application. ("Other" should work fine.)

{{< callout context="caution" title="Warning: OAuth Must Use HTTPS" icon="outline/alert-triangle" >}}

Twitch requires that OAuth Redirect URLs use HTTPS. If you're testing locally, you can use a placeholder URL as mentioned above, but for production use, ensure you have a valid HTTPS URL.

{{< /callout >}}

After registering your application, head back to the Developer Console and manage your newly created app to find your **Client ID** and **Client Secret**.
You may need to generate a new client secret if it is not displayed.

## Configuring YAGPDB

The configuration for Docker and baremetal setups is the same for Twitch.
Make the following two environment variables available to your YAGPDB instance.

```dotenv
YAGPDB_TWITCH_CLIENTID=your_client_id
YAGPDB_TWITCH_CLIENTSECRET=your_client_secret
```

Restart your bot with `twitch` added to the list of enabled feeds.

```shellsession
./yagpdb -bot -web -backgroundworkers -feeds twitch
```
