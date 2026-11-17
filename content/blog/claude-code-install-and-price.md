---
title: Claude Code: установка и цена, тарифы и доступ из России
seoTitle: Claude Code: установка и цена в 2026, тарифы и доступ
date: 2026-11-17
updated: 2026-11-17
description: Как поставить Claude Code на Mac, Linux и Windows, что входит в подписки Pro, Max, Ultra и Team, нужен ли ключ API и работает ли из России. Команды и ошибки.
tags: AI, Claude Code, установка, цена, тарифы, харнесс
category: harness
layout: wide
mentions: Claude Code, OpenCode, Codex, Cursor, Gemini CLI, Antigravity CLI, CLAUDE.md
toc: answer=Быстрый ответ | what=Что это | install=Установка | login=Первый запуск | plans=Тарифы | check=Проверка | errors=Ошибки | region=Доступ из России | alt=Аналоги | prompts=Запросы агенту | faq=Вопросы | next=Дальше по теме
---

Claude Code ставится одной командой в терминале: на macOS, Linux и WSL — `curl -fsSL https://claude.ai/install.sh | bash`, на Windows в PowerShell — `irm https://claude.ai/install.ps1 | iex`. Для входа нужна подписка Claude Pro (20 долларов в месяц), Max, Ultra, Team или Enterprise либо аккаунт Console с оплатой по API; бесплатный тариф не подходит. Сверено 17.11.2026.

<b-post series="harness">
<b-chapter id="answer" title="Быстрый ответ" icon="crosshair">
  <b-why>Установка занимает одну команду, вход идёт через браузер. Платный доступ нужен всегда: подписка или оплата по API<b-proof href="https://code.claude.com/docs/en/setup" quote="Claude Code: «Claude Code requires a Pro, Max, Ultra, Team, Enterprise, or Console account. The free claude.ai plan does not include Claude Code access» — code.claude.com/docs/en/setup"/>.</b-why>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>Вопрос</th><th>Ответ на 17.11.2026</th></tr>
    </thead>
    <tbody>
      <tr><td>Как поставить</td><td>одна команда: для macOS, Linux и WSL, для Windows PowerShell или CMD</td></tr>
      <tr><td>Сколько стоит</td><td>Pro 20 $ в месяц, Max 100 $, Ultra 200 $; Team от 25 $ за место<b-proof href="https://claude.com/pricing" quote="Claude: Pro «$20 if billed monthly», Max «$100», Ultra «$200», Team standard seat «$25 if billed monthly» — claude.com/pricing"/></td></tr>
      <tr><td>Что входит</td><td>Claude Code есть в Pro, Max, Ultra, Team и Enterprise, в бесплатном тарифе его нет</td></tr>
      <tr><td>Из России</td><td>России нет в официальном списке стран; Claude Code назван в условиях среди продуктов с таким ограничением<b-proof href="https://www.anthropic.com/supported-countries" quote="Anthropic: «Any country or region not listed is unsupported» — anthropic.com/supported-countries"/></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
</b-chapter>
<b-chapter id="what" title="Что такое Claude Code" icon="terminal">
  <b-why>Claude Code — агент для программирования от Anthropic. Он читает проект, правит файлы, запускает команды и тесты, работает с git. Обычный Claude в чате отвечает текстом, а Claude Code сам меняет файлы проекта.</b-why>
  <b-links cols="1">
    <item href="/materials/glossary/claude-code/" k="Термин" t="Claude Code">Что умеет, где работает, на каких моделях</item>
  </b-links>
  <b-cap>Работает в терминале, в VS Code и JetBrains, в приложении для компьютера, в браузере, в Slack и в CI. Здесь разобран терминал: это основной способ<b-proof href="https://code.claude.com/docs/en/quickstart" quote="Claude Code: «Claude Code is also available on the web, as a desktop app, in VS Code and JetBrains IDEs, in Slack, and in CI/CD» — code.claude.com/docs/en/quickstart"/>.</b-cap>
  <iso-art name="term:claude-code"></iso-art>
