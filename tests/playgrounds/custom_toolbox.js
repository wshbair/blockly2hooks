Blockly.defineBlocksWithJsonArray([{
    "type": "testing",
    "message0": "#define name %1 is %2 %3",
    "args0": [
      {
        "type": "field_input",
        "name": "NAME",
        "text": "macro"
      },
      {
        "type": "input_dummy"
      },
      {
        "type": "input_value",
        "name": "NAME"
      }
    ],
    "inputsInline": true,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  }
]);

  var codelabToolbox = `
  <xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">
  <category name="Logic" colour="#5b80a5">
    <block type="controls_if"></block>
    <block type="logic_compare">
      <field name="OP">EQ</field>
    </block>
    <block type="logic_operation">
      <field name="OP">AND</field>
    </block>
    <block type="logic_negate"></block>
    <block type="logic_boolean">
      <field name="BOOL">TRUE</field>
    </block>
    <block type="logic_null"></block>
    <block type="logic_ternary"></block>
  </category>
  <category name="Variables" colour="#000000" custom="VARIABLE"></category>
  <category name="Lists" colour="#745ba5">
    <block type="lists_create_with">
      <mutation items="0"></mutation>
    </block>
    <block type="lists_create_with">
      <mutation items="3"></mutation>
    </block>
    <block type="lists_repeat">
      <value name="NUM">
        <shadow type="math_number">
          <field name="NUM">5</field>
        </shadow>
      </value>
    </block>
    <block type="lists_length"></block>
    <block type="lists_isEmpty"></block>
    <block type="lists_indexOf">
      <field name="END">FIRST</field>
      <value name="VALUE">
        <block type="variables_get">
          <field name="VAR" id="T}#*-f.#TPQKoIGz5ytc">list</field>
        </block>
      </value>
    </block>
    <block type="lists_getIndex">
      <mutation statement="false" at="true"></mutation>
      <field name="MODE">GET</field>
      <field name="WHERE">FROM_START</field>
      <value name="VALUE">
        <block type="variables_get">
          <field name="VAR" id="T}#*-f.#TPQKoIGz5ytc">list</field>
        </block>
      </value>
    </block>
    <block type="lists_setIndex">
      <mutation at="true"></mutation>
      <field name="MODE">SET</field>
      <field name="WHERE">FROM_START</field>
      <value name="LIST">
        <block type="variables_get">
          <field name="VAR" id="T}#*-f.#TPQKoIGz5ytc">list</field>
        </block>
      </value>
    </block>
    <block type="lists_getSublist">
      <mutation at1="true" at2="true"></mutation>
      <field name="WHERE1">FROM_START</field>
      <field name="WHERE2">FROM_START</field>
      <value name="LIST">
        <block type="variables_get">
          <field name="VAR" id="T}#*-f.#TPQKoIGz5ytc">list</field>
        </block>
      </value>
    </block>
    <block type="lists_split">
      <mutation mode="SPLIT"></mutation>
      <field name="MODE">SPLIT</field>
      <value name="DELIM">
        <shadow type="text">
          <field name="TEXT">,</field>
        </shadow>
      </value>
    </block>
    <block type="lists_sort">
      <field name="TYPE">NUMERIC</field>
      <field name="DIRECTION">1</field>
    </block>
  </category>
  <category name="My" colour="#9fa55b">
    <block type="testing">
      <field name="NAME">macro</field>
    </block>
  </category>
</xml>
    `

    const codelabGenerator = new Blockly.Generator('JSON');
    codelabGenerator['object'] = function(block) {
        return 'my code object';
      }