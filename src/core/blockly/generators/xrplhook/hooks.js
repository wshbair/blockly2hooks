/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Code generator for xrplhook Digital and Analogue input/output.
 *     xrplhook built in function docs: http://xrplhook.cc/en/Reference/HomePage
 */
 'use strict';

 goog.provide('Blockly.xrplhook.hooks');
 
 goog.require('Blockly.xrplhook');
 
 Blockly.xrplhook['firewall'] = function(block) {
    var text_block_account = block.getFieldValue('block_account');
    var value_x = Blockly.xrplhook.valueToCode(block, 'x', Blockly.xrplhook.ORDER_ATOMIC);
    var text_wallet_address = block.getFieldValue('wallet_address');
    var value_y = Blockly.xrplhook.valueToCode(block, 'y', Blockly.xrplhook.ORDER_ATOMIC);
    var text_blacklist_server = block.getFieldValue('blacklist_server');
    var value_z = Blockly.xrplhook.valueToCode(block, 'z', Blockly.xrplhook.ORDER_ATOMIC);
    
    Blockly.xrplhook.addDeclaration('hooks', '#defind BLACKLIST_ACCOUNT '+value_x+'')

    var code = 'GUARD(1);\n'+
    '// fetch the originating account ID \n'+
    'uint8_t otxn_accid[20];\n'+
    'if (otxn_field(otxn_accid, 20, sfAccount) != 20)\n'+
    '    rollback(SBUF("Firewall: Could not fetch sfAccount from originating transaction!!!"), 100);\n\n'+

    '// RH NOTE in production you should always specify account IDs directly as a preset 20 byte array\n'+
    '// translating from r-addr here is just for demonstration purposes.\n'+
    'uint8_t blacklist_accid[20];\n'+
    'if (util_accid(SBUF(blacklist_accid), SBUF(BLACKLIST_ACCOUNT)) != 20)\n'+
    '    rollback(SBUF("Firewall: Could not decode blacklist account id."), 200);\n\n'+

    '// look up the account ID in the foreign state (blacklist accounts hook state)\n'+
    'uint8_t blacklist_status[1] = { 0 };\n'+
    'int64_t lookup = state_foreign(SBUF(blacklist_status), SBUF(otxn_accid), SBUF(blacklist_accid));\n'+
    'if (lookup == INVALID_ACCOUNT)\n'+
    '    trace(SBUF("Firewall: Warning specified blacklist account does not exist."), 0, 0, 0);\n\n'+

    'if (blacklist_status[0] == 0)\n'+
    '    accept(SBUF("Firewall: Allowing transaction."), 0);\n\n'+

    'rollback(SBUF("Firewall: Blocking transaction from blacklisted account."), 1);\n\n';
    return code;
  };

  Blockly.xrplhook['accept'] = function(block) {
    //Blockly.xrplhook.addInclude('stdint','#include <stdint.h>')
    //Blockly.xrplhook.addDeclaration('TRACESTR','#define TRACESTR(v) trace((uint32_t)(#v), (uint32_t)(sizeof(#v)), (uint32_t)(v), sizeof(v), 0);');
    //Blockly.xrplhook.addInclude('accept', 'extern int64_t accept(uint32_t read_ptr,  uint32_t read_len,   int64_t error_code);');
    //Blockly.xrplhook.addInclude('_g', 'extern int32_t _g (uint32_t id, uint32_t maxiter);');
    //Blockly.xrplhook.addInclude('trace', 'extern int64_t trace(uint32_t mread_ptr, uint32_t mread_len,uint32_t dread_ptr, uint32_t dread_len, uint32_t as_hex);' );
    var code = 
    '/** \n'+
    '* This hook just accepts any transaction coming through it\n'+
    '*/\n'+
    'TRACESTR("Accept.c: Called.");\n'+
    'accept (0,0,0); \n'+
    '_g(1,1);   // every hook needs to import guard function and use it at least once \n'+
    '// unreachable \n';
    return code;
  };  
