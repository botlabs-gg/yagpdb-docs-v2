---
description: '"Programming is not a zero-sum game..." // John Carmack'
---

# Sum of Arithmetic Sequence

A sequence with same common difference is known as **arithmetic sequence**. The first term of sequence is **a** and common difference is **d**. The series looks like **a, a + d, a + 2d, a + 3d, . . .** How many terms to go is **n.**

Arithmetic sum formula is shown below - this is all domain knowledge required for this exercise.

$$
\sum_{k=0}^{n-1}(a+kd)=\frac{n}{2}(2a+(n-1)d)
$$

**Write a CC for finding the sum of n-terms of an arithmetic sequence** requiring these three parameters **a,** **d,** **n** mentioned above from user input, let those be integers. Your task is to write it using `range` function to sum these parameters, but in addition write a verification code using math functions according to given formula.

[Example solution](https://pastebin.com/n4nMu1mL)
