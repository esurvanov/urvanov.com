---
title: How to run and analyze interviews about AI use: a 30-minute script, an analysis prompt and an Airtable table
date: 2026-09-28
description: A 30-minute call script, rules for staying on topic, a short company-wide questionnaire, interview analysis with ChatGPT or an agent using a ready prompt, and a said-versus-measured check against the report data.
tags: AI, custdev, interviews
category: research
layout: wide
image: /og/ai-interviews-without-leading-questions.en.png
mentions: Airtable, tl;dv, ChatGPT, Claude Code, Model Context Protocol
toc: format=Choosing a format | prep=Preparing for the meeting | script=A 30-minute script | focus=Staying on topic | base=Logging in Airtable | agent=With Claude Code | wording=Text: wording | form=Questionnaire | after=Interview analysis | next=Further reading
---

<b-post series="intervyu">
<b-credit para>Interview design based on recommendations from <a href="https://t.me/Kseniya_Vasil" target="_blank" rel="noopener">@Kseniya_Vasil</a>. People, groups and numbers for the interviews come from the <a href="/en/blog/chatgpt-enterprise-usage-report/">ChatGPT Enterprise usage report</a>. It also holds the <a href="/en/blog/chatgpt-enterprise-usage-report/#why">business task</a>: what the company decides, who decides, and by which signs.</b-credit>
<b-lead tight>Here the analysis takes four steps: the conversation text goes to ChatGPT with the same prompt every time, the answer is copied into the person’s row, the table is grouped by difficulty, and repeats are checked with a company-wide questionnaire. What people say is compared with the report data. Below: the call script, the table and the <a href="#after">analysis prompt</a>.</b-lead>
<b-flow label="Two interview formats converge in one table">
  <b-lane title="Voice" color="c-chat">
    <node icon="phone" t="Call">30 min</node>
    <node icon="record" t='<a href="https://tldv.io/" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline;text-underline-offset:3px">tl;dv</a> · <a href="https://www.granola.ai/" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline;text-underline-offset:3px">Granola</a>'>Notes</node>
    <node icon="file-text" t="Transcript">Into Notes</node>
  </b-lane>
  <b-lane title="Text" color="c-work">
    <node icon="doc-lines" t="Questions">In chat</node>
    <node icon="chat" t="Follow-up">1 message</node>
    <node icon="file-text" t="Chat log">Copied to Notes</node>
  </b-lane>
  <b-drop-arrows n="2"/>
  <b-airtable-preview icon="table" title='<a href="https://airtable.com" target="_blank" rel="noopener">Airtable</a>' sub="Everything in one table" count="16 records">
    <col w="1.1fr" mw="1.2fr">Name</col>
    <col w="1.7fr" kind="note">Notes</col>
    <col w=".9fr" kind="wide">Format</col>
    <col w="1fr" mw="1fr" kind="ours">Frequency, self-reported</col>
    <col w="1fr" mw="1fr">Per report</col>
    <col w=".9fr" kind="wide">Status</col>
    <row>Hana Sato | Host [00:00]: Think back to the last… | <b-select-pill tone="cyan">voice</b-select-pill> | <b-select-pill tone="green">weekly</b-select-pill> | <b-select-pill tone="green">weekly</b-select-pill> | <b-select-pill tone="green">Done</b-select-pill></row>
    <row>Pavel Novak | [27.09 10:15] Host: Describe the last… | <b-select-pill tone="purple">text</b-select-pill> | <b-select-pill tone="cyan">regularly</b-select-pill> | <b-select-pill tone="red">doesn't use</b-select-pill><b-match-mark kind="diff">≠</b-match-mark> | <b-select-pill tone="green">Done</b-select-pill></row>
    <row>Nadia Rahimi | Host [00:00] | <b-select-pill tone="cyan">voice</b-select-pill> | <b-select-pill tone="yellow">occasionally</b-select-pill> | <b-select-pill tone="yellow">occasionally</b-select-pill> | <b-select-pill tone="green">Done</b-select-pill></row>
  </b-airtable-preview>
