---
title: Codex в России: доступ, VPN и блокировки
seoTitle: Codex в России: доступ, VPN и блокировки (2026)
date: 2026-11-18
updated: 2026-11-18
description: Что известно о запуске Codex из России: список стран OpenAI, вход через ChatGPT или API, слова условий про VPN, причины блокировок и что отправляет программа.
tags: AI, Codex, OpenAI, доступ, VPN, блокировка, Claude Code
category: harness
layout: wide
mentions: Codex, OpenAI, ChatGPT, Claude Code, OpenCode
toc: answer=Быстрый ответ | list=Список стран | login=Как входит Codex | vpn=VPN | bans=Блокировки | data=Что уходит на сервер | compare=С Claude Code | legal=Что делать | faq=Вопросы | start=Запросы агенту | next=Дальше по теме
---

Codex в России официально недоступен: России нет в списке поддерживаемых стран OpenAI, а доступ вне списка «may result in your account being blocked or suspended». Вход в Codex CLI идёт через аккаунт ChatGPT или ключ API. Отдельных региональных правил для Codex не найдено, VPN в условиях не упомянут, но обходить ограничения и защитные меры запрещено.

<b-post series="harness">
<b-chapter id="answer" title="Быстрый ответ" icon="crosshair">
  <b-why>Доступ к Codex определяет общий список стран OpenAI для ChatGPT и API. России в нём нет<b-proof href="https://developers.openai.com/api/docs/supported-countries" quote="OpenAI: «Accessing or offering access to our services outside of the countries and territories listed below may result in your account being blocked or suspended.» — developers.openai.com/api/docs/supported-countries"/>.</b-why>

  <iso-art name="codex-access-regions-vpn-bans/world-map"></iso-art>
  <b-cap>Синий — страна есть в списке OpenAI. Оранжевый — страны в списке нет, Россия выделена цветом плотнее.</b-cap>
  <b-sublabel top="18">Что это значит простыми словами</b-sublabel>

  OpenAI — компания, которая делает ChatGPT и Codex. Codex — агент для программ: он работает в терминале и в приложении, читает файлы проекта и по вашей задаче правит код. OpenAI публикует список стран, где её сервисы доступны. Если ваша страна записана в списке, региональные правила вам не мешают. Если страны нет, доступ может закончиться блокировкой аккаунта. Причины такого устройства OpenAI не объясняет. По моему предположению, это политика компании и риски санкций, экспортных ограничений и законов США и других стран.

  Бытовой пример. Дана живёт в Алматы и хочет попробовать Codex. Она открывает список OpenAI и находит строку «Kazakhstan». Запись стоит без скобок и оговорок, значит, по региону препятствий нет. Остаются обычные вещи: войти в аккаунт ChatGPT или завести ключ API и выбрать способ оплаты. Человеку, который физически находится в России, такой записи найти не удастся.

  Частая ошибка: считать, что Codex живёт по отдельным правилам, раз он запускается в терминале и ставится одной командой. Отдельного списка стран для Codex нет ни на открытых страницах OpenAI, ни в репозитории программы. Страница входа в Codex отсылает к общему списку ChatGPT и API. Вторая ошибка касается VPN, то есть программы, которая подменяет адрес, с которого вы выходите в сеть. VPN не упомянут ни в справке о странах, ни в условиях использования. Условия запрещают обходить ограничения и защитные меры, и подмена адреса может под это подпасть; такой вывод делаю я, прямого заявления OpenAI об этом нет.

  Проверить ответ можно за минуту: откройте <a href="https://developers.openai.com/api/docs/supported-countries">страницу OpenAI со списком поддерживаемых стран</a> и найдите свою страну поиском по странице браузера. Справка на help.openai.com не открывается автоматическим запросам (ошибка 403), поэтому строки списка сверены по странице developers.openai.com.
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>Вопрос</th><th>Ответ</th><th>Статус</th></tr>
    </thead>
    <tbody>
      <tr><td>🇷🇺 Россия в списке стран OpenAI</td><td>нет<b-proof href="https://developers.openai.com/api/docs/supported-countries" quote="OpenAI: «Accessing or offering access to our services outside of the countries and territories listed below may result in your account being blocked or suspended.» — developers.openai.com/api/docs/supported-countries"/></td><td>подтверждено</td></tr>
      <tr><td>Отдельный список стран для Codex</td><td>на открытых страницах и в репозитории не найден</td><td>не найдено</td></tr>
      <tr><td>Вход</td><td>аккаунт ChatGPT или ключ API<b-proof href="https://learn.chatgpt.com/docs/auth" quote="OpenAI: «Sign in with ChatGPT for subscription access» / «Sign in with an API key for usage-based access» — learn.chatgpt.com/docs/auth"/></td><td>подтверждено</td></tr>
      <tr><td>VPN в условиях и справке про страны</td><td>не упомянут</td><td>не найдено</td></tr>
      <tr><td>Запрет обходить ограничения и защитные меры</td><td>есть в условиях<b-proof href="https://openai.com/policies/row-terms-of-use/" quote="OpenAI: «circumvent any rate limits or restrictions or bypass any protective measures or safety mitigations we put on our Services» — openai.com/policies/row-terms-of-use"/></td><td>подтверждено</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>Дата проверки: 18.11.2026. Статья пересказывает официальные документы и способов обхода ограничений не содержит.</b-cap>
