---
title: Quint vs TLA+: diferencias y cuál elegir
date: 2026-11-15
updated: 2026-11-17
description: Quint o TLA+: comparación en siete puntos (notación, tipos, pruebas, verificación, madurez, aprendizaje), cómo elegir y cómo trasladar las especificaciones.
tags: IA, especificaciones, Quint, TLA+, Quint vs TLA+, TLA+ vs Quint, TLAPS, Apalache, TLC, PlusCal, verificación formal, verificación de modelos
category: specs
layout: wide
mentions: Quint, TLA+, TLAPS, Apalache, TLC, PlusCal, model checking, formal specification, Leslie Lamport, Quint vs TLA+, TLA+ vs Quint
toc: same=Lo común | table=Tabla | choose=Qué elegir | migrate=Traslado | practice=Práctica | faq=Preguntas | next=Seguir leyendo
---
Quint y TLA+ describen el mismo comportamiento de un sistema y los comprueban los mismos programas, TLC y Apalache. Difieren en notación, tipos y demostraciones: Quint se escribe como código con tipos y se comprueba en el editor; TLA+ usa fórmulas sin tipos y tiene el sistema TLAPS. Sin formación matemática, Quint; para demostraciones estrictas, TLA+.

<b-post series="harness">

<b-chapter id="same" icon="link" title="Qué tienen en común Quint y TLA+">
  <b-why align="left">Ambos lenguajes se apoyan en una misma lógica, la Lógica Temporal de Acciones (TLA, por sus siglas en inglés). Las preguntas frecuentes de Quint lo dicen sin rodeos: Quint se basa en la misma lógica, por lo que se parece mucho a TLA+ en lo que puede verificar y en dónde ayuda<b-proof href="https://quint.sh/faq" quote="Quint is based on TLA+ and uses the same underlying logic"/>. El resultado es el mismo en los dos: se describen los estados de un sistema y los pasos permitidos, se formulan las reglas que deben cumplirse siempre, y un programa busca una cadena de pasos en la que una regla se rompe. Eso es la [verificación de modelos](/materials/glossary/model-checking/).</b-why>
  <b-why align="left">[TLA+](/materials/glossary/tla-plus/) lo creó Leslie Lamport, y [Quint](/materials/glossary/quint/) se diseñó como una sintaxis distinta para la misma lógica. El vínculo funciona en ambos sentidos: Quint se limita a una parte de TLA+, de modo que una especificación de Quint puede traducirse automáticamente a una especificación de TLA+<b-proof href="https://quint.sh/faq" quote="a Quint specification can be automatically translated to a TLA+ specification"/>. Desde la línea de comandos de Quint se ejecutan los mismos programas de verificación, [TLC](/materials/glossary/tlc/) y [Apalache](/materials/glossary/apalache/). Por eso la elección entre los lenguajes apenas cambia lo que se puede encontrar. Cambia lo cómodo que resulta escribir, leer y demostrar.</b-why>
  <b-finding>
    <ex>Quint y TLA+ encuentran el mismo tipo de error: una regla rota en algún punto de una cadena de pasos.</ex>
    <gen>La elección depende de la notación, los tipos, las demostraciones y la comodidad diaria, mientras que las capacidades de verificación son comunes.</gen>
    <do>Anote qué pesa más para usted: la legibilidad para todo el equipo o una demostración estricta. El resto de la elección se sigue de ahí.</do>
  </b-finding>
</b-chapter>

<b-chapter id="table" icon="scales" title="Quint vs TLA+: tabla de siete diferencias">
<b-table id="quint-tla-plus">

| | TLA+ | Quint |
|---|---|---|
| **Notación** | matemática, al estilo de LaTeX | parecida al código, en el espíritu de TypeScript y los lenguajes funcionales |
| **Tipos** | ninguno: el lenguaje carece de tipos a propósito | comprobador de tipos y efectos, la mayoría de los tipos se infiere |
| **Demostraciones** | tiene el sistema de demostración TLAPS | no tiene |
| **Verificación de modelos** | TLC y Apalache | los mismos TLC y Apalache desde la línea de comandos de Quint, más su propio simulador aleatorio |
| **Ejecución como pruebas** | sin equivalente directo | una «ejecución» (run, una cadena concreta de pasos) forma parte del lenguaje y puede servir de prueba |
| **Madurez y ecosistema** | se usa desde hace más tiempo, con más libros, ejemplos y programas alrededor | más joven, pero el soporte del editor, el REPL y el simulador se instalan con un solo comando de npm |
| **Curva de aprendizaje** | empinada para mucha gente | probablemente más suave para quien se inicia en la especificación formal |

