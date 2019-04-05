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

The code above will generate a new random wallet whenever you reload the page. But we can use `localStorage` to store our wallet.
With the following snippet in `start()`, the app will try to load a previously stored wallet or
otherwise create a new wallet and store it.

```js
const stored = localStorage.getItem('wallet');
const wallet = stored ? Nimiq.Wallet.loadPlain(JSON.parse(stored)) : Nimiq.Wallet.generate();
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

    nimiq.blockchain.on('head-changed', onHeadChanged);
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
> **Play:** To see your stored wallet, run [the example](playground.html#basics-3-transactions-demo.html),
> open your dev tools (F12), and enter:
>
> ```js
> localStorage.getItem('wallet');
> ```
>
> What you will get back is an array of bytes representing your serialized key pair consisting of public and private key.

**Great! Your balance now stays up-to-date.**
All set to finally send and receive NIMs.

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
> If you want to send out more transactions at once, a minimum fee of two Luna per byte is required.
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
Start [the demo](playground.html#basics-3-transactions-demo.html)
and switch to Mainnet in `start()`.

```js
Nimiq.GenesisConfig.main();
```

Copy the `address` shown in the app and head over to
[getsome.nimiq.com](https://getsome.nimiq.com).
Follow the Nimiq Onboarding Guide, create a wallet and receive one NIM.
Finally you'll arrive in the Nimiq Safe from where you can send the NIM to your address here.
And you can also send it back to keep it safe. :)

## What's next?

Want to send a little message with each transaction? Yes, off to extended transactions in the next tutorial!

---

**Continue the tutorial**: [Basics 4, Extended  Transactions »](basics-4-extended-tx)

_Get in touch at [sven@nimiq.com](mailto:sven@nimiq.com) to share your ideas and feedback!_
