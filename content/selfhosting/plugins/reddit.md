+++
title = "Reddit"
description = "Reddit setup for selfhosted YAGPDB"
weight = 310
+++

In order to enable Reddit feeds you'll need to get some Reddit API credentials and let your bot know about them.

## Creating a Reddit App

Go to <https://www.reddit.com/prefs/apps/> and create a new application.
Select the "web app" option and fill in the name and redirect URI.
Optionally fill in a description and an about URL.

Ideally, the redirect URI should point to your domain where your instance is hosted.
Obviously, if you are just hosting locally on `localhost`, Reddit won't be able to reach it.
For this specific case, you can use `http://www.example.com/unused/redirect/uri` as the redirect URI.

Take good note of the client ID, the client secret, and the redirect URI as you'll need them later.
You find the client ID right under the name of your app, and the client secret next to "secret".

### Obtaining an Access Token

Get an authorization token from Reddit by visiting the following URL.
Replace `CLIENT_ID` with your app's client ID, `RANDOM_STRING` with a random string of your choice, and `URI` with the redirect URI you set when creating the app.

```txt
https://www.reddit.com/api/v1/authorize?client_id=CLIENT_ID&response_type=code&state=RANDOM_STRING&redirect_uri=URI&duration=permanent&scope=read
```

Allow the app to connect to your Reddit account.
After allowing the app to connect, you'll be redirected to the redirect URI you specified.
Make note of the information attached as a query parameter behind the `code=` key, until the `#_` fragment.
That is your authorization token.

```txt
https://example.com/?state=yagpdb&code=authorization_token#_
```

### Retrieving a Refresh Token

You need one more thing before you can configure Reddit feeds in YAGPDB: a refresh token.
You can get it by making a POST request to Reddit's access token endpoint.

Replace `AUTHORIZATION_TOKEN` with the authorization token you obtained in the previous step, `URI` with the redirect URI you set when creating the app, `CLIENT_ID` with your app's client ID, and `CLIENT_SECRET` with your app's client secret.

```shellsession
$ curl -X POST -d "grant_type=authorization_code&code=AUTHORIZATION_TOKEN&redirect_uri=URI" \
  --user "CLIENT_ID:CLIENT_SECRET" \
  -A 'myuseragent' https://www.reddit.com/api/v1/access_token

{
    "access_token": Your access token,
    "token_type": "bearer",
    "expires_in": Unix Epoch Seconds,
    "scope": A scope string,
    "refresh_token": Your refresh token
}
```

Take note of `refresh_token` in the response.
If you receive an error instead, retrieve a new authorization token and try again.

## Configuring YAGPDB

Now that you have all the necessary credentials, you can configure YAGPDB to use them.
Copy your credentials into your environment variables.

```dotenv
YAGPDB_REDDIT_CLIENT_ID=your_client_id
YAGPDB_REDDIT_CLIENTSECRET=your_client_secret
YAGPDB_REDDIT_REDIRECTURI=your_redirect_uri
YAGPDB_REDDIT_REFRESHTOKEN=your_refresh_token
```

Make sure that the process has access to these environment variables, depending on your deployment, then add `reddit` to the list of enabled feeds.

```shellsession
./yagpdb -bot -web -backgroundworkers -feeds reddit
```
