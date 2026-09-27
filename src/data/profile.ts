import type { L } from '@/lib/i18n'
import { CITY_CHATS } from '@/data/links'

// Факты о Егоре, проверенные и зафиксированные владельцем сайта.
// Переиспользуются на главной (HomeView), в llms.txt и в JSON-LD Person (scripts/lib.mjs — держать в согласии при правках).
export const CURRENT_ROLE: L = { ru: 'CTO в iGaming-компании (NDA), SaaS-платформе клиентской поддержки', en: 'CTO at an iGaming company (NDA), a SaaS customer support platform' }
export const CITIES: L = { ru: 'Батуми, Дананг и Бангкок', en: 'Batumi, Da Nang, and Bangkok' }
export const TOPICS: L<string[]> = {
  ru: ['AI-разработка', 'управление командами', 'нетворкинг', 'Python', 'Go', 'экосистема Telegram'],
  en: ['AI development', 'team management', 'networking', 'Python', 'Go', 'the Telegram ecosystem'],
}

const cityCount = CITY_CHATS.length

// 2–3 предложения фактов: работа, города, темы, Jaiora. Видны и людям (главная), и ботам.
export const BIO: L = {
  ru: `${CURRENT_ROLE.ru}: ${TOPICS.ru.join(', ')}. Живёт между городами ${CITIES.ru}. Основатель Jaiora — сообщества нетворкинга, которое уже объединяет 10 000 человек в ${cityCount} городах, а к 2027 году должно вырасти до 30 городов и 30 000 участников.`,
  en: `${CURRENT_ROLE.en}: ${TOPICS.en.join(', ')}. Lives between ${CITIES.en}. Founder of Jaiora, a networking community that already brings together 10,000 people across ${cityCount} cities, aiming to grow to 30 cities and 30,000 members by 2027.`,
}
