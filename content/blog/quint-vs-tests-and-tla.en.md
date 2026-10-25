---
title: How model checking differs from testing: Quint, QUnit and TLA+
date: 2026-10-25
description: A test checks a scenario you thought of, model checking tries every order of actions. What QUnit, Jest, Vitest catch, and what Quint, TLA+, Alloy catch.
tags: AI, specs, Quint, TLA+, Alloy, QUnit, Jest, Vitest, testing, formal verification, Quint vs TLA+
category: specs
layout: wide
mentions: Quint, QUnit, Jest, Vitest, TLA+, Alloy, Apalache, model checking, formal verification, Quint vs QUnit, Quint vs TLA+, test framework
toc: names=Two names | tests=Test engines | tla=TLA+ and Alloy | choose=What to choose | together=Together | faq=FAQ | next=Further reading
---

A test checks a scenario you thought of, while model checking tries every order of actions and finds a rule violation nobody imagined. Test frameworks such as QUnit, Jest and Vitest check finished code on examples. Quint and TLA+ check the rules of a system even before any code exists, including code from an AI agent.

<b-post series="harness">
<b-art names="quint-vs-tests-and-tla/names" wide/>

<b-chapter id="names" icon="swap" title="How Quint differs from QUnit: two similar names">
  <b-why align="left">[QUnit](/materials/glossary/qunit/) is an engine for JavaScript tests, from the same family as [Jest](/materials/glossary/jest/) and [Vitest](/materials/glossary/vitest/). You write a function, then a test with an input and an expected answer, and the engine says whether they match. Quint is a language for describing how a system must behave. The program itself tries all possible moves and looks for those where a rule breaks. The mix-up comes from the name, while in essence these are programs of different classes. A comparison of the test engines themselves is in the article [Jest vs Vitest vs QUnit](/blog/jest-vs-vitest-vs-qunit/).</b-why>
  <b-why align="left">What a QUnit test looks like. It takes a finished function, for example addition, feeds it one and two and compares the answer with three: `assert.equal(add(1, 2), 3)`, an example from the QUnit site<b-proof href="https://qunitjs.com/" quote="A Quick Example"/>. If the answer is right, the test passes. All the test knows about the world is the input and the expected answer that you chose in advance.</b-why>
  <b-why align="left">A Quint model is built differently: there is no function and no answer in it. You describe which states the system can be in, which actions move it from one state to another and which rules must always hold. Quint itself runs such a model, simulates it and checks it before the code ships<b-proof href="https://quint-lang.org/" quote="Write specs you can run, simulate, and verify before shipping code."/>. So it does not matter whether the code is written: it checks the intent, not the implementation.</b-why>
  <b-vs-grid>
    <h></h>
    <h>QUnit (test engine)</h>
    <h>Quint (modeling language)</h>
    <c>**What it is**</c>
    <c>an engine for JavaScript code tests, like Jest and Vitest</c>
    <c>a language for rules, the program itself tries every possible move</c>
    <c>**What it checks**</c>
    <c>that a finished function returns the right answer for given inputs</c>
    <c>that the described system never reaches a forbidden state, even in combinations nobody thought of</c>
    <c>**What it needs**</c>
    <c>written code</c>
    <c>only a description of the rules, the code may not exist</c>
    <c>**Example**</c>
    <c>a test that a date-parsing function returns the right date</c>
    <c>a model that found that a crash mid-recording leaves a recording without a trace</c>
    <c>**What is hard**</c>
    <c>thinking up inputs</c>
    <c>stating the rules so that they reflect reality</c>
  </b-vs-grid>
  <b-why align="left">The table is best read row by row. The row "What it checks" shows the main difference: a test answers "does this function work correctly on this data", a model answers "is a situation that the rules forbid possible at all". A test is limited by what you thought up. A model is limited by what you put into it.</b-why>
  <b-finding>
    <ex>QUnit checks code that is already written, while Quint checks an intent that may not be in the code yet.</ex>
    <gen>So QUnit, Jest and Vitest do not replace Quint, and the other way round: they answer different questions.</gen>
    <do>If someone says "it is the same as Jest", ask what exactly is meant: checking a function or checking rules.</do>
  </b-finding>
</b-chapter>

