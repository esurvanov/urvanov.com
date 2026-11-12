import { POSTS, type Post } from '@/data/blog'
import { localHref, tr, withSlash, type L, type Lang } from '@/lib/i18n'

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
  /** Совпадение с учётом регистра: найденный в тексте фрагмент должен начинаться ровно так (Helm, Helm-чартами) (ReAct и React — разные термины, а поиск по `match` не различает регистр) */
  exact?: string
  /** Свой заголовок и описание для поиска вместо шаблонных (описание до ~160 знаков) */
  seo?: { title: L; description: L }
  /** Пояснения к экранам схемы: i-й текст идёт под i-й схемой (основная, затем `slug/2`, `slug/3`…) */
  screens?: L[]
  /** Ссылка «Подробнее» на статью блога: slug поста и подпись */
  more?: { post: string; label: L }
  /** Ещё статьи под нишевые запросы термина — вторичными ссылками рядом с «Подробнее» */
  also?: { post: string; label: L }[]
  /** Состав: список терминов-частей с первой фразой определения */
  parts?: { title: L; slugs: string[] }
  /** Короткие пояснения текстом: заголовок раздела и пункты «название — пара фраз» */
  notes?: { title: L; items: { name: L; text: L }[] }
  /** Частые вопросы под запросы из поиска: карточки «вопрос — ответ» и разметка FAQPage */
  faq?: { q: L; a: L }[]
  /** Внешний первоисточник: стандарт, сайт методологии */
  source?: { url: string; label: L }
  /** Собственный сайт или страница про термин (рядом с источником) */
  site?: { url: string; label: L }
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
        faq: [
          { q: { ru: 'Чем ИИ-агент отличается от чат-бота?', en: 'How is an AI agent different from a chatbot?' }, a: { ru: 'Чат-бот отвечает текстом. ИИ-агент сам выбирает шаги, читает файлы, запускает команды и проверяет результат в вашей среде.', en: 'A chatbot answers with text. An AI agent picks its own steps, reads files, runs commands and checks the result in your environment.' } },
          { q: { ru: 'Как устроен ИИ-агент?', en: 'How is an AI agent built?' }, a: { ru: 'Нейросеть (LLM) работает внутри харнесса: модель думает, а харнесс даёт ей инструменты, права и проверки.', en: 'A neural network (LLM) works inside a harness: the model reasons, and the harness gives it tools, permissions and checks.' } },
        ],
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
        slug: 'human-in-the-loop',
        name: { ru: 'Human-in-the-loop', en: 'Human in the loop' },
        aka: { ru: 'человек в контуре, человек в цикле, HITL', en: 'HITL, human approval' },
        def: {
          ru: 'Human-in-the-loop (HITL; перевод — «человек в контуре», дословно «человек в цикле») — принцип и концепция, по которым агент не завершает работу сам: на важных шагах решение принимает человек. Типичные точки остановки: выдать права, записать в рабочую систему, принять результат. Рядом есть human-on-the-loop: агент идёт без остановок, человек смотрит журнал его действий и может прервать работу.',
          en: 'Human in the loop (HITL) means the agent does not finish on its own: at the important steps it waits for a person’s approval. Typical stopping points: granting permissions, writing to a live system, accepting the result. Next to it is human on the loop: the agent runs without stops, and a person watches its action log and can interrupt the work.',
        },
        match: { ru: ['human-in-the-loop', 'human in the loop', 'человек\\p{L}* в контуре', 'HITL'], en: ['human-in-the-loop', 'human in the loop', 'HITL'] },
        related: ['ai-agent', 'harness', 'permissions', 'test-stand'],
        faq: [
          { q: { ru: 'Human in the loop — что это?', en: 'What is human in the loop?' }, a: { ru: 'Принцип, по которому агент не завершает работу сам: на важных шагах решение принимает человек.', en: 'A principle where the agent does not finish the work on its own: a person makes the decision at key steps.' } },
          { q: { ru: 'Где агент ждёт решения человека?', en: 'Where does the agent wait for a person?' }, a: { ru: 'Обычно перед выдачей прав, записью в рабочую систему и приёмом результата.', en: 'Usually before granting permissions, writing to a live system and accepting the result.' } },
        ],
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
        faq: [
          { q: { ru: 'LLM — что это в IT?', en: 'What does LLM mean in IT?' }, a: { ru: 'Большая языковая модель (large language model): нейросеть, обученная на больших объёмах текста и кода, которая продолжает текст по запросу.', en: 'A large language model: a neural network trained on large amounts of text and code that continues text on request.' } },
          { q: { ru: 'Чем LLM отличается от ИИ-агента?', en: 'How is an LLM different from an AI agent?' }, a: { ru: 'Модель сама только отвечает текстом. Чтобы действовать в вашей среде, ей нужен харнесс, а модель вместе с харнессом и есть агент.', en: 'A model on its own only answers with text. To act in your environment it needs a harness, and the model plus the harness is the agent.' } },
          { q: { ru: 'Как правильно: a LLM или an LLM?', en: 'Is it a LLM or an LLM?' }, a: { ru: 'Пишут an LLM: аббревиатуру читают по буквам, и первая буква звучит как «эл».', en: 'It is an LLM: the abbreviation is read letter by letter, and the first letter sounds like “el”.' } },
        ],
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
          ru: 'IDE — программа, в которой пишут код: редактор, подсказки, отладчик и запуск проекта в одном окне. VS Code и JetBrains — типичные примеры. Агенты встраиваются в IDE расширениями и показывают правки прямо в файлах. IDE с ИИ (AI IDE) — среда, где агент встроен с самого начала, как в Cursor. Тот же агент может работать и без IDE — в терминале (CLI), как Claude Code и Codex.',
          en: 'IDE is the program where code is written: editor, hints, debugger and project launcher in one window. VS Code and JetBrains are typical examples. Agents plug into an IDE through extensions and show edits right in the files. An AI IDE (AI-native IDE) is one where the agent is built in from the start, as in Cursor, a VS Code fork. The alternative is a CLI agent in the terminal, like Claude Code and Codex.',
        },
        match: { ru: ['IDE'], en: ['IDEs?'] },
        related: ['vs-code', 'jetbrains', 'terminal', 'cursor', 'claude-code'],
        faq: [
          { q: { ru: 'IDE — что это в программировании?', en: 'What is an IDE in programming?' }, a: { ru: 'Программа, в которой пишут код: редактор, подсказки, отладчик и запуск проекта в одном окне. Примеры — VS Code и JetBrains.', en: 'The program where code is written: editor, hints, debugger and project launcher in one window. Examples are VS Code and JetBrains.' } },
          { q: { ru: 'Что такое AI IDE?', en: 'What is an AI IDE?' }, a: { ru: 'Среда, где ИИ-агент встроен с самого начала, как в Cursor.', en: 'An environment with an AI agent built in from the start, like Cursor.' } },
        ],
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
        faq: [
          { q: { ru: 'Какие ИИ-агенты работают в VS Code?', en: 'Which AI agents work in VS Code?' }, a: { ru: 'GitHub Copilot, Claude Code, Codex, Cline и другие: они ставятся как расширения.', en: 'GitHub Copilot, Claude Code, Codex, Cline and others: they install as extensions.' } },
          { q: { ru: 'Чем VS Code отличается от Cursor?', en: 'How is VS Code different from Cursor?' }, a: { ru: 'Cursor сделан на основе VS Code и в нём агент встроен с самого начала. В VS Code агента добавляют расширением.', en: 'Cursor is built on VS Code with the agent built in from the start. In VS Code an agent is added as an extension.' } },
        ],
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
            { name: { ru: 'Visual Studio', en: 'Visual Studio' }, text: { ru: 'отдельная среда разработки Microsoft, не путать с VS Code; в ней тот же GitHub Copilot с режимом агента, на бесплатном тарифе — с месячным лимитом.', en: 'a separate Microsoft IDE, not VS Code; it has the same GitHub Copilot with agent mode, with a monthly limit on the free plan.' } },
          ],
        },
      },
      {
        slug: 'terminal',
        name: { ru: 'Терминал', en: 'Terminal' },
        aka: { ru: 'командная строка, CLI, интерфейс командной строки', en: 'command line, CLI' },
        def: {
          ru: 'Терминал — окно, где команды вводят текстом; по-английски это CLI — интерфейс командной строки. CLI-агент работает прямо в терминале: видит те же файлы и программы, что и вы, и запускает их сам — тесты, сборку, git. Например, Claude Code и Codex CLI, а бесплатный открытый — OpenCode. Доступ ограничивают правилами разрешений.',
          en: 'A terminal is a window where commands are typed as text, also called the CLI (command-line interface). An AI CLI agent works right in the terminal: it sees the same files and programs you do and runs them itself — tests, builds, git. Examples are Claude Code and Codex CLI, and a free open-source one is OpenCode. Access is limited by permission rules.',
        },
        match: { ru: ['терминал\\p{L}*', 'командн\\p{L}* строк\\p{L}*'], en: ['terminals?', 'command line'] },
        related: ['ide', 'claude-code', 'codex', 'hermes-agent', 'permissions'],
        faq: [
          { q: { ru: 'CLI — что это?', en: 'What is a CLI?' }, a: { ru: 'Интерфейс командной строки: окно, где команды вводят текстом. Так называют и терминал.', en: 'A command-line interface: a window where commands are typed as text. The terminal is the same thing.' } },
          { q: { ru: 'Какие бывают CLI-агенты?', en: 'Which CLI agents exist?' }, a: { ru: 'Claude Code и Codex CLI, а бесплатный открытый — OpenCode. Они работают прямо в терминале и сами запускают тесты, сборку и git.', en: 'Claude Code and Codex CLI, and a free open-source one is OpenCode. They work right in the terminal and run tests, builds and git themselves.' } },
        ],
        source: { url: 'https://en.wikipedia.org/wiki/Command-line_interface', label: { ru: 'Википедия: командная строка', en: 'Wikipedia: Command-line interface' } },
        seo: {
          title: { ru: 'Терминал и CLI: что это и какие бывают CLI-агенты, в том числе бесплатные — Claude Code, Codex CLI, OpenCode', en: 'AI agent CLI: what the terminal is and which coding agents run in it (Claude Code, Codex CLI, OpenCode)' },
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
          ru: 'Tool (инструмент) — действие, которое агент может вызвать: прочитать файл, найти заявку в Jira, выполнить запрос к базе. MCP — открытый способ подключить к агенту готовые наборы инструментов внешних систем. Набор инструментов (тулов) задаёт, что агент умеет и что ему доступно. Вызов инструмента (tool calling, function calling) устроен так: модель возвращает имя функции и параметры, например `search_jira` с запросом «вход»; харнесс выполняет вызов и передаёт результат обратно модели.',
          en: 'A tool is an action the agent can call: read a file, find a ticket in Jira, run a database query. MCP is an open way to plug ready-made tool sets of outside systems into an agent. The set of tools defines what the agent can do and what it can reach. Tool calling (function calling) works like this: the model returns a function name and arguments, for example `search_jira` with the query “login”; the harness runs the call and passes the result back to the model.',
        },
        match: { ru: ['инструмент\\p{L}*', 'тул(?:ы|ов|ам|ами|ах|а|у|ом|е)?(?!\\p{L})', 'tool calling', 'function calling'], en: ['tools?', 'tool calling', 'tool use', 'function calling'] },
        related: ['ai-agent', 'mcp', 'permissions', 'harness', 'llm'],
        faq: [
          { q: { ru: 'Что такое tool calling?', en: 'What is tool calling?' }, a: { ru: 'Вызов инструмента: модель возвращает имя функции и параметры, харнесс выполняет вызов и передаёт результат обратно модели.', en: 'Calling a tool: the model returns a function name and parameters, the harness runs the call and passes the result back to the model.' } },
          { q: { ru: 'Чем MCP отличается от tool calling?', en: 'How is MCP different from tool calling?' }, a: { ru: 'Tool calling — способ, которым модель вызывает действие. MCP — открытый протокол, по которому к агенту подключают готовые наборы инструментов внешних систем.', en: 'Tool calling is how a model calls an action. MCP is an open protocol for plugging ready-made tool sets of outside systems into an agent.' } },
        ],
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
          ru: 'Облачный ИИ-агент — ИИ-агент, который выполняет задачу на удалённом сервере в изолированной среде с копией вашего репозитория. От локального агента отличается тем, что ваш компьютер не нужен: задачу ставят с телефона в приложении или браузере и закрывают ноутбук. Результат придёт готовой веткой или запросом на слияние. Так работают Codex в облаке, Claude Code в вебе и облачные агенты Cursor.',
          en: 'A cloud coding agent is an AI agent that runs a task on a remote server in an isolated environment with a copy of your repo. Unlike a local agent it does not need your computer: you set the task from a phone in the app or the browser and close the laptop. The result arrives as a ready branch or pull request. Codex cloud, Claude Code on the web and Cursor cloud agents work this way.',
        },
        match: { ru: ['облачн\\p{L}* (?:ИИ-)?агент\\p{L}*', 'фонов\\p{L}* агент\\p{L}*', 'в облаке'], en: ['cloud (?:coding )?agents?', 'background agents?', 'in the cloud'] },
        related: ['ai-agent', 'sandbox', 'codex', 'claude-code', 'cursor'],
        faq: [
          { q: { ru: 'Облачный агент — что это?', en: 'What is a cloud agent?' }, a: { ru: 'ИИ-агент, который выполняет задачу на удалённом сервере с копией вашего репозитория и присылает готовую ветку или запрос на слияние.', en: 'An AI agent that runs a task on a remote server with a copy of your repository and sends back a ready branch or pull request.' } },
          { q: { ru: 'Чем облачный агент отличается от локального?', en: 'How is a cloud agent different from a local one?' }, a: { ru: 'Облачному не нужен ваш компьютер: задачу можно поставить с телефона и закрыть ноутбук. Локальный работает, пока включён компьютер, но видит ваши файлы и программы.', en: 'A cloud agent does not need your computer: you can set a task from a phone and close the laptop. A local one runs while the computer is on, but sees your files and programs.' } },
          { q: { ru: 'Какие есть облачные агенты?', en: 'Which cloud agents exist?' }, a: { ru: 'Codex в облаке, Claude Code в вебе и облачные агенты Cursor.', en: 'Codex cloud, Claude Code on the web and Cursor cloud agents.' } },
        ],
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
          ru: 'Песочница — огороженное место, где выполняются действия агента: там видны только разрешённые папки, а в сеть можно только на разрешённые адреса. Если агент ошибётся или его обманут, ущерб останется внутри. В одних продуктах ограждены только команды терминала, в других агент целиком работает в контейнере или виртуальной машине.',
          en: 'A sandbox is a fenced place where an agent’s actions run: only allowed folders are visible and only allowed network hosts are reachable. If the agent errs or is tricked, the damage stays inside. Some products fence only terminal commands, others run the whole agent inside a container or a virtual machine.',
        },
        match: { ru: ['песочниц\\p{L}*'], en: ['sandbox\\p{L}*'] },
        related: ['cloud-agent', 'human-in-the-loop', 'prompt-injection'],
        faq: [
          { q: { ru: 'Песочница для ИИ-агента — что это?', en: 'What is a sandbox for an AI agent?' }, a: { ru: 'Огороженное место, где выполняются действия агента: видны только разрешённые папки, а в сеть можно только на разрешённые адреса.', en: 'A fenced place where the agent’s actions run: only allowed folders are visible and only allowed network hosts are reachable.' } },
          { q: { ru: 'Зачем агенту песочница?', en: 'Why does an agent need a sandbox?' }, a: { ru: 'Если агент ошибётся или его обманут, ущерб останется внутри песочницы.', en: 'If the agent makes a mistake or is tricked, the damage stays inside the sandbox.' } },
        ],
        source: { url: 'https://code.claude.com/docs/en/sandboxing', label: { ru: 'Claude Code: песочница', en: 'Claude Code sandboxing docs' } },
      },
      {
        slug: 'subagent',
        name: { ru: 'Субагент', en: 'Subagent' },
        def: {
          ru: 'Субагент — помощник, которого главный агент запускает на отдельную часть работы, например поиск по коду или ревью. У него свой чистый контекст, а в основной разговор он возвращает только итог.',
          en: 'A subagent is a helper the main agent launches for a separate piece of work, such as a code search or a review. It has its own clean context and returns only the result to the main conversation.',
        },
        match: { ru: ['субагент\\p{L}*'], en: ['subagents?', 'sub-agents?'] },
        related: ['ai-agent', 'context', 'claude-code'],
        faq: [
          { q: { ru: 'Субагент — это что?', en: 'What is a subagent?' }, a: { ru: 'Помощник, которого главный агент запускает на отдельную часть работы, например поиск по коду или ревью.', en: 'A helper the main agent launches for a separate part of the work, such as code search or review.' } },
          { q: { ru: 'Зачем нужны субагенты?', en: 'Why use subagents?' }, a: { ru: 'У субагента свой чистый контекст, а в основной разговор он возвращает только итог, поэтому главный агент не засоряет свой контекст.', en: 'A subagent has its own clean context and returns only the result to the main conversation, so the main agent keeps its context clear.' } },
        ],
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
          ru: 'Claude Code — агент для программирования от Anthropic: читает проект, правит файлы, запускает команды и тесты, работает с git. От Claude в чате отличается доступом к проекту: чат отвечает текстом, а Claude Code сам меняет файлы и запускает команды. Работает в терминале (CLI), в VS Code и JetBrains, в приложении для компьютера и в браузере — везде это один и тот же агент. Своей нейросети у него нет: работает на моделях Claude (Fable, Opus, Sonnet, Haiku), модель меняют командой `/model`. Правила проекта читает из `CLAUDE.md`, повторяющиеся процессы держит в скиллах, внешние системы подключает через MCP. Ближайшие аналоги — Codex и Cursor.',
          en: 'Claude Code is a coding agent from Anthropic: it reads the project, edits files, runs commands and tests, and works with git. Unlike Claude in a chat it has access to the project: the chat answers with text, while Claude Code changes files and runs commands itself. It runs in the terminal (CLI), in VS Code and JetBrains, in the desktop app and in the browser, and it is the same agent everywhere. It has no model of its own: it runs on Claude models (Fable, Opus, Sonnet, Haiku); you switch the model with `/model`. It reads project rules from `CLAUDE.md`, keeps repeatable processes in skills and connects outside systems through MCP. Its closest alternatives are Codex and Cursor.',
        },
        match: { ru: ['Claude Code', 'Клод Код\\p{L}*'], en: ['Claude Code'] },
        related: ['ai-agent', 'claude-md', 'mcp', 'agent-skills', 'session'],
        faq: [
          { q: { ru: 'Чем Claude отличается от Claude Code?', en: 'How is Claude different from Claude Code?' }, a: { ru: 'Claude в чате отвечает текстом. Claude Code — агент для кода: сам читает проект, правит файлы, запускает команды и тесты.', en: 'Claude in a chat answers with text. Claude Code is a coding agent: it reads the project, edits files and runs commands and tests itself.' } },
          { q: { ru: 'Где работает Claude Code?', en: 'Where does Claude Code run?' }, a: { ru: 'В терминале, в VS Code и JetBrains, в приложении для компьютера и в браузере. Везде это один и тот же агент.', en: 'In the terminal, in VS Code and JetBrains, in the desktop app and in the browser. It is the same agent everywhere.' } },
          { q: { ru: 'На каких моделях работает Claude Code?', en: 'Which models does Claude Code use?' }, a: { ru: 'На моделях Claude: Fable, Opus, Sonnet и Haiku. Модель меняют командой /model.', en: 'On Claude models: Fable, Opus, Sonnet and Haiku. You switch the model with the /model command.' } },
        ],
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
            { ru: ['Оплата', 'подписка Claude', 'та же подписка Claude (Pro, Max, Ultra, Team, Enterprise) или оплата по API'], en: ['Pricing', 'a Claude plan', 'the same Claude plan (Pro, Max, Ultra, Team, Enterprise) or pay-as-you-go API'] },
          ],
        },
        matrix: CODING_MATRIX,
      },
      {
        slug: 'clauding',
        name: { ru: 'Clauding', en: 'Clauding' },
        aka: { ru: 'клодинг, клодить', en: 'working with Claude' },
        def: {
          ru: 'Clauding — неформальное слово для работы с Claude или через Claude: человек пишет задачу, смотрит результат и уточняет, пока не получит нужное. По образцу глагола «гуглить»: Google возвращает ссылки, Claude возвращает готовую работу, которую человек проверяет. Слово берёт имя из Claude, но подходит к любому ИИ-помощнику, как «погугли» говорят и тому, кто ищет в Яндексе. Пример: вместо того чтобы самому писать письмо клиенту, вы поручаете его Claude, правите две фразы и отправляете.',
          en: 'Clauding is an informal word for working with or through Claude: a person writes the task, reviews the result and refines it until it is right. It follows the verb “to google”: Google returns links, Claude returns finished work that the person checks. The word takes its name from Claude but fits any AI assistant, the way “google it” is said even to someone searching in Bing or Yandex. Example: instead of writing a client email yourself, you hand it to Claude, fix two phrases and send it.',
        },
        match: { ru: ['clauding\\p{L}*', 'клодинг\\p{L}*'], en: ['clauding'] },
        related: ['claude-code', 'ai-agent', 'human-in-the-loop'],
        faq: [
          { q: { ru: 'Clauding — что это значит?', en: 'What does clauding mean?' }, a: { ru: 'Неформальное слово для работы с Claude: человек пишет задачу, смотрит результат и уточняет, пока не получит нужное.', en: 'An informal word for working with Claude: a person writes a task, looks at the result and refines it until they get what they need.' } },
          { q: { ru: 'Откуда слово clauding?', en: 'Where does the word clauding come from?' }, a: { ru: 'По образцу глагола «гуглить»: Google возвращает ссылки, Claude возвращает готовую работу.', en: 'It follows the pattern of “to google”: Google returns links, Claude returns finished work.' } },
        ],
        source: { url: 'https://explainx.ai/dictionary/clauding', label: { ru: 'explainx.ai: словарь ИИ-сленга, статья Clauding', en: 'explainx.ai AI dictionary: Clauding' } },
        site: { url: 'https://clauding.me/', label: { ru: 'clauding.me — страница про термин', en: 'clauding.me, a page about the term' } },
        notes: {
          title: { ru: 'Слова из первоисточника', en: 'Words from the source' },
          items: [
            { name: { ru: 'Определение', en: 'Definition' }, text: { ru: '«Clauding is informal shorthand for working with or through Claude» (explainx.ai)', en: '“Clauding is informal shorthand for working with or through Claude” (explainx.ai)' } },
          ],
        },
      },
      {
        slug: 'codex',
        name: { ru: 'Codex', en: 'Codex' },
        aka: { ru: 'OpenAI Codex, Codex AI, Codex в ChatGPT, Кодекс', en: 'OpenAI Codex, Codex AI, ChatGPT Codex' },
        def: {
          ru: 'Codex — агент OpenAI для программирования на моделях GPT; от ChatGPT отличается тем, что сам работает в проекте: читает код, правит файлы, запускает команды и тесты, готовит пулл-реквесты, а ChatGPT отвечает текстом. Работает в ChatGPT, в приложении для компьютера, в терминале, в IDE и в облаке, где задачи идут в отдельной песочнице; везде это один агент, и он входит в тарифы ChatGPT, лимиты зависят от тарифа. Устроен как Claude Code и Cursor. Инструкции проекта читает из `AGENTS.md`, повторяющиеся процессы держит в скиллах, внешние системы подключает через MCP.',
          en: 'Codex is a coding agent app from OpenAI on GPT models, and it is a different thing from ChatGPT: the chat answers with text, while Codex works in the project itself — it reads the code, edits files, runs commands and tests, and prepares pull requests. It runs in ChatGPT, in the desktop app, in the terminal, in the IDE and in the cloud, where tasks run in a separate sandbox; it is one agent everywhere and comes with ChatGPT plans, with limits that depend on the plan. It is built like Claude Code and Cursor. It reads project instructions from `AGENTS.md`, keeps repeatable processes in skills and connects outside systems through MCP.',
        },
        match: { ru: ['(?:OpenAI )?Codex(?: AI| CLI)?'], en: ['(?:OpenAI )?Codex(?: AI| CLI)?'] },
        related: ['openai', 'agents-md', 'claude-code', 'cursor', 'ai-agent'],
        faq: [
          { q: { ru: 'Codex и ChatGPT — это одно и то же?', en: 'Are Codex and ChatGPT the same thing?' }, a: { ru: 'Нет: ChatGPT — чат, который отвечает текстом, Codex — агент для кода, который сам читает проект, правит файлы и запускает тесты. Codex входит в тарифы ChatGPT.', en: 'No: ChatGPT is a chat that answers with text, Codex is a coding agent that reads the project, edits files and runs tests itself. Codex comes with ChatGPT plans.' } },
          { q: { ru: 'Где работает Codex?', en: 'Where does Codex run?' }, a: { ru: 'В ChatGPT, в приложении для компьютера, в терминале, в IDE и в облаке, где задачи идут в отдельной песочнице. Везде это один и тот же агент.', en: 'In ChatGPT, in the desktop app, in the terminal, in the IDE and in the cloud, where tasks run in a separate sandbox. It is the same agent everywhere.' } },
          { q: { ru: 'На каких моделях работает Codex?', en: 'Which models does Codex use?' }, a: { ru: 'На моделях GPT от OpenAI.', en: 'On OpenAI’s GPT models.' } },
          { q: { ru: 'Codex — это модель или агент?', en: 'Is Codex a model or an agent?' }, a: { ru: 'Сейчас агент. В 2021 году Codex называлась модель OpenAI, которая дописывала код и работала внутри GitHub Copilot; имя осталось, а под ним теперь агент на моделях GPT.', en: 'An agent today. In 2021 Codex was the name of an OpenAI model that completed code and powered GitHub Copilot; the name stayed, and it now means an agent on GPT models.' } },
          { q: { ru: 'Сколько стоит Codex?', en: 'How much does Codex cost?' }, a: { ru: 'Отдельной оплаты нет: Codex входит в тарифы ChatGPT Free, Go, Plus, Pro, Business, Edu и Enterprise. Лимиты общие с ChatGPT Work и зависят от тарифа.', en: 'There is no separate fee: Codex comes with the ChatGPT Free, Go, Plus, Pro, Business, Edu and Enterprise plans. Limits are shared with ChatGPT Work and depend on the plan.' } },
          { q: { ru: 'Работает ли Codex в России?', en: 'Does Codex work in Russia?' }, a: { ru: 'Официально нет: России нет в списке стран, где OpenAI предоставляет свои сервисы.', en: 'Not officially: Russia is not on the list of countries where OpenAI offers its services.' } },
          { q: { ru: 'Чем Codex (Кодекс) отличается от GPT?', en: 'How is Codex different from GPT?' }, a: { ru: 'GPT — семейство моделей OpenAI, Codex — агент, который на них работает: та же модель, но с доступом к проекту, командам и тестам.', en: 'GPT is OpenAI’s model family; Codex is the agent that runs on it: the same model with access to your project, commands and tests.' } },
        ],
        source: { url: 'https://github.com/openai/codex', label: { ru: 'Репозиторий Codex на GitHub', en: 'Codex GitHub repo' } },
        seo: {
          title: { ru: 'Чем Codex отличается от ChatGPT: что такое Codex от OpenAI', en: 'What is OpenAI Codex: Codex vs ChatGPT Chat and Work' },
          description: {
            ru: 'Codex и ChatGPT — разные продукты: ChatGPT отвечает текстом, Codex сам правит код, запускает тесты и готовит пулл-реквест. Таблица Chat, Work и Codex, где работает и в какие тарифы входит.',
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
          ru: 'Cursor — программа-редактор кода от Anysphere на основе VS Code со встроенным ИИ-агентом: вы работаете в редакторе, агент рядом, а модель выбираете из своих (Grok, Composer) или моделей других компаний; с 2026 года Cursor принадлежит SpaceX. Агент умеет то же, что Claude Code и Codex: читает проект, правит файлы, запускает команды; есть и версия для терминала, и облачные агенты. Правила проекта читает из `AGENTS.md` и своих правил в `.cursor/rules`, внешние системы подключает через MCP.',
          en: 'Cursor is a code editor app from Anysphere, built on VS Code, with a built-in AI agent: you work in the editor, the agent sits next to you, and you pick its own models (Grok, Composer) or other vendors’ models; since 2026 Cursor has been owned by SpaceX. The agent does what Claude Code and Codex do: reads the project, edits files, runs commands; there is also a terminal version and cloud agents. It reads project rules from `AGENTS.md` and its own rules in `.cursor/rules`, and connects outside systems through MCP.',
        },
        match: { ru: ['Cursor(?: AI| IDE)?', '[Кк]урсор\\p{L}* ИИ'], en: ['Cursor(?: AI| IDE)?'] },
        related: ['anysphere', 'vs-code', 'agents-md', 'claude-code', 'codex'],
        faq: [
          { q: { ru: 'Cursor AI — что это?', en: 'What is Cursor AI?' }, a: { ru: 'Редактор кода от Anysphere на основе VS Code со встроенным ИИ-агентом: вы работаете в редакторе, агент рядом читает проект, правит файлы и запускает команды.', en: 'A code editor by Anysphere built on VS Code with a built-in AI agent: you work in the editor, and the agent next to you reads the project, edits files and runs commands.' } },
          { q: { ru: 'Какие модели есть в Cursor?', en: 'Which models does Cursor have?' }, a: { ru: 'Свои модели Grok и Composer и модели других компаний: Claude, Gemini, GPT, DeepSeek и другие; набор зависит от тарифа.', en: 'Its own Grok and Composer models plus other vendors’: Claude, Gemini, GPT, DeepSeek and more; the lineup depends on the plan.' } },
          { q: { ru: 'Cursor rules или AGENTS.md?', en: 'Cursor rules or AGENTS.md?' }, a: { ru: 'Cursor читает оба: AGENTS.md — общий файл для разных агентов, правила в .cursor/rules — свои у Cursor, их можно подключать к отдельным файлам.', en: 'Cursor reads both: AGENTS.md is a shared file for different agents, and the rules in .cursor/rules are Cursor’s own and can be scoped to specific files.' } },
          { q: { ru: 'Работают ли модели GPT в Cursor после 12 ноября 2026?', en: 'Do GPT models still work in Cursor after Nov 12, 2026?' }, a: { ru: 'На 13 ноября 2026 модели OpenAI ещё есть в списке моделей Cursor. OpenAI решила прекратить поставку моделей Cursor и предложила дату 12 ноября; окончательную дату компании обещали сообщить отдельно. Запасные пути — свой ключ OpenAI в чате и агенте Cursor или расширение Codex в Cursor.', en: 'As of Nov 13, 2026 OpenAI models are still in Cursor’s model list. OpenAI decided to stop supplying models to Cursor and proposed Nov 12; the final date is to be announced. Fallbacks: your own OpenAI key in Cursor’s chat and agent, or the Codex extension inside Cursor.' } },
        ],
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
            { name: { ru: 'Модели', en: 'Models' }, text: { ru: 'свои модели Grok (вместе со SpaceXAI) и Composer, а также Claude, Gemini, DeepSeek, Kimi и другие. Модели OpenAI в ноябре 2026 ещё в списке, но OpenAI решила прекратить поставку после покупки Cursor компанией SpaceX: новых моделей не будет, а дату отключения (предложено 12 ноября 2026) компании пока не подтвердили. На тарифах Free и Plus доступен только Grok, модели других компаний — с Premium, по цене API.', en: 'its own Grok (built with SpaceXAI) and Composer models, plus Claude, Gemini, DeepSeek, Kimi and others. OpenAI models are still listed in November 2026, but OpenAI is ending supply after SpaceX acquired Cursor: no new models, and the cutoff date (proposed for Nov 12, 2026) has not been confirmed. Free and Plus get Grok only; other vendors’ models start at Premium, billed at API rates.' } },
            { name: { ru: 'Агент', en: 'The agent' }, text: { ru: 'режимы Agent — сам правит файлы и запускает команды, Ask — только отвечает, Plan — сначала составляет план. Работает в редакторе, в терминале и как облачный агент.', en: 'modes: Agent edits files and runs commands itself, Ask only answers, Plan writes a plan first. It works in the editor, in the terminal and as a cloud agent.' } },
            { name: { ru: 'Правила проекта', en: 'Project rules' }, text: { ru: 'папка `.cursor/rules` (файлы `.mdc`) и `AGENTS.md` — в корне репозитория и во вложенных папках.', en: 'the `.cursor/rules` folder (`.mdc` files) and `AGENTS.md`, at the repo root and in subfolders.' } },
            { name: { ru: 'Тарифы', en: 'Plans' }, text: { ru: 'Free — бесплатно с лимитами, Plus — $8 (только Grok), Premium — $30, Super — $100, Ultra — $200 в месяц; модели других компаний сверх тарифа оплачиваются по цене API. Teams — от $30 за человека.', en: 'Free with limits, Plus at $8 (Grok only), Premium at $30, Super at $100 and Ultra at $200 a month; other vendors’ models are billed at API rates on top. Teams from $30 per user.' } },
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
          ru: 'Hermes Agent — открытый и бесплатный агент от Nous Research (по-русски его часто называют «Гермес агент»), который вы ставите на свой сервер или компьютер и подключаете к любой модели — через API вендоров или локальную. Умеет то же, что агенты для кода, но не только для кода: сам агент работает на вашем сервере или компьютере, а общаетесь вы с ним через терминал, приложение для компьютера (предварительная версия) или мессенджеры: Telegram, Slack, Discord и другие подключаются как интеграции. Помнит контекст между сессиями и сам оформляет удачные приёмы в скиллы. Правила проекта читает из `AGENTS.md`.',
          en: 'Hermes Agent is a free, open-source agent from Nous Research that you install on your own server or computer and connect to any model, through a vendor API or a local one. It does what coding agents do, and not only for code: the agent itself runs on your server or computer, and you talk to it through the terminal, a desktop app (preview) or messengers: Telegram, Slack, Discord and others plug in as integrations. It remembers context between sessions and turns what worked into skills. It reads project rules from `AGENTS.md`.',
        },
        match: { ru: ['Hermes Agent', 'Гермес[- ]агент\\p{L}*'], en: ['Hermes Agent', 'Hermes AI agent'] },
        related: ['nous-research', 'ai-agent', 'memory', 'agent-skills', 'claude-code'],
        faq: [
          { q: { ru: 'Что такое Hermes Agent?', en: 'What is Hermes Agent?' }, a: { ru: 'Открытый бесплатный агент от Nous Research, который ставится на ваш сервер или компьютер и работает с любой моделью.', en: 'A free open-source agent by Nous Research that you install on your server or computer and run with any model.' } },
          { q: { ru: 'Как общаться с Hermes Agent?', en: 'How do you talk to Hermes Agent?' }, a: { ru: 'Через терминал, приложение для компьютера или мессенджеры: Telegram, Slack, Discord и другие подключаются как интеграции.', en: 'Through the terminal, the desktop app or messengers: Telegram, Slack, Discord and others connect as integrations.' } },
        ],
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
        aka: { ru: 'Open Code, опенкод, опен код, openkode', en: 'Open Code' },
        def: {
          ru: 'OpenCode — бесплатный открытый агент для программирования, который работает в терминале; есть также приложение для компьютера и веб-версия. Модель выбираете сами: Claude, GPT, Gemini и десятки других через API или локальную; платите только провайдеру модели. Режимы: Build правит код, Plan только планирует и файлы не меняет. Правила проекта читает из `AGENTS.md`, команда `/init` создаёт этот файл по коду репозитория.',
          en: 'OpenCode is a free, open-source coding agent that runs in the terminal; there is also a desktop app and a web app. You pick the model: Claude, GPT, Gemini and dozens of others through an API, or a local one; you pay only the model provider. Modes: Build edits code, Plan only plans and does not change files. It reads project rules from `AGENTS.md`, and the `/init` command creates that file from the repo.',
        },
        match: { ru: ['OpenCode', 'Open Code'], en: ['OpenCode', 'Open Code'] },
        related: ['terminal', 'claude-code', 'codex', 'hermes-agent', 'agents-md'],
        faq: [
          { q: { ru: 'Что такое OpenCode?', en: 'What is OpenCode?' }, a: { ru: 'Бесплатный открытый агент для программирования в терминале; есть также приложение для компьютера и веб-версия. Модель выбираете сами, платите только её провайдеру.', en: 'A free open-source coding agent in the terminal, with a desktop app and a web app too. You pick the model and pay only its provider.' } },
          { q: { ru: 'Какие модели работают в OpenCode?', en: 'Which models work in OpenCode?' }, a: { ru: 'Claude, GPT, Gemini и десятки других через API, а также локальная модель на вашем компьютере.', en: 'Claude, GPT, Gemini and dozens of others through an API, as well as a local model on your computer.' } },
          { q: { ru: 'Как установить OpenCode?', en: 'How do you install OpenCode?' }, a: { ru: 'На macOS и Linux — `curl -fsSL https://opencode.ai/v2/install | bash`, через Homebrew — `brew install anomalyco/tap/opencode-v2`, через npm — `npm install -g @opencode/cli`. Для Windows менеджеры пакетов не поддерживаются: файл программы скачивают с сайта OpenCode.', en: 'On macOS and Linux: `curl -fsSL https://opencode.ai/v2/install | bash`; with Homebrew: `brew install anomalyco/tap/opencode-v2`; with npm: `npm install -g @opencode/cli`. On Windows package managers are not supported: download the binary from the OpenCode site.' } },
          { q: { ru: 'Сколько стоит OpenCode и можно ли бесплатно?', en: 'How much does OpenCode cost, and is there a free way?' }, a: { ru: 'Сам агент бесплатный, платите только за модель. Есть подписка OpenCode Go за $10 в месяц и OpenCode Console с оплатой за токены; в Console есть бесплатные модели, часть — на ограниченное время. Бесплатно работает и локальная модель на вашем компьютере.', en: 'The agent itself is free; you pay only for the model. There is the OpenCode Go subscription at $10 a month and OpenCode Console with pay-per-token pricing; Console has free models, some for a limited time. A local model on your computer also works for free.' } },
          { q: { ru: 'Чем OpenCode отличается от Claude Code?', en: 'How is OpenCode different from Claude Code?' }, a: { ru: 'Устроены одинаково: оба читают проект, правят файлы и запускают команды. OpenCode открытый и работает с любой моделью, Claude Code — только с моделями Claude.', en: 'They are built the same way: both read the project, edit files and run commands. OpenCode is open source and works with any model, Claude Code only with Claude models.' } },
        ],
        source: { url: 'https://opencode.ai/docs/', label: { ru: 'Документация OpenCode', en: 'OpenCode docs' } },
        seo: {
          title: { ru: 'OpenCode (опенкод): что это — бесплатный открытый ИИ-агент в терминале с любой моделью', en: 'What is OpenCode: a free open-source AI coding agent in the terminal' },
          description: {
            ru: 'OpenCode — бесплатный открытый ИИ-агент для программирования в терминале: подключаете любую модель или локальную, режимы Build и Plan, правила в AGENTS.md.',
            en: 'OpenCode is a free open-source AI coding agent for the terminal: any model or a local one, Build and Plan modes, rules in AGENTS.md.',
          },
        },
        more: { post: 'ai-in-code-harness-and-tools', label: { ru: 'Claude Code, Codex, Cursor и Hermes Agent: что выбрать', en: 'Claude Code, Codex, Cursor and Hermes Agent: which to pick' } },
      },
      {
        slug: 'gemini-cli',
        name: { ru: 'Gemini CLI', en: 'Gemini CLI' },
        aka: { ru: 'Джемини CLI', en: 'Google Gemini CLI' },
        def: {
          ru: 'Gemini CLI — открытый агент Google для программирования в терминале на моделях Gemini; вышел в июне 2025 года. Устроен как Claude Code и Codex: читает проект, правит файлы, запускает команды; правила проекта берёт из `GEMINI.md`, внешние системы подключает через MCP. С IDE связывается через дополнение для VS Code и через протокол ACP для JetBrains и Zed. До 18 июня 2026 им можно было пользоваться бесплатно со своим аккаунтом Google; теперь для обычных пользователей его заменил закрытый Antigravity CLI. Сам Gemini CLI остался открытым и работает для компаний с корпоративными тарифами и для платных ключей API.',
          en: 'Gemini CLI — google’s open-source coding agent for the terminal on Gemini models, released in June 2025. It is built like Claude Code and Codex: it reads the project, edits files and runs commands; it takes project rules from `GEMINI.md` and connects outside systems through MCP. It links to IDEs through a VS Code companion extension and through ACP for JetBrains and Zed. Until June 18, 2026 anyone could use it free with a Google account; now the closed-source Antigravity CLI replaces it for individual users. Gemini CLI itself stays open source and works for companies on enterprise plans and for paid API keys.',
        },
        match: { ru: ['Gemini CLI'], en: ['Gemini CLI'] },
        related: ['antigravity-cli', 'terminal', 'claude-code', 'codex', 'opencode', 'ide'],
        faq: [
          { q: { ru: 'Что такое Gemini CLI?', en: 'What is Gemini CLI?' }, a: { ru: 'Открытый агент Google для программирования в терминале на моделях Gemini, вышел в июне 2025 года.', en: 'Google’s open-source coding agent for the terminal on Gemini models, released in June 2025.' } },
          { q: { ru: 'Что стало с Gemini CLI?', en: 'What happened to Gemini CLI?' }, a: { ru: 'С 18 июня 2026 для обычных пользователей его заменил закрытый Antigravity CLI. Сам Gemini CLI остался открытым и работает для корпоративных тарифов и платных ключей API.', en: 'Since 18 June 2026 the closed Antigravity CLI replaced it for regular users. Gemini CLI itself stays open source and works for enterprise plans and paid API keys.' } },
        ],
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
          ru: 'Antigravity CLI — агент Google для программирования в терминале, связанный с приложением Antigravity. В мае 2026 Google объявил, что переносит в него Gemini CLI — открытый агент на моделях Gemini; с 18 июня 2026 Gemini CLI перестал работать для обычных пользователей, включая бесплатный доступ. Antigravity CLI закрытый; старый Gemini CLI остался открытым, но работает только для компаний с корпоративными тарифами и для платных ключей API.',
          en: 'Antigravity CLI — google’s coding agent for the terminal, tied to the Antigravity app. In May 2026 Google announced it was moving Gemini CLI, its open-source agent on Gemini models, into it; since June 18, 2026 Gemini CLI no longer serves individual users, free access included. Antigravity CLI is closed-source; the old Gemini CLI stays open source but works only for companies on enterprise plans and for paid API keys.',
        },
        match: { ru: ['Antigravity CLI', 'Google Antigravity'], en: ['Antigravity CLI', 'Google Antigravity'] },
        related: ['gemini-cli', 'terminal', 'claude-code', 'codex', 'opencode'],
        faq: [
          { q: { ru: 'Antigravity CLI — что это?', en: 'What is Antigravity CLI?' }, a: { ru: 'Закрытый агент Google для программирования в терминале, связанный с приложением Antigravity. Он заменил Gemini CLI для обычных пользователей.', en: 'Google’s closed coding agent for the terminal, tied to the Antigravity app. It replaced Gemini CLI for regular users.' } },
          { q: { ru: 'Когда Antigravity CLI заменил Gemini CLI?', en: 'When did Antigravity CLI replace Gemini CLI?' }, a: { ru: 'Google объявил перенос в мае 2026, а с 18 июня 2026 Gemini CLI перестал работать для обычных пользователей.', en: 'Google announced the move in May 2026, and on 18 June 2026 Gemini CLI stopped working for regular users.' } },
        ],
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
          ru: 'Claude in Chrome (Claude for Chrome) — официальное расширение Claude от Anthropic для браузера Chrome, через которое агент работает в вашем браузере: открывает страницы, кликает, заполняет формы и читает консоль. Работает под вашим входом, поэтому видит то же, что и вы. Ставится из Chrome Web Store и работает только на платных тарифах Claude: Pro, Max, Ultra, Team и Enterprise. Режимов два: боковая панель, где Claude сам выполняет задачу на открытой странице, и управление браузером из Claude Code. Боковая панель официально работает только в Chrome на компьютере; режим для Claude Code — ещё в Edge и других браузерах на Chromium.',
          en: 'Claude in Chrome (Claude for Chrome) is Anthropic’s official Claude extension for the Chrome browser that lets an agent work in your browser: open pages, click, fill forms and read the console. It works under your login, so it sees what you see. It is installed from the Chrome Web Store and works only on paid Claude plans: Pro, Max, Ultra, Team and Enterprise. There are two modes: a side panel where Claude does the task on the open page itself, and browser control from Claude Code. The side panel officially runs only in desktop Chrome; the Claude Code mode also works in Edge and other Chromium browsers.',
        },
        match: { ru: ['Claude in Chrome', 'Claude for Chrome'], en: ['Claude in Chrome', 'Claude for Chrome'] },
        related: ['claude-code', 'mcp', 'human-in-the-loop', 'permissions', 'prompt-injection', 'test-stand'],
        faq: [
          { q: { ru: 'Как установить расширение Claude для Chrome?', en: 'How do I install the Claude Chrome extension?' }, a: { ru: 'Откройте страницу Claude в Chrome Web Store, нажмите «Установить», войдите в аккаунт Claude, закрепите расширение и дайте запрошенные разрешения.', en: 'Open the Claude page in the Chrome Web Store, click Add to Chrome, sign in with your Claude account, pin the extension and grant the permissions it asks for.' } },
          { q: { ru: 'Claude in Chrome бесплатный?', en: 'Is Claude in Chrome free?' }, a: { ru: 'Нет. Расширение работает только на платных тарифах Claude: Pro, Max, Ultra, Team и Enterprise. В Team и Enterprise его включает администратор.', en: 'No. It works only on paid Claude plans: Pro, Max, Ultra, Team and Enterprise. On Team and Enterprise the admin decides whether it is turned on.' } },
          { q: { ru: 'Как подключить Claude in Chrome к Claude Code?', en: 'How do I use Claude in Chrome from Claude Code?' }, a: { ru: 'Запустите claude --chrome или включите Enabled by default в /chrome; в VS Code наберите @browser. Нужен тариф Anthropic напрямую и вход через /login: через Bedrock, Google Cloud, Microsoft Foundry и по API-ключу не работает.', en: 'Start claude --chrome or turn on Enabled by default in /chrome; in VS Code, type @browser. You need a direct Anthropic plan and sign-in with /login: it does not work through Bedrock, Google Cloud or Microsoft Foundry, or with an API key.' } },
          { q: { ru: 'Что делает расширение Claude для Chrome?', en: 'What does the Claude Chrome extension do?' }, a: { ru: 'Даёт агенту работать в вашем браузере: открывать страницы, кликать, заполнять формы и читать консоль под вашим входом.', en: 'It lets the agent work in your browser: open pages, click, fill in forms and read the console under your sign-in.' } },
          { q: { ru: 'Как пользоваться Claude in Chrome?', en: 'How do I use Claude in Chrome?' }, a: { ru: 'Есть два режима: боковая панель, где Claude сам выполняет задачу на открытой странице, и управление браузером из Claude Code.', en: 'There are two modes: a side panel where Claude does the task on the open page, and browser control from Claude Code.' } },
          { q: { ru: 'Работает ли Claude in Chrome в других браузерах?', en: 'Does Claude in Chrome work in other browsers?' }, a: { ru: 'Боковая панель официально работает только в Chrome на компьютере и не работает на телефоне. Режим для Claude Code работает ещё в Edge и других браузерах на Chromium.', en: 'The side panel officially works only in desktop Chrome and not on mobile. The Claude Code mode also works in Edge and other Chromium browsers.' } },
        ],
        source: { url: 'https://support.claude.com/en/articles/12012173-get-started-with-claude-in-chrome', label: { ru: 'Справка: как начать с Claude in Chrome', en: 'Help: Get started with Claude in Chrome' } },
        seo: {
          title: { ru: 'Claude in Chrome: расширение Claude для Chrome — установка, тарифы и браузеры', en: 'Claude in Chrome: the Claude Chrome extension — install, plans and browsers' },
          description: {
            ru: 'Что делает расширение Claude для Chrome, как поставить его из Chrome Web Store, на каких платных тарифах Claude оно работает и где: боковая панель в Chrome на компьютере или Claude Code в браузерах на Chromium.',
            en: 'What the Claude for Chrome extension does, how to install it from the Chrome Web Store, which paid Claude plans include it, and where it runs: the side panel in desktop Chrome or Claude Code in Chromium browsers.',
          },
        },
        more: { post: 'claude-in-chrome', label: { ru: 'Claude Code в Chrome: как агент тестирует сайт в браузере — отладка и формы под вашим входом', en: 'Claude Code in Chrome: how the agent tests your site in the browser — debugging and forms under your login' } },
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
          ru: 'Anthropic — американская компания, которая делает семейство языковых моделей Claude: Opus, Sonnet, Haiku и Fable. Людям — приложения Claude, агент Cowork для работы с папкой на компьютере и расширение Claude in Chrome. Для кода — агент Claude Code. Разработчикам — API, Managed Agents (агенты в облаке Anthropic), Agent SDK и открытый протокол MCP, на котором агенты подключаются к внешним системам.',
          en: 'Anthropic is a US company that builds the Claude family of language models: Opus, Sonnet, Haiku and Fable. For people: the Claude apps, the Cowork agent that works in a folder on your computer, and the Claude in Chrome extension. For code: the Claude Code agent. For developers: the API, Managed Agents (agents in Anthropic’s cloud), the Agent SDK and the open MCP protocol agents use to connect to outside systems.',
        },
        match: { ru: ['Anthropic'], en: ['Anthropic'] },
        related: ['claude-code', 'mcp', 'llm'],
        faq: [
          { q: { ru: 'Что такое Anthropic?', en: 'What is Anthropic?' }, a: { ru: 'Американская компания, которая делает модели Claude: Opus, Sonnet, Haiku и Fable.', en: 'A US company that builds the Claude models: Opus, Sonnet, Haiku and Fable.' } },
          { q: { ru: 'Какие продукты у Anthropic?', en: 'What products does Anthropic have?' }, a: { ru: 'Приложения Claude, агент Cowork, расширение Claude in Chrome, агент для кода Claude Code, а для разработчиков — API, Managed Agents, Agent SDK и протокол MCP.', en: 'The Claude apps, the Cowork agent, the Claude in Chrome extension, the Claude Code coding agent, and for developers the API, Managed Agents, Agent SDK and the MCP protocol.' } },
        ],
        source: { url: 'https://www.anthropic.com/', label: { ru: 'Официальный сайт Anthropic', en: 'Anthropic official site' } },
      },
      {
        slug: 'openai',
        name: { ru: 'OpenAI', en: 'OpenAI' },
        def: {
          ru: 'OpenAI — американская компания, которая делает семейство языковых моделей GPT. Людям — чат ChatGPT, на компьютере в одном приложении с Codex. Для кода — агент Codex. Разработчикам — API, Agents SDK, Apps SDK для приложений внутри ChatGPT и формат инструкций `AGENTS.md`, который читают и другие агенты.',
          en: 'OpenAI is a US company that builds the GPT family of language models. For people: the ChatGPT chat, on desktop in one app with Codex. For code: the Codex agent. For developers: the API, the Agents SDK, the Apps SDK for apps inside ChatGPT and the `AGENTS.md` instruction format that other agents read too.',
        },
        match: { ru: ['OpenAI'], en: ['OpenAI'] },
        related: ['codex', 'agents-md', 'llm'],
        faq: [
          { q: { ru: 'Что такое OpenAI?', en: 'What is OpenAI?' }, a: { ru: 'Американская компания, которая делает модели GPT, чат ChatGPT и агента для кода Codex.', en: 'A US company that builds the GPT models, the ChatGPT chat and the Codex coding agent.' } },
          { q: { ru: 'Что OpenAI даёт разработчикам?', en: 'What does OpenAI offer developers?' }, a: { ru: 'API к моделям, Agents SDK для своих агентов, Apps SDK для приложений внутри ChatGPT и формат инструкций AGENTS.md.', en: 'An API to the models, the Agents SDK for your own agents, the Apps SDK for apps inside ChatGPT and the AGENTS.md instruction format.' } },
        ],
        source: { url: 'https://en.wikipedia.org/wiki/OpenAI', label: { ru: 'Википедия: OpenAI', en: 'Wikipedia: OpenAI' } },
      },
      {
        slug: 'nous-research',
        name: { ru: 'Nous Research', en: 'Nous Research' },
        def: {
          ru: 'Nous Research — американская исследовательская лаборатория, которая делает открытые языковые модели Hermes. Продукты: открытый агент Hermes Agent, который ставится на ваш сервер и работает с любой моделью, чат Nous Chat и Forge, который усиливает рассуждения модели. Инфраструктура: Psyche для распределённого обучения и Atropos, открытая среда для обучения с подкреплением.',
          en: 'Nous Research is a US research lab that builds the open Hermes language models. Products: the open Hermes Agent, which you install on your own server and run with any model, the Nous Chat chat and Forge, which boosts a model’s reasoning. Infrastructure: Psyche for distributed training and Atropos, an open environment for reinforcement learning.',
        },
        match: { ru: ['Nous Research'], en: ['Nous Research'] },
        related: ['hermes-agent', 'llm'],
        faq: [
          { q: { ru: 'Nous Research — что это?', en: 'What is Nous Research?' }, a: { ru: 'Американская исследовательская лаборатория, которая делает открытые языковые модели Hermes.', en: 'A US research lab that builds the open Hermes language models.' } },
          { q: { ru: 'Какие продукты у Nous Research?', en: 'What products does Nous Research have?' }, a: { ru: 'Открытый агент Hermes Agent, чат Nous Chat, Forge для усиления рассуждений, а для обучения — Psyche и Atropos.', en: 'The open Hermes Agent, the Nous Chat app, Forge for stronger reasoning, and Psyche and Atropos for training.' } },
        ],
        source: { url: 'https://nousresearch.com/', label: { ru: 'Официальный сайт Nous Research', en: 'Nous Research official site' } },
      },
      {
        // Продукты на октябрь 2026: редактор Cursor с агентом, свои модели Composer (Composer 2 — март 2026),
        // ревьюер пулл-реквестов Bugbot, агент в терминале (CLI), облачные агенты, веб и мобильные агенты.
        // Сделка со SpaceX объявлена 21.04.2026, закрыта 14.08.2026 (en.wikipedia.org/wiki/Cursor_(company))
        slug: 'anysphere',
        name: { ru: 'Anysphere', en: 'Anysphere' },
        def: {
          ru: 'Anysphere — американская компания, которая делает Cursor: редактор кода со встроенным агентом. Кроме редактора у неё свои модели для кода Composer, ревьюер пулл-реквестов Bugbot, агент для терминала и облачные агенты. С августа 2026 принадлежит SpaceX.',
          en: 'Anysphere is the US company behind Cursor, a code editor with a built-in agent. Besides the editor it makes its own Composer coding models, the Bugbot pull-request reviewer, a terminal agent and cloud agents. Owned by SpaceX since August 2026.',
        },
        match: { ru: ['Anysphere'], en: ['Anysphere'] },
        related: ['cursor', 'llm'],
        faq: [
          { q: { ru: 'Anysphere — что это за компания?', en: 'What is Anysphere?' }, a: { ru: 'Американская компания, которая делает редактор кода Cursor со встроенным агентом.', en: 'A US company that makes the Cursor code editor with a built-in agent.' } },
          { q: { ru: 'Что ещё делает Anysphere кроме Cursor?', en: 'What else does Anysphere make besides Cursor?' }, a: { ru: 'Свои модели для кода Composer, ревьюер пулл-реквестов Bugbot, агента для терминала и облачных агентов.', en: 'Its own Composer coding models, the Bugbot pull request reviewer, a terminal agent and cloud agents.' } },
        ],
        source: { url: 'https://anysphere.inc/', label: { ru: 'Официальный сайт Anysphere', en: 'Anysphere official site' } },
      },
      {
        // На октябрь 2026: семейство V4 (V4 и V4-Pro — апрель, V4.1-Flash — сентябрь 2026), веса под MIT, чат-приложение и API
        slug: 'deepseek',
        name: { ru: 'DeepSeek', en: 'DeepSeek' },
        def: {
          ru: 'DeepSeek — китайская компания, которая делает языковые модели DeepSeek с открытыми весами: их можно скачать и запустить на своём сервере. Текущее поколение V4 держит в контексте до миллиона токенов. Людям — чат DeepSeek в браузере и на телефоне. Разработчикам — API. Модели DeepSeek подключают к открытым агентам вроде Hermes Agent.',
          en: 'DeepSeek is a Chinese company that builds the DeepSeek language models with open weights: you can download them and run them on your own server. The current V4 generation holds up to a million tokens of context. For people: the DeepSeek chat on the web and mobile. For developers: the API. DeepSeek models plug into open agents such as Hermes Agent.',
        },
        match: { ru: ['DeepSeek', 'Дипсик\\p{L}*'], en: ['DeepSeek'] },
        related: ['llm', 'hermes-agent', 'openai'],
        faq: [
          { q: { ru: 'DeepSeek — что это?', en: 'What is DeepSeek?' }, a: { ru: 'Китайская компания, которая делает языковые модели DeepSeek с открытыми весами: их можно скачать и запустить на своём сервере.', en: 'A Chinese company that builds the DeepSeek language models with open weights: you can download them and run them on your own server.' } },
          { q: { ru: 'Сколько держит в контексте DeepSeek V4?', en: 'How much context does DeepSeek V4 hold?' }, a: { ru: 'До миллиона токенов.', en: 'Up to a million tokens.' } },
        ],
        source: { url: 'https://www.deepseek.com/', label: { ru: 'Официальный сайт DeepSeek', en: 'DeepSeek official site' } },
      },
      {
        // На октябрь 2026: модели Alice AI (LLM, LLM Flash, ART), YandexGPT — прежняя линейка; AI Studio — конструктор агентов (>18 тыс. агентов);
        // Алиса AI Про для бизнеса — сентябрь 2026 (cnews.ru); SourceCraft — платформа для кода с Code Assistant и CLI (yandex.cloud/ru/blog)
        slug: 'yandex',
        name: { ru: 'Яндекс', en: 'Yandex' },
        def: {
          ru: 'Яндекс — российская компания, которая делает языковые модели Alice AI, а раньше — линейку YandexGPT. Людям — ассистент Алиса в приложении, браузере и колонках: отвечает на вопросы и выполняет действия по просьбе. Компаниям — корпоративный агент Алиса AI Про и Yandex AI Studio, где из моделей Alice AI и открытых моделей собирают своих агентов. Для кода — платформа SourceCraft с агентом Code Assistant.',
          en: 'Yandex is a Russian company that builds the Alice AI language models, and earlier the YandexGPT line. For people: the Alice assistant in an app, a browser and smart speakers that answers questions and acts on requests. For companies: the Alice AI Pro corporate agent and Yandex AI Studio, where teams build their own agents on Alice AI and open models. For code: the SourceCraft platform with the Code Assistant agent.',
        },
        match: { ru: ['YandexGPT', 'Алис[аеуы]', 'Яндекс\\p{L}*(?! \\p{Lu})'], en: ['YandexGPT', 'Yandex'] },
        related: ['llm', 'ai-agent'],
        faq: [
          { q: { ru: 'Какие ИИ-продукты есть у Яндекса?', en: 'What AI products does Yandex have?' }, a: { ru: 'Модели Alice AI, ассистент Алиса для людей, корпоративный агент Алиса AI Про и Yandex AI Studio для компаний, а для кода — SourceCraft с агентом Code Assistant.', en: 'The Alice AI models, the Alice assistant for people, the Alice AI Pro corporate agent and Yandex AI Studio for companies, and SourceCraft with the Code Assistant agent for code.' } },
          { q: { ru: 'Что было до Alice AI?', en: 'What came before Alice AI?' }, a: { ru: 'Линейка моделей YandexGPT.', en: 'The YandexGPT model line.' } },
        ],
        source: { url: 'https://yandex.com/company', label: { ru: 'Яндекс: о компании', en: 'Yandex company page' } },
        seo: {
          title: { ru: 'Yandex AI (ИИ Яндекса): Alice AI, AI Studio и SourceCraft — что есть у Яндекса для ИИ-агентов', en: 'Yandex AI: Alice AI models, AI Studio and SourceCraft Code Assistant' },
          description: {
            ru: 'Что такое ИИ Яндекса: модели Alice AI (раньше YandexGPT), ассистент Алиса, корпоративный агент Алиса AI Про, конструктор агентов Yandex AI Studio и SourceCraft с агентом Code Assistant для кода.',
            en: 'What Yandex AI is: the Alice AI models (formerly YandexGPT), the Alice assistant, Alice AI Pro for business, Yandex AI Studio for building agents and SourceCraft Code Assistant for code.',
          },
        },
      },
      {
        // Junie вышел из беты 17.06.2026 (blog.jetbrains.com/junie/2026/06/junie-coding-agent-out-of-beta); Mellum — открытая модель автодополнения
        slug: 'jetbrains',
        name: { ru: 'JetBrains', en: 'JetBrains' },
        def: {
          ru: 'JetBrains — компания, основанная в Праге в 2000 году: делает IDE IntelliJ IDEA, PyCharm, WebStorm и другие, а также язык Kotlin. Свой агент для кода Junie работает в IDE и в терминале; рядом в IDE встроены Claude Agent и Codex, а другие агенты подключаются через открытый протокол ACP. Автодополнение — на своей модели Mellum. Air — среда, где несколько агентов работают параллельно (предварительная версия).',
          en: 'JetBrains is a company founded in Prague in 2000 that makes the IntelliJ IDEA, PyCharm, WebStorm and other IDEs, plus the Kotlin language. Its own coding agent Junie works in the IDE and the terminal; Claude Agent and Codex are built into the IDE next to it, and other agents connect through the open ACP protocol. Code completion runs on its own Mellum model. Air is a workspace where several agents run in parallel (preview).',
        },
        match: { ru: ['JetBrains'], en: ['JetBrains'] },
        related: ['ide', 'vs-code', 'claude-code'],
        faq: [
          { q: { ru: 'JetBrains — что это за компания?', en: 'What is JetBrains?' }, a: { ru: 'Компания, основанная в Праге в 2000 году: делает IDE IntelliJ IDEA, PyCharm, WebStorm и другие, а также язык Kotlin.', en: 'A company founded in Prague in 2000: it makes the IntelliJ IDEA, PyCharm, WebStorm and other IDEs, and the Kotlin language.' } },
          { q: { ru: 'Какие ИИ-агенты работают в IDE JetBrains?', en: 'Which AI agents work in JetBrains IDEs?' }, a: { ru: 'Свой агент Junie, встроенные Claude Agent и Codex, а другие агенты подключаются через открытый протокол ACP.', en: 'JetBrains’ own Junie agent, built-in Claude Agent and Codex, and other agents connect through the open ACP protocol.' } },
        ],
        source: { url: 'https://www.jetbrains.com/', label: { ru: 'Официальный сайт JetBrains', en: 'JetBrains official site' } },
      },
      {
        // На октябрь 2026: Copilot в Windows и Microsoft 365, GitHub Copilot (агент для кода), свои модели MAI рядом с моделями партнёров
        slug: 'microsoft',
        name: { ru: 'Microsoft', en: 'Microsoft' },
        def: {
          ru: 'Microsoft — американская компания, которая делает ассистента Copilot: он встроен в Windows, Word, Excel, Outlook и Teams. Для разработчиков — редактор VS Code, GitHub Copilot с агентом для кода и приложение GitHub Copilot для нескольких агентов сразу. Компаниям — Copilot Studio и Foundry, чтобы строить своих агентов. Работает на своих моделях MAI и на моделях партнёров, в том числе OpenAI и Anthropic.',
          en: 'Microsoft is a US company that makes the Copilot assistant, built into Windows, Word, Excel, Outlook and Teams. For developers: the VS Code editor, GitHub Copilot with a coding agent and the GitHub Copilot app for running several agents. For companies: Copilot Studio and Foundry to build their own agents. It runs on its own MAI models and on partner models, including OpenAI and Anthropic.',
        },
        match: { ru: ['Microsoft', 'Copilot'], en: ['Microsoft', 'Copilot'] },
        related: ['vs-code', 'openai', 'anthropic', 'llm'],
        faq: [
          { q: { ru: 'Что Microsoft делает в ИИ?', en: 'What does Microsoft do in AI?' }, a: { ru: 'Ассистента Copilot, встроенного в Windows, Word, Excel, Outlook и Teams.', en: 'The Copilot assistant built into Windows, Word, Excel, Outlook and Teams.' } },
          { q: { ru: 'Что Microsoft даёт разработчикам?', en: 'What does Microsoft offer developers?' }, a: { ru: 'Редактор VS Code, GitHub Copilot с агентом для кода и приложение GitHub Copilot.', en: 'The VS Code editor, GitHub Copilot with a coding agent and the GitHub Copilot app.' } },
        ],
        source: { url: 'https://en.wikipedia.org/wiki/Microsoft', label: { ru: 'Википедия: Microsoft', en: 'Wikipedia: Microsoft' } },
      },
      {
        slug: 'bing',
        name: { ru: 'Bing', en: 'Bing' },
        def: {
          ru: 'Bing — поисковая система компании Microsoft. Рядом с обычной выдачей ссылок в ней работает ассистент Copilot: отвечает на вопрос текстом со ссылками на источники. Для владельцев сайтов у Bing свой кабинет, Bing Webmaster Tools: индексация страниц, запросы и показы в поиске.',
          en: 'Bing — microsoft’s search engine. Next to the usual list of links it runs the Copilot assistant, which answers a question in text with links to sources. For site owners Bing has its own console, Bing Webmaster Tools: page indexing, queries and impressions in search.',
        },
        match: { ru: ['Bing'], en: ['Bing'] },
        related: ['microsoft', 'yandex'],
        faq: [
          { q: { ru: 'Bing — что это?', en: 'What is Bing?' }, a: { ru: 'Поисковая система Microsoft. Рядом с выдачей ссылок в ней работает ассистент Copilot, который отвечает текстом со ссылками на источники.', en: 'Microsoft’s search engine. Next to the link results it runs the Copilot assistant, which answers with text and source links.' } },
          { q: { ru: 'Где владельцу сайта смотреть Bing?', en: 'Where does a site owner check Bing?' }, a: { ru: 'В Bing Webmaster Tools — кабинете Bing для владельцев сайтов.', en: 'In Bing Webmaster Tools, Bing’s dashboard for site owners.' } },
        ],
        source: { url: 'https://en.wikipedia.org/wiki/Microsoft_Bing', label: { ru: 'Википедия: Microsoft Bing', en: 'Wikipedia: Microsoft Bing' } },
      },
      {
        // Rovo MCP Server — GA 04.02.2026 (developer.atlassian.com/cloud/rovo-mcp); агенты Rovo в Jira — февраль 2026
        // 11.2026: в справке называется «Atlassian MCP server», раздел Atlassian AI Gateway (support.atlassian.com/atlassian-ai-gateway/docs/get-started-with-the-atlassian-remote-mcp-server/)
        slug: 'atlassian',
        name: { ru: 'Atlassian', en: 'Atlassian' },
        def: {
          ru: 'Atlassian — австралийская компания, которая делает Jira, Confluence и Bitbucket — рабочие системы многих команд разработки. Свой ИИ называется Rovo: агенты Rovo берут задачи в Jira, а MCP-сервер Atlassian (раньше Rovo MCP Server) даёт внешним агентам вроде Claude Code и Cursor читать и менять данные Jira и Confluence.',
          en: 'Atlassian is an Australian company that makes Jira, Confluence and Bitbucket, the work systems of many development teams. Its AI is called Rovo: Rovo agents take tasks in Jira, and the Atlassian MCP server (formerly Rovo MCP Server) lets outside agents such as Claude Code and Cursor read and change Jira and Confluence data.',
        },
        match: { ru: ['Atlassian'], en: ['Atlassian'] },
        related: ['jira', 'confluence', 'mcp-server'],
        faq: [
          { q: { ru: 'Atlassian — что это за компания?', en: 'What is Atlassian?' }, a: { ru: 'Австралийская компания, которая делает Jira, Confluence и Bitbucket.', en: 'An Australian company that makes Jira, Confluence and Bitbucket.' } },
          { q: { ru: 'Как зовут ИИ Atlassian?', en: 'What is Atlassian’s AI called?' }, a: { ru: 'Rovo: агенты Rovo берут задачи в Jira, а MCP-сервер Atlassian (раньше Rovo MCP Server) даёт внешним агентам доступ к данным Atlassian.', en: 'Rovo: Rovo agents take on tasks in Jira, and the Atlassian MCP server (formerly Rovo MCP Server) gives outside agents access to Atlassian data.' } },
        ],
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
          ru: 'Харнесс — всё вокруг модели, что делает её рабочим агентом: инструкции, инструменты, права доступа, память и проверки. Модель одна и та же, а результат зависит от харнесса.',
          en: 'Harness — everything around the model that turns it into a working agent: instructions, tools, permissions, memory and checks. The model is the same, the result depends on the harness.',
        },
        match: { ru: ['харнесс\\p{L}*', 'harness'], en: ['harness(?:es)?'] },
        related: ['ai-agent', 'harness-engineering', 'hdd', 'llm'],
        faq: [
          { q: { ru: 'Харнесс в ИИ — что это?', en: 'What is a harness in AI?' }, a: { ru: 'Всё вокруг модели, что делает её рабочим агентом: инструкции, инструменты, права доступа, память и проверки.', en: 'Everything around a model that makes it a working agent: instructions, tools, access rights, memory and checks.' } },
          { q: { ru: 'Почему результат зависит от харнесса?', en: 'Why does the result depend on the harness?' }, a: { ru: 'Модель одна и та же, а что агент знает, что может сделать и как проверяет себя, задаёт харнесс.', en: 'The model is the same, while what the agent knows, what it can do and how it checks itself is set by the harness.' } },
        ],
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
          ru: 'Хуки — скрипты, которые харнесс запускает автоматически в заданные моменты работы агента: перед действием, после правки файла, при завершении. Правило в инструкции агент считает советом, а хук выполняется всегда, поэтому им закрывают запреты без исключений.',
          en: 'Hooks — scripts the harness runs automatically at set moments of the agent’s work: before an action, after a file edit, on finish. An agent treats a rule in the instructions as advice, while a hook always runs, so hooks close the blocks that allow no exceptions.',
        },
        match: { ru: ['хук\\p{L}*'], en: ['hooks?'] },
        related: ['harness', 'claude-md', 'human-in-the-loop'],
        faq: [
          { q: { ru: 'Хук — это что?', en: 'What is a hook?' }, a: { ru: 'Скрипт, который харнесс запускает автоматически в заданный момент работы агента: перед действием, после правки файла или при завершении.', en: 'A script the harness runs automatically at a set moment of the agent’s work: before an action, after a file edit or at the end.' } },
          { q: { ru: 'Чем хук отличается от правила?', en: 'How is a hook different from a rule?' }, a: { ru: 'Правило агент считает советом и может нарушить, хук выполняется всегда. Поэтому запреты без исключений закрывают хуками.', en: 'The agent treats a rule as advice and may break it, while a hook always runs. That is why prohibitions with no exceptions are enforced with hooks.' } },
        ],
        source: { url: 'https://code.claude.com/docs/en/hooks', label: { ru: 'Claude Code: справочник хуков', en: 'Claude Code hooks reference' } },
      },
      {
        slug: 'agent-loop',
        name: { ru: 'Agent loop (цикл агента)', en: 'Agent loop' },
        aka: { ru: 'луп · агентный цикл', en: 'agentic loop' },
        def: {
          ru: 'Agent loop (цикл агента) — повторяющийся ход работы агента: подумать, вызвать тул, посмотреть результат и снова подумать. Цикл идёт, пока задача не решена или агенту не нужна помощь человека.',
          en: 'An agent loop is the repeating rhythm of an agent’s work: think, call a tool, look at the result, think again. The loop runs until the task is solved or the agent needs a human.',
        },
        match: { ru: ['цикл\\p{L}* агента', 'агентн\\p{L}* цикл\\p{L}*', 'agent loop', 'луп(?:ом|е|ы|ов)?'], en: ['agent loop', 'agentic loop'] },
        related: ['harness', 'tool', 'human-in-the-loop'],
        faq: [
          { q: { ru: 'Agent loop — что это?', en: 'What is the agent loop?' }, a: { ru: 'Повторяющийся ход работы агента: подумать, вызвать инструмент, посмотреть результат и снова подумать.', en: 'The repeating rhythm of an agent’s work: think, call a tool, look at the result and think again.' } },
          { q: { ru: 'Когда цикл агента останавливается?', en: 'When does the agent loop stop?' }, a: { ru: 'Когда задача решена или агенту нужна помощь человека.', en: 'When the task is done or the agent needs a person’s help.' } },
        ],
        source: { url: 'https://arxiv.org/abs/2210.03629', label: { ru: 'Статья ReAct (arXiv)', en: 'ReAct paper (arXiv)' } },
      },
      {
        slug: 'react',
        name: { ru: 'ReAct', en: 'ReAct' },
        aka: { ru: 'Reason + Act, рассуждение и действие', en: 'Reason + Act' },
        def: {
          ru: 'ReAct — схема работы агента, где модель по очереди рассуждает и действует: решает, что сделать, вызывает инструмент, читает результат и снова рассуждает. Только рассуждая, модель выдумывает ответ; только действуя, блуждает без плана; чередуя, приходит к верному ответу. Описана в исследовании 2022 года, на ней держится агентный цикл современных агентов для кода.',
          en: 'ReAct is a way for an agent to work in which the model alternates reasoning and acting: it decides what to do, calls a tool, reads the result and reasons again. Reasoning alone, the model makes the answer up; acting alone, it wanders without a plan; alternating, it gets to the right answer. Described in a 2022 paper; the agent loop of today’s coding agents rests on it.',
        },
        // Регистр важен: поле exact отделяет ReAct (схема агента) от React (библиотека для сайтов)
        match: { ru: ['ReAct'], en: ['ReAct'] },
        exact: 'ReAct',
        related: ['agent-loop', 'tool', 'ai-agent'],
        faq: [
          { q: { ru: 'ReAct — что это?', en: 'What is ReAct?' }, a: { ru: 'Схема работы агента, где модель по очереди рассуждает и действует: решает, что сделать, вызывает инструмент, читает результат и снова рассуждает.', en: 'An agent pattern where the model takes turns reasoning and acting: it decides what to do, calls a tool, reads the result and reasons again.' } },
          { q: { ru: 'Чем ReAct отличается от React?', en: 'How is ReAct different from React?' }, a: { ru: 'ReAct — схема работы ИИ-агента, React — библиотека на JavaScript для страниц сайтов. Совпадает только написание.', en: 'ReAct is an AI agent pattern, React is a JavaScript library for web pages. Only the spelling is similar.' } },
        ],
        source: { url: 'https://arxiv.org/abs/2210.03629', label: { ru: 'Yao и др., «ReAct» (arXiv, 2022)', en: 'Yao et al., “ReAct” (arXiv, 2022)' } },
      },
      {
        slug: 'session',
        name: { ru: 'Сессия', en: 'Session' },
        def: {
          ru: 'Сессия — один непрерывный разговор с агентом: от запуска до выхода или очистки. Всё, что агент узнал за сессию, лежит в его контексте и пропадает с её концом; в следующую сессию переходит только записанное в память и в файлы вроде `CLAUDE.md`. Сам разговор харнесс сохраняет в журнал сессий: из него прошлую сессию можно поднять целиком, в Claude Code — командой `/resume` или `claude --continue`.',
          en: 'Session — one continuous conversation with an agent, from launch to exit or a reset. Everything the agent learned in it sits in its context and is gone when the session ends; only what was written to memory and files like `CLAUDE.md` carries over to the next session. The harness keeps the conversation itself in a session log, from which a past session can be brought back whole; in Claude Code with `/resume` or `claude --continue`.',
        },
        match: { ru: ['сесси\\p{L}*'], en: ['sessions?'] },
        related: ['context', 'memory', 'claude-md'],
        faq: [
          { q: { ru: 'Сессия агента — что это?', en: 'What is an agent session?' }, a: { ru: 'Один непрерывный разговор с агентом: от запуска до выхода или очистки.', en: 'One continuous conversation with an agent: from start to exit or reset.' } },
          { q: { ru: 'Что переходит в следующую сессию?', en: 'What carries over to the next session?' }, a: { ru: 'Только то, что записано в память и в файлы вроде CLAUDE.md. Остальное пропадает вместе с контекстом сессии.', en: 'Only what is written to memory and to files like CLAUDE.md. The rest disappears with the session’s context.' } },
        ],
        source: { url: 'https://code.claude.com/docs/en/sessions', label: { ru: 'Claude Code: управление сессиями', en: 'Claude Code sessions docs' } },
      },
      {
        slug: 'memory',
        name: { ru: 'Память агента', en: 'Agent memory' },
        def: {
          ru: 'Память агента — заметки, которые агент сохраняет между сессиями: правила проекта, найденные ограничения, договорённости. Без памяти каждый новый разговор начинается с чистого листа.',
          en: 'Agent memory — notes an agent keeps between sessions: project rules, constraints it found, agreements. Without memory every new conversation starts from a blank page.',
        },
        match: { ru: ['памят\\p{L}* агента', 'автопамят\\p{L}*'], en: ['agent memory', 'auto memory'] },
        related: ['session', 'context', 'claude-md', 'bible'],
        faq: [
          { q: { ru: 'Память ИИ-агента — что это?', en: 'What is AI agent memory?' }, a: { ru: 'Заметки, которые агент сохраняет между сессиями: правила проекта, найденные ограничения, договорённости.', en: 'Notes the agent keeps between sessions: project rules, discovered constraints, agreements.' } },
          { q: { ru: 'Что будет без памяти?', en: 'What happens without memory?' }, a: { ru: 'Каждый новый разговор начнётся с чистого листа.', en: 'Every new conversation starts from a blank slate.' } },
        ],
        source: { url: 'https://code.claude.com/docs/en/memory', label: { ru: 'Claude Code: память проекта', en: 'Claude Code memory docs' } },
      },
      {
        slug: 'bible',
        name: { ru: 'Библия проекта', en: 'Project bible' },
        def: {
          ru: 'Библия проекта — описание того, как устроен проект и почему: границы систем, договорённости, принципы и ценности — что важнее при выборе и чего нельзя ни при каких условиях. Агент читает её перед работой, а вы не повторяете одно и то же в каждой задаче. Конкретные указания «делай так, не делай этого» из неё выводят в правила. Библия лежит в `CLAUDE.md` для Claude Code или в `AGENTS.md` для Codex и Cursor, либо в отдельных файлах, на которые они ссылаются.',
          en: 'A project bible is a description of how the project is built and why: system boundaries, agreements, principles and values: what matters more when choosing and what is never allowed. The agent reads it before working, so you do not repeat yourself in every task. Concrete do and do-not instructions are derived from it into rules. The bible lives in `CLAUDE.md` for Claude Code or `AGENTS.md` for Codex and Cursor, or in separate files they point to.',
        },
        match: { ru: ['библи\\p{L}* проекта'], en: ['project bible'] },
        related: ['rules', 'claude-md', 'agents-md', 'memory'],
        faq: [
          { q: { ru: 'Библия проекта — что это?', en: 'What is a project bible?' }, a: { ru: 'Описание того, как устроен проект и почему: границы систем, договорённости, принципы и ценности. Агент читает её перед работой.', en: 'A description of how the project is built and why: system boundaries, agreements, principles and values. The agent reads it before working.' } },
          { q: { ru: 'Где хранить библию проекта?', en: 'Where do you keep a project bible?' }, a: { ru: 'В CLAUDE.md для Claude Code или в AGENTS.md для Codex и Cursor, либо в отдельных файлах рядом.', en: 'In CLAUDE.md for Claude Code or AGENTS.md for Codex and Cursor, or in separate files next to them.' } },
        ],
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
          ru: 'Правила агента — короткие указания агенту «делай так, не делай этого», которые харнесс подгружает в его контекст: всегда или только когда агент трогает нужные файлы. Это общая концепция: в Claude Code правила лежат в `CLAUDE.md` и папке `.claude/rules`, в Cursor — в `.cursor/rules`, в Codex — в `AGENTS.md`. Правило агент воспринимает как совет; запрет без исключений закрывают хуком.',
          en: 'Agent rules — short do and do-not instructions the harness loads into the agent context: always, or only when the agent touches matching files. It is a common concept: in Claude Code rules live in `CLAUDE.md` and the `.claude/rules` folder, in Cursor in `.cursor/rules`, in Codex in `AGENTS.md`. The agent treats a rule as advice; a no-exceptions prohibition is enforced with a hook.',
        },
        match: { ru: ['правил\\p{L}* агента', 'рул\\p{L}*'], en: ['agent rules?'] },
        related: ['bible', 'hooks', 'claude-md', 'agents-md'],
        faq: [
          { q: { ru: 'Правила агента — что это?', en: 'What are agent rules?' }, a: { ru: 'Короткие указания «делай так, не делай этого», которые харнесс подгружает в контекст агента всегда или когда агент трогает нужные файлы.', en: 'Short “do this, don’t do that” instructions the harness loads into the agent’s context always or when the agent touches matching files.' } },
          { q: { ru: 'Где лежат правила агента?', en: 'Where do agent rules live?' }, a: { ru: 'В Claude Code — в CLAUDE.md и правилах по путям, у Cursor — в .cursor/rules, у других агентов — в AGENTS.md.', en: 'In Claude Code in CLAUDE.md and path rules, in Cursor in .cursor/rules, and for other agents in AGENTS.md.' } },
        ],
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
          ru: 'Статические проверки — тесты, линтеры, сборка и другие автоматические сверки, которыми подтверждается результат агента до того, как на него посмотрит человек. Проверка, которую агент может запустить сам, возвращает ему ошибки и заставляет исправлять их без вас.',
          en: 'Static checks — tests, linters, builds and other automatic verifications that confirm the agent’s result before a person looks at it. A check the agent can run itself feeds errors back and makes it fix them without you.',
        },
        match: { ru: ['автопроверк\\p{L}*', 'самопроверк\\p{L}*', 'статическ\\p{L}* проверк\\p{L}*', 'статтест\\p{L}*'], en: ['self-checks?', 'automated checks?', 'static checks?'] },
        related: ['harness', 'hooks', 'human-in-the-loop'],
        faq: [
          { q: { ru: 'Что такое статические проверки для агента?', en: 'What are static checks for an agent?' }, a: { ru: 'Тесты, линтеры, сборка и другие автоматические сверки, которыми подтверждают результат агента до того, как на него посмотрит человек.', en: 'Tests, linters, builds and other automatic checks that confirm the agent’s result before a person looks at it.' } },
          { q: { ru: 'Зачем агенту запускать проверки самому?', en: 'Why should the agent run checks itself?' }, a: { ru: 'Проверка, которую агент запускает сам, возвращает ему ошибки, и он чинит их до того, как отдать работу.', en: 'A check the agent runs itself returns errors to it, and it fixes them before handing over the work.' } },
        ],
        source: { url: 'https://en.wikipedia.org/wiki/Static_program_analysis', label: { ru: 'Википедия: статический анализ кода', en: 'Wikipedia: Static program analysis' } },
      },
      {
        slug: 'orchestration',
        name: { ru: 'Оркестрация', en: 'Orchestration' },
        def: {
          ru: 'Оркестрация — управление несколькими шагами или несколькими агентами: кто за что отвечает, в каком порядке работает и как результаты передаются дальше — через файлы, через итог субагента или сообщениями между сессиями.',
          en: 'Orchestration — managing several steps or several agents: who is responsible for what, in which order they work and how results are passed on, through files, a subagent result or cross-session messaging.',
        },
        match: { ru: ['оркестраци\\p{L}*'], en: ['orchestrat\\p{L}*'] },
        related: ['session-messaging', 'subagent', 'ai-agent', 'harness'],
        faq: [
          { q: { ru: 'Оркестрация агентов — что это?', en: 'What is agent orchestration?' }, a: { ru: 'Управление несколькими шагами или агентами: кто за что отвечает, в каком порядке работает и как передаёт результат дальше.', en: 'Managing several steps or agents: who is responsible for what, in which order they work and how results move on.' } },
          { q: { ru: 'Как агенты передают результат друг другу?', en: 'How do agents pass results to each other?' }, a: { ru: 'Через файлы, через итог субагента или сообщениями между сессиями.', en: 'Through files, through a subagent’s result or with cross-session messages.' } },
        ],
        source: { url: 'https://www.anthropic.com/engineering/multi-agent-research-system', label: { ru: 'Anthropic: мультиагентная система исследований', en: 'Anthropic: Multi-agent research system' } },
      },
      {
        slug: 'session-messaging',
        name: { ru: 'Сообщения между сессиями', en: 'Cross-session messaging' },
        def: {
          ru: 'Сообщения между сессиями — способ, которым параллельные сессии агентов передают друг другу текст: одна находит другую по имени и отправляет сообщение, та читает его на своём следующем шаге. В Claude Code так работают сообщения между сессиями и экспериментальные команды агентов; в Cursor похожую роль играет передача работы между локальным и облачным агентом. Так оркестрация обходится без человека-посредника, который копирует ответы из окна в окно.',
          en: 'Cross-session messaging is a way for parallel agent sessions to pass text to each other: one finds another by name and sends a message, and the other reads it on its next step. In Claude Code this is cross-session messaging and the experimental agent teams; in Cursor the handoff between local and cloud agents plays a similar role. Orchestration then works without a human copying answers between windows.',
        },
        match: { ru: ['сообщени\\p{L}* между сесси\\p{L}*'], en: ['cross-session messag\\p{L}*'] },
        related: ['orchestration', 'session', 'subagent'],
        faq: [
          { q: { ru: 'Что такое сообщения между сессиями?', en: 'What is cross-session messaging?' }, a: { ru: 'Способ, которым параллельные сессии агентов передают друг другу текст: одна находит другую по имени и отправляет сообщение.', en: 'A way for parallel agent sessions to pass text to each other: one finds another by name and sends a message.' } },
          { q: { ru: 'Зачем сообщения между сессиями?', en: 'Why use cross-session messaging?' }, a: { ru: 'Так оркестрация нескольких агентов обходится без человека-посредника, который копирует текст из одного окна в другое.', en: 'This way orchestrating several agents needs no person in the middle copying text from one window to another.' } },
        ],
        source: { url: 'https://code.claude.com/docs/en/agent-teams', label: { ru: 'Claude Code: команды агентов', en: 'Claude Code agent teams docs' } },
      },
      {
        slug: 'tracing',
        name: { ru: 'Логи и трассировка', en: 'Logs and tracing' },
        def: {
          ru: 'Логи и трассировка — запись каждого шага агента: что он прочитал, какие инструменты вызвал и что получил в ответ. По ней видно, где агент свернул не туда, и можно повторить разбор.',
          en: 'Logs and tracing is a record of each agent step: what it read, which tools it called and what came back. It shows where the agent took a wrong turn and lets you replay the analysis.',
        },
        match: { ru: ['трассировк\\p{L}*'], en: ['tracing', 'agent traces?'] },
        related: ['harness', 'tool', 'human-in-the-loop'],
        faq: [
          { q: { ru: 'Трассировка агента — что это?', en: 'What is agent tracing?' }, a: { ru: 'Запись каждого шага агента: что он прочитал, какие инструменты вызвал и что получил в ответ.', en: 'A record of every agent step: what it read, which tools it called and what came back.' } },
          { q: { ru: 'Зачем логи и трассировка?', en: 'Why logs and tracing?' }, a: { ru: 'По ним видно, где агент свернул не туда, и разбор можно повторить.', en: 'They show where the agent went wrong, and the analysis can be repeated.' } },
        ],
        source: { url: 'https://opentelemetry.io/docs/concepts/signals/traces/', label: { ru: 'OpenTelemetry: трассировки', en: 'OpenTelemetry: Traces' } },
      },
      {
        slug: 'claude-md',
        name: { ru: 'CLAUDE.md', en: 'CLAUDE.md' },
        def: {
          ru: 'CLAUDE.md — файл в корне проекта с постоянными инструкциями для Claude Code: структура проекта, команды сборки и тестов, соглашения. Попадает в контекст агента в начале каждой сессии.',
          en: 'CLAUDE.md is a file in the project root with standing instructions for Claude Code: project layout, build and test commands, conventions. It enters the agent’s context at the start of every session.',
        },
        match: { ru: ['CLAUDE\\.md'], en: ['CLAUDE\\.md'] },
        related: ['agents-md', 'agent-skills', 'claude-code'],
        faq: [
          { q: { ru: 'CLAUDE.md — что это?', en: 'What is CLAUDE.md?' }, a: { ru: 'Файл в корне проекта с постоянными инструкциями для Claude Code: структура проекта, команды сборки и тестов, соглашения.', en: 'A file in the project root with standing instructions for Claude Code: project structure, build and test commands, conventions.' } },
          { q: { ru: 'Когда Claude Code читает CLAUDE.md?', en: 'When does Claude Code read CLAUDE.md?' }, a: { ru: 'В начале каждой сессии: файл попадает в контекст агента.', en: 'At the start of every session: the file goes into the agent’s context.' } },
        ],
        source: { url: 'https://code.claude.com/docs/en/memory', label: { ru: 'Claude Code: CLAUDE.md и память', en: 'Claude Code CLAUDE.md docs' } },
      },
      {
        slug: 'agents-md',
        name: { ru: 'AGENTS.md', en: 'AGENTS.md' },
        def: {
          ru: 'AGENTS.md — общий для разных агентов файл с инструкциями по проекту. Его читают Codex, Cursor и другие агенты, поэтому он служит нейтральной альтернативой `CLAUDE.md`.',
          en: 'AGENTS.md is a shared instructions file for a project that many agents read. Codex, Cursor and others use it, so it is a vendor-neutral counterpart of `CLAUDE.md`.',
        },
        match: { ru: ['AGENTS\\.md'], en: ['AGENTS\\.md'] },
        related: ['claude-md', 'codex', 'cursor'],
        faq: [
          { q: { ru: 'AGENTS.md — что это?', en: 'What is AGENTS.md?' }, a: { ru: 'Общий для разных агентов файл с инструкциями по проекту: команды, стиль, запреты.', en: 'A shared instruction file for different agents: commands, style, prohibitions.' } },
          { q: { ru: 'Какие агенты читают AGENTS.md?', en: 'Which agents read AGENTS.md?' }, a: { ru: 'Codex, Cursor и другие агенты, поэтому файл служит нейтральной альтернативой CLAUDE.md.', en: 'Codex, Cursor and other agents, so the file serves as a neutral alternative to CLAUDE.md.' } },
          { q: { ru: 'AGENTS.md или Cursor rules?', en: 'AGENTS.md or Cursor rules?' }, a: { ru: 'Cursor читает оба. AGENTS.md — общий файл для разных агентов, в корне и во вложенных папках; правила в .cursor/rules — только для Cursor, зато их можно подключать всегда, по описанию, по шаблону файлов или вручную.', en: 'Cursor reads both. AGENTS.md is a shared file for different agents, at the root and in subfolders; rules in .cursor/rules are Cursor-only but can apply always, by description, by file pattern or manually.' } },
          { q: { ru: 'Чем AGENTS.md отличается от spec.md?', en: 'How is AGENTS.md different from spec.md?' }, a: { ru: 'AGENTS.md задаёт правила на весь проект и попадает в каждую сессию агента. spec.md описывает одну задачу — требования и признаки готовности — и нужен, пока задача не закрыта.', en: 'AGENTS.md sets rules for the whole project and enters every agent session. spec.md describes one task — requirements and done criteria — and lives until the task is closed.' } },
        ],
        source: { url: 'https://agents.md/', label: { ru: 'Официальный сайт AGENTS.md', en: 'AGENTS.md official site' } },
        seo: {
          title: { ru: 'AGENTS.md: что это и чем отличается от правил Cursor (.cursor/rules) и CLAUDE.md', en: 'AGENTS.md vs Cursor rules vs CLAUDE.md: what each file does' },
          description: {
            ru: 'AGENTS.md — общий файл инструкций для Codex, Cursor и других агентов. Чем он отличается от правил Cursor в .cursor/rules и от CLAUDE.md, где лежат и когда агент их читает.',
            en: 'AGENTS.md is a shared instructions file for Codex, Cursor and other agents. How it differs from Cursor rules in .cursor/rules and from CLAUDE.md, where each lives and when the agent reads it.',
          },
        },
        more: { post: 'specs-rules-skills', label: { ru: 'AGENTS.md, CLAUDE.md и spec.md: что куда класть', en: 'AGENTS.md, CLAUDE.md and spec.md: what goes where' } },
      },
      {
        slug: 'agent-skills',
        name: { ru: 'Скилл', en: 'Skill' },
        aka: { ru: 'Agent Skills', en: 'skills' },
        def: {
          ru: 'Скилл — папка с файлом `SKILL.md`: инструкция и вспомогательные файлы для одной повторяющейся задачи, например отчёта или миграции. В начале сессии агент видит только название и описание скилла, а целиком подгружает его, когда задача подходит, поэтому место в контексте не тратится заранее.',
          en: 'A skill is a folder with a `SKILL.md` file: instructions and helper files for one recurring task, such as a report or a migration. At the start of a session the agent sees only the skill name and description and loads the whole skill when the task fits, so context space is not spent in advance.',
        },
        match: { ru: ['скилл\\p{L}*', 'Agent Skills'], en: ['Agent Skills', 'skills?'] },
        related: ['claude-md', 'harness', 'claude-code'],
        faq: [
          { q: { ru: 'Скилл ИИ-агента — что это?', en: 'What is an AI agent skill?' }, a: { ru: 'Папка с файлом SKILL.md: инструкция и вспомогательные файлы для одной повторяющейся задачи, например отчёта или миграции.', en: 'A folder with a SKILL.md file: instructions and helper files for one repeating task, such as a report or a migration.' } },
          { q: { ru: 'Почему скиллы не тратят контекст?', en: 'Why don’t skills use up the context?' }, a: { ru: 'В начале сессии агент видит только название и описание скилла, а целиком подгружает его, когда задача подходит.', en: 'At the start of a session the agent sees only the skill’s name and description, and loads it fully when a task matches.' } },
        ],
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
          ru: 'MCP — открытый протокол, по которому агент подключается к внешним сервисам — Jira, Airtable, базам данных — через единый интерфейс. Сервер MCP предлагает агенту набор инструментов, а права доступа остаются за вами.',
          en: 'MCP is an open protocol through which an agent connects to outside services — Jira, Airtable, databases — via one interface. An MCP server offers the agent a set of tools, while permissions stay with you.',
        },
        match: { ru: ['Model Context Protocol', 'MCP'], en: ['Model Context Protocol', 'MCP'] },
        related: ['mcp-scope', 'prompt-injection', 'claude-code'],
        faq: [
          { q: { ru: 'MCP — что это простыми словами?', en: 'What is MCP in plain words?' }, a: { ru: 'Открытый протокол, по которому агент подключается к внешним сервисам — Jira, базам данных — через единый интерфейс.', en: 'An open protocol that connects an agent to outside services like Jira or databases through one interface.' } },
          { q: { ru: 'Кто управляет правами при подключении через MCP?', en: 'Who controls permissions over MCP?' }, a: { ru: 'Вы: MCP-сервер предлагает агенту набор инструментов, а права доступа задаются на стороне сервера.', en: 'You do: the MCP server offers the agent a set of tools, and access rights are set on the server side.' } },
        ],
        source: { url: 'https://modelcontextprotocol.io/', label: { ru: 'Официальный сайт MCP', en: 'Model Context Protocol site' } },
        more: { post: 'mcp-agent-access', label: { ru: 'MCP для ИИ-агента: какую проблему решает и как поручить подключение агенту', en: 'MCP for an AI agent: what problem it solves and how to delegate setup to the agent' } },
      },
      {
        slug: 'mcp-client',
        name: { ru: 'MCP-клиент', en: 'MCP client' },
        def: {
          ru: 'MCP-клиент — часть на стороне агента: обращается к MCP-серверу системы, просит данные и вызывает инструменты. Встроена в харнесс, например в Claude Code.',
          en: 'MCP client is the part on the agent side: it calls a system’s MCP server, asks for data and invokes tools. It is built into the harness, for example Claude Code.',
        },
        match: { ru: ['MCP-клиент\\p{L}*'], en: ['MCP clients?'] },
        related: ['mcp', 'mcp-server', 'harness'],
        faq: [
          { q: { ru: 'MCP-клиент — что это?', en: 'What is an MCP client?' }, a: { ru: 'Часть на стороне агента, которая обращается к MCP-серверу системы, просит данные и вызывает инструменты.', en: 'The part on the agent’s side that talks to a system’s MCP server, asks for data and calls tools.' } },
          { q: { ru: 'Где находится MCP-клиент?', en: 'Where is the MCP client?' }, a: { ru: 'Он встроен в харнесс, например в Claude Code.', en: 'It is built into the harness, for example Claude Code.' } },
        ],
        source: { url: 'https://modelcontextprotocol.io/docs/learn/client-concepts', label: { ru: 'MCP: устройство клиентов', en: 'MCP: Understanding clients' } },
      },
      {
        slug: 'mcp-server',
        name: { ru: 'MCP-сервер', en: 'MCP server' },
        def: {
          ru: 'MCP-сервер — часть на стороне системы (Jira, GitLab, базы): отдаёт данные и принимает действия от агента по единому протоколу. Права доступа задаются на этой стороне.',
          en: 'MCP server is the part on the system side (Jira, GitLab, a database): it serves data and accepts actions from the agent over one protocol. Permissions are set on this side.',
        },
        match: { ru: ['MCP-сервер\\p{L}*'], en: ['MCP servers?'] },
        related: ['mcp', 'mcp-client', 'mcp-scope'],
        faq: [
          { q: { ru: 'MCP-сервер — что это?', en: 'What is an MCP server?' }, a: { ru: 'Часть на стороне системы (Jira, GitLab, базы данных), которая отдаёт данные и принимает действия агента по единому протоколу.', en: 'The part on a system’s side (Jira, GitLab, databases) that serves data and accepts agent actions over one protocol.' } },
          { q: { ru: 'Где задаются права MCP-сервера?', en: 'Where are MCP server permissions set?' }, a: { ru: 'На стороне сервера: он решает, что агенту можно читать и что менять.', en: 'On the server side: it decides what the agent may read and what it may change.' } },
        ],
        source: { url: 'https://modelcontextprotocol.io/docs/learn/server-concepts', label: { ru: 'MCP: устройство серверов', en: 'MCP: Understanding servers' } },
        more: { post: 'mcp-1c', label: { ru: 'MCP-сервер для 1С: как пустить ИИ-агента к базе и не сломать её', en: 'MCP server for 1C: letting an AI agent into the database without breaking it' } },
      },
      {
        slug: 'oauth',
        name: { ru: 'OAuth', en: 'OAuth' },
        def: {
          ru: 'OAuth — вход через браузер: когда агент подключается к сервису, харнесс открывает страницу входа этого сервиса, вы вводите пароль там и подтверждаете доступ, а агент получает токен. Пароль агент не видит; токен ограничен выданными правами, и его можно отозвать. Так MCP-серверы подключают, например, к Jira и Sentry.',
          en: 'OAuth — sign-in through the browser: when the agent connects to a service, the harness opens that service sign-in page, you type the password there and approve access, and the agent gets a token. The agent never sees the password; the token is limited to the granted permissions and can be revoked. This is how MCP servers connect to Jira and Sentry, for example.',
        },
        match: { ru: ['OAuth(?: 2\\.0)?'], en: ['OAuth(?: 2\\.0)?'] },
        related: ['mcp', 'token'],
        faq: [
          { q: { ru: 'Как работает OAuth для агента?', en: 'How does OAuth work for an agent?' }, a: { ru: 'Харнесс открывает страницу входа сервиса, вы вводите пароль там и подтверждаете доступ, а агент получает токен.', en: 'The harness opens the service’s sign-in page, you enter the password there and confirm access, and the agent gets a token.' } },
          { q: { ru: 'Видит ли агент мой пароль при OAuth?', en: 'Does the agent see my password with OAuth?' }, a: { ru: 'Нет. Агент получает только токен, ограниченный выданными правами, и его можно отозвать.', en: 'No. The agent gets only a token limited to the rights you granted, and it can be revoked.' } },
        ],
        source: { url: 'https://modelcontextprotocol.io/specification/latest/basic/authorization', label: { ru: 'Спецификация MCP: авторизация', en: 'MCP spec: Authorization' } },
      },
      {
        slug: 'mcp-scope',
        name: { ru: 'Уровни MCP-серверов', en: 'MCP server scopes' },
        aka: { ru: 'scope: local · project · user', en: 'scope: local · project · user' },
        def: {
          ru: 'Уровни MCP-серверов отвечают на два вопроса: в каких проектах работает MCP-сервер и кто его видит. В Claude Code их три, уровень выбирают при добавлении сервера: `local` — по умолчанию, только вы и текущий проект; `project` — вся команда через файл `.mcp.json` в репозитории, в интерактивной сессии каждый подтверждает сервер перед первым запуском (в `claude -p`, Agent SDK и облачных сессиях сервер загружается без вопроса); `user` — только вы и все ваши проекты. При совпадении имён берётся запись верхнего слоя целиком: `local` перекрывает `project`, `project` — `user`.',
          en: 'MCP server scopes answer two questions: which projects an MCP server works in and who sees it. Claude Code has three, chosen when you add a server: `local`, the default, only you and the current `project`; `project`, the whole team through a `.mcp.json` file in the repo, each person approves the server before first use in an interactive session (in `claude -p`, the Agent SDK and cloud sessions it loads without a prompt); `user`, only you and all your projects. On a name clash the upper layer wins entirely: `local` overrides `project`, `project` overrides `user`.',
        },
        match: { ru: ['уровн\\p{L}* MCP-сервер\\p{L}*', 'област\\p{L}* MCP', 'MCP scope'], en: ['MCP server scopes?', 'MCP scopes?'] },
        related: ['mcp', 'claude-code'],
        faq: [
          { q: { ru: 'Какие уровни MCP есть в Claude Code?', en: 'What MCP scopes does Claude Code have?' }, a: { ru: 'Три: local — только вы и текущий проект, project — вся команда через файл в репозитории, user — вы во всех проектах.', en: 'Three: local for you in the current project, project for the whole team through a file in the repo, and user for you across all projects.' } },
          { q: { ru: 'Когда выбирают уровень MCP-сервера?', en: 'When do you pick an MCP server scope?' }, a: { ru: 'При добавлении сервера; по умолчанию стоит local.', en: 'When adding the server; the default is local.' } },
        ],
        source: { url: 'https://code.claude.com/docs/en/mcp', label: { ru: 'Claude Code: подключение MCP', en: 'Claude Code MCP docs' } },
        table: {
          title: { ru: 'Три уровня рядом', en: 'The three scopes side by side' },
          head: { ru: ['local', 'project', 'user'], en: ['local', 'project', 'user'] },
          rows: [
            { ru: ['Кто видит', 'только вы', 'вся команда', 'только вы'], en: ['Who sees it', 'only you', 'the whole team', 'only you'] },
            { ru: ['В каких проектах', 'в текущем', 'в этом репозитории', 'во всех ваших'], en: ['In which projects', 'the current one', 'this repository', 'all of yours'] },
            { ru: ['Где хранится', '`~/.claude.json`, под путём проекта', '`.mcp.json` в корне репозитория', '`~/.claude.json`, общий раздел'], en: ['Where it is stored', '`~/.claude.json`, under the project path', '`.mcp.json` at the repo root', '`~/.claude.json`, shared section'] },
            { ru: ['Как добавить', '`claude mcp add` по умолчанию', '`claude mcp add --scope project`', '`claude mcp add --scope user`'], en: ['How to add', '`claude mcp add` by default', '`claude mcp add --scope project`', '`claude mcp add --scope user`'] },
            { ru: ['Перед запуском', 'ничего', 'каждый подтверждает сервер в интерактивной сессии', 'ничего'], en: ['Before first use', 'nothing', 'everyone approves the server in an interactive session', 'nothing'] },
            { ru: ['При совпадении имён', 'перекрывает `project` и `user`', 'перекрывает `user`', 'уступает остальным'], en: ['On a name clash', 'overrides `project` and `user`', 'overrides `user`', 'yields to the others'] },
          ],
        },
      },
      {
        slug: 'prompt-injection',
        name: { ru: 'Prompt injection', en: 'Prompt injection' },
        aka: { ru: 'инъекция в промпт', en: 'prompt injection' },
        def: {
          ru: 'Prompt injection — атака, при которой злоумышленник прячет в своём тексте — письме, тикете, веб-странице — инструкцию для агента. Агент читает её вместе с данными, принимает за часть запроса, и его поведение подменяется: он делает то, что нужно злоумышленнику, а не вам. Чем больше доступа у агента, тем дороже такая подмена.',
          en: 'Prompt injection is an attack where someone hides an instruction for the agent inside their own text: an email, a ticket, a web page. The agent reads it along with the data, takes it as part of the request, and its behaviour is swapped: it does what the attacker wants instead of what you asked. The more access the agent has, the costlier the swap.',
        },
        match: { ru: ['prompt injection'], en: ['prompt injection'] },
        related: ['mcp', 'human-in-the-loop', 'planes'],
        faq: [
          { q: { ru: 'Prompt injection — что это?', en: 'What is prompt injection?' }, a: { ru: 'Атака, при которой в письме, тикете или веб-странице прячут инструкцию для агента, и агент принимает её за часть запроса.', en: 'An attack that hides an instruction for the agent in an email, ticket or web page, and the agent takes it as part of the request.' } },
          { q: { ru: 'Как защититься от prompt injection?', en: 'How do you defend against prompt injection?' }, a: { ru: 'Держать чужой текст в плоскости данных, чтобы он не стал командой, и давать агенту минимум прав.', en: 'Keep outside text in the data plane so it cannot become a command, and give the agent minimal permissions.' } },
        ],
        source: { url: 'https://genai.owasp.org/llmrisk/llm01-prompt-injection/', label: { ru: 'OWASP LLM01: промпт-инъекция', en: 'OWASP LLM01: Prompt Injection' } },
      },
      {
        slug: 'planes',
        name: { ru: 'Data plane и control plane', en: 'Data plane and control plane' },
        aka: { ru: 'плоскость данных и плоскость управления', en: 'data and control planes' },
        def: {
          ru: 'Data plane и control plane — две плоскости работы системы: control plane (плоскость управления) решает, что и куда делать, а data plane (плоскость данных) делает это с самими данными. Термины пришли из сетей: в маршрутизаторе control plane строит таблицу маршрутов, а data plane пересылает пакеты. У ИИ-агента control plane — ваши сообщения и правила, data plane — всё, что он читает: страницы, тикеты, документы и ответы серверов. Защита от prompt injection держит чужой текст в плоскости данных, чтобы он не стал командой.',
          en: 'Data plane and control plane — two planes of how a system works: the control plane decides what to do and where, and the data plane does it to the data itself. The terms come from networking: in a router the control plane builds the routing table and the data plane forwards packets. For an AI agent the control plane is your messages and rules, and the data plane is everything it reads: pages, tickets, documents and server replies. Defence against prompt injection keeps foreign text in the data plane so it never becomes a command.',
        },
        match: { ru: ['(?:data|control) plane'], en: ['(?:data|control) plane'] },
        related: ['prompt-injection', 'mcp', 'kubernetes', 'k8s-node'],
        faq: [
          { q: { ru: 'Data plane — это что?', en: 'What is the data plane?' }, a: { ru: 'Плоскость данных — часть системы, которая работает с самими данными: в сети пересылает пакеты, в Kubernetes это узлы с подами. У ИИ-агента это всё, что он читает: страницы, тикеты, документы и ответы серверов.', en: 'The data plane is the part of a system that handles the data itself: in a network it forwards packets, in Kubernetes it is the nodes with pods. For an AI agent it is everything it reads: pages, tickets, documents and server replies.' } },
          { q: { ru: 'Чем control plane отличается от data plane?', en: 'How is the control plane different from the data plane?' }, a: { ru: 'Control plane — команды, то есть ваши сообщения и правила. Data plane — данные. Защита от prompt injection не даёт чужому тексту из данных стать командой.', en: 'The control plane is commands, meaning your messages and rules. The data plane is data. Prompt injection protection keeps outside text in the data from becoming a command.' } },
        ],
        source: { url: 'https://en.wikipedia.org/wiki/Control_plane', label: { ru: 'Википедия: control plane', en: 'Wikipedia: Control plane' } },
        seo: {
          title: { ru: 'Data plane и control plane: что это — в сетях, Kubernetes и ИИ-агентах', en: 'What are the data plane and control plane: networks, Kubernetes and AI agents' },
          description: {
            ru: 'Control plane решает, что и куда делать, data plane выполняет это с данными. Как плоскости устроены в маршрутизаторе, в кластере Kubernetes и у ИИ-агента, и при чём тут prompt injection.',
            en: 'The control plane decides what to do and where; the data plane does it to the data. How the planes work in a router, a Kubernetes cluster and an AI agent, and how they relate to prompt injection.',
          },
        },
        compare: {
          title: { ru: 'Две плоскости в сети, Kubernetes и ИИ-агенте', en: 'The two planes in a network, Kubernetes and an AI agent' },
          head: { ru: ['Сеть', 'Kubernetes', 'ИИ-агент'], en: ['Network', 'Kubernetes', 'AI agent'] },
          rows: [
            { ru: ['Control plane', 'таблица маршрутов: куда слать пакеты', 'управляющие компоненты кластера: что и где запустить', 'ваши сообщения и правила'], en: ['Control plane', 'the routing table: where to send packets', 'the cluster’s control components: what to run and where', 'your messages and rules'] },
            { ru: ['Data plane', 'пересылка самих пакетов', 'узлы, где работают поды с приложениями', 'страницы, тикеты, документы, ответы серверов'], en: ['Data plane', 'forwarding the packets themselves', 'the nodes where pods with apps run', 'pages, tickets, documents, server replies'] },          ],
        },
      },
      {
        slug: 'permissions',
        name: { ru: 'Права доступа', en: 'Permissions' },
        aka: { ru: 'права ИИ-агента, разрешения, принцип минимальных привилегий', en: 'AI agent permissions, permission modes, least privilege' },
        def: {
          ru: 'Права доступа ИИ-агента — что ему разрешено делать в вашей среде и подключённых системах: только читать или ещё и писать, какие команды запускать. В Claude Code и Codex это режимы разрешений: от вопроса перед каждым действием до работы без подтверждений. Действует принцип минимальных привилегий: агент получает ровно те права, что нужны для задачи, и их повышают по ступеням.',
          en: 'Permissions — AI agent permissions define what the agent may do in your environment and connected systems: only read or write as well, and which commands to run. In Claude Code and Codex these are permission modes: from asking before every action to working without confirmations. The principle of least privilege applies: the agent gets exactly the rights the task needs, raised step by step.',
        },
        match: { ru: ['прав\\p{L}* доступа', 'права на (?:чтение|запись)', 'прав\\p{L}* ИИ-агент\\p{L}*', 'принцип\\p{L}* минимальных привилегий'], en: ['permissions?', 'access rights?', 'least privilege'] },
        related: ['mcp-scope', 'prompt-injection', 'tool', 'sandbox', 'human-in-the-loop'],
        faq: [
          { q: { ru: 'Какие права давать ИИ-агенту?', en: 'What permissions should an AI agent get?' }, a: { ru: 'Ровно те, что нужны для задачи, по принципу минимальных привилегий, и повышать их по ступеням.', en: 'Exactly what the task needs, following the principle of least privilege, raising them step by step.' } },
          { q: { ru: 'Какие режимы разрешений есть в Claude Code и Codex?', en: 'What permission modes do Claude Code and Codex have?' }, a: { ru: 'От вопроса перед каждым действием до работы без подтверждений; между ними — режимы, где агент сам делает безопасные шаги.', en: 'From asking before every action to working without confirmations; in between are modes where the agent takes safe steps on its own.' } },
        ],
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
          ru: 'Jira — система учёта задач и ошибок от Atlassian. Агент через MCP читает задачи вместе с комментариями и историей изменений, а писать может в пределах прав вашего входа; Claude Code перед записью спрашивает разрешение, пока вы его не дали заранее.',
          en: 'Jira is a task and bug tracker from Atlassian. Through MCP an agent reads tasks with their comments and change history, and may write within the rights of your sign-in; Claude Code asks before writing unless you allowed it in advance.',
        },
        match: { ru: ['Jira'], en: ['Jira'] },
        related: ['atlassian', 'mcp', 'mcp-server', 'ai-agent'],
        faq: [
          { q: { ru: 'Как ИИ-агент работает с Jira?', en: 'How does an AI agent work with Jira?' }, a: { ru: 'Через MCP читает задачи вместе с комментариями и историей изменений.', en: 'Over MCP it reads tickets together with comments and change history.' } },
          { q: { ru: 'Может ли агент менять задачи в Jira?', en: 'Can the agent change Jira tickets?' }, a: { ru: 'Да, в пределах прав входа или токена, под которым он работает. Claude Code спрашивает разрешение перед каждым действием, пока его не разрешили заранее.', en: 'Yes, within the rights of the sign-in or token it uses. Claude Code asks before acting unless you allowed it in advance.' } },
        ],
        source: { url: 'https://www.atlassian.com/software/jira', label: { ru: 'Официальная страница Jira', en: 'Jira official page' } },
        more: { post: 'jira-ai-agent-boundaries', label: { ru: 'Jira и ИИ-агент: плюсы, минусы и где провести границу', en: 'Jira and an AI agent: pros, cons and where to draw the line' } },
      },
      {
        slug: 'sentry',
        name: { ru: 'Sentry', en: 'Sentry' },
        def: {
          ru: 'Sentry — сервис мониторинга ошибок: собирает исключения из приложения вместе с контекстом. Каждая ошибка помечена версией приложения, в которой она случилась, поэтому агент через MCP видит, с какого выката она началась, и ищет причину в изменениях именно этой версии.',
          en: 'Sentry is an error-monitoring service that collects exceptions from the app with context. Every error is tagged with the app version it happened in, so through MCP the agent sees which deploy it started with and looks for the cause in that version changes.',
        },
        match: { ru: ['Sentry'], en: ['Sentry'] },
        related: ['mcp', 'grafana', 'oauth'],
        faq: [
          { q: { ru: 'Sentry — что это?', en: 'What is Sentry?' }, a: { ru: 'Сервис мониторинга ошибок: собирает исключения из приложения вместе с контекстом.', en: 'An error monitoring service: it collects exceptions from the app together with their context.' } },
          { q: { ru: 'Что агент находит в Sentry?', en: 'What does an agent find in Sentry?' }, a: { ru: 'Ошибки помечены версией приложения, поэтому агент видит, с какой выкладки ошибка началась, и ищет причину в этих изменениях.', en: 'Errors are tagged with the app version, so the agent sees which release the error started with and looks for the cause in those changes.' } },
        ],
        source: { url: 'https://sentry.io/welcome/', label: { ru: 'Официальный сайт Sentry', en: 'Sentry official site' } },
      },
      {
        slug: 'grafana',
        name: { ru: 'Grafana', en: 'Grafana' },
        def: {
          ru: 'Grafana — система графиков и дашбордов для метрик и логов. Агент через MCP читает метрики и логи и собирает картину инцидента. Чтобы он ничего не поменял сам, MCP-сервер Grafana запускают с флагом `--disable-write`: тогда агенту доступно только чтение, а создавать и править дашборды, алерты и инциденты он не может.',
          en: 'Grafana is a charts and dashboards system for metrics and logs. Through MCP the agent reads metrics and logs and builds the incident picture. To keep it from changing anything, the Grafana MCP server is started with the `--disable-write` flag: the agent can then only read and cannot create or edit dashboards, alerts or incidents.',
        },
        match: { ru: ['Grafana'], en: ['Grafana'] },
        related: ['mcp', 'sentry', 'mcp-server'],
        faq: [
          { q: { ru: 'Grafana — что это?', en: 'What is Grafana?' }, a: { ru: 'Система графиков и дашбордов для метрик и логов.', en: 'A charts and dashboards system for metrics and logs.' } },
          { q: { ru: 'Как подключить Grafana к агенту только на чтение?', en: 'How do I connect Grafana to an agent read-only?' }, a: { ru: 'Запустить MCP-сервер Grafana с флагом --disable-write: агент читает метрики и логи, но не меняет дашборды, алерты и инциденты.', en: 'Run the Grafana MCP server with the --disable-write flag: the agent reads metrics and logs but cannot change dashboards, alerts or incidents.' } },
        ],
        source: { url: 'https://grafana.com/', label: { ru: 'Официальный сайт Grafana', en: 'Grafana official site' } },
      },
      {
        slug: 'gitlab',
        name: { ru: 'GitLab', en: 'GitLab' },
        def: {
          ru: 'GitLab — платформа для хранения кода и запросов на слияние. Через MCP агент видит код всех проектов сразу и не клонирует их к себе: ищет по проектам, читает файлы, запросы на слияние и ревью из первых рук, а не в пересказе.',
          en: 'GitLab is a platform for code and merge requests. Through MCP the agent sees the code of every project at once without cloning them: it searches across projects and reads files, merge requests and reviews first-hand instead of a retelling.',
        },
        match: { ru: ['GitLab'], en: ['GitLab'] },
        related: ['mcp', 'jira'],
        faq: [
          { q: { ru: 'Что даёт агенту GitLab через MCP?', en: 'What does GitLab over MCP give an agent?' }, a: { ru: 'Агент видит код всех проектов сразу и не клонирует их: ищет по проектам, читает файлы, запросы на слияние и ревью.', en: 'The agent sees the code of all projects at once without cloning them: it searches projects and reads files, merge requests and reviews.' } },
          { q: { ru: 'GitLab — что это?', en: 'What is GitLab?' }, a: { ru: 'Платформа для хранения кода и запросов на слияние.', en: 'A platform for hosting code and merge requests.' } },
        ],
        source: { url: 'https://about.gitlab.com/', label: { ru: 'Официальный сайт GitLab', en: 'GitLab official site' } },
      },
      {
        slug: 'confluence',
        name: { ru: 'Confluence', en: 'Confluence' },
        def: {
          ru: 'Confluence — вики-система Atlassian: база знаний команды. Через MCP агент берёт оттуда статьи и прошлые решения.',
          en: 'Confluence is an Atlassian wiki: the team’s knowledge base. Through MCP an agent pulls articles and past decisions from it.',
        },
        match: { ru: ['Confluence'], en: ['Confluence'] },
        related: ['atlassian', 'mcp', 'jira'],
        faq: [
          { q: { ru: 'Confluence — что это?', en: 'What is Confluence?' }, a: { ru: 'Вики-система Atlassian: база знаний команды.', en: 'Atlassian’s wiki: a team knowledge base.' } },
          { q: { ru: 'Зачем агенту Confluence?', en: 'Why does an agent need Confluence?' }, a: { ru: 'Через MCP агент берёт оттуда статьи и прошлые решения команды.', en: 'Over MCP the agent pulls articles and the team’s past decisions from it.' } },
        ],
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
          ru: 'Harness engineering — общая дисциплина: настраивать харнесс — что агент знает о проекте, какими инструментами владеет, что ему разрешено и как проверяется результат. Охватывает всё окружение сразу, без заданного порядка действий.',
          en: 'Harness engineering is the general discipline of tuning a harness: what the agent knows about the project, which tools it has, what it may do and how the result is checked. It covers the whole environment, with no fixed order of steps.',
        },
        match: { ru: ['harness engineering', 'харнесс-инжиниринг\\p{L}*'], en: ['harness engineering'] },
        related: ['harness', 'hdd'],
        faq: [
          { q: { ru: 'Harness engineering — что это?', en: 'What is harness engineering?' }, a: { ru: 'Дисциплина настройки харнесса: что агент знает о проекте, какими инструментами владеет, что ему разрешено и как проверяется результат.', en: 'The discipline of setting up a harness: what the agent knows about the project, which tools it has, what it may do and how its result is checked.' } },
          { q: { ru: 'Чем harness engineering отличается от HDD?', en: 'How is harness engineering different from HDD?' }, a: { ru: 'Harness engineering охватывает всё окружение без заданного порядка. HDD — один метод внутри неё: каждая ошибка агента становится правилом среды.', en: 'Harness engineering covers the whole environment with no set order. HDD is one method inside it: every agent mistake becomes a rule of the environment.' } },
        ],
        source: { url: 'https://martinfowler.com/articles/harness-engineering.html', label: { ru: 'Бригитта Бёклер, martinfowler.com: harness engineering', en: 'Birgitta Böckeler, martinfowler.com: Harness engineering' } },
      },
      {
        slug: 'hdd',
        name: { ru: 'HDD', en: 'HDD' },
        aka: { ru: 'Harness-Driven Development', en: 'Harness-Driven Development' },
        def: {
          ru: 'HDD — один конкретный метод внутри harness engineering: каждая ошибка агента превращается в правило его среды — инструкцию, проверку или ограничение. Так среда растёт от реальных ошибок, а ошибка не повторяется в следующих запусках.',
          en: 'HDD — one specific method within harness engineering: every agent mistake becomes a rule of its environment — an instruction, a check or a limit. The environment grows from real mistakes and the mistake does not return in later runs.',
        },
        match: { ru: ['HDD', 'Harness-Driven Development'], en: ['HDD', 'Harness-Driven Development'] },
        related: ['harness', 'harness-engineering', 'claude-md'],
        faq: [
          { q: { ru: 'HDD — что это?', en: 'What is HDD?' }, a: { ru: 'Метод внутри harness engineering: каждая ошибка агента превращается в правило его среды — инструкцию, проверку или ограничение.', en: 'A method within harness engineering: every agent mistake turns into a rule of its environment — an instruction, a check or a limit.' } },
          { q: { ru: 'Что даёт HDD?', en: 'What does HDD give you?' }, a: { ru: 'Среда растёт от реальных ошибок, и ошибка не повторяется в следующих запусках.', en: 'The environment grows from real mistakes, and a mistake does not repeat in later runs.' } },
        ],
      },
      {
        slug: 'spec-driven-development',
        name: { ru: 'Spec-Driven Development', en: 'Spec-Driven Development' },
        aka: { ru: 'SDD', en: 'SDD' },
        def: {
          ru: 'Spec-Driven Development (разработка по спецификациям) — подход, где сначала пишется спецификация — что система должна делать, — а код пишет и сверяет с ней агент. Спека становится главным документом, а код — её следствием.',
          en: 'Spec-Driven Development (SDD) is an approach where a specification — what the system must do — is written first, and an agent writes the code and checks it against the spec. The spec becomes the main document and the code its consequence.',
        },
        match: { ru: ['Spec-Driven Development', 'spec-driven development', 'SDD'], en: ['Spec-Driven Development', 'spec-driven development', 'SDD'] },
        related: ['openspec', 'spec-kit', 'reconcile-loop'],
        faq: [
          { q: { ru: 'Spec-Driven Development — что это?', en: 'What is spec-driven development?' }, a: { ru: 'Подход, где сначала пишется спецификация — что система должна делать, — а код по ней пишет и сверяет агент.', en: 'An approach where the specification of what the system must do comes first, and an agent writes and checks the code against it.' } },
          { q: { ru: 'Какие программы есть для Spec-Driven Development?', en: 'Which frameworks support spec-driven development?' }, a: { ru: 'Например, OpenSpec от Fission AI и Spec Kit от GitHub.', en: 'For example, OpenSpec by Fission AI and Spec Kit by GitHub.' } },
          { q: { ru: 'Чем Spec-Driven Development отличается от TDD?', en: 'How is spec-driven development different from TDD?' }, a: { ru: 'В TDD сначала пишут падающий тест на одну функцию, затем код под него. В SDD сначала пишут спеку на всё изменение — требования и сценарии «когда — тогда», а тесты и код агент выводит из неё.', en: 'In TDD you first write a failing test for one function, then the code for it. In SDD you first write a spec for the whole change — requirements and when–then scenarios — and the agent derives the tests and code from it.' } },
          { q: { ru: 'Чем спека отличается от AGENTS.md?', en: 'How is a spec different from AGENTS.md?' }, a: { ru: 'Спека описывает одно изменение и нужна, пока оно не закрыто. AGENTS.md держит правила на весь проект и попадает в каждую сессию агента.', en: 'A spec describes one change and lives until it is closed. AGENTS.md holds rules for the whole project and enters every agent session.' } },
        ],
        source: { url: 'https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/', label: { ru: 'Блог GitHub: разработка от спецификаций', en: 'GitHub Blog: Spec-driven development' } },
        seo: {
          title: { ru: 'Spec-Driven Development (SDD): что это, как работает и какие программы есть', en: 'What is spec-driven development (SDD): how it works and which frameworks to use' },
          description: {
            ru: 'Spec-driven development: сначала спека с требованиями, потом код от ИИ-агента. Шаги подхода, OpenSpec, Spec Kit и Kiro, сверка спеки и кода.',
            en: 'Spec-driven development: a spec with requirements comes first, then an AI agent writes code against it. The steps, OpenSpec, Spec Kit and Kiro, and keeping spec and code in sync.',
          },
        },
        more: { post: 'openspec', label: { ru: 'OpenSpec: разработка по спецификациям на практике', en: 'OpenSpec: spec-driven development in practice' } },
        also: [
          { post: 'specs-by-aggregates', label: { ru: 'Спеки по агрегатам: как не плодить спеки', en: 'Specs by aggregate: keeping specs from multiplying' } },
          { post: 'spec-reconcile-loop', label: { ru: 'Петля сверки: спека и код в согласии', en: 'A reconcile loop: keeping spec and code in sync' } },
          { post: 'specs-rules-skills', label: { ru: 'Чем спека отличается от AGENTS.md', en: 'How a spec differs from AGENTS.md' } },
        ],
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
          ru: 'OpenSpec — бесплатная открытая программа от Fission AI для разработки по спецификациям (Spec-Driven Development): агент сначала пишет план изменения в файлы, вы его проверяете, потом агент пишет код. Действующие спеки лежат в `openspec/specs`, а каждое изменение — отдельная папка в `openspec/changes`: `proposal.md` (зачем и что), дельта к спекам, `design.md` и `tasks.md`. Агент идёт по скиллам `/openspec-propose` → `/openspec-apply-change` → `/openspec-archive-change` (до версии 2.0 — команды `/opsx:propose`, `/opsx:apply`, `/opsx:archive`); при архивации дельта вливается в спеки. Легче Spec Kit: без жёстких фаз, работает с 30+ агентами.',
          en: 'OpenSpec is a free, open-source framework by Fission AI for Spec-Driven Development: the agent first writes a change plan into files, you review it, then the agent writes code. Live specs sit in `openspec/specs`, and every change is its own folder in `openspec/changes`: `proposal.md` (why and what), a spec delta, `design.md` and `tasks.md`. The agent follows the skills `/openspec-propose` → `/openspec-apply-change` → `/openspec-archive-change` (before 2.0: `/opsx:propose`, `/opsx:apply`, `/opsx:archive`); archiving merges the delta into the specs. Lighter than Spec Kit, with no rigid phases, and works with 30+ agents.',
        },
        match: { ru: ['OpenSpec'], en: ['OpenSpec'] },
        related: ['spec-driven-development', 'spec-kit'],
        faq: [
          { q: { ru: 'OpenSpec — это что?', en: 'What is OpenSpec?' }, a: { ru: 'Бесплатная открытая программа от Fission AI для разработки по спецификациям: агент сначала пишет план изменения в файлы, вы его проверяете, потом агент пишет код.', en: 'A free open-source framework by Fission AI for spec-driven development: the agent first writes a change plan into files, you review it, then the agent writes code.' } },
          { q: { ru: 'Какие команды у OpenSpec?', en: 'What are the OpenSpec commands?' }, a: { ru: 'Основные три: /openspec-propose создаёт план изменения, /openspec-apply-change пишет код по задачам, /openspec-archive-change вливает требования в общие спеки. Подумать вслух перед ними — /openspec-explore. В Codex те же скиллы вызывают через $, например $openspec-propose; в версиях 1.x они назывались /opsx:propose, /opsx:apply и /opsx:archive.', en: 'The main three: /openspec-propose creates a change plan, /openspec-apply-change writes code by the tasks, /openspec-archive-change merges the requirements into the shared specs. Think out loud first with /openspec-explore. Codex calls the same skills with $, e.g. $openspec-propose; in 1.x they were /opsx:propose, /opsx:apply and /opsx:archive.' } },
          { q: { ru: 'Как установить OpenSpec?', en: 'How do you install OpenSpec?' }, a: { ru: 'Скриптом `curl -fsSL https://openspec.dev/cli/install.sh | sh` на macOS и Linux, `irm https://openspec.dev/cli/install.ps1 | iex` в PowerShell на Windows, либо `npm install -g @fission-ai/openspec@latest` (нужен Node.js 22.12 или новее) или `brew install openspec`. Затем в папке проекта — `openspec init`. Программа бесплатная, лицензия MIT.', en: 'With the script `curl -fsSL https://openspec.dev/cli/install.sh | sh` on macOS and Linux, `irm https://openspec.dev/cli/install.ps1 | iex` in PowerShell on Windows, or with `npm install -g @fission-ai/openspec@latest` (needs Node.js 22.12 or newer) or `brew install openspec`. Then run `openspec init` in the project folder. It is free, under the MIT license.' } },
          { q: { ru: 'Чем OpenSpec отличается от Spec Kit?', en: 'How is OpenSpec different from Spec Kit?' }, a: { ru: 'OpenSpec легче: шаги можно повторять в любом порядке, и он рассчитан на уже работающий код. Spec Kit от GitHub ведёт по жёстким фазам.', en: 'OpenSpec is lighter: steps can repeat in any order, and it is built for code that already runs. GitHub’s Spec Kit walks through fixed phases.' } },
        ],
        source: { url: 'https://github.com/Fission-AI/OpenSpec', label: { ru: 'Репозиторий OpenSpec на GitHub', en: 'OpenSpec GitHub repo' } },
        seo: {
          title: { ru: 'OpenSpec: что это — открытая программа для разработки по спецификациям', en: 'What is OpenSpec: an open-source spec-driven development framework' },
          description: {
            ru: 'OpenSpec от Fission AI: план изменения в файлах Markdown до кода, три команды агенту — propose, apply, archive — и слияние требований в спеки проекта.',
            en: 'OpenSpec by Fission AI: a change plan in Markdown before code, three agent commands — propose, apply, archive — and requirements merged into the project specs.',
          },
        },
        more: { post: 'openspec', label: { ru: 'OpenSpec: установка, команды и пример изменения', en: 'OpenSpec: setup, commands and a change example' } },
        compare: {
          title: { ru: 'OpenSpec, Spec Kit и Kiro', en: 'OpenSpec, Spec Kit and Kiro' },
          head: { ru: ['OpenSpec', 'Spec Kit', 'Kiro'], en: ['OpenSpec', 'Spec Kit', 'Kiro'] },
          headSlugs: ['openspec', 'spec-kit'],
          rows: [
            { ru: ['Что это', 'открытая программа от Fission AI для вашего агента', 'открытая программа от GitHub для вашего агента', 'среда разработки от AWS со своим агентом'], en: ['What it is', 'an open-source framework by Fission AI for your agent', 'an open-source toolkit by GitHub for your agent', 'an AWS development environment with its own agent'] },
            { ru: ['Цена', 'бесплатно, лицензия MIT', 'бесплатно, лицензия MIT', 'бесплатный план с лимитами, остальные платные'], en: ['Price', 'free, MIT license', 'free, MIT license', 'a free plan with limits, paid plans above it'] },
            { ru: ['Файлы изменения', 'proposal.md, дельта к спекам, design.md, tasks.md', 'конституция, спецификация, план, задачи', 'requirements.md (или bugfix.md), design.md, tasks.md'], en: ['Change files', 'proposal.md, a spec delta, design.md, tasks.md', 'constitution, spec, plan, tasks', 'requirements.md (or bugfix.md), design.md, tasks.md'] },
            { ru: ['Порядок шагов', 'шаги можно повторять в любом порядке', 'по фазам: конституция → спецификация → план → задачи → код', 'требования → дизайн → задачи'], en: ['Step order', 'steps can repeat in any order', 'by phases: constitution → spec → plan → tasks → code', 'requirements → design → tasks'] },
            { ru: ['С какими агентами', '30+ агентов через скиллы', 'разные агенты: Copilot, Claude Code и другие', 'свой агент Kiro'], en: ['Which agents', '30+ agents through skills', 'different agents: Copilot, Claude Code and others', 'Kiro’s own agent'] },
          ],
        },
      },
      {
        slug: 'spec-kit',
        name: { ru: 'Spec Kit', en: 'Spec Kit' },
        def: {
          ru: 'Spec Kit — набор GitHub для Spec-Driven Development: утилита `specify` ставит в проект команды для агента, и они ведут по шагам — принципы проекта (`/speckit-constitution`), спека (`/speckit-specify`), технический план (`/speckit-plan`), задачи (`/speckit-tasks`), код (`/speckit-implement`) и сверка с артефактами (`/speckit-converge`), которую повторяют, пока код и спека не сойдутся. Работает с Copilot, Claude Code и другими агентами.',
          en: 'Spec Kit is a GitHub toolkit for Spec-Driven Development: the `specify` CLI installs agent commands that lead step by step: project principles (`/speckit-constitution`), spec (`/speckit-specify`), technical plan (`/speckit-plan`), tasks (`/speckit-tasks`), code (`/speckit-implement`) and a check against the artifacts (`/speckit-converge`), repeated until code and spec agree. Works with Copilot, Claude Code and other agents.',
        },
        match: { ru: ['Spec Kit'], en: ['Spec Kit'] },
        related: ['spec-driven-development', 'openspec'],
        faq: [
          { q: { ru: 'Spec Kit — что это?', en: 'What is Spec Kit?' }, a: { ru: 'Набор GitHub для разработки по спецификациям: утилита specify ставит в проект команды для агента, и они ведут по шагам от принципов проекта до кода.', en: 'GitHub’s toolkit for spec-driven development: the specify utility installs agent commands in the project, which guide you step by step from project principles to code.' } },
          { q: { ru: 'Какие шаги в Spec Kit?', en: 'What are the Spec Kit steps?' }, a: { ru: 'Принципы проекта, спека, технический план, задачи, код и сверка кода со спекой, которую повторяют, пока они не сойдутся.', en: 'Project principles, spec, technical plan, tasks, code and a check of the code against the spec, repeated until they match.' } },
        ],
        source: { url: 'https://github.com/github/spec-kit', label: { ru: 'Репозиторий Spec Kit на GitHub', en: 'Spec Kit GitHub repo' } },
      },
      {
        slug: 'rfc-2119',
        name: { ru: 'RFC 2119', en: 'RFC 2119' },
        aka: { ru: 'MUST · SHOULD · MAY', en: 'MUST · SHOULD · MAY' },
        def: {
          ru: 'RFC 2119 — стандарт, который задаёт значение слов MUST, SHOULD и MAY в требованиях. В спеках эти уровни показывают агенту, что обязательно, что желательно, а что на его усмотрение.',
          en: 'RFC 2119 is a standard that fixes the meaning of MUST, SHOULD and MAY in requirements. In specs these levels tell the agent what is mandatory, what is advised and what is optional.',
        },
        match: { ru: ['RFC 2119'], en: ['RFC 2119'] },
        related: ['aggregate', 'spec-driven-development'],
        faq: [
          { q: { ru: 'RFC 2119 — что это?', en: 'What is RFC 2119?' }, a: { ru: 'Стандарт, который задаёт значение слов MUST, SHOULD и MAY в требованиях.', en: 'A standard that defines the meaning of MUST, SHOULD and MAY in requirements.' } },
          { q: { ru: 'Зачем RFC 2119 в спеках для агента?', en: 'Why use RFC 2119 in specs for an agent?' }, a: { ru: 'Эти слова показывают агенту, что обязательно, что желательно, а что на его усмотрение.', en: 'These words tell the agent what is required, what is recommended and what is up to it.' } },
        ],
        source: { url: 'https://www.rfc-editor.org/rfc/rfc2119', label: { ru: 'RFC 2119 — текст стандарта', en: 'RFC 2119, the standard text' } },
      },
      {
        slug: 'ddd',
        name: { ru: 'Domain-Driven Design', en: 'Domain-Driven Design' },
        aka: { ru: 'DDD', en: 'DDD' },
        def: {
          ru: 'Domain-Driven Design — подход к проектированию, где код строится вокруг предметной области и её языка, общего с бизнесом. Предметная область делится на ограниченные контексты, внутри них живут агрегаты: принимают команды, держат бизнес-правила и отправляют события в соседние ограниченные контексты.',
          en: 'Domain-Driven Design is a design approach where code is built around the business domain and a language shared with the business. The domain is split into bounded contexts; inside them live aggregates that take commands, hold business rules and send events to neighbouring contexts.',
        },
        match: { ru: ['Domain-Driven Design', 'DDD'], en: ['Domain-Driven Design', 'DDD'] },
        related: ['aggregate', 'bounded-context', 'spec-driven-development'],
        faq: [
          { q: { ru: 'DDD — что это?', en: 'What is DDD?' }, a: { ru: 'Domain-Driven Design: подход, где код строится вокруг предметной области и её языка, общего с бизнесом.', en: 'Domain-Driven Design: an approach where code is built around the business domain and a language shared with the business.' } },
          { q: { ru: 'Из чего состоит DDD?', en: 'What are the parts of DDD?' }, a: { ru: 'Предметная область делится на ограниченные контексты, внутри них живут агрегаты: принимают команды, держат бизнес-правила и отправляют события.', en: 'The domain is split into bounded contexts, and aggregates live inside them: they take commands, hold business rules and send events.' } },
        ],
        source: { url: 'https://martinfowler.com/bliki/DomainDrivenDesign.html', label: { ru: 'Мартин Фаулер: Domain-Driven Design', en: 'Martin Fowler: Domain-Driven Design' } },
      },
      {
        slug: 'aggregate',
        name: { ru: 'Агрегат', en: 'Aggregate' },
        def: {
          ru: 'Агрегат — группа связанных объектов предметной области, которая меняется как единое целое через корень и сама держит бизнес-правила. У агрегата есть команды, которые его меняют; версия, которая растёт с каждым изменением; модели отображения, чтобы посмотреть, что внутри; события, которые он отправляет в другие ограниченные контексты. В спеках по агрегатам одна спека описывает один агрегат.',
          en: 'An aggregate is a group of related domain objects that changes as one unit through its root and holds its own business rules. An aggregate has commands that change it; a version that grows with every change; read models to see what is inside; events it sends to other bounded contexts. In specs by aggregate, one spec describes one aggregate.',
        },
        match: { ru: ['агрегат(?!ор)\\p{L}*'], en: ['aggregates?'] },
        related: ['bounded-context', 'ddd', 'rfc-2119'],
        faq: [
          { q: { ru: 'Агрегат в DDD — что это?', en: 'What is an aggregate in DDD?' }, a: { ru: 'Группа связанных объектов предметной области, которая меняется как единое целое через корень и сама держит бизнес-правила.', en: 'A group of related domain objects that changes as one unit through its root and holds the business rules itself.' } },
          { q: { ru: 'Зачем агрегат при работе с агентом?', en: 'Why does an aggregate matter when working with an agent?' }, a: { ru: 'На его границе удобно ставить проверку работы агента: там входят команды, выходят события и записаны правила.', en: 'Its boundary is a good place to check an agent’s work: commands come in, events go out and the rules are written there.' } },
        ],
        source: { url: 'https://martinfowler.com/bliki/DDD_Aggregate.html', label: { ru: 'Мартин Фаулер: агрегат DDD', en: 'Martin Fowler: DDD Aggregate' } },
      },
      {
        slug: 'bounded-context',
        name: { ru: 'Ограниченный контекст', en: 'Bounded context' },
        def: {
          ru: 'Ограниченный контекст — граница, внутри которой термины имеют один смысл. Слово «заказ» в продажах и в доставке может значить разное, поэтому у каждой границы свои спеки и свой словарь. Через границу соседи общаются событиями агрегатов.',
          en: 'A bounded context is a boundary inside which terms mean one thing. “Order” in sales and in delivery can mean different things, so each boundary gets its own specs and vocabulary. Across the border, contexts talk through aggregate events.',
        },
        match: { ru: ['ограниченн\\p{L}* контекст\\p{L}*'], en: ['bounded contexts?'] },
        related: ['aggregate', 'ddd', 'domain', 'ubiquitous-language', 'rice-theorem'],
        faq: [
          { q: { ru: 'Ограниченный контекст — что это?', en: 'What is a bounded context?' }, a: { ru: 'Граница, внутри которой термины имеют один смысл: слово «заказ» в продажах и в доставке может значить разное.', en: 'A boundary within which terms have one meaning: “order” in sales and in delivery can mean different things.' } },
          { q: { ru: 'Как общаются ограниченные контексты?', en: 'How do bounded contexts talk to each other?' }, a: { ru: 'Через границу соседи обмениваются событиями агрегатов.', en: 'Across the boundary neighbours exchange aggregate events.' } },
        ],
        source: { url: 'https://martinfowler.com/bliki/BoundedContext.html', label: { ru: 'Мартин Фаулер: ограниченный контекст', en: 'Martin Fowler: Bounded Context' } },
      },
      {
        slug: 'domain',
        name: { ru: 'Предметная область', en: 'Business domain' },
        aka: { ru: 'домен', en: 'domain' },
        def: {
          ru: 'Предметная область — часть реального мира, для которой пишут программу, со своими понятиями и правилами: например, бронирование переговорных. В DDD предметную область делят на поддомены, а модель каждого в коде живёт в своём ограниченном контексте со своим единым языком.',
          en: 'A business domain is the part of the real world a program is written for, with its own concepts and rules: for example, booking meeting rooms. In DDD the domain is split into subdomains, and each one’s model lives in code in its own bounded context with its own ubiquitous language.',
        },
        match: { ru: ['предметн\\p{L}* област\\p{L}*'], en: ['business domains?'] },
        related: ['bounded-context', 'ubiquitous-language', 'ddd', 'aggregate'],
        faq: [
          { q: { ru: 'Предметная область — что это?', en: 'What is a business domain?' }, a: { ru: 'Часть реального мира, для которой пишут программу, со своими понятиями и правилами, например бронирование переговорных.', en: 'The part of the real world a program is written for, with its own concepts and rules, such as meeting room booking.' } },
          { q: { ru: 'Как предметную область делят в DDD?', en: 'How is a domain split in DDD?' }, a: { ru: 'На поддомены, и модель каждого в коде живёт в своём ограниченном контексте.', en: 'Into subdomains, and each one’s model lives in its own bounded context in the code.' } },
        ],
        source: { url: 'https://martinfowler.com/bliki/DomainDrivenDesign.html', label: { ru: 'Мартин Фаулер: Domain-Driven Design', en: 'Martin Fowler: Domain-Driven Design' } },
      },
      {
        slug: 'ubiquitous-language',
        name: { ru: 'Единый язык', en: 'Ubiquitous language' },
        aka: { ru: 'язык предметной области', en: 'the language of the domain' },
        def: {
          ru: 'Единый язык — общий словарь разработчиков и бизнеса внутри одного ограниченного контекста: одни и те же слова звучат в разговоре, в спеке и в коде. Внутри границы у каждого слова один смысл, за границей то же слово может значить другое. Чем уже язык, тем больше правил проверяется по тексту, без перебора запусков.',
          en: 'The ubiquitous language is a shared vocabulary of developers and the business inside one bounded context: the same words are used in conversation, in the spec and in the code. Inside the border each word has one meaning; across it the same word may mean something else. The narrower the language, the more rules can be checked from the text alone, without going through runs.',
        },
        match: { ru: ['един\\p{L}* язык\\p{L}*', 'язык\\p{L}* предметной области'], en: ['ubiquitous language'] },
        related: ['bounded-context', 'domain', 'ddd', 'rice-theorem'],
        faq: [
          { q: { ru: 'Единый язык в DDD — что это?', en: 'What is the ubiquitous language in DDD?' }, a: { ru: 'Общий словарь разработчиков и бизнеса внутри одного ограниченного контекста: одни и те же слова звучат в разговоре, в спеке и в коде.', en: 'A shared vocabulary of developers and the business within one bounded context: the same words appear in conversation, in the spec and in the code.' } },
          { q: { ru: 'Может ли слово значить разное?', en: 'Can a word mean different things?' }, a: { ru: 'Внутри границы у слова один смысл, за границей то же слово может значить другое.', en: 'Inside the boundary a word has one meaning; outside it the same word can mean something else.' } },
        ],
        source: { url: 'https://martinfowler.com/bliki/UbiquitousLanguage.html', label: { ru: 'Мартин Фаулер: Ubiquitous Language', en: 'Martin Fowler: Ubiquitous Language' } },
      },
      {
        slug: 'imperative',
        name: { ru: 'Императивный подход', en: 'Imperative approach' },
        aka: { ru: 'как: шаги', en: 'how: steps' },
        def: {
          ru: 'Императивный подход — стиль записи программы, где по шагам расписано, как прийти к результату: найти брони комнаты, сравнить интервалы, записать новую. Правило о результате в таком коде нигде не записано целиком, оно складывается из шагов, поэтому проверять его приходится по поведению.',
          en: 'An imperative approach is a style of writing a program where the steps to reach a result are spelled out: find the room’s bookings, compare intervals, save the new one. A rule about the result is not written anywhere in full in such code; it emerges from the steps, so it has to be checked against behaviour.',
        },
        match: { ru: ['императивн\\p{L}* (?:подход|стил|язык|программирован|код)\\p{L}*', 'императивн\\p{L}*(?= и декларативн)'], en: ['imperative (?:approach|style|programming|code|languages?)', 'imperative(?= and declarative)'] },
        related: ['declarative', 'rice-theorem', 'invariant'],
        faq: [
          { q: { ru: 'Императивный подход — что это?', en: 'What is the imperative approach?' }, a: { ru: 'Стиль записи программы, где по шагам расписано, как прийти к результату.', en: 'A style of writing a program that spells out step by step how to reach the result.' } },
          { q: { ru: 'Чем императивный подход отличается от декларативного?', en: 'How is the imperative approach different from the declarative one?' }, a: { ru: 'Императивный код описывает шаги, а правило о результате складывается из них. Декларативный описывает, что должно быть верно, а шаги выбирает движок.', en: 'Imperative code describes the steps, and the rule about the result emerges from them. Declarative code describes what must hold, and an engine picks the steps.' } },
        ],
        source: { url: 'https://en.wikipedia.org/wiki/Imperative_programming', label: { ru: 'Википедия: императивное программирование', en: 'Wikipedia: Imperative programming' } },
      },
      {
        slug: 'declarative',
        name: { ru: 'Декларативный подход', en: 'Declarative approach' },
        aka: { ru: 'что: правила и ограничения', en: 'what: rules and constraints' },
        def: {
          ru: 'Декларативный подход — стиль записи, где программа — система правил и ограничений, описывающих нужный результат, без порядка шагов: сказано, что должно быть верно, а как этого добиться, решает движок. Так устроены ограничения и запросы в базе данных, правила вывода, описание желаемого состояния системы. Пример: «брони одной комнаты не пересекаются», «бронь не дольше 4 часов» в виде ограничений в базе. Простые декларативные записи проверяются по тексту точно, потому что их поведение видно из самой записи. На мощном декларативном языке это уже не так, и теорема Райса задевает его так же, как императивный код.',
          en: 'A style of writing where a program is a system of rules and constraints describing the desired result, with no order of steps: it states what must hold, and an engine decides how to get there. Database constraints and queries, inference rules and descriptions of a system’s desired state work this way. Example: “bookings of one room never overlap” and “a booking lasts at most 4 hours” as database constraints. Simple declarative notations can be checked exactly from the text, because their behaviour is visible in the statement itself. In a powerful declarative language this no longer holds, and Rice’s theorem hits it just like imperative code.',
        },
        match: { ru: ['декларативн\\p{L}* (?:подход|стил|язык|запис|программирован)\\p{L}*'], en: ['declarative (?:approach|style|programming|notations?|languages?)'] },
        related: ['imperative', 'rice-theorem', 'invariant', 'ubiquitous-language', 'sql', 'kubernetes', 'json-schema', 'quint', 'z3', 'prolog', 'datalog'],
        notes: {
          title: { ru: 'Где встречается: языки, валидаторы, движки', en: 'Where it shows up: languages, validators, engines' },
          items: [
            { name: { ru: 'SQL', en: 'SQL' }, text: { ru: 'запрос описывает, какие данные нужны, а база сама выбирает, как их достать. Ограничения CHECK, UNIQUE и EXCLUDE — правила, которые база держит при каждой записи.', en: 'a query says which data is needed and the database picks how to fetch it. CHECK, UNIQUE and EXCLUDE constraints are rules the database enforces on every write.' } },
            { name: { ru: 'Kubernetes', en: 'Kubernetes' }, text: { ru: 'описывают желаемое состояние: какие сервисы и сколько копий запустить. Контроллеры в петле сверки приводят систему к нему.', en: 'you describe the desired state: which services and how many copies to run. Controllers in a reconcile loop bring the system to it.' } },
            { name: { ru: 'JSON Schema', en: 'JSON Schema' }, text: { ru: 'схема описывает форму данных, валидатор проверяет по ней каждый документ.', en: 'a schema describes the shape of data; a validator checks every document against it.' } },
            { name: { ru: 'Quint', en: 'Quint' }, text: { ru: 'а также TLA+ и Alloy: правила и инварианты системы записаны как утверждения, проверка моделей перебирает состояния.', en: 'as well as TLA+ and Alloy: system rules and invariants are written as statements, and model checking goes through the states.' } },
            { name: { ru: 'Z3', en: 'Z3' }, text: { ru: 'ограничения на значения; решатель ищет значения, которые им удовлетворяют, или доказывает, что таких нет.', en: 'constraints on values; the solver finds values that satisfy them or proves there are none.' } },
            { name: { ru: 'Prolog', en: 'Prolog' }, text: { ru: 'факты и правила вывода; движок сам ищет ответ на вопрос. Язык полный: на нём можно написать и вечный цикл.', en: 'facts and inference rules; the engine finds the answer to a question itself. The language is complete: an endless loop can be written in it too.' } },
            { name: { ru: 'Datalog', en: 'Datalog' }, text: { ru: 'урезанный Prolog для запросов к данным: любой запрос гарантированно заканчивается, поэтому ответ всегда точный.', en: 'a cut-down Prolog for querying data: every query is guaranteed to finish, so the answer is always exact.' } },
          ],
        },
        more: { post: 'agent-checkpoint', label: { ru: 'Где ставить проверку работы ИИ-агента', en: "Where to check an AI agent's work" } },
        also: [
          { post: 'spec-reconcile-loop', label: { ru: 'Петля сверки для спек: как в Kubernetes', en: 'A reconcile loop for specs: like Kubernetes' } },
          { post: 'quint-vs-tests-and-tla', label: { ru: 'Чем model checking отличается от тестов', en: 'How model checking differs from testing' } },
          { post: 'specs-by-aggregates', label: { ru: 'Спеки по агрегатам', en: 'Specs by aggregate' } },
        ],
        faq: [
          { q: { ru: 'Декларативный подход — что это?', en: 'What is the declarative approach?' }, a: { ru: 'Стиль записи, где программа — система правил и ограничений, описывающих нужный результат, без порядка шагов.', en: 'A style where a program is a system of rules and constraints describing the result, with no order of steps.' } },
          { q: { ru: 'Где используется декларативный подход?', en: 'Where is the declarative approach used?' }, a: { ru: 'В ограничениях и запросах баз данных, правилах вывода и описаниях желаемого состояния системы, например в SQL и Kubernetes.', en: 'In database constraints and queries, inference rules and descriptions of a system’s desired state, such as SQL and Kubernetes.' } },
        ],
        source: { url: 'https://en.wikipedia.org/wiki/Declarative_programming', label: { ru: 'Википедия: декларативное программирование', en: 'Wikipedia: Declarative programming' } },
      },
      {
        slug: 'kubernetes',
        name: { ru: 'Kubernetes', en: 'Kubernetes' },
        aka: { ru: 'K8s', en: 'K8s' },
        def: {
          ru: 'Kubernetes — система, которая запускает программы в контейнерах на многих серверах и следит за ними. Её настраивают декларативно: в файле описывают желаемое состояние, например «три копии сервиса броней», а контроллеры в петле сверки (reconcile loop) сравнивают его с фактическим и исправляют разницу: упала копия — поднимут новую. Кластер состоит из нод, на которых в подах работают контейнеры; желаемое состояние лежит в etcd, приложения ставят Helm-чартами, а при нехватке памяти эвикшн переносит поды на другие ноды.',
          en: 'Kubernetes is a system that runs programs in containers across many servers and watches over them. It is configured declaratively: a file describes the desired state, such as “three copies of the booking service”, and controllers in a reconcile loop compare it with the actual state and fix the difference: a copy crashes, a new one is started. A cluster is made of nodes where containers run in pods; the desired state lives in etcd, applications are installed with Helm charts, and when memory runs short, eviction moves pods to other nodes.',
        },
        match: { ru: ['Kubernetes', 'K8s'], en: ['Kubernetes', 'K8s'] },
        related: ['declarative', 'reconcile-loop', 'chaos-engineering', 'etcd', 'helm', 'eviction'],
        screens: [
          { ru: 'Helm-чарт описывает желаемое: три копии. API-сервер хранит его в etcd, планировщик ставит поды на ноды, kubelet их запускает. Упала нода — контроллеры в петле сверки видят, что копий 2 из 3, и поднимают третью на другой ноде.', en: 'A Helm chart describes the desired state: three copies. The API server keeps it in etcd, the scheduler places pods on nodes, and kubelet runs them. When a node goes down, the controllers see 2 of 3 copies and start the third on another node.' },
        ],
        parts: { title: { ru: 'Из чего состоит', en: 'What it is made of' }, slugs: ['k8s-node', 'pod', 'etcd', 'kube-apiserver', 'kube-scheduler', 'reconcile-loop', 'kubelet', 'deployment', 'replicaset', 'eviction', 'helm'] },
        notes: {
          title: { ru: 'Петля сверки (reconcile loop): как Kubernetes держит желаемое', en: 'The reconcile loop: how Kubernetes holds the desired state' },
          items: [
            { name: { ru: '1. Желаемое', en: '1. Desired' }, text: { ru: 'в Deployment записано: три копии сервиса броней. Запись лежит в etcd.', en: 'a Deployment says: three copies of the booking service. The record lives in etcd.' } },
            { name: { ru: '2. Фактическое', en: '2. Actual' }, text: { ru: 'контроллер смотрит, сколько подов сейчас работает: например, два, потому что нода упала.', en: 'a controller looks at how many pods are running now: say two, because a node went down.' } },
            { name: { ru: '3. Разница', en: '3. Difference' }, text: { ru: 'нужно три, есть два — контроллер создаёт третий под, планировщик ставит его на живую ноду.', en: 'three are needed, two exist, so the controller creates a third pod and the scheduler places it on a healthy node.' } },
            { name: { ru: '4. Снова', en: '4. Again' }, text: { ru: 'проверка не заканчивается: контроллер сверяет желаемое с фактическим всё время, поэтому система сама возвращается к описанному.', en: 'the check never ends: the controller compares desired and actual all the time, so the system returns to the description on its own.' } },
          ],
        },
        more: { post: 'spec-reconcile-loop', label: { ru: 'Петля сверки для спек: как в Kubernetes', en: 'A reconcile loop for specs: like Kubernetes' } },
        faq: [
          { q: { ru: 'Kubernetes — что это?', en: 'What is Kubernetes?' }, a: { ru: 'Система, которая запускает программы в контейнерах на многих серверах и следит за ними.', en: 'A system that runs programs in containers across many servers and watches over them.' } },
          { q: { ru: 'Как настраивают Kubernetes?', en: 'How is Kubernetes configured?' }, a: { ru: 'Декларативно: в файле описывают желаемое состояние, например «три копии сервиса», а контроллеры в петле сверки приводят систему к нему.', en: 'Declaratively: a file describes the desired state, such as “three copies of a service”, and controllers in a reconcile loop bring the system to it.' } },
        ],
        source: { url: 'https://kubernetes.io/docs/tasks/manage-kubernetes-objects/declarative-config/', label: { ru: 'Kubernetes: декларативное управление объектами', en: 'Kubernetes: declarative management of objects' } },
      },
      {
        slug: 'k8s-node',
        name: { ru: 'Нода', en: 'Node' },
        def: {
          ru: 'Нода — сервер в кластере Kubernetes, физический или виртуальный. На нодах запускаются поды, а планировщик решает, какой под на какую ноду поставить.',
          en: 'A node is a server in a Kubernetes cluster, physical or virtual. Pods run on nodes, and the scheduler decides which pod goes to which node.',
        },
        match: { ru: ['нод(?:а|ы|е|у|ой|ам|ами|ах)'], en: ['Kubernetes nodes?', 'nodes? (?:in|of) (?:a |the )?Kubernetes(?: cluster)?'] },
        related: ['kubernetes', 'pod', 'kube-scheduler', 'kubelet', 'eviction'],
        faq: [
          { q: { ru: 'Нода в Kubernetes — что это?', en: 'What is a node in Kubernetes?' }, a: { ru: 'Сервер в кластере Kubernetes, физический или виртуальный.', en: 'A server in a Kubernetes cluster, physical or virtual.' } },
        ],
        source: { url: 'https://kubernetes.io/docs/concepts/architecture/nodes/', label: { ru: 'Kubernetes: ноды', en: 'Kubernetes: Nodes' } },
      },
      {
        slug: 'pod',
        name: { ru: 'Под', en: 'Pod' },
        def: {
          ru: 'Под — самая маленькая единица запуска в Kubernetes: один или несколько контейнеров, которые работают вместе. Например, одна копия сервиса броней.',
          en: 'A pod is the smallest unit that runs in Kubernetes: one or more containers working together. For example, one copy of the booking service.',
        },
        match: { ru: ['поды', 'подов', 'подами', 'подах'], en: ['pods?'] },
        related: ['kubernetes', 'k8s-node', 'replicaset', 'eviction'],
        faq: [
          { q: { ru: 'Под в Kubernetes — что это?', en: 'What is a pod in Kubernetes?' }, a: { ru: 'Самая маленькая единица запуска в Kubernetes: один или несколько контейнеров, которые работают вместе.', en: 'The smallest unit that runs in Kubernetes: one or more containers working together.' } },
        ],
        source: { url: 'https://kubernetes.io/docs/concepts/workloads/pods/', label: { ru: 'Kubernetes: поды', en: 'Kubernetes: Pods' } },
      },
      {
        slug: 'etcd',
        name: { ru: 'etcd', en: 'etcd' },
        def: {
          ru: 'etcd — надёжное распределённое хранилище «ключ — значение». В Kubernetes в нём лежат все данные кластера, в том числе описанное желаемое состояние.',
          en: 'etcd is a reliable distributed key-value store. In Kubernetes it holds all cluster data, including the described desired state.',
        },
        match: { ru: ['etcd'], en: ['etcd'] },
        related: ['kubernetes', 'kube-apiserver', 'reconcile-loop'],
        faq: [
          { q: { ru: 'etcd — что это?', en: 'What is etcd?' }, a: { ru: 'Надёжное распределённое хранилище «ключ — значение».', en: 'A reliable distributed key-value store.' } },
        ],
        source: { url: 'https://etcd.io/', label: { ru: 'etcd', en: 'etcd' } },
      },
      {
        slug: 'kube-apiserver',
        name: { ru: 'API-сервер Kubernetes', en: 'Kubernetes API server' },
        def: {
          ru: 'API-сервер Kubernetes — точка входа в кластер. Через него люди, Helm и контроллеры читают и меняют состояние, а он хранит его в etcd.',
          en: 'The Kubernetes API server is the entry point to a cluster. People, Helm and controllers read and change state through it, and it stores the state in etcd.',
        },
        match: { ru: ['kube-apiserver', 'API-сервер\\p{L}* Kubernetes'], en: ['kube-apiserver', 'Kubernetes API server'] },
        related: ['kubernetes', 'etcd', 'helm', 'reconcile-loop'],
        faq: [
          { q: { ru: 'API-сервер Kubernetes — что это?', en: 'What is the Kubernetes API server?' }, a: { ru: 'Точка входа в кластер.', en: 'The entry point to a cluster.' } },
        ],
        source: { url: 'https://kubernetes.io/docs/concepts/overview/components/', label: { ru: 'Kubernetes: компоненты', en: 'Kubernetes: Components' } },
      },
      {
        slug: 'kube-scheduler',
        name: { ru: 'Планировщик Kubernetes', en: 'Kubernetes scheduler' },
        def: {
          ru: 'Планировщик Kubernetes — компонент, который находит поды без назначенной ноды и ставит каждый на подходящую, с учётом свободной памяти и процессора.',
          en: 'The Kubernetes scheduler is a component that finds pods with no node assigned and places each on a suitable one, taking free memory and CPU into account.',
        },
        match: { ru: ['kube-scheduler', 'планировщик\\p{L}* Kubernetes'], en: ['kube-scheduler', 'Kubernetes scheduler'] },
        related: ['kubernetes', 'pod', 'k8s-node'],
        faq: [
          { q: { ru: 'Планировщик Kubernetes — что это?', en: 'What is the Kubernetes scheduler?' }, a: { ru: 'Компонент, который находит поды без назначенной ноды и ставит каждый на подходящую, с учётом свободной памяти и процессора.', en: 'A component that finds pods with no node assigned and places each on a suitable one, taking free memory and CPU into account.' } },
        ],
        source: { url: 'https://kubernetes.io/docs/concepts/scheduling-eviction/kube-scheduler/', label: { ru: 'Kubernetes: планировщик', en: 'Kubernetes: Scheduler' } },
      },
      {
        slug: 'kubelet',
        name: { ru: 'kubelet', en: 'kubelet' },
        def: {
          ru: 'kubelet — программа на каждой ноде Kubernetes. Она следит, чтобы назначенные ноде поды и их контейнеры были запущены.',
          en: 'kubelet is a program on every Kubernetes node. It makes sure the pods assigned to the node and their containers are running.',
        },
        match: { ru: ['kubelet'], en: ['kubelet'] },
        related: ['kubernetes', 'k8s-node', 'pod'],
        faq: [
          { q: { ru: 'kubelet — что это?', en: 'What is kubelet?' }, a: { ru: 'Программа на каждой ноде Kubernetes.', en: 'A program on every Kubernetes node.' } },
        ],
        source: { url: 'https://kubernetes.io/docs/concepts/overview/components/', label: { ru: 'Kubernetes: компоненты', en: 'Kubernetes: Components' } },
      },
      {
        slug: 'deployment',
        name: { ru: 'Deployment', en: 'Deployment' },
        def: {
          ru: 'Deployment — запись в Kubernetes о том, какую версию сервиса запускать и сколько копий держать, например «три копии сервиса броней». При обновлении он по очереди заменяет старые поды новыми.',
          en: 'A Deployment is a Kubernetes record of which version of a service to run and how many copies to keep, such as “three copies of the booking service”. On an update it replaces old pods with new ones in turn.',
        },
        match: { ru: ['Deployment'], en: ['Deployment'] },
        exact: 'Deployment',
        related: ['kubernetes', 'replicaset', 'pod', 'reconcile-loop'],
        faq: [
          { q: { ru: 'Deployment в Kubernetes — что это?', en: 'What is a Deployment in Kubernetes?' }, a: { ru: 'Запись в Kubernetes о том, какую версию сервиса запускать и сколько копий держать, например «три копии сервиса броней».', en: 'A Kubernetes record of which version of a service to run and how many copies to keep, such as “three copies of the booking service”.' } },
        ],
        source: { url: 'https://kubernetes.io/docs/concepts/workloads/controllers/deployment/', label: { ru: 'Kubernetes: Deployment', en: 'Kubernetes: Deployments' } },
      },
      {
        slug: 'replicaset',
        name: { ru: 'ReplicaSet', en: 'ReplicaSet' },
        def: {
          ru: 'ReplicaSet — контроллер Kubernetes, который держит заданное число одинаковых подов. Упал под — он создаёт новый, лишний — убирает.',
          en: 'A ReplicaSet is a Kubernetes controller that keeps a set number of identical pods. A pod crashes, it creates a new one; there is an extra, it removes it.',
        },
        match: { ru: ['ReplicaSet'], en: ['ReplicaSet'] },
        related: ['kubernetes', 'deployment', 'pod', 'reconcile-loop'],
        faq: [
          { q: { ru: 'ReplicaSet — что это?', en: 'What is a ReplicaSet?' }, a: { ru: 'Контроллер Kubernetes, который держит заданное число одинаковых подов.', en: 'A Kubernetes controller that keeps a set number of identical pods.' } },
        ],
        source: { url: 'https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/', label: { ru: 'Kubernetes: ReplicaSet', en: 'Kubernetes: ReplicaSet' } },
      },
      {
        slug: 'eviction',
        name: { ru: 'Эвикшн', en: 'Eviction' },
        aka: { ru: 'выселение подов, «эвиктить»', en: 'evicting pods' },
        def: {
          ru: 'Эвикшн — выселение подов с ноды Kubernetes: система завершает поды, например когда на ноде кончаются память или диск. Контроллер замечает нехватку копий и поднимает их заново на другой ноде. На жаргоне говорят «эвиктить»: «под эвиктнули» значит, что Kubernetes выселил его с ноды.',
          en: 'Eviction is the removal of pods from a Kubernetes node: the system terminates pods, for example when the node runs low on memory or disk. A controller notices the missing copies and starts them again on another node. In jargon this is “to evict”: “the pod got evicted” means Kubernetes removed it from its node.',
        },
        match: { ru: ['эвикшн\\p{L}*', 'эвикт\\p{L}*', 'выселени\\p{L}* под\\p{L}*'], en: ['evictions?', 'evict(?:s|ed|ing)?', 'evicted pods?'] },
        related: ['kubernetes', 'k8s-node', 'pod', 'replicaset', 'kubelet', 'reconcile-loop', 'chaos-engineering'],
        notes: {
          title: { ru: 'Когда под эвиктят', en: 'When a pod gets evicted' },
          items: [
            { name: { ru: 'Нехватка на ноде', en: 'Node pressure' }, text: { ru: 'на ноде кончаются память или диск, и kubelet сам выселяет часть подов, чтобы нода не упала целиком. Первыми уходят поды, которые берут больше, чем просили.', en: 'a node runs low on memory or disk, and kubelet evicts some pods on its own so the whole node does not go down. Pods using more than they asked for go first.' } },
            { name: { ru: 'По запросу', en: 'On request' }, text: { ru: 'ноду выводят на обслуживание командой kubectl drain: она эвиктит поды по очереди и аккуратно завершает каждый.', en: 'a node is taken out for maintenance with kubectl drain: it evicts pods one by one and shuts each down gracefully.' } },
            { name: { ru: 'Что дальше', en: 'What happens next' }, text: { ru: 'эвикт сам ничего не поднимает: новую копию на другой ноде создаёт контроллер в петле сверки, потому что копий стало меньше, чем описано.', en: 'eviction itself starts nothing: a controller in the reconcile loop creates a new copy on another node, because there are fewer copies than described.' } },
          ],
        },
        faq: [
          { q: { ru: 'Эвикшн в Kubernetes — что это?', en: 'What is eviction in Kubernetes?' }, a: { ru: 'Выселение подов с ноды Kubernetes: система завершает поды, например когда на ноде кончаются память или диск.', en: 'The removal of pods from a Kubernetes node: the system terminates pods, for example when the node runs low on memory or disk.' } },
        ],
        source: { url: 'https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/', label: { ru: 'Kubernetes: выселение при нехватке ресурсов', en: 'Kubernetes: Node-pressure eviction' } },
      },
      {
        slug: 'helm',
        name: { ru: 'Helm', en: 'Helm' },
        def: {
          ru: 'Helm — менеджер пакетов для Kubernetes. Чарт описывает приложение целиком, со всеми его частями, и его ставят и обновляют одной командой.',
          en: 'Helm is the package manager for Kubernetes. A chart describes a whole application with all its parts, and it is installed and upgraded with one command.',
        },
        match: { ru: ['Helm-чарт\\p{L}*', 'Helm', 'хельм\\p{L}*'], en: ['Helm charts?', 'Helm'] },
        exact: 'Helm',
        related: ['kubernetes', 'deployment', 'kube-apiserver', 'declarative'],
        faq: [
          { q: { ru: 'Helm — что это?', en: 'What is Helm?' }, a: { ru: 'Менеджер пакетов для Kubernetes.', en: 'The package manager for Kubernetes.' } },
        ],
        source: { url: 'https://helm.sh/', label: { ru: 'Helm', en: 'Helm' } },
      },
      {
        slug: 'chaos-engineering',
        name: { ru: 'Хаос-инжиниринг', en: 'Chaos engineering' },
        aka: { ru: 'намеренные сбои на проде', en: 'deliberate failures in production' },
        def: {
          ru: 'Хаос-инжиниринг — практика, в которой в работающую систему намеренно вносят сбои: выключают сервер, замедляют сеть, роняют базу, — и смотрят, выдержит ли она. Это проверка на примерах: она показывает, как система ведёт себя в устроенных сбоях, но доказательства для всех случаев не даёт. В системах с декларативным подходом, как Kubernetes, такой эксперимент проверяет петлю сверки: упавшую копию система должна поднять сама.',
          en: 'Chaos engineering is a practice of deliberately injecting failures into a running system: shutting down a server, slowing the network, dropping a database, and watching whether it holds. It is checking by example: it shows how the system behaves in the staged failures but gives no proof for every case. In systems with a declarative approach, like Kubernetes, such an experiment tests the reconcile loop: the system should restart the crashed copy on its own.',
        },
        match: { ru: ['хаос-инжиниринг\\p{L}*', 'chaos engineering'], en: ['chaos engineering'] },
        related: ['declarative', 'kubernetes', 'reconcile-loop', 'rice-theorem', 'checks'],
        faq: [
          { q: { ru: 'Хаос-инжиниринг — что это?', en: 'What is chaos engineering?' }, a: { ru: 'Практика, в которой в работающую систему намеренно вносят сбои и смотрят, выдержит ли она.', en: 'A practice of deliberately injecting failures into a running system and watching whether it holds.' } },
          { q: { ru: 'Доказывает ли хаос-инжиниринг надёжность?', en: 'Does chaos engineering prove reliability?' }, a: { ru: 'Нет, это проверка на примерах: она показывает поведение в устроенных сбоях, но не во всех возможных.', en: 'No, it is checking by example: it shows behaviour in the staged failures, not in every possible one.' } },
        ],
        source: { url: 'https://principlesofchaos.org/', label: { ru: 'Principles of Chaos Engineering', en: 'Principles of Chaos Engineering' } },
      },
      {
        slug: 'fail-fast',
        name: { ru: 'Fail-fast', en: 'Fail-fast' },
        aka: { ru: 'падать сразу', en: 'fail immediately' },
        def: {
          ru: 'Fail-fast — принцип, по которому программа сообщает о проблеме сразу, как только её заметила, и останавливает действие, вместо того чтобы молча продолжать с неверными данными. Ошибка видна там, где она возникла, и её дешевле найти. В Kubernetes на этом построена работа с сервисами: сервис падает сразу при ошибке, а система сама перезапускает его и не пускает к нему запросы, пока он не готов.',
          en: 'Fail-fast is a principle where a program reports a problem as soon as it notices it and stops the action, instead of silently carrying on with wrong data. The error shows up where it arose and is cheaper to find. Kubernetes builds service handling on this: a service fails right away on an error, and the system restarts it on its own and sends it no requests until it is ready.',
        },
        match: { ru: ['fail-fast', 'fail fast'], en: ['fail-fast', 'fail fast'] },
        related: ['kubernetes', 'kubelet', 'pod', 'deployment', 'chaos-engineering', 'checks'],
        notes: {
          title: { ru: 'Fail-fast в Kubernetes', en: 'Fail-fast in Kubernetes' },
          items: [
            { name: { ru: 'Упасть при старте', en: 'Crash on start' }, text: { ru: 'сервис с неверной настройкой сразу завершается с ошибкой, вместо того чтобы работать наполовину. kubelet перезапускает контейнер, а при повторных падениях делает паузы между попытками: под в состоянии CrashLoopBackOff виден сразу.', en: 'a service with a bad setting exits with an error at once instead of half-working. kubelet restarts the container and waits longer between repeated failures: a pod in CrashLoopBackOff is visible right away.' } },
            { name: { ru: 'Проверка живости', en: 'Liveness probe' }, text: { ru: 'kubelet регулярно спрашивает сервис «жив?». Не ответил — контейнер перезапускают, зависший сервис не висит молча.', en: 'kubelet regularly asks the service “are you alive?”. No answer, and the container is restarted: a hung service does not hang silently.' } },
            { name: { ru: 'Проверка готовности', en: 'Readiness probe' }, text: { ru: 'пока сервис не готов, на него не идут запросы покупателей: Kubernetes убирает под из списка получателей.', en: 'until the service is ready, no customer requests reach it: Kubernetes removes the pod from the list of receivers.' } },
            { name: { ru: 'Остановка выкладки', en: 'Halting a rollout' }, text: { ru: 'Deployment заменяет старые поды новыми по очереди. Если новые не становятся готовыми, замена дальше не идёт, и старые копии продолжают работать.', en: 'a Deployment replaces old pods with new ones in turn. If the new ones never become ready, the replacement goes no further, and the old copies keep running.' } },
          ],
        },
        faq: [
          { q: { ru: 'Fail-fast — что это?', en: 'What is fail-fast?' }, a: { ru: 'Принцип, по которому программа сообщает о проблеме сразу и останавливает действие, вместо того чтобы молча продолжать.', en: 'A principle where a program reports a problem right away and stops the action instead of silently carrying on.' } },
          { q: { ru: 'Зачем нужен fail-fast?', en: 'Why fail fast?' }, a: { ru: 'Ошибка видна там, где возникла, поэтому её дешевле найти и исправить.', en: 'The error shows up where it arose, so it is cheaper to find and fix.' } },
        ],
        source: { url: 'https://en.wikipedia.org/wiki/Fail-fast_system', label: { ru: 'Википедия: fail-fast', en: 'Wikipedia: Fail-fast system' } },
      },
      {
        slug: 'sql',
        name: { ru: 'SQL', en: 'SQL' },
        def: {
          ru: 'SQL — декларативный язык запросов к реляционным базам данных. Запрос говорит, какие данные нужны: «брони комнаты 5 на завтра», а как их достать — по индексу или перебором — выбирает сама база. Ограничения CHECK, UNIQUE и EXCLUDE задают правила, которые база держит при каждой записи, поэтому они проверяются по тексту схемы.',
          en: 'SQL is a declarative language for querying relational databases. A query says which data is needed, “room 5 bookings for tomorrow”, and the database itself decides how to fetch it, by index or by scanning. CHECK, UNIQUE and EXCLUDE constraints set rules the database enforces on every write, so they can be checked from the schema text.',
        },
        match: { ru: ['SQL'], en: ['SQL'] },
        related: ['declarative', 'invariant'],
        faq: [
          { q: { ru: 'SQL — что это?', en: 'What is SQL?' }, a: { ru: 'Декларативный язык запросов к реляционным базам данных: запрос говорит, какие данные нужны, а как их достать, выбирает база.', en: 'A declarative query language for relational databases: a query says which data is needed, and the database chooses how to get it.' } },
          { q: { ru: 'Как SQL помогает проверять правила?', en: 'How does SQL help enforce rules?' }, a: { ru: 'Ограничения CHECK, UNIQUE и EXCLUDE записывают правила о данных прямо в базе, и база не даст их нарушить.', en: 'CHECK, UNIQUE and EXCLUDE constraints write data rules directly into the database, and the database will not let them be broken.' } },
        ],
        source: { url: 'https://en.wikipedia.org/wiki/SQL', label: { ru: 'Википедия: SQL', en: 'Wikipedia: SQL' } },
      },
      {
        slug: 'json-schema',
        name: { ru: 'JSON Schema', en: 'JSON Schema' },
        def: {
          ru: 'JSON Schema — декларативный язык, которым описывают форму данных в JSON: какие поля обязательны, какого они типа, какие значения допустимы. Валидатор берёт схему и документ и отвечает, подходит ли документ. Так проверяют ответы программ и агентов, настройки и входящие запросы.',
          en: 'JSON Schema is a declarative language for describing the shape of JSON data: which fields are required, of what type, which values are allowed. A validator takes the schema and a document and answers whether the document fits. This is how program and agent output, settings and incoming requests are checked.',
        },
        match: { ru: ['JSON Schema'], en: ['JSON Schema'] },
        related: ['declarative', 'checks'],
        faq: [
          { q: { ru: 'JSON Schema — что это?', en: 'What is JSON Schema?' }, a: { ru: 'Декларативный язык, которым описывают форму данных в JSON: какие поля обязательны, какого они типа и какие значения допустимы.', en: 'A declarative language that describes the shape of JSON data: which fields are required, their types and allowed values.' } },
          { q: { ru: 'Как работает проверка по JSON Schema?', en: 'How does JSON Schema validation work?' }, a: { ru: 'Валидатор берёт схему и документ и отвечает, подходит ли документ.', en: 'A validator takes the schema and a document and answers whether the document fits.' } },
        ],
        source: { url: 'https://json-schema.org/', label: { ru: 'json-schema.org', en: 'json-schema.org' } },
      },
      {
        slug: 'cap-theorem',
        name: { ru: 'Теорема CAP', en: 'CAP theorem' },
        aka: { ru: 'согласованность, доступность, разрыв связи', en: 'consistency, availability, partition' },
        def: {
          ru: 'Теорема CAP говорит: когда данные лежат на нескольких серверах и связь между ними оборвалась, система не может одновременно отвечать на каждый запрос и показывать всем одни и те же данные: приходится либо ждать восстановления связи, либо отвечать по своей, возможно устаревшей, копии. Эрик Брюер высказал это в 2000 году, Сет Гилберт и Нэнси Линч доказали в 2002-м. Позже Брюер писал, что формула «два из трёх» упрощает картину: выбор встаёт только во время разрыва.',
          en: 'The CAP theorem says that when data lives on several servers and the link between them breaks, the system can’t both answer every request and show everyone the same data: it must either wait for the link to return or answer from its own, possibly stale, copy. Eric Brewer stated this in 2000; Seth Gilbert and Nancy Lynch proved it in 2002. Brewer later wrote that the “two of three” formula oversimplifies: the choice arises only during a partition.',
        },
        match: { ru: ['теорем\\p{L}* CAP'], en: ['CAP theorem'] },
        related: ['rice-theorem', 'halting-problem', 'aggregate', 'bounded-context'],
        screens: [
          {
            ru: 'Буквы названия: C — согласованность, все видят одни и те же данные; A — доступность, каждый запрос получает ответ; P — устойчивость к разрыву связи, система продолжает работать, когда сообщения между серверами теряются или опаздывают. Разрывы связи случаются сами, поэтому на практике выбирают между C и A на время разрыва.\n\nОбщее ядро с теоремой Райса: пока событие не произошло, нельзя понять, случится ли оно позже или не случится никогда, сколько бы ни ждать. Сервер не знает, потеряно сообщение соседа или опаздывает; проверка программы не знает, закончится программа или будет работать вечно. Поэтому и выходы похожи: пока время не ограничено, выбирают одно из двух — ждать или ответить сейчас с риском ошибки; а ограничение времени снимает саму развилку, потому что после предела «никогда» уже известно. Причины невозможности разные: серверу не хватает сведений, а проверке программы сведений хватает, весь код перед ней, но ответ из него нельзя вычислить. Это сопоставление автора, единой теоремы для обоих случаев нет.',
            en: 'The letters: C is consistency, everyone sees the same data; A is availability, every request gets an answer; P is partition tolerance, the system keeps working when messages between servers are lost or delayed. Partitions happen on their own, so in practice the choice is between C and A for the duration of a partition.\n\nThe common core with Rice’s theorem: while an event hasn’t happened yet, you can’t tell whether it will happen later or never, however long you wait. A server doesn’t know whether a neighbour’s message is lost or late; a program check doesn’t know whether the program will finish or run forever. So the ways out are similar: while time is unbounded, you pick one of two — wait, or answer now at the risk of being wrong; and bounding the time removes the fork itself, because after the limit “never” is already known. The reasons for the impossibility differ: a server lacks information, while a program check has it, the whole code is in front of it, but the answer can’t be computed from it. This comparison is the author’s; there is no single theorem covering both.',
          },
        ],
        more: { post: 'rice-theorem-explained', label: { ru: 'Теорема Райса и связь с CAP', en: "Rice's theorem and the link to CAP" } },
        faq: [
          { q: { ru: 'Теорема CAP — что это простыми словами?', en: 'What is the CAP theorem in plain words?' }, a: { ru: 'Когда данные лежат на нескольких серверах и связь оборвалась, система не может одновременно отвечать на каждый запрос и показывать всем одни и те же данные.', en: 'When data lives on several servers and the link breaks, the system cannot both answer every request and show everyone the same data.' } },
          { q: { ru: 'Что выбирает система при обрыве связи?', en: 'What does a system choose when the link breaks?' }, a: { ru: 'Либо ждать восстановления связи, либо отвечать по своим данным, которые могут устареть.', en: 'Either wait for the link to return, or answer from its own data, which may be stale.' } },
        ],
        source: { url: 'https://www.infoq.com/articles/cap-twelve-years-later-how-the-rules-have-changed/', label: { ru: 'Эрик Брюер: CAP двенадцать лет спустя', en: 'Eric Brewer: CAP twelve years later' } },
      },
      {
        slug: 'agile',
        name: { ru: 'Agile', en: 'Agile' },
        aka: { ru: 'гибкая разработка', en: 'agile development' },
        def: {
          ru: 'Agile — подход к разработке короткими циклами: сделать небольшую часть, показать её, получить обратную связь и поправить план. Основа — Манифест гибкой разработки 2001 года, где реакция на изменения ценится выше следования плану. Подход нужен там, где будущее нельзя знать заранее: план всё равно будет ошибаться, поэтому важно, чтобы его было дёшево поправить.',
          en: 'Agile is an approach to development in short cycles: build a small part, show it, get feedback and adjust the plan. It rests on the 2001 Manifesto for Agile Software Development, which values responding to change over following a plan. The approach fits where the future can’t be known in advance: the plan will be wrong anyway, so what matters is that it is cheap to adjust.',
        },
        match: { ru: ['[Aa]gile', 'аджайл\\p{L}*', 'гибк\\p{L}* разработк\\p{L}*'], en: ['[Aa]gile(?= (?:development|approach|cycles?|methods?|teams?))', 'Agile'] },
        related: ['bounded-context', 'domain'],
        more: { post: 'agent-checkpoint', label: { ru: 'Первая рамка: почему она ошибётся и как сделать её дешёвой', en: 'The first frame: why it will be wrong and how to make it cheap' } },
        faq: [
          { q: { ru: 'Agile — что это?', en: 'What is Agile?' }, a: { ru: 'Подход к разработке короткими циклами: сделать небольшую часть, показать её, получить обратную связь и поправить план.', en: 'An approach to development in short cycles: build a small part, show it, get feedback and adjust the plan.' } },
          { q: { ru: 'На чём основан Agile?', en: 'What is Agile based on?' }, a: { ru: 'На Манифесте гибкой разработки 2001 года, где реакция на изменения ценится выше следования плану.', en: 'On the 2001 Agile Manifesto, which values responding to change over following a plan.' } },
        ],
        source: { url: 'https://agilemanifesto.org/', label: { ru: 'Манифест гибкой разработки', en: 'Manifesto for Agile Software Development' } },
      },
      {
        slug: 'prolog',
        name: { ru: 'Prolog', en: 'Prolog' },
        aka: { ru: 'язык логического программирования', en: 'a logic programming language' },
        def: {
          ru: 'Prolog — язык, в котором программа — это факты и правила вывода, а движок сам ищет ответ на вопрос. Факты: «бронь б1 — комната 2, с 10 до 11». Правило: «две брони пересекаются, если комната одна и время накладывается». Вопрос: «с какими бронями пересекается б1?». Создан в 1972 году во Франции. На Prolog можно написать любую программу, в том числе ту, что никогда не закончится, поэтому на него действует теорема Райса.',
          en: 'Prolog is a language in which a program is facts and inference rules, and an engine finds the answer to a question by itself. Facts: “booking b1 is room 2, from 10 to 11”. A rule: “two bookings overlap if the room is the same and the times overlap”. A question: “which bookings overlap b1?”. Created in 1972 in France. Any program can be written in Prolog, including one that never finishes, so Rice’s theorem applies to it.',
        },
        match: { ru: ['Prolog'], en: ['Prolog'] },
        related: ['datalog', 'declarative', 'rice-theorem'],
        faq: [
          { q: { ru: 'Prolog — что это за язык?', en: 'What is the Prolog language?' }, a: { ru: 'Язык, в котором программа — это факты и правила вывода, а движок сам ищет ответ на вопрос.', en: 'A language where a program is facts and inference rules, and an engine finds the answer to a question itself.' } },
          { q: { ru: 'Чем Prolog отличается от Datalog?', en: 'How is Prolog different from Datalog?' }, a: { ru: 'Datalog — урезанный Prolog без возможностей, из-за которых программа может работать вечно, поэтому любой его запрос к конечным данным заканчивается.', en: 'Datalog is a trimmed Prolog without the features that let a program run forever, so any of its queries over finite data finishes.' } },
        ],
        source: { url: 'https://en.wikipedia.org/wiki/Prolog', label: { ru: 'Википедия: Prolog', en: 'Wikipedia: Prolog' } },
      },
      {
        slug: 'datalog',
        name: { ru: 'Datalog', en: 'Datalog' },
        aka: { ru: 'узкий Prolog для баз данных', en: 'a narrow Prolog for databases' },
        def: {
          ru: 'Datalog — урезанный Prolog для запросов к данным: те же факты и правила вывода, но без возможностей, из-за которых программа может работать вечно. Поэтому любой запрос на Datalog к конечным данным гарантированно заканчивается и даёт точный ответ. Это пример узкого языка: им нельзя написать любую программу, зато про его программы можно отвечать точно. Datalog-подобные языки используют в анализе кода и в правилах доступа.',
          en: 'Datalog is a cut-down Prolog for querying data: the same facts and inference rules, but without the features that let a program run forever. So any Datalog query over finite data is guaranteed to finish and give an exact answer. It is an example of a narrow language: you can’t write any program in it, but you can answer exactly about its programs. Datalog-like languages are used in code analysis and access rules.',
        },
        match: { ru: ['Datalog'], en: ['Datalog'] },
        related: ['prolog', 'declarative', 'rice-theorem'],
        faq: [
          { q: { ru: 'Datalog — что это?', en: 'What is Datalog?' }, a: { ru: 'Урезанный Prolog для запросов к данным: те же факты и правила вывода.', en: 'A trimmed Prolog for querying data: the same facts and inference rules.' } },
          { q: { ru: 'Почему запрос на Datalog всегда заканчивается?', en: 'Why does a Datalog query always finish?' }, a: { ru: 'Из языка убраны возможности, из-за которых программа может работать вечно.', en: 'The language drops the features that would let a program run forever.' } },
        ],
        source: { url: 'https://en.wikipedia.org/wiki/Datalog', label: { ru: 'Википедия: Datalog', en: 'Wikipedia: Datalog' } },
      },
      {
        slug: 'reconcile-loop',
        name: { ru: 'Петля сверки', en: 'Reconcile loop' },
        aka: { ru: 'как в Kubernetes', en: 'as in Kubernetes' },
        def: {
          ru: 'Петля сверки — цикл, в котором система постоянно сравнивает желаемое состояние с фактическим и приводит второе к первому. Так работает Kubernetes: в манифестах или Helm-чарте описано, какие сервисы должны быть запущены, а контроллер раз за разом сверяет это с кластером и поднимает недостающее. В Spec-Driven Development то же самое: желаемое — спека, фактическое — код, а приводит код к спеке агент.',
          en: 'A reconcile loop is a loop in which a system keeps comparing the desired state with the actual one and brings the second to the first. Kubernetes works this way: manifests or a Helm chart describe which services must run, and a controller keeps checking that against the cluster and starts what is missing. Spec-Driven Development is the same: the desired state is the spec, the actual one is the code, and the agent brings the code to the spec.',
        },
        match: { ru: ['петл\\p{L}* сверки', 'reconcile loop'], en: ['reconcile loops?', 'reconciliation loops?'] },
        related: ['spec-driven-development', 'human-in-the-loop'],
        faq: [
          { q: { ru: 'Петля сверки — что это?', en: 'What is a reconcile loop?' }, a: { ru: 'Цикл, в котором система постоянно сравнивает желаемое состояние с фактическим и приводит второе к первому.', en: 'A loop where a system keeps comparing the desired state with the actual one and brings the actual state in line.' } },
          { q: { ru: 'Где работает петля сверки?', en: 'Where does a reconcile loop run?' }, a: { ru: 'Например, в Kubernetes: в манифестах описано, какие сервисы должны работать, а контроллеры их поднимают.', en: 'For example, in Kubernetes: manifests describe which services must run, and controllers bring them up.' } },
        ],
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
          ru: 'Memory Bank — папка `memory-bank` с шестью markdown-файлами, где агент держит контекст проекта между сессиями: `projectbrief` (цели и рамки), `productContext` (зачем продукт), `systemPatterns` (архитектура), `techContext` (стек), `activeContext` (текущий фокус) и `progress` (что готово). Агент читает их в начале каждой задачи и обновляет после крупных изменений или по команде «update memory bank». Это набор инструкций для агента из Cline, он работает и с другими агентами: частный случай памяти проекта в файлах, как CLAUDE.md.',
          en: 'Memory Bank is a `memory-bank` folder with six markdown files where the agent keeps project context between sessions: `projectbrief` (goals and scope), `productContext` (why the product exists), `systemPatterns` (architecture), `techContext` (stack), `activeContext` (current focus) and `progress` (what is done). The agent reads them at the start of every task and updates them after major changes or on "update memory bank". It is a set of agent instructions from Cline that works with other agents too: one case of project memory kept in files, like CLAUDE.md.',
        },
        match: { ru: ['Memory Bank'], en: ['Memory Bank'] },
        related: ['memory', 'bible', 'claude-md', 'agent-skills'],
        faq: [
          { q: { ru: 'Memory Bank — что это?', en: 'What is a Memory Bank?' }, a: { ru: 'Папка memory-bank с шестью markdown-файлами, где агент держит контекст проекта между сессиями: цели, архитектуру, стек, текущий фокус и прогресс.', en: 'A memory-bank folder with six markdown files where the agent keeps project context between sessions: goals, architecture, stack, current focus and progress.' } },
          { q: { ru: 'Когда агент обновляет Memory Bank?', en: 'When does the agent update the Memory Bank?' }, a: { ru: 'После крупных изменений или по команде «update memory bank». Читает файлы в начале каждой задачи.', en: 'After large changes or on the “update memory bank” command. It reads the files at the start of every task.' } },
        ],
        source: { url: 'https://docs.cline.bot/best-practices/memory-bank', label: { ru: 'Cline: Memory Bank', en: 'Cline Memory Bank docs' } },
      },
      {
        slug: 'requirements',
        name: { ru: 'Требования', en: 'Requirements' },
        def: {
          ru: 'Требования — описание того, что система должна делать и при каких условиях. У каждого требования есть источник, и от него зависит, насколько серьёзной будет правка: мажорной или минорной.',
          en: 'Requirements is a description of what the system must do and under which conditions. Every requirement has a source, and it decides how serious an edit is: major or minor.',
        },
        match: { ru: ['требовани\\p{L}*'], en: ['requirements?'] },
        related: ['source', 'hallucination'],
        faq: [
          { q: { ru: 'Требования — что это?', en: 'What are requirements?' }, a: { ru: 'Описание того, что система должна делать и при каких условиях.', en: 'A description of what a system must do and under which conditions.' } },
          { q: { ru: 'Зачем у требования источник?', en: 'Why does a requirement need a source?' }, a: { ru: 'От источника зависит, насколько серьёзной будет правка: мажорной или минорной.', en: 'The source decides how serious a change is: major or minor.' } },
        ],
        source: { url: 'https://en.wikipedia.org/wiki/Requirements_engineering', label: { ru: 'Википедия: инженерия требований', en: 'Wikipedia: Requirements engineering' } },
      },
      {
        slug: 'c4-model',
        name: { ru: 'Модель C4', en: 'C4 model' },
        aka: { ru: 'схема устройства системы в четыре приближения', en: 'system structure in four zoom levels' },
        def: {
          ru: 'C4 — способ рисовать устройство программной системы в четыре приближения, как карту: от целой страны до отдельной улицы. На каждом уровне своя картинка, и уровни не смешивают в одну схему. Благодаря этому и новичок, и разработчик видят ровно столько подробностей, сколько им нужно. Название C4 — от четырёх слов на английском: context, containers, components, code.',
          en: 'C4 is a way to draw the structure of a software system at four zoom levels, like a map: from a whole country down to a single street. Each level gets its own picture, and levels are not mixed into one diagram. That way a newcomer and a developer each see exactly as much detail as they need. The name C4 comes from four English words: context, containers, components, code.',
        },
        notes: {
          title: { ru: 'Четыре уровня', en: 'Four levels' },
          items: [
            { name: { ru: 'Контекст', en: 'Context' }, text: { ru: 'система целиком одним блоком и те, кто с ней связан: люди и соседние системы. Вопрос: кто и зачем ею пользуется.', en: 'the whole system as one block and everyone linked to it: people and neighboring systems. The question: who uses it and why.' } },
            { name: { ru: 'Контейнеры', en: 'Containers' }, text: { ru: 'из каких отдельно запускаемых частей она состоит: сайт, сервер, база данных. Вопрос: из чего собрана система.', en: 'the separately running parts it is made of: a website, a server, a database. The question: what the system is built from.' } },
            { name: { ru: 'Компоненты', en: 'Components' }, text: { ru: 'из чего состоит одна такая часть, например сервер: оплата, заказы, промокоды. Вопрос: как устроена одна часть.', en: 'what one such part is made of, for example a server: payment, orders, promo codes. The question: how one part is organized.' } },
            { name: { ru: 'Код', en: 'Code' }, text: { ru: 'как устроен один компонент внутри: классы и функции. Этот уровень рисуют редко: его и так показывает сам код.', en: 'how one component is organized inside: classes and functions. This level is rarely drawn: the code itself shows it.' } },
          ],
        },
        match: { ru: ['C4(?:-диаграмм\\p{L}*| model)?', 'модел\\p{L}* C4'], en: ['C4 model', 'C4 diagrams?', 'C4'] },
        related: ['sequence-diagram', 'bounded-context', 'ddd', 'spec-driven-development'],
        more: { post: 'bug-report-to-reproduction-agent', label: { ru: 'Как агент рисует схемы по запросу: sequence и C4', en: 'How an agent draws diagrams on request: sequence and C4' } },
        faq: [
          { q: { ru: 'Модель C4 — что это?', en: 'What is the C4 model?' }, a: { ru: 'Способ рисовать устройство программной системы в четыре приближения: context, containers, components и code.', en: 'A way to draw a software system’s structure at four zoom levels: context, containers, components and code.' } },
          { q: { ru: 'Зачем четыре уровня?', en: 'Why four levels?' }, a: { ru: 'На каждом уровне своя картинка, поэтому и новичок, и разработчик видят ровно столько подробностей, сколько им нужно.', en: 'Each level has its own picture, so both a newcomer and a developer see exactly as much detail as they need.' } },
        ],
        source: { url: 'https://c4model.com/', label: { ru: 'c4model.com — сайт методологии, автор Саймон Браун', en: 'c4model.com, the method site by Simon Brown' } },
      },
      {
        slug: 'osi',
        name: { ru: 'Модель OSI', en: 'OSI model' },
        aka: { ru: 'семь уровней', en: 'seven layers' },
        def: {
          ru: 'Модель OSI — эталонная модель, которая раскладывает сетевое взаимодействие на семь уровней: от физического до прикладного. Каждый уровень может жить на другой физической системе, поэтому чем больше уровней и систем на пути запроса, тем больше мест, где он ломается. Через эту модель удобно оценивать, насколько задача на самом деле сложна для агента.',
          en: 'OSI model is a reference model that splits network communication into seven layers, from physical to application. Each layer may live on a different physical system, so the more layers and systems on the request path, the more places it can break. A handy lens for judging how hard a task really is for an agent.',
        },
        match: { ru: ['модел\\p{L}* OSI', 'OSI'], en: ['OSI model', 'OSI'] },
        related: ['bounded-context', 'c4-model'],
        faq: [
          { q: { ru: 'Модель OSI — что это?', en: 'What is the OSI model?' }, a: { ru: 'Эталонная модель, которая раскладывает сетевое взаимодействие на семь уровней: от физического до прикладного.', en: 'A reference model that splits network communication into seven layers, from physical to application.' } },
          { q: { ru: 'Зачем модель OSI для ИИ-агента?', en: 'Why use the OSI model for an AI agent?' }, a: { ru: 'Чем больше уровней и систем на пути запроса, тем больше мест, где он ломается. По этой модели удобно оценивать, насколько задача сложна для агента.', en: 'The more layers and systems a request crosses, the more places it can break. The model helps estimate how hard a task really is for an agent.' } },
        ],
        source: { url: 'https://www.iso.org/standard/20269.html', label: { ru: 'ISO/IEC 7498-1 — стандарт модели OSI', en: 'ISO/IEC 7498-1, the OSI model standard' } },
      },
      {
        slug: 'epimorphism',
        name: { ru: 'Эпиморфизм', en: 'Epimorphism' },
        aka: { ru: 'соответствие без пустых мест', en: 'a matching with no empty spots' },
        def: {
          ru: 'Эпиморфизм — соответствие, при котором каждая часть результата получена из чего-то в источнике: непокрытых частей нет. Для ответа агента это значит, что у каждого утверждения есть опора в данных. Там, где опоры нет, остаётся пустое место, и модель заполняет его догадкой: так возникает галлюцинация.',
          en: 'An epimorphism is a matching where every part of the result comes from something in the source: no part is left uncovered. For an agent’s answer it means every statement has support in the data. Where there is no support an empty spot remains, and the model fills it with a guess: that is how a hallucination arises.',
        },
        match: { ru: ['эпиморфизм\\p{L}*'], en: ['epimorphisms?'] },
        related: ['hallucination', 'source', 'context'],
        faq: [
          { q: { ru: 'Эпиморфизм — что это простыми словами?', en: 'What is an epimorphism in plain words?' }, a: { ru: 'Соответствие, при котором каждая часть результата получена из чего-то в источнике: непокрытых частей нет.', en: 'A mapping where every part of the result comes from something in the source: no part is left uncovered.' } },
          { q: { ru: 'Как эпиморфизм связан с галлюцинациями?', en: 'How does an epimorphism relate to hallucinations?' }, a: { ru: 'Если у каждого утверждения ответа есть опора в данных, галлюцинации нет. Там, где опоры нет, модель заполняет пустое место догадкой.', en: 'If every statement in the answer has support in the data, there is no hallucination. Where support is missing, the model fills the gap with a guess.' } },
        ],
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
          ru: 'JavaScript — язык программирования, на котором работают страницы сайтов в браузере: кнопки, формы и всё, что откликается на действия. Им же пишут программы на сервере, например в среде Node.js. Тесты для такого кода запускают движки вроде Jest, Vitest и QUnit.',
          en: 'JavaScript is a programming language that makes web pages work in the browser: buttons, forms and everything that reacts to actions. It is also used for server programs, for example in Node.js. Tests for such code are run by engines such as Jest, Vitest and QUnit.',
        },
        match: { ru: ['JavaScript'], en: ['JavaScript'] },
        related: ['automated-test', 'node-js', 'jest', 'vitest', 'qunit'],
        faq: [
          { q: { ru: 'JavaScript — что это?', en: 'What is JavaScript?' }, a: { ru: 'Язык программирования, на котором работают страницы сайтов в браузере: кнопки, формы и всё, что откликается на действия.', en: 'The programming language that runs web pages in the browser: buttons, forms and everything that reacts to actions.' } },
          { q: { ru: 'Где ещё работает JavaScript?', en: 'Where else does JavaScript run?' }, a: { ru: 'На сервере, например в среде Node.js.', en: 'On the server, for example in Node.js.' } },
        ],
        source: { url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', label: { ru: 'MDN: JavaScript', en: 'MDN: JavaScript' } },
      },
      {
        slug: 'typescript',
        name: { ru: 'TypeScript', en: 'TypeScript' },
        aka: { ru: 'JavaScript с типами', en: 'JavaScript with types' },
        def: {
          ru: 'TypeScript — надстройка над JavaScript, в которой у значений указывают тип: число, строка и так далее. Благодаря этому ошибки вроде «вместо числа передали строку» находятся до запуска программы, а не у пользователя. Готовую программу переводят в обычный JavaScript.',
          en: 'TypeScript is an extension of JavaScript in which values are given a type: number, string and so on. Thanks to this, errors like “a string was passed instead of a number” are found before the program runs, not at the user’s. The finished program is turned into ordinary JavaScript.',
        },
        match: { ru: ['TypeScript'], en: ['TypeScript'] },
        related: ['javascript', 'babel', 'jest'],
        faq: [
          { q: { ru: 'TypeScript — что это?', en: 'What is TypeScript?' }, a: { ru: 'Надстройка над JavaScript, в которой у значений указывают тип: число, строка и так далее.', en: 'A layer over JavaScript where values have declared types: number, string and so on.' } },
          { q: { ru: 'Зачем TypeScript?', en: 'Why use TypeScript?' }, a: { ru: 'Ошибки вроде «вместо числа передали строку» находятся до запуска программы, а не у пользователя.', en: 'Mistakes like passing a string instead of a number are caught before the program runs, before a user sees them.' } },
        ],
        source: { url: 'https://www.typescriptlang.org/', label: { ru: 'typescriptlang.org — сайт TypeScript', en: 'typescriptlang.org, the TypeScript site' } },
      },
      {
        slug: 'babel',
        name: { ru: 'Babel', en: 'Babel' },
        aka: { ru: 'переводчик нового JavaScript', en: 'a translator of new JavaScript' },
        def: {
          ru: 'Babel — программа, которая переводит новый JavaScript в такой, который понимают более старые браузеры и среды. Можно писать современным языком, а запускать там, где его ещё не знают. Тесты в Jest работают и с проектами, которые собираются через Babel.',
          en: 'Babel is a program that turns new JavaScript into one that older browsers and environments understand. You can write in the modern language and run it where it is not yet known. Jest tests work with projects that are built through Babel too.',
        },
        match: { ru: ['Babel'], en: ['Babel'] },
        related: ['javascript', 'typescript', 'jest'],
        faq: [
          { q: { ru: 'Babel — что это?', en: 'What is Babel?' }, a: { ru: 'Программа, которая переводит новый JavaScript в такой, который понимают более старые браузеры и среды.', en: 'A program that translates new JavaScript into code older browsers and environments understand.' } },
          { q: { ru: 'Зачем Babel?', en: 'Why use Babel?' }, a: { ru: 'Чтобы писать современным языком и запускать код там, где его ещё не знают.', en: 'To write in the modern language and run the code where it is not yet supported.' } },
        ],
        source: { url: 'https://babeljs.io/', label: { ru: 'babeljs.io — сайт Babel', en: 'babeljs.io, the Babel site' } },
      },
      {
        slug: 'node-js',
        name: { ru: 'Node.js', en: 'Node.js' },
        aka: { ru: 'JavaScript вне браузера', en: 'JavaScript outside the browser' },
        def: {
          ru: 'Node.js — программа, которая запускает JavaScript вне браузера: на сервере, в командной строке и в скриптах. Без неё код на JavaScript работал бы только внутри страницы сайта. Благодаря Node.js на одном языке пишут и сайт, и серверную часть, и программы для разработчика. Тесты на Jest, Vitest и QUnit чаще всего тоже запускают в Node.js, а сборщик Vite сам работает на нём.',
          en: 'Node.js is a program that runs JavaScript outside the browser: on a server, on the command line and in scripts. Without it, JavaScript code would only work inside a web page. Thanks to Node.js one language is used for the site, the server side and developer programs. Tests with Jest, Vitest and QUnit are most often run in Node.js too, and the Vite bundler itself runs on it.',
        },
        match: { ru: ['Node\\.js'], en: ['Node\\.js'] },
        related: ['javascript', 'vite', 'jest', 'vitest', 'qunit'],
        faq: [
          { q: { ru: 'Node.js — что это?', en: 'What is Node.js?' }, a: { ru: 'Программа, которая запускает JavaScript вне браузера: на сервере, в командной строке и в скриптах.', en: 'A program that runs JavaScript outside the browser: on the server, on the command line and in scripts.' } },
          { q: { ru: 'Зачем нужен Node.js?', en: 'Why is Node.js needed?' }, a: { ru: 'Благодаря ему на одном языке пишут и сайт, и сервер.', en: 'It lets one language serve both the website and the server.' } },
        ],
        source: { url: 'https://nodejs.org/', label: { ru: 'nodejs.org — сайт Node.js', en: 'nodejs.org, the Node.js site' } },
      },
      {
        slug: 'vite',
        name: { ru: 'Vite', en: 'Vite' },
        aka: { ru: 'сборщик для сайтов', en: 'a bundler for web apps' },
        def: {
          ru: 'Vite — программа, которая собирает код сайта и в процессе работы мгновенно показывает правки в браузере. Его настройки описывают, как собирать проект. Vitest берёт эти же настройки для тестов, поэтому отдельная конфигурация для тестов не нужна.',
          en: 'Vite is a program that builds the code of a website and instantly shows edits in the browser while you work. Its settings describe how to build the project. Vitest reuses these same settings for tests, so no separate test configuration is needed.',
        },
        match: { ru: ['Vite'], en: ['Vite'] },
        related: ['vitest', 'javascript', 'node-js'],
        faq: [
          { q: { ru: 'Vite — что это?', en: 'What is Vite?' }, a: { ru: 'Программа, которая собирает код сайта и в процессе работы мгновенно показывает правки в браузере.', en: 'A program that builds a site’s code and shows edits in the browser instantly while you work.' } },
          { q: { ru: 'Как Vite связан с Vitest?', en: 'How is Vite related to Vitest?' }, a: { ru: 'Vitest берёт настройки Vite для тестов, поэтому отдельная настройка тестов не нужна.', en: 'Vitest reuses Vite’s settings for tests, so no separate test configuration is needed.' } },
        ],
        source: { url: 'https://vite.dev/', label: { ru: 'vite.dev — сайт Vite', en: 'vite.dev, the Vite site' } },
      },
      {
        slug: 'react-js',
        name: { ru: 'React', en: 'React' },
        aka: { ru: 'библиотека для сайтов, не путать с ReAct', en: 'a web library, not to be confused with ReAct' },
        def: {
          ru: 'React — библиотека на JavaScript для построения страниц сайтов: страница собирается из готовых блоков-компонентов, и при изменении данных обновляются только нужные блоки. Одна из самых распространённых наряду с Angular и Vue. К схеме работы агента ReAct отношения не имеет, у них только похожие названия.',
          en: 'React is a JavaScript library for building web pages: a page is assembled from ready-made blocks called components, and when data changes only the needed blocks are updated. One of the most widespread along with Angular and Vue. It has nothing to do with the ReAct agent scheme: only the names are similar.',
        },
        match: { ru: ['React'], en: ['React'] },
        exact: 'React',
        related: ['javascript', 'angular', 'vue', 'react'],
        faq: [
          { q: { ru: 'React — что это?', en: 'What is React?' }, a: { ru: 'Библиотека на JavaScript для построения страниц сайтов: страница собирается из блоков-компонентов.', en: 'A JavaScript library for building web pages: a page is assembled from component blocks.' } },
          { q: { ru: 'Чем React отличается от ReAct?', en: 'How is React different from ReAct?' }, a: { ru: 'React — библиотека для страниц сайтов, ReAct — схема работы ИИ-агента. Совпадает только написание.', en: 'React is a library for web pages, ReAct is an AI agent pattern. Only the spelling is similar.' } },
        ],
        source: { url: 'https://react.dev/', label: { ru: 'react.dev — сайт React', en: 'react.dev, the React site' } },
      },
      {
        slug: 'angular',
        name: { ru: 'Angular', en: 'Angular' },
        aka: { ru: 'каркас для сайтов', en: 'a web framework' },
        def: {
          ru: 'Angular — каркас для построения сайтов и веб-приложений на JavaScript и TypeScript: страница собирается из готовых блоков-компонентов. Один из самых распространённых наряду с React и Vue.',
          en: 'Angular is a framework for building websites and web apps in JavaScript and TypeScript: a page is assembled from ready-made blocks called components. One of the most widespread along with React and Vue.',
        },
        match: { ru: ['Angular'], en: ['Angular'] },
        related: ['javascript', 'typescript', 'react-js', 'vue'],
        faq: [
          { q: { ru: 'Angular — что это?', en: 'What is Angular?' }, a: { ru: 'Каркас для построения сайтов и веб-приложений на JavaScript и TypeScript: страница собирается из блоков-компонентов.', en: 'A framework for building websites and web apps in JavaScript and TypeScript: a page is assembled from component blocks.' } },
          { q: { ru: 'Чем Angular отличается от React и Vue?', en: 'How is Angular different from React and Vue?' }, a: { ru: 'Все три собирают страницу из компонентов и входят в число самых распространённых. Angular — полный каркас, React — библиотека.', en: 'All three build a page from components and are among the most widely used. Angular is a full framework, React is a library.' } },
        ],
        source: { url: 'https://angular.dev/', label: { ru: 'angular.dev — сайт Angular', en: 'angular.dev, the Angular site' } },
      },
      {
        slug: 'vue',
        name: { ru: 'Vue', en: 'Vue' },
        aka: { ru: 'каркас для сайтов', en: 'a web framework' },
        def: {
          ru: 'Vue — каркас для построения сайтов на JavaScript: страница собирается из блоков-компонентов, и его можно подключать к проекту постепенно. Один из самых распространённых наряду с Angular и React.',
          en: 'Vue is a framework for building websites in JavaScript: a page is assembled from blocks called components, and it can be adopted in a project gradually. One of the most widespread along with Angular and React.',
        },
        match: { ru: ['Vue(?:\\.js)?'], en: ['Vue(?:\\.js)?'] },
        related: ['javascript', 'react-js', 'angular', 'typescript'],
        faq: [
          { q: { ru: 'Vue — что это?', en: 'What is Vue?' }, a: { ru: 'Каркас для построения сайтов на JavaScript: страница собирается из блоков-компонентов.', en: 'A JavaScript framework for building websites: a page is assembled from component blocks.' } },
          { q: { ru: 'Чем Vue удобен?', en: 'What makes Vue convenient?' }, a: { ru: 'Его можно подключать к проекту постепенно.', en: 'It can be added to a project gradually.' } },
        ],
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
          ru: 'Автоматический тест — короткая программа, которая запускает код с заданным входом и сверяет результат с ожидаемым. Её пишут один раз, а запускают после каждой правки, и если правка сломала работавшее, тест падает. Движки вроде Jest, Vitest и QUnit запускают такие тесты для кода на JavaScript. Тест ловит только то, что вы заранее придумали проверить, поэтому его дополняют моделями правил и проверкой самих тестов.',
          en: 'An automated test is a short program that runs code with a given input and compares the result with the expected one. It is written once and run after every edit, and if an edit broke something that worked, the test fails. Engines such as Jest, Vitest and QUnit run such tests for JavaScript code. A test catches only what you thought of checking in advance, so it is complemented by models of rules and by checking the tests themselves.',
        },
        match: { ru: ['автоматическ\\p{L}* тест\\p{L}*', 'автотест\\p{L}*', 'тестов\\p{L}* движк\\p{L}*'], en: ['automated tests?', 'autotests?', 'test engines?', 'test frameworks?'] },
        related: ['qunit', 'jest', 'vitest', 'mutation-testing', 'checks', 'quint'],
        also: [{ post: 'quint-vs-tests-and-tla', label: { ru: 'Чем Quint отличается от QUnit, Jest и TLA+', en: 'How Quint differs from QUnit, Jest and TLA+' } }],
        faq: [
          { q: { ru: 'Что такое автотест?', en: 'What is an automated test?' }, a: { ru: 'Короткая программа, которая запускает код с заданным входом и сверяет результат с ожидаемым после каждой правки.', en: 'A short program that runs code with a given input and compares the result with the expected one after every change.' } },
          { q: { ru: 'Чего автотест не поймает?', en: 'What will an automated test miss?' }, a: { ru: 'Тест ловит только то, что вы заранее придумали проверить, поэтому его дополняют моделями правил и проверкой самих тестов.', en: 'A test catches only what you thought to check in advance, so it is complemented with rule models and checks of the tests themselves.' } },
        ],
        source: { url: 'https://en.wikipedia.org/wiki/Test_automation', label: { ru: 'Википедия: автоматизация тестирования', en: 'Wikipedia: Test automation' } },
      },
      {
        slug: 'qa',
        name: { ru: 'QA', en: 'QA' },
        aka: { ru: 'quality assurance, тестировщик, инженер по качеству', en: 'quality assurance, tester' },
        def: {
          ru: 'QA (quality assurance, «обеспечение качества») — работа по обеспечению качества продукта и роль человека, который её ведёт: он проверяет, что продукт делает обещанное, и находит баги раньше пользователей. QA воспроизводит ошибку, описывает её так, чтобы разработчик мог повторить, и принимает исправление. Когда рутину по багам берёт агент, QA проверяет его результат руками и решает, насколько баг важен.',
          en: 'QA (quality assurance) is the work of ensuring a product’s quality and the role of the person who does it: they check that the product does what it promises and find bugs before users do. QA reproduces an error, describes it so a developer can repeat it, and accepts the fix. When an agent takes over the routine around bugs, QA checks its result by hand and decides how important the bug is.',
        },
        match: { ru: ['QA', 'тестировщик\\p{L}*', 'инженер\\p{L}* по качеству'], en: ['QA', 'testers?', 'quality assurance'] },
        related: ['bug', 'automated-test', 'test-stand', 'test-env', 'ai-agent', 'jira'],
        more: { post: 'bug-report-to-reproduction-agent', label: { ru: 'Как QA отдаёт рутину по багу агенту', en: 'How QA hands bug routine to an agent' } },
        faq: [
          { q: { ru: 'QA — что это?', en: 'What is QA?' }, a: { ru: 'Quality assurance, «обеспечение качества»: роль человека, который проверяет, что продукт делает обещанное, и находит баги раньше пользователей.', en: 'Quality assurance: the role of a person who checks that the product does what it promises and finds bugs before users do.' } },
          { q: { ru: 'Что делает QA, когда баги разбирает агент?', en: 'What does QA do when an agent handles bugs?' }, a: { ru: 'Проверяет результат агента руками и решает, насколько баг важен.', en: 'Checks the agent’s result by hand and decides how important the bug is.' } },
          { q: { ru: 'Чем QA отличается от QC и тестирования?', en: 'How is QA different from QC and testing?' }, a: { ru: 'QA предотвращает дефекты: следит за процессом и улучшает его, чтобы ошибок было меньше. QC (quality control, контроль качества) обнаруживает дефекты в готовом результате. Тестирование — один из способов такой проверки.', en: 'QA prevents defects: it watches and improves the process so fewer errors appear. QC (quality control) detects defects in the finished output. Testing is one of the ways to do that check.' } },
        ],
        source: { url: 'https://en.wikipedia.org/wiki/Quality_assurance', label: { ru: 'Википедия: Quality assurance', en: 'Wikipedia: Quality assurance' } },
        seo: {
          title: { ru: 'QA: что это в IT и чем QA отличается от QC и тестирования', en: 'QA (quality assurance): what it is, QA vs QC vs testing' },
          description: {
            ru: 'QA (quality assurance) — обеспечение качества: процесс и роль, которые не дают багам дойти до пользователей. Чем QA отличается от QC и тестирования и что делает QA рядом с ИИ-агентом.',
            en: 'QA (quality assurance) is the process and the role that keep bugs from reaching users. How QA differs from QC and testing, and what QA does next to an AI agent.',
          },
        },
      },
      {
        slug: 'bug',
        name: { ru: 'Баг', en: 'Bug' },
        aka: { ru: 'ошибка в программе, дефект', en: 'software bug, defect' },
        def: {
          ru: 'Баг — ошибка в программе: она делает не то, что задумано, или падает. Обычно баг приходит от клиента жалобой в одну строку, а QA превращает её в точные шаги, по которым ошибку повторит любой. Чем короче путь до бага, тем быстрее его чинят.',
          en: 'A bug is an error in a program: it does something other than intended, or crashes. A bug usually arrives from a client as a one-line complaint, and QA turns it into exact steps anyone can use to repeat the error. The shorter the path to the bug, the faster it gets fixed.',
        },
        match: { ru: ['баг(?:а|у|ом|е|и|ов|ам|ами|ах)?', 'дефект\\p{L}*'], en: ['bugs?'] },
        related: ['qa', 'test-stand', 'sequence-diagram', 'poc'],
        more: { post: 'bug-report-to-reproduction-agent', label: { ru: 'Как QA отдаёт рутину по багу агенту', en: 'How QA hands bug routine to an agent' } },
        faq: [
          { q: { ru: 'Что такое баг?', en: 'What is a bug?' }, a: { ru: 'Ошибка в программе: она делает не то, что задумано, или падает.', en: 'An error in a program: it does something other than intended, or crashes.' } },
          { q: { ru: 'Как быстрее исправить баг?', en: 'How do you fix a bug faster?' }, a: { ru: 'Превратить жалобу в точные шаги, по которым ошибку повторит любой. Чем короче путь до бага, тем быстрее его чинят.', en: 'Turn the complaint into exact steps anyone can follow to reproduce it. The shorter the path to the bug, the faster it gets fixed.' } },
        ],
        source: { url: 'https://en.wikipedia.org/wiki/Software_bug', label: { ru: 'Википедия: Software bug', en: 'Wikipedia: Software bug' } },
      },
      {
        slug: 'sequence-diagram',
        name: { ru: 'Диаграмма последовательности', en: 'Sequence diagram' },
        aka: { ru: 'sequence-диаграмма', en: 'sequence chart' },
        def: {
          ru: 'Диаграмма последовательности показывает, как участники системы обмениваются сообщениями по порядку времени: участники стоят сверху, стрелки идут вниз. По ней видно, кто кого вызвал и на каком шаге всё сломалось. Агент рисует такую диаграмму по запросу, чтобы разработчик сразу увидел место ошибки.',
          en: 'A sequence diagram shows how the parts of a system exchange messages in time order: participants stand at the top and arrows run downward. It shows who called whom and at which step things broke. An agent draws such a diagram on request so the developer sees the place of the error at once.',
        },
        match: { ru: ['диаграмм\\p{L}* последовательности', 'sequence(?:-диаграмм\\p{L}*)?'], en: ['sequence diagrams?'] },
        related: ['c4-model', 'bug', 'api'],
        faq: [
          { q: { ru: 'Диаграмма последовательности — что это?', en: 'What is a sequence diagram?' }, a: { ru: 'Схема, где участники системы стоят сверху, а стрелки сообщений идут вниз по порядку времени.', en: 'A diagram with the system’s participants at the top and message arrows running down in time order.' } },
          { q: { ru: 'Зачем диаграмма последовательности?', en: 'Why use a sequence diagram?' }, a: { ru: 'По ней видно, кто кого вызвал и на каком шаге всё сломалось.', en: 'It shows who called whom and at which step things broke.' } },
        ],
        source: { url: 'https://en.wikipedia.org/wiki/Sequence_diagram', label: { ru: 'Википедия: Sequence diagram', en: 'Wikipedia: Sequence diagram' } },
      },
      {
        slug: 'api',
        name: { ru: 'API', en: 'API' },
        aka: { ru: 'программный интерфейс', en: 'application programming interface' },
        def: {
          ru: 'API — набор правил, по которым одна программа обращается к другой: какие запросы можно отправить и какие ответы придут. Через API агент вызывает сервис напрямую, без браузера. Например, оплата обращается к сервису промокодов именно через его API.',
          en: 'An API is a set of rules by which one program calls another: which requests can be sent and which answers come back. Through an API an agent calls a service directly, without a browser. For example, payment calls the promo-code service through its API.',
        },
        match: { ru: ['API'], en: ['APIs?'] },
        related: ['mcp', 'sequence-diagram', 'poc'],
        faq: [
          { q: { ru: 'API — что это?', en: 'What is an API?' }, a: { ru: 'Набор правил, по которым одна программа обращается к другой: какие запросы можно отправить и какие ответы придут.', en: 'A set of rules for how one program talks to another: which requests can be sent and which responses come back.' } },
          { q: { ru: 'Зачем агенту API?', en: 'Why does an agent use an API?' }, a: { ru: 'Через API агент вызывает сервис напрямую, без браузера.', en: 'Through an API the agent calls a service directly, without a browser.' } },
        ],
        source: { url: 'https://en.wikipedia.org/wiki/API', label: { ru: 'Википедия: API', en: 'Wikipedia: API' } },
      },
      {
        slug: 'poc',
        name: { ru: 'PoC', en: 'PoC' },
        aka: { ru: 'proof of concept, доказательство осуществимости', en: 'proof of concept' },
        def: {
          ru: 'PoC (proof of concept, «доказательство осуществимости») — небольшой код или сценарий, который показывает, что проблема действительно воспроизводится. Для бага это короткий запуск без браузера, который повторяет ошибку. Агент пишет такой PoC по коду и тестам, чтобы подтвердить баг.',
          en: 'A PoC (proof of concept) is a small piece of code or a script that shows the problem really reproduces. For a bug it is a short run without a browser that repeats the error. An agent writes such a PoC from the code and tests to confirm the bug.',
        },
        match: { ru: ['PoC', 'proof of concept'], en: ['PoC', 'proof of concept'] },
        related: ['bug', 'automated-test', 'test-stand'],
        faq: [
          { q: { ru: 'PoC — что это в программировании?', en: 'What is a PoC in programming?' }, a: { ru: 'Proof of concept: небольшой код или сценарий, который показывает, что проблема действительно воспроизводится.', en: 'Proof of concept: a small piece of code or a scenario that shows the problem really reproduces.' } },
          { q: { ru: 'Зачем агенту PoC для бага?', en: 'Why does an agent write a PoC for a bug?' }, a: { ru: 'Чтобы подтвердить баг: короткий запуск без браузера повторяет ошибку, и её видно до исправления.', en: 'To confirm the bug: a short run without a browser repeats the error, so it is visible before the fix.' } },
        ],
        source: { url: 'https://en.wikipedia.org/wiki/Proof_of_concept', label: { ru: 'Википедия: Proof of concept', en: 'Wikipedia: Proof of concept' } },
      },
      {
        slug: 'jest',
        name: { ru: 'Jest', en: 'Jest' },
        aka: { ru: 'движок тестов для JavaScript', en: 'a JavaScript test framework' },
        def: {
          ru: 'Jest — один из самых распространённых движков автоматических тестов для кода на JavaScript. Вы описываете, что функция должна вернуть на заданный вход, а Jest запускает все такие проверки и показывает, какие упали. Из той же семьи, что Vitest и QUnit, и проверяет готовый код, а не правила системы, как Quint.',
          en: 'Jest — one of the most widespread automated test frameworks for JavaScript code. You describe what a function must return for a given input, and Jest runs all such checks and shows which ones failed. From the same family as Vitest and QUnit, and it checks finished code, not the rules of a system as Quint does.',
        },
        match: { ru: ['Jest'], en: ['Jest'] },
        related: ['automated-test', 'javascript', 'vitest', 'qunit'],
        also: [{ post: 'quint-vs-tests-and-tla', label: { ru: 'Чем Quint отличается от QUnit, Jest и TLA+', en: 'How Quint differs from QUnit, Jest and TLA+' } }],
        faq: [
          { q: { ru: 'Jest — что это?', en: 'What is Jest?' }, a: { ru: 'Один из самых распространённых движков автоматических тестов для кода на JavaScript.', en: 'One of the most widely used automated testing frameworks for JavaScript.' } },
          { q: { ru: 'Jest или Vitest?', en: 'Jest or Vitest?' }, a: { ru: 'Делают одно и то же. На проекте с Vite удобнее Vitest, на остальных Jest остаётся надёжным выбором.', en: 'They do the same job. On a Vite project Vitest is handier; elsewhere Jest remains a solid choice.' } },
        ],
        source: { url: 'https://jestjs.io/', label: { ru: 'jestjs.io — сайт Jest', en: 'jestjs.io, the Jest site' } },
      },
      {
        slug: 'vitest',
        name: { ru: 'Vitest', en: 'Vitest' },
        aka: { ru: 'тесты на базе сборщика Vite', en: 'tests powered by Vite' },
        def: {
          ru: 'Vitest — движок автоматических тестов для JavaScript нового поколения, построенный на сборщике Vite. Делает то же, что Jest: запускает проверки готового кода и показывает упавшие, но использует настройки проекта на Vite и поэтому быстро перезапускается. Из той же семьи, что Jest и QUnit.',
          en: 'Vitest is a next-generation automated test framework for JavaScript, powered by the Vite bundler. It does what Jest does: runs checks of finished code and shows the failed ones, but it reuses the project’s Vite setup and so restarts quickly. From the same family as Jest and QUnit.',
        },
        match: { ru: ['Vitest'], en: ['Vitest'] },
        related: ['automated-test', 'javascript', 'jest', 'qunit'],
        also: [{ post: 'quint-vs-tests-and-tla', label: { ru: 'Чем Quint отличается от QUnit, Jest и TLA+', en: 'How Quint differs from QUnit, Jest and TLA+' } }],
        faq: [
          { q: { ru: 'Что такое Vitest?', en: 'What is Vitest?' }, a: { ru: 'Движок автоматических тестов для JavaScript, построенный на сборщике Vite.', en: 'An automated testing framework for JavaScript built on the Vite bundler.' } },
          { q: { ru: 'Vitest или Jest?', en: 'Vitest or Jest?' }, a: { ru: 'На проекте с Vite берите Vitest: он использует те же настройки и быстро перезапускается. Делают они одно и то же.', en: 'On a Vite project take Vitest: it reuses the same settings and reruns quickly. They do the same job.' } },
        ],
        source: { url: 'https://vitest.dev/', label: { ru: 'vitest.dev — сайт Vitest', en: 'vitest.dev, the Vitest site' } },
      },
      {
        slug: 'qunit',
        name: { ru: 'QUnit', en: 'QUnit' },
        aka: { ru: 'тестовый движок для JavaScript', en: 'a JavaScript test framework' },
        def: {
          ru: 'QUnit — движок автоматических тестов для кода на JavaScript, из той же семьи, что Jest и Vitest. Тест подаёт заданный вход в готовую функцию и сверяет ответ с ожидаемым. Названием похож на Quint, но это программа другого класса: QUnit проверяет написанный код, а Quint проверяет правила системы. Надёжность самих тестов проверяет мутационное тестирование: в код вносят порчу и смотрят, упадёт ли тест.',
          en: 'QUnit is an automated test framework for JavaScript code, from the same family as Jest and Vitest. A test feeds a given input to a finished function and compares the answer with the expected one. The name resembles Quint, but it is a program of a different class: QUnit checks written code, while Quint checks the rules of a system. The reliability of the tests themselves is checked by mutation testing: a defect is introduced into the code to see whether a test fails.',
        },
        match: { ru: ['QUnit'], en: ['QUnit'] },
        related: ['automated-test', 'jest', 'vitest', 'mutation-testing', 'quint', 'model-checking'],
        also: [{ post: 'quint-vs-tests-and-tla', label: { ru: 'Чем Quint отличается от QUnit, Jest и TLA+', en: 'How Quint differs from QUnit, Jest and TLA+' } }],
        faq: [
          { q: { ru: 'QUnit — что это?', en: 'What is QUnit?' }, a: { ru: 'Движок автоматических тестов для JavaScript из той же семьи, что Jest и Vitest.', en: 'An automated testing framework for JavaScript from the same family as Jest and Vitest.' } },
          { q: { ru: 'QUnit и Quint — одно и то же?', en: 'Are QUnit and Quint the same?' }, a: { ru: 'Нет: QUnit запускает тесты готового кода, Quint — язык для описания и проверки правил системы до кода.', en: 'No: QUnit runs tests on finished code, Quint is a language for describing and checking a system’s rules before the code.' } },
        ],
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
          ru: 'Мутационное тестирование — способ проверить сами проверки: человек или агент нарочно портит копию кода или модели, например убирает одно условие, и смотрит, заметят ли это автоматические тесты и правила. Если порча прошла незамеченной, проверка ничего не проверяет. В моделях на Quint такие копии называют мутантами.',
          en: 'Mutation testing is a way to test the checks themselves: a person or an agent deliberately breaks a copy of the code or model, for example removes one condition, and sees whether tests and rules notice it. If the defect passes unnoticed, the check checks nothing. In Quint models such copies are called mutants.',
        },
        match: { ru: ['испорченн\\p{L}* коп\\p{L}*', 'мутационн\\p{L}* тестировани\\p{L}*', 'mutation testing'], en: ['mutation testing', 'broken cop(?:y|ies)'] },
        related: ['automated-test', 'qunit', 'model-checking', 'quint'],
        more: { post: 'quint-models-find-races', label: { ru: 'Проверка проверок в моделях на Quint', en: 'Checking the checks in Quint models' } },
        faq: [
          { q: { ru: 'Мутационное тестирование — что это?', en: 'What is mutation testing?' }, a: { ru: 'Способ проверить сами проверки: копию кода нарочно портят и смотрят, заметят ли это тесты.', en: 'A way to check the checks themselves: a copy of the code is broken on purpose to see whether the tests notice.' } },
          { q: { ru: 'Что значит, если порча прошла незамеченной?', en: 'What does it mean if the break goes unnoticed?' }, a: { ru: 'Тесты этот случай не проверяют, и их нужно дополнить.', en: 'The tests do not cover this case and need to be extended.' } },
        ],
        source: { url: 'https://en.wikipedia.org/wiki/Mutation_testing', label: { ru: 'Википедия: мутационное тестирование', en: 'Wikipedia: Mutation testing' } },
      },
    ],
  },
  {
    slug: 'environments',
    icon: 'code',
    name: { ru: 'Среды и стенды', en: 'Environments' },
    hint: { ru: 'Где живёт система на пути изменения к пользователям', en: 'Where a system lives on a change’s way to users' },
    terms: [
      {
        slug: 'environment',
        name: { ru: 'Среда (окружение)', en: 'Environment' },
        aka: { ru: 'окружение, среда развёртывания, environment', en: 'deployment environment, stage' },
        def: {
          ru: 'Среда (окружение) — отдельная копия системы со своей задачей: на одной пишут код, на другой проверяют, на третьей работают пользователи. Изменение проходит по средам по порядку: локальная, дев (рядом с ним — фича-стенды), тест, препрод, демо, прод. Чем ближе к проду, тем ближе к настоящим настройки и данные и тем дороже ошибка.',
          en: 'An environment is a separate copy of a system with its own job: code is written on one, checked on another, and users work on a third. A change moves through the environments in order: local, dev (with feature stands alongside it), test, pre-prod, demo, prod. The closer to production, the closer the settings and data are to the real ones and the more a mistake costs.',
        },
        match: { ru: ['окружени\\p{L}*', 'сред\\p{L}* развёртывани\\p{L}*'], en: ['deployment environments?'] },
        related: ['time-to-market', 'sandbox', 'human-in-the-loop'],
        faq: [
          { q: { ru: 'Какие бывают среды разработки?', en: 'What environments are there?' }, a: { ru: 'Локальная, дев и фича-стенды рядом с ним, тест, препрод, демо и прод. Изменение проходит по ним по порядку.', en: 'Local, dev with feature stands alongside, test, pre-prod, demo and production. A change moves through them in order.' } },
          { q: { ru: 'Чем среды отличаются друг от друга?', en: 'How do environments differ?' }, a: { ru: 'Задачей: на одной пишут код, на другой проверяют, на третьей работают пользователи. Чем ближе к проду, тем ближе к настоящим данные и тем дороже ошибка.', en: 'By purpose: code is written on one, checked on another, and users work on a third. The closer to production, the more real the data and the costlier a mistake.' } },
        ],
        source: { url: 'https://en.wikipedia.org/wiki/Deployment_environment', label: { ru: 'Википедия: среды развёртывания', en: 'Wikipedia: Deployment environment' } },
        seo: {
          title: { ru: 'Среды: локальная, дев, тест, препрод, прод — что это и чем отличаются', en: 'Environments: local, dev, test, pre-prod, prod — what they are and how they differ' },
          description: {
            ru: 'Среды (окружения) — отдельные копии системы на пути изменения к пользователям: локальная, дев, тест, препрод, демо, прод. Чем отличаются и кто там работает.',
            en: 'Environments are separate copies of a system on a change’s way to users: local, dev, test, pre-prod, demo, prod. How they differ and who works there.',
          },
        },
        parts: { title: { ru: 'Какие бывают среды', en: 'Kinds of environments' }, slugs: ['local-env', 'feature-stand', 'dev-env', 'test-env', 'preprod', 'demo-env', 'prod'] },
        compare: {
          title: { ru: 'Все среды: что проверяют, кто заходит, какие данные', en: 'All environments: what they check, who uses them, what data' },
          head: { ru: ['Локальная', 'Фича-стенд', 'Дев', 'Тест', 'Препрод', 'Демо', 'Прод'], en: ['Local', 'Feature', 'Dev', 'Test', 'Pre-prod', 'Demo', 'Prod'] },
          headSlugs: ['local-env', 'feature-stand', 'dev-env', 'test-env', 'preprod', 'demo-env', 'prod'],
          rows: [
            { ru: ['Что проверяют', 'пишу и пробую', 'одна ветка отдельно', 'код сходится', 'все интегрируются часто', 'как на проде', 'показ клиенту', 'работают люди'], en: ['What it checks', 'write and try', 'one branch on its own', 'code fits together', 'everyone integrates often', 'like production', 'client demo', 'users at work'] },
            { ru: ['Тестовый стенд', 'нет', 'да', 'да', 'да', 'да', 'не всегда', 'нет'], en: ['Test stand', 'no', 'yes', 'yes', 'yes', 'yes', 'not always', 'no'] },
            { ru: ['Кто заходит', 'разработчик', 'автор ветки', 'команда', 'QA', 'команда', 'заказчик', 'клиенты'], en: ['Who uses it', 'a developer', 'the branch author', 'the team', 'QA', 'the team', 'the client', 'customers'] },
            { ru: ['Данные', 'тестовые', 'тестовые', 'тестовые', 'копия рабочих или моки', 'свежая копия рабочих', 'примеры или настоящие', 'настоящие'], en: ['Data', 'test', 'test', 'test', 'a copy of production or mocks', 'a fresh copy of production', 'samples or real', 'real'] },
            { ru: ['Есть всегда', 'да', 'не всегда', 'не всегда', 'почти всегда', 'не всегда', 'не всегда', 'да'], en: ['Always there', 'yes', 'not always', 'not always', 'almost always', 'not always', 'not always', 'yes'] },
          ],
        },
      },
      {
        slug: 'local-env',
        name: { ru: 'Локальная среда', en: 'Local environment' },
        aka: { ru: 'локалка, среда разработчика, local', en: 'local, developer machine' },
        def: {
          ru: 'Локальная среда — копия системы на компьютере самого разработчика, в IT её зовут «локалкой». Здесь пишут код и сразу пробуют; ломать можно сколько угодно, потому что никто другой этого не видит. Данные тестовые или обезличенная копия рабочих. Тестовым стендом её не считают: стенд — общий сервер команды, он начинается со следующей ступени.',
          en: 'The local environment is a copy of the system on the developer’s own computer. Code is written and tried here right away; breaking things is fine because nobody else sees it. The data is test data or an anonymized copy of production. It is not counted as a test stand: a stand is the team’s shared server, which starts at the next step.',
        },
        match: { ru: ['локальн\\p{L}* сред\\p{L}*', 'локалк\\p{L}*'], en: ['local environments?'] },
        related: ['environment', 'feature-stand', 'dev-env', 'test-stand'],
        faq: [
          { q: { ru: 'Локальная среда — что это?', en: 'What is a local environment?' }, a: { ru: 'Копия системы на компьютере разработчика, её ещё зовут «локалкой». Здесь пишут код и сразу пробуют.', en: 'A copy of the system on the developer’s computer. Code is written and tried here right away.' } },
          { q: { ru: 'Локальная среда — это тестовый стенд?', en: 'Is the local environment a test stand?' }, a: { ru: 'Нет: стенд — общий сервер команды, а локальная среда есть только у одного разработчика.', en: 'No: a stand is the team’s shared server, while the local environment belongs to one developer.' } },
        ],
        source: { url: 'https://en.wikipedia.org/wiki/Deployment_environment', label: { ru: 'Википедия: среды развёртывания', en: 'Wikipedia: Deployment environment' } },
        seo: {
          title: { ru: 'Локальная среда: что это в IT и чем отличается от тестового стенда', en: 'Local environment: what it is and how it differs from a test stand' },
          description: {
            ru: 'Локальная среда — копия системы на компьютере разработчика, первая ступень пути изменения к проду. Чем отличается от дева и тестового стенда.',
            en: 'The local environment is a copy of the system on the developer’s computer, the first step on a change’s way to production.',
          },
        },
      },
      {
        slug: 'feature-stand',
        name: { ru: 'Feature-стенд', en: 'Feature stand' },
        aka: { ru: 'фича-стенд, ветка на стенде, review app, preview environment', en: 'feature environment, review app, preview environment' },
        def: {
          ru: 'Feature-стенд — временная копия системы под одну новую функцию, то есть под одну ветку кода. Его поднимают для проверки и убирают после слияния. Он работает параллельно с девом: функцию проверяют отдельно, не дожидаясь общего дева и не занимая тест. Такие стенды ещё называют preview- или review-средами.',
          en: 'A feature stand is a temporary copy of the system for one new feature, that is one code branch. It is created for the check and removed after the merge. It runs in parallel with dev: a feature is checked on its own, without waiting for the shared dev and without occupying the test environment. Such stands are also called preview or review environments.',
        },
        match: { ru: ['feature[- ]?стенд\\p{L}*', 'фич\\p{L}*[- ]?стенд\\p{L}*', 'review app\\p{L}*', 'preview environments?'], en: ['feature (?:stands?|environments?)', 'preview environments?', 'review apps?'] },
        related: ['environment', 'local-env', 'dev-env', 'test-stand'],
        faq: [
          { q: { ru: 'Фича-стенд — что это?', en: 'What is a feature stand?' }, a: { ru: 'Временная копия системы под одну ветку кода: её поднимают для проверки и убирают после слияния.', en: 'A temporary copy of the system for one code branch: it is created for the check and removed after the merge.' } },
          { q: { ru: 'Зачем фича-стенд, если есть дев?', en: 'Why a feature stand if there is dev?' }, a: { ru: 'Он работает параллельно с девом: функцию проверяют отдельно, не дожидаясь общего дева и не занимая тест.', en: 'It runs in parallel with dev: a feature is checked on its own without waiting for the shared dev or occupying test.' } },
        ],
        source: { url: 'https://en.wikipedia.org/wiki/Deployment_environment', label: { ru: 'Википедия: среды развёртывания', en: 'Wikipedia: Deployment environment' } },
        seo: {
          title: { ru: 'Feature-стенд: что это и зачем стенд под одну ветку', en: 'Feature stand: what it is and why one branch gets its own stand' },
          description: {
            ru: 'Feature-стенд — временная копия системы под одну ветку кода: проверка функции отдельно от общего дева. Review app и preview environment.',
            en: 'A feature stand is a temporary copy of the system for one code branch. Also called a review app or preview environment.',
          },
        },
      },
      {
        slug: 'dev-env',
        name: { ru: 'Дев', en: 'Dev environment' },
        aka: { ru: 'дев-среда, dev, среда разработки', en: 'dev, development environment' },
        def: {
          ru: 'Дев (dev, среда разработки) — общая для команды среда, куда попадает код после слияния: здесь проверяют, что код разных разработчиков собирается и работает вместе. Данные тестовые. Дев может ломаться, но его чинят быстро, потому что на нём работает вся команда. Это первый общий тестовый стенд после локальной среды. Фича-стенды обычно работают параллельно с девом.',
          en: 'Dev (the development environment) is the environment shared by the team where code lands after a merge: it checks that the code of different developers builds and works together. The data is test data. Dev can break, but it is fixed quickly because the whole team works on it. It is the first shared test stand after the local environment. Feature stands usually run in parallel with dev.',
        },
        match: { ru: ['дев[- ]?сред\\p{L}*', 'дев[- ]?стенд\\p{L}*'], en: ['dev environments?', 'development environments?'] },
        related: ['environment', 'feature-stand', 'test-stand', 'local-env'],
        faq: [
          { q: { ru: 'Дев-среда — что это?', en: 'What is a dev environment?' }, a: { ru: 'Общая для команды среда, куда попадает код после слияния: здесь проверяют, что код разных разработчиков работает вместе.', en: 'The team’s shared environment where code lands after a merge: it checks that different developers’ code works together.' } },
          { q: { ru: 'Чем дев отличается от теста?', en: 'How is dev different from test?' }, a: { ru: 'На дев попадает код одной команды, на тест сводят изменения всех команд и сервисов.', en: 'Dev gets one team’s code, while test brings together the changes of all teams and services.' } },
        ],
        source: { url: 'https://en.wikipedia.org/wiki/Deployment_environment', label: { ru: 'Википедия: среды развёртывания', en: 'Wikipedia: Deployment environment' } },
        seo: {
          title: { ru: 'Дев (dev) среда: что это в IT и зачем нужна', en: 'Dev environment: what it is and what it is for' },
          description: {
            ru: 'Дев — общая среда команды, куда попадает код после слияния. Чем дев отличается от локальной среды, теста и препрода.',
            en: 'Dev is the team’s shared environment where code lands after a merge. How dev differs from local, test and pre-prod.',
          },
        },
      },
      {
        slug: 'test-env',
        name: { ru: 'Тест (интеграционная среда)', en: 'Test (integration) environment' },
        aka: { ru: 'тестовая среда, интеграционная среда, интеграционный стенд, тест, SIT', en: 'test environment, integration environment, SIT' },
        def: {
          ru: 'Тест — общая среда, куда часто, каждый день или после каждого слияния, сводят изменения всех команд и сервисов, чтобы проверить, что они работают вместе. Здесь работают QA и автотесты, данные — копия рабочих или моки. От дева отличается охватом: на дев попадает код одной команды, на тест интегрируются все. Тест — один из тестовых стендов, и он есть почти всегда, даже там, где дева нет.',
          en: 'Test is a shared environment where the changes of all teams and services are brought together often, daily or after every merge, to check that they work together. QA and automated tests work here; the data is a copy of production or mocks. It differs from dev in scope: dev gets one team’s code, while everyone integrates on test. Test is one of the test stands, and it is almost always there, even where there is no dev.',
        },
        match: { ru: ['интеграционн\\p{L}* сред\\p{L}*', 'интеграционн\\p{L}* стенд\\p{L}*', 'тестов\\p{L}* сред\\p{L}*'], en: ['integration environments?', 'test environments?'] },
        related: ['environment', 'dev-env', 'preprod', 'test-stand', 'feature-stand', 'qa'],
        faq: [
          { q: { ru: 'Тестовая среда — что это?', en: 'What is a test environment?' }, a: { ru: 'Общая среда, куда часто сводят изменения всех команд и сервисов, чтобы проверить, что они работают вместе.', en: 'A shared environment where everyone’s changes are often brought together to check that they work together.' } },
          { q: { ru: 'Чем тест отличается от препрода?', en: 'How is test different from pre-prod?' }, a: { ru: 'Тест проверяет, что изменения всех работают вместе. Препрод проверяет изменение в условиях, как на проде.', en: 'Test checks that everyone’s changes work together. Pre-prod checks a change under production-like conditions.' } },
        ],
        source: { url: 'https://en.wikipedia.org/wiki/Deployment_environment', label: { ru: 'Википедия: среды развёртывания', en: 'Wikipedia: Deployment environment' } },
        seo: {
          title: { ru: 'Тестовая (интеграционная) среда: что это и чем отличается от дева и препрода', en: 'Test (integration) environment: what it is and how it differs from dev and pre-prod' },
          description: {
            ru: 'Тест — интеграционная среда, где часто сводят изменения всех команд и проверяют, что они работают вместе. Чем отличается от дева, препрода и тестового стенда.',
            en: 'Test is the integration environment where all teams’ changes come together often to check they work together. How it differs from dev, pre-prod and test stands.',
          },
        },
      },
      {
        slug: 'test-stand',
        name: { ru: 'Тестовый стенд', en: 'Staging environment' },
        aka: { ru: 'стенд в IT, тестовый контур, staging', en: 'test stand, staging' },
        def: {
          ru: 'Тестовый стенд — общий класс сред: любая отдельная копия системы на сервере команды, где можно пробовать и ломать, не задевая рабочую (прод). К тестовым стендам относятся фича-стенд, дев, тест (интеграционная среда), препрод и демо; у каждого своя задача, а изменение идёт по ним по порядку. Локальная среда у разработчика и прод стендами не считаются. Агент воспроизводит баги и проверяет изменения именно на стенде. Зависимости системы, данные и внешние сервисы, подключают к стенду копиями настоящих или моками: копии ближе к правде, моки дешевле, поэтому ими пользуются чаще. От песочницы стенд отличается задачей: песочница ограждает действия агента, а стенд — копия всей системы.',
          en: 'A test stand is a general class of environments: any separate copy of a system on the team’s server where you can try and break things without touching the live one (production). Test stands include the feature stand, dev, test (the integration environment), pre-prod and demo; each has its own job, and a change moves through them in order. The developer’s local environment and production are not stands. An agent reproduces bugs and checks changes on staging. The system’s dependencies, data and external services, are plugged in as copies of the real ones or as mocks: copies are closer to reality, mocks are cheaper and so used more often. Staging differs from a sandbox in purpose: a sandbox fences in the agent’s actions, while staging is a copy of the whole system.',
        },
        match: { ru: ['тестов\\p{L}* стенд\\p{L}*', 'стенд\\p{L}*', 'тестов\\p{L}* контур\\p{L}*'], en: ['test stands?', 'staging(?: environments?)?'] },
        related: ['environment', 'local-env', 'feature-stand', 'dev-env', 'test-env', 'preprod', 'demo-env', 'prod', 'sandbox', 'ai-agent', 'claude-in-chrome', 'human-in-the-loop'],
        faq: [
          { q: { ru: 'Что такое тестовый стенд?', en: 'What is a test stand?' }, a: { ru: 'Отдельная копия системы на сервере команды, где можно пробовать и ломать, не задевая прод. К стендам относятся фича-стенд, дев, тест, препрод и демо.', en: 'A separate copy of the system on the team’s server where you can try and break things without touching production. Stands include the feature stand, dev, test, pre-prod and demo.' } },
          { q: { ru: 'Чем staging отличается от test environment?', en: 'How is staging different from a test environment?' }, a: { ru: 'Тестовая среда проверяет, что изменения всех работают вместе. Стейджинг, или препрод, проверяет изменение в условиях, как на проде.', en: 'A test environment checks that everyone’s changes work together. Staging, or pre-prod, checks a change under production-like conditions.' } },
          { q: { ru: 'Что можно ИИ-агенту на стенде?', en: 'What may an AI agent do on a stand?' }, a: { ru: 'Воспроизводить баги и проверять изменения. В прод агент не пишет.', en: 'Reproduce bugs and check changes. The agent does not write to production.' } },
        ],
        source: { url: 'https://en.wikipedia.org/wiki/Deployment_environment', label: { ru: 'Википедия: среды развёртывания', en: 'Wikipedia: Deployment environment' } },
        seo: {
          title: { ru: 'Стенд в IT: что это, какие бывают — тестовый, препрод, прод — и что можно ИИ-агенту', en: 'Staging environment: what it is, staging vs production vs development' },
          description: {
            ru: 'Стенд в IT и программировании — копия системы, где команда и ИИ-агент проверяют изменения, не трогая рабочую. Какие бывают стенды: локальный, тестовый, препрод, прод — и чем стенд отличается от песочницы.',
            en: 'A staging environment is a copy of the system where an agent and the team check changes without touching production. Development vs staging vs production, and how staging differs from a sandbox.',
          },
        },
        screens: [
          { ru: 'Стенд собирают как копию прода. Сервис копируют целиком, а его зависимости, то есть базу и внешние сервисы, подключают двумя способами: копиями настоящих, это ближе к правде, или моками, это дешевле и быстрее. Агент работает на стенде, а в прод не пишет.', en: 'A stand is built as a copy of production. The service is copied whole, and its dependencies, the database and outside services, are plugged in two ways: as copies of the real ones, which is closer to reality, or as mocks, which is cheaper and faster. The agent works on the stand and does not write to production.' },
          { ru: 'Изменение идёт слева направо. С локальной среды код уходит двумя путями: на дев после слияния и на фича-стенд, где проверяют одну ветку. Оба пути сходятся на тесте, там интегрируются все. Дальше препрод проверяет, как изменение поведёт себя на проде, демо показывает его клиенту, и только потом оно попадает в прод. Всё, что в рамке, — тестовые стенды.', en: 'A change moves left to right. From the local environment code goes two ways: to dev after a merge and to a feature stand where one branch is checked. Both ways meet on test, where everyone integrates. Then pre-prod checks how the change behaves like on production, demo shows it to the client, and only then it reaches production. Everything inside the frame is a test stand.' },
        ],
        parts: { title: { ru: 'Где проверяют изменения: локальная среда и тестовые стенды', en: 'Where changes are checked: the local environment and test stands' }, slugs: ['local-env', 'feature-stand', 'dev-env', 'test-env', 'preprod', 'demo-env'] },
        compare: {
          title: { ru: 'Все среды: что проверяют, кто заходит, какие данные', en: 'All environments: what they check, who uses them, what data' },
          head: { ru: ['Локальная', 'Фича-стенд', 'Дев', 'Тест', 'Препрод', 'Демо', 'Прод'], en: ['Local', 'Feature', 'Dev', 'Test', 'Pre-prod', 'Demo', 'Prod'] },
          headSlugs: ['local-env', 'feature-stand', 'dev-env', 'test-env', 'preprod', 'demo-env', 'prod'],
          rows: [
            { ru: ['Что проверяют', 'пишу и пробую', 'одна ветка отдельно', 'код сходится', 'все интегрируются часто', 'как на проде', 'показ клиенту', 'работают люди'], en: ['What it checks', 'write and try', 'one branch on its own', 'code fits together', 'everyone integrates often', 'like production', 'client demo', 'users at work'] },
            { ru: ['Тестовый стенд', 'нет', 'да', 'да', 'да', 'да', 'не всегда', 'нет'], en: ['Test stand', 'no', 'yes', 'yes', 'yes', 'yes', 'not always', 'no'] },
            { ru: ['Кто заходит', 'разработчик', 'автор ветки', 'команда', 'QA', 'команда', 'заказчик', 'клиенты'], en: ['Who uses it', 'a developer', 'the branch author', 'the team', 'QA', 'the team', 'the client', 'customers'] },
            { ru: ['Данные', 'тестовые', 'тестовые', 'тестовые', 'копия рабочих или моки', 'свежая копия рабочих', 'примеры или настоящие', 'настоящие'], en: ['Data', 'test', 'test', 'test', 'a copy of production or mocks', 'a fresh copy of production', 'samples or real', 'real'] },
            { ru: ['Есть всегда', 'да', 'не всегда', 'не всегда', 'почти всегда', 'не всегда', 'не всегда', 'да'], en: ['Always there', 'yes', 'not always', 'not always', 'almost always', 'not always', 'not always', 'yes'] },
          ],
        },
      },
      {
        slug: 'preprod',
        name: { ru: 'Препрод', en: 'Pre-prod' },
        aka: { ru: 'предпрод, предпроизводственная среда, pre-production, stage', en: 'preprod, pre-production, stage' },
        def: {
          ru: 'Препрод (пишут и «препрод», и «предпрод», верны оба варианта) — среда, настроенная как рабочая (прод), где изменение проверяют последним шагом перед выкладкой: те же настройки и свежая копия рабочих данных. Слово пришло из английского pre-production. В одних командах такую среду называют стейджингом, в других она стоит отдельной ступенью после теста (интеграционной среды).',
          en: 'Pre-prod (both “preprod” and “pre-prod” are correct; in Russian «препрод» and «предпрод») is an environment set up like production where a change gets its last check before release: the same settings and a fresh copy of production data. The word comes from pre-production. Some teams call it staging, others keep it as a separate step after the test environment.',
        },
        match: { ru: ['препрод\\p{L}*', 'предпрод\\p{L}*'], en: ['pre-?prod(?:uction)?'] },
        related: ['environment', 'test-stand', 'dev-env', 'demo-env', 'prod', 'time-to-market', 'sandbox'],
        source: { url: 'https://en.wikipedia.org/wiki/Deployment_environment', label: { ru: 'Википедия: среды развёртывания', en: 'Wikipedia: Deployment environment' } },
        seo: {
          title: { ru: 'Препрод (pre-prod) или предпрод: что это в IT и как правильно писать', en: 'What is pre-prod (preprod): pre-production vs staging vs production' },
          description: {
            ru: 'Препрод и предпрод — одно слово, верны оба написания. Что такое препрод в IT, чем он отличается от тестового стенда и прода и зачем нужен перед выкладкой.',
            en: 'Pre-prod is an environment set up like production for the last check before release. How it differs from a test environment and production, and when teams use it.',
          },
        },
        faq: [
          { q: { ru: 'Как правильно: препрод или предпрод?', en: 'How is it spelled: preprod or pre-prod?' }, a: { ru: 'Верны оба написания: слово пришло из английского pre-production, словарной нормы нет. Выберите одно и пишите так во всём документе.', en: 'Both spellings are fine: the word comes from pre-production and has no dictionary norm. Pick one and use it throughout a document.' } },
          { q: { ru: 'Препрод — это что?', en: 'What is pre-prod?' }, a: { ru: 'Предпоследняя ступень перед продом: копия рабочей среды, где проверяют, как изменение поведёт себя в боевых условиях.', en: 'The step right before production: a copy of the live environment where a change is checked under real conditions.' } },
          { q: { ru: 'Что проверяют на препроде?', en: 'What is checked on pre-prod?' }, a: { ru: 'Сам релиз в условиях, как на проде: короткий прогон главных сценариев, сквозные сценарии, обновление базы на копии рабочих данных и ручную проверку QA перед выкладкой.', en: 'The release itself under production-like settings: a quick run of the key paths, end-to-end scenarios, database migrations on a copy of production data and a manual QA check before release.' } },
          { q: { ru: 'Препрод и стейджинг — одно и то же?', en: 'Are pre-prod and staging the same?' }, a: { ru: 'В одних командах да, в других препрод стоит после тестового стенда. Смотрите, как названо у вас, и договоритесь об одном слове.', en: 'In some teams yes, in others pre-prod comes after the test environment. Check how your team uses the words and agree on one.' } },
          { q: { ru: 'Нужен ли препрод?', en: 'Do you need pre-prod?' }, a: { ru: 'Обычно небольшим командам хватает тестового стенда и прода. Препрод удлиняет цикл поставки: качество растёт, но растёт и time to market, потому что изменение дольше идёт до пользователей. Он нужен там, где ошибка на проде стоит дорого.', en: 'Small teams usually get by with a test environment and production. Pre-prod lengthens the delivery cycle: quality goes up, but so does time to market, because a change takes longer to reach users. It is for places where a mistake in production is expensive.' } },
          { q: { ru: 'Откуда в препроде данные?', en: 'Where does pre-prod data come from?' }, a: { ru: 'Из дампа: копии данных рабочей базы в одном файле. Личные данные из него убирают.', en: 'From a dump: a copy of the live database data in one file. Personal data is removed from it.' } },
          { q: { ru: 'Что делает ИИ-агент на препроде?', en: 'What does an AI agent do on pre-prod?' }, a: { ru: 'Запускает проверки. Правки попадают туда через выкладку, напрямую агент их не вносит.', en: 'Runs checks. Changes reach it through a release; the agent does not edit it directly.' } },
        ],
        compare: {
          title: { ru: 'Чем препрод отличается от теста', en: 'How pre-prod differs from the test environment' },
          head: { ru: ['Тест', 'Препрод'], en: ['Test', 'Pre-prod'] },
          headSlugs: ['test-env', 'preprod'],
          rows: [
            { ru: ['Что проверяют', 'что изменения всех работают вместе', 'как оно поведёт себя как на проде'], en: ['What it checks', 'that everyone’s changes work together', 'how it behaves like on production'] },
            { ru: ['Настройки', 'удобные для проверок', 'как на проде'], en: ['Settings', 'convenient for testing', 'same as production'] },
            { ru: ['Данные', 'копия рабочих или моки', 'свежая копия рабочих'], en: ['Data', 'a copy of production or mocks', 'a fresh copy of production'] },
            { ru: ['Есть всегда', 'почти всегда', 'не всегда'], en: ['Always there', 'almost always', 'not always'] },
          ],
        },
      },
      {
        slug: 'demo-env',
        name: { ru: 'Демо-стенд', en: 'Demo environment' },
        aka: { ru: 'демо, демо-среда, demo', en: 'demo, demo stand' },
        def: {
          ru: 'Демо-стенд — среда для показа продукта заказчику или коллегам. От препрода отличается задачей: препрод проверяет изменение в условиях прода, а демо показывает готовую версию людям. Часто демо и есть сам прод: показывают на рабочей системе, например с отдельной демо-учётной записью. Но бывает и отдельный стенд со стабильной версией и подготовленными примерами данных, чтобы показ прошёл гладко. Правки на такой стенд попадают через выкладку, как и на прод.',
          en: 'A demo environment is where a product is shown to a client or colleagues. It differs from pre-prod in purpose: pre-prod checks a change under production conditions, and demo shows a finished version to people. Often the demo is production itself: the product is shown on the live system, for example with a separate demo account. But there can also be a separate stand with a stable version and prepared sample data so the showing goes smoothly. Changes reach such a stand through a release, as they do production.',
        },
        match: { ru: ['демо[- ]?стенд\\p{L}*', 'демо[- ]?сред\\p{L}*'], en: ['demo environments?', 'demo stands?'] },
        related: ['environment', 'preprod', 'prod', 'test-stand'],
        faq: [
          { q: { ru: 'Демо-стенд — что это?', en: 'What is a demo environment?' }, a: { ru: 'Среда для показа продукта заказчику или коллегам.', en: 'An environment for showing the product to a client or colleagues.' } },
          { q: { ru: 'Демо — это прод?', en: 'Is demo the same as production?' }, a: { ru: 'Часто да: показывают на рабочей системе с отдельной демо-учётной записью. Бывает и отдельный стенд с подготовленными данными.', en: 'Often yes: the showing happens on the live system with a separate demo account. There can also be a separate stand with prepared data.' } },
        ],
        source: { url: 'https://en.wikipedia.org/wiki/Deployment_environment', label: { ru: 'Википедия: среды развёртывания', en: 'Wikipedia: Deployment environment' } },
        seo: {
          title: { ru: 'Демо-стенд: что это и чем отличается от препрода и прода', en: 'Demo environment: what it is and how it differs from pre-prod and production' },
          description: {
            ru: 'Демо-стенд — среда для показа продукта заказчику: стабильная версия и подготовленные данные. Чем отличается от препрода и прода.',
            en: 'A demo environment is where a product is shown to a client: a stable version and prepared data. How it differs from pre-prod and production.',
          },
        },
      },
      {
        slug: 'prod',
        name: { ru: 'Прод', en: 'Production' },
        aka: { ru: 'продакшен, production, боевая среда', en: 'prod, live environment' },
        def: {
          ru: 'Прод (production, боевая среда) — среда, с которой работают настоящие пользователи, и данные в ней настоящие. Ошибка здесь стоит дороже всего: пользователи теряют время или деньги. Поэтому изменения доходят до прода через проверки на стендах, а ИИ-агент в прод не пишет: правки переносит выкладка, обычно с подтверждением человека.',
          en: 'Prod (production, the live environment) is the environment real users work with, and its data is real. A mistake here costs the most: users lose time or money. So changes reach production through checks on the stands, and an AI agent does not write to production: a release moves the changes, usually with a person’s confirmation.',
        },
        match: { ru: ['прод(?:а|е|у|ом)?', 'продакшен\\p{L}*', 'боев\\p{L}* сред\\p{L}*'], en: ['prod', 'production environments?'] },
        related: ['environment', 'test-stand', 'preprod', 'demo-env', 'time-to-market'],
        faq: [
          { q: { ru: 'Прод — что это в IT?', en: 'What is production in IT?' }, a: { ru: 'Среда, с которой работают настоящие пользователи, и данные в ней настоящие.', en: 'The environment real users work with, with real data.' } },
          { q: { ru: 'Почему на прод не пишут напрямую?', en: 'Why not write to production directly?' }, a: { ru: 'Ошибка там стоит дороже всего, поэтому изменения идут через проверки на стендах, а выкладку обычно подтверждает человек.', en: 'A mistake there costs the most, so changes go through checks on the stands, and a person usually confirms the release.' } },
          { q: { ru: 'Что такое прод в программировании?', en: 'What does prod mean in programming?' }, a: { ru: 'Рабочая версия системы на серверах, с которой работают клиенты. «Выкатить на прод» значит выложить изменение пользователям, «упал прод» — рабочая система перестала работать.', en: 'The live version of the system on the servers that customers use. “Deploy to prod” means releasing a change to users; “prod is down” means the live system stopped working.' } },
          { q: { ru: 'Прод и продакшен — одно и то же?', en: 'Are prod and production the same thing?' }, a: { ru: 'Да: «прод» — сокращение от английского production, по-русски ещё говорят «боевая среда».', en: 'Yes: prod is short for production, also called the live environment.' } },
          { q: { ru: 'Чем прод отличается от препрода?', en: 'How is production different from pre-prod?' }, a: { ru: 'Препрод — копия прода для последней проверки перед выкладкой, клиентов на нём нет. На проде работают клиенты, и ошибка там стоит дороже всего.', en: 'Pre-prod is a copy of production for the last check before release, with no customers on it. Customers work on production, and a mistake there costs the most.' } },
        ],
        source: { url: 'https://en.wikipedia.org/wiki/Deployment_environment', label: { ru: 'Википедия: среды развёртывания', en: 'Wikipedia: Deployment environment' } },
        seo: {
          title: { ru: 'Прод (production): что это в IT и почему туда не пишут напрямую', en: 'Production (prod): what it is and why nobody writes there directly' },
          description: {
            ru: 'Прод (продакшен, production) в IT и программировании — рабочая среда, где работают настоящие пользователи с настоящими данными. Чем прод отличается от препрода и теста и почему туда не пишут напрямую.',
            en: 'Production (prod) is the live environment where real users work with real data. How production differs from pre-prod and test, and why nobody writes there directly.',
          },
        },
      },
    ],
  },
  {
    slug: 'delivery',
    icon: 'tests',
    name: { ru: 'Метрики поставки', en: 'Delivery metrics' },
    hint: { ru: 'Как быстро и как надёжно изменения доходят до пользователей', en: 'How fast and how reliably changes reach users' },
    terms: [
      {
        slug: 'time-to-market',
        name: { ru: 'Time to market', en: 'Time to market' },
        aka: { ru: 'TTM, time2market, время выхода на рынок', en: 'TTM, time2market' },
        def: {
          ru: 'Time to market (TTM, «время выхода на рынок») — сколько проходит от замысла до момента, когда продукт или изменение доступно пользователям. В разработке это длина цикла поставки: чем больше сред и проверок на пути (feature-стенд, дев, тест, препрод, демо), тем она длиннее, но тем меньше ошибок доходит до прода. Поэтому команды решают, сколько проверок оправдано: слишком мало — падает качество, слишком много — продукт опаздывает.',
          en: 'Time to market (TTM) is how long it takes from an idea to the moment a product or a change is available to users. In software it is the length of the delivery cycle: the more environments and checks on the way (feature stand, dev, test, pre-prod, demo), the longer it gets, but the fewer mistakes reach production. So teams decide how many checks are worth it: too few and quality drops, too many and the product is late.',
        },
        match: { ru: ['time[- ]?to[- ]?market', 'time2market', 'врем\\p{L}* выхода на рынок'], en: ['time[- ]?to[- ]?market', 'time2market'] },
        related: ['change-lead-time', 'deployment-frequency', 'preprod', 'test-stand'],
        faq: [
          { q: { ru: 'Time to market — что это?', en: 'What is time to market?' }, a: { ru: 'Сколько проходит от замысла до момента, когда продукт или изменение доступно пользователям.', en: 'How long it takes from an idea until a product or change is available to users.' } },
          { q: { ru: 'Как time to market связан с качеством?', en: 'How is time to market tied to quality?' }, a: { ru: 'Чем больше сред и проверок на пути, тем цикл длиннее, но тем меньше ошибок доходит до прода.', en: 'The more environments and checks on the way, the longer the cycle, but the fewer mistakes reach production.' } },
        ],
        source: { url: 'https://en.wikipedia.org/wiki/Time_to_market', label: { ru: 'Википедия: Time to market', en: 'Wikipedia: Time to market' } },
        seo: {
          title: { ru: 'Time to market: что это простыми словами и как связан с качеством', en: 'What is time to market (TTM): delivery cycle, checks and quality' },
          description: {
            ru: 'Time to market (TTM) — время от замысла до выхода продукта к пользователям. Как цикл поставки, среды и проверки влияют на скорость и качество.',
            en: 'Time to market (TTM) is the time from idea to users. How the delivery cycle, environments and checks affect speed and quality.',
          },
        },
      },
      {
        slug: 'change-lead-time',
        name: { ru: 'Время изменения', en: 'Change lead time' },
        aka: { ru: 'change lead time, lead time for changes', en: 'lead time for changes' },
        def: {
          ru: 'Время изменения (change lead time) — сколько проходит от фиксации правки в хранилище кода (коммита) до момента, когда она работает на проде. Сокращают его маленькими правками, автоматическими проверками и меньшим числом ручных шагов до прода. Чем оно короче, тем быстрее команда доставляет мелкие правки. Отсчёт идёт от готового кода, а у time to market — от идеи.',
          en: 'Change lead time is how long it takes from a change being committed to version control to it running in production. It is shortened with small changes, automated checks and fewer manual steps on the way to production. The shorter it is, the faster the team ships small changes. It counts from ready code, while time to market counts from the idea.',
        },
        match: { ru: ['change lead time', 'lead time'], en: ['change lead time', 'lead time'] },
        related: ['time-to-market', 'deployment-frequency', 'preprod'],
        faq: [
          { q: { ru: 'Change lead time — что это?', en: 'What is change lead time?' }, a: { ru: 'Сколько проходит от коммита до момента, когда правка работает на проде.', en: 'How long it takes from a commit until the change runs in production.' } },
          { q: { ru: 'Как сократить время изменения?', en: 'How do you shorten change lead time?' }, a: { ru: 'Маленькими правками, автоматическими проверками и меньшим числом ручных шагов до прода.', en: 'With small changes, automated checks and fewer manual steps on the way to production.' } },
        ],
        source: { url: 'https://dora.dev/guides/dora-metrics/', label: { ru: 'DORA: метрики поставки ПО', en: 'DORA: software delivery metrics' } },
        seo: {
          title: { ru: 'Время изменения (change lead time): что это и как сократить', en: 'Change lead time: what it is and how to shorten it' },
          description: {
            ru: 'Время изменения — сколько проходит от коммита до работы правки на проде. Одна из метрик DORA; как среды и проверки удлиняют путь.',
            en: 'Change lead time is the time from a commit to the change running in production. One of the DORA metrics; how environments and checks lengthen the path.',
          },
        },
      },
      {
        slug: 'deployment-frequency',
        name: { ru: 'Частота выкладок', en: 'Deployment frequency' },
        aka: { ru: 'deployment frequency', en: 'deployment frequency' },
        def: {
          ru: 'Частота выкладок (deployment frequency) — сколько раз за период команда выкладывает изменения на прод или сколько времени проходит между выкладками. Чем больше сред и ручных проверок на пути, тем выкладки реже.',
          en: 'Deployment frequency is how many times in a period a team releases changes to production, or how much time passes between releases. The more environments and manual checks on the way, the rarer the releases.',
        },
        match: { ru: ['частот\\p{L}* выкладок', 'deployment frequency'], en: ['deployment frequency'] },
        related: ['change-lead-time', 'change-fail-rate', 'time-to-market'],
        faq: [
          { q: { ru: 'Частота выкладок — что это?', en: 'What is deployment frequency?' }, a: { ru: 'Сколько раз за период команда выкладывает изменения на прод.', en: 'How many times in a period a team releases changes to production.' } },
          { q: { ru: 'От чего зависит частота выкладок?', en: 'What does deployment frequency depend on?' }, a: { ru: 'Чем больше сред и ручных проверок на пути, тем выкладки реже.', en: 'The more environments and manual checks on the way, the rarer the releases.' } },
        ],
        source: { url: 'https://dora.dev/guides/dora-metrics/', label: { ru: 'DORA: метрики поставки ПО', en: 'DORA: software delivery metrics' } },
        seo: {
          title: { ru: 'Частота выкладок (deployment frequency): что это и от чего зависит', en: 'Deployment frequency: what it is and what it depends on' },
          description: {
            ru: 'Частота выкладок — сколько раз за период изменения доходят до прода. Метрика DORA и связь с тестовыми стендами и препродом.',
            en: 'Deployment frequency is how many times a period changes reach production. A DORA metric and how it relates to test environments and pre-prod.',
          },
        },
      },
      {
        slug: 'change-fail-rate',
        name: { ru: 'Доля сбойных выкладок', en: 'Change fail rate' },
        aka: { ru: 'change fail rate', en: 'change fail rate, change failure rate' },
        def: {
          ru: 'Доля сбойных выкладок (change fail rate) — какая часть выкладок потребовала срочного вмешательства: отката или быстрой починки (хотфикса). Показывает, насколько хорошо проверки до прода ловят ошибки: для этого нужны тесты и препрод.',
          en: 'Change fail rate is the share of releases that needed immediate intervention: a rollback or a quick fix (hotfix). It shows how well the checks before production catch mistakes, which is what tests and pre-prod are for.',
        },
        match: { ru: ['д\\p{L}* сбойных выкладок', 'change fail(?:ure)? rate'], en: ['change fail(?:ure)? rate'] },
        related: ['deployment-rework-rate', 'recovery-time', 'preprod'],
        faq: [
          { q: { ru: 'Change fail rate — что это?', en: 'What is change fail rate?' }, a: { ru: 'Доля выкладок, которые потребовали срочного вмешательства: отката или хотфикса.', en: 'The share of releases that needed immediate intervention: a rollback or a hotfix.' } },
          { q: { ru: 'Как снизить долю сбойных выкладок?', en: 'How do you lower the change fail rate?' }, a: { ru: 'Ловить ошибки до прода: тестами и проверкой на препроде.', en: 'Catch mistakes before production: with tests and a check on pre-prod.' } },
        ],
        source: { url: 'https://dora.dev/guides/dora-metrics/', label: { ru: 'DORA: метрики поставки ПО', en: 'DORA: software delivery metrics' } },
        seo: {
          title: { ru: 'Доля сбойных выкладок (change fail rate): что это и как снизить', en: 'Change fail rate: what it is and how to reduce it' },
          description: {
            ru: 'Доля сбойных выкладок — какая часть релизов потребовала отката или хотфикса. Метрика DORA: как тесты и препрод её снижают.',
            en: 'Change fail rate is the share of releases that needed a rollback or a hotfix. A DORA metric: how tests and pre-prod reduce it.',
          },
        },
      },
      {
        slug: 'recovery-time',
        name: { ru: 'Время восстановления', en: 'Failed deployment recovery time' },
        aka: { ru: 'failed deployment recovery time, MTTR', en: 'failed deployment recovery time, MTTR' },
        def: {
          ru: 'Время восстановления (failed deployment recovery time) — сколько проходит от сбойной выкладки до момента, когда сервис снова работает как нужно. В прежних версиях DORA эту метрику называли средним временем восстановления, MTTR.',
          en: 'Failed deployment recovery time is how long it takes from a failed release until the service works properly again. Earlier DORA versions called this metric mean time to restore, MTTR.',
        },
        match: { ru: ['MTTR', 'failed deployment recovery time', 'врем\\p{L}* восстановления после сбо\\p{L}*'], en: ['MTTR', 'failed deployment recovery time'] },
        related: ['change-fail-rate', 'change-lead-time'],
        faq: [
          { q: { ru: 'Время восстановления после сбоя — что это?', en: 'What is failed deployment recovery time?' }, a: { ru: 'Сколько проходит от сбойной выкладки до момента, когда сервис снова работает как нужно.', en: 'How long it takes from a failed release until the service works properly again.' } },
          { q: { ru: 'Это то же, что MTTR?', en: 'Is it the same as MTTR?' }, a: { ru: 'Да, в прежних версиях DORA эту метрику называли MTTR — средним временем восстановления.', en: 'Yes, earlier DORA versions called this metric MTTR, mean time to restore.' } },
        ],
        source: { url: 'https://dora.dev/guides/dora-metrics/', label: { ru: 'DORA: метрики поставки ПО', en: 'DORA: software delivery metrics' } },
        seo: {
          title: { ru: 'Время восстановления после сбоя выкладки (MTTR): что это', en: 'Failed deployment recovery time (MTTR): what it is' },
          description: {
            ru: 'Время восстановления — сколько проходит от сбойной выкладки до починки. Метрика DORA, ранее MTTR.',
            en: 'Failed deployment recovery time is how long it takes from a failed release to a fix. A DORA metric, earlier called MTTR.',
          },
        },
      },
      {
        slug: 'deployment-rework-rate',
        name: { ru: 'Доля внеплановых выкладок', en: 'Deployment rework rate' },
        aka: { ru: 'deployment rework rate', en: 'deployment rework rate' },
        def: {
          ru: 'Доля внеплановых выкладок (deployment rework rate) — какая часть выкладок не планировалась и появилась из-за сбоя на проде. Вместе с долей сбойных выкладок показывает нестабильность поставки.',
          en: 'Deployment rework rate is the share of releases that were not planned and happened because of an incident in production. Together with change fail rate it shows the instability of delivery.',
        },
        match: { ru: ['д\\p{L}* внеплановых выкладок', 'deployment rework rate'], en: ['deployment rework rate'] },
        related: ['change-fail-rate', 'recovery-time'],
        faq: [
          { q: { ru: 'Deployment rework rate — что это?', en: 'What is deployment rework rate?' }, a: { ru: 'Доля выкладок, которые не планировались и появились из-за сбоя на проде.', en: 'The share of releases that were not planned and came from an incident in production.' } },
          { q: { ru: 'Что показывает эта метрика?', en: 'What does this metric show?' }, a: { ru: 'Вместе с долей сбойных выкладок — нестабильность поставки.', en: 'Together with the change fail rate, the instability of delivery.' } },
        ],
        source: { url: 'https://dora.dev/guides/dora-metrics/', label: { ru: 'DORA: метрики поставки ПО', en: 'DORA: software delivery metrics' } },
        seo: {
          title: { ru: 'Доля внеплановых выкладок (deployment rework rate): что это', en: 'Deployment rework rate: what it is' },
          description: {
            ru: 'Доля внеплановых выкладок — какая часть релизов появилась из-за сбоя на проде. Метрика DORA рядом с долей сбойных выкладок.',
            en: 'Deployment rework rate is the share of releases that happened because of an incident in production. A DORA metric next to change fail rate.',
          },
        },
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
          ru: 'Quint — язык, на котором описывают правила системы так, чтобы их можно было запускать и проверять до написания кода. Запись похожа на обычный код и читается инженерами без математической подготовки. Программа перебирает порядки действий и показывает цепочку шагов, где правило нарушается. Проверяют две программы: TLC и Apalache, есть и быстрый случайный прогон.',
          en: 'Quint is a language for describing the rules of a system so that they can be run and checked before any code is written. The notation looks like ordinary code and engineers without a math background can read it. The program tries orders of actions and shows the chain of steps where a rule breaks. Two programs check it: TLC and Apalache, and there is also a quick random simulation.',
        },
        match: { ru: ['Quint'], en: ['Quint'] },
        related: ['model-checking', 'apalache', 'tla-plus', 'invariant', 'qunit'],
        more: { post: 'quint-models-find-races', label: { ru: 'Как найти гонки и потерянные данные моделями на Quint', en: 'Finding races and lost data with Quint models' } },
        also: [{ post: 'quint-vs-tests-and-tla', label: { ru: 'Чем Quint отличается от QUnit, Jest и TLA+', en: 'How Quint differs from QUnit, Jest and TLA+' } }, { post: 'tla-alloy-quint-compare', label: { ru: 'TLA+ vs Quint vs Alloy: что выбрать', en: 'TLA+ vs Quint vs Alloy: which to choose' } }],
        faq: [
          { q: { ru: 'Quint — что это за язык?', en: 'What is the Quint language?' }, a: { ru: 'Язык, на котором описывают правила системы так, чтобы их можно было запускать и проверять до написания кода. Запись похожа на обычный код.', en: 'A language for describing a system’s rules so they can be run and checked before code is written. It reads like ordinary code.' } },
          { q: { ru: 'Чем Quint отличается от TLA+?', en: 'How is Quint different from TLA+?' }, a: { ru: 'Quint читается как обычный код, TLA+ похож на математические формулы, поэтому порог входа у Quint ниже. Проверяют их одними программами: TLC и Apalache.', en: 'Quint reads like ordinary code, TLA+ looks like math formulas, so Quint is easier to start with. Both are checked by the same programs: TLC and Apalache.' } },
        ],
        source: { url: 'https://quint-lang.org/', label: { ru: 'quint-lang.org — сайт и документация Quint', en: 'quint-lang.org, the Quint site and docs' } },
      },
      {
        slug: 'tla-plus',
        name: { ru: 'TLA+', en: 'TLA+' },
        aka: { ru: 'автор Лесли Лэмпорт', en: 'by Leslie Lamport' },
        def: {
          ru: 'TLA+ — способ описать, как система ведёт себя шаг за шагом, настолько точно, что описание можно проверить программой, как чертёж проверяют до стройки. Например, по чертежу денежного перевода находят, что при сбое между списанием и зачислением деньги пропадают, и делают это до написания кода. Запись похожа на математические формулы, поэтому порог входа выше, чем у Quint. Автор языка Лесли Лэмпорт.',
          en: 'TLA+ is a way to describe how a system behaves step by step so precisely that the description can be checked by a program, the way a blueprint is checked before construction. For example, a blueprint of a money transfer reveals that if a failure hits between the debit and the credit, money vanishes, and this is found before any code is written. The notation resembles mathematical formulas, so the entry step is higher than with Quint. The language was created by Leslie Lamport.',
        },
        match: { ru: ['TLA\\+'], en: ['TLA\\+'] },
        related: ['quint', 'alloy', 'apalache', 'model-checking'],
        also: [{ post: 'quint-vs-tests-and-tla', label: { ru: 'Quint против TLA+ и Alloy', en: 'Quint versus TLA+ and Alloy' } }],
        faq: [
          { q: { ru: 'TLA+ — что это?', en: 'What is TLA+?' }, a: { ru: 'Способ описать, как система ведёт себя шаг за шагом, настолько точно, что описание можно проверить программой до написания кода. Автор — Лесли Лэмпорт.', en: 'A way to describe how a system behaves step by step so precisely that a program can check the description before code is written. Its author is Leslie Lamport.' } },
          { q: { ru: 'Что находит TLA+?', en: 'What does TLA+ find?' }, a: { ru: 'Цепочки шагов, где правило нарушается. Например, что при сбое между списанием и зачислением деньги пропадают.', en: 'Step sequences that break a rule. For example, that money disappears if a failure happens between the debit and the credit.' } },
        ],
        source: { url: 'https://lamport.azurewebsites.net/tla/tla.html', label: { ru: 'Страница TLA+ Лесли Лэмпорта', en: 'Leslie Lamport’s TLA+ page' } },
        seo: {
          title: { ru: 'TLA+: что это — глоссарий AI-разработки', en: 'TLA+: what it is — AI development glossary' },
          description: {
            ru: 'TLA+ — язык Лесли Лэмпорта, чтобы описать поведение системы шаг за шагом и проверить его программами TLC и Apalache до кода. Пример и сравнение с Quint и Alloy.',
            en: 'TLA+ is Leslie Lamport’s language for describing a system’s behaviour step by step and checking it with TLC and Apalache before code. An example and how it compares with Quint and Alloy.',
          },
        },
        more: { post: 'tla-alloy-quint-compare', label: { ru: 'TLA+ vs Quint vs Alloy: что выбрать', en: 'TLA+ vs Quint vs Alloy: which to choose' } },
      },
      {
        slug: 'alloy',
        name: { ru: 'Alloy', en: 'Alloy' },
        aka: { ru: 'язык и анализатор моделей', en: 'a modeling language and analyzer' },
        def: {
          ru: 'Alloy — способ описать объекты и связи между ними и попросить программу найти небольшой пример, где правило нарушено. Например, правило «у сотрудника ровно один начальник»: программа находит пример, где у одного сотрудника сразу два начальника. Подходит для проверки устройства данных и прав доступа. Запись, как и у TLA+, математическая. Язык создан в группе проектирования ПО при MIT.',
          en: 'Alloy is a way to describe objects and the links between them and ask a program to find a small example where a rule is broken. For example, the rule “an employee has exactly one boss”: the program finds an example where one employee has two bosses at once. It suits checking the structure of data and access rights. Like TLA+, it uses a mathematical notation. The language was created in the Software Design Group at MIT.',
        },
        match: { ru: ['Alloy'], en: ['Alloy'] },
        related: ['tla-plus', 'quint', 'model-checking'],
        more: { post: 'tla-alloy-quint-compare', label: { ru: 'TLA+ vs Quint vs Alloy: что выбрать', en: 'TLA+ vs Quint vs Alloy: which to choose' } },
        faq: [
          { q: { ru: 'Alloy — что это?', en: 'What is Alloy?' }, a: { ru: 'Способ описать объекты и связи между ними и попросить программу найти небольшой пример, где правило нарушено.', en: 'A way to describe objects and their relations and ask a program to find a small example where a rule breaks.' } },
          { q: { ru: 'Чем Alloy отличается от TLA+?', en: 'How is Alloy different from TLA+?' }, a: { ru: 'Alloy проверяет структуру — объекты и связи. TLA+ проверяет поведение системы шаг за шагом.', en: 'Alloy checks structure: objects and relations. TLA+ checks a system’s behaviour step by step.' } },
        ],
        source: { url: 'https://alloytools.org/', label: { ru: 'alloytools.org — сайт Alloy', en: 'alloytools.org, the Alloy site' } },
      },
      {
        slug: 'tlc',
        name: { ru: 'TLC', en: 'TLC' },
        aka: { ru: 'первая программа проверки TLA+', en: 'the first TLA+ checker' },
        def: {
          ru: 'TLC — первая программа, которая проверяет модели на TLA+. Она перебирает все состояния модели по одному и для каждого проверяет правила, помня, где уже была. Поэтому её работа предсказуема, но мир модели должен быть небольшим: иначе состояний слишком много. Модели на Quint тоже проверяют в TLC: `quint verify` запускают с флагом `--backend=tlc`.',
          en: 'TLC is the first program that checks TLA+ models. It goes through all states of a model one by one and checks the rules in each, remembering where it has been. So its work is predictable, but the world of the model must be small: otherwise there are too many states. Quint models are checked in TLC too: run `quint verify` with the `--backend=tlc` flag.',
        },
        match: { ru: ['TLC'], en: ['TLC'] },
        related: ['tla-plus', 'quint', 'apalache', 'model-checking'],
        faq: [
          { q: { ru: 'TLC — что это?', en: 'What is TLC?' }, a: { ru: 'Первая программа, которая проверяет модели на TLA+: перебирает все состояния модели и для каждого проверяет правила.', en: 'The first program that checks TLA+ models: it walks through every state of the model and checks the rules in each.' } },
          { q: { ru: 'Когда подходит TLC?', en: 'When does TLC fit?' }, a: { ru: 'Когда мир модели небольшой: работа TLC предсказуема, но на большом мире перебор не закончится.', en: 'When the model’s world is small: TLC is predictable, but on a large world the search will not finish.' } },
        ],
        source: { url: 'https://github.com/tlaplus/tlaplus', label: { ru: 'TLA+ Tools и TLC на GitHub', en: 'TLA+ Tools and TLC on GitHub' } },
      },
      {
        slug: 'apalache',
        name: { ru: 'Apalache', en: 'Apalache' },
        aka: { ru: 'символьная проверка моделей', en: 'a symbolic model checker' },
        def: {
          ru: 'Apalache — программа, которая проверяет модели на TLA+ и на Quint. Она переводит их в набор условий и отдаёт SMT-решателю, например Z3: тот рассуждает сразу обо всех исполнениях до заданной длины. Выдаёт цепочку шагов, где правило нарушается.',
          en: 'Apalache is a program that checks models written in TLA+ and Quint. It turns them into a set of conditions and hands them to an SMT solver, for example Z3, which reasons about all executions up to a given length at once. It outputs the chain of steps where a rule breaks.',
        },
        match: { ru: ['Apalache'], en: ['Apalache'] },
        related: ['quint', 'tla-plus', 'tlc', 'model-checking', 'smt-solver', 'z3'],
        faq: [
          { q: { ru: 'Apalache — что это?', en: 'What is Apalache?' }, a: { ru: 'Программа, которая проверяет модели на TLA+ и Quint, переводя их в условия для SMT-решателя, например Z3.', en: 'A program that checks TLA+ and Quint models by turning them into conditions for an SMT solver such as Z3.' } },
          { q: { ru: 'Чем Apalache отличается от TLC?', en: 'How is Apalache different from TLC?' }, a: { ru: 'TLC перебирает состояния по одному. Apalache рассуждает сразу обо всех исполнениях до заданной длины.', en: 'TLC walks states one by one. Apalache reasons about all runs up to a given length at once.' } },
        ],
        source: { url: 'https://apalache-mc.org/', label: { ru: 'apalache-mc.org — сайт Apalache', en: 'apalache-mc.org, the Apalache site' } },
      },
      {
        slug: 'z3',
        name: { ru: 'Z3', en: 'Z3' },
        aka: { ru: 'SMT-решатель от Microsoft Research', en: 'an SMT solver from Microsoft Research' },
        def: {
          ru: 'Z3 — самый известный SMT-решатель: программа подбирает значения под заданные условия. Например, на условия «x плюс y равно десяти, x минус y равно двум» она отвечает «x равен шести, y равен четырём» или доказывает, что решений нет. Apalache отдаёт Z3 условия, полученные из модели, и по ответу строит цепочку шагов до нарушения правила.',
          en: 'Z3 is the best-known SMT solver: a program that picks values for given conditions. For example, for “x plus y equals ten, x minus y equals two” it answers “x is six, y is four”, or proves that no solution exists. Apalache gives Z3 the conditions obtained from a model and builds the chain of steps to the rule violation from its answer.',
        },
        match: { ru: ['Z3'], en: ['Z3'] },
        related: ['smt-solver', 'apalache', 'model-checking'],
        faq: [
          { q: { ru: 'Z3 — что это?', en: 'What is Z3?' }, a: { ru: 'Самый известный SMT-решатель: программа подбирает значения под заданные условия или доказывает, что решений нет.', en: 'The best-known SMT solver: a program that finds values meeting given conditions or proves there are none.' } },
          { q: { ru: 'Зачем Z3 при проверке моделей?', en: 'Why is Z3 used in model checking?' }, a: { ru: 'Apalache отдаёт Z3 условия из модели и по ответу строит цепочку шагов до нарушения правила.', en: 'Apalache passes Z3 the conditions from a model and builds a step sequence to the rule violation from its answer.' } },
        ],
        source: { url: 'https://github.com/Z3Prover/z3', label: { ru: 'Z3 — репозиторий на GitHub', en: 'Z3, the GitHub repository' } },
      },
      {
        slug: 'smt-solver',
        name: { ru: 'SMT-решатель', en: 'SMT solver' },
        aka: { ru: 'например, Z3', en: 'for example, Z3' },
        def: {
          ru: 'SMT-решатель — программа, которая по набору условий вроде «сумма больше десяти, а счёт не отрицательный» сама находит значения, при которых все условия выполняются, или доказывает, что таких значений нет. Перебирать всё подряд ей не нужно: она рассуждает о целых классах случаев сразу. Самый известный решатель Z3 создала Microsoft Research. Движок Apalache переводит модель в такие условия и отдаёт их решателю.',
          en: 'SMT solver is a program that, given a set of conditions such as “the sum is greater than ten and the balance is not negative”, finds values for which all conditions hold, or proves that no such values exist. It does not have to try everything one by one: it reasons about whole classes of cases at once. The best-known solver, Z3, was created by Microsoft Research. The Apalache engine turns a model into such conditions and hands them to a solver.',
        },
        match: { ru: ['SMT-решател\\p{L}*'], en: ['SMT solvers?'] },
        related: ['z3', 'apalache', 'model-checking', 'quint'],
        faq: [
          { q: { ru: 'SMT-решатель — что это?', en: 'What is an SMT solver?' }, a: { ru: 'Программа, которая по набору условий находит значения, при которых все условия выполняются, или доказывает, что таких значений нет.', en: 'A program that, given a set of conditions, finds values that satisfy all of them or proves none exist.' } },
          { q: { ru: 'Какой SMT-решатель самый известный?', en: 'Which SMT solver is best known?' }, a: { ru: 'Z3.', en: 'Z3.' } },
        ],
        source: { url: 'https://github.com/Z3Prover/z3', label: { ru: 'Z3 — репозиторий решателя на GitHub', en: 'Z3, the solver repository on GitHub' } },
      },
      {
        slug: 'model-checking',
        name: { ru: 'Проверка моделей', en: 'Model checking' },
        aka: { ru: 'model checking', en: 'automatic state exploration' },
        def: {
          ru: 'Проверка моделей — метод, при котором программа автоматически обходит состояния описанной системы и проверяет, что в каждом из них правила соблюдены. Если правило нарушается, метод выдаёт точную цепочку шагов, которой это достигается. Например, модель магазина находит ход «оплата, сбой связи», после которого деньги списаны, а заказа нет: покупатель заплатил и ничего не получил. В отличие от теста, метод не ограничен сценариями, которые придумал человек, но ограничен размером выбранного мира.',
          en: 'Model checking is a method in which a program automatically walks the states of a described system and checks that the rules hold in each of them. If a rule breaks, the method outputs the exact chain of steps that leads there. For example, a shop model finds the move “payment, connection lost” after which the money is charged but there is no order: the buyer paid and got nothing. Unlike a test, the method is not limited to scenarios a person thought of, but it is limited by the size of the chosen world.',
        },
        match: { ru: ['проверк\\p{L}* моделей', 'model checking', 'формальн\\p{L}* модел\\p{L}*'], en: ['model checking', 'formal models?'] },
        related: ['quint', 'invariant', 'apalache', 'tlc', 'alloy', 'automated-test', 'mutation-testing'],
        more: { post: 'quint-models-find-races', label: { ru: 'Как найти гонки и потерянные данные моделями на Quint', en: 'Finding races and lost data with Quint models' } },
        also: [{ post: 'quint-vs-tests-and-tla', label: { ru: 'Чем model checking отличается от тестов', en: 'Model checking vs testing' } }],
        notes: {
          title: { ru: 'Программы проверки', en: 'Model checking tools' },
          items: [
            { name: { ru: 'TLC', en: 'TLC' }, text: { ru: 'первая программа проверки моделей на TLA+: перебирает все состояния по одному, поэтому мир модели должен быть небольшим.', en: 'the first checker for TLA+ models: it walks every state one by one, so the model’s world must be small.' } },
            { name: { ru: 'Apalache', en: 'Apalache' }, text: { ru: 'проверяет модели на TLA+ и Quint: переводит их в условия для SMT-решателя (например, Z3) и рассуждает обо всех исполнениях до заданной длины.', en: 'checks TLA+ and Quint models: it turns them into conditions for an SMT solver such as Z3 and reasons about all executions up to a given length.' } },
            { name: { ru: 'Quint', en: 'Quint' }, text: { ru: 'язык моделей со своим быстрым случайным прогоном; для полной проверки использует TLC и Apalache.', en: 'a modeling language with its own fast random simulation; for full checking it uses TLC and Apalache.' } },
            { name: { ru: 'Alloy', en: 'Alloy' }, text: { ru: 'ищет небольшой пример, где правило о данных или правах нарушено.', en: 'looks for a small example where a rule about data or access rights breaks.' } },
          ],
        },
        faq: [
          { q: { ru: 'Model checking — что это?', en: 'What is model checking?' }, a: { ru: 'Метод, при котором программа обходит все состояния описанной системы и проверяет, что в каждом правила соблюдены.', en: 'A method where a program walks through every state of a described system and checks that the rules hold in each.' } },
          { q: { ru: 'Чем model checking отличается от тестов?', en: 'How is model checking different from tests?' }, a: { ru: 'Тест проверяет сценарий, который вы придумали. Model checking перебирает все порядки действий и при нарушении выдаёт точную цепочку шагов.', en: 'A test checks a scenario you thought of. Model checking tries every order of actions and gives the exact step sequence when a rule breaks.' } },
        ],
        source: { url: 'https://en.wikipedia.org/wiki/Model_checking', label: { ru: 'Википедия: проверка моделей', en: 'Wikipedia: Model checking' } },
        seo: {
          title: { ru: 'Проверка моделей (model checking): что это, программы проверки и отличие от тестов', en: 'Model checking: what it is, model checking tools and how it differs from testing' },
          description: {
            ru: 'Проверка моделей обходит состояния описанной системы и выдаёт точные шаги, на которых правило нарушается. Программы: TLC, Apalache, Alloy. Чем метод отличается от тестов.',
            en: 'Model checking walks the states of a described system and returns the exact steps where a rule breaks. Tools: TLC, Apalache, Alloy. How it differs from tests.',
          },
        },
      },
      {
        slug: 'invariant',
        name: { ru: 'Инвариант', en: 'Invariant' },
        aka: { ru: 'правило «всегда верно»', en: 'an “always true” rule' },
        def: {
          ru: 'Инвариант — условие, которое должно выполняться в каждом состоянии системы, в каком бы порядке ни шли действия. Например, в магазине деньги никогда не списаны без заказа, а в расшифровщике встреч приватная запись никогда не попадает в общее хранилище. Проверка моделей ищет цепочку шагов, после которой инвариант нарушается.',
          en: 'An invariant is a condition that must hold in every state of the system, in whatever order actions come. For example, in a shop money is never charged without an order, and in a meeting transcriber a private recording never reaches shared storage. Model checking looks for a chain of steps after which the invariant breaks.',
        },
        match: { ru: ['инвариант\\p{L}*'], en: ['invariants?'] },
        related: ['model-checking', 'quint', 'rfc-2119'],
        faq: [
          { q: { ru: 'Инвариант — что это?', en: 'What is an invariant?' }, a: { ru: 'Условие, которое должно выполняться в каждом состоянии системы, в каком бы порядке ни шли действия.', en: 'A condition that must hold in every state of a system, whatever the order of actions.' } },
          { q: { ru: 'Пример инварианта?', en: 'An example of an invariant?' }, a: { ru: 'В магазине деньги никогда не списаны без заказа.', en: 'In a shop, money is never charged without an order.' } },
        ],
        source: { url: 'https://en.wikipedia.org/wiki/Invariant_(computer_science)', label: { ru: 'Википедия: инвариант в программировании', en: 'Wikipedia: Invariant (computer science)' } },
      },
      {
        slug: 'rice-theorem',
        name: { ru: 'Теорема Райса', en: "Rice's theorem" },
        aka: { ru: 'неразрешимость свойств программ', en: 'undecidability of program properties' },
        def: {
          ru: 'Теорема Райса: нет программы, которая для любой программы точно скажет, есть ли у неё заданное свойство поведения, например «никогда не списывает деньги без заказа», если это свойство есть у одних программ и нет у других. Вопросы о тексте кода решаются чтением, вопросы о поведении — нет. Поэтому проверку сужают рамкой: перебирают маленький мир, пишут так, чтобы правило держалось по построению, или разрешают ответ «не знаю».',
          en: 'Rice’s theorem says no program can tell for every program whether it has a given behavioural property, such as “never charges money without an order”, if some programs have the property and others don’t. Questions about the code text are settled by reading; questions about behaviour are not. So checks are narrowed by a frame: try a small world in full, write code so the rule holds by construction, or allow a “don’t know” answer.',
        },
        match: { ru: ['теорем\\p{L}* Райса'], en: ["Rice['’]s theorem"] },
        related: ['predicate', 'halting-problem', 'barber-paradox', 'alan-turing', 'cap-theorem', 'imperative', 'declarative', 'model-checking', 'invariant', 'bounded-context', 'ubiquitous-language', 'domain'],
        more: { post: 'rice-theorem-explained', label: { ru: 'Теорема Райса простыми словами', en: "Rice's theorem in plain words" } },
        also: [{ post: 'agent-checkpoint', label: { ru: 'Где ставить проверку работы ИИ-агента', en: "Where to check an AI agent's work" } }],
        faq: [
          { q: { ru: 'Теорема Райса простыми словами?', en: 'Rice’s theorem in plain words?' }, a: { ru: 'Нет программы, которая для любой программы точно скажет, есть ли у неё заданное свойство поведения.', en: 'No program can tell for every program whether it has a given behavioural property.' } },
          { q: { ru: 'Что делать с теоремой Райса на практике?', en: 'What do you do about Rice’s theorem in practice?' }, a: { ru: 'Сужать проверку: маленьким миром, узким языком или честным ответом «не знаю».', en: 'Narrow the check: a small world, a narrow language or an honest “don’t know”.' } },
        ],
        source: { url: 'https://en.wikipedia.org/wiki/Rice%27s_theorem', label: { ru: 'Википедия: теорема Райса', en: "Wikipedia: Rice's theorem" } },
      },
      {
        slug: 'halting-problem',
        name: { ru: 'Проблема остановки', en: 'Halting problem' },
        aka: { ru: 'задача остановки', en: 'the halting question' },
        def: {
          ru: 'Проблема остановки — вопрос: закончит ли данная программа работу на данном входе или будет работать вечно. Алан Тьюринг доказал, что нет программы, которая отвечает на него верно для любой программы и любого входа. Из этого выводится теорема Райса: проверка любого смыслового правила для любой программы тоже невозможна.',
          en: 'The halting problem is the question of whether a given program finishes on a given input or runs forever. Alan Turing proved that no program answers it correctly for every program and input. Rice’s theorem follows from it: checking any behavioural rule for every program is impossible too.',
        },
        match: { ru: ['проблем\\p{L}* остановки', 'задач\\p{L}* остановки'], en: ['halting problem'] },
        related: ['rice-theorem', 'barber-paradox', 'alan-turing', 'model-checking'],
        screens: [
          {
            ru: 'Судья получает программу и её вход и должен сказать, закончит ли она работу или будет крутиться вечно. Для отдельных программ ответ найти можно. Тьюринг доказал, что нет судьи, который отвечает верно для всех программ сразу.',
            en: 'The judge gets a program and its input and must say whether it finishes or loops forever. For particular programs an answer can be found. Turing proved that there is no judge that answers correctly for every program at once.',
          },
          {
            ru: 'Почему такого судьи нет. Допустим, он есть. Напишем программу-спорщика: она спрашивает судью о самой себе и поступает наоборот. Судья сказал «остановится» — спорщик крутится вечно; сказал «не остановится» — спорщик сразу останавливается. Судья ошибается в любом случае, значит, его не бывает. Это тот же приём, что в парадоксе брадобрея, который бреет всех, кто не бреет себя сам.',
            en: 'Why there is no such judge. Suppose there is one. Write a contrarian program: it asks the judge about itself and does the opposite. If the judge says “halts”, the contrarian loops forever; if it says “doesn’t halt”, the contrarian stops at once. The judge is wrong either way, so it can’t exist. This is the same trick as in the barber paradox, about a barber who shaves everyone who doesn’t shave themselves.',
          },
        ],
        more: { post: 'agent-checkpoint', label: { ru: 'Где ставить проверку работы ИИ-агента', en: "Where to check an AI agent's work" } },
        faq: [
          { q: { ru: 'Проблема остановки — что это?', en: 'What is the halting problem?' }, a: { ru: 'Вопрос, закончит ли программа работу на данном входе или будет работать вечно.', en: 'The question of whether a program finishes on a given input or runs forever.' } },
          { q: { ru: 'Можно ли решить проблему остановки?', en: 'Can the halting problem be solved?' }, a: { ru: 'Нет: Алан Тьюринг доказал, что нет программы, которая отвечает верно для любой программы и любого входа.', en: 'No: Alan Turing proved that no program answers correctly for every program and every input.' } },
        ],
        source: { url: 'https://en.wikipedia.org/wiki/Halting_problem', label: { ru: 'Википедия: проблема остановки', en: 'Wikipedia: Halting problem' } },
      },
      {
        slug: 'predicate',
        name: { ru: 'Предикат', en: 'Predicate' },
        aka: { ru: 'вопрос с ответом «да» или «нет»', en: 'a yes-or-no question' },
        def: {
          ru: 'Предикат в математике — утверждение с переменной, которое для каждого значения переменной становится истинным или ложным: $P(x)$ = «$x$ — чётное число» даёт «да» при $x = 4$ и «нет» при $x = 3$. Формально это функция $P\\colon X \\to \\{\\text{да}, \\text{нет}\\}$. Предикат о программах берёт программу и отвечает «да» или «нет»: «есть ли в коде запись в таблицу платежей», «спишет ли программа деньги без заказа». Теорема Райса говорит, какие такие предикаты нельзя вычислить.',
          en: 'A predicate in mathematics is a statement with a variable that becomes true or false for each value of the variable: $P(x)$ = “$x$ is even” gives “yes” for $x = 4$ and “no” for $x = 3$. Formally it is a function $P\\colon X \\to \\{\\text{yes}, \\text{no}\\}$. A predicate about programs takes a program and answers “yes” or “no”: “does the code write to the payments table”, “will the program charge money without an order”. Rice’s theorem says which such predicates cannot be computed.',
        },
        match: { ru: ['предикат\\p{L}*'], en: ['predicates?'] },
        related: ['rice-theorem', 'invariant', 'halting-problem'],
        faq: [
          { q: { ru: 'Предикат — что это?', en: 'What is a predicate?' }, a: { ru: 'Утверждение с переменной, которое для каждого значения становится истинным или ложным: «x — чётное число».', en: 'A statement with a variable that becomes true or false for each value: “x is even”.' } },
          { q: { ru: 'Где используют предикаты?', en: 'Where are predicates used?' }, a: { ru: 'В логике и в формулировке теоремы Райса: свойство программы записывают как предикат.', en: 'In logic and in stating Rice’s theorem: a program property is written as a predicate.' } },
        ],
        source: { url: 'https://en.wikipedia.org/wiki/Predicate_(mathematical_logic)', label: { ru: 'Википедия: предикат', en: 'Wikipedia: Predicate (mathematical logic)' } },
      },
      {
        slug: 'alan-turing',
        name: { ru: 'Алан Тьюринг', en: 'Alan Turing' },
        aka: { ru: 'машина Тьюринга, 1936', en: 'the Turing machine, 1936' },
        def: {
          ru: 'Алан Тьюринг — британский математик (1912–1954), один из основателей теории вычислений. В статье 1936 года «О вычислимых числах» описал машину Тьюринга — простейшую модель любой программы: лента с клетками и головка, которая читает, пишет и сдвигается по правилам. В той же работе показал, что есть вопросы о программах, на которые не ответит ни одна программа; отсюда проблема остановки, а из неё теорема Райса.',
          en: 'Alan Turing is a British mathematician (1912–1954), one of the founders of the theory of computation. In his 1936 paper “On Computable Numbers” he described the Turing machine, the simplest model of any program: a tape of cells and a head that reads, writes and moves by rules. In the same work he showed that some questions about programs cannot be answered by any program; the halting problem follows, and Rice’s theorem follows from that.',
        },
        match: { ru: ['(?:Алан\\p{L}* )?Тьюринг\\p{L}*'], en: ['(?:Alan )?Turing'] },
        related: ['halting-problem', 'rice-theorem'],
        faq: [
          { q: { ru: 'Кто такой Алан Тьюринг?', en: 'Who was Alan Turing?' }, a: { ru: 'Британский математик (1912–1954), один из основателей теории вычислений.', en: 'A British mathematician (1912–1954), one of the founders of computation theory.' } },
          { q: { ru: 'Что такое машина Тьюринга?', en: 'What is a Turing machine?' }, a: { ru: 'Простейшая модель любой программы из статьи 1936 года: лента с клетками и головка, которая читает и пишет символы.', en: 'The simplest model of any program, from his 1936 paper: a tape of cells and a head that reads and writes symbols.' } },
        ],
        source: { url: 'https://en.wikipedia.org/wiki/Alan_Turing', label: { ru: 'Википедия: Алан Тьюринг', en: 'Wikipedia: Alan Turing' } },
      },
      {
        slug: 'barber-paradox',
        name: { ru: 'Парадокс брадобрея', en: 'Barber paradox' },
        aka: { ru: 'вопрос о самом себе', en: 'a question about itself' },
        def: {
          ru: 'Парадокс брадобрея — задача, которая показывает, что не всякое описание задаёт существующий объект. Деревенский брадобрей бреет всех, кто не бреет себя сам, и только их. Бреет ли он себя? Если бреет, то не должен; если не бреет, то должен. Значит, такого брадобрея не бывает. Бертран Рассел приводил его как наглядный вариант своего парадокса о множествах. Тот же приём, вопрос о самом себе, доказывает неразрешимость проблемы остановки.',
          en: 'The barber paradox is a puzzle showing that not every description defines something that exists. A village barber shaves everyone who does not shave themselves, and only them. Does he shave himself? If he does, he must not; if he doesn’t, he must. So no such barber exists. Bertrand Russell used it as an illustration of his paradox about sets. The same trick, a question about itself, proves the halting problem undecidable.',
        },
        match: { ru: ['парадокс\\p{L}* брадобрея', 'парадокс\\p{L}* цирюльника'], en: ['barber paradox'] },
        related: ['halting-problem', 'rice-theorem', 'alan-turing'],
        screens: [
          {
            ru: 'Суть в двух множествах. Жители деревни делятся на множество $A$ — те, кто бреет себя сам, и множество $B$ — те, кого бреет брадобрей. Правило говорит, что $B$ — ровно все, кто не в $A$, поэтому каждый житель попадает в одно и только одно множество. Брадобрей тоже житель, и ему некуда встать. Если он в $A$, он бреет себя сам, то есть его бреет брадобрей, значит, он в $B$. Если он в $B$, его бреет брадобрей, то есть он сам, значит, он в $A$. Противоречие показывает, что такое правило выполнить нельзя.',
            en: 'The point is two sets. The villagers split into set $A$, those who shave themselves, and set $B$, those the barber shaves. The rule says $B$ is exactly everyone not in $A$, so every villager is in one and only one set. The barber is a villager too, and he has nowhere to go. If he is in $A$, he shaves himself, so the barber shaves him, so he is in $B$. If he is in $B$, the barber shaves him, that is, he shaves himself, so he is in $A$. The contradiction shows that such a rule can’t be satisfied.',
          },
          {
            ru: 'Исходный парадокс Рассела 1901 года — о множествах. Обычное множество не содержит само себя: множество кошек само не кошка. Бывают множества, которые содержат себя: множество всего, что не кошка, само не кошка, значит, лежит внутри себя. Возьмём $R$ — множество всех множеств, которые не содержат себя: $R = \\{x : x \\notin x\\}$. Если $R \\in R$, то по определению $R \\notin R$; если $R \\notin R$, то $R$ подходит под определение и $R \\in R$. Брадобрей — тот же вопрос в бытовой одежде: жители вместо множеств и «бреет» вместо «содержит».',
            en: 'Russell’s original 1901 paradox is about sets. An ordinary set does not contain itself: the set of cats is not a cat. Some sets do contain themselves: the set of everything that is not a cat is itself not a cat, so it lies inside itself. Take $R$, the set of all sets that do not contain themselves: $R = \\{x : x \\notin x\\}$. If $R \\in R$, then by definition $R \\notin R$; if $R \\notin R$, then $R$ fits the definition and $R \\in R$. The barber is the same question in everyday clothes: villagers instead of sets and “shaves” instead of “contains”.',
          },
        ],
        faq: [
          { q: { ru: 'Парадокс брадобрея — в чём он?', en: 'What is the barber paradox?' }, a: { ru: 'Брадобрей бреет всех, кто не бреет себя сам: если он бреет себя, то не должен, а если не бреет, то должен. Значит, такого брадобрея нет.', en: 'A barber shaves everyone who does not shave themselves: if he shaves himself he must not, and if he does not he must. So no such barber exists.' } },
          { q: { ru: 'Что показывает парадокс брадобрея?', en: 'What does the barber paradox show?' }, a: { ru: 'Что не всякое описание задаёт существующий объект. Бертран Рассел приводил его для объяснения своего парадокса о множествах.', en: 'That not every description defines something that exists. Bertrand Russell used it to explain his paradox about sets.' } },
        ],
        source: { url: 'https://en.wikipedia.org/wiki/Barber_paradox', label: { ru: 'Википедия: парадокс брадобрея', en: 'Wikipedia: Barber paradox' } },
      },
      {
        slug: 'event-storming',
        name: { ru: 'Event storming', en: 'Event storming' },
        def: {
          ru: 'Event storming — формат совместной работы, на котором команда раскладывает предметную область на события, а затем находит команды, агрегаты и правила. Результат — границы агрегатов: что входит командами, что выходит событиями, какие правила верны всегда.',
          en: 'Event storming is a workshop format where a team lays out the business domain as events, then finds commands, aggregates and rules. The result is aggregate boundaries: what comes in as commands, what goes out as events, which rules always hold.',
        },
        match: { ru: ['event storming', 'EventStorming'], en: ['event storming', 'EventStorming'] },
        related: ['aggregate', 'ddd', 'bounded-context', 'invariant'],
        more: { post: 'agent-checkpoint', label: { ru: 'Агрегат как пост проверки работы агента', en: "The aggregate as a checkpoint for an agent's work" } },
        faq: [
          { q: { ru: 'Event storming — что это?', en: 'What is event storming?' }, a: { ru: 'Формат совместной работы, на котором команда раскладывает предметную область на события и находит команды, агрегаты и правила.', en: 'A team workshop format that lays out a domain as events and finds commands, aggregates and rules.' } },
          { q: { ru: 'Что получается после event storming?', en: 'What comes out of event storming?' }, a: { ru: 'Границы агрегатов: что входит командами, что выходит событиями и какие правила внутри.', en: 'Aggregate boundaries: what comes in as commands, what goes out as events and which rules are inside.' } },
        ],
        source: { url: 'https://www.eventstorming.com/', label: { ru: 'eventstorming.com', en: 'eventstorming.com' } },
      },
      {
        slug: 'race-condition',
        name: { ru: 'Гонка', en: 'Race condition' },
        aka: { ru: 'состояние гонки', en: 'a race' },
        def: {
          ru: 'Гонка — ошибка, при которой результат зависит от того, какое из двух действий успело раньше. Каждое действие по отдельности работает верно, а вместе они дают потерю или путаницу данных. Классический случай: условие проверили один раз, а к моменту действия оно уже изменилось. Лечат повторной проверкой в момент действия или общим замком.',
          en: 'A race condition is a defect in which the result depends on which of two actions got there first. Each action works correctly on its own, but together they cause a loss or a mix-up of data. The classic case: a condition is checked once, and by the time of the action it has already changed. It is cured by rechecking at the moment of the action or by a shared lock.',
        },
        match: { ru: ['состояни\\p{L}* гонки', 'гонк\\p{L}* входа', 'race conditions?'], en: ['race conditions?', 'races'] },
        related: ['model-checking', 'invariant', 'quint'],
        more: { post: 'quint-models-find-races', label: { ru: 'Какие гонки нашли модели на Quint', en: 'The races found by Quint models' } },
        faq: [
          { q: { ru: 'Состояние гонки — что это?', en: 'What is a race condition?' }, a: { ru: 'Ошибка, при которой результат зависит от того, какое из двух действий успело раньше.', en: 'A defect where the result depends on which of two actions got there first.' } },
          { q: { ru: 'Как найти гонку?', en: 'How do you find a race condition?' }, a: { ru: 'Перебрать все порядки, в которых могут выполняться действия, например моделью на Quint: тесты проверяют только один порядок.', en: 'Try every order in which the actions can run, for example with a Quint model: tests check only one order.' } },
        ],
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
          ru: 'Промпт — запрос к модели: задача, контекст, формат ответа и ограничения. Чем точнее собраны эти части, тем меньше правок после первого ответа.',
          en: 'A prompt is a request to a model: task, context, answer format and constraints. The more precisely these parts are put together, the fewer edits follow the first answer.',
        },
        match: { ru: ['промпт\\p{L}*'], en: ['prompts?'] },
        related: ['context', 'token', 'hallucination'],
        faq: [
          { q: { ru: 'Промпт — что это?', en: 'What is a prompt?' }, a: { ru: 'Запрос к модели: задача, контекст, формат ответа и ограничения.', en: 'A request to a model: the task, context, answer format and constraints.' } },
          { q: { ru: 'Как написать хороший промпт?', en: 'How do you write a good prompt?' }, a: { ru: 'Собрать все части точно: чем точнее задача, данные и формат, тем меньше правок после первого ответа.', en: 'Put all parts together precisely: the more exact the task, data and format, the fewer edits after the first answer.' } },
        ],
        source: { url: 'https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview', label: { ru: 'Anthropic: промпт-инжиниринг', en: 'Anthropic: Prompt engineering' } },
      },
      {
        slug: 'source',
        name: { ru: 'Источник', en: 'Source' },
        def: {
          ru: 'Источник — система или документ, где лежит исходный факт: заявка, таблица, запись встречи. Ответ агента надёжен настолько, насколько его можно сверить с источником, поэтому у каждого утверждения в ответе стоит ссылка на источник.',
          en: 'A source is the system or document where the original fact lives: a ticket, a sheet, a meeting record. An agent’s answer is as reliable as it can be checked against its source, so every claim in the answer carries a link to its source.',
        },
        match: { ru: ['источник\\p{L}*'], en: ['sources?(?! code)'] },
        related: ['epimorphism', 'hallucination', 'context'],
        faq: [
          { q: { ru: 'Источник — что это?', en: 'What is a source?' }, a: { ru: 'Система или документ, где лежит исходный факт: заявка, таблица, запись встречи.', en: 'The system or document that holds the original fact: a ticket, a table, a meeting recording.' } },
          { q: { ru: 'Зачем ссылка на источник в ответе агента?', en: 'Why should an agent’s answer cite sources?' }, a: { ru: 'Ответ надёжен настолько, насколько его можно сверить с источником.', en: 'An answer is only as reliable as it can be checked against its source.' } },
        ],
      },
      {
        slug: 'hallucination',
        name: { ru: 'Галлюцинация', en: 'Hallucination' },
        aka: { ru: 'галлюцинации LLM, галлюцинации ИИ, галлюцинации нейросети', en: 'LLM hallucination, AI hallucination' },
        def: {
          ru: 'Галлюцинация LLM — уверенный, но выдуманный ответ большой языковой модели: несуществующий факт, функция или ссылка. В коде это, например, вызов несуществующей функции или установка пакета, которого нет. Появляется там, где у части ответа нет опоры в данных, и модель заполняет пустое место правдоподобной догадкой. Обратный случай, когда опора есть у каждой части ответа, называют эпиморфизмом. Снижают её данными из надёжных источников и проверкой результата.',
          en: 'An LLM hallucination is a confident but invented answer from a model: a nonexistent fact, function or link. In code it is, for example, a call to a function that does not exist or installing a package that is not there. It appears where part of the answer has no support in the data, and the model fills the empty spot with a plausible guess. The opposite case, where every part of the answer has support, is called an epimorphism. It is reduced by grounding in reliable sources and by checking the result.',
        },
        match: { ru: ['галлюцинаци\\p{L}*', 'галлюцинир\\p{L}*'], en: ['hallucinat\\p{L}*'] },
        related: ['epimorphism', 'source', 'prompt', 'llm', 'checks'],
        faq: [
          { q: { ru: 'Галлюцинация LLM — что это?', en: 'What is an LLM hallucination?' }, a: { ru: 'Уверенный, но выдуманный ответ модели: несуществующий факт, функция или ссылка.', en: 'A confident but made-up model answer: a fact, function or link that does not exist.' } },
          { q: { ru: 'Почему возникают галлюцинации?', en: 'Why do hallucinations happen?' }, a: { ru: 'Там, где у части ответа нет опоры в данных, модель заполняет пустое место правдоподобной догадкой.', en: 'Where part of the answer has no support in the data, the model fills the gap with a plausible guess.' } },
          { q: { ru: 'Как снизить галлюцинации?', en: 'How do you reduce hallucinations?' }, a: { ru: 'Давать модели данные из надёжных источников и проверять результат.', en: 'Give the model data from reliable sources and check the result.' } },
        ],
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
          ru: 'Контекст — всё, что модель видит в данный момент: диалог, файлы проекта и данные подключённых систем. Чего нет в контексте, того агент не знает.',
          en: 'Context — everything the model sees at the moment: the conversation, project files and data from connected systems. What is not in context, the agent does not know.',
        },
        match: { ru: ['контекст\\p{L}*'], en: ['contexts?'] },
        related: ['token', 'prompt', 'source', 'mcp'],
        faq: [
          { q: { ru: 'Что такое контекст в ИИ?', en: 'What is context in AI?' }, a: { ru: 'Всё, что модель видит в данный момент: диалог, файлы проекта и данные подключённых систем.', en: 'Everything the model sees at the moment: the conversation, project files and data from connected systems.' } },
          { q: { ru: 'Почему агент не знает про мой проект?', en: 'Why doesn’t the agent know about my project?' }, a: { ru: 'Чего нет в контексте, того агент не знает. Постоянные знания о проекте кладут в файлы инструкций вроде AGENTS.md или CLAUDE.md.', en: 'What is not in the context, the agent does not know. Standing project knowledge goes into instruction files like AGENTS.md or CLAUDE.md.' } },
        ],
        source: { url: 'https://platform.claude.com/docs/en/build-with-claude/context-windows', label: { ru: 'Anthropic: контекстное окно', en: 'Anthropic: Context windows' } },
        seo: {
          title: { ru: 'Контекст в ИИ: что это, контекстное окно и почему агент не знает про ваш проект', en: 'AI context: what it is, the context window and why the agent forgets' },
          description: {
            ru: 'Контекст — всё, что модель видит в данный момент: диалог, файлы проекта, данные подключённых систем. Что такое контекстное окно, почему агент забывает проект и куда класть постоянные знания: AGENTS.md, CLAUDE.md, память.',
            en: 'Context is everything a model sees right now: the conversation, project files, data from connected systems. What the context window is, why an agent forgets your project, and where standing knowledge goes: AGENTS.md, CLAUDE.md, memory.',
          },
        },
      },
      {
        slug: 'token',
        name: { ru: 'Токен', en: 'Token' },
        def: {
          ru: 'Токен — единица текста, которую считает LLM: примерно слог или короткое слово. От числа токенов зависят цена запроса и то, сколько поместится в контекст.',
          en: 'A token is a unit of text an LLM counts: roughly a syllable or a short word. The token count sets the price of a request and how much fits into context.',
        },
        match: { ru: ['токен\\p{L}*'], en: ['tokens?'] },
        related: ['context', 'llm', 'prompt'],
        faq: [
          { q: { ru: 'Что такое токен в ИИ?', en: 'What is a token in AI?' }, a: { ru: 'Единица текста, которую считает LLM: примерно слог или короткое слово.', en: 'A unit of text an LLM counts: roughly a syllable or a short word.' } },
          { q: { ru: 'Почему важно число токенов?', en: 'Why does the token count matter?' }, a: { ru: 'От него зависят цена запроса и то, сколько поместится в контекст модели.', en: 'It sets the request price and how much fits into the model’s context.' } },
        ],
        source: { url: 'https://platform.claude.com/docs/en/build-with-claude/token-counting', label: { ru: 'Anthropic: подсчёт токенов', en: 'Anthropic: Token counting' } },
      },
    ],
  },
  {
    slug: 'group-theory',
    icon: 'research',
    name: { ru: 'Группы, ходы и правила', en: 'Groups, moves and rules' },
    hint: { ru: 'Язык головоломок и симметрий', en: 'The language of puzzles and symmetries' },
    terms: [
      {
        slug: 'math-group',
        name: { ru: 'Группа (в математике)', en: 'Group (in mathematics)' },
        aka: { ru: 'набор ходов', en: 'a set of moves' },
        def: {
          ru: 'Группа (в математике) — набор ходов, которые можно выполнять цепочкой, один за другим, и отменять: есть ход «ничего не делать», и у каждого хода есть обратный. Повороты кубика Рубика образуют группу. В игре «шаг и лифт» ходы такие: шаг по кругу из шести точек (шесть шагов подряд возвращают на место), лифт на круг этажом выше и лифт вниз.',
          en: 'A group (in mathematics) is a set of moves that can be performed in a chain, one after another, and undone: there is a move “do nothing”, and every move has an inverse. The turns of a Rubik’s Cube form a group. In the game “step and lift” the moves are a step around a circle of six points (six steps in a row return to the start), a lift to a circle one floor up, and a lift down.',
        },
        match: {
          ru: ['теори\\p{L}* групп', 'свободн\\p{L}+ групп\\p{L}*', 'циклическ\\p{L}+ групп\\p{L}*'],
          en: ['group theory', 'free groups?', 'cyclic groups?'],
        },
        related: ['generators', 'group-relation', 'group-presentation', 'cayley-graph'],
        more: { post: 'relation-gap-how-many-rules', label: { ru: 'Сколько правил нужно, чтобы описать игру: шаг и лифт', en: 'How many rules does a game need: a step and a lift' } },
        faq: [
          { q: { ru: 'Группа в математике — что это?', en: 'What is a group in mathematics?' }, a: { ru: 'Набор ходов, которые можно выполнять цепочкой и отменять: есть ход «ничего не делать», и у каждого хода есть обратный.', en: 'A set of moves that can be chained and undone: there is a “do nothing” move, and every move has an inverse.' } },
          { q: { ru: 'Пример группы?', en: 'An example of a group?' }, a: { ru: 'Повороты кубика Рубика.', en: 'The turns of a Rubik’s Cube.' } },
        ],
        source: { url: 'https://en.wikipedia.org/wiki/Group_(mathematics)', label: { ru: 'Википедия (англ.): Group (mathematics)', en: 'Wikipedia: Group (mathematics)' } },
      },
      {
        slug: 'generators',
        name: { ru: 'Образующие группы', en: 'Generators of a group' },
        aka: { ru: 'основные ходы', en: 'the basic moves' },
        def: {
          ru: 'Образующие группы — небольшой набор ходов, из которых цепочками получаются все остальные ходы группы. В игре «шаг и лифт» их два: шаг x и лифт t, а лифт вниз записывается как t⁻¹. У кубика Рубика образующие — повороты шести граней.',
          en: 'Generators of a group are a small set of moves from which chains produce all other moves of the group. In the game “step and lift” there are two: the step x and the lift t, and the lift down is written t⁻¹. For a Rubik’s Cube the generators are the turns of the six faces.',
        },
        match: {
          ru: ['образующ\\p{L}*'],
          en: ['generators? of (?:a|the) group', 'two-generator', 'normal generators?'],
        },
        related: ['math-group', 'group-presentation', 'relation-module'],
        more: { post: 'relation-gap-how-many-rules', label: { ru: 'Сколько правил нужно, чтобы описать игру: шаг и лифт', en: 'How many rules does a game need: a step and a lift' } },
        faq: [
          { q: { ru: 'Образующие группы — что это?', en: 'What are the generators of a group?' }, a: { ru: 'Небольшой набор ходов, из которых цепочками получаются все остальные ходы группы.', en: 'A small set of moves from which chains produce every other move of the group.' } },
          { q: { ru: 'Какие образующие у кубика Рубика?', en: 'What are a Rubik’s Cube’s generators?' }, a: { ru: 'Повороты шести граней.', en: 'The turns of its six faces.' } },
        ],
        source: { url: 'https://en.wikipedia.org/wiki/Generating_set_of_a_group', label: { ru: 'Википедия (англ.): Generating set of a group', en: 'Wikipedia: Generating set of a group' } },
      },
      {
        slug: 'group-relation',
        name: { ru: 'Соотношение группы', en: 'Relation of a group' },
        aka: { ru: 'правило игры', en: 'a rule of the game' },
        def: {
          ru: 'Соотношение группы — правило вида «эта цепочка ходов возвращает всё на место». В игре «шаг и лифт» первое правило x⁶ = 1: шесть шагов подряд оставляют фишку на месте. Равенство двух цепочек тоже правило: u·v = v·u записывается как u·v·u⁻¹·v⁻¹ = 1. Сколько правил нужно, чтобы задать группу целиком, спрашивает вопрос о разрыве соотношений.',
          en: 'A relation of a group is a rule of the form “this chain of moves puts everything back in place”. In the game “step and lift” the first rule is x⁶ = 1: six steps in a row leave the token where it was. An equality of two chains is a rule too: u·v = v·u is written as u·v·u⁻¹·v⁻¹ = 1. How many rules are needed to define a group completely is the question of the relation gap.',
        },
        match: {
          ru: ['числ\\p{L}* соотношений', 'соотношени\\p{L}* группы'],
          en: ['number of relations', 'relations? of (?:a|the) group'],
        },
        related: ['group-presentation', 'commutator', 'relation-gap', 'one-relator-group'],
        more: { post: 'relation-gap-how-many-rules', label: { ru: 'Сколько правил нужно, чтобы описать игру: шаг и лифт', en: 'How many rules does a game need: a step and a lift' } },
        faq: [
          { q: { ru: 'Соотношение группы — что это?', en: 'What is a group relation?' }, a: { ru: 'Правило вида «эта цепочка ходов возвращает всё на место».', en: 'A rule of the form “this chain of moves puts everything back”.' } },
          { q: { ru: 'Пример соотношения?', en: 'An example of a relation?' }, a: { ru: 'В игре «шаг и лифт» шесть шагов подряд оставляют фишку на месте: x⁶ = 1.', en: 'In the step-and-lift game six steps in a row leave the piece in place: x⁶ = 1.' } },
        ],
        source: { url: 'https://en.wikipedia.org/wiki/Presentation_of_a_group', label: { ru: 'Википедия (англ.): Presentation of a group', en: 'Wikipedia: Presentation of a group' } },
      },
      {
        slug: 'group-presentation',
        name: { ru: 'Копредставление группы', en: 'Group presentation' },
        aka: { ru: 'ходы и правила одной строкой', en: 'moves and rules in one line' },
        def: {
          ru: 'Копредставление группы — запись группы буквами-ходами и списком соотношений. Игра «шаг и лифт» записывается как ⟨x, t | x⁶, [x³, t·x²·t⁻¹]⟩: слева от черты два хода, справа два правила. По такой записи строят карту группы и ведут вычисления, в том числе в системах компьютерной алгебры.',
          en: 'A group presentation is a way to write a group with letters for moves and a list of relations. The game “step and lift” is written as ⟨x, t | x⁶, [x³, t·x²·t⁻¹]⟩: two moves left of the bar, two rules right of it. From such a record one builds the map of the group and does calculations, including in computer algebra systems.',
        },
        match: {
          ru: ['копредставлени\\p{L}*'],
          en: ['group presentations?', 'two-generator presentations?'],
        },
        related: ['generators', 'group-relation', 'cayley-graph', 'computer-algebra-system'],
        more: { post: 'relation-gap-how-many-rules', label: { ru: 'Сколько правил нужно, чтобы описать игру: шаг и лифт', en: 'How many rules does a game need: a step and a lift' } },
        faq: [
          { q: { ru: 'Копредставление группы — что это?', en: 'What is a group presentation?' }, a: { ru: 'Запись группы буквами-ходами и списком соотношений.', en: 'A description of a group by letter moves and a list of relations.' } },
          { q: { ru: 'Зачем копредставление?', en: 'Why use a presentation?' }, a: { ru: 'По нему строят карту группы и ведут вычисления в программах вроде GAP.', en: 'It is used to build the group’s map and to compute in programs like GAP.' } },
        ],
        source: { url: 'https://en.wikipedia.org/wiki/Presentation_of_a_group', label: { ru: 'Википедия (англ.): Presentation of a group', en: 'Wikipedia: Presentation of a group' } },
      },
      {
        slug: 'cayley-graph',
        name: { ru: 'Граф Кэли', en: 'Cayley graph' },
        aka: { ru: 'карта ходов группы', en: 'the move map of a group' },
        def: {
          ru: 'Граф Кэли — карта группы: точка — положение, стрелка — ход из одного положения в другое. Карта игры «шаг и лифт» — круги из шести точек, соединённые лифтами. Тот же вид графа лежит под кубиком Рубика: точки — все положения кубика, стрелки — повороты граней.',
          en: 'A Cayley graph is the map of a group: a point is a position, an arrow is a move from one position to another. The map of the game “step and lift” is circles of six points joined by lifts. The same kind of graph lies under the Rubik’s Cube: the points are all positions of the cube, the arrows are face turns.',
        },
        match: { ru: ['граф\\p{L}* Кэли'], en: ['Cayley graphs?'] },
        related: ['math-group', 'generators', 'group-presentation', 'group-homology'],
        more: { post: 'rubik-cube-neural-network', label: { ru: 'Нейросеть собирает кубик Рубика: граф положений и ходов', en: 'A neural network solves the Rubik’s Cube: the graph of positions and moves' } },
        also: [
          { post: 'longest-ring-arrangement', label: { ru: 'Кольцо с шариками: карта ходов и самая запутанная расстановка', en: 'Balls on a ring: the move map and the most tangled arrangement' } },
          { post: 'relation-gap-how-many-rules', label: { ru: 'Карта игры «шаг и лифт»', en: 'The map of the game “step and lift”' } },
        ],
        faq: [
          { q: { ru: 'Граф Кэли — что это?', en: 'What is a Cayley graph?' }, a: { ru: 'Карта группы: точка — положение, стрелка — ход из одного положения в другое.', en: 'A map of a group: a point is a position, an arrow is a move from one position to another.' } },
          { q: { ru: 'Где встречается граф Кэли?', en: 'Where do Cayley graphs appear?' }, a: { ru: 'Например, под кубиком Рубика: точки — все положения кубика, стрелки — повороты граней.', en: 'For example, behind a Rubik’s Cube: points are all cube positions, arrows are face turns.' } },
        ],
        source: { url: 'https://en.wikipedia.org/wiki/Cayley_graph', label: { ru: 'Википедия (англ.): Cayley graph', en: 'Wikipedia: Cayley graph' } },
      },
      {
        slug: 'commutator',
        name: { ru: 'Коммутатор', en: 'Commutator' },
        aka: { ru: '[u, v] = u·v·u⁻¹·v⁻¹', en: '[u, v] = u·v·u⁻¹·v⁻¹' },
        def: {
          ru: 'Коммутатор — цепочка из четырёх ходов: сделать u, сделать v, отменить u, отменить v. Если ходы u и v можно менять местами (они «друзья»), коммутатор равен «ничего не сделали». В игре «шаг и лифт» второе правило: коммутатор полукруга x³ и крюка t·x²·t⁻¹ равен единице.',
          en: 'A commutator is a chain of four moves: do u, do v, undo u, undo v. If the moves u and v can be swapped (they are “friends”), the commutator equals “nothing was done”. In the game “step and lift” the second rule says that the commutator of the half-circle x³ and the hook t·x²·t⁻¹ equals one.',
        },
        match: { ru: ['коммутатор\\p{L}*', 'коммутир\\p{L}*'], en: ['commutators?'] },
        related: ['centralizer', 'group-relation', 'group-presentation'],
        more: { post: 'relation-gap-how-many-rules', label: { ru: 'Сколько правил нужно, чтобы описать игру: шаг и лифт', en: 'How many rules does a game need: a step and a lift' } },
        faq: [
          { q: { ru: 'Коммутатор — что это?', en: 'What is a commutator?' }, a: { ru: 'Цепочка из четырёх ходов: сделать u, сделать v, отменить u, отменить v.', en: 'A chain of four moves: do u, do v, undo u, undo v.' } },
          { q: { ru: 'Что значит, что коммутатор равен единице?', en: 'What does it mean if a commutator equals one?' }, a: { ru: 'Ходы u и v можно менять местами: результат не зависит от порядка.', en: 'The moves u and v can be swapped: the result does not depend on their order.' } },
        ],
        source: { url: 'https://en.wikipedia.org/wiki/Commutator', label: { ru: 'Википедия (англ.): Commutator', en: 'Wikipedia: Commutator' } },
      },
      {
        slug: 'centralizer',
        name: { ru: 'Централизатор', en: 'Centralizer' },
        aka: { ru: 'все «друзья» хода', en: 'all “friends” of a move' },
        def: {
          ru: 'Централизатор — все ходы, которые можно менять местами с данным ходом: его «друзья». В игре «шаг и лифт» у полкруга x³ друзья — два шага подряд x² и крюк t·x²·t⁻¹, но между собой они не дружат. Теорема Ньюмана (1973): в группе с одним соотношением и ходом, возвращающим на место после нескольких повторов, друзья любого хода образуют цепочку повторов одного хода и потому дружат между собой. Поэтому у этой игры больше одного правила.',
          en: 'Centralizer — all moves that can be swapped with a given move: its “friends”. In the game “step and lift” the friends of the half-circle x³ include two steps in a row x² and the hook t·x²·t⁻¹, but they are not friends with each other. Newman’s theorem (1973): in a group with one relation and a move that returns to the start after several repeats, the friends of any move form a chain of repeats of a single move and therefore are friends with each other. This is why this game has more than one rule.',
        },
        match: { ru: ['централизатор\\p{L}*'], en: ['centralis?ers?'] },
        related: ['commutator', 'one-relator-group', 'group-relation'],
        more: { post: 'relation-gap-how-many-rules', label: { ru: 'Почему игроку мало одного правила: друзья не дружат', en: 'Why one rule is not enough for the player: friends are not friends' } },
        faq: [
          { q: { ru: 'Централизатор — что это?', en: 'What is a centralizer?' }, a: { ru: 'Все ходы, которые можно менять местами с данным ходом, его «друзья».', en: 'All moves that can be swapped with a given move, its “friends”.' } },
          { q: { ru: 'Что говорит теорема Ньюмана?', en: 'What does Newman’s theorem say?' }, a: { ru: 'Она описывает централизаторы в группах с одним соотношением, 1973 год.', en: 'It describes centralizers in one-relator groups, from 1973.' } },
        ],
        source: { url: 'https://en.wikipedia.org/wiki/Centralizer_and_normalizer', label: { ru: 'Википедия (англ.): Centralizer and normalizer', en: 'Wikipedia: Centralizer and normalizer' } },
      },
      {
        slug: 'one-relator-group',
        name: { ru: 'Группа с одним соотношением', en: 'One-relator group' },
        aka: { ru: 'сколько угодно ходов, одно правило', en: 'any number of moves, one rule' },
        def: {
          ru: 'Группа с одним соотношением — группа, которую можно задать любым числом ходов, но единственным правилом. Про такие группы известно много: например, теорема Ньюмана о друзьях любого хода. Игра «шаг и лифт» с двумя правилами к ним не относится; в статье arXiv 2610.23637 это выводят из теоремы Ньюмана.',
          en: 'An one-relator group is a group that can be defined by any number of moves but a single rule. A lot is known about such groups, for example Newman’s theorem on the friends of any move. The game “step and lift”, with its two rules, is not one of them; the paper arXiv 2610.23637 derives this from Newman’s theorem.',
        },
        match: { ru: ['групп\\p{L}* с одним соотношением'], en: ['one-relator groups?'] },
        related: ['centralizer', 'group-relation', 'relation-gap'],
        more: { post: 'relation-gap-how-many-rules', label: { ru: 'Почему игроку мало одного правила: друзья не дружат', en: 'Why one rule is not enough for the player: friends are not friends' } },
        faq: [
          { q: { ru: 'Группа с одним соотношением — что это?', en: 'What is a one-relator group?' }, a: { ru: 'Группа, которую можно задать любым числом ходов, но единственным правилом.', en: 'A group defined by any number of moves but a single rule.' } },
          { q: { ru: 'Почему такие группы изучают?', en: 'Why study such groups?' }, a: { ru: 'Про них известно много, например теорема Ньюмана о друзьях любого хода.', en: 'A lot is known about them, such as Newman’s theorem on the friends of any move.' } },
        ],
        source: { url: 'https://en.wikipedia.org/wiki/One-relator_group', label: { ru: 'Википедия (англ.): One-relator group', en: 'Wikipedia: One-relator group' } },
      },
      {
        slug: 'relation-module',
        name: { ru: 'Модуль соотношений', en: 'Relation module' },
        aka: { ru: 'счёт «бухгалтера»', en: 'the “accountant’s” count' },
        def: {
          ru: 'Модуль соотношений — все следствия правил группы, записанные «бухгалтерски»: порядок ходов в записи не помнится, записи складываются и переносятся по карте группы. В игре «шаг и лифт» запись — петля на карте. В статье это R/[R, R] с действием группы сопряжением, а наименьшее число его образующих для этой игры равно 1.',
          en: 'Relation module — all consequences of the rules of a group, written “as an accountant would”: the order of moves is not remembered in an entry, entries add up and are carried around the map of the group. In the game “step and lift” an entry is a loop on the map. In the paper it is R/[R, R] with the group acting by conjugation, and for this game the least number of its generators is 1.',
        },
        match: { ru: ['модул\\p{L}* соотношений'], en: ['relation modules?'] },
        related: ['relation-gap', 'group-homology', 'group-relation', 'generators'],
        more: { post: 'relation-gap-how-many-rules', label: { ru: 'Счёт бухгалтера: одна запись', en: 'The accountant’s count: one entry' } },
        faq: [
          { q: { ru: 'Модуль соотношений — что это?', en: 'What is a relation module?' }, a: { ru: 'Все следствия правил группы, записанные «бухгалтерски»: порядок ходов в записи не помнится.', en: 'All consequences of a group’s rules written “like bookkeeping”: the order of moves is not remembered.' } },
          { q: { ru: 'Как модуль соотношений связан с разрывом?', en: 'How does the relation module relate to the gap?' }, a: { ru: 'Разрыв соотношений сравнивает число правил группы с числом образующих её модуля соотношений.', en: 'The relation gap compares the number of a group’s rules with the number of generators of its relation module.' } },
        ],
        source: { url: 'https://arxiv.org/abs/2610.23637', label: { ru: 'arXiv 2610.23637: Two-generator presentations with a relation gap', en: 'arXiv 2610.23637: Two-generator presentations with a relation gap' } },
      },
      {
        slug: 'relation-gap',
        name: { ru: 'Разрыв соотношений', en: 'Relation gap' },
        aka: { ru: 'relation gap', en: 'relation gap' },
        def: {
          ru: 'Разрыв соотношений — ситуация, когда наименьшее число соотношений группы больше наименьшего числа образующих её модуля соотношений. Вопрос, бывает ли так, поставил Карл Грюнберг в 1976 году, а в 1979 году он вошёл в список задач Уолла (задача B15). В игре «шаг и лифт» игроку нужны два правила, а бухгалтеру хватает одной записи: так вопрос закрыла статья arXiv 2610.23637 от 16 октября 2026 года.',
          en: 'A relation gap is the situation where the least number of relations of a group is larger than the least number of generators of its relation module. Karl Gruenberg raised the question whether this happens in 1976, and in 1979 it entered Wall’s list of problems (problem B15). In the game “step and lift” the player needs two rules while the accountant needs one entry: the paper arXiv 2610.23637 of 16 October 2026 settled the question.',
        },
        match: { ru: ['разрыв\\p{L}* соотношений'], en: ['relation gap'] },
        related: ['relation-module', 'group-relation', 'one-relator-group', 'wall-d2-problem'],
        more: { post: 'relation-gap-how-many-rules', label: { ru: 'Сколько правил нужно, чтобы описать игру: разрыв соотношений', en: 'How many rules does a game need: the relation gap' } },
        notes: {
          title: { ru: 'Два способа считать правила', en: 'Two ways to count rules' },
          items: [
            { name: { ru: 'Игрок', en: 'Player' }, text: { ru: 'Правило — маршрут по карте, порядок ходов важен. Наименьшее число соотношений; в игре «шаг и лифт» — 2.', en: 'A rule is a route on the map, the order of moves matters. The least number of relations; in “step and lift” it is 2.' } },
            { name: { ru: 'Бухгалтер', en: 'Accountant' }, text: { ru: 'Правило — запись в книге, порядок ходов не помнится. Наименьшее число образующих модуля соотношений; в той же игре — 1.', en: 'A rule is a ledger entry, the order of moves is not remembered. The least number of generators of the relation module; in the same game it is 1.' } },
          ],
        },
        faq: [
          { q: { ru: 'Разрыв соотношений — что это?', en: 'What is a relation gap?' }, a: { ru: 'Ситуация, когда наименьшее число соотношений группы больше наименьшего числа образующих её модуля соотношений.', en: 'When a group’s least number of relations exceeds the least number of generators of its relation module.' } },
          { q: { ru: 'Кто поставил этот вопрос?', en: 'Who posed this question?' }, a: { ru: 'Карл Грюнберг в 1976 году; в 1979 году вопрос вошёл в список задач Уолла.', en: 'Karl Gruenberg in 1976; in 1979 it entered Wall’s problem list.' } },
        ],
        source: { url: 'https://arxiv.org/abs/2610.23637', label: { ru: 'arXiv 2610.23637: Two-generator presentations with a relation gap', en: 'arXiv 2610.23637: Two-generator presentations with a relation gap' } },
        seo: {
          title: { ru: 'Разрыв соотношений (relation gap): что это и как задачу закрыли в 2026 году', en: 'Relation gap: what it is and how the 1976 question was settled in 2026' },
          description: {
            ru: 'Разрыв соотношений: группе нужно больше правил, чем образующих у её модуля соотношений. Вопрос Грюнберга 1976 года закрыла статья arXiv 2610.23637.',
            en: 'Relation gap: a group needs more relations than its relation module needs generators. Gruenberg’s 1976 question was settled by arXiv 2610.23637.',
          },
        },
      },
      {
        slug: 'group-homology',
        name: { ru: 'Гомология', en: 'Homology' },
        aka: { ru: 'первая гомология графа', en: 'first homology of a graph' },
        def: {
          ru: 'Гомология — запись петли числами: сколько раз пройден каждый отрезок вперёд минус сколько раз назад. Порядок обхода при этом теряется: две петли, проходящие те же отрезки в разном порядке, записываются одинаково. В статье про игру «шаг и лифт» модуль соотношений — это первая гомология карты игры (графа Кэли).',
          en: 'Homology is a way to write a loop with numbers: how many times each segment is walked forward minus how many times backward. The order of the walk is lost: two loops passing the same segments in a different order are written the same way. In the paper on the game “step and lift”, the relation module is the first homology of the game map (the Cayley graph).',
        },
        match: { ru: ['гомологи\\p{L}*'], en: ['homology'] },
        related: ['relation-module', 'cayley-graph', 'wall-d2-problem'],
        more: { post: 'relation-gap-how-many-rules', label: { ru: 'Счёт бухгалтера: одна запись', en: 'The accountant’s count: one entry' } },
        faq: [
          { q: { ru: 'Гомология простыми словами?', en: 'Homology in plain words?' }, a: { ru: 'Запись петли числами: сколько раз пройден каждый отрезок вперёд минус сколько раз назад.', en: 'Recording a loop with numbers: how many times each segment is walked forward minus backward.' } },
          { q: { ru: 'Что теряется в гомологии?', en: 'What does homology lose?' }, a: { ru: 'Порядок обхода: две петли по тем же отрезкам в разном порядке записываются одинаково.', en: 'The order of the walk: two loops over the same segments in a different order are recorded the same way.' } },
        ],
        source: { url: 'https://en.wikipedia.org/wiki/Homology_(mathematics)', label: { ru: 'Википедия (англ.): Homology (mathematics)', en: 'Wikipedia: Homology (mathematics)' } },
      },
      {
        slug: 'wall-d2-problem',
        name: { ru: 'Задача Уолла D2', en: 'Wall’s D2 problem' },
        aka: { ru: '1965', en: '1965' },
        def: {
          ru: 'Задача Уолла D2 — вопрос Уолла 1965 года: если у трёхмерной фигуры третье измерение не прибавляет ничего к подсчёту «дыр» (такие фигуры называют комплексами D2), можно ли деформировать её в двумерную. Статья arXiv 2610.23637 строит из группы «шаг и лифт» фигуру из шести клеток, добавив одну объёмную клетку: она не сводится к двумерной. Это условный вывод, он опирается на предпринт OpenAI от 6 октября 2026 года; независимой проверки пока не было.',
          en: 'Wall’s D2 problem — wall’s 1965 question: if for a three-dimensional shape the third dimension adds nothing to the count of “holes” (such shapes are called D2 complexes), can it be deformed into a two-dimensional one. The paper arXiv 2610.23637 builds from the group “step and lift” a shape of six cells by attaching one solid cell: it does not reduce to a two-dimensional one. This conclusion is conditional: it rests on an OpenAI preprint of 6 October 2026, and there has been no independent check yet.',
        },
        match: { ru: ['задач\\p{L}* Уолла(?: D2)?', 'комплекс\\p{L}* D2'], en: ['Wall[’\']s D2 problem', 'D2 complex(?:es)?'] },
        related: ['relation-gap', 'group-homology', 'one-relator-group'],
        more: { post: 'relation-gap-how-many-rules', label: { ru: 'Сколько правил нужно, чтобы описать игру: где это встречается', en: 'How many rules does a game need: where it shows up' } },
        faq: [
          { q: { ru: 'Задача Уолла D2 — что это?', en: 'What is Wall’s D2 problem?' }, a: { ru: 'Вопрос Уолла 1965 года: можно ли трёхмерную фигуру, у которой третье измерение не добавляет «дыр», деформировать в двумерную.', en: 'Wall’s 1965 question: can a three-dimensional shape whose third dimension adds no “holes” be deformed into a two-dimensional one.' } },
          { q: { ru: 'Как она связана с разрывом соотношений?', en: 'How is it tied to the relation gap?' }, a: { ru: 'Группа с разрывом соотношений могла бы дать контрпример к задаче D2.', en: 'A group with a relation gap could give a counterexample to the D2 problem.' } },
        ],
        source: { url: 'https://arxiv.org/abs/2610.23637', label: { ru: 'arXiv 2610.23637: следствие B и условие на предпринт OpenAI', en: 'arXiv 2610.23637: Corollary B and its dependence on the OpenAI preprint' } },
      },
      {
        slug: 'gcd',
        name: { ru: 'Наибольший общий делитель', en: 'Greatest common divisor' },
        aka: { ru: 'НОД', en: 'GCD' },
        def: {
          ru: 'Наибольший общий делитель — наибольшее число, на которое делятся оба числа. НОД(3, 2) = 1, и единицу можно собрать из этих чисел сложением и вычитанием: 1 = 3 − 2. Как монеты в 3 и 2 рубля: отдаёшь 3, получаешь сдачей 2, и на руках остаётся 1 рубль. На этом держится построение одной записи вместо двух в игре «шаг и лифт».',
          en: 'The greatest common divisor is the largest number that divides both numbers. GCD(3, 2) = 1, and the number one can be assembled from them by adding and subtracting: 1 = 3 − 2. Like coins of 3 and 2 roubles: you hand over 3, get 2 back in change, and are left with 1 rouble. This is what lets the game “step and lift” get one entry in place of two.',
        },
        match: { ru: ['наибольш\\p{L}+ общ\\p{L}+ делител\\p{L}*', 'НОД'], en: ['greatest common divisors?', 'GCD'] },
        related: ['relation-module', 'relation-gap'],
        more: { post: 'relation-gap-how-many-rules', label: { ru: 'Почему бухгалтеру хватает одной записи: три и два', en: 'Why the accountant needs one entry: three and two' } },
        faq: [
          { q: { ru: 'Наибольший общий делитель — что это?', en: 'What is the greatest common divisor?' }, a: { ru: 'Наибольшее число, на которое делятся оба числа: НОД(3, 2) = 1.', en: 'The largest number that divides both numbers: gcd(3, 2) = 1.' } },
          { q: { ru: 'Как собрать НОД из самих чисел?', en: 'How do you build the gcd from the numbers?' }, a: { ru: 'Сложением и вычитанием: 1 = 3 − 2, как монеты в 3 и 2 рубля со сдачей.', en: 'With addition and subtraction: 1 = 3 − 2, like 3 and 2 coins with change.' } },
        ],
        source: { url: 'https://en.wikipedia.org/wiki/Greatest_common_divisor', label: { ru: 'Википедия (англ.): Greatest common divisor', en: 'Wikipedia: Greatest common divisor' } },
      },
      {
        slug: 'computer-algebra-system',
        name: { ru: 'Система компьютерной алгебры', en: 'Computer algebra system' },
        aka: { ru: 'GAP, Magma', en: 'GAP, Magma' },
        def: {
          ru: 'Система компьютерной алгебры — программа, которая считает с формулами и абстрактными объектами, а не только с числами. В GAP и Magma группы задают ходами и правилами. Группу из статьи arXiv 2610.23637 в GAP задают парой строк: свободная группа на x и t, делённая на два соотношения.',
          en: 'A computer algebra system is a program that calculates with formulas and abstract objects rather than only numbers. In GAP and Magma groups are defined by moves and rules. The group from the paper arXiv 2610.23637 is defined in GAP with a couple of lines: the free group on x and t, divided by two relations.',
        },
        match: { ru: ['систем\\p{L}* компьютерной алгебры'], en: ['computer algebra systems?'] },
        related: ['group-presentation', 'math-group'],
        more: { post: 'relation-gap-how-many-rules', label: { ru: 'Сколько правил нужно, чтобы описать игру: формально', en: 'How many rules does a game need: formally' } },
        notes: {
          title: { ru: 'Группа из статьи в GAP', en: 'The group from the paper in GAP' },
          items: [
            { name: { ru: 'Ходы', en: 'Moves' }, text: { ru: 'F := FreeGroup("x", "t");;  x := F.1;;  t := F.2;;', en: 'F := FreeGroup("x", "t");;  x := F.1;;  t := F.2;;' } },
            { name: { ru: 'Правила', en: 'Rules' }, text: { ru: 'G := F / [ x^6, Comm(x^3, t*x^2*t^-1) ];;', en: 'G := F / [ x^6, Comm(x^3, t*x^2*t^-1) ];;' } },
          ],
        },
        faq: [
          { q: { ru: 'Система компьютерной алгебры — что это?', en: 'What is a computer algebra system?' }, a: { ru: 'Программа, которая считает с формулами и абстрактными объектами, а не только с числами.', en: 'A program that computes with formulas and abstract objects, beyond numbers.' } },
          { q: { ru: 'Какие системы компьютерной алгебры бывают?', en: 'Which computer algebra systems exist?' }, a: { ru: 'Например, GAP и Magma: в них группы задают ходами и правилами.', en: 'For example, GAP and Magma: groups are defined there by moves and rules.' } },
        ],
        source: { url: 'https://www.gap-system.org/', label: { ru: 'gap-system.org — сайт GAP', en: 'gap-system.org, the GAP site' } },
      },
    ],
  },
]

export const ALL_TERMS: Term[] = TERM_SETS.flatMap((s) => s.terms)
export const findTerm = (slug: string | undefined): Term | undefined => ALL_TERMS.find((t) => t.slug === slug)
export const setOfTerm = (slug: string): TermSet => TERM_SETS.find((s) => s.terms.some((t) => t.slug === slug))!
export const glossaryPath = (slug?: string) => `/materials/glossary${slug ? `/${slug}` : ''}`
// На новом языке ссылка ведёт на перевод термина, если он есть, иначе — на английскую страницу
export const termHref = (slug: string, lang: Lang) => withSlash(localHref(glossaryPath(slug), lang))

/** Текст без разметки кода — для подсказок и мета-описаний */
export const noCode = (s: string) => s.replace(/`/g, '')

// Первое предложение определения — подпись в карточках и подсказка у ссылки в тексте
export const termShort = (t: Term, lang: Lang): string => {
  const d = tr(t.def, lang)
  const m = d.match(/^.*?[.!?](?=\s|$)/)
  return m ? m[0] : d
}

// Шаблоны поиска термина в тексте: на новом языке — свои (src/i18n/<язык>/glossary.json, поле match), иначе английские
const matchOf = (t: Term, lang: Lang): string[] => t.match[lang] ?? t.match.en

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
  ALL_TERMS.flatMap((t) => matchOf(t, lang).map((src) => ({ slug: t.slug, src })))
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
  // Панели видов («Иллюстрация», «Структура») ссылаются на термины сами: внутри панели счёт упоминаний свой, после неё возвращается счёт главы
  let divDepth = 0
  let viewDepth = -1
  let outerSeen: Set<string> | null = null
  const out = html.split(/(<[^>]*>)/).map((part) => {
    if (part.startsWith('<')) {
      if (perSection && /^<section[\s>]/i.test(part)) seen = new Set(ignore)
      if (perSection) {
        if (/^<div[\s>]/i.test(part)) {
          if (viewDepth < 0 && /^<div class="bk-view-(?:pic|struct)"/.test(part)) { viewDepth = divDepth; outerSeen = seen; seen = new Set(ignore) }
          divDepth++
        } else if (/^<\/div>/i.test(part)) {
          divDepth--
          if (viewDepth >= 0 && divDepth === viewDepth) { seen = outerSeen ?? seen; viewDepth = -1; outerSeen = null }
        }
      }
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
  if (!ex || text.startsWith(ex)) return slug
  return ALL_TERMS.find((t) => t.exact && text.startsWith(t.exact))?.slug ?? ''
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
  const match = matchOf(term, lang)
  if (!match.length) return false
  const re = new RegExp(`(?<![\\p{L}\\p{N}_.-])(?:${match.join('|')})(?![\\p{L}\\p{N}_-]|\\.(?=\\p{L}))`, term.exact ? 'giu' : 'iu')
  if (!term.exact) return re.test(text)
  for (const m of text.matchAll(re)) if (m[0].startsWith(term.exact)) return true
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
  return ALL_TERMS.find((x) => tr(x.name, lang).toLowerCase() === name.toLowerCase()
    || matchOf(x, lang).some((src) => new RegExp(`^(?:${src})$`, 'iu').test(name)))
}
/** Термины, которые встречаются в статье (для блока «Термины» под текстом) */
export function termsInPost(post: Post): Term[] {
  return ALL_TERMS.filter((t) => hasTerm(t.slug, post.lang, plain(post.html)))
}

/** Другие статьи с теми же терминами: чем больше общих терминов, тем выше */
export function postsSharingTerms(post: Post, slugs: string[], limit = 4): Post[] {
  const score = new Map<Post, number>()
  for (const slug of slugs) for (const p of postsWithTerm(slug, post.lang)) if (p.slug !== post.slug && !post.unrelated?.includes(p.slug)) score.set(p, (score.get(p) ?? 0) + 1)
  return [...score.entries()].sort((a, b) => b[1] - a[1] || b[0].date.localeCompare(a[0].date)).slice(0, limit).map(([p]) => p)
}
