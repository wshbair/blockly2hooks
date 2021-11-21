/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Emitted transaction functions
 *     https://xrpl-hooks.readme.io/reference/hook
 *     ToDo add proper Type check
 */

 'use strict';

goog.provide('Blockly.Blocks.emittedtransaction'); 
goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

//Get the burden of a hypothetically emitted transaction
Blockly.Blocks['etxn_burden'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("etxn_burden");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(330);
      this.setTooltip('Get the burden of a hypothetically emitted transaction');
      this.setHelpUrl('http://www.example.com/');
    }
  };

//Produce an sfEmitDetails suitable for a soon-to-be emitted transaction
Blockly.Blocks['etxn_details'] = {
init: function() {
    this.appendDummyInput()
        .appendField("etxn_details");
    this.appendValueInput("write_ptr")
        .setCheck(null)
        .appendField("write_ptr");
    this.appendValueInput("write_len")
        .setCheck(null)
        .appendField("write_len");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(330);
    this.setTooltip('Produce an sfEmitDetails suitable for a soon-to-be emitted transaction');
    this.setHelpUrl('http://www.example.com/');
}
};
//Estimate the required fee for a txn to be emitted successfully
Blockly.Blocks['etxn_fee_base'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("etxn_fee_base");
      this.appendValueInput("tx_byte_count")
          .setCheck(null)
          .appendField("tx_byte_count");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(330);
      this.setTooltip('Estimate the required fee for a txn to be emitted successfully');
      this.setHelpUrl('http://www.example.com/');
    }
  };

//Estimate the required fee for a txn to be emitted successfully
Blockly.Blocks['etxn_reserve'] = {
init: function() {
    this.appendDummyInput()
        .appendField("etxn_reserve");
    this.appendValueInput("count")
        .setCheck(null)
        .appendField("count");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(330);
    this.setTooltip('Estimate the required fee for a txn to be emitted successfully');
    this.setHelpUrl('http://www.example.com/');
}
};  

//Emit a new transaction from the hook
Blockly.Blocks['emit'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("emit");
      this.appendValueInput("write_ptr")
          .setCheck(null)
          .appendField("write_ptr");
      this.appendValueInput("read_ptr")
          .setCheck(null)
          .appendField("read_ptr");
      this.setInputsInline(true);
      this.setColour(330);
      this.setTooltip('Emit a new transaction from the hook');
      this.setHelpUrl('');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
    }
  };

  Blockly.Blocks['etxn_generation'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("etxn_generation");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(330);
      this.setTooltip('Get the generation of a hypothetically emitted transaction');
      this.setHelpUrl('http://www.example.com/');
    }
  };
