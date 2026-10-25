---
title: AGENTS.md и CLAUDE.md, спеки, правила и скиллы: что агент должен знать о проекте и где это хранить
date: 2026-09-28
updated: 2026-10-20
description: Четыре вида постоянного контекста для ИИ: спека задачи, библия проекта (CLAUDE.md, AGENTS.md), правила и скиллы Claude Code. Что в каждом, когда он попадает в контекст и что из этого есть в ChatGPT и Claude. По документации Anthropic, OpenAI, GitHub, Cursor и Cline.
tags: AI, Claude Code, CLAUDE.md, харнесс, спеки, скиллы
category: specs
layout: wide
mentions: AGENTS.md, CLAUDE.md, Agent Skills, Spec Kit, Memory Bank
toc: map=Четыре слоя | spec=Спека | bible=Библия | rules=Правила | skills=Скиллы | chat=В чате | pick=Что куда | next=Дальше по теме
---

<b-post series="prompts">
<b-ctx-layers>
  <layer kind="spec" t="Спека" when="на время задачи">что сделать в одной задаче</layer>
  <layer kind="bible" t="Библия" when="в начале задачи">что это за продукт</layer>
  <layer kind="rules" t="Правила" when="в каждой сессии">как работать в проекте</layer>
  <layer kind="skill" t="Скилл" when="по вызову">как выполнить процедуру</layer>
</b-ctx-layers>
<b-cap>Модель не помнит проект между сессиями<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: «Large language models don&#x27;t retain memory between completions. Rules provide persistent, reusable context at the prompt level» — cursor.com/docs/context/rules"/>. Четыре вида файлов возвращают ей этот контекст.</b-cap>
<b-chapter id="map" title="Четыре слоя контекста" icon="table-grid">
  <b-ctx-table phone="hide4">
    <table>
    <thead>
      <tr><th>Слой</th><th>Что внутри</th><th>Когда в контексте</th><th>Файлы</th></tr>
    </thead>
    <tbody>
      <tr><td><b-ctx-layer kind="spec">Спека</b-ctx-layer></td><td>требования, план, шаги одной задачи</td><td>на время задачи</td><td><code>spec.md · plan.md · tasks.md</code></td></tr>
      <tr><td><b-ctx-layer kind="bible">Библия</b-ctx-layer></td><td>цель продукта, пользователи, решения</td><td>в начале задачи</td><td><code>projectbrief.md · productContext.md</code></td></tr>
      <tr><td><b-ctx-layer kind="rules">Правила</b-ctx-layer></td><td>команды, стиль, запреты</td><td>в каждой сессии</td><td><code>CLAUDE.md · AGENTS.md · .cursor/rules</code></td></tr>
      <tr><td><b-ctx-layer kind="skill">Скилл</b-ctx-layer></td><td>процедура с примерами и скриптами</td><td>описание всегда, тело по вызову</td><td><code>SKILL.md</code></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-finding>
    <ex>Слои различаются сроком жизни и моментом, когда попадают в контекст.</ex>
    <gen>Правила загружаются в каждую сессию, поэтому их держат короткими: Anthropic рекомендует до 200 строк на файл<b-proof href="https://code.claude.com/docs/en/memory" quote="Anthropic: «Size: target under 200 lines per CLAUDE.md file. Longer files consume more context and reduce adherence» — code.claude.com/docs/en/memory"/>. Длинное и редкое переносят в скиллы, тело которых загружается только при вызове<b-proof href="https://code.claude.com/docs/en/skills" quote="Anthropic: «skill descriptions are loaded into context so Claude knows what&#x27;s available, but full skill content only loads when invoked» — code.claude.com/docs/en/skills"/>.</gen>
    <do>Разберите свой файл инструкций: факты оставьте в правилах, процедуры перенесите в скиллы, описание продукта — в библию.</do>
  </b-finding>
