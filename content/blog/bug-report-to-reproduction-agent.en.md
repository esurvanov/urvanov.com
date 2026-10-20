---
title: QA work after support with an AI agent: investigation, description and documentation via MCP and skills
date: 2026-10-04
description: We optimise one step of the chain: QA after support. An agent reproduces a Jira bug on a test stand via MCP, narrows the path, describes and documents it, a skill makes the steps a repeatable process, QA checks by hand. Support and development do not change.
tags: AI, agents, QA, Jira, MCP, skills, bugs, harness
category: harness
layout: wide
mentions: Jira, AI agent, QA, Model Context Protocol, skills, bug reproduction, sequence diagram, C4 model, human-in-the-loop
toc: route=QA step | stages=Three parts | mcp=MCP | skill=Skill | parallel=In parallel | example=Example | human=What QA keeps | first=How to start | next=Read next
---

A customer bug passes support and reaches QA. This is where investigation, description and documentation are done by hand, so this is the step we optimise. An agent connected to Jira and a test stand via MCP, plus a skill with the steps written down, take the routine over. QA checks the result by hand. Support and development work as before.

<b-post series="harness">
<b-view-toggle/>

<b-chapter id="route" icon="stairs" title="We optimise one step: QA after support">
  <b-view kind="pic">
    <b-art-plain name="bug-report-to-reproduction-agent/qa-step"/>
  </b-view>
  <b-view kind="struct">
    <b-lane title="Before" color="muted">
      <b-qa-route>
        <node icon="user" t="customer">writes</node>
        <node icon="user" t="support">receives</node>
        <node kind="solo" t="QA" chips="investigates|describes|documents" time="QA time per task" bar="doing the tasks">does the work</node>
        <node icon="user" t="developer">fixes</node>
      </b-qa-route>
    </b-lane>
    <b-lane title="After" color="accent" top="12">
      <b-qa-route>
        <node icon="user" t="customer">writes</node>
        <node icon="user" t="support">receives</node>
        <node kind="pair" t="QA" frame="as a pair" tools="monitor:Claude in Chrome|flask:Code, tests, PoC|code:API" n="× N" time="QA time per task" bar="acceptance|managing agents">acceptance</node>
        <node icon="user" t="developer">fixes</node>
      </b-qa-route>
    </b-lane>
    <b-cap>Scale is illustrative, not a measurement.</b-cap>
  </b-view>
  <b-finding>
    <ex>Only the QA step changes: all QA time used to go into doing the tasks; now agents do them, and QA accepts the results and manages the agents.</ex>
    <gen>Many agents can run at once, and QA time per task drops.</gen>
    <do k="What to do">Time QA minutes per bug.</do>
  </b-finding>
</b-chapter>

