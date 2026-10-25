---
title: Какой язык формальной верификации выбрать: TLA+, Alloy или Quint
date: 2026-10-25
description: TLA+, Alloy или Quint: что описывает каждый, как записывается, чем проверяется и кому подходит. Парные сравнения, таблица и вопросы.
tags: AI, спеки, TLA+, Alloy, Quint, формальная верификация, проверка моделей, TLA+ vs Alloy, Alloy Analyzer, TLC
category: specs
layout: wide
mentions: TLA+, Alloy, Quint, Apalache, TLC, Alloy Analyzer, проверка моделей, model checking, формальная спецификация, формальные языки, TLA+ vs Alloy vs Quint, Лесли Лэмпорт
toc: idea=Одна задача | table=Сводка | tla-alloy=TLA+ и Alloy | tla-quint=TLA+ и Quint | alloy-quint=Alloy и Quint | choose=Что выбрать | faq=Вопросы | next=Дальше по теме
---

Какой язык формальной верификации выбрать, зависит от того, что ломается: TLA+ и Quint описывают поведение системы шаг за шагом, Alloy описывает объекты и связи между ними. Quint записывается как обычный код, TLA+ и Alloy как формулы. Для правил продукта во времени берут Quint, для строгих доказательств TLA+, для данных и прав Alloy.

<b-post series="harness">
<b-art names="tla-alloy-quint-compare/trio" wide/>

<b-chapter id="idea" icon="workflow" title="Чем отличаются TLA+, Alloy и Quint: одна задача, три языка">
  <b-why align="left">У всех трёх языков общая идея: правила системы записывают отдельно от кода, а программа сама ищет в них нарушение. Если нарушение есть, она показывает, как до него дойти. Это [проверка моделей](/materials/glossary/model-checking/), и у неё в каждом случае свой язык и своя проверяющая программа. [TLA+](/materials/glossary/tla-plus/) придумал Лесли Лэмпорт для описания параллельных и распределённых систем. [Alloy](/materials/glossary/alloy/) создан в группе проектирования ПО при MIT. [Quint](/materials/glossary/quint/) придуман как современная альтернатива TLA+ для инженеров.</b-why>
  <b-finding>
    <ex>TLA+, Alloy и Quint решают одну задачу: описать правила и найти цепочку, где они ломаются.</ex>
    <gen>Различия лежат в том, что именно описывают, как это записывают и чем проверяют.</gen>
    <do>Запишите три правила вашего продукта и отметьте, о чём они: о порядке событий или о связях между объектами.</do>
  </b-finding>
</b-chapter>

<b-chapter id="table" icon="scales" title="Сводка: TLA+, Alloy и Quint рядом">
  <b-art names="tla-alloy-quint-compare/kinds" wide/>
  <b-why align="left">Главное отличие: что именно описывают. TLA+ и Quint описывают поведение системы шаг за шагом: корзина, оплата, заказ, и что может пойти не так между шагами. Так находят [гонки](/materials/glossary/race-condition/) и потерянные данные. Alloy описывает структуры и связи: кто кому подчиняется, у кого какие права. Он ищет небольшой пример, где правило нарушено, например сотрудника с двумя начальниками. Остальные различия вытекают из этого.</b-why>
<b-table id="tla3">

| | TLA+ | Alloy | Quint |
|---|---|---|---|
| **Что описывают** | поведение системы шаг за шагом, особенно параллельное и распределённое | объекты и связи между ними и то, как они меняются | поведение шаг за шагом, как у TLA+ |
| **Запись** | математическая | логика отношений | похожа на обычный код |
| **Чем проверяют** | TLC или Apalache | Alloy Analyzer, он подбирает структуры под ограничения | TLC или Apalache, есть быстрый случайный прогон |
| **Что показывает** | цепочку шагов до нарушения | пример структуры, где правило нарушено | цепочку шагов до нарушения |
| **Зрелость** | с 1999 года, больше книг и примеров | с 1997 года, своё сообщество | с 2021 года, моложе |
| **Кому подходит** | тем, кому нужны строгие гарантии | тем, кто проектирует данные и права доступа | командам продукта без математической подготовки |

</b-table>
  <b-why align="left">Как читать таблицу по строкам. «Что описывают» самая важная: от неё зависит выбор. «Запись» определяет порог входа: у Quint он ниже всех, у TLA+ и Alloy нужно привыкнуть к формулам. «Чем проверяют» напоминает, что языки опираются на разные программы-проверяльщики: [Apalache](/materials/glossary/apalache/) и [TLC](/materials/glossary/tlc/) подходят и TLA+, и Quint, а у Alloy свой анализатор. «Что показывает» объясняет, что вы получите на выходе: цепочку шагов или пример структуры. «Зрелость» подсказывает, где больше примеров и людей, у которых можно спросить.</b-why>
  <b-why align="left">Граница между языками не абсолютная. В шестой версии Alloy добавил изменяемое состояние и временную логику, то есть научился описывать и шаги во времени. А Quint и TLA+ можно использовать для структур данных. Поэтому выбор определяется тем, что в вашей системе ломается чаще: порядок событий или устройство связей.</b-why>
  <b-finding>
    <ex>Если опасность в порядке событий, нужны TLA+ или Quint, а если в устройстве связей, нужен Alloy.</ex>
    <gen>Языки не конкурируют впрямую: одну и ту же систему можно описать и во времени, и по структуре.</gen>
    <do>Для каждого правила выпишите, что ломается: порядок действий или связи между объектами.</do>
  </b-finding>
</b-chapter>

<b-chapter id="tla-alloy" icon="scales" title="Чем TLA+ отличается от Alloy">
  <b-art names="tla-alloy-quint-compare/tla-vs-alloy" wide/>