</b-chapter>
<b-chapter id="spec" title="Спека: одна задача до кода" icon="file-lines">
  <b-why>Спека описывает задачу до начала работы: сначала что и зачем, затем как<b-proof href="https://github.com/github/spec-kit" quote="GitHub Spec Kit: «Define what and why before deciding how to build it. SDD turns your requirements into a specification, a technical plan, and actionable tasks, then guides implementation against those artifacts» — github.com/github/spec-kit"/>.</b-why>
  <b-seq-row>
    <step t="Принципы">один раз на проект</step>
    <step t="Спека">что и зачем</step>
    <step t="План">как</step>
    <step t="Задачи">шаги</step>
    <step t="Реализация">код по шагам</step>
  </b-seq-row>
  <b-cap>Основные шаги GitHub Spec Kit<b-proof href="https://github.com/github/spec-kit" quote="GitHub Spec Kit: constitution создаётся один раз на проект — «Create principles focused on code quality, testing, and maintainability». Пересказ — github.com/github/spec-kit"/>. Как делить большую спеку на части — в статье <a href="/blog/specs-by-aggregates/">Спеки по агрегатам</a></b-cap>
  <b-finding>
    <ex>Spec Kit ведёт задачу от принципов проекта через спеку и план к шагам и коду.</ex>
    <gen>Требования записаны до кода, и ревью сверяет результат с этим текстом. Как спека встраивается в харнесс, описано в статье <a href="/blog/harness-driven-development/#spec">HDD и спеки</a>.</gen>
    <do>Для задачи дольше одного дня напишите спеку: что, зачем и по каким признакам задача готова.</do>
  </b-finding>
</b-chapter>
<b-chapter id="bible" title="Библия проекта: что это за продукт" icon="notebook">
  <b-why>Библия — постоянное описание продукта: зачем он, для кого, как устроен и что уже решено. Термин из практики; ближайший документированный аналог — Memory Bank в Cline<b-proof href="https://docs.cline.bot/prompting/cline-memory-bank" quote="Cline: Memory Bank — «a documentation methodology that transforms Cline from a stateless assistant into a persistent development partner. Through structured markdown files, Cline can &#x27;remember&#x27; your project details across sessions» — docs.cline.bot/prompting/cline-memory-bank"/>.</b-why>
  <b-file-grid>
    <file name="projectbrief.md">цели и требования</file>
    <file name="productContext.md">зачем продукт, какие проблемы решает</file>
    <file name="systemPatterns.md">архитектура и паттерны</file>
    <file name="techContext.md">стек и ограничения</file>
    <file name="activeContext.md">текущий фокус и следующие шаги</file>
    <file name="progress.md">что готово, что осталось</file>
  </b-file-grid>
  <b-finding>
    <ex>Шесть файлов Memory Bank: от цели продукта до текущего прогресса.</ex>
    <gen>Библия отвечает на вопросы, которые иначе задают в каждом новом чате: что за продукт, какие решения приняты, что сейчас в работе. Файл текущего контекста обновляется чаще остальных<b-proof href="https://docs.cline.bot/prompting/cline-memory-bank" quote="Cline: activeContext.md — текущий фокус, последние изменения и следующие шаги, обновляется чаще остальных. Пересказ — docs.cline.bot/prompting/cline-memory-bank"/>.</gen>
    <do>Начните с одного файла: цель продукта, пользователи, ключевые термины и последние решения с датами.</do>
  </b-finding>
