/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview xrplhook code generator for the text blocks.
 *     Partially implements the xrplhook Serial interface as described in:
 *     http://xrplhook.cc/en/Reference/Serial
 *
 * TODO: Too many calls to String constructor, which consumes a lot of uC
 *     resources. This will need revisiting for better type recognition.
 *
 * TODO: Trim generator is not correct.
 */
'use strict';

goog.provide('Blockly.xrplhook.text');

goog.require('Blockly.xrplhook');


/**
 * Code generator for a literal String (X).
 * xrplhook code: loop { "X" }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.xrplhook['text'] = function(block) {
  var code = Blockly.xrplhook.quote_(block.getFieldValue('TEXT'));
  return [code, Blockly.xrplhook.ORDER_ATOMIC];
};

/**
 * Code generator for a String concatenation (X...Y). This string can be made
 * up of any number of elements of any type.
 * This block uses a mutator.
 * String construction info: http://xrplhook.cc/en/Reference/StringConstructor
 * xrplhook code: loop { "String(X)" + ... + "String(Y)" }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.xrplhook['text_join'] = function(block) {
  var code;
  if (block.itemCount_ == 0) {
    return ['""', Blockly.xrplhook.ORDER_ATOMIC];
  } else if (block.itemCount_ == 1) {
    var argument0 = Blockly.xrplhook.valueToCode(block, 'ADD0',
        Blockly.xrplhook.ORDER_UNARY_POSTFIX) || '""';
    code = 'String(' + argument0 + ')';
    return [code, Blockly.xrplhook.ORDER_UNARY_POSTFIX];
  } else {
    var argument;
    code = [];
    for (var n = 0; n < block.itemCount_; n++) {
      argument = Blockly.xrplhook.valueToCode(
          block, 'ADD' + n, Blockly.xrplhook.ORDER_NONE);
      if (argument == '') {
        code[n] = '""';
      } else {
        code[n] = 'String(' + argument + ')';
      }
    }
    code = code.join(' + ');
    return [code, Blockly.xrplhook.ORDER_UNARY_POSTFIX];
  }
};

/**
 * Code generator for appending text (Y) to a variable in place (X).
 * String constructor info: http://xrplhook.cc/en/Reference/StringConstructor
 * xrplhook code: loop { X += String(Y) }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.xrplhook['text_append'] = function(block) {
  // Append to a variable in place.
  var varName = Blockly.xrplhook.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var argument0 = Blockly.xrplhook.valueToCode(block, 'TEXT',
      Blockly.xrplhook.ORDER_UNARY_POSTFIX);
  if (argument0 == '') {
    argument0 = '""';
  } else {
    argument0 = 'String(' + argument0 + ')';
  }
  return varName + ' += ' + argument0 + ';\n';
};

/**
 * Code generator to get the length of a string (X).
 * String length info: http://xrplhook.cc/en/Reference/StringLength
 * xrplhook code: loop { String(X).length() }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.xrplhook['text_length'] = function(block) {
  var argument0 = Blockly.xrplhook.valueToCode(block, 'VALUE',
      Blockly.xrplhook.ORDER_UNARY_POSTFIX) || '""';
  var code = 'String(' + argument0 + ').length()';
  return [code, Blockly.xrplhook.ORDER_UNARY_POSTFIX];
};

/**
 * Code generator to test if a string (X) is null/empty.
 * String length info: http://xrplhook.cc/en/Reference/StringLength
 * xrplhook code: boolean isStringEmpty(...) { ... }
 *               loop { isStringEmpty(X) }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.xrplhook['text_isEmpty'] = function(block) {
  var func = [];
  func.push('boolean ' + Blockly.xrplhook.DEF_FUNC_NAME + '(String msg) {');
  func.push('  if (msg.length() == 0) {');
  func.push('    return true;');
  func.push('  } else {');
  func.push('    return false;');
  func.push('  }');
  func.push('}');
  var funcName = Blockly.xrplhook.addFunction('isStringEmpty', func.join('\n'));
  var argument0 = Blockly.xrplhook.valueToCode(block, 'VALUE',
      Blockly.xrplhook.ORDER_UNARY_POSTFIX);
  if (argument0 == '') {
    argument0 = '""';
  } else {
    argument0 = 'String(' + argument0 + ')';
  }
  var code = funcName + '(' + argument0 + ')';
  return [code, Blockly.xrplhook.ORDER_UNARY_POSTFIX];
};

/**
 * Code generator to trim spaces from a string (X).
 * String trim info: http://xrplhook.cc/en/Tutorial/StringLengthTrim
 * xrplhook code: loop { String(X).trim() }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.xrplhook['text_trim'] = function(block) {
  // Trim spaces.
  Blockly.xrplhook.text_trim.OPERATORS = {
    LEFT: '.trim()',
    RIGHT: '.trim()',
    BOTH: '.trim()'
  };
  var mode = block.getFieldValue('MODE');
  var operator = Blockly.xrplhook.text_trim.OPERATORS[mode];
  var argument0 = Blockly.xrplhook.valueToCode(block, 'TEXT',
      Blockly.xrplhook.ORDER_UNARY_POSTFIX);
  if (argument0 == '') {
    argument0 = '""';
  } else {
    argument0 = 'String(' + argument0 + ')';
  }
  return [argument0 + operator, Blockly.xrplhook.ORDER_UNARY_POSTFIX];
};

/**
 * Code generator to print to the serial comm.
 * Serial info: http://xrplhook.cc/en/Reference/Serial
 * xrplhook code: setup { Serial.begin(9600);     }
 *               loop  { Serial.print(String(X)) }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.xrplhook['text_print'] = function(block) {
  var serialId = Blockly.xrplhook.Boards.selected.serial[0][1];
  var setupCode = serialId + '.begin(9600);';
  Blockly.xrplhook.addSetup('serial_' + serialId, setupCode, false);
  var argument0 = Blockly.xrplhook.valueToCode(block, 'TEXT',
      Blockly.xrplhook.ORDER_NONE);
  if (argument0 == '') {
    argument0 = '""';
  } else {
    argument0 = 'String(' + argument0 + ')';
  }
  return serialId + '.print(' + argument0 + ');\n';
};

/**
 * Code generator to prompt the user with a string (X) and request input.
 * Serial info: http://xrplhook.cc/en/Reference/Serial
 * xrplhook code: getUserInputPrompt(...) { ... }
 *               loop { getUserInputPrompt("X")) }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.xrplhook['text_prompt_ext'] = function(block) {
  // Get the first Serial peripheral of xrplhook board
  var serialId = Blockly.xrplhook.Boards.selected.serial[0][1];
  var returnType = block.getFieldValue('TYPE');

  // The function code changes based on reading a number or string
  var func = [];
  var toNumber = returnType == Blockly.Types.NUMBER.output;
  if (toNumber) {
    func.push('int ' + Blockly.xrplhook.DEF_FUNC_NAME + '(String msg) {');
  } else {
    func.push('String ' + Blockly.xrplhook.DEF_FUNC_NAME + '(String msg) {');
  }
  func.push('  ' + serialId + '.println(msg);');
  func.push('  boolean stringComplete = false;');
  if (toNumber) {
    func.push('  int content = 0;');// + serialId + '.parseInt();');
  } else {
    func.push('  String content = "";');
  }
  func.push('  while (stringComplete == false) {');
  func.push('    if (' + serialId + '.available()) {');
  if (toNumber) {
    func.push('      content = ' + serialId + '.parseInt();');
    func.push('      stringComplete = true;');
  } else {
    func.push('      char readChar = (char)' + serialId + '.read();');
    func.push('      if (readChar == \'\\n\' || readChar == \'\\r\') {');
    func.push('        stringComplete = true;');
    func.push('      } else {');
    func.push('        content += readChar;');
    func.push('      }');
  }
  func.push('    }');
  func.push('  }');
  func.push('  // Empty incoming serial buffer');
  func.push('  while(Serial.available()) { Serial.read(); };');
  func.push('  return content;');
  func.push('}');
  var funcName = Blockly.xrplhook.addFunction(
      'getUserInputPrompt' + returnType, func.join('\n'));

  // Only overwrite the serial set up if not present already
  var setupCode = serialId + '.begin(9600);';
  Blockly.xrplhook.addSetup('serial_' + serialId, setupCode, false);

  var msg = Blockly.xrplhook.valueToCode(block, 'TEXT',
      Blockly.xrplhook.ORDER_NONE) || '""';
  var code = funcName + '(' + msg + ')';

  return [code, Blockly.xrplhook.ORDER_UNARY_POSTFIX];
};


/* ***************************************************************** *
 * The rest of the blocks have been left unimplemented, as they have *
 * been removed from the toolbox and not used for xrplhook code.      *
 * ***************************************************************** */
Blockly.xrplhook['text_endString'] = function(block) {
  return ['', Blockly.xrplhook.ORDER_UNARY_POSTFIX];
};

Blockly.xrplhook['text_indexOf'] = function(block) {
  return ['', Blockly.xrplhook.ORDER_UNARY_POSTFIX];
};

Blockly.xrplhook['text_charAt'] = function(block) {
  return ['', Blockly.xrplhook.ORDER_UNARY_POSTFIX];
};

Blockly.xrplhook['text_getSubstring'] = function(block) {
  return ['', Blockly.xrplhook.ORDER_UNARY_POSTFIX];
};

Blockly.xrplhook['text_changeCase'] = function(block) {
  return ['', Blockly.xrplhook.ORDER_UNARY_POSTFIX];
};

Blockly.xrplhook['text_prompt'] = function(block) {
  return ['', Blockly.xrplhook.ORDER_UNARY_POSTFIX];
};