</b-table>
  <b-why align="left">**Notación.** En TLA+ una sola acción suele mezclar la elección no determinista, las condiciones de aplicabilidad, la lógica de negocio y las actualizaciones del estado, así que la notación queda lejos del código habitual. En Quint la lógica de negocio se escribe como funciones puras, por separado de cómo su aplicación cambia el estado<b-proof href="https://quint.sh/faq" quote="Quint uses programming-style syntax inspired by TypeScript and functional languages."/>. Para la revisión es una diferencia notable: quien lee TypeScript puede leer una regla.</b-why>
  <b-why align="left">**Tipos.** TLA+ carece de tipos a propósito<b-proof href="https://quint.sh/faq" quote="TLA+ is purposely untyped so that designers can focus on algorithmic concepts."/>: un algoritmo de consenso se ve igual con enteros que con cadenas de texto. El precio es que un error como una cadena dentro de un conjunto de enteros a veces solo se ve en un contraejemplo del comprobador. Quint comprueba tipos y efectos, así que una parte de los errores aparece en el editor antes de ejecutar nada. Rara vez hay que escribir los tipos, porque la mayoría se infiere.</b-why>
  <b-why align="left">**Demostraciones y verificación.** Entre los programas principales de TLA+, la página de Lamport menciona el verificador de modelos TLC y el sistema de demostración TLAPS<b-proof href="https://lamport.azurewebsites.net/tla/tla.html" quote="The primary ones are the TLC model checker and the TLAPS proof system."/>. Quint no tiene un sistema de demostración así y delega la verificación en dos programas. TLC enumera los estados uno por uno<b-proof href="https://quint-lang.org/docs/model-checkers" quote="TLC is an explicit-state model checker"/>. Apalache convierte el modelo en restricciones para el solucionador [Z3](/materials/glossary/z3/)<b-proof href="https://apalache-mc.org/" quote="Apalache translates TLA+ into the logic supported by SMT solvers such as Microsoft Z3."/> y examina cadenas de hasta una longitud fijada<b-proof href="https://quint-lang.org/docs/model-checkers" quote="Apalache cannot check an arbitrary number of steps"/>. Su «OK» significa, por tanto: no hay violación dentro de esa longitud.</b-why>
  <b-why align="left">**Ejecuciones como pruebas.** En Quint una ejecución (run) es un objeto del lenguaje. Es una cadena concreta de pasos y puede escribirse como prueba o como patrón de prueba. Para TLA+ las preguntas frecuentes dicen claramente que no hay equivalente directo<b-proof href="https://quint.sh/faq" quote="TLA+ has no direct equivalent."/>. Quint tiene además una simulación aleatoria rápida: muestrea en busca de violaciones y no demuestra que no existan. Con Quint Connect pueden generarse pruebas a partir del modelo para comprobar el código real en la integración continua.</b-why>
  <b-why align="left">**Madurez y curva de aprendizaje.** El radar de Thoughtworks ve en Quint legibilidad y buena experiencia de desarrollo, pero lo coloca en el anillo «Assess» (conviene explorarlo) y cita la madurez de TLA+ como argumento de peso. Según las preguntas frecuentes, Quint ya se usa en los flujos de trabajo de varios equipos de ingeniería, y el lenguaje, la línea de comandos y la extensión de VS Code se describen como estables. Para quien se inicia en la especificación formal, Quint es probablemente el camino más rápido<b-proof href="https://quint.sh/faq" quote="If you are new to formal specification, Quint is likely the faster path"/>. Quien ya escribe TLA+ encontrará Quint familiar.</b-why>
  <b-finding>
    <ex>De las siete diferencias, dos favorecen a TLA+ (demostraciones y madurez), cuatro favorecen a Quint (notación, tipos, pruebas, curva de aprendizaje) y la verificación es la misma.</ex>
    <gen>Si no hacen falta demostraciones, la balanza se inclina hacia Quint; si hacen falta, solo queda TLA+.</gen>
    <do>Antes de elegir, responda a una pregunta: ¿necesitará una demostración estricta que un programa verifique, y no una búsqueda dentro de límites fijados?</do>
  </b-finding>
</b-chapter>

