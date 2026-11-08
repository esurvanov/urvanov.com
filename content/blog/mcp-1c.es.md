---
title: Cómo conectar un agente de IA a 1C con un servidor MCP: dejar entrar a Claude Code, Codex o Cursor en la base de datos sin romperla
date: 2026-10-12
updated: 2026-11-08
description: Un servidor MCP para 1C:Enterprise da a un agente de IA (Claude Code, Codex o Cursor) acceso al código de la configuración y a los datos de la base. Cómo conectarlo en 3 pasos, qué se rompe en la práctica, cómo separar lectura y escritura y cómo comprobar los resultados.
tags: IA, agentes, MCP, 1C, permisos, seguridad, Claude Code, Codex, Cursor
category: harness
layout: wide
mentions: Model Context Protocol, MCP, 1C:Enterprise, AI agent, Claude Code, Codex, Cursor, permissions, prompt injection
toc: what=Qué es | specifics=Particularidades de 1C | breaks=Dónde se rompe | servers=Servidores | cases=Qué se rompe | scheme=Esquema | rights=Permisos | check=Comprobaciones | agents=Agentes | start=Por dónde empezar | faq=Preguntas | next=Sigue leyendo
---

Para dejar entrar a Claude Code, Codex o Cursor en una base de datos de 1C sin romperla, conecta el agente de IA mediante un servidor MCP para 1C (un puente hacia el código de la configuración y los datos de la base) y reparte el acceso. El agente solo lee la base de producción con un usuario sin permisos de escritura, hace los cambios en una copia de pruebas y una persona pasa los cambios a producción por el repositorio tras revisarlos. Abajo: qué servidores existen, qué se rompe en la práctica, la escalera de permisos y cómo comprobar los resultados. Cómo funciona MCP en general se explica en [MCP para un agente de IA](/blog/mcp-agent-access/).

<b-post series="harness">
<b-chapter id="what" icon="plug" title="Qué es un servidor MCP para 1C">
<b-why align="left"><a href="/materials/glossary/mcp/">MCP</a> es un enchufe común entre un agente y un sistema. Para 1C es un <a href="/materials/glossary/mcp-server/">servidor MCP</a> que da al agente código y metadatos de la configuración, datos de la base, ayuda de la plataforma o comprobaciones. Muchos servidores combinan varias cosas. Funciona igual que para cualquier otro sistema: 1C es <a href="/blog/mcp-agent-access/#ours">otro contexto más</a>, como Jira o GitLab, con el mismo enchufe y los mismos agentes. Lo único específico de 1C es cómo llega el servidor a 1C: mediante una exportación, el IDE de 1C, una extensión de la configuración o un procesamiento de datos externo.</b-why>
<b-lane title="What an MCP server gives" color="accent">
<b-scene names="mcp-1c/servers"/>
</b-lane>
<b-table-plain>
<table><thead><tr><th></th><th>Código y metadatos</th><th>Datos de la base</th></tr></thead><tbody><tr><td>Qué ve el agente</td><td>módulos, metadatos, formularios</td><td>catálogos, documentos, registros, informes</td></tr><tr><td>De dónde</td><td>una exportación de la configuración o 1C:EDT</td><td>la base de 1C mediante una extensión de la configuración o un procesamiento de datos externo</td></tr><tr><td>Para qué</td><td>escribe código contra la configuración real, inventa menos</td><td>responde con números de la base, analiza datos</td></tr><tr><td>Riesgo principal</td><td><b-tag-inline kind="no">editar la configuración equivocada</b-tag-inline></td><td><b-tag-inline kind="no">escrituras en producción, datos ajenos</b-tag-inline></td></tr></tbody></table>
</b-table-plain>
<b-finding>
  <ex k="Código">El agente deja de inventar métodos y atributos que no están en la configuración.</ex>
  <gen k="Datos">El agente responde desde la base, lo que significa que también puede cambiarla. Aquí hacen falta reglas de acceso.</gen>
  <do k="Qué hacer">Empieza por el código: es más seguro. Activa el acceso a datos solo siguiendo el esquema de abajo, aunque el servidor pueda hacer ambas cosas.</do>
