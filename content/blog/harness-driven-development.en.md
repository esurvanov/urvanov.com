---
title: Harness engineering in practice: turning AI agent mistakes into rules of its environment (HDD)
date: 2026-09-28
updated: 2026-10-04
description: The mistake-to-rule loop, guides and sensors, three layers of checks, how it fits with specs, and five first steps in your own project.
tags: AI, Claude Code, harness engineering, harness, HDD, agents
category: harness
layout: wide
image: /og/harness-driven-development.en.png
mentions: Harness engineering, Claude Code, AGENTS.md, CLAUDE.md, Spec-Driven Development
toc: loop=The HDD loop | canons=The 3 × 3 layout | double=Double loop | controls=Guides and sensors | layers=Three check layers | shift=Earlier is cheaper | human=Where people matter | spec=HDD and specs | start=Where to start | next=Further reading
---

**Harness engineering** is the work of shaping the environment around an AI agent: instructions, tools, permissions and checks. **Harness-Driven Development (HDD)** is a working method built on it: every agent mistake becomes a rule of that environment.

<b-post series="hdd">
<b-chapter id="loop" icon="refresh-cw" title="The HDD loop">
  <b-hdd-scene name="harness-driven-development/loop" frame="loop"/>
  <b-cap>Mitchell Hashimoto's principle: when the agent makes a mistake, change the harness so that mistake can't happen again <a href="https://www.faros.ai/blog/harness-engineering" target="_blank" rel="noopener">Faros</a></b-cap>
  <b-why>A prompt fixes one request, context fixes what the model knows, the harness fixes every following run. Example: the agent edits code and does not run the tests.</b-why>
  <b-hdd-scene name="harness-driven-development/fix-levels" frame="fig"/>
  <b-cap>Stages as described by <a href="https://www.faros.ai/blog/harness-engineering" target="_blank" rel="noopener">Faros</a> and <a href="https://marmelab.com/blog/2026/09/24/the-state-of-ai-harness-engineering-2026.html" target="_blank" rel="noopener">marmelab</a></b-cap>
  <b-finding>
    <ex>A mistake caught by the sensors goes into the harness as a new rule, and the agent gets that rule on every following run.</ex>
    <gen>A result fixed by hand helps once. A rule in the harness (an instruction, a test or a hook) applies to all future tasks, so the harness gets more precise over time without changing the model.</gen>
    <do>Adopt a rule: any agent mistake you had to fix by hand becomes a line in the instructions or a test on the same day.</do>
  </b-finding>
</b-chapter>

<b-chapter id="canons" icon="grid" title="How a harness is laid out: 3 × 3">
  <b-why>Three domains of the loop and three contexts in each — nine canons. Every canon has exactly one domain and one context.</b-why>
  <b-hdd-matrix kind="canons" label="How a harness is laid out: 3 × 3">
    <column icon="book" t="Spec">what must be true</column>
    <column icon="sun" t="Skill">how to act</column>
    <column icon="database" t="Memory">what to rely on</column>
    <row icon="target" t="Expectation">what should be</row>
    <cell>genres, schemas | requirement levels | number passport</cell>
    <cell>prediction before acting</cell>
    <cell>actuator roles | live · MCP</cell>
    <row icon="eye" t="Observation">what was measured</row>
    <cell>evidence rank | finding format | scale</cell>
    <cell>sensor records the fact</cell>
    <cell>live only</cell>
    <row icon="refresh-cw" t="Loop">compare and decide</row>
    <cell>rule completeness criteria | findings registry</cell>
    <cell>compare | count repeats | patch or revise</cell>
    <cell empty>empty for now</cell>
  </b-hdd-matrix>
  <b-hdd-fanin label="Expectation + Observation → Loop → patch / revise rules">
    <in icon="target">Expectation</in>
    <in icon="eye">Observation</in>
    <mid icon="refresh-cw" note="✕ no reverse link">Loop</mid>
    <out>patch</out>
    <out alt>revise rules</out>
    <note from="sun" to="book">skill → spec of its domain · a commit hook script checks the direction</note>
  </b-hdd-fanin>
  <b-hdd-modes>
    <mode icon="table" t="snapshot">a table, updated after each new measurement</mode>
    <mode icon="broadcast-pole" t="live">a protocol, fresh every time, nothing stored</mode>
  </b-hdd-modes>
  <b-finding>
    <ex>The loop splits into Expectation, Observation and Loop, each with its own spec, skill and memory. Loop reads the other two domains; they never read Loop.</ex>
    <gen>It is a negative feedback loop: the target value is compared with the measured one, and something changes only on a mismatch. A strict reference direction keeps the domains from tangling, and the same concept repeating in two domains is not a defect.</gen>
    <do>Sort the files of your harness into the nine cells and check that no Expectation or Observation file refers to Loop.</do>
  </b-finding>
