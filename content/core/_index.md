+++
title = 'Core'
archtype = 'chapter'
weight = 2
+++

## This section consist of core functionality of YAGPDB.
---

### Control Panel Access: 
To manage the control panel access, by assigning roles for read/write access.
![control panel access configuration](control-panel-access.png?lightbox=false)
This Section allows you to manage your server dashboard's read and write access.

---

### Control Panel Logs: 
![control panel logs](control-panel-logs.png?lightbox=false)
This Section display the logs of any activity on control panel.

To check the logs for any changes.

--- 

### Command Settings: 
#### Prefix
The default prefix of YAGPDB is `-`, if you want to change the prefix to something else, replace the `-` to something you want.
{{% notice style="warning" %}}
Flags and switches are not affected by prefixes. For example, if you were using the rolemenu create command with the prefix +, it would be `+rolemenu create (group name) -m (message id)`. Note that we used the `+` prefix but `-m` stayed as `-m`, not `+m`.
{{% /notice %}}
![Prefix and Command Override](command-override.png?lightbox=false)
#### Command Overrides
..... will type later...
