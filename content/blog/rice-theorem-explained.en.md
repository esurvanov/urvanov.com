---
title: Rice's theorem in plain words: why no check works on every program and what to do about it
date: 2026-11-06
updated: 2026-11-08
description: What Rice's theorem says and why checking a program's behaviour runs into the halting problem. Predicates about text and about behaviour, a proof on a payment example, the link to the barber paradox and three frames that make a check exact.
tags: Rice's theorem, halting problem, barber paradox, predicate, formal verification, Quint, DDD, agents
category: specs
layout: wide
math: true
mentions: Rice's theorem, CAP theorem, chaos engineering, fail-fast, Kubernetes, halting problem, barber paradox, Russell's paradox, Alan Turing, predicate, undecidability, declarative approach, imperative approach, model checking, ubiquitous language, bounded context
toc: essence=The point | predicate=Way out 1: code text | small-model=Way out 2: model | human=Way out 3: a person | proof=Proof | root=Where the trick comes from | frames=Three frames | cap=Link to CAP | faq=Questions | next=Read next
---

Rice's theorem says no program can always correctly tell, for any other program, how it will behave, such as whether it will charge money without an order. Any program can embed another, and then the answer depends on whether the embedded one finishes, which no program can decide. So in practice the question is narrowed: check the code text, a small model of the rules, or hand hard cases to a person.

<b-post series="agg">
<b-hchain label="Chain: Russell 1901, Turing 1936, Rice 1951, frame">
  <step icon="help-circle" t="Russell, 1901">is the set a member of itself?</step>
  <step icon="cpu" t="Turing, 1936">will the program halt?</step>
  <step icon="alert-circle" t="Rice, 1951">same for any behaviour</step>
  <step icon="ring-dot" t="Frame">where checking works</step>
</b-hchain>

<b-chapter id="essence" icon="alert-circle" title="The point: what Rice's theorem rules out">
  <b-why align="left">The ban is on one checker for all programs at once: for one specific program an answer can often be found. In its strict form the theorem says that no program can check a property of behaviour that some programs have and others don't<b-proof href="https://en.wikipedia.org/wiki/Rice%27s_theorem" quote="Wikipedia: “Rice's theorem states that all non-trivial semantic properties of programs are undecidable.”"/>. Henry Gordon Rice proved it in his 1951 dissertation<b-proof href="https://en.wikipedia.org/wiki/Rice%27s_theorem" quote="Wikipedia: “The theorem is named after Henry Gordon Rice, who proved it in his doctoral dissertation of 1951 at Syracuse University.”"/>.</b-why>
  <b-why align="left">How to read this in everyday terms. Imagine a checker who is handed any program and asked: “Will it ever charge money without an order?” The checker can be as clever as you like, work as long as you like and know every programming language. The theorem says there is still a program on which it answers wrongly or never answers. This is a property of the task itself, and improving the checker doesn't lift it, just as improving a design doesn't produce a perpetual motion machine. In the diagram below the checker is the blue cube: it looks at programs one by one and answers “keeps it” or “breaks it” for each. The orange program on the right is built against this very check, from its own text: on it the answer is wrong or never comes. Another check has its own such program.</b-why>
  <iso-art name="term:rice-theorem"></iso-art>
  <b-why align="left">Imagine you added an automatic check to the shop. It reads every edit to the payment code and answers: “this edit will never charge money without an order” or “it will”. For such a check to be trusted, it needs three things, numbered in the diagram below.</b-why>

  1. **An answer about behaviour.** The check must say what the code will do when run: whether it charges money on even one of all the purchases that will ever go through it. Those purchases never end, and tests can't try them all.
  2. **One check for any edit.** You can't narrow in advance what code may come: the check works on any code it is given, even code written to fool it.
  3. **An answer for every edit.** Only “will charge” or “won't”, no “don't know”: the check before merging can only let an edit through or block it.

  <b-why align="left">On top of these three the answer must be right: “won't charge” means “definitely won't”. Checks that always answer but are sometimes wrong do exist: tests and heuristics. They are useful, but can't be taken at their word, and from here on only correct checks are discussed.</b-why>

  <b-why align="left">Rice's theorem says: a correct check with all three properties doesn't exist; on some edit it will be wrong or won't answer. In the diagram that is the orange bar. Remove any one property, and a correct check becomes possible, but for a narrowed question. Which one to remove is the choice made in practice: the bottom of the diagram shows three options.</b-why>
  <b-lane title="Three properties of a check" color="accent">
  <b-scene names="rice-theorem-explained/conditions"/>
  <b-pick-tabs id="rice-cond" group="rice-k" tone="accent">
    <tab t="About behaviour">
    </tab>
    <tab t="Any edit">
    </tab>
    <tab t="Always an answer">
    </tab>
  </b-pick-tabs>
  </b-lane>
  <b-table id="rice-wishes">

