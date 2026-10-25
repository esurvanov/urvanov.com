import { POSTS, type Post } from '@/data/blog'
import { withLang, withSlash, type L, type Lang } from '@/lib/i18n'

// Глоссарий: наборы терминов. Термин = страница /materials/glossary/<slug>/.
// `match` — фрагменты регулярных выражений (без границ слова): по ним термин находится в тексте статей,
// из первого вхождения в статье делается ссылка на термин, а сама статья попадает в список «Где встречается».
export interface Term {
  slug: string
  name: L
  /** Расшифровка или короткий синоним: показывается рядом с названием */
  aka?: L
  /** 2–3 предложения: что это и зачем */
  def: L
  match: L<string[]>
  /** Слаги родственных терминов */
  related: string[]
  /** Совпадение с учётом регистра: найденный в тексте фрагмент должен быть ровно такой (ReAct и React — разные термины, а поиск по `match` не различает регистр) */
  exact?: string
  /** Свой заголовок и описание для поиска вместо шаблонных (описание до ~160 знаков) */
  seo?: { title: L; description: L }
  /** Ссылка «Подробнее» на статью блога: slug поста и подпись */
  more?: { post: string; label: L }
  /** Ещё статьи под нишевые запросы термина — вторичными ссылками рядом с «Подробнее» */
  also?: { post: string; label: L }[]
  /** Состав: список терминов-частей с первой фразой определения */
  parts?: { title: L; slugs: string[] }
  /** Короткие пояснения текстом: заголовок раздела и пункты «название — пара фраз» */
  notes?: { title: L; items: { name: L; text: L }[] }
  /** Внешний первоисточник: стандарт, сайт методологии */
  source?: { url: string; label: L }
  /** Таблица свойств: столбцы — варианты, строки — [свойство, значение для каждого столбца] */
  table?: { title: L; head: L<string[]>; rows: L<string[]>[] }
  /** Таблица сравнения: заголовок и строки [что сравниваем, левый, правый] */
  compare?: { title: L; head: L<string[]>; rows: L<string[]>[]; /** Термины столбцов: заголовок становится ссылкой */ headSlugs?: string[]; /** Названия строк тоже со ссылками на термины (например, компании) */ linkRows?: boolean }
  /** Матрица свойств: строки [свойство, ...значения]; значение: yes — есть, part — использует, но не задаёт, no — нет */
  matrix?: { title: L; head: L<string[]>; rows: L<string[]>[]; legend: L; /** Слаги терминов для каждой строки; название строки делится по «, » */ slugs?: string[][]; /** Термин для строки без замены подписи */ rowSlugs?: (string | null)[]; /** Термины для столбцов */ headSlugs?: string[] }
}

const Y = 'yes', N = 'no'

// Агенты для кода: умения общие (верхние строки), различаются местом работы, моделями и открытостью
const CODING_MATRIX: NonNullable<Term['matrix']> = {
  title: { ru: 'Что общего и чем отличаются', en: 'What they share and how they differ' },
  head: { ru: ['Claude Code', 'Codex', 'Cursor', 'Hermes'], en: ['Claude Code', 'Codex', 'Cursor', 'Hermes'] },
  headSlugs: ['claude-code', 'codex', 'cursor', 'hermes-agent'],
  rowSlugs: ['ai-agent', 'agents-md', 'ide', 'terminal', 'cloud-agent', 'llm', null],
  legend: { ru: '✓ есть · ✗ нет', en: '✓ has · ✗ none' },
  rows: [
    { ru: ['Правит код, запускает команды', Y, Y, Y, Y], en: ['Edits code, runs commands', Y, Y, Y, Y] },
    { ru: ['Файл правил', Y, Y, Y, Y], en: ['Rules file', Y, Y, Y, Y] },
    { ru: ['Свой редактор', N, N, Y, N], en: ['Own editor', N, N, Y, N] },
    { ru: ['Терминал', Y, Y, Y, Y], en: ['Terminal', Y, Y, Y, Y] },
    { ru: ['Задачи в облаке', Y, Y, Y, N], en: ['Tasks in the cloud', Y, Y, Y, N] },
    { ru: ['Модели разных компаний', N, N, Y, Y], en: ['Models from several vendors', N, N, Y, Y] },
    { ru: ['Ваш сервер', N, N, N, Y], en: ['Your own server', N, N, N, Y] },
  ],
}
const AGENT_MATRIX: NonNullable<Term['matrix']> = {
  title: { ru: 'Из чего состоит ИИ-агент', en: 'What an AI agent is made of' },
  head: { ru: ['Нейросеть (LLM)', 'Харнесс', 'ИИ-агент'], en: ['LLM', 'Harness', 'AI agent'] },
  headSlugs: ['llm', 'harness', 'ai-agent'],
  legend: { ru: 'Архитектура LLM-агента: нейросеть + харнесс (цикл, инструменты, контекст, правила, проверки). ✓ есть · ✗ нет', en: 'LLM agent architecture: LLM + harness (loop, tools, context, rules, checks). ✓ has · ✗ none' },
  rows: [
    { ru: ['LLM', Y, N, Y], en: ['LLM', Y, N, Y] },
    { ru: ['Цикл', N, Y, Y], en: ['Loop', N, Y, Y] },
    { ru: ['Тулы', N, Y, Y], en: ['Tools', N, Y, Y] },
    { ru: ['MCP-подключения', N, Y, Y], en: ['MCP connections', N, Y, Y] },
    { ru: ['Контекст', N, Y, Y], en: ['Context', N, Y, Y] },
    { ru: ['Память', N, Y, Y], en: ['Memory', N, Y, Y] },
    { ru: ['Рулы, библия, скиллы', N, Y, Y], en: ['Rules, bible, skills', N, Y, Y] },
    { ru: ['Права на тулы', N, Y, Y], en: ['Permissions on tools', N, Y, Y] },
    { ru: ['Песочница', N, Y, Y], en: ['Sandbox', N, Y, Y] },
    { ru: ['Хуки', N, Y, Y], en: ['Hooks', N, Y, Y] },
    { ru: ['Статические проверки', N, Y, Y], en: ['Static checks', N, Y, Y] },
    { ru: ['Human-in-the-loop', N, Y, Y], en: ['Human-in-the-loop', N, Y, Y] },
    { ru: ['Оркестрация', N, Y, Y], en: ['Orchestration', N, Y, Y] },
    { ru: ['Логи и трассировка', N, Y, Y], en: ['Logs and tracing', N, Y, Y] },
  ],
  slugs: [['llm'], ['agent-loop'], ['tool'], ['mcp'], ['context'], ['memory'], ['claude-md', 'bible', 'agent-skills'], ['permissions'], ['sandbox'], ['hooks'], ['checks'], ['human-in-the-loop'], ['orchestration'], ['tracing']],
}

export interface TermSet {
  slug: string
  icon: 'all' | 'harness' | 'specs' | 'prompts' | 'links' | 'research' | 'code' | 'tests'
  name: L
  hint: L
  terms: Term[]
}