</b-flow>
<b-chapter id="format" icon="split" title="Choosing a format">
  <b-table>
    <table><thead><tr><th>Criterion</th><th><b-icon name="mic" sw="2.2"/> Voice</th><th><b-icon name="lines" sw="2.2"/> Text</th></tr></thead><tbody>
    <tr><td>Depth of answers</td><td><b-rating value="5" of="5" label="5 of 5"/></td><td><b-rating value="2" of="5" label="2 of 5"/></td></tr>
    <tr><td>Follow-up in the moment</td><td><b-rating value="5" of="5" label="5 of 5"/></td><td><b-rating value="1" of="5" label="1 of 5"/></td></tr>
    <tr><td>How many people you can reach</td><td><b-rating value="2" of="5" label="2 of 5"/></td><td><b-rating value="5" of="5" label="5 of 5"/></td></tr>
    <tr><td>Respondent's time</td><td>30 min</td><td>10 min</td></tr>
    <tr><td>Risk of going off topic</td><td><b-rating value="4" of="5" warn label="4 of 5"/></td><td><b-rating value="1" of="5" warn label="1 of 5"/></td></tr>
    </tbody></table>
  </b-table>
  <b-cap>Dots are a score from 1 to 5. For risk, more dots is worse.</b-cap>
  <b-sublabel top="22">Mix: the respondent picks the format</b-sublabel>
  <b-choice-flow label="Voice or text — the respondent chooses">
    <step t="Invitation">By direct message</step>
    <step t="Up for a call?">30 minutes</step>
    <opt k="yes" tone="cyan" pill="voice">call with a note-taking assistant</opt>
    <opt k="no" tone="purple" pill="text">same questions, one at a time, in chat</opt>
  </b-choice-flow>
  <b-finding>
    <ex>Voice scores 5 of 5 on depth, text scores 5 of 5 on reach. Each person picks the format.</ex>
    <gen>When people choose the format themselves, fewer decline. The formats differ in depth: a call gives a detailed story with follow-ups, a chat gives short answers. So chat answers help find cases and topics, but they are not treated as equal to calls. Voice is the main format; chat is for those who cannot take a call. A company-wide questionnaire is a separate tool, written after the interviews.</gen>
    <do>Offer both formats in one sentence in the invitation: "Shall we do a 30-minute call, or would you rather answer the questions in chat?"</do>
  </b-finding>
</b-chapter>
<b-chapter id="prep" icon="mic" title="Preparing for the meeting">
  <b-todo>
    <item t="Mention the note-taking assistant">In the invitation and at the start of the call: the assistant takes notes and a transcript that only the team sees, and answers go into the report without names. With <b-ink-link href="https://www.granola.ai/">Granola</b-ink-link>, no audio is kept</item>
    <item t='<a href="https://tldv.io/" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline;text-underline-offset:3px">tl;dv</a> or <a href="https://www.granola.ai/" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline;text-underline-offset:3px">Granola</a>'><b-ink-link href="https://tldv.io/">tl;dv</b-ink-link> is connected to the calendar and joins the Google Meet or Zoom meeting on its own. <b-ink-link href="https://www.granola.ai/">Granola</b-ink-link> works without a bot, using your computer audio, and keeps only the transcript and notes</item>
    <item t="Airtable row created in advance">Name, group and numbers from the <a href="/en/blog/chatgpt-enterprise-usage-report/#people">table of all people</a>, status "In progress", before the first message</item>
    <item t="Guide open on a second screen">Seven script blocks and a 30-minute timer</item>
    <item t="One host, no note-taking"><b-ink-link href="https://tldv.io/">tl;dv</b-ink-link> or <b-ink-link href="https://www.granola.ai/">Granola</b-ink-link> does the transcript, ChatGPT does the analysis</item>
  </b-todo>
  <b-finding>
    <do>Before the meeting, check that <b-ink-link href="https://tldv.io/">tl;dv</b-ink-link> sees the meeting in the calendar or <b-ink-link href="https://www.granola.ai/">Granola</b-ink-link> is running on your computer, and create the Airtable row, so the call is left with nothing but questions.</do>
  </b-finding>
