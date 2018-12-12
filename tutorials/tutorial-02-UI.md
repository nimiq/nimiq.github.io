# Basics 2: Blockchain Events & Nimiq Style UI

_[Skip tutorial and see the code](https://jsbin.com/lukofer/edit?html,output)._

Getting started? This tutorial is based on the ideas and code of [Basics 1: Nano Client](tutorial-01-basic-client.md).

**Goal**: Nimiq-style UI to show consensus and network statistics.

## Show Statistics

Let's add some plain HTML to show a status message, the current block height,
and how many peers are currently connected.
We'll use `span` tags with IDs to fill in the data later.

```html
<body>
    <h1>Nimiq Demo App</h1>
    <div id="info">
        <p>Status: <span id="message">loading...</span></p><!-- from Tutorial 1 -->
        <p>Current block height: <span id="height">loading&hellip;</span></p>
        <p>Current number of peers: <span id="peers">loading&hellip;</span></p>
    </div>
</body>
```

The `start` function will connect to the network and establish nano consensus
(see [Tutorial 1: Basic Client](tutorial-01-basic-client.md) for details).
We will store references in the shared variable `nimiq` for later.

```js
const nimiq = {};

async function start() {
    // Code from Tutorial 1
    status('Nimiq loaded. Connecting...');
    Nimiq.GenesisConfig.test();
    const consensus = await Nimiq.Consensus.nano();
    consensus.network.connect();
    status('Syncing and establishing consensus...');


    // Store references
    nimiq.consensus = consensus;
    nimiq.network = consensus.network;
    nimiq.blockchain = consensus.blockchain;
}
```

Next, add handler functions for events (we'll add those in the step after).

```js
// A little shortcut for `document.getElementById()`
const $ = document.getElementById.bind(document);

function status(text) {
    $('message').textContent = text;
}

function onConsensusEstablished() {
    status('Consensus established');
    $('height').textContent = nimiq.blockchain.height;
}

function onHeadChanged() {
    $('height').textContent = nimiq.blockchain.height;
}

function onPeersChanged() {
    $('peers').textContent = nimiq.network.peerCount;
}
```

Now, add event listeners in the `start` function to get informed about the connection status and changes in the network.

```js
async function start() {
    ...

    nimiq.consensus.on('established', onConsensusEstablished);
    nimiq.consensus.on('lost', () => status('Consensus lost'));
    nimiq.blockchain.on('head-changed', onHeadChanged);
    nimiq.network.on('peers-changed', onPeersChanged);
}
```

Finally, start the Nano Client when the page finished loading:

```js
window.onload = () => Nimiq.init(start);
```

**Great, we defined the logic, but it still looks very simple. Let's make it beautiful!**

## Making it Beautiful with Nimiq Style

Two CSS files are needed:
* **nimiq-style.css**: Nimiq's CSS definitions
* **Muli font**: The main font of Nimiq

```html
<link href="https://fonts.googleapis.com/css?family=Muli:400,600,700" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/@nimiq/style@v0/nimiq-style.min.css" rel="stylesheet">
```

>More info on Nimiq Style:
>
>* [Documentation](TODO)
>* [Source code](https://github.com/nimiq/nimiq-style)
>* [Cheatsheet](TODO)
>* [**Recommended: The Nimiq Style Guide**](http://nimiq.com/styleguide)

The CSS framework provides CSS classes to apply the styling.
The prefix `nq-` is used for Nimiq styles,
setting the class `nq-style` on the `body` tag will style general elements such as paragraphs and links,
and `nq-card` will create a nice box layout.

```html
<body class="nq-style">
    <div class="nq-card">
        <div class="nq-card-header">
            <h1>Nimiq Demo App</h1>
        </div>
        <div class="nq-card-body">
            <p>Status: <span id="message"></span></p>
            <p>Current block height: <span id="height"></span></p>
            <p>Current number of peers: <span id="peers"></span></p>
        </div>
    </div>
</body>
```

To have the box full-screen for mobile and neatly centered for desktop, add these styles to your markup:

```css
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

[Have a look at it!](../demo/basic-ui.html)

**That's much better!**

[&raquo; Run and modify this code live](https://jsbin.com/lukofer/edit?html,output)

## What's next?

This short demo could be extended to a little blockchain statistics viewer. Have a look at the [Nimiq Core API Documentation](#todo) to see what's possible.

**Idea**: Want to calculate and show the global hash rate?
Get the difficulty from the latest block in `onHeadChanged`
and have a look at the [nano network API](https://github.com/nimiq/nano-api/blob/1b020bf13855e5eac484c36d5c6ca4f19081bb42/src/nano-network-api.js#L468)
to turn the difficulty into the global hash rate.

You could also add some graphs! :)

---

Continue the tutorial: [Basics 3, Sending and Receiving Transactions &raquo;](tutorial-basics-3-tx)
