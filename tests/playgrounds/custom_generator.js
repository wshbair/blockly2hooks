Blockly.defineBlocksWithJsonArray([{
    "type": "object",
    "message0": "{ %1 %2 }",
    "args0": [
      {
        "type": "input_dummy"
      },
      {
        "type": "input_statement",
        "name": "MEMBERS"
      }
    ],
    "output": null,
    "colour": 230,
  },
  {
    "type": "member",
    "message0": "%1 %2 %3",
    "args0": [
      {
        "type": "field_input",
        "name": "MEMBER_NAME",
        "text": ""
      },
      {
        "type": "field_label",
        "name": "COLON",
        "text": ":"
      },
      {
        "type": "input_value",
        "name": "MEMBER_VALUE"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
  }]);

  var codelabToolbox = `
    <xml id="toolbox" style="display: none">
    <block type="object"/>
    <block type="member"></block>
    <block type="math_number"><field name="NUM">0</field></block>
    <block type="text"><field name="TEXT"/></block>
    <block type="logic_boolean"><field name="BOOL">TRUE</field></block>
    <block type="logic_null"/>
    <block type="lists_create_with"><mutation items="3"/></block>
    </xml>
    `

    const codelabGenerator = new Blockly.Generator('JSON');
    codelabGenerator['object'] = function(block) {
        return 'my code object';
      }