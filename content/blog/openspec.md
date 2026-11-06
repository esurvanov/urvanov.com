---
title: OpenSpec: что это и как работать — установка, команды и пример изменения
date: 2026-11-07
updated: 2026-11-07
description: Как устроен OpenSpec от Fission AI: папка изменения с планом, требованиями и задачами, три команды агенту и слияние в общие спеки. Установка за две команды, живой пример с этого сайта, сравнение со Spec Kit и готовые запросы, чтобы начать.
tags: AI, OpenSpec, спеки, Spec-Driven Development, Claude Code, Codex, Cursor
category: specs
layout: wide
mentions: OpenSpec, Spec-Driven Development, Spec Kit, Claude Code, Codex, Cursor, GitHub Copilot
toc: what=Что это | install=Установка | flow=Три команды | example=Пример | kit=OpenSpec или Spec Kit | start=С чего начать | faq=Вопросы | next=Дальше по теме
---

OpenSpec — бесплатная открытая программа для разработки по спецификациям (Spec-Driven Development). До кода ИИ-агент пишет в папку проекта план изменения: зачем оно, какие требования, как сделать и какие задачи. Вы проверяете план, агент пишет код по задачам, а готовые требования вливаются в общие спеки проекта. Ниже — установка, три команды и живой пример.

<b-post series="specs">
<b-chapter id="what" icon="file-lines" title="Что такое OpenSpec">
  <b-why>OpenSpec хранит требования в обычных файлах Markdown внутри репозитория. Действующие спеки лежат в <code>openspec/specs</code>, а каждое изменение получает свою папку в <code>openspec/changes</code><b-proof href="https://github.com/Fission-AI/OpenSpec" quote="OpenSpec: «Plain Markdown — requirements with concrete scenarios, no special syntax to learn» — github.com/Fission-AI/OpenSpec"/>. Агент читает эти файлы так же, как код.</b-why>
  <iso-art name="term:openspec"></iso-art>
  <b-io justify>
    <item k="proposal.md" mono>зачем изменение и что поменяется</item>
    <item k="specs/" mono>требования со сценариями «когда — тогда»</item>
    <item k="design.md" mono>как сделать: решения и риски</item>
    <item k="tasks.md" mono>список задач с галочками</item>
  </b-io>
  <b-finding>
    <ex>Четыре файла одного изменения: зачем, что, как и по каким шагам.</ex>
    <gen>План лежит рядом с кодом и проходит ревью до того, как агент начнёт писать. Ошибку в замысле видно уже в абзаце текста, раньше, чем она попадёт в код.</gen>
    <do>Перед крупной правкой просите агента сначала положить план в папку изменения и только потом писать код.</do>
  </b-finding>
</b-chapter>

<b-chapter id="install" icon="terminal" title="Установка">
  <b-why align="left">OpenSpec ставится одной командой, затем включается в проекте второй. На macOS и Linux в терминале:</b-why>
  <b-codebox title="Установка на macOS и Linux">
    curl -fsSL https://openspec.dev/cli/install.sh | sh
  </b-codebox>
  <b-why align="left">Через npm нужен Node.js 22.12 или новее<b-proof href="https://github.com/Fission-AI/OpenSpec" quote="OpenSpec: «npm install -g @fission-ai/openspec@latest (needs Node.js 22.12.0 or higher)» — github.com/Fission-AI/OpenSpec"/>. После установки откройте папку проекта и включите OpenSpec:</b-why>
  <b-codebox title="Через npm и включение в проекте">
    npm install -g @fission-ai/openspec@latest
    cd your-project
    openspec init
  </b-codebox>
  <b-finding>
    <ex><code>openspec init</code> спрашивает, с какими агентами вы работаете, и ставит им команды.</ex>
    <gen>Имя команды зависит от агента: в Claude Code это <code>/opsx:propose</code>, в Cursor и GitHub Copilot — <code>/opsx-propose</code>, в Codex — <code>$openspec-propose</code><b-proof href="https://github.com/Fission-AI/OpenSpec" quote="OpenSpec: «/opsx:propose is the canonical name; your tool may spell it /opsx-propose (Cursor, GitHub Copilot), @opsx-propose (Amazon Q) or $openspec-propose (Codex)» — github.com/Fission-AI/OpenSpec"/>.</gen>
    <do>Установку можно поручить самому агенту: попросите его поставить OpenSpec и запустить <code>openspec init</code> в текущем проекте.</do>
  </b-finding>
</b-chapter>

<b-chapter id="flow" icon="list-arrow" title="Три команды: план, код, слияние">
  <b-why align="left">Основной путь — три команды. Перед ними можно подумать вслух командой <code>/opsx:explore</code>: агент читает код и предлагает варианты, ничего не меняя.</b-why>
  <b-steps>
    <step t="/opsx:propose">агент создаёт папку изменения: proposal, требования, design и задачи</step>
    <step t="Ревью плана">вы читаете файлы и правите их до кода</step>
    <step t="/opsx:apply">агент пишет код по задачам и отмечает галочки</step>
    <step t="/opsx:archive" hl>требования изменения вливаются в общие спеки, папка уходит в архив</step>
  </b-steps>
  <b-finding>
    <ex>После архивации в <code>openspec/specs</code> лежит актуальное описание системы, а история решений — в архиве изменений.</ex>
    <gen>Спеки обновляются тем же шагом, что и код, поэтому не устаревают, как отдельная вики.</gen>
    <do>Не пропускайте архивацию: без неё следующее изменение опирается на старые требования.</do>
  </b-finding>
