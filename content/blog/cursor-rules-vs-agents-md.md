---
title: Cursor rules и AGENTS.md: что куда класть
seoTitle: Cursor rules и AGENTS.md: что куда класть (2026)
date: 2026-11-15
updated: 2026-11-17
description: Правила Cursor лежат в .cursor/rules и имеют режимы, AGENTS.md читают многие агенты. Таблица сравнения, перенос из .cursorrules по файлам, вопросы.
tags: AI, Cursor, AGENTS.md, правила, .cursorrules, харнесс
category: specs
layout: wide
mentions: AGENTS.md, Cursor, CLAUDE.md, Codex
toc: answer=Быстрый ответ | table=Рядом | modes=Четыре режима | migrate=Перенос | readers=Кто читает AGENTS.md | pick=Что куда | faq=Вопросы | next=Дальше по теме
---

Cursor rules и AGENTS.md одинаково дают агенту постоянные инструкции и различаются охватом. AGENTS.md — простой markdown в корне проекта, его читают Cursor и многие другие агенты. Правила в .cursor/rules — файлы .mdc с четырьмя режимами подключения, это собственный формат Cursor. Общее кладите в AGENTS.md, а правила с условием — в .mdc.

<b-post series="prompts">
<b-chapter id="answer" title="Быстрый ответ" icon="crosshair">
  <b-why>Cursor принимает оба формата сразу: AGENTS.md для простых случаев и правила проекта, когда нужно управлять тем, когда правило включается<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: «For more control over when rules apply, use project rules in .cursor/rules/ instead» — cursor.com/help/customization/rules"/>.</b-why>
  <b-finding>
    <ex>В AGENTS.md лежит то, что должен знать любой агент; в .cursor/rules — то, что нужно только Cursor и не всегда.</ex>
    <gen>У AGENTS.md нет режимов и служебных полей, поэтому его прочтёт любой агент. Правило .mdc добавляет режимы: оно ждёт, пока его позовёт тип файла или запрос.</gen>
    <do>Команды и запреты перенесите в AGENTS.md, правила для типов файлов оставьте в .cursor/rules, .cursorrules удалите.</do>
  </b-finding>
