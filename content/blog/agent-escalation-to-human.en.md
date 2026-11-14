---
title: Escalation to a human in AI agents: how an agent stops and asks through MCP and hooks
date: 2026-11-14
updated: 2026-11-14
description: What happens when an agent hands a decision to a person. The three elicitation answers in MCP, Claude Code permission modes and hooks, what autonomy benchmarks measure, how often agents really ask, and why the path to a person is narrow.
tags: AI, agents, MCP, elicitation, escalation, hooks, Claude Code, autonomy, harness
category: harness
layout: wide
mentions: MCP, hooks, harness, bounded context, quality gate, Google DeepMind, escalation to a human
toc: answer=In short | seen=First look | penalty=Penalty | measure=Metrics | time=Autonomy | behavior=Behavior | mcp=MCP | cc=Claude Code | narrow=Window | claims=Results | start=Start | faq=Questions | next=Read next
---

Escalation to a human is the moment an agent stops working and hands a decision to a person: by a question, a permission request or a confirmation. MCP has elicitation for this, with three answers (accept, decline, cancel); Claude Code has hooks and permission modes. The check stands outside the agent, and the escalation itself passes through a narrow window. Below: what it looked like at first and what the checks showed.

<b-post series="harness">
<b-callout icon="bulb">**An observation.** I thought agents are trained and measured on how long they work on their own, without a person. The score is given for the outcome: task solved is 1, not solved is 0. A question to a person does not produce an outcome by itself, so the penalty arrives for an unfinished task, and guessing pays better. I checked this against documents and papers and derived the formulas below. A penalty for the question itself turned out to be rare: some metrics do not provide for a question and some reward it.</b-callout>

<b-chapter id="answer" icon="chat" title="In short: what escalation is and where it passes">
  <b-art names="agent-escalation-to-human/window" wide/>
  <b-cap>The agent works in its own context; one question goes to the person behind the separator and one of three answers returns.</b-cap>
  <b-why align="left"><b-icon name="chat"/> **What it is.** Escalation is a stop initiated by the agent or by the program around it: “I may not decide here, a person is needed”. Three common kinds: a clarifying question, a permission request for a dangerous action, a confirmation of the result before merge. The quality gate from [“What are quality gates for AI agents”](/blog/quality-gates-ai-agents/) hands a person whatever the check is “not sure” about, so escalation continues the gate.</b-why>
  <b-why align="left"><b-icon name="package"/> **How it works in MCP.** A server can ask a person through the client: in the specification this is elicitation. There are three answers: accept, decline, cancel. A server may not count on an answer: the protocol itself requires handling a decline and a cancel.</b-why>
  <b-why align="left"><b-icon name="shield-check"/> **How it works in Claude Code.** Permission modes decide which calls go to a person, and hooks intercept a call and answer “allow”, “deny” or “ask”. The program enforces this, while the instruction text only guides.</b-why>
  <b-finding>
    <ex>An agent edits the config of a booking server. A hook sees the path of a live config and answers “ask”: a person gets a window with a question. If nobody answers and the run has no interface, the call is rejected and the agent continues with another plan.</ex>
    <gen>Escalation has two parts: the program around the agent decides “ask”, and the answer comes from a person through a narrow window.</gen>
    <do>Write down three agent actions after which you want to see a question: deletion, release, a permissions change. Everything else can be allowed without questions.</do>
  </b-finding>
</b-chapter>

<b-chapter id="seen" icon="eye" title="What it looked like at first">
  <b-why align="left">The starting observation was simple: agents rarely stop and ask, and more often guess and carry on. A chain of four assumptions grew out of it, and each had to be checked on its own.</b-why>
  <b-rules cols="2">
    <rule icon="shield-check" t="1. The check stands outside">A gate and a question to a person should live outside the agent, or it will decide for itself.</rule>
    <rule icon="clock" t="2. Agents are trained for autonomy">Agents are trained and measured on how long they work on their own: how far they go from start to stop without a person.</rule>
    <rule icon="x" t="3. A question is a loss">The score gives 1 for a solved task and 0 for an unsolved one. A question with no solution gives 0 while a guess may give 1, so asking does not pay.</rule>
    <rule icon="package" t="4. MCP is a bottleneck">Only a question and an answer pass through MCP, and the host decides the rest.</rule>
  </b-rules>
  <b-why align="left">Next, in order: what benchmarks measure, what “autonomous time” means, how agents ask in practice, what MCP and Claude Code say. Expectations and findings are put side by side in a table near the end. First, where exactly the penalty sits in such a metric.</b-why>