</b-chapter>

<b-chapter id="example" icon="notebook" title="Живой пример с этого сайта">
  <b-why align="left">Изменение <code>fill-all-pattern-details</code> в репозитории этого сайта. Задача: у 72 из 73 паттернов в каталоге при клике открывался только заголовок, а нужна была полная карточка.</b-why>
  <b-io justify>
    <item k="proposal.md" mono>зачем: каталог паттернов — ключевая часть доклада, пустые карточки его портят</item>
    <item k="design.md" mono>одна задача на категорию, цитаты только из исходного файла</item>
    <item k="tasks.md" mono>10 задач по 10 категориям, все с галочками</item>
  </b-io>
  <b-codebox title="Фрагмент требований из specs/pattern-detail/spec.md">
    ## MODIFIED Requirements
    ### Requirement: Структура детального контента паттерна
    Все паттерны во всех категориях SHALL иметь заполненный detail.
    #### Scenario: Частичный контент
    - WHEN пользователь открывает паттерн, у которого есть только problem и solution
    - THEN карточка показывает только эти секции, без пустых блоков
  </b-codebox>
  <b-finding>
    <ex>Сценарий «частичный контент» появился в плане до кода и сразу задал, как вести себя карточке без цитаты и схемы.</ex>
    <gen>Требования со сценариями «когда — тогда» читаются как тесты: агенту понятно, что считать готовым.</gen>
    <do>В каждом требовании пишите хотя бы один сценарий для краевого случая: пустые данные, частичные данные, ошибка.</do>
  </b-finding>
</b-chapter>

<b-chapter id="kit" icon="crosshair" title="OpenSpec или Spec Kit">
  <b-table>
  | | OpenSpec | Spec Kit |
  |---|---|---|
  | Порядок шагов | гибкий: можно вернуться к плану в любой момент | жёсткие фазы: принципы, спека, план, задачи, код |
  | Где спеки | <code>openspec/specs</code> и папки изменений | папка фичи со спекой, планом и задачами |
  | Для какого проекта | удобен для уже работающего кода | удобен для новой фичи с нуля |
  | Кто делает | Fission AI | GitHub |
  </b-table>
  <b-finding>
    <ex>OpenSpec описывает себя как гибкий и рассчитанный на существующий код<b-proof href="https://github.com/Fission-AI/OpenSpec" quote="OpenSpec: «fluid not rigid → iterative not waterfall → easy not complex → built for brownfield not just greenfield» — github.com/Fission-AI/OpenSpec"/>.</ex>
    <gen>Spec Kit ведёт по шагам и подходит, когда команде нужна дисциплина. OpenSpec легче и быстрее приживается в проекте, где код уже есть.</gen>
    <do>Для правок в живом проекте начните с OpenSpec, для новой большой фичи с нуля сравните оба на одной задаче.</do>
  </b-finding>
</b-chapter>

<b-chapter id="start" icon="flag" title="С чего начать">
  <b-why align="left">Пять запросов агенту, по одному на шаг. Скопируйте их в Claude Code, Codex или Cursor.</b-why>
  <b-hdd-steps>
    <step t="Установка">«Установи OpenSpec и запусти openspec init в этом проекте. Покажи, какие команды появились»</step>
    <step t="Разведка">«/opsx:explore Хочу добавить … Посмотри код и предложи два варианта, ничего не меняя»</step>
    <step t="План">«/opsx:propose … Сначала только план. В требованиях дай сценарии для пустых и частичных данных»</step>
    <step t="Код">«/opsx:apply Сделай задачи по одной, после каждой запускай тесты»</step>
    <step t="Слияние">«/opsx:archive Перенеси требования в спеки и покажи, что изменилось в openspec/specs»</step>
  </b-hdd-steps>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Частые вопросы">
  <b-faq-cards>
    <q t="Что такое OpenSpec?">Бесплатная открытая программа от Fission AI для разработки по спецификациям. Агент пишет план изменения в файлы Markdown, вы его проверяете, агент пишет код, а требования вливаются в общие спеки проекта.</q>
    <q t="Как установить OpenSpec?">Командой curl -fsSL https://openspec.dev/cli/install.sh | sh на macOS и Linux или через npm install -g @fission-ai/openspec@latest. Затем в папке проекта запустите openspec init.</q>
    <q t="Чем OpenSpec отличается от Spec Kit?">OpenSpec гибче и рассчитан на уже работающий код, шаги можно повторять в любом порядке. Spec Kit от GitHub ведёт по жёстким фазам: принципы, спека, план, задачи, код.</q>
    <q t="С какими агентами работает OpenSpec?">С Claude Code, Codex, Cursor, GitHub Copilot, Amazon Q и другими. Команда openspec init ставит команды под те агенты, которые вы выбрали.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Дальше по теме">
  <b-links>
    <item href="/blog/specs-rules-skills/" k="Контекст" t="AGENTS.md и CLAUDE.md">что агент должен знать о проекте и где это хранить</item>
    <item href="/blog/specs-by-aggregates/" k="Спеки" t="Спеки по агрегатам">как резать требования на части</item>
    <item href="/blog/spec-reconcile-loop/" k="Спеки" t="Петля сверки для спек">как держать спеку и код в согласии</item>
    <item href="/materials/glossary/spec-driven-development/" k="Термин" t="Spec-Driven Development">что такое разработка по спецификациям</item>
  </b-links>
</b-chapter>
</b-post>
