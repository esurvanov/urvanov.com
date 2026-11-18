---
title: Codex o ChatGPT: qué elegir para trabajar con código
seoTitle: Codex o ChatGPT: qué elegir para programar (2026)
date: 2026-11-17
updated: 2026-11-18
description: El chat responde con texto; el agente Codex edita el proyecto y ejecuta las pruebas por sí solo. Cuándo sirve cada uno, tabla, planes, prompts y preguntas.
tags: IA, Codex, ChatGPT, agente, harness, Claude Code, Cursor
category: harness
layout: wide
mentions: Codex, ChatGPT, Claude Code, Cursor, AGENTS.md
toc: answer=Respuesta rápida | modes=Tres modos | table=Lado a lado | plans=Plan y límites | pick=Cuándo cada uno | start=Cómo empezar | faq=Preguntas | next=Seguir leyendo
---

Codex o ChatGPT, qué elegir, lo decide la tarea. ChatGPT responde con texto: explica y revisa un fragmento que pegas. Codex trabaja dentro del proyecto: lee el código, edita archivos, ejecuta pruebas y prepara una pull request. Para una pregunta usa el chat y para cambiar un repositorio, Codex, que viene incluido en los planes de ChatGPT sin pago aparte.

<b-post series="prompts">
<b-chapter id="answer" title="Respuesta rápida" icon="crosshair">
  <b-why>En la ayuda de OpenAI, ChatGPT se divide en los modos Chat, Work y Codex; Codex se elige cuando hacen falta detalles técnicos y trabajo de desarrollo<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: “Select Codex when you want developer views or more technical detail, especially for software development” — learn.chatgpt.com/docs/use-chatgpt"/>.</b-why>

  <iso-art name="codex-or-chatgpt-what-to-choose/chat-vs-agent"></iso-art>
  <b-cap>A la izquierda, el chat: pegas código, recibes texto y lo pasas a mano. A la derecha, el agente: abre el proyecto, edita y comprueba por su cuenta.</b-cap>
  <b-sublabel top="18">Qué significa, en palabras sencillas</b-sublabel>

  ChatGPT es la aplicación de OpenAI donde hablas con un modelo en tres modos: Chat, Work y Codex. El chat solo ve lo que pegaste y responde con texto. Un agente para programas, y Codex es uno de ellos, abre por sí mismo los archivos de tu proyecto, los cambia y comprueba el resultado con comandos. Una pull request es una propuesta para incorporar cambios a la rama principal del proyecto: los compañeros la revisan y la aceptan o la devuelven para corregir. En todos los modos el modelo es de la familia GPT, así que la elección depende del acceso al proyecto y de lo que quieras recibir al final.

  Ejemplo cotidiano. Timur vive en Almaty y mantiene una tienda en línea. Por la mañana pega en el chat una función que no conoce y pide que le explique cómo calcula el descuento: la respuesta llega como texto y le basta. Por la tarde tiene que arreglar una prueba que falla. Abre Codex, nombra la prueba y pide que ejecute todas las comprobaciones tras el cambio. El agente encuentra el archivo, lo modifica, lanza las pruebas y muestra la lista de cambios. Una pregunta y una corrección: dos modos en un solo día.

  Un error frecuente es pedirle al chat que arregle un repositorio. El chat devuelve un trozo de código, y meterlo en los archivos correctos y lanzar las pruebas te toca a ti. Si notas que pasas las respuestas al proyecto a mano una y otra vez, esa tarea es para Codex. El error inverso es arrancar un agente para preguntar «cómo funciona esto». Para una explicación basta el chat y no hace falta tocar el proyecto.

  Puedes comprobar tu elección con una pregunta: después de la respuesta, ¿tengo que cambiar algo en los archivos y ejecutarlo? Si es así, toma Codex; si solo necesitas la respuesta, el chat.
