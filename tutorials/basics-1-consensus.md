# Basics 1: Establishing Consensus

> **Hey, hello! Welcome!**
Hope you're going to have a good time checking out these tutorials,
experimenting with the code, breaking stuff, fixing it, breaking it more.
You know how that goes. :)
If something seems unclear or can be improved,
please get in touch with me directly at [sven@nimiq.com](sven@nimiq.com) and
also join the Nimiq dev community on [Telegram](https://t.me/joinchat/AAAAAEJW-ozFwo7Er9jpHw) and
[Discord](https://discord.gg/cMHemg8), fellow devs are keen to help.
Enjoy!

**Goal of this first tutorial**:
Getting started by building a minimal app that connects to the Nimiq network and establishes consensus.

## About Blockchain

Nimiq is a payment protocol based on blockchain technology.
Blockchain technology is

* Censorship resistant: nobody can keep you from using it
* Privacy oriented: you don't need to provide any personal information to open an account
* Decentralized: not controlled by a single person but by all its users

A blockchain is like a distributed database, known as "ledger".
Getting in sync with the other nodes in the network about what is
the latest version of that database is called
[establishing consensus](https://en.bitcoin.it/wiki/Consensus).
Most blockchain technologies "require" you to
connect to the network via a third party,
because otherwise you'd need to download
the entire database of more than 100 GB of data
to be able to run a
[full node](https://en.bitcoin.it/wiki/Full_node) and establish consensus.
Thus "forcing" you to trust that third party, just take the popular
[MyEtherWallet](https://kb.myetherwallet.com/networks/run-your-own-node-with-myetherwallet.html) as an example.
With Nimiq you can connect directly to the network with what we what we call a Pico Client.
The concept is based on Ethereum's
[light client](https://github.com/ethereum/wiki/wiki/Light-client-protocol).
A Pico Client reaches consensus by asking all its peer for the latest block,
and only if that fails or the peers don't agree on the same status,
it will automatically start downloading a compressed form of the latest state of the blockchain
which is only abut 1MB but still enables the Pico Client to verify all information.
That means even in the worst case it can reach consensus in just a few seconds.
You can find much more details about all this in the [Nimiq White Paper](https://nimiq.com/whitepaper).

The goal of this little demo is to connect to the network and reach consensus.

_[» Skip tutorial and experiment with the code](playground.html#basics-1-consensus-demo.html)._

It's a good idea to [open the source code](playground.html#basics-1-consensus-demo.html)
in parallel to see how it all fits together, but also to modify and play.
Later on, you can use this example as a basis to build your own Nimiq-enabled apps.

## Getting started

We start from an empty HTML 5 page and load the Nimiq library in the `<head>` section:

```HTML
<!DOCTYPE html>
<html>
<head>
    <meta charset=utf-8 />
    <title>Nimiq Demo App</title>
    <script type="text/javascript" src="https://cdn.nimiq.com/v1.5.0/nimiq.js"></script>
    <script>
        // The code below will go here
    </script>
</head>
<body>
    <h1>Nimiq Demo App</h1>
</body>
</html>
```

Add a function that will execute once the Nimiq library has been loaded:

```js
async function start() {
    // The code below will go here
}

Nimiq.init(start);
```

Inside this function:

1) We're going to configure Nimiq to use "Testnet".
   Which is - as the name suggests - a good choice for experimenting and testing.

   ```js
   Nimiq.GenesisConfig.test();
   ```

2) Then we use the Config Builder (details below)...

   ```js
   const configBuilder = Nimiq.Client.Configuration.builder();
   ```

3) ... to get the client instance that automatically connects to the network.

   ```js
   const client = configBuilder.instantiateClient();
   ```

**These three lines are all it needs to get a Nimiq Client connected to the network!**

When you run this code, you'll notice it will take a moment to reach consensus.
Open the dev tools (F12) to see logs of the Nano Client and understand better what's going on under the hood.

The **Config Builder** will create the optimal Nimiq Client depending on the features we need for our project.
In many cases no additional features are needed - like in this example -
and so the builder will setup a Pico Client for us which is able to sync and establish consensus in just a few seconds.
For the entire tutorial, no extra features are needed.
So we can skip diving into details.

Great, let's add some UI to see what's happening behind the scenes.

## User Interface

Adding a `<div>` with an ID to print out the status messages:

```html
<body>
    <h1>Nimiq Demo App</h1>
    <div id="message"></div> <!-- this one -->
</body>
```

And a function to put the word out:

```js
function status(text) {
    document.getElementById('message').textContent = text;
}
```

And then use it in the code:

```js
async function start() {
    status('Nimiq loaded. Establishing consensus...');           // <= here

    // Code from 'Getting started'
    Nimiq.GenesisConfig.test();
    const configBuilder = Nimiq.Client.Configuration.builder();
    const client = configBuilder.instantiateClient();

    status('Syncing and establishing consensus...');  // <= here and below

    // Can be 'syncing', 'established', and 'lost'
    client.addConsensusChangedListener((consensus) =>
        status(`Consensus: ${ consensus }`)
    );
};
```

**The Nano Client is set up! It connects, syncs with the network and establishes consensus!**

## Next Steps

**Your turn!**

Following the link below, you will see the prototype in action and you can mess around with the code.
Open the dev tools in your browser - by pressing F12 - to see all the logs from the Nano Client.
Some lines will be in red and similar to
`WebSocket connection to 'wss://some.address:8443/' failed: ...`.
Don't worry, nothing's broken here.
It simply means your client tried to connect to another node in the network and that connection failed.
That's normal in the peer-to-peer blockchain world.

After a while, you should see
`BaseConsensus: Synced with all connected peers, consensus established`.

**Welcome to the Nimiq Network! :)**

[» See the prototype in action and modify it](playground.html#basics-1-consensus-demo.html).

If even after a long time the client can not establish consensus, something went wrong.
Check your Internet connection and make sure your browser's ad blocker is disabled.

---

**Continue the tutorial**: [Basics 2, Blockchain Events and User Interface »](basics-2-events-and-ui)

_Find more help and documentation in the [Nimiq Developer Center](https://nimiq.com/developers/).
Share your ideas and feedback on the [Nimiq Community Forum](https://forum.nimiq.community),
you'll also find a dedicated section for [discussions and ideas](https://forum.nimiq.community/c/documentation/drafts).
Or get in touch at [sven@nimiq.com](mailto:sven@nimiq.com)._
