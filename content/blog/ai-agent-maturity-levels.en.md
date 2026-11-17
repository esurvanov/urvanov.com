---
title: AI agent maturity levels: from chat to specs, skills, code, a harness and an agentic system
date: 2026-11-14
updated: 2026-11-17
description: How work with AI grows from a chat question to an agentic system: what to write down at each step, when to move on and what it costs.
tags: AI, agents, specs, skills, harness, maturity, compound engineering
category: specs
layout: wide
mentions: Compound Engineering, Agent Skills, AGENTS.md, CLAUDE.md, Spec-Driven Development, Progressive Crystallization, Harness engineering, Harness-Driven Development
toc: map=Seven steps | sources=What the market says | chat=Chat | agent=Agent and rules | spec=Spec | skill=Skill | script=Script | crystal=The cost of a step | harness=Harness | system=Agentic system | traps=Traps | stop=When to stop | start=Where to start | faq=Questions | next=Further reading
---

AI agent maturity levels run from a chat to an agent, a spec, a skill, a script, a harness and an agentic system: at each step, what a person explained in words is written into a file or code. The ladders of <a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every</a>, <a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a>, <a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a>, <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a>, <a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a> and <a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a> describe the same sequence. Below: the steps and their cost.

<b-post series="prompts">
<b-chapter id="map" title="Seven steps" icon="stairs">
  <b-art names="ai-agent-maturity-levels/ladder ai-agent-maturity-levels/ladder-mobile"></b-art>
  <b-cap>Seven steps. Grey is the person, blue is the agent and everything written down for it, orange is risk: having to explain again. The orange bug on the Harness step is a mistake found in the finished report: the harness turns it into a check, shown by the arrow, so the same mistake does not come back.</b-cap>
  <b-why>The picture shows where the knowledge goes. In a chat it lives in the person's head and in the conversation. Then it moves one by one into the agent's session, a file with requirements, a file with a procedure, a script and finally the repository together with checks. The table below walks the same report through Mondays: what the person does by hand and what happens next Monday.</b-why>
  <b-table code="prose">
    <table>
    <thead>
      <tr><th>Step</th><th>What the person does by hand</th><th>Where the knowledge lives</th><th>What happens next Monday</th></tr>
    </thead>
    <tbody>
      <tr><td><b>1. Chat</b></td><td>pastes the sales table into a chat and explains which columns are needed</td><td>in the head and in the conversation</td><td>everything is explained again</td></tr>
      <tr><td><b>2. <a class="s-term" href="/materials/glossary/ai-agent/">Agent</a></b></td><td>asks an agent with file access to build the report, corrects it and adds “amounts in roubles” to the rules file</td><td>in the session and in the rules file</td><td>the agent remembers the rules but not how it counted last time</td></tr>
      <tr><td><b>3. <a class="s-term" href="/materials/glossary/spec-driven-development/">Spec</a></b></td><td>writes spec.md: which columns, where the data comes from, how to tell the report is done</td><td>in <code>spec.md</code></td><td>any agent builds the same report from the same description</td></tr>
      <tr><td><b>4. <a class="s-term" href="/materials/glossary/agent-skills/">Skill</a></b></td><td>turns the order of building the report into a skill</td><td>in <code>SKILL.md</code> with steps and examples</td><td>the agent finds the skill by itself when a report is requested</td></tr>
      <tr><td><b>5. Script</b></td><td>pulls the stable steps out of the skill into a script for the export and the pivot table: a skill on data is unprofitable, a script computes the same way every time</td><td>in <code>report.py</code></td><td>the export runs in seconds with no model cost and gives the same result on the same data; the model only writes the conclusions</td></tr>
      <tr><td><b>6. <a class="s-term" href="/materials/glossary/harness/">Harness</a></b></td><td>reads the finished report; a mistake from the report becomes a new rule or check in the agent’s environment</td><td>in the repository: rules, checks, hooks</td><td>the same mistake does not come back: the rule and the check fire by themselves</td></tr>
      <tr><td><b>7. <a class="s-term" href="/materials/glossary/agentic-system/">Agentic system</a></b></td><td>hands the agent only the complex parts such as sorting customer requests and leaves the rest to code and checks</td><td>in one service: code, a schedule, checks and an agent in the complex spots</td><td>the report arrives on schedule: deterministic steps run as code, the complex part is decided by an agent with recorded reasons, the person handles only a discrepancy alert</td></tr>
    </tbody>
    </table>
  </b-table>
  This article calls the move from one step to the next <b><a class="s-term" href="/materials/glossary/pulling-out/">pulling out</a></b> ("vytyagivanie" in the Russian version): the repeatable part of what a person and an agent already did together is pulled out and written down one step higher. This is an evolutionary process of developing processes in an organisation: they are not designed whole in advance but grow step by step out of repeated work. Rules are pulled out of a chat, a spec out of rules and good sessions, a skill procedure out of a spec, a script out of a skill, and a harness out of mistakes and checks around the agent. The end of the ladder is an agentic system. It all starts with the “an agent does it” approach, but at the end of the road the share of agents stays small: the base of the system is classic code, checks and a schedule, and agents take only the complex blocks that cannot be solved otherwise. Working behaviour is not invented again. It is taken from what already worked and fixed where it no longer has to be explained.
  <b-finding>
    <ex>One weekly report went from a repeated explanation in a chat to a report on a schedule.</ex>
    <gen>The step is determined by where the knowledge lives: in a person's head, in a session, in a file or in code. The more is written down, the less depends on a person's memory and on the model's mood.</gen>
    <do>Pick one recurring task and use the table to see which step it is on.</do>
  </b-finding>
</b-chapter>

