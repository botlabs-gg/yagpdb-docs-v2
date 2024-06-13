+++
title = 'Database'
weight = 2
menuPre = "<i class= 'fas fa-database'></i> "
+++

The Custom Command Database is used for persistent storage between custom command executions. The database page displays
all database entries created by custom commands, allowing you to view details on or delete individual entries.

<!--more-->

![Overview of the Database page.](overview_database.png)

<center>

**1** Entry ID **2** Created Timestamp **3** Updated Timestamp **4** Expiry Timestamp **5** User ID **6** Key **7**
Value **8** Size of Value **9** Delete Entry **10** Page Navigation **11** Search Query **12** Search Bar

</center>

## Entries

### Entry ID

The ID is assigned by the system and unique within YAGPDB's database. The database page is sorted by descending ID. You
may search for a specific ID using the **Search Bar** (**11**) with ID **Query** (**10**).

### Created Timestamp

UTC timestamp of when the entry was created.

### Updated Timestamp

UTC timestamp of when the entry was updated. Increasing or setting a database value updates this timestamp.

### Expiry Timestamp

UTC timestamp of when the entry will expire. An expired entry will not be retrieved by database functions, but **will**
appear on the database page.

### User ID

The user-defined ID of the entry (does not have to be a user's ID, accepts any int64). You may search for a specific ID
using the **Search Bar** (**11**) with User ID **Query** (**10**).

### Key

The user-defined key of the entry. A key is a string, max 256 characters. You may search for a specific key using the
**Search Bar** (**11**) with Key **Query** (**10**).

### Value

The serialized value of the database entry.

### Size of Value

Size of the value in bytes. YAGPDB database entries have a max value size of 100 kB.

### Delete Entry

Deletes the individual entry after confirmation. You may only delete one entry at a time.

## Page Navigation

Navigates to the next or previous page of entries. Each page lists 100 entries at a time.

## Search Query

Dropdown selection of the type of value to search by. Available options are ID, User ID, and Key.

## Search Bar

Number or Text to match against database entries. Results will only include entries that exactly match the search
pattern.

When searching for a Key, the search query supports PostgreSQL patterns.

- `_` matches any single character.
- `%` matches any sequence of zero or more characters.

To search for any database entries whose Key contains `yagpdb`, use `%yagpdb%` as your search pattern.
