01 Big picture

21%Use it every week

Where to invest in training

02 Nature of work

70%Of connections are Slack and Notion

Which tool to buy

03 Verification

±2%Export reconciliation tolerance

Can the numbers be trusted

04 People selection

16Of 340 in the example — for interviews

Who to talk to before buying

## Which decisions the report helps make

A company pays for hundreds of licenses for an AI tool. The business has to decide whether to buy specialized tools on top of the base one, for which teams, and where to direct the pilot budget. Console exports do not answer this directly: they only hold messages and spend per person.

The report turns these exports into decisions: what the data proves, what needs checking in interviews, and what can safely be funded right away.

Input

Console exports: messages, spend, projects, and connectors for each person

What the report does

Turns exports into segments, team maturity, and specific people as material for a decision

Decisions at the output

Which tool to pilot, for which team, who to talk to before buying, and where budget is not needed

## Workflow

Five steps from export to a finished list of people.

1

Export the data

Five console sections, details in "Where to get the data"

2

Build the big picture

Adoption depth, uniformity across teams, main tool, segments

3

Map the nature of work

Which tasks people solve, with which built-in tools, and with which integrations

4

Check against raw data

Verify each summary against the source export

5

Select people and draw conclusions

An interview list and hypotheses about tools

Who to interview · How to run the interviews

## Where to get the data

Everything is built from five sections of a single ChatGPT Enterprise admin console. Hover over i to see exactly what each section contains.

**How to export.** The console does have APIs, but they cover only part of the data: Codex analytics, credit costs, and conversation logs for compliance. The users, projects and skills exports and the per-product leaderboard are easier to collect in the interface. Exporting is a good job for Claude in Chrome: it opens the right section, sets the filter, clicks export, and saves the CSV. Every step is visible on screen, so a wrong filter or section is caught immediately, before the numbers reach the report.

**Access.** The console API is not always available: company security policies often restrict admin API keys. In that case, export every section through the interface.

Users

chatgpt.com/admin/usage/users

Messages, activity dates, and built-in tools for each person

iWhat's inside CSV export for a period of up to 12 months. Fields: messages, tool_messages, gpt_messages, project_messages, department, groups, seat_type, last_day_active. The console itself marks "power users" with a badge.

Leaderboard

admin.openai.com → Analytics → Leaderboard

Spend, tokens, and lines of code for each person, separately for the Chat, Work, and Codex products

iWhat's inside Export button next to the heading → "User ranking", CSV or JSON. Fields: Name, Email, Credits, Estimated costs, Tokens, Lines of code. The "Product" filter changes what the export contains. History covers about 120 days.

Projects

chatgpt.com/admin/usage/projects

Who created a project, how many messages it has, and whether it is active

iWhat's inside Fields: project_name, project_creator_email, messages_workspace, unique_messagers_workspace, is_active. Some names come through as [content redacted]: the console hides them on its own.

Overview: connectors and skills

chatgpt.com/admin/usage

Which apps people connect the assistant to and which skills they use

iWhat's inside The "App interactions" and "Skills" blocks: the number of calls to each connector and skill over the selected period.

Analytics: tasks

admin.openai.com → Analytics → Tasks

The console's own task classification: code or knowledge work (everything except code)

iWhat's inside Share of code and knowledge work, top tasks by credits. An OpenAI model labels tasks on a sample of about 10% of requests over 30 days.

## Big picture

The next four sections are the report itself, each with its goal. **Goal:** show which groups of people exist in the company and how large they are.

### Adoption depth

Adoption depth shows how deeply the tool has entered the company's work: how many people have used it at least once, regularly, and every week. Those who never write in chat and work only through Codex are shown separately. **Decision:** which group to invest training in and whether to buy more licenses now.

71

88

97

23

61

340 people

Source: Users · Leaderboard for those who work only through Codex

**Takeaway:**

**In this example:** 82% of people have tried the tool, 47% use it in their work, and for 21% it has become a weekly habit. The room to grow depth is the 97 people in the "occasionally" group.

**In general:** The gap between "tried it" and "use it every week" shows how many people stopped after the first attempts. The benchmark for mass adoption is 50–70% of employees using it in daily work. Until adoption reaches that benchmark, more licenses will not drive growth: something other than access is holding people back.

