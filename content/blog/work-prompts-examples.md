---
title: Промпты для рабочих задач: пять частей и шесть примеров для ChatGPT и Claude
date: 2026-09-28
updated: 2026-10-20
description: Промпты для работы с нейросетью: из каких частей собран хороший рабочий промпт, как выглядят слабый и сильный запрос, шесть готовых шаблонов под частые задачи и как сохранить их в проекте — по руководствам Anthropic, OpenAI и Google.
tags: AI, промпты, ChatGPT, Claude
category: prompts
layout: wide
toc: model=Human-in-the-loop | parts=Пять частей | examples=Шесть примеров | learn=Что изучить | next=Дальше по теме
---

<b-post series="prompts">
<b-flow lead label="Один запрос, два результата">
  <b-lane title="Одна фраза" color="muted">
    <node icon="chat" t="Запрос">«напиши ответ клиенту»</node>
    <node icon="ai-box" t="Модель">угадывает контекст</node>
    <node icon="file-x" t="Общий ответ">переписывать вручную</node>
  </b-lane>
  <b-lane title="Шесть частей" color="accent">
    <node icon="prompt-stripes" t="Промпт">роль, данные, пример, формат</node>
    <node icon="ai-box" t="Модель">видит всё нужное</node>
    <node icon="file-check" t="Черновик">правки по мелочи</node>
  </b-lane>
</b-flow>
<b-cap>Модель в обоих случаях одна и та же. Результат определяет то, что написано в запросе: шесть частей, которые повторяются в руководствах Anthropic, OpenAI и Google.</b-cap>
<b-chapter id="model" title="Human-in-the-loop: путь одного запроса" icon="share">
  <b-art names="work-prompts-examples/prompt-map" wide/>
  <b-finding>
    <ex>Человек стоит на всех ключевых точках: ставит задачу, собирает промпт, сверяет ответ, возвращает его на уточнение и принимает решение. Модель только отвечает на то, что попало в запрос.</ex>
    <gen>У каждой стрелки своя точка контроля: данные передают целиком, ответ сверяют с тем, кому он нужен, а удачный запрос сохраняют шаблоном, и следующая задача того же типа начинается с него.</gen>
    <do>Перед запросом назовите получателя и решение, которое он примет по ответу: от этого зависят роль и формат.</do>
  </b-finding>
  <b-cta href="/blog/harness-driven-development/" k="Следующий шаг · HDD" t="Harness-Driven Development">Как проверку из этой схемы превратить в правило, которое работает для всех следующих задач</b-cta>
