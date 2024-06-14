+++
title = "Advanced Automoderator"
weight = 1
+++

A sophisticated automoderator system, allowing for more complex configurations than basic automoderator.

<!--more-->

## Intro

Advanced Automoderator is (quite obviously) a more detailed system than [Basic Automoderator](/docs/moderation/basic-automoderator).
It allows for more flexibility and complex configurations, but the trade-off is that some time investment is required
to set it up.

Advanced automoderator operates on the basis of user-configurable rules, which trigger on specific actions and
conditions to produce certain effects. Collections of rules are referred to as rulesets.

Finally, there are lists you can create, which can be used to black- or whitelist words or domains.

## Overview

First, let us explore the available tabs on the main page.

### Global Settings

This tab is your first stop when starting with Advanced Automoderator, as it is where you create new rulesets. Give it a
telling name and click the **Create** button. This will create a new tab with that name.

Furthermore, this is also the place to create and manage your lists. Lists are used to store words or domains that you
want to use as black- or whitelist triggers in your rules. More on that under [Lists](#lists).

### Logs

This tab can be useful when troubleshooting or testing your configuration, as it shows who fired what rule in what
ruleset, at what time, with which trigger. However, it is not a full log of messages, nor does it log moderation
actions.

## Configuration

With that out of the way, we'll go through how to _actually_ make Advanced Automoderator do the thing it's designed to.

### Lists

As mentioned above, lists are used to store words or domains that you want to use as black- or whitelist triggers in your
rules.

Multiple entries in word lists are separated by either a newline or a space. Entries in word lists must be single words
containing no spaces; to blacklist complete phrases, use a regex trigger instead.

For website / link lists, specify _just_ the site's domain, without any protocol or path. Subdomains will be
automatically included. Logically, if you want to _only_ check against some specific subdomain (and its sub-subdomains),
you will have to specify just that subdomain.

#### Limitations

You cannot have more than 5 (premium: 25) lists, and each list may not have more than 5000 characters.

### Rulesets

Rulesets are the overarching structure of your automoderator configuration. They are the containers for your rules, and
can be toggled on or off on the control panel, or with the `automod toggle <ruleset name>` command.

Several configuration options are available for each ruleset:

- **Name** — The name of the ruleset.
- **Enable ruleset** — Whether the ruleset is active or not.
- **Ruleset scoped conditions** — Conditions that apply to all rules in the ruleset.
- **Create a new rule** — Add a new rule to the ruleset.

#### Limitations

You cannot have more than 10 (premium: 25) rulesets. If you run into that limit, consider merging some rulesets
together, or removing some that are no longer needed.

### Rules

Rules are the actual meat of your automoderator configuration. They consist of triggers, conditions, and effects. We
will call those three things collectively [_rule parts_](#rule-parts).

A rule can have multiple triggers, conditions, and effects. All of them are optional, but a rule without at least one
trigger and effect is pointless.

When checking whether a rule applies, triggers follow the OR logic, while conditions and effects follow the AND logic.
That means for a rule to apply, _only one_ trigger has to be true, whilst _all_ conditions need be met, which
then fires _all_ effects.

#### Limitations

Across all rulesets, you cannot have more than 25 (premium: 150) rules. A rule may not consist of more than 25 rule
parts.

### Rule Parts

{{< card-grid >}}
{{< link-card title="Conditions" href="/conditions/" >}}
{{< link-card title="Effects" href="/effects/" >}}
{{< link-card title="Triggers" href="/triggers/" >}}
{{< /card-grid >}}
