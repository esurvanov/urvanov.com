---
title: Codex или ChatGPT: что выбрать для работы с кодом
seoTitle: Codex или ChatGPT: что выбрать для кода (2026)
date: 2026-11-17
updated: 2026-11-17
description: Чат отвечает текстом, агент Codex сам правит проект и гоняет тесты. Когда нужен каждый, таблица сравнения, тарифы, готовые запросы и вопросы.
tags: AI, Codex, ChatGPT, агент, харнесс, Claude Code, Cursor
category: harness
layout: wide
mentions: Codex, ChatGPT, Claude Code, Cursor, AGENTS.md
toc: answer=Быстрый ответ | table=Рядом | pick=Когда что | start=Как начать | faq=Вопросы | next=Дальше по теме
---

Codex или ChatGPT: что выбрать, решает задача. ChatGPT отвечает текстом: объясняет, пишет черновик, разбирает вставленный фрагмент. Codex работает в самом проекте: читает код, правит файлы, запускает тесты и готовит пулл-реквест. Для вопроса берите чат, для правки репозитория — Codex; он входит в тарифы ChatGPT без отдельной оплаты.

<b-post series="prompts">
<b-chapter id="answer" title="Быстрый ответ" icon="crosshair">
  <b-why>В справке OpenAI ChatGPT разделён на режимы Chat, Work и Codex; Codex выбирают, когда нужны технические подробности и работа с разработкой<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: «Select Codex when you want developer views or more technical detail, especially for software development» — learn.chatgpt.com/docs/use-chatgpt"/>.</b-why>
  <b-finding>
    <ex>Вопрос «как устроена эта функция» — в чат; задача «исправь эту функцию и прогони тесты» — Codex.</ex>
    <gen>Чат видит только то, что вы вставили, и возвращает текст, который вы переносите в проект сами. Codex сам открывает файлы репозитория, меняет их и проверяет результат командами.</gen>
    <do>Спросить, объяснить, набросать — чат. Изменить код в репозитории и проверить — Codex. Модель в обоих случаях из семейства GPT, поэтому выбор идёт по доступу к проекту.</do>
  </b-finding>
  <iso-art name="term:codex"></iso-art>
</b-chapter>
<b-chapter id="table" title="Codex и ChatGPT рядом" icon="table-grid">
  <b-why>Строки собраны из справки OpenAI о режимах и тарифах; источник у значка. Сверено 17.11.2026.</b-why>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th></th><th>ChatGPT Chat</th><th>ChatGPT Work</th><th>Codex</th></tr>
    </thead>
    <tbody>
      <tr><td>Для чего</td><td>вопрос и диалог: идеи, черновики, краткое изложение файлов<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: «Use Chat for a question or back-and-forth» — learn.chatgpt.com/docs/use-chatgpt"/></td><td>большая задача до проверяемого результата<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: «carry a larger task through to a reviewable result» — learn.chatgpt.com/docs/use-chatgpt"/></td><td>разработка: технические подробности и инженерные виды<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: для разработки — технические подробности (Codex в таблице режимов) — learn.chatgpt.com/docs/use-chatgpt"/></td></tr>
      <tr><td>Что на выходе</td><td>текст</td><td>готовый результат: документ, таблица, исследование</td><td>правки в коде, результат тестов, пулл-реквест</td></tr>
      <tr><td>Видит проект</td><td>только вставленное</td><td>то, к чему открыт доступ</td><td>читает репозиторий сам</td></tr>
      <tr><td>Где открыть</td><td>сайт и мобильное приложение<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: Chat доступен в вебе и на мобильных — learn.chatgpt.com/docs/use-chatgpt"/></td><td>сайт и приложение для компьютера; в вебе работает в управляемом облаке<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: «ChatGPT Work runs in a managed cloud environment» — learn.chatgpt.com/docs/use-chatgpt"/></td><td>приложение для компьютера, веб, терминал, расширение для IDE, облако<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: Codex в списке «Available on»: приложение для компьютера, мобильное, веб, CLI, расширение IDE, Cloud — learn.chatgpt.com/docs/use-chatgpt"/></td></tr>
      <tr><td>Тариф</td><td colspan="3">Work и Codex входят в Free, Go, Plus, Pro, Business, Edu и Enterprise; отдельной оплаты нет<b-proof href="https://learn.chatgpt.com/docs/pricing" quote="OpenAI: «ChatGPT Work and Codex are included in your ChatGPT Free, Go, Plus, Pro, Business, Edu, or Enterprise plan» — learn.chatgpt.com/docs/pricing"/></td></tr>
      <tr><td>Лимиты</td><td colspan="3">зависят от тарифа; на Free и Go Codex рассчитан на лёгкие задачи, Plus стоит 20 долларов в месяц<b-proof href="https://learn.chatgpt.com/docs/pricing" quote="OpenAI: Free — быстрые задачи по коду, Go — лёгкие задачи, Plus — $20/месяц — learn.chatgpt.com/docs/pricing"/></td></tr>
      <tr><td>Через API-ключ</td><td>—</td><td>—</td><td>терминал, SDK и IDE работают по тарифам API; облачные функции вроде проверки на GitHub в этот режим не входят<b-proof href="https://learn.chatgpt.com/docs/pricing" quote="OpenAI: ключ API даёт Codex в CLI, SDK и IDE по ставкам API; облачные функции не включены — learn.chatgpt.com/docs/pricing"/></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>Модель у всех трёх режимов из семейства GPT, различается доступ к проекту и вид результата.</b-cap>
