---
title: Cursor rules vs AGENTS.md: qué va en cada uno
seoTitle: Cursor rules vs AGENTS.md: qué va en cada uno (2026)
date: 2026-11-15
updated: 2026-11-17
description: Las reglas de Cursor viven en .cursor/rules y tienen modos; AGENTS.md es markdown simple que leen muchos agentes. Tabla comparativa y ejemplo de migración.
tags: IA, Cursor, AGENTS.md, reglas, .cursorrules, harness
category: specs
layout: wide
mentions: AGENTS.md, Cursor, CLAUDE.md, Codex
toc: answer=Respuesta breve | table=Lado a lado | modes=Cuatro modos | migrate=Migración | readers=Quién lee AGENTS.md | pick=Qué va dónde | faq=Preguntas | next=Seguir leyendo
---
Las reglas de Cursor y AGENTS.md dan a un agente instrucciones permanentes, pero con distinto alcance. AGENTS.md es markdown simple en la raíz del proyecto, que leen Cursor y muchos otros agentes. Las reglas de .cursor/rules son archivos .mdc con cuatro modos de aplicación, formato propio de Cursor. Lo común va en AGENTS.md y lo condicional en .mdc.

<b-post series="prompts">
<b-chapter id="answer" title="Respuesta breve" icon="crosshair">
  <b-why>Cursor acepta dos formatos a la vez: AGENTS.md para los casos simples y las reglas de proyecto para controlar cuándo se aplica una regla<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: «For more control over when rules apply, use project rules in .cursor/rules/ instead» — cursor.com/help/customization/rules"/>.</b-why>
  <b-finding>
    <ex>AGENTS.md contiene lo que todo agente debe saber; .cursor/rules contiene lo que solo Cursor debe saber, y solo a veces.</ex>
    <gen>AGENTS.md no tiene modos ni metadatos, así que cualquier agente puede leerlo. Una regla .mdc añade modos, de modo que puede esperar hasta que la reclame un tipo de archivo o una petición.</gen>
    <do>Pase los comandos y las prohibiciones a AGENTS.md, deje las reglas por tipo de archivo en .cursor/rules y elimine .cursorrules.</do>
  </b-finding>
