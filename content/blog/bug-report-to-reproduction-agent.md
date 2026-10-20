---
title: Работа QA после поддержки с ИИ-агентом: исследование, описание и документирование через MCP и скиллы
date: 2026-10-04
description: Оптимизируем один шаг цепочки: QA после поддержки. Агент через MCP воспроизводит баг из Jira на тестовом стенде, сжимает путь, описывает и документирует, скилл делает шаги повторяемым процессом, QA проверяет руками. Поддержка и разработка не меняются.
tags: AI, агенты, QA, Jira, MCP, скиллы, баги, харнесс
category: harness
layout: wide
mentions: Jira, AI agent, QA, Model Context Protocol, skills, bug reproduction, sequence diagram, C4 model, human-in-the-loop
toc: route=Шаг QA | stages=Три части | mcp=MCP | skill=Скилл | parallel=Параллельно | example=Пример | human=Что у QA | first=Как начать | next=Дальше по теме
---

Баг от клиента проходит поддержку и попадает к QA. Здесь вручную исследуют, описывают и документируют, поэтому оптимизируем именно этот шаг. Агент с подключением к Jira и тестовому стенду через MCP и скилл с записанными шагами берут рутину на себя. QA проверяет результат руками. Поддержка и разработка работают как раньше.

<b-post series="harness">
<b-view-toggle/>

<b-chapter id="route" icon="stairs" title="Оптимизируем один шаг: QA после поддержки">
  <b-view kind="pic">
    <b-art-plain name="bug-report-to-reproduction-agent/qa-step"/>
  </b-view>
  <b-view kind="struct">
    <b-lane title="Было" color="muted">
      <b-qa-route>
        <node icon="user" t="клиент">пишет</node>
        <node icon="user" t="поддержка">принимает</node>
        <node kind="solo" t="QA" chips="исследует|описывает|документирует" time="время QA на задачу" bar="выполнение задач">выполняет сам</node>
        <node icon="user" t="разработчик">чинит</node>
      </b-qa-route>
    </b-lane>
    <b-lane title="Стало" color="accent" top="12">
      <b-qa-route>
        <node icon="user" t="клиент">пишет</node>
        <node icon="user" t="поддержка">принимает</node>
        <node kind="pair" t="QA" frame="в паре" tools="monitor:Claude in Chrome|flask:Код и тесты, PoC|code:API" n="× N" time="время QA на задачу" bar="приёмка|управление агентами">приёмка</node>
        <node icon="user" t="разработчик">чинит</node>
      </b-qa-route>
    </b-lane>
    <b-cap>Масштаб условный, не замер.</b-cap>
  </b-view>
  <b-finding>
    <ex>Меняется только шаг QA: раньше всё время уходило на выполнение задач, теперь агенты выполняют, а QA принимает результат и управляет агентами.</ex>
    <gen>Агентов можно запускать много, время QA на одну задачу падает.</gen>
    <do>Засеките минуты QA на один баг.</do>
  </b-finding>
</b-chapter>