</b-chapter>
<b-chapter id="install" title="Установка по шагам" icon="arrow-down">
  <b-why>Требования: macOS 13+, Windows 10 1809+ или Windows Server 2019+, Ubuntu 20.04+, Debian 10+, Alpine 3.19+; от 4 ГБ памяти, процессор x64 или ARM64, интернет<b-proof href="https://code.claude.com/docs/en/setup" quote="Claude Code: «macOS 13.0+», «Windows 10 1809+ or Windows Server 2019+», «Ubuntu 20.04+», «4 GB+ RAM» — code.claude.com/docs/en/setup"/>. Команды взяты со страницы установки, сверено 17.11.2026.</b-why>
  <b-seq-row>
    <step t="Терминал">открыть окно терминала</step>
    <step t="Команда">вставить команду своей системы</step>
    <step t="Новое окно">открыть терминал заново</step>
    <step t="Версия">claude --version</step>
  </b-seq-row>
  <b-sublabel top="18">macOS, Linux и WSL</b-sublabel>
  <b-codebox title="Терминал" copy>
    curl -fsSL https://claude.ai/install.sh | bash
  </b-codebox>
  <b-sublabel top="18">Windows: PowerShell (в строке приглашения есть PS)</b-sublabel>
  <b-codebox title="PowerShell" copy>
    irm https://claude.ai/install.ps1 | iex
  </b-codebox>
  <b-sublabel top="18">Windows: CMD (в строке приглашения нет PS)</b-sublabel>
  <b-codebox title="CMD" copy>
    curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
  </b-codebox>
  <b-cap>Установщик не показывает прогресс, пока качает файлы. Права администратора на Windows не нужны. Git for Windows ставить необязательно: без него Claude Code запускает команды через PowerShell<b-proof href="https://code.claude.com/docs/en/setup" quote="Claude Code: «Installing Git for Windows is optional» — code.claude.com/docs/en/setup"/>.</b-cap>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>Способ</th><th>Команда</th><th>Обновление</th></tr>
    </thead>
    <tbody>
      <tr><td>Установщик (рекомендован)</td><td><code>curl -fsSL https://claude.ai/install.sh | bash</code></td><td>само, в фоне</td></tr>
      <tr><td>Homebrew (macOS)</td><td><code>brew install --cask claude-code</code></td><td>вручную: <code>brew upgrade claude-code</code></td></tr>
      <tr><td>WinGet (Windows)</td><td><code>winget install Anthropic.ClaudeCode</code></td><td>вручную: <code>winget upgrade Anthropic.ClaudeCode</code></td></tr>
      <tr><td>npm (нужен Node.js 22+)</td><td><code>npm install -g @anthropic-ai/claude-code@latest</code></td><td>повторить команду установки</td></tr>
      <tr><td>apt, dnf, apk</td><td>подключить репозиторий Anthropic по инструкции в документации</td><td>обычным обновлением системы</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>Через npm ставят без <code>sudo</code>: документация предупреждает, что такая установка не сможет обновляться сама<b-proof href="https://code.claude.com/docs/en/setup" quote="Claude Code: «Do NOT use sudo npm install -g as this can lead to permission issues and security risks» — code.claude.com/docs/en/setup"/>.</b-cap>
  <b-sublabel top="18">Windows: родной режим или WSL</b-sublabel>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>Вариант</th><th>Когда брать</th><th>Изоляция команд (sandbox)</th></tr>
    </thead>
    <tbody>
      <tr><td>Windows напрямую</td><td>проекты и программы под Windows</td><td>не поддерживается</td></tr>
      <tr><td>WSL 2</td><td>программы Linux или изоляция команд</td><td>поддерживается</td></tr>
      <tr><td>WSL 1</td><td>если WSL 2 недоступен</td><td>не поддерживается</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>В WSL команду для Linux запускают внутри окна WSL, а не из PowerShell<b-proof href="https://code.claude.com/docs/en/setup" quote="Claude Code: «You install and launch claude inside the WSL terminal, not from PowerShell or CMD» — code.claude.com/docs/en/setup"/>. На Alpine до установки нужны <code>bash</code> и <code>curl</code>: <code>apk add bash curl</code>.</b-cap>
