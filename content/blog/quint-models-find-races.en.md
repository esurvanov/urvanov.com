---
title: How to find a race condition in code: a Quint model example
date: 2026-10-25
description: How to find a race condition in code: a Quint model tries every order of actions and shows the chain where a rule breaks. Examples and limits.
tags: AI, specs, Quint, formal verification, testing, harness, race condition, model checking, data races
category: specs
layout: wide
mentions: Quint, Apalache, TLA+, model checking, formal verification, race condition, lost data, Claude Code, hooks, spec-driven development
toc: idea=The idea | found=What the models found | pair=The pair | domains=A model per domain | teeth=Checking the checks | human=Where humans step in | weak=Weak spots | start=Where to start | agent=With an agent | faq=FAQ | next=Further reading
---

A race condition is found by checking every order in which two operations can run. Tests cover only the orders you imagine, while a Quint model tries all of them itself and prints the chain of steps where a rule breaks, for example a crash mid-write or two admins at once, including in code written by an AI agent.

<b-post series="harness">
<b-art names="quint-models-find-races/intro" wide/>
<b-cap>A test follows the scenario you imagined; a model walks every scenario of a small world.</b-cap>

<b-chapter id="idea" icon="workflow" title="How a Quint model works: every scenario instead of guessing">
  <b-why align="left">The name [Quint](/materials/glossary/quint/) is easy to mix up with the QUnit test engine, but it is a different program: [a comparison with tests and TLA+](/blog/quint-vs-tests-and-tla/). How Quint differs from [TLA+](/materials/glossary/tla-plus/) and Alloy is covered in the [comparison of the three languages](/blog/tla-alloy-quint-compare/). An ordinary test is one scenario you thought up in advance: click, wait, check the result. A bug you never thought about is not in that scenario. A model works differently. You describe the states of the system and the allowed actions, and the program tries every order of actions in a small world and shows the first one where a rule breaks.</b-why>
  <b-art names="quint-models-find-races/explore" wide/>
  <b-why align="left">One model describes one area of logic, such as the life of a meeting recording or a member’s access rights, and takes from a few dozen to a few hundred lines. Next come a few stories: what exactly the model found and why a test did not.</b-why>
  <b-why align="left">Here is how it works step by step. First you choose a small world: say, one admin, one bot and one session. Then you describe what can happen in that world: log in, log out, a process crash, a new message. The program tries every order of those events and checks the rules after each step. This kind of search is called [model checking](/materials/glossary/model-checking/). If a rule breaks, you get the exact chain of steps, which you can repeat by hand.</b-why>
  <b-why align="left">The world is small on purpose. The number of orders grows fast with the size of the world, so two or three entities and five or six actions usually give a result in seconds. That is enough for races: two actions need only two participants to overlap.</b-why>
  <b-finding>
    <ex>A test checks the scenario you imagined; a model checks every scenario possible in the small world you chose.</ex>
    <gen>Bugs of the "two actions overlapped in time" kind rarely occur to anyone in advance<b-proof href="https://quint-lang.org/" quote="Quint: an executable specification language, a modern TLA+ alternative for software engineers"/>.</gen>
    <do>Pick one rule you dread losing and write it down in ten lines.</do>
  </b-finding>
</b-chapter>

