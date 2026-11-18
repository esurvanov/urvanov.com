---
title: Niveles de madurez de un agente de IA: del chat a las especificaciones, los skills, el código, un harness y un sistema agéntico
date: 2026-11-14
updated: 2026-11-18
description: El trabajo con IA crece de un chat a un sistema agéntico: qué se deja por escrito en cada nivel, cuándo pasar al siguiente y cuánto cuesta, según Every.
tags: IA, agentes, especificaciones, skills, harness, madurez, compound engineering
category: specs
layout: wide
mentions: Compound Engineering, Agent Skills, AGENTS.md, CLAUDE.md, Spec-Driven Development, Progressive Crystallization, Harness engineering, Harness-Driven Development
toc: map=Siete pasos | sources=Qué dice el mercado | chat=Chat | agent=Agente y reglas | spec=Especificación | skill=Skill | script=Script | crystal=El coste de un paso | harness=Harness | system=Sistema agéntico | traps=Trampas | stop=Cuándo parar | start=Por dónde empezar | faq=Preguntas | next=Seguir leyendo
---
Los niveles de madurez de un agente de IA van del chat al agente, la especificación, el skill, el script, el harness y el sistema agéntico: en cada paso, lo explicado con palabras pasa a un archivo o a código, sin depender de la memoria. Las escaleras de <a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every</a>, <a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a>, <a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a>, <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a>, <a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a> y <a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a> describen lo mismo.

<b-post series="prompts">
<b-chapter id="map" title="Siete pasos" icon="stairs">
  <b-art names="ai-agent-maturity-levels/ladder ai-agent-maturity-levels/ladder-mobile"></b-art>
  <b-cap>Siete pasos. El gris es la persona, el azul es el agente y todo lo que se le deja por escrito, el naranja es el riesgo: tener que explicar de nuevo. El bicho naranja en el paso Harness es un error encontrado en el informe terminado: el harness lo convierte en una comprobación, como muestra la flecha, para que el mismo error no vuelva.</b-cap>
  <b-why>La imagen muestra adónde va el conocimiento. En un chat vive en la cabeza de la persona y en la conversación. Después pasa, uno a uno, a la sesión del agente, a un archivo con requisitos, a un archivo con un procedimiento, a un script y por fin al repositorio junto con las comprobaciones. La tabla siguiente recorre el mismo informe lunes tras lunes: qué hace la persona a mano y qué ocurre el lunes siguiente.</b-why>
  <b-table code="prose">
    <table>
    <thead>
      <tr><th>Paso</th><th>Qué hace la persona a mano</th><th>Dónde vive el conocimiento</th><th>Qué ocurre el lunes siguiente</th></tr>
    </thead>
    <tbody>
      <tr><td><b>1. Chat</b></td><td>pega la tabla de ventas en un chat y explica qué columnas hacen falta</td><td>en la cabeza y en la conversación</td><td>todo se explica de nuevo</td></tr>
      <tr><td><b>2. <a class="s-term" href="/materials/glossary/ai-agent/">Agente</a></b></td><td>pide a un agente con acceso a archivos que arme el informe, lo corrige y añade «importes en rublos» al archivo de reglas</td><td>en la sesión y en el archivo de reglas</td><td>el agente recuerda las reglas pero no cómo contó la vez anterior</td></tr>
      <tr><td><b>3. <a class="s-term" href="/materials/glossary/spec-driven-development/">Especificación</a></b></td><td>escribe spec.md: qué columnas, de dónde vienen los datos, cómo saber que el informe está terminado</td><td>en <code>spec.md</code></td><td>cualquier agente arma el mismo informe a partir de la misma descripción</td></tr>
      <tr><td><b>4. <a class="s-term" href="/materials/glossary/agent-skills/">Skill</a></b></td><td>convierte el orden de armado del informe en un skill</td><td>en <code>SKILL.md</code> con pasos y ejemplos</td><td>el agente encuentra por sí mismo el skill cuando se pide un informe</td></tr>
      <tr><td><b>5. Script</b></td><td>extrae los pasos estables del skill a un script para la exportación y la tabla dinámica: un skill sobre datos no es rentable, un script calcula igual cada vez</td><td>en <code>report.py</code></td><td>la exportación se ejecuta en segundos sin coste de modelo y da el mismo resultado con los mismos datos; el modelo solo escribe las conclusiones</td></tr>
      <tr><td><b>6. <a class="s-term" href="/materials/glossary/harness/">Harness</a></b></td><td>lee el informe terminado; un error del informe se convierte en una regla o comprobación nueva en el entorno del agente</td><td>en el repositorio: reglas, comprobaciones, hooks</td><td>el mismo error no vuelve: la regla y la comprobación saltan solas</td></tr>
      <tr><td><b>7. <a class="s-term" href="/materials/glossary/agentic-system/">Sistema agéntico</a></b></td><td>entrega al agente solo las partes complejas, como clasificar las solicitudes de clientes, y deja el resto al código y a las comprobaciones</td><td>en un servicio: código, un calendario, comprobaciones y un agente en los puntos complejos</td><td>el informe llega según el calendario: los pasos deterministas se ejecutan como código, la parte compleja la decide un agente con motivos registrados, la persona atiende solo un aviso de discrepancia</td></tr>
    </tbody>
    </table>
  </b-table>
  Este artículo llama <b><a class="s-term" href="/materials/glossary/pulling-out/">extracción</a></b> («vytyagivanie» en la versión rusa) al paso de un escalón al siguiente: la parte repetible de lo que una persona y un agente ya hacían juntos se extrae y se escribe un escalón más arriba. Es un proceso evolutivo de desarrollo de los procesos en una organización: crecen paso a paso a partir del trabajo repetido, sin diseñarse enteros de antemano. Las reglas se extraen de un chat, una especificación de las reglas y de las buenas sesiones, el procedimiento de un skill de una especificación, un script de un skill y un harness de los errores y las comprobaciones alrededor del agente. El final de la escalera es un sistema agéntico. Todo empieza con el enfoque «lo hace un agente», pero al final del camino la proporción de agentes sigue siendo pequeña: la base del sistema es código clásico, comprobaciones y un calendario, y los agentes se encargan solo de los bloques complejos que no se resuelven de otro modo. El comportamiento que funciona no se inventa de nuevo. Se toma de lo que ya funcionó y se fija allí donde ya no hace falta explicarlo.
  <b-finding>
    <ex>Un informe semanal pasó de una explicación repetida en un chat a un informe según un calendario.</ex>
    <gen>El paso lo determina dónde vive el conocimiento: en la cabeza de una persona, en una sesión, en un archivo o en código. Cuanto más se deja por escrito, menos depende de la memoria de una persona y del humor del modelo.</gen>
    <do>Elija una tarea recurrente y use la tabla para ver en qué paso está.</do>
  </b-finding>
</b-chapter>

