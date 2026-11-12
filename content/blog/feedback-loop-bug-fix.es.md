---
title: Cómo corregir errores más rápido con un agente de IA: del botón «Informar de un error» a la corrección
date: 2026-10-20
updated: 2026-11-13
description: Cómo corregir errores más rápido sin teléfono estropeado: el personal informa desde la propia aplicación, se recoge el contexto por ellos, un agente de IA encuentra la causa y una persona aprueba.
tags: IA, agentes, errores, feedback, MTTR, MCP, Claude Code, harness
category: harness
layout: wide
mentions: feedback loop, MTTR, DORA, bug report, AI agent, Claude Code, Model Context Protocol, human-in-the-loop
toc: chain=Dónde se pierde el tiempo | button=Un botón en lugar de contarlo | agent=Agente y persona | modes=Dos modos | cases=Casos y cifras | risks=Riesgos | first=Cómo empezar | faq=Preguntas | next=Seguir leyendo
---

Un ciclo corto de retroalimentación funciona así: un empleado envía un error con un botón dentro de la aplicación, la aplicación adjunta sola el contexto técnico, un agente de IA encuentra la causa y propone un plan, y una persona aprueba el plan y la corrección. Ningún jefe ni ticket vuelve a contar el error. Abajo: dónde se va el tiempo, dos modos, riesgos.

<b-post series="harness">

<b-chapter id="chain" icon="clock" title="Dónde se pierde el tiempo">
  <b-why align="left">Un error suele recorrer un largo camino desde quien lo vio hasta quien lo corrige. La cadena de arriba muestra el camino habitual: empleado, jefe, ticket, aclaraciones, reproducción. La cadena de abajo muestra el ciclo corto: un botón en la aplicación, un informe con contexto, un agente, aprobación humana, publicación. Las barras de debajo muestran con qué frecuencia los informes están incompletos: el 92 % de los errores de Android no tiene pasos de reproducción, cerca del 70 % de los informes de GitHub está incompleto, y solo se transmite el 37–44 % de los errores.</b-why>
  <b-sublabel>El camino habitual</b-sublabel>
  <b-hchain label="Empleado, jefe, ticket, desarrollador, aclaraciones, reproducción">
    <step icon="user" t="Empleado">lo vio</step>
    <step icon="users" t="Jefe">lo contó</step>
    <step icon="file-text" t="Ticket">espera</step>
    <step icon="help" t="Aclaraciones">rondas</step>
    <step icon="bug" t="Reproducción">horas</step>
  </b-hchain>
  <b-sublabel top="22">El ciclo corto</b-sublabel>
  <b-hchain label="Botón en la aplicación, informe con contexto, agente, aprobación humana, publicación">
    <step icon="target" t="Botón">en la aplicación</step>
    <step icon="database" t="Informe">con contexto</step>
    <step icon="bot" t="Agente">causa</step>
    <step icon="check-circle" t="Persona">aprueba</step>
    <step icon="zap" t="Publicación">corregido</step>
  </b-hchain>
  <b-sublabel top="22">Proporción de errores e informes</b-sublabel>
  <b-count-bars>
    <bar k="Sin pasos (Android)" w="92%" color="c-none">92%</bar>
    <bar k="Incompletos (GitHub)" w="70%" color="c-none">~70%</bar>
    <bar k="Transmitidos" w="44%" color="c-light">37–44%</bar>
  </b-count-bars>
  <b-finding>
    <ex>Cada vez que se cuenta de nuevo se pierde lo que más necesita el desarrollador: los pasos, el resultado esperado, el estado de la pantalla.</ex>
    <gen>Los desarrolladores necesitan sobre todo los pasos de reproducción y la traza del error, y a los usuarios les cuesta más darlos<b-proof href="https://thomas-zimmermann.com/publications/files/zimmermann-tse-2010.pdf" quote="Zimmermann et al., What Makes a Good Bug Report — a survey of Apache, Eclipse and Mozilla developers"/>. Reproducir un informe incompleto lleva 201 minutos frente a 120<b-proof href="https://arxiv.org/pdf/2203.12093" quote="A study of bug report completeness — arxiv.org/pdf/2203.12093"/>.</gen>
    <do>Cuenta por cuántas manos pasa un error, desde quien lo vio hasta quien lo corrige.</do>
  </b-finding>
</b-chapter>

<b-chapter id="button" icon="target" title="Un botón en lugar de contarlo">
  <b-why>La persona aporta solo lo que una máquina no puede saber: qué quería y qué vio. La aplicación registra el resto por sí misma.</b-why>
  <b-rules>
    <rule icon="image" t="Captura con un marco">La persona rodea el punto, y los marcos quedan incrustados en la imagen</rule>
    <rule icon="list-check" t="Tres preguntas">Qué hiciste, qué esperabas, qué ocurrió; la primera viene rellenada con los últimos clics</rule>
    <rule icon="mic" t="Voz">Lo dices en voz alta y la transcripción se añade al paso correspondiente</rule>
    <rule icon="history" t="Acciones">Clics, navegación, entradas sin los valores</rule>
    <rule icon="log-lines" t="Peticiones y errores">Las últimas peticiones al servidor con sus respuestas, errores de consola, estado del servidor</rule>
    <rule icon="lock" t="Datos personales ocultos">Nombres, contactos y mensajes en el texto se enmascaran, las claves se recortan</rule>
  </b-rules>
  <b-finding>
    <ex>Describir el error lleva segundos: las respuestas se eligen con un toque.</ex>
    <gen>El informe está escrito para un agente que puede leer cualquier cantidad de detalle técnico, así que todo se recoge de una vez.</gen>
    <do>Pon el botón donde la gente ve el problema, en lugar de un rastreador aparte.</do>
  </b-finding>
