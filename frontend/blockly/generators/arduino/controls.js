/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Code generator for Control functions .
 *     https://xrpl-hooks.readme.io/reference/hook
 */
 'use strict';

 goog.provide('Blockly.Arduino.controls'); 
 goog.require('Blockly.Arduino');

 Blockly.Arduino['control_accept'] = function(block) {
    //Blockly.Arduino.addInclude('hooks', '#include "../hookapi.h"');
    //Blockly.Arduino.addInclude('accept', 'extern int64_t accept(uint32_t read_ptr, uint32_t read_len, int64_t error_code);');
    var value_read_ptr = Blockly.Arduino.valueToCode(block, 'read_ptr', Blockly.Arduino.ORDER_ATOMIC);
    var value_error_code = Blockly.Arduino.valueToCode(block, 'error_code', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'accept('+value_read_ptr+','+value_error_code+');\n';
    return code;
  };

  Blockly.Arduino['control_rollback'] = function(block) {
    //Blockly.Arduino.addInclude('control_rollback', 'extern int64_t rollback (uint32_t read_ptr, uint32_t read_len, int64_t error_code);');
    var value_read_ptr = Blockly.Arduino.valueToCode(block, 'read_ptr', Blockly.Arduino.ORDER_ATOMIC);
    var value_error_code = Blockly.Arduino.valueToCode(block, 'error_code', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'rolleback('+value_read_ptr+','+value_error_code+');\n';
    return code;
  };


  