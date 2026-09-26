export interface LinkItem {
  url: string
  label: string
  comment?: string
}

// cards — карточки с подписью, list — строки, pills — короткие «таблетки»
export type BlockVariant = 'cards' | 'list' | 'pills'

export interface LinkBlock {
  title?: string
  variant: BlockVariant
  items: LinkItem[]
}

export interface LinkGroup {
  title: string
  blocks: LinkBlock[]
}

const LI = 'https://www.linkedin.com/in/eurvanov/'

export const LINK_GROUPS: LinkGroup[] = [
  {
    title: 'Jaiora',
    blocks: [
      {
        variant: 'cards',
        items: [{ url: '/jaiora', label: 'Jaiora', comment: 'оффлайн-LinkedIn · чаты · встречи' }],
      },
    ],
  },
  {
    title: 'Обо мне',
    blocks: [
      {
        title: 'Профили',
        variant: 'cards',
        items: [
          { url: LI, label: 'LinkedIn', comment: 'CTO · AI' },
          { url: 'https://ru.stackoverflow.com/users/188116/eurvanov', label: 'Stack Overflow', comment: '10 256 репутации · 10+ лет' },
          { url: 'https://github.com/esurvanov/', label: 'GitHub', comment: '100+ звёзд' },
          { url: 'https://getmentor.dev/mentor/egor-urvanov-1077', label: 'GetMentor', comment: 'топ-1 ментор · 1500+ часов' },
          { url: 'https://t.me/eurvanov', label: 'Telegram' },
          { url: 'https://vk.com/eurvanov', label: 'VK' },
        ],
      },
      {
        title: 'В LinkedIn подробнее',
        variant: 'pills',
        items: [
          { url: LI + 'details/certifications/', label: 'Сертификаты' },
          { url: LI + 'details/projects/', label: 'Проекты' },
          { url: LI + 'details/recommendations/?detailScreenTabIndex=0', label: 'Рекомендации' },
          { url: LI + 'details/honors/', label: 'Достижения' },
        ],
      },
      {
        title: 'Проекты и достижения',
        variant: 'list',
        items: [
          { url: 'https://arxiv.org/abs/2502.13266v1', label: 'ArXiv · ML-подход для кубика Рубика', comment: 'превзошли SOTA для 3×3×3, впервые решили 4×4×4 и 5×5×5' },
          { url: 'https://t.me/parsing_conf/', label: 'Conference on Internet Data Mining', comment: 'организатор · 1000 человек' },
          { url: LI + 'details/honors/', label: 'Best Onboarding Manager · Sbermarket', comment: '2021–2022' },
          { url: LI + 'details/honors/', label: 'Winner · Self-driving cars competition', comment: '2021 · Fless' },
          { url: LI + 'details/honors/', label: 'Data Mining section · ODS.ai', comment: 'организатор · 30 000 человек' },
          { url: LI + 'details/honors/', label: 'Winner · Rosbank credit card forecast', comment: '2018 · МГУ' },
          { url: LI + 'details/honors/', label: 'Winner · Uralsib bank churn prediction', comment: '2017 · Sputnik.ru' },
          { url: LI + 'details/projects/', label: 'Fabrika.cloud · CAD model evaluation system', comment: '2020 – настоящее время' },
          { url: LI, label: 'Волонтёр · Кашировская коррекционная школа', comment: '2014–2016 · программирование и математика для детей' },
        ],
      },
      {
        title: 'Образование',
        variant: 'list',
        items: [
          { url: LI, label: 'МГУ · Machine Learning', comment: '2018–2019 · ВМК' },
          { url: LI, label: 'НМУ · Математика', comment: '2014' },
          { url: LI, label: 'МАИ · Математика и информатика', comment: 'магистр · 2012–2018' },
        ],
      },
    ],
  },
  {
    title: 'Выступления',
    blocks: [
      {
        variant: 'list',
        items: [
          { url: 'https://ysnit.mave.digital/ep-40', label: 'Подкаст · Знай и Умей ИТ', comment: 'страх кода, event storming и будущее с ИИ' },
          { url: 'https://www.youtube.com/watch?v=ycjmtkwQf8E', label: 'YouTube · SDD фреймворки для детерминированной AI разработки' },
          { url: 'https://www.youtube.com/watch?v=O8VbhnRUyJQ', label: 'YouTube · Рождённые копипастить: LLM-подходы и паттерны' },
          { url: 'https://www.youtube.com/watch?v=NqMS-UOU0os', label: 'YouTube · Модификация Event Storming для использования в команде' },
          { url: 'https://www.youtube.com/watch?v=F5dOtAwmpMQ', label: 'YouTube · Интеграционные тесты на Go', comment: 'Golang Meetup 2022' },
          { url: 'https://www.youtube.com/watch?v=bHewQCWJE2g', label: 'YouTube · Transformers for Cayley', comment: 'ML для кубика Рубика' },
          { url: 'https://www.youtube.com/watch?v=V_bRcl6EjFk', label: 'YouTube · Golang by Rebrain. Сбор данных в интернете' },
          { url: 'https://www.youtube.com/watch?v=1LobFwBLel8', label: 'YouTube · Очумелые ручки беспилотников', comment: 'Битва дата саентистов' },
          { url: 'https://www.linkedin.com/feed/update/urn:li:activity:7198977579297456128/', label: 'LinkedIn · Публикация' },
        ],
      },
    ],
  },
  {
    title: 'Сообщества',
    blocks: [
      {
        variant: 'pills',
        items: [
          { url: 'https://t.me/tales_from_it', label: 'Tales from IT' },
          { url: 'https://t.me/man_and_business', label: 'Человек и бизнес' },
          { url: 'https://t.me/want_to_it', label: 'Want to IT' },
        ],
      },
    ],
  },
]

export const CITY_CHATS: LinkItem[] = [
  { url: 'https://t.me/batumi_it_digital', label: 'Батуми' },
  { url: 'https://t.me/it_danang', label: 'Дананг' },
  { url: 'https://t.me/bangkok_it', label: 'Бангкок' },
  { url: 'https://t.me/bali_digital_it', label: 'Бали' },
  { url: 'https://t.me/phuket_digital_it', label: 'Пхукет' },
  { url: 'https://t.me/almati_it', label: 'Алматы' },
  { url: 'https://t.me/spb_digital_it', label: 'Санкт-Петербург' },
  { url: 'https://t.me/antalia_it', label: 'Анталья' },
  { url: 'https://t.me/moscow_digital_it', label: 'Москва' },
  { url: 'https://t.me/belgrade_jaiora', label: 'Белград' },
  { url: 'https://t.me/erevan_jaiora', label: 'Ереван' },
]

// Чаты по темам — показываются на странице Jaiora
export const THEME_CHATS: LinkItem[] = [
  { url: 'https://t.me/customer_success_team', label: 'Customer Success Team' },
  { url: 'https://t.me/digital_nomads_asia', label: 'Digital Nomads Asia' },
]
