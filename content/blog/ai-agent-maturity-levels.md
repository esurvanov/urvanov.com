---
title: Уровни зрелости работы с ИИ-агентами: от чата к спекам, скиллам, коду, харнессу и агентной системе
date: 2026-11-14
updated: 2026-11-17
description: Как опыт работы с ИИ растёт от вопроса в чате до агентной системы: что записывать на каждой ступени, когда переходить дальше и чего это стоит.
tags: AI, агенты, спеки, скиллы, харнесс, зрелость, compound engineering
category: specs
layout: wide
mentions: Compound Engineering, Agent Skills, AGENTS.md, CLAUDE.md, Spec-Driven Development, Progressive Crystallization, Harness engineering, Harness-Driven Development
toc: map=Семь ступеней | sources=Что говорит рынок | chat=Чат | agent=Агент и правила | spec=Спека | skill=Скилл | script=Скрипт | crystal=Цена перехода | harness=Харнесс | system=Агентная система | traps=Ловушки | stop=Когда остановиться | start=С чего начать | faq=Вопросы | next=Дальше по теме
---

Уровни зрелости работы с ИИ-агентами идут от чата к агенту, спеке, скиллу, скрипту, харнессу и агентной системе: на каждой ступени то, что человек раньше объяснял словами, записывается в файл или код и перестаёт зависеть от его памяти. Ту же последовательность описывают лестницы <a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every</a>, <a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a>, <a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a>, <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a>, <a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a> и <a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a>. Ниже — ступени и цена последних шагов.

<b-post series="prompts">
<b-chapter id="map" title="Семь ступеней" icon="stairs">
  <b-art names="ai-agent-maturity-levels/ladder ai-agent-maturity-levels/ladder-mobile"></b-art>
  <b-cap>Семь ступеней. Серым нарисован человек, синим — агент и всё, что записано для него, оранжевым — риск: приходится объяснять заново. Оранжевый жук на ступени «Харнесс» — ошибка, найденная в готовом отчёте: харнесс превращает её в проверку со стрелкой, и та же ошибка больше не повторяется.</b-cap>
  <b-why>Схема показывает, куда уходит знание. В чате оно в голове человека и в переписке. Дальше оно по очереди переезжает в сессию агента, файл с требованиями, файл с процедурой, скрипт и, наконец, в репозиторий вместе с проверками. Таблица ниже разворачивает тот же отчёт по понедельникам: что человек делает руками и что происходит в следующий понедельник.</b-why>
  <b-table code="prose">
    <table>
    <thead>
      <tr><th>Ступень</th><th>Что человек делает руками</th><th>Где лежит знание</th><th>Что будет в следующий понедельник</th></tr>
    </thead>
    <tbody>
      <tr><td><b>1. Чат</b></td><td>вставляет таблицу продаж в чат и объясняет, какие колонки нужны</td><td>в голове и в переписке</td><td>всё объясняется заново</td></tr>
      <tr><td><b>2. <a class="s-term" href="/materials/glossary/ai-agent/">Агент</a></b></td><td>просит агента с доступом к файлам собрать отчёт, поправляет и дописывает в файл правил «суммы в рублях»</td><td>в сессии и в файле правил</td><td>агент помнит правила, но не помнит, как считали в прошлый раз</td></tr>
      <tr><td><b>3. <a class="s-term" href="/materials/glossary/spec-driven-development/">Спека</a></b></td><td>пишет spec.md: какие колонки, откуда данные, по каким признакам отчёт готов</td><td>в <code>spec.md</code></td><td>любой агент собирает тот же отчёт по тому же описанию</td></tr>
      <tr><td><b>4. <a class="s-term" href="/materials/glossary/agent-skills/">Скилл</a></b></td><td>оформляет порядок сборки отчёта как скилл</td><td>в <code>SKILL.md</code> с шагами и примерами</td><td>агент сам находит скилл, когда просят отчёт</td></tr>
      <tr><td><b>5. Скрипт</b></td><td>вытягивает из скилла стабильные шаги в скрипт выгрузки и сводной таблицы: скилл на данных невыгоден, скрипт каждый раз считает одинаково</td><td>в <code>report.py</code></td><td>выгрузка идёт за секунды без затрат на модель и даёт тот же результат на тех же данных; модель пишет только выводы</td></tr>
      <tr><td><b>6. <a class="s-term" href="/materials/glossary/harness/">Харнесс</a></b></td><td>читает готовый отчёт; ошибка из отчёта становится новым правилом или проверкой в среде агента</td><td>в репозитории: правила, проверки, хуки</td><td>та же ошибка больше не повторяется: правило и проверка срабатывают сами</td></tr>
      <tr><td><b>7. <a class="s-term" href="/materials/glossary/agentic-system/">Агентная система</a></b></td><td>отдаёт агенту только сложные части вроде разбора обращений, остальное оставляет коду и проверкам</td><td>в одном сервисе: код, расписание, проверки и агент на сложных местах</td><td>отчёт приходит по расписанию: детерминированные шаги идут кодом, сложные решает агент с записанными причинами, человек разбирает только сигнал о расхождении</td></tr>
    </tbody>
    </table>
  </b-table>
  Переход с одной ступени на следующую в статье называется <b><a class="s-term" href="/materials/glossary/pulling-out/">вытягиванием</a></b>: из того, что человек и агент уже сделали вместе, вытягивается повторяемая часть и записывается на ступень выше. Это эволюционный процесс развития процессов в организации: их не проектируют заранее целиком, они вырастают ступень за ступенью из повторяющейся работы. Из переписки в чате вытягиваются правила, из правил и удачных сессий — спека, из спеки — процедура скилла, из скилла — скрипт, а из ошибок и проверок вокруг агента — харнесс. Конец лестницы — агентная система. Работающее поведение не придумывается заново, оно достаётся из того, что уже получилось, и закрепляется там, где его не нужно объяснять снова. Начинается всё с подхода «делает агент», но в конце пути доля агентов остаётся небольшой: основа системы — классический код, проверки и расписание, а агенты занимают только сложные блоки, которые иначе не решить.
  <b-finding>
    <ex>Один недельный отчёт прошёл путь от повторяющегося объяснения в чате до отчёта по расписанию.</ex>
    <gen>Ступень определяется тем, где лежит знание: в голове человека, в сессии, в файле или в коде. Чем больше записано, тем меньше зависит от памяти человека и от настроения модели.</gen>
    <do>Выберите одну повторяющуюся задачу и определите по таблице, на какой она ступени.</do>
  </b-finding>
</b-chapter>

