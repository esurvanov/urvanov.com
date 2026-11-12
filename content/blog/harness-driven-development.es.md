---
title: Qué es harness engineering en la práctica: convertir los errores de un agente de IA en reglas de su entorno (HDD)
date: 2026-09-28
updated: 2026-11-13
description: El ciclo error-regla, guías y sensores, tres capas de comprobaciones, cómo encaja con las especificaciones y cinco primeros pasos en tu propio proyecto.
tags: IA, Claude Code, harness engineering, harness, HDD, agentes
category: harness
layout: wide
image: /og/harness-driven-development.en.png
mentions: Harness engineering, Claude Code, AGENTS.md, CLAUDE.md, Spec-Driven Development
toc: loop=El ciclo HDD | canons=El esquema 3 × 3 | double=Doble ciclo | controls=Guías y sensores | layers=Tres capas de comprobación | shift=Antes es más barato | human=Dónde importan las personas | spec=HDD y specs | start=Por dónde empezar | faq=Preguntas | next=Seguir leyendo
---

El **harness engineering** es el trabajo de dar forma al harness (arnés del agente), el entorno que rodea a un agente de IA: instrucciones, sistemas conectados, permisos y comprobaciones. El **desarrollo guiado por el harness (Harness-Driven Development, HDD)** es un método de trabajo basado en él: cada error del agente se convierte en una regla de ese entorno. Se empieza con un archivo de instrucciones AGENTS.md o CLAUDE.md y un registro de errores del agente: una vez por semana, las entradas del registro pasan a reglas, pruebas o hooks.

<b-post series="hdd">
<b-chapter id="loop" icon="refresh-cw" title="El ciclo HDD">
  <b-why align="left">El ciclo funciona así. El agente recibe una tarea y produce un resultado. Los sensores (una prueba, un linter, una revisión) comprueban el resultado. Si todo pasa, la tarea se cierra. Si un sensor encuentra un error, una persona cambia el entorno del agente, el harness: añade una línea a las instrucciones, una prueba o un hook. La siguiente tarea se ejecuta con esa regla y el error no se repite.</b-why>
  <b-hdd-scene name="harness-driven-development/loop" frame="loop"/>
  <b-cap>El principio de Mitchell Hashimoto: cuando el agente comete un error, cambia el harness para que ese error no pueda volver a ocurrir <a href="https://www.faros.ai/blog/harness-engineering" target="_blank" rel="noopener">Faros</a></b-cap>
  <b-why>Un prompt corrige una petición, el contexto corrige lo que sabe el modelo, el harness corrige todas las ejecuciones siguientes. Ejemplo: el agente edita código y no ejecuta las pruebas.</b-why>
  <b-hdd-scene name="harness-driven-development/fix-levels" frame="fig"/>
  <b-cap>Etapas según las describen <a href="https://www.faros.ai/blog/harness-engineering" target="_blank" rel="noopener">Faros</a> y <a href="https://marmelab.com/blog/2026/09/24/the-state-of-ai-harness-engineering-2026.html" target="_blank" rel="noopener">marmelab</a></b-cap>
  <b-why align="left">La tabla muestra un error (el agente edita código y no ejecuta las pruebas) y tres formas de corregirlo. Prompt: añadir «ejecuta las pruebas tras la edición». Eso funciona solo para una petición, y la siguiente empieza de cero. Contexto: escribir lo mismo en el archivo de instrucciones del proyecto. El modelo lo lee pero puede saltárselo. Harness: añadir un hook que ejecuta las pruebas por sí mismo tras cada edición. Se ejecuta sin el modelo, así que la corrección se mantiene en todas las ejecuciones siguientes.</b-why>
  <b-finding>
    <ex>Un error detectado por los sensores pasa al harness como una regla nueva, y el agente recibe esa regla en cada ejecución siguiente.</ex>
    <gen>Un resultado corregido a mano ayuda una vez. Una regla en el harness (una instrucción, una prueba o un hook) se aplica a todas las tareas futuras, de modo que el harness se vuelve más preciso con el tiempo sin cambiar el modelo.</gen>
    <do>Adopta una norma: todo error del agente que hayas tenido que corregir a mano se convierte el mismo día en una línea de las instrucciones o en una prueba.</do>
  </b-finding>
