/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview JavaScript to configure front end design for Blockly2hook app.
 */
'use strict';

/** Create a namespace for the application. */
var Blockly2hook = Blockly2hook || {};

/** Initialises all the design related JavaScript. */
Blockly2hook.designJsInit = function() {
  Blockly2hook.materializeJsInit();
  Blockly2hook.resizeToggleToolboxBotton();
  Blockly2hook.sketchNameSizeEffect();
  Blockly2hook.sketchNameSet();
};

/**
 * Initialises all required components from materialize framework.
 * The be executed on document ready.
 */
Blockly2hook.materializeJsInit = function() {
  // Navigation bar
  $('.button-collapse').sideNav({
      menuWidth: 240,
      activationWidth: 70,
      edge: 'left'
  });
  // Drop down menus
  $('.dropdown-button').dropdown({hover: false});
  // Overlay content panels using modals (android dialogs)
  $('.modal-trigger').leanModal({
      dismissible: true,
      opacity: .5,
      in_duration: 200,
      out_duration: 250
   });
  // Pop-up tool tips
  $('.tooltipped').tooltip({'delay': 50});
  // Select menus
  $('select').material_select();
};

/** Binds the event listeners relevant to the page design. */
Blockly2hook.bindDesignEventListeners = function() {
  // Resize blockly workspace on window resize
  window.addEventListener(
      'resize', Blockly2hook.resizeBlocklyWorkspace, false);
  // Display/hide the XML load button when the XML collapsible header is clicked
  document.getElementById('xml_collapsible_header').addEventListener(
      'click', Blockly2hook.buttonLoadXmlCodeDisplay);
  // Toggle the content height on click to the IDE output collapsible header
  document.getElementById('ide_output_collapsible_header').addEventListener(
      'click', function() {
        Blockly2hook.contentHeightToggle();
      });
  // Display/hide the additional IDE buttons when mouse over/out of play button
  // $('#button_ide_large').mouseenter(function() {
  //     Blockly2hook.showExtraIdeButtons(true);
  // });
  // $('#ide_buttons_wrapper').mouseleave(function() {
  //     Blockly2hook.showExtraIdeButtons(false);
  // });
};

/**
 * Displays or hides the 'load textarea xml' button based on the state of the
 * collapsible 'xml_collapsible_body'.
 */
Blockly2hook.buttonLoadXmlCodeDisplay = function() {
  var xmlCollapsibleBody = document.getElementById('xml_collapsible_body');
  // Waiting 400 ms to check status due to the animation delay (300 ms)
  setTimeout(function() {
    if (xmlCollapsibleBody.style.display == 'none') {
      $('#button_load_xml').hide();
    } else {
      $('#button_load_xml').fadeIn('slow');
    }
  }, 400);
};

/**
 * Changes the IDE launch buttons based on the option indicated in the argument.
 * @param {!string} value One of the 3 possible values from the drop down select
 *     in the settings modal: 'upload', 'verify', or 'open'.
 */
Blockly2hook.changeIdeButtonsDesign = function(value) {

  var buttonLarge = document.getElementById('button_ide_large');
  var iconLarge = document.getElementById('button_ide_large_icon');

  if (value === 'upload') {
    buttonLarge.className =
        buttonLarge.className.replace(/block2hook_\S+/, 'block2hook_orange');
    iconLarge.className = 'mdi-av-play-arrow';
  } else if (value === 'verify') {
    buttonLarge.className =
        buttonLarge.className.replace(/block2hook_\S+/, 'block2hook_blue');
    iconLarge.className = 'mdi-navigation-check';
  }
  else if(value == "fail"){
    buttonLarge.className =
        buttonLarge.className.replace(/block2hook_\S+/, 'block2hook_red');
    iconLarge.className = 'mdi-content-clear';
  }
  else if(value == "pass"){
    buttonLarge.className =
        buttonLarge.className.replace(/block2hook_\S+/, 'block2hook_orange');
    iconLarge.className = 'mdi-action-thumb-up';
  }
};

/**
 * Shows or hides the spinner around the large IDE button.
 * @param {!boolean} active True turns ON the spinner, false OFF.
 */
