---
title: Спеки по агрегатам: RFC-требования и ограниченные контексты вместо спеки на каждую фичу
date: 2026-09-28
updated: 2026-10-20
description: Spec-driven development без разрастания спек: как держать их в одном словаре агрегатов, чтобы их не становилось больше с каждой фичей: уровни требований, карточка агрегата и границы контекстов.
tags: AI, spec-driven development, спеки, DDD, агенты
category: specs
layout: wide
image: /og/specs-by-aggregates.png
mentions: RFC 2119, Domain-Driven Design, OpenSpec, Spec-Driven Development
toc: growth=Почему спек много | rfc=Уровни RFC | card=Карточка агрегата | contexts=Контексты | next=Дальше по теме
---

<b-post series="agg">
<b-hchain label="Цепочка: ограниченный контекст, агрегат, инвариант уровня MUST, проверка">
  <step icon="workflow" sw="1.8" t="Контекст">booking</step>
  <step icon="cube" t="Агрегат">Reservation</step>
  <step icon="list-check" sw="1.8" t="Инвариант">MUST</step>
  <step icon="flask" t="Проверка">тест</step>
</b-hchain>
<b-chapter id="growth" title="Почему спек становится много" icon="bar-chart-rise">
  <b-spec-growth>
    <b-growth-panel icon="file" t="Спека на фичу" sub="понятие описано в каждой фиче" files="101101010110" n="12 файлов" note="«Бронь» — в 7" chip="растёт с фичами"></b-growth-panel>
    <b-growth-panel good icon="cube" t="Словарь агрегатов" sub="понятие описано один раз" n="4 записи" note="«Бронь» — в 1" chip="растёт с доменом">
      <agg dots="5">Reservation</agg>
      <agg dots="3">Room</agg>
      <agg dots="2">TimeSlot</agg>
      <agg dots="2">Member</agg>
    </b-growth-panel>
    <step>Фича 13</step>
    <step em="+1 MUST">[booking::Reservation]</step>
    <step em="+1">тест</step>
  </b-spec-growth>
  <b-cap>Числа условные. Как спеки и изменения раскладывает <a href="https://github.com/Fission-AI/OpenSpec" target="_blank" rel="noopener">OpenSpec</a>: папки specs/ и changes/, изменения уходят в архив.</b-cap>
  <b-finding>
    <ex>Двенадцать фич дали двенадцать спек, и бронь описана в семи из них по-разному. В словаре те же фичи дописали строки в четыре записи агрегатов.</ex>
    <gen>Если спека привязана к изменению или фиче, файлов становится больше с каждой задачей, а одно понятие расходится по нескольким местам. Если единица — агрегат, число записей ограничено самим доменом, а фича только добавляет в запись требования.</gen>
    <do>Выпишите понятия, которые встречаются в трёх и больше спеках, и заведите каждому одну запись в словаре. Спеки фич пусть ссылаются на запись, а не пересказывают её.</do>
  </b-finding>
</b-chapter>
<b-chapter id="rfc" title="Уровни требований RFC 2119" icon="list-check">
  <b-rfc-levels cols="Слово | Значение | Сила | Проверка">
    <level k="MUST" s="5" w="100" check="test" t="автотест" note="блокирует">обязательно</level>
    <level k="MUST NOT" s="5" w="100" check="test" t="автотест" note="блокирует">запрещено</level>
    <level k="SHOULD" s="3" w="60" check="review" t="ревью" note="предупреждает">по умолчанию, отступ с причиной</level>
    <level k="MAY" s="1" w="20" check="none" t="нет" note="не проверяется">допустимо</level>
    <syn>MUST = SHALL</syn>
  </b-rfc-levels>
  <b-cap>Слова и их смысл — по <a href="https://www.rfc-editor.org/rfc/rfc2119" target="_blank" rel="noopener">RFC 2119</a>. Каждому слову соответствует своя проверка.</b-cap>
  <b-finding>
    <ex>В записи брони правило «интервалы не пересекаются» стоит как MUST и проверяется тестом, а «подтверждение в тот же канал» — как SHOULD и смотрится на ревью.</ex>
    <gen>Слово требования сразу говорит, чем его проверять и что делать при нарушении. Агент читает MUST как границу, а SHOULD как умолчание, и не путает одно с другим.</gen>
    <do>Перепишите требования своей спеки с этими четырьмя словами и рядом с каждым MUST укажите тест, который его проверяет.</do>
  </b-finding>
