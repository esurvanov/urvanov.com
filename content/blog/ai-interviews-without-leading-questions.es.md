---
title: Cómo hacer y analizar entrevistas sobre el uso de IA: guion de 30 minutos, prompt de análisis y tabla en Airtable
date: 2026-09-28
updated: 2026-11-13
description: Guion de llamada de 30 minutos, reglas para no salirse del tema, cuestionario breve para toda la empresa, análisis de entrevistas con ChatGPT o un agente con un prompt listo, y comprobación de lo que dicen las personas frente a lo medido en los datos del informe.
tags: IA, custdev, entrevistas
category: research
layout: wide
image: /og/ai-interviews-without-leading-questions.en.png
mentions: Airtable, tl;dv, ChatGPT, Claude Code, Model Context Protocol
toc: format=Elegir el formato | prep=Preparar la reunión | script=Guion de 30 minutos | focus=No salirse del tema | base=Registro en Airtable | agent=Con Claude Code | wording=Texto: redacción | form=Cuestionario | after=Análisis de entrevistas | faq=Preguntas | next=Seguir leyendo
---

Una entrevista sobre el trabajo con IA dura 30 minutos y gira en torno a la última tarea real: qué se hizo, el resultado y el esfuerzo, y después un caso de éxito y otro en que la persona dejó la IA o cambió de herramienta. La persona elige el formato: llamada o texto. Las respuestas se analizan con un prompt en ChatGPT o con un agente de IA, se vuelcan en una tabla de Airtable y se contrastan con los datos de uso. Abajo: el guion, un cuestionario y el prompt de análisis.

<b-post series="intervyu">
<b-credit para>El diseño de las entrevistas se basa en recomendaciones de <a href="https://t.me/Kseniya_Vasil" target="_blank" rel="noopener">@Kseniya_Vasil</a>. Las personas, los grupos y las cifras para las entrevistas salen del <a href="/blog/chatgpt-enterprise-usage-report/">informe de uso de ChatGPT Enterprise</a>. Ahí está también la <a href="/blog/chatgpt-enterprise-usage-report/#why">tarea de negocio</a>: qué decide la empresa, quién decide y según qué señales.</b-credit>
<b-lead tight>Aquí el análisis consta de cuatro pasos: el texto de la conversación va a ChatGPT con el mismo prompt cada vez, la respuesta se copia en la fila de la persona, la tabla se agrupa por dificultad y las repeticiones se comprueban con un cuestionario para toda la empresa. Lo que dicen las personas se compara con los datos del informe. Abajo: el guion de la llamada, la tabla y el <a href="#after">prompt de análisis</a>.</b-lead>
<b-flow label="Dos formatos de entrevista convergen en una tabla">
  <b-lane title="Voz" color="c-chat">
    <node icon="phone" t="Llamada">30 min</node>
    <node icon="record" t='<a href="https://tldv.io/" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline;text-underline-offset:3px">tl;dv</a> · <a href="https://www.granola.ai/" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline;text-underline-offset:3px">Granola</a>'>Notas</node>
    <node icon="file-text" t="Transcripción">A Notas</node>
  </b-lane>
  <b-lane title="Texto" color="c-work">
    <node icon="doc-lines" t="Preguntas">En el chat</node>
    <node icon="chat" t="Seguimiento">1 mensaje</node>
    <node icon="file-text" t="Registro del chat">Copiado a Notas</node>
  </b-lane>
  <b-drop-arrows n="2"/>
  <b-airtable-preview icon="table" title='<a href="https://airtable.com" target="_blank" rel="noopener">Airtable</a>' sub="Todo en una tabla" count="16 registros">
    <col w="1.1fr" mw="1.2fr">Nombre</col>
    <col w="1.7fr" kind="note">Notas</col>
    <col w=".9fr" kind="wide">Formato</col>
    <col w="1fr" mw="1fr" kind="ours">Frecuencia, según la persona</col>
    <col w="1fr" mw="1fr">Según el informe</col>
    <col w=".9fr" kind="wide">Estado</col>
    <row>Hana Sato | Anfitrión [00:00]: Piensa en la última… | <b-select-pill tone="cyan">voz</b-select-pill> | <b-select-pill tone="green">semanal</b-select-pill> | <b-select-pill tone="green">semanal</b-select-pill> | <b-select-pill tone="green">Hecho</b-select-pill></row>
    <row>Pavel Novak | [27.09 10:15] Anfitrión: Describe la última… | <b-select-pill tone="purple">texto</b-select-pill> | <b-select-pill tone="cyan">con regularidad</b-select-pill> | <b-select-pill tone="red">no lo usa</b-select-pill><b-match-mark kind="diff">≠</b-match-mark> | <b-select-pill tone="green">Hecho</b-select-pill></row>
    <row>Nadia Rahimi | Anfitrión [00:00] | <b-select-pill tone="cyan">voz</b-select-pill> | <b-select-pill tone="yellow">de vez en cuando</b-select-pill> | <b-select-pill tone="yellow">de vez en cuando</b-select-pill> | <b-select-pill tone="green">Hecho</b-select-pill></row>
  </b-airtable-preview>