</b-chapter>
<b-chapter id="parts" title="Пять частей промпта" icon="grid">
  <b-prompt-anatomy label="Устройство промпта: роль, кому и зачем, данные целиком в тегах, пример, формат, вопрос в конце" order="порядок">
    <part kind="role" icon="user-round" t="Роль" tip="Роль: «Ты — сотрудник поддержки». Одна фраза задаёт тон и уровень ответа"><b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: «Setting a role in the system prompt focuses Claude&#39;s behavior and tone for your use case. Even a single sentence makes a difference» — platform.claude.com, Prompting best practices"/></part>
    <part kind="who" icon="target" t="Кому и зачем" tip="Кому и зачем: Кто прочитает результат и какое решение по нему примут"><b-proof href="https://academy.openai.com/public/clubs/work-users-ynjqu/resources/prompting" quote="OpenAI Academy: «Be clear about what you need ChatGPT to do. Outline what you want, who it&#39;s for, and why it matters» — academy.openai.com, Prompting"/><b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: «Providing context or motivation behind your instructions, such as explaining to Claude why such behavior is important, can help Claude better understand your goals and deliver more targeted responses» — platform.claude.com, Prompting best practices"/></part>
    <part kind="data" icon="file-text" t="Данные целиком" tip="Данные целиком: Переписку, документ, таблицу — целиком. Длинное наверх, вопрос в конце" tag="данные"><b-proof href="https://academy.openai.com/public/clubs/work-users-ynjqu/resources/prompting" quote="OpenAI Academy: «Add any background (or documentation) that will help» — academy.openai.com, Prompting"/><b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: «Place your long documents and inputs near the top of your prompt, above your query, instructions, and examples»; «Queries at the end can improve response quality by up to 30 percent in tests» — platform.claude.com, Prompting best practices"/></part>
    <part kind="ex" icon="card-text" t="Пример" tip="Пример: Один-три образца нужного тона или формата" tag="пример" note="1–3"><b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: «Include 3–5 examples for best results» — platform.claude.com, Prompting best practices"/><b-proof href="https://www.kaggle.com/whitepaper-prompt-engineering" quote="Google, Prompt Engineering: среди лучших практик — давать примеры, быть конкретным про формат ответа и формулировать инструкции вместо запретов. Пересказ — kaggle.com/whitepaper-prompt-engineering"/></part>
    <part kind="fmt" icon="list-dots" t="Формат" tip="Формат: «5 пунктов, каждый в строку». Что сделать, вместо списка запретов" note="5 пунктов"><b-proof href="https://academy.openai.com/public/clubs/work-users-ynjqu/resources/prompting" quote="OpenAI Academy: «Tell ChatGPT how you&#39;d like the response» — academy.openai.com, Prompting"/><b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: «Tell Claude what to do instead of what not to do» — platform.claude.com, Prompting best practices"/></part>
    <part kind="q" icon="help" t="Вопрос в конце" tip="Переписку, документ, таблицу — целиком. Длинное наверх, вопрос в конце"></part>
    <tags t="теги" tip="Теги для частей: &lt;переписка&gt;…&lt;/переписка&gt; — модель не путает данные с инструкцией"><b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: «Wrapping each type of content in its own tag (for example, &lt;instructions&gt;, &lt;context&gt;, &lt;input&gt;) reduces misinterpretation» — platform.claude.com, Prompting best practices"/></tags>
  </b-prompt-anatomy>
  <b-finding>
    <ex>Пять частей и теги, у каждой — источник в официальном руководстве.</ex>
    <gen>Модель знает о задаче только то, что написано в запросе. Anthropic предлагает проверку: покажите промпт коллеге без контекста — если он запутается, модель запутается тоже<b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: «Show your prompt to a colleague with minimal context on the task and ask them to follow it. If they&#39;d be confused, Claude will be too» — platform.claude.com, Prompting best practices"/>.</gen>
    <do>Откройте свой последний запрос и отметьте, каких из пяти частей в нём нет. Допишите роль и формат — это две фразы.</do>
  </b-finding>