<b-chapter id="sources" title="La posición del autor y lo que dice el mercado" icon="book">
  <b-why>Los siete pasos anteriores son la posición del autor, reunidos con un solo criterio: qué se deja exactamente por escrito en el paso. En el mercado, distintos autores describen el mismo movimiento, cada uno en su tramo: unos sobre las reglas, otros sobre las especificaciones, otros sobre los skills o el harness. Todos van en una misma dirección, de una conversación a un archivo y de un archivo a código. La tabla muestra cómo encajan los pasos con las fuentes.</b-why>
  <b-art names="ai-agent-maturity-levels/matrix"></b-art>
  <b-cap>Relleno significa que el autor describe el paso de forma explícita, un anillo significa que se describe un equivalente cercano (por ejemplo, las «deterministic tooling» de <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a> y <a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a> se cuentan como cercanas a un script). La fila inferior son los siete pasos de este artículo; solo <a href="https://arxiv.org/abs/2607.07052" target="_blank" rel="noopener">Malik</a> describe de forma explícita el último.</b-cap>

  La matriz muestra cómo está organizado el mercado: cada autor describe su propio tramo del camino, y juntos los tramos cubren los siete pasos. <a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a> no tiene especificaciones ni skills, Rezvov y Clark no tienen skills, <a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a> no tiene script. Los detalles de cada autor están en la tabla siguiente.
  <b-table>
    <table>
    <thead>
      <tr><th>Fuente</th><th>Pasos en orden</th><th>Dónde están las especificaciones y los skills</th></tr>
    </thead>
    <tbody>
      <tr><td><a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every, Compound Engineering</a> (Kieran Klaassen)</td><td>desarrollo manual → chat → agente con revisión línea por línea → primero el plan y revisión del PR terminado → de la idea al PR → agentes paralelos en la nube</td><td>el plan en la etapa 3; los skills y las reglas se añaden en el paso Compound</td></tr>
      <tr><td><a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a>, 05.02.2026</td><td>dejar el chatbot → reproducir el propio trabajo con un agente → agentes de fin de jornada → externalizar las tareas fáciles → diseñar el harness → tener siempre un agente en marcha</td><td>AGENTS.md y comprobaciones programadas en el paso 5; sin especificaciones ni skills</td></tr>
      <tr><td><a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a>, 10.03.2026</td><td>8 niveles: autocompletado y chat del IDE → contexto → acumulación → MCP y skills → harness → agentes en segundo plano → equipos de agentes</td><td>skills en el nivel 5; sin especificaciones</td></tr>
      <tr><td><a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a>, 06.04.2026</td><td>L0 consulta → L1 niñera del agente → L2 reglas → L3 herramientas deterministas → L4 SDD → L5 agentes autónomos</td><td>especificaciones en L4; sin skills</td></tr>
      <tr><td><a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a>, Hyperact, 05.01.2026</td><td>7 niveles: prompts manuales → ayuda del IDE → acceso al repositorio → herramientas deterministas → contexto de equipo → flujos paralelos especializados → desarrollo guiado por especificaciones</td><td>especificaciones en el nivel 7; sin skills</td></tr>
      <tr><td><a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a>, 23.01.2026</td><td>niveles 0–5 por analogía con la automatización de la conducción: del autocompletado a la «fábrica oscura»</td><td>especificaciones y skills en el nivel 4; en el nivel 5 las especificaciones se convierten en software</td></tr>
      <tr><td><a href="https://developers.redhat.com/articles/2026/03/30/vibes-specs-skills-agents-ai-coding" target="_blank" rel="noopener">Red Hat, Naszcyniec</a>, 30.03.2026</td><td>cuatro pilares como una pila: vibes → especificaciones → skills → agentes</td><td>los cuatro en un solo esquema</td></tr>
    </tbody>
    </table>
  </b-table>
  <b-callout icon="bulb">**El archivo de reglas** (CLAUDE.md, AGENTS.md) está en lugares distintos. En <a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every</a>, <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a> y <a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a> aparece justo después del primer agente; en <a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a> y <a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a> solo en el quinto nivel. En este artículo pertenece al paso «agente»: la propia primera anotación «el agente se equivocó, se añadió una regla» convierte un chat en un agente con memoria.</b-callout>
  <b-callout icon="trend-up">Las escaleras de Eledath, <a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a> y Clark cuentan los pasos por la autonomía: cuántos agentes trabajan y con qué poca frecuencia mira el código una persona. Los pasos de este artículo se cuentan por dónde vive el conocimiento. Las dos escalas coinciden: cuando el conocimiento está por escrito, se puede confiar más al agente.</b-callout>
  <b-finding>
    <ex>Rezvov, Clark y Shapiro colocan las especificaciones, Eledath y Shapiro colocan los skills; este artículo los pone en una sola escalera.</ex>
    <gen>Las distintas escaleras describen el mismo movimiento desde lados distintos: primero todo en la conversación, luego en un archivo, luego en código.</gen>
    <do>Compare su propia experiencia con los siete pasos anteriores y no con la lista de un solo autor.</do>
  </b-finding>
</b-chapter>

<b-chapter id="chat" title="Paso 1. Chat: el conocimiento vive en una conversación" icon="chat">
  <b-why>En un chat la persona lleva datos de un lado a otro y dice a mano que una respuesta es errónea. Para una pregunta puntual basta.</b-why>
  <b-art names="ai-agent-maturity-levels/chat"></b-art>
  <b-cap>Tres lunes seguidos la persona responde a las mismas preguntas. El conocimiento de lo que necesita el informe queda solo en su cabeza.</b-cap>
  <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a> llama a este modo una consulta: el agente como «Stack Overflow, pero más amable», y añade que en realidad no es un nivel. <a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a> aconseja dejar el chatbot para el trabajo con sustancia<b-proof href="https://mitchellh.com/writing/my-ai-adoption-journey" quote="Hashimoto: “To find value, you must use an agent” — mitchellh.com/writing/my-ai-adoption-journey"></b-proof>, porque un agente lee archivos, ejecuta programas y comprueba por sí mismo el resultado. <a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a> y <a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a> colocan el chat en el primer nivel: copiar fragmentos de un lado a otro.

  Incluso en este paso <a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every</a> aconseja llevar notas de los prompts que funcionaron: el primer registro, antes de cualquier archivo de reglas<b-proof href="https://every.to/guides/compound-engineering" quote="Every: “Keep a running note of prompts that worked well” — every.to/guides/compound-engineering"></b-proof>. Una nota responde a la pregunta «cómo lo expliqué la última vez», aunque el agente todavía no la lea.
  <b-finding>
    <ex>Cada lunes hay que explicar de nuevo las columnas del informe.</ex>
    <gen>Un chat no conserva los acuerdos entre conversaciones. Rezvov describe la salida así: cuando cansa repetir lo mismo, las instrucciones repetidas se convierten en reglas.</gen>
    <do>En cuanto explique lo mismo por segunda vez, pase al paso siguiente.</do>
  </b-finding>
</b-chapter>

