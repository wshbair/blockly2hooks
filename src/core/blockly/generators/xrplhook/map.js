/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Code generator for the xrplhook map functionality.
 *     xrplhook built-in function docs: http://xrplhook.cc/en/Reference/HomePage
 */
'use strict';

goog.provide('Blockly.xrplhook.map');

goog.require('Blockly.xrplhook');


/**
 * Code generator for the map block.
 * xrplhook code: loop { map(x, 0, 1024, 0, y) }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.xrplhook['base_map'] = function(block) {
  var valueNum = Blockly.xrplhook.valueToCode(
      block, 'NUM', Blockly.xrplhook.ORDER_NONE) || '0';
  var valueDmax = Blockly.xrplhook.valueToCode(
      block, 'DMAX', Blockly.xrplhook.ORDER_ATOMIC) || '0';

  var code = 'map(' + valueNum + ', 0, 1024, 0, ' + valueDmax + ')';
  return [code, Blockly.xrplhook.ORDER_NONE];
};
