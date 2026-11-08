---
title: Cómo hacer QA con un agente de IA tras el soporte: investigar, describir y documentar mediante MCP y skills
date: 2026-10-04
updated: 2026-11-08
description: Se optimiza un solo paso de la cadena: QA tras el soporte. Un agente reproduce un bug de Jira en un entorno de pruebas mediante MCP, acota el camino, lo describe y lo documenta, una skill convierte los pasos en un proceso repetible, y QA comprueba a mano. El soporte y el desarrollo no cambian.
tags: IA, agentes, QA, Jira, MCP, skills, bugs, harness
category: harness
layout: wide
mentions: Jira, AI agent, QA, Model Context Protocol, skills, bug reproduction, sequence diagram, C4 model, human-in-the-loop
toc: route=Paso de QA | stages=Tres partes | mcp=MCP | skill=Skill | parallel=En paralelo | example=Ejemplo | human=Qué conserva QA | first=Cómo empezar | faq=Preguntas | next=Siguiente lectura
---

Un bug de un cliente pasa por el soporte y llega a QA. Aquí la investigación, la descripción y la documentación se hacen a mano, y es el paso que se optimiza. Un agente de IA conectado a Jira y a un entorno de pruebas mediante MCP, más una skill con los pasos escritos, asume la rutina. QA comprueba el resultado a mano. El soporte y el desarrollo trabajan como antes.

<b-post series="harness">
<b-view-toggle/>

<b-chapter id="route" icon="stairs" title="Se optimiza un solo paso: QA tras el soporte">
  <b-why align="left">Un bug viaja del cliente a la corrección en cuatro pasos: el cliente escribe, el soporte lo recibe, QA investiga, un desarrollador lo corrige. Antes, QA hacía su paso entero a mano, y toda la jornada se iba en bugs. Ahora los agentes trabajan en este paso mientras QA acepta el resultado y los gestiona. Los otros tres pasos se quedan como estaban.</b-why>
  <b-view kind="pic">
    <b-art-plain name="bug-report-to-reproduction-agent/qa-step"/>
  </b-view>
  <b-view kind="struct">
    <b-lane title="Antes" color="muted">
      <b-qa-route>
        <node icon="user" t="cliente">escribe</node>
        <node icon="user" t="soporte">recibe</node>
        <node kind="solo" t="QA" chips="investiga|describe|documenta" time="Tiempo de QA por tarea" bar="haciendo las tareas">hace el trabajo</node>
        <node icon="user" t="desarrollador">corrige</node>
      </b-qa-route>
    </b-lane>
    <b-lane title="Después" color="accent" top="12">
      <b-qa-route>
        <node icon="user" t="cliente">escribe</node>
        <node icon="user" t="soporte">recibe</node>
        <node kind="pair" t="QA" frame="en pareja" tools="monitor-screen:Claude in Chrome|flask:Código, tests, PoC|code:API" n="× N" time="Tiempo de QA por tarea" bar="aceptación|gestión de agentes">aceptación</node>
        <node icon="user" t="desarrollador">corrige</node>
      </b-qa-route>
    </b-lane>
    <b-cap>La escala es ilustrativa, no una medición.</b-cap>
  </b-view>
  <b-finding>
    <ex>Solo cambia el paso de QA: todo el tiempo de QA se iba en hacer las tareas; ahora las hacen los agentes, y QA acepta los resultados y gestiona a los agentes.</ex>
    <gen>Pueden trabajar muchos agentes a la vez, y baja el tiempo de QA por tarea.</gen>
    <do k="Qué hacer">Mide los minutos de QA por bug.</do>
  </b-finding>
</b-chapter>