<b-chapter id="agent" title="Paso 2. Agente y un archivo de reglas" icon="bot">
  <b-why>El agente obtiene acceso a archivos y comandos y actúa por su cuenta. El primer registro que se hace para él es un archivo de reglas: una lista de lo que el agente debe saber del proyecto en cada sesión.</b-why>
  <b-art names="ai-agent-maturity-levels/agent-rules"></b-art>
  <b-cap>Un error del agente se convierte en una línea del archivo de reglas, y la siguiente sesión del agente empieza ya con ella.</b-cap>
  <a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a> pasó por este paso al pie de la letra: rehízo con un agente todos sus commits manuales<b-proof href="https://mitchellh.com/writing/my-ai-adoption-journey" quote="Hashimoto: “I literally did the work twice” — mitchellh.com/writing/my-ai-adoption-journey"></b-proof> y sacó tres lecciones: dividir el trabajo en tareas claras, separar la planificación de la ejecución y dar al agente una manera de verificar su resultado. La guía de <a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every</a> propone el primer paso hacia dejar las cosas por escrito: crear un archivo CLAUDE.md y añadirle una nota tras cada error del agente.
  <b-steps>
    <step t="El agente se equivocó">por ejemplo, contó los importes en dólares en lugar de en rublos.</step>
    <step t="Una línea en el archivo de reglas">«los importes del informe van en rublos»: una línea por cada mal comportamiento. Hashimoto escribe que en el archivo del proyecto Ghostty cada línea se basa en un mal comportamiento del agente<b-proof href="https://mitchellh.com/writing/my-ai-adoption-journey" quote="Hashimoto: “Each line in that file is based on a bad agent behavior” — mitchellh.com/writing/my-ai-adoption-journey"></b-proof>.</step>
    <step t="La sesión siguiente">el agente lee el archivo al empezar y no repite el error.</step>
  </b-steps>
  <b-callout icon="alert-circle">Un archivo de reglas puede sobrecargarse. <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a> advierte de que unas reglas mal escritas dan un resultado peor que no tener ninguna<b-proof href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" quote="Rezvov: “poorly written rules can actually make output worse than having no rules at all” — dev.to/arezvov"></b-proof>. <a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a> desaconseja meterlo todo en el archivo de reglas: es mejor mantener una carpeta de documentación actualizada en la que el agente encuentre lo que necesita.</b-callout>

  Hashimoto convierte el paso en un hábito: en la última media hora de la jornada lanza agentes para investigar, para ideas vagas y para clasificar tareas, de modo que por la mañana tiene un «warm start»<b-proof href="https://mitchellh.com/writing/my-ai-adoption-journey" quote="Hashimoto: “warm start” — mitchellh.com/writing/my-ai-adoption-journey"></b-proof>. No deja agentes funcionando por la noche: la mayoría de sus tareas terminan en menos de media hora. Every advierte de que la mayoría de los desarrolladores se estancan en este paso<b-proof href="https://every.to/guides/compound-engineering" quote="Every: “Most developers plateau here” — every.to/guides/compound-engineering"></b-proof> mientras aprueban a mano cada acción del agente.
  <b-finding>
    <ex>La línea sobre los rublos en el archivo de reglas cierra para siempre un error recurrente.</ex>
    <gen>Una regla guarda un acuerdo pero no toda la intención de una tarea: lo que hay que hacer y cómo saber que está hecho no está escrito en ella.</gen>
    <do>Mantenga corto el archivo de reglas; pase la descripción de la tarea a una especificación. Más en el artículo <a href="/blog/specs-rules-skills/">AGENTS.md, CLAUDE.md y spec.md: qué va dónde</a>.</do>
  </b-finding>
</b-chapter>

<b-chapter id="spec" title="Paso 3. Especificación: la intención se escribe antes que el código" icon="file-lines">
  <b-why>Una especificación describe una tarea: qué hay que producir y cómo saber que está hecho. El agente y la persona leen el mismo texto, y la revisión comprueba el resultado contra él.</b-why>
  <a href="https://developers.redhat.com/articles/2026/03/30/vibes-specs-skills-agents-ai-coding" target="_blank" rel="noopener">Red Hat</a> divide las especificaciones en dos tipos: «qué» (objetivo, requisitos, criterios de éxito) y «cómo» (seguridad, estructura, pruebas, estándares). El autor recomienda varios archivos pequeños, como <code>what-vision.md</code>, <code>how-security.md</code> y <code>how-testing.md</code>, en lugar de un documento largo, para que solo se cargue el contexto pertinente<b-proof href="https://developers.redhat.com/articles/2026/03/30/vibes-specs-skills-agents-ai-coding" quote="Naszcyniec, Red Hat: “the days of the 100-page PDF specification are over” — developers.redhat.com"></b-proof>. <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a> añade la trazabilidad de extremo a extremo: un requisito tiene un identificador como FR-AUTH-PASSWORDRESET, y se ve en la descripción de la API, en el código y en las pruebas<b-proof href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" quote="Rezvov: “The core of SDD is traceability” — dev.to/arezvov"></b-proof>.
  Una especificación tiene también su propia escalera de madurez. Los tres primeros niveles los describió Birgitta <a href="https://martinfowler.com/articles/harness-engineering.html" target="_blank" rel="noopener">Böckeler</a> (Thoughtworks)<b-proof href="https://www.martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html" quote="Böckeler: three maturity levels of a spec, spec-first, spec-anchored and spec-as-source (paraphrase) — martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html"></b-proof>; el cuarto, Spec-in-the-loop, se añade en la charla del autor del sitio <a href="/talk/spec-driven-development/">«Spec-Driven Development»</a> (en ruso): en la <a href="/slide/20/">diapositiva con los cuatro niveles</a> la especificación aprende del sistema en funcionamiento, y sus métricas e incidentes corrigen la especificación.
  <b-art names="ai-agent-maturity-levels/spec-levels"></b-art>
  <b-cap>Como en la diapositiva de la charla: la especificación a la izquierda, el código a la derecha, las flechas muestran qué sale de qué y quién devuelve los cambios. Una flecha gris discontinua significa que una persona devuelve el cambio, una azul significa que lo hace por sí mismo el sistema en funcionamiento. A la derecha: qué resuelve el nivel y qué lo bloquea.</b-cap>
  <b-table>
    <table>
    <thead>
      <tr><th>Nivel de la especificación</th><th>Qué le ocurre a la especificación</th><th>Programa de ejemplo</th></tr>
    </thead>
    <tbody>
      <tr><td><b>Spec-first</b></td><td>la especificación se escribe antes que el código y se usa para una tarea</td><td>GitHub Spec Kit</td></tr>
      <tr><td><b>Spec-anchored</b></td><td>la especificación sigue viva tras la tarea: los cambios se integran en ella</td><td><a href="/blog/openspec/">OpenSpec</a></td></tr>
      <tr><td><b>Spec-as-source</b></td><td>una persona edita solo la especificación, el código se genera a partir de ella</td><td>Tessl; solo este lo reivindica <a href="https://martinfowler.com/articles/harness-engineering.html" target="_blank" rel="noopener">Böckeler</a></td></tr>
      <tr><td><b>Spec-in-the-loop</b></td><td>las métricas y los incidentes del sistema en funcionamiento corrigen la especificación</td><td>no hay programas listos; comportamiento parecido en <a href="https://developers.redhat.com/articles/2026/03/30/vibes-specs-skills-agents-ai-coding" target="_blank" rel="noopener">Red Hat</a> y <a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every</a></td></tr>
    </tbody>
    </table>
  </b-table>

  Red Hat distingue dos modos de trabajar con una especificación. En el modo «interacting» la persona afina la especificación junto con el agente: por ejemplo, pide al agente que la puntúe de 0 a 10 y diga qué falta para una implementación autónoma. Cuando la puntuación es de 9–10, empieza el modo «instructing»: el agente lee las especificaciones, encuentra los skills que necesita, escribe código, ejecuta pruebas y corrige errores por sí mismo. En <a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a> esto corresponde al cuarto nivel, donde la persona escribe una especificación, discute con el agente sobre ella y se va<b-proof href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" quote="Shapiro: “You write a spec. You argue with it about the spec.” — danshapiro.com"></b-proof>.
  <b-callout icon="refresh">Red Hat llama «co-evolución» de la especificación al cuarto nivel. El agente mantiene un archivo LessonsLearned.md: en cada error registra la causa y la solución y propone una edición de la especificación «how» pertinente<b-proof href="https://developers.redhat.com/articles/2026/03/30/vibes-specs-skills-agents-ai-coding" quote="Naszcyniec, Red Hat: “turns every off-key moment into a permanent improvement” — developers.redhat.com"></b-proof>. Every hace lo mismo en el paso Compound, que registra cada lección en CLAUDE.md, en la documentación de decisiones, en los skills y en los agentes.</b-callout>
  <b-finding>
    <ex>El spec.md del informe dice: qué columnas, de dónde vienen los datos, y que el informe está terminado cuando las sumas coinciden con la exportación.</ex>
    <gen><a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a> pone las especificaciones en lo más alto de su escalera: allí la implementación se convierte en un resultado intercambiable y no en un activo duradero<b-proof href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" quote="Clark: “interchangeable output rather than a durable asset” — hyperact.co.uk"></b-proof>. También dice que el séptimo nivel se parece más a un reinicio que a una continuación de la escalera.</gen>
    <do>Escriba una especificación para cualquier tarea de más de un día. Cómo dividir una especificación grande en partes se explica en el artículo <a href="/blog/specs-by-aggregates/">Especificaciones por agregado</a>.</do>
  </b-finding>