</b-chapter>

<b-chapter id="agent" icon="bot" title="Agente y persona">
  <b-why align="left">El agente hace el análisis, la persona toma las decisiones. El agente toma cada informe por separado, lo investiga y devuelve un resumen: qué se ve, la causa probable con el lugar en el código, un plan y riesgos. No cambia ni código ni estados. La persona aprueba el plan. Después el agente hace la corrección en una rama aparte, y la persona fusiona el cambio y lo publica en [producción](/materials/glossary/prod/). La frase enmarcada es una petición lista para el agente.</b-why>
  <b-steps>
    <step t="El agente toma un informe">cada informe va a su propio agente, sin suposiciones compartidas</step>
    <step t="Investiga e informa" hl>qué se ve, la causa probable con el lugar en el código, un plan, riesgos, preguntas; no toca ni código ni estados</step>
    <step t="La persona aprueba el plan">o hace preguntas</step>
    <step t="Corrección">rama, comprobaciones, merge request</step>
    <step t="La persona fusiona y publica">el agente reproduce hasta el final el escenario del informe antes de decir «corregido»</step>
  </b-steps>
  <b-say-agent title="Díselo al agente">Toma los informes de errores abiertos, analiza cada uno con un agente distinto y vuelve con un informe resumen. No cambies nada hasta que yo apruebe.</b-say-agent>
  <b-finding>
    <ex>El rastreador entrega al propio agente las reglas de trabajo al conectarse, así que cada sesión se comporta igual.</ex>
    <gen>Los agentes aportan la velocidad, y las decisiones quedan con la persona en dos puntos: el plan y la fusión.</gen>
    <do>Escribe la orden «investigar → informar → esperar aprobación» donde el agente la lea sin ti.</do>
  </b-finding>
</b-chapter>

<b-chapter id="modes" icon="scales" title="Dos modos: con un botón o automático">
  <b-why align="left">Hay dos modos. Con un botón, el desarrollador lanza el agente con un comando, el agente encuentra la causa y un plan, y la persona aprueba. En el modo automático, el sistema lanza un agente con cada informe, y este escribe la corrección enseguida. La tabla compara los modos por velocidad y coste.</b-why>
  <b-table>
| | Con un botón | Automático |
|---|---|---|
| Quién lo lanza | el desarrollador, con un comando | el sistema, en cuanto llega un informe |
| Qué hace el agente | encuentra la causa y un plan | escribe la corrección enseguida |
| Papel del desarrollador | aprueba el plan, comprueba el cambio | comprueba el cambio terminado |
| Velocidad | minutos hasta un informe | el cambio está listo cuando llega la persona |
| Coste | el agente trabaja solo con los informes que importan | el agente se gasta en cada informe, incluidos duplicados y no errores |
  </b-table>
  <b-finding>
    <ex>Abnormal AI convierte ambos modos en etiquetas de una tarea: la primera pide al agente que encuentre la causa, la segunda que escriba la corrección<b-proof href="https://abnormal.ai/blog/ai-agents-are-absorbing-the-first-pass-on-every-bug" quote="Abnormal AI: AI agents are absorbing the first pass on every bug"/>.</ex>
    <gen>Es más barato empezar con el modo con botón: el desarrollador filtra el ruido antes de que el agente empiece a escribir código.</gen>
    <do>Activa el modo automático cuando el flujo de informes sea limpio y los duplicados escasos.</do>
  </b-finding>
</b-chapter>

<b-chapter id="cases" icon="trend-up" title="Casos y cifras">
  <b-why align="left">Las cifras de la práctica de empresas muestran la escala del efecto: en Wix el tiempo pasó de semanas a horas, y en Ramp con Jam un informe lleva segundos en lugar de 15–20 minutos. La línea bajo la tabla se refiere al ejemplo propio del autor: de 25 informes en el rastreador integrado, 23 están cerrados.</b-why>
  <b-table>
