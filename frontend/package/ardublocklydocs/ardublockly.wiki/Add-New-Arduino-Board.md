_(Work in Progress: This page should describe how to add a new Arduino Board to Ardublockly)_

# Adding a New Arduino Board to Ardublockly

As long as the board you would like to add is supported by the Arduino IDE, adding support within Ardublockly is a simple task that only required two files to be modified:

* `ardublocklyserver/compilersettings.py`: Needs a new entry onto the `ServerCompilerSettings.__arduino_types` dictionary. 
* `blockly/generators/arduino/boards.js`: Needs a new entry in the `Blockly.Arduino.Boards.profiles` object.

In a near-future update Ardublockly will be refactored to require a single edit to the `blockly/generators/arduino/boards.js` to add a new board, removing the need to update the server code.

You can have a look at [commit 7cc6bc3fe310449b94e1160cc145876d82586e02](https://github.com/carlosperate/ardublockly/commit/7cc6bc3fe310449b94e1160cc145876d82586e02) as a simple example to add a new board.


## Server update

Although this might change in the future (and the documentation updated with the change), the server contains a dictionary with the supported boards. Each "key-value" pair in this dictionary defines the name of the board and compiler flag respectively.

The reason this dictionary exists is because the board data is retrieved from the server each time the settings are opened, dynamically generating the settings drop down, and sending each new selection to the server to be saved on the settings ini file. Then, when the front end sends the code to be compiled, it check this saved setting and appends the relevant compiler flag to the IDE command line invocation.

It is important to ensure that the new key entry in this dictionary contains the same name as the new board profile added to `blockly/generators/arduino/boards.js`.

An example with a couple of items can be seen below, to add a new board, the same format entry has to be added to this dictionary.

```python
__arduino_types = {'Uno': 'arduino:avr:uno',
                   'Leonardo': 'arduino:avr:leonardo'}
```


## Blockly update

The Arduino code generator contains a list of Arduino Board profiles defining board characteristics like the pin, peripheral configuration, compiler flag, etc.

The following is the board profile for the Arduino Uno, a similar profile will have to be created for the new board to support. It is important to note that the object name for the new board profile is the same as the key entered in the server dictionary (spaces should be replaced by underscores `_`).

```javascript
/** Arduino Uno board profile. */
Blockly.Arduino.Boards.profiles.uno = {
  name: 'Arduino Uno',
  description: 'Arduino Uno standard compatible board',
  compilerFlag: 'arduino:avr:uno',
  analogPins: Blockly.Arduino.Boards.generateAnalogIo(0, 5),
  digitalPins: Blockly.Arduino.Boards.generateDigitalIo(0, 13).concat(
                   Blockly.Arduino.Boards.generateAnalogIo(0, 5)),
  pwmPins: [['3', '3'], ['5', '5'], ['6', '6'], ['9', '9'], ['10', '10'],
            ['11', '11']],
  serial: [['serial', 'Serial']],
  serialPins: { Serial: [['RX', '0'], ['TX', '1']] },
  serialSpeed: [['300', '300'], ['600', '600'], ['1200', '1200'],
                ['2400', '2400'], ['4800', '4800'], ['9600', '9600'],
                ['14400', '14400'], ['19200', '19200'], ['28800', '28800'],
                ['31250', '31250'], ['38400', '38400'], ['57600', '57600'],
                ['115200', '115200']],
  spi: [['SPI', 'SPI']],
  spiPins: { SPI: [['MOSI', '11'], ['MISO', '12'], ['SCK', '13']] },
  spiClockDivide: [['2 (8MHz)', 'SPI_CLOCK_DIV2'],
                   ['4 (4MHz)', 'SPI_CLOCK_DIV4'],
                   ['8 (2MHz)', 'SPI_CLOCK_DIV8'],
                   ['16 (1MHz)', 'SPI_CLOCK_DIV16'],
                   ['32 (500KHz)', 'SPI_CLOCK_DIV32'],
                   ['64 (250KHz)', 'SPI_CLOCK_DIV64'],
                   ['128 (125KHz)', 'SPI_CLOCK_DIV128']],
  i2c: [['I2C', 'Wire']],
  i2cPins: { Wire: [['SDA', 'A4'], ['SCL', 'A5']] },
  i2cSpeed: [['100kHz', '100000L'], ['400kHz', '400000L']],
  builtinLed: [['BUILTIN_1', '13']],
  interrupt: [['interrupt0', '2'], ['interrupt1', '3']]
};
```

You can see all the pins are grouped in an array, each item being a "2-item string array" on their own. This is because the first item is the pin description in a human-readable format, and the second is the pin string used in to generate the Arduino Code. So, for example, the SPI MOSI pin defined as `['MOSI', '11']`.

There is also a couple of helper functions for generating an array of digital and analogue pins. These functions were created only because these pins follow a very simple format, and this saves the developer the time manually type the array:

```javascript
Blockly.Arduino.Boards.generateDigitalIo(pinStart, pinEnd)
Blockly.Arduino.Boards.generateAnalogIo(pinStart, pinEnd)
```

So, the a call to `Blockly.Arduino.Boards.generateAnalogIo(0, 3)` generates the following array:

```javascript
[ ['A0', 'A0'], ['A1', 'A1'], ['A2', 'A2'], ['A3', 'A3'] ]
```
