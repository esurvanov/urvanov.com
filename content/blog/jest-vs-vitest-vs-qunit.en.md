---
title: Vitest vs Jest: which to pick for a JavaScript project, and when QUnit is enough
date: 2026-10-25
description: Vitest vs Jest: setup, where tests run, how checks are written. When to pick Vitest on Vite, keep Jest, or use QUnit in the browser. Table and FAQ.
tags: AI, testing, JavaScript, Jest, Vitest, QUnit, Vite, Jest vs Vitest, test automation
category: specs
layout: wide
mentions: Jest, Vitest, QUnit, Vite, Node.js, JavaScript, Jest vs Vitest, automated tests, test framework, snapshots, mocks, code coverage
toc: common=What they share | vite=Jest and Vitest | qunit=QUnit | table=Who has what | choose=What to choose | faq=FAQ | next=Further reading
---

Vitest vs Jest: on a project built with Vite take Vitest, because it reuses the same settings, and if Jest already works, keep it. QUnit is enough when tests must run right in the browser with almost no setup. All three run automated JavaScript tests and differ in where they live and how much setup they need.

This article was born from another one: about [formal models in Quint](/blog/quint-models-find-races/) and formal verification. The names QUnit and Quint are similar and easy to mix up, so I decided to write about test frameworks separately too. How Quint differs from them is covered in the [comparison of Quint with tests and TLA+](/blog/quint-vs-tests-and-tla/).

<b-post series="harness">
<b-art names="jest-vs-vitest-vs-qunit/common" wide/>

<b-chapter id="common" icon="flask" title="What Jest, Vitest and QUnit have in common">
  <b-why align="left">Suppose there is a function that adds two numbers. A test records an expectation: for one and two the answer is three. The framework runs the function, compares the answer with the expected one and reports whether the check passed or failed. A project has hundreds of tests, so they run automatically after every edit: if an edit broke something that worked, a test fails and you see it at once. All three frameworks do exactly this for [JavaScript](/materials/glossary/javascript/) code, that is, they run [automated tests](/materials/glossary/automated-test/).</b-why>
  <b-why align="left">Three words will come up in the descriptions of the frameworks. A **snapshot** is a saved reference of a large result, for example the finished markup of a page, against which a new result is compared. A **mock** is a temporary replacement of real code with a stub, for example of a real email sending, so that the test does not reach outside. **Coverage** is a report of which lines of code a test ran at least once. So the choice between the frameworks rarely decides whether a project has tests. It decides how much has to be set up and where the tests run.</b-why>
  <b-finding>
    <ex>Jest, Vitest and QUnit answer the same question: does a finished function give the right answer for given inputs.</ex>
    <gen>They do not check the rules of a system or the order of events: for that you need models such as [Quint](/materials/glossary/quint/).</gen>
    <do>Write down what you want to check: a function on given inputs or a rule that crosses several functions.</do>
  </b-finding>
</b-chapter>

<b-chapter id="vite" icon="swap" title="Jest or Vitest: how many places to edit for setup">
  <b-art names="jest-vs-vitest-vs-qunit/vite" wide/>
    <b-why align="left">[Jest](/materials/glossary/jest/) aims to work without configuration on most JavaScript projects<b-proof href="https://jestjs.io/" quote="Jest aims to work out of the box, config free, on most JavaScript projects."/>. It understands projects on Babel, TypeScript, React, Angular and Vue. Snapshots and mocks are built in, and code coverage is switched on with one flag, `--coverage`, with no extra setup. It runs tests in parallel, each in its own process so they do not affect each other, and puts the ones that failed last time first<b-proof href="https://jestjs.io/" quote="Jest runs previously failed tests first"/>. The style of checks is familiar: `test` describes a case, `expect` compares the answer.</b-why>
  <b-why align="left">[Vitest](/materials/glossary/vitest/) does almost the same but is built on the [Vite](/materials/glossary/vite/) bundler<b-proof href="https://vitest.dev/guide/" quote="a next generation testing framework powered by Vite"/>. If the site is already built with Vite, Vitest takes the same settings and plugins, while Jest would need a second, separate configuration. The Vitest authors call this duplication of complexity<b-proof href="https://vitest.dev/guide/comparisons" quote="two different pipelines to configure and maintain"/>. Compatibility with Jest is high: Vitest supports most of the Jest interface and its libraries<b-proof href="https://vitest.dev/guide/comparisons" quote="compatibility with most of the Jest API and ecosystem libraries"/>, so in most projects it fits as a replacement.</b-why>
  <b-why align="left">Vitest also has a fast watch mode: when a file is edited, tests rerun instantly, on the same hot module replacement as in Vite itself<b-proof href="https://vitest.dev/guide/comparisons" quote="default watch mode using Vite instant Hot Module Reload"/>. The documentation also lists a mode that runs tests in a real browser and a web interface with results. It has one price: it needs fairly recent Vite and [Node.js](/materials/glossary/node-js/), and the documentation today names Vite 6.4 and Node 22.12<b-proof href="https://vitest.dev/guide/" quote="Vitest requires Vite >=v6.4.0 and Node >=v22.12.0"/>.</b-why>
  <b-finding>
    <ex>On a Vite project Vitest saves a second configuration, while on a project without Vite the difference from Jest is small.</ex>
    <gen>If Jest already works and bothers nobody, moving for the sake of moving rarely pays off.</gen>
    <do>See how your site is built. If it is Vite, try Vitest on one module.</do>
  </b-finding>
