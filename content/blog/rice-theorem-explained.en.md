---
title: Rice's theorem in plain words: why no check works on every program and what to do about it
date: 2026-11-06
updated: 2026-11-06
description: What Rice's theorem says and why checking a program's behaviour runs into the halting problem. Predicates about text and about behaviour, a proof on a payment example, the link to the barber paradox and three frames that make a check exact.
tags: Rice's theorem, halting problem, barber paradox, predicate, formal verification, Quint, DDD, agents
category: specs
layout: wide
math: true
mentions: Rice's theorem, CAP theorem, halting problem, barber paradox, Russell's paradox, Alan Turing, predicate, undecidability, declarative approach, imperative approach, model checking, ubiquitous language, bounded context
toc: essence=The point | predicate=Predicate | proof=Proof | root=Where the trick comes from | frames=Three frames | cap=Link to CAP | faq=Questions | next=Read next
---

Rice's theorem in plain words: no program can tell, for every program, whether something holds about its behaviour, such as “never charges money without an order”. About the code text you can answer; about the behaviour of any program you can't. So checks are narrowed by a frame inside which the answer is exact. Below: the predicate, the proof, where the trick comes from, three frames and the link to the CAP theorem.

<b-post series="agg">
<b-hchain label="Chain: Russell 1901, Turing 1936, Rice 1951, frame">
  <step icon="help-circle" t="Russell, 1901">a question about itself</step>
  <step icon="cpu" t="Turing, 1936">halting</step>
  <step icon="alert-circle" t="Rice, 1951">any behaviour</step>
  <step icon="ring-dot" t="Frame">an exact answer</step>
</b-hchain>

<b-chapter id="essence" icon="alert-circle" title="The point: what Rice's theorem rules out">
  <b-why align="left">Rice's theorem says that all non-trivial semantic properties of programs are undecidable<b-proof href="https://en.wikipedia.org/wiki/Rice%27s_theorem" quote="Wikipedia: “Rice's theorem states that all non-trivial semantic properties of programs are undecidable.”"/>. Henry Gordon Rice proved it in his 1951 dissertation<b-proof href="https://en.wikipedia.org/wiki/Rice%27s_theorem" quote="Wikipedia: “The theorem is named after Henry Gordon Rice, who proved it in his doctoral dissertation of 1951 at Syracuse University.”"/>. The whole theorem sits in three words of that statement.</b-why>
  <iso-art name="term:rice-theorem"></iso-art>
  <b-cap>However clever the check, there is a program on which it answers wrongly.</b-cap>
  <b-vs-grid>
    <h></h>
    <h>Meaning</h>
    <h>Example</h>
    <c>**Semantic**</c>
    <c>a property of behaviour, of what the program does when it runs</c>
    <c>“never charges money without an order”, “never writes to someone else's table”</c>
    <c>**Non-trivial**</c>
    <c>some programs have the property, others don't</c>
    <c>one payment program checks the order, another forgot to</c>
    <c>**Undecidable**</c>
    <c>no program answers “yes” or “no” for every program without ever being wrong</c>
    <c>a universal checker for “money without an order” doesn't exist</c>
  </b-vs-grid>
  <b-why align="left">How to read this in everyday terms. Imagine a checker who is handed any program and asked: “Will it ever charge money without an order?” The checker can be as clever as you like, work as long as you like and know every programming language. The theorem says there is still a program on which it answers wrongly or never answers. This is a property of the task itself, and improving the checker doesn't lift it, just as improving a design doesn't produce a perpetual motion machine.</b-why>
  <b-why align="left">It matters what the theorem leaves allowed. The ban covers one combination: “any program” plus “an exact yes or no” plus “a behavioural property”. Remove any one part and checking becomes possible again.</b-why>
  <b-table>

| What changes | What you get | Example |
|---|---|---|
| <b-icon name="file-text"/> one specific program instead of any | its property can be proved by hand or by machine | a correctness proof of a sorting algorithm |
| <b-icon name="help-circle"/> allow “don't know” | the check honestly declines on hard cases | a code analyser that flags a doubtful spot |
| <b-icon name="list-check"/> a text question instead of behaviour | the answer comes from reading the code | “are there no direct queries to someone else's table” |
| <b-icon name="package"/> a small world instead of an infinite one | every state up to given numbers is tried | a Quint model for 3 rooms and 5 bookings |

  </b-table>
  <b-finding>
    <ex>An agent brought 2,000 lines of payment code. No linter, review or other model can guarantee for arbitrary code that it never charges money without an order.</ex>
    <gen>This limit is mathematical. Improving the check doesn't lift it as long as the check must work for every program.</gen>
    <do>For each rule you want to check, first ask: is it about the code text or about behaviour?</do>
  </b-finding>