</b-chapter>
<b-chapter id="rules" title="Правила: в каждой сессии" icon="list-arrow">
  <b-why>Правила — инструкции, которые харнесс подставляет в начало каждой сессии<b-proof href="https://code.claude.com/docs/en/memory" quote="Anthropic: «CLAUDE.md files are loaded into the context window at the start of every session» — code.claude.com/docs/en/memory"/>.</b-why>
  <b-io justify>
    <item k="CLAUDE.md" mono>Claude Code, правила по путям в <code>.claude/rules/</code><b-proof href="https://code.claude.com/docs/en/memory" quote="Anthropic: «Rules can also be scoped to specific file paths, so they only load into context when Claude works with matching files» — code.claude.com/docs/en/memory"/></item>
    <item k="AGENTS.md" mono>«README для агентов»: Codex, Cursor, Gemini CLI, Copilot и другие<b-proof href="https://agents.md/" quote="agents.md: «Think of AGENTS.md as a README for agents: a dedicated, predictable place to provide the context and instructions to help AI coding agents work on your project» — agents.md"/></item>
    <item k=".cursor/rules" mono>Cursor, четыре режима подключения<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: четыре режима — Always Apply, Apply Intelligently, Apply to Specific Files, Apply Manually — cursor.com/docs/context/rules"/></item>
  </b-io>
  <b-sublabel top="18">Когда правило попадает в контекст · Cursor</b-sublabel>
  <b-rule-modes>
    <mode t="Всегда">каждый чат</mode>
    <mode t="По описанию">агент решает сам</mode>
    <mode t="По файлам">совпал шаблон пути</mode>
    <mode t="Вручную">@rule</mode>
  </b-rule-modes>
  <b-metric-line value="≤ 200">строк на файл CLAUDE.md<b-proof href="https://code.claude.com/docs/en/memory" quote="Anthropic: «Size: target under 200 lines per CLAUDE.md file. Longer files consume more context and reduce adherence» — code.claude.com/docs/en/memory"/></b-metric-line>
  <b-finding>
    <ex>Три формата одной идеи: файл с инструкциями, который харнесс читает в начале работы.</ex>
    <gen>Правила остаются контекстом, модель может их нарушить; действие, которое нужно запретить наверняка, блокируют хуком. Чем конкретнее и короче правило, тем стабильнее его выполняют<b-proof href="https://code.claude.com/docs/en/memory" quote="Anthropic: «Claude treats them as context, not enforced configuration. To block an action regardless of what Claude decides, use a PreToolUse hook instead. The more specific and concise your instructions, the more consistently Claude follows them» — code.claude.com/docs/en/memory"/>.</gen>
    <do>Заведите AGENTS.md или CLAUDE.md: команды сборки и тестов, стиль кода, запреты. Правила для отдельных папок вынесите в правила по путям.</do>
  </b-finding>
</b-chapter>
<b-chapter id="skills" title="Скиллы: процедура по вызову" icon="zap">
  <b-why>Скилл — папка с инструкцией SKILL.md, примерами и скриптами для повторяющейся процедуры<b-proof href="https://learn.chatgpt.com/docs/build-skills" quote="OpenAI: «ChatGPT and Codex start with each skill&#x27;s name and description, then load the full SKILL.md instructions when they decide to use that skill» — learn.chatgpt.com/docs/build-skills"/>.</b-why>
  <b-skill-pick start="Старт сессии" start-note="имя + описание" picked="↓ агент выбрал «ревью PR»" call="Вызов" call-note="тело целиком" file="SKILL.md" file-note="инструкция, примеры, скрипты">
    <skill>отчёт</skill>
    <skill on>ревью PR</skill>
    <skill>релиз</skill>
    <skill>письмо клиенту</skill>
  </b-skill-pick>
  <b-finding>
    <ex>Описания всех скиллов лежат в контексте всегда, тело загружается после выбора.</ex>
    <gen>Поэтому длинный справочник в скилле почти ничего не стоит до использования. Скилл заводят, когда одну и ту же инструкцию или чек-лист вставляют в чат снова и снова, или когда раздел правил превратился в процедуру<b-proof href="https://code.claude.com/docs/en/skills" quote="Anthropic: «Create a skill when you keep pasting the same instructions, checklist, or multi-step procedure into chat, or when a section of CLAUDE.md has grown into a procedure rather than a fact. Unlike CLAUDE.md content, a skill&#x27;s body loads only when it&#x27;s used» — code.claude.com/docs/en/skills"/>.</gen>
    <do>Найдите в правилах раздел, который описывает процедуру, и перенесите его в скилл с точным описанием, когда его применять.</do>
  </b-finding>
