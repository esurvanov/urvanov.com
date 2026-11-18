---
title: Claude Code: установка и цена, тарифы и доступ из России
seoTitle: Claude Code: установка и цена в 2026, тарифы и доступ
date: 2026-11-17
updated: 2026-11-18
description: Как поставить Claude Code на Mac, Linux и Windows, что входит в подписки Pro, Max, Ultra и Team, нужен ли ключ API и работает ли из России. Команды и ошибки.
tags: AI, Claude Code, установка, цена, тарифы, харнесс
category: harness
layout: wide
mentions: Claude Code, OpenCode, Codex, Cursor, Gemini CLI, Antigravity CLI, CLAUDE.md
toc: answer=Быстрый ответ | what=Что это | install=Установка | login=Первый запуск | plans=Тарифы | check=Проверка | errors=Ошибки | region=Доступ из России | alt=Аналоги | prompts=Запросы агенту | faq=Вопросы | next=Дальше по теме
---

Claude Code ставится одной командой в терминале: на macOS, Linux и WSL — `curl -fsSL https://claude.ai/install.sh | bash`, на Windows в PowerShell — `irm https://claude.ai/install.ps1 | iex`. Для входа нужна платная подписка Claude Pro за 20 долларов в месяц, Max, Ultra, Team или Enterprise либо аккаунт Console с оплатой по API; бесплатный тариф не подходит.

<b-post series="harness">
<b-chapter id="answer" title="Быстрый ответ" icon="crosshair">
  <b-why>Установка занимает одну команду, вход идёт через браузер. Платный доступ нужен всегда: подписка или оплата по API<b-proof href="https://code.claude.com/docs/en/setup" quote="Claude Code: «Claude Code requires a Pro, Max, Ultra, Team, Enterprise, or Console account. The free claude.ai plan does not include Claude Code access» — code.claude.com/docs/en/setup"/>.</b-why>

  <iso-art name="claude-code-install-and-price/install-flow"></iso-art>
  <b-cap>Путь от пустого терминала до первого ответа: открыть терминал, вставить команду, открыть новое окно, проверить версию, войти в аккаунт.</b-cap>
  <b-sublabel top="18">Что это значит простыми словами</b-sublabel>

  Claude Code — агент для программ от Anthropic, компании, которая делает Claude. Он работает в терминале, то есть в окне, куда вводят текстовые команды, читает файлы проекта и по вашей задаче правит их. Поставить его можно одной командой: вы копируете строку для своей системы, вставляете в терминал и ждёте. Затем открываете терминал заново, проверяете версию и входите в аккаунт Claude через браузер. Доступ платный: нужна подписка или аккаунт с оплатой по API. Бесплатный тариф Claude в чате остаётся бесплатным, но Claude Code в него не входит.

  Бытовой пример. Лука живёт в Лиссабоне и работает на ноутбуке с Ubuntu. Он открывает терминал и вставляет команду для macOS, Linux и WSL. Установщик несколько минут ничего не показывает, и Лука не закрывает окно. Потом он открывает новое окно терминала, пишет <code>claude --version</code> и видит номер версии с пометкой «(Claude Code)». Остаётся войти: Лука запускает <code>claude</code> в папке проекта, браузер открывает страницу входа, и вход проходит через подписку Pro. Португалия записана в списке стран Anthropic, поэтому по региону препятствий нет.

  Частая ошибка: ставить Claude Code, имея только бесплатный аккаунт в чате. Установка пройдёт, а вход не даст доступа к агенту: бесплатный тариф Claude Code не включает. Перед установкой решите, как будете платить: подпиской Pro, Max, Ultra, Team, Enterprise или оплатой по API через Console.

  Проверить ответ можно сразу после установки: команда <code>claude --version</code> печатает номер версии и «(Claude Code)». Цены и условия сверены по <a href="https://claude.com/pricing">странице тарифов Claude</a> и <a href="https://code.claude.com/docs/en/setup">странице установки Claude Code</a>.
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>Вопрос</th><th>Ответ на 18.11.2026</th></tr>
    </thead>
    <tbody>
      <tr><td>Как поставить</td><td>одна команда: для macOS, Linux и WSL, для Windows PowerShell или CMD</td></tr>
      <tr><td>Сколько стоит</td><td>Pro 20 $ в месяц, Max 100 $, Ultra 200 $; Team от 25 $ за место<b-proof href="https://claude.com/pricing" quote="Claude: Pro «$20 if billed monthly», Max «$100», Ultra «$200», Team standard seat «$25 if billed monthly» — claude.com/pricing"/></td></tr>
      <tr><td>Что входит</td><td>Claude Code есть в Pro, Max, Ultra, Team и Enterprise, в бесплатном тарифе его нет</td></tr>
      <tr><td>Из России</td><td>России нет в официальном списке стран; Claude Code назван в условиях среди продуктов с таким ограничением<b-proof href="https://www.anthropic.com/supported-countries" quote="Anthropic: «Any country or region not listed is unsupported» — anthropic.com/supported-countries"/></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>Дата проверки: 18.11.2026. Цены и список стран меняются: перед оплатой откройте страницы Anthropic ещё раз.</b-cap>