</b-flow>
<b-chapter id="format" icon="split" title="Elegir el formato">
  <b-table>
    <table><thead><tr><th>Criterio</th><th><b-icon name="mic" sw="2.2"/> Voz</th><th><b-icon name="lines" sw="2.2"/> Texto</th></tr></thead><tbody>
    <tr><td>Profundidad de las respuestas</td><td><b-rating value="5" of="5" label="5 de 5"/></td><td><b-rating value="2" of="5" label="2 de 5"/></td></tr>
    <tr><td>Repreguntar en el momento</td><td><b-rating value="5" of="5" label="5 de 5"/></td><td><b-rating value="1" of="5" label="1 de 5"/></td></tr>
    <tr><td>A cuánta gente se llega</td><td><b-rating value="2" of="5" label="2 de 5"/></td><td><b-rating value="5" of="5" label="5 de 5"/></td></tr>
    <tr><td>Tiempo del entrevistado</td><td>30 min</td><td>10 min</td></tr>
    <tr><td>Riesgo de salirse del tema</td><td><b-rating value="4" of="5" warn label="4 de 5"/></td><td><b-rating value="1" of="5" warn label="1 de 5"/></td></tr>
    </tbody></table>
  </b-table>
  <b-cap>Los puntos son una puntuación de 1 a 5. En el riesgo, más puntos es peor.</b-cap>
  <b-sublabel top="22">Mezcla: el entrevistado elige el formato</b-sublabel>
  <b-choice-flow label="Voz o texto: elige el entrevistado">
    <step t="Invitación">Por mensaje directo</step>
    <step t="¿Una llamada?">30 minutos</step>
    <opt k="sí" tone="cyan" pill="voz">llamada con un asistente que toma notas</opt>
    <opt k="no" tone="purple" pill="texto">las mismas preguntas, una por una, en el chat</opt>
  </b-choice-flow>
  <b-finding>
    <ex>La voz saca 5 de 5 en profundidad, el texto saca 5 de 5 en alcance. Cada persona elige el formato.</ex>
    <gen>Cuando las personas eligen el formato, hay menos rechazos. Los formatos difieren en profundidad: una llamada da un relato detallado con repreguntas, un chat da respuestas cortas. Por eso las respuestas del chat ayudan a encontrar casos y temas, pero no se tratan como equivalentes a las llamadas. La voz es el formato principal; el chat, para quien no puede atender una llamada. Un cuestionario para toda la empresa es otra herramienta, que se escribe después de las entrevistas.</gen>
    <do>Ofrece los dos formatos en una frase de la invitación: «¿Hacemos una llamada de 30 minutos o prefieres responder las preguntas por chat?»</do>
  </b-finding>
</b-chapter>
<b-chapter id="prep" icon="mic" title="Preparar la reunión">
  <b-todo>
    <item t="Mencionar al asistente que toma notas">En la invitación y al empezar la llamada: el asistente toma notas y una transcripción que solo ve el equipo, y las respuestas van al informe sin nombres. Con <b-ink-link href="https://www.granola.ai/">Granola</b-ink-link> no se guarda el audio</item>
    <item t='<a href="https://tldv.io/" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline;text-underline-offset:3px">tl;dv</a> o <a href="https://www.granola.ai/" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline;text-underline-offset:3px">Granola</a>'><b-ink-link href="https://tldv.io/">tl;dv</b-ink-link> se conecta al calendario y entra solo a la reunión de Google Meet o Zoom. <b-ink-link href="https://www.granola.ai/">Granola</b-ink-link> funciona sin bot, con el audio del ordenador, y guarda solo la transcripción y las notas</item>
    <item t="Fila de Airtable creada de antemano">Nombre, grupo y cifras de la <a href="/blog/chatgpt-enterprise-usage-report/#people">tabla de todas las personas</a>, estado «En curso», antes del primer mensaje</item>
    <item t="Guía abierta en una segunda pantalla">Siete bloques de guion y un temporizador de 30 minutos</item>
    <item t="Un solo anfitrión, sin tomar notas"><b-ink-link href="https://tldv.io/">tl;dv</b-ink-link> o <b-ink-link href="https://www.granola.ai/">Granola</b-ink-link> hace la transcripción, ChatGPT hace el análisis</item>
  </b-todo>
  <b-finding>
    <do>Antes de la reunión, comprueba que <b-ink-link href="https://tldv.io/">tl;dv</b-ink-link> ve la reunión en el calendario o que <b-ink-link href="https://www.granola.ai/">Granola</b-ink-link> está en marcha en tu ordenador, y crea la fila de Airtable, de modo que en la llamada solo queden las preguntas.</do>
  </b-finding>
