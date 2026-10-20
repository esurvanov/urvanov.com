---
title: MCP scopes in Claude Code: local, project and user — where a server lives and who sees it
date: 2026-10-05
description: The three MCP server scopes in Claude Code: local, project and user. Where the setup lives, who sees it, what wins when names collide, how to share servers with a team and keep secrets out of commits.
tags: AI, agents, MCP, Claude Code, team, harness
category: harness
layout: wide
mentions: MCP, Model Context Protocol, Claude Code, mcp scope, .mcp.json, environment variables
toc: what=Three scopes | pick=Which to pick | order=What wins | team=Project for a team | secrets=Secrets | first=Where to start | next=Next
---

An MCP server’s scope answers two questions: which projects it works in and who sees it. Claude Code has three scopes: local, project and user. Below: how they differ, which to pick, what wins when names collide and how to share servers with a team. What MCP is and how to connect it is in the [MCP for an AI agent](/blog/mcp-agent-access/) article.

<b-post series="harness">

<b-chapter id="what" icon="layers" title="Three scopes">
  <iso-art name="mcp-scopes/scopes"></iso-art>
  <b-table code="prose">
| Scope | Works in | Who sees it | Stored in |
|---|---|---|---|
| Local | current project | only you | `~/.claude.json` |
| Project | current project | the whole team, via the repo | `.mcp.json` in the root |
| User | all your projects | only you | `~/.claude.json` |
  </b-table>
  <b-finding>
    <ex>The same server can be connected for yourself in one project, for the whole team, or for all your projects.</ex>
    <gen>Local is the default: the server is visible only to you and only in this project.</gen>
    <do k="What to do">See which scope each of your servers lives in: claude mcp list.</do>
  </b-finding>
</b-chapter>

<b-chapter id="pick" icon="help" title="Which one to pick">
  <b-say-agent title="Tell the agent">Show which scopes my MCP servers are configured in and suggest which ones to move to project for the team.</b-say-agent>
  <b-why align="left">The agent runs the commands itself: claude mcp list and claude mcp get.</b-why>
  <b-spoiler summary="How to do it by hand">
    <iso-art name="mcp-scopes/what-where"></iso-art>
    <b-codebox copy>
      # local — the default
      claude mcp add --transport http stripe https://mcp.stripe.com
      # project — the whole team, .mcp.json file
      claude mcp add --transport http shared-server --scope project https://example.com/mcp
      # user — all your projects
      claude mcp add --transport http hubspot --scope user https://mcp.hubspot.com/anthropic
    </b-codebox>

Server list: `claude mcp list`; details: `claude mcp get <name>`; remove: `claude mcp remove <name>`; inside Claude Code: `/mcp`.

  </b-spoiler>
  <b-finding>
    <ex>An experiment starts in local, a shared tool lives in project, a personal utility in user.</ex>
    <gen>The scope decides who sees the server and where its configuration lives.</gen>
    <do k="What to do">Add a shared tool with --scope project and a personal one with --scope user.</do>
  </b-finding>
</b-chapter>

<b-chapter id="order" icon="layers" title="What wins when names collide">
  <b-why>If a server with the same name exists in several places, the entry from the topmost layer is used whole.</b-why>
  <iso-art name="mcp-scopes/priority-layers"></iso-art>
  <b-finding>
    <ex>Local overrides project and user, project overrides user, and plugins, claude.ai connectors and managed MCP sit below.</ex>
    <gen>A personal entry overrides a shared one with the same name as a whole: fields of the two entries are not merged.</gen>
    <do k="What to do">Give personal servers different names so they do not override shared ones.</do>
  </b-finding>
</b-chapter>

<b-chapter id="team" icon="git-branch" title="Project: shared setup for the team">
  <b-rules sw="1.8">
    <rule icon="folder" t=".mcp.json">The file sits in the project root, in the repository: the whole team gets the same servers.</rule>
    <rule icon="bell" t="Approval">In an interactive session Claude Code asks before using servers from .mcp.json.</rule>
    <rule icon="users" t="No prompt">In non-interactive runs (claude -p, the Agent SDK, cloud sessions) servers load without a prompt.</rule>
    <rule icon="lock" t="Folder trust">In an untrusted folder the server waits for approval (“Pending approval”) until the trust dialog.</rule>
    <rule icon="ban" t="Disable">Add an unwanted server to disabledMcpjsonServers; claude mcp reset-project-choices clears approval choices.</rule>
  </b-rules>
  <b-finding>
    <ex>A file in the repository makes the agent setup shared: a new member gets the servers together with the code.</ex>
    <gen>Approval guards against a stranger’s server in interactive work, while in automated runs the server turns on at once.</gen>
    <do k="What to do">Review .mcp.json in code review like any code.</do>
  </b-finding>
</b-chapter>

<b-chapter id="secrets" icon="key" title="Secrets in .mcp.json">
  <b-why>The file holds environment variable names. ${VAR} inserts the value and ${VAR:-default} sets a fallback. Expansion works in command, args, env, url and headers.</b-why>
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

If a variable is unset and has no default, the config loads as is, and claude mcp list and /mcp show a warning. Claude Code credentials (ANTHROPIC_API_KEY, ANTHROPIC_AUTH_TOKEN) and several others read as empty in url and headers: copy the value to a variable with another name.

  <b-finding>
    <ex>The repository holds ${API_KEY}, and every developer keeps the real key in their own environment variable.</ex>
    <gen>That keeps the shared file safe to commit.</gen>
    <do k="What to do">Remove keys from .mcp.json and replace them with variables.</do>
  </b-finding>
</b-chapter>

<b-chapter id="first" icon="flag" title="Where to start">
  <iso-art name="mcp-scopes/steps"></iso-art>
  <b-finding>
    <ex>Three steps: look, share, hide the keys.</ex>
    <gen>First order in your own servers, then shared setup for the team.</gen>
    <do k="What to do">Run claude mcp list and find a server the whole team needs.</do>
  </b-finding>
</b-chapter>

<b-chapter id="next" title="Next">
  <b-links>
    <item href="/blog/mcp-agent-access/" k="Basics" t="MCP для ИИ-агента: какую проблему решает и как поручить подключение агенту">What MCP is and how to connect it</item>
    <item href="/blog/claude-in-chrome/" k="Browser" t="Claude in Chrome: как агент работает в вашем браузере — тест, отладка и формы под вашим входом">The agent in your browser</item>
    <item href="/blog/bug-report-to-reproduction-agent/" k="Example" t="Работа QA после поддержки с ИИ-агентом: исследование, описание и документирование через MCP и скиллы">The agent reproduces a Jira bug</item>
  </b-links>
</b-chapter>
<b-footer>Facts about scopes and precedence follow the Claude Code docs: <a href="https://code.claude.com/docs/en/mcp#mcp-installation-scopes" target="_blank" rel="noopener">MCP installation scopes</a>.</b-footer>
</b-post>