<b-chapter id="found" icon="bug" title="What errors a Quint model finds: examples">
  <b-why align="left">The main value of a model is the findings nobody was looking for. Below are the two most telling ones and a list of the rest. They share one shape, a [race condition](/materials/glossary/race-condition/): two actions, each correct on its own, together cause a loss or a mix-up.</b-why>
  <b-sublabel>Story 1: a login and logout race</b-sublabel>
  <b-why align="left">Let us go through the first story in detail. Suppose a person has a Telegram session in the system, and an admin can end it. At the same moment a bot may use that session to send a message. The code first checked that the session was alive, then went to send. Between the check and the send the admin managed to log out. As a result the message went out in the name of a person whose access had already been closed.</b-why>
  <b-why align="left">No test caught this, because every step on its own works correctly. The error lives only in the order "check, logout, send", and the model found that order by itself.</b-why>
  <b-art names="quint-models-find-races/race" wide/>
  <b-cap>An admin logs out while a bot logs in with the old session. The code checked rights once, at the start, and trusted the result afterwards.</b-cap>
  <b-sublabel top="22">Story 2: a recording and a crash</b-sublabel>
  <b-why align="left">The second story is about data loss. A transcription system records a meeting and at some point must mark that a recording is in progress. If the process crashes between the start of the recording and that mark, after a restart the system does not know the recording existed. The file is there, the database entry is not. The user sees an empty spot where the meeting should be.</b-why>
  <b-why align="left">The cure is simple: set the mark before the recording starts, not after. But to notice the problem you have to imagine a crash in exactly that gap, and the model does it effortlessly, because a crash is one of its ordinary actions.</b-why>
  <b-art names="quint-models-find-races/crash" wide/>
  <b-cap>A recording was running, the process crashed, and no "recording in progress" mark was left anywhere. After a restart the system believes there was no recording, and the data is lost without a trace.</b-cap>
  <b-sublabel top="22">Other findings</b-sublabel>
  <b-rules cols="2">
    <rule icon="copy" t="An item on two cards">A recording was resumed, the analysis named another owner</rule>
    <rule icon="check-square" t="A lost ☑">An item lost its owner and vanished together with "done"</rule>
    <rule icon="close-alt" t="Deleting a non-empty item">The "delete empty tag" dialog stayed open, a bot added a member</rule>
    <rule icon="key" t="Keys wider than rights">A person's rights were narrowed, their keys work as before</rule>
    <rule icon="user-alt" t="A message to a stranger">A username passed to someone else</rule>
    <rule icon="chat-square" t="A foreign quote">A message moved to another vacancy, the hint kept the old quote</rule>
  </b-rules>
  <b-why align="left">How to read the list above. Each row has the error class on the left and an example on the right. "An item on two cards" and "a lost ☑" belong to meeting tasks, "deleting a non-empty item" and "keys wider than rights" to the admin side, "a message to a stranger" and "a foreign quote" to messaging.</b-why>
  <b-why align="left">All six share one trait: data belonged to one owner and then ended up with another or vanished. That is why checking the owner at the moment of the action, not in advance, closes almost the whole list.</b-why>
  <b-finding>
    <ex>Almost all findings belong to one class: two actions overlapped, and the code checked the condition only once.</ex>
    <gen>The cure is one too: recheck the condition at the moment of the action on the server, or put the actions under one lock.</gen>
    <do>Find a place in your code where the check and the action are separated by waiting for a response.</do>
  </b-finding>
</b-chapter>

<b-chapter id="pair" icon="swap" title="A pair of models: as is and as required">
  <b-why align="left">For each area two versions of the model are kept in one file. The first copies the code as it is now and must reproduce a known bug. The second describes the requirement: the rule is never broken. A switch at the top of the file turns the fixes on, so the difference between versions is visible at once.</b-why>
  <b-art names="quint-models-find-races/pair" wide/>
  <b-cap>On the left the path to the red room, the violation, is open. On the right a barrier stands on that path and the rule holds.</b-cap>
  <b-vs-grid>
    <h></h>
    <h>current: the code as is</h>
    <h>fixed: the requirement</h>
    <c>**Purpose**</c>
    <c>reproduces the bug with a scenario</c>
    <c>shows that the fix closes the bug</c>
    <c>**The rule**</c>
    <c>is violated</c>
    <c>holds</c>
    <c>**Fixes**</c>
    <c>none</c>
    <c>each is tagged and marked "was: …"</c>
  </b-vs-grid>
  <b-why align="left">The table has three rows. The first says what each model is for: the left one reproduces the found bug, the right one shows that the requirement can be met. The second row shows the expected check result: on the left the rule is violated, on the right it holds. If on the left it suddenly is not violated, the model has stopped reflecting the code, and that is a signal to update it.</b-why>
  <b-why align="left">The third row is about fixes. Every difference of the right model from the left one carries a tag like П1, П2 (the letter П stands for the Russian word for “fix”) and a note "was: …". These tags let you walk from the requirement to a concrete place in the code and see exactly what to change.</b-why>
  <b-finding>
    <ex>One file holds both variants: a switch turns the fixes on, so the before-and-after comparison is always at hand.</ex>
    <gen>Each bug becomes a short regression scenario that fails on the old version and passes on the new one.</gen>
    <do>Start a requirements table with a "fits a model" column and mark the first three rows.</do>
  </b-finding>
