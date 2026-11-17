---
title: Cursor rules vs AGENTS.md: what goes where
seoTitle: Cursor rules vs AGENTS.md: what goes where (2026)
date: 2026-11-15
updated: 2026-11-17
description: Cursor rules live in .cursor/rules and have modes; AGENTS.md is plain markdown many agents read. Comparison table, a before-and-after migration, FAQ.
tags: AI, Cursor, AGENTS.md, rules, .cursorrules, harness
category: specs
layout: wide
mentions: AGENTS.md, Cursor, CLAUDE.md, Codex
toc: answer=Quick answer | table=Side by side | modes=Four modes | migrate=Migration | readers=Who reads AGENTS.md | pick=What goes where | faq=Questions | next=Further reading
---

Cursor rules and AGENTS.md both give an agent standing instructions, and they differ in reach. AGENTS.md is plain markdown in the project root that Cursor and many other agents read. Rules in .cursor/rules are .mdc files with four application modes, and they are Cursor's own format. Put shared instructions in AGENTS.md and conditional ones in .mdc.

<b-post series="prompts">
<b-chapter id="answer" title="Quick answer" icon="crosshair">
  <b-why>Cursor accepts two formats at once: AGENTS.md for simple cases and project rules for control over when a rule applies<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: «For more control over when rules apply, use project rules in .cursor/rules/ instead» — cursor.com/help/customization/rules"/>.</b-why>
  <b-finding>
    <ex>AGENTS.md holds what every agent must know; .cursor/rules holds what only Cursor must know, and only sometimes.</ex>
    <gen>AGENTS.md has no modes and no metadata, so any agent can read it. An .mdc rule adds modes, so it can wait until a file type or a request calls for it.</gen>
    <do>Move commands and bans to AGENTS.md, keep file-type rules in .cursor/rules, delete .cursorrules.</do>
  </b-finding>
