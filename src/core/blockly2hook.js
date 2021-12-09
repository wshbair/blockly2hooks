/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview General javaScript for XRPL Hooks development.
 */
'use strict';

/** Create a namespace for the application. */
var Blockly2hook = Blockly2hook || {};

/** Initialize function for Blockly2hook, to be called on page load. */
Blockly2hook.init = function() {
  // Lang init must run first for the rest of the page to pick the right msgs
  Blockly2hook.initLanguage();

  // Inject Blockly into content_blocks and fetch additional blocks
  Blockly2hook.injectBlockly(document.getElementById('content_blocks'),
                            Blockly2hook.TOOLBOX_XML, '../blockly/');

  Blockly2hook.designJsInit();
  Blockly2hook.initialiseIdeButtons();

  Blockly2hook.bindDesignEventListeners();
  Blockly2hook.bindActionFunctions();
  Blockly2hook.bindBlocklyEventListeners();
};

/** Binds functions to each of the buttons, nav links, and related. */
Blockly2hook.bindActionFunctions = function() {
  // Navigation buttons
  Blockly2hook.bindClick_('button_load', Blockly2hook.loadUserXmlFile);
  Blockly2hook.bindClick_('button_save', Blockly2hook.saveXmlFile);
  Blockly2hook.bindClick_('button_delete', Blockly2hook.discardAllBlocks);
  Blockly2hook.bindClick_('button_catalog', Blockly2hook.openHookCatalogModal);


  // Side menu buttons, they also close the side menu
  Blockly2hook.bindClick_('menu_load', function() {
    Blockly2hook.loadUserXmlFile();
    $('.button-collapse').sideNav('hide');
  });
  Blockly2hook.bindClick_('menu_save', function() {
    Blockly2hook.saveXmlFile();
    $('.button-collapse').sideNav('hide');
  });
  Blockly2hook.bindClick_('menu_delete', function() {
    Blockly2hook.discardAllBlocks();
    $('.button-collapse').sideNav('hide');
  });
   

  Blockly2hook.bindClick_('button_loaddoublehook', function() {
    Blockly2hook.loadServerXmlFile('./catalog/doubler.xml');
    $('.button-collapse').sideNav('hide');
  });

  Blockly2hook.bindClick_('button_loadcarbonhook', function() {
    Blockly2hook.loadServerXmlFile('./catalog/carbon.xml');
    $('.button-collapse').sideNav('hide');
  });

  Blockly2hook.bindClick_('button_loadaccepthook', function() {
    Blockly2hook.loadServerXmlFile('./catalog/accept.xml');
    $('.button-collapse').sideNav('hide');
  });

  Blockly2hook.bindClick_('menu_button_loaddoublehook', function() {
    Blockly2hook.loadServerXmlFile('./catalog/doubler.xml');
    $('.button-collapse').sideNav('hide');
  });

  Blockly2hook.bindClick_('menu_button_loadcarbonhook', function() {
    Blockly2hook.loadServerXmlFile('./catalog/carbon.xml');
    $('.button-collapse').sideNav('hide');
  });

  Blockly2hook.bindClick_('menu_button_loadaccepthook', function() {
    Blockly2hook.loadServerXmlFile('./catalog/accept.xml');
    $('.button-collapse').sideNav('hide');
  });

  Blockly2hook.bindClick_('setHook_transaction', function() {
    Blockly2hook.deployHooKtoTestnet();
    });

  Blockly2hook.bindClick_('signSetHookTxbtn', function() {
    Blockly2hook.signPublishSetHookTx();
    });
  
  Blockly2hook.bindClick_('button_ide_large', function() {
    Blockly2hook.ideButtonLargeAction();
  });

  Blockly2hook.bindClick_('button_load_xml', Blockly2hook.XmlTextareaToBlocks);
  Blockly2hook.bindClick_('button_toggle_toolbox', Blockly2hook.toogleToolbox);

 /*  // Settings modal input field listeners only if they can be edited
  var settingsPathInputListeners = function(elId, setValFunc, setHtmlCallback) {
    var el = document.getElementById(elId);
    if (el.readOnly === false) {
      // Event listener that send the data when the user presses 'Enter'
      el.onkeypress = function(e) {
        if (!e) e = window.event;
        var keyCode = e.keyCode || e.which;
        if (keyCode == '13') {
          setValFunc(el.value, function(jsonObj) {
            setHtmlCallback(Blockly2hookServer.jsonToHtmlTextInput(jsonObj));
          });
          return false;
        }
      };
      // Event listener that send the data when moving out of the input field
      el.onblur = function() {
        setValFunc(el.value, function(jsonObj) {
          setHtmlCallback(Blockly2hookServer.jsonToHtmlTextInput(jsonObj));
        });
      };
    }
  };
  settingsPathInputListeners('settings_compiler_location',
                             Blockly2hookServer.setCompilerLocation,
                             Blockly2hook.setCompilerLocationHtml);
  settingsPathInputListeners('settings_sketch_location',
                             Blockly2hookServer.setSketchLocationHtml,
                             Blockly2hook.setSketchLocationHtml);
                             */
}; 