</b-chapter>
<b-chapter id="list" title="Список стран OpenAI" icon="flag">
  <b-why>OpenAI ведёт один список для ChatGPT и API и отдельного списка недоступных стран не публикует<b-proof href="https://help.openai.com/en/articles/7947663-chatgpt-and-openai-api-supported-countries-and-territories" quote="OpenAI: «OpenAI does not publish a separate list of countries and territories that are not supported. If a location is not included in the list below, our API is not available there.» — help.openai.com/en/articles/7947663"/>. Что не названо в списке, то недоступно.</b-why>

  Список стран — страница OpenAI, на которой перечислены места, где можно пользоваться ChatGPT и API. Codex входит в тот же набор: он подключается либо через аккаунт ChatGPT, либо по ключу API, поэтому каждый из двух входов упирается в этот список. Отдельной страницы «страны, где Codex закрыт» нет. Это значит, что отсутствие страны в списке и есть единственный сигнал о закрытом доступе.
  <iso-art name="codex-access-regions-vpn-bans/list-gate"></iso-art>
  <b-cap>Список работает как одни ворота на ChatGPT, API и Codex: страна из списка проходит, страна вне списка остановлена.</b-cap>
  <b-sublabel top="18">Как читать запись</b-sublabel>

  Большинство записей в списке состоят из одного слова: «Armenia», «Georgia», «Kazakhstan». Такая запись означает, что поддерживается страна целиком. Бывают записи с оговоркой. Самая заметная: «Ukraine (with certain exceptions)». Разберу её по частям. «Ukraine» называет страну. Скобки с «with certain exceptions» значат, что часть территории исключена. Какие именно места исключены, в самой записи на странице OpenAI не названо, и перечня исключений на открытых страницах OpenAI нет. Для сравнения, Anthropic называет исключённые регионы Украины поимённо, у OpenAI такого перечня в записи нет. Из этого следует практическое правило: если ваша страна записана со скобками, одного слова из списка мало, и ответ придётся уточнять у поддержки OpenAI.

  Бытовой пример. Арсен живёт в Ереване и собирает команду, где работают коллеги из Армении, Грузии и Украины. Он открывает список и находит «Armenia» и «Georgia» без скобок: по месту людей в этих странах вопросов нет. Запись «Ukraine (with certain exceptions)» он читает осторожнее и просит коллегу из Киева написать в поддержку OpenAI, чтобы уточнить, попадает ли его город под исключения. Проверить самому можно так: найти страну поиском по странице и посмотреть, нет ли после названия скобки.
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>Страна</th><th>OpenAI (ChatGPT и API)</th></tr>
    </thead>
    <tbody>
      <tr><td>Россия, Беларусь</td><td>нет в списке</td></tr>
      <tr><td>Китай, Гонконг, Макао</td><td>нет в списке</td></tr>
      <tr><td>Иран, Куба, Северная Корея, Сирия</td><td>нет в списке</td></tr>
      <tr><td>Казахстан, Грузия, Армения, Узбекистан</td><td>есть в списке</td></tr>
      <tr><td>Украина</td><td>есть «with certain exceptions»<b-proof href="https://developers.openai.com/api/docs/supported-countries" quote="OpenAI: «Ukraine (with certain exceptions)» — developers.openai.com/api/docs/supported-countries"/></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>Строки сверены 18.11.2026 по списку на developers.openai.com. Перед решением откройте страницу OpenAI и найдите свою страну: список меняется.</b-cap>
  <b-finding>
    <ex>Страна не названа в списке: значит, для Codex через ChatGPT и API доступа в ней нет.</ex>
    <gen>OpenAI пишет «not available there» про API, а условия предупреждают о блокировке аккаунта при доступе вне списка. Отдельного исключения для Codex на открытых страницах нет.</gen>
    <do>Перед установкой найдите свою страну на странице OpenAI. Если её нет, считайте доступ закрытым.</do>
  </b-finding>
  <b-sublabel top="18">Чем список OpenAI отличается от списка Anthropic</b-sublabel>

  У Anthropic, компании, которая делает Claude Code, список свой, и совпадает он с OpenAI не полностью. Россия, Беларусь, Китай, Иран, Куба, Северная Корея и Сирия не записаны ни там, ни там. Афганистан, Мьянма и Йемен записаны у OpenAI и отсутствуют у Anthropic. Поэтому проверка страны для одного агента не заменяет проверку для другого: открывайте список того, кого собираетесь ставить. Причины различий обе компании не объясняют.