<b-chapter id="stages" icon="lines" title="Tres partes del trabajo de QA y qué pasa con ellas">
  <b-why align="left">El trabajo de QA con un bug se divide en tres partes: investigación, descripción y documentación. Para cada una, las imágenes de abajo muestran cómo la hacía QA antes, qué hace el agente y qué se queda con una persona.</b-why>
  <b-view kind="pic">
    <b-lane-stack>
    <b-icon-lane icon="search-alt" title="Investigación">
      <b-art-plain name="bug-report-to-reproduction-agent/investigation"/>
    </b-icon-lane>
    </b-lane-stack>
  </b-view>
  <b-view kind="struct">
    <b-lane-stack>
    <b-icon-lane icon="search-alt" title="Investigación">
      <b-qa-row label="Antes">
        <node icon="user">QA</node>
        <node icon="refresh-cw">repetir</node>
        <node icon="scissors">recortar</node>
        <node icon="target">causa</node>
      </b-qa-row>
      <b-qa-row label="Después" now>
        <node icon="bot">Agente</node>
        <node icon="play">camino en el entorno</node>
        <node icon="scissors">acotación</node>
        <node icon="eye">QA revisa</node>
      </b-qa-row>
    </b-icon-lane>
    </b-lane-stack>
  </b-view>
  <b-why align="left">La investigación es la búsqueda del camino más corto hasta el bug. La queja de un cliente suele enumerar todo lo que hizo: inicio de sesión, catálogo, dirección, carrito, código promocional, pago. QA repetía esas acciones y quitaba las sobrantes una a una hasta que el bug dejaba de reproducirse. El agente hace lo mismo en un entorno de pruebas: quita una acción, comprueba si el bug sigue ahí y continúa hasta el mínimo. En el ejemplo, tres de seis acciones resultan necesarias. QA mira el camino acotado y comprueba que lo quitado realmente sobraba: el agente pudo tachar un paso sin el cual el bug en realidad no se reproduce.</b-why>
  <b-view kind="pic">
    <b-lane-stack>
    <b-icon-lane icon="lines" title="Descripción">
      <b-art-plain name="bug-report-to-reproduction-agent/description"/>
    </b-icon-lane>
    </b-lane-stack>
  </b-view>
  <b-view kind="struct">
    <b-lane-stack>
    <b-icon-lane icon="lines" title="Descripción">
      <b-qa-row label="Antes">
        <node icon="user">QA</node>
        <node icon="lines">pasos</node>
        <node icon="file-text">esperado / real</node>
        <node icon="doc-lines">estilo propio</node>
      </b-qa-row>
      <b-qa-row label="Después" now>
        <node icon="bot">Agente</node>
        <node icon="table">plantilla</node>
        <node icon="workflow">secuencia · C4</node>
      </b-qa-row>
    </b-icon-lane>
    </b-lane-stack>
  </b-view>
  <b-why align="left">La descripción es la redacción del informe del bug: pasos, resultado esperado y real, entorno. Antes, cada QA tenía su propio estilo, y el desarrollador tenía que volver a acostumbrarse. El agente rellena una única plantilla de informe, así que todos los informes se ven igual. Si la descripción no muestra dónde se rompe, QA pide un diagrama: un diagrama de secuencia (quién llama a quién y en qué orden) o un diagrama de la estructura del sistema (C4). QA compara la descripción con lo que vio personalmente y corrige las imprecisiones.</b-why>
  <b-view kind="pic">
    <b-lane-stack>
    <b-icon-lane icon="file-text" title="Documentación">
      <b-art-plain name="bug-report-to-reproduction-agent/documentation"/>
    </b-icon-lane>
    </b-lane-stack>
  </b-view>
  <b-view kind="struct">
    <b-lane-stack>
    <b-icon-lane icon="file-text" title="Documentación">
      <b-qa-row label="Antes">
        <node icon="user">QA</node>
        <node icon="image">capturas</node>
        <node icon="link">enlaces</node>
        <node icon="doc-lines">campos de Jira</node>
      </b-qa-row>
      <b-qa-row label="Después" now>
        <node icon="bot">Agente</node>
        <node icon="plug">MCP</node>
        <node icon="lines">Jira</node>
        <node icon="pencil">QA edita lo discutible</node>
      </b-qa-row>
    </b-icon-lane>
    </b-lane-stack>
  </b-view>
  <b-why align="left">La documentación es pasar el resultado a Jira: capturas, enlaces, campos del ticket. A mano es una tarea aparte que se come una parte notable del tiempo. El agente está conectado a Jira mediante MCP y escribe el comentario y los campos directamente en el ticket. QA abre el ticket, lee la entrada y corrige las partes discutibles: prioridad, redacción, adjuntos sobrantes.</b-why>
  <b-view kind="struct">
    <b-agents-lane title="Un QA, varios agentes a la vez" agents="agente · PAY-142|agente · PAY-143|agente · PAY-144" note="El tiempo de QA pasa a gestionar y aceptar" top="10">Cada una de las tres partes se ejecuta por bug en su propio agente, y QA lanza varios a la vez.</b-agents-lane>
  </b-view>
  <b-finding>
    <ex>La investigación, la descripción y la documentación van una tras otra y pasan por el agente. QA conserva la comprobación final y las partes discutidas.</ex>
    <gen>Las tres partes son acciones repetibles con un resultado claro, así que se pueden escribir y delegar. La decisión de «¿esto es un bug y qué importancia tiene?» se queda con una persona.</gen>
    <do k="Qué hacer">Divide tu trabajo con un bug en estas tres partes y marca cuál lleva más tiempo.</do>
  </b-finding>