**Next step:** Put training into the largest group between "tried it" and "every week": it gives the fastest growth in regular use. Recount the breakdown once a month to see where people moved.

**Important.** Pick 5–10 people from the "occasionally" group, find out in interviews what got in the way, and run a review of real work cases with them. Recount the weekly share a month later. How to ask without suggesting the answer is covered in "How to interview people about their AI use".

### Uniformity

Uniformity shows how evenly the tool has entered different teams: what share of each team uses it regularly and how many messages one person writes on average. **Decision:** which team to take working scenarios from and which team to bring them to first.

| Team | Regular users | % | Msgs per person |
|---|---|---|---|
| Team A (strong) |  | 74% | 1,120 |
| Team B (strong) |  | 66% | 870 |
| Team C (middle) |  | 51% | 720 |
| Team D (lagging) |  | 34% | 530 |
| Team E (lagging) |  | 18% | 290 |

Source: Users · department and groups fields

**Takeaway:**

**In this example:** In Team A, 74% of people use the tool regularly; in Team E, 18%: a spread of 56 percentage points.

**In general:** A large spread between teams means working scenarios already exist but live in one or two teams: moving them is cheaper than buying something new. A uniformly low share across all teams points to a shared barrier: access, training, or unsuitable tasks. A uniformly high share means the tool has taken root and you can move to the next step. A team with barriers is not ready for a new tool yet.

**Next step:** With a large spread, run a meetup: the strongest team shows three of its scenarios to the two weakest. Before the meetup, run 2–3 interviews about barriers in the weakest team. Recount the spread a month later: it should shrink.

### Main tool

Which of the three tools takes more than half of a person's spend over three months. The tool type shows how the person works with AI.

- Chat — dialogue: question → answer, the person drives the work. Problems: prompt, hallucinations, reproducibility, scale.
- Work — goal-driven agent: gathers data from apps and delivers a document. Remaining: reproducibility, scale.
- Codex — coding agent: writes and edits code in the repository. No problems remain.

164 · Chat

47 · Work

38 · Codex

91 · no spend

340 people, 3-month window

Source: Leaderboard · three exports: "Product" filter = Chat, Work, Codex

**Takeaway:**

**In this example:** Chat is the main product for 164 of 340 people, Codex for 38, Work for 47.

**In general:** The main tool shows the type of work: a conversation, a task handed to an agent, or code. It determines what the person needs next and which pilot to put them in. Group size sets pilot size: a wide pilot for a common scenario, a narrow one for a rare scenario.

**Next step:** The decision is to move each group to the next step. For the Chat group: Work with connectors and MCP to work data, which removes prompting and hallucinations. For the Work group: specs, harness setup and shared skills, which make the result reproducible and transferable to other teams.

### Top by spend

The top list ranks people by the amount spent on a specific product, for example Codex. This way the list includes someone who spends a lot on Codex even if most of their spend goes to Chat.

| Person | Team | $ on code / 3 mo | Tokens / 3 mo | Tokens per $ |
|---|---|---|---|---|
| Hana Sato | Team C | 438.20 | 21.9M | 50K |
| Luis Moreno | Team A | 395.60 | 12.7M | 32K |
| Ada Kowalski | Team D | 84.30 | 4.3M | 51K |

Source: Leaderboard · one export per product

**Takeaway:**

**In this example:** Hana Sato and Luis Moreno spend about five times more on code than the third person on the list. With similar spend, Hana gets one and a half times more tokens per dollar than Luis.

**In general:** Top users are change agents: they find working scenarios first, and their experience affects whether a specialized tool pays off. Next to them are more cautious colleagues who need more time and a live example on their own tasks. Ranking by share of spend hides the change agents, so look at absolute spend.

**Next step:** Involve top users as mentors: let them show their scenarios to colleagues who are just starting, on those colleagues' tasks. Invite cautious colleagues through examples and results, without mandates. Offer the top two or three a two-week experiment in a specialized tool with a before-and-after report.

The leaderboard has both spend and tokens. Compare the tokens-to-spend ratio within one group: one product and similar tasks. Whoever gets noticeably more tokens per dollar usually picks models and modes better. These are the most advanced and efficient users, and they are the first to invite as mentors. Introduce them to colleagues from the same group whose ratio is lower: working through one task together often gives more than a general training. Pairs from different teams bring cross-pollination: good techniques move between teams.

