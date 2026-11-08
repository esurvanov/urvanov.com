---
title: A quién entrevistar antes de comprar herramientas de IA: 16 personas de ocho grupos polares
date: 2026-09-28
updated: 2026-11-08
description: Cómo elegir a 16 personas a partir del informe, un cuestionario y las listas de licencias, comprobar la cobertura de los equipos y los reemplazos, y decidir qué preguntarles.
tags: IA, custdev, investigación
category: research
layout: wide
image: /og/who-to-interview-before-buying-ai-tools.en.png
mentions: ChatGPT Enterprise, Codex
toc: why=Por qué una muestra | top=Top por actividad | groups=Ocho grupos | teams=Cobertura de equipos | ask=Qué averiguar | order=Procedimiento | faq=Preguntas | next=Más lecturas
---

Antes de comprar herramientas de IA, invita a entrevistas a 16 personas: dos de cada uno de ocho grupos polares, como quienes trabajan solo en Codex, quienes abandonaron la herramienta o quienes llevan muchos proyectos. Los usuarios más activos importan, pero juntos describen uno o dos escenarios: el top por mensajes cubre 2 escenarios de 8. Las personas se eligen a partir del informe, una encuesta y las listas de licencias. Abajo están los grupos, los umbrales y qué preguntar.

<b-post series="gruppy">
<b-credit para>Diseño de la muestra de entrevistas basado en recomendaciones de <a href="https://t.me/Kseniya_Vasil" target="_blank" rel="noopener">@Kseniya_Vasil</a></b-credit>
<b-gruppy-chain label="From report to interview list">
  <stage n="340" t="Personas en el informe" dots="340" on="5:c-code 31:c-code 58:c-work 77:c-work 96:c-chat 120:c-chat 141:c-silent 163:c-silent 187:c-none 205:c-none 226:c-light 248:c-light 269:c-proj 290:c-proj 311:c-team 333:c-team"/>
  <stage n="8" t="Grupos polares" icons="code-alt:c-code zap-alt:c-work search-alt:c-chat card:c-silent slash:c-none log-out:c-light folder:c-proj grid-sm:c-team"/>
  <stage n="16" t="Entrevistas" circles="c-code c-code c-work c-work c-chat c-chat c-silent c-silent c-none c-none c-light c-light c-proj c-proj c-team c-team"/>
</b-gruppy-chain>
<b-cap>Todos los números y nombres son ejemplos</b-cap>

<b-chapter id="why" icon="target" title="Qué decisión respalda">

