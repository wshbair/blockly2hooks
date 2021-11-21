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
    // Blockly.Arduino.addDeclaration('BUFFER_EQUAL_GUARD',"#define BUFFER_EQUAL_GUARD(output, buf1, buf1len, buf2, buf2len, n)\\"+
    // "{\\"+
    // "    output = ((buf1len) == (buf2len) ? 1 : 0);\\"+
    // "    for (int x = 0; GUARDM( (buf2len) * (n), 1 ), x < (buf2len);\\"+
    // "         ++x)\\"+
    // "    {\\"+
    // "        if ((buf1)[x] != (buf2)[x])\\"+
    // "        {\\"+
    // "            output = 0;\\"+
    // "            break;\\"+
    // "        }\\"+
    // "    }\\"+
    // "}")
    // Blockly.Arduino.addDeclaration('buffer_equal', "#define BUFFER_EQUAL(output, buf1, buf2, compare_len) "+
    // "BUFFER_EQUAL_GUARD(output, buf1, compare_len, buf2, compare_len, 1)")
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
    //Blockly.Arduino.addInclude('hook_account', 'extern int64_t hook_account (uint32_t write_ptr, uint32_t write_len);');
    var value_arg1 = Blockly.Arduino.valueToCode(block, 'ARG1', Blockly.Arduino.ORDER_ATOMIC);
    var value_arg2 = Blockly.Arduino.valueToCode(block, 'ARG2', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'hook_account('+value_arg1+','+value_arg2+');\n';
    return code;
  };

  Blockly.Arduino['sfcodes'] = function(block) {
    var dropdown_value = block.getFieldValue('VALUE');
    console.log(dropdown_value)
    var code = dropdown_value;
    return [code, Blockly.Arduino.ORDER_NONE];
  };
  
  Blockly.Arduino['amount_to_drops'] = function(block) {
    // Blockly.Arduino.addDeclaration('AMOUNT_TO_DROPS', 
    // "// returns an in64_t, negative if error, non-negative if valid drops\n"+
    // "#define AMOUNT_TO_DROPS(amount_buffer)\\"+
    // "(((amount_buffer)[0] >> 7) ? -2 : (\\"+
    // "((((uint64_t)((amount_buffer)[0])) & 0xb00111111) << 56) +\\"+
    // "(((uint64_t)((amount_buffer)[1])) << 48) +\\"+
    // "(((uint64_t)((amount_buffer)[2])) << 40) +\\"+
    // "(((uint64_t)((amount_buffer)[3])) << 32) +\\"+
    // "(((uint64_t)((amount_buffer)[4])) << 24) +\\"+
    // "(((uint64_t)((amount_buffer)[5])) << 16) +\\"+
    // "(((uint64_t)((amount_buffer)[6])) <<  8) +\\"+
    // "(((uint64_t)((amount_buffer)[7])))))"
    // )
    var value_amount = Blockly.Arduino.valueToCode(block, 'AMOUNT', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'AMOUNT_TO_DROPS('+value_amount+')';
    return [code, Blockly.Arduino.ORDER_NONE];
  };
  
  Blockly.Arduino['macro_prepare_payment_simple'] = function(block) {
    // Blockly.Arduino.addDeclaration('prepare_payment_simple', 
    // "#define PREPARE_PAYMENT_SIMPLE(buf_out_master, drops_amount_raw, drops_fee_raw, to_address, dest_tag_raw, src_tag_raw)\\"+
    // "{\\"+
    // "    uint8_t* buf_out = buf_out_master;\\"+
    // "    uint8_t acc[20];\\"+
    // "    uint64_t drops_amount = (drops_amount_raw);\\"+
    // "    uint64_t drops_fee = (drops_fee_raw);\\"+
    // "    uint32_t dest_tag = (dest_tag_raw);\\"+
    // "    uint32_t src_tag = (src_tag_raw);\\"+
    // "    uint32_t cls = (uint32_t)ledger_seq();\\"+
    // "    hook_account(SBUF(acc));\\"+
    // "    _01_02_ENCODE_TT                   (buf_out, ttPAYMENT );      /* uint16  | size   3 */ \\"+
    // "    _02_02_ENCODE_FLAGS                (buf_out, tfCANONICAL);      /* uint32  | size   5 */ \\"+
    // "    _02_03_ENCODE_TAG_SRC              (buf_out, src_tag);      /* uint32  | size   5 */ \\"+
    // "    _02_04_ENCODE_SEQUENCE             (buf_out, 0);      /* uint32  | size   5 */ \\"+
    // "    _02_14_ENCODE_TAG_DST              (buf_out, dest_tag);      /* uint32  | size   5 */ \\"+
    // "    _02_26_ENCODE_FLS                  (buf_out, cls + 1);      /* uint32  | size   6 */ \\"+
    // "    _02_27_ENCODE_LLS                  (buf_out, cls + 5);      /* uint32  | size   6 */ \\"+
    // "    _06_01_ENCODE_DROPS_AMOUNT         (buf_out, drops_amount);      /* amount  | size   9 */ \\"+
    // "    _06_08_ENCODE_DROPS_FEE            (buf_out, drops_fee);      /* amount  | size   9 */ \\"+
    // "    _07_03_ENCODE_SIGNING_PUBKEY_NULL  (buf_out);      /* pk      | size  35 */ \\"+
    // "    _08_01_ENCODE_ACCOUNT_SRC          (buf_out, acc);      /* account | size  22 */ \\"+
    // "    _08_03_ENCODE_ACCOUNT_DST          (buf_out, to_address);      /* account | size  22 */ \\"+
    // "    etxn_details((uint32_t)buf_out, 105); /* emitdet | size 105 */ \\"+
    // "}"
    // )
    var value_buf_out = Blockly.Arduino.valueToCode(block, 'buf_out', Blockly.Arduino.ORDER_ATOMIC);
    var value_drops_amount = Blockly.Arduino.valueToCode(block, 'drops_amount', Blockly.Arduino.ORDER_ATOMIC);
    var value_drops_fee = Blockly.Arduino.valueToCode(block, 'drops_fee', Blockly.Arduino.ORDER_ATOMIC);
    var value_to_address = Blockly.Arduino.valueToCode(block, 'to_address', Blockly.Arduino.ORDER_ATOMIC);
    var value_dest_tag = Blockly.Arduino.valueToCode(block, 'dest_tag', Blockly.Arduino.ORDER_ATOMIC);
    var value_src_tag = Blockly.Arduino.valueToCode(block, 'src_tag', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'PREPARE_PAYMENT_SIMPLE('+value_buf_out+','+value_drops_amount+','+value_drops_fee+','+value_to_address+','+value_dest_tag+','+value_src_tag+');\n';
    return code;
  };