</b-chapter>
<b-chapter id="modes" title="Los tres modos de ChatGPT" icon="layers">
  <b-why>La ayuda de OpenAI describe los modos en una línea: Chat para una pregunta y una conversación, Work para una tarea grande hasta un resultado revisable, Codex para desarrollo<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: “Use Chat for a question or back-and-forth” — learn.chatgpt.com/docs/use-chatgpt"/>.</b-why>

  Un modo es una forma de trabajar con el mismo modelo: de él depende lo que recibes al final y qué acceso obtiene ChatGPT. Los tres modos están en una sola aplicación y comparten la suscripción.
  <iso-art name="codex-or-chatgpt-what-to-choose/three-modes"></iso-art>
  <b-cap>Qué entrega cada modo: Chat, texto; Work, un documento o una tabla ya hechos; Codex, cambios en el código, el resultado de las pruebas y una pull request.</b-cap>
  <b-sublabel top="18">Una situación de principio a fin</b-sublabel>

  Nadia vive en Berlín y lleva un pequeño servicio de reserva de citas. En un solo día necesita los tres modos. Por la mañana pregunta en qué se diferencian dos formas de guardar la hora en la base de datos: eso es Chat. A mediodía necesita un resumen para el cliente con lo hecho en el mes: activa Work y recibe un documento terminado. Por la tarde tiene que corregir el cálculo de la duración de una cita y comprobarlo con pruebas: eso es Codex. A cada modo llegó partiendo del resultado que quería obtener.

  <b-sublabel top="18">Chat: pregunta y conversación</b-sublabel>

  Chat es el modo para una pregunta o una conversación con idas y vueltas. La ayuda de OpenAI da ejemplos: ideas, borradores, resúmenes de archivos. También sirve para código cuando hay que entender un fragmento o un error: pegas el texto y recibes una explicación. El resultado siempre es texto. Ejemplo: Nadia pegó un mensaje de error del registro y preguntó qué significaba.

  <b-sublabel top="18">Work: una tarea grande hasta el resultado</b-sublabel>

  En el modo Work, ChatGPT asume una tarea grande y la lleva hasta un resultado que se puede revisar. Este modo se activa en el selector. Entrega un documento, una tabla o una investigación ya hechos. En la web funciona en un entorno de nube gestionado<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: “ChatGPT Work runs in a managed cloud environment” — learn.chatgpt.com/docs/use-chatgpt"/>. Ejemplo: Nadia pidió reunir el resumen para el cliente y recibió un documento que solo quedaba leer y enviar.

  <b-sublabel top="18">Codex: cambios en el proyecto</b-sublabel>

  Codex es el modo para desarrollo: detalles técnicos y vistas de ingeniería. Lee el repositorio por sí mismo, edita archivos, ejecuta pruebas y prepara una pull request. Si quieres un esquema del concepto, está en el glosario.
  <iso-art name="term:codex"></iso-art>

  Ejemplo: Nadia nombró la prueba que falla y limitó el cambio a una carpeta. A los pocos minutos tenía la lista de cambios y el resultado de la ejecución. Las restricciones regionales de Codex no se tratan en este artículo: hay <a href="/blog/codex-access-regions-vpn-bans/">un artículo aparte sobre el acceso a Codex</a>.

  <b-sublabel top="18">Dónde se abre cada modo</b-sublabel>

  Chat se abre en el sitio web y en la aplicación móvil<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: Chat is available on the web and mobile — learn.chatgpt.com/docs/use-chatgpt"/>. Work funciona en el sitio, en un entorno de nube gestionado, y en la aplicación de escritorio. Codex se elige en la aplicación de escritorio; OpenAI cita entre sus lugares la terminal, la extensión para IDE y la nube<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: Codex is selected in the desktop app; places include CLI, IDE extension, Cloud — learn.chatgpt.com/docs/use-chatgpt"/>. El guion en el esquema significa que la ayuda no nombra ese lugar para ese modo.
  <iso-art name="codex-or-chatgpt-what-to-choose/where-to-open"></iso-art>
  <b-cap>Lugares donde se abre cada modo. La terminal y la extensión para IDE aparecen solo en Codex.</b-cap>