export const TERM_SETS: TermSet[] = [
  {
    slug: 'agents',
    icon: 'all',
    name: { ru: 'Агенты и инструменты', en: 'Agents and tools' },
    hint: { ru: 'Кто выполняет работу и в чём', en: 'Who does the work and where' },
    terms: [
      {
        slug: 'ai-agent',
        name: { ru: 'ИИ-агент', en: 'AI agent' },
        aka: { ru: 'AI-агент, LLM-агент, агентный ИИ', en: 'LLM agent, agentic AI' },
        def: {
          ru: 'ИИ-агент (LLM-агент, агентный ИИ) — программа, в которой нейросеть (LLM) работает внутри харнесса: сама выбирает шаги, читает файлы, запускает команды, вызывает инструменты и проверяет результат прямо в вашей среде. Пример: Claude Code получает задачу «почини падающий тест», сам читает код, вносит правку, запускает тесты и повторяет, пока тест не пройдёт.',
          en: 'An AI agent (LLM agent, agentic AI) is a program where an LLM works inside a harness: it picks its own steps, reads files, runs commands, calls tools and checks the result right inside your environment. Example: Claude Code gets the task “fix the failing test”, reads the code, makes an edit, runs the tests and repeats until the test passes.',
        },
        match: { ru: ['ИИ-агент\\p{L}*', 'AI-агент\\p{L}*', 'агент\\p{L}*', 'ИИ', '(?<!(?:Alice|JetBrains|Apple|Google|Meta|Microsoft|Yandex|Fission) )AI', 'искусственн\\p{L}* интеллект\\p{L}*'], en: ['AI agents?', 'coding agents?', 'agents?', '(?<!(?:Alice|JetBrains|Apple|Google|Meta|Microsoft|Yandex|Fission) )AI', 'artificial intelligence'] },
        related: ['llm', 'harness', 'agent-loop', 'tool', 'claude-code'],
        source: { url: 'https://www.anthropic.com/engineering/building-effective-agents', label: { ru: 'Anthropic: как строить эффективных агентов', en: 'Anthropic: Building effective agents' } },
        seo: {
          title: { ru: 'ИИ-агент (LLM-агент): что это и как устроен — нейросеть + харнесс', en: 'AI agent (LLM agent) = LLM + harness: what it is' },
          description: {
            ru: 'ИИ-агент — программа, где нейросеть работает внутри харнесса и сама доводит задачу до результата. Архитектура LLM-агента в одной таблице и примеры: Claude Code, Codex, Cursor.',
            en: 'An AI agent is a program where an LLM works inside a harness and drives the task to a result. LLM agent architecture in one table, plus examples: Claude Code, Codex, Cursor.',
          },
        },
        parts: { title: { ru: 'Примеры ИИ-агентов', en: 'AI agent examples' }, slugs: ['claude-code', 'codex', 'cursor', 'hermes-agent', 'yandex'] },
        more: { post: 'ai-agent-llm-harness', label: { ru: 'Чем ИИ-агент отличается от ассистента, чата, чат-бота и нейросети', en: 'AI agent = LLM + harness: LLM vs harness vs agent' } },
        matrix: AGENT_MATRIX,
      },
      {
        slug: 'test-stand',
        name: { ru: 'Тестовый стенд', en: 'Staging environment' },
        aka: { ru: 'стенд в IT, тестовая среда, тестовый контур, препрод', en: 'test environment, test stand, staging, pre-prod' },
        def: {
          ru: 'Стенд в IT — отдельная копия системы, где можно пробовать и ломать, не задевая рабочую (прод). Обычно сред три: локальная у разработчика, тестовая (стенд) и рабочая; изменение идёт по ним по порядку. Перед рабочей иногда ставят ещё препрод (stage) — стенд, максимально похожий на прод. Агент воспроизводит баги и проверяет изменения именно на стенде. Зависимости системы, данные и внешние сервисы, подключают к стенду копиями настоящих или моками: копии ближе к правде, моки дешевле, поэтому ими пользуются чаще. От песочницы стенд отличается задачей: песочница ограждает действия агента, а стенд — копия всей системы. В 1С стенд — это тестовая база.',
          en: 'A separate copy of a system where you can try and break things without touching the live one (production). There are usually three environments: local on the developer’s machine, test (staging) and production; a change moves through them in order. Some teams add pre-prod right before production: a stand as close to production as possible. An agent reproduces bugs and checks changes on staging. The system’s dependencies, data and external services, are plugged in as copies of the real ones or as mocks: copies are closer to reality, mocks are cheaper and so used more often. Staging differs from a sandbox in purpose: a sandbox fences in the agent’s actions, while staging is a copy of the whole system. In 1C, staging is a test database.',
        },
        match: { ru: ['стенд\\p{L}*', 'тестов\\p{L}* сред\\p{L}*', 'тестов\\p{L}* контур\\p{L}*', 'препрод\\p{L}*'], en: ['test stands?', 'staging(?: environments?)?', 'test environments?'] },
        related: ['sandbox', 'ai-agent', 'claude-in-chrome', 'human-in-the-loop'],
        source: { url: 'https://en.wikipedia.org/wiki/Deployment_environment', label: { ru: 'Википедия: среды развёртывания', en: 'Wikipedia: Deployment environment' } },
        seo: {
          title: { ru: 'Стенд в IT: что это, какие бывают — тестовый, препрод, прод — и что можно ИИ-агенту', en: 'Staging environment: what it is, staging vs production vs development' },
          description: {
            ru: 'Стенд в IT и программировании — копия системы, где команда и ИИ-агент проверяют изменения, не трогая рабочую. Какие бывают стенды: локальный, тестовый, препрод, прод — и чем стенд отличается от песочницы.',
            en: 'A staging environment is a copy of the system where an agent and the team check changes without touching production. Development vs staging vs production, and how staging differs from a sandbox.',
          },
        },
        more: { post: 'mcp-1c', label: { ru: 'Локальная, тестовая и рабочая база на примере 1С', en: 'Local, test and production databases in 1C' } },
        compare: {
          title: { ru: 'Какие бывают стенды: локальный, тестовый, препрод, прод', en: 'Development vs staging vs pre-prod vs production' },
          head: { ru: ['Локальный', 'Тестовый', 'Препрод', 'Прод'], en: ['Development', 'Staging', 'Pre-prod', 'Production'] },
          rows: [
            { ru: ['Где', 'компьютер разработчика', 'отдельный сервер или база', 'сервер, настроенный как прод', 'сервер, с которым работают пользователи'], en: ['Where', 'the developer’s machine', 'a separate server or database', 'a server set up like production', 'the server users work with'] },
            { ru: ['Данные', 'тестовые или обезличенная копия', 'копия рабочих или моки', 'свежая копия рабочих', 'настоящие'], en: ['Data', 'test or anonymized copy', 'a copy of production or mocks', 'a fresh copy of production', 'real'] },
            { ru: ['Зачем', 'писать и сразу пробовать', 'проверить изменение целиком', 'последняя проверка перед выкладкой', 'работа пользователей'], en: ['What for', 'write and try right away', 'check the whole change', 'the last check before release', 'users’ work'] },
            { ru: ['Есть всегда', 'да', 'да', 'не всегда', 'да'], en: ['Always there', 'yes', 'yes', 'not always', 'yes'] },
            { ru: ['Что можно агенту', 'читать и писать', 'писать и запускать проверки', 'запускать проверки, правки — через выкладку', 'не пишет; читать — только если разрешили, переносит человек'], en: ['What the agent may do', 'read and write', 'write and run checks', 'run checks; changes only through a release', 'no writes; read only if allowed, a person moves changes'] },
          ],
        },
      },
      {
        slug: 'human-in-the-loop',
        name: { ru: 'Human-in-the-loop', en: 'Human in the loop' },
        aka: { ru: 'человек в контуре, человек в цикле, HITL', en: 'HITL, human approval' },
        def: {
          ru: 'Human-in-the-loop (HITL; перевод — «человек в контуре», дословно «человек в цикле») — принцип и концепция, по которым агент не завершает работу сам: на важных шагах решение принимает человек. Типичные точки остановки: выдать права, записать в рабочую систему, принять результат. Рядом есть human-on-the-loop: агент идёт без остановок, человек смотрит журнал его действий и может прервать работу.',
          en: 'Human in the loop (HITL) means the agent does not finish on its own: at the important steps it waits for a person’s approval. Typical stopping points: granting permissions, writing to a live system, accepting the result. Next to it is human on the loop: the agent runs without stops, and a person watches its action log and can interrupt the work.',
        },
        match: { ru: ['human-in-the-loop', 'human in the loop', 'человек\\p{L}* в контуре', 'HITL'], en: ['human-in-the-loop', 'human in the loop', 'HITL'] },
        related: ['ai-agent', 'harness', 'permissions', 'test-stand'],
        source: { url: 'https://en.wikipedia.org/wiki/Human-in-the-loop', label: { ru: 'Википедия: Human-in-the-loop', en: 'Wikipedia: Human-in-the-loop' } },
        seo: {
          title: { ru: 'Human in the loop (человек в контуре): что означает принцип и где ИИ-агент ждёт решения', en: 'Human in the loop (HITL) for AI agents: where the agent stops for approval' },
          description: {
            ru: 'Что означает human in the loop (HITL): перевод, принцип и концепция «человек в контуре» — ИИ-агент на важных шагах ждёт решения человека. Где ставить остановки и чем это отличается от human on the loop.',
            en: 'What human in the loop means for AI agents: at the important steps the agent waits for a person’s decision. Where to put approval points and how it differs from human on the loop.',
          },
        },
        compare: {
          title: { ru: 'Сколько решает человек', en: 'How much the person decides' },
          head: { ru: ['Human-in-the-loop', 'Human-on-the-loop', 'Без человека'], en: ['Human in the loop', 'Human on the loop', 'No human'] },
          rows: [
            { ru: ['Кто решает на важном шаге', 'человек подтверждает', 'агент, человек следит', 'агент'], en: ['Who decides at an important step', 'the person approves', 'the agent; the person watches', 'the agent'] },
            { ru: ['Когда человек вмешивается', 'на каждой точке остановки', 'когда видит, что что-то не так', 'никогда'], en: ['When the person steps in', 'at every stopping point', 'when something looks wrong', 'never'] },
            { ru: ['Пример для агента', 'запрос «разрешить запись в базу?»', 'агент работает, вы смотрите журнал и можете остановить', 'агент в песочнице на тестовом стенде'], en: ['Example for an agent', 'a prompt “allow writing to the database?”', 'the agent works, you watch the log and can stop it', 'an agent in a sandbox on staging'] },
            { ru: ['Где уместно', 'рабочие системы, деньги, чужие данные', 'долгие задачи с понятными рисками', 'то, что легко откатить'], en: ['Where it fits', 'live systems, money, other people’s data', 'long tasks with known risks', 'anything easy to roll back'] },
          ],
        },
      },
      {
        slug: 'llm',
        name: { ru: 'LLM', en: 'LLM' },
        aka: { ru: 'большая языковая модель, LLM-модель, языковая модель', en: 'large language model, LLM model' },
        def: {
          ru: 'LLM (large language model, большая языковая модель) — в IT так называют нейросеть, обученная на больших объёмах текста и кода, которая продолжает текст по запросу; текст она читает и пишет токенами. Сама только отвечает; чтобы действовать в вашей среде, ей нужен харнесс, а модель вместе с харнессом и есть агент.',
          en: 'An LLM (large language model) is a neural network trained on large volumes of text and code that continues text from a prompt; it reads and writes text in tokens. On its own it only replies; to act in your environment it needs a harness, and a model together with a harness is an agent.',
        },
        match: { ru: ['LLM', 'языков\\p{L}* модел\\p{L}*'], en: ['LLMs?', 'language models?'] },
        related: ['ai-agent', 'prompt', 'token', 'context', 'hallucination'],
        source: { url: 'https://en.wikipedia.org/wiki/Large_language_model', label: { ru: 'Википедия: большая языковая модель', en: 'Wikipedia: Large language model' } },
        seo: {
          title: { ru: 'LLM: что это в IT простыми словами — большая языковая модель и чем она отличается от ИИ-агента', en: 'LLM meaning: what a large language model is and how it differs from an AI agent' },
          description: {
            ru: 'LLM (большая языковая модель) простыми словами: что это в IT и программировании, как модель читает текст токенами, что держит в контексте и почему без харнесса сама ничего не делает. Примеры: GPT, Claude, DeepSeek, Alice AI.',
            en: 'LLM meaning in plain words: a large language model reads text in tokens, keeps a context and only replies on its own; with a harness it becomes an agent. Examples: GPT, Claude, DeepSeek, Alice AI.',
          },
        },
        compare: {
          title: { ru: 'Примеры LLM: кто делает и какие агенты на них работают', en: 'LLM examples: who makes them and which agents run on them' },
          head: { ru: ['Модели (LLM)', 'Агенты и инструменты на них'], en: ['Models (LLMs)', 'Agents and tools on top'] },
          linkRows: true,
          rows: [
            { ru: ['OpenAI', 'GPT', 'ChatGPT, Codex'], en: ['OpenAI', 'GPT', 'ChatGPT, Codex'] },
            { ru: ['Anthropic', 'Claude: Opus, Sonnet, Haiku', 'Claude, Claude Code, Claude in Chrome'], en: ['Anthropic', 'Claude: Opus, Sonnet, Haiku', 'Claude, Claude Code, Claude in Chrome'] },
            { ru: ['Anysphere', 'Composer', 'Cursor (там же модели других компаний)'], en: ['Anysphere', 'Composer', 'Cursor (with other vendors’ models too)'] },
            { ru: ['DeepSeek', 'серии V и R', 'свой чат и API; подключают к агентам через API'], en: ['DeepSeek', 'the V and R series', 'its own chat and API; plugged into agents through the API'] },
            { ru: ['Яндекс', 'Alice AI (раньше YandexGPT)', 'ассистент и корпоративный агент Alice AI Pro'], en: ['Yandex', 'Alice AI (formerly YandexGPT)', 'the assistant and the Alice AI Pro business agent'] },
            { ru: ['Nous Research', 'Hermes', 'Hermes Agent (работает и с моделями других компаний)'], en: ['Nous Research', 'Hermes', 'Hermes Agent (works with other vendors’ models too)'] },
          ],
        },
      },
      {
        slug: 'ide',
        name: { ru: 'IDE', en: 'IDE' },
        aka: { ru: 'среда разработки, интегрированная среда разработки, IDE с ИИ, IDE со встроенным ИИ', en: 'integrated development environment, AI IDE, AI-native IDE' },
        def: {
          ru: 'Программа, в которой пишут код: редактор, подсказки, отладчик и запуск проекта в одном окне. VS Code и JetBrains — типичные примеры. Агенты встраиваются в IDE расширениями и показывают правки прямо в файлах. IDE с ИИ (AI IDE) — среда, где агент встроен с самого начала, как в Cursor. Тот же агент может работать и без IDE — в терминале (CLI), как Claude Code и Codex.',
          en: 'The program where code is written: editor, hints, debugger and project launcher in one window. VS Code and JetBrains are typical examples. Agents plug into an IDE through extensions and show edits right in the files. An AI IDE (AI-native IDE) is one where the agent is built in from the start, as in Cursor, a VS Code fork. The alternative is a CLI agent in the terminal, like Claude Code and Codex.',
        },
        match: { ru: ['IDE'], en: ['IDEs?'] },
        related: ['vs-code', 'jetbrains', 'terminal', 'cursor', 'claude-code'],
        source: { url: 'https://en.wikipedia.org/wiki/Integrated_development_environment', label: { ru: 'Википедия: среда разработки', en: 'Wikipedia: Integrated development environment' } },
        seo: {
          title: { ru: 'IDE: что это в программировании — среда разработки и IDE с ИИ-агентом', en: 'AI IDE vs CLI agent: what an AI IDE is and how agents work in VS Code and JetBrains' },
          description: {
            ru: 'IDE (интегрированная среда разработки) — программа, где пишут код: редактор, отладчик, запуск. Чем обычная IDE отличается от IDE со встроенным ИИ и от агента в терминале: VS Code и JetBrains с расширениями, Cursor, Claude Code и Codex.',
            en: 'What an AI IDE is: an IDE with a built-in agent, like Cursor, a VS Code fork. AI IDE vs a CLI agent in the terminal (Claude Code, Codex) vs VS Code and JetBrains with agent extensions.',
          },
        },
        notes: {
          title: { ru: 'Обычная IDE, IDE с ИИ и агент в терминале', en: 'Plain IDE vs AI IDE vs CLI agent' },
          items: [
            { name: { ru: 'Обычная IDE', en: 'Plain IDE' }, text: { ru: 'VS Code, JetBrains. Код пишете вы, среда подсказывает и запускает.', en: 'VS Code, JetBrains. You write the code; the environment hints and runs it.' } },
            { name: { ru: 'IDE + расширение агента', en: 'IDE + agent extension' }, text: { ru: 'VS Code или JetBrains с Claude Code или Codex. Агент ставится отдельно, пишет код по вашей задаче на моделях своей компании, вы смотрите правки в файлах.', en: 'VS Code or JetBrains with Claude Code or Codex. The agent is installed separately, writes code from your task on its vendor’s models, and you review edits in the files.' } },
            { name: { ru: 'IDE с ИИ', en: 'AI IDE' }, text: { ru: 'Cursor. Агент — часть самой программы, модели выбираете из разных компаний.', en: 'Cursor. The agent is part of the program itself, and you pick models from several vendors.' } },
            { name: { ru: 'Агент в терминале (CLI)', en: 'CLI agent' }, text: { ru: 'Claude Code, Codex CLI. Отдельная программа, IDE не нужна; правки смотрите в своём редакторе или в git.', en: 'Claude Code, Codex CLI. A separate program, no IDE needed; you review edits in your editor or in git.' } },
          ],
        },
      },
      {
        slug: 'vs-code',
        name: { ru: 'VS Code', en: 'VS Code' },
        aka: { ru: 'Visual Studio Code', en: 'Visual Studio Code' },
        def: {
          ru: 'VS Code (Visual Studio Code) — бесплатный редактор кода от Microsoft с открытым исходным кодом. Возможности в нём добавляются расширениями, в том числе ИИ-агентами: GitHub Copilot, Claude Code, Codex, Cline. На его основе сделан Cursor.',
          en: 'VS Code (Visual Studio Code) is a free, open-source code editor from Microsoft. Features are added with extensions, including AI agents: GitHub Copilot, Claude Code, Codex, Cline. Cursor is built on top of it.',
        },
        match: { ru: ['VS Code', 'Visual Studio Code'], en: ['VS Code', 'Visual Studio Code'] },
        related: ['ide', 'microsoft', 'cursor', 'jetbrains'],
        source: { url: 'https://code.visualstudio.com/', label: { ru: 'Официальный сайт VS Code', en: 'VS Code official site' } },
        seo: {
          title: { ru: 'VS Code: что это и какие ИИ-агенты в нём работают — Copilot, Claude Code, Codex', en: 'AI agents in VS Code: Claude Code, Codex and Copilot in Visual Studio Code' },
          description: {
            ru: 'VS Code — бесплатный редактор кода от Microsoft. Какие ИИ-агенты для VS Code бывают: GitHub Copilot, Claude Code, Codex, Cline, GigaCode — какие из них бесплатные и как подключить Claude к VS Code.',
            en: 'VS Code is Microsoft’s free code editor. Which AI agents run in it: GitHub Copilot, Claude Code, Codex, Cline — which are free and how Claude Code works in VS Code.',
          },
        },
        notes: {
          title: { ru: 'ИИ-агенты для VS Code', en: 'AI agents for VS Code' },
          items: [
            { name: { ru: 'GitHub Copilot', en: 'GitHub Copilot' }, text: { ru: 'встроен в VS Code от Microsoft, есть режим агента и бесплатный тариф с лимитами.', en: 'built into VS Code by Microsoft, with an agent mode and a free tier with limits.' } },
            { name: { ru: 'Claude Code', en: 'Claude Code' }, text: { ru: 'расширение от Anthropic: тот же агент, что в терминале, по подписке Claude или оплате по API.', en: 'an extension from Anthropic: the same agent as in the terminal, on a Claude plan or pay-as-you-go API.' } },
            { name: { ru: 'Codex', en: 'Codex' }, text: { ru: 'расширение от OpenAI, входит в тарифы ChatGPT.', en: 'an extension from OpenAI, included in ChatGPT plans.' } },
            { name: { ru: 'Cline', en: 'Cline' }, text: { ru: 'открытое бесплатное расширение: подключаете свой ключ любой модели, платите только за неё.', en: 'a free open-source extension: you plug in your own key for any model and pay only for the model.' } },
            { name: { ru: 'GigaCode', en: 'GigaCode' }, text: { ru: 'агент от Сбера с расширением для VS Code.', en: 'Sber’s agent with a VS Code extension.' } },
            { name: { ru: 'Cursor', en: 'Cursor' }, text: { ru: 'отдельный редактор на основе VS Code со встроенным агентом; ставится вместо VS Code, расширения VS Code в нём работают.', en: 'a separate editor built on VS Code with a built-in agent; you install it instead of VS Code, and VS Code extensions work in it.' } },
          ],
        },
      },
      {
        slug: 'terminal',
        name: { ru: 'Терминал', en: 'Terminal' },
        aka: { ru: 'командная строка, CLI, интерфейс командной строки', en: 'command line, CLI' },
        def: {
          ru: 'Окно, где команды вводят текстом; по-английски это CLI — интерфейс командной строки. CLI-агент работает прямо в терминале: видит те же файлы и программы, что и вы, и запускает их сам — тесты, сборку, git. Доступ ограничивают правилами разрешений.',
          en: 'A window where commands are typed as text, also called the CLI (command-line interface). An AI CLI agent works right in the terminal: it sees the same files and programs you do and runs them itself — tests, builds, git. Access is limited by permission rules.',
        },
        match: { ru: ['терминал\\p{L}*', 'командн\\p{L}* строк\\p{L}*'], en: ['terminals?', 'command line'] },
        related: ['ide', 'claude-code', 'codex', 'hermes-agent', 'permissions'],
        source: { url: 'https://en.wikipedia.org/wiki/Command-line_interface', label: { ru: 'Википедия: командная строка', en: 'Wikipedia: Command-line interface' } },
        seo: {
          title: { ru: 'Терминал и CLI: что это и какие бывают CLI-агенты, в том числе бесплатные — Claude Code, Codex CLI, OpenCode', en: 'AI CLI agents: what the terminal (CLI) is and which coding agents run in it, free ones included' },
          description: {
            ru: 'Терминал (CLI, командная строка) — окно, где команды вводят текстом. Что такое CLI-агент: ИИ в терминале, который сам запускает тесты, сборку и git. Claude Code, Codex CLI, бесплатные OpenCode и Hermes Agent, что стало с Gemini CLI и чем CLI-агент отличается от агента в IDE.',
            en: 'The terminal (CLI) is where commands are typed as text. What an AI CLI agent is: it runs tests, builds and git in the terminal itself. Claude Code, Codex CLI, the free OpenCode and Hermes Agent, what happened to Gemini CLI, and how a CLI agent differs from one in an IDE.',
          },
        },
        notes: {
          title: { ru: 'CLI-агенты', en: 'AI CLI agents' },
          items: [
            { name: { ru: 'Claude Code', en: 'Claude Code' }, text: { ru: 'агент Anthropic: запускается командой claude в папке проекта; по подписке Claude или оплате по API.', en: 'Anthropic’s agent: you start it with the claude command in the project folder; on a Claude plan or pay-as-you-go API.' } },
            { name: { ru: 'Codex CLI', en: 'Codex CLI' }, text: { ru: 'агент OpenAI: команда codex, входит в тарифы ChatGPT.', en: 'OpenAI’s agent: the codex command, included in ChatGPT plans.' } },
            { name: { ru: 'OpenCode', en: 'OpenCode' }, text: { ru: 'бесплатный открытый агент: работает с моделями разных компаний и с локальными, платите только за модель.', en: 'a free open-source agent: works with models from many vendors and with local ones; you pay only for the model.' } },
            { name: { ru: 'Gemini CLI', en: 'Gemini CLI' }, text: { ru: 'открытый агент Google на моделях Gemini; с 18 июня 2026 работает только для компаний и платных ключей API.', en: 'Google’s open-source agent on Gemini models; since June 18, 2026 it works only for companies and paid API keys.' } },
            { name: { ru: 'Antigravity CLI', en: 'Antigravity CLI' }, text: { ru: 'агент Google; с 18 июня 2026 заменил для обычных пользователей Gemini CLI, сам закрытый.', en: 'Google’s agent; since June 18, 2026 it replaced Gemini CLI for individual users, and it is closed-source itself.' } },
            { name: { ru: 'Hermes Agent', en: 'Hermes Agent' }, text: { ru: 'бесплатный открытый агент Nous Research: работает на вашем сервере с любой моделью, управлять им можно из терминала и через мессенджеры.', en: 'Nous Research’s free open-source agent: runs on your server with any model; you control it from the terminal or through messengers.' } },
            { name: { ru: 'Чем отличается от агента в IDE', en: 'How it differs from an agent in an IDE' }, text: { ru: 'редактор не нужен: правки смотрите в своём редакторе или в git, а агента можно запускать из скриптов.', en: 'no editor needed: you review edits in your own editor or in git, and you can run the agent from scripts.' } },
          ],
        },
      },
      {
        slug: 'tool',
        name: { ru: 'Tool (инструмент) и tool calling', en: 'Tool and tool calling' },
        aka: { ru: 'тул, вызов инструментов, function calling', en: 'tool call, tool use, function calling' },
        def: {
          ru: 'Tool (инструмент) — действие, которое агент может вызвать: прочитать файл, найти заявку в Jira, выполнить запрос к базе. Набор инструментов (тулов) задаёт, что агент умеет и что ему доступно. Вызов инструмента (tool calling, function calling) устроен так: модель возвращает имя функции и параметры, например `search_jira` с запросом «вход»; харнесс выполняет вызов и передаёт результат обратно модели.',
          en: 'A tool is an action the agent can call: read a file, find a ticket in Jira, run a database query. The set of tools defines what the agent can do and what it can reach. Tool calling (function calling) works like this: the model returns a function name and arguments, for example `search_jira` with the query “login”; the harness runs the call and passes the result back to the model.',
        },
        match: { ru: ['инструмент\\p{L}*', 'тул(?:ы|ов|ам|ами|ах|а|у|ом|е)?(?!\\p{L})', 'tool calling', 'function calling'], en: ['tools?', 'tool calling', 'tool use', 'function calling'] },
        related: ['ai-agent', 'mcp', 'permissions', 'harness', 'llm'],
        source: { url: 'https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview', label: { ru: 'Anthropic: вызов инструментов', en: 'Anthropic: Tool use docs' } },
        seo: {
          title: { ru: 'Tool calling: что такое инструменты ИИ-агента и вызов функций (function calling) — и при чём тут MCP', en: 'Tool calling vs MCP: what an AI agent tool is and how function calling works' },
          description: {
            ru: 'Tool calling (function calling, вызов инструментов) простыми словами: модель выбирает инструмент и параметры — прочитать файл, найти заявку в Jira, сделать запрос к базе, — а харнесс выполняет вызов. Как проходит вызов по шагам и чем tool calling отличается от MCP.',
            en: 'Tool calling (function calling) in plain words: the model picks a tool and its arguments, such as reading a file or querying a database, and the harness runs the call. The steps of a tool call, and tool calling vs MCP.',
          },
        },
        notes: {
          title: { ru: 'Как проходит вызов инструмента', en: 'How a tool call works' },
          items: [
            { name: { ru: '1. Описание', en: '1. Description' }, text: { ru: 'вместе с задачей харнесс отправляет модели список инструментов. Для каждого — имя (`search_jira`), что делает («ищет заявки в Jira») и параметры (`query` — строка поиска).', en: 'along with the task, the harness sends the model a list of tools. For each: a name (`search_jira`), what it does (“searches Jira tickets”) and parameters (`query`, a search string).' } },
            { name: { ru: '2. Вызов от модели', en: '2. The model’s call' }, text: { ru: 'модель возвращает вызов в формате JSON: `{"name": "search_jira", "arguments": {"query": "вход"}}`.', en: 'the model returns a call as JSON: `{"name": "search_jira", "arguments": {"query": "login"}}`.' } },
            { name: { ru: '3. Выполнение', en: '3. Execution' }, text: { ru: 'харнесс сверяет вызов с правами доступа и делает запрос к Jira. Запись или удаление он сначала показывает человеку на подтверждение.', en: 'the harness checks the call against permissions and queries Jira. Writes and deletions are shown to a person for approval first.' } },
            { name: { ru: '4. Результат', en: '4. The result' }, text: { ru: 'ответ Jira («3 заявки: …») харнесс добавляет в контекст и снова запускает модель. Модель вызывает следующий инструмент или пишет ответ.', en: 'the harness adds Jira’s answer (“3 tickets: …”) to the context and runs the model again. The model calls the next tool or writes the answer.' } },
            { name: { ru: 'Какие модели умеют', en: 'Which models support it' }, text: { ru: 'модели OpenAI (GPT), Anthropic (Claude), DeepSeek и другие современные LLM; локальные — через Ollama, если у модели есть поддержка инструментов.', en: 'models from OpenAI (GPT), Anthropic (Claude), DeepSeek and other current LLMs; local ones through Ollama, if the model supports tools.' } },
            { name: { ru: 'Tool calling и MCP', en: 'Tool calling vs MCP' }, text: { ru: 'tool calling — формат вызова из шагов 2–4. MCP — протокол, по которому внешняя система (Jira, база 1С) сама сообщает агенту список своих инструментов и выполняет их вызовы.', en: 'tool calling is the call format from steps 2–4. MCP is a protocol through which an outside system (Jira, a 1C database) gives the agent its own list of tools and runs their calls.' } },
          ],
        },
      },
      {
        slug: 'cloud-agent',
        name: { ru: 'Облачный ИИ-агент', en: 'Cloud coding agent' },
        aka: { ru: 'облачный агент, фоновый агент, работа в облаке', en: 'cloud agent, background agent, remote agent' },
        def: {
          ru: 'Облачный ИИ-агент — ИИ-агент, который выполняет задачу на удалённом сервере в изолированной среде с копией вашего репозитория. Можно запустить и закрыть ноутбук: результат придёт готовой веткой или запросом на слияние. Так работают Codex в облаке, Claude Code в вебе и облачные агенты Cursor.',
          en: 'A cloud coding agent is an AI agent that runs a task on a remote server in an isolated environment with a copy of your repo. You can start it and close the laptop: the result arrives as a ready branch or pull request. Codex cloud, Claude Code on the web and Cursor cloud agents work this way.',
        },
        match: { ru: ['облачн\\p{L}* (?:ИИ-)?агент\\p{L}*', 'фонов\\p{L}* агент\\p{L}*', 'в облаке'], en: ['cloud (?:coding )?agents?', 'background agents?', 'in the cloud'] },
        related: ['ai-agent', 'sandbox', 'codex', 'claude-code', 'cursor'],
        source: { url: 'https://code.claude.com/docs/en/claude-code-on-the-web', label: { ru: 'Claude Code в облаке', en: 'Claude Code in the cloud docs' } },
        seo: {
          title: { ru: 'Облачный ИИ-агент: что это, чем отличается от локального и как запускать с телефона — Codex, Claude Code', en: 'Cloud coding agents: cloud vs local, and running Codex or Claude Code from your phone' },
          description: {
            ru: 'Облачный ИИ-агент работает на удалённом сервере с копией репозитория и присылает готовую ветку. Чем облачный агент отличается от локального, как поставить задачу Codex или Claude Code с телефона и когда для этого нужен включённый компьютер.',
            en: 'A cloud coding agent works on a remote server with a copy of your repo and sends back a ready branch. Codex cloud vs local, background vs cloud agents, and how to run Codex or Claude Code from your phone, with or without your computer on.',
          },
        },
        notes: {
          title: { ru: 'Облачный агент и локальный', en: 'Cloud agent vs local agent' },
          items: [
            { name: { ru: 'Где работает', en: 'Where it runs' }, text: { ru: 'облачный — на сервере компании-разработчика агента; локальный — на вашем компьютере.', en: 'a cloud agent runs on the agent vendor’s server; a local one runs on your computer.' } },
            { name: { ru: 'Нужен ли ваш компьютер', en: 'Does it need your computer' }, text: { ru: 'облачному нет: задачу можно поставить с телефона и закрыть ноутбук. Локальный работает, пока включён компьютер.', en: 'a cloud one does not: you can start a task from your phone and close the laptop. A local one works while your computer is on.' } },
            { name: { ru: 'С телефона', en: 'From your phone' }, text: { ru: 'облачному агенту задачу ставят в приложении или в браузере телефона, компьютер не нужен. Локальным агентом с телефона тоже можно управлять — через Remote Control в Claude Code и раздел Remote в приложении ChatGPT для Codex, — но компьютер должен быть включён и в сети.', en: 'you give a cloud agent a task in the phone app or browser, no computer needed. You can also steer a local agent from your phone, through Remote Control in Claude Code and Remote in the ChatGPT app for Codex, but your computer has to be on and online.' } },
            { name: { ru: 'Что видит', en: 'What it sees' }, text: { ru: 'облачный — только репозиторий и то, что подключили к среде; локальный — ваши файлы, программы и вход в сервисы.', en: 'a cloud one sees only the repo and what you connect to its environment; a local one sees your files, programs and logins.' } },
            { name: { ru: 'Что получаете', en: 'What you get' }, text: { ru: 'облачный присылает ветку или запрос на слияние; локальный правит файлы у вас на глазах.', en: 'a cloud one sends a branch or a pull request; a local one edits files in front of you.' } },
            { name: { ru: 'Когда что', en: 'When to use which' }, text: { ru: 'облачный — для нескольких задач параллельно и долгих задач; локальный — когда нужен ваш стенд, браузер или быстрые правки по ходу.', en: 'cloud for several tasks in parallel and long tasks; local when you need your test stand, browser or quick edits as you go.' } },
          ],
        },
      },
      {
        slug: 'sandbox',
        name: { ru: 'Песочница', en: 'Sandbox' },
        def: {
          // Общее определение. Что именно внутри, зависит от продукта (проверено по документации, октябрь 2026):
          // - Claude Code на своём компьютере и Cursor: только команды терминала (Seatbelt на macOS, bubblewrap на Linux);
          //   встроенная правка файлов, MCP-серверы и хуки идут снаружи, их держат права доступа. У Cursor сеть из песочницы закрыта.
          // - Claude Code в облаке, Claude Managed Agents, Cowork: агент целиком в отдельной виртуальной машине или контейнере.
          // - Hermes Agent: по умолчанию без песочницы; с бэкендом Docker, Modal, Daytona и т. п. все команды идут в контейнере.
          ru: 'Огороженное место, где выполняются действия агента: там видны только разрешённые папки, а в сеть можно только на разрешённые адреса. Если агент ошибётся или его обманут, ущерб останется внутри. В одних продуктах ограждены только команды терминала, в других агент целиком работает в контейнере или виртуальной машине.',
          en: 'A fenced place where an agent’s actions run: only allowed folders are visible and only allowed network hosts are reachable. If the agent errs or is tricked, the damage stays inside. Some products fence only terminal commands, others run the whole agent inside a container or a virtual machine.',
        },
        match: { ru: ['песочниц\\p{L}*'], en: ['sandbox\\p{L}*'] },
        related: ['cloud-agent', 'human-in-the-loop', 'prompt-injection'],
        source: { url: 'https://code.claude.com/docs/en/sandboxing', label: { ru: 'Claude Code: песочница', en: 'Claude Code sandboxing docs' } },
      },
      {
        slug: 'subagent',
        name: { ru: 'Субагент', en: 'Subagent' },
        def: {
          ru: 'Помощник, которого главный агент запускает на отдельную часть работы, например поиск по коду или ревью. У него свой чистый контекст, а в основной разговор он возвращает только итог.',
          en: 'A helper the main agent launches for a separate piece of work, such as a code search or a review. It has its own clean context and returns only the result to the main conversation.',
        },
        match: { ru: ['субагент\\p{L}*'], en: ['subagents?', 'sub-agents?'] },
        related: ['ai-agent', 'context', 'claude-code'],
        source: { url: 'https://code.claude.com/docs/en/sub-agents', label: { ru: 'Claude Code: субагенты', en: 'Claude Code subagents docs' } },
      },
    ],
  },
  {
    slug: 'coding-agents',
    icon: 'all',
    name: { ru: 'Агенты для программирования', en: 'Coding agents' },
    hint: { ru: 'Готовые агенты: где работают и на каких моделях', en: 'Ready-made agents: where they run and on which models' },
    terms: [
      {
        slug: 'claude-code',
        name: { ru: 'Claude Code', en: 'Claude Code' },
        aka: { ru: 'Клод Код, Claude Code CLI', en: 'Claude Code CLI, Anthropic coding agent' },
        def: {
          ru: 'Агент для программирования от Anthropic: читает проект, правит файлы, запускает команды и тесты, работает с git. Работает в терминале (CLI), в VS Code и JetBrains, в приложении для компьютера и в браузере — везде это один и тот же агент. Своей нейросети у него нет: работает на моделях Claude (Opus, Sonnet, Haiku), модель меняют командой `/model`. Правила проекта читает из `CLAUDE.md`, повторяющиеся процессы держит в скиллах, внешние системы подключает через MCP. Ближайшие аналоги — Codex и Cursor.',
          en: 'A coding agent from Anthropic: it reads the project, edits files, runs commands and tests, and works with git. It runs in the terminal (CLI), in VS Code and JetBrains, in the desktop app and in the browser, and it is the same agent everywhere. It has no model of its own: it runs on Claude models (Opus, Sonnet, Haiku); you switch the model with `/model`. It reads project rules from `CLAUDE.md`, keeps repeatable processes in skills and connects outside systems through MCP. Its closest alternatives are Codex and Cursor.',
        },
        match: { ru: ['Claude Code', 'Клод Код\\p{L}*'], en: ['Claude Code'] },
        related: ['ai-agent', 'claude-md', 'mcp', 'agent-skills', 'session'],
        source: { url: 'https://code.claude.com/docs/en/overview', label: { ru: 'Документация Claude Code', en: 'Claude Code docs' } },
        seo: {
          title: { ru: 'Claude Code (Клод Код): что это и чем отличается от Claude в чате', en: 'What is Claude Code? Claude Code vs Claude chat, models and setup' },
          description: {
            ru: 'Что такое Claude Code (Клод Код) и что он делает: читает проект, правит файлы, запускает тесты. Чем отличается от Claude в чате, на каких моделях работает, CLAUDE.md, скиллы и MCP.',
            en: 'What Claude Code is used for: it reads your project, edits files and runs tests. Claude Code vs Claude chat, which models it uses, CLAUDE.md, skills and MCP.',
          },
        },
        more: { post: 'ai-in-code-harness-and-tools', label: { ru: 'Claude Code, Codex, Cursor и Hermes Agent: что выбрать', en: 'Claude Code, Codex, Cursor and Hermes Agent: which to pick' } },
        compare: {
          title: { ru: 'Чем Claude Code отличается от Claude в чате', en: 'Claude Code vs Claude: the difference' },
          head: { ru: ['Claude в чате', 'Claude Code'], en: ['Claude chat', 'Claude Code'] },
          rows: [
            { ru: ['Где работает', 'браузер, телефон, приложение', 'терминал, VS Code и JetBrains, приложение, браузер'], en: ['Where it runs', 'browser, phone, app', 'terminal, VS Code and JetBrains, app, browser'] },
            { ru: ['Видит ваш проект', 'нет, только то, что вставили', 'да, сам читает файлы'], en: ['Sees your project', 'no, only what you paste', 'yes, it reads the files'] },
            { ru: ['Что делает', 'отвечает текстом', 'правит файлы, запускает команды и тесты, работает с git'], en: ['What it does', 'replies with text', 'edits files, runs commands and tests, works with git'] },
            { ru: ['Модель', 'модели Claude', 'те же модели Claude, смена через /model'], en: ['Model', 'Claude models', 'the same Claude models, switched with /model'] },
            { ru: ['Правила проекта', 'проекты и инструкции', 'файл CLAUDE.md в репозитории'], en: ['Project rules', 'projects and instructions', 'a CLAUDE.md file in the repo'] },
            { ru: ['Внешние системы', 'коннекторы', 'MCP-серверы'], en: ['Outside systems', 'connectors', 'MCP servers'] },
            { ru: ['Оплата', 'подписка Claude', 'та же подписка Claude (Pro, Max) или оплата по API'], en: ['Pricing', 'a Claude plan', 'the same Claude plan (Pro, Max) or pay-as-you-go API'] },
          ],
        },
        matrix: CODING_MATRIX,
      },
      {
        slug: 'codex',
        name: { ru: 'Codex', en: 'Codex' },
        aka: { ru: 'OpenAI Codex, Codex AI, Codex в ChatGPT', en: 'OpenAI Codex, Codex AI, ChatGPT Codex' },
        def: {
          ru: 'Программа-агент от OpenAI для программирования на моделях GPT: читает проект, правит файлы, запускает команды и тесты, готовит пулл-реквесты. Работает в ChatGPT, в приложении для компьютера, в терминале, в IDE и в облаке, где задачи идут в отдельной песочнице; везде это один агент, и он входит в тарифы ChatGPT, лимиты зависят от тарифа. Устроен как Claude Code и Cursor. Инструкции проекта читает из `AGENTS.md`, повторяющиеся процессы держит в скиллах, внешние системы подключает через MCP.',
          en: 'A coding agent app from OpenAI on GPT models: it reads the project, edits files, runs commands and tests, and prepares pull requests. It runs in ChatGPT, in the desktop app, in the terminal, in the IDE and in the cloud, where tasks run in a separate sandbox; it is one agent everywhere and comes with ChatGPT plans, with limits that depend on the plan. It is built like Claude Code and Cursor. It reads project instructions from `AGENTS.md`, keeps repeatable processes in skills and connects outside systems through MCP.',
        },
        match: { ru: ['(?:OpenAI )?Codex(?: AI| CLI)?'], en: ['(?:OpenAI )?Codex(?: AI| CLI)?'] },
        related: ['openai', 'agents-md', 'claude-code', 'cursor', 'ai-agent'],
        source: { url: 'https://github.com/openai/codex', label: { ru: 'Репозиторий Codex на GitHub', en: 'Codex GitHub repo' } },
        seo: {
          title: { ru: 'Codex от OpenAI: что это и чем отличается от ChatGPT', en: 'What is OpenAI Codex: Codex vs ChatGPT Chat and Work' },
          description: {
            ru: 'Codex — что это за программа: агент OpenAI для кода, который сам читает проект, правит файлы и запускает тесты. Чем отличается от ChatGPT Chat и Work, где работает, какие тарифы.',
            en: 'OpenAI Codex is a coding agent that reads your repo, edits files and runs tests. How it differs from ChatGPT Chat and Work, where it runs and which plans include it.',
          },
        },
        more: { post: 'ai-in-code-harness-and-tools', label: { ru: 'Claude Code, Codex, Cursor и Hermes Agent: что выбрать', en: 'Claude Code, Codex, Cursor and Hermes Agent: which to pick' } },
        compare: {
          title: { ru: 'Чем Codex отличается от ChatGPT: Chat и Work', en: 'Codex vs ChatGPT: Chat and Work' },
          head: { ru: ['ChatGPT Chat', 'ChatGPT Work', 'Codex'], en: ['ChatGPT Chat', 'ChatGPT Work', 'Codex'] },
          rows: [
            { ru: ['Что это', 'чат', 'агент для многошаговых задач', 'агент для кода'], en: ['What it is', 'a chat', 'an agent for multi-step tasks', 'a coding agent'] },
            { ru: ['Что получаете', 'ответ текстом', 'готовый результат: исследование, документ, презентацию, таблицу', 'правки в коде, пройденные тесты, пулл-реквест'], en: ['What you get', 'a text reply', 'a finished deliverable: research, a document, slides, a spreadsheet', 'code changes, passing tests, a pull request'] },
            { ru: ['Видит ваш проект', 'нет, только то, что вставили', 'файлы, к которым дали доступ', 'да, сам читает репозиторий'], en: ['Sees your project', 'no, only what you paste', 'files you give it access to', 'yes, it reads the repo'] },
            { ru: ['Где открыть', 'приложение и сайт ChatGPT', 'приложение и сайт ChatGPT', 'приложение ChatGPT для компьютера, терминал (Codex CLI), IDE, облако'], en: ['Where to open it', 'the ChatGPT app and website', 'the ChatGPT app and website', 'the ChatGPT desktop app, the terminal (Codex CLI), the IDE, the cloud'] },
            { ru: ['Модель', 'модели GPT', 'модели GPT', 'те же модели GPT'], en: ['Model', 'GPT models', 'GPT models', 'the same GPT models'] },
            { ru: ['Тариф', 'тарифы ChatGPT', 'общие лимиты с Codex', 'входит в тарифы ChatGPT, лимиты общие с Work'], en: ['Plan', 'ChatGPT plans', 'shared limits with Codex', 'included in ChatGPT plans; limits shared with Work'] },
          ],
        },
        matrix: CODING_MATRIX,
      },
      {
        slug: 'cursor',
        name: { ru: 'Cursor', en: 'Cursor' },
        aka: { ru: 'Cursor AI, Cursor IDE, курсор ИИ', en: 'Cursor AI, Cursor IDE' },
        def: {
          ru: 'Программа-редактор кода от Anysphere на основе VS Code со встроенным ИИ-агентом: вы работаете в редакторе, агент рядом, а модель выбираете из разных вендоров или берёте свою модель Composer. Агент умеет то же, что Claude Code и Codex: читает проект, правит файлы, запускает команды; есть и версия для терминала, и облачные агенты. Правила проекта читает из `AGENTS.md` и своих правил в `.cursor/rules`, внешние системы подключает через MCP.',
          en: 'A code editor app from Anysphere, built on VS Code, with a built-in AI agent: you work in the editor, the agent sits next to you, and you pick a model from different vendors or use its own Composer model. The agent does what Claude Code and Codex do: reads the project, edits files, runs commands; there is also a terminal version and cloud agents. It reads project rules from `AGENTS.md` and its own rules in `.cursor/rules`, and connects outside systems through MCP.',
        },
        match: { ru: ['Cursor(?: AI| IDE)?', '[Кк]урсор\\p{L}* ИИ'], en: ['Cursor(?: AI| IDE)?'] },
        related: ['anysphere', 'vs-code', 'agents-md', 'claude-code', 'codex'],
        source: { url: 'https://cursor.com/', label: { ru: 'Официальный сайт Cursor', en: 'Cursor official site' } },
        seo: {
          title: { ru: 'Cursor AI: что это за редактор, какие модели и как работает агент', en: 'What is Cursor AI: models, the agent and rules vs AGENTS.md' },
          description: {
            ru: 'Cursor — программа-редактор кода на основе VS Code со встроенным ИИ-агентом. Какие модели в нём есть, где лежат правила (.cursor/rules и AGENTS.md) и чем он отличается от Claude Code.',
            en: 'Cursor is a VS Code–based code editor with a built-in AI agent. Which models it offers, where rules live (.cursor/rules vs AGENTS.md), and how it differs from Claude Code.',
          },
        },
        more: { post: 'ai-in-code-harness-and-tools', label: { ru: 'Claude Code, Codex, Cursor и Hermes Agent: что выбрать', en: 'Claude Code, Codex, Cursor and Hermes Agent: which to pick' } },
        also: [{ post: 'mcp-1c', label: { ru: 'Cursor для 1С через MCP', en: 'Cursor for 1C through MCP' } }],
        notes: {
          title: { ru: 'Cursor: модели, агент и правила', en: 'Cursor: models, the agent and rules' },
          items: [
            { name: { ru: 'Модели', en: 'Models' }, text: { ru: 'своя Composer, Grok, Claude и Gemini; модели OpenAI — до отключения, объявленного на 12 ноября 2026. Набор зависит от тарифа: на бесплатном меньше. Если провайдер недоступен в вашем регионе, можно подключить свой ключ API.', en: 'its own Composer, Grok, Claude and Gemini; OpenAI models until the cutoff announced for Nov 12, 2026. The lineup depends on the plan: the free one gets fewer. If a provider blocks your region, you can add your own API key.' } },
            { name: { ru: 'Агент', en: 'The agent' }, text: { ru: 'режимы Agent — сам правит файлы и запускает команды, Ask — только отвечает, Plan — сначала составляет план. Работает в редакторе, в терминале и как облачный агент.', en: 'modes: Agent edits files and runs commands itself, Ask only answers, Plan writes a plan first. It works in the editor, in the terminal and as a cloud agent.' } },
            { name: { ru: 'Правила проекта', en: 'Project rules' }, text: { ru: 'папка `.cursor/rules` (старый файл `.cursorrules` тоже читается) и `AGENTS.md` в корне репозитория.', en: 'the `.cursor/rules` folder (the old `.cursorrules` file still works) and `AGENTS.md` at the repo root.' } },
            { name: { ru: 'Тарифы', en: 'Plans' }, text: { ru: 'бесплатный Hobby с лимитами, Pro за $20, Pro+ за $60 и Ultra за $200 в месяц, Teams — $40 за человека.', en: 'free Hobby with limits, Pro at $20, Pro+ at $60 and Ultra at $200 a month, Teams at $40 per user.' } },
            { name: { ru: 'На чём сделан', en: 'What it is built on' }, text: { ru: 'на основе VS Code: расширения VS Code в нём работают.', en: 'built on VS Code: VS Code extensions work in it.' } },
          ],
        },
        matrix: CODING_MATRIX,
      },
      {
        slug: 'hermes-agent',
        name: { ru: 'Hermes Agent', en: 'Hermes Agent' },
        aka: { ru: 'Гермес агент, ИИ-агент Гермес', en: 'Hermes AI agent' },
        def: {
          ru: 'Открытый и бесплатный агент от Nous Research (по-русски его часто называют «Гермес агент»), который вы ставите на свой сервер или компьютер и подключаете к любой модели — через API вендоров или локальную. Умеет то же, что агенты для кода, но не только для кода: сам агент работает на вашем сервере или компьютере, а общаетесь вы с ним через терминал, приложение для компьютера (предварительная версия) или мессенджеры: Telegram, Slack, Discord и другие подключаются как интеграции. Помнит контекст между сессиями и сам оформляет удачные приёмы в скиллы. Правила проекта читает из `AGENTS.md`.',
          en: 'A free, open-source agent from Nous Research that you install on your own server or computer and connect to any model, through a vendor API or a local one. It does what coding agents do, and not only for code: the agent itself runs on your server or computer, and you talk to it through the terminal, a desktop app (preview) or messengers: Telegram, Slack, Discord and others plug in as integrations. It remembers context between sessions and turns what worked into skills. It reads project rules from `AGENTS.md`.',
        },
        match: { ru: ['Hermes Agent', 'Гермес[- ]агент\\p{L}*'], en: ['Hermes Agent', 'Hermes AI agent'] },
        related: ['nous-research', 'ai-agent', 'memory', 'agent-skills', 'claude-code'],
        source: { url: 'https://github.com/NousResearch/hermes-agent', label: { ru: 'Репозиторий Hermes Agent на GitHub', en: 'Hermes Agent GitHub repo' } },
        seo: {
          title: { ru: 'Гермес агент (Hermes Agent): что это — открытый ИИ-агент от Nous Research', en: 'What is Hermes Agent: Nous Research’s open agent, memory and skills' },
          description: {
            ru: 'Hermes Agent (ИИ-агент Гермес) — бесплатный открытый агент от Nous Research: ставится на ваш сервер или компьютер, работает с локальными моделями, помнит контекст и сам копит скиллы.',
            en: 'What Hermes Agent is: a free, open-source agent from Nous Research that runs on your server or computer with local models, remembers context and writes its own skills.',
          },
        },
        more: { post: 'ai-in-code-harness-and-tools', label: { ru: 'Claude Code, Codex, Cursor и Hermes Agent: что выбрать', en: 'Claude Code, Codex, Cursor and Hermes Agent: which to pick' } },
        matrix: CODING_MATRIX,
      },
      {
        slug: 'opencode',
        name: { ru: 'OpenCode', en: 'OpenCode' },
        aka: { ru: 'Open Code, опенкод', en: 'Open Code' },
        def: {
          ru: 'Бесплатный открытый агент для программирования, который работает в терминале; есть также приложение для компьютера и расширения для IDE. Модель выбираете сами: Claude, GPT, Gemini и десятки других через API или локальную; платите только провайдеру модели. Режимы: Build правит код, Plan только планирует и файлы не меняет. Правила проекта читает из `AGENTS.md`, команда `/init` создаёт этот файл по коду репозитория.',
          en: 'A free, open-source coding agent that runs in the terminal; there is also a desktop app and IDE extensions. You pick the model: Claude, GPT, Gemini and dozens of others through an API, or a local one; you pay only the model provider. Modes: Build edits code, Plan only plans and does not change files. It reads project rules from `AGENTS.md`, and the `/init` command creates that file from the repo.',
        },
        match: { ru: ['OpenCode', 'Open Code'], en: ['OpenCode', 'Open Code'] },
        related: ['terminal', 'claude-code', 'codex', 'hermes-agent', 'agents-md'],
        source: { url: 'https://opencode.ai/docs/rules/', label: { ru: 'Документация OpenCode', en: 'OpenCode docs' } },
        seo: {
          title: { ru: 'OpenCode: что это — бесплатный открытый ИИ-агент в терминале с любой моделью', en: 'What is OpenCode: a free open-source AI coding agent in the terminal' },
          description: {
            ru: 'OpenCode — бесплатный открытый ИИ-агент для программирования в терминале: подключаете любую модель или локальную, режимы Build и Plan, правила в AGENTS.md.',
            en: 'OpenCode is a free open-source AI coding agent for the terminal: any model or a local one, Build and Plan modes, rules in AGENTS.md.',
          },
        },
      },
      {
        slug: 'gemini-cli',
        name: { ru: 'Gemini CLI', en: 'Gemini CLI' },
        aka: { ru: 'Джемини CLI', en: 'Google Gemini CLI' },
        def: {
          ru: 'Открытый агент Google для программирования в терминале на моделях Gemini; вышел в июне 2025 года. Устроен как Claude Code и Codex: читает проект, правит файлы, запускает команды; правила проекта берёт из `GEMINI.md`, внешние системы подключает через MCP. С IDE связывается через дополнение для VS Code и через протокол ACP для JetBrains и Zed. До 18 июня 2026 им можно было пользоваться бесплатно со своим аккаунтом Google; теперь для обычных пользователей его заменил закрытый Antigravity CLI. Сам Gemini CLI остался открытым и работает для компаний с корпоративными тарифами и для платных ключей API.',
          en: 'Google’s open-source coding agent for the terminal on Gemini models, released in June 2025. It is built like Claude Code and Codex: it reads the project, edits files and runs commands; it takes project rules from `GEMINI.md` and connects outside systems through MCP. It links to IDEs through a VS Code companion extension and through ACP for JetBrains and Zed. Until June 18, 2026 anyone could use it free with a Google account; now the closed-source Antigravity CLI replaces it for individual users. Gemini CLI itself stays open source and works for companies on enterprise plans and for paid API keys.',
        },
        match: { ru: ['Gemini CLI'], en: ['Gemini CLI'] },
        related: ['antigravity-cli', 'terminal', 'claude-code', 'codex', 'opencode', 'ide'],
        source: { url: 'https://www.theregister.com/ai-ml/2026/05/20/bye-bye-gemini-cli-google-nudges-devs-toward-antigravity/5243605', label: { ru: 'The Register: Google переводит Gemini CLI в Antigravity', en: 'The Register: Google nudges Gemini CLI users to Antigravity' } },
        seo: {
          title: { ru: 'Gemini CLI: что это и что с ним стало — агент Google в терминале', en: 'What is Gemini CLI and what happened to it: Google’s terminal agent' },
          description: {
            ru: 'Gemini CLI — открытый агент Google в терминале на моделях Gemini. Что он умеет, почему с 18 июня 2026 обычным пользователям он недоступен и кому Gemini CLI работает до сих пор.',
            en: 'Gemini CLI is Google’s open-source terminal agent on Gemini models. What it does, why individual users lost access on June 18, 2026, and who can still use it.',
          },
        },
      },
      {
        slug: 'antigravity-cli',
        name: { ru: 'Antigravity CLI', en: 'Antigravity CLI' },
        aka: { ru: 'Google Antigravity', en: 'Google Antigravity' },
        def: {
          ru: 'Агент Google для программирования в терминале, связанный с приложением Antigravity. В мае 2026 Google объявил, что переносит в него Gemini CLI — открытый агент на моделях Gemini; с 18 июня 2026 Gemini CLI перестал работать для обычных пользователей, включая бесплатный доступ. Antigravity CLI закрытый; старый Gemini CLI остался открытым, но работает только для компаний с корпоративными тарифами и для платных ключей API.',
          en: 'Google’s coding agent for the terminal, tied to the Antigravity app. In May 2026 Google announced it was moving Gemini CLI, its open-source agent on Gemini models, into it; since June 18, 2026 Gemini CLI no longer serves individual users, free access included. Antigravity CLI is closed-source; the old Gemini CLI stays open source but works only for companies on enterprise plans and for paid API keys.',
        },
        match: { ru: ['Antigravity CLI', 'Google Antigravity'], en: ['Antigravity CLI', 'Google Antigravity'] },
        related: ['gemini-cli', 'terminal', 'claude-code', 'codex', 'opencode'],
        source: { url: 'https://virtualizationreview.com/articles/2026/05/19/google-moves-gemini-cli-into-antigravity-cli-as-agent-platform-expands.aspx', label: { ru: 'Virtualization Review: Gemini CLI переходит в Antigravity CLI', en: 'Virtualization Review: Gemini CLI moves into Antigravity CLI' } },
        seo: {
          title: { ru: 'Antigravity CLI: что это — агент Google в терминале вместо Gemini CLI', en: 'What is Antigravity CLI: Google’s terminal agent that replaced Gemini CLI' },
          description: {
            ru: 'Gemini CLI — открытый агент Google в терминале; с июня 2026 для обычных пользователей его заменил закрытый Antigravity CLI. Что изменилось и кому старый Gemini CLI ещё доступен.',
            en: 'Gemini CLI was Google’s open-source terminal agent; since June 2026 the closed-source Antigravity CLI replaced it for individual users. What changed and who can still use Gemini CLI.',
          },
        },
      },
      {
        slug: 'claude-in-chrome',
        name: { ru: 'Claude in Chrome', en: 'Claude in Chrome' },
        aka: { ru: 'расширение Claude для Chrome, Claude для браузера', en: 'Claude for Chrome, Claude Chrome extension' },
        def: {
          ru: 'Расширение Claude для браузера Chrome, через которое агент работает в вашем браузере: открывает страницы, кликает, заполняет формы и читает консоль. Работает под вашим входом, поэтому видит то же, что и вы. Режимов два: боковая панель, где Claude сам выполняет задачу на открытой странице, и управление браузером из Claude Code. Боковая панель официально работает только в Chrome на компьютере; режим для Claude Code — ещё в Edge и других браузерах на Chromium.',
          en: 'A Claude extension for the Chrome browser that lets an agent work in your browser: open pages, click, fill forms and read the console. It works under your login, so it sees what you see. There are two modes: a side panel where Claude does the task on the open page itself, and browser control from Claude Code. The side panel officially runs only in desktop Chrome; the Claude Code mode also works in Edge and other Chromium browsers.',
        },
        match: { ru: ['Claude in Chrome', 'Claude for Chrome'], en: ['Claude in Chrome', 'Claude for Chrome'] },
        related: ['claude-code', 'mcp', 'human-in-the-loop'],
        source: { url: 'https://support.claude.com/en/articles/12012173-get-started-with-claude-in-chrome', label: { ru: 'Справка: как начать с Claude in Chrome', en: 'Help: Get started with Claude in Chrome' } },
        seo: {
          title: { ru: 'Claude in Chrome: что это за расширение Claude для браузера', en: 'Claude in Chrome: what the Claude Chrome extension does' },
          description: {
            ru: 'Claude in Chrome — расширение Claude для браузера: агент открывает страницы, кликает и заполняет формы под вашим входом. Два режима — боковая панель и Claude Code, в каких браузерах работает.',
            en: 'Claude in Chrome is the Claude Chrome extension: an agent opens pages, clicks and fills forms under your login. Two modes, the side panel and Claude Code, and which browsers it works in.',
          },
        },
        more: { post: 'claude-in-chrome', label: { ru: 'Claude in Chrome: как агент работает в вашем браузере', en: 'Claude in Chrome: how an agent works in your browser' } },
        compare: {
          title: { ru: 'Два режима: боковая панель и Claude Code', en: 'Two modes: the side panel and Claude Code' },
          head: { ru: ['Боковая панель', 'Из Claude Code'], en: ['Side panel', 'From Claude Code'] },
          rows: [
            { ru: ['Где запускаете', 'панель справа в Chrome', 'в терминале или IDE, в Claude Code'], en: ['Where you start it', 'a panel on the right in Chrome', 'in the terminal or IDE, in Claude Code'] },
            { ru: ['Кто ведёт задачу', 'Claude в панели', 'агент Claude Code, браузер — его инструмент'], en: ['Who runs the task', 'Claude in the panel', 'the Claude Code agent; the browser is its tool'] },
            { ru: ['Зачем', 'поиск, сбор данных, формы на сайтах', 'проверить сайт, который правите: открыть, прокликать, прочитать консоль'], en: ['What for', 'research, collecting data, forms on websites', 'check the site you are editing: open it, click through, read the console'] },
            { ru: ['Браузеры', 'только Chrome на компьютере', 'Chrome, Edge и другие на Chromium'], en: ['Browsers', 'desktop Chrome only', 'Chrome, Edge and other Chromium browsers'] },
          ],
        },
      },
    ],
  },
  {
    slug: 'companies',
    icon: 'research',
    name: { ru: 'Компании', en: 'Companies' },
    hint: { ru: 'Кто делает модели и агентов', en: 'Who builds the models and agents' },
    terms: [
      {
        slug: 'anthropic',
        name: { ru: 'Anthropic', en: 'Anthropic' },
        def: {
          ru: 'Американская компания, которая делает семейство языковых моделей Claude: Opus, Sonnet, Haiku и Fable. Людям — приложения Claude, агент Cowork для работы с папкой на компьютере и расширение Claude in Chrome. Для кода — агент Claude Code. Разработчикам — API, Managed Agents (агенты в облаке Anthropic), Agent SDK и открытый протокол MCP, на котором агенты подключаются к внешним системам.',
          en: 'A US company that builds the Claude family of language models: Opus, Sonnet, Haiku and Fable. For people: the Claude apps, the Cowork agent that works in a folder on your computer, and the Claude in Chrome extension. For code: the Claude Code agent. For developers: the API, Managed Agents (agents in Anthropic’s cloud), the Agent SDK and the open MCP protocol agents use to connect to outside systems.',
        },
        match: { ru: ['Anthropic'], en: ['Anthropic'] },
        related: ['claude-code', 'mcp', 'llm'],
        source: { url: 'https://www.anthropic.com/', label: { ru: 'Официальный сайт Anthropic', en: 'Anthropic official site' } },
      },
      {
        slug: 'openai',
        name: { ru: 'OpenAI', en: 'OpenAI' },
        def: {
          ru: 'Американская компания, которая делает семейство языковых моделей GPT. Людям — чат ChatGPT, на компьютере в одном приложении с Codex. Для кода — агент Codex. Разработчикам — API, Agents SDK, Apps SDK для приложений внутри ChatGPT и формат инструкций `AGENTS.md`, который читают и другие агенты.',
          en: 'A US company that builds the GPT family of language models. For people: the ChatGPT chat, on desktop in one app with Codex. For code: the Codex agent. For developers: the API, the Agents SDK, the Apps SDK for apps inside ChatGPT and the `AGENTS.md` instruction format that other agents read too.',
        },
        match: { ru: ['OpenAI'], en: ['OpenAI'] },
        related: ['codex', 'agents-md', 'llm'],
        source: { url: 'https://en.wikipedia.org/wiki/OpenAI', label: { ru: 'Википедия: OpenAI', en: 'Wikipedia: OpenAI' } },
      },
      {
        slug: 'nous-research',
        name: { ru: 'Nous Research', en: 'Nous Research' },
        def: {
          ru: 'Американская исследовательская лаборатория, которая делает открытые языковые модели Hermes. Продукты: открытый агент Hermes Agent, который ставится на ваш сервер и работает с любой моделью, чат Nous Chat и Forge, который усиливает рассуждения модели. Инфраструктура: Psyche для распределённого обучения и Atropos, открытая среда для обучения с подкреплением.',
          en: 'A US research lab that builds the open Hermes language models. Products: the open Hermes Agent, which you install on your own server and run with any model, the Nous Chat chat and Forge, which boosts a model’s reasoning. Infrastructure: Psyche for distributed training and Atropos, an open environment for reinforcement learning.',
        },
        match: { ru: ['Nous Research'], en: ['Nous Research'] },
        related: ['hermes-agent', 'llm'],
        source: { url: 'https://nousresearch.com/', label: { ru: 'Официальный сайт Nous Research', en: 'Nous Research official site' } },
      },
      {
        // Продукты на октябрь 2026: редактор Cursor с агентом, свои модели Composer (Composer 2 — март 2026),
        // ревьюер пулл-реквестов Bugbot, агент в терминале (CLI), облачные агенты, веб и мобильные агенты.
        // Сделка со SpaceX объявлена 21.04.2026, закрыта 14.08.2026 (en.wikipedia.org/wiki/Cursor_(company))
        slug: 'anysphere',
        name: { ru: 'Anysphere', en: 'Anysphere' },
        def: {
          ru: 'Американская компания, которая делает Cursor: редактор кода со встроенным агентом. Кроме редактора у неё свои модели для кода Composer, ревьюер пулл-реквестов Bugbot, агент для терминала и облачные агенты. С августа 2026 принадлежит SpaceX.',
          en: 'The US company behind Cursor, a code editor with a built-in agent. Besides the editor it makes its own Composer coding models, the Bugbot pull-request reviewer, a terminal agent and cloud agents. Owned by SpaceX since August 2026.',
        },
        match: { ru: ['Anysphere'], en: ['Anysphere'] },
        related: ['cursor', 'llm'],
        source: { url: 'https://anysphere.inc/', label: { ru: 'Официальный сайт Anysphere', en: 'Anysphere official site' } },
      },
      {
        // На октябрь 2026: семейство V4 (V4 и V4-Pro — апрель, V4.1-Flash — сентябрь 2026), веса под MIT, чат-приложение и API
        slug: 'deepseek',
        name: { ru: 'DeepSeek', en: 'DeepSeek' },
        def: {
          ru: 'Китайская компания, которая делает языковые модели DeepSeek с открытыми весами: их можно скачать и запустить на своём сервере. Текущее поколение V4 держит в контексте до миллиона токенов. Людям — чат DeepSeek в браузере и на телефоне. Разработчикам — API. Модели DeepSeek подключают к открытым агентам вроде Hermes Agent.',
          en: 'A Chinese company that builds the DeepSeek language models with open weights: you can download them and run them on your own server. The current V4 generation holds up to a million tokens of context. For people: the DeepSeek chat on the web and mobile. For developers: the API. DeepSeek models plug into open agents such as Hermes Agent.',
        },
        match: { ru: ['DeepSeek', 'Дипсик\\p{L}*'], en: ['DeepSeek'] },
        related: ['llm', 'hermes-agent', 'openai'],
        source: { url: 'https://www.deepseek.com/', label: { ru: 'Официальный сайт DeepSeek', en: 'DeepSeek official site' } },
      },
      {
        // На октябрь 2026: модели Alice AI (LLM, LLM Flash, ART), YandexGPT — прежняя линейка; AI Studio — конструктор агентов (>18 тыс. агентов);
        // Алиса AI Про для бизнеса — сентябрь 2026 (cnews.ru); SourceCraft — платформа для кода с Code Assistant и CLI (yandex.cloud/ru/blog)
        slug: 'yandex',
        name: { ru: 'Яндекс', en: 'Yandex' },
        def: {
          ru: 'Российская компания, которая делает языковые модели Alice AI, а раньше — линейку YandexGPT. Людям — ассистент Алиса в приложении, браузере и колонках: отвечает на вопросы и выполняет действия по просьбе. Компаниям — корпоративный агент Алиса AI Про и Yandex AI Studio, где из моделей Alice AI и открытых моделей собирают своих агентов. Для кода — платформа SourceCraft с агентом Code Assistant.',
          en: 'A Russian company that builds the Alice AI language models, and earlier the YandexGPT line. For people: the Alice assistant in an app, a browser and smart speakers that answers questions and acts on requests. For companies: the Alice AI Pro corporate agent and Yandex AI Studio, where teams build their own agents on Alice AI and open models. For code: the SourceCraft platform with the Code Assistant agent.',
        },
        match: { ru: ['YandexGPT', 'Алис[аеуы]', 'Яндекс\\p{L}*(?! \\p{Lu})'], en: ['YandexGPT', 'Yandex'] },
        related: ['llm', 'ai-agent'],
        source: { url: 'https://yandex.com/company', label: { ru: 'Яндекс: о компании', en: 'Yandex company page' } },
      },
      {
        // Junie вышел из беты 17.06.2026 (blog.jetbrains.com/junie/2026/06/junie-coding-agent-out-of-beta); Mellum — открытая модель автодополнения
        slug: 'jetbrains',
        name: { ru: 'JetBrains', en: 'JetBrains' },
        def: {
          ru: 'Компания, основанная в Праге в 2000 году: делает IDE IntelliJ IDEA, PyCharm, WebStorm и другие, а также язык Kotlin. Свой агент для кода Junie работает в IDE и в терминале; рядом в IDE встроены Claude Agent и Codex, а другие агенты подключаются через открытый протокол ACP. Автодополнение — на своей модели Mellum. Air — среда, где несколько агентов работают параллельно (предварительная версия).',
          en: 'A company founded in Prague in 2000 that makes the IntelliJ IDEA, PyCharm, WebStorm and other IDEs, plus the Kotlin language. Its own coding agent Junie works in the IDE and the terminal; Claude Agent and Codex are built into the IDE next to it, and other agents connect through the open ACP protocol. Code completion runs on its own Mellum model. Air is a workspace where several agents run in parallel (preview).',
        },
        match: { ru: ['JetBrains'], en: ['JetBrains'] },
        related: ['ide', 'vs-code', 'claude-code'],
        source: { url: 'https://www.jetbrains.com/', label: { ru: 'Официальный сайт JetBrains', en: 'JetBrains official site' } },
      },
      {
        // На октябрь 2026: Copilot в Windows и Microsoft 365, GitHub Copilot (агент для кода), свои модели MAI рядом с моделями партнёров
        slug: 'microsoft',
        name: { ru: 'Microsoft', en: 'Microsoft' },
        def: {
          ru: 'Американская компания, которая делает ассистента Copilot: он встроен в Windows, Word, Excel, Outlook и Teams. Для разработчиков — редактор VS Code, GitHub Copilot с агентом для кода и приложение GitHub Copilot для нескольких агентов сразу. Компаниям — Copilot Studio и Foundry, чтобы строить своих агентов. Работает на своих моделях MAI и на моделях партнёров, в том числе OpenAI и Anthropic.',
          en: 'A US company that makes the Copilot assistant, built into Windows, Word, Excel, Outlook and Teams. For developers: the VS Code editor, GitHub Copilot with a coding agent and the GitHub Copilot app for running several agents. For companies: Copilot Studio and Foundry to build their own agents. It runs on its own MAI models and on partner models, including OpenAI and Anthropic.',
        },
        match: { ru: ['Microsoft', 'Copilot'], en: ['Microsoft', 'Copilot'] },
        related: ['vs-code', 'openai', 'anthropic', 'llm'],
        source: { url: 'https://en.wikipedia.org/wiki/Microsoft', label: { ru: 'Википедия: Microsoft', en: 'Wikipedia: Microsoft' } },
      },
      {
        // Rovo MCP Server — GA 04.02.2026 (developer.atlassian.com/cloud/rovo-mcp); агенты Rovo в Jira — февраль 2026
        slug: 'atlassian',
        name: { ru: 'Atlassian', en: 'Atlassian' },
        def: {
          ru: 'Австралийская компания, которая делает Jira, Confluence и Bitbucket — рабочие системы многих команд разработки. Свой ИИ называется Rovo: агенты Rovo берут задачи в Jira, а Rovo MCP Server даёт внешним агентам вроде Claude Code и Cursor читать и менять данные Jira и Confluence.',
          en: 'An Australian company that makes Jira, Confluence and Bitbucket, the work systems of many development teams. Its AI is called Rovo: Rovo agents take tasks in Jira, and the Rovo MCP Server lets outside agents such as Claude Code and Cursor read and change Jira and Confluence data.',
        },
        match: { ru: ['Atlassian'], en: ['Atlassian'] },
        related: ['jira', 'confluence', 'mcp-server'],
        source: { url: 'https://www.atlassian.com/', label: { ru: 'Официальный сайт Atlassian', en: 'Atlassian official site' } },
      },
    ],
  },
  {
    slug: 'harness',
    icon: 'harness',
    name: { ru: 'Харнесс', en: 'Harness' },
    hint: { ru: 'Среда вокруг агента и её правила', en: 'The environment around an agent and its rules' },
    terms: [
      {
        slug: 'harness',
        name: { ru: 'Харнесс', en: 'Harness' },
        aka: { ru: 'harness', en: 'agent harness' },
        def: {
          ru: 'Всё вокруг модели, что делает её рабочим агентом: инструкции, инструменты, права доступа, память и проверки. Модель одна и та же, а результат зависит от харнесса.',
          en: 'Everything around the model that turns it into a working agent: instructions, tools, permissions, memory and checks. The model is the same, the result depends on the harness.',
        },
        match: { ru: ['харнесс\\p{L}*', 'harness'], en: ['harness(?:es)?'] },
        related: ['ai-agent', 'harness-engineering', 'hdd', 'llm'],
        source: { url: 'https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents', label: { ru: 'Anthropic: харнессы для долгих агентов', en: 'Anthropic: Effective harnesses for agents' } },
        seo: {
          title: { ru: 'Харнесс в ИИ: что это и из чего состоит', en: 'Agent harness: what it is and what it includes' },
          description: {
            ru: 'Харнесс — всё вокруг нейросети, что делает её агентом: цикл, инструменты, контекст, память, правила, права и проверки. Список частей со ссылками.',
            en: 'An agent harness is everything around the model that makes it an agent: loop, tools, context, memory, rules, permissions and checks. Every part, linked.',
          },
        },
        more: { post: 'ai-agent-llm-harness', label: { ru: 'Агент = нейросеть + харнесс: чем агент отличается от чата и ассистента', en: 'AI agent = LLM + harness: LLM vs harness vs agent' } },
        parts: {
          title: { ru: 'Из чего состоит харнесс', en: 'What a harness is made of' },
          slugs: ['agent-loop', 'tool', 'mcp', 'context', 'memory', 'claude-md', 'bible', 'agent-skills', 'permissions', 'sandbox', 'hooks', 'checks', 'human-in-the-loop', 'orchestration', 'tracing'],
        },
      },
      {
        slug: 'hooks',
        name: { ru: 'Хуки', en: 'Hooks' },
        aka: { ru: 'hooks', en: 'hooks' },
        def: {
          ru: 'Скрипты, которые харнесс запускает автоматически в заданные моменты работы агента: перед действием, после правки файла, при завершении. Правило в инструкции агент считает советом, а хук выполняется всегда, поэтому им закрывают запреты без исключений.',
          en: 'Scripts the harness runs automatically at set moments of the agent’s work: before an action, after a file edit, on finish. An agent treats a rule in the instructions as advice, while a hook always runs, so hooks close the blocks that allow no exceptions.',
        },
        match: { ru: ['хук\\p{L}*'], en: ['hooks?'] },
        related: ['harness', 'claude-md', 'human-in-the-loop'],
        source: { url: 'https://code.claude.com/docs/en/hooks', label: { ru: 'Claude Code: справочник хуков', en: 'Claude Code hooks reference' } },
      },
      {
        slug: 'agent-loop',
        name: { ru: 'Agent loop (цикл агента)', en: 'Agent loop' },
        aka: { ru: 'луп · агентный цикл', en: 'agentic loop' },
        def: {
          ru: 'Повторяющийся ход работы агента: подумать, вызвать тул, посмотреть результат и снова подумать. Цикл идёт, пока задача не решена или агенту не нужна помощь человека.',
          en: 'The repeating rhythm of an agent’s work: think, call a tool, look at the result, think again. The loop runs until the task is solved or the agent needs a human.',
        },
        match: { ru: ['цикл\\p{L}* агента', 'агентн\\p{L}* цикл\\p{L}*', 'agent loop', 'луп(?:ом|е|ы|ов)?'], en: ['agent loop', 'agentic loop'] },
        related: ['harness', 'tool', 'human-in-the-loop'],
        source: { url: 'https://arxiv.org/abs/2210.03629', label: { ru: 'Статья ReAct (arXiv)', en: 'ReAct paper (arXiv)' } },
      },
      {
        slug: 'react',
        name: { ru: 'ReAct', en: 'ReAct' },
        aka: { ru: 'Reason + Act, рассуждение и действие', en: 'Reason + Act' },
        def: {
          ru: 'Схема работы агента, где модель по очереди рассуждает и действует: решает, что сделать, вызывает инструмент, читает результат и снова рассуждает. Только рассуждая, модель выдумывает ответ; только действуя, блуждает без плана; чередуя, приходит к верному ответу. Описана в исследовании 2022 года, на ней держится агентный цикл современных агентов для кода.',
          en: 'A way for an agent to work in which the model alternates reasoning and acting: it decides what to do, calls a tool, reads the result and reasons again. Reasoning alone, the model makes the answer up; acting alone, it wanders without a plan; alternating, it gets to the right answer. Described in a 2022 paper; the agent loop of today’s coding agents rests on it.',
        },
        // Регистр важен: поле exact отделяет ReAct (схема агента) от React (библиотека для сайтов)
        match: { ru: ['ReAct'], en: ['ReAct'] },
        exact: 'ReAct',
        related: ['agent-loop', 'tool', 'ai-agent'],
        source: { url: 'https://arxiv.org/abs/2210.03629', label: { ru: 'Yao и др., «ReAct» (arXiv, 2022)', en: 'Yao et al., “ReAct” (arXiv, 2022)' } },
      },
      {
        slug: 'session',
        name: { ru: 'Сессия', en: 'Session' },
        def: {
          ru: 'Один непрерывный разговор с агентом: от запуска до выхода или очистки. Всё, что агент узнал за сессию, лежит в его контексте и пропадает с её концом; в следующую сессию переходит только записанное в память и в файлы вроде `CLAUDE.md`. Сам разговор харнесс сохраняет в журнал сессий: из него прошлую сессию можно поднять целиком, в Claude Code — командой `/resume` или `claude --continue`.',
          en: 'One continuous conversation with an agent, from launch to exit or a reset. Everything the agent learned in it sits in its context and is gone when the session ends; only what was written to memory and files like `CLAUDE.md` carries over to the next session. The harness keeps the conversation itself in a session log, from which a past session can be brought back whole; in Claude Code with `/resume` or `claude --continue`.',
        },
        match: { ru: ['сесси\\p{L}*'], en: ['sessions?'] },
        related: ['context', 'memory', 'claude-md'],
        source: { url: 'https://code.claude.com/docs/en/sessions', label: { ru: 'Claude Code: управление сессиями', en: 'Claude Code sessions docs' } },
      },
      {
        slug: 'memory',
        name: { ru: 'Память агента', en: 'Agent memory' },
        def: {
          ru: 'Заметки, которые агент сохраняет между сессиями: правила проекта, найденные ограничения, договорённости. Без памяти каждый новый разговор начинается с чистого листа.',
          en: 'Notes an agent keeps between sessions: project rules, constraints it found, agreements. Without memory every new conversation starts from a blank page.',
        },
        match: { ru: ['памят\\p{L}* агента', 'автопамят\\p{L}*'], en: ['agent memory', 'auto memory'] },
        related: ['session', 'context', 'claude-md', 'bible'],
        source: { url: 'https://code.claude.com/docs/en/memory', label: { ru: 'Claude Code: память проекта', en: 'Claude Code memory docs' } },
      },
      {
        slug: 'bible',
        name: { ru: 'Библия проекта', en: 'Project bible' },
        def: {
          ru: 'Описание того, как устроен проект и почему: границы систем, договорённости, принципы и ценности — что важнее при выборе и чего нельзя ни при каких условиях. Агент читает её перед работой, а вы не повторяете одно и то же в каждой задаче. Конкретные указания «делай так, не делай этого» из неё выводят в правила. Библия лежит в `CLAUDE.md` для Claude Code или в `AGENTS.md` для Codex и Cursor, либо в отдельных файлах, на которые они ссылаются.',
          en: 'A description of how the project is built and why: system boundaries, agreements, principles and values: what matters more when choosing and what is never allowed. The agent reads it before working, so you do not repeat yourself in every task. Concrete do and do-not instructions are derived from it into rules. The bible lives in `CLAUDE.md` for Claude Code or `AGENTS.md` for Codex and Cursor, or in separate files they point to.',
        },
        match: { ru: ['библи\\p{L}* проекта'], en: ['project bible'] },
        related: ['rules', 'claude-md', 'agents-md', 'memory'],
        source: { url: 'https://code.claude.com/docs/en/best-practices', label: { ru: 'Claude Code: лучшие практики', en: 'Claude Code best practices' } },
        compare: {
          title: { ru: 'Правила и библия проекта', en: 'Rules and the project bible' },
          head: { ru: ['Правила', 'Библия проекта'], en: ['Rules', 'Project bible'] },
          headSlugs: ['rules', 'bible'],
          rows: [
            { ru: ['Отвечает на вопрос', 'как действовать здесь', 'как устроен проект и почему'], en: ['Answers', 'how to act here', 'how the project is built and why'] },
            { ru: ['Форма', 'короткие указания: делай, не делай', 'связное описание и принципы'], en: ['Form', 'short do and do-not instructions', 'a connected description and principles'] },
            { ru: ['Когда агент читает', 'всегда или когда тронул нужные файлы', 'перед работой, целиком'], en: ['When the agent reads it', 'always or when it touches matching files', 'before work, as a whole'] },
            { ru: ['Пример', '«тесты запускай через `npm test`»', '«оплата — отдельная система, мы её не правим»'], en: ['Example', '"run tests with `npm test`"', '"payments are a separate system we do not edit"'] },
            { ru: ['Откуда берётся', 'выводится из библии и ошибок агента', 'пишут люди, кто знает проект'], en: ['Where it comes from', 'derived from the bible and agent mistakes', 'written by people who know the project'] },
          ],
        },
      },
      {
        slug: 'rules',
        name: { ru: 'Правила агента', en: 'Agent rules' },
        aka: { ru: 'рулы', en: 'rules' },
        def: {
          ru: 'Короткие указания агенту «делай так, не делай этого», которые харнесс подгружает в его контекст: всегда или только когда агент трогает нужные файлы. Это общая концепция: в Claude Code правила лежат в `CLAUDE.md` и папке `.claude/rules`, в Cursor — в `.cursor/rules`, в Codex — в `AGENTS.md`. Правило агент воспринимает как совет; запрет без исключений закрывают хуком.',
          en: 'Short do and do-not instructions the harness loads into the agent context: always, or only when the agent touches matching files. It is a common concept: in Claude Code rules live in `CLAUDE.md` and the `.claude/rules` folder, in Cursor in `.cursor/rules`, in Codex in `AGENTS.md`. The agent treats a rule as advice; a no-exceptions prohibition is enforced with a hook.',
        },
        match: { ru: ['правил\\p{L}* агента', 'рул\\p{L}*'], en: ['agent rules?'] },
        related: ['bible', 'hooks', 'claude-md', 'agents-md'],
        source: { url: 'https://cursor.com/docs/rules', label: { ru: 'Cursor: правила', en: 'Cursor Rules docs' } },
        compare: {
          title: { ru: 'Правила и библия проекта', en: 'Rules and the project bible' },
          head: { ru: ['Правила', 'Библия проекта'], en: ['Rules', 'Project bible'] },
          headSlugs: ['rules', 'bible'],
          rows: [
            { ru: ['Отвечает на вопрос', 'как действовать здесь', 'как устроен проект и почему'], en: ['Answers', 'how to act here', 'how the project is built and why'] },
            { ru: ['Форма', 'короткие указания: делай, не делай', 'связное описание и принципы'], en: ['Form', 'short do and do-not instructions', 'a connected description and principles'] },
            { ru: ['Когда агент читает', 'всегда или когда тронул нужные файлы', 'перед работой, целиком'], en: ['When the agent reads it', 'always or when it touches matching files', 'before work, as a whole'] },
            { ru: ['Пример', '«тесты запускай через `npm test`»', '«оплата — отдельная система, мы её не правим»'], en: ['Example', '"run tests with `npm test`"', '"payments are a separate system we do not edit"'] },
            { ru: ['Откуда берётся', 'выводится из библии и ошибок агента', 'пишут люди, кто знает проект'], en: ['Where it comes from', 'derived from the bible and agent mistakes', 'written by people who know the project'] },
          ],
        },
      },
      {
        slug: 'checks',
        name: { ru: 'Статические проверки', en: 'Static checks' },
        aka: { ru: 'статтесты · автопроверки', en: 'static tests · automated checks' },
        def: {
          ru: 'Тесты, линтеры, сборка и другие автоматические сверки, которыми подтверждается результат агента до того, как на него посмотрит человек. Проверка, которую агент может запустить сам, возвращает ему ошибки и заставляет исправлять их без вас.',
          en: 'Tests, linters, builds and other automatic verifications that confirm the agent’s result before a person looks at it. A check the agent can run itself feeds errors back and makes it fix them without you.',
        },
        match: { ru: ['автопроверк\\p{L}*', 'самопроверк\\p{L}*', 'статическ\\p{L}* проверк\\p{L}*', 'статтест\\p{L}*'], en: ['self-checks?', 'automated checks?', 'static checks?'] },
        related: ['harness', 'hooks', 'human-in-the-loop'],
        source: { url: 'https://en.wikipedia.org/wiki/Static_program_analysis', label: { ru: 'Википедия: статический анализ кода', en: 'Wikipedia: Static program analysis' } },
      },
      {
        slug: 'orchestration',
        name: { ru: 'Оркестрация', en: 'Orchestration' },
        def: {
          ru: 'Управление несколькими шагами или несколькими агентами: кто за что отвечает, в каком порядке работает и как результаты передаются дальше — через файлы, через итог субагента или сообщениями между сессиями.',
          en: 'Managing several steps or several agents: who is responsible for what, in which order they work and how results are passed on, through files, a subagent result or cross-session messaging.',
        },
        match: { ru: ['оркестраци\\p{L}*'], en: ['orchestrat\\p{L}*'] },
        related: ['session-messaging', 'subagent', 'ai-agent', 'harness'],
        source: { url: 'https://www.anthropic.com/engineering/multi-agent-research-system', label: { ru: 'Anthropic: мультиагентная система исследований', en: 'Anthropic: Multi-agent research system' } },
      },
      {
        slug: 'session-messaging',
        name: { ru: 'Сообщения между сессиями', en: 'Cross-session messaging' },
        def: {
          ru: 'Способ, которым параллельные сессии агентов передают друг другу текст: одна находит другую по имени и отправляет сообщение, та читает его на своём следующем шаге. В Claude Code так работают сообщения между сессиями и экспериментальные команды агентов; в Cursor похожую роль играет передача работы между локальным и облачным агентом. Так оркестрация обходится без человека-посредника, который копирует ответы из окна в окно.',
          en: 'A way for parallel agent sessions to pass text to each other: one finds another by name and sends a message, and the other reads it on its next step. In Claude Code this is cross-session messaging and the experimental agent teams; in Cursor the handoff between local and cloud agents plays a similar role. Orchestration then works without a human copying answers between windows.',
        },
        match: { ru: ['сообщени\\p{L}* между сесси\\p{L}*'], en: ['cross-session messag\\p{L}*'] },
        related: ['orchestration', 'session', 'subagent'],
        source: { url: 'https://code.claude.com/docs/en/agent-teams', label: { ru: 'Claude Code: команды агентов', en: 'Claude Code agent teams docs' } },
      },
      {
        slug: 'tracing',
        name: { ru: 'Логи и трассировка', en: 'Logs and tracing' },
        def: {
          ru: 'Запись каждого шага агента: что он прочитал, какие инструменты вызвал и что получил в ответ. По ней видно, где агент свернул не туда, и можно повторить разбор.',
          en: 'A record of each agent step: what it read, which tools it called and what came back. It shows where the agent took a wrong turn and lets you replay the analysis.',
        },
        match: { ru: ['трассировк\\p{L}*'], en: ['tracing', 'agent traces?'] },
        related: ['harness', 'tool', 'human-in-the-loop'],
        source: { url: 'https://opentelemetry.io/docs/concepts/signals/traces/', label: { ru: 'OpenTelemetry: трассировки', en: 'OpenTelemetry: Traces' } },
      },
      {
        slug: 'claude-md',
        name: { ru: 'CLAUDE.md', en: 'CLAUDE.md' },
        def: {
          ru: 'Файл в корне проекта с постоянными инструкциями для Claude Code: структура проекта, команды сборки и тестов, соглашения. Попадает в контекст агента в начале каждой сессии.',
          en: 'A file in the project root with standing instructions for Claude Code: project layout, build and test commands, conventions. It enters the agent’s context at the start of every session.',
        },
        match: { ru: ['CLAUDE\\.md'], en: ['CLAUDE\\.md'] },
        related: ['agents-md', 'agent-skills', 'claude-code'],
        source: { url: 'https://code.claude.com/docs/en/memory', label: { ru: 'Claude Code: CLAUDE.md и память', en: 'Claude Code CLAUDE.md docs' } },
      },
      {
        slug: 'agents-md',
        name: { ru: 'AGENTS.md', en: 'AGENTS.md' },
        def: {
          ru: 'Общий для разных агентов файл с инструкциями по проекту. Его читают Codex, Cursor и другие инструменты, поэтому он служит нейтральной альтернативой `CLAUDE.md`.',
          en: 'A shared instructions file for a project that many agents read. Codex, Cursor and others use it, so it is a vendor-neutral counterpart of `CLAUDE.md`.',
        },
        match: { ru: ['AGENTS\\.md'], en: ['AGENTS\\.md'] },
        related: ['claude-md', 'codex', 'cursor'],
        source: { url: 'https://agents.md/', label: { ru: 'Официальный сайт AGENTS.md', en: 'AGENTS.md official site' } },
      },
      {
        slug: 'agent-skills',
        name: { ru: 'Скилл', en: 'Skill' },
        aka: { ru: 'Agent Skills', en: 'skills' },
        def: {
          ru: 'Папка с файлом `SKILL.md`: инструкция и вспомогательные файлы для одной повторяющейся задачи, например отчёта или миграции. В начале сессии агент видит только название и описание скилла, а целиком подгружает его, когда задача подходит, поэтому место в контексте не тратится заранее.',
          en: 'A folder with a `SKILL.md` file: instructions and helper files for one recurring task, such as a report or a migration. At the start of a session the agent sees only the skill name and description and loads the whole skill when the task fits, so context space is not spent in advance.',
        },
        match: { ru: ['скилл\\p{L}*', 'Agent Skills'], en: ['Agent Skills', 'skills?'] },
        related: ['claude-md', 'harness', 'claude-code'],
        source: { url: 'https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview', label: { ru: 'Anthropic: Agent Skills', en: 'Anthropic Agent Skills docs' } },
      },
    ],
  },
  {
    slug: 'mcp',
    icon: 'links',
    name: { ru: 'MCP и безопасность', en: 'MCP and safety' },
    hint: { ru: 'Как агент получает доступ к сервисам', en: 'How an agent gets access to services' },
    terms: [
      {
        slug: 'mcp',
        name: { ru: 'MCP', en: 'MCP' },
        aka: { ru: 'Model Context Protocol', en: 'Model Context Protocol' },
        def: {
          ru: 'Открытый протокол, по которому агент подключается к внешним сервисам — Jira, Airtable, базам данных — через единый интерфейс. Сервер MCP предлагает агенту набор инструментов, а права доступа остаются за вами.',
          en: 'An open protocol through which an agent connects to outside services — Jira, Airtable, databases — via one interface. An MCP server offers the agent a set of tools, while permissions stay with you.',
        },
        match: { ru: ['Model Context Protocol', 'MCP'], en: ['Model Context Protocol', 'MCP'] },
        related: ['mcp-scope', 'prompt-injection', 'claude-code'],
        source: { url: 'https://modelcontextprotocol.io/', label: { ru: 'Официальный сайт MCP', en: 'Model Context Protocol site' } },
      },
      {
        slug: 'mcp-client',
        name: { ru: 'MCP-клиент', en: 'MCP client' },
        def: {
          ru: 'Часть на стороне агента: обращается к MCP-серверу системы, просит данные и вызывает инструменты. Встроена в харнесс, например в Claude Code.',
          en: 'The part on the agent side: it calls a system’s MCP server, asks for data and invokes tools. It is built into the harness, for example Claude Code.',
        },
        match: { ru: ['MCP-клиент\\p{L}*'], en: ['MCP clients?'] },
        related: ['mcp', 'mcp-server', 'harness'],
        source: { url: 'https://modelcontextprotocol.io/docs/learn/client-concepts', label: { ru: 'MCP: устройство клиентов', en: 'MCP: Understanding clients' } },
      },
      {
        slug: 'mcp-server',
        name: { ru: 'MCP-сервер', en: 'MCP server' },
        def: {
          ru: 'Часть на стороне системы (Jira, GitLab, базы): отдаёт данные и принимает действия от агента по единому протоколу. Права доступа задаются на этой стороне.',
          en: 'The part on the system side (Jira, GitLab, a database): it serves data and accepts actions from the agent over one protocol. Permissions are set on this side.',
        },
        match: { ru: ['MCP-сервер\\p{L}*'], en: ['MCP servers?'] },
        related: ['mcp', 'mcp-client', 'mcp-scope'],
        source: { url: 'https://modelcontextprotocol.io/docs/learn/server-concepts', label: { ru: 'MCP: устройство серверов', en: 'MCP: Understanding servers' } },
        more: { post: 'mcp-1c', label: { ru: 'MCP-сервер для 1С: как пустить ИИ-агента к базе и не сломать её', en: 'MCP server for 1C: letting an AI agent into the database without breaking it' } },
      },
      {
        slug: 'oauth',
        name: { ru: 'OAuth', en: 'OAuth' },
        def: {
          ru: 'Вход через браузер: когда агент подключается к сервису, харнесс открывает страницу входа этого сервиса, вы вводите пароль там и подтверждаете доступ, а агент получает токен. Пароль агент не видит; токен ограничен выданными правами, и его можно отозвать. Так MCP-серверы подключают, например, к Jira и Sentry.',
          en: 'Sign-in through the browser: when the agent connects to a service, the harness opens that service sign-in page, you type the password there and approve access, and the agent gets a token. The agent never sees the password; the token is limited to the granted permissions and can be revoked. This is how MCP servers connect to Jira and Sentry, for example.',
        },
        match: { ru: ['OAuth(?: 2\\.0)?'], en: ['OAuth(?: 2\\.0)?'] },
        related: ['mcp', 'token'],
        source: { url: 'https://modelcontextprotocol.io/specification/latest/basic/authorization', label: { ru: 'Спецификация MCP: авторизация', en: 'MCP spec: Authorization' } },
      },
      {
        slug: 'mcp-scope',
        name: { ru: 'Уровни MCP-серверов', en: 'MCP server scopes' },
        aka: { ru: 'scope: local · project · user', en: 'scope: local · project · user' },
        def: {
          ru: 'Уровень отвечает на два вопроса: в каких проектах работает MCP-сервер и кто его видит. В Claude Code их три, уровень выбирают при добавлении сервера: `local` — по умолчанию, только вы и текущий проект; `project` — вся команда через файл `.mcp.json` в репозитории, каждый подтверждает сервер перед первым запуском; `user` — только вы и все ваши проекты. При совпадении имён берётся запись верхнего слоя целиком: `local` перекрывает `project`, `project` — `user`.',
          en: 'A scope answers two questions: which projects an MCP server works in and who sees it. Claude Code has three, chosen when you add a server: `local`, the default, only you and the current `project`; `project`, the whole team through a `.mcp.json` file in the repo, each person approves the server before first use; `user`, only you and all your projects. On a name clash the upper layer wins entirely: `local` overrides `project`, `project` overrides `user`.',
        },
        match: { ru: ['уровн\\p{L}* MCP-сервер\\p{L}*', 'област\\p{L}* MCP', 'MCP scope'], en: ['MCP server scopes?', 'MCP scopes?'] },
        related: ['mcp', 'claude-code'],
        source: { url: 'https://code.claude.com/docs/en/mcp', label: { ru: 'Claude Code: подключение MCP', en: 'Claude Code MCP docs' } },
        table: {
          title: { ru: 'Три уровня рядом', en: 'The three scopes side by side' },
          head: { ru: ['local', 'project', 'user'], en: ['local', 'project', 'user'] },
          rows: [
            { ru: ['Кто видит', 'только вы', 'вся команда', 'только вы'], en: ['Who sees it', 'only you', 'the whole team', 'only you'] },
            { ru: ['В каких проектах', 'в текущем', 'в этом репозитории', 'во всех ваших'], en: ['In which projects', 'the current one', 'this repository', 'all of yours'] },
            { ru: ['Где хранится', '`~/.claude.json`, под путём проекта', '`.mcp.json` в корне репозитория', '`~/.claude.json`, общий раздел'], en: ['Where it is stored', '`~/.claude.json`, under the project path', '`.mcp.json` at the repo root', '`~/.claude.json`, shared section'] },
            { ru: ['Как добавить', '`claude mcp add` по умолчанию', '`claude mcp add --scope project`', '`claude mcp add --scope user`'], en: ['How to add', '`claude mcp add` by default', '`claude mcp add --scope project`', '`claude mcp add --scope user`'] },
            { ru: ['Перед запуском', 'ничего', 'каждый подтверждает сервер', 'ничего'], en: ['Before first use', 'nothing', 'everyone approves the server', 'nothing'] },
            { ru: ['При совпадении имён', 'перекрывает `project` и `user`', 'перекрывает `user`', 'уступает остальным'], en: ['On a name clash', 'overrides `project` and `user`', 'overrides `user`', 'yields to the others'] },
          ],
        },
      },
      {
        slug: 'prompt-injection',
        name: { ru: 'Prompt injection', en: 'Prompt injection' },
        aka: { ru: 'инъекция в промпт', en: 'prompt injection' },
        def: {
          ru: 'Атака, при которой злоумышленник прячет в своём тексте — письме, тикете, веб-странице — инструкцию для агента. Агент читает её вместе с данными, принимает за часть запроса, и его поведение подменяется: он делает то, что нужно злоумышленнику, а не вам. Чем больше доступа у агента, тем дороже такая подмена.',
          en: 'An attack where someone hides an instruction for the agent inside their own text: an email, a ticket, a web page. The agent reads it along with the data, takes it as part of the request, and its behaviour is swapped: it does what the attacker wants instead of what you asked. The more access the agent has, the costlier the swap.',
        },
        match: { ru: ['prompt injection'], en: ['prompt injection'] },
        related: ['mcp', 'human-in-the-loop', 'planes'],
        source: { url: 'https://genai.owasp.org/llmrisk/llm01-prompt-injection/', label: { ru: 'OWASP LLM01: промпт-инъекция', en: 'OWASP LLM01: Prompt Injection' } },
      },
      {
        slug: 'planes',
        name: { ru: 'Data plane и control plane', en: 'Data plane and control plane' },
        aka: { ru: 'плоскость данных и плоскость управления', en: 'data and control planes' },
        def: {
          ru: 'Две плоскости работы агента. Control plane: команды, то есть ваши сообщения и правила. Data plane: всё, что агент читает, то есть страницы, тикеты, документы и ответы серверов. Защита от prompt injection держит чужой текст в плоскости данных, чтобы он не стал командой.',
          en: 'Two planes of an agent’s work. Control plane: commands, meaning your messages and rules. Data plane: everything the agent reads, meaning pages, tickets, documents and server replies. Defence against prompt injection keeps foreign text in the data plane so it never becomes a command.',
        },
        match: { ru: ['(?:data|control) plane'], en: ['(?:data|control) plane'] },
        related: ['prompt-injection', 'mcp'],
        source: { url: 'https://en.wikipedia.org/wiki/Control_plane', label: { ru: 'Википедия: control plane', en: 'Wikipedia: Control plane' } },
      },
      {
        slug: 'permissions',
        name: { ru: 'Права доступа', en: 'Permissions' },
        aka: { ru: 'права ИИ-агента, разрешения, принцип минимальных привилегий', en: 'AI agent permissions, permission modes, least privilege' },
        def: {
          ru: 'Права ИИ-агента — что ему разрешено делать в вашей среде и подключённых системах: только читать или ещё и писать, какие команды запускать. Действует принцип минимальных привилегий: агент получает ровно те права, что нужны для задачи, и их повышают по ступеням.',
          en: 'AI agent permissions define what the agent may do in your environment and connected systems: only read or write as well, and which commands to run. The principle of least privilege applies: the agent gets exactly the rights the task needs, raised step by step.',
        },
        match: { ru: ['прав\\p{L}* доступа', 'права на (?:чтение|запись)', 'прав\\p{L}* ИИ-агент\\p{L}*', 'принцип\\p{L}* минимальных привилегий'], en: ['permissions?', 'access rights?', 'least privilege'] },
        related: ['mcp-scope', 'prompt-injection', 'tool', 'sandbox', 'human-in-the-loop'],
        source: { url: 'https://code.claude.com/docs/en/permissions', label: { ru: 'Claude Code: настройка разрешений', en: 'Claude Code permissions docs' } },
        seo: {
          title: { ru: 'Права ИИ-агента: принцип минимальных привилегий и режимы разрешений — Claude Code, Codex', en: 'AI agent permissions: least privilege, Claude Code permission modes and --dangerously-skip-permissions' },
          description: {
            ru: 'Права ИИ-агента и принцип минимальных привилегий: какие права давать агенту и как повышать их по ступеням. Режимы разрешений в Claude Code и Codex и что делает флаг --dangerously-skip-permissions.',
            en: 'AI agent permissions and least privilege: what rights to give an agent and how to raise them step by step. Permission modes in Claude Code and Codex, and what --dangerously-skip-permissions does.',
          },
        },
        notes: {
          title: { ru: 'Права в агентах', en: 'Permissions in agents' },
          items: [
            { name: { ru: 'Ступени', en: 'Steps' }, text: { ru: 'сначала только чтение, затем запись в тестовую среду, а запись в рабочую систему — только через человека.', en: 'first read only, then writes to a test environment; writes to a live system go only through a person.' } },
            { name: { ru: 'Claude Code: правила', en: 'Claude Code: rules' }, text: { ru: 'в настройках задают, что разрешить, о чём спросить и что запретить. Запрет сильнее любого режима.', en: 'settings say what to allow, what to ask about and what to deny. A deny rule beats any mode.' } },
            { name: { ru: 'Claude Code: режимы', en: 'Claude Code: modes' }, text: { ru: 'по умолчанию спрашивает перед правками и командами; режим acceptEdits принимает правки сам; plan только читает и планирует; auto сам решает, что безопасно; bypassPermissions — он же флаг `--dangerously-skip-permissions` — не спрашивает ничего и годится только для песочницы.', en: 'by default it asks before edits and commands; acceptEdits accepts edits itself; plan only reads and plans; auto decides what is safe; bypassPermissions, the same as the `--dangerously-skip-permissions` flag, asks nothing and suits only a sandbox.' } },
            { name: { ru: 'Codex: режимы', en: 'Codex: modes' }, text: { ru: 'только чтение; рабочий режим — правки и команды внутри папки проекта без вопросов, остальное с подтверждением; полный доступ — без песочницы и подтверждений.', en: 'read only; workspace mode, with edits and commands inside the project folder without asking and everything else with approval; full access, with no sandbox and no approvals.' } },
          ],
        },
      },
    ],
  },
  {
    slug: 'systems',
    icon: 'links',
    name: { ru: 'Системы и сервисы', en: 'Systems and services' },
    hint: { ru: 'К чему подключают агента', en: 'What an agent is connected to' },
    terms: [
      {
        slug: 'jira',
        name: { ru: 'Jira', en: 'Jira' },
        def: {
          ru: 'Система учёта задач и ошибок от Atlassian. Агент через MCP читает задачи вместе с комментариями и историей изменений, а писать в неё может только с вашего разрешения.',
          en: 'A task and bug tracker from Atlassian. Through MCP an agent reads tasks with their comments and change history, and may write to it only with your permission.',
        },
        match: { ru: ['Jira'], en: ['Jira'] },
        related: ['atlassian', 'mcp', 'mcp-server', 'ai-agent'],
        source: { url: 'https://www.atlassian.com/software/jira', label: { ru: 'Официальная страница Jira', en: 'Jira official page' } },
      },
      {
        slug: 'sentry',
        name: { ru: 'Sentry', en: 'Sentry' },
        def: {
          ru: 'Сервис мониторинга ошибок: собирает исключения из приложения вместе с контекстом. Каждая ошибка помечена версией приложения, в которой она случилась, поэтому агент через MCP видит, с какого выката она началась, и ищет причину в изменениях именно этой версии.',
          en: 'An error-monitoring service that collects exceptions from the app with context. Every error is tagged with the app version it happened in, so through MCP the agent sees which deploy it started with and looks for the cause in that version changes.',
        },
        match: { ru: ['Sentry'], en: ['Sentry'] },
        related: ['mcp', 'grafana', 'oauth'],
        source: { url: 'https://sentry.io/welcome/', label: { ru: 'Официальный сайт Sentry', en: 'Sentry official site' } },
      },
      {
        slug: 'grafana',
        name: { ru: 'Grafana', en: 'Grafana' },
        def: {
          ru: 'Система графиков и дашбордов для метрик и логов. Агент через MCP читает метрики и логи и собирает картину инцидента. Чтобы он ничего не поменял сам, MCP-сервер Grafana запускают с флагом `--disable-write`: тогда агенту доступно только чтение, а создавать и править дашборды, алерты и инциденты он не может.',
          en: 'A charts and dashboards system for metrics and logs. Through MCP the agent reads metrics and logs and builds the incident picture. To keep it from changing anything, the Grafana MCP server is started with the `--disable-write` flag: the agent can then only read and cannot create or edit dashboards, alerts or incidents.',
        },
        match: { ru: ['Grafana'], en: ['Grafana'] },
        related: ['mcp', 'sentry', 'mcp-server'],
        source: { url: 'https://grafana.com/', label: { ru: 'Официальный сайт Grafana', en: 'Grafana official site' } },
      },
      {
        slug: 'gitlab',
        name: { ru: 'GitLab', en: 'GitLab' },
        def: {
          ru: 'Платформа для хранения кода и запросов на слияние. Через MCP агент видит код всех проектов сразу и не клонирует их к себе: ищет по проектам, читает файлы, запросы на слияние и ревью из первых рук, а не в пересказе.',
          en: 'A platform for code and merge requests. Through MCP the agent sees the code of every project at once without cloning them: it searches across projects and reads files, merge requests and reviews first-hand instead of a retelling.',
        },
        match: { ru: ['GitLab'], en: ['GitLab'] },
        related: ['mcp', 'jira'],
        source: { url: 'https://about.gitlab.com/', label: { ru: 'Официальный сайт GitLab', en: 'GitLab official site' } },
      },
      {
        slug: 'confluence',
        name: { ru: 'Confluence', en: 'Confluence' },
        def: {
          ru: 'Вики-система Atlassian: база знаний команды. Через MCP агент берёт оттуда статьи и прошлые решения.',
          en: 'An Atlassian wiki: the team’s knowledge base. Through MCP an agent pulls articles and past decisions from it.',
        },
        match: { ru: ['Confluence'], en: ['Confluence'] },
        related: ['atlassian', 'mcp', 'jira'],
        source: { url: 'https://www.atlassian.com/software/confluence', label: { ru: 'Официальная страница Confluence', en: 'Confluence official page' } },
      },
    ],
  },
  {
    slug: 'specs',
    icon: 'specs',
    name: { ru: 'Спеки и архитектура', en: 'Specs and architecture' },
    hint: { ru: 'Как описывать, что должен делать код', en: 'How to describe what the code must do' },
    terms: [
      {
        slug: 'harness-engineering',
        name: { ru: 'Harness engineering', en: 'Harness engineering' },
        aka: { ru: 'харнесс-инжиниринг', en: 'harness engineering' },
        def: {
          ru: 'Общая дисциплина: настраивать харнесс — что агент знает о проекте, какими инструментами владеет, что ему разрешено и как проверяется результат. Охватывает всё окружение сразу, без заданного порядка действий.',
          en: 'The general discipline of tuning a harness: what the agent knows about the project, which tools it has, what it may do and how the result is checked. It covers the whole environment, with no fixed order of steps.',
        },
        match: { ru: ['harness engineering', 'харнесс-инжиниринг\\p{L}*'], en: ['harness engineering'] },
        related: ['harness', 'hdd'],
        source: { url: 'https://martinfowler.com/articles/harness-engineering.html', label: { ru: 'Мартин Фаулер: harness engineering', en: 'martinfowler.com: Harness engineering' } },
      },
      {
        slug: 'hdd',
        name: { ru: 'HDD', en: 'HDD' },
        aka: { ru: 'Harness-Driven Development', en: 'Harness-Driven Development' },
        def: {
          ru: 'Один конкретный метод внутри harness engineering: каждая ошибка агента превращается в правило его среды — инструкцию, проверку или ограничение. Так среда растёт от реальных ошибок, а ошибка не повторяется в следующих запусках.',
          en: 'One specific method within harness engineering: every agent mistake becomes a rule of its environment — an instruction, a check or a limit. The environment grows from real mistakes and the mistake does not return in later runs.',
        },
        match: { ru: ['HDD', 'Harness-Driven Development'], en: ['HDD', 'Harness-Driven Development'] },
        related: ['harness', 'harness-engineering', 'claude-md'],
      },
      {
        slug: 'spec-driven-development',
        name: { ru: 'Spec-Driven Development', en: 'Spec-Driven Development' },
        aka: { ru: 'SDD', en: 'SDD' },
        def: {
          ru: 'Подход, где сначала пишется спецификация — что система должна делать, — а код пишет и сверяет с ней агент. Спека становится главным документом, а код — её следствием.',
          en: 'An approach where a specification — what the system must do — is written first, and an agent writes the code and checks it against the spec. The spec becomes the main document and the code its consequence.',
        },
        match: { ru: ['Spec-Driven Development', 'spec-driven development', 'SDD'], en: ['Spec-Driven Development', 'spec-driven development', 'SDD'] },
        related: ['openspec', 'spec-kit', 'reconcile-loop'],
        source: { url: 'https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/', label: { ru: 'Блог GitHub: разработка от спецификаций', en: 'GitHub Blog: Spec-driven development' } },
        compare: {
          title: { ru: 'Reconcile loop: Kubernetes и агент', en: 'Reconcile loop: Kubernetes and the agent' },
          head: { ru: ['Kubernetes', 'Spec-Driven Development'], en: ['Kubernetes', 'Spec-Driven Development'] },
          rows: [
            { ru: ['Желаемое', 'манифесты, Helm-чарт', 'спека'], en: ['Desired', 'manifests, a Helm chart', 'the spec'] },
            { ru: ['Фактическое', 'сервисы в кластере', 'код в репозитории'], en: ['Actual', 'services in the cluster', 'code in the repository'] },
            { ru: ['Кто сверяет', 'контроллер', 'агент'], en: ['Who compares', 'a controller', 'the agent'] },
            { ru: ['Что делает при расхождении', 'поднимает или убирает поды', 'правит код, пока тесты и спека не сойдутся'], en: ['What it does on a mismatch', 'starts or removes pods', 'edits code until tests and spec agree'] },
            { ru: ['Как менять систему', 'правят манифест, не кластер', 'правят спеку, не код'], en: ['How to change the system', 'edit the manifest, not the cluster', 'edit the spec, not the code'] },
          ],
        },
      },
      {
        slug: 'openspec',
        name: { ru: 'OpenSpec', en: 'OpenSpec' },
        def: {
          ru: 'Лёгкий инструмент для Spec-Driven Development от Fission AI. Действующие спеки лежат в `openspec/specs`, а каждое изменение — отдельная папка в `openspec/changes`: `proposal.md` (зачем и что), дельта к спекам, `design.md` и `tasks.md`. Агент идёт по командам `/opsx:propose` → `/opsx:apply` → `/opsx:archive`; при архивации дельта вливается в спеки. Легче Spec Kit: без жёстких фаз, работает с 30+ агентами.',
          en: 'A lightweight Spec-Driven Development tool by Fission AI. Live specs sit in `openspec/specs`, and every change is its own folder in `openspec/changes`: `proposal.md` (why and what), a spec delta, `design.md` and `tasks.md`. The agent follows `/opsx:propose` → `/opsx:apply` → `/opsx:archive`; archiving merges the delta into the specs. Lighter than Spec Kit, with no rigid phases, and works with 30+ agents.',
        },
        match: { ru: ['OpenSpec'], en: ['OpenSpec'] },
        related: ['spec-driven-development', 'spec-kit'],
        source: { url: 'https://github.com/Fission-AI/OpenSpec', label: { ru: 'Репозиторий OpenSpec на GitHub', en: 'OpenSpec GitHub repo' } },
      },
      {
        slug: 'spec-kit',
        name: { ru: 'Spec Kit', en: 'Spec Kit' },
        def: {
          ru: 'Набор GitHub для Spec-Driven Development: утилита `specify` ставит в проект команды для агента, и они ведут по шагам — принципы проекта (`/speckit-constitution`), спека (`/speckit-specify`), технический план (`/speckit-plan`), задачи (`/speckit-tasks`), код (`/speckit-implement`) и сверка с артефактами (`/speckit-converge`), которую повторяют, пока код и спека не сойдутся. Работает с Copilot, Claude Code и другими агентами.',
          en: 'A GitHub toolkit for Spec-Driven Development: the `specify` CLI installs agent commands that lead step by step: project principles (`/speckit-constitution`), spec (`/speckit-specify`), technical plan (`/speckit-plan`), tasks (`/speckit-tasks`), code (`/speckit-implement`) and a check against the artifacts (`/speckit-converge`), repeated until code and spec agree. Works with Copilot, Claude Code and other agents.',
        },
        match: { ru: ['Spec Kit'], en: ['Spec Kit'] },
        related: ['spec-driven-development', 'openspec'],
        source: { url: 'https://github.com/github/spec-kit', label: { ru: 'Репозиторий Spec Kit на GitHub', en: 'Spec Kit GitHub repo' } },
      },
      {
        slug: 'rfc-2119',
        name: { ru: 'RFC 2119', en: 'RFC 2119' },
        aka: { ru: 'MUST · SHOULD · MAY', en: 'MUST · SHOULD · MAY' },
        def: {
          ru: 'Стандарт, который задаёт значение слов MUST, SHOULD и MAY в требованиях. В спеках эти уровни показывают агенту, что обязательно, что желательно, а что на его усмотрение.',
          en: 'A standard that fixes the meaning of MUST, SHOULD and MAY in requirements. In specs these levels tell the agent what is mandatory, what is advised and what is optional.',
        },
        match: { ru: ['RFC 2119'], en: ['RFC 2119'] },
        related: ['aggregate', 'spec-driven-development'],
        source: { url: 'https://www.rfc-editor.org/rfc/rfc2119', label: { ru: 'RFC 2119 — текст стандарта', en: 'RFC 2119, the standard text' } },
      },
      {
        slug: 'ddd',
        name: { ru: 'Domain-Driven Design', en: 'Domain-Driven Design' },
        aka: { ru: 'DDD', en: 'DDD' },
        def: {
          ru: 'Подход к проектированию, где код строится вокруг предметной области и её языка, общего с бизнесом. Предметная область делится на ограниченные контексты, внутри них живут агрегаты: принимают команды, держат бизнес-правила и отправляют события в соседние ограниченные контексты.',
          en: 'A design approach where code is built around the business domain and a language shared with the business. The domain is split into bounded contexts; inside them live aggregates that take commands, hold business rules and send events to neighbouring contexts.',
        },
        match: { ru: ['Domain-Driven Design', 'DDD'], en: ['Domain-Driven Design', 'DDD'] },
        related: ['aggregate', 'bounded-context', 'spec-driven-development'],
        source: { url: 'https://martinfowler.com/bliki/DomainDrivenDesign.html', label: { ru: 'Мартин Фаулер: Domain-Driven Design', en: 'Martin Fowler: Domain-Driven Design' } },
      },
      {
        slug: 'aggregate',
        name: { ru: 'Агрегат', en: 'Aggregate' },
        def: {
          ru: 'Группа связанных объектов предметной области, которая меняется как единое целое через корень и сама держит бизнес-правила. У агрегата есть команды, которые его меняют; версия, которая растёт с каждым изменением; модели отображения, чтобы посмотреть, что внутри; события, которые он отправляет в другие ограниченные контексты. В спеках по агрегатам одна спека описывает один агрегат.',
          en: 'A group of related domain objects that changes as one unit through its root and holds its own business rules. An aggregate has commands that change it; a version that grows with every change; read models to see what is inside; events it sends to other bounded contexts. In specs by aggregate, one spec describes one aggregate.',
        },
        match: { ru: ['агрегат(?!ор)\\p{L}*'], en: ['aggregates?'] },
        related: ['bounded-context', 'ddd', 'rfc-2119'],
        source: { url: 'https://martinfowler.com/bliki/DDD_Aggregate.html', label: { ru: 'Мартин Фаулер: агрегат DDD', en: 'Martin Fowler: DDD Aggregate' } },
      },
      {
        slug: 'bounded-context',
        name: { ru: 'Ограниченный контекст', en: 'Bounded context' },
        def: {
          ru: 'Граница, внутри которой термины имеют один смысл. Слово «заказ» в продажах и в доставке может значить разное, поэтому у каждой границы свои спеки и свой словарь. Через границу соседи общаются событиями агрегатов.',
          en: 'A boundary inside which terms mean one thing. “Order” in sales and in delivery can mean different things, so each boundary gets its own specs and vocabulary. Across the border, contexts talk through aggregate events.',
        },
        match: { ru: ['ограниченн\\p{L}* контекст\\p{L}*'], en: ['bounded contexts?'] },
        related: ['aggregate', 'ddd'],
        source: { url: 'https://martinfowler.com/bliki/BoundedContext.html', label: { ru: 'Мартин Фаулер: ограниченный контекст', en: 'Martin Fowler: Bounded Context' } },
      },
      {
        slug: 'reconcile-loop',
        name: { ru: 'Петля сверки', en: 'Reconcile loop' },
        aka: { ru: 'как в Kubernetes', en: 'as in Kubernetes' },
        def: {
          ru: 'Цикл, в котором система постоянно сравнивает желаемое состояние с фактическим и приводит второе к первому. Так работает Kubernetes: в манифестах или Helm-чарте описано, какие сервисы должны быть запущены, а контроллер раз за разом сверяет это с кластером и поднимает недостающее. В Spec-Driven Development то же самое: желаемое — спека, фактическое — код, а приводит код к спеке агент.',
          en: 'A loop in which a system keeps comparing the desired state with the actual one and brings the second to the first. Kubernetes works this way: manifests or a Helm chart describe which services must run, and a controller keeps checking that against the cluster and starts what is missing. Spec-Driven Development is the same: the desired state is the spec, the actual one is the code, and the agent brings the code to the spec.',
        },
        match: { ru: ['петл\\p{L}* сверки', 'reconcile loop'], en: ['reconcile loops?', 'reconciliation loops?'] },
        related: ['spec-driven-development', 'human-in-the-loop'],
        source: { url: 'https://kubernetes.io/docs/concepts/architecture/controller/', label: { ru: 'Kubernetes: контроллеры', en: 'Kubernetes: Controllers' } },
        compare: {
          title: { ru: 'Reconcile loop: Kubernetes и агент', en: 'Reconcile loop: Kubernetes and the agent' },
          head: { ru: ['Kubernetes', 'Spec-Driven Development'], en: ['Kubernetes', 'Spec-Driven Development'] },
          rows: [
            { ru: ['Желаемое', 'манифесты, Helm-чарт', 'спека'], en: ['Desired', 'manifests, a Helm chart', 'the spec'] },
            { ru: ['Фактическое', 'сервисы в кластере', 'код в репозитории'], en: ['Actual', 'services in the cluster', 'code in the repository'] },
            { ru: ['Кто сверяет', 'контроллер', 'агент'], en: ['Who compares', 'a controller', 'the agent'] },
            { ru: ['Что делает при расхождении', 'поднимает или убирает поды', 'правит код, пока тесты и спека не сойдутся'], en: ['What it does on a mismatch', 'starts or removes pods', 'edits code until tests and spec agree'] },
            { ru: ['Как менять систему', 'правят манифест, не кластер', 'правят спеку, не код'], en: ['How to change the system', 'edit the manifest, not the cluster', 'edit the spec, not the code'] },
          ],
        },
      },
      {
        slug: 'memory-bank',
        name: { ru: 'Memory Bank', en: 'Memory Bank' },
        def: {
          ru: 'Папка `memory-bank` с шестью markdown-файлами, где агент держит контекст проекта между сессиями: `projectbrief` (цели и рамки), `productContext` (зачем продукт), `systemPatterns` (архитектура), `techContext` (стек), `activeContext` (текущий фокус) и `progress` (что готово). Агент читает их в начале каждой задачи и обновляет после крупных изменений или по команде «update memory bank». Это набор инструкций для агента из Cline, он работает и с другими агентами: частный случай памяти проекта в файлах, как CLAUDE.md.',
          en: 'A `memory-bank` folder with six markdown files where the agent keeps project context between sessions: `projectbrief` (goals and scope), `productContext` (why the product exists), `systemPatterns` (architecture), `techContext` (stack), `activeContext` (current focus) and `progress` (what is done). The agent reads them at the start of every task and updates them after major changes or on "update memory bank". It is a set of agent instructions from Cline that works with other agents too: one case of project memory kept in files, like CLAUDE.md.',
        },
        match: { ru: ['Memory Bank'], en: ['Memory Bank'] },
        related: ['memory', 'bible', 'claude-md', 'agent-skills'],
        source: { url: 'https://docs.cline.bot/best-practices/memory-bank', label: { ru: 'Cline: Memory Bank', en: 'Cline Memory Bank docs' } },
      },
      {
        slug: 'requirements',
        name: { ru: 'Требования', en: 'Requirements' },
        def: {
          ru: 'Описание того, что система должна делать и при каких условиях. У каждого требования есть источник, и от него зависит, насколько серьёзной будет правка: мажорной или минорной.',
          en: 'A description of what the system must do and under which conditions. Every requirement has a source, and it decides how serious an edit is: major or minor.',
        },
        match: { ru: ['требовани\\p{L}*'], en: ['requirements?'] },
        related: ['source', 'hallucination'],
        source: { url: 'https://en.wikipedia.org/wiki/Requirements_engineering', label: { ru: 'Википедия: инженерия требований', en: 'Wikipedia: Requirements engineering' } },
      },
      {
        slug: 'c4-model',
        name: { ru: 'Модель C4', en: 'C4 model' },
        def: {
          ru: 'Способ рисовать архитектуру на четырёх уровнях: контекст, контейнеры, компоненты, код. Диаграммы разной глубины читаются вместе и не смешиваются в одну картинку.',
          en: 'A way to draw architecture at four levels: context, containers, components, code. Diagrams of different depth read together without mixing into one picture.',
        },
        match: { ru: ['C4(?:-диаграмм\\p{L}*| model)?', 'модел\\p{L}* C4'], en: ['C4 model', 'C4 diagrams?', 'C4'] },
        related: ['spec-driven-development'],
        source: { url: 'https://c4model.com/', label: { ru: 'c4model.com — сайт методологии, автор Саймон Браун', en: 'c4model.com, the method site by Simon Brown' } },
      },
      {
        slug: 'osi',
        name: { ru: 'Модель OSI', en: 'OSI model' },
        aka: { ru: 'семь уровней', en: 'seven layers' },
        def: {
          ru: 'Эталонная модель, которая раскладывает сетевое взаимодействие на семь уровней: от физического до прикладного. Каждый уровень может жить на другой физической системе, поэтому чем больше уровней и систем на пути запроса, тем больше мест, где он ломается. Через эту модель удобно оценивать, насколько задача на самом деле сложна для агента.',
          en: 'A reference model that splits network communication into seven layers, from physical to application. Each layer may live on a different physical system, so the more layers and systems on the request path, the more places it can break. A handy lens for judging how hard a task really is for an agent.',
        },
        match: { ru: ['модел\\p{L}* OSI', 'OSI'], en: ['OSI model', 'OSI'] },
        related: ['bounded-context', 'c4-model'],
        source: { url: 'https://www.iso.org/standard/20269.html', label: { ru: 'ISO/IEC 7498-1 — стандарт модели OSI', en: 'ISO/IEC 7498-1, the OSI model standard' } },
      },
      {
        slug: 'epimorphism',
        name: { ru: 'Эпиморфизм', en: 'Epimorphism' },
        aka: { ru: 'соответствие без пустых мест', en: 'a matching with no empty spots' },
        def: {
          ru: 'Соответствие, при котором каждая часть результата получена из чего-то в источнике: непокрытых частей нет. Для ответа агента это значит, что у каждого утверждения есть опора в данных. Там, где опоры нет, остаётся пустое место, и модель заполняет его догадкой: так возникает галлюцинация.',
          en: 'A matching where every part of the result comes from something in the source: no part is left uncovered. For an agent’s answer it means every statement has support in the data. Where there is no support an empty spot remains, and the model fills it with a guess: that is how a hallucination arises.',
        },
        match: { ru: ['эпиморфизм\\p{L}*'], en: ['epimorphisms?'] },
        related: ['hallucination', 'source', 'context'],
        source: { url: 'https://en.wikipedia.org/wiki/Epimorphism', label: { ru: 'Википедия: эпиморфизм', en: 'Wikipedia: Epimorphism' } },
      },
    ],
  },
  {
    slug: 'languages',
    icon: 'code',
    name: { ru: 'Языки и платформы', en: 'Languages and platforms' },
    hint: { ru: 'JavaScript, его надстройки, среды запуска и каркасы для сайтов', en: 'JavaScript, its extensions, runtimes and web frameworks' },
    terms: [
      {
        slug: 'javascript',
        name: { ru: 'JavaScript', en: 'JavaScript' },
        aka: { ru: 'язык сайтов и многих программ', en: 'the language of websites and many programs' },
        def: {
          ru: 'Язык программирования, на котором работают страницы сайтов в браузере: кнопки, формы и всё, что откликается на действия. Им же пишут программы на сервере, например в среде Node.js. Тесты для такого кода запускают движки вроде Jest, Vitest и QUnit.',
          en: 'A programming language that makes web pages work in the browser: buttons, forms and everything that reacts to actions. It is also used for server programs, for example in Node.js. Tests for such code are run by engines such as Jest, Vitest and QUnit.',
        },
        match: { ru: ['JavaScript'], en: ['JavaScript'] },
        related: ['automated-test', 'node-js', 'jest', 'vitest', 'qunit'],
        source: { url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', label: { ru: 'MDN: JavaScript', en: 'MDN: JavaScript' } },
      },
      {
        slug: 'typescript',
        name: { ru: 'TypeScript', en: 'TypeScript' },
        aka: { ru: 'JavaScript с типами', en: 'JavaScript with types' },
        def: {
          ru: 'Надстройка над JavaScript, в которой у значений указывают тип: число, строка и так далее. Благодаря этому ошибки вроде «вместо числа передали строку» находятся до запуска программы, а не у пользователя. Готовую программу переводят в обычный JavaScript.',
          en: 'An extension of JavaScript in which values are given a type: number, string and so on. Thanks to this, errors like “a string was passed instead of a number” are found before the program runs, not at the user’s. The finished program is turned into ordinary JavaScript.',
        },
        match: { ru: ['TypeScript'], en: ['TypeScript'] },
        related: ['javascript', 'babel', 'jest'],
        source: { url: 'https://www.typescriptlang.org/', label: { ru: 'typescriptlang.org — сайт TypeScript', en: 'typescriptlang.org, the TypeScript site' } },
      },
      {
        slug: 'babel',
        name: { ru: 'Babel', en: 'Babel' },
        aka: { ru: 'переводчик нового JavaScript', en: 'a translator of new JavaScript' },
        def: {
          ru: 'Программа, которая переводит новый JavaScript в такой, который понимают более старые браузеры и среды. Можно писать современным языком, а запускать там, где его ещё не знают. Тесты в Jest работают и с проектами, которые собираются через Babel.',
          en: 'A program that turns new JavaScript into one that older browsers and environments understand. You can write in the modern language and run it where it is not yet known. Jest tests work with projects that are built through Babel too.',
        },
        match: { ru: ['Babel'], en: ['Babel'] },
        related: ['javascript', 'typescript', 'jest'],
        source: { url: 'https://babeljs.io/', label: { ru: 'babeljs.io — сайт Babel', en: 'babeljs.io, the Babel site' } },
      },
      {
        slug: 'node-js',
        name: { ru: 'Node.js', en: 'Node.js' },
        aka: { ru: 'JavaScript вне браузера', en: 'JavaScript outside the browser' },
        def: {
          ru: 'Программа, которая запускает JavaScript вне браузера: на сервере, в командной строке и в скриптах. Без неё код на JavaScript работал бы только внутри страницы сайта. Благодаря Node.js на одном языке пишут и сайт, и серверную часть, и программы для разработчика. Тесты на Jest, Vitest и QUnit чаще всего тоже запускают в Node.js, а сборщик Vite сам работает на нём.',
          en: 'A program that runs JavaScript outside the browser: on a server, on the command line and in scripts. Without it, JavaScript code would only work inside a web page. Thanks to Node.js one language is used for the site, the server side and developer programs. Tests with Jest, Vitest and QUnit are most often run in Node.js too, and the Vite bundler itself runs on it.',
        },
        match: { ru: ['Node\\.js'], en: ['Node\\.js'] },
        related: ['javascript', 'vite', 'jest', 'vitest', 'qunit'],
        source: { url: 'https://nodejs.org/', label: { ru: 'nodejs.org — сайт Node.js', en: 'nodejs.org, the Node.js site' } },
      },
      {
        slug: 'vite',
        name: { ru: 'Vite', en: 'Vite' },
        aka: { ru: 'сборщик для сайтов', en: 'a bundler for web apps' },
        def: {
          ru: 'Программа, которая собирает код сайта и в процессе работы мгновенно показывает правки в браузере. Его настройки описывают, как собирать проект. Vitest берёт эти же настройки для тестов, поэтому отдельная конфигурация для тестов не нужна.',
          en: 'A program that builds the code of a website and instantly shows edits in the browser while you work. Its settings describe how to build the project. Vitest reuses these same settings for tests, so no separate test configuration is needed.',
        },
        match: { ru: ['Vite'], en: ['Vite'] },
        related: ['vitest', 'javascript', 'node-js'],
        source: { url: 'https://vite.dev/', label: { ru: 'vite.dev — сайт Vite', en: 'vite.dev, the Vite site' } },
      },
      {
        slug: 'react-js',
        name: { ru: 'React', en: 'React' },
        aka: { ru: 'библиотека для сайтов, не путать с ReAct', en: 'a web library, not to be confused with ReAct' },
        def: {
          ru: 'Библиотека на JavaScript для построения страниц сайтов: страница собирается из готовых блоков-компонентов, и при изменении данных обновляются только нужные блоки. Одна из самых распространённых наряду с Angular и Vue. К схеме работы агента ReAct отношения не имеет, у них только похожие названия.',
          en: 'A JavaScript library for building web pages: a page is assembled from ready-made blocks called components, and when data changes only the needed blocks are updated. One of the most widespread along with Angular and Vue. It has nothing to do with the ReAct agent scheme: only the names are similar.',
        },
        match: { ru: ['React'], en: ['React'] },
        exact: 'React',
        related: ['javascript', 'angular', 'vue', 'react'],
        source: { url: 'https://react.dev/', label: { ru: 'react.dev — сайт React', en: 'react.dev, the React site' } },
      },
      {
        slug: 'angular',
        name: { ru: 'Angular', en: 'Angular' },
        aka: { ru: 'каркас для сайтов', en: 'a web framework' },
        def: {
          ru: 'Каркас для построения сайтов и веб-приложений на JavaScript и TypeScript: страница собирается из готовых блоков-компонентов. Один из самых распространённых наряду с React и Vue.',
          en: 'A framework for building websites and web apps in JavaScript and TypeScript: a page is assembled from ready-made blocks called components. One of the most widespread along with React and Vue.',
        },
        match: { ru: ['Angular'], en: ['Angular'] },
        related: ['javascript', 'typescript', 'react-js', 'vue'],
        source: { url: 'https://angular.dev/', label: { ru: 'angular.dev — сайт Angular', en: 'angular.dev, the Angular site' } },
      },
      {
        slug: 'vue',
        name: { ru: 'Vue', en: 'Vue' },
        aka: { ru: 'каркас для сайтов', en: 'a web framework' },
        def: {
          ru: 'Каркас для построения сайтов на JavaScript: страница собирается из блоков-компонентов, и его можно подключать к проекту постепенно. Один из самых распространённых наряду с Angular и React.',
          en: 'A framework for building websites in JavaScript: a page is assembled from blocks called components, and it can be adopted in a project gradually. One of the most widespread along with Angular and React.',
        },
        match: { ru: ['Vue(?:\\.js)?'], en: ['Vue(?:\\.js)?'] },
        related: ['javascript', 'react-js', 'angular', 'typescript'],
        source: { url: 'https://vuejs.org/', label: { ru: 'vuejs.org — сайт Vue', en: 'vuejs.org, the Vue site' } },
      },
    ],
  },
  {
    slug: 'testing',
    icon: 'tests',
    name: { ru: 'Тестирование', en: 'Testing' },
    hint: { ru: 'Автоматические тесты, движки и проверка самих тестов', en: 'Automated tests, frameworks and checking the tests themselves' },
    terms: [
      {
        slug: 'automated-test',
        name: { ru: 'Автоматический тест', en: 'Automated test' },
        aka: { ru: 'автотест, Jest, Vitest, QUnit', en: 'autotest, Jest, Vitest, QUnit' },
        def: {
          ru: 'Короткая программа, которая запускает код с заданным входом и сверяет результат с ожидаемым. Её пишут один раз, а запускают после каждой правки, и если правка сломала работавшее, тест падает. Движки вроде Jest, Vitest и QUnit запускают такие тесты для кода на JavaScript. Тест ловит только то, что вы заранее придумали проверить, поэтому его дополняют моделями правил и проверкой самих тестов.',
          en: 'A short program that runs code with a given input and compares the result with the expected one. It is written once and run after every edit, and if an edit broke something that worked, the test fails. Engines such as Jest, Vitest and QUnit run such tests for JavaScript code. A test catches only what you thought of checking in advance, so it is complemented by models of rules and by checking the tests themselves.',
        },
        match: { ru: ['автоматическ\\p{L}* тест\\p{L}*', 'автотест\\p{L}*', 'тестов\\p{L}* движк\\p{L}*'], en: ['automated tests?', 'autotests?', 'test engines?', 'test frameworks?'] },
        related: ['qunit', 'jest', 'vitest', 'mutation-testing', 'checks', 'quint'],
        also: [{ post: 'quint-vs-tests-and-tla', label: { ru: 'Чем Quint отличается от QUnit, Jest и TLA+', en: 'How Quint differs from QUnit, Jest and TLA+' } }],
        source: { url: 'https://en.wikipedia.org/wiki/Test_automation', label: { ru: 'Википедия: автоматизация тестирования', en: 'Wikipedia: Test automation' } },
      },
      {
        slug: 'jest',
        name: { ru: 'Jest', en: 'Jest' },
        aka: { ru: 'движок тестов для JavaScript', en: 'a JavaScript test framework' },
        def: {
          ru: 'Один из самых распространённых движков автоматических тестов для кода на JavaScript. Вы описываете, что функция должна вернуть на заданный вход, а Jest запускает все такие проверки и показывает, какие упали. Из той же семьи, что Vitest и QUnit, и проверяет готовый код, а не правила системы, как Quint.',
          en: 'One of the most widespread automated test frameworks for JavaScript code. You describe what a function must return for a given input, and Jest runs all such checks and shows which ones failed. From the same family as Vitest and QUnit, and it checks finished code, not the rules of a system as Quint does.',
        },
        match: { ru: ['Jest'], en: ['Jest'] },
        related: ['automated-test', 'javascript', 'vitest', 'qunit'],
        also: [{ post: 'quint-vs-tests-and-tla', label: { ru: 'Чем Quint отличается от QUnit, Jest и TLA+', en: 'How Quint differs from QUnit, Jest and TLA+' } }],
        source: { url: 'https://jestjs.io/', label: { ru: 'jestjs.io — сайт Jest', en: 'jestjs.io, the Jest site' } },
      },
      {
        slug: 'vitest',
        name: { ru: 'Vitest', en: 'Vitest' },
        aka: { ru: 'тесты на базе сборщика Vite', en: 'tests powered by Vite' },
        def: {
          ru: 'Движок автоматических тестов для JavaScript нового поколения, построенный на сборщике Vite. Делает то же, что Jest: запускает проверки готового кода и показывает упавшие, но использует настройки проекта на Vite и поэтому быстро перезапускается. Из той же семьи, что Jest и QUnit.',
          en: 'A next-generation automated test framework for JavaScript, powered by the Vite bundler. It does what Jest does: runs checks of finished code and shows the failed ones, but it reuses the project’s Vite setup and so restarts quickly. From the same family as Jest and QUnit.',
        },
        match: { ru: ['Vitest'], en: ['Vitest'] },
        related: ['automated-test', 'javascript', 'jest', 'qunit'],
        also: [{ post: 'quint-vs-tests-and-tla', label: { ru: 'Чем Quint отличается от QUnit, Jest и TLA+', en: 'How Quint differs from QUnit, Jest and TLA+' } }],
        source: { url: 'https://vitest.dev/', label: { ru: 'vitest.dev — сайт Vitest', en: 'vitest.dev, the Vitest site' } },
      },
      {
        slug: 'qunit',
        name: { ru: 'QUnit', en: 'QUnit' },
        aka: { ru: 'тестовый движок для JavaScript', en: 'a JavaScript test framework' },
        def: {
          ru: 'Движок автоматических тестов для кода на JavaScript, из той же семьи, что Jest и Vitest. Тест подаёт заданный вход в готовую функцию и сверяет ответ с ожидаемым. Названием похож на Quint, но это программа другого класса: QUnit проверяет написанный код, а Quint проверяет правила системы. Надёжность самих тестов проверяет мутационное тестирование: в код вносят порчу и смотрят, упадёт ли тест.',
          en: 'An automated test framework for JavaScript code, from the same family as Jest and Vitest. A test feeds a given input to a finished function and compares the answer with the expected one. The name resembles Quint, but it is a program of a different class: QUnit checks written code, while Quint checks the rules of a system. The reliability of the tests themselves is checked by mutation testing: a defect is introduced into the code to see whether a test fails.',
        },
        match: { ru: ['QUnit'], en: ['QUnit'] },
        related: ['automated-test', 'jest', 'vitest', 'mutation-testing', 'quint', 'model-checking'],
        also: [{ post: 'quint-vs-tests-and-tla', label: { ru: 'Чем Quint отличается от QUnit, Jest и TLA+', en: 'How Quint differs from QUnit, Jest and TLA+' } }],
        source: { url: 'https://qunitjs.com/', label: { ru: 'qunitjs.com — сайт QUnit', en: 'qunitjs.com, the QUnit site' } },
        compare: {
          title: { ru: 'QUnit и Quint', en: 'QUnit and Quint' },
          head: { ru: ['QUnit', 'Quint'], en: ['QUnit', 'Quint'] },
          rows: [
            { ru: ['Что проверяет', 'ответ готовой функции на заданные входы', 'отсутствие запрещённых состояний во всех порядках действий'], en: ['What it checks', 'a finished function’s answer for given inputs', 'no forbidden states in any order of actions'] },
            { ru: ['Что нужно', 'написанный код', 'описание правил, кода может не быть'], en: ['What it needs', 'written code', 'a description of rules, the code may not exist'] },
            { ru: ['Что сложно', 'придумать входы', 'сформулировать правила так, чтобы они отражали реальность'], en: ['What is hard', 'thinking up inputs', 'stating rules so that they reflect reality'] },
          ],
        },
      },
      {
        slug: 'mutation-testing',
        name: { ru: 'Мутационное тестирование', en: 'Mutation testing' },
        aka: { ru: 'испорченная копия', en: 'a deliberately broken copy' },
        def: {
          ru: 'Способ проверить сами проверки: человек или агент нарочно портит копию кода или модели, например убирает одно условие, и смотрит, заметят ли это автоматические тесты и правила. Если порча прошла незамеченной, проверка ничего не проверяет. В моделях на Quint такие копии называют мутантами.',
          en: 'A way to test the checks themselves: a person or an agent deliberately breaks a copy of the code or model, for example removes one condition, and sees whether tests and rules notice it. If the defect passes unnoticed, the check checks nothing. In Quint models such copies are called mutants.',
        },
        match: { ru: ['испорченн\\p{L}* коп\\p{L}*', 'мутационн\\p{L}* тестировани\\p{L}*', 'mutation testing'], en: ['mutation testing', 'broken cop(?:y|ies)'] },
        related: ['automated-test', 'qunit', 'model-checking', 'quint'],
        more: { post: 'quint-models-find-races', label: { ru: 'Проверка проверок в моделях на Quint', en: 'Checking the checks in Quint models' } },
        source: { url: 'https://en.wikipedia.org/wiki/Mutation_testing', label: { ru: 'Википедия: мутационное тестирование', en: 'Wikipedia: Mutation testing' } },
      },
    ],
  },
  {
    slug: 'formal',
    icon: 'research',
    name: { ru: 'Формальная верификация', en: 'Formal verification' },
    hint: { ru: 'Языки моделей, проверяющие программы и ошибки, которые они находят', en: 'Modeling languages, checking programs and the errors they find' },
    terms: [
      {
        slug: 'quint',
        name: { ru: 'Quint', en: 'Quint' },
        aka: { ru: 'язык формальных моделей', en: 'a language for formal models' },
        def: {
          ru: 'Язык, на котором описывают правила системы так, чтобы их можно было запускать и проверять до написания кода. Запись похожа на обычный код и читается инженерами без математической подготовки. Программа перебирает порядки действий и показывает цепочку шагов, где правило нарушается. Проверяют две программы: TLC и Apalache, есть и быстрый случайный прогон.',
          en: 'A language for describing the rules of a system so that they can be run and checked before any code is written. The notation looks like ordinary code and engineers without a math background can read it. The program tries orders of actions and shows the chain of steps where a rule breaks. Two programs check it: TLC and Apalache, and there is also a quick random simulation.',
        },
        match: { ru: ['Quint'], en: ['Quint'] },
        related: ['model-checking', 'apalache', 'tla-plus', 'invariant', 'qunit'],
        more: { post: 'quint-models-find-races', label: { ru: 'Как найти гонки и потерянные данные моделями на Quint', en: 'Finding races and lost data with Quint models' } },
        also: [{ post: 'quint-vs-tests-and-tla', label: { ru: 'Чем Quint отличается от QUnit, Jest и TLA+', en: 'How Quint differs from QUnit, Jest and TLA+' } }],
        source: { url: 'https://quint-lang.org/', label: { ru: 'quint-lang.org — сайт и документация Quint', en: 'quint-lang.org, the Quint site and docs' } },
      },
      {
        slug: 'tla-plus',
        name: { ru: 'TLA+', en: 'TLA+' },
        aka: { ru: 'автор Лесли Лэмпорт', en: 'by Leslie Lamport' },
        def: {
          ru: 'Способ описать, как система ведёт себя шаг за шагом, настолько точно, что описание можно проверить программой, как чертёж проверяют до стройки. Например, по чертежу денежного перевода находят, что при сбое между списанием и зачислением деньги пропадают, и делают это до написания кода. Запись похожа на математические формулы, поэтому порог входа выше, чем у Quint. Автор языка Лесли Лэмпорт.',
          en: 'A way to describe how a system behaves step by step so precisely that the description can be checked by a program, the way a blueprint is checked before construction. For example, a blueprint of a money transfer reveals that if a failure hits between the debit and the credit, money vanishes, and this is found before any code is written. The notation resembles mathematical formulas, so the entry step is higher than with Quint. The language was created by Leslie Lamport.',
        },
        match: { ru: ['TLA\\+'], en: ['TLA\\+'] },
        related: ['quint', 'alloy', 'apalache', 'model-checking'],
        also: [{ post: 'quint-vs-tests-and-tla', label: { ru: 'Quint против TLA+ и Alloy', en: 'Quint versus TLA+ and Alloy' } }],
        source: { url: 'https://lamport.azurewebsites.net/tla/tla.html', label: { ru: 'Страница TLA+ Лесли Лэмпорта', en: 'Leslie Lamport’s TLA+ page' } },
      },
      {
        slug: 'alloy',
        name: { ru: 'Alloy', en: 'Alloy' },
        aka: { ru: 'язык и анализатор моделей', en: 'a modeling language and analyzer' },
        def: {
          ru: 'Способ описать объекты и связи между ними и попросить программу найти небольшой пример, где правило нарушено. Например, правило «у сотрудника ровно один начальник»: программа находит пример, где у одного сотрудника сразу два начальника. Подходит для проверки устройства данных и прав доступа. Запись, как и у TLA+, математическая. Язык создан в группе проектирования ПО при MIT.',
          en: 'A way to describe objects and the links between them and ask a program to find a small example where a rule is broken. For example, the rule “an employee has exactly one boss”: the program finds an example where one employee has two bosses at once. It suits checking the structure of data and access rights. Like TLA+, it uses a mathematical notation. The language was created in the Software Design Group at MIT.',
        },
        match: { ru: ['Alloy'], en: ['Alloy'] },
        related: ['tla-plus', 'quint', 'model-checking'],
        source: { url: 'https://alloytools.org/', label: { ru: 'alloytools.org — сайт Alloy', en: 'alloytools.org, the Alloy site' } },
      },
      {
        slug: 'tlc',
        name: { ru: 'TLC', en: 'TLC' },
        aka: { ru: 'первая программа проверки TLA+', en: 'the first TLA+ checker' },
        def: {
          ru: 'Первая программа, которая проверяет модели на TLA+. Она перебирает все состояния модели по одному и для каждого проверяет правила, помня, где уже была. Поэтому её работа предсказуема, но мир модели должен быть небольшим: иначе состояний слишком много. Модели на Quint тоже можно проверять в TLC, но сначала их нужно перевести в запись для этой программы.',
          en: 'The first program that checks TLA+ models. It goes through all states of a model one by one and checks the rules in each, remembering where it has been. So its work is predictable, but the world of the model must be small: otherwise there are too many states. Quint models can be checked in TLC too, but they first have to be translated into a form this program accepts.',
        },
        match: { ru: ['TLC'], en: ['TLC'] },
        related: ['tla-plus', 'quint', 'apalache', 'model-checking'],
        source: { url: 'https://github.com/tlaplus/tlaplus', label: { ru: 'TLA+ Tools и TLC на GitHub', en: 'TLA+ Tools and TLC on GitHub' } },
      },
      {
        slug: 'apalache',
        name: { ru: 'Apalache', en: 'Apalache' },
        aka: { ru: 'символьная проверка моделей', en: 'a symbolic model checker' },
        def: {
          ru: 'Программа, которая проверяет модели на TLA+ и на Quint. Она переводит их в набор условий и отдаёт SMT-решателю, например Z3: тот рассуждает сразу обо всех исполнениях до заданной длины. Выдаёт цепочку шагов, где правило нарушается.',
          en: 'A program that checks models written in TLA+ and Quint. It turns them into a set of conditions and hands them to an SMT solver, for example Z3, which reasons about all executions up to a given length at once. It outputs the chain of steps where a rule breaks.',
        },
        match: { ru: ['Apalache'], en: ['Apalache'] },
        related: ['quint', 'tla-plus', 'tlc', 'model-checking', 'smt-solver', 'z3'],
        source: { url: 'https://apalache-mc.org/', label: { ru: 'apalache-mc.org — сайт Apalache', en: 'apalache-mc.org, the Apalache site' } },
      },
      {
        slug: 'z3',
        name: { ru: 'Z3', en: 'Z3' },
        aka: { ru: 'SMT-решатель от Microsoft Research', en: 'an SMT solver from Microsoft Research' },
        def: {
          ru: 'Самый известный SMT-решатель: программа подбирает значения под заданные условия. Например, на условия «x плюс y равно десяти, x минус y равно двум» она отвечает «x равен шести, y равен четырём» или доказывает, что решений нет. Apalache отдаёт Z3 условия, полученные из модели, и по ответу строит цепочку шагов до нарушения правила.',
          en: 'The best-known SMT solver: a program that picks values for given conditions. For example, for “x plus y equals ten, x minus y equals two” it answers “x is six, y is four”, or proves that no solution exists. Apalache gives Z3 the conditions obtained from a model and builds the chain of steps to the rule violation from its answer.',
        },
        match: { ru: ['Z3'], en: ['Z3'] },
        related: ['smt-solver', 'apalache', 'model-checking'],
        source: { url: 'https://github.com/Z3Prover/z3', label: { ru: 'Z3 — репозиторий на GitHub', en: 'Z3, the GitHub repository' } },
      },
      {
        slug: 'smt-solver',
        name: { ru: 'SMT-решатель', en: 'SMT solver' },
        aka: { ru: 'например, Z3', en: 'for example, Z3' },
        def: {
          ru: 'Программа, которая по набору условий вроде «сумма больше десяти, а счёт не отрицательный» сама находит значения, при которых все условия выполняются, или доказывает, что таких значений нет. Перебирать всё подряд ей не нужно: она рассуждает о целых классах случаев сразу. Самый известный решатель Z3 создала Microsoft Research. Движок Apalache переводит модель в такие условия и отдаёт их решателю.',
          en: 'A program that, given a set of conditions such as “the sum is greater than ten and the balance is not negative”, finds values for which all conditions hold, or proves that no such values exist. It does not have to try everything one by one: it reasons about whole classes of cases at once. The best-known solver, Z3, was created by Microsoft Research. The Apalache engine turns a model into such conditions and hands them to a solver.',
        },
        match: { ru: ['SMT-решател\\p{L}*'], en: ['SMT solvers?'] },
        related: ['z3', 'apalache', 'model-checking', 'quint'],
        source: { url: 'https://github.com/Z3Prover/z3', label: { ru: 'Z3 — репозиторий решателя на GitHub', en: 'Z3, the solver repository on GitHub' } },
      },
      {
        slug: 'model-checking',
        name: { ru: 'Проверка моделей', en: 'Model checking' },
        aka: { ru: 'model checking', en: 'automatic state exploration' },
        def: {
          ru: 'Метод, при котором программа автоматически обходит состояния описанной системы и проверяет, что в каждом из них правила соблюдены. Если правило нарушается, метод выдаёт точную цепочку шагов, которой это достигается. Например, модель магазина находит ход «оплата, сбой связи», после которого деньги списаны, а заказа нет: покупатель заплатил и ничего не получил. В отличие от теста, метод не ограничен сценариями, которые придумал человек, но ограничен размером выбранного мира.',
          en: 'A method in which a program automatically walks the states of a described system and checks that the rules hold in each of them. If a rule breaks, the method outputs the exact chain of steps that leads there. For example, a shop model finds the move “payment, connection lost” after which the money is charged but there is no order: the buyer paid and got nothing. Unlike a test, the method is not limited to scenarios a person thought of, but it is limited by the size of the chosen world.',
        },
        match: { ru: ['проверк\\p{L}* моделей', 'model checking', 'формальн\\p{L}* модел\\p{L}*'], en: ['model checking', 'formal models?'] },
        related: ['quint', 'invariant', 'apalache', 'mutation-testing'],
        more: { post: 'quint-models-find-races', label: { ru: 'Как найти гонки и потерянные данные моделями на Quint', en: 'Finding races and lost data with Quint models' } },
        source: { url: 'https://en.wikipedia.org/wiki/Model_checking', label: { ru: 'Википедия: проверка моделей', en: 'Wikipedia: Model checking' } },
      },
      {
        slug: 'invariant',
        name: { ru: 'Инвариант', en: 'Invariant' },
        aka: { ru: 'правило «всегда верно»', en: 'an “always true” rule' },
        def: {
          ru: 'Условие, которое должно выполняться в каждом состоянии системы, в каком бы порядке ни шли действия. Например, в магазине деньги никогда не списаны без заказа, а в расшифровщике встреч приватная запись никогда не попадает в общее хранилище. Проверка моделей ищет цепочку шагов, после которой инвариант нарушается.',
          en: 'A condition that must hold in every state of the system, in whatever order actions come. For example, in a shop money is never charged without an order, and in a meeting transcriber a private recording never reaches shared storage. Model checking looks for a chain of steps after which the invariant breaks.',
        },
        match: { ru: ['инвариант\\p{L}*'], en: ['invariants?'] },
        related: ['model-checking', 'quint', 'rfc-2119'],
        source: { url: 'https://en.wikipedia.org/wiki/Invariant_(computer_science)', label: { ru: 'Википедия: инвариант в программировании', en: 'Wikipedia: Invariant (computer science)' } },
      },
      {
        slug: 'race-condition',
        name: { ru: 'Гонка', en: 'Race condition' },
        aka: { ru: 'состояние гонки', en: 'a race' },
        def: {
          ru: 'Ошибка, при которой результат зависит от того, какое из двух действий успело раньше. Каждое действие по отдельности работает верно, а вместе они дают потерю или путаницу данных. Классический случай: условие проверили один раз, а к моменту действия оно уже изменилось. Лечат повторной проверкой в момент действия или общим замком.',
          en: 'A defect in which the result depends on which of two actions got there first. Each action works correctly on its own, but together they cause a loss or a mix-up of data. The classic case: a condition is checked once, and by the time of the action it has already changed. It is cured by rechecking at the moment of the action or by a shared lock.',
        },
        match: { ru: ['состояни\\p{L}* гонки', 'гонк\\p{L}* входа', 'race conditions?'], en: ['race conditions?', 'races'] },
        related: ['model-checking', 'invariant', 'quint'],
        more: { post: 'quint-models-find-races', label: { ru: 'Какие гонки нашли модели на Quint', en: 'The races found by Quint models' } },
        source: { url: 'https://en.wikipedia.org/wiki/Race_condition', label: { ru: 'Википедия: состояние гонки', en: 'Wikipedia: Race condition' } },
      },
    ],
  },
  {
    slug: 'models',
    icon: 'prompts',
    name: { ru: 'Модель и промпты', en: 'Model and prompts' },
    hint: { ru: 'Как модель читает запрос и ошибается', en: 'How a model reads a request and errs' },
    terms: [
      {
        slug: 'prompt',
        name: { ru: 'Промпт', en: 'Prompt' },
        def: {
          ru: 'Запрос к модели: задача, контекст, формат ответа и ограничения. Чем точнее собраны эти части, тем меньше правок после первого ответа.',
          en: 'A request to a model: task, context, answer format and constraints. The more precisely these parts are put together, the fewer edits follow the first answer.',
        },
        match: { ru: ['промпт\\p{L}*'], en: ['prompts?'] },
        related: ['context', 'token', 'hallucination'],
        source: { url: 'https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview', label: { ru: 'Anthropic: промпт-инжиниринг', en: 'Anthropic: Prompt engineering' } },
      },
      {
        slug: 'source',
        name: { ru: 'Источник', en: 'Source' },
        def: {
          ru: 'Система или документ, где лежит исходный факт: заявка, таблица, запись встречи. Ответ агента надёжен настолько, насколько его можно сверить с источником, поэтому у каждого утверждения в ответе стоит ссылка на источник.',
          en: 'The system or document where the original fact lives: a ticket, a sheet, a meeting record. An agent’s answer is as reliable as it can be checked against its source, so every claim in the answer carries a link to its source.',
        },
        match: { ru: ['источник\\p{L}*'], en: ['sources?(?! code)'] },
        related: ['epimorphism', 'hallucination', 'context'],
      },
      {
        slug: 'hallucination',
        name: { ru: 'Галлюцинация', en: 'Hallucination' },
        aka: { ru: 'галлюцинации LLM, галлюцинации ИИ, галлюцинации нейросети', en: 'LLM hallucination, AI hallucination' },
        def: {
          ru: 'Галлюцинация LLM — уверенный, но выдуманный ответ большой языковой модели: несуществующий факт, функция или ссылка. Появляется там, где у части ответа нет опоры в данных, и модель заполняет пустое место правдоподобной догадкой. Обратный случай, когда опора есть у каждой части ответа, называют эпиморфизмом. Снижают её данными из надёжных источников и проверкой результата.',
          en: 'An LLM hallucination is a confident but invented answer from a model: a nonexistent fact, function or link. It appears where part of the answer has no support in the data, and the model fills the empty spot with a plausible guess. The opposite case, where every part of the answer has support, is called an epimorphism. It is reduced by grounding in reliable sources and by checking the result.',
        },
        match: { ru: ['галлюцинаци\\p{L}*', 'галлюцинир\\p{L}*'], en: ['hallucinat\\p{L}*'] },
        related: ['epimorphism', 'source', 'prompt', 'llm', 'checks'],
        source: { url: 'https://en.wikipedia.org/wiki/Hallucination_(artificial_intelligence)', label: { ru: 'Википедия: галлюцинации ИИ', en: 'Wikipedia: AI hallucination' } },
        seo: {
          title: { ru: 'Галлюцинации LLM: что это и примеры галлюцинаций ИИ — в коде, пакетах и ссылках', en: 'LLM hallucination: meaning, examples and grounding in sources' },
          description: {
            ru: 'Что такое галлюцинации больших языковых моделей (LLM) и примеры галлюцинаций ИИ в работе агента: выдуманная функция, несуществующий пакет, ссылка в никуда. Почему они возникают и как их снижают опорой на источники и проверками.',
            en: 'What an LLM hallucination means, with examples from coding agents: an invented function, a nonexistent package, a dead link. Why it happens, how grounding in sources reduces it, and how checks detect it.',
          },
        },
        notes: {
          title: { ru: 'Примеры галлюцинаций и как их снижать', en: 'Hallucination examples and how to reduce them' },
          items: [
            { name: { ru: 'Выдуманная функция', en: 'An invented function' }, text: { ru: 'агент вызывает метод, которого нет в библиотеке, или параметр, которого нет у функции. Код выглядит правдоподобно и падает при запуске.', en: 'the agent calls a method the library does not have, or a parameter the function does not take. The code looks plausible and fails when run.' } },
            { name: { ru: 'Несуществующий пакет', en: 'A nonexistent package' }, text: { ru: 'агент предлагает поставить пакет, которого нет в npm или PyPI. Модели часто повторяют одни и те же выдуманные имена, и злоумышленники регистрируют пакеты с такими именами, чтобы подсунуть свой код (slopsquatting).', en: 'the agent suggests installing a package that does not exist on npm or PyPI. Models often repeat the same invented names, and attackers register packages under them to slip in their code (slopsquatting).' } },
            { name: { ru: 'Ссылка в никуда', en: 'A dead link' }, text: { ru: 'ссылка на статью, документацию или раздел, которых не существует.', en: 'a link to an article, doc or section that does not exist.' } },
            { name: { ru: '«Готово», а изменений нет', en: '“Done” with no changes' }, text: { ru: 'агент отчитывается о сделанной работе, которой не было.', en: 'the agent reports work it did not do.' } },
            { name: { ru: 'Как снижать', en: 'How to reduce it' }, text: { ru: 'дать модели источники и контекст и требовать ссылку на опору для каждого утверждения (это и есть эпиморфизм); в промпте разрешить ответ «не знаю».', en: 'ground the model: give it sources and context and require a supporting reference for each claim (that is an epimorphism); allow “I don’t know” in the prompt.' } },
            { name: { ru: 'Как ловить', en: 'How to detect it' }, text: { ru: 'проверками: тесты, сборка и линтер ловят выдуманный код, установка из списка разрешённых пакетов — выдуманные пакеты, переход по ссылкам — выдуманные источники.', en: 'with checks: tests, builds and linters catch invented code, an allow-list of packages catches invented packages, following links catches invented sources.' } },
          ],
        },
      },
      {
        slug: 'context',
        name: { ru: 'Контекст', en: 'Context' },
        def: {
          ru: 'Всё, что модель видит в данный момент: диалог, файлы проекта и данные подключённых систем. Чего нет в контексте, того агент не знает.',
          en: 'Everything the model sees at the moment: the conversation, project files and data from connected systems. What is not in context, the agent does not know.',
        },
        match: { ru: ['контекст\\p{L}*'], en: ['contexts?'] },
        related: ['token', 'prompt', 'source', 'mcp'],
        source: { url: 'https://platform.claude.com/docs/en/build-with-claude/context-windows', label: { ru: 'Anthropic: контекстное окно', en: 'Anthropic: Context windows' } },
      },
      {
        slug: 'token',
        name: { ru: 'Токен', en: 'Token' },
        def: {
          ru: 'Единица текста, которую считает LLM: примерно слог или короткое слово. От числа токенов зависят цена запроса и то, сколько поместится в контекст.',
          en: 'A unit of text an LLM counts: roughly a syllable or a short word. The token count sets the price of a request and how much fits into context.',
        },
        match: { ru: ['токен\\p{L}*'], en: ['tokens?'] },
        related: ['context', 'llm', 'prompt'],
        source: { url: 'https://platform.claude.com/docs/en/build-with-claude/token-counting', label: { ru: 'Anthropic: подсчёт токенов', en: 'Anthropic: Token counting' } },
      },
    ],
  },
]

export const ALL_TERMS: Term[] = TERM_SETS.flatMap((s) => s.terms)
export const findTerm = (slug: string | undefined): Term | undefined => ALL_TERMS.find((t) => t.slug === slug)
export const setOfTerm = (slug: string): TermSet => TERM_SETS.find((s) => s.terms.some((t) => t.slug === slug))!
export const glossaryPath = (slug?: string) => `/materials/glossary${slug ? `/${slug}` : ''}`
export const termHref = (slug: string, lang: Lang) => withSlash(withLang(glossaryPath(slug), lang))

/** Текст без разметки кода — для подсказок и мета-описаний */
export const noCode = (s: string) => s.replace(/`/g, '')

// Первое предложение определения — подпись в карточках и подсказка у ссылки в тексте
export const termShort = (t: Term, lang: Lang): string => {
  const d = t.def[lang]
  const m = d.match(/^.*?[.!?](?=\s|$)/)
  return m ? m[0] : d
}

// Одно регулярное выражение на язык: длинные варианты раньше коротких («Harness engineering» раньше «harness»)
// Длина шаблона без проверок вокруг ((?<!…), (?=…) и т. п.): иначе короткий «AI» с длинной проверкой встаёт раньше «AI agent»
const coreLength = (src: string) => {
  let out = '', i = 0
  while (i < src.length) {
    if (src.startsWith('(?<!', i) || src.startsWith('(?<=', i) || src.startsWith('(?!', i) || src.startsWith('(?=', i)) {
      let depth = 0
      for (; i < src.length; i++) { if (src[i] === '\\') { i++; continue } if (src[i] === '(') depth++; else if (src[i] === ')' && --depth === 0) { i++; break } }
      continue
    }
    out += src[i++]
  }
  return out.length
}
const alternatives = (lang: Lang) =>
  ALL_TERMS.flatMap((t) => t.match[lang].map((src) => ({ slug: t.slug, src })))
    .sort((a, b) => coreLength(b.src) - coreLength(a.src))
const matchers: Partial<Record<Lang, { re: RegExp; slugs: string[] }>> = {}
function matcher(lang: Lang) {
  if (!matchers[lang]) {
    const alts = alternatives(lang)
    // границы слова с учётом кириллицы и точек в именах файлов: перед — не буква/цифра/дефис, после — то же
    matchers[lang] = {
      re: new RegExp(`(?<![\\p{L}\\p{N}_.-])(?:${alts.map((a, i) => `(?<t${i}>${a.src})`).join('|')})(?![\\p{L}\\p{N}_-]|\\.(?=\\p{L}))`, 'giu'),
      slugs: alts.map((a) => a.slug),
    }
  }
  return matchers[lang]!
}

const SKIP = new Set(['a', 'blockquote', 'code', 'pre', 'svg', 'script', 'style', 'button', 'summary', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'figcaption', 'textarea', 'kbd', 'label'])
const VOID = new Set(['br', 'hr', 'img', 'input', 'meta', 'link', 'source', 'wbr', 'path', 'rect', 'circle', 'line'])

/** Превращает первое вхождение каждого термина в тексте статьи в ссылку на страницу термина. Вернёт html и найденные термины. */
export function linkTerms(html: string, lang: Lang, ignore: string[] = [], perSection = false): { html: string; found: string[] } {
  const { re, slugs } = matcher(lang)
  const found: string[] = []
  let seen = new Set(ignore)
  let skip = 0
  const out = html.split(/(<[^>]*>)/).map((part) => {
    if (part.startsWith('<')) {
      if (perSection && /^<section[\s>]/i.test(part)) seen = new Set(ignore)
      const tag = /^<(\/?)([a-zA-Z][a-zA-Z0-9]*)/.exec(part)
      if (tag && SKIP.has(tag[2].toLowerCase())) {
        if (tag[1]) skip = Math.max(0, skip - 1)
        else if (!part.endsWith('/>') && !VOID.has(tag[2].toLowerCase())) skip++
      }
      return part
    }
    if (skip > 0 || !part.trim()) return part
    re.lastIndex = 0
    return part.replace(re, (...args) => {
      const groups = args[args.length - 1] as Record<string, string>
      const text = args[0] as string
      const slug = resolveSlug(slugs.find((_, i) => groups[`t${i}`] !== undefined) ?? '', text)
      if (!slug || seen.has(slug)) return text
      const term = findTerm(slug)!
      seen.add(slug)
      if (!found.includes(slug)) found.push(slug)
      return `<a class="s-term" href="${termHref(slug, lang)}" title="${noCode(termShort(term, lang)).replace(/"/g, '&quot;')}">${text}</a>`
    })
  }).join('')
  return { html: out, found }
}

