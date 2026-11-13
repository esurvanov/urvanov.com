---
title: Where to check an AI agent’s work: at the aggregate boundary, because no one can check every program (Rice’s theorem)
date: 2026-11-06
updated: 2026-11-13
description: Why no check can verify any agent code against any rule, which three ways make a check finite, how an aggregate boundary from event storming becomes a checkpoint, how checkability sets the size of a bounded context, and why the first frame must be cheap to move.
tags: AI, agents, DDD, aggregate, bounded context, event storming, Rice's theorem, Quint, model checking
category: specs
layout: wide
math: true
mentions: Rice's theorem, halting problem, Gödel's incompleteness theorems, event storming, aggregate, invariant, bounded context, Quint, model checking, DDD
toc: answer=In short | rice=Rice's theorem | ways=Three frames | gate=Aggregate | size=Context size | agile=First frame | godel=Gödel | faq=Questions | next=Read next
---

Put the check on an AI agent's work at the aggregate boundary: where commands come in, events go out, and the rules that must always hold are written down. The agent writes the code inside that boundary. The reason is Rice's theorem: no check can verify any program against any behavioural rule, so the check is narrowed to a frame where the answer is finite. Below: why, three ways to narrow the check, and how to size a context.

<b-post series="agg">
<b-callout icon="bulb">**These are my reflections.** The article is the author's attempt to understand where to draw the border when working with AI agents and how to cut a system into contexts; Rice's theorem is only a means here, one that helps check a border already drawn. Claims with a source are marked with a ↗ icon next to the text: statements of theorems, definitions, quotes. Everything else is my conclusions and hypotheses: the aggregate border as the place for a check, the context size criterion, the comparison with CAP and with Gödel. Read them as a point of view that still needs checking.</b-callout>

<b-hchain label="Chain: Rice's theorem, frame, aggregate, context size">
  <step icon="alert-circle" t="Rice">can't check all</step>
  <step icon="ring-dot" t="Frame">narrow the check</step>
  <step icon="cube" t="Aggregate">checkpoint</step>
  <step icon="workflow" sw="1.8" t="Context">sized by checkability</step>
</b-hchain>

<b-chapter id="answer" icon="shield-check" title="In short: what a person checks and what the agent does">
  <b-art names="agent-checkpoint/overview" wide/>
  <b-cap>Three zones of work with an agent: where it is free, where the check sits and where a person decides.</b-cap>
  <b-why align="left"><b-icon name="cpu"/> **Inside the aggregate the agent works.** It writes command handlers, database queries, data storage and tests. The agent can rewrite the whole internal structure: split a table in two, change queries, rework the processing. As long as the border holds, a person doesn't need to read every line.</b-why>
  <b-why align="left"><b-icon name="shield-check"/> **The check sits on the aggregate border.** This is where it is written which commands the aggregate accepts, which events it hands to neighbours and which rules always hold. A machine checks this border. A Quint model is a record of the system's rules in a special language, from which a program tries every possible order of commands and looks for one that breaks a rule. Database constraints are rules the database checks on every write, refusing to save anything forbidden. A person reviews only edits to the border itself.</b-why>
  <b-why align="left"><b-icon name="workflow"/> **A person holds the context border.** Which aggregates live together and where word meanings change can't be computed from code: it depends on future changes. So a person sets this frame and moves it based on edit history and plans; more in [“The first frame”](#agile).</b-why>
  <b-finding>
    <ex>The “Meeting room booking” aggregate: the command “Book a room”, the event “BookingCreated”, the rule “bookings of one room never overlap”. How to store and process them is up to the agent.</ex>
    <gen>A person holds a short list of things on the boundary, and a machine can check that list to the end. Everything inside changes freely while the boundary stays intact.</gen>
    <do>For your project, pick one aggregate and write three lines for its boundary: commands, events, rules.</do>
  </b-finding>
</b-chapter>

