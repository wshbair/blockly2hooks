/**
 * @fileoverview States functions
 *     https://xrpl-hooks.readme.io/reference/hook
 *     ToDo add proper Type check
 */

'use strict';

goog.provide('Blockly.Blocks.states'); 
goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

 /** Common HSV hue for all blocks in this category. */
 Blockly.Blocks.states.HUE = 210;

//Retrieve the data pointed to by a Hook State key and write it to an output buffer 
Blockly.Blocks['state'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("state");
      this.appendValueInput("write_ptr")
          .setCheck(null)
          .appendField("write_ptr");
      this.appendValueInput("kread_ptr")
          .setCheck(null)
          .appendField("kread_ptr");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(Blockly.Blocks.states.HUE);
      this.setTooltip('Retrieve the data pointed to by a Hook State key and write it to an output buffer');
      this.setHelpUrl('');
    }
  };
//Set the Hook State for a given key and value
Blockly.Blocks['state_set'] = {
init: function() {
    this.appendDummyInput()
        .appendField("state set");
    this.appendValueInput("read_ptr")
        .setCheck(null)
        .appendField("read_ptr");
    this.appendValueInput("kread_ptr")
        .setCheck(null)
        .appendField("kread_ptr");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(Blockly.Blocks.states.HUE);
    this.setTooltip('Set the Hook State for a given key and value');
    this.setHelpUrl('');
}
};
//Retrieve the data pointed to, on another account, by a Hook State key and write it to an output buffer
Blockly.Blocks['state_foreign'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("state_foreign");
      this.appendValueInput("write_ptr")
          .setCheck(null)
          .appendField("write_ptr");
      this.appendValueInput("kread_ptr")
          .setCheck(null)
          .appendField("kread_ptr");
      this.appendValueInput("aread_ptr")
          .setCheck(null)
          .appendField("aread_ptr");
      this.setInputsInline(false);
      this.setOutput(true, null);
      this.setColour(Blockly.Blocks.states.HUE);
      this.setTooltip('Retrieve the data pointed to, on another account, by a Hook State key and write it to an output buffer');
      this.setHelpUrl('');
    }
  };