</b-chapter>
<b-chapter id="login" title="Первый запуск и вход" icon="key">
  <b-why>Вход идёт через браузер: Claude Code сам открывает страницу, после входа в терминале появляется «Login successful»<b-proof href="https://code.claude.com/docs/en/authentication" quote="Claude Code: «When login completes, the terminal shows Login successful and prompts you to press Enter to continue» — code.claude.com/docs/en/authentication"/>.</b-why>
  <b-seq-row>
    <step t="Папка">перейти в папку проекта</step>
    <step t="Запуск">claude</step>
    <step t="Браузер">войти в аккаунт Claude</step>
    <step t="Вопрос">спросить про проект</step>
  </b-seq-row>
  <b-codebox title="Первый запуск" copy>
    cd путь/к/проекту
    claude
  </b-codebox>
  <b-cap>Если браузер не открылся, нажмите <code>c</code>: адрес для входа скопируется в буфер. Выйти из аккаунта можно командой <code>/logout</code>, зайти заново — <code>/login</code>. Справка внутри сессии — <code>/help</code>.</b-cap>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>Чем входить</th><th>Для кого</th></tr>
    </thead>
    <tbody>
      <tr><td>Подписка Pro, Max или Ultra</td><td>один человек, вход через аккаунт claude.ai</td></tr>
      <tr><td>Team или Enterprise</td><td>сотрудник, приглашённый администратором</td></tr>
      <tr><td>Claude Console</td><td>оплата по API с предоплаченными кредитами</td></tr>
      <tr><td>Amazon Bedrock, Google Cloud, Microsoft Foundry</td><td>организации с облачным провайдером</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>Перечень аккаунтов — со страницы авторизации и быстрого старта документации<b-proof href="https://code.claude.com/docs/en/quickstart" quote="Claude Code: «Claude Console (API access with pre-paid credits)» — code.claude.com/docs/en/quickstart"/>.</b-cap>
</b-chapter>
<b-chapter id="plans" title="Тарифы: что входит и сколько стоит" icon="coin">
  <b-why>Цены и состав — со страницы claude.com/pricing на 17.11.2026. Тарифы меняются: перед оплатой откройте страницу ещё раз.</b-why>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>Тариф</th><th>Цена в месяц</th><th>Claude Code</th><th>Объём</th></tr>
    </thead>
    <tbody>
      <tr><td>Free</td><td>0 $</td><td>нет</td><td>ограниченный</td></tr>
      <tr><td>Pro</td><td>20 $ при оплате помесячно, 17 $ при оплате года (200 $ сразу)</td><td>да</td><td>базовый</td></tr>
      <tr><td>Max</td><td>100 $</td><td>да</td><td>в 5 раз больше Pro</td></tr>
      <tr><td>Ultra</td><td>200 $</td><td>да</td><td>в 10 раз больше Pro в неделю</td></tr>
      <tr><td>Team, обычное место</td><td>25 $ помесячно, 20 $ при оплате года</td><td>да</td><td>как у подписки места</td></tr>
      <tr><td>Team, расширенное место</td><td>125 $ помесячно, 100 $ при оплате года</td><td>да</td><td>в 5 раз больше обычного места</td></tr>
      <tr><td>Enterprise</td><td>на странице: 20 $ за место в месяц при оплате года, от 20 мест</td><td>да</td><td>по договору</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>Источник: claude.com/pricing, сверено 17.11.2026<b-proof href="https://claude.com/pricing" quote="Claude: Free «Claude Code: No», Pro «$20 if billed monthly», Ultra «10x Pro usage every week», Team premium seat «5x more usage than standard seats» — claude.com/pricing"/>.</b-cap>
  <b-sublabel top="18">Лимиты</b-sublabel>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>Тариф</th><th>Какой лимит</th></tr>
    </thead>
    <tbody>
      <tr><td>Pro и Max</td><td>пятичасовой лимит сессии и недельный лимит<b-proof href="https://support.claude.com/en/articles/11145838-using-claude-code-with-your-pro-or-max-plan" quote="Claude Help Center: «Pro and Max plans have a five-hour session limit and a weekly limit» — support.claude.com"/></td></tr>
      <tr><td>Ultra</td><td>недельный лимит; у проверенных аккаунтов Ultra пятичасового лимита нет</td></tr>
      <tr><td>Все подписки</td><td>лимит общий для Claude в чате и Claude Code</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>Когда лимит исчерпан, можно включить дополнительное использование за кредиты или купить кредиты API по стандартным ценам API. Чтобы остаться в рамках подписки, от оплаты кредитами отказываются.</b-cap>
  <b-sublabel top="18">Ключ API вместо подписки</b-sublabel>
  <b-finding>
    <ex>Если в системе задана переменная <code>ANTHROPIC_API_KEY</code>, Claude Code берёт ключ вместо подписки, и расход идёт по тарифам API.</ex>
    <gen>У подписки фиксированная цена и лимиты, у ключа оплата за объём. Ключ выгоден, когда нагрузка нерегулярна или нужен счёт по проектам.</gen>
    <do>Чтобы вернуться к подписке, уберите переменную (<code>unset ANTHROPIC_API_KEY</code>) и проверьте способ входа командой <code>/status</code><b-proof href="https://code.claude.com/docs/en/authentication" quote="Claude Code: «Run unset ANTHROPIC_API_KEY to fall back to your subscription, and check /status to confirm which method is active» — code.claude.com/docs/en/authentication"/>.</do>
  </b-finding>
  <b-cap>Цены за миллион токенов по моделям здесь не приведены: на странице тарифов за 17.11.2026 они не проверялись.</b-cap>
