01 Big picture

21%Use it every week

Where to invest in training

02 Nature of work

73%Knowledge work, 27% code

Which tool to buy

03 Verification

±2%Export reconciliation tolerance

Can the numbers be trusted

04 People selection

16Of 340 — for interviews

Who to talk to before buying

## Which decisions it helps make

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

Adoption depth, spend archetypes, segments, team comparison

3

Map the nature of work

Which tasks people solve, with which built-in tools, and with which integrations

4

Check against raw data

Verify each summary against the source export

5

Select people and draw conclusions

An interview list and hypotheses about tools

## Where to get the data

Everything is built from five sections of a single ChatGPT Enterprise admin console. Hover over i to see exactly what each one contains.

**How to export.** The console does have APIs, but they cover only part of the data: Codex analytics, credit costs, and conversation logs for compliance. The users, projects and skills exports and the per-product leaderboard are easier to collect in the interface. This is a good job for Claude in Chrome: it opens the right section, sets the filter, clicks export, and saves the CSV. Every step is visible on screen, so a wrong filter or section is caught immediately, before the numbers reach the report.

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

Distributions across the whole company. This shows which groups exist at all and how large they are.

### Adoption depth

Shows how deeply the tool has entered the company's work: how many people have used it at least once, regularly, and every week. Those who pay through code or the API without using chat are shown separately.

at least once 82%

regularly 47%

every week 21%

71

88

97

23

61

340 people

Source: Users · Leaderboard for those who pay without chat

**Takeaway:**

**In this example:** 82% of people have tried the tool, 47% use it in their work, and for 21% it has become a weekly habit. The room to grow depth is the 97 people in the "occasionally" group.

**In general:** The gap between "tried it" and "use it every week" shows how many people stopped after the first attempts. The benchmark for mass adoption is about 80% of employees using it in daily work. Until then, more licenses will not drive growth: something other than access is holding people back.

**Next step:** Pick 5–10 people from the "occasionally" group, find out in interviews what got in the way, and run a review of real work cases with them. Recount the weekly share a month later.

### Spend archetypes

Shows which product takes more than half of each person's spend over the last three months. Chat is the regular chat. Work is an agent: given a goal, it gathers data from connected apps and delivers a finished document, sheet or deck. Codex is the coding agent.

164 · Chat

47 · Work

38 · Codex

91 · no spend

340 people, 3-month window

Source: Leaderboard · three exports: "Product" filter = Chat, Work, Codex

**Takeaway:**

**In this example:** Chat is the main product for 164 of 340 people, Codex for 38, Work for 47.

**In general:** An archetype shows which product a person's money goes to, and the group size sets the pilot size: wide for a common scenario, narrow for a rare one.

**Next step:** For each new tool, recruit pilot users with the matching archetype: from the 38 Codex people for a development tool, from the 164 Chat people for a chat tool.

### Top by product

Ranks people by the amount spent on a specific product. This surfaces heavy users even when the product is a small share of their personal budget.

| Person | Team | $ on code / 3 mo |
|---|---|---|
| Hana Sato | Team C | 438.20 |
| Luis Moreno | Team A | 395.60 |
| Ada Kowalski | Team D | 84.30 |

Source: Leaderboard · one export per product

**Takeaway:**

**In this example:** Hana Sato and Luis Moreno spend about five times more on code than the third person on the list.

**In general:** Absolute spend shows who already takes most of a product's budget. Ranking by share of spend hides them. Their experience decides whether a specialized tool pays off.

**Next step:** Invite the top two or three to interviews and offer them two weeks in a specialized tool on their own tasks, with a before-and-after report.

Top users can spend an order of magnitude more than everyone else. Capping them with limits is not worth it; agree on experiments and a results report instead, so the spend turns into proven practices for the whole company.

### Behavioral segments

Groups by behavior intensity built from several exports: how much a person writes, spends and what they do.

**How it differs from specialization:** segments overlap, one person can be in several, and they use thresholds instead of a single main feature.

| Segment | People | Details |
|---|---|---|
| Write code in any product | 44 | 19 of them outside technical teams |
| Heavy research in chat | 58 | 1,900+ messages on average |
| Agentic tasks | 33 | multi-step scenarios, connectors |
| Image generation | 21 | two thirds from one team |
| Fully inactive | 61 | 0 messages, $0 over the whole period |

Source: Users · Leaderboard

**Takeaway:**

**In this example:** Four segments give four directions to check:

- 58 people doing heavy research in chat: is a tool for finding and analyzing sources needed;
- 19 of the 44 people who write code work outside technical teams: a tool simpler than an IDE may fit;
- 21 people generate images, two thirds of them in one team: is the built-in generation enough;
- 33 people with agentic tasks: candidates for integrations and automation.

**In general:** Data shows what people do but not whether the current tool is enough for them. So each segment is a hypothesis to be checked in conversation.

**Next step:** For each segment, write one testable idea, for example "the 58 heavy researchers need a tool with source links". Talk to 2–3 people from the segment and make one decision: pilot, postpone, or close.

### Team comparison

Compares teams by adoption depth: what share of each team uses the tool regularly and how many messages one person writes on average.

| Team | Regular users | % | Msgs per person |
|---|---|---|---|
| Team A |  | 74% | 1,120 |
| Team B |  | 66% | 870 |
| Team C |  | 51% | 720 |
| Team D |  | 34% | 530 |
| Team E |  | 18% | 290 |

Source: Users · department and groups fields

**Takeaway:**

