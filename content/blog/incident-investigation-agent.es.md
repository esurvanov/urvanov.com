---
title: Cómo investigar un incidente con un agente de IA: errores de Sentry y métricas de Grafana en una sola imagen mediante MCP
date: 2026-10-05
updated: 2026-11-08
description: Cómo investigar un incidente con un agente de IA: conecta Sentry y Grafana mediante MCP, haz que cruce errores, métricas y hora del release, limita los permisos y verifica la hipótesis.
tags: IA, agentes, MCP, Sentry, Grafana, incidentes, harness
category: harness
layout: wide
mentions: MCP, Model Context Protocol, Sentry, Grafana, incident investigation, observability, Claude Code
toc: flow=Cómo transcurre | connect=Conexión | timeline=Qué cruza el agente | rights=Permisos y riesgos | first=Por dónde empezar | faq=Preguntas | next=Siguiente
---

Durante un incidente una persona salta entre Sentry, Grafana y el chat y arma el cuadro por sí misma. Un agente de IA con acceso a ambos sistemas reúne errores, métricas y horas de los eventos en un único borrador, mientras una persona comprueba la hipótesis y decide qué hacer. Abajo: cómo transcurre, cómo conectar Sentry y Grafana y qué permisos dar. Lo básico está en el artículo [Qué es MCP para un agente de IA](/blog/mcp-agent-access/).

<b-post series="harness">

<b-chapter id="flow" icon="bug" title="Cómo transcurre la investigación">
  <iso-art name="incident-investigation-agent/before-after"></iso-art>
  <b-finding>
    <ex>El agente lee los errores en Sentry y los gráficos en Grafana, y una persona recibe un único borrador de la investigación.</ex>
    <gen>Sentry y Grafana se conectan mediante MCP en modo de solo lectura, así que el agente no cambia nada sin tu permiso. Una persona comprueba la hipótesis.</gen>
    <do k="Qué hacer">Haz una lista de los sistemas en los que buscaste la causa en tu último incidente.</do>
  </b-finding>
</b-chapter>

<b-chapter id="connect" icon="plug" title="Cómo conectar Sentry y Grafana">
  <b-say-agent title="Díselo al agente">Conecta Sentry y Grafana en solo lectura. Encuentra en Sentry los errores nuevos del servicio de pagos en la última hora, encuentra en Grafana cuándo creció la proporción de respuestas 5xx y cruza esto con la hora del release. Propón una hipótesis y nombra la fuente de cada hecho.</b-say-agent>
  <b-why align="left">El agente ejecuta los comandos por sí mismo; tú solo inicias sesión en Sentry en el navegador y proporcionas un token de Grafana. [Si el agente te pide que lo hagas tú](/blog/agent-hands-work-back-to-you/).</b-why>
  <b-spoiler summary="Cómo hacerlo a mano">
    <iso-art name="incident-investigation-agent/setup-steps"></iso-art>

#### Sentry

    <b-codebox copy>
      claude mcp add --transport http sentry https://mcp.sentry.dev/mcp
      /mcp   # sign in through the browser (OAuth)
    </b-codebox>

El inicio de sesión usa OAuth, y los tokens se guardan y se renuevan automáticamente.

#### Grafana

    <b-codebox copy>
      claude mcp add --transport stdio \
        --env GRAFANA_URL=https://myinstance.grafana.net \
        --env GRAFANA_SERVICE_ACCOUNT_TOKEN=$GRAFANA_TOKEN \
        grafana -- uvx mcp-grafana --disable-write
    </b-codebox>

Este es el servidor oficial <a href="https://github.com/grafana/mcp-grafana" target="_blank" rel="noopener">grafana/mcp-grafana</a>. El token sale de una cuenta de servicio con permisos mínimos, y la opción --disable-write prohíbe los cambios.

  </b-spoiler>
  <b-finding>
    <ex>El agente conecta ambos sistemas, encuentra los errores y el gráfico, los cruza con el release y nombra las fuentes.</ex>
    <gen>Ambos sistemas se conectan con un comando, y el acceso de lectura mantiene segura la investigación.</gen>
    <do k="Qué hacer">Delega la conexión en el agente y compara su resultado con lo que ves tú mismo en Sentry y Grafana.</do>
  </b-finding>
