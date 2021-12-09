/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview Functions related to language and localisation.
 */
'use strict';

/** Create a namespace for the application. */
var Blockly2hook = Blockly2hook || {};

/** Lookup for names of supported languages. Keys in ISO 639 format. */
Blockly2hook.LANGUAGE_NAME = {
  'fr': 'Français',
  'en': 'English',
  'es': 'Español',
  'nl': 'Nederlands',
  'pt': 'Português',
  'it': 'Italiano',
  'ru': 'Русский'
};

/**
 * Selected language, default English.
 * @type {string}
 */
Blockly2hook.LANG = 'en';

/**
 * We keep a local copy of the default language in case translations cannot
 * be found in the injected language file.
 * @type {Object}
 */
Blockly2hook.DEFAULT_LANG_TEXT = {};


/** Initialize the page language. */
Blockly2hook.initLanguage = function() {
  // Save the current default language ID to check if it has been changed
  var defaultLang = Blockly2hook.LANG;

  // Check server settings and url language, url gets priority
  Blockly2hook.LANG = Blockly2hook.getUrlLanguage() ||
      Blockly2hook.getLanguageSetting() || Blockly2hook.LANG;

  Blockly2hook.populateLanguageMenu(Blockly2hook.LANG);

  if (defaultLang !== Blockly2hook.LANG) {
      Blockly2hook.duplicateDefaultLang();
      Blockly2hook.injectLanguageJsSources(Blockly2hook.LANG);
      Blockly2hook.updateLanguageText();
  }
};

/**
 * Get the language previously set by the user from the server settings.
 * @return {string} Language saved in the server settings.
 */
Blockly2hook.getLanguageSetting = function() {
  //TODO: Server feature still to be implemented, for now return default
  return null;
};

/**
 * Get the language selected from the URL, format '?lang=en'.
 * @return {string} Selected language.
 */
Blockly2hook.getUrlLanguage = function() {
  var langKey = 'lang';
  var val = location.search.match(new RegExp('[?&]' + langKey + '=([^&]+)'));
  var language = val ? decodeURIComponent(val[1].replace(/\+/g, '%20')) : '';
  if (Blockly2hook.LANGUAGE_NAME[language] === undefined) {
    language = null;
  }
  return language;
};

/**
 * Populates the settings language selection menu.
 * @param {!string} selectedLang Language to be marked as selected.
 */
Blockly2hook.populateLanguageMenu = function(selectedLang) {
  var languageMenu = document.getElementById('language');
  languageMenu.options.length = 0;

  for (var lang in Blockly2hook.LANGUAGE_NAME) {
    var option = new Option(Blockly2hook.LANGUAGE_NAME[lang], lang);
    if (lang == selectedLang) {
      option.selected = true;
    }
    languageMenu.options.add(option);
  }
  languageMenu.onchange = Blockly2hook.changeLanguage;
};

/**
 * Because new languages are injected by overwriting Blockly2hook.LOCALISED_TEXT
 * we keep a local copy of the default language (included in the html header) so
 * that we can still retrieve these strings if the translation cannot be found.
 */
Blockly2hook.duplicateDefaultLang = function() {
  for (var textId in Blockly2hook.LOCALISED_TEXT) {
    Blockly2hook.DEFAULT_LANG_TEXT[textId] = Blockly2hook.LOCALISED_TEXT[textId];
  }
};

/** Updates the page text strings with the new language. */
Blockly2hook.updateLanguageText = function() {
  for (var textId in Blockly2hook.LOCALISED_TEXT) {
    var textStrings = document.getElementsByClassName('translatable_' + textId);
    for (var i = 0; i < textStrings.length; i++) {
      textStrings[i].innerHTML = Blockly2hook.getLocalStr(textId);
    }
  }
};

/**
 * Injects the language JavaScript files into the html head element.
 * @param {string} langKey Dictionary key for the language to inject, must also
 *     be JS file name.
 */
Blockly2hook.injectLanguageJsSources = function(langKey) {
  var head = document.getElementsByTagName('head')[0];

  // Retrieve and inject Blockly2hook translations synchronously
  var appLangJsLoad = document.createElement('script');
  var request = Blockly2hookServer.createRequest();
  var appLangJdPath = 'msg/' + langKey + '.js';
  try {
    request.open('GET', appLangJdPath, false);
    request.send('');
    appLangJsLoad.text = request.responseText;
  } catch (e) {
    // Display an alert to indicate we cannot load languages
    Blockly2hook.alertMessage(
        Blockly2hook.getLocalStr('noServerTitle'),
        Blockly2hook.getLocalStr('noServerNoLangBody'),
        false);
    // But still asynchronous lazy load so at least some text gets translated
    appLangJsLoad.src = appLangJdPath;
  }
  head.appendChild(appLangJsLoad);

  // Retrieve and inject Blockly translations asynchronously
  var blocklyLangJsLoad = document.createElement('script');
  blocklyLangJsLoad.src = '../blockly/msg/js/' + langKey + '.js';
  head.appendChild(blocklyLangJsLoad);
};

/** Saves the blocks and reloads with a different language. */
Blockly2hook.changeLanguage = function() {
  // Store the blocks for the duration of the reload only
  Blockly2hook.saveSessionStorageBlocks();

  var languageMenu = document.getElementById('language');
  var newLang = encodeURIComponent(
      languageMenu.options[languageMenu.selectedIndex].value);
  var search = window.location.search;
  if (search.length <= 1) {
    search = '?lang=' + newLang;
  } else if (search.match(/[?&]lang=[^&]*/)) {
    search = search.replace(/([?&]lang=)[^&]*/, '$1' + newLang);
  } else {
    search = search.replace(/\?/, '?lang=' + newLang + '&');
  }

  window.location = window.location.protocol + '//' +
      window.location.host + window.location.pathname + search;
};

/**
 * Finds and returns the requests string in the localised language.
 * If the translation is not returned, it fetches the original language string.
 * @param {string} stringId
 * @return {!string} The localised, original, or an empty string.
 */
Blockly2hook.getLocalStr = function(stringId) {
  var text = Blockly2hook.LOCALISED_TEXT[stringId];
  if (!text) {
    console.log('Localised text string ID "' + stringId + '" does not exists!');
  }
  return text || Blockly2hook.DEFAULT_LANG_TEXT[stringId] || '';
};
