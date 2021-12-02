 
/**
 * @fileoverview Block for the XRPL Hook Development.
 *     https://xrpl-hooks.readme.io/
 */

 'use strict';
 goog.provide('Blockly.Blocks.macro'); 
 goog.require('Blockly.Blocks');
 goog.require('Blockly.Types');
 
 
 /** Common HSV hue for all blocks in this category. */
 Blockly.Blocks.macro.HUE = 3;
  
  // TRACE MACROS
  Blockly.Blocks['TRACESTR'] = {
    init: function() {
      this.appendValueInput("TRACESTR")
          .setCheck(null)
          .appendField("TRACESTR");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(Blockly.Blocks.macro.HUE);
      this.setTooltip('');
      this.setHelpUrl('');
    }
  };
  
  Blockly.Blocks['TRACEVAR'] = {
    init: function() {
      this.appendValueInput("TRACEVAR")
          .setCheck(null)
          .appendField("TRACEVAR");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(Blockly.Blocks.macro.HUE);
      this.setTooltip('');
      this.setHelpUrl('');
    }
  };

  Blockly.Blocks['TRACEHEX'] = {
    init: function() {
      this.appendValueInput("TRACEHEX")
          .setCheck(null)
          .appendField("TRACEHEX");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(Blockly.Blocks.macro.HUE);
      this.setTooltip('');
      this.setHelpUrl('');
    }
  };

  Blockly.Blocks['TRACEXFL'] = {
    init: function() {
      this.appendValueInput("TRACEXFL")
          .setCheck(null)
          .appendField("TRACEXFL");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(Blockly.Blocks.macro.HUE);
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
      this.setColour(Blockly.Blocks.macro.HUE);
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
      this.setColour(Blockly.Blocks.macro.HUE);
      this.setHelpUrl('');
    }
  };

  Blockly.Blocks['sfcodes'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("select sfcodes")
        .appendField(new Blockly.FieldDropdown([["sfAccount", "sfAccount"], ["sfOwner", "sfOwner"], ["sfDestination", "sfDestination"],["sfAmount","sfAmount"]]), "VALUE");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setTooltip('');
    this.setHelpUrl('');
    this.setColour(Blockly.Blocks.macro.HUE);

  }
};

Blockly.Blocks['amount_to_drops'] = {
  init: function() {
    this.appendValueInput("AMOUNT")
        .setCheck(null)
        .appendField("amount to drops");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setTooltip('convert amount to dropx');
    this.setHelpUrl('');
    this.setColour(Blockly.Blocks.macro.HUE);

  }
};

Blockly.Blocks['prepare_payment_simple'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("prepare payment simple");
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
    this.setColour(Blockly.Blocks.macro.HUE);

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

Blockly.Blocks['guard'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("GUARD");
      this.appendValueInput("arg1")
          .setCheck(null);
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour( Blockly.Blocks.macro.HUE );
      this.setTooltip('GUARD function');
      this.setHelpUrl('');
    }
  }; 