</b-chapter>
<b-chapter id="script" icon="clock" title="Guion de 30 minutos">
  <b-share-bar kind="time" label="30">
    <seg w="2" color="c-none" ink="ink">2</seg>
    <seg w="3" color="c-light">3</seg>
    <seg w="8" color="c-chat">8</seg>
    <seg w="5" color="c-proj">5</seg>
    <seg w="4" color="c-team">4</seg>
    <seg w="5" color="c-work">5</seg>
    <seg w="3" color="c-none" ink="ink">3</seg>
  </b-share-bar>
  <b-cap>Minutos por bloque</b-cap>
  <b-call-script>
    <step color="c-none" ink="ink" t="Introducción" q="&quot;Estoy investigando cómo resuelve la gente de la empresa sus tareas de trabajo. No es una evaluación tuya. Los casos que salieron bien y los que no me sirven por igual. Me acompaña un asistente que toma notas: solo el equipo de investigación ve la transcripción y las respuestas van al informe sin nombres. ¿Puedo activarlo?&quot;"></step>
    <step color="c-light" t="Rol y contexto" q='"¿En qué empleas la mayor parte de tu semana?"'>Qué tareas se repiten · dónde buscas información y preparas borradores</step>
    <step color="c-chat" t="La última tarea de trabajo" q='"Piensa en la última tarea de trabajo que te llevó un tiempo apreciable. ¿Qué necesitabas conseguir?"'>Con qué medios contabas · qué elegiste y por qué · cómo llegaste al resultado</step>
    <step color="c-proj" t="Resultado y esfuerzo" q='"¿Con qué te quedaste y cuánto esfuerzo costó?"'>Qué usaste tal cual · qué terminaste tú · qué restricciones había: datos, accesos, seguridad</step>
    <step color="c-team" t="Un caso de éxito" q='"Piensa en una ocasión en que una tarea parecida salió bien. ¿Qué fue distinto entonces?"'>Herramienta · datos · preparación</step>
    <step color="c-work" t="Dejarlo y cambiar" q='"¿Alguna vez has dejado de usar una herramienta o has pasado a otra? ¿Cómo fue?"'>Qué herramienta · a cuál pasaste · por qué. Si nunca ocurrió, sáltalo</step>
    <step color="c-none" ink="ink" t="Cierre" q="&quot;¿Qué no te he preguntado que importe para entender tu trabajo?&quot;">Dar las gracias · decir que las respuestas van al análisis conjunto sin nombres</step>
  </b-call-script>
  <b-branch icon="git-branch" t="Si la persona no menciona la IA">No preguntes por qué no la usa. Pregunta cómo hizo la tarea y qué opciones consideró. Pregunta por la IA solo si la persona la nombró ella misma como opción posible</b-branch>
  <b-finding>
    <ex>La última tarea, el resultado y el esfuerzo ocupan 13 de los 30 minutos; el caso de éxito y el de dejarlo o cambiar, otros 9.</ex>
    <gen>La conversación se construye en torno al trabajo, no a la herramienta. Así se ve dónde ayuda la IA, dónde la persona eligió otro camino y dónde no hace falta ninguna herramienta nueva. El caso de éxito muestra lo que ya funciona; dejarlo y cambiar muestran por qué se sustituyen las herramientas.</gen>
    <do>Pon un temporizador: hacia el minuto 5, pasa a la última tarea de trabajo. Si no, reduce el contexto a una sola pregunta. Elige tú el tema de la tarea para la persona: sus tareas aparecen en <a href="/blog/chatgpt-enterprise-usage-report/#projects">Temas de proyectos</a>.</do>
  </b-finding>
</b-chapter>
<b-chapter id="focus" icon="target" title="No salirse del tema">
  <b-rules>
    <rule icon="parking" t="Aparcamiento">Lo que se sale del tema va a un campo aparte; se retoma en los últimos 2 minutos</rule>
    <rule icon="one" t="Una pregunta cada vez">Sin «y además…» en la misma frase</rule>
    <rule icon="undo" t="Volver al caso">Opinión general → «¿Puedes recordar una ocasión concreta?»</rule>
    <rule icon="shield-off" t="No defender la herramienta">Ante una crítica, responde solo con «¿Qué pasó después?»</rule>
    <rule icon="pause" t="Pausa de 5 segundos">Calla tras una respuesta: la gente suele añadir sola lo esencial</rule>
    <rule icon="bulb-off" t="No sugerir soluciones">Sin ideas propias, sin nombres de otros productos</rule>
  </b-rules>
  <b-sublabel top="22">Situación → qué decir</b-sublabel>
  <b-table>
    <table><thead>
    <tr><th>Situación</th><th>Frase del anfitrión</th></tr>
    </thead><tbody>
    <tr><td>Pide una función nueva</td><td>«¿Cuándo la necesitaste por última vez? ¿Qué hiciste entonces?»</td></tr>
    <tr><td>Deriva hacia quejas sobre los procesos</td><td>«Lo dejo en el aparcamiento. Volvamos a la tarea del informe: ¿qué pasó después?»</td></tr>
    <tr><td>Responde con «normalmente» y «siempre»</td><td>«¿Y cómo fue la última vez?»</td></tr>
    <tr><td>Pide la opinión del anfitrión</td><td>«Te la cuento al final. Ahora lo que importa es cómo te funciona a ti»</td></tr>
    <tr><td>Se acabó el tiempo del bloque</td><td>«Es importante, lo anotamos. Paso a la siguiente pregunta»</td></tr>
    </tbody></table>
  </b-table>
  <b-finding>
    <ex>Cinco situaciones habituales, cada una con una frase que devuelve la conversación al episodio.</ex>
    <gen>Detrás de una petición de función hay un caso concreto, y ese caso es lo que se necesita. La petición en sí sirve más tarde como pista de dónde buscar el problema.</gen>
    <do>Ten la tabla de frases junto a la guía y anota cada petición de función textualmente en un campo aparte de la tabla para lo que se sale del tema.</do>
  </b-finding>
