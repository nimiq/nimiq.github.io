# Basics 2: Nimiq Style UI

_Skip tutorial and see [the code](https://jsbin.com/lukofer/edit?html,output)._
https://jsbin.com/cibepapamo/edit?html,output

Getting started? This tutorial is based on the ideas and code of [Basics 1: Nano Client](tutorial-01-basic-client.md).

**Goal**: Nimiq-style UI to show consensus and network statistics.

## Show some statistics

Let's add some plain HTML to show a status message, the current block height,
and how many peers are currently connected.
We'll use `span` tags with IDs to fill in the data later.

```html
<body>
    <h1>Nimiq Demo App</h1>
    <div id="info">
        <p>Status: <span id="message">loading&hellip;</span></p>
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
    status('Nimiq loaded. Connecting and establishing consensus...');

    Nimiq.GenesisConfig.test();

    const consensus = await Nimiq.Consensus.nano();
    const { blockchain, network } = consensus;

    network.connect();
    status('Connected. Establishing consensus...');

    Object.assign(nimiq, { consensus, blockchain, network });
    ...
```

Finally, add event handlers to get informed about the connection status and changes in the network.

```js
    ...
    consensus.on('established', onConsensusEstablished);
    consensus.on('lost', () => status('Consensus lost'));
    blockchain.on('head-changed', onHeadChanged);
    network.on('peers-changed', onPeersChanged);
}
```

A little shortcut for `document.getElementById()` and some basic handlers:

```js
const $ = document.getElementById.bind(document);

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

And have the Nano Client being started when the page finished loading:

```js
window.onload = () => Nimiq.init(start);
```

Now, let's make it beautiful!

## Make it beautiful with Nimiq Style

Two CSS files are needed:
* **Muli font**: the main font of Nimiq
* **nimiq-style.css**: the actual CSS definitions

```html
<link href="https://fonts.googleapis.com/css?family=Muli:400,600,700" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/@nimiq/style@v0/nimiq-style.min.css" rel="stylesheet">
```

More info on Nimiq Style:

* [Documentation](TODO)
* [Source code](https://github.com/nimiq/nimiq-style)
* [Cheatsheet](TODO)
* [**Recommended: The Nimiq Style Guide**](http://nimiq.com/styleguide)

The CSS framework provides CSS class to apply the styling.
`nq-` is the namespace used for Nimiq Style,
`nq-style` set on body will style general elements such as paragraphs and links,
`nq-card` will create a nice box layout.

```html
<body class="nq-style">
    <div class="nq-card">
        <div class="nq-card-header">
            <h1 class="nq-h1">Nimiq Demo App</h1>
        </div>
        <div class="nq-card-body">
            <div id="info">
                <p>Status: <span id="message"></span></p>
                <p>Current block height: <span id="height"></span></p>
                <p>Current number of peers: <span id="peers"></span></p>
            </div>
        </div>
    </div>
</body>
```

And to have the box full-screen for mobile and neatly centered for desktop:

```html
<style>
    .nq-card {
        margin: 0 auto;
    }
    @media(min-width: 800px) {
        .nq-card {
        margin-top: 10rem;
        }
    }
</style>
```

[Look at it!](../demo/basic-ui.html)

**That's much better!**

[&raquo; Run and modify this code live](https://jsbin.com/lukofer/edit?html,output)

## What's next?

This short demo could be extended to a little blockchain statistics viewer.

**Idea**: Want to calculate and show the global hash rate?
Get the difficulty from the latest block in `onHeadChange`
and have a look at the [nano network API](https://github.com/nimiq/nano-api/blob/1b020bf13855e5eac484c36d5c6ca4f19081bb42/src/nano-network-api.js#L468)
to turn the difficulty into the global hash rate&hellip;

And how about adding some graphs? :)

---

Continue the tutorial: [Basics 3, Sending and Receiving Transactions &raquo;](tutorial-basics-3-tx)
