---
title: ChatGPT Enterprise usage report for a company: who uses it, for what, and which AI tools to buy next
date: 2026-09-28
updated: 2026-10-04
description: How to find out how employees use ChatGPT Enterprise: five admin console exports turn into adoption depth, uniformity across teams, main tools, a task map, data checks and an interview shortlist.
tags: AI, research, analytics
category: research
layout: wide
image: /og/chatgpt-enterprise-usage-report.en.png
mentions: ChatGPT Enterprise, Codex, ChatGPT Work, Claude in Chrome
toc: why=Why the report | order=Workflow | data=What the admin sees | layer1=Big picture | layer2=Nature of work | layer3=Verification | layer4=People selection | start=Where to start | next=Further reading
---

<b-post series="kto">
<b-lead tight>ChatGPT Enterprise is a version of ChatGPT for organizations with an admin console that shows who uses the tool and how. This report is built from five console exports and shows adoption depth, uniformity across teams, the nature of tasks and the people to interview. It is used to decide which AI tools to buy, whom to train and which assumptions to test.</b-lead>
<b-dir-map label="Four areas of analysis">
  <dir href="#layer1" n="01" color="c-chat" t="Big picture" big="21%" sub="Use it every week" dec="Where to invest in training"><b-mini-funnel><seg w="82%" color="d-rare" ink="d-rare-t">82%</seg><seg w="47%" color="d-reg" ink="d-reg-t">47%</seg><seg w="21%" color="d-week" ink="d-week-t">21%</seg></b-mini-funnel></dir>
  <dir href="#layer2" n="02" color="c-work" t="Nature of work" big="70%" sub="Of connections are Slack and Notion" dec="Which tool to buy" art="chatgpt-enterprise-usage-report/map-donut"></dir>
  <dir href="#layer3" n="03" color="c-code" t="Verification" big="±2%" sub="Export reconciliation tolerance" dec="Can the numbers be trusted"><b-csv-check><file color="c-chat">CHAT</file><file color="c-work">WORK</file><file color="c-code">CODEX</file></b-csv-check></dir>
  <dir href="#layer4" n="04" color="c-proj" t="People selection" big="16" sub="Of 340 in the example — for interviews" dec="Who to talk to before buying"><b-dot-grid n="340" on="5,31,58,77,96,120,141,163,187,205,226,248,269,290,311,333"/></dir>
</b-dir-map>
<b-chapter id="why" title="Which decisions the report helps make">
  <b-lead-large><b>Business task:</b> find out for which work tasks the current set of AI tools falls short and which solutions are worth testing before buying. The decision is made by the owner of the AI tools budget together with the leads of the teams where the pilot runs. Data access and security are approved by the information security team. The decision criteria are the signs in the table below.</b-lead-large>

  That the current set is suboptimal somewhere is an assumption: the report and the interviews test it. "Suboptimal" breaks down into testable signs. The conclusion "no new tool is needed" is also a result.

  <b-table id="signs">
    <table><thead>
    <tr><th>Sign</th><th>How it shows</th><th>Interview category</th><th>Where the report shows it</th></tr>
    </thead><tbody>
    <tr><td>Result quality</td><td>answers are inaccurate or made up</td><td><b-tag kind="no" line>hallucinations</b-tag></td><td><a href="/en/blog/chatgpt-enterprise-usage-report/#connectors">Connectors</a></td></tr>
    <tr><td>Time and manual rework</td><td>a lot of back-and-forth, the result is finished by hand</td><td><b-tag kind="no" line>prompt</b-tag></td><td><a href="/en/blog/chatgpt-enterprise-usage-report/#depth">Depth</a>, <a href="/en/blog/chatgpt-enterprise-usage-report/#main-tool">Main tool</a></td></tr>
    <tr><td>Reproducibility</td><td>a different result on the same task every time</td><td><b-tag kind="no" line>reproducibility</b-tag></td><td><a href="/en/blog/chatgpt-enterprise-usage-report/#skills">Skills</a>, <a href="/en/blog/chatgpt-enterprise-usage-report/#projects">Project themes</a></td></tr>
    <tr><td>Scale</td><td>a working scenario does not transfer to another team</td><td><b-tag kind="no" line>scale</b-tag></td><td><a href="/en/blog/chatgpt-enterprise-usage-report/#uniformity">Uniformity</a></td></tr>
    <tr><td>Data access</td><td>the needed system is not connected</td><td><b-tag kind="no" line>data access</b-tag></td><td><a href="/en/blog/chatgpt-enterprise-usage-report/#connectors">Connectors</a></td></tr>
    <tr><td>Cost</td><td>expensive per unit of result</td><td><b-tag kind="no" line>cost</b-tag></td><td><a href="/en/blog/chatgpt-enterprise-usage-report/#top-spend">Top by spend</a></td></tr>
    </tbody></table>
  </b-table>
  <b-cap>Data limits: the report only sees the corporate tool and only for the export period, 3 months. Personal accounts and other tools do not show up in it.</b-cap>
  <b-section-title id="decision" top="22">How answers turn into a purchase decision</b-section-title>
  <b-why>The report shows where to look, and the purchase decision is made only after these five steps, so the money goes to a task many people have and nothing covers today.</b-why>
  <b-steps top="18" round>
    <step t="Interviews">Which tasks and difficulties exist and how people work around them now</step>
    <step t="Company-wide questionnaire">How many people face a difficulty, how often, and how much it gets in the way</step>
    <step t="Compare">Task scale, severity of consequences, workarounds, cost of the solution</step>
    <step t="Test tools">Promising options on real tasks together with employees</step>
    <step t="Decision">The budget owner decides by the six <a href="#signs">signs above</a>: quality, time and rework, reproducibility, scale, data access, cost; "no new tool is needed" is a valid outcome</step>
  </b-steps>
  <b-io justify>
    <item k="Input">Console exports: messages, spend, projects, and connectors for each person</item>
    <item k="What the report does">Turns exports into segments, team maturity, and specific people as material for a decision</item>
    <item k="Decisions at the output">Which tool to pilot, for which team, who to talk to before buying, and where budget is not needed</item>
  </b-io>
