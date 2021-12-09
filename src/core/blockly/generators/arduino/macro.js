
/**
 * @fileoverview Block for the XRPL Hook Development.
 *     https://xrpl-hooks.readme.io/
 */

 'use strict';

 goog.provide('Blockly.Arduino.macro'); 
 goog.require('Blockly.Arduino');

  Blockly.Arduino['TRACEVAR'] = function(block) {
    var value_tracevar = Blockly.Arduino.valueToCode(block, 'TRACEVAR', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'TRACEVAR('+value_tracevar+');\n';
    return code;
  };

  Blockly.Arduino['TRACESTR'] = function(block) {
    var value_tracevar = Blockly.Arduino.valueToCode(block, 'TRACESTR', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'TRACESTR('+value_tracevar+');\n';
    return code;
  };

  Blockly.Arduino['TRACEHEX'] = function(block) {
    var value_tracevar = Blockly.Arduino.valueToCode(block, 'TRACEHEX', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'TRACEHEX('+value_tracevar+');\n';
    return code;
  };

  Blockly.Arduino['TRACEXFL'] = function(block) {
    var value_tracevar = Blockly.Arduino.valueToCode(block, 'TRACEXFL', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'TRACEXFL('+value_tracevar+');\n';
    return code;
  };


  
  

  Blockly.Arduino['sfcodes'] = function(block) {
    var dropdown_value = block.getFieldValue('VALUE');
    var code = dropdown_value;
    return [code, Blockly.Arduino.ORDER_NONE];
  };
  
  Blockly.Arduino['amount_to_drops'] = function(block) {
    var value_amount = Blockly.Arduino.valueToCode(block, 'AMOUNT', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'AMOUNT_TO_DROPS('+value_amount+')';
    return [code, Blockly.Arduino.ORDER_NONE];
  };
  
  Blockly.Arduino['prepare_payment_simple'] = function(block) {
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
    var code = 'retrun('+value_var+');\n';
    return code;
  };

  Blockly.Arduino['guard'] = function(block) {
    var value_arg1 = Blockly.Arduino.valueToCode(block, 'arg1', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'GUARD('+value_arg1+');\n';
    return code;
  };

  Blockly.Arduino['require'] = function(block) {
    var value_condtion = Blockly.Arduino.valueToCode(block, 'condtion', Blockly.Arduino.ORDER_ATOMIC);
    var value_msg = Blockly.Arduino.valueToCode(block, 'msg', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'REQUIRE('+value_condtion+','+value_msg+');\n';
    return code;
  };
  /////////////////////////////////////////////////////////////
  // Buffer macros
  /////////////////////////////////////////////////////////////
  Blockly.Arduino['sbuf'] = function(block) {
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

  Blockly.Arduino['rbuf'] = function(block) {
    var value_buf = Blockly.Arduino.valueToCode(block, 'buf', Blockly.Arduino.ORDER_ATOMIC);
    var value_out_len = Blockly.Arduino.valueToCode(block, 'out_len', Blockly.Arduino.ORDER_ATOMIC);
    var value_str = Blockly.Arduino.valueToCode(block, 'str', Blockly.Arduino.ORDER_ATOMIC);
    var value_num = Blockly.Arduino.valueToCode(block, 'num', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'RBUF('+value_buf+', '+value_out_len+', '+value_str+', '+value_num+');\n';
    return code;
  };

  Blockly.Arduino['rbuf2'] = function(block) {
    var value_buf = Blockly.Arduino.valueToCode(block, 'buf', Blockly.Arduino.ORDER_ATOMIC);
    var value_out_len = Blockly.Arduino.valueToCode(block, 'out_len', Blockly.Arduino.ORDER_ATOMIC);
    var value_str = Blockly.Arduino.valueToCode(block, 'str', Blockly.Arduino.ORDER_ATOMIC);
    var value_num = Blockly.Arduino.valueToCode(block, 'num', Blockly.Arduino.ORDER_ATOMIC);
    var value_str2 = Blockly.Arduino.valueToCode(block, 'str2', Blockly.Arduino.ORDER_ATOMIC);
    var value_num2 = Blockly.Arduino.valueToCode(block, 'num2', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'RBUF2('+value_buf+', '+value_out_len+', '+value_str+', '+value_num+','+value_str2+','+value_num2+');\n';

    return code;
  };

  Blockly.Arduino['buffer_swap'] = function(block) {
    var value_x = Blockly.Arduino.valueToCode(block, 'x', Blockly.Arduino.ORDER_ATOMIC);
    var value_y = Blockly.Arduino.valueToCode(block, 'y', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'BUFFER_SWAP('+value_x+','+value_y+');\n';
    return code;
  };

  Blockly.Arduino['buffer_equal_str_guard'] = function(block) {
    var value_output = Blockly.Arduino.valueToCode(block, 'output', Blockly.Arduino.ORDER_ATOMIC);
    var value_buf1 = Blockly.Arduino.valueToCode(block, 'buf1', Blockly.Arduino.ORDER_ATOMIC);
    var value_buf1len = Blockly.Arduino.valueToCode(block, 'buf1len', Blockly.Arduino.ORDER_ATOMIC);
    var value_str = Blockly.Arduino.valueToCode(block, 'str', Blockly.Arduino.ORDER_ATOMIC);
    var value_n = Blockly.Arduino.valueToCode(block, 'n', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'BUFFER_EQUAL_STR_GUARD('+value_output+','+value_buf1+','+value_buf1len+','+value_str+','+value_n+');\n';
    return code;
  };

  Blockly.Arduino['buffer_equal_str'] = function(block) {
    var value_output = Blockly.Arduino.valueToCode(block, 'output', Blockly.Arduino.ORDER_ATOMIC);
    var value_buf1 = Blockly.Arduino.valueToCode(block, 'buf1', Blockly.Arduino.ORDER_ATOMIC);
    var value_buf1len = Blockly.Arduino.valueToCode(block, 'buf1len', Blockly.Arduino.ORDER_ATOMIC);
    var value_str = Blockly.Arduino.valueToCode(block, 'str', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'BUFFER_EQUAL_STR('+value_output+','+value_buf1+','+value_buf1len+','+value_str+');\n';
    return code;
  };

  Blockly.Arduino['uint16_to_buf'] = function(block) {
    var value_buf_raw = Blockly.Arduino.valueToCode(block, 'buf_raw', Blockly.Arduino.ORDER_ATOMIC);
    var value_i = Blockly.Arduino.valueToCode(block, 'i', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'UINT16_TO_BUF('+value_buf_raw+','+value_i+');\n';
    return code;
  }

  Blockly.Arduino['uint16_from_buf'] = function(block) {
    var value_buf = Blockly.Arduino.valueToCode(block, 'buf', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'UINT16_FROM_BUF('+value_buf+');\n';
    return code;
  };

  Blockly.Arduino['uint32_to_buf'] = function(block) {
    var value_buf_raw = Blockly.Arduino.valueToCode(block, 'buf_raw', Blockly.Arduino.ORDER_ATOMIC);
    var value_i = Blockly.Arduino.valueToCode(block, 'i', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'UINT32_TO_BUF('+value_buf_raw+','+value_i+');\n';
    return code;
  }

  Blockly.Arduino['uint32_from_buf'] = function(block) {
    var value_buf = Blockly.Arduino.valueToCode(block, 'buf', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'UINT32_FROM_BUF('+value_buf+');\n';
    return code;
  };

  Blockly.Arduino['uint64_to_buf'] = function(block) {
    var value_buf_raw = Blockly.Arduino.valueToCode(block, 'buf_raw', Blockly.Arduino.ORDER_ATOMIC);
    var value_i = Blockly.Arduino.valueToCode(block, 'i', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'UINT64_TO_BUF('+value_buf_raw+','+value_i+');\n';
    return code;
  }

  Blockly.Arduino['uint64_from_buf'] = function(block) {
    var value_buf = Blockly.Arduino.valueToCode(block, 'buf', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'UINT64_FROM_BUF('+value_buf+');\n';
    return code;
  };

  Blockly.Arduino['int64_to_buf'] = function(block) {
    var value_buf_raw = Blockly.Arduino.valueToCode(block, 'buf_raw', Blockly.Arduino.ORDER_ATOMIC);
    var value_i = Blockly.Arduino.valueToCode(block, 'i', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'INT64_TO_BUF('+value_buf_raw+','+value_i+');\n';
    return code;
  }

  Blockly.Arduino['int64_from_buf'] = function(block) {
    var value_buf = Blockly.Arduino.valueToCode(block, 'buf', Blockly.Arduino.ORDER_ATOMIC);
    var code = 'INT64_FROM_BUF('+value_buf+');\n';
    return code;
  }

  Blockly.Arduino['macro_define'] = function(block) {
    var dropdown_name = block.getFieldValue('NAME');
     var code = dropdown_name;
     return [code, Blockly.Arduino.ORDER_NONE];
  };
  