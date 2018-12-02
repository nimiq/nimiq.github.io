# Nimiq Ecosystem

By using Nimiq APIs and libraries you can
- extend your projects, websites, and apps with a payment system; and
- allow customers of your online shop to pay comfortably with NIM directly from their browser; or
- build apps and services enriching the Nimiq apps ecosystem.

The goal of this documentation is to get you started integrating Nimiq into your project.

[//]: Sven (add checkout plugin)
[//]: Sven (add cashlink js lib)
[//]: Sven (secondary: add nimiq style)
[//]: Sven (secondary: add wallet file format)

## Content
- [Nimiq Accounts Manager](accounts):
  Enable users of your project to use their Nimiq Accounts to pay, for transactions, and more.
- [Nimiq Style](style) ([demo](style/index.html)):
  CSS framework defining UI look and feel.
- [Nimiq Vue.js Components](vue-components):
  Reusable Vue.js components to build Nimiq-enabled websites and webapps.

## Tech

[//]: Soeren (what version of TS, CSS, Vue do we official support/require?)
[//]: Soeren (confirm ES2015 - had a look at tsconfig, but not sure)
[//]: Soeren (I use Chromium, somebody else? Is it offical?)
[//]: Soeren (More browsers? Add versions?)

The Nimiq front-ends are build with
[TypeScript 3](https://www.typescriptlang.org/) and CSS on [Vue.js](https://vuejs.org/)
and delivered compiled to ES2015.
The Front-ends are tested on latest versions of Firefox, Chrome/Chromium, and Safari.

[//]: Sven (Paragraph on why TypeScript)
[//]: Sven (Paragraph on why Vue.js)

## Terminology

Nimiq is aiming for mainstream adoption and thus strives to use laymen terms for all UIs.
Building apps using Nimiq APIs and libraries means becoming part of the Nimiq Ecosystem.
For optimal usability and a pleasant user experience for your users,
we highly recommend using the same terminology for all user facing parts.

While using layman terms in the UI, within the code, typical terms of the crypto space are being used.
The following map will give you an idea which term to use when.
See the “Terminology” section in the [FAQs on nimiq.com](nimiq.com/#faq) for more details on each term.

| Layman term (for UI use)                       | API term | Term in code
|------------------------------------------------|----------|---
| Nimiq Account Number <br> _NQXX XXXX XXXX ..._ | address  | _core code_: userFriendlyAddress <br> _front-end_: humanReadableAddress
| Nimiq Account <br> _address + label_           | account  | account
| Nimiq Wallet <br> _with one or more accounts_  | walletId | keyId or loginId
| Account Recovery Words <br> _24 words_         | n/a      | mnemonicPhrase

## Improve This Documentation

**Great idea! Welcome on board!**
If it's rather a smaller issue your after
&mdash;such as wording, typos, or adding a few lines&mdash;
use the little pen icon in the lower right.
GitHub will help you to fork the repository, do the changes,
and finally start a pull request so that your changes can be reviewed and merged in.

If you have bigger plans, a good starting point is to
[summit an issue](https://github.com/nimiq/nimiq.github.io/issues).
This way, the team as well as community members can contribute to the idea, collect facts, and give advice.
Once some communication has happened and it's clear what should be done to improve the documentation,
go ahead and get the source code from Github and set up you machine to build GitHub pages as described below

### Get Source Code

```bash
git clone git@github.com:nimiq/nimiq.github.io.git nimiq --recursive
```

Note: If you experience issues during this step, make sure you have
[an SSH key set up for your GitHub account](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/).
Even if you clone the repository using HTTPS, submodules might require SSH.

### Build Documentation Locally

Please refer to the [Doc-Theme documentation](meta/doc-theme/#installation).

### Modify Refered Repositories

The documentation structure makes use of Git submodules, i.e. including source code from other repositories.

#### Update Modules

```bash
cd nimiq
git submodule foreach --recursive git pull
```

#### Fetch new Modules

```bash
cd nimiq
git pull
git submodule sync
git submodule update --recursive --remote
git submodule foreach --recursive git checkout master
```

#### Add a Submodule

```bash
cd nimiq
git submodule add -b <branch> <repository> [<submodule-path>]
```
For example:
```bash
git submodule add -b master ../x-element.git libraries/x-element/
```

#### Remove a Submodule

```bash
cd nimiq
git submodule deinit <submodule-path>
rm -rf .git/module/<submodule-path>
```
