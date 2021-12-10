var Blockly2hook = Blockly2hook || {};
Blockly2hook.LOCALISED_TEXT = {
  translationLanguage: "English",
  title: "Blockly2hook",
  blocks: "Blocks",
  /* Menu */
  open: "Open",
  save: "Save",
  deleteAll: "Delete All",
  settings: "Settings",
  documentation: "Documentation",
  reportBug: "Report Bug",
  examples: "Examples",
  /* Settings */
  compilerLocation: "Compiler Location",
  compilerLocationDefault: "Compiler Location unknown",
  sketchFolder: "Sketch Folder",
  sketchFolderDefault: "Sketch Folder unknown",
  xrplhookBoard: "xrplhook Board",
  xrplhookBoardDefault: "xrplhook Board unknown",
  comPort: "COM Port",
  comPortDefault: "COM Port unknown",
  defaultIdeButton: "Default IDE Button",
  defaultIdeButtonDefault: "IDE options unknown",
  language: "Language",
  languageDefault: "Language unknown",
  sketchName: "Sketch Name",
  /* xrplhook console output */
  xrplhookOpMainTitle: "xrplhook IDE output",
  xrplhookOpWaiting: "Waiting for the IDE output...",
  xrplhookOpUploadedTitle: "Successfully Uploaded Sketch",
  xrplhookOpVerifiedTitle: "Successfully Verified Sketch",
  xrplhookOpOpenedTitle: "Sketch opened in IDE",
  xrplhookOpOpenedBody: "The sketch should be loaded in the xrplhook IDE.",
  xrplhookOpErrorTitle: "There has been an error",
  xrplhookOpErrorIdContext_0: "No error.",
  xrplhookOpErrorIdContext_1: "Build or Upload failed.",
  xrplhookOpErrorIdContext_2: "Sketch not found.",
  xrplhookOpErrorIdContext_3: "Invalid command line argument.",
  xrplhookOpErrorIdContext_4: "Preference passed to 'get-pref' flag does not exist.",
  xrplhookOpErrorIdContext_5: "Not Clear, but xrplhook IDE sometimes errors with this.",
  xrplhookOpErrorIdContext_50: "Unexpected error code from xrplhook IDE",
  xrplhookOpErrorIdContext_51: "Could not create sketch file",
  xrplhookOpErrorIdContext_52: "Invalid path to internally created sketch file",
  xrplhookOpErrorIdContext_53: "Unable to find xrplhook IDE<br>" +
                              "The compiler directory has not been set correctly.<br>" +
                              "Please ensure the path is correct in the Settings.",
  xrplhookOpErrorIdContext_54: "What should we do with the Sketch?<br>" +
                              "The launch IDE option has not been set.<br>" +
                              "Please select an IDE option in the Settings.",
  xrplhookOpErrorIdContext_55: "Serial Port unavailable<br>" +
                              "The Serial Port is not accessible.<br>" +
                              "Please check if the xrplhook is correctly connected to the PC and select the Serial Port in the Settings.",
  xrplhookOpErrorIdContext_56: "Unknown xrplhook Board<br>" +
                              "The xrplhook Board has not been set.<br>" +
                              "Please select the appropriate xrplhook Board from the settings.",
  xrplhookOpErrorIdContext_52: "Unexpected server error.",
  xrplhookOpErrorIdContext_64: "Unable to parse sent JSON.",
  xrplhookOpErrorUnknown: "Unexpected error",
  /* Modals */
  noServerTitle: "Blockly2hook app not running",
  noServerTitleBody: "<p>For all the Blockly2hook features to be enabled, the Blockly2hook desktop application must be running locally on your computer.</p>" +
                     "<p>If you are using an online version you will not be able to configure the settings nor load the blocks code into an xrplhook.</p>" +
                     "<p>Installation instruction can be found in the <a href=\"https://github.com/carlosperate/Blockly2hook\">Blockly2hook repository</a>.</p>" +
                     "<p>If you have Blockly2hook already installed, make sure the application is running correctly.</p>",
  noServerNoLangBody: "If the Blockly2hook application is not running the language cannot be fully changed.",
  addBlocksTitle: "Additional Blocks",
  /* Alerts */
  loadNewBlocksTitle: "Load new blocks?",
  loadNewBlocksBody: "Loading a new XML file will replace the current blocks from the workspace.<br>" +
                     "Are you sure you want to proceed?",
  discardBlocksTitle: "Delete blocks?",
  discardBlocksBody: "There are %1 blocks on the workspace.<br>" +
                     "Are you sure you want to delete them?",
  invalidXmlTitle: "Invalid XML",
  invalidXmlBody: "The XML file was not successfully parsed into blocks. Please review the XML code and try again.",
  
  /* Tooltips */
  uploadingSketch: "Uploading Sketch into xrplhook...",
  uploadSketch: "Upload Sketch to the xrplhook",
  verifyingSketch: "Compiling the Hook...",
  verifySketch: "Compile the Hook",
  openingSketch: "Opening Sketch in the xrplhook IDE...",
  openSketch: "Open Sketch in IDE",
  notImplemented: "Function not yet implemented",
  /* Prompts */
  ok: "OK",
  okay: "Okay",
  cancel: "Cancel",
  return: "Return",
  /* Cards */
  xrplhookSourceCode: "Hooks Source Code",
  blocksXml: "Blocks XML",
  /* Toolbox Categories*/
  catLogic: "Logic",
  catLoops: "Loops",
  catMath: "Math",
  catText: "Text",
  catVariables: "Variables",
  catFunctions: "Functions",
  catUtilities: 'Utilities',
  catSerialization: 'Serialization',
  catEmittedTransaction:'Emitted Transaction',
  catFloat:'Float',
  catLedger:'Ledger',
  catSlot: 'Slot',
  catState:'State',
  catTrace:'Trace (Debug)',
  catOriginatingTransaction: 'Originating Transaction',
  catLists:'Arrays',
  catHooksControl: 'Control',
  catHooksTool: 'Basic Blocks',
  catMacro: "Hook's Macro",
  catBufferOperations: "Buffer Operations",
  catHookAPI :" Hook's API",
  catMacroGeneral: "General",
  catMacroPayment :"Payment",
  catMacroBuffer: "Buffer",
  catMacroTrace:"Trace"
};