</b-chapter>
<b-chapter id="order" title="Workflow">

  Five steps from export to a finished list of people.

  <b-steps top="18" round>
    <step t="Export the data">Five console sections, details in "Where to get the data"</step>
    <step t="Build the big picture">Adoption depth, uniformity across teams, main tool, segments</step>
    <step t="Map the nature of work">Which tasks people solve, with which built-in tools, and with which integrations</step>
    <step t="Check against raw data">Verify each summary against the source export</step>
    <step t="Select people and draw conclusions">An interview list and the questions to test in them<b-link-chips><item href="/en/blog/who-to-interview-before-buying-ai-tools/" icon="arrow-right">Who to interview</item><item href="/en/blog/ai-interviews-without-leading-questions/" icon="arrow-right">How to run the interviews</item></b-link-chips></step>
  </b-steps>
</b-chapter>
<b-chapter id="data" title="What a ChatGPT Enterprise admin sees: where to get the data">

  Everything is built from five sections of a single <a href="https://openai.com/chatgpt/enterprise/" target="_blank" rel="noopener">ChatGPT Enterprise</a> admin console. Hover over <b>i</b> to see exactly what each section contains.

  <b-subhead>How to export data from the ChatGPT Enterprise console: by hand and with the Claude in Chrome browser agent</b-subhead>
  <b-howto><b>How to export.</b> The console does have APIs, but they cover only part of the data: <a href="https://learn.chatgpt.com/docs/enterprise/analytics-api" target="_blank" rel="noopener">Codex analytics</a>, credit costs, and conversation logs for compliance. The users, projects and skills exports and the per-product leaderboard are easier to collect in the interface. Exporting is a good job for <a href="https://claude.com/claude-in-chrome" target="_blank" rel="noopener">Claude in Chrome</a>: it opens the right section, sets the filter, clicks export, and saves the CSV. Every step is visible on screen, so a wrong filter or section is caught immediately, before the numbers reach the report.<warn icon="shield-alert"><b>Access.</b> The console API is not always available: company security policies often restrict admin API keys. In that case, export every section through the interface.</warn></b-howto>
  <b-sources>
    <src icon="users-alt" href="https://chatgpt.com/admin/usage/users" t="Users" path="chatgpt.com/admin/usage/users" what="Messages, activity dates, and built-in tools for each person" tip-label="What is inside the Users section">CSV export for a period of up to 12 months. Fields: messages, tool_messages, gpt_messages, project_messages, department, groups, seat_type, last_day_active. The console itself marks "power users" with a badge.</src>
    <src icon="trophy" href="https://admin.openai.com" t="Leaderboard" path="admin.openai.com → Analytics → Leaderboard" what="Spend, tokens, and lines of code for each person, separately for the Chat, Work, and Codex products" tip-label="What is inside the Leaderboard">Export button next to the heading → "User ranking", CSV or JSON. Fields: Name, Email, Credits, Estimated costs, Tokens, Lines of code. The "Product" filter changes what the export contains. History covers about 120 days.</src>
    <src icon="folder-iv" href="https://chatgpt.com/admin/usage/projects" t="Projects" path="chatgpt.com/admin/usage/projects" what="Who created a project, how many messages it has, and whether it is active" tip-label="What is inside the Projects section">Fields: project_name, project_creator_email, messages_workspace, unique_messagers_workspace, is_active. Some names come through as [content redacted]: the console hides them on its own.</src>
    <src icon="plug-alt" href="https://chatgpt.com/admin/usage" t="Overview: connectors and skills" path="chatgpt.com/admin/usage" what="Which apps people connect the assistant to and which skills they use" tip-label="What is inside the Overview section">The "App interactions" and "Skills" blocks: the number of calls to each connector and skill over the selected period.</src>
    <src icon="chart-line-iv" href="https://admin.openai.com" t="Analytics: tasks" path="admin.openai.com → Analytics → Tasks" what="The console's own task classification: code or knowledge work (everything except code)" tip-label="What is inside the Tasks tab">Share of code and knowledge work, top tasks by credits. An OpenAI model labels tasks on a sample of about 10% of requests over 30 days.</src>
  </b-sources>