</b-chapter>
<b-chapter id="table" title="Codex y ChatGPT lado a lado" icon="table-grid">
  <b-why>Las filas salen de la ayuda de OpenAI sobre modos y planes; la fuente está junto a cada icono. Fecha de comprobación: 18.11.2026.</b-why>

  David vive en Tiflis y decide por dónde empezar en un equipo de tres personas. Toma la tabla comparativa como chuleta: recorre las filas «para qué», «qué entrega» y «ve el proyecto» y ve enseguida que el chat no sustituye a un agente en el repositorio. Puedes comprobar la tabla tú mismo en dos páginas de OpenAI: la ayuda sobre modos y la ayuda sobre planes.
  <b-sublabel top="18">Cómo trabaja Codex</b-sublabel>

  El trabajo de Codex es un ciclo de varios pasos. El agente lee el proyecto, edita archivos, ejecuta pruebas y muestra el diff, es decir, la lista de cambios línea por línea. Si las pruebas fallan, vuelve a corregir. Al final entrega una pull request que revisa una persona. Las instrucciones del proyecto el agente las toma del archivo AGENTS.md: conviene anotar allí los comandos de compilación y las prohibiciones.
  <iso-art name="codex-or-chatgpt-what-to-choose/codex-loop"></iso-art>
  <b-cap>El ciclo de Codex: lee, edita, ejecuta pruebas y, si fallan, edita de nuevo; el diff y la pull request los revisa una persona.</b-cap>
  <b-sublabel top="18">Tabla comparativa</b-sublabel>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th></th><th>ChatGPT Chat</th><th>ChatGPT Work</th><th>Codex</th></tr>
    </thead>
    <tbody>
      <tr><td>Para qué</td><td>pregunta y conversación: ideas, borradores, resúmenes de archivos<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: “Use Chat for a question or back-and-forth” — learn.chatgpt.com/docs/use-chatgpt"/></td><td>una tarea grande hasta un resultado revisable<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: “carry a larger task through to a reviewable result” — learn.chatgpt.com/docs/use-chatgpt"/></td><td>desarrollo: detalles técnicos y vistas de ingeniería<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: Codex is the mode for technical detail in the mode table — learn.chatgpt.com/docs/use-chatgpt"/></td></tr>
      <tr><td>Qué entrega</td><td>texto</td><td>un resultado terminado: documento, tabla, investigación</td><td>cambios en el código, resultado de las pruebas, pull request</td></tr>
      <tr><td>Ve el proyecto</td><td>solo lo que pegas</td><td>aquello a lo que le das acceso</td><td>lee el repositorio por sí mismo</td></tr>
      <tr><td>Dónde abrirlo</td><td>sitio web y aplicación móvil<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: Chat is available on the web and mobile — learn.chatgpt.com/docs/use-chatgpt"/></td><td>sitio web y aplicación de escritorio; en la web funciona en un entorno de nube gestionado<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: “ChatGPT Work runs in a managed cloud environment” — learn.chatgpt.com/docs/use-chatgpt"/></td><td>aplicación de escritorio, terminal, extensión para IDE, nube<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: Codex is selected in the desktop app; places include CLI, IDE extension, Cloud — learn.chatgpt.com/docs/use-chatgpt"/></td></tr>
      <tr><td>Plan</td><td colspan="3">Work y Codex están incluidos en Free, Go, Plus, Pro, Business, Edu y Enterprise; no hay pago aparte<b-proof href="https://learn.chatgpt.com/docs/pricing" quote="OpenAI: “ChatGPT Work and Codex are included in your ChatGPT Free, Go, Plus, Pro, Business, Edu, or Enterprise plan” — learn.chatgpt.com/docs/pricing"/></td></tr>
      <tr><td>Límites</td><td colspan="3">dependen del plan; en Free y Go Codex está pensado para tareas ligeras, y Plus cuesta 20 dólares al mes<b-proof href="https://learn.chatgpt.com/docs/pricing" quote="OpenAI: Free — quick coding tasks, Go — lightweight tasks, Plus — $20/month — learn.chatgpt.com/docs/pricing"/></td></tr>
      <tr><td>Con clave de API</td><td>—</td><td>—</td><td>la terminal, el SDK y el IDE funcionan a tarifas de API; las funciones de nube, como la revisión en GitHub, no entran en este modo<b-proof href="https://learn.chatgpt.com/docs/pricing" quote="OpenAI: an API key lets you use Codex in the CLI, SDK or IDE at API rates; cloud features not included — learn.chatgpt.com/docs/pricing"/></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>El modelo de los tres modos es de la familia GPT; cambian el acceso al proyecto y el tipo de resultado.</b-cap>
