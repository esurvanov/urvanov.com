---
title: What are AGENTS.md and CLAUDE.md and how they differ from spec.md: an example file and where to keep specs, rules and skills
date: 2026-09-28
updated: 2026-11-15
description: How a project rules file differs from a single-task description, which agent reads which file, and how to move off .cursorrules. A real CLAUDE.md example and what goes where. Based on vendor docs.
tags: AI, Claude Code, CLAUDE.md, harness, specs, skills
category: specs
layout: wide
mentions: AGENTS.md, CLAUDE.md, Agent Skills, Spec Kit, Memory Bank
toc: map=Four layers | spec=Spec | bible=Bible | rules=Rules | matrix=Who reads what | cursor=Cursor | example=Example | skills=Skills | chat=In a chat | pick=What goes where | faq=Questions | next=Further reading
---

AGENTS.md gives an AI agent rules for the whole project and enters every session, while spec.md describes one task: requirements and done criteria. Cursor reads both AGENTS.md and its own rules in .cursor/rules; Claude Code reads AGENTS.md when the project has no CLAUDE.md. Below: which agent reads which file, an example file and what goes where.

<b-post series="prompts">
<b-ctx-layers>
  <layer kind="spec" t="Spec" when="for one task">what to build in one task</layer>
  <layer kind="bible" t="Bible" when="at task start">what the product is</layer>
  <layer kind="rules" t="Rules" when="every session">how to work in the project</layer>
  <layer kind="skill" t="Skill" when="on call">how to run a procedure</layer>
</b-ctx-layers>
<b-cap>A model does not remember a project between sessions<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: «Large language models don&#x27;t retain memory between completions. Rules provide persistent, reusable context at the prompt level» — cursor.com/docs/context/rules"/>. Four kinds of files give that context back.</b-cap>
<b-chapter id="map" title="Four layers of context" icon="table-grid">
  <b-ctx-table phone="hide4">
    <table>
    <thead>
      <tr><th>Layer</th><th>What goes in</th><th>When in context</th><th>Files</th></tr>
    </thead>
    <tbody>
      <tr><td><b-ctx-layer kind="spec">Spec</b-ctx-layer></td><td>requirements, plan, steps of one task</td><td>for one task</td><td><code>spec.md · plan.md · tasks.md</code></td></tr>
      <tr><td><b-ctx-layer kind="bible">Bible</b-ctx-layer></td><td>product goal, users, decisions</td><td>at task start</td><td><code>projectbrief.md · productContext.md</code></td></tr>
      <tr><td><b-ctx-layer kind="rules">Rules</b-ctx-layer></td><td>commands, style, prohibitions</td><td>every session</td><td><code>CLAUDE.md · AGENTS.md · .cursor/rules</code></td></tr>
      <tr><td><b-ctx-layer kind="skill">Skill</b-ctx-layer></td><td>procedure with examples and scripts</td><td>description always, body on call</td><td><code>SKILL.md</code></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-finding>
    <ex>The layers differ in lifetime and in when they enter the context.</ex>
    <gen>Rules load into every session, so they are kept short: Anthropic recommends under 200 lines per file<b-proof href="https://code.claude.com/docs/en/memory" quote="Anthropic: «Size: target under 200 lines per CLAUDE.md file. Longer files consume more context and reduce adherence» — code.claude.com/docs/en/memory"/>. Long and rarely used content moves into skills, whose body loads only on call<b-proof href="https://code.claude.com/docs/en/skills" quote="Anthropic: «skill descriptions are loaded into context so Claude knows what&#x27;s available, but full skill content only loads when invoked» — code.claude.com/docs/en/skills"/>.</gen>
    <do>Go through your instructions file: keep facts in the rules, move procedures into skills and the product description into the bible.</do>
  </b-finding>