</b-chapter>

<b-chapter id="canons" icon="grid" title="Cómo se organiza un harness: 3 × 3">
  <b-why>Tres dominios del ciclo y tres contextos en cada uno: nueve cánones. Cada canon tiene exactamente un dominio y un contexto.</b-why>
  <b-hdd-matrix kind="canons" label="Cómo se organiza un harness: 3 × 3">
    <column icon="book" t="Spec">qué debe ser cierto</column>
    <column icon="sun" t="Skill">cómo actuar</column>
    <column icon="database" t="Memoria">en qué apoyarse</column>
    <row icon="target" t="Expectativa">qué debería ser</row>
    <cell>géneros, esquemas | niveles de requisitos | pasaporte de cifras</cell>
    <cell>predicción antes de actuar</cell>
    <cell>roles de actuadores | en vivo · MCP</cell>
    <row icon="eye" t="Observación">qué se midió</row>
    <cell>rango de evidencias | formato de hallazgos | escala</cell>
    <cell>el sensor registra el hecho</cell>
    <cell>solo en vivo</cell>
    <row icon="refresh-cw" t="Ciclo">comparar y decidir</row>
    <cell>criterios de completitud de reglas | registro de hallazgos</cell>
    <cell>comparar | contar repeticiones | parchear o revisar</cell>
    <cell empty>vacío por ahora</cell>
  </b-hdd-matrix>
  <b-hdd-fanin label="Expectativa + Observación → Ciclo → parchear / revisar reglas">
    <in icon="target">Expectativa</in>
    <in icon="eye">Observación</in>
    <mid icon="refresh-cw" note="✕ sin vínculo inverso">Ciclo</mid>
    <out>parche</out>
    <out alt>revisar reglas</out>
    <note from="sun" to="book">skill → spec de su dominio · un script en un hook de commit comprueba la dirección</note>
  </b-hdd-fanin>
  <b-hdd-modes>
    <mode icon="table" t="snapshot">una tabla, actualizada tras cada medición nueva</mode>
    <mode icon="broadcast-pole" t="live">un protocolo, fresco cada vez, no se guarda nada</mode>
  </b-hdd-modes>
  <b-why align="left">La matriz se lee como tres preguntas. Expectativa: cuál debería ser el resultado (por ejemplo, «tras la edición las pruebas pasan»). Observación: cuál resultó ser en realidad, lo que registra un sensor. Ciclo: compara ambos y decide qué hacer. Cada una de las tres filas tiene tres tipos de apoyo: spec (qué debe ser cierto), skill (cómo actuar) y memoria (en qué apoyarse). Las palabras «dominio» y «canon» son aquí solo nombres: un dominio es una fila de la matriz, un canon es una celda, por ejemplo la spec de Expectativa. El diagrama de abajo muestra la dirección de los vínculos: Expectativa y Observación alimentan el Ciclo, y este produce un parche (corregir la acción) o una revisión de las reglas. No hay vínculo de vuelta hacia el Ciclo, así que los dominios no se enredan entre sí. Los modos de la memoria: snapshot es una tabla que se actualiza cuando llega una medición nueva; live significa que los datos se toman del sistema vivo (por ejemplo mediante MCP) cada vez y no se guardan.</b-why>
  <b-finding>
    <ex>El ciclo se divide en Expectativa, Observación y Ciclo, cada uno con su spec, su skill y su memoria. El Ciclo lee los otros dos dominios; estos nunca leen el Ciclo.</ex>
    <gen>Es un ciclo de realimentación negativa: el valor objetivo se compara con el medido, y algo cambia solo si no coinciden. Una dirección estricta de referencias evita que los dominios se enreden, y que un mismo concepto se repita en dos dominios no es un defecto.</gen>
    <do>Reparte los archivos de tu harness en las nueve celdas y comprueba que ningún archivo de Expectativa u Observación hace referencia al Ciclo.</do>
  </b-finding>
</b-chapter>