/** Sets the Blockly2hook server IDE setting to upload and sends the code. */
Blockly2hook.ideSendUpload = function() {
  // Check if this is the currently selected option before edit sever setting
  if (Blockly2hook.ideButtonLargeAction !== Blockly2hook.ideSendUpload) {
    Blockly2hook.setIdeSettings(null, 'upload');
    
  }
  Blockly2hook.shortMessage(Blockly2hook.getLocalStr('uploadingSketch'));
  Blockly2hook.resetIdeOutputContent();
  Blockly2hook.sendCode();
};

/** Sets the Blockly2hook server IDE setting to verify and sends the code. */
Blockly2hook.ideSendVerify = function() {
  // Check if this is the currently selected option before edit sever setting
  if (Blockly2hook.ideButtonLargeAction !== Blockly2hook.ideSendVerify) {
    Blockly2hook.setIdeSettings(null, 'verify');
  }
  Blockly2hook.shortMessage(Blockly2hook.getLocalStr('verifyingSketch'));
  Blockly2hook.resetIdeOutputContent();
  Blockly2hook.sendCode();
  Blockly2hook.contentHeightToggle()
  var outputHeader = document.getElementById('ide_output_collapsible_header');
  outputHeader.classList.add('active')
  document.getElementById("wazen").setAttribute("style", "display: block; padding-top: 0px; margin-top: 0px; padding-bottom: 0px; margin-bottom: 0px;")
};

/** Deploy the WASM binary hook to Ripple Legder */
Blockly2hook.deployHooKtoTestnet = function() {
  var deployWasmCode = function(result) {
    document.getElementById("sethooktxjson").value = result
  };
  // get the wasm binary form from the interface. 
  var binayrWasm = document.getElementById('wasmoutput').innerText;
  var xrplWalletAddress= document.getElementById("xrpl_wallet_address").value
  // call hookdeply via Ajax request to the paython server
  Blockly2hookServer.hookDeploy(binayrWasm,xrplWalletAddress, deployWasmCode);
};

/** Sign and publish SetHook transaction */
Blockly2hook.signPublishSetHookTx = function(){
  var sethookvalue = document.getElementById("sethooktxjson").value
  var deploymentResponse = function(result){
    document.getElementById("deploymentResult").value = result;
  }
 Blockly2hookServer.publishHook(sethookvalue,deploymentResponse);
}

Blockly2hook.runAcceptTesting = function(){
  document.getElementById("deploymentResult").value = "";

  var deploymentResponse = function(result){
    document.getElementById("deploymentResult").value = result;
  }
  Blockly2hookServer.runAcceptTest(deploymentResponse)
}