</b-chapter>
<b-chapter id="spec" title="Spec: one task before the code" icon="file-lines">
  <b-why>A spec describes the task before work starts: first what and why, then how<b-proof href="https://github.com/github/spec-kit" quote="GitHub Spec Kit: «Define what and why before deciding how to build it. SDD turns your requirements into a specification, a technical plan, and actionable tasks, then guides implementation against those artifacts» — github.com/github/spec-kit"/>.</b-why>
  <b-seq-row>
    <step t="Principles">once per project</step>
    <step t="Spec">what and why</step>
    <step t="Plan">how</step>
    <step t="Tasks">steps</step>
    <step t="Implement">code step by step</step>
  </b-seq-row>
  <b-cap>Main steps of GitHub Spec Kit<b-proof href="https://github.com/github/spec-kit" quote="GitHub Spec Kit: the constitution is created once per project — «Create principles focused on code quality, testing, and maintainability». Paraphrase — github.com/github/spec-kit"/>. How to split a large spec into parts: <a href="/en/blog/specs-by-aggregates/">Specs by aggregates</a></b-cap>
  <b-finding>
    <ex>Spec Kit takes a task from project principles through the spec and plan to steps and code.</ex>
    <gen>Requirements are written before the code, and the review checks the result against that text. How a spec fits into the harness is covered in <a href="/en/blog/harness-driven-development/#spec">HDD and specs</a>.</gen>
    <do>For a task longer than a day, write a spec: what, why and how you will know it is done.</do>
  </b-finding>
</b-chapter>
<b-chapter id="bible" title="Project bible: what the product is" icon="notebook">
  <b-why>The bible is a standing description of the product: why it exists, who it serves, how it works and what has been decided. The term comes from practice; the closest documented analogue is Cline’s Memory Bank<b-proof href="https://docs.cline.bot/prompting/cline-memory-bank" quote="Cline: Memory Bank — «a documentation methodology that transforms Cline from a stateless assistant into a persistent development partner. Through structured markdown files, Cline can &#x27;remember&#x27; your project details across sessions» — docs.cline.bot/prompting/cline-memory-bank"/>.</b-why>
  <b-file-grid>
    <file name="projectbrief.md">goals and requirements</file>
    <file name="productContext.md">why it exists, what it solves</file>
    <file name="systemPatterns.md">architecture and patterns</file>
    <file name="techContext.md">stack and constraints</file>
    <file name="activeContext.md">current focus and next steps</file>
    <file name="progress.md">what works, what is left</file>
  </b-file-grid>
  <b-finding>
    <ex>Six Memory Bank files: from the product goal to current progress.</ex>
    <gen>The bible answers the questions otherwise asked in every new chat: what the product is, which decisions were made, what is in progress. The current-context file changes most often<b-proof href="https://docs.cline.bot/prompting/cline-memory-bank" quote="Cline: activeContext.md holds the current focus, recent changes and next steps, and is updated more often than the other files. Paraphrase — docs.cline.bot/prompting/cline-memory-bank"/>.</gen>
    <do>Start with one file: product goal, users, key terms and recent decisions with dates.</do>
  </b-finding>
</b-chapter>
<b-chapter id="rules" title="Rules: in every session" icon="list-arrow">
  <b-why>Rules are instructions the harness puts at the start of every session<b-proof href="https://code.claude.com/docs/en/memory" quote="Anthropic: «CLAUDE.md files are loaded into the context window at the start of every session» — code.claude.com/docs/en/memory"/>.</b-why>
  <b-io justify>
    <item k="CLAUDE.md" mono>Claude Code, path-scoped rules in <code>.claude/rules/</code><b-proof href="https://code.claude.com/docs/en/memory" quote="Anthropic: «Rules can also be scoped to specific file paths, so they only load into context when Claude works with matching files» — code.claude.com/docs/en/memory"/></item>
    <item k="AGENTS.md" mono>“A README for agents”: Codex, Cursor, Copilot, Windsurf, OpenCode and others; Claude Code when there is no CLAUDE.md<b-proof href="https://agents.md/" quote="agents.md: «Think of AGENTS.md as a README for agents: a dedicated, predictable place to provide the context and instructions to help AI coding agents work on your project» — agents.md"/></item>
    <item k=".cursor/rules" mono>Cursor, four ways to apply<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: four modes — Always Apply, Apply Intelligently, Apply to Specific Files, Apply Manually — cursor.com/docs/context/rules"/></item>
  </b-io>
  <b-why align="left">An AGENTS.md example for a web project. The file holds only what the agent cannot learn from the code: commands, style and prohibitions. CLAUDE.md for Claude Code works the same way.</b-why>
  <b-codebox title="AGENTS.md example">
    # AGENTS.md
    ## Commands
    - Install: npm ci
    - Tests: npm test
    - Type check: npx tsc --noEmit
    ## Style
    - Strict TypeScript, no any
    - kebab-case file names
    ## Don't
    - Don't change migrations/ without a task for it
    - Don't commit .env or keys
    ## Before finishing
    - Run the tests and the type check
  </b-codebox>
  <b-metric-line value="≤ 200">lines per CLAUDE.md file<b-proof href="https://code.claude.com/docs/en/memory" quote="Anthropic: «Size: target under 200 lines per CLAUDE.md file. Longer files consume more context and reduce adherence» — code.claude.com/docs/en/memory"/></b-metric-line>
  <b-finding>
    <ex>Three formats of one idea: an instructions file the harness reads at the start.</ex>
    <gen>Rules stay context, and the model can break them; an action that must never happen is blocked with a hook. The more specific and concise a rule, the more consistently it is followed<b-proof href="https://code.claude.com/docs/en/memory" quote="Anthropic: «Claude treats them as context, not enforced configuration. To block an action regardless of what Claude decides, use a PreToolUse hook instead. The more specific and concise your instructions, the more consistently Claude follows them» — code.claude.com/docs/en/memory"/>.</gen>
    <do>Create AGENTS.md or CLAUDE.md: build and test commands, code style, prohibitions. Move folder-specific rules into path-scoped rules.</do>
  </b-finding>