<b-chapter id="choose" icon="target" title="Cuándo TLA+, cuándo Quint">
  <b-rules cols="2">
    <rule icon="shield-check" t="TLA+: hacen falta demostraciones">Garantías estrictas para un sistema distribuido complejo: TLAPS existe para TLA+ y no para Quint</rule>
    <rule icon="book" t="TLA+: especificaciones existentes">Los libros, cursos y guías en TLA+ siguen siendo válidos, y no hay motivo para reescribirlos</rule>
    <rule icon="code" t="Quint: todo el equipo lo lee">La notación parecida al código es más fácil de revisar, sobre todo cuando un agente escribe la especificación</rule>
    <rule icon="flask" t="Quint: pruebas a partir del modelo">Las ejecuciones del modelo se convierten en pruebas de la implementación</rule>
    <rule icon="zap" t="Quint: inicio rápido">El REPL, el simulador y la verificación de modelos se instalan con un solo comando de npm, y el editor VS Code resalta los errores de tipos</rule>
    <rule icon="users" t="Quint: equipo sin matemáticas">Las reglas de producto como «una nota privada nunca llega al almacenamiento compartido» se leen sin fórmulas</rule>
  </b-rules>
  <b-why align="left">Esto coincide con la valoración del Thoughtworks Technology Radar de noviembre de 2026. Coloca Quint en el anillo «Assess» y califica la elección entre Quint y TLA+ de muy reñida<b-proof href="https://www.thoughtworks.com/radar/languages-and-frameworks/quint" quote="Our teams have found the choice between Quint and TLA+ a close call"/>: las herramientas para desarrolladores de Quint por un lado, la madurez de TLA+ por otro. El radar describe las diferencias de Quint como legibilidad y experiencia de desarrollo, una sintaxis parecida a TypeScript que es más fácil de revisar cuando un agente escribe la especificación, y un editor, un REPL y un simulador.</b-why>
  <b-why align="left">Una regla sencilla para los casos dudosos: para reglas de producto a lo largo del tiempo y un equipo sin formación matemática, empiece por Quint. Para un protocolo de consenso entre nodos donde importan las garantías estrictas, tome TLA+ y reserve tiempo para aprenderlo. Las ideas pasan de un lenguaje a otro en ambas direcciones, porque las reglas siguen siendo las mismas.</b-why>
</b-chapter>

<b-chapter id="migrate" icon="swap" title="Cómo pasar de TLA+ a Quint">
  <b-why align="left">Las preguntas frecuentes de Quint no incluyen una guía de migración paso a paso, así que esta sección se construye solo con lo que dicen. La afirmación principal: Quint se basa en TLA+, por lo que la mayoría de las especificaciones se traducen directamente<b-proof href="https://quint.sh/faq" quote="most TLA+ specs can be directly translated into the Quint syntax"/>. Las preguntas frecuentes no mencionan la traducción automática en el otro sentido, de TLA+ a Quint: solo dicen que una especificación de Quint puede traducirse a TLA+ automáticamente.</b-why>
  <b-why align="left">**1. Decida si necesita TLAPS.** Si necesita demostraciones para esta especificación, quédese en TLA+: Quint no tiene un sistema así.</b-why>
  <b-why align="left">**2. Traslade la notación.** Reescriba la especificación con la sintaxis de Quint uno a uno. La mayor parte pasa directamente, y algunas formas de recursión necesitarán un rodeo, como señalan las preguntas frecuentes.</b-why>
  <b-why align="left">**3. Reelabórela al estilo Quint.** Los autores aconsejan separar la capa de acciones de la capa de funciones<b-proof href="https://quint.sh/faq" quote="separating the action layer from the functional layer"/>. Las reglas de la lógica de negocio pasan a funciones puras, y las acciones solo las aplican al estado.</b-why>
  <b-why align="left">**4. Compruebe con los mismos programas.** Lance la verificación desde la línea de comandos de Quint. Apalache necesita un límite para la longitud de la cadena, y TLC necesita un mundo pequeño. Conviene comparar el resultado con la ejecución anterior en TLA+: las violaciones que se encontraron allí deben encontrarse aquí también.</b-why>
  <b-prompt>
    A continuación hay una especificación en TLA+ (pegue el texto).
    Tradúzcala a Quint literalmente y ejecute la comprobación.
    Después separe las reglas de las acciones: pase la lógica de negocio a funciones puras.
    Muestre dónde la especificación usa recursión y qué hubo que cambiar por ello.
  </b-prompt>
  <b-why align="left">Lo que las fuentes no confirman y esta página no promete: un conversor listo de TLA+ a Quint, plazos de migración o el número de especificaciones que se traducen sin cambios. Las preguntas frecuentes dicen «la mayoría», sin cifra.</b-why>