</b-chapter>
<b-chapter id="pick" title="Когда что брать" icon="crosshair">
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>Ситуация</th><th>Что взять</th><th>Почему</th></tr>
    </thead>
    <tbody>
      <tr><td>Понять чужой фрагмент кода или ошибку из лога</td><td>ChatGPT Chat</td><td>достаточно вставить текст и получить объяснение</td></tr>
      <tr><td>Исправить баг в репозитории и проверить тестами</td><td>Codex</td><td>сам находит файл, правит и запускает тесты</td></tr>
      <tr><td>Написать письмо, ТЗ, сводку или презентацию</td><td>ChatGPT Work</td><td>результат — документ, а не код</td></tr>
      <tr><td>Большая правка по нескольким файлам, нужен пулл-реквест</td><td>Codex в облаке или в терминале</td><td>задача идёт в отдельной песочнице, на выходе правки для ревью</td></tr>
      <tr><td>Нужны другая модель или работа в редакторе</td><td><a href="/blog/ai-in-code-harness-and-tools/">Claude Code или Cursor</a></td><td>Claude Code работает на моделях Claude, Cursor подключает модели разных компаний</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-finding>
    <ex>Один и тот же день разработчика проходит через оба: утром вопрос по незнакомой библиотеке в чате, днём исправление в Codex.</ex>
    <gen>Режимы делят одну подписку, поэтому выбирать между ними на весь проект не нужно. Выбор делается на каждую задачу.</gen>
    <do>Если ответ нужно перенести в код руками больше двух раз, отдайте задачу Codex.</do>
  </b-finding>
</b-chapter>
<b-chapter id="start" title="Как начать" icon="zap">
  <b-why>Три готовых запроса: каждый называет цель, место и способ проверки. Агент сам не знает, что считать готовым, пока ему не сказали.</b-why>
  <b-codebox>
    Прочитай README и AGENTS.md. Скажи, как запускаются тесты, и прогони их, ничего не меняя. Покажи, какие падают.
    Исправь падающий тест в tests/orders.test.ts. Правь только src/orders/. После правки прогони все тесты и покажи дифф.
    Подготовь пулл-реквест из этих изменений: короткое название, что изменено и как проверить.
  </b-codebox>
  <b-finding>
    <ex>Первый запрос ничего не меняет: он проверяет, что агент находит и запускает тесты.</ex>
    <gen>Если тесты запускаются, дальше агент может проверять себя сам. Инструкции проекта он берёт из файла AGENTS.md, поэтому команды сборки и запреты стоит записать туда.</gen>
    <do>Начните с запроса на чтение и запуск, и только потом разрешайте правки.</do>
  </b-finding>
</b-chapter>
<b-chapter id="faq" icon="chat" title="Частые вопросы">
  <b-faq-cards>
    <q t="Codex и ChatGPT — это одно и то же?">Нет. ChatGPT в режиме Chat отвечает текстом, Codex работает в проекте: читает код, правит файлы, запускает тесты. Оба находятся в приложении ChatGPT и делят подписку. Источник: learn.chatgpt.com/docs/use-chatgpt, сверено 17.11.2026.</q>
    <q t="Нужно ли платить отдельно за Codex?">Нет. Codex входит в тарифы ChatGPT Free, Go, Plus, Pro, Business, Edu и Enterprise, а лимиты зависят от тарифа. При работе по API-ключу оплата идёт по ставкам API. Источник: learn.chatgpt.com/docs/pricing, сверено 17.11.2026.</q>
    <q t="Можно ли писать код только в обычном чате?">Можно: чат объяснит, напишет функцию и разберёт ошибку. Но перенос в проект и запуск тестов остаются за вами. Когда правок много, Codex сэкономит время, потому что сам открывает файлы и проверяет результат.</q>
    <q t="Что взять вместо Codex, если нужна другая модель?">Claude Code работает на моделях Claude, Cursor подключает модели разных компаний. Выбор между ними описан в отдельной статье. Источники: learn.chatgpt.com/docs и code.claude.com/docs/en/overview (сверка 15.11.2026, для этой статьи не повторялась).</q>
  </b-faq-cards>
</b-chapter>
<b-chapter id="next" title="Дальше по теме">
  <b-links cols="2">
    <item href="/blog/ai-in-code-harness-and-tools/" k="Сравнение" t="Claude Code, Codex, Cursor и Hermes Agent">Какой агент для какой задачи</item>
    <item href="/blog/specs-rules-skills/" k="Контекст" t="AGENTS.md, CLAUDE.md и spec.md: что куда класть">Какие инструкции читает агент</item>
    <item href="/blog/harness-driven-development/" k="Метод" t="Harness-Driven Development">Ошибка агента становится правилом</item>
    <item href="/blog/claude-code-install-and-price/" k="Установка" t="Claude Code: установка и цена">Команда, вход, тарифы</item>
    <item href="/blog/cursor-rules-vs-agents-md/" k="Правила" t="Cursor rules и AGENTS.md">Файл правил, который читает Codex</item>
    <item href="/materials/glossary/codex/" k="Термин" t="Codex">Что умеет, где работает</item>
  </b-links>
</b-chapter>
<b-footer>По справке OpenAI, источник у значка; сверено 17.11.2026.</b-footer>
</b-post>
