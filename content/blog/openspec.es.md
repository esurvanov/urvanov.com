---
title: Cómo instalar y usar OpenSpec: un ejemplo de cambio desde el plan hasta la fusión
date: 2026-11-07
updated: 2026-11-13
description: Cómo funciona OpenSpec de Fission AI: una carpeta de cambio con plan, requisitos y tareas, tres comandos para el agente y la fusión en las specs compartidas. Instalación en dos comandos, un cambio real del repositorio del sitio urvanov.com, comparación con Spec Kit y prompts listos para empezar.
tags: IA, OpenSpec, specs, Spec-Driven Development, Claude Code, Codex, Cursor
category: specs
layout: wide
mentions: OpenSpec, Spec-Driven Development, Spec Kit, Claude Code, Codex, Cursor, GitHub Copilot
toc: what=Qué es | install=Instalación | flow=Tres comandos | example=Ejemplo | kit=OpenSpec o Spec Kit | start=Cómo empezar | faq=Preguntas | next=Seguir leyendo
---

OpenSpec es un framework gratuito y de código abierto para el desarrollo guiado por especificaciones (Spec-Driven Development). Antes de escribir código, un agente de IA anota en la carpeta del proyecto un plan del cambio: por qué hace falta, los requisitos, el enfoque y las tareas. Tú revisas el plan, el agente escribe el código siguiendo las tareas y los requisitos terminados se fusionan en las specs compartidas del proyecto. Abajo: instalación, tres comandos y el recorrido de un cambio real.

<b-post series="specs">
<b-chapter id="what" icon="file-lines" title="Qué es OpenSpec">
  <b-why align="left">Sin un plan, un agente escribe código directamente a partir de un mensaje de chat. La intención vive solo en ese chat: una semana después nadie recuerda por qué se hizo así, y el siguiente agente empieza de cero y puede rehacerlo a su manera.</b-why>
  <iso-art name="openspec/chat-vs-files"></iso-art>
  <b-why align="left">A la izquierda está la forma habitual: le dices al agente «hazlo así», luego «y además esto», y escribe código. El código se queda, pero la explicación de por qué es así queda en el historial del chat. A la derecha está el trabajo con OpenSpec: el agente primero pone un plan en los archivos del proyecto, tú lees y editas ese plan, y solo entonces el agente escribe código ceñido a él. El plan se guarda en el repositorio junto con el código, donde lo ve cada compañero y cada agente posterior.</b-why>
  <b-why align="left">OpenSpec saca la intención del chat y la lleva a archivos junto al código. Cada cambio tiene su propia carpeta en <code>openspec/changes</code>: ahí se anota por qué, qué requisitos cambian, cómo hacerlo y en qué pasos. Los requisitos vivos de todo el sistema están aparte, en <code>openspec/specs</code>. Es Markdown sencillo sin sintaxis especial<b-proof href="https://github.com/Fission-AI/OpenSpec" quote="OpenSpec: «Plain Markdown — requirements with concrete scenarios, no special syntax to learn» — github.com/Fission-AI/OpenSpec"/>, así que lo leen tanto las personas como el agente.</b-why>
  <iso-art name="term:openspec"></iso-art>
  <b-why align="left">El diagrama muestra dos partes. La carpeta del cambio es un borrador: contiene lo que estás a punto de cambiar. Las specs compartidas describen el sistema tal como ya es. Mientras un cambio está en curso, las specs compartidas no se tocan. Cuando el código está listo, los requisitos de la carpeta del cambio pasan a las specs compartidas, y la descripción del sistema vuelve a coincidir con el código. Cada cambio consta de cuatro archivos:</b-why>
  <b-table>
  | Archivo | A qué pregunta responde | Qué contiene |
  |---|---|---|
  | <code>proposal.md</code> | ¿Por qué? | el motivo del cambio y qué cambia exactamente |
  | <code>specs/</code> | ¿Qué debe ser cierto? | requisitos con SHALL y MUST y escenarios «cuando — entonces» |
  | <code>design.md</code> | ¿Cómo? | decisiones técnicas, objetivos, no objetivos, riesgos |
  | <code>tasks.md</code> | ¿En qué orden? | una lista de tareas que sigue el agente |
  </b-table>
  <b-finding>
    <ex>Los cuatro archivos de un cambio responden a cuatro preguntas: por qué, qué, cómo y en qué orden.</ex>
    <gen>El plan está junto al código y se revisa antes de que el agente empiece a escribir. Un fallo en la idea se ve en un párrafo de texto, antes de que llegue al código.</gen>
    <do>Antes de un cambio grande, pide al agente que ponga primero un plan en una carpeta de cambio y solo después escriba código.</do>
  </b-finding>
