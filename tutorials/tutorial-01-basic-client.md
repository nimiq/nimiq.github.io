# Basics 1: Nano Client

_[Skip tutorial and see the code](https://jsbin.com/babucur/edit)._

**Goal**: build a minimal app that connects to the Nimiq network and establishes consensus.

At any time, feel free to open the [source code on JS Bin](https://jsbin.com/babucur/edit) to modify, play, and see how it all fits together.
Or [just run it](../demo/basic-client.html) in your browser.
This example can be used as a base for building Nimiq-enabled apps.

## Getting started

As the foundation, create a simple HTML page with the Nimiq library:

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

Add a script that will start the Nimiq Nano Client when the page is loaded:

```js
function start() {
    Nimiq.start(async function() {
        ...
    }
}

window.onload = start;
```

Inside this function:

1) We're going to configure Nimiq to use the Testnet.
   That's a good choice for playing and testing.

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

This code is all that's needed to get a client connected to the network!

Great, let's add some UI to see what's happening behind the scenes.

## Adding visual feedback

Add a spot to print out status messages.

```html
<body>
    <div id="message">loading...</div>
</body>
```

Add a function to put the word out.

```js
function status(text) {
    document.getElementById('message').textContent = text;
}
```

And then use it in the code.

```js
function start() {
    Nimiq.init(async function() {
        status('Nimiq loaded. Connecting...');

        // Code from 'Getting started'
        Nimiq.GenesisConfig.test();
        const consensus = await Nimiq.Consensus.nano();
        consensus.network.connect();

        status('Syncing and establishing consensus...');

        // We will explain consensus.on() in Tutorial 2
        consensus.on('established', () => status('Consensus established'));
    });
};
```

**The Nano Client is set up! It connected, synced with the network, and established consensus!**

## Next Steps
Your turn! The link below gives you a chance to see the prototype in action and mess around with it.

To see the log output from the Nano Client, open the dev tools in your browser (press F12).
Some lines will be red and similar to
`Can’t establish a connection to the server at ws://pool.nimiq-testnet.com:8443/`.
Nothing's broken here.
It simply means your client tried to connect to a node and that connection failed.
That's normal in the peer-to-peer blockchain world.

After a while, you should see
`BaseConsensus: Synced with all connected peers, consensus established`.

[> See the prototype in action and modify it](https://jsbin.com/babucur/edit)

**Welcome to the Nimiq Blockchain!** :)

If even after a long time the client can not establish consensus, something went wrong. Check your Internet connection and try to disable your browser's adblocker.

---

Continue the tutorial: [Basics 2, Nimiq Style UI &raquo;](tutorial-basics-3-tx)
