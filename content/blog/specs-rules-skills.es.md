---
title: Qué son AGENTS.md y CLAUDE.md: un archivo de ejemplo y dónde guardar specs, reglas y skills
date: 2026-09-28
updated: 2026-11-08
description: Cuatro tipos de contexto permanente para la IA (AGENTS.md, CLAUDE.md, skills): la spec de la tarea, la biblia del proyecto, las reglas y las skills. Qué va en cada uno, cuándo entra en el contexto y qué ofrecen ChatGPT y Claude. Basado en la documentación de Anthropic, OpenAI, GitHub, Cursor y Cline.
tags: IA, Claude Code, CLAUDE.md, harness, specs, skills
category: specs
layout: wide
mentions: AGENTS.md, CLAUDE.md, Agent Skills, Spec Kit, Memory Bank
toc: map=Cuatro capas | spec=Spec | bible=Biblia | rules=Reglas | skills=Skills | chat=En un chat | pick=Qué va dónde | faq=Preguntas | next=Para seguir leyendo
---

AGENTS.md y CLAUDE.md son archivos en la raíz del proyecto con instrucciones permanentes para un agente de IA: comandos de compilación y pruebas, estilo de código, prohibiciones. AGENTS.md es un formato abierto que leen Codex, Cursor, Gemini CLI, Copilot y otros agentes; CLAUDE.md lo lee Claude Code. El harness (arnés del agente) coloca ese archivo al inicio de cada sesión. Abajo hay un archivo de ejemplo y dónde guardar las specs, la biblia del proyecto y las skills.

<b-post series="prompts">
<b-ctx-layers>
  <layer kind="spec" t="Spec" when="para una tarea">qué construir en una tarea</layer>
  <layer kind="bible" t="Biblia" when="al inicio de la tarea">qué es el producto</layer>
  <layer kind="rules" t="Reglas" when="cada sesión">cómo trabajar en el proyecto</layer>
  <layer kind="skill" t="Skill" when="a demanda">cómo ejecutar un procedimiento</layer>
</b-ctx-layers>
<b-cap>Un modelo no recuerda un proyecto entre sesiones<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: «Large language models don&#x27;t retain memory between completions. Rules provide persistent, reusable context at the prompt level» — cursor.com/docs/context/rules"/>. Cuatro tipos de archivos devuelven ese contexto.</b-cap>
<b-chapter id="map" title="Cuatro capas de contexto" icon="table-grid">
  <b-ctx-table phone="hide4">
    <table>
    <thead>
      <tr><th>Capa</th><th>Qué contiene</th><th>Cuándo está en el contexto</th><th>Archivos</th></tr>
    </thead>
    <tbody>
      <tr><td><b-ctx-layer kind="spec">Spec</b-ctx-layer></td><td>requisitos, plan, pasos de una tarea</td><td>para una tarea</td><td><code>spec.md · plan.md · tasks.md</code></td></tr>
      <tr><td><b-ctx-layer kind="bible">Biblia</b-ctx-layer></td><td>objetivo del producto, usuarios, decisiones</td><td>al inicio de la tarea</td><td><code>projectbrief.md · productContext.md</code></td></tr>
      <tr><td><b-ctx-layer kind="rules">Reglas</b-ctx-layer></td><td>comandos, estilo, prohibiciones</td><td>cada sesión</td><td><code>CLAUDE.md · AGENTS.md · .cursor/rules</code></td></tr>
      <tr><td><b-ctx-layer kind="skill">Skill</b-ctx-layer></td><td>procedimiento con ejemplos y scripts</td><td>la descripción siempre, el cuerpo a demanda</td><td><code>SKILL.md</code></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-finding>
    <ex>Las capas se diferencian en su duración y en cuándo entran en el contexto.</ex>
    <gen>Las reglas se cargan en cada sesión, por eso se mantienen cortas: Anthropic recomienda menos de 200 líneas por archivo<b-proof href="https://code.claude.com/docs/en/memory" quote="Anthropic: «Size: target under 200 lines per CLAUDE.md file. Longer files consume more context and reduce adherence» — code.claude.com/docs/en/memory"/>. El contenido largo y de uso poco frecuente pasa a skills, cuyo cuerpo se carga solo a demanda<b-proof href="https://code.claude.com/docs/en/skills" quote="Anthropic: «skill descriptions are loaded into context so Claude knows what&#x27;s available, but full skill content only loads when invoked» — code.claude.com/docs/en/skills"/>.</gen>
    <do>Repasa tu archivo de instrucciones: deja los hechos en las reglas, pasa los procedimientos a skills y la descripción del producto a la biblia.</do>
  </b-finding>