Blockly2hook.largeIdeButtonSpinner = function(active) {
  var spinner = document.getElementById('button_ide_large_spinner');
  var buttonIdeLarge = document.getElementById('button_ide_large');
  var buttonClass = buttonIdeLarge.className;
  if (active) {
    spinner.style.display = 'block';
    buttonIdeLarge.className = buttonIdeLarge.className + ' grey';
  } else {
    spinner.style.display = 'none';
    buttonIdeLarge.className = buttonClass.replace(' grey', '');
 }
};

/**
 * Sets the toolbox HTML element to be display or not and change the visibility
 * button to reflect the new state.
 * When the toolbox is visible it should display the "visibility-off" icon with
 * no background, and the opposite when toolbox is hidden.
 * @param {!boolean} show Indicates if the toolbox should be set visible.
 */
Blockly2hook.displayToolbox = function(show) {
  var toolbox = $('.blocklyToolboxDiv');
  var toolboxTree = $('.blocklyTreeRoot');
  var button = document.getElementById('button_toggle_toolbox');
  var buttonIcon = document.getElementById('button_toggle_toolbox_icon');

  // Because firing multiple clicks can confuse the animation, create an overlay
  // element to stop clicks (due to the materialize framework controlling the
  // event listeners is better to do it this way for easy framework update).
  var elLocation = $('#button_toggle_toolbox').offset();
  jQuery('<div/>', {
      id: 'toolboxButtonScreen',
      css: {
        position: 'fixed',
        top: elLocation.top,
        left: elLocation.left,
        height: $('#button_toggle_toolbox').height(),
        width: $('#button_toggle_toolbox').width(),
        cursor: 'pointer',
        zIndex: 12
      },
  }).appendTo('body');

  var classOn = 'button_toggle_toolbox_on';
  var classOff = 'button_toggle_toolbox_off';
  var visOn = 'mdi-action-visibility';
  var visOff = 'mdi-action-visibility-off';
  if (show) {
    toolbox.show();
    button.className = button.className.replace(classOn, classOff);
    buttonIcon.className = buttonIcon.className.replace(visOn, visOff);
    toolbox.animate(
        {height: document.getElementById('content_blocks').style.height}, 300,
        function() {
          toolboxTree.css('overflow-y', 'auto');
          window.dispatchEvent(new Event('resize'));
          $('#toolboxButtonScreen').remove();
        });
  } else {
    toolboxTree.css('overflow-y', 'hidden');
    buttonIcon.className = buttonIcon.className.replace(visOff, visOn);
    toolbox.animate({height: 38}, 300, function() {
      button.className = button.className.replace(classOff, classOn);
      toolbox.fadeOut(350, 'linear', function() {
        window.dispatchEvent(new Event('resize'));
        setTimeout(function() { toolbox.height(38); }, 100);
        $('#toolboxButtonScreen').remove();
      });
    });
  }
};

/**
 * Resizes the button to toggle the toolbox visibility to the width of the
 * toolbox.
 * The toolbox width does not change with workspace width, so safe to do once.
 */
Blockly2hook.resizeToggleToolboxBotton = function() {
  window.dispatchEvent(new Event('resize'));
  var button = $('#button_toggle_toolbox');
  // Sets the toolbox toggle button width to that of the toolbox
  if (Blockly2hook.isToolboxVisible() && Blockly2hook.blocklyToolboxWidth()) {
    // For some reason normal set style and getElementById didn't work
    button.width(Blockly2hook.blocklyToolboxWidth());
    button[0].style.display = '';
  }
};

/** Resizes the container for the Blockly workspace. */
Blockly2hook.resizeBlocklyWorkspace = function() {
  var contentBlocks = document.getElementById('content_blocks');
  var wrapperPanelSize =
      Blockly2hook.getBBox_(document.getElementById('blocks_panel'));

  contentBlocks.style.top = wrapperPanelSize.y + 'px';
  contentBlocks.style.left = wrapperPanelSize.x + 'px';
  // Height and width need to be set, read back, then set again to
  // compensate for scrollbars.
  contentBlocks.style.height = wrapperPanelSize.height + 'px';
  contentBlocks.style.height =
      (2 * wrapperPanelSize.height - contentBlocks.offsetHeight) + 'px';
  contentBlocks.style.width = wrapperPanelSize.width + 'px';
  contentBlocks.style.width =
      (2 * wrapperPanelSize.width - contentBlocks.offsetWidth) + 'px';
};

