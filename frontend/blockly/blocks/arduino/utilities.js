/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Control hook functions
 *     https://xrpl-hooks.readme.io/reference/hook
 *     ToDo add proper Type check
 */
 'use strict';

 goog.provide('Blockly.Blocks.utilities');
 
 goog.require('Blockly.Blocks');
 goog.require('Blockly.Types');
 
 /** Common HSV hue for all blocks in this category. */
 Blockly.Blocks.utilities.HUE = 225;

  // Convert a 20 byte Account ID to an r-address
  Blockly.Blocks['util_raddr'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("util_raddr");
      this.appendValueInput("write_ptr")
          .setCheck(null)
          .appendField("write_ptr");
      this.appendValueInput("write_len")
          .setCheck(null)
          .appendField("write_len");
      this.appendValueInput("read_ptr")
          .setCheck(null)
          .appendField("read_ptr");
      this.appendValueInput("read_len")
          .setCheck(null)
          .appendField("read_len");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(Blockly.Blocks.utilities.HUE);
      this.setTooltip('Convert a 20 byte Account ID to an r-address');
      this.setHelpUrl('https://xrpl-hooks.readme.io/reference/util_raddr');
    }
  };

  //Convert an r-address into a 20 byte Account ID
  Blockly.Blocks['util_accid'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("util_accid");
      this.appendValueInput("write_ptr")
          .setCheck(null)
          .appendField("write_ptr");
      this.appendValueInput("read_ptr")
          .setCheck(null)
          .appendField("read_ptr");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(Blockly.Blocks.utilities.HUE);
      this.setTooltip('Convert an r-address into a 20 byte Account ID');
      this.setHelpUrl('');
    }
  };
  
  //Verify a cryptographic signature
  Blockly.Blocks['util_verify'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("util_verify");
      this.appendValueInput("dread_ptr")
          .setCheck(null)
          .appendField("dread_ptr");
      this.appendValueInput("dread_len")
          .setCheck(null)
          .appendField("dread_len");
      this.appendValueInput("sread_ptr")
          .setCheck(null)
          .appendField("sread_ptr");
      this.appendValueInput("sread_len")
          .setCheck(null)
          .appendField("sread_len");
      this.appendValueInput("kread_ptr")
          .setCheck(null)
          .appendField("kread_ptr");
      this.appendValueInput("kread_len")
          .setCheck(null)
          .appendField("kread_len");
      this.setInputsInline(false);
      this.setOutput(true, null);
      this.setColour(Blockly.Blocks.utilities.HUE);
      this.setTooltip('Verify a cryptographic signature');
      this.setHelpUrl('http://www.example.com/');
    }
  };
  
  //Compute an sha512-half over some data
  Blockly.Blocks['util_sha512h'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("util_sha512h");
      this.appendValueInput("write_ptr")
          .setCheck(null)
          .appendField("write_ptr");
      this.appendValueInput("write_len")
          .setCheck(null)
          .appendField("write_len");
      this.appendValueInput("read_ptr")
          .setCheck(null)
          .appendField("read_ptr");
      this.appendValueInput("read_len")
          .setCheck(null)
          .appendField("read_len");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(Blockly.Blocks.utilities.HUE);
      this.setTooltip('Compute an sha512-half over some data');
      this.setHelpUrl('http://www.example.com/');
    }
  };

  //Compute a serialized keylet of a given type
  Blockly.Blocks['util_keylet'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("util_keylet");
      this.appendValueInput("write_ptr")
          .setCheck(null)
          .appendField("write_ptr");
      this.appendValueInput("write_len")
          .setCheck(null)
          .appendField("write_len");
      this.appendValueInput("keylet_type")
          .setCheck(null)
          .appendField("keylet_type");
      this.appendValueInput("a")
          .setCheck(null)
          .appendField("a");
      this.appendValueInput("b")
          .setCheck(null)
          .appendField("b");
      this.appendValueInput("c")
          .setCheck(null)
          .appendField("c");
      this.appendValueInput("d")
          .setCheck(null)
          .appendField("d");
      this.appendValueInput("e")
          .setCheck(null)
          .appendField("e");
      this.appendValueInput("f")
          .setCheck(null)
          .appendField("f");
      this.setInputsInline(false);
      this.setOutput(true, null);
      this.setColour(Blockly.Blocks.utilities.HUE);
      this.setTooltip('Compute a serialized keylet of a given type');
      this.setHelpUrl('http://www.example.com/');
    }
  };
  
  
   
   
 

 