# Nano Client 1: Basics 1

**Goal**: To build a minimal app that connects to the Nimiq network and establishes consensus.

_[» Skip tutorial and see the code](playground.html#nano-client-1-basics-demo.html)._

It's a good idea to open the [source code](playground.html#basic-client.html)
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
        // Our code will live here
    </script>
    </head>
<body>
    <h1>Nimiq Demo App</h1>
</body>
</html>
```

And add a script that will start the Nimiq Nano Client when the page is loaded:

```js
function start() {
    Nimiq.start(async function() {
        // the code below will go here
    }
}

window.onload = start;
```

Inside this function:

1) We're going to configure Nimiq to use the Testnet.
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

Great, let's add some UI to see what's happening behind the scenes.

## User Interface

Make a spot in the HTML to print out the status messages.

```html
<body>
    <h1>Nimiq Demo App</h1>
    <div id="message"></div>
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
function start() {
    Nimiq.init(async function() {
        status('Nimiq loaded. Connecting...');           // <=

        // Code from 'Getting started'
        Nimiq.GenesisConfig.test();
        const consensus = await Nimiq.Consensus.nano();
        consensus.network.connect();

        status('Syncing and establishing consensus...');  // <=

        // Using "on()" will be explained in the next tutorial
        consensus.on('established', () => status('Consensus established'));
    });
};
```

**The Nano Client is set up! It connected, synced with the network, and established consensus!**

## Next Steps

**Your turn!** Follow the link below to see the prototype in action and mess around with it.
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
