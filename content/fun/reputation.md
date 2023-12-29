+++
title = 'Reputation'
archtype = 'default'
weight= 1
+++

Allows users to give or receive reputation points in the server, promoting positive interaction and acknowledgment for helpful contributions.
<!--more-->
## Configuration
![Reputaion Configuration](reputation-setup.png?lightbox=false)

- **Enable the Reputation system.**

- **Name for reputation points**

    Define a unique name for reputation points, (`Rep` is the default name.)
    {{% notice style="tip" %}}You can even name it some emoji if you want to.{{% /notice %}}

- **Rep cooldown in seconds** 

    Set the cooldown in **seconds** for `-giverep` and `-takerep` commands, which does not affect the `-setrep` command.

- **Maximum amount of rep that can be given/remvoved in one command** 

    Specify the maximum reps the `-giverep` and `-takerep` commands can modify.

- **Admin roles** 

    Select admin roles, Admins can freely change anyone's points to any number by `-setroles`.

- **Allowed roles to give/remove points `(empty for all)`** 

    Define roles that can use `-giverep` and `-takerep` commands.

- **Allowed roles to receive/being taken away points from `(empty for all)`** 

    Users with this role participates in the point system which they can be given/taken away points from. If set to none, everyone will be participating.

- **Blacklisted roles for giving/taking away points** 

    Roles unable to use the `-giverep` and `-takerep` commands. This also overrides the Required role to give/remove points.

- **Blacklisted roles for receiving/being taken away points from** 

    Users with this role cannot participate in the point system which they can be given/taken away points from. This also overrides the `Allowed role to receive/being taken away points`.

- **Enable automatically giving rep when someone says "thanks @user" or variations of it?** 

    Enable rep for users saying `thanks @user` or similar variations.

- **Whitelisted channels for giving rep using thanks** 

    Select channels where users can use "thanks" to give rep.

- **Blacklisted channels for giving rep using thanks** 

    Select channels where users **can't** use "thanks" to give rep.
---
## Repulation Logs
![Repulation logs](repulation-logs.png?lightbox=false)
    Besides using -replog command, you can also view logs in the control panel. Just specify a user ID to see logs affecting their points.

---
## Reset all user reputation
![Reset all user reputation](reset-reputaion.png?lightbox=false)
    {{% notice style="warning" %}}This command is irreversible, and will reset everyone's reputation point to 0.{{% /notice %}}