</b-chapter>
<b-chapter id="base" icon="table" title="Registro en Airtable">
  <b-why>La tabla reúne en un solo lugar a todos los de la muestra, sus conversaciones y los datos del informe. <b>Decisión:</b> a quién más invitar para que cada grupo tenga suficientes entrevistas, a quién enviar un seguimiento y qué diferencias entre el uso declarado y el medido conviene hablar con la persona.</b-why>
  <b-pipe label="Recorrido de un registro desde la llamada hasta la tabla">
    <node icon="record" color="c-chat" sub="Transcripción"><b-ink-link href="https://tldv.io/">tl;dv</b-ink-link> · <b-ink-link href="https://www.granola.ai/">Granola</b-ink-link></node>
    <node icon="table" color="c-proj" sub="Campo Notas en la fila de la persona"><b-ink-link href="https://airtable.com" plain>Airtable</b-ink-link></node>
  </b-pipe>
  <b-tool-links>
    <item href="https://airtable.com" icon="external" sub="Base y formularios">Airtable</item>
    <item href="https://tldv.io" icon="external" sub="Notas y transcripciones de llamadas">tl;dv</item>
    <item href="https://www.granola.ai/" icon="external" sub="Notas sin bot, sin guardar audio">Granola</item>
  </b-tool-links>
  <b-cap>Voz: la transcripción de <b-ink-link href="https://tldv.io/">tl;dv</b-ink-link> o <b-ink-link href="https://www.granola.ai/">Granola</b-ink-link> se copia en el campo Notas. Texto: el registro del chat se copia en el mismo campo con la fecha y la hora de cada mensaje.</b-cap>
  <b-sublabel top="22">Una tabla: una fila por persona</b-sublabel>
  <b-airtable-grid foot="16 registros · 9 mostrados">
    <field type="A" kind="name">Nombre</field>
    <field type="≡" kind="note">Notas</field>
    <field type="◉">Formato</field>
    <field type="◉">Grupo</field>
    <field type="◉">Estado</field>
    <field type="◉" kind="ours">Frecuencia · según la persona</field>
    <field type="◉">Frecuencia · según el informe</field>
    <field type="ƒ" kind="mark">≠</field>
    <field type="#" kind="num">Tokens · 3 meses</field>
    <field type="#" kind="num">$ / 3 meses</field>
    <field type="▦" kind="num">Actividad</field>
    <row>Hana Sato | Anfitrión [00:00]: Piensa en la última vez que… | <b-select-pill tone="cyan">voz</b-select-pill> | código | <b-select-pill tone="green">Hecho</b-select-pill> | <b-select-pill tone="green">semanal</b-select-pill> | <b-select-pill tone="green">semanal</b-select-pill> | <b-match-mark kind="same">=</b-match-mark> | 21.9M | 438 | 25.09</row>
    <row>Luis Moreno | Anfitrión [00:00]: Gracias por sacar tiempo… | <b-select-pill tone="cyan">voz</b-select-pill> | código | <b-select-pill tone="green">Hecho</b-select-pill> | <b-select-pill tone="cyan">con regularidad</b-select-pill> | <b-select-pill tone="green">semanal</b-select-pill> | <b-match-mark kind="diff">≠</b-match-mark> | 12.7M | 396 | 24.09</row>
    <row>Mira Castellano | [26.09 18:40] Anfitrión: ¿Qué resultado esperabas… | <b-select-pill tone="purple">texto</b-select-pill> | agente | <b-select-pill tone="yellow">Parcial</b-select-pill> | <b-select-pill tone="cyan">con regularidad</b-select-pill> | <b-select-pill tone="cyan">con regularidad</b-select-pill> | <b-match-mark kind="same">=</b-match-mark> | 3.9M | 97 | 26.09</row>
    <row>Jonas Keller | Anfitrión [00:00]: ¿En qué empleas la mayor parte de tu… | <b-select-pill tone="cyan">voz</b-select-pill> | investigación | <b-select-pill tone="green">Hecho</b-select-pill> | <b-select-pill tone="green">semanal</b-select-pill> | <b-select-pill tone="green">semanal</b-select-pill> | <b-match-mark kind="same">=</b-match-mark> | 1.1M | 19 | 26.09</row>
    <row>Ben Ortiz |  |  | Solo Codex | <b-select-pill tone="cyan">Esperando respuesta</b-select-pill> |  | <b-select-pill tone="purple">Solo Codex</b-select-pill> |  | 3.2M | 64 | 22.09</row>
    <row>Pavel Novak | [27.09 10:15] Anfitrión: Describe la última tarea… | <b-select-pill tone="purple">texto</b-select-pill> | inactivo | <b-select-pill tone="green">Hecho</b-select-pill> | <b-select-pill tone="cyan">con regularidad</b-select-pill> | <b-select-pill tone="red">no lo usa</b-select-pill> | <b-match-mark kind="diff">≠</b-match-mark> | 0 | 0 | —</row>
    <row>Sara Quinn |  |  | inactivo | <b-select-pill tone="red">Rechazó</b-select-pill> |  | <b-select-pill tone="red">no lo usa</b-select-pill> |  | 0 | 0 | —</row>
    <row>Nadia Rahimi | Anfitrión [00:00]: Recuerda la última tarea que te llevó… | <b-select-pill tone="cyan">voz</b-select-pill> | otras herramientas | <b-select-pill tone="green">Hecho</b-select-pill> | <b-select-pill tone="yellow">de vez en cuando</b-select-pill> | <b-select-pill tone="yellow">de vez en cuando</b-select-pill> | <b-match-mark kind="same">=</b-match-mark> | 0.3M | 6 | 20.09</row>
    <row>Elif Demir |  |  | proyectos | <b-select-pill tone="gray">En curso</b-select-pill> |  | <b-select-pill tone="green">semanal</b-select-pill> |  | 1.8M | 41 | 27.09</row>
  </b-airtable-grid>
  <b-cap>ChatGPT rellena el campo naranja a partir de la conversación en Notas. «Según el informe», «Tokens», «$» y «Actividad» salen del <a href="/blog/chatgpt-enterprise-usage-report/">informe de uso de ChatGPT Enterprise</a>. El campo «≠» es una fórmula que compara las dos frecuencias.</b-cap>
  <b-sublabel top="22">Leer la tabla: qué aporta cada columna</b-sublabel>
  <b-table>
    <table><thead>
    <tr><th>Columna</th><th>Fuente</th><th>Qué afecta</th></tr>
    </thead><tbody>
    <tr><td>Nombre · Grupo</td><td><a href="/blog/who-to-interview-before-buying-ai-tools/#groups">Muestra de «Ocho grupos»</a></td><td>qué modo de resolver tareas representa la persona</td></tr>
    <tr><td>Notas</td><td><b-ink-link href="https://tldv.io/">tl;dv</b-ink-link>, <b-ink-link href="https://www.granola.ai/">Granola</b-ink-link> o registro del chat</td><td>fuente de cada campo; cualquier conclusión se contrasta con una cita</td></tr>
    <tr><td>Formato</td><td>anfitrión</td><td>profundidad de la respuesta: un chat tiene menos detalle que una llamada</td></tr>
    <tr><td>Estado</td><td>anfitrión</td><td>siguiente acción: recordar, hacer seguimiento o sustituir a la persona</td></tr>
    <tr><td>Frecuencia · según la persona</td><td>ChatGPT la toma de la conversación</td><td>con qué frecuencia dice la persona que usa IA</td></tr>
    <tr><td>Frecuencia · según el informe</td><td><a href="/blog/chatgpt-enterprise-usage-report/#depth">informe · profundidad de adopción</a></td><td>con qué frecuencia la usa según los datos de la consola</td></tr>
    <tr><td>≠</td><td>Fórmula de Airtable: compara las dos frecuencias</td><td>si no coinciden: una pregunta que aclarar en la entrevista, pues el informe solo ve la herramienta corporativa durante 3 meses</td></tr>
    <tr><td>Tokens · 3 meses</td><td>informe · <a href="/blog/chatgpt-enterprise-usage-report/#top-spend">top por gasto</a></td><td>volumen de trabajo en la herramienta corporativa durante 3 meses, para la muestra, no para ponderar la respuesta</td></tr>
    <tr><td>$ · 3 meses</td><td>informe · clasificación</td><td>gasto durante 3 meses, para la muestra, no para ponderar la respuesta</td></tr>
    <tr><td>Actividad</td><td>informe · exportación de usuarios</td><td>fecha de la última acción: hace mucho significa candidato al grupo «Probó y lo dejó»</td></tr>
    </tbody></table>
  </b-table>
  <b-sublabel top="22">Cómo leer las filas de ejemplo</b-sublabel>
  <b-table>
    <table><thead>
    <tr><th>Fila</th><th>Señal</th><th>Qué hacer</th></tr>
    </thead><tbody>
    <tr><td>Hana Sato</td><td>las frecuencias coinciden · $438 en código · <b-select-pill tone="green">Hecho</b-select-pill></td><td>el mayor gasto en código: una conversación sobre su última tarea muestra si la herramienta actual basta</td></tr>
    <tr><td>Luis Moreno</td><td><b-match-mark kind="diff">≠</b-match-mark> dice «con regularidad», en realidad semanal</td><td>aclarar: qué tareas cuenta como trabajo con IA</td></tr>
    <tr><td>Pavel Novak</td><td><b-match-mark kind="diff">≠</b-match-mark> «con regularidad» con cero tokens</td><td>aclarar: qué herramientas usa y para qué tareas</td></tr>
    <tr><td>Mira Castellano</td><td><b-select-pill tone="yellow">Parcial</b-select-pill></td><td>enviar un seguimiento: en qué punto de la tarea tuvo que terminar a mano</td></tr>
    <tr><td>Ben Ortiz</td><td><b-select-pill tone="cyan">Esperando respuesta</b-select-pill> · Solo Codex · $64</td><td>enviar un recordatorio: sin él, el grupo «Solo Codex» queda vacío</td></tr>
    <tr><td>Sara Quinn</td><td><b-select-pill tone="red">Rechazó</b-select-pill></td><td>sustituir según la <a href="/blog/who-to-interview-before-buying-ai-tools/#teams">regla de sustitución</a>: el siguiente candidato del grupo «Inactivos»</td></tr>
    <tr><td>Elif Demir</td><td><b-select-pill tone="gray">En curso</b-select-pill> · 7 proyectos activos</td><td>agendar una llamada; rellenar la frecuencia declarada tras la conversación</td></tr>
    </tbody></table>
  </b-table>
  <b-sublabel top="22">Lo declarado frente a los datos: qué aclarar en la entrevista</b-sublabel>
  <b-vs-grid>
    <h>Medido en la entrevista</h>
    <h>Pareja en el informe</h>
    <h>Si difieren, aclarar</h>
    <c><b>Con qué frecuencia la usa</b></c>
    <c><a href="/blog/chatgpt-enterprise-usage-report/#depth">actividad semanal</a></c>
    <c>qué herramientas usa la persona y para qué tareas</c>
    <c><b>Tarea principal</b></c>
    <c><a href="/blog/chatgpt-enterprise-usage-report/#main-tool">herramienta principal</a></c>
    <c>qué tareas cuenta la persona como trabajo con IA</c>
    <c><b>Cuántas tareas cubre</b></c>
    <c><a href="/blog/chatgpt-enterprise-usage-report/#projects">número de proyectos</a></c>
    <c>qué proyectos siguen vivos y para qué tareas</c>
    <c><b>Qué más usa</b></c>
    <c><a href="/blog/chatgpt-enterprise-usage-report/#connectors">conectores</a></c>
    <c>qué son esas herramientas y para qué tareas; registrarlas como forma de trabajo</c>
    <c><b>Cuánto tiempo ahorra</b></c>
    <c>sin pareja</c>
    <c>solo declarado</c>
  </b-vs-grid>
  <b-cap>Límites de los datos: el informe solo ve la herramienta corporativa y solo durante 3 meses. Las cuentas personales y otras herramientas no aparecen, así que una discrepancia es una pregunta que aclarar, no una conclusión.</b-cap>
  <b-sublabel top="22">Estados de los 16 invitados</b-sublabel>
  <b-share-bar kind="status" label="Desglose de estados">
    <seg w="9" color="pg" ink="pg-i">Hecho · 9</seg>
    <seg w="2" color="py" ink="py-i">2</seg>
    <seg w="2" color="pc" ink="pc-i">2</seg>
    <seg w="2" color="pn" ink="pn-i">2</seg>
    <seg w="1" color="pr" ink="pr-i">1</seg>
  </b-share-bar>
  <b-legend>
    <item color="pg">Hecho</item>
    <item color="py">Parcial</item>
    <item color="pc">Esperando respuesta</item>
    <item color="pn">En curso</item>
    <item color="pr">Rechazó</item>
  </b-legend>
  <b-finding>
    <ex>9 de 16 invitados dieron una entrevista: la proporción de «Hecho» es del 56 %. La frecuencia declarada por Pavel Novak no coincide con el informe.</ex>
    <gen>Una fila por persona mantiene juntos los datos del informe, el formato, la conversación en bruto y el estado. Los estados muestran si hay suficiente gente: la proporción de «Hecho» entre los invitados indica a cuántos invitar para que cada grupo reúna el número necesario de entrevistas. Una diferencia entre el uso declarado y el medido es una pregunta que aclarar: el informe solo ve la herramienta corporativa durante 3 meses.</gen>
    <do>Actualiza el estado justo después de cada conversación. Mantén el número necesario de entrevistas en cada grupo: con un 56 % de «Hecho», invita a cuatro personas para obtener dos entrevistas por grupo. Envía un seguimiento a todos los marcados como Parcial.</do>
  </b-finding>
