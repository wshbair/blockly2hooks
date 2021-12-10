/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * Based on work of Fred Lin (gasolin@gmail.com) for Blocklyduino.
 *
 * @fileoverview Helper functions for generating xrplhook language (C++).
 */
'use strict';

goog.provide('Blockly.xrplhook');

goog.require('Blockly.Generator');
goog.require('Blockly.StaticTyping');


/**
 * xrplhook code generator.
 * @type {!Blockly.Generator}
 */
Blockly.xrplhook = new Blockly.Generator('xrplhook');
Blockly.xrplhook.StaticTyping = new Blockly.StaticTyping();

/**
 * List of illegal variable names.
 * @private
 */
Blockly.xrplhook.addReservedWords(
    'Blockly,' +  // In case JS is evaled in the current window.
    'setup,loop,if,else,for,switch,case,while,do,break,continue,return,goto,' +
    'define,include,HIGH,LOW,INPUT,OUTPUT,INPUT_PULLUP,true,false,integer,' +
    'constants,floating,point,void,boolean,char,unsigned,byte,int,word,long,' +
    'float,double,string,String,array,static,volatile,const,sizeof' +
    'shiftOut,shitIn,millis,micros,delay,' +
    'min,max,abs,constrain,map,pow,sqrt,sin,cos,tan,randomSeed,random');

/** Order of operation ENUMs. */
Blockly.xrplhook.ORDER_ATOMIC = 0;         // 0 "" ...
Blockly.xrplhook.ORDER_UNARY_POSTFIX = 1;  // expr++ expr-- () [] .
Blockly.xrplhook.ORDER_UNARY_PREFIX = 2;   // -expr !expr ~expr ++expr --expr
Blockly.xrplhook.ORDER_MULTIPLICATIVE = 3; // * / % ~/
Blockly.xrplhook.ORDER_ADDITIVE = 4;       // + -
Blockly.xrplhook.ORDER_SHIFT = 5;          // << >>
Blockly.xrplhook.ORDER_RELATIONAL = 6;     // >= > <= <
Blockly.xrplhook.ORDER_EQUALITY = 7;       // == != === !==
Blockly.xrplhook.ORDER_BITWISE_AND = 8;    // &
Blockly.xrplhook.ORDER_BITWISE_XOR = 9;    // ^
Blockly.xrplhook.ORDER_BITWISE_OR = 10;    // |
Blockly.xrplhook.ORDER_LOGICAL_AND = 11;   // &&
Blockly.xrplhook.ORDER_LOGICAL_OR = 12;    // ||
Blockly.xrplhook.ORDER_CONDITIONAL = 13;   // expr ? expr : expr
Blockly.xrplhook.ORDER_ASSIGNMENT = 14;    // = *= /= ~/= %= += -= <<= >>= &= ^= |=
Blockly.xrplhook.ORDER_NONE = 99;          // (...)

// /**
//  * A list of types tasks that the pins can be assigned. Used to track usage and
//  * warn if the same pin has been assigned to more than one task.
//  */
// Blockly.xrplhook.PinTypes = {
//   INPUT: 'INPUT',
//   OUTPUT: 'OUTPUT',
//   PWM: 'PWM',
//   SERVO: 'SERVO',
//   STEPPER: 'STEPPER',
//   SERIAL: 'SERIAL',
//   I2C: 'I2C/TWI',
//   SPI: 'SPI'
// };

/**
 * xrplhook generator short name for
 * Blockly.Generator.prototype.FUNCTION_NAME_PLACEHOLDER_
 * @type {!string}
 */
Blockly.xrplhook.DEF_FUNC_NAME = Blockly.xrplhook.FUNCTION_NAME_PLACEHOLDER_;

/**
 * Initialises the database of global definitions, the setup function, function
 * names, and variable names.
 * @param {Blockly.Workspace} workspace Workspace to generate code from.
 */