<b-chapter id="stages" icon="lines" title="Три части работы QA и что с ними происходит">
  <b-view kind="pic">
    <b-lane-stack>
    <b-icon-lane icon="search-alt" title="Исследование">
      <b-art-plain name="bug-report-to-reproduction-agent/investigation"/>
    </b-icon-lane>
    <b-icon-lane icon="lines" title="Описание">
      <b-art-plain name="bug-report-to-reproduction-agent/description"/>
    </b-icon-lane>
    <b-icon-lane icon="file-text" title="Документирование">
      <b-art-plain name="bug-report-to-reproduction-agent/documentation"/>
    </b-icon-lane>
    </b-lane-stack>
  </b-view>
  <b-view kind="struct">
    <b-lane-stack>
    <b-icon-lane icon="search-alt" title="Исследование">
      <b-qa-row label="Было">
        <node icon="user">QA</node>
        <node icon="refresh-cw">повтор</node>
        <node icon="scissors">убрать лишнее</node>
        <node icon="target">причина</node>
      </b-qa-row>
      <b-qa-row label="Стало" now>
        <node icon="bot">Агент</node>
        <node icon="play">путь на стенде</node>
        <node icon="scissors">сжатие</node>
        <node icon="eye">QA смотрит</node>
      </b-qa-row>
    </b-icon-lane>
    <b-icon-lane icon="lines" title="Описание">
      <b-qa-row label="Было">
        <node icon="user">QA</node>
        <node icon="lines">шаги</node>
        <node icon="file-text">ожидалось / факт</node>
        <node icon="doc-lines">свой стиль</node>
      </b-qa-row>
      <b-qa-row label="Стало" now>
        <node icon="bot">Агент</node>
        <node icon="table">шаблон</node>
        <node icon="workflow">sequence · C4</node>
      </b-qa-row>
    </b-icon-lane>
    <b-icon-lane icon="file-text" title="Документирование">
      <b-qa-row label="Было">
        <node icon="user">QA</node>
        <node icon="image">скриншоты</node>
        <node icon="link">ссылки</node>
        <node icon="doc-lines">поля Jira</node>
      </b-qa-row>
      <b-qa-row label="Стало" now>
        <node icon="bot">Агент</node>
        <node icon="plug">MCP</node>
        <node icon="lines">Jira</node>
        <node icon="pencil">QA правит спорное</node>
      </b-qa-row>
    </b-icon-lane>
    </b-lane-stack>
    <b-agents-lane title="Один QA — несколько агентов сразу" agents="агент · PAY-142|агент · PAY-143|агент · PAY-144" note="время QA уходит на управление и приёмку" top="10">Каждая из трёх частей идёт у агента по каждому багу отдельно, а QA запускает их сразу несколько.</b-agents-lane>
  </b-view>
  <b-finding>
    <ex>Исследование, описание и документирование идут подряд и проходят через агента. У QA остаётся проверка итога и спорные места.</ex>
    <gen>Все три части — повторяемые действия с понятным результатом, поэтому их можно записать и отдать. Решение «это баг или нет, и насколько он важен» остаётся за человеком.</gen>
    <do>Разделите свою работу над багом на эти три части и отметьте, какая отнимает больше всего времени.</do>
  </b-finding>
</b-chapter>

<b-chapter id="mcp" icon="plug" title="MCP: агент работает там же, где работает QA">
  <b-why>MCP (Model Context Protocol) — способ подключить агента к рабочим системам, чтобы он читал и писал в них сам, а не получал пересказ.</b-why>
  <b-view kind="pic">
    <b-art-plain name="bug-report-to-reproduction-agent/access-sandbox"/>
  </b-view>
  <b-view kind="struct">
    <b-node-grid>
      <node icon="lines" sw="1.8" t="Jira">читает задачу, пишет отчёт</node>
      <node icon="play" t="Стенд">проходит путь как пользователь</node>
      <node icon="file-text" sw="1.8" t="Документы">схемы и описания рядом с задачей</node>
      <node icon="cylinder" t="Данные">тестовые, можно сбросить</node>
      <node icon="shield-check" t="Права">ломать можно только стенд</node>
    </b-node-grid>
  </b-view>
  <b-finding>
    <ex>Через MCP агент читает PAY-142 в Jira, идёт на тестовый стенд, пишет туда же результат. QA не копирует ничего между окнами.</ex>
    <gen>Без подключения к системам агенту приходится давать пересказ, а пересказ теряет детали. Тестовый стенд нужен как место, где агент может пробовать и ломать, не задевая прод.</gen>
    <do>Начните с двух подключений: Jira и тестовый стенд. Остальное добавляйте по мере надобности.</do>
  </b-finding>
</b-chapter>

<b-chapter id="skill" icon="doc-square" title="Скилл: записанный процесс вместо повторения руками">
  <b-why>Скилл — записанный для агента способ работать: шаги, шаблон отчёта, правила. Его повторит другой человек и другой агент.</b-why>
  <b-view kind="pic">
    <b-art-plain name="bug-report-to-reproduction-agent/skill-pipeline"/>
  </b-view>
  <b-view kind="struct">
    <b-lane title="Скилл «воспроизвести баг»" color="accent">
      <b-num-chain top="6">
        <step>прочитать задачу</step>
        <step>пройти критический путь на стенде</step>
        <step>сжать до минимума</step>
      </b-num-chain>
      <b-num-chain start="4" top="10">
        <step>описать по шаблону</step>
        <step>схемы по запросу</step>
        <step>записать в Jira</step>
      </b-num-chain>
    </b-lane>
    <b-agents-lane title="Один QA — несколько агентов сразу" agents="агент · PAY-142|агент · PAY-143|агент · PAY-144" note="время QA уходит на управление и приёмку" top="10">Скилл один, запусков много: по агенту на каждый баг. Записанный процесс не требует, чтобы QA повторял его сам.</b-agents-lane>
    <b-chiprow top="12">
      <chip>одни шаги каждый раз</chip>
      <chip>единый шаблон отчёта</chip>
      <chip>передаётся коллегам</chip>
      <chip>дорабатывается по ошибкам</chip>
    </b-chiprow>
  </b-view>
  <b-finding>
    <ex>Шесть шагов записаны один раз. Любой QA запускает скилл на новой задаче и получает отчёт в том же формате.</ex>
    <gen>Скилл превращает «как я обычно делаю» в процесс, который не зависит от того, кто сегодня на смене. Ошибка агента попадает в скилл как новое правило, и в следующий раз её нет.</gen>
    <do>Запишите свои шаги над одним типом багов как скилл и прогоните на трёх закрытых задачах.</do>
  </b-finding>
