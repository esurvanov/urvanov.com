---
title: Области MCP в Claude Code: local, project и user — где хранится сервер и кто его видит
date: 2026-10-05
updated: 2026-10-20
description: Три области MCP-серверов в Claude Code: local, project и user. Где лежит настройка, кто её видит, что победит при совпадении имён, как делиться серверами с командой и не коммитить секреты.
tags: AI, агенты, MCP, Claude Code, команда, харнесс
category: harness
layout: wide
mentions: MCP, Model Context Protocol, Claude Code, mcp scope, .mcp.json, environment variables
toc: what=Три области | pick=Какую выбрать | order=Что победит | team=Project для команды | secrets=Секреты | first=С чего начать | next=Дальше по теме
---

Область MCP-сервера отвечает на два вопроса: в каких проектах он работает и кто его видит. В Claude Code областей три: local, project и user. Ниже: чем они различаются, какую выбрать, что победит при совпадении имён и как делиться серверами с командой. Что такое MCP и как его подключить — в статье [MCP для ИИ-агента](/blog/mcp-agent-access/).

<b-post series="harness">

<b-chapter id="what" icon="layers" title="Три области">
  <iso-art name="mcp-scopes/scopes"></iso-art>
  <b-table code="prose">
| Область | Где работает | Кто видит | Где лежит |
|---|---|---|---|
| Local | текущий проект | только вы | `~/.claude.json` |
| Project | текущий проект | вся команда, через репозиторий | `.mcp.json` в корне |
| User | все ваши проекты | только вы | `~/.claude.json` |
  </b-table>
  <b-finding>
    <ex>Один и тот же сервер можно подключить для себя в одном проекте, для всей команды или для всех своих проектов.</ex>
    <gen>Local стоит по умолчанию: сервер виден только вам и только в этом проекте.</gen>
    <do>Посмотрите, в какой области лежит каждый ваш сервер: claude mcp list.</do>
  </b-finding>
</b-chapter>

<b-chapter id="pick" icon="help" title="Какую выбрать">
  <b-say-agent title="Скажите агенту">Покажи, в каких областях у меня настроены MCP-серверы, и подскажи, какие стоит перенести в project для команды.</b-say-agent>
  <b-why align="left">Команды агент запустит сам: claude mcp list и claude mcp get.</b-why>
  <b-spoiler summary="Как это делается руками">
    <iso-art name="mcp-scopes/what-where"></iso-art>
    <b-codebox copy>
      # local — по умолчанию
      claude mcp add --transport http stripe https://mcp.stripe.com
      # project — вся команда, файл .mcp.json
      claude mcp add --transport http shared-server --scope project https://example.com/mcp
      # user — все ваши проекты
      claude mcp add --transport http hubspot --scope user https://mcp.hubspot.com/anthropic
    </b-codebox>

Список серверов: `claude mcp list`; подробности: `claude mcp get <name>`; удалить: `claude mcp remove <name>`; внутри Claude Code: `/mcp`.

  </b-spoiler>
  <b-finding>
    <ex>Эксперимент начинается в local, общий инструмент живёт в project, личная утилита в user.</ex>
    <gen>Область решает, кто увидит сервер и где лежит его настройка.</gen>
    <do>Добавляйте общий инструмент с --scope project, личный с --scope user.</do>
  </b-finding>
</b-chapter>

<b-chapter id="order" icon="layers" title="Что победит при совпадении имён">
  <b-why>Если сервер с одним именем есть в нескольких местах, берётся запись из самого верхнего слоя целиком.</b-why>
  <iso-art name="mcp-scopes/priority-layers"></iso-art>
  <b-finding>
    <ex>Local перекрывает project и user, project перекрывает user, ниже идут плагины, коннекторы claude.ai и managed MCP.</ex>
    <gen>Личная запись перекрывает общую с тем же именем целиком: поля двух записей не объединяются.</gen>
    <do>Давайте личным серверам другие имена, чтобы они не перекрывали общие.</do>
  </b-finding>
</b-chapter>