</b-chapter>

<b-chapter id="domains" icon="boxes-link" title="A model for every domain">
  <b-why align="left">Each [bounded context](/materials/glossary/bounded-context/) has its own rules, written as MUST in an [aggregate card](/blog/specs-by-aggregates/). A formal model makes those rules checkable, and an [agent per context](/blog/agents-per-bounded-context/) works inside their borders.</b-why>
  <b-art names="quint-models-find-races/contexts" wide/>
  <b-rules cols="2">
    <rule icon="users" t="Meeting">Participants of one recording never carry over to the next one on the same link</rule>
    <rule icon="lock" t="Private data">A private recording never reaches shared storage</rule>
    <rule icon="user-alt" t="Member">One Telegram ID, one record, history is never lost</rule>
    <rule icon="target" t="Vacancy">A vacancy status belongs only to the candidate of its match</rule>
  </b-rules>
  <b-why align="left">What stands behind each example. "Meeting" is the rule that people from the previous recording do not carry over into the next one, even if the meeting link is the same. "Private data" means a private recording cannot end up in shared storage under any order of actions. "Member" means one Telegram account matches one member record, and history survives a merge. "Vacancy" means a status on a vacancy belongs to a specific pair of candidate and vacancy, not to the candidate in general.</b-why>
  <b-finding>
    <ex>A MUST rule from an aggregate card becomes a model property, and a violation goes back to that context's agent as a chain of steps.</ex>
    <gen>A context border serves three things at once: the spec, the agent and the model.</gen>
    <do>Pick one context and one MUST rule and write the first model for it.</do>
  </b-finding>
</b-chapter>

<b-chapter id="teeth" icon="shield-check" title="Checking the checks">
  <b-why align="left">A green result can mean "all correct" or "the check checked nothing". So the checks themselves are checked: the author or an agent breaks the model on purpose (for example, removes one condition) to see whether the rule notices. If it does not, the rule is useless.</b-why>
  <b-sublabel>Example: share of rules the current code of a meeting recording system violates</b-sublabel>
  <b-count-bars>
    <bar k="Participants" w="100%" color="c-none">2 of 2</bar>
    <bar k="People cards" w="75%" color="c-none">3 of 4</bar>
    <bar k="Bug delivery" w="67%" color="c-none">2 of 3</bar>
    <bar k="Meeting goal" w="57%" color="c-light">4 of 7</bar>
    <bar k="Recording" w="50%" color="c-light">2 of 4</bar>
    <bar k="Privacy" w="25%" color="c-work">1 of 4</bar>
  </b-count-bars>
  <b-why align="left">The bars show what share of rules the current code violates. The longer the bar, the more rules the model caught on real code. "Participants 2 of 2" means both checks found a problem. "Privacy 1 of 4" means the code mostly holds, but one hole exists.</b-why>
  <b-why align="left">This is not a quality grade for the code. A bar depends on which rules were chosen, and shows more where the model brought the most benefit.</b-why>
  <b-art names="quint-models-find-races/mutant" wide/>
  <b-cap>A broken copy of the model must trip the rule. If it passes through and nothing fires, the rule checks nothing.</b-cap>
  <b-sublabel top="22">An automatic check after every model edit</b-sublabel>
  <b-art names="quint-models-find-races/hook" wide/>
  <b-cap>After every model edit a check runs automatically. If a rule is violated, the agent gets the chain of steps and fixes the model or the code at once.</b-cap>
  <b-rules cols="2">
    <rule icon="file-check" t="A header as a contract">Which rules, what must fail, which situations must occur</rule>
    <rule icon="flask" t="A broken copy">A rule the code already satisfies must fail on a copy with one defect</rule>
    <rule icon="eye" t="Situations that must occur">"If A then B" means nothing until A has happened</rule>
    <rule icon="ban" t="Dead ends">The program silently drops dead-end runs and prints "ok"</rule>
    <rule icon="eye-wide" t="Intent kept apart">What the user wanted is recorded independently of the field under test</rule>
    <rule icon="refresh-cw" t="Automatic check">A violation goes back to the agent right after the edit</rule>
  </b-rules>
  <b-why align="left">What each row means. "A header as a contract" means the top of the file lists the rules, the expected violations and the situations that must occur. "A broken copy" checks that a rule is able to fire at all. "Situations that must occur" guards against "if A then B" rules where A never happened. "Dead ends" are cases where the program silently drops a run and "ok" comes out by itself.</b-why>
  <b-why align="left">The last two rows concern people and agents. "Intent kept apart" means the person's wish is recorded in the model independently of the field under test, otherwise the rule compares a field with itself. "Automatic check" (in effect a [hook](/materials/glossary/hooks/)) means an agent cannot forget to run the model: it runs by itself after every edit.</b-why>
  <b-finding>
    <ex>A green model without these checks proves nothing: a rule can hold because the needed situation never arises.</ex>
    <gen>By default the program answers "ok" for a sample, not for a proof<b-proof href="https://apalache-mc.org/" quote="Apalache: the symbolic model checker for TLA+"/>.</gen>
    <do>For every rule that is green right away, write a defect that breaks it.</do>
  </b-finding>
