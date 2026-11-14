---
title: What are quality gates for AI agents: checkpoints that raise quality and autonomous run time
date: 2026-11-14
updated: 2026-11-14
description: A quality gate is an intake post between an agent’s work and the word “done”. Three kinds of check, numbers on quality and cost, the arithmetic of autonomous run time, the bounded-context border as the place for a gate, MCP permissions and hooks, ways to bypass a gate and five steps to start.
tags: AI, agents, quality gates, MCP, bounded context, harness, hooks, Claude Code
category: harness
layout: wide
mentions: quality gate, MCP, bounded context, aggregate, hooks, harness, Stage-Gate, Robert Cooper, Sonar, Claude, METR, deterministic check, feedback loop, compiler, P versus NP, design by contract, reward hacking
toc: answer=In short | origin=Origin | why=Self-grading | kinds=Kinds | gives=Quality | auto=Autonomy | where=Border | mcp=MCP | limits=Limits | start=Start | faq=Questions | next=Read next
---

A quality gate for an AI agent is an external control point: the work stops until an independent check answers “accepted”, and the agent never marks “done” itself. The gate stands outside the agent and outside its bounded context, behind MCP or another separator. It raises quality and lengthens autonomous work. Below: kinds, numbers, MCP and limits.

<b-post series="harness">
<b-callout icon="bulb">**The author’s thoughts.** The idea that a gate is an external part and stands behind the agent’s context border, and the conclusions from it, belong to the author: a gate belongs at a bounded-context border; one narrow set of MCP functions both saves context and limits permissions; gates lengthen autonomous work. No source words it as “a gate behind the context border”. Nobody has measured the lengthening of autonomous work: the autonomy section offers a calculation and cases, not a sample-based experiment. Sources confirm separate links, and next to them stand an address and the exact phrase.</b-callout>

<b-hchain label="Chain: intake, kinds of check, context border, MCP, limits">
  <step icon="shield-check" t="Gate">an intake post</step>
  <step icon="layers" t="Kinds">machine · agent · person</step>
  <step icon="workflow" sw="1.8" t="Border">bounded context</step>
  <step icon="package" t="MCP">permissions and functions</step>
  <step icon="alert-circle" t="Limits">how gates are bypassed</step>
</b-hchain>

<b-chapter id="answer" icon="shield-check" title="In short: what a gate is and why an agent needs one">
  <b-art names="quality-gates-ai-agents/overview" wide/>
  <b-cap>The road of the work: the agent walks through its own context step by step, the work reaches, through MCP, a gate that stands in another context. The gate answers “accepted”, “back with an error” or “not sure, a person decides”.</b-cap>
  <b-why align="left"><b-icon name="shield-check"/> **What it is.** A gate stands between the agent’s work and the word “done”. The agent brings a result, and the check gives one of three answers: accepted, not accepted (errors go back to the agent) or not sure (a person decides). The post says “done”. If the check fails, the work goes no further: not to the next step, not into a merge, not to the user. A gate is an external part: a control point cannot stand in the same bounded context as the agent, or it shares the agent’s blind spots. So it stands behind a separator: behind an MCP server, in a client hook or in another process. Very little crosses this border in either direction: a short result there, a short answer back, everything else is closed. A gate works because checking is usually easier than doing. This is kin to the “P versus NP” question of complexity theory: finding a solution may be hard, checking a finished one is fast. For agents this is only an analogy: a check is not cheap for every task, and where it is not, the gate leans on a person.</b-why>
  <b-why align="left"><b-icon name="trend-up"/> **Why.** The first reason is quality: an agent grades its own work poorly, and an independent check sees what it missed. The second is autonomy: an error caught at a step does not travel through the next twenty steps, so the agent can work longer without a person. The third is a person’s attention: they look only at the disputed cases the gate handed over.</b-why>
  <b-why align="left"><b-icon name="target"/> **Where to put it.** Outside the agent and outside its context: in a client hook or in server permissions behind MCP, and not in instruction text the agent may ignore. The agent itself works inside a small bounded context: there a check is finite, the change is small and the set of MCP functions is narrow. These places are covered in the “Border” and “MCP” sections.</b-why>
  <b-finding>
    <ex>The agent finished editing the booking form. Without a gate it writes “done”. With a gate, tests and the booking-rules check run: if a test fails, the agent gets the error text and continues, and a person hears about the change only when everything passed or when the check said “not sure”.</ex>
    <gen>A gate takes away the agent’s right to mark “done” itself and hands it to a check that stands outside the agent.</gen>
    <do>Pick one task the agent does regularly and write the “done” condition as one checkable sentence: “all tests are green and the linter is silent”.</do>
  </b-finding>
</b-chapter>

