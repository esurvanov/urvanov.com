---
title: Claude in Chrome: как агент работает в вашем браузере — тест, отладка и формы под вашим входом
date: 2026-10-05
updated: 2026-10-25
description: Claude in Chrome соединяет Claude Code с браузером: агент открывает вкладки, читает консоль, проходит сценарии и заполняет формы под вашим входом. Как подключить, что умеет и какие права выдавать.
tags: AI, агенты, Claude Code, Claude in Chrome, браузер, QA, харнесс
category: harness
layout: wide
mentions: Claude in Chrome, Claude Code, Chrome extension, browser automation, MCP, permissions, QA, Puppeteer, token cost
toc: what=Что это | connect=Подключение | gives=Что умеет | qa=Пример | risks=Права и риски | tradeoff=Цена гибкости | custom=Свой инструмент | first=С чего начать | next=Дальше по теме
---

Claude in Chrome подключает агента к вашему браузеру: он открывает вкладки, читает страницы и консоль, нажимает и вводит текст под вашим входом. Ниже: как это устроено, как подключить за несколько минут, что агент умеет и какие права выдавать. Этот канал использует агент из статьи [QA с агентом](/blog/bug-report-to-reproduction-agent/), а подключение устроено по аналогии с [MCP](/blog/mcp-agent-access/).

<b-post series="harness">

<b-chapter id="what" icon="monitor" title="Что такое Claude in Chrome">
  <b-why>Расширение для Chrome соединяет Claude Code с браузером. Агент открывает новые вкладки и работает в видимом окне<b-proof href="https://code.claude.com/docs/en/chrome" quote="Browser actions run in a visible Chrome window in real time."/>.</b-why>
  <iso-art name="claude-in-chrome/terminal-to-browser"></iso-art>
  <b-why align="left">На картинке три участника слева направо: Claude Code в терминале, расширение и ваш браузер. Агент отдаёт расширению команды (открыть вкладку, нажать, прочитать страницу), а расширение выполняет их в браузере, где вы уже вошли в свои сервисы. Поэтому агенту не нужно вводить пароли: сессия у вас уже открыта<b-proof href="https://code.claude.com/docs/en/chrome" quote="shares your browser's login state"/>. Работа идёт в видимом окне, и за шагами можно следить.</b-why>
  <b-why align="left">Плашки ниже показывают, с какими браузерами работает расширение. Официально поддерживаются Chrome и Edge<b-proof href="https://code.claude.com/docs/en/chrome" quote="Chrome integration works with Google Chrome and Microsoft Edge."/>. Brave, Arc, Vivaldi и Opera построены на том же движке Chromium: Claude Code находит в них расширение и подключается<b-proof href="https://code.claude.com/docs/en/chrome" quote="Claude Code also detects the extension and sets up the connection in other Chromium-based browsers"/>. Последняя плашка «WSL: нет» означает, что в подсистеме Windows для Linux (WSL) такое подключение не работает<b-proof href="https://code.claude.com/docs/en/chrome" quote="Chrome integration isn't supported in Windows Subsystem for Linux (WSL)."/>.</b-why>
  <b-pills>
    <pill>Chrome</pill>
    <pill>Edge</pill>
    <pill>Brave</pill>
    <pill>Arc</pill>
    <pill>Vivaldi</pill>
    <pill>Opera</pill>
    <pill>WSL: нет</pill>
  </b-pills>
  <b-finding>
    <ex>Агент в терминале управляет вкладками Chrome через расширение и пользуется вашими входами.</ex>
    <gen>Действия видны в окне в реальном времени. На странице входа или капче агент останавливается и ждёт вас. В Claude Code расширение видно как MCP-сервер claude-in-chrome: его инструменты показывает /mcp<b-proof href="https://code.claude.com/docs/en/chrome" quote="to see the full list of available browser tools"/>.</gen>
    <do>Проверьте требования: расширение версии 1.0.36 и новее<b-proof href="https://code.claude.com/docs/en/chrome" quote="version 1.0.36 or later"/>, Claude Code, тариф Pro, Max, Team или Enterprise<b-proof href="https://code.claude.com/docs/en/chrome" quote="A direct Anthropic plan (Pro, Max, Team, or Enterprise)"/>, вход через /login<b-proof href="https://code.claude.com/docs/en/chrome" quote="Chrome integration also requires signing in with"/>.</do>
  </b-finding>
</b-chapter>