</b-chapter>
<b-chapter id="matrix" title="Which agent reads which file" icon="table-grid">
  <b-why>The table was checked against vendor docs on 15.11.2026. A cell marked “not confirmed” means the docs do not describe it.</b-why>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>Agent</th><th>AGENTS.md</th><th>CLAUDE.md</th><th>Own files</th><th>Source · checked 15.11.2026</th></tr>
    </thead>
    <tbody>
      <tr><td>Claude Code</td><td>yes when there is no CLAUDE.md (v2.1.277+); otherwise via an <code>@AGENTS.md</code> line inside CLAUDE.md</td><td>the main file</td><td><code>.claude/rules/</code></td><td><a href="https://code.claude.com/docs/en/memory">code.claude.com/docs/en/memory</a></td></tr>
      <tr><td>Codex</td><td>yes; in each folder <code>AGENTS.override.md</code> goes first; 32 KiB limit by default</td><td>only if the name is added to <code>project_doc_fallback_filenames</code></td><td><code>AGENTS.override.md</code></td><td><a href="https://learn.chatgpt.com/docs/agent-configuration/agents-md">learn.chatgpt.com · agents-md</a></td></tr>
      <tr><td>Cursor</td><td>yes, in the root and in subfolders</td><td>yes, applied in every chat</td><td><code>.cursor/rules/*.mdc</code></td><td><a href="https://cursor.com/help/customization/rules">cursor.com/help/customization/rules</a> · <a href="https://cursor.com/docs/context/rules">docs/context/rules</a></td></tr>
      <tr><td>GitHub Copilot</td><td>yes, the nearest file in the directory tree</td><td>yes, repository root only (together with GEMINI.md)</td><td><code>.github/copilot-instructions.md</code>, <code>.github/instructions/*.instructions.md</code></td><td><a href="https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions">docs.github.com · repository instructions</a></td></tr>
      <tr><td>Gemini CLI</td><td>only if the name is added to the <code>context.fileName</code> setting</td><td>not confirmed</td><td><code>GEMINI.md</code></td><td><a href="https://geminicli.com/docs/cli/gemini-md/">geminicli.com/docs/cli/gemini-md</a></td></tr>
      <tr><td>Windsurf</td><td>yes, in the root and every folder down to the working one; always on</td><td>not confirmed</td><td><code>.windsurf/rules/</code>, <code>.devin/rules/</code></td><td><a href="https://docs.devin.ai/desktop/cascade/agents-md">docs.devin.ai · cascade/agents-md</a></td></tr>
      <tr><td>OpenCode</td><td>yes, checked first</td><td>fallback when there is no AGENTS.md</td><td>global <code>~/.config/opencode/AGENTS.md</code></td><td><a href="https://opencode.ai/docs/rules/">opencode.ai/docs/rules</a></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-finding>
    <ex>Almost every agent reads AGENTS.md; CLAUDE.md is read by Claude Code, Cursor, Copilot and OpenCode.</ex>
    <gen>Gemini CLI reads AGENTS.md only after a setting change, and Codex reads CLAUDE.md only after a setting change. If a project has both files, Claude Code takes only CLAUDE.md: shared rules are pulled in with an <code>@AGENTS.md</code> line<b-proof href="https://code.claude.com/docs/en/memory" quote="Anthropic: with both AGENTS.md and CLAUDE.md present, Claude Code reads «Your CLAUDE.md files only»; to read both, CLAUDE.md starts with an @AGENTS.md line — code.claude.com/docs/en/memory"/>.</gen>
    <do>Keep shared rules in AGENTS.md; leave an <code>@AGENTS.md</code> line in CLAUDE.md plus whatever only Claude Code needs.</do>
  </b-finding>
</b-chapter>
<b-chapter id="cursor" title="Cursor rules and AGENTS.md" icon="list-arrow">
  <b-why>Cursor accepts two formats: AGENTS.md is plain markdown with no metadata, and rules in <code>.cursor/rules</code> have apply modes<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: «Cursor supports AGENTS.md in the project root and subdirectories»; «Project rules must use the .mdc extension» — cursor.com/docs/context/rules"/>.</b-why>
  <b-sublabel top="18">When a rule enters the context · .cursor/rules</b-sublabel>
  <b-rule-modes>
    <mode t="Always">every chat</mode>
    <mode t="By description">the agent decides</mode>
    <mode t="By files">path pattern matches</mode>
    <mode t="Manually">@rule</mode>
  </b-rule-modes>
  <b-cap>Four modes per the Cursor docs<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: Always Apply — «included in every conversation»; Apply Intelligently — «Agent decides when it is relevant»; Apply to Specific Files — «only applies for files matching a pattern»; Apply Manually — «only used when you @mention it in chat» — cursor.com/help/customization/rules"/>.</b-cap>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th></th><th>AGENTS.md</th><th>.cursor/rules/*.mdc</th></tr>
    </thead>
    <tbody>
      <tr><td>Format</td><td>plain markdown</td><td>a file with the <code>.mdc</code> extension; a <code>.md</code> in this folder is ignored</td></tr>
      <tr><td>When it applies</td><td>always</td><td>always, by description, by file pattern or manually</td></tr>
      <tr><td>Folders</td><td>root and nested; the nearest file takes precedence</td><td><code>.cursor/rules</code></td></tr>
      <tr><td>Size</td><td>no number in the docs</td><td>under 500 lines per rule</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-sublabel top="18">Moving off legacy .cursorrules · per Cursor docs</b-sublabel>
  <b-seq-row>
    <step t="Create">a new rule via the command palette: “New Cursor Rule”</step>
    <step t="Copy">the .cursorrules text</step>
    <step t="Mode">Always Apply</step>
    <step t="Delete">.cursorrules from the root</step>
  </b-seq-row>
  <b-cap>Cursor docs call the root .cursorrules legacy and to be deprecated<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: «The .cursorrules file in your project root is legacy and will be deprecated» + четыре шага миграции — cursor.com/help/customization/rules"/>. The Always Apply mode matches the old behavior of the file.</b-cap>
  <b-finding>
    <ex>One rule for the whole project goes in AGENTS.md; a conditional rule goes in .mdc.</ex>
    <gen>AGENTS.md and CLAUDE.md in Cursor apply in every chat; for conditional rules Cursor points to <code>.cursor/rules</code><b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: «CLAUDE.md files are always applied to every conversation, regardless of any alwaysApply frontmatter setting»; для условных правил — project rules в .cursor/rules — cursor.com/help/customization/rules"/>.</gen>
    <do>Move shared content to AGENTS.md and keep rules for specific file types in .cursor/rules.</do>
  </b-finding>
</b-chapter>
<b-chapter id="example" title="Example: a real CLAUDE.md" icon="notebook">
  <b-why>An excerpt from the CLAUDE.md of this site’s repository: only what the agent cannot learn from the code, such as where the game version comes from and a rule about dates. For Cursor, Codex and Copilot the same text moves to AGENTS.md.</b-why>
  <b-codebox title="CLAUDE.md">
    ## Games: version pinned in games.lock
    - The site is built from the commit recorded in games.lock
    - For a new game version: push to games main and wait
    ## Creation and update dates
    - On any edit of an article, set updated to today, in ru and en
    - The build fails if the text changed after updated
  </b-codebox>
  <b-finding>
    <ex>A rule backed by a build check holds better than one without it.</ex>
    <gen>Rules remain context, so a prohibition that must never be broken is closed with a check. Requirements with a model work the same way: see <a href="/en/blog/quint-vs-tests-and-tla/">Quint vs tests and TLA+</a>.</gen>
    <do>For every rule the agent broke twice, add a build check or a hook.</do>
  </b-finding>
</b-chapter>
<b-chapter id="skills" title="Skills: a procedure on call" icon="zap">
  <b-why>A skill is a folder with a SKILL.md instruction, examples and scripts for a recurring procedure<b-proof href="https://learn.chatgpt.com/docs/build-skills" quote="OpenAI: «ChatGPT and Codex start with each skill&#x27;s name and description, then load the full SKILL.md instructions when they decide to use that skill» — learn.chatgpt.com/docs/build-skills"/>.</b-why>
  <b-skill-pick start="Session start" start-note="name + description" picked="↓ the agent picked “PR review”" call="On call" call-note="full body" file="SKILL.md" file-note="instructions, examples, scripts">
    <skill>report</skill>
    <skill on>PR review</skill>
    <skill>release</skill>
    <skill>client email</skill>
  </b-skill-pick>
  <b-finding>
    <ex>Descriptions of all skills are always in context; the body loads once one is picked.</ex>
    <gen>So a long reference inside a skill costs almost nothing until it is used. A skill is worth creating when the same instruction or checklist keeps being pasted into chat, or when a section of the rules has grown into a procedure<b-proof href="https://code.claude.com/docs/en/skills" quote="Anthropic: «Create a skill when you keep pasting the same instructions, checklist, or multi-step procedure into chat, or when a section of CLAUDE.md has grown into a procedure rather than a fact. Unlike CLAUDE.md content, a skill&#x27;s body loads only when it&#x27;s used» — code.claude.com/docs/en/skills"/>.</gen>
    <do>Find a section of your rules that describes a procedure and move it into a skill with a precise description of when to use it.</do>
  </b-finding>
</b-chapter>
<b-chapter id="chat" title="The same in a chat: projects and skills" icon="chat">
  <b-io justify>
    <item k="Project instructions" eq="≈ rules">Role and format once, for every chat in the project<b-proof href="https://help.openai.com/en/articles/10169521-projects-in-chatgpt" quote="ChatGPT: a project keeps chats, files and instructions together; project instructions apply only inside it, and it can be shared with teammates. Paraphrased from the OpenAI Help Center — help.openai.com/en/articles/10169521"/><b-proof href="https://support.claude.com/en/articles/9517075-what-are-projects" quote="Claude: “You can define project instructions for each project to further tailor Claude&#39;s responses. For example, instructing Claude to use a more formal tone or answer questions from the perspective of a specific role” — support.claude.com/en/articles/9517075"/></item>
    <item k="Project files" eq="≈ bible">Sample replies, policies and templates live in the project<b-proof href="https://support.claude.com/en/articles/9517075-what-are-projects" quote="Claude: “You can upload relevant documents, text, code, or other files to a project&#39;s knowledge base, which Claude will use to better understand the context” — support.claude.com/en/articles/9517075"/></item>
    <item k="Skills" eq="= skills">A repeatable workflow with instructions and examples<b-proof href="https://support.claude.com/en/articles/12512180-use-skills-in-claude" quote="Claude: “Skills extend Claude&#39;s capabilities by giving it access to specialized knowledge and workflows” — support.claude.com/en/articles/12512180"/><b-proof href="https://help.openai.com/en/articles/20001066-skills-in-chatgpt" quote="ChatGPT: skills are reusable workflows with instructions, examples and code, on Business, Enterprise and Edu plans. Paraphrased from the OpenAI Help Center — help.openai.com/en/articles/20001066"/></item>
  </b-io>
  <b-finding>
    <ex>Three places where a prompt outlives a single chat: instructions, files and skills.</ex>
    <gen>A role, examples and format moved into a project work in every new chat without copying. A shared project gives the whole team one set of examples.</gen>
    <do>Create a project for your most frequent weekly task and move the role and format from your best prompt into its instructions.</do>
  </b-finding>
</b-chapter>
<b-chapter id="pick" title="What goes where" icon="crosshair">
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>If it is…</th><th>Where</th></tr>
    </thead>
    <tbody>
      <tr><td>a command, style or prohibition needed in every task</td><td><b-ctx-layer kind="rules">Rules</b-ctx-layer></td></tr>
      <tr><td>a multi-step procedure needed now and then</td><td><b-ctx-layer kind="skill">Skill</b-ctx-layer></td></tr>
      <tr><td>requirements for one task</td><td><b-ctx-layer kind="spec">Spec</b-ctx-layer></td></tr>
      <tr><td>product knowledge and decisions made</td><td><b-ctx-layer kind="bible">Bible</b-ctx-layer></td></tr>
      <tr><td>an agent error that keeps coming back</td><td><a href="/en/blog/harness-driven-development/#loop">rule or check · HDD</a></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-finding>
    <ex>Five situations and five places.</ex>
    <gen>Frequency and lifetime decide the place. What is always needed is kept short; what is rarely needed can be detailed.</gen>
    <do>Review the rules once a week: move procedures into skills and decisions into the bible with a date.</do>
  </b-finding>
</b-chapter>
<b-chapter id="faq" icon="chat" title="Frequently asked questions">
  <b-faq-cards>
    <q t="Does Claude Code read AGENTS.md?">Yes, when the project has no CLAUDE.md (version 2.1.277 and newer). With both files present, Claude Code reads only CLAUDE.md; to include AGENTS.md, add an @AGENTS.md line to CLAUDE.md. Source: code.claude.com/docs/en/memory, checked 15.11.2026.</q>
    <q t="Do I still need .cursorrules?">No. Cursor docs call the root .cursorrules legacy and describe the move: create a new rule in Always Apply mode, then delete the file. Shared rules can live in AGENTS.md. Source: cursor.com/help/customization/rules, checked 15.11.2026.</q>
    <q t="How many lines should a rules file have?">Anthropic recommends under 200 lines per CLAUDE.md, Cursor under 500 lines per rule; Codex reads up to 32 KiB in total by default. AGENTS.md has no general number. Sources: Anthropic, Cursor and OpenAI docs, checked 15.11.2026.</q>
    <q t="Where does spec.md live and who creates it?">A spec is created at the start of a task: in GitHub Spec Kit the /speckit-specify command in the agent chat starts it from a task description. The docs name no required folder; the file usually sits in the repository next to the task code and is closed together with the task.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Further reading">
  <b-links cols="2">
    <item href="/en/blog/harness-driven-development/" k="Method" t="Harness-Driven Development">Agent error → environment rule</item>
    <item href="/en/blog/harness-work-approaches/" k="Approaches" t="Approaches to working with a harness">Answer loop and review</item>
    <item href="/en/blog/work-prompts-examples/" k="Practice" t="Prompts for work tasks">Five parts and six examples</item>
    <item href="/en/blog/ai-in-code-harness-and-tools/" k="Comparison" t="Comparing harnesses">Claude Code, Codex, Cursor, Hermes</item>
    <item href="/blog/ai-agent-maturity-levels/" k="Maturity" t="AI agent maturity levels">From chat to specs, skills, scripts, a harness and an agentic system</item>
      <item href="/en/blog/quint-vs-tests-and-tla/" k="Requirements" t="Quint vs tests and TLA+">Requirements as a checkable model</item>
  </b-links>
</b-chapter>
<b-footer>Based on Anthropic, OpenAI, GitHub, Cursor, Google, Windsurf, OpenCode and Cline docs; the source is behind the icon next to each claim; the table was checked on 15.11.2026. “Project bible” is a practitioner term; paraphrases are marked in the source tooltip.</b-footer>
</b-post>