</b-chapter>
<b-chapter id="script" icon="clock" title="A 30-minute script">
  <b-share-bar kind="time" label="30">
    <seg w="2" color="c-none" ink="ink">2</seg>
    <seg w="3" color="c-light">3</seg>
    <seg w="8" color="c-chat">8</seg>
    <seg w="5" color="c-proj">5</seg>
    <seg w="4" color="c-team">4</seg>
    <seg w="5" color="c-work">5</seg>
    <seg w="3" color="c-none" ink="ink">3</seg>
  </b-share-bar>
  <b-cap>Minutes per block</b-cap>
  <b-call-script>
    <step color="c-none" ink="ink" t="Intro" q="&quot;I'm looking at how people in the company actually get their work tasks done. This isn't an evaluation of you. Both successful and unsuccessful cases are equally useful to me. A note-taking assistant is with me: only we see the transcript, and answers go into the report without names. May I turn it on?&quot;"></step>
    <step color="c-light" t="Role and context" q='"What do you spend most of your week on?"'>Which tasks repeat · where you look for information and draft things</step>
    <step color="c-chat" t="The last work task" q='"Think of the last work task that took you noticeable time. What did you need to get?"'>What means you had · what you chose and why · how you got to the result</step>
    <step color="c-proj" t="Result and effort" q='"What did you end up with, and how much effort did it take?"'>What you used as is · what you finished yourself · what constraints there were: data, access, security</step>
    <step color="c-team" t="A successful case" q='"Think of a time a similar task went well. What was different then?"'>Tool · data · preparation</step>
    <step color="c-work" t="Quitting and switching" q='"Have you ever stopped using a tool or switched to another? How did that go?"'>Which tool · what you switched to · why. If this never happened, skip it</step>
    <step color="c-none" ink="ink" t="Wrap-up" q="&quot;What didn't I ask that matters for understanding your work?&quot;">Thank them · say the answers go into the shared analysis without names</step>
  </b-call-script>
  <b-branch icon="git-branch" t="If the person doesn't mention AI">Don't ask why they don't use it. Ask how they did the task and which options they considered. Ask about AI only if the person named it as a possible option themselves</b-branch>
  <b-finding>
    <ex>The last task, result and effort take 13 of 30 minutes; the successful case and quitting or switching take another 9.</ex>
    <gen>The conversation is built around the work, not the tool. That shows where AI helps, where the person chose another way, and where no new tool is needed. The successful case shows what already works; quitting and switching show why tools get replaced.</gen>
    <do>Set a timer: by minute 5, move on to the last work task. If not, cut the context down to one question. Pick the task topic for the person: their tasks show up in <a href="/en/blog/chatgpt-enterprise-usage-report/#projects">Project themes</a>.</do>
  </b-finding>
</b-chapter>
<b-chapter id="focus" icon="target" title="Staying on topic">
  <b-rules>
    <rule icon="parking" t="Parking lot">Off-topic points go into a separate field; come back to them in the last 2 minutes</rule>
    <rule icon="one" t="One question at a time">No "and also…" in the same sentence</rule>
    <rule icon="undo" t="Back to the case">General opinion → "Can you recall a specific time?"</rule>
    <rule icon="shield-off" t="Don't defend the tool">Answer criticism only with "What happened next?"</rule>
    <rule icon="pause" t="5-second pause">Stay quiet after an answer: people often add the key point themselves</rule>
    <rule icon="bulb-off" t="Don't suggest solutions">No ideas of your own, no names of other products</rule>
  </b-rules>
  <b-sublabel top="22">Situation → what to say</b-sublabel>
  <b-table>
    <table><thead>
    <tr><th>Situation</th><th>Host's line</th></tr>
    </thead><tbody>
    <tr><td>Asks for a new feature</td><td>"When did you last need it? What did you do then?"</td></tr>
    <tr><td>Drifts into complaints about processes</td><td>"I'll put that in the parking lot. Back to the report task: what happened after?"</td></tr>
    <tr><td>Answers with "usually" and "always"</td><td>"And how did it go the last time?"</td></tr>
    <tr><td>Asks for the host's opinion</td><td>"I'll share at the end. Right now what matters is how it works for you"</td></tr>
    <tr><td>Block time is up</td><td>"That's important, let's note it. I'll move to the next question"</td></tr>
    </tbody></table>
  </b-table>
  <b-finding>
    <ex>Five common situations, each with a line that brings the conversation back to the episode.</ex>
    <gen>Behind a feature request there is a specific case, and that case is what you need. The request itself is useful later as a hint about where to look for the problem.</gen>
    <do>Keep the phrase table next to the guide and write every feature request verbatim into a separate table field for off-topic items.</do>
  </b-finding>
