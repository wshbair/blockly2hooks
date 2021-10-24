/**
 * @license
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * https://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating cake for loop blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.cake.loops');

goog.require('Blockly.cake');


Blockly.cake['controls_whileUntil'] = function(block) {
  // Do while/until loop.
  var until = block.getFieldValue('MODE') == 'UNTIL';
  var argument0 = Blockly.cake.valueToCode(block, 'BOOL',
    until ? Blockly.cake.ORDER_LOGICAL_NOT :
    Blockly.cake.ORDER_NONE) || '0';
  var branch = Blockly.cake.statementToCode(block, 'DO');
  branch = Blockly.cake.addLoopTrap(branch, block.id);
  if (until) {
    argument0 = '!' + argument0;
  }
  return 'while (' + argument0 + ') {\n' + branch + '}\n';
};

Blockly.cake['controls_doWhile'] = function(block) {
    // Do while/until loop.
    var until = block.getFieldValue('MODE') == 'UNTIL';
    var argument0 = Blockly.cake.valueToCode(block, 'BOOL',
            until ? Blockly.cake.ORDER_LOGICAL_NOT :
                Blockly.cake.ORDER_NONE) || '0';
    var branch = Blockly.cake.statementToCode(block, 'DO');
    branch = Blockly.cake.addLoopTrap(branch, block.id);
    if (until) {
        argument0 = '!' + argument0;
    }
    return 'do {\n' + branch + '} while (' + argument0 + ');\n';
};

Blockly.cake['controls_for'] = function(block) {
  // For loop.
  var variable0 = Blockly.cake.variableDB_.getName(
    block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    if(variable0 == '___EC_84_A0_ED_83_9D__' || variable0 == '--Select--'){
        variable0 = 'unselected';
    }
  var argument0 = Blockly.cake.valueToCode(block, 'FROM',
    Blockly.cake.ORDER_ASSIGNMENT) || '0';
  var argument1 = Blockly.cake.valueToCode(block, 'TO',
    Blockly.cake.ORDER_ASSIGNMENT) || '0';
  var increment = Blockly.cake.valueToCode(block, 'BY',
    Blockly.cake.ORDER_ASSIGNMENT) || '1';
  var branch = Blockly.cake.statementToCode(block, 'DO');
  branch = Blockly.cake.addLoopTrap(branch, block.id);
  var code;
    // All arguments are simple numbers.
    code = 'for (' + variable0 + ' = ' + argument0 + '; ' +
      variable0 + '<' + argument1 + '; ' +
      variable0;
    var up = increment >= 0;
    var step = Math.abs(parseFloat(increment));
    if (step == 1) {
      code += up ? '++' : '--';
    } else {
      code += (up ? ' += ' : ' -= ') + step;
    }
    code += ') {\n' + branch + '}\n';

  return code;
};

// added by wazen 
Blockly.cake['controls_repeat'] =
    Blockly.cake['controls_repeat_ext'];

Blockly.cake['controls_repeat_ext'] = function(block) {
  // Repeat n times.
  if (block.getField('TIMES')) {
    // Internal number.
    var repeats = String(Number(block.getFieldValue('TIMES')));
  } else {
    // External number.
    var repeats = Blockly.cake.valueToCode(block, 'TIMES',
        Blockly.cake.ORDER_ASSIGNMENT) || '0';
  }
  var branch = Blockly.cake.statementToCode(block, 'DO');
  branch = Blockly.cake.addLoopTrap(branch, block);
  var code = '';
  var loopVar = Blockly.cake.nameDB_.getDistinctName(
      'count', Blockly.VARIABLE_CATEGORY_NAME);
  var endVar = repeats;
  // if (!repeats.match(/^\w+$/) && !Blockly.isNumber(repeats)) {
  //   endVar = Blockly.cake.nameDB_.getDistinctName(
  //       'repeat_end', Blockly.VARIABLE_CATEGORY_NAME);
  //   code += 'var ' + endVar + ' = ' + repeats + ';\n';
  // }
  code += 'for (int ' + loopVar + ' = 0; ' +
      loopVar + ' < ' + endVar + '; ' +
      loopVar + '++) {\n' +
      branch + '}\n';

  return code;
};

Blockly.cake['controls_flow_statements'] = function(block) {
  // Flow statements: continue, break.
  switch (block.getFieldValue('FLOW')) {
    case 'BREAK':
      return 'break;\n';
    case 'CONTINUE':
      return 'continue;\n';
  }
  throw 'Unknown flow statement.';
};

//Wazen area
Blockly.cake['variables_define'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  var value_name = Blockly.cake.valueToCode(block, 'NAME', Blockly.cake.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '# define '+text_name+ ' '+ value_name;
  return code;
};

Blockly.cake['cbak'] = function(block) {
  var variable_argument0 = Blockly.cake.nameDB_.getName(block.getFieldValue('argument0'), Blockly.Variables.NAME_TYPE);
  var statements_cbak_statments = Blockly.cake.statementToCode(block, 'cbak_statments');
  var variable_returned = Blockly.cake.nameDB_.getName(block.getFieldValue('returned'), Blockly.Variables.NAME_TYPE);
  var value_retrun = Blockly.cake.valueToCode(block, 'retrun', Blockly.cake.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = 'int cbak;\n';
  return code;
}

Blockly.cake['hooks_firewall'] = function(block) {
  var value_blacklsit_account = Blockly.cake.valueToCode(block, 'blacklsit_account', Blockly.cake.ORDER_ATOMIC);
  
  var code = 
  '#include "../hookapi.h" \n'+
  '#define BLACKLIST_ACCOUNT "'+value_blacklsit_account+'"\n\n'+
  `int64_t cbak(int64_t reserved)
  {
    // we never emit anything from this hook so this will never be called'
      return 0;   
  }\n
int64_t hook(int64_t reserved)
{
      GUARD(1);

    // fetch the originating account ID
    uint8_t otxn_accid[20];
    if (otxn_field(otxn_accid, 20, sfAccount) != 20)
        rollback(SBUF("Firewall: Could not fetch sfAccount from originating transaction!!!"), 100);

    // RH NOTE in production you should always specify account IDs directly as a preset 20 byte array
    // translating from r-addr here is just for demonstration purposes.
    uint8_t blacklist_accid[20];
    if (util_accid(SBUF(blacklist_accid), SBUF(BLACKLIST_ACCOUNT)) != 20)
        rollback(SBUF("Firewall: Could not decode blacklist account id."), 200);

    // look up the account ID in the foreign state (blacklist account's hook state)
    uint8_t blacklist_status[1] = { 0 };
    int64_t lookup = state_foreign(SBUF(blacklist_status), SBUF(otxn_accid), SBUF(blacklist_accid));
    if (lookup == INVALID_ACCOUNT)
        trace(SBUF("Firewall: Warning specified blacklist account does not exist."), 0, 0, 0);

    if (blacklist_status[0] == 0)
        accept(SBUF("Firewall: Allowing transaction."), 0);

    rollback(SBUF("Firewall: Blocking transaction from blacklisted account."), 1);

    return 0;
}`
  return code;
};


Blockly.cake['hooks_wallet_address'] = function(block) {
  // Text value.
  var code = Blockly.cake.quote_(block.getFieldValue('wallet_address'));
  return [code, Blockly.cake.ORDER_ATOMIC];
};

Blockly.cake['hooks_accept'] = function(block) {
  
  var code = `
 #include "../hookapi.h "
 
 int64_t cbak(int64_t reserved) { 
     return 0;
 }
 
 int64_t hook(int64_t reserved ) {
 
     TRACESTR("Accept.c: Called.");
     accept (0,0,0); 
 
     _g(1,1);   // every hook needs to import guard function and use it at least once
     // unreachable
     return 0;
 }
 `;
  return code;
};