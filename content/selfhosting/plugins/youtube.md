+++
title = "YouTube"
description = "YouTube setup for selfhosted YAGPDB"
weight = 320
+++

In order for you to enable YouTube feeds you'll need to get YouTube API credentials and then add them to your bot setup.

## Creating a YouTube API Key

1. Go to the [Google Cloud Console](https://console.cloud.google.com/) and create a new project.
2. Once the project is created, navigate to the "APIs & Services" > "Library" section, and enable the "YouTube Data API v3" for your project.
3. After enabling the API, navigate to the "IAM & Admin" > "Service Accounts" section, and create a new service account.
4. Open the newly created service account and navigate to the "Keys" tab.
5. Create a new key, selecting the JSON key type. This will download a JSON file containing your service account credentials.

Store the downloaded JSON file securely, as it contains sensitive information.

## Configuring YAGPDB with YouTube API Key

### Baremetal Setup

For a baremetal installation, you need to set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable to point to the path of the downloaded JSON file.
Make sure that the user running the YAGPDB process has read access to this file.
Then, restart the bot to apply the changes.

It is recommended to place the credentials file in a dedicated directory, for example `/opt/yagpdb/credentials/credentials.json`, and set the environment variable accordingly,
or in the source directory of your YAGPDB installation.

### Docker Setup

For Docker installations, there are two ways to provide the credentials: either by copying the JSON file into the container or by using a bind mount.

#### Copying into the container

This version requires you rebuild your YAGPDB image but doesn't use bind mounts.
Your credentials file needs to be available in the build context of your Docker image, so place it in your cloned repository.

```shellsession
cp /path/to/your/credentials.json ./yagpdb_docker/credentials.json
```

Then, modify your Dockerfile to copy the credentials file into the container, set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable and rebuild the image.

```dockerfile
# Dockerfile
COPY --from=builder /appbuild/yagpdb/yagpdb_docker/credentials.json /app/credentials/credentials.json
```

Similarly, let Docker know about the `GOOGLE_APPLICATION_CREDENTIALS` environment variable in your `app.env` file, pointing to `/app/credentials/credentials.json`.

#### Using a bind mount

This Version bind mounts the credentials.json file on the host machine to the YAGPDB docker container in read only mode and thus allows you to run the YouTube feeds without building your own image.
However, keep in mind that this means the container has limited access to your local file system.

Create a new directory which will be bind mounted to the container, and copy the credentials file into it.

```shellsession
mkdir -p /path/to/your/yagpdb_credentials
cp /path/to/your/credentials.json /path/to/your/yagpdb_credentials/credentials.json
```

Then, modify your `docker-compose.yml` file to include the bind mount and set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable.
Add the very last volume entry to the `volumes` section of your `yagpdb` service.

```yaml
volumes:
  - cert_cache:/app/cert
  - soundboard:/app/soundboard
  - /path/to/your/yagpdb_credentials:/app/credentials:ro
```

{{< callout context="caution" title="Warning: Use Absolute Paths" icon="outline/alert-triangle" >}}

It is very important that you use absolute paths for the container side, and that you set the bind mount to read-only mode by appending `:ro` to the volume definition.

{{< /callout >}}

Again, let Docker know about the `GOOGLE_APPLICATION_CREDENTIALS` environment variable in your `app.env` file, pointing to `/app/credentials/credentials.json`.
After making these changes, restart your YAGPDB container to apply the changes.
