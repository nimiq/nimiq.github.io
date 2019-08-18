# Basics 3: Transactions

_TL;DR? [Run the demo](playground.html#basics-3-transactions-demo.html)._

Building on [Basics 2: Blockchain Events & User Interface](basics-2-events-and-ui),
we're almost ready to receive some NIM.

But first, we need a wallet. And a place to store it.

## Create and Store a Wallet

> Creating a Nimiq wallet is as simple as:
>
> ```js
> const wallet = Nimiq.Wallet.generate();
> ```

The code above would generate a new random wallet every time you reload the page.
So let's use `localStorage` to store our wallet.
With the following snippet in `start()`, the app will try loading a previously stored wallet or
otherwise create a new wallet, then display the wallet's address, and finally make sure it's stored:

```js
const wallet = localStorage.wallet
    ? Nimiq.Wallet.loadPlain(JSON.parse(localStorage.wallet))
    : Nimiq.Wallet.generate();
$('address').textContent = wallet.address.toUserFriendlyAddress();
localStorage.wallet = JSON.stringify(Array.from(wallet.exportPlain()));
```

The last line might need some explanation:
`wallet.exportPlain()` will return a buffer of bytes.
But what we need is a string to store in `localStorage`.
So we use `Array.from` to turn the buffer into a plain JavaScript array,
and then `JSON.stringify(...)` to convert it into a string that we then
can read again with `JSON.parse(...)`.

let's keep a reference to our wallet in the shared `nimiq` object:

```js
nimiq.wallet = wallet;
```

We'll add a section to `<div class="nq-card-body">`
to show our wallet's address and balance:

```html
<h2>Wallet</h2>
<p>Address: <span id="address"></span></p>
<p>Balance: <span id="balance"></span></p>
```

> *Note:* the HTML in the demo is a bit more complex, but just to look nice. Functionality-wise it's the same. :)

And update the balance each time a new block gets mined&mdash;which means
"there is an update on the blockchain" or
"the head of the blockchain has changed"&mdash;by adding to the `onHeadChange` handler:

```js
function onHeadChanged() {

    // ... previous code ...

    const account = await nimiq.client.getAccount(nimiq.wallet.address);
    const balance = account ? Nimiq.Policy.lunasToCoins(account.balance) : 0;
    $('balance').textContent = `${balance.toFixed(2)} NIM`;
}
```

Pico Clients save bandwidth by not automatically downloading all accounts.
Instead, we request the latest account info for our wallet on demand.
Accounts with balance 0 will not be stored on the blockchain to save space.
That means, if no account has been returned for the given address, we can safely assume 0.
The balance we get from the account info is in _Luna_.
Luna is Nimiq's smallest unit, 100'000 Luna = 1 NIM.
The conversion can be done conveniently with `lunasToCoins(...)`.

> **Play:** To see your stored wallet, run [the example](playground.html#basics-3-transactions-demo.html),
> open your dev tools (F12), and enter:
>
> ```js
> localStorage.wallet
> ```
>
> What you will get back is an array of numbers representing your serialized key pair consisting of private and public key.

**Great! Your balance now stays up-to-date.**
All set to finally send and receive NIMs.

## Receive Transactions

The Pico Client can monitor the network for incoming transaction,
so let's add an event listener to `start()`:

```js
client.addTransactionListener(onTransaction, [wallet.address]);
```

... and implement it:

```javascript
function onTransaction(txDetails) {
    if (txDetails.recipient.equals(nimiq.wallet.address)) {
        status(`Incoming transaction of ${Nimiq.Policy.lunasToCoins(tx.value)} NIM.`);
    }
}
```

If you can't wait, copy your address from the UI and send a transaction to it from
[Nimiq Safe](https://safe.nimiq-testnet.com).
When you create a new account, you can get some free Testnet NIM
by clicking the big "RECEIVE FREE NIM" button right in the middle. :)
More details on this later.

## Send Transactions

To send, we add a little form to the `nq-card-body` with address & value and wire it up:

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
    const amount = parseFloat($('tx_amount').value);

    // We define this function in the next step
    sendTransaction(recipient, amount);
});
```

Within `sendTransaction(...)`, we create a transaction object and relay it to the network.
`createTransaction(...)` is a shortcut for
`new Nimiq.BasicTransaction(wallet.publicKey, recipient, ...)` and
it also takes care of signing the transaction for us.

```js
async function sendTransaction(recipient, amount) {
    const transaction = nimiq.wallet.createTransaction(
        Nimiq.Address.fromUserFriendlyAddress(recipient),
        Nimiq.Policy.coinsToLunas(amount),
        0, // fee
        await nimiq.client.getHeadHeight()
    );

    // Send to the Nimiq network
    nimiq.client.sendTransaction(transaction);
}
```

> **Fun fact:** The `0` in the middle is the fee in Luna.
> In Nimiq, transactions can be sent for free.
> To be precise, other nodes will usually accept up to 10 free transactions
> from the same sender at the same time.
> But if you want to make sure that your transaction arrives quickly, or you plan to send large amounts,
> a minimum fee of two Lunas per byte are recommended.
> A basic transaction (without a message) is 138 bytes, an extended transaction 144 bytes + the byte length of the message.
> So 300 Luna, i.e. 0.003 NIM, should be fine for a simple transaction to be confirmed by the network in the next block.

To show some feedback while the transaction is going out,
we'll extend the `onTransaction(...)` listener:

```js
function onTransaction(txDetails) {

    // ... previous code ...

    if (txDetails.sender.equals(nimiq.wallet.address)) {
        switch (txDetails.state) {
            case Nimiq.Client.TransactionState.PENDING:
                status('Transaction is in the network...');
                break;
            case Nimiq.Client.TransactionState.MINED:
                // Transaction has been confirmed once
                status('Transaction confirmed once, looking good...');
                break;
            case Nimiq.Client.TransactionState.CONFIRMED:
                // Requires 10 confirmations by default
                status('Transaction arrived for good. :)');
                break;
        }
    }
}
```

The `txDetails` object has more fields you could use.
You can find details in the [docs](https://doc.esdoc.org/github.com/nimiq/core-js/class/src/main/generic/api/TransactionDetails.js~TransactionDetails.html).
A transaction has six different states: `NEW`: just created, `PENDING`: in the network, waiting to be confirmed,
`MINED`: got added to a block - in crypto slang "mined",
`INVALIDATED`: something is wrong with this transaction,
`EXPIRED`: it waited too long; a transaction can wait for maximum 120 blocks,
 roughly 120 minutes, to be mined before it expires and becomes invalid,
`CONFIRMED`: By default, a transaction is considered confirmed when
10 additional blocks have been mined by the network on top of the block our transaction was in.
It simply means, you can be very confident that the transaction arrived for good.

> **Note:** Listening to network activities depends on the Pico Client being connected to a full node.
> There are many full nodes in the Mainnet, but only very few in the Testnet.
> So it can happen that connecting to a full node fails in the Testnet.
> Just try reloading the page.

## Get some NIM!

This little demo app has all the basic functionalities to be a minimal wallet app.
So now we're ready to receive some NIM!
Start [the demo](playground.html#basics-3-transactions-demo.html)
and switch to Mainnet in `start()`.

```js
Nimiq.GenesisConfig.main();
```

Copy the wallet address shown in the app and head over to
[getsome.nimiq.com](https://getsome.nimiq.com).
Follow the Nimiq Onboarding Guide, create a wallet and receive one NIM.
Finally you'll arrive in the Nimiq Safe from where you can send the NIM to your address here.
And you can also send it back to keep it safe. :)

## Need more ideas?

Sure!

**Encryption**: Right now, your private key is stored unencrypted.
You can replace `exportPlain()` with `exportEncrypted(password)` and `loadPlain()` with `loadEncrypted(stored, password)`.

**Transaction message**: Want to send a little message with each transaction?
Yes, off to extended transactions in the next tutorial!

---

**Continue the tutorial**: [Basics 4, Extended  Transactions »](basics-4-extended-tx)

_Find more help and documentation in the [Nimiq Developer Center](https://nimiq.com/developers/).
Share your ideas and feedback on the [Nimiq Community Forum](https://forum.nimiq.community),
you'll also find a dedicated section for [discussions and ideas](https://forum.nimiq.community/c/documentation/drafts).
Or get in touch at [sven@nimiq.com](mailto:sven@nimiq.com)._
