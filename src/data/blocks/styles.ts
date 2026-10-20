// Стили библиотеки блоков: общая основа и по файлу на блок (./defs/<блок>.css) — новый файл подключается сам.
// Подключаются в main.tsx после старых стилей серий (rich-post*.css)
import './base.css'

import.meta.glob('./defs/*.css', { eager: true })
