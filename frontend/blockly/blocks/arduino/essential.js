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
 goog.provide('Blockly.Blocks.essential'); 
 goog.require('Blockly.Blocks');
 goog.require('Blockly.Types');
 
 
 /** Common HSV hue for all blocks in this category. */
 Blockly.Blocks.essential.HUE = 230;
    /**
     * Block for defining the Hook cbak() and hook() functions.
     * @this Blockly.Block
     */
 Blockly.Blocks['hook_template'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("cbak()");
      this.appendStatementInput('SETUP_FUNC');
      this.appendDummyInput()
          .appendField("hook()");
      this.appendStatementInput('LOOP_FUNC');
      this.setInputsInline(false);
      this.setColour(120);
      this.setTooltip("Block for defining the Hook cbak() and hook() functions");
      this.setHelpUrl('');
      this.contextMenu = false;
    },
    /** @return {!boolean} True if the block instance is in the workspace. */
    getArduinoLoopsInstance: function() {
      return true;
    }
  };
  

 Blockly.Blocks['guard'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("GUARD");
      this.appendValueInput("arg1")
          .setCheck(null);
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour( Blockly.Blocks.essential.HUE);
      this.setTooltip('GUARD function');
      this.setHelpUrl('');
    }
  }; 

  Blockly.Blocks['_g_function'] = {
    init: function() {
      this.jsonInit({
        "message0": "_g %1 %2 %3",
        "args0": [
          {
            "type": "input_dummy"
          },
          {
            "type": "input_value",
            "name": "arg1",
            "check": Blockly.Types.NUMBER.checkList
          },
          {
            "type": "input_value",
            "name": "arg2",
            "check": Blockly.Types.NUMBER.checkList
          }
        ],
        "inputsInline": true,
        "colour": Blockly.Blocks.essential.HUE,
        "tooltip": "",
        "helpUrl": "",
        "previousStatement": null,
        "nextStatement": null,
      });
    }
  };

  Blockly.Blocks['comment'] = {
    // Text value.
    init: function() {
      this.setHelpUrl(Blockly.Msg.TEXT_TEXT_HELPURL);
      this.setColour(Blockly.Blocks.essential.HUE );
      this.appendDummyInput()
          .appendTitle('Comment:')
          .appendTitle(new Blockly.FieldTextInput(''), 'TEXT');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setTooltip(Blockly.Msg.TEXT_TEXT_TOOLTIP);
    }
  };

  Blockly.Blocks['TRACESTR'] = {
    // Text value.
    init: function() {
      this.setHelpUrl(Blockly.Msg.TEXT_TEXT_HELPURL);
      this.setColour(Blockly.Blocks.essential.HUE );
      this.appendDummyInput()
          .appendTitle('TRACESTR:')
          .appendTitle(new Blockly.FieldTextInput(''), 'TEXT');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setTooltip(Blockly.Msg.TEXT_TEXT_TOOLTIP);
    }
  };

  Blockly.Blocks['tracevar'] = {
    init: function() {
      this.appendValueInput("TRACEVAR")
          .setCheck(null)
          .appendField("TRACEVAR");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(Blockly.Blocks.essential.HUE);
      this.setTooltip('');
      this.setHelpUrl('');
    }
  };

  Blockly.Blocks['sbuf'] = {
    init: function() {
      this.appendValueInput("SBUF")
          .setCheck(null)
          .appendField("SBUF")
      this.appendDummyInput()
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(Blockly.Blocks.essential.HUE);
      this.setTooltip('');
      this.setHelpUrl('');
    }
  };

  Blockly.Blocks['buffer_equal'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Buffer equal");
      this.appendValueInput("equal")
          .setCheck(null)
          .appendField("output");
      this.appendValueInput("hook_accid")
          .setCheck(null)
          .appendField("hook_accid");
      this.appendValueInput("account_field")
          .setCheck(null)
          .appendField("account_field");
      this.appendValueInput("length")
          .setCheck(null)
          .appendField("length");
      this.setInputsInline(true);
      this.setColour(Blockly.Blocks.essential.HUE);
      this.setTooltip('');
      this.setHelpUrl('');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
    }
  };