/**
 * Sets the text for a "Materialize Modal" (like an android Dialog) to have
 * alert-like HTML messages.
 * @param {!string} title HTML to include in title.
 * @param {!element} body HTML to include in body.
 * @param {boolean=} confirm Indicates if the user is shown and option to just
 *     'Ok' or 'Ok and cancel'.
 * @param {string=|function=} callback If confirm option is selected this would
 *     be the function called when clicked 'OK'.
 */
Blockly2hook.materialAlert = function(title, body, confirm, callback) {
  $('#gen_alert_title').text(title);
  $('#gen_alert_body').text('');
  $('#gen_alert_body').append(body);
  if (confirm == true) {
    $('#gen_alert_cancel_link').css({'display': 'block'});
    if (callback) {
      $('#gen_alert_ok_link').bind('click', callback);
    }
  } else {
    $('#gen_alert_cancel_link').css({'display': 'none'});
    $('#gen_alert_ok_link').unbind('click');
  }
  $('#gen_alert').openModal();
  window.location.hash = '';
};

/** Opens the modal that displays the "not connected to server" message. */
Blockly2hook.openNotConnectedModal = function() {
  $('#not_running_dialog').openModal({
    dismissible: true,
    opacity: .5,
    in_duration: 200,
    out_duration: 250
  });
};

/** Opens the modal that displays the Settings. */
Blockly2hook.openSettingsModal = function() {
  $('#settings_dialog').openModal({
    dismissible: true,
    opacity: .5,
    in_duration: 200,
    out_duration: 250
  });
};

/** Opens the modal that displays the deploy. */
Blockly2hook.openDeployModal = function() {
  $('#deploy_dialog').openModal({
    dismissible: true,
    opacity: .5,
    in_duration: 200,
    out_duration: 250
  });
  $('#deploymentResult').val('')
};

/** Opens the modal that displays the hook catalog. */
Blockly2hook.openHookCatalogModal = function() {
  $('#hookcatalog_dialog').openModal({
    dismissible: true,
    opacity: .5,
    in_duration: 200,
    out_duration: 250
  });
};




/**
 * Displays a short message for 4 seconds in the form of a Materialize toast.
 * @param {!string} message Text to be temporarily displayed.
 */
Blockly2hook.MaterialToast = function(message) {
  Materialize.toast(message, 4000);
};

/**
 * Populates the xrplhook IDE output content area and triggers the visual
 * highlight to call for the user attention.
 * @param {!element} bodyEl HTML to include into IDE output content area.
 */
