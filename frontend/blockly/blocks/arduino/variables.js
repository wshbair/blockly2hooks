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

goog.require('Blockly.Blocks.variables');
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

///////////////////////////////////

Blockly.Blocks['define_get'] = {
  init: function() {
      this.setColour(160);
      this.appendDummyInput()
          .appendField(Blockly.Msg.DEFINE_GET_TITLE)
          .appendField(new Blockly.FieldVariableDefine(Blockly.Msg.SELECT_MENU, null, this), 'VAR')
          .appendField(Blockly.Msg.VARIABLES_GET_TAIL);
      this.setOutput(true, 'Macro');
      this.setTooltip(Blockly.Msg.VARIABLES_GET_TOOLTIP);
      this.contextMenuMsg_ = Blockly.Msg.VARIABLES_GET_CREATE_SET;
      this.contextMenuType_ = 'variables_set';
      this.tag = Blockly.Msg.TAG_DEFINE_GET;
  },
  /**
   * Return this block's tags.
   * @returns {Array} List of block tag.
   */
  getTags: function(){
      return this.tag;
  },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<string>} List of variable names.
   * @this Blockly.Block
   */
  getVars: function() {
      return [this.getFieldValue('VAR')];
  },
  /**
   * Notification that a variable is renaming.
   * If the name matches one of this block's variables, rename it.
   * @param {string} oldName Previous name of variable.
   * @param {string} newName Renamed variable.
   * @this Blockly.Block
   */
  renameVar: function(oldName, newName) {
      if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
          this.setFieldValue(newName, 'VAR');
      }
  },
  /**
   * Add menu option to create getter/setter block for this setter/getter.
   * @param {!Array} options List of menu options to add to.
   * @this Blockly.Block
   */
  customContextMenu: function(options) {
      var option = {
          enabled: true
      };
      var name = this.getFieldValue('VAR');
      option.text = this.contextMenuMsg_.replace('%1', name);
      var xmlField = goog.dom.createDom('field', null, name);
      xmlField.setAttribute('name', 'VAR');
      var xmlBlock = goog.dom.createDom('block', null, xmlField);
      xmlBlock.setAttribute('type', this.contextMenuType_);
      option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
      options.push(option);
  },

  //when the block is changed,
  onchange: Blockly.Blocks.requireInFunction
};

Blockly.Blocks['define_declare'] = {
  init: function() {
      this.setColour(160);
      var name = Blockly.Procedures.findLegalName(
          Blockly.Msg.DEFINE_DECLARE_DEFAULT_NAME, this);
         
      this.interpolateMsg(
          // TODO: Combine these messages instead of using concatenation.
          Blockly.Msg.DEFINE_DECLARE_TITLE  + ' ' +
          Blockly.Msg.VARIABLES_DECLARE_NAME + ' %1 ' +
          Blockly.Msg.DEFINE_DECLARE_INIT + ' %2',
          ['VAR', new Blockly.FieldTextInput(name, Blockly.Procedures.rename)],
          ['VALUE', null, Blockly.ALIGN_RIGHT],
          Blockly.ALIGN_RIGHT);

      this.setPreviousStatement(true, ['define_declare']);
      this.setNextStatement(true, ['define_declare', 'main_block']);
      this.setTooltip(Blockly.Msg.VARIABLES_DECLARE_TOOLTIP);
      this.contextMenuMsg_ = Blockly.Msg.VARIABLES_SET_CREATE_GET;
      this.contextMenuType_ = 'define_get';
      this.tag = Blockly.Msg.TAG_DEFINE_DECLARE;
      this.macroType_ = 'Macro';
  },

  initVar: function() {
      this.setFieldValue('', 'VAR');
  },
  /**
   * Return all variables's types referenced by this block.
   * @return {!Array.<string>} List of variable types.
   * @this Blockly.Block
   */
  getTypes: function() {
      return [this.macroType_];
  },

  getDist: function() {
      return 'd';
  },
  /**
   * Return Variable's Scope
   */
  getScope: function() {
      return ['Global'];
  },
  /**
   * Return Variable's Scope
   */
  getSpec: function() {
      return null;
  },
  /**
   * Return this block's position
   */
  getPos: function(){
      return this.getRelativeToSurfaceXY().y;
  },
  /*
   * Return Name
   */
  getDeclare: function() {
      return [this.getFieldValue('VAR')];
  },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<string>} List of variable names.
   * @this Blockly.Block
   */
  getVars: function() {
      return [this.getFieldValue('VAR')];
  },
  /**
   * Notification that a variable is renaming.
   * If the name matches one of this block's variables, rename it.
   * @param {string} oldName Previous name of variable.
   * @param {string} newName Renamed variable.
   * @this Blockly.Block
   */
  renameVar: function(oldName, newName) {
      if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
          this.setFieldValue(newName, 'VAR');
      }
  },
  customContextMenu: Blockly.Blocks['define_get'].customContextMenu,

  //when the block is changed,
  onchange: function() {
      Blockly.Blocks.requireOutFunction();
      if (this.getInputTargetBlock('VALUE')) {
          var targetBlock = this.getInputTargetBlock('VALUE');

          if (targetBlock.type.match('math')) {
              //this.setFieldValue('int', 'DEFINES');
              this.macroType_ = 'int';
          }
          else if (targetBlock.type.match('text')) {
              if (targetBlock.getFieldValue('TEXT').length == 1) {
                  //this.setFieldValue('char', 'DEFINES');
                  this.macroType_ = 'char';
              }
              else {
                  //this.setFieldValue('dbchar', 'DEFINES');
                  this.macroType_ = 'dbchar';
              }
          }
      }
  }
};

