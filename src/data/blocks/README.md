# Библиотека блоков статей

Блоки — короткие метки в тексте поста вместо ручной вёрстки. При сборке метка разворачивается в готовый
статический HTML (как `<iso-art>` для схем), поэтому страница, её текст и SEO — обычный HTML.
Витрина всех блоков: `/materials/blocks/` и `/en/materials/blocks/` (noindex, не в sitemap, llms и RSS).

## Пост на блоках

```html
<b-post series="prompts">
<b-cap>Подпись под вводной схемой.</b-cap>

<b-chapter id="iterate" icon="refresh" title="Если ответ не подошёл">
  <b-art names="harness-work-approaches/answer-paths harness-work-approaches/answer-paths-mobile"/>
  <b-sublabel top="22">Шаг 1</b-sublabel>
  <b-prompt>
    [описание задачи]
    Задай мне 3 вопроса.
  </b-prompt>
  <b-finding>
    <ex>Что в этом примере.</ex>
    <gen>Общее правило<b-proof href="https://…" quote="Кто: «цитата» — адрес"/>.</gen>
    <do>Что сделать.</do>
  </b-finding>
</b-chapter>

<b-chapter id="next" title="Дальше по теме">
  <b-links cols="2">
    <item href="/blog/…/" k="Рубрика" t="Название">Одна строка о чём</item>
  </b-links>
</b-chapter>
<b-footer>На чём основан текст.</b-footer>
</b-post>
```

Правила:

- Весь пост — внутри одного `<b-post series="…">`. Серия задаёт только токены (акцент), вёрстка блоков общая.
- Метка блока — `<b-имя …>…</b-имя>` или пустая `<b-имя …/>`. Вложенные элементы (`<item>`, `<step>`, `<node>`,
  `<ex>`…) — только внутри своего блока.
- Значения атрибутов — как в HTML: `&amp;`, `&#39;`, «ёлочки» пишутся как есть.
- Переносы строк и отступы между метками исчезают (как в JSX): пишите метки в столбик. Встроенные элементы,
  между которыми нужен пробел, держите на одной строке.
- Внутри текстовых блоков работает строчный markdown: `**жирный**`, `` `код` ``, `[ссылка](/путь/)`.
- В `<b-post>`, `<b-chapter>` и `<b-table>` можно писать markdown абзацами — отделяйте его пустыми строками.
- `<b-prompt>` берёт текст как есть: переносы строк сохраняются, общий отступ срезается.
- Значки — по имени из `icons.ts` (атрибут `icon`, метка `<b-icon name="…"/>`), не копией `<svg>`.
- Неизвестная метка, неизвестный или недостающий атрибут, вложенный элемент не на месте, незакрытая метка,
  неизвестный значок — ошибка сборки с файлом и строкой.

## Новый блок

Один файл `defs/<имя>.ts` (и, если нужны стили, `defs/<имя>.css`) — больше ничего не правится: реестр
и стили подхватываются сами (`import.meta.glob`).

```ts
import { defineBlock, inline } from '../core'

export default defineBlock({
  tag: 'note',                       // метка <b-note>
  title: 'Заметка',                  // название на витрине
  doc: 'Что это и когда ставить.',
  attrs: { kind: { doc: 'вид', values: ['info', 'warn'] } },
  slots: { item: { doc: 'пункт', attrs: { t: { doc: 'заголовок', required: true } } } },
  render: ({ attrs, children, slots, l }) => `<div class="bk-note">${inline(children)}</div>`,
  example: { ru: '<b-note>Пример</b-note>', en: '<b-note>Example</b-note>' },  // для витрины
})
```

CSS: каждый селектор начинается с `.s-rich.bk`, классы — с `bk-` (модификаторы тоже: `bk-note-wide`).
Так старые стили серий и общие правила сайта блок не задевают. Ссылка-элемент (карточка, кнопка, значок)
всегда с классом: общая стрелка сайта ставится только ссылкам без класса. Цвета — токены (`var(--accent)`…).

## Блоки