<b-chapter id="sources" title="Позиция автора и что говорит рынок" icon="book">
  <b-why>Семь ступеней выше — позиция автора: они собраны по признаку «что именно записывается на ступени». На рынке то же движение описывают разные авторы, каждый на своём отрезке: у одних это правила, у других спеки, у третьих скиллы или харнесс. Все они идут в одну сторону — из разговора в файл, из файла в код. Таблица показывает, как ступени совпадают с источниками.</b-why>
  <b-art names="ai-agent-maturity-levels/matrix"></b-art>
  <b-cap>Заливка — ступень описана у автора явно, кольцо — описана близкая по смыслу (например, «детерминированные средства» у <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a> и <a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a> считаются близкими к скрипту). Нижняя строка — семь ступеней этой статьи; последнюю явно описывает только <a href="https://arxiv.org/abs/2607.07052" target="_blank" rel="noopener">Malik</a>.</b-cap>

  Матрица показывает, как устроен рынок: каждый автор описывает свой отрезок пути, а вместе отрезки покрывают все семь ступеней. У <a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a> нет спек и скиллов, у Rezvov и Clark нет скиллов, у <a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a> нет скрипта. Подробности по каждому автору — в таблице ниже.
  <b-table>
    <table>
    <thead>
      <tr><th>Источник</th><th>Ступени по порядку</th><th>Где спеки и скиллы</th></tr>
    </thead>
    <tbody>
      <tr><td><a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every, Compound Engineering</a> (Kieran Klaassen)</td><td>ручная разработка → чат → агент с проверкой каждой правки → план и проверка готового PR → от идеи до PR → параллельные облачные агенты</td><td>план на ступени 3; скиллы и правила пополняются на шаге Compound</td></tr>
      <tr><td><a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a>, 05.02.2026</td><td>бросить чат → повторить свою работу агентом → агенты в конце дня → отдать лёгкие задачи → построить обвязку → агент всегда работает</td><td>AGENTS.md и программные проверки на шаге 5; спек и скиллов нет</td></tr>
      <tr><td><a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a>, 10.03.2026</td><td>8 уровней: автодополнение и чат в IDE → контекст → накопление опыта → MCP и скиллы → харнесс → фоновые агенты → команды агентов</td><td>скиллы на уровне 5; спек нет</td></tr>
      <tr><td><a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a>, 06.04.2026</td><td>L0 справочник → L1 присмотр за агентом → L2 правила → L3 детерминированные средства → L4 SDD → L5 автономные агенты</td><td>спеки на L4; скиллов нет</td></tr>
      <tr><td><a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a>, Hyperact, 05.01.2026</td><td>7 уровней: ручные промпты → помощь в IDE → доступ к репозиторию → детерминированные средства → контекст команды → параллельные специализированные потоки → разработка по спекам</td><td>спеки на уровне 7; скиллов нет</td></tr>
      <tr><td><a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a>, 23.01.2026</td><td>уровни 0–5 по аналогии с автоматизацией вождения: от автодополнения до «тёмной фабрики»</td><td>спеки и скиллы на уровне 4; на уровне 5 спеки превращаются в программу</td></tr>
      <tr><td><a href="https://developers.redhat.com/articles/2026/03/30/vibes-specs-skills-agents-ai-coding" target="_blank" rel="noopener">Red Hat, Naszcyniec</a>, 30.03.2026</td><td>четыре опоры как стек: vibes → specs → skills → agents</td><td>все четыре в одной схеме</td></tr>
    </tbody>
    </table>
  </b-table>
  <b-callout icon="bulb">**Файл правил** (CLAUDE.md, AGENTS.md) стоит на разных местах. У <a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every</a>, <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a> и <a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a> он появляется сразу после первого агента, у <a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a> и <a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a> только на пятом уровне. В этой статье он входит в ступень «агент»: первая же запись «агент ошибся, правило добавлено» превращает чат в агента с памятью.</b-callout>
  <b-callout icon="trend-up">Лестницы Eledath, <a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a> и Clark считают ступени по автономии: сколько агентов работает и как редко человек смотрит в код. Ступени этой статьи считаются по тому, где лежит знание. Обе шкалы согласованы: когда знание записано, агенту можно доверить больше.</b-callout>
  <b-finding>
    <ex>Спеки ставят Rezvov, Clark и Shapiro, скиллы — Eledath и Shapiro; в одну лестницу их собирает эта статья.</ex>
    <gen>Разные лестницы описывают одно и то же движение с разных сторон: сначала всё в разговоре, потом в файле, потом в коде.</gen>
    <do>Сверяйте свой опыт с семью ступенями выше: рынок подтверждает каждую из них своим источником.</do>
  </b-finding>
</b-chapter>

<b-chapter id="chat" title="Ступень 1. Чат: знание живёт в разговоре" icon="chat">
  <b-why>В чате человек сам переносит данные туда и обратно и сам объясняет, что ответ неверен. Для разового вопроса этого достаточно.</b-why>
  <b-art names="ai-agent-maturity-levels/chat"></b-art>
  <b-cap>Три понедельника подряд человек отвечает на одни и те же вопросы агента. Знание о том, что нужно в отчёте, остаётся только в его голове.</b-cap>
  <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a> называет этот режим справочником: агент как «Stack Overflow, но дружелюбнее», и сам же оговаривает, что настоящим уровнем это не считается. <a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a> советует бросить чат-бота для значимой работы<b-proof href="https://mitchellh.com/writing/my-ai-adoption-journey" quote="Hashimoto: «To find value, you must use an agent» — mitchellh.com/writing/my-ai-adoption-journey"></b-proof>, потому что агент сам читает файлы, запускает программы и проверяет результат. <a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a> и <a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a> ставят чат на первый уровень: копирование фрагментов туда и обратно.

  Даже на этой ступени <a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every</a> советует вести заметки с удачными запросами: это самая первая запись, ещё до файла правил<b-proof href="https://every.to/guides/compound-engineering" quote="Every: «Keep a running note of prompts that worked well» — every.to/guides/compound-engineering"></b-proof>. Заметка отвечает на вопрос «как я это объяснял в прошлый раз», хотя агент её пока не читает.
  <b-finding>
    <ex>Каждый понедельник нужно заново объяснять, какие колонки нужны в отчёте.</ex>
    <gen>Чат не хранит договорённости между разговорами. Rezvov описывает выход так: когда надоедает повторять одно и то же, повторяющиеся указания оформляют в правила.</gen>
    <do>Заметили, что объясняете одно и то же второй раз, — переходите на следующую ступень.</do>
  </b-finding>
</b-chapter>

