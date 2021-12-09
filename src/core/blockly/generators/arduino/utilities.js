/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Code generator for utilites functions .
 *     https://xrpl-hooks.readme.io/reference/hook
 */
 'use strict';

 goog.provide('Blockly.Arduino.utilities'); 
 goog.require('Blockly.Arduino');

Blockly.Arduino['util_raddr'] = function(block) {
    var value_write_ptr = Blockly.Arduino.valueToCode(block, 'write_ptr', Blockly.Arduino.ORDER_ATOMIC);
     var value_read_ptr = Blockly.Arduino.valueToCode(block, 'read_ptr', Blockly.Arduino.ORDER_ATOMIC);
     var code = 'util_raddr('+value_write_ptr+','+value_read_ptr+')';
    return [code, Blockly.Arduino.ORDER_NONE];
  };

  Blockly.Arduino['util_accid'] = function(block) {
    var value_write_ptr = Blockly.Arduino.valueToCode(block, 'write_ptr', Blockly.Arduino.ORDER_ATOMIC);
    var value_read_ptr = Blockly.Arduino.valueToCode(block, 'read_ptr', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'util_accid('+value_write_ptr+','+value_read_ptr+')';
    return [code, Blockly.Arduino.ORDER_NONE];
  };

  Blockly.Arduino['util_verify'] = function(block) {
    var value_dread_ptr = Blockly.Arduino.valueToCode(block, 'dread_ptr', Blockly.Arduino.ORDER_ATOMIC);
    var value_sread_ptr = Blockly.Arduino.valueToCode(block, 'sread_ptr', Blockly.Arduino.ORDER_ATOMIC);
    var value_kread_ptr = Blockly.Arduino.valueToCode(block, 'kread_ptr', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'util_verify('+value_dread_ptr+','+value_sread_ptr+','+value_kread_ptr+')';
    return [code, Blockly.Arduino.ORDER_NONE];
  };

Blockly.Arduino['util_sha512h'] = function(block) {
  var value_write_ptr = Blockly.Arduino.valueToCode(block, 'write_ptr', Blockly.Arduino.ORDER_ATOMIC);
  var value_read_ptr = Blockly.Arduino.valueToCode(block, 'read_ptr', Blockly.Arduino.ORDER_ATOMIC);
  var code = 'util_sha512h('+value_write_ptr+','+value_read_ptr+')';
  return [code, Blockly.Arduino.ORDER_NONE];
};

Blockly.Arduino['util_keylet'] = function(block) {
  var value_write_ptr = Blockly.Arduino.valueToCode(block, 'write_ptr', Blockly.Arduino.ORDER_ATOMIC);
  var value_keylet_type = Blockly.Arduino.valueToCode(block, 'keylet_type', Blockly.Arduino.ORDER_ATOMIC);
  var value_a = Blockly.Arduino.valueToCode(block, 'a', Blockly.Arduino.ORDER_ATOMIC);
  var value_b = Blockly.Arduino.valueToCode(block, 'b', Blockly.Arduino.ORDER_ATOMIC);
  var value_c = Blockly.Arduino.valueToCode(block, 'c', Blockly.Arduino.ORDER_ATOMIC);
  var value_d = Blockly.Arduino.valueToCode(block, 'd', Blockly.Arduino.ORDER_ATOMIC);
  var value_e = Blockly.Arduino.valueToCode(block, 'e', Blockly.Arduino.ORDER_ATOMIC);
  var value_f = Blockly.Arduino.valueToCode(block, 'f', Blockly.Arduino.ORDER_ATOMIC);
  var code = 'util_keylet('+value_write_ptr+','+value_keylet_type+','+
                            value_a+','+value_b+','+value_c+','+value_d+','+value_e+','+value_f+')';
  return [code, Blockly.Arduino.ORDER_NONE];
};