</b-chapter>

<b-chapter id="mcp" icon="plug" title="MCP: el agente trabaja donde trabaja QA">
  <b-why>MCP (Model Context Protocol) es una forma de conectar un agente con los sistemas de trabajo para que lea y escriba en ellos por sí mismo en lugar de recibir un relato.</b-why>
  <b-why align="left">El agente necesita cinco cosas. Jira: lee el ticket y escribe el resultado en él. Un entorno de pruebas: una copia de prueba del producto donde recorre el camino como un usuario. Documentos: los diagramas y las descripciones están junto al ticket. Datos: datos de prueba que se pueden reiniciar. Permisos: solo se puede romper el entorno de pruebas, los sistemas de producción quedan fuera de alcance.</b-why>
  <b-view kind="pic">
    <b-art-plain name="bug-report-to-reproduction-agent/access-sandbox"/>
  </b-view>
  <b-view kind="struct">
    <b-node-grid>
      <node icon="lines" sw="1.8" t="Jira">lee el ticket, escribe el informe</node>
      <node icon="play" t="Entorno de pruebas">recorre el camino como un usuario</node>
      <node icon="file-text" sw="1.8" t="Documentos">diagramas y notas junto al ticket</node>
      <node icon="cylinder" t="Datos">datos de prueba, se pueden reiniciar</node>
      <node icon="shield-check" t="Permisos">solo se puede romper el entorno de pruebas</node>
    </b-node-grid>
  </b-view>
  <b-finding>
    <ex>Mediante MCP el agente lee PAY-142 en Jira, va al entorno de pruebas y escribe el resultado de vuelta. QA no copia nada entre ventanas.</ex>
    <gen>Sin conexiones con los sistemas hay que darle al agente un relato, y un relato pierde detalles. El entorno de pruebas es el lugar donde el agente puede probar y romper cosas sin tocar producción.</gen>
    <do k="Qué hacer">Empieza con dos conexiones: Jira y el entorno de pruebas. Añade el resto según haga falta.</do>
  </b-finding>
</b-chapter>

<b-chapter id="skill" icon="doc-square" title="Una skill: un proceso escrito en lugar de repetir a mano">
  <b-why>Una skill es una forma de trabajar escrita para el agente: pasos, una plantilla de informe, reglas. Otra persona y otro agente pueden repetirla.</b-why>
  <b-why align="left">Una skill lleva al agente por seis pasos. Lee el ticket, recorre el camino crítico en el entorno de pruebas, lo acota al mínimo, describe el bug según la plantilla, dibuja diagramas si se piden y escribe el resultado en Jira. Los tres primeros pasos son la investigación, el resto son la descripción y la documentación del capítulo anterior. Un error del agente vuelve a la skill como una regla nueva, para que no se repita la próxima vez.</b-why>
  <b-view kind="pic">
    <b-art-plain name="bug-report-to-reproduction-agent/skill-pipeline"/>
  </b-view>
  <b-view kind="struct">
    <b-lane title="Skill «reproducir un bug»" color="accent">
      <b-num-chain top="6">
        <step>leer el ticket</step>
        <step>recorrer el camino crítico en el entorno</step>
        <step>acotar hasta el mínimo</step>
      </b-num-chain>
      <b-num-chain start="4" top="10">
        <step>describir con la plantilla</step>
        <step>diagramas si se piden</step>
        <step>escribir en Jira</step>
      </b-num-chain>
    </b-lane>
    <b-agents-lane title="Un QA, varios agentes a la vez" agents="agente · PAY-142|agente · PAY-143|agente · PAY-144" note="El tiempo de QA pasa a gestionar y aceptar" top="10">Una skill, muchas ejecuciones: un agente por bug. El proceso escrito no exige que QA lo repita personalmente.</b-agents-lane>
    <b-chiprow top="12">
      <chip>los mismos pasos cada vez</chip>
      <chip>una plantilla de informe</chip>
      <chip>se transmite a los colegas</chip>
      <chip>se mejora con los errores</chip>
    </b-chiprow>
  </b-view>
  <b-finding>
    <ex>Los seis pasos se escriben una sola vez. Cualquier QA ejecuta la skill con un ticket nuevo y obtiene un informe con el mismo formato.</ex>
    <gen>Una skill convierte «cómo lo hago normalmente» en un proceso que no depende de quién esté de turno hoy. Un error del agente entra en la skill como una regla nueva, y la próxima vez desaparece.</gen>
    <do k="Qué hacer">Escribe tus pasos para un tipo de bug como una skill y ejecútala con tres tickets cerrados.</do>
  </b-finding>
