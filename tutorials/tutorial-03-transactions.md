# Transactions

## Persist Wallet

Now we are almost ready to receive some NIM.
Just that we create a new wallet each time the demo starts.
So for testing purpose, we are going to use the local storage of your browser to remember our wallet.

```js

```

If you want to have a look at the wallet stored, open your dev tools by pressing F12 and enter

```js
localStorage.getItem('wallet');
```

It will be a list of numbers, that's the serialized form of bytes that represent your private key.

**Suggestion**: Right now, your private key is stored unencrypted.
You can replace `exportPlain()` with `exportEncrypted(password)`, `loadPlain()` with `loadEncrypted(password)`.

## Receive Funds

So now we're ready to receive some NIM!
Copy the `address` shown in the app and head over to
Head over to [getsome.nimiq-testnet.com](https://getsome.nimiq-testnet.com).
Follow the Nimiq Onboarding Guide, create a wallet in the Nimiq Keyguard and receive some NIM.
Finally you'll arrive in the Nimiq Safe (Testnet version) with a few NIM in your wallet.
Click that account there and send the NIM to the address you copied from this demo app.

The block time of the Nimiq Blockchain is one minute in average.
Thus, you should have the funds in maximum one minute in the wallet of your app.

## Send TX

Now that we have some NIM, let's extend our app to also be able to send NIM!

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
