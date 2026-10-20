---
title: Specs by aggregate: RFC requirements and bounded contexts instead of a spec per feature
date: 2026-09-28
description: Spec-driven development without spec sprawl: how to keep specs in one aggregate dictionary so they do not multiply with every feature: requirement levels, the aggregate card and context boundaries.
tags: AI, spec-driven development, specs, DDD, agents
category: specs
layout: wide
image: /og/specs-by-aggregates.en.png
mentions: RFC 2119, Domain-Driven Design, OpenSpec, Spec-Driven Development
toc: growth=Why specs pile up | rfc=RFC levels | card=Aggregate card | contexts=Contexts | next=Read next
---

<b-post series="agg">
<b-hchain label="Chain: bounded context, aggregate, MUST-level invariant, check">
  <step icon="workflow" sw="1.8" t="Context">booking</step>
  <step icon="cube" t="Aggregate">Reservation</step>
  <step icon="list-check" sw="1.8" t="Invariant">MUST</step>
  <step icon="flask" t="Check">test</step>
</b-hchain>
<b-chapter id="growth" title="Why specs pile up" icon="bar-chart-rise">
  <b-spec-growth>
    <b-growth-panel icon="file" t="Spec per feature" sub="a concept is described in every feature" files="101101010110" n="12 files" note="“Booking” in 7" chip="grows with features"></b-growth-panel>
    <b-growth-panel good icon="cube" t="Aggregate dictionary" sub="a concept is described once" n="4 entries" note="“Booking” in 1" chip="grows with the domain">
      <agg dots="5">Reservation</agg>
      <agg dots="3">Room</agg>
      <agg dots="2">TimeSlot</agg>
      <agg dots="2">Member</agg>
    </b-growth-panel>
    <step>Feature 13</step>
    <step em="+1 MUST">[booking::Reservation]</step>
    <step em="+1">test</step>
  </b-spec-growth>
  <b-cap>Numbers are illustrative. How <a href="https://github.com/Fission-AI/OpenSpec" target="_blank" rel="noopener">OpenSpec</a> lays out specs and changes: specs/ and changes/ folders, finished changes go to an archive.</b-cap>
  <b-finding>
    <ex>Twelve features produced twelve specs, and booking is described in seven of them, each a little differently. In the dictionary the same features added lines to four aggregate entries.</ex>
    <gen>When a spec is tied to a change or a feature, every task adds files, and one concept drifts across several places. When the unit is an aggregate, the number of entries is bounded by the domain itself, and a feature only adds requirements to an entry.</gen>
    <do>List the concepts that appear in three or more specs and give each one a single dictionary entry. Let feature specs link to the entry instead of retelling it.</do>
  </b-finding>
</b-chapter>
<b-chapter id="rfc" title="RFC 2119 requirement levels" icon="list-check">
  <b-rfc-levels cols="Word | Meaning | Strength | Check">
    <level k="MUST" s="5" w="100" check="test" t="automated test" note="blocks">required</level>
    <level k="MUST NOT" s="5" w="100" check="test" t="automated test" note="blocks">forbidden</level>
    <level k="SHOULD" s="3" w="60" check="review" t="review" note="warns">default, deviate with a reason</level>
    <level k="MAY" s="1" w="20" check="none" t="none" note="not checked">allowed</level>
    <syn>MUST = SHALL</syn>
  </b-rfc-levels>
  <b-cap>Words and meanings follow <a href="https://www.rfc-editor.org/rfc/rfc2119" target="_blank" rel="noopener">RFC 2119</a>. Each word maps to its own kind of check.</b-cap>
  <b-finding>
    <ex>In the booking entry, “intervals do not overlap” is a MUST checked by a test, and “confirmation goes to the same channel” is a SHOULD looked at in review.</ex>
    <gen>The requirement word tells you right away how to check it and what to do on a violation. The agent reads MUST as a boundary and SHOULD as a default and does not mix them up.</gen>
    <do>Rewrite the requirements in your spec with these four words and put the test that checks it next to every MUST.</do>
  </b-finding>
