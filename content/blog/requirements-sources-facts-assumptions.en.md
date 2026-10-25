---
title: Requirements and meeting notes with AI: source, assumption, fact — and what follows
date: 2026-10-05
updated: 2026-10-26
description: Requirements with AI: source, assumption, status. Facts come through MCP from Git; the agent makes minor edits, a person decides major ones.
tags: AI, agents, requirements, hallucinations, meeting notes, harness
category: harness
layout: wide
mentions: requirements, meeting notes, hallucinations, sources, assumptions, use cases, change management
toc: what=What to demand | sources=Sources through MCP | format=How to ask | levels=Major and minor | cases=Use cases | first=Where to start | next=Next
---

An agent writes requirements with confidence, and its guesses look like facts. Demand a proof, that is a source link, the model’s assumptions and a “fact or not a fact” status for every item, and connect sources through MCP, best of all from Git. The agent makes minor edits itself, and a person decides major ones. Basis: [MCP for an AI agent](/blog/mcp-agent-access/#facts).

<b-post series="harness">

<b-chapter id="what" icon="shield-check" title="What to demand from the agent">
  <b-why align="left">An agent retells meeting notes and documents smoothly, and the text does not show where a fact ends and a guess begins. This comes from how the model works: it continues text plausibly, and a gap in the data gets filled with a fluent phrase. So every item in requirements and notes needs three things: a proof (a source link with a quote), an assumption (what the agent filled in itself) and a status (fact, not a fact or a question for a person).</b-why>
  <iso-art name="requirements-sources-facts-assumptions/marks"></iso-art>
  <b-why align="left">The picture shows three kinds of marks over the same item. The source answers “where was this taken from”: a link to a file or a quote from a meeting recording with a time. The assumption answers “what did the model fill in here”: for example, the recording says “we pay by card”, says nothing about the currency, and the agent wrote “in rubles”. Such a guess must stand on its own line, apart from the facts. The status answers “can this be relied on”: “fact” if there is a proof, “not a fact” if there is none, and “question” if a person must decide.</b-why>
  <b-table id="marks-example">

| | Without marks | With marks |
|---|---|---|
| Item | “Card payment in rubles” | “Card payment” |
| Source | not given | meeting of 12 Oct, 14:32, “the customer pays by card at checkout” |
| Assumption | hidden in the text: “in rubles” | on its own line: “payment in rubles only” |
| Status | reads as a fact | not a fact: the currency was not discussed at the meeting |
| What the reader does | takes it on trust | checks the assumption or asks a question |

  </b-table>
  <b-rules sw="1.8">
    <rule icon="key" t="Link (proof)">A link to a document or a quote from the meeting record with a timestamp.</rule>
    <rule icon="help" t="Assumption">What the agent filled in on its own is written on a separate line.</rule>
    <rule icon="shield-check" t="Status">Fact, not a fact, or a question for a person.</rule>
  </b-rules>
  <b-why align="left">The rule is simple: no source means the status “not a fact”. That way an item without a proof does not quietly turn into a requirement. A person sees such items as a list and decides what to do with them: find a source, confirm at a meeting or drop it. The marks speed up checking: a quote with a time is checked in seconds, and the assumption line shows where to look for a mistake. Where to get sources is in the next chapter, and what to do when an item changes comes after it.</b-why>
  <b-finding>
    <ex>Every item has a source, a separate line for the guess and a status.</ex>
    <gen>An item without a source gets the status “not a fact”, and a person checks it before relying on it. This continues the idea of the section on [hallucinations in the MCP article](/blog/mcp-agent-access/#facts).</gen>
    <do k="What to do">Add the three marks to your template for requirements and meeting notes.</do>
  </b-finding>
</b-chapter>

<b-chapter id="sources" icon="plug" title="Sources through MCP: Git works best">
  <b-why align="left">The “source” mark works only if the agent takes facts from real systems instead of recalling them. For that the agent is connected to systems through MCP: it opens a file, a meeting recording or a page itself and quotes the right place<b-proof href="https://modelcontextprotocol.io/docs/getting-started/intro" quote="MCP (Model Context Protocol) is an open-source standard for connecting AI applications to external systems."/>. But sources are reliable in different degrees. Git fits best: requirements live as files next to the code, every edit has an author, a date and a reason, and earlier versions are visible in the history. Confluence is fine only if the pages are polished: each has an owner and a check date, and stale ones are archived. Otherwise the agent reads an old page as a fact and produces a hallucination, although the model invented nothing on its own. A separate source is meeting notes: what was agreed, with a link to the recording. But what was agreed and what is in the code can drift apart, so it must be checked against what really sits in Git: meetings and code do get out of sync.</b-why>
  <iso-art name="requirements-sources-facts-assumptions/sources-mcp"></iso-art>
  <b-why align="left">On the right of the picture are three kinds of sources, on the left the result. The agent connects to them through MCP (the wires with plugs), takes facts and writes requirements where every item has a link and a status. Git comes first: it is the main source. Confluence is drawn dashed: it is connected only when the pages are current. Meeting recordings are a separate source: the agent takes what was agreed from them, with a link and a time. What was agreed must be checked against the code in Git: meetings and code do get out of sync.</b-why>
  <b-why align="left">It is convenient to keep sources in a register: one row per source. The table has three columns: the link (where to go), the description (what is there and how fresh it is) and the type (Git, meeting recording, Confluence). In the “Source” line of every requirement the agent puts a link from this register.</b-why>
  <b-table id="sources-registry">

| Link | Description | Type |
|---|---|---|
| git.example.com/shop/requirements/payments.md | The “Card payment” requirement; edit history, authors and reasons are visible in commits | Git: file |
| git.example.com/shop/requirements/tags | Requirement versions: v1.1, v2.0 | Git: tags |
| tldv.io/meeting/12-10 | Recording of the 12 Oct meeting: what was agreed, quotes with times; check against the code, they can drift apart | Agreement: meeting notes |
| confluence.example.com/pay-rules | Payment rules; the page has an owner, checked on 1 Oct | Confluence, current pages only |

  </b-table>
  <b-finding>
    <ex>The agent takes facts through MCP from the source register, and every requirement has a link from it.</ex>
    <gen>Meeting notes show what was agreed, and they must be checked against the code in Git: meetings and code do get out of sync. In Git an edit has an author, a date and a reason, and a requirement version matches a tag, so checking and rolling back are simple. A Confluence page with no owner and no check date goes stale unnoticed, and the agent retells outdated text as a fact.</gen>
    <do k="What to do">Start a register with three columns: link, description, type. Begin with Git, and add a Confluence page only after checking it: there is an owner, a date, and the extras are archived.</do>
  </b-finding>
</b-chapter>

<b-chapter id="format" icon="lines" title="How to ask in notes and requirements">
  <iso-art name="requirements-sources-facts-assumptions/pipeline"></iso-art>
  <b-say-agent title="Tell the agent" plain>Parse the meeting record and write a list of requirements. For every item give the source (a link from the register and a quote with the time), your assumptions on a separate line and a status: fact, not a fact or question. If there is no source, mark it “not a fact”.</b-say-agent>
  <b-why align="left">The prompt asks the agent to split the recording into items, each with three marks. Its last sentence matters: it forbids treating an item as a fact when there is no source. Such a prompt suits a meeting recording, an email, a chat thread and any document.</b-why>
  <b-codebox title="Template of one item">
    Requirement: Card payment
    Source: git.example.com/shop/requirements/payments.md, line 12; meeting of 12 Oct, 14:32, “the customer pays by card at checkout”
    Assumption: payment in one currency only
    Status: fact | not a fact | question
    Confirmed by: —
  </b-codebox>
  <b-why align="left">How to read the template. “Requirement” is the short name of the item. “Source” is a link from the register and a quote with a time: the reviewer finds the place in seconds. “Assumption” is what the source does not say but the agent decided itself (currency, deadline, role). “Status” is “fact” if the source says it outright, “not a fact” for a guess and “question” if a person must decide. “Confirmed by” is filled in by a person: a name and the check date. While it holds a dash, the item is not considered accepted.</b-why>
  <b-codebox title="Example of an agent answer">
    Requirement: Card payment
    Source: meeting of 12 Oct, 14:32, “the customer pays by card at checkout”
    Assumption: payment in rubles only
    Status: not a fact
    Confirmed by: —

    Requirement: Receipt by email
    Source: meeting of 12 Oct, 15:05, “we send the receipt to the customer’s email”
    Assumption: none
    Status: fact
    Confirmed by: —
  </b-codebox>
  <b-why align="left">The first item got the status “not a fact”: the currency was not named at the meeting, so that is the agent’s assumption. The second item was said at the meeting outright, so it is a “fact”. Both items wait for a person to confirm, and the list of “not a fact” items becomes the agenda of the next meeting.</b-why>
  <b-finding>
    <ex>The meeting record becomes requirements where every line is marked.</ex>
    <gen>A quote with a timestamp makes checking take seconds, and the assumptions line shows where the model filled gaps.</gen>
    <do k="What to do">Run one of your meetings through this prompt and compare it with what you remember.</do>
  </b-finding>
</b-chapter>

<b-chapter id="levels" icon="layers" title="Major and minor changes">
  <b-why align="left">When an agent or a person edits a requirement, it matters how serious the edit is. The difference is simple: for a minor edit a proof can be found, for a major edit there is none. A minor edit does not change system behavior: the item works the same, only the confidence in it or the wording changed. It can be checked against a source: find a quote in a meeting recording or see in the Git history that the meaning did not change. So the agent makes minor edits itself. A major edit changes system behavior and there is nothing to confirm it with: the sources do not contain such a decision yet, there is nowhere to take a proof from. So major edits are for a person: the agent prepares the list of affected use cases and a draft, and the requirement owner decides. After approval the decision itself (who, when and why) is recorded in Git and becomes a new source. Version numbers in software work the same way: v1.0 → v1.1 means a small clarification, v1.0 → v2.0 means a change people must be warned about<b-proof href="https://semver.org/" quote="MAJOR version when you make incompatible API changes"/><b-proof href="https://semver.org/" quote="MINOR version when you add functionality in a backward compatible manner"/>.</b-why>
  <iso-art name="requirements-sources-facts-assumptions/versions"></iso-art>
  <b-why align="left">On the left of the picture is the original version, v1.0. In the middle is a minor edit: a small block is added, the meaning is the same, the second number changes (v1.1). On the right is a major edit: a large block is added, behavior changed, the first number changes (v2.0). Under the minor edit the caption says “proof found, the agent does it itself”, under the major one “no proof, a person decides”.</b-why>
  <b-rules sw="1.8">
    <rule icon="eye" t="Guess confirmed">The status becomes “fact”, the text stays: a minor edit.</rule>
    <rule icon="bug" t="Guess refuted">The item’s text changes: a major edit.</rule>
    <rule icon="ban" t="A fact changed">If the new version of the source changes behavior, the edit is major: a proof shows what changed in the source, and whether to want it is for a person to decide.</rule>
    <rule icon="pause" t="Wording">A typo or a clearer wording with the same meaning goes to the change history.</rule>
  </b-rules>
  <b-table id="major-minor">

| Kind of edit | What happened | Proof | What the agent does | What a person does |
|---|---|---|---|---|
| Minor | The guess “payment in rubles only” was confirmed by the meeting recording: the status changes from “not a fact” to “fact” | there is: tldv.io/meeting/12-10, 14:32, “we only pay in rubles” | does it itself: changes the status, adds the link and quote, writes it into the history, version v1.1 | nothing: may skim the history |
| Minor | The wording was clarified: “Card payment” became “Bank card payment” | there is: version comparison in Git, git.example.com/shop/requirements/commit/a1b2c3, words changed, meaning the same | does it itself and writes it into the history | nothing |
| Major | Someone proposed accepting euros too: neither the meeting recordings nor the documents say anything about it | none: the sources hold no such decision, nowhere to take a proof from | prepares: writes what will change, lists the affected use cases and tests, drafts v2.0 | decides: the requirement owner approves or rejects, the decision is recorded in Git |
| Major | Someone proposed confirming a payment with a code from the bank: the requirements do not have it yet | none: no source holds the decision | prepares the same | decides: the requirement owner approves or rejects |

  </b-table>
  <b-why align="left">The proof is the border between the two kinds of edits. If the agent found a quote, a file or a commit that confirms the edit, it is minor and the agent makes it itself. If there is nothing to confirm it, the edit is major: the agent honestly writes “no proof”, prepares the list of affected use cases and hands the decision to a person. With Git this is simple: the agent commits a minor edit itself and files a major one as a merge request that only a person can merge. The owner’s approval in that request later becomes a proof for future edits.</b-why>
  <b-finding>
    <ex>For a minor edit the proof can be found, for a major one there is none.</ex>
    <gen>The agent makes what a source confirms and stops where there is nothing to confirm it. A person is left with exactly the decisions only a person can make.</gen>
    <do k="What to do">Agree who confirms major edits and write it into the template.</do>
  </b-finding>
</b-chapter>

<b-chapter id="cases" icon="git-branch" title="Use cases">
  <b-why align="left">A use case (by definition, a structured description of a system’s behavior as it responds to requests from external actors<b-proof href="https://en.wikipedia.org/wiki/Use_case" quote="structured description of a system’s behavior as it responds to requests from external actors"/>) is one scenario of how people use a requirement. The requirement “Card payment” has three: a normal payment, a bank decline and a repeat payment. They are written out because an edit usually touches one or two scenarios, and those are the ones to recheck. This is the link to the chapter above: a major edit changes behavior, so the agent lists the affected use cases and their tests. A minor edit does not change behavior, and the agent only confirms the use cases stayed as they were. That way a small edit does not mean rechecking the whole requirement.</b-why>
  <iso-art name="requirements-sources-facts-assumptions/use-cases"></iso-art>
  <b-why align="left">The picture shows this with an example. On the left is the requirement “Card payment”. On the right are its three use cases: a normal payment (the customer pays at once), a bank decline (an error and a retry) and a repeat payment (protection from a double charge). The exclamation mark is on the third: say the meeting decided to change the double-charge protection. That is a major edit, and it touches only the repeat payment. The agent lists exactly that use case and its tests, while the normal payment and the bank decline stay as they were.</b-why>
  <b-pills>
    <pill>Case: normal path</pill>
    <pill>Case: error</pill>
    <pill>Case: repeat</pill>
  </b-pills>
  <b-why align="left">An example. At a meeting they decided that a repeat payment within a minute counts as the same order. That is a major edit, and it touches only the “repeat” use case. For it the agent lists the tests to update, for example “a second payment within 30 seconds does not charge twice”. The “normal path” and “error” use cases stay as they were, and their tests run unchanged. If there is no such list, the affected use case is found out by users.</b-why>
  <b-finding>
    <ex>The “Card payment” requirement splits into three cases, and an edit about repeat payment touches only the third.</ex>
    <gen>On a major edit the agent lists the affected cases, and on a minor one it confirms the cases did not change.</gen>
    <do k="What to do">After each edit ask the agent to list the affected cases and their tests.</do>
  </b-finding>
</b-chapter>

<b-chapter id="first" icon="flag" title="Where to start">
  <b-why align="left">Step 1. Source register: start a table of three columns and connect Git through MCP. Step 2. Add the three marks to the item template and send the agent a prompt with one meeting recording. Step 3. Agree on the rule: if an edit has a proof, the agent makes it itself, if it has none, a person decides. In an hour you have one set of notes where every item is marked and a list of “not a fact” items for the next meeting. If there are many, that is fine: the agent has shown for the first time where the guesses used to be.</b-why>
  <b-numchain>
    <step>Source register: Git through MCP</step>
    <step>Three marks into the template and a prompt to the agent</step>
    <step>Rule: proof found, the agent makes the edit; no proof, a person decides</step>
  </b-numchain>
  <b-finding>
    <ex>Three steps: source register, template with a prompt, rule about edits.</ex>
    <gen>Start with one meeting and one document: the result is visible within an hour.</gen>
    <do k="What to do">Today, parse one meeting record with the template.</do>
  </b-finding>
</b-chapter>

<b-chapter id="next" title="Next">
  <b-links>
    <item href="/blog/mcp-agent-access/" k="Source" t="MCP для ИИ-агента: какую проблему решает и как поручить подключение агенту">How the agent takes facts from systems</item>
    <item href="/blog/bug-report-to-reproduction-agent/" k="Example" t="Работа QA после поддержки с ИИ-агентом: исследование, описание и документирование через MCP и скиллы">The agent reproduces a Jira bug</item>
    <item href="/blog/analytics-reports-agent/" k="Reports" t="Аналитические отчёты с ИИ-агентом: данные из базы, таблицы и документы через MCP">The same approach for analytics</item>
  </b-links>
</b-chapter>
<b-footer>The ticket, meeting and links are made up for the example. The template, register and major/minor rules are team practice and can be changed.</b-footer>
</b-post>