| Метка | Атрибуты (* — обязательный) | Вложенные элементы |
|---|---|---|
| `b-post` | series* | — |
| `b-chapter` | id*, title*, icon, sw | — (markdown абзацами) |
| `b-finding` | title | `<ex k>`, `<gen k>`, `<do k>` |
| `b-proof` | href*, quote* | — |
| `b-links` | cols (1/2/3) | `<item href* k* t* ext>` |
| `b-why` | align (left), top | — |
| `b-cap` | — | — |
| `b-sublabel` | top | — |
| `b-lead` | tight | — |
| `b-credit` | tight | — |
| `b-subhead` | — | — |
| `b-footer` | compact | — |
| `b-prompt` | — | — (текст как есть) |
| `b-art` | names*, wide | — |
| `b-cta` | href*, k*, t*, icon, sw | — |
| `b-flow` | label*, lead | `<b-lane>` внутри |
| `b-lane` | title*, color*, top | `<node icon* t*>` |
| `b-steps` | top, round | `<step t* hl>` |
| `b-table` | id | HTML- или markdown-таблица |
| `b-legend` | — | `<item color*>` |
| `b-tag` | kind* (ok/no/plain), inline | — |
| `b-chip` | on | — |
| `b-chips` | — | `<b-chip>` внутри |
| `b-io` | justify | `<item k* mono eq>` |
| `b-qa` | cols (2/3) | `<q t*>` |
| `b-rules` | cols (2/3), sw | `<rule icon* t*>` |
| `b-stack` | label | `<seg w* color* ink>` |
| `b-bar` | value*, color, min | — |
| `b-todo` | top | `<item t*>` |
| `b-hchain` | label* | `<step icon* t* sw>` |
| `b-icon` | name*, sw | — |
| `b-view-toggle` | — | — |
| `b-view` | kind* (pic/struct) | — |
| `b-art-plain` | name* | — |
| `b-lane-stack` | — | `<b-lane>` / `<b-icon-lane>` внутри |
| `b-icon-lane` | icon*, title*, color, top | — |
| `b-qa-route` | — | `<node t* icon kind chips frame tools n time bar share>` |
| `b-qa-row` | label*, now | `<node icon*>` |
| `b-agents-lane` | title*, agents*, note, top | — |
| `b-node-grid` | min (150/170) | `<node icon* t* sw>` |
| `b-num-chain` | start, top | `<step>` |
| `b-chiprow` | start, top | `<chip kind>` |
| `b-ticket` | key* | — |
| `b-kv-rows` | — | `<row k*>` |
| `b-drift` | sm | — |
| `b-tool-groups` | label* | `<group k* kind chips chip swap alts>` |
| `b-venn` | name* | — |
| `b-two-lists` | — | `<list icon* t* items* warn>` |
| `b-harness-matrix` | label*, diff*, legend* | `<col icon* t*>`, `<row t*>`, `<cell icon* t part diff>` |
| `b-harness-compare` | label*, heads*, acts*, yes*, no*, cheap*, dear* | `<row t* scope* scopelabel* acts* models* modelslabel* cost* costlabel* costproofs*>` |
| `b-k8s-loop` | label*, cols*, human*, back* | `<b-k8s-row>` внутри |
| `b-k8s-row` | icon*, t*, sw | `<cell on hz>` |
| `b-probe-check` | — | `<b-probe-panel>` внутри, `<rule>` |
| `b-probe-panel` | icon*, t*, verdict*, sw | `<probe kind* note>`, `<cov t* value*>` |
| `b-env-caps` | — | `<side icon* t* sw>`, `<cap icon* t*>` |
| `b-spec-growth` | — | `<b-growth-panel>` внутри, `<step em>` |
| `b-growth-panel` | icon*, t*, sub*, n*, note*, chip*, files, good | `<agg dots*>` |
| `b-rfc-levels` | cols* | `<level k* s* w* check* t* note*>`, `<syn>` |
| `b-aggregate-card` | label* | `<field icon* t* sw>` |
| `b-ctx-map` | — | `<ctx name*>` |
| `b-ctx-links` | t*, arrow | `<ref from* to*>` |
| `b-ctx-clash` | word*, note* | `<sense code*>` |
| `b-ctx-rules` | — | `<rule icon*>` |
| `b-ctx-layers` | — | `<layer kind* t* when*>` |
| `b-ctx-layer` | kind* (spec/bible/rules/skill) | — |
| `b-ctx-table` | phone* (hide4/wrap) | HTML-таблица |
| `b-seq-row` | — | `<step t*>` |
| `b-file-grid` | — | `<file name*>` |
| `b-rule-modes` | — | `<mode t*>` |
| `b-metric-line` | value* | — |
| `b-skill-pick` | start*, start-note*, picked*, call*, call-note*, file*, file-note* | `<skill on>` |
| `b-prompt-anatomy` | label*, order* | `<part kind* icon* t* tip* tag note>`, `<tags t* tip*>` |
| `b-prompt-tabs` | name* | `<b-prompt-tab>` внутри |
| `b-prompt-tab` | id*, icon*, label*, title* | — (любые блоки) |
| `b-prompt-parts` | — | `<part icon* off>` |
| `b-lane-art` | names*, top | — |
| `b-scene` | names* | — |
| `b-tag-inline` | kind* (ok/no/muted) | — |
| `b-arrow-rows` | wide | `<row t* color*>` |
| `b-faq-cards` | — | `<q t*>` |
| `b-embed-frame` | src*, title*, ratio* | — |
| `b-agent-term` | app*, ver*, model*, path* | `<line kind* note>` |
| `b-step-chain` | — | `<node t*>` |
| `b-section-h3` | top | — |
| `b-copy-code` | wrap | — (текст как есть) |
| `b-code-text` | wrap | — (текст как есть) |
| `b-copy-quote` | — | — |
| `b-view-switch` | id* | `<view label*>` ×2 |
| `b-callout` | icon* | — |
| `b-rules-fixed` | cols*, top, sw | `<rule t* icon>` |
| `b-spacer` | h* | — |
| `b-art-note` | top, align (left) | — |
| `b-source-rows` | wide | `<row t* note* href* link miss>` |
| `b-table-plain` | — | HTML-таблица |
| `b-details-more` | summary*, top | — |
| `b-pick-tabs` | id*, tone* (warn/accent) | `<tab t*>` с `<b-pick-cell k* tone t>` внутри |
| `b-steps-round` | — | `<step t* hl>` |
| `b-subsection` | title*, id | — (markdown абзацами) |
| `b-section-title` | id*, top | — |
| `b-lead-large` | — | — |
| `b-info-note` | icon* | — |
| `b-howto` | — | `<warn icon*>` |
| `b-ink-link` | href*, plain | — |
| `b-link-chips` | — | `<item href* icon*>` |
| `b-checklist` | — | `<item t*>`, внутри может быть `<b-link-chips>` |
| `b-filter-chips` | — | `<f on>` |
| `b-sources` | — | `<src icon* href* t* path* what* tip-label*>` (подсказка по наведению) |
| `b-dir-map` | label* | `<dir href* n* color* t* big* sub* dec* art>` |
| `b-mini-funnel` | — | `<seg w* color* ink>` |
| `b-csv-check` | — | `<file color*>` |
| `b-dot-grid` | n*, on* | — |
| `b-art-row` | names*, arrows, cols (1) | — |
| `b-art-chain` | label* | `<step art*>` |
| `b-tool-types` | — | `<prob title*>`, `<tool n* href* t* color* art* on*>` |
| `b-count-bars` | — | `<bar k* w* color*>` |
| `b-share-bar` | kind* (time/status/wide), label | `<seg w* color* ink>` |
| `b-table-group` | color*, span* | — (строка внутри HTML-таблицы) |
| `b-cell-sub` | — | — |
| `b-cell-quote` | — | — |
| `b-status-dot` | color* | — |
| `b-split-bar` | parts* | — |
| `b-select-pill` | tone* (green/yellow/red/cyan/gray/purple) | — |
| `b-match-mark` | kind* (same/diff) | — |
| `b-rating` | value*, of*, label*, warn | — |
| `b-airtable-preview` | icon*, title*, sub*, count* | `<col w* mw kind>`, `<row>` (ячейки через « \| ») |
| `b-airtable-grid` | foot* | `<field type* kind>`, `<row>` (ячейки через « \| ») |
| `b-drop-arrows` | n* | — |
| `b-choice-flow` | label* | `<step t*>`, `<opt k* pill* tone*>` |
| `b-call-script` | — | `<step t* q* color* ink>` |
| `b-branch` | icon*, t* | — |
| `b-pipe` | label* | `<node icon* color* sub*>` |
| `b-tool-links` | — | `<item href* icon* sub*>` |
| `b-vs-grid` | — | `<h>` ×3, `<c>` по три на строку |
| `b-question-pairs` | — | `<pair tag* bad*>` |
| `b-survey` | — | `<q t* tag* color>` |
| `b-gauge` | label* | `<row k* w* color*>` |

## Разовые блоки серий

Все посты блога собраны из блоков: ручной вёрстки и копий значков в текстах не осталось. Блоки, которые пока нужны
одной серии, названы по ней (`b-hdd-*`, `b-gruppy-*`, `b-prompt-*`, `b-ctx-*`, `b-k8s-*`, `b-harness-*` …).
Когда такой элемент понадобится второй раз — обобщите блок, а не копируйте его.

Похожие блоки-кандидаты на слияние: `b-steps` / `b-steps-round` / `b-hdd-steps` / `b-gruppy-steps`,
`b-tag` (`inline`, `line`) / `b-tag-inline`, `b-numchain` / `b-num-chain` / `b-step-chain`,
`b-art` / `b-art-plain` / `b-scene` / `b-lane-art`, `b-view-toggle` / `b-view-switch`, `b-codebox` / `b-copy-code`,
`b-say-agent` / `b-copy-quote`, `b-spoiler` / `b-details-more`. Значки с суффиксами `-hm`, `-iv`, `-rise`, `-tab`,
`-screen` — вторые варианты одноимённых значков, нарисованные разными постами.
