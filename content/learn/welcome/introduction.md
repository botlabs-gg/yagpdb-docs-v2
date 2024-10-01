+++
title = "Introduction"
weight = 110
description = "Learn how to write custom commands for YAGPDB."
+++

> The first thing you gotta discard, whenever you're learning about something, is your ego. - Luke Smith

These are the learning resources for YAGPDB's powerful custom command system. This is your playground!

We are going to teach you how to read code as well as how to write it. After all, how can you **write** if you cannot
**read**? Learn to read, learn to solve problems, and learn to enjoy the process. The community is there to help, as
long as you put in some effort yourself.

These guides assume that you are already familiar with the custom command UI, so, for instance, you know how to add and
edit commands through the control panel. Consult the [documentation on custom commands](/docs/custom-commands/commands)
if unsure.

## General Tips

As you start your journey with YAGPDB, there are a few things you should keep in mind. These tips will help you avoid
common pitfalls and make your developing experience as a whole more enjoyable.

You should start writing and testing custom commands on a separate testing server on Discord before adding them to your
main server. This avoids any potential issues caused by members interfering with incomplete custom commands.

There is no "undo" button, and kicking YAGPDB won't reset your configuration. Write your changes down first, then you
can revert them if something goes wrong.

Never assume YAGPDB is running 24/7/365: we do our best, but occasional downtime---for routine maintenance, upstream
issues, and otherwise---is inevitable. Always have a backup plan for when YAGPDB is down.

Don't try to write a complex custom command right away. Start with something simple, then iteratively improve upon that.

Be sure to read the [reference documentation](/docs/reference/templates) alongside the lessons here. We will not cover
every detail of every function in these lessons, rather we aim to give you the tools necessary to build complex systems.

Over time, your custom commands may get more lengthy and complex. It is a good idea to write them locally in some text
editor or IDE, and then paste them into the web interface. Some popular choices are [VSCode], [Neovim], and
[Notepad++].

[VSCode]: https://code.visualstudio.com/
[Neovim]: https://neovim.io/
[Notepad++]: https://notepad-plus-plus.org/

### Planning

Writing code is (or at least, should be), 90% planning. Investing an extra 10 minutes in carefully planning out a piece
of code can save hours of debugging a snarled mess later on. Many novice programmers mistakenly jump right into writing
code without a plan, only to end up pouring hours into what should be a relatively short task.

Planning first is not only the best approach for novices, but also for skilled programmers. However, if you see a highly
experienced programmer in action, you may not see them planning when working on a relatively easy problem. Not seeing
them planning does not mean that they are not doing it, but just that they are capable of doing all the planning in
their head.

As you advance in programming skill, this will eventually happen for you as well—there will be certain
problems that you can just solve in your head and write down the solution. Of course, having practiced the skills
required to solve harder problems will be key, as your skills will be put to better use if you work on problems at the
difficult end of your capabilities.

Planning for programming primarily consists of developing the algorithm to solve the relevant problem. Once the
algorithm is devised (and tested), translating it to code becomes relatively straightforward. Once you have implemented
your program in code, you will need to test—and likely debug—that implementation. Having a clear plan of what the
program _should_ do at each step makes the debugging process significantly easier.