</b-chapter>
<b-chapter id="card" title="Карточка агрегата" icon="card-lines">
  <b-aggregate-card label="Пример записи агрегата Reservation из контекста booking: адрес, инварианты, команды, доступ, связи и ссылка на спеку фичи">
    <field icon="id-card" t="адрес: контекст::имя">## [booking::Reservation]&#10;Class: aggregate&#10;Description: Бронь переговорной на интервал.</field>
    <field icon="list-check" sw="1.8" t="требования → проверки">Invariants:&#10;  - MUST: active-брони одной комнаты не пересекаются&#10;  - MUST: held → confirmed → closed, только вперёд&#10;  - MUST: held без подтверждения 15 мин → closed&#10;  - SHOULD: подтверждение в канал создания</field>
    <field icon="play" t="единственный способ изменить">Commands: HoldRoom, ConfirmReservation,&#10;          CancelReservation</field>
    <field icon="user" t="кто может">Access:&#10;  CanHoldRoom: [booking::Role::Member]&#10;  CanCancelReservation: Member (своя), Admin</field>
    <field icon="link" t="связи по id">Depends on: [[booking::Room]], [[booking::TimeSlot]]</field>
    <field icon="file" t="из какой фичи пришло">Spec: [[room-booking]]</field>
  </b-aggregate-card>
  <b-cap>Пример выдуман. Термины — по <a href="https://martinfowler.com/bliki/DDD_Aggregate.html" target="_blank" rel="noopener">Martin Fowler: DDD Aggregate</a>.</b-cap>
  <b-finding>
    <ex>Вся бронь — одна карточка: адрес, четыре требования, три команды, права, связи и ссылка на фичу, из которой она появилась.</ex>
    <gen>Агрегат — граница, внутри которой требования всегда соблюдаются, а менять его можно только его командами. Поэтому в карточке рядом стоят и правила, и единственные способы их нарушить.</gen>
    <do>Для каждого агрегата заведите карточку из шести полей. Если требование нельзя приписать ни одному агрегату, скорее всего, агрегат ещё не назван.</do>
  </b-finding>
</b-chapter>
<b-chapter id="contexts" title="Ограниченные контексты" icon="workflow">
  <b-ctx-map>
    <ctx name="booking">Reservation, Room, TimeSlot</ctx>
    <ctx name="billing">Invoice, Tariff</ctx>
    <ctx name="access">Pass, Level</ctx>
  </b-ctx-map>
  <b-ctx-links t="связи между контекстами — только по id">
    <ref from="billing::Invoice" to="booking::Reservation"/>
    <ref from="access::Pass" to="booking::Reservation"/>
  </b-ctx-links>
  <b-ctx-clash word="«Уровень»" note="одно слово — два термина, разные подписи">
    <sense code="booking::Room.floor">Этаж</sense>
    <sense code="access::Level">Допуск</sense>
  </b-ctx-clash>
  <b-ctx-rules>
    <rule icon="id-card">термин = одна запись</rule>
    <rule icon="link">ссылка [[ctx::Name]]</rule>
    <rule icon="fork">совпало слово — разные записи</rule>
    <rule icon="cycle">словарь меняется вместе со спекой</rule>
  </b-ctx-rules>
  <b-cap>Подход — <a href="https://martinfowler.com/bliki/BoundedContext.html" target="_blank" rel="noopener">Bounded Context</a> и <a href="https://martinfowler.com/bliki/UbiquitousLanguage.html" target="_blank" rel="noopener">Ubiquitous Language</a>.</b-cap>
  <b-finding>
    <ex>Счёт и пропуск ссылаются на бронь по id и не знают её устройства. Слово «уровень» в бронях значит этаж, а в доступе — допуск, и это две разные записи.</ex>
    <gen>Контекст — область, внутри которой у каждого слова один смысл. Когда слово совпало в двух контекстах, заводят два термина с разными подписями, иначе агент перенесёт правило из одного в другой.</gen>
    <do>Разложите агрегаты по контекстам и найдите слова, которые встречаются в двух. Для каждого такого слова заведите отдельные записи и разные подписи в интерфейсе.</do>
  </b-finding>
</b-chapter>
<b-chapter id="next" title="Дальше по теме">
  <b-cta href="/blog/spec-reconcile-loop/" k="Продолжение" t="Петля сверки для спек" icon="hub" sw="1.6">как в Kubernetes: желаемое, замер и среда агента</b-cta>
  <b-links cols="3">
    <item href="/blog/harness-driven-development/" k="Петля ошибок" t="Harness-Driven Development">как ошибки агента становятся правилами</item>
    <item href="/blog/specs-rules-skills/" k="Контекст" t="Спеки, библия, правила и скиллы">что агент знает о проекте и где это лежит</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="Среда" t="Сравнение харнессов">где работает агент и что он видит</item>
  </b-links>
</b-chapter>
<b-footer compact>Пример с бронированием выдуман. Термины — по источникам в подписях под схемами.</b-footer>
</b-post>