</b-finding>
</b-chapter>
<b-chapter id="specifics" icon="form" title="En qué se diferencia 1C para un agente de IA">
<b-why align="left">El vibe coding en 1C funciona de otra manera que en los lenguajes habituales: el programa vive en la base de datos y en diseñadores visuales, y el código es solo una parte. El esquema muestra el camino del programa desde el ordenador del <a href="/materials/glossary/ai-agent/">agente de IA</a> hasta producción en <a href="/materials/glossary/gitlab/">GitLab</a> y en 1C.</b-why>
<b-lane title="Program path: local, test, production" color="accent">
<b-scene names="mcp-1c/pipeline"/>
</b-lane>
<b-rules-fixed cols="3" top="12" sw="1.8">
  <rule icon="monitor-hm" t="Local">En GitLab el <a href="/materials/glossary/ai-agent/">agente</a> edita archivos y ejecuta pruebas de inmediato. En 1C edita el volcado y solo puede comprobarlo después de cargarlo en una base, local o de pruebas.</rule>
  <rule icon="git-fork" t="Versiones">En GitLab las versiones viven en un repositorio git con una <a href="/materials/glossary/checks/">comprobación</a>. En 1C viven en el repositorio de la configuración; git existe pero es opcional.</rule>
  <rule icon="cylinder-hm" t="Pruebas y producción">En GitLab el programa y los datos se mantienen separados. En 1C cada entorno tiene su propia base con ambos: actualizar producción significa actualizar la base de producción.</rule>
</b-rules-fixed>
</b-chapter>
<b-chapter id="breaks" icon="alert" title="Dónde se rompe un agente de IA en 1C y por qué">
<b-why align="left">Elige un número para ver qué se rompe y qué ayuda justo debajo del esquema. Cinco particularidades son las más comentadas en los chats de desarrolladores de 1C; la sexta trata de MCP.</b-why>
<b-lane title="What breaks and where" color="warn">
<b-scene names="mcp-1c/breaks"/>
<b-pick-tabs id="brk" tone="warn">
  <tab t="Flojo en 1C">
    <b-pick-cell k="Particularidad" t="Los modelos conocen mal el lenguaje de 1C y su biblioteca estándar"/>
    <b-pick-cell k="Qué se rompe" tone="warn">métodos inventados, sintaxis SQL en lugar del lenguaje de consultas de 1C</b-pick-cell>
    <b-pick-cell k="Qué ayuda" tone="accent">la ayuda de la plataforma mediante MCP, 2–3 ejemplos de la propia configuración del proveedor</b-pick-cell>
  </tab>
  <tab t="Archivos ≠ base">
    <b-pick-cell k="Particularidad" t="Los archivos de servicio no se pueden editar como texto"/>
    <b-pick-cell k="Qué se rompe" tone="warn">el proyecto se desvía de la base, la carga se cuelga durante horas</b-pick-cell>
    <b-pick-cell k="Qué ayuda" tone="accent">ediciones solo a través del servidor MCP, escrituras directas bloqueadas</b-pick-cell>
  </tab>
  <tab t="Formularios con ratón">
    <b-pick-cell k="Particularidad" t="Los formularios, informes y diseños de impresión se construyen con el ratón"/>
    <b-pick-cell k="Qué se rompe" tone="warn">el agente no conecta los eventos, deja un informe vacío, el diseño no cambia</b-pick-cell>
    <b-pick-cell k="Qué ayuda" tone="accent">el esqueleto a mano, al agente solo el código; una captura del formulario para comprobar</b-pick-cell>
  </tab>
  <tab t="Carga lenta">
    <b-pick-cell k="Particularidad" t="Un ciclo de comprobación lento"/>
    <b-pick-cell k="Qué se rompe" tone="warn">actualizar la base tarda decenas de minutos, el agente se pierde e informa demasiado pronto</b-pick-cell>
    <b-pick-cell k="Qué ayuda" tone="accent">actualizaciones en segundo plano, pruebas en un servidor aparte</b-pick-cell>
  </tab>
  <tab t="No en la extensión">
    <b-pick-cell k="Particularidad" t="Una configuración del proveedor bajo soporte, con los cambios en una extensión"/>
    <b-pick-cell k="Qué se rompe" tone="warn">el agente escribe en la configuración principal, arrastra objetos prestados de más</b-pick-cell>
    <b-pick-cell k="Qué ayuda" tone="accent">el proyecto de la extensión indicado en las reglas del agente, la principal cerrada</b-pick-cell>
  </tab>
  <tab t="Se salta la prueba">
    <b-pick-cell k="Particularidad" t="Escritura en producción mediante MCP"/>
    <b-pick-cell k="Qué se rompe" tone="warn">una edición se salta el repositorio y la prueba y llega a los datos reales</b-pick-cell>
    <b-pick-cell k="Qué ayuda" tone="accent">producción solo en lectura, las escrituras van a la base de pruebas</b-pick-cell>
  </tab>
