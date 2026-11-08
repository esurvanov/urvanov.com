---
title: Cuántos agentes de IA se necesitan: el número de agentes crece con el número de bounded contexts
date: 2026-10-10
updated: 2026-11-08
description: Un agente por bounded context: por qué hay tantos agentes como fronteras de significado, cómo escala, qué hay entre los agentes y por dónde empezar.
tags: IA, agentes, bounded context, DDD, arquitectura, escalado, harness
category: harness
layout: wide
mentions: bounded context, multi-agent, AI agent, DDD, context map, contracts, scaling, harness
toc: idea=Un agente por contexto | scale=Escalado | borders=Entre agentes | first=Por dónde empezar | faq=Preguntas | next=Siguiente lectura
---

¿Cuántos agentes de IA se necesitan? Tantos como bounded contexts: cada frontera de significado tiene su propio agente. Abajo: por qué, cómo escala, qué hay entre los agentes y por dónde empezar.

<b-post series="harness">

<b-chapter id="idea" icon="ring-dot" title="Un agente por contexto">
  <b-why align="left">Hay tantos agentes como [bounded contexts](/materials/glossary/bounded-context/). Así un [agente](/materials/glossary/ai-agent/) tiene contexto suficiente.</b-why>
  <b-lane title="Uno para todo o uno por contexto" color="accent">
    <iso-art name="agents-per-bounded-context/one-vs-per-context"></iso-art>
  </b-lane>
  <b-finding>
    <ex>«Pedido» significa cosas distintas en ventas, entrega y pago. Un agente mezcla los significados, tres agentes guardan cada uno el suyo.</ex>
    <gen>La frontera de un contexto ya muestra dónde cambia el significado. Es un lugar cómodo para cortar tanto las specs como el trabajo de los agentes.</gen>
    <do k="Qué hacer">Haz una lista de los contextos del proyecto y escribe junto a cada uno quién trabaja dentro de sus fronteras.</do>
  </b-finding>
</b-chapter>

<b-chapter id="scale" icon="chart-axes" title="Cómo escala">
  <b-lane title="Carga y número de agentes" color="accent">
    <iso-art name="agents-per-bounded-context/load-chart"></iso-art>
  </b-lane>
  <b-finding>
    <ex>Ocho contextos: un agente se ahoga en significados, mientras que ocho agentes trabajan cada uno dentro de sus propias fronteras.</ex>
    <gen>El número de agentes crece linealmente con el número de contextos, mientras que la carga de cada uno se mantiene plana.</gen>
    <do k="Qué hacer">Añade un agente junto con un contexto nuevo en lugar de hacer crecer el contexto de un solo agente.</do>
  </b-finding>
</b-chapter>

<b-chapter id="borders" icon="boxes-link" title="Qué hay entre los agentes">
  <b-why align="left">Los agentes hablan mediante contratos: eventos y API. Un contexto ajeno no está bajo tu control, así que el agente accede a él solo mediante el contrato y con tu confirmación. Más sobre cómo juzgar la complejidad: [dónde está la complejidad real](/blog/agent-hands-work-back-to-you/#hard).</b-why>
  <b-lane title="Mapa de contextos" color="accent">
    <iso-art name="agents-per-bounded-context/context-map"></iso-art>
  </b-lane>
  <b-finding>
    <ex>El agente de ventas lee el evento «pedido pagado» de pagos y escribe en el sistema del socio solo mediante un contrato aprobado.</ex>
    <gen>Un contrato sustituye al contexto compartido: los agentes no necesitan conocer el interior de la frontera ajena, y un error no se propaga.</gen>
    <do k="Qué hacer">Para cada vínculo entre contextos escribe el contrato en una línea: qué da, qué toma, quién es su responsable.</do>
  </b-finding>
</b-chapter>

<b-chapter id="first" icon="shield-check" title="Por dónde empezar">
  <b-lane title="El primer paso" color="accent">
    <iso-art name="agents-per-bounded-context/start"></iso-art>
  </b-lane>
  <b-finding>
    <ex>Empieza con dos contextos vecinos y un contrato entre ellos.</ex>
    <gen>Un contexto, un agente, un contrato: así se prueba el esquema antes de extenderlo a todo el proyecto.</gen>
    <do k="Qué hacer">Elige dos contextos donde las palabras se mezclan con más frecuencia y pon en marcha un agente para cada uno.</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Preguntas frecuentes">
  <b-faq-cards>
    <q t="¿Cuántos agentes de IA se necesitan?">Tantos como bounded contexts: cada frontera de significado tiene su propio agente.</q>
    <q t="¿Cómo escala esto?">El número de agentes crece linealmente con el número de contextos, mientras que la carga de cada uno se mantiene pareja.</q>
    <q t="¿Qué conecta a los agentes?">Un contrato en la frontera: los agentes no necesitan conocer el interior de otro contexto, y un error no se propaga.</q>
    <q t="¿Por dónde se empieza?">Con un contexto, un agente y un contrato: así se prueba la configuración antes de extenderla a todo el proyecto.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" icon="arrow-right" title="Siguiente lectura">
  <b-links>
    <item href="/blog/specs-by-aggregates/" k="Specs" t="Specs por agregados">fronteras de contexto en las specs</item>
    <item href="/blog/agent-hands-work-back-to-you/" k="Agente" t="¿Los agentes te quitarán el trabajo?">dónde está la complejidad real</item>
    <item href="/materials/glossary/bounded-context/" k="Término" t="Bounded context">qué es y para qué sirve</item>
    <item href="/blog/agent-checkpoint/" k="Comprobaciones" t="Dónde comprobar el trabajo de un agente de IA">la frontera del agregado y el tamaño del contexto</item>
  </b-links>
</b-chapter>
</b-post>