</b-chapter>
<b-chapter id="table" title="Reglas de Cursor y AGENTS.md lado a lado" icon="table-grid">
  <b-why>Cada celda procede de la documentación de Cursor, de agents.md o de OpenAI; la fuente está detrás del icono. Comprobado el 15.11.2026.</b-why>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th></th><th>AGENTS.md</th><th>.cursor/rules/*.mdc</th></tr>
    </thead>
    <tbody>
      <tr><td>Alcance</td><td>el proyecto; un archivo anidado para una subcarpeta<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: «Cursor supports AGENTS.md in the project root and subdirectories» — cursor.com/docs/context/rules"/></td><td>el proyecto, dividido en reglas; User Rules (todos sus proyectos) y Team Rules (una organización entera) son niveles aparte<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: Team Rules → Project Rules → User Rules is the order of precedence; Team Rules are managed from the dashboard — cursor.com/docs/context/rules"/></td></tr>
      <tr><td>Quién lo lee</td><td>Cursor, Codex, Copilot, Windsurf, OpenCode y otros<b-proof href="https://agents.md/" quote="agents.md: «A simple, open format for guiding coding agents» — Cursor and Codex are in the list of supporting agents — agents.md"/></td><td>Cursor</td></tr>
      <tr><td>Archivo y ubicación</td><td><code>AGENTS.md</code> en la raíz y en las subcarpetas; gana el archivo más cercano al que se edita<b-proof href="https://agents.md/" quote="agents.md: «The closest AGENTS.md to the edited file wins; explicit user chat prompts override everything» — agents.md"/></td><td><code>.cursor/rules/</code>, un archivo por regla; las reglas pueden estar en carpetas<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: «Stored in .cursor/rules, version-controlled and scoped to your codebase» — cursor.com/docs/context/rules"/></td></tr>
      <tr><td>Formato</td><td>markdown simple, sin campos obligatorios<b-proof href="https://agents.md/" quote="agents.md: «No. AGENTS.md is just standard Markdown» — agents.md"/></td><td>markdown con una cabecera de <code>description</code>, <code>globs</code>, <code>alwaysApply</code>; la extensión debe ser <code>.mdc</code>, un <code>.md</code> normal se ignora<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: «Project rules must use the .mdc extension» — cursor.com/docs/context/rules"/></td></tr>
      <tr><td>Cuándo se aplica</td><td>se recoge automáticamente, sin modos<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: «Write instructions in plain markdown. Cursor picks it up automatically» — cursor.com/help/customization/rules"/></td><td>uno de cuatro modos: siempre, por descripción, por patrón de archivo, manualmente</td></tr>
      <tr><td>Control de versiones</td><td>un archivo en el repositorio, los cambios pasan por git</td><td>se guarda en el repositorio; la documentación aconseja confirmar (commit) las reglas<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: «Check your rules into git so your whole team benefits» — cursor.com/docs/context/rules"/></td></tr>
      <tr><td>Tamaño</td><td>la documentación de Cursor no da una cifra; Codex limita todos sus archivos de instrucciones juntos a 32 KiB por defecto<b-proof href="https://learn.chatgpt.com/docs/agent-configuration/agents-md" quote="Codex: combined instructions are capped by project_doc_max_bytes, which is 32 KiB by default — learn.chatgpt.com/docs/agent-configuration/agents-md"/></td><td>menos de 500 líneas por regla, las grandes se dividen<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: «Keep rules under 500 lines. Split large rules into smaller, focused files» — cursor.com/help/customization/rules"/></td></tr>
      <tr><td>El antiguo .cursorrules</td><td colspan="2">un único archivo en la raíz, sustituido por ambos formatos<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: «The .cursorrules file in your project root is legacy and will be deprecated» — cursor.com/help/customization/rules"/></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>Cursor también trata CLAUDE.md como siempre activo: se aplica a todas las conversaciones, diga lo que diga <code>alwaysApply</code><b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: «CLAUDE.md files are always applied to every conversation, regardless of any alwaysApply frontmatter setting» — cursor.com/help/customization/rules"/>.</b-cap>
</b-chapter>
<b-chapter id="modes" title="Cuatro modos de una regla de Cursor" icon="list-arrow">
  <b-why>El modo decide cuándo entra una regla en el contexto. Se fija en la cabecera de la regla y en el menú de tipo de regla.</b-why>
  <b-rule-modes>
    <mode t="Siempre">cada chat</mode>
    <mode t="Por descripción">decide el agente</mode>
    <mode t="Por archivos">coincide un patrón de ruta</mode>
    <mode t="Manualmente">@rule</mode>
  </b-rule-modes>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>Modo en Cursor</th><th>Qué lo activa</th><th>Campo de la cabecera</th></tr>
    </thead>
    <tbody>
      <tr><td>Always Apply</td><td>cada sesión de chat<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: Always Apply — «included in every conversation» — cursor.com/help/customization/rules"/></td><td><code>alwaysApply: true</code>; entonces se ignoran globs y description<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: when alwaysApply is true the rule is always included, and globs and description are ignored — cursor.com/docs/context/rules"/></td></tr>
      <tr><td>Apply Intelligently</td><td>el agente decide a partir de la descripción<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: Apply Intelligently — «Agent decides when it's relevant» — cursor.com/help/customization/rules"/></td><td><code>description</code> con <code>alwaysApply: false</code> y sin globs</td></tr>
      <tr><td>Apply to Specific Files</td><td>un archivo coincide con un patrón<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: Apply to Specific Files — «only applies for files matching a pattern» — cursor.com/help/customization/rules"/></td><td><code>globs</code><b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: «Use globs to scope a rule to specific files or directories» — cursor.com/docs/context/rules"/></td></tr>
      <tr><td>Apply Manually</td><td>usted menciona la regla con @ en el chat<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: Apply Manually — «only used when you @mention it in chat» — cursor.com/help/customization/rules"/></td><td>la regla se invoca por su nombre, por ejemplo <code>@my-rule</code></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>Las guías antiguas de terceros llaman a los mismos cuatro modos Always, Auto Attached, Agent Requested y Manual. La documentación actual de Cursor usa los nombres de la tabla.</b-cap>
</b-chapter>
<b-chapter id="migrate" title="Migración: de .cursorrules a AGENTS.md y .mdc" icon="notebook">
  <b-why>Un proyecto de ejemplo, escrito para este artículo. Los formatos de archivo siguen la documentación de Cursor; el proyecto es inventado.</b-why>
  <b-sublabel top="18">Antes: un archivo en la raíz</b-sublabel>
  <b-codebox title="Árbol del proyecto antes">
    my-app/
    ├── .cursorrules
    ├── src/
    └── package.json
  </b-codebox>
  <b-codebox title=".cursorrules">
    Trabajas en una aplicación React + TypeScript.
    Ejecuta `npm test` antes de terminar una tarea.
    Da formato con `npm run lint -- --fix`.
    No edites nunca los archivos de dist/.
    No registres nunca tokens ni correos de usuarios.
    Componentes: componentes de función con hooks, un componente por archivo,
    props tipadas con una interfaz llamada <Name>Props.
    El archivo de pruebas está junto al componente: Button.test.tsx.
    Las llamadas a la API pasan por src/api/client.ts; valida cada respuesta con zod.
  </b-codebox>
  <b-sublabel top="18">La vía oficial: cuatro pasos</b-sublabel>
  <b-seq-row>
    <step t="Crear">una regla desde la paleta de comandos: «New Cursor Rule»</step>
    <step t="Copiar">el texto de .cursorrules</step>
    <step t="Modo">Always Apply</step>
    <step t="Eliminar">.cursorrules de la raíz</step>
  </b-seq-row>
  <b-cap>Son los cuatro pasos de la guía de Cursor; Always Apply conserva el comportamiento anterior<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: «Set the rule type to Always Apply (this matches the old behavior)» — cursor.com/help/customization/rules"/>. El resultado es una regla siempre activa. Dividir por condiciones es el paso siguiente.</b-cap>
  <b-sublabel top="18">Después: el texto común en AGENTS.md, el condicional en .mdc</b-sublabel>
  <b-codebox title="Árbol del proyecto después">
    my-app/
    ├── AGENTS.md
    ├── .cursor/
    │   └── rules/
    │       ├── react-components.mdc
    │       └── api-validation.mdc
    ├── src/
    └── package.json
  </b-codebox>
  <b-codebox title="AGENTS.md" copy>
    # my-app
    Aplicación React + TypeScript.

    ## Comandos
    - Ejecuta `npm test` antes de terminar una tarea.
    - Da formato con `npm run lint -- --fix`.

    ## Prohibiciones
    - No edites nunca los archivos de `dist/`.
    - No registres nunca tokens ni correos de usuarios.
  </b-codebox>
  <b-codebox title=".cursor/rules/react-components.mdc" copy>
    ---
    description: Estándares para componentes de React
    globs: "*.tsx"
    alwaysApply: false
    ---
    - Componentes de función con hooks, un componente por archivo.
    - Props tipadas con una interfaz llamada `<Name>Props`.
    - El archivo de pruebas está junto al componente: `Button.test.tsx`.
  </b-codebox>
  <b-codebox title=".cursor/rules/api-validation.mdc" copy>
    ---
    description: Reglas para las llamadas a la API y la validación de respuestas
    alwaysApply: false
    ---
    - Las llamadas a la API pasan por `src/api/client.ts`.
    - Valida cada respuesta con zod.
  </b-codebox>
  <b-finding>
    <ex>Nueve líneas de un archivo se convirtieron en tres archivos: cinco líneas que lee todo agente, y dos reglas que Cursor carga solo cuando corresponden.</ex>
    <gen>Los comandos y las prohibiciones valen para todo el proyecto, así que cualquier agente los necesita. Las reglas de componentes y de la API importan solo para una parte del código: la primera para los archivos <code>.tsx</code>, la segunda cuando el agente juzga relevante la descripción.</gen>
    <do>Divida el archivo antiguo con una sola pregunta: ¿necesita todo agente esta línea en cada sesión? Si es que sí, va a AGENTS.md; si es que no, va a una regla con modo.</do>
  </b-finding>
</b-chapter>
<b-chapter id="readers" title="Qué agentes leen AGENTS.md" icon="table-grid">
  <b-why>El sitio agents.md enumera muchos agentes compatibles, entre ellos Codex, Cursor, Copilot, Windsurf, Gemini CLI, Zed y Warp<b-proof href="https://agents.md/" quote="agents.md: the page lists Codex, Jules, Cursor, Gemini CLI, GitHub Copilot's coding agent, Windsurf and others — agents.md"/>. Las condiciones varían según el agente: Claude Code lee AGENTS.md solo cuando el proyecto no tiene CLAUDE.md, y Gemini CLI después de cambiar un ajuste.</b-why>
  <b-links cols="1">
    <item href="/blog/specs-rules-skills/#matrix" k="Tabla" t="Qué agente lee qué archivo">Claude Code, Codex, Cursor, Copilot, Gemini CLI, Windsurf, OpenCode: AGENTS.md, CLAUDE.md y sus propios archivos</item>
  </b-links>
</b-chapter>
<b-chapter id="pick" title="Qué va dónde" icon="crosshair">
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>Qué</th><th>Dónde</th><th>Por qué</th></tr>
    </thead>
    <tbody>
      <tr><td>Comandos de compilación y de pruebas</td><td>AGENTS.md</td><td>todo agente los necesita en cada sesión</td></tr>
      <tr><td>Prohibiciones: no editar <code>dist/</code>, no poner secretos en los registros</td><td>AGENTS.md</td><td>valen para todo el proyecto</td></tr>
      <tr><td>Estilo de un tipo de archivo, por ejemplo <code>*.tsx</code></td><td>.mdc, Apply to Specific Files</td><td>se carga solo cuando entra en juego un archivo así</td></tr>
      <tr><td>Un tema que se necesita de vez en cuando: llamadas a la API, migraciones</td><td>.mdc, Apply Intelligently</td><td>el agente lee la descripción e incorpora la regla</td></tr>
      <tr><td>Una lista de comprobación poco frecuente</td><td>.mdc, Apply Manually</td><td>entra en el chat solo con @</td></tr>
      <tr><td>Una regla para toda la organización</td><td>Team Rules</td><td>se gestiona desde el panel de Cursor en los planes Team y Enterprise<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: Team and Enterprise plans can create and enforce rules across their organization from the dashboard — cursor.com/docs/context/rules"/></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>Mantenga cada instrucción en un solo lugar. Una línea copiada en AGENTS.md y en una regla hay que corregirla dos veces.</b-cap>
</b-chapter>
<b-chapter id="faq" icon="chat" title="Preguntas frecuentes">
  <b-faq-cards>
    <q t="¿Lee Cursor AGENTS.md?">Sí. Cursor lee AGENTS.md en la raíz del proyecto y en las subcarpetas, como markdown simple sin metadatos, y lo recoge automáticamente. Las instrucciones de un AGENTS.md anidado se combinan con las de las carpetas superiores, y las más específicas tienen prioridad. Fuente: cursor.com/docs/context/rules y cursor.com/help/customization/rules, comprobado el 15.11.2026.</q>
    <q t="¿Sigo necesitando .cursorrules?">No. La documentación de Cursor califica de heredado el .cursorrules de la raíz y describe el cambio: crear una regla en modo Always Apply, copiar el texto y eliminar el archivo. Fuente: cursor.com/help/customization/rules, comprobado el 15.11.2026.</q>
    <q t="¿Puedo mantener a la vez AGENTS.md y .cursor/rules?">Sí. Cursor los describe como dos opciones: AGENTS.md para los casos simples y las reglas de proyecto para controlar cuándo se aplica una regla. Un reparto sensato es poner los comandos y las prohibiciones comunes en AGENTS.md y las reglas con condición en .cursor/rules; cada instrucción vive en un solo lugar. Fuente: cursor.com/help/customization/rules, comprobado el 15.11.2026.</q>
    <q t="¿Cuántas reglas y de qué longitud?">Cursor recomienda menos de 500 líneas por regla y dividir las reglas grandes en archivos más pequeños y específicos. Las páginas consultadas no indican un límite de número de reglas ni una longitud para AGENTS.md; Codex limita sus archivos AGENTS.md juntos a 32 KiB por defecto. Fuentes: documentación de Cursor y de OpenAI, comprobada el 15.11.2026.</q>
  </b-faq-cards>
</b-chapter>
<b-chapter id="next" title="Seguir leyendo">
  <b-links cols="2">
    <item href="/blog/specs-rules-skills/" k="Contexto" t="AGENTS.md, CLAUDE.md y spec.md: qué va dónde">Cuatro capas, una tabla de agentes, un archivo real</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="Comparación" t="Claude Code, Codex, Cursor y Hermes Agent">Qué agente para qué tarea</item>
    <item href="/blog/harness-driven-development/" k="Método" t="Harness-Driven Development">Un error del agente se convierte en una regla</item>
  </b-links>
</b-chapter>
<b-footer>Basado en la documentación de Cursor, agents.md y OpenAI; la fuente está detrás del icono junto a cada afirmación; comprobado el 15.11.2026. El proyecto de ejemplo es inventado.</b-footer>
</b-post>