</b-chapter>
<b-chapter id="what" title="Что такое Claude Code" icon="terminal">
  <b-why>Claude Code — агент для программирования от Anthropic. Он читает проект, правит файлы, запускает команды и тесты, работает с git. Обычный Claude в чате отвечает текстом, а Claude Code сам меняет файлы проекта.</b-why>

  <iso-art name="term:claude-code"></iso-art>
  <b-links cols="1">
    <item href="/materials/glossary/claude-code/" k="Термин" t="Claude Code">Что умеет, где работает, на каких моделях</item>
  </b-links>
  <b-sublabel top="18">Что это значит простыми словами</b-sublabel>

  Агент для программ выполняет работу сам: вы описываете задачу словами, а он открывает нужные файлы проекта, вносит правки, запускает проверки и показывает результат. Git — программа, которая хранит историю изменений проекта; Claude Code умеет с ней работать. Тесты — проверки, которые подтверждают, что программа после правки всё ещё работает; агент запускает их сам и читает результат.

  Работает Claude Code в терминале, в VS Code и JetBrains, в приложении для компьютера, в браузере, в Slack и в CI. Здесь разобран терминал: это основной способ<b-proof href="https://code.claude.com/docs/en/quickstart" quote="Claude Code: «Claude Code is also available on the web, as a desktop app, in VS Code and JetBrains IDEs, in Slack, and in CI/CD» — code.claude.com/docs/en/quickstart"/>.

  Бытовой пример. Рита живёт в Риге и ведёт небольшой сайт с тестами и историей изменений в git. Сначала она спрашивает Claude в чате, почему не работает кнопка, и получает объяснение текстом: исправлять код ей приходится самой. Потом она запускает Claude Code в папке сайта и пишет ту же задачу. Агент находит нужный файл, правит его, запускает тесты и показывает изменение. Рита смотрит правку в git и принимает её. Латвия записана в списке стран Anthropic, так что по региону вопросов нет.

  <b>Claude Code — это тот же Claude из чата, только в терминале?</b> Нет. В чате Claude отвечает текстом, а вы переносите правки сами. Claude Code меняет файлы проекта и запускает команды: поэтому он требует отдельной установки и входит только в платные тарифы. Как проверить: бесплатный тариф Claude Code не включает, и в таблице тарифов на странице <a href="https://claude.com/pricing">claude.com/pricing</a> у Free написано «Claude Code: No».
