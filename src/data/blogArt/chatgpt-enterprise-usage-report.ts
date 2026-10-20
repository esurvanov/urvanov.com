// Схемы поста «Отчёт об использовании ChatGPT Enterprise» (маленькие значки-данные; цвет — currentColor и цвета CSS поста)
import { type Scene } from '@/lib/infographic'

const ink = { fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '1.8' }

const scenes: Record<string, Scene> = {
  // Три группы команд по частоте использования (точки — недели), стрелка сценариев от сильных к отстающим
  'team-groups': {
    ru: 'Команды делятся на три группы: сильные A и B, средняя C, отстающие D и E; сценарии идут от сильных к отстающим', en: 'Teams fall into three groups: strong A and B, middle C, lagging D and E; scenarios move from the strong to the lagging',
    viewBox: [0, 0, 310, 72],
    legend: false,
    cls: 'dp-v',
    style: 'color:var(--accent);max-height:120px',
    attrs: ink,
    draw: (c) => {
      const line = 'var(--line-2)'
      const groups: [number, number, string, number[]][] = [[6, 38, 'var(--d-week)', [7, 7]], [108, 24, 'var(--d-reg)', [5]], [210, 38, 'var(--d-rare)', [3, 2]]]
      for (const [x, h, col, rows] of groups) {
        c.box(x, 8, 94, h, { rx: 5, stroke: line })
        rows.forEach((n, i) => c.dotRow(x + 9, 20 + 14 * i, 10, n, col))
      }
      c.curve(53, 46, 257, 46, 'currentColor', { c1: [90, 76], c2: [216, 76], w: 1.8, cap: true })
      c.edge('M251 44l6 2-2 6', { stroke: 'currentColor' })
    },
  },
  // Общий навык: один чек-лист расходится в три команды, у каждой одинаковый результат
  'shared-skill': {
    ru: 'Общий навык: одинаковый результат в нескольких командах', en: 'A shared skill: the same result across several teams',
    viewBox: [0, 0, 150, 64],
    legend: false,
    cls: 'dp-v',
    style: 'color:var(--accent)',
    attrs: { ...ink, stroke: 'currentColor' },
    draw: (c) => {
      const o = { w: 1.8 }
      c.icon(6, 16, 'checklist', 'currentColor', o)
      c.edge('M32 32C48 32 52 11 68 11M32 32H68M32 32C48 32 52 53 68 53')
      for (const y of [0, 21, 42]) {
        c.icon(80, 6 + y, 'user', 'var(--ink-2)', o)
        c.icon(94, 6 + y, 'user', 'var(--ink-2)', o)
        c.icon(110, 2 + y, 'doc', 'currentColor', o)
      }
    },
  },
  // Рисунки из текста поста: разовые формы, тело svg как есть
  // Кольцо на карточке «Природа работы»: доля Slack и Notion среди подключений
  'map-donut': {
    ru: 'Доля подключений: Slack и Notion — 70%', en: 'Share of connections: Slack and Notion — 70%',
    viewBox: [0, 0, 120, 120],
    legend: false,
    style: '',
    attrs: { width: '104', height: '104', 'aria-hidden': 'true' },
    draw: (c) => c.raw('<circle cx="60" cy="60" r="44" fill="none" stroke="var(--c-work)" stroke-width="18"/><circle cx="60" cy="60" r="44" fill="none" stroke="var(--c-code)" stroke-width="18" stroke-dasharray="193.6 276.5" transform="rotate(-90 60 60)"/>'),
  },
  // Глубина проникновения: пользовались хоть раз — одна неделя из восьми
  'depth-tried': {
    ru: 'Пользовались хоть раз: одна неделя из восьми', en: 'Used at least once: one week out of eight',
    viewBox: [0, 0, 200, 72],
    legend: false,
    cls: 'dp-v',
    style: 'color:var(--d-rare)',
    attrs: { ...ink, stroke: 'currentColor' },
    draw: (c) => c.raw('<g stroke="var(--ink-2)"><circle cx="60" cy="18" r="6"/><path d="M50 38c0-7 4.5-11 10-11s10 4 10 11"/></g><path d="M80 24H120" stroke-dasharray="4 5"/><rect x="129" y="13" width="22" height="22" rx="6"/><path d="M140 13v-4"/><circle cx="136" cy="23" r="1.6" fill="currentColor"/><circle cx="144" cy="23" r="1.6" fill="currentColor"/><path d="M136 29h8"/><rect x="24" y="52" width="14" height="14" rx="3" stroke-opacity=".35"/><rect x="44" y="52" width="14" height="14" rx="3" stroke-opacity=".35"/><rect x="64" y="52" width="14" height="14" rx="3" fill="currentColor"/><rect x="84" y="52" width="14" height="14" rx="3" stroke-opacity=".35"/><rect x="104" y="52" width="14" height="14" rx="3" stroke-opacity=".35"/><rect x="124" y="52" width="14" height="14" rx="3" stroke-opacity=".35"/><rect x="144" y="52" width="14" height="14" rx="3" stroke-opacity=".35"/><rect x="164" y="52" width="14" height="14" rx="3" stroke-opacity=".35"/>'),
  },
  // Глубина проникновения: регулярно — несколько недель из восьми
  'depth-regular': {
    ru: 'Регулярно: несколько недель из восьми', en: 'Regularly: several weeks out of eight',
    viewBox: [0, 0, 200, 72],
    legend: false,
    cls: 'dp-v',
    style: 'color:var(--d-reg)',
    attrs: { ...ink, stroke: 'currentColor' },
    draw: (c) => c.raw('<g stroke="var(--ink-2)"><circle cx="60" cy="18" r="6"/><path d="M50 38c0-7 4.5-11 10-11s10 4 10 11"/></g><path d="M80 24H120" stroke-dasharray="4 5"/><rect x="129" y="13" width="22" height="22" rx="6"/><path d="M140 13v-4"/><circle cx="136" cy="23" r="1.6" fill="currentColor"/><circle cx="144" cy="23" r="1.6" fill="currentColor"/><path d="M136 29h8"/><rect x="24" y="52" width="14" height="14" rx="3" fill="currentColor"/><rect x="44" y="52" width="14" height="14" rx="3" stroke-opacity=".35"/><rect x="64" y="52" width="14" height="14" rx="3" fill="currentColor"/><rect x="84" y="52" width="14" height="14" rx="3" stroke-opacity=".35"/><rect x="104" y="52" width="14" height="14" rx="3" stroke-opacity=".35"/><rect x="124" y="52" width="14" height="14" rx="3" fill="currentColor"/><rect x="144" y="52" width="14" height="14" rx="3" fill="currentColor"/><rect x="164" y="52" width="14" height="14" rx="3" stroke-opacity=".35"/>'),
  },
  // Глубина проникновения: каждую неделю — все восемь недель
  'depth-weekly': {
    ru: 'Каждую неделю: все восемь недель', en: 'Every week: all eight weeks',
    viewBox: [0, 0, 200, 72],
    legend: false,
    cls: 'dp-v',
    style: 'color:var(--d-week)',
    attrs: { ...ink, stroke: 'currentColor' },
    draw: (c) => c.raw('<g stroke="var(--ink-2)"><circle cx="60" cy="18" r="6"/><path d="M50 38c0-7 4.5-11 10-11s10 4 10 11"/></g><path d="M80 24H120" /><rect x="129" y="13" width="22" height="22" rx="6"/><path d="M140 13v-4"/><circle cx="136" cy="23" r="1.6" fill="currentColor"/><circle cx="144" cy="23" r="1.6" fill="currentColor"/><path d="M136 29h8"/><rect x="24" y="52" width="14" height="14" rx="3" fill="currentColor"/><rect x="44" y="52" width="14" height="14" rx="3" fill="currentColor"/><rect x="64" y="52" width="14" height="14" rx="3" fill="currentColor"/><rect x="84" y="52" width="14" height="14" rx="3" fill="currentColor"/><rect x="104" y="52" width="14" height="14" rx="3" fill="currentColor"/><rect x="124" y="52" width="14" height="14" rx="3" fill="currentColor"/><rect x="144" y="52" width="14" height="14" rx="3" fill="currentColor"/><rect x="164" y="52" width="14" height="14" rx="3" fill="currentColor"/>'),
  },
  // Основной инструмент Chat: много переписки, результат под вопросом
  'tool-chat': {
    ru: 'Человек много раз переписывается с чатом, результат непонятный и может быть выдуман', en: 'A person goes back and forth with the chat many times, the result is unclear and may be made up',
    viewBox: [0, 0, 200, 58],
    legend: false,
    cls: 'tt-v',
    style: '',
    attrs: { ...ink, stroke: 'currentColor' },
    draw: (c) => c.raw('<g stroke="var(--ink-2)"><circle cx="16" cy="24" r="6"/><path d="M6 44c0-7 4.5-11 10-11s10 4 10 11"/></g><path d="M32 18H92M87 14l5 4-5 4"/><path d="M92 30H32M37 26l-5 4--5 4"/><path d="M32 42H92M87 38l5 4-5 4"/><rect x="101" y="21" width="22" height="22" rx="6"/><path d="M112 21v-4"/><circle cx="108" cy="31" r="1.6" fill="currentColor"/><circle cx="116" cy="31" r="1.6" fill="currentColor"/><path d="M108 37h8"/><path d="M128 32H146M141 28l5 4-5 4"/><g><path d="M154 42a8 8 0 0 1 1-16 11 11 0 0 1 21-3 8 8 0 0 1 4 19z"/><path d="M163.5 28a3.5 3.5 0 1 1 5 3.2c-1 .5-1.5 1.2-1.5 2.3M167 37.5h.01"/></g>'),
  },
  // Основной инструмент Work: одна цель, данные из приложений
  'tool-work': {
    ru: 'Человек ставит одну цель, агент берёт данные из приложений, но документы от раза к разу разные', en: 'A person sets one goal, the agent takes data from apps, but the documents differ each time',
    viewBox: [0, 0, 200, 58],
    legend: false,
    cls: 'tt-v',
    style: '',
    attrs: { ...ink, stroke: 'currentColor' },
    draw: (c) => c.raw('<g stroke="var(--ink-2)"><circle cx="14" cy="24" r="6"/><path d="M4 44c0-7 4.5-11 10-11s10 4 10 11"/></g><path d="M28 32H58M53 28l5 4-5 4"/><rect x="69" y="21" width="22" height="22" rx="6"/><path d="M80 21v-4"/><circle cx="76" cy="31" r="1.6" fill="currentColor"/><circle cx="84" cy="31" r="1.6" fill="currentColor"/><path d="M76 37h8"/><rect x="61" y="1" width="9" height="8" rx="2"/><rect x="75.5" y="1" width="9" height="8" rx="2"/><rect x="90" y="1" width="9" height="8" rx="2"/><path d="M65.5 9l8.5 12M80 9v12M94.5 9l-8.5 12" stroke-dasharray="2 3"/><path d="M96 32H116M111 28l5 4-5 4"/><path d="M120 16h14l6 6v24h-20z"/><path d="M134 16v6h6M124 30h12M124 35h12M124 40h8"/><path d="M146 29h8M146 35h8M152 25l-4 14"/><path d="M160 16h14l6 6v24h-20z"/><path d="M174 16v6h6M164 28h7M164 33h12M164 38h5M164 42h10"/>'),
  },
  // Основной инструмент Codex: спека и правила, одинаковый результат
  'tool-codex': {
    ru: 'По спеке и правилам агент выдаёт одинаковый результат для нескольких команд', en: 'Following the spec and rules, the agent delivers the same result for several teams',
    viewBox: [0, 0, 200, 58],
    legend: false,
    cls: 'tt-v',
    style: '',
    attrs: { ...ink, stroke: 'currentColor' },
    draw: (c) => c.raw('<rect x="4" y="14" width="24" height="32" rx="3"/><path d="M8 22l2 2 3-3M17 23h7M8 30l2 2 3-3M17 31h7M8 38l2 2 3-3M17 39h7"/><path d="M32 32H52M47 28l5 4-5 4"/><rect x="59" y="21" width="22" height="22" rx="6"/><path d="M70 21v-4"/><circle cx="66" cy="31" r="1.6" fill="currentColor"/><circle cx="74" cy="31" r="1.6" fill="currentColor"/><path d="M66 37h8"/><path d="M86 32C108 32 116 12 144 12M86 32H144M86 32C108 32 116 52 144 52"/><rect x="148" y="6" width="30" height="12" rx="2"/><path d="M159 9l-3 3 3 3M167 9l3 3-3 3"/><rect x="148" y="26" width="30" height="12" rx="2"/><path d="M159 29l-3 3 3 3M167 29l3 3-3 3"/><rect x="148" y="46" width="30" height="12" rx="2"/><path d="M159 49l-3 3 3 3M167 49l3 3-3 3"/>'),
  },
  // Топ по расходам: основные траты у нескольких людей
  'spend-few': {
    ru: 'Основные траты приходятся на нескольких людей', en: 'Most of the spend comes from a few people',
    viewBox: [0, 0, 200, 72],
    legend: false,
    cls: 'dp-v',
    style: 'color:var(--accent)',
    attrs: { ...ink, stroke: 'currentColor' },
    draw: (c) => c.raw('<rect x="22" y="12" width="10" height="52" rx="2" fill="currentColor"/><rect x="38" y="18" width="10" height="46" rx="2" fill="currentColor"/><rect x="54" y="50" width="10" height="14" rx="2" stroke="var(--line-2)" fill="var(--line-2)"/><rect x="70" y="53" width="10" height="11" rx="2" stroke="var(--line-2)" fill="var(--line-2)"/><rect x="86" y="55" width="10" height="9" rx="2" stroke="var(--line-2)" fill="var(--line-2)"/><rect x="102" y="56" width="10" height="8" rx="2" stroke="var(--line-2)" fill="var(--line-2)"/><rect x="118" y="57" width="10" height="7" rx="2" stroke="var(--line-2)" fill="var(--line-2)"/><rect x="134" y="58" width="10" height="6" rx="2" stroke="var(--line-2)" fill="var(--line-2)"/><rect x="150" y="59" width="10" height="5" rx="2" stroke="var(--line-2)" fill="var(--line-2)"/><rect x="166" y="60" width="10" height="4" rx="2" stroke="var(--line-2)" fill="var(--line-2)"/><path d="M16 64h170" stroke="var(--line-2)"/>'),
  },
  // Топ по расходам: опытный пользователь делится сценариями
  'spend-mentor': {
    ru: 'Опытный пользователь делится сценариями с несколькими коллегами', en: 'An experienced user shares scenarios with several colleagues',
    viewBox: [0, 0, 200, 72],
    legend: false,
    cls: 'dp-v',
    style: 'color:var(--accent)',
    attrs: { ...ink, stroke: 'currentColor' },
    draw: (c) => c.raw('<g stroke="currentColor"><circle cx="40" cy="24" r="8"/><path d="M27.2 49.6c0-8.8 6.0-14.4 12.8-14.4s12.8 5.6 12.8 14.4"/></g><path d="M40 8l2 4 4 .5-3 3 .8 4-3.8-2-3.8 2 .8-4-3-3 4-.5z" fill="currentColor" stroke="none" transform="translate(0,-6) scale(1)"/><path d="M62 36C92 36 100 14 128 14M62 36H128M62 36C92 36 100 58 128 58"/><g stroke="var(--ink-2)"><circle cx="150" cy="7" r="4"/><path d="M143.6 19.8c0-4.4 3.0-7.2 6.4-7.2s6.4 2.8 6.4 7.2"/></g><g stroke="var(--ink-2)"><circle cx="150" cy="29" r="4"/><path d="M143.6 41.8c0-4.4 3.0-7.2 6.4-7.2s6.4 2.8 6.4 7.2"/></g><g stroke="var(--ink-2)"><circle cx="150" cy="51" r="4"/><path d="M143.6 63.8c0-4.4 3.0-7.2 6.4-7.2s6.4 2.8 6.4 7.2"/></g>'),
  },
  // Топ по расходам: эксперимент сократил время, практику переняли
  'spend-experiment': {
    ru: 'Эксперимент сократил время на задачу, практику переняли все', en: 'The experiment cut the time per task, and everyone adopted the practice',
    viewBox: [0, 0, 200, 72],
    legend: false,
    cls: 'dp-v',
    style: 'color:var(--accent)',
    attrs: { ...ink, stroke: 'currentColor' },
    draw: (c) => c.raw('<rect x="14" y="20" width="84" height="10" rx="3" fill="var(--line-2)" stroke="none"/><rect x="14" y="42" width="34" height="10" rx="3" fill="currentColor" stroke="none"/><path d="M108 36h20M123 31l5 5-5 5"/><g stroke="var(--ink-2)"><circle cx="146" cy="34" r="5"/><path d="M138.0 50.0c0-5.5 3.8-9.0 8.0-9.0s8.0 3.5 8.0 9.0"/></g><path d="M142 17l3 3 5-6"/><g stroke="var(--ink-2)"><circle cx="166" cy="34" r="5"/><path d="M158.0 50.0c0-5.5 3.8-9.0 8.0-9.0s8.0 3.5 8.0 9.0"/></g><path d="M162 17l3 3 5-6"/><g stroke="var(--ink-2)"><circle cx="186" cy="34" r="5"/><path d="M178.0 50.0c0-5.5 3.8-9.0 8.0-9.0s8.0 3.5 8.0 9.0"/></g><path d="M182 17l3 3 5-6"/>'),
  },
  // Цепочка сегментов: сегмент
  'chain-segment': {
    ru: 'Сегмент', en: 'Segment',
    viewBox: [0, 0, 64, 48],
    legend: false,
    style: '',
    attrs: { ...ink, stroke: 'currentColor', 'aria-hidden': 'true' },
    draw: (c) => c.raw('<circle cx="24" cy="24" r="16"/><circle cx="40" cy="24" r="16"/><circle cx="17" cy="22" r="2.5" fill="currentColor"/><circle cx="32" cy="18" r="2.5" fill="currentColor"/><circle cx="32" cy="30" r="2.5" fill="currentColor"/><circle cx="47" cy="24" r="2.5" fill="currentColor"/>'),
  },
  // Цепочка сегментов: кастдев
  'chain-custdev': {
    ru: 'Кастдев', en: 'Customer development',
    viewBox: [0, 0, 64, 48],
    legend: false,
    style: '',
    attrs: { ...ink, stroke: 'currentColor', 'aria-hidden': 'true' },
    draw: (c) => c.raw('<g stroke="var(--ink-2)"><circle cx="14" cy="24" r="5"/><path d="M6.0 40.0c0-5.5 3.8-9.0 8.0-9.0s8.0 3.5 8.0 9.0"/></g><g stroke="var(--ink-2)"><circle cx="50" cy="24" r="5"/><path d="M42.0 40.0c0-5.5 3.8-9.0 8.0-9.0s8.0 3.5 8.0 9.0"/></g><path d="M20 6h16v10h-9l-4 4v-4h-3z"/><path d="M44 12H30v9h3v4l4-4h7z" stroke-dasharray="0"/>'),
  },
  // Цепочка сегментов: проблема
  'chain-problem': {
    ru: 'Проблема', en: 'Problem',
    viewBox: [0, 0, 64, 48],
    legend: false,
    style: '',
    attrs: { ...ink, stroke: 'currentColor', 'aria-hidden': 'true' },
    draw: (c) => c.raw('<g stroke="var(--warn)"><path d="M32 8l20 34H12z"/><path d="M32 21v10M32 36h.01"/></g>'),
  },
  // Цепочка сегментов: инструмент
  'chain-tool': {
    ru: 'Инструмент', en: 'Tool',
    viewBox: [0, 0, 64, 48],
    legend: false,
    style: '',
    attrs: { ...ink, stroke: 'currentColor', 'aria-hidden': 'true' },
    draw: (c) => c.raw('<path d="M10 12h14a4 4 0 1 1 8 0h14v12a4 4 0 1 0 0 8v10H10z" stroke="var(--line-2)" stroke-dasharray="3 3"/><path d="M14 16h10a4 4 0 1 1 8 0h10v9a4 4 0 1 0 0 8v5H14z" fill="color-mix(in srgb, currentColor 22%, transparent)"/>'),
  },
  // Коннекторы: без них модель отвечает догадками
  'conn-guess': {
    ru: 'Без коннекторов модель отвечает догадками', en: 'Without connectors the model answers with guesses',
    viewBox: [0, 0, 150, 64],
    legend: false,
    cls: 'dp-v',
    style: 'color:var(--accent)',
    attrs: { ...ink, stroke: 'currentColor' },
    draw: (c) => c.raw('<rect x="29" y="21" width="22" height="22" rx="6"/><path d="M40 21v-4"/><circle cx="36" cy="31" r="1.6" fill="currentColor"/><circle cx="44" cy="31" r="1.6" fill="currentColor"/><path d="M36 37h8"/><path stroke="var(--warn)" d="M77 13a3 3 0 1 1 4 2.8c-.8.4-1 1-1 1.7M80 21h.01"/><path stroke="var(--warn)" d="M97 29a3 3 0 1 1 4 2.8c-.8.4-1 1-1 1.7M100 37h.01"/><path stroke="var(--warn)" d="M81 45a3 3 0 1 1 4 2.8c-.8.4-1 1-1 1.7M84 53h.01"/><path stroke="var(--warn)" d="M117 17a3 3 0 1 1 4 2.8c-.8.4-1 1-1 1.7M120 25h.01"/><path stroke="var(--warn)" d="M115 43a3 3 0 1 1 4 2.8c-.8.4-1 1-1 1.7M118 51h.01"/>'),
  },
  // Коннекторы: с ними модель опирается на рабочие данные
  'conn-data': {
    ru: 'С коннекторами модель опирается на рабочие данные', en: 'With connectors the model relies on work data',
    viewBox: [0, 0, 150, 64],
    legend: false,
    cls: 'dp-v',
    style: 'color:var(--accent)',
    attrs: { ...ink, stroke: 'currentColor' },
    draw: (c) => c.raw('<rect x="20" y="4" width="14" height="11" rx="2"/><rect x="40" y="4" width="14" height="11" rx="2"/><rect x="60" y="4" width="14" height="11" rx="2"/><path d="M27 15l13 8M47 15v6M67 15l-13 8"/><rect x="36" y="25" width="22" height="22" rx="6"/><path d="M47 25v-4"/><circle cx="43" cy="35" r="1.6" fill="currentColor"/><circle cx="51" cy="35" r="1.6" fill="currentColor"/><path d="M43 41h8"/><path d="M64 36H90M85 32l5 4-5 4"/><path d="M96 22h14l6 6v22h-20z"/><path d="M110 22v6h6"/><path d="M101 39l3 3 6-7"/>'),
  },
  // Коннекторы: доля ответов с ошибкой до и после
  'conn-errors': {
    ru: 'Доля ответов с ошибкой до и после подключения', en: 'Share of wrong answers before and after connecting',
    viewBox: [0, 0, 150, 64],
    legend: false,
    cls: 'dp-v',
    style: 'color:var(--accent)',
    attrs: { ...ink, stroke: 'currentColor' },
    draw: (c) => c.raw('<rect x="30" y="10" width="18" height="46" rx="3" fill="var(--warn)" stroke="none" opacity=".85"/><rect x="88" y="42" width="18" height="14" rx="3" fill="currentColor" stroke="none"/><path d="M22 58h94" stroke="var(--line-2)"/><path d="M56 32H80M75 28l5 4-5 4"/>'),
  },
  // Навыки: разовые запросы — каждый раз другой результат
  'skill-adhoc': {
    ru: 'Разовые запросы: каждый раз другой результат', en: 'One-off requests: a different result every time',
    viewBox: [0, 0, 150, 64],
    legend: false,
    cls: 'dp-v',
    style: 'color:var(--accent)',
    attrs: { ...ink, stroke: 'currentColor' },
    draw: (c) => c.raw('<g stroke="var(--ink-2)"><circle cx="22" cy="20" r="6"/><path d="M12.4 39.2c0-6.6 4.5-10.8 9.6-10.8s9.6 4.2 9.6 10.8"/></g><path d="M40 32H78M73 28l5 4-5 4"/><g stroke="var(--warn)"><path d="M92 2h10l4 4v14h-14z"/><path d="M95 9h8"/><path d="M95 13h5"/></g><g stroke="var(--warn)"><path d="M106 22h10l4 4v14h-14z"/><path d="M109 29h5"/><path d="M109 33h8"/><path d="M109 37h3"/></g><g stroke="var(--warn)"><path d="M92 42h10l4 4v14h-14z"/><path d="M95 49h3"/></g>'),
  },
  // Навыки: навык — одинаковый результат при каждом запуске
  'skill-repeat': {
    ru: 'Навык: одинаковый результат при каждом запуске', en: 'A skill: the same result on every run',
    viewBox: [0, 0, 150, 64],
    legend: false,
    cls: 'dp-v',
    style: 'color:var(--accent)',
    attrs: { ...ink, stroke: 'currentColor' },
    draw: (c) => c.raw('<g stroke="var(--ink-2)"><circle cx="14" cy="20" r="6"/><path d="M4.4 39.2c0-6.6 4.5-10.8 9.6-10.8s9.6 4.2 9.6 10.8"/></g><path d="M30 32H46M41 28l5 4-5 4"/><rect x="50" y="16" width="24" height="32" rx="3"/><path d="M54 24l2 2 3-3M62 25h8"/><path d="M54 32l2 2 3-3M62 33h8"/><path d="M54 40l2 2 3-3M62 41h8"/><path d="M80 32H98M93 28l5 4-5 4"/><g><path d="M108 2h10l4 4v14h-14z"/><path d="M111 9h8"/><path d="M111 13h8"/><path d="M111 17h5"/></g><g><path d="M108 22h10l4 4v14h-14z"/><path d="M111 29h8"/><path d="M111 33h8"/><path d="M111 37h5"/></g><g><path d="M108 42h10l4 4v14h-14z"/><path d="M111 49h8"/><path d="M111 53h8"/><path d="M111 57h5"/></g>'),
  },
  // Темы проектов: файлы и инструкции проекта
  'proj-files': {
    ru: 'Проект: файлы и инструкции, на которые модель опирается в ответах', en: 'A project: files and instructions the model relies on',
    viewBox: [0, 0, 150, 64],
    legend: false,
    cls: 'dp-v',
    style: 'color:var(--accent)',
    attrs: { ...ink, stroke: 'currentColor' },
    draw: (c) => c.raw('<path d="M14 16h14l4 5h22v28H14z"/><path d="M22 32h10M22 38h16M22 44h12"/><path d="M58 34H78M73 30l5 4-5 4"/><rect x="87" y="23" width="22" height="22" rx="6"/><path d="M98 23v-4"/><circle cx="94" cy="33" r="1.6" fill="currentColor"/><circle cx="102" cy="33" r="1.6" fill="currentColor"/><path d="M94 39h8"/><path d="M114 34H128M123 30l5 4-5 4"/><path d="M134 30l3 3 6-7"/>'),
  },
  // Темы проектов: проекты по темам
  'proj-topics': {
    ru: 'Проекты по темам показывают конкретные задачи', en: 'Projects by theme reveal concrete tasks',
    viewBox: [0, 0, 150, 64],
    legend: false,
    cls: 'dp-v',
    style: 'color:var(--accent)',
    attrs: { ...ink, stroke: 'currentColor' },
    draw: (c) => c.raw('<path d="M14 12h14l4 5h22v28H14z"/><path d="M22 20h14l4 5h22v28H22z"/><path d="M30 28h14l4 5h22v28H30z"/><circle cx="104" cy="30" r="12"/><path d="M113 39l10 10"/><path d="M98 30h12M104 24v12"/><path d="M76 30H88M83 26l5 4-5 4"/>'),
  },
  // Темы проектов: автора проекта зовут на кастдев
  'proj-author': {
    ru: 'Автора проекта зовут на кастдев', en: 'The project author is invited to a customer interview',
    viewBox: [0, 0, 150, 64],
    legend: false,
    cls: 'dp-v',
    style: 'color:var(--accent)',
    attrs: { ...ink, stroke: 'currentColor' },
    draw: (c) => c.raw('<path d="M10 16h14l4 5h22v28H10z"/><path d="M54 32H72M67 28l5 4-5 4"/><g stroke="var(--ink-2)"><circle cx="88" cy="22" r="6"/><path d="M78.4 41.2c0-6.6 4.5-10.8 9.6-10.8s9.6 4.2 9.6 10.8"/></g><path d="M104 10h32v18h-18l-7 6v-6h-7z"/><path d="M117 16a3 3 0 1 1 4 2.8c-.8.4-1 1-1 1.7M120 24.5h.01"/>'),
  },
}
export default scenes
