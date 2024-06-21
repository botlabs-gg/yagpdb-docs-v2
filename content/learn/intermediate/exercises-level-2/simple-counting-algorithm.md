---
description: '"Go suffers no fools." // Todd McLeod'
---

# Simple Counting Algorithm

Your task is to formulate an algorithm and make a CC that works with numbers. Let's take one parameter `N`, it has to be non-negative integer and given by user. Make a variable called `$x` and set it equal to `N+3` Now count from 0 to `N` (both inclusive), and for each iteration (let's call it `i`) that you pass, return the value of `x*(-i)`. After that update `x` to be equal to `i*N+x`. When counting finishes, return the value of variable `$x`.

If you do these steps for `N=3`, you should come up with the sequence of numbers `0 -6 -18 -45 24`.

Generally, when we're programming, we don't like capital letters for variables. All capital letters is usually reserved for a constant, so we'll use lowercase `$n` for this variable henceforth.

[Example solution](https://pastebin.com/vNfc73zG)