// У терминов с `exact` регистр важен: если найденный фрагмент отличается от exact, ищем термин, у которого exact совпал (React ↔ ReAct), иначе фрагмент не термин
function resolveSlug(slug: string, text: string): string {
  const ex = findTerm(slug)?.exact
  if (!ex || text === ex) return slug
  return ALL_TERMS.find((t) => t.exact === text)?.slug ?? ''
}

/** Режет обычный текст на куски: первое вхождение каждого другого термина помечено слагом (для ссылок между терминами) */
export function splitTerms(text: string, lang: Lang, ignore: string[] = []): { text: string; slug?: string }[] {
  const { re, slugs } = matcher(lang)
  const seen = new Set(ignore)
  const out: { text: string; slug?: string }[] = []
  let last = 0
  re.lastIndex = 0
  for (const m of text.matchAll(re)) {
    const groups = m.groups ?? {}
    const slug = resolveSlug(slugs.find((_, i) => groups[`t${i}`] !== undefined) ?? '', m[0])
    if (!slug || seen.has(slug)) continue
    seen.add(slug)
    if (m.index! > last) out.push({ text: text.slice(last, m.index) })
    out.push({ text: m[0], slug })
    last = m.index! + m[0].length
  }
  if (last < text.length) out.push({ text: text.slice(last) })
  return out
}

