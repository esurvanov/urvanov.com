---
title: Как провести и проанализировать интервью о работе с AI: сценарий на 30 минут, промпт разбора и таблица в Airtable
date: 2026-09-28
description: Сценарий звонка на 30 минут, правила против ухода в сторону, короткая анкета на всю компанию, анализ интервью через ChatGPT или агента с готовым промптом и сверка «со слов» с данными отчёта.
tags: AI, custdev, интервью
category: research
layout: wide
image: /og/ai-interviews-without-leading-questions.png
mentions: Airtable, tl;dv, ChatGPT, Claude Code, Model Context Protocol
toc: format=Какой формат выбрать | prep=Подготовка ко встрече | script=Сценарий на 30 минут | focus=Как не уйти в сторону | base=Запись в Airtable | agent=Через Claude Code | wording=Текстом: формулировки | form=Анкета | after=Анализ интервью | next=Дальше по теме
---

<b-post series="intervyu">
<b-credit para>Дизайн интервью — по рекомендациям <a href="https://t.me/Kseniya_Vasil" target="_blank" rel="noopener">@Kseniya_Vasil</a>. Люди, группы и цифры для интервью — из <a href="/blog/chatgpt-enterprise-usage-report/">отчёта по ChatGPT Enterprise</a>. Там же <a href="/blog/chatgpt-enterprise-usage-report/#why">бизнес-задача</a>: какое решение принимает компания, кто и по каким признакам.</b-credit>
<b-lead tight>Анализ интервью здесь строится в четыре шага: текст разговора отдают в ChatGPT одним и тем же промптом, ответ переносят в строку человека в таблице, таблицу группируют по затруднению, а повторы проверяют анкетой на всю компанию. Слова человека сверяют с данными из отчёта. Ниже сценарий звонка, таблица и <a href="#after">промпт разбора</a>.</b-lead>
<b-flow label="Два формата интервью сходятся в одной таблице">
  <b-lane title="Голос" color="c-chat">
    <node icon="phone" t="Звонок">30 мин</node>
    <node icon="record" t='<a href="https://tldv.io/" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline;text-underline-offset:3px">tl;dv</a> · <a href="https://www.granola.ai/" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline;text-underline-offset:3px">Granola</a>'>Заметки</node>
    <node icon="file-text" t="Транскрипт">В Notes</node>
  </b-lane>
  <b-lane title="Текст" color="c-work">
    <node icon="doc-lines" t="Вопросы">В переписке</node>
    <node icon="chat" t="Уточнение">1 сообщение</node>
    <node icon="file-text" t="Переписка">Копия в Notes</node>
  </b-lane>
  <b-drop-arrows n="2"/>
  <b-airtable-preview icon="table" title='<a href="https://airtable.com" target="_blank" rel="noopener">Airtable</a>' sub="Всё в одной таблице" count="16 записей">
    <col w="1.1fr" mw="1.2fr">Имя</col>
    <col w="1.7fr" kind="note">Notes</col>
    <col w=".9fr" kind="wide">Формат</col>
    <col w="1fr" mw="1fr" kind="ours">Частота со слов</col>
    <col w="1fr" mw="1fr">По отчёту</col>
    <col w=".9fr" kind="wide">Статус</col>
    <row>Hana Sato | Ведущий [00:00]: Вспомните последний… | <b-select-pill tone="cyan">голос</b-select-pill> | <b-select-pill tone="green">каждую неделю</b-select-pill> | <b-select-pill tone="green">каждую неделю</b-select-pill> | <b-select-pill tone="green">Успех</b-select-pill></row>
    <row>Pavel Novak | [27.09 10:15] Ведущий: Опишите последнюю… | <b-select-pill tone="purple">текст</b-select-pill> | <b-select-pill tone="cyan">регулярно</b-select-pill> | <b-select-pill tone="red">не пользуется</b-select-pill><b-match-mark kind="diff">≠</b-match-mark> | <b-select-pill tone="green">Успех</b-select-pill></row>
    <row>Nadia Rahimi | Ведущий [00:00] | <b-select-pill tone="cyan">голос</b-select-pill> | <b-select-pill tone="yellow">изредка</b-select-pill> | <b-select-pill tone="yellow">изредка</b-select-pill> | <b-select-pill tone="green">Успех</b-select-pill></row>
  </b-airtable-preview>
