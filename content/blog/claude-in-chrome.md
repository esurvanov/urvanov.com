---
title: Claude in Chrome: как агент работает в вашем браузере — тест, отладка и формы под вашим входом
date: 2026-10-05
description: Claude in Chrome соединяет Claude Code с браузером: агент открывает вкладки, читает консоль, проходит сценарии и заполняет формы под вашим входом. Как подключить, что умеет и какие права выдавать.
tags: AI, агенты, Claude Code, Claude in Chrome, браузер, QA, харнесс
category: harness
layout: wide
mentions: Claude in Chrome, Claude Code, Chrome extension, browser automation, MCP, permissions, QA, Puppeteer, token cost
toc: what=Что это | connect=Подключение | gives=Что умеет | qa=Пример | risks=Права и риски | custom=Свой инструмент | first=С чего начать | next=Дальше по теме
---

Claude in Chrome подключает агента к вашему браузеру: он открывает вкладки, читает страницы и консоль, нажимает и вводит текст под вашим входом. Ниже: как это устроено, как подключить за несколько минут, что агент умеет и какие права выдавать. Этот канал использует агент из статьи [QA с агентом](/blog/bug-report-to-reproduction-agent/), а подключение устроено по аналогии с [MCP](/blog/mcp-agent-access/).

<b-post series="harness">

<b-chapter id="what" icon="monitor" title="Что такое Claude in Chrome">
  <b-why>Расширение для Chrome соединяет Claude Code с браузером. Агент открывает новые вкладки и работает в видимом окне.</b-why>
  <iso-art name="claude-in-chrome/terminal-to-browser"></iso-art>
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
    <gen>Действия видны в окне в реальном времени. На странице входа или капче агент останавливается и ждёт вас. В Claude Code расширение видно как MCP-сервер claude-in-chrome: его инструменты показывает /mcp.</gen>
    <do>Проверьте требования: расширение версии 1.0.36 и новее, Claude Code, тариф Pro, Max, Team или Enterprise, вход через /login.</do>
  </b-finding>
</b-chapter>

<b-chapter id="connect" icon="plug" title="Как подключить">
  <b-say-agent title="Скажите агенту">Открой code.claude.com/docs, найди поле поиска, введи «hooks» и перескажи, какие результаты появились.</b-say-agent>
  <b-why align="left">Если расширения нет, Claude Code предложит установить его: нужно согласиться и войти в браузере. [Если агент просит сделать это вас](/blog/agent-hands-work-back-to-you/).</b-why>
  <b-spoiler summary="Как это делается руками">
    <iso-art name="claude-in-chrome/setup-steps"></iso-art>
    <b-codebox copy>
      claude --chrome
      /chrome   # статус, права, переподключение
    </b-codebox>

<a href="https://chromewebstore.google.com/detail/claude/fcoeoabgfenejglbffodgkkbkcdhcgfn" target="_blank" rel="noopener">Расширение в Chrome Web Store</a>. Чтобы не писать флаг каждый раз, откройте /chrome и включите «Enabled by default». Инструменты браузера тогда всегда лежат в контексте, и расход токенов растёт.

    <b-spoiler summary="Если не подключается">
      <b-numchain>
        <step>Расширение включено в chrome://extensions</step>
        <step>Chrome запущен, Claude Code обновлён</step>
        <step>/chrome → Reconnect extension</step>
        <step>Первый раз: перезапустить Chrome</step>
      </b-numchain>
    </b-spoiler>
  </b-spoiler>
  <b-finding>
    <ex>Агент открывает документацию, вводит запрос в поиск и пересказывает результаты. Так проверяют, что связь работает.</ex>
    <gen>Подключение занимает минуты: расширение ставится из Chrome Web Store, остальное делает Claude Code.</gen>
    <do>Запустите пример и убедитесь, что /chrome показывает «Status: Enabled» и «Extension: Installed».</do>
  </b-finding>
</b-chapter>

<b-chapter id="gives" icon="grid-alt" title="Что умеет агент в браузере">
  <iso-art name="claude-in-chrome/browser-uses"></iso-art>
  <b-finding>
    <ex>Одна связь закрывает отладку, тесты, формы, документы и выгрузку данных.</ex>
    <gen>Агент читает консоль и DOM, проходит сценарии, заполняет формы, загружает файлы (до 10 МБ суммарно) и записывает GIF.</gen>
    <do>Возьмите одну повторяющуюся задачу в браузере и поручите её агенту.</do>
  </b-finding>
</b-chapter>

<b-chapter id="qa" icon="bug" title="Пример: баг на тестовом стенде">
  <b-why>Заявка PAY-142 из статьи [про QA с агентом](/blog/bug-report-to-reproduction-agent/): агент идёт по пути сам и приносит доказательства.</b-why>
  <b-say-agent title="Скажите агенту">Открой тестовый стенд, добавь товар в корзину, примени промокод и оплати тестовой картой. Если оплата падает, посмотри консоль и запиши GIF с путём.</b-say-agent>
  <iso-art name="claude-in-chrome/ticket-to-report"></iso-art>
  <b-finding>
    <ex>Агент проходит путь, находит ошибку в консоли и записывает GIF для заявки.</ex>
    <gen>Окно видно, поэтому QA следит за шагами и может остановить агента. Текст консоли и GIF дают проверяемый след.</gen>
    <do>Просите приложить к результату GIF и фрагмент консоли.</do>
  </b-finding>
</b-chapter>

<b-chapter id="risks" icon="shield-check" title="Права и риски">
  <iso-art name="claude-in-chrome/site-permissions"></iso-art>
  <b-rules sw="1.8">
    <rule icon="lines" t="Сайты">Какие сайты агент может открывать, нажимать и печатать, задают настройки расширения.</rule>
    <rule icon="bell" t="Запрос">Окно «Claude in Chrome wants to» разрешает действие или весь сайт на сессию.</rule>
    <rule icon="key" t="Ваши входы">Агент видит всё, куда вы вошли в этом браузере.</rule>
    <rule icon="pause" t="Вход и CAPTCHA">Агент останавливается и ждёт вас.</rule>
    <rule icon="video" t="GIF">Запись включает всё видимое, в том числе данные аккаунта: смотрите её до отправки.</rule>
    <rule icon="ban" t="Диалоги">Окна alert, confirm и prompt блокируют команды: закройте их руками и попросите агента продолжать.</rule>
  </b-rules>
  <b-cap>Текст на странице может быть адресован агенту. Разбор этого риска [в отдельной статье](/blog/data-plane-control-plane-prompt-injection/).</b-cap>
  <b-finding>
    <ex>Разрешённые сайты открыты агенту, остальные закрыты, а действия на новом сайте требуют вашего согласия.</ex>
    <gen>Агент работает с вашими входами, поэтому права сайтов служат первой линией защиты.</gen>
    <do>Откройте настройки расширения и оставьте в списке только сайты, нужные для задачи.</do>
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
  <iso-art name="claude-in-chrome/start-steps"></iso-art>
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
