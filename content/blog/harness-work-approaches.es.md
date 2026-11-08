---
title: Qué hacer cuando la respuesta de la IA no acierta: el ciclo de respuestas y la revisión que corrige la petición original
date: 2026-09-28
updated: 2026-11-08
description: Qué hacer cuando una respuesta falla: tres caminos y un ciclo repetido. Cómo la revisión encuentra huecos, por qué van a la petición original y el pipeline se ejecuta otra vez. Basado en las guías de Anthropic, OpenAI y Google.
tags: IA, harness, prompts, revisión
category: prompts
layout: wide
toc: iterate=Si falla | review=Revisión de la respuesta | faq=Preguntas | next=Más lecturas
---

Cuando una respuesta de la IA no acierta, hay tres caminos: aclarar en el mismo chat, reescribir la petición original o pedirle primero al modelo que haga preguntas. Cuando una revisión encuentra un hueco, este va a la petición original y todo el ciclo se ejecuta de nuevo: cambio, pruebas, revisión. La petición queda completa y la siguiente tarea parecida parte de ella. Abajo están los dos enfoques según las guías de Anthropic, OpenAI y Google.

<b-post series="prompts">
<b-flow lead label="Two approaches: the answer loop and review that fixes the request">
  <b-lane title="La respuesta falló" color="muted">
    <node icon="x" t="Respuesta">fuera de la tarea</node>
    <node icon="refresh" t="Uno de tres caminos">aclarar, rehacer, preguntar</node>
    <node icon="ai-box" t="Respuesta nueva">se comprueba otra vez</node>
  </b-lane>
  <b-lane title="La revisión encontró un hueco" color="accent">
    <node icon="file" t="Petición v1">la tarea original</node>
    <node icon="search" t="Revisión">dos huecos</node>
    <node icon="check" t="Petición v2">y todo el pipeline otra vez</node>
  </b-lane>
</b-flow>
<b-cap>Ambos enfoques funcionan en cualquier harness: un chat, Claude Code, Codex o Cursor.</b-cap>

<b-chapter id="iterate" icon="refresh" title="Si la respuesta no acierta">
  <b-art names="harness-work-approaches/answer-paths harness-work-approaches/answer-paths-mobile"/>
  <b-sublabel top="22">Camino 3: tres preguntas y una petición nueva</b-sublabel>
  <b-sublabel top="16">Paso 1</b-sublabel>
  <b-prompt>
    [descripción de la tarea]
    Antes de hacer la tarea, hazme 3 preguntas cuyas respuestas mejorarían más el resultado. No empieces el trabajo hasta que yo responda.
  </b-prompt>
  <b-sublabel top="12">Paso 2</b-sublabel>
  <b-why>Responde a las preguntas del modelo con tus propias palabras, en el mismo chat.</b-why>
  <b-sublabel top="12">Paso 3</b-sublabel>
  <b-prompt>
    Construye un prompt final a partir de la tarea y mis respuestas: rol, quién y para qué, datos, ejemplo, formato, pregunta al final. Entrega solo el texto del prompt.
  </b-prompt>
  <b-finding>
    <ex>Tres situaciones y una acción para cada una: aclarar en el mismo chat, rehacer el prompt u obtener primero preguntas del modelo.</ex>
    <gen>
      Aclarar conserva el contexto ya dado y conviene cuando la tarea se entendió. Si la tarea se interpretó mal, rehacer el prompt es más rápido.
      Si el modelo se inventó hechos, dale los datos necesarios en la petición nueva y permítele decir «no lo sé»<b-proof href="https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations" quote="Anthropic: “Explicitly give Claude permission to admit uncertainty. This simple technique can drastically reduce false information” — platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations"/>.
      La respuesta nueva se comprueba igual, y el ciclo se repite hasta que encaje.
      Las preguntas del modelo ayudan cuando no está claro qué contexto hace falta: la ambigüedad deja al modelo margen para interpretar mal<b-proof href="https://claude.com/blog/best-practices-for-prompt-engineering" quote="Anthropic: “Don&#39;t assume the AI reads minds: Be specific about what you want. Leaving things ambiguous gives the AI room to misinterpret” — claude.com/blog/best-practices-for-prompt-engineering"/>,
      y cuando la intención no está clara, los modelos piden aclaraciones con más frecuencia<b-proof href="https://developers.openai.com/api/docs/guides/prompt-guidance" quote="OpenAI: “When the user&#39;s intent is unclear, the model is more likely to ask the user for clarification to proceed”; and “Before asking the user clarifying questions, you should complete the work that is already authorized from context” — developers.openai.com/api/docs/guides/prompt-guidance"/>.
    </gen>
    <do>Para una tarea nueva en la que no estás seguro del contexto, empieza pidiendo tres preguntas. Envía el prompt final construido con las respuestas como petición nueva en un chat nuevo.</do>
  </b-finding>
