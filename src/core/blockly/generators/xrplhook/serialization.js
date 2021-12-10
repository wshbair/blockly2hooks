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

 goog.provide('Blockly.xrplhook.serialization'); 
 goog.require('Blockly.xrplhook');

 Blockly.xrplhook['sto_subfield'] = function(block) {
    var value_read_ptr = Blockly.xrplhook.valueToCode(block, 'read_ptr', Blockly.xrplhook.ORDER_ATOMIC);
    var value_read_len = Blockly.xrplhook.valueToCode(block, 'read_len', Blockly.xrplhook.ORDER_ATOMIC);
    var value_field_id = Blockly.xrplhook.valueToCode(block, 'field_id', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'sto_subfield('+value_read_ptr+','+value_read_len+','+value_field_id+')';
    return [code, Blockly.xrplhook.ORDER_NONE];
  };

  Blockly.xrplhook['sto_subarray'] = function(block) {
    var value_read_ptr = Blockly.xrplhook.valueToCode(block, 'read_ptr', Blockly.xrplhook.ORDER_ATOMIC);
    var value_read_len = Blockly.xrplhook.valueToCode(block, 'read_len', Blockly.xrplhook.ORDER_ATOMIC);
    var value_array_id = Blockly.xrplhook.valueToCode(block, 'array_id', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'sto_subarray('+value_read_ptr+','+value_read_len+','+value_array_id+')';
    return [code, Blockly.xrplhook.ORDER_NONE];
  };

  Blockly.xrplhook['sto_emplace'] = function(block) {
    var value_write_ptr = Blockly.xrplhook.valueToCode(block, 'write_ptr', Blockly.xrplhook.ORDER_ATOMIC);
    var value_write_len = Blockly.xrplhook.valueToCode(block, 'write_len', Blockly.xrplhook.ORDER_ATOMIC);
    var value_sread_ptr = Blockly.xrplhook.valueToCode(block, 'sread_ptr', Blockly.xrplhook.ORDER_ATOMIC);
    var value_sread_len = Blockly.xrplhook.valueToCode(block, 'sread_len', Blockly.xrplhook.ORDER_ATOMIC);
    var value_fread_ptr = Blockly.xrplhook.valueToCode(block, 'fread_ptr', Blockly.xrplhook.ORDER_ATOMIC);
    var value_fread_len = Blockly.xrplhook.valueToCode(block, 'fread_len', Blockly.xrplhook.ORDER_ATOMIC);
    var value_field_id = Blockly.xrplhook.valueToCode(block, 'field_id', Blockly.xrplhook.ORDER_ATOMIC);
    
    var code = 'sto_emplace('+value_write_ptr+','+value_write_len+','+value_sread_ptr+','+
    value_sread_len+','+value_fread_ptr+','+value_fread_len+','+value_field_id+')';
    
    return [code, Blockly.xrplhook.ORDER_NONE];
  };

  Blockly.xrplhook['sto_erase'] = function(block) {
    var value_write_ptr = Blockly.xrplhook.valueToCode(block, 'write_ptr', Blockly.xrplhook.ORDER_ATOMIC);
    var value_write_len = Blockly.xrplhook.valueToCode(block, 'write_len', Blockly.xrplhook.ORDER_ATOMIC);
    var value_read_ptr = Blockly.xrplhook.valueToCode(block, 'read_ptr', Blockly.xrplhook.ORDER_ATOMIC);
    var value_read_len = Blockly.xrplhook.valueToCode(block, 'read_len', Blockly.xrplhook.ORDER_ATOMIC);
    var value_field_id = Blockly.xrplhook.valueToCode(block, 'field_id', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'sto_erase('+value_write_ptr+','+value_write_len+','+value_read_ptr+','+
    value_read_len+','+value_field_id+')';
    return [code, Blockly.xrplhook.ORDER_NONE];
  };

  Blockly.xrplhook['sto_validate'] = function(block) {
    var value_read_ptr = Blockly.xrplhook.valueToCode(block, 'read_ptr', Blockly.xrplhook.ORDER_ATOMIC);
    var value_read_len = Blockly.xrplhook.valueToCode(block, 'read_len', Blockly.xrplhook.ORDER_ATOMIC);
     var code = 'sto_validate('+value_read_ptr+','+value_read_len+')';
    return [code, Blockly.xrplhook.ORDER_NONE];
  };