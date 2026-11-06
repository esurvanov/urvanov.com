---
title: What is OpenSpec: setup, commands and a change example
date: 2026-11-07
updated: 2026-11-07
description: How OpenSpec by Fission AI works: a change folder with a plan, requirements and tasks, three agent commands and a merge into the shared specs. Setup in two commands, a live example from this site, a comparison with Spec Kit and ready prompts to start.
tags: AI, OpenSpec, specs, Spec-Driven Development, Claude Code, Codex, Cursor
category: specs
layout: wide
mentions: OpenSpec, Spec-Driven Development, Spec Kit, Claude Code, Codex, Cursor, GitHub Copilot
toc: what=What it is | install=Setup | flow=Three commands | example=Example | kit=OpenSpec or Spec Kit | start=How to start | faq=Questions | next=Further reading
---

OpenSpec is a free open-source framework for spec-driven development. Before any code, an AI agent writes a change plan into the project folder: why the change is needed, the requirements, the approach and the tasks. You review the plan, the agent writes code by the tasks, and the finished requirements merge into the project's shared specs. Below are setup, three commands and a live example.

<b-post series="specs">
<b-chapter id="what" icon="file-lines" title="What OpenSpec is">
  <b-why>OpenSpec keeps requirements in plain Markdown files inside the repository. Live specs sit in <code>openspec/specs</code>, and every change gets its own folder in <code>openspec/changes</code><b-proof href="https://github.com/Fission-AI/OpenSpec" quote="OpenSpec: «Plain Markdown — requirements with concrete scenarios, no special syntax to learn» — github.com/Fission-AI/OpenSpec"/>. The agent reads these files the same way it reads code.</b-why>
  <iso-art name="term:openspec"></iso-art>
  <b-io justify>
    <item k="proposal.md" mono>why the change and what it touches</item>
    <item k="specs/" mono>requirements with “when — then” scenarios</item>
    <item k="design.md" mono>how: decisions and risks</item>
    <item k="tasks.md" mono>a checklist of tasks</item>
  </b-io>
  <b-finding>
    <ex>Four files of one change: why, what, how and in which steps.</ex>
    <gen>The plan sits next to the code and gets reviewed before the agent starts writing. A flaw in the idea shows up in a paragraph of text, before it reaches the code.</gen>
    <do>Before a large change, ask the agent to put a plan into a change folder first and only then write code.</do>
  </b-finding>
</b-chapter>

<b-chapter id="install" icon="terminal" title="Setup">
  <b-why align="left">OpenSpec installs with one command and is switched on in a project with a second one. On macOS and Linux, in a terminal:</b-why>
  <b-codebox title="Install on macOS and Linux">
    curl -fsSL https://openspec.dev/cli/install.sh | sh
  </b-codebox>
  <b-why align="left">Through npm you need Node.js 22.12 or newer<b-proof href="https://github.com/Fission-AI/OpenSpec" quote="OpenSpec: «npm install -g @fission-ai/openspec@latest (needs Node.js 22.12.0 or higher)» — github.com/Fission-AI/OpenSpec"/>. After installing, open the project folder and switch OpenSpec on:</b-why>
  <b-codebox title="Through npm and in the project">
    npm install -g @fission-ai/openspec@latest
    cd your-project
    openspec init
  </b-codebox>
  <b-finding>
    <ex><code>openspec init</code> asks which agents you use and installs commands for them.</ex>
    <gen>The command name depends on the agent: <code>/opsx:propose</code> in Claude Code, <code>/opsx-propose</code> in Cursor and GitHub Copilot, <code>$openspec-propose</code> in Codex<b-proof href="https://github.com/Fission-AI/OpenSpec" quote="OpenSpec: «/opsx:propose is the canonical name; your tool may spell it /opsx-propose (Cursor, GitHub Copilot), @opsx-propose (Amazon Q) or $openspec-propose (Codex)» — github.com/Fission-AI/OpenSpec"/>.</gen>
    <do>You can hand the setup to the agent itself: ask it to install OpenSpec and run <code>openspec init</code> in the current project.</do>
  </b-finding>
</b-chapter>

<b-chapter id="flow" icon="list-arrow" title="Three commands: plan, code, merge">
  <b-why align="left">The main path is three commands. Before them you can think out loud with <code>/opsx:explore</code>: the agent reads the code and suggests options without changing anything.</b-why>
  <b-steps>
    <step t="/opsx:propose">the agent creates a change folder: proposal, requirements, design and tasks</step>
    <step t="Plan review">you read the files and edit them before any code</step>
    <step t="/opsx:apply">the agent writes code by the tasks and ticks them off</step>
    <step t="/opsx:archive" hl>the change's requirements merge into the shared specs, the folder goes to the archive</step>
  </b-steps>
  <b-finding>
    <ex>After archiving, <code>openspec/specs</code> holds the current description of the system, and the history of decisions sits in the change archive.</ex>
    <gen>Specs are updated in the same step as the code, so they do not go stale like a separate wiki.</gen>
    <do>Do not skip archiving: without it the next change builds on old requirements.</do>
  </b-finding>
