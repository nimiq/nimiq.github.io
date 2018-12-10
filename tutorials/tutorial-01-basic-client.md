# Basics 1: Nano Client

_Skip tutorial and see [the code](https://jsbin.com/babucur/edit)._

**Goal**: build a minimal app that connects to the Nimiq network and establishes consensus.

At any time, feel free to open the [source code on JS Bin](https://jsbin.com/babucur/edit) to modify, play, and see how it all fits together.
Or [just run it](../demo/basic-client.html) in your browser.
This example can be used as base for building Nimiq-enabled apps.

## Getting started

The foundation, a simple HTML page and with the Nimiq library:

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

Adding a script that will start the Nimiq Nano Client when the page is loaded:

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
To switch to Mainnet when the app is ready, replace this line with `Nimiq.GenesisConfig.main()`.

```js
Nimiq.GenesisConfig.test();
```

2) The prepare the nano consensus which will be our client to the network.

```js
const consensus = await Nimiq.Consensus.nano();
```

3) And finally connect.

```js
consensus.network.connect();
```

This code is all that's needed to get a client connected to the network!

Great, but let's add some UI to see what's happening&hellip;

## Adding user feedback


Add a spot to print out status messages.

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

        // ... test(), nano(), connect() ...

        status('Connected. Establishing consensus...');

        consensus.on('established', () => status('Consensus established'));
    });
};
```

**The Nano Client is set up, it connected and synced with the network and established consensus!**

## Next Steps
Your turn! The link below gives you a chance to see the prototype in action and mess with it.

Open the dev tools (press F12) to see the logs from the Nano Client.
Some will be red and similar to
`Can’t establish a connection to the server at ws://pool.nimiq-testnet.com:8443/`.
Nothing broken here.
It simply means the client tried to connect to a node and that connection failed for some reason.
That's normal in a P2P world.

Finally, you should see
`BaseConsensus: Synced with all connected peers, consensus established`.

**Welcome to the Nimiq Blockchain!** :)

If even after a long time the client can not establish consensus, something went wrong. Check your Internet connection.

[> See the prototype in action and modify it](https://jsbin.com/babucur/edit)

---

Continue the tutorial: [Basics 2, Nimiq Style UI &raquo;](tutorial-basics-3-tx)
