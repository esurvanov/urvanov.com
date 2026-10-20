---
title: Кого звать на интервью перед покупкой AI-инструментов: восемь полярных групп
date: 2026-09-28
description: Как отобрать 16 человек по отчёту, анкете и спискам лицензий, проверить покрытие команд и замены и понять, что у них узнать.
tags: AI, custdev, исследования
category: research
layout: wide
image: /og/who-to-interview-before-buying-ai-tools.png
mentions: ChatGPT Enterprise, Codex
toc: why=Зачем выборка | top=Топ по активности | groups=Восемь групп | teams=Покрытие команд | ask=Что узнать | order=Порядок работы | next=Дальше по теме
---

<b-post series="gruppy">
<b-credit para>Дизайн выборки для интервью — по рекомендациям <a href="https://t.me/Kseniya_Vasil" target="_blank" rel="noopener">@Kseniya_Vasil</a></b-credit>
<b-gruppy-chain label="От отчёта к списку интервью">
  <stage n="340" t="Человек в отчёте" dots="340" on="5:c-code 31:c-code 58:c-work 77:c-work 96:c-chat 120:c-chat 141:c-silent 163:c-silent 187:c-none 205:c-none 226:c-light 248:c-light 269:c-proj 290:c-proj 311:c-team 333:c-team"/>
  <stage n="8" t="Полярных групп" icons="code-alt:c-code zap-alt:c-work search-alt:c-chat card:c-silent slash:c-none log-out:c-light folder:c-proj grid-sm:c-team"/>
  <stage n="16" t="Интервью" circles="c-code c-code c-work c-work c-chat c-chat c-silent c-silent c-none c-none c-light c-light c-proj c-proj c-team c-team"/>
</b-gruppy-chain>
<b-cap>Все цифры и имена — пример</b-cap>

<b-chapter id="why" icon="target" title="Какое решение поможет принять">

