---
title: Diferencia entre Vitest y Jest: cuál elegir para un proyecto de JavaScript y cuándo basta con QUnit
date: 2026-10-25
updated: 2026-11-08
description: Vitest frente a Jest: configuración, dónde se ejecutan las pruebas y cómo se escriben las comprobaciones. Cuándo elegir Vitest en Vite, quedarse con Jest o usar QUnit en el navegador. Tabla y FAQ.
tags: IA, pruebas, JavaScript, Jest, Vitest, QUnit, Vite, Jest vs Vitest, automatización de pruebas
category: specs
layout: wide
mentions: Jest, Vitest, QUnit, Vite, Node.js, JavaScript, Jest vs Vitest, automated tests, test framework, snapshots, mocks, code coverage
toc: common=Qué comparten | vite=Jest y Vitest | qunit=QUnit | table=Quién tiene qué | choose=Qué elegir | faq=FAQ | next=Más lecturas
---

Vitest frente a Jest: en un proyecto construido con Vite conviene Vitest, porque reutiliza la misma configuración, y si Jest ya funciona, mantenlo. QUnit basta cuando las pruebas deben ejecutarse directamente en el navegador con casi nada de configuración. Los tres ejecutan pruebas automáticas de JavaScript y se diferencian en dónde viven y cuánta configuración necesitan.

Este artículo nació de otro: sobre [modelos formales en Quint](/blog/quint-models-find-races/) y verificación formal. Los nombres QUnit y Quint se parecen y es fácil confundirlos, así que decidí escribir también aparte sobre los frameworks de pruebas. En qué se diferencia Quint de ellos se explica en la [comparación de Quint con las pruebas y TLA+](/blog/quint-vs-tests-and-tla/).

<b-post series="harness">
<b-art names="jest-vs-vitest-vs-qunit/common" wide/>

<b-chapter id="common" icon="flask" title="Qué tienen en común Jest, Vitest y QUnit">
  <b-why align="left">Supón que hay una función que suma dos números. Una prueba registra una expectativa: para uno y dos, la respuesta es tres. El framework ejecuta la función, compara la respuesta con la esperada e informa de si la comprobación pasó o falló. Un proyecto tiene cientos de pruebas, así que se ejecutan automáticamente después de cada cambio: si un cambio rompió algo que funcionaba, una prueba falla y se ve de inmediato. Los tres frameworks hacen exactamente esto con código [JavaScript](/materials/glossary/javascript/), es decir, ejecutan [pruebas automáticas](/materials/glossary/automated-test/).</b-why>
  <b-why align="left">En las descripciones de los frameworks saldrán tres palabras. Un **snapshot** es una referencia guardada de un resultado grande, por ejemplo el marcado terminado de una página, con la que se compara un resultado nuevo. Un **mock** es la sustitución temporal de código real por un sustituto, por ejemplo del envío real de un correo, para que la prueba no llegue al exterior. La **cobertura** es un informe de qué líneas de código ejecutó una prueba al menos una vez. Por eso la elección entre los frameworks rara vez decide si un proyecto tiene pruebas. Decide cuánta configuración hay que hacer y dónde se ejecutan las pruebas.</b-why>
  <b-finding>
    <ex>Jest, Vitest y QUnit responden a la misma pregunta: si una función terminada da la respuesta correcta para entradas dadas.</ex>
    <gen>No comprueban las reglas de un sistema ni el orden de los sucesos: para eso hacen falta modelos como [Quint](/materials/glossary/quint/).</gen>
    <do>Anota qué quieres comprobar: una función con entradas dadas o una regla que cruza varias funciones.</do>
  </b-finding>
</b-chapter>