</b-chapter>

<b-chapter id="penalty" icon="x" title="What an agent is penalized for: the metric and its formulas">
  <b-why align="left">Two schemes show which quantity drops when an agent stops and asks. This is a simplified record by the meaning of the metrics in the sources; quotes come in the chapters on the checks.</b-why>
  <b-art names="agent-escalation-to-human/score-cases" wide/>
  <b-cap>Score by outcome: a right answer gives 1, a wrong one and a stop without a solution give 0.</b-cap>
  <b-why align="left">The penalty falls on the unfinished outcome: a stop without a solution gets the same 0 as a mistake. If a channel exists and the task is solved after the answer, the question even pays, and that is how HiL-Bench is built.</b-why>
  <b-art names="agent-escalation-to-human/turn-cut" wide/>
  <b-cap>A question cuts the turn: a made-up example of 60 minutes.</b-cap>
  <b-why align="left">At Anthropic a question ends the measured turn. The lab itself calls an agent’s stop oversight.</b-why>
  <b-finding>
    <ex>An agent spends forty minutes fixing an export, hits two equally valid ways and asks a person. By outcome scoring the question costs nothing while the task is solved afterwards. By turn length it cuts 60 minutes into 40 and 20.</ex>
    <gen>The penalty sits in two places: the zero for an unsolved task and the cut of a turn at a question. None of the metrics reviewed subtracts for the question itself.</gen>
    <do>Write down the formula for your metric: what stands in the numerator and what happens to the score if the agent stopped and asked.</do>
  </b-finding>
</b-chapter>

