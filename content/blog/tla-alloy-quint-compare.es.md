---
title: Diferencia entre TLA+, Quint y Alloy: qué lenguaje de verificación formal elegir
date: 2026-10-25
updated: 2026-11-08
description: TLA+ frente a Alloy frente a Quint: qué describe cada lenguaje, cómo se escribe, qué lo comprueba y a quién le conviene, del orden de los sucesos a las relaciones entre datos.
tags: IA, specs, TLA+, Alloy, Quint, verificación formal, verificación de modelos, TLA+ vs Alloy, Quint vs TLA+, Alloy Analyzer, TLC
category: specs
layout: wide
mentions: TLA+, Alloy, Quint, Apalache, TLC, Alloy Analyzer, model checking, formal specification, formal methods, TLA+ vs Alloy vs Quint, Leslie Lamport
toc: idea=Una tarea | table=Resumen | tla-alloy=TLA+ y Alloy | tla-quint=TLA+ y Quint | alloy-quint=Alloy y Quint | choose=Qué elegir | faq=FAQ | next=Más lecturas
---

Entre los lenguajes de verificación formal, TLA+ y Quint describen el comportamiento de un sistema paso a paso y difieren en la notación: Quint se lee como código normal, TLA+ como fórmulas. Alloy describe objetos y los vínculos entre ellos. Usa Quint para reglas de producto a lo largo del tiempo, TLA+ para demostraciones estrictas y Alloy para la estructura de los datos y los derechos de acceso.

<b-post series="harness">
<b-art names="tla-alloy-quint-compare/trio" wide/>

<b-chapter id="idea" icon="workflow" title="En qué se diferencian TLA+, Alloy y Quint: una tarea, tres lenguajes">
  <b-why align="left">Los tres lenguajes comparten una idea: las reglas de un sistema se escriben aparte del código, y un programa busca por sí mismo una violación en ellas. Si la hay, muestra cómo llegar a ella. Es la [verificación de modelos](/materials/glossary/model-checking/), y cada lenguaje tiene su propia notación y su propio programa de comprobación. [TLA+](/materials/glossary/tla-plus/) fue creado por Leslie Lamport para describir sistemas concurrentes y distribuidos. [Alloy](/materials/glossary/alloy/) se creó en el Software Design Group del MIT. [Quint](/materials/glossary/quint/) se diseñó como una alternativa moderna a TLA+ para ingenieros.</b-why>
  <b-finding>
    <ex>TLA+, Alloy y Quint resuelven una tarea: describir reglas y encontrar la cadena en que se rompen.</ex>
    <gen>Las diferencias están en qué se describe exactamente, cómo se escribe y qué lo comprueba.</gen>
    <do>Anota tres reglas de tu producto y apunta de qué trata cada una: el orden de los sucesos o los vínculos entre objetos.</do>
  </b-finding>
</b-chapter>

<b-chapter id="table" icon="scales" title="Resumen: TLA+, Alloy y Quint lado a lado">
  <b-art names="tla-alloy-quint-compare/kinds" wide/>
  <b-why align="left">La diferencia principal es qué describen exactamente. TLA+ y Quint describen el comportamiento de un sistema paso a paso: carrito, pago, pedido, y qué puede salir mal entre pasos. Así se encuentran las [condiciones de carrera](/materials/glossary/race-condition/) y los datos perdidos. Alloy describe estructuras y vínculos: quién depende de quién, quién tiene qué derechos. Busca un ejemplo pequeño en que se rompe una regla, por ejemplo un empleado con dos jefes. Las demás diferencias se derivan de esto.</b-why>
<b-table id="tla3">

| | TLA+ | Alloy | Quint |
|---|---|---|---|
| **Qué describe** | el comportamiento de un sistema paso a paso, sobre todo concurrente y distribuido | objetos, los vínculos entre ellos y cómo cambian | comportamiento paso a paso, como en TLA+ |
| **Notación** | matemática | lógica relacional | parece código normal |
| **Qué lo comprueba** | TLC o Apalache | el Alloy Analyzer, que busca estructuras para las restricciones | TLC o Apalache, con una simulación aleatoria rápida |
| **Qué muestra** | una cadena de pasos hasta la violación | un ejemplo de estructura en que se rompe la regla | una cadena de pasos hasta la violación |
| **Madurez** | desde 1999, más libros y ejemplos | desde 1997, con su propia comunidad | desde 2021, más joven |
| **A quién le conviene** | a quien necesita garantías estrictas | a quien diseña datos y derechos de acceso | a equipos de producto sin formación matemática |

