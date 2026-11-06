---
title: Что такое OpenSpec: установка, команды и пример изменения
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
  <b-why align="left">Без плана агент пишет код прямо по сообщению в чате. Замысел живёт только в этом чате: через неделю никто не вспомнит, почему сделано именно так, а следующий агент начнёт с чистого листа и может переделать по-своему.</b-why>
  <b-why align="left">OpenSpec выносит замысел из чата в файлы рядом с кодом. Каждое изменение получает свою папку в <code>openspec/changes</code>: в ней записано, зачем оно, какие требования меняются, как это сделать и по каким шагам. Действующие требования ко всей системе лежат отдельно, в <code>openspec/specs</code>. Это обычный Markdown без особого синтаксиса<b-proof href="https://github.com/Fission-AI/OpenSpec" quote="OpenSpec: «Plain Markdown — requirements with concrete scenarios, no special syntax to learn» — github.com/Fission-AI/OpenSpec"/>, поэтому его читают и люди, и агент.</b-why>
  <iso-art name="term:openspec"></iso-art>
  <b-table>
  | Файл | На какой вопрос отвечает | Что внутри |
  |---|---|---|
  | <code>proposal.md</code> | Зачем? | причина изменения и что именно поменяется |
  | <code>specs/</code> | Что должно быть? | требования со словами SHALL и MUST и сценарии «когда — тогда» |
  | <code>design.md</code> | Как сделать? | технические решения, цели, что не делаем, риски |
  | <code>tasks.md</code> | В каком порядке? | список задач с галочками, по которому идёт агент |
  </b-table>
  <b-finding>
    <ex>Четыре файла одного изменения отвечают на четыре вопроса: зачем, что, как и в каком порядке.</ex>
    <gen>План лежит рядом с кодом и проходит ревью до того, как агент начнёт писать. Ошибку в замысле видно уже в абзаце текста, раньше, чем она попадёт в код.</gen>
    <do>Перед крупной правкой просите агента сначала положить план в папку изменения и только потом писать код.</do>
  </b-finding>
</b-chapter>

<b-chapter id="install" icon="terminal" title="Установка">
  <b-why align="left">OpenSpec состоит из двух частей. Первая — программа командной строки <code>openspec</code>: её ставят один раз на компьютер. Вторая — настройка конкретного проекта: команда <code>openspec init</code> создаёт в нём папку <code>openspec/</code> и добавляет агентам команды вроде <code>/opsx:propose</code>.</b-why>
  <b-pipe label="Что происходит при установке">
    <node icon="terminal" color="c-code" sub="один раз на компьютер">установка openspec</node>
    <node icon="folder" color="c-proj" sub="в папке проекта">openspec init</node>
    <node icon="bot" color="c-chat" sub="команды для выбранных агентов">/opsx:propose и другие</node>
  </b-pipe>
  <b-codebox title="Установка на macOS и Linux">
    curl -fsSL https://openspec.dev/cli/install.sh | sh
  </b-codebox>
  <b-why align="left">Если удобнее npm, понадобится Node.js 22.12 или новее<b-proof href="https://github.com/Fission-AI/OpenSpec" quote="OpenSpec: «npm install -g @fission-ai/openspec@latest (needs Node.js 22.12.0 or higher)» — github.com/Fission-AI/OpenSpec"/>. На Windows есть свой скрипт установки для PowerShell, на macOS — пакет Homebrew. Затем откройте папку проекта и включите OpenSpec:</b-why>
  <b-codebox title="Через npm и включение в проекте">
    npm install -g @fission-ai/openspec@latest
    cd your-project
    openspec init
  </b-codebox>
  <b-why align="left"><code>openspec init</code> спрашивает, с какими агентами вы работаете, и ставит команды именно им. Имя команды у агентов разное: в Claude Code это <code>/opsx:propose</code>, в Cursor и GitHub Copilot — <code>/opsx-propose</code>, в Codex — <code>$openspec-propose</code><b-proof href="https://github.com/Fission-AI/OpenSpec" quote="OpenSpec: «/opsx:propose is the canonical name; your tool may spell it /opsx-propose (Cursor, GitHub Copilot), @opsx-propose (Amazon Q) or $openspec-propose (Codex)» — github.com/Fission-AI/OpenSpec"/>. Дальше в статье — написание Claude Code.</b-why>
  <b-finding>
    <ex>Две команды: одна ставит программу, вторая готовит проект и подключает агентов.</ex>
    <gen>Установку можно не делать руками: у OpenSpec есть готовый запрос, по которому агент сам ставит программу, запускает <code>openspec init</code> и проверяет результат.</gen>
    <do>Попросите агента: «Установи OpenSpec и запусти openspec init в этом проекте, покажи, какие команды появились».</do>
  </b-finding>
