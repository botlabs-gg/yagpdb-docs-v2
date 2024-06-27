---
description: Belphegor's prime number is a nifty little palindromic prime.
---

# Finding Primes

In this exercise we're going to plan and write a CC that takes one integer N and determine if it is prime. We begin with working at least one instance by hand. We might start with something like _is 7 prime_ and you might just say, yes, I know this, 7 is prime. However, this is not very helpful. Just knowing the answer does not help us develop a step-by-step approach to solving the general problem. Learning to put the obvious aside and think about what is going on is a key programming skill to learn, but takes some time.

So first you have to learn/search for what is a prime number; then test out finding different, larger primes, recognizing the patterns and generalizing it to code. Our example case of 7 would be written down on paper like this:

```
7/2 = 3 remainder 1
7/3 = 2 remainder 1
7/4 = 1 remainder 3
7/5 = 1 remainder 2
7/6 = 1 remainder 1
```

Because we've tried all numbers from 2 to 6 and found that 7 is not divisible by any of them, so we can say 7 is a prime (why don't we use 1?). Do the same for 13 or 42. What differs?

Generalized algorithm would go like this:

```
Check if N is less than or equal to 1, if so return "N is not a prime"
count from 2 to N (exclusive)
    call each number i or use dot
        check if N mod i is 0
            if so, return "not a prime"
if counting ends and "not a prime" is returned, retur "N is a prime"
```

So your task for this exercise is to translate this algorithm to CC-code.

Hint: Remember `seq` function's max limit.

[Example solution](https://pastebin.com/rcYbgdAf)
