# Basics 4: Extended Transactions

_TL;DR? [Run the demo](playground.html#basics-4-extended-tx-demo.html)._

Building on the tutorial [Basics 3: Transactions](basics-3-transactions),
we'll augment the basic transaction with an extended transaction to also be able to send a message with each transaction.

## Message Input

To get started, let's add a form field for the message,
in the same fashion as the other ones, just before the "Send Transaction" button

```html
<p>
    <label class="nq-label" for="tx_message">Message</label>
    <input type="text" id="tx_message" placeholder="A message for the recipient (optional)">
</p>
```

In the `click` handler, we extract the message entered by the user:

```js
$('tx_send').addEventListener('click', () => {
    const recipient = $('tx_recipient').value;
    const amount = parseInt($('tx_amount').value);
    const message = $('tx_message').value; // <- get the message

    sendTransaction(recipient, amount, message);
});
```

Now we need to update the `sendTransaction(...)` function.

## Extended Transaction

If `sendTransaction(...)` gets a message passed, we'll create and send out an extended transaction.
Otherwise, we keep the code for creating a basic transaction and send that instead.
This will save bytes being sent out to the network and in case we send out more than 10 transactions per block,
it will reduce the fee to be paid.
See the note in "Send Transaction" in
[Basics 3: Transactions](basics-3-transactions#send-transactions) for details.

Step one, let's move the basic transaction code into it's own
helper function.

```js
function sendTransaction(address, amount, message) {

    function basicTransaction() {
        return nimiq.wallet.createTransaction(
            Nimiq.Address.fromUserFriendlyAddress(address),
            Nimiq.Policy.coinsToLunas(amount),
            0, // fee
            nimiq.blockchain.height
        );
    }
    ...
```

Two, add another helper function for extended transactions just below:

```js
    ...
    function extendedTransaction() {
        // turn string into a safely encoded list of bytes
        const extraData = Nimiq.BufferUtils.fromAscii(message);

        const transaction = new Nimiq.ExtendedTransaction(
            nimiq.wallet.address,       // sender address
            Nimiq.Account.Type.BASIC,   // and account type
            Nimiq.Address.fromUserFriendlyAddress(address),
            Nimiq.Account.Type.BASIC,   // <- recipient -^
            Nimiq.Policy.coinsToLunas(amount),
            0,                          // fee
            nimiq.blockchain.height,
            Nimiq.Transaction.Flag.NONE,
            extraData                   // the message
        );

        // sign transaction with the key pair of our wallet
        const keyPair = nimiq.wallet._keyPair;
        const signature = Nimiq.Signature.create(
            keyPair.privateKey,
            keyPair.publicKey,
            transaction.serializeContent()
        );
        const proof = Nimiq.SignatureProof.singleSig(keyPair.publicKey, signature);
        transaction.proof = proof.serialize();

        return transaction;
    }
    ...
```

Finally, checking if we got a message, we can use the two helper functions to put it all together:

```js
    ...
    // create an extended transaction if the message is not empty
    const transaction = message.trim().length > 0
                        ? extendedTransaction()
                        : basicTransaction();
    ...
```

Continuing from this line, the code about relaying the transaction and giving feedback will stay the same.

Now you have completed all basic features of your Nimiq wallet web-app:
storing the keys, sending and receiving transactions.

[Try it out!](playground.html#basics-4-extended-tx-demo.html).

**Your Nano Wallet is a full member of the Nimiq network.
Transactions are going in and out are using the nano client directly from within your browser
without any trusted third party, server-side application, nor API!
And all of this with not much more than 100 lines of JavaScript!
Congratulations, and welcome to the Nimiq Ecosystem!**

<svg width="200" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 169 169" style="enable-background:new 0 0 169 169;" xml:space="preserve" opacity="0.8" fill="url(#paint0_radial)">
<path d="M50.73,59.45c-1.54,1.55-2.44,3.55-3.03,5.73l-0.07-0.04L1.36,152.08c-2.39,4.49-1.58,9.94,2.01,13.54 c2.22,2.22,5.13,3.38,8.09,3.38c1.84,0,3.7-0.44,5.41-1.37l86.58-46.31c2.26-0.6,4.24-1.62,5.78-3.17 c8.46-8.48,2.26-27.51-14.41-44.24C78.85,57.89,58.94,51.21,50.73,59.45 M104.26,113.16c-1.12,1.12-2.84,1.69-5.13,1.69 c-7.84,0-19.23-6.34-29.01-16.15C55.82,84.36,51.05,69.14,55.7,64.45c1.13-1.13,2.84-1.7,5.13-1.7c7.84,0,19.23,6.34,29.01,16.14 C104.14,93.26,108.92,108.48,104.26,113.16"/>
<path d="M167.98,83.01c-14.86-14.78-39.07-14.78-53.96,0c-1.36,1.35-1.36,3.56,0,4.91c0.68,0.68,1.58,1.02,2.47,1.02 c0.89,0,1.79-0.34,2.47-1.02c12.16-12.07,31.94-12.07,44.08,0c1.36,1.35,3.58,1.35,4.94,0S169.34,84.36,167.98,83.01"/>
<path d="M79.69,54.88c0.66,0.68,1.53,1.02,2.39,1.02c0.86,0,1.72-0.33,2.38-1.02c6.97-7.19,10.81-16.75,10.81-26.93 S91.43,8.22,84.46,1.02c-1.32-1.36-3.46-1.36-4.77,0c-1.32,1.37-1.32,3.57,0,4.93c5.69,5.88,8.83,13.69,8.83,22 c0,8.31-3.14,16.12-8.83,21.99C78.37,51.31,78.37,53.52,79.69,54.88"/>
<path d="M127.55,60.91c0.38,0,0.75-0.06,1.12-0.17l24.9-8.09c1.86-0.61,2.86-2.57,2.24-4.38 c-0.62-1.82-2.63-2.79-4.48-2.19l-24.9,8.09c-1.86,0.61-2.87,2.57-2.25,4.38C124.69,60,126.06,60.91,127.55,60.91"/>
<path d="M109.36,45.72c0.37,0.13,0.73,0.18,1.09,0.18c1.44,0,2.79-0.94,3.28-2.42l8.09-24.93 c0.6-1.86-0.38-3.87-2.19-4.49c-1.79-0.62-3.76,0.39-4.37,2.24l-8.09,24.93C106.58,43.09,107.55,45.1,109.36,45.72"/>
<path d="M109,64.92c1.88,0,3.64-0.73,4.95-2.06c2.73-2.74,2.73-7.19,0-9.96c-2.66-2.65-7.24-2.66-9.91,0.01 c-2.73,2.76-2.72,7.21,0.01,9.94C105.36,64.19,107.12,64.92,109,64.92"/>
<path d="M58,44.9c1.88,0,3.64-0.74,4.95-2.07c1.32-1.32,2.05-3.09,2.05-4.98c0-1.88-0.73-3.65-2.05-4.97 c-2.64-2.66-7.26-2.66-9.9-0.01C51.73,34.2,51,35.98,51,37.86c0,1.89,0.73,3.65,2.04,4.96C54.36,44.16,56.12,44.9,58,44.9"/>
<path d="M140,35.89c1.87,0,3.63-0.73,4.96-2.06c2.72-2.75,2.72-7.21-0.01-9.95c-2.64-2.66-7.26-2.66-9.9,0 c-2.73,2.75-2.73,7.2,0.01,9.96C136.37,35.16,138.13,35.89,140,35.89"/>
<path d="M131.05,93.93c-2.73,2.75-2.73,7.21,0,9.95c1.32,1.33,3.08,2.06,4.95,2.06s3.63-0.73,4.95-2.06 c2.73-2.75,2.73-7.21,0-9.96C138.3,91.27,133.7,91.27,131.05,93.93"/>
<defs>
  <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(26.9996 24) rotate(-180) scale(26.9977 24)">
    <stop stop-color="#EC991C"/>
    <stop offset="1" stop-color="#E9B213"/>
  </radialGradient>
</defs>
</svg>

&nbsp;

&nbsp;

## What's next?

How about visualizing the addresses and help our users avoiding typos and clipboard attacks?
The next tutorial will show you how to use Nimiq Iqons.
![](resources/iqons.png)

---

**Continue the tutorial**: [Basics 5, Nimiq Iqons »](basics-5-iqons)

_Get in touch at [sven@nimiq.com](mailto:sven@nimiq.com) to share your ideas and feedback!_
