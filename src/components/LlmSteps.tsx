import { useState } from 'react'
import { LLM_SEQ, termArt } from '@/lib/termArt'
import { useT } from '@/lib/i18n'

// Модель дописывает фразу: каждое нажатие добавляет самое вероятное слово
export default function LlmSteps() {
  const { lang, t } = useT()
  const [step, setStep] = useState(0)
  const art = termArt('llm', lang, step)!
  const q = LLM_SEQ[lang]
  const done = step >= q.picks.length
  const prev = step > 0 ? q.picks[step - 1][0] : null
  return (
    <div className="s-art am">
      <div className="am-bar">
        <button type="button" className="am-btn is-on" disabled={done} onClick={() => setStep(step + 1)}>
          <span aria-hidden>▶</span>{t({ ru: 'Следующее слово', en: 'Next word' })}
        </button>
        <span className="am-sp" />
        <button type="button" className="am-btn" onClick={() => setStep(0)} aria-label={t({ ru: 'Сначала', en: 'Restart' })}><span aria-hidden>↺</span></button>
      </div>
      <div className="am-svg" dangerouslySetInnerHTML={{ __html: art.svg }} />
      <p className="am-info" aria-live="polite">
        {done ? <><b>✓</b>{t({ ru: 'Фраза готова: модель писала её по одному слову', en: 'Done: the model wrote it one word at a time' })}</>
          : prev ? <><b>«{prev[0]}» · {prev[1]}%</b>{t({ ru: 'добавлено, модель оценивает следующее', en: 'added, the model scores the next one' })}</>
          : <span className="am-hint">{t({ ru: 'Модель оценивает, какое слово следующее. Нажмите ▶', en: 'The model scores which word comes next. Press ▶' })}</span>}
      </p>
    </div>
  )
}
