+++
title = "Verification"
description = "reCAPTCHA setup and alt detection for selfhosted YAGPDB"
weight = 340
+++

[Verification](/docs/moderation/verification) asks new members to solve a CAPTCHA before they get access to your server.
Two parts of it only work on a selfhosted instance, and both are covered here.

## Alt Detection

Alt detection works by recording the IP a member verified from and comparing it against other users who have verified using YAGPDB.

Recording that IP is **off by default**, so alt detection does not run unless you opt in by setting `YAGPDB_VERIFICATION_TRACK_IPS=true`.
With it off, verification still works normally; only the IP comparison and the two features below are skipped.
The CAPTCHA part of the verification plugin is unaffected either way.

This is also why alt detection does not work on the official instance of YAGPDB hosted by Botlabs, which leaves IP tracking off.

### Alt Banning

When a user is banned for any reason (including bans made outside the bot), YAGPDB will automatically ban any alt accounts detected for that user.

If a new user verifies who shares an IP with a previously banned user, they will be banned as well.

### Alt Reporting

If a new user who verifies is detected as an alt but none of their associated accounts have been banned, YAGPDB will send a log to the verification log channel if specified, identifying the new user as an alt and listing other users who verified at the same IP address.

## Enabling Verification

Verification requires the `google.recaptcha_secret` and `google.recaptcha_site_key` env variables to be configured and valid.
To get a reCAPTCHA secret and site key, [register a site on reCAPTCHA](https://www.google.com/recaptcha/admin/create) and copy the generated secret and key.
