# Basics 2: Blockchain Events & User Interface

**Goal**: We'll add listeners to events on the blockchain and network and show these updates in a beautiful Nimiq-style UI.

_[» Skip tutorial and see the code](playground.html#basics-2-events-and-ui-demo.html)._

> **Just Getting started?**
> This tutorial is based on the ideas and code of [Basics 1: Consensus](basics-1-consensus.md).
> So we have a nano client being connected and synced with the network but mostly printing out some logs.

Our app needs some basic UI. And some more data to show.

## Showing Statistics

Let's add some plain HTML to show a status message, the current block height,
and how many peers are currently connected.
We'll use `span` tags with IDs to fill in the data later.

```html
<body>
    <h1>Nimiq Demo App</h1>
    <p>Status: <span id="message"></span></p>
    <p>Current block height: <span id="height"></span></p>
    <p>Current number of peers: <span id="peers"></span></p>
</body>
```

In the `start` function, the nano client will connect to the network and
establish consensus.
See [Basics 1: Establishing Consensus](basics-1-consensus) for details.
We will listen to events from various parts of the blockchain later on.
Thus, we define a shared variable `nimiq` to keep references.
(More details on each part in the next tutorial.)

```js
const nimiq = {}; // < -- this is the shared variable

async function start() {
    // Code from tutorial "Basics 1: Establishing Consensus"
    status('Nimiq loaded. Connecting...');
    Nimiq.GenesisConfig.test();
    const consensus = await Nimiq.Consensus.nano();
    consensus.network.connect();
    status('Syncing and establishing consensus...');

    // Store references
    nimiq.consensus  = consensus;
    nimiq.network    = consensus.network;
    nimiq.blockchain = consensus.blockchain;
}
```

Besides the `status` function from the previous tutorial, we prepare three event handlers:

```js
// A little shortcut for `document.getElementById()`
const $ = document.getElementById.bind(document);

function status(text) {
    $('message').textContent = text;
}

function onConsensusEstablished() {
    status('Consensus established.');
    $('height').textContent = nimiq.blockchain.height;

    // Now start listening for new blocks, the latest block is called head
    nimiq.blockchain.on('head-changed', onHeadChanged);
}

// A new block got mined and is now the latest block
function onHeadChanged() {
    $('height').textContent = nimiq.blockchain.height;
}

// Number of connected peers has changed
function onPeersChanged() {
    $('peers').textContent = nimiq.network.peerCount;
}
```

Now, let's connect the handlers to the parts by adding to the `start()` function:

```js
async function start() {
    // ... previous code

    nimiq.consensus.on('established', onConsensusEstablished);
    nimiq.consensus.on('lost', () => status('Consensus lost'));
    nimiq.network.on('peers-changed', onPeersChanged);
}
```

Finally, start the Nimiq client library.
You will have this line already if you continued from tutorial 1.

```js
Nimiq.init(start);
```

**The logic is defined, let's make it look good!**

## Making it Beautiful with Nimiq Style

Nimiq Style requires two CSS files to be added to `<head>`:

```html
<link href="https://fonts.googleapis.com/css?family=Muli:400,600,700" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/@nimiq/style@v0/nimiq-style.min.css" rel="stylesheet">
```

> Learn more about Nimiq Style:
>
> * [The Nimiq Style Guide](http://nimiq.com/styleguide/)
> * [Documentation](https://nimiq.github.io/submodules/style/#nimiq-style-framework)
> * [Source code](https://github.com/nimiq/nimiq-style)
> * [Cheatsheet](https://nimiq.github.io/submodules/style/demo.html)

The Nimiq Style CSS framework provides classes are prefixed with `nq-`.
Setting `nq-style` on `<body>` will automatically style general elements such as paragraphs and links.
`nq-card` will create a nice box layout to put content in.

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

Check it out. **That's much better with just a few lines of code!**


[» Run and modify this code live](playground.html#basics-2-events-and-ui-demo.html).

## What's next?

This short demo could be extended to a little blockchain statistics viewer.

More ideas:

**Global hash rate**: Want to calculate and show the global hash rate?
Get the difficulty from the latest block in `onHeadChanged`
and have a look at the [nano network API](https://github.com/nimiq/nano-api/blob/1b020bf13855e5eac484c36d5c6ca4f19081bb42/src/nano-network-api.js#L468)
to turn the difficulty into the global hash rate.
And while you're at it, how about adding some graphs? :)

**Error handling**: Before publishing this your Nimiq Nano Wallet, you should add some error handling.
A basic version could be something along the lines of:

```js
function onError(code) {
    switch (code) {
        case Nimiq.ERR_WAIT:
            alert('Error: Nimiq is already running in another tab or window.');
            break;
        case Nimiq.ERR_UNSUPPORTED:
            alert('Error: Browser not supported.');
            break;
        default:
            alert('Error: Nimiq initialization error.');
            break;
    }
}

// Nimiq.init() accepts an error handler as a second parameter
Nimiq.init(start, onError);
```

---

**Continue the tutorial**: [Basics 3, Sending and Receiving Transactions »](basics-3-transactions)

_Get in touch at [sven@nimiq.com](mailto:sven@nimiq.com) to share your ideas and feedback!_