</b-chapter>
<b-chapter id="check" title="Как проверить, что всё работает" icon="check-circle">
  <b-why>Три проверки: версия, диагностика, первый вопрос. Работающая установка печатает номер версии с пометкой «(Claude Code)»<b-proof href="https://code.claude.com/docs/en/setup" quote="Claude Code: «A working installation prints a version number such as 2.1.211 (Claude Code)» — code.claude.com/docs/en/setup"/>.</b-why>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>Проверка</th><th>Команда</th><th>Что должно быть</th></tr>
    </thead>
    <tbody>
      <tr><td>Версия</td><td><code>claude --version</code></td><td>номер версии и «(Claude Code)»</td></tr>
      <tr><td>Диагностика</td><td><code>claude doctor</code></td><td>отчёт об установке и настройках без запуска сессии</td></tr>
      <tr><td>Вход</td><td><code>/status</code> внутри сессии</td><td>способ входа: подписка или ключ</td></tr>
      <tr><td>Работа с проектом</td><td>вопрос «what does this project do?»</td><td>краткое описание проекта</td></tr>
      <tr><td>Обновление</td><td><code>claude update</code></td><td>«Claude Code is up to date»</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
</b-chapter>
<b-chapter id="errors" title="Частые ошибки установки" icon="alert-circle">
  <b-why>Ошибка и решение взяты со страницы «Troubleshoot installation and login», сверено 17.11.2026<b-proof href="https://code.claude.com/docs/en/troubleshoot-install" quote="Claude Code: таблица «Find your error» с решением для каждого сообщения — code.claude.com/docs/en/troubleshoot-install"/>.</b-why>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>Что видите</th><th>Причина</th><th>Что делать</th></tr>
    </thead>
    <tbody>
      <tr><td><code>command not found: claude</code> или «'claude' is not recognized»</td><td>папка установки не в PATH</td><td>открыть новое окно терминала; на macOS и Linux добавить <code>~/.local/bin</code> в PATH</td></tr>
      <tr><td><code>The token '&amp;&amp;' is not a valid statement separator</code></td><td>команда для CMD запущена в PowerShell</td><td>взять команду <code>irm … | iex</code></td></tr>
      <tr><td><code>'irm' is not recognized</code></td><td>команда для PowerShell запущена в CMD</td><td>взять команду <code>curl … install.cmd</code></td></tr>
      <tr><td><code>syntax error near unexpected token '&lt;'</code></td><td>вместо скрипта пришла веб-страница</td><td>проверить сеть и прокси, открыть раздел решений документации</td></tr>
      <tr><td><code>curl: (22) … 403</code></td><td>прокси или фильтр блокирует адрес, либо страна вне списка поддерживаемых</td><td>проверить сеть; список стран — в условиях доступа ниже</td></tr>
      <tr><td><code>EACCES: permission denied</code></td><td>нет прав на папку установки</td><td>исправить права на папку, <code>sudo</code> не использовать</td></tr>
      <tr><td><code>TLS connect error</code></td><td>устаревшие сертификаты или проверка трафика прокси</td><td>обновить сертификаты системы</td></tr>
      <tr><td><code>Killed</code> при установке на Linux</td><td>не хватает памяти</td><td>освободить память или добавить swap</td></tr>
      <tr><td><code>App unavailable in region</code></td><td>Claude Code недоступен в стране</td><td>смотреть список поддерживаемых стран</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-sublabel top="18">PATH на macOS с zsh</b-sublabel>
  <b-codebox title="Добавить папку в PATH" copy>
    echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
  </b-codebox>
  <b-cap>Для bash вместо <code>~/.zshrc</code> подойдёт <code>~/.bashrc</code>. После правки откройте новое окно терминала<b-proof href="https://code.claude.com/docs/en/troubleshoot-install" quote="Claude Code: «echo 'export PATH=&quot;$HOME/.local/bin:$PATH&quot;' >> ~/.zshrc» — code.claude.com/docs/en/troubleshoot-install"/>.</b-cap>
