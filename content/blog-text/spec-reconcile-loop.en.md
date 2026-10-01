**Desired:** spec

**Actor:** agent

**Actual:** code

**Measure:** tests

## The same loop as in Kubernetes

The desired state here is the aggregate dictionary: one entry per concept, requirements marked MUST and SHOULD.

a human changes the desired state

desired

actor

actual

measure

**Kubernetes:**

desired chart · manifest

actor controller

actual nodes · pods

measure probes · metrics

**Specs:**

desired dictionary · MUST

actor agent

actual code

measure tests · quality

measure → actor, round and round

The reconcile loop follows the Kubernetes docs on controllers.

**Takeaway:**

**In this example:** In Kubernetes a human edits the chart and the controller brings the nodes to it. Here a human edits the dictionary and the agent brings the code to it and checks with tests.

**In general:** Both systems keep the desired state apart from the actual one and reconcile them in a loop. The human in the loop changes only the desired state, so every edit immediately becomes work for the actor.

**Next step:** Edit the requirement in the dictionary instead of fixing code by hand, and run the agent with the task of bringing the code in line with the dictionary.

## A check sees only what was put into it

The example is the meeting room booking from Specs by aggregate: three MUST requirements and one SHOULD.

**Kubernetes:**

/healthz → 200

order queue is stuck

probe is green, service is down

**Specs:**

MUST · no overlaptest

MUST · forward onlytest

MUST · 15 min → closedno check

SHOULD · channelreview

MUST covered

**2 / 3:**

tests are green, one MUST is unchecked

every MUST → its own check MUST without a check = finding green ≠ correct

Which probes exist and what they check: Kubernetes: probes.

**Takeaway:**

**In this example:** The probe answers “200” while orders are stuck, and the booking tests are green while nobody checks the 15-minute rule.

**In general:** A check confirms only what is written into it and says nothing about the rest. So the aggregate card is compared against the checks: a MUST without a check is a gap, not a met requirement.

**Next step:** Go through the MUSTs in your dictionary and mark the ones without a test. Turn each into a task, or deliberately downgrade it to SHOULD.

## The environment decides whether the loop closes

**cluster:** the controller’s environment

≈

**harness:** the agent’s environment

**Run code:** without it → guesses instead of facts

**Tests:** without it → MUST cannot be checked

**Logs:** without it → no way to see what broke

**Test data:** without it → checks on empty tables

**Services via MCP:** without it → integrations in the dark

**Sandbox and permissions:** without it → too risky to let it act

Separate article Choosing the environment: a harness comparison Claude Code, Codex, Cursor, Hermes and chat on one map

**Takeaway:**

**In this example:** The Kubernetes controller works because the cluster gives it an API, nodes and probes. For the same loop the agent needs to run code, tests, logs, data, services and a sandbox.

**In general:** The dictionary sets the desired state, but only someone who can run and measure the code can reconcile it with that state. Whatever the environment lacks, the agent cannot check, and the loop stays open at that point.

**Next step:** Mark which of the six capabilities your agent has. For each missing one, decide whether to add it to the harness or switch harnesses.

## Read next

Desired state

Specs by aggregate

dictionary, RFC requirements and contexts

Mistake loop

Harness-Driven Development

how agent mistakes become rules

Environment

Harness comparison

where the agent works and what it sees

The booking example is made up. Terms and approaches follow the sources linked under the diagrams.