During rollout, top users can spend an order of magnitude more than everyone else. It is better not to introduce limits at this stage: they easily demotivate the people who adopt the tool first. Instead of limits, agree on experiments and a results report. Limits make sense later, once practices are proven and the normal cost of a scenario is clear.

### Behavioral segments

Groups by behavior intensity built from several exports: how much a person writes, spends and what they do.



| Segment | People | Details |
|---|---|---|
| Write code in any product | 44 | 19 of them outside technical teams |
| Intensive research in chat | 58 | 1,900+ messages on average |
| Agentic tasks | 33 | multi-step scenarios, connectors |
| Image generation | 21 | two thirds from one team |
| Fully inactive | 61 | 0 messages, $0 over the whole period |

Source: Users · Leaderboard

**Takeaway:**

**In this example:** The largest segments for customer interviews are intensive research (58) and code (44, 19 of them outside technical teams). For the 61 inactive people the question is different: what stops them from starting.

**In general:** Data shows what people do but not whether the current tool is enough for them. So a segment is a hypothesis: it suggests whom to invite to customer interviews, which questions to ask, and what problems people may run into. Tool candidates appear already here, and the choice between them is made after the interviews, for a confirmed problem.

**Next step:** For each segment, talk to 2–3 people: where the current tool falls short and what they still do by hand. Gather candidates for a confirmed problem from three sources: consultations with innovators inside the company, outside experts, and market benchmarks, meaning what similar companies use. Pilot the best candidate with that segment. If the problem is not confirmed, postpone the segment until the next recount.

## Nature of work

**Goal:** show which tasks people solve with the tool, with which built-in features, and through which integrations.

### Connectors

Connectors link the assistant to work data: chats, documents, code, calendars. They determine the volume of hallucinations: without access to data, the model fills in the answer itself. **Decision:** which teams and which systems to connect first.

Slack 520

Notion 340

GitHub 210

Calendar 150

Source: Overview · "App interactions" block

**Takeaway:**

**In this example:** Slack and Notion account for 70% of all connections. The model does not see systems outside this list: it answers questions about them with a guess.

**In general:** The volume of hallucinations drops where the model has the context it needs. Without it, the agent tries to fill the gap on its own. Teams with zero connections work with the model blind, and almost any answer about their processes is a guess. The sign in a customer interview: "I have to double-check everything".

**Next step:** Find teams with zero connections and ask in interviews where their work data lives. Connect one such source and compare before and after on 10 identical questions: how many answers are wrong and how many rely on work data.

### Skills

Skills show process maturity: a scenario once described as a skill repeats the same way for anyone who runs it. The stats show which skills are used and who builds their own. **Decision:** which processes can already be rolled out to other teams, and which still depend on individual people.

spreadsheets 88

pdf 57

skill-creator 29

Source: Overview · "Skills" block

**Takeaway:**

**In this example:** The spreadsheet and PDF skills have 88 and 57 calls: these processes are already reproducible. 29 calls to skill-creator: some people are turning their scenarios into skills.

**In general:** Process maturity grows in steps: one-off requests → a personal skill → a shared team skill. At the first step, the result depends on who asked and how. With a skill it is reproducible: the same input gives the same result. A shared skill makes the process transferable to other teams.

**Next step:** Collect skills into one list with their authors and mark the step of each process. Turn the two most used personal skills into shared ones: the author shows them to a neighboring team, and the team checks that the same inputs give the same result. Scenarios without a skill that repeat every week are the first candidates for new skills.

### Project themes

The summary groups projects by meaning and shows the concrete tasks people run in ongoing projects. For customer interviews this is a ready list: which tasks to discuss and with whom. **Decision:** which tasks and whose projects to cover in interviews first.

| Theme | Projects | Tasks | Question for the author |
|---|---|---|---|
| Sales (Pitch library · Elif Demir) | 11 | pitches, objection handling, commercial proposals | "Which part of a pitch does the model do well, and what do you rewrite?" |
| Onboarding (New hire guide · Rafael Costa) | 8 | guides for newcomers, answers to typical questions | "Which newcomer questions does the model already handle without you?" |
| Market research (Competitor notes · Jonas Keller) | 5 | competitor summaries, price comparisons | "Where do you get the data, and how quickly does it go stale?" |

Source: Projects · names grouped by meaning

**Takeaway:**

