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

 goog.provide('Blockly.Arduino.emittedtransaction'); 
 goog.require('Blockly.Arduino');

 Blockly.Arduino['etxn_burden'] = function(block) {
    var code = 'etxn_burden()';
    return [code, Blockly.Arduino.ORDER_NONE];
  };

Blockly.Arduino['etxn_details'] = function(block) {
    var value_write_ptr = Blockly.Arduino.valueToCode(block, 'write_ptr', Blockly.Arduino.ORDER_ATOMIC);
    var value_write_len = Blockly.Arduino.valueToCode(block, 'write_len', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'etxn_details('+value_write_ptr+','+value_write_len+')';
    return [code, Blockly.Arduino.ORDER_NONE];
    };

Blockly.Arduino['etxn_fee_base'] = function(block) {
    var value_tx_byte_count = Blockly.Arduino.valueToCode(block, 'tx_byte_count', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'etxn_fee_base('+value_tx_byte_count+')';
    return [code, Blockly.Arduino.ORDER_NONE];
  };
  
Blockly.Arduino['etxn_reserve'] = function(block) {
  var value_num = Blockly.Arduino.valueToCode(block, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
  var code = 'etxn_reserve('+value_num+');\n';
  return code;
};

Blockly.Arduino['emit'] = function(block) {
    var value_read_ptr = Blockly.Arduino.valueToCode(block, 'read_ptr', Blockly.Arduino.ORDER_ATOMIC);
    var value_write_ptr = Blockly.Arduino.valueToCode(block, 'write_ptr', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'emit('+value_write_ptr+','+value_read_ptr+');\n';
    return code;
  };
  
Blockly.Arduino['etxn_generation'] = function(block) {
    var code = 'etxn_generation()';
    return [code, Blockly.Arduino.ORDER_NONE];
  };