// Дополнения к разборам архитектуры игр. Сами разборы приходят из репозитория игр (scripts/pull-game-posts.mjs),
// а подзаголовок, частые вопросы и дата правки этих дополнений живут здесь, на стороне сайта.
import type { L } from '@/lib/i18n'

export interface ArchitectureExtra {
  /** Подзаголовок после двоеточия: что именно разобрано в статье */
  sub: L
  /** Частые вопросы: карточки «вопрос — ответ» и разметка FAQPage */
  faq: { q: L; a: L }[]
  /** Дата последней правки дополнений: идёт в lastmod и dateModified, если она позже даты разбора */
  updated: string
}

const U = '2026-11-07'

export const ARCHITECTURE_EXTRA: Record<string, ArchitectureExtra> = {
  sibiria: {
    sub: { ru: 'игра на выживание без движка — схемы C4, четыре критических пути и слабые места', en: 'a survival game with no engine — C4 diagrams, four critical paths and weak spots' },
    updated: U,
    faq: [
      { q: { ru: 'Как устроена игра «Сибирь»?', en: 'How is Sibiria built?' }, a: { ru: 'Игра на выживание в тайге с видом сверху работает прямо в браузере: без движка и без сборки, около пятидесяти скриптов рисуют на холсте 2D.', en: 'A top-down taiga survival game that runs right in the browser: no engine and no build step, about fifty scripts drawing on a 2D canvas.' } },
      { q: { ru: 'Как хранится мир игры?', en: 'How is the game world stored?' }, a: { ru: 'Мир считается из seed: лес, зоны и сугробы не хранятся. Сохранение — это общее состояние G плюс seed.', en: 'The world is computed from a seed: the forest, zones and snowdrifts are not stored. A save is the shared state G plus the seed.' } },
      { q: { ru: 'Где в «Сибири» лежит сюжет?', en: 'Where does Sibiria keep its story?' }, a: { ru: 'Главы, события, задания и люди лежат данными в папке content, а код, который их исполняет, о них ничего не знает.', en: 'Chapters, events, quests and people live as data in the content folder, and the code that runs them knows nothing about them.' } },
      { q: { ru: 'Какие слабые места у архитектуры?', en: 'What are the weak spots of the architecture?' }, a: { ru: 'Около 55 скриптов подключаются в порядке, который нигде не проверяется, а одно изменяемое состояние G любая система может испортить.', en: 'About 55 scripts load in an order nothing checks, and any system can break the single mutable state G.' } },
    ],
  },
  berezovka: {
    sub: { ru: 'открытый мир в браузере из одной страницы и пяти модулей — схемы C4, пути и слабые места', en: 'an open world in the browser from one page and five modules — C4 diagrams, paths and weak spots' },
    updated: U,
    faq: [
      { q: { ru: 'Как устроена игра «Берёзовка»?', en: 'How is Berezovka built?' }, a: { ru: 'Заснеженная деревня с открытым миром около километра работает в браузере без сервера и без сборки: одна страница и пять модулей.', en: 'A snowy village with an open world of about a kilometre runs in the browser with no server and no build: one page and five modules.' } },
      { q: { ru: 'Как в игре проверяют качество?', en: 'How does the game check its quality?' }, a: { ru: 'У каждого измеримого свойства есть проверка: игра печатает в консоль строки GATE … OK или FAIL — размеры зданий, скорость шага, разгон машины, яркость кадра.', en: 'Every measurable property has a check: the game prints GATE … OK or FAIL lines to the console — building sizes, walking speed, car acceleration, frame brightness.' } },
      { q: { ru: 'Сколько весит игра при первом запуске?', en: 'How heavy is the first load?' }, a: { ru: 'Около 33 МБ: модели встроены в base64, а библиотека берётся с внешнего CDN.', en: 'About 33 MB: models are embedded in base64, and the library comes from an outside CDN.' } },
      { q: { ru: 'Какие слабые места у архитектуры?', en: 'What are the weak spots of the architecture?' }, a: { ru: 'Цикл, сюжет, столкновения и интерфейс лежат в одном файле на полторы тысячи строк, а сохранение живёт только в одном браузере.', en: 'The loop, story, collisions and UI sit in one file of fifteen hundred lines, and saves live only in one browser.' } },
    ],
  },
  'chronicles-of-kingdoms': {
    sub: { ru: 'стратегия в духе Age of Empires II как обычный сайт — схемы C4, пути и слабые места', en: 'an Age of Empires II–style strategy as a plain website — C4 diagrams, paths and weak spots' },
    updated: U,
    faq: [
      { q: { ru: 'Как устроены «Хроники Королевств»?', en: 'How is Chronicles of Kingdoms built?' }, a: { ru: 'Стратегия в духе Age of Empires II запускается как обычный сайт: без сервера и сборки, около 80 модулей на JavaScript и холст на всю страницу.', en: 'An Age of Empires II–style strategy runs as a plain website: no server and no build, about 80 JavaScript modules and a full-page canvas.' } },
      { q: { ru: 'Почему правила совпадают с Python-версией?', en: 'Why do the rules match the Python version?' }, a: { ru: 'Игра переписана из Python-версии построчно, а тесты гоняют целые матчи ИИ против ИИ без экрана и сверяют их с CPython.', en: 'The game was ported from the Python version line by line, and tests run whole AI-vs-AI matches without a screen and compare them with CPython.' } },
      { q: { ru: 'Как в игре устроен соперник?', en: 'How does the AI opponent work?' }, a: { ru: 'Игрок и ИИ равны: оба командуют юнитами через одни и те же команды cmd_*.', en: 'The player and the AI are equal: both command units through the same cmd_* commands.' } },
      { q: { ru: 'Какие слабые места у архитектуры?', en: 'What are the weak spots of the architecture?' }, a: { ru: 'Большие файлы с малыми границами внутри и модули, которые находят друг друга по имени во время работы, поэтому связи не видны в коде.', en: 'Large files with few internal boundaries, and modules that find each other by name at run time, so the links are not visible in the code.' } },
    ],
  },
  'echo-of-the-rift': {
    sub: { ru: 'открытый остров 900 × 900 м без движка — домены, схемы C4, пути и слабые места', en: 'a 900 × 900 m open island with no engine — domains, C4 diagrams, paths and weak spots' },
    updated: U,
    faq: [
      { q: { ru: 'Как устроено «Эхо Разлома»?', en: 'How is Echo of the Rift built?' }, a: { ru: 'Открытый остров 900 × 900 м работает в браузере без движка и сборки: одна страница и набор модулей.', en: 'A 900 × 900 m open island runs in the browser with no engine and no build: one page and a set of modules.' } },
      { q: { ru: 'Кто двигает пилота?', en: 'What moves the pilot?' }, a: { ru: 'Только физика. Остальные модули задают цель, а кости позы пишет единственный сборщик позы.', en: 'Only physics. Other modules set a goal, and a single pose assembler writes the bones.' } },
      { q: { ru: 'Что будет, если модуль упадёт?', en: 'What happens if a module fails?' }, a: { ru: 'Ошибка отключает только этот модуль, остальная игра продолжает работать.', en: 'The error disables only that module, and the rest of the game keeps running.' } },
      { q: { ru: 'Какие слабые места у архитектуры?', en: 'What are the weak spots of the architecture?' }, a: { ru: 'Сюжет, цикл и реестр Passport лежат в одном файле на 4,5 тысячи строк, а модули обмениваются через глобальные объекты window.', en: 'The story, the loop and the Passport registry sit in one file of 4.5 thousand lines, and modules exchange data through global window objects.' } },
    ],
  },
  'northern-rift': {
    sub: { ru: '3D-аркада в одном файле на 70 КБ — схемы C4, пути и слабые места', en: 'a 3D arcade game in one 70 KB file — C4 diagrams, paths and weak spots' },
    updated: U,
    faq: [
      { q: { ru: 'Как устроен «Северный Разлом»?', en: 'How is Northern Rift built?' }, a: { ru: '3D-аркада про полёт по бесконечному ледяному каньону: один файл index.html около 70 КБ, без сборки и без своих ассетов.', en: 'A 3D arcade game about flying through an endless ice canyon: one index.html file of about 70 KB, no build and no own assets.' } },
      { q: { ru: 'Как сделан бесконечный каньон?', en: 'How is the endless canyon made?' }, a: { ru: 'Корабль движется по оси z, а каньон, небо и снег подстраиваются под камеру. Всё, что ушло назад на 30 м, убирается, а впереди держится запас в 430 м.', en: 'The ship moves along the z axis, and the canyon, sky and snow follow the camera. Anything 30 m behind is removed, and 430 m ahead is kept ready.' } },
      { q: { ru: 'Работает ли игра без интернета?', en: 'Does the game work offline?' }, a: { ru: 'Нет: three.js и шрифты подгружаются с CDN, без сети игра не стартует.', en: 'No: three.js and fonts load from a CDN, so the game does not start without a network.' } },
      { q: { ru: 'Какие слабые места у архитектуры?', en: 'What are the weak spots of the architecture?' }, a: { ru: 'Звук, мир, правила и интерфейс лежат в одном блоке, тестов нет, а каньон строится без зерна случайности, поэтому заезд не повторить.', en: 'Sound, world, rules and UI sit in one block, there are no tests, and the canyon is built without a random seed, so a run cannot be replayed.' } },
    ],
  },
  skhodka: {
    sub: { ru: 'вечер IT-сообщества в баре как симуляция в браузере — схемы C4, пути и слабые места', en: 'an IT community evening in a bar as a browser simulation — C4 diagrams, paths and weak spots' },
    updated: U,
    faq: [
      { q: { ru: 'Как устроена игра «Сходка»?', en: 'How is Skhodka built?' }, a: { ru: 'Субботний вечер IT-сообщества в баре Батуми с 19:00 до 01:00, около 18 минут игры: браузер, без сервера и сборки, three.js лежит рядом.', en: 'A Saturday evening of an IT community in a Batumi bar from 19:00 to 01:00, about 18 minutes of play: browser, no server and no build, with three.js bundled alongside.' } },
      { q: { ru: 'Почему вечер можно повторить?', en: 'Why can an evening be replayed?' }, a: { ru: 'Генератор случайных чисел с сидом и фиксированный шаг дают повторяемость: один сид — один вечер.', en: 'A seeded random generator and a fixed step make it repeatable: one seed, one evening.' } },
      { q: { ru: 'Где лежат истории и числа?', en: 'Where do the stories and numbers live?' }, a: { ru: 'В данных CONTENT: их правят без движка, а числа перекрывает TUNING.', en: 'In the CONTENT data: they are edited without touching the engine, and TUNING overrides the numbers.' } },
      { q: { ru: 'Какие слабые места у архитектуры?', en: 'What are the weak spots of the architecture?' }, a: { ru: 'Интерфейс угадывает форму данных мира, а музыканты существуют только в сборке и не видны симуляции.', en: 'The UI guesses the shape of the world data, and the musicians exist only in the build and are invisible to the simulation.' } },
    ],
  },
  uptime: {
    sub: { ru: 'игра про работу инженера из 43 уровней — схемы C4, пути и слабые места', en: 'a 43-level game about an engineer’s job — C4 diagrams, paths and weak spots' },
    updated: U,
    faq: [
      { q: { ru: 'Как устроена игра «Аптайм»?', en: 'How is Uptime built?' }, a: { ru: 'Собираешь сервис из блоков, пускаешь поток пользователей и смотришь, что сломается первым: 43 уровня в браузере без сервера и сборки.', en: 'You build a service from blocks, send users through it and see what breaks first: 43 levels in the browser with no server and no build.' } },
      { q: { ru: 'Как доказывают, что уровень проходим?', en: 'How is each level proven passable?' }, a: { ru: 'Тест прогоняет наивную схему, которая должна провалиться, и эталонную, которая должна пройти на две звезды и выше, для всех уровней.', en: 'A test runs a naive design that must fail and a reference design that must pass with two stars or more, for every level.' } },
      { q: { ru: 'Почему забег одинаков на любой машине?', en: 'Why is a run the same on any machine?' }, a: { ru: 'Симуляция идёт фиксированным шагом в полсекунды и не знает об экране.', en: 'The simulation runs with a fixed half-second step and knows nothing about the screen.' } },
      { q: { ru: 'Какие слабые места у архитектуры?', en: 'What are the weak spots of the architecture?' }, a: { ru: 'Интерфейс на 870 строк держит все экраны в одном замыкании, а баланс задан числами, подобранными вручную.', en: 'An 870-line UI holds every screen in one closure, and the balance relies on hand-tuned numbers.' } },
    ],
  },
  zhitie: {
    sub: { ru: 'симулятор жизни из десяти семей в браузере — схемы C4, пути и слабые места', en: 'a life simulator of ten families in the browser — C4 diagrams, paths and weak spots' },
    updated: U,
    faq: [
      { q: { ru: 'Как устроена игра «Житьё»?', en: 'How is Zhitie built?' }, a: { ru: 'Симулятор жизни в браузере: район из десяти семей, потребности, карьера и отношения. Без сборки и сервера: страница, набор ES-модулей и three.js с CDN.', en: 'A life simulator in the browser: a district of ten families with needs, careers and relationships. No build and no server: a page, a set of ES modules and three.js from a CDN.' } },
      { q: { ru: 'Как сохраняется игра?', en: 'How is the game saved?' }, a: { ru: 'Всё, что нужно сохранить, лежит в одном объекте состояния, который целиком превращается в JSON.', en: 'Everything that needs saving sits in one state object that turns into JSON as a whole.' } },
      { q: { ru: 'Как связаны части игры?', en: 'How are the parts of the game connected?' }, a: { ru: 'Шиной событий: ошибка в одном обработчике не роняет остальных. Мозг и мир работают без браузера, их проверяют в Node.', en: 'Through an event bus: an error in one handler does not take down the others. The brain and the world run without a browser and are tested in Node.' } },
      { q: { ru: 'Какие слабые места у архитектуры?', en: 'What are the weak spots of the architecture?' }, a: { ru: 'Сохранение другой версии молча отбрасывается без миграций, а интерфейс берёт данные прямо из манифеста рендера.', en: 'A save from another version is silently dropped with no migration, and the UI reads data straight from the render manifest.' } },
    ],
  },
}
