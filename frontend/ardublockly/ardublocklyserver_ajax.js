/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview Ajax calls to the Ardublockly Server python program.
 */
'use strict';

/** Create a name space for the application. */
var ArdublocklyServer = {};

/**
 * Reads JSON data from the server and forwards formatted JavaScript object.
 * @param {!string} url Location for the JSON data.
 * @param {!function} jsonDataCb Callback with JSON object or null for error.
 */
ArdublocklyServer.getJson = function(url, callback) {
  ArdublocklyServer.sendRequest(url, 'GET', 'application/json', null, callback);
};

/**
 * Sends JSON data to the ArduBlocklyServer.
 * @param {!string} url Requestor URL.
 * @param {!string} json JSON string.
 * @param {!function} callback Request callback function.
 */
ArdublocklyServer.putJson = function(url, json, callback) {
  ArdublocklyServer.sendRequest(url, 'PUT', 'application/json', json, callback);
};

/**
 * Sends a request to the Ardubloockly Server that returns a JSON response.
 * @param {!string} url Requestor URL.
 * @param {!string} method HTTP method.
 * @param {!string} contentType HTTP content type.
 * @param {string} jsonObjSend JavaScript object to be parsed into JSON to send.
 * @param {!function} cb Request callback function, takes a single input for a
 *     parsed JSON object.
 */
ArdublocklyServer.sendRequest = function(
    url, method, contentType, jsonObjSend, cb) {
  var request = ArdublocklyServer.createRequest();

  // The data received is JSON, so it needs to be converted into the right
  // format to be displayed in the page.
  var onReady = function() {
    if (request.readyState == 4) {
      if (request.status == 200) {
        var jsonObjReceived = null;
        try {
          jsonObjReceived = JSON.parse(request.responseText);
        } catch(e) {
          console.error('Incorrectly formatted JSON data from ' + url);
          throw e;
        }
        cb(jsonObjReceived);
      } else {
        // return a null element which will be dealt with in the front end
        cb(null);
      }
    }
  };

  try {
    request.open(method, url, true);
    request.setRequestHeader('Content-type', contentType);
    request.onreadystatechange = onReady;
    request.send(JSON.stringify(jsonObjSend));
  } catch (e) {
    // Nullify callback to indicate error
    cb(null);
    throw e;
  }
};

/** @return {XMLHttpRequest} An XML HTTP Request multi-browser compatible. */
ArdublocklyServer.createRequest = function() {
  var request = null;
  try {
    // Firefox, Chrome, IE7+, Opera, Safari
    request = new XMLHttpRequest();
  }
  catch (e) {
    // IE6 and earlier
    try {
      request = new ActiveXObject('Msxml2.XMLHTTP');
    }
    catch (e) {
      try {
        request = new ActiveXObject('Microsoft.XMLHTTP');
      }
      catch (e) {
        throw 'Your browser does not support AJAX. You will not be able to' +
              'use all of Ardublockly features.';
        request = null;
      }
    }
  }
  return request;
};

/**
 * Creates an HTML element based on the JSON data received from the server.
 * @param {!string} json_data A string containing the JSON data to be parsed.
 * @return {!element} An HTML element, which type depends on the JSON 'element'
 *                    key (currently only text input or drop down).
 */
ArdublocklyServer.jsonToIdeModal = function(jsonObj) {
  if (!jsonObj) return null;

  var elTitle = document.createElement('h4');
  elTitle.className = (jsonObj && jsonObj.success) ? 'arduino_dialog_success' :
                                                     'arduino_dialog_failure';
  var elStdOp = document.createElement('span');
  elStdOp.className = 'arduino_dialog_out';
  var elErrOp = document.createElement('span');
  elErrOp.className = 'arduino_dialog_out_error';

  // Add the Standard and Error outputs
  var ideData = jsonObj.ide_data;
  if (ideData && (ideData.std_output !== undefined) && 
      (ideData.err_output !== undefined)) {
    elStdOp.innerHTML = ideData.std_output.split('\n').join('<br />');
    elErrOp.innerHTML = ideData.err_output.split('\n').join('<br />');
  } else {
    console.error(jsonObj);
    console.error('The IDE out JSON response does not have valid "ide_data".');
  }

  if (jsonObj.errors) {
    // Prepare error message
    elTitle.innerHTML = Ardublockly.getLocalStr('arduinoOpErrorTitle');
    var errStr = [];
    for (var i = 0; i < jsonObj.errors.length; i++) {
      var errorContext = 'Unrecognised error.';
      try {
        errorContext = Ardublockly.getLocalStr(
            'arduinoOpErrorIdContext_' + jsonObj.errors[i].id);
      } catch (e) {
        // Swallow the exception, could be expanded to try to figure out issue
      }
      errStr.push('\nError id ' + jsonObj.errors[i].id + ': ' + errorContext);
    }
    elErrOp.innerHTML += '<br />' + errStr.join('<br />');
  } else if (jsonObj.success && jsonObj.ide_mode) {
    // Format a successful response
    if (jsonObj.ide_mode == 'upload') {
      elTitle.innerHTML = Ardublockly.getLocalStr('arduinoOpUploadedTitle');
    } else if (jsonObj.ide_mode == 'verify') {
      elTitle.innerHTML = Ardublockly.getLocalStr('arduinoOpVerifiedTitle');
    } else if (jsonObj.ide_mode == 'open') {
      elTitle.innerHTML = Ardublockly.getLocalStr('arduinoOpOpenedTitle');
      // This is a corner case where we also add to the stand out
      elStdOp.innerHTML += Ardublockly.getLocalStr('arduinoOpOpenedBody');
    } else {
      elTitle.innerHTML = Ardublockly.getLocalStr('arduinoOpErrorTitle');
    }
  } else {
    console.error(jsonObj);
    console.error('Unexpected response format, printed above.');
  }

  var element = document.createElement('div');
  element.appendChild(elTitle);
  element.appendChild(elStdOp);
  element.appendChild(elErrOp);
  return element;
};

ArdublocklyServer.jsonToHtmlTextInput = function(jsonObj) {
  var element = null;
  if (jsonObj) {
    // Simple text input
    element = document.createElement('input');
    element.setAttribute('type', 'text');
    element.style.cssText = '';
    if (jsonObj.errors) {
      element.setAttribute('value', '');
      element.style.cssText = 'border-bottom: 1px solid #f75c51;' +
                              'box-shadow: 0 1px 0 0 #d73c30;';
    } else {
      element.setAttribute('value', jsonObj.selected || '');
    }
  }
  return element;
};

ArdublocklyServer.jsonToHtmlDropdown = function(jsonObj) {
  var element = null;
  if (!jsonObj) {
    console.error('Invalid JSON received from server.');
  } else if(jsonObj.errors) {
    console.error('There are errors in the JSON response from server.');
    console.error(jsonObj);
  } else {
    // Drop down list of unknown length with a selected item
    element = document.createElement('select');
    element.name = jsonObj.settings_type;
    for (var i = 0; i < jsonObj.options.length; i++) {
      if (jsonObj.options[i].value && jsonObj.options[i].display_text) {
        var option = document.createElement('option');
        option.value = jsonObj.options[i].value;
        option.text = jsonObj.options[i].display_text;
        // Check selected option and mark it
        if (jsonObj.selected) {
          option.selected = jsonObj.options[i].value == jsonObj.selected;
        }
        element.appendChild(option);
      } else {
        console.error('Missing required JSON keys for Drop Down conversion.');
      }
    }
  }
  return element;
};

/**
 * Gets the current Compiler location from the ArdublocklyServer settings.
 * @param {!function} callback Callback function for the server request, must
 *     have one argument to receive the JSON response.
 */
ArdublocklyServer.requestCompilerLocation = function(callback) {
  ArdublocklyServer.getJson('/settings/compiler', callback);
};

