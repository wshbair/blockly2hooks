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

 goog.provide('Blockly.xrplhook.emittedtransaction'); 
 goog.require('Blockly.xrplhook');

 Blockly.xrplhook['etxn_burden'] = function(block) {
    var code = 'etxn_burden()';
    return [code, Blockly.xrplhook.ORDER_NONE];
  };

Blockly.xrplhook['etxn_details'] = function(block) {
    var value_write_ptr = Blockly.xrplhook.valueToCode(block, 'write_ptr', Blockly.xrplhook.ORDER_ATOMIC);
    var value_write_len = Blockly.xrplhook.valueToCode(block, 'write_len', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'etxn_details('+value_write_ptr+','+value_write_len+')';
    return [code, Blockly.xrplhook.ORDER_NONE];
    };

Blockly.xrplhook['etxn_fee_base'] = function(block) {
    var value_tx_byte_count = Blockly.xrplhook.valueToCode(block, 'tx_byte_count', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'etxn_fee_base('+value_tx_byte_count+')';
    return [code, Blockly.xrplhook.ORDER_NONE];
  };
  
Blockly.xrplhook['etxn_reserve'] = function(block) {
  var value_num = Blockly.xrplhook.valueToCode(block, 'NUM', Blockly.xrplhook.ORDER_ATOMIC);
  var code = 'etxn_reserve('+value_num+');\n';
  return code;
};

Blockly.xrplhook['emit'] = function(block) {
    var value_read_ptr = Blockly.xrplhook.valueToCode(block, 'read_ptr', Blockly.xrplhook.ORDER_ATOMIC);
    var value_write_ptr = Blockly.xrplhook.valueToCode(block, 'write_ptr', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'emit('+value_write_ptr+','+value_read_ptr+');\n';
    return code;
  };
  
Blockly.xrplhook['etxn_generation'] = function(block) {
    var code = 'etxn_generation()';
    return [code, Blockly.xrplhook.ORDER_NONE];
  };