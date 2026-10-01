// Посадочные страницы интерактивов: текст для поиска и людей. Сам интерактив живёт на отдельном адресе (play)
// и открывается кнопкой; индексируется эта страница, а не холст. Факты — из LABS в seo.ts.
import type { L } from '@/lib/i18n'

export interface LabPage {
  slug: string
  play: string
  name: L<string>
  tagline: L<string>
  description: L<string>      // <meta description>, 140–160 символов
  intro: L<string[]>
  features: L<string[]>
  facts: L<[string, string][]>
}

export const LAB_PAGES: LabPage[] = [
  {
    slug: 'methods-lab',
    play: '/methods-lab/',
    name: { ru: 'Мастерская методов', en: 'Methods workshop' },
    tagline: { ru: '60 приёмов решения задач в 3D, шаг за шагом', en: '60 problem-solving methods in 3D, step by step' },
    description: {
      ru: 'Мастерская методов: 60 приёмов решения математических и алгоритмических задач в 3D, шаг за шагом. На русском и английском, прямо в браузере.',
      en: 'Methods workshop: 60 problem-solving methods from maths and algorithms in step-by-step 3D. In Russian and English, right in the browser.',
    },
    intro: {
      ru: [
        'Шестьдесят приёмов решения математических и алгоритмических задач, каждый показан в 3D и разобран по шагам.',
        'Приёмы собраны из решения задач Project Euler+ на HackerRank, где автор занял 6-е место из примерно 256 000 участников.',
      ],
      en: [
        'Sixty problem-solving methods from maths and algorithms, each shown in 3D and taken step by step.',
        'The methods are drawn from solving Project Euler+ on HackerRank, where the author placed 6th out of about 256,000 participants.',
      ],
    },
    features: {
      ru: ['Для каждого приёма: задача, решение в лоб, что замечаем и как решаем быстрее', 'Наглядное 3D, шаг за шагом', 'Русский и английский интерфейс', 'Работает в браузере, без установки'],
      en: ['For each method: the task, the head-on way, what we notice and how to solve it faster', 'Step-by-step 3D visualisation', 'Russian and English interface', 'Runs in the browser, no installation'],
    },
    facts: {
      ru: [['Приёмов', '60'], ['Формат', '3D в браузере, без установки'], ['Языки', 'русский и английский'], ['Откуда задачи', 'Project Euler+ на HackerRank']],
      en: [['Methods', '60'], ['Format', '3D in the browser, no installation'], ['Languages', 'Russian and English'], ['Where the tasks come from', 'Project Euler+ on HackerRank']],
    },
  },
]

export const labPage = (slug: string) => LAB_PAGES.find((x) => x.slug === slug)