</b-chapter>

<b-chapter id="predicate" icon="list-check" title="Predicate: a question about the text or about behaviour">
  <b-why align="left">A predicate is a yes-or-no question about a program. There are two kinds, and Rice's theorem concerns only the second.</b-why>
  <iso-art name="term:rice-predicate"></iso-art>
  <b-cap>The code is the same. The difference is what you must look at to answer: a finite text or an infinite number of runs.</b-cap>
  <b-vs-grid>
    <h></h>
    <h><b-icon name="file-text"/> How it is written</h>
    <h><b-icon name="play"/> What comes out</h>
    <c>**Question**</c>
    <c>does the code write to the payments table?</c>
    <c>will the program ever charge money without an order?</c>
    <c>**What to examine**</c>
    <c>lines of code; finitely many, all can be read</c>
    <c>every run with every input; infinitely many, some never end</c>
    <c>**Answer**</c>
    <c>always available</c>
    <c>in general, none</c>
  </b-vs-grid>
  <b-why align="left">Why the word “semantic” is key here. A semantic property depends only on what the program does and not on how it is written. If two programs behave the same on every input, they get the same answer to a semantic question. Example: one program sums purchases with a loop, another with a library function. The texts differ, the behaviour is the same, and “can the sum be negative” has one answer for both. But “does the code contain a loop” has different answers, because it is a question about the text.</b-why>
  <b-table>

| Question | About | Decidable? |
|---|---|---|
| does the function have more than 50 lines | text | yes, by counting |
| does the code call `delete` | text | yes, by search |
| does only one module write to the orders table | text | yes, by code search |
| will the program finish on every input | behaviour | no, in general |
| can the function ever return a negative sum | behaviour | no, in general |
| will the handler charge money without an order | behaviour | no, in general |

  </b-table>
  <b-why align="left">A close analogy is the imperative and declarative approaches. Code writes down steps, the “how”, while a rule about the result is a statement, the “what”. Rice's theorem says that in general you can't mechanically derive from the steps whether the statement about the result holds. A caveat: in a powerful declarative language behaviour can't be checked from the text either. Exact answers come from poor notations such as a database constraint, whose behaviour is visible in the notation itself.</b-why>
  <b-finding>
    <ex>“Only the payment module writes to the payments table” is a text question; a code search checks it. “A payment never goes through without an order” is a behaviour question.</ex>
    <gen>A behaviour question can often be replaced with a text question if the code is written so that only one place can break the rule, such as one file that writes to the payments table.</gen>
    <do>Rewrite important rules so they become text questions: a single writer per table, a database constraint, the rule in one place.</do>
  </b-finding>
</b-chapter>

