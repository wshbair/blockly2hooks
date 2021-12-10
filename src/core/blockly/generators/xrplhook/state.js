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

 goog.provide('Blockly.xrplhook.state'); 
 goog.require('Blockly.xrplhook');

 Blockly.xrplhook['state'] = function(block) {
    var value_write_ptr = Blockly.xrplhook.valueToCode(block, 'write_ptr', Blockly.xrplhook.ORDER_ATOMIC);
    var value_kread_ptr = Blockly.xrplhook.valueToCode(block, 'kread_ptr', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'state('+value_write_ptr+','+value_kread_ptr+')';
    return [code, Blockly.xrplhook.ORDER_NONE];
  };
  
  Blockly.xrplhook['state_set'] = function(block) {
    var value_read_ptr = Blockly.xrplhook.valueToCode(block, 'read_ptr', Blockly.xrplhook.ORDER_ATOMIC);
    var value_kread_ptr = Blockly.xrplhook.valueToCode(block, 'kread_ptr', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'state_set('+value_read_ptr+','+value_kread_ptr+')';
    return [code, Blockly.xrplhook.ORDER_NONE];
  };

  Blockly.xrplhook['state_foreign'] = function(block) {
    var value_write_ptr = Blockly.xrplhook.valueToCode(block, 'write_ptr', Blockly.xrplhook.ORDER_ATOMIC);
    var value_kread_ptr = Blockly.xrplhook.valueToCode(block, 'kread_ptr', Blockly.xrplhook.ORDER_ATOMIC);
    var value_aread_ptr = Blockly.xrplhook.valueToCode(block, 'aread_ptr', Blockly.xrplhook.ORDER_ATOMIC);    
    var code = 'state_foreign('+value_write_ptr+','+value_kread_ptr+','+value_aread_ptr+')';

    return [code, Blockly.xrplhook.ORDER_NONE];
  };



 

   
   