<b-chapter id="connect" icon="plug" title="Как подключить">
  <b-say-agent title="Скажите агенту">Открой code.claude.com/docs, найди поле поиска, введи «hooks» и перескажи, какие результаты появились.</b-say-agent>
  <b-why align="left">Если расширения нет, Claude Code предложит установить его<b-proof href="https://code.claude.com/docs/en/chrome" quote="Claude Code shows an install prompt titled"/>: нужно согласиться и войти в браузере. [Если агент просит сделать это вас](/blog/agent-hands-work-back-to-you/).</b-why>
  <b-spoiler summary="Как это делается руками">
    <b-why align="left">Подключение занимает три шага. Шаг 1: поставьте расширение Claude в свой Chrome из магазина расширений, это делается один раз. Шаг 2: в терминале, где работает Claude Code, запустите команду claude --chrome, и агент соединится с браузером. Шаг 3: введите /chrome и посмотрите статус: если там «Enabled», связь работает.</b-why>
    <iso-art name="claude-in-chrome/setup-steps"></iso-art>
    <b-codebox copy>
      claude --chrome
      /chrome   # статус, права, переподключение
    </b-codebox>

<a href="https://chromewebstore.google.com/detail/claude/fcoeoabgfenejglbffodgkkbkcdhcgfn" target="_blank" rel="noopener">Расширение в Chrome Web Store</a>. Чтобы не писать флаг каждый раз, откройте /chrome и включите «Enabled by default». Инструменты браузера тогда всегда лежат в контексте, и расход токенов растёт<b-proof href="https://code.claude.com/docs/en/chrome" quote="Enabling Chrome by default increases context usage since the browser tools and their instructions are always loaded."/>.

    <b-spoiler summary="Если не подключается">
      <b-node-grid min="170">
        <node icon="check" t="Расширение включено">на странице chrome://extensions</node>
        <node icon="play" t="Chrome запущен">и Claude Code обновлён до свежей версии</node>
        <node icon="refresh-cw" t="Переподключить">команда /chrome, пункт Reconnect extension</node>
        <node icon="monitor-screen" t="Первый раз">перезапустить Chrome после установки</node>
      </b-node-grid>
    </b-spoiler>
  </b-spoiler>
  <b-finding>
    <ex>Агент открывает документацию, вводит запрос в поиск и пересказывает результаты. Так проверяют, что связь работает.</ex>
    <gen>Подключение занимает минуты: расширение ставится из Chrome Web Store, остальное делает Claude Code.</gen>
    <do>Запустите пример и убедитесь, что /chrome показывает «Status: Enabled» и «Extension: Installed»<b-proof href="https://code.claude.com/docs/en/chrome" quote="The integration is working when the status panel shows"/>.</do>
  </b-finding>
</b-chapter>

<b-chapter id="gives" icon="grid-alt" title="Что умеет агент в браузере">
  <b-why align="left">В центре картинки браузер, а вокруг него четыре вида дел, которые агент выполняет внутри него.</b-why>
  <iso-art name="claude-in-chrome/browser-uses"></iso-art>
  <b-why align="left">Первое: чтение консоли и страницы, так находят причину ошибки. Второе: прохождение сценариев и заполнение форм, так проверяют, что путь работает. Третье: работа с документами под вашим входом, то есть с тем, что без входа не открыть. Четвёртое: выгрузка данных и запись GIF, чтобы после работы остался след для проверки. Код под каждую мелочь писать не нужно: задачу ставят словами, а агент сам находит кнопки и поля.</b-why>
  <b-finding>
    <ex>Одна связь закрывает отладку, тесты, формы, документы и выгрузку данных.</ex>
    <gen>Агент читает консоль и DOM, проходит сценарии, заполняет формы, загружает файлы (до 10 МБ суммарно<b-proof href="https://code.claude.com/docs/en/chrome" quote="a single upload can include up to 10 MB of files in total"/>) и записывает GIF<b-proof href="https://code.claude.com/docs/en/chrome" quote="record browser interactions as GIFs"/>.</gen>
    <do>Возьмите одну повторяющуюся задачу в браузере и поручите её агенту.</do>
  </b-finding>
</b-chapter>

<b-chapter id="qa" icon="bug" title="Пример: баг на тестовом стенде">
  <b-why>Заявка PAY-142 из статьи [про QA с агентом](/blog/bug-report-to-reproduction-agent/): агент идёт по пути сам и приносит доказательства.</b-why>
  <b-say-agent title="Скажите агенту">Открой тестовый стенд, добавь товар в корзину, примени промокод и оплати тестовой картой. Если оплата падает, посмотри консоль и запиши GIF с путём.</b-say-agent>
  <b-why align="left">Дальше пример из статьи про QA: заявка PAY-142 и путь агента до готового результата.</b-why>
  <iso-art name="claude-in-chrome/ticket-to-report"></iso-art>
  <b-why align="left">Картинка показывает путь от заявки к результату. Заявка попадает к агенту, агент проходит в браузере корзину, промокод и оплату, находит в консоли ошибку и записывает GIF. QA получает не пересказ, а проверяемый след: текст консоли и запись движения по странице. Если запись и консоль не совпадают с отчётом, это сразу видно.</b-why>
  <b-finding>
    <ex>Агент проходит путь, находит ошибку в консоли и записывает GIF для заявки.</ex>
    <gen>Окно видно, поэтому QA следит за шагами и может остановить агента. Текст консоли и GIF дают проверяемый след.</gen>
    <do>Просите приложить к результату GIF и фрагмент консоли.</do>
  </b-finding>
