// Мини-игра в статье про харнесс: неделя с агентом, одна и та же ошибка (агент меняет код и не запускает тесты)
// и три сцены рядом: ① промпт (стикер, который нужно клеить самому), ② контекст (папка инструкции, которую модель иногда не открывает),
// ③ харнесс (турникет с тестами между агентом и кодом). HTML статьи вставляется как есть и скрипты в нём не выполняются,
// поэтому игру достраивает этот модуль: контейнер [data-hdd-game] в статье содержит только вводную.
type Mode = 'prompt' | 'context' | 'harness'
type Res = 'caught' | 'clean' | 'shipped' | 'lucky'

const MODES: Mode[] = ['prompt', 'context', 'harness']
const BUGGY = new Set([0, 2, 3]) // в какие дни агент вносит ошибку; тесты ловят её, только если их запустить
const FIX_MIN = 20 // условно: сколько минут уходит на починку ошибки, попавшей в код
const COST = { remind: 3, context: 5, harness: 15 } // условно: минуты на напоминание, на запись инструкции, на сборку хука

const T = {
  ru: {
    title: 'Неделя с агентом',
    days: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт'],
    tasks: ['скидка в оплате', 'поиск по сайту', 'возврат товара', 'профиль', 'отчёты'],
    hint: 'Каждый день агент правит код и не запускает тесты. Жмите «Следующий день».',
    cap: { prompt: ['Промпт', 'вы пишете каждый раз'], context: ['Контекст', 'правило в инструкции'], harness: ['Харнесс', 'хук в среде'] },
    sticker: 'Стикер «запусти тесты»',
    next: 'Следующий день',
    again: 'Ещё неделя',
    me: 'вы', agent: 'агент', code: 'код',
    min: 'мин',
    done: 'Харнесс стоит больше в понедельник, но дальше ни ошибок, ни ваших минут.',
    note: 'Минуты условные.',
    legend: ['тесты прошли', 'тесты поймали ошибку', 'тесты не запускались'],
  },
  en: {
    title: 'A week with the agent',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    tasks: ['checkout discount', 'site search', 'order return', 'profile', 'reports'],
    hint: 'Every day the agent edits code and does not run the tests. Press “Next day”.',
    cap: { prompt: ['Prompt', 'you write it every time'], context: ['Context', 'the rule in instructions'], harness: ['Harness', 'a hook in the environment'] },
    sticker: 'Sticker “run the tests”',
    next: 'Next day',
    again: 'Another week',
    me: 'you', agent: 'agent', code: 'code',
    min: 'min',
    done: 'The harness costs more on Monday, but after that there are no bugs and no minutes from you.',
    note: 'The minutes are illustrative.',
    legend: ['tests passed', 'tests caught a bug', 'tests did not run'],
  },
}

const bugIcon = '<g class="sc-bug"><rect x="-5" y="-6" width="10" height="12" rx="5"/><path d="M-3-6a3-3 0 016 0M-8-2h3M5-2h3M-8 5l3-2M8 5l-3-2"/></g>'
const clockIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>'
const bugSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="8" y="8" width="8" height="11" rx="4"/><path d="M9 8a3 3 0 016 0M4 11h4M16 11h4M5 18l3-2M19 18l-3-2M5 6l3 2M19 6l-3 2"/></svg>'
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!)

interface Lane { results: Res[]; ran: boolean[]; minutes: number }

