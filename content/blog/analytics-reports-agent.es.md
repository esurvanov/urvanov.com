---
title: Cómo hacer informes analíticos con un agente de IA: datos de una base de datos, hojas y documentos mediante MCP
date: 2026-10-05
updated: 2026-11-13
description: Cómo construir un informe analítico con un agente de IA: conectar una base de datos de solo lectura mediante MCP, delegar las consultas y el resumen, comprobar una cifra a mano y fijar permisos por fuente.
tags: IA, agentes, MCP, analítica, informes, base de datos, harness
category: harness
layout: wide
mentions: MCP, Model Context Protocol, analytics, reports, SQL, database, Claude Code, permissions
toc: flow=Cómo se construye un informe | access=Fuentes y permisos | connect=Conexión | verify=Comprobación | first=Por dónde empezar | faq=Preguntas | next=Siguiente
---

Un informe hecho a mano es una exportación de una base de datos, una tabla, un gráfico y un texto, y cada paso espera a una persona. Un agente con acceso a las fuentes recorre la cadena por sí mismo, mientras una persona comprueba las cifras y decide qué hacer después. Abajo: cómo se ve, qué permisos dar por fuente, cómo conectar la base de datos y verificar el resultado. Lo básico está en el artículo [MCP para un agente de IA](/blog/mcp-agent-access/).

<b-post series="harness">

<b-chapter id="flow" icon="grid-alt" title="Cómo se construye un informe">
  <iso-art name="analytics-reports-agent/before-after"></iso-art>
  <b-finding>
    <ex>A mano, una persona traslada datos entre la base de datos, la tabla, el gráfico y el texto. Con un agente recibe un borrador listo y comprueba las cifras.</ex>
    <gen>Las fuentes se conectan al agente mediante MCP. Cada paso de la cadena se repite y da un resultado claro, así que puede pasar a un agente. Qué significan las cifras es una decisión humana.</gen>
    <do k="Qué hacer">Enumera los pasos de tu último informe y marca cuáles son copiar.</do>
  </b-finding>
</b-chapter>

<b-chapter id="access" icon="lock" title="Fuentes y permisos">
  <b-why>Sistemas, datos y documentos fuera de la conversación. Los permisos se fijan por separado para cada fuente.</b-why>
  <iso-art name="analytics-reports-agent/source-rights"></iso-art>
  <b-finding>
    <ex>Jira, los documentos y la base de datos están abiertos para lectura, la hoja para escritura con confirmación, y solo el [entorno de pruebas](/materials/glossary/test-stand/) se puede romper.</ex>
    <gen>El agente ve exactamente lo que está conectado y hace exactamente lo que está permitido.</gen>
    <do k="Qué hacer">Para cada fuente escribe una palabra: leer, escribir o solo entorno de pruebas.</do>
  </b-finding>
</b-chapter>

<b-chapter id="connect" icon="plug" title="Cómo conectar la base de datos">
  <b-say-agent title="Díselo al agente">Conecta la base de datos de analítica como solo lectura. Muestra el esquema de la tabla de pedidos y calcula los ingresos de este mes. Muestra la consulta que usaste.</b-say-agent>
  <b-why align="left">El agente ejecuta él mismo el comando de conexión. [Si el agente te pide que lo hagas tú](/blog/agent-hands-work-back-to-you/).</b-why>
  <b-spoiler summary="Cómo hacerlo a mano">
    <iso-art name="analytics-reports-agent/setup-steps"></iso-art>
    <b-codebox copy>
      claude mcp add --transport stdio db -- npx -y @bytebase/dbhub \
        --dsn "postgresql://readonly:pass@prod.db.com:5432/analytics"
    </b-codebox>

Crea el usuario como solo lectura para que las consultas del agente no puedan cambiar nada. Ejemplos de prompts de la documentación: «What’s our total revenue this month?», «Show me the schema for the orders table».

  </b-spoiler>
  <b-finding>
    <ex>El agente conecta la base de datos, mira el esquema, calcula los ingresos y muestra la consulta.</ex>
    <gen>Los derechos de solo lectura mantienen seguras las consultas: el agente no puede cambiar datos.</gen>
    <do k="Qué hacer">Crea un usuario de base de datos de solo lectura y conéctalo primero.</do>
  </b-finding>
</b-chapter>

<b-chapter id="verify" icon="shield-check" title="Cómo comprobar el informe">
  <iso-art name="analytics-reports-agent/check-number"></iso-art>
  <b-finding>
    <ex>El agente muestra la consulta y el resultado, una persona recalcula una cifra de otra manera.</ex>
    <gen>El modelo calcula con una consulta, y una consulta se puede releer. Una cifra que coincide aumenta la confianza en el resto.</gen>
    <do k="Qué hacer">Comprueba a mano una cifra del informe antes de enviarlo.</do>
  </b-finding>
</b-chapter>

<b-chapter id="first" icon="flag" title="Por dónde empezar">
  <iso-art name="analytics-reports-agent/start-steps"></iso-art>
  <b-finding>
    <ex>Tres pasos: una base de datos de solo lectura, un informe, comprobar una cifra.</ex>
    <gen>Empieza con un informe cuyas cifras ya conoces: así se ve dónde se equivocó el agente.</gen>
    <do k="Qué hacer">Hoy crea un usuario de solo lectura y pide al agente que calcule una cifra conocida.</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Preguntas frecuentes">
  <b-faq-cards>
    <q t="¿Cómo construye un agente de IA un informe analítico?">Recorre él mismo la cadena: exportación de la base de datos, tabla, gráfico y texto. Una persona comprueba las cifras y decide qué hacer después.</q>
    <q t="¿Cómo se conecta una base de datos a un agente?">Mediante MCP con derechos de solo lectura: el agente no puede cambiar los datos.</q>
    <q t="¿Cómo se comprueba el informe de un agente?">Relee las consultas que usó y compara una o dos cifras con otras conocidas: una coincidencia aumenta la confianza en el resto.</q>
    <q t="¿Qué ve el agente en las fuentes?">Exactamente lo que se conectó, y hace exactamente lo que está permitido.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Siguiente">
  <b-links>
    <item href="/blog/mcp-agent-access/" k="Base" t="MCP para un agente de IA: qué problema resuelve y cómo encargar la conexión al agente">Qué es MCP y cómo conectarlo</item>
    <item href="/blog/incident-investigation-agent/" k="Otro caso" t="Investigación de incidentes con un agente de IA">Sentry y Grafana mediante MCP</item>
    <item href="/blog/work-prompts-examples/" k="Práctica" t="Prompts para tareas de trabajo: cinco partes y seis ejemplos para ChatGPT y Claude">El ejemplo del «análisis de tabla»</item>
  </b-links>
</b-chapter>
<b-footer>El ejemplo es inventado. El comando de conexión de la base de datos y el consejo del usuario de solo lectura siguen la documentación de Claude Code: <a href="https://code.claude.com/docs/en/mcp" target="_blank" rel="noopener">Connect Claude Code to tools via MCP</a>.</b-footer>
</b-post>