<b-chapter id="agent" title="Ступень 2. Агент и файл правил" icon="bot">
  <b-why>Агент получает доступ к файлам и командам и действует сам. Первая запись для него — файл правил: список того, что агент должен знать о проекте в каждой сессии.</b-why>
  <b-art names="ai-agent-maturity-levels/agent-rules"></b-art>
  <b-cap>Ошибка агента превращается в строку файла правил, и следующая сессия агента начинается уже с ней.</b-cap>
  <a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a> прошёл эту ступень буквально: повторил агентом все свои ручные коммиты<b-proof href="https://mitchellh.com/writing/my-ai-adoption-journey" quote="Hashimoto: «I literally did the work twice» — mitchellh.com/writing/my-ai-adoption-journey"></b-proof> и вынес три урока: разбивать работу на чёткие задачи, отделять планирование от исполнения, давать агенту способ проверить результат. Руководство <a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every</a> предлагает первый шаг к записи: завести файл CLAUDE.md и дописывать в него заметку после каждой ошибки агента.
  <b-steps>
    <step t="Агент ошибся">например, пересчитал суммы в долларах вместо рублей.</step>
    <step t="Строка в файле правил">«суммы в отчёте — в рублях»: одна строка на одно плохое поведение. Hashimoto пишет, что в файле проекта Ghostty каждая строка основана на плохом поведении агента<b-proof href="https://mitchellh.com/writing/my-ai-adoption-journey" quote="Hashimoto: «Each line in that file is based on a bad agent behavior» — mitchellh.com/writing/my-ai-adoption-journey"></b-proof>.</step>
    <step t="Следующая сессия">агент читает файл в начале и не повторяет ошибку.</step>
  </b-steps>
  <b-callout icon="alert-circle">Файл правил можно перегрузить. <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a> предупреждает: плохо написанные правила дают результат хуже, чем их отсутствие<b-proof href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" quote="Rezvov: «poorly written rules can actually make output worse than having no rules at all» — dev.to/arezvov"></b-proof>. <a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a> советует не складывать всё в файл правил: лучше держать актуальную папку docs, в которой агент сам найдёт нужное.</b-callout>

  Hashimoto доводит ступень до привычки: последние полчаса рабочего дня он запускает агентов на исследование, на разбор смутных идей и на сортировку задач, чтобы утром получить «тёплый старт»<b-proof href="https://mitchellh.com/writing/my-ai-adoption-journey" quote="Hashimoto: «warm start» — mitchellh.com/writing/my-ai-adoption-journey"></b-proof>. Ночью агентов он не оставляет: большинство задач у него заканчивается быстрее чем за полчаса. Every предупреждает, что на этой ступени застревает большинство разработчиков<b-proof href="https://every.to/guides/compound-engineering" quote="Every: «Most developers plateau here» — every.to/guides/compound-engineering"></b-proof>, пока одобряет каждое действие агента вручную.
  <b-finding>
    <ex>Строка про рубли в файле правил закрывает одну повторяющуюся ошибку навсегда.</ex>
    <gen>Правило хранит договорённость, но не весь замысел задачи: что делать и по каким признакам считать готовым, в нём не записано.</gen>
    <do>Держите файл правил коротким; описание задачи выносите в спеку. Подробнее — в статье <a href="/blog/specs-rules-skills/">AGENTS.md, CLAUDE.md и spec.md: что куда класть</a>.</do>
  </b-finding>
</b-chapter>

<b-chapter id="spec" title="Ступень 3. Спека: замысел записан до кода" icon="file-lines">
  <b-why>Спека описывает одну задачу: что нужно получить и по каким признакам она готова. Агент и человек читают один и тот же текст, и ревью сверяет результат с ним.</b-why>
  <a href="https://developers.redhat.com/articles/2026/03/30/vibes-specs-skills-agents-ai-coding" target="_blank" rel="noopener">Red Hat</a> делит спеки на два вида: «что» (цель, требования, критерии успеха) и «как» (безопасность, структура, тесты, стандарты). Автор рекомендует вместо одного длинного документа несколько маленьких файлов вроде <code>what-vision.md</code>, <code>how-security.md</code>, <code>how-testing.md</code>, чтобы загружать только нужный контекст<b-proof href="https://developers.redhat.com/articles/2026/03/30/vibes-specs-skills-agents-ai-coding" quote="Naszcyniec, Red Hat: «the days of the 100-page PDF specification are over» — developers.redhat.com"></b-proof>. <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a> добавляет сквозную трассируемость: у требования есть идентификатор вроде FR-AUTH-PASSWORDRESET, и он виден в описании API, коде и тестах<b-proof href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" quote="Rezvov: «The core of SDD is traceability» — dev.to/arezvov"></b-proof>.
  Дальше у спеки есть собственная лестница зрелости. Первые три уровня описала Birgitta <a href="https://martinfowler.com/articles/harness-engineering.html" target="_blank" rel="noopener">Böckeler</a> (Thoughtworks)<b-proof href="https://www.martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html" quote="Böckeler: три уровня зрелости спеки, spec-first, spec-anchored и spec-as-source (пересказ) — martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html"></b-proof>, четвёртый, Spec-in-the-loop, добавлен в докладе автора сайта <a href="/talk/spec-driven-development/">«Spec-Driven Development»</a>: на <a href="/slide/20/">слайде с четырьмя уровнями</a> спека учится у работающей системы, а её метрики и инциденты поправляют спеку.
  <b-art names="ai-agent-maturity-levels/spec-levels"></b-art>
  <b-cap>Как на слайде доклада: слева спека, справа код, стрелки показывают, что из чего получается и кто правит обратно. Серая пунктирная стрелка — правку возвращает человек, синяя — сама работающая система. Справа: что уровень решает и что ему мешает.</b-cap>
  <b-table>
    <table>
    <thead>
      <tr><th>Уровень спеки</th><th>Что происходит со спекой</th><th>Пример программы</th></tr>
    </thead>
    <tbody>
      <tr><td><b>Spec-first</b></td><td>спеку пишут до кода и используют на одну задачу</td><td>GitHub Spec Kit</td></tr>
      <tr><td><b>Spec-anchored</b></td><td>спека живёт после задачи: изменения вливаются в неё</td><td><a href="/blog/openspec/">OpenSpec</a></td></tr>
      <tr><td><b>Spec-as-source</b></td><td>человек правит только спеку, код генерируется из неё</td><td>Tessl; у <a href="https://martinfowler.com/articles/harness-engineering.html" target="_blank" rel="noopener">Böckeler</a> заявлен только он</td></tr>
      <tr><td><b>Spec-in-the-loop</b></td><td>спеку поправляют метрики и инциденты из работающей системы</td><td>готовых программ нет; близкое поведение у <a href="https://developers.redhat.com/articles/2026/03/30/vibes-specs-skills-agents-ai-coding" target="_blank" rel="noopener">Red Hat</a> и <a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every</a>, см. ниже</td></tr>
    </tbody>
    </table>
  </b-table>

  Red Hat различает два режима работы со спекой. В режиме «разговор» человек вместе с агентом дорабатывает спеку: например, просит агента оценить её по шкале от 0 до 10 и сказать, чего не хватает для автономной реализации. Когда оценка 9–10, начинается режим «поручение»: агент читает спеки, находит нужные скиллы, пишет код, запускает тесты и сам исправляет ошибки. У <a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a> этому соответствует четвёртый уровень, на котором человек пишет спеку, спорит с агентом о ней и уходит<b-proof href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" quote="Shapiro: «You write a spec. You argue with it about the spec.» — danshapiro.com"></b-proof>.
  <b-callout icon="refresh">Red Hat называет четвёртый уровень «со-эволюцией» спеки. Агент ведёт файл LessonsLearned.md: при каждой ошибке записывает причину и исправление и предлагает правку соответствующей «как»-спеки<b-proof href="https://developers.redhat.com/articles/2026/03/30/vibes-specs-skills-agents-ai-coding" quote="Naszcyniec, Red Hat: «turns every off-key moment into a permanent improvement» — developers.redhat.com"></b-proof>. Every делает то же на шаге Compound, о нём ниже.</b-callout>
  <b-finding>
    <ex>В spec.md отчёта записано: какие колонки, откуда данные, и что отчёт готов, если суммы сходятся с выгрузкой.</ex>
    <gen><a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a> ставит спеки на вершину своей лестницы: реализация там становится взаимозаменяемым результатом, а не долговечным активом<b-proof href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" quote="Clark: «interchangeable output rather than a durable asset» — hyperact.co.uk"></b-proof>. При этом он же называет седьмой уровень скорее сбросом, чем продолжением лестницы.</gen>
    <do>Для задачи дольше одного дня напишите спеку. Как делить большую спеку на части — в статье <a href="/blog/specs-by-aggregates/">Спеки по агрегатам</a>.</do>
  </b-finding>