export function initHddGame(root: HTMLElement): () => void {
  const lang = root.dataset.lang === 'en' ? 'en' : 'ru'
  const t = T[lang]
  const N = t.days.length
  let day = 0
  let sticker = false
  let lanes: Record<Mode, Lane> = { prompt: { results: [], ran: [], minutes: 0 }, context: { results: [], ran: [], minutes: 0 }, harness: { results: [], ran: [], minutes: 0 } }
  let skips = new Set<number>()
  let fresh = false

  // Модель в режиме «контекст» пропускает правило дважды за неделю: один раз в день с ошибкой, чтобы принцип был виден в любой партии
  const rollSkips = () => {
    const buggy = [...BUGGY]
    const other = Array.from({ length: N }, (_, i) => i).filter((i) => i !== buggy[0])
    const a = buggy[Math.floor(Math.random() * buggy.length)]
    const b = other.filter((i) => i !== a)[Math.floor(Math.random() * (N - 1))]
    return new Set([a, b])
  }
  const reset = () => {
    day = 0; sticker = false; fresh = false
    lanes = { prompt: { results: [], ran: [], minutes: 0 }, context: { results: [], ran: [], minutes: 0 }, harness: { results: [], ran: [], minutes: 0 } }
    skips = rollSkips()
  }

  const scene = (m: Mode) => {
    const L = lanes[m]
    const last = L.results[L.results.length - 1] as Res | undefined
    const ran = L.ran[L.ran.length - 1]
    const lamp = last === undefined ? 'off' : ran ? (last === 'caught' ? 'bad' : 'ok') : 'off'
    const shipped = last === 'shipped'
    const pop = fresh ? ' pop' : ''
    // общая часть: вы, агент, код, лампочка тестов
    let s = `<svg viewBox="0 30 300 142" role="img" aria-label="${esc(t.cap[m][0])}">
      <line class="sc-floor" x1="8" y1="146" x2="292" y2="146"/>
      <circle class="sc-me" cx="34" cy="96" r="10"/><path class="sc-me" d="M20 142v-24a14 14 0 0128 0v24z"/><text class="sc-lb" x="34" y="162" text-anchor="middle">${t.me}</text>
      <rect class="sc-agent" x="126" y="92" width="48" height="50" rx="8"/><rect class="sc-agent" x="132" y="68" width="36" height="26" rx="6"/><circle class="sc-eye" cx="142" cy="80" r="3"/><circle class="sc-eye" cx="158" cy="80" r="3"/><text class="sc-lb" x="150" y="162" text-anchor="middle">${t.agent}</text>
      <rect class="sc-code" x="232" y="100" width="52" height="42" rx="6"/><text class="sc-ct" x="258" y="127" text-anchor="middle">&lt;/&gt;</text><text class="sc-lb" x="258" y="162" text-anchor="middle">${t.code}</text>
      <circle class="sc-lamp is-${lamp}${pop}" cx="258" cy="80" r="10"/>
      <line class="sc-arrow" x1="176" y1="118" x2="230" y2="118"/><path class="sc-arrow" d="M224 112l7 6-7 6"/>
      ${shipped ? `<g class="sc-drop${pop}" transform="translate(258 116)">${bugIcon}</g>` : ''}`
    if (m === 'prompt') {
      const said = last !== undefined && ran
      s += said ? `<g class="${pop.trim()}"><rect class="sc-bub" x="14" y="36" width="104" height="24" rx="10"/><text class="sc-bt" x="66" y="52" text-anchor="middle">${t.sticker.replace(/^[^«“]*/, '').replace(/[»”]$/, '') ? '«' + (lang === 'ru' ? 'запусти тесты' : 'run the tests') + '»' : ''}</text></g>` : ''
    }
    if (m === 'context') {
      const open = last !== undefined && ran
      s += `<rect class="sc-fold ${open ? 'is-open' : ''}" x="88" y="116" width="30" height="26" rx="3"/>
        ${open ? '<rect class="sc-page" x="92" y="100" width="22" height="22" rx="2"/><path class="sc-line" d="M96 106h14M96 111h14M96 116h9"/>' : ''}
        ${last !== undefined && !ran ? '<text class="sc-z" x="104" y="108" text-anchor="middle">zzz</text>' : ''}`
    }
    if (m === 'harness') {
      const closed = last === 'caught'
      s += `<rect class="sc-post" x="198" y="102" width="5" height="40" rx="2"/><rect class="sc-post" x="212" y="102" width="5" height="40" rx="2"/>
        <rect class="sc-gate ${closed ? 'is-closed' : ''}" x="198" y="${closed ? 118 : 104}" width="19" height="5" rx="2"/>
        ${closed ? '<path class="sc-back" d="M205 98C190 70 170 66 168 78"/><path class="sc-back" d="M171 72l-4 7 8 1"/>' : ''}`
    }
    return s + '</svg>'
  }

  const render = () => {
    const finished = day >= N
    const dayChips = t.days.map((d, i) => `<span class="hg-d${i < day ? ' done' : i === day ? ' cur' : ''}">${d}</span>`).join('')
    const story = !finished ? `${t.days[day]} · ${t.tasks[day]}` : ''
    const cards = MODES.map((m) => {
      const L = lanes[m]
      const bugs = L.results.filter((r) => r === 'shipped').length
      const press = m === 'prompt' && !finished
        ? `<button type="button" class="hg-stk${sticker ? ' on' : ''}" data-act="sticker" aria-pressed="${sticker}"><span class="hg-note-ic"></span>${t.sticker}</button>` : ''
      return `<div class="hg-sc hg-${m}">
        <div class="hg-ch"><b>${t.cap[m][0]}</b><small>${t.cap[m][1]}</small></div>
        <div class="hg-fig">${scene(m)}</div>
        <div class="hg-foot">${press}<span class="hg-c${bugs ? ' bad' : ''}">${bugSvg}<b>${bugs}</b></span><span class="hg-c">${clockIcon}<b>${L.minutes}</b>${t.min}</span></div>
      </div>`
    }).join('')
    root.innerHTML = `
      <div class="hg-top"><div class="hg-h">${t.title}</div><div class="hg-days">${dayChips}</div></div>
      <p class="hg-hint">${finished ? t.done : t.hint}</p>
      <div class="hg-scenes">${cards}</div>
      <div class="hg-ctl">
        ${finished ? `<button type="button" class="hg-btn" data-act="again">${t.again}</button>` : `<button type="button" class="hg-btn" data-act="next">${t.next}</button><span class="hg-task">${esc(story)}</span>`}
        <span class="hg-lgd"><span><i class="d-ok"></i>${t.legend[0]}</span><span><i class="d-bad"></i>${t.legend[1]}</span><span><i class="d-off"></i>${t.legend[2]}</span></span><span class="hg-leg">${t.note}</span>
      </div>`
  }

  const step = () => {
    if (day >= N) return
    const buggy = BUGGY.has(day)
    const outcome = (ran: boolean): Res => (ran ? (buggy ? 'caught' : 'clean') : buggy ? 'shipped' : 'lucky')
    // ① промпт: тесты запускаются, только если игрок приклеил стикер
    const p = lanes.prompt; const pr = sticker
    p.ran.push(pr); p.results.push(outcome(pr)); if (pr) p.minutes += COST.remind
    // ② контекст: правило записано в понедельник один раз, модель иногда его не открывает
    const c = lanes.context; const cr = !skips.has(day)
    c.ran.push(cr); c.results.push(outcome(cr)); if (day === 0) c.minutes += COST.context
    // ③ харнесс: хук собирают в понедельник, дальше тесты идут сами и возвращают результат агенту
    const h = lanes.harness
    h.ran.push(true); h.results.push(outcome(true)); if (day === 0) h.minutes += COST.harness
    for (const L of [p, c, h]) if (L.results[L.results.length - 1] === 'shipped') L.minutes += FIX_MIN
    sticker = false
    day += 1
    fresh = true
    render()
  }

  const onClick = (e: Event) => {
    const el = (e.target as HTMLElement).closest<HTMLElement>('[data-act]')
    if (!el || !root.contains(el)) return
    const a = el.dataset.act
    if (a === 'next') step()
    else if (a === 'again') { reset(); render() }
    else if (a === 'sticker') { sticker = !sticker; fresh = false; render() }
  }
  root.addEventListener('click', onClick)
  root.classList.add('is-live')
  reset()
  render()
  return () => root.removeEventListener('click', onClick)
}
