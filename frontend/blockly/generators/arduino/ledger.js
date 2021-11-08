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

 goog.provide('Blockly.Arduino.ledger'); 
 goog.require('Blockly.Arduino');

 Blockly.Arduino['hook_account'] = function(block) {
    var value_write_ptr = Blockly.Arduino.valueToCode(block, 'write_ptr', Blockly.Arduino.ORDER_ATOMIC);
    var value_write_len = Blockly.Arduino.valueToCode(block, 'write_len', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'hook_account('+value_write_ptr+','+value_write_len+')';
    return [code, Blockly.Arduino.ORDER_NONE];
  };

  Blockly.Arduino['hook_hash'] = function(block) {
    var value_write_ptr = Blockly.Arduino.valueToCode(block, 'write_ptr', Blockly.Arduino.ORDER_ATOMIC);
    var value_write_len = Blockly.Arduino.valueToCode(block, 'write_len', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'hook_hash('+value_write_ptr+','+value_write_len+')';
    return [code, Blockly.Arduino.ORDER_NONE];
  };

  Blockly.Arduino['ledger_last_hash'] = function(block) {
    var value_write_ptr = Blockly.Arduino.valueToCode(block, 'write_ptr', Blockly.Arduino.ORDER_ATOMIC);
    var value_write_len = Blockly.Arduino.valueToCode(block, 'write_len', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'ledger_last_hash('+value_write_ptr+','+value_write_len+')';
    return [code, Blockly.Arduino.ORDER_NONE];
  };

  Blockly.Arduino['nonce'] = function(block) {
    var value_write_ptr = Blockly.Arduino.valueToCode(block, 'write_ptr', Blockly.Arduino.ORDER_ATOMIC);
    var value_write_len = Blockly.Arduino.valueToCode(block, 'write_len', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'nonce('+value_write_ptr+','+value_write_len+')';
    return [code, Blockly.Arduino.ORDER_NONE];
  };
 

  Blockly.Arduino['fee_base'] = function(block) {
    var code = 'fee_base()';
    return [code, Blockly.Arduino.ORDER_NONE];
  };

  Blockly.Arduino['ledger_seq'] = function(block) {
    var code = 'ledger_seq()';
    return [code, Blockly.Arduino.ORDER_NONE];
  };
  