<b-chapter id="double" icon="loop-double" title="El doble ciclo">
  <b-why align="left">El doble ciclo responde a la pregunta de qué cambiar exactamente tras un error. Toma el mismo error: el agente no ejecutó las pruebas. En un ciclo simple se lo recuerdas al agente, ejecuta las pruebas y las reglas quedan como estaban. En un doble ciclo preguntas qué regla permitió el error y la cambias: ahora un hook ejecuta las pruebas tras cada edición. La idea viene de la teoría del aprendizaje organizacional (Chris Argyris y Donald Schön): un ciclo simple corrige la acción, un doble ciclo revisa las reglas de las que la acción se derivaba. <a href="https://en.wikipedia.org/wiki/Double-loop_learning" target="_blank" rel="noopener">Wikipedia: Double-loop learning</a>.</b-why>
  <b-hdd-loops>
    <loop kind="single" t="ciclo simple">corregir la acción con las mismas reglas</loop>
    <loop kind="double" t="doble ciclo" on>cambiar las propias reglas</loop>
  </b-hdd-loops>
  <b-hdd-principles>
    <principle icon="wave-line" t="Parches sin una predicción nueva">corregir con una regla</principle>
    <principle icon="flask" t="Varias quejas">primero comprobar si tienen una causa común</principle>
    <principle icon="history" t="Una regla nueva">se acepta solo si los casos antiguos se derivan de ella</principle>
    <principle icon="shield-check" t="Sin comprobación externa">descartarla, dejando constancia</principle>
  </b-hdd-principles>
  <b-cap>El ciclo se aplica a sí mismo: cada ejecución termina con el riesgo residual, nunca con un estado «hecho».</b-cap>
  <b-why align="left">Cambiar las reglas tras cada queja es arriesgado: el harness empieza a crecer sin orden por ediciones casuales. Por eso el Ciclo aplica cuatro comprobaciones. Si las correcciones solo tapan agujeros y no predicen nada nuevo, se sustituyen por una sola regla. Si hay varias quejas, primero se comprueba si comparten una causa. Una regla nueva se acepta solo si con ella siguen explicándose los casos antiguos. Una regla sin comprobación externa se descarta, pero el registro dice qué se descartó y por qué. El pie bajo las tarjetas significa que el Ciclo se aplica también a sí mismo: una ejecución termina con el riesgo residual.</b-why>
  <b-finding>
    <ex>Una serie de parches, quejas, una regla nueva y una comprobación externa son cuatro principios comprobables con los que el Ciclo decide si corregir la acción o cambiar las reglas.</ex>
    <gen>Un ciclo simple corrige el resultado dentro de las reglas antiguas. Un doble ciclo cambia las propias reglas, y lo hace con principios comprobables, de modo que el harness aprende sin desviarse por ediciones al azar.</gen>
    <do>Cuando la misma corrección aparezca por tercera vez, detente y pregunta qué regla la provoca. Cambia la regla solo si también explica los casos antiguos.</do>
  </b-finding>
</b-chapter>