| <label for="rice-cond1"><b-icon name="play"/> 1. About behaviour</label> | <label for="rice-cond2"><b-icon name="file-text"/> 2. Any edit</label> | <label for="rice-cond3"><b-icon name="help-circle"/> 3. Always an answer</label> |
|---|---|---|
| **Meaning:** what the code will do on all future purchases | **Meaning:** one check for any code, even code written to fool it | **Meaning:** only “yes” or “no”, no “don't know” |
| **What a developer sees:** a reviewer guesses whether the edit might charge money for some order | **What a developer sees:** one linter or one reviewer model for every edit | **What a developer sees:** the check before merging only lets edits through or blocks them |
| **If removed — code text:** a search checks that only the payment module writes to the payments table | **If removed — small model:** payment rules for 3 orders and 2 customers, every variant tried; it checks the rules model, the code is checked separately | **If removed — a person:** on a hard edit the check answers “don't know”, and a developer looks at it |

  </b-table>
  <b-why align="left">Pick a side of the triangle: the two properties at its ends stay, the third drops out. The tabs here and under the properties diagram are linked: the tab number is the property number, and its column in the table above lights up.</b-why>
  <b-lane title="Which property to give up" color="accent">
  <b-scene names="rice-theorem-explained/triangle"/>
  <b-pick-tabs id="rice-tri" group="rice-k" tone="accent">
    <tab t="Code text">
    </tab>
    <tab t="Small model">
    </tab>
    <tab t="A person">
    </tab>
  </b-pick-tabs>
  </b-lane>

  <b-why align="left">**A fourth path, outside the triangle,** is to always answer but sometimes be wrong. Tests and chaos engineering work this way: deliberate failures in production show whether the system holds. It is checking by example and gives no proof for every case.</b-why>
  <b-callout icon="bulb">**A note for those who design with DDD.** In DDD a system is split into bounded contexts, parts with their own vocabulary, such as “Payments”. To keep reasoning simple, take one small model to describe one context: the state of its aggregates, commands as actions and invariants as checks after every step, all on small numbers. The model is fine for reasoning about the borders and size of contexts: if a context's model can't be tried in full even on small numbers, the context is probably too big. It gives no guarantee that the context works. The code can drift from the model, so the code itself is checked separately: with database constraints, tests and code search. A bug that appears only with a thousand orders won't show up in a model with three. And the model says nothing about what wasn't written into it: read models, external systems, time. The size signal is the author's hypothesis; more in [“Where to check an AI agent's work”](/blog/agent-checkpoint/#size).</b-callout>
  <b-finding>
    <ex>An edit arrives with 2,000 lines of payment code. No linter (a program that checks code text against set rules), reviewer model or any other program can guarantee it will never charge money without an order if all three properties are expected at once.</ex>
    <gen>This is a limit of the task itself. As long as the check must answer about behaviour, about any edit and always, with no “don’t know”, on some edit it will be wrong or never answer, however it is improved.</gen>
    <do>For each important rule, pick which of the three properties to give up: check the code text, try a small rules model and check the code against it separately, or hand hard edits to a person.</do>
  </b-finding>
</b-chapter>

<b-chapter id="predicate" icon="list-check" title="Way out 1. Code text: a question about the writing instead of behaviour">
  <b-why align="left">Here property 1, “about behaviour”, is given up: the question of what the code will do is replaced with the question of how it is written. Why that works: questions about code come in two kinds, and the theorem rules out an exact answer for only one of them.</b-why>

  - **How the code is written:** “does the code write to the payments table?”. To answer, reading every line is enough, and there are finitely many.
  - **What the code will do:** “will it ever charge money without an order?”. To answer, you need the outcome of every run with every order, and they never end.

  <b-why align="left">**How this relates to approaches to development:**</b-why>

  - **Imperative code** describes steps, and a rule about the result emerges from them, so it has to be checked against behaviour. That is the bottom row of the diagram.
  - **A declarative notation** states what must hold: a database constraint “no payment without an order”. Its behaviour is visible in the notation itself, so checking the text is exact. That is the top row. Kubernetes works the same way: a file describes the desired state, and the system holds it on its own.
  - **Chaos engineering** checks behaviour in production: failures are deliberately injected into the running system to see whether it holds. It answers the bottom-row question only for the staged failures, not for every run.

  <b-why align="left">Such a yes-or-no question is called a predicate. The diagram asks both questions of the same code: the top row about the text, the bottom about behaviour.</b-why>
  <iso-art name="term:rice-predicate"></iso-art>
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
  <b-why align="left">What “a question about behaviour” means. Such a question depends only on what the program does and not on how it is written. If two programs behave the same on every input, they get the same answer to a question about behaviour. Example: one program sums purchases with a loop, another with a library function. The texts differ, the behaviour is the same, and “can the sum be negative” has one answer for both. But “does the code contain a loop” has different answers, because it is a question about the text.</b-why>
  <b-table>

| Question | About | Decidable? |
|---|---|---|
| does the function have more than 50 lines | text | yes, by counting |
| does the code call `delete` | text | yes, by search |
| is there a write to the orders table outside one module | text | yes, by search, if queries aren't built on the fly |
| will the program finish on every input | behaviour | no, in general |
| can the function ever return a negative sum | behaviour | no, in general |
| will the handler charge money without an order | behaviour | no, in general |

  </b-table>
  <b-finding>
    <ex>“Only the payment module writes to the payments table” is a text question; a code search checks it. “A payment never goes through without an order” is a behaviour question.</ex>
    <gen>A behaviour question can often be replaced with a text question if the code is written so that only one place can break the rule, such as one file that writes to the payments table.</gen>
    <do>Rewrite important rules so they become text questions: a single writer per table, a database constraint, the rule in one place.</do>
  </b-finding>
</b-chapter>

<b-chapter id="small-model" icon="package" title="Way out 2. A small model: try everything, but on small numbers">
  <b-why align="left">Here property 2, “any edit”, is given up. What gets checked is a short description of the payment rules, not the code, and only on small numbers: 3 orders and 2 customers. The variants become finite, and a program tries them all to the end.</b-why>
  <b-art names="rice-theorem-explained/small-model" wide/>

  1. **State:** which orders exist, how many times each was charged, which order each customer has checked.
  2. **Actions:** “create an order”, “check the order is unpaid”, “charge money”.
  3. **Rules:** no payment without an order and no double charge, checked after every step.
  4. **Search:** every order of actions for 3 orders and 2 customers.

  <b-vs-grid>
    <h></h>
    <h><b-icon name="check"/> Catches</h>
    <h><b-icon name="alert-circle"/> Doesn't see</h>
    <c>**Where**</c>
    <c>mistakes in the design of the rules, before any code</c>
    <c>bugs in the code itself: the model doesn't read it</c>
    <c>**Example**</c>
    <c>two customers paying for one order at the same moment</c>
    <c>a failure that shows up only with a thousand orders</c>
  </b-vs-grid>
  <b-why align="left">**Why the search finishes.** The model has finitely many states: each of 3 orders is created or not and charged at most twice, and each of 2 customers holds at most one started payment. Each action moves the model from one state to another. A program visits every reachable state and checks the rule after each step. The theorem's ban doesn't reach here: one specific description in a finite world is checked, while the theorem speaks about any program.</b-why>
  <b-codebox title="A payment model in Quint">
    module payments {
      val ORDERS = Set(1, 2, 3)
      val CLIENTS = Set(1, 2)
      var orders: Set[int]     // created orders
      var paid: int -> int     // order → times charged
      var pending: int -> int  // customer → checked order (0 — none)
      action init = all {
        orders' = Set(), paid' = ORDERS.mapBy(o => 0), pending' = CLIENTS.mapBy(c => 0),
      }
      action createOrder(o: int): bool = all {
        not(orders.contains(o)),
        orders' = orders.union(Set(o)), paid' = paid, pending' = pending,
      }
      // step 1: the order exists and is unpaid
      action check(c: int, o: int): bool = all {
        pending.get(c) == 0, orders.contains(o), paid.get(o) == 0,
        pending' = pending.set(c, o), orders' = orders, paid' = paid,
      }
      // step 2: charge money
      action charge(c: int): bool = all {
        pending.get(c) != 0,
        paid' = paid.setBy(pending.get(c), n => n + 1),
        pending' = pending.set(c, 0), orders' = orders,
      }
      action step = {
        nondet o = ORDERS.oneOf()
        nondet c = CLIENTS.oneOf()
        any { createOrder(o), check(c, o), charge(c) }
      }
      val noPaymentWithoutOrder = ORDERS.forall(o => paid.get(o) > 0 implies orders.contains(o))
      val noDoubleCharge = ORDERS.forall(o => paid.get(o) <= 1)
    }
  </b-codebox>
  <b-codebox title="Trying every order up to 10 steps">
    quint verify payments.qnt --invariant=noDoubleCharge --max-steps=10
  </b-codebox>
  <b-why align="left">In this description the “order is unpaid” check and the charge are two separate steps. The search finds a five-step chain: an order is created, customer 1 checks it, customer 2 checks it, both charge, and one order is charged twice. The fix is to repeat the check inside the charge itself: `paid.get(pending.get(c)) == 0`. After it, the search finds no breach. 10 steps cover the whole model: its longest chain is 10 steps, after which no action is allowed.</b-why>
  <b-why align="left">**Why small numbers are enough.** Most mistakes in rules show up already with two or three objects: two customers and one order, one order and a cancellation halfway. This is an observation, not a guarantee: a bug that needs more objects will slip past such a search.</b-why>
  <b-table>

| Mistake | Visible with 3 orders and 2 customers? |
|---|---|
| two customers pay for one order at the same moment | yes: two customers are enough |
| money charged after the order is cancelled | yes: one order is enough |
| the amount overflows at a million orders | no: needs large numbers |
| the code skips a check that the model has | no: the model doesn't read the code |

  </b-table>
  <b-why align="left">So the small model checks the design, and other means hold the code: a database constraint refuses a payment without an order, and tests compare the code with the model on examples.</b-why>
  <b-why align="left">**The link to bounded contexts.** A model is usually written for one bounded context, such as “Payments”, but the point of this way out is small numbers: they are what make the search finite. More in the DDD note in “The point”.</b-why>
  <b-finding>
    <ex>The search finds a chain: two customers press “pay” at the same moment, both “order not paid yet” checks pass before either charge, and the money is charged twice.</ex>
    <gen>A small model catches design mistakes before the code, but the code is checked separately: with tests, database constraints and code search.</gen>
    <do>For rules about money, write a small model in <a href="/blog/quint-models-find-races/">Quint</a> and run the search before every release.</do>
  </b-finding>
</b-chapter>

<b-chapter id="human" icon="help-circle" title="Way out 3. “Don't know” → a person: an honest third answer">
  <b-why align="left">Here property 3, “always an answer”, is given up. The check looks at any edit, but it has three answers instead of two. The third, “don't know”, means a person looks at the edit.</b-why>
  <b-art names="rice-theorem-explained/human" wide/>
  <b-table>

| Answer | When | What next |
|---|---|---|
| <b-status-dot color="accent">holds</b-status-dot> | payments go only through the payment module | the edit goes through |
| <b-status-dot color="warn">broken</b-status-dot> | a write to the payments table bypassing the module is found | the edit is blocked |
| <b-status-dot color="warn">don't know</b-status-dot> | a database query glued from pieces of text on the fly, a call into someone else's library | a “needs a person” label |

  </b-table>
  <b-why align="left">**Why the third answer lifts the ban.** The theorem's proof builds a program on which the check must say “yes” or “no” and on which either answer is wrong. If “don't know” is allowed, the check answers that on this program, and there is no contradiction. The single price: the check will also say “don't know” on some normal edits.</b-why>
  <b-why align="left">**Why “don't know” beats guessing.** A check can be wrong in two ways: miss a breach or raise a false alarm. “Don't know” deliberately picks the second: better a developer looks at an extra edit than a double charge reaches a customer.</b-why>
  <b-table>

| Hard case | Why the check isn't sure |
|---|---|
| a database query glued from pieces of text | the table name appears only at run time |
| a function called by a name stored in a variable | the text doesn't show which function runs |
| a call into someone else's library without source | you can't see what happens inside |
| code written and run on the fly | there is no text to check until it runs |

  </b-table>
  <b-codebox title="How it looks in the check before merging">
    payments-rule  holds       src/billing/charge.ts
    payments-rule  broken      src/admin/refund.ts:18  write to payments bypassing the module
    payments-rule  don't know  src/reports/export.ts:42  query glued from strings → needs a person
  </b-codebox>
  <b-why align="left">**How to keep “don't know” rare.** Every “don't know” costs a person's time. If there are many, the code is simplified so the check sees more: queries to payments are written whole, without gluing strings, and calls to the payment service stay in one module. That is way out 1: some hard cases turn into questions about the text.</b-why>
  <b-why align="left">**A similar idea: fail-fast.** Fail-fast stops a program at a failure right away, while it runs. “Don't know” stops a doubtful edit even earlier, before merging, and hands it to a person.</b-why>
  <b-finding>
    <ex>An edit glues a database query from pieces of text. The check can't tell which table it writes to, answers “don't know”, and a developer looks at the edit.</ex>
    <gen>“Holds” and “broken” are exact, and the price is a person's time on the third answer.</gen>
    <do>Make “don't know” a separate check status with a “needs a person” label. Silently letting a hard edit through turns it into a mistake.</do>
  </b-finding>
</b-chapter>

<b-chapter id="proof" icon="workflow" title="The proof on one example">
  <iso-art name="term:rice-proof"></iso-art>

  The idea of the proof is a reduction. If one task could be solved, so could another that is already known to be unsolvable. So the first is unsolvable too. Here the first task is checking a behaviour rule and the second is the halting problem.

  Notation: $P$ is any program, $w$ is the data it is run with, $P(w)$ is running $P$ on $w$. The halting problem is the task of telling, for any $P$ and $w$, whether $P(w)$ ever finishes.

  Take any program $P$ with input $w$ and build a new program $Q$ from it:

  $$Q(x) \;=\; \text{run } P(w)\text{; when it finishes, run } B(x)$$

  Here $x$ is the data $Q$ is run with. Step $B(x)$ breaks the rule, while a program that runs forever does not. So $Q$ reaches the breach only if $P(w)$ ever finishes:

  $$Q \text{ breaks the rule} \iff P(w) \text{ halts}$$

  If a check of the rule existed for every program, then given $Q$ it would also answer whether $P(w)$ halts. But Alan Turing, in a 1936 paper (published in 1937), proved that no program answers that question, the halting problem<b-proof href="https://en.wikipedia.org/wiki/Halting_problem" quote="Wikipedia: “Alan Turing proved in 1937 that the halting problem is undecidable.”"/>. So there is no universal rule check either. The rule can be anything: any behavioural property with differing answers fits in place of “money without an order”.

  The same steps in order:

  1. Take any behaviour rule that some programs break and others don't. So some program breaks it. The part of that program which breaks the rule is step $B$.
  2. Take any program $P$ and its input $w$ for which the question is whether $P(w)$ halts.
  3. Glue $Q$ together: first $P(w)$, then $B$. The gluing is a simple mechanical procedure you could write in a minute.
  4. Hand $Q$ to the imagined universal check. Its answer “breaks” means “$P(w)$ halted”, and “doesn't break” means “didn't halt”.
  5. That is a solution to the halting problem, which doesn't exist. So the universal check doesn't exist either.

  One caveat for precision. The construction assumes that a program which runs forever and does nothing doesn't break the rule. If that isn't so for some rule, take the opposite rule: checking it is no easier, and the argument repeats word for word.


  <b-finding>
    <ex>A payment handler works like this: first it calls a discount calculation from someone else's library, then it charges money without checking that an order exists. Whether it breaks the rule depends only on whether the discount calculation finishes: if it hangs forever, the charge is never reached.</ex>
    <gen>To answer exactly from the code, a check would have to decide whether that calculation halts. It is the same scheme: $P(w)$ is the discount calculation, $B$ is the charge without an order.</gen>
    <do>Close such a rule with a frame: a database constraint refuses to record a charge without an order, whatever the code did before it.</do>
  </b-finding>
</b-chapter>

<b-chapter id="root" icon="bulb" title="Where the trick comes from: the halting problem and the barber paradox">
  <b-why align="left">The proof of Rice's theorem reduces the halting problem to a behaviour check: if a behaviour check existed, it would solve the halting problem too. So the check inherits its undecidability. The halting problem in turn is proved with a trick over a hundred years old: a question about itself.</b-why>
  <iso-art name="term:halting-problem/2"></iso-art>
  <b-why align="left">Suppose there is a judge that says, for any program, whether it halts. Write a contrarian program: it asks the judge about itself and does the opposite. If the judge says “halts”, the contrarian loops forever; if it says “won't halt”, the contrarian stops at once. The judge is wrong either way, so it can't exist.</b-why>
  <iso-art name="term:barber-paradox"></iso-art>
  <b-why align="left">The same trick sits in the barber paradox, a vivid version of Russell's 1901 paradox. The villagers split into set $A$, those who shave themselves, and set $B$, those the barber shaves, and everyone is in exactly one. The barber has no place: in $A$ he ends up in $B$, in $B$ he ends up in $A$. Russell has the same about sets: $R$ is the set of all sets that don't contain themselves, that is $R = \{x : x \notin x\}$. Is $R$ a member of itself? If it is, by definition it shouldn't be; if it isn't, it should be: $R \in R \iff R \notin R$.</b-why>
  <b-table>

| Year | Who | What | Trick |
|---|---|---|---|
| 1901 | Bertrand Russell | the set of all sets that don't contain themselves | is it a member of itself? |
| 1936 | Alan Turing | no judge can tell whether any program halts | the contrarian asks about itself |
| 1951 | Henry Gordon Rice | no check of any behavioural property with differing answers | reduce halting to the check, as in the proof above |

  </b-table>
  <b-why align="left">Why a question about itself is so strong. A program is text too, so it can be fed to another program and even to itself. As soon as a checker can speak about any program, it must also speak about a program that asks it about itself and does the opposite. Then any answer it gives is wrong. The same move appears in the barber paradox, Russell's paradox and Gödel's incompleteness theorem (in any consistent system of rules given by a list of axioms and able to describe arithmetic there are statements that can be neither proved nor refuted).</b-why>
</b-chapter>

<b-chapter id="frames" icon="ring-dot" title="What to do: three frames inside which the answer is exact">
  <iso-art name="term:rice-frames"></iso-art>
  <b-why align="left">The theorem bans a correct check from combining the three conditions from the first section: a question **about behaviour**, **any program**, **always an answer** “yes” or “no”. The ban already holds for a single behaviour question. The proof relies on all three: it builds a program $Q$ the check must accept, asks a behaviour question about it, and demands a definite answer. Each way removes one condition, and the proof stops working.</b-why>
  <b-table>

| Way | What is done in practice | Why the answer is exact | What is lost |
|---|---|---|---|
| <b-icon name="package"/> Small world | write a Quint model of booking: 3 rooms, up to 5 bookings, actions “book” and “cancel”. A program tries every sequence of these actions up to a set length and after each step checks the rule “bookings of one room never overlap” | there are finitely many variants, so the search reaches the end and either says “the rule holds” or shows the chain of steps where it broke | an error that appears only with 50 simultaneous bookings won't be seen by a search with 5 |
| <b-icon name="list-check"/> Narrow language | the rule is written as a PostgreSQL constraint, and only the file `booking/repository.ts` may write to the bookings table. On every code edit a search checks that no other file writes to the bookings table | the constraint is one line in the database schema and the database checks it on every write; a file search always finishes and gives an exact answer, as long as queries to the table aren't built on the fly: a linter rule bans that too | the agent can't write bookings from wherever is convenient: even a bulk import of bookings has to go through the same allowed file |
| <b-icon name="help-circle"/> “Don't know” | the check on an edit returns one of three answers: “holds”, “broken”, “can't tell”. The third answer puts a “needs a person” label on the edit | the check doesn't have to solve hard cases, such as a database query built from strings on the fly: there it honestly says “can't tell”, and where it says “holds” or “broken” the answer is exact | a developer spends time on edits labelled “needs a person” |

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
  <b-why align="left">In DDD terms (a way of designing software around the business domain) it looks like this. A bounded context is a part of the system with its own vocabulary. The context “Booking” talks only about rooms, bookings and time: it has no words like “payment” or “notification”. The rule “bookings never overlap” concerns one table, and one aggregate, “Booking”, writes to it; an aggregate is a group of data changed only through itself. So “can the code break the rule” reduces to a text question: does anything other than the aggregate write to that table. What makes the rule checkable is the ban on writing to the table around the aggregate. The context's small vocabulary helps people and the agent understand the code, but has no effect on checkability. The aggregate border is convenient because the ban sits in one place.</b-why>
  <b-finding>
    <ex>The rule “bookings of one room never overlap”: a Quint model tries every command order for 3 rooms, a database constraint forbids overlap, and a text check makes sure only one module writes to the bookings table.</ex>
    <gen>The three frames are usually combined: the small world catches design errors, the narrow language pins the rule in code, and “don't know” shows where a person is needed.</gen>
    <do>For each rule, mark which frame holds it. A rule with no frame is only checked by example tests.</do>
  </b-finding>
</b-chapter>

<b-chapter id="cap" icon="boxes-link" title="The link to the CAP theorem: a common core, different reasons">
  <b-why align="left">The CAP theorem is a well-known ban from distributed systems; the name is made of the first letters of three properties: consistency, availability, partition tolerance. When data lives on several servers and the link between them breaks, the system can't both answer every request and show everyone the same data. It has to choose: wait for the link to return, or answer from its own copy, which may be stale. Eric Brewer stated this in 2000; Seth Gilbert and Nancy Lynch proved it in 2002.</b-why>
  <iso-art name="term:cap-theorem"></iso-art>
  <b-why align="left">**The common core.** In both bans: while an event hasn't happened yet, you can't tell whether it will happen later or never, however long you wait. A server doesn't know whether a neighbour's message is lost or just late. A program check doesn't know whether the program will finish in a billion steps or never. While the waiting time is unbounded, both have exactly two ways out, and only one of them can be chosen: wait or answer now.</b-why>
  <b-art names="rice-theorem-explained/cap-fork" wide/>
  <b-cap>The top of the diagram is a fork between two mutually exclusive ways out. The bottom is bounding the time: for program checks it removes the fork, in a network it removes only the uncertainty.</b-cap>
  <b-why align="left">What the two branches of the fork look like in a network and in a program check:</b-why>
  <b-table>

| Way out | In a network (CAP) | In a program check |
|---|---|---|
| <b-icon name="clock"/> wait | the server waits for the link to return; the data is right, but there is no answer yet, and it may not come for a long time | the check waits for the program to finish, or answers “can't tell”; there is no error, but there may be no answer |
| <b-icon name="zap"/> answer now | the server answers from its own copy; there is an answer, but it may lack a fresh booking from the other server | the check answers from tests or a 1000-step run; there is an answer, but the program could break the rule at step 1001 |

  </b-table>
  <b-why align="left">**Bounding the time: it helps programs, not networks.** If a language or model guarantees every program finishes within a known number of steps, the check runs it to the end and answers exactly. That is how the small world from the previous section works; the price is a language in which an endless loop can't be written. In a network, a bounded delay removes only the uncertainty: if a message takes no longer than 2 seconds, after 2 seconds the server knows for sure the link is down. That brings no fresher data, and the choice remains: refuse to answer or answer from its own copy. The CAP ban still holds.</b-why>
  <b-why align="left">**Different reasons.** A CAP server lacks information: even an infinitely clever server can't learn what happens at its neighbour beyond the broken link. A program check has the information, the whole code is in front of it, but the answer can't be computed from that code. These are different kinds of impossibility, so Rice's theorem and CAP are not the same thing.</b-why>
  <b-why align="left">**How strict this is.** Both halves are established: Rice's theorem and the CAP proof are published. Matching the ways out is the author's observation; there is no single theorem for both cases. Brewer himself later warned that the “two of three” formula (the idea that of three properties you can only have two) oversimplifies<b-proof href="https://www.infoq.com/articles/cap-twelve-years-later-how-the-rules-have-changed/" quote="Eric Brewer: “The «2 of 3» formulation was always misleading”"/>: in reality it is a scale, and the choice arises only during a partition. Checks are the same: what matters is how often a check says “don't know” or is wrong.</b-why>
  <b-finding>
    <ex>An automatic check waits for a test run that has hung. Waiting longer is like a server waiting for the link; cutting off on a timeout and saying “passed” is like a server answering from a stale copy.</ex>
    <gen>Waiting and guessing are the shared ways out for both bans. Bounding the time in advance removes the fork for program checks, while in a network it only turns “wait forever” into “I know the link is down”.</gen>
    <do>Give every automatic check a time limit and decide in advance what exceeding it means: “don't know” handed to a person, or “broken”.</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Frequently asked questions">
  <b-faq-cards>
    <q t="What is Rice's theorem in plain words?">No program can tell, for every program, whether something holds about its behaviour, if some programs have that property and others don't. About the code text you can answer; about the behaviour of any program you can't.</q>
    <q t="How is Rice's theorem related to the halting problem?">Any halting question can be turned into a behaviour question: build a program that breaks the rule only if another program finishes. So a behaviour check is no easier than halting, and no program answers the halting question.</q>
    <q t="So checking programs is pointless?">Only a check for every program is impossible. Inside a frame — a small world, a narrow language or a “don't know” answer — a correct check is possible: that is how Quint model search, database constraints and narrow linter bans such as “only one file writes to this table” work.</q>
    <q t="What does the barber paradox have to do with it?">The halting problem is proved with the same trick as the barber paradox and Russell's paradox: a question about itself. Rice's theorem inherits that trick: its proof reduces halting to a behaviour check.</q>
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
