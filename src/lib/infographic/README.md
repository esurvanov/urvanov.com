# Инфографика сайта: библиотека и словарь цветов

Все схемы сайта собираются из этой библиотеки, чтобы детали и цвета везде значили одно и то же.

| Файл | Что внутри |
|---|---|
| `palette.ts` | цвета `M` / `A` / `W`, `S2` (пол), `HALO` (светлая подложка под кабелем, разъёмами, плашками), `ROLE`, `LEGEND` |
| `iso.ts` | класс `Iso` (изометрический островок): пол, человек, агент, куб, документ, панель, цилиндр, стрелки, подписи, бегущая точка, жук, зона; `isoScene()`, `tw()`, `dash` |
| `scene.ts` | `Canvas` (холст поста: островки + детали в координатах картинки), `Scene`, `renderScene()` |
| `marks.ts` | мелкие детали в координатах картинки: значки, кружки-метки, плашки, пузыри, кабель MCP, кривые (функции → строка SVG) |
| `frame.ts` | `frame()` — готовый `<svg>`: подгонка рамки, легенда (только цвета, что есть на схеме), подпись |
| `flat.ts` | плоские схемы: карточки, подписи и стрелки с классами CSS, значки, ступени, диаграмма последовательности, оси графика, шкала, ряды точек |

Пример (глоссарий): `const I = isoScene(); I.agent(0, 0, ROLE.agent); I.person(2, 2, ROLE.human); const svg = frame(I, { caption, lang })`.
Пример (пост): рецепт в `src/data/blogArt/<пост>.ts`, `draw: (c, l) => { const i = c.iso(130, 122, 26); i.tile(-1.5, -1.5, 3, 3); i.panel(-1.1, -0.6, 2.2, 1.6, A, bandTitle('Jira'), 1); c.step(130, 192, 1, l('Подключить', 'Connect')) }`.
Выбирайте цвет через `ROLE`, а не оттенок. `c.raw()` / `I.add()` с готовой строкой SVG — только для разовой формы; всё повторяющееся — сначала деталь в библиотеку.

## Детали

### Островок `Iso` (координаты сетки gx, gy, gz)

| Деталь | Подпись | Что рисует |
|---|---|---|
| пол | `tile(gx, gy, w, d, { col, h, grid, dash, edge })` | плитка с сеткой; `dash`/`edge` — пунктирная граница (песочница) |
| куб | `box(gx, gy, gz, w, d, h, col, op?)` | объёмный брусок |
| человек | `person(gx, gy, col, label?, gz?)` | фигурка с подписью (`''` — без подписи) |
| агент | `agent(gx, gy, col, k?, label?)` | кубик с антенной и глазами, k — масштаб |
| документ | `doc(gx, gy, gz, w, d, col, lines?, tick?)` | лист со строками; `tick: true` — галочка цвета листа, строка — галочка этого цвета |
| окно | `panel(gx, gy, w, h, col, title?, rows?, filled?, gz?, d?)` | окно с тёмной шапкой и строками; `title` — строка или `{ text, size, x }` |
| надпись на шапке | `bandTitle(text, size?)` | `title` для `panel` в постах: x = 0.95, кегль 8.5 |
| цилиндр | `cyl(gx, gy, gz, r, h, col)` | база данных |
| путь | `path(pts, col, { w, dash, arrow, op, z, cls })` | линия по полу, со стрелкой |
| площадка | `pad(gx, gy, col, r?, op?)` | диск на полу; `op` — бледный (пропущенный шаг) |
| жук | `bug(gx, gy, col = W, gz?)` | баг, стоит на полу |
| зона | `zone(gx, gy, w, d, col, { gz, op = .2, dash = '4 3' })` | плоский прямоугольник с пунктиром: пусто, сэкономлено, не хватает |
| подпись | `text(gx, gy, t, col, { gz, size, w, dx, dy, halo, ls })` | текст поверх островка; `ls` — разрядка |
| бегущая точка | `pulse(pts, col, dur?)` | анимация порядка работы |

