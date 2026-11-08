---
title: Cómo organizar las specs por agregados: requisitos RFC y bounded contexts en lugar de una spec por funcionalidad
date: 2026-09-28
updated: 2026-11-08
description: Desarrollo guiado por especificaciones sin proliferación de specs: cómo mantener las specs en un único diccionario de agregados para que no se multipliquen con cada funcionalidad: niveles de requisitos, la ficha del agregado y los límites de los contextos.
tags: IA, desarrollo guiado por especificaciones, specs, DDD, agentes
category: specs
layout: wide
image: /og/specs-by-aggregates.en.png
mentions: RFC 2119, Domain-Driven Design, OpenSpec, Spec-Driven Development
toc: growth=Por qué se acumulan las specs | rfc=Niveles RFC | card=Ficha del agregado | contexts=Contextos | faq=Preguntas | next=Siguiente lectura
---

Las specs por agregados son una entrada por cada concepto del dominio, como una reserva o un pedido, en lugar de una spec distinta por funcionalidad. Una funcionalidad solo añade requisitos a la entrada correcta, así que los archivos no se multiplican con cada tarea y un concepto no se dispersa entre specs. Los requisitos usan niveles RFC: un MUST se comprueba con una prueba, un SHOULD en la revisión. Abajo están la ficha del agregado y los límites de los contextos.

<b-post series="agg">
<b-hchain label="Cadena: bounded context, agregado, invariante de nivel MUST, comprobación">
  <step icon="workflow" sw="1.8" t="Contexto">reserva</step>
  <step icon="cube" t="Agregado">Reservation</step>
  <step icon="list-check" sw="1.8" t="Invariante">MUST</step>
  <step icon="flask" t="Comprobación">prueba</step>
</b-hchain>
<b-chapter id="growth" title="Por qué se acumulan las specs" icon="bar-chart-rise">
  <b-spec-growth>
    <b-growth-panel icon="file" t="Una spec por funcionalidad" sub="un concepto se describe en cada funcionalidad" files="101101010110" n="12 archivos" note="«Reserva» en 7" chip="crece con las funcionalidades"></b-growth-panel>
    <b-growth-panel good icon="cube" t="Diccionario de agregados" sub="un concepto se describe una sola vez" n="4 entradas" note="«Reserva» en 1" chip="crece con el dominio">
      <agg dots="5">Reservation</agg>
      <agg dots="3">Room</agg>
      <agg dots="2">TimeSlot</agg>
      <agg dots="2">Member</agg>
    </b-growth-panel>
    <step>Funcionalidad 13</step>
    <step em="+1 MUST">[booking::Reservation]</step>
    <step em="+1">prueba</step>
  </b-spec-growth>
  <b-cap>Los números son ilustrativos. Cómo organiza <a href="https://github.com/Fission-AI/OpenSpec" target="_blank" rel="noopener">OpenSpec</a> las specs y los cambios: carpetas specs/ y changes/, los cambios terminados van a un archivo.</b-cap>
  <b-finding>
    <ex>Doce funcionalidades produjeron doce specs, y la reserva se describe en siete de ellas, cada vez un poco distinta. En el diccionario las mismas funcionalidades añadieron líneas a cuatro entradas de agregados.</ex>
    <gen>Cuando una spec está atada a un cambio o a una funcionalidad, cada tarea añade archivos, y un concepto se dispersa por varios lugares. Cuando la unidad es un agregado, el número de entradas lo limita el propio dominio, y una funcionalidad solo añade requisitos a una entrada.</gen>
    <do>Haz una lista de los conceptos que aparecen en tres o más specs y dale a cada uno una única entrada de diccionario. Haz que las specs de funcionalidad enlacen a la entrada en lugar de volver a contarla.</do>
  </b-finding>