</b-chapter>
<b-chapter id="install" title="Установка по шагам" icon="arrow-down">
  <b-why>Требования: macOS 13+, Windows 10 1809+ или Windows Server 2019+, Ubuntu 20.04+, Debian 10+, Alpine 3.19+; от 4 ГБ памяти, процессор x64 или ARM64, интернет<b-proof href="https://code.claude.com/docs/en/setup" quote="Claude Code: «macOS 13.0+», «Windows 10 1809+ or Windows Server 2019+», «Ubuntu 20.04+», «4 GB+ RAM» — code.claude.com/docs/en/setup"/>. Команды взяты со страницы установки, дата проверки: 18.11.2026.</b-why>

  <b-sublabel top="18">Какую команду брать</b-sublabel>

  Команда зависит от окна, в котором вы набираете текст. На macOS, Linux и в WSL (среда Linux внутри Windows) используется одна строка. На Windows окон два: PowerShell и CMD, и команды у них разные. Отличить их можно по строке приглашения: в PowerShell она начинается с «PS», в CMD «PS» нет. Если взять команду от другого окна, установка не начнётся.
  <iso-art name="claude-code-install-and-price/which-shell"></iso-art>
  <b-cap>Три команды для трёх окон: macOS, Linux и WSL; PowerShell со строкой «PS»; CMD без «PS».</b-cap>
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

  Бытовой пример. Ян живёт в Гданьске и работает на ноутбуке с Windows. Он открывает PowerShell и видит в начале строки «PS». Значит, ему нужна команда <code>irm https://claude.ai/install.ps1 | iex</code>. Ян вставляет её и несколько минут не видит ни одной строки, но не закрывает окно: установщик не показывает прогресс. Права администратора ему не понадобились, Git for Windows он не ставил. Когда установка закончилась, Ян открыл PowerShell заново и запустил <code>claude --version</code>. Польша записана в списке стран Anthropic. Проверить, что окно то самое, можно по первым двум буквам строки приглашения.

  <b-sublabel top="18">Установщик или менеджер пакетов</b-sublabel>

  Установщик, то есть команда с <code>curl</code> или <code>irm</code>, рекомендован: он сам обновляет Claude Code в фоне. Менеджер пакетов — программа, которая ставит и обновляет другие программы по имени; такой способ тоже работает, но обновлять Claude Code придётся вручную. Через npm ставят без <code>sudo</code>: документация предупреждает, что такая установка не сможет обновляться сама<b-proof href="https://code.claude.com/docs/en/setup" quote="Claude Code: «Do NOT use sudo npm install -g as this can lead to permission issues and security risks» — code.claude.com/docs/en/setup"/>.
  <iso-art name="claude-code-install-and-price/install-methods"></iso-art>
  <b-cap>Установщик обновляется сам, менеджеры пакетов обновляют вручную: Homebrew, WinGet, npm, apt, dnf, apk.</b-cap>
  <b-ctx-table phone="wrap" first="34">
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

  Бытовой пример. Марко живёт в Милане и работает на Mac. Он уже ставит все программы через Homebrew, поэтому выбирает <code>brew install --cask claude-code</code> вместо установщика. Работает всё так же, но через месяц Марко обновляет Claude Code командой <code>brew upgrade claude-code</code>: сам он обновляться не будет. Италия записана в списке стран Anthropic. Как проверить способ установки: если команда ставила через Homebrew, обновлять нужно тем же Homebrew.

  <b-sublabel top="18">Windows: напрямую или через WSL</b-sublabel>

  WSL — среда Linux внутри Windows: в ней Claude Code работает как на обычном Linux. Выбор зависит от проекта. Если проект и программы под Windows, ставьте Windows напрямую. Если нужны программы Linux или изоляция команд (sandbox, то есть запуск команд агента в ограниченной среде), берите WSL 2. WSL 1 подходит, когда WSL 2 недоступен, но изоляцию команд не поддерживает.
  <iso-art name="claude-code-install-and-price/windows-modes"></iso-art>
  <b-cap>Три режима на Windows: напрямую, WSL 2 с изоляцией команд, WSL 1 без изоляции.</b-cap>
  <b-ctx-table phone="wrap" first="34">
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

  <b-sublabel top="18">Как запустить</b-sublabel>

  Перейдите в папку проекта и запустите <code>claude</code>. Программа откроет браузер, вы войдёте в аккаунт Claude, а в терминале появится «Login successful» и предложение нажать Enter. После этого можно задавать вопросы о проекте.
  <b-codebox title="Первый запуск" copy>
    cd путь/к/проекту
    claude
  </b-codebox>
  <b-cap>Если браузер не открылся, нажмите <code>c</code>: адрес для входа скопируется в буфер. Выйти из аккаунта можно командой <code>/logout</code>, зайти заново — <code>/login</code>. Справка внутри сессии — <code>/help</code>.</b-cap>
  <b-sublabel top="18">Чем можно войти</b-sublabel>

  Способ входа зависит от того, как вы платите. Подписка Pro, Max или Ultra оформляется на человека. Team и Enterprise используют аккаунт сотрудника, которого пригласил администратор. Claude Console — отдельный аккаунт с оплатой по API с предоплаченными кредитами. Amazon Bedrock, Google Cloud и Microsoft Foundry подходят организациям, у которых уже есть облачный провайдер.
  <iso-art name="claude-code-install-and-price/login-paths"></iso-art>
  <b-cap>Четыре пути входа: подписка, Team или Enterprise, Console, облачные провайдеры.</b-cap>
  <b-ctx-table phone="wrap" first="34">
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

  Бытовой пример. Эмма живёт в Вене и купила подписку Pro. Она переходит в папку проекта, запускает <code>claude</code>, и браузер открывает страницу входа. Эмма входит в тот же аккаунт Claude, под которым пользуется чатом. В терминале появляется «Login successful», она нажимает Enter и спрашивает: «what does this project do?». Через несколько секунд агент описывает проект. Позже Эмма хочет проверить, под каким аккаунтом работает программа, и вводит <code>/status</code>; чтобы сменить аккаунт, использует <code>/logout</code> и <code>/login</code>. Австрия записана в списке стран Anthropic, по региону препятствий нет.

  <b>Подписка в чате и Claude Code — это два разных входа?</b> Нет. Подписка Pro, Max или Ultra оформлена на аккаунт claude.ai, и тот же аккаунт открывает Claude Code. Лимит у них общий. Как проверить: после входа введите <code>/status</code> и посмотрите, какой способ входа показан.

  <b>Достаточно бесплатного аккаунта Claude?</b> Нет. В условиях установки сказано: «The free claude.ai plan does not include Claude Code access». Войти в Claude Code можно только платным способом: подпиской, Team, Enterprise, Console или облачным провайдером. Как проверить: откройте <a href="https://code.claude.com/docs/en/setup">страницу установки Claude Code</a> и найдите эту фразу в разделе требований.