</b-chapter>

<b-chapter id="practice" icon="flask" title="Un ejemplo de la práctica de este sitio">
  <b-why align="left">Este repositorio no contiene archivos de modelos: el artículo describe modelos de otro proyecto, así que aquí no hay un ejemplo de código honesto en dos lenguajes. La práctica es esta: los modelos de Quint comprueban reglas de producto a lo largo del tiempo, y las propias comprobaciones se prueban con copias del modelo rotas a propósito. Una regla que el código ya cumple debe fallar en una copia con un defecto. Detalles, ejemplos y diagramas: [Cómo encontrar una condición de carrera: un modelo en Quint](/blog/quint-models-find-races/), sección sobre la prueba de las comprobaciones.</b-why>
  <b-finding>
    <ex>Para las reglas de producto con un agente, el sitio recorre modelos de Quint: la notación se lee sin fórmulas, y los mismos TLC y Apalache hacen la verificación.</ex>
    <gen>Si resultan necesarias demostraciones pesadas, las reglas pasan a TLA+ sin replantear las ideas.</gen>
    <do>Tome un error corregido hace poco y causado por el orden de los eventos, y descríbalo en Quint en una sola página.</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Preguntas frecuentes">
  <b-faq-cards>
    <q t="¿Debo pasar de TLA+ a Quint?">Si necesita demostraciones para la especificación, no: TLAPS existe para TLA+ y no para Quint. Si necesita notación legible, comprobación de tipos en el editor y pruebas a partir del modelo, sí: la mayoría de las especificaciones de TLA+ se traducen directamente a Quint. Las preguntas frecuentes de Quint no incluyen una guía de migración paso a paso.</q>
    <q t="¿En qué se diferencia Quint de PlusCal?">PlusCal se sitúa encima de TLA+ y se compila a él<b-proof href="https://quint.sh/faq" quote="PlusCal is a language on top of TLA+ that is precompiled into TLA+."/>. Añade bucles y asignaciones a un lenguaje declarativo. Quint sigue siendo declarativo: describe transiciones entre estados, y no una secuencia de pasos. Quint usa TLA+ como lenguaje intermedio solo para la verificación de modelos, y su REPL, su simulador y sus funciones de pruebas son propios<b-proof href="https://quint.sh/faq" quote="Quint does not use TLA+ as an intermediate language (except for model checking)."/>.</q>
    <q t="¿Hacen falta tipos en una especificación formal?">No necesariamente: TLA+ carece de tipos a propósito para que quienes diseñan se concentren en la idea del algoritmo. El precio es que una parte de los errores solo aflora en un contraejemplo del comprobador. Quint comprueba tipos y efectos y muestra una parte de los errores en el editor antes de ejecutar nada. Rara vez hay que escribir los tipos, ya que la mayoría se infiere.</q>
    <q t="¿Qué se aprende más rápido, Quint o TLA+?">Para quien se inicia en la especificación formal, Quint es probablemente más rápido: la notación se parece a TypeScript y el editor da respuesta inmediata. TLA+ tiene una curva de aprendizaje empinada para mucha gente. Si TLA+ ya resulta familiar, Quint se sentirá familiar y el paso lleva poco tiempo.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Seguir leyendo">
  <b-links>
    <item href="/blog/tla-alloy-quint-compare/" k="Comparación" t="TLA+, Quint o Alloy: qué lenguaje elegir">Los tres lenguajes lado a lado, y cuándo conviene Alloy</item>
    <item href="/blog/quint-vs-tests-and-tla/" k="Comparación" t="Verificación de modelos vs pruebas: Quint, QUnit, TLA+">En qué se diferencia un modelo de una prueba</item>
    <item href="/blog/quint-models-find-races/" k="Modelos" t="Cómo encontrar una condición de carrera: un modelo en Quint">Modelos formales en Quint: hallazgos y prueba de las comprobaciones</item>
    <item href="/materials/glossary/tla-plus/" k="Término" t="TLA+">Qué significa TLA+ en el glosario</item>
    <item href="/materials/glossary/quint/" k="Término" t="Quint">Qué significa Quint en el glosario</item>
  </b-links>
</b-chapter>
<b-footer>Datos: preguntas frecuentes de Quint (quint.sh), documentación del verificador de modelos de Quint, página de TLA+ de Leslie Lamport, sitio de Apalache, Thoughtworks Technology Radar (noviembre de 2026), a 15 de noviembre de 2026. La elección depende de la tarea; aquí se describen los rasgos generales.</b-footer>
</b-post>