</b-chapter>

<b-chapter id="review" icon="search" title="Revisión de la respuesta: corregir la petición original">
  <b-why>El camino «reescribir la petición» como ejemplo: la revisión encontró huecos, la petición original perdió lo que estaba mal y ganó lo que faltaba, y todo se ejecutó de nuevo.</b-why>
  <b-art names="harness-work-approaches/two-runs harness-work-approaches/two-runs-mobile"/>
  <b-finding>
    <ex>La revisión encontró dos casos que no estaban en la tarea: un prefijo internacional sin el signo más y una cadena vacía. De la petición original se quitó el límite innecesario de «solo números rusos», se añadieron los dos casos y todo el pipeline se ejecutó de nuevo.</ex>
    <gen>
      Un hueco que encuentra la revisión va a la petición original, y el ciclo empieza otra vez: el agente escribe el código de nuevo, las pruebas y la revisión comprueban los casos nuevos, y la aclaración se queda en la tarea para ejecuciones futuras.
      Una pasada de revisión aparte con su propia instrucción se describe en la guía de prompts de Google<b-proof href="https://www.kaggle.com/whitepaper-prompt-engineering" quote="Google, Prompt Engineering whitepaper: the code section, including review and debugging as a separate prompt — kaggle.com/whitepaper-prompt-engineering"/>.
    </gen>
    <do>Cuando la revisión encuentre algo, añádelo a la petición original y vuelve a ejecutar todo el ciclo: cambio, pruebas, revisión.</do>
  </b-finding>
  <b-cta href="/blog/harness-driven-development/" k="Siguiente paso · HDD" t="Harness-Driven Development">Cómo pasar un hueco que se repite de la petición a las reglas del harness</b-cta>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Preguntas frecuentes">
  <b-faq-cards>
    <q t="¿Qué hacer cuando una respuesta de la IA no acierta?">Aclarar en el mismo chat si la tarea se entendió; reescribir la petición si se entendió mal; o pedirle primero al modelo que haga preguntas.</q>
    <q t="¿Por qué pedirle al modelo que haga preguntas?">Cuando no estás seguro del contexto de la tarea, las preguntas del modelo muestran lo que le falta. La petición final va a un chat nuevo.</q>
    <q t="¿Qué hacer con los hallazgos de la revisión?">Añadirlos a la petición original y volver a ejecutar todo el ciclo: cambio, pruebas, revisión.</q>
    <q t="¿Por qué editar la petición original?">Así la petición queda completa y la siguiente tarea parecida parte de ella.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Más lecturas">
  <b-links cols="2">
    <item href="/blog/specs-rules-skills/" k="Contexto" t="Specs, biblia, reglas y skills">Lo que un agente debe saber de un proyecto</item>
    <item href="/blog/harness-driven-development/" k="Método" t="Harness-Driven Development">Error del agente → regla del entorno</item>
    <item href="/blog/work-prompts-examples/" k="Práctica" t="Prompts para tareas de trabajo">Cinco partes y seis ejemplos</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="Comparación" t="Comparación de harness">Claude Code, Codex, Cursor, Hermes y chat</item>
  </b-links>
</b-chapter>
<b-footer>Las técnicas siguen las guías oficiales de Anthropic, OpenAI y Google; la fuente está tras el icono junto a cada afirmación. Las citas de la guía de Google están parafraseadas.</b-footer>
</b-post>
