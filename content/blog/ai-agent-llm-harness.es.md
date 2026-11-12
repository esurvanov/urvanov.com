---
title: Agente de IA = LLM + harness: diferencia entre LLM, harness y agente y qué incluye el harness
date: 2026-10-12
updated: 2026-11-13
description: Agente de IA = LLM + harness. LLM, harness y agente en una sola tabla, los cinco grupos que incluye un harness y por qué el mismo modelo se comporta distinto en un chat y en Claude Code.
tags: IA, agentes, agente de IA, LLM, harness, harness del agente, ingeniería de harness
category: harness
layout: wide
mentions: AI agent, LLM, agent harness, harness engineering, agent loop, MCP, Claude Code, Codex, ChatGPT
toc: formula=Agente = LLM + harness | concepts=Cinco conceptos | table=LLM, harness y agente | parts=Qué incluye el harness | same=El mismo modelo | example=Ejemplo | loop=Cómo funciona | when=Qué elegir | faq=FAQ | next=Sigue leyendo
---

Un agente de IA es un LLM más un harness (arnés del agente): el LLM solo razona y escribe texto, y el harness es todo lo que lo rodea y le permite actuar: un ciclo de pasos, herramientas, contexto, reglas y comprobaciones. Juntos llevan una tarea hasta un resultado, mientras que un LLM solo responde. Abajo: LLM, harness y agente en una tabla, los cinco grupos que incluye un harness y el mismo modelo en dos harness.

<b-post series="harness">
<b-chapter id="formula" icon="target-dot" title="Agente = LLM + harness">
<b-why align="left">Un <a href="/materials/glossary/llm/">LLM</a> solo continúa texto. El <a href="/materials/glossary/harness/">harness</a> es todo lo que lo rodea: el ciclo de pasos, las herramientas, el acceso a archivos y servicios, las reglas y las comprobaciones. Juntos forman un <a href="/materials/glossary/ai-agent/">agente de IA</a>.</b-why>
<b-lane-art names="ai-agent-llm-harness/formula"/>
<b-finding>
  <ex>El mismo modelo Claude responde en un chat y edita código en Claude Code. La diferencia es el harness.</ex>
  <gen>Las aplicaciones de chat, los asistentes y los agentes pueden funcionar con los mismos modelos. Lo que los distingue es lo que rodea al modelo.</gen>
  <do>Cuando compares productos de IA, compara harness: qué puede hacer el producto por su cuenta y dónde.</do>
