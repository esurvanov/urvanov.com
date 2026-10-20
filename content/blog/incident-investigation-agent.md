---
title: Расследование инцидента с ИИ-агентом: Sentry и Grafana через MCP
date: 2026-10-05
description: Как расследовать инцидент с ИИ-агентом: подключить Sentry и Grafana через MCP, поручить сопоставить ошибки, метрики и время релиза, ограничить права и проверить гипотезу.
tags: AI, агенты, MCP, Sentry, Grafana, инциденты, харнесс
category: harness
layout: wide
mentions: MCP, Model Context Protocol, Sentry, Grafana, incident investigation, observability, Claude Code
toc: flow=Как идёт расследование | connect=Подключение | timeline=Что сопоставляет агент | rights=Права и риски | first=С чего начать | next=Дальше по теме
---

При инциденте человек прыгает между Sentry, Grafana и чатом и склеивает картину сам. Агент с доступом к обеим системам собирает ошибки, метрики и время событий в один черновик, а человек проверяет гипотезу и решает, что делать. Ниже: как это идёт, как подключить Sentry и Grafana, какие права выдавать. Основа — в статье [MCP для ИИ-агента](/blog/mcp-agent-access/).

<b-post series="harness">

<b-chapter id="flow" icon="bug" title="Как идёт расследование">
  <iso-art name="incident-investigation-agent/before-after"></iso-art>
  <b-finding>
    <ex>Агент читает ошибки в Sentry и графики в Grafana, человек получает один черновик расследования.</ex>
    <gen>Sentry и Grafana подключаются через MCP на чтение, поэтому агент ничего не меняет без вашего разрешения. Гипотезу проверяет человек.</gen>
    <do>Выпишите, в каких системах вы искали причину в последнем инциденте.</do>
  </b-finding>
</b-chapter>

<b-chapter id="connect" icon="plug" title="Как подключить Sentry и Grafana">
  <b-say-agent title="Скажите агенту">Подключи Sentry и Grafana только на чтение. Найди в Sentry новые ошибки по сервису оплаты за последний час, найди в Grafana, когда вырос процент ответов 5xx, и сопоставь со временем релиза. Предложи гипотезу и укажи источник каждого факта.</b-say-agent>
  <b-why align="left">Команды агент запустит сам, вам останется войти в Sentry через браузер и выдать токен Grafana. [Если агент просит сделать это вас](/blog/agent-hands-work-back-to-you/).</b-why>
  <b-spoiler summary="Как это делается руками">
    <iso-art name="incident-investigation-agent/setup-steps"></iso-art>

#### Sentry

    <b-codebox copy>
      claude mcp add --transport http sentry https://mcp.sentry.dev/mcp
      /mcp   # войти через браузер (OAuth)
    </b-codebox>

Вход через OAuth, токены хранятся и обновляются автоматически.

#### Grafana

    <b-codebox copy>
      claude mcp add --transport stdio \
        --env GRAFANA_URL=https://myinstance.grafana.net \
        --env GRAFANA_SERVICE_ACCOUNT_TOKEN=$GRAFANA_TOKEN \
        grafana -- uvx mcp-grafana --disable-write
    </b-codebox>

Это официальный сервер <a href="https://github.com/grafana/mcp-grafana" target="_blank" rel="noopener">grafana/mcp-grafana</a>. Токен берут у сервисного аккаунта с минимальными правами, флаг --disable-write запрещает изменения.

  </b-spoiler>
  <b-finding>
    <ex>Агент подключает обе системы, находит ошибки и график, сопоставляет их с релизом и называет источники.</ex>
    <gen>Обе системы подключаются командой, а доступ на чтение держит расследование безопасным.</gen>
    <do>Поручите подключение агенту и сверьте его вывод с тем, что видите в Sentry и Grafana сами.</do>
  </b-finding>
</b-chapter>

<b-chapter id="timeline" icon="lines" title="Что сопоставляет агент">
  <iso-art name="incident-investigation-agent/event-timeline"></iso-art>
  <b-finding>
    <ex>Релиз, рост ошибок и алерт ставятся на одну ось времени, и видно, что произошло раньше.</ex>
    <gen>Совпадение по времени даёт гипотезу и не доказывает причину: проверка остаётся за человеком.</gen>
    <do>Просите приложить к каждому выводу ссылку на график или событие.</do>
  </b-finding>
</b-chapter>

<b-chapter id="rights" icon="shield-check" title="Права и риски">
  <iso-art name="incident-investigation-agent/rights-ladder"></iso-art>
  <b-rules sw="1.8">
    <rule icon="key" t="Токен">Сервисный аккаунт Grafana с минимальными правами, значение лежит в переменной окружения.</rule>
    <rule icon="lock" t="Только чтение">Флаг --disable-write запрещает изменения, в том числе создание инцидентов.</rule>
    <rule icon="ban" t="Чужой сервер">Подключайте только серверы, которым доверяете: серверы, читающие внешний текст, открывают путь для prompt injection.</rule>
  </b-rules>
  <b-finding>
    <ex>Агент читает ошибки и графики, а менять что-либо в системах ему нельзя.</ex>
    <gen>Права выдаются по каждому источнику отдельно, а самые широкие остаются закрытыми.</gen>
    <do>Создайте сервисный аккаунт на чтение и подключите Grafana с флагом --disable-write.</do>
  </b-finding>
</b-chapter>

<b-chapter id="first" icon="flag" title="С чего начать">
  <iso-art name="incident-investigation-agent/start-steps"></iso-art>
  <b-finding>
    <ex>Три шага: Sentry, Grafana, проверка на прошлом инциденте.</ex>
    <gen>Прошлый инцидент знаком вам, поэтому видно, где агент нашёл причину, а где ошибся.</gen>
    <do>Возьмите закрытый инцидент и попросите агента найти причину по Sentry и Grafana.</do>
  </b-finding>
</b-chapter>

<b-chapter id="next" title="Дальше по теме">
  <b-links>
    <item href="/blog/mcp-agent-access/" k="Основа" t="MCP для ИИ-агента: какую проблему решает и как поручить подключение агенту">Что такое MCP и как подключить</item>
    <item href="/blog/analytics-reports-agent/" k="Другой кейс" t="Аналитические отчёты с ИИ-агентом: данные из базы, таблицы и документы через MCP">База, таблицы и документы через MCP</item>
    <item href="/blog/mcp-scopes/" k="Настройка" t="Области MCP в Claude Code: local, project и user — где хранится сервер и кто его видит">Где хранится сервер и кто его видит</item>
  </b-links>
</b-chapter>
<b-footer>Инцидент выдуман. Подключение Sentry — по документации Claude Code: <a href="https://code.claude.com/docs/en/mcp" target="_blank" rel="noopener">MCP</a>, Grafana — по репозиторию <a href="https://github.com/grafana/mcp-grafana" target="_blank" rel="noopener">grafana/mcp-grafana</a>.</b-footer>
</b-post>