Blockly.xrplhook.init = function(workspace) {
  // Create a dictionary of definitions to be printed at the top of the sketch
  Blockly.xrplhook.includes_ = Object.create(null);
  // Create a dictionary of global definitions to be printed after variables
  Blockly.xrplhook.definitions_ = Object.create(null);
  // Create a dictionary of variables
  Blockly.xrplhook.variables_ = Object.create(null);
  // Create a dictionary of functions from the code generator
  Blockly.xrplhook.codeFunctions_ = Object.create(null);
  // Create a dictionary of functions created by the user
  Blockly.xrplhook.userFunctions_ = Object.create(null);
  // Create a dictionary mapping desired function names in definitions_
  // to actual function names (to avoid collisions with user functions)
  Blockly.xrplhook.functionNames_ = Object.create(null);
  // Create a dictionary of setups to be printed in the setup() function
  Blockly.xrplhook.setups_ = Object.create(null);
  // Create a dictionary of pins to check if their use conflicts
  Blockly.xrplhook.pins_ = Object.create(null);

  if (!Blockly.xrplhook.variableDB_) {
    Blockly.xrplhook.variableDB_ =
        new Blockly.Names(Blockly.xrplhook.RESERVED_WORDS_);
  } else {
    Blockly.xrplhook.variableDB_.reset();
  }

  // Iterate through to capture all blocks types and set the function arguments
  var varsWithTypes = Blockly.xrplhook.StaticTyping.collectVarsWithTypes(workspace);
  Blockly.xrplhook.StaticTyping.setProcedureArgs(workspace, varsWithTypes);

  // Set variable declarations with their xrplhook type in the defines dictionary
  // for (var varName in varsWithTypes) {
  //   Blockly.xrplhook.addVariable(varName,
  //       Blockly.xrplhook.getxrplhookType_(varsWithTypes[varName]) +' ' +
  //       Blockly.xrplhook.variableDB_.getName(varName, Blockly.Variables.NAME_TYPE) + ';');
  // }
};

/**
 * Prepare all generated code to be placed in the sketch specific locations.
 * @param {string} code Generated main program (loop function) code.
 * @return {string} Completed sketch code.
 */
Blockly.xrplhook.finish = function(code) {
  // Convert the includes, definitions, and functions dictionaries into lists
  var includes = [], definitions = [], variables = [], functions = [];
  for (var name in Blockly.xrplhook.includes_) {
    includes.push(Blockly.xrplhook.includes_[name]);
  }
  if (includes.length) {
    includes.push('\n');
  }
  
  for (var name in Blockly.xrplhook.definitions_) {
    definitions.push(Blockly.xrplhook.definitions_[name]);
  }
  if (definitions.length) {
    definitions.push('\n');
  }
  for (var name in Blockly.xrplhook.codeFunctions_) {
    functions.push(Blockly.xrplhook.codeFunctions_[name]);
  }
  for (var name in Blockly.xrplhook.userFunctions_) {
    functions.push(Blockly.xrplhook.userFunctions_[name]);
  }
  if (functions.length) {
    functions.push('\n');
  }

  // userSetupCode added at the end of the setup function without leading spaces
  var setups = [''], userSetupCode= '';
  if (Blockly.xrplhook.setups_['userSetupCode'] !== undefined) {
    userSetupCode = '\n' + Blockly.xrplhook.setups_['userSetupCode'];
    delete Blockly.xrplhook.setups_['userSetupCode'];
  }
  for (var name in Blockly.xrplhook.setups_) {
    setups.push(Blockly.xrplhook.setups_[name]);
  }
  if (userSetupCode) {
    setups.push(userSetupCode);
  }

  // Clean up temporary data
  delete Blockly.xrplhook.includes_;
  delete Blockly.xrplhook.definitions_;
  delete Blockly.xrplhook.codeFunctions_;
  delete Blockly.xrplhook.userFunctions_;
  delete Blockly.xrplhook.functionNames_;
  delete Blockly.xrplhook.setups_;
  delete Blockly.xrplhook.pins_;
  Blockly.xrplhook.variableDB_.reset();

  var allDefs = includes.join('\n') + variables.join('\n') +
      definitions.join('\n') + functions.join('\n\n');
  var cbak = 'int64_t cbak(int64_t reserved) {' + setups.join('\n  ') + '\n return 0;\n}\n\n';
  var cbakDecs="//Executed when an emitted transaction is successfully accepted into a ledger \n";
  var hook = 'int64_t hook(int64_t reserved) {\n' + code.replace(/\n/g, '\n') + '\n return 0;\n}\n\n';
  var hookDecs ="//Executed whenever a transaction comes into or leaves from the account the Hook is set on \n";
  return allDefs + cbakDecs+cbak + hookDecs+hook;
};