</b-chapter>
<b-chapter id="login" title="Как входит Codex" icon="key">
  <b-why>Страница входа Codex отсылает к общему списку стран и собственных региональных ограничений не содержит<b-proof href="https://learn.chatgpt.com/docs/auth" quote="OpenAI: «Sign in with ChatGPT for subscription access» — learn.chatgpt.com/docs/auth"/>.</b-why>

  Вход — это способ, которым Codex доказывает серверам OpenAI, что запросы идут от вашего аккаунта. Способов два, и каждый привязан к своему счёту. Вход через ChatGPT использует подписку ChatGPT: вы платите фиксированную сумму и пользуетесь агентом в её пределах. Вход по ключу API использует программный ключ: вы платите по ставкам API за фактическое использование. Оба пути лежат за теми же воротами со списком стран, а какой из них выбрать, зависит от того, как вы платите и что вам нужно. Облачный Codex (Codex cloud), где агент работает на серверах OpenAI, требует входа через ChatGPT, а ключ API для него не подходит.
  <iso-art name="codex-access-regions-vpn-bans/login-paths"></iso-art>
  <b-cap>Два пути входа: ChatGPT (подписка) и ключ API (оплата по использованию). Данные входа лежат на вашем компьютере в файле или в хранилище системы.</b-cap>

  Данные входа программа кэширует на устройстве. Лежат они в файле <code>~/.codex/auth.json</code> или в хранилище паролей операционной системы. Режим задаёт параметр <code>cli_auth_credentials_store</code> с четырьмя значениями: <code>file</code>, <code>keyring</code>, <code>auto</code> и <code>ephemeral</code>. Файл с данными входа равноценен ключу от аккаунта. Кто его скопирует, тот сможет пользоваться вашим аккаунтом, а условия OpenAI запрещают делиться данными входа и делать аккаунт доступным другим<b-proof href="https://openai.com/policies/row-terms-of-use/" quote="OpenAI: «You may not share your account credentials or make your account available to anyone else and are responsible for all activities that occur under your account.» — openai.com/policies/row-terms-of-use"/>.
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th></th><th>Вход через ChatGPT</th><th>Вход по ключу API</th></tr>
    </thead>
    <tbody>
      <tr><td>Оплата</td><td>подписка ChatGPT</td><td>по ставкам API</td></tr>
      <tr><td>Codex cloud</td><td>нужен этот способ</td><td>не подходит</td></tr>
      <tr><td>Где хранятся данные входа</td><td colspan="2">в файле ~/.codex/auth.json или в хранилище системы; режим задаёт параметр cli_auth_credentials_store (file, keyring, auto, ephemeral)</td></tr>
      <tr><td>Региональная проверка</td><td colspan="2">на странице входа не описана; действует общий список стран</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-sublabel top="18">Сквозная ситуация</b-sublabel>

  Ника живёт в Тбилиси и ставит Codex на рабочий ноутбук. Она запускает программу и выбирает вход через ChatGPT, потому что у неё уже есть подписка. Данные входа сохраняются на ноутбуке. Страна у Ники записана в списке как «Georgia», без скобок, поэтому по региону вопросов нет. Через неделю она решает пользоваться облачным Codex и убеждается, что для него нужен именно вход через ChatGPT: ключ API, которым пользуется её коллега, для облака не годится. Проверить, как вошла программа, можно, спросив об этом самого агента: готовый запрос есть в конце статьи.

  <b-sublabel top="18">Что проверяют серверы при входе</b-sublabel>

  Что в итоге проверяют серверы OpenAI при входе, на открытых страницах не описано: адрес подключения, платёжные данные, номер телефона или всё вместе. Это не подтверждено. Поэтому о том, по какому признаку OpenAI определит, что вы находитесь вне списка, в статье нет ни одного утверждения. Известно только, что страница входа региональных проверок не описывает и отсылает к общему списку.
