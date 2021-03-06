# Tech Inside

While working with Nimiq's libraries, you can rely on ES2015 compliance.
But when looking inside, you'll find we use Vue.js and TypeScript.

## Why Vue.js

Following a period of research, we have decided to use Vue.js for our upcoming front-ends.
React was another consideration due to its larger market share,
but Vue.js ended up convincing us for the following reasons:

- Clean separation of code and markup
- Open source governance, no dependence on a company
- Shorter learning curve
- Focused on simplicity: better presets, less configuration
- Smaller file size
- Support for calculated and cached values on top of state values

## Why TypeScript

We have been using type JSDoc annotations in JavaScript in the Nimiq Core as well as in the Keyguard for a long time.
These annotations where then checked and thus we had a situation very similar to using TypeScript.
So it was just a logical step to start using TypeScript directly. it's boosting our productivity.
