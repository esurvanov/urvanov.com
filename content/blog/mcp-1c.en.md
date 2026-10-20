---
title: MCP server and AI agent for 1C: how to let Claude Code, Codex or Cursor into the database without breaking it
date: 2026-10-12
description: An MCP server for 1C:Enterprise gives an AI agent (Claude Code, Codex or Cursor) access to the configuration code and the database data. How to connect it in 3 steps, what breaks in practice, how to separate reading from writing and check results.
tags: AI, agents, MCP, 1C, permissions, security, Claude Code, Codex, Cursor
category: harness
layout: wide
mentions: Model Context Protocol, MCP, 1C:Enterprise, AI agent, Claude Code, Codex, Cursor, permissions, prompt injection
toc: what=What it is | specifics=1C specifics | breaks=Where it breaks | servers=Servers | cases=What breaks | scheme=Scheme | rights=Rights | check=Checks | agents=Agents | start=Where to start | next=Read next
---

To let Claude Code, Codex or Cursor into a 1C database without breaking it, connect the AI agent through an MCP server for 1C — a bridge to the configuration code and the database data — and split the access. The agent only reads the production database under a user without write rights, makes changes in a test copy, and a person moves changes to production through the repository after review. Below: what servers exist, what breaks in practice, the ladder of rights and how to check results. How MCP works in general is covered in [MCP for an AI agent](/blog/mcp-agent-access/).

<b-post series="harness">
<b-chapter id="what" icon="plug" title="What an MCP server for 1C is">
<b-why align="left"><a href="/materials/glossary/mcp/">MCP</a> is a common plug between an agent and a system. For 1C it is an <a href="/materials/glossary/mcp-server/">MCP server</a> that gives the agent configuration code and metadata, database data, platform help or checks. Many servers combine several. It works the same way as for any other system: 1C is one more <a href="/blog/mcp-agent-access/#ours">other context</a>, like Jira or GitLab, with the same plug and the same agents. The only 1C-specific part is how the server reaches 1C: through an export, the 1C IDE, a configuration extension or an external data processor.</b-why>
<b-lane title="What an MCP server gives" color="accent">
<b-scene names="mcp-1c/servers"/>
</b-lane>
<b-table-plain>
<table><thead><tr><th></th><th>Code and metadata</th><th>Database data</th></tr></thead><tbody><tr><td>What the agent sees</td><td>modules, metadata, forms</td><td>catalogs, documents, registers, reports</td></tr><tr><td>Where from</td><td>a configuration export or 1C:EDT</td><td>the 1C database through a configuration extension or an external data processor</td></tr><tr><td>Why</td><td>writes code against the real configuration, invents less</td><td>answers with numbers from the database, analyses data</td></tr><tr><td>Main risk</td><td><b-tag-inline kind="no">editing the wrong configuration</b-tag-inline></td><td><b-tag-inline kind="no">writes to production, other people's data</b-tag-inline></td></tr></tbody></table>
</b-table-plain>
<b-finding>
  <ex k="Code">The agent stops inventing methods and attributes that are not in the configuration.</ex>
  <gen k="Data">The agent answers from the database, which means it can also change it. This is where access rules are needed.</gen>
  <do k="What to do">Start with code: it is safer. Turn on data access only following the scheme below, even if the server can do both.</do>
</b-finding>
</b-chapter>
<b-chapter id="specifics" icon="form" title="How 1C differs for an AI agent">
<b-why align="left">Vibe coding in 1C works differently from regular languages: the program lives in the database and in visual designers, and code is only part of it. The diagram shows the program path from the <a href="/materials/glossary/ai-agent/">AI agent</a>'s computer to production in <a href="/materials/glossary/gitlab/">GitLab</a> and in 1C.</b-why>
<b-lane title="Program path: local, test, production" color="accent">
<b-scene names="mcp-1c/pipeline"/>
</b-lane>
<b-rules-fixed cols="3" top="12" sw="1.8">
  <rule icon="monitor-hm" t="Local">In GitLab the <a href="/materials/glossary/ai-agent/">agent</a> edits files and runs tests right away. In 1C it edits the dump and can check it only after loading it into a database, local or test.</rule>
  <rule icon="git-fork" t="Versions">In GitLab versions live in a git repository with a <a href="/materials/glossary/checks/">check</a>. In 1C they live in the configuration repository; git happens but is optional.</rule>
  <rule icon="cylinder-hm" t="Test and production">In GitLab the program and the data are kept apart. In 1C each environment has its own database holding both: updating production means updating the production database.</rule>