</b-chapter>

<b-chapter id="install" icon="terminal" title="Instalación">
  <b-why align="left">OpenSpec tiene dos partes. La primera es el programa de línea de comandos <code>openspec</code>: se instala una vez por ordenador. La segunda es la preparación de un proyecto concreto: <code>openspec init</code> crea en él una carpeta <code>openspec/</code> y añade a tus agentes comandos como <code>/openspec-propose</code>.</b-why>
  <iso-art name="openspec/install"></iso-art>
  <b-why align="left">El orden del diagrama: primero el programa aparece en el ordenador, luego aparece en el proyecto una carpeta <code>openspec/</code> con dos subcarpetas, <code>specs</code> para los requisitos vivos y <code>changes</code> para los cambios en curso, y por último tus agentes reciben comandos nuevos. El código del proyecto en sí no cambia: solo se añaden la carpeta de planes y los archivos de comandos para los agentes. El comando para macOS y Linux:</b-why>
  <b-codebox title="Instalar en macOS y Linux">
    curl -fsSL https://openspec.dev/cli/install.sh | sh
  </b-codebox>
  <b-why align="left">Si prefieres npm, necesitas Node.js 22.12 o superior<b-proof href="https://github.com/Fission-AI/OpenSpec" quote="OpenSpec: «npm install -g @fission-ai/openspec@latest (needs Node.js 22.12.0 or higher)» — github.com/Fission-AI/OpenSpec"/>. Windows tiene su propio script de instalación para PowerShell, y macOS tiene una fórmula de Homebrew. Después abre la carpeta del proyecto y activa OpenSpec:</b-why>
  <b-codebox title="Con npm y en el proyecto">
    npm install -g @fission-ai/openspec@latest
    cd your-project
    openspec init
  </b-codebox>
  <b-why align="left"><code>openspec init</code> pregunta qué agentes usas y les instala las skills de OpenSpec en una carpeta común <code>.agents/skills/</code>. En Claude Code y la mayoría de los agentes se invocan como <code>/openspec-propose</code>, en Codex como <code>$openspec-propose</code>, o basta con pedirlo con palabras<b-proof href="https://github.com/Fission-AI/OpenSpec" quote="OpenSpec: «These are skills. Most tools invoke them as /openspec-propose and Codex as $openspec-propose, or you can ask for the work in plain words. … Coming from 1.x and its /opsx:* commands? See Upgrade to 2.0» — github.com/Fission-AI/OpenSpec"/>. En la versión 1.x esos mismos pasos se llamaban <code>/opsx:propose</code>, <code>/opsx:apply</code>, <code>/opsx:archive</code>; para pasar a 2.0, ejecuta <code>openspec update</code> en cada proyecto. En el resto del artículo se usa la grafía de Claude Code.</b-why>
  <b-why align="left">Si el proyecto usa varios agentes, por ejemplo una parte del equipo trabaja en Cursor y otra en Claude Code, selecciónalos todos: el plan del cambio es común, y cada agente recibe sus propios comandos. El programa es gratuito, se ejecuta en local y no necesita cuenta.</b-why>
  <b-finding>
    <ex>Dos comandos: uno instala el programa, el otro prepara el proyecto y conecta los agentes.</ex>
    <gen>No hace falta configurarlo a mano: OpenSpec tiene un prompt listo con el que el agente instala el programa, ejecuta <code>openspec init</code> y comprueba el resultado.</gen>
    <do>Pide al agente: «Instala OpenSpec y ejecuta openspec init en este proyecto, muestra qué comandos aparecieron».</do>
  </b-finding>
</b-chapter>

