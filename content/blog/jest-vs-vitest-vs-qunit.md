---
title: Vitest или Jest: что выбрать для JavaScript-проекта и когда хватит QUnit
date: 2026-10-25
description: Vitest или Jest: настройка, место запуска, стиль проверок. Когда брать Vitest на Vite, оставить Jest или хватит QUnit в браузере. Таблица и вопросы.
tags: AI, тестирование, JavaScript, Jest, Vitest, QUnit, Vite, Jest vs Vitest, автотесты
category: specs
layout: wide
mentions: Jest, Vitest, QUnit, Vite, Node.js, JavaScript, Jest vs Vitest, автоматические тесты, тестовый движок, снимки, подмены, покрытие кода
toc: common=Что общего | vite=Jest и Vitest | qunit=QUnit | table=Что у кого | choose=Что выбрать | faq=Вопросы | next=Дальше по теме
---

Vitest или Jest: на проекте со сборщиком Vite берите Vitest, потому что он использует те же настройки, а если Jest уже работает, оставьте его. QUnit хватит, когда тесты должны идти прямо в браузере почти без настройки. Все три запускают автоматические тесты на JavaScript и отличаются тем, где живут и сколько настройки требуют.

Эта статья родилась из другой: про [формальные модели на Quint](/blog/quint-models-find-races/) и формальную верификацию. Названия QUnit и Quint похожи, и их легко спутать, поэтому я решил отдельно написать и про тестовые движки. Как Quint отличается от них, разобрано в [сравнении Quint с тестами и TLA+](/blog/quint-vs-tests-and-tla/).

<b-post series="harness">
<b-art names="jest-vs-vitest-vs-qunit/common" wide/>

<b-chapter id="common" icon="flask" title="Что общего у Jest, Vitest и QUnit">
  <b-why align="left">Допустим, есть функция, которая складывает два числа. Тест записывает ожидание: для единицы и двойки ответ равен трём. Движок запускает функцию, сравнивает ответ с ожидаемым и сообщает, прошла проверка или упала. Тестов в проекте сотни, поэтому их запускают автоматически после каждой правки: если правка сломала то, что работало, тест падает, и это видно сразу. Все три движка делают именно это для кода на [JavaScript](/materials/glossary/javascript/), то есть запускают [автоматические тесты](/materials/glossary/automated-test/).</b-why>
  <b-why align="left">В описаниях движков встретятся три слова. **Снимок** — сохранённый эталон большого результата, например готовой разметки страницы, с которым сравнивают новый результат. **Подмена** — временная замена настоящего кода заглушкой, например настоящей отправки письма, чтобы тест не ходил наружу. **Покрытие** — отчёт о том, какие строки кода тест хотя бы раз выполнил. Поэтому выбор между движками редко решает, будут ли у проекта тесты. Он решает, сколько всего нужно настраивать и где тесты запускаются.</b-why>
  <b-finding>
    <ex>Jest, Vitest и QUnit отвечают на один и тот же вопрос: даёт ли готовая функция нужный ответ на заданные входы.</ex>
    <gen>Правила системы и порядок событий они не проверяют: для этого нужны модели вроде [Quint](/materials/glossary/quint/).</gen>
    <do>Запишите, что вы хотите проверить: функцию на заданных входах или правило, которое пересекает несколько функций.</do>
  </b-finding>
</b-chapter>

