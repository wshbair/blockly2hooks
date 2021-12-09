/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Float functions
 *     https://xrpl-hooks.readme.io/reference/hook
 *     ToDo add proper Type check
 */

 'use strict';

goog.provide('Blockly.Blocks.float'); 
goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

Blockly.Blocks.float.HUE = 195;

  //Create a float from an exponent and mantissa
  Blockly.Blocks['float_set'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("float_set");
      this.appendValueInput("exponent")
          .setCheck(null)
          .appendField("exponent");
      this.appendValueInput("mantissa")
          .setCheck(null)
          .appendField("mantissa");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(Blockly.Blocks.float.HUE);
      this.setTooltip('Create a float from an exponent and mantissa');
      this.setHelpUrl('');
    }
  };
  //Multiply two XFL numbers together
  Blockly.Blocks['float_multiply'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("float_multiply");
      this.appendValueInput("float1")
          .setCheck(null)
          .appendField("float1");
      this.appendValueInput("float2")
          .setCheck(null)
          .appendField("float2");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(Blockly.Blocks.float.HUE);
      this.setTooltip('Multiply two XFL numbers together');
      this.setHelpUrl('');
    }
  };
  //Multiply an XFL floating point by a non-XFL numerator and denominator
  Blockly.Blocks['float_mulratio'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("float_mulratio");
      this.appendValueInput("float1")
          .setCheck(null)
          .appendField("float1");
      this.appendValueInput("round_up")
          .setCheck(null)
          .appendField("round_up");
      this.appendValueInput("numerator")
          .setCheck(null)
          .appendField("numerator");
      this.appendValueInput("denominator")
          .setCheck(null)
          .appendField("denominator");
      this.setInputsInline(false);
      this.setOutput(true, null);
      this.setColour(Blockly.Blocks.float.HUE);
      this.setTooltip('Multiply an XFL floating point by a non-XFL numerator and denominator');
      this.setHelpUrl('');
    }
  };
  //Negate an XFL floating point number
  Blockly.Blocks['float_negate'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("float_negate");
      this.appendValueInput("float1")
          .setCheck(null)
          .appendField("float1");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(Blockly.Blocks.float.HUE);
      this.setTooltip('Negate an XFL floating point number');
      this.setHelpUrl('');
    }
  };
  //Perform a comparison on two XFL floating point numbers
  Blockly.Blocks['float_compare'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("float_negate");
      this.appendValueInput("float1")
          .setCheck(null)
          .appendField("float1");
      this.appendValueInput("float2")
          .setCheck(null)
          .appendField("float2");
      this.appendValueInput("mode")
          .setCheck(null)
          .appendField("mode");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(Blockly.Blocks.float.HUE);
      this.setTooltip('Perform a comparison on two XFL floating point numbers');
      this.setHelpUrl('');
    }
  };

  //Add two XFL numbers together
  Blockly.Blocks['float_sum'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("float_sum");
      this.appendValueInput("float1")
          .setCheck(null)
          .appendField("float1");
      this.appendValueInput("float2")
          .setCheck(null)
          .appendField("float2");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(Blockly.Blocks.float.HUE);
      this.setTooltip('Add two XFL numbers together');
      this.setHelpUrl('');
    }
  };
  //Output an XFL as a serialized object
  Blockly.Blocks['float_sto'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("float_sto");
      this.appendValueInput("write_ptr")
          .setCheck(null)
          .appendField("write_ptr");
      this.appendValueInput("write_len")
          .setCheck(null)
          .appendField("write_len");
      this.appendValueInput("cread_ptr")
          .setCheck(null)
          .appendField("cread_ptr");
      this.appendValueInput("cread_len")
          .setCheck(null)
          .appendField("cread_len");
      this.appendValueInput("iread_ptr")
          .setCheck(null)
          .appendField("iread_ptr");
      this.appendValueInput("float1")
          .setCheck(null)
          .appendField("float1");
      this.appendValueInput("field_code")
          .setCheck(null)
          .appendField("field_code");
      this.setInputsInline(false);
      this.setOutput(true, null);
      this.setColour(Blockly.Blocks.float.HUE);
      this.setTooltip('Output an XFL as a serialized object');
      this.setHelpUrl('');
    }
  };
  // Read a serialized amount into an XFL
  Blockly.Blocks['float_sto_set'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("float_sto_set");
      this.appendValueInput("read_ptr")
          .setCheck(null)
          .appendField("read_ptr");
      this.appendValueInput("read_len")
          .setCheck(null)
          .appendField("read_len");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(Blockly.Blocks.float.HUE);
      this.setTooltip('Read a serialized amount into an XFL');
      this.setHelpUrl('');
    }
  };

  //Divide one by an XFL floating point number
  Blockly.Blocks['float_invert'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("float_invert");
      this.appendValueInput("float1")
          .setCheck(null)
          .appendField("float1");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(Blockly.Blocks.float.HUE);
      this.setTooltip('Divide one by an XFL floating point number');
      this.setHelpUrl('');
    }
  };
  //Divide an XFL by another XFL floating point number
  Blockly.Blocks['float_divide'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("float_divide");
      this.appendValueInput("float1")
          .setCheck(null)
          .appendField("float1");
      this.appendValueInput("float2")
          .setCheck(null)
          .appendField("float2");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(Blockly.Blocks.float.HUE);
      this.setTooltip('Divide an XFL by another XFL floating point number');
      this.setHelpUrl('');
    }
  };

  //Return the number 1 represented in an XFL enclosing number
  Blockly.Blocks['float_one'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("float_one");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(Blockly.Blocks.float.HUE);
      this.setTooltip('Return the number 1 represented in an XFL enclosing number');
      this.setHelpUrl('');
    }
  };
  