<b-chapter id="flow" icon="list-arrow" title="Tres comandos: plan, código, fusión">
  <b-why align="left">El trabajo gira en torno a un ciclo de tres comandos. Antes de ellos puedes pensar en voz alta con <code>/openspec-explore</code>: el agente lee el código, propone opciones y no cambia nada. Cuando está claro qué hacer, empieza el camino principal.</b-why>
  <iso-art name="openspec/loop"></iso-art>
  <b-why align="left">Lee el ciclo en el sentido de las agujas del reloj. El primer comando, <code>/openspec-propose</code>, pide al agente que escriba un plan: crea una carpeta de cambio y cuatro archivos. Entonces te toca a ti: lees el plan y lo editas en el chat o directamente en los archivos. Este es el principal punto de control, porque corregir un párrafo de texto es más barato que reescribir código terminado. El segundo comando, <code>/openspec-apply-change</code>, inicia el trabajo según las tareas: el agente toma las tareas de <code>tasks.md</code> una por una y marca cada una. El tercer comando, <code>/openspec-archive-change</code>, cierra el cambio: los requisitos pasan a las specs compartidas y la carpeta va al archivo con todo su historial de decisiones. El siguiente cambio parte de las specs actualizadas.</b-why>
  <b-why align="left">Así se ve una sesión corta en el terminal. Una sesión de ejemplo basada en la demostración de la descripción de OpenSpec<b-proof href="https://github.com/Fission-AI/OpenSpec" quote="OpenSpec: «You: /openspec-propose add-dark-mode / AI: Created openspec/changes/add-dark-mode/ ✓ proposal.md ✓ specs/ ✓ design.md ✓ tasks.md … You: /openspec-archive-change / AI: Archived to openspec/changes/archive/… Specs updated.» — github.com/Fission-AI/OpenSpec"/>:</b-why>
  <b-agent-term app="Claude&#8203; Code" ver="v2" model="OpenSpec 2.0 · skills" path="~/projects/shop">
    <line kind="ask">/openspec-propose add-dark-mode</line>
    <line kind="act">Created openspec/changes/add-dark-mode/</line>
    <line kind="out">proposal.md · specs/ · design.md · tasks.md</line>
    <line kind="you" note="revisas el plan">Añade un escenario: el tema se conserva al recargar</line>
    <line kind="ask">/openspec-apply-change</line>
    <line kind="act">1.1 theme context ✓ · 1.2 toggle ✓ · 2.1 colours ✓</line>
    <line kind="out">all tasks complete</line>
    <line kind="ask">/openspec-archive-change</line>
    <line kind="act">Los requisitos pasaron a openspec/specs y la carpeta del cambio al archivo</line>
  </b-agent-term>
  <b-table>
  | Comando | Qué hace el agente | Qué aparece en el proyecto | Qué haces tú |
  |---|---|---|---|
  | <code>/openspec-explore</code> | lee el código, propone opciones | nada | eliges una opción |
  | <code>/openspec-propose</code> | escribe el plan del cambio | una carpeta <code>openspec/changes/name/</code> con cuatro archivos | lees y editas el plan |
  | <code>/openspec-apply-change</code> | escribe código según las tareas, las marca | código y pruebas | compruebas el resultado |
  | <code>/openspec-archive-change</code> | fusiona los requisitos en las specs compartidas | <code>openspec/specs</code> actualizado, la carpeta archivada | nada, es el final |
  </b-table>
  <b-why align="left">Para tareas grandes hay un conjunto ampliado: crear un cambio paso a paso, continuar uno en curso, verificar el código contra la spec. Se activa con <code>openspec config profile</code> y se aplica en el proyecto con <code>openspec update</code>.</b-why>
  <b-finding>
    <ex>Tras archivar, <code>openspec/specs</code> contiene la descripción actual del sistema, y el historial de decisiones está en el archivo de cambios.</ex>
    <gen>Las specs se actualizan en el mismo paso que el código, así que no se quedan obsoletas como una wiki aparte.</gen>
    <do>No te saltes el archivado: sin él, el siguiente cambio se apoya en requisitos antiguos.</do>
  </b-finding>
</b-chapter>