<b-chapter id="sources" title="The author’s position and what the market says" icon="book">
  <b-why>The seven steps above are the author’s position, assembled by one criterion: what exactly gets written down at the step. On the market, different authors describe the same movement, each on its own stretch: some on rules, some on specs, others on skills or the harness. All of them go in one direction, from a conversation into a file and from a file into code. The table shows how the steps line up with the sources.</b-why>
  <b-art names="ai-agent-maturity-levels/matrix"></b-art>
  <b-cap>Filled means the author describes the step explicitly, a ring means a close equivalent is described (for example, “deterministic tooling” at <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a> and <a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a> is counted as close to a script). The bottom row is the seven steps of this article; only <a href="https://arxiv.org/abs/2607.07052" target="_blank" rel="noopener">Malik</a> describes the last one explicitly.</b-cap>

  The matrix shows how the market is arranged: each author describes their own stretch of the path, and together the stretches cover all seven steps. <a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a> has no specs or skills, Rezvov and Clark have no skills, <a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a> has no script. Details for each author are in the table below.
  <b-table>
    <table>
    <thead>
      <tr><th>Source</th><th>Steps in order</th><th>Where specs and skills are</th></tr>
    </thead>
    <tbody>
      <tr><td><a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every, Compound Engineering</a> (Kieran Klaassen)</td><td>manual development → chat → agent with line-by-line review → plan first and review the finished PR → idea to PR → parallel cloud agents</td><td>the plan at stage 3; skills and rules are added at the Compound step</td></tr>
      <tr><td><a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a>, 05.02.2026</td><td>drop the chatbot → reproduce your own work with an agent → end-of-day agents → outsource the easy tasks → engineer the harness → always have an agent running</td><td>AGENTS.md and programmed checks at step 5; no specs or skills</td></tr>
      <tr><td><a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a>, 10.03.2026</td><td>8 levels: tab complete and IDE chat → context → compounding → MCP and skills → harness → background agents → agent teams</td><td>skills at level 5; no specs</td></tr>
      <tr><td><a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a>, 06.04.2026</td><td>L0 reference → L1 agent babysitting → L2 rules → L3 deterministic tooling → L4 SDD → L5 autonomous agents</td><td>specs at L4; no skills</td></tr>
      <tr><td><a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a>, Hyperact, 05.01.2026</td><td>7 levels: manual prompting → IDE assistance → repository access → deterministic tooling → team context → specialised parallel workflows → spec-driven development</td><td>specs at level 7; no skills</td></tr>
      <tr><td><a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a>, 23.01.2026</td><td>levels 0–5 by analogy with driving automation: from autocomplete to the “dark factory”</td><td>specs and skills at level 4; at level 5 specs turn into software</td></tr>
      <tr><td><a href="https://developers.redhat.com/articles/2026/03/30/vibes-specs-skills-agents-ai-coding" target="_blank" rel="noopener">Red Hat, Naszcyniec</a>, 30.03.2026</td><td>four pillars as a stack: vibes → specs → skills → agents</td><td>all four in one scheme</td></tr>
    </tbody>
    </table>
  </b-table>
  <b-callout icon="bulb">**The rules file** (CLAUDE.md, AGENTS.md) sits in different places. At <a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every</a>, <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a> and <a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a> it appears right after the first agent; at <a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a> and <a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a> only at the fifth level. In this article it belongs to the “agent” step: the very first entry “the agent made a mistake, a rule was added” turns a chat into an agent with memory.</b-callout>
  <b-callout icon="trend-up">The ladders of Eledath, <a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a> and Clark count steps by autonomy: how many agents work and how rarely a person looks at the code. The steps in this article are counted by where the knowledge lives. The two scales agree: once the knowledge is written down, the agent can be trusted with more.</b-callout>
  <b-finding>
    <ex>Rezvov, Clark and Shapiro place specs, Eledath and Shapiro place skills; this article puts them on one ladder.</ex>
    <gen>The different ladders describe the same movement from different sides: first everything in conversation, then in a file, then in code.</gen>
    <do>Compare your own experience with the seven steps above rather than with any single author's list.</do>
  </b-finding>
</b-chapter>

<b-chapter id="chat" title="Step 1. Chat: knowledge lives in a conversation" icon="chat">
  <b-why>In a chat the person carries data back and forth and says by hand that an answer is wrong. For a one-off question that is enough.</b-why>
  <b-art names="ai-agent-maturity-levels/chat"></b-art>
  <b-cap>Three Mondays in a row the person answers the same questions. The knowledge of what the report needs stays only in their head.</b-cap>
  <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a> calls this mode a reference: the agent as “Stack Overflow, but friendlier”, and he adds that it is not really a level. <a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a> advises dropping the chatbot for meaningful work<b-proof href="https://mitchellh.com/writing/my-ai-adoption-journey" quote="Hashimoto: “To find value, you must use an agent” — mitchellh.com/writing/my-ai-adoption-journey"></b-proof>, because an agent reads files, runs programs and checks the result itself. <a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a> and <a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a> put the chat at the first level: copying fragments back and forth.

  Even at this step <a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every</a> advises keeping notes of the prompts that worked: the very first record, before any rules file<b-proof href="https://every.to/guides/compound-engineering" quote="Every: “Keep a running note of prompts that worked well” — every.to/guides/compound-engineering"></b-proof>. A note answers the question “how did I explain this last time”, although the agent does not read it yet.
  <b-finding>
    <ex>Every Monday the columns of the report have to be explained again.</ex>
    <gen>A chat does not keep agreements between conversations. Rezvov describes the way out like this: when repeating the same thing gets tiresome, the repeated instructions are turned into rules.</gen>
    <do>The moment you explain the same thing a second time, move to the next step.</do>
  </b-finding>
</b-chapter>

