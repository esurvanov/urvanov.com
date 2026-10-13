// Общий словарь цветов для всей инфографики сайта: глоссарий, посты блога, встраиваемые схемы.
// Один цвет = одно значение везде, легенда под схемой берёт подписи отсюда.
// Цвета — переменные сайта, поэтому схемы подстраиваются под светлую и тёмную тему.

export type Lang = 'ru' | 'en'

/** серое: модель, люди, внешние системы и данные */
export const M = 'var(--muted)'
/** синее: агент и его харнесс (инструменты, проверки, правила, MCP) */
export const A = 'var(--accent)'
/** оранжевое: риск, стоп, граница (ошибка, песочница, эскалация) */
export const W = 'var(--warn)'
/** фон плиток пола */
export const S2 = 'var(--surface-2)'
/** светлая подложка под кабелем MCP, разъёмами, плашками и пузырями: отделяет деталь от того, что под ней */
export const HALO = '#fffdf7'

/** Цвет по роли: рисуя схему, выбирайте роль, а не оттенок */
export const ROLE = { model: M, human: M, data: M, agent: A, harness: A, risk: W } as const

/** Подписи легенды: [цвет, ru, en] */
export const LEGEND: [string, string, string][] = [
  [M, 'модель, люди, системы, данные', 'model, people, systems, data'],
  [A, 'агент и харнесс', 'agent and harness'],
  [W, 'риск, стоп, граница', 'risk, stop, boundary'],
]

export const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
export const f = (n: number) => n.toFixed(1)
