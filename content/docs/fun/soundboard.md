+++
title = "Soundboard"
weight = 920
description = "Play sounds in voice channels with the soundboard system."
+++

The soundboard system allows the bot to join a voice channel, and play sounds triggered by soundboard commands.

## Uploading New Sounds

The settings listed below only apply to that specific sound, and not the entire soundboard.
Use a [command override](/docs/core/command-settings) to restrict access to the soundboard system as a whole.

### Name

Give the sound a name.
This name will be shown in the list to play later on.
Avoid giving duplicated names for easier reference.

### Allowed roles

Choose to require users to have a role in order to play this sound.

### Disallowed roles

These roles cannot play the sound, even if they have an allowed role.

### Upload file

{{< callout context="note" title="Note: Choose Either URL or File Upload" icon="outline/info-circle" >}}

Do **not** fill in the URL if you are going uploaded from local files, and vice versa.

{{< /callout >}}

You have two options to upload sounds:

- Upload with local files
- Specify a URL

#### Upload with local files

Click on _Choose file_ and select an audio file to upload.
All types of sound files, including videos with soundtracks, are supported.

#### Specify a URL

You can also specify a sound URL instead of uploading one.

This has to be the direct link to the media file, and not, for example, a YouTube Video link.
A direct link should end with `.mp3` (or other relevant audio/video type), such as <https://www.myinstants.com/media/sounds/airhorn_1.mp3>.

### Finish

Click on _Upload/Download_ after you are done with the previous steps.
You should see a _Success_ notification when the upload is completed.
Check the status of the sound under _Existing sounds_.
Wait for several minutes, and press _Save_ again if the status does not show _Ready_.

![An example of a successfully uploaded sound](example_soundboard.png)

## Playing sounds

You can check for an available list of sounds with the `-soundboard` command.
Then, play it with the `-sb <sound name>` command.
Make sure that YAGPDB has the right permissions (i.e. connect to and speak in the voice channel).

## Deleting sounds

You can delete sounds from the control panel.
Look for the desired sound name under _Existing sounds_ and press _Delete_ to remove it from the list.