<b-chapter id="agent" title="Step 2. Agent and a rules file" icon="bot">
  <b-why>The agent gets access to files and commands and acts on its own. The first record made for it is a rules file: a list of what the agent must know about the project in every session.</b-why>
  <b-art names="ai-agent-maturity-levels/agent-rules"></b-art>
  <b-cap>An agent mistake turns into a line of the rules file, and the agent’s next session starts with it already there.</b-cap>
  <a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a> went through this step literally: he redid all his manual commits with an agent<b-proof href="https://mitchellh.com/writing/my-ai-adoption-journey" quote="Hashimoto: “I literally did the work twice” — mitchellh.com/writing/my-ai-adoption-journey"></b-proof> and drew three lessons: break work into clear tasks, separate planning from execution, and give the agent a way to verify its result. <a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every</a>'s guide suggests the first step towards writing things down: create a CLAUDE.md file and add a note to it after each agent mistake.
  <b-steps>
    <step t="The agent made a mistake">for example, it counted sums in dollars instead of roubles.</step>
    <step t="A line in the rules file">“sums in the report are in roubles”: one line per bad behaviour. Hashimoto writes that in the Ghostty project file every line is based on a bad agent behaviour<b-proof href="https://mitchellh.com/writing/my-ai-adoption-journey" quote="Hashimoto: “Each line in that file is based on a bad agent behavior” — mitchellh.com/writing/my-ai-adoption-journey"></b-proof>.</step>
    <step t="The next session">the agent reads the file at the start and does not repeat the mistake.</step>
  </b-steps>
  <b-callout icon="alert-circle">A rules file can be overloaded. <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a> warns that badly written rules produce a result worse than having none<b-proof href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" quote="Rezvov: “poorly written rules can actually make output worse than having no rules at all” — dev.to/arezvov"></b-proof>. <a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a> advises against putting everything into the rules file: it is better to keep an up-to-date docs folder in which the agent finds what it needs.</b-callout>

  Hashimoto turns the step into a habit: in the last half hour of the working day he launches agents for research, for vague ideas and for triaging tasks, so that in the morning he gets a “warm start”<b-proof href="https://mitchellh.com/writing/my-ai-adoption-journey" quote="Hashimoto: “warm start” — mitchellh.com/writing/my-ai-adoption-journey"></b-proof>. He does not leave agents running overnight: most of his tasks finish in under half an hour. Every warns that most developers get stuck at this step<b-proof href="https://every.to/guides/compound-engineering" quote="Every: “Most developers plateau here” — every.to/guides/compound-engineering"></b-proof> while approving every agent action by hand.
  <b-finding>
    <ex>The line about roubles in the rules file closes one recurring mistake for good.</ex>
    <gen>A rule stores an agreement but not the whole intent of a task: what to do and how to tell it is done is not written in it.</gen>
    <do>Keep the rules file short; move the task description into a spec. More in the article <a href="/blog/specs-rules-skills/">AGENTS.md, CLAUDE.md and spec.md: what goes where</a>.</do>
  </b-finding>
</b-chapter>

<b-chapter id="spec" title="Step 3. Spec: the intent is written before the code" icon="file-lines">
  <b-why>A spec describes one task: what must be produced and how to tell it is done. The agent and the person read the same text, and the review checks the result against it.</b-why>
  <a href="https://developers.redhat.com/articles/2026/03/30/vibes-specs-skills-agents-ai-coding" target="_blank" rel="noopener">Red Hat</a> splits specs into two kinds: “what” (goal, requirements, success criteria) and “how” (security, structure, tests, standards). The author recommends several small files such as <code>what-vision.md</code>, <code>how-security.md</code> and <code>how-testing.md</code> instead of one long document, so that only the relevant context is loaded<b-proof href="https://developers.redhat.com/articles/2026/03/30/vibes-specs-skills-agents-ai-coding" quote="Naszcyniec, Red Hat: “the days of the 100-page PDF specification are over” — developers.redhat.com"></b-proof>. <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a> adds end-to-end traceability: a requirement has an identifier such as FR-AUTH-PASSWORDRESET, and it is visible in the API description, the code and the tests<b-proof href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" quote="Rezvov: “The core of SDD is traceability” — dev.to/arezvov"></b-proof>.
  A spec also has its own maturity ladder. The first three levels were described by Birgitta <a href="https://martinfowler.com/articles/harness-engineering.html" target="_blank" rel="noopener">Böckeler</a> (Thoughtworks)<b-proof href="https://www.martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html" quote="Böckeler: three maturity levels of a spec, spec-first, spec-anchored and spec-as-source (paraphrase) — martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html"></b-proof>; the fourth, Spec-in-the-loop, is added in the site author's talk <a href="/talk/spec-driven-development/">“Spec-Driven Development”</a> (in Russian): on the <a href="/slide/20/">slide with the four levels</a> the spec learns from the running system, and its metrics and incidents correct the spec.
  <b-art names="ai-agent-maturity-levels/spec-levels"></b-art>
  <b-cap>As on the talk slide: the spec on the left, the code on the right, the arrows show what comes from what and who sends changes back. A grey dashed arrow means a person returns the change, a blue one means the running system does it by itself. On the right: what the level solves and what blocks it.</b-cap>
  <b-table>
    <table>
    <thead>
      <tr><th>Spec level</th><th>What happens to the spec</th><th>Example program</th></tr>
    </thead>
    <tbody>
      <tr><td><b>Spec-first</b></td><td>the spec is written before the code and used for one task</td><td>GitHub Spec Kit</td></tr>
      <tr><td><b>Spec-anchored</b></td><td>the spec lives on after the task: changes are merged into it</td><td><a href="/blog/openspec/">OpenSpec</a></td></tr>
      <tr><td><b>Spec-as-source</b></td><td>a person edits only the spec, the code is generated from it</td><td>Tessl; only this one is claimed by <a href="https://martinfowler.com/articles/harness-engineering.html" target="_blank" rel="noopener">Böckeler</a></td></tr>
      <tr><td><b>Spec-in-the-loop</b></td><td>metrics and incidents from the running system correct the spec</td><td>no ready programs; similar behaviour at <a href="https://developers.redhat.com/articles/2026/03/30/vibes-specs-skills-agents-ai-coding" target="_blank" rel="noopener">Red Hat</a> and <a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every</a>, see below</td></tr>
    </tbody>
    </table>
  </b-table>

  Red Hat distinguishes two modes of working with a spec. In the “interacting” mode the person refines the spec together with the agent: for example, asks the agent to rate it from 0 to 10 and say what is missing for an autonomous implementation. When the rating is 9–10, the “instructing” mode starts: the agent reads the specs, finds the skills it needs, writes code, runs tests and fixes errors itself. At <a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a> this matches the fourth level, where the person writes a spec, argues with the agent about it and walks away<b-proof href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" quote="Shapiro: “You write a spec. You argue with it about the spec.” — danshapiro.com"></b-proof>.
  <b-callout icon="refresh">Red Hat calls the fourth level “co-evolution” of the spec. The agent keeps a LessonsLearned.md file: at each mistake it records the cause and the fix and proposes an edit to the relevant “how” spec<b-proof href="https://developers.redhat.com/articles/2026/03/30/vibes-specs-skills-agents-ai-coding" quote="Naszcyniec, Red Hat: “turns every off-key moment into a permanent improvement” — developers.redhat.com"></b-proof>. Every does the same at the Compound step, described below.</b-callout>
  <b-finding>
    <ex>The report's spec.md says: which columns, where the data comes from, and that the report is done when the sums match the export.</ex>
    <gen><a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a> puts specs at the top of his ladder: the implementation there becomes an interchangeable output rather than a durable asset<b-proof href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" quote="Clark: “interchangeable output rather than a durable asset” — hyperact.co.uk"></b-proof>. He also calls the seventh level closer to a reset than a continuation of the ladder.</gen>
    <do>Write a spec for any task longer than a day. How to split a big spec into parts is in the article <a href="/blog/specs-by-aggregates/">Specs by aggregate</a>.</do>
  </b-finding>