/**
 * Sends a string to the Ardublockly Server for a the Arduino IDE executable
 * path.
 * @param {!function} callback Callback function for the server request, must
 *     have one argument to receive the JSON response.
 */
ArdublocklyServer.setCompilerLocation = function(new_path, callback) {
    ArdublocklyServer.putJson(
      '/settings/compiler', {"new_value": new_path}, callback);
};

/**
 * Gets the current Sketch location from the Ardublockly Server settings.
 * @param {!function} callback Callback function for the server request, must
 *     have one argument to receive the JSON response.
 */
ArdublocklyServer.requestSketchLocation = function(callback) {
   ArdublocklyServer.getJson('/settings/sketch', callback);
};

/**
 * Sends a string to the Ardublockly Server for a the Arduino sketch folder.
 * @param {!string} new_path New Sketch location path..
 * @param {!function} callback Callback function for the server request, must
 *     have one argument to receive the JSON response.
 */
ArdublocklyServer.setSketchLocation = function(new_path, callback) {
  ArdublocklyServer.putJson(
      '/settings/sketch', {"new_value": new_path}, callback);
};

/**
 * Request to the Ardublockly Server to return JSON data containing all
 * available target Arduino Boards, and the selected one in the settings.
 * The data is then processed into an HTML element and sent to the callback
 * function as an argument.
 * @param {!function} callback Callback function for the server request, must
 *     have one argument to receive the JSON response.
 */
ArdublocklyServer.requestArduinoBoards = function(callback) {
  ArdublocklyServer.getJson('/settings/board', callback);
};

/**
 * Sends the inputted Arduino Board type to the Ardublockly Server Settings.
 * The new settings menu for the Board type is then processed into an HTML
 * element and sent to the callback function as an argument.
 * @param {!string} new_board Indicates which board has been selected.
 * @param {!function} callback Callback function for the server request, must
 *     have one argument to receive the JSON response.
 */
ArdublocklyServer.setArduinoBoard = function(new_board, callback) {
  ArdublocklyServer.putJson(
      '/settings/board', {"new_value": new_board}, callback);
};

/**
 * Request to the Ardublockly Server to return JSON data containing all
 * available serial ports in the computer, and the selected one in the
 * settings. The data is then processed into an HTML element and sent to the
 * callback function as an argument.
 * @param {!function} callback Callback function for the server request, must
 *     have one argument to receive the JSON response.
 */
ArdublocklyServer.requestSerialPorts = function(callback) {
  ArdublocklyServer.getJson('/settings/serial', callback);
};

/**
 * Sends the inputted Serial Port to the Ardublockly Server Settings. The new
 * settings menu for the Serial Port is then processed into an HTML element
 * and sent to the callback function as an argument.
 * @param {!string} new_port Indicates which port has been selected.
 * @param {!function} callback Callback function for the server request, must
 *     have one argument to receive the JSON response.
 */
ArdublocklyServer.setSerialPort = function(new_port, callback) {
  ArdublocklyServer.putJson(
      '/settings/serial', {"new_value": new_port}, callback);
};

/**
 * Gets the current IDE setting from the Ardublockly Server settings. The new
 * settings menu for the IDE options is then processed into an HTML element
 * and sent to the callback function as an argument.
 * @param {!function} callback Callback function for the server request, must
 *     have one argument to receive the JSON response.
 */
ArdublocklyServer.requestIdeOptions = function(callback) {
  ArdublocklyServer.getJson('/settings/ide', callback);
};

/**
 * Sends the inputted IDE option to the Ardublockly Server Settings. The new
 * settings menu for the IDE options is then processed into an HTML element
 * and sent to the callback function as an argument.
 * @param {!string} ide_option Indicates which option has been selected.
 * @param {!function} callback Callback function for the server request, must
 *     have one argument to receive the JSON response.
 */
ArdublocklyServer.setIdeOptions = function(ide_option, callback) {
  ArdublocklyServer.putJson(
      '/settings/ide', {"new_value": ide_option}, callback);
};



/**
 * Sends the Arduino code to the ArdublocklyServer to be processed as defined
 * by the settings.
 * @param {!string} code Arduino code in a single string format.
 * @param {!function} callback Callback function for the server request, must
 *     have one argument to receive the JSON response.
 */
ArdublocklyServer.sendSketchToServer = function(code, callback) {
    code = ArdublocklyServer.getHookApiFile()+ ArdublocklyServer.getSfCodesFile()+ ArdublocklyServer.getHookMacroFile() + code;
    var inputString = encodeURIComponent(code).replace('%20', '+');
    var actionString = "c2wast&version=1";
    var optionsString = "-O3%20-std%3DC99";
    var command = "input=" + inputString + "&action=" + actionString + "&options=" + optionsString
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function () {
      var wast = this.responseText;
      callback(wast);
    });  
    xhr.open("POST", "https://wasmexplorer-service.herokuapp.com/" + "service.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    xhr.send(command);  
};

// Send the Wasm Binary file to the backend to deploy it 
ArdublocklyServer.hookDeploy = function(wasmBinaryFile, walletAddress, callback){
  var data ={"wasmFile": wasmBinaryFile, "walletAddress": walletAddress} 
  var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function () {
      var wast = this.responseText;
      callback(wast);
    });  
    xhr.open("POST", "http://localhost:3000" + "/hook/create/sethook_tx", true);
    xhr.setRequestHeader("Content-type", "application/json")
    xhr.send(JSON.stringify(data));

};

ArdublocklyServer.publishHook = function(setHookJson, callback){
  var data = {"setHookTx": setHookJson}
  var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function () {
      var response = this.responseText;
      callback(response);
    });  
    xhr.open("POST", "http://localhost:3000" + "/hook/sign/publish", true);
    xhr.setRequestHeader("Content-type", "application/json")
    xhr.send(JSON.stringify(data));

}

ArdublocklyServer.runAcceptTest = function(callback){
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function () {
      var response = this.responseText;
      callback(response);
    });  
    xhr.open("GET", "http://localhost:3000" + "/hook/accept/test", true);
    xhr.setRequestHeader("Content-type", "application/json")
    xhr.send();
}

