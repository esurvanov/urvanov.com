---
title: Diferencia entre verificación de modelos y pruebas: una prueba comprueba un escenario, un modelo comprueba todos los órdenes de acciones (Quint, QUnit y TLA+)
date: 2026-10-25
updated: 2026-11-08
description: Una prueba comprueba un escenario que se te ocurrió; la verificación de modelos prueba todos los órdenes de acciones. Qué detectan QUnit, Jest y Vitest, y qué detectan Quint, TLA+ y Alloy.
tags: IA, specs, Quint, TLA+, Alloy, QUnit, Jest, Vitest, pruebas, verificación formal
category: specs
layout: wide
mentions: Quint, QUnit, Jest, Vitest, TLA+, Alloy, Apalache, model checking, formal verification, Quint vs QUnit, test framework
toc: names=Dos nombres | tests=Motores de pruebas | tla=TLA+ y Alloy | choose=Qué elegir | together=Juntos | faq=FAQ | next=Más lecturas
---

Una prueba comprueba un escenario que se te ocurrió, mientras que la verificación de modelos prueba todos los órdenes de acciones y encuentra una violación de una regla que nadie imaginó. Los frameworks de pruebas como QUnit, Jest y Vitest comprueban con ejemplos el código ya terminado. Quint y TLA+ comprueban las reglas de un sistema incluso antes de que exista código, también el de un agente de IA.

<b-post series="harness">
<b-art names="quint-vs-tests-and-tla/names" wide/>

<b-chapter id="names" icon="swap" title="En qué se diferencia Quint de QUnit: dos nombres parecidos">
  <b-why align="left">[QUnit](/materials/glossary/qunit/) es un motor de pruebas de JavaScript, de la misma familia que [Jest](/materials/glossary/jest/) y [Vitest](/materials/glossary/vitest/). Escribes una función, luego una prueba con una entrada y una respuesta esperada, y el motor dice si coinciden. Quint es un lenguaje para describir cómo debe comportarse un sistema. El propio programa prueba todos los movimientos posibles y busca aquellos en que una regla se rompe. La confusión viene del nombre, pero en esencia son programas de clases distintas. Una comparación de los propios motores de pruebas está en el artículo [Jest vs Vitest vs QUnit](/blog/jest-vs-vitest-vs-qunit/).</b-why>
  <b-why align="left">Cómo es una prueba de QUnit. Toma una función ya terminada, por ejemplo una suma, le pasa uno y dos y compara la respuesta con tres: `assert.equal(add(1, 2), 3)`, un ejemplo del sitio de QUnit<b-proof href="https://qunitjs.com/" quote="A Quick Example"/>. Si la respuesta es correcta, la prueba pasa. Todo lo que la prueba sabe del mundo es la entrada y la respuesta esperada que elegiste de antemano.</b-why>
  <b-why align="left">Un modelo de Quint está construido de otra manera: no tiene función ni respuesta. Describes en qué estados puede estar el sistema, qué acciones lo llevan de un estado a otro y qué reglas deben cumplirse siempre. El propio Quint ejecuta un modelo así, lo simula y lo comprueba antes de que el código salga<b-proof href="https://quint-lang.org/" quote="Write specs you can run, simulate, and verify before shipping code."/>. Por eso da igual si el código está escrito: comprueba la intención, no la implementación.</b-why>
  <b-vs-grid>
    <h></h>
    <h>QUnit (motor de pruebas)</h>
    <h>Quint (lenguaje de modelado)</h>
    <c>**Qué es**</c>
    <c>un motor para pruebas de código JavaScript, como Jest y Vitest</c>
    <c>un lenguaje para reglas, el propio programa prueba todos los movimientos posibles</c>
    <c>**Qué comprueba**</c>
    <c>que una función terminada devuelve la respuesta correcta para entradas dadas</c>
    <c>que el sistema descrito nunca llega a un estado prohibido, ni siquiera en combinaciones que nadie pensó</c>
    <c>**Qué necesita**</c>
    <c>código escrito</c>
    <c>solo una descripción de las reglas, el código puede no existir</c>
    <c>**Ejemplo**</c>
    <c>una prueba de que una función que interpreta fechas devuelve la fecha correcta</c>
    <c>un modelo que descubrió que un fallo a mitad de una grabación deja una grabación sin rastro</c>
    <c>**Qué es difícil**</c>
    <c>idear las entradas</c>
    <c>formular las reglas para que reflejen la realidad</c>
  </b-vs-grid>
  <b-why align="left">La tabla se lee mejor fila por fila. La fila «Qué comprueba» muestra la diferencia principal: una prueba responde «¿funciona esta función correctamente con estos datos?», un modelo responde «¿es posible siquiera una situación que las reglas prohíben?». Una prueba está limitada por lo que se te ocurrió. Un modelo está limitado por lo que metiste en él.</b-why>
  <b-finding>
    <ex>QUnit comprueba código que ya está escrito, mientras que Quint comprueba una intención que quizá todavía no está en el código.</ex>
    <gen>Por eso QUnit, Jest y Vitest no sustituyen a Quint, ni al revés: responden a preguntas distintas.</gen>
    <do>Si alguien dice «es lo mismo que Jest», pregunta qué se quiere decir exactamente: comprobar una función o comprobar reglas.</do>
  </b-finding>
