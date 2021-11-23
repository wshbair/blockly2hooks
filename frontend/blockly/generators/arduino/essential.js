/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Essential Blocks
 *     https://xrpl-hooks.readme.io/reference/hook
 *     ToDo add proper Type check
 */
 'use strict';

 goog.provide('Blockly.Arduino.essential'); 
 goog.require('Blockly.Arduino');

 Blockly.Arduino['guard'] = function(block) {
    //Blockly.Arduino.addDeclaration("guard",'#define GUARD(maxiter)')
    var value_arg1 = Blockly.Arduino.valueToCode(block, 'arg1', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'GUARD('+value_arg1+');\n';
    return code;
  };
  Blockly.Arduino['_g_function'] = function(block) {
    //Blockly.Arduino.addInclude('_g', 'extern int32_t _g (uint32_t id, uint32_t maxiter);');
    var value_arg1 = Blockly.Arduino.valueToCode(block, 'arg1', Blockly.Arduino.ORDER_ATOMIC);
    var value_arg2 = Blockly.Arduino.valueToCode(block, 'arg2', Blockly.Arduino.ORDER_ATOMIC);
    var code = '_g('+value_arg1+','+value_arg2+');\n';
    return code;
  };

  Blockly.Arduino['comment'] = function(block) {
    var code = block.getTitleValue('TEXT');
    return '// ' + code+'\n';
  };

  /**
 * Code generator to add code into the cbak() and hook() functions.
 * Its use is mandatory, and no other functions are accepted.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['hook_template'] = function(block) {
    //Blockly.Arduino.addInclude('stdint','#include <stdint.h>')
    function statementToCodeNoTab(block, name) {
      var targetBlock = block.getInputTargetBlock(name);
      var code = Blockly.Arduino.blockToCode(targetBlock);
      if (!goog.isString(code)) {
        throw 'Expecting code from statement block "' + targetBlock.type + '".';
      }
      return code;
    }
  
    var setupBranch = Blockly.Arduino.statementToCode(block, 'SETUP_FUNC');
    //var setupCode = Blockly.Arduino.scrub_(block, setupBranch); No comment block
    if (setupBranch) {
      Blockly.Arduino.addSetup('userSetupCode', setupBranch, true);
    }
  
    var loopBranch = statementToCodeNoTab(block, 'LOOP_FUNC');
    //var loopcode = Blockly.Arduino.scrub_(block, loopBranch); No comment block
    return loopBranch;
  };

  Blockly.Arduino['tracevar'] = function(block) {
   // Blockly.Arduino.addInclude('trace_num','extern int64_t trace_num(uint32_t read_ptr,   uint32_t read_len,   int64_t number);')
   // Blockly.Arduino.addDeclaration('TRACEVAR','#define TRACEVAR(v) trace_num((uint32_t)(#v), (uint32_t)(sizeof(#v)), (int64_t)v)');
   // Blockly.Arduino.addInclude('trace', 'extern int64_t trace(uint32_t mread_ptr, uint32_t mread_len,uint32_t dread_ptr, uint32_t dread_len,   uint32_t as_hex);')
    var value_tracevar = Blockly.Arduino.valueToCode(block, 'TRACEVAR', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'TRACEVAR('+value_tracevar+');\n';
    return code;
  };
  Blockly.Arduino['TRACESTR'] = function(block) {
    //Blockly.Arduino.addDeclaration('TRACESTR','#define TRACESTR(v) trace((uint32_t)(#v), (uint32_t)(sizeof(#v)), (uint32_t)(v), sizeof(v), 0)');
    //Blockly.Arduino.addInclude('trace', 'extern int64_t trace(uint32_t mread_ptr, uint32_t mread_len,uint32_t dread_ptr, uint32_t dread_len, uint32_t as_hex);')
    var msg = block.getTitleValue('TEXT');
    var code = 'TRACESTR("'+msg+'");\n';
    return code;
  };

  Blockly.Arduino['sbuf'] = function(block) {
    //Blockly.Arduino.addDeclaration('sbuf','#define SBUF(str) (uint32_t)(str), sizeof(str)')
    var value_sbuf = Blockly.Arduino.valueToCode(block, 'SBUF', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'SBUF('+value_sbuf+')';
    return [code, Blockly.Arduino.ORDER_NONE];
  };

  Blockly.Arduino['buffer_equal'] = function(block) {
    var value_equal = Blockly.Arduino.valueToCode(block, 'equal', Blockly.Arduino.ORDER_ATOMIC);
    var value_hook_accid = Blockly.Arduino.valueToCode(block, 'hook_accid', Blockly.Arduino.ORDER_ATOMIC);
    var value_account_field = Blockly.Arduino.valueToCode(block, 'account_field', Blockly.Arduino.ORDER_ATOMIC);
    var value_length = Blockly.Arduino.valueToCode(block, 'length', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'BUFFER_EQUAL('+value_equal+','+value_hook_accid+','+value_account_field+','+value_length+');\n';
    return code;
  };

  Blockly.Arduino['etxn_reserve'] = function(block) {
    //Blockly.Arduino.addInclude('etxn_reserve', 'extern int64_t etxn_reserve(uint32_t count);');
    var value_num = Blockly.Arduino.valueToCode(block, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
    var code = '//before we start calling hook-api functions we should tell the hook how many tx we intend to create\n'+
               'etxn_reserve('+value_num+');\n';
    return code;
  };

  Blockly.Arduino['clearbuf'] = function(block) {
    var value_buffer = Blockly.Arduino.valueToCode(block, 'buffer', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'CLEARBUF('+value_buffer+');\n';
    return code;
  };

  Blockly.Arduino['sub_offset'] = function(block) {
    var value_sub_offset = Blockly.Arduino.valueToCode(block, 'SUB_OFFSET', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'SUB_OFFSET('+value_sub_offset+')';
    return [code, Blockly.Arduino.ORDER_NONE];
  };

  Blockly.Arduino['uint32_from_buf'] = function(block) {
    var value_buffer_input = Blockly.Arduino.valueToCode(block, 'buffer_input', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'UINT32_FROM_BUF('+value_buffer_input+')';
    return [code, Blockly.Arduino.ORDER_NONE];
  };

  Blockly.Arduino['loops_for'] = function(block) {
    //Blockly.Arduino.addDeclaration("guard",'#define GUARD(maxiter) _g(__LINE__, (maxiter)+1)');
    var variable_var0 = Blockly.Arduino.variableDB_.getName(block.getFieldValue('var0'), Blockly.Variables.NAME_TYPE);
    var value_arg0 = Blockly.Arduino.valueToCode(block, 'arg0', Blockly.Arduino.ORDER_ATOMIC);
    var value_arg1 = Blockly.Arduino.valueToCode(block, 'arg1', Blockly.Arduino.ORDER_ATOMIC);
    var value_arg2 = Blockly.Arduino.valueToCode(block, 'arg2', Blockly.Arduino.ORDER_ATOMIC);
    var statements_name = Blockly.Arduino.statementToCode(block, 'NAME');

    var code = 'for (int ' + variable_var0 + ' = ' + value_arg0 + '; GUARD('+value_arg1+'),' +
    variable_var0 + ' <' + value_arg1 + '; ++'+variable_var0;
    code += ') {\n' + statements_name + '}\n';
    return code;
  };

  Blockly.Arduino['hook_account'] = function(block) {
    var value_var = Blockly.Arduino.valueToCode(block, 'VAR', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'hook_account('+value_var+')';
    return [code, Blockly.Arduino.ORDER_NONE];

  };

  Blockly.Arduino['sfcodes'] = function(block) {
    var dropdown_value = block.getFieldValue('VALUE');
    console.log(dropdown_value)
    var code = dropdown_value;
    return [code, Blockly.Arduino.ORDER_NONE];
  };
  
  Blockly.Arduino['amount_to_drops'] = function(block) {
    var value_amount = Blockly.Arduino.valueToCode(block, 'AMOUNT', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'AMOUNT_TO_DROPS('+value_amount+')';
    return [code, Blockly.Arduino.ORDER_NONE];
  };
  
  Blockly.Arduino['macro_prepare_payment_simple'] = function(block) {
    var value_buf_out = Blockly.Arduino.valueToCode(block, 'buf_out', Blockly.Arduino.ORDER_ATOMIC);
    var value_drops_amount = Blockly.Arduino.valueToCode(block, 'drops_amount', Blockly.Arduino.ORDER_ATOMIC);
    var value_drops_fee = Blockly.Arduino.valueToCode(block, 'drops_fee', Blockly.Arduino.ORDER_ATOMIC);
    var value_to_address = Blockly.Arduino.valueToCode(block, 'to_address', Blockly.Arduino.ORDER_ATOMIC);
    var value_dest_tag = Blockly.Arduino.valueToCode(block, 'dest_tag', Blockly.Arduino.ORDER_ATOMIC);
    var value_src_tag = Blockly.Arduino.valueToCode(block, 'src_tag', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'PREPARE_PAYMENT_SIMPLE('+value_buf_out+','+value_drops_amount+','+value_drops_fee+','+value_to_address+','+value_dest_tag+','+value_src_tag+');\n';
    return code;
  };

  Blockly.Arduino['return_val'] = function(block) {
    var value_var = Blockly.Arduino.valueToCode(block, 'VAR', Blockly.Arduino.ORDER_ATOMIC);
    // TODO: Assemble Arduino into code variable.
    var code = 'retrun('+value_var+');\n';
    return code;
  };