<b-chapter id="vite" icon="swap" title="Jest или Vitest: сколько мест править при настройке">
  <b-art names="jest-vs-vitest-vs-qunit/vite" wide/>
    <b-why align="left">[Jest](/materials/glossary/jest/) нацелен на работу без настройки на большинстве проектов на JavaScript<b-proof href="https://jestjs.io/" quote="Jest aims to work out of the box, config free, on most JavaScript projects."/>. Он понимает проекты на Babel, TypeScript, React, Angular и Vue. Снимки и подмены встроены, а покрытие кода включается одним флагом `--coverage` без дополнительной настройки. Тесты он запускает параллельно, каждый в своём процессе, чтобы они не влияли друг на друга, и в начале прогона ставит те, что упали в прошлый раз<b-proof href="https://jestjs.io/" quote="Jest runs previously failed tests first"/>. Стиль проверок знакомый: `test` описывает случай, `expect` сравнивает ответ.</b-why>
  <b-why align="left">[Vitest](/materials/glossary/vitest/) делает почти то же, но построен на сборщике [Vite](/materials/glossary/vite/)<b-proof href="https://vitest.dev/guide/" quote="a next generation testing framework powered by Vite"/>. Если сайт уже собирается Vite, Vitest берёт те же настройки и плагины, а Jest потребовал бы вторую, отдельную конфигурацию. Авторы Vitest прямо называют это дублированием сложности<b-proof href="https://vitest.dev/guide/comparisons" quote="two different pipelines to configure and maintain"/>. Совместимость с Jest у Vitest высокая: он поддерживает большую часть интерфейса Jest и его библиотек<b-proof href="https://vitest.dev/guide/comparisons" quote="compatibility with most of the Jest API and ecosystem libraries"/>, поэтому в большинстве проектов подходит как замена.</b-why>
  <b-why align="left">Ещё у Vitest быстрый режим наблюдения: при правке файла тесты перезапускаются мгновенно, на той же горячей замене модулей, что и в самом Vite<b-proof href="https://vitest.dev/guide/comparisons" quote="default watch mode using Vite instant Hot Module Reload"/>. В документации есть режим тестов в настоящем браузере и веб-интерфейс с результатами. Цена одна: он требует достаточно свежих Vite и [Node.js](/materials/glossary/node-js/), в документации на сегодня указаны Vite 6.4 и Node 22.12<b-proof href="https://vitest.dev/guide/" quote="Vitest requires Vite >=v6.4.0 and Node >=v22.12.0"/>.</b-why>
  <b-finding>
    <ex>На проекте с Vite Vitest экономит вторую конфигурацию, а на проекте без Vite разница между ним и Jest невелика.</ex>
    <gen>Если Jest уже работает и никому не мешает, переезд ради переезда редко окупается.</gen>
    <do>Посмотрите, как собирается ваш сайт. Если на Vite, попробуйте Vitest на одном модуле.</do>
  </b-finding>
</b-chapter>

<b-chapter id="qunit" icon="workflow" title="QUnit: когда нужны тесты прямо в браузере">
  <b-art names="jest-vs-vitest-vs-qunit/qunit-env" wide/>
    <b-why align="left">[QUnit](/materials/glossary/qunit/) описывает себя как мощный и простой в использовании движок тестов. Для Node.js ему не нужна настройка, а для браузера достаточно минимальной<b-proof href="https://qunitjs.com/" quote="Zero configuration and setup for any Node.js project"/>. Запускается он везде, где есть JavaScript: в браузерах, в Node.js, в движке SpiderMonkey и в фоновом потоке страницы<b-proof href="https://qunitjs.com/" quote="QUnit can run anywhere; web browsers, Node, SpiderMonkey, even in a Web Worker!"/>. Jest и Vitest, в отличие от него, чаще всего запускают в Node.js.</b-why>
  <b-why align="left">Стиль у него свой. Связанные тесты собирают в группу командой `QUnit.module`, отдельный тест описывают через `QUnit.test`, а ответ сверяют через `assert`. Для тестов, которые трогают страницу, есть заготовка-«стенд», которая возвращает страницу в исходный вид после каждого теста, и отдельная проверка порядка вызовов для событий и ответов с задержкой. Расширять QUnit можно под себя: свои проверки, свои запуски и свои отчёты. Старые браузеры он тоже поддерживает: версия 2 работает с Internet Explorer 9 и выше<b-proof href="https://qunitjs.com/intro/" quote="QUnit supports the following runtime environments"/>.</b-why>
  <b-finding>
    <ex>QUnit хорош там, где тесты должны идти прямо в браузере и без сборки.</ex>
    <gen>Для современных проектов со сборкой, где нужны подмены, снимки и покрытие из коробки, чаще берут Jest или Vitest.</gen>
    <do>Если тесты должны открываться в браузере как обычная страница, проверьте QUnit первым.</do>
  </b-finding>
</b-chapter>

<b-chapter id="table" icon="scales" title="Что у кого: Jest, Vitest и QUnit по пунктам">
<b-table id="jvq">

