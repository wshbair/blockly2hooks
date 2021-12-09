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

goog.provide('Blockly.Blocks.slot'); 
goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

 
/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.slot.HUE = 150;

//Serialize and output a slotted object
Blockly.Blocks['slot'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("slot");
      this.appendValueInput("write_ptr")
          .setCheck(null)
          .appendField("write_ptr");
      this.appendValueInput("write_len")
          .setCheck(null)
          .appendField("write_len");
      this.appendValueInput("slot_no")
          .setCheck(null)
          .appendField("slot_no");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(345);
      this.setTooltip('Serialize and output a slotted object');
      this.setHelpUrl('');
    }
  };
  //Free up a currently occupied slot
  Blockly.Blocks['slot_clear'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("slot_clear");
      this.appendValueInput("slot_no")
          .setCheck(null)
          .appendField("slot_no");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(345);
      this.setTooltip('Free up a currently occupied slot');
      this.setHelpUrl('');
    }
  };
  //Count the elements of an array object in a slot
  Blockly.Blocks['slot_count'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("slot_count");
      this.appendValueInput("slot_no")
          .setCheck(null)
          .appendField("slot_no");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(345);
      this.setTooltip('Count the elements of an array object in a slot');
      this.setHelpUrl('');
    }
  };
  //Compute the canonical hash of the slotted object and return it
  Blockly.Blocks['slot_id'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("slot_id");
      this.appendValueInput("write_ptr")
          .setCheck(null)
          .appendField("write_ptr");
      this.appendValueInput("write_len")
          .setCheck(null)
          .appendField("write_len");
      this.appendValueInput("slot_no")
          .setCheck(null)
          .appendField("slot_no");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(345);
      this.setTooltip('Compute the canonical hash of the slotted object and return it');
      this.setHelpUrl('');
    }
  };
  //Locate an object based on its keylet and place it into a slot
  Blockly.Blocks['slot_set'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("slot_set");
      this.appendValueInput("read_ptr")
          .setCheck(null)
          .appendField("read_ptr");
      this.appendValueInput("read_len")
          .setCheck(null)
          .appendField("read_len");
      this.appendValueInput("slot_no")
          .setCheck(null)
          .appendField("slot_no");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(345);
      this.setTooltip('Locate an object based on its keylet and place it into a slot');
      this.setHelpUrl('');
    }
  };
  //Compute the serialized size of an object in a slot
  Blockly.Blocks['slot_size'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("slot_size");
      this.appendValueInput("slot_no")
          .setCheck(null)
          .appendField("slot_no");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(345);
      this.setTooltip('Compute the serialized size of an object in a slot');
      this.setHelpUrl('');
    }
  };
//Index into a slotted array and assign a sub-object to another slot
Blockly.Blocks['slot_subarray'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("slot_subarray");
    this.appendValueInput("parent_slot")
        .setCheck(null)
        .appendField("parent_slot");
    this.appendValueInput("array_id")
        .setCheck(null)
        .appendField("array_id");
    this.appendValueInput("new_slot")
        .setCheck(null)
        .appendField("new_slot");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(345);
    this.setTooltip('Index into a slotted array and assign a sub-object to another slot');
    this.setHelpUrl('');
  }
};

//Index into a slotted object and assign a sub-object to another slot
Blockly.Blocks['slot_subfield'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("slot_subarray");
      this.appendValueInput("parent_slot")
          .setCheck(null)
          .appendField("parent_slot");
      this.appendValueInput("field_id")
          .setCheck(null)
          .appendField("field_id");
      this.appendValueInput("new_slot")
          .setCheck(null)
          .appendField("new_slot");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(345);
      this.setTooltip('Index into a slotted object and assign a sub-object to another slot');
      this.setHelpUrl('');
    }
  };

//Retrieve the field code of an object in a slot and, optionally, some other information
Blockly.Blocks['slot_type'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("slot_type");
      this.appendValueInput("slot_no")
          .setCheck(null)
          .appendField("slot_no");
      this.appendValueInput("flags")
          .setCheck(null)
          .appendField("flags");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(345);
      this.setTooltip('Retrieve the field code of an object in a slot and, optionally, some other information');
      this.setHelpUrl('');
    }
  };

//Parse the STI_AMOUNT in the specified slot and return it as an XFL enclosed number
Blockly.Blocks['slot_float'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("slot_float");
      this.appendValueInput("slot_no")
          .setCheck(null)
          .appendField("slot_no");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(345);
      this.setTooltip('Parse the STI_AMOUNT in the specified slot and return it as an XFL enclosed number');
      this.setHelpUrl('');
    }
  };