//Before we start calling hook-api functions we should tell the hook how many tx we intend to create
  Blockly.Blocks['etxn_reserve'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("etxn_reserve");
      this.appendValueInput("NUM")
          .setCheck(null);
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(Blockly.Blocks.essential.HUE);
      this.setTooltip('Before we start calling hook-api functions we should tell the hook how many tx we intend to create');
      this.setHelpUrl('');
    }
  };

  Blockly.Blocks['clearbuf'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("CLEARBUF");
      this.appendValueInput("buffer")
          .setCheck(null);
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(Blockly.Blocks.essential.HUE);
      this.setTooltip('');
      this.setHelpUrl('');
    }
  };

  Blockly.Blocks['sub_offset'] = {
    init: function() {
      this.appendValueInput("SUB_OFFSET")
          .setCheck(null)
          .appendField("SUB_OFFSET");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setTooltip('');
      this.setColour(Blockly.Blocks.essential.HUE);
      this.setHelpUrl('');
    }
  };
  Blockly.Blocks['uint32_from_buf'] = {
    init: function() {
      this.appendValueInput("buffer_input")
          .setCheck(null)
          .appendField("UINT32_FROM_BUF");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setTooltip('');
      this.setColour(Blockly.Blocks.essential.HUE);
      this.setHelpUrl('');
    }
  };

  Blockly.Blocks['loops_for'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("count with")
          .appendField(new Blockly.FieldTextInput("i"), "var0")
          .appendField("from");
      this.appendValueInput("arg0")
          .setCheck(null);
      this.appendDummyInput()
          .appendField("to");
      this.appendValueInput("arg1")
          .setCheck(null);
      this.appendDummyInput()
          .appendField("by");
      this.appendValueInput("arg2")
          .setCheck(null);
      this.appendStatementInput("NAME")
          .setCheck(null)
          .appendField("do");
      this.setInputsInline(true);
      this.setColour(120);
      this.setTooltip('for loop');
      this.setHelpUrl('');
    }
  };

  Blockly.Blocks['hook_account'] = {
    init: function() {
      this.appendValueInput("VAR")
          .setCheck(null)
          .appendField("hook_account");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setTooltip('');
      this.setColour(Blockly.Blocks.essential.HUE);
      this.setHelpUrl('http://www.example.com/');
    }
  };
  Blockly.Blocks['sfcodes'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("select sfcodes")
        .appendField(new Blockly.FieldDropdown([["sfAccount", "sfAccount"], ["sfOwner", "sfAccount"], ["sfDestination", "sfDestination"]]), "VALUE");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setTooltip('');
    this.setHelpUrl('');
    this.setColour(Blockly.Blocks.essential.HUE);

  }
};

Blockly.Blocks['amount_to_drops'] = {
  init: function() {
    this.appendValueInput("AMOUNT")
        .setCheck(null)
        .appendField("AMOUNT_TO_DROPS");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setTooltip('');
    this.setHelpUrl('');
    this.setColour(Blockly.Blocks.essential.HUE);

  }
};

Blockly.Blocks['macro_prepare_payment_simple'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("PREPARE_PAYMENT_SIMPLE");
    this.appendValueInput("buf_out")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("buf_out");
    this.appendValueInput("drops_amount")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("drops_amount");
    this.appendValueInput("drops_fee")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("drops_fee");
    this.appendValueInput("to_address")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("to_address");
    this.appendValueInput("dest_tag")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("dest_tag");
    this.appendValueInput("src_tag")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("src_tag");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
    this.setHelpUrl('');
    this.setColour(Blockly.Blocks.essential.HUE);

  }
};

Blockly.Blocks['return_val'] = {
  init: function() {
    this.appendValueInput("VAR")
        .setCheck(null)
        .appendField("return");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Return value');
    this.setHelpUrl('');
    this.setColour(Blockly.Blocks.essential.HUE);

  }
};