</b-chapter>

<b-chapter id="tests" icon="flask" title="Quint o Jest y Vitest: qué comprueba una prueba y qué comprueba un modelo">
  <b-art names="quint-vs-tests-and-tla/when" wide/>
    <b-why align="left">Un motor de pruebas encuentra un error en las entradas que se te ocurrieron. Si no pensaste en dos administradores a la vez, no se escribe ninguna prueba sobre ellos y el error se queda. Un modelo funciona de otra manera: construye por sí mismo combinaciones de pasos, también las que nadie pensó, y muestra la primera en que se rompió una regla.</b-why>
  <b-vs-grid>
    <h></h>
    <h>Motor de pruebas</h>
    <h>Quint</h>
    <c>**Qué encuentra**</c>
    <c>un error en las entradas que se te ocurrieron</c>
    <c>un error en una combinación de pasos que nadie pensó</c>
    <c>**Cuándo hace falta**</c>
    <c>el código ya existe</c>
    <c>el código aún no está escrito o no existe en absoluto</c>
    <c>**Punto débil**</c>
    <c>no ve lo que no se te ocurrió</c>
    <c>un modelo puede no coincidir con la realidad, por eso se comprueba contra hechos confirmados</c>
  </b-vs-grid>
  <b-why align="left">Lo que una prueba detecta bien: un error en la propia función, por ejemplo un cálculo de descuento incorrecto o una fecha mal interpretada. Aquí la entrada se conoce de antemano y la prueba muestra rápido qué se rompió. Lo que una prueba no detecta: las [condiciones de carrera](/materials/glossary/race-condition/) y otros errores que aparecen solo en un cierto orden de sucesos. En ejemplos prácticos así se encontraron el inicio y cierre de sesión de un administrador que se solapaban en el tiempo y un fallo en medio de la grabación de una reunión. Ninguna de las dos acciones es errónea por sí sola, así que una prueba para cada una pasa.</b-why>
  <b-why align="left">El punto débil de Quint es que comprueba un modelo, no el código. Si el modelo se describe con imprecisión, demuestra algo sobre un sistema imaginario. Por eso el modelo se contrasta con casos reales ya confirmados y se conserva en él un par «tal como es y tal como se requiere». Más sobre esto en el [artículo sobre los modelos](/blog/quint-models-find-races/).</b-why>
  <b-finding>
    <ex>Una prueba y un modelo responden a preguntas distintas, así que «cuál es mejor» es la pregunta equivocada.</ex>
    <gen>Para comprobar «pueden dos personas a la vez romper el orden de las acciones» un motor de pruebas es casi inútil, y para comprobar «la fecha se interpreta bien» un modelo es excesivo.</gen>
    <do>Para cada regla que quieras comprobar, anota de qué trata: datos de entrada u orden de las acciones.</do>
  </b-finding>
</b-chapter>