| Quién | Qué hicieron | Antes → después |
|---|---|---|
| Wix | los agentes recogen el contexto, escriben y comprueban la corrección, una persona aprueba | semanas → horas |
| Salesforce | un modelo analiza errores de clientes | ~300 días-persona → menos de una semana |
| Metaview | un agente analiza incidentes, una persona comprueba | 30–45 min → ~5 min |
| LaunchDarkly | los agentes encuentran errores y abren correcciones | ~40 % de los errores únicos llegó a una corrección |
| Ramp + Jam | un informe con captura de pantalla y recogida automática de contexto | 15–20 min → segundos por informe |
  </b-table>
  <b-metric-line value="23 de 25">informes cerrados en el rastreador integrado de una aplicación en funcionamiento</b-metric-line>
  <b-finding>
    <ex>Todos los casos comparten un movimiento: el contexto se recoge antes de que una persona se siente con el error.</ex>
    <gen>El menor tiempo desde el informe hasta la corrección viene de recoger el contexto y de una cadena corta de personas<b-proof href="https://www.wix.engineering/post/from-weeks-to-hours-inside-wix-s-autonomous-bug-fixing-system" quote="Wix Engineering: From weeks to hours — inside Wix’s autonomous bug-fixing system"/>.</gen>
    <do>Mide ahora el tiempo desde el informe hasta la publicación, para tener algo con qué comparar.</do>
  </b-finding>
</b-chapter>

<b-chapter id="risks" icon="alert" title="Riesgos">
  <b-why align="left">El agente lee texto escrito por personas, así que el método tiene sus propios riesgos: informes falsos, datos personales en capturas, pruebas en verde con una función rota y responsabilidad difusa. Las cuatro tarjetas de abajo nombran cada riesgo y cómo eliminarlo.</b-why>
  <b-rules cols="2">
    <rule icon="shield-alert" t="Informe falso">Las personas escriben el texto del informe; el agente lo lee como datos, nunca como órdenes</rule>
    <rule icon="lock" t="Datos personales">El texto se enmascara, la captura va tal cual, y un diálogo avisa de ello</rule>
    <rule icon="check-square" t="Pruebas en verde, función rota">La comprobación es una reproducción del escenario exacto del informe con el mismo tipo de datos</rule>
    <rule icon="users" t="Responsabilidad difusa">Una persona aprueba el plan y fusiona; el silencio no cuenta como consentimiento</rule>
  </b-rules>
  <b-finding>
    <ex>Un agente con acceso de escritura y texto de usuarios es un canal de engaño mediante texto.</ex>
    <gen>Para saber más sobre cómo evitar que los datos se conviertan en órdenes, consulta el artículo sobre [plano de datos y plano de control](/blog/data-plane-control-plane-prompt-injection/).</gen>
    <do>Dale al agente una clave aparte: solo lectura para el análisis, escritura únicamente tras la aprobación.</do>
  </b-finding>
</b-chapter>

<b-chapter id="first" icon="flag" title="Cómo empezar">
  <b-why align="left">Empieza midiendo: primero mide el camino del error, luego añade el botón, después da al agente acceso de lectura y la regla «primero informe, después aprobación». El acceso de escritura y el modo automático se añaden más tarde.</b-why>
  <b-steps>
    <step t="Mide el camino del error">cuántas personas y días hay desde «lo vi» hasta «corregido»</step>
    <step t="Añade el botón">captura de pantalla, tres preguntas, recogida automática de acciones y errores</step>
    <step t="Da al agente acceso de lectura" hl>y la regla: primero informe, después aprobación</step>
  </b-steps>
  <b-finding>
    <ex>Tres pasos sin modo automático y sin acceso de escritura.</ex>
    <gen>Primero una cadena corta de personas, luego la velocidad del agente.</gen>
    <do>Empieza con una aplicación y diez informes.</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Preguntas frecuentes">
  <b-faq-cards>
    <q t="¿Qué es un ciclo corto de retroalimentación?">Un empleado envía un error con un botón de la aplicación, la aplicación adjunta el contexto técnico, un agente encuentra la causa y propone un plan, y una persona aprueba el plan y la corrección.</q>
    <q t="¿Por qué importa un botón «Informar de un error»?">Los desarrolladores necesitan sobre todo los pasos de reproducción y la traza de la pila, y a los usuarios les cuesta más darlos. El botón los recoge solo.</q>
    <q t="¿Dónde decide una persona?">En dos puntos: la aprobación del plan de corrección y la fusión del código.</q>
    <q t="¿Con qué modo conviene empezar?">Con el modo bajo demanda: un desarrollador filtra el ruido antes de que el agente empiece a escribir código.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Seguir leyendo">
  <b-links>
    <item href="/blog/jira-ai-agent-boundaries/" k="Límite" t="Jira y un agente de IA: pros, contras y dónde trazar la línea">Por qué la recogida de errores es un servicio aparte</item>
    <item href="/blog/bug-report-to-reproduction-agent/" k="QA" t="Trabajo de QA tras soporte con un agente de IA">El agente reproduce un error desde Jira</item>
    <item href="/blog/incident-investigation-agent/" k="Incidentes" t="Investigación de incidentes con un agente de IA">Sentry y Grafana mediante MCP</item>
  </b-links>
</b-chapter>
<b-footer>Las cifras proceden de estudios de informes de errores (Zimmermann et al.; arxiv 2203.12093, 2301.01235; Jeong et al.) y de blogs de ingeniería de Wix, Salesforce, Metaview, LaunchDarkly, Abnormal AI y Jam. El ejemplo es el rastreador de errores integrado de una aplicación en funcionamiento, octubre de 2026.</b-footer>
</b-post>
