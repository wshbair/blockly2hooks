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

 goog.provide('Blockly.xrplhook.essential'); 
 goog.require('Blockly.xrplhook');



  Blockly.xrplhook['_g_function'] = function(block) {
    var value_arg1 = Blockly.xrplhook.valueToCode(block, 'arg1', Blockly.xrplhook.ORDER_ATOMIC);
    var value_arg2 = Blockly.xrplhook.valueToCode(block, 'arg2', Blockly.xrplhook.ORDER_ATOMIC);
    var code = '_g('+value_arg1+','+value_arg2+');\n';
    return code;
  };

  Blockly.xrplhook['comment'] = function(block) {
    var code = block.getTitleValue('TEXT');
    return '// ' + code+'\n';
  };

  /**
 * Code generator to add code into the cbak() and hook() functions.
 * Its use is mandatory, and no other functions are accepted.
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.xrplhook['hook_template'] = function(block) {
    function statementToCodeNoTab(block, name) {
      var targetBlock = block.getInputTargetBlock(name);
      var code = Blockly.xrplhook.blockToCode(targetBlock);
      if (!goog.isString(code)) {
        throw 'Expecting code from statement block "' + targetBlock.type + '".';
      }
      return code;
    }
    var setupBranch = Blockly.xrplhook.statementToCode(block, 'SETUP_FUNC');
    if (setupBranch) {
      Blockly.xrplhook.addSetup('userSetupCode', setupBranch, true);
    }
  
    var loopBranch = statementToCodeNoTab(block, 'LOOP_FUNC');
    return loopBranch;
  };
  
   
  
   
 