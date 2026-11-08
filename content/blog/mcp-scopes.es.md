---
title: Qué son los ámbitos de MCP en Claude Code: local, proyecto y usuario; dónde vive un servidor y quién lo ve
date: 2026-10-05
updated: 2026-11-08
description: Los tres ámbitos de los servidores MCP en Claude Code: local, proyecto y usuario. Dónde vive la configuración, quién la ve, qué gana cuando los nombres coinciden, cómo compartir servidores con un equipo y mantener los secretos fuera de los commits.
tags: IA, agentes, MCP, Claude Code, equipo, harness
category: harness
layout: wide
mentions: MCP, Model Context Protocol, Claude Code, mcp scope, .mcp.json, environment variables
toc: what=Tres ámbitos | pick=Cuál elegir | order=Qué gana | team=Proyecto para un equipo | secrets=Secretos | first=Por dónde empezar | faq=Preguntas | next=Siguiente
---

El ámbito de un servidor MCP responde a dos preguntas: en qué proyectos funciona y quién lo ve. Claude Code tiene tres ámbitos: local, proyecto y usuario. Abajo: en qué se diferencian, cuál elegir, qué gana cuando los nombres coinciden y cómo compartir servidores con un equipo. Qué es MCP y cómo conectarlo está en el artículo [Qué es MCP para un agente de IA](/blog/mcp-agent-access/).

<b-post series="harness">

<b-chapter id="what" icon="layers" title="Tres ámbitos">
  <iso-art name="mcp-scopes/scopes"></iso-art>
  <b-table code="prose">
| Ámbito | Funciona en | Quién lo ve | Se guarda en |
|---|---|---|---|
| Local | el proyecto actual | solo tú | `~/.claude.json` |
| Proyecto | el proyecto actual | todo el equipo, mediante el repositorio | `.mcp.json` en la raíz |
| Usuario | todos tus proyectos | solo tú | `~/.claude.json` |
  </b-table>
  <b-finding>
    <ex>El mismo servidor se puede conectar solo para ti en un proyecto, para todo el equipo o para todos tus proyectos.</ex>
    <gen>Local es el valor por defecto: el servidor es visible solo para ti y solo en este proyecto.</gen>
    <do k="Qué hacer">Mira en qué ámbito vive cada uno de tus servidores: claude mcp list.</do>
  </b-finding>
</b-chapter>

<b-chapter id="pick" icon="help" title="Cuál elegir">
  <b-say-agent title="Díselo al agente">Muestra en qué ámbitos están configurados mis servidores MCP y sugiere cuáles pasar a proyecto para el equipo.</b-say-agent>
  <b-why align="left">El agente ejecuta los comandos por sí mismo: claude mcp list y claude mcp get.</b-why>
  <b-spoiler summary="Cómo hacerlo a mano">
    <iso-art name="mcp-scopes/what-where"></iso-art>
    <b-codebox copy>
      # local — the default
      claude mcp add --transport http stripe https://mcp.stripe.com
      # project — the whole team, .mcp.json file
      claude mcp add --transport http shared-server --scope project https://example.com/mcp
      # user — all your projects
      claude mcp add --transport http hubspot --scope user https://mcp.hubspot.com/anthropic
    </b-codebox>

Lista de servidores: `claude mcp list`; detalles: `claude mcp get <name>`; eliminar: `claude mcp remove <name>`; dentro de Claude Code: `/mcp`.

  </b-spoiler>
  <b-finding>
    <ex>Un experimento empieza en local, una herramienta compartida vive en proyecto, una utilidad personal en usuario.</ex>
    <gen>El ámbito decide quién ve el servidor y dónde vive su configuración.</gen>
    <do k="Qué hacer">Añade una herramienta compartida con --scope project y una personal con --scope user.</do>
  </b-finding>
</b-chapter>

<b-chapter id="order" icon="layers" title="Qué gana cuando los nombres coinciden">
  <b-why>Si un servidor con el mismo nombre existe en varios lugares, se usa entera la entrada de la capa más alta.</b-why>
  <iso-art name="mcp-scopes/priority-layers"></iso-art>
  <b-finding>
    <ex>Local anula a proyecto y a usuario, proyecto anula a usuario, y por debajo quedan los plugins, los conectores de claude.ai y el MCP gestionado.</ex>
    <gen>Una entrada personal anula en bloque a una compartida con el mismo nombre: los campos de las dos entradas no se combinan.</gen>
    <do k="Qué hacer">Da nombres distintos a los servidores personales para que no anulen a los compartidos.</do>
  </b-finding>
</b-chapter>

