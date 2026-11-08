---
title: Qué es un bucle de reconciliación para specs: como en Kubernetes, con la spec como estado deseado y el código como estado real
date: 2026-09-28
updated: 2026-11-08
description: Desarrollo guiado por especificaciones con un bucle de reconciliación: quién cambia el estado deseado y quién acerca el código a él, por qué las pruebas en verde aún no significan «correcto» y qué seis capacidades del entorno necesita el agente para cerrar el bucle.
tags: IA, desarrollo guiado por especificaciones, specs, Kubernetes, harness
category: specs
layout: wide
image: /og/spec-reconcile-loop.en.png
mentions: Kubernetes, reconcile loop, human-in-the-loop, Model Context Protocol, Spec-Driven Development
toc: k8s=Como Kubernetes | sensors=Límites de las comprobaciones | env=Entorno | faq=Preguntas | next=Siguiente lectura
---

Un bucle de reconciliación para specs funciona como un controlador en Kubernetes: una persona cambia el estado deseado (la spec), el agente lo compara con el estado real (el código) y ajusta el código, y las pruebas miden el resultado. Las pruebas en verde solo comprueban lo que está escrito en ellas, así que cada MUST necesita su propia comprobación, y el entorno del agente necesita ejecución de código, pruebas, logs, datos, servicios y un sandbox.

<b-post series="rec">
<b-hchain label="La cadena de reconciliación: lo deseado es la spec, el actor es el agente, lo real es el código, la medida son las pruebas">
  <step icon="book" t="Deseado">spec</step>
  <step icon="bot" t="Actor">agente</step>
  <step icon="code-slash" t="Real">código</step>
  <step icon="gauge" sw="1.8" t="Medida">pruebas</step>
</b-hchain>
<b-chapter id="k8s" title="El mismo bucle que en Kubernetes" icon="hub" sw="1.6">
  <b-why align="left">Kubernetes es un sistema que ejecuta servicios y los mantiene funcionando en muchos servidores. Su idea principal es simple: una persona describe cómo debe ser todo («mantén tres copias del servicio»), y un programa supervisor, el controlador, compara sin parar la descripción con lo que existe de verdad y corrige las diferencias. Eso es el bucle de reconciliación. Con las specs funciona el mismo esquema: una persona fija el estado deseado, y un agente puede acercar el código a él.</b-why>
  <b-why>El estado deseado aquí es el <a href="/blog/specs-by-aggregates/">diccionario de agregados</a>: una entrada por concepto, con requisitos marcados MUST y SHOULD.</b-why>
  <b-k8s-loop label="Kubernetes: chart, controlador, nodos, sondas. Specs: diccionario, agente, código, pruebas. Una persona cambia solo el estado deseado, y el actor sigue reconciliando la medida con él." cols="deseado | actor | real | medida" human="una persona cambia el estado deseado" back="medida → actor, una y otra vez">
    <b-k8s-row icon="hub" sw="1.6" t="Kubernetes">
      <cell on>chart · manifiesto</cell>
      <cell>controlador</cell>
      <cell>nodos · pods</cell>
      <cell>sondas · métricas</cell>
    </b-k8s-row>
    <b-k8s-row icon="book" t="Specs">
      <cell on>diccionario · MUST</cell>
      <cell hz>agente</cell>
      <cell>código</cell>
      <cell hz>pruebas · calidad</cell>
    </b-k8s-row>
    <b-k8s-row icon="help" t="En palabras sencillas">
      <cell>cómo debería ser</cell>
      <cell>quién lo lleva hasta ahí</cell>
      <cell>cómo es ahora</cell>
      <cell>qué los compara</cell>
    </b-k8s-row>
  </b-k8s-loop>
  <b-why align="left">Cómo leer la imagen. Las cuatro columnas son los cuatro papeles del bucle, las dos filas son dos sistemas, y la tercera fila pone los términos en palabras sencillas. El estado deseado (relleno) es lo que cambia una persona. En Kubernetes son el chart y el manifiesto: archivos que dicen qué partes de un servicio deben ejecutarse y cuántas. En las specs es el diccionario de agregados con las palabras MUST («obligatorio») y SHOULD («recomendado»). El actor lleva el estado real hasta el deseado: en Kubernetes el controlador, en las specs el agente. El estado real es lo que existe ahora: nodos (servidores) y pods (las partes de un servicio que se ejecutan en ellos), o el código. La medida muestra si coinciden: sondas (comprobaciones automáticas breves de «¿estás funcionando?») y métricas, o pruebas y comprobaciones de calidad. La flecha hacia abajo en la parte superior significa que una persona cambia solo el estado deseado. La flecha del bucle en la parte inferior significa que la medida vuelve al actor, y así hasta que coincidan. Ejemplo: una persona escribe en el diccionario «una reserva se cierra a los 15 minutos», el agente cambia el código, las pruebas lo comprueban, y una prueba en rojo devuelve al agente al código.</b-why>
  <b-cap>El bucle de reconciliación sigue la <a href="https://kubernetes.io/docs/concepts/architecture/controller/" target="_blank" rel="noopener">documentación de Kubernetes sobre controladores</a>.</b-cap>
  <b-finding>
    <ex>En Kubernetes una persona edita el chart y el controlador lleva los nodos hasta él. Aquí una persona edita el diccionario y el agente lleva el código hasta él y lo comprueba con pruebas.</ex>
    <gen>Ambos sistemas mantienen el estado deseado separado del real y los reconcilian en un bucle. La persona en el bucle cambia solo el estado deseado, así que cada edición se convierte de inmediato en trabajo para el actor.</gen>
    <do>Edita el requisito en el diccionario en lugar de corregir el código a mano, y lanza al agente con la tarea de ajustar el código al diccionario.</do>
  </b-finding>
