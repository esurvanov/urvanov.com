---
title: Подходы к работе с харнессом: цикл ответа и ревью с правкой исходного запроса
date: 2026-09-28
description: Что делать, когда ответ не подошёл: три пути и повтор цикла. Как ревью находит пропуски, почему их записывают в исходный запрос и прогоняют пайплайн заново. По руководствам Anthropic, OpenAI и Google.
tags: AI, харнесс, промпты, ревью
category: prompts
layout: wide
toc: iterate=Если не подошло | review=Ревью ответа | next=Дальше по теме
---

<b-post series="prompts">
<b-flow lead label="Два подхода: цикл ответа и ревью с правкой запроса">
  <b-lane title="Ответ не подошёл" color="muted">
    <node icon="x" t="Ответ">мимо задачи</node>
    <node icon="refresh" t="Один из трёх путей">уточнить, переделать, спросить</node>
    <node icon="ai-box" t="Новый ответ">и снова проверка</node>
  </b-lane>
  <b-lane title="Ревью нашло пропуск" color="accent">
    <node icon="file" t="Запрос v1">исходное задание</node>
    <node icon="search" t="Ревью">два пропуска</node>
    <node icon="check" t="Запрос v2">и весь пайплайн заново</node>
  </b-lane>
</b-flow>
<b-cap>Оба подхода работают в любом харнессе: в чате, Claude Code, Codex или Cursor.</b-cap>

<b-chapter id="iterate" icon="refresh" title="Если ответ не подошёл">
  <b-art names="harness-work-approaches/answer-paths harness-work-approaches/answer-paths-mobile"/>
  <b-sublabel top="22">Путь 3: три вопроса и новый запрос</b-sublabel>
  <b-sublabel top="16">Шаг 1</b-sublabel>
  <b-prompt>
    [описание задачи]
    Прежде чем выполнять задачу, задай мне 3 вопроса, ответы на которые сильнее всего улучшат результат. Не начинай работу, пока я не отвечу.
  </b-prompt>
  <b-sublabel top="12">Шаг 2</b-sublabel>
  <b-why>Ответьте на вопросы модели своими словами в том же чате.</b-why>
  <b-sublabel top="12">Шаг 3</b-sublabel>
  <b-prompt>
    Собери из задачи и моих ответов итоговый промпт: роль, кому и зачем, данные, пример, формат, вопрос в конце. Выведи только текст промпта.
  </b-prompt>
  <b-finding>
    <ex>Три ситуации и одно действие в каждой: уточнить в том же диалоге, переделать запрос или сначала получить вопросы от модели.</ex>
    <gen>
      Уточнение сохраняет поданный контекст и подходит, когда задача понята верно. Если задача понята неверно, быстрее переделать запрос.
      Если модель выдумала факты, дайте в новом запросе нужные данные и разрешите ответить «не знаю»<b-proof href="https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations" quote="Anthropic: «Explicitly give Claude permission to admit uncertainty. This simple technique can drastically reduce false information» — platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations"/>.
      Новый ответ проверяется так же, и цикл повторяется, пока ответ не подойдёт.
      Вопросы от модели полезны, когда неясно, какой контекст нужен: неясность в запросе даёт модели простор для неверного толкования<b-proof href="https://claude.com/blog/best-practices-for-prompt-engineering" quote="Anthropic: «Don&#39;t assume the AI reads minds: Be specific about what you want. Leaving things ambiguous gives the AI room to misinterpret» — claude.com/blog/best-practices-for-prompt-engineering"/>,
      а при неясном намерении модели сами чаще просят уточнений<b-proof href="https://developers.openai.com/api/docs/guides/prompt-guidance" quote="OpenAI: «When the user&#39;s intent is unclear, the model is more likely to ask the user for clarification to proceed»; при этом «Before asking the user clarifying questions, you should complete the work that is already authorized from context» — developers.openai.com/api/docs/guides/prompt-guidance"/>.
    </gen>
    <do>Для новой задачи, в контексте которой вы не уверены, начните с просьбы задать три вопроса. Итоговый промпт из ответов отправьте новым запросом в новый чат.</do>
  </b-finding>
</b-chapter>

<b-chapter id="review" icon="search" title="Ревью ответа: правим исходный запрос">
  <b-why>Путь «переделать запрос» на примере: ревью нашло пропуски, в исходном запросе убрали лишнее и дописали недостающее, затем прогнали всё заново.</b-why>
  <b-art names="harness-work-approaches/two-runs harness-work-approaches/two-runs-mobile"/>
  <b-finding>
    <ex>Ревью нашло два случая, которых не было в задании: международный префикс без плюса и пустую строку. Из исходного запроса убрали лишнее ограничение «только номера РФ», дописали два случая и прогнали весь пайплайн заново.</ex>
    <gen>
      Найденный пропуск записывают в исходный запрос и запускают цикл с начала: агент заново пишет код, тесты и ревью проверяют уже с новыми случаями, а уточнение остаётся в задании для следующих запусков.
      Отдельный проход ревью со своей инструкцией описан в руководстве Google по промптингу<b-proof href="https://www.kaggle.com/whitepaper-prompt-engineering" quote="Google, Prompt Engineering whitepaper: раздел про работу с кодом, включая ревью и дебаг отдельным запросом — kaggle.com/whitepaper-prompt-engineering"/>.
    </gen>
    <do>Когда ревью что-то нашло, допишите это в исходный запрос и перезапустите весь цикл: правка, тесты, ревью.</do>
  </b-finding>
  <b-cta href="/blog/harness-driven-development/" k="Следующий шаг · HDD" t="Harness-Driven Development">Как пропуск, который повторяется от задачи к задаче, перенести из запроса в правила харнесса</b-cta>
</b-chapter>

<b-chapter id="next" title="Дальше по теме">
  <b-links cols="2">
    <item href="/blog/specs-rules-skills/" k="Контекст" t="Спеки, библия, правила и скиллы">Что агент должен знать о проекте</item>
    <item href="/blog/harness-driven-development/" k="Метод" t="Harness-Driven Development">Ошибка агента → правило окружения</item>
    <item href="/blog/work-prompts-examples/" k="Практика" t="Промпты для рабочих задач">Пять частей и шесть примеров</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="Сравнение" t="Сравнение харнессов">Claude Code, Codex, Cursor, Hermes и чат</item>
  </b-links>
</b-chapter>
<b-footer>Приёмы — по официальным руководствам Anthropic, OpenAI и Google, источник у значка рядом с утверждением. Цитаты из руководства Google даны пересказом.</b-footer>
</b-post>
