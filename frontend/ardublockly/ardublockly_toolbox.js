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
 '  <sep></sep>' +
 '  <category id="catComms" name="Hooks Ready2Use">' +
 '    <block type="firewall"></block>' +
 '    <block type="accept"></block>' +
 '  </category>' +
 '  <sep></sep>' +
 '  <category id="catHooksTool" name="Essential">' +
 '    <block type="hook_template"></block>' +
 '    <block type="comment">'+
 '    </block>' +
 '    <block type="guard">'+
 '     <value name="arg1">' +
 '        <block type="math_number">' +
 '          <field name="NUM">1</field>' +
 '        </block>' +
 '      </value>' +
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
 '    <block type="tracevar"></block>' +
 '    <block type="TRACESTR"></block>' + 
 '    <block type="etxn_reserve">'+
 '      <value name="NUM">' +
 '        <block type="math_number">' +
 '          <field name="NUM">1</field>' +
 '        </block>' +
 '      </value>' +
 '    </block>' +
 '    <block type="sub_offset"></block>' + 
 '    <block type="uint32_from_buf"></block>' + 
 '    <block type="uint32_from_buf"></block>' + 
 '    <block type="loops_for">' + 
 '      <value name="arg0">' +
 '        <block type="math_number">' +
 '          <field name="NUM">0</field>' +
 '        </block>' +
 '      </value>' +
 '      <value name="arg1">' +
 '        <block type="math_number">' +
 '          <field name="NUM">10</field>' +
 '        </block>' +
 '      </value>' +
 '      <value name="arg2">' +
 '        <block type="math_number">' +
 '          <field name="NUM">1</field>' +
 '        </block>' +
 '      </value>' +
 '    </block>' +
 '  </category>' +
 '  <sep></sep>' +
 '  <sep></sep>' +
 '  <category id="catHooksControl" name="Control">' +
 '    <block type="control_accept">'+
 '     <value name="read_ptr">' +
 '        <block type="text">' +
 '          <field name="TEXT">Success</field>' +
 '        </block>' +
 '      </value>' +
 '     <value name="read_len">' +
 '        <block type="math_number">' +
 '          <field name="NUM">7</field>' +
 '        </block>' +
 '      </value>' +
 '     <value name="error_code">' +
 '        <block type="math_number">' +
 '          <field name="NUM">100</field>' +
 '        </block>' +
 '      </value>' +
 '    </block>' +
 '    <block type="control_rollback">'+
 '     <value name="read_ptr">' +
 '        <block type="text">' +
 '          <field name="TEXT">Rejected!</field>' +
 '        </block>' +
 '      </value>' +
 '     <value name="read_len">' +
 '        <block type="math_number">' +
 '          <field name="NUM">9</field>' +
 '        </block>' +
 '      </value>' +
 '     <value name="error_code">' +
 '        <block type="math_number">' +
 '          <field name="NUM">100</field>' +
 '        </block>' +
 '      </value>' +
 '    </block>' +
 '  </category>' +
 '  <sep></sep>' +
 '  <category id="catUtilities" name="Utilities">' +
 '    <block type="util_raddr"></block>' +
 '    <block type="util_accid"></block>' +
 '    <block type="util_sha512h"></block>' +
 '    <block type="util_verify"></block>' +
 '    <block type="util_keylet"></block>' +
 '  </category>' +
 '  <sep></sep>' +
 '  <category id="catSerialization" name="Serialization">' +
 '    <block type="sto_subfield"></block>' +
 '    <block type="sto_subarray"></block>' +
 '    <block type="sto_validate"></block>' +
 '    <block type="sto_emplace"></block>' +
 '    <block type="sto_erase"></block>' +
 '  </category>' +
 '  <sep></sep>' +
 '  <category id="catHooksControl" name="Buffer Operations">' +
 '    <block type="sbuf">'+
 '      <value name="SBUF">' +
 '        <block type="text">' +
 '          <field name="TEXT"></field>' +
 '        </block>' +
 '      </value>' +
 '    </block>' +
 '    <block type="buffer_equal">'+
 '      <value name="length">' +
 '        <block type="math_number">' +
 '          <field name="NUM">20</field>' +
 '        </block>' +
 '      </value>' +
 '    </block>' +
 '    <block type="clearbuf"></block>' +
 '  </category>' +
 '  <sep></sep>' +
 '  <category id="catEmittedTransaction" name="Emitted Transaction">' +
 '    <block type="etxn_burden"></block>' +
 '    <block type="etxn_fee_base"></block>' +
 '    <block type="emit"></block>' +
 '    <block type="etxn_generation"></block>' +
 '  </category>' +
 '  <sep></sep>' +
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
 '  <sep></sep>' +
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
 '  <category id="catLedger" name="Ledger">' +
 '    <block type="hook_account"></block>' +
 '    <block type="hook_hash"></block>' +
 '    <block type="ledger_last_hash"></block>' +
 '    <block type="nonce"></block>' +
 '    <block type="fee_base"></block>' +
 '    <block type="ledger_seq"></block>' +
 '  </category>' +
 '  <sep></sep>' +
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
 '  <category id="catState" name="State">' +
 '    <block type="state"></block>' +
 '    <block type="state_set"></block>' +
 '    <block type="state_foreign"></block>' +
 '  </category>' +
 '  <sep></sep>' +
 '  <category id="catTrace" name="Trace (Debug)">' +
 '    <block type="trace"></block>' +
 '    <block type="trace_slot"></block>' +
 '    <block type="trace_num"></block>' +
 '    <block type="trace_float"></block>' +
 '  </category>' +
 '  <sep></sep>' +
 '  <category id="catLogic" name=":: Logic">' +
 '    <block type="controls_if"></block>' +
 '    <block type="logic_compare"></block>' +
 '    <block type="logic_operation"></block>' +
 '    <block type="logic_negate"></block>' +
 '    <block type="logic_boolean"></block>' +
 '    <block type="logic_null"></block>' +
 '    <block type="logic_ternary"></block>' +
 '  </category>' +
 '  <sep></sep>' +
 '  <category id="catLoops" name="Loops">' +