La **tarea de negocio** sale del [informe](/blog/chatgpt-enterprise-usage-report/#why): para qué tareas de trabajo se queda corto el conjunto actual de herramientas de IA y qué probar antes de comprar. El informe también dice quién toma la decisión y por qué señales. La muestra decide de quién se verán las tareas en las entrevistas.

Primero, define qué formas de resolver tareas necesitas ver: con la herramienta de IA corporativa, con otras herramientas de IA, a mano o a través de compañeros, y entre quienes probaron la herramienta y la dejaron. El [informe de uso de ChatGPT Enterprise](/blog/chatgpt-enterprise-usage-report/) es una de las fuentes: encuentra al primer grupo y a quienes la dejaron. Los usuarios de otras herramientas se encuentran con un [cuestionario](/blog/ai-interviews-without-leading-questions/#form) para toda la empresa y con las listas de licencias y compras.

  <b-io justify>
    <item k="Entrada">Tabla de personas del informe, un cuestionario para toda la empresa, listas de licencias y compras</item>
    <item k="Qué hace el método">Elige 2 personas para cada forma de resolver tareas</item>
    <item k="Decisión de salida">Con quién hablar antes de comprar y qué probar, hasta la conclusión de que no hace falta ninguna herramienta nueva</item>
  </b-io>
</b-chapter>

<b-chapter id="top" icon="bar-chart" title="Por qué no basta una lista de los más activos">
  <b-why>Tres formas de reclutar a 16 personas. El color del punto es el escenario de uso. Las personas más activas y los voluntarios son buenos entrevistados y pertenecen a cualquier muestra, pero no bastan por sí solos.</b-why>
  <b-gruppy-compare>
    <way kind="bad" s="partial" t="Top por mensajes" dots="c-chat c-chat c-chat c-chat c-chat c-chat c-work c-chat c-chat c-chat c-chat c-chat c-work c-chat c-chat c-chat">escenarios: **2 de 8**</way>
    <way kind="bad" s="partial" t="Voluntarios" dots="c-chat c-chat c-code c-chat c-code c-chat c-proj c-chat c-chat c-code c-chat c-chat c-proj c-chat c-chat c-chat">escenarios: **3 de 8**</way>
    <way kind="good" s="full" t="Grupos polares" dots="c-code c-code c-work c-work c-chat c-chat c-silent c-silent c-none c-none c-light c-light c-proj c-proj c-team c-team">escenarios: **8 de 8**</way>
  </b-gruppy-compare>
  <b-finding>
    <ex>El top por mensajes cubre 2 de 8 escenarios, los voluntarios cubren 3 y los grupos polares cubren los 8.</ex>
    <gen>Las personas más activas y receptivas conocen mejor la herramienta y vale la pena invitarlas. Se parecen entre sí y juntas describen uno o dos escenarios. Para oír el resto, la muestra se completa con personas de los extremos de otros atributos.</gen>
    <do>Toma 2–3 personas del top por mensajes. Da los demás puestos a personas con otros escenarios: quienes trabajan solo con Codex, quienes dejaron la herramienta, quienes usan otras herramientas o quienes llevan muchos proyectos.</do>
  </b-finding>
</b-chapter>

<b-chapter id="groups" icon="grid" title="Ocho grupos">
  <b-why>Seis grupos salen de los umbrales del informe, «abandonó» de la fecha de la última actividad y «otras herramientas» del cuestionario. Cada grupo tiene una pregunta que ayuda a comprobar. La respuesta puede ser cualquiera, incluida «no hace falta ninguna herramienta nueva». Los umbrales de aquí son orientativos: ajústalos para que cada grupo tenga entre 2 y 5 personas.</b-why>
  <b-gruppy-groups>
    <group icon="code-alt" color="c-code" t="Más activos en código" c="code &gt; $200 / 3 mo" p="Hana Sato, Luis Moreno">qué falta en el desarrollo: una herramienta, acceso al repositorio o nada</group>
    <group icon="zap-alt" color="c-work" t="Tareas de agente" c="agent &gt; $60 / 3 mo" p="Mira Castellano, Tomás Reid">dónde se queda corto el agente y por qué: los datos, la tarea o el propio agente</group>
    <group icon="search-alt" color="c-chat" t="Investigación intensiva" c="&gt; 3,000 msgs, chat is primary" p="Jonas Keller, Aiko Lind">cómo comprueban las respuestas y si la búsqueda actual basta</group>
    <group icon="card" color="c-silent" t="Solo Codex" c="0 msgs and &gt; $20 / 3 mo" p="Ben Ortiz, Lena Moss">qué tareas resuelven sin el chat y si necesitan algo más</group>
    <group icon="slash" color="c-none" t="Inactivos" c="0 msgs and $0 for the period" p="Pavel Novak, Sara Quinn">cómo resuelven sus tareas y qué opciones consideraron</group>
    <group icon="log-out" color="c-light" t="Probaron y abandonaron" c="had messages, 0 in the last 60 days" p="Farah Nasser, Yara Selim">por qué dejaron de usarla: el resultado, el tiempo, la seguridad o la tarea desapareció</group>
    <group icon="folder" color="c-proj" t="Organizadores de proyectos" c="≥ 6 active projects" p="Elif Demir, Rafael Costa">qué les dan los proyectos y qué les falta</group>
    <group icon="grid-sm" color="c-team" t="Otras herramientas" c="per questionnaire: main AI tool is not the corporate one" p="Nadia Rahimi, Oskar Berg">qué es mejor en la otra herramienta y si la actual puede ofrecerlo</group>
  </b-gruppy-groups>
  <b-stack label="16 interviews by group">
    <seg w="2" color="c-code">2</seg>
    <seg w="2" color="c-work">2</seg>
    <seg w="2" color="c-chat">2</seg>
    <seg w="2" color="c-silent">2</seg>
    <seg w="2" color="c-none" ink="ink">2</seg>
    <seg w="2" color="c-light" ink="ink">2</seg>
    <seg w="2" color="c-proj">2</seg>
    <seg w="2" color="c-team">2</seg>
  </b-stack>
  <b-legend>
    <item color="c-code">código</item>
    <item color="c-work">agente</item>
    <item color="c-chat">investigación</item>
    <item color="c-silent">solo Codex</item>
    <item color="c-none">inactivos</item>
    <item color="c-light">abandonaron</item>
    <item color="c-proj">proyectos</item>
    <item color="c-team">otras herramientas</item>
  </b-legend>
  <b-finding>
    <ex>16 conversaciones: dos en cada uno de los ocho grupos.</ex>
    <gen>Dos o tres personas por grupo muestran si un problema se repite: si dos de tres dicen lo mismo, es una señal. Las personas con valores medios se dejan fuera: sus respuestas se parecen a las de los grupos vecinos y no añaden escenarios nuevos en 16 conversaciones.</gen>
    <do>En cada grupo, ordena a los candidatos por su umbral y toma a los dos con los valores más extremos, de equipos distintos si es posible. Si una persona cae en dos grupos, déjala en aquel donde su valor es más extremo y toma al siguiente candidato en el otro.</do>
  </b-finding>
</b-chapter>

<b-chapter id="teams" icon="alert-circle" title="Cobertura de equipos y reemplazos">
  <b-why>Un paso aparte después del reclutamiento que no cambia los grupos: cuántas de las personas elegidas caen en cada equipo y quién sustituye a quienes rechazan.</b-why>
<b-table>
| Equipo | Usuarios habituales | Elegidos | Estado |
|---|---|---|---|
| Equipo A | <b-bar value="74"/> | <b-gruppy-cov colors="c-code c-chat c-silent c-proj c-light"/> | <b-tag kind="ok" inline>cubierto</b-tag> |
| Equipo B | <b-bar value="66"/> | <b-gruppy-cov colors="c-work c-work c-chat c-none"/> | <b-tag kind="ok" inline>cubierto</b-tag> |
| Equipo C | <b-bar value="51"/> | <b-gruppy-cov colors="c-code c-silent c-none c-proj"/> | <b-tag kind="ok" inline>cubierto</b-tag> |
| Equipo D | <b-bar value="34"/> | <b-gruppy-cov colors="c-team"/> | <b-tag kind="ok" inline>tras el reemplazo</b-tag> |
| Equipo E | <b-bar value="18"/> | <b-gruppy-cov colors="c-light c-team"/> | <b-tag kind="ok" inline>tras el reemplazo</b-tag> |
</b-table>
  <b-finding>
    <ex>Tras reclutar por grupos, los equipos D y E se quedaron sin nadie. Tres candidatos se sustituyeron por personas de D y E con el mismo comportamiento, y ahora los cinco equipos están cubiertos.</ex>
    <gen>Los umbrales de gasto y de mensajes atrapan a los usuarios extremos. Un equipo donde todos usan la herramienta poco nunca cruza un umbral, y sus tareas se caen de la investigación. Por eso los equipos se comprueban en un paso aparte.</gen>
    <do>Reparte a las personas elegidas por equipos. Si un equipo no tiene a nadie, sustituye a un candidato de un grupo adecuado por una persona de ese equipo con el mismo comportamiento. A quien rechace, sustitúyelo por el siguiente candidato del mismo grupo según su umbral.</do>
  </b-finding>
</b-chapter>

<b-chapter id="ask" icon="chat" title="Qué averiguar en la entrevista">
  <b-why>La conversación parte de la última tarea de trabajo, no de la herramienta: qué necesitaban conseguir, con qué medios contaban, qué eligieron y cómo llegaron al resultado. El guion completo está en el [artículo sobre la entrevista](/blog/ai-interviews-without-leading-questions/#script).</b-why>
  <b-gruppy-phases>
    <b-gruppy-phase icon="clock-sm" color="c-chat" t="Tarea">
      <item t="La última tarea de trabajo">Qué necesitaban conseguir y para quién</item>
      <item t="Medios y elección">Con qué contaban, qué eligieron y por qué</item>
    </b-gruppy-phase>
    <b-gruppy-phase icon="eye-wide" color="c-proj" t="Camino">
      <item t="Cómo llegaron al resultado">Qué usaron tal cual, qué terminaron ellos mismos</item>
      <item t="Esfuerzo y restricciones">Tiempo, datos, acceso, seguridad</item>
    </b-gruppy-phase>
    <b-gruppy-phase icon="check-thin" color="c-work" t="Un caso de éxito">
      <item t="Cuando salió bien">Qué fue distinto entonces</item>
    </b-gruppy-phase>
    <b-gruppy-phase icon="trend-up" color="c-code" t="Abandono y cambio">
      <item t="Dejaron o cambiaron de herramienta">A cuál cambiaron y por qué</item>
    </b-gruppy-phase>
  </b-gruppy-phases>
  <b-finding>
    <ex>Seis puntos: cuatro sobre una tarea, un caso de éxito, y abandono o cambio.</ex>
    <gen>El relato de una tarea pasada da hechos: se ve dónde la persona eligió la IA, dónde otra vía, y por qué. El caso de éxito muestra lo que ya funciona; el abandono y el cambio muestran por qué se sustituyen las herramientas. Un pronóstico sobre el futuro no se puede comprobar.</gen>
    <do>Pídeles que nombren su última tarea de trabajo en los primeros minutos y lleva toda la conversación sobre ella. Si la persona no menciona la IA, pregunta qué opciones consideró, no por qué no la usa.</do>
  </b-finding>
</b-chapter>

<b-chapter id="order" icon="list-dotted" title="Procedimiento">
  <b-gruppy-steps>
    <step t="Reúne candidatos en ocho grupos">Seis grupos con umbrales del informe, «abandonó» con la fecha de la última actividad, «otras herramientas» con el cuestionario</step>
    <step t="Quédate con 2 personas por grupo">De equipos distintos si puedes elegir; una persona en un solo grupo</step>
    <step t="Comprueba la cobertura de los equipos">Si un equipo no tiene a nadie, sustituye a un candidato por una persona de ese equipo con el mismo comportamiento</step>
    <step t="Programa entrevistas de 30 minutos">La conversación parte de la última tarea de trabajo: qué necesitaban conseguir, con qué medios contaban, qué eligieron y cómo llegaron al resultado. Con quienes dejaron la herramienta, habla también de por qué lo hicieron</step>
  </b-gruppy-steps>
  <b-gruppy-limit t="Limitación.">16 entrevistas muestran qué problemas existen y qué aspecto tienen en el trabajo real. No pueden decir cuántas personas de la empresa se topan con cada uno. Para conocer la escala, envía a toda la empresa un [cuestionario](/blog/ai-interviews-without-leading-questions/#form) corto, redactado después de las entrevistas. Si los problemas no se confirman, eso también es un resultado: no hace falta ninguna herramienta nueva.</b-gruppy-limit>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Preguntas frecuentes">
  <b-faq-cards>
    <q t="¿A cuántas personas hay que entrevistar antes de comprar IA?">A 16 personas: dos de cada uno de ocho grupos polares.</q>
    <q t="¿Por qué no basta con entrevistar a los usuarios más activos?">Se parecen entre sí y juntos describen uno o dos escenarios: el top por mensajes cubre 2 escenarios de 8.</q>
    <q t="¿Cómo se eligen las personas para los grupos?">A partir del informe, una encuesta y las listas de licencias: en cada grupo se toma a las dos personas con los valores más extremos, de equipos distintos si es posible.</q>
    <q t="¿Qué preguntar en la entrevista?">Sobre la última tarea real: dónde la persona eligió la IA, dónde otra vía, y por qué.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Más lecturas">
  <b-links>
    <item href="/blog/chatgpt-enterprise-usage-report/" k="Informe" t="Informe de uso de ChatGPT Enterprise">Cómo construir el informe de uso de donde sale la tabla de personas</item>
    <item href="/blog/ai-interviews-without-leading-questions/" k="Entrevistas" t="Entrevistas sin preguntas capciosas">Cómo llevar la conversación por voz o con cuestionario y reunir las respuestas en Airtable</item>
  </b-links>
</b-chapter>
<b-footer>Diseño de la muestra de entrevistas basado en recomendaciones de <a href="https://t.me/Kseniya_Vasil" target="_blank" rel="noopener">@Kseniya_Vasil</a>. Todos los nombres, equipos y números de los ejemplos son ficticios.</b-footer>
</b-post>