<b-chapter id="measure" icon="gauge" title="Check: what autonomy benchmarks measure and where a person sits in them">
  <b-why align="left">Autonomy is measured in different ways, and the way decides whether a metric can see a stop to ask a question. In order below: the picture of a metric with a finish line, the METR horizon, classic benchmarks and metrics where a question counts.</b-why>
  <b-art names="agent-escalation-to-human/finish-line" wide/>
  <b-cap>The metric marks the finish; the path of a question to a person is not in the count.</b-cap>
  <b-subhead>The METR horizon: how long a task takes a person</b-subhead>
  <b-why align="left">METR defines the horizon as the time people typically take on tasks the model solves with 50% success<b-proof href="https://arxiv.org/abs/2503.14499" quote="METR, arXiv 2503.14499: „the time humans typically take to complete tasks that AI models can complete with 50% success rate“"/>. Task time comes from successful human runs. The set has no tasks involving a request to a person, and METR itself warns that the horizon is not the time of independent work<b-proof href="https://metr.org/notes/2026-01-22-time-horizon-limitations/" quote="METR, 22.01.2026: „Time horizon is not the length of time AIs can work independently“; „We have no tasks involving multi-turn interaction with a human so there is no right answer.“"/>. In the report of 19 May 2026 the best shared model got 16–20 hours at the 50% level and 3–4 hours at the 80% level<b-proof href="https://metr.org/blog/2026-05-19-frontier-risk-report/" quote="METR, Frontier Risk Report: „the 50% time horizon point estimate of the most capable shared model was between 16 and 20 hours“"/>.</b-why>
  <b-codebox title="How the METR horizon is computed">
    p(success | task of length t) = σ( (ln h − ln t) · β )
    h — the horizon: the task length at which p = 0.5
    t — the geometric mean of successful human run times
  </b-codebox>
  <b-why align="left">METR’s method is a logistic curve over task length, with the horizon taken at the 50% (or 80%) point<b-proof href="https://arxiv.org/abs/2503.14499" quote="METR, arXiv 2503.14499: „we use logistic regression to find the task difficulty at which the agent has a 50% chance of success“"/>. The agent’s own time does not stand in the formula anywhere.</b-why>
  <b-art names="agent-escalation-to-human/horizon" wide/>
  <b-cap>Task hours of the best model: at the 50% level and at the 80% level.</b-cap>
  <b-subhead>Task benchmarks: no person in them</b-subhead>
  <b-why align="left">SWE-bench scores by tests: “the percentage of task instances that are resolved”<b-proof href="https://arxiv.org/abs/2310.06770" quote="SWE-bench: „The metric for our benchmark is the percentage of task instances that are resolved.“"/>. In OSWorld, Terminal-Bench, GAIA and Cybench a script, a test or a flag judges, and there is no channel to a person. The phrase “minimal human intervention” in these papers describes a goal or the growth of the set, and is no metric. In tau-bench the reward is 0 or 1 by the final database, and a handoff to a person is an ordinary action: in some tasks it belongs to the reference, in the rest the database will not match.</b-why>
  <b-subhead>Metrics where a question counts: HiL-Bench, HAS-Bench, Anthropic</b-subhead>
  <b-why align="left">These three sources count a question differently, so the sharpest contrast comes first: what happens to a model when a task cannot be solved without asking.</b-why>
  <b-art names="agent-escalation-to-human/hil-bench" wide/>
  <b-cap>When the missing part must be found by asking a person, the share of solved tasks falls several times over.</b-cap>
  <b-why align="left">HiL-Bench from Scale AI is built so that a task cannot be solved without asking. The authors write that ordinary benchmarks are blind to this failure<b-proof href="https://arxiv.org/abs/2604.09408" quote="HiL-Bench, 04.05.2026: „an agent that makes a lucky guess for a missing requirement will score identically to one that would have asked to be certain“"/>. With a “ask a person” function the best models solve 1 to 39% of tasks, against 67 to 91% with full information. The training reward: +0.3 for a relevant question and −0.1 for an extra one. HAS-Bench introduces the share of human intervention as a descriptive figure<b-proof href="https://arxiv.org/abs/2607.04329" quote="HAS-Bench, 05.07.2026: „HIR is a descriptive cost/intensity metric. Higher HIR means more human involvement, not necessarily better task performance.“"/>. In its work on autonomy in production Anthropic counts interventions and agent-initiated stops separately and calls the stops a form of oversight<b-proof href="https://www.anthropic.com/research/measuring-agent-autonomy" quote="Anthropic, 18.02.2026: „agent-initiated stops are an important kind of oversight in deployed systems.“"/>.</b-why>
  <b-codebox title="Three ways to count a question">
    HiL-Bench:  r_question = +0.3 if the question targets something missing
                r_question = −0.1 if it is extra or a repeat
                a task counts only when everything missing is resolved
    HAS-Bench:  HIR = steps done by people / all steps   (a description, not a penalty)
    Anthropic:  an agent stop counts as oversight, an intervention separately
  </b-codebox>
  <b-art names="agent-escalation-to-human/metrics" wide/>
  <b-cap>Four ways to treat an agent’s question: no channel, neutral, reward, a form of oversight.</b-cap>
  <b-why align="left">This summary puts the four ways together: the same agent work, while a metric may not see a question, reward it or count it as oversight.</b-why>
  <b-finding>
    <ex>The same agent cannot ask in SWE-bench, asks for a reward in HiL-Bench, and in Anthropic’s production metrics its stop is recorded as oversight. There is more than one metric, and a request to a person is recorded differently in each.</ex>
    <gen>The claim “autonomy metrics punish a question” is wrong as a general rule. What holds is narrower: classic benchmarks do not provide for a question, and a stop without a solution equals failure.</gen>
    <do>Ask about your own autonomy metric: what does it record when the agent stopped and asked: success, failure or nothing.</do>
  </b-finding>
</b-chapter>