</b-chapter>
<b-chapter id="card" title="The aggregate card" icon="card-lines">
  <b-aggregate-card label="Example entry for the Reservation aggregate in the booking context: address, invariants, commands, access, links and the feature spec">
    <field icon="id-card" t="address: context::name">## [booking::Reservation]&#10;Class: aggregate&#10;Description: A meeting room booked for an interval.</field>
    <field icon="list-check" sw="1.8" t="requirements → checks">Invariants:&#10;  - MUST: active bookings of a room never overlap&#10;  - MUST: held → confirmed → closed, forward only&#10;  - MUST: held unconfirmed for 15 min → closed&#10;  - SHOULD: confirm in the channel it was made in</field>
    <field icon="play" t="the only way to change it">Commands: HoldRoom, ConfirmReservation,&#10;          CancelReservation</field>
    <field icon="user" t="who may">Access:&#10;  CanHoldRoom: [booking::Role::Member]&#10;  CanCancelReservation: Member (own), Admin</field>
    <field icon="link" t="links by id">Depends on: [[booking::Room]], [[booking::TimeSlot]]</field>
    <field icon="file" t="which feature it came from">Spec: [[room-booking]]</field>
  </b-aggregate-card>
  <b-cap>The example is made up. Terms follow <a href="https://martinfowler.com/bliki/DDD_Aggregate.html" target="_blank" rel="noopener">Martin Fowler: DDD Aggregate</a>.</b-cap>
  <b-finding>
    <ex>The whole booking is one card: an address, four requirements, three commands, permissions, links and the feature it came from.</ex>
    <gen>An aggregate is a boundary inside which the requirements always hold, and it can change only through its own commands. That is why the card keeps the rules next to the only ways to break them.</gen>
    <do>Give every aggregate a six-field card. If a requirement cannot be assigned to any aggregate, the aggregate most likely has not been named yet.</do>
  </b-finding>
</b-chapter>
<b-chapter id="contexts" title="Bounded contexts" icon="workflow">
  <b-ctx-map>
    <ctx name="booking">Reservation, Room, TimeSlot</ctx>
    <ctx name="billing">Invoice, Tariff</ctx>
    <ctx name="access">Pass, Level</ctx>
  </b-ctx-map>
  <b-ctx-links t="links between contexts go by id only">
    <ref from="billing::Invoice" to="booking::Reservation"/>
    <ref from="access::Pass" to="booking::Reservation"/>
  </b-ctx-links>
  <b-ctx-clash word="“Level”" note="one word, two terms, different labels">
    <sense code="booking::Room.floor">Floor</sense>
    <sense code="access::Level">Clearance</sense>
  </b-ctx-clash>
  <b-ctx-rules>
    <rule icon="id-card">one term = one entry</rule>
    <rule icon="link">link as [[ctx::Name]]</rule>
    <rule icon="fork">same word → separate entries</rule>
    <rule icon="cycle">dictionary changes with the spec</rule>
  </b-ctx-rules>
  <b-cap>The approach is <a href="https://martinfowler.com/bliki/BoundedContext.html" target="_blank" rel="noopener">Bounded Context</a> and <a href="https://martinfowler.com/bliki/UbiquitousLanguage.html" target="_blank" rel="noopener">Ubiquitous Language</a>.</b-cap>
  <b-finding>
    <ex>The invoice and the pass refer to a booking by id and know nothing about its insides. “Level” means a floor in booking and a clearance in access, and these are two separate entries.</ex>
    <gen>A context is an area where every word has one meaning. When a word appears in two contexts, you create two terms with different labels; otherwise the agent carries a rule from one into the other.</gen>
    <do>Sort your aggregates into contexts and find the words that appear in two of them. Give each such word separate entries and different labels in the interface.</do>
  </b-finding>
</b-chapter>
<b-chapter id="next" title="Read next">
  <b-cta href="/en/blog/spec-reconcile-loop/" k="Continued" t="A reconcile loop for specs" icon="hub" sw="1.6">like Kubernetes: desired state, checks and the agent’s environment</b-cta>
  <b-links cols="3">
    <item href="/en/blog/harness-driven-development/" k="Mistake loop" t="Harness-Driven Development">how agent mistakes become rules</item>
    <item href="/en/blog/specs-rules-skills/" k="Context" t="Specs, bible, rules and skills">what the agent knows about the project and where it lives</item>
    <item href="/en/blog/ai-in-code-harness-and-tools/" k="Environment" t="Harness comparison">where the agent works and what it sees</item>
  </b-links>
</b-chapter>
<b-footer compact>The booking example is made up. Terms and approaches follow the sources linked under the diagrams.</b-footer>
</b-post>