</b-rules-fixed>
</b-chapter>
<b-chapter id="breaks" icon="alert" title="Where an AI agent breaks in 1C and why">
<b-why align="left">Pick a number to see what breaks and what helps right under the diagram. Five specifics are the most discussed in 1C developer chats, the sixth is about MCP.</b-why>
<b-lane title="What breaks and where" color="warn">
<b-scene names="mcp-1c/breaks"/>
<b-pick-tabs id="brk" tone="warn">
  <tab t="Weak at 1C">
    <b-pick-cell k="Specific" t="Models know the 1C language and its standard library poorly"/>
    <b-pick-cell k="What breaks" tone="warn">invented methods, SQL syntax instead of the 1C query language</b-pick-cell>
    <b-pick-cell k="What helps" tone="accent">platform help through MCP, 2–3 samples from the vendor configuration itself</b-pick-cell>
  </tab>
  <tab t="Files ≠ database">
    <b-pick-cell k="Specific" t="Service files cannot be edited as text"/>
    <b-pick-cell k="What breaks" tone="warn">the project drifts from the database, loading hangs for hours</b-pick-cell>
    <b-pick-cell k="What helps" tone="accent">edits only through the MCP server, direct writes blocked</b-pick-cell>
  </tab>
  <tab t="Forms by mouse">
    <b-pick-cell k="Specific" t="Forms, reports and print layouts are built with the mouse"/>
    <b-pick-cell k="What breaks" tone="warn">the agent does not wire events, leaves an empty report, the layout does not change</b-pick-cell>
    <b-pick-cell k="What helps" tone="accent">the skeleton by hand, only code to the agent; a form snapshot to check</b-pick-cell>
  </tab>
  <tab t="Slow loading">
    <b-pick-cell k="Specific" t="A slow check loop"/>
    <b-pick-cell k="What breaks" tone="warn">a database update takes tens of minutes, the agent drops out and reports too early</b-pick-cell>
    <b-pick-cell k="What helps" tone="accent">updates in the background, tests on a separate server</b-pick-cell>
  </tab>
  <tab t="Not the extension">
    <b-pick-cell k="Specific" t="A vendor configuration under support, changes in an extension"/>
    <b-pick-cell k="What breaks" tone="warn">the agent writes to the main configuration, pulls extra borrowed objects</b-pick-cell>
    <b-pick-cell k="What helps" tone="accent">the extension project named in the agent rules, the main one closed</b-pick-cell>
  </tab>
  <tab t="Skips the test">
    <b-pick-cell k="Specific" t="Writing to production through MCP"/>
    <b-pick-cell k="What breaks" tone="warn">an edit skips storage and test and lands in live data</b-pick-cell>
    <b-pick-cell k="What helps" tone="accent">production read only, writes go to the test database</b-pick-cell>
  </tab>
</b-pick-tabs>
</b-lane>
<b-finding>
  <ex k="Difference">In 1C the agent needs an intermediary: the IDE, the help and a running platform. Without them it edits what it cannot see.</ex>
  <gen k="Size">Vendor configurations are huge, with modules of 15–26 thousand lines. The agent gets configuration search and reads only the part it needs.</gen>
  <do k="What to do">Start with code and queries; leave forms and reports to a person until the agent shows stable results.</do>