</b-chapter>

<b-chapter id="parallel" icon="grid-alt" title="Un QA, varios agentes: el tiempo pasa a gestionar y aceptar">
  <b-why>Los bugs se pueden reproducir por distintos canales, y cada agente toma el suyo.</b-why>
  <b-why align="left">Antes (izquierda), QA recorre tres bugs uno tras otro. Ahora (derecha) trabajan tres agentes a la vez: uno en el navegador, uno a través del código, uno a través de la API. QA comprueba brevemente cada informe terminado, y el tiempo liberado se dedica a gestionar agentes y a la aceptación. En el modo «Estructura» lo mismo se muestra como barras de tiempo: arriba los bugs uno a uno, abajo los agentes en paralelo, y a QA le quedan tres cajas de aceptación (142, 143, 144).</b-why>
  <b-view kind="pic">
    <b-art-plain name="bug-report-to-reproduction-agent/parallel"/>
  </b-view>
  <b-view kind="struct">
    <b-node-grid min="170">
      <node icon="monitor-screen" t="Claude in Chrome">recorre el camino en un navegador</node>
      <node icon="flask" t="Código y tests">ejecución local, PoC sin navegador</node>
      <node icon="code" t="API">llama a las peticiones directamente</node>
    </b-node-grid>
    <b-art-plain name="bug-report-to-reproduction-agent/qa-time"/>
    <b-cap>Un esquema del principio; la escala es arbitraria, no una medición.</b-cap>
  </b-view>
  <b-finding>
    <ex>QA lanza agentes en PAY-142, PAY-143 y PAY-144 a la vez. Mientras trabajan, QA no se sienta sobre un solo bug sino que revisa uno a uno los resultados terminados.</ex>
    <gen>Antes, el tiempo de QA se sumaba a lo largo de todos los bugs seguidos. Ahora cada bug tiene su propio agente: por navegador, por código o por API, y QA conserva solo una comprobación breve. Cuantos más agentes se ejecutan, más tiempo de QA se dedica a gestionarlos y a revisar, no a la rutina.</gen>
    <do k="Qué hacer">Aumenta el número de agentes poco a poco: lo limitan el número de entornos, los conjuntos de datos de prueba y los límites de uso. Dedica el tiempo que QA ya no gasta en rutina a gestionar agentes, comprobar y mejorar la skill.</do>
  </b-finding>
</b-chapter>

