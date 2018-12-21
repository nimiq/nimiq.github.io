# Basics 3: Transactions

_TL;DR? [Run the demo](playground.html#nano-client-3-transactions-demo.html)._

Building on [Nano Client 2: Blockchain Events & User Interface](nano-client-2-events-and-ui),
we're almost ready to receive some NIM.

But first, we need a wallet. And a place to store it.

## Create and Store a Wallet

> Creating a Nimiq wallet is as simple as:
>
> ```js
> const wallet = await Nimiq.Wallet.generate();
> ```

The code above will generate a new random wallet whenever you reload the page. But we can use `localStorage` to store our wallet.
With the following snippet in `start()`, the app will try to load a previously stored wallet or
otherwise create a new wallet and store it.

```js
const stored = JSON.parse(localStorage.getItem('wallet'));
const wallet = stored ? Nimiq.Wallet.loadPlain(stored) : await Nimiq.Wallet.generate();
localStorage.setItem('wallet', JSON.stringify(Array.from(wallet.exportPlain())));
```

>**Side note**: Now that we use more and more functionalities, there are many objects to interact with.
>As a rough idea, use the `consensus` to find out about balances and account states,
>`blockchain` for the latest block and block height,
>`network`&hellip; you guessed it, and
>`mempool` for transactions that are waiting to be mined.

Let's keep a reference to our wallet:

```js
nimiq.wallet = wallet;
```

For showing our wallet's address and balance, we add two fields to `<div class="nq-card-body">`:

```html
<p>Address: <span id="address"></span></p>
<p>Balance: <span id="balance"></span></p>
```

And update the balance as soon as consensus is established
and again each time a new block gets mined,
a.k.a. "there is an update on the blockchain",
a.k.a. "the head of the blockchain has changed",

The handlers now look like this:

```js
function onConsensusEstablished() {
    status('Consensus established.');
    $('height').innerText = nimiq.blockchain.height;
    $('address').innerText = nimiq.wallet.address.toUserFriendlyAddress();

    updateBalance(); // <- Add this line
}

function onHeadChanged() {
    $('height').innerText = nimiq.blockchain.height;

    updateBalance(); // <- and this line
}
```

In the Nano Client, the `consensus` object can get us the latest account status which includes the balance in _Luna_.
Luna is Nimiq's smallest unit, 100'000 Luna = 1 NIM. The following function will update the balance in the UI.

```js
function async updateBalance() {
    const account = await nimiq.consensus.getAccount(nimiq.wallet.address)
    const balance = account ? Nimiq.Policy.satoshisToCoins(account.balance) : 0;
    $('balance').innerText = balance.toFixed(2);
}
```

> **Note**: Accounts with balance `0` are not getting stored on the blockchain.
> Thus, if no account for the address has been returned, we can safely assume `0`.
>
> **Play:** To see your stored wallet, run [the example](playground.html#nano-client-3-transactions-demo.html), open your dev tools (F12), and enter:
>
> ```js
> localStorage.getItem('wallet');
> ```
>
> What you will get back is an array of bytes representing your serialized key pair consisting of public and private key.

**Great! Your balance now stays up-to-date.**
All set to finally receive and send transactions NIMs around.

## Receive Transactions

The Nano Client can monitor the network for incoming transaction:
We subscribe (in `start()`) to all transactions related to our wallet's address and
display a message if one is incoming:

```js
nimiq.consensus.addSubscriptions([wallet.address]);

nimiq.mempool.on('transaction-added', tx => {
    if (tx.recipient.equals(wallet.address)) {
        status(`Incoming transaction of ${ Nimiq.Policy.satoshisToCoins(tx.value) } NIM.`);
    }
});
```

If you can't wait, copy your address and send a transaction to it from your
[Nimiq Safe](https://safe.nimiq-testnet.com) account
(you can receive some Testnet NIM from our [Testnet faucet](https://getsome.nimiq-testnet.com)).
More details on this later.

## Send Transactions

To send, we add a little form to the `nq-card-body` with address & value and wire it up.

```html
<h2>Send Transaction</h2>
<p>
    <label class="nq-label" for="tx_recipient">Recipient Address</label>
    <input type="string" id="tx_recipient">
</p>
<p>
    <label class="nq-label" for="tx_amount">Amount</label>
    <input type="number" id="tx_amount">
</p>
<button id="tx_send" class="nq-button">Send Transaction</button>
```

Listen to the button being clicked in `start()`:

```js
$('tx_send').addEventListener('click', () => {
    const recipient = $('tx_recipient').value;
    const amount = parseInt($('tx_amount').value);

    // We define this function in the next step
    sendTransaction(recipient, amount);
});
```

Within `sendTransaction`, we create a transaction object and relay it to the network.
`wallet.createTransaction()` is a short-hand for
`new Nimiq.BasicTransaction(wallet.publicKey, recipient, ...)` and
it also takes care of signing the transaction for us.

```js
function sendTransaction(recipient, amount) {
    const transaction = nimiq.wallet.createTransaction(
        Nimiq.Address.fromUserFriendlyAddress(recipient),
        Nimiq.Policy.coinsToSatoshis(amount),
        0, // fee
        nimiq.blockchain.height
    );

    // Send to the Nimiq network
    nimiq.consensus.relayTransaction(transaction);

    // continues in the next block
```

> **Fun fact:** The `0` in the middle is the **fee** in Luna.
> In Nimiq, up to ten transactions per block per sender are free.
> To be precise, other nodes will accept maximum 10 free transactions from the same sender in the `mempool` at the same time.
> If you want to send out more transactions at once, a minimum fee of one Luna per byte is required.
> A basic transaction (without a message) is 138 bytes, an extended transaction 144 bytes + the byte length of the message.

To show some feedback while the transaction is going out,
we can listen for events (with `.on()`) to understand when
the transaction gets into the mempool,
when it hits the network, and finally, when it got mined.
After that, the event listeners will be removed with `off()`.

```js
    // ... continue in sendTransaction()

    function feedback(source, event, message) {
        const listenerId = source.on(event, tx => {
            if (tx.sender.equals(nimiq.wallet.address)) {
                status(message);
                source.off(event, listenerId);
            }
        });
    };

    feedback(
        nimiq.mempool,
        'transaction-added',   // TX arrived in our mempool
        'Your transaction has been sent out.');

    feedback(
        nimiq.consensus,
        'transaction-relayed', // TX was sent to a peer
        'Your transaction is in the network.');

    feedback(
        nimiq.mempool,
        'transaction-mined',   // TX was mined
        'Your transaction arrived.');
}
```

>**Note:** Listening to network activities depends on whether the nano client is connected to a full node
>and thus might fail.

## Get some NIM!

This little demo app has all the basic functionality to be a minimal wallet app.
So now we're ready to receive some NIM!
Start [the demo](playground.html#nano-client-3-transactions-demo.html)
and switch to Mainnet in `start()`.

```js
Nimiq.GenesisConfig.main();
```

Copy the `address` shown in the app and head over to
[getsome.nimiq.com](https://getsome.nimiq.com).
Follow the Nimiq Onboarding Guide, create a wallet and receive one NIM.
Finally you'll arrive in the Nimiq Safe from where you can send the NIM to your address here.
And you can also send it back to keep it safe. :)

**Your Nano Wallet is a full member of the Nimiq network.
The transaction went in and out using a nano client directly from within your browser without any trusted third party!
And all of that with not much more than 100 lines of JavaScript!
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

## Need more ideas?

Sure!

**Encryption**: Right now, your private key is stored unencrypted.
You can replace `exportPlain()` with `exportEncrypted(password)` and `loadPlain()` with `loadEncrypted(stored, password)`.

**Error handling**: Finally, before publishing this Nano Wallet, we should add some error handling.
A basic version could be something along the lines of:

```js
function onError(code) {
    switch (code) {
        case Nimiq.ERR_WAIT:
            alert('Error: Already open in another tab or window.');
            break;
        case Nimiq.ERR_UNSUPPORTED:
            alert('Error: Browser not supported');
            break;
        default:
            alert('Error: Nimiq initialization error');
            break;
    }
}

// Nimiq.init() accepts an error handler as a second parameter
window.onload = () => Nimiq.init(start, onError);
```

---

Find more help and documentation in the [Nimiq Developer Center](https://nimiq.com/developers).
