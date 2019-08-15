# Basics 2: Blockchain Events & User Interface

**Goal**: We'll add event listeners and show updates in a beautiful Nimiq-style UI.

_[» Skip tutorial and see the code](playground.html#basics-2-events-and-ui-demo.html)._

> **Just Getting started?**
> This tutorial is based on the ideas and code of [Basics 1: Consensus](basics-1-consensus.md),
> were we set up a minimal Pico Client that connects and syncs with the network but without much UI.

Our app needs some basic UI. And some more data to show.

## Showing Statistics

Let's add some plain HTML to show a status message and some network statistics such as
current block height, connected peers, and the amount of data going in and out.
We'll use `<span>` tags with IDs as placeholders to put the content in later.

```html
<body>
    <h1>Nimiq Demo App</h1>
    <p>Status: <span id="message"></span></p>
    <p>Current block height: <span id="height"></span></p>
    <p>Network: <span id="network"></span></p>
</body>
```

In the `start()` function, the Pico Client will connect to the network and
establish consensus.
See [Basics 1: Establishing Consensus](basics-1-consensus) for details.
We define a shared variable `nimiq` to keep references to client and network for later.
(More details on each part in the next tutorial.)

```js
const nimiq = {}; // < -- this is the shared variable

async function start() {
    // Code from tutorial "Basics 1: Establishing Consensus"
    status('Nimiq loaded. Establishing consensus...');
    Nimiq.GenesisConfig.test();
    const configBuilder = Nimiq.Client.Configuration.builder();
    const client = configBuilder.instantiateClient();

    // Store references
    nimiq.client = client;
    nimiq.network = client.network;
}
```

Besides the `status()` function from the previous tutorial, we prepare two event handlers:

```js
// A convenient shortcut for 'document.getElementById()'
const $ = document.getElementById.bind(document);

function status(text) {
    $('message').textContent = text;
}

// Moving the code from 'start()' into its own handler function
function onConsensusChanged(consensus) {
    status(
        consensus == Nimiq.Client.ConsensusState.ESTABLISHED
            ? 'Consensus established.'
            : 'Establishing consensus...'
    );
}

// Head change means a new block got mined, replacing the old "head block"
async function onHeadChanged() {
    const height = await nimiq.client.getHeadHeight();
    $('height').innerText = height;

    // Show some network statistics
    const stats = await nimiq.network.getStatistics();
    const { totalPeerCount, bytesReceived, bytesSent } = stats;
    $('network').textContent =
        `${totalPeerCount} peers connected,
         ${bytesSent} bytes sent,
         ${bytesReceived} received.`;
}
```

The first handler, `onConsensusChanged`, will only print out a little note when consensus has been established.
The code was part of `start()` in the [previous tutorial](basics-1-consensus).
The second handler, `onHeadChanged`, is more interesting.
It will be called each time a new block gets added to the Nimiq blockchain.
When this happens, we will update the UI with the new current block height as well as some network statistics.

Now, let's connect the handlers to the events by adding event listeners in `start()`:

```js
async function start() {
    // ... previous code

    client.addConsensusChangedListener(onConsensusChanged);
    client.addHeadChangedListener(onHeadChanged);
}
```

Final step: initialize the Nimiq client library passing our `start` function
that will be called once everything is loaded and ready.
You will have this line already if you continued from [tutorial 1](basics-1-consensus).

```js
Nimiq.init(start);
```

**The logic is defined, let's make it look good!**

## Beautiful UI with Nimiq Style

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

The Nimiq Style CSS framework provides classes that are prefixed with `nq-`.
Setting `nq-style` on `<body>` will automatically style general elements such as paragraphs and links.
`nq-card` will create a box layout to separate content.

```html
<body class="nq-style">
    <div class="nq-card">
        <div class="nq-card-header">
            <h1>Nimiq Demo App</h1>
        </div>
        <div class="nq-card-body">
            <p>Status: <span id="message"></span></p>
            <p>Current block height: <span id="height"></span></p>
            <p>Network: <span id="network"></span></p>
        </div>
    </div>
</body>
```

To have the box full-screen for mobile and neatly centered for desktop,
add these styles to a `<style>` tag in the `<head>` section of your markup:

```css
.nq-card {
    margin: 0 auto;
}

@media(min-width: 800px) {
    .nq-card {
        margin-top: 10rem;
    }
}
```

Check it out:

![Nimiq style applied to the demo](resources/nimiq-style.png)

That's starting to look more like a real UI.
**And just with a few lines of code!**

[» Run and modify this code live](playground.html#basics-2-events-and-ui-demo.html).

## What's next?

This short demo could be extended to a little blockchain stats viewer.
You could add:

**Global hash rate**: Want to calculate and show the global hash rate?
Get the difficulty from the latest block in `onHeadChanged`
and have a look at the [nano network API](https://github.com/nimiq/nano-api/blob/1b020bf13855e5eac484c36d5c6ca4f19081bb42/src/nano-network-api.js#L468)
to turn the difficulty into the global hash rate.
And while you're at it, how about adding some graphs? :)

**Error handling**: Before publishing your app, you should add some error handling.
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

_Note:_ Basic error handling will be part of the code from the next tutorial.

---

**Continue the tutorial**: [Basics 3, Sending and Receiving Transactions »](basics-3-transactions)

_Find more help and documentation in the [Nimiq Developer Center](https://nimiq.com/developers/).
Share your ideas and feedback on the [Nimiq Community Forum](https://forum.nimiq.community),
you'll also find a dedicated section for [discussions and ideas](https://forum.nimiq.community/c/documentation/drafts).
Or get in touch at [sven@nimiq.com](mailto:sven@nimiq.com)._
