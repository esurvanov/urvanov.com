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
| `b-chapter` | id*, title*, icon | — (markdown абзацами) |
| `b-finding` | title | `<ex k>`, `<gen k>`, `<do k>` |
| `b-proof` | href*, quote* | — |
| `b-links` | cols (1/2/3) | `<item href* k* t*>` |
| `b-why` | align (left), top | — |
| `b-cap` | — | — |
| `b-sublabel` | top | — |
| `b-lead` | — | — |
| `b-credit` | — | — |
| `b-subhead` | — | — |
| `b-footer` | — | — |
| `b-prompt` | — | — (текст как есть) |
| `b-art` | names* | — |
| `b-cta` | href*, k*, t*, icon | — |
| `b-flow` | label*, lead | `<b-lane>` внутри |
| `b-lane` | title*, color*, top | `<node icon* t*>` |
| `b-steps` | — | `<step t* hl>` |
| `b-table` | id | HTML- или markdown-таблица |
| `b-legend` | — | `<item color*>` |
| `b-tag` | kind* (ok/no/plain) | — |
| `b-chip` | on | — |
| `b-chips` | — | `<b-chip>` внутри |
| `b-io` | — | `<item k*>` |
| `b-qa` | cols (2/3) | `<q t*>` |
| `b-rules` | cols (2/3), sw | `<rule icon* t*>` |
| `b-stack` | label | `<seg w* color* ink>` |
| `b-bar` | value*, color | — |
| `b-todo` | — | `<item t*>` |
| `b-hchain` | label* | `<step icon* t*>` |
| `b-icon` | name*, sw | — |
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
| `b-view-toggle` | id* | `<view label*>` ×2 |
| `b-callout` | icon* | — |
| `b-rules-fixed` | cols*, top, sw | `<rule t* icon>` |
| `b-spacer` | h* | — |
| `b-art-note` | top, align (left) | — |
| `b-source-rows` | wide | `<row t* note* href* link miss>` |
| `b-table-plain` | — | HTML-таблица |
| `b-details-more` | summary*, top | — |
| `b-pick-tabs` | id*, tone* (warn/accent) | `<tab t*>` с `<b-pick-cell k* tone t>` внутри |
| `b-steps-round` | — | `<step t* hl>` |

## Ещё не обобщено (разовые элементы серий)

Остались ручной вёрсткой в своих постах и стилями серий — кандидаты в блоки, когда понадобятся второй раз:

- **prompts**: анатомия промпта (`anat`/`an`), окно промпта (`pa-*`), табы с примерами (`tabs`/`tb`/`tp`),
  слои контекста (`ly-*`), последовательность (`seq`/`sq`), файлы (`fls`), модели (`mds`/`md`), метрика (`mt`),
  планировщик (`pl-*`), части промпта (`parts`/`pt`), схема предметной области (`dm-*`).
- **harness**: карточки харнессов (`hx`, `cv-*`, `cap2`), вкладки (`vt-*`), диаграмма Венна (`venn`), пары (`pair`),
  дрейф (`drift`). Уже блоки: вкладки под схемой `brk-*` — `<b-pick-tabs>`, два вида `vtog-*` — `<b-view-toggle>`,
  копирование `pq-*`/`cb` — `<b-copy-quote>`/`<b-copy-code>`, выноска `callout` — `<b-callout>`.
- **hdd**: шкала стоимости (`sh`, `usd`), петля (`loopwrap`, `cf-*`), слои зрелости (`ly-r`/`ly-bar`),
  карты (`cn-*`, `gs-*`, `hm-*`, `sp-*`, `mm-*`, `pr4-*`), игра (`hdd-fig`, `hdd-sc`).
- **kto**: источники (`src-*`), подсказки (`tip`/`tip-body`, `tt-*`), воронка (`cf-*`), точки-графики (`dp-*`),
  блоки (`block`), how-to (`howto-*`), направления (`dir-*`), заметки (`note`).
- **gruppy**: группы (`g-*`), цепочка этапов с визуализацией (`chain`/`st`/`viz`/`dots`), покрытие (`cov`),
  сравнение (`cmp`), таймлайн (`tl`/`ph`).
- **intervyu**: сценарий звонка (`script`/`sn`/`q`/`fu`), таблица Airtable (`atbl`, `at`, `fieldtype`),
  оценки (`rate`/`rt`), микс форматов (`mix`/`mx`), пары «плохо/хорошо» (`pairs`/`pr`), шкала (`gauge`).
- **agg / rec**: словарь агрегатов (`ag-*`, `rl-*`), рост спек (`gw-*`), контексты (`cx-*`), эволюция (`ev-*`),
  Kubernetes-петля (`kl-*`), снимок (`sn-*`).
- Общий вариант: `chain` с карточками `nd` (harness) — теперь `<b-step-chain>`; `chain` gruppy — другой элемент под тем же именем.
