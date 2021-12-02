/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview XML toolbox embedded into a JavaScript text string.
 */
 'use strict';

 /** Create a namespace for the application. */
 var Ardublockly = Ardublockly || {};
 
 
 Ardublockly.TOOLBOX_XML =
 '<xml>' +
 '  <category id="catHooksTool" name="Essential">' +
 '    <block type="hook_template">'+
 '    <value name="LOOP_FUNC">'+ 
 '    <block type="_g_function">'+
 '     <value name="arg1">' +
 '        <block type="math_number">' +
 '          <field name="NUM">1</field>' +
 '        </block>' +
 '      </value>' +
 '      <value name="arg2">' +
 '        <block type="math_number">' +
 '          <field name="NUM">1</field>' +
 '        </block>' +
 '      </value>' +
 '    </block>' +
 '   </value>'+
 '    </block>' + 
 '    <block type="comment">'+
 '    </block>' +

 '    <block type="_g_function">'+
 '     <value name="arg1">' +
 '        <block type="math_number">' +
 '          <field name="NUM">1</field>' +
 '        </block>' +
 '      </value>' +
 '      <value name="arg2">' +
 '        <block type="math_number">' +
 '          <field name="NUM">1</field>' +
 '        </block>' +
 '      </value>' +
 '    </block>' +
 '    <block type="sfcodes"></block>' + 
 '  </category>' +
 '  <sep></sep>' +
 /////////////////////////////////////////////////////////////////////// 