</b-chapter>
<b-chapter id="plans" title="Plan y límites" icon="card">
  <b-why>Work y Codex no se venden por separado: vienen incluidos en los planes de ChatGPT<b-proof href="https://learn.chatgpt.com/docs/pricing" quote="OpenAI: “ChatGPT Work and Codex are included in your ChatGPT Free, Go, Plus, Pro, Business, Edu, or Enterprise plan” — learn.chatgpt.com/docs/pricing"/>.</b-why>

  El plan es lo que pagas a ChatGPT, y un solo plan abre los tres modos. La diferencia entre planes está en los límites: cuánto trabajo con Codex cabe en tu plan. En Free y Go está pensado para tareas ligeras y rápidas, y Plus cuesta 20 dólares al mes<b-proof href="https://learn.chatgpt.com/docs/pricing" quote="OpenAI: Free — quick coding tasks, Go — lightweight tasks, Plus — $20/month — learn.chatgpt.com/docs/pricing"/>. Las cifras exactas de los límites no aparecen en este artículo: no las encontré, y dependen del plan.
  <iso-art name="codex-or-chatgpt-what-to-choose/one-subscription"></iso-art>
  <b-cap>Un plan abre tres modos. Los límites dependen del plan.</b-cap>
  <b-sublabel top="18">Una situación de principio a fin</b-sublabel>

  Lina vive en Varsovia y escribe scripts para una contabilidad. Abre la página de planes de OpenAI y ve que Codex está incluido incluso en el plan gratuito, aunque allí está pensado para tareas rápidas. Para la primera semana le basta: arregla un script y comprueba que el enfoque funciona. Cuando las tareas se multiplican, pasa a Plus por 20 dólares al mes. Puedes comprobar tu plan en la página de planes de OpenAI: allí hay una línea sobre Codex para cada plan.

  <b-sublabel top="18">Trabajar con clave de API</b-sublabel>

  Una clave de API es una contraseña para programas con la que una aplicación llama al modelo sin suscripción; el pago es por uso real, a tarifas de API. Con esa clave Codex funciona en la terminal (CLI), en el SDK y en la extensión para IDE. Las funciones de nube, como la revisión de código en GitHub, no entran en este modo<b-proof href="https://learn.chatgpt.com/docs/pricing" quote="OpenAI: an API key lets you use Codex in the CLI, SDK or IDE at API rates; cloud features not included — learn.chatgpt.com/docs/pricing"/>.
  <iso-art name="codex-or-chatgpt-what-to-choose/api-key-mode"></iso-art>
  <b-cap>Clave de API: pago a tarifas de API; la terminal, el SDK y el IDE funcionan, las funciones de nube no.</b-cap>
  <b-sublabel top="18">Ideas equivocadas frecuentes</b-sublabel>

  <b>¿Codex se paga aparte?</b> No. Está incluido en los planes de ChatGPT Free, Go, Plus, Pro, Business, Edu y Enterprise, y no hay un cobro separado. Cómo comprobarlo: abre la <a href="https://learn.chatgpt.com/docs/pricing">ayuda de OpenAI sobre planes</a> y busca la línea «included in your ChatGPT … plan».

  <b>¿La clave de API da lo mismo que la suscripción?</b> No. Con la clave funcionan la terminal, el SDK y la extensión para IDE; las funciones de nube no entran en este modo, y el pago va a tarifas de API. Cómo comprobarlo: en la misma ayuda sobre planes, lee el párrafo sobre la clave de API.

  <b>¿En el plan gratuito Codex no está disponible?</b> Sí está: viene en Free, pero pensado para tareas rápidas con código. Cuántas de esas tareas caben en el límite, no lo encontré en la ayuda.