</b-chapter>

<b-chapter id="human" icon="users" title="Where humans step in">
  <b-why align="left">A model checks whatever can be written as a finite list of conditions: whether a recording vanished, whether participants got mixed, whether there is a way out of a dead end. Clear labels, convenience and the overall feel of a screen cannot be described that way, so a person judges them on a mockup.</b-why>
  <b-art names="quint-models-find-races/boundary" wide/>
  <b-two-lists>
    <list icon="cpu" t="The model checks" items="whether a recording vanished|whether participants got mixed|whether a dangerous action asks for confirmation|whether there is a way out of a dead end"></list>
    <list icon="user" t="A person checks" items="whether labels are clear|whether the panel is overloaded|whether picking is convenient|whether the extension installs on a clean profile"></list>
  </b-two-lists>
  <b-why align="left">The list on the left holds everything that can be phrased as "always" or "never": a recording does not vanish, participants do not mix, a dangerous action asks for confirmation. The model checks such rules completely.</b-why>
  <b-why align="left">The list on the right holds things with no finite list of features. Whether a label is clear is decided by the reader. So in the requirements table "needs a human check" rows are marked in advance and do not try to formalize them.</b-why>
  <b-finding>
    <ex>Screen rules become checkable too: confirmation, a reason on a disabled button, an honest state.</ex>
    <gen>Taste and clarity have no finite list of features, so they are checked on a mockup.</gen>
    <do>Mark "needs a human check" rows in the requirements table up front, so you don't chase a formula.</do>
  </b-finding>
</b-chapter>

<b-chapter id="weak" icon="alert" title="Weak spots of model checking">
  <b-why align="left">The method has limits, and it is better to know them before starting. A model does not follow the code by itself, does not check "eventually", and sees only the world you put into it.</b-why>
  <b-rules cols="2">
    <rule icon="link" t="No link to the code">Models are written by hand, so they drift away from the code</rule>
    <rule icon="clock" t="No 'eventually' checks">That a bug finally reaches the team is checked only indirectly</rule>
    <rule icon="scales" t="A tiny world">A bug that needs five entities can slip through</rule>
    <rule icon="circle-dot" t="Empty greens">A rule holds because the feature isn't in the code yet</rule>
  </b-rules>
  <b-why align="left">No link to the code: a model is written by hand, and nothing forces it to change with the code. A month later it may describe what no longer exists. The remedy: keep in the header the commit the model was taken from and update it with the code. A stronger remedy is to run model traces through the real handler, but that step does not exist yet. A related task, keeping the desired state, the code and the measurement in agreement, is covered in the article on the [reconcile loop for specs](/blog/spec-reconcile-loop/).</b-why>
  <b-why align="left">No "eventually" checks: that a bug finally reaches the team is checked only indirectly. A tiny world: a bug that needs five entities at once can slip through. Empty greens: a rule holds only because the needed feature is not in the code yet, and the green color is misleading.</b-why>
  <b-finding>
    <ex>A model describes only what you put in it, and without checking against the code it falls behind.</ex>
    <gen>The next step in this area is running model traces through the real handler and comparing results.</gen>
    <do>Record the commit a model was taken from in its header and update it together with the code.</do>
  </b-finding>
</b-chapter>

