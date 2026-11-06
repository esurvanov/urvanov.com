import katex from 'katex'

// Формулы сайта: одна функция набора для статей блога и для текстов глоссария, чтобы формула везде выглядела одинаково.
// В тексте формула пишется между знаками доллара: $P(w)$ — в строке, $$…$$ — отдельной строкой по центру.
export const renderTex = (tex: string, display: boolean) =>
  katex.renderToString(tex.trim(), { displayMode: display, throwOnError: true, strict: 'error', output: 'htmlAndMathml' })

/** Разбить текст на куски: чётные — обычный текст, нечётные — формулы в строке ($…$).
 *  Цена вроде «$20» формулой не считается: после открывающего знака не может стоять цифра или пробел, перед закрывающим — пробел */
export const splitMath = (text: string): string[] => text.split(/(?<![\\$\w])\$(?![\s\d$])([^$\n]+?)(?<!\s)\$(?!\d)/)
