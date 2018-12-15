# Nano Client 1: Basics

**Goal**: Build a minimal app that connects to the Nimiq network and establishes consensus.

## About Blockchain

Nimiq is a payment protocol based on blockchain technology.
Blockchain technology is

* Cencorship resistant: nobody can keep you from using it
* Privacy oriented: you don't need to provide any personal information to open an account
* Decentralized: not controlled by a single person but by it's users

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
Thus "forcing" you to trust that third party, take [MyEtherWallet for example](https://kb.myetherwallet.com/networks/run-your-own-node-with-myetherwallet.html).
With Nimiq you can connect directly with what we call a nano client.
The concept is based on Ethereum's
[light client](https://github.com/ethereum/wiki/wiki/Light-client-protocol).
A nano client reaches consensus by just downloading a compressed form of the latest state of the blockchain
which is only abut 1MB but still enables the nano client to verify all information.
And that is what we're going to do!

The goal of this little demo is to connect to the network and reach consensus.

_[» Skip tutorial and experiment with the code](playground.html#nano-client-1-basics-demo.html)._

It's a good idea to [open the source code](playground.html#nano-client-1-basics-demo.html)
in parallel to see how it all fits together, but also to modify and play.
The example we'll be building here can be used for building Nimiq-enabled apps.

## Getting started

We start from a standard HTML 5 page importing the Nimiq library:

```HTML
<!DOCTYPE html>
<html>
<head>
    <meta charset=utf-8 />
    <title>Nimiq Demo App</title>
    <script type="text/javascript" src="https://cdn.nimiq.com/nimiq.js"></script>
    <script>
        // The code below will go here
    </script>
</head>
<body>
    <h1>Nimiq Demo App</h1>
</body>
</html>
```

Add a script that will start the Nimiq Nano Client when the page is loaded:

```js
async function start() {
    // The code below will go here
}

window.onload = () => Nimiq.init(start);
```

Inside this function:

1) We're going to configure Nimiq to use the testing network, known as "Testnet".
   That's a good choice for experimenting and testing.

   ```js
   Nimiq.GenesisConfig.test();
   ```

2) Then prepare the nano consensus which will be our client to the network.

   ```js
   const consensus = await Nimiq.Consensus.nano();
   ```

3) And finally connect.

   ```js
   consensus.network.connect();
   ```

**These three lines are all it needs to get a Nimiq client connected to the network!**

When you run this code, you'll notice it will take a moment to reach consensus.
Open the dev tools (F12) to see logs of the Nano Client to better understand what's going on under the hood.

Great, let's add some UI to see what's happening behind the scenes.

## User Interface

Add a `<div>` with an ID to print out the status messages like below:

```html
<body>
    <h1>Nimiq Demo App</h1>
    <div id="message"></div> <!-- this one -->
</body>
```

Add a function to put the word out.

```js
function status(text) {
    document.getElementById('message').textContent = text;
}
```

And then use it in your code.

```js
async function start() {
    status('Nimiq loaded. Connecting...');           // <= here

    // Code from 'Getting started'
    Nimiq.GenesisConfig.test();
    const consensus = await Nimiq.Consensus.nano();
    consensus.network.connect();

    status('Syncing and establishing consensus...');  // <= here and below

    // Using "on()" will be explained in the next tutorial
    consensus.on('established', () => status('Consensus established'));
};
```

**The Nano Client is set up! It connects, syncs with the network, and establishes consensus!**

## Next Steps

**Your turn!**

Follow the link below to see the prototype in action and mess around with it.
Open the dev tools in your browser (press F12) to see the full log output from the Nano Client.
Some lines will be in red and similar to
`Can’t establish a connection to the server at ws://some.address.com:8443/`.
No worry, nothing's broken here.
It simply means your client tried to connect to another node in the network and that connection failed.
That's normal in the peer-to-peer blockchain world.

After a while, you should see
`BaseConsensus: Synced with all connected peers, consensus established`.

**Welcome to the Nimiq Blockchain! :)**

[» See the prototype in action and modify it](playground.html#nano-client-1-basics-demo.html).

If even after a long time the client can not establish consensus, something went wrong.
Check your Internet connection and try disabling your browser's ad blocker.

---

Continue the tutorial: [Basics 2, Blockchain Events and User Interface »](nano-client-2-events-and-ui)