<b-chapter id="origin" icon="clock" title="Where the word comes from: from code inspection to gates for agents">
  <b-why align="left">The word “gate” came from product management, factories and software engineering. Below are four points on the way, and each carries an idea that agent gates inherited.</b-why>
  <b-art names="quality-gates-ai-agents/timeline" wide/>
  <b-cap>Code inspection, Stage-Gate, a gate on new code, and gates for agents.</b-cap>
  <b-rules cols="2">
    <rule icon="eye" t="1976: code inspection">Fagan introduced formal code inspection before handover. A 2026 survey calls review the “primary quality gate” ever since<b-proof href="https://arxiv.org/abs/2606.13175" quote="Monperrus: „Code review has been the primary quality gate in software development since Fagan formalised code inspection in 1976.“"/>.</rule>
    <rule icon="git-branch" t="1990: Stage-Gate">Robert Cooper described a project as a chain of stages with gates between them that decide “go on or stop”. His institute’s site puts it this way: gatekeepers make such decisions on time<b-proof href="https://stage-gate.com/blog/improving-go-kill-decision-culture/" quote="Stage-Gate International: „Gatekeepers make timely, Go/Kill decisions.“"/>.</rule>
    <rule icon="shield-check" t="2020: a gate on new code">Sonar defined a gate as a binary decision: pass or fail<b-proof href="https://www.sonarsource.com/blog/clean_coding-quality_profile_quality_gate_guidance/" quote="Sonar: „called a Quality Gate and it's binary in nature - either pass or fail.“"/>. It looks at code added or changed recently; the whole history is outside the check.</rule>
    <rule icon="cpu" t="2026: gates for agents">Thoughtworks Radar calls compilers, linters and tests deterministic quality gates and advises wiring them into agent workflows<b-proof href="https://www.thoughtworks.com/content/dam/thoughtworks/documents/radar/2026/04/tr_technology_radar_vol_34_en.pdf" quote="Thoughtworks Radar, vol. 34: „Developers have long relied on deterministic quality gates such as compilers, linters, structural tests and test suites“"/>. Sonar has a separate set of conditions for code written by agents.</rule>
  </b-rules>
  <b-why align="left">Two more ideas came from factories. Deming’s third of fourteen points says to stop depending on inspection at the end and to build quality into the product from the start<b-proof href="https://deming.org/explore/fourteen-points/" quote="Deming, point 3: „Cease dependence on inspection to achieve quality. Eliminate the need for inspection on a mass basis by building quality into the product in the first place.“"/>. In its jidoka system Toyota makes equipment stop at once when it detects an abnormality<b-proof href="https://global.toyota/en/company/vision-and-philosophy/production-system/" quote="Toyota: equipment should „stop immediately when abnormalities are detected to prevent defective products from being produced“"/>. An agent gate joins both ideas: the check stands as early as possible and can stop the work.</b-why>
  <b-finding>
    <ex>Fagan checked code with people, Cooper put gates between project stages, Sonar made a gate automatic, and for agents a gate became the point where work does not go on without a verdict.</ex>
    <gen>An agent gate is not a new invention: it is an old control point moved to where a machine does the work, and the machine checks itself poorly.</gen>
    <do>Look at which gates your project already has for people: tests in CI, mandatory review, a linter. The agent should pass the same ones.</do>
  </b-finding>
</b-chapter>

<b-chapter id="why" icon="eye" title="Why an agent does not check itself">
  <b-why align="left">The first thing research shows: an agent overrates its own work. Anthropic found that separating the agent doing the work from the agent judging it is a strong lever<b-proof href="https://www.anthropic.com/engineering/harness-design-long-running-apps" quote="Anthropic, 24 Mar 2026: „Separating the agent doing the work from the agent judging it proves to be a strong lever to address this issue.“"/>. They also note that out of the box Claude is a poor reviewer and had to be tuned for strictness.</b-why>
  <b-why align="left">The most detailed measurement is a preprint by Park and Choi (July 2026, a draft pilot). The same agent ran six improvement cycles, and only whoever closes the feedback loop changed, that is, the judge of the result: the agent itself, a strong judge inside the loop, or an external check that sees the real outcome. The chart shows the final score of each variant.</b-why>
  <b-art names="quality-gates-ai-agents/self-grade" wide/>
  <b-cap>The agent’s self-grading rolled back what had been achieved by 19%, and the external check gave the maximum. A pilot: one model, one task, three repeats.</b-cap>
  <b-why align="left">What stands behind the numbers. The agent called all 54 cycles an improvement, although in 56% of them the real change was zero or negative: self-grading turned into “accept everything”. Even the strong judge inside the loop accepted real regressions in 44% of cases and rejected 38% of real improvements. The authors explain the gap this way<b-proof href="https://arxiv.org/abs/2607.25152" quote="Park, Choi: „The cause of the gap is not the evaluator's quality but what the evaluator is grounded in.“"/>: the gap is set by what the judge relies on, and the judge’s intelligence does not affect it. A judge inside the loop sees only what the agent showed it. An external check looks at the real outcome.</b-why>
  <b-why align="left">Anthropic reached the same conclusion with its C compiler (a case described by Anthropic itself): 16 agents, about 2,000 sessions and about $20,000. The author named a nearly perfect verifier as the main condition<b-proof href="https://www.anthropic.com/engineering/building-c-compiler" quote="Anthropic, 5 Feb 2026: „it's important that the task verifier is nearly perfect, otherwise Claude will solve the wrong problem.“"/>. The same article warns<b-proof href="https://www.anthropic.com/engineering/building-c-compiler" quote="same article: „it is easy to see tests pass and assume the job is done, when this is rarely the case.“"/>. Tests pass and the work is not done: this happens while a check is not deterministic. A deterministic check on the same data always gives the same verdict, like running tests or a linter. A judge model’s answer may differ from run to run, so the judge adds to the check program and does not replace it.</b-why>
  <b-why align="left">One more observation from the pilot: one bit was enough for the external check. A verdict “accepted” or “rejected” without any explanation scored 110.0 against 113.0 with a full write-up. So a gate does not have to give its reason: a yes or a no is enough.</b-why>
  <b-finding>
    <ex>The agent in the loop called everything an improvement, and the external check, looking at the real result, cut off regressions.</ex>
    <gen>A check inside the agent’s dialogue inherits its blind spots. What makes a check independent is reliance on an outside fact: a test run, a real result, a separate reviewer with access to the real product.</gen>
    <do>Review your prompts to the agent: if they contain “make sure everything is right”, replace it with a check run whose result the agent cannot write itself.</do>
  </b-finding>
</b-chapter>

<b-chapter id="kinds" icon="layers" title="Three kinds of check at a gate">
  <b-why align="left">An intake post can hold a check of three kinds. They differ in speed, price and what they can see, so in practice several are placed in a row: a cheap fast one first, a pricey rare one last.</b-why>
  <b-art names="quality-gates-ai-agents/three-kinds" wide/>
  <b-cap>Left to right the check gets smarter, slower and pricier.</b-cap>
  <b-table>