<b-chapter id="example" icon="chat-square" title="Ejemplo: PAY-142 del ticket al informe">
  <b-why align="left">Un cliente escribió una línea al soporte: el pago con un código promocional falla. La imagen de abajo se lee de izquierda a derecha en tres pasos: la queja del cliente, el trabajo del agente, el resultado en Jira. Después cada paso se muestra en detalle con el ticket PAY-142.</b-why>
  <b-view kind="pic">
    <b-art-plain name="bug-report-to-reproduction-agent/complaint-to-report"/>
  </b-view>
  <b-why align="left">Paso 1: QA solo tiene la queja del cliente, sin pasos, y una captura del error. Paso 2: el agente recorre las seis acciones del cliente en el entorno de pruebas y quita las sobrantes una a una. Inicio de sesión, catálogo y dirección se tachan, quedan carrito, código promocional y pago, y el bug se reproduce con ellos: el servicio de promociones responde con el error 500. Paso 3: el agente escribe el informe y un diagrama en Jira, y QA abre el ticket y comprueba el resultado.</b-why>
  <b-why align="left">Este es el paso 1 en Jira: el titular del cliente, sin pasos de reproducción, con una captura del error adjunta. El agente parte de aquí.</b-why>
  <b-lane title="Ticket de Jira · una petición de un cliente pasada del soporte a QA" color="accent">
    <b-ticket key="PAY-142">El pago con tarjeta falla al introducir un código promocional</b-ticket>
    <b-chiprow start top="10">
      <chip>del cliente</chip>
      <chip>pasado por el soporte</chip>
      <chip>sin pasos</chip>
      <chip>captura del error</chip>
    </b-chiprow>
  </b-lane>
  <b-why align="left">Paso 2, primera parte: acotar el camino. El agente tachó inicio de sesión, catálogo y dirección porque el bug se mantiene sin ellos. Quedan carrito, código promocional y pago con tarjeta.</b-why>
  <b-lane title="Investigación: 6 acciones → quedan 3" color="accent" top="10">
    <b-chiprow start>
      <chip kind="del">inicio de sesión</chip>
      <chip kind="del">catálogo</chip>
      <chip kind="del">dirección</chip>
      <chip kind="on">carrito</chip>
      <chip kind="on">código promocional</chip>
      <chip kind="on">pago con tarjeta</chip>
      Acotación: el agente quita acciones una a una y tras cada una comprueba si el bug sigue reproduciéndose. Lo que el bug soporta que falte se tacha.
    </b-chiprow>
  </b-lane>
  <b-why align="left">Paso 2, segunda parte: el diagrama. Para que el desarrollador vea dónde se rompe, el agente dibuja un diagrama de secuencia. Arriba hay cuatro participantes, las flechas bajan en orden temporal, las naranjas muestran el error: el servicio de promociones respondió con el error 500 y el pago falló.</b-why>
  <b-lane title="Si se pide · diagrama de secuencia" color="accent" top="10">
    <b-art-plain name="bug-report-to-reproduction-agent/promo-sequence"/>
  </b-lane>
  <b-why align="left">Paso 3: la entrada en Jira. El agente escribe el resultado como un comentario en PAY-142: pasos, qué se esperaba, qué ocurrió, el entorno y dónde buscar la causa.</b-why>
  <b-lane title="Descripción y registro en Jira · comentario en PAY-142" color="accent" top="10">
    <b-kv-rows>
      <row k="Pasos">carrito → código promocional → pago con tarjeta</row>
      <row k="Esperado">el pago se completa con el descuento</row>
      <row k="Real">«el pago ha fallado», el servicio de promociones devuelve el error 500</row>
      <row k="Entorno">entorno de pruebas, tarjeta de prueba</row>
      <row k="Dónde buscar">la llamada al servicio de promociones desde pagos (véase el diagrama)</row>
    </b-kv-rows>
  </b-lane>
  <b-view kind="struct">
    <b-agents-lane title="Un QA, varios agentes a la vez" agents="agente · PAY-142|agente · PAY-143|agente · PAY-144" note="El tiempo de QA pasa a gestionar y aceptar" top="10">Mientras el agente se ocupa de PAY-142, otros agentes toman PAY-143 y PAY-144, y QA comprueba lo que ya está hecho.</b-agents-lane>
  </b-view>
  <b-why align="left">De una línea del cliente salieron un camino corto, un diagrama y un informe terminado. QA no los armó: QA abre el informe, repite los pasos a mano y confirma que es el mismo bug.</b-why>
  <b-cap>El ticket y todos los nombres son inventados para el ejemplo.</b-cap>
  <b-finding>
    <ex>De una línea del cliente salieron un camino corto de tres acciones, un diagrama y un informe listo en Jira. QA no hizo esto; QA revisa el resultado.</ex>
    <gen>Cada una de las tres partes del trabajo de QA dejó una huella visible: un camino acotado, un diagrama, un registro. Así el resultado se puede comprobar en minutos en lugar de reconstruirse de memoria.</gen>
    <do k="Qué hacer">Pide al agente que muestre el camino acotado y el registro: enseñan de inmediato si fue por mal camino.</do>
  </b-finding>
</b-chapter>