</b-chapter>
<b-chapter id="pick" title="Cuándo elegir cada uno" icon="crosshair">
  <b-why>La elección se hace para cada tarea: los modos comparten una suscripción, así que no hace falta elegir uno para todo el proyecto.</b-why>

  Empieza por preguntarte qué quieres tener al final: una explicación, un documento o un proyecto modificado y comprobado. De la respuesta depende el modo.
  <iso-art name="codex-or-chatgpt-what-to-choose/pick-tree"></iso-art>
  <b-cap>Árbol de elección: de lo que necesitas obtener al modo.</b-cap>
  <b-sublabel top="18">Tabla de elección</b-sublabel>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>Situación</th><th>Qué tomar</th><th>Por qué</th></tr>
    </thead>
    <tbody>
      <tr><td>Entender un fragmento de código ajeno o un error del registro</td><td>ChatGPT Chat</td><td>basta pegar el texto y recibir la explicación</td></tr>
      <tr><td>Arreglar un fallo en el repositorio y comprobarlo con pruebas</td><td>Codex</td><td>encuentra el archivo, lo edita y lanza las pruebas por sí mismo</td></tr>
      <tr><td>Escribir una carta, un encargo técnico, un resumen o una presentación</td><td>ChatGPT Work</td><td>el resultado es un documento, no código</td></tr>
      <tr><td>Un cambio grande en varios archivos, con pull request</td><td>Codex en la nube o en la terminal</td><td>la tarea corre en un entorno aislado y al final entrega cambios para revisar</td></tr>
      <tr><td>Hace falta otro modelo o trabajar dentro del editor</td><td><a href="/blog/ai-in-code-harness-and-tools/">Claude Code o Cursor</a></td><td>Claude Code usa modelos de Claude, Cursor conecta modelos de varias empresas</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-sublabel top="18">Tres situaciones</b-sublabel>

  Oskar vive en Helsinki y sacó de los registros un error que no reconoce. Pega el mensaje en el chat y un minuto después sabe de qué error se trata. No hay nada que cambiar en el proyecto, así que Chat. Irma, en Tallin, prepara para la dirección un resumen del proyecto: necesita un documento y no código, por eso activa Work. Pavel, en Praga, debe corregir el cálculo de envío en cuatro archivos y adjuntar una pull request: le da la tarea a Codex en la nube y recibe cambios para revisar. Cada uno eligió el modo según el resultado que esperaba al final.

  Si tienes que pasar la respuesta al código a mano más de dos veces, dale la tarea a Codex. Si necesitas otro modelo o trabajar en el editor, Claude Code usa modelos de Claude y Cursor conecta modelos de varias empresas; la <a href="/blog/ai-in-code-harness-and-tools/">comparativa de estos agentes</a> está en un artículo aparte.
</b-chapter>
<b-chapter id="start" title="Cómo empezar" icon="zap">
  <b-why>Tres prompts listos: cada uno nombra el objetivo, el lugar y la forma de comprobar. El agente no sabe qué se considera terminado hasta que se lo dices.</b-why>

  Yana vive en Bratislava y lanza Codex por primera vez en un proyecto de trabajo. Sube por una escalera: primero pide que lea y ejecute las pruebas sin cambiar nada, luego que arregle una prueba, después que prepare la pull request. En cada peldaño comprueba el resultado antes de seguir.
  <iso-art name="codex-or-chatgpt-what-to-choose/start-ladder"></iso-art>
  <b-cap>Tres peldaños: leer y ejecutar, un cambio, pull request.</b-cap>
  <b-sublabel top="18">Tres prompts para el agente</b-sublabel>
  <b-codebox>
    Lee README y AGENTS.md. Dime cómo se ejecutan las pruebas y ejecútalas sin cambiar nada. Muestra cuáles fallan.
    Arregla la prueba que falla en tests/orders.test.ts. Edita solo src/orders/. Después del cambio ejecuta todas las pruebas y muestra el diff.
    Prepara una pull request con estos cambios: un título corto, qué se cambió y cómo comprobarlo.
  </b-codebox>
  <b-sublabel top="18">Por qué el primer prompt no cambia nada</b-sublabel>

  El primer prompt comprueba que el agente encuentra y ejecuta las pruebas. Si las pruebas se ejecutan, después el agente puede verificarse a sí mismo. Si no se ejecutan, editar a ciegas no sirve de nada: no sabrá si arregló la prueba. Por eso empieza con una petición de leer y ejecutar, y solo después permite los cambios.

  <b-sublabel top="18">AGENTS.md</b-sublabel>

  AGENTS.md es un archivo con instrucciones para el agente que Codex lee al empezar el trabajo. Allí se anotan los comandos de compilación y de ejecución de pruebas, las carpetas que no se deben tocar y las reglas de estilo. Cuanto más preciso el archivo, menos adivina el agente. Cómo comprobarlo: en el primer prompt pide al agente que cuente cómo se ejecutan las pruebas y compáralo con el archivo.