</b-chapter>
<b-chapter id="spec" title="Spec: una tarea antes del código" icon="file-lines">
  <b-why>Una spec describe la tarea antes de empezar el trabajo: primero qué y por qué, luego cómo<b-proof href="https://github.com/github/spec-kit" quote="GitHub Spec Kit: «Define what and why before deciding how to build it. SDD turns your requirements into a specification, a technical plan, and actionable tasks, then guides implementation against those artifacts» — github.com/github/spec-kit"/>.</b-why>
  <b-seq-row>
    <step t="Principios">una vez por proyecto</step>
    <step t="Spec">qué y por qué</step>
    <step t="Plan">cómo</step>
    <step t="Tareas">pasos</step>
    <step t="Implementar">código paso a paso</step>
  </b-seq-row>
  <b-cap>Pasos principales de GitHub Spec Kit<b-proof href="https://github.com/github/spec-kit" quote="GitHub Spec Kit: la constitution se crea una vez por proyecto — «Create principles focused on code quality, testing, and maintainability». Paráfrasis — github.com/github/spec-kit"/>. Cómo dividir una spec grande en partes: <a href="/blog/specs-by-aggregates/">Specs por agregados</a></b-cap>
  <b-finding>
    <ex>Spec Kit lleva una tarea desde los principios del proyecto, pasando por la spec y el plan, hasta los pasos y el código.</ex>
    <gen>Los requisitos se escriben antes del código, y la revisión contrasta el resultado con ese texto. Cómo encaja una spec en el harness se explica en <a href="/blog/harness-driven-development/#spec">HDD y specs</a>.</gen>
    <do>Para una tarea de más de un día, escribe una spec: qué, por qué y cómo sabrás que está terminada.</do>
  </b-finding>
</b-chapter>
<b-chapter id="bible" title="Biblia del proyecto: qué es el producto" icon="notebook">
  <b-why>La biblia es una descripción permanente del producto: por qué existe, a quién sirve, cómo funciona y qué se ha decidido. El término viene de la práctica; el análogo documentado más cercano es el Memory Bank de Cline<b-proof href="https://docs.cline.bot/prompting/cline-memory-bank" quote="Cline: Memory Bank — «a documentation methodology that transforms Cline from a stateless assistant into a persistent development partner. Through structured markdown files, Cline can &#x27;remember&#x27; your project details across sessions» — docs.cline.bot/prompting/cline-memory-bank"/>.</b-why>
  <b-file-grid>
    <file name="projectbrief.md">objetivos y requisitos</file>
    <file name="productContext.md">por qué existe, qué resuelve</file>
    <file name="systemPatterns.md">arquitectura y patrones</file>
    <file name="techContext.md">stack y restricciones</file>
    <file name="activeContext.md">foco actual y próximos pasos</file>
    <file name="progress.md">qué funciona, qué falta</file>
  </b-file-grid>
  <b-finding>
    <ex>Seis archivos de Memory Bank: del objetivo del producto al progreso actual.</ex>
    <gen>La biblia responde a las preguntas que de otro modo se repiten en cada chat nuevo: qué es el producto, qué decisiones se tomaron, qué está en curso. El archivo del contexto actual es el que cambia con más frecuencia<b-proof href="https://docs.cline.bot/prompting/cline-memory-bank" quote="Cline: activeContext.md — el foco actual, los últimos cambios y los próximos pasos, se actualiza más a menudo que el resto. Paráfrasis — docs.cline.bot/prompting/cline-memory-bank"/>.</gen>
    <do>Empieza con un solo archivo: objetivo del producto, usuarios, términos clave y decisiones recientes con fechas.</do>
  </b-finding>