</b-flow>
<b-chapter id="format" icon="split" title="Какой формат выбрать">
  <b-table>
    <table><thead><tr><th>Критерий</th><th><b-icon name="mic" sw="2.2"/> Голос</th><th><b-icon name="lines" sw="2.2"/> Текст</th></tr></thead><tbody>
    <tr><td>Глубина ответа</td><td><b-rating value="5" of="5" label="5 из 5"/></td><td><b-rating value="2" of="5" label="2 из 5"/></td></tr>
    <tr><td>Можно уточнить на ходу</td><td><b-rating value="5" of="5" label="5 из 5"/></td><td><b-rating value="1" of="5" label="1 из 5"/></td></tr>
    <tr><td>Сколько людей охватить</td><td><b-rating value="2" of="5" label="2 из 5"/></td><td><b-rating value="5" of="5" label="5 из 5"/></td></tr>
    <tr><td>Время респондента</td><td>30 мин</td><td>10 мин</td></tr>
    <tr><td>Риск уйти в сторону</td><td><b-rating value="4" of="5" warn label="4 из 5"/></td><td><b-rating value="1" of="5" warn label="1 из 5"/></td></tr>
    </tbody></table>
  </b-table>
  <b-cap>Точки — оценка от 1 до 5. Для риска больше точек — хуже.</b-cap>
  <b-sublabel top="22">Микс: формат выбирает респондент</b-sublabel>
  <b-choice-flow label="Голос или текст — выбирает респондент">
    <step t="Приглашение">В личном сообщении</step>
    <step t="Готов созвониться?">30 минут</step>
    <opt k="да" tone="cyan" pill="голос">звонок с ассистентом для заметок</opt>
    <opt k="нет" tone="purple" pill="текст">те же вопросы по одному в переписке</opt>
  </b-choice-flow>
  <b-finding>
    <ex>Голос даёт 5 из 5 по глубине, текст — 5 из 5 по охвату. Формат выбирает сам человек.</ex>
    <gen>Когда человек сам выбирает формат, отказов меньше. Глубина у форматов разная: звонок даёт подробный рассказ с уточнениями, переписка — короткие ответы. Поэтому ответы из переписки помогают найти случаи и темы, но их не приравнивают к звонкам. Голос — основной формат, переписка — для тех, кому неудобен звонок. Анкета на всю компанию — отдельный инструмент, её составляют после интервью.</gen>
    <do>В приглашении предложите оба формата одной фразой: «Созвонимся на 30 минут или отвечу на вопросы в переписке — как удобнее?»</do>
  </b-finding>
</b-chapter>
<b-chapter id="prep" icon="mic" title="Подготовка ко встрече">
  <b-todo>
    <item t="Предупредить про ассистента для заметок">В приглашении и в начале звонка: ассистент ведёт заметки и расшифровку, их видим только мы, в отчёт ответы попадают без имени. С <b-ink-link href="https://www.granola.ai/">Granola</b-ink-link> звук не сохраняется</item>
    <item t='<a href="https://tldv.io/" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline;text-underline-offset:3px">tl;dv</a> или <a href="https://www.granola.ai/" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline;text-underline-offset:3px">Granola</a>'><b-ink-link href="https://tldv.io/">tl;dv</b-ink-link> подключён к календарю и сам заходит во встречу Google Meet или Zoom. <b-ink-link href="https://www.granola.ai/">Granola</b-ink-link> работает без бота, со звуком компьютера, и хранит только расшифровку и заметки</item>
    <item t="Строка в Airtable создана заранее">Имя, группа и цифры из <a href="/blog/chatgpt-enterprise-usage-report/#people">таблицы всех людей</a>, статус «В работе» — до первого сообщения</item>
    <item t="Гайд открыт на втором экране">Семь блоков сценария и таймер на 30 минут</item>
    <item t="Один ведущий, без конспекта">Расшифровку делает <b-ink-link href="https://tldv.io/">tl;dv</b-ink-link> или <b-ink-link href="https://www.granola.ai/">Granola</b-ink-link>, разбор — ChatGPT</item>
  </b-todo>
  <b-finding>
    <do>До встречи проверьте, что <b-ink-link href="https://tldv.io/">tl;dv</b-ink-link> видит встречу в календаре или <b-ink-link href="https://www.granola.ai/">Granola</b-ink-link> запущена на компьютере, и заведите строку в Airtable — тогда на звонке останутся только вопросы.</do>
  </b-finding>