**In this example:** Sales (11) and onboarding (8) have the most standing projects. The authors of the largest projects are the first people to interview.

**In general:** A project is a knowledge base: files and instructions the model relies on in every answer. The fuller the base, the more accurate and stable the result. What a project contains suggests what to ask in an interview: which files were added, what is missing, and where answers still need fixing.

**Next step:** Open the three most active projects in each theme and list the concrete tasks. In the interview, ask the author the question from the table and which files and instructions changed answer quality the most. Turn a successful project setup into a template for that theme.

## Verification

**Goal:** check the summaries against the raw exports, the project list and the leaderboard. Any number in the report can be traced back to its source row in an export.

### Full project list

All projects with author and status. This list is used to check the theme summary and to find the author of a specific project.

| Project | Author | Status | Msgs |
|---|---|---|---|
| Pitch library | Elif Demir | active | 268 |
| Price list 2026 | Oskar Berg | active | 64 |
| Personal draft | Pavel Novak | abandoned | 0 |

Source: Projects

**Takeaway:**

**In this example:** The "Personal draft" project has zero messages.

**In general:** An empty project is an abandoned attempt: the person started, but the tool never became part of their work. If such projects stay in, the topic summary overstates usage.

**Next step:** Filter out projects with zero messages before counting and invite 2–3 of their authors: the reason they quit is a valuable answer.

### Leaderboard

The billing export for each person and product. Main tools and top lists are calculated from it.

| Name | Email | Credits | $ |
|---|---|---|---|
| Hana Sato | hana@example.com | 10,955 | 438.20 |
| Mira Castellano | mira@example.com | 2,425 | 97.00 |
| Jonas Keller | jonas@example.com | 470 | 18.80 |

Source: Leaderboard · three exports with different "Product" filters

**Takeaway:**

**In this example:** The three product exports add up to the total spend of each person on the list.

**In general:** The three exports with different Product filters add up to each person's total spend. A gap above 2% means an export is incomplete or the periods differ.

**Next step:** Before sharing the report, sum the three exports per person and compare with total spend. If they differ, re-export the data for the same period.

## People selection

**Goal:** name specific people for each hypothesis.

### Interview candidates

A short list of people for each direction found. In the example the final list is 16 people out of 340; the table shows the first three. Your company will have its own number.

| Person | Direction | Signal |
|---|---|---|
| Hana Sato | code | $438 / 3 mo |
| Mira Castellano | agentic tasks | $97 / 3 mo |
| Jonas Keller | research | 3,200+ msgs |

Source: the users, leaderboard and projects exports, joined by email

**Takeaway:**

**In this example:** Hana Sato, Mira Castellano, and Jonas Keller test three different hypotheses: code, agentic tasks, and research.

**In general:** The shortlist has one person per direction: code, agent tasks, research. Each conversation then tests its own idea and does not repeat another one.

**Next step:** Schedule three interviews for the coming week. Afterwards, decide which direction needs 2–3 more people.

### Table of all people

Everyone, with filters by team, activity, direction, and main tool.

Team B Activity: every week Tool: Work

| Person | Team | Chat / Work | $ / 3 mo |
|---|---|---|---|
| Mira Castellano | Team B |  | 149.00 |
| Tomás Reid | Team B |  | 112.00 |

Source: the users, leaderboard and projects exports, joined by email

**Takeaway:**

**In this example:** The "Team B" and "Tool: Work" filters left two people: Mira Castellano and Tomás Reid.

**In general:** A table of all people with filters by team, activity and main tool is the base for any next sample: a list for a new question needs no new export.

**Next step:** Save each set of filters as a separate table view so the next list takes one click.

## Where to start today

You do not need the whole report at once: the first useful result, a list of most active users, appears after the second item.

Export users and the leaderboard for three months The leaderboard three times, once per product. A browser agent can do the export: Claude in Chrome · Gemini in Chrome · Perplexity Comet

Calculate main tools and the top by amount The first list of most active users is ready

**Calculate adoption depth:** At least once / regularly / every week, with those who work only through Codex counted separately

Build a list of people and schedule interviews How to pick these people is covered in "Who to interview"

## Further reading

Interviews

Who to interview

How to build an interview sample from the table of people

Interviews

How to interview people about their AI use

A call, a survey and one Airtable table

All names, teams, addresses, and numbers in the examples are fictional.
