/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Code generator for Control functions .
 *     https://xrpl-hooks.readme.io/reference/hook
 */
 'use strict';

 goog.provide('Blockly.xrplhook.controls'); 
 goog.require('Blockly.xrplhook');

 Blockly.xrplhook['control_accept'] = function(block) {
    var value_read_ptr = Blockly.xrplhook.valueToCode(block, 'read_ptr', Blockly.xrplhook.ORDER_ATOMIC);
    var value_error_code = Blockly.xrplhook.valueToCode(block, 'error_code', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'accept('+value_read_ptr+','+value_error_code+');\n';
    return code;
  };

  Blockly.xrplhook['control_rollback'] = function(block) {
    var value_read_ptr = Blockly.xrplhook.valueToCode(block, 'read_ptr', Blockly.xrplhook.ORDER_ATOMIC);
    var value_error_code = Blockly.xrplhook.valueToCode(block, 'error_code', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'rollback('+value_read_ptr+','+value_error_code+');\n';
    return code;
  };


  