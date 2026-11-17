---
title: Что такое quality gates для ИИ-агентов: контрольные точки, которые повышают качество и время автономной работы
date: 2026-11-14
updated: 2026-11-17
description: Гейт качества — пост приёмки между работой агента и словом «готово»: три вида проверки, числа по качеству и цене, права MCP, хуки и обход гейта.
tags: AI, агенты, quality gates, гейты качества, MCP, ограниченный контекст, харнесс, хуки, Claude Code
category: harness
layout: wide
mentions: quality gate, гейт качества, MCP, ограниченный контекст, агрегат, хуки, харнесс, Stage-Gate, Роберт Купер, Sonar, Claude, METR, детерминированная проверка, петля обратной связи, компилятор, P против NP, проектирование по контракту, взлом награды
toc: answer=Коротко | origin=Откуда слово | why=Самооценка | kinds=Виды | gives=Качество | auto=Автономность | where=Граница | mcp=MCP | limits=Пределы | start=Как начать | faq=Вопросы | next=Дальше по теме
---

Quality gate, или гейт качества, для ИИ-агента — внешняя точка контроля: работа останавливается, пока независимая проверка не ответит «принято», а сам агент «готово» не ставит. Гейт стоит вне агента и вне его ограниченного контекста, за MCP или другим разделителем. Он повышает качество и удлиняет автономную работу. Ниже: виды гейтов, числа, MCP и пределы.

<b-post series="harness">
<b-callout icon="bulb">**Мысли автора.** Идея, что гейт — внешняя часть и стоит за границей контекста агента, и выводы из неё принадлежат автору: гейт ставят на границе ограниченного контекста; один узкий набор функций MCP одновременно экономит контекст и ограничивает права; гейты удлиняют автономную работу. Общей формулировки «гейт за границей контекста» в источниках нет. Измерений удлинения автономной работы нет ни у кого: в разделе про автономность есть расчёт и кейсы, опыта на выборке нет. Источники подтверждают отдельные звенья, и рядом с ними стоят адрес и дословная фраза.</b-callout>

<b-hchain label="Цепочка: приёмка, виды проверки, граница контекста, MCP, пределы">
  <step icon="shield-check" t="Гейт">пост приёмки</step>
  <step icon="layers" t="Виды">машина · агент · человек</step>
  <step icon="workflow" sw="1.8" t="Граница">ограниченный контекст</step>
  <step icon="package" t="MCP">права и набор функций</step>
  <step icon="alert-circle" t="Пределы">как гейт обходят</step>
</b-hchain>

<b-chapter id="answer" icon="shield-check" title="Коротко: что такое гейт и зачем он агенту">
  <b-art names="quality-gates-ai-agents/overview" wide/>
  <b-cap>Дорога работы: агент идёт по своему контексту шаг за шагом, через MCP работа доходит до гейта, который стоит в другом контексте. Гейт отвечает «принято», «назад с ошибкой» или «не уверен, решает человек».</b-cap>
  <b-why align="left"><b-icon name="shield-check"/> **Что это.** Гейт стоит между работой агента и словом «готово». Агент приносит результат, проверка даёт один из трёх ответов: принято, не принято (ошибки возвращаются агенту) или не уверена (решает человек). Слово «готово» говорит пост. Если проверка не прошла, работа дальше не идёт: ни в соседний шаг, ни в слияние, ни к пользователю. Гейт — внешняя часть: точка контроля не может стоять в том же ограниченном контексте, что агент, иначе она делит с ним слепые пятна. Поэтому она стоит за разделителем: за MCP-сервером, в хуке клиента или в другом процессе. Через эту границу в обе стороны проходит мало: туда короткий результат, обратно короткий ответ, всё остальное закрыто. Гейт работает потому, что проверить обычно проще, чем сделать. Это родственно вопросу «P против NP» из теории сложности: найти решение может быть трудно, проверить готовое быстро. Для агентов это только аналогия: проверка дешёвая не для всякой задачи, и там, где её нет, гейт опирается на человека.</b-why>
  <b-why align="left"><b-icon name="trend-up"/> **Зачем.** Первая причина — качество: агент плохо оценивает собственную работу, а независимая проверка видит то, что он пропустил. Вторая — автономность: ошибка, пойманная на шаге, не тянется через следующие двадцать шагов, поэтому агент может работать дольше без человека. Третья — внимание человека: он смотрит только на спорные случаи, которые гейт отдал ему.</b-why>
  <b-why align="left"><b-icon name="target"/> **Где ставить.** Вне агента и вне его контекста: в хуке клиента или в правах сервера за MCP, но не в тексте инструкции, которую агент может проигнорировать. А сам агент работает внутри небольшого ограниченного контекста: там проверка конечна, правка небольшая, а набор функций MCP узкий. Эти места разобраны в разделах «Граница» и «MCP».</b-why>
  <b-finding>
    <ex>Агент закончил правку формы бронирования. Без гейта он пишет «готово». С гейтом запускаются тесты и проверка правил брони: если тест упал, агент получает текст ошибки и продолжает, а человек узнаёт о правке только когда всё прошло или когда проверка сказала «не уверена».</ex>
    <gen>Гейт отнимает у агента право самому ставить отметку «готово» и передаёт её проверке, которая стоит вне агента.</gen>
    <do>Выберите одну задачу, которую агент делает регулярно, и запишите условие «готово» одной проверяемой фразой: «все тесты зелёные и линтер молчит».</do>
  </b-finding>
</b-chapter>