</b-chapter>
<b-chapter id="script" icon="clock" title="Сценарий на 30 минут">
  <b-share-bar kind="time" label="30">
    <seg w="2" color="c-none" ink="ink">2</seg>
    <seg w="3" color="c-light">3</seg>
    <seg w="8" color="c-chat">8</seg>
    <seg w="5" color="c-proj">5</seg>
    <seg w="4" color="c-team">4</seg>
    <seg w="5" color="c-work">5</seg>
    <seg w="3" color="c-none" ink="ink">3</seg>
  </b-share-bar>
  <b-cap>Минуты на блок</b-cap>
  <b-call-script>
    <step color="c-none" ink="ink" t="Вступление" q="«Я изучаю, как в компании на самом деле решают рабочие задачи. Это не оценка вас. Мне одинаково полезны и удачные, и неудачные случаи. Со мной ассистент для заметок: расшифровку видим только мы, в отчёт ответы попадут без имени. Можно его подключить?»"></step>
    <step color="c-light" t="Роль и контекст" q="«Чем вы занимаетесь большую часть недели?»">Какие задачи повторяются · где ищете информацию и делаете черновики</step>
    <step color="c-chat" t="Последняя рабочая задача" q="«Вспомните последнюю рабочую задачу, которая заняла у вас заметное время. Что нужно было получить?»">Какими средствами располагали · что выбрали и почему · как дошли до результата</step>
    <step color="c-proj" t="Результат и затраты" q="«Что получилось в итоге и сколько сил это заняло?»">Что взяли как есть · что доделали сами · какие были ограничения: данные, доступ, безопасность</step>
    <step color="c-team" t="Удачный случай" q="«Вспомните, когда похожая задача получилась хорошо. Что тогда было иначе?»">Инструмент · данные · подготовка</step>
    <step color="c-work" t="Отказ и переключение" q="«Бывало, что вы переставали пользоваться инструментом или переходили на другой? Как это было?»">Какой инструмент · на что перешли · почему. Если такого не было — пропустить</step>
    <step color="c-none" ink="ink" t="Завершение" q="«О чём я не спросил, но это важно, чтобы понять вашу работу?»">Поблагодарить · сказать, что ответы пойдут в общий разбор без имён</step>
  </b-call-script>
  <b-branch icon="git-branch" t="Если человек не упоминает AI">Не спрашивать, почему он им не пользуется. Спросить, как он решил задачу и какие варианты рассматривал. Про AI спрашивать, только если человек сам назвал его возможным вариантом</b-branch>
  <b-finding>
    <ex>Последняя задача, результат и затраты занимают 13 из 30 минут, удачный случай и отказ или переключение — ещё 9.</ex>
    <gen>Разговор строится вокруг работы, а не инструмента. Так видно, где AI помогает, где человек выбрал другой способ и где новый инструмент не нужен. Удачный случай показывает, что уже работает, отказ и переключение — почему инструмент меняют.</gen>
    <do>Поставьте таймер: к 5-й минуте переходите к последней рабочей задаче. Если не успели, сократите контекст до одного вопроса. Тему задачи подбирайте под человека: его задачи видны в <a href="/blog/chatgpt-enterprise-usage-report/#projects">«Темах проектов»</a>.</do>
  </b-finding>
</b-chapter>
<b-chapter id="focus" icon="target" title="Как не уйти в сторону">
  <b-rules>
    <rule icon="parking" t="Парковка">Посторонняя тема записывается в отдельное поле, к ней возвращаются в последние 2 минуты</rule>
    <rule icon="one" t="Один вопрос за раз">Без «и ещё…» в той же фразе</rule>
    <rule icon="undo" t="Назад к случаю">Общая оценка → «можете вспомнить конкретный раз?»</rule>
    <rule icon="shield-off" t="Не защищать инструмент">На критику — только «что было дальше?»</rule>
    <rule icon="pause" t="Пауза 5 секунд">После ответа молчать: люди сами добавляют главное</rule>
    <rule icon="bulb-off" t="Не предлагать решения">Ни своих идей, ни названий других продуктов</rule>
  </b-rules>
  <b-sublabel top="22">Ситуация → что сказать</b-sublabel>
  <b-table>
    <table><thead>
    <tr><th>Ситуация</th><th>Реплика ведущего</th></tr>
    </thead><tbody>
    <tr><td>Просит новую функцию</td><td>«Когда она понадобилась в последний раз? Что вы тогда сделали?»</td></tr>
    <tr><td>Уходит в жалобы на процессы</td><td>«Запишу на парковку. Вернёмся к задаче с отчётом: что было после?»</td></tr>
    <tr><td>Отвечает «обычно» и «всегда»</td><td>«А в последний раз как было?»</td></tr>
    <tr><td>Спрашивает мнение ведущего</td><td>«Расскажу в конце. Сейчас важнее, как это у вас»</td></tr>
    <tr><td>Время блока вышло</td><td>«Это важно, пометим. Перейду к следующему вопросу»</td></tr>
    </tbody></table>
  </b-table>
  <b-finding>
    <ex>Пять типовых ситуаций, в каждой — реплика, которая возвращает к эпизоду.</ex>
    <gen>За просьбой о функции стоит конкретный случай, его и нужно достать. Сама формулировка просьбы полезна позже, как подсказка, где искать проблему.</gen>
    <do>Держите таблицу реплик рядом с гайдом и записывайте каждую просьбу о функции дословно в отдельное поле таблицы для посторонних тем.</do>
  </b-finding>