</b-chapter>

<b-chapter id="skill" title="Ступень 4. Скилл: процедура записана для агента" icon="notebook">
  <b-why>Если спека говорит, что нужно получить, то скилл говорит, как это делается. Это папка с файлом SKILL.md: названием, описанием и пошаговой инструкцией, иногда с шаблонами и скриптами.</b-why>
  <b-art names="ai-agent-maturity-levels/spec-skill"></b-art>
  <b-cap>Спека лежит в контексте задачи. Скилл занимает в контексте две строки, пока не понадобится, и подгружается целиком только по вызову.</b-cap>
  <a href="https://developers.redhat.com/articles/2026/03/30/vibes-specs-skills-agents-ai-coding" target="_blank" rel="noopener">Red Hat</a> описывает скиллы как модульные повторяемые процедуры: агент находит скилл по названию и описанию и подгружает целиком, когда задача подходит<b-proof href="https://developers.redhat.com/articles/2026/03/30/vibes-specs-skills-agents-ai-coding" quote="Naszcyniec, Red Hat: «A skill is not just a prompt; it is a directory containing a SKILL.md file» — developers.redhat.com"></b-proof>. Anthropic сравнивает скилл с памяткой для нового сотрудника<b-proof href="https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills" quote="Anthropic: «like putting together an onboarding guide for a new hire» — anthropic.com/engineering"></b-proof>. У <a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a> создание скиллов — признак четвёртого уровня, когда человек уже не сидит рядом с агентом, а пишет спеки и скиллы и уходит.
  Как получить скилл из чата, описал Andrew <a href="https://dev.to/0xandrewshu/turn-chats-into-skills-skills-into-scripts-2ndg" target="_blank" rel="noopener">Shu</a>: если агент повторяет одну и ту же задачу, попросить его перечитать разговор и оформить его как скилл<b-proof href="https://dev.to/0xandrewshu/turn-chats-into-skills-skills-into-scripts-2ndg" quote="Shu: «ask it to reflect on the conversation and turn it into an Agent Skill» — dev.to/0xandrewshu"></b-proof>.

  Пример скилла из статьи Red Hat — выкладка приложения в OpenShift. Это обычная папка с тремя файлами: инструкция с названием и описанием в начале, шаблон и проверочный скрипт.
  <b-file-grid>
    <file name="SKILL.md">название, описание, шаги: проверить вход, выбрать проект, применить шаблон, проверить результат; ограничения</file>
    <file name="deploy-template.yaml">шаблон выкладки, который берёт инструкция</file>
    <file name="validate-route.sh">скрипт, проверяющий, что приложение открывается</file>
  </b-file-grid>
  <b-cap>Скилл уже содержит скрипт: между ступенями «скилл» и «скрипт» нет резкой границы, это две части одной папки.</b-cap>
  <b-finding>
    <ex>После удачной сборки отчёта агент по просьбе оформил порядок сборки как скилл с шагами и примером итоговой таблицы.</ex>
    <gen>Скилл в начале сессии занимает в контексте только название и описание, а целиком загружается по вызову. Поэтому процедуры, нужные иногда, лучше хранить в скиллах, в файле правил оставляя только постоянное.</gen>
    <do>Если одна и та же процедура получилась удачно дважды, попросите агента оформить её скиллом.</do>
  </b-finding>
</b-chapter>