</b-table>
  <b-why align="left">Cómo leer la tabla fila por fila. «Qué describe» es lo más importante: la elección depende de ello. «Notación» marca el escalón de entrada: Quint tiene el más bajo, con TLA+ y Alloy hay que acostumbrarse a las fórmulas. «Qué lo comprueba» recuerda que los lenguajes se apoyan en programas de comprobación distintos: [Apalache](/materials/glossary/apalache/) y [TLC](/materials/glossary/tlc/) sirven tanto para TLA+ como para Quint, mientras que Alloy tiene su propio analizador. «Qué muestra» explica qué se obtiene a la salida: una cadena de pasos o un ejemplo de estructura. «Madurez» sugiere dónde hay más ejemplos y más gente a quien preguntar.</b-why>
  <b-why align="left">La frontera entre los lenguajes no es absoluta. En la versión seis, Alloy añadió estado mutable y lógica temporal, es decir, aprendió a describir también pasos en el tiempo. Y Quint y TLA+ se pueden usar para estructuras de datos. Así que la elección la marca qué se rompe más a menudo en tu sistema: el orden de los sucesos o la estructura de los vínculos.</b-why>
  <b-finding>
    <ex>Si el peligro está en el orden de los sucesos, hace falta TLA+ o Quint, y si está en la estructura de los vínculos, hace falta Alloy.</ex>
    <gen>Los lenguajes no compiten directamente: el mismo sistema se puede describir tanto en el tiempo como por estructura.</gen>
    <do>Para cada regla, anota qué se rompe: el orden de las acciones o los vínculos entre objetos.</do>
  </b-finding>
</b-chapter>

<b-chapter id="tla-alloy" icon="scales" title="En qué se diferencia TLA+ de Alloy">
  <b-art names="tla-alloy-quint-compare/tla-vs-alloy" wide/>
<b-table id="tla-alloy">

| | TLA+ | Alloy |
|---|---|---|
| **Cuándo elegirlo** | importa el orden de los sucesos | importa la estructura de los datos y los derechos |

</b-table>
  <b-why align="left">TLA+ fue creado por Leslie Lamport y se apoya en la idea de que la mejor manera de describir las cosas con precisión son las matemáticas sencillas<b-proof href="https://lamport.azurewebsites.net/tla/tla.html" quote="the best way to describe things precisely is with simple mathematics"/>. Busca la cadena de pasos en que se rompe una regla, por ejemplo un pago doble con dos pedidos. Alloy busca un ejemplo de estructura en lugar de una cadena, y comprueba propiedades de un modelo generando contraejemplos<b-proof href="https://alloytools.org/about.html" quote="check properties of the model by generating counterexamples"/>. Elige TLA+ para el orden de los sucesos y Alloy para los vínculos y los derechos de acceso. </b-why>
</b-chapter>

<b-chapter id="tla-quint" icon="code" title="En qué se diferencia TLA+ de Quint">
  <b-art names="tla-alloy-quint-compare/tla-vs-quint" wide/>
<b-table id="tla-quint">

| | TLA+ | Quint |
|---|---|---|
| **Cuándo elegirlo** | hacen falta matemáticas estrictas | hace falta una notación que todo el equipo pueda leer |

</b-table>
  <b-why align="left">Describen lo mismo, y solo difiere la notación. Quint está diseñado como una sintaxis que conviene a los ingenieros<b-proof href="https://apalache-mc.org/" quote="The Quint language provides an engineer-friendly syntax for writing specifications."/>, y los mismos programas comprueban ambas notaciones. TLC recorre los estados uno por uno<b-proof href="https://quint-lang.org/docs/model-checkers" quote="TLC is an explicit-state model checker"/>, mientras que Apalache es simbólico y considera todas las cadenas hasta una longitud dada<b-proof href="https://apalache-mc.org/" quote="Bounded model checking to reason about all executions up to length k"/>.</b-why>
</b-chapter>

<b-chapter id="alloy-quint" icon="search" title="En qué se diferencia Alloy de Quint">
  <b-art names="tla-alloy-quint-compare/alloy-vs-quint" wide/>