</b-chapter>
<b-chapter id="wording" icon="lines" title="Texto: redacción">
  <b-why>En un chat o en un cuestionario es difícil repreguntar, así que una pregunta mal formulada estropea la respuesta sin posibilidad de corregirla. Cinco errores habituales:</b-why>
  <b-question-pairs>
    <pair tag="sugestiva" bad="¿Qué tan cómoda te resulta la herramienta?">Describe la última tarea de trabajo que te llevó un tiempo apreciable.</pair>
    <pair tag="provocadora" bad="¿Por qué no usas la herramienta si la empresa la paga?">¿Cómo hiciste tu última tarea de este tipo? ¿Qué opciones consideraste?</pair>
    <pair tag="petición de función" bad="¿Qué funciones te faltan?">¿En qué momento de tu última tarea tuviste que terminar el trabajo a mano?</pair>
    <pair tag="hipotética" bad="¿La usarías más si tuviera un agente?">¿Qué hiciste la última vez que el resultado no te servía?</pair>
    <pair tag="doble" bad="¿Qué haces en la herramienta y con qué frecuencia?">¿Cuál fue la última tarea que hiciste con IA?</pair>
  </b-question-pairs>
  <b-finding>
    <ex>Las cinco preguntas corregidas se refieren a un episodio pasado.</ex>
    <gen>Las preguntas sobre comodidad, funciones y futuro recogen opiniones. Una decisión de compra se apoya en lo que la gente ya ha hecho, así que una buena pregunta se refiere a un caso pasado concreto.</gen>
    <do>Relee las preguntas del chat y del cuestionario y reescribe toda pregunta que contenga «cómodo», «te gustaría» o «qué funciones» como una pregunta sobre la última tarea de trabajo.</do>
  </b-finding>
