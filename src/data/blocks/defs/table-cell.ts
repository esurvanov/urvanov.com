import { attr, color, defineBlock } from '../core'

// Мелочи для ячеек и строк таблицы <b-table>: подпись под значением, цитата курсивом, строка-группа с цветной меткой
export default [
  defineBlock({
    tag: 'cell-sub',
    title: 'Подпись в ячейке',
    doc: 'Мелкая серая строка под значением ячейки: проект и автор.',
    render: ({ children }) => `<small class="bk-cell-sub">${children.trim()}</small>`,
    example: {
      ru: '<b-table>\n| Тема | Проектов |\n|---|---|\n| Продажи <b-cell-sub>Pitch library · Elif Demir</b-cell-sub> | 11 |\n</b-table>',
      en: '<b-table>\n| Topic | Projects |\n|---|---|\n| Sales <b-cell-sub>Pitch library · Elif Demir</b-cell-sub> | 11 |\n</b-table>',
    },
  }),
  defineBlock({
    tag: 'cell-quote',
    title: 'Цитата в ячейке',
    doc: 'Текст ячейки курсивом цветом основного текста: вопрос или реплика.',
    render: ({ children }) => `<span class="bk-cell-q">${children.trim()}</span>`,
    example: {
      ru: '<b-table>\n| Тема | Вопрос автору |\n|---|---|\n| Онбординг | <b-cell-quote>«Какие вопросы новичков модель уже закрывает без вас?»</b-cell-quote> |\n</b-table>',
      en: '<b-table>\n| Topic | Question for the author |\n|---|---|\n| Onboarding | <b-cell-quote>“Which newcomer questions does the model already cover?”</b-cell-quote> |\n</b-table>',
    },
  }),
  defineBlock({
    tag: 'table-group',
    title: 'Строка-группа',
    doc: 'Строка-заголовок группы внутри HTML-таблицы: цветной квадратик и подпись капсом.',
    attrs: { color: { doc: 'цвет квадратика', required: true }, span: { doc: 'сколько колонок занимает', required: true } },
    render: ({ attrs, children }) => `<tr class="bk-grp"><td colspan="${attr(attrs.span)}"><i style="background:${color(attrs.color)}"></i>${children.trim()}</td></tr>`,
    example: {
      ru: '<b-table>\n<table><thead><tr><th>Команда</th><th class="bk-r">%</th></tr></thead><tbody>\n<b-table-group color="d-week" span="2">Сильные · источник сценариев</b-table-group>\n<tr><td>Команда A</td><td class="bk-r">74%</td></tr>\n</tbody></table>\n</b-table>',
      en: '<b-table>\n<table><thead><tr><th>Team</th><th class="bk-r">%</th></tr></thead><tbody>\n<b-table-group color="d-week" span="2">Strong · source of scenarios</b-table-group>\n<tr><td>Team A</td><td class="bk-r">74%</td></tr>\n</tbody></table>\n</b-table>',
    },
  }),
]
