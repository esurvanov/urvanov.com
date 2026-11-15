---
title: Что такое OpenSpec, установка и команды: пример изменения от плана до слияния
date: 2026-11-07
updated: 2026-11-15
description: Как устроен OpenSpec от Fission AI: папка изменения с планом, требованиями и задачами, три команды агенту и слияние в общие спеки. Установка за две команды, реальный пример изменения из репозитория сайта urvanov.com, сравнение со Spec Kit и готовые запросы, чтобы начать.
tags: AI, OpenSpec, спеки, Spec-Driven Development, Claude Code, Codex, Cursor
category: specs
layout: wide
mentions: OpenSpec, Spec-Driven Development, Spec Kit, Claude Code, Codex, Cursor, GitHub Copilot
toc: what=Что это | install=Установка | flow=Три команды | example=Пример | notneeded=Когда не нужен | kit=OpenSpec или Spec Kit | start=С чего начать | problems=Проблемы | faq=Вопросы | next=Дальше по теме
---

OpenSpec — это бесплатная открытая программа для разработки по спецификациям (Spec-Driven Development, SDD): перед кодом ИИ-агент пишет в папку проекта план изменения — зачем оно, какие требования, как сделать и какие задачи. Вы проверяете план, агент пишет код по задачам, а готовые требования вливаются в общие спеки. Ниже — установка, три команды и разбор настоящего изменения.