</b-chapter>

<b-chapter id="parallel" icon="grid-alt" title="Один QA — несколько агентов: время уходит на управление и приёмку">
  <b-why>Воспроизводить баги можно разными каналами, и каждый агент берёт свой.</b-why>
  <b-view kind="pic">
    <b-art-plain name="bug-report-to-reproduction-agent/parallel"/>
  </b-view>
  <b-view kind="struct">
    <b-node-grid min="170">
      <node icon="monitor" t="Claude in Chrome">проходит путь в браузере</node>
      <node icon="flask" t="Код и тесты">локальный запуск, PoC без браузера</node>
      <node icon="code" t="API">вызывает запросы напрямую</node>
    </b-node-grid>
    <b-art-plain name="bug-report-to-reproduction-agent/qa-time"/>
    <b-cap>Схема принципа, масштаб условный, не замер.</b-cap>
  </b-view>
  <b-finding>
    <ex>QA запускает агентов на PAY-142, PAY-143 и PAY-144 сразу. Пока они работают, QA не сидит над одним багом, а по очереди проверяет готовые результаты.</ex>
    <gen>Раньше время QA складывалось из всех багов подряд. Теперь за каждый баг отвечает свой агент: браузерный, по коду или через API, а у QA остаётся только короткая проверка. Чем больше агентов запущено, тем больше времени QA уходит на управление ими и проверку, а не на рутину.</gen>
    <do>Наращивайте число агентов постепенно: оно упирается в число стендов, тестовых данных и лимитов. Время, которое QA больше не тратит на рутину, направляйте на управление агентами, проверку и доработку скилла.</do>
  </b-finding>
</b-chapter>

<b-chapter id="example" icon="chat-square" title="Пример: PAY-142 от задачи до отчёта">
  <b-view kind="pic">
    <b-art-plain name="bug-report-to-reproduction-agent/complaint-to-report"/>
  </b-view>
  <b-lane title="Задача в Jira · обращение клиента, переданное поддержкой в QA" color="accent">
    <b-ticket key="PAY-142">Не проходит оплата картой, если ввести промокод</b-ticket>
    <b-chiprow start top="10">
      <chip>от клиента</chip>
      <chip>передана поддержкой</chip>
      <chip>без шагов</chip>
      <chip>скриншот ошибки</chip>
    </b-chiprow>
  </b-lane>
  <b-lane title="Исследование: было 6 действий → осталось 3" color="accent" top="10">
    <b-chiprow start>
      <chip kind="del">вход</chip>
      <chip kind="del">каталог</chip>
      <chip kind="del">адрес</chip>
      <chip kind="on">корзина</chip>
      <chip kind="on">промокод</chip>
      <chip kind="on">оплата картой</chip>
      Сжатие: агент по одному убирает действия и после каждого проверяет, воспроизводится ли баг. Без чего баг остаётся, то вычёркивается.
    </b-chiprow>
  </b-lane>
  <b-lane title="Схема по запросу · sequence" color="accent" top="10">
    <b-art-plain name="bug-report-to-reproduction-agent/promo-sequence"/>
  </b-lane>
  <b-lane title="Описание и запись в Jira · комментарий к PAY-142" color="accent" top="10">
    <b-kv-rows>
      <row k="Шаги">корзина → промокод → оплата картой</row>
      <row k="Ожидалось">платёж проходит со скидкой</row>
      <row k="Получилось">«платёж не прошёл», у сервиса промокодов ошибка 500</row>
      <row k="Окружение">тестовый стенд, тестовая карта</row>
      <row k="Где искать">вызов сервиса промокодов из оплаты (см. схему)</row>
    </b-kv-rows>
  </b-lane>
  <b-view kind="struct">
    <b-agents-lane title="Один QA — несколько агентов сразу" agents="агент · PAY-142|агент · PAY-143|агент · PAY-144" note="время QA уходит на управление и приёмку" top="10">Пока агент разбирает PAY-142, другие агенты берут PAY-143 и PAY-144, а QA проверяет то, что уже готово.</b-agents-lane>
  </b-view>
  <b-cap>Задача и все названия выдуманы для примера.</b-cap>
  <b-finding>
    <ex>Из одной строки клиента получились короткий путь из трёх действий, схема и готовый отчёт в Jira. QA сам этого не делал, он смотрит результат.</ex>
    <gen>Каждая из трёх частей работы QA оставила видимый след: сжатый путь, схему, запись. Так результат можно проверить за минуты, а не восстанавливать по памяти.</gen>
    <do>Попросите агента показать сжатый путь и запись: по ним сразу видно, пошёл ли он не туда.</do>
  </b-finding>
