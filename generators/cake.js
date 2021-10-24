/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Helper functions for generating JavaScript for blocks.
 * @author fraser@google.com (Neil Fraser)
 */
 'use strict';

 goog.provide('Blockly.cake');
 
 goog.require('Blockly.Generator');
 goog.require('Blockly.inputTypes');
 goog.require('Blockly.utils.global');
 goog.require('Blockly.utils.object');
 goog.require('Blockly.utils.string');
 
 
 /**
  * cake code generator.
  * @type {!Blockly.Generator}
  */
 Blockly.cake = new Blockly.Generator('cake');
 
 Blockly.cake.C_VARIABLE_TYPES = [
  ["float", "float"],
  ["int", "int"],
  ["unsigned int", "unsigned int"],
  ["short", "short"],
  ["unsigned short", "unsigned short"],
  ["bool", "bool"]
];

 /**
  * List of illegal variable names.
  * This is not intended to be a security feature.  Blockly is 100% client-side,
  * so bypassing this list is trivial.  This is intended to prevent users from
  * accidentally clobbering a built-in object or function.
  * @private
  */
  Blockly.cake.addReservedWords(
    ',alignas,alignof,and,and_eq,asm,auto,bitand,bitor,bool,break,case,catch,char,char16_t,char32_t,class,compl,const,constexpr,const_cast,continue,decltype,default,delete,do,double,dynamic_cast,else,enum,explicit,export,extern,false,float,for,friend,goto,if,inline,int,long,long double,long long,mutable,namespace,new,noexcept,not,not_eq,nullptr,operator,or,or_eq,private,protected,public,register,reinterpret_cast,return,short,signed,sizeof,static,static_assert,static_cast,struct,switch,template,this,thread_local,throw,true,try,typedef,typeid,typename,union,unsigned,using,virtual,void,volatile,wchar_t,while,xor,xor_eq,posix,'
    // http://en.cppreference.com/w/cpp/keyword
    + 'game,api,PI,PI2,PI3,PI4,DEG2RAD,RAD2DEG,ZRMS,ZR2D,ZR3D,ALLIANCE' //TODO: add ZR #defines to list
  );
 /**
  * Order of operation ENUMs.
  * https://developer.mozilla.org/en/JavaScript/Reference/Operators/Operator_Precedence
  */
  Blockly.cake.ORDER_ATOMIC = 0;         // 0 "" ...
  Blockly.cake.ORDER_MEMBER = 2;         // . []
  Blockly.cake.ORDER_FUNCTION_CALL = 2;  // ()
  Blockly.cake.ORDER_INCREMENT = 3;      // ++
  Blockly.cake.ORDER_DECREMENT = 3;      // --
  Blockly.cake.ORDER_LOGICAL_NOT = 3;    // !
  Blockly.cake.ORDER_BITWISE_NOT = 3;    // ~
  Blockly.cake.ORDER_UNARY_PLUS = 3;     // +
  Blockly.cake.ORDER_UNARY_NEGATION = 3; // -
  Blockly.cake.ORDER_MULTIPLICATION = 5; // *
  Blockly.cake.ORDER_DIVISION = 5;       // /
  Blockly.cake.ORDER_MODULUS = 5;        // %
  Blockly.cake.ORDER_ADDITION = 6;       // +
  Blockly.cake.ORDER_SUBTRACTION = 6;    // -
  Blockly.cake.ORDER_BITWISE_SHIFT = 7;  // << >>
  Blockly.cake.ORDER_RELATIONAL = 8;     // < <= > >=
  Blockly.cake.ORDER_EQUALITY = 9;       // == != 
  Blockly.cake.ORDER_BITWISE_AND = 10;   // &
  Blockly.cake.ORDER_BITWISE_XOR = 11;   // ^
  Blockly.cake.ORDER_BITWISE_OR = 12;    // |
  Blockly.cake.ORDER_LOGICAL_AND = 13;   // &&
  Blockly.cake.ORDER_LOGICAL_OR = 14;    // ||
  Blockly.cake.ORDER_CONDITIONAL = 15;   // ?:
  Blockly.cake.ORDER_ASSIGNMENT = 15;    // = += -= *= /= %= <<= >>= ...
  Blockly.cake.ORDER_COMMA = 17;         // ,
  Blockly.cake.ORDER_NONE = 99;          // (...)
  
  Blockly.cake.INFINITE_LOOP_TRAP = null;
  
 
 /**
  * Initialise the database of variable names.
  * @param {!Blockly.Workspace} workspace Workspace to generate code from.
  */
 Blockly.cake.init = function(workspace) {
   // Call Blockly.Generator's init.
   Object.getPrototypeOf(this).init.call(this);
 
   if (!this.nameDB_) {
     this.nameDB_ = new Blockly.Names(this.RESERVED_WORDS_);
   } else {
     this.nameDB_.reset();
   }
 
   this.nameDB_.setVariableMap(workspace.getVariableMap());
   this.nameDB_.populateVariables(workspace);
   this.nameDB_.populateProcedures(workspace);
 
   var defvars = [];
   // Add developer variables (not created or named by the user).
   var devVarList = Blockly.Variables.allDeveloperVariables(workspace);
   for (var i = 0; i < devVarList.length; i++) {
     defvars.push(this.nameDB_.getName(devVarList[i],
         Blockly.Names.DEVELOPER_VARIABLE_TYPE));
   }
 
   // Add user variables, but only ones that are being used.
   var variables = Blockly.Variables.allUsedVarModels(workspace);
   for (var i = 0; i < variables.length; i++) {
     defvars.push(this.nameDB_.getName(variables[i].getId(),
         Blockly.VARIABLE_CATEGORY_NAME));
   }
 
   // Declare all of the variables.
   if (defvars.length) {
     this.definitions_['variables'] = 'var ' + defvars.join(', ') + ';';
   }
   this.isInitialized = true;
 };
 
 /**
  * Prepend the generated code with the variable definitions.
  * @param {string} code Generated code.
  * @return {string} Completed code.
  */
  Blockly.cake.finish = function(code) {
    // Indent every line.
    if (code) {
      code = this.prefixLines(code, Blockly.cake.INDENT);
    }
    code = '\n' + code;
  
      // Convert the definitions dictionary into a list.
      var includes = [];
      var declarations = [];
      var defines = [];
      var func_definitions = [];
      for (var name in Blockly.cake.definitions_) {
          var def = Blockly.cake.definitions_[name];
          var nameInclude = 'include';
          var nameFunc_declare = 'Func_declare';
          var nameDefine = 'define';
          if (name.match(nameInclude)) {
              includes.push(def);
          }
          else if(name.match(nameFunc_declare)){
              declarations.push(def);//declaration
          }
          else if(name.match(nameDefine)){
              defines.push(def);//#define
          }
          else {
              func_definitions.push(def);//definition
          }
      }
      //imports--> #include
      //definitions--> function def, #def
      var allDefs = includes.join('\n') + '\n\n' + declarations.join('\n') + '\n\n' + defines.join('\n');
      var allFuncs = func_definitions.join('\n');
  
    return allDefs.replace(/\n\n+/g, '\n\n').replace(/\n*$/, '\n') + code + allFuncs.replace(/\n\n+/g, '\n\n');
  };
 
  Blockly.cake.finishFull = function(code) {
    // Convert the definitions dictionary into a list.
    var definitions = [];
    for (var name in Blockly.cake.definitions_) {
      definitions.push(Blockly.cake.definitions_[name]);
    }
    code = definitions.join('\n\n') + '\n\n' + 
    'void setPos(float x, float y, float z) {\n\tfloat pos[3];\n\tpos[0] = x; pos[1] = y; pos[2] = z;\n\tapi.setPositionTarget(pos);\n}'
    + '\n\n' + code;
    //HACK: Make sure the code contains an init function in case the init page has not been properly initialized
    if(code.indexOf('//Begin page init\nvoid init() {\n') === -1) {
      code = 'void init() {}\n' + code;
    }
    return code;
  };

  /**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.  A trailing semicolon is needed to make this legal.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.cake.scrubNakedValue = function(line) {
    return line + ';\n';
  //ZR editor should ignore all blocks that are not children of the page's function block
 // return '';
};
Blockly.cake.quote_ = function(string) {
    // TODO: This is a quick hack.  Replace with goog.string.quote
  
      string = string.replace(/\\/g, '\\\\')
                      .replace(/'/g, '\\\'')
                      .replace(/"/g, '\\\"')
                      .replace(/\?/g, '\\?');
      string = string.replace(/\\\\n/g, '\\n');
    return string; //Do not add quotes so printf formatting can be used
  };
  
  /**
   * Common tasks for generating cake from blocks.
   * Handles comments for the specified block and any connected value blocks.
   * Calls any statements following this block.
   * @param {!Blockly.Block} block The current block.
   * @param {string} code The cake code created for this block.
   * @return {string} cake code with comments and subsequent blocks added.
   * @this {Blockly.CodeGenerator}
   * @private
   */
  Blockly.cake.scrub_ = function(block, code) {
    if (code === null) {
      // Block has handled code generation itself.
      return '';
    }
    var commentCode = '';
    // Only collect comments for blocks that aren't inline.
    if (!block.outputConnection || !block.outputConnection.targetConnection) {
      // Collect comment for this block.
      var comment = block.getCommentText();
      if (comment) {
        commentCode += this.prefixLines(comment, '// ') + '\n';
      }
      // Collect comments for all value arguments.
      // Don't collect comments for nested statements.
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
 
 