</b-chapter>

<b-chapter id="plans" title="Тарифы: что входит и сколько стоит" icon="coin">
  <b-why>Claude Code входит в платные подписки Pro, Max, Ultra, Team и Enterprise, а в бесплатный тариф не входит<b-proof href="https://claude.com/pricing" quote="Claude: Free «Claude Code: No», Pro «$20 if billed monthly», Ultra «10x Pro usage every week», Team premium seat «5x more usage than standard seats» — claude.com/pricing"/>. Цены и состав приведены со страницы claude.com/pricing. Дата проверки: 18.11.2026. Тарифы меняются: перед оплатой откройте страницу Anthropic с ценами ещё раз.</b-why>

  Тариф — это подписка с фиксированной ценой в месяц и своим объёмом использования. Отдельной цены за Claude Code нет: он идёт в составе подписки вместе с обычным Claude в чате. Чем выше тариф, тем больше объём, который вы можете потратить за пятичасовое окно и за неделю. Для одного человека подходят Pro, Max и Ultra, для команды — места Team, для компании с договором — Enterprise.
  <iso-art name="claude-code-install-and-price/plans-ladder"></iso-art>
  <b-cap>Лестница тарифов: Free без Claude Code, затем Pro, Max, Ultra, места Team обычное и расширенное, Enterprise по договору.</b-cap>
  <b-ctx-table phone="wrap" first="34">
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
  <b-cap>Источник: claude.com/pricing. Дата проверки: 18.11.2026.</b-cap>
  <b-sublabel top="18">Сквозная ситуация</b-sublabel>

  Йонас живёт в Вильнюсе и хочет попробовать Claude Code на своём проекте. Он открывает страницу тарифов и видит у Free пометку «Claude Code: No», поэтому бесплатный вариант отпадает. Pro стоит 20 долларов в месяц при помесячной оплате, и этого хватает для начала. Годовая оплата снижает цену до 17 долларов в месяц, но 200 долларов списываются сразу, а Йонас пока не уверен, что будет пользоваться агентом каждый день. Он берёт помесячную оплату. Проверить свой случай можно так: открыть страницу тарифов и найти в строке своего тарифа пометку про Claude Code.

  <b-sublabel top="18">Лимиты</b-sublabel>

  Лимит — это объём использования, после которого подписка просит подождать. У Pro и Max их два: пятичасовой лимит сессии и недельный лимит<b-proof href="https://support.claude.com/en/articles/11145838-using-claude-code-with-your-pro-or-max-plan" quote="Claude Help Center: «Pro and Max plans have a five-hour session limit and a weekly limit» — support.claude.com"/>. У Ultra есть недельный лимит, а у проверенных аккаунтов Ultra пятичасового лимита нет. Лимит общий для Claude в чате и для Claude Code: если вы потратили объём в чате, на агента остаётся меньше.
  <iso-art name="claude-code-install-and-price/limits"></iso-art>
  <b-cap>Два окна расхода: пятичасовое и недельное; объём один на чат и на Claude Code.</b-cap>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>Тариф</th><th>Какой лимит</th></tr>
    </thead>
    <tbody>
      <tr><td>Pro и Max</td><td>пятичасовой лимит сессии и недельный лимит</td></tr>
      <tr><td>Ultra</td><td>недельный лимит; у проверенных аккаунтов Ultra пятичасового лимита нет</td></tr>
      <tr><td>Все подписки</td><td>лимит общий для Claude в чате и Claude Code</td></tr>
    </tbody>
    </table>
  </b-ctx-table>

  Когда лимит исчерпан, можно включить дополнительное использование за кредиты или купить кредиты API по стандартным ценам API. Чтобы остаться в рамках подписки, от оплаты кредитами отказываются. Через неделю Йонас замечает, что вечером агент просит подождать: утром он долго разговаривал с Claude в чате, и общий объём уже ушёл. Он решает не докупать кредиты и просто дождаться нового окна.

  <b-sublabel top="18">Ключ API вместо подписки</b-sublabel>

  Ключ API — это программный пароль, по которому Claude Code платит за каждый запрос по ставкам API. У подписки цена фиксированная, у ключа оплата идёт за объём. Если в системе задана переменная <code>ANTHROPIC_API_KEY</code>, Claude Code берёт ключ вместо подписки. Для Йонаса это стало сюрпризом: переменная осталась от другого проекта, и расход шёл по тарифам API, хотя подписка у него была оплачена.
  <iso-art name="claude-code-install-and-price/api-vs-subscription"></iso-art>
  <b-cap>Два способа платить: подписка с фиксированной ценой и ключ API с оплатой за объём. Ключ перекрывает подписку.</b-cap>
  <b-finding>
    <ex>Если в системе задана переменная <code>ANTHROPIC_API_KEY</code>, Claude Code берёт ключ вместо подписки, и расход идёт по тарифам API.</ex>
    <gen>У подписки фиксированная цена и лимиты, у ключа оплата за объём. Ключ выгоден, когда нагрузка нерегулярна или нужен счёт по проектам.</gen>
    <do>Чтобы вернуться к подписке, уберите переменную (<code>unset ANTHROPIC_API_KEY</code>) и проверьте способ входа командой <code>/status</code><b-proof href="https://code.claude.com/docs/en/authentication" quote="Claude Code: «Run unset ANTHROPIC_API_KEY to fall back to your subscription, and check /status to confirm which method is active» — code.claude.com/docs/en/authentication"/>.</do>
  </b-finding>

  Цены за миллион токенов по моделям здесь не приведены: на странице тарифов на 18.11.2026 они не проверялись.

  <b-sublabel top="18">Частые заблуждения</b-sublabel>

  <b>Бесплатный тариф даёт Claude Code?</b> Нет. В документации установки сказано, что для Claude Code нужен аккаунт Pro, Max, Ultra, Team, Enterprise или Console, а бесплатный тариф claude.ai доступа к нему не включает<b-proof href="https://code.claude.com/docs/en/setup" quote="Claude Code: «Claude Code requires a Pro, Max, Ultra, Team, Enterprise, or Console account. The free claude.ai plan does not include Claude Code access» — code.claude.com/docs/en/setup"/>. Как проверить: открыть страницу тарифов и найти у Free пометку «Claude Code: No».

  <b>Платная подписка снимает региональное ограничение?</b> Нет. Список стран Anthropic действует на использование независимо от тарифа и от способа оплаты<b-proof href="https://www.anthropic.com/supported-countries" quote="Anthropic: «Any country or region not listed is unsupported» — anthropic.com/supported-countries"/>. Как проверить: найти свою страну в списке на странице Anthropic.

  <b>Ключ API дешевле подписки?</b> Это зависит от нагрузки. Подписка стоит фиксированную сумму, ключ списывает деньги за объём, а точные ставки на странице тарифов на 18.11.2026 не проверялись. Как проверить: сравнить расход за месяц в Console с ценой подписки.
