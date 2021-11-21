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

 goog.provide('Blockly.Blocks.controls');
 
 goog.require('Blockly.Blocks');
 goog.require('Blockly.Types');
 
 /** Common HSV hue for all blocks in this category. */
 Blockly.Blocks.hooks.HUE = 290;

  // Accept control function
  Blockly.Blocks['control_accept'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("accept");
      this.appendValueInput("read_ptr")
          .setCheck(null)
          .appendField("read_ptr");
      this.appendValueInput("error_code")
          .setCheck(null)
          .appendField("error_code");
      this.setInputsInline(true);
      this.setNextStatement(true, null);
      this.setPreviousStatement(true, null);
      this.setColour(290);
      this.setTooltip('Accept the originating transaction and commit any changes the hook made.');
      this.setHelpUrl('https://xrpl-hooks.readme.io/reference/accept');
    }
  };

  //Rollback function
  Blockly.Blocks['control_rollback'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("rollback");
      this.appendValueInput("read_ptr")
          .setCheck(null)
          .appendField("read_ptr");
      this.appendValueInput("error_code")
          .setCheck(null)
          .appendField("error_code");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(290);
      this.setTooltip('Reject the originating transaction and discard any changes the hook made.');
      this.setHelpUrl('https://xrpl-hooks.readme.io/reference/rollback');
    }
  };
  
 

 