</b-chapter>
<b-chapter id="region" title="Доступ из России" icon="flag">
  <b-why>Доступ определяется официальным списком стран. Сверено 17.11.2026 на странице Anthropic; дата вступления условий в силу — 12.11.2026.</b-why>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>Что сказано</th><th>Источник</th></tr>
    </thead>
    <tbody>
      <tr><td>В списке поддерживаемых стран России нет</td><td>anthropic.com/supported-countries</td></tr>
      <tr><td>«Любая страна или регион вне списка не поддерживается»<b-proof href="https://www.anthropic.com/supported-countries" quote="Anthropic: «Any country or region not listed is unsupported» — anthropic.com/supported-countries"/></td><td>там же</td></tr>
      <tr><td>Условия называют Claude Code, Claude.ai и API: они доступны только в перечисленных странах</td><td>там же</td></tr>
      <tr><td>Доступ закрыт также организациям, зарегистрированным или управляемым из неподдерживаемого региона</td><td>там же</td></tr>
      <tr><td>Расположение — одно из системных требований Claude Code</td><td>code.claude.com/docs/en/setup</td></tr>
      <tr><td>Ошибка «App unavailable in region» означает, что Claude Code недоступен в стране</td><td>code.claude.com/docs/en/troubleshoot-install</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>Что с оплатой картами и способами входа из конкретной страны, на проверенных страницах не описано. Такие вопросы решает только поддержка Anthropic: support.claude.com. Список стран может измениться, перед установкой сверяйте его на официальной странице.</b-cap>
</b-chapter>
<b-chapter id="alt" title="Аналоги Claude Code" icon="grid">
  <b-why>Аналоги делают то же: читают проект, правят файлы, запускают команды. Различаются моделью, ценой и местом работы. Описание каждого — в глоссарии; условия доступа у каждого свои, их проверяют на сайте программы.</b-why>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>Агент</th><th>Чей, на какой модели</th><th>Где работает</th></tr>
    </thead>
    <tbody>
      <tr><td>OpenCode</td><td>открытый агент, модель выбираете сами: Claude, GPT, Gemini и другие через API или локальную; платите провайдеру модели</td><td>терминал, приложение, веб</td></tr>
      <tr><td>Codex</td><td>OpenAI, модели GPT</td><td>ChatGPT, приложение, терминал, IDE</td></tr>
      <tr><td>Cursor</td><td>Anysphere, редактор на основе VS Code со встроенным агентом; свои модели и модели других компаний</td><td>редактор</td></tr>
      <tr><td>Gemini CLI</td><td>Google, модели Gemini; с 18 июня 2026 перестал работать для обычных пользователей</td><td>терминал</td></tr>
      <tr><td>Antigravity CLI</td><td>Google; в него перенесён Gemini CLI</td><td>терминал, приложение Antigravity</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>Описания взяты из глоссария сайта; сведения о Gemini CLI и Antigravity CLI — из его статей, там же даты. Команды установки аналогов здесь не приведены: у каждого они свои и меняются.</b-cap>
  <b-links cols="2">
    <item href="/materials/glossary/opencode/" k="Термин" t="OpenCode">Открытый агент для терминала</item>
    <item href="/materials/glossary/codex/" k="Термин" t="Codex">Агент OpenAI</item>
    <item href="/materials/glossary/cursor/" k="Термин" t="Cursor">Редактор с агентом</item>
    <item href="/materials/glossary/gemini-cli/" k="Термин" t="Gemini CLI">Агент Google в терминале</item>
    <item href="/materials/glossary/antigravity-cli/" k="Термин" t="Antigravity CLI">Преемник Gemini CLI</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="Сравнение" t="Codex или Claude Code, Cursor и Hermes Agent">Какой агент для какой задачи</item>
    <item href="/blog/codex-or-chatgpt-what-to-choose/" k="Выбор" t="Codex или ChatGPT: что выбрать">Чат или агент для кода</item>
  </b-links>