</b-pick-tabs>
</b-lane>
<b-finding>
  <ex k="Diferencia">En 1C el agente necesita un intermediario: el IDE, la ayuda y una plataforma en marcha. Sin ellos edita lo que no puede ver.</ex>
  <gen k="Tamaño">Las configuraciones de proveedor son enormes, con módulos de 15 a 26 mil líneas. El agente recibe una búsqueda por la configuración y lee solo la parte que necesita.</gen>
  <do k="Qué hacer">Empieza por el código y las consultas; deja los formularios y los informes a una persona hasta que el agente muestre resultados estables.</do>
</b-finding>
</b-chapter>
<b-chapter id="servers" icon="cylinder-alt" title="Servidores MCP gratuitos para 1C y 1C:EDT">
<b-why align="left">Hay muchos servidores listos y cambian rápido. Antes de conectar uno, lee qué acciones admite: solo lectura o también escritura.</b-why>
<b-source-rows wide>
  <row t="mcp-1c" note="Código y datos" href="https://github.com/feenlace/mcp-1c" link="GitHub">Estructura de la configuración, búsqueda de código, ayuda del lenguaje y consultas de datos de solo lectura</row>
  <row t="1c_mcp" note="Código y datos" href="https://github.com/vladimir-kharin/1c_mcp" link="GitHub">Un kit para montar un servidor MCP propio dentro de 1C como extensión de la configuración: la configuración lista de fábrica, los datos mediante herramientas propias</row>
  <row t="1c-mcp-toolkit" note="Datos" href="https://github.com/ROCTUP/1c-mcp-toolkit" link="GitHub">Se conecta a la base mediante un procesamiento de datos externo, sin cambiar la configuración</row>
  <row t="EDT-MCP" note="Código" href="https://github.com/DitriXNew/EDT-MCP" link="GitHub">Un plugin para 1C:EDT: el agente trabaja con el proyecto mediante las herramientas del IDE</row>
  <row t="MCP:RSV Data" note="Datos" href="https://infostart.ru/1c/articles/2720241/" link="Infostart">Una extensión para datos y metadatos de cualquier configuración: solo lectura, y solo lo que puede ver el usuario actual</row>
  <row t="bsl-ai-toolkit" note="Código" href="https://github.com/vgtitov/bsl-ai-toolkit" link="GitHub">Reglas, skills y servidores para que el agente trabaje a partir de tu código</row>
  <row t="1c-mcp catalog" note="Catálogo" href="https://github.com/Untru/1c-mcp" link="GitHub">Servidores por grupos: IDE, base de datos, código, ayuda, pruebas</row>
  <row t="1C AI Dev Tools" note="Catálogo" href="https://aitools1c.dev" link="Sitio web">Un catálogo de servidores, skills e integraciones para el desarrollo en 1C con IA</row>