/** Sets the Blockly2hook server IDE setting to open and sends the code. */
Blockly2hook.ideSendOpen = function() {
  // Check if this is the currently selected option before edit sever setting
  if (Blockly2hook.ideButtonLargeAction !== Blockly2hook.ideSendOpen) {
   // Blockly2hook.showExtraIdeButtons(false);
    Blockly2hook.setIdeSettings(null, 'open');
  }
  Blockly2hook.shortMessage(Blockly2hook.getLocalStr('openingSketch'));
  Blockly2hook.resetIdeOutputContent();
  Blockly2hook.sendCode();
};

 

/** Function bound to the middle IDE button, to be changed based on settings. */
Blockly2hook.ideButtonMiddleAction =  Blockly2hook.ideSendVerify;

/** Function bound to the large IDE button, to be changed based on settings. */
Blockly2hook.ideButtonLeftAction = Blockly2hook.ideSendOpen;

/** Initialises the IDE buttons with the default option from the server. */
Blockly2hook.initialiseIdeButtons = function() {
  document.getElementById('button_ide_large').title =
      Blockly2hook.getLocalStr('uploadSketch');
      Blockly2hook.changeIdeButtons("verify");
};

/**
 * Changes the IDE launch buttons based on the option indicated in the argument.
 * @param {!string} value One of the 3 possible values from the drop down select
 *     in the settings modal: 'upload', 'verify', or 'open'.
 */
Blockly2hook.changeIdeButtons = function(value) {
  var largeButton = document.getElementById('button_ide_large');
  var deployButton = document.getElementById('button_deploy');
  deployButton.title = "Deploy the Hook"
  var verifyTitle = Blockly2hook.getLocalStr('verifySketch');  
  Blockly2hook.changeIdeButtonsDesign(value);
  Blockly2hook.ideButtonLargeAction = Blockly2hook.ideSendVerify;
  largeButton.title = verifyTitle;
};

/**
 * Loads an XML file from the server and replaces the current blocks into the
 * Blockly workspace.
 * @param {!string} xmlFile Server location of the XML file to load.
 */
Blockly2hook.loadServerXmlFile = function(xmlFile) {
  var loadXmlfileAccepted = function() {
    // loadXmlBlockFile loads the file asynchronously and needs a callback
    var loadXmlCb = function(sucess) {
      if (sucess) {
        Blockly2hook.renderContent();
      } else {
        Blockly2hook.alertMessage(
            Blockly2hook.getLocalStr('invalidXmlTitle'),
            Blockly2hook.getLocalStr('invalidXmlBody'),
            false);
      }
    };
    var connectionErrorCb = function() {
      Blockly2hook.openNotConnectedModal();
    };
    Blockly2hook.loadXmlBlockFile(xmlFile, loadXmlCb, connectionErrorCb);
  };

  if (Blockly2hook.isWorkspaceEmpty()) {
    loadXmlfileAccepted();
  } else {
    Blockly2hook.alertMessage(
        Blockly2hook.getLocalStr('loadNewBlocksTitle'),
        Blockly2hook.getLocalStr('loadNewBlocksBody'),
        true, loadXmlfileAccepted);
  }
};

/**
 * Loads an XML file from the users file system and adds the blocks into the
 * Blockly workspace.
 */
