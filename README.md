# Nimiq Ecosystem

Using Nimiq APIs and libraries can turn your projects and apps into payment systems and shops
where users can pay comfortably with NIM directly from their browser.

The goal of this documentation is to get you started integrating Nimiq in your project.

[//]: Sven (add checkout plugin)
[//]: Sven (add cashlink js lib)
[//]: Sven (secondary: add nimiq style)
[//]: Sven (secondary: add wallet file format)

- [Nimiq Accounts Manager](accounts): Enable users of your project to use their Nimiq Accounts.

## Tech
The Nimiq front-ends are build with TypeScript ? and CSS 3 on Vue.js 2.x and delivered compiled to ES2015. The Front-ends are tested for Firefox 62+, Chrome/Chromium 69+, and Safari ?.
We chose TypeScript as it provides a) type safety which is good for

## Terminology
Nimiq is aiming for mainstream adoption and thus strives to use laymen terms for all UIs.
If you plan to build apps using Nimiq, becoming part of the Nimiq ecosystem,
we recommend you using the same terms for optimal usability.

While using layman terms in the UI, the code uses terms that are typical for the crypto space.
The following map will give you an idea which term to use when.
See the “Terminology” section in the [FAQs on nimiq.com](nimiq.com/#faq) for details on each term.

| Layman term                                    | API term | Terms in code
|------------------------------------------------|----------|---
| Nimiq Account Number <br> _NQXX XXXX XXXX ..._ | address  | _core code_: userFriendlyAddress <br> _front-end_: humanReadableAddress
| Nimiq Account <br> _address + label_           | account  | account
| Nimiq Wallet <br> _with one or more accounts_  | walletId | keyId or loginId
| Account Recovery Words <br> _24 words_         | n/a      | mnemonicPhrase


## Improve This Documentation
If you want to work on this documentation,
start by getting the source code from Github and set up you machine to build GitHub pages.

### Get Source Code
```bash
git clone git@github.com:nimiq/nimiq.github.io.git nimiq --recursive
```

Note: You might need to
[add a ssh key to your github Account](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/).
Even if you try to clone with https, it can happen that git will use ssh for the submodules.

### Build Documentation Locally
To build jekyll sites locally on fedora:

First, install all pre-requisits (will skip what is installed already):
```bash
sudo dnf install ruby ruby-devel make gcc redhat-rpm-config zlib-devel
```

Then, follow [this guide](https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/) but skip step 3.

### Modify Refered Repositories
The documentation structure makes use of Git submodules, i.e. including source code from other repositories.

#### Update Modules
```bash
cd nimiq
git submodule foreach --recursive git pull
```

#### Fetch New Modules
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
