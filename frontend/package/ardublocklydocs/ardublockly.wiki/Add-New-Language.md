# Adding a New Language to Ardublockly
_(Work in Progress: This page should describe how to add new languages to Ardublockly)_

While Blockly has been translated to a large number of languages using TranslateWiki (more info [here](https://developers.google.com/blockly/hacking/translating)), only a small subset of these translations has been expanded to cover the additional blocks and user interface text for Ardublockly. Ardublockly itself does not use TranslateWiki and to add a new language the JavaScript and JSON files have to be manually edited.

There are 3 main files related to the localisation, but only one needs to be updated to add a new language:

* `blockly/msg/messages.js`: This file defines all the strings (in English) used by Ardublockly. If you are only adding a new language, then it can be ignored as everything required will already be present.
Every time Blockly is built, the strings defined here are included in the `blockly/msg/<language>.js` JavaScript file, translated by the entries from the respective JSON file if they have been defined.

* `blockly/msg/json/<language>.json`: An existing file for your language should already exists in this directory. This JSON file contains the string name and its translation, but for unsupported languages it will not include the entries required by Ardublockly (only those for Blockly). This is the file that will need to be updated (more details below).

* `blockly/msg/<language>.js`: An existing file for your language should already exists in this directory. This file will be automatically generated and updated from the `blockly/msg/messages.js` and `blockly/msg/json/<language>.json` data when building Blockly, so this file should not be edited either.

## Translating the Ardublockly strings

_(Description on how to do this should go here)_


## Generating/Updating the language files
Once the translated entries have been added to the JSON file, Blockly needs to be built to convert them into strings in the respective JavaScript file. To do this, from the Ardublockly project folder on a terminal (make sure you are using Python 2):

```
cd blockly
python build.py
```

_(Mention that Blockly doesn't neccesarily have to be built and that just sending a PR with those two files should be fine)_

_(Mention that the front end js file can be updated to include the new language on the settings menu.)_

_(Indicate how to send a PR)_