</b-chapter>

<b-chapter id="skill" title="Paso 4. Skill: el procedimiento se escribe para el agente" icon="notebook">
  <b-why>Si una especificación dice qué hay que producir, un skill dice cómo se hace. Es una carpeta con un archivo SKILL.md: un nombre, una descripción e instrucciones paso a paso, a veces con plantillas y scripts.</b-why>
  <b-art names="ai-agent-maturity-levels/spec-skill"></b-art>
  <b-cap>Una especificación está en el contexto de la tarea. Un skill ocupa dos líneas del contexto hasta que hace falta y se carga entero solo al invocarlo.</b-cap>
  <a href="https://developers.redhat.com/articles/2026/03/30/vibes-specs-skills-agents-ai-coding" target="_blank" rel="noopener">Red Hat</a> describe los skills como procedimientos modulares repetibles: el agente encuentra un skill por su nombre y descripción y lo carga entero cuando la tarea encaja<b-proof href="https://developers.redhat.com/articles/2026/03/30/vibes-specs-skills-agents-ai-coding" quote="Naszcyniec, Red Hat: “A skill is not just a prompt; it is a directory containing a SKILL.md file” — developers.redhat.com"></b-proof>. Anthropic compara un skill con una guía de incorporación para una persona recién contratada<b-proof href="https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills" quote="Anthropic: “like putting together an onboarding guide for a new hire” — anthropic.com/engineering"></b-proof>. Para <a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a>, crear skills es una marca del cuarto nivel, donde la persona ya no se sienta junto al agente sino que escribe especificaciones y skills y se va.
  Andrew <a href="https://dev.to/0xandrewshu/turn-chats-into-skills-skills-into-scripts-2ndg" target="_blank" rel="noopener">Shu</a> describió cómo sacar un skill de un chat: si el agente repite la misma tarea, pídale que relea la conversación y la convierta en un skill<b-proof href="https://dev.to/0xandrewshu/turn-chats-into-skills-skills-into-scripts-2ndg" quote="Shu: “ask it to reflect on the conversation and turn it into an Agent Skill” — dev.to/0xandrewshu"></b-proof>.

  Un skill de ejemplo del artículo de Red Hat es el despliegue de una aplicación en OpenShift. Es una carpeta corriente con tres archivos: una instrucción con un nombre y una descripción al principio, una plantilla y un script de comprobación.
  <b-file-grid>
    <file name="SKILL.md">nombre, descripción, pasos: comprobar el inicio de sesión, elegir el proyecto, aplicar la plantilla, comprobar el resultado; restricciones</file>
    <file name="deploy-template.yaml">la plantilla de despliegue que usa la instrucción</file>
    <file name="validate-route.sh">un script que comprueba que la aplicación se abre</file>
  </b-file-grid>
  <b-cap>El skill ya contiene un script: no hay un límite nítido entre los pasos «skill» y «script», son dos partes de una misma carpeta.</b-cap>
  <b-finding>
    <ex>Tras armar con éxito un informe, el agente, a petición, convirtió el orden de armado en un skill con pasos y un ejemplo de la tabla final.</ex>
    <gen>Al inicio de una sesión un skill ocupa en el contexto solo su nombre y su descripción y se carga entero al invocarlo. Así, los procedimientos que se necesitan de vez en cuando conviene guardarlos en skills, dejando en el archivo de reglas solo lo permanente.</gen>
    <do>Si un mismo procedimiento salió bien dos veces, pida al agente que lo convierta en un skill.</do>
  </b-finding>
</b-chapter>