ArdublocklyServer.getHookApiFile = function(){
  var header = `/**
  * Hook API include file
  *
  * Note to the reader:
  * This include defines two types of things: external functions and macros
  * Functions are used sparingly because a non-inlining compiler may produce
  * undesirable output.
  *
  * Find documentation here: https://xrpl-hooks.readme.io/reference/
  */
 
  #include <stdint.h>
 
 #ifndef HOOKAPI_INCLUDED
 #define HOOKAPI_INCLUDED 1
 
 int64_t hook(int64_t reserved) __attribute__((used));
 int64_t cbak(int64_t reserved) __attribute__((used));
 
 extern int32_t _g(uint32_t id, uint32_t maxiter);
 extern int64_t accept(uint32_t read_ptr, uint32_t read_len, int64_t error_code);
 extern int64_t rollback(uint32_t read_ptr, uint32_t read_len, int64_t error_code);
 extern int64_t util_raddr(uint32_t write_ptr, uint32_t write_len,uint32_t read_ptr,  uint32_t read_len);
 extern int64_t util_accid(uint32_t write_ptr, uint32_t write_len, uint32_t read_ptr,  uint32_t read_len);
 extern int64_t util_verify(uint32_t dread_ptr, uint32_t dread_len, uint32_t sread_ptr, uint32_t sread_len, uint32_t kread_ptr, uint32_t kread_len);
 extern int64_t util_sha512h(uint32_t write_ptr, uint32_t write_len, uint32_t read_ptr,  uint32_t read_len);
 extern int64_t sto_subfield(uint32_t read_ptr,  uint32_t read_len, uint32_t field_id );
 extern int64_t sto_subarray(uint32_t read_ptr,  uint32_t read_len, uint32_t array_id);
 extern int64_t sto_validate(uint32_t read_ptr,  uint32_t read_len);
 extern int64_t sto_emplace(uint32_t write_ptr, uint32_t write_len, uint32_t sread_ptr, uint32_t sread_len, uint32_t fread_ptr, uint32_t fread_len, uint32_t field_id);
 extern int64_t sto_erase(uint32_t write_ptr,  uint32_t write_len, uint32_t read_ptr,   uint32_t read_len, uint32_t field_id);
 extern int64_t util_keylet(uint32_t write_ptr, uint32_t write_len, uint32_t keylet_type, uint32_t a,uint32_t b, uint32_t c, uint32_t d, uint32_t e, uint32_t f);
 extern int64_t etxn_burden(void );
 extern int64_t etxn_details(uint32_t write_ptr,  uint32_t write_len);
 extern int64_t etxn_fee_base(uint32_t tx_byte_count);
 extern int64_t etxn_reserve(uint32_t count);
 extern int64_t etxn_generation(void);
 extern int64_t emit(uint32_t write_ptr, uint32_t write_len, uint32_t read_ptr, uint32_t read_len);
 extern int64_t hook_account(uint32_t write_ptr,  uint32_t write_len);
 extern int64_t hook_hash(uint32_t write_ptr,  uint32_t write_len);
 extern int64_t fee_base(void);
 extern int64_t ledger_seq(void);
 extern int64_t ledger_last_hash(uint32_t write_ptr,  uint32_t write_len);
 extern int64_t nonce(uint32_t write_ptr,  uint32_t write_len);
 
 extern int64_t slot(uint32_t write_ptr, uint32_t write_len, uint32_t slot);
 extern int64_t slot_clear(uint32_t slot);
 extern int64_t slot_count(uint32_t slot);
 extern int64_t slot_id(uint32_t slot);
 extern int64_t slot_set(uint32_t read_ptr,   uint32_t read_len, int32_t  slot);
 extern int64_t slot_size(uint32_t slot);
 extern int64_t slot_subarray(uint32_t parent_slot, uint32_t array_id, uint32_t new_slot);
 extern int64_t slot_subfield(uint32_t parent_slot, uint32_t field_id, uint32_t new_slot);
 extern int64_t slot_type(uint32_t slot, uint32_t flags);
 extern int64_t slot_float(uint32_t slot);
 extern int64_t trace_slot(uint32_t mread_ptr, uint32_t mread_len, uint32_t slot);
 extern int64_t otxn_slot(uint32_t slot);
 extern int64_t state_set(uint32_t read_ptr,   uint32_t read_len, uint32_t kread_ptr,  uint32_t kread_len);
 
 extern int64_t state(uint32_t write_ptr,  uint32_t write_len, uint32_t kread_ptr,  uint32_t kread_len);
 
 /**
  * Retrieve a value from another hook's key-value map.
  * @param write_ptr A buffer to write the state value into
  * @param write_len The length of that buffer
  * @param kread_ptr A buffer to read the state key from
  * @param kread_len The length of that key
  * @param aread_ptr A buffer containing an account-id of another account containing a hook whose state we are reading
  * @param aread_len The length of the account-id (should always be 20).
  * @return The number of bytes written or a negative integer if an error occured.
  */
 extern int64_t state_foreign       (uint32_t write_ptr,  uint32_t write_len,
                                     uint32_t kread_ptr,  uint32_t kread_len,
                                     uint32_t aread_ptr,  uint32_t aread_len);
 
 /**
  * Print some output to the trace log on xrpld. Any xrpld instance set to "trace" log level will see this.
  * @param read_ptr A buffer containing either data or text (in either utf8, or utf16le)
  * @param read_len The byte length of the data/text to send to the trace log
  * @param as_hex If 0 treat the read_ptr as pointing at a string of text, otherwise treat it as data and print hex
  * @return The number of bytes output or a negative integer if an error occured.
  */
 extern int64_t trace               (uint32_t mread_ptr, uint32_t mread_len,
                                     uint32_t dread_ptr, uint32_t dread_len,   uint32_t as_hex);
 
 /**
  * Print some output to the trace log on xrpld along with a decimal number. Any xrpld instance set to "trace" log
  * level will see this.
  * @param read_ptr A pointer to the string to output
  * @param read_len The length of the string to output
  * @param number Any integer you wish to display after the text
  * @return A negative value on error
  */
 extern int64_t trace_num           (uint32_t read_ptr,   uint32_t read_len,   int64_t number);
 
 /**
  * Retrieve the burden of the originating transaction (if any)
  * @return The burden of the originating transaction
  */
 extern int64_t otxn_burden         (void);
 
 /**
  * Retrieve a field from the originating transaction as "full text" (The way it is displayed in JSON)
  * @param write_ptr A buffer to write the representation into
  * @param write_len The length of the buffer
  * @param field_id The field code of the field being requested
  * @return The number of bytes written to write_ptr or a negative integer if an error occured.
  */
 extern int64_t otxn_field_txt      (uint32_t write_ptr,  uint32_t write_len,  uint32_t field_id);
 
 /**
  * Retrieve a field from the originating transaction in its raw serialized form.
  * @param write_ptr A buffer to output the field into
  * @param write_len The length of the buffer.
  * @param field_if The field code of the field being requested
  * @return The number of bytes written to write_ptr or a negative integer if an error occured.
  */
 extern int64_t otxn_field          (uint32_t write_ptr,  uint32_t write_len,  uint32_t field_id);
 
 /**
  * Retrieve the generation of the originating transaction (if any).
  * @return the generation of the originating transaction.
  */
 extern int64_t otxn_generation     (void);
 
 /**
  * Retrieve the TXNID of the originating transaction.
  * @param write_ptr A buffer at least 32 bytes long
  * @param write_len The length of the buffer.
  * @return The number of bytes written into the buffer or a negative integer on failure.
  */
 extern int64_t otxn_id             (uint32_t write_ptr,  uint32_t write_len);
 
 /**
  * Retrieve the Transaction Type (e.g. ttPayment = 0) of the originating transaction.
  * @return The Transaction Type (tt-code)
  */
 extern int64_t otxn_type           (void);
 
 
 
 extern int64_t  float_set           (int32_t exponent,   int64_t mantissa );
 extern int64_t  float_multiply      (int64_t float1,     int64_t float2 );
 extern int64_t  float_mulratio      (int64_t float1,     uint32_t round_up,
                                      uint32_t numerator, uint32_t denominator );
 extern int64_t  float_negate        (int64_t float1 );
 extern int64_t  float_compare       (int64_t float1,     int64_t float2, uint32_t mode );
 extern int64_t  float_sum           (int64_t float1,     int64_t float2 );
 extern int64_t  float_sto           (uint32_t write_ptr, uint32_t write_len,
                                      uint32_t cread_ptr, uint32_t cread_len,
                                      uint32_t iread_ptr, uint32_t iread_len,
                                      int64_t float1,     uint32_t field_code);
 extern int64_t  float_sto_set       (uint32_t read_ptr,  uint32_t read_len );
 extern int64_t  float_invert        (int64_t float1 );
 extern int64_t  float_divide        (int64_t float1,     int64_t float2 );
 extern int64_t  float_one           ();
 
 extern int64_t  float_exponent      (int64_t float1 );
 extern int64_t  float_exponent_set  (int64_t float1,     int32_t exponent );
 extern int64_t  float_mantissa      (int64_t float1 );
 extern int64_t  float_mantissa_set  (int64_t float1,     int64_t mantissa );
 extern int64_t  float_sign          (int64_t float1 );
 extern int64_t  float_sign_set      (int64_t float1,     uint32_t negative );
 extern int64_t  float_int           (int64_t float1,     uint32_t decimal_places, uint32_t abs);
 extern int64_t  trace_float         (uint32_t mread_ptr, uint32_t mread_len, int64_t float1);
 
 
 
 #define SUCCESS  0                  // return codes > 0 are reserved for hook apis to return "success"
 #define OUT_OF_BOUNDS  -1           // could not read or write to a pointer to provided by hook
 #define INTERNAL_ERROR  -2          // eg directory is corrupt
 #define TOO_BIG  -3                 // something you tried to store was too big
 #define TOO_SMALL  -4               // something you tried to store or provide was too small
 #define DOESNT_EXIST  -5            // something you requested wasn't found
 #define NO_FREE_SLOTS  -6           // when trying to load an object there is a maximum of 255 slots
 #define INVALID_ARGUMENT  -7        // self explanatory
 #define ALREADY_SET  -8             // returned when a one-time parameter was already set by the hook
 #define PREREQUISITE_NOT_MET  -9    // returned if a required param wasn't set before calling
 #define FEE_TOO_LARGE  -10          // returned if the attempted operation would result in an absurd fee
 #define EMISSION_FAILURE  -11       // returned if an emitted tx was not accepted by rippled
 #define TOO_MANY_NONCES  -12        // a hook has a maximum of 256 nonces
 #define TOO_MANY_EMITTED_TXN  -13   // a hook has emitted more than its stated number of emitted txn
 #define NOT_IMPLEMENTED  -14        // an api was called that is reserved for a future version
 #define INVALID_ACCOUNT  -15        // an api expected an account id but got something else
 #define GUARD_VIOLATION  -16        // a guarded loop or function iterated over its maximum
 #define INVALID_FIELD  -17          // the field requested is returning sfInvalid
 #define PARSE_ERROR  -18            // hook asked hookapi to parse something the contents of which was invalid
 #define RC_ROLLBACK -19             // used internally by hook api to indicate a rollback
 #define RC_ACCEPT -20               // used internally by hook api to indicate an accept
 #define NO_SUCH_KEYLET -21          // the specified keylet or keylet type does not exist or could not be computed
 
 #define INVALID_FLOAT -10024        // if the mantissa or exponent are outside normalized ranges
 
 #define KEYLET_HOOK 1
 #define KEYLET_HOOK_STATE 2
 #define KEYLET_ACCOUNT 3
 #define KEYLET_AMENDMENTS 4
 #define KEYLET_CHILD 5
 #define KEYLET_SKIP 6
 #define KEYLET_FEES 7
 #define KEYLET_NEGATIVE_UNL 8
 #define KEYLET_LINE 9
 #define KEYLET_OFFER 10
 #define KEYLET_QUALITY 11
 #define KEYLET_EMITTED_DIR 12
 #define KEYLET_TICKET 13
 #define KEYLET_SIGNERS 14
 #define KEYLET_CHECK 15
 #define KEYLET_DEPOSIT_PREAUTH 16
 #define KEYLET_UNCHECKED 17
 #define KEYLET_OWNER_DIR 18
 #define KEYLET_PAGE 19
 #define KEYLET_ESCROW 20
 #define KEYLET_PAYCHAN 21
 #define KEYLET_EMITTED 22
 
 #define COMPARE_EQUAL 1U
 #define COMPARE_LESS 2U
 #define COMPARE_GREATER 4U
  
 #endif
 `;
 return header;
}