<b-chapter id="stages" icon="lines" title="Three parts of QA work and what happens to them">
  <b-view kind="pic">
    <b-lane-stack>
    <b-icon-lane icon="search-alt" title="Investigation">
      <b-art-plain name="bug-report-to-reproduction-agent/investigation"/>
    </b-icon-lane>
    <b-icon-lane icon="lines" title="Description">
      <b-art-plain name="bug-report-to-reproduction-agent/description"/>
    </b-icon-lane>
    <b-icon-lane icon="file-text" title="Documentation">
      <b-art-plain name="bug-report-to-reproduction-agent/documentation"/>
    </b-icon-lane>
    </b-lane-stack>
  </b-view>
  <b-view kind="struct">
    <b-lane-stack>
    <b-icon-lane icon="search-alt" title="Investigation">
      <b-qa-row label="Before">
        <node icon="user">QA</node>
        <node icon="refresh-cw">repeat</node>
        <node icon="scissors">trim</node>
        <node icon="target">cause</node>
      </b-qa-row>
      <b-qa-row label="After" now>
        <node icon="bot">Agent</node>
        <node icon="play">path on stand</node>
        <node icon="scissors">narrowing</node>
        <node icon="eye">QA reviews</node>
      </b-qa-row>
    </b-icon-lane>
    <b-icon-lane icon="lines" title="Description">
      <b-qa-row label="Before">
        <node icon="user">QA</node>
        <node icon="lines">steps</node>
        <node icon="file-text">expected / actual</node>
        <node icon="doc-lines">own style</node>
      </b-qa-row>
      <b-qa-row label="After" now>
        <node icon="bot">Agent</node>
        <node icon="table">template</node>
        <node icon="workflow">sequence · C4</node>
      </b-qa-row>
    </b-icon-lane>
    <b-icon-lane icon="file-text" title="Documentation">
      <b-qa-row label="Before">
        <node icon="user">QA</node>
        <node icon="image">screenshots</node>
        <node icon="link">links</node>
        <node icon="doc-lines">Jira fields</node>
      </b-qa-row>
      <b-qa-row label="After" now>
        <node icon="bot">Agent</node>
        <node icon="plug">MCP</node>
        <node icon="lines">Jira</node>
        <node icon="pencil">QA edits disputed</node>
      </b-qa-row>
    </b-icon-lane>
    </b-lane-stack>
    <b-agents-lane title="One QA — several agents at once" agents="agent · PAY-142|agent · PAY-143|agent · PAY-144" note="QA time shifts to managing and accepting" top="10">Each of the three parts runs per bug in its own agent, and QA launches several at once.</b-agents-lane>
  </b-view>
  <b-finding>
    <ex>Investigation, description and documentation go one after another and pass through the agent. QA keeps the final check and the contested parts.</ex>
    <gen>All three parts are repeatable actions with a clear result, so they can be written down and handed over. The decision “is this a bug and how important” stays with a human.</gen>
    <do k="What to do">Split your work on a bug into these three parts and mark which one takes the most time.</do>
  </b-finding>
</b-chapter>

<b-chapter id="mcp" icon="plug" title="MCP: the agent works where QA works">
  <b-why>MCP (Model Context Protocol) is a way to connect an agent to work systems so it reads and writes in them itself instead of getting a retelling.</b-why>
  <b-view kind="pic">
    <b-art-plain name="bug-report-to-reproduction-agent/access-sandbox"/>
  </b-view>
  <b-view kind="struct">
    <b-node-grid>
      <node icon="lines" sw="1.8" t="Jira">reads the ticket, writes the report</node>
      <node icon="play" t="Test stand">walks the path like a user</node>
      <node icon="file-text" sw="1.8" t="Docs">diagrams and notes next to the ticket</node>
      <node icon="cylinder" t="Data">test data, can be reset</node>
      <node icon="shield-check" t="Permissions">only the stand can be broken</node>
    </b-node-grid>
  </b-view>
  <b-finding>
    <ex>Via MCP the agent reads PAY-142 in Jira, goes to the test stand and writes the result back. QA copies nothing between windows.</ex>
    <gen>Without connections to the systems the agent has to be given a retelling, and a retelling loses details. The test stand is the place where the agent can try and break things without touching production.</gen>
    <do k="What to do">Start with two connections: Jira and the test stand. Add the rest as needed.</do>
  </b-finding>
</b-chapter>

