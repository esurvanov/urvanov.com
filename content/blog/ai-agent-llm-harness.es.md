---
title: Agente de IA = LLM + harness: diferencia entre LLM, harness y agente y qué incluye el harness
date: 2026-10-12
updated: 2026-11-08
description: Agente de IA = LLM + harness. LLM, harness y agente en una sola tabla, los cinco grupos que incluye un harness y por qué el mismo modelo se comporta distinto en un chat y en Claude Code.
tags: IA, agentes, agente de IA, LLM, harness, harness del agente, ingeniería de harness
category: harness
layout: wide
mentions: AI agent, LLM, agent harness, harness engineering, agent loop, MCP, Claude Code, Codex, ChatGPT
toc: formula=Agente = LLM + harness | table=LLM, harness y agente | parts=Qué incluye el harness | same=El mismo modelo | faq=FAQ | next=Sigue leyendo
---

Un agente de IA es un LLM más un harness (arnés del agente): el LLM solo razona y escribe texto, y el harness es todo lo que lo rodea y le permite actuar: un ciclo de pasos, herramientas, contexto, reglas y comprobaciones. Juntos llevan una tarea hasta un resultado, mientras que un LLM solo responde. Abajo: LLM, harness y agente en una tabla, los cinco grupos que incluye un harness y el mismo modelo en dos harness.

<b-post series="harness">
<b-chapter id="formula" icon="target-dot" title="Agente = LLM + harness">
<b-why align="left">Un <a href="/materials/glossary/llm/">LLM</a> solo continúa texto. El <a href="/materials/glossary/harness/">harness</a> es todo lo que lo rodea: el ciclo de pasos, las herramientas, el acceso a archivos y servicios, las reglas y las comprobaciones. Juntos forman un <a href="/materials/glossary/ai-agent/">agente de IA</a>.</b-why>
<b-lane-art names="ai-agent-llm-harness/formula"/>
<b-finding>
  <ex>El mismo modelo Claude responde en un chat y edita código en Claude Code. La diferencia es el harness.</ex>
  <gen>Las aplicaciones de chat, los asistentes y los agentes pueden funcionar con los mismos modelos. Lo que los distingue es lo que rodea al modelo.</gen>
  <do>Cuando compares productos de IA, compara harness: qué puede hacer el producto por su cuenta y dónde.</do>
</b-finding>
</b-chapter>
<b-chapter id="table" icon="table-cols" title="LLM, harness y agente">
<b-why align="left">Qué tiene cada uno de los tres. La columna del agente es la suma de las dos primeras.</b-why>
<b-table>
<table><thead><tr><th></th><th>LLM</th><th>Harness</th><th>Agente de IA</th></tr></thead><tbody><tr><td><a href="/materials/glossary/llm/">Modelo</a> que razona en texto</td><td><b-tag-inline kind="ok">tiene</b-tag-inline></td><td><b-tag-inline kind="no">no tiene</b-tag-inline></td><td><b-tag-inline kind="ok">tiene</b-tag-inline></td></tr><tr><td><a href="/materials/glossary/agent-loop/">Ciclo</a>: paso, acción, observación</td><td><b-tag-inline kind="no">no tiene</b-tag-inline></td><td><b-tag-inline kind="ok">tiene</b-tag-inline></td><td><b-tag-inline kind="ok">tiene</b-tag-inline></td></tr><tr><td><a href="/materials/glossary/tool/">Herramientas</a> y <a href="/materials/glossary/mcp/">MCP</a></td><td><b-tag-inline kind="no">no tiene</b-tag-inline></td><td><b-tag-inline kind="ok">tiene</b-tag-inline></td><td><b-tag-inline kind="ok">tiene</b-tag-inline></td></tr><tr><td><a href="/materials/glossary/context/">Contexto</a> y <a href="/materials/glossary/memory/">memoria</a></td><td><b-tag-inline kind="no">no tiene</b-tag-inline></td><td><b-tag-inline kind="ok">tiene</b-tag-inline></td><td><b-tag-inline kind="ok">tiene</b-tag-inline></td></tr><tr><td>Reglas: <a href="/materials/glossary/claude-md/">CLAUDE.md</a>, <a href="/materials/glossary/agents-md/">AGENTS.md</a>, <a href="/materials/glossary/agent-skills/">skills</a></td><td><b-tag-inline kind="no">no tiene</b-tag-inline></td><td><b-tag-inline kind="ok">tiene</b-tag-inline></td><td><b-tag-inline kind="ok">tiene</b-tag-inline></td></tr><tr><td><a href="/materials/glossary/permissions/">Permisos</a>, <a href="/materials/glossary/sandbox/">sandbox</a>, <a href="/materials/glossary/hooks/">hooks</a></td><td><b-tag-inline kind="no">no tiene</b-tag-inline></td><td><b-tag-inline kind="ok">tiene</b-tag-inline></td><td><b-tag-inline kind="ok">tiene</b-tag-inline></td></tr><tr><td><a href="/materials/glossary/checks/">Comprobaciones</a> y <a href="/materials/glossary/human-in-the-loop/">persona en el circuito</a></td><td><b-tag-inline kind="no">no tiene</b-tag-inline></td><td><b-tag-inline kind="ok">tiene</b-tag-inline></td><td><b-tag-inline kind="ok">tiene</b-tag-inline></td></tr><tr><td>Actúa por su cuenta</td><td><b-tag-inline kind="no">no</b-tag-inline></td><td><b-tag-inline kind="no">no</b-tag-inline></td><td><b-tag-inline kind="ok">sí</b-tag-inline></td></tr></tbody></table>
</b-table>
<b-finding>
  <ex>Un harness sin modelo tiene herramientas pero nadie que elija entre ellas. Un modelo sin harness elige pero no puede actuar.</ex>
  <gen>Ninguna de las dos mitades es un agente por sí sola. Agente = modelo + harness funciona como definición: quita cualquiera de los dos lados y el agente desaparece.</gen>
  <do>Nombra el harness del agente que usas: dónde viven su ciclo, sus herramientas, sus reglas y sus comprobaciones.</do>