</b-finding>
</b-chapter>
<b-chapter id="concepts" icon="table-cols" title="Cinco conceptos en una tabla">
<b-why align="left">Las columnas se comparan mejor en la fila «Quién conduce la tarea». Las definiciones de asistente y agente siguen a <a href="https://www.ibm.com/think/topics/ai-agents-vs-ai-assistants" target="_blank" rel="noopener">IBM</a>: los asistentes son reactivos y realizan tareas a petición tuya, mientras que los agentes son sobre todo proactivos y planifican y actúan por su cuenta hacia un objetivo.</b-why>
<b-table>
<table><thead><tr><th></th><th>LLM</th><th>Chat</th><th>Chatbot</th><th>Asistente</th><th>Agente de IA</th></tr></thead><tbody><tr><td>Para qué sirve</td><td>el motor dentro de los productos</td><td>cualquier pregunta y texto</td><td>preguntas típicas de una empresa</td><td>tus gestiones en las aplicaciones</td><td>una tarea hasta el resultado</td></tr><tr><td>Quién conduce la tarea</td><td>—</td><td>tú</td><td>un guion</td><td>tú, comando a comando</td><td><b>el propio agente</b></td></tr><tr><td>Entiende el habla libre</td><td><b-tag-inline kind="ok">sí</b-tag-inline></td><td><b-tag-inline kind="ok">sí</b-tag-inline></td><td><b-tag-inline kind="muted">en parte</b-tag-inline></td><td><b-tag-inline kind="ok">sí</b-tag-inline></td><td><b-tag-inline kind="ok">sí</b-tag-inline></td></tr><tr><td>Actúa en aplicaciones</td><td><b-tag-inline kind="no">no</b-tag-inline></td><td><b-tag-inline kind="muted">en parte</b-tag-inline></td><td><b-tag-inline kind="muted">en parte</b-tag-inline></td><td><b-tag-inline kind="ok">sí</b-tag-inline></td><td><b-tag-inline kind="ok">sí</b-tag-inline></td></tr><tr><td>Elige pasos y comprobaciones por su cuenta</td><td><b-tag-inline kind="no">no</b-tag-inline></td><td><b-tag-inline kind="no">no</b-tag-inline></td><td><b-tag-inline kind="no">no</b-tag-inline></td><td><b-tag-inline kind="no">no</b-tag-inline></td><td><b-tag-inline kind="ok">sí</b-tag-inline></td></tr><tr><td>Lo crean</td><td>proveedores de modelos</td><td>proveedores, a menudo junto con el modelo, y agregadores</td><td>constructores sin código para empresas</td><td>plataformas: sistema operativo, ofimática, buscadores</td><td>agentes industriales para el trabajo</td></tr><tr><td>Ejemplo</td><td><a href="/materials/glossary/openai/">GPT</a>, <a href="/materials/glossary/anthropic/">Claude</a>, <a href="/materials/glossary/deepseek/">DeepSeek</a></td><td><a href="/materials/glossary/openai/">ChatGPT</a>, <a href="/materials/glossary/anthropic/">Claude</a>; agregadores: <a href="https://poe.com/" target="_blank" rel="noopener">Poe</a>, <a href="https://openrouter.ai/" target="_blank" rel="noopener">OpenRouter</a></td><td><a href="https://vivochat.ai/" target="_blank" rel="noopener">vivochat.ai</a>, un bot de atención de un banco</td><td><a href="/materials/glossary/yandex/">Alice</a>, <a href="/materials/glossary/microsoft/">Copilot</a></td><td><a href="/materials/glossary/claude-code/">Claude Code</a>, <a href="/materials/glossary/codex/">Codex</a>, <a href="/materials/glossary/cursor/">Cursor</a></td></tr></tbody></table>
</b-table>
<b-why align="left" top="10"><b>Chatbot y asistente.</b> Un chatbot responde en nombre de una empresa según un guion: botones, palabras clave, traspaso a un operador. Algunos bots funcionan con un LLM, pero los límites siguen siendo los mismos. Un asistente entiende cualquier petición y la ejecuta en tus aplicaciones: un correo, un recordatorio, una búsqueda. Cada paso siguiente es una orden nueva tuya.</b-why>
<b-why align="left" top="6"><b>Los agentes de hoy son industriales:</b> para código, datos, atención al cliente. Aún no existen agentes en la nube para todo el mundo. Observación de los proyectos del autor.</b-why>
<b-finding>
  <ex>Un bot de banco responde sobre comisiones. Alice pone un recordatorio cuando se lo ordenas. Un agente recibe el objetivo «prepara la versión» y decide qué leer, qué ejecutar y cuándo parar.</ex>
  <gen>Un chatbot sigue el guion de la empresa, un asistente sigue tus órdenes, un agente se conduce a sí mismo. El modelo de dentro puede ser el mismo.</gen>
  <do>Pregunta sobre un producto: ¿quién elige el siguiente paso? Un guion significa bot, tú significa asistente o chat, el propio producto significa agente.</do>