<b-chapter id="tla" icon="scales" title="En qué se diferencia Quint de TLA+ y Alloy">
  <b-art names="quint-vs-tests-and-tla/notation" wide/>
    <b-why align="left">TLA+ y Alloy son lenguajes formales del mismo tipo: en ellos también describes reglas y buscas sus violaciones. Son más antiguos que Quint y están mejor cubiertos en libros. Pero la notación de TLA+ es matemática, y a un recién llegado le lleva tiempo leerla. Quint se diseñó como una notación más accesible para la misma tarea: parece código normal y los ingenieros sin formación matemática lo leen. Una comparación detallada de los tres lenguajes está en el artículo [TLA+ vs Alloy vs Quint](/blog/tla-alloy-quint-compare/).</b-why>
  <b-art names="quint-vs-tests-and-tla/engine" wide/>
  <b-why align="left">Qué significa «los mismos programas». Quint puede comprobarse con dos programas: TLC y Apalache<b-proof href="https://quint-lang.org/docs/model-checkers" quote="Quint specifications can be verified by two model checkers: TLC and Apalache"/>. TLC es el primer programa de comprobación de TLA+: recorre los estados uno por uno<b-proof href="https://quint-lang.org/docs/model-checkers" quote="TLC is an explicit-state model checker"/>, así que para Quint necesita el modelo traducido a TLA+<b-proof href="https://quint-lang.org/docs/model-checkers" quote="can be used for Quint by transpiling Quint specs into TLA+"/>. Esa búsqueda es predecible, pero el mundo debe ser pequeño.</b-why>
  <b-why align="left">[Apalache](/materials/glossary/apalache/) está integrado en Quint<b-proof href="https://quint-lang.org/docs/model-checkers" quote="Apalache is a symbolic model checker that is integrated with Quint tooling"/>: traduce el modelo a condiciones y se las pasa al solucionador [Z3](/materials/glossary/z3/). Solo puede comprobar cadenas hasta una longitud dada<b-proof href="https://quint-lang.org/docs/model-checkers" quote="Apalache cannot check an arbitrary number of steps"/>, así que su «ok» significa «sin violaciones dentro de esa longitud». TLA+ se comprueba con los mismos dos programas, mientras que Alloy tiene su propio analizador. Además de la comprobación, Quint tiene una simulación aleatoria rápida: busca violaciones por muestreo y no demuestra que no las haya.</b-why>
    <b-vs-grid>
    <h></h>
    <h>Quint</h>
    <h>TLA+ / Alloy</h>
    <c>**Notación**</c>
    <c>parece código normal, los ingenieros lo leen</c>
    <c>notación matemática, un escalón de entrada más alto</c>
    <c>**Qué lo comprueba**</c>
    <c>TLC o Apalache</c>
    <c>TLA+: los mismos TLC y Apalache; Alloy: su propio analizador</c>
    <c>**Madurez**</c>
    <c>más joven</c>
    <c>más antiguo, más ejemplos</c>
  </b-vs-grid>
  <b-why align="left">Cada uno de los tres lenguajes se apoya en su propia idea. [TLA+](/materials/glossary/tla-plus/) se construye sobre la idea de Leslie Lamport de que la forma más precisa de describir un sistema son las matemáticas sencillas<b-proof href="https://lamport.azurewebsites.net/tla/tla.html" quote="the best way to describe things precisely is with simple mathematics"/>. [Alloy](/materials/glossary/alloy/) describe estructuras que evolucionan y un programa para explorarlas<b-proof href="https://alloytools.org/about.html" quote="a language for describing evolving structures and a tool for exploring them"/>. [Quint](/materials/glossary/quint/) plantea la misma tarea en una notación que los ingenieros entienden: la descripción se puede ejecutar, simular y comprobar antes de que el código salga<b-proof href="https://quint-lang.org/" quote="Write specs you can run, simulate, and verify before shipping code."/>.</b-why>
  <b-art names="quint-vs-tests-and-tla/maturity" wide/>
  <b-why align="left">La madurez importa cuando hacen falta demostraciones pesadas: sistemas grandes, garantías estrictas para protocolos distribuidos. La primera versión del lenguaje Alloy apareció en 1997<b-proof href="https://en.wikipedia.org/wiki/Alloy_(specification_language)" quote="The first version of the Alloy language appeared in 1997"/>. TLA+ fue creado por Leslie Lamport<b-proof href="https://en.wikipedia.org/wiki/TLA%2B" quote="TLA+ is a formal specification language developed by Leslie Lamport"/>, y según Wikipedia el lenguaje data de 1999. El verificador Apalache se inició en 2015, y el repositorio de Quint se creó en 2021, según GitHub. Así, TLA+ tiene unos 27 años de historia y Quint unos cinco.</b-why>
  <b-why align="left">En esos años TLA+ reunió libros, cursos y descripciones de sistemas reales, mientras que Quint tiene menos. Pero el lenguaje avanza rápido: se subieron cambios al repositorio del proyecto el día anterior a la fecha de este artículo<b-proof href="https://github.com/informalsystems/quint" quote="executable specification language with delightful tooling"/>. Para reglas de producto como «una grabación privada nunca llega al almacenamiento compartido» la profundidad de la demostración hace falta con menos frecuencia, y la legibilidad importa más.</b-why>
  <b-finding>
    <ex>Quint da la misma tarea y la misma clase de comprobaciones en una notación más legible, al precio de una menor madurez.</ex>
    <gen>Para las reglas de producto es un intercambio razonable, porque las reglas las leen y discuten personas sin formación matemática, y los modelos son más fáciles de escribir junto con un agente de IA.</gen>
    <do>Si necesitas demostraciones pesadas, pasa el modelo a TLA+: las ideas y las reglas siguen siendo las mismas.</do>
  </b-finding>
</b-chapter>