Blockly.Blocks['require'] = {
init: function() {
    this.appendDummyInput()
        .appendField("REQUIRE");
    this.appendValueInput("condtion")
        .setCheck("Boolean")
        .appendField("cond");
    this.appendValueInput("msg")
        .setCheck(null)
        .appendField("str");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.macro.HUE);
    this.setTooltip('');
    this.setHelpUrl('');
}
};
// Buffer macros
  Blockly.Blocks['sbuf'] = {
    init: function() {
      this.appendValueInput("SBUF")
          .setCheck(null)
          .appendField("SBUF")
      this.appendDummyInput()
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(Blockly.Blocks.macro.HUE);
      this.setTooltip('');
      this.setHelpUrl('');
    }
  };

  Blockly.Blocks['rbuf'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("RBUF");
      this.appendValueInput("buf")
          .setCheck(null)
          .appendField("buf");
      this.appendValueInput("out_len")
          .setCheck(null)
          .appendField("out_len");
      this.appendValueInput("str")
          .setCheck(null)
          .appendField("str");
      this.appendValueInput("num")
          .setCheck(null)
          .appendField("num");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(Blockly.Blocks.macro.HUE);
      this.setTooltip('');
      this.setHelpUrl('');
    }
  };

  Blockly.Blocks['rbuf2'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("RBUF2");
      this.appendValueInput("buf")
          .setCheck(null)
          .appendField("buff");
      this.appendValueInput("out_len")
          .setCheck(null)
          .appendField("out_len");
      this.appendValueInput("str")
          .setCheck(null)
          .appendField("str");
      this.appendValueInput("num")
          .setCheck(null)
          .appendField("num");
      this.appendValueInput("str2")
          .setCheck(null)
          .appendField("str2");
      this.appendValueInput("num2")
          .setCheck(null)
          .appendField("num2");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(Blockly.Blocks.macro.HUE);
      this.setTooltip('');
      this.setHelpUrl('');
    }
  };

  Blockly.Blocks['buffer_swap'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("BUFFER_SWAP");
      this.appendValueInput("x")
          .setCheck(null)
          .appendField("X");
      this.appendValueInput("y")
          .setCheck(null)
          .appendField("Y");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(Blockly.Blocks.macro.HUE);
      this.setTooltip('');
      this.setHelpUrl('');
    }
  };
  Blockly.Blocks['buffer_equal_str_guard'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("BUFFER_EQUAL_STR_GUARD");
      this.appendValueInput("output")
          .setCheck(null)
          .appendField("output");
      this.appendValueInput("buf1")
          .setCheck(null)
          .appendField("buf1");
      this.appendValueInput("buf1len")
          .setCheck(null)
          .appendField("buf1len");
      this.appendValueInput("str")
          .setCheck(null)
          .appendField("str");
      this.appendValueInput("n")
          .setCheck(null)
          .appendField("n");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(Blockly.Blocks.macro.HUE);
      this.setTooltip('');
      this.setHelpUrl('');
    }
  };

  Blockly.Blocks['buffer_equal_str'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("BUFFER_EQUAL_STR");
      this.appendValueInput("output")
          .setCheck(null)
          .appendField("output");
      this.appendValueInput("buf1")
          .setCheck(null)
          .appendField("buf1");
      this.appendValueInput("buf1len")
          .setCheck(null)
          .appendField("buf1len");
      this.appendValueInput("str")
          .setCheck(null)
          .appendField("str");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(Blockly.Blocks.macro.HUE);
      this.setTooltip('');
      this.setHelpUrl('');
    }
  };

  Blockly.Blocks['uint16_to_buf'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("UINT16_TO_BUF");
      this.appendValueInput("buf_raw")
          .setCheck(null)
          .appendField("buf_raw");
      this.appendValueInput("i")
          .setCheck(null)
          .appendField("i");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(Blockly.Blocks.macro.HUE);
      this.setTooltip('');
      this.setHelpUrl('');
    }
  };

  Blockly.Blocks['uint16_from_buf'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("UINT16_FROM_BUF");
      this.appendValueInput("buf")
          .setCheck(null)
          .appendField("buf");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(Blockly.Blocks.macro.HUE);
      this.setTooltip('');
      this.setHelpUrl('');
    }
  };

  Blockly.Blocks['uint32_to_buf'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("UINT32_TO_BUF");
      this.appendValueInput("buf_raw")
          .setCheck(null)
          .appendField("buf_raw");
      this.appendValueInput("i")
          .setCheck(null)
          .appendField("i");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(Blockly.Blocks.macro.HUE);
      this.setTooltip('');
      this.setHelpUrl('');
    }
  };

  Blockly.Blocks['uint32_from_buf'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("UINT32_FROM_BUF");
      this.appendValueInput("buf")
          .setCheck(null)
          .appendField("buf");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(Blockly.Blocks.macro.HUE);
      this.setTooltip('');
      this.setHelpUrl('');
    }
  };

  Blockly.Blocks['uint64_to_buf'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("UINT64_TO_BUF");
      this.appendValueInput("buf_raw")
          .setCheck(null)
          .appendField("buf_raw");
      this.appendValueInput("i")
          .setCheck(null)
          .appendField("i");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(Blockly.Blocks.macro.HUE);
      this.setTooltip('');
      this.setHelpUrl('');
    }
  };

  Blockly.Blocks['uint64_from_buf'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("UINT64_FROM_BUF");
      this.appendValueInput("buf")
          .setCheck(null)
          .appendField("buf");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(Blockly.Blocks.macro.HUE);
      this.setTooltip('');
      this.setHelpUrl('');
    }
  };

  Blockly.Blocks['int64_to_buf'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("INT64_TO_BUF");
      this.appendValueInput("buf_raw")
          .setCheck(null)
          .appendField("buf_raw");
      this.appendValueInput("i")
          .setCheck(null)
          .appendField("i");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(Blockly.Blocks.macro.HUE);
      this.setTooltip('');
      this.setHelpUrl('');
    }
  };

  Blockly.Blocks['int64_from_buf'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("INT64_FROM_BUF");
      this.appendValueInput("buf")
          .setCheck(null)
          .appendField("buf");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(Blockly.Blocks.macro.HUE);
      this.setTooltip('');
      this.setHelpUrl('');
    }
  };

  Blockly.Blocks['macro_define'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Select")
          .appendField(new Blockly.FieldDropdown([["ttPAYMENT", "ttPAYMENT"], ["tfCANONICAL", "tfCANONICAL"], ["atACCOUNT", "atACCOUNT"], ["atOWNER", "atOWNER"], ["atDESTINATION", "atDESTINATION"], ["atISSUER", "atISSUER"], ["atAUTHORIZE", "atAUTHORIZE"], ["atUNAUTHORIZE", "atUNAUTHORIZE"], ["atTARGET", "atTARGET"], ["atREGULARKEY", "atREGULARKEY"], ["atPSEUDOCALLBACK", "atPSEUDOCALLBACK"], ["amAMOUNT", "amAMOUNT"], ["amBALANCE", "amBALANCE"], ["amLIMITAMOUNT", "amLIMITAMOUNT"], ["amTAKERPAYS", "amTAKERPAYS"], ["amTAKERGETS", "amTAKERGETS"], ["amLOWLIMIT", "amLOWLIMIT"], ["amHIGHLIMIT", "amHIGHLIMIT"], ["amFEE", "amFEE"], ["amSENDMAX", "amSENDMAX"], ["amDELIVERMIN", "amDELIVERMIN"], ["amMINIMUMOFFER", "amMINIMUMOFFER"], ["amRIPPLEESCROW", "amRIPPLEESCROW"], ["amDELIVEREDAMOUNT", "amBALANCE"], ["amLIMITAMOUNT", "amLIMITAMOUNT"]]), "NAME");
      this.setInputsInline(true);
      this.setOutput(true, null);
      this.setColour(Blockly.Blocks.macro.HUE);
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
      this.setColour(Blockly.Blocks.macro.HUE);
      this.setTooltip('');
      this.setHelpUrl('');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
    }
  };

  Blockly.Blocks['clearbuf'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Clear Buffer");
      this.appendValueInput("buffer")
          .setCheck(null);
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(Blockly.Blocks.macro.HUE);
      this.setTooltip('');
      this.setHelpUrl('');
    }
  };