import type { L } from '@/lib/i18n'

export interface Place {
  name: L
  lat: number
  lon: number
  // Города, где Егор жил и собирал сообщества: выделены на карте и в списке
  key?: boolean
}

// Где бывал Егор
export const PLACES: Place[] = [
  { name: { ru: 'Москва', en: 'Moscow' }, lat: 55.75, lon: 37.62 },
  { name: { ru: 'Санкт-Петербург', en: 'Saint Petersburg' }, lat: 59.93, lon: 30.32 },
  { name: { ru: 'Сочи', en: 'Sochi' }, lat: 43.6, lon: 39.72 },
  { name: { ru: 'Минводы', en: 'Mineralnye Vody' }, lat: 44.21, lon: 43.14 },
  { name: { ru: 'Уфа', en: 'Ufa' }, lat: 54.74, lon: 55.97 },
  { name: { ru: 'Челябинск', en: 'Chelyabinsk' }, lat: 55.16, lon: 61.4 },
  { name: { ru: 'Новосибирск', en: 'Novosibirsk' }, lat: 55.03, lon: 82.92 },
  { name: { ru: 'Рига', en: 'Riga' }, lat: 56.95, lon: 24.11 },
  { name: { ru: 'Таллин', en: 'Tallinn' }, lat: 59.44, lon: 24.75 },
  { name: { ru: 'Батуми', en: 'Batumi' }, lat: 41.64, lon: 41.64, key: true },
  { name: { ru: 'Тбилиси', en: 'Tbilisi' }, lat: 41.72, lon: 44.79 },
  { name: { ru: 'Алматы', en: 'Almaty' }, lat: 43.24, lon: 76.89 },
  { name: { ru: 'Ош', en: 'Osh' }, lat: 40.53, lon: 72.8 },
  { name: { ru: 'Анталья', en: 'Antalya' }, lat: 36.9, lon: 30.71 },
  { name: { ru: 'Каир', en: 'Cairo' }, lat: 30.04, lon: 31.24 },
  { name: { ru: 'Шарм-эль-Шейх', en: 'Sharm El Sheikh' }, lat: 27.91, lon: 34.33 },
  { name: { ru: 'Хургада', en: 'Hurghada' }, lat: 27.26, lon: 33.81 },
  { name: { ru: 'Бангкок', en: 'Bangkok' }, lat: 13.76, lon: 100.5, key: true },
  { name: { ru: 'Паттайя', en: 'Pattaya' }, lat: 12.93, lon: 100.88 },
  { name: { ru: 'Чиангмай', en: 'Chiang Mai' }, lat: 18.79, lon: 98.98 },
  { name: { ru: 'Дананг', en: 'Da Nang' }, lat: 16.05, lon: 108.22, key: true },
  { name: { ru: 'Сайгон', en: 'Saigon' }, lat: 10.78, lon: 106.7 },
  { name: { ru: 'Бали', en: 'Bali' }, lat: -8.41, lon: 115.19 },
  { name: { ru: 'Шри-Ланка', en: 'Sri Lanka' }, lat: 7.87, lon: 80.77 },
  { name: { ru: 'Варадеро', en: 'Varadero' }, lat: 23.15, lon: -81.29 },
  { name: { ru: 'Сейшелы', en: 'Seychelles' }, lat: -4.68, lon: 55.49 },
]