</b-chapter>

<b-chapter id="human" icon="eye" title="Что остаётся у QA">
  <b-view kind="pic">
    <b-art-plain name="bug-report-to-reproduction-agent/acceptance-gate"/>
  </b-view>
  <b-view kind="struct">
    <b-node-grid>
      <node icon="check" t="Тот ли путь">проходит шаги руками на стенде</node>
      <node icon="check" t="Та ли ошибка">совпадает со скриншотом клиента</node>
      <node icon="check" t="Верно ли сжато">вычеркнутое действительно лишнее</node>
      <node icon="check" t="Насколько важно">серьёзность и приоритет решает человек</node>
      <node icon="check" t="Улучшает скилл">ошибка агента → новое правило</node>
    </b-node-grid>
    <b-agents-lane title="Один QA — несколько агентов сразу" agents="агент · PAY-142|агент · PAY-143|агент · PAY-144" note="время QA уходит на управление и приёмку" top="10">Время, которое QA больше не тратит на рутину по каждому багу, уходит на управление агентами, проверку, приоритеты и улучшение скилла.</b-agents-lane>
  </b-view>
  <b-finding>
    <ex>QA открывает стенд, повторяет шаги из отчёта сам и подтверждает, что баг тот, о котором писал клиент. Потом задача уходит разработчику как раньше; если не получилось, отчёт возвращается агенту.</ex>
    <gen>Модель охотно подтверждает саму себя, а выдуманное выглядит как найденное. Поэтому последнее слово остаётся за человеком, который смотрит глазами. Работа QA смещается от выполнения рутины к проверке и улучшению процесса.</gen>
    <do>Договоритесь: отчёт, который QA не смог повторить руками, не уходит разработчику.</do>
  </b-finding>
</b-chapter>

<b-chapter id="first" icon="shield-check" title="Как начать">
  <b-view kind="pic">
    <b-art-plain name="bug-report-to-reproduction-agent/start-steps"/>
  </b-view>
  <b-view kind="struct">
    <b-num-chain>
      <step>подключить Jira и стенд через MCP</step>
      <step>записать шаги QA как скилл</step>
      <step>прогнать на 5 закрытых багах и дописать правила</step>
    </b-num-chain>
  </b-view>
  <b-finding>
    <ex>На закрытых багах ответ известен, поэтому видно, где агент или скилл ошибся.</ex>
    <gen>Новый сценарий безопаснее запускать на задачах с известным результатом, а каждую ошибку превращать в правило скилла.</gen>
    <do>Начните с пяти багов за прошлый месяц и одного QA, который проверяет результат руками.</do>
  </b-finding>
</b-chapter>

<b-chapter id="next" icon="arrow-right" title="Дальше по теме">
  <b-links>
    <item href="/blog/specs-rules-skills/" k="Скиллы" t="Спеки, правила и скиллы">что агент должен знать о проекте</item>
    <item href="/blog/harness-driven-development/" k="Петля ошибок" t="Harness-Driven Development">как ошибки агента становятся правилами</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="Среда" t="Сравнение харнессов">где работает агент и что он видит</item>
  </b-links>
</b-chapter>
<b-footer>Задача PAY-142 и схема выдуманы для примера.</b-footer>
</b-post>
