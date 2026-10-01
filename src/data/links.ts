import type { Lang } from '@/lib/i18n'

export interface LinkItem {
  url: string
  label: string
  comment?: string
  // Английский вариант: подставляется вместо русского, если задан
  en?: { label?: string; comment?: string }
  // Координаты для карты (чаты по городам)
  lat?: number
  lon?: number
}

// cards — карточки с подписью, list — строки, pills — короткие «таблетки»
export type BlockVariant = 'cards' | 'list' | 'pills'

export interface LinkBlock {
  title?: string
  titleEn?: string
  variant: BlockVariant
  items: LinkItem[]
}

export interface LinkGroup {
  title: string
  titleEn: string
  blocks: LinkBlock[]
}

export const itemText = (item: LinkItem, lang: Lang) => ({
  label: (lang === 'en' && item.en?.label) || item.label,
  comment: lang === 'en' && item.en && 'comment' in item.en ? item.en.comment : item.comment,
})

const LI = 'https://www.linkedin.com/in/eurvanov/'

export const LINK_GROUPS: LinkGroup[] = [
  {
    title: 'Jaiora',
    titleEn: 'Jaiora',
    blocks: [
      {
        variant: 'cards',
        items: [{ url: 'https://jaiora.me/', label: 'Jaiora', comment: 'Оффлайн-LinkedIn · чаты · встречи', en: { comment: 'Offline LinkedIn · chats · meetups' } }],
      },
    ],
  },
  {
    title: 'Обо мне',
    titleEn: 'About me',
    blocks: [
      {
        title: 'Профили',
        titleEn: 'Profiles',
        variant: 'cards',
        items: [
          { url: LI, label: 'LinkedIn', comment: 'CTO · AI' },
          { url: 'https://ru.stackoverflow.com/users/188116/eurvanov', label: 'Stack Overflow', comment: '10 256 репутации · 10+ лет', en: { comment: '10,256 reputation · 10+ years' } },
          { url: 'https://github.com/esurvanov/', label: 'GitHub', comment: '100+ звёзд', en: { comment: '100+ stars' } },
          { url: 'https://getmentor.dev/mentor/egor-urvanov-1077', label: 'GetMentor', comment: 'Топ-1 ментор · 1500+ часов', en: { comment: 'Top-1 mentor · 1,500+ hours' } },
          { url: 'https://t.me/eurvanov', label: 'Telegram' },
          { url: 'https://vk.com/eurvanov', label: 'VK' },
        ],
      },
      {
        title: 'В LinkedIn подробнее',
        titleEn: 'More on LinkedIn',
        variant: 'pills',
        items: [
          { url: LI + 'details/certifications/', label: 'Сертификаты', en: { label: 'Certifications' } },
          { url: LI + 'details/projects/', label: 'Проекты', en: { label: 'Projects' } },
          { url: LI + 'details/recommendations/?detailScreenTabIndex=0', label: 'Рекомендации', en: { label: 'Recommendations' } },
          { url: LI + 'details/honors/', label: 'Достижения', en: { label: 'Honors' } },
        ],
      },
      {
        title: 'Проекты и достижения',
        titleEn: 'Projects and achievements',
        variant: 'list',
        items: [
          { url: 'https://arxiv.org/abs/2502.13266v1', label: 'ArXiv · ML-подход для кубика Рубика', comment: 'Превзошли SOTA для 3×3×3, впервые решили 4×4×4 и 5×5×5', en: { label: 'ArXiv · ML approach to the Rubik’s cube', comment: 'Beat SOTA on 3×3×3, first to solve 4×4×4 and 5×5×5' } },
          { url: 'https://www.hackerrank.com/contests/projecteuler/leaderboard', label: 'HackerRank · Project Euler+', comment: '6-е место из ≈256 000 · все 254 задачи на полный балл', en: { comment: '6th of ≈256,000 · full score on all 254 problems' } },
          { url: 'https://github.com/esurvanov/project-euler', label: 'GitHub · решения Project Euler+', comment: 'Код решений на C++', en: { label: 'GitHub · Project Euler+ solutions', comment: 'Solution code in C++' } },
          { url: 'https://www.urvanov.com/methods-lab/', label: 'Мастерская методов', comment: '60 приёмов из этих задач в 3D', en: { label: 'Methods workshop', comment: '60 methods from these problems in 3D' } },
          { url: 'https://t.me/parsing_conf/', label: 'Conference on Internet Data Mining', comment: 'Организатор · 1000 человек', en: { comment: 'Organizer · 1,000 people' } },
          { url: LI + 'details/honors/', label: 'Best Onboarding Manager · Sbermarket', comment: '2021–2022' },
          { url: LI + 'details/honors/', label: 'Winner · Self-driving cars competition', comment: '2021 · Fless' },
          { url: LI + 'details/honors/', label: 'Data Mining section · ODS.ai', comment: 'Организатор · 30 000 человек', en: { comment: 'Organizer · 30,000 people' } },
          { url: LI + 'details/honors/', label: 'Winner · Rosbank credit card forecast', comment: '2018 · МГУ', en: { comment: '2018 · MSU' } },
          { url: LI + 'details/honors/', label: 'Winner · Uralsib bank churn prediction', comment: '2017 · Sputnik.ru' },
          { url: LI + 'details/projects/', label: 'Fabrika.cloud · CAD model evaluation system', comment: '2020 – настоящее время', en: { comment: '2020 – present' } },
          { url: LI, label: 'Волонтёр · Кашировская коррекционная школа', comment: '2014–2016 · программирование и математика для детей', en: { label: 'Volunteer · Kashira correctional school', comment: '2014–2016 · programming and math for kids' } },
        ],
      },
      {
        title: 'Образование',
        titleEn: 'Education',
        variant: 'list',
        items: [
          { url: LI, label: 'МГУ · Machine Learning', comment: '2018–2019 · ВМК', en: { label: 'MSU · Machine Learning', comment: '2018–2019 · Faculty of CMC' } },
          { url: LI, label: 'НМУ · Математика', comment: '2014', en: { label: 'Independent University of Moscow · Mathematics' } },
          { url: LI, label: 'МАИ · Математика и информатика', comment: 'Магистр · 2012–2018', en: { label: 'MAI · Mathematics and Computer Science', comment: 'Master’s · 2012–2018' } },
        ],
      },
    ],
  },
  {
    title: 'Выступления',
    titleEn: 'Talks',
    blocks: [
      {
        variant: 'list',
        items: [
          { url: 'https://slideslive.com/39049529/a-machine-learning-approach-that-beats-rubiks-cubes', label: 'NeurIPS · A machine learning approach that beats Rubik’s cubes', comment: 'Запись доклада по статье · 12 авторов', en: { comment: 'Talk recording · 12 authors' } },
          { url: 'https://ysnit.mave.digital/ep-40', label: 'Подкаст · Знай и Умей ИТ', comment: 'Страх кода, event storming и будущее с ИИ', en: { label: 'Podcast · Znai i Umei IT (in Russian)', comment: 'Fear of code, event storming and the future with AI' } },
          { url: 'https://www.youtube.com/watch?v=ycjmtkwQf8E', label: 'YouTube · SDD фреймворки для детерминированной AI разработки', en: { label: 'YouTube · SDD frameworks for deterministic AI development (in Russian)' } },
          { url: 'https://www.youtube.com/watch?v=O8VbhnRUyJQ', label: 'YouTube · Рождённые копипастить: LLM-подходы и паттерны', en: { label: 'YouTube · Born to copy-paste: LLM approaches and patterns (in Russian)' } },
          { url: 'https://www.youtube.com/watch?v=NqMS-UOU0os', label: 'YouTube · Модификация Event Storming для использования в команде', en: { label: 'YouTube · Adapting Event Storming for teams (in Russian)' } },
          { url: 'https://www.youtube.com/watch?v=F5dOtAwmpMQ', label: 'YouTube · Интеграционные тесты на Go', comment: 'Golang Meetup 2022', en: { label: 'YouTube · Integration tests in Go (in Russian)' } },
          { url: 'https://www.youtube.com/watch?v=bHewQCWJE2g', label: 'YouTube · Transformers for Cayley', comment: 'ML для кубика Рубика', en: { comment: 'ML for the Rubik’s cube' } },
          { url: 'https://www.youtube.com/watch?v=V_bRcl6EjFk', label: 'YouTube · Golang by Rebrain. Сбор данных в интернете', en: { label: 'YouTube · Golang by Rebrain. Web data collection (in Russian)' } },
          { url: 'https://www.youtube.com/watch?v=1LobFwBLel8', label: 'YouTube · Очумелые ручки беспилотников', comment: 'Битва дата саентистов', en: { label: 'YouTube · Crazy hands of drones (in Russian)', comment: 'Data scientists’ battle' } },
          { url: 'https://www.linkedin.com/feed/update/urn:li:activity:7198977579297456128/', label: 'LinkedIn · Публикация', en: { label: 'LinkedIn · Post' } },
        ],
      },
    ],
  },
  {
    title: 'Телеграм-каналы',
    titleEn: 'Telegram channels',
    blocks: [
      {
        variant: 'list',
        items: [
          { url: 'https://t.me/tales_from_it', label: 'Tales from IT', comment: '@tales_from_it' },
          { url: 'https://t.me/man_and_business', label: 'Человек и бизнес', comment: '@man_and_business', en: { label: 'People and Business' } },
          { url: 'https://t.me/want_to_it', label: 'Want to IT', comment: '@want_to_it' },
        ],
      },
    ],
  },
]