<b-chapter id="rice" icon="alert-circle" title="Why you can't check all of an agent's code: Rice's theorem">
  <b-why align="left">**The point.** However clever the check of an agent's code, there is code on which it is wrong. Henry Gordon Rice proved this in 1951<b-proof href="https://en.wikipedia.org/wiki/Rice%27s_theorem" quote="Wikipedia: “The theorem is named after Henry Gordon Rice, who proved it in his doctoral dissertation of 1951 at Syracuse University.”"/>.</b-why>

  - **What can't be checked:** a program's behaviour, what it does when it runs. For example, “never charges money without an order”<b-proof href="https://en.wikipedia.org/wiki/Rice%27s_theorem" quote="Wikipedia: “Rice's theorem states that all non-trivial semantic properties of programs are undecidable.”"/>.
  - **The theorem's condition:** some programs have the property and others don't. If all or none have it, the answer is known in advance.
  - **In detail, with the proof:** [“Rice's theorem in plain words”](/blog/rice-theorem-explained/).

  <b-why align="left">**Two kinds of questions about a program.** Mathematicians call a yes-or-no question a predicate. The theorem rules out an exact answer only for the second kind.</b-why>
  <b-vs-grid>
    <h></h>
    <h><b-icon name="file-text"/> How the code is written</h>
    <h><b-icon name="play"/> What the code does when run</h>
    <c>**Example**</c>
    <c>does the code write to the payments table?</c>
    <c>will the program ever charge money without an order?</c>
    <c>**What to examine**</c>
    <c>the code text: it is finite</c>
    <c>every run with every input: infinitely many, some never finish</c>
    <c>**Answer**</c>
    <c>exact, by code search</c>
    <c>impossible in general</c>
  </b-vs-grid>
  <b-why align="left">**A practical move:** rewrite the code so that an important rule becomes a question of the first kind.</b-why>
  <b-art names="agent-checkpoint/rewrite-rule" wide/>
  <b-why align="left">**A similar distinction** exists between the imperative and declarative approaches. Imperative code describes steps, and in general you can't tell the result from them. A simple declarative notation, such as a database constraint, states what the result must be, and the database enforces it.</b-why>
  <iso-art name="term:rice-predicate"></iso-art>
  <b-cap>The code is the same. A question about the text is settled by reading a finite text; a question about behaviour requires going through every run.</b-cap>
  <b-why align="left">Why a question about behaviour cannot be answered for every program is shown step by step in the article [“Rice's theorem in plain words”](/blog/rice-theorem-explained/).</b-why>
  <b-finding>
    <ex>The agent brought 2,000 lines. A check that “this code never creates overlapping bookings” is impossible for arbitrary code in general, however much it is improved.</ex>
    <gen>That leaves a choice: check less than everything, or check inside a frame where the answer is finite. There is no third way, and this holds for checking programs and for human review alike.</gen>
    <do>For a rule you want to check in agent work, ask: in which frame is the answer exact? If there is none, the rule is only checked on examples.</do>
  </b-finding>
</b-chapter>

<b-chapter id="ways" icon="ring-dot" title="Three ways to make a check finite">
  <b-why align="left">Since there is no exact check for every program, the check is limited so that it no longer covers every program. There are three ways to do that: shrink the world being checked, narrow the language the code is written in, or let the check honestly answer “don't know”. The diagram puts all three side by side.</b-why>
  <b-art names="agent-checkpoint/three-ways" wide/>
  <b-cap>Left, trying a small world in full; centre, one write path into the database; right, three answers of the check, the third going to a person.</b-cap>
  <b-why align="left">More, with the proof of why each way lifts the ban, in [“Rice's theorem in plain words”](/blog/rice-theorem-explained/#frames).</b-why>
  <b-subhead>What it looks like in practice: one rule, three checks</b-subhead>
  <b-why align="left">Take the rule “bookings of one room never overlap in time” and an agent writing the booking code. Below, for each way: what exactly is written, what is run and what comes out.</b-why>
  <b-why align="left"><b-icon name="package"/> **Narrow the world: a Quint model.** The rule and the system's actions are written as a short description, without real code. A state is a snapshot of the data at some moment: which bookings exist, for which room, from when to when. The actions are “book” and “cancel”. The rule is one line: for any two bookings of the same room, one ends before the other starts.</b-why>
  <b-codebox title="The rule in a Quint model">
    val noOverlap = bookings.forall(a => bookings.forall(b =>
      a == b or a.room != b.room or a.end <= b.start or b.end <= a.start))
  </b-codebox>
  <b-why align="left">The program then tries every sequence of actions for a small world: 3 rooms, up to 5 bookings. If the rule breaks anywhere, it prints the chain of steps. For example: two clients book room 2 for 10:00–11:00 at the same time, both “is it free” checks pass before either write, and the database ends up with two bookings for the same slot. That chain is the finding: the design error shows up before the agent writes any code. A small world is enough because such errors appear with just two or three bookings.</b-why>
  <b-why align="left"><b-icon name="list-check"/> **Narrow the language: the rule in the database and a single writer.** The rule moves to where the database itself holds it. In PostgreSQL this is one constraint on the bookings table: the database refuses to save a booking whose time overlaps another booking of the same room.</b-why>
  <b-codebox title="A PostgreSQL constraint">
    CREATE EXTENSION IF NOT EXISTS btree_gist;
    ALTER TABLE bookings ADD CONSTRAINT no_overlap
      EXCLUDE USING gist (room_id WITH =, tstzrange(starts_at, ends_at) WITH &&);
  </b-codebox>
  <b-why align="left">The second half is a single writer: only one module may write to the bookings table. This is checked by searching the code text on every agent edit. The command below finds every file that writes to the bookings table except the allowed one; an empty result means “no bypass”.</b-why>
  <b-codebox title="The “single writer” check by code search">
    grep -rl "INSERT INTO bookings" src | grep -v src/booking/repository.ts
  </b-codebox>
  <b-why align="left">The question “can the agent's code create overlapping bookings” has turned into two questions about text: is the constraint in the database schema, and is there no write around it. Both get an exact answer.</b-why>
  <b-why align="left"><b-icon name="help-circle"/> **Allow “don't know”: three verdicts on an agent's edit.** The check on an agent's edit is built from the previous two and returns one of three answers. “Holds”: the Quint model passed, the database constraint is in place, the search found no bypass writes. “Broken”: the search found that the agent added a write to the bookings table from the reports module. “Can't tell”: the agent builds the database query from strings on the fly, and a text search can't tell which table it writes to. Then the edit gets a “needs a person” label and a developer reviews it. The person spends time only on the third case.</b-why>
  <b-why align="left">Each of the three answers is exact only within its limits. The search proves the rule holds in a model with 3 rooms and 5 bookings, not in the production database with thousands of bookings. The code search proves there is no write around the rule, not that the database constraint itself is written correctly. A “holds” answer is exact, but some edits still go to a person. So the ways are used together: the model checks the design before code, the constraint and the search check the code itself, and a person looks at whatever is left with a label.</b-why>
  <b-why align="left">There is also a fourth option, the one most common in practice: always answer, but sometimes be wrong. Example tests and code review by another model work this way. It is an acceptable choice too, but a deliberate one: fine where an error is cheap, not for money and access. A similar fork is known from the CAP theorem about distributed systems: during a partition a server either waits or answers from a stale copy. They share one thing — while an event hasn't happened yet, you can't tell whether it will happen later or never, however long you wait — but the reasons differ; details in [“Rice's theorem in plain words”](/blog/rice-theorem-explained/#cap).</b-why>
  <b-finding>
    <ex>The rule “bookings never overlap”: a Quint model tried every order of commands for 3 rooms, a database constraint forbids overlap, and a linter, a program that checks code text against set rules, makes sure only one module writes to the bookings table.</ex>
    <gen>“Can't tell” is an honest check result. It shows where the frame ends and responsibility is back with a person, and so it sets which risk is accepted.</gen>
    <do>For each rule, mark which of the three ways holds it. A rule with no mark is only checked by example tests.</do>
  </b-finding>
</b-chapter>

<b-chapter id="gate" icon="cube" title="The aggregate as a checkpoint: what event storming gives you">
  <b-why align="left">Event storming is a workshop format where a team lays out the business domain as events<b-proof href="https://www.eventstorming.com/" quote="eventstorming.com: “EventStorming is a flexible workshop format for collaborative exploration of complex business domains.”"/>. Afterwards every aggregate has four things: commands that change it, events it sends, read models used to look at it, and invariants, the rules that hold in every state.</b-why>
  <iso-art name="term:aggregate"></iso-art>
  <b-why align="left">These four things form the boundary where a check fits well. Every change goes through commands, everything neighbours see leaves as events, and the rules live in one place. This is exactly the second way from the previous section: only the aggregate writes to its table, so no other code can break the rule, and only one thing remains to check: that nothing else writes to that table.</b-why>
  <b-art names="agent-checkpoint/gate" wide/>
  <b-cap>The checkpoint sits where commands enter and events leave. Inside the border the agent is free.</b-cap>
  <b-why align="left">The table goes row by row: which of the aggregate's four parts sit on the border and are checked by a machine and a person, and which stay inside and are done by the agent without line-by-line review.</b-why>
  <b-vs-grid>
    <h></h>
    <h>On the boundary (checked)</h>
    <h>Inside (the agent does it)</h>
    <c>**Commands**</c>
    <c>which exist and what they take</c>
    <c>how to handle them</c>
    <c>**Events**</c>
    <c>which leave and with what fields</c>
    <c>when and how to build them</c>
    <c>**Invariants**</c>
    <c>a Quint model, database constraints</c>
    <c>code that doesn't break them</c>
    <c>**Read models**</c>
    <c>what they show</c>
    <c>how to build them fast</c>
  </b-vs-grid>
  <b-finding>
    <ex>The agent moved bookings storage from one table to two. The boundary stayed the same: the same commands and events, the Quint model passes, the database constraint holds. Human review comes down to one question: was the boundary touched?</ex>
    <gen>Once the boundary is written down, checking an agent's change becomes finite: compare the boundary before and after. Code inside can be sampled.</gen>
    <do>Create a boundary file for the aggregate: commands, events, invariants, read models. Any edit to that file calls for human review; edits inside don't.</do>
  </b-finding>
</b-chapter>

<b-chapter id="size" icon="workflow" title="How to size a bounded context: by checkability">
  <b-why align="left">Going from a business domain to bounded contexts is the hardest part of DDD. The usual signs of a border: a word starts to mean something else, the team changes, rules no longer have to hold at the same time.</b-why>
  <b-callout icon="list-check">**A context size criterion.** A context is small enough if a Quint model of its rules can be searched to the end at small numbers and either says “the rule holds” or shows a breach. If the search doesn't finish, the context should be split. The criterion follows from Rice's theorem: an exact answer is possible only where there are finitely many variants and all of them can be tried.</b-callout>
  <b-why align="left">**How to apply the criterion to your project.** Take a part of the system you consider a candidate context, such as “booking”, and check it in five steps.</b-why>

  1. **List the rules and actions.** Rules are what must always hold: “bookings of one room never overlap”. Actions are commands that change data: “book”, “cancel”.
  2. **Write them as a Quint model.** The state is which bookings exist; actions are how they change the state; rules are checks after each step. It's tens of lines, no real code.
  3. **Pick small numbers.** 2–3 objects of each kind: 3 rooms, 5 bookings, 2 clients. Usually that is enough for the typical nasty combinations to appear: two bookings of one room, two clients in the same minute. There is no guarantee: an error that needs more objects will slip by.
  4. **Run the search with a time limit,** say 10 minutes.
  5. **Read the result with the table below.** The search finished with no breaches: the size fits. It finished and showed a breach: the size fits, but the rules or actions have an error to fix. It didn't finish within the limit: there are too many states, and the candidate is split.

  <b-callout icon="alert-circle">**No estimates.** The numbers here are a guide, not measured thresholds. Nobody has measured, for this criterion, how many objects are enough to catch a context's errors or which time limit should count as “too big”. Pick them for your project and record the numbers the model was checked with.</b-callout>

  <b-codebox title="Running the search for the booking model">
    quint verify booking.qnt --invariant=noOverlap --max-steps=10
  </b-codebox>
  <b-why align="left">**How to split if the search didn't finish.** For each rule, write down which data it touches. Rules with no data in common go into different parts: “bookings never overlap” touches only bookings, “an invoice is never paid twice” touches only invoices. Between the parts, leave events such as “BookingCreated”. Then check each part with the same five steps.</b-why>
  <b-art names="agent-checkpoint/size" wide/>
  <b-cap>If a context's model answers “can't tell”, the context is split, and only events remain between the parts.</b-cap>
  <b-why align="left">How to use this sign: write the context's rules as a Quint model, set small numbers and run the search. The result falls into one of the table rows, and the last column says what to do next.</b-why>
  <b-table>

| Sign | Meaning | What to do |
|---|---|---|
| <b-status-dot color="accent">The model passes at small numbers</b-status-dot> | the model was checked to the end, no breaches | keep it |
| <b-status-dot color="warn">The model doesn't finish</b-status-dot> | too many states | split along rules that don't need to hold together |
| <b-status-dot color="warn">A rule can't be written without the outside world</b-status-dot> | the border is in the wrong place | move the outside world past the border and talk to it with events |
| <b-status-dot color="accent">Only events between the parts</b-status-dot> | the parts don't touch each other's data | each part gets its own model and its own agent |

  </b-table>
  <b-finding>
    <ex>Booking, payment and notifications in one model: the search doesn't finish within an hour. Booking alone and payment alone, linked by the “BookingCreated” event: each model passes in seconds.</ex>
    <gen>Context size stops being a matter of taste: if the rules inside can't be checked to the end, the context is too big or its rules are written in too strong a language. More on one agent per context in [how many AI agents you need](/blog/agents-per-bounded-context/).</gen>
    <do>Write a Quint model of your largest context with small numbers. If the search doesn't finish, find rules that don't need to hold together and draw the border between them.</do>
  </b-finding>
</b-chapter>

<b-chapter id="agile" icon="refresh" title="The first frame: why it will be wrong and how to make it cheap">
  <b-callout icon="help-circle">**An open question.** How choosing a frame works is not yet fully clear; this section records a preliminary hypothesis for future articles. The hypothesis: choosing a frame runs into the same common core as the CAP theorem and Rice's theorem — while an event hasn't happened yet, you can't tell whether it will happen later or never, however long you wait; here the event is an edit that would force a change of frame: whether it comes next month or never can't be known in advance. That core is covered in [“The link to the CAP theorem”](/blog/rice-theorem-explained/#cap). There are not yet enough facts or tested examples to support it, so the rest of the section should be read as a sketch that needs checking. It is a direction for further research.</b-callout>
  <b-art names="agent-checkpoint/frame-question" wide/>
  <b-cap>The frame was drawn around bookings and rooms. If an edit about bookings and rooms comes next, the frame fits. If an edit about bookings and invoices comes, it crosses the border and the frame has to move. Which one will come can't be known now: that is the open question.</b-cap>
  <b-why align="left">**What remains to be found out:**</b-why>

  - whether choosing a frame can be stated strictly as a problem of missing information, as was done for CAP, or the resemblance is only verbal;
  - how well the history of past edits predicts future ones: there are no measurements, only observations from individual projects;
  - what length of review cycle for the frame works: the two weeks below are an example, not a tested number;
  - how two questions relate: how big a part should be (Rice's theorem helps here) and where to draw its borders (this needs information about the future).

  <b-why align="left">Choosing a frame runs into a different ban from Rice's theorem. A code check has all the information, the whole code is in front of it, but the answer can't be computed from it. A frame lacks the information itself. A good frame is one where future changes will live, and there is no data about the future in the code or anywhere else. This is exactly the position of the server in the CAP theorem: it doesn't know what happens at its neighbour beyond the broken link, and here nobody knows which edits will come next month.</b-why>
  <b-why align="left">So the ways out are the same as in CAP. Waiting until the future becomes known isn't possible: the work happens now. What remains is to answer now with what is available and be ready to be wrong. “What is available” is two approximations of the future: the history of past edits, which shows what usually changes together, and your plans, which only you know. And the third way out of CAP, bounding the time, turns into agile's short cycles here: set the frame for two weeks, watch how edits live in it, and move it. Since the frame will be wrong anyway, what matters is that moving it is cheap.</b-why>
  <b-why align="left">Rice's theorem still takes part in this section, in a different role. It doesn't help guess the future, but it gives a check of a frame already chosen: if a Quint model of a part's rules can be searched to the end, the part is small enough; if not, it should be split. That sign was covered in the section on context size.</b-why>

  <b-subhead>Where the first parts come from</b-subhead>
  <b-why align="left">You don't need to know the parts in advance: the first cut comes from what already exists, and a person only names the parts and fixes the disputed spots.</b-why>
  <b-table>

| What exists | First cut | Then |
|---|---|---|
| <b-icon name="git-branch"/> Edit history | tables that almost always change in the same commits are glued into one part | check the cut against backlog epics |
| <b-icon name="list-check"/> Data rules, no history | tables mentioned in one rule go into one part | compare with history after the first few dozen commits |
| <b-icon name="sparkle"/> Nothing, cold start | one part per main concept: project, report, epic, access | compare with history after the first few dozen commits and move |

  </b-table>
  <b-why align="left">How gluing by rules works. List the data rules, for example “a closed epic has no open report”, “a token sees only its own projects”. If a rule mentions two tables, they go into one part. The resulting groups are the first cut.</b-why>
  <b-art names="agent-checkpoint/first-cut" wide/>
  <b-cap>The groups of glued tables are the first cut. A table everyone needs becomes a shared core.</b-cap>
  <b-why align="left">Where a rule ties almost everything together, like a report status needed by both epics and the board, that table becomes a shared core with one owner. The other parts reach it only through that owner. Only the core writes to the status table, so neither epics nor the board can break the status rule.</b-why>
  <b-finding>
    <ex>Epics and reports went into one part, tokens and projects into another, and the report status became the core. A month later history showed that project and epic files were edited in the same commits: projects moved over to epics.</ex>
    <gen>A wrong frame is cheap to fix: moving a table to another part is a one-line edit, after which the checks themselves show whether things got better or worse. Since the frame can't be guessed in advance, it is kept easy to move.</gen>
    <do>Ask the agent to check the cut against edit history and the backlog.</do>
  </b-finding>
</b-chapter>

<b-chapter id="godel" icon="bulb" title="Where Gödel fits: only as an analogy">
  <b-why align="left">The link between Gödel's incompleteness theorem and this topic is my own assumption; I haven't found sources that draw it. The reason for it: both Gödel's and Rice's proofs rest on the same trick, a program or formula that talks about itself. But Gödel's first theorem concerns formal systems in which elementary arithmetic can be carried out<b-proof href="https://en.wikipedia.org/wiki/G%C3%B6del%27s_incompleteness_theorems" quote="Wikipedia: “Any consistent formal system F within which a certain amount of elementary arithmetic can be carried out…”"/>, and says nothing about the borders of a business domain. For the argument about checking an agent, the exact result is Rice's theorem.</b-why>
  <b-why align="left">The second theorem is useful as an analogy: such a system cannot demonstrate its own consistency<b-proof href="https://en.wikipedia.org/wiki/G%C3%B6del%27s_incompleteness_theorems" quote="Wikipedia: “The second incompleteness theorem, an extension of the first, shows that no such system can demonstrate its own consistency.”"/>. Translated to agent work: an agent can't confirm on its own that it did the job right; it needs a checker outside its frame. This is an image, with no mathematical conclusion behind it.</b-why>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Frequently asked questions">
  <b-faq-cards>
    <q t="Where should you check an AI agent's work?">At the aggregate boundary: on commands, events and the rules that must always hold. A machine can check that boundary to the end, and the agent writes the code inside it.</q>
    <q t="Why can't all of an agent's code be checked?">Rice's theorem: no program can say, for every piece of code, exactly whether it breaks a behaviour rule. So the check is put inside a frame: a small world, a narrow language or an honest “don't know”. The details are in the article on Rice's theorem.</q>
    <q t="How do you size a bounded context?">Besides shifts in word meaning and team, there is a checkable sign: a model of the context's rules should finish at small numbers. If it doesn't, the context is split along rules that don't need to hold together.</q>
    <q t="How do you pick the first frame without edit history?">Tables mentioned in one data rule go into one part, and if there are no rules yet, start with one part per main concept. After the first few dozen commits, compare the cut with history and move it.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Read next">
  <b-links>
    <item href="/blog/specs-by-aggregates/" k="Specs" t="Specs by aggregate">the aggregate card and requirement levels</item>
    <item href="/blog/agents-per-bounded-context/" k="Agents" t="How many AI agents you need">one agent per bounded context</item>
    <item href="/blog/quint-vs-tests-and-tla/" k="Checks" t="Model checking vs tests">Quint, QUnit and TLA+</item>
    <item href="/blog/quint-models-find-races/" k="Models" t="Finding race conditions">Quint models in practice</item>
    <item href="/blog/rice-theorem-explained/" k="Theory" t="Rice's theorem in plain words">predicate, proof, three frames</item>
  </b-links>
</b-chapter>
<b-footer>Facts: as of 6 November 2026, from Wikipedia (Rice's and Gödel's theorems) and eventstorming.com. The booking example is illustrative.</b-footer>
</b-post>