<b-chapter id="time" icon="clock" title="What counts as autonomous time at METR, Anthropic and DeepMind">
  <b-why align="left">The phrase “autonomous time” means three different things at three labs, and that decides whether an agent’s question to a person hurts the metric. Below in turn: what METR counts, what Anthropic counts and what Google DeepMind counts.</b-why>
  <b-art names="agent-escalation-to-human/three-clocks" wide/>
  <b-cap>Three measures: a person’s hours on the task, a turn from start to stop, a task without human intervention.</b-cap>
  <b-why align="left">“Work on their own” can be measured three ways. The first: how many hours a task takes a person, a task the agent solves. The second: how far the agent goes from start to stop. The third: what share of tasks is done without human intervention. The formulas of all three are below.</b-why>
  <b-subhead>METR: the difficulty of a task, the agent’s own time is not in the metric</b-subhead>
  <b-why align="left">METR itself answers whether this is the time of independent work<b-proof href="https://metr.org/notes/2026-01-22-time-horizon-limitations/" quote="METR, 22.01.2026: „Time horizon is not the length of time AIs can work independently. Rather, it's the amount of serial human labor they can replace with a 50% success rate.“"/>. The FAQ on the horizons page says the same: it measures the difficulty of a task, and the time an AI spends is not part of it<b-proof href="https://metr.org/time-horizons" quote="METR, FAQ: „It’s a measure of the difficulty of a task, rather than the time an AI spends to complete the task.“"/>. METR does not publish the agent’s own time: it varies greatly by model provider and agent setup.</b-why>
  <b-subhead>Anthropic: an agent’s turn from start to stop</b-subhead>
  <b-why align="left">In its work on autonomy in production, time is counted mechanically from Claude Code telemetry: from the start of work to a stop, and a stop can be a question to a person<b-proof href="https://www.anthropic.com/research/measuring-agent-autonomy" quote="Anthropic, 18.02.2026: „tracking how much time has elapsed between when Claude starts working and when it stops (whether because it finished the task, asked a question, or was interrupted by the user)“"/>. So an agent’s question cuts the turn and formally shortens the measured time. The authors themselves caveat that turn length is an imperfect proxy for autonomy.</b-why>
  <b-why align="left">Anthropic does not treat a stop to ask as a defect. In its words, on harder tasks Claude limits its own autonomy by stopping to consult the human, and a footnote adds that asking the user a question is itself a form of agency<b-proof href="https://www.anthropic.com/research/measuring-agent-autonomy" quote="Anthropic: „stopping to ask the user a question is itself a form of agency“"/>. Only a blocking question of the kind “I need this to continue” counts; a question like “shall I commit?” after a finished task is not a stop.</b-why>
  <b-subhead>Google DeepMind: the task is done without human intervention</b-subhead>
  <b-why align="left">DeepMind has no turn-length metric. In “Levels of AGI” autonomy is described by levels from “AI as a Tool” to “AI as an Agent”, by interaction style rather than time, and the ability to turn to a person is part of the top level: a fully autonomous AI acts without continuous oversight but knows when to consult humans<b-proof href="https://arxiv.org/abs/2311.02462" quote="Levels of AGI, arXiv 2311.02462: „such a fully autonomous AI can act in an aligned fashion without continuous human oversight, but knows when to consult humans“"/>. In the Frontier Safety Framework report (October 2026) autonomy is defined as “the task was done without human intervention”: they look at whether the agent succeeded on its own and whether a person intervened, and the share of fully delegated pull requests grew from 7.5% to 11.9%<b-proof href="https://storage.googleapis.com/deepmind-media/gemini/gemini_4_argon_fsf_report.pdf" quote="Gemini 4 Argon FSF report: „whether the agent succeeded autonomously, and whether the human intervened or the outcome was otherwise negative or ambiguous“"/>. A separate metric “the agent asked a person” was not found there.</b-why>
  <b-table>

| Who | What counts as autonomous | An agent’s question to a person |
|---|---|---|
| **METR** | task difficulty in human hours | no such event: tasks have no dialogue |
| **Anthropic** | turn length until a stop | cuts the turn but is called oversight |
| **Google DeepMind** | a task without human intervention | not an intervention, not counted separately |

  </b-table>
  <b-finding>
    <ex>The agent stopped and asked. At Anthropic the turn ended there, at METR there is no such event, and DeepMind cares whether a person intervened on their own.</ex>
    <gen>An agent’s question shortens only the turn at Anthropic, and even there it is called oversight. The labs count a human’s own intervention as the minus.</gen>
    <do>When you are given hours of autonomous work for an agent, ask which measure it is: turn length, task difficulty or the share of tasks without intervention.</do>
  </b-finding>
</b-chapter>