</b-chapter>
<b-chapter id="faq" icon="chat" title="Preguntas frecuentes">
  <b-faq-cards>
    <q t="¿Codex y ChatGPT son lo mismo?">No. ChatGPT en el modo Chat responde con texto, mientras que Codex trabaja en el proyecto: lee código, edita archivos y ejecuta pruebas. Ambos están en la aplicación de ChatGPT y comparten la suscripción. Fuente: learn.chatgpt.com/docs/use-chatgpt, comprobado el 18.11.2026.</q>
    <q t="¿Hay que pagar aparte por Codex?">No. Codex está incluido en los planes de ChatGPT Free, Go, Plus, Pro, Business, Edu y Enterprise, y los límites dependen del plan. Al trabajar con una clave de API, el pago va a tarifas de API. Fuente: learn.chatgpt.com/docs/pricing, comprobado el 18.11.2026.</q>
    <q t="¿Se puede escribir código solo en un chat normal?">Se puede: el chat explicará, escribirá una función y analizará un error. Pero pasar el resultado al proyecto y ejecutar las pruebas sigue en tus manos. Cuando hay muchos cambios, Codex ahorra tiempo porque abre los archivos y comprueba el resultado por sí mismo.</q>
    <q t="¿Qué usar en lugar de Codex si necesito otro modelo?">Claude Code usa modelos de Claude, Cursor conecta modelos de varias empresas. La elección entre ellos se describe en un artículo aparte. Fuentes: learn.chatgpt.com/docs y code.claude.com/docs/en/overview (comprobado el 15.11.2026, sin repetir para este artículo).</q>
    <q t="¿Qué es el modo Work y en qué se diferencia de Codex?">Work lleva una tarea grande hasta un resultado terminado: un documento, una tabla, una investigación. Codex trabaja con el código del proyecto y entrega cambios, resultado de las pruebas y una pull request. Fuente: learn.chatgpt.com/docs/use-chatgpt.</q>
    <q t="¿Se puede ejecutar Codex con una clave de API en lugar de la suscripción?">Se puede: la terminal, el SDK y la extensión para IDE funcionan a tarifas de API. Las funciones de nube, por ejemplo la revisión de código en GitHub, no entran en este modo. Fuente: learn.chatgpt.com/docs/pricing.</q>
  </b-faq-cards>
</b-chapter>
<b-chapter id="next" title="Seguir leyendo">
  <b-links cols="2">
    <item href="/blog/ai-in-code-harness-and-tools/" k="Comparación" t="Diferencia entre Codex y Claude Code, Cursor y Hermes Agent">Qué agente para qué tarea</item>
    <item href="/blog/specs-rules-skills/" k="Contexto" t="AGENTS.md, CLAUDE.md y spec.md">Qué instrucciones lee el agente</item>
    <item href="/blog/harness-driven-development/" k="Método" t="Harness-Driven Development">El error de un agente se convierte en regla</item>
    <item href="/blog/claude-code-install-and-price/" k="Instalación" t="Claude Code: cómo instalarlo y cuánto cuesta">Comando, inicio de sesión, planes</item>
    <item href="/blog/cursor-rules-vs-agents-md/" k="Reglas" t="Cursor rules vs AGENTS.md">El archivo de reglas que lee Codex</item>
    <item href="/blog/codex-access-regions-vpn-bans/" k="Acceso" t="Codex CLI no está disponible en tu país: países admitidos, VPN y bloqueos">Lista de países e inicio de sesión</item>
    <item href="/blog/ai-agent-llm-harness/" k="Base" t="Qué distingue a un agente de un chat">Agente, asistente, chatbot y red neuronal</item>
    <item href="/blog/work-prompts-examples/" k="Prompts" t="Prompts para tareas de trabajo">Peticiones para Chat y Work</item>
    <item href="/materials/glossary/codex/" k="Término" t="Codex">Qué hace y dónde se ejecuta</item>
  </b-links>
</b-chapter>
<b-footer>Basado en la ayuda de OpenAI; la fuente está junto a cada dato. Fecha de comprobación: 18.11.2026.</b-footer>
</b-post>