</b-chapter>
<b-chapter id="base" icon="table" title="Запись в Airtable">
  <b-why>Таблица держит всех людей выборки, их разговоры и данные отчёта в одном месте. <b>Решение:</b> кого ещё пригласить, чтобы в каждой группе хватило интервью, кому отправить уточнение и какие расхождения «со слов» и «по отчёту» обсудить с человеком.</b-why>
  <b-pipe label="Путь записи от звонка до таблицы">
    <node icon="record" color="c-chat" sub="Транскрипт"><b-ink-link href="https://tldv.io/">tl;dv</b-ink-link> · <b-ink-link href="https://www.granola.ai/">Granola</b-ink-link></node>
    <node icon="table" color="c-proj" sub="Поле Notes в строке человека"><b-ink-link href="https://airtable.com" plain>Airtable</b-ink-link></node>
  </b-pipe>
  <b-tool-links>
    <item href="https://airtable.com" icon="external" sub="База и формы">Airtable</item>
    <item href="https://tldv.io" icon="external" sub="Заметки и расшифровка звонков">tl;dv</item>
    <item href="https://www.granola.ai/" icon="external" sub="Заметки без бота, звук не хранится">Granola</item>
  </b-tool-links>
  <b-cap>Голос: транскрипт из <b-ink-link href="https://tldv.io/">tl;dv</b-ink-link> или <b-ink-link href="https://www.granola.ai/">Granola</b-ink-link> копируется в поле Notes. Текст: переписка копируется в то же поле с датой и временем каждого сообщения.</b-cap>
  <b-sublabel top="22">Одна таблица: строка — человек</b-sublabel>
  <b-airtable-grid foot="16 записей · показаны 9">
    <field type="A" kind="name">Имя</field>
    <field type="≡" kind="note">Notes</field>
    <field type="◉">Формат</field>
    <field type="◉">Группа</field>
    <field type="◉">Статус</field>
    <field type="◉" kind="ours">Частота · со слов</field>
    <field type="◉">Частота · по отчёту</field>
    <field type="ƒ" kind="mark">≠</field>
    <field type="#" kind="num">Токены · 3 мес</field>
    <field type="#" kind="num">$ / 3 мес</field>
    <field type="▦" kind="num">Активность</field>
    <row>Hana Sato | Ведущий [00:00]: Вспомните последний раз, когда… | <b-select-pill tone="cyan">голос</b-select-pill> | код | <b-select-pill tone="green">Успех</b-select-pill> | <b-select-pill tone="green">каждую неделю</b-select-pill> | <b-select-pill tone="green">каждую неделю</b-select-pill> | <b-match-mark kind="same">=</b-match-mark> | 21,9 млн | 438 | 25.09</row>
    <row>Luis Moreno | Ведущий [00:00]: Спасибо, что нашли время… | <b-select-pill tone="cyan">голос</b-select-pill> | код | <b-select-pill tone="green">Успех</b-select-pill> | <b-select-pill tone="cyan">регулярно</b-select-pill> | <b-select-pill tone="green">каждую неделю</b-select-pill> | <b-match-mark kind="diff">≠</b-match-mark> | 12,7 млн | 396 | 24.09</row>
    <row>Mira Castellano | [26.09 18:40] Ведущий: Какой результат вы ждали… | <b-select-pill tone="purple">текст</b-select-pill> | агент | <b-select-pill tone="yellow">Не все вопросы</b-select-pill> | <b-select-pill tone="cyan">регулярно</b-select-pill> | <b-select-pill tone="cyan">регулярно</b-select-pill> | <b-match-mark kind="same">=</b-match-mark> | 3,9 млн | 97 | 26.09</row>
    <row>Jonas Keller | Ведущий [00:00]: Чем вы заняты большую часть… | <b-select-pill tone="cyan">голос</b-select-pill> | ресёрч | <b-select-pill tone="green">Успех</b-select-pill> | <b-select-pill tone="green">каждую неделю</b-select-pill> | <b-select-pill tone="green">каждую неделю</b-select-pill> | <b-match-mark kind="same">=</b-match-mark> | 1,1 млн | 19 | 26.09</row>
    <row>Ben Ortiz |  |  | только Codex | <b-select-pill tone="cyan">Жду ответа</b-select-pill> |  | <b-select-pill tone="purple">только Codex</b-select-pill> |  | 3,2 млн | 64 | 22.09</row>
    <row>Pavel Novak | [27.09 10:15] Ведущий: Опишите последнюю задачу… | <b-select-pill tone="purple">текст</b-select-pill> | неактивные | <b-select-pill tone="green">Успех</b-select-pill> | <b-select-pill tone="cyan">регулярно</b-select-pill> | <b-select-pill tone="red">не пользуется</b-select-pill> | <b-match-mark kind="diff">≠</b-match-mark> | 0 | 0 | —</row>
    <row>Sara Quinn |  |  | неактивные | <b-select-pill tone="red">Отказ</b-select-pill> |  | <b-select-pill tone="red">не пользуется</b-select-pill> |  | 0 | 0 | —</row>
    <row>Nadia Rahimi | Ведущий [00:00]: Что вы делали вчера в ChatGPT… | <b-select-pill tone="cyan">голос</b-select-pill> | другие инструменты | <b-select-pill tone="green">Успех</b-select-pill> | <b-select-pill tone="yellow">изредка</b-select-pill> | <b-select-pill tone="yellow">изредка</b-select-pill> | <b-match-mark kind="same">=</b-match-mark> | 0,3 млн | 6 | 20.09</row>
    <row>Elif Demir |  |  | проекты | <b-select-pill tone="gray">В работе</b-select-pill> |  | <b-select-pill tone="green">каждую неделю</b-select-pill> |  | 1,8 млн | 41 | 27.09</row>
  </b-airtable-grid>
  <b-cap>Оранжевое поле ChatGPT заполняет по разговору из Notes. «По отчёту», «Токены», «$» и «Активность» берутся из <a href="/blog/chatgpt-enterprise-usage-report/">отчёта по ChatGPT Enterprise</a>. Поле «≠» — формула, которая сравнивает две частоты.</b-cap>
  <b-sublabel top="22">Разбор таблицы: что даёт каждый столбец</b-sublabel>
  <b-table>
    <table><thead>
    <tr><th>Столбец</th><th>Откуда</th><th>На что влияет</th></tr>
    </thead><tbody>
    <tr><td>Имя · Группа</td><td><a href="/blog/who-to-interview-before-buying-ai-tools/#groups">выборка «Восемь групп»</a></td><td>какой способ решать задачи представляет человек</td></tr>
    <tr><td>Notes</td><td><b-ink-link href="https://tldv.io/">tl;dv</b-ink-link>, <b-ink-link href="https://www.granola.ai/">Granola</b-ink-link> или переписка</td><td>источник всех полей; любой вывод сверяется с цитатой</td></tr>
    <tr><td>Формат</td><td>ведущий</td><td>глубина ответа: в переписке меньше деталей, чем в звонке</td></tr>
    <tr><td>Статус</td><td>ведущий</td><td>следующее действие: напомнить, уточнить или заменить человека</td></tr>
    <tr><td>Частота · со слов</td><td>ChatGPT берёт из разговора</td><td>как часто человек, по его словам, пользуется AI</td></tr>
    <tr><td>Частота · по отчёту</td><td><a href="/blog/chatgpt-enterprise-usage-report/#depth">отчёт · глубина проникновения</a></td><td>как часто он пользуется по данным консоли</td></tr>
    <tr><td>≠</td><td>формула Airtable: сравнивает две частоты</td><td>не совпало — вопрос для уточнения на интервью: отчёт видит только корпоративный инструмент за 3 месяца</td></tr>
    <tr><td>Токены · 3 мес</td><td>отчёт · <a href="/blog/chatgpt-enterprise-usage-report/#top-spend">топ по расходам</a></td><td>объём работы в корпоративном инструменте за 3 месяца — для выборки, не для веса ответа</td></tr>
    <tr><td>$ · 3 мес</td><td>отчёт · таблица лидеров</td><td>траты за 3 месяца — для выборки, не для веса ответа</td></tr>
    <tr><td>Активность</td><td>отчёт · выгрузка пользователей</td><td>дата последнего действия: давно — кандидат в группу «Попробовали и бросили»</td></tr>
    </tbody></table>
  </b-table>
  <b-sublabel top="22">Как читать строки примера</b-sublabel>
  <b-table>
    <table><thead>
    <tr><th>Строка</th><th>Сигнал</th><th>Что делать</th></tr>
    </thead><tbody>
    <tr><td>Hana Sato</td><td>частоты совпали · $438 на код · <b-select-pill tone="green">Успех</b-select-pill></td><td>самые большие траты на код: разговор о её последней задаче покажет, хватает ли текущего инструмента</td></tr>
    <tr><td>Luis Moreno</td><td><b-match-mark kind="diff">≠</b-match-mark> говорит «регулярно», по факту каждую неделю</td><td>уточнить: какие задачи он считает работой с AI</td></tr>
    <tr><td>Pavel Novak</td><td><b-match-mark kind="diff">≠</b-match-mark> «регулярно» при нуле токенов</td><td>уточнить: какими инструментами и для каких задач он пользуется</td></tr>
    <tr><td>Mira Castellano</td><td><b-select-pill tone="yellow">Не все вопросы</b-select-pill></td><td>отправить одно уточнение: где в задаче пришлось доделывать вручную</td></tr>
    <tr><td>Ben Ortiz</td><td><b-select-pill tone="cyan">Жду ответа</b-select-pill> · только Codex · $64</td><td>напомнить: без него группа «Только Codex» останется пустой</td></tr>
    <tr><td>Sara Quinn</td><td><b-select-pill tone="red">Отказ</b-select-pill></td><td>заменить по <a href="/blog/who-to-interview-before-buying-ai-tools/#teams">правилу замены</a>: следующий кандидат группы «Неактивные»</td></tr>
    <tr><td>Elif Demir</td><td><b-select-pill tone="gray">В работе</b-select-pill> · 7 активных проектов</td><td>назначить звонок, частоту со слов заполнить после разговора</td></tr>
    </tbody></table>
  </b-table>
  <b-sublabel top="22">Со слов и по данным: что уточнить на интервью</b-sublabel>
  <b-vs-grid>
    <h>Замер в интервью</h>
    <h>Пара в отчёте</h>
    <h>Если не совпало — уточнить</h>
    <c><b>Как часто пользуется</b></c>
    <c><a href="/blog/chatgpt-enterprise-usage-report/#depth">активность по неделям</a></c>
    <c>какими инструментами и для каких задач человек пользуется</c>
    <c><b>Основная задача</b></c>
    <c><a href="/blog/chatgpt-enterprise-usage-report/#main-tool">основной инструмент</a></c>
    <c>какие задачи человек считает работой с AI</c>
    <c><b>Сколько задач закрывает</b></c>
    <c><a href="/blog/chatgpt-enterprise-usage-report/#projects">число проектов</a></c>
    <c>какие из проектов живые и для каких задач</c>
    <c><b>Чем ещё пользуется</b></c>
    <c><a href="/blog/chatgpt-enterprise-usage-report/#connectors">коннекторы</a></c>
    <c>что это за инструменты и для каких задач — записать как способ решения</c>
    <c><b>Сколько времени экономит</b></c>
    <c>нет пары</c>
    <c>только со слов</c>
  </b-vs-grid>
  <b-cap>Границы данных: отчёт видит только корпоративный инструмент и только за 3 месяца. Личные аккаунты и другие инструменты в него не попадают, поэтому несовпадение — вопрос для уточнения, а не вывод.</b-cap>
  <b-sublabel top="22">Статусы 16 приглашённых</b-sublabel>
  <b-share-bar kind="status" label="Распределение статусов">
    <seg w="9" color="pg" ink="pg-i">Успех · 9</seg>
    <seg w="2" color="py" ink="py-i">2</seg>
    <seg w="2" color="pc" ink="pc-i">2</seg>
    <seg w="2" color="pn" ink="pn-i">2</seg>
    <seg w="1" color="pr" ink="pr-i">1</seg>
  </b-share-bar>
  <b-legend>
    <item color="pg">Успех</item>
    <item color="py">Не все вопросы</item>
    <item color="pc">Жду ответа</item>
    <item color="pn">В работе</item>
    <item color="pr">Отказ</item>
  </b-legend>
  <b-finding>
    <ex>9 из 16 приглашённых дали интервью: доля «Успех» — 56%. У Pavel Novak частота со слов не совпала с отчётом.</ex>
    <gen>Одна строка на человека держит вместе данные отчёта, формат, сырой разговор и статус. По статусам видно, хватает ли людей: доля «Успех» среди приглашённых показывает, сколько приглашать, чтобы в каждой группе было нужное число интервью. Расхождение «со слов» и «по отчёту» — вопрос для уточнения: отчёт видит только корпоративный инструмент за 3 месяца.</gen>
    <do>Обновляйте статус сразу после разговора. Держите в каждой группе нужное число интервью: при доле «Успех» 56% на два интервью в группе приглашайте четырёх человек. Всем со статусом «Не все вопросы» отправляйте одно уточнение.</do>
  </b-finding>