//Get the exponent of an XFL enclosing number
Blockly.Blocks['float_exponent'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("float_exponent");
      this.appendValueInput("float1")
          .setCheck(null)
          .appendField("float1");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(Blockly.Blocks.float.HUE);
      this.setTooltip('Get the exponent of an XFL enclosing number');
      this.setHelpUrl('');
    }
  };

//Get the mantissa of an XFL enclosing number
Blockly.Blocks['float_mantissa'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("float_mantissa");
      this.appendValueInput("float1")
          .setCheck(null)
          .appendField("float1");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(Blockly.Blocks.float.HUE);
      this.setTooltip('Get the exponent of an XFL enclosing number');
      this.setHelpUrl('');
    }
  };

//Get the sign of an XFL enclosing number
Blockly.Blocks['float_sign'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("float_sign");
      this.appendValueInput("float1")
          .setCheck(null)
          .appendField("float1");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(Blockly.Blocks.float.HUE);
      this.setTooltip('Get the sign of an XFL enclosing number');
      this.setHelpUrl('');
    }
  };

//Set the exponent of an XFL enclosing number
Blockly.Blocks['float_exponent_set'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("float_exponent_set");
      this.appendValueInput("float1")
          .setCheck(null)
          .appendField("float1");
      this.appendValueInput("exponent")
          .setCheck(null)
          .appendField("exponent");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(Blockly.Blocks.float.HUE);
      this.setTooltip('Set the exponent of an XFL enclosing number');
      this.setHelpUrl('');
    }
  };

//Set the exponent of an XFL enclosing number
Blockly.Blocks['float_mantissa_set'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("float_mantissa_set");
      this.appendValueInput("float1")
          .setCheck(null)
          .appendField("float1");
      this.appendValueInput("mantissa")
          .setCheck(null)
          .appendField("mantissa");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(Blockly.Blocks.float.HUE);
      this.setTooltip('Set the mantissa of an XFL enclosing number');
      this.setHelpUrl('');
    }
  };

//Set the sign of an XFL enclosing number
Blockly.Blocks['float_sign_set'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("float_sign_set");
      this.appendValueInput("float1")
          .setCheck(null)
          .appendField("float1");
      this.appendValueInput("sign")
          .setCheck(null)
          .appendField("sign");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(Blockly.Blocks.float.HUE);
      this.setTooltip('Set the sign of an XFL enclosing number');
      this.setHelpUrl('');
    }
  };

  //Convert an XFL floating point into an integer (floor)
  Blockly.Blocks['float_int'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("float_int");
      this.appendValueInput("float1")
          .setCheck(null)
          .appendField("float1");
      this.appendValueInput("decimal_places")
          .setCheck(null)
          .appendField("decimal_places");
      this.appendValueInput("absolute")
          .setCheck(null)
          .appendField("absolute");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(Blockly.Blocks.float.HUE);
      this.setTooltip('Convert an XFL floating point into an integer (floor)');
      this.setHelpUrl('');
    }
  };


  