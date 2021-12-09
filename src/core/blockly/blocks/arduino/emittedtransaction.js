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

Blockly.Blocks.emittedtransaction.HUE = 300;

//Get the burden of a hypothetically emitted transaction
Blockly.Blocks['etxn_burden'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("etxn_burden");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(Blockly.Blocks.emittedtransaction.HUE);
      this.setTooltip('Get the burden of a hypothetically emitted transaction');
      this.setHelpUrl('');
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
    this.setColour(Blockly.Blocks.emittedtransaction.HUE);
    this.setTooltip('Produce an sfEmitDetails suitable for a soon-to-be emitted transaction');
    this.setHelpUrl(' ');
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
      this.setColour(Blockly.Blocks.emittedtransaction.HUE);
      this.setTooltip('Estimate the required fee for a txn to be emitted successfully');
      this.setHelpUrl(' ');
    }
  };

//Before we start calling hook-api functions we should tell the hook how many tx we intend to create
Blockly.Blocks['etxn_reserve'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("etxn_reserve");
      this.appendValueInput("NUM")
          .setCheck(null);
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(Blockly.Blocks.emittedtransaction.HUE);
      this.setTooltip('Before we start calling hook-api functions we should tell the hook how many tx we intend to create');
      this.setHelpUrl('');
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
      this.setColour(Blockly.Blocks.emittedtransaction.HUE);
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
      this.setColour(Blockly.Blocks.emittedtransaction.HUE);
      this.setTooltip('Get the generation of a hypothetically emitted transaction');
      this.setHelpUrl(' ');
    }
  };