</b-chapter>
<b-chapter id="chat" title="То же в чате: проекты и скиллы" icon="chat">
  <b-io justify>
    <item k="Инструкции проекта" eq="≈ правила">Роль и формат один раз — для всех чатов проекта<b-proof href="https://help.openai.com/en/articles/10169521-projects-in-chatgpt" quote="ChatGPT: проект держит вместе чаты, файлы и инструкции; инструкции проекта действуют только внутри него, проектом можно поделиться с коллегами. Пересказ справки OpenAI — help.openai.com/en/articles/10169521"/><b-proof href="https://support.claude.com/en/articles/9517075-what-are-projects" quote="Claude: «You can define project instructions for each project to further tailor Claude&#39;s responses. For example, instructing Claude to use a more formal tone or answer questions from the perspective of a specific role» — support.claude.com/en/articles/9517075"/></item>
    <item k="Файлы проекта" eq="≈ библия">Примеры ответов, регламенты, шаблоны лежат в проекте<b-proof href="https://support.claude.com/en/articles/9517075-what-are-projects" quote="Claude: «You can upload relevant documents, text, code, or other files to a project&#39;s knowledge base, which Claude will use to better understand the context» — support.claude.com/en/articles/9517075"/></item>
    <item k="Скиллы" eq="= скиллы">Повторяющийся сценарий с инструкциями и примерами<b-proof href="https://support.claude.com/en/articles/12512180-use-skills-in-claude" quote="Claude: «Skills extend Claude&#39;s capabilities by giving it access to specialized knowledge and workflows» — support.claude.com/en/articles/12512180"/><b-proof href="https://help.openai.com/en/articles/20001066-skills-in-chatgpt" quote="ChatGPT: скиллы — переиспользуемые сценарии с инструкциями, примерами и кодом, на планах Business, Enterprise и Edu. Пересказ справки OpenAI — help.openai.com/en/articles/20001066"/></item>
  </b-io>
  <b-finding>
    <ex>Три места, где промпт живёт дольше одного чата: инструкции, файлы и скиллы.</ex>
    <gen>Роль, пример и формат, вынесенные в проект, работают в каждом новом чате без копирования. Общим проектом можно поделиться с командой, и все будут работать с одним набором примеров.</gen>
    <do>Заведите проект под самую частую задачу недели и перенесите в его инструкции роль и формат из своего лучшего промпта.</do>
  </b-finding>
</b-chapter>
<b-chapter id="pick" title="Что куда положить" icon="crosshair">
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>Если это…</th><th>Куда</th></tr>
    </thead>
    <tbody>
      <tr><td>команда, стиль или запрет, нужные в каждой задаче</td><td><b-ctx-layer kind="rules">Правила</b-ctx-layer></td></tr>
      <tr><td>процедура из нескольких шагов, нужная иногда</td><td><b-ctx-layer kind="skill">Скилл</b-ctx-layer></td></tr>
      <tr><td>требования к одной задаче</td><td><b-ctx-layer kind="spec">Спека</b-ctx-layer></td></tr>
      <tr><td>знание о продукте и принятые решения</td><td><b-ctx-layer kind="bible">Библия</b-ctx-layer></td></tr>
      <tr><td>ошибка агента, которая повторяется</td><td><a href="/blog/harness-driven-development/#loop">правило или проверка · HDD</a></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-finding>
    <ex>Пять ситуаций и пять мест.</ex>
    <gen>Место определяют частота и срок жизни. То, что нужно всегда, держат коротким; то, что нужно редко, можно держать подробным.</gen>
    <do>Раз в неделю просматривайте правила: процедуры переносите в скиллы, решения — в библию с датой.</do>
  </b-finding>
</b-chapter>
<b-chapter id="next" title="Дальше по теме">
  <b-links cols="2">
    <item href="/blog/harness-driven-development/" k="Метод" t="Harness-Driven Development">Ошибка агента → правило окружения</item>
    <item href="/blog/harness-work-approaches/" k="Подходы" t="Подходы к работе с харнессом">Цикл ответа и ревью</item>
    <item href="/blog/work-prompts-examples/" k="Практика" t="Промпты для рабочих задач">Пять частей и шесть примеров</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="Сравнение" t="Сравнение харнессов">Claude Code, Codex, Cursor, Hermes</item>
  </b-links>
</b-chapter>
<b-footer>По документации Anthropic, OpenAI, GitHub, Cursor и Cline, источник у значка рядом с утверждением. «Библия проекта» — термин из практики; пересказы помечены в подсказке источника.</b-footer>
</b-post>
