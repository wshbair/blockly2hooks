/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Slot functions
 *     https://xrpl-hooks.readme.io/reference/hook
 *     ToDo add proper Type check
 */
 'use strict';

 goog.provide('Blockly.xrplhook.slot'); 
 goog.require('Blockly.xrplhook');

 Blockly.xrplhook['slot'] = function(block) {
    var value_write_ptr = Blockly.xrplhook.valueToCode(block, 'write_ptr', Blockly.xrplhook.ORDER_ATOMIC);
    var value_write_len = Blockly.xrplhook.valueToCode(block, 'write_len', Blockly.xrplhook.ORDER_ATOMIC);
    var value_slot_no = Blockly.xrplhook.valueToCode(block, 'slot_no', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'slot('+value_write_ptr+','+value_write_len+','+value_slot_no+')';
    return [code, Blockly.xrplhook.ORDER_NONE];
  };

  Blockly.xrplhook['slot_clear'] = function(block) {
    var value_slot_no = Blockly.xrplhook.valueToCode(block, 'slot_no', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'slot_clear('+value_slot_no+')';
    return [code, Blockly.xrplhook.ORDER_NONE];
  };

  Blockly.xrplhook['slot_count'] = function(block) {
    var value_slot_no = Blockly.xrplhook.valueToCode(block, 'slot_no', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'slot_count('+value_slot_no+')';
    return [code, Blockly.xrplhook.ORDER_NONE];
  };

   
  Blockly.xrplhook['slot_id'] = function(block) {
    var value_write_ptr = Blockly.xrplhook.valueToCode(block, 'write_ptr', Blockly.xrplhook.ORDER_ATOMIC);
    var value_write_len = Blockly.xrplhook.valueToCode(block, 'write_len', Blockly.xrplhook.ORDER_ATOMIC);
    var value_slot_no = Blockly.xrplhook.valueToCode(block, 'slot_no', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'slot_id('+value_write_ptr+','+value_write_len+','+value_slot_no+')';
    return [code, Blockly.xrplhook.ORDER_NONE];
  };

  Blockly.xrplhook['slot_set'] = function(block) {
    var value_read_ptr = Blockly.xrplhook.valueToCode(block, 'read_ptr', Blockly.xrplhook.ORDER_ATOMIC);
    var value_read_len = Blockly.xrplhook.valueToCode(block, 'read_len', Blockly.xrplhook.ORDER_ATOMIC);
    var value_slot_no = Blockly.xrplhook.valueToCode(block, 'slot_no', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'slot_set('+value_read_ptr+','+value_read_len+','+value_slot_no+')';
    return [code, Blockly.xrplhook.ORDER_NONE];
  };

  Blockly.xrplhook['slot_size'] = function(block) {
    var value_slot_no = Blockly.xrplhook.valueToCode(block, 'slot_no', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'slot_size('+value_slot_no+')';
    return [code, Blockly.xrplhook.ORDER_NONE];
  };

  Blockly.xrplhook['slot_subarray'] = function(block) {
    var value_parent_slot = Blockly.xrplhook.valueToCode(block, 'parent_slot', Blockly.xrplhook.ORDER_ATOMIC);
    var value_array_id = Blockly.xrplhook.valueToCode(block, 'array_id', Blockly.xrplhook.ORDER_ATOMIC);
    var value_new_slot = Blockly.xrplhook.valueToCode(block, 'new_slot', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'slot_subarray('+value_parent_slot+','+value_array_id+','+value_new_slot+')';
    return [code, Blockly.xrplhook.ORDER_NONE];
  };

  Blockly.xrplhook['slot_subfield'] = function(block) {
    var value_parent_slot = Blockly.xrplhook.valueToCode(block, 'parent_slot', Blockly.xrplhook.ORDER_ATOMIC);
    var value_field_id = Blockly.xrplhook.valueToCode(block, 'field_id', Blockly.xrplhook.ORDER_ATOMIC);
    var value_new_slot = Blockly.xrplhook.valueToCode(block, 'new_slot', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'slot_subfield('+value_parent_slot+','+value_field_id+','+value_new_slot+')';
    return [code, Blockly.xrplhook.ORDER_NONE];
  };

  Blockly.xrplhook['slot_type'] = function(block) {
    var value_slot_no = Blockly.xrplhook.valueToCode(block, 'slot_no', Blockly.xrplhook.ORDER_ATOMIC);
    var value_falgs = Blockly.xrplhook.valueToCode(block, 'flags', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'slot_type('+value_slot_no+','+value_falgs+')';
    return [code, Blockly.xrplhook.ORDER_NONE];
  };

  Blockly.xrplhook['slot_float'] = function(block) {
    var value_slot_no = Blockly.xrplhook.valueToCode(block, 'slot_no', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'slot_float('+value_slot_no+')';
    return [code, Blockly.xrplhook.ORDER_NONE];
  };