Blockly.Blocks['variables_get'] = {
  /**
   * Block for variable getter.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.VARIABLES_GET_HELPURL);
    this.setColour(Blockly.Blocks.variables.HUE);
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable(
        Blockly.Msg.VARIABLES_DEFAULT_NAME), 'VAR');
    this.setOutput(true);
    this.setTooltip(Blockly.Msg.VARIABLES_GET_TOOLTIP);
    this.contextMenuMsg_ = Blockly.Msg.VARIABLES_GET_CREATE_SET;
  },
  contextMenuType_: 'variables_set',
  /**
   * Add menu option to create getter/setter block for this setter/getter.
   * @param {!Array} options List of menu options to add to.
   * @this Blockly.Block
   */
  customContextMenu: function(options) {
    var option = {enabled: true};
    var name = this.getFieldValue('VAR');
    option.text = this.contextMenuMsg_.replace('%1', name);
    var xmlField = goog.dom.createDom('field', null, name);
    xmlField.setAttribute('name', 'VAR');
    var xmlBlock = goog.dom.createDom('block', null, xmlField);
    xmlBlock.setAttribute('type', this.contextMenuType_);
    option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
    options.push(option);
  },
  /**
   * @return {!string} Retrieves the type (stored in varType) of this block.
   * @this Blockly.Block
   */
  getBlockType: function() {
    return [Blockly.Types.UNDEF, this.getFieldValue('VAR')];
  },
  /**
   * Gets the stored type of the variable indicated in the argument. As only one
   * variable is stored in this block, no need to check input
   * @this Blockly.
   * @param {!string} varName Name of this block variable to check type.
   * @return {!string} String to indicate the type of this block.
   */
  getVarType: function(varName) {
    return [Blockly.Types.UNDEF, this.getFieldValue('VAR')];
  },
};

Blockly.Blocks['variables_set'] = {
  /**
   * Block for variable setter.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.VARIABLES_SET,
      "args0": [
        {
          "type": "field_variable",
          "name": "VAR",
          "variable": Blockly.Msg.VARIABLES_DEFAULT_NAME
        },
        {
          "type": "input_value",
          "name": "VALUE"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": Blockly.Blocks.variables.HUE,
      "tooltip": Blockly.Msg.VARIABLES_SET_TOOLTIP,
      "helpUrl": Blockly.Msg.VARIABLES_SET_HELPURL
    });
    this.contextMenuMsg_ = Blockly.Msg.VARIABLES_SET_CREATE_GET;
  },
  contextMenuType_: 'variables_get',
  customContextMenu: Blockly.Blocks['variables_get'].customContextMenu,
  /**
   * Searches through the nested blocks to find a variable type.
   * @this Blockly.Block
   * @param {!string} varName Name of this block variable to check type.
   * @return {string} String to indicate the type of this block.
   */
  getVarType: function(varName) {
    return Blockly.Types.getChildBlockType(this);
  }
};