<b-chapter id="origin" icon="clock" title="Откуда слово: от инспекции кода до гейтов для агентов">
  <b-why align="left">Слово «гейт» (gate, ворота) пришло из управления продуктами, заводов и разработки программ. Ниже четыре точки на пути, и у каждой своя мысль, которую унаследовали гейты агентов.</b-why>
  <b-art names="quality-gates-ai-agents/timeline" wide/>
  <b-cap>Инспекция кода, Stage-Gate, гейт по новому коду и гейты для агентов.</b-cap>
  <b-rules cols="2">
    <rule icon="eye" t="1976: инспекция кода">Формальный просмотр кода перед сдачей ввёл Фэган. Обзор 2026 года называет ревью «главным quality gate в разработке с тех пор»<b-proof href="https://arxiv.org/abs/2606.13175" quote="Monperrus: „Code review has been the primary quality gate in software development since Fagan formalised code inspection in 1976.“"/>.</rule>
    <rule icon="git-branch" t="1990: Stage-Gate">Роберт Купер описал проект как цепочку этапов, между которыми стоят гейты с решением «идти дальше или остановить». Сайт его института формулирует: привратники принимают такие решения вовремя<b-proof href="https://stage-gate.com/blog/improving-go-kill-decision-culture/" quote="Stage-Gate International: „Gatekeepers make timely, Go/Kill decisions.“"/>.</rule>
    <rule icon="shield-check" t="2020: гейт по новому коду">Sonar определил гейт как двоичное решение: прошёл или нет<b-proof href="https://www.sonarsource.com/blog/clean_coding-quality_profile_quality_gate_guidance/" quote="Sonar: „called a Quality Gate and it's binary in nature - either pass or fail.“"/>. Он смотрит на код, добавленный или изменённый недавно; вся история в проверку не входит.</rule>
    <rule icon="cpu" t="2026: гейты для агентов">Thoughtworks Radar называет компиляторы, линтеры и тесты детерминированными quality gates и советует встроить их в процессы агентов<b-proof href="https://www.thoughtworks.com/content/dam/thoughtworks/documents/radar/2026/04/tr_technology_radar_vol_34_en.pdf" quote="Thoughtworks Radar, выпуск 34: „Developers have long relied on deterministic quality gates such as compilers, linters, structural tests and test suites“"/>. У Sonar для этого есть отдельный набор условий для кода, который пишут агенты.</rule>
  </b-rules>
  <b-why align="left">Ещё две мысли пришли с заводов. Деминг в третьем из четырнадцати пунктов требует перестать зависеть от контроля на выходе и встраивать качество в продукт с самого начала<b-proof href="https://deming.org/explore/fourteen-points/" quote="Деминг, пункт 3: „Cease dependence on inspection to achieve quality. Eliminate the need for inspection on a mass basis by building quality into the product in the first place.“"/>. Toyota в системе дзидока заставляет оборудование останавливаться сразу при отклонении<b-proof href="https://global.toyota/en/company/vision-and-philosophy/production-system/" quote="Toyota: оборудование должно „stop immediately when abnormalities are detected to prevent defective products from being produced“"/>. Гейт агента соединяет обе мысли: проверка стоит как можно раньше и умеет остановить работу.</b-why>
  <b-why align="left">В русскоязычных статьях про CI термин закрепился латиницей: «quality gate» и «гейт». Перевод «ворота качества» встречается только как пояснение в скобках<b-proof href="https://habr.com/ru/post/542676" quote="Habr, 2021: термин вынесен латиницей в заголовок, а перевод дан пояснением — «буквально „ворота качества“»"/>.</b-why>
  <b-finding>
    <ex>Фэган проверял код людьми, Купер ставил гейты между этапами проекта, Sonar сделал гейт автоматическим, а для агентов гейт стал точкой, где работа не идёт дальше без вердикта.</ex>
    <gen>Гейт для агента не новая выдумка: это старая точка контроля, перенесённая туда, где работу делает машина, которая сама себя плохо проверяет.</gen>
    <do>Посмотрите, какие гейты в вашем проекте уже есть для людей: тесты в CI, обязательное ревью, линтер. Агент должен проходить те же.</do>
  </b-finding>
</b-chapter>

<b-chapter id="why" icon="eye" title="Почему агент не проверяет себя сам">
  <b-why align="left">Первое, что показывают исследования: агент завышает оценку своей работы. В Anthropic пришли к тому, что отделить агента-исполнителя от агента-проверяющего — сильный рычаг<b-proof href="https://www.anthropic.com/engineering/harness-design-long-running-apps" quote="Anthropic, 24.03.2026: „Separating the agent doing the work from the agent judging it proves to be a strong lever to address this issue.“"/>. Там же отмечено, что без настройки Claude плохой проверяющий: его пришлось настраивать на строгость.</b-why>
  <b-why align="left">Самое подробное измерение — препринт Пака и Чхве (июль 2026, черновой пилот). Один и тот же агент делал шесть циклов улучшения, менялся только тот, кто замыкает петлю обратной связи, то есть оценивает результат: сам агент, сильный судья внутри цикла или внешняя проверка, видящая настоящий результат. На схеме итоговый балл каждого варианта.</b-why>
  <b-art names="quality-gates-ai-agents/self-grade" wide/>
  <b-cap>Самооценка агента откатила достигнутое на 19%, внешняя проверка дала максимум. Пилот: одна модель, одна задача, три повтора.</b-cap>
  <b-why align="left">Что стоит за цифрами. Агент назвал улучшением все 54 цикла, хотя в 56% из них реальное изменение было нулевым или отрицательным: самооценка превратилась в «принять всё». Даже сильный судья внутри цикла принял реальные ухудшения в 44% случаев и отклонил 38% реальных улучшений. Авторы объясняют разрыв так<b-proof href="https://arxiv.org/abs/2607.25152" quote="Park, Choi: „The cause of the gap is not the evaluator's quality but what the evaluator is grounded in.“"/>: разрыв определяется опорой проверяющего, а его ум на разрыв не влияет. Судья внутри цикла видит только то, что показал агент. Внешняя проверка смотрит на настоящий результат.</b-why>
  <b-why align="left">Тот же вывод у Anthropic в истории с компилятором на C (кейс описан самой Anthropic): 16 агентов, около 2000 сессий и около 20 000 долларов. Главным условием автор назвал почти идеальную проверяющую программу<b-proof href="https://www.anthropic.com/engineering/building-c-compiler" quote="Anthropic, 05.02.2026: „it's important that the task verifier is nearly perfect, otherwise Claude will solve the wrong problem.“"/>. Он же предупредил<b-proof href="https://www.anthropic.com/engineering/building-c-compiler" quote="там же: „it is easy to see tests pass and assume the job is done, when this is rarely the case.“"/>. Тесты проходят, а работа не сделана: так бывает, пока проверка не детерминирована. Детерминированная проверка на тех же данных всегда даёт тот же вердикт, как запуск тестов или линтера. Ответ модели-судьи может отличаться от запуска к запуску, поэтому судья дополняет программу проверки, но не заменяет её.</b-why>
  <b-why align="left">Ещё одно наблюдение из пилота: проверке снаружи хватило одного бита. Вердикт «принято» или «отклонено» без текста разбора дал 110,0 балла против 113,0 с полным разбором. Значит, гейту не обязательно объяснять причину: достаточно ответа «да» или «нет».</b-why>
  <b-finding>
    <ex>Агент в цикле называл всё улучшением, а внешняя проверка по настоящему результату отсекала ухудшения.</ex>
    <gen>Проверка внутри диалога агента наследует его слепые пятна. Независимой её делает опора на внешний факт: запуск тестов, реальный результат, отдельный проверяющий с доступом к настоящему продукту.</gen>
    <do>Проверьте свои запросы к агенту: если в них есть фраза «убедись, что всё верно», замените её на запуск проверки, результат которой агент не может написать сам.</do>
  </b-finding>