// Статьи, где встречается термин: считаем по тексту без вёрстки (SVG и код не в счёт)
const plain = (html: string) => html.replace(/<(svg|pre|script|style)[\s\S]*?<\/\1>/g, ' ').replace(/<[^>]+>/g, ' ')
function hasTerm(slug: string, lang: Lang, text: string): boolean {
  const term = findTerm(slug)!
  const re = new RegExp(`(?<![\\p{L}\\p{N}_.-])(?:${term.match[lang].join('|')})(?![\\p{L}\\p{N}_-]|\\.(?=\\p{L}))`, term.exact ? 'giu' : 'iu')
  if (!term.exact) return re.test(text)
  for (const m of text.matchAll(re)) if (m[0] === term.exact) return true
  return false
}

const cache = new Map<string, Post[]>()
export function postsWithTerm(slug: string, lang: Lang): Post[] {
  const key = `${slug}:${lang}`
  if (!cache.has(key)) {
    cache.set(key, POSTS.filter((p) => p.lang === lang && hasTerm(slug, lang, `${p.title} ${plain(p.html)}`)))
  }
  return cache.get(key)!
}

/** Термин, которому соответствует тег статьи целиком (например «агенты», «MCP», «токены»); тегу без термина вернёт undefined */
export function termForTag(tag: string, lang: Lang): Term | undefined {
  const name = tag.trim()
  return ALL_TERMS.find((x) => x.name[lang].toLowerCase() === name.toLowerCase()
    || x.match[lang].some((src) => new RegExp(`^(?:${src})$`, 'iu').test(name)))
}
/** Термины, которые встречаются в статье (для блока «Термины» под текстом) */
export function termsInPost(post: Post): Term[] {
  return ALL_TERMS.filter((t) => hasTerm(t.slug, post.lang, plain(post.html)))
}

/** Другие статьи с теми же терминами: чем больше общих терминов, тем выше */
export function postsSharingTerms(post: Post, slugs: string[], limit = 4): Post[] {
  const score = new Map<Post, number>()
  for (const slug of slugs) for (const p of postsWithTerm(slug, post.lang)) if (p.slug !== post.slug) score.set(p, (score.get(p) ?? 0) + 1)
  return [...score.entries()].sort((a, b) => b[1] - a[1] || b[0].date.localeCompare(a[0].date)).slice(0, limit).map(([p]) => p)
}