</b-finding>
</b-chapter>
<b-chapter id="table" icon="table-cols" title="LLM, harness y agente">
<b-why align="left">Qué tiene cada uno de los tres. La columna del agente es la suma de las dos primeras.</b-why>
<b-table>
<table><thead><tr><th></th><th>LLM</th><th>Harness</th><th>Agente de IA</th></tr></thead><tbody><tr><td><a href="/materials/glossary/llm/">Modelo</a> que razona en texto</td><td><b-tag-inline kind="ok">tiene</b-tag-inline></td><td><b-tag-inline kind="no">no tiene</b-tag-inline></td><td><b-tag-inline kind="ok">tiene</b-tag-inline></td></tr><tr><td><a href="/materials/glossary/agent-loop/">Ciclo</a>: paso, acción, observación</td><td><b-tag-inline kind="no">no tiene</b-tag-inline></td><td><b-tag-inline kind="ok">tiene</b-tag-inline></td><td><b-tag-inline kind="ok">tiene</b-tag-inline></td></tr><tr><td><a href="/materials/glossary/tool/">Herramientas</a> y <a href="/materials/glossary/mcp/">MCP</a></td><td><b-tag-inline kind="no">no tiene</b-tag-inline></td><td><b-tag-inline kind="ok">tiene</b-tag-inline></td><td><b-tag-inline kind="ok">tiene</b-tag-inline></td></tr><tr><td><a href="/materials/glossary/context/">Contexto</a> y <a href="/materials/glossary/memory/">memoria</a></td><td><b-tag-inline kind="no">no tiene</b-tag-inline></td><td><b-tag-inline kind="ok">tiene</b-tag-inline></td><td><b-tag-inline kind="ok">tiene</b-tag-inline></td></tr><tr><td>Reglas: <a href="/materials/glossary/claude-md/">CLAUDE.md</a>, <a href="/materials/glossary/agents-md/">AGENTS.md</a>, <a href="/materials/glossary/agent-skills/">skills</a></td><td><b-tag-inline kind="no">no tiene</b-tag-inline></td><td><b-tag-inline kind="ok">tiene</b-tag-inline></td><td><b-tag-inline kind="ok">tiene</b-tag-inline></td></tr><tr><td><a href="/materials/glossary/permissions/">Permisos</a>, <a href="/materials/glossary/sandbox/">sandbox</a>, <a href="/materials/glossary/hooks/">hooks</a></td><td><b-tag-inline kind="no">no tiene</b-tag-inline></td><td><b-tag-inline kind="ok">tiene</b-tag-inline></td><td><b-tag-inline kind="ok">tiene</b-tag-inline></td></tr><tr><td><a href="/materials/glossary/checks/">Comprobaciones</a> y <a href="/materials/glossary/human-in-the-loop/">persona en el circuito</a></td><td><b-tag-inline kind="no">no tiene</b-tag-inline></td><td><b-tag-inline kind="ok">tiene</b-tag-inline></td><td><b-tag-inline kind="ok">tiene</b-tag-inline></td></tr><tr><td>Actúa por su cuenta</td><td><b-tag-inline kind="no">no tiene</b-tag-inline></td><td><b-tag-inline kind="no">no tiene</b-tag-inline></td><td><b-tag-inline kind="ok">tiene</b-tag-inline></td></tr></tbody></table>
</b-table>
<b-finding>
  <ex>Un harness sin modelo tiene herramientas pero nadie que elija entre ellas. Un modelo sin harness elige pero no puede actuar.</ex>
  <gen>Ninguna de las dos mitades es un agente por sí sola. Agente = modelo + harness funciona como definición: quita cualquiera de los dos lados y el agente desaparece.</gen>
  <do>Nombra el harness del agente que usas: dónde viven su ciclo, sus herramientas, sus reglas y sus comprobaciones.</do>
</b-finding>
</b-chapter>
<b-chapter id="parts" icon="cube" title="Qué incluye el harness: cinco grupos">
<b-arrow-rows>
  <row t="Ciclo" color="accent">ciclo del agente, orquestación de subagentes</row>
  <row t="Alcance" color="accent">herramientas, servidores MCP, sandbox, navegador</row>
  <row t="Conocimiento" color="accent">contexto, memoria, CLAUDE.md / AGENTS.md, skills</row>
  <row t="Control" color="warn">permisos, hooks, aprobación humana de los pasos arriesgados</row>
  <row t="Verificación" color="warn">pruebas, linters, logs y trazas</row>
</b-arrow-rows>
<b-finding>
  <ex>Claude Code: el ciclo en la CLI, las herramientas mediante MCP, las reglas en CLAUDE.md, el control mediante permisos y hooks, la verificación mediante tus pruebas.</ex>
  <gen>En la práctica, la mayoría de los fallos de un agente se remontan a uno de los cinco grupos: una herramienta que falta, un contexto que falta o una comprobación que falta.</gen>
  <do>Cuando el agente falle, pregunta qué grupo faltaba y arréglalo ahí en lugar de reescribir el prompt.</do>