</b-source-rows>
<b-finding>
  <ex k="Elección">Primero el código, los datos como segundo paso, aparte.</ex>
  <gen k="Comprobación">La lista de herramientas del servidor es la lista de lo que el agente podrá hacerle a la base.</gen>
  <do k="Qué hacer">Haz la lista de herramientas del servidor y marca cuáles cambian datos.</do>
</b-finding>
</b-chapter>
<b-chapter id="cases" icon="alert-alt" title="Qué se rompe en la práctica">
<b-why align="left">Los chats abiertos de desarrolladores de 1C describen casos parecidos. Aquí se cuentan con otras palabras y sin nombres. Son ejemplos de la práctica: cada caso no se puede verificar. Elige un caso: el esquema muestra dónde ocurrió, la tarjeta muestra por qué y cómo protegerse.</b-why>
<b-lane title="Cases from practice" color="warn">
<b-scene names="mcp-1c/cases"/>
<b-pick-tabs id="cs" tone="warn">
  <tab t="Producción">
    <b-pick-cell k="Qué pasó" t="Rompió la base de producción">El agente recibió acceso de escritura a producción para ir más rápido. La edición llegó a la contabilidad real y se revirtió desde una copia de seguridad.</b-pick-cell>
    <b-pick-cell k="Por qué" tone="warn">No había una base de pruebas entre el agente y los datos reales; las escrituras en producción estaban abiertas.</b-pick-cell>
    <b-pick-cell k="Protección" tone="accent">Producción solo en lectura. El agente escribe en una base de pruebas; una persona pasa los cambios tras revisarlos.</b-pick-cell>
  </tab>
  <tab t="Cien bases">
    <b-pick-cell k="Qué pasó" t="Borró una lista de cien bases">El agente estaba ordenando el servidor y eliminó lo que sobraba, incluida la lista de bases en funcionamiento.</b-pick-cell>
    <b-pick-cell k="Por qué" tone="warn">Una cuenta con derechos de administrador del servidor, aunque la tarea afectaba a una sola base.</b-pick-cell>
    <b-pick-cell k="Protección" tone="accent">Un usuario aparte para la tarea, con permisos solo sobre una base, sin administración del servidor.</b-pick-cell>
  </tab>
  <tab t="Datos ajenos">
    <b-pick-cell k="Qué pasó" t="Dio al contable los datos del director">Un agente MCP respondía a los empleados. Un contable recibió cifras que no debía ver.</b-pick-cell>
    <b-pick-cell k="Por qué" tone="warn">El servidor accedía a la base con un único usuario compartido con todos los permisos, así que los roles y restricciones de 1C no se aplicaban.</b-pick-cell>
    <b-pick-cell k="Protección" tone="accent">Entrar como la persona que pregunta: así se aplican sus roles y las restricciones a nivel de registro.</b-pick-cell>
  </tab>
  <tab t="Contraseñas en logs">
    <b-pick-cell k="Qué pasó" t="Contraseñas y claves acabaron en los logs">La contraseña de una base se pasó al agente directamente en la petición. Quedó en el registro de llamadas y en el historial del chat.</b-pick-cell>
    <b-pick-cell k="Por qué" tone="warn">Los secretos iban en los argumentos de las herramientas y había archivos junto al proyecto.</b-pick-cell>
    <b-pick-cell k="Protección" tone="accent">Secretos solo en la configuración del servidor, nunca visibles para el agente. Las carpetas con claves cerradas al agente.</b-pick-cell>
  </tab>
  <tab t="«Hecho»">
    <b-pick-cell k="Qué pasó" t="«Hecho», pero nada cambió">El agente añadió un atributo e informó de que estaba hecho. En el modo de usuario no cambió nada: la base no se actualizó tras la edición.</b-pick-cell>
    <b-pick-cell k="Por qué" tone="warn">El informe del agente se aceptó sin comprobar el resultado.</b-pick-cell>
    <b-pick-cell k="Protección" tone="accent">Tras una edición: actualización de la base, comprobación de errores y una prueba automática. «Hecho» solo con un enlace al resultado.</b-pick-cell>
  </tab>
  <tab t="Respuesta errónea">
    <b-pick-cell k="Qué pasó" t="Una consulta sin errores, pero con respuesta errónea">El agente escribió una consulta que se ejecutó sin errores, pero las cifras no coincidían con el informe de 1C.</b-pick-cell>
    <b-pick-cell k="Por qué" tone="warn">El modelo conoce mal los registros y periodos de 1C y escribe la consulta como para una base de datos normal.</b-pick-cell>
    <b-pick-cell k="Protección" tone="accent">Contrastar con el informe estándar de 1C, o responder mediante un informe ya hecho en lugar de una consulta propia.</b-pick-cell>
  </tab>
  <tab t="Datos en la nube">
    <b-pick-cell k="Qué pasó" t="Los datos personales fueron a la nube">El agente recibió un volcado con pasaportes y sueldos, y fue a un modelo en la nube.</b-pick-cell>
    <b-pick-cell k="Por qué" tone="warn">El agente recibió toda la base en lugar de los campos que necesitaba.</b-pick-cell>
    <b-pick-cell k="Protección" tone="accent">Anonimización y solo los campos necesarios. Para datos sensibles, un modelo dentro de tu perímetro.</b-pick-cell>
  </tab>