Blockly2hook.loadUserXmlFile = function() {
  // Create File Reader event listener function
  var parseInputXMLfile = function(e) {
    var xmlFile = e.target.files[0];
    var filename = xmlFile.name;
    var extensionPosition = filename.lastIndexOf('.');
    if (extensionPosition !== -1) {
      filename = filename.substr(0, extensionPosition);
    }

    var reader = new FileReader();
    reader.onload = function() {
      var success = Blockly2hook.replaceBlocksfromXml(reader.result);
      console.log(success)
      if (success) {
        Blockly2hook.renderContent();
        Blockly2hook.sketchNameSet(filename);
      } else {
        Blockly2hook.alertMessage(
            Blockly2hook.getLocalStr('invalidXmlTitle'),
            Blockly2hook.getLocalStr('invalidXmlBody'),
            false);
      }
    };
    reader.readAsText(xmlFile);
  };

  // Create once invisible browse button with event listener, and click it
  var selectFile = document.getElementById('select_file');
  if (selectFile === null) {
    var selectFileDom = document.createElement('INPUT');
    selectFileDom.type = 'file';
    selectFileDom.id = 'select_file';

    var selectFileWrapperDom = document.createElement('DIV');
    selectFileWrapperDom.id = 'select_file_wrapper';
    selectFileWrapperDom.style.display = 'none';
    selectFileWrapperDom.appendChild(selectFileDom);

    document.body.appendChild(selectFileWrapperDom);
    selectFile = document.getElementById('select_file');
    selectFile.addEventListener('change', parseInputXMLfile, false);
  }
  selectFile.click();
};

/**
 * Creates an XML file containing the blocks from the Blockly workspace and
 * prompts the users to save it into their local file system.
 */
Blockly2hook.saveXmlFile = function() {
  Blockly2hook.saveTextFileAs(
      document.getElementById('sketch_name').value + '.xml',
      Blockly2hook.generateXml());
};

/**
 * Creates an Arduino Sketch file containing the Arduino code generated from
 * the Blockly workspace and prompts the users to save it into their local file
 * system.
 */
Blockly2hook.saveSketchFile = function() {
  Blockly2hook.saveTextFileAs(
      document.getElementById('sketch_name').value + '.c',
      Blockly2hook.generateHookCode());
};

/**
 * Creates an text file with the input content and files name, and prompts the
 * users to save it into their local file system.
 * @param {!string} fileName Name for the file to be saved.
 * @param {!string} content Text datd to be saved in to the file.
 */
Blockly2hook.saveTextFileAs = function(fileName, content) {
  var blob = new Blob([content], {type: 'text/plain;charset=utf-8'});
  saveAs(blob, fileName);
};

/**
 * Retrieves the Settings from Blockly2hookServer to populates the form data
 * and opens the Settings modal dialog.
 */
Blockly2hook.openSettings = function() {
  Blockly2hookServer.requestCompilerLocation(function(jsonObj) {
    Blockly2hook.setCompilerLocationHtml(
        Blockly2hookServer.jsonToHtmlTextInput(jsonObj));
  });
  Blockly2hookServer.requestSketchLocation(function(jsonObj) {
    Blockly2hook.setSketchLocationHtml(
        Blockly2hookServer.jsonToHtmlTextInput(jsonObj));
  });
  Blockly2hookServer.requestIdeOptions(function(jsonObj) {
    Blockly2hook.setIdeHtml(Blockly2hookServer.jsonToHtmlDropdown(jsonObj));
  });
  // Language menu only set on page load within Blockly2hook.initLanguage()
  Blockly2hook.openSettingsModal();
};

/**
 * Sets the compiler location form data retrieve from an updated element.
 * @param {element} jsonResponse JSON data coming back from the server.
 * @return {undefined} Might exit early if response is null.
 */
Blockly2hook.setCompilerLocationHtml = function(newEl) {
  if (newEl === null) return Blockly2hook.openNotConnectedModal();

  var compLocIp = document.getElementById('settings_compiler_location');
  if (compLocIp != null) {
    compLocIp.value = newEl.value || compLocIp.value ||
        'Please enter the location of the Arduino IDE executable';
    compLocIp.style.cssText = newEl.style.cssText;
  }
};

/**
 * Sets the sketch location form data retrieve from an updated element.
 * @param {element} jsonResponse JSON data coming back from the server.
 * @return {undefined} Might exit early if response is null.
 */