<b-chapter id="script" title="Ступень 5. Скрипт: шаги делает код" icon="code">
  <b-why>Скилл остаётся текстом, и модель каждый раз исполняет его заново. Скрипт — обычный код: быстрее, дешевле и одинаков при каждом запуске.</b-why>
  <a href="https://dev.to/0xandrewshu/turn-chats-into-skills-skills-into-scripts-2ndg" target="_blank" rel="noopener">Shu</a> сравнивает: скилл недетерминирован, потому что десять запусков одного скилла могут дать заметно разное поведение<b-proof href="https://dev.to/0xandrewshu/turn-chats-into-skills-skills-into-scripts-2ndg" quote="Shu: «running the same Skill 10 times can lead to different behavior» — dev.to/0xandrewshu"></b-proof>. Скрипты быстрее, стабильнее и не расходуют токены, но на их написание уходит время, они жёстче к неожиданным условиям и могут ломаться. <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a> формулирует правило проще: как можно больше передавать детерминированной логике, а модели оставлять только творческую часть<b-proof href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" quote="Rezvov: «Delegate as much as possible to deterministic logic» — dev.to/arezvov"></b-proof>. <a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a> ту же мысль применяет к ошибкам агента: рядом с правилом в файле он пишет программные средства вроде скриптов для скриншотов и запуска отфильтрованных тестов.
  <b-art names="ai-agent-maturity-levels/skill-script"></b-art>
  <b-cap>Один и тот же запуск десять раз: скилл показывает разброс и тратит токены, скрипт повторяет результат и не тратит ничего.</b-cap>
  <b-table>
    <table>
    <thead>
      <tr><th></th><th>Скилл</th><th>Скрипт</th></tr>
    </thead>
    <tbody>
      <tr><td><b>Что это</b></td><td>инструкция на естественном языке в SKILL.md</td><td>код на Bash, Python и подобных языках</td></tr>
      <tr><td><b>Кто исполняет</b></td><td>модель, каждый раз заново</td><td>компьютер, без модели</td></tr>
      <tr><td><b>Одинаков ли результат</b></td><td>нет: возможны заметные различия между запусками</td><td>да, при тех же входных данных</td></tr>
      <tr><td><b>Затраты на запуск</b></td><td>токены на каждое исполнение</td><td>секунды и ноль токенов</td></tr>
      <tr><td><b>Когда подходит</b></td><td>процедура меняется, нужна гибкость, запускается редко</td><td>процедура повторяется, дорога или должна быть предсказуемой</td></tr>
      <tr><td><b>Цена</b></td><td>меньше времени на создание</td><td>время на написание, жёсткость к неожиданному, поддержка</td></tr>
    </tbody>
    </table>
  </b-table>
  <b-cap>По тексту Andrew <a href="https://dev.to/0xandrewshu/turn-chats-into-skills-skills-into-scripts-2ndg" target="_blank" rel="noopener">Shu</a> «Turn chats into Skills, Skills into scripts» (19.09.2026). Автор оговаривает, что автоматизировать стоит не всё: у скилла и у скрипта есть цена создания и поддержки.</b-cap>
  Скрипт <b>вытягивается</b> из скилла, когда скилл начинает повторяться. Делать скилл для такой работы становится невыгодно: скрипт на тех же данных ведёт себя одинаково при каждом запуске, а у скилла разброс заложен в самой модели. Этот разброс и порождает <a class="s-term" href="/materials/glossary/flaky-test/">флаки</a>: один и тот же шаг на тех же данных то проходит, то падает, потому что агент каждый раз ведёт себя чуть иначе. У скрипта такой причины нет, поэтому для повторяющейся работы детерминизм выгоднее.
  <b-callout icon="alert-circle">Неопределённостей остаётся много: формат входных данных, пропуски, неожиданные значения. Скрипты, как правило, начинают работать с данными, поэтому для них главное — детерминированная часть: один и тот же вход даёт один и тот же выход, и ошибку можно воспроизвести. Неопределённость переходит из шага в проверку входных данных.</b-callout>
  <b-finding>
    <ex>Выгрузка из базы и сводная таблица в отчёте каждый понедельник одни и те же, поэтому их взял на себя скрипт report.py, а модель пишет только выводы.</ex>
    <gen>Shu часто встраивает скрипты в скиллы: скилл остаётся оболочкой, которая запускает скрипты, склеивает их и проверяет вход и выход.</gen>
    <do>Превращайте скилл в скрипт, когда он повторяется, сложен или дорог. Редкие и меняющиеся процедуры оставляйте скиллами.</do>
  </b-finding>
</b-chapter>

<b-chapter id="crystal" title="Цена перехода: что измерил Malik" icon="gauge">
  <b-why>Переход от скилла к скрипту обычно описывают на словах. Arun <a href="https://arxiv.org/abs/2607.07052" target="_blank" rel="noopener">Malik</a> из команды Azure Networking (Microsoft) измерил его на рабочей системе и назвал «прогрессивной кристаллизацией»: поведение, которое агент нашёл и проверил, постепенно превращается в детерминированный код<b-proof href="https://arxiv.org/abs/2607.07052" quote="Malik: «agent exploration should be a discovery mechanism, not a permanent execution model» — arxiv.org/abs/2607.07052"></b-proof>.</b-why>
  Система Malik занимается инцидентами в облачной сети. Новый инцидент сначала решает агент, и его путь записывается. Если путь подтверждён повторными успехами, он превращается в шаблон, затем в гибридный сценарий и, наконец, в код без модели. Три режима — стадии жизни одного и того же найденного поведения. Это вытягивание на последних ступенях: путь, который агент прошёл сам, вытягивается в шаблон, затем в гибрид и в код.
  <b-art names="ai-agent-maturity-levels/crystal-modes"></b-art>
  <b-cap>Вверх по лестнице поведение поднимают по числу успешных запусков, вниз возвращают при сбое: кристаллизация обратима.</b-cap>
  <b-table>
    <table>
    <thead>
      <tr><th>Режим</th><th>Как исполняется</th><th>Одинаков ли результат</th><th>Токенов на запуск</th></tr>
    </thead>
    <tbody>
      <tr><td><b>Агент</b> (Type 3)</td><td>субагенты рассуждают в ограниченной области, шаги записи ждут одобрения человека</td><td>около 50%</td><td>10–50 тысяч</td></tr>
      <tr><td><b>Гибрид</b> (Type 2)</td><td>шаги фиксированы, модель подключается на отдельных этапах: разбор, классификация, резюме; каждое действие проверяется по схеме</td><td>около 90%</td><td>1–5 тысяч</td></tr>
      <tr><td><b>Код</b> (Type 1)</td><td>заранее написанная логика, модели во время работы нет</td><td>100%</td><td>0</td></tr>
    </tbody>
    </table>
  </b-table>
  <b-sublabel top="22">Когда повышать режим</b-sublabel>
  <b-steps>
    <step t="Агент → гибрид" hl>не менее 10 успешных запусков, ноль нарушений безопасности, не менее 90% запусков дают одну и ту же последовательность действий, проходят автоматически созданные приёмочные тесты.</step>
    <step t="Гибрид → код">не менее 50 успешных гибридных запусков, согласованность ответов модели не ниже 99%, правило покрывает все встреченные варианты входа, полный набор регрессионных тестов проходит без модели, человек просмотрел итоговую логику.</step>
    <step t="Код → назад">при сбое, нарушении безопасности или провале тестов плейбук понижается. Пример из статьи: после обновления прошивки изменился формат вывода команды, парсер упал, плейбук вернули в гибрид, а после серии чистых запусков повысили снова<b-proof href="https://arxiv.org/abs/2607.07052" quote="Malik: «Crystallization is not one-way» — arxiv.org/abs/2607.07052"></b-proof>.</step>
  </b-steps>
  <b-sublabel top="22">Что получилось за 8 месяцев</b-sublabel>
  <b-count-bars>
    <bar k="Код" w="45%" color="accent">45%</bar>
    <bar k="Гибрид" w="30%" color="c-light">30%</bar>
    <bar k="Агент" w="25%" color="c-none">25%</bar>
  </b-count-bars>
  <b-cap>Доля исполнений по режимам к концу восьмого месяца (раздел VIII статьи <a href="https://arxiv.org/abs/2607.07052" target="_blank" rel="noopener">Malik</a>). В начале почти все исполнения шли в режиме «агент».</b-cap>
  Стоимость агента на один инцидент упала более чем на 70% при росте числа инцидентов примерно вдвое. Более 90% типовых категорий инцидентов решаются автономно, доля ложноположительных исправлений остаётся ниже 5%. Автор формулирует вывод так: платформа дешевела по мере работы, потому что перестала платить за вывод по работе, которую уже выучила<b-proof href="https://arxiv.org/abs/2607.07052" quote="Malik: «the platform got cheaper as it did more» — arxiv.org/abs/2607.07052"></b-proof>.
  <b-callout icon="alert-circle">Оговорки автора. Результаты получены в одной организации и одной предметной области, поэтому пороги нужно пересчитывать заново. Это наблюдения за платформой за восемь месяцев, контролируемого сравнения нет. Цифра 45% означает долю исполнений, обслуженных кодом; долей инцидентов, решённых «без ИИ», её считать нельзя. Выигрыш меньше там, где преобладают действительно новые разовые задачи.</b-callout>
  <b-callout icon="bulb">Слово «кристаллизация» встречается и в другой работе: Linghao Zhang (<a href="https://arxiv.org/abs/2603.10808" target="_blank" rel="noopener">arXiv 2603.10808</a>, 11.03.2026) описывает, как разрозненные знания из рабочих диалогов периодически сводятся в структурированные повторно используемые материалы. У Zhang диалог превращается в знание, у Malik трасса исполнения превращается в код. Обе работы описывают одно и то же движение сверху вниз по лестнице: от разговора к записанному.</b-callout>
  <b-finding>
    <ex>В системе Malik за восемь месяцев доля исполнений без модели выросла с нуля до 45%, а стоимость на инцидент упала более чем на 70%.</ex>
    <gen>Переход вниз по лестнице, от модели к коду, окупается там, где одни и те же задачи повторяются. Автономия привязана к накопленной истории запусков конкретного сценария и растёт вместе с ней, мощность модели её сама не даёт<b-proof href="https://arxiv.org/abs/2607.07052" quote="Malik: «A more capable model does not automatically earn more autonomy; a track record does» — arxiv.org/abs/2607.07052"></b-proof>.</gen>
    <do>Считайте успешные запуски скилла. Дошли до десяти без сбоев — оформляйте повторяемые шаги скриптом, а на сбой скрипта предусмотрите возврат на ступень выше.</do>
  </b-finding>