<b-chapter id="script" title="Paso 5. Script: el código ejecuta los pasos" icon="code">
  <b-why>Un skill sigue siendo texto, y el modelo lo ejecuta de nuevo cada vez. Un script es código corriente: más rápido, más barato e igual en cada ejecución.</b-why>
  <a href="https://dev.to/0xandrewshu/turn-chats-into-skills-skills-into-scripts-2ndg" target="_blank" rel="noopener">Shu</a> los compara: un skill no es determinista, ya que diez ejecuciones de un mismo skill pueden mostrar comportamientos notablemente distintos<b-proof href="https://dev.to/0xandrewshu/turn-chats-into-skills-skills-into-scripts-2ndg" quote="Shu: “running the same Skill 10 times can lead to different behavior” — dev.to/0xandrewshu"></b-proof>. Los scripts son más rápidos, más estables y no gastan tokens, pero llevan tiempo escribirlos, son más rígidos ante condiciones inesperadas y pueden romperse. <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a> formula la regla de manera más simple: entregar todo lo posible a la lógica determinista y dejar al modelo solo la parte creativa<b-proof href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" quote="Rezvov: “Delegate as much as possible to deterministic logic” — dev.to/arezvov"></b-proof>. <a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a> aplica la misma idea a los errores del agente: junto a la regla del archivo escribe herramientas programadas, como scripts para capturas de pantalla y para ejecutar pruebas filtradas.
  <b-art names="ai-agent-maturity-levels/skill-script"></b-art>
  <b-cap>La misma ejecución diez veces: un skill muestra dispersión y gasta tokens, un script repite el resultado y no gasta nada.</b-cap>
  <b-table>
    <table>
    <thead>
      <tr><th></th><th>Skill</th><th>Script</th></tr>
    </thead>
    <tbody>
      <tr><td><b>Qué es</b></td><td>instrucciones en lenguaje natural en SKILL.md</td><td>código en Bash, Python y lenguajes similares</td></tr>
      <tr><td><b>Quién lo ejecuta</b></td><td>el modelo, de nuevo cada vez</td><td>el ordenador, sin modelo</td></tr>
      <tr><td><b>Si el resultado es el mismo</b></td><td>no: son posibles diferencias notables entre ejecuciones</td><td>sí, con la misma entrada</td></tr>
      <tr><td><b>Coste por ejecución</b></td><td>tokens en cada ejecución</td><td>segundos y cero tokens</td></tr>
      <tr><td><b>Cuándo conviene</b></td><td>el procedimiento cambia, hace falta flexibilidad, se ejecuta poco</td><td>el procedimiento se repite, es caro o debe ser predecible</td></tr>
      <tr><td><b>Precio</b></td><td>menos tiempo de creación</td><td>tiempo de escritura, rigidez ante lo inesperado, mantenimiento</td></tr>
    </tbody>
    </table>
  </b-table>
  <b-cap>Según el texto de Andrew <a href="https://dev.to/0xandrewshu/turn-chats-into-skills-skills-into-scripts-2ndg" target="_blank" rel="noopener">Shu</a> «Turn chats into Skills, Skills into scripts» (19.09.2026). El autor subraya que no todo debe automatizarse: tanto un skill como un script tienen un coste de creación y mantenimiento.</b-cap>
  Un script se <b>extrae</b> de un skill cuando el skill empieza a repetirse. Hacer un skill para ese trabajo deja de ser rentable: con los mismos datos un script se comporta igual en cada ejecución, mientras que un skill lleva la dispersión dentro del propio modelo. Esa dispersión es lo que produce las <a class="s-term" href="/materials/glossary/flaky-test/">pruebas inestables</a>: el mismo paso con los mismos datos unas veces pasa y otras falla, porque el agente se comporta de forma algo distinta cada vez. Un script no tiene esa causa, así que para el trabajo que se repite el determinismo compensa más.
  <b-callout icon="alert-circle">Queda mucha incertidumbre: el formato de los datos de entrada, los huecos, los valores inesperados. Los scripts suelen empezar a trabajar con datos, así que para ellos importa la parte determinista: la misma entrada da la misma salida y un error puede reproducirse. La incertidumbre pasa del paso a la comprobación de los datos de entrada.</b-callout>
  <b-finding>
    <ex>La exportación de la base de datos y la tabla dinámica del informe son iguales cada lunes, así que el script report.py se encargó de ellas, y el modelo escribe solo las conclusiones.</ex>
    <gen>Shu suele incrustar scripts en los skills: el skill queda como una envoltura que ejecuta los scripts, los une y comprueba la entrada y la salida.</gen>
    <do>Convierta un skill en un script cuando se repite, es complejo o es caro. Conserve como skills los procedimientos raros y cambiantes.</do>
  </b-finding>
</b-chapter>

<b-chapter id="crystal" title="El coste de un paso: lo que midió Malik" icon="gauge">
  <b-why>El paso de un skill a un script suele describirse con palabras. Arun <a href="https://arxiv.org/abs/2607.07052" target="_blank" rel="noopener">Malik</a>, del equipo de Azure Networking (Microsoft), lo midió en un sistema en funcionamiento y lo llamó «cristalización progresiva»: el comportamiento que un agente encontró y verificó se convierte gradualmente en código determinista<b-proof href="https://arxiv.org/abs/2607.07052" quote="Malik: “agent exploration should be a discovery mechanism, not a permanent execution model” — arxiv.org/abs/2607.07052"></b-proof>.</b-why>
  El sistema de Malik atiende incidentes en una red en la nube. Un incidente nuevo lo resuelve primero un agente, y se registra su camino. Si el camino se confirma con éxitos repetidos, se convierte en una plantilla, luego en un escenario híbrido y por fin en código sin modelo. Los tres modos son etapas de la vida del mismo comportamiento descubierto. Es la extracción en los últimos pasos: el camino que el agente recorrió solo se extrae a una plantilla, luego a un híbrido, luego a código.
  <b-art names="ai-agent-maturity-levels/crystal-modes"></b-art>
  <b-cap>Escalera arriba el comportamiento se promueve por el número de ejecuciones exitosas y se devuelve hacia abajo en un fallo: la cristalización es reversible.</b-cap>
  <b-table>
    <table>
    <thead>
      <tr><th>Modo</th><th>Cómo se ejecuta</th><th>Si el resultado es el mismo</th><th>Tokens por ejecución</th></tr>
    </thead>
    <tbody>
      <tr><td><b>Agente</b> (Type 3)</td><td>los subagentes razonan en un ámbito limitado, los pasos de escritura esperan la aprobación humana</td><td>aproximadamente el 50 %</td><td>10–50 mil</td></tr>
      <tr><td><b>Híbrido</b> (Type 2)</td><td>los pasos están fijados, el modelo interviene en etapas sueltas: análisis, clasificación, resumen; cada acción se comprueba contra un esquema</td><td>aproximadamente el 90 %</td><td>1–5 mil</td></tr>
      <tr><td><b>Código</b> (Type 1)</td><td>lógica escrita de antemano, sin modelo en el momento de ejecución</td><td>100 %</td><td>0</td></tr>
    </tbody>
    </table>
  </b-table>
  <b-sublabel top="22">Cuándo promover un modo</b-sublabel>
  <b-steps>
    <step t="Agente → híbrido" hl>al menos 10 ejecuciones exitosas, cero violaciones de seguridad, al menos el 90 % de las ejecuciones dan la misma secuencia de acciones, las pruebas de aceptación creadas automáticamente pasan.</step>
    <step t="Híbrido → código">al menos 50 ejecuciones híbridas exitosas, consistencia de las respuestas del modelo de al menos el 99 %, la regla cubre todas las variaciones de entrada observadas, todo el conjunto de pruebas de regresión pasa sin el modelo, una persona ha revisado la lógica final.</step>
    <step t="Código → atrás">ante un fallo, una violación de seguridad o pruebas que fallan, el playbook se degrada. Un ejemplo del artículo: tras una actualización de firmware cambió el formato de salida de un comando, el analizador falló, el playbook volvió a híbrido y, tras una serie de ejecuciones limpias, se promovió de nuevo<b-proof href="https://arxiv.org/abs/2607.07052" quote="Malik: “Crystallization is not one-way” — arxiv.org/abs/2607.07052"></b-proof>.</step>
  </b-steps>
  <b-sublabel top="22">En qué quedó a lo largo de 8 meses</b-sublabel>
  <b-count-bars>
    <bar k="Código" w="45%" color="accent">45%</bar>
    <bar k="Híbrido" w="30%" color="c-light">30%</bar>
    <bar k="Agente" w="25%" color="c-none">25%</bar>
  </b-count-bars>
  <b-cap>Proporción de ejecuciones por modo al final del octavo mes (sección VIII del artículo de <a href="https://arxiv.org/abs/2607.07052" target="_blank" rel="noopener">Malik</a>). Al principio casi todas las ejecuciones se hacían en el modo «agente».</b-cap>
  El coste del agente por incidente bajó más de un 70 % mientras que el número de incidentes se duplicó aproximadamente. Más del 90 % de las categorías típicas de incidentes se resuelven de forma autónoma, y la proporción de correcciones de falsos positivos se mantiene por debajo del 5 %. El autor formula la conclusión así: la plataforma se abarató al hacer más, porque dejó de pagar inferencia por un trabajo que ya había aprendido<b-proof href="https://arxiv.org/abs/2607.07052" quote="Malik: “the platform got cheaper as it did more” — arxiv.org/abs/2607.07052"></b-proof>.
  <b-callout icon="alert-circle">Las salvedades del autor. Los resultados proceden de una organización y un dominio, así que hay que recalcular los umbrales. Son observaciones de la plataforma durante ocho meses; no hay comparación controlada. La cifra del 45 % significa la proporción de ejecuciones atendidas por código; no puede leerse como la proporción de incidentes resueltos «sin IA». La ganancia es menor donde predominan tareas nuevas y puntuales de verdad.</b-callout>
  <b-callout icon="bulb">La palabra «cristalización» aparece también en otro artículo: Linghao Zhang (<a href="https://arxiv.org/abs/2603.10808" target="_blank" rel="noopener">arXiv 2603.10808</a>, 11.03.2026) describe cómo el conocimiento fragmentado de los diálogos de trabajo se consolida periódicamente en activos estructurados reutilizables. En el artículo de Zhang un diálogo se convierte en conocimiento, en el de Malik una traza de ejecución se convierte en código. Ambos describen el mismo movimiento escalera abajo: de la conversación a lo que queda por escrito.</b-callout>
  <b-finding>
    <ex>En el sistema de Malik la proporción de ejecuciones sin modelo pasó de cero al 45 % en ocho meses, y el coste por incidente bajó más de un 70 %.</ex>
    <gen>El paso escalera abajo, del modelo al código, compensa donde se repiten las mismas tareas. La autonomía está ligada al historial acumulado de ejecuciones de un escenario concreto y crece con él; un modelo más potente no la concede por sí solo<b-proof href="https://arxiv.org/abs/2607.07052" quote="Malik: “A more capable model does not automatically earn more autonomy; a track record does” — arxiv.org/abs/2607.07052"></b-proof>.</gen>
    <do>Cuente las ejecuciones exitosas de un skill. Si llegó a diez sin fallos, convierta los pasos repetibles en un script, y planifique un regreso al paso superior para cuando el script se rompa.</do>
  </b-finding>
