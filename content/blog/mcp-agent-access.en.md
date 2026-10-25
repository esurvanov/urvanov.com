---
title: MCP for an AI agent: what problem it solves and how to delegate setup to the agent
date: 2026-10-04
updated: 2026-10-26
unrelated: mcp-1c
description: MCP plugs an agent into GitLab, Jira, Confluence and meeting recordings. What problem it solves, how to set it up in minutes and delegate that to the agent itself, how it saves time and tokens and why the agent invents less.
tags: AI, agents, MCP, Jira, context, hallucinations, tokens, harness
category: harness
layout: wide
mentions: Model Context Protocol, MCP, AI agent, Claude Code, Jira, Airtable, hallucinations, tokens, permissions, prompt injection
toc: what=What it is | ours=Contexts | connect=Connecting | saving=Savings | facts=Facts | risks=Risks | first=Where to start | cases=Cases | next=Read next
---

MCP plugs an agent into working systems, so it reads facts from the source instead of a retelling. It is easy and quick: understand the problem it solves and delegate the setup to the agent itself. Below: the idea, connecting, what it gives and which rights to grant. The QA example with MCP is covered in the article [QA with an agent via MCP](/blog/bug-report-to-reproduction-agent/#mcp).

<b-post series="harness">
<b-chapter id="what" icon="plug" title="What MCP is">
<b-why align="left">MCP is one common plug, like USB. Connect the agent to Jira or GitLab and it takes the data from there itself. <a href="https://modelcontextprotocol.io/docs/getting-started/intro" target="_blank" rel="noopener">More</a></b-why>
<b-why align="left">The picture shows two data paths. In the first a person retells the task to the agent, and details are lost on the way. In the second the agent reads the system itself through MCP and sees everything a person sees. MCP (Model Context Protocol) is an open standard that connects AI applications with external systems<b-proof href="https://modelcontextprotocol.io/docs/getting-started/intro" quote="MCP (Model Context Protocol) is an open-source standard for connecting AI applications to external systems."/>. The agent has an MCP client, the system has an MCP server, and the server tells the agent which data and actions are available.</b-why>
<b-lane title="A retelling or the system itself" color="accent">
<b-scene names="mcp-agent-access/retell-vs-mcp"/>
</b-lane>
<b-finding>
  <ex>In Jira the agent sees what a person sees: the task PAY-142 itself, comments and change history. No need to find the task and copy it into the conversation. It pulls related tasks on request. It can comment on your behalf, create a task or change a status (after your confirmation). On first use you should feel a “wow”: that means it is set up right. And it is very simple.</ex>
  <gen>The agent looks wider than a person: it weighs neighbouring tasks, knowledge-base articles and past decisions, and finds non-obvious moves that one task alone does not show. Without MCP it knows only what was pasted in. The person stops being a courier between windows and stays the reviewer.</gen>
  <do k="What to do">Start with the task tracker: the easiest and quickest start. How to connect Jira: <a href="#connect">see below</a>. Also count how many times a day you copy text into the conversation: that is your list of connection candidates.</do>
</b-finding>
</b-chapter>
<b-chapter id="ours" icon="target-ring" title="Our context and others">
<b-why align="left">Our context is everything the agent sees at once (the conversation with the agent, project files). Other contexts are everything else (GitLab, Jira, meeting recordings, a knowledge base). The bridge between them is MCP: the agent has an MCP client and the system has an MCP server.</b-why>
<b-lane-art names="mcp-agent-access/contexts"/>
<b-why align="left">On the left of the picture is the agent’s context: the conversation with it and the project files it sees at once. On the right are other systems: GitLab, Jira, tldv with meeting recordings, Confluence with a knowledge base. Until MCP is connected, the agent does not see them. The bridge between them has two parts: an MCP client on the agent’s side and an MCP server on the system’s side.</b-why>
<b-section-h3 top="18">What context is</b-section-h3>
<b-why align="left"><a href="/materials/glossary/context/">Context</a> is everything the model sees at the moment. What is not in the context, the agent does not know.</b-why>
<b-lane title="Context" color="accent" top="12">
<b-scene names="term:context"/>
</b-lane>
<b-why align="left">Context can be pictured as a desk holding everything the model sees right now: conversation messages, open files, call results. What is not on the desk does not exist for the model until it is put there. So the main question when working with an agent is what is on its desk.</b-why>
<b-table-plain>
<table><thead><tr><th>Where the fact lives</th><th>The agent sees it</th><th>What happens</th></tr></thead><tbody><tr><td><b>Our context</b>: the conversation, project files</td><td><b-tag-inline kind="ok">at once</b-tag-inline></td><td>an answer from data</td></tr><tr><td><b>Other context</b>: GitLab, Jira, meeting recordings</td><td><b-tag-inline kind="ok">through MCP</b-tag-inline></td><td>the agent fetches what it needs</td></tr><tr><td><b>Nowhere</b>: in heads, in a closed system</td><td><b-tag-inline kind="no">no</b-tag-inline></td><td>a guess instead of a fact</td></tr></tbody></table>
</b-table-plain>
<b-why align="left">The table shows what happens to a fact depending on where it lies. A fact in the agent’s context (the conversation, project files): the agent answers from data. A fact in another system (GitLab, Jira, meeting recordings): the agent fetches it itself, but only through MCP. A fact written nowhere (in people’s heads, in a closed system): the agent will not see it and will replace it with a guess. Hence the practical rule: write decisions down where the agent can take them from.</b-why>
<b-section-h3 top="18">How the agent fetches other context: ReAct</b-section-h3>
<b-why align="left">The agent works in a <a href="/materials/glossary/react/">ReAct</a> loop: it reasons, acts, reads the result and reasons again. MCP is the “act” step: the call result lands in our context.</b-why>
<b-lane title="ReAct" color="accent" top="12">
<b-scene names="term:react"/>
</b-lane>
<b-step-chain>
  <node t="Reasons">“I need the steps of bug PAY-142”</node>
  <node t="Acts">Calls the Jira MCP server</node>
  <node t="Reads">The Jira reply lands in context</node>
</b-step-chain>
<b-rules-fixed cols="3" top="12">
  <rule t="Only reasons">Other contexts are closed: the model makes up the answer.</rule>
  <rule t="Only acts">Calls everything without a plan and burns tokens.</rule>
  <rule t="Alternates">Fetches exactly what is missing and answers from data.</rule>
</b-rules-fixed>
<b-why align="left">An example of the cycle: the agent reasons (“I need the steps of bug PAY-142”), acts (calls the Jira MCP server), reads the answer (it lands in the context) and answers from the data. The three cards show what happens when the cycle breaks. Reasoning alone gives an invented answer, acting alone gives extra calls and token spend, and alternating gives an answer exactly from the data.</b-why>
<b-section-h3 top="18">Grounding: every part of the answer has support</b-section-h3>
<b-why align="left">An answer is grounded when every part of it comes from the context. Such a matching with no empty spots is called an <a href="/materials/glossary/epimorphism/">epimorphism</a>.</b-why>
<b-lane title="Epimorphism" color="accent" top="12">
<b-scene names="term:epimorphism"/>
</b-lane>
<b-table-plain>
<table><thead><tr><th>Part of the answer</th><th>Support</th></tr></thead><tbody><tr><td>Reproduction steps</td><td>Jira, ticket PAY-142</td></tr><tr><td>Where the code fails</td><td>GitLab, file and line</td></tr><tr><td>Why it was decided</td><td>tldv, meeting recording</td></tr></tbody></table>
</b-table-plain>
<b-why align="left">The table shows a check of support on an example. The reproduction steps come from the Jira ticket, the place where the code fails from GitLab, the reason for the decision from a meeting recording. If a part of the answer has no such support, it is rechecked by hand.</b-why>
<b-section-h3 top="18">Hallucination: a part with no support</b-section-h3>
<b-why align="left">A <a href="/materials/glossary/hallucination/">hallucination</a> is a confident guess where there is no support. It looks as smooth as an answer from data. Details and Anthropic advice are <a href="#facts">in the hallucinations section below</a>.</b-why>
<b-lane title="Hallucination" color="accent" top="12">
<b-scene names="term:hallucination"/>
</b-lane>
<b-why align="left">A hallucination looks as smooth as an answer from data, so they cannot be told apart by tone. Only the support tells them apart: it is there or it is not.</b-why>
<b-section-h3 top="18">Why these</b-section-h3>
<b-source-rows>
  <row t="GitLab" note="Official MCP" href="https://docs.gitlab.com/user/model_context_protocol/mcp_server/" miss="The agent guesses the code from other contexts and is often wrong, which is how hallucinations appear; a person copies files and diffs into the conversation by hand">Code and merge requests: the agent reads real code</row>
  <row t="Jira" note="Official Atlassian MCP" href="https://support.atlassian.com/atlassian-rovo-mcp-server/docs/getting-started-with-the-atlassian-remote-mcp-server/" miss="There is a lot to copy by hand and the change history gets lost">Tasks and requirements: what was really asked</row>
  <row t="Confluence" note="Same Atlassian MCP" href="https://support.atlassian.com/atlassian-rovo-mcp-server/docs/getting-started-with-the-atlassian-remote-mcp-server/" miss="The visualisation and display of requirements every developer is used to disappear. It is important to limit the agent and not let it wander far: old requirements may be outdated. Make it check the factual picture in GitLab">Knowledge base: rules, specs, decisions</row>
  <row t="tldv" note="Recording and open API" href="https://doc.tldv.io" miss="Decisions stay in heads, and meeting notes and requirements get written from memory hours later, with errors">Meeting recordings: decisions that exist nowhere in text. In the author’s experience access appears 5–10 minutes after the meeting, so meeting notes and requirements can be written right away. The enterprise version, access control and MCP are weaker, but translations and transcripts are better quality</row>
  <row t="Granola" note="MCP" href="https://docs.granola.ai/help-center/sharing/integrations/mcp" miss="Same as without tldv: decisions from meetings get lost">Also meeting recordings. It has an MCP, but in the author’s experience lags tldv slightly: Spanish words slip into Russian text, which hurts the user experience and causes resistance to adoption. From the docs: active workspace only, free plan covers 30 days of notes</row>
</b-source-rows>
<b-why align="left">These systems were chosen because they hold four kinds of facts: code, tasks, rules and decisions from meetings. Each row says what is lost without the connection. Confluence comes with a caveat: connect it only if the pages are polished (an owner and a check date), and let the agent check the actual picture against the code in GitLab. It is even more reliable to keep requirements and specs in Git: there an edit has an author, a date and a reason.</b-why>
<b-finding>
  <ex>You ask about a bug and the conversation has no steps. The agent searches project files, Jira is closed to it, so it writes the steps itself: confident, smooth, made up. You follow a path that does not exist.</ex>
  <gen>An agent rarely answers “I don’t know”. If the answer is not in our context and the others are closed, it fills the gap from general patterns and presents it as fact. Every connected source removes room for invention.</gen>
  <do k="What to do">Every time the agent hallucinates, find the context that holds the answer and give the agent access to it. Start with the last question it answered with an invention.</do>
</b-finding>
</b-chapter>
<b-chapter id="connect" icon="arrow-right" title="How to connect Jira">
<b-why align="left">The agent and its harness can connect on their own. Guides: <a href="https://support.atlassian.com/atlassian-rovo-mcp-server/docs/getting-started-with-the-atlassian-remote-mcp-server/" target="_blank" rel="noopener">Atlassian</a> and <a href="https://code.claude.com/docs/en/mcp" target="_blank" rel="noopener">Claude Code</a>.</b-why>
<b-lane title="By hand or delegate" color="accent">
<b-scene names="mcp-agent-access/one-phrase-setup"/>
</b-lane>
<b-why align="left">The picture compares two ways. By hand: you look up the instructions, type commands, sign in and check the result. Delegate to the agent: you say one phrase, the agent connects Jira itself, and all you do is sign in through the browser.</b-why>
<b-section-h3 top="14">Tell the agent</b-section-h3>
<b-copy-quote>Connect the Jira MCP server following the Atlassian guide and test it on task PAY-142: read it and summarise the comments.</b-copy-quote>
<b-why align="left">The agent runs the commands itself. All you do is log in via the browser (OAuth): the agent never gets your password. <a href="/blog/agent-hands-work-back-to-you/" target="_blank" rel="noopener">If the agent asks you to do it</a>.</b-why>
<b-section-h3 top="14">What will happen</b-section-h3>
<b-steps-round>
  <step t="The agent connects Jira">with one command, you type nothing</step>
  <step hl t="A Jira page opens — the key step">it offers to give the agent access to Jira; you sign in and approve, and the agent never sees the password</step>
  <step t="The agent reads PAY-142">opens the task with its comments and retells them</step>
</b-steps-round>
<b-why align="left">The key step here is the second: you give the access yourself, by signing in through the browser. The agent does not see your password and gets only the rights you confirmed on the Jira page. The agent does the first and third steps itself.</b-why>
<b-callout icon="shield-check"><b>Read-only.</b> You may not always be able to choose read-only access on that page. That is safe: the agent tends to read and hardly writes anything until you ask it to.</b-callout>
<b-details-more summary="How it is done by hand" top="12">
<b-scene names="mcp-agent-access/setup-steps"/>
<b-copy-code>
  claude mcp add --transport http atlassian https://mcp.atlassian.com/v2/mcp
  /mcp               # log in via browser (OAuth)
  claude mcp list     # status: connected / needs login / failed
</b-copy-code>
<b-scene names="mcp-agent-access/scopes"/>
<p>Where the setup lives and who sees the server: <a href="/blog/mcp-scopes/">MCP scopes in Claude Code</a>.</p>
</b-details-more>
<b-why align="left">By hand it is three commands: add the server, sign in through the browser with /mcp and check the status. The status comes in three kinds: connected, needs sign-in or error. The diagram above shows it step by step, and the scopes below say where the setting is stored.</b-why>
<b-finding>
  <ex>The agent runs the commands and checks the connection itself, and task PAY-142 is read in full with its comments. That is the “wow” moment.</ex>
  <gen>Connecting takes minutes. The "Project" scope puts the setup in the repo so the whole team gets the same servers. All three scopes are covered in <a href="/blog/mcp-scopes/">MCP scopes in Claude Code</a>.</gen>
  <do k="What to do">Delegate the setup to the agent and compare its answer with what you see in Jira yourself.</do>
</b-finding>
</b-chapter>
<b-chapter id="saving" icon="coin-hm" title="Savings">
<b-why align="left">The saving comes from accuracy. A vague request gets a vague answer, a fix spawns a new request, and errors pile up from step to step; when copying and retelling by hand a person adds such slips unnoticed. The agent takes data straight from the source, so the chain is shorter and has fewer errors. The price is growing token use over a long run, and there are limiters for it.</b-why>
<b-lane title="Piling up errors: by hand or from the source" color="accent">
<b-scene names="mcp-agent-access/exact-request"/>
</b-lane>
<b-why align="left">On the left is the path with manual copying: every step adds an inaccuracy, and by the third pass the errors have piled up. On the right is the path from the source: one exact request and one answer, with no chain of retellings.</b-why>
<b-spacer h="12"/>
<b-rules sw="1.8">
  <rule icon="eye" t="Vague requests and answers">Retelling and copying by hand lose detail, so the request comes out vague and so does the answer.</rule>
  <rule icon="users" t="Errors pile up">Every fix spawns a new request with a new inaccuracy: errors add up from step to step.</rule>
  <rule icon="layers" t="Cost: tokens">There are fewer steps, but token use grows over a long run; there are limits for it.</rule>
</b-rules>
<b-section-h3 top="14">Spending limits</b-section-h3>
<b-why align="left">A connected system’s reply lands in the conversation and takes up room there, and room is measured in tokens. So Claude Code watches reply size and sets two thresholds.</b-why>
<b-scene names="mcp-agent-access/reply-size-scale"/>
<b-why align="left">The scale shows the size of a system’s reply in tokens. Up to 10,000 tokens a reply passes without remarks. After 10,000 Claude Code warns that the reply is large. After 25,000 the reply does not enter the conversation whole and is saved to a file.</b-why>
<b-art-note top="6">The 25,000 cap can be raised with the MAX_MCP_OUTPUT_TOKENS environment variable, while the warning threshold is fixed.</b-art-note>
<b-why align="left"><a href="https://code.claude.com/docs/en/mcp" target="_blank" rel="noopener">More</a>.</b-why>
<b-finding>
  <ex>Three passes with growing errors turn into one pass on an exact request.</ex>
  <gen>The saving is the absence of extra rounds: an exact request and an answer from the source do not pile up errors. Exact figures come only from measuring your own work.</gen>
  <gen k="About limits">The longer the work, the more tokens it uses, so Claude Code limits long replies: it warns after 10,000 tokens and saves to a file after 25,000.</gen>
  <do k="What to do">Measure two things on one task: how many minutes and fixes manual transfer takes, and how many tokens the agent spends.</do>
</b-finding>
</b-chapter>
<b-chapter id="facts" icon="check-circle" title="Fewer hallucinations">
<b-why align="left">Hallucination: the model produces text that looks right but is wrong or does not follow from the data. The model sounds equally confident in two situations. <a href="https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations" target="_blank" rel="noopener">More</a></b-why>
<b-rules-fixed cols="2" sw="1.8">
  <rule icon="help" t="Little context">The model fills in the gaps itself and does not say it is a guess.</rule>
  <rule icon="file-text" t="Context present">The model cites it briskly and confidently, so open the link and check it.</rule>
</b-rules-fixed>
<b-lane title="Where data is missing" color="accent" top="14">
<b-scene names="mcp-agent-access/fills-gaps"/>
</b-lane>
<b-art-note top="10" align="left">The agent’s answer is matched against the data: every part of it should have support. In mathematics such a matching is called an epimorphism. Parts without support are filled in by the model as a guess, and they look just as confident.</b-art-note>
<b-why align="left">What this means in practice. If systems are not connected, the agent fills the gaps with a guess and states it in the same confident tone: the text does not show a guess from a fact. If systems are connected, real data with a link stands where the guess was, and checking takes one click. The three Anthropic tips work together: allow the agent to say “I don’t know” when there is no data, ask it to rely on the verbatim text of the source, and demand a link for every claim.</b-why>
<b-section-h3 top="18">What Anthropic recommends</b-section-h3>
<b-step-chain>
  <node t="&quot;I don't know&quot;">Allow admitting missing data</node>
  <node t="Quote">Rely on the source text verbatim</node>
  <node t="Citation">Each claim gets its source</node>
</b-step-chain>
<b-why align="left">The three Anthropic tips close the gaps in the data. Allow “I don’t know”: otherwise the model fills the gap with a guess. Rely on a quote: the verbatim text of a source can be checked. Give a link for every claim: it can be opened and compared.</b-why>
<b-finding>
  <ex>Jira is closed, so the agent made up two parts of the answer. When Jira is connected, those spots hold data from ticket PAY-142 with a link, and you open it in one click.</ex>
  <gen>The agent fills holes in the data with a guess and does not say so. Anthropic’s three tips close them: allow “I don’t know”, rely on a quote, give a link to the source. This does not remove hallucinations entirely, a human check stays.</gen>
  <do k="What to do">Require a source for every fact: system, number, field. How to do it in requirements and meeting notes is in <a href="/blog/requirements-sources-facts-assumptions/">a separate article</a>.</do>
</b-finding>
</b-chapter>
<b-chapter id="risks" icon="shield-check" title="Risks and rules">
<b-why align="left">In most cases the protection is already built into how MCP works in Claude Code. What remains is to pick trusted servers and not grant extra rights. <a href="https://code.claude.com/docs/en/mcp" target="_blank" rel="noopener">More</a></b-why>
<b-why align="left">Three risks are worth remembering. Excess rights: a server that was given write access can change or delete data, so rights are given at a minimum. An untrusted server: an MCP server from third parties gets access to what you opened to it, so connect verified ones. Text from systems: a task or a comment may contain a phrase aimed at the agent, which is covered in the article [on the data plane and control plane](/blog/data-plane-control-plane-prompt-injection/).</b-why>
<b-rules sw="1.8">
  <rule icon="bell" t="Permission">Claude Code asks permission before using a server’s tool.</rule>
  <rule icon="folder-hm" t="Project servers">Servers from a project’s .mcp.json file must be approved before first use.</rule>
  <rule icon="key" t="Rights">For servers with sign-in you can limit which rights they request.</rule>
</b-rules>
<b-lane title="Permission ladder" color="accent" top="14">
<b-scene names="mcp-agent-access/rights-ladder"/>
</b-lane>
<b-why align="left">The ladder in the picture shows the order of granting rights. First read: the agent only looks. Then write with confirmation: the agent proposes, a person approves every write. Write without confirmation waits until trust has built up. Move up one step only when you have checked that the previous one works.</b-why>
<b-finding>
  <ex>The agent reads prod, writes only to a test sheet and shows every write to a person.</ex>
  <gen>Rights grow up the ladder: read first, then confirmed write. Unconfirmed write waits until trust is earned.</gen>
  <do k="What to do">Give a new server read-only and raise rights after a week of checked work.</do>
</b-finding>
</b-chapter>
<b-chapter id="first" icon="arrow-right" title="Where to start">
<b-why align="left">It is better to start small: one source, one person who checks, and read-only mode. Connect Jira, ask the agent five questions about real tasks and compare the answers with what you see yourself. That shows how far the agent can be trusted before you give it write rights.</b-why>
<b-scene names="mcp-agent-access/start-small"/>
<b-finding>
  <ex>Start with Jira read-only and compare five agent answers with what you see yourself.</ex>
  <gen>One source, one reviewer, one rights step at a time.</gen>
  <do k="What to do">Connect the first server today and note what the agent read correctly and what not.</do>
</b-finding>
</b-chapter>
<b-chapter id="cases" icon="grid-alt" title="Other cases">
<b-why>One approach works across tasks: the agent reads the sources and a person checks the result.</b-why>
<b-scene names="mcp-agent-access/three-cases"/>
<b-table>
<table><thead><tr><th>Case</th><th>Sources</th><th>What the agent does</th><th>What a human checks</th></tr></thead><tbody><tr><td><a href="/blog/bug-report-to-reproduction-agent/">QA</a></td><td>Jira, stand, browser</td><td>reproduces a bug, narrows the path, writes a report</td><td>the steps by hand on the stand</td></tr><tr><td><a href="/blog/analytics-reports-agent/">Reports and analytics</a></td><td>database, sheets, documents</td><td>calculates with queries, assembles a summary</td><td>one number another way</td></tr><tr><td><a href="/blog/incident-investigation-agent/">Incidents</a></td><td>Sentry, Grafana</td><td>matches errors, metrics and release time</td><td>the hypothesis against charts and events</td></tr></tbody></table>
</b-table>
<b-why align="left">How to read the table. Every row follows one order: the agent reads the sources, does the main work and brings a result, and a person checks it with one short action. In QA the steps of the report are repeated by hand on the stand. In analytics one number is recalculated another way. In incidents the hypothesis is compared with graphs and events. Details are in the articles behind the links.</b-why>
</b-chapter>
<b-chapter id="next" icon="arrow-right" title="Read next">
  <b-links>
    <item href="/blog/bug-report-to-reproduction-agent/" k="QA with an agent" t="QA after support">MCP and skills in QA work</item>
    <item href="/blog/specs-rules-skills/" k="Skills" t="Specs, rules and skills">what the agent must know about the project</item>
    <item href="/blog/harness-driven-development/" k="Error loop" t="Harness-Driven Development">how agent mistakes become rules</item>
  </b-links>
</b-chapter>
<b-footer>Task PAY-142 is made up for the example.</b-footer>
</b-post>