</b-chapter>
<b-chapter id="layer1" icon="grid" title="Big picture">

  The next four sections are the report itself, each with its goal. <b>Goal:</b> show which groups of people exist in the company and how large they are.

  <b-subsection id="depth" title="Adoption depth">
    <b-art-row names="chatgpt-enterprise-usage-report/depth-tried chatgpt-enterprise-usage-report/depth-regular chatgpt-enterprise-usage-report/depth-weekly"/>
    <b-why>Adoption depth shows how deeply the tool has entered the company's work: how many people have used it at least once, regularly, and every week. Those who never write in chat and work only through Codex are shown separately. <b>Decision:</b> which group to invest training in and whether to buy more licenses now.</b-why>
    <b-share-bar kind="wide">
      <seg w="20.9%" color="d-week" ink="d-week-t">71</seg>
      <seg w="25.9%" color="d-reg" ink="d-reg-t">88</seg>
      <seg w="28.5%" color="d-rare" ink="d-rare-t">97</seg>
      <seg w="6.8%" color="d-api" ink="d-api-t">23</seg>
      <seg w="17.9%" color="d-none" ink="d-none-t">61</seg>
    </b-share-bar>
    <b-legend>
      <item color="d-week">every week</item>
      <item color="d-reg">regularly</item>
      <item color="d-rare">occasionally</item>
      <item color="d-api">Codex only</item>
      <item color="d-none">fully inactive</item>
    </b-legend>
    <b-cap>340 people</b-cap>
    <b-cap>Source: <a href="https://chatgpt.com/admin/usage/users" target="_blank" rel="noopener">Users</a> · <a href="https://admin.openai.com" target="_blank" rel="noopener">Leaderboard</a> for those who work only through Codex</b-cap>
    <b-finding>
      <ex>82% of people have tried the tool, 47% use it in their work, and for 21% it has become a weekly habit. The room to grow depth is the 97 people in the "occasionally" group.</ex>
      <gen>The gap between "tried it" and "use it every week" shows how many people stopped after the first attempts. The benchmark for mass adoption is 50–70% of employees using it in daily work. Until adoption reaches that benchmark, more licenses will not drive growth: something other than access is holding people back.</gen>
      <do>Put training into the largest group between "tried it" and "every week": it gives the fastest growth in regular use. Recount the breakdown after the training to see where people moved.</do>
    </b-finding>
    <b-info-note icon="flag-alt-iv"><b>Important.</b> Pick 5–10 people from the "occasionally" group, find out in interviews how they get their tasks done now, and run a review of real work cases with them. Recount the weekly share after the review. How to ask without suggesting the answer is covered in <a href="/en/blog/ai-interviews-without-leading-questions/">"How to interview people about their AI use"</a>.</b-info-note>
  </b-subsection>
  <b-subsection id="uniformity" title="Uniformity">
    <b-art-row names="chatgpt-enterprise-usage-report/team-groups" cols="1"/>
    <b-why>Uniformity shows how evenly the tool has entered different teams: what share of each team uses it regularly and how many messages one person writes on average. <b>Decision:</b> which team to take working scenarios from and which team to bring them to first.</b-why>
    <b-table>
      <table><thead>
      <tr><th>Team</th><th>Regular users</th><th class="bk-r">%</th><th class="bk-r">Msgs per person</th></tr>
      </thead><tbody><b-table-group color="d-week" span="4">Strong · source of scenarios</b-table-group>
      <tr><td>Team A</td><td><b-bar value="74" min="120"/></td><td class="bk-r">74%</td><td class="bk-r">1,120</td></tr>
      <tr><td>Team B</td><td><b-bar value="66" min="120"/></td><td class="bk-r">66%</td><td class="bk-r">870</td></tr><b-table-group color="d-reg" span="4">Middle</b-table-group>
      <tr><td>Team C</td><td><b-bar value="51" min="120"/></td><td class="bk-r">51%</td><td class="bk-r">720</td></tr><b-table-group color="d-rare" span="4">Lagging · where to bring scenarios</b-table-group>
      <tr><td>Team D</td><td><b-bar value="34" min="120"/></td><td class="bk-r">34%</td><td class="bk-r">530</td></tr>
      <tr><td>Team E</td><td><b-bar value="18" min="120"/></td><td class="bk-r">18%</td><td class="bk-r">290</td></tr>
      </tbody></table>
    </b-table>
    <b-cap>Source: <a href="https://chatgpt.com/admin/usage/users" target="_blank" rel="noopener">Users</a> · department and groups fields</b-cap>
    <b-finding>
      <ex>In Team A, 74% of people use the tool regularly; in Team E, 18%: a spread of 56 percentage points.</ex>
      <gen>A large spread between teams means working scenarios already exist but live in one or two teams: moving them is cheaper than buying something new. A uniformly low share across all teams points to a shared barrier: access, training, or unsuitable tasks. A uniformly high share means the tool has taken root and you can move to the next step. A team with barriers is not ready for a new tool yet.</gen>
      <do>With a large spread, run a meetup: the strongest team shows three of its scenarios to the two weakest. Before the meetup, run 2–3 interviews about barriers in the weakest team. Recount the spread after the meetup: it should shrink.</do>
    </b-finding>
  </b-subsection>
  <b-subsection id="main-tool" title="Main tool">
    <b-why>Which of the three tools takes more than half of a person's spend over three months. The tool type shows how the person works with AI.</b-why>
    <b-tool-types>
      <prob title="many messages per task; ">Prompt</prob>
      <prob title="few app connections; ">Hallucinations</prob>
      <prob title="the same tasks without projects or skills; ">Reproducibility</prob>
      <prob title="skills are built in one team only; ">Scale</prob>
      <tool n="1" href="https://openai.com/chatgpt/enterprise/" color="c-chat" t="Chat" art="chatgpt-enterprise-usage-report/tool-chat" on="1,2,3,4"/>
      <tool n="2" href="https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex" color="c-work" t="Work" art="chatgpt-enterprise-usage-report/tool-work" on="3,4"/>
      <tool n="3" href="https://openai.com/codex/" color="c-code" t="Codex" art="chatgpt-enterprise-usage-report/tool-codex" on=""/>
    </b-tool-types>
    <b-share-bar kind="wide">
      <seg w="48.2%" color="c-chat">164 · Chat</seg>
      <seg w="13.8%" color="c-work">47 · Work</seg>
      <seg w="11.2%" color="c-code">38 · Codex</seg>
      <seg w="26.8%" color="c-none" ink="ink">91 · no spend</seg>
    </b-share-bar>
    <b-cap>340 people, 3-month window</b-cap>
    <b-cap>Source: <a href="https://admin.openai.com" target="_blank" rel="noopener">Leaderboard</a> · three exports: "Product" filter = Chat, Work, Codex</b-cap>
    <b-finding>
      <ex>Chat is the main product for 164 of 340 people, Codex for 38, Work for 47.</ex>
      <gen>The main tool shows the type of work: a conversation, a task handed to an agent, or code. It determines what the person needs next and which pilot to put them in. Group size sets pilot size: a wide pilot for a common scenario, a narrow one for a rare scenario.</gen>
      <do>The decision is to move each group to the next step. For the Chat group: Work with connectors and MCP to work data, which removes prompting and hallucinations. For the Work group: specs, harness setup and shared skills, which make the result reproducible and transferable to other teams.</do>
    </b-finding>
  </b-subsection>
  <b-subsection id="top-spend" title="Top by spend">
    <b-art-row names="chatgpt-enterprise-usage-report/spend-few chatgpt-enterprise-usage-report/spend-mentor chatgpt-enterprise-usage-report/spend-experiment"/>
    <b-why>The top list ranks people by the amount spent on a specific product, for example Codex. This way the list includes someone who spends a lot on Codex even if most of their spend goes to Chat.</b-why>
    <b-table>
      <table><thead>
      <tr><th>Person</th><th>Team</th><th class="bk-r">$ on code / 3 mo</th><th class="bk-r">Tokens / 3 mo</th><th class="bk-r">Tokens per $</th></tr>
      </thead><tbody>
      <tr><td>Hana Sato</td><td>Team C</td><td class="bk-r">438.20</td><td class="bk-r">21.9M</td><td class="bk-r">50K</td></tr>
      <tr><td>Luis Moreno</td><td>Team A</td><td class="bk-r">395.60</td><td class="bk-r">12.7M</td><td class="bk-r">32K</td></tr>
      <tr><td>Ada Kowalski</td><td>Team D</td><td class="bk-r">84.30</td><td class="bk-r">4.3M</td><td class="bk-r">51K</td></tr>
      </tbody></table>
    </b-table>
    <b-cap>Source: <a href="https://admin.openai.com" target="_blank" rel="noopener">Leaderboard</a> · one export per product</b-cap>
    <b-finding>
      <ex>Hana Sato and Luis Moreno spend about five times more on code than the third person on the list. With similar spend, Hana gets one and a half times more tokens per dollar than Luis.</ex>
      <gen>Top users are change agents: they find working scenarios first, and their experience affects whether a specialized tool pays off. Next to them are more cautious colleagues who need more time and a live example on their own tasks. Ranking by share of spend hides the change agents, so look at absolute spend.</gen>
      <do>Involve top users as mentors: let them show their scenarios to colleagues who are just starting, on those colleagues' tasks. Invite cautious colleagues through examples and results, without mandates. Offer the top two or three an experiment in a specialized tool with a before-and-after report.</do>
    </b-finding>
    <b-info-note icon="chart-bar">The leaderboard has both spend and tokens. Compare the tokens-to-spend ratio within one group: one product and similar tasks. Whoever gets noticeably more tokens per dollar usually picks models and modes better. These are the most advanced and efficient users, and they are the first to invite as mentors. Introduce them to colleagues from the same group whose ratio is lower: working through one task together often gives more than a general training. Pairs from different teams bring cross-pollination: good techniques move between teams.</b-info-note>
    <b-info-note icon="info">During rollout, top users can spend an order of magnitude more than everyone else. It is better not to introduce limits at this stage: they easily demotivate the people who adopt the tool first. Instead of limits, agree on experiments and a results report. Limits make sense later, once practices are proven and the normal cost of a scenario is clear.</b-info-note>
  </b-subsection>
  <b-subsection id="segments" title="Behavioral segments">
    <b-art-chain label="segment → interview → problem → tool">
      <step art="chatgpt-enterprise-usage-report/chain-segment">segment</step>
      <step art="chatgpt-enterprise-usage-report/chain-custdev">interview</step>
      <step art="chatgpt-enterprise-usage-report/chain-problem">problem</step>
      <step art="chatgpt-enterprise-usage-report/chain-tool">tool</step>
    </b-art-chain>
    <b-why>Groups by behavior intensity built from several exports: how much a person writes, spends and what they do.</b-why>
    <b-table>
      <table><thead>
      <tr><th>Segment</th><th class="bk-r">People</th><th>Details</th></tr>
      </thead><tbody>
      <tr><td>Write code in any product</td><td class="bk-r">44</td><td>19 of them outside technical teams</td></tr>
      <tr><td>Intensive research in chat</td><td class="bk-r">58</td><td>1,900+ messages on average</td></tr>
      <tr><td>Agentic tasks</td><td class="bk-r">33</td><td>multi-step scenarios, connectors</td></tr>
      <tr><td>Image generation</td><td class="bk-r">21</td><td>two thirds from one team</td></tr>
      <tr><td>Fully inactive</td><td class="bk-r">61</td><td>0 messages, $0 over the whole period</td></tr>
      </tbody></table>
    </b-table>
    <b-cap>Source: <a href="https://chatgpt.com/admin/usage/users" target="_blank" rel="noopener">Users</a> · <a href="https://admin.openai.com" target="_blank" rel="noopener">Leaderboard</a></b-cap>
    <b-finding>
      <ex>The largest segments for customer interviews are intensive research (58) and code (44, 19 of them outside technical teams). For the 61 inactive people the question is different: what stops them from starting.</ex>
      <gen>Data shows what people do but not whether the current tool is enough for them. So a segment is a hypothesis: it suggests whom to invite to customer interviews, which questions to ask, and what problems people may run into. Tool candidates appear already here, and the choice between them is made after the interviews, for a confirmed problem.</gen>
      <do>For each segment, talk to 2–3 people: where the current tool falls short and what they still do by hand. Gather candidates for a confirmed problem from three sources: consultations with innovators inside the company, outside experts, and market benchmarks, meaning what similar companies use. Next, follow the <a href="#decision">decision procedure</a>: questionnaire, comparison, and testing candidates on real tasks. If the problem is not confirmed, postpone the segment until the next recount.</do>
    </b-finding>
  </b-subsection>