</b-finding>
</b-chapter>
<b-chapter id="same" icon="chart-line" title="El mismo modelo, distinto harness">
<b-table>
<table><thead><tr><th>Modelo</th><th>Harness de chat</th><th>Harness de agente</th></tr></thead><tbody><tr><td>Claude</td><td>Claude en el navegador: conversación, sin acceso al proyecto</td><td>Claude Code: lee el repositorio, edita archivos, ejecuta comandos</td></tr><tr><td>GPT</td><td>ChatGPT: conversación, sin acceso al proyecto</td><td>Codex: trabaja en el repositorio, ejecuta pruebas, abre pull requests</td></tr></tbody></table>
</b-table>
<b-why align="left" top="10">Un estudio en ICML 2026 encontró que elegir el mejor harness da mejoras comparables a elegir el mejor modelo. <a href="https://icml.cc/virtual/2026/68323" target="_blank" rel="noopener">Fuente</a></b-why>
<b-finding>
  <ex>Pasar de un chat a Claude Code cambia solo el harness, y la tarea pasa de un consejo a un cambio terminado.</ex>
  <gen>La elección del modelo y la del harness pesan más o menos lo mismo. Los equipos que solo comparan modelos se pierden la mitad del resultado.</gen>
  <do>Antes de cambiar de modelo, prueba un harness más potente con el modelo que ya tienes.</do>
</b-finding>
</b-chapter>
<b-chapter id="example" icon="arrow-right" title="Ejemplo: qué ve cada uno del proyecto">
<b-why align="left">Una tarea, «arregla la prueba que falla», y cinco programas. La franja bajo las partes del proyecto muestra lo que ve cada uno. Lo que no ve, lo adivina o te lo devuelve a ti.</b-why>
<b-lane-art names="ai-agent-llm-harness/example"/>
<b-sublabel top="18">Por qué un LLM se equivoca a ciegas</b-sublabel>
<b-arrow-rows>
  <row t="Qué ve" color="muted">solo tu texto: sin código, sin prueba, sin error</row>
  <row t="Qué hace" color="warn">rellena de forma verosímil lo que falta: inventa archivos, funciones, bibliotecas</row>
  <row t="1 de cada 5" color="warn">los nombres de bibliotecas en código escrito por LLM no existen: 19,7 % en 576 000 muestras de código de 16 modelos (<a href="https://arxiv.org/abs/2406.10279" target="_blank" rel="noopener">Spracklen et al.</a>)</row>
  <row t="0–7 % frente a 31 %" color="accent">de tareas reales resueltas: un modelo en una sola pasada, incluso con los archivos correctos, frente a un agente con un ciclo «ejecutar, comprobar» (<a href="https://arxiv.org/abs/2602.16069" target="_blank" rel="noopener">Raju et al., 2026</a>)</row>
</b-arrow-rows>
<b-finding>
  <ex>Un agente recorre por sí solo todo el ciclo «ejecutar, leer, corregir, comprobar». Los demás te pasan esos pasos a ti.</ex>
  <gen>Cuantos más pasos necesita una tarea en tus sistemas, más gana un agente. Para una respuesta a una pregunta, un chat es más rápido y barato.</gen>
  <do>Cuenta cuántas veces copias entre ventanas en una tarea típica. Si son más de dos, prueba un agente.</do>
</b-finding>
</b-chapter>
<b-chapter id="loop" icon="swap-hm" title="Cómo funciona un agente de IA: un ciclo hasta el resultado">
<b-why align="left">¿Cómo funciona un agente de IA? Sigue un <a href="/materials/glossary/agent-loop/">ciclo del agente</a>: el modelo elige el siguiente paso, el harness lo ejecuta con una herramienta y devuelve el resultado al modelo. El ciclo se repite hasta que la tarea se resuelve o hace falta una persona. Este esquema «razonar, actuar, observar» se describió en el artículo de ReAct; los agentes de código como Claude Code, Codex y Cursor funcionan igual.</b-why>
<b-arrow-rows>
  <row t="1 · Pensar" color="muted">el modelo lee la tarea, el contexto y los resultados anteriores, y elige un paso</row>
  <row t="2 · Llamar a una herramienta" color="accent">el harness ejecuta un comando, lee un archivo, llama a un servicio</row>
  <row t="3 · Mirar el resultado" color="accent">la salida del comando, el texto de un error o la respuesta de un servicio vuelven al modelo</row>
  <row t="4 · Decidir" color="warn">terminado significa salir; un error significa volver al paso 1; un paso arriesgado significa preguntar a una persona</row>
</b-arrow-rows>
<b-lane-art names="term:agent-loop"/>
<b-finding>
  <ex>Una prueba falla: el agente lee el error y hace una edición nueva sin una orden tuya.</ex>
  <gen>Un ciclo sin comprobaciones se convierte en una serie de conjeturas. Por eso las pruebas, los linters y la aprobación humana de los pasos arriesgados forman parte del harness.</gen>
  <do>Dale al agente una forma de comprobarse a sí mismo: un comando de pruebas, un criterio de terminado, acceso a los logs.</do>