</b-chapter>

<b-chapter id="timeline" icon="lines" title="Qué cruza el agente">
  <iso-art name="incident-investigation-agent/event-timeline"></iso-art>
  <b-finding>
    <ex>El release, el pico de errores y la alerta van en una misma línea temporal, y se ve qué pasó primero.</ex>
    <gen>Una coincidencia en el tiempo da una hipótesis y no prueba la causa: la comprobación se queda con una persona.</gen>
    <do k="Qué hacer">Pide un enlace a un gráfico o evento con cada conclusión.</do>
  </b-finding>
</b-chapter>

<b-chapter id="rights" icon="shield-check" title="Permisos y riesgos">
  <iso-art name="incident-investigation-agent/rights-ladder"></iso-art>
  <b-rules sw="1.8">
    <rule icon="key" t="Token">Una cuenta de servicio de Grafana con permisos mínimos; el valor vive en una variable de entorno.</rule>
    <rule icon="lock" t="Solo lectura">La opción --disable-write prohíbe los cambios, incluida la creación de incidentes.</rule>
    <rule icon="ban" t="Servidor de terceros">Conecta solo servidores de confianza: los servidores que leen texto externo abren la puerta a la inyección de prompts.</rule>
  </b-rules>
  <b-finding>
    <ex>El agente lee errores y gráficos, y no puede cambiar nada en los sistemas.</ex>
    <gen>Los permisos se dan por fuente, y los más amplios se quedan cerrados.</gen>
    <do k="Qué hacer">Crea una cuenta de servicio de solo lectura y conecta Grafana con la opción --disable-write.</do>
  </b-finding>
</b-chapter>

<b-chapter id="first" icon="flag" title="Por dónde empezar">
  <iso-art name="incident-investigation-agent/start-steps"></iso-art>
  <b-finding>
    <ex>Tres pasos: Sentry, Grafana, una prueba con un incidente pasado.</ex>
    <gen>Conoces el incidente pasado, así que puedes ver dónde encontró el agente la causa y dónde se equivocó.</gen>
    <do k="Qué hacer">Toma un incidente cerrado y pide al agente que encuentre la causa mediante Sentry y Grafana.</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Preguntas frecuentes">
  <b-faq-cards>
    <q t="¿Cómo ayuda un agente de IA a investigar un incidente?">Reúne errores de Sentry, métricas de Grafana y horas de los eventos en un único borrador, y una persona comprueba la hipótesis y decide qué hacer.</q>
    <q t="¿Cómo se conectan Sentry y Grafana a un agente?">Mediante MCP, con un comando y con acceso de solo lectura.</q>
    <q t="¿Se puede confiar en la conclusión del agente?">Una coincidencia en el tiempo da una hipótesis y no prueba la causa. La comprobación se queda con una persona.</q>
    <q t="¿Qué permisos debe recibir el agente?">Por separado para cada fuente, de solo lectura; los permisos más amplios se quedan cerrados.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Siguiente">
  <b-links>
    <item href="/blog/mcp-agent-access/" k="Base" t="Qué es MCP para un agente de IA: qué problema resuelve y cómo delegar la configuración en el agente">Qué es MCP y cómo conectarlo</item>
    <item href="/blog/analytics-reports-agent/" k="Otro caso" t="Informes analíticos con un agente de IA">Base de datos, hojas y documentos mediante MCP</item>
    <item href="/blog/mcp-scopes/" k="Configuración" t="Qué son los ámbitos de MCP en Claude Code: local, proyecto y usuario; dónde vive un servidor y quién lo ve">Dónde vive un servidor y quién lo ve</item>
  </b-links>
</b-chapter>
<b-footer>El incidente es inventado. La conexión de Sentry sigue la documentación de Claude Code: <a href="https://code.claude.com/docs/en/mcp" target="_blank" rel="noopener">MCP</a>, la de Grafana sigue el repositorio <a href="https://github.com/grafana/mcp-grafana" target="_blank" rel="noopener">grafana/mcp-grafana</a>.</b-footer>
</b-post>