</b-chapter>
<b-chapter id="layer2" icon="briefcase" title="Nature of work">

  <b>Goal:</b> show which tasks people solve with the tool, with which built-in features, and through which integrations.

  <b-subsection id="connectors" title="Connectors">
    <b-art-row names="chatgpt-enterprise-usage-report/conn-guess chatgpt-enterprise-usage-report/conn-data chatgpt-enterprise-usage-report/conn-errors" arrows/>
    <b-why>Connectors link the assistant to work data: chats, documents, code, calendars. They determine the volume of hallucinations: without access to data, the model fills in the answer itself. <b>Decision:</b> which teams and which systems to connect first.</b-why>
    <b-count-bars>
      <bar k="Slack" w="100%" color="c-work">520</bar>
      <bar k="Notion" w="65%" color="c-work">340</bar>
      <bar k="GitHub" w="40%" color="c-work">210</bar>
      <bar k="Calendar" w="29%" color="c-work">150</bar>
    </b-count-bars>
    <b-cap>Source: <a href="https://chatgpt.com/admin/usage" target="_blank" rel="noopener">Overview</a> · "App interactions" block</b-cap>
    <b-finding>
      <ex>Slack and Notion account for 70% of all connections. The model does not see systems outside this list: it answers questions about them with a guess.</ex>
      <gen>The volume of hallucinations drops where the model has the context it needs. Without it, the agent tries to fill the gap on its own. Teams with zero connections work with the model blind, and almost any answer about their processes is a guess. The sign in a customer interview: "I have to double-check everything".</gen>
      <do>Find teams with zero connections and ask in interviews where their work data lives. Connect one such source and compare before and after on 10 identical questions: how many answers are wrong and how many rely on work data.</do>
    </b-finding>
  </b-subsection>
  <b-subsection id="skills" title="Skills">
    <b-art-row names="chatgpt-enterprise-usage-report/skill-adhoc chatgpt-enterprise-usage-report/skill-repeat chatgpt-enterprise-usage-report/shared-skill" arrows/>
    <b-why>Skills show process maturity: a scenario once described as a skill repeats the same way for anyone who runs it. The stats show which skills are used and who builds their own. <b>Decision:</b> which processes can already be rolled out to other teams, and which still depend on individual people.</b-why>
    <b-count-bars>
      <bar k="spreadsheets" w="100%" color="c-code">88</bar>
      <bar k="pdf" w="65%" color="c-code">57</bar>
      <bar k="skill-creator" w="33%" color="c-code">29</bar>
    </b-count-bars>
    <b-cap>Source: <a href="https://chatgpt.com/admin/usage" target="_blank" rel="noopener">Overview</a> · "Skills" block</b-cap>
    <b-finding>
      <ex>The spreadsheet and PDF skills have 88 and 57 calls: these processes are already reproducible. 29 calls to skill-creator: some people are turning their scenarios into skills.</ex>
      <gen>Process maturity grows in steps: one-off requests → a personal skill → a shared team skill. At the first step, the result depends on who asked and how. With a skill it is reproducible: the same input gives the same result. A shared skill makes the process transferable to other teams.</gen>
      <do>Collect skills into one list with their authors and mark the step of each process. Turn the two most used personal skills into shared ones: the author shows them to a neighboring team, and the team checks that the same inputs give the same result. Scenarios without a skill that repeat every week are the first candidates for new skills.</do>
    </b-finding>
  </b-subsection>
  <b-subsection id="projects" title="Project themes">
    <b-art-row names="chatgpt-enterprise-usage-report/proj-files chatgpt-enterprise-usage-report/proj-topics chatgpt-enterprise-usage-report/proj-author" arrows/>
    <b-why>The summary groups projects by meaning and shows the concrete tasks people run in ongoing projects. For customer interviews this is a ready list: which tasks to discuss and with whom. <b>Decision:</b> which tasks and whose projects to cover in interviews first.</b-why>
    <b-table>
      <table><thead>
      <tr><th>Theme</th><th class="bk-r">Projects</th><th>Tasks</th><th>Question for the author</th></tr>
      </thead><tbody>
      <tr><td>Sales<b-cell-sub>Pitch library · Elif Demir</b-cell-sub></td><td class="bk-r">11</td><td>pitches, objection handling, commercial proposals</td><td><b-cell-quote>"Which part of a pitch does the model do well, and what do you rewrite?"</b-cell-quote></td></tr>
      <tr><td>Onboarding<b-cell-sub>New hire guide · Rafael Costa</b-cell-sub></td><td class="bk-r">8</td><td>guides for newcomers, answers to typical questions</td><td><b-cell-quote>"Which newcomer questions does the model already handle without you?"</b-cell-quote></td></tr>
      <tr><td>Market research<b-cell-sub>Competitor notes · Jonas Keller</b-cell-sub></td><td class="bk-r">5</td><td>competitor summaries, price comparisons</td><td><b-cell-quote>"Where do you get the data, and how quickly does it go stale?"</b-cell-quote></td></tr>
      </tbody></table>
    </b-table>
    <b-cap>Source: <a href="https://chatgpt.com/admin/usage/projects" target="_blank" rel="noopener">Projects</a> · names grouped by meaning</b-cap>
    <b-finding>
      <ex>Sales (11) and onboarding (8) have the most standing projects. The authors of the largest projects are the first people to interview.</ex>
      <gen>A project is a knowledge base: files and instructions the model relies on in every answer. The fuller the base, the more accurate and stable the result. What a project contains suggests what to ask in an interview: which files were added, what is missing, and where answers still need fixing.</gen>
      <do>Open the three most active projects in each theme and list the concrete tasks. In the interview, ask the author the question from the table and which files and instructions changed answer quality the most. Turn a successful project setup into a template for that theme.</do>
    </b-finding>
  </b-subsection>