</b-chapter>

<b-chapter id="example" icon="notebook" title="A live example from this site">
  <b-why align="left">The change <code>fill-all-pattern-details</code> in this site's repository. The task: 72 of 73 patterns in the catalog opened with only a title on click, and each needed a full card.</b-why>
  <b-io justify>
    <item k="proposal.md" mono>why: the pattern catalog is a key part of the talk, and empty cards spoil it</item>
    <item k="design.md" mono>one task per category, quotes only from the source file</item>
    <item k="tasks.md" mono>10 tasks for 10 categories, all ticked</item>
  </b-io>
  <b-codebox title="A requirement excerpt from specs/pattern-detail/spec.md">
    ## MODIFIED Requirements
    ### Requirement: Pattern detail content structure
    All patterns in all categories SHALL have a filled detail.
    #### Scenario: Partial content
    - WHEN the user opens a pattern that has only problem and solution
    - THEN the card shows only those sections, with no empty blocks
  </b-codebox>
  <b-finding>
    <ex>The “partial content” scenario appeared in the plan before the code and set how a card behaves without a quote or a diagram.</ex>
    <gen>Requirements with “when — then” scenarios read like tests: the agent knows what counts as done.</gen>
    <do>In every requirement write at least one scenario for an edge case: empty data, partial data, an error.</do>
  </b-finding>
</b-chapter>

<b-chapter id="kit" icon="crosshair" title="OpenSpec or Spec Kit">
  <b-table>
  | | OpenSpec | Spec Kit |
  |---|---|---|
  | Order of steps | flexible: you can return to the plan at any time | fixed phases: principles, spec, plan, tasks, code |
  | Where specs live | <code>openspec/specs</code> and change folders | a feature folder with a spec, a plan and tasks |
  | Which project | fits code that already runs | fits a new feature from scratch |
  | Made by | Fission AI | GitHub |
  </b-table>
  <b-finding>
    <ex>OpenSpec describes itself as flexible and built for existing code<b-proof href="https://github.com/Fission-AI/OpenSpec" quote="OpenSpec: «fluid not rigid → iterative not waterfall → easy not complex → built for brownfield not just greenfield» — github.com/Fission-AI/OpenSpec"/>.</ex>
    <gen>Spec Kit walks you through steps and suits a team that needs discipline. OpenSpec is lighter and settles faster in a project where code already exists.</gen>
    <do>For changes in a running project start with OpenSpec; for a large new feature from scratch, try both on one task.</do>
  </b-finding>
</b-chapter>

<b-chapter id="start" icon="flag" title="How to start">
  <b-why align="left">Five prompts for the agent, one per step. Paste them into Claude Code, Codex or Cursor.</b-why>
  <b-hdd-steps>
    <step t="Setup">“Install OpenSpec and run openspec init in this project. Show which commands appeared”</step>
    <step t="Exploration">“/opsx:explore I want to add … Look at the code and suggest two options without changing anything”</step>
    <step t="Plan">“/opsx:propose … Only the plan first. Give scenarios for empty and partial data in the requirements”</step>
    <step t="Code">“/opsx:apply Do the tasks one by one and run the tests after each”</step>
    <step t="Merge">“/opsx:archive Move the requirements into the specs and show what changed in openspec/specs”</step>
  </b-hdd-steps>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Frequently asked questions">
  <b-faq-cards>
    <q t="What is OpenSpec?">A free open-source framework by Fission AI for spec-driven development. The agent writes a change plan into Markdown files, you review it, the agent writes code, and the requirements merge into the project's shared specs.</q>
    <q t="How do I install OpenSpec?">With curl -fsSL https://openspec.dev/cli/install.sh | sh on macOS and Linux, or with npm install -g @fission-ai/openspec@latest. Then run openspec init in the project folder.</q>
    <q t="How is OpenSpec different from Spec Kit?">OpenSpec is more flexible and built for code that already runs; steps can repeat in any order. GitHub's Spec Kit walks through fixed phases: principles, spec, plan, tasks, code.</q>
    <q t="Which agents does OpenSpec work with?">Claude Code, Codex, Cursor, GitHub Copilot, Amazon Q and others. openspec init installs commands for the agents you pick.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Further reading">
  <b-links>
    <item href="/blog/specs-rules-skills/" k="Context" t="AGENTS.md and CLAUDE.md">what an agent should know about a project and where to keep it</item>
    <item href="/blog/specs-by-aggregates/" k="Specs" t="Specs by aggregates">how to split requirements into parts</item>
    <item href="/blog/spec-reconcile-loop/" k="Specs" t="A reconcile loop for specs">how to keep the spec and the code in agreement</item>
    <item href="/materials/glossary/spec-driven-development/" k="Term" t="Spec-Driven Development">what spec-driven development is</item>
  </b-links>
</b-chapter>
</b-post>
