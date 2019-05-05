# Nimiq UX

Legacy Root repository for all projects regarding the Nimiq UX. 

- [Libraries](/libraries) contains low-level javascript modules.
- [Elements](/elements) contains high-level UI components.
- [Apps](/apps) contains the Nimiq enduser applications.
- [Meta](/meta) contains all other projects such as doc or email templates.


## Getting Started

### Install
```bash
git clone git@github.com:nimiq/nimiq.github.io.git nimiq --recursive
```

Note: You might need to [add a ssh key to your github Account](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/). Even if you try to clone with https, it can happen that git will use ssh for the submodules.

Some of the legacy code has now been moved to private repositories. Thus, if you don't have access to these repositories, you'll not be able to checkout everything.

### Update Modules
```bash
cd nimiq
git submodule foreach --recursive git pull
```

### Fetch New Modules
```bash
cd nimiq
git pull
git submodule sync
git submodule update --recursive --remote
git submodule foreach --recursive git checkout master
```

### Add a Submodule
```bash
cd nimiq
git submodule add -b <branch> <repository> [<submodule-path>]
```
For example:
```bash
git submodule add -b master ../x-element.git libraries/x-element/
```


### Remove a Submodule
```bash
cd nimiq
# Remove the submodule from working tree and entry from .git/config
git submodule deinit <submodule-path>
# Remove the submodule directory from the superproject's .git/modules directory
rm -rf .git/module/<submodule-path>
# Remove the entry in .gitmodules
git rm <submodule-path>
``` 


