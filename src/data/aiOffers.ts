import type { L } from '@/lib/i18n'

// Офферы про AI: хаб /ai и по странице на аудиторию. Тексты короткие, без цифр, которых нельзя подтвердить.
export const AI_CONTACT = 'https://t.me/eurvanov'

export type AiGroupId = 'company' | 'roles' | 'personal'

export interface AiOffer {
  slug: string
  group: AiGroupId
  icon: string
  name: L
  short: L
  job: L
  hook: L
  pains: L<string[]>
  outcomes: L<string[]>
  program: L<string[]>
  format: L<string[]>
}

export const AI_GROUPS: { id: AiGroupId; name: L; hint: L }[] = [
  { id: 'personal', name: { ru: 'Один человек', en: 'One person' }, hint: { ru: 'Лично, под вашу работу', en: 'One-on-one, for your job' } },
  { id: 'roles', name: { ru: 'Команда по ролям', en: 'Team by role' }, hint: { ru: 'Обучение под задачи роли', en: 'Training for each role' } },
  { id: 'company', name: { ru: 'Вся компания', en: 'Whole company' }, hint: { ru: 'Внедрение и стратегия', en: 'Rollout and strategy' } },
]

export const AI_OFFERS: AiOffer[] = [
  {
    slug: 'company',
    group: 'company',
    icon: 'CO',
    short: { ru: 'Внедрение в компанию', en: 'Company rollout' },
    job: { ru: 'Внедрить AI так, чтобы был эффект, а не лицензии впустую', en: 'Roll out AI for real impact, not idle licenses' },
    name: { ru: 'Внедрение AI в компанию', en: 'AI adoption for your company' },
    hook: { ru: 'От «все пробуют по-своему» к общему процессу', en: 'From “everyone tries on their own” to one process' },
    pains: {
      ru: ['Лицензии куплены, пользы не видно', 'Каждый работает с AI по-своему', 'Нет правил: данные, качество, безопасность'],
      en: ['Licenses bought, no visible gain', 'Everyone uses AI their own way', 'No rules for data, quality, security'],
    },
    outcomes: {
      ru: ['Карта задач, где AI даёт эффект', 'Общие правила и инструменты', 'Обученные команды', 'Метрики эффекта'],
      en: ['A map of tasks where AI pays off', 'Shared rules and tools', 'Trained teams', 'Impact metrics'],
    },
    program: {
      ru: ['Аудит процессов и задач', 'Пилот на одной команде', 'Правила и инструменты', 'Масштабирование на остальных'],
      en: ['Audit of processes and tasks', 'Pilot with one team', 'Rules and tooling', 'Rollout to the rest'],
    },
    format: { ru: ['Аудит', 'Пилот', 'Сопровождение'], en: ['Audit', 'Pilot', 'Support'] },
  },
  {
    slug: 'executives',
    group: 'company',
    icon: 'CxO',
    short: { ru: 'Топ-менеджер', en: 'Executive' },
    job: { ru: 'Понять, куда вкладываться в AI, а куда нет', en: 'Know where to invest in AI and where not to' },
    name: { ru: 'AI для топ-менеджмента', en: 'AI for executives' },
    hook: { ru: 'Решения про AI без хайпа: куда вкладываться, а куда нет', en: 'AI decisions without the hype: where to invest, where not' },
    pains: {
      ru: ['Непонятно, что реально, а что маркетинг', 'Риск ошибиться с бюджетом и людьми', 'Конкуренты уже что-то запустили'],
      en: ['Unclear what is real and what is marketing', 'Risk of misallocating budget and people', 'Competitors already shipped something'],
    },
    outcomes: {
      ru: ['Стратегия AI на понятном языке', 'Приоритеты и бюджет', 'Список рисков и как их закрыть', 'Свой взгляд, а не пересказ вендоров'],
      en: ['An AI strategy in plain language', 'Priorities and budget', 'Risks and how to close them', 'Your own view, not vendor talk'],
    },
    program: {
      ru: ['Что AI умеет сегодня', 'Где эффект в вашем бизнесе', 'Команда, процессы, риски', 'План на квартал'],
      en: ['What AI can do today', 'Where it pays off in your business', 'Team, processes, risks', 'A quarter plan'],
    },
    format: { ru: ['Сессия 1:1', 'Стратегическая сессия', 'Брифинг для совета'], en: ['1:1 session', 'Strategy session', 'Board briefing'] },
  },
  {
    slug: 'engineers',
    group: 'roles',
    icon: 'ENG',
    short: { ru: 'Инженер', en: 'Engineer' },
    job: { ru: 'Писать код с агентами быстрее и без брака', en: 'Ship code with agents faster and without junk' },
    name: { ru: 'AI-разработка для инженеров', en: 'AI development for engineers' },
    hook: { ru: 'Агенты пишут код, инженер отвечает за результат', en: 'Agents write code, the engineer owns the result' },
    pains: {
      ru: ['AI-код сыроват и ломает соседнее', 'Агент забывает контекст проекта', 'Непонятно, как это ревьюить'],
      en: ['AI code is shaky and breaks neighbors', 'The agent forgets project context', 'Unclear how to review it'],
    },
    outcomes: {
      ru: ['Рабочий процесс с агентом на реальном коде', 'Спеки и харнесс под ваш проект', 'Проверки, которые ловят ошибки агента', 'Скорость без потери качества'],
      en: ['A working agent workflow on real code', 'Specs and a harness for your project', 'Checks that catch agent mistakes', 'Speed without losing quality'],
    },
    program: {
      ru: ['Spec-Driven Development', 'Харнесс: контекст, правила, проверки', 'MCP и инструменты агента', 'Ревью и тесты AI-кода'],
      en: ['Spec-Driven Development', 'Harness: context, rules, checks', 'MCP and agent tooling', 'Reviewing and testing AI code'],
    },
    format: { ru: ['Воркшоп', 'Практика на вашем репозитории', 'Сопровождение'], en: ['Workshop', 'Hands-on in your repo', 'Support'] },
  },
  {
    slug: 'managers',
    group: 'roles',
    icon: 'MGR',
    short: { ru: 'Менеджер', en: 'Manager' },
    job: { ru: 'Снять рутину управления: статусы, планы, требования', en: 'Cut management routine: statuses, plans, requirements' },
    name: { ru: 'AI для менеджеров', en: 'AI for managers' },
    hook: { ru: 'Меньше рутины, больше управления', en: 'Less routine, more managing' },
    pains: {
      ru: ['Время уходит на статусы и отчёты', 'Задачи и требования расплывчаты', 'Непонятно, чем помогает AI в команде'],
      en: ['Time goes into statuses and reports', 'Tasks and requirements are vague', 'Unclear how AI helps the team'],
    },
    outcomes: {
      ru: ['Готовые приёмы на каждый день', 'Чёткие требования и планы быстрее', 'Понимание, как менять процесс команды'],
      en: ['Ready routines for every day', 'Clearer requirements and plans, faster', 'A view on changing the team process'],
    },
    program: {
      ru: ['Постановка задач и требования', 'Планирование, статусы, отчёты', 'Встречи: подготовка и итоги', 'Как вести команду с AI'],
      en: ['Task setting and requirements', 'Planning, statuses, reports', 'Meetings: prep and follow-up', 'Leading a team with AI'],
    },
    format: { ru: ['Воркшоп', 'Разбор ваших задач', 'Шаблоны на руки'], en: ['Workshop', 'Your own tasks', 'Templates to keep'] },
  },
  {
    slug: 'recruiters',
    group: 'roles',
    icon: 'HR',
    short: { ru: 'Рекрутер', en: 'Recruiter' },
    job: { ru: 'Закрывать вакансии быстрее', en: 'Close vacancies faster' },
    name: { ru: 'AI для рекрутеров', en: 'AI for recruiters' },
    hook: { ru: 'Быстрее от вакансии до оффера', en: 'Faster from vacancy to offer' },
    pains: {
      ru: ['Сорсинг съедает дни', 'Сотни однотипных откликов', 'Вакансии и письма пишутся вручную'],
      en: ['Sourcing eats days', 'Hundreds of similar applications', 'Vacancies and messages written by hand'],
    },
    outcomes: {
      ru: ['Сорсинг и скрининг в разы быстрее', 'Сильные вакансии и сообщения', 'Структурные оценки кандидатов'],
      en: ['Much faster sourcing and screening', 'Stronger vacancies and messages', 'Structured candidate assessments'],
    },
    program: {
      ru: ['Профиль вакансии и сорсинг', 'Скрининг резюме', 'Переписка и вакансии', 'Интервью: вопросы и итоги'],
      en: ['Vacancy profile and sourcing', 'Resume screening', 'Messaging and vacancy copy', 'Interviews: questions and summaries'],
    },
    format: { ru: ['Воркшоп', 'Практика на ваших вакансиях', 'Шаблоны на руки'], en: ['Workshop', 'Your own vacancies', 'Templates to keep'] },
  },
  {
    slug: 'marketers',
    group: 'roles',
    icon: 'MKT',
    short: { ru: 'Маркетолог', en: 'Marketer' },
    job: { ru: 'Делать больше контента и гипотез тем же составом', en: 'Produce more content and tests with the same team' },
    name: { ru: 'AI для маркетологов', en: 'AI for marketers' },
    hook: { ru: 'Больше гипотез и контента при том же составе', en: 'More hypotheses and content with the same team' },
    pains: {
      ru: ['Контент съедает бюджет времени', 'Аналитика отчётов вручную', 'Тексты звучат одинаково и «по-AI-шному»'],
      en: ['Content eats the time budget', 'Reports analyzed by hand', 'Copy sounds generic and “AI-ish”'],
    },
    outcomes: {
      ru: ['Контент-процесс с AI и вашим голосом', 'Быстрая аналитика и гипотезы', 'Автоматизация рутины'],
      en: ['A content flow with AI in your voice', 'Faster analytics and hypotheses', 'Routine automated'],
    },
    program: {
      ru: ['Исследование и сегменты', 'Контент и тон бренда', 'Аналитика и отчёты', 'Автоматизация цепочек'],
      en: ['Research and segments', 'Content and brand voice', 'Analytics and reports', 'Automating chains'],
    },
    format: { ru: ['Воркшоп', 'Практика на ваших кампаниях', 'Шаблоны на руки'], en: ['Workshop', 'Your own campaigns', 'Templates to keep'] },
  },
  {
    slug: 'operations',
    group: 'roles',
    icon: 'OPS',
    short: { ru: 'Операционный менеджер', en: 'Operations' },
    job: { ru: 'Автоматизировать повторяющиеся процессы', en: 'Automate repetitive processes' },
    name: { ru: 'AI для операционных менеджеров', en: 'AI for operations managers' },
    hook: { ru: 'Автоматизировать повторяющееся, оставить людям суть', en: 'Automate the repetitive, leave people the substance' },
    pains: {
      ru: ['Ручные процессы и копирование между системами', 'Отчёты собираются часами', 'Ошибки на стыках команд'],
      en: ['Manual processes, copying between systems', 'Reports take hours to assemble', 'Errors at team handoffs'],
    },
    outcomes: {
      ru: ['Список процессов, которые можно автоматизировать', 'Работающие автоматизации', 'Меньше ошибок и ожидания'],
      en: ['A list of processes ready to automate', 'Working automations', 'Fewer errors and less waiting'],
    },
    program: {
      ru: ['Карта процессов', 'Что автоматизировать первым', 'Сборка автоматизаций и агентов', 'Контроль качества и риски'],
      en: ['Process map', 'What to automate first', 'Building automations and agents', 'Quality control and risks'],
    },
    format: { ru: ['Воркшоп', 'Разбор ваших процессов', 'Сопровождение запуска'], en: ['Workshop', 'Your own processes', 'Launch support'] },
  },
  {
    slug: 'personal',
    group: 'personal',
    icon: '1:1',
    short: { ru: 'Личное обучение', en: 'Personal coaching' },
    job: { ru: 'Освоить AI на своих задачах, а не на курсах', en: 'Learn AI on your own tasks, not in courses' },
    name: { ru: 'Личное обучение AI', en: 'Personal AI coaching' },
    hook: { ru: 'Индивидуальная программа под вашу работу', en: 'An individual program for your job' },
    pains: {
      ru: ['Много курсов, мало практики', 'Не понятно, с чего начать', 'Нужен результат на своих задачах'],
      en: ['Many courses, little practice', 'Unclear where to start', 'You need results on your own tasks'],
    },
    outcomes: {
      ru: ['Личный набор приёмов под вашу роль', 'Уверенная работа с AI-инструментами', 'Конкретные задачи, решённые вместе'],
      en: ['A personal toolkit for your role', 'Confident work with AI tools', 'Real tasks solved together'],
    },
    program: {
      ru: ['Разбор вашей работы', 'План обучения', 'Практика на ваших задачах', 'Закрепление и обратная связь'],
      en: ['Review of your work', 'Learning plan', 'Practice on your tasks', 'Follow-up and feedback'],
    },
    format: { ru: ['Сессии 1:1', 'Задания между сессиями', 'Чат поддержки'], en: ['1:1 sessions', 'Homework between sessions', 'Support chat'] },
  },
]

export const aiOfferPath = (slug: string) => `/ai/${slug}`

// Доказательства: только то, что уже опубликовано на сайте (см. data/links.ts, data/profile.ts)
export const AI_PROOF: { value: string; label: L; href: string }[] = [
  { value: 'CTO', label: { ru: 'SaaS-платформа поддержки, iGaming', en: 'SaaS support platform, iGaming' }, href: 'https://www.linkedin.com/in/eurvanov/' },
  { value: '1500+', label: { ru: 'часов менторства, топ-1 на GetMentor', en: 'mentoring hours, top-1 on GetMentor' }, href: 'https://getmentor.dev/mentor/egor-urvanov-1077' },
  { value: '10 000', label: { ru: 'человек в сообществе Jaiora', en: 'people in the Jaiora community' }, href: 'https://jaiora.me/' },
  { value: 'Podlodka', label: { ru: 'доклад про Spec-Driven Development', en: 'talk on Spec-Driven Development' }, href: '/talk/spec-driven-development' },
]