<b-chapter id="controls" icon="grid" title="Guías y sensores">
  <b-why align="left">Las comprobaciones de un harness se dividen según dos rasgos. El primero es cuándo se activan. Las guías actúan antes de que el agente actúe y marcan el rumbo: tipos, plantillas de código, instrucciones, specs. Los sensores actúan después de la acción y detectan desviaciones: pruebas, un linter, una revisión con IA. El segundo rasgo es cómo se construye una comprobación. Las comprobaciones computables (tipos, pruebas, linter) se activan en segundos y no se equivocan dentro de su regla. Las comprobaciones mediante IA (una revisión con IA, un modelo juez) son más flexibles y más caras, por lo que se reservan para el sentido: estilo, claridad, ajuste a la intención.</b-why>
  <b-hdd-matrix kind="guides" label="Matriz: las guías actúan antes del agente, los sensores después; cada una es computacional o basada en IA">
    <column icon="arrow-right" t="Guías">antes de la acción</column>
    <column icon="eye" t="Sensores">después de la acción</column>
    <row icon="cpu" t="Computacional" speed="3">rápido · fiable</row>
    <cell>tipos | plantillas de código | generadores</cell>
    <cell>pruebas | linter | comprobación de tipos</cell>
    <row icon="sparkle-4" t="Basado en IA" speed="1">flexible · más caro</row>
    <cell>AGENTS.md · CLAUDE.md | skills | specs</cell>
    <cell>revisión con IA | LLM juez</cell>
  </b-hdd-matrix>
  <b-cap>División según se describe en <a href="https://martinfowler.com/articles/harness-engineering.html" target="_blank" rel="noopener">Birgitta Böckeler (martinfowler.com)</a></b-cap>
  <b-finding>
    <ex>Cuatro celdas: las guías marcan el rumbo antes de que trabaje el agente, los sensores detectan desviaciones después, y cada una puede ser computacional o basada en IA.</ex>
    <gen>Las comprobaciones computacionales se ejecutan en segundos y no cometen errores dentro de su regla, así que úsalas siempre que una regla se pueda escribir de forma formal. Reserva las comprobaciones basadas en IA para el sentido: estilo, claridad, ajuste con la intención.</gen>
    <do>Para cada regla de las instrucciones del agente, pregunta si una prueba o un linter podría comprobarla. Si es así, muévela allí.</do>
  </b-finding>
</b-chapter>

<b-chapter id="layers" icon="layers" title="Tres capas de comprobación">
  <b-why align="left">Las comprobaciones se reparten en tres capas. Calidad del código: estilo, formato, tipos, errores simples. Arquitectura: límites de módulos y dependencias entre ellos, requisitos de velocidad. Comportamiento: si el producto hace lo que el usuario necesita. Las barras de la imagen muestran cuánto se ha aprendido a comprobar automáticamente esa capa: la primera barra está casi llena, el comportamiento tiene la más corta.</b-why>
  <b-hdd-layers label="Tres capas: la calidad del código es la más madura, la arquitectura está en medio, el comportamiento es la menos madura">
    <layer icon="brush" t="Calidad del código" value="88">madura</layer>
    <layer icon="modules" t="Arquitectura" value="55">en crecimiento</layer>
    <layer icon="user-round" t="Comportamiento" value="25" sw="1.8">la más difícil</layer>
  </b-hdd-layers>
  <b-cap>Madurez de las capas según la evaluación de <a href="https://martinfowler.com/articles/harness-engineering.html" target="_blank" rel="noopener">Birgitta Böckeler (martinfowler.com)</a></b-cap>
  <b-finding>
    <ex>La calidad del código es hoy lo más fácil de comprobar, y el comportamiento del producto lo más difícil.</ex>
    <gen>Los linters y los formateadores cubren la primera capa casi de inmediato. La arquitectura se comprueba con reglas de dependencias y requisitos de rendimiento. El comportamiento sigue necesitando buenas pruebas de escenarios y un ojo humano.</gen>
    <do>Empieza por la primera capa: ejecuta un linter y un formateador en cada ejecución del agente, y luego añade una regla para los límites de módulos.</do>
  </b-finding>
</b-chapter>