<b-chapter id="example" icon="notebook" title="Ejemplo: un cambio en el repositorio del sitio urvanov.com">
  <b-why align="left">Este ejemplo sale del repositorio de urvanov.com, el sitio donde se publica este artículo. El código del sitio tiene una carpeta <code>openspec/</code> donde se guarda este cambio. El sitio tiene un <a href="/patterns">catálogo de patrones de IA</a>: 73 técnicas para trabajar con agentes de IA, agrupadas en 10 temas como contexto y memoria, orquestación, seguridad y control de calidad. Cada técnica se muestra como una tarjeta. El catálogo se hizo como complemento de la charla «Spec-Driven Development en la práctica» en la conferencia Podlodka Crew.</b-why>
  <b-why align="left">El problema: al hacer clic, 72 de las 73 tarjetas mostraban solo un nombre y una línea de descripción. Cada tarjeta debía abrirse completa: qué problema resuelve la técnica, cómo funciona, una cita de un profesional, cuándo funciona y cuándo falla. El material ya existía en notas de investigación; había que pasarlo con cuidado, sin inventar nada. El cambio se llamó <code>fill-all-pattern-details</code>. Esto es lo que el agente escribió en sus cuatro archivos:</b-why>
  <b-table>
  | Archivo | Qué contenía |
  |---|---|
  | <code>proposal.md</code> | por qué: el catálogo es una parte clave de la charla y las tarjetas vacías la estropean; qué cambia: las 73 técnicas reciben una descripción detallada |
  | <code>design.md</code> | una tarea por categoría de patrones; citas solo del archivo fuente, nada inventado; un diagrama solo donde hay un flujo de datos |
  | <code>specs/pattern-detail/spec.md</code> | el requisito «cada patrón tiene un detalle rellenado» y tres escenarios para mostrar una tarjeta |
  | <code>tasks.md</code> | 10 tareas para 10 categorías, todas marcadas |
  </b-table>
  <b-why align="left">Abajo hay un fragmento del archivo de requisitos. SHALL marca un requisito obligatorio. Un Scenario es una comprobación: WHEN describe la situación, THEN lo que debe ocurrir. Aquí detail es la descripción completa de una técnica, y problem y solution son sus partes de «problema» y «solución».</b-why>
  <b-codebox title="Un extracto de requisito de specs/pattern-detail/spec.md">
    ## MODIFIED Requirements
    ### Requirement: Pattern detail content structure
    All patterns in all categories SHALL have a filled detail.
    #### Scenario: Partial content
    - WHEN the user opens a pattern that has only problem and solution
    - THEN the card shows only those sections, with no empty blocks
  </b-codebox>
  <b-why align="left">La decisión de «citas solo de la fuente» se escribió en design.md antes del código. Así el agente no inventó citas donde no las había, y el escenario de «contenido parcial» fijó de antemano cómo se ve una tarjeta sin cita ni diagrama.</b-why>
  <b-why align="left">El trabajo ocupó 10 tareas, una por tema del catálogo. Las 10 tareas están marcadas, pero el comando de archivado nunca se ejecutó: la carpeta del cambio sigue en <code>openspec/changes</code>, y el sitio no tiene specs compartidas. Es un error común. El requisito «cada técnica tiene una descripción detallada» vive solo en el borrador del cambio, y el siguiente agente que lea las specs compartidas no sabrá de él. Un solo comando <code>/openspec-archive-change</code> lo habría movido a las specs compartidas.</b-why>
  <b-finding>
    <ex>El escenario de «contenido parcial» apareció en el plan antes del código y fijó cómo se comporta una tarjeta sin cita ni diagrama.</ex>
    <gen>Los requisitos con escenarios «cuando — entonces» se leen como pruebas: el agente sabe qué cuenta como terminado.</gen>
    <do>En cada requisito escribe al menos un escenario para un caso límite: datos vacíos, datos parciales, un error.</do>
  </b-finding>
</b-chapter>