Порядок: внутри островка объекты сортируются по глубине; островки и детали холста рисуются в порядке вызова. Нужен слой поверх объектов островка — второй `c.iso()` с тем же началом координат.

### Холст `Canvas` (координаты картинки x, y)

| Деталь | Подпись | Что рисует |
|---|---|---|
| островок | `iso(ox, oy, U?)` | новый `Iso` с началом координат в пикселях |
| стрелка | `arrow(x1, y1, x2, y2, col, { w, dash, head, op, cls })` | прямая стрелка |
| стрелка «было → стало» | `thenArrow(x1, x2, y, col = M, w = 2)` | горизонтальная, с широким открытым наконечником, между колонками |
| подпись | `text(x, y, t, col, { size, w, anchor, halo, op, ls, underline })` | текст; `ls` — разрядка, `underline` — ссылка |
| заголовок колонки | `caps(x, y, t, col, { size = 11, ls = '.08em' })` | капсом с разрядкой: БЫЛО / СТАЛО |
| шаг | `step(x, y, n, label?, col = A)` | кружок с цифрой и подпись на 30 px ниже |
| кружок-метка | `badge(x, y, col, glyph?, { r = 11, size = 13, dy, shade, mark, k })` | кружок со знаком (цифра, !, ?, ✓, ×, ↗); `mark: 'check' \| 'cross'` — нарисованная галочка/крест; `shade` — объём |
| галочка | `check(x, y, k = 1, col = '#fff', w = 3)` | галочка, (x, y) — середина |
| галочка документа | `tick(x, y, col = A)` | маленький кружок с галочкой, как у `doc(..., tick)` |
| кружок | `dot(x, y, r, col, { ring, op })` | залитый кружок или кольцо |
| шарик | `ball(x, y, r, col)` | кружок с бликом |
| прямоугольник | `rect(x, y, w, h, { rx, fill, fillOp, stroke, sw, dash, op })` | столбик, подложка, контур |
| плашка | `pill(x, y, w, h, col, { rx, fill = HALO, fillOp, sw })` | капсула с обводкой (подпись — отдельным `text`) |
| клавиша | `keycap(x, y, t, col = M, w = 42)` | клавиша с надписью (Ctrl+C) |
| пузырь | `bubble(x, y, w, h, col = M, { op, rx, tail, stroke })` | реплика; `tail = [отступ, сдвиг кончика, длина, ширина основания]` |
| глаз | `eye(x, y, col = M)` | смотрит, проверяет |
| ключ | `key(x, y, col = A)` | вход, доступ, секрет |
| лупа | `lens(x, y, col = M)` | поиск |
| карандаш | `pen(x, y, col = M)` | ручная запись |
| плёнка | `film(x, y, col = A)` | запись видео/GIF |
| флажок | `flag(x, y, col = A)` | финиш, цель |
| жук | `bug(x, y, col = W, sh = 6)` | баг; (x, y) — туловище, `sh` — отступ тени |
| воронка | `funnel(x, y, col = A, { rx, neck, h })` | сжатие многого в немногое |
| разъём | `plug(x, y, col = A, { s, rx, halo })` | квадратик-разъём на конце провода |
| кабель MCP | `cable(x1, y1, x2, y2, col = A)` | толстая линия на подложке и разъёмы на концах |
| ломаная | `line(pts, col, { w, dash, op, cap })` | ось, черта, самодельный наконечник |
| кривая | `curve(x1, y1, x2, y2, col, { c1, c2, w, dash, cap })` | плавная кривая; без `c1/c2` — S-образная по горизонтали |
| значок ссылки | `extLink(x, y, col = M, s = 7, w = 1.6)` | ↗ после подписи-ссылки |
| ссылка | `link(href, () => { … })` | всё нарисованное внутри — ссылка; `http…` — в новой вкладке |
| своё | `raw(svg)` | разовая форма, когда детали нет |

