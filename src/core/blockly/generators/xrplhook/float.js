/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Float functions
 *     https://xrpl-hooks.readme.io/reference/hook
 *     ToDo add proper Type check
 */
 'use strict';

 goog.provide('Blockly.xrplhook.float'); 
 goog.require('Blockly.xrplhook');

 Blockly.xrplhook['float_set'] = function(block) {
    var value_exponent = Blockly.xrplhook.valueToCode(block, 'exponent', Blockly.xrplhook.ORDER_ATOMIC);
    var value_mantissa = Blockly.xrplhook.valueToCode(block, 'mantissa', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'float_set('+value_exponent+','+value_mantissa+')';
    return [code, Blockly.xrplhook.ORDER_NONE];
  };

  Blockly.xrplhook['float_multiply'] = function(block) {
    var value_float1 = Blockly.xrplhook.valueToCode(block, 'float1', Blockly.xrplhook.ORDER_ATOMIC);
    var value_float2 = Blockly.xrplhook.valueToCode(block, 'float2', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'float_multiply('+value_float1+','+value_float2+')';
    return [code, Blockly.xrplhook.ORDER_NONE];
  };

  Blockly.xrplhook['float_mulratio'] = function(block) {
    var value_float1 = Blockly.xrplhook.valueToCode(block, 'float1', Blockly.xrplhook.ORDER_ATOMIC);
    var value_round_up = Blockly.xrplhook.valueToCode(block, 'round_up', Blockly.xrplhook.ORDER_ATOMIC);
    var value_numerator = Blockly.xrplhook.valueToCode(block, 'numerator', Blockly.xrplhook.ORDER_ATOMIC);
    var value_denominator = Blockly.xrplhook.valueToCode(block, 'denominator', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'float_mulratio('+value_float1+','+value_round_up+','+value_numerator+','+
    value_denominator+')';
    return [code, Blockly.xrplhook.ORDER_NONE];
  };

  Blockly.xrplhook['float_negate'] = function(block) {
    var value_float1 = Blockly.xrplhook.valueToCode(block, 'float1', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'float_negate('+value_float1+')';
    return [code, Blockly.xrplhook.ORDER_NONE];
  };

  Blockly.xrplhook['float_compare'] = function(block) {
    var value_float1 = Blockly.xrplhook.valueToCode(block, 'float1', Blockly.xrplhook.ORDER_ATOMIC);
    var value_float2 = Blockly.xrplhook.valueToCode(block, 'float2', Blockly.xrplhook.ORDER_ATOMIC);
    var value_mode = Blockly.xrplhook.valueToCode(block, 'mode', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'float_compare('+value_float1+','+value_float2+','+value_mode+')';
    return [code, Blockly.xrplhook.ORDER_NONE];
  };

  Blockly.xrplhook['float_sum'] = function(block) {
    var value_float1 = Blockly.xrplhook.valueToCode(block, 'float1', Blockly.xrplhook.ORDER_ATOMIC);
    var value_float2 = Blockly.xrplhook.valueToCode(block, 'float2', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'float_sum('+value_float1+','+value_float2+')';
    return [code, Blockly.xrplhook.ORDER_NONE];
  };

  Blockly.xrplhook['float_sto'] = function(block) {
    var value_write_ptr = Blockly.xrplhook.valueToCode(block, 'write_ptr', Blockly.xrplhook.ORDER_ATOMIC);
    var value_write_len = Blockly.xrplhook.valueToCode(block, 'write_len', Blockly.xrplhook.ORDER_ATOMIC);
    var value_cread_ptr = Blockly.xrplhook.valueToCode(block, 'cread_ptr', Blockly.xrplhook.ORDER_ATOMIC);
    var value_cread_len = Blockly.xrplhook.valueToCode(block, 'cread_len', Blockly.xrplhook.ORDER_ATOMIC);
    var value_iread_ptr = Blockly.xrplhook.valueToCode(block, 'iread_ptr', Blockly.xrplhook.ORDER_ATOMIC);
    var value_float1 = Blockly.xrplhook.valueToCode(block, 'float1', Blockly.xrplhook.ORDER_ATOMIC);
    var value_field_code = Blockly.xrplhook.valueToCode(block, 'field_code', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'float_sto('+value_write_ptr+','+value_write_len+','+value_cread_ptr+','+
    value_cread_len+','+value_iread_ptr+','+value_float1+','+value_field_code+')';
    return [code, Blockly.xrplhook.ORDER_NONE];
  };
  
  Blockly.xrplhook['float_sto_set'] = function(block) {
    var value_read_ptr = Blockly.xrplhook.valueToCode(block, 'read_ptr', Blockly.xrplhook.ORDER_ATOMIC);
    var value_read_len = Blockly.xrplhook.valueToCode(block, 'read_len', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'float_sto_set('+value_read_ptr+','+value_read_len+')';
    return [code, Blockly.xrplhook.ORDER_NONE];
  };
  
  Blockly.xrplhook['float_invert'] = function(block) {
    var value_float1 = Blockly.xrplhook.valueToCode(block, 'float1', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'float_invert('+value_float1+')';
    return [code, Blockly.xrplhook.ORDER_NONE];
  };

  Blockly.xrplhook['float_divide'] = function(block) {
    var value_float1 = Blockly.xrplhook.valueToCode(block, 'float1', Blockly.xrplhook.ORDER_ATOMIC);
    var value_float2 = Blockly.xrplhook.valueToCode(block, 'float2', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'float_divide('+value_float1+','+value_float2+')';
    return [code, Blockly.xrplhook.ORDER_NONE];
  };

  Blockly.xrplhook['float_one'] = function(block) {
    var code = 'float_one()';
    return [code, Blockly.xrplhook.ORDER_NONE];
  };

  Blockly.xrplhook['float_exponent'] = function(block) {
    var value_float1 = Blockly.xrplhook.valueToCode(block, 'float1', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'float_exponent('+value_float1+')';
    return [code, Blockly.xrplhook.ORDER_NONE];
  };

  Blockly.xrplhook['float_mantissa'] = function(block) {
    var value_float1 = Blockly.xrplhook.valueToCode(block, 'float1', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'float_mantissa('+value_float1+')';
    return [code, Blockly.xrplhook.ORDER_NONE];
  };
  
  Blockly.xrplhook['float_sign'] = function(block) {
    var value_float1 = Blockly.xrplhook.valueToCode(block, 'float1', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'float_sign('+value_float1+')';
    return [code, Blockly.xrplhook.ORDER_NONE];
  };

  Blockly.xrplhook['float_exponent_set'] = function(block) {
    var value_float1 = Blockly.xrplhook.valueToCode(block, 'float1', Blockly.xrplhook.ORDER_ATOMIC);
    var value_exponent = Blockly.xrplhook.valueToCode(block, 'exponent', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'float_exponent_set('+value_float1+','+value_exponent+')';
    return [code, Blockly.xrplhook.ORDER_NONE];
  };

  Blockly.xrplhook['float_mantissa_set'] = function(block) {
    var value_float1 = Blockly.xrplhook.valueToCode(block, 'float1', Blockly.xrplhook.ORDER_ATOMIC);
    var value_mantissa = Blockly.xrplhook.valueToCode(block, 'mantissa', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'float_mantissa_set('+value_float1+','+value_mantissa+')';
    return [code, Blockly.xrplhook.ORDER_NONE];
  };

  Blockly.xrplhook['float_sign_set'] = function(block) {
    var value_float1 = Blockly.xrplhook.valueToCode(block, 'float1', Blockly.xrplhook.ORDER_ATOMIC);
    var value_sign = Blockly.xrplhook.valueToCode(block, 'sign', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'float_sign_set('+value_float1+','+value_sign+')';
    return [code, Blockly.xrplhook.ORDER_NONE];
  };

  Blockly.xrplhook['float_int'] = function(block) {
    var value_float1 = Blockly.xrplhook.valueToCode(block, 'float1', Blockly.xrplhook.ORDER_ATOMIC);
    var value_decimal_places = Blockly.xrplhook.valueToCode(block, 'decimal_places', Blockly.xrplhook.ORDER_ATOMIC);
    var value_absolute = Blockly.xrplhook.valueToCode(block, 'absolute', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'float_int('+value_float1+','+value_decimal_places+','+value_absolute+')';
    return [code, Blockly.xrplhook.ORDER_NONE];
  };