</b-chapter>
<b-chapter id="vpn" title="VPN: что сказано и чего нет" icon="shield-check">
  <b-why>Условия для физических лиц (дата вступления 1 января 2026) говорят про «ограничения» и «защитные меры» вообще. VPN и регион в них не упомянуты.</b-why>

  VPN — программа, которая подменяет адрес, с которого сайт видит ваше подключение. Люди ставят её ради приватности в публичной сети или для доступа к корпоративной сети. OpenAI о VPN в своих документах молчит, поэтому я разделил три вещи: что написано дословно, что следует из условий и что остаётся мнением. Так видно, где правило, а где слух.
  <iso-art name="codex-access-regions-vpn-bans/vpn-rules"></iso-art>
  <b-cap>Про VPN в документах OpenAI сказано мало: VPN не упомянут, а обход ограничений и защитных мер запрещён.</b-cap>

  Дословно в документах есть следующее. В справке о странах и в условиях использования VPN не упомянут. Условия запрещают обходить лимиты, ограничения и защитные меры. Они же запрещают передавать аккаунт другим и использовать сервисы в странах под эмбарго США. Ни «VPN разрешён», ни «VPN запрещён» в этих документах нет. Любой вывод в ту или иную сторону остаётся толкованием, а не цитатой.
  <iso-art name="codex-access-regions-vpn-bans/four-bans"></iso-art>
  <b-cap>Четыре запрета из условий OpenAI: обход ограничений и защитных мер, передача аккаунта, использование в странах под эмбарго США и нарушение условий.</b-cap>

  Четыре запрета из условий связаны с темой доступа, и каждый можно прочитать как отдельное правило.

  <b-steps round>
    <step t="Обходить ограничения и защитные меры">Запрещено вмешиваться в работу сервисов, в том числе обходить лимиты, ограничения и защитные меры. Региональная проверка может считаться такой мерой, но условия её по имени не называют.</step>
    <step t="Передавать аккаунт другим">Нельзя делиться данными входа и делать аккаунт доступным кому-то ещё. Ответственность за всё, что происходит под аккаунтом, остаётся на владельце.</step>
    <step t="Использовать сервисы в странах под эмбарго США">Сервисы нельзя применять в стране или на территории под эмбарго США и в интересах лиц, с которыми запрещены сделки по торговым законам.</step>
    <step t="Нарушать условия и правила использования">За нарушение условий или Usage Policies OpenAI вправе приостановить или закрыть доступ. Тот же вывод OpenAI делает при риске вреда и по требованию закона.</step>
  </b-steps>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>Что</th><th>Есть ли в документах</th></tr>
    </thead>
    <tbody>
      <tr><td>VPN в справке про страны</td><td>не упомянут</td></tr>
      <tr><td>VPN в условиях использования</td><td>не упомянут</td></tr>
      <tr><td>Запрет обходить «restrictions» и «protective measures»</td><td>да<b-proof href="https://openai.com/policies/row-terms-of-use/" quote="OpenAI: «Interfere with or disrupt our Services, including circumvent any rate limits or restrictions or bypass any protective measures or safety mitigations we put on our Services.» — openai.com/policies/row-terms-of-use"/></td></tr>
      <tr><td>Запрет передавать аккаунт другим</td><td>да<b-proof href="https://openai.com/policies/row-terms-of-use/" quote="OpenAI: «You may not share your account credentials or make your account available to anyone else and are responsible for all activities that occur under your account.» — openai.com/policies/row-terms-of-use"/></td></tr>
      <tr><td>Запрет использовать сервисы в странах под эмбарго США</td><td>да<b-proof href="https://openai.com/policies/row-terms-of-use/" quote="OpenAI: «Our Services may not be used in or for the benefit of, or exported or re-exported to (a) any U.S. embargoed country or territory or (b) any individual or entity with whom dealings are prohibited or restricted under applicable trade laws.» — openai.com/policies/row-terms-of-use"/></td></tr>
      <tr><td>«VPN разрешён» или «VPN запрещён» дословно</td><td>ни то ни другое: любой такой вывод остаётся толкованием, не цитатой</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-finding>
    <ex>Из документов нельзя вывести ни разрешение, ни запрет VPN дословно.</ex>
    <gen>Критерий OpenAI — список стран, в которых предлагаются сервисы, и запрет обходить ограничения. Как OpenAI применяет это на практике, в открытых источниках не найдено.</gen>
    <do>Не принимайте решение по пересказам в форумах. Читайте условия и список стран на страницах OpenAI и при сомнении пишите в поддержку OpenAI.</do>
  </b-finding>
  <b-sublabel top="18">Частые заблуждения</b-sublabel>

  <b>Раз VPN в условиях не упомянут, значит, он разрешён?</b> Отсутствие упоминания ничего не разрешает. Запрет обходить ограничения и защитные меры сформулирован общо, и подмена адреса может под него подпасть. Как проверить: найти в <a href="https://openai.com/policies/row-terms-of-use/">условиях использования OpenAI</a> фразу про «circumvent any rate limits or restrictions» и прочитать её целиком.

  <b>Условия прямо запрещают VPN?</b> VPN в них не упомянут. Из общего запрета обходить защитные меры выводят запрет на обход региона, но такое выведение остаётся толкованием, а не цитатой.

  <b>Платная подписка даёт право на доступ из любой страны?</b> В условиях и справке критерием назван список стран, тарифы среди критериев не упомянуты. Подписка ChatGPT и ключ API стоят за теми же воротами. Как проверить: прочитать первую фразу страницы со списком.

  <b>Если страна есть в списке, VPN можно не опасаться?</b> Запрет обходить защитные меры записан в условиях для всех пользователей, и список стран его не отменяет. В справке о странах есть и оговорка про устройство: ошибка «OpenAI's services are not available in your country.» может появиться и в поддерживаемой стране. Условия её появления в справке не описаны, их стоит уточнить у поддержки.

  <b>У Claude Code с этим проще?</b> У Anthropic VPN в правилах регионов тоже не упомянут, но у документации Claude Code есть своя формулировка про совместимость программы с VPN. Формулировки у компаний разные, логика похожая: список стран плюс общий запрет обходить защитные меры. Подробный разбор для Claude Code есть в <a href="/blog/claude-code-access-regions-vpn-bans/">отдельной статье</a>.

  Решение о риске остаётся за вами. Способы подключения я не описываю и не рекомендую: на эту тему у меня только формулировки условий.
</b-chapter>