<b-post series="specs">
<b-chapter id="what" icon="file-lines" title="Что такое OpenSpec">
  <b-why align="left">Без плана агент пишет код прямо по сообщению в чате. Замысел живёт только в этом чате: через неделю никто не вспомнит, почему сделано именно так, а следующий агент начнёт с чистого листа и может переделать по-своему.</b-why>
  <iso-art name="openspec/chat-vs-files"></iso-art>
  <b-why align="left">Слева — обычная работа: вы пишете агенту «сделай так», потом «а ещё вот это», он пишет код. Код остаётся, а объяснение, зачем он такой, остаётся в истории переписки. Справа — работа с OpenSpec: агент сначала кладёт план в файлы проекта, вы читаете и правите этот план, и только потом агент пишет код строго по нему. План хранится в репозитории вместе с кодом, его видят все участники и все следующие агенты.</b-why>
  <b-why align="left">OpenSpec выносит замысел из чата в файлы рядом с кодом. Каждое изменение получает свою папку в <code>openspec/changes</code>: в ней записано, зачем оно, какие требования меняются, как это сделать и по каким шагам. Действующие требования ко всей системе лежат отдельно, в <code>openspec/specs</code>. Это обычный Markdown без особого синтаксиса<b-proof href="https://github.com/Fission-AI/OpenSpec" quote="OpenSpec: «Plain Markdown — requirements with concrete scenarios, no special syntax to learn» — github.com/Fission-AI/OpenSpec"/>, поэтому его читают и люди, и агент.</b-why>
  <iso-art name="term:openspec"></iso-art>
  <b-why align="left">На схеме видно две части. Папка изменения — это черновик: в ней лежит то, что вы собираетесь поменять. Общие спеки — это описание системы, какой она уже есть. Пока изменение не закончено, общие спеки не трогаются. Когда код готов, требования из папки изменения переносятся в общие спеки, и описание системы снова совпадает с кодом. Каждое изменение состоит из четырёх файлов:</b-why>
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
  <b-why align="left">OpenSpec состоит из двух частей. Первая — программа командной строки <code>openspec</code>: её ставят один раз на компьютер. Вторая — настройка конкретного проекта: команда <code>openspec init</code> создаёт в нём папку <code>openspec/</code> и добавляет агентам команды вроде <code>/openspec-propose</code>.</b-why>
  <iso-art name="openspec/install"></iso-art>
  <b-why align="left">Порядок на схеме: сначала программа появляется на компьютере, затем в проекте появляется папка <code>openspec/</code> с двумя подпапками — <code>specs</code> для действующих требований и <code>changes</code> для изменений в работе, — и в конце ваши агенты получают новые команды. Код проекта при этом не меняется: добавляются только папка с планами и файлы с командами для агентов. Команда для macOS и Linux:</b-why>
  <b-codebox title="Установка на macOS и Linux">
    curl -fsSL https://openspec.dev/cli/install.sh | sh
  </b-codebox>
  <b-why align="left">Если удобнее npm, понадобится Node.js 22.12 или новее<b-proof href="https://github.com/Fission-AI/OpenSpec" quote="OpenSpec: «npm install -g @fission-ai/openspec@latest (needs Node.js 22.12.0 or higher)» — github.com/Fission-AI/OpenSpec"/>. На Windows есть свой скрипт установки для PowerShell, на macOS — пакет Homebrew. Затем откройте папку проекта и включите OpenSpec:</b-why>
  <b-codebox title="Через npm и включение в проекте">
    npm install -g @fission-ai/openspec@latest
    cd your-project
    openspec init
  </b-codebox>
  <b-why align="left"><code>openspec init</code> спрашивает, с какими агентами вы работаете, и ставит им скиллы OpenSpec в общую папку <code>.agents/skills/</code>. В Claude Code и большинстве агентов их вызывают как <code>/openspec-propose</code>, в Codex — <code>$openspec-propose</code>, можно и просто попросить словами<b-proof href="https://github.com/Fission-AI/OpenSpec" quote="OpenSpec: «These are skills. Most tools invoke them as /openspec-propose and Codex as $openspec-propose, or you can ask for the work in plain words. … Coming from 1.x and its /opsx:* commands? See Upgrade to 2.0» — github.com/Fission-AI/OpenSpec"/>. В версиях 1.x те же шаги назывались <code>/opsx:propose</code>, <code>/opsx:apply</code>, <code>/opsx:archive</code>; чтобы перейти на 2.0, запустите <code>openspec update</code> в каждом проекте. Дальше в статье — написание Claude Code.</b-why>
  <b-why align="left">Если в проекте несколько агентов, например часть команды работает в Cursor, а часть в Claude Code, отметьте их все: план изменения один и тот же, а команды для каждого агента ставятся свои. Программа бесплатная и работает локально, учётная запись не нужна.</b-why>
  <b-finding>
    <ex>Две команды: одна ставит программу, вторая готовит проект и подключает агентов.</ex>
    <gen>Установку можно не делать руками: у OpenSpec есть готовый запрос, по которому агент сам ставит программу, запускает <code>openspec init</code> и проверяет результат.</gen>
    <do>Попросите агента: «Установи OpenSpec и запусти openspec init в этом проекте, покажи, какие команды появились».</do>
  </b-finding>
</b-chapter>