</b-chapter>
<b-chapter id="check" title="Как проверить, что всё работает" icon="check-circle">
  <b-why>Работающая установка печатает номер версии с пометкой «(Claude Code)»<b-proof href="https://code.claude.com/docs/en/setup" quote="Claude Code: «A working installation prints a version number such as 2.1.211 (Claude Code)» — code.claude.com/docs/en/setup"/>. Дальше идут диагностика, способ входа и первый вопрос о проекте.</b-why>

  Проверка — это пять коротких шагов, и каждый отвечает на свой вопрос. Версия показывает, что программа найдена и запускается. Диагностика собирает отчёт об установке и настройках без запуска сессии. Статус внутри сессии говорит, чем вы вошли: подпиской или ключом. Вопрос о проекте проверяет всю цепочку целиком: вход, сеть и чтение файлов. Обновление показывает, что установка умеет получать новые версии.
  <iso-art name="claude-code-install-and-price/check-ladder"></iso-art>
  <b-cap>Лестница проверок: версия, диагностика, статус, вопрос о проекте, обновление.</b-cap>
  <b-ctx-table phone="wrap" first="34">
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
  <b-sublabel top="18">Сквозная ситуация</b-sublabel>

  Сара живёт в Дублине и только что поставила Claude Code на ноутбук. Она открывает новое окно терминала и вводит <code>claude --version</code>. Появляется номер версии с пометкой «(Claude Code)», значит, программа найдена. Затем она запускает <code>claude doctor</code> и получает отчёт об установке. В папке проекта она запускает <code>claude</code>, вводит <code>/status</code> и видит, что вход идёт через подписку, а не через ключ. Последним идёт вопрос «what does this project do?»: краткое описание проекта означает, что вся цепочка работает. Проверить самому можно за пять минут, пройдя таблицу сверху вниз.

  <b-sublabel top="18">Частая ошибка</b-sublabel>

  Остановиться на версии. Номер версии подтверждает только то, что программа найдена в PATH. Вход, сеть и права на файлы он не проверяет. Если версия печатается, а вопрос о проекте не получает ответа, ищите причину во входе: проверьте <code>/status</code> и при необходимости выполните <code>/login</code>.
