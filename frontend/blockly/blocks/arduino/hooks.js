/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Blocks for Arduino Digital and Analogue input and output
 *     functions. The Arduino function syntax can be found at
 *     http://arduino.cc/en/Reference/HomePage
 *
 * TODO: maybe change this to a "PIN" BlocklyType
 */
 'use strict';

 goog.provide('Blockly.Blocks.hooks');
 
 goog.require('Blockly.Blocks');
 goog.require('Blockly.Types');
 
 /** Common HSV hue for all blocks in this category. */
 Blockly.Blocks.hooks.HUE = 400;

 Blockly.Blocks['firewall'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Firewall Hooks");
      this.appendValueInput("x")
          .setCheck(null)
          .appendField(new Blockly.FieldTextInput("block account"), "block_account");
      this.appendValueInput("y")
          .setCheck(null)
          .appendField(new Blockly.FieldTextInput("wallet address"), "wallet_address");
      this.appendValueInput("z")
          .setCheck(null)
          .appendField(new Blockly.FieldTextInput("blacklist server"), "blacklist_server");
      this.setColour(330);
      this.setTooltip('');
      this.setHelpUrl('http://www.example.com/');
    }
  };
 

 