Blockly2hook.setSketchLocationHtml = function(newEl) {
  if (newEl === null) return Blockly2hook.openNotConnectedModal();

  var sketchLocIp = document.getElementById('settings_sketch_location');
  if (sketchLocIp != null) {
    sketchLocIp.value = newEl.value || sketchLocIp.value ||
        'Please enter a folder to store the Arduino Sketch';
    sketchLocIp.style.cssText = newEl.style.cssText;
  }
};




/**
 * Replaces IDE options form data with a new HTMl element.
 * Ensures there is a change listener to call 'setIdeSettings' function
 * @param {element} jsonResponse JSON data coming back from the server.
 * @return {undefined} Might exit early if response is null.
 */
Blockly2hook.setIdeHtml = function(newEl) {
  if (newEl === null) return Blockly2hook.openNotConnectedModal();

  var ideDropdown = document.getElementById('ide_settings');
  if (ideDropdown !== null) {
    // Restarting the select elements built by materialize
    $('select').material_select('destroy');
    newEl.name = 'settings_ide';
    newEl.id = 'ide_settings';
    newEl.onchange = Blockly2hook.setIdeSettings;
    ideDropdown.parentNode.replaceChild(newEl, ideDropdown);
    // Refresh the materialize select menus
    $('select').material_select();
  }
};

/**
 * Sets the IDE settings data with the selected user input from the drop down.
 * @param {Event} e Event that triggered this function call. Required for link
 *     it to the listeners, but not used.
 * @param {string} preset A value to set the IDE settings bypassing the drop
 *     down selected value. Valid data: 'upload', 'verify', or 'open'.
 */
Blockly2hook.setIdeSettings = function(e, preset) {
  if (preset !== undefined) {
    var ideValue = preset;
  } else {
    var el = document.getElementById('ide_settings');
    var ideValue = el.options[el.selectedIndex].value;
  }
  Blockly2hook.changeIdeButtons(ideValue);
  Blockly2hookServer.setIdeOptions(ideValue, function(jsonObj) {
    Blockly2hook.setIdeHtml(Blockly2hookServer.jsonToHtmlDropdown(jsonObj));
  });
};

/**
 * Send the Hook Code to the Blockly2hookServer to process.
 * Shows a loader around the button, blocking it (unblocked upon received
 * message from server).
 */
Blockly2hook.sendCode = function() {
  Blockly2hook.largeIdeButtonSpinner(true);
  document.getElementById("button_deploy").classList.add("disabled")

  /**
   * Receives the IDE data back to be displayed and stops spinner.
   * @param {element} jsonResponse JSON data coming back from the server.
   * @return {undefined} Might exit early if response is null.
   */
  var sendCodeReturn = function(jsonObj, error) {
    Blockly2hook.largeIdeButtonSpinner(false);
    Blockly2hook.arduinoIdeOutput(jsonObj);
    if(!error)
    {
      document.getElementById("button_deploy").classList.remove("disabled")
      Blockly2hook.changeIdeButtonsDesign("pass")
    }
    else
      Blockly2hook.changeIdeButtonsDesign("fail")


  };

  Blockly2hookServer.sendHookToCompile(
      Blockly2hook.generateHookCode(), sendCodeReturn);
};

/** Populate the workspace blocks with the XML written in the XML text area. */
Blockly2hook.XmlTextareaToBlocks = function() {
  var success = Blockly2hook.replaceBlocksfromXml(
      document.getElementById('content_xml').value);
  if (success) {
    Blockly2hook.renderContent();
  } else {
    Blockly2hook.alertMessage(
        Blockly2hook.getLocalStr('invalidXmlTitle'),
        Blockly2hook.getLocalStr('invalidXmlBody'),
        false);
  }
};

/**
 * Private variable to save the previous version of the Hook Code.
 * @type {!String}
 * @private
 */
Blockly2hook.PREV_ARDUINO_CODE_ = 'int64_t cbak(int64_t reserved) {\n\n return 0;}\n\n\n int64_t hook(int64_t reserved) {\n\n return 0;}';