</b-chapter>
<b-chapter id="rules" title="Reglas: en cada sesión" icon="list-arrow">
  <b-why>Las reglas son instrucciones que el harness coloca al inicio de cada sesión<b-proof href="https://code.claude.com/docs/en/memory" quote="Anthropic: «CLAUDE.md files are loaded into the context window at the start of every session» — code.claude.com/docs/en/memory"/>.</b-why>
  <b-io justify>
    <item k="CLAUDE.md" mono>Claude Code, reglas por ruta en <code>.claude/rules/</code><b-proof href="https://code.claude.com/docs/en/memory" quote="Anthropic: «Rules can also be scoped to specific file paths, so they only load into context when Claude works with matching files» — code.claude.com/docs/en/memory"/></item>
    <item k="AGENTS.md" mono>«Un README para agentes»: Codex, Cursor, Gemini CLI, Copilot y otros<b-proof href="https://agents.md/" quote="agents.md: «Think of AGENTS.md as a README for agents: a dedicated, predictable place to provide the context and instructions to help AI coding agents work on your project» — agents.md"/></item>
    <item k=".cursor/rules" mono>Cursor, cuatro formas de aplicar<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: cuatro modos — Always Apply, Apply Intelligently, Apply to Specific Files, Apply Manually — cursor.com/docs/context/rules"/></item>
  </b-io>
  <b-why align="left">Un ejemplo de AGENTS.md para un proyecto web. El archivo contiene solo lo que el agente no puede aprender del código: comandos, estilo y prohibiciones. CLAUDE.md para Claude Code funciona igual.</b-why>
  <b-codebox title="Ejemplo de AGENTS.md">
    # AGENTS.md
    ## Commands
    - Install: npm ci
    - Tests: npm test
    - Type check: npx tsc --noEmit
    ## Style
    - Strict TypeScript, no any
    - kebab-case file names
    ## Don't
    - Don't change migrations/ without a task for it
    - Don't commit .env or keys
    ## Before finishing
    - Run the tests and the type check
  </b-codebox>
  <b-sublabel top="18">Cuándo entra una regla en el contexto · Cursor</b-sublabel>
  <b-rule-modes>
    <mode t="Siempre">cada chat</mode>
    <mode t="Por descripción">el agente decide</mode>
    <mode t="Por archivos">coincide el patrón de ruta</mode>
    <mode t="Manualmente">@rule</mode>
  </b-rule-modes>
  <b-metric-line value="≤ 200">líneas por archivo CLAUDE.md<b-proof href="https://code.claude.com/docs/en/memory" quote="Anthropic: «Size: target under 200 lines per CLAUDE.md file. Longer files consume more context and reduce adherence» — code.claude.com/docs/en/memory"/></b-metric-line>
  <b-finding>
    <ex>Tres formatos de una misma idea: un archivo de instrucciones que el harness lee al inicio.</ex>
    <gen>Las reglas siguen siendo contexto, y el modelo puede incumplirlas; una acción que nunca debe ocurrir se bloquea con un hook. Cuanto más específica y concisa es una regla, con más constancia se cumple<b-proof href="https://code.claude.com/docs/en/memory" quote="Anthropic: «Claude treats them as context, not enforced configuration. To block an action regardless of what Claude decides, use a PreToolUse hook instead. The more specific and concise your instructions, the more consistently Claude follows them» — code.claude.com/docs/en/memory"/>.</gen>
    <do>Crea AGENTS.md o CLAUDE.md: comandos de compilación y pruebas, estilo de código, prohibiciones. Pasa las reglas específicas de una carpeta a reglas por ruta.</do>
  </b-finding>