<b-chapter id="tests" icon="flask" title="Quint or Jest and Vitest: what a test checks and what a model checks">
  <b-art names="quint-vs-tests-and-tla/when" wide/>
    <b-why align="left">A test engine finds an error on the inputs you thought up. If you did not think about two admins at once, no test about them gets written, and the error stays. A model works differently: it builds combinations of steps itself, including ones nobody thought of, and shows the first where a rule broke.</b-why>
  <b-vs-grid>
    <h></h>
    <h>Test engine</h>
    <h>Quint</h>
    <c>**What it finds**</c>
    <c>an error on the inputs you thought up</c>
    <c>an error in a combination of steps nobody thought up</c>
    <c>**When it is needed**</c>
    <c>the code already exists</c>
    <c>the code is not written yet or does not exist at all</c>
    <c>**Weak spot**</c>
    <c>does not see what you did not think of</c>
    <c>a model may not match reality, so it is checked against confirmed facts</c>
  </b-vs-grid>
  <b-why align="left">What a test catches well: an error in the function itself, for example a wrong discount calculation or a wrong date parse. The input is known in advance here, and the test quickly shows what broke. What a test misses: [race conditions](/materials/glossary/race-condition/) and other errors that appear only in a certain order of events. In practical examples this is how an admin login and logout overlapping in time and a crash in the middle of a meeting recording were found. Neither action is wrong on its own, so a test for each of them passes.</b-why>
  <b-why align="left">The weak spot of Quint is that it checks a model, not the code. If the model is described inexactly, it proves something about an imaginary system. So the model is checked against real cases that are already confirmed, and keep an "as is and as required" pair in it. More about this in the [article about the models](/blog/quint-models-find-races/).</b-why>
  <b-finding>
    <ex>A test and a model answer different questions, so "which is better" is the wrong question.</ex>
    <gen>For checking "can two people at once break the order of actions" a test engine is almost useless, and for checking "is the date parsed correctly" a model is excessive.</gen>
    <do>For every rule you want to check, write down what it is about: input data or the order of actions.</do>
  </b-finding>
</b-chapter>

<b-chapter id="tla" icon="scales" title="How Quint differs from TLA+ and Alloy">
  <b-art names="quint-vs-tests-and-tla/notation" wide/>
    <b-why align="left">TLA+ and Alloy are formal languages of the same kind: in them you also describe rules and look for their violations. They are older than Quint and better covered in books. But the notation in TLA+ is mathematical, and a newcomer needs time to read it. Quint was designed as a more accessible notation for the same task: it looks like ordinary code, and engineers without a math background read it. A detailed comparison of all three languages is in the article [TLA+ vs Alloy vs Quint](/blog/tla-alloy-quint-compare/).</b-why>
  <b-art names="quint-vs-tests-and-tla/engine" wide/>
  <b-why align="left">What “the same programs” means. Quint can be checked by two programs: TLC and Apalache<b-proof href="https://quint-lang.org/docs/model-checkers" quote="Quint specifications can be verified by two model checkers: TLC and Apalache"/>. TLC is the very first checking program for TLA+: it goes through states one by one<b-proof href="https://quint-lang.org/docs/model-checkers" quote="TLC is an explicit-state model checker"/>, so for Quint it needs the model translated into TLA+<b-proof href="https://quint-lang.org/docs/model-checkers" quote="can be used for Quint by transpiling Quint specs into TLA+"/>. Such a search is predictable, but the world must be small.</b-why>
  <b-why align="left">[Apalache](/materials/glossary/apalache/) is built into Quint<b-proof href="https://quint-lang.org/docs/model-checkers" quote="Apalache is a symbolic model checker that is integrated with Quint tooling"/>: it translates the model into conditions and asks the [Z3](/materials/glossary/z3/) solver. It can check chains only up to a given length<b-proof href="https://quint-lang.org/docs/model-checkers" quote="Apalache cannot check an arbitrary number of steps"/>, so its “ok” means “no violations within that length”. TLA+ is checked by the same two programs, while Alloy has its own analyzer. Besides checking, Quint has a quick random simulation: it looks for violations by sampling and does not prove that there are none.</b-why>
    <b-vs-grid>
    <h></h>
    <h>Quint</h>
    <h>TLA+ / Alloy</h>
    <c>**Notation**</c>
    <c>looks like ordinary code, engineers read it</c>
    <c>mathematical notation, a higher entry step</c>
    <c>**What checks it**</c>
    <c>TLC or Apalache</c>
    <c>TLA+: the same TLC and Apalache; Alloy: its own analyzer</c>
    <c>**Maturity**</c>
    <c>younger</c>
    <c>older, more examples</c>
  </b-vs-grid>
  <b-why align="left">Each of the three languages rests on its own idea. [TLA+](/materials/glossary/tla-plus/) is built on Leslie Lamport’s thought that the most precise way to describe a system is simple mathematics<b-proof href="https://lamport.azurewebsites.net/tla/tla.html" quote="the best way to describe things precisely is with simple mathematics"/>. [Alloy](/materials/glossary/alloy/) describes evolving structures and a program for exploring them<b-proof href="https://alloytools.org/about.html" quote="a language for describing evolving structures and a tool for exploring them"/>. [Quint](/materials/glossary/quint/) gives the same task in a notation engineers understand: the description can be run, simulated and checked before the code ships<b-proof href="https://quint-lang.org/" quote="Write specs you can run, simulate, and verify before shipping code."/>.</b-why>
  <b-art names="quint-vs-tests-and-tla/maturity" wide/>
  <b-why align="left">Maturity matters when heavy proofs are needed: large systems, strict guarantees for distributed protocols. The first version of the Alloy language appeared in 1997<b-proof href="https://en.wikipedia.org/wiki/Alloy_(specification_language)" quote="The first version of the Alloy language appeared in 1997"/>. TLA+ was created by Leslie Lamport<b-proof href="https://en.wikipedia.org/wiki/TLA%2B" quote="TLA+ is a formal specification language developed by Leslie Lamport"/>, and according to Wikipedia the language dates to 1999. The Apalache checker was started in 2015, and the Quint repository was created in 2021, according to GitHub. So TLA+ has about 27 years of history and Quint about five.</b-why>
  <b-why align="left">Over those years TLA+ gathered books, courses and write-ups of real systems, while Quint has fewer. But the language develops fast: edits were pushed to the project repository on the day before the date of this article<b-proof href="https://github.com/informalsystems/quint" quote="executable specification language with delightful tooling"/>. For product rules like “a private recording never reaches shared storage” depth of proof is needed less often, and readability matters more.</b-why>
  <b-finding>
    <ex>Quint gives the same task and the same class of checks in a more readable notation, at the price of lower maturity.</ex>
    <gen>For product rules this is a reasonable trade, because rules are read and discussed by people without math, and models are easier to write together with an AI agent.</gen>
    <do>If you need heavy proofs, move the model to TLA+: the ideas and rules stay the same.</do>
  </b-finding>