/**
 * Adds a string of "include" code to be added to the sketch.
 * Once a include is added it will not get overwritten with new code.
 * @param {!string} includeTag Identifier for this include code.
 * @param {!string} code Code to be included at the very top of the sketch.
 */
Blockly.xrplhook.addInclude = function(includeTag, code) {
  if (Blockly.xrplhook.includes_[includeTag] === undefined) {
    Blockly.xrplhook.includes_[includeTag] = code;
  }
};

/**
 * Adds a string of code to be declared globally to the sketch.
 * Once it is added it will not get overwritten with new code.
 * @param {!string} declarationTag Identifier for this declaration code.
 * @param {!string} code Code to be added below the includes.
 */
Blockly.xrplhook.addDeclaration = function(declarationTag, code) {
  if (Blockly.xrplhook.definitions_[declarationTag] === undefined) {
    Blockly.xrplhook.definitions_[declarationTag] = code;
  }
};

/**
 * Adds a string of code to declare a variable globally to the sketch.
 * Only if overwrite option is set to true it will overwrite whatever
 * value the identifier held before.
 * @param {!string} varName The name of the variable to declare.
 * @param {!string} code Code to be added for the declaration.
 * @param {boolean=} overwrite Flag to ignore previously set value.
 * @return {!boolean} Indicates if the declaration overwrote a previous one.
 */
Blockly.xrplhook.addVariable = function(varName, code, overwrite) {
  var overwritten = false;
  if (overwrite || (Blockly.xrplhook.variables_[varName] === undefined)) {
    Blockly.xrplhook.variables_[varName] = code;
    overwritten = true;
  }
  return overwritten;
};

/**
 * Adds a string of code into the xrplhook setup() function. It takes an
 * identifier to not repeat the same kind of initialisation code from several
 * blocks. If overwrite option is set to true it will overwrite whatever
 * value the identifier held before.
 * @param {!string} setupTag Identifier for the type of set up code.
 * @param {!string} code Code to be included in the setup() function.
 * @param {boolean=} overwrite Flag to ignore previously set value.
 * @return {!boolean} Indicates if the new setup code overwrote a previous one.
 */
Blockly.xrplhook.addSetup = function(setupTag, code, overwrite) {
  var overwritten = false;
  if (overwrite || (Blockly.xrplhook.setups_[setupTag] === undefined)) {
    Blockly.xrplhook.setups_[setupTag] = code;
    overwritten = true;
  }
  return overwritten;
};

/**
 * Adds a string of code as a function. It takes an identifier (meant to be the
 * function name) to only keep a single copy even if multiple blocks might
 * request this function to be created.
 * A function (and its code) will only be added on first request.
 * @param {!string} preferedName Identifier for the function.
 * @param {!string} code Code to be included in the setup() function.
 * @return {!string} A unique function name based on input name.
 */
Blockly.xrplhook.addFunction = function(preferedName, code) {
  if (Blockly.xrplhook.codeFunctions_[preferedName] === undefined) {
    var uniqueName = Blockly.xrplhook.variableDB_.getDistinctName(
        preferedName, Blockly.Generator.NAME_TYPE);
    Blockly.xrplhook.codeFunctions_[preferedName] =
        code.replace(Blockly.xrplhook.DEF_FUNC_NAME, uniqueName);
    Blockly.xrplhook.functionNames_[preferedName] = uniqueName;
  }
  return Blockly.xrplhook.functionNames_[preferedName];
};

/**
 * Description.
 * @param {!Blockly.Block} block Description.
 * @param {!string} pin Description.
 * @param {!string} pinType Description.
 * @param {!string} warningTag Description.
 */
