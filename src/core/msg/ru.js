var Blockly2hook = Blockly2hook || {};
Blockly2hook.LOCALISED_TEXT = {
  translationLanguage: "Русский",
  title: "Blockly2hook",
  blocks: "Блоки",
  /* Menu */
  open: "Открыть",
  save: "Сохранить",
  deleteAll: "Удалить все",
  settings: "Настройки",
  documentation: "Документация",
  reportBug: "Сообщить об ошибке",
  examples: "Примеры",
  /* Settings */
  compilerLocation: "Путь к компилятору",
  compilerLocationDefault: "Путь к компилятору по умолчанию",
  sketchFolder: "Папка со скетчами",
  sketchFolderDefault: "Папка со скетчами по умолчанию",
  xrplhookBoard: "Плата xrplhook",
  xrplhookBoardDefault: "Плата xrplhook по умолчанию",
  comPort: "COM Порт",
  comPortDefault: "COM Порт по умолчанию",
  defaultIdeButton: "Кнопка IDE по умолчанию",
  defaultIdeButtonDefault: "IDE опции по умолчанию",
  language: "Язык",
  languageDefault: "Язык по умолчанию",
  sketchName: "Название скетча",
  /* xrplhook console output */
  xrplhookOpMainTitle: "Сообщения xrplhook IDE",
  xrplhookOpWaiting: "Ждем сообщений от xrplhook IDE...",
  xrplhookOpUploadedTitle: "Скетч успешно загружен",
  xrplhookOpVerifiedTitle: "Скетч успешно скомпилирован",
  xrplhookOpOpenedTitle: "Скетч был открыт в xrplhook IDE",
  xrplhookOpOpenedBody: "Скетч должен быть загружен в xrplhook IDE.",
  xrplhookOpErrorUpVerTitle: "Компиляция или загрузка провалились",
  xrplhookOpErrorSketchTitle: "Скетч не найден",
  xrplhookOpErrorFlagTitle: "Неправильный аргумент командной строки",
  xrplhookOpErrorFlagPrefTitle: "Preference passed to 'get-pref' flag does not exist",
  xrplhookOpErrorIdeDirTitle: "Невозможно найти xrplhook IDE",
  xrplhookOpErrorIdeDirBody: "Не задан путь к компилятору.<br>" +
                            "Задайте путь в настройках.",
  xrplhookOpErrorIdeOptionTitle: "Что нам нужно сделать с этим Скетчем?",
  xrplhookOpErrorIdeOptionBody: "Параметры запуска IDE не были настроены.<br>" +
                               "Выберите параметры закуска IDE в настройках.",
  xrplhookOpErrorIdePortTitle: "Последовательный порт не доступен",
  xrplhookOpErrorIdePortBody: "Последовательный порт не доступен.<br>" +
                             "Проверьте, правильно ли подключена плата xrplhook и выберите последовательный порт в Настройках.",
  xrplhookOpErrorIdeBoardTitle: "Неизвестная плата xrplhook",
  xrplhookOpErrorIdeBoardBody: "Плата xrplhook не была задана.<br>" +
                              "Выберите соответствующую плату xrplhook из списка.",
  /* Modals */
  noServerTitle: "Blockly2hook не запущен",
  noServerTitleBody: "<p>Чтобы воспользоваться всеми возможностями Blockly2hook, приложение Blockly2hook для рабочего стола должно быть запущено на пользовательском компьютере.</p>" +
                     "<p>Если вы используете онлайн версию, вы не сможете изменять настройки а также загружать код в xrplhook.</p>" +
                     "<p>Инструкции по установке можно найти на <a href=\"https://github.com/carlosperate/Blockly2hook\">Blockly2hook repository</a>.</p>" +
                     "<p>Если Blockly2hook уже установлен, убедитесь что приложение работает корректно.</p>",
  noServerNoLangBody: "Если приложение Blockly2hook не запущено, язык не может быть изменен.",
  addBlocksTitle: "Дополнительные блоки",
  /* Alerts */
  loadNewBlocksTitle: "Загрузить новые блоки?",
  loadNewBlocksBody: "Загрузка нового XML файла заменит текущие блоки в рабочем поле.<br>" +
                     "Вы уверены что хотите продолжить?",
  discardBlocksTitle: "Удалить блоки?",
  discardBlocksBody: "Имеется %1 блоков в рабочем поле.<br>" +
                     "Вы действительно хотите удалить их?",
  invalidXmlTitle: "Неверный XML",
  invalidXmlBody: "XML файл не был загружен. Проверьте код XML и попробуйте снова.",
  /* Tooltips */
  uploadingSketch: "Загружаю код в xrplhook...",
  uploadSketch: "Загрузить код в xrplhook",
  verifyingSketch: "Проверка скетча...",
  verifySketch: "Проверить скетч на ошибки",
  openingSketch: "Открываем скетч в xrplhook IDE...",
  openSketch: "Открыть скетч в xrplhook IDE",
  notImplemented: "Функция еще не внедрена",
  /* Prompts */
  ok: "Ok",
  okay: "Okay",
  cancel: "Отменить",
  return: "Вернуться",
  /* Cards */
  xrplhookSourceCode: "Исходный код xrplhook",
  blocksXml: "XML блоки",
  /* Toolbox Categories*/
  catLogic: "Логика",
  catLoops: "Циклы",
  catMath: "Математика",
  catText: "Текст",
  catVariables: "Переменные",
  catFunctions: "Функции",
  catInputOutput: "Ввод/вывод",
  catTime: "Время",
  catAudio: "Аудио",
  catMotors: "Моторы",
  catComms: "Интерфейсы",
};
