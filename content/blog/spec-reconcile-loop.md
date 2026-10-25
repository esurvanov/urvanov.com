---
title: Петля сверки для спек: как в Kubernetes, только желаемое — спека, а фактическое — код
date: 2026-09-28
updated: 2026-10-20
description: Spec-driven development с петлёй сверки: кто меняет желаемое, а кто приводит к нему код, почему зелёные тесты ещё не значат «верно» и какие шесть возможностей среды нужны агенту, чтобы петля замкнулась.
tags: AI, spec-driven development, спеки, Kubernetes, харнесс
category: specs
layout: wide
image: /og/spec-reconcile-loop.png
mentions: Kubernetes, reconcile loop, human-in-the-loop, Model Context Protocol, Spec-Driven Development
toc: k8s=Как в Kubernetes | sensors=Предел замеров | env=Среда | next=Дальше по теме
---

<b-post series="rec">
<b-hchain label="Цепочка петли сверки: желаемое — спека, исполнитель — агент, фактическое — код, замер — тесты">
  <step icon="book" t="Желаемое">спека</step>
  <step icon="bot" t="Исполнитель">агент</step>
  <step icon="code-slash" t="Фактическое">код</step>
  <step icon="gauge" sw="1.8" t="Замер">тесты</step>
</b-hchain>
<b-chapter id="k8s" title="Та же петля, что в Kubernetes" icon="hub" sw="1.6">
  <b-why>Желаемое здесь — <a href="/blog/specs-by-aggregates/">словарь агрегатов</a>: одна запись на понятие, требования со словами MUST и SHOULD.</b-why>
  <b-k8s-loop label="Kubernetes: чарт, контроллер, ноды, пробы. Спеки: словарь, агент, код, тесты. Человек меняет только желаемое, исполнитель сверяет замер с желаемым по кругу." cols="желаемое | исполнитель | фактическое | замер" human="человек меняет желаемое" back="замер → исполнитель, по кругу">
    <b-k8s-row icon="hub" sw="1.6" t="Kubernetes">
      <cell on>чарт · манифест</cell>
      <cell>контроллер</cell>
      <cell>ноды · поды</cell>
      <cell>пробы · метрики</cell>
    </b-k8s-row>
    <b-k8s-row icon="book" t="Спеки">
      <cell on>словарь · MUST</cell>
      <cell hz>агент</cell>
      <cell>код</cell>
      <cell hz>тесты · качество</cell>
    </b-k8s-row>
  </b-k8s-loop>
  <b-cap>Петля сверки — по <a href="https://kubernetes.io/docs/concepts/architecture/controller/" target="_blank" rel="noopener">документации Kubernetes о контроллерах</a>.</b-cap>
  <b-finding>
    <ex>В Kubernetes человек правит чарт, а контроллер приводит ноды к нему. Здесь человек правит словарь, а агент приводит к нему код и проверяет тестами.</ex>
    <gen>Обе системы держат желаемое состояние отдельно от фактического и сверяют их по кругу. Человек в петле меняет только желаемое, поэтому любая его правка сразу превращается в работу исполнителя.</gen>
    <do>Правьте требование в словаре, а не код руками, и запускайте агента с задачей привести код к словарю.</do>
  </b-finding>
</b-chapter>
<b-chapter id="sensors" title="Замер видит только то, что в него заложено" icon="gauge">
  <b-why>Пример — бронь переговорной из статьи <a href="/blog/specs-by-aggregates/">Спеки по агрегатам</a>: три требования MUST и одно SHOULD.</b-why>
  <b-probe-check>
    <b-probe-panel icon="hub" sw="1.6" t="Kubernetes" verdict="проба зелёная, сервис не работает">
      <probe kind="ok">/healthz → 200</probe>
      <probe kind="no">очередь заказов стоит</probe>
    </b-probe-panel>
    <b-probe-panel icon="book" t="Спеки" verdict="тесты зелёные, одно MUST не проверено">
      <probe kind="ok" note="тест">MUST · не пересекаются</probe>
      <probe kind="ok" note="тест">MUST · только вперёд</probe>
      <probe kind="no" note="нет проверки">MUST · 15 мин → closed</probe>
      <probe kind="eye" note="ревью">SHOULD · канал</probe>
      <cov t="MUST покрыто" value="67">2 / 3</cov>
    </b-probe-panel>
    <rule>каждое MUST → своя проверка</rule>
    <rule>MUST без проверки = находка</rule>
    <rule>зелёный ≠ верный</rule>
  </b-probe-check>
  <b-cap>Какие пробы бывают и что они проверяют — <a href="https://kubernetes.io/docs/concepts/configuration/liveness-readiness-startup-probes/" target="_blank" rel="noopener">Kubernetes: probes</a>.</b-cap>
  <b-finding>
    <ex>Проба отвечает «200», хотя заказы стоят, а тесты брони зелёные, хотя правило про 15 минут никто не проверяет.</ex>
    <gen>Замер подтверждает только то, что в нём записано, и ничего не говорит об остальном. Поэтому карточку агрегата сверяют с проверками: MUST без проверки — это пробел, а не выполненное требование.</gen>
    <do>Пройдите по MUST своего словаря и пометьте, где нет теста. Каждую такую строку заведите задачей или понизьте до SHOULD осознанно.</do>
  </b-finding>
</b-chapter>
<b-chapter id="env" title="Среда решает, замкнётся ли петля" icon="terminal-screen">
  <b-env-caps>
    <side icon="hub" sw="1.6" t="кластер">среда контроллера</side>
    <side icon="terminal-screen" sw="1.8" t="харнесс">среда агента</side>
    <cap icon="play" t="Запуск кода">догадки вместо фактов</cap>
    <cap icon="flask" t="Тесты">MUST не проверить</cap>
    <cap icon="log-lines" t="Логи">не видно, что сломалось</cap>
    <cap icon="database" t="Тестовые данные">проверка на пустом</cap>
    <cap icon="plug" t="Сервисы через MCP">интеграции вслепую</cap>
    <cap icon="shield-check" t="Песочница и права">страшно дать действовать</cap>
  </b-env-caps>
  <b-cta href="/blog/ai-in-code-harness-and-tools/" k="Отдельная статья" t="Как выбрать среду: сравнение харнессов" icon="terminal-screen" sw="1.8">Claude Code, Codex, Cursor, Hermes и чат на одной карте</b-cta>
  <b-finding>
    <ex>Контроллер Kubernetes работает, потому что кластер даёт ему API, ноды и пробы. Агенту для той же петли нужны запуск кода, тесты, логи, данные, сервисы и песочница.</ex>
    <gen>Словарь задаёт желаемое, но сверить с ним код может только тот, кто умеет код запускать и измерять. Чего нет в среде, того агент не проверит, и петля в этом месте разомкнута.</gen>
    <do>Отметьте, какие из шести возможностей есть у вашего агента. Для каждой отсутствующей решите: добавить её в харнесс или сменить харнесс.</do>
  </b-finding>
</b-chapter>
<b-chapter id="next" title="Дальше по теме">
  <b-links cols="3">
    <item href="/blog/specs-by-aggregates/" k="Желаемое" t="Спеки по агрегатам">словарь, RFC-требования и контексты</item>
    <item href="/blog/harness-driven-development/" k="Петля ошибок" t="Harness-Driven Development">как ошибки агента становятся правилами</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="Среда" t="Сравнение харнессов">где работает агент и что он видит</item>
  </b-links>
</b-chapter>
<b-footer compact>Пример с бронированием выдуман. Термины и подходы — по источникам в подписях под схемами.</b-footer>
</b-post>
