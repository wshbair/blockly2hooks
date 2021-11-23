/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Generating Arduino code for variables blocks.
 */
'use strict';

goog.provide('Blockly.Arduino.variables');

goog.require('Blockly.Arduino');


/**
 * Code generator for variable (X) getter.
 * Arduino code: loop { X }
 * @param {Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['variables_get'] = function(block) {
  var code = Blockly.Arduino.variableDB_.getName(block.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

/**
 * Code generator for variable (X) setter (Y).
 * Arduino code: type X;
 *               loop { X = Y; }
 * @param {Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['variables_set'] = function(block) {
  var argument0 = Blockly.Arduino.valueToCode(block, 'VALUE',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.Arduino.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  return varName + ' = ' + argument0 + ';\n';
};

/**
 * Code generator for variable (X) casting (Y).
 * Arduino code: loop { (Y)X }
 * @param {Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['variables_set_type'] = function(block) {
  var argument0 = Blockly.Arduino.valueToCode(block, 'VARIABLE_SETTYPE_INPUT',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var varType = block.getFieldValue('VARIABLE_SETTYPE_TYPE');
  var code = '(' + varType + ')(' + argument0 + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino['pointer'] = function(block) {
  var dropdown_type = block.getFieldValue('type');
  var text_name = block.getFieldValue('NAME');
  var text_pointer_name = block.getFieldValue('pointer_name');
  var value_inital = Blockly.Arduino.valueToCode(block, 'initial', Blockly.Arduino.ORDER_ATOMIC);
  var code = dropdown_type+' '+text_name+text_pointer_name+' = '+value_inital+ ';\n';
  Blockly.Arduino.variables_["test1"] = code;
  
  return code;
};

Blockly.Arduino['string'] = function(block) {
  var dropdown_type = block.getFieldValue('type');
  var text_mystring = block.getFieldValue('mystring');
  var value_length = Blockly.Arduino.valueToCode(block, 'length', Blockly.Arduino.ORDER_ATOMIC);
  var value_string_var = Blockly.Arduino.valueToCode(block, 'string_var', Blockly.Arduino.ORDER_ATOMIC);
  var code = dropdown_type +' '+text_mystring+'['+value_length+'] = '+value_string_var+ ';\n';
   Blockly.Arduino.variables_["test2"] = code;

  return code;
};


///////
Blockly.Arduino['define_get'] = function(block) {
  // Variable getter.
  var code = Blockly.Arduino.variableDB_.getName(block.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['define_declare'] = function(block) {
  // Variable declare.
  var argument0 = Blockly.Arduino.valueToCode(block, 'VALUE',
          Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.Arduino.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var define = '#define';
  if (Blockly.Blocks.checkLegalName(Blockly.Msg.VARIABLES_ILLEGALNAME, varName) == -1){
      this.initVar();
  }
  var code = define + ' ' + varName + ' ' + argument0;
  code = Blockly.Arduino.scrub_(block, code);
  Blockly.Arduino.definitions_['define_' + varName] = code;
  return null;
};

Blockly.Arduino['variables_get'] = function(block) {
  // Variable getter.
  var code = Blockly.Arduino.variableDB_.getName(block.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['variables_set'] = function(block) {
  // Variable setter.
  var argument0 = Blockly.Arduino.valueToCode(block, 'VALUE',
          Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.Arduino.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
   return varName + ' = ' + argument0 + ';\n';
};

Blockly.Arduino['variables_declare'] = function(block) {
  // Variable declare.
  var argument0 = Blockly.Arduino.valueToCode(block, 'VALUE',
          Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.Arduino.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var varType = block.getFieldValue('TYPES');
  return varType + ' ' + varName + ' = ' + argument0 + ';\n';
};

Blockly.Arduino['variables_pointer_get'] = function(block) {
  // Variable getter.
  var code = Blockly.Arduino.variableDB_.getName(block.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
   return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['variables_pointer_set'] = function(block) {
  // Variable setter.
  var argument0 = Blockly.Arduino.valueToCode(block, 'VALUE',
          Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var argument1 = Blockly.Arduino.valueToCode(block, 'VAR',
      Blockly.Arduino.ORDER_ASSIGNMENT);
   return argument1 + ' = ' + argument0 + ';\n';
};

Blockly.Arduino['variables_pointer_declare'] = function(block) {
  // Variable declare.
  var argument0 = Blockly.Arduino.valueToCode(block, 'VALUE',
          Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.Arduino.variableDB_.getName(
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
Blockly.Arduino['variables_array_get'] = function(block) {
  var varName = Blockly.Arduino.variableDB_.getName(block.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
   var length_1 = block.getFieldValue('LENGTH_1');
 
  // if length_1 is number
  if (isNaN(length_1) == false) {
      length_1 = (length_1 == '' ? -1 :length_1 * 1);
  }
   
  // get array list
  var arrList = Blockly.Blocks.getWantedBlockArray('a');

  // get index of array from array list
  var idxList = Blockly.Blocks.getIndexArray(arrList, varName);

  var code;
  var isAvbNum1;

  isAvbNum1 = Blockly.Blocks.checkArrayIndex(length_1, idxList[0]);

  // index over -> msg
  if ((isAvbNum1 == false && length_1 != -1) ) {
      window.alert('index exceeded');
      block.initIdx(isAvbNum1);
  }

  else if (isAvbNum1 == true )
      code = varName + '[' + length_1 + ']';
  else
      block.initIdx(isAvbNum1);

  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['variables_array_set'] = function(block) {
  // Variable setter.
  var argument0 = Blockly.Arduino.valueToCode(block, 'VALUE',
          Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.Arduino.variableDB_.getName(
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

Blockly.Arduino['variables_array_declare'] = function(block) {
  // Variable declare.
  var argument0 = Blockly.Arduino.valueToCode(block, 'VALUE',
          Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.Arduino.variableDB_.getName(
      block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var varType = block.getFieldValue('TYPES');
  var length_1 = block.getFieldValue('LENGTH_1');
  var code = varType + ' ' + varName + '[' + length_1 + '];\n';
  return code;
};
