# Nimiq Checkout

_TL;DR? [Run the demo](playground.html#nimiq-checkout-demo.html)._

In this tutorial we're going to implement a simple online shop for ice cream &mdash; 'cause we all love ice cream! &mdash; and the best part: you can pay with NIM!
You will see how easy it is to add Nimiq Payments with the [Nimiq Hub API](https://github.com/nimiq/hub).

The little [demo webapp](playground.html#nimiq-checkout-demo.html) is using the [Nimiq Style](https://github.com/nimiq/nimiq-style) &mdash;
some basics are explained in
[this part](https://nimiq.github.io/tutorials/basics-2-events-and-ui#making-it-beautiful-with-nimiq-style)
of another tutorial &mdash; but it's not important to undertand how Nimiq Checkout works.

## HTML

After setting up a basic HTML5 page, we'll load the Nimiq Hub API by adding to the `head` section:

```html
<head>
    ...
    <script
        src="https://cdn.jsdelivr.net/npm/@nimiq/hub-api@v1.0/dist/standalone/HubApi.standalone.umd.js"
        integrity="sha256-HZuohwzM5nRdRQh3HLpAcYGbpNe6PtqZRyK+VvUI+nU=" crossorigin="anonymous"></script>
</head>
```

The `integrity` property has the SHA256 fingerprint (or checksum) of the original file &mdash;
with this line, the browser will make sure that the file loaded matches the original one,
so you're safe from any evil hacker trying to serve a malicious version of the Nimiq Hub API.
If you upgrade to a newer version, make sure to also update the fingerprint.

In the [demo](playground.html#nimiq-checkout-demo.html),
you'll see all the additional parts that will show pictures and make it look nice,
but the essential next item is a button to buy our ice cream:

```html
<button id="checkout">
    I want to buy an ice cream!
</button>
```

Followed by some JavaScript tying it all together&hellip;

## JavaScript

First, initialize the Nimiq Hub API:

```javascript
const hubApi = new HubApi('https://hub.nimiq-testnet.com');
...
```

With this line, the checkout later on will take place on the Nimiq Testnet - so no real NIM are lost.
Once your webapp is tested and all good, switch to Mainnet by replacing
`nimiq-testnet.com` with `nimiq.com`.

Next, we configure the checkout and set our price for the ice cream we're going to sell:

```javascript
...
const options = {
    appName: 'My Ice Cream Shop',
    recipient: 'NQ07 0000 0000 0000 0000 0000 0000 0000 0000',
    value: 3.14 * 1e5, // 3.14 NIM
    fee: 0,
    shopLogoUrl: `${location.origin}/tutorials/resources/ice-cream-thumb.jpg`,
};
...
```

Line by line:
the name of you shop,
the address you want to receive your NIM at,
the price in Luna &mdash; by adding the `* 1e5` it will be converted to NIM,
0 fee,
and as the final touch, an image for the user to recognize the shop during checkout.
Note: the image should fit a square of 146 x 146 pixels.

And now let's wire it up:

```javascript
...
document.getElementById('checkout').addEventListener('click', async function (event) {
    const signedTransaction = await hubApi.checkout(options);
});
```

The first line will fetch out button by it's ID `checkout` and wait for a click on it.
Once clicked, we'll just call the Hub's `checkout` method with our configuration.
That's it, basically. :)
The call returns the signed transaction,
but the checkout itself will take care of sending the transaction out to the network for you.

In case something goes wrong, the call to `checkout` should be wrapped in a `try/catch` block.
You'll see how that works in the [demo](playground.html#nimiq-checkout-demo.html).

Some ideas to where to go from here:

* Add more UI, a cart maybe?
* Store the transaction information for later?
* If it's an online shop, get the users address to send the ice cream to. Yep, better send it quick. ;)
* Checkout [Gie's Nimipay](https://nimipay.com/), it comes with a basic UI and cart.

---

Find more help and documentation in the [Nimiq Developer Center](https://nimiq.com/developers/).
To share your ideas and feedback on the [Forum](https://forum.nimiq.community),
you'll also find a dedicated section for [new tutorials and ideas](https://forum.nimiq.community/c/documentation/drafts).
Or get in touch at [sven@nimiq.com](mailto:sven@nimiq.com).
