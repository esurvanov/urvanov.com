# Presentation

React-приложение для доклада на Podlodka про Spec-Driven Development.

## Стек

- **Vite 8 + React 19 + TypeScript 6** — основа
- **react-router-dom** — роутинг между слайдами (`/slide/:index`)
- **framer-motion** — анимации (готово к использованию в слайдах)
- **shiki** — подсветка кода (runtime, с автозагрузкой языков)
- **qrcode.react** — QR-код для подключения аудитории к Telegram-боту

## Запуск

```bash
cd presentation
npm install
npm run dev       # dev-server на http://localhost:5173/
npm run build     # → dist/
npm run preview   # локальный preview билда
```

## Проверки перед выкладкой

Сначала `npm run build`, затем проверки собранного `dist/`. Каждая печатает короткий отчёт и завершается с ошибкой, если нашла проблему. Эталон — сборка сайта до правок (`--base <dir>` или переменная `BASELINE_DIST`). Любую из проверок можно сузить: `-- --only /blog/`.

| Команда | Что проверяет | Время |
|---|---|---|
| `npm run check:text` | Для поисковиков ничего не поменялось: title, description, canonical, hreflang, robots, meta, JSON-LD, заголовки h1–h4, видимый текст, alt картинок, внутренние ссылки; sitemap, robots.txt, llms.txt, rss.xml, markdown-копии постов. Даты изменения не сравниваются (`--dates`, чтобы включить) | ~1 с |
| `npm run check:layout` | Вёрстка в headless Chrome на 1280 и 390 px, все страницы sitemap и витрина блоков: всплывающие подсказки на виду без наведения, ссылки с двумя значками и стрелка в кнопках, горизонтальная прокрутка, текст, обрезанный контейнером, ошибки в консоли. Эталон не нужен; `--dist <dir>` проверит другую сборку | ~2,5 мин |
| `npm run check:visual` | Скриншоты постов (и витрины) из эталона и текущей сборки, доля изменённых пикселей. Порог — `--threshold 0.1` (%), картинки разницы — в `node_modules/.cache/site-checks/visual` (или `--out <dir>`). `--theme dark` — в тёмной теме, `--widths 1280` — одна ширина | ~5 мин |
| `npm run check:states` | Состояния интерактивов, которых нет на снимке по умолчанию: щелчок по каждой вкладке и переключателю вида (снимок страницы), наведение на источники, подсказки и ссылки-карточки (снимок окна). Цели берутся из текущей сборки, в эталоне щелчок и наведение — в ту же точку, поэтому сначала должен пройти `check:visual`. Ширина — `--widths 1280` по умолчанию | ~15 мин |

Когда запускать: `check:text` и `check:visual` — после любой переделки разметки постов или общих стилей (отличия должны быть только там, где их ждёшь); `check:layout` — перед каждой выкладкой. Chrome берётся из `/Applications/Google Chrome.app`, другой путь — через `CHROME_PATH`.

## Аналитика

Яндекс Метрика и GA4: клики, интерес к секциям, прокрутка, время в играх. Список событий и что настроить в интерфейсах — [docs/analytics.md](docs/analytics.md).

## Клавиши управления презентацией

| Клавиша | Действие |
|---|---|
| `→` / `↓` / `Space` / `PgDn` | Следующий слайд |
| `←` / `↑` / `PgUp` | Предыдущий слайд |
| `Home` | Первый слайд |
| `End` | Последний слайд |
| `F` | Полноэкранный режим |
| `P` | Открыть окно presenter-mode |
| `R` | Сброс таймера (в presenter-mode) |

## Structure

```
src/
├── App.tsx                       # роуты: /, /slide/:index, /presenter
├── main.tsx                      # bootstrap + BrowserRouter
├── components/
│   ├── SlideView.tsx             # главное окно — текущий слайд + футер
│   ├── PresenterView.tsx         # окно спикера: current + next + notes + timer
│   ├── SectionIntermission.tsx   # переход между разделами (большая цифра)
│   ├── SlideErrorBoundary.tsx    # изоляция ошибок рендера слайда
│   ├── CodeBlock.tsx             # подсветка через shiki
│   ├── QRSlide.tsx               # QR-код + описание (для воркшопа)
│   ├── Quote.tsx                 # цитата с автором
│   ├── Timer.tsx                 # MM:SS таймер спикера
│   └── Progress.tsx              # N/M + progress bar
├── data/
│   ├── slides.ts                 # реестр слайдов в порядке показа
│   └── config.ts                 # botUsername, botUrl, названия
├── hooks/
│   ├── useKeyboardNavigation.ts  # keyboard handler + fullscreen
│   └── useSlideChannel.ts        # BroadcastChannel sync главное ↔ presenter
├── slides/
│   ├── SlideCover.tsx
│   ├── section1-industry/        # слайды раздела «Индустрия»
│   ├── section2-theory/          # слайды раздела «Проблема→теория→решение»
│   └── section3-workshop/        # слайды раздела «Воркшоп»
├── styles/
│   └── theme.css                 # тёмная тема, размеры для проектора
└── types/
    └── slide.ts                  # SlideMeta, SlideEntry, SECTION_TITLES
```

## Как добавить слайд

1. Создать файл `src/slides/sectionN-*/SlideMyNew.tsx`:

```tsx
import type { SlideMeta } from '@/types/slide'

export const meta: SlideMeta = {
  id: 'my-new',
  title: 'Новый слайд',
  section: 2,
  notes: 'Заметки для спикера — что рассказывать голосом.',
}

export default function SlideMyNew() {
  return (
    <div className="slide-container">
      <h1>Заголовок</h1>
      <p>Контент</p>
    </div>
  )
}
```

2. Добавить в `src/data/slides.ts` в нужной позиции:

```ts
import SlideMyNew, { meta as metaMyNew } from '@/slides/section2-theory/SlideMyNew'

export const slides: SlideEntry[] = [
  // ...
  { meta: metaMyNew, Component: SlideMyNew },
  // ...
]
```

## Presenter mode

Нажми `P` на главном окне — откроется второе окно с dashboard спикера:
- превью текущего и следующего слайда
- speaker notes (из `meta.notes`)
- таймер (сброс по `R`)
- прогресс `N/M`

Синхронизация через BroadcastChannel API (fallback на localStorage).

## Конфигурация бота воркшопа

Имя Telegram-бота и URL — в `src/data/config.ts`:

```ts
export const config = {
  botUsername: 'podlodka_demo_bot',
  botUrl: 'https://t.me/podlodka_demo_bot',
  // ...
}
```

Изменить перед прогоном, если бот будет другой.

## Fallback-стратегии для доклада

1. **Основной:** `npm run dev` локально с ноутбука спикера
2. **Backup:** `npm run build` + Vercel/Netlify deploy для доступа через интернет
3. **Last resort:** экспорт PDF через браузер (`Ctrl+P` → Save as PDF) прямо из `dist/`

## OpenSpec change

Этот проект реализован по change `talk-presentation-app` в `../openspec/changes/`. См. `proposal.md`, `design.md`, `specs/`, `tasks.md` для полной спецификации.
