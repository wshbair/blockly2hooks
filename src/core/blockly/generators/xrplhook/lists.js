/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Generating xrplhook code for list blocks.
 *
 * TODO: A lot of this can be converted to arrays code by creating functions to
 *       replicate this kind of behavior.
 */
'use strict';

goog.provide('Blockly.xrplhook.lists');

goog.require('Blockly.xrplhook');

Blockly.xrplhook['lists_create_empty'] = function(block) {
    // Create an empty list.
    return ['[]', Blockly.xrplhook.ORDER_ATOMIC];
  };

  Blockly.xrplhook['lists_create_with'] = function(block) {
    // Create a list with any number of elements of any type.
    var code = new Array(block.itemCount_);
    for (var n = 0; n < block.itemCount_; n++) {
      code[n] = Blockly.xrplhook.valueToCode(block, 'ADD' + n,
          Blockly.xrplhook.ORDER_COMMA) || 'null';
    }
    code = '[' + code.join(', ') + ']';
    return [code, Blockly.xrplhook.ORDER_ATOMIC];
  };  

  Blockly.xrplhook['lists_repeat'] = function(block) {
    // Create a list with one element repeated.
    var functionName = Blockly.xrplhook.provideFunction_(
        'lists_repeat',
        [ 'function ' + Blockly.xrplhook.FUNCTION_NAME_PLACEHOLDER_ +
            '(value, n) {',
          '  var array = [];',
          '  for (var i = 0; i < n; i++) {',
          '    array[i] = value;',
          '  }',
          '  return array;',
          '}']);
    var argument0 = Blockly.xrplhook.valueToCode(block, 'ITEM',
        Blockly.xrplhook.ORDER_COMMA) || 'null';
    var argument1 = Blockly.xrplhook.valueToCode(block, 'NUM',
        Blockly.xrplhook.ORDER_COMMA) || '0';
    var code = functionName + '(' + argument0 + ', ' + argument1 + ')';
    return [code, Blockly.xrplhook.ORDER_FUNCTION_CALL];
  };

  Blockly.xrplhook['lists_length'] = function(block) {
    // List length.
    var argument0 = Blockly.xrplhook.valueToCode(block, 'VALUE',
        Blockly.xrplhook.ORDER_FUNCTION_CALL) || '[]';
    return [argument0 + '.length', Blockly.xrplhook.ORDER_MEMBER];
  };
  
  Blockly.xrplhook['lists_isEmpty'] = function(block) {
    // Is the list empty?
    var argument0 = Blockly.xrplhook.valueToCode(block, 'VALUE',
        Blockly.xrplhook.ORDER_MEMBER) || '[]';
    return ['!' + argument0 + '.length', Blockly.xrplhook.ORDER_LOGICAL_NOT];
  };
  
  Blockly.xrplhook['lists_indexOf'] = function(block) {
    // Find an item in the list.
    var operator = block.getFieldValue('END') == 'FIRST' ?
        'indexOf' : 'lastIndexOf';
    var argument0 = Blockly.xrplhook.valueToCode(block, 'FIND',
        Blockly.xrplhook.ORDER_NONE) || '\'\'';
    var argument1 = Blockly.xrplhook.valueToCode(block, 'VALUE',
        Blockly.xrplhook.ORDER_MEMBER) || '[]';
    var code = argument1 + '.' + operator + '(' + argument0 + ') + 1';
    return [code, Blockly.xrplhook.ORDER_MEMBER];
  };
  
  Blockly.xrplhook['lists_getIndex'] = function(block) {
      // Get element at index.
      // Note: Until January 2013 this block did not have MODE or WHERE inputs.
      var mode = block.getFieldValue('MODE') || 'GET';
      var where = block.getFieldValue('WHERE') || 'FROM_START';
      var at = Blockly.xrplhook.valueToCode(block, 'AT',
              Blockly.xrplhook.ORDER_UNARY_NEGATION) || '1';
      var list = Blockly.xrplhook.valueToCode(block, 'VALUE',
              Blockly.xrplhook.ORDER_MEMBER) || '[]';
      var code;
      if (where == 'FIRST') {
          if (mode == 'GET') {
              code = list + '[0]';
              return [code, Blockly.xrplhook.ORDER_MEMBER];
          } else if (mode == 'GET_REMOVE') {
              code = list + '.shift()';
              return [code, Blockly.xrplhook.ORDER_MEMBER];
          } else if (mode == 'REMOVE') {
              return list + '.shift();\n';
          }
      } else if (where == 'LAST') {
          if (mode == 'GET') {
              code = list + '.slice(-1)[0]';
              return [code, Blockly.xrplhook.ORDER_MEMBER];
          } else if (mode == 'GET_REMOVE') {
              code = list + '.pop()';
              return [code, Blockly.xrplhook.ORDER_MEMBER];
          } else if (mode == 'REMOVE') {
              return list + '.pop();\n';
          }
      } else if (where == 'FROM_START') {
          // Blockly uses one-based indicies.
        if (Blockly.isNumber(at)) {
            // If the index is a naked number, decrement it right now.
            at = parseFloat(at) - 1;
        } else {
            // If the index is dynamic, decrement it in code.
            at += ' - 1';
        }
        if (mode == 'GET') {
            code = list + '[' + at + ']';
            return [code, Blockly.xrplhook.ORDER_MEMBER];
        } else if (mode == 'GET_REMOVE') {
            code = list + '.splice(' + at + ', 1)[0]';
            return [code, Blockly.xrplhook.ORDER_FUNCTION_CALL];
        } else if (mode == 'REMOVE') {
            return list + '.splice(' + at + ', 1);\n';
        }
    } else if (where == 'FROM_END') {
        if (mode == 'GET') {
            code = list + '.slice(-' + at + ')[0]';
            return [code, Blockly.xrplhook.ORDER_FUNCTION_CALL];
        } else if (mode == 'GET_REMOVE' || mode == 'REMOVE') {
            var functionName = Blockly.xrplhook.provideFunction_(
                'lists_remove_from_end',
                [ 'function ' + Blockly.xrplhook.FUNCTION_NAME_PLACEHOLDER_ +
                '(list, x) {',
                    '  x = list.length - x;',
                    '  return list.splice(x, 1)[0];',
                    '}']);
            code = functionName + '(' + list + ', ' + at + ')';
            if (mode == 'GET_REMOVE') {
                return [code, Blockly.xrplhook.ORDER_FUNCTION_CALL];
            } else if (mode == 'REMOVE') {
                return code + ';\n';
            }
        }
    } else if (where == 'RANDOM') {
        var functionName = Blockly.xrplhook.provideFunction_(
            'lists_get_random_item',
            [ 'function ' + Blockly.xrplhook.FUNCTION_NAME_PLACEHOLDER_ +
            '(list, remove) {',
                '  var x = Math.floor(Math.random() * list.length);',
                '  if (remove) {',
                '    return list.splice(x, 1)[0];',
                '  } else {',
                '    return list[x];',
                '  }',
                '}']);
        code = functionName + '(' + list + ', ' + (mode != 'GET') + ')';
        if (mode == 'GET' || mode == 'GET_REMOVE') {
            return [code, Blockly.xrplhook.ORDER_FUNCTION_CALL];
        } else if (mode == 'REMOVE') {
            return code + ';\n';
        }
    }
      throw 'Unhandled combination (lists_getIndex).';
  };
  
  Blockly.xrplhook['lists_setIndex'] = function(block) {
    // Set element at index.
    // Note: Until February 2013 this block did not have MODE or WHERE inputs.
    var list = Blockly.xrplhook.valueToCode(block, 'LIST',
        Blockly.xrplhook.ORDER_MEMBER) || '[]';
    var mode = block.getFieldValue('MODE') || 'GET';
    var where = block.getFieldValue('WHERE') || 'FROM_START';
    var at = Blockly.xrplhook.valueToCode(block, 'AT',
        Blockly.xrplhook.ORDER_NONE) || '1';
    var value = Blockly.xrplhook.valueToCode(block, 'TO',
        Blockly.xrplhook.ORDER_ASSIGNMENT) || 'null';
    // Cache non-trivial values to variables to prevent repeated look-ups.
    // Closure, which accesses and modifies 'list'.
    function cacheList() {
      if (list.match(/^\w+$/)) {
        return '';
      }
      var listVar = Blockly.xrplhook.variableDB_.getDistinctName(
          'tmp_list', Blockly.Variables.NAME_TYPE);
      var code = 'var ' + listVar + ' = ' + list + ';\n';
      list = listVar;
      return code;
    }
    if (where == 'FIRST') {
      if (mode == 'SET') {
        return list + '[0] = ' + value + ';\n';
      } else if (mode == 'INSERT') {
        return list + '.unshift(' + value + ');\n';
      }
    } else if (where == 'LAST') {
      if (mode == 'SET') {
        var code = cacheList();
        code += list + '[' + list + '.length - 1] = ' + value + ';\n';
        return code;
      } else if (mode == 'INSERT') {
        return list + '.push(' + value + ');\n';
      }
    } else if (where == 'FROM_START') {
      // Blockly uses one-based indicies.
      if (Blockly.isNumber(at)) {
        // If the index is a naked number, decrement it right now.
        at = parseFloat(at) - 1;
      } else {
        // If the index is dynamic, decrement it in code.
        at += ' - 1';
      }
      if (mode == 'SET') {
        return list + '[' + at + '] = ' + value + ';\n';
      } else if (mode == 'INSERT') {
        return list + '.splice(' + at + ', 0, ' + value + ');\n';
      }
    } else if (where == 'FROM_END') {
      var code = cacheList();
      if (mode == 'SET') {
        code += list + '[' + list + '.length - ' + at + '] = ' + value + ';\n';
        return code;
      } else if (mode == 'INSERT') {
        code += list + '.splice(' + list + '.length - ' + at + ', 0, ' + value +
            ');\n';
        return code;
      }
    } else if (where == 'RANDOM') {
      var code = cacheList();
      var xVar = Blockly.xrplhook.variableDB_.getDistinctName(
          'tmp_x', Blockly.Variables.NAME_TYPE);
      code += 'var ' + xVar + ' = Math.floor(Math.random() * ' + list +
          '.length);\n';
      if (mode == 'SET') {
        code += list + '[' + xVar + '] = ' + value + ';\n';
        return code;
      } else if (mode == 'INSERT') {
        code += list + '.splice(' + xVar + ', 0, ' + value + ');\n';
        return code;
      }
    }
    throw 'Unhandled combination (lists_setIndex).';
  };

// Blockly.xrplhook['lists_length'] = Blockly.xrplhook.noGeneratorCodeInline;

// Blockly.xrplhook['lists_isEmpty'] = Blockly.xrplhook.noGeneratorCodeInline;

// Blockly.xrplhook['lists_indexOf'] = Blockly.xrplhook.noGeneratorCodeInline;

// Blockly.xrplhook['lists_getIndex'] = Blockly.xrplhook.noGeneratorCodeInline;

// Blockly.xrplhook['lists_setIndex'] = Blockly.xrplhook.noGeneratorCodeLine;