</b-pick-tabs>
</b-lane>
<b-finding>
  <ex k="Hilo común">Casi todos los casos tratan de permisos y comprobaciones. El modelo es secundario aquí.</ex>
  <gen k="Causa">El agente recibió tantos permisos como un administrador, y su informe se tomó al pie de la letra.</gen>
  <do k="Qué hacer">Repasa los casos y marca qué protecciones ya tienes.</do>
</b-finding>
</b-chapter>
<b-chapter id="scheme" icon="shield-check" title="Un esquema seguro">
<b-why align="left">El agente solo lee la base de producción. Escribe en una base de pruebas. Una persona pasa los cambios a producción tras la revisión.</b-why>
<b-lane title="Reading apart from writing" color="accent">
<b-scene names="mcp-1c/safe-scheme"/>
<b-pick-tabs id="sf" tone="accent">
  <tab t="Leer">
    <b-pick-cell k="Paso" t="El agente lee">Datos y código de producción, para respuestas y análisis.</b-pick-cell>
    <b-pick-cell k="Dónde" tone="accent">Producción, con su propio usuario de 1C con un rol de solo lectura.</b-pick-cell>
    <b-pick-cell k="Por qué">El agente ve datos reales pero no puede cambiarlos.</b-pick-cell>
  </tab>
  <tab t="Escribir">
    <b-pick-cell k="Paso" t="El agente escribe">Código, metadatos y documentos.</b-pick-cell>
    <b-pick-cell k="Dónde" tone="accent">Una base de pruebas o un <a href="/materials/glossary/sandbox/">sandbox</a> con una copia de producción.</b-pick-cell>
    <b-pick-cell k="Por qué">Un error se queda en la base de pruebas y nunca llega a la contabilidad.</b-pick-cell>
  </tab>
  <tab t="Comprobar y pasar">
    <b-pick-cell k="Paso" t="Comprobar y pasar">Pruebas automáticas y luego una persona revisa los cambios.</b-pick-cell>
    <b-pick-cell k="Dónde" tone="accent">Los cambios van al repositorio, producción se actualiza desde él.</b-pick-cell>
    <b-pick-cell k="Por qué">Solo llegan a producción los cambios comprobados, y cada uno tiene una versión.</b-pick-cell>
  </tab>
</b-pick-tabs>
</b-lane>
<b-finding>
  <ex k="Esquema">El error del agente se queda en la base de pruebas y nunca llega a la contabilidad.</ex>
  <gen k="Coste">Hace falta una base de pruebas junto a producción. Eso sale más barato que una sola restauración desde una copia de seguridad.</gen>
  <do k="Qué hacer">Monta un <a href="/materials/glossary/test-stand/">banco de pruebas</a> con una copia de la base antes de conectar el servidor de datos.</do>
