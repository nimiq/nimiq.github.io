# Basics 3: Transactions

*Skip tutorial and see [the code](https://jsbin.com/hucufav/edit?html,output).*

Building on [Basics 2: Nimiq Style UI](tutorial-02-UI.md),
now we are almost ready to receive some NIM.

But first, we need a wallet. And a place to store it.

## Create and Store a Wallet

Just that we create a new wallet each time the demo starts.
So for testing purpose, we are going to use the local storage of your browser to remember our wallet.

To create a [Nimiq Wallet](https://github.com/nimiq-network/core/blob/ed21cda4dcdf1d4cee24842f2e1cb56c1240565e/src/main/generic/wallet/Wallet.js) is as simple as:

```js
const wallet = await Nimiq.Wallet.generate();
```

We can use the `localStorage` to keep the wallet for the next visit.
With this snippet in `start()` the app will first try to load the wallet from `localStorage` and
and if that fails create a new wallet and store it.

```js
    // Load or generate a wallet. And store it again.
    const stored = JSON.parse(localStorage.getItem('wallet'));
    const wallet = stored ? Nimiq.Wallet.loadPlain(stored) : await Nimiq.Wallet.generate();
    localStorage.setItem('wallet', JSON.stringify(Array.from(wallet.exportPlain())));

    Object.assign(nimiq, { consensus, blockchain, network, wallet });
```

For showing address and balance in UI, we add two fields to the `<div id="info">` and some JavaScript.

```html
<p>Account address: <span id="address">loading&hellip;</span></p>
<p>Balance: <span id="balance">loading&hellip;</span></p>
```

Updating the balance on each head change and as soon as consensus is established.

```js
function onConsensusEstablished() {
    status('Consensus established');
    $('message').innerText = 'Consensus established.';
    $('height').innerText = nimiq.blockchain.height;
    $('address').innerText = nimiq.wallet.address.toUserFriendlyAddress();

    updateBalance();
}

function onHeadChanged() {
    $('height').innerText = nimiq.blockchain.height;

    updateBalance();
}

```

The `consensus` object can get us the latest account status which includes the balance in Luna (satoshi).

```js
function updateBalance() {
    nimiq.consensus
        .getAccount(nimiq.wallet.address)
        .then(account => {
            account = account || Nimiq.BasicAccount.INITIAL;
            $('balance').innerText = Nimiq.Policy.satoshisToCoins(account.balance).toFixed(2);
        });
}
```

Run [the example](https://jsbin.com/hucufav/edit?html,output) and open your dev tools (F12) and see the stored wallet.

```js
localStorage.getItem('wallet');
```

What you get back are the bytes representing your serialized private key.

Wallet: check.

## Send Transactions

```js 

---

## Get some NIM

So now we're ready to receive some NIM!
Let's switch `test()` to `main()` to use real NIM.

```js
    Nimiq.GenesisConfig.main();
```

Copy the `address` shown in the app and head over to
Head over to [getsome.nimiq-testnet.com](https://getsome.nimiq-testnet.com).
Follow the Nimiq Onboarding Guide, create a wallet in the Nimiq Keyguard and receive some NIM.
Finally you'll arrive in the Nimiq Safe (Testnet version) with a few NIM in your wallet.
Click that account there and send the NIM to the address you copied from this demo app.

The block time of the Nimiq Blockchain is one minute in average.
Thus, you should have the funds in maximum one minute in the wallet of your app.

---

ideas
link to testnet faucet > get incoming TX
send TX > back to faucet?
section on debugging and testing (window.nimiq = nimiq, dev panel (use console, network tab))

---

Error handling

```js
function init() {
    ...
        network.connect();
    }
    , function(code) {
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
    });
```

Handle events on the blockchain

---

after

**Suggestion**: Right now, your private key is stored unencrypted.
You can replace `exportPlain()` with `exportEncrypted(password)`, `loadPlain()` with `loadEncrypted(password)`.

link