</b-chapter>
<b-chapter id="sensors" title="Una comprobación solo ve lo que se puso en ella" icon="gauge">
  <b-why align="left">Una comprobación muestra solo lo que se puso en ella. En Kubernetes una sonda es una petición automática breve a un servicio: «¿respondes?». Si el servicio contesta «200» (el código de éxito), la sonda está en verde aunque el servicio pueda no estar haciendo lo principal: digamos, la cola de pedidos está atascada. En las specs pasa lo mismo con las pruebas. Si un requisito no tiene prueba, todas las pruebas siguen en verde y nadie nota que el requisito no se cumple.</b-why>
  <b-why>El ejemplo es la reserva de salas de reuniones de <a href="/blog/specs-by-aggregates/">Specs por agregado</a>: tres requisitos MUST y uno SHOULD.</b-why>
  <b-probe-check>
    <b-probe-panel icon="hub" sw="1.6" t="Kubernetes" verdict="la sonda está en verde, el servicio no funciona">
      <probe kind="ok" note="sonda">el servicio respondió «200: funcionando»</probe>
      <probe kind="no" note="sin comprobar">los pedidos no se están procesando</probe>
    </b-probe-panel>
    <b-probe-panel icon="book" t="Specs" verdict="las pruebas están en verde, un MUST sin comprobar">
      <probe kind="ok" note="tiene prueba">MUST · las reservas de una misma sala no se solapan</probe>
      <probe kind="ok" note="tiene prueba">MUST · el estado de la reserva solo avanza</probe>
      <probe kind="no" note="sin comprobación">MUST · sin confirmación una reserva se cierra a los 15 minutos</probe>
      <probe kind="eye" note="lo mira una persona">SHOULD · la confirmación llega por el mismo canal</probe>
      <cov t="MUST cubiertos" value="67">2 / 3</cov>
    </b-probe-panel>
    <rule>cada MUST necesita su propia comprobación</rule>
    <rule>un MUST sin comprobación es un hueco</rule>
    <rule>verde no significa correcto</rule>
  </b-probe-check>
  <b-why align="left">Cómo leer la imagen. A la izquierda está Kubernetes: la sonda recibió la respuesta «200: funcionando» y está en verde, pero los pedidos no se procesan, así que la sonda no comprobó lo principal. A la derecha están las specs, con una reserva de sala de reuniones: tres requisitos MUST y uno SHOULD. Dos MUST están cubiertos por pruebas (las reservas no se solapan, el estado solo avanza). El tercero, «sin confirmación una reserva se cierra a los 15 minutos», no lo comprueba nadie. Una persona revisa el SHOULD sobre el canal. 2 de 3 MUST están cubiertos, es decir, el 67%. Las tres reglas bajo el diagrama: cada MUST tiene su propia comprobación; un MUST sin comprobación cuenta como un hueco que cerrar; un resultado en verde aún no significa que todo sea correcto.</b-why>
  <b-cap>Qué sondas existen y qué comprueban: <a href="https://kubernetes.io/docs/concepts/configuration/liveness-readiness-startup-probes/" target="_blank" rel="noopener">Kubernetes: sondas</a>.</b-cap>
  <b-finding>
    <ex>La sonda responde «200» mientras los pedidos están atascados, y las pruebas de reservas están en verde mientras nadie comprueba la regla de los 15 minutos.</ex>
    <gen>Una comprobación confirma solo lo que está escrito en ella y no dice nada del resto. Por eso la ficha del agregado se contrasta con las comprobaciones: un MUST sin comprobación es un hueco, no un requisito cumplido.</gen>
    <do>Repasa los MUST de tu diccionario y marca los que no tienen prueba. Convierte cada uno en una tarea, o rebájalo deliberadamente a SHOULD.</do>
  </b-finding>
