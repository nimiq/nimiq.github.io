# How to install the Nimiq Payment Plugin for WordPress WooCommerce

WooCommerce is one of the most common online shop systems used on the Web.
Integrated into WordPress, it allows you to quickly set up your own online shop.

_TL;DR? Check out the [Nimiq Shop](https://shop.nimiq.com/) to see the plugin in action._

To get started, you need a WordPress installation somewhere.
If you use a managed service, your provider will have sent you all the details on where you find the login.
If instead you start from scratch with your own server somewhere, then please follow these instructions
[here first](wordpress-woocommerce-installation) to get a WordPress and WooCommerce installation up and running.

The installation will be two steps:

1. [Adding the WooCommerce plugin to WordPress and configuring it](#woocommerce)
1. [Finally, adding the Nimiq plugin plus a quick setup](#nimiq-plugin)

## WooCommerce

Log into the the admin panel of your WordPress installation, usually at `<www.your-server-domain.com>/wp-admin/`,
select _Plugins_ ⇒ _Add New_ ⇒ search for "woocommerce" ⇒ and hit _Install Now_.

![Install WooCommerce plugin](resources/woocommerce-plugin.png)

After the installation is completed, click _Activate_ and follow the setup process.
FYI, WooCommerce will suggest to install and sign-up for a lot of other third-party plugins.
Take your time and decide wisely. :)

![WooCommerce activation process](resources/woocommerce-activation.png)

During the process, disable able all other payment options.
A future version of the Nimiq Payment Plugin will work in combination with other payment methods.

![WooCommerce activation process](resources/woocommerce-activation-payments.png)

## Nimiq Plugin

Similarly to the WooCommerce Plugin, you will find the Nimiq Payment Plugin in the same place when searching for "nimiq".

![Nimiq WooCommerce Plugin](resources/woocommerce-nimiq-plugin.png)

After installing it, click _Activate_.

You'll now find the _Nimiq Checkout for WooCommerce_ in the list of installed plugins.
Click _Configure_.

![Nimiq WooCommerce Plugin configuration](resources/woocommerce-configuration.png)

You need to setup your Nimiq Address in _Shop NIM Address_ to receive NIM and
you might want to adjust other settings according to your needs.
For testing, your can set _Network_ to "Testnet".

Next, go to _WooCommerce_ ⇒ _Settings_ ⇒ _General_ and select at the bottom of the page _Currency_ "Nimiq (NIM)".

**Disclaimer**: please check the legal and tax requirements of your country before starting to sell with your shop.