</b-finding>
</b-chapter>
<b-chapter id="servers" icon="cylinder-alt" title="Free MCP servers for 1C and 1C:EDT">
<b-why align="left">There are many ready-made servers and they change fast. Before connecting one, read which actions it supports: read only, or write as well.</b-why>
<b-source-rows wide>
  <row t="mcp-1c" note="Code and data" href="https://github.com/feenlace/mcp-1c" link="GitHub">Configuration structure, code search, language help and read-only data queries</row>
  <row t="1c_mcp" note="Code and data" href="https://github.com/vladimir-kharin/1c_mcp" link="GitHub">A kit for your own MCP server inside 1C as a configuration extension: configuration out of the box, data through your own tools</row>
  <row t="1c-mcp-toolkit" note="Data" href="https://github.com/ROCTUP/1c-mcp-toolkit" link="GitHub">Connects to the database through an external data processor, without changing the configuration</row>
  <row t="EDT-MCP" note="Code" href="https://github.com/DitriXNew/EDT-MCP" link="GitHub">A plugin for 1C:EDT: the agent works with the project through the IDE tools</row>
  <row t="MCP:RSV Data" note="Data" href="https://infostart.ru/1c/articles/2720241/" link="Infostart">An extension for data and metadata of any configuration: read only, and only what the current user can see</row>
  <row t="bsl-ai-toolkit" note="Code" href="https://github.com/vgtitov/bsl-ai-toolkit" link="GitHub">Rules, skills and servers so the agent works from your code</row>
  <row t="1c-mcp catalog" note="Catalog" href="https://github.com/Untru/1c-mcp" link="GitHub">Servers by group: IDE, database, code, help, tests</row>
  <row t="1C AI Dev Tools" note="Catalog" href="https://aitools1c.dev" link="Website">A catalog of servers, skills and integrations for 1C development with AI</row>
</b-source-rows>
<b-finding>
  <ex k="Choice">Code goes first, data as a second, separate step.</ex>
  <gen k="Check">The server's tool list is the list of what the agent will be able to do to the database.</gen>
  <do k="What to do">List the server's tools and mark which of them change data.</do>
</b-finding>
</b-chapter>
<b-chapter id="cases" icon="alert-alt" title="What breaks in practice">
<b-why align="left">Open chats of 1C developers describe similar cases. Retold in our own words, without names. These are examples from practice: each case cannot be verified. Pick a case: the diagram shows where it happened, the card shows why and how to protect.</b-why>
<b-lane title="Cases from practice" color="warn">
<b-scene names="mcp-1c/cases"/>
<b-pick-tabs id="cs" tone="warn">
  <tab t="Production">
    <b-pick-cell k="What happened" t="Broke the production database">The agent got write access to production to move faster. The edit landed in live accounting and was rolled back from a backup.</b-pick-cell>
    <b-pick-cell k="Why" tone="warn">No test database between the agent and live data; writes to production were open.</b-pick-cell>
    <b-pick-cell k="Protection" tone="accent">Production read only. The agent writes to a test database; a person moves changes after review.</b-pick-cell>
  </tab>
  <tab t="A hundred databases">
    <b-pick-cell k="What happened" t="Deleted a list of a hundred databases">The agent was tidying up the server and removed extras, including the list of working databases.</b-pick-cell>
    <b-pick-cell k="Why" tone="warn">An account with server admin rights, though the task concerned one database.</b-pick-cell>
    <b-pick-cell k="Protection" tone="accent">A separate user for the task, rights to one database only, no server administration.</b-pick-cell>
  </tab>
  <tab t="Someone else’s data">
    <b-pick-cell k="What happened" t="Gave an accountant the director’s data">An MCP agent answered employees. An accountant received figures they must not see.</b-pick-cell>
    <b-pick-cell k="Why" tone="warn">The server went to the database under one shared user with full rights, so 1C roles and restrictions did not apply.</b-pick-cell>
    <b-pick-cell k="Protection" tone="accent">Sign in as the person asking: then their roles and record-level restrictions apply.</b-pick-cell>
  </tab>
  <tab t="Passwords in logs">
    <b-pick-cell k="What happened" t="Passwords and keys ended up in logs">A database password was passed to the agent right in the request. It stayed in the call log and the chat history.</b-pick-cell>
    <b-pick-cell k="Why" tone="warn">Secrets went in tool arguments and lay in files next to the project.</b-pick-cell>
    <b-pick-cell k="Protection" tone="accent">Secrets only in server settings, never shown to the agent. Folders with keys closed to the agent.</b-pick-cell>
  </tab>
  <tab t="“Done”">
    <b-pick-cell k="What happened" t="“Done”, but nothing changed">The agent added an attribute and reported done. In user mode nothing changed: the database was not updated after the edit.</b-pick-cell>
    <b-pick-cell k="Why" tone="warn">The agent’s report was accepted without checking the result.</b-pick-cell>
    <b-pick-cell k="Protection" tone="accent">After an edit: database update, error check and an autotest. “Done” only with a link to the result.</b-pick-cell>
  </tab>
  <tab t="Wrong answer">
    <b-pick-cell k="What happened" t="A query without errors, but a wrong answer">The agent wrote a query that ran without errors, but the figures did not match the 1C report.</b-pick-cell>
    <b-pick-cell k="Why" tone="warn">The model knows 1C registers and periods poorly and writes the query as for a regular database.</b-pick-cell>
    <b-pick-cell k="Protection" tone="accent">Cross-check with the standard 1C report, or answer through a ready report instead of a custom query.</b-pick-cell>
  </tab>
  <tab t="Data in the cloud">
    <b-pick-cell k="What happened" t="Personal data went to the cloud">The agent got a dump with passports and salaries, and it went to a cloud model.</b-pick-cell>
    <b-pick-cell k="Why" tone="warn">The agent got the whole database instead of the fields it needed.</b-pick-cell>
    <b-pick-cell k="Protection" tone="accent">Anonymization and only the needed fields. For sensitive data, a model inside your perimeter.</b-pick-cell>
  </tab>