//Hook API Categogry
/////////////////////////////////////////////////////////////////////// 
'  <category id="catHookAPI" name="Hook API">'+  
//Hook Control category ........................................../ 
'  <category id="catHooksControl" name="Control">' +  
'    <block type="control_accept">'+
'     <value name="read_ptr">' +
'        <block type="sbuf">' +
'           <value name="SBUF">' +
'               <block type="text">' +
'                <field name="TEXT">Accepted!</field>' +
'                </block>' +
'           </value>' +
'        </block>' +
'      </value>' +
'     <value name="error_code">' +
'        <block type="math_number">' +
'          <field name="NUM">1</field>' +
'        </block>' +
'      </value>' +
'    </block>' +
'    <block type="control_rollback">'+
'     <value name="read_ptr">' +
'        <block type="sbuf">' +
'           <value name="SBUF">' +
'               <block type="text">' +
'                <field name="TEXT">Rejected!</field>' +
'                </block>' +
'           </value>' +
'        </block>' +        
'      </value>' +
'     <value name="error_code">' +
'        <block type="math_number">' +
'          <field name="NUM">2</field>' +
'        </block>' +
'      </value>' +
'    </block>' +
'  </category>' + 
'  <sep></sep>' +
//Hook Utilities category ........................................../ 
'  <category id="catUtilities" name="Utilities">' + //Utilities sub category
'    <block type="util_raddr"></block>' +
'    <block type="util_accid">'+
'      <value name="write_ptr"><block type="sbuf"></block></value>'+
'      <value name="read_ptr"><block type="sbuf"></block></value>'+
'    </block>' +
'    <block type="util_sha512h"></block>' +
'    <block type="util_verify"></block>' +
'    <block type="util_keylet"></block>' +
'  </category>' +
'  <sep></sep>' +
//Hook Serialization category ........................................../ 
'  <category id="catSerialization" name="Serialization">' + //Serialization sub category
'    <block type="sto_subfield"></block>' +
'    <block type="sto_subarray"></block>' +
'    <block type="sto_validate"></block>' +
'    <block type="sto_emplace"></block>' +
'    <block type="sto_erase"></block>' +
'  </category>' + 
'  <sep></sep>' +
//Emitted Transaction category ........................................../ 
'  <category id="catEmittedTransaction" name="Emitted Transaction">' +
'    <block type="etxn_burden"></block>' +
'    <block type="etxn_fee_base"></block>' +
'    <block type="emit"></block>' +
'    <block type="etxn_generation"></block>' +
'    <block type="etxn_reserve">'+
'      <value name="NUM">' +
'        <block type="math_number">' +
'          <field name="NUM">1</field>' +
'        </block>' +
'      </value>' +
'    </block>' +
'  </category>' +
'  <sep></sep>' +
//Originating Transaction category ........................................../ 
'  <category id="catOriginatingTransaction" name="Originating Transaction">' + 
'    <block type="otxn_burden"></block>' +
'    <block type="otxn_field"></block>' +
'    <block type="otxn_field_txt"></block>' +
'    <block type="otxn_generation"></block>' +
'    <block type="otxn_type"></block>' +
'    <block type="otxn_id"></block>' +
'    <block type="otxn_slot">'+
'      <value name="slot_no">' +
'        <block type="math_number">' +
'          <field name="NUM">0</field>' +
'        </block>' +
'      </value>' +
'    </block>' +
'  </category>' + 
'  <sep></sep>' +
//Float category ........................................../ 
'  <category id="catFloat" name="Float">' +
'    <block type="float_set">'+
'      <value name="exponent">' +
'        <block type="math_number">' +
'          <field name="NUM">-81</field>' +
'        </block>' +
'      </value>' +
'      <value name="mantissa">' +
'        <block type="math_number">' +
'          <field name="NUM">1</field>' +
'        </block>' +
'      </value>' +
'    </block>' +
'    <block type="float_multiply"></block>' +
'    <block type="float_mulratio"></block>' +
'    <block type="float_negate"></block>' +
'    <block type="float_compare"></block>' +
'    <block type="float_sum"></block>' +
'    <block type="float_sto"></block>' +
'    <block type="float_sto_set"></block>' +
'    <block type="float_invert"></block>' +
'    <block type="float_divide"></block>' +
'    <block type="float_one"></block>' +
'    <block type="float_exponent"></block>' +
'    <block type="float_mantissa"></block>' +
'    <block type="float_sign"></block>' +
'    <block type="float_exponent_set"></block>' +
'    <block type="float_mantissa_set"></block>' +
'    <block type="float_sign_set"></block>' +
'    <block type="float_int"></block>' +
'  </category>' + 
'  <sep></sep>' +
//Ledger category ........................................../ 
'  <category id="catLedger" name="Ledger">' +
'    <block type="hook_account">'+
'     <value name="VAR">' +
'        <block type="sbuf">' +
'           <value name="SBUF">' +
'                <block type="variables_get"></block>'+
'           </value>' +
'        </block>' +
'      </value>' +
'    </block>' + 
'    <block type="hook_account_statment">'+
'     <value name="VAR">' +
'        <block type="sbuf">' +
'           <value name="SBUF">' +
'                <block type="variables_get"></block>'+
'           </value>' +
'        </block>' +
'      </value>' +
'    </block>' + 
'    <block type="hook_hash"></block>' +
'    <block type="ledger_last_hash"></block>' +
'    <block type="nonce"></block>' +
'    <block type="fee_base"></block>' +
'    <block type="ledger_seq"></block>' +
'  </category>' +  
'  <sep></sep>' +
//Slot category ........................................../ 
'  <category id="catSlot" name="Slot">' +
'    <block type="slot"></block>' +
'    <block type="slot_clear">'+
'      <value name="slot_no">' +
'        <block type="math_number">' +
'          <field name="NUM">1</field>' +
'        </block>' +
'      </value>' +
'    </block>' +
'    <block type="slot_count">'+
'      <value name="slot_no">' +
'        <block type="math_number">' +
'          <field name="NUM">1</field>' +
'        </block>' +
'      </value>' +
'    </block>' +
'    <block type="slot_id"></block>' +
'    <block type="slot_set"></block>' +
'    <block type="slot_size">'+
'      <value name="slot_no">' +
'        <block type="math_number">' +
'          <field name="NUM">1</field>' +
'        </block>' +
'      </value>' +
'    </block>' +
'    <block type="slot_subarray"></block>' +
'    <block type="slot_subfield"></block>' +
'    <block type="slot_type"></block>' +
'    <block type="slot_float"></block>' +
'  </category>' +
'  <sep></sep>' +
//State category ........................................../ 
'  <category id="catState" name="State">' +
'    <block type="state"></block>' +
'    <block type="state_set"></block>' +
'    <block type="state_foreign"></block>' +
'  </category>' + 
'  <sep></sep>' +
//Trace category ........................................../ 
'  <category id="catTrace" name="Trace (Debug)">' +
'    <block type="trace"></block>' +
'    <block type="trace_slot"></block>' +
'    <block type="trace_num"></block>' +
'    <block type="trace_float"></block>' +
'  </category>' +
'  <sep></sep>' +
'  </category>' +
/////////////////////////////////////////////////////////////////////// 
// Macro
/////////////////////////////////////////////////////////////////////// 
'  <category id="catMacro" name="Hook Macro">' +
'  <category id="catMacroGeneral" name="General">' +
'    <block type="prepare_payment_simple">'+
'      <value name="buf_out"><block type="variables_get"></block></value>'+
'      <value name="drops_amount"><block type="variables_get"></block></value>'+
'      <value name="drops_fee"><block type="variables_get"></block></value>'+
'      <value name="to_address"><block type="variables_get"></block></value>'+
'      <value name="dest_tag"><block type="math_number"><field name="NUM">0</field></block></value>' +
'      <value name="src_tag"><block type="math_number"><field name="NUM">0</field></block></value>' +
'    </block>' +
'    <block type="amount_to_drops"><value name="AMOUNT"><block type="variables_get"></block></value></block>' +