</b-chapter>

<b-chapter id="skill" title="Step 4. Skill: the procedure is written for the agent" icon="notebook">
  <b-why>If a spec says what must be produced, a skill says how it is done. It is a folder with a SKILL.md file: a name, a description and step-by-step instructions, sometimes with templates and scripts.</b-why>
  <b-art names="ai-agent-maturity-levels/spec-skill"></b-art>
  <b-cap>A spec sits in the task context. A skill takes two lines of the context until it is needed and is loaded in full only on call.</b-cap>
  <a href="https://developers.redhat.com/articles/2026/03/30/vibes-specs-skills-agents-ai-coding" target="_blank" rel="noopener">Red Hat</a> describes skills as modular repeatable procedures: the agent finds a skill by its name and description and loads it in full when the task fits<b-proof href="https://developers.redhat.com/articles/2026/03/30/vibes-specs-skills-agents-ai-coding" quote="Naszcyniec, Red Hat: “A skill is not just a prompt; it is a directory containing a SKILL.md file” — developers.redhat.com"></b-proof>. Anthropic compares a skill to an onboarding guide for a new hire<b-proof href="https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills" quote="Anthropic: “like putting together an onboarding guide for a new hire” — anthropic.com/engineering"></b-proof>. For <a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a>, creating skills is a mark of the fourth level, where the person no longer sits next to the agent but writes specs and skills and walks away.
  Andrew <a href="https://dev.to/0xandrewshu/turn-chats-into-skills-skills-into-scripts-2ndg" target="_blank" rel="noopener">Shu</a> described how to get a skill out of a chat: if the agent repeats the same task, ask it to reread the conversation and turn it into a skill<b-proof href="https://dev.to/0xandrewshu/turn-chats-into-skills-skills-into-scripts-2ndg" quote="Shu: “ask it to reflect on the conversation and turn it into an Agent Skill” — dev.to/0xandrewshu"></b-proof>.

  An example skill from Red Hat’s article is deploying an application to OpenShift. It is an ordinary folder with three files: an instruction with a name and description at the start, a template and a check script.
  <b-file-grid>
    <file name="SKILL.md">name, description, steps: check login, choose the project, apply the template, check the result; constraints</file>
    <file name="deploy-template.yaml">the deployment template the instruction uses</file>
    <file name="validate-route.sh">a script that checks the application opens</file>
  </b-file-grid>
  <b-cap>The skill already contains a script: there is no sharp border between the “skill” and “script” steps, they are two parts of one folder.</b-cap>
  <b-finding>
    <ex>After a successful report build, the agent, on request, turned the order of building into a skill with steps and a sample of the final table.</ex>
    <gen>At the start of a session a skill takes only its name and description in the context and is loaded in full on call. So procedures needed from time to time are better kept in skills, leaving only the permanent in the rules file.</gen>
    <do>If the same procedure went well twice, ask the agent to turn it into a skill.</do>
  </b-finding>
</b-chapter>