<b-chapter id="bans" title="Блокировки и причины" icon="alert-circle">
  <b-why>Блокировка — приостановка или закрытие аккаунта OpenAI, после которых вход в ChatGPT, API и Codex перестаёт работать. В условиях OpenAI названы три основания, и среди них нарушение условий или правил использования<b-proof href="https://openai.com/policies/row-terms-of-use/" quote="OpenAI: «We reserve the right to suspend or terminate your access to our Services or delete your account if we determine: You breached these Terms or our Usage Policies. We must do so to comply with the law. Your use of our Services could cause risk or harm to OpenAI, our users, or anyone else.» — openai.com/policies/row-terms-of-use"/>.</b-why>

  Основания записаны в условиях использования для физических лиц (<a href="https://openai.com/policies/row-terms-of-use/" target="_blank" rel="noopener">Terms of Use</a>, дата вступления в силу 1 января 2026) и в справке о списке стран. Из условий следует три основания: нарушение самих условий или правил использования (Usage Policies), требование закона и риск вреда для OpenAI, других пользователей или кого-либо ещё. Четвёртое основание стоит в справке о списке стран: доступ к сервисам вне перечисленных стран «may result in your account being blocked or suspended», то есть может привести к блокировке или приостановке аккаунта.
  <iso-art name="codex-access-regions-vpn-bans/ban-ladder"></iso-art>
  <b-cap>Путь на схеме: основание, затем приостановка или закрытие, затем апелляция через поддержку. Решение принимает OpenAI, а у человека остаётся обращение в поддержку; исход условия не обещают.</b-cap>

  Как быстро наступает блокировка и как она выглядит на экране, на открытых страницах OpenAI не описано: не найдено. Сказано только, что право приостановить или закрыть доступ принадлежит компании, а при ошибке можно подать апелляцию.
  <b-sublabel top="18">Причины по документам</b-sublabel>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>Причина</th><th>Что сказано</th></tr>
    </thead>
    <tbody>
      <tr><td>Доступ вне списка стран</td><td>аккаунт может быть заблокирован или приостановлен: «Accessing or offering access to our services outside of the countries and territories listed below may result in your account being blocked or suspended.»</td></tr>
      <tr><td>Нарушение условий или правил использования</td><td>OpenAI вправе приостановить или закрыть доступ (цитата в начале главы)</td></tr>
      <tr><td>Ошибка в каком-то регионе</td><td>текст ошибки в справке о странах: «OpenAI's services are not available in your country.» Справка добавляет, что ошибка возможна и в поддерживаемой стране после использования устройства в неподдерживаемом регионе</td></tr>
      <tr><td>Апелляция</td><td>через поддержку<b-proof href="https://openai.com/policies/row-terms-of-use/" quote="OpenAI: «If you believe we have suspended or terminated your account in error, you can file an appeal with us by contacting our Support team» — openai.com/policies/row-terms-of-use"/></td></tr>
    </tbody>
    </table>
  </b-ctx-table>

  Ещё одно положение условий касается ответственности: аккаунт нельзя передавать другим, а ответственность за всё, что происходит под аккаунтом, лежит на его владельце<b-proof href="https://openai.com/policies/row-terms-of-use/" quote="OpenAI: «You may not share your account credentials or make your account available to anyone else and are responsible for all activities that occur under your account.» — openai.com/policies/row-terms-of-use"/>. Поэтому чужой аккаунт или общий доступ в команде остаются основанием для ограничения, даже если страна есть в списке.
  <b-sublabel top="18">Апелляция по шагам</b-sublabel>
  <b-steps round>
    <step t="Поддержка">написать в службу поддержки OpenAI, указав, что блокировка, по вашему мнению, ошибочна</step>
    <step t="Данные">приложить дату, страну входа, текст ошибки и копии писем</step>
    <step t="Ожидание">дождаться ответа: сроков и шансов на успех в условиях нет</step>
  </b-steps>

  Ни формы апелляции с названием, ни адреса, ни сроков рассмотрения на открытых страницах нет, поэтому в шагах стоит только то, что сказано в условиях: обращение в поддержку. Апелляция исправляет ошибку, но основание, названное в справке, остаётся тем же, пока человек пользуется сервисом из страны вне списка. Это моё прочтение условий и справки, OpenAI такого сравнения не делает.
  <b-sublabel top="18">Сквозная ситуация</b-sublabel>
  <b-steps round>
    <step t="Олег живёт в России и хочет попробовать Codex">Он ставит программу, пробует войти и видит текст «OpenAI's services are not available in your country.» Россия в списке стран OpenAI отсутствует, а условия предупреждают о блокировке или приостановке аккаунта при доступе вне списка. Какое именно проверочное звено сработало, адрес, номер телефона или платёжные данные, на открытых страницах не описано. Апелляция через поддержку возможна, но страна в списке от неё не появляется. Как проверить самому: открыть список стран OpenAI, найти в нём Россию и сопоставить результат с текстом ошибки из справки.</step>
  </b-steps>

  <b-sublabel top="18">Частые заблуждения</b-sublabel>

  <b>Блокировка бывает только за нарушение условий?</b> Нет: в условиях есть ещё два основания, требование закона и риск вреда, а справка о странах отдельно называет доступ вне списка.

  <b>Апелляция возвращает доступ?</b> В условиях сказано лишь, что можно подать апелляцию через поддержку. Обещания результата там нет.

  <b>Причины блокировки OpenAI полностью перечислены в справке?</b> Отдельная статья справки OpenAI о причинах блокировок аккаунта для автоматической проверки закрыта (ошибка 403), её положения здесь не пересказаны. Условия бизнеса, Service Terms и Usage Policies закрыты так же. Для организаций эти документы нужно прочитать отдельно на openai.com и help.openai.com.
  <b-cap>Граница знания: что сказано в условиях для физических лиц и в справке о списке стран, подтверждено. Что лежит в закрытых документах, не подтверждено.</b-cap>