</b-chapter>

<b-chapter id="double" icon="loop-double" title="The double loop">
  <b-hdd-loops>
    <loop kind="single" t="single loop">fix the action under the same rules</loop>
    <loop kind="double" t="double loop" on>change the rules themselves</loop>
  </b-hdd-loops>
  <b-hdd-principles>
    <principle icon="wave-line" t="Patches without a new prediction">fix it with a rule</principle>
    <principle icon="flask" t="Several complaints">first test for a shared cause</principle>
    <principle icon="history" t="A new rule">accepted only if old cases follow from it</principle>
    <principle icon="shield-check" t="No external check">discard it, with a record</principle>
  </b-hdd-principles>
  <b-cap>The loop applies to itself: every run ends with the residual risk, never with a “done” status.</b-cap>
  <b-finding>
    <ex>A series of patches, complaints, a new rule and an external check are four checkable principles the Loop uses to decide whether to fix the action or change the rules.</ex>
    <gen>A single loop fixes the result within the old rules. A double loop changes the rules themselves, and does it by checkable principles, so the harness learns without drifting from random edits.</gen>
    <do>When the same fix comes up a third time, stop and ask which rule causes it. Change the rule only if it also explains the old cases.</do>
  </b-finding>
</b-chapter>

<b-chapter id="controls" icon="grid" title="Guides and sensors">
  <b-hdd-matrix kind="guides" label="Matrix: guides act before the agent, sensors after; each is either computational or AI-based">
    <column icon="arrow-right" t="Guides">before the action</column>
    <column icon="eye" t="Sensors">after the action</column>
    <row icon="cpu" t="Computational" speed="3">fast · reliable</row>
    <cell>types | code templates | generators</cell>
    <cell>tests | linter | type checking</cell>
    <row icon="sparkle-4" t="AI-based" speed="1">flexible · costlier</row>
    <cell>AGENTS.md · CLAUDE.md | skills | specs</cell>
    <cell>AI review | LLM judge</cell>
  </b-hdd-matrix>
  <b-cap>Split as described in <a href="https://martinfowler.com/articles/harness-engineering.html" target="_blank" rel="noopener">Martin Fowler: Harness engineering</a></b-cap>
  <b-finding>
    <ex>Four cells: guides set the course before the agent works, sensors catch deviations afterwards, and each can be computational or AI-based.</ex>
    <gen>Computational checks run in seconds and don't make mistakes, so use them wherever a rule can be written down formally. Keep AI-based checks for meaning: style, clarity, fit with the intent.</gen>
    <do>For each rule in the agent's instructions, ask whether a test or linter could check it. If so, move it there.</do>
  </b-finding>
</b-chapter>

<b-chapter id="layers" icon="layers" title="Three check layers">
  <b-hdd-layers label="Three layers: code quality is the most mature, architecture is in the middle, behavior is the least mature">
    <layer icon="brush" t="Code quality" value="88">mature</layer>
    <layer icon="modules" t="Architecture" value="55">growing</layer>
    <layer icon="user-round" t="Behavior" value="25" sw="1.8">hardest</layer>
  </b-hdd-layers>
  <b-cap>Layer maturity as assessed by <a href="https://martinfowler.com/articles/harness-engineering.html" target="_blank" rel="noopener">Martin Fowler</a></b-cap>
  <b-finding>
    <ex>Code quality is the easiest to check today, and product behavior the hardest.</ex>
    <gen>Linters and formatters cover the first layer almost immediately. Architecture is checked with dependency rules and performance requirements. Behavior still needs good scenario tests and a human eye.</gen>
    <do>Start with the first layer: run a linter and formatter on every agent run, then add one rule for module boundaries.</do>
  </b-finding>
</b-chapter>

<b-chapter id="shift" icon="clock" title="Earlier is cheaper">
  <b-hdd-cost label="The earlier a check runs, the cheaper the mistake: before the agent starts, on write, in CI, at review">
    <stage icon="arrow-right" t="Before work" cost="$">instructions · specs</stage>
    <stage icon="cpu" t="On write" cost="$$">hooks · linter</stage>
    <stage icon="refresh-cw" t="In CI" cost="$$$" sw="1.8">tests · build</stage>
    <stage icon="user-round" t="At review" cost="$$$$" sw="1.8">a person</stage>
  </b-hdd-cost>
  <b-finding>
    <ex>The same mistake costs least before the agent starts and most at human review.</ex>
    <gen>Put fast checks as early as possible: the agent fixes the problem itself while the task context is still in front of it, and only the debatable points reach a person.</gen>
    <do>Wire tests and the linter into a hook the agent runs after every edit, in addition to CI.</do>
  </b-finding>