</b-chapter>

<b-chapter id="choose" icon="target" title="What to choose: Quint, tests or TLA+">
  <b-art names="quint-vs-tests-and-tla/choose" wide/>
  <b-rules cols="3">
    <rule icon="flask" t="A finished function">Check that a function returns the right answer for given inputs: a test engine, QUnit, Jest or Vitest</rule>
    <rule icon="workflow" t="Order of actions">Find a combination of steps where a product rule breaks, even if the code does not exist yet: Quint</rule>
    <rule icon="scales" t="Heavy proofs">Strict guarantees for a large distributed system: TLA+, with more experience and examples</rule>
  </b-rules>
  <b-why align="left">The choice is set by the question, not by a favorite program. If the question is "does this function work correctly", take a test. If the question is "can a rule break in some sequence of events", take a model. If you need guarantees at the level of a distributed protocol, take TLA+ and set aside time to learn it.</b-why>
  <b-finding>
    <ex>Three options answer three different questions, and one does not replace another.</ex>
    <gen>For product logic with agents and several participants you most often need both tests and Quint.</gen>
    <do>Write down three questions about your product and put a suitable option against each using the table above.</do>
  </b-finding>
</b-chapter>

<b-chapter id="together" icon="link" title="How they work together">
  <b-why align="left">In practice tests and models stand side by side. A test protects a specific function from breaking under edits. A model protects a rule that crosses several functions and depends on the order of events. When a model finds a chain of steps, a short regression test comes out of it: it fails on the old code and passes on the fixed one.</b-why>
  <b-why align="left">So the model hands the tests what it found, and the tests hold it in the code. A detailed account of the findings, the "as is and as required" pair and the checking of the checks is in the [main article about Quint](/blog/quint-models-find-races/), and the context borders the models are written for are covered in the article about [agents per context](/blog/agents-per-bounded-context/).</b-why>
  <b-finding>
    <ex>A model finds a chain of steps, and a test pins it in the code so the error does not return.</ex>
    <gen>The result is a pair: the model looks for the unknown, the test guards the found.</gen>
    <do>Turn the next chain of steps you find into a short test and put it next to the others.</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="FAQ">
  <b-faq-cards>
    <q t="How is Quint different from QUnit?">QUnit runs tests of finished JavaScript code, while Quint describes the rules of a system and tries the orders of actions itself. The names are similar, but these are programs of different kinds.</q>
    <q t="How is Quint different from TLA+?">They describe the same thing, and only the notation differs: Quint looks like ordinary code, while TLA+ uses mathematical notation. The same programs check both notations, TLC and Apalache.</q>
    <q t="What should I choose: Quint, Jest or TLA+?">If the question is whether a function works correctly, take a test. If it is whether a rule can break in some sequence of events, take Quint; for heavy proofs about a distributed system, people take TLA+.</q>
    <q t="Can Quint be used together with tests?">Yes, they complement each other. A model finds the chain of steps where a rule breaks, and a short test pins it in the code so the error does not come back.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Further reading">
  <b-links>
    <item href="/blog/jest-vs-vitest-vs-qunit/" k="Comparison" t="Vitest vs Jest, and when QUnit is enough">Which JavaScript test framework to choose</item>
    <item href="/blog/tla-alloy-quint-compare/" k="Comparison" t="TLA+ vs Alloy vs Quint">How formal specification languages differ</item>
    <item href="/blog/quint-models-find-races/" k="Models" t="How to find a race condition: a Quint model">Formal models in Quint: findings, model pairs, checking the checks</item>
    <item href="/blog/agents-per-bounded-context/" k="Agents" t="How many AI agents you need">One agent per bounded context</item>
  </b-links>
</b-chapter>
<b-footer>Facts: as of 25 October 2026, Quint, TLA+ and Alloy documentation. The choice depends on the team and the task.</b-footer>
</b-post>