</b-chapter>
<b-chapter id="data" title="Что уходит на сервер из Codex" icon="eye">
  <b-why>Запросы к модели уходят на сервер всегда, иначе агент не работает. Остальные потоки (аналитика, метрики, отправка отзыва) выключаются в config.toml, а тексты запросов в журналах OpenTelemetry попадают туда только по явному согласию<b-proof href="https://learn.chatgpt.com/docs/config-file/config-reference" quote="OpenAI: «Opt in to exporting raw user prompts with OpenTelemetry logs.» — learn.chatgpt.com/docs/config-file/config-reference"/>.</b-why>

  Разбор сделан по исходному коду Codex CLI (коммит 8011b92 от 18.11.2026) и странице настроек OpenAI. Codex — агент для программ: он работает в терминале и в приложении и постоянно обращается к серверу. Часть данных нужна для работы, часть собирается дополнительно. Нужные данные — ваши запросы к модели и её ответы. Дополнительные потоки — аналитика продуктов Codex, метрики и отзыв, отправляемый командой /feedback. Телеметрия — автоматическая отправка сведений о работе программы: сколько заняло действие, случилась ли ошибка. OpenTelemetry — открытый стандарт для таких сведений.
  <iso-art name="codex-access-regions-vpn-bans/data-flows"></iso-art>
  <b-cap>Запросы к модели идут всегда. Аналитика, метрики и /feedback выключаются настройками. Тексты запросов в OpenTelemetry уходят только с согласия.</b-cap>

  <b-sublabel top="18">Что уходит, когда включено</b-sublabel>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>Что</th><th>По умолчанию</th><th>Как отключить</th></tr>
    </thead>
    <tbody>
      <tr><td>Аналитика OpenAI в продуктах Codex<b-proof href="https://learn.chatgpt.com/docs/config-file/config-reference" quote="OpenAI: «Enable or disable analytics for this machine or profile.» — learn.chatgpt.com/docs/config-file/config-reference"/></td><td>включена в релизной сборке</td><td>[analytics] enabled = false</td></tr>
      <tr><td>Метрики OpenTelemetry (встроенный экспортёр)<b-proof href="https://learn.chatgpt.com/docs/config-file/config-reference" quote="OpenAI: «Select the OpenTelemetry metrics exporter. The default, `statsig`, follows `analytics.enabled`.» — learn.chatgpt.com/docs/config-file/config-reference"/></td><td>включены, следуют за настройкой аналитики</td><td>[otel] metrics_exporter = "none"</td></tr>
      <tr><td>Отправка отзыва через /feedback<b-proof href="https://learn.chatgpt.com/docs/config-file/config-reference" quote="OpenAI: «Enable feedback submission via `/feedback` across local clients (default: true).» — learn.chatgpt.com/docs/config-file/config-reference"/></td><td>включена</td><td>[feedback] enabled = false</td></tr>
      <tr><td>Тексты запросов в журналах OpenTelemetry<b-proof href="https://learn.chatgpt.com/docs/config-file/config-reference" quote="OpenAI: «Opt in to exporting raw user prompts with OpenTelemetry logs.» — learn.chatgpt.com/docs/config-file/config-reference"/></td><td>выключены, нужно явное согласие</td><td>включать не нужно</td></tr>
    </tbody>
    </table>
  </b-ctx-table>

  Первые две строки связаны: встроенный экспортёр метрик по умолчанию следует за настройкой аналитики. Отправка отзыва стоит отдельно: пока человек сам не запустил /feedback, ничего не уходит. Последняя строка показывает единственный поток, который по умолчанию выключен.
  <b-sublabel top="18">Настройки в config.toml</b-sublabel>
  <b-codebox title="config.toml Codex" copy>
    [analytics]
    enabled = false

    [otel]
    metrics_exporter = "none"

    [feedback]
    enabled = false
  </b-codebox>
  <b-cap>Схема настроек в репозитории уточняет: при analytics enabled = false собственные OTLP-экспортёры остаются включёнными, а чтобы выключить метрики, нужен metrics_exporter = "none". Что именно из кода и запросов хранит OpenAI и как долго, на открытых страницах для Codex CLI не найдено: не подтверждено.</b-cap>

  Эти настройки касаются сбора данных. На список стран они не влияют: выключенная аналитика не делает использование из страны вне списка допустимым.
  <b-sublabel top="18">Сквозная ситуация</b-sublabel>
  <b-steps round>
    <step t="Тимур живёт в Ташкенте и пишет код для заказчика">Узбекистан есть в списке стран OpenAI, поэтому он входит в Codex через свой аккаунт ChatGPT. Заказчик просит не отправлять лишнего. Тимур открывает config.toml и записывает три блока: аналитика выключена, метрики выключены, отправка отзыва выключена. Запросы к модели при этом продолжают уходить, потому что на них держится работа агента. Как проверить самому: попросить агента показать значения трёх настроек и убедиться, что в каждой стоит выключение.</step>
  </b-steps>

  <b-sublabel top="18">Частые заблуждения</b-sublabel>

  <b>Выключение аналитики останавливает отправку запросов к модели?</b> Нет: запросы и ответы идут на сервер всегда, это основа работы агента.

  <b>Достаточно одной строки [analytics] enabled = false?</b> Схема настроек уточняет, что собственные OTLP-экспортёры при этом остаются включёнными, а метрики полностью выключает metrics_exporter = "none".

  <b>Всё, что агент записал локально, уходит на сервер?</b> Нет: в коде Codex CLI локальные базы в каталоге ~/.codex (история сессий, журналы) пишутся всегда, но сетевого кода их синхронизации не найдено. Исключение: логи из них могут уйти при отправке /feedback, и только по решению человека.