</b-chapter>

<b-chapter id="flow" icon="list-arrow" title="Три команды: план, код, слияние">
  <b-why align="left">Работа идёт по кругу из трёх команд. Перед ними можно подумать вслух командой <code>/opsx:explore</code>: агент читает код, предлагает варианты и ничего не меняет. Когда понятно, что делать, начинается основной путь. Пример сессии по мотивам демонстрации из описания OpenSpec<b-proof href="https://github.com/Fission-AI/OpenSpec" quote="OpenSpec: «You: /opsx:propose add-dark-mode / AI: Created openspec/changes/add-dark-mode/ ✓ proposal.md ✓ specs/ ✓ design.md ✓ tasks.md … You: /opsx:archive / AI: Archived to openspec/changes/archive/… Specs updated.» — github.com/Fission-AI/OpenSpec"/>:</b-why>
  <b-agent-term app="Claude&#8203; Code" ver="v2" model="OpenSpec · /opsx" path="~/projects/shop">
    <line kind="ask">/opsx:propose add-dark-mode</line>
    <line kind="act">Создал openspec/changes/add-dark-mode/</line>
    <line kind="out">proposal.md · specs/ · design.md · tasks.md</line>
    <line kind="you" note="вы читаете план">Добавь сценарий: тема сохраняется после перезагрузки</line>
    <line kind="ask">/opsx:apply</line>
    <line kind="act">1.1 контекст темы ✓ · 1.2 переключатель ✓ · 2.1 цвета ✓</line>
    <line kind="out">все задачи выполнены</line>
    <line kind="ask">/opsx:archive</line>
    <line kind="act">Перенёс требования в openspec/specs, папку изменения — в архив</line>
  </b-agent-term>
  <b-table>
  | Команда | Что делает агент | Что появляется в проекте | Что делаете вы |
  |---|---|---|---|
  | <code>/opsx:explore</code> | читает код, предлагает варианты | ничего | выбираете вариант |
  | <code>/opsx:propose</code> | пишет план изменения | папка <code>openspec/changes/имя/</code> с четырьмя файлами | читаете и правите план |
  | <code>/opsx:apply</code> | пишет код по задачам, отмечает галочки | код и тесты | проверяете результат |
  | <code>/opsx:archive</code> | вливает требования в общие спеки | обновлённые <code>openspec/specs</code>, папка в архиве | ничего, это завершение |
  </b-table>
  <b-why align="left">Для больших задач есть расширенный набор: создать изменение по шагам, продолжить начатое, проверить код по спеке. Его включают командой <code>openspec config profile</code>.</b-why>
  <b-finding>
    <ex>После архивации в <code>openspec/specs</code> лежит актуальное описание системы, а история решений — в архиве изменений.</ex>
    <gen>Спеки обновляются тем же шагом, что и код, поэтому не устаревают, как отдельная вики.</gen>
    <do>Не пропускайте архивацию: без неё следующее изменение опирается на старые требования.</do>
  </b-finding>
</b-chapter>

