import type { L } from '@/lib/i18n'

export interface Milestone {
  years: L
  role: string
  org: L
  url?: string
  facts: L[]
  links?: { label: L; url: string }[]
}

// Абзац под именем на /about — та же мысль, что и BIO на главной, но подробнее (для страницы профиля)
export const ABOUT_LEAD: L = {
  ru: 'CTO, машинное обучение и AI-разработка. Менторю инженеров, выступаю, собираю людей в Jaiora.',
  en: 'CTO, machine learning and AI development. I mentor engineers, speak at events, and bring people together in Jaiora.',
}

// Вехи карьеры — источник и для страницы «Обо мне», и для llms-full.txt (prerender.mjs)
export const MILESTONES: Milestone[] = [
  { years: { ru: '2026 — сейчас', en: '2026 — present' }, role: 'Head of AI', org: { ru: 'iGaming-компания (NDA), SaaS-платформа клиентской поддержки', en: 'iGaming company (NDA), a SaaS customer support platform' }, facts: [] },
  { years: { ru: '2024 — 2026', en: '2024 — 2026' }, role: 'CTO', org: { ru: 'iGaming-компания (NDA), SaaS-платформа клиентской поддержки', en: 'iGaming company (NDA), a SaaS customer support platform' }, facts: [
    { ru: 'Время восстановления после сбоя: 5 часов → 2', en: 'Incident recovery time: 5 hours → 2' },
    { ru: 'Выход в прод: 3 месяца → 1,5', en: 'Time to market: 3 months → 1.5' },
    { ru: 'Переход на Scrum + LeSS', en: 'Moved the team to Scrum + LeSS' },
    { ru: 'Смена орг. структуры на кросс-функциональную: продуктовые команды', en: 'Restructured into cross-functional product teams' },
    { ru: 'Смена архитектуры', en: 'Rebuilt the architecture' } ] },
  { years: { ru: '2023 — 2024', en: '2023 — 2024' }, role: 'Head of Department', url: 'https://www.linkedin.com/company/18186001/', org: { ru: 'WebPros', en: 'WebPros' }, facts: [
    { ru: 'Руководство отделом разработки', en: 'Led the development department' } ] },
  { years: { ru: '2021 — 2022', en: '2021 — 2022' }, role: 'Head of Development', url: 'https://www.linkedin.com/company/3295154/', org: { ru: 'СберМаркет', en: 'SberMarket' }, facts: [
    { ru: 'Система на 40 000 сотрудников, экономия 170 млн ₽ в год', en: 'A system for 40,000 employees, saving 170 million RUB a year' },
    { ru: 'Маршрутизация сборки для 10 000 магазинов, 12 млн ₽ в год', en: 'Picker routing for 10,000 stores, 12 million RUB a year' },
    { ru: 'Онбординг и OKR в отделе на 200 человек', en: 'Onboarding and OKRs in a 200-person department' } ],
    links: [{ label: { ru: 'Доклад: сбор данных в интернете', en: 'Talk: web data collection (in Russian)' }, url: 'https://www.youtube.com/watch?v=V_bRcl6EjFk' }] },
  { years: { ru: '2019 — 2022', en: '2019 — 2022' }, role: 'Head of Development', url: 'https://www.linkedin.com/company/37829948/', org: { ru: 'Fless', en: 'Fless' }, facts: [
    { ru: 'От 0 до 6 000 пользователей, оборот 25 млн ₽ в год', en: 'From 0 to 6,000 users, 25 million RUB annual turnover' },
    { ru: 'Доступность системы 99,9%, 8 проектов', en: '99.9% uptime, 8 projects delivered' } ],
    links: [{ label: { ru: 'Доклад: очумелые ручки беспилотников', en: 'Talk: crazy hands of drones (in Russian)' }, url: 'https://www.youtube.com/watch?v=1LobFwBLel8' }] },
  { years: { ru: '2019 — 2020', en: '2019 — 2020' }, role: 'Software Engineer', url: 'https://www.linkedin.com/company/164715/', org: { ru: 'Леруа Мерлен', en: 'Leroy Merlin' }, facts: [
    { ru: 'Мониторинг цен конкурентов на 1 000 000 товаров', en: 'Competitor price monitoring for 1,000,000 products' } ] },
  { years: { ru: '2018 — 2019', en: '2018 — 2019' }, role: 'Software Engineer', url: 'https://www.linkedin.com/company/970369/', org: { ru: 'Ozon', en: 'Ozon' }, facts: [
    { ru: 'Переезд расчёта доставки с C# на Go, пропускная способность +250%, нагрузка 3 600 запросов в секунду', en: 'Migrated delivery pricing from C# to Go, throughput +250% at 3,600 requests per second' } ] },
  { years: { ru: '2016 — 2018', en: '2016 — 2018' }, role: 'Software Engineer', url: 'https://www.linkedin.com/company/10116760/', org: { ru: 'Спутник', en: 'Sputnik' }, facts: [
    { ru: 'Поисковый портал, распознавание речи', en: 'Search portal, speech recognition' } ] },
]
