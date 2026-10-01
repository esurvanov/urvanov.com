**Context:** booking

**Aggregate:** Reservation

**Invariant:** MUST

**Check:** test

## Why specs pile up

**Spec per feature:** a concept is described in every feature

**12 files:** “Booking” in 7

grows with features

**Aggregate dictionary:** a concept is described once

Reservation

Room

TimeSlot

Member

**4 entries:** “Booking” in 1

grows with the domain

Feature 13 → [booking::Reservation]+1 MUST → test+1

Numbers are illustrative. How OpenSpec lays out specs and changes: specs/ and changes/ folders, finished changes go to an archive.

**Takeaway:**

**In this example:** Twelve features produced twelve specs, and booking is described in seven of them, each a little differently. In the dictionary the same features added lines to four aggregate entries.

**In general:** When a spec is tied to a change or a feature, every task adds files, and one concept drifts across several places. When the unit is an aggregate, the number of entries is bounded by the domain itself, and a feature only adds requirements to an entry.

**Next step:** List the concepts that appear in three or more specs and give each one a single dictionary entry. Let feature specs link to the entry instead of retelling it.

## RFC 2119 requirement levels

Word Meaning Strength Check

MUSTrequired automated testblocks

MUST NOTforbidden automated testblocks

SHOULDdefault, deviate with a reason reviewwarns

MAYallowed nonenot checked

MUST = SHALL

Words and meanings follow RFC 2119. Each word maps to its own kind of check.

**Takeaway:**

**In this example:** In the booking entry, “intervals do not overlap” is a MUST checked by a test, and “confirmation goes to the same channel” is a SHOULD looked at in review.

**In general:** The requirement word tells you right away how to check it and what to do on a violation. The agent reads MUST as a boundary and SHOULD as a default and does not mix them up.

**Next step:** Rewrite the requirements in your spec with these four words and put the test that checks it next to every MUST.

## The aggregate card
```
## [booking::Reservation]

Class: aggregate

Description: A meeting room booked for an interval.
```
1 address: context::name
```
Invariants:

  - MUST: active bookings of a room never overlap

  - MUST: held → confirmed → closed, forward only

  - MUST: held unconfirmed for 15 min → closed

  - SHOULD: confirm in the channel it was made in
```
2 requirements → checks
```
Commands: HoldRoom, ConfirmReservation,

          CancelReservation
```
3 the only way to change it
```
Access:

  CanHoldRoom: [booking::Role::Member]

  CanCancelReservation: Member (own), Admin
```
4 who may
```
Depends on: [[booking::Room]], [[booking::TimeSlot]]
```
5 links by id
```
Spec: [[room-booking]]
```
6 which feature it came from

The example is made up. Terms follow Martin Fowler: DDD Aggregate.

**Takeaway:**

**In this example:** The whole booking is one card: an address, four requirements, three commands, permissions, links and the feature it came from.

**In general:** An aggregate is a boundary inside which the requirements always hold, and it can change only through its own commands. That is why the card keeps the rules next to the only ways to break them.

**Next step:** Give every aggregate a six-field card. If a requirement cannot be assigned to any aggregate, the aggregate most likely has not been named yet.

## Bounded contexts

booking

Reservation Room TimeSlot

billing

Invoice Tariff

access

Pass Level

links between contexts go by id only billing::Invoice→ id → booking::Reservation access::Pass→ id → booking::Reservation

“Level”

booking::Room.floorFloor

access::LevelClearance

one word, two terms, different labels

one term = one entry link as [[ctx::Name]] same word → separate entries dictionary changes with the spec

The approach is Bounded Context and Ubiquitous Language.

**Takeaway:**

**In this example:** The invoice and the pass refer to a booking by id and know nothing about its insides. “Level” means a floor in booking and a clearance in access, and these are two separate entries.

**In general:** A context is an area where every word has one meaning. When a word appears in two contexts, you create two terms with different labels; otherwise the agent carries a rule from one into the other.

**Next step:** Sort your aggregates into contexts and find the words that appear in two of them. Give each such word separate entries and different labels in the interface.

## Read next

Continued

**A reconcile loop for specs:** like Kubernetes: desired state, checks and the agent’s environment

Mistake loop

Harness-Driven Development

how agent mistakes become rules

Context

Specs, bible, rules and skills

what the agent knows about the project and where it lives

Environment

Harness comparison

where the agent works and what it sees

The booking example is made up. Terms and approaches follow the sources linked under the diagrams.