</b-chapter>
<b-chapter id="rfc" title="Niveles de requisitos de RFC 2119" icon="list-check">
  <b-rfc-levels cols="Palabra | Significado | Fuerza | Comprobación">
    <level k="MUST" s="5" w="100" check="test" t="prueba automática" note="bloquea">obligatorio</level>
    <level k="MUST NOT" s="5" w="100" check="test" t="prueba automática" note="bloquea">prohibido</level>
    <level k="SHOULD" s="3" w="60" check="review" t="revisión" note="avisa">por defecto, desviarse con una razón</level>
    <level k="MAY" s="1" w="20" check="none" t="ninguna" note="no se comprueba">permitido</level>
    <syn>MUST = SHALL</syn>
  </b-rfc-levels>
  <b-cap>Las palabras y los significados siguen la <a href="https://www.rfc-editor.org/rfc/rfc2119" target="_blank" rel="noopener">RFC 2119</a>. Cada palabra corresponde a su propio tipo de comprobación.</b-cap>
  <b-finding>
    <ex>En la entrada de la reserva, «los intervalos no se solapan» es un MUST que se comprueba con una prueba, y «la confirmación va por el mismo canal» es un SHOULD que se mira en la revisión.</ex>
    <gen>La palabra del requisito dice de inmediato cómo comprobarlo y qué hacer si se infringe. El agente lee MUST como un límite y SHOULD como un valor por defecto, y no los confunde.</gen>
    <do>Reescribe los requisitos de tu spec con estas cuatro palabras y pon junto a cada MUST la prueba que lo comprueba.</do>
  </b-finding>
</b-chapter>
<b-chapter id="card" title="La ficha del agregado" icon="card-lines">
  <b-aggregate-card label="Entrada de ejemplo para el agregado Reservation en el contexto de reservas: dirección, invariantes, comandos, acceso, enlaces y la spec de la funcionalidad">
    <field icon="id-card" t="dirección: contexto::nombre">## [booking::Reservation]&#10;Class: aggregate&#10;Description: A meeting room booked for an interval.</field>
    <field icon="list-check" sw="1.8" t="requisitos → comprobaciones">Invariants:&#10;  - MUST: active bookings of a room never overlap&#10;  - MUST: held → confirmed → closed, forward only&#10;  - MUST: held unconfirmed for 15 min → closed&#10;  - SHOULD: confirm in the channel it was made in</field>
    <field icon="play" t="la única forma de cambiarlo">Commands: HoldRoom, ConfirmReservation,&#10;          CancelReservation</field>
    <field icon="user" t="quién puede">Access:&#10;  CanHoldRoom: [booking::Role::Member]&#10;  CanCancelReservation: Member (own), Admin</field>
    <field icon="link" t="enlaces por id">Depends on: [[booking::Room]], [[booking::TimeSlot]]</field>
    <field icon="file" t="de qué funcionalidad viene">Spec: [[room-booking]]</field>
  </b-aggregate-card>
  <b-cap>El ejemplo es inventado. Los términos siguen a <a href="https://martinfowler.com/bliki/DDD_Aggregate.html" target="_blank" rel="noopener">Martin Fowler: DDD Aggregate</a>.</b-cap>
  <b-finding>
    <ex>Toda la reserva es una sola ficha: una dirección, cuatro requisitos, tres comandos, permisos, enlaces y la funcionalidad de la que viene.</ex>
    <gen>Un agregado es un límite dentro del cual los requisitos se cumplen siempre, y solo puede cambiar mediante sus propios comandos. Por eso la ficha guarda las reglas junto a las únicas formas de romperlas.</gen>
    <do>Dale a cada agregado una ficha de seis campos. Si un requisito no se puede asignar a ningún agregado, lo más probable es que el agregado aún no tenga nombre.</do>
  </b-finding>