</b-chapter>
<b-chapter id="wording" icon="lines" title="Текстом: формулировки">
  <b-why>В переписке и в анкете переспросить сложно, поэтому неудачный вопрос портит ответ без возможности исправить. Пять типичных ошибок:</b-why>
  <b-question-pairs>
    <pair tag="наводящий" bad="Насколько вам удобно пользоваться инструментом?">Опишите последнюю рабочую задачу, которая заняла у вас заметное время.</pair>
    <pair tag="провокационный" bad="Почему вы не пользуетесь инструментом, если компания за него платит?">Как вы сделали последнюю задачу такого типа? Какие варианты рассматривали?</pair>
    <pair tag="запрос функций" bad="Каких функций вам не хватает?">В какой момент последней задачи вам пришлось доделывать работу вручную?</pair>
    <pair tag="гипотетический" bad="Стали бы вы пользоваться чаще, если бы появился агент?">Что вы сделали в последний раз, когда результат вас не устроил?</pair>
    <pair tag="двойной" bad="Что вы делаете в инструменте и как часто?">Какую последнюю задачу вы делали с помощью AI?</pair>
  </b-question-pairs>
  <b-finding>
    <ex>Все пять исправленных вопросов спрашивают о прошлом эпизоде.</ex>
    <gen>Вопросы об удобстве, функциях и будущем собирают мнения. Решение о покупке опирается на то, что люди уже сделали, поэтому хороший вопрос спрашивает о конкретном прошлом случае.</gen>
    <do>Перечитайте вопросы для переписки и анкеты и перепишите каждый вопрос со словами «удобно», «хотели бы», «каких функций» в вопрос о последней рабочей задаче.</do>
  </b-finding>