<b-chapter id="script" title="Step 5. Script: code runs the steps" icon="code">
  <b-why>A skill stays text, and the model executes it anew each time. A script is ordinary code: faster, cheaper and the same on every run.</b-why>
  <a href="https://dev.to/0xandrewshu/turn-chats-into-skills-skills-into-scripts-2ndg" target="_blank" rel="noopener">Shu</a> compares them: a skill is non-deterministic, since ten runs of one skill can show noticeably different behaviour<b-proof href="https://dev.to/0xandrewshu/turn-chats-into-skills-skills-into-scripts-2ndg" quote="Shu: “running the same Skill 10 times can lead to different behavior” — dev.to/0xandrewshu"></b-proof>. Scripts are faster, more stable and do not spend tokens, but they take time to write, are more rigid to unexpected conditions and can break. <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a> puts the rule more simply: hand as much as possible to deterministic logic and leave the model only the creative part<b-proof href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" quote="Rezvov: “Delegate as much as possible to deterministic logic” — dev.to/arezvov"></b-proof>. <a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a> applies the same idea to agent mistakes: next to the rule in the file he writes programmed tools such as scripts for screenshots and for running filtered tests.
  <b-art names="ai-agent-maturity-levels/skill-script"></b-art>
  <b-cap>The same run ten times: a skill shows scatter and spends tokens, a script repeats the result and spends nothing.</b-cap>
  <b-table>
    <table>
    <thead>
      <tr><th></th><th>Skill</th><th>Script</th></tr>
    </thead>
    <tbody>
      <tr><td><b>What it is</b></td><td>instructions in natural language in SKILL.md</td><td>code in Bash, Python and similar languages</td></tr>
      <tr><td><b>Who runs it</b></td><td>the model, anew each time</td><td>the computer, with no model</td></tr>
      <tr><td><b>Is the result the same</b></td><td>no: noticeable differences between runs are possible</td><td>yes, for the same input</td></tr>
      <tr><td><b>Cost per run</b></td><td>tokens on every execution</td><td>seconds and zero tokens</td></tr>
      <tr><td><b>When it fits</b></td><td>the procedure changes, flexibility is needed, it runs rarely</td><td>the procedure repeats, is expensive or must be predictable</td></tr>
      <tr><td><b>Price</b></td><td>less time to create</td><td>time to write, rigidity to the unexpected, maintenance</td></tr>
    </tbody>
    </table>
  </b-table>
  <b-cap>After Andrew <a href="https://dev.to/0xandrewshu/turn-chats-into-skills-skills-into-scripts-2ndg" target="_blank" rel="noopener">Shu</a>'s text “Turn chats into Skills, Skills into scripts” (19.09.2026). The author stresses that not everything should be automated: both a skill and a script have a cost of creation and maintenance.</b-cap>
  A script is <b>pulled out</b> of a skill once the skill starts to repeat. Making a skill for such work becomes unprofitable: on the same data a script behaves the same on every run, while a skill carries scatter inside the model itself. That scatter is what produces <a class="s-term" href="/materials/glossary/flaky-test/">flaky tests</a>: the same step on the same data sometimes passes and sometimes fails, because the agent behaves a little differently each time. A script has no such cause, so for repeating work determinism pays better.
  <b-callout icon="alert-circle">A lot of uncertainty remains: the format of the input data, gaps, unexpected values. Scripts usually start working with data, so what matters for them is the deterministic part: the same input gives the same output and a mistake can be reproduced. Uncertainty moves from the step into the check of the input data.</b-callout>
  <b-finding>
    <ex>The database export and the pivot table in the report are the same every Monday, so the script report.py took them over, and the model writes only the conclusions.</ex>
    <gen>Shu often embeds scripts in skills: the skill stays a wrapper that runs the scripts, glues them together and checks input and output.</gen>
    <do>Turn a skill into a script when it repeats, is complex or expensive. Keep rare and changing procedures as skills.</do>
  </b-finding>
</b-chapter>