</b-chapter>
<b-chapter id="table" title="Cursor rules and AGENTS.md side by side" icon="table-grid">
  <b-why>Every cell comes from the Cursor, agents.md or OpenAI documentation; the source is behind the icon. Checked 15.11.2026.</b-why>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th></th><th>AGENTS.md</th><th>.cursor/rules/*.mdc</th></tr>
    </thead>
    <tbody>
      <tr><td>Scope</td><td>the project; a nested file for a subfolder<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: «Cursor supports AGENTS.md in the project root and subdirectories» — cursor.com/docs/context/rules"/></td><td>the project, split into rules; User Rules (all your projects) and Team Rules (a whole organization) are separate levels<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: Team Rules → Project Rules → User Rules is the order of precedence; Team Rules are managed from the dashboard — cursor.com/docs/context/rules"/></td></tr>
      <tr><td>Who reads it</td><td>Cursor, Codex, Copilot, Windsurf, OpenCode and others<b-proof href="https://agents.md/" quote="agents.md: «A simple, open format for guiding coding agents» — Cursor and Codex are in the list of supporting agents — agents.md"/></td><td>Cursor</td></tr>
      <tr><td>File and place</td><td><code>AGENTS.md</code> in the root and in subfolders; the nearest file to the edited one wins<b-proof href="https://agents.md/" quote="agents.md: «The closest AGENTS.md to the edited file wins; explicit user chat prompts override everything» — agents.md"/></td><td><code>.cursor/rules/</code>, one file per rule; rules can sit in folders<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: «Stored in .cursor/rules, version-controlled and scoped to your codebase» — cursor.com/docs/context/rules"/></td></tr>
      <tr><td>Format</td><td>plain markdown, no required fields<b-proof href="https://agents.md/" quote="agents.md: «No. AGENTS.md is just standard Markdown» — agents.md"/></td><td>markdown with a header of <code>description</code>, <code>globs</code>, <code>alwaysApply</code>; the extension must be <code>.mdc</code>, a plain <code>.md</code> is ignored<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: «Project rules must use the .mdc extension» — cursor.com/docs/context/rules"/></td></tr>
      <tr><td>When it applies</td><td>picked up automatically, no modes<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: «Write instructions in plain markdown. Cursor picks it up automatically» — cursor.com/help/customization/rules"/></td><td>one of four modes: always, by description, by file pattern, manually</td></tr>
      <tr><td>Versioning</td><td>a file in the repository, changes go through git</td><td>stored in the repository; the docs advise committing the rules<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: «Check your rules into git so your whole team benefits» — cursor.com/docs/context/rules"/></td></tr>
      <tr><td>Size</td><td>the Cursor docs give no figure; Codex caps all its instruction files together at 32 KiB by default<b-proof href="https://learn.chatgpt.com/docs/agent-configuration/agents-md" quote="Codex: combined instructions are capped by project_doc_max_bytes, which is 32 KiB by default — learn.chatgpt.com/docs/agent-configuration/agents-md"/></td><td>under 500 lines per rule, large ones split<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: «Keep rules under 500 lines. Split large rules into smaller, focused files» — cursor.com/help/customization/rules"/></td></tr>
      <tr><td>Old .cursorrules</td><td colspan="2">a single file in the root, replaced by both formats<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: «The .cursorrules file in your project root is legacy and will be deprecated» — cursor.com/help/customization/rules"/></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>Cursor also treats CLAUDE.md as always on: it applies to every conversation, whatever <code>alwaysApply</code> says<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: «CLAUDE.md files are always applied to every conversation, regardless of any alwaysApply frontmatter setting» — cursor.com/help/customization/rules"/>.</b-cap>
</b-chapter>
<b-chapter id="modes" title="Four modes of a Cursor rule" icon="list-arrow">
  <b-why>The mode decides when a rule enters the context. It is set in the rule's header and in the rule type menu.</b-why>
  <b-rule-modes>
    <mode t="Always">every chat</mode>
    <mode t="By description">the agent decides</mode>
    <mode t="By files">a path pattern matched</mode>
    <mode t="Manually">@rule</mode>
  </b-rule-modes>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>Mode in Cursor</th><th>What triggers it</th><th>Header field</th></tr>
    </thead>
    <tbody>
      <tr><td>Always Apply</td><td>every chat session<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: Always Apply — «included in every conversation» — cursor.com/help/customization/rules"/></td><td><code>alwaysApply: true</code>; globs and description are then ignored<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: when alwaysApply is true the rule is always included, and globs and description are ignored — cursor.com/docs/context/rules"/></td></tr>
      <tr><td>Apply Intelligently</td><td>the agent decides from the description<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: Apply Intelligently — «Agent decides when it's relevant» — cursor.com/help/customization/rules"/></td><td><code>description</code> with <code>alwaysApply: false</code> and no globs</td></tr>
      <tr><td>Apply to Specific Files</td><td>a file matches a pattern<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: Apply to Specific Files — «only applies for files matching a pattern» — cursor.com/help/customization/rules"/></td><td><code>globs</code><b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: «Use globs to scope a rule to specific files or directories» — cursor.com/docs/context/rules"/></td></tr>
      <tr><td>Apply Manually</td><td>you @mention the rule in chat<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: Apply Manually — «only used when you @mention it in chat» — cursor.com/help/customization/rules"/></td><td>the rule is called by name, for example <code>@my-rule</code></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>Older guides by third parties call the same four modes Always, Auto Attached, Agent Requested and Manual. The current Cursor docs use the names in the table.</b-cap>
</b-chapter>
<b-chapter id="migrate" title="Migration: from .cursorrules to AGENTS.md and .mdc" icon="notebook">
  <b-why>An example project, written for this article. The file formats follow the Cursor docs; the project is made up.</b-why>
  <b-sublabel top="18">Before: one file in the root</b-sublabel>
  <b-codebox title="Project tree before">
    my-app/
    ├── .cursorrules
    ├── src/
    └── package.json
  </b-codebox>
  <b-codebox title=".cursorrules">
    You are working on a React + TypeScript app.
    Run `npm test` before finishing a task.
    Format with `npm run lint -- --fix`.
    Never edit files in dist/.
    Never log tokens or user emails.
    Components: function components with hooks, one component per file,
    props typed with an interface named <Name>Props.
    The test file sits next to the component: Button.test.tsx.
    API calls go through src/api/client.ts; validate every response with zod.
  </b-codebox>
  <b-sublabel top="18">The official way: four steps</b-sublabel>
  <b-seq-row>
    <step t="Create">a rule via the command palette: “New Cursor Rule”</step>
    <step t="Copy">the text from .cursorrules</step>
    <step t="Mode">Always Apply</step>
    <step t="Delete">.cursorrules from the root</step>
  </b-seq-row>
  <b-cap>These are the four steps of the Cursor guide; Always Apply keeps the old behavior<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: «Set the rule type to Always Apply (this matches the old behavior)» — cursor.com/help/customization/rules"/>. The result is one rule that is always on. A split by condition is the next step.</b-cap>
  <b-sublabel top="18">After: shared text in AGENTS.md, conditional text in .mdc</b-sublabel>
  <b-codebox title="Project tree after">
    my-app/
    ├── AGENTS.md
    ├── .cursor/
    │   └── rules/
    │       ├── react-components.mdc
    │       └── api-validation.mdc
    ├── src/
    └── package.json
  </b-codebox>
  <b-codebox title="AGENTS.md" copy>
    # my-app
    React + TypeScript app.

    ## Commands
    - Run `npm test` before finishing a task.
    - Format with `npm run lint -- --fix`.

    ## Bans
    - Never edit files in `dist/`.
    - Never log tokens or user emails.
  </b-codebox>
  <b-codebox title=".cursor/rules/react-components.mdc" copy>
    ---
    description: Standards for React components
    globs: "*.tsx"
    alwaysApply: false
    ---
    - Function components with hooks, one component per file.
    - Props typed with an interface named `<Name>Props`.
    - The test file sits next to the component: `Button.test.tsx`.
  </b-codebox>
  <b-codebox title=".cursor/rules/api-validation.mdc" copy>
    ---
    description: Rules for API calls and response validation
    alwaysApply: false
    ---
    - API calls go through `src/api/client.ts`.
    - Validate every response with zod.
  </b-codebox>
  <b-finding>
    <ex>Nine lines of one file became three files: five lines every agent reads, and two rules that Cursor loads only when they apply.</ex>
    <gen>Commands and bans hold for the whole project, so any agent needs them. Component and API rules matter only for part of the code: the first for <code>.tsx</code> files, the second when the agent judges the description relevant.</gen>
    <do>Split the old file by one question: does every agent need this line in every session? Yes goes to AGENTS.md, no goes to a rule with a mode.</do>
  </b-finding>
</b-chapter>
<b-chapter id="readers" title="Which agents read AGENTS.md" icon="table-grid">
  <b-why>The agents.md site lists many supporting agents, among them Codex, Cursor, Copilot, Windsurf, Gemini CLI, Zed and Warp<b-proof href="https://agents.md/" quote="agents.md: the page lists Codex, Jules, Cursor, Gemini CLI, GitHub Copilot's coding agent, Windsurf and others — agents.md"/>. The conditions differ by agent: Claude Code reads AGENTS.md only when the project has no CLAUDE.md, Gemini CLI after a setting is changed.</b-why>
  <b-links cols="1">
    <item href="/blog/specs-rules-skills/#matrix" k="Table" t="Which agent reads which file">Claude Code, Codex, Cursor, Copilot, Gemini CLI, Windsurf, OpenCode: AGENTS.md, CLAUDE.md and their own files</item>
  </b-links>
</b-chapter>
<b-chapter id="pick" title="What goes where" icon="crosshair">
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>What</th><th>Where</th><th>Why</th></tr>
    </thead>
    <tbody>
      <tr><td>Build and test commands</td><td>AGENTS.md</td><td>every agent needs them in every session</td></tr>
      <tr><td>Bans: no editing of <code>dist/</code>, no secrets in logs</td><td>AGENTS.md</td><td>hold for the whole project</td></tr>
      <tr><td>Style of one file type, for example <code>*.tsx</code></td><td>.mdc, Apply to Specific Files</td><td>loads only when such a file is in play</td></tr>
      <tr><td>A topic needed from time to time: API calls, migrations</td><td>.mdc, Apply Intelligently</td><td>the agent reads the description and pulls the rule in</td></tr>
      <tr><td>A rare checklist</td><td>.mdc, Apply Manually</td><td>enters the chat only on @mention</td></tr>
      <tr><td>A rule for the whole organization</td><td>Team Rules</td><td>managed from the Cursor dashboard on Team and Enterprise plans<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: Team and Enterprise plans can create and enforce rules across their organization from the dashboard — cursor.com/docs/context/rules"/></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>Keep each instruction in one place. A line copied into AGENTS.md and into a rule has to be fixed twice.</b-cap>
</b-chapter>
<b-chapter id="faq" icon="chat" title="Frequently asked questions">
  <b-faq-cards>
    <q t="Does Cursor read AGENTS.md?">Yes. Cursor reads AGENTS.md in the project root and in subfolders, as plain markdown without metadata, and picks it up automatically. Instructions from a nested AGENTS.md are combined with those of parent folders, and the more specific ones take precedence. Source: cursor.com/docs/context/rules and cursor.com/help/customization/rules, checked 15.11.2026.</q>
    <q t="Do I still need .cursorrules?">No. The Cursor docs call the root .cursorrules legacy and describe the move: create a rule in Always Apply mode, copy the text, delete the file. Source: cursor.com/help/customization/rules, checked 15.11.2026.</q>
    <q t="Can I keep both AGENTS.md and .cursor/rules?">Yes. Cursor describes them as two options: AGENTS.md for simple cases, project rules for control over when a rule applies. A sensible split is shared commands and bans in AGENTS.md and rules with a condition in .cursor/rules; each instruction lives in one place. Source: cursor.com/help/customization/rules, checked 15.11.2026.</q>
    <q t="How many rules and how long should they be?">Cursor recommends under 500 lines per rule and splitting large rules into smaller, focused files. The pages checked name no cap on the number of rules and no length for AGENTS.md; Codex caps its AGENTS.md files together at 32 KiB by default. Sources: Cursor and OpenAI docs, checked 15.11.2026.</q>
  </b-faq-cards>
</b-chapter>
<b-chapter id="next" title="Further reading">
  <b-links cols="2">
    <item href="/blog/specs-rules-skills/" k="Context" t="AGENTS.md, CLAUDE.md and spec.md: what goes where">Four layers, a table of agents, a real file</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="Comparison" t="Claude Code, Codex, Cursor and Hermes Agent">Which agent for which task</item>
    <item href="/en/blog/codex-or-chatgpt-what-to-choose/" k="Choice" t="Codex or ChatGPT: which to choose">Chat or a coding agent</item>
    <item href="/blog/harness-driven-development/" k="Method" t="Harness-Driven Development">An agent mistake becomes a rule</item>
  </b-links>
</b-chapter>
<b-footer>Based on the Cursor, agents.md and OpenAI documentation, the source is behind the icon next to each claim; checked 15.11.2026. The example project is made up.</b-footer>
</b-post>