/**
 * Populate the Hook Code and Blocks XML panels with content generated from
 * the blocks.
 */
Blockly2hook.renderContent = function() {
  // Render Hook Code with latest change highlight and syntax highlighting
  var hookCode = Blockly2hook.generateHookCode();
  if (hookCode !== Blockly2hook.PREV_ARDUINO_CODE_) {
    var diff = JsDiff.diffWords(Blockly2hook.PREV_ARDUINO_CODE_, hookCode);
    var resultStringArray = [];
    for (var i = 0; i < diff.length; i++) {
      if (!diff[i].removed) {
        var escapedCode = diff[i].value.replace(/</g, '&lt;')
                                       .replace(/>/g, '&gt;');
        if (diff[i].added) {
          resultStringArray.push(
              '<span class="code_highlight_new">' + escapedCode + '</span>');
        } else {
          resultStringArray.push(escapedCode);
        }
      }
    }
    document.getElementById('content_hook').innerHTML =
        prettyPrintOne(resultStringArray.join(''), 'cpp', false);
        
    Blockly2hook.PREV_ARDUINO_CODE_ = hookCode;
  }

  // Generate plain XML into element
  document.getElementById('content_xml').value = Blockly2hook.generateXml();
};

/**
 * Private variable to indicate if the toolbox is meant to be shown.
 * @type {!boolean}
 * @private
 */
Blockly2hook.TOOLBAR_SHOWING_ = true;

/**
 * Toggles the blockly toolbox and the Blockly2hook toolbox button On and Off.
 * Uses namespace member variable TOOLBAR_SHOWING_ to toggle state.
 */
Blockly2hook.toogleToolbox = function() {
  if (Blockly2hook.TOOLBAR_SHOWING_) {
    Blockly2hook.blocklyCloseToolbox();
    Blockly2hook.displayToolbox(false);
  } else {
    Blockly2hook.displayToolbox(true);
  }
  Blockly2hook.TOOLBAR_SHOWING_ = !Blockly2hook.TOOLBAR_SHOWING_;
};

/** @return {boolean} Indicates if the toolbox is currently visible. */
Blockly2hook.isToolboxVisible = function() {
  return Blockly2hook.TOOLBAR_SHOWING_;
};


/** Informs the user that the selected function is not yet implemented. */
Blockly2hook.functionNotImplemented = function() {
  Blockly2hook.shortMessage('Function not yet implemented');
};

/**
 * Interface to display messages with a possible action.
 * @param {!string} title HTML to include in title.
 * @param {!element} body HTML to include in body.
 * @param {boolean=} confirm Indicates if the user is shown a single option (ok)
 *     or an option to cancel, with an action applied to the "ok".
 * @param {string=|function=} callback If confirm option is selected this would
 *     be the function called when clicked 'OK'.
 */
Blockly2hook.alertMessage = function(title, body, confirm, callback) {
  Blockly2hook.materialAlert(title, body, confirm, callback);
};

/**
 * Interface to displays a short message, which disappears after a time out.
 * @param {!string} message Text to be temporarily displayed.
 */
Blockly2hook.shortMessage = function(message) {
  Blockly2hook.MaterialToast(message);
};

/**
 * Bind a function to a button's click event.
 * On touch enabled browsers, ontouchend is treated as equivalent to onclick.
 * @param {!Element|string} el Button element or ID thereof.
 * @param {!function} func Event handler to bind.
 * @private
 */
Blockly2hook.bindClick_ = function(el, func) {
  if (typeof el == 'string') {
    el = document.getElementById(el);
  }
  // Need to ensure both, touch and click, events don't fire for the same thing
  var propagateOnce = function(e) {
    e.stopPropagation();
    e.preventDefault();
    func();
  };
  el.addEventListener('ontouchend', propagateOnce);
  el.addEventListener('click', propagateOnce);
};