</b-chapter>
<b-chapter id="agent" icon="terminal" title="Rellenar la tabla con Claude Code">
  <b-why>Toda la tabla se puede dejar en manos de un agente de IA: Claude Code u otro agente compatible con MCP se conecta a Airtable y crea filas, trae los datos del informe y analiza las conversaciones por su cuenta.</b-why>
  <b-pipe label="Un agente rellena la tabla">
    <node icon="terminal" color="c-code" sub="U otro agente con soporte de MCP"><b-ink-link href="https://code.claude.com/docs" plain>Claude Code</b-ink-link></node>
    <node icon="plug" color="c-light" sub="Lee y escribe la tabla">Airtable MCP</node>
    <node icon="table" color="c-proj" sub="Todos los campos y estados">Airtable</node>
  </b-pipe>
  <b-todo top="12">
    <item t="Crear filas">A partir de la lista de personas elegidas para las entrevistas: nombre, grupo, estado</item>
    <item t="Traer los datos del informe">Tokens, $, actividad, frecuencia según el informe</item>
    <item t="Analizar Notas">Con el mismo prompt que en ChatGPT: campos, dificultades, frecuencia declarada, citas</item>
    <item t="Actualizar estados">«Parcial» (respuesta incompleta) si el análisis contiene «sin datos»</item>
  </b-todo>
  <b-tool-links>
    <item href="https://support.airtable.com/docs/using-the-airtable-mcp-server" icon="external" sub="Cómo conectarlo">Airtable MCP</item>
  </b-tool-links>
  <b-finding>
    <ex>El agente crea filas, trae el informe, analiza Notas y actualiza estados: cuatro pasos sin entrada manual.</ex>
    <gen>A través de MCP el agente trabaja con la tabla directamente, y al investigador le quedan las conversaciones y la comprobación de las conclusiones contra las citas. Un único prompt de análisis para el agente y para ChatGPT mantiene las filas comparables.</gen>
    <do>Conecta Airtable MCP a Claude Code y empieza con un solo comando: «Crea filas para las personas de la lista con el estado En curso».</do>
  </b-finding>