</b-chapter>

<b-chapter id="harness" title="Ступень 6. Харнесс: ошибки становятся правилами среды" icon="loop-double">
  <b-why>Когда спеки, скиллы и скрипты есть, следующий шаг — собрать вокруг агента среду: харнесс. Это всё, кроме самой модели, и растёт он от ошибок: каждая задача оставляет после себя запись, и следующая идёт лучше.</b-why>
  <a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every</a> строит всё руководство вокруг цикла из четырёх шагов: Plan → Work → Review → Compound<b-proof href="https://every.to/guides/compound-engineering" quote="Every: «Plan → Work → Review → Compound → Repeat» — every.to/guides/compound-engineering"></b-proof>. Первые три шага дают фичу, четвёртый дарит систему, которая строит фичи всё лучше<b-proof href="https://every.to/guides/compound-engineering" quote="Every: «a system that builds features better each time» — every.to/guides/compound-engineering"></b-proof>. На план и ревью, по Every, должно уходить около 80% времени инженера, на работу и шаг Compound — остальные 20%.
  <b-art names="ai-agent-maturity-levels/compound-loop"></b-art>
  <b-cap>Три первых шага дают фичу. Четвёртый записывает урок в файлы и скиллы, поэтому следующий круг начинается лучше предыдущего.</b-cap>
  <b-steps round>
    <step t="Plan">идея превращается в план: изучить требование и код, продумать решение и проверить план.</step>
    <step t="Work">агент выполняет план в отдельной ветке, после каждого изменения запускаются тесты и линтер.</step>
    <step t="Review">несколько агентов проверяют результат, находки получают приоритет P1, P2 или P3 и записываются.</step>
    <step t="Compound" hl>что сработало и что нет записывается в нужные файлы: заметки в CLAUDE.md, документ с решением в docs/solutions/, новые агенты и скиллы. Вопрос для проверки: поймает ли система эту ошибку сама в следующий раз?</step>
  </b-steps>
  <b-cap>По руководству Every. Решения хранятся в папке docs/solutions/ с метаданными для поиска, планы в docs/plans/, находки ревью в todos/.</b-cap>
  Birgitta <a href="https://martinfowler.com/articles/harness-engineering.html" target="_blank" rel="noopener">Böckeler</a> делит харнесс на два вида средств: «направляющие» заранее задают агенту курс, а «датчики» наблюдают за результатом и помогают исправиться<b-proof href="https://martinfowler.com/articles/harness-engineering.html" quote="Böckeler: guides «anticipate the agent's behaviour and aim to steer it before it acts»; sensors «observe after the agent acts and help it self-correct»"></b-proof>. Её правило: когда проблема повторяется, направляющие и датчики нужно усилить<b-proof href="https://martinfowler.com/articles/harness-engineering.html" quote="Böckeler: «Whenever an issue happens multiple times, the feedforward and feedback controls should be improved»"></b-proof>. Дисциплина настройки харнесса называется harness engineering, а HDD (Harness-Driven Development) — один метод внутри неё: каждая ошибка агента превращается в правило среды, то есть в инструкцию, проверку или ограничение.
  У <a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a> на этом месте уровень 6: харнесс из тестов, линтеров и проверок, чтобы агент сам видел результат своей работы. Условие у него одно: нужна обратная связь, иначе получается «машина по производству мусора»<b-proof href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" quote="Eledath: «If you want autonomy, you need backpressure» — bassimeledath.com"></b-proof>.
  <b-finding>
    <ex>Агент ошибся в курсе валют: ревью записало причину, в CLAUDE.md появилось правило, а в скрипт добавили проверку курса.</ex>
    <gen>Харнесс отличается от набора файлов тем, что ошибка превращается в запись автоматически: правило, проверку, скилл или правку спеки. Эту идею <a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a> называет harness engineering. Подробнее — в статье <a href="/blog/harness-driven-development/">Harness engineering на практике</a>.</gen>
    <do>После каждой исправленной ошибки задавайте один вопрос: что записать, чтобы она не повторилась. Запись — это и есть шаг Compound и одно изменение харнесса.</do>
  </b-finding>
</b-chapter>