</b-chapter>

<b-chapter id="qunit" icon="workflow" title="QUnit: when you need tests right in the browser">
  <b-art names="jest-vs-vitest-vs-qunit/qunit-env" wide/>
    <b-why align="left">[QUnit](/materials/glossary/qunit/) describes itself as a powerful, easy-to-use test framework. It needs no configuration for Node.js, and minimal setup is enough for the browser<b-proof href="https://qunitjs.com/" quote="Zero configuration and setup for any Node.js project"/>. It runs wherever there is JavaScript: in browsers, in Node.js, in the SpiderMonkey engine and in a background thread of a page<b-proof href="https://qunitjs.com/" quote="QUnit can run anywhere; web browsers, Node, SpiderMonkey, even in a Web Worker!"/>. Jest and Vitest, unlike it, are most often run in Node.js.</b-why>
  <b-why align="left">Its style is its own. Related tests are grouped with `QUnit.module`, a single test is described with `QUnit.test`, and the answer is compared through `assert`. For tests that touch a page there is a fixture that returns the page to its original state after every test, and a separate check of the order of calls for events and delayed answers. You can extend QUnit to your needs: your own assertions, runners and reports. It also supports old browsers: version 2 works with Internet Explorer 9 and up<b-proof href="https://qunitjs.com/intro/" quote="QUnit supports the following runtime environments"/>.</b-why>
  <b-finding>
    <ex>QUnit is good where tests must run right in the browser and without a build.</ex>
    <gen>For modern projects with a build, where mocks, snapshots and coverage are needed out of the box, Jest or Vitest are more often taken.</gen>
    <do>If tests must open in the browser like an ordinary page, check QUnit first.</do>
  </b-finding>
</b-chapter>

<b-chapter id="table" icon="scales" title="Who has what: Jest, Vitest and QUnit point by point">
<b-table id="jvq">

| | Jest | Vitest | QUnit |
|---|---|---|---|
| **Idea** | the usual framework with a full set: snapshots, mocks, coverage | a next-generation framework built on Vite | a simple framework that runs anywhere |
| **Setup** | its own configuration | the same as Vite’s | almost none |
| **Where it runs** | most often in Node.js | most often in Node.js | browser, Node.js, other environments |
| **How a check is written** | `test` and `expect` | `test` and `expect`, as in Jest | `QUnit.test` and `assert` |
| **When it fits** | Jest is already there and works | the project is built with Vite | tests are needed in the browser without a build |

</b-table>
  <b-why align="left">The table row by row. “Idea” says why the framework appeared. “Setup” shows how much work lies before the first test. “Where it runs” and “How a check is written” matter if you have many ready tests: the style of Jest and Vitest matches, so moving between them is simple, while on QUnit the checks would have to be rewritten.</b-why>
</b-chapter>

<b-chapter id="choose" icon="target" title="What to choose: Jest, Vitest or QUnit">
  <b-art names="jest-vs-vitest-vs-qunit/choose" wide/>
  <b-why align="left">The choice is set by the project. The project is built with Vite: take Vitest, the settings are already there. Jest is already in the project and everything works: keep it. You need checks right in the browser without a build: take QUnit. Moving between Jest and Vitest is usually cheap, so a wrong choice will not be irreversible. If you need to check rules and the order of events rather than functions, see the articles [Quint vs QUnit and TLA+](/blog/quint-vs-tests-and-tla/) and [on Quint models](/blog/quint-models-find-races/).</b-why>
  <b-finding>
    <ex>Three frameworks close one task, and the environment decides: a bundler, a browser or an existing set of tests.</ex>
    <gen>Whatever you choose, tests check the given scenarios, while rules that break in a special order of events are caught by a model.</gen>
    <do>Choose a framework by the project environment and add a check of the tests themselves: [mutation testing](/materials/glossary/mutation-testing/) shows whether the tests notice a defect at all.</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="FAQ">
  <b-faq-cards>
    <q t="Should I choose Jest or Vitest?">On a project built with Vite, take Vitest: it reuses the same settings, so no second configuration is needed. If Jest already works and bothers nobody, moving rarely pays off.</q>
    <q t="How is Vitest different from Jest?">Vitest is built on Vite, supports most of the Jest interface and restarts tests quickly when a file changes. It needs fairly recent Vite and Node.js.</q>
    <q t="When do I need QUnit?">When tests must run right in the browser without a build step. QUnit runs in browsers, in Node.js and in other JavaScript environments, and needs no setup for Node.js.</q>
    <q t="Is it hard to move from Jest to Vitest?">Usually not: both write checks with `test` and `expect`, so moving between them is simple. Moving to QUnit means rewriting the checks.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Further reading">
  <b-links>
    <item href="/blog/quint-vs-tests-and-tla/" k="Comparison" t="Model checking vs testing: Quint, QUnit, TLA+">How Quint differs from QUnit, Jest and TLA+</item>
  <item href="/blog/quint-models-find-races/" k="Models" t="How to find race conditions and lost data">Formal Quint models for rules and the order of events</item>
  <item href="/blog/tla-alloy-quint-compare/" k="Comparison" t="TLA+, Alloy or Quint">Specification languages next to test frameworks</item>
  </b-links>
</b-chapter>
<b-footer>Facts: the official Jest, Vitest and QUnit sites as of 25 October 2026. The choice depends on your project, and general signs are described here.</b-footer>
</b-post>
