---
title: MCP для ИИ-агента: какую проблему решает и как поручить подключение агенту
date: 2026-10-04
description: MCP подключает агента к GitLab, Jira, Confluence и записям встреч. Какую проблему решает, как подключить за несколько минут и поручить это самому агенту, как экономит время и токены и почему агент меньше выдумывает.
tags: AI, агенты, MCP, Jira, контекст, галлюцинации, токены, харнесс
category: harness
layout: wide
mentions: Model Context Protocol, MCP, AI agent, Claude Code, Jira, Airtable, hallucinations, tokens, permissions, prompt injection
toc: what=Что это | ours=Контексты | connect=Подключение | saving=Экономия | facts=Факты | risks=Риски | first=С чего начать | cases=Кейсы | next=Дальше по теме
---

MCP подключает агента к рабочим системам, и он читает факты из источника, а не из пересказа. Это легко и быстро: достаточно понять, какую проблему он решает, и поручить подключение самому агенту. Ниже: суть, подключение, что это даёт и какие права выдавать. Пример QA с MCP разобран в статье [QA с агентом через MCP](/blog/bug-report-to-reproduction-agent/#mcp), доступ к базе 1С — в статье [MCP для 1С](/blog/mcp-1c/).

<b-post series="harness">
<b-chapter id="what" icon="plug" title="Что такое MCP">
<b-why align="left">MCP — один общий разъём, как USB. Подключил агента к Jira или GitLab, и он сам берёт оттуда данные. <a href="https://modelcontextprotocol.io/docs/getting-started/intro" target="_blank" rel="noopener">Подробнее</a></b-why>
<b-lane title="Пересказ или сама система" color="accent">
<b-scene names="mcp-agent-access/retell-vs-mcp"/>
</b-lane>
<b-finding>
  <ex>Агент видит в Jira всё, что видит человек: саму задачу PAY-142, комментарии, историю изменений. Искать задачу и копировать её в диалог не нужно. Смежные задачи подтянет по просьбе. Может написать комментарий от вашего имени, создать задачу или сменить статус (после вашего подтверждения). При первом использовании должно быть «вау»: тогда всё настроено правильно. И это очень просто.</ex>
  <gen>Агент смотрит шире человека: учитывает соседние задачи, статьи базы знаний, прошлые решения и находит нетривиальные ходы, которые по одной задаче не видны. Без MCP он знает только то, что ему вставили. Человек перестаёт быть курьером между окнами и остаётся проверяющим.</gen>
  <do>Начните с таск-трекера: это самый простой и быстрый старт. Как подключить Jira: <a href="#connect">смотрите ниже</a>. Заодно посчитайте, сколько раз за день вы копируете текст в диалог: это список кандидатов на подключение.</do>
</b-finding>
</b-chapter>
<b-chapter id="ours" icon="target-ring" title="Наш контекст и чужие">
<b-why align="left">Наш контекст: всё, что агент видит сразу (диалог с агентом, файлы проекта). Другие контексты: всё остальное (GitLab, Jira, записи встреч, база знаний). Мост между ними — MCP: у агента MCP-клиент, у системы MCP-сервер. 1С подключается так же: это ещё один чужой контекст, <a href="/blog/mcp-1c/#what">подробно в статье про MCP для 1С</a>.</b-why>
<b-lane-art names="mcp-agent-access/contexts"/>
<b-section-h3 top="18">Что такое контекст</b-section-h3>
<b-why align="left"><a href="/materials/glossary/context/">Контекст</a> — всё, что модель видит в данный момент. Чего нет в контексте, того агент не знает.</b-why>
<b-lane title="Контекст" color="accent" top="12">
<b-scene names="term:context"/>
</b-lane>
<b-table-plain>
<table><thead><tr><th>Где лежит факт</th><th>Агент видит</th><th>Что будет</th></tr></thead><tbody><tr><td><b>Наш контекст</b>: диалог, файлы проекта</td><td><b-tag-inline kind="ok">сразу</b-tag-inline></td><td>ответ из данных</td></tr><tr><td><b>Чужой контекст</b>: GitLab, Jira, 1С, записи встреч</td><td><b-tag-inline kind="ok">через MCP</b-tag-inline></td><td>агент сам забирает нужное</td></tr><tr><td><b>Нигде</b>: в головах, в закрытой системе</td><td><b-tag-inline kind="no">нет</b-tag-inline></td><td>догадка вместо факта</td></tr></tbody></table>
</b-table-plain>
<b-section-h3 top="18">Как агент забирает чужой контекст: ReAct</b-section-h3>
<b-why align="left">Агент работает по циклу <a href="/materials/glossary/react/">ReAct</a>: рассуждает, действует, читает результат и снова рассуждает. MCP — это шаг «действует»: результат вызова попадает в наш контекст.</b-why>
<b-lane title="ReAct" color="accent" top="12">
<b-scene names="term:react"/>
</b-lane>
<b-step-chain>
  <node t="Рассуждает">«Нужны шаги бага PAY-142»</node>
  <node t="Действует">Вызывает MCP-сервер Jira</node>
  <node t="Читает">Ответ Jira попадает в контекст</node>
</b-step-chain>
<b-rules-fixed cols="3" top="12">
  <rule t="Только рассуждает">Чужие контексты закрыты: модель выдумывает ответ.</rule>
  <rule t="Только действует">Вызывает всё подряд без плана и тратит токены.</rule>
  <rule t="Чередует">Берёт ровно то, чего не хватает, и отвечает по данным.</rule>
</b-rules-fixed>
<b-section-h3 top="18">Обоснование: у каждой части ответа есть опора</b-section-h3>
<b-why align="left">Ответ обоснован, когда каждая его часть получена из контекста. Такое соответствие без пустых мест называется <a href="/materials/glossary/epimorphism/">эпиморфизмом</a>.</b-why>
<b-lane title="Эпиморфизм" color="accent" top="12">
<b-scene names="term:epimorphism"/>
</b-lane>
<b-table-plain>
<table><thead><tr><th>Часть ответа</th><th>Опора</th></tr></thead><tbody><tr><td>Шаги воспроизведения</td><td>Jira, заявка PAY-142</td></tr><tr><td>Где падает код</td><td>GitLab, файл и строка</td></tr><tr><td>Почему так решили</td><td>tldv, запись встречи</td></tr><tr><td>Какие данные затронуты</td><td>1С, запрос к базе</td></tr></tbody></table>
</b-table-plain>
<b-section-h3 top="18">Галлюцинация: часть без опоры</b-section-h3>
<b-why align="left"><a href="/materials/glossary/hallucination/">Галлюцинация</a> — уверенная догадка на месте, где опоры нет. Выглядит так же гладко, как ответ из данных. Подробно и с советами Anthropic — <a href="#facts">в разделе про галлюцинации ниже</a>.</b-why>
<b-lane title="Галлюцинация" color="accent" top="12">
<b-scene names="term:hallucination"/>
</b-lane>
<b-section-h3 top="18">Почему именно эти</b-section-h3>
<b-source-rows>
  <row t="GitLab" note="Официальный MCP" href="https://docs.gitlab.com/user/model_context_protocol/mcp_server/" miss="Агент додумывает код по другим контекстам и часто ошибается, так появляются галлюцинации; человек вручную копирует файлы и изменения в диалог">Код и запросы на слияние: агент читает настоящий код</row>
  <row t="1С" note="Открытые MCP-серверы" href="/blog/mcp-1c/#what" miss="Агент выдумывает методы и реквизиты, которых нет в конфигурации, и отвечает цифрами, которых нет в базе">Код конфигурации и данные учёта: агент читает настоящие объекты и цифры</row>
  <row t="Jira" note="Официальный MCP Atlassian" href="https://support.atlassian.com/atlassian-rovo-mcp-server/docs/getting-started-with-the-atlassian-remote-mcp-server/" miss="Копировать приходится много, а история изменений пропадает">Задачи и требования: что просили на самом деле</row>
  <row t="Confluence" note="Тот же MCP Atlassian" href="https://support.atlassian.com/atlassian-rovo-mcp-server/docs/getting-started-with-the-atlassian-remote-mcp-server/" miss="Пропадает привычная всем разработчикам визуализация и отображение требований. Агента важно ограничивать и не отпускать далеко в сторону: старые требования могут устареть. Фактическую картину заставляйте смотреть в GitLab">База знаний: правила, спеки, решения</row>
  <row t="tldv" note="Запись и открытый API" href="https://doc.tldv.io" miss="Решения остаются в головах, а митинг-ноутсы и требования пишутся по памяти спустя часы и с ошибками">Записи встреч: решения, которых нет в тексте. По нашему опыту доступ появляется через 5–10 минут после встречи, и сразу можно писать митинг-ноутсы и требования. Слабее корпоративная версия, контроль доступа и MCP, зато выше качество переводов и транскриптов</row>
  <row t="Granola" note="MCP" href="https://docs.granola.ai/help-center/sharing/integrations/mcp" miss="То же, что без tldv: решения со встреч теряются">Тоже записи встреч. MCP есть, но по нашему опыту слегка уступает tldv: в русский текст проскакивают испанские слова, это портит пользовательский опыт и вызывает сопротивление при внедрении. Из документации: только активное рабочее пространство, на бесплатном тарифе заметки за 30 дней</row>
</b-source-rows>
<b-finding>
  <ex>Вы спрашиваете про баг, а шагов в диалоге нет. Агент ищет в файлах проекта, Jira ему закрыта, и он пишет шаги сам: уверенно, гладко, из головы. Вы идёте по несуществующему пути.</ex>
  <gen>Агент редко отвечает «не знаю». Если ответа нет в нашем контексте, а чужие закрыты, он достраивает недостающее по общим закономерностям и подаёт как факт. Каждый подключённый источник убирает место для выдумки.</gen>
  <do>Каждый раз, когда агент галлюцинирует, найдите контекст, где лежит ответ, и дайте агенту туда доступ. Начните с последнего вопроса, на который он ответил выдумкой.</do>
</b-finding>
</b-chapter>
<b-chapter id="connect" icon="arrow-right" title="Как подключить Jira">
<b-why align="left">Агент и его оболочка (харнесс) умеют подключаться сами. Инструкции: <a href="https://support.atlassian.com/atlassian-rovo-mcp-server/docs/getting-started-with-the-atlassian-remote-mcp-server/" target="_blank" rel="noopener">Atlassian</a> и <a href="https://code.claude.com/docs/en/mcp" target="_blank" rel="noopener">Claude Code</a>.</b-why>
<b-lane title="Вручную или поручить" color="accent">
<b-scene names="mcp-agent-access/one-phrase-setup"/>
</b-lane>
<b-section-h3 top="14">Скажите агенту</b-section-h3>
<b-copy-quote>Подключи MCP-сервер Jira по инструкции Atlassian и проверь на задаче PAY-142: прочитай её и перескажи комментарии.</b-copy-quote>
<b-why align="left">Команды агент запустит сам. От вас нужен только вход через браузер (OAuth): пароль агенту не передаётся. <a href="/blog/agent-hands-work-back-to-you/" target="_blank" rel="noopener">Если агент просит сделать это вас</a>.</b-why>
<b-section-h3 top="14">Что произойдёт</b-section-h3>
<b-steps-round>
  <step t="Агент подключит Jira">одной командой, вы ничего не вводите</step>
  <step hl t="Откроется страница Jira — главный шаг">там вам предложат дать агенту доступ к Jira; вы входите и подтверждаете, пароль агент не видит</step>
  <step t="Агент прочитает PAY-142">откроет задачу с комментариями и перескажет их</step>
</b-steps-round>
<b-callout icon="shield-check"><b>Только чтение.</b> Выбрать доступ только на чтение на этой странице получится не всегда. Это безопасно: агент склонен читать и почти ничего не пишет, пока вы сами не попросите.</b-callout>
<b-details-more summary="Как это делается руками" top="12">
<b-scene names="mcp-agent-access/setup-steps"/>
<b-copy-code>
  claude mcp add --transport http atlassian https://mcp.atlassian.com/v2/mcp
  /mcp               # войти через браузер (OAuth)
  claude mcp list     # статус: подключён / нужен вход / ошибка
</b-copy-code>
<b-scene names="mcp-agent-access/scopes"/>
<p>Где хранится настройка и кто видит сервер: <a href="/blog/mcp-scopes/">Области MCP в Claude Code</a>.</p>
</b-details-more>
<b-finding>
  <ex>Агент сам запускает команды и проверяет подключение, задача PAY-142 читается целиком вместе с комментариями. Это и есть момент «вау».</ex>
  <gen>Подключение занимает минуты. Область «Project» кладёт настройку в репозиторий, и вся команда получает те же серверы. Все три области разобраны в статье <a href="/blog/mcp-scopes/">Области MCP в Claude Code</a>.</gen>
  <do>Поручите подключение агенту и сверьте его ответ с тем, что видите в Jira сами.</do>
</b-finding>
</b-chapter>
<b-chapter id="saving" icon="coin-hm" title="Экономия">
<b-why align="left">Экономия приходит от точности. Неточный запрос даёт неточный ответ, правка порождает новый запрос, и ошибки накапливаются от шага к шагу; при ручном копировании и пересказе человек вносит такие неточности незаметно. Агент берёт данные прямо из источника, поэтому цепочка короче и ошибок меньше. Платой становится рост расхода токенов на дистанции, и для него есть ограничители.</b-why>
<b-lane title="Накопление ошибок: руками или из источника" color="accent">
<b-scene names="mcp-agent-access/exact-request"/>
</b-lane>
<b-spacer h="12"/>
<b-rules sw="1.8">
  <rule icon="eye" t="Неточные запросы и ответы">Пересказ и ручное копирование теряют детали, поэтому запрос выходит неточным, а ответ на него тоже.</rule>
  <rule icon="users" t="Накопление ошибок">Каждая правка рождает новый запрос с новой неточностью: ошибки складываются от шага к шагу.</rule>
  <rule icon="layers" t="Цена: токены">Шагов становится меньше, но на дистанции расход токенов растёт; для него есть лимиты.</rule>
</b-rules>
<b-section-h3 top="14">Ограничители расхода</b-section-h3>
<b-why align="left">Ответ подключённой системы попадает в диалог и занимает там место, а место измеряется в токенах. Поэтому Claude Code следит за размером ответа и ставит два порога.</b-why>
<b-scene names="mcp-agent-access/reply-size-scale"/>
<b-art-note top="6">Порог 25 000 можно поднять настройкой окружения MAX_MCP_OUTPUT_TOKENS, а порог предупреждения фиксирован.</b-art-note>
<b-why align="left"><a href="https://code.claude.com/docs/en/mcp" target="_blank" rel="noopener">Подробнее</a>.</b-why>
<b-finding>
  <ex>Три захода с растущими ошибками превращаются в один заход по точному запросу.</ex>
  <gen>Экономия состоит в отсутствии лишних кругов: точный запрос и ответ из источника не копят ошибки. Точные цифры дают только замеры на вашей работе.</gen>
  <gen k="Про лимиты">Чем длиннее работа, тем больше токенов уходит, поэтому длинные ответы системы Claude Code ограничивает: предупреждает после 10 000 токенов и сохраняет в файл после 25 000.</gen>
  <do>Замерьте на одной задаче две вещи: сколько минут и правок уходит на ручной перенос и сколько токенов тратит агент.</do>
</b-finding>
</b-chapter>
<b-chapter id="facts" icon="check-circle" title="Меньше галлюцинаций">
<b-why align="left">Галлюцинация: модель выдаёт текст, который выглядит верно, но неверен или не следует из данных. Ведёт она себя одинаково уверенно в двух случаях. <a href="https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations" target="_blank" rel="noopener">Подробнее</a></b-why>
<b-rules-fixed cols="2" sw="1.8">
  <rule icon="help" t="Контекста мало">Модель достраивает недостающее сама и не говорит, что это её догадка.</rule>
  <rule icon="file-text" t="Контекст есть">Модель ссылается на него бодро и уверенно, поэтому ссылку стоит открывать и сверять.</rule>
</b-rules-fixed>
<b-lane title="Где данных не хватает" color="accent" top="14">
<b-scene names="mcp-agent-access/fills-gaps"/>
</b-lane>
<b-art-note top="10" align="left">Ответ агента сопоставляется с данными: у каждой его части должна быть опора. В математике такое соответствие называется эпиморфизмом. Части без опоры модель заполняет догадкой, и они выглядят так же уверенно.</b-art-note>
<b-section-h3 top="18">Что рекомендует Anthropic</b-section-h3>
<b-step-chain>
  <node t="«Не знаю»">Разрешить признавать нехватку данных</node>
  <node t="Цитата">Опираться на дословный текст источника</node>
  <node t="Ссылка">К каждому утверждению свой источник</node>
</b-step-chain>
<b-finding>
  <ex>Jira закрыта, поэтому две части ответа агент додумал. Когда Jira подключена, на их месте стоят данные из заявки PAY-142 со ссылкой, и вы открываете её одним кликом.</ex>
  <gen>Дырки в данных агент заполняет догадкой и не говорит об этом. Три совета Anthropic закрывают их: разрешить «не знаю», опереться на цитату, дать ссылку на источник. Галлюцинации это не убирает полностью, проверка человеком остаётся.</gen>
  <do>Требуйте от агента источник к каждому факту: система, номер, поле. Как это делать в требованиях и протоколах встреч, <a href="/blog/requirements-sources-facts-assumptions/">в отдельной статье</a>.</do>
</b-finding>
</b-chapter>
<b-chapter id="risks" icon="shield-check" title="Риски и правила">
<b-why align="left">В большинстве случаев защита уже встроена в устройство MCP в Claude Code. Остаётся выбрать доверенные серверы и не выдавать лишних прав. <a href="https://code.claude.com/docs/en/mcp" target="_blank" rel="noopener">Подробнее</a></b-why>
<b-rules sw="1.8">
  <rule icon="bell" t="Разрешение">Claude Code спрашивает разрешение, прежде чем использовать инструмент сервера.</rule>
  <rule icon="folder-hm" t="Проектные серверы">Серверы из файла .mcp.json в проекте нужно одобрить до первого использования.</rule>
  <rule icon="key" t="Права">Для серверов со входом можно ограничить, какие права они запрашивают.</rule>
</b-rules>
<b-lane title="Лестница прав" color="accent" top="14">
<b-scene names="mcp-agent-access/rights-ladder"/>
</b-lane>
<b-finding>
  <ex>Агент читает прод, пишет только в тестовую таблицу и каждую запись показывает человеку.</ex>
  <gen>Права растут по лестнице: сначала чтение, потом запись с подтверждением. Запись без подтверждения откладывается до накопленного доверия.</gen>
  <do>Выдайте новому серверу только чтение и повысьте права после недели проверенной работы.</do>
</b-finding>
</b-chapter>
<b-chapter id="first" icon="arrow-right" title="С чего начать">
<b-scene names="mcp-agent-access/start-small"/>
<b-finding>
  <ex>Начните с Jira на чтение и сверьте пять ответов агента с тем, что видите сами.</ex>
  <gen>Один источник, один проверяющий, один шаг прав за раз.</gen>
  <do>Подключите первый сервер сегодня и запишите, что агент прочитал верно, а что нет.</do>
</b-finding>
</b-chapter>
<b-chapter id="cases" icon="grid-alt" title="Другие кейсы">
<b-why>Один подход работает в разных задачах: агент читает источники, человек проверяет результат.</b-why>
<b-scene names="mcp-agent-access/three-cases"/>
<b-table>
<table><thead><tr><th>Кейс</th><th>Источники</th><th>Что делает агент</th><th>Что проверяет человек</th></tr></thead><tbody><tr><td><a href="/blog/bug-report-to-reproduction-agent/">QA</a></td><td>Jira, стенд, браузер</td><td>воспроизводит баг, сжимает путь, пишет отчёт</td><td>шаги руками на стенде</td></tr><tr><td><a href="/blog/analytics-reports-agent/">Отчёты и аналитика</a></td><td>база, таблицы, документы</td><td>считает запросами, собирает сводку</td><td>одно число другим способом</td></tr><tr><td><a href="/blog/incident-investigation-agent/">Инциденты</a></td><td>Sentry, Grafana</td><td>сопоставляет ошибки, метрики и время релиза</td><td>гипотезу по графикам и событиям</td></tr></tbody></table>
</b-table>
</b-chapter>
<b-chapter id="next" icon="arrow-right" title="Дальше по теме">
  <b-links>
    <item href="/blog/bug-report-to-reproduction-agent/" k="QA с агентом" t="QA после поддержки">MCP и скиллы в работе QA</item>
    <item href="/blog/specs-rules-skills/" k="Скиллы" t="Спеки, правила и скиллы">что агент должен знать о проекте</item>
    <item href="/blog/harness-driven-development/" k="Петля ошибок" t="Harness-Driven Development">как ошибки агента становятся правилами</item>
  </b-links>
</b-chapter>
<b-footer>Задача PAY-142 выдумана для примера.</b-footer>
</b-post>