</b-chapter>
<b-chapter id="contexts" title="Bounded contexts" icon="workflow">
  <b-ctx-map>
    <ctx name="booking">Reservation, Room, TimeSlot</ctx>
    <ctx name="billing">Invoice, Tariff</ctx>
    <ctx name="access">Pass, Level</ctx>
  </b-ctx-map>
  <b-ctx-links t="los enlaces entre contextos van solo por id">
    <ref from="billing::Invoice" to="booking::Reservation"/>
    <ref from="access::Pass" to="booking::Reservation"/>
  </b-ctx-links>
  <b-ctx-clash word="«Level»" note="una palabra, dos términos, etiquetas distintas">
    <sense code="booking::Room.floor">Planta</sense>
    <sense code="access::Level">Autorización</sense>
  </b-ctx-clash>
  <b-ctx-rules>
    <rule icon="id-card">un término = una entrada</rule>
    <rule icon="link">enlazar como [[ctx::Name]]</rule>
    <rule icon="fork">la misma palabra → entradas separadas</rule>
    <rule icon="cycle">el diccionario cambia con la spec</rule>
  </b-ctx-rules>
  <b-cap>El enfoque es <a href="https://martinfowler.com/bliki/BoundedContext.html" target="_blank" rel="noopener">Bounded Context</a> y <a href="https://martinfowler.com/bliki/UbiquitousLanguage.html" target="_blank" rel="noopener">Ubiquitous Language</a>.</b-cap>
  <b-finding>
    <ex>La factura y el pase se refieren a una reserva por id y no saben nada de su interior. «Level» significa una planta en reservas y una autorización en acceso, y son dos entradas separadas.</ex>
    <gen>Un contexto es un área donde cada palabra tiene un solo significado. Cuando una palabra aparece en dos contextos, se crean dos términos con etiquetas distintas; de lo contrario el agente traslada una regla de uno al otro.</gen>
    <do>Reparte tus agregados en contextos y encuentra las palabras que aparecen en dos de ellos. Da a cada una de esas palabras entradas separadas y etiquetas distintas en la interfaz.</do>
  </b-finding>
</b-chapter>
<b-chapter id="faq" icon="chat" title="Preguntas frecuentes">
  <b-faq-cards>
    <q t="¿Por qué se multiplican las specs?">Si una spec está atada a una funcionalidad, los archivos crecen con cada tarea y un concepto se dispersa por varios lugares.</q>
    <q t="¿Qué es una spec por agregado?">Una entrada por concepto del dominio, como una reserva. Una funcionalidad solo le añade requisitos.</q>
    <q t="¿Por qué los niveles MUST y SHOULD?">La palabra dice cómo comprobar el requisito: un MUST se comprueba con una prueba, un SHOULD en la revisión. El agente lee MUST como un límite estricto.</q>
    <q t="¿Qué pasa si una palabra significa cosas distintas en dos contextos?">Crea dos términos con etiquetas distintas, o el agente trasladará una regla de un contexto al otro.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Siguiente lectura">
  <b-cta href="/blog/spec-reconcile-loop/" k="Continuación" t="Un bucle de reconciliación para specs" icon="hub" sw="1.6">como en Kubernetes: estado deseado, comprobaciones y el entorno del agente</b-cta>
  <b-links cols="3">
    <item href="/blog/harness-driven-development/" k="Ciclo de errores" t="Harness-Driven Development">cómo los errores del agente se convierten en reglas</item>
    <item href="/blog/specs-rules-skills/" k="Contexto" t="Specs, biblia, reglas y skills">qué sabe el agente del proyecto y dónde vive</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="Entorno" t="Comparación de harnesses">dónde trabaja el agente y qué ve</item>
    <item href="/blog/agent-checkpoint/" k="Comprobaciones" t="Dónde comprobar el trabajo de un agente de IA">el agregado como punto de control</item>
  </b-links>
</b-chapter>
<b-footer compact>El ejemplo de la reserva es inventado. Los términos y enfoques siguen las fuentes enlazadas bajo los diagramas.</b-footer>
</b-post>
