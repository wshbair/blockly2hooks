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

 goog.provide('Blockly.Arduino.serialization'); 
 goog.require('Blockly.Arduino');

 Blockly.Arduino['sto_subfield'] = function(block) {
    var value_read_ptr = Blockly.Arduino.valueToCode(block, 'read_ptr', Blockly.Arduino.ORDER_ATOMIC);
    var value_read_len = Blockly.Arduino.valueToCode(block, 'read_len', Blockly.Arduino.ORDER_ATOMIC);
    var value_field_id = Blockly.Arduino.valueToCode(block, 'field_id', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'sto_subfield('+value_read_ptr+','+value_read_len+','+value_field_id+')';
    return [code, Blockly.Arduino.ORDER_NONE];
  };

  Blockly.Arduino['sto_subarray'] = function(block) {
    var value_read_ptr = Blockly.Arduino.valueToCode(block, 'read_ptr', Blockly.Arduino.ORDER_ATOMIC);
    var value_read_len = Blockly.Arduino.valueToCode(block, 'read_len', Blockly.Arduino.ORDER_ATOMIC);
    var value_array_id = Blockly.Arduino.valueToCode(block, 'array_id', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'sto_subarray('+value_read_ptr+','+value_read_len+','+value_array_id+')';
    return [code, Blockly.Arduino.ORDER_NONE];
  };

  Blockly.Arduino['sto_emplace'] = function(block) {
    var value_write_ptr = Blockly.Arduino.valueToCode(block, 'write_ptr', Blockly.Arduino.ORDER_ATOMIC);
    var value_write_len = Blockly.Arduino.valueToCode(block, 'write_len', Blockly.Arduino.ORDER_ATOMIC);
    var value_sread_ptr = Blockly.Arduino.valueToCode(block, 'sread_ptr', Blockly.Arduino.ORDER_ATOMIC);
    var value_sread_len = Blockly.Arduino.valueToCode(block, 'sread_len', Blockly.Arduino.ORDER_ATOMIC);
    var value_fread_ptr = Blockly.Arduino.valueToCode(block, 'fread_ptr', Blockly.Arduino.ORDER_ATOMIC);
    var value_fread_len = Blockly.Arduino.valueToCode(block, 'fread_len', Blockly.Arduino.ORDER_ATOMIC);
    var value_field_id = Blockly.Arduino.valueToCode(block, 'field_id', Blockly.Arduino.ORDER_ATOMIC);
    
    var code = 'sto_emplace('+value_write_ptr+','+value_write_len+','+value_sread_ptr+','+
    value_sread_len+','+value_fread_ptr+','+value_fread_len+','+value_field_id+')';
    
    return [code, Blockly.Arduino.ORDER_NONE];
  };

  Blockly.Arduino['sto_erase'] = function(block) {
    var value_write_ptr = Blockly.Arduino.valueToCode(block, 'write_ptr', Blockly.Arduino.ORDER_ATOMIC);
    var value_write_len = Blockly.Arduino.valueToCode(block, 'write_len', Blockly.Arduino.ORDER_ATOMIC);
    var value_read_ptr = Blockly.Arduino.valueToCode(block, 'read_ptr', Blockly.Arduino.ORDER_ATOMIC);
    var value_read_len = Blockly.Arduino.valueToCode(block, 'read_len', Blockly.Arduino.ORDER_ATOMIC);
    var value_field_id = Blockly.Arduino.valueToCode(block, 'field_id', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'sto_erase('+value_write_ptr+','+value_write_len+','+value_read_ptr+','+
    value_read_len+','+value_field_id+')';
    return [code, Blockly.Arduino.ORDER_NONE];
  };

  Blockly.Arduino['sto_validate'] = function(block) {
    var value_read_ptr = Blockly.Arduino.valueToCode(block, 'read_ptr', Blockly.Arduino.ORDER_ATOMIC);
    var value_read_len = Blockly.Arduino.valueToCode(block, 'read_len', Blockly.Arduino.ORDER_ATOMIC);
     var code = 'sto_validate('+value_read_ptr+','+value_read_len+')';
    return [code, Blockly.Arduino.ORDER_NONE];
  };