<b-chapter id="example" icon="notebook" title="Живой пример с этого сайта">
  <b-why align="left">Изменение <code>fill-all-pattern-details</code> из репозитория этого сайта. В каталоге AI-паттернов 72 из 73 карточек при клике открывали только заголовок и одну строку. Нужно было заполнить каждую: проблема, решение, цитата, когда работает и когда ломается.</b-why>
  <b-table>
  | Файл | Что в нём было |
  |---|---|
  | <code>proposal.md</code> | зачем: каталог паттернов — ключевая часть доклада, пустые карточки его портят; что меняется: поле detail у всех паттернов |
  | <code>design.md</code> | одна задача на категорию паттернов; цитаты только из исходного файла, ничего не придумывать; схема только там, где есть поток данных |
  | <code>specs/pattern-detail/spec.md</code> | требование «у всех паттернов заполнен detail» и три сценария показа карточки |
  | <code>tasks.md</code> | 10 задач по 10 категориям, все с галочками |
  </b-table>
  <b-codebox title="Фрагмент требований из specs/pattern-detail/spec.md">
    ## MODIFIED Requirements
    ### Requirement: Структура детального контента паттерна
    Все паттерны во всех категориях SHALL иметь заполненный detail.
    #### Scenario: Частичный контент
    - WHEN пользователь открывает паттерн, у которого есть только problem и solution
    - THEN карточка показывает только эти секции, без пустых блоков
  </b-codebox>
  <b-why align="left">Решение «цитаты только из источника» записано в design.md до кода. Поэтому агент не сочинял цитаты там, где их не было, а сценарий «частичный контент» заранее задал, как выглядит карточка без цитаты и схемы.</b-why>
  <b-finding>
    <ex>Сценарий «частичный контент» появился в плане до кода и сразу задал, как вести себя карточке без цитаты и схемы.</ex>
    <gen>Требования со сценариями «когда — тогда» читаются как тесты: агенту понятно, что считать готовым.</gen>
    <do>В каждом требовании пишите хотя бы один сценарий для краевого случая: пустые данные, частичные данные, ошибка.</do>
  </b-finding>
</b-chapter>

<b-chapter id="kit" icon="crosshair" title="OpenSpec или Spec Kit">
  <b-why align="left">Обе программы ведут разработку от спецификации, но по-разному понимают порядок. Spec Kit от GitHub проводит по фазам строго друг за другом. OpenSpec позволяет вернуться к плану в любой момент и рассчитан на проект, где код уже есть<b-proof href="https://github.com/Fission-AI/OpenSpec" quote="OpenSpec: «fluid not rigid → iterative not waterfall → easy not complex → built for brownfield not just greenfield» — github.com/Fission-AI/OpenSpec"/>.</b-why>
  <b-table>
  | | OpenSpec | Spec Kit |
  |---|---|---|
  | Порядок шагов | гибкий: можно вернуться к плану в любой момент | жёсткие фазы: принципы, спека, план, задачи, код |
  | Где спеки | <code>openspec/specs</code> и папки изменений | папка фичи со спекой, планом и задачами |
  | Для какого проекта | удобен для уже работающего кода | удобен для новой фичи с нуля |
  | Несколько репозиториев | общее хранилище планов (Stores, бета) | в каждом репозитории своё |
  | Кто делает | Fission AI | GitHub |
  </b-table>
  <b-finding>
    <ex>OpenSpec описывает себя как гибкий и рассчитанный на существующий код.</ex>
    <gen>Spec Kit ведёт по шагам и подходит, когда команде нужна дисциплина. OpenSpec легче и быстрее приживается в проекте, где код уже есть.</gen>
    <do>Для правок в живом проекте начните с OpenSpec, для новой большой фичи с нуля сравните оба на одной задаче.</do>
  </b-finding>
</b-chapter>

<b-chapter id="start" icon="flag" title="С чего начать">
  <b-why align="left">Начните с одной небольшой правки, которую вы и так собирались сделать. Пять запросов агенту, по одному на шаг: скопируйте их в Claude Code, Codex или Cursor и подставьте свою задачу.</b-why>
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