</b-chapter>
<b-chapter id="base" icon="table" title="Logging in Airtable">
  <b-why>The table keeps everyone in the sample, their conversations and the report data in one place. <b>Decision:</b> whom else to invite so each group has enough interviews, whom to send a follow-up, and which gaps between self-reported and measured use to discuss with the person.</b-why>
  <b-pipe label="Path of a record from call to table">
    <node icon="record" color="c-chat" sub="Transcript"><b-ink-link href="https://tldv.io/">tl;dv</b-ink-link> · <b-ink-link href="https://www.granola.ai/">Granola</b-ink-link></node>
    <node icon="table" color="c-proj" sub="Notes field in the person's row"><b-ink-link href="https://airtable.com" plain>Airtable</b-ink-link></node>
  </b-pipe>
  <b-tool-links>
    <item href="https://airtable.com" icon="external" sub="Base and forms">Airtable</item>
    <item href="https://tldv.io" icon="external" sub="Call notes and transcripts">tl;dv</item>
    <item href="https://www.granola.ai/" icon="external" sub="Notes without a bot, no audio kept">Granola</item>
  </b-tool-links>
  <b-cap>Voice: the <b-ink-link href="https://tldv.io/">tl;dv</b-ink-link> or <b-ink-link href="https://www.granola.ai/">Granola</b-ink-link> transcript is copied into the Notes field. Text: the chat log is copied into the same field with the date and time of each message.</b-cap>
  <b-sublabel top="22">One table: one row per person</b-sublabel>
  <b-airtable-grid foot="16 records · 9 shown">
    <field type="A" kind="name">Name</field>
    <field type="≡" kind="note">Notes</field>
    <field type="◉">Format</field>
    <field type="◉">Group</field>
    <field type="◉">Status</field>
    <field type="◉" kind="ours">Frequency · self-reported</field>
    <field type="◉">Frequency · per report</field>
    <field type="ƒ" kind="mark">≠</field>
    <field type="#" kind="num">Tokens · 3 mo</field>
    <field type="#" kind="num">$ / 3 mo</field>
    <field type="▦" kind="num">Activity</field>
    <row>Hana Sato | Host [00:00]: Think back to the last time you… | <b-select-pill tone="cyan">voice</b-select-pill> | code | <b-select-pill tone="green">Done</b-select-pill> | <b-select-pill tone="green">weekly</b-select-pill> | <b-select-pill tone="green">weekly</b-select-pill> | <b-match-mark kind="same">=</b-match-mark> | 21.9M | 438 | 25.09</row>
    <row>Luis Moreno | Host [00:00]: Thanks for making the time… | <b-select-pill tone="cyan">voice</b-select-pill> | code | <b-select-pill tone="green">Done</b-select-pill> | <b-select-pill tone="cyan">regularly</b-select-pill> | <b-select-pill tone="green">weekly</b-select-pill> | <b-match-mark kind="diff">≠</b-match-mark> | 12.7M | 396 | 24.09</row>
    <row>Mira Castellano | [26.09 18:40] Host: What result were you expecting… | <b-select-pill tone="purple">text</b-select-pill> | agent | <b-select-pill tone="yellow">Partial</b-select-pill> | <b-select-pill tone="cyan">regularly</b-select-pill> | <b-select-pill tone="cyan">regularly</b-select-pill> | <b-match-mark kind="same">=</b-match-mark> | 3.9M | 97 | 26.09</row>
    <row>Jonas Keller | Host [00:00]: What do you spend most of your… | <b-select-pill tone="cyan">voice</b-select-pill> | research | <b-select-pill tone="green">Done</b-select-pill> | <b-select-pill tone="green">weekly</b-select-pill> | <b-select-pill tone="green">weekly</b-select-pill> | <b-match-mark kind="same">=</b-match-mark> | 1.1M | 19 | 26.09</row>
    <row>Ben Ortiz |  |  | Codex only | <b-select-pill tone="cyan">Awaiting reply</b-select-pill> |  | <b-select-pill tone="purple">Codex only</b-select-pill> |  | 3.2M | 64 | 22.09</row>
    <row>Pavel Novak | [27.09 10:15] Host: Describe the last task… | <b-select-pill tone="purple">text</b-select-pill> | inactive | <b-select-pill tone="green">Done</b-select-pill> | <b-select-pill tone="cyan">regularly</b-select-pill> | <b-select-pill tone="red">doesn't use</b-select-pill> | <b-match-mark kind="diff">≠</b-match-mark> | 0 | 0 | —</row>
    <row>Sara Quinn |  |  | inactive | <b-select-pill tone="red">Declined</b-select-pill> |  | <b-select-pill tone="red">doesn't use</b-select-pill> |  | 0 | 0 | —</row>
    <row>Nadia Rahimi | Host [00:00]: What did you do in ChatGPT yesterday… | <b-select-pill tone="cyan">voice</b-select-pill> | other tools | <b-select-pill tone="green">Done</b-select-pill> | <b-select-pill tone="yellow">occasionally</b-select-pill> | <b-select-pill tone="yellow">occasionally</b-select-pill> | <b-match-mark kind="same">=</b-match-mark> | 0.3M | 6 | 20.09</row>
    <row>Elif Demir |  |  | projects | <b-select-pill tone="gray">In progress</b-select-pill> |  | <b-select-pill tone="green">weekly</b-select-pill> |  | 1.8M | 41 | 27.09</row>
  </b-airtable-grid>
  <b-cap>ChatGPT fills in the orange field from the conversation in Notes. "Per report", "Tokens", "$" and "Activity" come from the <a href="/en/blog/chatgpt-enterprise-usage-report/">ChatGPT Enterprise usage report</a>. The "≠" field is a formula that compares the two frequencies.</b-cap>
  <b-sublabel top="22">Reading the table: what each column gives you</b-sublabel>
  <b-table>
    <table><thead>
    <tr><th>Column</th><th>Source</th><th>What it affects</th></tr>
    </thead><tbody>
    <tr><td>Name · Group</td><td><a href="/en/blog/who-to-interview-before-buying-ai-tools/#groups">"Eight groups" sample</a></td><td>which way of getting tasks done the person represents</td></tr>
    <tr><td>Notes</td><td><b-ink-link href="https://tldv.io/">tl;dv</b-ink-link>, <b-ink-link href="https://www.granola.ai/">Granola</b-ink-link> or chat log</td><td>source for every field; any conclusion is checked against a quote</td></tr>
    <tr><td>Format</td><td>host</td><td>answer depth: a chat has less detail than a call</td></tr>
    <tr><td>Status</td><td>host</td><td>next action: remind, follow up, or replace the person</td></tr>
    <tr><td>Frequency · self-reported</td><td>ChatGPT takes it from the conversation</td><td>how often the person says they use AI</td></tr>
    <tr><td>Frequency · per report</td><td><a href="/en/blog/chatgpt-enterprise-usage-report/#depth">report · adoption depth</a></td><td>how often they use it according to console data</td></tr>
    <tr><td>≠</td><td>Airtable formula: compares the two frequencies</td><td>no match: a question to clarify in the interview, since the report only sees the corporate tool for 3 months</td></tr>
    <tr><td>Tokens · 3 mo</td><td>report · <a href="/en/blog/chatgpt-enterprise-usage-report/#top-spend">top by spend</a></td><td>amount of work in the corporate tool over 3 months, for sampling, not for weighting the answer</td></tr>
    <tr><td>$ · 3 mo</td><td>report · leaderboard</td><td>spend over 3 months, for sampling, not for weighting the answer</td></tr>
    <tr><td>Activity</td><td>report · users export</td><td>date of the last action: long ago means a candidate for the "Tried and quit" group</td></tr>
    </tbody></table>
  </b-table>
  <b-sublabel top="22">How to read the sample rows</b-sublabel>
  <b-table>
    <table><thead>
    <tr><th>Row</th><th>Signal</th><th>What to do</th></tr>
    </thead><tbody>
    <tr><td>Hana Sato</td><td>frequencies match · $438 on code · <b-select-pill tone="green">Done</b-select-pill></td><td>the highest spend on code: a conversation about her last task shows whether the current tool is enough</td></tr>
    <tr><td>Luis Moreno</td><td><b-match-mark kind="diff">≠</b-match-mark> says "regularly", actually weekly</td><td>clarify: which tasks he counts as AI work</td></tr>
    <tr><td>Pavel Novak</td><td><b-match-mark kind="diff">≠</b-match-mark> "regularly" with zero tokens</td><td>clarify: which tools he uses and for which tasks</td></tr>
    <tr><td>Mira Castellano</td><td><b-select-pill tone="yellow">Partial</b-select-pill></td><td>send one follow-up: where in the task they had to finish by hand</td></tr>
    <tr><td>Ben Ortiz</td><td><b-select-pill tone="cyan">Awaiting reply</b-select-pill> · Codex only · $64</td><td>send a reminder: without him the "Codex only" group stays empty</td></tr>
    <tr><td>Sara Quinn</td><td><b-select-pill tone="red">Declined</b-select-pill></td><td>replace by the <a href="/en/blog/who-to-interview-before-buying-ai-tools/#teams">replacement rule</a>: the next candidate of the "Inactive" group</td></tr>
    <tr><td>Elif Demir</td><td><b-select-pill tone="gray">In progress</b-select-pill> · 7 active projects</td><td>schedule a call; fill in self-reported frequency after the conversation</td></tr>
    </tbody></table>
  </b-table>
  <b-sublabel top="22">Self-reported vs data: what to clarify in the interview</b-sublabel>
  <b-vs-grid>
    <h>Measured in the interview</h>
    <h>Pair in the report</h>
    <h>If they differ, clarify</h>
    <c><b>How often they use it</b></c>
    <c><a href="/en/blog/chatgpt-enterprise-usage-report/#depth">weekly activity</a></c>
    <c>which tools the person uses and for which tasks</c>
    <c><b>Main task</b></c>
    <c><a href="/en/blog/chatgpt-enterprise-usage-report/#main-tool">main tool</a></c>
    <c>which tasks the person counts as AI work</c>
    <c><b>How many tasks it covers</b></c>
    <c><a href="/en/blog/chatgpt-enterprise-usage-report/#projects">number of projects</a></c>
    <c>which projects are alive and for which tasks</c>
    <c><b>What else they use</b></c>
    <c><a href="/en/blog/chatgpt-enterprise-usage-report/#connectors">connectors</a></c>
    <c>what these tools are and for which tasks; record them as a way of working</c>
    <c><b>How much time it saves</b></c>
    <c>no pair</c>
    <c>self-reported only</c>
  </b-vs-grid>
  <b-cap>Data limits: the report only sees the corporate tool and only for 3 months. Personal accounts and other tools do not show up in it, so a mismatch is a question to clarify, not a conclusion.</b-cap>
  <b-sublabel top="22">Statuses of 16 invitees</b-sublabel>
  <b-share-bar kind="status" label="Status breakdown">
    <seg w="9" color="pg" ink="pg-i">Done · 9</seg>
    <seg w="2" color="py" ink="py-i">2</seg>
    <seg w="2" color="pc" ink="pc-i">2</seg>
    <seg w="2" color="pn" ink="pn-i">2</seg>
    <seg w="1" color="pr" ink="pr-i">1</seg>
  </b-share-bar>
  <b-legend>
    <item color="pg">Done</item>
    <item color="py">Partial</item>
    <item color="pc">Awaiting reply</item>
    <item color="pn">In progress</item>
    <item color="pr">Declined</item>
  </b-legend>
  <b-finding>
    <ex>9 of 16 invitees gave an interview: the "Done" share is 56%. Pavel Novak's self-reported frequency doesn't match the report.</ex>
    <gen>One row per person keeps the report data, format, raw conversation and status together. The statuses show whether you have enough people: the "Done" share among invitees tells you how many to invite so each group gets the needed number of interviews. A gap between self-reported and measured use is a question to clarify: the report only sees the corporate tool for 3 months.</gen>
    <do>Update the status right after each conversation. Keep the needed number of interviews in each group: with a 56% "Done" share, invite four people for two interviews per group. Send one follow-up to everyone marked Partial.</do>
  </b-finding>
