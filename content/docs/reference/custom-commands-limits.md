+++
title = "Custom Commands Limits"
weight = 930
description = "Limits? I'm at my limit!"
+++

Various limits in YAGPDB custom commands (CC) for smooth functioning of the bot and misuse prevention.

## Overall

- **Max amount of CCs:** 100/250 (free/prem)
- **Max CCs that can be triggered by a single action:** 3/5 (free/prem)
- **Character limit:** 10k (5k for join/leave msg, warn dm, etc...)
- **Limit writer:** 25kB
- **Max operations:** 1M/2.5M (free/prem)
- **Response Character Limit:** 2k
- **Generic API based Action call limit:** 100 per CC
- **State Lock based Actions:** 500 per CC (mentionRoleName/ID ; hasRoleName ; targetHasRoleName/ID)

## Calling a Custom Command

### execCC

- **Calls per CC:** 1/10 (free/prem) -> counter key "runcc"
- **StackDepth limit:** 2 (executing with 0 delay)
- **Delay limit:** int64 limit (292 years)

### scheduleUniqueCC

- **Calls per CC:** 1/10 (free/prem) -> counter key "runcc"
- **Delay limit:** int64 limit (292 years)
- There can only be 1 per server per key

### cancelScheduledUniqueCC

- **Calls per CC:** 10/10 (free/prem) -> counter key "cancelcc"

## Context

- **Max file size (complexMessage):** 100kB
- **joinStr max string length:** 1000kB
- **sendDM:** 1 call per CC -> counter key "send_dm"
- **sendTemplate/sendTemplateDM:** 3 calls per CC -> counter key "exec_child"
- **addReactions:** 20 calls per CC -> counter key "add_reaction_trigger". Each reaction added counts towards the
  limit.
- **addResponseReactions:** 20 calls per CC -> counter key "add_reaction_response". Each reaction added counts towards
  the limit.
- **addMessageReactions:** 20 calls per CC -> counter key "add_reaction_message". Each reaction added counts towards
  the limit.
- **deleteMessageReaction:** 10 calls per CC -> counter key "del_reaction_message". Each reaction removed counts towards
  the limit.
- **editChannelName/Topic:** 10 calls per CC -> counter key "edit_channel"
- **regex cache limit:** 10 (this means you cant have more than 10 different regexes on a CC)
- **onlineCount:** 1 call per cc -> counter key "online_users"
- **onlineCountBots:** 1 call per cc -> counter key "online_bots"
- **editNickname:** 2 calls per cc -> counter key "edit_nick"
- **Append/AppendSlice limit:** 10k size limit of resulting slice
- **exec/execAdmin:** 5 calls per cc -> no key
- **deleteResponse/deleteMessage/deleteTrigger max delay:** 86400s
- **take/removeRoleID/Name max delay:** int64 limit (292 years)
- **sleep:** 60 seconds

## DATABASE

### Overall Limits

- **Max amount of DBs:** Membercount \*50\*1/10(free/prem)
- **Key length limit:** 256
- **Expire limit:** int64 limit (292 years)
- **Value size limit:** 100kB

### Database Interactions

- **Calls per CC:** 10/50 (free/prem) -> counter key "db_interactions"
- Valid for all database commands ->
  - dbDel/dbDelByID
  - dbGet
  - dbIncr
  - dbSet/dbSetExpire

### Database Multiple Entry Interactions

Multiple entries all count to general "db_interactions" limit as well.

- **Calls per CC:** 2/10 (free/prem) -> counter key "db_multiple"
- Valid for all database multiple entry related commands ->
  - dbCount
  - dbDelMultiple
  - dbGetPattern
  - dbRank
  - dbTopEntries