</b-chapter>

<b-chapter id="harness" title="Paso 6. Harness: los errores se convierten en reglas del entorno" icon="loop-double">
  <b-why>Cuando existen especificaciones, skills y scripts, el paso siguiente es construir un entorno alrededor del agente: un harness. Es todo lo que no es el propio modelo, y crece a partir de los errores: cada tarea deja un registro y la siguiente sale mejor.</b-why>
  <a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every</a> construye toda su guía alrededor de un ciclo de cuatro pasos: Plan → Work → Review → Compound<b-proof href="https://every.to/guides/compound-engineering" quote="Every: “Plan → Work → Review → Compound → Repeat” — every.to/guides/compound-engineering"></b-proof>. Los tres primeros pasos producen una función, el cuarto produce un sistema que construye funciones mejor cada vez<b-proof href="https://every.to/guides/compound-engineering" quote="Every: “a system that builds features better each time” — every.to/guides/compound-engineering"></b-proof>. Según Every, aproximadamente el 80 % del tiempo de un ingeniero debe ir a la planificación y la revisión, y el 20 % restante al trabajo y al paso Compound.
  <b-art names="ai-agent-maturity-levels/compound-loop"></b-art>
  <b-cap>Los tres primeros pasos producen una función. El cuarto escribe la lección en archivos y skills, de modo que cada ronda siguiente empieza mejor que la anterior.</b-cap>
  <b-steps round>
    <step t="Plan">una idea se convierte en un plan: estudiar el requisito y el código, diseñar la solución y validar el plan.</step>
    <step t="Work">el agente ejecuta el plan en una rama aparte; tras cada cambio se ejecutan las pruebas y el linter.</step>
    <step t="Review">varios agentes comprueban el resultado, los hallazgos reciben prioridad P1, P2 o P3 y se registran.</step>
    <step t="Compound" hl>lo que funcionó y lo que no se escribe en los archivos adecuados: notas en CLAUDE.md, un documento de solución en docs/solutions/, nuevos agentes y skills. La pregunta de control: ¿detectará el sistema este error por sí mismo la próxima vez?</step>
  </b-steps>
  <b-cap>Según la guía de Every. Las soluciones se guardan en docs/solutions/ con metadatos para la búsqueda, los planes en docs/plans/, los hallazgos de la revisión en todos/.</b-cap>
  Birgitta <a href="https://martinfowler.com/articles/harness-engineering.html" target="_blank" rel="noopener">Böckeler</a> divide un harness en dos tipos de controles: las «guías» fijan de antemano el rumbo del agente, mientras que los «sensores» observan el resultado y le ayudan a corregirse<b-proof href="https://martinfowler.com/articles/harness-engineering.html" quote="Böckeler: guides “anticipate the agent's behaviour and aim to steer it before it acts”; sensors “observe after the agent acts and help it self-correct”"></b-proof>. Su regla: cuando un problema se repite, hay que mejorar las guías y los sensores<b-proof href="https://martinfowler.com/articles/harness-engineering.html" quote="Böckeler: “Whenever an issue happens multiple times, the feedforward and feedback controls should be improved”"></b-proof>. La disciplina de ajustar un harness se llama harness engineering, y HDD (Harness-Driven Development) es un método dentro de ella: cada error del agente se convierte en una regla del entorno, es decir, una instrucción, una comprobación o un límite.
  <a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a> coloca un harness en el nivel 6: pruebas, linters y comprobaciones para que el agente vea el resultado de su propio trabajo. Pone una condición: hace falta realimentación, o el resultado es una máquina de basura<b-proof href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" quote="Eledath: “If you want autonomy, you need backpressure” — bassimeledath.com"></b-proof>.
  <b-finding>
    <ex>El agente se equivocó con un tipo de cambio: la revisión registró la causa, apareció una regla en CLAUDE.md y se añadió al script una comprobación del tipo de cambio.</ex>
    <gen>Un harness se diferencia de un conjunto de archivos en que un error se convierte automáticamente en un registro: una regla, una comprobación, un skill o una edición de la especificación. <a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a> llama a esta idea harness engineering. Más en el artículo <a href="/blog/harness-driven-development/">Harness engineering en la práctica</a>.</gen>
    <do>Tras cada error corregido, haga una pregunta: qué escribir para que no se repita. Ese registro es el paso Compound y un cambio en el harness.</do>
  </b-finding>
</b-chapter>

