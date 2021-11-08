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

 goog.provide('Blockly.Arduino.slot'); 
 goog.require('Blockly.Arduino');

 Blockly.Arduino['slot'] = function(block) {
    var value_write_ptr = Blockly.Arduino.valueToCode(block, 'write_ptr', Blockly.Arduino.ORDER_ATOMIC);
    var value_write_len = Blockly.Arduino.valueToCode(block, 'write_len', Blockly.Arduino.ORDER_ATOMIC);
    var value_slot_no = Blockly.Arduino.valueToCode(block, 'slot_no', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'slot('+value_write_ptr+','+value_write_len+','+value_slot_no+')';
    return [code, Blockly.Arduino.ORDER_NONE];
  };

  Blockly.Arduino['slot_clear'] = function(block) {
    var value_slot_no = Blockly.Arduino.valueToCode(block, 'slot_no', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'slot_clear('+value_slot_no+')';
    return [code, Blockly.Arduino.ORDER_NONE];
  };

  Blockly.Arduino['slot_count'] = function(block) {
    var value_slot_no = Blockly.Arduino.valueToCode(block, 'slot_no', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'slot_count('+value_slot_no+')';
    return [code, Blockly.Arduino.ORDER_NONE];
  };

   
  Blockly.Arduino['slot_id'] = function(block) {
    var value_write_ptr = Blockly.Arduino.valueToCode(block, 'write_ptr', Blockly.Arduino.ORDER_ATOMIC);
    var value_write_len = Blockly.Arduino.valueToCode(block, 'write_len', Blockly.Arduino.ORDER_ATOMIC);
    var value_slot_no = Blockly.Arduino.valueToCode(block, 'slot_no', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'slot_id('+value_write_ptr+','+value_write_len+','+value_slot_no+')';
    return [code, Blockly.Arduino.ORDER_NONE];
  };

  Blockly.Arduino['slot_set'] = function(block) {
    var value_read_ptr = Blockly.Arduino.valueToCode(block, 'read_ptr', Blockly.Arduino.ORDER_ATOMIC);
    var value_read_len = Blockly.Arduino.valueToCode(block, 'read_len', Blockly.Arduino.ORDER_ATOMIC);
    var value_slot_no = Blockly.Arduino.valueToCode(block, 'slot_no', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'slot_set('+value_read_ptr+','+value_read_len+','+value_slot_no+')';
    return [code, Blockly.Arduino.ORDER_NONE];
  };

  Blockly.Arduino['slot_size'] = function(block) {
    var value_slot_no = Blockly.Arduino.valueToCode(block, 'slot_no', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'slot_size('+value_slot_no+')';
    return [code, Blockly.Arduino.ORDER_NONE];
  };

  Blockly.Arduino['slot_subarray'] = function(block) {
    var value_parent_slot = Blockly.Arduino.valueToCode(block, 'parent_slot', Blockly.Arduino.ORDER_ATOMIC);
    var value_array_id = Blockly.Arduino.valueToCode(block, 'array_id', Blockly.Arduino.ORDER_ATOMIC);
    var value_new_slot = Blockly.Arduino.valueToCode(block, 'new_slot', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'slot_subarray('+value_parent_slot+','+value_array_id+','+value_new_slot+')';
    return [code, Blockly.Arduino.ORDER_NONE];
  };

  Blockly.Arduino['slot_subfield'] = function(block) {
    var value_parent_slot = Blockly.Arduino.valueToCode(block, 'parent_slot', Blockly.Arduino.ORDER_ATOMIC);
    var value_field_id = Blockly.Arduino.valueToCode(block, 'field_id', Blockly.Arduino.ORDER_ATOMIC);
    var value_new_slot = Blockly.Arduino.valueToCode(block, 'new_slot', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'slot_subfield('+value_parent_slot+','+value_field_id+','+value_new_slot+')';
    return [code, Blockly.Arduino.ORDER_NONE];
  };

  Blockly.Arduino['slot_type'] = function(block) {
    var value_slot_no = Blockly.Arduino.valueToCode(block, 'slot_no', Blockly.Arduino.ORDER_ATOMIC);
    var value_falgs = Blockly.Arduino.valueToCode(block, 'flags', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'slot_type('+value_slot_no+','+value_falgs+')';
    return [code, Blockly.Arduino.ORDER_NONE];
  };

  Blockly.Arduino['slot_float'] = function(block) {
    var value_slot_no = Blockly.Arduino.valueToCode(block, 'slot_no', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'slot_float('+value_slot_no+')';
    return [code, Blockly.Arduino.ORDER_NONE];
  };