</b-chapter>
<b-chapter id="agent" icon="terminal" title="Заполнить таблицу через Claude Code">
  <b-why>Всю таблицу можно поручить агенту: Claude Code или любой другой агент с поддержкой MCP подключается к Airtable и сам заводит строки, подтягивает данные отчёта и разбирает разговоры.</b-why>
  <b-pipe label="Агент заполняет таблицу">
    <node icon="terminal" color="c-code" sub="Или любой агент с поддержкой MCP"><b-ink-link href="https://code.claude.com/docs" plain>Claude Code</b-ink-link></node>
    <node icon="plug" color="c-light" sub="Чтение и запись таблицы">Airtable MCP</node>
    <node icon="table" color="c-proj" sub="Все поля и статусы">Airtable</node>
  </b-pipe>
  <b-todo top="12">
    <item t="Создать строки">Из списка отобранных для интервью людей: имя, группа, статус</item>
    <item t="Подтянуть данные отчёта">Токены, $, активность, частота по отчёту</item>
    <item t="Разобрать Notes">Тем же промптом, что и в ChatGPT: поля, затруднения, частота со слов, цитаты</item>
    <item t="Обновить статусы">«Не все вопросы» (ответ неполный), если в разборе есть «нет данных»</item>
  </b-todo>
  <b-tool-links>
    <item href="https://support.airtable.com/docs/using-the-airtable-mcp-server" icon="external" sub="Как подключить">Airtable MCP</item>
  </b-tool-links>
  <b-finding>
    <ex>Агент заводит строки, подтягивает отчёт, разбирает Notes и обновляет статусы — четыре шага без ручного ввода.</ex>
    <gen>Через MCP агент работает с таблицей напрямую, и исследователю остаются разговоры и проверка выводов по цитатам. Один промпт разбора у агента и в ChatGPT делает строки сопоставимыми.</gen>
    <do>Подключите Airtable MCP к Claude Code и начните с одной команды: «Создай строки для людей из списка со статусом „В работе“».</do>
  </b-finding>