<b-chapter id="behavior" icon="eye" title="Check: do agents actually ask">
  <b-art names="agent-escalation-to-human/ask-rate" wide/>
  <b-cap>The share of sessions with a question in one study: from zero to a half.</b-cap>
  <b-why align="left">There is no single share; the result depends on the model, the prompt and the harness. Without permission to ask, models are almost silent: in Ambig-SWE (500 SWE-bench tasks) “without explicit prompting, models almost never interact”<b-proof href="https://arxiv.org/abs/2502.13069" quote="Ambig-SWE, arXiv 2502.13069: „Without explicit prompting, models almost never interact, even for severely underspecified inputs.“"/>. With a prompt Sonnet 4 asks on underspecified tasks in 82% of cases, on complete ones in 3%. The chart above shows “Ask Early, Ask Late, Ask Right”, another set: Sonnet 4.5 asked in 23% of sessions, GPT-5.2 in 52%, Gemini 3 Flash in 0%, and no model asked in the best window, about 10% into the run (arXiv 2605.07937).</b-why>
  <b-why align="left">The opposite extreme exists too. In LHAW (arXiv 2602.10525) GPT-5.2 asks in 81–97% of runs with little benefit per question, and in “Ask or Assume” (arXiv 2603.26233) Sonnet 4.5 asks in 73.8% of tasks. People are overloaded as well: by Anthropic’s data on auto mode users accept 93% of permission requests, and the post speaks of confirmation fatigue directly<b-proof href="https://www.anthropic.com/engineering/claude-code-auto-mode" quote="Anthropic, 25.03.2026: „users accept 93%“ of permission requests"/>.</b-why>
  <b-art names="agent-escalation-to-human/ask-extremes" wide/>
  <b-cap>Two extremes: silent and guessing, or flooding with questions.</b-cap>
  <b-why align="left">The cause “training rewards completion” is put forward by authors of several papers, but there is no measurement for agents. A related paper by Kalai et al. (arXiv 2509.04664) shows that with binary grading abstaining does not pay, and 9 of 10 checked benchmarks are binary, SWE-bench included. That paper is about the answer “I do not know”; carrying it over to a question to a person stays an analogy.</b-why>
  <b-finding>
    <ex>An agent without permission to ask stays silent and guesses, while an agent with permission floods a person with questions. Both cases are recorded in measurements, so the conditions need fixing: when to ask and how often.</ex>
    <gen>“Agents do not ask” and “agents ask too much” are both true, in different models and settings.</gen>
    <do>Give the agent an explicit threshold: “ask if the decision is irreversible or you have two equal readings of the task; decide the rest yourself”.</do>
  </b-finding>
</b-chapter>

<b-chapter id="mcp" icon="package" title="Check: what MCP says about elicitation">
  <b-why align="left">Elicitation is the way an MCP server asks a person for extra data through the client<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28/client/elicitation" quote="MCP specification: „The Model Context Protocol (MCP) provides a standardized way for servers to request additional information from users through the client during interactions.“"/>. Below are the facts for version 2026-07-28 and what changed in it.</b-why>
  <b-rules cols="2">
    <rule icon="check" t="Three answers">Accept: the person approved and sent data. Decline: the person explicitly said “no”. Cancel: the person closed the window without choosing<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28/client/elicitation#response-actions" quote="MCP specification: „Decline (action: 'decline'): User explicitly declined the request“; „Cancel (action: 'cancel'): User dismissed without making an explicit choice“"/>. The server must handle a decline and a cancel<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28/client/elicitation#error-handling" quote="MCP specification: „Servers SHOULD NOT assume that elicitation requests will always succeed, and MUST handle cases where the user declines or cancels the elicitation“"/>.</rule>
    <rule icon="layers" t="Two modes">Form: a flat schema with simple fields, the client sees the data. URL: the person is sent to an external address and the data does not pass through the client or the model. Asking for passwords, keys and payment data through a form is forbidden, and URL mode exists for them<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28/client/elicitation#user-interaction-model" quote="MCP specification: „Servers MUST NOT use form mode elicitation to request sensitive information such as passwords, API keys, access tokens, or payment credentials.“"/>.</rule>
    <rule icon="refresh" t="New in 2026-07-28">A server no longer sends a request on its own initiative: it answers a client request with an “input required” result, the client collects the answer and repeats the request<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28/basic/patterns/mrtr" quote="MCP specification: „Servers MUST send server-to-client requests (such as roots/list, sampling/createMessage, or elicitation/create) using the MRTR pattern. The previous pattern of server-initiated requests is no longer supported.“"/>. Sampling, Roots and Logging are marked deprecated (SEP-2577).</rule>
    <rule icon="user" t="Human in the loop">For elicitation the client must show which server asks, offer decline and cancel, and let the person review and edit a form answer. For function calls and sampling the wording is softer: “SHOULD always be a human in the loop”<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28/server/tools#user-interaction-model" quote="MCP specification: „For trust & safety and security, there SHOULD always be a human in the loop with the ability to deny tool invocations.“"/>.</rule>
  </b-rules>
  <b-why align="left">The two modes differ in one thing: who sees the person’s answer. The picture shows it.</b-why>
  <b-art names="agent-escalation-to-human/elicit-modes" wide/>
  <b-cap>Form and URL: who sees the person’s answer.</b-cap>
  <b-why align="left">What the specification lacks. It neither allows nor forbids a client or an agent to answer instead of a person: the word “user” stands everywhere, and no interface is imposed (“the protocol itself does not mandate any specific user interaction model”). There are no sanctions for such an auto-answer either, and the specification says so itself<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28" quote="MCP specification: „While MCP itself cannot enforce these security principles at the protocol level, implementors SHOULD: 1. Build robust consent and authorization flows into their applications“"/>. The words “bottleneck” or “limitation” do not appear in the specification.</b-why>
  <b-finding>
    <ex>A payment server asks to confirm a transfer. If the client presses “accept” itself, the protocol will not notice: control stays with the host and its settings.</ex>
    <gen>MCP describes how to ask and which answers exist, but who answers and whether one may answer for a person is decided by the client.</gen>
    <do>Check your client: can an agent or a script answer elicitation instead of a person. If it can, forbid that for dangerous servers.</do>
  </b-finding>
