# Basics 2: Nimiq Style UI

*Skip tutorial and see [the code](https://jsbin.com/lukofer/edit?html,output).*

Getting started? This tutorial is based on the ideas and code of [Tutorial 01: Basic Client](tutorial-01-basic-client.md).

Goal: Nimiq-style UI to show consensus and network statistics.

## Show some statistics

Some plain HTML to show a status message, current block height, and how many peers are currently connected.
We'll use the `span` tags with IDs to fill in the data later.

```html
<body>
    <h1>Nimiq Demo App</h1>
    <p>Status: <span id="message">loading&hellip;</span></p>
    <div id="info">
        <p>Current block height: <span id="height">loading&hellip;</span></p>
        <p>Current number of peers: <span id="peers">loading&hellip;</span></p>
    </div>
</body>
```

The start function will connect to the network and establish nano consensus
(see [Basic Client](tutorial-01-basic-client.md) for details).
We'll store references in the shared variable `nimiq` for later.

```js
const nimiq = {};

async function start() {
    // Use: Testnet and nano consensus
    Nimiq.GenesisConfig.test();
    const consensus = await Nimiq.Consensus.nano();

    const { blockchain, network } = consensus;

    network.connect();

    Object.assign(nimiq, { consensus, blockchain, network });
```

Finally, add event handlers to get informed about the connection status and changes in the network.

```js

    // Event handlers
    consensus.on('established', onConsensusEstablished);
    consensus.on('lost', () => status('Consensus lost'));
    blockchain.on('head-changed', onHeadChanged);
    network.on('peers-changed', onPeersChanged);
```

Add some basic handlers before `start`.

```js
function status(text) {
    $('message').innerText = text;
}

function onConsensusEstablished() {
    status('Consensus established');
    $('height').innerText = nimiq.blockchain.height;
}

function onHeadChanged() {
    $('height').innerText = nimiq.blockchain.height;
}

function onPeersChanged() {
    $('peers').innerText = nimiq.network.peerCount;
}
```

And run the `start` script when the page finished loading.

```js
window.onload = () => Nimiq.init(start);
```

But ok, that is all functional but not yet pretty&hellip;

## Make it beautiful with Nimiq Style

Three CSS files are needed:
* Muli font: the main font
* Fira Mono: to print numbers in a monospace font
* nimiq-style.css

```html
<link href="https://fonts.googleapis.com/css?family=Muli:400,600,700" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Fira+Mono&text=0123456789ABCDEFGHJKLMNPQRSTUVXY" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/@nimiq/style@v0/nimiq-style.min.css" rel="stylesheet">
```

More info on Nimiq Style:

* [Documentation](TODO)
* [Source code](https://github.com/nimiq/nimiq-style)
* [Cheatsheet](TODO)
* [Style guide](http://nimiq.com/styleguide)

Then some annotations of the HTML source to use the styling.
`nq-` is the namespace used for Nimiq Style,
`nq-card` will create a nice box around.

```html
<body>
    <div class="nq-card">
        <div class="nq-card-header">
            <h1 class="nq-h1">Nimiq Demo App</h1>
        </div>
        <div class="nq-card-body">
            <div id="info">
                <p>Current block height: <span id="height">loading&hellip;</span></p>
                <p>Current number of peers: <span id="peers">loading&hellip;</span></p>
            </div>
        </div>
        <div class="nq-card-footer">
            <p>Status: <span id="message">loading&hellip;</span></p>
        </div>
    </div>

</body>
```

And to have the box neatly centered, and the numbers printed in monospace&hellip;

```html
<style>
    .nq-card {
        margin: 2rem auto;
    }
    #info span {
        font-family: 'Fira Mono';
    }
</style>
```

[Look at it!](../demo/nimiq-style-ui.html)

**Much better!**

[&raquo; Run and modify this code live](https://jsbin.com/lukofer/edit?html,output)

This could be extended to a blockchain statistics viewer.

**Idea**: Want to calculate and show the global hash rate?
Get the difficulty from the latest block in `onHeadChange`,
have a look at the [nano network API](https://github.com/nimiq/nano-api/blob/1b020bf13855e5eac484c36d5c6ca4f19081bb42/src/nano-network-api.js#L468)
to turn the difficulty into the global hash rate&hellip;

And how about adding some graphs? :)

---

[&raquo; Next: Basics 3, Sending and Receiving Transactions](tutorial-basics-3-tx)