<b-chapter id="team" icon="git-branch" title="Proyecto: configuración compartida para el equipo">
  <b-rules sw="1.8">
    <rule icon="folder-tab" t=".mcp.json">El archivo está en la raíz del proyecto, en el repositorio: todo el equipo recibe los mismos servidores.</rule>
    <rule icon="bell" t="Aprobación">En una sesión interactiva Claude Code pregunta antes de usar los servidores de .mcp.json.</rule>
    <rule icon="users" t="Sin aviso">En ejecuciones no interactivas (claude -p, el Agent SDK, sesiones en la nube) los servidores se cargan sin preguntar.</rule>
    <rule icon="lock" t="Confianza en la carpeta">En una carpeta no fiable el servidor espera aprobación («Pending approval») hasta el diálogo de confianza.</rule>
    <rule icon="ban" t="Desactivar">Añade un servidor no deseado a disabledMcpjsonServers; claude mcp reset-project-choices borra las elecciones de aprobación.</rule>
  </b-rules>
  <b-finding>
    <ex>Un archivo en el repositorio hace compartida la configuración del agente: un miembro nuevo recibe los servidores junto con el código.</ex>
    <gen>La aprobación protege de un servidor ajeno en el trabajo interactivo, mientras que en las ejecuciones automáticas el servidor se activa de inmediato.</gen>
    <do k="Qué hacer">Revisa .mcp.json en la revisión de código como cualquier otro código.</do>
  </b-finding>
</b-chapter>

<b-chapter id="secrets" icon="key" title="Secretos en .mcp.json">
  <b-why>El archivo guarda nombres de variables de entorno. ${VAR} inserta el valor y ${VAR:-default} fija un valor de reserva. La expansión funciona en command, args, env, url y headers.</b-why>
  <iso-art name="mcp-scopes/env-keys"></iso-art>
  <b-codebox copy>
    {
      "mcpServers": {
        "api-server": {
          "type": "http",
          "url": "${API_BASE_URL:-https://api.example.com}/mcp",
          "headers": { "Authorization": "Bearer ${API_KEY}" }
        }
      }
    }
  </b-codebox>

Si una variable no está definida y no tiene valor por defecto, la configuración se carga tal cual, y claude mcp list y /mcp muestran una advertencia. Las credenciales de Claude Code (ANTHROPIC_API_KEY, ANTHROPIC_AUTH_TOKEN) y algunas otras se leen vacías en url y headers: copia el valor a una variable con otro nombre.

  <b-finding>
    <ex>El repositorio guarda ${API_KEY}, y cada desarrollador guarda la clave real en su propia variable de entorno.</ex>
    <gen>Así el archivo compartido es seguro de subir en un commit.</gen>
    <do k="Qué hacer">Quita las claves de .mcp.json y sustitúyelas por variables.</do>
  </b-finding>
</b-chapter>

<b-chapter id="first" icon="flag" title="Por dónde empezar">
  <iso-art name="mcp-scopes/steps"></iso-art>
  <b-finding>
    <ex>Tres pasos: mirar, compartir, ocultar las claves.</ex>
    <gen>Primero poner orden en tus propios servidores, luego la configuración compartida para el equipo.</gen>
    <do k="Qué hacer">Ejecuta claude mcp list y encuentra un servidor que todo el equipo necesite.</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Preguntas frecuentes">
  <b-faq-cards>
    <q t="¿Qué ámbitos de MCP tiene Claude Code?">Tres: local, para ti en el proyecto actual; proyecto, para todo el equipo mediante un archivo .mcp.json en el repositorio; y usuario, para ti en todos tus proyectos.</q>
    <q t="¿Qué ámbito es el predeterminado?">Local: el servidor es visible solo para ti y solo en este proyecto.</q>
    <q t="¿Qué pasa cuando los nombres de servidor coinciden?">La entrada personal anula por completo a la compartida con el mismo nombre: los campos de las dos entradas no se combinan.</q>
    <q t="¿Cómo se comparte un servidor MCP con el equipo?">Añádelo al ámbito de proyecto: el ajuste va al repositorio, y los secretos se quedan en variables de entorno.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Siguiente">
  <b-links>
    <item href="/blog/mcp-agent-access/" k="Base" t="Qué es MCP para un agente de IA: qué problema resuelve y cómo delegar la configuración en el agente">Qué es MCP y cómo conectarlo</item>
    <item href="/blog/claude-in-chrome/" k="Navegador" t="Claude in Chrome: cómo trabaja el agente en tu navegador — pruebas, depuración y formularios con tu sesión iniciada">El agente en tu navegador</item>
    <item href="/blog/bug-report-to-reproduction-agent/" k="Ejemplo" t="Cómo hacer QA con un agente de IA tras el soporte: investigar, describir y documentar mediante MCP y skills">El agente reproduce un bug de Jira</item>
  </b-links>
</b-chapter>
<b-footer>Los datos sobre ámbitos y precedencia siguen la documentación de Claude Code: <a href="https://code.claude.com/docs/en/mcp#mcp-installation-scopes" target="_blank" rel="noopener">MCP installation scopes</a>.</b-footer>
</b-post>