</b-chapter>
<b-chapter id="layer3" icon="check-circle-alt-iv" title="Verification">

  <b>Goal:</b> check the summaries against the raw exports, the project list and the leaderboard. Any number in the report can be traced back to its source row in an export.

  <b-subsection title="Full project list">
    <b-why>All projects with author and status. This list is used to check the theme summary and to find the author of a specific project.</b-why>
    <b-table>
      <table><thead>
      <tr><th>Project</th><th>Author</th><th>Status</th><th class="bk-r">Msgs</th></tr>
      </thead><tbody>
      <tr><td>Pitch library</td><td>Elif Demir</td><td><b-status-dot color="c-work">active</b-status-dot></td><td class="bk-r">268</td></tr>
      <tr><td>Price list 2026</td><td>Oskar Berg</td><td><b-status-dot color="c-work">active</b-status-dot></td><td class="bk-r">64</td></tr>
      <tr><td>Personal draft</td><td>Pavel Novak</td><td><b-status-dot color="c-none">abandoned</b-status-dot></td><td class="bk-r">0</td></tr>
      </tbody></table>
    </b-table>
    <b-cap>Source: <a href="https://chatgpt.com/admin/usage/projects" target="_blank" rel="noopener">Projects</a></b-cap>
    <b-finding>
      <ex>The "Personal draft" project has zero messages.</ex>
      <gen>An empty project is an abandoned attempt: the person started, but the tool never became part of their work. If such projects stay in, the topic summary overstates usage.</gen>
      <do>Filter out projects with zero messages before counting and invite 2–3 of their authors: the reason they quit is a valuable answer.</do>
    </b-finding>
  </b-subsection>
  <b-subsection title="Leaderboard">
    <b-why>The billing export for each person and product. Main tools and top lists are calculated from it.</b-why>
    <b-table>
      <table><thead>
      <tr><th>Name</th><th>Email</th><th class="bk-r">Credits</th><th class="bk-r">$</th></tr>
      </thead><tbody>
      <tr><td>Hana Sato</td><td>hana@example.com</td><td class="bk-r">10,955</td><td class="bk-r">438.20</td></tr>
      <tr><td>Mira Castellano</td><td>mira@example.com</td><td class="bk-r">2,425</td><td class="bk-r">97.00</td></tr>
      <tr><td>Jonas Keller</td><td>jonas@example.com</td><td class="bk-r">470</td><td class="bk-r">18.80</td></tr>
      </tbody></table>
    </b-table>
    <b-cap>Source: <a href="https://admin.openai.com" target="_blank" rel="noopener">Leaderboard</a> · three exports with different "Product" filters</b-cap>
    <b-finding>
      <ex>The three product exports add up to the total spend of each person on the list.</ex>
      <gen>The three exports with different Product filters add up to each person's total spend. A gap above 2% means an export is incomplete or the periods differ.</gen>
      <do>Before sharing the report, sum the three exports per person and compare with total spend. If they differ, re-export the data for the same period.</do>
    </b-finding>
  </b-subsection>