</b-pick-tabs>
</b-lane>
<b-finding>
  <ex k="Common thread">Almost all cases are about rights and checks. The model is secondary here.</ex>
  <gen k="Cause">The agent got as many rights as an administrator, and its report was taken at its word.</gen>
  <do k="What to do">Go through the cases and mark which protections you already have.</do>
</b-finding>
</b-chapter>
<b-chapter id="scheme" icon="shield-check" title="A safe scheme">
<b-why align="left">The agent only reads the production database. It writes to a test database. A person moves changes to production after review.</b-why>
<b-lane title="Reading apart from writing" color="accent">
<b-scene names="mcp-1c/safe-scheme"/>
<b-pick-tabs id="sf" tone="accent">
  <tab t="Read">
    <b-pick-cell k="Step" t="The agent reads">Production data and code, for answers and analysis.</b-pick-cell>
    <b-pick-cell k="Where" tone="accent">Production, under its own 1C user with a read-only role.</b-pick-cell>
    <b-pick-cell k="Why">The agent sees real data but cannot change it.</b-pick-cell>
  </tab>
  <tab t="Write">
    <b-pick-cell k="Step" t="The agent writes">Code, metadata and documents.</b-pick-cell>
    <b-pick-cell k="Where" tone="accent">A test database or a <a href="/materials/glossary/sandbox/">sandbox</a> with a production copy.</b-pick-cell>
    <b-pick-cell k="Why">A mistake stays in the test database and never reaches the books.</b-pick-cell>
  </tab>
  <tab t="Check and move">
    <b-pick-cell k="Step" t="Check and move">Autotests, then a person reviews the changes.</b-pick-cell>
    <b-pick-cell k="Where" tone="accent">Changes go to the storage, production is updated from it.</b-pick-cell>
    <b-pick-cell k="Why">Only checked changes reach production, and each one has a version.</b-pick-cell>
  </tab>
</b-pick-tabs>
</b-lane>
<b-finding>
  <ex k="Scheme">The agent's mistake stays in the test database and never reaches the books.</ex>
  <gen k="Cost">You need a test database next to production. That is cheaper than one restore from backup.</gen>
  <do k="What to do">Set up a <a href="/materials/glossary/test-stand/">test stand</a> with a database copy before connecting the data server.</do>
