---
title: ¿Te quitará el trabajo un agente de IA?: depende de quién carga trabajo sobre quién, tú sobre los agentes o los agentes sobre ti
date: 2026-10-05
updated: 2026-11-08
description: ¿Un agente de IA te quitará el trabajo? En la práctica, a menudo te pide que ejecutes un comando, busques una tarea o copies un archivo. Qué hace el agente por sí mismo, qué se queda contigo y cómo dejar de ser el mensajero entre ventanas.
tags: IA, agentes, empleo, carrera, futuro del trabajo, delegación, MCP, harness
category: harness
layout: wide
mentions: AI replacing jobs, will AI take my job, AI agent, future of work, delegation, MCP, Claude Code, CLAUDE.md, harness, human-in-the-loop
toc: what=¿Te quitará el trabajo? | phrases=Frases señal | lazy=Por qué se alarga | hard=Complejidad real | fix=Cómo quitar el hábito | human=Qué se queda contigo | faq=FAQ | next=Seguir leyendo
---

¿Te quitarán el trabajo los agentes de IA? Se llevan la rutina y te devuelven parte del trabajo: te piden que ejecutes un comando, busques una tarea, copies un archivo. Abajo: qué hace el agente por sí mismo, cómo reconocer esas peticiones, qué responder, cómo escribir una regla y qué se queda de verdad con la persona. Relacionado: [MCP para un agente de IA](/blog/mcp-agent-access/).

<b-post series="harness">
<b-chapter id="what" icon="swap-hm" title="¿Te quitará el trabajo un agente?">
<b-why align="left">El agente asume la rutina y te devuelve parte del trabajo: te pide que ejecutes, busques y copies lo que él mismo puede hacer.</b-why>
<b-lane title="Quién hace el trabajo" color="accent">
<b-scene names="agent-hands-work-back-to-you/before-after"/>
</b-lane>
<b-finding>
  <ex>El agente escribe: «Ejecuta el comando y envíame la salida». Puede ejecutarlo y leer la salida él mismo.</ex>
  <gen>La rutina pasa al agente, mientras que las decisiones y la responsabilidad se quedan con las personas. Según la experiencia del autor, un agente también elige el camino en el que la persona hace el trabajo, y cada petición así te devuelve al papel de mensajero entre ventanas.</gen>
  <do k="Qué hacer">Dale al agente la rutina y quédate con las decisiones. ¿Notas una petición de «hazlo tú»? Responde: «Hazlo tú mismo».</do>
</b-finding>
</b-chapter>
<b-chapter id="phrases" icon="check-circle" title="Frases señal">
<b-why align="left">Dos peticiones del agente y la respuesta «hazlo tú mismo». Puede con ambas.</b-why>
<b-agent-term app="Claude&#8203; Code" ver="v2.1" model="Sonnet 5.5 · Claude Max" path="~/projects/shop">
  <line kind="ask">Arregla la prueba que falla</line>
  <line kind="req" note="el agente te pide a ti">Ejecuta `npm test` y envíame la salida.</line>
  <line kind="you" note="tú: hazlo tú mismo">Ejecútalo tú mismo y lee la salida.</line>
  <line kind="act">Bash(npm test)</line>
  <line kind="out">2 failed: auth.test.ts</line>
  <line kind="act">Encontré la causa en auth.ts, la corrijo.</line>
  <line kind="ask">¿Qué hay en la tarea PAY-142?</line>
  <line kind="req" note="el agente te pide a ti">Abre Ji&#8203;ra y busca la tarea.</line>
  <line kind="you" note="tú: hazlo tú mismo">Búscala tú mismo mediante M&#8203;CP.</line>
  <line kind="act">jira.get_issue(PAY-142)</line>
  <line kind="out">pasos, comentarios, historial</line>
  <line kind="act">La leí. Los pasos son: …</line>
</b-agent-term>
<b-finding>
  <ex>El agente pide abrir Jira. Respondes «Búscala tú mismo mediante MCP» y obtienes la tarea entera.</ex>
  <gen>Detrás de cada frase hay una acción que el agente puede realizar él mismo si tiene acceso.</gen>
  <do k="Qué hacer">Anota las tres frases que oyes con más frecuencia y una respuesta para cada una.</do>
