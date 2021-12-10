/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview Blockly2hook JavaScript for the Blockly resources and bindings.
 */
'use strict';

/** Create a namespace for the application. */
var Blockly2hook = Blockly2hook || {};

/**
 * Blockly main workspace.
 * @type Blockly.WorkspaceSvg
 */
Blockly2hook.workspace = null;

/**
 * Blockly workspace toolbox XML.
 * @type Element
 */
Blockly2hook.xmlTree = null;

/**
 * Injects Blockly into a given HTML element. Toolbox XMl has to be a string.
 * @param {!Element} blocklyEl Element to inject Blockly into.
 * @param {!string} toolboxXml String containing the toolbox XML content.
 * @param {!string} blocklyPath String containing the Blockly directory path.
 */
Blockly2hook.injectBlockly = function(blocklyEl, toolboxXml, blocklyPath) {
  // Remove any trailing slashes in the blockly path
  if (blocklyPath.substr(-1) === '/') {
    blocklyPath = blocklyPath.slice(0, -1);
  }
  Blockly2hook.xmlTree = Blockly.Xml.textToDom(toolboxXml);
  // The Toolbox menu language is edited directly from the XML nodes.
  Blockly2hook.updateToolboxLanguage();
  Blockly2hook.workspace = Blockly.inject(blocklyEl, {
      collapse: false,
      comments: true,
      css: true,
      disable: true,
      grid: true,
      maxBlocks: Infinity,
      media: blocklyPath + '/media/',
      rtl: false,
      scrollbars: true,
      sounds: true,
      toolbox: Blockly2hook.xmlTree,
      trashcan: true,
      zoom: {
        controls: true,
        wheel: false,
        startScale: 1.0,
        maxScale: 2,
        minScale: 0.2,
        scaleSpeed: 1.2
      }
  });
  // On language change the blocks have been stored in session storage
  Blockly2hook.loadSessionStorageBlocks();
};

/** Binds the event listeners relevant to Blockly. */
Blockly2hook.bindBlocklyEventListeners = function() {
  Blockly2hook.workspace.addChangeListener(function(event) {
    if (event.type != Blockly.Events.UI) {
      Blockly2hook.renderContent();
    }
  });
  // Ensure the Blockly workspace resizes accordingly
  window.addEventListener('resize',
      function() { Blockly.asyncSvgResize(Blockly2hook.workspace); }, false);
};

/** @return {!string} Generated Hook_Code code from the Blockly workspace. */
Blockly2hook.generateHookCode = function() {
  return Blockly.xrplhook.workspaceToCode(Blockly2hook.workspace);
};

/** @return {!string} Generated XML code from the Blockly workspace. */
Blockly2hook.generateXml = function() {
  var xmlDom = Blockly.Xml.workspaceToDom(Blockly2hook.workspace);
  return Blockly.Xml.domToPrettyText(xmlDom);
  
};

/**
 * Loads an XML file from the server and replaces the current blocks into the
 * Blockly workspace.
 * @param {!string} xmlFile XML file path in a reachable server (no local path).
 * @param {!function} cbSuccess Function to be called once the file is loaded.
 * @param {!function} cbError Function to be called if there is a connection
 *     error to the XML server.
 */
Blockly2hook.loadXmlBlockFile = function(xmlFile, cbSuccess, cbError) {
  var request = Blockly2hook.ajaxRequest();
  var requestCb = function() {
    if (request.readyState == 4) {
      if (request.status == 200) {
        var success = Blockly2hook.replaceBlocksfromXml(request.responseText);
        cbSuccess(success);
      } else {
        cbError();
      }
    }
  };
  try {
    request.open('GET', xmlFile, true);
    request.onreadystatechange = requestCb;
    request.send(null);
  } catch (e) {
    cbError();
  }
};

/**
 * Parses the XML from its argument input to generate and replace the blocks
 * in the Blockly workspace.
 * @param {!string} blocksXml String of XML code for the blocks.
 * @return {!boolean} Indicates if the XML into blocks parse was successful.
 */
Blockly2hook.replaceBlocksfromXml = function(blocksXml) {
  var xmlDom = null;
  try {
    xmlDom = Blockly.Xml.textToDom(blocksXml);
  } catch (e) {
    console.log(e)
    return false;
  }
  Blockly2hook.workspace.clear();
  var sucess = false;
  if (xmlDom) {
    sucess = Blockly2hook.loadBlocksfromXmlDom(xmlDom);
  }
  return sucess;
};

/**
 * Parses the XML from its argument to add the blocks to the workspace.
 * @param {!string} blocksXmlDom String of XML DOM code for the blocks.
 * @return {!boolean} Indicates if the XML into blocks parse was successful.
 */
Blockly2hook.loadBlocksfromXmlDom = function(blocksXmlDom) {
  try {
    Blockly.Xml.domToWorkspace(blocksXmlDom, Blockly2hook.workspace);
  } catch (e) {
    console.log(e)
    return false;
  }
  return true;
};

