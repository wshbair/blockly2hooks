_(This is a stub of the documentation to create new Ardublockly blocks)_


# Create Ardublockly Blocks
One of the advantages of using Google's Blockly for the visual blocks framework is the simplicity to create new
blocks capable to generate Arduino code. All the code is done in JavaScript and you can be even use Blockly itself
to auto-generate some of the code.

The process is divided in three steps:

* **Define the block:** This includes its shape, connections, fields, etc
* **Create code generator:** To generate the Arduino code based for the new block
* **Block inclusion:** Add the block into the Ardublockly toolbox


## Block Definition
_(A proper description still need to be included here, each line needs to be expanded into a proper paragraph)_

The blocks are defined in a JavaScript.

You can have a look at the current blocks in the `blockly/blocks/arduino` directory.

One good starting point is to go through the official Blockly documentation: [Blockly's Define Blocks Documentation](https://developers.google.com/blockly/guides/create-custom-blocks/define-blocks)

You can use [Blockly Factory](https://blockly-demo.appspot.com/static/demos/blockfactory/index.html) to generate
a lot of this code for you.


## Arduino Code Generator
_(A proper description still need to be included here, each line needs to be expanded into a proper paragraph)_

The Arduino code gener is defined in a JavaScript.

You can have a look at the current blocks in the `blockly/generators/arduino` directory.

One good starting point is to go through the official Blockly documentation: [Blockly's Generating Code Documentation](https://developers.google.com/blockly/guides/create-custom-blocks/overview)

For Arduino specific functionality I am currently working on an API to be able to easily extend the Ardublockly
functionality to take advantage of board settings, pins, static typing, etc.
For now a very crude version of the documentation can be found in the
[Extending-Ardublockly](Create-Blocks-~-Extending-Ardublockly) page.


## Block Inclusion
_(A proper description still need to be included here, each line needs to be expanded into a proper paragraph)_

The first you need to find out is if you are running the compressed or uncompressed version of Blockly.
During development it is highly recommendable to run Blockly uncompressed, the instructions to do so can be found
here: [Run Uncompressed Blockly](Runninng-Uncompressed-Ardublockly)

If you are running the compressed version you will have to build blockly first. _(Instruction should go here, or in the build page with a link here)_

To include the block in the toolbox include the XML code into the `ardublockly/ardublockly_toolbox.js` file.