Blockly.Blocks['variables_declare'] = {
  init: function() {
    this.appendValueInput("VALUE")
        .setCheck(null)
        .appendField(new Blockly.FieldDropdown([["int", "int"],["int32_t", "int32_t"], ["int64_t", "int64_t"], ["uint8_t", "uint8_t"], ["uint32_t", "uint32_t"]]), "TYPES")
        .appendField("variable name")
        .appendField(new Blockly.FieldTextInput("myvariable"), "VAR")
        .appendField("inital value");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Blocks.variables.HUE);
    this.setTooltip('');
    this.setHelpUrl('');
    this.contextMenuMsg_ = Blockly.Msg.VARIABLES_SET_CREATE_GET;
    this.contextMenuType_ = 'variables_get';
    this.tag = Blockly.Msg.TAG_VARIABLE_DECLARE;
    
  },
  //initVar: Blockly.Blocks['define_declare'].initVar,
  /**
   * Return 'variables'.
   */
   getDist: function() {
    return 'v';
},
/**
 * Return Variable's Scope
 */
getScope: function() {
    if (this.getSurroundParent()) {
        return this.getSurroundParent().getName();
    }
},
/**
 * Return Variable's Scope
 */
getSpec: function() {
    return null;
},
/**
 * Return this block's position
 */
getPos: function(){
    return this.getRelativeToSurfaceXY().y;
},
/**
 * Return all variables's types referenced by this block.
 * @return {!Array.<string>} List of variable types.
 * @this Blockly.Block
 */
getTypes: function() {
    return [this.getFieldValue('TYPES')];
},
/**
 * Return all variables referenced by this block.
 * @return {!Array.<string>} List of variable names.
 * @this Blockly.Block
 */
getVars: function() {
    return [this.getFieldValue('VAR')];
},
/**
 * Return all variables referenced by this block.
 * @return {!Array.<string>} List of variable names.
 * @this Blockly.Block
 */
getDeclare: function() {
    return [this.getFieldValue('VAR')];
},
/**
 * Notification that a variable is renaming.
 * If the name matches one of this block's variables, rename it.
 * @param {string} oldName Previous name of variable.
 * @param {string} newName Renamed variable.
 * @this Blockly.Block
 */
renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
        this.setFieldValue(newName, 'VAR');
    }
},
customContextMenu: Blockly.Blocks['variables_get'].customContextMenu,

//when the block is changed,
onchange: function() {
    var type = this.getFieldValue('TYPES');
    if (type == false) {
        type = 'int';
    }
}
};

