+++
title = "How to Get IDs"
weight = 1060
description = "Snowflake? ID? I don't know, but this page does!"
+++

Details on obtaining IDs for users, channels, roles, etc. for use within YAGPDB.

### User IDs

Can be found by mentioning the user then adding a \ such as `\@YAGPDB.xyz#8760`. Alternatively if you have
developer mode on, you can right-click and select Copy ID. [How to enable developer mode in Discord][devmode]

[devmode]: https://support.discordapp.com/hc/en-us/articles/206346498

### Channel IDs

Can be found by mentioning the channel then adding a \ such as `\#announcements`. Alternatively if you
have developer mode on, you can right-click on the channel and select Copy ID.

### Role IDs

Use the `listroles` command.

### Emoji IDs

If it is a **custom emoji**, adding a \ in front of the emoji such as `\:yag:` will display the name along with the ID
such as `<:yag:277569741932068864>`. On an Android device remove backslash and enclose `:yag:` inside backticks
`` `:yag:`. ``

If it is an **animated emoji**, do the same steps as a normal emoji. If you do not have Discord Nitro, you can have a
friend or a bot use the emoji and right-click on the emoji to open its link. The ID will be a part of the URL.

If it is a **default emoji**, look up the Unicode for the emoji on Google. Note that some of the more customized default
emojis such as some of the family emojis will not work in any of the YAGPDB commands.