</b-chapter>
<b-chapter id="wording" icon="lines" title="Text: wording">
  <b-why>In a chat or a questionnaire it is hard to ask again, so a poorly worded question ruins the answer with no chance to fix it. Five common mistakes:</b-why>
  <b-question-pairs>
    <pair tag="leading" bad="How convenient is the tool for you?">Describe the last work task that took you noticeable time.</pair>
    <pair tag="provocative" bad="Why don't you use the tool if the company pays for it?">How did you do your last task of this kind? Which options did you consider?</pair>
    <pair tag="feature request" bad="What features are you missing?">At what point in your last task did you have to finish the work by hand?</pair>
    <pair tag="hypothetical" bad="Would you use it more if it had an agent?">What did you do the last time the result didn't work for you?</pair>
    <pair tag="double-barreled" bad="What do you do in the tool and how often?">What was the last task you did with AI?</pair>
  </b-question-pairs>
  <b-finding>
    <ex>All five fixed questions ask about a past episode.</ex>
    <gen>Questions about convenience, features and the future collect opinions. A purchase decision rests on what people have already done, so a good question asks about a specific past case.</gen>
    <do>Reread the chat and questionnaire questions and rewrite every question containing "convenient", "would you like" or "which features" into a question about the last work task.</do>
  </b-finding>