<b-chapter id="choose" icon="target" title="Qué elegir: Quint, pruebas o TLA+">
  <b-art names="quint-vs-tests-and-tla/choose" wide/>
  <b-rules cols="3">
    <rule icon="flask" t="Una función terminada">Comprobar que una función devuelve la respuesta correcta para entradas dadas: un motor de pruebas, QUnit, Jest o Vitest</rule>
    <rule icon="workflow" t="Orden de acciones">Encontrar una combinación de pasos en que se rompe una regla de producto, aunque el código aún no exista: Quint</rule>
    <rule icon="scales" t="Demostraciones pesadas">Garantías estrictas para un sistema distribuido grande: TLA+, con más experiencia y ejemplos</rule>
  </b-rules>
  <b-why align="left">La elección la marca la pregunta, no un programa favorito. Si la pregunta es «¿funciona bien esta función?», toma una prueba. Si la pregunta es «¿puede romperse una regla en alguna secuencia de sucesos?», toma un modelo. Si necesitas garantías al nivel de un protocolo distribuido, toma TLA+ y reserva tiempo para aprenderlo.</b-why>
  <b-finding>
    <ex>Tres opciones responden a tres preguntas distintas, y una no sustituye a otra.</ex>
    <gen>Para la lógica de producto con agentes y varios participantes, lo más habitual es necesitar tanto pruebas como Quint.</gen>
    <do>Anota tres preguntas sobre tu producto y pon a cada una la opción adecuada con la tabla de arriba.</do>
  </b-finding>
</b-chapter>

<b-chapter id="together" icon="link" title="Cómo funcionan juntos">
  <b-why align="left">En la práctica, pruebas y modelos van de la mano. Una prueba protege una función concreta de romperse con los cambios. Un modelo protege una regla que cruza varias funciones y depende del orden de los sucesos. Cuando un modelo encuentra una cadena de pasos, de ella sale una prueba de regresión corta: falla con el código antiguo y pasa con el corregido.</b-why>
  <b-why align="left">Así el modelo entrega a las pruebas lo que encontró, y las pruebas lo sostienen en el código. Un relato detallado de los hallazgos, del par «tal como es y tal como se requiere» y de la comprobación de las comprobaciones está en el [artículo principal sobre Quint](/blog/quint-models-find-races/), y los límites de contexto para los que se escriben los modelos se tratan en el artículo sobre [agentes por contexto](/blog/agents-per-bounded-context/).</b-why>
  <b-finding>
    <ex>Un modelo encuentra una cadena de pasos, y una prueba la fija en el código para que el error no vuelva.</ex>
    <gen>El resultado es un par: el modelo busca lo desconocido, la prueba guarda lo encontrado.</gen>
    <do>Convierte la próxima cadena de pasos que encuentres en una prueba corta y ponla junto a las demás.</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="FAQ">
  <b-faq-cards>
    <q t="¿En qué se diferencia Quint de QUnit?">QUnit ejecuta pruebas de código JavaScript ya terminado, mientras que Quint describe las reglas de un sistema y prueba por sí mismo los órdenes de acciones. Los nombres se parecen, pero son programas de tipos distintos.</q>
    <q t="¿En qué se diferencia Quint de TLA+?">Describen lo mismo y difieren en la notación: Quint parece código normal, TLA+ usa fórmulas. Una comparación detallada de los tres lenguajes está en el artículo «TLA+ vs Quint vs Alloy».</q>
    <q t="¿Qué elegir: Quint, Jest o TLA+?">Si la pregunta es si una función funciona bien, toma una prueba. Si es si una regla puede romperse en alguna secuencia de sucesos, toma Quint; para demostraciones pesadas sobre un sistema distribuido, se toma TLA+.</q>
    <q t="¿Se puede usar Quint junto con pruebas?">Sí, se complementan. Un modelo encuentra la cadena de pasos en que se rompe una regla, y una prueba corta la fija en el código para que el error no vuelva.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Más lecturas">
  <b-links>
    <item href="/blog/jest-vs-vitest-vs-qunit/" k="Comparación" t="Vitest vs Jest, y cuándo basta con QUnit">Qué framework de pruebas de JavaScript elegir</item>
    <item href="/blog/tla-alloy-quint-compare/" k="Comparación" t="TLA+ vs Alloy vs Quint">En qué se diferencian los lenguajes de especificación formal</item>
    <item href="/blog/quint-models-find-races/" k="Modelos" t="Cómo encontrar una condición de carrera: un modelo de Quint">Modelos formales en Quint: hallazgos, pares de modelos, comprobación de las comprobaciones</item>
    <item href="/blog/agents-per-bounded-context/" k="Agentes" t="Cuántos agentes de IA hacen falta">Un agente por contexto delimitado</item>
  </b-links>
</b-chapter>
<b-footer>Datos a 25 de octubre de 2026, de la documentación de Quint, TLA+ y Alloy. La elección depende del equipo y de la tarea.</b-footer>
</b-post>
