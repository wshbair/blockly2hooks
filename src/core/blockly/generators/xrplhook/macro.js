
/**
 * @fileoverview Block for the XRPL Hook Development.
 *     https://xrpl-hooks.readme.io/
 */

 'use strict';

 goog.provide('Blockly.xrplhook.macro'); 
 goog.require('Blockly.xrplhook');

  Blockly.xrplhook['TRACEVAR'] = function(block) {
    var value_tracevar = Blockly.xrplhook.valueToCode(block, 'TRACEVAR', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'TRACEVAR('+value_tracevar+');\n';
    return code;
  };

  Blockly.xrplhook['TRACESTR'] = function(block) {
    var value_tracevar = Blockly.xrplhook.valueToCode(block, 'TRACESTR', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'TRACESTR('+value_tracevar+');\n';
    return code;
  };

  Blockly.xrplhook['TRACEHEX'] = function(block) {
    var value_tracevar = Blockly.xrplhook.valueToCode(block, 'TRACEHEX', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'TRACEHEX('+value_tracevar+');\n';
    return code;
  };

  Blockly.xrplhook['TRACEXFL'] = function(block) {
    var value_tracevar = Blockly.xrplhook.valueToCode(block, 'TRACEXFL', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'TRACEXFL('+value_tracevar+');\n';
    return code;
  };


  
  

  Blockly.xrplhook['sfcodes'] = function(block) {
    var dropdown_value = block.getFieldValue('VALUE');
    var code = dropdown_value;
    return [code, Blockly.xrplhook.ORDER_NONE];
  };
  
  Blockly.xrplhook['amount_to_drops'] = function(block) {
    var value_amount = Blockly.xrplhook.valueToCode(block, 'AMOUNT', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'AMOUNT_TO_DROPS('+value_amount+')';
    return [code, Blockly.xrplhook.ORDER_NONE];
  };
  
  Blockly.xrplhook['prepare_payment_simple'] = function(block) {
    var value_buf_out = Blockly.xrplhook.valueToCode(block, 'buf_out', Blockly.xrplhook.ORDER_ATOMIC);
    var value_drops_amount = Blockly.xrplhook.valueToCode(block, 'drops_amount', Blockly.xrplhook.ORDER_ATOMIC);
    var value_drops_fee = Blockly.xrplhook.valueToCode(block, 'drops_fee', Blockly.xrplhook.ORDER_ATOMIC);
    var value_to_address = Blockly.xrplhook.valueToCode(block, 'to_address', Blockly.xrplhook.ORDER_ATOMIC);
    var value_dest_tag = Blockly.xrplhook.valueToCode(block, 'dest_tag', Blockly.xrplhook.ORDER_ATOMIC);
    var value_src_tag = Blockly.xrplhook.valueToCode(block, 'src_tag', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'PREPARE_PAYMENT_SIMPLE('+value_buf_out+','+value_drops_amount+','+value_drops_fee+','+value_to_address+','+value_dest_tag+','+value_src_tag+');\n';
     return code;
  };

  Blockly.xrplhook['return_val'] = function(block) {
    var value_var = Blockly.xrplhook.valueToCode(block, 'VAR', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'retrun('+value_var+');\n';
    return code;
  };

  Blockly.xrplhook['guard'] = function(block) {
    var value_arg1 = Blockly.xrplhook.valueToCode(block, 'arg1', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'GUARD('+value_arg1+');\n';
    return code;
  };

  Blockly.xrplhook['require'] = function(block) {
    var value_condtion = Blockly.xrplhook.valueToCode(block, 'condtion', Blockly.xrplhook.ORDER_ATOMIC);
    var value_msg = Blockly.xrplhook.valueToCode(block, 'msg', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'REQUIRE('+value_condtion+','+value_msg+');\n';
    return code;
  };
  /////////////////////////////////////////////////////////////
  // Buffer macros
  /////////////////////////////////////////////////////////////
  Blockly.xrplhook['sbuf'] = function(block) {
    var value_sbuf = Blockly.xrplhook.valueToCode(block, 'SBUF', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'SBUF('+value_sbuf+')';
    return [code, Blockly.xrplhook.ORDER_NONE];
  };

  Blockly.xrplhook['buffer_equal'] = function(block) {
    var value_equal = Blockly.xrplhook.valueToCode(block, 'equal', Blockly.xrplhook.ORDER_ATOMIC);
    var value_hook_accid = Blockly.xrplhook.valueToCode(block, 'hook_accid', Blockly.xrplhook.ORDER_ATOMIC);
    var value_account_field = Blockly.xrplhook.valueToCode(block, 'account_field', Blockly.xrplhook.ORDER_ATOMIC);
    var value_length = Blockly.xrplhook.valueToCode(block, 'length', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'BUFFER_EQUAL('+value_equal+','+value_hook_accid+','+value_account_field+','+value_length+');\n';
    return code; 
  };

  Blockly.xrplhook['clearbuf'] = function(block) {
    var value_buffer = Blockly.xrplhook.valueToCode(block, 'buffer', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'CLEARBUF('+value_buffer+');\n';
    return code;
  };

  Blockly.xrplhook['sub_offset'] = function(block) {
    var value_sub_offset = Blockly.xrplhook.valueToCode(block, 'SUB_OFFSET', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'SUB_OFFSET('+value_sub_offset+')';
    return [code, Blockly.xrplhook.ORDER_NONE];
  };

  Blockly.xrplhook['uint32_from_buf'] = function(block) {
    var value_buffer_input = Blockly.xrplhook.valueToCode(block, 'buffer_input', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'UINT32_FROM_BUF('+value_buffer_input+')';
    return [code, Blockly.xrplhook.ORDER_NONE];
  };

  Blockly.xrplhook['rbuf'] = function(block) {
    var value_buf = Blockly.xrplhook.valueToCode(block, 'buf', Blockly.xrplhook.ORDER_ATOMIC);
    var value_out_len = Blockly.xrplhook.valueToCode(block, 'out_len', Blockly.xrplhook.ORDER_ATOMIC);
    var value_str = Blockly.xrplhook.valueToCode(block, 'str', Blockly.xrplhook.ORDER_ATOMIC);
    var value_num = Blockly.xrplhook.valueToCode(block, 'num', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'RBUF('+value_buf+', '+value_out_len+', '+value_str+', '+value_num+');\n';
    return code;
  };

  Blockly.xrplhook['rbuf2'] = function(block) {
    var value_buf = Blockly.xrplhook.valueToCode(block, 'buf', Blockly.xrplhook.ORDER_ATOMIC);
    var value_out_len = Blockly.xrplhook.valueToCode(block, 'out_len', Blockly.xrplhook.ORDER_ATOMIC);
    var value_str = Blockly.xrplhook.valueToCode(block, 'str', Blockly.xrplhook.ORDER_ATOMIC);
    var value_num = Blockly.xrplhook.valueToCode(block, 'num', Blockly.xrplhook.ORDER_ATOMIC);
    var value_str2 = Blockly.xrplhook.valueToCode(block, 'str2', Blockly.xrplhook.ORDER_ATOMIC);
    var value_num2 = Blockly.xrplhook.valueToCode(block, 'num2', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'RBUF2('+value_buf+', '+value_out_len+', '+value_str+', '+value_num+','+value_str2+','+value_num2+');\n';

    return code;
  };

  Blockly.xrplhook['buffer_swap'] = function(block) {
    var value_x = Blockly.xrplhook.valueToCode(block, 'x', Blockly.xrplhook.ORDER_ATOMIC);
    var value_y = Blockly.xrplhook.valueToCode(block, 'y', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'BUFFER_SWAP('+value_x+','+value_y+');\n';
    return code;
  };

  Blockly.xrplhook['buffer_equal_str_guard'] = function(block) {
    var value_output = Blockly.xrplhook.valueToCode(block, 'output', Blockly.xrplhook.ORDER_ATOMIC);
    var value_buf1 = Blockly.xrplhook.valueToCode(block, 'buf1', Blockly.xrplhook.ORDER_ATOMIC);
    var value_buf1len = Blockly.xrplhook.valueToCode(block, 'buf1len', Blockly.xrplhook.ORDER_ATOMIC);
    var value_str = Blockly.xrplhook.valueToCode(block, 'str', Blockly.xrplhook.ORDER_ATOMIC);
    var value_n = Blockly.xrplhook.valueToCode(block, 'n', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'BUFFER_EQUAL_STR_GUARD('+value_output+','+value_buf1+','+value_buf1len+','+value_str+','+value_n+');\n';
    return code;
  };

  Blockly.xrplhook['buffer_equal_str'] = function(block) {
    var value_output = Blockly.xrplhook.valueToCode(block, 'output', Blockly.xrplhook.ORDER_ATOMIC);
    var value_buf1 = Blockly.xrplhook.valueToCode(block, 'buf1', Blockly.xrplhook.ORDER_ATOMIC);
    var value_buf1len = Blockly.xrplhook.valueToCode(block, 'buf1len', Blockly.xrplhook.ORDER_ATOMIC);
    var value_str = Blockly.xrplhook.valueToCode(block, 'str', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'BUFFER_EQUAL_STR('+value_output+','+value_buf1+','+value_buf1len+','+value_str+');\n';
    return code;
  };

  Blockly.xrplhook['uint16_to_buf'] = function(block) {
    var value_buf_raw = Blockly.xrplhook.valueToCode(block, 'buf_raw', Blockly.xrplhook.ORDER_ATOMIC);
    var value_i = Blockly.xrplhook.valueToCode(block, 'i', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'UINT16_TO_BUF('+value_buf_raw+','+value_i+');\n';
    return code;
  }

  Blockly.xrplhook['uint16_from_buf'] = function(block) {
    var value_buf = Blockly.xrplhook.valueToCode(block, 'buf', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'UINT16_FROM_BUF('+value_buf+');\n';
    return code;
  };

  Blockly.xrplhook['uint32_to_buf'] = function(block) {
    var value_buf_raw = Blockly.xrplhook.valueToCode(block, 'buf_raw', Blockly.xrplhook.ORDER_ATOMIC);
    var value_i = Blockly.xrplhook.valueToCode(block, 'i', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'UINT32_TO_BUF('+value_buf_raw+','+value_i+');\n';
    return code;
  }

  Blockly.xrplhook['uint32_from_buf'] = function(block) {
    var value_buf = Blockly.xrplhook.valueToCode(block, 'buf', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'UINT32_FROM_BUF('+value_buf+');\n';
    return code;
  };

  Blockly.xrplhook['uint64_to_buf'] = function(block) {
    var value_buf_raw = Blockly.xrplhook.valueToCode(block, 'buf_raw', Blockly.xrplhook.ORDER_ATOMIC);
    var value_i = Blockly.xrplhook.valueToCode(block, 'i', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'UINT64_TO_BUF('+value_buf_raw+','+value_i+');\n';
    return code;
  }

  Blockly.xrplhook['uint64_from_buf'] = function(block) {
    var value_buf = Blockly.xrplhook.valueToCode(block, 'buf', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'UINT64_FROM_BUF('+value_buf+');\n';
    return code;
  };

  Blockly.xrplhook['int64_to_buf'] = function(block) {
    var value_buf_raw = Blockly.xrplhook.valueToCode(block, 'buf_raw', Blockly.xrplhook.ORDER_ATOMIC);
    var value_i = Blockly.xrplhook.valueToCode(block, 'i', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'INT64_TO_BUF('+value_buf_raw+','+value_i+');\n';
    return code;
  }

  Blockly.xrplhook['int64_from_buf'] = function(block) {
    var value_buf = Blockly.xrplhook.valueToCode(block, 'buf', Blockly.xrplhook.ORDER_ATOMIC);
    var code = 'INT64_FROM_BUF('+value_buf+');\n';
    return code;
  }

  Blockly.xrplhook['macro_define'] = function(block) {
    var dropdown_name = block.getFieldValue('NAME');
     var code = dropdown_name;
     return [code, Blockly.xrplhook.ORDER_NONE];
  };
  