</b-chapter>
<b-chapter id="agent" icon="terminal" title="Fill the table with Claude Code">
  <b-why>The whole table can be handed to an agent: Claude Code or any other MCP-capable agent connects to Airtable and creates rows, pulls report data and analyzes conversations on its own.</b-why>
  <b-pipe label="An agent fills in the table">
    <node icon="terminal" color="c-code" sub="Or any agent with MCP support"><b-ink-link href="https://code.claude.com/docs" plain>Claude Code</b-ink-link></node>
    <node icon="plug" color="c-light" sub="Reads and writes the table">Airtable MCP</node>
    <node icon="table" color="c-proj" sub="All fields and statuses">Airtable</node>
  </b-pipe>
  <b-todo top="12">
    <item t="Create rows">From the list of people selected for interviews: name, group, status</item>
    <item t="Pull in report data">Tokens, $, activity, frequency per report</item>
    <item t="Analyze Notes">With the same prompt as in ChatGPT: fields, difficulties, self-reported frequency, quotes</item>
    <item t="Update statuses">"Partial" (incomplete answer) if the analysis contains "no data"</item>
  </b-todo>
  <b-tool-links>
    <item href="https://support.airtable.com/docs/using-the-airtable-mcp-server" icon="external" sub="How to connect">Airtable MCP</item>
  </b-tool-links>
  <b-finding>
    <ex>The agent creates rows, pulls in the report, analyzes Notes and updates statuses: four steps with no manual entry.</ex>
    <gen>Through MCP the agent works with the table directly, leaving the researcher the conversations and checking conclusions against quotes. One analysis prompt for the agent and for ChatGPT keeps rows comparable.</gen>
    <do>Connect Airtable MCP to Claude Code and start with one command: "Create rows for the people on the list with status In progress".</do>
  </b-finding>