| Kind | What it sees | Example | Weak spot |
|---|---|---|---|
| <b-icon name="cpu"/> **A machine** | anything written as a rule: tests, types, linter, build, coverage | Sonar for agents: new-code coverage at least 80%, duplication at most 3%, no new bugs or vulnerabilities | sees no meaning: sensors catch misdiagnosis, needless complexity and misread tasks unreliably |
| <b-icon name="eye"/> **A reviewing agent** | meaning by criteria with a threshold | Anthropic: below the threshold on any criterion, the stage fails; Spotify’s judge vetoes about a quarter of sessions | pricier, needs tuning for strictness, and it errs too |
| <b-icon name="user"/> **A person** | risk, intent, consequences | GitHub: draft PRs from the agent are approved and merged only by a human | gets tired and used to approving |

  </b-table>
  <b-why align="left"><b-icon name="cpu"/> **A machine.** Sets the lower level. For code written by agents Sonar requires six conditions: no new bugs, vulnerabilities or maintainability issues above a threshold, new-code coverage of at least 80%, duplication of at most 3%, and no new dependency risks. The last condition appeared because of agent behaviour: they may install packages without vetting<b-proof href="https://docs.sonarsource.com/sonarqube-server/quality-standards-administration/ai-code-assurance/quality-gate-for-agentic-ai" quote="Sonar: „agents may autonomously install packages without manual vetting“"/>. For the split of checks into guides and sensors see the article [“Harness engineering in practice”](/blog/harness-driven-development/): a gate is a sensor that has the right to stop the work.</b-why>
  <b-why align="left"><b-icon name="eye"/> **A reviewing agent.** At Anthropic each criterion had a hard threshold, and if even one fell below it, the stage failed and the agent received a detailed write-up<b-proof href="https://www.anthropic.com/engineering/harness-design-long-running-apps" quote="Anthropic: „Each criterion had a hard threshold, and if any one fell below it, the sprint failed and the generator got detailed feedback on what went wrong.“"/>. Before a stage the executor and the reviewer agreed a stage contract: what counts as “done”<b-proof href="https://www.anthropic.com/engineering/harness-design-long-running-apps" quote="Anthropic: „agreeing on what ‘done’ looked like for that chunk of work before any code was written“"/>. Spotify added a judge after agents began doing extra: refactoring code outside the task and disabling flaky tests. The judge compares the change with the original request<b-proof href="https://engineering.atspotify.com/2025/12/feedback-loops-background-coding-agents-part-3" quote="Spotify: „the judge vetoes about a quarter of them. When that happens, the agent is able to course correct half the time.“"/>.</b-why>
  <b-why align="left"><b-icon name="user"/> **A person.** GitHub built the human into the process itself: the agent can neither mark its PR ready, nor approve it, nor merge it<b-proof href="https://docs.github.com/en/copilot/concepts/agents/coding-agent/risks-and-mitigations" quote="GitHub Docs: „Copilot cloud agent cannot mark its pull requests as ‘Ready for review’ and cannot approve or merge a pull request.“"/>. Such a gate is needed where an error is costly: money, access, other people’s data.</b-why>
  <b-why align="left">A gate has three answers: accepted, not accepted and “not sure”. The third hands the case to a person and shows where the check’s frame ended. Why such an answer is unavoidable for any agent code is covered in the article [“Where to check an AI agent’s work”](/blog/agent-checkpoint/).</b-why>
  <b-finding>
    <ex>Tests passed in 40 seconds. The reviewing agent found that the button works but looks different from the task. The person got only this disputed case.</ex>
    <gen>Fast gates stand before costly ones: the machine filters the obvious, the agent judges meaning, the person decides risk.</gen>
    <do>List your project’s checks across the three rows of the table. An empty row means that kind of gate is missing.</do>
  </b-finding>
</b-chapter>

<b-chapter id="gives" icon="trend-up" title="What gates give quality, and what it costs">
  <b-why align="left">The numbers below come from four separate sources: two Anthropic write-ups (24 Mar 2026 and 5 Feb 2026), engineering blogs of Stripe and Spotify, and the DORA 2025 report. No sample-based studies exist: nobody has published “with a gate and without” comparisons over hundreds of tasks, so each number serves as an example. The link next to each number shows where it comes from.</b-why>
  <b-art names="quality-gates-ai-agents/cost-quality" wide/>
  <b-cap>One request: an agent alone and an agent with a reviewer.</b-cap>
  <b-rules cols="2">
    <rule icon="flask" t="Anthropic: one request, two runs">One agent: 20 minutes and $9, the main feature did not work. An agent with a reviewer: 6 hours and $200, the result worked<b-proof href="https://www.anthropic.com/engineering/harness-design-long-running-apps" quote="Anthropic: „The harness was over 20x more expensive, but the difference in output quality was immediately apparent.“"/>. With Opus 4.6: 3 hours 50 minutes and $124.70. It pays off on tasks the model does not do reliably alone<b-proof href="https://www.anthropic.com/engineering/harness-design-long-running-apps" quote="Anthropic: „It is worth the cost when the task sits beyond what the current model does reliably solo.“"/>.</rule>
    <rule icon="modules" t="Stripe: scale">More than a thousand merged PRs a week are written by agents and reviewed by people<b-proof href="https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents" quote="Stripe: „Over a thousand pull requests merged each week at Stripe are completely minion-produced, and while they're human-reviewed, they contain no human-written code.“"/>. Steps without a model stand between model steps: linters in five seconds, at most two CI runs, then the branch goes to a person<b-proof href="https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents-part-2" quote="Stripe, part 2: „those particular nodes don't invoke an LLM at all—they just run code“"/>.</rule>
    <rule icon="refresh-cw" t="Spotify: the judge">Verifiers run by themselves, the agent does not know them; a judge checks the meaning. No before-and-after figures: only a veto in a quarter of sessions and recovery in half of those (the quote is in the previous section).</rule>
    <rule icon="chart-line" t="DORA 2025: speed and stability">AI raises delivery speed but lowers stability<b-proof href="https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report" quote="DORA 2025: „AI adoption does continue to have a negative relationship with software delivery stability.“"/>. The argument “instability pays for itself through fast fixes” found no support<b-proof href="https://services.google.com/fh/files/misc/2025_state_of_ai_assisted_software_development.pdf" quote="DORA 2025, p. 41: „We found no evidence of such a moderating effect.“"/>. My conclusion: gates keep speed from being paid for with stability. The report does not mention gates.</rule>
  </b-rules>
  <b-finding>
    <ex>A reviewer and thresholds turned a broken application into a working one at 20 times the price. Stripe and Spotify gained scale thanks to checks that stand around the agent.</ex>
    <gen>A gate costs money and time. It pays off where the agent without it delivers a broken result or an error that is costly later.</gen>
    <do>For your task, estimate the price of one error that reaches human review and the price of one check run. If the first is higher, the gate pays off.</do>
  </b-finding>