</b-finding>
</b-chapter>
<b-chapter id="rights" icon="key" title="Rights: an access ladder">
<b-why align="left">The agent's rights are built in steps: each next step opens once the previous one ran without surprises. <a href="/materials/glossary/permissions/">What agent permissions are</a></b-why>
<b-lane title="Access ladder" color="accent">
<b-scene names="mcp-1c/rights"/>
<b-pick-tabs id="rt" tone="accent">
  <tab t="Read code">
    <b-pick-cell k="What the agent can do" t="Read code">Modules, metadata, forms.</b-pick-cell>
    <b-pick-cell k="When to open" tone="accent">Right away.</b-pick-cell>
    <b-pick-cell k="How to set up">A server with access to the configuration dump or an EDT project, no database access.</b-pick-cell>
  </tab>
  <tab t="Read data">
    <b-pick-cell k="What the agent can do" t="Read data">Queries and reports under its own 1C user.</b-pick-cell>
    <b-pick-cell k="When to open" tone="accent">On a database copy, once code reading caused no surprises.</b-pick-cell>
    <b-pick-cell k="How to set up">A 1C user with a read-only role; the “run any code” tool switched off.</b-pick-cell>
  </tab>
  <tab t="Write to test">
    <b-pick-cell k="What the agent can do" t="Write to test">Code, metadata, documents.</b-pick-cell>
    <b-pick-cell k="When to open" tone="accent">Once autotests exist.</b-pick-cell>
    <b-pick-cell k="How to set up">A separate test database; an error check and autotests after every edit.</b-pick-cell>
  </tab>
  <tab t="Write to production">
    <b-pick-cell k="What the agent can do" t="Write to production">Nothing: this step is closed to the agent.</b-pick-cell>
    <b-pick-cell k="When to open" tone="accent">Never — a person only.</b-pick-cell>
    <b-pick-cell k="How to set up">A person moves changes through the storage after review.</b-pick-cell>
  </tab>
</b-pick-tabs>
</b-lane>
<b-rules-fixed cols="2" sw="1.8">
  <rule icon="user" t="Its own 1C user">The agent signs in as a separate user or as the person who asked. Then the usual rights and record-level restrictions apply.</rule>
  <rule icon="eye-wide-hm" t="A read-only role">For production, a role without the right to write or post documents. Example: in mcp-1c, database queries are read-only by design.</rule>
  <rule icon="prompt" t="No arbitrary code">Turn off the “run any code” tool on production: it bypasses all rights.</rule>
  <rule icon="lock-alt" t="Secrets kept apart">Passwords and keys live in server settings. They are never shown to the agent or passed in requests.</rule>
</b-rules-fixed>
<b-finding>
  <ex k="Data as commands">A comment in a document or an email in the database can contain an instruction to the agent. That is <a href="/materials/glossary/prompt-injection/">prompt injection</a>, and rights limit its damage.</ex>
  <gen k="Rule">The agent gets the rights of a regular user. What the user cannot do, the agent cannot do either.</gen>
  <do k="What to do">How to tell data from commands is covered <a href="/blog/data-plane-control-plane-prompt-injection/">in the article on prompt injection</a>.</do>
</b-finding>
</b-chapter>
<b-chapter id="check" icon="check-square" title="Checking the result">
<b-why align="left">The agent's “done” is a claim. Checks and a <a href="/materials/glossary/human-in-the-loop/">human in the loop</a> confirm it.</b-why>
<b-lane title="Four checks before a result" color="accent">
<b-scene names="mcp-1c/checks"/>
<b-pick-tabs id="ck" tone="accent">
  <tab t="IDE errors">
    <b-pick-cell k="Check" t="IDE error check"/>
    <b-pick-cell k="What it catches" tone="warn">Syntax, methods and attributes that do not exist.</b-pick-cell>
    <b-pick-cell k="How to run" tone="accent">After every edit; the agent shows the check result in its report.</b-pick-cell>
  </tab>
  <tab t="Autotests">
    <b-pick-cell k="Check" t="Autotests"/>
    <b-pick-cell k="What it catches" tone="warn">A scenario fails, a form does not open.</b-pick-cell>
    <b-pick-cell k="How to run" tone="accent">Scenario and unit tests on the test database every cycle.</b-pick-cell>
  </tab>
  <tab t="1C cross-check">
    <b-pick-cell k="Check" t="Cross-check with a 1C report"/>
    <b-pick-cell k="What it catches" tone="warn">The agent figures do not match the books.</b-pick-cell>
    <b-pick-cell k="How to run" tone="accent">Same period and company in the standard report; a mismatch means stop.</b-pick-cell>
  </tab>
  <tab t="A person">
    <b-pick-cell k="Check" t="A person reviews the changes"/>
    <b-pick-cell k="What it catches" tone="warn">Edits in the wrong place, extra borrowed objects, bypassed tools.</b-pick-cell>
    <b-pick-cell k="How to run" tone="accent">Compare changes before the move: the extension only, the needed objects only.</b-pick-cell>
  </tab>