</b-chapter>
<b-chapter id="form" icon="doc-lines" title="Анкета">
  <b-why>Анкету составляют после интервью, когда понятно, какие задачи и затруднения встречаются. Её отправляют всей компании, чтобы узнать, насколько они распространены. Вопросы короткие, варианты ответа берут из разбора интервью.</b-why>
  <b-survey>
    <q t="Какие из этих задач вы делаете по работе?" color="c-proj" tag="задачи">выбор: задачи из интервью · другое — открытое поле</q>
    <q t="Как часто вы делаете эти задачи?" color="c-proj" tag="частота задач">выбор: каждый день · каждую неделю · реже · не делаю</q>
    <q t="Какими инструментами вы их делаете?" color="c-proj" tag="инструменты">выбор: ChatGPT · Claude · Cursor · другой AI-инструмент · не использую AI</q>
    <q t="С какими затруднениями вы сталкиваетесь в этих задачах?" color="c-proj" tag="затруднения">выбор: затруднения из интервью · не сталкиваюсь · другое — открытое поле</q>
    <q t="Как часто это затруднение мешает?" color="c-proj" tag="частота затруднений">выбор: почти в каждой задаче · иногда · редко</q>
    <q t="Насколько это важно для результата?" color="c-proj" tag="важность последствий">выбор: сильно мешает · мешает · почти не мешает</q>
    <q t="Как вы сейчас обходите это затруднение?" tag="обходные способы">открытое поле · не обхожу</q>
    <q t="Что ещё важно, но не вошло в вопросы?" tag="неучтённое">открытое поле</q>
  </b-survey>
  <b-finding>
    <ex>Восемь коротких вопросов: шесть с вариантами из интервью и два открытых поля.</ex>
    <gen>Интервью показывает, какие задачи и затруднения бывают, анкета — у скольких людей они встречаются и насколько мешают. Варианты «не сталкиваюсь», «не использую AI» и открытое поле ловят то, чего на интервью не было.</gen>
    <do>Соберите варианты ответа из разбора интервью и отправьте анкету всей компании. Посчитайте, какая доля людей сталкивается с каждым затруднением, как часто и насколько оно мешает. Эти доли — вход в <a href="/blog/chatgpt-enterprise-usage-report/#decision">процедуру решения</a> в отчёте.</do>
  </b-finding>
