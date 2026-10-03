---
title: What is harness engineering, in plain words: an AI agent's harness, what it is made of and where to start
date: 2026-10-04
description: A harness is everything around the model that turns it into an agent: instructions, tools, permissions and checks. What harness engineering is, how it differs from prompting and how to start from one agent mistake.
tags: AI, harness engineering, harness, Claude Code, agents
category: harness
mentions: Harness engineering, Claude Code, Codex, AGENTS.md, CLAUDE.md
---

A **harness** is everything around a language model that turns it into an agent: instructions, tools, permissions, checks and memory. On its own the model only replies with text. The harness lets it read files, run tests and change code. **Harness engineering** is the work of shaping that environment.

Claude Code, Codex and Cursor are harnesses. You can swap the model inside them, but the rules, tools and checks stay, and they decide how reliable the agent is.

## What a harness is made of

| Part | What it is | Example |
|---|---|---|
| Instructions | What the agent must know about the project | `AGENTS.md`, `CLAUDE.md`, skills |
| Tools | What the agent can do | file reads, terminal commands, search, MCP |
| Permissions | What the agent must not do | sandbox, allowed-command list |
| Checks | How mistakes are caught | tests, linter, type check, review |
| Memory | What carries over between runs | project notes, decision log |

## How it differs from prompting

Working with AI went through three stages ([Faros](https://www.faros.ai/blog/harness-engineering), [marmelab](https://marmelab.com/blog/2026/09/24/the-state-of-ai-harness-engineering-2026.html)):

1. **Prompt**: fixes one request.
2. **Context**: fixes what the model knows.
3. **Harness**: fixes every following run.

A hand-corrected answer helps once. A rule in the harness applies to every future task.

## The core principle: a mistake becomes a rule

Mitchell Hashimoto’s formulation: when the agent makes a mistake, change the environment so that it cannot repeat it. Example: the agent habitually runs a migration on the production database. Instead of cancelling the run every time, you add a line to the instructions, forbid the command in permissions and add a check. Next time the agent does not repeat the mistake.

## Guides and sensors

The split comes from [Martin Fowler](https://martinfowler.com/articles/harness-engineering.html):

- **Guides** act before the agent works: instructions, templates, code generators.
- **Sensors** fire afterwards: tests, linters, type checks, review.

If a rule can be checked formally (by a test or a linter), do it that way: such a check is fast and does not err. Keep AI-based checks for meaning: style, clarity, fit with the intent.

## Where to start

1. Write down the last three agent mistakes you fixed by hand.
2. For each, decide whether it is an instruction, a prohibition, a test or a check.
3. Add the rule the same day. In a month you will have your own set that works with any model.

## Further reading

- [Harness engineering in practice: the mistake-to-rule loop](/en/blog/harness-driven-development/): the HDD method with examples and diagrams.
- [Claude Code, Codex, Cursor and Hermes Agent compared](/en/blog/ai-in-code-harness-and-tools/): which harnesses exist and how they differ.
- [AGENTS.md and CLAUDE.md, specs, rules and skills](/en/blog/specs-rules-skills/): what to keep in the agent’s instructions.