</b-finding>
</b-chapter>
<b-chapter id="rights" icon="key" title="Permisos: una escalera de acceso">
<b-why align="left">Los permisos del agente se construyen por escalones: cada uno se abre cuando el anterior ha ido sin sorpresas. <a href="/materials/glossary/permissions/">Qué son los permisos de un agente</a></b-why>
<b-lane title="Access ladder" color="accent">
<b-scene names="mcp-1c/rights"/>
<b-pick-tabs id="rt" tone="accent">
  <tab t="Leer código">
    <b-pick-cell k="Qué puede hacer el agente" t="Leer código">Módulos, metadatos, formularios.</b-pick-cell>
    <b-pick-cell k="Cuándo abrir" tone="accent">De inmediato.</b-pick-cell>
    <b-pick-cell k="Cómo configurarlo">Un servidor con acceso al volcado de la configuración o a un proyecto de EDT, sin acceso a la base.</b-pick-cell>
  </tab>
  <tab t="Leer datos">
    <b-pick-cell k="Qué puede hacer el agente" t="Leer datos">Consultas e informes con su propio usuario de 1C.</b-pick-cell>
    <b-pick-cell k="Cuándo abrir" tone="accent">En una copia de la base, cuando leer código no dio sorpresas.</b-pick-cell>
    <b-pick-cell k="Cómo configurarlo">Un usuario de 1C con un rol de solo lectura; la herramienta «ejecutar cualquier código» desactivada.</b-pick-cell>
  </tab>
  <tab t="Escribir en pruebas">
    <b-pick-cell k="Qué puede hacer el agente" t="Escribir en pruebas">Código, metadatos, documentos.</b-pick-cell>
    <b-pick-cell k="Cuándo abrir" tone="accent">Cuando existan pruebas automáticas.</b-pick-cell>
    <b-pick-cell k="Cómo configurarlo">Una base de pruebas aparte; comprobación de errores y pruebas automáticas después de cada edición.</b-pick-cell>
  </tab>
  <tab t="Escribir en producción">
    <b-pick-cell k="Qué puede hacer el agente" t="Escribir en producción">Nada: este escalón está cerrado al agente.</b-pick-cell>
    <b-pick-cell k="Cuándo abrir" tone="accent">Nunca; solo una persona.</b-pick-cell>
    <b-pick-cell k="Cómo configurarlo">Una persona pasa los cambios por el repositorio tras la revisión.</b-pick-cell>
  </tab>
</b-pick-tabs>
</b-lane>
<b-rules-fixed cols="2" sw="1.8">
  <rule icon="user" t="Su propio usuario de 1C">El agente entra como un usuario aparte o como la persona que lo pidió. Entonces se aplican los permisos habituales y las restricciones a nivel de registro.</rule>
  <rule icon="eye-wide-hm" t="Un rol de solo lectura">Para producción, un rol sin derecho a escribir ni a contabilizar documentos. Ejemplo: en mcp-1c, las consultas a la base son de solo lectura por diseño.</rule>
  <rule icon="prompt" t="Sin código arbitrario">Desactiva en producción la herramienta «ejecutar cualquier código»: se salta todos los permisos.</rule>
  <rule icon="lock-alt" t="Secretos aparte">Las contraseñas y claves viven en la configuración del servidor. Nunca se muestran al agente ni se pasan en las peticiones.</rule>
</b-rules-fixed>
<b-finding>
  <ex k="Datos como comandos">Un comentario en un documento o un correo en la base puede contener una instrucción para el agente. Es una <a href="/materials/glossary/prompt-injection/">inyección de prompts</a>, y los permisos limitan su daño.</ex>
  <gen k="Regla">El agente recibe los permisos de un usuario normal. Lo que el usuario no puede hacer, el agente tampoco.</gen>
  <do k="Qué hacer">Cómo distinguir datos de comandos se explica <a href="/blog/data-plane-control-plane-prompt-injection/">en el artículo sobre la inyección de prompts</a>.</do>