</b-chapter>

<b-chapter id="risks" icon="shield-check" title="Права и риски">
  <b-why align="left">Агент работает внутри вашего браузера, поэтому всё, куда вы вошли, ему доступно. Первая линия защиты на картинке: список разрешённых сайтов и запрос разрешения на новых.</b-why>
  <iso-art name="claude-in-chrome/site-permissions"></iso-art>
  <b-why align="left">Слева на картинке решаете вы: агент спрашивает «разрешить?». В центре сайты A и B, которые вы разрешили, и на них агент работает. Справа сайт C, закрытый для агента. Действие на новом сайте начинается с вашего согласия. Ниже правила по пунктам: что агент видит, где он останавливается и на что смотреть до отправки записи.</b-why>
  <b-rules sw="1.8">
    <rule icon="lines" t="Сайты">Какие сайты агент может открывать, нажимать и печатать, задают настройки расширения.</rule>
    <rule icon="bell" t="Запрос">Окно «Claude in Chrome wants to» разрешает действие или весь сайт на сессию.</rule>
    <rule icon="key" t="Ваши входы">Агент видит всё, куда вы вошли в этом браузере.</rule>
    <rule icon="pause" t="Вход и CAPTCHA">Агент останавливается и ждёт вас.</rule>
    <rule icon="video" t="GIF">Запись включает всё видимое, в том числе данные аккаунта: смотрите её до отправки.</rule>
    <rule icon="ban" t="Диалоги">Окна alert, confirm и prompt блокируют команды: закройте их руками и попросите агента продолжать.</rule>
  </b-rules>
  <b-why align="left">Каждое из этих правил есть в документации Claude Code. Агент останавливается на входе и CAPTCHA<b-proof href="https://code.claude.com/docs/en/chrome" quote="When Claude encounters a login page or CAPTCHA, it pauses and asks you to handle it manually."/>. Запрос разрешения начинается словами «Claude in Chrome wants to»<b-proof href="https://code.claude.com/docs/en/chrome" quote="The dialog starts with"/>. Запись GIF захватывает всё видимое, включая данные аккаунта<b-proof href="https://code.claude.com/docs/en/chrome" quote="The recording captures everything visible in the browser, including account details on logged-in pages"/>. Окна alert, confirm и prompt блокируют команды<b-proof href="https://code.claude.com/docs/en/chrome" quote="JavaScript dialogs block browser events and prevent Claude from receiving commands."/>. Список сайтов задают настройки расширения<b-proof href="https://code.claude.com/docs/en/chrome" quote="Manage permissions in the Chrome extension settings to control which sites Claude can browse, click, and type on."/>.</b-why>
  <b-cap>Текст на странице может быть адресован агенту. Разбор этого риска [в отдельной статье](/blog/data-plane-control-plane-prompt-injection/).</b-cap>
  <b-finding>
    <ex>Разрешённые сайты открыты агенту, остальные закрыты, а действия на новом сайте требуют вашего согласия.</ex>
    <gen>Агент работает с вашими входами, поэтому права сайтов служат первой линией защиты.</gen>
    <do>Откройте настройки расширения и оставьте в списке только сайты, нужные для задачи.</do>
  </b-finding>
</b-chapter>

<b-chapter id="tradeoff" icon="scales" title="Цена гибкости: медленнее скрипта и с риском ошибки">
  <b-why align="left">Агент в браузере работает иначе, чем скрипт или написанная программа. Скрипт выполняет одни и те же шаги быстро и одинаково. Агент на каждом шаге читает страницу, думает и решает, что делать дальше, поэтому он медленнее и тратит токены. Он может ошибиться: нажать не ту кнопку или пересказать то, чего на странице нет, то есть [галлюцинировать](/materials/glossary/hallucination/). Взамен он справляется с задачей, которую заранее не описать в коде: страница поменялась, кнопка переехала, задача сформулирована словами. Это плата за гибкость, и платить её лучше сознательно.</b-why>
  <b-table id="agent-vs-script">

