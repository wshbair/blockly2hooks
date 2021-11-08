/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Block for the Arduino map functionality.
 *     The Arduino built in functions syntax can be found at:
 *     http://arduino.cc/en/Reference/HomePage
 *
 * TODO: This block can be improved to set the new range properly.
 */
'use strict';

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');


/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.variables.HUE = 330;

Blockly.Blocks['variables_set_type'] = {
  /**
   * Block for variable casting.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/HomePage');
    this.setColour(Blockly.Blocks.variables.HUE);
    this.appendValueInput('VARIABLE_SETTYPE_INPUT');
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_VAR_AS)
        .appendField(new Blockly.FieldDropdown(
                         Blockly.Types.getValidTypeArray()),
                     'VARIABLE_SETTYPE_TYPE');
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip(Blockly.Msg.ARD_VAR_AS_TIP);
  },
  /**
   * Assigns a type to the block based on the selected type to cast.
   * @return {!string} Blockly type for this block configuration.
   * @this Blockly.Block
   */
  getBlockType: function() {
    var blocklyTypeKey = this.getFieldValue('VARIABLE_SETTYPE_TYPE');
    return Blockly.Types[blocklyTypeKey];
  }
};

Blockly.Blocks['declare_variable_hook'] = {
  init: function() {
    this.appendValueInput("inital")
        .setCheck(null)
        .appendField(new Blockly.FieldDropdown([["int", "int"],["int32_t", "int32_t"], ["int64_t", "int64_t"], ["uint8_t", "uint8_t"], ["uint32_t", "uint32_t"]]), "var_type")
        .appendField("variable name")
        .appendField(new Blockly.FieldTextInput("myvariable"), "var_name")
        .appendField("inital value");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.variables.HUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
    
  },
};

Blockly.Blocks['pointer'] = {
  init: function() {
    this.appendValueInput("initial")
        .setCheck(null)
        .appendField(new Blockly.FieldDropdown([["int", "int"],["int32_t", "int32_t"], ["int64_t", "int64_t"], ["uint8_t", "uint8_t"], ["uint32_t", "uint32_t"]]), "type")
        .appendField("pointer")
        .appendField(new Blockly.FieldTextInput("*"), "NAME")
        .appendField("name")
        .appendField(new Blockly.FieldTextInput("mypointer"), "pointer_name")
        .appendField("initial value");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.variables.HUE);
    this.setTooltip('pointer varaible');
    this.setHelpUrl('http://www.example.com/');
  }
};


Blockly.Blocks['string'] = {
  init: function() {
    this.appendValueInput("string_var")
        .setCheck(null)
        .appendField("string")
        .appendField(new Blockly.FieldDropdown([["character", "char"]]), "type")
        .appendField("name")
        .appendField(new Blockly.FieldTextInput("mystring"), "mystring")
        .appendField("length");
    this.appendValueInput("length")
        .setCheck(null)
        .appendField("value");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.variables.HUE);
    this.setTooltip('Define string');
    this.setHelpUrl('http://www.example.com/');
  }
};