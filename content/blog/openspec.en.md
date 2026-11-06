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
  <b-why align="left">Without a plan, an agent writes code straight from a chat message. The intent lives only in that chat: a week later nobody remembers why it was done this way, and the next agent starts from scratch and may redo it its own way.</b-why>
  <b-why align="left">OpenSpec moves the intent out of the chat into files next to the code. Every change gets its own folder in <code>openspec/changes</code>: it records why, which requirements change, how to do it and in which steps. The live requirements for the whole system sit separately, in <code>openspec/specs</code>. It is plain Markdown with no special syntax<b-proof href="https://github.com/Fission-AI/OpenSpec" quote="OpenSpec: «Plain Markdown — requirements with concrete scenarios, no special syntax to learn» — github.com/Fission-AI/OpenSpec"/>, so both people and the agent read it.</b-why>
  <iso-art name="term:openspec"></iso-art>
  <b-table>
  | File | Which question it answers | What is inside |
  |---|---|---|
  | <code>proposal.md</code> | Why? | the reason for the change and what exactly changes |
  | <code>specs/</code> | What must be true? | requirements with SHALL and MUST and “when — then” scenarios |
  | <code>design.md</code> | How? | technical decisions, goals, non-goals, risks |
  | <code>tasks.md</code> | In which order? | a checklist of tasks the agent follows |
  </b-table>
  <b-finding>
    <ex>The four files of one change answer four questions: why, what, how and in which order.</ex>
    <gen>The plan sits next to the code and gets reviewed before the agent starts writing. A flaw in the idea shows up in a paragraph of text, before it reaches the code.</gen>
    <do>Before a large change, ask the agent to put a plan into a change folder first and only then write code.</do>
  </b-finding>
</b-chapter>

<b-chapter id="install" icon="terminal" title="Setup">
  <b-why align="left">OpenSpec has two parts. The first is the <code>openspec</code> command-line program: you install it once per computer. The second is setting up a specific project: <code>openspec init</code> creates an <code>openspec/</code> folder in it and adds commands like <code>/opsx:propose</code> to your agents.</b-why>
  <b-pipe label="What happens during setup">
    <node icon="terminal" color="c-code" sub="once per computer">install openspec</node>
    <node icon="folder" color="c-proj" sub="in the project folder">openspec init</node>
    <node icon="bot" color="c-chat" sub="commands for the chosen agents">/opsx:propose and others</node>
  </b-pipe>
  <b-codebox title="Install on macOS and Linux">
    curl -fsSL https://openspec.dev/cli/install.sh | sh
  </b-codebox>
  <b-why align="left">If you prefer npm, you need Node.js 22.12 or newer<b-proof href="https://github.com/Fission-AI/OpenSpec" quote="OpenSpec: «npm install -g @fission-ai/openspec@latest (needs Node.js 22.12.0 or higher)» — github.com/Fission-AI/OpenSpec"/>. Windows has its own PowerShell install script, and macOS has a Homebrew formula. Then open the project folder and switch OpenSpec on:</b-why>
  <b-codebox title="Through npm and in the project">
    npm install -g @fission-ai/openspec@latest
    cd your-project
    openspec init
  </b-codebox>
  <b-why align="left"><code>openspec init</code> asks which agents you use and installs commands for exactly those. The command name differs by agent: <code>/opsx:propose</code> in Claude Code, <code>/opsx-propose</code> in Cursor and GitHub Copilot, <code>$openspec-propose</code> in Codex<b-proof href="https://github.com/Fission-AI/OpenSpec" quote="OpenSpec: «/opsx:propose is the canonical name; your tool may spell it /opsx-propose (Cursor, GitHub Copilot), @opsx-propose (Amazon Q) or $openspec-propose (Codex)» — github.com/Fission-AI/OpenSpec"/>. The rest of the article uses the Claude Code spelling.</b-why>
  <b-finding>
    <ex>Two commands: one installs the program, the other prepares the project and connects the agents.</ex>
    <gen>You do not have to set it up by hand: OpenSpec has a ready prompt with which the agent installs the program, runs <code>openspec init</code> and checks the result.</gen>
    <do>Ask the agent: “Install OpenSpec and run openspec init in this project, show which commands appeared”.</do>
  </b-finding>
</b-chapter>

