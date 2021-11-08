/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview  Firewall XRPL hook  block
 *     https://xrpl-hooks.readme.io/reference/hook
 *
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
          .appendField("Firewall Hook");
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
      this.setHelpUrl('https://github.com/XRPL-Labs/xrpld-hooks');
    }
  };

  Blockly.Blocks['accept'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Accept hook");
      this.setColour(120);
      this.setTooltip('Accept hook');
      this.setHelpUrl('https://github.com/XRPL-Labs/xrpld-hooks');
    }
  };

  // Hooks control functions 
  Blockly.Blocks['control_accept'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("accept");
      this.appendValueInput("read_ptr")
          .setCheck("uint32_t")
          .appendField("read_ptr");
      this.appendValueInput("read_len")
          .setCheck("uint32_t")
          .appendField("read_len");
      this.appendValueInput("error_code")
          .setCheck("uint32_t")
          .appendField("error_code");
      this.setInputsInline(true);
      this.setColour(290);
      this.setTooltip('Accept the originating transaction and commit any changes the hook made.');
      this.setHelpUrl('https://xrpl-hooks.readme.io/reference/accept');
    }
  };
 

 