</b-chapter>
<b-chapter id="skills" title="Skills: un procedimiento a demanda" icon="zap">
  <b-why>Una skill es una carpeta con una instrucción SKILL.md, ejemplos y scripts para un procedimiento recurrente<b-proof href="https://learn.chatgpt.com/docs/build-skills" quote="OpenAI: «ChatGPT and Codex start with each skill&#x27;s name and description, then load the full SKILL.md instructions when they decide to use that skill» — learn.chatgpt.com/docs/build-skills"/>.</b-why>
  <b-skill-pick start="Inicio de sesión" start-note="nombre + descripción" picked="↓ el agente eligió «Revisión de PR»" call="A demanda" call-note="cuerpo completo" file="SKILL.md" file-note="instrucciones, ejemplos, scripts">
    <skill>informe</skill>
    <skill on>Revisión de PR</skill>
    <skill>release</skill>
    <skill>correo a clientes</skill>
  </b-skill-pick>
  <b-finding>
    <ex>Las descripciones de todas las skills están siempre en el contexto; el cuerpo se carga cuando se elige una.</ex>
    <gen>Por eso una referencia larga dentro de una skill cuesta casi nada hasta que se usa. Vale la pena crear una skill cuando la misma instrucción o lista de comprobación se pega una y otra vez en el chat, o cuando una sección de las reglas ha crecido hasta convertirse en un procedimiento<b-proof href="https://code.claude.com/docs/en/skills" quote="Anthropic: «Create a skill when you keep pasting the same instructions, checklist, or multi-step procedure into chat, or when a section of CLAUDE.md has grown into a procedure rather than a fact. Unlike CLAUDE.md content, a skill&#x27;s body loads only when it&#x27;s used» — code.claude.com/docs/en/skills"/>.</gen>
    <do>Busca una sección de tus reglas que describa un procedimiento y pásala a una skill con una descripción precisa de cuándo usarla.</do>
  </b-finding>
</b-chapter>
<b-chapter id="chat" title="Lo mismo en un chat: proyectos y skills" icon="chat">
  <b-io justify>
    <item k="Instrucciones del proyecto" eq="≈ reglas">Rol y formato una sola vez, para cada chat del proyecto<b-proof href="https://help.openai.com/en/articles/10169521-projects-in-chatgpt" quote="ChatGPT: un proyecto reúne chats, archivos e instrucciones; las instrucciones del proyecto se aplican solo dentro de él, y se puede compartir con los compañeros. Paráfrasis del Centro de ayuda de OpenAI — help.openai.com/en/articles/10169521"/><b-proof href="https://support.claude.com/en/articles/9517075-what-are-projects" quote="Claude: “You can define project instructions for each project to further tailor Claude&#39;s responses. For example, instructing Claude to use a more formal tone or answer questions from the perspective of a specific role” — support.claude.com/en/articles/9517075"/></item>
    <item k="Archivos del proyecto" eq="≈ biblia">Las respuestas de muestra, las políticas y las plantillas viven en el proyecto<b-proof href="https://support.claude.com/en/articles/9517075-what-are-projects" quote="Claude: “You can upload relevant documents, text, code, or other files to a project&#39;s knowledge base, which Claude will use to better understand the context” — support.claude.com/en/articles/9517075"/></item>
    <item k="Skills" eq="= skills">Un flujo de trabajo repetible con instrucciones y ejemplos<b-proof href="https://support.claude.com/en/articles/12512180-use-skills-in-claude" quote="Claude: “Skills extend Claude&#39;s capabilities by giving it access to specialized knowledge and workflows” — support.claude.com/en/articles/12512180"/><b-proof href="https://help.openai.com/en/articles/20001066-skills-in-chatgpt" quote="ChatGPT: las skills son flujos de trabajo reutilizables con instrucciones, ejemplos y código, en los planes Business, Enterprise y Edu. Paráfrasis del Centro de ayuda de OpenAI — help.openai.com/en/articles/20001066"/></item>
  </b-io>
  <b-finding>
    <ex>Tres lugares donde un prompt sobrevive a un solo chat: instrucciones, archivos y skills.</ex>
    <gen>Un rol, ejemplos y un formato pasados a un proyecto funcionan en cada chat nuevo sin copiar. Un proyecto compartido da a todo el equipo un mismo conjunto de ejemplos.</gen>
    <do>Crea un proyecto para tu tarea semanal más frecuente y pasa el rol y el formato de tu mejor prompt a sus instrucciones.</do>
  </b-finding>
