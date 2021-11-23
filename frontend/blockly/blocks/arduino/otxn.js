/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Originating transaction functions
 *     https://xrpl-hooks.readme.io/reference/hook
 *     ToDo add proper Type check
 */

 'use strict';

goog.provide('Blockly.Blocks.otxn'); 
goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

 //Get the burden of the originating transaction
 Blockly.Blocks['otxn_burden'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("otxn_burden");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(315);
      this.setTooltip('Get the burden of the originating transaction');
      this.setHelpUrl('');
    }
  };

  //Serialize and output a field from the originating transaction
  Blockly.Blocks['otxn_field'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("otxn_field");
      this.appendValueInput("write_ptr")
          .setCheck(null)
          .appendField("write_ptr");
      this.appendValueInput("field_id")
          .setCheck(null)
          .appendField("field_id");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(315);
      this.setTooltip('Serialize and output a field from the originating transaction');
      this.setHelpUrl('');
    }
  };

  //Output a field from the originating transaction as a human readable string
  Blockly.Blocks['otxn_field_txt'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("otxn_field_txt");
      this.appendValueInput("write_ptr")
          .setCheck(null)
          .appendField("write_ptr");
      this.appendValueInput("write_len")
          .setCheck(null)
          .appendField("write_len");
      this.appendValueInput("field_id")
          .setCheck(null)
          .appendField("field_id");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(315);
      this.setTooltip('Output a field from the originating transaction as a human readable string');
      this.setHelpUrl('');
    }
  };

  //Get the generation of the originating transaction
  Blockly.Blocks['otxn_generation'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("otxn_generation");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(315);
      this.setTooltip('Get the generation of the originating transaction');
      this.setHelpUrl('');
    }
  };
  
  //Get the Transaction Type of the originating transaction
  Blockly.Blocks['otxn_type'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("otxn_type");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(315);
      this.setTooltip('Get the Transaction Type of the originating transaction');
      this.setHelpUrl('');
    }
  };

  //Output the canonical hash of the originating transaction
  Blockly.Blocks['otxn_id'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("otxn_id");
      this.appendValueInput("write_ptr")
          .setCheck(null)
          .appendField("write_ptr");
      this.appendValueInput("write_len")
          .setCheck(null)
          .appendField("write_len");
      this.setInputsInline(false);
      this.setOutput(true, null);
      this.setColour(315);
      this.setTooltip('Output the canonical hash of the originating transaction');
      this.setHelpUrl('');
    }
  };

  //Load the originating transaction into a slot
  Blockly.Blocks['otxn_slot'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("otxn_id");
      this.appendValueInput("slot_no")
          .setCheck(null)
          .appendField("slot_no");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(315);
      this.setTooltip('Load the originating transaction into a slot');
      this.setHelpUrl('');
    }
  };

  