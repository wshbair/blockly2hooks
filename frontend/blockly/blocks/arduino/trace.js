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

goog.provide('Blockly.Blocks.trace'); 
goog.require('Blockly.Blocks');
goog.require('Blockly.Types');


//Write the contents of a buffer to the XRPLD trace log
Blockly.Blocks['trace'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("trace");
      this.appendValueInput("mread_ptr")
          .setCheck(null)
          .appendField("mread_ptr");
      this.appendValueInput("mread_len")
          .setCheck(null)
          .appendField("mread_len");
      this.appendValueInput("dread_ptr")
          .setCheck(null)
          .appendField("dread_ptr");
      this.appendValueInput("dread_len")
          .setCheck(null)
          .appendField("dread_len");
      this.appendValueInput("as_hex")
          .setCheck(null)
          .appendField("as_hex");
      this.setInputsInline(false);
      this.setOutput(true, null);
      this.setColour(120);
      this.setTooltip('Write the contents of a buffer to the XRPLD trace log');
      this.setHelpUrl('http://www.example.com/');
    }
  };

  //Write the contents of a slot to the XRPLD trace log
  Blockly.Blocks['trace_slot'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("trace_slot");
      this.appendValueInput("mread_ptr")
          .setCheck(null)
          .appendField("mread_ptr");
      this.appendValueInput("mread_len")
          .setCheck(null)
          .appendField("mread_len");
      this.appendValueInput("slot_no")
          .setCheck(null)
          .appendField("slot_no");
      this.setInputsInline(false);
      this.setOutput(true, null);
      this.setColour(120);
      this.setTooltip('Write the contents of a slot to the XRPLD trace log');
      this.setHelpUrl('http://www.example.com/');
    }
  };

  //Write an integer to the XRPLD trace log
  Blockly.Blocks['trace_num'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("trace_num");
      this.appendValueInput("mread_ptr")
          .setCheck(null)
          .appendField("mread_ptr");
      this.appendValueInput("mread_len")
          .setCheck(null)
          .appendField("mread_len");
      this.appendValueInput("number")
          .setCheck(null)
          .appendField("number");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(120);
      this.setTooltip('Write an integer to the XRPLD trace log');
      this.setHelpUrl('http://www.example.com/');
    }
  };

  Blockly.Blocks['trace_float'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("trace_float");
      this.appendValueInput("mread_ptr")
          .setCheck(null)
          .appendField("mread_ptr");
      this.appendValueInput("mread_len")
          .setCheck(null)
          .appendField("mread_len");
      this.appendValueInput("float1")
          .setCheck(null)
          .appendField("float1");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(120);
      this.setTooltip('Write a XFL float to the XRPLD trace log');
      this.setHelpUrl('http://www.example.com/');
    }
  };