</b-chapter>
<b-chapter id="compare" title="Доступ: Codex и Claude Code" icon="table-grid">
  <b-why>У обоих агентов вход привязан к списку стран своей компании, и России нет ни в одном из них<b-proof href="https://www.anthropic.com/supported-countries" quote="Anthropic: «Any country or region not listed is unsupported.» — anthropic.com/supported-countries"/>. Критерии списков разные: у OpenAI это страны, где предлагаются сервисы, у Anthropic ещё физическое местоположение человека, регистрация компании и кто владеет компанией.</b-why>

  Claude Code — агент для программ от Anthropic, он тоже работает в терминале. Сравнение нужно, когда человек выбирает между двумя агентами и хочет понять, одинаково ли у них устроен доступ. Одинаково в главном: список стран публикуют обе компании, и вне списка доступ не предлагается. Различается то, что именно проверяют и что покрывает список.
  <iso-art name="codex-access-regions-vpn-bans/compare-lists"></iso-art>
  <b-cap>Два входа: список OpenAI и список Anthropic. Россия отсутствует в обоих, критерии списков разные.</b-cap>

  <b-sublabel top="18">Сводная таблица</b-sublabel>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th></th><th>Codex (OpenAI)</th><th>Claude Code (Anthropic)</th></tr>
    </thead>
    <tbody>
      <tr><td>Россия в списке</td><td>нет</td><td>нет</td></tr>
      <tr><td>Что покрывает список</td><td>ChatGPT и API; отдельного правила для Codex нет</td><td>приложения, включая Claude Code, и API</td></tr>
      <tr><td>Критерий</td><td>список стран, где предлагаются сервисы</td><td>физическое местоположение, регистрация и кто владеет компанией</td></tr>
      <tr><td>VPN в политике регионов</td><td>не упомянут</td><td>не упомянут</td></tr>
      <tr><td>Вход</td><td>ChatGPT или ключ API</td><td>подписка Claude или аккаунт Console</td></tr>
      <tr><td>Отличия списков</td><td colspan="2">Афганистан, Мьянма и Йемен есть у OpenAI и нет у Anthropic</td></tr>
    </tbody>
    </table>
  </b-ctx-table>

  Три строки таблицы стоит пояснить. В строке про покрытие у OpenAI один список для ChatGPT и API, и Codex отдельного правила не получает, а у Anthropic список прямо называет приложения, среди них Claude Code. В строке про критерий у Anthropic проверяются три признака, поэтому компания из неподдерживаемого региона закрыта, даже если её сотрудники находятся в стране из списка. В списке стран OpenAI таких признаков для компаний не найдено. В последней строке различие по странам: Афганистан, Мьянма и Йемен названы в списке OpenAI и отсутствуют в списке Anthropic.

  Разбор для Claude Code с ошибками установки, проверкой телефона и оплатой лежит в отдельной статье о регионах, VPN и блокировках.
  <b-links cols="2">
    <item href="/blog/claude-code-access-regions-vpn-bans/" k="Регион" t="Claude Code: регионы, VPN и блокировки">Та же тема для Claude Code</item>
    <item href="/blog/claude-code-install-and-price/" k="Установка" t="Claude Code: установка и цена">Команда, вход, тарифы</item>
  </b-links>
</b-chapter>
<b-chapter id="legal" title="Что делать законно" icon="check">
  <b-why>Условия OpenAI оставляют четыре пути, которым обход правил не нужен: найти страну в списке, прочитать условия, написать в поддержку и выбрать другого агента.</b-why>

  Законные варианты есть, и обход правил не входит ни в один из них. Первый путь самый прямой: найти свою страну в списке OpenAI. Второй путь: прочитать условия для физических лиц или для организаций до начала работы. Третий путь нужен, когда страна есть в списке, а вход не идёт: написать в поддержку. Четвёртый путь: выбрать другого агента, чьи условия допускают вашу страну.
  <iso-art name="codex-access-regions-vpn-bans/legal-paths"></iso-art>
  <b-cap>Открыты четыре пути с галочкой: страна из списка, условия, поддержка и другой агент. Закрытая оранжевая дверь обозначает обход правил, он сюда не относится.</b-cap>

  <b-seq-row>
    <step t="Страна">найти её в списке OpenAI</step>
    <step t="Условия">прочитать условия для физлиц или организаций</step>
    <step t="Поддержка">при ошибке в списке писать в поддержку</step>
    <step t="Другой агент">выбрать программу с открытым доступом</step>
  </b-seq-row>

  <b-sublabel top="18">Что делать в каждой ситуации</b-sublabel>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>Ситуация</th><th>Шаг</th></tr>
    </thead>
    <tbody>
      <tr><td>Страна есть в списке, но вход не идёт</td><td>написать в поддержку OpenAI, приложив текст ошибки; апелляция идёт через неё же</td></tr>
      <tr><td>Страны нет в списке</td><td>считать доступ закрытым; искать агента, чьи условия допускают вашу страну</td></tr>
      <tr><td>Нужна работа с локальной моделью</td><td><a href="/materials/glossary/opencode/">OpenCode</a>: модель выбираете сами, в том числе локальную; условия модели и провайдера проверяйте отдельно</td></tr>
      <tr><td>Компания в неподдерживаемом регионе</td><td>юридическая проверка условий до начала работы; у Anthropic закрыты организации, зарегистрированные или управляемые из неподдерживаемого региона</td></tr>
    </tbody>
    </table>
  </b-ctx-table>

  OpenCode — открытый агент: он сам модель не предоставляет, а подключается к модели выбранного поставщика, и правила региона задаёт этот поставщик. Поэтому выбирать нужно по списку стран поставщика модели.
  <b-sublabel top="18">Сквозная ситуация</b-sublabel>
  <b-steps round>
    <step t="Айгуль живёт в Бишкеке и хочет начать с Codex">Она находит в списке OpenAI строку «Kyrgyzstan», читает условия для физических лиц и входит через подписку ChatGPT на своё имя. Через неделю вход перестаёт работать, и экран показывает ошибку. Она пишет в поддержку OpenAI, прикладывает текст ошибки и дату и ждёт ответа. Как проверить самому: открыть список, найти свою страну и сохранить скриншот строки вместе с датой.</step>
  </b-steps>

  <b-cap>Чужой аккаунт, чужой ключ API, посредники и перепродажа доступа нарушают условия: аккаунт нельзя передавать другим. Такие способы здесь не рассматриваются.</b-cap>
