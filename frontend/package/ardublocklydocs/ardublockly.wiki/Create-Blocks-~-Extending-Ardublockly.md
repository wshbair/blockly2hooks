_(This is a stub of the documentation for the functionality included to easily extend Ardublockly to support new blocks)_

_(Introductory paragraph should go here)_

_(Top view description of the extensibility options should go here)_

## Adding Pin Types

_(this has not yet been implemented)_

```javascript
Blockly.Arduino.PinTypes.add('PIN_NAME');
```

## Adding a new Data Types

```javascript
Blockly.Types.addType(typeName, basicType, compatibleTypes)
```
* __typeName__: An String to identify the name of the type.
* __basicType__: A `Blockly.Type.BasicTypes` object that defined its basic type
* __compatibleTypes__: An array of `Blockly.Type.Types` that this Type can be compatible with.

_(Add a note about how compatibility does not go both ways, e.g. a block that takes a Number can also take a compatible boolean, but a block that takes a boolean does not necessarily take a Number)_

Extend other blocks to have a new block as compatible: _(Not yet implemented)_

```javascript
Blockly.Types.addAsCompatible(originType, compatibleType)
```

* __originType__: A `Blockly.Type.Types` for which to extend its compatibility list.
* __compatibleType__: The `Blockly.Type.Types` to add as compatible.

### Basic Type
_(Explain that a basic type is the most fundamental "type unit", so a new basic type should not be something that could be "derived" from an existing one. For example, a "long integer" is a type of `NUMBER` so a new `Type` for that should be created instead of a new "basic type", and a "colour" cannot be represented by any of the current basic types, so it should create its own.)_

Current basic types:

```javascript
Blockly.Type.BasicTypes.TEXT      // General text string type
Blockly.Type.BasicTypes.BOOLEAN   // Can only have two values, generally 0 for false, or 1 for true
Blockly.Type.BasicTypes.NUMBER    // A general number type
Blockly.Type.BasicTypes.DECIMAL   // Number type for numbers with a fractional part
Blockly.Type.BasicTypes.ARRAY     // Array of any type of items
Blockly.Type.BasicTypes.COLOUR    // For the colour blocks, not used in Ardublockly
Blockly.Type.BasicTypes.NULL      // Used as a "no type" wild card natively
Blockly.Type.BasicTypes.UNDEF     // Can be used to delegate type assignment
```

Add a new Basic Type: _(Not yet implemented)_

```javascript
Blockly.Types.addBasicType('TYPE_NAME')
```