'    <block type="guard">'+
'     <value name="arg1">' +
'        <block type="math_number">' +
'          <field name="NUM">1</field>' +
'        </block>' +
'      </value>' +
'    </block>' +
'  </category>' +
// Buffer Macros
'  <category id="catMacroGeneral" name="Buffer">' +
'    <block type="sbuf">'+
'      <value name="SBUF">' +
'        <block type="text">' +
'          <field name="TEXT"></field>' +
'        </block>' +
'      </value>' +
'    </block>' +
'    <block type="buffer_equal">'+
'      <value name="equal"><block type="variables_get"></block></value>'+
'      <value name="account_field"><block type="variables_get"></block></value>'+
'      <value name="hook_accid"><block type="variables_get"></block></value>'+
'      <value name="length">' +
'        <block type="math_number">' +
'          <field name="NUM">20</field>' +
'        </block>' +
'      </value>' +
'    </block>' +
'    <block type="clearbuf"><value name="buffer"><block type="variables_get"></block></value></block>' +
'    <block type="sub_offset"></block>' + 
'    <block type="uint32_from_buf"></block>' +
'    <block type="buffer_equal_str"></block>' +
'    <block type="uint16_to_buf"></block>' +
'    <block type="uint16_from_buf"></block>' +
'    <block type="uint32_to_buf"></block>' +
'    <block type="uint32_from_buf"></block>' +
'    <block type="uint64_to_buf"></block>' +
'    <block type="uint64_from_buf"></block>' +
'    <block type="macro_define"></block>' +

'  </category>' +
//Trace macro
'  <category id="catMacroGeneral" name="Trace">' +
'    <block type="TRACEVAR"><value name="TRACEVAR"><block type="variables_get"></block></value></block>' +
'    <block type="TRACESTR">'+
'      <value name="TRACESTR">' +
'        <block type="text">' +
'          <field name="TEXT">String</field>' +
'        </block>' +
'      </value>' +
'    </block>' +
'    <block type="TRACEHEX"></block>' +
'    <block type="TRACEXFL"></block>' +
'  </category>' +






'  </category>' +
'  <sep></sep>' +

/////////////////////////////////////////////////////////////////////// 
// Logic Category
/////////////////////////////////////////////////////////////////////// 
 '  <category id="catLogic" name="Logic">' +
 '    <block type="controls_if"></block>' +
 '    <block type="logic_compare"></block>' +
 '    <block type="logic_operation"></block>' +
 '    <block type="logic_negate"></block>' +
 '    <block type="logic_boolean"></block>' +
 '    <block type="logic_null"></block>' +
  '  </category>' +
 '  <sep></sep>' +
