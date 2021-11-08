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

 goog.provide('Blockly.Arduino.trace'); 
 goog.require('Blockly.Arduino');


 Blockly.Arduino['trace'] = function(block) {
    var value_mread_ptr = Blockly.Arduino.valueToCode(block, 'mread_ptr', Blockly.Arduino.ORDER_ATOMIC);
    var value_mread_len = Blockly.Arduino.valueToCode(block, 'mread_len', Blockly.Arduino.ORDER_ATOMIC);
    var value_dread_ptr = Blockly.Arduino.valueToCode(block, 'dread_ptr', Blockly.Arduino.ORDER_ATOMIC);
    var value_dread_len = Blockly.Arduino.valueToCode(block, 'dread_len', Blockly.Arduino.ORDER_ATOMIC);
    var value_as_hex = Blockly.Arduino.valueToCode(block, 'as_hex', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'trace('+value_mread_ptr+','+value_mread_len+','+value_dread_ptr+','+value_dread_len+','+value_as_hex+')';
    return [code, Blockly.Arduino.ORDER_NONE];
  };

  Blockly.Arduino['trace_slot'] = function(block) {
    var value_mread_ptr = Blockly.Arduino.valueToCode(block, 'mread_ptr', Blockly.Arduino.ORDER_ATOMIC);
    var value_mread_len = Blockly.Arduino.valueToCode(block, 'mread_len', Blockly.Arduino.ORDER_ATOMIC);
    var value_slot_no = Blockly.Arduino.valueToCode(block, 'slot_no', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'trace_slot('+value_mread_ptr+','+value_mread_len+','+value_slot_no+')';
    return [code, Blockly.Arduino.ORDER_NONE];
  };

  Blockly.Arduino['trace_num'] = function(block) {
    var value_mread_ptr = Blockly.Arduino.valueToCode(block, 'mread_ptr', Blockly.Arduino.ORDER_ATOMIC);
    var value_mread_len = Blockly.Arduino.valueToCode(block, 'mread_len', Blockly.Arduino.ORDER_ATOMIC);
    var value_number = Blockly.Arduino.valueToCode(block, 'number', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'trace_slot('+value_mread_ptr+','+value_mread_len+','+value_number+')';
    return [code, Blockly.Arduino.ORDER_NONE];
  };

  Blockly.Arduino['trace_float'] = function(block) {
    var value_mread_ptr = Blockly.Arduino.valueToCode(block, 'mread_ptr', Blockly.Arduino.ORDER_ATOMIC);
    var value_mread_len = Blockly.Arduino.valueToCode(block, 'mread_len', Blockly.Arduino.ORDER_ATOMIC);
    var value_float1 = Blockly.Arduino.valueToCode(block, 'float1', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'trace_float('+value_mread_ptr+','+value_mread_len+','+value_float1+')';
    return [code, Blockly.Arduino.ORDER_NONE];
  };

  





 
 Blockly.Arduino['state'] = function(block) {
    var value_write_ptr = Blockly.Arduino.valueToCode(block, 'write_ptr', Blockly.Arduino.ORDER_ATOMIC);
    var value_write_len = Blockly.Arduino.valueToCode(block, 'write_len', Blockly.Arduino.ORDER_ATOMIC);
    var value_kread_ptr = Blockly.Arduino.valueToCode(block, 'kread_ptr', Blockly.Arduino.ORDER_ATOMIC);
    var value_kread_len = Blockly.Arduino.valueToCode(block, 'kread_len', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'state('+value_write_ptr+','+value_write_len+','+value_kread_ptr+','+value_kread_len+')';
    return [code, Blockly.Arduino.ORDER_NONE];
  };
  
  Blockly.Arduino['state_set'] = function(block) {
    var value_read_ptr = Blockly.Arduino.valueToCode(block, 'read_ptr', Blockly.Arduino.ORDER_ATOMIC);
    var value_read_len = Blockly.Arduino.valueToCode(block, 'read_len', Blockly.Arduino.ORDER_ATOMIC);
    var value_kread_ptr = Blockly.Arduino.valueToCode(block, 'kread_ptr', Blockly.Arduino.ORDER_ATOMIC);
    var value_kread_len = Blockly.Arduino.valueToCode(block, 'kread_len', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'state_set('+value_read_ptr+','+value_read_len+','+value_kread_ptr+','+value_kread_len+')';
    return [code, Blockly.Arduino.ORDER_NONE];
  };

  Blockly.Arduino['state_foreign'] = function(block) {
    var value_write_ptr = Blockly.Arduino.valueToCode(block, 'write_ptr', Blockly.Arduino.ORDER_ATOMIC);
    var value_write_len = Blockly.Arduino.valueToCode(block, 'write_len', Blockly.Arduino.ORDER_ATOMIC);
    var value_kread_ptr = Blockly.Arduino.valueToCode(block, 'kread_ptr', Blockly.Arduino.ORDER_ATOMIC);
    var value_kread_len = Blockly.Arduino.valueToCode(block, 'kread_len', Blockly.Arduino.ORDER_ATOMIC);
    var value_aread_ptr = Blockly.Arduino.valueToCode(block, 'aread_ptr', Blockly.Arduino.ORDER_ATOMIC);
    var value_aread_len = Blockly.Arduino.valueToCode(block, 'aread_len', Blockly.Arduino.ORDER_ATOMIC);
    
    var code = 'state_foreign('+value_write_ptr+','+value_write_len+','+value_kread_ptr+','+
    value_kread_len+','+value_aread_ptr+','+value_aread_len+')';

    return [code, Blockly.Arduino.ORDER_NONE];
  };



 

   
   