**Бизнес-задача** — из [отчёта](/blog/chatgpt-enterprise-usage-report/#why): для каких рабочих задач текущего набора AI-инструментов недостаточно и что проверить перед закупкой. Там же — кто принимает решение и по каким признакам. Выборка решает, чьи задачи мы увидим на интервью.

Сначала определяют, какие способы решать задачи нужно увидеть: через корпоративный AI-инструмент, через другие AI-инструменты, вручную или через коллег — и у тех, кто попробовал инструмент и бросил. [Отчёт по ChatGPT Enterprise](/blog/chatgpt-enterprise-usage-report/) — один из источников: он находит первых и бросивших. Пользователей других инструментов находят по [анкете](/blog/ai-interviews-without-leading-questions/#form) на всю компанию и по спискам лицензий и закупок.

  <b-io justify>
    <item k="Вход">Таблица людей из отчёта, анкета на всю компанию, списки лицензий и закупок</item>
    <item k="Что делает метод">Отбирает по 2 человека на каждый способ решать задачи</item>
    <item k="Решение на выходе">С кем говорить перед покупкой и что проверять — вплоть до вывода, что новый инструмент не нужен</item>
  </b-io>
</b-chapter>

<b-chapter id="top" icon="bar-chart" title="Почему одного топа по активности мало">
  <b-why>Три способа набрать 16 человек. Цвет точки — сценарий использования. Самые активные и добровольцы — хорошие респонденты, их берут в любую выборку, но одних их мало.</b-why>
  <b-gruppy-compare>
    <way kind="bad" s="мало" t="Топ по сообщениям" dots="c-chat c-chat c-chat c-chat c-chat c-chat c-work c-chat c-chat c-chat c-chat c-chat c-work c-chat c-chat c-chat">сценариев: **2 из 8**</way>
    <way kind="bad" s="мало" t="Добровольцы" dots="c-chat c-chat c-code c-chat c-code c-chat c-proj c-chat c-chat c-code c-chat c-chat c-proj c-chat c-chat c-chat">сценариев: **3 из 8**</way>
    <way kind="good" s="полно" t="Полярные группы" dots="c-code c-code c-work c-work c-chat c-chat c-silent c-silent c-none c-none c-light c-light c-proj c-proj c-team c-team">сценариев: **8 из 8**</way>
  </b-gruppy-compare>
  <b-finding>
    <ex>Топ по сообщениям покрывает 2 сценария из 8, добровольцы — 3, полярные группы — все 8.</ex>
    <gen>Самые активные и отзывчивые люди лучше всех знают инструмент, и их стоит звать. Они похожи друг на друга и вместе описывают один-два сценария. Чтобы услышать остальные, выборку добирают людьми с крайними значениями других признаков.</gen>
    <do>Возьмите 2–3 человек из топа по сообщениям. Остальные места отдайте людям с другими сценариями: тем, кто работает только через Codex, бросил инструмент, пользуется другими или ведёт много проектов.</do>
  </b-finding>
</b-chapter>

<b-chapter id="groups" icon="grid" title="Восемь групп">
  <b-why>Шесть групп находятся по порогам из отчёта, «бросили» — по дате последней активности, «другие инструменты» — по анкете. У каждой группы вопрос, который она помогает проверить. Ответ может быть любым, в том числе «новый инструмент не нужен». Пороги в примере — ориентир: подбирайте их так, чтобы в группу попадали 2–5 человек.</b-why>
  <b-gruppy-groups>
    <group icon="code-alt" color="c-code" t="Самые активные в коде" c="код &gt; $200 / 3 мес" p="Hana Sato, Luis Moreno">чего не хватает в разработке: инструмента, доступа к репозиториям — или ничего</group>
    <group icon="zap-alt" color="c-work" t="Агентные задачи" c="агент &gt; $60 / 3 мес" p="Mira Castellano, Tomás Reid">где агент не справляется и почему: данные, задача или сам агент</group>
    <group icon="search-alt" color="c-chat" t="Глубокий ресёрч" c="&gt; 3 000 сообщ., чат главный" p="Jonas Keller, Aiko Lind">как проверяют ответы и хватает ли текущего поиска</group>
    <group icon="card" color="c-silent" t="Только Codex" c="0 сообщ. и &gt; $20 / 3 мес" p="Ben Ortiz, Lena Moss">какие задачи решают без чата и нужно ли им что-то ещё</group>
    <group icon="slash" color="c-none" t="Неактивные" c="0 сообщ. и $0 за период" p="Pavel Novak, Sara Quinn">как решают свои задачи и какие варианты рассматривали</group>
    <group icon="log-out" color="c-light" t="Попробовали и бросили" c="были сообщения, 0 за последние 60 дней" p="Farah Nasser, Yara Selim">почему перестали: результат, время, безопасность или задача ушла</group>
    <group icon="folder" color="c-proj" t="Проектные организаторы" c="≥ 6 активных проектов" p="Elif Demir, Rafael Costa">что дают проекты и чего в них не хватает</group>
    <group icon="grid-sm" color="c-team" t="Другие инструменты" c="по анкете: основной AI-инструмент не корпоративный" p="Nadia Rahimi, Oskar Berg">что в другом инструменте лучше и можно ли получить это в текущем</group>
  </b-gruppy-groups>
  <b-stack label="Распределение 16 интервью по группам">
    <seg w="2" color="c-code">2</seg>
    <seg w="2" color="c-work">2</seg>
    <seg w="2" color="c-chat">2</seg>
    <seg w="2" color="c-silent">2</seg>
    <seg w="2" color="c-none" ink="ink">2</seg>
    <seg w="2" color="c-light" ink="ink">2</seg>
    <seg w="2" color="c-proj">2</seg>
    <seg w="2" color="c-team">2</seg>
  </b-stack>
  <b-legend>
    <item color="c-code">код</item>
    <item color="c-work">агент</item>
    <item color="c-chat">ресёрч</item>
    <item color="c-silent">только Codex</item>
    <item color="c-none">неактивные</item>
    <item color="c-light">бросили</item>
    <item color="c-proj">проекты</item>
    <item color="c-team">другие инструменты</item>
  </b-legend>
  <b-finding>
    <ex>16 разговоров: по двое в каждой из восьми групп.</ex>
    <gen>Двое-трое в группе показывают, повторяется ли проблема: если одно и то же говорят двое из трёх, это сигнал. Людей со средними значениями не берут: их ответы похожи на ответы соседних групп, и на 16 разговорах они не добавляют новых сценариев.</gen>
    <do>В каждой группе отсортируйте кандидатов по её порогу и возьмите двух с самыми крайними значениями, по возможности из разных команд. Если человек попал в две группы, оставьте его в той, где его значение крайнее, а во второй возьмите следующего кандидата.</do>
  </b-finding>
</b-chapter>

<b-chapter id="teams" icon="alert-circle" title="Покрытие команд и замены">
  <b-why>Отдельный шаг после набора, группы он не меняет: сколько отобранных людей пришлось на каждую команду и кем заменить отказавшихся.</b-why>
<b-table>
| Команда | Регулярно пользуются | Отобрано | Статус |
|---|---|---|---|
| Команда A | <b-bar value="74"/> | <b-gruppy-cov colors="c-code c-chat c-silent c-proj c-light"/> | <b-tag kind="ok" inline>покрыта</b-tag> |
| Команда B | <b-bar value="66"/> | <b-gruppy-cov colors="c-work c-work c-chat c-none"/> | <b-tag kind="ok" inline>покрыта</b-tag> |
| Команда C | <b-bar value="51"/> | <b-gruppy-cov colors="c-code c-silent c-none c-proj"/> | <b-tag kind="ok" inline>покрыта</b-tag> |
| Команда D | <b-bar value="34"/> | <b-gruppy-cov colors="c-team"/> | <b-tag kind="ok" inline>после замены</b-tag> |
| Команда E | <b-bar value="18"/> | <b-gruppy-cov colors="c-light c-team"/> | <b-tag kind="ok" inline>после замены</b-tag> |
</b-table>
  <b-finding>
    <ex>После набора по группам в командах D и E никого не было. Трёх кандидатов заменили на людей из D и E с тем же поведением, теперь покрыты все пять команд.</ex>
    <gen>Пороги по тратам и сообщениям ловят крайних пользователей. Команда, где все пользуются понемногу, под пороги не попадает, и её задачи выпадают из исследования. Поэтому команды проверяют отдельным шагом.</gen>
    <do>Разложите отобранных по командам. Если в команде никого нет, замените в подходящей группе одного кандидата на человека из этой команды с тем же поведением. Отказавшегося замените следующим кандидатом той же группы по её порогу.</do>
  </b-finding>
</b-chapter>

<b-chapter id="ask" icon="chat" title="Что узнать на интервью">
  <b-why>Разговор идёт от последней рабочей задачи, а не от инструмента: что нужно было получить, чем человек располагал, что выбрал и как дошёл до результата. Полный сценарий — в [статье про интервью](/blog/ai-interviews-without-leading-questions/#script).</b-why>
  <b-gruppy-phases>
    <b-gruppy-phase icon="clock-sm" color="c-chat" t="Задача">
      <item t="Последняя рабочая задача">Что нужно было получить и для кого</item>
      <item t="Средства и выбор">Чем располагали, что выбрали и почему</item>
    </b-gruppy-phase>
    <b-gruppy-phase icon="eye-wide" color="c-proj" t="Путь">
      <item t="Как дошли до результата">Что взяли как есть, что доделали сами</item>
      <item t="Затраты и ограничения">Время, данные, доступ, безопасность</item>
    </b-gruppy-phase>
    <b-gruppy-phase icon="check-thin" color="c-work" t="Удачный случай">
      <item t="Когда получилось хорошо">Что тогда было иначе</item>
    </b-gruppy-phase>
    <b-gruppy-phase icon="trend-up" color="c-code" t="Отказ и переключение">
      <item t="Бросали или меняли инструмент">На что перешли и почему</item>
    </b-gruppy-phase>
  </b-gruppy-phases>
  <b-finding>
    <ex>Шесть пунктов: четыре по одной задаче, удачный случай и отказ или переключение.</ex>
    <gen>Рассказ о прошлой задаче даёт факты: видно, где человек выбрал AI, где другой способ и почему. Удачный случай показывает, что уже работает, отказ и переключение — почему инструменты меняют. Прогноз о будущем проверить нельзя.</gen>
    <do>Попросите в первые минуты назвать последнюю рабочую задачу и ведите весь разговор по ней. Если человек не упоминает AI, спросите, какие варианты он рассматривал, а не почему он им не пользуется.</do>
  </b-finding>
</b-chapter>

<b-chapter id="order" icon="list-dotted" title="Порядок работы">
  <b-gruppy-steps>
    <step t="Собрать кандидатов в восемь групп">Шесть групп — по порогам из отчёта, «бросили» — по дате последней активности, «другие инструменты» — по анкете</step>
    <step t="Оставить по 2 человека в группе">Из разных команд, если есть выбор; один человек — только в одной группе</step>
    <step t="Проверить покрытие команд">Если в команде никого нет, заменить одного кандидата на человека из неё с тем же поведением</step>
    <step t="Назначить интервью по 30 минут">Разговор идёт от последней рабочей задачи: что нужно было получить, чем располагали, что выбрали и как дошли до результата. С бросившими отдельно обсуждают, почему перестали</step>
  </b-gruppy-steps>
  <b-gruppy-limit t="Ограничение.">16 интервью показывают, какие проблемы встречаются и как они выглядят в работе. Сколько людей в компании сталкивается с каждой из них, по 16 разговорам не посчитать. Чтобы узнать масштаб, отправьте всей компании короткую [анкету](/blog/ai-interviews-without-leading-questions/#form), которую составляют после интервью. Если проблемы не подтвердились, это тоже результат: новый инструмент не нужен.</b-gruppy-limit>
</b-chapter>

<b-chapter id="next" title="Дальше по теме">
  <b-links>
    <item href="/blog/chatgpt-enterprise-usage-report/" k="Отчёт" t="Отчёт по ChatGPT Enterprise">Как собрать отчёт об использовании, из которого берётся таблица людей</item>
    <item href="/blog/ai-interviews-without-leading-questions/" k="Интервью" t="Как провести интервью о работе с AI">Как провести разговор голосом или анкетой и собрать ответы в Airtable</item>
  </b-links>
</b-chapter>
<b-footer>Дизайн выборки для интервью — по рекомендациям <a href="https://t.me/Kseniya_Vasil" target="_blank" rel="noopener">@Kseniya_Vasil</a>. Все имена, команды и цифры в примерах вымышлены.</b-footer>
</b-post>