export const CITY_CHATS: LinkItem[] = [
  { url: 'https://t.me/batumi_it_digital', label: 'Батуми', en: { label: 'Batumi' }, lat: 41.64, lon: 41.64 },
  { url: 'https://t.me/it_danang', label: 'Дананг', en: { label: 'Da Nang' }, lat: 16.05, lon: 108.22 },
  { url: 'https://t.me/bangkok_it', label: 'Бангкок', en: { label: 'Bangkok' }, lat: 13.76, lon: 100.5 },
  { url: 'https://t.me/bali_digital_it', label: 'Бали', en: { label: 'Bali' }, lat: -8.41, lon: 115.19 },
  { url: 'https://t.me/phuket_digital_it', label: 'Пхукет', en: { label: 'Phuket' }, lat: 7.88, lon: 98.39 },
  { url: 'https://t.me/almati_it', label: 'Алматы', en: { label: 'Almaty' }, lat: 43.24, lon: 76.89 },
  { url: 'https://t.me/spb_digital_it', label: 'Санкт-Петербург', en: { label: 'Saint Petersburg' }, lat: 59.93, lon: 30.32 },
  { url: 'https://t.me/antalia_it', label: 'Анталья', en: { label: 'Antalya' }, lat: 36.9, lon: 30.71 },
  { url: 'https://t.me/moscow_digital_it', label: 'Москва', en: { label: 'Moscow' }, lat: 55.75, lon: 37.62 },
  { url: 'https://t.me/belgrade_jaiora', label: 'Белград', en: { label: 'Belgrade' }, lat: 44.79, lon: 20.45 },
  { url: 'https://t.me/erevan_jaiora', label: 'Ереван', en: { label: 'Yerevan' }, lat: 40.18, lon: 44.51 },
]

// Чаты по темам — показываются на странице Jaiora
export const THEME_CHATS: LinkItem[] = [
  { url: 'https://t.me/agent_coding', label: 'Агент-кодинг', en: { label: 'Agent coding' } },
  { url: 'https://t.me/ptd_vnzh_georgia', label: 'ПТД и ВНЖ', en: { label: 'Residency in Georgia' } },
  { url: 'https://t.me/customer_success_team', label: 'Customer Success Team' },
  { url: 'https://t.me/digital_nomads_asia', label: 'Digital Nomads Asia' },
  { url: 'https://t.me/danang_it_channel', label: 'Анонсы Дананга', en: { label: 'Da Nang announcements' } },
]