</b-chapter>
<b-chapter id="form" icon="doc-lines" title="Cuestionario">
  <b-why>El cuestionario se escribe después de las entrevistas, cuando ya se sabe qué tareas y dificultades aparecen. Se envía a toda la empresa para saber cuán extendidas están. Las preguntas son cortas y las opciones de respuesta salen del análisis de las entrevistas.</b-why>
  <b-survey>
    <q t="¿Cuáles de estas tareas haces en el trabajo?" color="c-proj" tag="tareas">elección: tareas de las entrevistas · otra, campo abierto</q>
    <q t="¿Con qué frecuencia haces estas tareas?" color="c-proj" tag="frecuencia de las tareas">elección: cada día · cada semana · con menos frecuencia · no las hago</q>
    <q t="¿Qué herramientas usas para ellas?" color="c-proj" tag="herramientas">elección: ChatGPT · Claude · Cursor · otra herramienta de IA · no uso IA</q>
    <q t="¿Con qué dificultades te encuentras en estas tareas?" color="c-proj" tag="dificultades">elección: dificultades de las entrevistas · no me encuentro con ninguna · otra, campo abierto</q>
    <q t="¿Con qué frecuencia te estorba esta dificultad?" color="c-proj" tag="frecuencia de la dificultad">elección: en casi todas las tareas · a veces · rara vez</q>
    <q t="¿Cuánto importa para el resultado?" color="c-proj" tag="impacto">elección: estorba mucho · estorba · apenas importa</q>
    <q t="¿Cómo sorteas ahora esta dificultad?" tag="soluciones alternativas">campo abierto · no la sorteo</q>
    <q t="¿Qué más importa que las preguntas no hayan recogido?" tag="algo omitido">campo abierto</q>
  </b-survey>
  <b-finding>
    <ex>Ocho preguntas breves: seis de opción múltiple con opciones de las entrevistas y dos campos abiertos.</ex>
    <gen>Las entrevistas muestran qué tareas y dificultades existen; el cuestionario muestra cuánta gente se topa con ellas y cuánto les estorban. Las opciones «no me encuentro con ninguna», «no uso IA» y el campo abierto recogen lo que las entrevistas pasaron por alto.</gen>
    <do>Reúne las opciones de respuesta a partir del análisis de las entrevistas y envía el cuestionario a toda la empresa. Cuenta qué proporción de personas se topa con cada dificultad, con qué frecuencia y cuánto les estorba. Esas proporciones alimentan el <a href="/blog/chatgpt-enterprise-usage-report/#decision">procedimiento de decisión</a> del informe.</do>
  </b-finding>
