---
title: Qué es MCP para un agente de IA: qué problema resuelve y cómo delegar la configuración en el agente
date: 2026-10-04
updated: 2026-11-08
unrelated: mcp-1c
description: MCP conecta un agente con GitLab, Jira, Confluence y grabaciones de reuniones. Qué problema resuelve, cómo configurarlo en minutos y delegarlo en el propio agente, cómo ahorra tiempo y tokens y por qué el agente inventa menos.
tags: IA, agentes, MCP, Jira, contexto, alucinaciones, tokens, harness
category: harness
layout: wide
mentions: Model Context Protocol, MCP, AI agent, Claude Code, Jira, Airtable, hallucinations, tokens, permissions, prompt injection
toc: what=Qué es | ours=Contextos | connect=Conexión | saving=Ahorro | facts=Hechos | risks=Riesgos | first=Por dónde empezar | cases=Casos | faq=Preguntas | next=Siguiente lectura
---

MCP conecta un agente de IA con los sistemas de trabajo, para que lea los hechos en la fuente y no en un relato de segunda mano. Es fácil y rápido: basta entender el problema que resuelve y delegar la configuración en el propio agente. Abajo: la idea, la conexión, lo que aporta y qué permisos conceder. El ejemplo de QA con MCP está en el artículo [QA con un agente mediante MCP](/blog/bug-report-to-reproduction-agent/#mcp).

<b-post series="harness">
<b-chapter id="what" icon="plug" title="Qué es MCP">
<b-why align="left">MCP es un enchufe común, como USB. Conecta el agente a Jira o a GitLab y toma los datos de ahí por sí mismo. <a href="https://modelcontextprotocol.io/docs/getting-started/intro" target="_blank" rel="noopener">Más</a></b-why>
<b-why align="left">La imagen muestra dos caminos de los datos. En el primero una persona le cuenta la tarea al agente, y por el camino se pierden detalles. En el segundo el agente lee el sistema por sí mismo mediante MCP y ve todo lo que ve una persona. MCP (Model Context Protocol) es un estándar abierto que conecta las aplicaciones de IA con sistemas externos<b-proof href="https://modelcontextprotocol.io/docs/getting-started/intro" quote="MCP (Model Context Protocol) is an open-source standard for connecting AI applications to external systems."/>. El agente tiene un cliente MCP, el sistema tiene un servidor MCP, y el servidor le dice al agente qué datos y acciones hay disponibles.</b-why>
<b-lane title="Un relato o el propio sistema" color="accent">
<b-scene names="mcp-agent-access/retell-vs-mcp"/>
</b-lane>
<b-finding>
  <ex>En Jira el agente ve lo que ve una persona: la propia tarea PAY-142, los comentarios y el historial de cambios. No hace falta buscar la tarea y copiarla en la conversación. Trae las tareas relacionadas si se lo pides. Puede comentar en tu nombre, crear una tarea o cambiar un estado (tras tu confirmación). La primera vez deberías sentir un «guau»: significa que está bien configurado. Y es muy sencillo.</ex>
  <gen>El agente mira más allá que una persona: pondera tareas vecinas, artículos de la base de conocimiento y decisiones pasadas, y encuentra jugadas poco evidentes que una sola tarea no muestra. Sin MCP solo sabe lo que se le pegó. La persona deja de ser mensajera entre ventanas y se queda como revisora.</gen>
  <do k="Qué hacer">Empieza por el gestor de tareas: es el comienzo más fácil y rápido. Cómo conectar Jira: <a href="#connect">véase abajo</a>. Cuenta también cuántas veces al día copias texto en la conversación: esa es tu lista de candidatos a conectar.</do>
</b-finding>
</b-chapter>
<b-chapter id="ours" icon="target-ring" title="El contexto del agente y otros contextos">
<b-why align="left">El contexto del agente es todo lo que ve de una vez (la conversación con el agente, los archivos del proyecto). Los otros contextos son todo lo demás (GitLab, Jira, grabaciones de reuniones, una base de conocimiento). El puente entre ellos es MCP: el agente tiene un cliente MCP y el sistema tiene un servidor MCP.</b-why>
<b-lane-art names="mcp-agent-access/contexts"/>
<b-why align="left">A la izquierda de la imagen está el contexto del agente: la conversación con él y los archivos del proyecto que ve de una vez. A la derecha están los otros sistemas: GitLab, Jira, tldv con grabaciones de reuniones, Confluence con una base de conocimiento. Hasta que se conecta MCP, el agente no los ve. El puente entre ellos tiene dos partes: un cliente MCP en el lado del agente y un servidor MCP en el lado del sistema.</b-why>
<b-section-h3 top="18">Qué es el contexto</b-section-h3>
<b-why align="left">El <a href="/materials/glossary/context/">contexto</a> es todo lo que el modelo ve en ese momento. Lo que no está en el contexto, el agente no lo sabe.</b-why>
<b-lane title="Contexto" color="accent" top="12">
<b-scene names="term:context"/>
</b-lane>
<b-why align="left">El contexto se puede imaginar como un escritorio con todo lo que el modelo ve ahora mismo: mensajes de la conversación, archivos abiertos, resultados de llamadas. Lo que no está en el escritorio no existe para el modelo hasta que se pone ahí. Por eso la pregunta principal al trabajar con un agente es qué hay en su escritorio.</b-why>
<b-table-plain>
<table><thead><tr><th>Dónde vive el hecho</th><th>El agente lo ve</th><th>Qué pasa</th></tr></thead><tbody><tr><td><b>Contexto propio</b>: la conversación, los archivos del proyecto</td><td><b-tag-inline kind="ok">de inmediato</b-tag-inline></td><td>una respuesta basada en datos</td></tr><tr><td><b>Otro contexto</b>: GitLab, Jira, grabaciones de reuniones</td><td><b-tag-inline kind="ok">mediante MCP</b-tag-inline></td><td>el agente trae lo que necesita</td></tr><tr><td><b>En ninguna parte</b>: en las cabezas, en un sistema cerrado</td><td><b-tag-inline kind="no">no</b-tag-inline></td><td>una conjetura en lugar de un hecho</td></tr></tbody></table>
</b-table-plain>
<b-why align="left">La tabla muestra qué le pasa a un hecho según dónde esté. Un hecho en el contexto del agente (la conversación, los archivos del proyecto): el agente responde a partir de datos. Un hecho en otro sistema (GitLab, Jira, grabaciones de reuniones): el agente lo trae por sí mismo, pero solo mediante MCP. Un hecho que no está escrito en ninguna parte (en la cabeza de las personas, en un sistema cerrado): el agente no lo verá y lo sustituirá por una conjetura. De ahí la regla práctica: escribe las decisiones donde el agente pueda tomarlas.</b-why>
<b-section-h3 top="18">Cómo trae el agente otro contexto: ReAct</b-section-h3>
<b-why align="left">El agente trabaja en un ciclo <a href="/materials/glossary/react/">ReAct</a>: razona, actúa, lee el resultado y vuelve a razonar. MCP es el paso de «actuar»: el resultado de la llamada llega al contexto del agente.</b-why>
<b-lane title="ReAct" color="accent" top="12">
<b-scene names="term:react"/>
</b-lane>
<b-step-chain>
  <node t="Razona">«Necesito los pasos del bug PAY-142»</node>
  <node t="Actúa">Llama al servidor MCP de Jira</node>
  <node t="Lee">La respuesta de Jira llega al contexto</node>
</b-step-chain>
<b-rules-fixed cols="3" top="12">
  <rule t="Solo razona">Los otros contextos están cerrados: el modelo se inventa la respuesta.</rule>
  <rule t="Solo actúa">Llama a todo sin plan y quema tokens.</rule>
  <rule t="Alterna">Trae exactamente lo que falta y responde a partir de datos.</rule>
</b-rules-fixed>
<b-why align="left">Un ejemplo del ciclo: el agente razona («necesito los pasos del bug PAY-142»), actúa (llama al servidor MCP de Jira), lee la respuesta (llega al contexto) y responde con los datos. Las tres tarjetas muestran qué pasa cuando el ciclo se rompe. Solo razonar da una respuesta inventada, solo actuar da llamadas de más y gasto de tokens, y alternar da una respuesta exacta a partir de los datos.</b-why>
<b-section-h3 top="18">Anclaje: cada parte de la respuesta tiene respaldo</b-section-h3>
<b-why align="left">Una respuesta está anclada cuando cada parte sale del contexto. Una correspondencia así, sin huecos, se llama <a href="/materials/glossary/epimorphism/">epimorfismo</a>.</b-why>
<b-lane title="Epimorfismo" color="accent" top="12">
<b-scene names="term:epimorphism"/>
</b-lane>
<b-table-plain>
<table><thead><tr><th>Parte de la respuesta</th><th>Respaldo</th></tr></thead><tbody><tr><td>Pasos de reproducción</td><td>Jira, ticket PAY-142</td></tr><tr><td>Dónde falla el código</td><td>GitLab, archivo y línea</td></tr><tr><td>Por qué se decidió</td><td>tldv, grabación de la reunión</td></tr></tbody></table>
</b-table-plain>
<b-why align="left">La tabla muestra una comprobación del respaldo con un ejemplo. Los pasos de reproducción vienen del ticket de Jira, el lugar donde falla el código de GitLab, el motivo de la decisión de una grabación de reunión. Si una parte de la respuesta no tiene ese respaldo, se vuelve a comprobar a mano.</b-why>
<b-section-h3 top="18">Alucinación: una parte sin respaldo</b-section-h3>
<b-why align="left">Una <a href="/materials/glossary/hallucination/">alucinación</a> es una conjetura segura de sí misma donde no hay respaldo. Parece tan fluida como una respuesta basada en datos. Los detalles y el consejo de Anthropic están <a href="#facts">en la sección de alucinaciones, más abajo</a>.</b-why>
<b-lane title="Alucinación" color="accent" top="12">
<b-scene names="term:hallucination"/>
</b-lane>
<b-why align="left">Una alucinación parece tan fluida como una respuesta basada en datos, así que no se distinguen por el tono. Solo las distingue el respaldo: está o no está.</b-why>
<b-section-h3 top="18">Por qué estos</b-section-h3>
<b-source-rows>
  <row t="GitLab" note="MCP oficial" href="https://docs.gitlab.com/user/model_context_protocol/mcp_server/" miss="El agente adivina el código a partir de otros contextos y a menudo se equivoca, así es como aparecen las alucinaciones; una persona copia archivos y diffs en la conversación a mano">Código y merge requests: el agente lee el código real</row>
  <row t="Jira" note="MCP oficial de Atlassian" href="https://support.atlassian.com/atlassian-rovo-mcp-server/docs/getting-started-with-the-atlassian-remote-mcp-server/" miss="Hay mucho que copiar a mano y el historial de cambios se pierde">Tareas y requisitos: lo que realmente se pidió</row>
  <row t="Confluence" note="El mismo MCP de Atlassian" href="https://support.atlassian.com/atlassian-rovo-mcp-server/docs/getting-started-with-the-atlassian-remote-mcp-server/" miss="Desaparecen la visualización y la presentación de requisitos a las que todo desarrollador está acostumbrado. Es importante limitar al agente y no dejar que se aleje demasiado: los requisitos antiguos pueden estar desfasados. Haz que compruebe el panorama real en GitLab">Base de conocimiento: reglas, specs, decisiones</row>
  <row t="tldv" note="Grabación y API abierta" href="https://doc.tldv.io" miss="Las decisiones se quedan en las cabezas, y las actas y los requisitos se escriben de memoria horas después, con errores">Grabaciones de reuniones: decisiones que no existen en ningún texto. Según la experiencia del autor, el acceso aparece 5–10 minutos después de la reunión, así que las actas y los requisitos se pueden escribir enseguida. La versión enterprise, el control de acceso y MCP son más débiles, pero las traducciones y las transcripciones son de mejor calidad</row>
  <row t="Granola" note="MCP" href="https://docs.granola.ai/help-center/sharing/integrations/mcp" miss="Igual que sin tldv: se pierden las decisiones de las reuniones">También grabaciones de reuniones. Tiene un MCP, pero según la experiencia del autor se queda ligeramente por detrás de tldv: palabras en español se cuelan en el texto en ruso, lo que perjudica la experiencia del usuario y provoca resistencia a la adopción. Según la documentación: solo para el espacio de trabajo activo, el plan gratuito cubre 30 días de notas</row>
</b-source-rows>
<b-why align="left">Se eligieron estos sistemas porque guardan cuatro tipos de hechos: código, tareas, reglas y decisiones de reuniones. Cada fila dice qué se pierde sin la conexión. Confluence viene con una salvedad: conéctalo solo si las páginas están cuidadas (un responsable y una fecha de revisión), y deja que el agente contraste el panorama real con el código en GitLab. Es aún más fiable guardar los requisitos y las specs en Git: allí cada cambio tiene autor, fecha y motivo.</b-why>
<b-finding>
  <ex>Preguntas por un bug y la conversación no tiene pasos. El agente busca en los archivos del proyecto, Jira está cerrado para él, así que escribe los pasos él mismo: con seguridad, con fluidez, inventados. Sigues un camino que no existe.</ex>
  <gen>Un agente rara vez responde «no lo sé». Si la respuesta no está en su contexto y los demás están cerrados, rellena el hueco con patrones generales y lo presenta como un hecho. Cada fuente conectada quita espacio a la invención.</gen>
  <do k="Qué hacer">Cada vez que el agente alucine, encuentra el contexto que guarda la respuesta y dale acceso. Empieza por la última pregunta que respondió con una invención.</do>
</b-finding>
</b-chapter>
<b-chapter id="connect" icon="arrow-right" title="Cómo conectar Jira">
<b-why align="left">El agente y su harness (arnés del agente) pueden conectarse por sí solos. Guías: <a href="https://support.atlassian.com/atlassian-rovo-mcp-server/docs/getting-started-with-the-atlassian-remote-mcp-server/" target="_blank" rel="noopener">Atlassian</a> y <a href="https://code.claude.com/docs/en/mcp" target="_blank" rel="noopener">Claude Code</a>.</b-why>
<b-lane title="A mano o delegar" color="accent">
<b-scene names="mcp-agent-access/one-phrase-setup"/>
</b-lane>
<b-why align="left">La imagen compara dos formas. A mano: buscas las instrucciones, escribes comandos, inicias sesión y compruebas el resultado. Delegar en el agente: dices una frase, el agente conecta Jira por sí mismo, y lo único que haces es iniciar sesión en el navegador.</b-why>
<b-section-h3 top="14">Díselo al agente</b-section-h3>
<b-copy-quote>Conecta el servidor MCP de Jira siguiendo la guía de Atlassian y pruébalo con la tarea PAY-142: léela y resume los comentarios.</b-copy-quote>
<b-why align="left">El agente ejecuta los comandos por sí mismo. Lo único que haces es iniciar sesión en el navegador (OAuth): el agente nunca recibe tu contraseña. <a href="/blog/agent-hands-work-back-to-you/" target="_blank" rel="noopener">Si el agente te pide que lo hagas tú</a>.</b-why>
<b-section-h3 top="14">Qué pasará</b-section-h3>
<b-steps-round>
  <step t="El agente conecta Jira">con un solo comando, tú no escribes nada</step>
  <step hl t="Se abre una página de Jira: el paso clave">ofrece dar al agente acceso a Jira; tú inicias sesión y apruebas, y el agente nunca ve la contraseña</step>
  <step t="El agente lee PAY-142">abre la tarea con sus comentarios y los cuenta</step>
</b-steps-round>
<b-why align="left">El paso clave es el segundo: tú das el acceso, iniciando sesión en el navegador. El agente no ve tu contraseña y solo recibe los permisos que confirmaste en la página de Jira. El primer y el tercer paso los hace el agente.</b-why>
<b-callout icon="shield-check"><b>Solo lectura.</b> Puede que en esa página no siempre puedas elegir acceso de solo lectura. Es seguro: el agente tiende a leer y apenas escribe nada hasta que se lo pides.</b-callout>
<b-details-more summary="Cómo se hace a mano" top="12">
<b-scene names="mcp-agent-access/setup-steps"/>
<b-copy-code>
  claude mcp add --transport http atlassian https://mcp.atlassian.com/v2/mcp
  /mcp               # log in via browser (OAuth)
  claude mcp list     # status: connected / needs login / failed
</b-copy-code>
<b-scene names="mcp-agent-access/scopes"/>
<p>Dónde vive la configuración y quién ve el servidor: <a href="/blog/mcp-scopes/">ámbitos de MCP en Claude Code</a>.</p>
</b-details-more>
<b-why align="left">A mano son tres comandos: añadir el servidor, iniciar sesión en el navegador con /mcp y comprobar el estado. El estado puede ser de tres tipos: conectado, requiere inicio de sesión o error. El diagrama de arriba lo muestra paso a paso, y los ámbitos de abajo dicen dónde se guarda el ajuste.</b-why>
<b-finding>
  <ex>El agente ejecuta los comandos y comprueba la conexión por sí mismo, y la tarea PAY-142 se lee completa con sus comentarios. Ese es el momento «guau».</ex>
  <gen>Conectar lleva minutos. El ámbito «Project» guarda la configuración en el repositorio para que todo el equipo tenga los mismos servidores. Los tres ámbitos se explican en <a href="/blog/mcp-scopes/">ámbitos de MCP en Claude Code</a>.</gen>
  <do k="Qué hacer">Delega la configuración en el agente y compara su respuesta con lo que ves tú mismo en Jira.</do>
</b-finding>
</b-chapter>
<b-chapter id="saving" icon="coin-hm" title="Ahorro">
<b-why align="left">El ahorro viene de la precisión. Una petición vaga recibe una respuesta vaga, una corrección genera una petición nueva, y los errores se acumulan de paso en paso; al copiar y contar a mano, la persona añade esos deslices sin darse cuenta. El agente toma los datos directamente de la fuente, así que la cadena es más corta y tiene menos errores. El precio es un uso creciente de tokens en una ejecución larga, y hay limitadores para ello.</b-why>
<b-lane title="Acumulación de errores: a mano o desde la fuente" color="accent">
<b-scene names="mcp-agent-access/exact-request"/>
</b-lane>
<b-why align="left">A la izquierda está el camino con copia manual: cada paso añade una imprecisión, y en la tercera pasada los errores se han acumulado. A la derecha está el camino desde la fuente: una petición exacta y una respuesta, sin cadena de relatos.</b-why>
<b-spacer h="12"/>
<b-rules sw="1.8">
  <rule icon="eye" t="Peticiones y respuestas vagas">Contar y copiar a mano pierde detalle, así que la petición sale vaga y la respuesta también.</rule>
  <rule icon="users" t="Los errores se acumulan">Cada corrección genera una petición nueva con una imprecisión nueva: los errores se suman de paso en paso.</rule>
  <rule icon="layers" t="Coste: tokens">Hay menos pasos, pero el uso de tokens crece en una ejecución larga; hay límites para ello.</rule>
</b-rules>
<b-section-h3 top="14">Límites de gasto</b-section-h3>
<b-why align="left">La respuesta de un sistema conectado llega a la conversación y ocupa sitio en ella, y el sitio se mide en tokens. Por eso Claude Code vigila el tamaño de las respuestas y fija dos umbrales.</b-why>
<b-scene names="mcp-agent-access/reply-size-scale"/>
<b-why align="left">La escala muestra el tamaño de la respuesta de un sistema en tokens. Hasta 10 000 tokens una respuesta pasa sin observaciones. Pasados los 10 000, Claude Code avisa de que la respuesta es grande. Pasados los 25 000, la respuesta no entra entera en la conversación y se guarda en un archivo.</b-why>
<b-art-note top="6">El tope de 25 000 se puede subir con la variable de entorno MAX_MCP_OUTPUT_TOKENS, mientras que el umbral de aviso es fijo.</b-art-note>
<b-why align="left"><a href="https://code.claude.com/docs/en/mcp" target="_blank" rel="noopener">Más</a>.</b-why>
<b-finding>
  <ex>Tres pasadas con errores crecientes se convierten en una pasada con una petición exacta.</ex>
  <gen>El ahorro es la ausencia de rondas de más: una petición exacta y una respuesta de la fuente no acumulan errores. Las cifras exactas solo salen de medir tu propio trabajo.</gen>
  <gen k="Sobre los límites">Cuanto más largo el trabajo, más tokens usa, por eso Claude Code limita las respuestas largas: avisa a partir de 10 000 tokens y guarda en un archivo a partir de 25 000.</gen>
  <do k="Qué hacer">Mide dos cosas en una misma tarea: cuántos minutos y correcciones lleva la transferencia manual, y cuántos tokens gasta el agente.</do>
</b-finding>
</b-chapter>
<b-chapter id="facts" icon="check-circle" title="Menos alucinaciones">
<b-why align="left">Alucinación: el modelo produce un texto que parece correcto pero es erróneo o no se deduce de los datos. El modelo suena igual de seguro en dos situaciones. <a href="https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations" target="_blank" rel="noopener">Más</a></b-why>
<b-rules-fixed cols="2" sw="1.8">
  <rule icon="help" t="Poco contexto">El modelo rellena los huecos por sí mismo y no dice que es una conjetura.</rule>
  <rule icon="file-text" t="Hay contexto">El modelo lo cita con soltura y seguridad, así que abre el enlace y compruébalo.</rule>
</b-rules-fixed>
<b-lane title="Donde faltan datos" color="accent" top="14">
<b-scene names="mcp-agent-access/fills-gaps"/>
</b-lane>
<b-art-note top="10" align="left">La respuesta del agente se contrasta con los datos: cada parte debería tener respaldo. En matemáticas una correspondencia así se llama epimorfismo. Las partes sin respaldo las rellena el modelo con una conjetura, y parecen igual de seguras.</b-art-note>
<b-why align="left">Qué significa esto en la práctica. Si los sistemas no están conectados, el agente rellena los huecos con una conjetura y la expresa con el mismo tono seguro: el texto no distingue una conjetura de un hecho. Si los sistemas están conectados, donde estaba la conjetura hay datos reales con un enlace, y comprobarlo cuesta un clic. Los tres consejos de Anthropic funcionan juntos: permite que el agente diga «no lo sé» cuando faltan datos, pídele que se apoye en el texto literal de la fuente y exige un enlace para cada afirmación.</b-why>
<b-section-h3 top="18">Qué recomienda Anthropic</b-section-h3>
<b-step-chain>
  <node t="&quot;No lo sé&quot;">Permitir reconocer que faltan datos</node>
  <node t="Cita">Apoyarse en el texto literal de la fuente</node>
  <node t="Referencia">Cada afirmación lleva su fuente</node>
</b-step-chain>
<b-why align="left">Los tres consejos de Anthropic cierran los huecos en los datos. Permite el «no lo sé»: de lo contrario el modelo rellena el hueco con una conjetura. Apóyate en una cita: el texto literal de una fuente se puede comprobar. Da un enlace para cada afirmación: se puede abrir y comparar.</b-why>
<b-finding>
  <ex>Jira está cerrado, así que el agente se inventó dos partes de la respuesta. Cuando Jira está conectado, esos sitios contienen datos del ticket PAY-142 con un enlace, y lo abres con un clic.</ex>
  <gen>El agente rellena los huecos en los datos con una conjetura y no lo dice. Los tres consejos de Anthropic los cierran: permitir «no lo sé», apoyarse en una cita, dar un enlace a la fuente. Esto no elimina las alucinaciones por completo, queda una comprobación humana.</gen>
  <do k="Qué hacer">Exige una fuente para cada hecho: sistema, número, campo. Cómo hacerlo en requisitos y actas está en <a href="/blog/requirements-sources-facts-assumptions/">un artículo aparte</a>.</do>
</b-finding>
</b-chapter>
<b-chapter id="risks" icon="shield-check" title="Riesgos y reglas">
<b-why align="left">En la mayoría de los casos la protección ya viene integrada en cómo funciona MCP en Claude Code. Lo que queda es elegir servidores de confianza y no conceder permisos de más. <a href="https://code.claude.com/docs/en/mcp" target="_blank" rel="noopener">Más</a></b-why>
<b-why align="left">Conviene recordar tres riesgos. Permisos de más: un servidor al que se dio acceso de escritura puede modificar o borrar datos, así que los permisos se dan al mínimo. Un servidor no fiable: un servidor MCP de terceros obtiene acceso a lo que le abres, así que conecta solo los verificados. Texto de los sistemas: una tarea o un comentario puede contener una frase dirigida al agente, lo cual se trata en el artículo [sobre el plano de datos y el plano de control](/blog/data-plane-control-plane-prompt-injection/).</b-why>
<b-rules sw="1.8">
  <rule icon="bell" t="Permiso">Claude Code pide permiso antes de usar una herramienta de un servidor.</rule>
  <rule icon="folder-hm" t="Servidores del proyecto">Los servidores del archivo .mcp.json de un proyecto deben aprobarse antes del primer uso.</rule>
  <rule icon="key" t="Permisos">En los servidores con inicio de sesión se puede limitar qué permisos piden.</rule>
</b-rules>
<b-lane title="Escalera de permisos" color="accent" top="14">
<b-scene names="mcp-agent-access/rights-ladder"/>
</b-lane>
<b-why align="left">La escalera de la imagen muestra el orden en que se conceden los permisos. Primero leer: el agente solo mira. Luego escribir con confirmación: el agente propone, una persona aprueba cada escritura. Escribir sin confirmación espera a que se haya ganado confianza. Sube un escalón solo cuando hayas comprobado que el anterior funciona.</b-why>
<b-finding>
  <ex>El agente lee producción, escribe solo en una hoja de pruebas y muestra cada escritura a una persona.</ex>
  <gen>Los permisos crecen por la escalera: primero leer, luego escribir con confirmación. La escritura sin confirmación espera a ganarse la confianza.</gen>
  <do k="Qué hacer">Da a un servidor nuevo solo lectura y sube los permisos tras una semana de trabajo comprobado.</do>
</b-finding>
</b-chapter>
<b-chapter id="first" icon="arrow-right" title="Por dónde empezar">
<b-why align="left">Es mejor empezar en pequeño: una fuente, una persona que revisa y modo de solo lectura. Conecta Jira, hazle al agente cinco preguntas sobre tareas reales y compara las respuestas con lo que ves tú mismo. Eso muestra hasta dónde se puede confiar en el agente antes de darle permisos de escritura.</b-why>
<b-scene names="mcp-agent-access/start-small"/>
<b-finding>
  <ex>Empieza con Jira en solo lectura y compara cinco respuestas del agente con lo que ves tú mismo.</ex>
  <gen>Una fuente, una persona que revisa, un escalón de permisos cada vez.</gen>
  <do k="Qué hacer">Conecta hoy el primer servidor y anota qué leyó bien el agente y qué no.</do>
</b-finding>
</b-chapter>
<b-chapter id="cases" icon="grid-alt" title="Otros casos">
<b-why>Un mismo enfoque sirve para distintas tareas: el agente lee las fuentes y una persona comprueba el resultado.</b-why>
<b-scene names="mcp-agent-access/three-cases"/>
<b-table>
<table><thead><tr><th>Caso</th><th>Fuentes</th><th>Qué hace el agente</th><th>Qué comprueba una persona</th></tr></thead><tbody><tr><td><a href="/blog/bug-report-to-reproduction-agent/">QA</a></td><td>Jira, entorno, navegador</td><td>reproduce un bug, acota el camino, escribe un informe</td><td>los pasos a mano en el entorno</td></tr><tr><td><a href="/blog/analytics-reports-agent/">Informes y analítica</a></td><td>base de datos, hojas, documentos</td><td>calcula con consultas, arma un resumen</td><td>una cifra por otro camino</td></tr><tr><td><a href="/blog/incident-investigation-agent/">Incidentes</a></td><td>Sentry, Grafana</td><td>cruza errores, métricas y hora del release</td><td>la hipótesis contra gráficos y eventos</td></tr></tbody></table>
</b-table>
<b-why align="left">Cómo leer la tabla. Cada fila sigue el mismo orden: el agente lee las fuentes, hace el trabajo principal y trae un resultado, y una persona lo comprueba con una acción corta. En QA los pasos del informe se repiten a mano en el entorno. En analítica se recalcula una cifra por otro camino. En incidentes la hipótesis se compara con gráficos y eventos. Los detalles están en los artículos de los enlaces.</b-why>
</b-chapter>
<b-chapter id="faq" icon="chat" title="Preguntas frecuentes">
  <b-faq-cards>
    <q t="¿Qué problema resuelve MCP?">Sin MCP un agente solo sabe lo que se le cuenta. MCP lo conecta con los sistemas de trabajo, de modo que lee los hechos en la fuente.</q>
    <q t="¿Cómo se conecta MCP?">Pide al agente que haga la conexión él mismo: lleva minutos, y el ámbito de proyecto guarda el ajuste en el repositorio para todo el equipo.</q>
    <q t="¿Por qué hay menos alucinaciones con MCP?">Cuando la respuesta no está en el contexto, el agente la rellena con una conjetura. Cada fuente conectada llena ese hueco con hechos.</q>
    <q t="¿Qué permisos debe conceder MCP?">Empieza con acceso de lectura y concede escritura solo donde la tarea lo necesite.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" icon="arrow-right" title="Siguiente lectura">
  <b-links>
    <item href="/blog/bug-report-to-reproduction-agent/" k="QA con un agente" t="QA tras el soporte">MCP y skills en el trabajo de QA</item>
    <item href="/blog/specs-rules-skills/" k="Skills" t="Specs, reglas y skills">lo que el agente debe saber del proyecto</item>
    <item href="/blog/harness-driven-development/" k="Ciclo de errores" t="Harness-Driven Development">cómo los errores del agente se convierten en reglas</item>
  </b-links>
</b-chapter>
<b-footer>La tarea PAY-142 es inventada para el ejemplo.</b-footer>
</b-post>