<b-chapter id="system" title="Ступень 7. Агентная система: код в основе, агенты на сложных местах" icon="boxes-link">
  <b-why>Лестница заканчивается агентной системой: системой на классических принципах, в которой сложные блоки заменены агентами, а всё вместе работает в одном сервисе. Статья показывает, как к ней приходить: по ступеням, вытягивая повторяемое в код и в проверки.</b-why>
  Начинается путь с агентов: в чате и в сессии всё делает агент. К концу пути доля агентов остаётся небольшой, а основа системы — классический код: скрипты, проверки, расписание, данные. Агент занимает только сложные места, которые до появления больших языковых моделей решали команды ML-специалистов: разбор текста обращений, классификация, оценка близости, суммаризация. Сейчас это готовое решение: модель вызывается как часть сервиса, даёт более высокое качество и объясняет свои решения словами, так что рассуждения можно прочитать и проверить. Система в целом остаётся предсказуемой, потому что сложная часть окружена детерминированными проверками.
  Это направление подтверждают цифры <a href="https://arxiv.org/abs/2607.07052" target="_blank" rel="noopener">Malik</a>: за восемь месяцев доля исполнений кодом без модели выросла до 45%, а агент остался на 25% исполнений. Лестницы <a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a> (уровни 7–8: фоновые агенты и команды агентов), <a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a> («тёмная фабрика», чёрный ящик, превращающий спеки в программу) и <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a> (человек только создаёт задачи в трекере, а агенты берут их сами, главный барьер — безопасность) продолжаются в сторону роста автономии. Чтобы такая автономия не ломалась, ей нужен харнесс — ступень ниже.
  <b-finding>
    <ex>Недельный отчёт: выгрузку и сводную таблицу считает скрипт, правила и проверки лежат в харнессе, а агент разбирает только свободный текст комментариев менеджеров.</ex>
    <gen>Агентная система держится на коде и проверках, а агент решает только то, что иначе не решить. Доля агентов в ней небольшая, предсказуемость задаёт детерминированная основа.</gen>
    <do>Перед тем как отдать блок агенту, спросите, можно ли его записать кодом или проверкой. Агенту оставляйте только то, что код не решает, и ставьте проверки на входе и выходе.</do>
  </b-finding>
</b-chapter>

<b-chapter id="traps" title="Ловушки на каждой ступени" icon="alert-circle">
  <b-why>На каждой ступени есть типичная ошибка, из-за которой движение вверх останавливается или обходится слишком дорого. Таблица собрана из оговорок самих авторов.</b-why>
  <b-table>
    <table>
    <thead>
      <tr><th>Ступень</th><th>Типичная ловушка</th><th>Кто о ней пишет</th><th>Как выйти</th></tr>
    </thead>
    <tbody>
      <tr><td><b>1. Чат</b></td><td>перенос текста туда и обратно вместо работы агента с файлами</td><td><a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a>: для значимой работы нужен агент</td><td>дать агенту доступ к проекту и способ проверить результат</td></tr>
      <tr><td><b>2. <a class="s-term" href="/materials/glossary/ai-agent/">Агент</a></b></td><td>человек одобряет каждое действие, а файл правил растёт без разбора</td><td><a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every</a>: здесь застревает большинство; <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a>: плохие правила хуже их отсутствия</td><td>планировать заранее, держать правила короткими и проверять каждую строку</td></tr>
      <tr><td><b>3. <a class="s-term" href="/materials/glossary/spec-driven-development/">Спека</a></b></td><td>спека на каждую мелочь: Kiro превратил небольшую ошибку в 4 пользовательские истории и 16 критериев приёмки</td><td><a href="https://www.martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html" target="_blank" rel="noopener">Böckeler</a> (Thoughtworks)</td><td>писать спеку для задач дольше дня, мелкие правки оставлять без неё</td></tr>
      <tr><td><b>4. <a class="s-term" href="/materials/glossary/agent-skills/">Скилл</a></b></td><td>скилл на всё подряд: у него есть цена создания и поддержки</td><td><a href="https://dev.to/0xandrewshu/turn-chats-into-skills-skills-into-scripts-2ndg" target="_blank" rel="noopener">Shu</a></td><td>делать скилл после двух удачных повторов, а не заранее</td></tr>
      <tr><td><b>5. Скрипт</b></td><td>преждевременное повышение: шаблон, который видели мало раз, оказывается ненадёжным</td><td><a href="https://arxiv.org/abs/2607.07052" target="_blank" rel="noopener">Malik</a>: качество зависит от тестов, собранных из запусков</td><td>порог по числу запусков и возврат на ступень выше при сбое</td></tr>
      <tr><td><b>6. <a class="s-term" href="/materials/glossary/harness/">Харнесс</a></b></td><td>ревью человека становится узким местом; проверки, написанные тем же агентом, подтверждают что угодно</td><td><a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a>: ревью человека превращается в узкое место; <a href="https://law.stanford.edu/2026/02/08/built-by-agents-tested-by-agents-trusted-by-whom/" target="_blank" rel="noopener">Stanford CodeX</a>: агенты написали заглушку, всегда возвращающую «успех»</td><td>проверки должны быть независимы от агента, а ревью частично автоматическим</td></tr>
      <tr><td><b>7. <a class="s-term" href="/materials/glossary/agentic-system/">Агентная система</a></b></td><td>агентам отдают и то, что решается кодом: растут цена и разброс результата</td><td><a href="https://arxiv.org/abs/2607.07052" target="_blank" rel="noopener">Malik</a>: поведение, найденное агентом, переходит в код по числу успешных запусков</td><td>ставить агента только на сложное место и вытягивать повторяемое в код</td></tr>
    </tbody>
    </table>
  </b-table>
  <b-cap>Случай со StrongDM и заглушкой разобран <a href="https://law.stanford.edu/2026/02/08/built-by-agents-tested-by-agents-trusted-by-whom/" target="_blank" rel="noopener">в статье Stanford CodeX</a>.</b-cap>
  <b-finding>
    <ex>Агент написал и код, и проверку, а проверка просто возвращала «успех»: система казалась зелёной и ничего не проверяла.</ex>
    <gen>Чем выше ступень, тем дороже ошибка записи: неверное правило, плохая проверка или преждевременный скрипт действуют на все следующие запуски.</gen>
    <do>Перед записью спросите: кто и чем проверит эту запись? Если проверять некому, оставьте знание на ступени ниже.</do>
  </b-finding>
</b-chapter>