<b-chapter id="proof" icon="workflow" title="The proof on one example">
  <iso-art name="term:rice-proof"></iso-art>
  <b-cap>Checking the rule for $Q$ would tell whether $P(w)$ halts, and no program answers that.</b-cap>

  The idea of the proof is a reduction. If one task could be solved, so could another that is already known to be unsolvable. So the first is unsolvable too. Here the first task is checking a behaviour rule and the second is the halting problem.

  Take any program $P$ with input $w$ and build a new program $Q$ from it:

  $$Q(x) \;=\; \text{run } P(w)\text{; when it finishes, run } B(x)$$

  Step $B(x)$ breaks the rule, while a program that runs forever does not. So $Q$ reaches the breach only if $P(w)$ ever finishes:

  $$Q \text{ breaks the rule} \iff P(w) \text{ halts}$$

  If a check of the rule existed for every program, then given $Q$ it would also answer whether $P(w)$ halts. But Alan Turing proved that no program answers that question, the halting problem<b-proof href="https://en.wikipedia.org/wiki/Halting_problem" quote="Wikipedia: “Alan Turing proved in 1937 that the halting problem is undecidable.”"/>. So there is no universal rule check either. The rule can be anything: any non-trivial behavioural property fits in place of “money without an order”.

  The same steps in order:

  1. Take any non-trivial behaviour rule. Since it is non-trivial, some program breaks it. The part of that program which breaks the rule is step $B$.
  2. Take any program $P$ and its input $w$ for which the question is whether $P(w)$ halts.
  3. Glue $Q$ together: first $P(w)$, then $B$. The gluing is a simple mechanical procedure you could write in a minute.
  4. Hand $Q$ to the imagined universal check. Its answer “breaks” means “$P(w)$ halted”, and “doesn't break” means “didn't halt”.
  5. That is a solution to the halting problem, which doesn't exist. So the universal check doesn't exist either.

  One caveat for precision. The construction assumes that a program which runs forever and does nothing doesn't break the rule. If that isn't so for some rule, take the opposite rule: checking it is no easier, and the argument repeats word for word.


  <b-finding>
    <ex>An agent wrote a payment handler: first it calls a discount calculation from someone else's library, then it charges money without checking that an order exists. Whether it breaks the rule depends only on whether the discount calculation finishes: if it hangs forever, the charge is never reached.</ex>
    <gen>To answer exactly from the code, a check would have to decide whether that calculation halts. It is the same scheme: $P(w)$ is the discount calculation, $B$ is the charge without an order.</gen>
    <do>Close such a rule with a frame: a database constraint refuses to record a charge without an order, whatever the code did before it.</do>
  </b-finding>
</b-chapter>

<b-chapter id="root" icon="bulb" title="Where the trick comes from: the halting problem and the barber paradox">
  <b-why align="left">Rice's theorem reduces any behaviour check to the halting problem and so inherits its undecidability. The halting problem in turn is proved with a trick over a hundred years old: a question about itself.</b-why>
  <iso-art name="term:halting-problem/2"></iso-art>
  <b-cap>The contrarian asks the judge about itself and does the opposite, so the judge is wrong whatever it says.</b-cap>
  <b-why align="left">Suppose there is a judge that says, for any program, whether it halts. Write a contrarian program: it asks the judge about itself and does the opposite. If the judge says “halts”, the contrarian loops forever; if it says “won't halt”, the contrarian stops at once. The judge is wrong either way, so it can't exist.</b-why>
  <iso-art name="term:barber-paradox"></iso-art>
  <b-cap>The barber shaves everyone who doesn't shave themselves. He himself fits into neither of the two sets.</b-cap>
  <b-why align="left">The same trick sits in the barber paradox, a vivid version of Russell's 1901 paradox. The villagers split into set $A$, those who shave themselves, and set $B$, those the barber shaves, and everyone is in exactly one. The barber has no place: in $A$ he ends up in $B$, in $B$ he ends up in $A$. Russell has the same about sets: $R = \{x : x \notin x\}$, and $R \in R \iff R \notin R$.</b-why>
  <b-table>

| Year | Who | What | Trick |
|---|---|---|---|
| 1901 | Bertrand Russell | the set of all sets that don't contain themselves | a question about itself |
| 1936 | Alan Turing | no judge can tell whether any program halts | the contrarian asks about itself |
| 1951 | Henry Gordon Rice | no check of any non-trivial behavioural property | reduction to halting |

  </b-table>
  <b-why align="left">Why a question about itself is so strong. A program is text too, so it can be fed to another program and even to itself. As soon as a checker can speak about any program, it must also speak about a program that asks it about itself and does the opposite. Then any answer it gives is wrong. The same move appears in the barber paradox, Russell's paradox and Gödel's incompleteness theorem.</b-why>
</b-chapter>

<b-chapter id="frames" icon="ring-dot" title="What to do: three frames inside which the answer is exact">
  <iso-art name="term:rice-frames"></iso-art>
  <b-cap>The theorem rules out a check for every program. For programs inside a frame a check is possible.</b-cap>
  <b-why align="left">The theorem bans one combination of three conditions at once: the check must work for **any program**, on **any behaviour question**, and answer **exactly “yes” or “no”**. The proof relies on all three: it builds a program $Q$ the check must accept, asks a behaviour question about it, and demands a definite answer. Each way removes one condition, and the proof stops working.</b-why>
  <b-table>