<b-table id="tla-alloy">

| | TLA+ | Alloy |
|---|---|---|
| **Когда брать** | важен порядок событий | важно устройство данных и прав |

</b-table>
  <b-why align="left">TLA+ создал Лесли Лэмпорт, и в его основе лежит мысль, что точнее всего описывать вещи простой математикой<b-proof href="https://lamport.azurewebsites.net/tla/tla.html" quote="the best way to describe things precisely is with simple mathematics"/>. Он ищет цепочку шагов, на которой правило ломается, например двойную оплату и два заказа. Alloy ищет пример структуры, в которой правило нарушено, и проверяет свойства модели, строя контрпримеры<b-proof href="https://alloytools.org/about.html" quote="check properties of the model by generating counterexamples"/>. Для порядка событий берут TLA+, для связей и прав доступа Alloy.</b-why>
</b-chapter>

<b-chapter id="tla-quint" icon="code" title="Чем TLA+ отличается от Quint">
  <b-art names="tla-alloy-quint-compare/tla-vs-quint" wide/>
<b-table id="tla-quint">

| | TLA+ | Quint |
|---|---|---|
| **Когда брать** | нужна строгая математика | нужна запись, которую читает вся команда |

</b-table>
  <b-why align="left">Описывают они одно и то же, различается запись. Quint задуман как синтаксис, удобный инженерам<b-proof href="https://apalache-mc.org/" quote="The Quint language provides an engineer-friendly syntax for writing specifications."/>, а проверяют обе записи одни и те же программы. TLC перебирает состояния по одному<b-proof href="https://quint-lang.org/docs/model-checkers" quote="TLC is an explicit-state model checker"/>, а Apalache символьный и рассматривает все цепочки до заданной длины<b-proof href="https://apalache-mc.org/" quote="Bounded model checking to reason about all executions up to length k"/>.</b-why>
</b-chapter>

<b-chapter id="alloy-quint" icon="search" title="Чем Alloy отличается от Quint">
  <b-art names="tla-alloy-quint-compare/alloy-vs-quint" wide/>
<b-table id="alloy-quint">

| | Alloy | Quint |
|---|---|---|
| **Когда брать** | проектируют данные и права | проверяют правила продукта во времени |

</b-table>
  <b-why align="left">У Alloy своя программа проверки: Alloy Analyzer берёт ограничения модели и находит структуры, которые им удовлетворяют<b-proof href="https://alloytools.org/about.html" quote="takes the constraints of a model and finds structures that satisfy them"/>. Quint такой программы не имеет, его проверяют две другие, TLC и Apalache<b-proof href="https://quint-lang.org/docs/model-checkers" quote="Quint specifications can be verified by two model checkers: TLC and Apalache"/>. Поэтому выбор часто сводится к вопросу, что ломается: связи между объектами или порядок шагов.</b-why>
</b-chapter>

<b-chapter id="choose" icon="target" title="Что выбрать: TLA+, Alloy или Quint">
  <b-art names="tla-alloy-quint-compare/choose" wide/>
  <b-why align="left">Правила продукта во времени и команда без математики: берите Quint. Нужны строгие доказательства для сложной распределённой системы: берите TLA+ и закладывайте время на обучение. Нужно проверить устройство данных или права доступа: берите Alloy. Идеи из одной записи можно перенести в другую, потому что правила остаются теми же. Как Quint соотносится с тестовыми движками вроде Jest и QUnit, разобрано в статье [Quint против QUnit и TLA+](/blog/quint-vs-tests-and-tla/), а примеры найденных им ошибок есть в статье про [гонки и потерянные данные](/blog/quint-models-find-races/).</b-why>
  <b-finding>
    <ex>Три языка закрывают три разных вопроса, и выбор определяется тем, что вы описываете.</ex>
    <gen>Для продуктовой логики с агентами чаще всего хватает Quint, а Alloy удобно добавить для связей и прав.</gen>
    <do>Начните с одного правила и одного языка, а второй добавляйте, когда упрётесь в то, чего первый не описывает.</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Частые вопросы">
  <b-faq-cards>
    <q t="Чем TLA+ отличается от Alloy?">TLA+ описывает поведение системы шаг за шагом и ищет цепочку шагов, где правило ломается. Alloy описывает объекты и связи между ними и ищет пример структуры, где правило нарушено.</q>
    <q t="Чем Quint отличается от TLA+?">Описывают они одно и то же, различается запись: Quint похож на обычный код, а TLA+ записывают математической нотацией. Проверяют обе записи одни и те же программы, TLC и Apalache.</q>
    <q t="Что выбрать: TLA+, Alloy или Quint?">Для правил продукта во времени и команды без математики берите Quint, для строгих доказательств по сложной распределённой системе TLA+, для устройства данных и прав доступа Alloy.</q>
    <q t="Чем проверяют модели на TLA+, Alloy и Quint?">TLA+ и Quint проверяют программы TLC и Apalache. У Alloy свой анализатор, Alloy Analyzer: он берёт ограничения модели и находит структуры, которые им удовлетворяют.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Дальше по теме">
  <b-links>
    <item href="/blog/quint-vs-tests-and-tla/" k="Сравнение" t="Model checking или тесты: Quint, QUnit, TLA+">Чем Quint отличается от QUnit, Jest и TLA+</item>
    <item href="/blog/quint-models-find-races/" k="Модели" t="Как найти состояние гонки: модель на Quint">Формальные модели на Quint</item>
  </b-links>
</b-chapter>
<b-footer>Факты: сайты TLA+ Лесли Лэмпорта, Alloy, Quint и Apalache на 25 октября 2026. Выбор зависит от задачи, здесь описаны общие признаки.</b-footer>
</b-post>