<b-chapter id="flow" icon="list-arrow" title="Три команды: план, код, слияние">
  <b-why align="left">Работа идёт по кругу из трёх команд. Перед ними можно подумать вслух командой <code>/openspec-explore</code>: агент читает код, предлагает варианты и ничего не меняет. Когда понятно, что делать, начинается основной путь.</b-why>
  <iso-art name="openspec/loop"></iso-art>
  <b-why align="left">Круг на схеме читается по часовой стрелке. Первая команда <code>/openspec-propose</code> просит агента написать план: он создаёт папку изменения и четыре файла. Затем ход за вами: вы читаете план и правите его словами в чате или прямо в файлах. Это главная точка контроля, потому что исправить абзац текста дешевле, чем переписывать готовый код. Вторая команда <code>/openspec-apply-change</code> запускает работу по задачам: агент берёт задачи из <code>tasks.md</code> по одной и отмечает каждую галочкой. Третья команда <code>/openspec-archive-change</code> закрывает изменение: требования переезжают в общие спеки, а сама папка уходит в архив вместе со всей историей решений. Следующее изменение начинается уже от обновлённых спек.</b-why>
  <b-why align="left">Так выглядит короткая сессия в терминале. Пример сессии по мотивам демонстрации из описания OpenSpec<b-proof href="https://github.com/Fission-AI/OpenSpec" quote="OpenSpec: «You: /openspec-propose add-dark-mode / AI: Created openspec/changes/add-dark-mode/ ✓ proposal.md ✓ specs/ ✓ design.md ✓ tasks.md … You: /openspec-archive-change / AI: Archived to openspec/changes/archive/… Specs updated.» — github.com/Fission-AI/OpenSpec"/>:</b-why>
  <b-agent-term app="Claude&#8203; Code" ver="v2" model="OpenSpec 2.0 · skills" path="~/projects/shop">
    <line kind="ask">/openspec-propose add-dark-mode</line>
    <line kind="act">Создал openspec/changes/add-dark-mode/</line>
    <line kind="out">proposal.md · specs/ · design.md · tasks.md</line>
    <line kind="you" note="вы читаете план">Добавь сценарий: тема сохраняется после перезагрузки</line>
    <line kind="ask">/openspec-apply-change</line>
    <line kind="act">1.1 контекст темы ✓ · 1.2 переключатель ✓ · 2.1 цвета ✓</line>
    <line kind="out">все задачи выполнены</line>
    <line kind="ask">/openspec-archive-change</line>
    <line kind="act">Перенёс требования в openspec/specs, папку изменения — в архив</line>
  </b-agent-term>
  <b-table>
  | Команда | Что делает агент | Что появляется в проекте | Что делаете вы |
  |---|---|---|---|
  | <code>/openspec-explore</code> | читает код, предлагает варианты | ничего | выбираете вариант |
  | <code>/openspec-propose</code> | пишет план изменения | папка <code>openspec/changes/имя/</code> с четырьмя файлами | читаете и правите план |
  | <code>/openspec-apply-change</code> | пишет код по задачам, отмечает галочки | код и тесты | проверяете результат |
  | <code>/openspec-archive-change</code> | вливает требования в общие спеки | обновлённые <code>openspec/specs</code>, папка в архиве | ничего, это завершение |
  </b-table>
  <b-why align="left">Для больших задач есть расширенный набор: создать изменение по шагам, продолжить начатое, проверить код по спеке. Его включают командой <code>openspec config profile</code>, а применяют в проекте командой <code>openspec update</code>.</b-why>
  <b-callout icon="clock">**Команды актуальны на 15.11.2026 (OpenSpec 2.0.0).** В статьях 2025 года и в документации других сайтов встречаются старые команды `/openspec:*` и `/opsx:*`: в версии 2.0 вместо них работают скиллы `/openspec-*`<b-proof href="https://openspec.dev/docs/upgrade-to-2" quote="OpenSpec, Upgrade to 2.0: «/opsx:propose → openspec-propose; /opsx:apply → openspec-apply-change» — openspec.dev/docs/upgrade-to-2"/>. После обновления программы выполните <code>openspec update</code> в каждом проекте.</b-callout>
  <b-finding>
    <ex>После архивации в <code>openspec/specs</code> лежит актуальное описание системы, а история решений — в архиве изменений.</ex>
    <gen>Спеки обновляются тем же шагом, что и код, поэтому не устаревают, как отдельная вики.</gen>
    <do>Не пропускайте архивацию: без неё следующее изменение опирается на старые требования.</do>
  </b-finding>
</b-chapter>