| Way | What is done in practice | Why the answer is exact | What is lost |
|---|---|---|---|
| <b-icon name="package"/> Small world | write a Quint model of booking: 3 rooms, up to 5 bookings, actions “book” and “cancel”. A program tries every sequence of these actions and after each step checks the rule “bookings of one room never overlap” | there are finitely many variants, so the search reaches the end and either says “the rule holds” or shows the chain of steps where it broke | an error that appears only with 50 simultaneous bookings won't be seen by a search with 5 |
| <b-icon name="list-check"/> Narrow language | the rule is written as a PostgreSQL constraint, and only the file `booking/repository.ts` may write to the bookings table. On every agent edit a search checks that no other file writes to the bookings table | the constraint is one line in the database schema and the database checks it on every write; a file search always finishes and gives an exact answer | the agent can't write bookings from wherever is convenient: even a bulk import of bookings has to go through the same allowed file |
| <b-icon name="help-circle"/> “Don't know” | the check on an agent's edit returns one of three answers: “holds”, “broken”, “can't tell”. The third answer puts a “needs a person” label on the edit | the check doesn't have to solve hard cases, such as a database query built from strings on the fly: there it honestly says “can't tell”, and where it says “holds” or “broken” the answer is exact | a developer spends time on edits labelled “needs a person” |

  </b-table>
  <b-why align="left">Each of the three answers is exact only within its limits. The search proves the rule holds in a model with 3 rooms and 5 bookings, not in the production database with thousands of bookings. The code search proves there is no write around the rule, not that the database constraint itself is written correctly. A “holds” answer is exact, but some edits still go to a person. So the ways are used together: the model checks the design before code, the constraint and the search check the code itself, and a person looks at whatever is left with a label.</b-why>
  <b-why align="left">Any check that works inside a frame makes errors of two kinds. It helps to decide in advance which one you can live with.</b-why>
  <b-table>

| Check error | What happened | When it is tolerable | Booking example |
|---|---|---|---|
| <b-status-dot color="warn">a miss</b-status-dot> | the check said “all fine”, but the rule is broken | when a breach is easy to notice and cheap to fix | tests checked booking by one client, while two clients simultaneously got room 2 at 10:00 |
| <b-status-dot color="accent">a false alarm</b-status-dot> | the check said “broken” or “can't tell”, but the rule holds | when a miss is costly: money, access, personal data | the search found a write to the bookings table in a data migration file that doesn't break the rule, and the edit was held until a person looked |

  </b-table>
  <b-why align="left">For rules about money and access, choose checks that raise false alarms but never miss a breach: a database constraint, type checking, a single writer per table. A developer clears an extra label in a few minutes, while a missed double charge comes back as a customer complaint and a refund.</b-why>
  <b-why align="left">In DDD terms it looks like this. The bounded context “Booking” talks only about rooms, bookings and time: it has no words like “payment” or “notification”. The rule “bookings never overlap” concerns one table, and one aggregate, “Booking”, writes to it. So “can the code break the rule” reduces to a text question: does anything other than the aggregate write to that table. That is the narrow language: the context's vocabulary is small, each word has one meaning, and the rule is checked by search. That is why the aggregate border is a convenient place for a check.</b-why>
  <b-finding>
    <ex>The rule “bookings of one room never overlap”: a Quint model tries every command order for 3 rooms, a database constraint forbids overlap, and a text check makes sure only one module writes to the bookings table.</ex>
    <gen>The three frames are usually combined: the small world catches design errors, the narrow language pins the rule in code, and “don't know” shows where a person is needed.</gen>
    <do>For each rule, mark which frame holds it. A rule with no frame is only checked by example tests.</do>
  </b-finding>
</b-chapter>

<b-chapter id="cap" icon="boxes-link" title="The link to the CAP theorem: a common core, different reasons">
  <b-why align="left">The CAP theorem is a well-known ban from distributed systems. When data lives on several servers and the link between them breaks, the system can't both answer every request and show everyone the same data. It has to choose: wait for the link to return, or answer from its own copy, which may be stale. Eric Brewer stated this in 2000; Seth Gilbert and Nancy Lynch proved it in 2002.</b-why>
  <iso-art name="term:cap-theorem"></iso-art>
  <b-why align="left">**The common core.** In both bans: while an event hasn't happened yet, you can't tell whether it will happen later or never, however long you wait. A server doesn't know whether a neighbour's message is lost or just late. A program check doesn't know whether the program will finish in a billion steps or never. While the waiting time is unbounded, both have exactly two ways out, and only one of them can be chosen: wait or answer now.</b-why>
  <b-art names="rice-theorem-explained/cap-fork" wide/>
  <b-cap>The top of the diagram is a fork between two mutually exclusive ways out. The bottom is a third path: it changes the condition that created the fork.</b-cap>
  <b-why align="left">What the two branches of the fork look like in a network and in a program check:</b-why>
  <b-table>