</b-chapter>

<b-chapter id="human" icon="user-round" title="Where people matter">
  <b-hdd-split label="The harness handles routine checks; a person decides architecture and product questions and improves the harness itself">
    <side icon="sun" t="Harness" n="36">style · types · tests · boundaries</side>
    <side icon="user-round" t="Person" n="6" sw="1.8">architecture · product · new rules</side>
  </b-hdd-split>
  <b-cap>"A good harness keeps the human in the loop and directs their attention to where it matters most" — paraphrasing <a href="https://martinfowler.com/articles/harness-engineering.html" target="_blank" rel="noopener">Martin Fowler</a></b-cap>
  <b-finding>
    <ex>The harness takes most of the checks; the person keeps the decisions and the work of improving the harness.</ex>
    <gen>An experienced developer carries an implicit harness in their head: knowledge of the architecture, team habits, a feel for risk. HDD moves that knowledge into explicit rules, so every agent run gets it.</gen>
    <do>After each review of the agent's code, write down one comment that keeps coming up and turn it into a rule.</do>
  </b-finding>
</b-chapter>

<b-chapter id="spec" icon="file-text" sw="2" title="HDD and specs">
  <b-hdd-specflow label="The spec sets the goal; the harness checks that the agent reached it">
    <node icon="target" t="Spec">the result you need</node>
    <node icon="sun" t="Harness">how to check you got it</node>
    <node icon="check-circle-alt" t="Accepted code">no line-by-line manual review</node>
  </b-hdd-specflow>
  <b-cap>"Specs define the target state, the harness is the control system" — <a href="https://loiane.com/2026/04/harness-engineering-missing-layer-specs-driven-ai-development/" target="_blank" rel="noopener">Loiane Groner</a>. More on specs in the talk <a href="/en/talk/spec-driven-development/">Spec-Driven Development in practice</a></b-cap>
  <b-finding>
    <ex>The spec answers "what are we building", the harness answers "how do we know we built it".</ex>
    <gen>Without a spec the harness has nothing to check, and without a harness the spec stays a document. Together they let you accept the agent's code based on checks instead of reading every line.</gen>
    <do>For each requirement in the spec, write down which test or check will confirm it is met.</do>
  </b-finding>
</b-chapter>

<b-chapter id="start" icon="flag" title="Where to start">
  <b-hdd-steps>
    <step t="An instructions file for the agent">AGENTS.md or CLAUDE.md in the project root: how to build, how to test, what not to do</step>
    <step t="Linter and tests after every edit">a hook the agent runs itself before handing over the result</step>
    <step t="An agent mistake log">every mistake fixed by hand gets a line with its cause</step>
    <step t="Mistake → rule">once a week, move log entries into instructions, tests or hooks</step>
    <step t="A progress file for long tasks">a feature list with statuses and the commit history, so a new session picks up where the last one stopped <a href="https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents" target="_blank" rel="noopener">Anthropic</a></step>
  </b-hdd-steps>
  <b-finding>
    <ex>Five steps: two set up the harness right away, three start the "mistake → rule" loop.</ex>
    <gen>Nobody designs a harness in full up front. It grows out of the agent's real mistakes in your project, and within a few weeks the agent stops repeating the most common ones.</gen>
    <do>Today, create the instructions file and the mistake log. In a week, move the first log entries into rules.</do>
  </b-finding>
</b-chapter>

<b-chapter id="next" title="Further reading">
  <b-links cols="2">
    <item href="/en/blog/work-prompts-examples/" k="Stage 1–2" t="Prompts for work tasks">how to write a single request and supply data</item>
    <item href="/en/blog/ai-in-code-harness-and-tools/" k="Stage 3" t="Comparing harnesses">Claude Code, Codex, Cursor, Hermes and chat</item>
  </b-links>
  <b-cap>More to read: <a href="https://martinfowler.com/articles/harness-engineering.html" target="_blank" rel="noopener">Martin Fowler</a> · <a href="https://www.anthropic.com/engineering/harness-design-long-running-apps" target="_blank" rel="noopener">Anthropic: Harness design</a> · <a href="https://leanpub.com/becoming-a-harness-driven-developer" target="_blank" rel="noopener">Becoming a Harness-Driven Developer</a> · <a href="https://github.com/ai-boost/awesome-harness-engineering" target="_blank" rel="noopener">awesome-harness-engineering</a></b-cap>
</b-chapter>
<b-footer>Terms and the layer split follow the sources linked in the captions under the diagrams.</b-footer>
</b-post>