<b-chapter id="flow" icon="list-arrow" title="Three commands: plan, code, merge">
  <b-why align="left">Work goes around a loop of three commands. Before them you can think out loud with <code>/opsx:explore</code>: the agent reads the code, suggests options and changes nothing. Once it is clear what to do, the main path starts. A sample session based on the demo in the OpenSpec description<b-proof href="https://github.com/Fission-AI/OpenSpec" quote="OpenSpec: «You: /opsx:propose add-dark-mode / AI: Created openspec/changes/add-dark-mode/ ✓ proposal.md ✓ specs/ ✓ design.md ✓ tasks.md … You: /opsx:archive / AI: Archived to openspec/changes/archive/… Specs updated.» — github.com/Fission-AI/OpenSpec"/>:</b-why>
  <b-agent-term app="Claude&#8203; Code" ver="v2" model="OpenSpec · /opsx" path="~/projects/shop">
    <line kind="ask">/opsx:propose add-dark-mode</line>
    <line kind="act">Created openspec/changes/add-dark-mode/</line>
    <line kind="out">proposal.md · specs/ · design.md · tasks.md</line>
    <line kind="you" note="you review the plan">Add a scenario: the theme survives a reload</line>
    <line kind="ask">/opsx:apply</line>
    <line kind="act">1.1 theme context ✓ · 1.2 toggle ✓ · 2.1 colours ✓</line>
    <line kind="out">all tasks complete</line>
    <line kind="ask">/opsx:archive</line>
    <line kind="act">Moved the requirements into openspec/specs and the change folder to the archive</line>
  </b-agent-term>
  <b-table>
  | Command | What the agent does | What appears in the project | What you do |
  |---|---|---|---|
  | <code>/opsx:explore</code> | reads the code, suggests options | nothing | pick an option |
  | <code>/opsx:propose</code> | writes the change plan | an <code>openspec/changes/name/</code> folder with four files | read and edit the plan |
  | <code>/opsx:apply</code> | writes code by the tasks, ticks them off | code and tests | check the result |
  | <code>/opsx:archive</code> | merges the requirements into the shared specs | updated <code>openspec/specs</code>, the folder archived | nothing, this is the end |
  </b-table>
  <b-why align="left">For large tasks there is an expanded set: create a change step by step, continue one in progress, verify the code against the spec. Switch it on with <code>openspec config profile</code>.</b-why>
  <b-finding>
    <ex>After archiving, <code>openspec/specs</code> holds the current description of the system, and the history of decisions sits in the change archive.</ex>
    <gen>Specs are updated in the same step as the code, so they do not go stale like a separate wiki.</gen>
    <do>Do not skip archiving: without it the next change builds on old requirements.</do>
  </b-finding>
</b-chapter>

<b-chapter id="example" icon="notebook" title="A live example from this site">
  <b-why align="left">The change <code>fill-all-pattern-details</code> from this site’s repository. In the AI pattern catalog, 72 of 73 cards opened with only a title and one line on click. Each needed filling in: problem, solution, quote, when it works and when it breaks.</b-why>
  <b-table>
  | File | What it held |
  |---|---|
  | <code>proposal.md</code> | why: the pattern catalog is a key part of the talk and empty cards spoil it; what changes: the detail field for every pattern |
  | <code>design.md</code> | one task per pattern category; quotes only from the source file, nothing invented; a diagram only where there is a data flow |
  | <code>specs/pattern-detail/spec.md</code> | the requirement “every pattern has a filled detail” and three scenarios for showing a card |
  | <code>tasks.md</code> | 10 tasks for 10 categories, all ticked |
  </b-table>
  <b-codebox title="A requirement excerpt from specs/pattern-detail/spec.md">
    ## MODIFIED Requirements
    ### Requirement: Pattern detail content structure
    All patterns in all categories SHALL have a filled detail.
    #### Scenario: Partial content
    - WHEN the user opens a pattern that has only problem and solution
    - THEN the card shows only those sections, with no empty blocks
  </b-codebox>
  <b-why align="left">The “quotes only from the source” decision was written in design.md before the code. So the agent did not make up quotes where there were none, and the “partial content” scenario set in advance how a card looks without a quote or a diagram.</b-why>
  <b-finding>
    <ex>The “partial content” scenario appeared in the plan before the code and set how a card behaves without a quote or a diagram.</ex>
    <gen>Requirements with “when — then” scenarios read like tests: the agent knows what counts as done.</gen>
    <do>In every requirement write at least one scenario for an edge case: empty data, partial data, an error.</do>
  </b-finding>
</b-chapter>

<b-chapter id="kit" icon="crosshair" title="OpenSpec or Spec Kit">
  <b-why align="left">Both drive development from a specification, but they see order differently. GitHub’s Spec Kit walks through phases strictly one after another. OpenSpec lets you return to the plan at any time and is built for a project where code already exists<b-proof href="https://github.com/Fission-AI/OpenSpec" quote="OpenSpec: «fluid not rigid → iterative not waterfall → easy not complex → built for brownfield not just greenfield» — github.com/Fission-AI/OpenSpec"/>.</b-why>
  <b-table>
  | | OpenSpec | Spec Kit |
  |---|---|---|
  | Order of steps | flexible: you can return to the plan at any time | fixed phases: principles, spec, plan, tasks, code |
  | Where specs live | <code>openspec/specs</code> and change folders | a feature folder with a spec, a plan and tasks |
  | Which project | fits code that already runs | fits a new feature from scratch |
  | Several repositories | a shared plan store (Stores, beta) | each repository on its own |
  | Made by | Fission AI | GitHub |
  </b-table>
  <b-finding>
    <ex>OpenSpec describes itself as flexible and built for existing code.</ex>
    <gen>Spec Kit walks you through steps and suits a team that needs discipline. OpenSpec is lighter and settles faster in a project where code already exists.</gen>
    <do>For changes in a running project start with OpenSpec; for a large new feature from scratch, try both on one task.</do>
  </b-finding>
</b-chapter>

<b-chapter id="start" icon="flag" title="How to start">
  <b-why align="left">Start with one small change you were going to make anyway. Five prompts for the agent, one per step: paste them into Claude Code, Codex or Cursor and fill in your task.</b-why>
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