</b-chapter>
<b-chapter id="env" title="El entorno decide si el bucle se cierra" icon="terminal-screen">
  <b-why align="left">El bucle se cierra solo si el actor tiene todo lo necesario para comparar. Un controlador de Kubernetes funciona porque el clúster le da acceso a todo lo que necesita. Para un agente ese entorno se llama harness (arnés del agente): el entorno en el que trabaja, con programas, permisos y comprobaciones.</b-why>
  <b-env-caps>
    <side icon="hub" sw="1.6" t="Clúster de Kubernetes">donde vive el controlador</side>
    <side icon="terminal-screen" sw="1.8" t="Harness">donde vive el agente</side>
    <cap icon="play" t="Ejecutar código">el agente adivina cómo funciona el programa</cap>
    <cap icon="flask" t="Pruebas">nada con lo que comprobar un MUST</cap>
    <cap icon="log-lines" t="Logs">no se ve qué se rompió exactamente</cap>
    <cap icon="database" t="Datos de prueba">las comprobaciones se ejecutan sobre una base de datos vacía</cap>
    <cap icon="plug" t="Servicios mediante MCP">las integraciones se comprueban a ciegas</cap>
    <cap icon="shield-check" t="Sandbox y permisos">demasiado arriesgado dejar actuar al agente</cap>
  </b-env-caps>
  <b-cta href="/blog/ai-in-code-harness-and-tools/" k="Artículo aparte" t="Elegir el entorno: comparación de harnesses" icon="terminal-screen" sw="1.8">Claude Code, Codex, Cursor, Hermes y el chat en un mismo mapa</b-cta>
  <b-why align="left">Las seis capacidades de la imagen son lo que un agente necesita para cerrar el bucle, y lo que pasa sin cada una. Sin ejecución de código el agente adivina cómo funciona el programa. Sin pruebas no se puede comprobar un MUST. Sin logs no se ve qué se rompió exactamente. Sin datos de prueba la comprobación se ejecuta sobre una base de datos vacía y no muestra nada. Sin servicios mediante MCP, las integraciones se comprueban a ciegas. Sin un sandbox (un lugar aislado donde es seguro probar y romper cosas) da miedo dejar actuar al agente. Si falta alguna capacidad, el bucle queda abierto en ese punto.</b-why>
  <b-finding>
    <ex>El controlador de Kubernetes funciona porque el clúster le da una API, nodos y sondas. Para el mismo bucle el agente necesita ejecutar código, pruebas, logs, datos, servicios y un sandbox.</ex>
    <gen>El diccionario fija el estado deseado, pero solo quien puede ejecutar y medir el código puede reconciliarlo con ese estado. Lo que le falte al entorno, el agente no puede comprobarlo, y el bucle queda abierto en ese punto.</gen>
    <do>Marca cuáles de las seis capacidades tiene tu agente. Para cada una que falte, decide si añadirla al harness o cambiar de harness.</do>
  </b-finding>
</b-chapter>
<b-chapter id="faq" icon="chat" title="Preguntas frecuentes">
  <b-faq-cards>
    <q t="¿Qué es un bucle de reconciliación para specs?">Un bucle donde una persona cambia el estado deseado, la spec, el agente compara el código con ella y lo ajusta, y las pruebas miden el resultado. Así funciona un controlador de Kubernetes.</q>
    <q t="¿Por qué no bastan las pruebas en verde?">Una prueba confirma solo lo que está escrito en ella. Por eso cada requisito MUST necesita su propia comprobación.</q>
    <q t="¿Qué necesita el entorno del agente para que el bucle se cierre?">Ejecución de código, pruebas, logs, datos, servicios y un sandbox. Lo que le falte al entorno, el agente no puede comprobarlo.</q>
    <q t="¿Qué cambia la persona en este bucle?">Solo el estado deseado, la spec. Cualquier edición se convierte de inmediato en trabajo para el agente.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Siguiente lectura">
  <b-links cols="3">
    <item href="/blog/specs-by-aggregates/" k="Estado deseado" t="Specs por agregado">diccionario, requisitos RFC y contextos</item>
    <item href="/blog/harness-driven-development/" k="Ciclo de errores" t="Harness-Driven Development">cómo los errores del agente se convierten en reglas</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="Entorno" t="Comparación de harnesses">dónde trabaja el agente y qué ve</item>
  </b-links>
</b-chapter>
<b-footer compact>El ejemplo de la reserva es inventado. Los términos y enfoques siguen las fuentes enlazadas bajo los diagramas.</b-footer>
</b-post>