</b-chapter>
<b-chapter id="errors" title="Частые ошибки установки" icon="alert-circle">
  <b-why>Для каждого сообщения об ошибке в документации есть решение: таблица «Find your error» со страницы «Troubleshoot installation and login»<b-proof href="https://code.claude.com/docs/en/troubleshoot-install" quote="Claude Code: таблица «Find your error» с решением для каждого сообщения — code.claude.com/docs/en/troubleshoot-install"/>. Дата проверки: 18.11.2026.</b-why>

  Ошибка установки читается по тексту сообщения: от него идут к причине, а от причины к действию. Чаще всего причина простая: папка установки не прописана в PATH (списке папок, где терминал ищет программы), команда взята не для той оболочки или не хватает прав и памяти. Страны вне списка поддерживаемых отдельный случай: он описан в таблице строками про 403 и «App unavailable in region».
  <iso-art name="claude-code-install-and-price/install-errors"></iso-art>
  <b-cap>Дерево ошибок: что видите, какая причина, что делать.</b-cap>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>Что видите</th><th>Причина</th><th>Что делать</th></tr>
    </thead>
    <tbody>
      <tr><td><code>command not found: claude</code> или «'claude' is not recognized»</td><td>папка установки не в PATH</td><td>открыть новое окно терминала; на macOS и Linux добавить <code>~/.local/bin</code> в PATH</td></tr>
      <tr><td><code>The token '&amp;&amp;' is not a valid statement separator</code></td><td>команда для CMD запущена в PowerShell</td><td>взять команду <code>irm … | iex</code></td></tr>
      <tr><td><code>'irm' is not recognized</code></td><td>команда для PowerShell запущена в CMD</td><td>взять команду <code>curl … install.cmd</code></td></tr>
      <tr><td><code>syntax error near unexpected token '&lt;'</code></td><td>вместо скрипта пришла веб-страница</td><td>проверить сеть и прокси, открыть раздел решений документации</td></tr>
      <tr><td><code>curl: (22) … 403</code></td><td>прокси или фильтр блокирует адрес, либо страна вне списка поддерживаемых</td><td>проверить сеть; список стран и что делать — в <a href="/blog/claude-code-access-regions-vpn-bans/">статье про доступ из России</a></td></tr>
      <tr><td><code>EACCES: permission denied</code></td><td>нет прав на папку установки</td><td>исправить права на папку, <code>sudo</code> не использовать</td></tr>
      <tr><td><code>TLS connect error</code></td><td>устаревшие сертификаты или проверка трафика прокси</td><td>обновить сертификаты системы</td></tr>
      <tr><td><code>Killed</code> при установке на Linux</td><td>не хватает памяти</td><td>освободить память или добавить swap</td></tr>
      <tr><td><code>App unavailable in region</code></td><td>Claude Code недоступен в стране</td><td>смотреть список поддерживаемых стран: <a href="/blog/claude-code-access-regions-vpn-bans/">доступ из России, VPN и блокировки</a></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-sublabel top="18">Сквозная ситуация</b-sublabel>

  Матеус живёт в Сан-Паулу и поставил Claude Code на Mac одной командой. Установщик отработал, но в терминале появилось «command not found: claude». Он решает, что установка сломалась, и хочет запустить её снова. Сначала он открывает новое окно терминала: старое окно не знает о новой папке. Если сообщение остаётся, причина в PATH, и ему нужно добавить <code>~/.local/bin</code> в файл настроек zsh и снова открыть окно (команда в следующем блоке). После этого <code>claude --version</code> печатает версию. Проверить, что вы сделали то же самое, можно по выводу <code>claude --version</code>.

  <b-sublabel top="18">PATH на macOS с zsh</b-sublabel>
  <b-codebox title="Добавить папку в PATH" copy>
    echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
  </b-codebox>

  Для bash вместо <code>~/.zshrc</code> подойдёт <code>~/.bashrc</code>. После правки откройте новое окно терминала<b-proof href="https://code.claude.com/docs/en/troubleshoot-install" quote="Claude Code: «echo 'export PATH=&quot;$HOME/.local/bin:$PATH&quot;' >> ~/.zshrc» — code.claude.com/docs/en/troubleshoot-install"/>.

  <b-sublabel top="18">Частые заблуждения</b-sublabel>

  <b>Если claude не находится, установщик не сработал?</b> Чаще всего он сработал, а терминал не знает о новой папке: в таблице это строка про PATH с решением «открыть новое окно терминала». Как проверить: открыть новое окно и повторить <code>claude --version</code>.

  <b>Ошибку 403 всегда лечит смена сети?</b> Нет. В таблице у 403 две причины: прокси или фильтр, либо страна вне списка поддерживаемых. Во втором случае сеть не поможет, нужно смотреть список стран Anthropic.

  <b>EACCES лечится командой sudo?</b> Нет. В таблице решением названо исправление прав на папку, а <code>sudo</code> не использовать.