</b-chapter>
<b-chapter id="examples" title="Шесть примеров" icon="browser-tab">
  <b-prompt-tabs name="ex-ru">
    <b-prompt-tab id="client" icon="chat" label="Ответ клиенту" title="Ответ клиенту по переписке">
      <b-why>Клиент пишет в третий раз, тон нужен спокойный, обещать можно только то, что уже есть в переписке.</b-why>
      <b-prompt-parts>
        <part icon="user-alt">Роль</part>
        <part icon="help-circle" off>Кому и зачем</part>
        <part icon="file-text">Данные целиком</part>
        <part icon="checklist">Пример</part>
        <part icon="lines-alt">Формат</part>
      </b-prompt-parts>
      <b-prompt>
        Ты — сотрудник поддержки [компании].
        Ниже вся переписка с клиентом.
        &lt;переписка&gt;
        [вставить целиком]
        &lt;/переписка&gt;
        Напиши следующий ответ клиенту. Тон — спокойный и дружелюбный, как в этом примере:
        &lt;пример&gt;
        [один удачный прошлый ответ]
        &lt;/пример&gt;
        Не больше 5 предложений. Сроки называй, только если они есть в переписке.
      </b-prompt>
      <b-finding>
        <ex>Роль, переписка в тегах, пример тона и два правила формата.</ex>
        <gen>Пример прошлого ответа задаёт тон точнее любых прилагательных. Правило про сроки сформулировано как разрешение с условием, и модель следует ему буквально.</gen>
        <do>Сохраните два-три лучших ответа команды и подставляйте один из них в блок примера.</do>
      </b-finding>
    </b-prompt-tab>
    <b-prompt-tab id="meeting" icon="calendar" label="Подготовка к встрече" title="Подготовка к встрече">
      <b-why>Завтра встреча на 30 минут, материалы разбросаны по переписке и документам.</b-why>
      <b-prompt-parts>
        <part icon="user-alt" off>Роль</part>
        <part icon="help-circle">Кому и зачем</part>
        <part icon="file-text">Данные целиком</part>
        <part icon="checklist" off>Пример</part>
        <part icon="lines-alt">Формат</part>
      </b-prompt-parts>
      <b-prompt>
        Завтра встреча с [кем] по [теме], 30 минут. Моя цель — [решение, которое нужно получить].
        &lt;материалы&gt;
        [переписка и документы по теме]
        &lt;/материалы&gt;
        Подготовь:
        1. Три вопроса, которые стоит решить на встрече.
        2. По каждому — что уже известно из материалов, с короткой цитатой.
        3. Что мне нужно выяснить до встречи.
        Формат — таблица из трёх колонок.
      </b-prompt>
      <b-cap>Шаблон повестки с разбивкой по времени есть в OpenAI Academy<b-proof href="https://academy.openai.com/public/resources/chatgpt-for-any-role" quote="OpenAI Academy, ChatGPT for any role: «Create a structured agenda for a meeting about [topic]. Break the agenda into sections with time estimates and goals for each section» — academy.openai.com"/>.</b-cap>
      <b-finding>
        <ex>Цель встречи, материалы в тегах и нумерованный список того, что вернуть.</ex>
        <gen>Цель встречи отсекает лишнее из материалов. Нумерованные шаги нужны, когда важны порядок и полнота ответа<b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: «Show your prompt to a colleague with minimal context on the task and ask them to follow it. If they&#39;d be confused, Claude will be too» — platform.claude.com, Prompting best practices"/>.</gen>
        <do>Перед каждой встречей на 30 минут и больше отдавайте материалы этим промптом и открывайте встречу с его таблицей.</do>
      </b-finding>
    </b-prompt-tab>
    <b-prompt-tab id="summary" icon="summary-lines" label="Сводка треда" title="Сводка длинного треда">
      <b-why>В чате 200 сообщений, нужно понять, что решили и кто что делает.</b-why>
      <b-prompt-parts>
        <part icon="user-alt" off>Роль</part>
        <part icon="help-circle" off>Кому и зачем</part>
        <part icon="file-text">Данные целиком</part>
        <part icon="checklist" off>Пример</part>
        <part icon="lines-alt">Формат</part>
      </b-prompt-parts>
      <b-prompt>
        &lt;тред&gt;
        [вставить целиком]
        &lt;/тред&gt;
        Сначала выпиши дословные цитаты, где принимаются решения или назначаются задачи.
        Потом по этим цитатам составь сводку:
        — решения;
        — задачи с ответственными и сроками;
        — открытые вопросы.
        Каждый пункт — одна строка. Если ответственного нет в цитатах, напиши «не назначен».
      </b-prompt>
      <b-finding>
        <ex>Длинный тред стоит вверху, задача в конце, сначала цитаты, потом сводка.</ex>
        <gen>Anthropic советует для длинных документов сначала просить цитаты<b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: «For long document tasks, ask Claude to quote relevant parts of the documents first before carrying out its task» — platform.claude.com, Prompting best practices"/> и ставить вопрос после данных: в тестах это давало до 30% прироста качества<b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: «Place your long documents and inputs near the top of your prompt, above your query, instructions, and examples»; «Queries at the end can improve response quality by up to 30 percent in tests» — platform.claude.com, Prompting best practices"/>. Правило «не назначен» не даёт модели додумать ответственного.</gen>
        <do>Для любого треда длиннее одного экрана начинайте с просьбы выписать цитаты.</do>
      </b-finding>
    </b-prompt-tab>
    <b-prompt-tab id="table" icon="table" label="Разбор таблицы" title="Разбор таблицы">
      <b-why>Выгрузка обращений за месяц в CSV, нужно найти, что изменилось.</b-why>
      <b-prompt-parts>
        <part icon="user-alt" off>Роль</part>
        <part icon="help-circle" off>Кому и зачем</part>
        <part icon="file-text">Данные целиком</part>
        <part icon="checklist" off>Пример</part>
        <part icon="lines-alt">Формат</part>
      </b-prompt-parts>
      <b-prompt>
        Во вложении выгрузка [обращений] за [период], CSV.
        Посчитай [число обращений] по [теме обращения] и покажи 5 самых больших изменений по сравнению с прошлым месяцем.
        Для каждого — число и одна строка, чем это может объясняться.
        Покажи код, которым считал, чтобы я мог проверить.
      </b-prompt>
      <b-cap>Файл обрабатывается в изолированной песочнице — и в ChatGPT, и в Claude<b-proof href="https://help.openai.com/en/articles/8437071-data-analysis-with-chatgpt" quote="ChatGPT: для анализа данных пишет и запускает Python в изолированной среде; код, результат и допущения стоит проверить, прежде чем опираться на вывод. Пересказ справки OpenAI — help.openai.com/en/articles/8437071"/><b-proof href="https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude" quote="Claude: «When Claude executes code or creates files, it operates within an isolated, sandboxed container» — support.claude.com/en/articles/12111783"/>.</b-cap>
      <b-finding>
        <ex>Файл целиком, точная метрика и разрез, ограничение «5 изменений» и просьба показать код.</ex>
        <gen>Модель считает кодом в песочнице, а код можно перечитать. OpenAI прямо советует проверять код, результат и допущения, прежде чем опираться на вывод.</gen>
        <do>Проверьте одно число из ответа вручную. Если совпало, остальным можно доверять больше.</do>
      </b-finding>
    </b-prompt-tab>
    <b-prompt-tab id="style" icon="pen" label="Текст в стиле компании" title="Текст в стиле компании">
      <b-why>Нужен пост или письмо, которое звучит как свои, без канцелярита.</b-why>
      <b-prompt-parts>
        <part icon="user-alt" off>Роль</part>
        <part icon="help-circle">Кому и зачем</part>
        <part icon="file-text" off>Данные целиком</part>
        <part icon="checklist">Пример</part>
        <part icon="lines-alt">Формат</part>
      </b-prompt-parts>
      <b-prompt>
        Вот три наших поста, которые хорошо зашли:
        &lt;пример&gt;[пост 1]&lt;/пример&gt;
        &lt;пример&gt;[пост 2]&lt;/пример&gt;
        &lt;пример&gt;[пост 3]&lt;/пример&gt;
        Напиши пост о [теме] в том же стиле: длина, тон и структура как в примерах.
        Для кого: [аудитория]. Зачем: [чего хотим от читателя].
      </b-prompt>
      <b-finding>
        <ex>Три примера в тегах и одна фраза о том, кому и зачем пишем.</ex>
        <gen>Anthropic рекомендует 3–5 примеров<b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: «Include 3–5 examples for best results» — platform.claude.com, Prompting best practices"/>; руководство Google тоже ставит примеры первой практикой<b-proof href="https://www.kaggle.com/whitepaper-prompt-engineering" quote="Google, Prompt Engineering: среди лучших практик — давать примеры, быть конкретным про формат ответа и формулировать инструкции вместо запретов. Пересказ — kaggle.com/whitepaper-prompt-engineering"/>. Стиль, показанный на примерах, модель копирует точнее, чем описанный словами.</gen>
        <do>Сложите удачные тексты в проект и возьмите их примерами — тогда их не нужно вставлять каждый раз.</do>
      </b-finding>
    </b-prompt-tab>
    <b-prompt-tab id="research" icon="search" label="Исследование" title="Исследование темы">
      <b-why>Нужен обзор рынка или практик с источниками, на что уйдёт полдня поиска.</b-why>
      <b-prompt-parts>
        <part icon="user-alt" off>Роль</part>
        <part icon="help-circle">Кому и зачем</part>
        <part icon="file-text" off>Данные целиком</part>
        <part icon="checklist" off>Пример</part>
        <part icon="lines-alt">Формат</part>
      </b-prompt-parts>
      <b-prompt>
        Исследуй: [вопрос].
        Для кого: [аудитория]. Зачем: [решение, которое нужно принять].
        Нужны данные не старше [года].
        Итог: таблица [колонки] и вывод в 5 пунктах.
        К каждому факту — ссылка на источник. Если данных нет, так и напиши.
      </b-prompt>
      <b-cap>Режим глубокого исследования есть в обоих чатах: deep research в ChatGPT и Research в Claude<b-proof href="https://help.openai.com/en/articles/10500283-deep-research-in-chatgpt" quote="ChatGPT: deep research собирает и сводит информацию из интернета в отчёт, работает от 5 до 30 минут, в ответе — ссылки на источники. Пересказ справки OpenAI — help.openai.com/en/articles/10500283"/><b-proof href="https://support.claude.com/en/articles/11088861-use-research-on-claude" quote="Claude: Research — «conducting multiple searches that build on each other», ответ «complete with easy-to-check citations»; «available for users with paid Claude plans (Pro, Max, Team, or Enterprise)» — support.claude.com/en/articles/11088861"/>.</b-cap>
      <b-finding>
        <ex>Цель, ограничение по свежести данных и формат итога со ссылками.</ex>
        <gen>В режиме исследования модель делает серию поисков и возвращает отчёт со ссылками. Ссылки позволяют проверить каждый факт, а фраза «если данных нет» не даёт заполнить пробел выдумкой.</gen>
        <do>Открывайте две-три ссылки из отчёта и сверяйте факт с источником, прежде чем нести вывод дальше.</do>
      </b-finding>
    </b-prompt-tab>
  </b-prompt-tabs>
