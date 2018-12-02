# Demo App Tutorial

We'll go step by step setting up a demo app that connects to the Nimiq network and establishes consensus.
Each step links to the source code at that stage so you can check it out, modify, play with it and learn.
At the end of the tutorial you'll have a basic platform to build Nimiq-enabled apps on top.

## Getting started

Let’s create a simple HTML page and add the Nimiq library.

```HTML
<!DOCTYPE html>
<html>
<head>
    <meta charset=utf-8 />
    <title>Nimiq Demo App</title>
    <script type="text/javascript" src="https://cdn.nimiq.com/nimiq.js"></script>
    <script>
        // Our code will live here
    </script>
    </head>
<body>
    <h1>Nimiq Demo App</h1>
</body>
</html>
```

[source](../demo/demo0010.html)

Nimiq the nano client and coing code the empty script tag:
In the first step, we start the Nimiq Nano Client and connect it to the network.
Comments are further explained below the code snippet.

```js
function init() {
    Nimiq.init(async function() {
        // Connect to the Nimiq Testnet - details below
        Nimiq.GenesisConfig.test();

        // Wait for consensus to be established
        const consensus = await Nimiq.Consensus.nano();

        const [blockchain, mempool, network] = consensus;
        // const mempool = consensus.mempool;
        // const network = consensus.network;

        // Generate a temporary wallet.
        const wallet = await Nimiq.Wallet.generate();

        network.connect();
    });
}
```

Consider the line `Nimiq.GenesisConfig.test()`.
Here the client is instructed to connect to the Nimiq Testnet.
The Testnet is recommended for testing new applications.
Once the application is matured and ready to go live, replace this line with
`Nimiq.GenesisConfig.main()` to switch to Nimiq Mainnet.

Want to see it in action? Open [this link](..demo/demo0020.html) in a new tab
and open the developer console by pressing the `F12` key.
You will see several print-outs from the Nano Client.

You might also notice some red lines like
`Firefox can’t establish a connection to the server at ws://pool.nimiq-testnet.com:8443/`.
While trying to connect to all possible nodes,
some of those connections might just fail for various reasons, that's normal.
But if the client is not able to establish consensus even after a long waiting period,
something might be wrong with your Internet connection.
Check if you're online.

Finally, you should see
`BaseConsensus: Synced with all connected peers, consensus established`.

The client is connected to the network!

That's great, but the page is all empty, let's add some indictors for the user about what is happening...

```html
<body>
    <div id="message">loading...</div>
</body>
```

```js
function status(text) {
    document.getElementById('message').innerText = text;
}

function init() {
    Nimiq.init(async function() {
        status('Nimiq loaded. Connecting and establishing consensus...');
```

And add at the bottom

```js
        network.connect();
        status('Connected. Establishing consensus...');

        consensus.on('established', () => status('Consensus established'));
    });
};
```
[> See it in action](../demo/demo0030.html)

---

ideas
link to testnet faucet > get incoming TX
send TX > back to faucet?

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

```js
function init() {
    ...
    consensus.on('established', () => _onConsensusEstablished());
    consensus.on('lost', () => console.error('Consensus lost'));
    blockchain.on('head-changed', () => _onHeadChanged());
    network.on('peers-changed', () => _onPeersChanged());

```