<b-chapter id="vite" icon="swap" title="Jest o Vitest: cuántos lugares hay que editar para configurar">
  <b-art names="jest-vs-vitest-vs-qunit/vite" wide/>
    <b-why align="left">[Jest](/materials/glossary/jest/) aspira a funcionar sin configuración en la mayoría de los proyectos de JavaScript<b-proof href="https://jestjs.io/" quote="Jest aims to work out of the box, config free, on most JavaScript projects."/>. Entiende proyectos con Babel, TypeScript, React, Angular y Vue. Los snapshots y los mocks vienen integrados, y la cobertura de código se activa con una sola opción, `--coverage`, sin más configuración. Ejecuta las pruebas en paralelo, cada una en su propio proceso para que no se afecten entre sí, y pone primero las que fallaron la vez anterior<b-proof href="https://jestjs.io/" quote="Jest runs previously failed tests first"/>. El estilo de las comprobaciones es familiar: `test` describe un caso, `expect` compara la respuesta.</b-why>
  <b-why align="left">[Vitest](/materials/glossary/vitest/) hace casi lo mismo pero está construido sobre el empaquetador [Vite](/materials/glossary/vite/)<b-proof href="https://vitest.dev/guide/" quote="a next generation testing framework powered by Vite"/>. Si el sitio ya está construido con Vite, Vitest toma los mismos ajustes y plugins, mientras que Jest necesitaría una segunda configuración aparte. Los autores de Vitest llaman a esto duplicación de complejidad<b-proof href="https://vitest.dev/guide/comparisons" quote="two different pipelines to configure and maintain"/>. La compatibilidad con Jest es alta: Vitest admite la mayor parte de la interfaz de Jest y sus bibliotecas<b-proof href="https://vitest.dev/guide/comparisons" quote="compatibility with most of the Jest API and ecosystem libraries"/>, así que en la mayoría de los proyectos sirve como sustituto.</b-why>
  <b-why align="left">Vitest tiene además un modo de observación rápido: cuando se edita un archivo, las pruebas se vuelven a ejecutar al instante, con la misma sustitución en caliente de módulos que usa el propio Vite<b-proof href="https://vitest.dev/guide/comparisons" quote="default watch mode using Vite instant Hot Module Reload"/>. La documentación también menciona un modo que ejecuta las pruebas en un navegador real y una interfaz web con los resultados. Tiene un precio: exige versiones bastante recientes de Vite y [Node.js](/materials/glossary/node-js/), y la documentación hoy nombra Vite 6.4 y Node 22.12<b-proof href="https://vitest.dev/guide/" quote="Vitest requires Vite >=v6.4.0 and Node >=v22.12.0"/>.</b-why>
  <b-finding>
    <ex>En un proyecto con Vite, Vitest ahorra una segunda configuración, mientras que en un proyecto sin Vite la diferencia con Jest es pequeña.</ex>
    <gen>Si Jest ya funciona y no molesta a nadie, cambiar por cambiar rara vez compensa.</gen>
    <do>Mira cómo está construido tu sitio. Si es con Vite, prueba Vitest en un módulo.</do>
  </b-finding>
</b-chapter>

<b-chapter id="qunit" icon="workflow" title="QUnit: cuando necesitas pruebas directamente en el navegador">
  <b-art names="jest-vs-vitest-vs-qunit/qunit-env" wide/>
    <b-why align="left">[QUnit](/materials/glossary/qunit/) se describe a sí mismo como un framework de pruebas potente y fácil de usar. No necesita configuración para Node.js, y para el navegador basta con una configuración mínima<b-proof href="https://qunitjs.com/" quote="Zero configuration and setup for any Node.js project"/>. Se ejecuta allí donde haya JavaScript: en navegadores, en Node.js, en el motor SpiderMonkey y en un hilo en segundo plano de una página<b-proof href="https://qunitjs.com/" quote="QUnit can run anywhere; web browsers, Node, SpiderMonkey, even in a Web Worker!"/>. Jest y Vitest, a diferencia de él, se ejecutan casi siempre en Node.js.</b-why>
  <b-why align="left">Su estilo es propio. Las pruebas relacionadas se agrupan con `QUnit.module`, una prueba individual se describe con `QUnit.test` y la respuesta se compara mediante `assert`. Para las pruebas que tocan una página hay un fixture que devuelve la página a su estado original después de cada prueba, y una comprobación aparte del orden de las llamadas para eventos y respuestas diferidas. QUnit se puede ampliar a tu medida: aserciones propias, ejecutores e informes. También admite navegadores antiguos: la versión 2 funciona con Internet Explorer 9 y posteriores<b-proof href="https://qunitjs.com/intro/" quote="QUnit supports the following runtime environments"/>.</b-why>
  <b-finding>
    <ex>QUnit es bueno donde las pruebas deben ejecutarse directamente en el navegador y sin compilación.</ex>
    <gen>Para proyectos modernos con compilación, donde hacen falta mocks, snapshots y cobertura de serie, se toman más a menudo Jest o Vitest.</gen>
    <do>Si las pruebas deben abrirse en el navegador como una página normal, comprueba primero QUnit.</do>
  </b-finding>
</b-chapter>

<b-chapter id="table" icon="scales" title="Quién tiene qué: Jest, Vitest y QUnit punto por punto">
<b-table id="jvq">