</b-chapter>
<b-chapter id="layer4" icon="target" title="People selection">

  <b>Goal:</b> name specific people for each way of getting tasks done.

  <b-subsection id="candidates" title="Interview candidates">
    <b-why>A short list of people for each direction found. In the example the final list is 16 people out of 340; the table shows the first three. Your company will have its own number. The ChatGPT report is one of the sample sources: users of other tools and people who quit are added by the rules in <a href="/en/blog/who-to-interview-before-buying-ai-tools/#groups">"Who to interview"</a>, and the check across all employees is done with a <a href="/en/blog/ai-interviews-without-leading-questions/#form">questionnaire</a>.</b-why>
    <b-table>
      <table><thead>
      <tr><th>Person</th><th>Direction</th><th class="bk-r">Signal</th></tr>
      </thead><tbody>
      <tr><td>Hana Sato</td><td><b-status-dot color="c-code">code</b-status-dot></td><td class="bk-r">$438 / 3 mo</td></tr>
      <tr><td>Mira Castellano</td><td><b-status-dot color="c-work">agentic tasks</b-status-dot></td><td class="bk-r">$97 / 3 mo</td></tr>
      <tr><td>Jonas Keller</td><td><b-status-dot color="c-chat">research</b-status-dot></td><td class="bk-r">3,200+ msgs</td></tr>
      </tbody></table>
    </b-table>
    <b-cap>Source: the users, leaderboard and projects exports, joined by email</b-cap>
    <b-finding>
      <ex>Hana Sato, Mira Castellano, and Jonas Keller represent three different ways of working: code, agentic tasks, and research.</ex>
      <gen>The shortlist has one person per direction: code, agent tasks, research. Each conversation then shows its own way of working and does not repeat another one.</gen>
      <do>Schedule three interviews, one per direction. Afterwards, decide which direction needs 2–3 more people.</do>
    </b-finding>
  </b-subsection>
  <b-subsection id="people" title="Table of all people">
    <b-why>Everyone, with filters by team, activity, direction, and main tool.</b-why>
    <b-filter-chips>
      <f>Team B</f>
      <f>Activity: every week</f>
      <f on>Tool: Work</f>
    </b-filter-chips>
    <b-table>
      <table><thead>
      <tr><th>Person</th><th>Team</th><th>Chat / Work</th><th class="bk-r">$ / 3 mo</th></tr>
      </thead><tbody>
      <tr><td>Tomás Reid</td><td>Team B</td><td><b-split-bar parts="c-chat:28% c-work:72%"/></td><td class="bk-r">112.00</td></tr>
      <tr><td>Mira Castellano</td><td>Team B</td><td><b-split-bar parts="c-chat:35% c-work:65%"/></td><td class="bk-r">97.00</td></tr>
      </tbody></table>
    </b-table>
    <b-cap>Source: the users, leaderboard and projects exports, joined by email</b-cap>
    <b-finding>
      <ex>The "Team B" and "Tool: Work" filters left two people: Mira Castellano and Tomás Reid.</ex>
      <gen>A table of all people with filters by team, activity and main tool is the base for any next sample: a list for a new question needs no new export.</gen>
      <do>Save each set of filters as a separate table view so the next list takes one click.</do>
    </b-finding>
  </b-subsection>
