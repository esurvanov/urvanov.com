1

**Prompt:** the request wording

2

**Context:** what the model knows

3

**Harness:** the agent's environment HDD

Stages as described by Faros and marmelab

## Three stages

Prompt

role format example

fixes one request

Context

documents project memory

fixes what the model knows

Harness

tools tests rules permissions

fixes every future run

**Takeaway:**

**In this example:** A prompt fixes one answer, context fixes what the model knows, and the harness fixes every future agent run.

**In general:** Harness-Driven Development is work at the third stage: the developer writes less code and spends more time setting up the environment where the agent writes, checks and fixes it.

**Next step:** Write down the agent's last three mistakes and mark the stage at which each could have been fixed for good.

## The HDD loop

Mitchell Hashimoto's principle: when the agent makes a mistake, change the harness so that mistake can't happen again Faros

**Takeaway:**

**In this example:** A mistake caught by the sensors goes into the harness as a new rule, and the agent gets that rule on every following run.

**In general:** A result fixed by hand helps once. A rule in the harness (an instruction, a test or a hook) applies to all future tasks, so the harness gets more precise over time without changing the model.

**Next step:** Adopt a rule: any agent mistake you had to fix by hand becomes a line in the instructions or a test on the same day.

## Guides and sensors

**Guides:** before the action

**Sensors:** after the action

**Computational:** fast · reliable

types code templates generators

tests linter type checking

**AI-based:** flexible · costlier

AGENTS.md · CLAUDE.md skills specs

AI review LLM judge

Split as described in Martin Fowler: Harness engineering

**Takeaway:**

**In this example:** Four cells: guides set the course before the agent works, sensors catch deviations afterwards, and each can be computational or AI-based.

**In general:** Computational checks run in seconds and don't make mistakes, so use them wherever a rule can be written down formally. Keep AI-based checks for meaning: style, clarity, fit with the intent.

**Next step:** For each rule in the agent's instructions, ask whether a test or linter could check it. If so, move it there.

## Three check layers

**Code quality:**

mature

**Architecture:**

growing

**Behavior:**

hardest

Layer maturity as assessed by Martin Fowler

**Takeaway:**

**In this example:** Code quality is the easiest to check today, and product behavior the hardest.

**In general:** Linters and formatters cover the first layer almost immediately. Architecture is checked with dependency rules and performance requirements. Behavior still needs good scenario tests and a human eye.

**Next step:** Start with the first layer: run a linter and formatter on every agent run, then add one rule for module boundaries.

## Earlier is cheaper

**Before work:** instructions · specs $

**On write:** hooks · linter $$

**In CI:** tests · build $$$

**At review:** a person $$$$

**Takeaway:**

**In this example:** The same mistake costs least before the agent starts and most at human review.

**In general:** Put fast checks as early as possible: the agent fixes the problem itself while the task context is still in front of it, and only the debatable points reach a person.

**Next step:** Wire tests and the linter into a hook the agent runs after every edit, in addition to CI.

## Where people matter

Harness

style · types · tests · boundaries

Person

architecture · product · new rules

"A good harness keeps the human in the loop and directs their attention to where it matters most" — paraphrasing Martin Fowler

**Takeaway:**

**In this example:** The harness takes most of the checks; the person keeps the decisions and the work of improving the harness.

**In general:** An experienced developer carries an implicit harness in their head: knowledge of the architecture, team habits, a feel for risk. HDD moves that knowledge into explicit rules, so every agent run gets it.

**Next step:** After each review of the agent's code, write down one comment that keeps coming up and turn it into a rule.

## HDD and specs

**Spec:** the result you need

**Harness:** how to check you got it

**Accepted code:** no line-by-line manual review

"Specs define the target state, the harness is the control system" — Loiane Groner. More on specs in the talk Spec-Driven Development in practice

**Takeaway:**

**In this example:** The spec answers "what are we building", the harness answers "how do we know we built it".

**In general:** Without a spec the harness has nothing to check, and without a harness the spec stays a document. Together they let you accept the agent's code based on checks instead of reading every line.

**Next step:** For each requirement in the spec, write down which test or check will confirm it is met.

## Where to start

1

An instructions file for the agent

AGENTS.md or CLAUDE.md in the project root: how to build, how to test, what not to do

2

Linter and tests after every edit

a hook the agent runs itself before handing over the result

3

An agent mistake log

every mistake fixed by hand gets a line with its cause

4

Mistake → rule

once a week, move log entries into instructions, tests or hooks

5

A progress file for long tasks

a feature list with statuses and the commit history, so a new session picks up where the last one stopped Anthropic

**Takeaway:**

**In this example:** Five steps: two set up the harness right away, three start the "mistake → rule" loop.

**In general:** Nobody designs a harness in full up front. It grows out of the agent's real mistakes in your project, and within a few weeks the agent stops repeating the most common ones.

**Next step:** Today, create the instructions file and the mistake log. In a week, move the first log entries into rules.

## Further reading

Stage 1–2

Prompts for work tasks

how to write a single request and supply data

Stage 3

Comparing harnesses

Claude Code, Codex, Cursor, Hermes and chat

More to read: Martin Fowler · Anthropic: Harness design · Becoming a Harness-Driven Developer · awesome-harness-engineering

Terms and the layer split follow the sources linked in the captions under the diagrams.
