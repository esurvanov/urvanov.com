---
title: Аналитические отчёты с ИИ-агентом: данные из базы, таблицы и документы через MCP
date: 2026-10-05
description: Как собрать аналитический отчёт с ИИ-агентом: подключить базу на чтение через MCP, поручить запросы и сводку, проверить одно число руками и выдать права по каждому источнику.
tags: AI, агенты, MCP, аналитика, отчёты, база данных, харнесс
category: harness
layout: wide
mentions: MCP, Model Context Protocol, analytics, reports, SQL, database, Claude Code, permissions
toc: flow=Как собирается отчёт | access=Источники и права | connect=Подключение | verify=Проверка | first=С чего начать | next=Дальше по теме
---

Отчёт руками — это выгрузка из базы, таблица, график и текст, и каждый шаг ждёт человека. Агент с доступом к источникам проходит цепочку сам, а человек проверяет цифры и решает, что делать дальше. Ниже: как это выглядит, какие права выдавать на каждый источник, как подключить базу и проверить результат. Основа — в статье [MCP для ИИ-агента](/blog/mcp-agent-access/).

<b-post series="harness">

<b-chapter id="flow" icon="grid-alt" title="Как собирается отчёт">
  <iso-art name="analytics-reports-agent/before-after"></iso-art>
  <b-finding>
    <ex>Руками человек переносит данные между базой, таблицей, графиком и текстом. С агентом он получает готовый черновик и проверяет цифры.</ex>
    <gen>Источники подключаются к агенту через MCP. Каждый шаг цепочки повторяется и даёт понятный результат, поэтому его отдают агенту. Что значат цифры, решает человек.</gen>
    <do>Выпишите шаги вашего последнего отчёта и отметьте, какие из них копирование.</do>
  </b-finding>
</b-chapter>

<b-chapter id="access" icon="lock" title="Источники и права">
  <b-why>Системы, данные и документы вне диалога. Права задаются отдельно на каждый источник.</b-why>
  <iso-art name="analytics-reports-agent/source-rights"></iso-art>
  <b-finding>
    <ex>Jira, документы и база открыты на чтение, таблица на запись с подтверждением, ломать можно только стенд.</ex>
    <gen>Агент видит ровно то, что ему подключили, и делает ровно то, что разрешено.</gen>
    <do>Для каждого источника выпишите одно слово: чтение, запись или только стенд.</do>
  </b-finding>
</b-chapter>

<b-chapter id="connect" icon="plug" title="Как подключить базу">
  <b-say-agent title="Скажите агенту">Подключи базу аналитики только на чтение. Покажи схему таблицы orders и посчитай выручку за этот месяц. Покажи запрос, которым считал.</b-say-agent>
  <b-why align="left">Команду подключения агент запустит сам. [Если агент просит сделать это вас](/blog/agent-hands-work-back-to-you/).</b-why>
  <b-spoiler summary="Как это делается руками">
    <iso-art name="analytics-reports-agent/setup-steps"></iso-art>
    <b-codebox copy>
      claude mcp add --transport stdio db -- npx -y @bytebase/dbhub \
        --dsn "postgresql://readonly:pass@prod.db.com:5432/analytics"
    </b-codebox>

Пользователя создайте только на чтение: тогда запросы агента не смогут ничего изменить. Примеры запросов из документации: «What’s our total revenue this month?», «Show me the schema for the orders table».

  </b-spoiler>
  <b-finding>
    <ex>Агент подключает базу, смотрит схему, считает выручку и показывает запрос.</ex>
    <gen>Права на чтение держат запросы безопасными: изменить данные агент не может.</gen>
    <do>Заведите пользователя базы на чтение и подключите его первым.</do>
  </b-finding>
</b-chapter>

<b-chapter id="verify" icon="shield-check" title="Как проверить отчёт">
  <iso-art name="analytics-reports-agent/check-number"></iso-art>
  <b-finding>
    <ex>Агент показывает запрос и результат, человек пересчитывает одно число другим способом.</ex>
    <gen>Модель считает запросом, а запрос можно перечитать. Совпавшее число повышает доверие к остальным.</gen>
    <do>Проверьте одно число из отчёта вручную, прежде чем отправлять отчёт дальше.</do>
  </b-finding>
</b-chapter>

<b-chapter id="first" icon="flag" title="С чего начать">
  <iso-art name="analytics-reports-agent/start-steps"></iso-art>
  <b-finding>
    <ex>Три шага: база на чтение, один отчёт, сверка числа.</ex>
    <gen>Начните с отчёта, цифры которого вы уже знаете: так видно, где агент ошибся.</gen>
    <do>Сегодня заведите пользователя на чтение и попросите агента посчитать знакомый показатель.</do>
  </b-finding>
</b-chapter>

<b-chapter id="next" title="Дальше по теме">
  <b-links>
    <item href="/blog/mcp-agent-access/" k="Основа" t="MCP для ИИ-агента: какую проблему решает и как поручить подключение агенту">Что такое MCP и как подключить</item>
    <item href="/blog/incident-investigation-agent/" k="Другой кейс" t="Расследование инцидента с ИИ-агентом: Sentry и Grafana через MCP">Sentry и Grafana через MCP</item>
    <item href="/blog/work-prompts-examples/" k="Практика" t="Промпты для рабочих задач: пять частей и шесть примеров для ChatGPT и Claude">Пример «Разбор таблицы»</item>
  </b-links>
</b-chapter>
<b-footer>Пример выдуман. Команда подключения базы и совет про пользователя на чтение — по документации Claude Code: <a href="https://code.claude.com/docs/en/mcp" target="_blank" rel="noopener">Connect Claude Code to tools via MCP</a>.</b-footer>
</b-post>
