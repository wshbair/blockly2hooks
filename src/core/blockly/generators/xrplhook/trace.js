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

 goog.provide('Blockly.xrplhook.trace'); 
 goog.require('Blockly.xrplhook');


 Blockly.xrplhook['trace'] = function(block) {
    var value_mread_ptr = Blockly.xrplhook.valueToCode(block, 'mread_ptr', Blockly.xrplhook.ORDER_ATOMIC);
    var value_mread_len = Blockly.xrplhook.valueToCode(block, 'mread_len', Blockly.xrplhook.ORDER_ATOMIC);
    var value_dread_ptr = Blockly.xrplhook.valueToCode(block, 'dread_ptr', Blockly.xrplhook.ORDER_ATOMIC);
    var value_dread_len = Blockly.xrplhook.valueToCode(block, 'dread_len', Blockly.xrplhook.ORDER_ATOMIC);
    var value_as_hex = Blockly.xrplhook.valueToCode(block, 'as_hex', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'trace('+value_mread_ptr+','+value_mread_len+','+value_dread_ptr+','+value_dread_len+','+value_as_hex+')';
    return [code, Blockly.xrplhook.ORDER_NONE];
  };

  Blockly.xrplhook['trace_slot'] = function(block) {
    var value_mread_ptr = Blockly.xrplhook.valueToCode(block, 'mread_ptr', Blockly.xrplhook.ORDER_ATOMIC);
    var value_mread_len = Blockly.xrplhook.valueToCode(block, 'mread_len', Blockly.xrplhook.ORDER_ATOMIC);
    var value_slot_no = Blockly.xrplhook.valueToCode(block, 'slot_no', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'trace_slot('+value_mread_ptr+','+value_mread_len+','+value_slot_no+')';
    return [code, Blockly.xrplhook.ORDER_NONE];
  };

  Blockly.xrplhook['trace_num'] = function(block) {
    var value_mread_ptr = Blockly.xrplhook.valueToCode(block, 'mread_ptr', Blockly.xrplhook.ORDER_ATOMIC);
    var value_mread_len = Blockly.xrplhook.valueToCode(block, 'mread_len', Blockly.xrplhook.ORDER_ATOMIC);
    var value_number = Blockly.xrplhook.valueToCode(block, 'number', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'trace_slot('+value_mread_ptr+','+value_mread_len+','+value_number+')';
    return [code, Blockly.xrplhook.ORDER_NONE];
  };

  Blockly.xrplhook['trace_float'] = function(block) {
    var value_mread_ptr = Blockly.xrplhook.valueToCode(block, 'mread_ptr', Blockly.xrplhook.ORDER_ATOMIC);
    var value_mread_len = Blockly.xrplhook.valueToCode(block, 'mread_len', Blockly.xrplhook.ORDER_ATOMIC);
    var value_float1 = Blockly.xrplhook.valueToCode(block, 'float1', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'trace_float('+value_mread_ptr+','+value_mread_len+','+value_float1+')';
    return [code, Blockly.xrplhook.ORDER_NONE];
  };

  





 
 Blockly.xrplhook['state'] = function(block) {
    var value_write_ptr = Blockly.xrplhook.valueToCode(block, 'write_ptr', Blockly.xrplhook.ORDER_ATOMIC);
    var value_write_len = Blockly.xrplhook.valueToCode(block, 'write_len', Blockly.xrplhook.ORDER_ATOMIC);
    var value_kread_ptr = Blockly.xrplhook.valueToCode(block, 'kread_ptr', Blockly.xrplhook.ORDER_ATOMIC);
    var value_kread_len = Blockly.xrplhook.valueToCode(block, 'kread_len', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'state('+value_write_ptr+','+value_write_len+','+value_kread_ptr+','+value_kread_len+')';
    return [code, Blockly.xrplhook.ORDER_NONE];
  };
  
  Blockly.xrplhook['state_set'] = function(block) {
    var value_read_ptr = Blockly.xrplhook.valueToCode(block, 'read_ptr', Blockly.xrplhook.ORDER_ATOMIC);
    var value_read_len = Blockly.xrplhook.valueToCode(block, 'read_len', Blockly.xrplhook.ORDER_ATOMIC);
    var value_kread_ptr = Blockly.xrplhook.valueToCode(block, 'kread_ptr', Blockly.xrplhook.ORDER_ATOMIC);
    var value_kread_len = Blockly.xrplhook.valueToCode(block, 'kread_len', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'state_set('+value_read_ptr+','+value_read_len+','+value_kread_ptr+','+value_kread_len+')';
    return [code, Blockly.xrplhook.ORDER_NONE];
  };

  Blockly.xrplhook['state_foreign'] = function(block) {
    var value_write_ptr = Blockly.xrplhook.valueToCode(block, 'write_ptr', Blockly.xrplhook.ORDER_ATOMIC);
    var value_write_len = Blockly.xrplhook.valueToCode(block, 'write_len', Blockly.xrplhook.ORDER_ATOMIC);
    var value_kread_ptr = Blockly.xrplhook.valueToCode(block, 'kread_ptr', Blockly.xrplhook.ORDER_ATOMIC);
    var value_kread_len = Blockly.xrplhook.valueToCode(block, 'kread_len', Blockly.xrplhook.ORDER_ATOMIC);
    var value_aread_ptr = Blockly.xrplhook.valueToCode(block, 'aread_ptr', Blockly.xrplhook.ORDER_ATOMIC);
    var value_aread_len = Blockly.xrplhook.valueToCode(block, 'aread_len', Blockly.xrplhook.ORDER_ATOMIC);
    
    var code = 'state_foreign('+value_write_ptr+','+value_write_len+','+value_kread_ptr+','+
    value_kread_len+','+value_aread_ptr+','+value_aread_len+')';

    return [code, Blockly.xrplhook.ORDER_NONE];
  };



 

   
   