</b-chapter>
<b-chapter id="learn" title="Что изучить" icon="flag-alt">
  <b-why>Начните с туториала на 7 минут: он объясняет, почему приёмы из этой статьи работают. Дальше — руководства по промптингу, курсы — когда будет время.</b-why>
  <b-sublabel top="22">Основы: как устроен ИИ</b-sublabel>
  <b-links cols="2">
    <item href="https://academy.claude.com/tutorials/the-4-properties-of-ai" k="Claude Academy · туториал, 7 минут" t="The 4 properties of AI" ext>Предсказание следующего токена, знания, рабочая память, управляемость — откуда берутся сильные и слабые стороны модели</item>
    <item href="https://academy.claude.com/courses/ai-capabilities-and-limitations" k="Claude Academy · курс, 13 уроков, 3,5 часа" t="AI Capabilities and Limitations" ext>Почему модель уверенно выдумывает, где границы контекста и какие инструкции надёжны</item>
    <item href="https://academy.claude.com/courses/ai-fluency-framework-foundations" k="Claude Academy · курс, 14 уроков, 4 часа" t="AI Fluency: Framework & Foundations" ext>Четыре навыка: что поручать ИИ, как описать задачу, как проверить результат и кто за него отвечает</item>
  </b-links>
  <b-sublabel top="22">Промптинг</b-sublabel>
  <b-links cols="2">
    <item href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" k="Anthropic · документация" t="Prompting best practices" ext>Основной справочник: ясность, примеры, роль, XML-теги, длинные документы</item>
    <item href="https://claude.com/blog/best-practices-for-prompt-engineering" k="Anthropic · блог" t="Best practices for prompt engineering" ext>Общие приёмы промптинга вне конкретной модели</item>
    <item href="https://github.com/anthropics/prompt-eng-interactive-tutorial" k="Anthropic · туториал" t="Интерактивный туториал" ext>9 глав с упражнениями — от структуры промпта до XML-тегов и примеров</item>
    <item href="https://www.kaggle.com/whitepaper-prompt-engineering" k="Google · whitepaper" t="Prompt Engineering" ext>Техники и лучшие практики: примеры, формат ответа, инструкции вместо запретов</item>
    <item href="https://academy.openai.com/public/clubs/work-users-ynjqu/resources/prompting" k="OpenAI Academy" t="Prompting" ext>Что, для кого и зачем, контекст, формат ответа, итерации</item>
    <item href="https://academy.openai.com/public/resources/chatgpt-for-any-role" k="OpenAI Academy" t="ChatGPT for any role" ext>Готовые шаблоны рабочих промптов по задачам и ролям</item>
  </b-links>
  <b-sublabel top="22">Для команды и администраторов</b-sublabel>
  <b-links cols="2">
    <item href="https://support.claude.com/en/articles/14782391-claude-enterprise-consumption-guide" k="Claude · справка" t="Claude Enterprise consumption guide" ext>Как расходуются токены: Claude Code и Cowork тратят заметно больше обычного чата; лимиты по группам и выбор модели по умолчанию</item>
  </b-links>
</b-chapter>
<b-chapter id="next" title="Дальше по теме">
  <b-links cols="2">
    <item href="/blog/harness-work-approaches/" k="Подходы" t="Если ответ не подошёл">Цикл ответа и ревью с правкой запроса</item>
    <item href="/blog/specs-rules-skills/" k="Контекст" t="Спеки, библия, правила и скиллы">Где хранить промпт дольше одного чата</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="Разработка" t="ИИ в коде">Харнесс и три группы инструментов</item>
    <item href="/blog/chatgpt-enterprise-usage-report/" k="Отчёт" t="Отчёт по ChatGPT Enterprise">Кто в компании чем пользуется</item>
  </b-links>
</b-chapter>
<b-footer>Промпты — шаблоны: в квадратных скобках то, что нужно подставить. Приёмы — по официальным руководствам Anthropic, OpenAI и Google, источник у значка рядом с утверждением. Цитаты из справки OpenAI и руководства Google даны пересказом.</b-footer>
</b-post>
