+++
title = "Exercises"
weight = 350
+++

Below are some exercises to help you practice and reinforce your understanding of the concepts discussed in the previous
sections. Remember to use the [template reference](/docs/reference/templates) if you need help. Do them at your own pace
and whenever you feel like it.

## Duplicates in a List

1. You are given a list of numbers having some repeated digits. Write a CC which will eliminate duplicate entries and
   return the cleaned list. The list is as follows: `42 1 2 81 3 5 42 19 2 42 19 81 46`.

2. Have the CC take a list of numbers as an argument instead and then return the cleaned list.

## Stars

Write a CC that will take a number as an argument and then print a pattern of stars as follows:

```txt
*
**
***
****
*****
```

## ROT13 Substitution

[ROT13](https://en.wikipedia.org/wiki/ROT13) ("rotate by 13 places", sometimes hyphenated ROT-13) is a simple letter
substitution cipher that replaces a letter with the 13th letter after it, in the alphabet. Because there are 26 letters
(2×13) in the basic Latin alphabet, ROT13 is its own inverse; that is, to undo ROT13, the same algorithm is applied, so
the same action can be used for encoding and decoding. The algorithm provides virtually no cryptographic security, and
is often cited as a canonical example of weak encryption.

1. Write a CC that takes any string and returns the ROT13 version of the string; you may assume that the character set
   is ASCII and let "space" character be counted as well. Discard numbers.

2. Decode `lntcqo vf n pbby obg naq qhpxf ner onq.`

## Arithmetic Progression

A sequence of numbers such that the difference between each term remains constant is called an
[Arithmetic Progression](https://en.wikipedia.org/wiki/Arithmetic_progression).

We start with a term {{< math >}}$a${{< /math >}} and add the common difference {{< math >}}$d${{< /math >}}. We do this
for {{< math >}}$n${{< /math >}} times. To find the sum of any such progression, we use the following formula.

```math {.text-center}
$$
\sum_{k=0}^{n-1}(a+kd)=\frac{n}{2}(2a+(n-1)d)
$$
```

Write a custom command for finding the sum of {{< math >}}$n${{< /math >}} terms of an arithmetic progression,
parameterized to {{< math >}}$a, d, n${{< /math >}}, and verify it with above formula in the same command (use the
right-hand side of the equation).
