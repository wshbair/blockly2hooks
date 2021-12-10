/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Code generator for utilites functions .
 *     https://xrpl-hooks.readme.io/reference/hook
 */
 'use strict';

 goog.provide('Blockly.xrplhook.utilities'); 
 goog.require('Blockly.xrplhook');

Blockly.xrplhook['util_raddr'] = function(block) {
    var value_write_ptr = Blockly.xrplhook.valueToCode(block, 'write_ptr', Blockly.xrplhook.ORDER_ATOMIC);
     var value_read_ptr = Blockly.xrplhook.valueToCode(block, 'read_ptr', Blockly.xrplhook.ORDER_ATOMIC);
     var code = 'util_raddr('+value_write_ptr+','+value_read_ptr+')';
    return [code, Blockly.xrplhook.ORDER_NONE];
  };

  Blockly.xrplhook['util_accid'] = function(block) {
    var value_write_ptr = Blockly.xrplhook.valueToCode(block, 'write_ptr', Blockly.xrplhook.ORDER_ATOMIC);
    var value_read_ptr = Blockly.xrplhook.valueToCode(block, 'read_ptr', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'util_accid('+value_write_ptr+','+value_read_ptr+')';
    return [code, Blockly.xrplhook.ORDER_NONE];
  };

  Blockly.xrplhook['util_verify'] = function(block) {
    var value_dread_ptr = Blockly.xrplhook.valueToCode(block, 'dread_ptr', Blockly.xrplhook.ORDER_ATOMIC);
    var value_sread_ptr = Blockly.xrplhook.valueToCode(block, 'sread_ptr', Blockly.xrplhook.ORDER_ATOMIC);
    var value_kread_ptr = Blockly.xrplhook.valueToCode(block, 'kread_ptr', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'util_verify('+value_dread_ptr+','+value_sread_ptr+','+value_kread_ptr+')';
    return [code, Blockly.xrplhook.ORDER_NONE];
  };

Blockly.xrplhook['util_sha512h'] = function(block) {
  var value_write_ptr = Blockly.xrplhook.valueToCode(block, 'write_ptr', Blockly.xrplhook.ORDER_ATOMIC);
  var value_read_ptr = Blockly.xrplhook.valueToCode(block, 'read_ptr', Blockly.xrplhook.ORDER_ATOMIC);
  var code = 'util_sha512h('+value_write_ptr+','+value_read_ptr+')';
  return [code, Blockly.xrplhook.ORDER_NONE];
};

Blockly.xrplhook['util_keylet'] = function(block) {
  var value_write_ptr = Blockly.xrplhook.valueToCode(block, 'write_ptr', Blockly.xrplhook.ORDER_ATOMIC);
  var value_keylet_type = Blockly.xrplhook.valueToCode(block, 'keylet_type', Blockly.xrplhook.ORDER_ATOMIC);
  var value_a = Blockly.xrplhook.valueToCode(block, 'a', Blockly.xrplhook.ORDER_ATOMIC);
  var value_b = Blockly.xrplhook.valueToCode(block, 'b', Blockly.xrplhook.ORDER_ATOMIC);
  var value_c = Blockly.xrplhook.valueToCode(block, 'c', Blockly.xrplhook.ORDER_ATOMIC);
  var value_d = Blockly.xrplhook.valueToCode(block, 'd', Blockly.xrplhook.ORDER_ATOMIC);
  var value_e = Blockly.xrplhook.valueToCode(block, 'e', Blockly.xrplhook.ORDER_ATOMIC);
  var value_f = Blockly.xrplhook.valueToCode(block, 'f', Blockly.xrplhook.ORDER_ATOMIC);
  var code = 'util_keylet('+value_write_ptr+','+value_keylet_type+','+
                            value_a+','+value_b+','+value_c+','+value_d+','+value_e+','+value_f+')';
  return [code, Blockly.xrplhook.ORDER_NONE];
};