<b-chapter id="example" icon="notebook" title="Пример: изменение в репозитории сайта urvanov.com">
  <b-why align="left">Этот пример взят из репозитория сайта urvanov.com, на котором опубликована эта статья. В коде сайта есть папка <code>openspec/</code>, в которой сохранилось это изменение. На сайте есть <a href="/patterns">каталог AI-паттернов</a> — собрание из 73 приёмов работы с ИИ-агентами, разложенных по 10 темам: контекст и память, оркестрация, безопасность, контроль качества и другие. Каждый приём показан карточкой. Каталог сделан как приложение к докладу «Spec-Driven Development на практике» на конференции Podlodka Crew.</b-why>
  <b-why align="left">Проблема была такая: при клике на карточку 72 приёма из 73 показывали только название и одну строку описания. Нужно было, чтобы каждая карточка раскрывалась полностью: какую проблему решает приём, как он устроен, цитата практика, когда приём работает и когда ломается. Материал для этого уже был в заметках исследования, его нужно было аккуратно перенести без выдумок. Изменение назвали <code>fill-all-pattern-details</code>, что значит «заполнить подробности всех паттернов». Вот что агент записал в его четыре файла:</b-why>
  <b-table>
  | Файл | Что в нём было |
  |---|---|
  | <code>proposal.md</code> | зачем: каталог — ключевая часть доклада, а пустые карточки его портят; что меняется: у всех 73 приёмов появляется подробное описание |
  | <code>design.md</code> | одна задача на категорию паттернов; цитаты только из исходного файла, ничего не придумывать; схема только там, где есть поток данных |
  | <code>specs/pattern-detail/spec.md</code> | требование «у всех паттернов заполнен detail» и три сценария показа карточки |
  | <code>tasks.md</code> | 10 задач по 10 категориям, все с галочками |
  </b-table>
  <b-why align="left">Ниже — кусок файла с требованиями. Слово SHALL означает «обязано»: так помечают требование, которое нельзя пропустить. Scenario — сценарий проверки: WHEN описывает ситуацию, THEN — что должно получиться. Здесь detail — подробное описание приёма, а problem и solution — его части «проблема» и «решение».</b-why>
  <b-codebox title="Фрагмент требований из specs/pattern-detail/spec.md">
    ## MODIFIED Requirements
    ### Requirement: Структура детального контента паттерна
    Все паттерны во всех категориях SHALL иметь заполненный detail.
    #### Scenario: Частичный контент
    - WHEN пользователь открывает паттерн, у которого есть только problem и solution
    - THEN карточка показывает только эти секции, без пустых блоков
  </b-codebox>
  <b-why align="left">Решение «цитаты только из источника» записано в design.md до кода. Поэтому агент не сочинял цитаты там, где их не было, а сценарий «частичный контент» заранее задал, как выглядит карточка без цитаты и схемы.</b-why>
  <b-why align="left">Работа заняла 10 задач, по одной на каждую тему каталога. Все 10 задач отмечены галочками, но команду архивации так и не запустили: папка изменения до сих пор лежит в <code>openspec/changes</code>, а общих спек у сайта нет. Это частая ошибка. Требование «у всех приёмов есть подробное описание» сейчас записано только в черновике изменения, и следующий агент, читающий общие спеки, о нём не узнает. Одна команда <code>/openspec-archive-change</code> перенесла бы его в общие спеки.</b-why>
  <b-finding>
    <ex>Сценарий «частичный контент» появился в плане до кода и сразу задал, как вести себя карточке без цитаты и схемы.</ex>
    <gen>Требования со сценариями «когда — тогда» читаются как тесты: агенту понятно, что считать готовым.</gen>
    <do>В каждом требовании пишите хотя бы один сценарий для краевого случая: пустые данные, частичные данные, ошибка.</do>
  </b-finding>
</b-chapter>