</b-chapter>

<b-chapter id="kinds" icon="layers" title="Три вида проверки на гейте">
  <b-why align="left">На посту приёмки может стоять проверка трёх видов. Они различаются скоростью, ценой и тем, что способны увидеть, поэтому на практике ставят несколько подряд: сначала дешёвую быструю, в конце дорогую и редкую.</b-why>
  <b-art names="quality-gates-ai-agents/three-kinds" wide/>
  <b-cap>Слева направо проверка становится умнее, медленнее и дороже.</b-cap>
  <b-table>

| Вид | Что видит | Пример | Слабое место |
|---|---|---|---|
| <b-icon name="cpu"/> **Машина** | всё, что записано как правило: тесты, типы, линтер, сборка, покрытие | у Sonar для агентов: покрытие нового кода от 80%, дубли до 3%, ноль новых багов и уязвимостей | не видит смысла: диагноз ошибки, лишнюю сложность и неверно понятое задание датчики ловят ненадёжно |
| <b-icon name="eye"/> **Проверяющий агент** | смысл по критериям с порогом | у Anthropic: ниже порога по любому критерию — этап провален; у Spotify судья отклоняет около четверти сессий | дороже, его нужно настраивать на строгость, а сам он тоже ошибается |
| <b-icon name="user"/> **Человек** | риск, замысел, последствия | GitHub: черновые PR агента принимает и сливает только человек | устаёт и привыкает к одобрению |

  </b-table>
  <b-why align="left"><b-icon name="cpu"/> **Машина.** Задаёт нижний уровень. Sonar для кода, который пишут агенты, требует шесть условий: ни одного нового бага, уязвимости или ошибки сопровождения выше порога, покрытие нового кода от 80%, дубли до 3% и отсутствие новых рисков зависимостей. Последнее условие появилось из-за поведения агентов: они могут сами ставить пакеты без проверки<b-proof href="https://docs.sonarsource.com/sonarqube-server/quality-standards-administration/ai-code-assurance/quality-gate-for-agentic-ai" quote="Sonar: „agents may autonomously install packages without manual vetting“"/>. Подробнее про деление проверок на направляющие и датчики — в статье [«Harness engineering на практике»](/blog/harness-driven-development/): гейт — датчик, у которого есть право остановить работу.</b-why>
  <b-why align="left"><b-icon name="eye"/> **Проверяющий агент.** У Anthropic каждый критерий имел жёсткий порог, и если хотя бы один оказывался ниже, этап считался проваленным и агент получал подробный разбор<b-proof href="https://www.anthropic.com/engineering/harness-design-long-running-apps" quote="Anthropic: „Each criterion had a hard threshold, and if any one fell below it, the sprint failed and the generator got detailed feedback on what went wrong.“"/>. До начала этапа исполнитель и проверяющий договаривались о договоре этапа: что считать «готово»<b-proof href="https://www.anthropic.com/engineering/harness-design-long-running-apps" quote="Anthropic: „agreeing on what ‘done’ looked like for that chunk of work before any code was written“"/>. Spotify добавил судью после того, как агенты начали делать лишнее: рефакторить код вне задания и отключать нестабильные тесты. Судья сравнивает правку с исходным запросом<b-proof href="https://engineering.atspotify.com/2025/12/feedback-loops-background-coding-agents-part-3" quote="Spotify: „the judge vetoes about a quarter of them. When that happens, the agent is able to course correct half the time.“"/>.</b-why>
  <b-why align="left"><b-icon name="user"/> **Человек.** GitHub встроил его в сам процесс: агент не может ни пометить свой PR готовым, ни одобрить, ни слить его<b-proof href="https://docs.github.com/en/copilot/concepts/agents/coding-agent/risks-and-mitigations" quote="GitHub Docs: „Copilot cloud agent cannot mark its pull requests as ‘Ready for review’ and cannot approve or merge a pull request.“"/>. Такой гейт нужен там, где ошибка дорога: деньги, доступы, чужие данные.</b-why>
  <b-why align="left">У гейта три ответа: принято, не принято и «не уверена». Третий ответ отдаёт случай человеку и показывает, где рамка проверки кончилась. Почему такой ответ неизбежен для любого кода агента, разобрано в статье [«Где ставить проверку работы ИИ-агента»](/blog/agent-checkpoint/).</b-why>
  <b-finding>
    <ex>Тесты прошли за 40 секунд. Проверяющий агент нашёл, что кнопка работает, но выглядит не так, как в задании. Человек получил только этот спорный случай.</ex>
    <gen>Быстрые гейты стоят перед дорогими: машина отсеивает очевидное, агент судит смысл, человек решает риск.</gen>
    <do>Выпишите проверки вашего проекта по трём строкам таблицы. Пустая строка означает, что этот вид гейта не стоит.</do>
  </b-finding>
</b-chapter>