</b-chapter>
<b-chapter id="prompts" title="Готовые запросы агенту" icon="chat">
  <b-why>Запросы для первой сессии. Вставляйте их в Claude Code после запуска <code>claude</code> в папке проекта.</b-why>
  <b-codebox title="1. Знакомство с проектом" copy>
    Что делает этот проект? Какие технологии в нём используются и где главная точка входа? Ответь списком из пяти пунктов.
  </b-codebox>
  <b-codebox title="2. Правила проекта" copy>
    Прочитай проект и создай файл CLAUDE.md: команды сборки и тестов, структура папок, что нельзя трогать. Покажи текст до записи.
  </b-codebox>
  <b-codebox title="3. Малая правка" copy>
    Добавь в README раздел «Установка» с командами из package.json. Покажи изменение и дождись моего подтверждения.
  </b-codebox>
  <b-codebox title="4. Проверка работы" copy>
    Запусти тесты проекта и перечисли упавшие. Для каждого предложи причину, но файлы пока не меняй.
  </b-codebox>
  <b-links cols="1">
    <item href="/materials/glossary/claude-md/" k="Термин" t="CLAUDE.md">Файл правил проекта, который Claude Code читает в каждой сессии</item>
  </b-links>
</b-chapter>
<b-chapter id="faq" icon="chat" title="Частые вопросы">
  <b-faq-cards>
    <q t="Как установить Claude Code?">Откройте терминал и выполните одну команду: на macOS, Linux и WSL — curl -fsSL https://claude.ai/install.sh | bash, на Windows в PowerShell — irm https://claude.ai/install.ps1 | iex. Затем откройте новое окно терминала, проверьте claude --version и запустите claude в папке проекта. Источник: code.claude.com/docs/en/setup, сверено 17.11.2026.</q>
    <q t="Сколько стоит Claude Code?">Отдельной цены нет: Claude Code входит в подписки. На 17.11.2026 Pro стоит 20 долларов в месяц при помесячной оплате, Max — 100, Ultra — 200, место Team — 25; бесплатный тариф Claude Code не включает. Альтернатива подписке — оплата по API через Console. Источник: claude.com/pricing.</q>
    <q t="Работает ли Claude Code в России?">России нет в официальном списке поддерживаемых стран Anthropic, а Claude Code назван в условиях среди продуктов, доступных только в перечисленных странах. Любая страна вне списка считается неподдерживаемой. Условия вступили в силу 12.11.2026. Источник: anthropic.com/supported-countries, сверено 17.11.2026.</q>
    <q t="Чем заменить Claude Code?">Похожие агенты: OpenCode с моделью на выбор, Codex от OpenAI, редактор Cursor со встроенным агентом, у Google — Antigravity CLI вместо закрытого для обычных пользователей Gemini CLI. Доступ и цены у каждого свои, их проверяют на сайте программы.</q>
  </b-faq-cards>
</b-chapter>
<b-chapter id="next" title="Дальше по теме">
  <b-links cols="2">
    <item href="/blog/ai-in-code-harness-and-tools/" k="Сравнение" t="Codex или Claude Code, Cursor и Hermes Agent">Какой агент для какой задачи</item>
    <item href="/blog/specs-rules-skills/" k="Контекст" t="AGENTS.md, CLAUDE.md и spec.md: что куда класть">Файлы правил для агента</item>
    <item href="/blog/cursor-rules-vs-agents-md/" k="Правила" t="Cursor rules и AGENTS.md">Что куда класть</item>
    <item href="/blog/harness-driven-development/" k="Метод" t="Harness-Driven Development">Ошибка агента становится правилом</item>
  </b-links>
</b-chapter>
<b-footer>По документации Claude Code, claude.com/pricing, справке Claude и условиям доступа Anthropic; сверено 17.11.2026. Цены и список стран меняются.</b-footer>
</b-post>