<b-chapter id="kit" icon="crosshair" title="OpenSpec o Spec Kit">
  <b-why align="left">Ambos guían el desarrollo con una especificación, pero ven el orden de forma distinta. Spec Kit de GitHub recorre las fases estrictamente una tras otra. OpenSpec permite volver al plan en cualquier momento y está pensado para un proyecto donde ya existe código<b-proof href="https://github.com/Fission-AI/OpenSpec" quote="OpenSpec: «fluid not rigid → iterative not waterfall → easy not complex → built for brownfield not just greenfield» — github.com/Fission-AI/OpenSpec"/>.</b-why>
  <b-table>
  | | OpenSpec | Spec Kit |
  |---|---|---|
  | Orden de los pasos | flexible: puedes volver al plan en cualquier momento | fases fijas: principios, spec, plan, tareas, código |
  | Dónde viven las specs | <code>openspec/specs</code> y carpetas de cambio | una carpeta de función con una spec, un plan y tareas |
  | Qué proyecto | encaja con código que ya funciona | encaja con una función nueva desde cero |
  | Varios repositorios | un almacén de planes compartido (Stores, beta) | cada repositorio por su cuenta |
  | Creado por | Fission AI | GitHub |
  </b-table>
  <b-finding>
    <ex>OpenSpec se describe a sí mismo como flexible y pensado para código existente.</ex>
    <gen>Spec Kit te guía por pasos y encaja con un equipo que necesita disciplina. OpenSpec es más ligero y se asienta más rápido en un proyecto donde ya existe código.</gen>
    <do>Para cambios en un proyecto en marcha empieza con OpenSpec; para una función nueva grande desde cero, prueba los dos con una misma tarea.</do>
  </b-finding>
</b-chapter>

<b-chapter id="start" icon="flag" title="Cómo empezar">
  <b-why align="left">Empieza con un cambio pequeño que ibas a hacer de todos modos. Cinco prompts para el agente, uno por paso: pégalos en Claude Code, Codex o Cursor y rellena tu tarea.</b-why>
  <b-hdd-steps>
    <step t="Instalación">«Instala OpenSpec y ejecuta openspec init en este proyecto. Muestra qué comandos aparecieron»</step>
    <step t="Exploración">«/openspec-explore Quiero añadir … Mira el código y propón dos opciones sin cambiar nada»</step>
    <step t="Plan">«/openspec-propose … Primero solo el plan. Da escenarios para datos vacíos y parciales en los requisitos»</step>
    <step t="Código">«/openspec-apply-change Haz las tareas una por una y ejecuta las pruebas después de cada una»</step>
    <step t="Fusión">«/openspec-archive-change Pasa los requisitos a las specs y muestra qué cambió en openspec/specs»</step>
  </b-hdd-steps>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Preguntas frecuentes">
  <b-faq-cards>
    <q t="¿Qué es OpenSpec?">Un framework gratuito y de código abierto de Fission AI para el desarrollo guiado por especificaciones. El agente escribe un plan del cambio en archivos Markdown, tú lo revisas, el agente escribe el código y los requisitos se fusionan en las specs compartidas del proyecto.</q>
    <q t="¿Cómo se instala OpenSpec?">Con curl -fsSL https://openspec.dev/cli/install.sh | sh en macOS y Linux, o con npm install -g @fission-ai/openspec@latest. Después ejecuta openspec init en la carpeta del proyecto.</q>
    <q t="¿En qué se diferencia OpenSpec de Spec Kit?">OpenSpec es más flexible y está pensado para código que ya funciona; los pasos pueden repetirse en cualquier orden. Spec Kit de GitHub recorre fases fijas: principios, spec, plan, tareas, código.</q>
    <q t="¿Con qué agentes funciona OpenSpec?">Claude Code, Codex, Cursor, GitHub Copilot y otros, más de 30 en total. openspec init instala comandos para los agentes que elijas.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Seguir leyendo">
  <b-links>
    <item href="/blog/specs-rules-skills/" k="Contexto" t="AGENTS.md y CLAUDE.md">qué debe saber un agente sobre un proyecto y dónde guardarlo</item>
    <item href="/blog/specs-by-aggregates/" k="Specs" t="Specs por agregados">cómo dividir los requisitos en partes</item>
    <item href="/blog/spec-reconcile-loop/" k="Specs" t="Un ciclo de reconciliación para specs">cómo mantener de acuerdo la spec y el código</item>
    <item href="/materials/glossary/spec-driven-development/" k="Término" t="Spec-Driven Development">qué es el desarrollo guiado por especificaciones</item>
  </b-links>
</b-chapter>
</b-post>