<b-chapter id="system" title="Paso 7. Sistema agéntico: código en la base, agentes en los puntos complejos" icon="boxes-link">
  <b-why>La escalera termina con un sistema agéntico: un sistema construido con principios clásicos en el que los bloques complejos se sustituyen por agentes, y todo funciona junto en un servicio. El artículo muestra cómo llegar: paso a paso, extrayendo lo que se repite a código y comprobaciones.</b-why>
  El camino empieza con agentes: en un chat y en una sesión, un agente lo hace todo. Al final del camino la proporción de agentes sigue siendo pequeña, y la base del sistema es código clásico: scripts, comprobaciones, un calendario, datos. Un agente se encarga solo de los puntos complejos que, antes de los grandes modelos de lenguaje, resolvían equipos de especialistas en ML: analizar el texto de las solicitudes, clasificar, medir la similitud, resumir. Ahora es una solución ya hecha: un modelo se llama como parte del servicio, da mayor calidad y explica sus decisiones con palabras, de modo que el razonamiento puede leerse y comprobarse. El sistema en conjunto sigue siendo predecible porque la parte compleja está rodeada de comprobaciones deterministas.
  Las cifras de <a href="https://arxiv.org/abs/2607.07052" target="_blank" rel="noopener">Malik</a> apuntan en el mismo sentido: en ocho meses la proporción de ejecuciones por código sin modelo creció hasta el 45 %, mientras que el agente se quedó en el 25 % de las ejecuciones. Las escaleras de <a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a> (niveles 7–8: agentes en segundo plano y equipos de agentes), <a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a> (la «fábrica oscura», una caja negra que convierte especificaciones en software) y <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a> (una persona solo crea tickets en un gestor mientras los agentes los recogen por sí mismos, y la seguridad es la principal barrera) continúan hacia una autonomía creciente. Para que esa autonomía no se rompa, necesita un harness, el paso anterior.
  <b-finding>
    <ex>El informe semanal: un script calcula la exportación y la tabla dinámica, las reglas y las comprobaciones viven en el harness, y el agente atiende solo el texto libre de los comentarios de los responsables.</ex>
    <gen>Un sistema agéntico se apoya en código y comprobaciones, y un agente resuelve solo lo que no se puede resolver de otro modo. La proporción de agentes en él es pequeña, y la previsibilidad viene de la base determinista.</gen>
    <do>Antes de dar un bloque a un agente, pregunte si puede escribirse como código o como una comprobación. Deje al agente solo lo que el código no resuelve, y ponga comprobaciones en la entrada y en la salida.</do>
  </b-finding>
</b-chapter>

<b-chapter id="traps" title="Trampas en cada paso" icon="alert-circle">
  <b-why>Cada paso tiene un error típico que detiene la subida o la encarece demasiado. La tabla se arma con las propias salvedades de los autores.</b-why>
  <b-table>
    <table>
    <thead>
      <tr><th>Paso</th><th>Trampa típica</th><th>Quién escribe sobre ella</th><th>Cómo salir</th></tr>
    </thead>
    <tbody>
      <tr><td><b>1. Chat</b></td><td>mover texto de un lado a otro en lugar de que el agente trabaje con archivos</td><td><a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a>: el trabajo con sustancia necesita un agente</td><td>dar al agente acceso al proyecto y una manera de verificar el resultado</td></tr>
      <tr><td><b>2. <a class="s-term" href="/materials/glossary/ai-agent/">Agente</a></b></td><td>la persona aprueba cada acción mientras el archivo de reglas crece sin orden</td><td><a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every</a>: la mayoría se estanca aquí; <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a>: unas reglas malas son peores que ninguna</td><td>planificar con antelación, mantener cortas las reglas y revisar cada línea</td></tr>
      <tr><td><b>3. <a class="s-term" href="/materials/glossary/spec-driven-development/">Especificación</a></b></td><td>una especificación para cada nimiedad: Kiro convirtió un error pequeño en 4 historias de usuario y 16 criterios de aceptación</td><td><a href="https://www.martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html" target="_blank" rel="noopener">Böckeler</a> (Thoughtworks)</td><td>escribir una especificación para las tareas de más de un día y dejar sin ella las correcciones pequeñas</td></tr>
      <tr><td><b>4. <a class="s-term" href="/materials/glossary/agent-skills/">Skill</a></b></td><td>un skill para todo: tiene un coste de creación y mantenimiento</td><td><a href="https://dev.to/0xandrewshu/turn-chats-into-skills-skills-into-scripts-2ndg" target="_blank" rel="noopener">Shu</a></td><td>hacer un skill tras dos repeticiones exitosas, no por adelantado</td></tr>
      <tr><td><b>5. Script</b></td><td>promoción prematura: una plantilla vista solo unas pocas veces resulta poco fiable</td><td><a href="https://arxiv.org/abs/2607.07052" target="_blank" rel="noopener">Malik</a>: la calidad depende de las pruebas construidas a partir de ejecuciones</td><td>un umbral en el número de ejecuciones y un regreso un paso arriba ante un fallo</td></tr>
      <tr><td><b>6. Harness</b></td><td>la revisión humana se convierte en el cuello de botella; las comprobaciones escritas por el mismo agente confirman cualquier cosa</td><td><a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a>: la revisión humana se convierte en el cuello de botella; <a href="https://law.stanford.edu/2026/02/08/built-by-agents-tested-by-agents-trusted-by-whom/" target="_blank" rel="noopener">Stanford CodeX</a>: los agentes escribieron un sustituto (stub) que siempre devuelve «éxito»</td><td>las comprobaciones deben ser independientes del agente y la revisión parcialmente automática</td></tr>
      <tr><td><b>7. Sistema agéntico</b></td><td>se dan a los agentes cosas que el código podría resolver: crecen el precio y la dispersión de los resultados</td><td><a href="https://arxiv.org/abs/2607.07052" target="_blank" rel="noopener">Malik</a>: el comportamiento que encuentra un agente pasa al código según el número de ejecuciones exitosas</td><td>poner un agente solo en el punto complejo y extraer a código lo que se repite</td></tr>
    </tbody>
    </table>
  </b-table>
  <b-cap>El caso del sustituto (stub) de StrongDM se trata <a href="https://law.stanford.edu/2026/02/08/built-by-agents-tested-by-agents-trusted-by-whom/" target="_blank" rel="noopener">en el artículo de Stanford CodeX</a>.</b-cap>
  <b-finding>
    <ex>El agente escribió el código y la comprobación, y la comprobación simplemente devolvía «éxito»: el sistema se veía en verde y no verificaba nada.</ex>
    <gen>Cuanto más alto el paso, más cuesta un error de registro: una regla equivocada, una mala comprobación o un script prematuro afecta a todas las ejecuciones siguientes.</gen>
    <do>Antes de escribir algo, pregunte: ¿quién comprobará este registro y cómo? Si no hay nadie, mantenga el conocimiento un paso más abajo.</do>
  </b-finding>
</b-chapter>