</b-chapter>
<b-chapter id="table" title="Cursor rules и AGENTS.md рядом" icon="table-grid">
  <b-why>Каждая ячейка взята из документации Cursor, agents.md или OpenAI; источник — у значка. Сверено 15.11.2026.</b-why>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th></th><th>AGENTS.md</th><th>.cursor/rules/*.mdc</th></tr>
    </thead>
    <tbody>
      <tr><td>Область действия</td><td>проект; вложенный файл — для подпапки<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: «Cursor supports AGENTS.md in the project root and subdirectories» — cursor.com/docs/context/rules"/></td><td>проект, поделённый на правила; User Rules (все ваши проекты) и Team Rules (вся организация) — отдельные уровни<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: порядок приоритета Team Rules → Project Rules → User Rules; Team Rules ведут из панели управления — cursor.com/docs/context/rules"/></td></tr>
      <tr><td>Кто читает</td><td>Cursor, Codex, Copilot, Windsurf, OpenCode и другие<b-proof href="https://agents.md/" quote="agents.md: «A simple, open format for guiding coding agents» — Cursor и Codex в списке поддерживающих агентов — agents.md"/></td><td>Cursor</td></tr>
      <tr><td>Файл и место</td><td><code>AGENTS.md</code> в корне и в подпапках; главнее файл, ближайший к правимому<b-proof href="https://agents.md/" quote="agents.md: «The closest AGENTS.md to the edited file wins; explicit user chat prompts override everything» — agents.md"/></td><td><code>.cursor/rules/</code>, по файлу на правило; правила можно раскладывать по папкам<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: «Stored in .cursor/rules, version-controlled and scoped to your codebase» — cursor.com/docs/context/rules"/></td></tr>
      <tr><td>Формат</td><td>обычный markdown, обязательных полей нет<b-proof href="https://agents.md/" quote="agents.md: «No. AGENTS.md is just standard Markdown» — agents.md"/></td><td>markdown с шапкой из <code>description</code>, <code>globs</code>, <code>alwaysApply</code>; расширение только <code>.mdc</code>, обычный <code>.md</code> игнорируется<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: «Project rules must use the .mdc extension» — cursor.com/docs/context/rules"/></td></tr>
      <tr><td>Когда применяется</td><td>подхватывается автоматически, режимов нет<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: «Write instructions in plain markdown. Cursor picks it up automatically» — cursor.com/help/customization/rules"/></td><td>один из четырёх режимов: всегда, по описанию, по шаблону файлов, вручную</td></tr>
      <tr><td>Версионирование</td><td>файл в репозитории, правки идут через git</td><td>лежит в репозитории; документация советует коммитить правила<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: «Check your rules into git so your whole team benefits» — cursor.com/docs/context/rules"/></td></tr>
      <tr><td>Размер</td><td>в документации Cursor цифры нет; Codex по умолчанию ограничивает все свои файлы инструкций вместе 32 KiB<b-proof href="https://learn.chatgpt.com/docs/agent-configuration/agents-md" quote="Codex: общий размер инструкций ограничен project_doc_max_bytes, по умолчанию 32 KiB — learn.chatgpt.com/docs/agent-configuration/agents-md"/></td><td>до 500 строк на правило, большие делят<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: «Keep rules under 500 lines. Split large rules into smaller, focused files» — cursor.com/help/customization/rules"/></td></tr>
      <tr><td>Старый .cursorrules</td><td colspan="2">один файл в корне, его заменяют оба формата<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: «The .cursorrules file in your project root is legacy and will be deprecated» — cursor.com/help/customization/rules"/></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>CLAUDE.md Cursor тоже считает всегда включённым: он действует в каждом чате независимо от <code>alwaysApply</code><b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: «CLAUDE.md files are always applied to every conversation, regardless of any alwaysApply frontmatter setting» — cursor.com/help/customization/rules"/>.</b-cap>
</b-chapter>
<b-chapter id="modes" title="Четыре режима правила Cursor" icon="list-arrow">
  <b-why>Режим решает, когда правило попадает в контекст. Его задают в шапке правила и в меню типа правила.</b-why>
  <b-rule-modes>
    <mode t="Всегда">каждый чат</mode>
    <mode t="По описанию">агент решает сам</mode>
    <mode t="По файлам">совпал шаблон пути</mode>
    <mode t="Вручную">@rule</mode>
  </b-rule-modes>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>Режим в Cursor</th><th>Что включает</th><th>Поле шапки</th></tr>
    </thead>
    <tbody>
      <tr><td>Always Apply</td><td>каждая сессия чата<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: Always Apply — «included in every conversation» — cursor.com/help/customization/rules"/></td><td><code>alwaysApply: true</code>; globs и description тогда игнорируются<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: при alwaysApply: true правило включено всегда, globs и description игнорируются — cursor.com/docs/context/rules"/></td></tr>
      <tr><td>Apply Intelligently</td><td>агент решает по описанию<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: Apply Intelligently — «Agent decides when it's relevant» — cursor.com/help/customization/rules"/></td><td><code>description</code> при <code>alwaysApply: false</code> и без globs</td></tr>
      <tr><td>Apply to Specific Files</td><td>файл подошёл под шаблон<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: Apply to Specific Files — «only applies for files matching a pattern» — cursor.com/help/customization/rules"/></td><td><code>globs</code><b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: «Use globs to scope a rule to specific files or directories» — cursor.com/docs/context/rules"/></td></tr>
      <tr><td>Apply Manually</td><td>вы упомянули правило через @ в чате<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: Apply Manually — «only used when you @mention it in chat» — cursor.com/help/customization/rules"/></td><td>правило зовут по имени, например <code>@my-rule</code></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>В старых сторонних руководствах те же четыре режима называют Always, Auto Attached, Agent Requested и Manual. Нынешняя документация Cursor использует названия из таблицы.</b-cap>
</b-chapter>
<b-chapter id="migrate" title="Перенос: из .cursorrules в AGENTS.md и .mdc" icon="notebook">
  <b-why>Учебный проект, придуман для этой статьи. Форматы файлов — по документации Cursor.</b-why>
  <b-sublabel top="18">До: один файл в корне</b-sublabel>
  <b-codebox title="Дерево проекта до">
    my-app/
    ├── .cursorrules
    ├── src/
    └── package.json
  </b-codebox>
  <b-codebox title=".cursorrules">
    Ты работаешь над приложением на React и TypeScript.
    Перед завершением задачи запусти `npm test`.
    Форматируй командой `npm run lint -- --fix`.
    Никогда не правь файлы в dist/.
    Никогда не пиши в лог токены и почту пользователей.
    Компоненты: функции с хуками, один компонент на файл,
    свойства описаны интерфейсом <Имя>Props.
    Тест лежит рядом с компонентом: Button.test.tsx.
    Запросы к API идут через src/api/client.ts; каждый ответ проверяй через zod.
  </b-codebox>
  <b-sublabel top="18">Официальный путь: четыре шага</b-sublabel>
  <b-seq-row>
    <step t="Создать">правило через палитру команд: «New Cursor Rule»</step>
    <step t="Скопировать">текст из .cursorrules</step>
    <step t="Режим">Always Apply</step>
    <step t="Удалить">.cursorrules из корня</step>
  </b-seq-row>
  <b-cap>Это четыре шага из руководства Cursor; Always Apply сохраняет прежнее поведение<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: «Set the rule type to Always Apply (this matches the old behavior)» — cursor.com/help/customization/rules"/>. Получается одно правило, всегда включённое. Деление по условиям — следующий шаг.</b-cap>
  <b-sublabel top="18">После: общее в AGENTS.md, условное в .mdc</b-sublabel>
  <b-codebox title="Дерево проекта после">
    my-app/
    ├── AGENTS.md
    ├── .cursor/
    │   └── rules/
    │       ├── react-components.mdc
    │       └── api-validation.mdc
    ├── src/
    └── package.json
  </b-codebox>
  <b-codebox title="AGENTS.md" copy>
    # my-app
    Приложение на React и TypeScript.

    ## Команды
    - Перед завершением задачи запусти `npm test`.
    - Форматируй командой `npm run lint -- --fix`.

    ## Запреты
    - Никогда не правь файлы в `dist/`.
    - Никогда не пиши в лог токены и почту пользователей.
  </b-codebox>
  <b-codebox title=".cursor/rules/react-components.mdc" copy>
    ---
    description: Стандарты для React-компонентов
    globs: "*.tsx"
    alwaysApply: false
    ---
    - Функции с хуками, один компонент на файл.
    - Свойства описаны интерфейсом `<Имя>Props`.
    - Тест лежит рядом с компонентом: `Button.test.tsx`.
  </b-codebox>
  <b-codebox title=".cursor/rules/api-validation.mdc" copy>
    ---
    description: Правила для запросов к API и проверки ответов
    alwaysApply: false
    ---
    - Запросы к API идут через `src/api/client.ts`.
    - Каждый ответ проверяй через zod.
  </b-codebox>
  <b-finding>
    <ex>Девять строк одного файла стали тремя файлами: пять строк читает любой агент, два правила Cursor подключает только по условию.</ex>
    <gen>Команды и запреты верны для всего проекта, поэтому нужны любому агенту. Правила про компоненты и API касаются части кода: первое — файлов <code>.tsx</code>, второе — когда агент сочтёт описание подходящим.</gen>
    <do>Делите старый файл одним вопросом: нужна ли эта строка любому агенту в каждой сессии? Да — в AGENTS.md, нет — в правило с режимом.</do>
  </b-finding>
</b-chapter>
<b-chapter id="readers" title="Какие агенты читают AGENTS.md" icon="table-grid">
  <b-why>Сайт agents.md перечисляет много поддерживающих агентов, среди них Codex, Cursor, Copilot, Windsurf, Gemini CLI, Zed и Warp<b-proof href="https://agents.md/" quote="agents.md: в списке Codex, Jules, Cursor, Gemini CLI, GitHub Copilot's coding agent, Windsurf и другие — agents.md"/>. Условия у агентов разные: Claude Code читает AGENTS.md, только если в проекте нет CLAUDE.md, Gemini CLI — после смены настройки.</b-why>
  <b-links cols="1">
    <item href="/blog/specs-rules-skills/#matrix" k="Таблица" t="Какой агент какой файл читает">Claude Code, Codex, Cursor, Copilot, Gemini CLI, Windsurf, OpenCode: AGENTS.md, CLAUDE.md и свои файлы</item>
  </b-links>
</b-chapter>
<b-chapter id="pick" title="Что куда класть" icon="crosshair">
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>Что</th><th>Куда</th><th>Почему</th></tr>
    </thead>
    <tbody>
      <tr><td>Команды сборки и тестов</td><td>AGENTS.md</td><td>нужны любому агенту в каждой сессии</td></tr>
      <tr><td>Запреты: не править <code>dist/</code>, не писать секреты в лог</td><td>AGENTS.md</td><td>верны для всего проекта</td></tr>
      <tr><td>Стиль одного типа файлов, например <code>*.tsx</code></td><td>.mdc, Apply to Specific Files</td><td>включается, только когда такой файл в работе</td></tr>
      <tr><td>Тема, нужная время от времени: запросы к API, миграции</td><td>.mdc, Apply Intelligently</td><td>агент читает описание и сам подключает правило</td></tr>
      <tr><td>Редкий чек-лист</td><td>.mdc, Apply Manually</td><td>попадает в чат только по @-упоминанию</td></tr>
      <tr><td>Правило для всей организации</td><td>Team Rules</td><td>ведут из панели Cursor на тарифах Team и Enterprise<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: тарифы Team и Enterprise создают и закрепляют правила для организации из панели управления — cursor.com/docs/context/rules"/></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>Каждую инструкцию держите в одном месте. Строку, скопированную и в AGENTS.md, и в правило, придётся править дважды.</b-cap>
</b-chapter>
<b-chapter id="faq" icon="chat" title="Частые вопросы">
  <b-faq-cards>
    <q t="Читает ли Cursor AGENTS.md?">Да. Cursor читает AGENTS.md в корне проекта и в подпапках, как обычный markdown без служебных полей, и подхватывает его сам. Инструкции вложенного AGENTS.md объединяются с инструкциями родительских папок, более конкретные главнее. Источник: cursor.com/docs/context/rules и cursor.com/help/customization/rules, сверено 15.11.2026.</q>
    <q t="Нужен ли .cursorrules?">Нет. Документация Cursor называет корневой .cursorrules устаревшим и описывает переход: создать правило в режиме Always Apply, скопировать текст, удалить файл. Источник: cursor.com/help/customization/rules, сверено 15.11.2026.</q>
    <q t="Можно ли держать и AGENTS.md, и .cursor/rules?">Да. Cursor описывает их как два варианта: AGENTS.md для простых случаев, правила проекта — для управления тем, когда правило включается. Разумное деление: общие команды и запреты в AGENTS.md, правила с условием в .cursor/rules; каждая инструкция живёт в одном месте. Источник: cursor.com/help/customization/rules, сверено 15.11.2026.</q>
    <q t="Сколько правил и какой длины?">Cursor рекомендует до 500 строк на правило и делить большие правила на небольшие, сфокусированные файлы. На проверенных страницах нет предела числа правил и длины AGENTS.md; Codex по умолчанию ограничивает свои файлы AGENTS.md вместе 32 KiB. Источники: документация Cursor и OpenAI, сверено 15.11.2026.</q>
  </b-faq-cards>
</b-chapter>
<b-chapter id="next" title="Дальше по теме">
  <b-links cols="2">
    <item href="/blog/specs-rules-skills/" k="Контекст" t="AGENTS.md, CLAUDE.md и spec.md: что куда класть">Четыре слоя, таблица агентов, настоящий файл</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="Сравнение" t="Claude Code, Codex, Cursor и Hermes Agent">Какой агент для какой задачи</item>
    <item href="/blog/codex-or-chatgpt-what-to-choose/" k="Выбор" t="Codex или ChatGPT: что выбрать">Чат или агент для кода</item>
    <item href="/blog/harness-driven-development/" k="Метод" t="Harness-Driven Development">Ошибка агента становится правилом</item>
  </b-links>
</b-chapter>
<b-footer>По документации Cursor, agents.md и OpenAI, источник у значка рядом с утверждением; сверено 15.11.2026. Учебный проект придуман.</b-footer>
</b-post>