| Way out | In a network (CAP) | In a program check |
|---|---|---|
| <b-icon name="clock"/> wait | the server waits for the link to return; the data is right, but there is no answer yet, and it may not come for a long time | the check waits for the program to finish, or answers “can't tell”; there is no error, but there may be no answer |
| <b-icon name="zap"/> answer now | the server answers from its own copy; there is an answer, but it may lack a fresh booking from the other server | the check answers from tests or a 1000-step run; there is an answer, but the program could break the rule at step 1001 |

  </b-table>
  <b-why align="left">**The third path: bound the time.** It removes the fork itself. If a message in the network is known to take no longer than 2 seconds, the server waits 2 seconds and then knows for sure: the message is lost. The answer both comes and is right. Programs are the same: if a language or model guarantees every program finishes within a known number of steps, the check runs it to the end and answers exactly. That is how the small world and the narrow language from the previous section work. The price is that the bound must be ensured in advance: a network with a guaranteed delay and a language in which an endless loop can't be written.</b-why>
  <b-why align="left">**Different reasons.** A CAP server lacks information: even an infinitely clever server can't learn what happens at its neighbour beyond the broken link. A program check has the information, the whole code is in front of it, but the answer can't be computed from that code. These are different kinds of impossibility, so Rice's theorem and CAP are not the same thing.</b-why>
  <b-why align="left">**How strict this is.** Both halves are established: Rice's theorem and the CAP proof are published. Matching the ways out is the author's observation; there is no single theorem for both cases. Brewer himself later warned that the “two of three” formula oversimplifies<b-proof href="https://www.infoq.com/articles/cap-twelve-years-later-how-the-rules-have-changed/" quote="Eric Brewer: “The «2 of 3» formulation was always misleading”"/>: in reality it is a scale, and the choice arises only during a partition. Checks are the same: what matters is how often a check says “don't know” or is wrong.</b-why>
  <b-finding>
    <ex>A checking agent waits for a test run that has hung. Waiting longer is like a server waiting for the link; cutting off on a timeout and saying “passed” is like a server answering from a stale copy.</ex>
    <gen>Waiting and guessing are the shared ways out for both bans, and the reliable way out in both cases is the same: bound the time in advance.</gen>
    <do>Give every automatic check a time limit and decide in advance what exceeding it means: “don't know” handed to a person, or “broken”.</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Frequently asked questions">
  <b-faq-cards>
    <q t="What is Rice's theorem in plain words?">No program can tell, for every program, whether something holds about its behaviour, if some programs have that property and others don't. About the code text you can answer; about the behaviour of any program you can't.</q>
    <q t="How is Rice's theorem related to the halting problem?">Any behaviour check can be turned into a question of whether a program halts: build a program that breaks the rule only if another program finishes. No program answers the halting question, so there is no behaviour check either.</q>
    <q t="So checking programs is pointless?">Only a check for every program is impossible. Inside a frame — a small world, a narrow language or a “don't know” answer — the check is exact, and that is how Quint, database constraints and linters work.</q>
    <q t="What does the barber paradox have to do with it?">The halting problem is proved with the same trick as the barber paradox and Russell's paradox: a question about itself. Rice's theorem inherits that trick by reducing to halting.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Read next">
  <b-links>
    <item href="/blog/agent-checkpoint/" k="Agents" t="Where to check an AI agent's work">the aggregate border as a checkpoint</item>
    <item href="/blog/quint-vs-tests-and-tla/" k="Checks" t="Model checking vs tests">Quint, QUnit and TLA+</item>
    <item href="/blog/specs-by-aggregates/" k="Specs" t="Specs by aggregate">rules in the aggregate card</item>
    <item href="/blog/quint-models-find-races/" k="Models" t="Finding race conditions">Quint models in practice</item>
  </b-links>
</b-chapter>
<b-footer>Facts: as of 6 November 2026, from Wikipedia (Rice's theorem, halting problem, barber paradox). The payment example is illustrative.</b-footer>
</b-post>