/**
 * Save blocks into session storage. Note that MSIE 11 does not support
 * sessionStorage on file:// URLs.
 */
Blockly2hook.saveSessionStorageBlocks = function() {
  if (window.sessionStorage) {
    var xml = Blockly.Xml.workspaceToDom(Blockly2hook.workspace);
    var text = Blockly.Xml.domToText(xml);
    window.sessionStorage.loadOnceBlocks = text;
  }
};

/** Load blocks saved on session storage and deletes them from storage. */
Blockly2hook.loadSessionStorageBlocks = function() {
  try {
    var loadOnce = window.sessionStorage.loadOnceBlocks;
  } catch (e) {
    // Firefox sometimes throws a SecurityError when accessing sessionStorage.
    // Restarting Firefox fixes this, so it looks like a bug.
    var loadOnce = null;
  }
  if (loadOnce) {
    delete window.sessionStorage.loadOnceBlocks;
    var xml = Blockly.Xml.textToDom(loadOnce);
    Blockly.Xml.domToWorkspace(xml, Blockly2hook.workspace);
  }
};

/** Discard all blocks from the workspace. */
Blockly2hook.discardAllBlocks = function() {
  var blockCount = Blockly2hook.workspace.getAllBlocks().length;
  if (blockCount == 1) {
    Blockly2hook.workspace.clear();
    Blockly2hook.renderContent();
  } else if (blockCount > 1) {
    Blockly2hook.alertMessage(
        Blockly2hook.getLocalStr('discardBlocksTitle'),
        Blockly2hook.getLocalStr('discardBlocksBody')
            .replace('%1', blockCount),
        true,
        function() {
          Blockly2hook.workspace.clear();
          Blockly2hook.renderContent();
        });
  }
};

/** @return {!boolean} Indicates if the Blockly workspace has blocks. */
Blockly2hook.isWorkspaceEmpty = function() {
  return Blockly2hook.workspace.getAllBlocks().length ? false : true;
};


/** Update the toolbox categories language. */
Blockly2hook.updateToolboxLanguage = function() {
  var categories = ['catLogic', 'catLoops', 'catMath', 'catText',
                    'catVariables', 'catFunctions', 'catComms', 'catLists', 
                    'catHooksControl',"catHooksTool","catMacro"];
  var categoryNodes = Blockly2hook.xmlTree.getElementsByTagName('category');
  for (var i = 0, cat; cat = categoryNodes[i]; i++) {
    var catId = cat.getAttribute('id');
    var catText = Blockly2hook.getLocalStr(catId);
    if (catText) {
      cat.setAttribute('name', catText);
    }
  }
};


/** Closes the toolbox block container sub-menu. */
Blockly2hook.blocklyCloseToolbox = function() {
  Blockly2hook.workspace.toolbox_.flyout_.hide();
};

/** @return {!integer} The width of the blockly workspace toolbox. */
Blockly2hook.blocklyToolboxWidth = function() {
  return Blockly2hook.workspace.toolbox_.width;
};

/** @return {!boolean} Indicates if a block is currently being dragged. */
Blockly2hook.blocklyIsDragging = function() {
  return (Blockly.dragMode_ != 0) ? true : false;
};

/** Wraps the blockly 'cut' functionality. */
Blockly2hook.blocklyCut = function() {
  if (Blockly.selected) {
    Blockly.copy_(Blockly.selected);
    Blockly.selected.dispose(true, true);
  }
};

/** Wraps the blockly 'copy' functionality. */
Blockly2hook.blocklyCopy = function() {
  if (Blockly.selected) {
    Blockly.copy_(Blockly.selected);
  }
};

/** Wraps the blockly 'paste' functionality. */
Blockly2hook.blocklyPaste = function() {
  if (Blockly.clipboardXml_) {
    Blockly.hideChaff();
    Blockly.clipboardSource_.paste(Blockly.clipboardXml_);
  }
};

/** Wraps the blockly 'delete' functionality. */
Blockly2hook.blocklyDelete = function() {
  if (Blockly.selected && Blockly.selected.isDeletable()) {
    Blockly.hideChaff();
    Blockly.selected.dispose(true, true);
  }
};

/** @return {XMLHttpRequest} An XML HTTP Request multi-browser compatible. */
Blockly2hook.ajaxRequest = function() {
  var request;
  try {
    // Firefox, Chrome, IE7+, Opera, Safari
    request = new XMLHttpRequest();
  } catch (e) {
    try {
      // IE6 and earlier
      request = new ActiveXObject('Msxml2.XMLHTTP');
    } catch (e) {
      try {
        request = new ActiveXObject('Microsoft.XMLHTTP');
      } catch (e) {
        throw 'Your browser does not support AJAX';
        request = null;
      }
    }
  }
  return request;
};