<b-chapter id="skill" icon="doc-square" title="A skill: a written process instead of repeating by hand">
  <b-why>A skill is a way of working written down for the agent: steps, a report template, rules. Another person and another agent can repeat it.</b-why>
  <b-view kind="pic">
    <b-art-plain name="bug-report-to-reproduction-agent/skill-pipeline"/>
  </b-view>
  <b-view kind="struct">
    <b-lane title="Skill “reproduce a bug”" color="accent">
      <b-num-chain top="6">
        <step>read the ticket</step>
        <step>walk the critical path on the stand</step>
        <step>narrow down to the minimum</step>
      </b-num-chain>
      <b-num-chain start="4" top="10">
        <step>describe from the template</step>
        <step>diagrams on request</step>
        <step>write to Jira</step>
      </b-num-chain>
    </b-lane>
    <b-agents-lane title="One QA — several agents at once" agents="agent · PAY-142|agent · PAY-143|agent · PAY-144" note="QA time shifts to managing and accepting" top="10">One skill, many runs: an agent per bug. The written process does not require QA to repeat it personally.</b-agents-lane>
    <b-chiprow top="12">
      <chip>same steps every time</chip>
      <chip>one report template</chip>
      <chip>passed to colleagues</chip>
      <chip>improved from mistakes</chip>
    </b-chiprow>
  </b-view>
  <b-finding>
    <ex>The six steps are written down once. Any QA runs the skill on a new ticket and gets a report in the same format.</ex>
    <gen>A skill turns “how I usually do it” into a process that does not depend on who is on shift today. An agent mistake goes into the skill as a new rule, and next time it is gone.</gen>
    <do k="What to do">Write your steps for one type of bug as a skill and run it on three closed tickets.</do>
  </b-finding>
</b-chapter>

<b-chapter id="parallel" icon="grid-alt" title="One QA — several agents: time shifts to managing and accepting">
  <b-why>Bugs can be reproduced through different channels, and each agent takes its own.</b-why>
  <b-view kind="pic">
    <b-art-plain name="bug-report-to-reproduction-agent/parallel"/>
  </b-view>
  <b-view kind="struct">
    <b-node-grid min="170">
      <node icon="monitor" t="Claude in Chrome">walks the path in a browser</node>
      <node icon="flask" t="Code and tests">local run, PoC without a browser</node>
      <node icon="code" t="API">calls requests directly</node>
    </b-node-grid>
    <b-art-plain name="bug-report-to-reproduction-agent/qa-time"/>
    <b-cap>A sketch of the principle; the scale is arbitrary, not a measurement.</b-cap>
  </b-view>
  <b-finding>
    <ex>QA launches agents on PAY-142, PAY-143 and PAY-144 at once. While they work, QA does not sit over one bug but checks the finished results one by one.</ex>
    <gen>Before, QA’s time added up across all bugs in a row. Now each bug has its own agent: browser-based, code-based or via API, and QA keeps only a short check. The more agents are running, the more QA time goes into managing them and reviewing, not routine.</gen>
    <do k="What to do">Grow the number of agents gradually: it is bounded by the number of stands, test data sets and limits. Put the time QA no longer spends on routine into managing agents, checking and improving the skill.</do>
  </b-finding>
</b-chapter>

<b-chapter id="example" icon="chat-square" title="Example: PAY-142 from ticket to report">
  <b-view kind="pic">
    <b-art-plain name="bug-report-to-reproduction-agent/complaint-to-report"/>
  </b-view>
  <b-lane title="Jira ticket · a customer request passed from support to QA" color="accent">
    <b-ticket key="PAY-142">Card payment fails when a promo code is entered</b-ticket>
    <b-chiprow start top="10">
      <chip>from customer</chip>
      <chip>passed by support</chip>
      <chip>no steps</chip>
      <chip>error screenshot</chip>
    </b-chiprow>
  </b-lane>
  <b-lane title="Investigation: 6 actions → 3 left" color="accent" top="10">
    <b-chiprow start>
      <chip kind="del">login</chip>
      <chip kind="del">catalog</chip>
      <chip kind="del">address</chip>
      <chip kind="on">cart</chip>
      <chip kind="on">promo code</chip>
      <chip kind="on">card payment</chip>
      Narrowing down: the agent removes actions one by one and after each checks whether the bug still reproduces. Whatever the bug survives without is crossed out.
    </b-chiprow>
  </b-lane>
  <b-lane title="On request · sequence diagram" color="accent" top="10">
    <b-art-plain name="bug-report-to-reproduction-agent/promo-sequence"/>
  </b-lane>
  <b-lane title="Description and Jira record · comment on PAY-142" color="accent" top="10">
    <b-kv-rows>
      <row k="Steps">cart → promo code → card payment</row>
      <row k="Expected">the payment goes through with the discount</row>
      <row k="Actual">“payment failed”, the promo service returns error 500</row>
      <row k="Environment">test stand, test card</row>
      <row k="Where to look">the call to the promo service from payments (see the diagram)</row>
    </b-kv-rows>
  </b-lane>
  <b-view kind="struct">
    <b-agents-lane title="One QA — several agents at once" agents="agent · PAY-142|agent · PAY-143|agent · PAY-144" note="QA time shifts to managing and accepting" top="10">While the agent handles PAY-142, other agents take PAY-143 and PAY-144, and QA checks what is already done.</b-agents-lane>
  </b-view>
  <b-cap>The ticket and all names are invented for the example.</b-cap>
  <b-finding>
    <ex>From one line from the customer came a short path of three actions, a diagram and a ready report in Jira. QA did not do this; QA reviews the result.</ex>
    <gen>Each of the three parts of QA work left a visible trace: a narrowed path, a diagram, a record. This way the result can be checked in minutes instead of reconstructed from memory.</gen>
    <do k="What to do">Ask the agent to show the narrowed path and the record: they show right away whether it went the wrong way.</do>
  </b-finding>
