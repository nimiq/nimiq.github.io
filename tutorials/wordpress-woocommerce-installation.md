# Installing WordPress and WooCommerce

If you are using a managed service,
e.g. [DigitalOcean's one-click-apps](https://www.digitalocean.com/products/one-click-apps/),
the management interface will provide a one-click installation of WordPress.
If not, download WordPress [here](https://wordpress.org/download/)
and follow [these steps](https://codex.wordpress.org/Installing_WordPress#Detailed_Instructions) to install it.

Otherwise, if you're using a VPS (virtual private server), or your own machine,
we recommend installing WordPress via Docker-compose (right below),
or you can install all requirements [manually](#manual-installation).

## Docker (recommended)

As prerequisite, you need to install Docker and Docker Compose.
To test whether Docker and Docker Compose are installed already run `which docker` and `which docker-compose`,
if both commands yield a path, e.g. `/usr/local/bin/docker-compose` then they are setup correctly and you can skip this step.
Otherwise, please refer to [this page to get started with Docker](https://docs.docker.com/get-started/) and [this page to install Docker Compose](https://docs.docker.com/compose/install/)
on all operating systems.

**For Linux users**: Make sure to follow the
[post-installation steps](https://docs.docker.com/install/linux/linux-postinstall/).
They will also explain how to make Docker start with the system.
Otherwise, before using Docker or Docker Compose, you'll need to start Docker with `sudo systemctl start docker`.
As an extra, you can also add command-line completion for Docker Compose following [this guide](https://docs.docker.com/compose/completion/).

> To get a **temporary** and basic version of WordPress in a Docker container for local testing use
> [Docker's official guide for WordPress]( https://docs.docker.com/compose/wordpress/).
> It's a "one-time installation" meant for quick tests, i.e. it will be reset when you restart Docker.

For the online shop, we're going to setup Docker to store
all configurations, user uploads, the database content as well as all plugins outside the Docker container.
This way we can 1) easily backup all relevant data and 2) keep all configurations even if we restart the service.

1. **Storage location**: Create a folder in you home directory to store the custom WordPress data:

   ```bash
   mkdir -p ~/wordpress/data ~/wordpress/database
   ```

1. **Docker compose**: Create a `docker-compose.yaml` file in `~/wordpress`
   (or [download it](resources/docker-compose.yaml)) with the following content.
   This will instruct Docker to setup a MySQL database and install WordPress
   but store all the data in the folder created before.
   The file below runs your shop on port `8080` which is good for testing.
   Once every is set up, change `8080:80` to `80:80`.

   ```yaml
   version: '3.6'

   services:
       db:
           image: mysql:5.7
           volumes:
               - ~/wordpress/database:/var/lib/mysql
           restart: always
           environment:
               MYSQL_ROOT_PASSWORD: mypassword
               MYSQL_DATABASE: wordpress
               MYSQL_USER: wordpress
               MYSQL_PASSWORD: wordpress

       wordpress:
           image: wordpress:latest
           depends_on:
               - db
           ports:
               - 8080:80 # change to 80:80 when the shop is ready to go live
           restart: always
           environment:
               WORDPRESS_DB_HOST: db:3306
               WORDPRESS_DB_USER: wordpress
               WORDPRESS_DB_PASSWORD: wordpress
           volumes:
               - ~/wordpress/data:/var/www/html/wp-content
   ```

1. **Adjust permissions**: To be able to install a plugin, make sure
   - The `data` folder belongs to the `www-data` user so that the web server can access all files with
   `sudo chown -R www-data:www-data ~/wordpress/data/` and
   - The `~/wordpress` folder and all its subfolders are writable for the group with
   `chmod -R g+w ~/wordpress`.

1. **Start and stop**: Open a terminal, go to `~/wordpress` and run your docker with `up` and stop it with `down`.

   ```bash
   docker-compose up     # start docker with logs printed to stdout
   docker-compose up -d  # start detached (daemon) to run in the background
   docker-compose down   # shutdown detached docker instances
   ```

1. **WordPress installation**: Going to [localhost:8080](http://localhost:8080)
   (replace `localhost` with the IP of your VPS/server), your newly installed WordPress
   will greet you with an installation wizard, go through it to set up a user account and other details.

   ![WordPress setup](resources/woocommerce-wordpress-setup.png)

To clean-up and reset your installation use:

```bash
docker container prune       # delete docker instances
docker volume prune          # delete volumes mounted to docker instances
docker volume rm wp_db_data  # specifically clear the DB data used with Wordpress
```

## Manual installation

In general, two steps are required:

1) Install LAMP on Linux or WAMP/XAMPP/MAMP on Windows and Mac
2) [Download](https://wordpress.org/download/) and install Wordpress

For more details, please refer to these two in-depth explanations
[for Linux](https://www.digitalocean.com/community/tutorials/how-to-install-wordpress-with-lamp-on-ubuntu-18-04)
and
[Windows](https://www.wpbeginner.com/wp-tutorials/how-to-install-wordpress-on-your-windows-computer-using-wamp/).

## WooCommerce

Log into the the admin panel of your WordPress installation, usually at `<www.your-server-domain.com>/wp-admin/`,
select _Plugins_ ⇒ _Add New_ ⇒ search for "woocommerce" ⇒ and hit _Install Now_.

![Install WooCommerce plugin](resources/woocommerce-plugin.png)

After the installation is completed, click _Activate_ and follow the setup process.
FYI, WooCommerce will suggest to install and sign-up for a lot of other third-party plugins.
Take your time and decide wisely. :)

![WooCommerce activation process](resources/woocommerce-activation-payments.png)

---

Now you're ready for the Nimiq Cryptocurrency WooCommerce plugin to be installed.
**Continue the tutorial**: [Install the Nimiq Plugin for WooCommerce](wordpress-payment-plugin-installation)
