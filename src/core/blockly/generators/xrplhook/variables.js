/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Generating xrplhook code for variables blocks.
 */
'use strict';

goog.provide('Blockly.xrplhook.variables');

goog.require('Blockly.xrplhook');


/**
 * Code generator for variable (X) getter.
 * xrplhook code: loop { X }
 * @param {Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.xrplhook['variables_get'] = function(block) {
  var code = Blockly.xrplhook.variableDB_.getName(block.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  return [code, Blockly.xrplhook.ORDER_ATOMIC];
};

/**
 * Code generator for variable (X) setter (Y).
 * xrplhook code: type X;
 *               loop { X = Y; }
 * @param {Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.xrplhook['variables_set'] = function(block) {
  var argument0 = Blockly.xrplhook.valueToCode(block, 'VALUE',
      Blockly.xrplhook.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.xrplhook.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  return varName + ' = ' + argument0 + ';\n';
};

/**
 * Code generator for variable (X) casting (Y).
 * xrplhook code: loop { (Y)X }
 * @param {Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.xrplhook['variables_set_type'] = function(block) {
  var argument0 = Blockly.xrplhook.valueToCode(block, 'VARIABLE_SETTYPE_INPUT',
      Blockly.xrplhook.ORDER_ASSIGNMENT) || '0';
  var varType = block.getFieldValue('VARIABLE_SETTYPE_TYPE');
  var code = '(' + varType + ')(' + argument0 + ')';
  return [code, Blockly.xrplhook.ORDER_ATOMIC];
};


Blockly.xrplhook['pointer'] = function(block) {
  var dropdown_type = block.getFieldValue('type');
  var text_name = block.getFieldValue('NAME');
  var text_pointer_name = block.getFieldValue('pointer_name');
  var value_inital = Blockly.xrplhook.valueToCode(block, 'initial', Blockly.xrplhook.ORDER_ATOMIC);
  var code = dropdown_type+' '+text_name+text_pointer_name+' = '+value_inital+ ';\n';
  Blockly.xrplhook.variables_["test1"] = code;
  
  return code;
};

Blockly.xrplhook['string'] = function(block) {
  var dropdown_type = block.getFieldValue('type');
  var text_mystring = block.getFieldValue('mystring');
  var value_length = Blockly.xrplhook.valueToCode(block, 'length', Blockly.xrplhook.ORDER_ATOMIC);
  var value_string_var = Blockly.xrplhook.valueToCode(block, 'string_var', Blockly.xrplhook.ORDER_ATOMIC);
  var code = dropdown_type +' '+text_mystring+'['+value_length+'] = '+value_string_var+ ';\n';
   Blockly.xrplhook.variables_["test2"] = code;

  return code;
};


///////
Blockly.xrplhook['define_get'] = function(block) {
  // Variable getter.
  var code = Blockly.xrplhook.variableDB_.getName(block.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  return [code, Blockly.xrplhook.ORDER_ATOMIC];
};

Blockly.xrplhook['define_declare'] = function(block) {
  // Variable declare.
  var argument0 = Blockly.xrplhook.valueToCode(block, 'VALUE',
          Blockly.xrplhook.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.xrplhook.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var define = '#define';
  if (Blockly.Blocks.checkLegalName(Blockly.Msg.VARIABLES_ILLEGALNAME, varName) == -1){
      this.initVar();
  }
  var code = define + ' ' + varName + ' ' + argument0;
  code = Blockly.xrplhook.scrub_(block, code);
  Blockly.xrplhook.definitions_['define_' + varName] = code;
  return null;
};

Blockly.xrplhook['variables_get'] = function(block) {
  // Variable getter.
  var code = Blockly.xrplhook.variableDB_.getName(block.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  return [code, Blockly.xrplhook.ORDER_ATOMIC];
};

Blockly.xrplhook['variables_set'] = function(block) {
  // Variable setter.
  var argument0 = Blockly.xrplhook.valueToCode(block, 'VALUE',
          Blockly.xrplhook.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.xrplhook.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
   return varName + ' = ' + argument0 + ';\n';
};

Blockly.xrplhook['variables_declare'] = function(block) {
  // Variable declare.
  var argument0 = Blockly.xrplhook.valueToCode(block, 'VALUE',
          Blockly.xrplhook.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.xrplhook.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var varType = block.getFieldValue('TYPES');
  return varType + ' ' + varName + ' = ' + argument0 + ';\n';
};

Blockly.xrplhook['variables_pointer_get'] = function(block) {
  // Variable getter.
  var code = Blockly.xrplhook.variableDB_.getName(block.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
   return [code, Blockly.xrplhook.ORDER_ATOMIC];
};

Blockly.xrplhook['variables_pointer_set'] = function(block) {
  // Variable setter.
  var argument0 = Blockly.xrplhook.valueToCode(block, 'VALUE',
          Blockly.xrplhook.ORDER_ASSIGNMENT) || '0';
  var argument1 = Blockly.xrplhook.valueToCode(block, 'VAR',
      Blockly.xrplhook.ORDER_ASSIGNMENT);
   return argument1 + ' = ' + argument0 + ';\n';
};

Blockly.xrplhook['variables_pointer_declare'] = function(block) {
  // Variable declare.
  var argument0 = Blockly.xrplhook.valueToCode(block, 'VALUE',
          Blockly.xrplhook.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.xrplhook.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var varType = block.getFieldValue('TYPES');
  var varIteration;
  if (block.getFieldValue('ITERATION') == '*' || block.getFieldValue('ITERATION') == '**' || block.getFieldValue('ITERATION') == '***')
      varIteration = block.getFieldValue('ITERATION');
  else {
      window.alert('please confirm asterisk. that must be among *, **, and  ***.');
      return 0;
  }
   
  return varType +' '+ varIteration + varName + ' = ' + argument0 + ';\n';
};


 // array 
Blockly.xrplhook['variables_array_get'] = function(block) {
  var varName = Blockly.xrplhook.variableDB_.getName(block.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
   var length_1 = block.getFieldValue('LENGTH_1');
 
  // if length_1 is number
  if (isNaN(length_1) == false) {
      length_1 = (length_1 == '' ? -1 :length_1 * 1);
  }
   
  // // get array list
  // var arrList = Blockly.Blocks.getWantedBlockArray('a');
 

  // // get index of array from array list
  // var idxList = Blockly.Blocks.getIndexArray(arrList, varName);

  // var code;
  // var isAvbNum1;

  // isAvbNum1 = Blockly.Blocks.checkArrayIndex(length_1, idxList[0]);

  // // index over -> msg
  // if ((isAvbNum1 == false && length_1 != -1) ) {
  //     window.alert('index exceeded');
  //     block.initIdx(isAvbNum1);
  // }

  // else if (isAvbNum1 == true )
  //     code = varName + '[' + length_1 + ']';
  // else
  //     block.initIdx(isAvbNum1);
  var code = varName + '[' + length_1 + ']';
  return [code, Blockly.xrplhook.ORDER_ATOMIC];
};

Blockly.xrplhook['variables_array_set'] = function(block) {
  // Variable setter.
  var argument0 = Blockly.xrplhook.valueToCode(block, 'VALUE',
          Blockly.xrplhook.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.xrplhook.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);

  var length_1 = block.getFieldValue('LENGTH_1');

  // if no-input : regarded as -1 to distinguish with 0
  length_1 = (length_1 == '' ? -1 :length_1 * 1);

  // get array list
  var arrList =  Blockly.Blocks.getWantedBlockArray('a');

  // get index of array from array list
  var idxList = Blockly.Blocks.getIndexArray(arrList, varName);

  var code;
  /* if (isNaN(length_1) == true || isNaN(length_2) == true || isNaN(length_3) == true) {
   window.alert('Error, you have to enter the number in length');
   }
   else {*/
  var isAvbNum1

  isAvbNum1 = Blockly.Blocks.checkArrayIndex(length_1, idxList[0]);
 
  // index over -> msg
  if ((isAvbNum1 == false && length_1 != -1)) {
      window.alert('인덱스 초과');
      block.initIdx(isAvbNum1);
  }
  else if (isAvbNum1 == true && isAvbNum2 == false)
      code = varName + '[' + length_1 + ']' + ' = ' + argument0 + ';\n';
  else
      block.initIdx(isAvbNum1, isAvbNum2, isAvbNum3);

  //}
  return code;
};

Blockly.xrplhook['variables_array_declare'] = function(block) {
  // Variable declare.
  var argument0 = Blockly.xrplhook.valueToCode(block, 'VALUE',
          Blockly.xrplhook.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.xrplhook.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var varType = block.getFieldValue('TYPES');
  var length_1 = block.getFieldValue('LENGTH_1');
  var code = varType + ' ' + varName + '[' + length_1 + '];\n';
  return code;
};


// Blockly.Blocks.getWantedBlockArray = function(a) {
//   for (var b = Blockly.Variables.allVariables(), c = [], d = 0; d < b.length; d++) b[d][1] == a && c.push([b[d][0], b[d][1], b[d][2], b[d][3], b[d][4], b[d][5]]);
//   return c
// };