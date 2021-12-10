var Blockly2hook = Blockly2hook || {};
Blockly2hook.LOCALISED_TEXT = {
  translationLanguage: 'Español',
  title: "Blockly2hook",
  blocks: "Bloques",
  /* Menu */
  open: "Abrir",
  save: "Guardar",
  deleteAll: "Borrar todo",
  settings: "Opciones",
  documentation: "Documentación",
  reportBug: "Reportar Fallo",
  examples: "Ejemplos",
  /* Settings */
  compilerLocation: "Localización del Compilador",
  compilerLocationDefault: "Localización del Compilador desconocida",
  sketchFolder: "Carpeta del Sketch",
  sketchFolderDefault: "Carpeta del Sketch desconocida",
  xrplhookBoard: "Placa de xrplhook",
  xrplhookBoardDefault: "Placa de xrplhook desconocida",
  comPort: "Puerto COM",
  comPortDefault: "Puerto COM desconocido",
  defaultIdeButton: "Botón de IDE por defecto",
  defaultIdeButtonDefault: "Opción de IDE desconocida",
  language: "Lenguaje",
  languageDefault: "Lenguaje desconocido",
  sketchName: "Nombre del Sketch",
  /* xrplhook console output */
  xrplhookOpMainTitle: "Salida del xrplhook IDE",
  xrplhookOpWaiting: "Esperando la salida del xrplhook IDE...",
  xrplhookOpUploadedTitle: "Sketch subido exitosamente",
  xrplhookOpVerifiedTitle: "Sketch verificado exitosamente",
  xrplhookOpOpenedTitle: "Sketch abierto en el IDE",
  xrplhookOpOpenedBody: "El sketch debería estar cargado en el IDE de xrplhook.",
  xrplhookOpErrorUpVerTitle: "Fallo en la construcción o subida",
  xrplhookOpErrorSketchTitle: "Sketch no encontrado",
  xrplhookOpErrorFlagTitle: "Argumento invalido en la linea de comandos",
  xrplhookOpErrorFlagPrefTitle: "Preferencia pasada a la bandera 'get-pref' no existe",
  xrplhookOpErrorIdeDirTitle: "Incapaz de encontrar el xrplhook IDE",
  xrplhookOpErrorIdeDirBody: "El directorio del compilador no ha sido configurado.<br>" +
                            "Por favor configuralo en las Opciones.",
  xrplhookOpErrorIdeOptionTitle: "¿Que debemos hacer con el Sketch?",
  xrplhookOpErrorIdeOptionBody: "La opción de cargar el xrplhook IDE no ha sido configurada.<br>" +
                               "Por favor, selecciona una opción del IDE en las Opciones.",
  xrplhookOpErrorIdePortTitle: "Puerto communicaciones no disponible",
  xrplhookOpErrorIdePortBody: "El puerto de comunicaciones no es accesible.<br>" +
                             "Por favor, asegurate si el xrplhook esta correctamente conectado al ordenador y si el puerto correcto esta selecionado en las Opciones.",
  xrplhookOpErrorIdeBoardTitle: "Placa de xrplhook desconocida",
  xrplhookOpErrorIdeBoardBody: "La placa de xrplhook no ha sido seleccionada.<br>" +
                              "Por favor, selecciona la placa adecuada en las Opciones.",
  /* Modals */
  noServerTitle: "Aplicación Blockly2hook sin ejecutar",
  noServerTitleBody: "<p>Para que todas las funciones de Blockly2hook estén disponibles, la aplicación de escritorio de Blockly2hook debe de estar ejecutándose en su ordenador.</p>" +
                     "<p>Si estas usando una versión online no seras capaz de configurar las opciones o cargar el código de los bloques en un xrplhook.</p>" +
                     "<p>Puedes encontrar las instrucciones de instalación en el <a href=\"https://github.com/carlosperate/Blockly2hook\">repositorio de Blockly2hook</a>.</p>" +
                     "<p>Si ya tienes Blockly2hook instalado, asegurate de que la aplicación este ejecutándose de forma correcta.</p>",
  noServerNoLangBody: "Si la aplicación de Blockly2hook no esta ejecutándose el lenguaje no puede cargarse de forma completa.",
  addBlocksTitle: "Bloques Adicionales",
  /* Alerts */
  loadNewBlocksTitle: "¿Cargar bloques nuevos?",
  loadNewBlocksBody: "Cargar un nuevo archivo XML reemplazara los bloques actuales.<br>" +
                     "¿Estas seguro de proceder?",
  discardBlocksTitle: "¿Borrar todos los bloques?",
  discardBlocksBody: "Hay %1 bloques en el area de trabajo.<br>" +
                     "¿Estas seguro de borrarlos?",
  invalidXmlTitle: "XML invalido",
  invalidXmlBody: "El archivo XML no a sido convertido en bloques exitosamente. Por favor revisa el código XML e intentalo de nuevo.",
  /* Tooltips */
  uploadingSketch: "Subiendo el Sketch al xrplhook...",
  uploadSketch: "Subir el Sketch al xrplhook",
  verifyingSketch: "Verificando el Sketch...",
  verifySketch: "Verificar el Sketch",
  openingSketch: "Abriendo el Sketch en el xrplhook IDE...",
  openSketch: "Abrir el Sketch en el IDE",
  notImplemented: "Función no implementada todavía",
  /* Prompts */
  ok: "OK",
  okay: "Okay",
  cancel: "Cancelar",
  return: "Volver",
  /* Cards */
  xrplhookSourceCode: "Codigo de xrplhook",
  blocksXml: "Bloques XML",
  /* Toolbox Categories*/
  catLogic: "Lógica",
  catLoops: "Secuencias",
  catMath: "Matemáticas",
  catText: "Texto",
  catVariables: "Variables",
  catFunctions: "Funciones",
  catInputOutput: "Input/Output",
  catTime: "Tiempo",
  catAudio: "Audio",
  catMotors: "Motores",
  catComms: "Comunicación",
};