</b-chapter>

<b-chapter id="cc" icon="shield-check" title="Check: modes, hooks and a question to a person in Claude Code">
  <b-art names="agent-escalation-to-human/hook-vs-text" wide/>
  <b-cap>A hook and permission rules are enforced by the program. Instruction text remains advice.</b-cap>
  <b-why align="left">The Claude Code documentation says it directly: permission rules are enforced by the Claude Code program, and instructions in a prompt or CLAUDE.md do not change what it allows<b-proof href="https://code.claude.com/docs/en/permissions" quote="Claude Code docs: „Permission rules are enforced by Claude Code, not by the model. Instructions in your prompt or CLAUDE.md shape what Claude tries to do, but they don't change what Claude Code allows.“"/>.</b-why>
  <b-subhead>Modes: how many questions reach a person</b-subhead>
  <b-why align="left">The person picks the mode at launch: it decides how many questions reach them at all.</b-why>
  <b-art names="agent-escalation-to-human/modes-ladder" wide/>
  <b-cap>Six modes from “asks everything” to “asks nothing” and what is not auto-approved.</b-cap>
  <b-why align="left">Even in the freest mode some things are not auto-approved: the built-in AskUserQuestion function, MCP functions marked as requiring user interaction, and “ask” rules<b-proof href="https://code.claude.com/docs/en/permission-modes" quote="Claude Code docs: „Claude Code doesn't auto-approve the following in any mode, including `bypassPermissions`“ — among them explicit `ask` rules and „Tools that require user interaction: the built-in `AskUserQuestion` tool and MCP tools marked `requiresUserInteraction`“"/>. A permission cannot be obtained from a person after the fact: no person, no answer.</b-why>
  <b-subhead>Hooks: deciding whether to ask</b-subhead>
  <b-why align="left">The PreToolUse hook answers before a function call with one of four decisions: allow, deny, ask or defer<b-proof href="https://code.claude.com/docs/en/hooks" quote="Claude Code docs: „PreToolUse hooks can control whether a tool call proceeds. [...] four outcomes (allow, deny, ask, or defer)“"/>. With several hooks the order is: deny beats defer, defer beats ask, ask beats allow. The “defer” decision is for runs without an interface: the calling program pauses Claude, collects the answer through its own interface and resumes from the same place. The Elicitation hook ties this to MCP: it answers a server request with accept, decline or cancel, and without an interface an unhandled request is cancelled.</b-why>
  <b-why align="left">A limit for subagents: AskUserQuestion is always removed from them. In a run without an interface a call that would need a question is rejected unless there is an allow rule, a hook or a host for requests. So an autonomous run without configured rules gets a denial, and an answer from a person is not coming.</b-why>
  <b-art names="agent-escalation-to-human/night-run" wide/>
  <b-cap>With no person, a question becomes a report at a closed door.</b-cap>
  <b-why align="left">This is what escalation looks like with no person: a stop and a recorded reason instead of a guess.</b-why>
  <b-finding>
    <ex>A night run on a build server. The agent wants to release a build and nobody can be asked. In dontAsk mode the call is rejected, the agent writes a blocker report, and in the morning a person sees it instead of a silent workaround.</ex>
    <gen>In an autonomous run escalation turns from a question into a blocker report: the agent stops, records the reason and waits.</gen>
    <do>For night runs set explicit “deny” rules for dangerous actions and demand a blockers file from the agent instead of a silent guess.</do>
  </b-finding>
</b-chapter>