| | Jest | Vitest | QUnit |
|---|---|---|---|
| **Идея** | привычный движок с полным набором: снимки, подмены, покрытие | движок нового поколения на базе Vite | простой движок, который запускается где угодно |
| **Настройка** | своя конфигурация | та же, что у Vite | почти не нужна |
| **Где идёт** | чаще всего в Node.js | чаще всего в Node.js | браузер, Node.js, другие среды |
| **Как пишут проверку** | `test` и `expect` | `test` и `expect`, как в Jest | `QUnit.test` и `assert` |
| **Когда подходит** | Jest уже есть и работает | проект собирается Vite | тесты нужны в браузере без сборки |

</b-table>
  <b-why align="left">Таблица по строкам. «Идея» говорит, зачем движок появился. «Настройка» показывает, сколько работы до первого теста. «Где идёт» и «Как пишут проверку» важны, если у вас много готовых тестов: стиль Jest и Vitest совпадает, поэтому перенос между ними простой, а на QUnit придётся переписывать проверки.</b-why>
</b-chapter>

<b-chapter id="choose" icon="target" title="Что выбрать: Jest, Vitest или QUnit">
  <b-art names="jest-vs-vitest-vs-qunit/choose" wide/>
  <b-why align="left">Выбор определяется проектом. Проект собирается Vite: берите Vitest, настройки уже есть. В проекте уже стоит Jest и всё работает: оставьте его. Нужны проверки прямо в браузере без сборки: берите QUnit. Перенос между Jest и Vitest обычно дешёвый, поэтому ошибка выбора не станет необратимой. Если нужно проверять не функции, а правила и порядок событий, смотрите статьи [Quint против QUnit и TLA+](/blog/quint-vs-tests-and-tla/) и [про модели на Quint](/blog/quint-models-find-races/).</b-why>
  <b-finding>
    <ex>Три движка закрывают одну задачу, а решает среда: сборщик, браузер или уже готовый набор тестов.</ex>
    <gen>Независимо от выбора тесты проверяют заданные сценарии, а правила, которые ломаются в особом порядке событий, ловит модель.</gen>
    <do>Выберите движок по среде проекта и добавьте к нему проверку самих тестов: [мутационное тестирование](/materials/glossary/mutation-testing/) покажет, что тесты вообще замечают порчу.</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Частые вопросы">
  <b-faq-cards>
    <q t="Что выбрать: Jest или Vitest?">На проекте, который собирается Vite, берите Vitest: он использует те же настройки, и вторая конфигурация не нужна. Если Jest уже работает и никому не мешает, переезд редко окупается.</q>
    <q t="Чем Vitest отличается от Jest?">Vitest построен на Vite, поддерживает большую часть интерфейса Jest и быстро перезапускает тесты при правке файла. Ему нужны достаточно свежие Vite и Node.js.</q>
    <q t="Когда нужен QUnit?">Когда тесты должны идти прямо в браузере и без сборки. QUnit запускается в браузерах, в Node.js и в других средах с JavaScript, а для Node.js ему не нужна настройка.</q>
    <q t="Сложно ли перейти с Jest на Vitest?">Обычно нет: проверки в обоих пишут через `test` и `expect`, поэтому перенос между ними простой. На QUnit придётся переписывать проверки.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Дальше по теме">
  <b-links>
    <item href="/blog/quint-vs-tests-and-tla/" k="Сравнение" t="Model checking или тесты: Quint, QUnit, TLA+">Чем Quint отличается от QUnit, Jest и TLA+</item>
  <item href="/blog/quint-models-find-races/" k="Модели" t="Как найти состояние гонки: модель на Quint">Формальные модели на Quint для правил и порядка событий</item>
  <item href="/blog/tla-alloy-quint-compare/" k="Сравнение" t="TLA+, Alloy или Quint">Языки спецификаций рядом с тестовыми движками</item>
  </b-links>
</b-chapter>
<b-footer>Факты: официальные сайты Jest, Vitest и QUnit на 25 октября 2026. Выбор зависит от вашего проекта, здесь описаны общие признаки.</b-footer>
</b-post>