ArdublocklyServer.getHookMacroFile = function(){
  const Macro = `/**
  * These are helper macros for writing hooks, all of them are optional as is including hookmacro.h at all
  */
 
 #ifndef HOOKMACROS_INCLUDED
 #define HOOKMACROS_INCLUDED 1
 
 // hook developers should use this guard macro, simply GUARD(<maximum iterations>)
 #define GUARD(maxiter) _g(__LINE__, (maxiter)+1)
 #define GUARDM(maxiter, n) _g(((__LINE__ << 16) + n), (maxiter)+1)
 
 #define SBUF(str) (uint32_t)(str), sizeof(str)
 
 #define REQUIRE(cond, str)\
 {\
     if (!(cond))\
         rollback(SBUF(str), __LINE__);\
 }
 
 // make a report buffer as a c-string
 // provide a name for a buffer to declare (buf)
 // provide a static string
 // provide an integer to print after the string
 #define RBUF(buf, out_len, str, num)\
 unsigned char buf[sizeof(str) + 21];\
 int out_len = 0;\
 {\
     int i = 0;\
     for (; GUARDM(sizeof(str),1),i < sizeof(str); ++i)\
         (buf)[i] = str[i];\
     if ((buf)[sizeof(str)-1] == 0) i--;\
     if ((num) < 0) (buf)[i++] = '-';\
     uint64_t unsigned_num = (uint64_t)( (num) < 0 ? (num) * -1 : (num) );\
     uint64_t j = 10000000000000000000ULL;\
     int start = 1;\
     for (; GUARDM(20,2), unsigned_num > 0 && j > 0; j /= 10)\
     {\
         unsigned char digit = ( unsigned_num / j ) % 10;\
         if (digit == 0 && start)\
             continue;\
         start = 0;\
         (buf)[i++] = '0' + digit;\
     }\
     (buf)[i] = '\0';\
     out_len = i;\
 }
 
 #define RBUF2(buff, out_len, str, num, str2, num2)\
 unsigned char buff[sizeof(str) + sizeof(str2) + 42];\
 int out_len = 0;\
 {\
     unsigned char* buf = buff;\
     int i = 0;\
     for (; GUARDM(sizeof(str),1),i < sizeof(str); ++i)\
         (buf)[i] = str[i];\
     if ((buf)[sizeof(str)-1] == 0) i--;\
     if ((num) < 0) (buf)[i++] = '-';\
     uint64_t unsigned_num = (uint64_t)( (num) < 0 ? (num) * -1 : (num) );\
     uint64_t j = 10000000000000000000ULL;\
     int start = 1;\
     for (; GUARDM(20,2), unsigned_num > 0 && j > 0; j /= 10)\
     {\
         unsigned char digit = ( unsigned_num / j ) % 10;\
         if (digit == 0 && start)\
             continue;\
         start = 0;\
         (buf)[i++] = '0' + digit;\
     }\
     buf += i;\
     out_len += i;\
     i = 0;\
     for (; GUARDM(sizeof(str2),3),i < sizeof(str2); ++i)\
         (buf)[i] = str2[i];\
     if ((buf)[sizeof(str2)-1] == 0) i--;\
     if ((num2) < 0) (buf)[i++] = '-';\
     unsigned_num = (uint64_t)( (num2) < 0 ? (num2) * -1 : (num2) );\
     j = 10000000000000000000ULL;\
     start = 1;\
     for (; GUARDM(20,4), unsigned_num > 0 && j > 0; j /= 10)\
     {\
         unsigned char digit = ( unsigned_num / j ) % 10;\
         if (digit == 0 && start)\
             continue;\
         start = 0;\
         (buf)[i++] = '0' + digit;\
     }\
     (buf)[i] = '\0';\
     out_len += i;\
 }
 
 #define TRACEVAR(v) trace_num((uint32_t)(#v), (uint32_t)(sizeof(#v)), (int64_t)v);
 #define TRACEHEX(v) trace((uint32_t)(#v), (uint32_t)(sizeof(#v)), (uint32_t)(v), (uint32_t)(sizeof(v)), 1);
 #define TRACEXFL(v) trace_float((uint32_t)(#v), (uint32_t)(sizeof(#v)), (int64_t)v);
 #define TRACESTR(v) trace((uint32_t)(#v), (uint32_t)(sizeof(#v)), (uint32_t)(v), sizeof(v), 0);
 
 #define CLEARBUF(b)\
 {\
     for (int x = 0; GUARD(sizeof(b)), x < sizeof(b); ++x)\
         b[x] = 0;\
 }
 
 // returns an in64_t, negative if error, non-negative if valid drops
 #define AMOUNT_TO_DROPS(amount_buffer)\
      (((amount_buffer)[0] >> 7) ? -2 : (\
      ((((uint64_t)((amount_buffer)[0])) & 0xb00111111) << 56) +\
       (((uint64_t)((amount_buffer)[1])) << 48) +\
       (((uint64_t)((amount_buffer)[2])) << 40) +\
       (((uint64_t)((amount_buffer)[3])) << 32) +\
       (((uint64_t)((amount_buffer)[4])) << 24) +\
       (((uint64_t)((amount_buffer)[5])) << 16) +\
       (((uint64_t)((amount_buffer)[6])) <<  8) +\
       (((uint64_t)((amount_buffer)[7])))))
 
 #define SUB_OFFSET(x) ((int32_t)(x >> 32))
 #define SUB_LENGTH(x) ((int32_t)(x & 0xFFFFFFFFULL))
 
 // when using this macro buf1len may be dynamic but buf2len must be static
 // provide n >= 1 to indicate how many times the macro will be hit on the line of code
 // e.g. if it is in a loop that loops 10 times n = 10
 #define BUFFER_EQUAL_GUARD(output, buf1, buf1len, buf2, buf2len, n)\
 {\
     output = ((buf1len) == (buf2len) ? 1 : 0);\
     for (int x = 0; GUARDM( (buf2len) * (n), 1 ), x < (buf2len);\
          ++x)\
     {\
         if ((buf1)[x] != (buf2)[x])\
         {\
             output = 0;\
             break;\
         }\
     }\
 }
 
 #define BUFFER_SWAP(x,y)\
 {\
     uint8_t* z = x;\
     x = y;\
     y = z;\
 }
 
 #define ACCOUNT_COMPARE(compare_result, buf1, buf2)\
 {\
     compare_result = 0;\
     for (int i = 0; GUARD(20), i < 20; ++i)\
     {\
         if (buf1[i] > buf2[i])\
         {\
             compare_result = 1;\
             break;\
         }\
         else if (buf1[i] < buf2[i])\
         {\
             compare_result = -1;\
             break;\
         }\
     }\
 }
 
 #define BUFFER_EQUAL_STR_GUARD(output, buf1, buf1len, str, n)\
     BUFFER_EQUAL_GUARD(output, buf1, buf1len, str, (sizeof(str)-1), n)
 
 #define BUFFER_EQUAL_STR(output, buf1, buf1len, str)\
     BUFFER_EQUAL_GUARD(output, buf1, buf1len, str, (sizeof(str)-1), 1)
 
 #define BUFFER_EQUAL(output, buf1, buf2, compare_len)\
     BUFFER_EQUAL_GUARD(output, buf1, compare_len, buf2, compare_len, 1)
 
 #define UINT16_TO_BUF(buf_raw, i)\
 {\
     unsigned char* buf = (unsigned char*)buf_raw;\
     buf[0] = (((uint64_t)i) >> 8) & 0xFFUL;\
     buf[1] = (((uint64_t)i) >> 0) & 0xFFUL;\
 }
 
 #define UINT16_FROM_BUF(buf)\
     (((uint64_t)((buf)[0]) <<  8) +\
      ((uint64_t)((buf)[1]) <<  0))
 
 #define UINT32_TO_BUF(buf_raw, i)\
 {\
     unsigned char* buf = (unsigned char*)buf_raw;\
     buf[0] = (((uint64_t)i) >> 24) & 0xFFUL;\
     buf[1] = (((uint64_t)i) >> 16) & 0xFFUL;\
     buf[2] = (((uint64_t)i) >>  8) & 0xFFUL;\
     buf[3] = (((uint64_t)i) >>  0) & 0xFFUL;\
 }
 
 
 #define UINT32_FROM_BUF(buf)\
     (((uint64_t)((buf)[0]) << 24) +\
      ((uint64_t)((buf)[1]) << 16) +\
      ((uint64_t)((buf)[2]) <<  8) +\
      ((uint64_t)((buf)[3]) <<  0))
 
 #define UINT64_TO_BUF(buf_raw, i)\
 {\
     unsigned char* buf = (unsigned char*)buf_raw;\
     buf[0] = (((uint64_t)i) >> 56) & 0xFFUL;\
     buf[1] = (((uint64_t)i) >> 48) & 0xFFUL;\
     buf[2] = (((uint64_t)i) >> 40) & 0xFFUL;\
     buf[3] = (((uint64_t)i) >> 32) & 0xFFUL;\
     buf[4] = (((uint64_t)i) >> 24) & 0xFFUL;\
     buf[5] = (((uint64_t)i) >> 16) & 0xFFUL;\
     buf[6] = (((uint64_t)i) >>  8) & 0xFFUL;\
     buf[7] = (((uint64_t)i) >>  0) & 0xFFUL;\
 }
 
 
 #define UINT64_FROM_BUF(buf)\
     (((uint64_t)((buf)[0]) << 56) +\
      ((uint64_t)((buf)[1]) << 48) +\
      ((uint64_t)((buf)[2]) << 40) +\
      ((uint64_t)((buf)[3]) << 32) +\
      ((uint64_t)((buf)[4]) << 24) +\
      ((uint64_t)((buf)[5]) << 16) +\
      ((uint64_t)((buf)[6]) <<  8) +\
      ((uint64_t)((buf)[7]) <<  0))
 
 
 #define INT64_FROM_BUF(buf)\
    ((((uint64_t)((buf)[0]&7FU) << 56) +\
      ((uint64_t)((buf)[1]) << 48) +\
      ((uint64_t)((buf)[2]) << 40) +\
      ((uint64_t)((buf)[3]) << 32) +\
      ((uint64_t)((buf)[4]) << 24) +\
      ((uint64_t)((buf)[5]) << 16) +\
      ((uint64_t)((buf)[6]) <<  8) +\
      ((uint64_t)((buf)[7]) <<  0)) * (buf[0] & 0x80U ? -1 : 1))
 
 #define INT64_TO_BUF(buf_raw, i)\
 {\
     unsigned char* buf = (unsigned char*)buf_raw;\
     buf[0] = (((uint64_t)i) >> 56) & 0x7FUL;\
     buf[1] = (((uint64_t)i) >> 48) & 0xFFUL;\
     buf[2] = (((uint64_t)i) >> 40) & 0xFFUL;\
     buf[3] = (((uint64_t)i) >> 32) & 0xFFUL;\
     buf[4] = (((uint64_t)i) >> 24) & 0xFFUL;\
     buf[5] = (((uint64_t)i) >> 16) & 0xFFUL;\
     buf[6] = (((uint64_t)i) >>  8) & 0xFFUL;\
     buf[7] = (((uint64_t)i) >>  0) & 0xFFUL;\
     if (i < 0) buf[0] |= 0x80U;\
 }
 
 #define ttPAYMENT 0
 #define tfCANONICAL 0x80000000UL
 
 #define atACCOUNT 1U
 #define atOWNER 2U
 #define atDESTINATION 3U
 #define atISSUER 4U
 #define atAUTHORIZE 5U
 #define atUNAUTHORIZE 6U
 #define atTARGET 7U
 #define atREGULARKEY 8U
 #define atPSEUDOCALLBACK 9U
 
 #define amAMOUNT 1U
 #define amBALANCE 2U
 #define amLIMITAMOUNT 3U
 #define amTAKERPAYS 4U
 #define amTAKERGETS 5U
 #define amLOWLIMIT 6U
 #define amHIGHLIMIT 7U
 #define amFEE 8U
 #define amSENDMAX 9U
 #define amDELIVERMIN 10U
 #define amMINIMUMOFFER 16U
 #define amRIPPLEESCROW 17U
 #define amDELIVEREDAMOUNT 18U
 
 /**
  * RH NOTE -- PAY ATTENTION
  *
  * ALL 'ENCODE' MACROS INCREMENT BUF_OUT
  * THIS IS TO MAKE CHAINING EASY
  * BUF_OUT IS A SACRIFICIAL POINTER
  *
  * 'ENCODE' MACROS WITH CONSTANTS HAVE
  * ALIASING TO ASSIST YOU WITH ORDER
  * _TYPECODE_FIELDCODE_ENCODE_MACRO
  * TO PRODUCE A SERIALIZED OBJECT
  * IN CANONICAL FORMAT YOU MUST ORDER
  * FIRST BY TYPE CODE THEN BY FIELD CODE
  *
  * ALL 'PREPARE' MACROS PRESERVE POINTERS
  *
  **/
 
 
 #define ENCODE_TL_SIZE 49
 #define ENCODE_TL(buf_out, tlamt, amount_type)\
 {\
         uint8_t uat = amount_type; \
         buf_out[0] = 0x60U +(uat & 0x0FU ); \
         for (int i = 1; GUARDM(48, 1), i < 49; ++i)\
             buf_out[i] = tlamt[i-1];\
         buf_out += ENCODE_TL_SIZE;\
 }
 #define _06_XX_ENCODE_TL(buf_out, drops, amount_type )\
     ENCODE_TL(buf_out, drops, amount_type );
 #define ENCODE_TL_AMOUNT(buf_out, drops )\
     ENCODE_TL(buf_out, drops, amAMOUNT );
 #define _06_01_ENCODE_TL_AMOUNT(buf_out, drops )\
     ENCODE_TL_AMOUNT(buf_out, drops );
 
 
 // Encode drops to serialization format
 // consumes 9 bytes
 #define ENCODE_DROPS_SIZE 9
 #define ENCODE_DROPS(buf_out, drops, amount_type ) \
     {\
         uint8_t uat = amount_type; \
         uint64_t udrops = drops; \
         buf_out[0] = 0x60U +(uat & 0x0FU ); \
         buf_out[1] = 0b01000000 + (( udrops >> 56 ) & 0b00111111 ); \
         buf_out[2] = (udrops >> 48) & 0xFFU; \
         buf_out[3] = (udrops >> 40) & 0xFFU; \
         buf_out[4] = (udrops >> 32) & 0xFFU; \
         buf_out[5] = (udrops >> 24) & 0xFFU; \
         buf_out[6] = (udrops >> 16) & 0xFFU; \
         buf_out[7] = (udrops >>  8) & 0xFFU; \
         buf_out[8] = (udrops >>  0) & 0xFFU; \
         buf_out += ENCODE_DROPS_SIZE; \
     }
 
 #define _06_XX_ENCODE_DROPS(buf_out, drops, amount_type )\
     ENCODE_DROPS(buf_out, drops, amount_type );
 
 #define ENCODE_DROPS_AMOUNT(buf_out, drops )\
     ENCODE_DROPS(buf_out, drops, amAMOUNT );
 #define _06_01_ENCODE_DROPS_AMOUNT(buf_out, drops )\
     ENCODE_DROPS_AMOUNT(buf_out, drops );
 
 #define ENCODE_DROPS_FEE(buf_out, drops )\
     ENCODE_DROPS(buf_out, drops, amFEE );
 #define _06_08_ENCODE_DROPS_FEE(buf_out, drops )\
     ENCODE_DROPS_FEE(buf_out, drops );
 
 #define ENCODE_TT_SIZE 3
 #define ENCODE_TT(buf_out, tt )\
     {\
         uint8_t utt = tt;\
         buf_out[0] = 0x12U;\
         buf_out[1] =(utt >> 8 ) & 0xFFU;\
         buf_out[2] =(utt >> 0 ) & 0xFFU;\
         buf_out += ENCODE_TT_SIZE; \
     }
 #define _01_02_ENCODE_TT(buf_out, tt)\
     ENCODE_TT(buf_out, tt);
 
 
 #define ENCODE_ACCOUNT_SIZE 22
 #define ENCODE_ACCOUNT(buf_out, account_id, account_type)\
     {\
         uint8_t uat = account_type;\
         buf_out[0] = 0x80U + uat;\
         buf_out[1] = 0x14U;\
         *(uint64_t*)(buf_out +  2) = *(uint64_t*)(account_id +  0);\
         *(uint64_t*)(buf_out + 10) = *(uint64_t*)(account_id +  8);\
         *(uint32_t*)(buf_out + 18) = *(uint32_t*)(account_id + 16);\
         buf_out += ENCODE_ACCOUNT_SIZE;\
     }
 #define _08_XX_ENCODE_ACCOUNT(buf_out, account_id, account_type)\
     ENCODE_ACCOUNT(buf_out, account_id, account_type);
 
 #define ENCODE_ACCOUNT_SRC_SIZE 22
 #define ENCODE_ACCOUNT_SRC(buf_out, account_id)\
     ENCODE_ACCOUNT(buf_out, account_id, atACCOUNT);
 #define _08_01_ENCODE_ACCOUNT_SRC(buf_out, account_id)\
     ENCODE_ACCOUNT_SRC(buf_out, account_id);
 
 #define ENCODE_ACCOUNT_DST_SIZE 22
 #define ENCODE_ACCOUNT_DST(buf_out, account_id)\
     ENCODE_ACCOUNT(buf_out, account_id, atDESTINATION);
 #define _08_03_ENCODE_ACCOUNT_DST(buf_out, account_id)\
     ENCODE_ACCOUNT_DST(buf_out, account_id);
 
 #define ENCODE_UINT32_COMMON_SIZE 5U
 #define ENCODE_UINT32_COMMON(buf_out, i, field)\
     {\
         uint32_t ui = i; \
         uint8_t uf = field; \
         buf_out[0] = 0x20U +(uf & 0x0FU); \
         buf_out[1] =(ui >> 24 ) & 0xFFU; \
         buf_out[2] =(ui >> 16 ) & 0xFFU; \
         buf_out[3] =(ui >>  8 ) & 0xFFU; \
         buf_out[4] =(ui >>  0 ) & 0xFFU; \
         buf_out += ENCODE_UINT32_COMMON_SIZE; \
     }
 #define _02_XX_ENCODE_UINT32_COMMON(buf_out, i, field)\
     ENCODE_UINT32_COMMON(buf_out, i, field)\
 
 #define ENCODE_UINT32_UNCOMMON_SIZE 6U
 #define ENCODE_UINT32_UNCOMMON(buf_out, i, field)\
     {\
         uint32_t ui = i; \
         uint8_t uf = field; \
         buf_out[0] = 0x20U; \
         buf_out[1] = uf; \
         buf_out[2] =(ui >> 24 ) & 0xFFU; \
         buf_out[3] =(ui >> 16 ) & 0xFFU; \
         buf_out[4] =(ui >>  8 ) & 0xFFU; \
         buf_out[5] =(ui >>  0 ) & 0xFFU; \
         buf_out += ENCODE_UINT32_UNCOMMON_SIZE; \
     }
 #define _02_XX_ENCODE_UINT32_UNCOMMON(buf_out, i, field)\
     ENCODE_UINT32_UNCOMMON(buf_out, i, field)\
 
 #define ENCODE_LLS_SIZE 6U
 #define ENCODE_LLS(buf_out, lls )\
     ENCODE_UINT32_UNCOMMON(buf_out, lls, 0x1B );
 #define _02_27_ENCODE_LLS(buf_out, lls )\
     ENCODE_LLS(buf_out, lls );
 
 #define ENCODE_FLS_SIZE 6U
 #define ENCODE_FLS(buf_out, fls )\
     ENCODE_UINT32_UNCOMMON(buf_out, fls, 0x1A );
 #define _02_26_ENCODE_FLS(buf_out, fls )\
     ENCODE_FLS(buf_out, fls );
 
 #define ENCODE_TAG_SRC_SIZE 5
 #define ENCODE_TAG_SRC(buf_out, tag )\
     ENCODE_UINT32_COMMON(buf_out, tag, 0x3U );
 #define _02_03_ENCODE_TAG_SRC(buf_out, tag )\
     ENCODE_TAG_SRC(buf_out, tag );
 
 #define ENCODE_TAG_DST_SIZE 5
 #define ENCODE_TAG_DST(buf_out, tag )\
     ENCODE_UINT32_COMMON(buf_out, tag, 0xEU );
 #define _02_14_ENCODE_TAG_DST(buf_out, tag )\
     ENCODE_TAG_DST(buf_out, tag );
 
 #define ENCODE_SEQUENCE_SIZE 5
 #define ENCODE_SEQUENCE(buf_out, sequence )\
     ENCODE_UINT32_COMMON(buf_out, sequence, 0x4U );
 #define _02_04_ENCODE_SEQUENCE(buf_out, sequence )\
     ENCODE_SEQUENCE(buf_out, sequence );
 
 #define ENCODE_FLAGS_SIZE 5
 #define ENCODE_FLAGS(buf_out, tag )\
     ENCODE_UINT32_COMMON(buf_out, tag, 0x2U );
 #define _02_02_ENCODE_FLAGS(buf_out, tag )\
     ENCODE_FLAGS(buf_out, tag );
 
 #define ENCODE_SIGNING_PUBKEY_SIZE 35
 #define ENCODE_SIGNING_PUBKEY(buf_out, pkey )\
     {\
         buf_out[0] = 0x73U;\
         buf_out[1] = 0x21U;\
         *(uint64_t*)(buf_out +  2) = *(uint64_t*)(pkey +  0);\
         *(uint64_t*)(buf_out + 10) = *(uint64_t*)(pkey +  8);\
         *(uint64_t*)(buf_out + 18) = *(uint64_t*)(pkey + 16);\
         *(uint64_t*)(buf_out + 26) = *(uint64_t*)(pkey + 24);\
         buf[34] = pkey[32];\
         buf_out += ENCODE_SIGNING_PUBKEY_SIZE;\
     }
 
 #define _07_03_ENCODE_SIGNING_PUBKEY(buf_out, pkey )\
     ENCODE_SIGNING_PUBKEY(buf_out, pkey );
 
 #define ENCODE_SIGNING_PUBKEY_NULL_SIZE 35
 #define ENCODE_SIGNING_PUBKEY_NULL(buf_out )\
     {\
         buf_out[0] = 0x73U;\
         buf_out[1] = 0x21U;\
         *(uint64_t*)(buf_out+2) = 0;\
         *(uint64_t*)(buf_out+10) = 0;\
         *(uint64_t*)(buf_out+18) = 0;\
         *(uint64_t*)(buf_out+25) = 0;\
         buf_out += ENCODE_SIGNING_PUBKEY_NULL_SIZE;\
     }
 
 #define _07_03_ENCODE_SIGNING_PUBKEY_NULL(buf_out )\
     ENCODE_SIGNING_PUBKEY_NULL(buf_out );
 
 
 #define PREPARE_PAYMENT_SIMPLE_SIZE 237
 #define PREPARE_PAYMENT_SIMPLE(buf_out_master, drops_amount_raw, drops_fee_raw, to_address, dest_tag_raw, src_tag_raw)\
     {\
         uint8_t* buf_out = buf_out_master;\
         uint8_t acc[20];\
         uint64_t drops_amount = (drops_amount_raw);\
         uint64_t drops_fee = (drops_fee_raw);\
         uint32_t dest_tag = (dest_tag_raw);\
         uint32_t src_tag = (src_tag_raw);\
         uint32_t cls = (uint32_t)ledger_seq();\
         hook_account(SBUF(acc));\
         _01_02_ENCODE_TT                   (buf_out, ttPAYMENT);      /* uint16  | size   3 */ \
         _02_02_ENCODE_FLAGS                (buf_out, tfCANONICAL);      /* uint32  | size   5 */ \
         _02_03_ENCODE_TAG_SRC              (buf_out, src_tag);      /* uint32  | size   5 */ \
         _02_04_ENCODE_SEQUENCE             (buf_out, 0);      /* uint32  | size   5 */ \
         _02_14_ENCODE_TAG_DST              (buf_out, dest_tag);      /* uint32  | size   5 */ \
         _02_26_ENCODE_FLS                  (buf_out, cls + 1);      /* uint32  | size   6 */ \
         _02_27_ENCODE_LLS                  (buf_out, cls + 5);      /* uint32  | size   6 */ \
         _06_01_ENCODE_DROPS_AMOUNT         (buf_out, drops_amount);      /* amount  | size   9 */ \
         _06_08_ENCODE_DROPS_FEE            (buf_out, drops_fee);      /* amount  | size   9 */ \
         _07_03_ENCODE_SIGNING_PUBKEY_NULL  (buf_out);      /* pk      | size  35 */ \
         _08_01_ENCODE_ACCOUNT_SRC          (buf_out, acc);      /* account | size  22 */ \
         _08_03_ENCODE_ACCOUNT_DST          (buf_out, to_address);      /* account | size  22 */ \
         etxn_details((uint32_t)buf_out, 105);                                               /* emitdet | size 105 */ \
     }
 
 #define PREPARE_PAYMENT_SIMPLE_TRUSTLINE_SIZE 277
 #define PREPARE_PAYMENT_SIMPLE_TRUSTLINE(buf_out_master, tlamt, drops_fee_raw, to_address, dest_tag_raw, src_tag_raw)\
     {\
         uint8_t* buf_out = buf_out_master;\
         uint8_t acc[20];\
         uint64_t drops_fee = (drops_fee_raw);\
         uint32_t dest_tag = (dest_tag_raw);\
         uint32_t src_tag = (src_tag_raw);\
         uint32_t cls = (uint32_t)ledger_seq();\
         hook_account(SBUF(acc));\
         _01_02_ENCODE_TT                   (buf_out, ttPAYMENT                      );      /* uint16  | size   3 */ \
         _02_02_ENCODE_FLAGS                (buf_out, tfCANONICAL                    );      /* uint32  | size   5 */ \
         _02_03_ENCODE_TAG_SRC              (buf_out, src_tag                        );      /* uint32  | size   5 */ \
         _02_04_ENCODE_SEQUENCE             (buf_out, 0                              );      /* uint32  | size   5 */ \
         _02_14_ENCODE_TAG_DST              (buf_out, dest_tag                       );      /* uint32  | size   5 */ \
         _02_26_ENCODE_FLS                  (buf_out, cls + 1                        );      /* uint32  | size   6 */ \
         _02_27_ENCODE_LLS                  (buf_out, cls + 5                        );      /* uint32  | size   6 */ \
         _06_01_ENCODE_TL_AMOUNT            (buf_out, tlamt                          );      /* amount  | size  48 */ \
         _06_08_ENCODE_DROPS_FEE            (buf_out, drops_fee                      );      /* amount  | size   9 */ \
         _07_03_ENCODE_SIGNING_PUBKEY_NULL  (buf_out                                 );      /* pk      | size  35 */ \
         _08_01_ENCODE_ACCOUNT_SRC          (buf_out, acc                            );      /* account | size  22 */ \
         _08_03_ENCODE_ACCOUNT_DST          (buf_out, to_address                     );      /* account | size  22 */ \
         etxn_details((uint32_t)buf_out, 105);                                               /* emitdet | size 105 */ \
     }
 #endif
 `;
return Macro}