//  '    <block type="controls_repeat_ext">' +
//  '      <value name="TIMES">' +
//  '        <block type="math_number">' +
//  '          <field name="NUM">10</field>' +
//  '        </block>' +
//  '      </value>' +
//  '    </block>' +
//  '    <block type="controls_whileUntil"></block>' +
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
 '  <category id="catMath" name="Math">' +
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
 '  <category id="catVariables" name="Variables">' +
 '    <block type="declare_variable_hook"></block>' +
 '    <block type="pointer">'+
 '      <value name="initial">' +
 '        <block type="logic_null"></block>' +
 '      </value>' +
 '    </block>' +
 '    <block type="string">'+
 '      <value name="length">' +
 '        <block type="math_number">' +
 '          <field name="NUM">15</field>' +
 '        </block>' +
 '      </value>' +
 '      <value name="string_var">' +
 '        <block type="text"><field name="TEXT">Hello</field></block>' +
 '      </value>' +
 '    </block>' +
 '    <block type="variables_get"></block>' +
 '    <block type="variables_set"></block>' +
 '    <block type="variables_set">' +
 '      <value name="VALUE">' +
 '        <block type="variables_set_type"></block>' +
 '      </value>' +
 '    </block>' +
 '    <block type="variables_set_type"></block>' +
 '  </category>' +
 '  <sep></sep>' +

 '  <category id="catLists" name="Lists">' +
 '    <block type="lists_create_empty"></block>' +
 '    <block type="lists_create_with"></block>' +
 '    <block type="lists_length"></block>' +
 '    <block type="lists_isEmpty"></block>' +
 '    <block type="lists_indexOf"></block>' +
 '    <block type="lists_getIndex"></block>' +
 '    <block type="lists_setIndex"></block>' +
 '  </category>' +
 '  <sep></sep>' +
 '</xml>';
 
//  '  <category id="catFunctions" name="Functions" custom="PROCEDURE" hidden="true"></category>' +
//  '  <sep></sep>' +
 
 