</b-chapter>
<b-chapter id="pick" title="Qué va dónde" icon="crosshair">
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>Si es…</th><th>Dónde</th></tr>
    </thead>
    <tbody>
      <tr><td>un comando, estilo o prohibición necesarios en cada tarea</td><td><b-ctx-layer kind="rules">Reglas</b-ctx-layer></td></tr>
      <tr><td>un procedimiento de varios pasos necesario de vez en cuando</td><td><b-ctx-layer kind="skill">Skill</b-ctx-layer></td></tr>
      <tr><td>los requisitos de una tarea</td><td><b-ctx-layer kind="spec">Spec</b-ctx-layer></td></tr>
      <tr><td>conocimiento del producto y decisiones tomadas</td><td><b-ctx-layer kind="bible">Biblia</b-ctx-layer></td></tr>
      <tr><td>un error del agente que no deja de repetirse</td><td><a href="/blog/harness-driven-development/#loop">regla o comprobación · HDD</a></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-finding>
    <ex>Cinco situaciones y cinco lugares.</ex>
    <gen>La frecuencia y la duración deciden el lugar. Lo que siempre se necesita se mantiene corto; lo que rara vez se necesita puede ser detallado.</gen>
    <do>Revisa las reglas una vez por semana: pasa los procedimientos a skills y las decisiones a la biblia con fecha.</do>
  </b-finding>
</b-chapter>
<b-chapter id="faq" icon="chat" title="Preguntas frecuentes">
  <b-faq-cards>
    <q t="¿Qué son AGENTS.md y CLAUDE.md?">Archivos en la raíz del proyecto con instrucciones permanentes para un agente de IA: comandos de compilación y pruebas, estilo de código, prohibiciones.</q>
    <q t="¿Qué agentes leen AGENTS.md?">Codex, Cursor, Gemini CLI, Copilot y otros. Claude Code lee CLAUDE.md.</q>
    <q t="¿Cuánto debe medir CLAUDE.md?">Anthropic recomienda menos de 200 líneas por archivo: las reglas se cargan en cada sesión. El contenido largo y poco frecuente pasa a skills.</q>
    <q t="¿En qué se diferencian las reglas de las skills?">El agente ve las reglas en cada sesión. Una skill es un procedimiento que el agente carga completo solo cuando una tarea coincide.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Para seguir leyendo">
  <b-links cols="2">
    <item href="/blog/harness-driven-development/" k="Método" t="Harness-Driven Development">Error del agente → regla del entorno</item>
    <item href="/blog/harness-work-approaches/" k="Enfoques" t="Enfoques para trabajar con un harness">Ciclo de respuesta y revisión</item>
    <item href="/blog/work-prompts-examples/" k="Práctica" t="Prompts para tareas de trabajo">Cinco partes y seis ejemplos</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="Comparación" t="Comparación de harnesses">Claude Code, Codex, Cursor, Hermes</item>
  </b-links>
</b-chapter>
<b-footer>Basado en la documentación de Anthropic, OpenAI, GitHub, Cursor y Cline; la fuente está tras el icono junto a cada afirmación. «Biblia del proyecto» es un término de la práctica; las paráfrasis se marcan en la ayuda emergente de la fuente.</b-footer>
</b-post>