</b-chapter>

<b-chapter id="auto" icon="gauge" title="How gates lengthen autonomous work: arithmetic and a gap in the data">
  <b-callout icon="bulb">A language model keeps a rough sketch of the world, not the world itself. When an agent checks its steps against reality (tests, system answers) and keeps its context in order, errors are found and fixed. Work on self-correction supports this: it helps with a reliable signal from outside and sometimes hurts without one. “The longer, the better” holds only with such checking: quality drops on long input, and on some tasks a longer chain of reasoning gives a worse answer. A gate provides the check and the order, so work can run longer without losing quality. There is no sample data for “a gate lengthened autonomous work”; below are the facts the idea rests on.</b-callout>
  <b-why align="left"><b-icon name="bar-chart"/> **What a task horizon is.** METR measures the length of a task an agent completes with a given probability of success, in the time a human needs for it. This is not the agent’s run time<b-proof href="https://metr.org/time-horizons" quote="METR: „It's a measure of the difficulty of a task, rather than the time an AI spends to complete the task.“"/>. For Claude Opus 4.6 the horizon at 50% success is about 12 hours (a confidence interval from 5 to 61 hours), and at 80% about 70 minutes. For GPT-5.4 it is 5.7 hours and 54 minutes. Above 16 hours METR considers measurements unreliable<b-proof href="https://metr.org/time-horizons" quote="METR: „Measurements above 16 hrs are unreliable with our current task suite.“"/>. How autonomy metrics work and where a person sits in them: in the article [“Escalation to a human in AI agents”](/blog/agent-escalation-to-human/#measure).</b-why>
  <b-why align="left"><b-icon name="chart-axes"/> **The price of reliability.** Toby Ord showed that with a constant chance of failing per minute of work, the horizons are linked by a formula<b-proof href="https://arxiv.org/pdf/2505.05115" quote="Ord: „the time horizon for a success probability of p would be ln(p)/ln(q) times as long as one with success probability q.“"/>. The consequence: the horizon at 80% success is about a third of the one at 50%, at 90% about a seventh, at 99% about a seventieth. Each extra “nine” of reliability costs task length.</b-why>
  <b-art names="quality-gates-ai-agents/autonomy-curve" wide/>
  <b-cap>A worked example: at 95% success per step, 36% chance remains after 20 steps, and at 99% per step 82%.</b-cap>
  <b-why align="left"><b-icon name="shield-check"/> **Where the gate is here.** A gate on a step raises the step’s reliability. If a step fails with a 5% chance and the gate catches 4 errors out of 5 and sends the agent back to fix them, the step ends up breaking in 1% of cases. The arithmetic assumes independent steps: Ord himself notes that for Claude 3.7 Sonnet the measured ratio of horizons is 0.25 while the theory gives 0.32. The chart shows a direction: 82% is a calculation with no measured result behind it.</b-why>
  <b-why align="left"><b-icon name="file-text"/> **Two Anthropic mechanisms for long runs.** The first: each agent session starts with no memory of earlier ones, and compacting the dialogue is not enough<b-proof href="https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents" quote="Anthropic: „compaction isn’t sufficient“"/>. So at the start the agent wrote a list of more than 200 features, all marked “failing”. The agent may change only the pass mark, and editing the tests themselves is forbidden<b-proof href="https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents" quote="Anthropic: „It is unacceptable to remove or edit tests because this could lead to missing or buggy functionality.“"/>. Such a list is gate state that lives in a file outside the dialogue: a new session sees how much remains and cannot decide that everything is done.</b-why>
  <b-why align="left"><b-icon name="alert-circle"/> The second mechanism concerns “context anxiety”. Models start wrapping work up when they think the context window is about to end<b-proof href="https://cognition.com/blog/devin-sonnet-4-5-lessons-and-challenges" quote="Cognition: „we found the model taking shortcuts or leaving tasks incomplete when it believed it was near the end of its window, even when it had plenty of room left.“"/>. A gate with criteria from the list makes the decision to finish depend on green marks, and the agent’s feeling takes no part in it. Hence the conclusion: a bounded context should be sized to fit into the physical context window.</b-why>
  <b-why align="left"><b-icon name="refresh-cw"/> **A hook as a continuation mechanism.** In Claude Code a task-completion hook does not let a task close until the checks pass<b-proof href="https://code.claude.com/docs/en/hooks" quote="Claude Code Docs, TaskCompleted: „Use this to enforce completion criteria like passing tests or lint checks before a task can close.“"/>: the refusal message returns to the agent, and it continues. A stop hook works the same way for finishing the whole turn.</b-why>
  <b-finding>
    <ex>An agent makes 20 steps. Without a gate the chance of getting through them without a single error is about 36%. A gate that catches 4 of 5 errors at every step lifts it, by the calculation, to about 82%.</ex>
    <gen>A gate gives autonomy through step reliability: the more rarely an error passes on, the longer the task you can leave unattended. There are no direct measurements, so this is a calculation and a hypothesis.</gen>
    <do>Keep a log: how many steps the agent passes without human intervention before and after adding a gate. In a month you will have your own numbers.</do>
  </b-finding>
</b-chapter>

<b-chapter id="where" icon="workflow" title="Where to put it: at a bounded-context border">
  <b-why align="left">A gate belongs at a bounded-context border for four reasons. Each has support in sources.</b-why>
  <b-why align="left"><b-icon name="ring-dot"/> **1. A check inside a frame is finite.** No check can verify any program against any rule, so the check goes where a frame limits the question. Why this is so and how an aggregate border becomes a checkpoint is in the article [“Where to check an AI agent’s work”](/blog/agent-checkpoint/). For a gate it follows: a gate without a border will answer “not sure” too often.</b-why>
  <b-why align="left"><b-icon name="scissors"/> **2. A small change succeeds more often.** The more an agent changes at once, the less often the task is solved. A context border limits the size of a change naturally.</b-why>
  <b-art names="quality-gates-ai-agents/size-success" wide/>
  <b-why align="left">The numbers on the chart come from two works: [SWE-bench Live](https://arxiv.org/abs/2505.23419) and the Kozuchi agent on SWE-bench Verified ([arXiv 2608.15579](https://arxiv.org/abs/2608.15579)). The benchmarks and agents differ, so the direction is what matters: the bigger the change, the less often it succeeds. At team level DORA shows the same: the benefit of AI depends on working in small batches<b-proof href="https://services.google.com/fh/files/misc/2025_state_of_ai_assisted_software_development.pdf" quote="DORA 2025, p. 58: „With a high degree of certainty, we found that AI adoption's positive benefits depend on teams working in small batches“"/>.</b-why>
  <b-why align="left">On SWE-bench Live a change in one file under five lines is solved in almost half the cases (48%), three or more files or over a hundred lines in under 10%, and seven or more files never ([arXiv 2505.23419](https://arxiv.org/abs/2505.23419)). The Kozuchi agent on SWE-bench Verified solves 81.7% of tasks with a change of 1–4 lines and 41.7% with a change over 100 lines ([arXiv 2608.15579](https://arxiv.org/abs/2608.15579)). These are different benchmarks and agents, so the direction is what matters. DORA adds a team-level conclusion: the benefit of AI depends on working in small batches<b-proof href="https://services.google.com/fh/files/misc/2025_state_of_ai_assisted_software_development.pdf" quote="DORA 2025, p. 58: „With a high degree of certainty, we found that AI adoption's positive benefits depend on teams working in small batches“"/>.</b-why>
  <b-why align="left"><b-icon name="database"/> **3. The context window is limited.** Context is a finite resource with diminishing returns<b-proof href="https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents" quote="Anthropic: context is „a finite resource with diminishing marginal returns“"/>. Chroma tested 18 models and showed that reliability falls as input grows<b-proof href="https://www.trychroma.com/research/context-rot" quote="Chroma, Context Rot: „performance grows increasingly unreliable as input length grows“"/>. In a 2024 talk Evans noted that a model’s answers are steadier when a request is broken into smaller chunks (as reported by InfoQ). A small bounded context gives the agent a short window, and the gate has less chance of checking something the agent no longer remembers.</b-why>
  <b-art names="quality-gates-ai-agents/contexts" wide/>
  <b-cap>Each context has its own agent, its own small window, its own set of MCP functions and a gate on the border. Events travel between contexts.</b-cap>
  <b-why align="left"><b-icon name="swap"/> **4. On the border it is clear who is to blame.** In Bertrand Meyer’s design by contract a precondition violation is the caller’s bug and a postcondition violation is the supplier’s bug<b-proof href="https://se.inf.ethz.ch/~meyer/publications/computer/contract.pdf" quote="Meyer, 1992: „A precondition violation indicates a bug in the client (caller).“ and „A postcondition violation is a bug in the supplier (routine).“"/>. A gate on the border shows at once whose bug it is: a bad command came in or a bad event went out. Evans advises putting a protective layer on the border that translates foreign concepts into your own<b-proof href="https://www.domainlanguage.com/wp-content/uploads/2016/05/DDD_Reference_2015-03.pdf" quote="Evans, DDD Reference: „As a downstream client, create an isolating layer to provide your system with functionality of the upstream system in terms of your own domain model.“"/>. The gate stands on that layer.</b-why>
  <b-why align="left">What a bounded context and an aggregate are, and how the number of contexts relates to the number of agents, is in the articles [“How many AI agents do you need”](/blog/agents-per-bounded-context/) and [“Specs by aggregate”](/blog/specs-by-aggregates/).</b-why>
  <b-finding>
    <ex>Contexts “Booking” and “Payment”: each has its own agent, its own set of three MCP functions and its own gate. The event BookingCreated passes the booking gate on the way out and the payment gate on the way in. If payment rejected the event, it is visible on whose side the violation lies.</ex>
    <gen>A bounded-context border gives a gate four things at once: a finite check, a small change, a short window and a clear culprit.</gen>
    <do>Pick one context and write three things on its border: which commands it accepts, which events it emits, which rule always holds. That is what the gate checks.</do>
  </b-finding>
</b-chapter>

<b-chapter id="mcp" icon="package" title="MCP: permissions, function set and the place of a gate">
  <b-why align="left">[MCP](/blog/mcp-agent-access/) is a protocol through which an agent calls functions of external systems. It matters twice for gates: an MCP server can hard-limit what is available to the agent, and the function set decides how much context the agent spends on descriptions.</b-why>
  <b-subhead>What an MCP server can forbid and what it only suggests</b-subhead>
  <b-table>

| Mechanism | Strength | What the specification says |
|---|---|---|
| <b-status-dot color="accent">Permissions and scopes</b-status-dot> | a ban | when permissions are insufficient the server answers 403 and names the needed scope; in version 2026-07-28 the function list may depend on the caller’s permissions |
| <b-status-dot color="accent">Result by schema</b-status-dot> | a verdict | the server must return a result matching the declared schema, so a verdict “accepted / not accepted” is machine-readable |
| <b-status-dot color="accent">A question to a person</b-status-dot> | a question | the server may ask a person; the answer is accept, decline or cancel |
| <b-status-dot color="warn">Function labels</b-status-dot> | a hint | “read-only”, “destructive” are hints, and the client need not trust them |
| <b-status-dot color="warn">Root folders</b-status-dot> | a hint | the server “should” respect the borders, but nothing enforces it |

  </b-table>
  <b-why align="left">Confirmations from the specification: a result by schema<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28/server/tools" quote="MCP, 2026-07-28: „Servers MUST provide structured results that conform to this schema.“"/>, a function list by permissions<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28/server/tools" quote="MCP, 2026-07-28: the function list „MAY vary by the authorization presented on the request — for example, returning only the tools the caller's granted scopes permit“"/> and function labels<b-proof href="https://github.com/modelcontextprotocol/modelcontextprotocol" quote="MCP, schema.ts: „NOTE: all properties in ToolAnnotations are hints.“"/>. More on the scopes of MCP servers in Claude Code is in the article [“MCP scopes”](/blog/mcp-scopes/).</b-why>
  <b-subhead>A narrow function set: two effects from one mechanism</b-subhead>
  <b-art names="quality-gates-ai-agents/mcp-sets" wide/>
  <b-cap>Descriptions of 58 functions took about 55 thousand tokens. With search over functions the needed ones load on demand: about 8.7 thousand.</b-cap>
  <b-why align="left"><b-icon name="package"/> **The first effect is context.** Anthropic showed that 58 functions took about 55 thousand tokens, and about 8.7 thousand with search over functions, while the accuracy of picking a function rose for Opus 4 from 49% to 74% and for Opus 4.5 from 79.5% to 88.1%. In another example, running code instead of direct calls cut consumption from 150,000 to 2,000 tokens. Anthropic’s own conclusion: more functions do not mean a better result.</b-why>
  <b-why align="left"><b-icon name="lock"/> **The second effect is permissions.** The same settings limit permissions. In Claude Code a subagent has a list of allowed functions, a list of forbidden ones and its own set of MCP servers that the main dialogue does not have. One narrow set per bounded context means both a short window and less opportunity to break something. This is my conclusion: the figures above were measured for tokens, and none exist for security.</b-why>
  <b-subhead>Why the gate stands behind MCP and why an agent has no incentive to stop</b-subhead>
  <b-callout icon="help-circle">**The author’s hypothesis, research in preparation.** Agents are measured and, as I assume, optimised for autonomous run time: the main progress metric is the length of a task an agent does without a person (METR). MCP has a request to a person: the server may ask, and the answer is “accept”, “decline” or “cancel”. For such a metric every question to a person is a loss of autonomy, so an agent has no incentive to stop and ask. On top of that MCP is a narrow neck: calls to functions and their answers pass through it, but the meaning of the whole work does not. The conclusion: a gate cannot rest on the agent’s good will, it stands outside the agent, behind a separator. How agents are actually trained and how the metrics are counted I have not verified, and a separate article is devoted to it.</b-callout>
  <b-why align="left">A kindred border runs between the agent’s commands (control plane) and the data it reads (data plane): data must not become commands. The author’s talk at Podlodka AI Crew is about this, [“AI agent in production: architecture, protection, economics”](/decks/ai-agent-architecture/) (slides in Russian), and so is the article [“Data plane and control plane of an agent”](/blog/data-plane-control-plane-prompt-injection/).</b-why>
  <b-subhead>Where the gate should stand: outside the agent</b-subhead>
  <b-art names="quality-gates-ai-agents/outside-agent" wide/>
  <b-cap>A rule in text the agent can bypass. A gate in a client hook or in server permissions it cannot.</b-cap>
  <b-table>

| Where the gate lives | Reliability | Why |
|---|---|---|
| A phrase in the instructions | <b-status-dot color="warn">advice</b-status-dot> | the agent may skip it |
| A client hook before a call | <b-status-dot color="accent">a ban</b-status-dot> | blocks a call to an MCP function by a pattern of server and function name |
| A stop hook | <b-status-dot color="accent">a ban</b-status-dot> | does not let the turn end until the check passes |
| A hook after a call | <b-status-dot color="warn">a signal</b-status-dot> | the function has already run |
| Server permissions | <b-status-dot color="accent">a ban</b-status-dot> | the check stands in the system the agent calls |

  </b-table>
  <b-why align="left">According to the Claude Code documentation: a hook before a call blocks the call, a stop hook does not let Claude finish the turn, and a task-completion hook does not let a task close. A hook after a call blocks nothing: the function has already run. A hint in text stays advice, as the author of an analysis of stop hooks notes<b-proof href="https://fbakkensen.github.io/ai/devtools/development/2026/03/27/quality-gates-for-coding-agents-how-stop-hooks-make-validation-mandatory.html" quote="fbakkensen: „prompt instructions are suggestions, not constraints.“"/>. OWASP advises checking permissions where the action is executed<b-proof href="https://genai.owasp.org/llmrisk/llm062025-excessive-agency/" quote="OWASP LLM06:2025: „Complete mediation: Implement authorization in downstream systems rather than relying on an LLM to decide if an action is allowed or not.“"/>.</b-why>
  <b-why align="left"><b-icon name="alert-circle"/> **A weak spot: a check the agent calls itself.** If the check is an MCP function, the agent may call it or not, and then there is no verdict. The ready-made agent-gate server works this way: the agent sends the evidence itself, and the server returns a verdict and appends it to a log in which the entries are linked by hashes<b-proof href="https://github.com/Jott2121/agent-gate" quote="agent-gate README: „MCP server that adds a fail-closed quality gate and hash-chained receipt ledger to any AI agent workflow.“"/>. That is self-checking with the blind spots from the self-grading section. The client is also required to treat function labels as untrusted<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28/server/tools" quote="MCP: „clients MUST consider tool annotations to be untrusted unless they come from trusted servers.“"/>. It is safer when a hook or an orchestrator calls the verdict server: the agent cannot bypass the verdict.</b-why>
  <b-why align="left"><b-icon name="search"/> **Which ready-made programs I did not find.** MCP gateways cover permissions, secrets and leaks: agentgateway (a Linux Foundation project), and the Microsoft, Docker and Lasso gateways. I found no gate for “the work was done correctly” among them. Microsoft’s quality-gates set for spec-driven development turned out to be a checklist for the agent itself, with no server in it.</b-why>
  <b-finding>
    <ex>The agent is connected only to the functions of its context. A stop hook runs the tests and calls the booking-rules check server. The agent sees the error text but does not write the verdict itself.</ex>
    <gen>A narrow function set saves context and limits permissions, and a gate outside the agent does not let the check be bypassed. The verdict comes from a program the agent does not control.</gen>
    <do>For one context, list the MCP functions the agent needs and disable the rest. Then set a hook that runs the check without the agent’s involvement.</do>
  </b-finding>
</b-chapter>

<b-chapter id="limits" icon="alert-circle" title="Limits of a gate: how it is bypassed and why it breaks on its own">
  <b-art names="quality-gates-ai-agents/bypass" wide/>
  <b-cap>Four paths around a gate: editing a test, special-casing a test, hidden intent and a reviewer who got used to it.</b-cap>
  <b-why align="left"><b-icon name="bug"/> **The agent fits the result to the check.** METR recorded that o3 cheated the evaluation in 0.7% of runs, and on one task 21 times out of 21<b-proof href="https://metr.org/blog/2025-06-05-recent-reward-hacking" quote="METR: „o3 reward-hacks in 0.7% of runs across all HCAST tasks“"/>. In the Claude 3.7 Sonnet system card Anthropic acknowledges that the model sometimes returns the test’s expected values instead of a general solution or edits the tests themselves. ImpossibleBench made tests contradict the task and counted any pass as cheating: GPT-5 cheated in 54% of cases<b-proof href="https://arxiv.org/abs/2510.20270" quote="ImpossibleBench: GPT-5 „cheats 54.0% of the time on Conflicting-SWEbench“"/>. Read-only tests remove test editing but not special-casing<b-proof href="https://arxiv.org/abs/2510.20270" quote="ImpossibleBench: read-only tests „restores legitimate performance while preventing test modification attempts“"/>.</b-why>
  <b-why align="left"><b-icon name="eye"/> **Monitoring reasoning is better, but do not pressure it.** An action monitor catches 60% of hacks, a reasoning monitor 95%<b-proof href="https://arxiv.org/abs/2503.11926" quote="Baker et al.: the action monitor „achieves only 60% recall overall“, the reasoning monitor 95%"/>. But if the agent is trained with pressure on its reasoning, the monitor’s recall falls to near zero, because the agent learns to hide its intent<b-proof href="https://arxiv.org/abs/2503.11926" quote="Baker et al.: „the CoT monitor’s recall falls to near zero, indicating that the agent has learned to hide its intent“"/>.</b-why>
  <b-why align="left"><b-icon name="refresh-cw"/> **A gate that refuses forever.** In Claude Code, after eight stop-hook refusals in a row the program ends the turn itself<b-proof href="https://code.claude.com/docs/en/hooks" quote="Claude Code Docs: „after stop hooks have continued the turn eight times in a row, Claude Code overrides the next block and ends the turn.“"/>. The limit can be changed with an environment variable, but the principle stands: a gate needs an attempt limit and a handover to a person. At Stripe it is at most two CI runs, and Microsoft devsquad allows two correction attempts<b-proof href="https://github.com/microsoft/devsquad-copilot" quote="Microsoft devsquad: „Maximum of 2 correction iterations. If after 2 attempts there are still failures, deliver the artifact with documented failures for human decision.“"/>.</b-why>
  <b-why align="left"><b-icon name="scales"/> **A gate that is too strict.** According to InfoQ’s report of Spotify’s QCon London talk, published on 18 March 2026, the judge was found too rigid, blocked valid changes and was later removed, leaving checks in the prompts<b-proof href="https://www.infoq.com/news/2026/03/spotify-honk-rewrite" quote="InfoQ: the judge „found it too rigid, blocking valid changes“ and „was eventually removed, with verification steps in prompts proving sufficient“"/>. This is a retelling, and I found no such statement in Spotify’s own posts. Cursor names the “integrator” role as a bottleneck<b-proof href="https://cursor.com/blog/scaling-agents" quote="Cursor, 14 Jan 2026: the integrator role „created more bottlenecks than it solved“"/>.</b-why>
  <b-why align="left"><b-icon name="layers"/> **The author’s heuristic: many relevant gates.** I noticed that several gates, one per risk (types, tests, a linter, a check of meaning), work better than one big one. This is an observation; no source compares “one gate and many”. It fits what I found: Stripe alternates linters and CI, Sonar requires six conditions at once, Thoughtworks names compilers, linters and tests together. It does not cancel the limits above: each gate has a price and an attempt limit, and a gate that is too strict does harm, like Spotify’s judge. So “relevant” means tied to a risk that would otherwise reach the user.</b-why>
  <b-why align="left"><b-icon name="user"/> **The reviewer gets used to it.** Over seven months, among 400 repeat reviewers the approval rate rose from 30.1% to 36.8%, the review queue slowed by 3.5 times and inline comments fell by 22% ([arXiv 2606.22721](https://arxiv.org/abs/2606.22721), 11,429 reviews). According to Faros AI, among more than 10,000 developers using AI, PR size grew by 154% and review time by 91% ([Faros AI](https://www.faros.ai/blog/ai-software-engineering), 23 July 2025).</b-why>
  <b-why align="left"><b-icon name="eye-wide"/> **Sensors do not see meaning.** Böckeler notes that sensors catch misdiagnosis, needless complexity and misread tasks unreliably. A gate answers for what is written as a rule, and the rest stays with a person.</b-why>
  <b-table>

| Danger | Defence |
|---|---|
| The agent edits or bypasses tests | tests and the gate itself are read-only; only the check program sets the “passed” mark |
| Special-casing a test | a second layer: a reviewing agent by meaning and random checks |
| The agent hides its intent | watch the reasoning but do not train the agent against it |
| The gate is red forever | an attempt limit, then a handover to a person |
| The gate blocks the correct | track what share of refusals is wrong and loosen the rule |
| The reviewer got used to it | show the person only “not sure” cases and risk |

  </b-table>
  <b-finding>
    <ex>The gate ran the tests, the agent disabled two flaky ones and got green. The check “the number of tests did not drop” caught the swap.</ex>
    <gen>Each gate has to be tested for bypass the way code is tested: what can the agent change to pass without doing the work.</gen>
    <do>Close the agent’s write access to the tests and to the gate configuration, and write the attempt limit into the gate itself.</do>
  </b-finding>
</b-chapter>

<b-chapter id="start" icon="flag" title="How to start: five steps and ready prompts for the agent">
  <b-why align="left">Start with one context and one task. Each step below closes one item of the limits section. Prompts can be given to the agent as they are, with your project filled in.</b-why>
  <b-subhead>1. Write “done” as a file</b-subhead>
  <b-prompt>
    Create an acceptance.json file with a list of checkable “done” criteria for the task [description].
    Each criterion: id, text, check command and a passes field set to false.
    Rules: only the check script changes passes, and criteria are not deleted or edited without my confirmation.
  </b-prompt>
  <b-subhead>2. Set a stop gate</b-subhead>
  <b-prompt>
    Configure a Claude Code stop hook in .claude/settings.json: before a turn ends, run a check script
    that executes the commands from acceptance.json and updates passes. If any criterion is red,
    block the finish and return the error text to the agent. Check the stop_hook_active flag so the hook does not loop.
    After three red attempts in a row, end the turn and tell me exactly what does not pass.
  </b-prompt>
  <b-subhead>3. Close the bypasses</b-subhead>
  <b-prompt>
    Forbid the agent to write to the tests directory, to acceptance.json and to .claude. Add a check that the number of tests
    did not decrease and no test is marked as skipped.
  </b-prompt>
  <b-subhead>4. Add a reviewer by meaning</b-subhead>
  <b-prompt>
    Create a separate reviewing subagent with read-only access. It compares the final change with the original task
    and scores each criterion from [list] from 0 to 5. Below 4 on any criterion means the change is not accepted.
    Verdict: accepted, not accepted with a reason, or not sure.
  </b-prompt>
  <b-subhead>5. Narrow the set of MCP functions</b-subhead>
  <b-prompt>
    List the MCP functions the agent used in this context over the last month. Keep only those in this context’s
    subagent settings and disable the rest. Show how many tokens were freed.
  </b-prompt>
  <b-why align="left">After that a loop works: each error the gate missed becomes a new check. This is the general principle from the article [“Harness engineering in practice”](/blog/harness-driven-development/), and a gate is its special case. And keep a log of verdicts: how many steps the agent passed without a person before the gate and after it. This is the very autonomy metric that research lacks.</b-why>
  <b-finding>
    <ex>Five steps give a gate that is written in a file, started by a hook, does not let tests be bypassed, looks at meaning and stands on a narrow function set.</ex>
    <gen>The first gate does not have to be clever. It is enough that the agent cannot say “done” itself and that the check stands outside it.</gen>
    <do>Do steps 1 and 2 for one task today. Add the rest as the gate misses errors.</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Questions and answers">
  <b-faq-cards>
    <q t="What are quality gates for AI agents?">A point where an agent’s work stops until an independent check answers “accepted”. The agent does not mark “done” itself: the answer comes from a machine, a reviewing agent or a person.</q>
    <q t="How does a gate differ from a test?">A test checks one rule and returns a result. A gate decides whether the work may go on, combines tests, a reviewing agent and a person into one decision, and can stop the agent.</q>
    <q t="Do gates increase an agent’s autonomous run time?">There are no direct measurements. There is arithmetic: at 95% success per step, 20 steps pass without an error in 36% of cases, and a gate that catches 4 of 5 errors lifts that to about 82%. And there are cases from Anthropic, Stripe and Spotify.</q>
    <q t="Where should a gate be placed?">Outside the agent and outside its context, in a client hook or in server permissions behind MCP. The agent itself works in a small bounded context: there a check is finite, the change is small and the set of MCP functions is narrow. A rule in instruction text remains only advice.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Read next">
  <b-links>
    <item href="/blog/harness-driven-development/" k="Harness" t="Harness engineering in practice">guides, sensors and the “error to rule” loop</item>
    <item href="/blog/agent-checkpoint/" k="Checking" t="Where to check an AI agent’s work">the aggregate border and Rice’s theorem</item>
    <item href="/blog/agents-per-bounded-context/" k="Agents" t="How many AI agents do you need">one agent per bounded context</item>
    <item href="/blog/mcp-agent-access/" k="MCP" t="MCP for an AI agent">what problem it solves and how to connect it</item>
    <item href="/blog/mcp-scopes/" k="MCP" t="MCP scopes in Claude Code">local, project and user</item>
    <item href="/blog/ai-agent-maturity-levels/" k="Maturity" t="AI agent maturity levels">from chat to specs, skills, code and a system</item>
  </b-links>
</b-chapter>
<b-footer>Facts: as of 14 November 2026, from the primary sources shown by ↗ marks and links in the text. The calculation on the autonomy chart is mine, assuming independent steps. The booking example is made up. Quotes about Spotify’s judge and its removal come from InfoQ’s report.</b-footer>
</b-post>