ArdublocklyServer.getSfCodesFile = function(){
  const codes =`/**
  * This file contains programmatically generated sf field codes
  */
 #define sfInvalid -1UL
 #define sfGeneric 0UL
 #define sfLedgerEntry 0x27120101UL
 #define sfTransaction 0x27110101UL
 #define sfValidation 0x27130101UL
 #define sfMetadata 0x27140101UL
 #define sfHash 0x50101UL
 #define sfIndex 0x50102UL
 #define sfCloseResolution 0x100001UL
 #define sfMethod 0x100002UL
 #define sfTransactionResult 0x100003UL
 #define sfTickSize 0x100010UL
 #define sfUNLModifyDisabling 0x100011UL
 #define sfLedgerEntryType 0x10001UL
 #define sfTransactionType 0x10002UL
 #define sfSignerWeight 0x10003UL
 #define sfVersion 0x10010UL
 #define sfFlags 0x20002UL
 #define sfSourceTag 0x20003UL
 #define sfSequence 0x20004UL
 #define sfPreviousTxnLgrSeq 0x20005UL
 #define sfLedgerSequence 0x20006UL
 #define sfCloseTime 0x20007UL
 #define sfParentCloseTime 0x20008UL
 #define sfSigningTime 0x20009UL
 #define sfExpiration 0x2000aUL
 #define sfTransferRate 0x2000bUL
 #define sfWalletSize 0x2000cUL
 #define sfOwnerCount 0x2000dUL
 #define sfDestinationTag 0x2000eUL
 #define sfHighQualityIn 0x20010UL
 #define sfHighQualityOut 0x20011UL
 #define sfLowQualityIn 0x20012UL
 #define sfLowQualityOut 0x20013UL
 #define sfQualityIn 0x20014UL
 #define sfQualityOut 0x20015UL
 #define sfStampEscrow 0x20016UL
 #define sfBondAmount 0x20017UL
 #define sfLoadFee 0x20018UL
 #define sfOfferSequence 0x20019UL
 #define sfFirstLedgerSequence 0x2001aUL
 #define sfLastLedgerSequence 0x2001bUL
 #define sfTransactionIndex 0x2001cUL
 #define sfOperationLimit 0x2001dUL
 #define sfReferenceFeeUnits 0x2001eUL
 #define sfReserveBase 0x2001fUL
 #define sfReserveIncrement 0x20020UL
 #define sfSetFlag 0x20021UL
 #define sfClearFlag 0x20022UL
 #define sfSignerQuorum 0x20023UL
 #define sfCancelAfter 0x20024UL
 #define sfFinishAfter 0x20025UL
 #define sfSignerListID 0x20026UL
 #define sfSettleDelay 0x20027UL
 #define sfHookStateCount 0x20028UL
 #define sfHookReserveCount 0x20029UL
 #define sfHookDataMaxSize 0x2002aUL
 #define sfEmitGeneration 0x2002bUL
 #define sfIndexNext 0x30001UL
 #define sfIndexPrevious 0x30002UL
 #define sfBookNode 0x30003UL
 #define sfOwnerNode 0x30004UL
 #define sfBaseFee 0x30005UL
 #define sfExchangeRate 0x30006UL
 #define sfLowNode 0x30007UL
 #define sfHighNode 0x30008UL
 #define sfDestinationNode 0x30009UL
 #define sfCookie 0x3000aUL
 #define sfServerVersion 0x3000bUL
 #define sfEmitBurden 0x3000cUL
 #define sfHookOn 0x30010UL
 #define sfEmailHash 0x40001UL
 #define sfTakerPaysCurrency 0x110001UL
 #define sfTakerPaysIssuer 0x110002UL
 #define sfTakerGetsCurrency 0x110003UL
 #define sfTakerGetsIssuer 0x110004UL
 #define sfLedgerHash 0x50001UL
 #define sfParentHash 0x50002UL
 #define sfTransactionHash 0x50003UL
 #define sfAccountHash 0x50004UL
 #define sfPreviousTxnID 0x50005UL
 #define sfLedgerIndex 0x50006UL
 #define sfWalletLocator 0x50007UL
 #define sfRootIndex 0x50008UL
 #define sfAccountTxnID 0x50009UL
 #define sfEmitParentTxnID 0x5000aUL
 #define sfEmitNonce 0x5000bUL
 #define sfBookDirectory 0x50010UL
 #define sfInvoiceID 0x50011UL
 #define sfNickname 0x50012UL
 #define sfAmendment 0x50013UL
 #define sfTicketID 0x50014UL
 #define sfDigest 0x50015UL
 #define sfPayChannel 0x50016UL
 #define sfConsensusHash 0x50017UL
 #define sfCheckID 0x50018UL
 #define sfValidatedHash 0x50019UL
 #define sfAmount 0x60001UL
 #define sfBalance 0x60002UL
 #define sfLimitAmount 0x60003UL
 #define sfTakerPays 0x60004UL
 #define sfTakerGets 0x60005UL
 #define sfLowLimit 0x60006UL
 #define sfHighLimit 0x60007UL
 #define sfFee 0x60008UL
 #define sfSendMax 0x60009UL
 #define sfDeliverMin 0x6000aUL
 #define sfMinimumOffer 0x60010UL
 #define sfRippleEscrow 0x60011UL
 #define sfDeliveredAmount 0x60012UL
 #define sfPublicKey 0x70001UL
 #define sfMessageKey 0x70002UL
 #define sfSigningPubKey 0x70003UL
 #define sfTxnSignature 0x70004UL
 #define sfSignature 0x70006UL
 #define sfDomain 0x70007UL
 #define sfFundCode 0x70008UL
 #define sfRemoveCode 0x70009UL
 #define sfExpireCode 0x7000aUL
 #define sfCreateCode 0x7000bUL
 #define sfMemoType 0x7000cUL
 #define sfMemoData 0x7000dUL
 #define sfMemoFormat 0x7000eUL
 #define sfFulfillment 0x70010UL
 #define sfCondition 0x70011UL
 #define sfMasterSignature 0x70012UL
 #define sfUNLModifyValidator 0x70013UL
 #define sfNegativeUNLToDisable 0x70014UL
 #define sfNegativeUNLToReEnable 0x70015UL
 #define sfHookData 0x70016UL
 #define sfAccount 0x80001UL
 #define sfOwner 0x80002UL
 #define sfDestination 0x80003UL
 #define sfIssuer 0x80004UL
 #define sfAuthorize 0x80005UL
 #define sfUnauthorize 0x80006UL
 #define sfTarget 0x80007UL
 #define sfRegularKey 0x80008UL
 #define sfPaths 0x120001UL
 #define sfIndexes 0x130001UL
 #define sfHashes 0x130002UL
 #define sfAmendments 0x130003UL
 #define sfTransactionMetaData 0xe0002UL
 #define sfCreatedNode 0xe0003UL
 #define sfDeletedNode 0xe0004UL
 #define sfModifiedNode 0xe0005UL
 #define sfPreviousFields 0xe0006UL
 #define sfFinalFields 0xe0007UL
 #define sfNewFields 0xe0008UL
 #define sfTemplateEntry 0xe0009UL
 #define sfMemo 0xe000aUL
 #define sfSignerEntry 0xe000bUL
 #define sfEmitDetails 0xe000cUL
 #define sfSigner 0xe0010UL
 #define sfMajority 0xe0012UL
 #define sfNegativeUNLEntry 0xe0013UL
 #define sfSigningAccounts  0xf0002UL
 #define sfSigners 0xf0003UL
 #define sfSignerEntries 0xf0004UL
 #define sfTemplate 0xf0005UL
 #define sfNecessary 0xf0006UL
 #define sfSufficient 0xf0007UL
 #define sfAffectedNodes 0xf0008UL
 #define sfMemos 0xf0009UL
 #define sfMajorities 0xf0010UL
 #define sfNegativeUNL 0xf0011UL
 `;
  return codes;
}    