</b-finding>
</b-chapter>
<b-chapter id="check" icon="check-square" title="Comprobar el resultado">
<b-why align="left">El «hecho» del agente es una afirmación. Las comprobaciones y una <a href="/materials/glossary/human-in-the-loop/">persona en el circuito</a> la confirman.</b-why>
<b-lane title="Four checks before a result" color="accent">
<b-scene names="mcp-1c/checks"/>
<b-pick-tabs id="ck" tone="accent">
  <tab t="Errores del IDE">
    <b-pick-cell k="Comprobación" t="Comprobación de errores del IDE"/>
    <b-pick-cell k="Qué detecta" tone="warn">Sintaxis, métodos y atributos que no existen.</b-pick-cell>
    <b-pick-cell k="Cómo ejecutarla" tone="accent">Después de cada edición; el agente muestra el resultado de la comprobación en su informe.</b-pick-cell>
  </tab>
  <tab t="Pruebas automáticas">
    <b-pick-cell k="Comprobación" t="Pruebas automáticas"/>
    <b-pick-cell k="Qué detecta" tone="warn">Un escenario falla, un formulario no se abre.</b-pick-cell>
    <b-pick-cell k="Cómo ejecutarla" tone="accent">Pruebas de escenario y unitarias en la base de pruebas en cada ciclo.</b-pick-cell>
  </tab>
  <tab t="Contraste con 1C">
    <b-pick-cell k="Comprobación" t="Contraste con un informe de 1C"/>
    <b-pick-cell k="Qué detecta" tone="warn">Las cifras del agente no coinciden con la contabilidad.</b-pick-cell>
    <b-pick-cell k="Cómo ejecutarla" tone="accent">El mismo periodo y empresa en el informe estándar; si no coinciden, parar.</b-pick-cell>
  </tab>
  <tab t="Una persona">
    <b-pick-cell k="Comprobación" t="Una persona revisa los cambios"/>
    <b-pick-cell k="Qué detecta" tone="warn">Ediciones en el lugar equivocado, objetos prestados de más, herramientas esquivadas.</b-pick-cell>
    <b-pick-cell k="Cómo ejecutarla" tone="accent">Comparar los cambios antes de pasarlos: solo la extensión, solo los objetos necesarios.</b-pick-cell>
  </tab>
</b-pick-tabs>
</b-lane>
<b-finding>
  <ex k="Error común">El agente edita los archivos de la configuración esquivando las herramientas del IDE, y el proyecto se desvía de la base.</ex>
  <gen k="Regla">Cada «hecho» va respaldado por una comprobación o un enlace al resultado.</gen>
  <do k="Qué hacer">Añade a las reglas del agente: tras una edición, ejecutar la comprobación de errores y mostrar su resultado.</do>
</b-finding>
</b-chapter>
<b-chapter id="agents" icon="prompt" title="Claude Code, Codex y Cursor para 1C">
<b-why align="left">Un servidor MCP para 1C se conecta a cualquier agente que admita MCP. Solo cambia el lugar de configuración.</b-why>
<b-section-h3 top="4">Conexión en 3 pasos</b-section-h3>
<b-step-chain>
  <node t="1. Elige un servidor">Para código o para datos, de la lista de arriba</node>
  <node t="2. Delégalo al agente">«Conecta el servidor MCP de 1C siguiendo su README»</node>
  <node t="3. Prueba en una copia">Pide la lista de herramientas y busca un catálogo</node>
