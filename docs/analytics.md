# Аналитика: события сайта и игр

Счётчики: Яндекс Метрика `113095127`, GA4 `G-G92B9DXR26` (ID — в `analytics.json`).
Каждое событие уходит в обе системы одним вызовом: `ym(id, 'reachGoal', name, params)` и `gtag('event', name, params)`.
Если счётчики заблокированы или ID пустой — ничего не отправляется, сайт и игры работают как обычно.

Код:
- сайт — `src/lib/analytics.ts` (`track()`, один обработчик кликов на весь документ, секции и прокрутка);
- игры — `scripts/patch-games.mjs` (`gameTracker()`), встраивается в страницу игры при выкладке.

## События

| Событие | Когда | Параметры |
|---|---|---|
| `outbound_click` | клик по любой внешней ссылке | `url` (без query/hash), `host`, `label`, `section`, `page` |
| `contact_click` | клик по контакту (Telegram, LinkedIn, GitHub, Stack Overflow, GetMentor) — на главной и «Обо мне» | `network`, `section`, `page` |
| `game_open` | переход с сайта к игре | `game`, `from` (страница), `section` |
| `nav_click` | внутренняя ссылка внутри навигации (шапка, оглавление на главной, крошки) | `target`, `label`, `section`, `page` |
| `material_click` | любая другая внутренняя ссылка (материалы, ссылки, блог) | `target`, `label`, `section`, `page` |
| `cta_click` | заметные кнопки: `choose_city` («Выбрать свой город»), `city_chip`, `theme_chip` (чаты Jaiora, `label` — английское название), `lang_switch` (`label` — на какой язык) | `id`, `label`, `section`, `page` |
| `section_view` | секция страницы видна ≥ 50% (или занимает пол-экрана) не меньше 1 с; по разу за просмотр страницы | `section`, `page` |
| `scroll_depth` | прокрутка до 25 / 50 / 75 / 100%; по разу за просмотр страницы | `depth`, `page` |
| `game_start` | первое нажатие/клавиша/касание в игре | `game` |
| `game_play_1m` … `game_play_30m` | набрано 1 / 5 / 15 / 30 минут активной игры (по разу) | `game` |
| `game_session_end` | вкладку с игрой свернули или закрыли | `game`, `seconds` (новые секунды с прошлой отправки — можно суммировать), `total_seconds`, `minutes_bucket` (`0-1`, `1-5`, `5-15`, `15-30`, `30+`) |

Один клик может дать два события: контакт → `contact_click` + `outbound_click`, чат города → `cta_click` + `outbound_click`.

**Активное время игры** — тики по 5 с, засчитываются только при видимой вкладке и если игрок что-то делал за последние 60 с.
`game_session_end` может прийти несколько раз за визит (каждое сворачивание после новой игры), поэтому `seconds` — только прирост.
В Метрику прирост также уходит параметром визита `game_seconds.<игра>`.

**`section`** — имя ближайшей размеченной области: `data-track-section`, иначе `id` элемента, иначе `aria-labelledby` у `<section>`, иначе `header`/`nav`/`footer`/`main`.
Примеры: `/about` — `hero`, `contacts`, `about-path`, `about-places`, `about-ach`, `about-edu`; `/jaiora` — `hero`, `meet`, `rules`, `find`, `done`, `story`, `have`, `cities`, `theme_chats`, `help`; `/materials` — `m-pres`, `m-games`; `/links` — `jaiora`, `about_me`, `talks`, `telegram_channels`; шапка — `site_nav`.

**`page`** — путь без слэша на конце: `/about`, `/en/jaiora`.

Игры (`game`): `age-of-empires`, `berezovka`, `sibiria`, `lars`.

## Разметка в компонентах

Автоматики хватает для ссылок. Где нужно больше:
- `data-track-section="имя"` — имя области (и она участвует в `section_view`);
- `data-track="cta"` + `data-track-id="id"` — кнопка попадёт в `cta_click`;
- `data-track-network="telegram"` — ссылка попадёт в `contact_click`;
- `data-track-label="..."` — подпись вместо текста ссылки.

## Яндекс Метрика: что настроить вручную

1. Настройки → Цели → Добавить цель → «JavaScript-событие», идентификатор = имя события.
   Минимум: `game_start`, `game_play_1m`, `game_play_5m`, `game_play_15m`, `game_play_30m`, `game_open`, `contact_click`, `outbound_click`, `cta_click`.
   По желанию: `game_session_end`, `section_view`, `scroll_depth`, `nav_click`, `material_click`.
2. Смотреть: Отчёты → Конверсии (по целям); Отчёты → Содержание → Параметры визитов (параметры событий и `game_seconds`); Карта кликов включена. Вебвизор выключен намеренно (запись сессий раздувала вес страницы и портила Best Practices в Lighthouse из-за куки) — на цели и события это не влияет.

## GA4: что настроить вручную

1. События появятся сами в Отчёты → Вовлечённость → События (через сутки; сразу — в DebugView/Realtime).
2. Администратор → Пользовательские определения → Создать измерение (область «Событие»), параметр события = имя:
   `game`, `section`, `page`, `url`, `host`, `label`, `network`, `target`, `id`, `from`, `depth`, `minutes_bucket`.
3. Там же → Пользовательские показатели: `seconds` (единица — секунды) — суммарное время в играх.
4. Администратор → События → отметить как ключевые: `game_start`, `game_play_5m`, `contact_click`.
5. Смотреть: Исследования → «Произвольный формат»: строки `game` / `section` / `url`, значение — «Количество событий» или `seconds`.