<b-chapter id="crystal" title="The cost of a step: what Malik measured" icon="gauge">
  <b-why>The move from a skill to a script is usually described in words. Arun <a href="https://arxiv.org/abs/2607.07052" target="_blank" rel="noopener">Malik</a> of the Azure Networking team (Microsoft) measured it on a working system and called it “progressive crystallization”: behaviour that an agent found and verified gradually turns into deterministic code<b-proof href="https://arxiv.org/abs/2607.07052" quote="Malik: “agent exploration should be a discovery mechanism, not a permanent execution model” — arxiv.org/abs/2607.07052"></b-proof>.</b-why>
  Malik's system handles incidents in a cloud network. A new incident is first solved by an agent, and its path is recorded. If the path is confirmed by repeated successes, it becomes a template, then a hybrid scenario and finally code without a model. The three modes are stages in the life of the same discovered behaviour. This is pulling out on the last steps: the path the agent walked alone is pulled out into a template, then a hybrid, then code.
  <b-art names="ai-agent-maturity-levels/crystal-modes"></b-art>
  <b-cap>Up the ladder behaviour is promoted by the number of successful runs and returned down on a failure: crystallization is reversible.</b-cap>
  <b-table>
    <table>
    <thead>
      <tr><th>Mode</th><th>How it runs</th><th>Is the result the same</th><th>Tokens per run</th></tr>
    </thead>
    <tbody>
      <tr><td><b>Agent</b> (Type 3)</td><td>subagents reason in a limited scope, write steps wait for human approval</td><td>about 50%</td><td>10–50 thousand</td></tr>
      <tr><td><b>Hybrid</b> (Type 2)</td><td>steps are fixed, the model joins at separate stages: parsing, classification, summary; every action is checked against a schema</td><td>about 90%</td><td>1–5 thousand</td></tr>
      <tr><td><b>Code</b> (Type 1)</td><td>logic written in advance, no model at run time</td><td>100%</td><td>0</td></tr>
    </tbody>
    </table>
  </b-table>
  <b-sublabel top="22">When to promote a mode</b-sublabel>
  <b-steps>
    <step t="Agent → hybrid" hl>at least 10 successful runs, zero safety violations, at least 90% of runs give the same sequence of actions, automatically created acceptance tests pass.</step>
    <step t="Hybrid → code">at least 50 successful hybrid runs, model answer consistency of at least 99%, the rule covers all observed input variations, the full regression suite passes without the model, a person has reviewed the final logic.</step>
    <step t="Code → back">on a failure, a safety violation or failing tests the playbook is demoted. An example from the paper: after a firmware update the output format of a command changed, the parser failed, the playbook was returned to hybrid and, after a series of clean runs, promoted again<b-proof href="https://arxiv.org/abs/2607.07052" quote="Malik: “Crystallization is not one-way” — arxiv.org/abs/2607.07052"></b-proof>.</step>
  </b-steps>
  <b-sublabel top="22">What it came to over 8 months</b-sublabel>
  <b-count-bars>
    <bar k="Code" w="45%" color="accent">45%</bar>
    <bar k="Hybrid" w="30%" color="c-light">30%</bar>
    <bar k="Agent" w="25%" color="c-none">25%</bar>
  </b-count-bars>
  <b-cap>Share of executions by mode at the end of the eighth month (section VIII of <a href="https://arxiv.org/abs/2607.07052" target="_blank" rel="noopener">Malik</a>'s paper). At the start almost all executions ran in the “agent” mode.</b-cap>
  The cost of the agent per incident fell by more than 70% while the number of incidents roughly doubled. More than 90% of typical incident categories are resolved autonomously, and the share of false-positive fixes stays below 5%. The author puts the conclusion this way: the platform got cheaper as it did more, because it stopped paying for inference on work it had already learned<b-proof href="https://arxiv.org/abs/2607.07052" quote="Malik: “the platform got cheaper as it did more” — arxiv.org/abs/2607.07052"></b-proof>.
  <b-callout icon="alert-circle">The author's caveats. The results come from one organisation and one domain, so the thresholds must be recomputed. These are observations of the platform over eight months; there is no controlled comparison. The 45% figure means the share of executions served by code; it cannot be read as a share of incidents solved “without AI”. The gain is smaller where genuinely new one-off tasks dominate.</b-callout>
  <b-callout icon="bulb">The word “crystallization” appears in another paper too: Linghao Zhang (<a href="https://arxiv.org/abs/2603.10808" target="_blank" rel="noopener">arXiv 2603.10808</a>, 11.03.2026) describes how fragmented knowledge from working dialogues is periodically consolidated into structured reusable assets. In Zhang's paper a dialogue turns into knowledge, in Malik's an execution trace turns into code. Both describe the same movement down the ladder: from conversation to what is written down.</b-callout>
  <b-finding>
    <ex>In Malik's system the share of executions without a model grew from zero to 45% in eight months, and the cost per incident fell by more than 70%.</ex>
    <gen>The move down the ladder, from the model to code, pays off where the same tasks repeat. Autonomy is tied to the accumulated history of runs of a specific scenario and grows with it; a stronger model does not grant it by itself<b-proof href="https://arxiv.org/abs/2607.07052" quote="Malik: “A more capable model does not automatically earn more autonomy; a track record does” — arxiv.org/abs/2607.07052"></b-proof>.</gen>
    <do>Count the successful runs of a skill. Reached ten without failures — turn the repeatable steps into a script, and plan a return to the step above for when the script breaks.</do>
  </b-finding>
</b-chapter>

<b-chapter id="harness" title="Step 6. Harness: mistakes become rules of the environment" icon="loop-double">
  <b-why>When specs, skills and scripts exist, the next step is to build an environment around the agent: a harness. It is everything except the model itself, and it grows from mistakes: each task leaves a record behind and the next one goes better.</b-why>
  <a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every</a> builds its whole guide around a loop of four steps: Plan → Work → Review → Compound<b-proof href="https://every.to/guides/compound-engineering" quote="Every: “Plan → Work → Review → Compound → Repeat” — every.to/guides/compound-engineering"></b-proof>. The first three steps produce a feature, the fourth produces a system that builds features better each time<b-proof href="https://every.to/guides/compound-engineering" quote="Every: “a system that builds features better each time” — every.to/guides/compound-engineering"></b-proof>. According to Every, about 80% of an engineer's time should go to planning and review, and the remaining 20% to work and the Compound step.
  <b-art names="ai-agent-maturity-levels/compound-loop"></b-art>
  <b-cap>The first three steps produce a feature. The fourth writes the lesson into files and skills, so each next round starts better than the last.</b-cap>
  <b-steps round>
    <step t="Plan">an idea turns into a plan: study the requirement and the code, design the solution and validate the plan.</step>
    <step t="Work">the agent executes the plan in a separate branch; tests and the linter run after each change.</step>
    <step t="Review">several agents check the result, findings get priority P1, P2 or P3 and are recorded.</step>
    <step t="Compound" hl>what worked and what did not is written into the right files: notes in CLAUDE.md, a solution document in docs/solutions/, new agents and skills. The check question: will the system catch this mistake by itself next time?</step>
  </b-steps>
  <b-cap>After Every's guide. Solutions are stored in docs/solutions/ with metadata for search, plans in docs/plans/, review findings in todos/.</b-cap>
  Birgitta <a href="https://martinfowler.com/articles/harness-engineering.html" target="_blank" rel="noopener">Böckeler</a> splits a harness into two kinds of controls: “guides” set the agent’s course in advance, while “sensors” watch the result and help it correct itself<b-proof href="https://martinfowler.com/articles/harness-engineering.html" quote="Böckeler: guides “anticipate the agent's behaviour and aim to steer it before it acts”; sensors “observe after the agent acts and help it self-correct”"></b-proof>. Her rule: when a problem repeats, the guides and sensors should be improved<b-proof href="https://martinfowler.com/articles/harness-engineering.html" quote="Böckeler: “Whenever an issue happens multiple times, the feedforward and feedback controls should be improved”"></b-proof>. The discipline of tuning a harness is called harness engineering, and HDD (Harness-Driven Development) is one method inside it: every agent mistake becomes a rule of the environment, that is, an instruction, a check or a limit.
  <a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a> puts a harness at level 6: tests, linters and checks so the agent sees the result of its own work. He has one condition: feedback is needed, otherwise the result is a slop machine<b-proof href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" quote="Eledath: “If you want autonomy, you need backpressure” — bassimeledath.com"></b-proof>.
  <b-finding>
    <ex>The agent got a currency rate wrong: the review recorded the cause, a rule appeared in CLAUDE.md and a rate check was added to the script.</ex>
    <gen>A harness differs from a set of files in that a mistake turns into a record automatically: a rule, a check, a skill or an edit to the spec. <a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a> calls this idea harness engineering. More in the article <a href="/blog/harness-driven-development/">Harness engineering in practice</a>.</gen>
    <do>After each fixed mistake ask one question: what to write down so it does not repeat. That record is the Compound step and one change to the harness.</do>
  </b-finding>
</b-chapter>

<b-chapter id="system" title="Step 7. Agentic system: code at the base, agents in the complex spots" icon="boxes-link">
  <b-why>The ladder ends with an agentic system: a system built on classic principles in which complex blocks are replaced by agents, and everything works together in one service. The article shows how to get there: step by step, pulling what repeats out into code and checks.</b-why>
  The road starts with agents: in a chat and in a session an agent does everything. By the end of the road the share of agents stays small, and the base of the system is classic code: scripts, checks, a schedule, data. An agent takes only the complex spots that, before large language models, were solved by teams of ML specialists: parsing the text of requests, classification, measuring similarity, summarising. Now this is a ready-made solution: a model is called as a part of the service, gives higher quality and explains its decisions in words, so the reasoning can be read and checked. The system as a whole stays predictable because the complex part is surrounded by deterministic checks.
  <a href="https://arxiv.org/abs/2607.07052" target="_blank" rel="noopener">Malik</a>’s numbers point the same way: in eight months the share of executions by code without a model grew to 45%, while the agent stayed at 25% of executions. The ladders of <a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a> (levels 7–8: background agents and agent teams), <a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a> (the “dark factory”, a black box that turns specs into software) and <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a> (a person only creates tickets in a tracker while agents pick them up themselves, and security is the main barrier) continue toward growing autonomy. For such autonomy not to break, it needs a harness, the step below.
  <b-finding>
    <ex>The weekly report: a script computes the export and the pivot table, the rules and checks live in the harness, and the agent handles only the free text of managers’ comments.</ex>
    <gen>An agentic system rests on code and checks, and an agent solves only what cannot be solved otherwise. The share of agents in it is small, and predictability comes from the deterministic base.</gen>
    <do>Before giving a block to an agent, ask whether it can be written as code or a check. Leave the agent only what code does not solve, and put checks on the input and the output.</do>
  </b-finding>
</b-chapter>

<b-chapter id="traps" title="Traps at every step" icon="alert-circle">
  <b-why>Each step has a typical mistake that stops the climb or makes it too expensive. The table is assembled from the authors’ own caveats.</b-why>
  <b-table>
    <table>
    <thead>
      <tr><th>Step</th><th>Typical trap</th><th>Who writes about it</th><th>How to get out</th></tr>
    </thead>
    <tbody>
      <tr><td><b>1. Chat</b></td><td>moving text back and forth instead of the agent working with files</td><td><a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a>: meaningful work needs an agent</td><td>give the agent access to the project and a way to verify the result</td></tr>
      <tr><td><b>2. <a class="s-term" href="/materials/glossary/ai-agent/">Agent</a></b></td><td>the person approves every action while the rules file grows without sorting</td><td><a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every</a>: most get stuck here; <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a>: bad rules are worse than none</td><td>plan ahead, keep the rules short and review every line</td></tr>
      <tr><td><b>3. <a class="s-term" href="/materials/glossary/spec-driven-development/">Spec</a></b></td><td>a spec for every trifle: Kiro turned a small bug into 4 user stories and 16 acceptance criteria</td><td><a href="https://www.martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html" target="_blank" rel="noopener">Böckeler</a> (Thoughtworks)</td><td>write a spec for tasks longer than a day and leave small fixes without one</td></tr>
      <tr><td><b>4. <a class="s-term" href="/materials/glossary/agent-skills/">Skill</a></b></td><td>a skill for everything: it has a cost of creation and maintenance</td><td><a href="https://dev.to/0xandrewshu/turn-chats-into-skills-skills-into-scripts-2ndg" target="_blank" rel="noopener">Shu</a></td><td>make a skill after two successful repeats, not in advance</td></tr>
      <tr><td><b>5. Script</b></td><td>premature promotion: a template seen only a few times turns out unreliable</td><td><a href="https://arxiv.org/abs/2607.07052" target="_blank" rel="noopener">Malik</a>: quality depends on tests built from runs</td><td>a threshold on the number of runs and a return one step up on a failure</td></tr>
      <tr><td><b>6. Harness</b></td><td>human review becomes the bottleneck; checks written by the same agent confirm anything</td><td><a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a>: human review becomes the bottleneck; <a href="https://law.stanford.edu/2026/02/08/built-by-agents-tested-by-agents-trusted-by-whom/" target="_blank" rel="noopener">Stanford CodeX</a>: agents wrote a stub that always returns “success”</td><td>checks must be independent of the agent and review partly automated</td></tr>
      <tr><td><b>7. Agentic system</b></td><td>agents get what code could solve: the price and the scatter of results grow</td><td><a href="https://arxiv.org/abs/2607.07052" target="_blank" rel="noopener">Malik</a>: behaviour found by an agent moves into code by the number of successful runs</td><td>put an agent only on the complex spot and pull what repeats out into code</td></tr>
    </tbody>
    </table>
  </b-table>
  <b-cap>The StrongDM stub case is discussed <a href="https://law.stanford.edu/2026/02/08/built-by-agents-tested-by-agents-trusted-by-whom/" target="_blank" rel="noopener">in the Stanford CodeX article</a>.</b-cap>
  <b-finding>
    <ex>The agent wrote both the code and the check, and the check simply returned “success”: the system looked green and verified nothing.</ex>
    <gen>The higher the step, the more a recording mistake costs: a wrong rule, a bad check or a premature script affects all following runs.</gen>
    <do>Before writing something down, ask: who will check this record and how? If there is nobody, keep the knowledge one step lower.</do>
  </b-finding>
</b-chapter>

<b-chapter id="stop" title="When to stop" icon="target">
  <b-why>The upper steps cost more than the lower ones, and not every team needs them.</b-why>
  <b-table>
    <table>
    <thead>
      <tr><th>What the source says</th><th>What it means in practice</th></tr>
    </thead>
    <tbody>
      <tr><td><a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a>: most teams should aim for level 5; above it throughput grows but the ability to understand and verify the result does not</td><td>written rules, deterministic tooling and shared context often matter more than maximum automation</td></tr>
      <tr><td><a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a>: for day-to-day work the leverage is at level 7; the author treats level 8 as the frontier that nobody has mastered yet</td><td>background agents with checks are a reasonable upper limit today</td></tr>
      <tr><td><a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a>: at level 3 many people feel things got worse because the work comes down to reading diffs</td><td>after the first speed-up a dip is possible; it is passed by moving to specs and skills, with no need to return to the chat</td></tr>
      <tr><td><a href="https://dev.to/0xandrewshu/turn-chats-into-skills-skills-into-scripts-2ndg" target="_blank" rel="noopener">Shu</a>: both a skill and a script have a cost of creation and maintenance</td><td>automate what really repeats</td></tr>
      <tr><td><a href="https://arxiv.org/abs/2607.07052" target="_blank" rel="noopener">Malik</a>: the gain is smaller where new one-off tasks dominate</td><td>for exploratory work stay on an agent with a spec</td></tr>
    </tbody>
    </table>
  </b-table>
  <b-finding>
    <ex>In <a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a>'s ladder the seventh level stands apart: he calls it closer to a reset than a continuation.</ex>
    <gen>Climbing the ladder makes sense while it reduces the person's work; the number of files in a repository proves nothing.</gen>
    <do>Before each move check: does the task repeat? Can the result be verified automatically? If not, stay on the current step.</do>
  </b-finding>
</b-chapter>

<b-chapter id="start" title="Where to start: ready prompts for the agent" icon="play">
  <b-why>Four prompts that move knowledge up one step, that is, pull it out of the step below. Put your own task in place of the square brackets.</b-why>
  <b-sublabel top="12">From a chat to a rules file</b-sublabel>
  <b-prompt>
    Reread this dialogue. Find the places where I corrected you or repeated the same thing.
    For each one write one short rule line for the CLAUDE.md file.
    Do not add general advice, only what was in the dialogue.
  </b-prompt>
  <b-sublabel top="22">From rules to a spec</b-sublabel>
  <b-prompt>
    Task: [description]. Before writing code, draw up spec.md:
    what must be produced, where the data comes from, what the constraints are and how to tell the task is done.
    Ask me questions if something is missing.
  </b-prompt>
  <b-sublabel top="22">From a good run to a skill</b-sublabel>
  <b-prompt>
    Reread this dialogue and turn the procedure you carried out in it into a skill: a folder with SKILL.md,
    a name and description at the start, then step-by-step instructions, constraints and a sample result.
  </b-prompt>
  <b-sublabel top="22">From a skill to a script</b-sublabel>
  <b-prompt>
    Look at the skill [name]. Pick out the steps that run the same way every time and write a Python script for them.
    Leave in the skill only the script launch and the check of the result.
  </b-prompt>
  <b-finding>
    <ex>Four prompts replace a discussion of “how to adopt AI”: each moves exactly one portion of knowledge up one step.</ex>
    <gen>There is a single rule of transition: it repeated a second time — write it down; the record repeats and is stable — turn it into code.</gen>
    <do>Start with the prompt that matches your current step from the table at the start of the article.</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Frequently asked questions">
  <b-faq-cards>
    <q t="What maturity levels of working with AI in development exist?">There is no single scale. This article has seven steps, <a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every</a> has six steps from manual development to parallel cloud agents, <a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a> has eight levels, <a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a> seven, and <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a> and <a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a> six each (levels 0–5). They all agree that the path runs from a chat to an agent, then to written rules and specs and on to an autonomous system.</q>
    <q t="What is compound engineering?">An approach from Every in which each finished task leaves a record that helps later tasks: the loop Plan → Work → Review → Compound. The last step writes the lesson into CLAUDE.md, solution documents, skills and agents.</q>
    <q t="How does a skill differ from a script?">A skill is a text instruction that the model executes anew on every run, so results can differ. A script is ordinary code: faster, cheaper and giving the same result, but slower to write and more rigid to unexpected conditions.</q>
    <q t="Is it necessary to reach the “dark factory”?">No. Clark advises most teams to stop at level 5, and Eledath names level 7 as the point of main leverage. Climb higher only if tasks repeat and the result can be verified automatically.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Further reading">
  <b-links cols="2">
    <item href="/blog/harness-driven-development/" k="Method" t="Harness-Driven Development">An agent mistake → a rule of the environment</item>
    <item href="/blog/specs-rules-skills/" k="Context" t="AGENTS.md, CLAUDE.md and spec.md">What goes where: specs, rules, skills</item>
    <item href="/blog/spec-reconcile-loop/" k="Specs" t="The spec reconcile loop">How a spec learns from a running system</item>
    <item href="/blog/specs-by-aggregates/" k="Specs" t="Specs by aggregate">How to split a big spec into parts</item>
    <item href="/blog/quality-gates-ai-agents/" k="Gates" t="What are quality gates for AI agents">which checks to put on the steps of the ladder</item>
    <item href="/blog/agent-escalation-to-human/" k="Escalation" t="Escalation to a human in AI agents">how an agent stops and asks</item>
  </b-links>
</b-chapter>
<b-footer>Based on the primary sources: <a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every</a> (compound engineering), <a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a> (05.02.2026), <a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a> (10.03.2026), <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a> (06.04.2026), <a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a> (05.01.2026), <a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a> (23.01.2026), <a href="https://developers.redhat.com/articles/2026/03/30/vibes-specs-skills-agents-ai-coding" target="_blank" rel="noopener">Red Hat</a> (30.03.2026), <a href="https://dev.to/0xandrewshu/turn-chats-into-skills-skills-into-scripts-2ndg" target="_blank" rel="noopener">Shu</a> (19.09.2026), <a href="https://arxiv.org/abs/2607.07052" target="_blank" rel="noopener">Malik</a> (arXiv 2607.07052, 08.07.2026), Zhang (arXiv 2603.10808), <a href="https://martinfowler.com/articles/harness-engineering.html" target="_blank" rel="noopener">Böckeler</a> (martinfowler.com). The six steps are assembled from these sources by the criterion “what gets written down”; the authors have no single ladder with this sequence.</b-footer>
</b-post>