</b-chapter>
<b-chapter id="form" icon="doc-lines" title="Questionnaire">
  <b-why>The questionnaire is written after the interviews, once you know which tasks and difficulties occur. It goes to the whole company to learn how widespread they are. Questions are short, and the answer options come from the interview analysis.</b-why>
  <b-survey>
    <q t="Which of these tasks do you do at work?" color="c-proj" tag="tasks">choice: tasks from the interviews · other, open field</q>
    <q t="How often do you do these tasks?" color="c-proj" tag="task frequency">choice: every day · every week · less often · I don't</q>
    <q t="Which tools do you use for them?" color="c-proj" tag="tools">choice: ChatGPT · Claude · Cursor · another AI tool · I don't use AI</q>
    <q t="Which difficulties do you run into in these tasks?" color="c-proj" tag="difficulties">choice: difficulties from the interviews · I don't run into any · other, open field</q>
    <q t="How often does this difficulty get in the way?" color="c-proj" tag="difficulty frequency">choice: in almost every task · sometimes · rarely</q>
    <q t="How much does it matter for the result?" color="c-proj" tag="impact">choice: gets in the way a lot · gets in the way · barely matters</q>
    <q t="How do you work around this difficulty now?" tag="workarounds">open field · I don't</q>
    <q t="What else matters that the questions missed?" tag="anything missed">open field</q>
  </b-survey>
  <b-finding>
    <ex>Eight short questions: six multiple-choice with options from the interviews and two open fields.</ex>
    <gen>The interviews show which tasks and difficulties exist; the questionnaire shows how many people face them and how much they get in the way. The options "I don't run into any", "I don't use AI" and the open field catch what the interviews missed.</gen>
    <do>Collect the answer options from the interview analysis and send the questionnaire to the whole company. Count what share of people face each difficulty, how often, and how much it gets in the way. These shares feed the <a href="/en/blog/chatgpt-enterprise-usage-report/#decision">decision procedure</a> in the report.</do>
  </b-finding>
