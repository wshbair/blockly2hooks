# Git Settings
This page lists the general git settings used to maintain this repository. Not everything described here needs to be configured for local development, but it might be useful to at least be aware of the general git work-flow used.

## Branches
There are 2 permanent branches used, any other branch would be a feature branch meant to be merged into master once it is finished.

### master branch
Where the latest working version of the Ardublockly source code resides.

### gh-pages branch
The project pages branch [http://carlosperate.github.io/ardublockly/](http://carlosperate.github.io/ardublockly/) contains a general project introduction page and an offers online accessibility to the Ardublockly front end web-based part of the application [http://carlosperate.github.io/ardublockly/demo/](http://carlosperate.github.io/ardublockly/demo/) (that redirects to [http://ardublockly.embeddedlog.com/demo/](http://ardublockly.embeddedlog.com/demo/)) .

```
[branch "gh-pages"]
	remote = origin
	merge = refs/heads/gh-pages
```

## Remotes
### blockly
The `blockly` remote points at the Google's Blockly repository, so that the latest updates can be pulled in.

You can add this remote repository using the following git command:

```
git remote add -f blockly https://github.com/google/blockly.git
```

Which should result in the following git configuration entry:

```
[remote "blockly"]
	url = https://github.com/google/blockly.git
	fetch = +refs/heads/*:refs/remotes/blockly/*
```

#### _Depreciated SVN upstream_ 
Originally the Blockly repository was hosted in Googlecode using Subversion. It has since moved to Github, so this part of the git configuration is not longer relevant.

```
[svn-remote "svn"]
	url = http://blockly.googlecode.com/svn/
	fetch = trunk:refs/remotes/trunk
	branches = branches/*:refs/remotes/*
	tags = tags/*:refs/remotes/tags/*
```


## Git Subtrees
There is a single subtree in this repository to contain a fork of Google's Blockly. This fork contains additional features, as part of Ardublockly, that need to be maintained.

Once the `blockly` remote is added, to pull the latest updates the following commands can be used from the project root directory:

```
git fetch blockly master
git subtree pull --prefix blockly blockly master
```


## Git Submodules
There are two submodules as part of this repository, the [Google's Closure library](https://github.com/google/closure-library/) and the [Ardublockly GitHub Wiki](https://github.com/carlosperate/ardublockly/wiki) repository.

To initialise the modules after a git clone the following command should be executed. From the project root directory:

```
git submodule update --init --recursive
```