</b-chapter>
<b-chapter id="after" icon="bulb" title="Анализ интервью: промпт разбора и сверка с данными отчёта">
  <b-steps round>
    <step t="Отдать текст из Notes в ChatGPT">Одним и тем же промптом для всех интервью</step>
    <step t="Перенести ответ ChatGPT в строку человека">Задача, контекст, выбранный способ, результат, затраты, ограничения, затруднения, частота со слов</step>
    <step t="Сгруппировать таблицу по затруднению">Люди с одним и тем же затруднением окажутся рядом: видно, сколько их и из каких групп</step>
    <step t="Проверить анкетой">Повторы становятся вариантами ответа в анкете на всю компанию; разбивку по командам сверяют с <a href="/blog/chatgpt-enterprise-usage-report/#uniformity">«Однородностью»</a></step>
  </b-steps>
  <b-subhead>Промпт для анализа интервью</b-subhead>
  <b-prompt>
    Ниже разговор с сотрудником о рабочих задачах.
    Верни строго по полям, только то, что человек сказал сам:
    1. Задача — последняя конкретная рабочая задача
    2. Контекст — для кого и зачем, какими средствами располагал
    3. Выбранный инструмент или способ и почему
    4. Результат
    5. Затраты — время и ручная доработка
    6. Ограничения — данные, доступ, безопасность
    7. Затруднения — категории из списка {категории из таблицы признаков отчёта} или «затруднений нет»; если не подходит ни одна — новая категория своими словами
    8. Частота со слов: каждую неделю / регулярно / изредка / не пользуется / неизвестно
    9. 1–2 дословные цитаты
    Если чего-то в разговоре нет — пиши «нет данных», не додумывай.

    {текст из Notes}
  </b-prompt>
  <b-gauge label="Что делать с повтором">
    <row k="1 человек" w="15%" color="c-none">случай</row>
    <row k="повторяется у нескольких" w="45%" color="c-light">проверить анкетой</row>
    <row k="анкета подтвердила" w="100%" color="c-work">в процедуру решения</row>
  </b-gauge>
  <b-finding>
    <ex>Затруднение у одного человека — случай, повтор у нескольких — повод проверить анкетой.</ex>
    <gen>Разбор сохраняет всю задачу, а не только затруднение: без контекста, выбранного способа и затрат нельзя понять, нужен ли новый инструмент. Повтор на интервью показывает, что проверять, но не сколько людей с этим сталкивается: это покажет только анкета. Один промпт на все разговоры делает поля сопоставимыми, а «нет данных» не даёт ChatGPT додумывать.</gen>
    <do>Когда разборов накопилось несколько, сгруппируйте таблицу по затруднению и перенесите повторы в варианты ответа <a href="#form">анкеты</a>. «Затруднений нет» записывайте как результат. Категории берите из <a href="/blog/chatgpt-enterprise-usage-report/#signs">таблицы признаков</a> отчёта и добавляйте новые, если ни одна не подошла. Решение о пилоте — по <a href="/blog/chatgpt-enterprise-usage-report/#decision">процедуре</a> из отчёта.</do>
  </b-finding>
  <b-sublabel top="22">Частые вопросы</b-sublabel>
  <b-qa>
    <q t="Как проанализировать интервью с помощью ChatGPT">Текст разговора из поля Notes отдают в ChatGPT одним и тем же промптом для всех интервью. Ответ переносят в строку человека: задача, контекст, способ, результат, затраты, ограничения, затруднения, частота со слов. Затем таблицу группируют по затруднению.</q>
    <q t="Можно ли поручить анализ интервью агенту">Да. Claude Code или другой агент с поддержкой MCP подключается к Airtable, заводит строки, подтягивает данные отчёта и разбирает Notes тем же промптом. Исследователю остаются разговоры и проверка выводов по цитатам.</q>
    <q t="Как сверить слова человека с данными">В таблице два поля: частота со слов и частота по отчёту, рядом признак расхождения. Расхождения обсуждают с человеком, а не исправляют молча.</q>
    <q t="Как анализировать звонки и переписку вместе">Текст переписки копируют в то же поле Notes с датой и временем сообщений. Ответы из переписки помогают найти случаи и темы, но их не приравнивают к звонкам.</q>
  </b-qa>
</b-chapter>
<b-chapter id="next" title="Дальше по теме">
  <b-links cols="2">
    <item href="/blog/chatgpt-enterprise-usage-report/" k="Отчёт" t="Отчёт по ChatGPT Enterprise">Кто пользуется, для каких задач и какие инструменты покупать дальше</item>
    <item href="/blog/who-to-interview-before-buying-ai-tools/" k="Выборка" t="Кого звать на интервью">Кого звать на интервью</item>
  </b-links>
</b-chapter>
<b-footer>Дизайн интервью сделан по рекомендациям <a href="https://t.me/Kseniya_Vasil" target="_blank" rel="noopener">@Kseniya_Vasil</a>. Все имена, команды и цифры в примерах вымышлены.</b-footer>
</b-post>
