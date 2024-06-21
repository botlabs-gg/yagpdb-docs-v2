---
description: Exercises for working with parseArgs and .CmdArgs
---

# Exercises

1. **Write a CC that will output the following information information about the user passed as an argument :**\
   `User : (User's username + Discriminator followed by ID)`\
   `Nickname : (User's nickname or None)`\
   `Avatar Link : (Avatar link of user)`\
   `Role Count : (Number of roles user has)`\
   `Joined At : (Timestamp when user joined server)`\

2. **Write a CC that will send the name of the current channel or the channel provided.**\
   Hint: Look at the docs for the `Channel` object to see what properties it has, and which one provides the name. Use `parseArgs` with optional argument.\\
3.  **Write a CC that when given an integer N greater than or equal to zero returns a string of the number followed by an apostrophe then the** [**ordinal suffix**](https://en.wikipedia.org/wiki/Ordinal\_numeral)**. Example returns would be: 20'th 42'nd 101'st...**\
    This CC uses functions modulo `mod` and division `div` and `joinStr` for return. For parsing the input to value for variable `$N` we use `parseArgs`. Also conditional execution statements `if-else`are being used. Here you have to think of an algorithm, how to get correct suffixes for correct numbers and then generalize it to CC code. [Example solution](https://pastebin.com/AdSYe5k8).\\

    ***

\_\_