<b-chapter id="narrow" icon="workflow" title="What came out: why a gate and escalation do not fit into MCP entirely">
  <b-why align="left">The host keeps the whole conversation, and a server receives only what it needs. In the specification this is the third architecture principle<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28" quote="MCP specification: „Servers should not be able to read the whole conversation, nor 'see into' other servers.“ / „Full conversation history stays with the host“"/>. A local server runs with the client’s privileges<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28/basic/security_best_practices#local-mcp-server-compromise" quote="MCP specification: „MCP servers run with the same privileges as the client“"/>. From this follows a conclusion I draw myself: a request and an answer pass through MCP, and everything else stays on the host side.</b-why>
  <b-art names="agent-escalation-to-human/barrier-intercom" wide/>
  <b-cap>The host sets the barrier, MCP gives the intercom; a bypass is answering for the person.</b-cap>
  <b-why align="left">What exactly passes through MCP and what stays on the host side is listed below.</b-why>
  <b-rules cols="2">
    <rule icon="package" t="Through MCP">a function call, a result by schema, a request for data from a person, server permissions</rule>
    <rule icon="shield-check" t="Outside MCP">client hooks, permission modes, the sandbox, the conversation history, the person’s own dialogue with the agent</rule>
  </b-rules>
  <b-why align="left">So part of a gate lives in MCP: the request to a person, permissions, the result schema. The other part stands in the host: hooks and modes. The single decision “ask” is assembled from both parts, and if only MCP is left, the default rule runs into the fact that a client can answer for a person. This is the narrow window: a question fits in it, while the decision “whether to ask at all” is taken outside.</b-why>
  <b-finding>
    <ex>An MCP server can ask a person about a money transfer. Whether the client will show the question or answer itself is determined by the client and its hooks.</ex>
    <gen>A gate and escalation are assembled from two places: the window in MCP and rules in the host. Either one alone leaves a hole.</gen>
    <do>For each dangerous operation check both sides: the server can ask, and the client cannot answer instead of a person.</do>
  </b-finding>
</b-chapter>

<b-chapter id="claims" icon="target" title="Expected and found">
  <b-why align="left">The four assumptions from the start, checked against the text of the documents and papers themselves. Whatever could not be opened or checked in full is marked.</b-why>
  <b-art names="agent-escalation-to-human/thesis-check" wide/>
  <b-cap>The verdict on each of the four assumptions.</b-cap>
  <b-why align="left">Details are in the table: what was expected, the result and what was found.</b-why>
  <b-table>

| What it looked like | Result | What was found |
|---|---|---|
| **A gate stands outside the agent’s context** | <b-status-dot color="accent">yes</b-status-dot> | a judge inside the loop scored 86.7 against 113.0 for a check from outside (arXiv 2607.25152, pilot). In Claude Code the documentation itself separates instruction text from rules the program enforces |
| **Agents are trained and measured for autonomous run time** | <b-status-dot color="accent">partly</b-status-dot> | METR measures a task horizon: 16–20 hours at 50% success for the best shared model. How exactly Anthropic and Google DeepMind train for a long horizon was not found in public documents |
| **For metrics a question to a person is a loss, so asking does not pay** (the penalty: 0 for an unsolved task and a cut turn) | <b-status-dot color="warn">no</b-status-dot> | classic benchmarks have no channel to a person, and a stop without a solution counts as a failure. In tau-bench an unneeded handoff to a person scores 0. Metrics that count a question either reward it (HiL-Bench) or treat it as neutral (HAS-Bench). No wording like “a question is a loss” was found. There is no measurement “before and after training for completion” |
| **MCP is a bottleneck** | <b-status-dot color="warn">in meaning</b-status-dot> | There is no direct quote: the specification has no words like “bottleneck”. It does say the protocol cannot enforce security principles itself, and the host provides isolation |

  </b-table>
  <b-why align="left">The table gives one result: the assumption about punishing a question is the only one the sources did not support, and it held the whole chain together.</b-why>
  <b-finding>
    <ex>The assumption about punishing a question looked convincing, yet the one real case found is benchmarks with no channel to a person. That is a different thing: a question is impossible there, and there is nothing to punish.</ex>
    <gen>If a metric does not provide for a question, training on it does not teach asking. That follows from how the metric is built, and there is no direct proof of an effect on behavior.</gen>
    <do>Before concluding why an agent behaves a certain way, find a measurement: the same agent compared before and after training. Without it only a hypothesis remains.</do>
  </b-finding>
</b-chapter>