</b-finding>
</b-chapter>
<b-chapter id="lazy" icon="clock" title="Por qué el agente se hace de rogar">
<b-why align="left">El agente estima el esfuerzo de antemano. Según la experiencia del autor, a menudo decide «esto es largo y difícil», sobre todo con las integraciones. A veces acierta, a veces no.</b-why>
<b-embed-frame src="/embed/estimate-check.html?v=27&lang=en" title="Tres jugadas: cómo piensa el agente, cómo piensas tú y cómo es en realidad. La escena 3D y el gráfico funcionan sincronizados" ratio="4/4"/>
<b-finding>
  <ex>Agente: «La integración con Jira llevará mucho». Tú: «Lee una tarea». Un minuto después la tarea está leída.</ex>
  <gen>La estimación del agente sigue siendo una conjetura hasta que un intento la comprueba. Algunas estimaciones son correctas: no hay acceso, hace falta iniciar sesión, una red cerrada.</gen>
  <do k="Qué hacer">Déjale intentarlo siempre primero. ¿Sin resultado en 2–3 intentos? Pídele que divida la tarea en pasos y nombre dónde puede estar el problema. Pregunta al agente por qué no funciona.</do>
</b-finding>
</b-chapter>
<b-chapter id="hard" icon="cube" title="Dónde la complejidad es real">
<b-why align="left">Aquí se parte del <a href="/materials/glossary/osi/">modelo OSI</a>: una petición pasa por siete capas, y las capas pueden vivir en sistemas físicos distintos. La complejidad es real donde hay más capas y sistemas, y donde intervienen varios <a href="/materials/glossary/bounded-context/">bounded contexts</a>, sobre todo si uno de ellos no está bajo control propio. Según la experiencia del autor.</b-why>
<b-why align="left" top="14">La complejidad viene del volumen de investigación. Un servicio propio está abierto: el código y las pruebas están a mano, basta con leer. Un sistema ajeno es una caja negra: cómo funciona solo se descubre sondeando desde fuera.</b-why>
<b-lane title="La clave: cuánta investigación necesitan las cajas negras" color="warn" top="12">
<b-scene names="agent-hands-work-back-to-you/research-volume"/>
</b-lane>
<b-why align="left" top="14">Veamos un ejemplo: dos tareas en un mismo proyecto.</b-why>
<b-view-switch id="vt-hard">
  <view label="Simple"><b-lane title="¿Hacen falta cambios?" color="accent">
<b-scene names="agent-hands-work-back-to-you/whose-changes"/>
</b-lane>
<b-why align="left" top="10">Una sola pregunta: si hacen falta cambios ajenos. Por ejemplo, cambiar los descuentos entre dos servicios propios: todo en la zona propia, no hacen falta cambios, lo hace el agente. Pero en cuanto se toma el stock del sistema de almacén de otro equipo, ese equipo tiene que hacer cambios, y eso ya no es trabajo del agente.</b-why></view>
  <view label="Detallado"><b-lane title="A · descuento: dos servicios propios" color="accent">
<b-scene names="agent-hands-work-back-to-you/layers-discount"/>
</b-lane>
<b-why align="left" top="16">El descuento pasa una capa y se queda en casa. El stock del almacén pasa por las capas del lado ajeno, y cada una necesita un sondeo a ciegas.</b-why>
<b-lane title="B · stock del almacén: camino por tres capas" color="warn" top="16">
<b-scene names="agent-hands-work-back-to-you/layers-warehouse"/>
</b-lane></view>
</b-view-switch>
<b-finding>
  <ex>Un descuento entre servicios propios: todo propio, lo hace el agente. El stock del almacén: el equipo del almacén debe cambiar cosas (acceso, puerto), así que el agente tiene razón en que lleva tiempo.</ex>
  <gen>La clave es cuánto desconocido hay que investigar. Una caja negra no se puede abrir, se comprueba con sondeos desde fuera, y cada capa y cada sistema ajeno añade sondeos así.</gen>
  <do k="Qué hacer">Estima cuántos sondeos a ciegas quedan por delante. ¿Muchos? Divide la tarea por los límites entre sistemas y pide al agente que compruebe uno cada vez.</do>
</b-finding>
</b-chapter>
<b-chapter id="fix" icon="arrow-right" title="Cómo quitar el hábito">
<b-why align="left">El ancla es la biblia del proyecto: una descripción permanente del producto y sus reglas que el agente lee en cada sesión. Tres niveles: acceso, una nota en la biblia, un recordatorio. <a href="https://code.claude.com/docs/en/memory" target="_blank" rel="noopener">Más</a></b-why>
<b-lane-art names="agent-hands-work-back-to-you/project-bible" top="10"/>
<b-step-chain>
  <node t="1">Dar acceso</node>
  <node t="2">Escribirlo en la biblia</node>
  <node t="3">Recordarlo en una frase</node>