| | Jest | Vitest | QUnit |
|---|---|---|---|
| **Idea** | el framework habitual con un conjunto completo: snapshots, mocks, cobertura | un framework de nueva generación construido sobre Vite | un framework simple que se ejecuta en cualquier parte |
| **Configuración** | su propia configuración | la misma que la de Vite | casi ninguna |
| **Dónde se ejecuta** | casi siempre en Node.js | casi siempre en Node.js | navegador, Node.js, otros entornos |
| **Cómo se escribe una comprobación** | `test` y `expect` | `test` y `expect`, como en Jest | `QUnit.test` y `assert` |
| **Cuándo encaja** | Jest ya está y funciona | el proyecto está construido con Vite | hacen falta pruebas en el navegador sin compilación |

</b-table>
  <b-why align="left">La tabla, fila por fila. «Idea» dice por qué apareció el framework. «Configuración» muestra cuánto trabajo hay antes de la primera prueba. «Dónde se ejecuta» y «Cómo se escribe una comprobación» importan si tienes muchas pruebas hechas: el estilo de Jest y Vitest coincide, así que pasar de uno a otro es sencillo, mientras que en QUnit habría que reescribir las comprobaciones.</b-why>
</b-chapter>

<b-chapter id="choose" icon="target" title="Qué elegir: Jest, Vitest o QUnit">
  <b-art names="jest-vs-vitest-vs-qunit/choose" wide/>
  <b-why align="left">La elección la marca el proyecto. El proyecto está construido con Vite: toma Vitest, los ajustes ya están. Jest ya está en el proyecto y todo funciona: mantenlo. Necesitas comprobaciones directamente en el navegador sin compilación: toma QUnit. Pasar de Jest a Vitest suele ser barato, así que una elección equivocada no será irreversible. Si necesitas comprobar reglas y el orden de los sucesos en lugar de funciones, mira los artículos [Quint vs QUnit y TLA+](/blog/quint-vs-tests-and-tla/) y [sobre modelos de Quint](/blog/quint-models-find-races/).</b-why>
  <b-finding>
    <ex>Tres frameworks resuelven una misma tarea, y decide el entorno: un empaquetador, un navegador o un conjunto de pruebas ya existente.</ex>
    <gen>Elijas el que elijas, las pruebas comprueban los escenarios dados, mientras que las reglas que se rompen en un orden especial de sucesos las detecta un modelo.</gen>
    <do>Elige un framework según el entorno del proyecto y añade una comprobación de las propias pruebas: las [pruebas de mutación](/materials/glossary/mutation-testing/) muestran si las pruebas notan siquiera un defecto.</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="FAQ">
  <b-faq-cards>
    <q t="¿Elijo Jest o Vitest?">En un proyecto construido con Vite, toma Vitest: reutiliza los mismos ajustes, así que no hace falta una segunda configuración. Si Jest ya funciona y no molesta a nadie, cambiar rara vez compensa.</q>
    <q t="¿En qué se diferencia Vitest de Jest?">Vitest está construido sobre Vite, admite la mayor parte de la interfaz de Jest y relanza las pruebas rápido cuando cambia un archivo. Necesita versiones bastante recientes de Vite y Node.js.</q>
    <q t="¿Cuándo necesito QUnit?">Cuando las pruebas deben ejecutarse directamente en el navegador sin un paso de compilación. QUnit se ejecuta en navegadores, en Node.js y en otros entornos de JavaScript, y no necesita configuración para Node.js.</q>
    <q t="¿Es difícil pasar de Jest a Vitest?">Normalmente no: ambos escriben las comprobaciones con `test` y `expect`, así que pasar de uno a otro es sencillo. Pasar a QUnit implica reescribir las comprobaciones.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Más lecturas">
  <b-links>
    <item href="/blog/quint-vs-tests-and-tla/" k="Comparación" t="Verificación de modelos frente a pruebas: Quint, QUnit, TLA+">En qué se diferencia Quint de QUnit, Jest y TLA+</item>
  <item href="/blog/quint-models-find-races/" k="Modelos" t="Cómo encontrar condiciones de carrera y datos perdidos">Modelos formales de Quint para reglas y el orden de los sucesos</item>
  <item href="/blog/tla-alloy-quint-compare/" k="Comparación" t="TLA+, Alloy o Quint">Lenguajes de especificación junto a frameworks de pruebas</item>
  </b-links>
</b-chapter>
<b-footer>Datos a 25 de octubre de 2026, de los sitios oficiales de Jest, Vitest y QUnit. La elección depende de tu proyecto, y aquí se describen señales generales.</b-footer>
</b-post>