<b-chapter id="shift" icon="clock" title="Antes es más barato">
  <b-why align="left">Toda comprobación se activa en algún momento, y cuanto antes lo hace, más barato es corregir el error. La imagen muestra cuatro momentos: antes de que trabaje el agente (instrucciones y specs), al escribir (hooks y un linter), en CI (una compilación y pruebas automáticas al subir código al repositorio) y en una revisión humana. Los signos $ muestran el precio creciente de un error.</b-why>
  <b-hdd-cost label="Cuanto antes se ejecuta una comprobación, más barato es el error: antes de que empiece el agente, al escribir, en CI, en la revisión">
    <stage icon="arrow-right" t="Antes del trabajo" cost="$">instrucciones · specs</stage>
    <stage icon="cpu" t="Al escribir" cost="$$">hooks · linter</stage>
    <stage icon="refresh-cw" t="En CI" cost="$$$" sw="1.8">pruebas · compilación</stage>
    <stage icon="user-round" t="En la revisión" cost="$$$$" sw="1.8">una persona</stage>
  </b-hdd-cost>
  <b-why align="left">Las pruebas las ejecutan motores como [QUnit](/materials/glossary/qunit/), [Jest](/materials/glossary/jest/) y [Vitest](/materials/glossary/vitest/). En qué se diferencian y cuál elegir se explica en el artículo [Vitest vs Jest: cuál elegir para un proyecto de JavaScript y cuándo basta QUnit](/blog/jest-vs-vitest-vs-qunit/). Las reglas de comportamiento que las pruebas corrientes no pueden comprobar las encuentra un [modelo en Quint](/blog/quint-vs-tests-and-tla/).</b-why>
  <b-finding>
    <ex>El mismo error cuesta menos antes de que empiece el agente y más en la revisión humana.</ex>
    <gen>Pon las comprobaciones rápidas lo más pronto posible: el agente corrige el problema por sí mismo mientras aún tiene delante el contexto de la tarea, y a una persona solo llegan los puntos discutibles.</gen>
    <do>Conecta las pruebas y el linter a un hook que el agente ejecute tras cada edición, además de CI.</do>
  </b-finding>
</b-chapter>

<b-chapter id="human" icon="user-round" title="Dónde importan las personas">
  <b-why align="left">El harness asume las comprobaciones rutinarias: estilo, tipos, pruebas, límites de módulos. Una persona decide lo que una comprobación formal no puede cubrir: arquitectura, cuestiones de producto y reglas nuevas. Los números de la imagen muestran una proporción de ejemplo: 36 comprobaciones para el harness y 6 para una persona.</b-why>
  <b-hdd-split label="El harness se ocupa de las comprobaciones rutinarias; una persona decide arquitectura y cuestiones de producto y mejora el propio harness">
    <side icon="sun" t="Harness" n="36">estilo · tipos · pruebas · límites</side>
    <side icon="user-round" t="Persona" n="6" sw="1.8">arquitectura · producto · reglas nuevas</side>
  </b-hdd-split>
  <b-cap>«Un buen harness mantiene a la persona en el ciclo y dirige su atención adonde más importa», parafraseando a <a href="https://martinfowler.com/articles/harness-engineering.html" target="_blank" rel="noopener">Birgitta Böckeler (martinfowler.com)</a></b-cap>
  <b-finding>
    <ex>El harness asume la mayoría de las comprobaciones; la persona se queda con las decisiones y con el trabajo de mejorar el harness.</ex>
    <gen>Un desarrollador con experiencia lleva en la cabeza un harness implícito: conocimiento de la arquitectura, hábitos del equipo, olfato para el riesgo. HDD traslada ese conocimiento a reglas explícitas, de modo que cada ejecución del agente lo recibe.</gen>
    <do>Tras cada revisión del código del agente, anota un comentario que se repita y conviértelo en una regla.</do>
  </b-finding>
</b-chapter>

<b-chapter id="spec" icon="file-text" sw="2" title="HDD y specs">
  <b-why align="left">Una spec y un harness se complementan. La spec responde a «qué debe salir», el harness comprueba que salió exactamente eso. En la imagen la spec fija el resultado necesario, el harness lo comprueba, y el código se acepta por los resultados de las comprobaciones y no por leer cada línea.</b-why>
  <b-hdd-specflow label="La spec fija el objetivo; el harness comprueba que el agente lo alcanzó">
    <node icon="target" t="Spec">el resultado que necesitas</node>
    <node icon="sun" t="Harness">cómo comprobar que lo conseguiste</node>
    <node icon="check-circle-alt" t="Código aceptado">sin revisión manual línea a línea</node>
  </b-hdd-specflow>
  <b-cap>«Las specs definen el estado objetivo, el harness es el sistema de control», según <a href="https://loiane.com/2026/04/harness-engineering-missing-layer-specs-driven-ai-development/" target="_blank" rel="noopener">Loiane Groner</a>. Más sobre specs en la charla <a href="/talk/spec-driven-development/">Spec-Driven Development en la práctica</a></b-cap>
  <b-finding>
    <ex>La spec responde a «qué construimos», el harness responde a «cómo sabemos que lo construimos».</ex>
    <gen>Sin una spec el harness no tiene nada que comprobar, y sin un harness la spec se queda en documento. Juntos permiten aceptar el código del agente según comprobaciones en lugar de leer cada línea.</gen>
    <do>Para cada requisito de la spec, anota qué prueba o comprobación confirmará que se cumple.</do>
  </b-finding>