/////////////////////////////////
// Blockly.Blocks['variables_pointer_get'] = {
//   /**
//    * Block for pointer getter.
//    * @this Blockly.Block
//    */
//   init: function() {
//       this.setColour(25);
//       this.appendDummyInput()
//           .appendField(Blockly.Msg.POINTER_GET_TITLE)
//           .appendField(new Blockly.FieldVariable(
//             Blockly.Msg.VARIABLES_DEFAULT_NAME), 'VAR')
//           .appendField(Blockly.Msg.VARIABLES_GET_TAIL);
//       this.setOutput(true, 'Pointer');
//       this.setTooltip(Blockly.Msg.VARIABLES_GET_TOOLTIP);
//       this.contextMenuMsg_ = Blockly.Msg.VARIABLES_GET_CREATE_SET;
//       this.contextMenuType_ = 'variables_pointer_set';
//       this.tag = Blockly.Msg.TAG_VARIABLE_POINTER_GET;
//   },
//   /**
//    * Return all variables referenced by this block.
//    * @return {!Array.<string>} List of variable names.
//    * @this Blockly.Block
//    */
//   getVars: function() {
//       return [this.getFieldValue('VAR')];
//   },
//   /**
//    * Return this block's position
//    */
//   getPos: function(){
//       return this.getRelativeToSurfaceXY().y;
//   },
//   /**
//    * Notification that a variable is renaming.
//    * If the name matches one of this block's variables, rename it.
//    * @param {string} oldName Previous name of variable.
//    * @param {string} newName Renamed variable.
//    * @this Blockly.Block
//    */
//   renameVar: function(oldName, newName) {
//       if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
//           this.setFieldValue(newName, 'VAR');
//       }
//   },
//   /**
//    * Add menu option to create getter/setter block for this setter/getter.
//    * @param {!Array} options List of menu options to add to.
//    * @this Blockly.Block
//    */
//   customContextMenu: function(options) {
//       var option = {
//           enabled: true
//       };
//       var name = this.getFieldValue('VAR');
//       option.text = this.contextMenuMsg_.replace('%1', name);
//       var xmlField = goog.dom.createDom('field', null, name);
//       xmlField.setAttribute('name', 'VAR');
//       var xmlBlock = goog.dom.createDom('block', null, xmlField);
//       xmlBlock.setAttribute('type', this.contextMenuType_);
//       option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
//       options.push(option);
//   },

//   //when the block is changed,
//  // onchange: Blockly.Blocks.requireInFunction;
//   // function() {
//   //     //Blockly.Blocks.requireInFunction
//   //     var varName = this.getFieldValue('VAR');
//   //     //var varType = Blockly.FieldDropdown.prototype.getTypefromVars(varName, 0);
//   //     var dimension = Blockly.FieldDropdown.prototype.getTypefromVars(varName, 5);
//   //     if (dimension == '*') {
//   //         this.setOutputType('PTR', varType);
//   //     }
//   //     else if(dimension == '**') {
//   //         this.setOutputType('DBPTR', varType);
//   //     }
//   // },
//   setOutputType: Blockly.Blocks['variables_get'].setOutputType
// };

// Blockly.Blocks['variables_pointer_set'] = {
//   /**
//    * Block for pointer setter.
//    * @this Blockly.Block
//    */
//   init: function() {
//       this.setColour(25);

//       this.jsonInit({
//         "message0": "Select",
//         "args0": [
//           {
//             "type": "field_variable",
//             "name": "VAR",
//             "variable": Blockly.Msg.VARIABLES_DEFAULT_NAME
//           },
//           {
//             "type": "input_value",
//             "name": "VALUE"
//           }
//         ],
//         "previousStatement": true,
//         "nextStatement": true,
//         "InputsInline": true,
//       });       
//       this.contextMenuMsg_ = Blockly.Msg.VARIABLES_SET_CREATE_GET;
//       this.contextMenuType_ = 'variables_pointer_get';
//       this.tag = Blockly.Msg.TAG_VARIABLE_POINTER_SET;
//   },

//   /**
//    * Return all variables referenced by this block.
//    * @return {!Array.<string>} List of variable names.
//    * @this Blockly.Block
//    */
//   getVars: function() {
//       return [this.getInputTargetBlock('VAR')];
//   },
//   /**
//    * Return this block's position
//    */
//   getPos: function(){
//       return this.getRelativeToSurfaceXY().y;
//   },
//   /**
//    * Notification that a variable is renaming.
//    * If the name matches one of this block's variables, rename it.
//    * @param {string} oldName Previous name of variable.
//    * @param {string} newName Renamed variable.
//    * @this Blockly.Block
//    */
//   renameVar: function(oldName, newName) {
//       if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
//           this.setFieldValue(newName, 'VAR');
//       }
//   },
//   customContextMenu: Blockly.Blocks['variables_pointer_get'].customContextMenu,

//   //when the block is changed,
//   onchange: //Blockly.Blocks.requireInFunction
//       function() {
//           //Blockly.Blocks.requireInFunction