<b-table id="alloy-quint">

| | Alloy | Quint |
|---|---|---|
| **Cuándo elegirlo** | se diseñan datos y derechos | se comprueban reglas de producto a lo largo del tiempo |

</b-table>
  <b-why align="left">Alloy tiene su propio programa de comprobación: el Alloy Analyzer toma las restricciones de un modelo y encuentra estructuras que las cumplen<b-proof href="https://alloytools.org/about.html" quote="takes the constraints of a model and finds structures that satisfy them"/>. Quint no tiene un programa propio así, y lo comprueban otros dos programas, TLC y Apalache<b-proof href="https://quint-lang.org/docs/model-checkers" quote="Quint specifications can be verified by two model checkers: TLC and Apalache"/>. Por eso la elección suele reducirse a qué se rompe: los vínculos entre objetos o el orden de los pasos.</b-why>
</b-chapter>

<b-chapter id="choose" icon="target" title="Qué elegir: TLA+, Alloy o Quint">
  <b-art names="tla-alloy-quint-compare/choose" wide/>
  <b-why align="left">Reglas de producto a lo largo del tiempo y un equipo sin matemáticas: elige Quint. Necesitas demostraciones estrictas para un sistema distribuido complejo: elige TLA+ y reserva tiempo para aprenderlo. Necesitas comprobar la estructura de los datos o los derechos de acceso: elige Alloy. Las ideas de una notación se pueden llevar a otra, porque las reglas siguen siendo las mismas. Cómo se relaciona Quint con los motores de pruebas como Jest y QUnit se explica en el artículo [Quint vs QUnit y TLA+](/blog/quint-vs-tests-and-tla/), y los ejemplos de errores que encuentra están en el artículo sobre [condiciones de carrera y datos perdidos](/blog/quint-models-find-races/).</b-why>
  <b-finding>
    <ex>Tres lenguajes cubren tres preguntas distintas, y la elección la marca lo que describes.</ex>
    <gen>Para la lógica de producto con agentes, lo más habitual es que baste Quint, y Alloy resulta útil como añadido para vínculos y derechos.</gen>
    <do>Empieza con una regla y un lenguaje, y añade el segundo cuando te topes con lo que el primero no describe.</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="FAQ">
  <b-faq-cards>
    <q t="¿En qué se diferencia TLA+ de Alloy?">TLA+ describe el comportamiento de un sistema paso a paso y busca la cadena de pasos en que se rompe una regla. Alloy describe objetos y los vínculos entre ellos y busca un ejemplo de estructura en que se viola una regla.</q>
    <q t="Quint o TLA+: ¿cuál elegir?">Quint, si el equipo está más cerca del código normal y necesita comprobar reglas de producto a lo largo del tiempo. TLA+, si hacen falta demostraciones estrictas sobre un sistema distribuido complejo. Describen lo mismo, y los mismos programas comprueban ambas notaciones, TLC y Apalache.</q>
    <q t="¿Cuál debo elegir: TLA+, Alloy o Quint?">Para reglas de producto a lo largo del tiempo y un equipo sin matemáticas, elige Quint; para demostraciones estrictas sobre un sistema distribuido complejo, TLA+; para la estructura de los datos y los derechos de acceso, Alloy.</q>
    <q t="¿Qué comprueba los modelos escritos en TLA+, Alloy y Quint?">TLA+ y Quint los comprueban TLC y Apalache. Alloy tiene su propio analizador, Alloy Analyzer, que toma las restricciones de un modelo y encuentra estructuras que las cumplen.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Más lecturas">
  <b-links>
    <item href="/blog/quint-vs-tests-and-tla/" k="Comparación" t="Verificación de modelos frente a pruebas: Quint, QUnit, TLA+">En qué se diferencia Quint de QUnit, Jest y TLA+</item>
    <item href="/blog/quint-models-find-races/" k="Modelos" t="Cómo encontrar una condición de carrera: un modelo de Quint">Modelos formales en Quint</item>
  </b-links>
</b-chapter>
<b-footer>Datos a 25 de octubre de 2026, de los sitios de TLA+ de Leslie Lamport, Alloy, Quint y Apalache. La elección depende de la tarea, y aquí se describen señales generales.</b-footer>
</b-post>