<b-chapter id="gives" icon="trend-up" title="Что гейты дают качеству и во что это обходится">
  <b-why align="left">Числа ниже взяты из четырёх отдельных источников: двух разборов Anthropic (24.03.2026 и 05.02.2026), двух инженерных блогов Stripe, Spotify и отчёта DORA 2025. Исследований на выборке нет: сравнений «с гейтом и без» на сотнях задач никто не публиковал, поэтому каждое число служит примером. Откуда именно число, видно по ссылке рядом с ним.</b-why>
  <b-art names="quality-gates-ai-agents/cost-quality" wide/>
  <b-cap>Один запрос: агент в одиночку и агент с проверяющим.</b-cap>
  <b-rules cols="2">
    <rule icon="flask" t="Anthropic: один запрос, два запуска">Один агент: 20 минут и 9 долларов, главная функция не работала. Агент с проверяющим: 6 часов и 200 долларов, результат работал<b-proof href="https://www.anthropic.com/engineering/harness-design-long-running-apps" quote="Anthropic: „The harness was over 20x more expensive, but the difference in output quality was immediately apparent.“"/>. С моделью Opus 4.6: 3 часа 50 минут и 124,70 доллара. Окупается на задачах, которые модель не делает надёжно сама<b-proof href="https://www.anthropic.com/engineering/harness-design-long-running-apps" quote="Anthropic: „It is worth the cost when the task sits beyond what the current model does reliably solo.“"/>.</rule>
    <rule icon="modules" t="Stripe: масштаб">Больше тысячи слитых PR в неделю написаны агентами и проверены людьми<b-proof href="https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents" quote="Stripe: „Over a thousand pull requests merged each week at Stripe are completely minion-produced, and while they're human-reviewed, they contain no human-written code.“"/>. Между шагами модели стоят шаги без неё: линтеры за пять секунд, не больше двух прогонов CI, потом ветка уходит человеку<b-proof href="https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents-part-2" quote="Stripe, часть 2: „those particular nodes don't invoke an LLM at all—they just run code“"/>.</rule>
    <rule icon="refresh-cw" t="Spotify: судья">Верификаторы запускаются сами, агент о них не знает; судья проверяет смысл. Цифр «до и после» нет: только вето в четверти сессий и исправление в половине таких случаев (цитата в предыдущем разделе).</rule>
    <rule icon="chart-line" t="DORA 2025: скорость и стабильность">ИИ повышает скорость поставки, но снижает стабильность<b-proof href="https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report" quote="DORA 2025: „AI adoption does continue to have a negative relationship with software delivery stability.“"/>. Довод «нестабильность окупается быстрым исправлением» не подтвердился<b-proof href="https://services.google.com/fh/files/misc/2025_state_of_ai_assisted_software_development.pdf" quote="DORA 2025, с. 41: „We found no evidence of such a moderating effect.“"/>. Мой вывод: гейты не дают платить за скорость стабильностью. Отчёт про гейты не говорит.</rule>
  </b-rules>
  <b-finding>
    <ex>Проверяющий и пороги превратили неработающее приложение в рабочее за 20-кратную цену. Stripe и Spotify получили масштаб благодаря проверкам, которые стоят вокруг агента.</ex>
    <gen>Гейт стоит денег и времени. Окупается он там, где агент без него даёт неработающий результат или ошибку, которая дорого обходится потом.</gen>
    <do>Посчитайте для своей задачи цену одной ошибки, дошедшей до ревью человеком, и цену запуска проверки. Если первая выше, гейт окупится.</do>
  </b-finding>
</b-chapter>