**In this example:** In Team A, 74% of people use the tool regularly; in Team E, 18%.

**In general:** A high share of regular use means the team already has working scenarios. A low share means barriers: access, training, or unsuitable tasks. A team with barriers is not ready for a new tool yet. Internal meetups carry a strong team's scenarios to other departments.

**Next step:** Run a meetup where Team A shows three of its scenarios and invite Teams D and E. Before the meetup, run 2–3 interviews about barriers in Team E.

## Nature of work

Which tasks people solve with the tool, with which built-in features, and through which integrations.

### Code and other tasks

The console itself splits tasks into two groups: code and knowledge work, meaning texts, analysis, research, design, anything that is not writing code. This is a check independent of our own labeling.

27% · code

73% · knowledge work

Source: Analytics: tasks · 30-day window

**Takeaway:**

**In this example:** 73% of tasks are knowledge work (texts, analysis, research), 27% are code.

**In general:** The console's classification shows which tasks the work goes to. It is produced independently of your labeling, which makes it a convenient check on your own conclusions.

**Next step:** Split the budget for new tools in roughly the same proportion: about a quarter for coding tools, the rest for knowledge work.

Task labeling is done by an OpenAI model on a sample of about 10% of requests over 30 days, with no people involved (OpenAI help). It is a sample-based estimate, so compare the numbers with your own labeling.

### Specialization

One label per active person: which built-in feature they use most, web search, file analysis or image generation.

**How it differs from segments:** each person gets exactly one label, and together they add up to all 279 active people.

131 · search and research

38

21

89 · other

Source: Users · messages with built-in tools

**Takeaway:**

**In this example:** 131 of 279 active people mostly search the web, 38 work with files, 21 generate images.

**In general:** If search is the main feature for most people, the tool has replaced their search engine, and answer quality depends on sources. A feature used by a minority is tested with a specific team first.

**Next step:** Take 5 of the 131 people whose main feature is search and compare the current tool with a specialized research tool on their real queries: time to answer and number of source errors.

### Connectors

Shows which external apps people connect the assistant to.

Slack 520

Notion 340

GitHub 210

Calendar 150

Source: Overview · "App interactions" block

**Takeaway:**

**In this example:** Slack and Notion account for 70% of all connections.

**In general:** Connectors give the model real documents and conversations, so it guesses less and hallucinates less. Teams without connectors work with the model blind.

**Next step:** Find teams with zero connections, ask in interviews where their working data lives, connect one such source, and compare answers on the same tasks before and after.

### Skills

Shows which skills are used and who builds their own.

spreadsheets 88

pdf 57

skill-creator 29

Source: Overview · "Skills" block

**Takeaway:**

**In this example:** 29 calls to skill-creator: some people already build their own skills.

**In general:** Skills signal maturity. Many skills in a department mean its processes are stable: a scenario is described once and repeats the same way. Such a department is ready to scale.

**Next step:** Collect skills into one list with their authors, pick the two most used, and move them to a neighboring department with a short demo by the author.

### Project themes

Groups projects by meaning: which tasks people run in ongoing projects.

| Theme | Projects | Largest project |
|---|---|---|
| Sales | 11 | Pitch library · Elif Demir |
| Onboarding | 8 | New hire guide · Rafael Costa |
| Market research | 5 | Competitor notes · Jonas Keller |

Source: Projects · names grouped by meaning

**Takeaway:**

**In this example:** Sales (11) and onboarding (8) have the most standing projects.

**In general:** A project is a knowledge base: files and instructions the model relies on in every answer. The fuller the base, the more accurate and stable the result. Projects sometimes reveal unexpected ways of using the tool that nobody knew about.

**Next step:** Open the three most active projects in each topic, check which files and instructions they hold, and ask the authors in interviews how these materials changed answer quality.

## Verification

The raw data behind every summary in the report: adoption depth, archetypes, segments, teams. Any number in the report can be traced back to its source row in an export.

### Full project list

All projects with author and status. It is used to check the theme summary and to find the author of a specific project.

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

The billing export for each person and product. Archetypes and top lists are calculated from it.

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

The final layer: specific names for each hypothesis.

### Interview candidates

A short list of people for each specialization found. The final list is 16 people out of 340; the table shows the first three.

| Person | Specialization | Signal |
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

Everyone, with filters by team, activity, specialization, and archetype.

Team B Activity: every week Archetype: Work

| Person | Team | Chat / Work | $ / 3 mo |
|---|---|---|---|
| Mira Castellano | Team B |  | 149.00 |
| Tomás Reid | Team B |  | 112.00 |

Source: the users, leaderboard and projects exports, joined by email

**Takeaway:**

**In this example:** The "Team B" and "Archetype: Work" filters left two people: Mira Castellano and Tomás Reid.

**In general:** A table of all people with filters by team, activity and archetype is the base for any next sample: a list for a new question needs no new export.

**Next step:** Save each set of filters as a separate table view so the next list takes one click.

## Where to start today

You do not need the whole report at once: the first useful result, a list of heavy users, appears after the second item.

Export users and the leaderboard for three months The leaderboard three times, once per product

Calculate archetypes and the top by amount The first list of heavy users is ready

**Calculate adoption depth:** At least once / regularly / every week, with those who pay without chat counted separately

Build a list of 16 people and schedule interviews How to pick these people is covered in "Who to interview"

## Further reading

Interviews

Who to interview

How to build an interview sample from the table of people

All names, teams, addresses, and numbers in the examples are fictional.