</b-chapter>
<b-chapter id="start" title="Where to start today">

  You do not need the whole report at once: the first useful result, a list of most active users, appears after the second item.

  <b-checklist>
    <item t="Export users and the leaderboard for three months">The leaderboard three times, once per product. A browser agent can do the export<b-link-chips><item href="https://claude.com/claude-in-chrome" icon="arrow-up-right">Claude in Chrome</item><item href="https://support.google.com/gemini/answer/16821166" icon="arrow-up-right">Gemini in Chrome</item><item href="https://www.perplexity.ai/comet" icon="arrow-up-right">Perplexity Comet</item></b-link-chips></item>
    <item t="Calculate main tools and the top by amount">The first list of most active users is ready</item>
    <item t="Calculate adoption depth">At least once / regularly / every week, with those who work only through Codex counted separately</item>
    <item t="Build a list of people and schedule interviews">How to pick these people is covered in "Who to interview"</item>
  </b-checklist>
  <b-sublabel top="22">Common questions</b-sublabel>
  <b-qa>
    <q t="What the ChatGPT Enterprise admin console shows">Five sections: users, leaderboard, projects, overview and tasks. They give adoption depth, uniformity across teams, the main tool, the nature of tasks and a check against raw data.</q>
    <q t="How to export data from the console">The console has APIs, but they cover only part of the data: Codex analytics, credit costs and conversation logs for compliance. The users, projects and skills exports and the per-product leaderboard are easier to collect in the interface, and the export can be handed to Claude in Chrome.</q>
    <q t="How to tell whether new licenses are needed">Adoption depth shows how many people use the tool at least once, regularly and every week. It decides which group to train and whether to buy new licenses now.</q>
    <q t="How to choose people to interview">People are picked for each direction found: in the example the final list is 16 people out of 340. Users of other tools and those who stopped are added by the rules in <a href="/en/blog/who-to-interview-before-buying-ai-tools/">“Who to interview”</a>.</q>
  </b-qa>
</b-chapter>
<b-chapter id="next" title="Further reading">
  <b-links>
    <item href="/en/blog/who-to-interview-before-buying-ai-tools/" k="Interviews" t="Who to interview">How to build an interview sample from the table of people</item>
    <item href="/en/blog/ai-interviews-without-leading-questions/" k="Interviews" t="How to interview people about their AI use">A call, a survey and one Airtable table</item>
  </b-links>
</b-chapter>
<b-footer>All names, teams, addresses, and numbers in the examples are fictional.</b-footer>
</b-post>
