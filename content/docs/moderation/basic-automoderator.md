+++
title = "Basic Automoderator"
weight = 420
description = "A very basic automoderator to get things done quickly."
+++

## Intro

Basic Automoderator lets you quickly set up _basic_ automoderation, without much fuss. For that reason, its
overall customizability is quite limited. If you would like a more detailed configuration, please use the
[Advanced Automoderator](/docs/moderation/advanced-automoderator/overview).

You configure violation thresholds and their expiry for predefined rules. These thresholds define when an offending user
will be muted, kicked, or banned; a warning and a subsequent deletion of the offending message are always issued.

## Configuration

You can turn on individual rules as needed, however for them to work at all you must enable Basic Automoderator as a
whole in the **General** tab.

### Violations

Each rule has its own violation counter and expiry, granting you some control over how many times a user can break a
specific rule. The expiry time of a violation is between 0 ("never") and 44640 minutes (31 days).

Within each rule, you can configure after how many violations a given punishment will be issued, be that a mute, kick,
or ban. Setting a threshold to 0 will disable that punishment.

### Ignored Role

You can specify one role on a per-rule basis that will be ignored by that rule. This is useful for exempting moderators
from certain rules, for example. If you do not specify an ignored role, the rule will apply to all users, including
admins and the server owner.

### Ignored Channels

Just like the ignored role, you can specify multiple channels that will be ignored by a rule. This may be useful for
e.g. a testing channel where you want to allow certain behavior that would otherwise be disallowed.

### Rules

Basic Automoderator comes with the following set of rules that should cover most basic needs. To reiterate, a warning
and a deletion of the offending message will always be issued, regardless of other configured thresholds.

#### Slowmode

This rule will trigger when a user sends more than the configured amount of messages within the configured time frame in
seconds. It does not consider general spam across channels.

Something decent to just protect from raw spam could be five messages within two seconds. Normal users won't
easily come near that, and it would target actual spammers.

#### Mass Mention

This rule will trigger when a user mentions more than the configured amount of users in a single message. It does
not trigger for multiple mentions to the same user, nor does it apply cross-channel checks.

#### Server Invites

This rule will trigger when a user sends a message containing a server invite link. It does not trigger for invites
pointing to the same server the message is sent in.

#### Links

This rule will trigger when a user sends a message containing _any_ link, GIFs from Discord's GIF-Picker included.
Unless you have a very specific use-case, and know what you're doing, we recommend using
[Banned Websites](#banned-websites) instead.

#### Banned Words

This rule will trigger when a user sends a message containing any of the configured banned words; you can enable a
pre-defined list of words generally considered bad, or define your own list of words, or both.

It is case-insensitive and does not trigger for words that are part of other words. See also the [Scunthorpe
Problem](https://en.wikipedia.org/wiki/Scunthorpe_problem).

To add your own words, scroll to the bottom of the rule's configuration page and add one word per line.

#### Banned Websites

This rule will trigger when a user sends a message containing a link to any of the configured banned websites.
Additionally, you can enable the Google Safe Browsing integration to check links against Google's database of known
unsafe links, as well as another separately enabled integration to check links against a list of known phishing sites.

To add your own websites, scroll to the bottom of the rule's configuration page and add one domain per line. For
example, if you were to block Google, you'd enter `google.com`, **_not_** `https://google.com`. The rule will also
consider subdomains.