</b-chapter>
<b-chapter id="faq" icon="chat" title="Частые вопросы">
  <b-faq-cards>
    <q t="Работает ли Codex в России?">Официально нет: России нет в списке поддерживаемых стран OpenAI для ChatGPT и API, а отдельных правил для Codex на открытых страницах нет. Источник: help.openai.com/en/articles/7947663 и developers.openai.com/api/docs/supported-countries. Дата проверки: 18.11.2026.</q>
    <q t="Можно ли использовать Codex через VPN?">VPN в условиях и справке о странах не упомянут. VPN — программа, которая подменяет адрес, с которого вы выходите в сеть. Есть запрет обходить ограничения и защитные меры, и OpenAI предупреждает о блокировке аккаунта при доступе вне списка. Однозначного ответа в документах нет, решение остаётся за вами и на ваш риск. Источник: openai.com/policies/row-terms-of-use. Дата проверки: 18.11.2026.</q>
    <q t="За что блокируют аккаунт OpenAI?">Из подтверждённого: доступ вне списка стран, нарушение условий или правил использования, требование закона и риск вреда. Отдельную статью справки о причинах блокировки сверьте вручную на help.openai.com. Апелляция идёт через поддержку. Дата проверки: 18.11.2026.</q>
    <q t="Как отключить отправку аналитики в Codex?">В config.toml добавьте [analytics] enabled = false, [otel] metrics_exporter = "none" и [feedback] enabled = false. Первые два выключают встроенную аналитику и метрики, третий отключает отправку отзыва. Запросы к модели при этом продолжают уходить. Источник: learn.chatgpt.com/docs/config-file/config-reference. Дата проверки: 18.11.2026.</q>
    <q t="Чем список стран OpenAI отличается от списка Anthropic?">Критерии разные. У OpenAI это страны, где предлагаются сервисы ChatGPT и API. У Anthropic ещё физическое местоположение человека, регистрация компании и кто владеет компанией. Афганистан, Мьянма и Йемен есть у OpenAI и нет у Anthropic. Дата проверки: 18.11.2026.</q>
    <q t="Что делать, если страна есть в списке, а вход не идёт?">Написать в поддержку OpenAI и приложить текст ошибки: в справке о странах сказано, что ошибка возможна и в поддерживаемой стране после использования устройства в неподдерживаемом регионе. Апелляция по блокировке идёт через ту же поддержку. Дата проверки: 18.11.2026.</q>
  </b-faq-cards>
</b-chapter>
<b-chapter id="start" title="Запросы агенту" icon="zap">
  <b-why>Три готовых запроса, ничего не меняющие без вашего подтверждения.</b-why>

  Первый запрос только читает: он показывает три настройки сбора данных. Второй показывает, как вошёл Codex, через ChatGPT или ключ API, и где лежат данные входа. Третий пишет в файл настроек, поэтому агент сначала показывает дифф, то есть разницу между старым и новым файлом, и ждёт подтверждения.
  <b-codebox title="1. Какие настройки сбора данных заданы" copy>
    Покажи, какие настройки analytics, otel и feedback сейчас заданы в config.toml Codex. Ничего не меняй.
  </b-codebox>
  <b-codebox title="2. Как вошёл Codex" copy>
    Покажи, как у меня сейчас вошёл Codex: через ChatGPT или ключ API, и где лежат данные входа.
  </b-codebox>
  <b-codebox title="3. Отключить лишнюю отправку данных" copy>
    Добавь в config.toml блоки [analytics] enabled = false, [otel] metrics_exporter = "none" и [feedback] enabled = false. Сначала покажи дифф и жди моего подтверждения.
  </b-codebox>
  <b-cap>Первый и второй запросы только читают. Третий пишет в файл настроек, поэтому дифф смотрите до записи.</b-cap>
</b-chapter>
<b-chapter id="next" title="Дальше по теме">
  <b-links cols="2">
    <item href="/blog/codex-or-chatgpt-what-to-choose/" k="Выбор" t="Codex или ChatGPT">Что взять для работы с кодом</item>
    <item href="/blog/claude-code-access-regions-vpn-bans/" k="Регион" t="Claude Code: регионы, VPN и блокировки">Та же тема для Claude Code</item>
    <item href="/blog/claude-code-install-and-price/" k="Установка" t="Claude Code: установка и цена">Команда, вход, тарифы</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="Сравнение" t="Claude Code, Codex, Cursor и Hermes Agent">Какой агент для какой задачи</item>
    <item href="/blog/specs-rules-skills/" k="Контекст" t="AGENTS.md, CLAUDE.md и spec.md">Какие инструкции читает агент</item>
    <item href="/materials/glossary/codex/" k="Термин" t="Codex">Что умеет, где работает</item>
  </b-links>
</b-chapter>
<b-footer>По спискам стран и условиям OpenAI, документации Codex и исходному коду Codex CLI. Дата проверки: 18.11.2026. Списки стран меняются, перед решением откройте первоисточник.</b-footer>
</b-post>