/////////////////////////////////////////////////////////////////////// 
// Loops
/////////////////////////////////////////////////////////////////////// 
 '  <category id="catLoops" name="Loops">' +
 '    <block type="controls_for">' +
 '      <value name="FROM">' +
 '        <block type="math_number">' +
 '          <field name="NUM">1</field>' +
 '        </block>' +
 '      </value>' +
 '      <value name="TO">' +
 '        <block type="math_number">' +
 '          <field name="NUM">10</field>' +
 '        </block>' +
 '      </value>' +
 '      <value name="BY">' +
 '        <block type="math_number">' +
 '          <field name="NUM">1</field>' +
 '        </block>' +
 '      </value>' +
 '    </block>' +
 '    <block type="controls_flow_statements"></block>' +
 '  </category>' +
 '  <sep></sep>' +
 ///////////////////////////////////////////////////////////////////////
 // Math Categorty 
/////////////////////////////////////////////////////////////////////// 
 '  <category id="catMath" name="Math">' +
 '    <block type="math_post_inc_decrement"></block>' +
 '    <block type="math_number"></block>' +
 '    <block type="math_arithmetic"></block>' +
 '    <block type="math_single"></block>' +
 '    <block type="math_trig"></block>' +
 '    <block type="math_constant"></block>' +
 '    <block type="math_number_property"></block>' +
 '    <block type="math_change">' +
 '      <value name="DELTA">' +
 '        <block type="math_number">' +
 '          <field name="NUM">1</field>' +
 '        </block>' +
 '      </value>' +
 '    </block>' +
 '    <block type="math_round"></block>' +
 '    <block type="math_modulo"></block>' +
 '    <block type="math_constrain">' +
 '      <value name="LOW">' +
 '        <block type="math_number">' +
 '          <field name="NUM">1</field>' +
 '        </block>' +
 '      </value>' +
 '      <value name="HIGH">' +
 '        <block type="math_number">' +
 '          <field name="NUM">100</field>' +
 '        </block>' +
 '      </value>' +
 '    </block>' +
 '    <block type="math_random_int">' +
 '      <value name="FROM">' +
 '        <block type="math_number">' +
 '          <field name="NUM">1</field>' +
 '        </block>' +
 '      </value>' +
 '      <value name="TO">' +
 '        <block type="math_number">' +
 '          <field name="NUM">100</field>' +
 '        </block>' +
 '      </value>' +
 '    </block>' +
 '    <block type="math_random_float"></block>' +
 '    <block type="base_map"></block>' +
 '  </category>' +
 '  <sep></sep>' +
/////////////////////////////////////////////////////////////////////// 
// Text 
/////////////////////////////////////////////////////////////////////// 
 '  <category id="catText" name="Text">' +
 '    <block type="text"></block>' +
 '    <block type="text_join"></block>' +
 '    <block type="text_append">' +
 '      <value name="TEXT">' +
 '        <block type="text"></block>' +
 '      </value>' +
 '    </block>' +
 '    <block type="text_length"></block>' +
 '    <block type="text_isEmpty"></block>' +
  '  </category>' +
 '  <sep></sep>' +
/////////////////////////////////////////////////////////////////////// 
// Variables
/////////////////////////////////////////////////////////////////////// 
 '  <category id="catVariables" name="Variables">' +
 '    <block type="variables_declare">'+
 '      <value name="VALUE">' +
 '        <block type="math_number">' +
 '          <field name="NUM">0</field>' +
 '        </block>' +
 '      </value>' +
 '    </block>' +
 '    <block type="variables_get"></block>' +
 '    <block type="variables_set">' +
 '      <value name="VALUE">' +
 '        <block type="variables_set_type"></block>' +
 '      </value>' +
 '    </block>' +
 '    <block type="variables_set_type"></block>' +
 '    <block type="variables_pointer_declare"></block>'+
 '    <block type="variables_pointer_set"></block>'+
 '  </category>' +
 '  <sep></sep>' +
/////////////////////////////////////////////////////////////////////// 
// List and Array
/////////////////////////////////////////////////////////////////////// 
 '  <category id="catLists" name="Lists">' +
 '    <block type="variables_array_declare"></block>'+
'    <block type="variables_array_get"></block>'+
'    <block type="variables_get"></block>' +
 '  </category>' +
 '  <sep></sep>' +
 '</xml>';
 