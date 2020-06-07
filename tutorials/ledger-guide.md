# How to use the Ledger Nano S and Ledger Nano X with Nimiq

## What is a Ledger Nano S or Ledger Nano X?

The [Ledger Nano S](https://shop.ledger.com/products/ledger-nano-s) and
[Ledger Nano X](https://shop.ledger.com/pages/ledger-nano-x) are so called hardware wallets. A hardware wallet is a very secure and at the same time user friendly way to access your funds as the private key to your funds is stored on the hardware wallet device itself and doesn't get leaked. Your funds are safe even when connected to an infected or malicious computer or a phishing/scam web page. If you're holding cryptocurrency worth more than a week's salary we **highly** recommend to get a hardware wallet. It's worth it.

We provide an official Nimiq app for Ledger Nano S and Ledger Nano X devices to manage NIM with the [Nimiq Safe](https://safe.nimiq.com/) application.

## Before you start

Verify you have:

- [Set up Ledger Live](https://support.ledger.com/hc/en-us/articles/360006395233) with your Ledger device.
- [Updated the firmware](https://support.ledgerwallet.com/hc/en-us/articles/360002731113) on your Ledger hardware wallet.

## Install the Nimiq app

1. Open the **Manager** in [Ledger Live](https://ledger.com/live).
2. Connect and unlock your device using your PIN code.
3. If asked, allow the manager to communicate with your device.
4. Find **Nimiq** in the app catalog.

![Screenshot of app catalog](resources/ledger-guide-install-app.png)

5. Click the **Install** button for the app and wait for the installation process to finish. If the **Install** button is disabled in Ledger Live with the warning that there is not enough storage space left check the solutions in [this article](https://support.ledgerwallet.com/hc/en-us/articles/115005171425-Unable-to-install-application).

## Set up a Ledger account in Nimiq Safe

1. Open [Nimiq Safe](https://safe.nimiq.com/) in your browser.
2. If you don't have any accounts set up in **Safe**, you will be taken to the **Add Account** page immediately.
3. If you already have accounts, click on your **account name** and choose **Add account**.

![Screenshot of account dropdown](resources/ledger-guide-add-account.png)

4. Connect and unlock your device using your PIN code, then open the **Nimiq app** on your Ledger.
5. Click on **Connect Ledger** in the **Add Account** page.

![Screenshot of add account](resources/ledger-guide-connect-ledger.png)

6. If your Ledger device is not correctly connected yet, follow the instructions to connect and unlock it.

![Screenshot of connect ledger](resources/ledger-guide-import-addresses.png)

7. The Ledger account will start to **synchronize**.
8. If you already used your Ledger account before, it will get imported. **You are all set up**.
9. If you haven't used your account yet, it will ask you to choose an **identicon** (a little avatar that represents a Nimiq address).

![Screenshot of identicons](resources/ledger-guide-identicon.png)

10. **Congratulations**, your account is now created.

![Screenshot of account created](resources/ledger-guide-created.png)

11. Click **Finish** to get back to the **Nimiq Safe**.

> Welcome to the **Nimiq blockchain** !

![Screenshot of safe](resources/ledger-guide-welcome.png)

## Send funds from a Nimiq Ledger account

1. Open [Nimiq Safe](https://safe.nimiq.com/) in your browser.
2. Make sure your Ledger account is selected. Otherwise switch to it via the account selector in the header.
3. In the **Addresses** overview, click on the address you want to send from.

![Screenshot of account in safe](resources/ledger-guide-send.png)

4. Click on **Send from this address** to open the **Send a transaction** window and enter the recipient's Nimiq address you want to send funds to.

![Screenshot of send transaction](resources/ledger-guide-send-2.png)

5. Once you entered the address, a new window will appear to save a **Contact**. Enter a name and click **Save & set amount**.

![Screenshot of contact](resources/ledger-guide-contact.png)

6. Now choose the amount you want to send. You can also add a message if you want. Finally, click **Send transaction**.

![Screenshot of amount](resources/ledger-guide-amount.png)

7. A new popup will open, follow the instructions to connect your Ledger device if it is not connected yet.

![Screenshot of send confirm](resources/ledger-guide-send-confirm.png)

8. You now need to confirm the transaction on your device. Verify the transaction's details and choose **Accept and send** on your device if you want to send the transaction.

> Congratulations! Your transaction has now been sent to the network and should be confirmed soon.

![Screenshot of send confirm](resources/ledger-guide-confirmed.png)

## Troubleshooting

- **Problems connecting your Ledger**: If you have problems connecting your Ledger in our Nimiq apps, try the following steps:
    - First, make sure that Ledger Live can successfully connect to your Ledger via USB. To test that, you can for example try whether the receive functionality triggered by the "Receive" button for an arbitrary coin in Ledger Live is able to detect your Ledger. If that is not the case, see here for [instructions](https://support.ledger.com/hc/en-us/articles/115005165269-Fix-connection-issues).
    - If Ledger Live is able to connect but not the Nimiq apps, try whether using an up-to-date version of Chrome or Firefox helps.
    - If you still can not connect, make sure your Ledger is running the latest firmware version and has the latest Nimiq app installed. See the next section for update instructions.
- **No update available for the Nimiq app on your Ledger**: If the user interface tells you that you have to update your Nimiq app on the Ledger but no newer version appears in Ledger Live, follow these steps:
    - Make sure you are running the latest Version of Ledger Live. If not, Ledger Live should automatically offer you an update.
    - Make sure your Ledger is running the latest firmware. If not, the Manager in Ledger Live should offer you to update the Ledger firmware.
    - After updating Ledger Live and the Ledger firmware to the latest version, the latest Nimiq app version should be available for installation in the Manager in Ledger Live.
- **Security popups**: If you are using Windows security popups might open. These are triggered for some browsers that do not support direct communication with the Ledger as an USB device and instead treat the Ledger as a security key. This popup can be safely ignored and just be moved to the side if it covers the user interface. Please *do not* click cancel or close the popup. You can read more about Window's security popups [here](https://support.ledger.com/hc/en-us/articles/360023190873). Also Firefox might show up its own security popups, which can also safely be ignored.
- **Error message "The connected Ledger is not the one this account belongs to"**: In case you are using multiple Ledgers setup with different recovery words, make sure that the right one is connected and all others are disconnected. If you are sure that the correct Ledger is connected, make sure the correct wallet is unlocked, in case you are using wallets protected by an additional passphrase on your Ledger.

Still having questions? [Ask us or our community](https://www.nimiq.com/community/).