<b-chapter id="stop" title="Cuándo parar" icon="target">
  <b-why>Los pasos superiores cuestan más que los inferiores, y no todo equipo los necesita.</b-why>
  <b-table>
    <table>
    <thead>
      <tr><th>Qué dice la fuente</th><th>Qué significa en la práctica</th></tr>
    </thead>
    <tbody>
      <tr><td><a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a>: la mayoría de los equipos deberían aspirar al nivel 5; por encima crece el rendimiento pero no la capacidad de entender y verificar el resultado</td><td>las reglas escritas, las herramientas deterministas y el contexto compartido suelen importar más que la máxima automatización</td></tr>
      <tr><td><a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a>: para el trabajo diario la palanca está en el nivel 7; el autor trata el nivel 8 como la frontera que nadie ha dominado todavía</td><td>los agentes en segundo plano con comprobaciones son hoy un límite superior razonable</td></tr>
      <tr><td><a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a>: en el nivel 3 mucha gente siente que las cosas empeoraron porque el trabajo se reduce a leer diferencias (diffs)</td><td>tras la primera aceleración es posible una caída; se supera pasando a las especificaciones y los skills, sin necesidad de volver al chat</td></tr>
      <tr><td><a href="https://dev.to/0xandrewshu/turn-chats-into-skills-skills-into-scripts-2ndg" target="_blank" rel="noopener">Shu</a>: tanto un skill como un script tienen un coste de creación y mantenimiento</td><td>automatizar lo que de verdad se repite</td></tr>
      <tr><td><a href="https://arxiv.org/abs/2607.07052" target="_blank" rel="noopener">Malik</a>: la ganancia es menor donde predominan tareas nuevas y puntuales</td><td>para el trabajo exploratorio, quedarse en un agente con una especificación</td></tr>
    </tbody>
    </table>
  </b-table>
  <b-finding>
    <ex>En la escalera de <a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a> el séptimo nivel queda aparte: lo llama más cercano a un reinicio que a una continuación.</ex>
    <gen>Subir la escalera tiene sentido mientras reduzca el trabajo de la persona; el número de archivos de un repositorio no prueba nada.</gen>
    <do>Antes de cada paso compruebe: ¿se repite la tarea? ¿Puede verificarse el resultado automáticamente? Si no, quédese en el paso actual.</do>
  </b-finding>
</b-chapter>

<b-chapter id="start" title="Por dónde empezar: prompts listos para el agente" icon="play">
  <b-why>Cuatro prompts que suben el conocimiento un paso, es decir, lo extraen del paso inferior. Ponga su propia tarea en lugar de los corchetes.</b-why>
  <b-sublabel top="12">De un chat a un archivo de reglas</b-sublabel>
  <b-prompt>
    Relee este diálogo. Encuentra los lugares en que te corregí o repetí lo mismo.
    Para cada uno escribe una línea corta de regla para el archivo CLAUDE.md.
    No añadas consejos generales, solo lo que hubo en el diálogo.
  </b-prompt>
  <b-sublabel top="22">De las reglas a una especificación</b-sublabel>
  <b-prompt>
    Tarea: [descripción]. Antes de escribir código, redacta spec.md:
    qué hay que producir, de dónde vienen los datos, cuáles son las restricciones y cómo saber que la tarea está hecha.
    Hazme preguntas si falta algo.
  </b-prompt>
  <b-sublabel top="22">De una buena ejecución a un skill</b-sublabel>
  <b-prompt>
    Relee este diálogo y convierte el procedimiento que llevaste a cabo en él en un skill: una carpeta con SKILL.md,
    un nombre y una descripción al principio, y después instrucciones paso a paso, restricciones y un ejemplo de resultado.
  </b-prompt>
  <b-sublabel top="22">De un skill a un script</b-sublabel>
  <b-prompt>
    Mira el skill [nombre]. Selecciona los pasos que se ejecutan igual cada vez y escribe para ellos un script en Python.
    Deja en el skill solo el lanzamiento del script y la comprobación del resultado.
  </b-prompt>
  <b-finding>
    <ex>Cuatro prompts sustituyen una discusión sobre «cómo adoptar la IA»: cada uno sube exactamente una porción de conocimiento un paso.</ex>
    <gen>Hay una sola regla de transición: se repitió una segunda vez, escríbalo; el registro se repite y es estable, conviértalo en código.</gen>
    <do>Empiece por el prompt que corresponda a su paso actual de la tabla del principio del artículo.</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Preguntas frecuentes">
  <b-faq-cards>
    <q t="¿Qué niveles de madurez del trabajo con IA en el desarrollo existen?">No hay una escala única. Este artículo tiene siete pasos, <a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every</a> tiene seis pasos del desarrollo manual a los agentes paralelos en la nube, <a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a> tiene ocho niveles, <a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a> siete, y <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a> y <a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a> seis cada uno (niveles 0–5). Todos coinciden en que el camino va de un chat a un agente, luego a reglas y especificaciones escritas y de ahí a un sistema autónomo.</q>
    <q t="¿Qué es la compound engineering?">Un enfoque de Every en el que cada tarea terminada deja un registro que ayuda a las tareas posteriores: el ciclo Plan → Work → Review → Compound. El último paso escribe la lección en CLAUDE.md, en documentos de solución, en skills y en agentes.</q>
    <q t="¿En qué se diferencia un skill de un script?">Un skill es una instrucción de texto que el modelo ejecuta de nuevo en cada ejecución, así que los resultados pueden diferir. Un script es código corriente: más rápido, más barato y con el mismo resultado, pero más lento de escribir y más rígido ante condiciones inesperadas.</q>
    <q t="¿Es necesario llegar a la «fábrica oscura»?">No. Clark aconseja a la mayoría de los equipos detenerse en el nivel 5, y Eledath señala el nivel 7 como el punto de mayor palanca. Suba más solo si las tareas se repiten y el resultado puede verificarse automáticamente.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Seguir leyendo">
  <b-links cols="2">
    <item href="/blog/harness-driven-development/" k="Método" t="Harness-Driven Development">Un error del agente → una regla del entorno</item>
    <item href="/blog/specs-rules-skills/" k="Contexto" t="AGENTS.md, CLAUDE.md y spec.md">Qué va dónde: especificaciones, reglas, skills</item>
    <item href="/blog/spec-reconcile-loop/" k="Especificaciones" t="El ciclo de conciliación de la especificación">Cómo aprende una especificación de un sistema en funcionamiento</item>
    <item href="/blog/specs-by-aggregates/" k="Especificaciones" t="Especificaciones por agregado">Cómo dividir una especificación grande en partes</item>
    <item href="/blog/quality-gates-ai-agents/" k="Puertas" t="Qué son las puertas de calidad para agentes de IA">qué comprobaciones poner en los pasos de la escalera</item>
    <item href="/blog/agent-escalation-to-human/" k="Escalado" t="Escalado a una persona en agentes de IA">cómo se detiene un agente y pregunta</item>
  </b-links>
</b-chapter>
<b-footer>Basado en las fuentes primarias: <a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every</a> (compound engineering), <a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a> (05.02.2026), <a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a> (10.03.2026), <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a> (06.04.2026), <a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a> (05.01.2026), <a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a> (23.01.2026), <a href="https://developers.redhat.com/articles/2026/03/30/vibes-specs-skills-agents-ai-coding" target="_blank" rel="noopener">Red Hat</a> (30.03.2026), <a href="https://dev.to/0xandrewshu/turn-chats-into-skills-skills-into-scripts-2ndg" target="_blank" rel="noopener">Shu</a> (19.09.2026), <a href="https://arxiv.org/abs/2607.07052" target="_blank" rel="noopener">Malik</a> (arXiv 2607.07052, 08.07.2026), Zhang (arXiv 2603.10808), <a href="https://martinfowler.com/articles/harness-engineering.html" target="_blank" rel="noopener">Böckeler</a> (martinfowler.com). Los seis pasos se reúnen a partir de estas fuentes con el criterio «qué se deja por escrito»; los autores no tienen una escalera única con esta secuencia.</b-footer>
</b-post>
