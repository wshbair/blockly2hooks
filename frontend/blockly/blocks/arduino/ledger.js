/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Ledger functions
 *     https://xrpl-hooks.readme.io/reference/hook
 *     ToDo add proper Type check
 */

 'use strict';

goog.provide('Blockly.Blocks.ledger'); 
goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

Blockly.Blocks.ledger.HUE = 240;
//Retreive the 20 byte Account ID the Hook is executing on
Blockly.Blocks['hook_account'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("hook_account");
      this.appendValueInput("write_ptr")
          .setCheck(null)
          .appendField("write_ptr");
      this.appendValueInput("write_len")
          .setCheck(null)
          .appendField("write_len");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(Blockly.Blocks.ledger.HUE);
      this.setTooltip('Retreive the 20 byte Account ID the Hook is executing on');
      this.setHelpUrl('http://www.example.com/');
    }
  };
  //Retreive the 32 byte namespace biased SHA512H of the currently executing Hook
  Blockly.Blocks['hook_hash'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("hook_hash");
      this.appendValueInput("write_ptr")
          .setCheck(null)
          .appendField("write_ptr");
      this.appendValueInput("write_len")
          .setCheck(null)
          .appendField("write_len");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(Blockly.Blocks.ledger.HUE);
      this.setTooltip('Retreive the 32 byte namespace biased SHA512H of the currently executing Hook');
      this.setHelpUrl('http://www.example.com/');
    }
  };

  //Retreive the 32 byte namespace biased SHA512H of the last closed ledger
  Blockly.Blocks['ledger_last_hash'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("ledger_last_hash");
      this.appendValueInput("write_ptr")
          .setCheck(null)
          .appendField("write_ptr");
      this.appendValueInput("write_len")
          .setCheck(null)
          .appendField("write_len");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(Blockly.Blocks.ledger.HUE);
      this.setTooltip('Retreive the 32 byte namespace biased SHA512H of the last closed ledger');
      this.setHelpUrl('http://www.example.com/');
    }
  };
  //Generate a 32 byte nonce for use in an emitted transaction
  Blockly.Blocks['nonce'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("nonce");
      this.appendValueInput("write_ptr")
          .setCheck(null)
          .appendField("write_ptr");
      this.appendValueInput("write_len")
          .setCheck(null)
          .appendField("write_len");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(Blockly.Blocks.ledger.HUE);
      this.setTooltip('Generate a 32 byte nonce for use in an emitted transaction');
      this.setHelpUrl('http://www.example.com/');
    }
  };
  //Fetch the fee base of the current ledger
  Blockly.Blocks['fee_base'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("fee_base");
      this.setInputsInline(true);
      this.setOutput(true, "int64_t");
      this.setColour(Blockly.Blocks.ledger.HUE);
      this.setTooltip('Fetch the fee base of the current ledger');
      this.setHelpUrl('http://www.example.com/');
    }
  };
  //Fetch the current ledger sequence number
  Blockly.Blocks['ledger_seq'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("fee_base");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(Blockly.Blocks.ledger.HUE);
      this.setTooltip('Fetch the current ledger sequence number');
      this.setHelpUrl('http://www.example.com/');
    }
  };