<b-chapter id="notneeded" icon="ban" title="Когда OpenSpec не нужен">
  <b-why align="left">Папка изменения с четырьмя файлами окупается там, где замысел сложнее одного абзаца. Для мелочей она тяжелее самой работы. Авторы советуют подбирать подробность под масштаб изменения: для простой правки не нужны несколько требований и файл с дизайном<b-proof href="https://github.com/Fission-AI/OpenSpec/blob/main/docs/writing-specs.md" quote="OpenSpec, Writing Good Specs: «A trivial fix doesn&#39;t need multiple requirements and a design doc» — github.com/Fission-AI/OpenSpec/blob/main/docs/writing-specs.md"/>.</b-why>
  <b-rules cols="2">
    <rule icon="edit" t="Правка в одну строку">Опечатка, цвет кнопки, константа. Сообщения коммита достаточно, план длиннее самой правки.</rule>
    <rule icon="zap" t="Срочная заплатка">Прод лежит, дыру нужно закрыть за час. Заплатку делают сразу, а требование записывают после, если оно нужно.</rule>
    <rule icon="terminal" t="Одноразовый скрипт">Разовая выгрузка или миграция, которую выбросят завтра. Спеке нечего описывать: поведение никто не будет поддерживать.</rule>
    <rule icon="flask" t="Эксперимент и набросок">Пока неясно, что строить, спеку писать рано. Сначала разведка, при желании через <code>/openspec-explore</code>, и только потом план.</rule>
  </b-rules>
  <b-finding>
    <ex>Изменение, которое можно сказать одним предложением и проверить одним взглядом, в папку изменения не нужно.</ex>
    <gen>OpenSpec полезен, когда план стоит прочитать: несколько файлов, несколько агентов, правка через неделю. В остальных случаях он превращается в церемонию.</gen>
    <do>Если сомневаетесь, сделайте правку без плана. Нужна история решений — заведите изменение.</do>
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
  <b-why align="left"><b>Короткий пример за 5 минут.</b> Две команды в терминале и три в чате агента. Сначала установка и подготовка проекта:</b-why>
  <b-codebox title="Терминал: установка и openspec init">
    curl -fsSL https://openspec.dev/cli/install.sh | sh
    cd your-project
    openspec init
  </b-codebox>
  <b-why align="left">Дальше три команды в чате агента: <code>/openspec-propose add-dark-mode</code> (агент пишет план), <code>/openspec-apply-change</code> (код по задачам), <code>/openspec-archive-change</code> (слияние в общие спеки). После <code>/openspec-propose</code> в проекте появляется папка изменения, а после архивации она переезжает в <code>archive</code>, и требования попадают в <code>specs</code><b-proof href="https://github.com/Fission-AI/OpenSpec/blob/main/docs/getting-started.md" quote="OpenSpec, Getting Started: «openspec/ ├── specs/ # Source of truth … └── changes/ # Proposed updates (one folder per change) … proposal.md, design.md, tasks.md, specs/ # Delta specs» — github.com/Fission-AI/OpenSpec/blob/main/docs/getting-started.md"/>:</b-why>
  <b-codebox title="Что лежит в openspec/ после /openspec-propose add-dark-mode">
    openspec/
    ├── specs/                  действующие требования
    └── changes/
        └── add-dark-mode/
            ├── proposal.md     зачем и что меняется
            ├── specs/          дельта: что добавляется, меняется, убирается
            ├── design.md       как сделать
            └── tasks.md        задачи с галочками
  </b-codebox>
  <b-why align="left">Начните с одной небольшой правки, которую вы и так собирались сделать. Пять запросов агенту, по одному на шаг: скопируйте их в Claude Code, Codex или Cursor и подставьте свою задачу.</b-why>
  <b-hdd-steps>
    <step t="Установка">«Установи OpenSpec и запусти openspec init в этом проекте. Покажи, какие команды появились»</step>
    <step t="Разведка">«/openspec-explore Хочу добавить … Посмотри код и предложи два варианта, ничего не меняя»</step>
    <step t="План">«/openspec-propose … Сначала только план. В требованиях дай сценарии для пустых и частичных данных»</step>
    <step t="Код">«/openspec-apply-change Сделай задачи по одной, после каждой запускай тесты»</step>
    <step t="Слияние">«/openspec-archive-change Перенеси требования в спеки и покажи, что изменилось в openspec/specs»</step>
  </b-hdd-steps>
</b-chapter>

