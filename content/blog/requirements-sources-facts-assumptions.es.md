---
title: Cómo escribir requisitos y actas de reunión con IA: fuente, suposición, hecho y qué sigue
date: 2026-10-05
updated: 2026-11-08
description: Requisitos con IA: fuente, suposición, estado. Los hechos llegan por MCP desde Git; el agente hace las ediciones menores y una persona decide las mayores.
tags: IA, agentes, requisitos, alucinaciones, actas de reunión, harness
category: harness
layout: wide
mentions: requirements, meeting notes, hallucinations, sources, assumptions, use cases, change management
toc: what=Qué exigir | sources=Fuentes por MCP | format=Cómo pedirlo | levels=Cambios mayores y menores | cases=Casos de uso | first=Por dónde empezar | faq=Preguntas | next=Siguiente
---

Un agente de IA escribe requisitos con aplomo, y sus conjeturas parecen hechos. Exige una prueba, es decir, un enlace a la fuente, las suposiciones del modelo y un estado de «hecho o no hecho» para cada punto, y conecta las fuentes por MCP, mejor aún desde Git. El agente hace las ediciones menores por sí mismo, y una persona decide las mayores. Base: [MCP para un agente de IA](/blog/mcp-agent-access/#facts).

<b-post series="harness">

<b-chapter id="what" icon="shield-check" title="Qué exigirle al agente">
  <b-why align="left">Un agente cuenta con fluidez las actas y los documentos, y el texto no muestra dónde acaba un hecho y empieza una conjetura. Esto viene de cómo funciona el modelo: continúa el texto de forma verosímil, y un hueco en los datos se rellena con una frase fluida. Por eso cada punto de los requisitos y las actas necesita tres cosas: una prueba (un enlace a la fuente con una cita), una suposición (lo que el agente rellenó por su cuenta) y un estado (hecho, no hecho o una pregunta para una persona).</b-why>
  <iso-art name="requirements-sources-facts-assumptions/marks"></iso-art>
  <b-why align="left">La imagen muestra tres tipos de marcas sobre un mismo punto. La fuente responde a «de dónde se sacó esto»: un enlace a un archivo o una cita de la grabación de una reunión con la hora. La suposición responde a «qué rellenó aquí el modelo»: por ejemplo, la grabación dice «pagamos con tarjeta», no dice nada de la moneda, y el agente escribió «en rublos». Una conjetura así debe estar en su propia línea, aparte de los hechos. El estado responde a «se puede confiar en esto»: «hecho» si hay prueba, «no hecho» si no la hay, y «pregunta» si una persona debe decidir.</b-why>
  <b-table id="marks-example">

| | Sin marcas | Con marcas |
|---|---|---|
| Punto | «Pago con tarjeta en rublos» | «Pago con tarjeta» |
| Fuente | no se indica | reunión del 12 de oct., 14:32, «el cliente paga con tarjeta al finalizar la compra» |
| Suposición | oculta en el texto: «en rublos» | en su propia línea: «pago solo en rublos» |
| Estado | se lee como un hecho | no hecho: la moneda no se discutió en la reunión |
| Qué hace el lector | lo da por bueno | comprueba la suposición o hace una pregunta |

  </b-table>
  <b-rules sw="1.8">
    <rule icon="key" t="Enlace (prueba)">Un enlace a un documento o una cita de la grabación de la reunión con marca de tiempo.</rule>
    <rule icon="help" t="Suposición">Lo que el agente rellenó por su cuenta se escribe en una línea aparte.</rule>
    <rule icon="shield-check" t="Estado">Hecho, no hecho o una pregunta para una persona.</rule>
  </b-rules>
  <b-why align="left">La regla es simple: sin fuente, el estado es «no hecho». Así un punto sin prueba no se convierte en silencio en un requisito. Una persona ve esos puntos como una lista y decide qué hacer con ellos: buscar una fuente, confirmarlo en una reunión o descartarlo. Las marcas aceleran la revisión: una cita con hora se comprueba en segundos, y la línea de suposición indica dónde buscar un error. Dónde obtener fuentes está en el capítulo siguiente, y qué hacer cuando un punto cambia viene después.</b-why>
  <b-finding>
    <ex>Cada punto tiene una fuente, una línea aparte para la conjetura y un estado.</ex>
    <gen>Un punto sin fuente recibe el estado «no hecho», y una persona lo comprueba antes de apoyarse en él. Esto continúa la idea de la sección sobre [alucinaciones en el artículo de MCP](/blog/mcp-agent-access/#facts).</gen>
    <do k="Qué hacer">Añade las tres marcas a tu plantilla de requisitos y actas.</do>
  </b-finding>
</b-chapter>

<b-chapter id="sources" icon="plug" title="Fuentes por MCP: Git funciona mejor">
  <b-why align="left">La marca de «fuente» funciona solo si el agente toma los hechos de sistemas reales en lugar de recordarlos. Para eso el agente se conecta a los sistemas por MCP: abre él mismo un archivo, una grabación de reunión o una página y cita el lugar exacto<b-proof href="https://modelcontextprotocol.io/docs/getting-started/intro" quote="MCP (Model Context Protocol) is an open-source standard for connecting AI applications to external systems."/>. Pero las fuentes son fiables en distinto grado. Git encaja mejor: los requisitos viven como archivos junto al código, cada edición tiene autor, fecha y motivo, y las versiones anteriores se ven en el historial. Confluence sirve solo si las páginas están cuidadas: cada una tiene un responsable y una fecha de revisión, y las caducadas se archivan. Si no, el agente lee una página vieja como un hecho y produce una alucinación, aunque el modelo no haya inventado nada por su cuenta. Una fuente aparte son las actas de reuniones: lo que se acordó, con un enlace a la grabación. Pero lo acordado y lo que hay en el código pueden divergir, así que hay que contrastarlo con lo que realmente está en Git: las reuniones y el código se desincronizan.</b-why>
  <iso-art name="requirements-sources-facts-assumptions/sources-mcp"></iso-art>
  <b-why align="left">A la derecha de la imagen hay tres tipos de fuentes, a la izquierda el resultado. El agente se conecta a ellas por MCP (los cables con enchufes), toma los hechos y escribe requisitos donde cada punto tiene un enlace y un estado. Git va primero: es la fuente principal. Confluence está dibujado con línea discontinua: se conecta solo cuando las páginas están al día. Las grabaciones de reuniones son una fuente aparte: de ellas el agente toma lo que se acordó, con un enlace y una hora. Lo acordado debe contrastarse con el código en Git: las reuniones y el código se desincronizan.</b-why>
  <b-why align="left">Conviene llevar las fuentes en un registro: una fila por fuente. La tabla tiene tres columnas: el enlace (adónde ir), la descripción (qué hay y cuán reciente es) y el tipo (Git, grabación de reunión, Confluence). En la línea «Fuente» de cada requisito el agente pone un enlace de este registro.</b-why>
  <b-table id="sources-registry">

| Enlace | Descripción | Tipo |
|---|---|---|
| git.example.com/shop/requirements/payments.md | El requisito «Pago con tarjeta»; el historial de ediciones, los autores y los motivos se ven en los commits | Git: archivo |
| git.example.com/shop/requirements/tags | Versiones de requisitos: v1.1, v2.0 | Git: tags |
| tldv.io/meeting/12-10 | Grabación de la reunión del 12 de oct.: qué se acordó, citas con hora; contrastar con el código, pueden divergir | Acuerdo: actas de reunión |
| confluence.example.com/pay-rules | Reglas de pago; la página tiene un responsable, revisada el 1 de oct. | Confluence, solo páginas al día |

  </b-table>
  <b-finding>
    <ex>El agente toma los hechos por MCP del registro de fuentes, y cada requisito tiene un enlace de él.</ex>
    <gen>Las actas muestran lo que se acordó, y hay que contrastarlas con el código en Git: las reuniones y el código se desincronizan. En Git una edición tiene autor, fecha y motivo, y una versión de requisito corresponde a un tag, así que comprobar y revertir es sencillo. Una página de Confluence sin responsable ni fecha de revisión se desactualiza sin que nadie lo note, y el agente cuenta el texto obsoleto como un hecho.</gen>
    <do k="Qué hacer">Empieza un registro con tres columnas: enlace, descripción, tipo. Empieza por Git, y añade una página de Confluence solo después de comprobarla: tiene responsable, fecha, y lo sobrante está archivado.</do>
  </b-finding>
</b-chapter>

<b-chapter id="format" icon="lines" title="Cómo pedirlo en actas y requisitos">
  <iso-art name="requirements-sources-facts-assumptions/pipeline"></iso-art>
  <b-say-agent title="Díselo al agente" plain>Analiza la grabación de la reunión y escribe una lista de requisitos. Para cada punto da la fuente (un enlace del registro y una cita con la hora), tus suposiciones en una línea aparte y un estado: hecho, no hecho o pregunta. Si no hay fuente, márcalo como «no hecho».</b-say-agent>
  <b-why align="left">El prompt pide al agente que divida la grabación en puntos, cada uno con tres marcas. Su última frase importa: prohíbe tratar un punto como un hecho cuando no hay fuente. Un prompt así sirve para una grabación de reunión, un correo, un hilo de chat y cualquier documento.</b-why>
  <b-codebox title="Plantilla de un punto">
    Requisito: Pago con tarjeta
    Fuente: git.example.com/shop/requirements/payments.md, línea 12; reunión del 12 de oct., 14:32, «el cliente paga con tarjeta al finalizar la compra»
    Suposición: pago en una sola moneda
    Estado: hecho | no hecho | pregunta
    Confirmado por: —
  </b-codebox>
  <b-why align="left">Cómo leer la plantilla. «Requisito» es el nombre corto del punto. «Fuente» es un enlace del registro y una cita con hora: el revisor encuentra el lugar en segundos. «Suposición» es lo que la fuente no dice pero el agente decidió por sí mismo (moneda, plazo, rol). «Estado» es «hecho» si la fuente lo dice sin rodeos, «no hecho» para una conjetura y «pregunta» si una persona debe decidir. «Confirmado por» lo rellena una persona: un nombre y la fecha de revisión. Mientras tenga un guion, el punto no se considera aceptado.</b-why>
  <b-codebox title="Ejemplo de respuesta del agente">
    Requisito: Pago con tarjeta
    Fuente: reunión del 12 de oct., 14:32, «el cliente paga con tarjeta al finalizar la compra»
    Suposición: pago solo en rublos
    Estado: no hecho
    Confirmado por: —

    Requisito: Recibo por correo
    Fuente: reunión del 12 de oct., 15:05, «enviamos el recibo al correo del cliente»
    Suposición: ninguna
    Estado: hecho
    Confirmado por: —
  </b-codebox>
  <b-why align="left">El primer punto recibió el estado «no hecho»: la moneda no se nombró en la reunión, así que es una suposición del agente. El segundo punto se dijo en la reunión sin rodeos, así que es un «hecho». Ambos esperan la confirmación de una persona, y la lista de puntos «no hecho» se convierte en el orden del día de la siguiente reunión.</b-why>
  <b-finding>
    <ex>La grabación de la reunión se convierte en requisitos donde cada línea está marcada.</ex>
    <gen>Una cita con marca de tiempo hace que la comprobación lleve segundos, y la línea de suposiciones muestra dónde el modelo rellenó huecos.</gen>
    <do k="Qué hacer">Pasa una de tus reuniones por este prompt y compárala con lo que recuerdas.</do>
  </b-finding>
</b-chapter>

<b-chapter id="levels" icon="layers" title="Cambios mayores y menores">
  <b-why align="left">Cuando un agente o una persona edita un requisito, importa lo serio que sea el cambio. La diferencia es simple: para una edición menor se puede encontrar una prueba, para una mayor no. Una edición menor no cambia el comportamiento del sistema: el punto funciona igual, solo cambió la confianza en él o la redacción. Se puede comprobar con una fuente: encontrar una cita en la grabación de una reunión o ver en el historial de Git que el significado no cambió. Por eso el agente hace las ediciones menores por sí mismo. Una edición mayor cambia el comportamiento del sistema y no hay nada que la confirme: las fuentes todavía no contienen tal decisión, no hay de dónde sacar una prueba. Por eso las ediciones mayores son para una persona: el agente prepara la lista de casos de uso afectados y un borrador, y decide el responsable del requisito. Tras la aprobación, la propia decisión (quién, cuándo y por qué) se registra en Git y se convierte en una nueva fuente. Los números de versión del software funcionan igual: v1.0 → v1.1 significa una pequeña aclaración, v1.0 → v2.0 significa un cambio del que hay que avisar<b-proof href="https://semver.org/" quote="MAJOR version when you make incompatible API changes"/><b-proof href="https://semver.org/" quote="MINOR version when you add functionality in a backward compatible manner"/>.</b-why>
  <iso-art name="requirements-sources-facts-assumptions/versions"></iso-art>
  <b-why align="left">A la izquierda de la imagen está la versión original, v1.0. En el medio, una edición menor: se añade un bloque pequeño, el significado es el mismo, cambia el segundo número (v1.1). A la derecha, una edición mayor: se añade un bloque grande, el comportamiento cambió, cambia el primer número (v2.0). Bajo la edición menor el pie dice «prueba encontrada, lo hace el agente», bajo la mayor «sin prueba, decide una persona».</b-why>
  <b-rules sw="1.8">
    <rule icon="eye" t="Conjetura confirmada">El estado pasa a «hecho», el texto se queda: edición menor.</rule>
    <rule icon="bug" t="Conjetura refutada">Cambia el texto del punto: edición mayor.</rule>
    <rule icon="ban" t="Cambió un hecho">Si la nueva versión de la fuente cambia el comportamiento, la edición es mayor: una prueba muestra qué cambió en la fuente, y si hay que quererlo lo decide una persona.</rule>
    <rule icon="pause" t="Redacción">Una errata o una redacción más clara con el mismo significado va al historial de cambios.</rule>
  </b-rules>
  <b-table id="major-minor">

| Tipo de edición | Qué pasó | Prueba | Qué hace el agente | Qué hace una persona |
|---|---|---|---|---|
| Menor | La conjetura «pago solo en rublos» fue confirmada por la grabación de la reunión: el estado pasa de «no hecho» a «hecho» | hay: tldv.io/meeting/12-10, 14:32, «solo pagamos en rublos» | lo hace él mismo: cambia el estado, añade el enlace y la cita, lo registra en el historial, versión v1.1 | nada: puede echar un vistazo al historial |
| Menor | Se aclaró la redacción: «Pago con tarjeta» pasó a «Pago con tarjeta bancaria» | hay: comparación de versiones en Git, git.example.com/shop/requirements/commit/a1b2c3, cambiaron las palabras, el significado es el mismo | lo hace él mismo y lo registra en el historial | nada |
| Mayor | Alguien propuso aceptar también euros: ni las grabaciones de reuniones ni los documentos dicen nada al respecto | ninguna: las fuentes no tienen tal decisión, no hay de dónde sacar una prueba | prepara: escribe qué cambiará, enumera los casos de uso y las pruebas afectados, redacta v2.0 | decide: el responsable del requisito aprueba o rechaza, la decisión se registra en Git |
| Mayor | Alguien propuso confirmar un pago con un código del banco: los requisitos aún no lo tienen | ninguna: ninguna fuente contiene la decisión | prepara lo mismo | decide: el responsable del requisito aprueba o rechaza |

  </b-table>
  <b-why align="left">La prueba es la frontera entre los dos tipos de ediciones. Si el agente encontró una cita, un archivo o un commit que confirma la edición, es menor y el agente la hace él mismo. Si no hay nada que la confirme, la edición es mayor: el agente escribe con honestidad «sin prueba», prepara la lista de casos de uso afectados y pasa la decisión a una persona. Con Git esto es sencillo: el agente hace commit de una edición menor por sí mismo y presenta una mayor como un merge request que solo una persona puede fusionar. La aprobación del responsable en esa solicitud se convierte después en una prueba para futuras ediciones.</b-why>
  <b-finding>
    <ex>Para una edición menor se puede encontrar la prueba, para una mayor no.</ex>
    <gen>El agente hace lo que una fuente confirma y se detiene donde no hay nada que lo confirme. A la persona le quedan exactamente las decisiones que solo una persona puede tomar.</gen>
    <do k="Qué hacer">Acuerda quién confirma las ediciones mayores y escríbelo en la plantilla.</do>
  </b-finding>
</b-chapter>

<b-chapter id="cases" icon="git-branch" title="Casos de uso">
  <b-why align="left">Un caso de uso (por definición, una descripción estructurada del comportamiento de un sistema al responder a peticiones de actores externos<b-proof href="https://en.wikipedia.org/wiki/Use_case" quote="structured description of a system’s behavior as it responds to requests from external actors"/>) es un escenario de cómo la gente usa un requisito. El requisito «Pago con tarjeta» tiene tres: un pago normal, un rechazo del banco y un pago repetido. Se escriben porque una edición suele tocar uno o dos escenarios, y son los que hay que volver a comprobar. Este es el vínculo con el capítulo anterior: una edición mayor cambia el comportamiento, así que el agente enumera los casos de uso afectados y sus pruebas. Una edición menor no cambia el comportamiento, y el agente solo confirma que los casos de uso siguen como estaban. Así una edición pequeña no obliga a revisar todo el requisito.</b-why>
  <iso-art name="requirements-sources-facts-assumptions/use-cases"></iso-art>
  <b-why align="left">La imagen lo muestra con un ejemplo. A la izquierda está el requisito «Pago con tarjeta». A la derecha, sus tres casos de uso: un pago normal (el cliente paga al momento), un rechazo del banco (un error y un reintento) y un pago repetido (protección contra el doble cobro). El signo de exclamación está en el tercero: digamos que la reunión decidió cambiar la protección contra el doble cobro. Es una edición mayor, y toca solo el pago repetido. El agente enumera exactamente ese caso de uso y sus pruebas, mientras que el pago normal y el rechazo del banco se quedan como estaban.</b-why>
  <b-pills>
    <pill>Caso: camino normal</pill>
    <pill>Caso: error</pill>
    <pill>Caso: repetición</pill>
  </b-pills>
  <b-why align="left">Un ejemplo. En una reunión se decidió que un pago repetido en el plazo de un minuto cuenta como el mismo pedido. Es una edición mayor, y toca solo el caso de uso «repetición». Para él el agente enumera las pruebas que hay que actualizar, por ejemplo «un segundo pago en 30 segundos no cobra dos veces». Los casos de uso «camino normal» y «error» se quedan como estaban, y sus pruebas se ejecutan sin cambios. Si no hay una lista así, el caso de uso afectado lo descubren los usuarios.</b-why>
  <b-finding>
    <ex>El requisito «Pago con tarjeta» se divide en tres casos, y una edición sobre el pago repetido toca solo el tercero.</ex>
    <gen>En una edición mayor el agente enumera los casos afectados, y en una menor confirma que los casos no cambiaron.</gen>
    <do k="Qué hacer">Tras cada edición, pide al agente que enumere los casos afectados y sus pruebas.</do>
  </b-finding>
</b-chapter>

<b-chapter id="first" icon="flag" title="Por dónde empezar">
  <b-why align="left">Paso 1. Registro de fuentes: empieza una tabla de tres columnas y conecta Git por MCP. Paso 2. Añade las tres marcas a la plantilla de puntos y envía al agente un prompt con la grabación de una reunión. Paso 3. Acuerda la regla: si una edición tiene prueba, la hace el agente; si no la tiene, decide una persona. En una hora tienes un acta donde cada punto está marcado y una lista de puntos «no hecho» para la siguiente reunión. Si son muchos, no pasa nada: el agente ha mostrado por primera vez dónde estaban antes las conjeturas.</b-why>
  <b-numchain>
    <step>Registro de fuentes: Git por MCP</step>
    <step>Tres marcas en la plantilla y un prompt para el agente</step>
    <step>Regla: prueba encontrada, el agente hace la edición; sin prueba, decide una persona</step>
  </b-numchain>
  <b-finding>
    <ex>Tres pasos: registro de fuentes, plantilla con un prompt, regla sobre las ediciones.</ex>
    <gen>Empieza con una reunión y un documento: el resultado se ve en una hora.</gen>
    <do k="Qué hacer">Hoy mismo, analiza la grabación de una reunión con la plantilla.</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Preguntas frecuentes">
  <b-faq-cards>
    <q t="¿Cómo evitar que la IA presente una conjetura como un hecho en los requisitos?">Exige un enlace a la fuente para cada punto, una lista de las suposiciones del modelo y un estado de «hecho o no hecho».</q>
    <q t="¿De dónde debe sacar el agente las fuentes?">Por MCP, mejor aún desde Git: un cambio allí tiene autor, fecha e historial.</q>
    <q t="¿Qué cambia el agente por sí mismo y qué decide una persona?">Los cambios menores confirmados por una fuente los hace el agente. Los mayores y los no confirmados los decide una persona.</q>
    <q t="¿Por qué contrastar las actas con el código?">Las reuniones y el código divergen: las actas muestran lo que se acordó, Git muestra lo que realmente se hizo.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Siguiente">
  <b-links>
    <item href="/blog/mcp-agent-access/" k="Fuente" t="Qué es MCP para un agente de IA: qué problema resuelve y cómo delegar la configuración en el agente">Cómo toma el agente los hechos de los sistemas</item>
    <item href="/blog/bug-report-to-reproduction-agent/" k="Ejemplo" t="Cómo hacer QA con un agente de IA tras el soporte: investigar, describir y documentar mediante MCP y skills">El agente reproduce un bug de Jira</item>
    <item href="/blog/analytics-reports-agent/" k="Informes" t="Informes analíticos con un agente de IA: datos de la base, hojas y documentos mediante MCP">El mismo enfoque para la analítica</item>
  </b-links>
</b-chapter>
<b-footer>El ticket, la reunión y los enlaces son inventados para el ejemplo. La plantilla, el registro y las reglas de cambios mayores y menores son práctica de equipo y se pueden modificar.</b-footer>
</b-post>
