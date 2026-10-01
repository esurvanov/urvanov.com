// Посадочные страницы игр: текст, который видит поисковик (сама игра — холст, его не прочитать).
// Факты взяты из README игр (репозиторий awesome-games). Сама игра живёт на отдельном адресе (play) и открывается кнопкой «Играть».
import type { L } from '@/lib/i18n'

export interface GameShot { file: string; w?: number; h?: number; alt: L<string> }
export interface GamePage {
  slug: string
  play: string                       // адрес самой игры (как в GAMES из seo.ts)
  repoDir: string                    // папка в github.com/esurvanov/awesome-games
  name: L<string>
  tagline: L<string>
  genre: L<string>
  // <meta description> и сниппет: 140–160 символов
  description: L<string>
  intro: L<string[]>
  features: L<string[]>
  controls: L<[string, string][]>
  facts: L<[string, string][]>
  faq: L<[string, string][]>
  shots: GameShot[]
  related: string[]
  keywords: L<string[]>
}

export const GAME_PAGES: GamePage[] = [
  {
    slug: 'chronicles-of-kingdoms',
    play: '/age-of-empires/web/',
    repoDir: 'age-of-empires',
    name: { ru: 'Хроники Королевств', en: 'Chronicles of Kingdoms' },
    tagline: { ru: 'Стратегия в реальном времени в духе Age of Empires II — прямо в браузере', en: 'A real-time strategy in the spirit of Age of Empires II — right in your browser' },
    genre: { ru: 'Стратегия в реальном времени (RTS)', en: 'Real-time strategy (RTS)' },
    description: {
      ru: 'Хроники Королевств — бесплатная RTS в браузере в духе Age of Empires II: 14 цивилизаций, 4 эпохи, 130+ технологий, до 7 ИИ-соперников. Без установки.',
      en: 'Chronicles of Kingdoms: a free browser RTS in the spirit of Age of Empires II — 14 civilizations, 4 ages, 130+ technologies, up to 7 AI opponents. No install.',
    },
    intro: {
      ru: [
        'Постройте деревню в Тёмных веках, обнесите её стеной, возведите замок, дойдите исследованиями до Имперской эпохи и сломите врага требушетами — против до семи ИИ-игроков на шести случайных картах.',
        'Это оригинальная открытая игра, написанная с нуля: правила и числа следуют классической Age of Empires II (сверка с Definitive Edition описана в документации), но без графики, музыки и названий оригинала. Игра запускается как обычный сайт — без установки и регистрации.',
      ],
      en: [
        'Build a village in the Dark Age, wall it in, raise a castle, research your way to the Imperial Age and break the enemy with trebuchets — against up to seven AI players on six random maps.',
        'It is an original open-source game written from scratch: the rules and numbers follow classic Age of Empires II (the check against the Definitive Edition is documented), with none of the original art, music or names. It runs like an ordinary website — no install, no sign-up.',
      ],
    },
    features: {
      ru: [
        '14 цивилизаций — свои юниты, технологии и командные бонусы',
        '4 эпохи (Тёмные века → Феодальная → Замков → Имперская) и дерево из 130+ технологий (F5 в игре)',
        'Более 75 типов юнитов: пехота, лучники, кавалерия, осадные машины, монахи, корабли',
        'Экономика: рынок, торговые повозки, реликвии, фермы; стены, ворота, башни, гарнизоны',
        'Морские бои: доки, рыбалка, транспорты, галеры, брандеры',
        '6 случайных карт (Аравия, Арена, Чёрный лес, Кочевник, Острова, Средиземноморье), 6 уровней ИИ, до 8 игроков, дипломатия',
        'Сохранение и загрузка, статистика после матча, 7 языков интерфейса',
      ],
      en: [
        '14 civilizations — unique units, unique techs and team bonuses',
        '4 ages (Dark → Feudal → Castle → Imperial) and a tree of 130+ technologies (F5 in game)',
        '75+ unit types: infantry, archers, cavalry, siege, monks, ships',
        'Economy: market trade, trade carts, relics, farms; walls, gates, towers, garrisons',
        'Naval warfare: docks, fishing, transports, galleys, fire ships',
        '6 random maps (Arabia, Arena, Black Forest, Nomad, Islands, Mediterranean), 6 AI levels, up to 8 players, diplomacy',
        'Save / load, post-game statistics, 7 interface languages',
      ],
    },
    controls: {
      ru: [['ЛКМ / рамка · двойной клик', 'выбрать · все такие же юниты на экране'], ['ПКМ', 'идти · добывать · строить · атаковать · гарнизон'], ['Q W E R T … (сетка)', 'команды выбранного юнита, как в панели'], ['Ctrl+1…9 · 1…9', 'назначить группу · выбрать группу'], ['H · . · ,', 'к центру города · свободный селянин · свободный воин'], ['F5 · F7 · F8', 'дерево технологий · быстрое сохранение · загрузка'], ['Колесо · стрелки · Space', 'масштаб · прокрутка · к выбранному']],
      en: [['LMB / drag · double-click', 'select · all of the same type on screen'], ['RMB', 'move · gather · build · attack · garrison'], ['Q W E R T … (grid)', 'commands of the selected unit, like the panel'], ['Ctrl+1…9 · 1…9', 'assign a group · select a group'], ['H · . · ,', 'town center · idle villager · idle military'], ['F5 · F7 · F8', 'tech tree · quick save · quick load'], ['Wheel · arrows · Space', 'zoom · scroll · go to selection']],
    },
    facts: {
      ru: [['Платформа', 'настольный браузер, без установки'], ['Первая загрузка', '≈ 65 МБ, дальше подгружается по мере игры'], ['Соперники', 'до 7 ИИ, 6 уровней сложности'], ['Языки интерфейса', 'русский, английский, немецкий, французский, испанский, португальский (Бразилия), итальянский'], ['Код', 'открытый, MIT (также версия на Python)']],
      en: [['Platform', 'desktop browser, no install'], ['First load', '≈ 65 MB, then streamed as you play'], ['Opponents', 'up to 7 AI players, 6 difficulty levels'], ['Interface languages', 'English, Russian, German, French, Spanish, Brazilian Portuguese, Italian'], ['Code', 'open source, MIT (a Python version too)']],
    },
    faq: {
      ru: [
        ['Это копия Age of Empires II?', 'Нет. Это самостоятельная открытая игра: механики и числа сверялись с Age of Empires II, но графика, музыка и названия свои (музыка и голоса — из открытой игры 0 A.D.).'],
        ['Нужно ли что-то устанавливать?', 'Нет. Игра работает на любой статической странице в браузере. Первый запуск загружает около 65 МБ ресурсов.'],
        ['Как сохраниться?', 'F7 — быстрое сохранение, F8 — загрузка; есть и слоты в меню игры. Сохранения лежат в вашем браузере.'],
        ['Можно ли получить код?', 'Да, весь код открыт под лицензией MIT: github.com/esurvanov/awesome-games.'],
      ],
      en: [
        ['Is this a copy of Age of Empires II?', 'No. It is an independent open-source game: the mechanics and numbers were checked against Age of Empires II, but the art, music and names are its own (music and voices come from the open-source 0 A.D.).'],
        ['Do I have to install anything?', 'No. The game runs as a plain web page. The first start downloads about 65 MB of assets.'],
        ['How do I save?', 'F7 quick-saves and F8 loads; there are also slots in the game menu. Saves stay in your browser.'],
        ['Can I get the code?', 'Yes, all of it is open under the MIT licence: github.com/esurvanov/awesome-games.'],
      ],
    },
    shots: [
      { file: 'battle.jpg', w: 1280, h: 800, alt: { ru: 'Хроники Королевств: сражение в открытом поле с осадными машинами', en: 'Chronicles of Kingdoms: an open-field battle with siege engines' } },
      { file: 'town.jpg', w: 1280, h: 800, alt: { ru: 'Хроники Королевств: византийский город', en: 'Chronicles of Kingdoms: a Byzantine town' } },
      { file: 'naval.jpg', w: 1280, h: 800, alt: { ru: 'Хроники Королевств: флот и док на карте «Острова»', en: 'Chronicles of Kingdoms: a fleet and dock on the Islands map' } },
    ],
    related: ['sibiria', 'zhitie'],
    keywords: { ru: ['стратегия в браузере', 'игра как Age of Empires', 'RTS онлайн без установки', 'открытая стратегия'], en: ['browser RTS', 'game like Age of Empires', 'free online strategy game', 'open source RTS'] },
  },
  {
    slug: 'berezovka',
    play: '/berezovka/',
    repoDir: 'berezovka',
    name: { ru: 'Березовка', en: 'Berezovka' },
    tagline: { ru: 'Заснеженная русская деревня, в которую можно зайти — 3D-игра с открытым миром в браузере', en: 'A snowbound Russian village you can walk into — an open-world 3D game in your browser' },
    genre: { ru: '3D-приключение с открытым миром', en: 'Open-world 3D adventure' },
    description: {
      ru: 'Березовка — 3D-игра в браузере: зимняя русская деревня размером около километра, история в 12 шагов, «Жигули», рыбалка и вьюга. Без установки.',
      en: 'Berezovka: a browser 3D game set in a snowbound Russian village — about 1 km² open world, a 12-step story, a Zhiguli to drive, ice fishing and blizzards. No install.',
    },
    intro: {
      ru: [
        'Вы выходите из старого автобуса в Березовке после пяти лет отсутствия. Бабушке нужны дрова, дедов «Жигули» 1979 года не заводится, у церковного колокола пропала верёвка, а кот продавщицы убежал в лес — мимо медведя. К вечеру вся деревня зависит от вас.',
        'Мир около одного квадратного километра: деревня, советский посёлок, церковь на холме, замёрзшая река и густой лес. Игра запускается прямо в браузере — без установки.',
      ],
      en: [
        'You step off the old bus into Berezovka after five years away. Grandma needs firewood, grandpa’s 1979 Zhiguli won’t start, the church bell has lost its rope and the shopkeeper’s cat is missing in the woods — past the bear. By evening the whole village depends on you.',
        'The world is about a square kilometre: the village, a Soviet settlement, a church on a hill, a frozen river and a deep forest. It runs right in the browser — no install.',
      ],
    },
    features: {
      ru: [
        'Открытый мир около 1 км²: деревня, посёлок, церковь, река, лес; 14 обжитых дворов',
        'История в 12 шагов: пять персонажей, диалоги с выбором, финал',
        'Можно сесть за руль «Жигулей»: подвески, крен кузова, радио с аккордеоном',
        'Живая природа: медведь, который бросается, хаски, убегающий кот, стадо оленей',
        'Подлёдная рыбалка: окунь, щука, ёрш, налим',
        'Смена дня и ночи, северное сияние, метель и туман; записанные звуки (скрип снега, настоящий колокол)',
        '12 спрятанных матрёшек по всей карте',
      ],
      en: [
        'An open world of about 1 km²: village, settlement, church, river, forest; 14 lived-in yards',
        'A 12-step story: five characters, dialogue with choices, a finale',
        'Drive the Zhiguli: suspension, body roll, a car radio with an accordion',
        'Wildlife: a bear that charges, a husky, a runaway cat, a herd of deer',
        'Ice fishing: perch, pike, ruffe, burbot',
        'Day and night, northern lights, blizzards and fog; recorded sound (snow footsteps, a real church bell)',
        '12 hidden matryoshkas across the map',
      ],
    },
    controls: {
      ru: [['W A S D + мышь', 'идти, смотреть (клик захватывает мышь)'], ['Shift · C', 'бег · переключить шаг/бег'], ['Пробел', 'прыжок · ручник в машине'], ['E', 'поговорить, поднять, ловить рыбу, позвонить в колокол'], ['F', 'сесть в машину / выйти'], ['R · M · H', 'радио · большая карта · подсказки']],
      en: [['W A S D + mouse', 'walk, look (click to capture the mouse)'], ['Shift · C', 'run · toggle walk/run'], ['Space', 'jump · handbrake in the car'], ['E', 'talk, pick up, fish, ring the bell'], ['F', 'get in / out of the car'], ['R · M · H', 'radio · big map · controls']],
    },
    facts: {
      ru: [['Платформа', 'настольный браузер с WebGL 2 (Chrome, Edge, Firefox, Safari 16+)'], ['Первая загрузка', 'около 33 МБ'], ['Управление', 'клавиатура и мышь; на сенсорных экранах — джойстик'], ['Код', 'открытый, MIT (three.js)']],
      en: [['Platform', 'desktop browser with WebGL 2 (Chrome, Edge, Firefox, Safari 16+)'], ['First load', 'about 33 MB'], ['Controls', 'keyboard and mouse; a joystick on touch screens'], ['Code', 'open source, MIT (three.js)']],
    },
    faq: {
      ru: [
        ['Нужна ли установка?', 'Нет, игра запускается в браузере. Нужен компьютер с поддержкой WebGL 2.'],
        ['Сколько нужно скачать?', 'При первом запуске загружается около 33 МБ.'],
        ['Работает ли на телефоне?', 'Для сенсорных экранов есть экранный джойстик и кнопки, но игра рассчитана прежде всего на компьютер.'],
        ['Почему игра может быть тёмной на слабом компьютере?', 'На слабых видеокартах игра сама отключает часть затенения по углам, чтобы сохранить плавность.'],
      ],
      en: [
        ['Do I need to install it?', 'No, it runs in the browser. You need a computer with WebGL 2.'],
        ['How much does it download?', 'About 33 MB on first start.'],
        ['Does it work on a phone?', 'Touch screens get an on-screen joystick and buttons, but the game is built mainly for desktop.'],
        ['Why might it look flatter on a weak computer?', 'On weaker GPUs the game switches part of the corner shading off by itself to stay smooth.'],
      ],
    },
    shots: [
      { file: 'street.jpg', w: 1280, h: 633, alt: { ru: 'Березовка: деревенская улица зимним днём', en: 'Berezovka: the village street on a winter day' } },
      { file: 'church.jpg', w: 1280, h: 633, alt: { ru: 'Березовка: церковь на холме', en: 'Berezovka: the church on the hill' } },
      { file: 'forest.jpg', w: 1280, h: 633, alt: { ru: 'Березовка: заснеженный лес', en: 'Berezovka: the snowy forest' } },
    ],
    related: ['echo-of-the-rift', 'sibiria'],
    keywords: { ru: ['3D игра в браузере', 'русская деревня игра', 'зимняя игра с открытым миром', 'игра без установки'], en: ['3D browser game', 'open world snow game', 'Russian village game', 'play in browser'] },
  },
  {
    slug: 'sibiria',
    play: '/sibiria/',
    repoDir: 'sibiria',
    name: { ru: 'Сибирь', en: 'Sibiria' },
    tagline: { ru: 'Четыре ночи в эвенкийской тайге, 1993 год — выживание и постройка поселения', en: 'Survive four nights in the Evenki taiga, 1993 — then build a settlement around your hut' },
    genre: { ru: 'Выживание и строительство поселения (вид сверху)', en: 'Top-down survival and settlement' },
    description: {
      ru: 'Сибирь — 2D-игра на выживание в тайге, 1993 год: холод, волки, медведь, избушка и поселение. Семь глав, пять финалов, играть в браузере без установки.',
      en: 'Sibiria: a top-down survival game in the Evenki taiga, 1993 — cold, wolves, a rogue bear, your hut and a settlement. Seven chapters, five endings. Play in the browser.',
    },
    intro: {
      ru: [
        'Январь 1993-го. Вертолёт Ми-8 борт 24713 упал на излучине реки в Эвенкии. Вы — Лёша, бортрадист. Рация разбита, экипажа нет, до людей несколько дней пути. Найдите старую охотничью избушку, затопите печь, познакомьтесь со старым эвенком Уркачаном и переживите четыре ночи.',
        'Дальше игра превращается в историю о поселении: нанимайте людей, стройте здания и поднимайтесь через эпохи, торгуйте за рубли — и всё это среди тайги, которая не прощает ошибок. Игра запускается в браузере без установки и сборки, есть версия для телефона.',
      ],
      en: [
        'January 1993. Mi-8 board 24713 went down on a river bend in Evenkia. You are Lyosha, the radio operator. The radio is smashed, the crew is gone, and the nearest people are days away. Find the old hunters’ hut, light its stove, meet the old Evenk Urkachan and get through four nights.',
        'Then the game turns into a settlement story: hire hands, build and climb through the ages, trade for roubles — all in a taiga that does not forgive mistakes. It runs in the browser with no install or build, and it works on phones.',
      ],
    },
    features: {
      ru: [
        'Семь глав: Обломки, Уркачан, Стая, Сигнал, затем Промысел, Зимовка или Экспедиция; записки и диалоги с сухим юмором',
        'Настоящий холод: тепло, голод, обморожение, метели — костёр единственное безопасное место',
        'Стая волков и медведь-шатун, который ломает коптильню и крадёт еду',
        'Своя избушка и своё поселение: до 8 видов построек, 4 эпохи, найм людей, торговля за рубли',
        'Управление в духе RTS: рамка выбора, приказы правой кнопкой, группы, сигнал тревоги',
        'Мир около 11 × 11 км в восьми зонах: наледь, гарь, курумник, голец и другие',
        'Пять концовок, три слота сохранения и автосохранение; адаптация под телефон',
      ],
      en: [
        'Seven chapters: Wreckage, Urkachan, The Pack, The Signal, then Trapping, Wintering or the Expedition; found notes and dry-humoured dialogue',
        'Real cold: warmth, hunger, frostbite, blizzards — a fire is the only safe place',
        'A hunting pack of wolves and a rogue bear that smashes the smokehouse and steals food',
        'Your own hut and settlement: up to 8 kinds of buildings, 4 ages, hiring hands, trading for roubles',
        'RTS-style control: box-select, right-click orders, groups, an alarm bell',
        'About 11 × 11 km of taiga in eight zones: aufeis, burnt forest, a boulder field, a bald peak and more',
        'Five endings, three save slots plus autosave; a phone-friendly layout',
      ],
    },
    controls: {
      ru: [['W A S D', 'движение'], ['E', 'действие: рубить, ловить рыбу, читать, говорить'], ['F · Q · R', 'костёр · еда · ловушка'], ['C · B', 'мастерская · строительство'], ['Рамка · ПКМ', 'выбрать людей · отдать приказ'], ['H · Esc', 'тревога/отбой · пауза'], ['Колесо · 0', 'масштаб · вернуться к герою']],
      en: [['W A S D', 'move'], ['E', 'act: chop, fish, read, talk'], ['F · Q · R', 'fire · eat · trap'], ['C · B', 'workshop · build'], ['Drag box · RMB', 'select people · give an order'], ['H · Esc', 'alarm / all clear · pause'], ['Wheel · 0', 'zoom · back to the hero']],
    },
    facts: {
      ru: [['Платформа', 'браузер на компьютере и на телефоне'], ['Установка', 'не нужна'], ['Прохождение', 'семь глав, пять концовок'], ['Код', 'открытый, MIT; без зависимостей и сборки']],
      en: [['Platform', 'browser on desktop and phone'], ['Install', 'none'], ['Playthrough', 'seven chapters, five endings'], ['Code', 'open source, MIT; no dependencies and no build']],
    },
    faq: {
      ru: [
        ['Это реальная история?', 'Нет, это вымышленный сюжет в реалиях Эвенкии 1993 года: персонажи и события придуманы.'],
        ['Можно ли играть на телефоне?', 'Да: есть джойстик, режим приказов и масштабирование щипком.'],
        ['Как сохраняться?', 'Спите в избушке — это сохраняет прогресс; есть три слота и автосохранение.'],
        ['Сколько длится игра?', 'Историю можно пройти за несколько вечеров; поселение и разные финалы дают повод вернуться.'],
      ],
      en: [
        ['Is it a true story?', 'No, it is fiction set in the realities of Evenkia in 1993: the characters and events are invented.'],
        ['Can I play on a phone?', 'Yes: there is a joystick, an order mode and pinch zoom.'],
        ['How do I save?', 'Sleep in the hut to save progress; there are three slots plus autosave.'],
        ['How long is it?', 'The story takes a few evenings; the settlement and different endings give reasons to return.'],
      ],
    },
    shots: [
      { file: 'village-day.jpg', w: 1280, h: 800, alt: { ru: 'Сибирь: дневной вид на избушку и поселение', en: 'Sibiria: daytime view of the hut and the settlement' } },
      { file: 'hut-inside.jpg', w: 1280, h: 800, alt: { ru: 'Сибирь: внутри избушки', en: 'Sibiria: inside the hut' } },
      { file: 'settlers.jpg', w: 1280, h: 800, alt: { ru: 'Сибирь: поселенцы за работой', en: 'Sibiria: settlers at work' } },
    ],
    related: ['berezovka', 'chronicles-of-kingdoms'],
    keywords: { ru: ['игра на выживание в тайге', 'выживание 1993 Эвенкия', 'игра про поселение', 'выживалка в браузере'], en: ['survival game browser', 'taiga survival game', 'settlement builder', 'Siberia game 1993'] },
  },
  {
    slug: 'echo-of-the-rift',
    play: '/ekho-razloma/',
    repoDir: 'ekho-razloma',
    name: { ru: 'Эхо Разлома', en: 'Echo of the Rift' },
    tagline: { ru: 'Потерпевший крушение пилот, полярный остров и светящийся разлом во льду — 3D-игра с сюжетом в браузере', en: 'A crashed pilot, a polar island and a glowing rift in the ice — a 3D story game in your browser' },
    genre: { ru: '3D-игра с открытым миром и сюжетом', en: 'Open-world 3D story game' },
    description: {
      ru: 'Эхо Разлома — 3D-игра с открытым миром: пилот разбился на полярном острове под северным сиянием. Отшельник, кристаллы, поющий разлом, два финала. В браузере.',
      en: 'Echo of the Rift: an open-world 3D story game — a pilot crashes on a polar island under the northern lights. A hermit, crystals, a singing rift, two endings. In the browser.',
    },
    intro: {
      ru: [
        'Ваш самолёт «Пустельга» падает на безымянный полярный остров под северным сиянием. ИИ станции по имени ИРИС будит вас в обломках. Старый отшельник Орм живёт здесь один уже одиннадцать лет — рядом с разломом во льду, который поёт.',
        'Остров размером 900 × 900 м: место крушения, полярная станция, замёрзшее озеро, руины, лес, морской лёд и Разлом. Снег помнит каждый шаг, ночь выглядит как ночь, а запускается всё это сразу в браузере — без установки.',
      ],
      en: [
        'Your plane, the “Kestrel”, goes down on a nameless polar island under the northern lights. The station AI IRIS wakes you in the wreck. An old hermit, Orm, has lived here alone for eleven years, next to a rift in the ice that sings.',
        'The island is 900 × 900 m: the crash site, a polar station, a frozen lake, ruins, forest, sea ice and the Rift. The snow remembers every step, the night looks like night, and it all starts straight in the browser — no install.',
      ],
    },
    features: {
      ru: [
        'Открытый остров 900 × 900 м: крушение, станция, озеро, руины, лес, морской лёд, Разлом',
        '5 глав и 2 концовки: диалоги с выбором, 8 записей-эхо, 24 кристальных осколка',
        'Снегоход-«скиммер»: вызывается клавишей T',
        'Снег, который помнит: каждый ботинок, копыто и лапа оставляют свой след',
        'Пилот опирается на скалы и стены, упирается в склоны, перепрыгивает низкие препятствия',
        'Живая природа: олени и другие животные; ночь с северным сиянием, лунными тенями, туманом и снегопадом',
        'Немного боя: кристальные существа и голем в Разломе; по желанию — ИИ-отшельник, отвечающий на ваш текст (нужен локальный сервер)',
      ],
      en: [
        'An open island, 900 × 900 m: crash site, station, lake, ruins, forest, sea ice, the Rift',
        '5 chapters and 2 endings: dialogue with choices, 8 echo recordings, 24 crystal shards',
        'A snow-skimmer vehicle: call it with T',
        'Snow that remembers: every boot, hoof and paw leaves its own print',
        'The pilot leans on rocks and walls, braces on slopes and vaults low obstacles',
        'Wildlife: stags and other animals; a night with aurora, moon shadows, fog and falling snow',
        'A little combat: crystal shardlings and a golem in the Rift; optionally an AI hermit who answers what you type (needs a local server)',
      ],
    },
    controls: {
      ru: [['W A S D · Shift · Пробел · C', 'ходьба · бег · прыжок · кувырок'], ['E · ЛКМ · Q · G', 'действие · резак · скан · помахать'], ['T', 'вызвать скиммер'], ['M · J · Esc', 'карта · журнал · пауза'], ['Y', 'поговорить с Ормом']],
      en: [['W A S D · Shift · Space · C', 'move · run · jump · roll'], ['E · LMB · Q · G', 'interact · cutter · scan · wave'], ['T', 'call the skimmer'], ['M · J · Esc', 'map · journal · pause'], ['Y', 'talk to Orm']],
    },
    facts: {
      ru: [['Платформа', 'настольный браузер с WebGL 2'], ['Качество', 'подстраивается под компьютер; на экранах Retina картинка рисуется в 1× и масштабируется'], ['Движок', 'без движка и сборки: three.js, физика Rapier'], ['Код', 'открытый, MIT']],
      en: [['Platform', 'desktop browser with WebGL 2'], ['Quality', 'adapts to the machine; on Retina screens the picture is rendered at 1× and scaled'], ['Engine', 'no engine and no build: three.js, Rapier physics'], ['Code', 'open source, MIT']],
    },
    faq: {
      ru: [
        ['Нужна ли установка?', 'Нет. Нужен настольный браузер с WebGL 2.'],
        ['Что делать, если картинка тормозит?', 'Игра подбирает качество под компьютер сама; на слабых машинах есть облегчённый режим.'],
        ['Есть ли связь с «Северным Разломом»?', 'Да: «Северный Разлом» — аркада в том же мире, тот же остров, увиденный с воздуха.'],
        ['Нужен ли ИИ-сервер?', 'Нет, игра проходится без него; сервер только добавляет живые ответы отшельника.'],
      ],
      en: [
        ['Do I need to install it?', 'No. A desktop browser with WebGL 2 is enough.'],
        ['What if it runs slowly?', 'The game picks a quality level for your machine; weaker computers get a lighter mode.'],
        ['Is it connected to Northern Rift?', 'Yes: Northern Rift is an arcade in the same world — the same island seen from the air.'],
        ['Do I need the AI server?', 'No, the game is complete without it; the server only adds live answers from the hermit.'],
      ],
    },
    shots: [
      { file: 'crash-site.jpg', w: 1280, h: 720, alt: { ru: 'Эхо Разлома: пилот у места крушения «Пустельги» в снегу', en: 'Echo of the Rift: the pilot at the Kestrel crash site in the snow' } },
      { file: 'rift-overview.jpg', w: 1280, h: 720, alt: { ru: 'Эхо Разлома: остров сверху — лес, Разлом и северное сияние', en: 'Echo of the Rift: the island from above — forest, the Rift and the aurora' } },
      { file: 'camp-night.jpg', w: 1280, h: 720, alt: { ru: 'Эхо Разлома: ночной лагерь', en: 'Echo of the Rift: the camp at night' } },
    ],
    related: ['northern-rift', 'berezovka'],
    keywords: { ru: ['3D игра с сюжетом в браузере', 'игра про полярный остров', 'северное сияние игра', 'игра без установки'], en: ['3D story game browser', 'polar island game', 'aurora game', 'open world three.js game'] },
  },
  {
    slug: 'northern-rift',
    play: '/severny-razlom/',
    repoDir: 'severny-razlom',
    name: { ru: 'Северный Разлом', en: 'Northern Rift' },
    tagline: { ru: 'Полёт по бесконечному ледяному каньону под северным сиянием — 3D-аркада в одном файле', en: 'Fly down an endless ice canyon under the northern lights — a one-file 3D arcade' },
    genre: { ru: '3D-аркада', en: '3D arcade' },
    description: {
      ru: 'Северный Разлом — 3D-аркада в браузере: маленький корабль летит по бесконечному ледяному каньону, собирает осколки и пробивает лёд. Комбо до ×8, три жизни.',
      en: 'Northern Rift: a 3D browser arcade — a small ship flies down an endless ice canyon, collects shards and bursts through the ice. Combos up to ×8, three hits. Play free.',
    },
    intro: {
      ru: [
        'Каньон никогда не кончается. Собирайте кристальные осколки, превращайте их в энергию и пробивайте ледяные стены. Облетайте препятствия сверху, снизу и сбоку, держите комбо и посмотрите, как далеко вы дойдёте до трёх попаданий.',
        'Это первая игра, сделанная в мире «Эха Разлома»: тот же остров, увиденный с воздуха. Весь мир нарисован кодом, без файлов изображений — игра помещается в один файл.',
      ],
      en: [
        'The canyon never ends. Collect crystal shards, turn them into energy, then burst through the ice walls. Fly around, over and under the obstacles, keep the combo alive and see how far you get before three hits bring you down.',
        'It is the first game made in the world of Echo of the Rift: the same island, seen from the air. The whole world is drawn in code, with no image files — the game fits in a single file.',
      ],
    },
    features: {
      ru: ['Бесконечный каньон: создаётся по мере полёта и никогда не повторяется', 'Осколки → энергия → пробить лёд: рывок прямо сквозь стену', 'Комбо от ×2 до ×8 за облёт препятствий', 'Три попадания — и заезд окончен', 'Северное сияние, звёзды, светящиеся кристаллы — всё нарисовано кодом', 'Сенсорное управление: на телефоне появляется кнопка рывка'],
      en: ['An endless canyon, generated as you fly and never the same twice', 'Shards → energy → break the ice: boost straight through walls', 'Combo ×2 … ×8 for weaving around, over and under', '3 hits — then the run is over', 'Aurora, stars, glowing crystals — everything drawn in code', 'Touch controls: a boost button appears on phones'],
    },
    controls: {
      ru: [['W A S D / стрелки', 'управление кораблём'], ['Пробел / Shift', 'рывок сквозь лёд'], ['Enter', 'старт']],
      en: [['W A S D / arrows', 'steer'], ['Space / Shift', 'boost through ice'], ['Enter', 'start']],
    },
    facts: {
      ru: [['Платформа', 'браузер на компьютере и телефоне'], ['Размер', 'один файл (three.js и шрифты подгружаются из сети)'], ['Режим', 'бесконечный заезд на очки'], ['Код', 'открытый, MIT']],
      en: [['Platform', 'browser on desktop and phone'], ['Size', 'one file (three.js and fonts are loaded from the network)'], ['Mode', 'endless score run'], ['Code', 'open source, MIT']],
    },
    faq: {
      ru: [
        ['Сколько длится заезд?', 'Пока вас не собьют трижды: он бесконечный, всё решает умение.'],
        ['Работает ли на телефоне?', 'Да, на сенсорном экране появляется кнопка рывка.'],
        ['Откуда игра?', 'Это первая игра из мира «Эха Разлома».'],
      ],
      en: [
        ['How long is a run?', 'Until you are hit three times: it is endless, skill decides.'],
        ['Does it work on a phone?', 'Yes, a boost button appears on touch screens.'],
        ['Where is it from?', 'It is the first game from the world of Echo of the Rift.'],
      ],
    },
    shots: [
      { file: 'flight.jpg', w: 1280, h: 720, alt: { ru: 'Северный Разлом: корабль в ледяном каньоне', en: 'Northern Rift: the ship in the ice canyon' } },
      { file: 'menu.jpg', w: 1280, h: 720, alt: { ru: 'Северный Разлом: стартовый экран', en: 'Northern Rift: the start screen' } },
    ],
    related: ['echo-of-the-rift', 'berezovka'],
    keywords: { ru: ['аркада в браузере', 'бесконечный раннер 3D', 'игра на реакцию без установки'], en: ['3D browser arcade', 'endless flyer game', 'one file game three.js'] },
  },
  {
    slug: 'skhodka',
    play: '/skhodka/',
    repoDir: 'skhodka',
    name: { ru: 'Сходка', en: 'Skhodka' },
    tagline: { ru: 'Субботний вечер IT-сообщества в баре в Батуми — 3D-игра про знакомства', en: 'A Saturday evening of an IT community at a bar in Batumi — a 3D game about meeting people' },
    genre: { ru: 'Социальная симуляция', en: 'Social simulation' },
    description: {
      ru: 'Сходка — 3D-игра в браузере: субботний вечер IT-сообщества в баре SushiGO в Батуми, 19:00–01:00. Знакомься, находи общие темы и знакомь людей друг с другом.',
      en: 'Skhodka: a 3D browser game — a Saturday evening of the IT community at the SushiGO bar in Batumi, 19:00–01:00. Meet people, find common topics and introduce them to each other.',
    },
    intro: {
      ru: [
        'Субботний вечер в баре SushiGO в Батуми, с 19:00 до 01:00, около 18 минут игрового времени. Вы участник местного IT-чата: знакомьтесь, находите общее и знакомьте друг с другом тех, кому это нужно.',
        'Все гости бара — собирательные персонажи с придуманными именами. Игра запускается в браузере без сервера и установки (three.js встроен); адрес с ?seed=42 повторяет тот же вечер.',
      ],
      en: [
        'A Saturday evening at the SushiGO bar in Batumi, 19:00 to 01:00, about 18 minutes of play. You are a member of the local IT chat: meet people, find common ground and introduce those who need each other.',
        'Everyone in the bar is a composite character with an invented name. The game runs in the browser with no server and no install (three.js is bundled); adding ?seed=42 to the address replays the same evening.',
      ],
    },
    features: {
      ru: ['Вечер в баре с 19:00 до 01:00: саксофон, караоке, дождь и общее фото в конце', 'Подходите к гостям, отвечайте карточками (клавиши 1–4), находите общие темы', 'Знакомьте двух людей друг с другом — кнопка «Познакомить»', 'Заказ напитков, групповое фото, телефон с чатом', 'Камера: перетаскивание, поворот, масштаб; управление мышью и касанием', 'Повторяемые вечера по числу в адресе (?seed=…)'],
      en: ['An evening in the bar from 19:00 to 01:00: sax, karaoke, rain and a group photo at the end', 'Walk up to guests, reply with cards (keys 1–4), find common topics', 'Introduce two people to each other with the “Познакомить” (Introduce) button', 'Order drinks, take the group photo, use the phone with the chat', 'Camera: drag, rotate, zoom; mouse and touch controls', 'Repeatable evenings via a number in the address (?seed=…)'],
    },
    controls: {
      ru: [['Клик по человеку или бирке', 'подойти и поговорить'], ['Клик по полу · по месту', 'идти · сесть'], ['Карточка · 1–4', 'ответить'], ['«Познакомить»', 'представить двух людей'], ['Esc', 'пауза, качество, звук']],
      en: [['Click a person or name tag', 'walk up and talk'], ['Click the floor · a seat', 'walk · sit'], ['Card · 1–4', 'reply'], ['“Познакомить” (Introduce)', 'introduce two people'], ['Esc', 'pause, quality, sound']],
    },
    facts: {
      ru: [['Длительность', 'около 18 минут'], ['Язык игры', 'русский'], ['Платформа', 'браузер, мышь и касание'], ['Код', 'открытый, MIT; без сервера и сборки']],
      en: [['Length', 'about 18 minutes'], ['Game language', 'Russian'], ['Platform', 'browser, mouse and touch'], ['Code', 'open source, MIT; no server and no build']],
    },
    faq: {
      ru: [
        ['Это реальные люди?', 'Нет, все гости — собирательные персонажи с придуманными именами.'],
        ['Нужен ли интернет и установка?', 'Установка не нужна; игра работает в браузере.'],
        ['Можно ли пройти заново так же?', 'Да: адрес с ?seed=42 воспроизводит тот же вечер.'],
      ],
      en: [
        ['Are they real people?', 'No, all the guests are composite characters with invented names.'],
        ['Do I need to install anything?', 'No installation; it runs in the browser.'],
        ['Can I replay the same evening?', 'Yes: the address with ?seed=42 replays the same one.'],
      ],
    },
    shots: [
      { file: 'game-02-profile.jpg', w: 1280, h: 800, alt: { ru: 'Сходка: профиль гостя', en: 'Skhodka: a guest profile' } },
      { file: 'game-05-hall-peak-2130.jpg', w: 1280, h: 800, alt: { ru: 'Сходка: зал бара в разгар вечера', en: 'Skhodka: the bar hall at the peak of the evening' } },
      { file: 'game-06-talk.jpg', w: 1280, h: 800, alt: { ru: 'Сходка: разговор с гостем', en: 'Skhodka: talking to a guest' } },
    ],
    related: ['zhitie', 'chronicles-of-kingdoms'],
    keywords: { ru: ['игра про знакомства', 'IT сообщество Батуми игра', 'социальная игра в браузере'], en: ['social simulation game browser', 'networking game', 'Batumi IT community'] },
  },
  {
    slug: 'zhitie',
    play: '/zhitie/',
    repoDir: 'zhitie',
    name: { ru: 'Житьё', en: 'Zhitiyo' },
    tagline: { ru: 'Симулятор жизни в духе The Sims 1: изометрический low-poly район из десяти семей', en: 'A life simulation in the spirit of The Sims 1: an isometric low-poly neighbourhood of ten households' },
    genre: { ru: 'Симулятор жизни', en: 'Life simulation' },
    description: {
      ru: 'Житьё — симулятор жизни в браузере в духе The Sims 1: изометрическое 3D, район из десяти семей, потребности, карьера, отношения, режимы «Покупка» и «Стройка».',
      en: 'Zhitiyo: a browser life sim in the spirit of The Sims 1 — isometric low-poly 3D, ten households, needs, careers, relationships, Buy and Build modes. No install.',
    },
    intro: {
      ru: [
        'Переезжайте в Берёзовую рощу — небольшой район из десяти семей, парка, кафе, магазина, спортзала и библиотеки. Возьмите под управление семью, следите, чтобы все были сыты, выспались и довольны, ходите на работу, заводите дружбу и романы, обставляйте и достраивайте дом.',
        'Это оригинальная игра, сделанная с нуля по механике жанра: без названий, графики, музыки и интерфейса The Sims или EA — свой визуальный язык и своя тарабарщина вместо речи. Запускается в браузере без установки и сборки.',
      ],
      en: [
        'Move into Berёzovaya Roshcha (Birch Grove), a small neighbourhood of ten households, a park, a café, a shop, a gym and a library. Take control of a family, keep everyone fed, rested and happy, hold down a job, build friendships and romances, furnish and extend the house.',
        'It is an original mechanics clone, built from scratch: no Sims or EA names, art, music or UI — its own visual language and its own gibberish speech. It runs in the browser with no install and no build.',
      ],
    },
    features: {
      ru: ['Живой район: 10 семей, между которыми можно переключаться, и общие места', 'Потребности и настроение: голод, энергия, гигиена, туалет, веселье, общение, комфорт', 'Отношения: дружба, романы, тайные связи, семейные ссоры; 86 социальных действий', 'Режимы «Покупка» и «Стройка»: 38 предметов мебели, стены, полы, окна, несколько этажей и крыши', 'Смена дня и ночи, классическая изометрическая камера (4 поворота, 3 уровня масштаба)', 'Low-poly 3D, все модели и анимации под лицензией CC0'],
      en: ['A living neighbourhood: 10 households you can switch between, plus shared lots', 'Needs and mood: hunger, energy, hygiene, bladder, fun, social, comfort', 'Relationships: friendships, romances, secret affairs, family feuds; 86 social interactions', 'Buy and Build modes: 38 furniture pieces, walls, floors, windows, several floors and roofs', 'Day and night cycle, a classic isometric camera (4 rotations, 3 zoom levels)', 'Low-poly 3D, every model and animation under CC0'],
    },
    controls: {
      ru: [['Клик по человеку или предмету', 'радиальное меню действий'], ['Клик по клетке', 'идти туда'], ['F1 · F2 · F3', 'Жизнь · Покупка · Стройка'], ['P · 0–3', 'пауза · скорость игры'], ['Пробел', 'следующий член семьи'], ['Перетаскивание · колесо', 'поворот · масштаб']],
      en: [['Click a sim or an object', 'radial action menu'], ['Click a tile', 'walk there'], ['F1 · F2 · F3', 'Live · Buy · Build'], ['P · 0–3', 'pause · game speed'], ['Space', 'next household member'], ['Drag · wheel', 'rotate · zoom']],
    },
    facts: {
      ru: [['Платформа', 'современный браузер на компьютере'], ['Движок', 'three.js, модули ES'], ['Установка', 'не нужна'], ['Код', 'открытый, MIT; ресурсы CC0']],
      en: [['Platform', 'a modern desktop browser'], ['Engine', 'three.js, ES modules'], ['Install', 'none'], ['Code', 'open source, MIT; assets CC0']],
    },
    faq: {
      ru: [
        ['Это The Sims?', 'Нет. Это независимая игра, повторяющая механику жанра, без чужих названий, графики и музыки.'],
        ['Нужна ли установка?', 'Нет, игра работает в браузере.'],
        ['Можно ли перестраивать дом?', 'Да, в режимах «Покупка» и «Стройка»: мебель, стены, полы, окна, этажи и крыши.'],
      ],
      en: [
        ['Is this The Sims?', 'No. It is an independent game that follows the genre’s mechanics, with no one else’s names, art or music.'],
        ['Do I need to install it?', 'No, it runs in the browser.'],
        ['Can I rebuild the house?', 'Yes, in Buy and Build modes: furniture, walls, floors, windows, floors and roofs.'],
      ],
    },
    shots: [
      { file: 'neighborhood.jpg', w: 1280, h: 678, alt: { ru: 'Житьё: карта района Берёзовая роща', en: 'Zhitiyo: the Birch Grove neighbourhood map' } },
      { file: 'home.jpg', w: 1280, h: 678, alt: { ru: 'Житьё: интерьер дома', en: 'Zhitiyo: a house interior' } },
    ],
    related: ['skhodka', 'chronicles-of-kingdoms'],
    keywords: { ru: ['симулятор жизни в браузере', 'игра как The Sims', 'изометрическая игра онлайн'], en: ['life sim browser', 'game like The Sims', 'isometric low-poly game'] },
  },
]

export const gamePage = (slug: string) => GAME_PAGES.find((g) => g.slug === slug)
export const gamePageByPlay = (play: string) => GAME_PAGES.find((g) => g.play === play)