Те же детали есть функциями в `marks.ts` (`badge(...)`, `eye(...)`, …): они возвращают строку SVG, её можно положить в островок через `I.add(глубина, eye(...I.p(gx, gy, gz)))`.

### Плоские схемы `flat.ts` (на холсте — одноимённые методы `c.*`)

Для схем без изометрии: карточки, графики, шкалы, диаграммы последовательности. `cls` — класс CSS вместо цветов: деталь пишет только геометрию, раскрашивает CSS поста (схемы `rv-*`, `lp-*`, `dm-*`, Венн).

| Деталь | Подпись | Что рисует |
|---|---|---|
| прямоугольник / кружок / эллипс | `box(x, y, w, h, { rx, cls, fill, fillOp, stroke, sw, strokeOp, dash, op, style })`, `circ(x, y, r, …)`, `oval(x, y, rx, ry, …)` | пишет только заданные атрибуты |
| путь | `edge(d, { cls, marker, stroke, … })` | готовый `d`; `marker` — id наконечника (`marker-end`) |
| подпись | `label(x, y, t, { cls, anchor, size, w, col, op, ls })` | без `anchor` — от левого края, без `col` — цвет из CSS |
| карточка | `card(x, y, w, h, col, { rx = 12, fillOp = .1, sw = 2, stroke, fill, dash, strokeOp, lines })` | узел схемы; `lines: [{ t, dy, dx?, size, w, col }]`, без `dx` — по центру |
| наконечник | `marker(id, { cls \| style })`, в `c.defs(...)` | треугольник 10×10 для `edge(..., { marker })` |
| маска | `clip(id, shape)`, `circlePath(cx, cy, r)`, `c.clipped(id, () => …)` | Венн: «исключающее или» кругов через evenodd |
| печать | `seal(x, y, col, 'check' \| 'lock', { r = 15, ck, w })` | кружок с галочкой (наше, готово) или замком (чужое, закрыто) |
| тревога | `alert(x, y, col = W, r = 10)` | кружок с нарисованным «!» |
| робот | `bot(x, y, k = 1, col = A)` | плоский агент, (x, y) — низ ног |
| значок | `icon(x, y, name, col, { k, w = 2, solid, round })` | `ICONS`: book, chat, warn, file, lock, bell (`solid`), user, doc, checklist |
| ступень | `layer(x, y, w, n, name, { h = 36, sub, col = M, fillOp })` | уровень лестницы (OSI, слои): номер, название, подпись |
| метка шага | `stepTag(x, y, n, t, col = W)` | кружок r 7 с цифрой и подпись справа (внутри ступени) |
| линия жизни | `lifeline(x, y, t, y2, { w = 110, h = 30 })` | участник диаграммы последовательности |
| сообщение | `message(x1, x2, y, t, col = 'currentColor')` | стрелка между линиями жизни с подписью |
| оси графика | `c.chart(x0, x1, yTop, yBot, { title, xTitle, yTicks, xTicks })` → `pt(i, доля)` | сетка, засечки, подписи; `pt` — точка для ряда |
| ряд данных | `series(pts, col, { w = 3.5, dots, join })` | линия по точкам, `dots` — радиус точек |
| шкала | `scale(x, y, bands, { h = 26, ticks, start, unit })` | полосы-диапазоны с заголовком, строками и значком, пороги между ними |
| ряд точек | `dotRow(x, y, n, filled, col, { gap = 8.4, r = 3, ring })` | счётчик: залитые и пустые кружки |
| подсказка | `c.title(t)` | `<title>` рисунка |

Сцена (`Scene`) для плоской схемы: `cls` — класс `<svg>`, `style` — свой style (`''` — без него, размер задаёт CSS), `attrs` — атрибуты `<svg>`, которые наследуют детали (`fill="none"`, `stroke="currentColor"`). `legend: false` — для графиков, шкал, версий и схем на CSS-классах, где цвета не про роли.