</b-finding>
</b-chapter>
<b-chapter id="when" icon="shield-check" title="Cuándo basta un chat y cuándo hace falta un agente">
<b-lane-art names="ai-agent-llm-harness/choose"/>
<b-table>
<table><thead><tr><th>Tarea</th><th>Qué elegir</th><th>Ejemplo en el blog</th></tr></thead><tbody><tr><td>Una pregunta, una explicación, el borrador de un correo</td><td>chat</td><td><a href="/blog/work-prompts-examples/">Prompts para tareas de trabajo</a></td></tr><tr><td>Preguntas típicas de clientes según un guion</td><td>chatbot</td><td>—</td></tr><tr><td>Una acción en una aplicación por voz o comando</td><td>asistente</td><td>—</td></tr><tr><td>Una tarea de varios pasos en código, archivos, servicios</td><td>agente de IA</td><td><a href="/blog/incident-investigation-agent/">Investigación de incidentes con un agente de IA</a><br><a href="/blog/bug-report-to-reproduction-agent/">Trabajo de QA tras el soporte con un agente de IA</a><br><a href="/blog/analytics-reports-agent/">Informes de analítica con un agente de IA</a></td></tr><tr><td>Pasos con dinero, accesos, publicación</td><td>agente + aprobación humana</td><td><a href="/blog/agent-hands-work-back-to-you/#human">¿Te quitarán el trabajo los agentes de IA?</a><br><a href="/blog/data-plane-control-plane-prompt-injection/">Plano de datos y plano de control del agente</a></td></tr></tbody></table>
</b-table>
<b-finding>
  <ex>Un correo a un cliente es un chat. Encontrar una tarea en Jira, corregir el código y abrir un merge request es un agente.</ex>
  <gen>En una pregunta sencilla un agente es más lento y cuesta más: lee contexto y da pasos. En una tarea de varios pasos te ahorra las manos.</gen>
  <do>Elige una tarea de varios pasos de la semana y dásela entera a un agente.</do>
</b-finding>
</b-chapter>
<b-chapter id="faq" icon="check-circle" title="FAQ">
<b-faq-cards>
  <q t="Agente de IA frente a asistente: ¿cuál es la diferencia?">Un asistente ejecuta tu petición mediante funciones fijas: una acción cada vez. Un agente recibe un objetivo, planifica los pasos por sí mismo, elige herramientas y comprueba el resultado.</q>
  <q t="¿Agente de IA frente a chatbot?">Un chatbot responde según un guion o desde una base de respuestas. Un agente actúa en tus sistemas y comprueba el resultado.</q>
  <q t="Agente de IA frente a LLM: ¿cuál es la diferencia?">Un LLM genera texto. Un agente de IA es un LLM dentro de un harness que convierte ese texto en acciones y comprueba el resultado.</q>
  <q t="¿Qué es el harness de un agente?">Todo el código y la configuración alrededor del modelo que no es el modelo: ciclo, herramientas, contexto, reglas, permisos y comprobaciones.</q>
  <q t="¿Harness frente a framework?">Un framework da piezas para escribir un agente. Un harness es la capa en ejecución que lleva el ciclo y lo controla.</q>
  <q t="¿Cómo funciona un agente de IA?">En un ciclo: el modelo elige un paso, el harness lo ejecuta y el resultado vuelve al modelo. El ciclo sigue hasta que la tarea se resuelve o hace falta una persona.</q>
  <q t="¿Es ChatGPT un agente?">En un chat normal es una aplicación de chat. En el modo agente y en Codex, el mismo modelo recibe un harness de acción, lo que lo convierte en un agente.</q>
</b-faq-cards>
</b-chapter>
<b-chapter id="next" icon="arrow-right" title="Sigue leyendo">
  <b-links>
    <item href="/materials/glossary/harness/" k="Término" t="Harness">cada parte, con enlaces</item>
    <item href="/blog/harness-driven-development/" k="Práctica" t="Ingeniería de harness">convertir los errores en reglas</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="Elección" t="Claude Code, Codex, Cursor">qué agente elegir</item>
  </b-links>
</b-chapter>
</b-post>
