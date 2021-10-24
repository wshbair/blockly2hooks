/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Code generator for Arduino Digital and Analogue input/output.
 *     Arduino built in function docs: http://arduino.cc/en/Reference/HomePage
 */
 'use strict';

 goog.provide('Blockly.Arduino.hooks');
 
 goog.require('Blockly.Arduino');
 
 Blockly.Arduino['firewall'] = function(block) {
    Blockly.Arduino.addInclude('hooks', '#include "../hookapi.h"');
    var text_block_account = block.getFieldValue('block_account');
    var value_x = Blockly.Arduino.valueToCode(block, 'x', Blockly.Arduino.ORDER_ATOMIC);
    var text_wallet_address = block.getFieldValue('wallet_address');
    var value_y = Blockly.Arduino.valueToCode(block, 'y', Blockly.Arduino.ORDER_ATOMIC);
    var text_blacklist_server = block.getFieldValue('blacklist_server');
    var value_z = Blockly.Arduino.valueToCode(block, 'z', Blockly.Arduino.ORDER_ATOMIC);
    
    Blockly.Arduino.addDeclaration('hooks', '#defind BLACKLIST_ACCOUNT '+value_x+'')

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

    'rollback(SBUF("Firewall: Blocking transaction from blacklisted account."), 1);\n\n'+

    'return 0;\n'
    return code;
  };