<b-chapter id="human" icon="eye" title="Qué conserva QA">
  <b-why align="left">QA está en la puerta de aceptación. El agente trae un informe, y QA responde a cuatro preguntas: ¿es el camino correcto?, ¿es el error correcto?, ¿se acotó bien? y ¿qué importancia tiene? Si el bug se reproduce a mano, el ticket pasa al desarrollador. Si no, el informe vuelve al agente.</b-why>
  <b-view kind="pic">
    <b-art-plain name="bug-report-to-reproduction-agent/acceptance-gate"/>
  </b-view>
  <b-view kind="struct">
    <b-node-grid>
      <node icon="check" t="Camino correcto">recorre los pasos a mano en el entorno</node>
      <node icon="check" t="Error correcto">coincide con la captura del cliente</node>
      <node icon="check" t="Acotación correcta">los pasos tachados realmente sobran</node>
      <node icon="check" t="Qué importancia tiene">una persona decide gravedad y prioridad</node>
      <node icon="check" t="Mejora la skill">error del agente → regla nueva</node>
    </b-node-grid>
    <b-agents-lane title="Un QA, varios agentes a la vez" agents="agente · PAY-142|agente · PAY-143|agente · PAY-144" note="El tiempo de QA pasa a gestionar y aceptar" top="10">El tiempo que QA ya no gasta en rutina con cada bug se dedica a gestionar agentes, comprobar, priorizar y mejorar la skill.</b-agents-lane>
  </b-view>
  <b-finding>
    <ex>QA abre el entorno, repite a mano los pasos del informe y confirma que es el bug que describió el cliente. Después el ticket pasa al desarrollador como antes; si falla, el informe vuelve al agente.</ex>
    <gen>Un modelo se confirma a sí mismo con facilidad, y los detalles inventados parecen hallazgos. Por eso la última palabra se queda con una persona que mira con sus propios ojos. El trabajo de QA pasa de ejecutar la rutina a comprobar y mejorar el proceso.</gen>
    <do k="Qué hacer">Acuerda que un informe que QA no pudo repetir a mano no pasa al desarrollador.</do>
  </b-finding>
</b-chapter>

<b-chapter id="first" icon="shield-check" title="Cómo empezar">
  <b-why align="left">Lo mejor es empezar con bugs cerrados, donde ya se conoce la respuesta. Paso 1: conecta Jira y un entorno de pruebas al agente mediante MCP. Paso 2: escribe tus pasos para un tipo de bug como una skill. Paso 3: ejecuta la skill con cinco bugs cerrados del mes pasado y compara los informes del agente con lo que sabes de esos bugs. Donde el agente se equivocó, añade una regla a la skill. Un QA comprueba el resultado a mano.</b-why>
  <b-view kind="pic">
    <b-art-plain name="bug-report-to-reproduction-agent/start-steps"/>
  </b-view>
  <b-view kind="struct">
    <b-num-chain>
      <step>conectar Jira y el entorno mediante MCP</step>
      <step>escribir los pasos de QA como una skill</step>
      <step>ejecutar con 5 bugs cerrados y añadir reglas</step>
    </b-num-chain>
  </b-view>
  <b-finding>
    <ex>Con bugs cerrados la respuesta se conoce, así que se ve dónde se equivocó el agente o la skill.</ex>
    <gen>Es más seguro lanzar un escenario nuevo con tareas de resultado conocido, convirtiendo cada error en una regla de la skill.</gen>
    <do k="Qué hacer">Empieza con cinco bugs del mes pasado y un QA que compruebe el resultado a mano.</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Preguntas frecuentes">
  <b-faq-cards>
    <q t="¿Qué trabajo de QA se puede delegar en un agente de IA?">Investigar, describir y documentar un bug: son acciones repetibles con un resultado claro. Decidir si es un bug y qué importancia tiene se queda con una persona.</q>
    <q t="¿Por qué necesita el agente MCP para el trabajo de QA?">Mediante MCP el agente trabaja en los mismos sistemas que QA, Jira y el entorno de pruebas, y lee los hechos en la fuente en lugar de en un relato.</q>
    <q t="¿Qué aporta una skill?">Un proceso escrito que no depende de quién esté de turno. Un error del agente entra en la skill como una regla nueva y no se repite.</q>
    <q t="¿Qué le queda a QA?">Comprobar a mano el resultado del agente y aceptarlo: QA gestiona varios agentes y decide qué aceptar.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" icon="arrow-right" title="Siguiente lectura">
  <b-links>
    <item href="/blog/specs-rules-skills/" k="Skills" t="Specs, reglas y skills">qué debe saber un agente de un proyecto</item>
    <item href="/blog/harness-driven-development/" k="Ciclo de errores" t="Harness-Driven Development">cómo los errores del agente se convierten en reglas</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="Entorno" t="Comparación de harnesses">dónde trabaja el agente y qué ve</item>
  </b-links>
</b-chapter>
<b-footer>El ticket PAY-142 y el diagrama son inventados para el ejemplo.</b-footer>
</b-post>
