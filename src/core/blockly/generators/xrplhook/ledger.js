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

 goog.provide('Blockly.xrplhook.ledger'); 
 goog.require('Blockly.xrplhook');

 

  Blockly.xrplhook['hook_hash'] = function(block) {
    var value_write_ptr = Blockly.xrplhook.valueToCode(block, 'write_ptr', Blockly.xrplhook.ORDER_ATOMIC);
    var value_write_len = Blockly.xrplhook.valueToCode(block, 'write_len', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'hook_hash('+value_write_ptr+','+value_write_len+')';
    return [code, Blockly.xrplhook.ORDER_NONE];
  };

  Blockly.xrplhook['ledger_last_hash'] = function(block) {
    var value_write_ptr = Blockly.xrplhook.valueToCode(block, 'write_ptr', Blockly.xrplhook.ORDER_ATOMIC);
    var value_write_len = Blockly.xrplhook.valueToCode(block, 'write_len', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'ledger_last_hash('+value_write_ptr+','+value_write_len+')';
    return [code, Blockly.xrplhook.ORDER_NONE];
  };

  Blockly.xrplhook['nonce'] = function(block) {
    var value_write_ptr = Blockly.xrplhook.valueToCode(block, 'write_ptr', Blockly.xrplhook.ORDER_ATOMIC);
    var value_write_len = Blockly.xrplhook.valueToCode(block, 'write_len', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'nonce('+value_write_ptr+','+value_write_len+')';
    return [code, Blockly.xrplhook.ORDER_NONE];
  };
 

  Blockly.xrplhook['fee_base'] = function(block) {
    var code = 'fee_base()';
    return [code, Blockly.xrplhook.ORDER_NONE];
  };

  Blockly.xrplhook['ledger_seq'] = function(block) {
    var code = 'ledger_seq()';
    return [code, Blockly.xrplhook.ORDER_NONE];
  };
  
  Blockly.xrplhook['hook_account'] = function(block) {
    var value_var = Blockly.xrplhook.valueToCode(block, 'VAR', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'hook_account('+value_var+')';
    return [code, Blockly.xrplhook.ORDER_NONE];
  };

  Blockly.xrplhook['hook_account_statment'] = function(block) {
    var value_var = Blockly.xrplhook.valueToCode(block, 'VAR', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'hook_account('+value_var+');\n';
    return code;
  };