//           if(this.getInput('VAR')) {
//               var ptrName = this.getInputTargetBlock('VAR').getFieldValue('VAR');
//               var ptrType = Blockly.FieldDropdown.prototype.getTypefromVars(ptrName, 0);
//               //Blockly.Blocks.setCheckPointer(this, ptrType, 'VALUE');
//           }
//       }
// };

// Blockly.Blocks['variables_pointer_declare'] = {
//   init: function() {
//     var name = Blockly.Procedures.findLegalName(
//         Blockly.Msg.VARIABLES_POINTER_DECLARE_DEFAULT_NAME, this);
//     this.appendValueInput("VALUE")
//         .setCheck(null)
//         .appendField(new Blockly.FieldDropdown([["int", "int"],["int32_t", "int32_t"], ["int64_t", "int64_t"], ["uint8_t", "uint8_t"], ["uint32_t", "uint32_t"]]), "TYPES")
//         .appendField("pointer")
//         .appendField(new Blockly.FieldTextInput("*"), "ITERATION")
//         .appendField("name")
//         .appendField(new Blockly.FieldTextInput("mypointer"), "VAR")
//         .appendField("initial value");
//     this.setInputsInline(true);
//     this.setPreviousStatement(true, null);
//     this.setNextStatement(true, null);
//     this.setColour(Blockly.Blocks.variables.HUE);
//     this.setTooltip('pointer varaible');
//     this.setHelpUrl('http://www.example.com/');
//     this.contextMenuMsg_ = Blockly.Msg.VARIABLES_SET_CREATE_GET;
//     this.contextMenuType_ = 'variables_pointer_get';
//     this.tag = Blockly.Msg.TAG_VARIABLE_POINTER_DECLARE;
//   },
//   /**
//    * Return 'pointer'.
//    */
//    getDist: function() {
//     return 'p';
// },
// /**
//  * Return pointer's specfic.
//  * specific means their iteration(*, **, or ***)
//  */
// getSpec: function() {
//     return this.getFieldValue('ITERATION');
// },
// getType: function() {
//     return this.getFieldValue('TYPES');
// },

// /**
//  * Return all variables's types referenced by this block.
//  * @return {!Array.<string>} List of variable types.
//  * @this Blockly.Block
//  */
// getTypes: function() {
//     if (this.getFieldValue('ITERATION') == '**'){
//         return ['db'+ this.getFieldValue('TYPES')]
//     }else {
//         return [this.getFieldValue('TYPES')];
//     }
// },
// /**
//  * Return Pointer's Scope
//  */
// getScope: Blockly.Blocks['variables_declare'].getScope,
// //    function() {
// //    return this.getSurroundParent().getName();
// //},
// /**
//  * Return this block's position
//  */
// getPos: function(){
//     return this.getRelativeToSurfaceXY().y;
// },
// /**
//  * Return all variables referenced by this block.
//  * @return {!Array.<string>} List of variable names.
//  * @this Blockly.Block
//  */
// getVars: function() {
//     return [this.getFieldValue('VAR')];
// },
// /**
//  * Return all variables referenced by this block.
//  * @return {!Array.<string>} List of variable names.
//  * @this Blockly.Block
//  */
// getDeclare: function() {
//     return [this.getFieldValue('VAR')];
// },
// /**
//  * Notification that a variable is renaming.
//  * If the name matches one of this block's variables, rename it.
//  * @param {string} oldName Previous name of variable.
//  * @param {string} newName Renamed variable.
//  * @this Blockly.Block
//  */
// renameVar: function(oldName, newName) {
//     if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
//         this.setFieldValue(newName, 'VAR');
//     }
// },
// customContextMenu: Blockly.Blocks['variables_pointer_get'].customContextMenu,

// //when the block is changed,
// onchange: function() {
//      var type = this.getFieldValue('TYPES');

//     if (type == false) {
//         type = 'int';
//     }
//     // if (this.getFieldValue('ITERATION') == '*') {
//     //    // Blockly.Blocks.setCheckPointer(this, type, 'VALUE');
//     // }
//     // else if (this.getFieldValue('ITERATION') == '**') {
//     //    // Blockly.Blocks.setCheckPointer(this, 'db' + type, 'VALUE');
//     // }

// }

// };

 