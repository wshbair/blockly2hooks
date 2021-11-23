/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Serialization functions
 *     https://xrpl-hooks.readme.io/reference/hook
 *     ToDo add proper Type check
 */

 'use strict';

goog.provide('Blockly.Blocks.serialization'); 
goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

 
 /** Common HSV hue for all blocks in this category. */
 Blockly.Blocks.serialization.HUE = 195;
 
 //Index into a xrpld serialized object and return the location and length of a subfield
 Blockly.Blocks['sto_subfield'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("sto_subfield");
      this.appendValueInput("read_ptr")
          .setCheck(null)
          .appendField("read_ptr");
      this.appendValueInput("read_len")
          .setCheck(null)
          .appendField("read_len");
      this.appendValueInput("field_id")
          .setCheck(null)
          .appendField("field_id");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(Blockly.Blocks.serialization.HUE);
      this.setTooltip('Index into a xrpld serialized object and return the location and length of a subfield');
      this.setHelpUrl('');
    }
  };

  //Index into a xrpld serialized array and return the location and length of an index
  Blockly.Blocks['sto_subarray'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("sto_subarray");
      this.appendValueInput("read_ptr")
          .setCheck(null)
          .appendField("read_ptr");
      this.appendValueInput("read_len")
          .setCheck(null)
          .appendField("read_len");
      this.appendValueInput("array_id")
          .setCheck(null)
          .appendField("array_id");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(Blockly.Blocks.serialization.HUE);
      this.setTooltip('Index into a xrpld serialized array and return the location and length of an index');
      this.setHelpUrl('');
    }
  };
//Emplace a field into an existing STObject at its canonical placement
  Blockly.Blocks['sto_emplace'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("sto_emplace");
      this.appendValueInput("write_ptr")
          .setCheck(null)
          .appendField("write_ptr");
      this.appendValueInput("write_len")
          .setCheck(null)
          .appendField("write_len");
      this.appendValueInput("sread_ptr")
          .setCheck(null)
          .appendField("sread_ptr");
      this.appendValueInput("sread_len")
          .setCheck(null)
          .appendField("sread_len");
      this.appendValueInput("fread_ptr")
          .setCheck(null)
          .appendField("fread_ptr");
      this.appendValueInput("fread_len")
          .setCheck(null)
          .appendField("fread_len");
      this.appendValueInput("field_id")
          .setCheck(null)
          .appendField("field_id");
      this.setInputsInline(false);
      this.setOutput(true, null);
      this.setColour(Blockly.Blocks.serialization.HUE);
      this.setTooltip('Emplace a field into an existing STObject at its canonical placement');
      this.setHelpUrl('');
    }
  };

  //Remove a field from an STObject
  Blockly.Blocks['sto_erase'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("sto_erase");
      this.appendValueInput("write_ptr")
          .setCheck(null)
          .appendField("write_ptr");
      this.appendValueInput("write_len")
          .setCheck(null)
          .appendField("write_len");
      this.appendValueInput("read_ptr")
          .setCheck(null)
          .appendField("read_ptr");
      this.appendValueInput("read_len")
          .setCheck(null)
          .appendField("read_len");
      this.appendValueInput("field_id")
          .setCheck(null)
          .appendField("field_id");
      this.setInputsInline(false);
      this.setOutput(true, null);
      this.setColour(Blockly.Blocks.serialization.HUE);
      this.setTooltip('Remove a field from an STObject');
      this.setHelpUrl('');
    }
  };

  //Validate an STObject
  Blockly.Blocks['sto_validate'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("sto_validate");
      this.appendValueInput("read_ptr")
          .setCheck(null)
          .appendField("read_ptr");
      this.appendValueInput("read_len")
          .setCheck(null)
          .appendField("read_len");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(Blockly.Blocks.serialization.HUE);
      this.setTooltip('Validate an STObject');
      this.setHelpUrl('');
    }
  };