</b-chapter>
<b-chapter id="region" title="Доступ из России" icon="flag">
  <b-why>России нет в официальном списке поддерживаемых стран Anthropic, а Claude Code назван в условиях среди продуктов, доступных только в перечисленных странах. Дата проверки: 18.11.2026. Условия вступили в силу 12.11.2026<b-proof href="https://www.anthropic.com/supported-countries" quote="Anthropic: «Any country or region not listed is unsupported» — anthropic.com/supported-countries"/>.</b-why>

  Список стран — документ Anthropic с перечнем мест, где можно пользоваться Claude. Любая страна или регион, которых в списке нет, считаются неподдерживаемыми. Записи «Russia» в списке нет, поэтому установка и вход из России не поддерживаются. Причины Anthropic не называет. По моему предположению, они лежат в политике США и других стран: санкции, экспортные ограничения и законы. Это предположение, в документах компании такого объяснения нет.
  <iso-art name="claude-code-access-regions-vpn-bans/world-map"></iso-art>
  <b-cap>Карта стран, где Anthropic поддерживает Claude Code, и страны вне списка.</b-cap>

  На установке это видно по сообщению «App unavailable in region» и по ошибке 403 при скачивании: обе строки есть в таблице ошибок. Оплаченная подписка ограничение не снимает: список действует и на платный тариф, и на ключ API. Что значит ограничение, как читать записи со скобками и что законно делать, если вашей страны нет в списке, подробно разобрано в отдельной статье.
  <b-links cols="1">
    <item href="/blog/claude-code-access-regions-vpn-bans/" k="Подробно" t="Claude Code в России: доступ, VPN, блокировки, оплата">Что значит ограничение и что делать</item>
  </b-links>
