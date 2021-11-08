/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Slot functions
 *     https://xrpl-hooks.readme.io/reference/hook
 *     ToDo add proper Type check
 */

 'use strict';

goog.provide('Blockly.Blocks.state'); 
goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

//Retrieve the data pointed to by a Hook State key and write it to an output buffer 
Blockly.Blocks['state'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("state");
      this.appendValueInput("write_ptr")
          .setCheck(null)
          .appendField("write_ptr");
      this.appendValueInput("write_len")
          .setCheck(null)
          .appendField("write_len");
      this.appendValueInput("kread_ptr")
          .setCheck(null)
          .appendField("kread_ptr");
      this.appendValueInput("kread_len")
          .setCheck(null)
          .appendField("kread_len");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(54);
      this.setTooltip('Retrieve the data pointed to by a Hook State key and write it to an output buffer');
      this.setHelpUrl('http://www.example.com/');
    }
  };
//Set the Hook State for a given key and value
Blockly.Blocks['state_set'] = {
init: function() {
    this.appendDummyInput()
        .appendField("state");
    this.appendValueInput("read_ptr")
        .setCheck(null)
        .appendField("read_ptr");
    this.appendValueInput("read_len")
        .setCheck(null)
        .appendField("read_len");
    this.appendValueInput("kread_ptr")
        .setCheck(null)
        .appendField("kread_ptr");
    this.appendValueInput("kread_len")
        .setCheck(null)
        .appendField("kread_len");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(54);
    this.setTooltip('Set the Hook State for a given key and value');
    this.setHelpUrl('http://www.example.com/');
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
      this.appendValueInput("write_len")
          .setCheck(null)
          .appendField("write_len");
      this.appendValueInput("kread_ptr")
          .setCheck(null)
          .appendField("kread_ptr");
      this.appendValueInput("kread_len")
          .setCheck(null)
          .appendField("kread_len");
      this.appendValueInput("aread_ptr")
          .setCheck(null)
          .appendField("aread_ptr");
      this.appendValueInput("aread_len")
          .setCheck(null)
          .appendField("aread_len");
      this.setInputsInline(false);
      this.setOutput(true, null);
      this.setColour(54);
      this.setTooltip('Retrieve the data pointed to, on another account, by a Hook State key and write it to an output buffer');
      this.setHelpUrl('http://www.example.com/');
    }
  };