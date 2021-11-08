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

 goog.provide('Blockly.Arduino.state'); 
 goog.require('Blockly.Arduino');

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



 

   
   