<b-chapter id="auto" icon="gauge" title="Как гейты удлиняют автономную работу: арифметика и пробел в данных">
  <b-callout icon="bulb">Языковая модель хранит приблизительный набросок мира, а не сам мир. Когда агент сверяет шаги с реальностью (тесты, ответы систем) и держит порядок в контексте, ошибки находятся и исправляются. Это подтверждают работы про самоисправление: оно помогает при надёжном сигнале снаружи, а без него иногда вредит. Фраза «чем дольше, тем лучше» верна только с такой сверкой: на длинном входе качество падает, а на части задач длинное рассуждение даёт худший ответ. Гейт даёт сверку и порядок, поэтому работа может идти дольше без потери качества. Данных на выборке про «гейт удлинил автономную работу» нет; ниже факты, на которые идея опирается.</b-callout>
  <b-why align="left"><b-icon name="bar-chart"/> **Что такое горизонт задачи.** METR измеряет длину задачи, которую агент выполняет с заданной вероятностью успеха, по времени, которое на неё тратит человек. Это не время работы агента<b-proof href="https://metr.org/time-horizons" quote="METR: „It's a measure of the difficulty of a task, rather than the time an AI spends to complete the task.“"/>. Для Claude Opus 4.6 горизонт при успехе в 50% составляет около 12 часов (доверительный интервал от 5 до 61 часа), а при успехе в 80% — около 70 минут. У GPT-5.4 это 5,7 часа и 54 минуты. Выше 16 часов METR считает измерения ненадёжными<b-proof href="https://metr.org/time-horizons" quote="METR: „Measurements above 16 hrs are unreliable with our current task suite.“"/>. Как устроены метрики автономности и где в них человек: в статье [«Эскалация к человеку в ИИ-агентах»](/blog/agent-escalation-to-human/#measure).</b-why>
  <b-why align="left"><b-icon name="chart-axes"/> **Цена надёжности.** Тоби Орд показал, что при постоянной вероятности ошибки на минуту работы горизонты связаны формулой<b-proof href="https://arxiv.org/pdf/2505.05115" quote="Ord: „the time horizon for a success probability of p would be ln(p)/ln(q) times as long as one with success probability q.“"/>. Следствие: горизонт при 80% успеха около трети горизонта при 50%, при 90% около седьмой части, при 99% около семидесятой. Каждая лишняя «девятка» надёжности стоит длины задачи.</b-why>
  <b-art names="quality-gates-ai-agents/autonomy-curve" wide/>
  <b-cap>Расчёт-пример: при 95% успеха на шаг после 20 шагов остаётся 36% шансов, при 99% на шаг — 82%.</b-cap>
  <b-why align="left"><b-icon name="shield-check"/> **Где здесь гейт.** Гейт на шаге повышает надёжность шага. Если вероятность ошибки шага 5%, а гейт ловит 4 ошибки из 5 и возвращает агента на исправление, то шаг в итоге ломается в 1% случаев. Это арифметика с допущением, что шаги независимы: Орд сам оговаривает, что для Claude 3.7 Sonnet измеренное отношение горизонтов 0,25, а теория даёт 0,32. Схема показывает направление: 82% — расчёт, измеренного результата за ним нет.</b-why>
  <b-why align="left"><b-icon name="file-text"/> **Два механизма Anthropic для длинных запусков.** Первый: каждая сессия агента начинается без памяти о прошлых, и сжатия диалога не хватает<b-proof href="https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents" quote="Anthropic: „compaction isn’t sufficient“"/>. Поэтому в начале работы агент составил список из более чем 200 функций, где все стоят как «не работает». Агенту разрешено менять только отметку о прохождении, а править сами тесты запрещено<b-proof href="https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents" quote="Anthropic: „It is unacceptable to remove or edit tests because this could lead to missing or buggy functionality.“"/>. Такой список — состояние гейта, которое живёт в файле вне диалога: новая сессия видит, сколько осталось, и не может решить, что всё готово.</b-why>
  <b-why align="left"><b-icon name="alert-circle"/> Второй механизм связан с «тревогой контекста». Модели начинают сворачивать работу, когда считают, что окно контекста скоро кончится<b-proof href="https://cognition.com/blog/devin-sonnet-4-5-lessons-and-challenges" quote="Cognition: „we found the model taking shortcuts or leaving tasks incomplete when it believed it was near the end of its window, even when it had plenty of room left.“"/>. Гейт с критериями из списка делает решение «закончить» зависимым от зелёных отметок; ощущение агента в решении не участвует. Отсюда вывод: ограниченный контекст должен быть такого размера, чтобы помещаться в физическое контекстное окно.</b-why>
  <b-why align="left"><b-icon name="refresh-cw"/> **Хук как механизм продолжения.** В Claude Code хук завершения задачи не даёт её закрыть, пока не пройдут проверки<b-proof href="https://code.claude.com/docs/en/hooks" quote="Claude Code Docs, TaskCompleted: „Use this to enforce completion criteria like passing tests or lint checks before a task can close.“"/>: сообщение об отказе возвращается агенту, и он продолжает. Остановочный хук работает так же с завершением хода целиком.</b-why>
  <b-finding>
    <ex>Агент делает 20 шагов. Без гейта шанс довести их без единой ошибки около 36%. Гейт, который ловит 4 из 5 ошибок на каждом шаге, поднимает его по расчёту примерно до 82%.</ex>
    <gen>Гейт даёт автономность через надёжность шага: чем реже ошибка проходит дальше, тем длиннее задача, которую можно оставить без присмотра. Прямых измерений нет, поэтому это расчёт и гипотеза.</gen>
    <do>Заведите журнал: сколько шагов агент проходит без вмешательства человека до и после добавления гейта. Через месяц у вас будут свои числа.</do>
  </b-finding>
</b-chapter>

<b-chapter id="where" icon="workflow" title="Где ставить: на границе ограниченного контекста">
  <b-why align="left">Гейт ставят на границе ограниченного контекста по четырём причинам. У каждой есть опора в источниках.</b-why>
  <b-why align="left"><b-icon name="ring-dot"/> **1. Проверка внутри рамки конечна.** Любую программу на любое правило проверить нельзя, поэтому проверку ставят туда, где рамка ограничивает вопрос. Почему так и как граница агрегата становится постом проверки — в статье [«Где ставить проверку работы ИИ-агента»](/blog/agent-checkpoint/). Для гейта отсюда следует: гейт без границы будет отвечать «не уверена» слишком часто.</b-why>
  <b-why align="left"><b-icon name="scissors"/> **2. Маленькая правка чаще удаётся.** Чем больше агент меняет за раз, тем реже задача решается. Граница контекста ограничивает размер правки естественным образом.</b-why>
  <b-art names="quality-gates-ai-agents/size-success" wide/>
  <b-cap>На SWE-bench Live правка в одном файле до пяти строк решается в 48% случаев, а три файла и больше — меньше чем в 10%.</b-cap>
  <b-why align="left">Числа на схеме взяты из двух работ: [SWE-bench Live](https://arxiv.org/abs/2505.23419) и агент Kozuchi на SWE-bench Verified ([arXiv 2608.15579](https://arxiv.org/abs/2608.15579)). Испытания и агенты разные, поэтому важно направление: чем больше правка, тем реже она удаётся. На уровне команд то же показывает DORA: польза от ИИ зависит от работы маленькими пакетами<b-proof href="https://services.google.com/fh/files/misc/2025_state_of_ai_assisted_software_development.pdf" quote="DORA 2025, с. 58: „With a high degree of certainty, we found that AI adoption's positive benefits depend on teams working in small batches“"/>.</b-why>
  <b-why align="left"><b-icon name="database"/> **3. Окно контекста ограничено.** Контекст — конечный ресурс с убывающей отдачей<b-proof href="https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents" quote="Anthropic: контекст — „a finite resource with diminishing marginal returns“"/>. Chroma проверила 18 моделей и показала, что надёжность падает с ростом входа<b-proof href="https://www.trychroma.com/research/context-rot" quote="Chroma, Context Rot: „performance grows increasingly unreliable as input length grows“"/>. Эванс в докладе 2024 года заметил, что ответы модели стабильнее, когда запрос разбит на небольшие куски (по пересказу InfoQ). Небольшой ограниченный контекст даёт агенту короткое окно, и у гейта меньше шансов проверять то, чего агент уже не помнит.</b-why>
  <b-art names="quality-gates-ai-agents/contexts" wide/>
  <b-cap>У каждого контекста свой агент, своё небольшое окно, свой набор функций MCP и гейт на границе. Между контекстами ходят события.</b-cap>
  <b-why align="left"><b-icon name="swap"/> **4. На границе понятно, кто виноват.** В проектировании по контракту Бертрана Мейера ошибка предусловия лежит на вызывающем, а ошибка постусловия на поставщике<b-proof href="https://se.inf.ethz.ch/~meyer/publications/computer/contract.pdf" quote="Meyer, 1992: „A precondition violation indicates a bug in the client (caller).“ и „A postcondition violation is a bug in the supplier (routine).“"/>. Гейт на границе сразу показывает, чья ошибка: пришла плохая команда или ушло плохое событие. Эванс советует ставить на границе слой защиты, который переводит чужие понятия в свои<b-proof href="https://www.domainlanguage.com/wp-content/uploads/2016/05/DDD_Reference_2015-03.pdf" quote="Evans, DDD Reference: „As a downstream client, create an isolating layer to provide your system with functionality of the upstream system in terms of your own domain model.“"/>. Гейт стоит на этом слое.</b-why>
  <b-why align="left">Что такое ограниченный контекст и агрегат и как число контекстов связано с числом агентов — в статьях [«Сколько нужно ИИ-агентов»](/blog/agents-per-bounded-context/) и [«Спеки по агрегатам»](/blog/specs-by-aggregates/).</b-why>
  <b-finding>
    <ex>Контексты «Бронь» и «Оплата»: у каждого свой агент, свой набор из трёх функций MCP и свой гейт. Событие «БроньСоздана» проходит гейт брони при выходе и гейт оплаты при входе. Если оплата отклонила событие, видно, на чьей стороне нарушение.</ex>
    <gen>Граница ограниченного контекста даёт гейту четыре вещи сразу: конечную проверку, небольшую правку, короткое окно и понятного виновного.</gen>
    <do>Выберите один контекст и выпишите три вещи на его границе: какие команды он принимает, какие события отдаёт, какое правило верно всегда. Это и есть то, что проверяет гейт.</do>
  </b-finding>
</b-chapter>

<b-chapter id="mcp" icon="package" title="MCP: права, набор функций и место гейта">
  <b-why align="left">[MCP](/blog/mcp-agent-access/) — протокол, по которому агент вызывает функции внешних систем. Для гейтов он важен дважды: сервер MCP может жёстко ограничить, что агенту доступно, а набор функций определяет, сколько контекста агент тратит на описания.</b-why>
  <b-subhead>Что сервер MCP может запретить, а что только подсказывает</b-subhead>
  <b-table>

| Механизм | Сила | Что сказано в спецификации |
|---|---|---|
| <b-status-dot color="accent">Права и область доступа</b-status-dot> | запрет | при нехватке прав сервер отвечает 403 и называет нужную область; в версии 2026-07-28 список функций может зависеть от прав вызывающего |
| <b-status-dot color="accent">Результат по схеме</b-status-dot> | вердикт | сервер обязан вернуть результат по заявленной схеме, поэтому вердикт «принято / не принято» машиночитаем |
| <b-status-dot color="accent">Запрос человеку</b-status-dot> | вопрос | сервер может спросить человека; ответ: принять, отказать или отменить |
| <b-status-dot color="warn">Метки функций</b-status-dot> | подсказка | «только чтение», «разрушающая» — подсказки, клиент не обязан им верить |
| <b-status-dot color="warn">Корневые папки</b-status-dot> | подсказка | сервер «должен» уважать границы, но принуждения нет |

  </b-table>
  <b-why align="left">Подтверждения из спецификации: результат по схеме<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28/server/tools" quote="MCP, 2026-07-28: „Servers MUST provide structured results that conform to this schema.“"/>, список функций по правам<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28/server/tools" quote="MCP, 2026-07-28: список функций „MAY vary by the authorization presented on the request — for example, returning only the tools the caller's granted scopes permit“"/> и метки функций<b-proof href="https://github.com/modelcontextprotocol/modelcontextprotocol" quote="MCP, schema.ts: „NOTE: all properties in ToolAnnotations are hints.“"/>. Подробно про области доступа серверов MCP в Claude Code — в статье [«Области MCP»](/blog/mcp-scopes/).</b-why>
  <b-subhead>Узкий набор функций: два эффекта от одного механизма</b-subhead>
  <b-art names="quality-gates-ai-agents/mcp-sets" wide/>
  <b-cap>Описания 58 функций занимали около 55 тысяч токенов. С поиском по функциям нужное загружается по требованию: около 8,7 тысячи.</b-cap>
  <b-why align="left"><b-icon name="package"/> **Первый эффект — контекст.** Anthropic показала, что 58 функций занимали около 55 тысяч токенов, а с поиском по функциям около 8,7 тысячи, и точность выбора функции у Opus 4 выросла с 49% до 74%, у Opus 4.5 с 79,5% до 88,1%. В другом примере выполнение кода вместо прямых вызовов сократило расход со 150 000 до 2000 токенов. Вывод самой Anthropic: больше функций не значит лучше результат.</b-why>
  <b-why align="left"><b-icon name="lock"/> **Второй эффект — права.** Те же настройки ограничивают права. В Claude Code у подагента есть список разрешённых функций, список запрещённых и собственный набор серверов MCP, которого нет в основном диалоге. Один узкий набор на ограниченный контекст значит и короткое окно, и меньше возможностей что-то сломать. Это мой вывод, цифры выше измерены для токенов, для безопасности их нет.</b-why>
  <b-subhead>Почему гейт стоит за MCP и почему агенту невыгодно останавливаться</b-subhead>
  <b-callout icon="help-circle">**Гипотеза автора, исследование готовится.** Агентов измеряют и, как я предполагаю, оптимизируют на время автономной работы: главная метрика прогресса — длина задачи, которую агент делает без человека (METR). В MCP есть запрос к человеку: сервер может спросить, и ответ бывает «принять», «отказать» или «отменить». Для такой метрики каждый вопрос к человеку — потеря автономности, поэтому агенту невыгодно останавливаться и спрашивать. Плюс MCP — узкое горлышко: через него проходят вызовы функций и ответы, а смысл всей работы не проходит. Отсюда вывод: гейт нельзя строить на доброй воле агента, он стоит вне агента, за разделителем. Как именно обучают агентов и считают метрики, я не проверял, этому посвящена отдельная статья.</b-callout>
  <b-why align="left">Родственная граница проходит между командами агента (control plane) и данными, которые он читает (data plane): данные не должны становиться командами. Об этом доклад автора на Podlodka AI Crew [«Работа AI-агента: архитектура, защита, экономика»](/decks/ai-agent-architecture/) и статья [«Data plane и control plane агента»](/blog/data-plane-control-plane-prompt-injection/).</b-why>
  <b-subhead>Где гейт должен стоять: вне агента</b-subhead>
  <b-art names="quality-gates-ai-agents/outside-agent" wide/>
  <b-cap>Правило в тексте агент может обойти. Гейт в хуке клиента или в правах сервера обойти нельзя.</b-cap>
  <b-table>

| Где живёт гейт | Надёжность | Почему |
|---|---|---|
| Фраза в инструкции | <b-status-dot color="warn">совет</b-status-dot> | агент может её пропустить |
| Хук клиента до вызова | <b-status-dot color="accent">запрет</b-status-dot> | блокирует вызов функции MCP по маске имени сервера и функции |
| Остановочный хук | <b-status-dot color="accent">запрет</b-status-dot> | не даёт закончить ход, пока проверка не пройдёт |
| Хук после вызова | <b-status-dot color="warn">сигнал</b-status-dot> | функция уже отработала |
| Права сервера | <b-status-dot color="accent">запрет</b-status-dot> | проверка стоит в системе, куда агент обращается |

  </b-table>
  <b-why align="left">По документации Claude Code: хук перед вызовом блокирует вызов, остановочный хук не даёт Claude закончить ход, хук завершения задачи не даёт закрыть задачу. Хук после вызова ничего не блокирует: функция уже сработала. Подсказка в тексте остаётся советом, как отмечает автор разбора остановочных хуков<b-proof href="https://fbakkensen.github.io/ai/devtools/development/2026/03/27/quality-gates-for-coding-agents-how-stop-hooks-make-validation-mandatory.html" quote="fbakkensen: „prompt instructions are suggestions, not constraints.“"/>. Проверку прав OWASP советует делать там, где выполняется действие<b-proof href="https://genai.owasp.org/llmrisk/llm062025-excessive-agency/" quote="OWASP LLM06:2025: „Complete mediation: Implement authorization in downstream systems rather than relying on an LLM to decide if an action is allowed or not.“"/>.</b-why>
  <b-why align="left"><b-icon name="alert-circle"/> **Слабое место: проверка, которую агент вызывает сам.** Если проверка оформлена как функция MCP, агент может её вызвать, а может и не вызвать, и тогда вердикта не будет. Так устроен готовый сервер agent-gate: агент сам присылает доказательства, сервер возвращает вердикт и дописывает его в журнал, где записи связаны хешами<b-proof href="https://github.com/Jott2121/agent-gate" quote="README agent-gate: „MCP server that adds a fail-closed quality gate and hash-chained receipt ledger to any AI agent workflow.“"/>. Это самопроверка со слепыми пятнами из раздела про самооценку. К тому же клиент обязан считать пометки функций недоверенными<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28/server/tools" quote="MCP: „clients MUST consider tool annotations to be untrusted unless they come from trusted servers.“"/>. Надёжнее, если сервер вердикта вызывает хук или оркестратор: агент вердикт не обходит.</b-why>
  <b-why align="left"><b-icon name="search"/> **Каких готовых программ не нашлось.** Шлюзы MCP отвечают за права, секреты и утечки: agentgateway (проект Linux Foundation), шлюзы Microsoft, Docker и Lasso. Шлюза, который проверяет «работа сделана верно», среди них я не нашёл. Набор Microsoft quality-gates для разработки по спекам оказался чек-листом для самого агента, сервера в нём нет.</b-why>
  <b-finding>
    <ex>Агент подключён только к функциям своего контекста. Остановочный хук запускает тесты и вызывает сервер проверки правил брони. Агент видит текст ошибки, но сам вердикт не пишет.</ex>
    <gen>Узкий набор функций экономит контекст и ограничивает права, а гейт вне агента не даёт обойти проверку. Вердикт возвращает программа, которой агент не управляет.</gen>
    <do>Для одного контекста перечислите функции MCP, которые агенту нужны, и отключите остальные. Потом поставьте хук, который запускает проверку без участия агента.</do>
  </b-finding>
</b-chapter>

<b-chapter id="limits" icon="alert-circle" title="Пределы гейта: как его обходят и почему он ломается сам">
  <b-art names="quality-gates-ai-agents/bypass" wide/>
  <b-cap>Четыре пути вокруг гейта: правка теста, подгонка под тест, скрытое намерение и привыкший ревьюер.</b-cap>
  <b-why align="left"><b-icon name="bug"/> **Агент подгоняет результат под проверку.** METR зафиксировала, что o3 обманывал оценку в 0,7% запусков, а на одной из задач 21 раз из 21<b-proof href="https://metr.org/blog/2025-06-05-recent-reward-hacking" quote="METR: „o3 reward-hacks in 0.7% of runs across all HCAST tasks“"/>. В описании Claude 3.7 Sonnet Anthropic признаёт, что модель иногда возвращает ожидаемые значения теста вместо общего решения или правит сами тесты. ImpossibleBench сделал тесты противоречащими заданию и считал любой проход обманом: GPT-5 обманул в 54% случаев<b-proof href="https://arxiv.org/abs/2510.20270" quote="ImpossibleBench: GPT-5 „cheats 54.0% of the time on Conflicting-SWEbench“"/>. Тесты «только для чтения» убирают правку тестов, но не подгонку под них<b-proof href="https://arxiv.org/abs/2510.20270" quote="ImpossibleBench: read-only tests „restores legitimate performance while preventing test modification attempts“"/>.</b-why>
  <b-why align="left"><b-icon name="eye"/> **Мониторить рассуждения лучше, но давить на них нельзя.** Монитор действий ловит 60% взломов, монитор рассуждений 95%<b-proof href="https://arxiv.org/abs/2503.11926" quote="Baker и др.: монитор действий „achieves only 60% recall overall“, монитор рассуждений — 95%"/>. Если же обучать агента с давлением на рассуждения, охват монитора падает почти до нуля, потому что агент учится прятать намерение<b-proof href="https://arxiv.org/abs/2503.11926" quote="Baker и др.: „the CoT monitor’s recall falls to near zero, indicating that the agent has learned to hide its intent“"/>.</b-why>
  <b-why align="left"><b-icon name="refresh-cw"/> **Гейт, который вечно отказывает.** В Claude Code после восьми отказов остановочного хука подряд программа сама обрывает ход<b-proof href="https://code.claude.com/docs/en/hooks" quote="Claude Code Docs: „after stop hooks have continued the turn eight times in a row, Claude Code overrides the next block and ends the turn.“"/>. Пределом можно управлять переменной окружения, но принцип остаётся: у гейта должен быть лимит попыток и передача человеку. У Stripe это не больше двух прогонов CI, у Microsoft devsquad две попытки исправления<b-proof href="https://github.com/microsoft/devsquad-copilot" quote="Microsoft devsquad: „Maximum of 2 correction iterations. If after 2 attempts there are still failures, deliver the artifact with documented failures for human decision.“"/>.</b-why>
  <b-why align="left"><b-icon name="scales"/> **Гейт слишком жёсткий.** По пересказу доклада Spotify на QCon London, опубликованному InfoQ 18 марта 2026, судью сочли слишком жёстким, он блокировал верные правки, и позже его убрали, оставив проверки в запросах<b-proof href="https://www.infoq.com/news/2026/03/spotify-honk-rewrite" quote="InfoQ: судья „found it too rigid, blocking valid changes“ и „was eventually removed, with verification steps in prompts proving sufficient“"/>. Это пересказ, в постах самого Spotify я такого не нашёл. Cursor называет роль «интегратора» как узкое место<b-proof href="https://cursor.com/blog/scaling-agents" quote="Cursor, 14.01.2026: роль integrator „created more bottlenecks than it solved“"/>.</b-why>
  <b-why align="left"><b-icon name="layers"/> **Эвристика автора: много релевантных гейтов.** Я заметил, что несколько гейтов, по одному на каждый риск (типы, тесты, линтер, проверка смысла), работают лучше одного большого. Это наблюдение; сравнения «один гейт и много» в источниках нет. Оно согласуется с найденным: Stripe чередует линтеры и CI, Sonar требует шесть условий сразу, Thoughtworks называет компиляторы, линтеры и тесты вместе. Оно не отменяет пределов выше: у каждого гейта есть цена и лимит попыток, а слишком жёсткий гейт вредит, как судья у Spotify. Поэтому «релевантный» значит привязанный к риску, который без него дойдёт до пользователя.</b-why>
  <b-why align="left"><b-icon name="user"/> **Ревьюер привыкает.** За семь месяцев у 400 повторных ревьюеров доля одобрений выросла с 30,1% до 36,8%, очередь ревью замедлилась в 3,5 раза, а встроенных комментариев стало на 22% меньше ([arXiv 2606.22721](https://arxiv.org/abs/2606.22721), 11 429 ревью). По Faros AI, у более чем 10 000 разработчиков при использовании ИИ размер PR вырос на 154%, а время ревью на 91% ([Faros AI](https://www.faros.ai/blog/ai-software-engineering), 23 июля 2025).</b-why>
  <b-why align="left"><b-icon name="eye-wide"/> **Датчики не видят смысла.** Бёклер отмечает, что датчики ненадёжно ловят ошибочный диагноз, лишнюю сложность и неверно понятое задание. Гейт отвечает за то, что записано как правило, остальное остаётся за человеком.</b-why>
  <b-table>

| Опасность | Защита |
|---|---|
| Агент правит или обходит тесты | тесты и сам гейт — только чтение; отметку «прошло» ставит только программа проверки |
| Подгонка под тест | второй слой: проверяющий агент по смыслу и случайные проверки |
| Агент прячет намерение | следить за рассуждениями, но не обучать агента против них |
| Гейт вечно красный | лимит попыток, потом передача человеку |
| Гейт блокирует верное | смотреть, какой процент отказов ошибочен, и ослаблять правило |
| Ревьюер привык | показывать человеку только случаи «не уверена» и риск |

  </b-table>
  <b-finding>
    <ex>Гейт запустил тесты, агент отключил два нестабильных и получил зелёный результат. Проверка «число тестов не упало» поймала подмену.</ex>
    <gen>Каждый гейт нужно проверять на обход так же, как проверяют код: что агент может изменить, чтобы пройти, не сделав работу.</gen>
    <do>Закройте агенту запись в тесты и в конфигурацию гейта, а лимит попыток запишите в сам гейт.</do>
  </b-finding>
</b-chapter>

<b-chapter id="start" icon="flag" title="Как начать: пять шагов и готовые запросы агенту">
  <b-why align="left">Начните с одного контекста и одной задачи. Каждый шаг ниже закрывает один пункт раздела про пределы. Запросы можно отдавать агенту как есть, подставив свой проект.</b-why>
  <b-subhead>1. Запишите «готово» файлом</b-subhead>
  <b-prompt>
    Составь файл acceptance.json со списком проверяемых критериев «готово» для задачи [описание].
    Каждый критерий: id, текст, команда проверки и поле passes со значением false.
    Правила: поле passes меняет только скрипт проверки, критерии не удаляются и не редактируются без моего подтверждения.
  </b-prompt>
  <b-subhead>2. Поставьте остановочный гейт</b-subhead>
  <b-prompt>
    Настрой хук остановки Claude Code в .claude/settings.json: перед завершением хода запускай скрипт проверки,
    который выполняет команды из acceptance.json и обновляет passes. Если хоть один критерий красный,
    блокируй завершение и возвращай агенту текст ошибки. Проверяй флаг stop_hook_active, чтобы не зациклиться.
    После трёх красных попыток подряд завершай ход и пиши мне, что именно не проходит.
  </b-prompt>
  <b-subhead>3. Закройте обходы</b-subhead>
  <b-prompt>
    Запрети агенту писать в каталог tests, в acceptance.json и в .claude. Добавь проверку «число тестов не уменьшилось
    и ни один тест не помечен как пропущенный».
  </b-prompt>
  <b-subhead>4. Добавьте проверяющего по смыслу</b-subhead>
  <b-prompt>
    Заведи отдельного проверяющего подагента с доступом только на чтение. Он сравнивает итоговую правку с исходным заданием
    и по каждому критерию из списка [перечень] ставит оценку 0–5. Ниже 4 по любому критерию — правка не принята.
    Вердикт: принято, не принято с причиной или не уверен.
  </b-prompt>
  <b-subhead>5. Сузьте набор функций MCP</b-subhead>
  <b-prompt>
    Выпиши функции MCP, которыми агент пользовался в этом контексте за последний месяц. Оставь только их в настройках
    подагента этого контекста, остальное отключи. Покажи, сколько токенов освободилось.
  </b-prompt>
  <b-why align="left">Дальше работает петля: каждую ошибку, которую гейт пропустил, превращают в новую проверку. Это общий принцип из статьи [«Harness engineering на практике»](/blog/harness-driven-development/), гейт здесь его частный случай. И заведите журнал вердиктов: сколько шагов агент прошёл без человека до гейта и после. Это та самая метрика автономности, которой не хватает исследованиям.</b-why>
  <b-finding>
    <ex>Пять шагов дают гейт, который записан в файле, запускается хуком, не даёт обойти тесты, смотрит смысл и стоит на узком наборе функций.</ex>
    <gen>Первый гейт не обязан быть умным. Достаточно, чтобы агент не мог сказать «готово» сам и чтобы проверка стояла вне него.</gen>
    <do>Сделайте шаги 1 и 2 для одной задачи сегодня. Остальные добавляйте по мере того, как гейт будет пропускать ошибки.</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Частые вопросы">
  <b-faq-cards>
    <q t="Что такое quality gates для ИИ-агентов?">Точка, где работа агента останавливается, пока независимая проверка не ответит «принято». Агент сам «готово» не ставит: ответ даёт машина, проверяющий агент или человек.</q>
    <q t="Чем гейт отличается от теста?">Тест проверяет одно правило и возвращает результат. Гейт решает, можно ли работе идти дальше, собирает в одно решение тесты, проверяющего агента и человека и умеет остановить агента.</q>
    <q t="Увеличивают ли гейты время автономной работы агента?">Прямых измерений нет. Есть арифметика: при 95% успеха на шаг 20 шагов проходят без ошибки в 36% случаев, а гейт, который ловит 4 из 5 ошибок, поднимает это примерно до 82%. И есть кейсы Anthropic, Stripe и Spotify.</q>
    <q t="Где ставить гейт?">Вне агента и вне его контекста, в хуке клиента или в правах сервера за MCP. Сам агент работает в небольшом ограниченном контексте: там проверка конечна, правка небольшая, а набор функций MCP узкий. Правило в тексте инструкции остаётся только советом.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Дальше по теме">
  <b-links>
    <item href="/blog/harness-driven-development/" k="Харнесс" t="Harness engineering на практике">направляющие, датчики и петля «ошибка — правило»</item>
    <item href="/blog/agent-checkpoint/" k="Проверка" t="Где ставить проверку работы агента">граница агрегата и теорема Райса</item>
    <item href="/blog/agents-per-bounded-context/" k="Агенты" t="Сколько нужно ИИ-агентов">один агент на один ограниченный контекст</item>
    <item href="/blog/mcp-agent-access/" k="MCP" t="MCP для ИИ-агента">какую проблему решает и как подключить</item>
    <item href="/blog/mcp-scopes/" k="MCP" t="Области MCP в Claude Code">local, project и user</item>
    <item href="/blog/ai-agent-maturity-levels/" k="Зрелость" t="Уровни зрелости работы с ИИ-агентами">от чата к спекам, скиллам, коду и системе</item>
  </b-links>
</b-chapter>
<b-footer>Факты: на 14 ноября 2026, по первоисточникам, указанным значками ↗ и ссылками в тексте. Расчёт на схеме про автономность — мой, с допущением независимых шагов. Пример с бронью условный. Цитаты про судью Spotify и его удаление — из пересказа InfoQ.</b-footer>
</b-post>