| | Скрипт | Агент в браузере |
|---|---|---|
| Скорость | быстро, одни и те же шаги | медленнее: читает и думает на каждом шаге |
| Повторяемость | одинаковый результат каждый раз | ответ может отличаться от запуска к запуску |
| Если страница изменилась | падает, пока его не поправят | подстраивается, но может ошибиться или выдумать |
| Подготовка | нужно написать и поддерживать код | достаточно описать задачу словами |
| Где подходит | массовая регулярная работа | разовая работа, разведка, нестандартные страницы |

  </b-table>
  <b-why align="left">Есть и наблюдение автора. Сервисы с репутацией строгих к автоматизации, например LinkedIn, как правило, спокойнее относятся к агенту в настоящем браузере, чем к скриптам и парсерам: действия идут из вашего окна, под вашим входом и в темпе живого человека. Гарантий это не даёт. Правила таких сервисов обычно запрещают автоматические действия, а риск блокировки аккаунта остаётся на вас. Поэтому поручайте агенту то, что вы сделали бы руками, небольшими порциями и с проверкой результата.</b-why>
  <b-cap>Скорость, ошибки агента и отношение сервисов описаны по наблюдениям автора: в документации Claude Code этого нет.</b-cap>
  <b-finding>
    <ex>Агент медленнее скрипта и может ошибиться, зато справляется там, где скрипт пришлось бы переписывать.</ex>
    <gen>Скорость и повторяемость отдают за гибкость. Проверяемый след (консоль, GIF, текст результата) возвращает контроль над ошибками.</gen>
    <do>Для разовой и нестандартной работы берите агента, для массовой и регулярной пишите скрипт. Результат агента сверяйте с тем, что видите сами.</do>
  </b-finding>
</b-chapter>

<b-chapter id="custom" icon="boxes-route" title="Когда нужен свой инструмент">
  <b-why align="left">Claude in Chrome подходит для разовой работы, а для промышленных задач часто нужен собственный инструмент.</b-why>
  <b-rules sw="1.8">
    <rule icon="code" t="Puppeteer">Библиотека, которая управляет браузером из кода: открыть страницу, нажать, достать нужное. Работает без агента на каждом шаге.</rule>
    <rule icon="page-lines" t="Страница целиком">Claude Code берёт всю страницу целиком: текст, элементы, снимки. Для разовой задачи это удобно.</rule>
    <rule icon="coin" t="Токены и скорость">Чем больше страница, тем больше токенов уходит на каждый шаг: выходит дороже и медленнее.</rule>
    <rule icon="boxes-route" t="Свой скрипт">Кастомное решение берёт только нужную часть сайта или страницы: таблицу, форму, один блок. Агент получает короткий результат.</rule>
    <rule icon="scales" t="Что выбрать">Разовая задача и разведка: Claude in Chrome. Регулярная и массовая работа с бюджетом токенов: свой скрипт, который агент вызывает как инструмент.</rule>
  </b-rules>
  <b-cap>Скрипт можно подключить к агенту через [MCP](/blog/mcp-agent-access/) или скилл: агент просит нужный кусок страницы, а не открывает её целиком.</b-cap>
  <b-finding>
    <ex>Агент читает страницу целиком и тратит на это токены и время.</ex>
    <gen>Для промышленных решений токены и скорость решают, поэтому берут только нужные части сайтов и страниц.</gen>
    <do>Разовую работу оставьте Claude in Chrome. Повторяющуюся перенесите в скрипт на Puppeteer и подключите его агенту.</do>
  </b-finding>
</b-chapter>

<b-chapter id="first" icon="flag" title="С чего начать">
  <b-why align="left">Три шага повторяют начало статьи: расширение, запуск, проверка.</b-why>
  <iso-art name="claude-in-chrome/start-steps"></iso-art>
  <b-why align="left">Для первого запуска возьмите локальный или тестовый стенд: если агент ошибётся, ничего не пострадает. Сначала попросите его только читать (открыть страницу и пересказать), потом разрешайте действия. Так вы заметите ошибки агента на безопасной задаче.</b-why>
  <b-finding>
    <ex>Три шага: расширение, запуск, проверка.</ex>
    <gen>Начните с локального стенда: ошибка там ничего не ломает.</gen>
    <do>Сегодня поставьте расширение и выполните пример с документацией.</do>
  </b-finding>
</b-chapter>

<b-chapter id="next" title="Дальше по теме">
  <b-links>
    <item href="/blog/bug-report-to-reproduction-agent/" k="Пример" t="Работа QA после поддержки с ИИ-агентом: исследование, описание и документирование через MCP и скиллы">Агент воспроизводит баг из Jira</item>
    <item href="/blog/mcp-agent-access/" k="Подключение" t="MCP для ИИ-агента: какую проблему решает и как поручить подключение агенту">Как агент получает доступ к системам</item>
    <item href="/blog/agent-hands-work-back-to-you/" k="Передача" t="Агент любит запрягать вас: как заставить его делать самому">Когда агент просит помощи человека</item>
  </b-links>
</b-chapter>
<b-footer>Заявка PAY-142 выдумана для примера. Факты о подключении и правах — по документации Claude Code: <a href="https://code.claude.com/docs/en/chrome" target="_blank" rel="noopener">Use Claude Code with Chrome</a>.</b-footer>
</b-post>