</b-chapter>
<b-chapter id="after" icon="bulb" title="Interview analysis: the analysis prompt and a check against report data">
  <b-steps round>
    <step t="Give the Notes text to ChatGPT">With the same prompt for every interview</step>
    <step t="Move ChatGPT's answer into the person's row">Task, context, chosen way, result, effort, constraints, difficulties, self-reported frequency</step>
    <step t="Group the table by difficulty">People with the same difficulty end up next to each other: you see how many there are and from which groups</step>
    <step t="Check with the questionnaire">Repeats become answer options in the company-wide questionnaire; the team breakdown is compared with <a href="/en/blog/chatgpt-enterprise-usage-report/#uniformity">Uniformity</a></step>
  </b-steps>
  <b-subhead>Prompt for interview analysis</b-subhead>
  <b-prompt>
    Below is a conversation with an employee about their work tasks.
    Return strictly by field, only what the person said themselves:
    1. Task: the last specific work task
    2. Context: for whom and why, what means they had
    3. Chosen tool or way, and why
    4. Result
    5. Effort: time and manual rework
    6. Constraints: data, access, security
    7. Difficulties: categories from the list {categories from the report's sign table} or "no difficulties"; if none fits, a new category in your own words
    8. Self-reported frequency: weekly / regularly / occasionally / doesn't use / unknown
    9. 1–2 verbatim quotes
    If something is not in the conversation, write "no data" and don't make it up.

    {text from Notes}
  </b-prompt>
  <b-gauge label="What to do with a repeat">
    <row k="1 person" w="15%" color="c-none">case</row>
    <row k="repeats across several" w="45%" color="c-light">check with the questionnaire</row>
    <row k="questionnaire confirmed" w="100%" color="c-work">into the decision procedure</row>
  </b-gauge>
  <b-finding>
    <ex>A difficulty for one person is a case; a repeat across several is a reason to check with the questionnaire.</ex>
    <gen>The analysis keeps the whole task, not just the difficulty: without the context, the chosen way and the effort you cannot tell whether a new tool is needed. A repeat in interviews shows what to check, not how many people face it: only the questionnaire shows that. One prompt for all conversations keeps fields comparable, and "no data" stops ChatGPT from making things up.</gen>
    <do>Once several analyses have piled up, group the table by difficulty and move repeats into the answer options of the <a href="#form">questionnaire</a>. Record "no difficulties" as a result. Take categories from the report's <a href="/en/blog/chatgpt-enterprise-usage-report/#signs">sign table</a> and add new ones if none fits. The pilot decision follows the <a href="/en/blog/chatgpt-enterprise-usage-report/#decision">procedure</a> in the report.</do>
  </b-finding>
  <b-sublabel top="22">Common questions</b-sublabel>
  <b-qa>
    <q t="How to analyze an interview with ChatGPT">The conversation text from the Notes field goes to ChatGPT with the same prompt for every interview. The answer is copied into the person’s row: task, context, method, result, costs, constraints, difficulties, frequency as stated. Then the table is grouped by difficulty.</q>
    <q t="Can an agent do the interview analysis">Yes. Claude Code or another agent with MCP support connects to Airtable, creates rows, pulls report data and analyzes Notes with the same prompt. The researcher keeps the conversations and checks conclusions against quotes.</q>
    <q t="How to compare what people say with the data">The table has two fields: frequency as stated and frequency by the report, with a mismatch flag next to them. Mismatches are discussed with the person rather than silently corrected.</q>
    <q t="How to analyze calls and text replies together">The text conversation is copied into the same Notes field with the time of each message. Text answers help find cases and themes, but they are not treated as equal to calls.</q>
  </b-qa>
</b-chapter>
<b-chapter id="next" title="Further reading">
  <b-links cols="2">
    <item href="/en/blog/chatgpt-enterprise-usage-report/" k="Report" t="ChatGPT Enterprise usage report">Who uses it, for which tasks, and which tools to buy next</item>
    <item href="/en/blog/who-to-interview-before-buying-ai-tools/" k="Sample" t="Who to interview">Who to invite for interviews</item>
  </b-links>
</b-chapter>
<b-footer>Interview design based on recommendations from <a href="https://t.me/Kseniya_Vasil" target="_blank" rel="noopener">@Kseniya_Vasil</a>. All names, teams and numbers in the examples are fictional.</b-footer>
</b-post>