</b-finding>
</b-chapter>
<b-chapter id="parts" icon="cube" title="Qué incluye el harness: cinco grupos">
<b-arrow-rows>
  <row t="Ciclo" color="accent">ciclo del agente, orquestación de subagentes</row>
  <row t="Alcance" color="accent">herramientas, servidores MCP, sandbox, navegador</row>
  <row t="Conocimiento" color="accent">contexto, memoria, CLAUDE.md / AGENTS.md, skills</row>
  <row t="Control" color="warn">permisos, hooks, aprobación humana de los pasos arriesgados</row>
  <row t="Verificación" color="warn">pruebas, linters, logs y trazas</row>
</b-arrow-rows>
<b-finding>
  <ex>Claude Code: el ciclo en la CLI, las herramientas mediante MCP, las reglas en CLAUDE.md, el control mediante permisos y hooks, la verificación mediante tus pruebas.</ex>
  <gen>En la práctica, la mayoría de los fallos de un agente se remontan a uno de los cinco grupos: una herramienta que falta, un contexto que falta o una comprobación que falta.</gen>
  <do>Cuando el agente falle, pregunta qué grupo faltaba y arréglalo ahí en lugar de reescribir el prompt.</do>
</b-finding>
</b-chapter>
<b-chapter id="same" icon="chart-line" title="El mismo modelo, distinto harness">
<b-table>
<table><thead><tr><th>Modelo</th><th>Harness de chat</th><th>Harness de agente</th></tr></thead><tbody><tr><td>Claude</td><td>Claude en el navegador: conversación, sin acceso al proyecto</td><td>Claude Code: lee el repositorio, edita archivos, ejecuta comandos</td></tr><tr><td>GPT</td><td>ChatGPT: conversación, sin acceso al proyecto</td><td>Codex: trabaja en el repositorio, ejecuta pruebas, abre pull requests</td></tr></tbody></table>
</b-table>
<b-why align="left" top="10">Un estudio en ICML 2026 encontró que elegir el mejor harness da mejoras comparables a elegir el mejor modelo. <a href="https://icml.cc/virtual/2026/68323" target="_blank" rel="noopener">Fuente</a></b-why>
<b-finding>
  <ex>Pasar de un chat a Claude Code cambia solo el harness, y la tarea pasa de un consejo a un cambio terminado.</ex>
  <gen>La elección del modelo y la del harness pesan más o menos lo mismo. Los equipos que solo comparan modelos se pierden la mitad del resultado.</gen>
  <do>Antes de cambiar de modelo, prueba un harness más potente con el modelo que ya tienes.</do>
</b-finding>
</b-chapter>
<b-chapter id="faq" icon="check-circle" title="FAQ">
<b-faq-cards>
  <q t="¿Qué es el harness de un agente?">Todo el código y la configuración alrededor del modelo que no es el modelo: ciclo, herramientas, contexto, reglas, permisos y comprobaciones.</q>
  <q t="Agente de IA frente a LLM: ¿cuál es la diferencia?">Un LLM genera texto. Un agente de IA es un LLM dentro de un harness que convierte ese texto en acciones y comprueba el resultado.</q>
  <q t="¿Agente de IA frente a chatbot?">Un chatbot responde dentro de un guion o de una conversación. Un agente actúa en tus sistemas y decide por sí mismo el siguiente paso.</q>
  <q t="¿Es ChatGPT un agente?">En un chat normal es una aplicación de chat. En el modo agente y en Codex, el mismo modelo recibe un harness de acción, lo que lo convierte en un agente.</q>
  <q t="¿Harness frente a framework?">Un framework da piezas para escribir un agente. Un harness es la capa en ejecución que lleva el ciclo y lo controla.</q>
</b-faq-cards>
</b-chapter>
<b-chapter id="next" icon="arrow-right" title="Sigue leyendo">
  <b-links>
    <item href="/materials/glossary/harness/" k="Término" t="Harness">cada parte, con enlaces</item>
    <item href="/blog/harness-driven-development/" k="Práctica" t="Ingeniería de harness">convertir los errores en reglas</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="Elección" t="Claude Code, Codex, Cursor">qué agente elegir</item>
  </b-links>
</b-chapter>
</b-post>