</b-step-chain>
<b-section-h3 top="14">Qué escribir en la biblia</b-section-h3>
<b-arrow-rows wide>
  <row t="El agente estima en lugar de hacer" color="accent">Primero intentar, estimar después del intento</row>
  <row t="El intento falló 2–3 veces" color="warn">Dividir la tarea en pasos, nombrar dónde puede estar el problema y explicar por qué no funciona</row>
  <row t="Un sistema ajeno: una caja negra" color="muted">Estudiarlo con sondeos desde fuera y anotar los hallazgos en la biblia para no buscarlos de nuevo</row>
  <row t="Hace falta un inicio de sesión, un secreto, una confirmación, un pago" color="accent">Eso lo hace una persona, tú haces el resto</row>
</b-arrow-rows>
<b-section-h3 top="14">Reglas en la biblia del proyecto</b-section-h3>
<b-code-text wrap>
  Primero intenta, estima después del intento.
  Si el intento falló 2–3 veces: divide la tarea en pasos, nombra dónde puede estar el problema y explica por qué no funciona.
  Estudia un sistema ajeno con sondeos desde fuera y anota aquí los hallazgos.
  Si puedes hacerlo tú mismo, hazlo. Pide a la persona solo lo que la necesita: iniciar sesión, contraseñas, confirmar una escritura, pagos.
</b-code-text>
<b-why align="left">La biblia vive en los archivos <a href="/materials/glossary/claude-md/">CLAUDE.md</a> y <a href="/materials/glossary/agents-md/">AGENTS.md</a>: el agente los lee en cada sesión, pero los trata como contexto y no como un bloqueo duro. Cuanto más concreta y breve es la regla, con más fiabilidad funciona. Los procesos que se repiten se empaquetan como <a href="/materials/glossary/agent-skills/">skills</a>. Más sobre la biblia, las reglas, las specs y las skills: <a href="/blog/specs-rules-skills/">Specs, biblia, reglas y skills</a>.</b-why>
<b-finding>
  <ex>El agente está conectado a Jira y conoce la regla. En lugar de «abre Jira» lee la tarea él mismo.</ex>
  <gen>Sin acceso la regla no ayuda: el agente no puede hacerlo por sí mismo. Por eso primero la conexión, luego la regla.</gen>
  <do k="Qué hacer">Conecta la fuente a la que el agente te manda con más frecuencia y escribe la regla en la biblia del proyecto.</do>
</b-finding>
</b-chapter>
<b-chapter id="human" icon="shield-check" title="Qué se queda contigo">
<b-lane title="El límite" color="accent">
<b-scene names="agent-hands-work-back-to-you/split"/>
</b-lane>
<b-finding>
  <ex>El agente lee la tarea y prepara él mismo un comentario, y publicarlo en Jira ocurre tras tu confirmación.</ex>
  <gen>Lo que se queda con la persona es donde importan la identidad y la responsabilidad: el inicio de sesión, los secretos, la confirmación de una escritura, el dinero.</gen>
  <do k="Qué hacer">Escribe el límite en la regla del proyecto para que el agente ni pregunte de más ni haga de más.</do>
</b-finding>
</b-chapter>
<b-chapter id="faq" icon="check-circle" title="FAQ">
<b-faq-cards>
  <q t="¿Un agente de IA sustituirá a un especialista?">El agente asume los pasos rutinarios. Las decisiones, la responsabilidad y la comprobación del resultado se quedan con la persona.</q>
  <q t="¿Qué trabajo hace el agente por sí mismo?">Lee, busca, copia, ejecuta comandos y escribe borradores, siempre que tenga acceso a los sistemas.</q>
  <q t="¿Qué no hará el agente sin ti?">Iniciar sesión, introducir una contraseña, confirmar una escritura, pagar. Eso se queda con la persona.</q>
  <q t="¿Por qué el agente me pide hacer lo que puede hacer él mismo?">Según la experiencia del autor, elige el camino en el que la persona hace el trabajo. Ayudan el acceso a los sistemas y una regla en las instrucciones del proyecto.</q>
  <q t="¿Cómo trabajar con un agente sin perder profesionalmente?">Entrega la rutina, conserva el planteamiento de tareas y la revisión. Esos pasos se quedan con la persona.</q>
</b-faq-cards>
</b-chapter>
<b-chapter id="next" icon="arrow-right" title="Seguir leyendo">
  <b-links>
    <item href="/blog/mcp-agent-access/" k="MCP" t="MCP para un agente de IA">cómo dar acceso al agente</item>
    <item href="/blog/specs-rules-skills/" k="Reglas" t="Specs, reglas y skills">qué poner en las instrucciones</item>
    <item href="/blog/harness-driven-development/" k="Ciclo de errores" t="Harness-Driven Development">cómo los errores del agente se convierten en reglas</item>
  </b-links>
</b-chapter>
</b-post>