## Color vocabulary

One meaning per color, everywhere on the site (glossary, blog, embeds, architecture pages).
The glossary renders a legend under every illustration with exactly these meanings, so diagrams must match it.

| Color | CSS | Means | Examples |
|---|---|---|---|
| grey | `var(--muted)` (glossary/blog SVG), `var(--ink-3)` | model, people, external systems & data | LLM, "вы", QA, client, developer, Jira, Sentry, Grafana, GitLab, Confluence, documents, warehouse system, stand as an external thing |
| blue | `var(--accent)` | the agent and its harness | agent, MCP server/connector, tools the agent calls (as harness parts), checks/tests/linters, rules, skills, CLAUDE.md, project bible, permissions, hooks, the agent's steps/actions |
| orange | `var(--warn)` | risk, stop, boundary | error, bug, broken thing, blocked/closed path, sandbox border, "stop / needs a human", escalation arrow, limit exceeded, prompt injection, hallucination, write-without-confirmation |

## Hard rules
1. **People are always grey.** Never blue, never orange. A person in pain / overloaded is still grey; put the pain (error, overload marker, manual-retelling arrow) in orange if it is a risk, otherwise grey.
2. **The agent is always blue.** Never grey or orange. The "bad option" agent (e.g. "one agent for everything") is still blue; mark what is wrong with it (overload, conflict) in orange.
3. **External systems and data are grey**, even when the agent reads them through MCP. The MCP connector / access arrow from agent is blue.
4. **Orange only for risk/stop/boundary.** Not for "the other option", "the old way", a product brand, or a second category.
5. **Before/after ("было / стало", "вручную / с агентом").** Do NOT recolor the whole "before" scene orange. Before scene: people and systems grey, the manual work grey; only the actual risk spots (errors, lost info, delays called out as problems) orange. After scene: agent and harness blue, people and systems grey. Distinguish "before" by its label and, if needed, a lower opacity (e.g. `opacity=".55"` on the before group) — not by hue.
6. **No extra semantic hues** (green `--c-work`, rose `--c-team`, tan `--c-proj`, purple `--pp`/`--c-code`, indigo `--c-chat`) in concept diagrams. Map: error/fail/back-loop/rose → orange; ok/pass/good/green → blue if it is the harness/agent result, otherwise grey with a ✓; checks/sensors/review/tan → blue (checks are harness); categorical layers of the harness (spec, bible, rules, skills) → blue, differentiate by shade (opacity .55/.75/1), icon or label, not hue.
7. **Exempt:** pure data charts (bar/line charts of real numbers, usage reports, interview segment charts with categorical `--c-*` series). Leave them as is. If unsure whether something is a data chart or a concept diagram, treat as concept diagram only if it contains people/agents/systems.
8. Keep the point of each diagram. If recoloring would erase the contrast the diagram is about, keep the contrast via shape, dash, opacity, label or position, and say so in your report.
9. Keep RU (`*.md`) and EN (`*.en.md`) versions in sync: same recolor in both.
10. Light and dark theme both use the CSS vars, so never introduce hex colors.

## Isometric SVG primitives (as rendered by src/lib/termArt.ts and pasted into posts)
- person: `<rect ... width="16" height="21" rx="8" fill="COLOR"/>` + head `<circle ... r="7.5" fill="COLOR"/>` + label `<text ... fill="COLOR">` — change all three fills.
- agent: a box (three polygons with the same fill) with an antenna sphere and two dark eye circles; label text below.
- box/doc/cylinder: polygons/paths with `fill="var(--...)"`; shading overlays use `#000`/`#fff` — leave those.
- arrows: `<path ... stroke="var(--...)" stroke-dasharray=...>` + arrowhead path with same stroke.
