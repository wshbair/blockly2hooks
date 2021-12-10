/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Originating transaction functions
 *     https://xrpl-hooks.readme.io/reference/hook
 *     ToDo add proper Type check
 */
 'use strict';

 goog.provide('Blockly.xrplhook.otxn'); 
 goog.require('Blockly.xrplhook');

 Blockly.xrplhook['otxn_burden'] = function(block) {
    var code = 'otxn_burden()';
    return [code, Blockly.xrplhook.ORDER_NONE];
  };

  Blockly.xrplhook['otxn_field'] = function(block) {
    var value_write_ptr = Blockly.xrplhook.valueToCode(block, 'write_ptr', Blockly.xrplhook.ORDER_ATOMIC);
    var value_field_id = Blockly.xrplhook.valueToCode(block, 'field_id', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'otxn_field('+value_write_ptr+','+value_field_id+')';
    return [code, Blockly.xrplhook.ORDER_NONE];
  };

  Blockly.xrplhook['otxn_field_txt'] = function(block) {
    var value_write_ptr = Blockly.xrplhook.valueToCode(block, 'write_ptr', Blockly.xrplhook.ORDER_ATOMIC);
    var value_write_len = Blockly.xrplhook.valueToCode(block, 'write_len', Blockly.xrplhook.ORDER_ATOMIC);
    var value_field_id = Blockly.xrplhook.valueToCode(block, 'field_id', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'otxn_field_txt('+value_write_ptr+','+value_write_len+','+value_field_id+')';
    return [code, Blockly.xrplhook.ORDER_NONE];
  };

  Blockly.xrplhook['otxn_generation'] = function(block) {
    var code = 'otxn_generation()';
    return [code, Blockly.xrplhook.ORDER_NONE];
  };

  Blockly.xrplhook['otxn_type'] = function(block) {
    var code = 'otxn_type()';
    return [code, Blockly.xrplhook.ORDER_NONE];
  };
  
  Blockly.xrplhook['otxn_id'] = function(block) {
    var value_write_ptr = Blockly.xrplhook.valueToCode(block, 'write_ptr', Blockly.xrplhook.ORDER_ATOMIC);
    var value_write_len = Blockly.xrplhook.valueToCode(block, 'write_len', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'otxn_id('+value_write_ptr+','+value_write_len+')';
    return [code, Blockly.xrplhook.ORDER_NONE];
  };
  
  Blockly.xrplhook['otxn_slot'] = function(block) {
    var value_slot_no = Blockly.xrplhook.valueToCode(block, 'slot_no', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'otxn_slot('+value_slot_no+')';
    return [code, Blockly.xrplhook.ORDER_NONE];
  };


