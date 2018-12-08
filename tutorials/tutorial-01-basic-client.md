# Basics 1: Nano Client

_TL;DR? [Run it on JS Bin](https://jsbin.com/babucur/edit) (press F12)._

Goal: build a minimal app that connects to the Nimiq network and establishes consensus

Open the [source code](https://jsbin.com/babucur/edit) to modify, play, and see how it all fits together.
Or [just run it](../demo/basic-client.html) in your browser.
This example can be used as base for building Nimiq-enabled apps.

## Getting started

First, a simple HTML page and with the Nimiq library.

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

Run a script when the page is loaded to start the Nimiq Nano Client.

```js
function start() {
    Nimiq.start(async function() {
        ...
    }

window.onload = start;
}
```

Configure Nimiq to use the Testnet.
That's a good choice for playing and testing.
To switch to Mainnet when the app is ready, replace this line with`Nimiq.GenesisConfig.main()`.

```js
        Nimiq.GenesisConfig.test();
```

The consensus is the client to the network.

```js
        const consensus = await Nimiq.Consensus.nano();
```

And finally connect.

```js
        consensus.network.connect();
```

This code is all that's needed to get a client connected to the network!

## User feedback

Great, but let's add some UI to see what's happening&hellip;

A spot to print out status messages.

```html
<body>
    <div id="message">loading...</div>
</body>
```

And a function to put out the word.

```js
function status(text) {
    document.getElementById('message').innerText = text;
}
```

And then use it in the code.

```js
function start() {
    Nimiq.init(async function() {
        status('Nimiq loaded. Connecting and establishing consensus...');

        ...

        status('Connected. Establishing consensus...');

        consensus.on('established', () => status('Consensus established'));
    });
};
```

## Next Steps
Your turn! The link below gives you a chance to see it action and mess with it.

Open the dev tools to see the logs from the Nano Client.
Some will be red and similar to
`Firefox can’t establish a connection to the server at ws://pool.nimiq-testnet.com:8443/`.
Nothing is broken.
It simply means the client tried to connect to a node and that connection failed for some reason.
It's normal.

Finally, you should see
`BaseConsensus: Synced with all connected peers, consensus established`.

**Welcome to the Nimiq Blockchain!** :)

If even after a long time the client can not establish consensus, something might be wrong with your Internet connection.
Check if you're online.

[> See it in action](https://jsbin.com/babucur/edit)

---

[Next: Basics 2, Nimiq Style UI &raquo;](tutorial-basics-3-tx)