</b-chapter>
<b-chapter id="alt" title="Аналоги Claude Code" icon="grid">
  <b-why>Аналоги делают то же, что Claude Code: читают проект, правят файлы, запускают команды. Различаются моделью, ценой и местом работы. Условия доступа у каждого свои, их проверяют на сайте программы.</b-why>

  Аналог — это другой агент для программ: он работает в терминале или в редакторе и меняет файлы проекта по вашему запросу. Выбирают его по трём вопросам. Чья модель стоит внутри? Где он работает: в терминале, в приложении или в редакторе? Как вы за него платите? Описание каждого агента есть в глоссарии сайта; сведения о Gemini CLI и Antigravity CLI взяты из их статей, там же даты.
  <iso-art name="claude-code-install-and-price/alternatives-map"></iso-art>
  <b-cap>Карта аналогов: OpenCode, Codex, Cursor, Gemini CLI и его преемник Antigravity CLI.</b-cap>
  <b-ctx-table phone="wrap" first="34">
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
  <b-sublabel top="18">Как выбрать</b-sublabel>

  Если нужна своя модель и оплата провайдеру напрямую, смотрят на OpenCode. Если вы уже платите за ChatGPT, смотрят на Codex. Если удобнее работать в редакторе, а не в терминале, смотрят на Cursor. Если вы пользовались Gemini CLI, его место занял Antigravity CLI. Команды установки аналогов здесь не приведены: у каждого они свои и меняются. Узнать их можно на сайте самой программы.
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
  <b-why>Четыре запроса для первой сессии. Вставляйте их в Claude Code после запуска <code>claude</code> в папке проекта.</b-why>

  Запросы идут по нарастанию: сначала агент только читает и рассказывает, затем создаёт файл правил, потом вносит малую правку и в конце запускает тесты. Каждый запрос просит показать результат до записи или не менять файлы, поэтому первая сессия остаётся безопасной.
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
    <q t="Как установить Claude Code?">Откройте терминал и выполните одну команду: на macOS, Linux и WSL — curl -fsSL https://claude.ai/install.sh | bash, на Windows в PowerShell — irm https://claude.ai/install.ps1 | iex. Затем откройте новое окно терминала, проверьте claude --version и запустите claude в папке проекта. Источник: code.claude.com/docs/en/setup. Дата проверки: 18.11.2026.</q>
    <q t="Сколько стоит Claude Code?">Отдельной цены нет: Claude Code входит в подписки. На 18.11.2026 Pro стоит 20 долларов в месяц при помесячной оплате, Max — 100, Ultra — 200, место Team — 25; бесплатный тариф Claude Code не включает. Альтернатива подписке — оплата по API через Console. Источник: claude.com/pricing.</q>
    <q t="Работает ли Claude Code в России?">России нет в официальном списке поддерживаемых стран Anthropic, а Claude Code назван в условиях среди продуктов, доступных только в перечисленных странах. Любая страна вне списка считается неподдерживаемой. Условия вступили в силу 12.11.2026. Источник: anthropic.com/supported-countries. Дата проверки: 18.11.2026. Подробнее — в <a href="/blog/claude-code-access-regions-vpn-bans/">статье про доступ из России, VPN и блокировки</a>.</q>
    <q t="Чем заменить Claude Code?">Похожие агенты: OpenCode с моделью на выбор, Codex от OpenAI, редактор Cursor со встроенным агентом, у Google — Antigravity CLI вместо закрытого для обычных пользователей Gemini CLI. Доступ и цены у каждого свои, их проверяют на сайте программы.</q>
    <q t="Есть ли Claude Code в бесплатном тарифе?">Нет. Для Claude Code нужен аккаунт Pro, Max, Ultra, Team, Enterprise или Console; бесплатный тариф claude.ai доступа к нему не включает. Источник: code.claude.com/docs/en/setup.</q>
    <q t="Как понять, чем вошёл Claude Code: подпиской или ключом?">Запустите claude в папке проекта и введите /status: команда показывает активный способ входа. Если в системе задана переменная ANTHROPIC_API_KEY, Claude Code берёт ключ вместо подписки; чтобы вернуться к подписке, выполните unset ANTHROPIC_API_KEY. Источник: code.claude.com/docs/en/authentication.</q>
  </b-faq-cards>
</b-chapter>
<b-chapter id="next" title="Дальше по теме">
  <b-links cols="2">
    <item href="/blog/claude-code-access-regions-vpn-bans/" k="Доступ" t="Claude Code в России: доступ, VPN, блокировки, оплата">Что значит ограничение по странам</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="Сравнение" t="Codex или Claude Code, Cursor и Hermes Agent">Какой агент для какой задачи</item>
    <item href="/blog/specs-rules-skills/" k="Контекст" t="AGENTS.md, CLAUDE.md и spec.md: что куда класть">Файлы правил для агента</item>
    <item href="/blog/cursor-rules-vs-agents-md/" k="Правила" t="Cursor rules и AGENTS.md">Что куда класть</item>
    <item href="/blog/harness-driven-development/" k="Метод" t="Harness-Driven Development">Ошибка агента становится правилом</item>
  </b-links>
</b-chapter>
<b-footer>По документации Claude Code, claude.com/pricing, справке Claude и условиям доступа Anthropic. Дата проверки: 18.11.2026. Цены и список стран меняются.</b-footer>
</b-post>