<b-chapter id="start" icon="flag" title="How to start: four steps and ready prompts for the agent">
  <b-why align="left">The steps go from cheap to thorough. The first two are enough for escalation to stop depending on the agent’s mood.</b-why>
  <b-rules cols="2">
    <rule icon="checklist" t="1. List of stops">Write in a file which actions require the agent to stop and ask.</rule>
    <rule icon="shield-check" t="2. Rules and a hook">Put dangerous actions into “deny” or “ask” through permissions and a PreToolUse hook.</rule>
    <rule icon="package" t="3. Permissions on the MCP server">Hand out dangerous functions only with the required scope.</rule>
    <rule icon="clock" t="4. Question log">Count how many times the agent asked, how many times needlessly and how many times stayed silent when it should have asked.</rule>
  </b-rules>
  <b-why align="left">The first prompt collects the list of stops: this is step 1.</b-why>
  <b-prompt>
    Create a file escalation.md listing the cases where the agent must stop and ask me: irreversible actions,
    release, permission changes, two equal readings of the task. For each case write which question to ask and which answer counts as consent.
    The agent decides everything else itself.
  </b-prompt>
  <b-why align="left">The second prompt turns the list into hook rules: this is step 2.</b-why>
  <b-prompt>
    Set up a PreToolUse hook in .claude/settings.json: for commands from escalation.md answer “ask”, for clearly dangerous ones answer “deny”
    with a reason the agent will see. Show the final file and an example call on which the hook fired.
  </b-prompt>
  <b-why align="left">The third prompt checks whether the client can answer for a person: this is step 3.</b-why>
  <b-prompt>
    Check my MCP client: can an agent or a script answer a request for data from a person instead of me. If it can, suggest a setting
    that prevents this for servers with dangerous functions.
  </b-prompt>
  <b-why align="left">Here is how it looks after the first two steps.</b-why>
  <b-finding>
    <ex>A week later the log showed: of ten questions eight were about renaming files. The list of stops was cut down to irreversible actions, and questions dropped to two a day.</ex>
    <gen>Escalation is tuned by the log: too many questions eat a person’s attention, too few leave the agent’s guesses.</gen>
    <do>Do steps 1 and 2 for one task today, and start the log in a week from real questions.</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Frequently asked questions">
  <b-faq-cards>
    <q t="What is escalation to a human in AI agents?">A stop where the agent or the program around it hands a decision to a person: by a question, a permission request or a confirmation. Rules and hooks take the decision “ask”, and the person gives the answer.</q>
    <q t="What is elicitation in MCP?">The way an MCP server asks a person to provide data through the client. There are three answers: accept, decline and cancel. Asking for passwords and keys in a form is forbidden, and there is an external-address mode for them.</q>
    <q t="Do autonomy metrics punish an agent for asking a person?">The penalty arrives for an unfinished outcome: 0 instead of 1, and at Anthropic a question cuts the turn. A subtraction for the question itself was not found. Classic benchmarks simply have no channel to a person. The recent HiL-Bench and Anthropic’s work reward a question or treat it as oversight, and HAS-Bench treats it neutrally.</q>
    <q t="Can a gate and escalation be built into MCP entirely?">No. MCP carries a question and an answer, while the decision whether to show the question to a person or to answer automatically is taken by the host: its hooks, permission modes and the client. The protocol itself cannot enforce that decision.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Read next">
  <b-links>
    <item href="/blog/quality-gates-ai-agents/" k="Gates" t="What are quality gates for AI agents">an intake post that says “done”</item>
    <item href="/blog/agent-checkpoint/" k="Checking" t="Where to put a check of an agent’s work">aggregate border and Rice’s theorem</item>
    <item href="/blog/mcp-agent-access/" k="MCP" t="MCP for an AI agent">which problem it solves and how to connect</item>
    <item href="/blog/mcp-scopes/" k="MCP" t="MCP scopes in Claude Code">local, project and user</item>
    <item href="/blog/harness-driven-development/" k="Harness" t="Harness engineering in practice">guides, sensors and the “error — rule” loop</item>
    <item href="/blog/ai-agent-maturity-levels/" k="Maturity" t="AI agent maturity levels">from chat to specs, skills, code and a system</item>
  </b-links>
</b-chapter>
<b-footer>Facts: as of 14 November 2026, from the documents and papers linked by ↗ marks. The openai.com pages and METR’s social post did not open, so OpenAI’s figure for the share of tasks without intervention is not used here. Some quotes about agents’ questions and about METR were checked through a page summary; verify them against the original before quoting. The examples with a config, a payment server and a night run are hypothetical.</b-footer>
</b-post>