<b-chapter id="start" icon="flag" title="Where to start with Quint: a first model in one evening">
  <b-why align="left">An order for your first evening. Open the list of fixed bugs and choose one whose cause is the order or timing of events. Write out the participants and the actions that led to it. Describe them in a model, run it and wait until the program finds the chain by itself. Then add the fix under a switch and make sure the rule holds. Finally, break the model on purpose and check that the rule notices.</b-why>
  <b-why align="left">There is no need to model the whole product at once. Take one recent bug that had to be fixed twice or that a user found. Describe its participants and two or three actions in a model, run the search, and make sure the program finds that bug without a hint. Then fix it and make sure the rule holds.</b-why>
  <b-finding>
    <ex>You can write the first model in an evening if you take a bug that already happened.</ex>
    <gen>The history of fixed bugs gives a ready list of rules for the next models.</gen>
    <do>Take your last fixed bug and state the rule that would have kept it from coming back.</do>
  </b-finding>
</b-chapter>

<b-chapter id="agent" icon="cpu" title="How to start together with an agent">
  <b-art names="quint-models-find-races/agent" wide/>
  <b-why align="left">**1. Install Quint.** The agent installs it itself through npm<b-proof href="https://github.com/informalsystems/quint" quote="The quickest way to install Quint is using npm."/>.</b-why>
  <b-prompt>
    Install Quint for yourself and make sure it runs.
  </b-prompt>
  <b-why align="left">**2. Requirements first, not code.** That way the [agent](/materials/glossary/ai-agent/) first describes the world and edits code afterwards.</b-why>
  <b-prompt>
    Do not change the code. Make requirements in Quint for [area].
    For each rule show two versions: as it is now and as it should be.
  </b-prompt>
  <b-why align="left">**3. Check the result.**</b-why>
  <b-rules cols="2">
    <rule icon="swap" t="Two versions">The rule is broken "as is" and holds "as required"</rule>
    <rule icon="eye" t="Needed situations">They occur and are not avoided</rule>
    <rule icon="flask" t="A broken copy">It trips the rule</rule>
    <rule icon="bug" t="A real case">The model reproduces it</rule>
  </b-rules>
  <b-why align="left">**4. Logic and screen are separate.** By default an agent mixes them up: it writes screen rules as logic and skips cases in the logic.</b-why>
  <b-prompt>
    Make two lists of requirements.
    1. Logic: only "always" and "never", checked by a Quint model.
    2. Screen: clarity and convenience, which I will check myself on a mockup.
  </b-prompt>
</b-chapter>

<b-chapter id="faq" icon="chat" title="FAQ">
  <b-faq-cards>
    <q t="What is Quint and what is it for?">Quint is a language for describing the states of a system, its actions and the rules that must always hold. A program tries every order of actions and shows the chain of steps where a rule breaks.</q>
    <q t="How do you find race conditions and lost data that tests miss?">Describe the participants and two or three actions in a model and run the search. The model finds orders such as "check, log out, send" that nobody thought to write as a test.</q>
    <q t="Does a Quint model replace ordinary tests?">No, they answer different questions. A test protects one function, while a model checks rules that depend on the order of events; a chain of steps found by the model turns into a short regression test.</q>
    <q t="How do you start with Quint?">Take a recently fixed bug whose cause lies in the order or timing of events. Describe its participants and two or three actions, run the search and check that the program finds the bug by itself.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Further reading">
  <b-links>
    <item href="/blog/quint-vs-tests-and-tla/" k="Comparison" t="Model checking vs testing: Quint, QUnit, TLA+">How Quint differs from QUnit, Jest and TLA+ and what to choose</item>
    <item href="/blog/agents-per-bounded-context/" k="Agents" t="How many AI agents you need">One agent per bounded context</item>
    <item href="/blog/spec-reconcile-loop/" k="Specs" t="A reconcile loop for specs">Closing the loop between desired state, code and measurement</item>
    <item href="/blog/specs-by-aggregates/" k="Specs" t="Specs by aggregates">One entry per concept, requirements with MUST and SHOULD</item>
  <item href="/blog/tla-alloy-quint-compare/" k="Comparison" t="TLA+, Alloy or Quint">Which specification language to choose</item>
  </b-links>
</b-chapter>
<b-footer>Facts: the cases described as of 25 October 2026, Quint and Apalache documentation. The numbers in the examples are illustrative; your code will look different.</b-footer>
</b-post>