<b-chapter id="team" icon="git-branch" title="Project: общая настройка для команды">
  <b-rules sw="1.8">
    <rule icon="folder-tab" t=".mcp.json">Файл лежит в корне проекта, в репозитории: вся команда получает те же серверы.</rule>
    <rule icon="bell" t="Одобрение">В интерактивной сессии Claude Code спрашивает разрешение перед использованием серверов из .mcp.json.</rule>
    <rule icon="users" t="Без вопросов">В неинтерактивных запусках (claude -p, Agent SDK, облачные сессии) серверы загружаются без запроса.</rule>
    <rule icon="lock" t="Доверие к папке">В непроверенной папке сервер ждёт одобрения («Pending approval») до диалога доверия.</rule>
    <rule icon="ban" t="Отключить">Лишний сервер вносят в disabledMcpjsonServers, а выбор одобрений сбрасывает claude mcp reset-project-choices.</rule>
  </b-rules>
  <b-finding>
    <ex>Файл в репозитории делает настройку агента общей: новый участник получает серверы вместе с кодом.</ex>
    <gen>Одобрение защищает от чужого сервера в интерактивной работе, а в автоматических запусках сервер включается сразу.</gen>
    <do>Проверяйте .mcp.json на ревью так же, как код.</do>
  </b-finding>
</b-chapter>

<b-chapter id="secrets" icon="key" title="Секреты в .mcp.json">
  <b-why>В файл пишут имена переменных окружения. Запись ${VAR} подставляет значение, ${VAR:-значение} задаёт запасное. Подстановка работает в command, args, env, url и headers.</b-why>
  <iso-art name="mcp-scopes/env-keys"></iso-art>
  <b-codebox copy>
    {
      "mcpServers": {
        "api-server": {
          "type": "http",
          "url": "${API_BASE_URL:-https://api.example.com}/mcp",
          "headers": { "Authorization": "Bearer ${API_KEY}" }
        }
      }
    }
  </b-codebox>

Если переменная не задана и запасного значения нет, конфиг загружается как есть, а claude mcp list и /mcp показывают предупреждение. Учётные данные Claude Code (ANTHROPIC_API_KEY, ANTHROPIC_AUTH_TOKEN) и ряд других в url и headers читаются как пустые: скопируйте значение в переменную с другим именем.

  <b-finding>
    <ex>В репозитории лежит ${API_KEY}, настоящий ключ у каждого разработчика свой, в переменной окружения.</ex>
    <gen>Так общий файл безопасно коммитить.</gen>
    <do>Уберите ключи из .mcp.json и замените их переменными.</do>
  </b-finding>
</b-chapter>

<b-chapter id="first" icon="flag" title="С чего начать">
  <iso-art name="mcp-scopes/steps"></iso-art>
  <b-finding>
    <ex>Три шага: посмотреть, поделиться, спрятать ключи.</ex>
    <gen>Сначала порядок в своих серверах, потом общая настройка для команды.</gen>
    <do>Выполните claude mcp list и найдите сервер, который нужен всей команде.</do>
  </b-finding>
</b-chapter>

<b-chapter id="next" title="Дальше по теме">
  <b-links>
    <item href="/blog/mcp-agent-access/" k="Основа" t="MCP для ИИ-агента: какую проблему решает и как поручить подключение агенту">Что такое MCP и как подключить</item>
    <item href="/blog/claude-in-chrome/" k="Браузер" t="Claude in Chrome: как агент работает в вашем браузере — тест, отладка и формы под вашим входом">Агент в вашем браузере</item>
    <item href="/blog/bug-report-to-reproduction-agent/" k="Пример" t="Работа QA после поддержки с ИИ-агентом: исследование, описание и документирование через MCP и скиллы">Агент воспроизводит баг из Jira</item>
  </b-links>
</b-chapter>
<b-footer>Факты об областях и приоритете — по документации Claude Code: <a href="https://code.claude.com/docs/en/mcp#mcp-installation-scopes" target="_blank" rel="noopener">MCP installation scopes</a>.</b-footer>
</b-post>
