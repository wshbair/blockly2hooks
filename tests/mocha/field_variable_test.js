/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

suite('Variable Fields', function() {
  var FAKE_VARIABLE_NAME = 'default_name';
  var FAKE_ID = 'id1';
  setup(function() {
    sharedTestSetup.call(this);
    this.workspace = new Blockly.Workspace();
    // Stub for default variable name.
    sinon.stub(Blockly.Variables, 'generateUniqueName')
        .returns(FAKE_VARIABLE_NAME);
  });
  teardown(function() {
    sharedTestTeardown.call(this);
  });
  /**
   * Configuration for field creation tests with invalid values.
   * @type {!Array<!FieldCreationTestCase>}
   */
  var invalidValueCreationTestCases = [
    {title: 'Undefined', value: undefined, args: [undefined]},
    {title: 'Null', value: null, args: [null]},
    {title: 'Boolean true', value: true, args: [true]},
    {title: 'Boolean false', value: false, args: [false]},
    {title: 'Number (Truthy)', value: 1, args: [1]},
    {title: 'Number (Falsy)', value: 0, args: [0]},
    {title: 'NaN', value: NaN, args: [NaN]},
  ];
  /**
   * Configuration for field creation tests with valid values.
   * @type {!Array<!FieldCreationTestCase>}
   */
  var validValueCreationTestCases = [
    {title: 'String', value: 'id2', args: ['name2'],
      expectedValue: 'id2', expectedText: 'name2'},
  ];
  var addJson = function(testCase) {
    testCase.json = {'variable': testCase.args[0]};
  };
  invalidValueCreationTestCases.forEach(addJson);
  validValueCreationTestCases.forEach(addJson);

  var initVariableField = (workspace, fieldVariable) => {
    var mockBlock = createTestBlock();
    mockBlock.workspace = workspace;
    fieldVariable.setSourceBlock(mockBlock);

    // No view to initialize, but still need to init the model.
    var genUidStub = createGenUidStubWithReturns(FAKE_ID);
    fieldVariable.initModel();
    genUidStub.restore();

    return fieldVariable;
  };
  var customCreateWithJs = function(testCase) {
    var fieldVariable = testCase ? new Blockly.FieldVariable(...testCase.args) :
        new Blockly.FieldVariable();
    return initVariableField(this.workspace, fieldVariable);
  };
  var customCreateWithJson = function(testCase) {
    var fieldVariable = testCase ?
        Blockly.FieldVariable.fromJson(testCase.json) :
        Blockly.FieldVariable.fromJson({});
    return initVariableField(this.workspace, fieldVariable);
  };

  /**
   * The expected default name for the field being tested.
   * @type {*}
   */
  var defaultFieldName = FAKE_VARIABLE_NAME;
  /**
   * Asserts that the field property values are set to default.
   * @param {!Blockly.FieldVariable} field The field to check.
   */
  var assertFieldDefault = function(field) {
    testHelpers.assertFieldValue(field, FAKE_ID, defaultFieldName);
  };
  /**
   * Asserts that the field properties are correct based on the test case.
   * @param {!Blockly.FieldVariable} field The field to check.
   * @param {!FieldValueTestCase} testCase The test case.
   */
  var validTestCaseAssertField = function(field, testCase) {
    testHelpers.assertFieldValue(field, FAKE_ID, testCase.expectedText);
  };

  testHelpers.runConstructorSuiteTests(
      Blockly.FieldVariable, validValueCreationTestCases,
      invalidValueCreationTestCases,
      validTestCaseAssertField, assertFieldDefault, customCreateWithJs);

  testHelpers.runFromJsonSuiteTests(
      Blockly.FieldVariable, validValueCreationTestCases,
      invalidValueCreationTestCases,
      validTestCaseAssertField, assertFieldDefault, customCreateWithJson);

  suite('initModel', function() {
    test('No Value Before InitModel', function() {
      var fieldVariable = new Blockly.FieldVariable('name1');
      chai.assert.equal(fieldVariable.getText(), '');
      chai.assert.isNull(fieldVariable.getValue());
    });
  });


  /**
   * Configuration for field tests with invalid values.
   * @type {!Array<!FieldCreationTestCase>}
   */
  var invalidValueTestCases = [
    ...invalidValueCreationTestCases,
    {title: 'Variable does not exist', value: 'id3', args: ['name2'],
      expectedValue: 'id2', expectedText: 'name2'},
  ];
  /**
   * Configuration for field tests with valid values.
   * @type {!Array<!FieldCreationTestCase>}
   */
  var validValueTestCases = [
    {title: 'New variable ID', value: 'id2', args: ['name2'],
      expectedValue: 'id2', expectedText: 'name2'},
  ];

  suite('setValue', function() {
    setup(function() {
      this.workspace.createVariable('name2', null, 'id2');
      this.field = new Blockly.FieldVariable(null);
      initVariableField(this.workspace, this.field);

      // Invalid value test are expected to log errors.
      const nativeConsoleWarn = console.warn;
      this.nativeConsoleWarn = nativeConsoleWarn;
      console.warn = function(msg) {
        if (!msg.includes('Variable id doesn\'t point to a real variable')) {
          nativeConsoleWarn.call(this, ...arguments);
        }
      };
    });
    teardown(function() {
      console.warn = this.nativeConsoleWarn;
    });
    testHelpers.runSetValueTests(validValueTestCases, invalidValueTestCases,
        FAKE_ID, defaultFieldName);
  });

  suite('Dropdown options', function() {
    var assertDropdownContents = (fieldVariable, expectedVarOptions) => {
      var dropdownOptions = Blockly.FieldVariable.dropdownCreate.call(
          fieldVariable);
      // Expect variable options, a rename option, and a delete option.
      chai.assert.lengthOf(dropdownOptions, expectedVarOptions.length + 2);
      for (let i = 0, option; (option = expectedVarOptions[i]); i++) {
        chai.assert.deepEqual(dropdownOptions[i], option);
      }
      chai.assert.include(
          dropdownOptions[dropdownOptions.length - 2][0], 'Rename');

      chai.assert.include(
          dropdownOptions[dropdownOptions.length - 1][0], 'Delete');
    };
    test('Contains variables created before field', function() {
      this.workspace.createVariable('name1', '', 'id1');
      this.workspace.createVariable('name2', '', 'id2');
      // Expect that the dropdown options will contain the variables that exist
      var fieldVariable = initVariableField(
          this.workspace, new Blockly.FieldVariable('name2'));
      assertDropdownContents(fieldVariable,
          [['name1', 'id1'], ['name2', 'id2']]);
    });
    test('Contains variables created after field', function() {
      // Expect that the dropdown options will contain the variables that exist
      var fieldVariable = initVariableField(
          this.workspace, new Blockly.FieldVariable('name1'));
      // Expect that variables created after field creation will show up too.
      this.workspace.createVariable('name2', '', 'id2');
      assertDropdownContents(fieldVariable,
          [['name1', 'id1'], ['name2', 'id2']]);
    });
    test('Contains variables created before and after field', function() {
      this.workspace.createVariable('name1', '', 'id1');
      this.workspace.createVariable('name2', '', 'id2');
      // Expect that the dropdown options will contain the variables that exist
      var fieldVariable = initVariableField(
          this.workspace, new Blockly.FieldVariable('name1'));
      // Expect that variables created after field creation will show up too.
      this.workspace.createVariable('name3', '', 'id3');
      assertDropdownContents(fieldVariable,
          [['name1', 'id1'], ['name2', 'id2'], ['name3', 'id3']]);
    });
  });

  suite('Validators', function() {
    setup(function() {
      this.workspace.createVariable('name1', null, 'id1');
      this.workspace.createVariable('name2', null, 'id2');
      this.workspace.createVariable('name3', null, 'id3');
      this.variableField = initVariableField(
          this.workspace, new Blockly.FieldVariable('name1'));
    });
    suite('Null Validator', function() {
      setup(function() {
        this.variableField.setValidator(function() {
          return null;
        });
      });
      test('New Value', function() {
        this.variableField.setValue('id2');
        testHelpers.assertFieldValue(this.variableField, 'id1', 'name1');
      });
    });
    suite('Force \'id\' ID Validator', function() {
      setup(function() {
        this.variableField.setValidator(function(newValue) {
          return 'id' + newValue.charAt(newValue.length - 1);
        });
      });
      test('New Value', function() {
        // Must create the var so that the field doesn't throw an error.
        this.workspace.createVariable('thing2', null, 'other2');
        this.variableField.setValue('other2');
        testHelpers.assertFieldValue(this.variableField, 'id2', 'name2');
      });
    });
    suite('Returns Undefined Validator', function() {
      setup(function() {
        this.variableField.setValidator(function() {});
      });
      test('New Value', function() {
        this.variableField.setValue('id2');
        testHelpers.assertFieldValue(this.variableField, 'id2', 'name2');
      });
    });
  });

  suite('Customizations', function() {
    suite('Types and Default Types', function() {
      test('JS Constructor', function() {
        var field = new Blockly.FieldVariable(
            'test', undefined, ['Type1'], 'Type1');
        chai.assert.deepEqual(field.variableTypes, ['Type1']);
        chai.assert.equal(field.defaultType_, 'Type1');
      });
      test('JSON Definition', function() {
        var field = Blockly.FieldVariable.fromJson({
          variable: 'test',
          variableTypes: ['Type1'],
          defaultType: 'Type1'
        });
        chai.assert.deepEqual(field.variableTypes, ['Type1']);
        chai.assert.equal(field.defaultType_, 'Type1');
      });
      test('JS Configuration - Simple', function() {
        var field = new Blockly.FieldVariable(
            'test', undefined, undefined, undefined, {
              variableTypes: ['Type1'],
              defaultType: 'Type1'
            });
        chai.assert.deepEqual(field.variableTypes, ['Type1']);
        chai.assert.equal(field.defaultType_, 'Type1');
      });
      test('JS Configuration - Ignore', function() {
        var field = new Blockly.FieldVariable(
            'test', undefined, ['Type2'], 'Type2', {
              variableTypes: ['Type1'],
              defaultType: 'Type1'
            });
        chai.assert.deepEqual(field.variableTypes, ['Type1']);
        chai.assert.equal(field.defaultType_, 'Type1');
      });
    });
  });
  suite('Get variable types', function() {
    setup(function() {
      this.workspace.createVariable('name1', 'type1');
      this.workspace.createVariable('name2', 'type2');
    });
    test('variableTypes is undefined', function() {
      // Expect that since variableTypes is undefined, only type empty string
      // will be returned (regardless of what types are available on the workspace).
      var fieldVariable = new Blockly.FieldVariable('name1');
      var resultTypes = fieldVariable.getVariableTypes_();
      chai.assert.deepEqual(resultTypes, ['']);
    });
    test('variableTypes is explicit', function() {
      // Expect that since variableTypes is defined, it will be the return
      // value, regardless of what types are available on the workspace.
      var fieldVariable = new Blockly.FieldVariable(
          'name1', null, ['type1', 'type2'], 'type1');
      var resultTypes = fieldVariable.getVariableTypes_();
      chai.assert.deepEqual(resultTypes, ['type1', 'type2']);
      chai.assert.equal(fieldVariable.defaultType_, 'type1',
          'Default type was wrong');
    });
    test('variableTypes is null', function() {
      // Expect all variable types to be returned.
      // The field does not need to be initialized to do this--it just needs
      // a pointer to the workspace.
      var fieldVariable = new Blockly.FieldVariable('name1');
      var mockBlock = createTestBlock();
      mockBlock.workspace = this.workspace;
      fieldVariable.setSourceBlock(mockBlock);
      fieldVariable.variableTypes = null;

      var resultTypes = fieldVariable.getVariableTypes_();
      // The empty string is always one of the options.
      chai.assert.deepEqual(resultTypes, ['type1', 'type2', '']);
    });
    test('variableTypes is the empty list', function() {
      var fieldVariable = new Blockly.FieldVariable('name1');
      var mockBlock = createTestBlock();
      mockBlock.workspace = this.workspace;
      fieldVariable.setSourceBlock(mockBlock);
      fieldVariable.variableTypes = [];

      chai.assert.throws(function() {
        fieldVariable.getVariableTypes_();
      });
    });
  });
  suite('Default types', function() {
    test('Default type exists', function() {
      var fieldVariable = new Blockly.FieldVariable(null, null, ['b'], 'b');
      chai.assert.equal(fieldVariable.defaultType_, 'b',
          'The variable field\'s default type should be "b"');
    });
    test('No default type', function() {
      var fieldVariable = new Blockly.FieldVariable(null);
      chai.assert.equal(fieldVariable.defaultType_, '', 'The variable field\'s default type should be the empty string');
      chai.assert.isNull(fieldVariable.variableTypes,
          'The variable field\'s allowed types should be null');
    });
    test('Default type mismatch', function() {
      // Invalid default type when creating a variable field.
      chai.assert.throws(function() {
        new Blockly.FieldVariable(null, null, ['a'], 'b');
      });
    });
    test('Default type mismatch with empty array', function() {
      // Invalid default type when creating a variable field.
      chai.assert.throws(function() {
        new Blockly.FieldVariable(null, null, ['a']);
      });
    });
  });
  suite('Renaming Variables', function() {
    setup(function() {
      this.workspace.createVariable('name1', null, 'id1');
      Blockly.defineBlocksWithJsonArray([{
        "type": "field_variable_test_block",
        "message0": "%1",
        "args0": [
          {
            "type": "field_variable",
            "name": "VAR",
            "variable": "name1"
          }
        ],
      }]);
      this.variableBlock = new Blockly.Block(this.workspace,
          'field_variable_test_block');
      this.variableField = this.variableBlock.getField('VAR');
    });
    test('Rename & Keep Old ID', function() {
      this.workspace.renameVariableById('id1', 'name2');
      chai.assert.equal(this.variableField.getText(), 'name2');
      chai.assert.equal(this.variableField.getValue(), 'id1');
    });
    test('Rename & Get New ID', function() {
      this.workspace.createVariable('name2', null, 'id2');
      this.workspace.renameVariableById('id1', 'name2');
      chai.assert.equal(this.variableField.getText(), 'name2');
      chai.assert.equal(this.variableField.getValue(), 'id2');
    });
  });
});