Blockly.xrplhook.reservePin = function(block, pin, pinType, warningTag) {
  if (Blockly.xrplhook.pins_[pin] !== undefined) {
    if (Blockly.xrplhook.pins_[pin] != pinType) {
      block.setWarningText(Blockly.Msg.ARD_PIN_WARN1.replace('%1', pin)
		.replace('%2', warningTag).replace('%3', pinType)
		.replace('%4', Blockly.xrplhook.pins_[pin]), warningTag);
    } else {
      block.setWarningText(null, warningTag);
    }
  } else {
    Blockly.xrplhook.pins_[pin] = pinType;
    block.setWarningText(null, warningTag);
  }
};

/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything. A trailing semicolon is needed to make this legal.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.xrplhook.scrubNakedValue = function(line) {
  return line + ';\n';
};

/**
 * Encode a string as a properly escaped xrplhook string, complete with quotes.
 * @param {string} string Text to encode.
 * @return {string} xrplhook string.
 * @private
 */
Blockly.xrplhook.quote_ = function(string) {
  // TODO: This is a quick hack.  Replace with goog.string.quote
  string = string.replace(/\\/g, '\\\\')
                 .replace(/\n/g, '\\\n')
                 .replace(/\$/g, '\\$')
                 .replace(/'/g, '\\\'');
  return '\"' + string + '\"';
};

/**
 * Common tasks for generating xrplhook from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The xrplhook code created for this block.
 * @return {string} xrplhook code with comments and subsequent blocks added.
 * @this {Blockly.CodeGenerator}
 * @private
 */
Blockly.xrplhook.scrub_ = function(block, code) {
  if (code === null) { return ''; } // Block has handled code generation itself

  var commentCode = '';
  // Only collect comments for blocks that aren't inline
  if (!block.outputConnection || !block.outputConnection.targetConnection) {
    // Collect comment for this block.
    var comment = block.getCommentText();
    if (comment) {
      commentCode += this.prefixLines(comment, '// ') + '\n';
    }
    // Collect comments for all value arguments
    // Don't collect comments for nested statements
    for (var x = 0; x < block.inputList.length; x++) {
      if (block.inputList[x].type == Blockly.INPUT_VALUE) {
        var childBlock = block.inputList[x].connection.targetBlock();
        if (childBlock) {
          var comment = this.allNestedComments(childBlock);
          if (comment) {
            commentCode += this.prefixLines(comment, '// ');
          }
        }
      }
    }
  }
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  var nextCode = this.blockToCode(nextBlock);
  return commentCode + code + nextCode;
};

/**
 * Generates xrplhook Types from a Blockly Type.
 * @param {!Blockly.Type} typeBlockly The Blockly type to be converted.
 * @return {string} xrplhook type for the respective Blockly input type, in a
 *     string format.
 * @private
 */
Blockly.xrplhook.getxrplhookType_ = function(typeBlockly) {
  switch (typeBlockly.typeId) {
    case Blockly.Types.SHORT_NUMBER.typeId:
      return 'char';
    case Blockly.Types.NUMBER.typeId:
      return 'int';
    case Blockly.Types.LARGE_NUMBER.typeId:
      return 'long';
    case Blockly.Types.DECIMAL.typeId:
      return 'float';
    case Blockly.Types.TEXT.typeId:
      return 'String';
    case Blockly.Types.CHARACTER.typeId:
      return 'char';
    case Blockly.Types.BOOLEAN.typeId:
      return 'boolean';
    case Blockly.Types.NULL.typeId:
      return 'void';
    case Blockly.Types.UNDEF.typeId:
      return 'undefined';
    case Blockly.Types.CHILD_BLOCK_MISSING.typeId:
      // If no block connected default to int, change for easier debugging
      //return 'ChildBlockMissing';
      return 'int';
    case 'uint8':
      return 'uint8';  
    default:
      return 'Invalid Blockly Type';
    }
};

/** Used for not-yet-implemented block code generators */
Blockly.xrplhook.noGeneratorCodeInline = function() {
  return ['', Blockly.xrplhook.ORDER_ATOMIC];
};

/** Used for not-yet-implemented block code generators */
Blockly.xrplhook.noGeneratorCodeLine = function() { return ''; };