</b-chapter>

<b-chapter id="start" icon="flag" title="Por dónde empezar">
  <b-why align="left">Un harness no hay que diseñarlo entero. Empieza con cinco pasos: los dos primeros preparan el entorno de una vez, los otros tres ponen en marcha el ciclo «error → regla». Un archivo de progreso hace falta cuando una tarea dura más de una sesión: contiene una lista de funciones con un estado, y una sesión nueva del agente continúa desde el mismo punto.</b-why>
  <b-hdd-steps>
    <step t="Un archivo de instrucciones para el agente">AGENTS.md o CLAUDE.md en la raíz del proyecto: cómo compilar, cómo probar, qué no hacer</step>
    <step t="Linter y pruebas tras cada edición">un hook que el agente ejecuta él mismo antes de entregar el resultado</step>
    <step t="Un registro de errores del agente">cada error corregido a mano recibe una línea con su causa</step>
    <step t="Error → regla">una vez por semana, pasar las entradas del registro a instrucciones, pruebas o hooks</step>
    <step t="Un archivo de progreso para tareas largas">una lista de funciones con estados y el historial de commits, para que una sesión nueva retome donde acabó la anterior <a href="https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents" target="_blank" rel="noopener">Anthropic</a></step>
  </b-hdd-steps>
  <b-finding>
    <ex>Cinco pasos: dos preparan el harness enseguida, tres ponen en marcha el ciclo «error → regla».</ex>
    <gen>Nadie diseña un harness completo por adelantado. Crece a partir de los errores reales del agente en tu proyecto, y en pocas semanas el agente deja de repetir los más comunes.</gen>
    <do>Hoy, crea el archivo de instrucciones y el registro de errores. Dentro de una semana, pasa las primeras entradas del registro a reglas.</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Preguntas frecuentes">
  <b-faq-cards>
    <q t="¿Qué es harness engineering?">Preparar el entorno que rodea a un agente de IA: instrucciones, herramientas, permisos y comprobaciones.</q>
    <q t="¿Qué es HDD?">Harness-Driven Development: un método en el que cada error del agente se convierte en una regla del entorno, una instrucción, una prueba o un hook.</q>
    <q t="¿Por qué una regla es mejor que una corrección manual?">Un resultado corregido a mano ayuda una vez, mientras que una regla en el harness funciona para todas las tareas futuras.</q>
    <q t="¿Cómo se empieza con HDD?">Crea un archivo de instrucciones para el agente y un registro de sus errores, y una vez por semana pasa las entradas del registro a reglas, pruebas o hooks.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Seguir leyendo">
  <b-links cols="2">
    <item href="/blog/work-prompts-examples/" k="Etapa 1–2" t="Prompts para tareas de trabajo">cómo escribir una petición suelta y aportar datos</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="Etapa 3" t="Comparación de harnesses">Claude Code, Codex, Cursor, Hermes y chat</item>
  </b-links>
  <b-cap>Para leer más: <a href="https://martinfowler.com/articles/harness-engineering.html" target="_blank" rel="noopener">Birgitta Böckeler (martinfowler.com)</a> · <a href="https://www.anthropic.com/engineering/harness-design-long-running-apps" target="_blank" rel="noopener">Anthropic: Harness design</a> · <a href="https://leanpub.com/becoming-a-harness-driven-developer" target="_blank" rel="noopener">Becoming a Harness-Driven Developer</a> · <a href="https://github.com/ai-boost/awesome-harness-engineering" target="_blank" rel="noopener">awesome-harness-engineering</a></b-cap>
</b-chapter>
<b-footer>Los términos y la división en capas siguen las fuentes enlazadas en los pies de los diagramas.</b-footer>
</b-post>