</b-pick-tabs>
</b-lane>
<b-finding>
  <ex k="Common mistake">The agent edits configuration files around the IDE tools, and the project drifts from the database.</ex>
  <gen k="Rule">Every “done” is backed by a check or a link to the result.</gen>
  <do k="What to do">Add to the agent's rules: after an edit, run the error check and show its result.</do>
</b-finding>
</b-chapter>
<b-chapter id="agents" icon="prompt" title="Claude Code, Codex and Cursor for 1C">
<b-why align="left">An MCP server for 1C connects to any agent that supports MCP. Only the place of setup differs.</b-why>
<b-section-h3 top="4">Connecting in 3 steps</b-section-h3>
<b-step-chain>
  <node t="1. Pick a server">For code or for data, from the list above</node>
  <node t="2. Delegate to the agent">“Connect the 1C MCP server following its README”</node>
  <node t="3. Test on a copy">Ask for the tool list and look up one catalog</node>
</b-step-chain>
<b-lane title="Where to set it up" color="accent">
<b-scene names="mcp-1c/agents"/>
<b-pick-tabs id="ag" tone="accent">
  <tab t="Claude Code">
    <b-pick-cell k="Where to set up">the <code>claude mcp add</code> command</b-pick-cell>
    <b-pick-cell k="For a team" tone="accent"><code>.mcp.json</code> in the repository</b-pick-cell>
    <b-pick-cell k="Docs"><a href="https://code.claude.com/docs/en/mcp" target="_blank" rel="noopener">MCP in Claude Code</a></b-pick-cell>
  </tab>
  <tab t="Codex">
    <b-pick-cell k="Where to set up"><code>~/.codex/config.toml</code> or <code>.codex/config.toml</code> in the project</b-pick-cell>
    <b-pick-cell k="For a team" tone="accent"><code>.codex/config.toml</code> in a trusted project</b-pick-cell>
    <b-pick-cell k="Docs"><a href="https://developers.openai.com/codex/mcp" target="_blank" rel="noopener">MCP in Codex</a></b-pick-cell>
  </tab>
  <tab t="Cursor">
    <b-pick-cell k="Where to set up">the <code>mcp.json</code> file</b-pick-cell>
    <b-pick-cell k="For a team" tone="accent">a team server marketplace</b-pick-cell>
    <b-pick-cell k="Docs"><a href="https://cursor.com/docs/context/mcp" target="_blank" rel="noopener">MCP in Cursor</a></b-pick-cell>
  </tab>
</b-pick-tabs>
</b-lane>
<b-finding>
  <ex k="Common ground">Rights are set by the server and the 1C user. The scheme above works with any of the three.</ex>
  <gen k="Confirmations">Keep confirmation on for tools that change data.</gen>
  <do k="What to do">Delegate the setup to the agent itself, as described <a href="/blog/mcp-agent-access/#connect">in the MCP article</a>.</do>
</b-finding>
</b-chapter>
<b-chapter id="start" icon="flag-alt" title="Where to start">
<b-why align="left">Three steps. Each next one comes after the previous one went without surprises.</b-why>
<b-lane-art names="mcp-1c/start-steps"/>
<b-finding>
  <ex k="Week 1">The code server and reading data on a database copy. Check 5 of the agent's answers by hand.</ex>
  <gen k="Week 2">Writing to a test database and autotests. The agent shows what it checked.</gen>
  <do k="After that">Production stays read-only. Moving changes is up to a person.</do>
</b-finding>
</b-chapter>
<b-chapter id="next" icon="arrow-right" title="Read next">
  <b-links>
    <item href="/blog/mcp-agent-access/" k="Connecting" t="MCP for an AI agent">how to connect and delegate it to the agent</item>
    <item href="/blog/data-plane-control-plane-prompt-injection/" k="Security" t="Data and commands">how to defend against prompt injection</item>
    <item href="/blog/mcp-scopes/" k="Scopes" t="MCP scopes">where the server setup is stored</item>
  </b-links>
</b-chapter>
<b-footer>Cases are retold from open discussions among 1C developers, without names or quotes. These are examples from practice, and each case cannot be verified. The protection rules are the author's practice.</b-footer>
</b-post>