Blockly2hook.xrplhookIdeOutput = function(bodyEl) {
  var ideOuputContent = document.getElementById('content_ide_output');
  ideOuputContent.innerHTML = bodyEl;
  
  var inputString = encodeURIComponent(bodyEl).replace('%20', '+');
  var actionString = "wast2wasm";
  var command = "input=" + inputString + "&action=" + actionString
  var xhr = new XMLHttpRequest();
  xhr.addEventListener("load", function () {
    var wasm = this.responseText;
    document.getElementById('wasmoutput').innerHTML = wasm.split('\n')[1];
    var downloadlink = document.getElementById('downloadLink')
    downloadlink.href = "data:;base64," + wasm.split('\n')[1];
    downloadlink.download = document.getElementById('sketch_name').value+".wasm"

    //Attach the action to deploy button and clean Model feilds
    document.getElementById("sethooktxjson").value=""
    document.getElementById("deploymentResult").value=""
    //document.getElementById("button_deploy").classList.remove("disabled")
    
    Blockly2hook.bindClick_('button_deploy', function() {
      Blockly2hook.openDeployModal();
       });
  });  
  xhr.open("POST", "https://wasmexplorer-service.herokuapp.com/" + "service.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
  xhr.send(command);
  xhr.onerror = function (error) {
    console.log(error)
  };
};

/**
 * Clears the content of the Hook IDE output element to a default text.
 * @param {!element} bodyEl HTML to include into IDE output content area.
 */
Blockly2hook.resetIdeOutputContent = function(bodyEl) {
  var ideOuputContent = document.getElementById('content_ide_output');
  ideOuputContent.innerHTML = '<span class="xrplhook_dialog_out">' +
      Blockly2hook.getLocalStr('xrplhookOpWaiting') + '</span>';
};

/**
 * Initialises the sketch name input text JavaScript to dynamically adjust its
 * width to the width of its contents.
 */
Blockly2hook.sketchNameSizeEffect = function() {
  var resizeInput = function() {
    $(this).attr('size', $(this).val().length);
  };

  var correctInput = function() {
    // If nothing in the input, add default name
    if ($(this).val() == '') {
      $(this).val('Hook_Name');
      $(this).attr('size', 10);
    }
    // Replace all spaces with underscores
    $(this).val($(this).val().replace(/ /g, '_'));
  };

  var sketchNameInput = $('#sketch_name');
  sketchNameInput.keydown(resizeInput).each(resizeInput);
  sketchNameInput.blur(correctInput);
};

/**
 * Sets a string to the SketchName input field and triggers the events set from
 * Blockly2hook.sketchNameSizeEffect().
 * @param {string?} newName Optional string to place in the sketch_name input.
 */
Blockly2hook.sketchNameSet = function(newName) {
  var sketchNewName = newName || '';
  var sketchNameInput = $('#sketch_name');
  sketchNameInput.val(sketchNewName);
  sketchNameInput.attr('size', sketchNewName.length);
  sketchNameInput.keydown();
  sketchNameInput.blur();
};

/** Creates a highlight animation to the xrplhook IDE output header. */
Blockly2hook.highlightIdeOutputHeader = function() {
  var header = document.getElementById('ide_output_collapsible_header');
  var h = 'ide_output_header_highlight';
  var n = 'ide_output_header_normal';
  header.className = header.className.replace(/ide_output_header_\S+/, h);
  setTimeout(function() {
    header.className = header.className.replace(/ide_output_header_\S+/, n);
    setTimeout(function() {
      header.className = header.className.replace(/ide_output_header_\S+/, h);
      setTimeout(function() {
        header.className = header.className.replace(/ide_output_header_\S+/, n);
      }, 500);
    }, 500);
  }, 500);
};

/**
 * Controls the height of the block and collapsible content between 2 states
 * using CSS classes.
 * It's state is dependent on the state of the IDE output collapsible. The
 * collapsible functionality from Materialize framework adds the active class,
 * so this class is consulted to shrink or expand the content height.
 */
Blockly2hook.contentHeightToggle = function() {
  var outputHeader = document.getElementById('ide_output_collapsible_header');
  var blocks = document.getElementById('blocks_panel');
  var xrplhook = document.getElementById('content_hook');
  var xml = document.getElementById('content_xml');

  // Blockly doesn't resize with CSS3 transitions enabled, so do it manually
  var timerId = setInterval(function() {
    window.dispatchEvent(new Event('resize'));
  }, 15);
  setTimeout(function() {
    clearInterval(timerId);
  }, 400);

  // Apart from checking if the output is visible, do not bother to shrink in
  // small screens as the minimum height of the content will kick in and cause
  // the content to be behind the IDE output data anyway.
  if (!outputHeader.className.match('active') && $(window).height() > 800) {
    blocks.className = 'content height_transition blocks_panel_small';
    xrplhook.className = 'content height_transition content_hook_small';
    xml.className = 'content height_transition content_xml_small';
  } else {
    blocks.className = 'content height_transition blocks_panel_large';
    xrplhook.className = 'content height_transition content_hook_large';
    xml.className = 'content height_transition content_xml_large';
  }

  // If the height transition CSS is left then blockly does not resize
  setTimeout(function() {
    blocks.className = blocks.className.replace('height_transition', '');
    xrplhook.className = xrplhook.className.replace('height_transition', '');
    xml.className = xml.className.replace('height_transition', '');
  }, 400);
};

/**
 * Compute the absolute coordinates and dimensions of an HTML element.
 * @param {!Element} element Element to match.
 * @return {!Object} Contains height, width, x, and y properties.
 * @private
 */
Blockly2hook.getBBox_ = function(element) {
  var height = element.offsetHeight;
  var width = element.offsetWidth;
  var x = 0;
  var y = 0;
  do {
    x += element.offsetLeft;
    y += element.offsetTop;
    element = element.offsetParent;
  } while (element);
  return {
    height: height,
    width: width,
    x: x,
    y: y
  };
};

function auto_grow(element) {
  element.style.height = "5px";
  element.style.height = (element.scrollHeight)+"px";
}