</b-chapter>

<b-chapter id="human" icon="eye" title="What stays with QA">
  <b-view kind="pic">
    <b-art-plain name="bug-report-to-reproduction-agent/acceptance-gate"/>
  </b-view>
  <b-view kind="struct">
    <b-node-grid>
      <node icon="check" t="Right path">walks the steps by hand on the stand</node>
      <node icon="check" t="Right error">matches the customer screenshot</node>
      <node icon="check" t="Right narrowing">the crossed-out steps really are extra</node>
      <node icon="check" t="How important">a human decides severity and priority</node>
      <node icon="check" t="Improves the skill">agent mistake → new rule</node>
    </b-node-grid>
    <b-agents-lane title="One QA — several agents at once" agents="agent · PAY-142|agent · PAY-143|agent · PAY-144" note="QA time shifts to managing and accepting" top="10">The time QA no longer spends on routine for every bug goes to managing agents, checking, priorities and improving the skill.</b-agents-lane>
  </b-view>
  <b-finding>
    <ex>QA opens the stand, repeats the steps from the report by hand and confirms it is the bug the customer described. Then the ticket goes to the developer as before; if it fails, the report goes back to the agent.</ex>
    <gen>A model readily confirms itself, and invented details look like findings. So the last word stays with a human who looks with their own eyes. QA work shifts from performing the routine to checking and improving the process.</gen>
    <do k="What to do">Agree that a report QA could not repeat by hand does not go to the developer.</do>
  </b-finding>
</b-chapter>

<b-chapter id="first" icon="shield-check" title="How to start">
  <b-view kind="pic">
    <b-art-plain name="bug-report-to-reproduction-agent/start-steps"/>
  </b-view>
  <b-view kind="struct">
    <b-num-chain>
      <step>connect Jira and the stand via MCP</step>
      <step>write QA steps down as a skill</step>
      <step>run on 5 closed bugs and add rules</step>
    </b-num-chain>
  </b-view>
  <b-finding>
    <ex>On closed bugs the answer is known, so it is clear where the agent or the skill went wrong.</ex>
    <gen>A new scenario is safer to launch on tasks with a known outcome, turning each mistake into a skill rule.</gen>
    <do k="What to do">Start with five bugs from last month and one QA who checks the result by hand.</do>
  </b-finding>
</b-chapter>

<b-chapter id="next" icon="arrow-right" title="Read next">
  <b-links>
    <item href="/blog/specs-rules-skills/" k="Skills" t="Specs, rules and skills">what an agent should know about a project</item>
    <item href="/blog/harness-driven-development/" k="Error loop" t="Harness-Driven Development">how agent mistakes become rules</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="Environment" t="Comparing harnesses">where the agent works and what it sees</item>
  </b-links>
</b-chapter>
<b-footer>Ticket PAY-142 and the diagram are invented for the example.</b-footer>
</b-post>