</b-chapter>
<b-chapter id="after" icon="bulb" title="Análisis de entrevistas: el prompt de análisis y la comprobación con los datos del informe">
  <b-steps round>
    <step t="Dar el texto de Notas a ChatGPT">Con el mismo prompt para cada entrevista</step>
    <step t="Pasar la respuesta de ChatGPT a la fila de la persona">Tarea, contexto, vía elegida, resultado, esfuerzo, restricciones, dificultades, frecuencia declarada</step>
    <step t="Agrupar la tabla por dificultad">Las personas con la misma dificultad quedan juntas: se ve cuántas son y de qué grupos</step>
    <step t="Comprobar con el cuestionario">Las repeticiones pasan a ser opciones de respuesta del cuestionario para toda la empresa; el desglose por equipo se compara con <a href="/blog/chatgpt-enterprise-usage-report/#uniformity">Uniformidad</a></step>
  </b-steps>
  <b-subhead>Prompt para el análisis de entrevistas</b-subhead>
  <b-prompt>
    A continuación hay una conversación con un empleado sobre sus tareas de trabajo.
    Devuelve estrictamente por campos, solo lo que la persona dijo ella misma:
    1. Tarea: la última tarea de trabajo concreta
    2. Contexto: para quién y por qué, con qué medios contaba
    3. Herramienta o vía elegida, y por qué
    4. Resultado
    5. Esfuerzo: tiempo y retrabajo manual
    6. Restricciones: datos, accesos, seguridad
    7. Dificultades: categorías de la lista {categorías de la tabla de señales del informe} o «sin dificultades»; si ninguna encaja, una categoría nueva con tus propias palabras
    8. Frecuencia declarada: semanal / con regularidad / de vez en cuando / no la usa / desconocida
    9. 1–2 citas textuales
    Si algo no aparece en la conversación, escribe «sin datos» y no lo inventes.

    {texto de Notas}
  </b-prompt>
  <b-gauge label="Qué hacer con una repetición">
    <row k="1 persona" w="15%" color="c-none">caso</row>
    <row k="se repite en varias" w="45%" color="c-light">comprobar con el cuestionario</row>
    <row k="cuestionario confirmado" w="100%" color="c-work">al procedimiento de decisión</row>
  </b-gauge>
  <b-finding>
    <ex>Una dificultad en una persona es un caso; una repetición en varias es motivo para comprobar con el cuestionario.</ex>
    <gen>El análisis conserva la tarea entera, no solo la dificultad: sin el contexto, la vía elegida y el esfuerzo no se puede saber si hace falta una herramienta nueva. Una repetición en las entrevistas muestra qué comprobar, no a cuántas personas afecta: eso lo muestra solo el cuestionario. Un único prompt para todas las conversaciones mantiene los campos comparables, y «sin datos» impide que ChatGPT invente.</gen>
    <do>Cuando se hayan acumulado varios análisis, agrupa la tabla por dificultad y pasa las repeticiones a las opciones de respuesta del <a href="#form">cuestionario</a>. Registra «sin dificultades» como resultado. Toma las categorías de la <a href="/blog/chatgpt-enterprise-usage-report/#signs">tabla de señales</a> del informe y añade nuevas si ninguna encaja. La decisión sobre el piloto sigue el <a href="/blog/chatgpt-enterprise-usage-report/#decision">procedimiento</a> del informe.</do>
  </b-finding>
  <b-sublabel top="22">Preguntas habituales</b-sublabel>
  <b-qa>
    <q t="Cómo analizar una entrevista con ChatGPT">El texto de la conversación del campo Notas va a ChatGPT con el mismo prompt para cada entrevista. La respuesta se copia en la fila de la persona: tarea, contexto, método, resultado, costes, restricciones, dificultades, frecuencia declarada. Después la tabla se agrupa por dificultad.</q>
    <q t="Puede un agente hacer el análisis de las entrevistas">Sí. Claude Code u otro agente con soporte de MCP se conecta a Airtable, crea filas, trae los datos del informe y analiza Notas con el mismo prompt. El investigador conserva las conversaciones y comprueba las conclusiones contra las citas.</q>
    <q t="Cómo comparar lo que dice la gente con los datos">La tabla tiene dos campos: frecuencia declarada y frecuencia según el informe, con una marca de discrepancia al lado. Las discrepancias se hablan con la persona en lugar de corregirse en silencio.</q>
    <q t="Cómo analizar juntas las llamadas y las respuestas de texto">La conversación de texto se copia en el mismo campo Notas con la hora de cada mensaje. Las respuestas de texto ayudan a encontrar casos y temas, pero no se tratan como equivalentes a las llamadas.</q>
  </b-qa>
</b-chapter>
<b-chapter id="faq" icon="chat" title="Preguntas frecuentes">
  <b-faq-cards>
    <q t="¿Cómo se hace una entrevista de 30 minutos sobre el trabajo con IA?">Construye la conversación en torno a la última tarea real: qué se hizo, el resultado y el esfuerzo, y después un caso de éxito y otro en que la persona dejó la IA.</q>
    <q t="¿Llamada o texto?">La persona elige el formato. Una llamada da un relato detallado con repreguntas, el texto da respuestas cortas, por lo que las respuestas de texto no se tratan como equivalentes a las llamadas.</q>
    <q t="¿Cómo se analizan las entrevistas con ChatGPT?">Da el texto de la conversación a ChatGPT con el mismo prompt para cada entrevista y copia la respuesta en la fila de la persona en Airtable.</q>
    <q t="¿Cómo se comprueba lo que dice la gente frente a los datos?">La tabla tiene dos campos juntos: frecuencia declarada y frecuencia del informe. Las diferencias se hablan con la persona.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Seguir leyendo">
  <b-links cols="2">
    <item href="/blog/chatgpt-enterprise-usage-report/" k="Informe" t="Informe de uso de ChatGPT Enterprise">Quién lo usa, para qué tareas y qué herramientas comprar después</item>
    <item href="/blog/who-to-interview-before-buying-ai-tools/" k="Muestra" t="A quién entrevistar">A quién invitar a las entrevistas</item>
  </b-links>
</b-chapter>
<b-footer>El diseño de las entrevistas se basa en recomendaciones de <a href="https://t.me/Kseniya_Vasil" target="_blank" rel="noopener">@Kseniya_Vasil</a>. Todos los nombres, equipos y cifras de los ejemplos son ficticios.</b-footer>
</b-post>