<b-chapter id="problems" icon="alert-circle" title="Типичные проблемы">
  <b-why align="left">Четыре случая, которые встречаются чаще всего. Решения взяты со страницы устранения неполадок и из руководства по спекам в репозитории OpenSpec.</b-why>
  <b-rules cols="2">
    <rule icon="terminal-screen" t="Команда не срабатывает">Команды набирают в чате агента, а в терминале они не работают. Затем выполните <code>openspec update</code> в корне проекта и перезапустите агента: большинство программ ищет скиллы при запуске. В Claude Code проверьте, что в <code>.claude/skills/</code> есть папки <code>openspec-*</code>; в Codex пишут <code>$openspec-propose</code>. Команды <code>/openspec:*</code> и <code>/opsx:*</code> из старых статей в версии 2.0 заменены скиллами<b-proof href="https://github.com/Fission-AI/OpenSpec/blob/main/docs/troubleshooting.md" quote="OpenSpec, Troubleshooting: «Slash commands go in your AI assistant&#39;s chat, not your terminal» / «Most tools scan for skills and commands at startup» — github.com/Fission-AI/OpenSpec"/>.</rule>
    <rule icon="lines" t="Спеки слишком подробные">Спека описывает поведение, а устройство остаётся в коде: очередь, библиотека или схема таблицы в требовании быстро устаревают. Одно требование — одно поведение, «как» уходит в <code>design.md</code>. Изменение должно умещаться в одно предложение, иначе его стоит разрезать<b-proof href="https://github.com/Fission-AI/OpenSpec/blob/main/docs/writing-specs.md" quote="OpenSpec, Writing Good Specs: «A good change has one intent you can say in a sentence» — github.com/Fission-AI/OpenSpec/blob/main/docs/writing-specs.md"/>.</rule>
    <rule icon="eye" t="Агент не читает спецификацию">План получается неполным или неверным, когда агент не знает контекста проекта. В <code>openspec/config.yaml</code> добавьте описание проекта и правила для каждого файла плана, подробнее опишите изменение и проверяйте файлы по одному. Настройки применяются сразу, перезапуск не нужен<b-proof href="https://github.com/Fission-AI/OpenSpec/blob/main/docs/troubleshooting.md" quote="OpenSpec, Troubleshooting: «Add project context and per-artifact rules to config.yaml» / «Config changes take effect immediately» — github.com/Fission-AI/OpenSpec"/>.</rule>
    <rule icon="swap" t="Спека разошлась с кодом">Расхождение появляется, когда изменение сделано, а архивация пропущена: требования остаются в черновике. Завершайте изменение командой <code>/openspec-archive-change</code> и соглашайтесь на слияние дельты в общие спеки. Формат файлов проверяет <code>openspec validate</code>, а сверку кода со спекой делает <code>/openspec-verify-change</code> из расширенного набора.</rule>
  </b-rules>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Частые вопросы">
  <b-faq-cards>
    <q t="Что такое OpenSpec?">Бесплатная открытая программа от Fission AI для разработки по спецификациям. Агент пишет план изменения в файлы Markdown, вы его проверяете, агент пишет код, а требования вливаются в общие спеки проекта.</q>
    <q t="Как установить OpenSpec?">Командой curl -fsSL https://openspec.dev/cli/install.sh | sh на macOS и Linux или через npm install -g @fission-ai/openspec@latest. Затем в папке проекта запустите openspec init.</q>
    <q t="Чем OpenSpec отличается от Spec Kit?">OpenSpec гибче и рассчитан на уже работающий код, шаги можно повторять в любом порядке. Spec Kit от GitHub ведёт по жёстким фазам: принципы, спека, план, задачи, код.</q>
    <q t="С какими агентами работает OpenSpec?">С Claude Code, Codex, Cursor, GitHub Copilot и другими, всего с 30 с лишним агентами. Команда openspec init ставит скиллы под те агенты, которые вы выбрали.</q>
    <q t="Как использовать OpenSpec?">Установите программу, выполните openspec init в папке проекта и в чате агента вызовите /openspec-propose с именем изменения. Проверьте план, затем /openspec-apply-change пишет код по задачам, а /openspec-archive-change вливает требования в общие спеки. Не уверены, что строить, — начните с /openspec-explore.</q>
    <q t="Что такое SDD (разработка по спецификациям)?">SDD (Spec-Driven Development) — подход, где сначала записывают спецификацию: что система должна делать. Агент пишет код по этой спецификации, а она лежит в файлах проекта. OpenSpec, Spec Kit и Kiro — три способа так работать.</q>
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