<b-chapter id="stop" title="Когда остановиться" icon="target">
  <b-why>Верхние ступени дороже нижних, и не каждой команде они нужны.</b-why>
  <b-table>
    <table>
    <thead>
      <tr><th>Что говорит источник</th><th>Что это значит на практике</th></tr>
    </thead>
    <tbody>
      <tr><td><a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a>: большинству команд стоит целиться в уровень 5; выше растёт пропускная способность, но не способность понимать и проверять результат</td><td>записанные правила, детерминированные средства и общий контекст часто важнее максимальной автоматизации</td></tr>
      <tr><td><a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a>: для повседневной работы рычаг даёт уровень 7; уровень 8 автор считает передним краем, который пока никто не освоил</td><td>фоновые агенты с проверками — разумный верхний предел сегодня</td></tr>
      <tr><td><a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a>: на уровне 3 многим кажется, что стало хуже, потому что работа сводится к чтению диффов</td><td>после первого роста скорости возможен провал; его проходят переходом к спекам и скиллам, возвращаться в чат не нужно</td></tr>
      <tr><td><a href="https://dev.to/0xandrewshu/turn-chats-into-skills-skills-into-scripts-2ndg" target="_blank" rel="noopener">Shu</a>: у скилла и у скрипта есть цена создания и поддержки</td><td>автоматизируйте то, что действительно повторяется</td></tr>
      <tr><td><a href="https://arxiv.org/abs/2607.07052" target="_blank" rel="noopener">Malik</a>: выигрыш меньше там, где преобладают новые разовые задачи</td><td>для исследовательской работы оставайтесь на агенте со спекой</td></tr>
    </tbody>
    </table>
  </b-table>
  <b-finding>
    <ex>У <a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a> седьмой уровень стоит особняком: он называет его скорее сбросом, чем продолжением лестницы.</ex>
    <gen>Подъём по лестнице имеет смысл, пока он уменьшает работу человека; число файлов в репозитории ничего не доказывает.</gen>
    <do>Перед каждым переходом проверьте: задача повторяется? Результат можно проверить автоматически? Если нет, остановитесь на текущей ступени.</do>
  </b-finding>
</b-chapter>

<b-chapter id="start" title="С чего начать: готовые запросы агенту" icon="play">
  <b-why>Четыре запроса, которые переводят знание на следующую ступень, то есть вытягивают его из предыдущей. Подставьте свою задачу вместо квадратных скобок.</b-why>
  <b-sublabel top="12">Из чата в файл правил</b-sublabel>
  <b-prompt>
    Перечитай этот диалог. Найди места, где я исправлял тебя или повторял одно и то же.
    Для каждого запиши одну короткую строку правила для файла CLAUDE.md.
    Не добавляй общих советов, только то, что было в диалоге.
  </b-prompt>
  <b-sublabel top="22">Из правил в спеку</b-sublabel>
  <b-prompt>
    Задача: [описание]. Прежде чем писать код, составь spec.md:
    что нужно получить, откуда данные, какие есть ограничения и по каким признакам задача считается готовой.
    Задай мне вопросы, если чего-то не хватает.
  </b-prompt>
  <b-sublabel top="22">Из удачного запуска в скилл</b-sublabel>
  <b-prompt>
    Перечитай этот диалог и оформи процедуру, которую ты выполнил в этом диалоге, как скилл: папка со SKILL.md,
    в начале название и описание, затем пошаговая инструкция, ограничения и пример результата.
  </b-prompt>
  <b-sublabel top="22">Из скилла в скрипт</b-sublabel>
  <b-prompt>
    Посмотри скилл [название]. Выдели шаги, которые каждый раз выполняются одинаково, и напиши для них скрипт на Python.
    В скилле оставь только запуск скрипта и проверку результата.
  </b-prompt>
  <b-finding>
    <ex>Четыре запроса заменяют разговор о том, «как внедрять ИИ»: каждый переносит ровно одну порцию знания на ступень выше.</ex>
    <gen>Правило перехода одно: повторилось второй раз — запишите; запись повторяется и стабильна — превращайте в код.</gen>
    <do>Начните с запроса, который соответствует вашей текущей ступени из таблицы в начале статьи.</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Частые вопросы">
  <b-faq-cards>
    <q t="Какие уровни зрелости работы с ИИ в разработке существуют?">Единой шкалы нет. В этой статье семь ступеней, у <a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every</a> шесть ступеней от ручной разработки до параллельных облачных агентов, у <a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a> восемь уровней, у <a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a> семь, у <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a> и <a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a> по шесть (уровни 0–5). Все они сходятся в том, что путь идёт от чата к агенту, затем к записанным правилам и спекам и дальше к автономной системе.</q>
    <q t="Что такое compound engineering?">Подход Every, в котором каждая законченная задача оставляет запись, помогающую следующим задачам: цикл Plan → Work → Review → Compound. Последний шаг записывает урок в CLAUDE.md, документацию решений, скиллы и агентов.</q>
    <q t="Чем скилл отличается от скрипта?">Скилл — текстовая инструкция, которую модель исполняет заново при каждом запуске, поэтому результаты могут различаться. Скрипт — обычный код: он быстрее, дешевле и даёт одинаковый результат, но дольше пишется и жёстче к неожиданным условиям.</q>
    <q t="Нужно ли доходить до «тёмной фабрики»?">Не обязательно. Clark советует большинству команд остановиться на уровне 5, Eledath называет уровень 7 точкой основного рычага. Выше стоит подниматься, только если задачи повторяются и результат можно проверить автоматически.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Дальше по теме">
  <b-links cols="2">
    <item href="/blog/harness-driven-development/" k="Метод" t="Harness-Driven Development">Ошибка агента → правило окружения</item>
    <item href="/blog/specs-rules-skills/" k="Контекст" t="AGENTS.md, CLAUDE.md и spec.md">Что куда класть: спеки, правила, скиллы</item>
    <item href="/blog/spec-reconcile-loop/" k="Спеки" t="Петля сверки спеки">Как спека учится у работающей системы</item>
    <item href="/blog/specs-by-aggregates/" k="Спеки" t="Спеки по агрегатам">Как делить большую спеку на части</item>
    <item href="/blog/quality-gates-ai-agents/" k="Гейты" t="Что такое quality gates для ИИ-агентов">какие проверки ставить на ступенях лестницы</item>
    <item href="/blog/agent-escalation-to-human/" k="Эскалация" t="Эскалация к человеку в ИИ-агентах">как агент останавливается и спрашивает</item>
  </b-links>
</b-chapter>
<b-footer>По первоисточникам: <a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every</a> (compound engineering), <a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a> (05.02.2026), <a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a> (10.03.2026), <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a> (06.04.2026), <a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a> (05.01.2026), <a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a> (23.01.2026), <a href="https://developers.redhat.com/articles/2026/03/30/vibes-specs-skills-agents-ai-coding" target="_blank" rel="noopener">Red Hat</a> (30.03.2026), <a href="https://dev.to/0xandrewshu/turn-chats-into-skills-skills-into-scripts-2ndg" target="_blank" rel="noopener">Shu</a> (19.09.2026), <a href="https://arxiv.org/abs/2607.07052" target="_blank" rel="noopener">Malik</a> (arXiv 2607.07052, 08.07.2026), Zhang (arXiv 2603.10808), <a href="https://martinfowler.com/articles/harness-engineering.html" target="_blank" rel="noopener">Böckeler</a> (martinfowler.com). Шесть ступеней сведены из этих источников по признаку «что записывается»; единой лестницы с такой последовательностью у авторов нет.</b-footer>
</b-post>