</b-step-chain>
<b-lane title="Where to set it up" color="accent">
<b-scene names="mcp-1c/agents"/>
<b-pick-tabs id="ag" tone="accent">
  <tab t="Claude Code">
    <b-pick-cell k="Dónde configurarlo">el comando <code>claude mcp add</code></b-pick-cell>
    <b-pick-cell k="Para un equipo" tone="accent"><code>.mcp.json</code> en el repositorio</b-pick-cell>
    <b-pick-cell k="Documentación"><a href="https://code.claude.com/docs/en/mcp" target="_blank" rel="noopener">MCP en Claude Code</a></b-pick-cell>
  </tab>
  <tab t="Codex">
    <b-pick-cell k="Dónde configurarlo"><code>~/.codex/config.toml</code> o <code>.codex/config.toml</code> en el proyecto</b-pick-cell>
    <b-pick-cell k="Para un equipo" tone="accent"><code>.codex/config.toml</code> en un proyecto de confianza</b-pick-cell>
    <b-pick-cell k="Documentación"><a href="https://developers.openai.com/codex/mcp" target="_blank" rel="noopener">MCP en Codex</a></b-pick-cell>
  </tab>
  <tab t="Cursor">
    <b-pick-cell k="Dónde configurarlo">el archivo <code>mcp.json</code></b-pick-cell>
    <b-pick-cell k="Para un equipo" tone="accent">un marketplace de servidores del equipo</b-pick-cell>
    <b-pick-cell k="Documentación"><a href="https://cursor.com/docs/context/mcp" target="_blank" rel="noopener">MCP en Cursor</a></b-pick-cell>
  </tab>
</b-pick-tabs>
</b-lane>
<b-finding>
  <ex k="Base común">Los permisos los fijan el servidor y el usuario de 1C. El esquema de arriba funciona con cualquiera de los tres.</ex>
  <gen k="Confirmaciones">Mantén la confirmación activada para las herramientas que cambian datos.</gen>
  <do k="Qué hacer">Delega la configuración al propio agente, como se describe <a href="/blog/mcp-agent-access/#connect">en el artículo sobre MCP</a>.</do>
</b-finding>
</b-chapter>
<b-chapter id="start" icon="flag-alt" title="Por dónde empezar">
<b-why align="left">Tres pasos. Cada uno viene después de que el anterior haya ido sin sorpresas.</b-why>
<b-lane-art names="mcp-1c/start-steps"/>
<b-finding>
  <ex k="Semana 1">El servidor de código y la lectura de datos en una copia de la base. Comprueba a mano 5 respuestas del agente.</ex>
  <gen k="Semana 2">Escritura en una base de pruebas y pruebas automáticas. El agente muestra qué comprobó.</gen>
  <do k="Después">Producción sigue en solo lectura. Pasar los cambios depende de una persona.</do>
</b-finding>
</b-chapter>
<b-chapter id="faq" icon="chat" title="Preguntas frecuentes">
  <b-faq-cards>
    <q t="¿Cómo se conecta un agente de IA a 1C?">Mediante un servidor MCP para 1C, un puente hacia el código de la configuración y los datos de la base. Funciona con Claude Code, Codex y Cursor.</q>
    <q t="¿Cómo evitar romper la base real de 1C?">El agente solo lee la base real con un usuario sin permisos de escritura, edita en una copia de pruebas y una persona pasa los cambios a la base real por el repositorio tras la revisión.</q>
    <q t="¿Qué permisos debe recibir el agente en 1C?">Seguir una escalera de acceso: empezar con solo lectura y subir los permisos paso a paso solo cuando la tarea lo necesite.</q>
    <q t="¿Hay servidores MCP gratuitos para 1C?">Sí, el artículo repasa servidores MCP gratuitos para 1C y 1C:EDT y qué se rompe en ellos en la práctica.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" icon="arrow-right" title="Sigue leyendo">
  <b-links>
    <item href="/blog/mcp-agent-access/" k="Conexión" t="MCP para un agente de IA">cómo conectarlo y delegarlo al agente</item>
    <item href="/blog/data-plane-control-plane-prompt-injection/" k="Seguridad" t="Datos y comandos">cómo defenderse de la inyección de prompts</item>
    <item href="/blog/mcp-scopes/" k="Ámbitos" t="Ámbitos de MCP">dónde se guarda la configuración del servidor</item>
  </b-links>
</b-chapter>
<b-footer>Los casos se cuentan a partir de debates abiertos entre desarrolladores de 1C, sin nombres ni citas. Son ejemplos de la práctica, y cada caso no se puede verificar. Las reglas de protección son la práctica del autor.</b-footer>
</b-post>
