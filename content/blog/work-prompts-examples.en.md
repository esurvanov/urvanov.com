---
title: Prompts for work tasks: five parts and six examples for ChatGPT and Claude
date: 2026-09-28
updated: 2026-10-20
description: Prompts for work with an AI chat: the parts of a good work prompt, what a weak and a strong ask look like, six ready templates for common tasks and how to keep them in a project, based on the Anthropic, OpenAI and Google guides.
tags: AI, prompts, ChatGPT, Claude
category: prompts
layout: wide
toc: model=Human-in-the-loop | parts=Five parts | examples=Six examples | learn=What to study | next=Further reading
---

<b-post series="prompts">
<b-flow lead label="One ask, two results">
  <b-lane title="One sentence" color="muted">
    <node icon="chat" t="Ask">“write a reply to the customer”</node>
    <node icon="ai-box" t="Model">guesses the context</node>
    <node icon="file-x" t="Generic answer">rewrite by hand</node>
  </b-lane>
  <b-lane title="Six parts" color="accent">
    <node icon="prompt-stripes" t="Prompt">role, data, example, format</node>
    <node icon="ai-box" t="Model">sees everything it needs</node>
    <node icon="file-check" t="Draft">minor edits</node>
  </b-lane>
</b-flow>
<b-cap>The model is the same in both cases. The result depends on what the prompt says: six parts that recur in the Anthropic, OpenAI and Google guides.</b-cap>
<b-chapter id="model" title="Human-in-the-loop: the path of one request" icon="share">
  <b-art names="work-prompts-examples/prompt-map" wide/>
  <b-finding>
    <ex>A person holds every key point: sets the task, builds the prompt, checks the answer, sends it back to refine and makes the decision. The model only answers what made it into the request.</ex>
    <gen>Every arrow has its own checkpoint: data goes in whole, the answer is checked against who needs it, and a good request is saved as a template so the next task of the same kind starts from it.</gen>
    <do>Before writing the request, name the reader and the decision they will make from the answer: the role and the format follow from that.</do>
  </b-finding>
  <b-cta href="/en/blog/harness-driven-development/" k="Next step · HDD" t="Harness-Driven Development">How to turn the check in this diagram into a rule that works for every next task</b-cta>
</b-chapter>
<b-chapter id="parts" title="Five parts of a prompt" icon="grid">
  <b-prompt-anatomy label="Prompt anatomy: role, audience and goal, the whole data in tags, example, format, question last" order="order">
    <part kind="role" icon="user-round" t="Role" tip="Role: “You are a support agent.” One sentence sets the tone and level"><b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “Setting a role in the system prompt focuses Claude&#39;s behavior and tone for your use case. Even a single sentence makes a difference” — platform.claude.com, Prompting best practices"/></part>
    <part kind="who" icon="target" t="Audience and goal" tip="Who and why: Who reads the result and what decision it feeds"><b-proof href="https://academy.openai.com/public/clubs/work-users-ynjqu/resources/prompting" quote="OpenAI Academy: “Be clear about what you need ChatGPT to do. Outline what you want, who it&#39;s for, and why it matters” — academy.openai.com, Prompting"/><b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “Providing context or motivation behind your instructions, such as explaining to Claude why such behavior is important, can help Claude better understand your goals and deliver more targeted responses” — platform.claude.com, Prompting best practices"/></part>
    <part kind="data" icon="file-text" t="The whole data" tip="Full data: Paste the thread, document or table in full. Long input on top, the question at the end" tag="data"><b-proof href="https://academy.openai.com/public/clubs/work-users-ynjqu/resources/prompting" quote="OpenAI Academy: “Add any background (or documentation) that will help” — academy.openai.com, Prompting"/><b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “Place your long documents and inputs near the top of your prompt, above your query, instructions, and examples”; “Queries at the end can improve response quality by up to 30 percent in tests” — platform.claude.com, Prompting best practices"/></part>
    <part kind="ex" icon="card-text" t="Example" tip="Example: One to three samples of the tone or format you want" tag="example" note="1–3"><b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “Include 3–5 examples for best results” — platform.claude.com, Prompting best practices"/><b-proof href="https://www.kaggle.com/whitepaper-prompt-engineering" quote="Google, Prompt Engineering: its best practices include providing examples, being specific about the output and using instructions over constraints. Paraphrased — kaggle.com/whitepaper-prompt-engineering"/></part>
    <part kind="fmt" icon="list-dots" t="Format" tip="Format: “5 bullets, one line each.” Say what to do, instead of listing bans" note="5 points"><b-proof href="https://academy.openai.com/public/clubs/work-users-ynjqu/resources/prompting" quote="OpenAI Academy: “Tell ChatGPT how you&#39;d like the response” — academy.openai.com, Prompting"/><b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “Tell Claude what to do instead of what not to do” — platform.claude.com, Prompting best practices"/></part>
    <part kind="q" icon="help" t="Question last" tip="Paste the thread, document or table in full. Long input on top, the question at the end"></part>
    <tags t="tags" tip="Tags for parts: &lt;thread&gt;…&lt;/thread&gt; keeps data apart from the instruction"><b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “Wrapping each type of content in its own tag (for example, &lt;instructions&gt;, &lt;context&gt;, &lt;input&gt;) reduces misinterpretation” — platform.claude.com, Prompting best practices"/></tags>
  </b-prompt-anatomy>
  <b-finding>
    <ex>Five parts plus tags, each backed by an official guide.</ex>
    <gen>The model knows only what the prompt says. Anthropic suggests a test: show the prompt to a colleague with no context; if they are confused, the model will be too<b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “Show your prompt to a colleague with minimal context on the task and ask them to follow it. If they&#39;d be confused, Claude will be too” — platform.claude.com, Prompting best practices"/>.</gen>
    <do>Open your last prompt and mark which of the five parts are missing. Add a role and a format: two sentences.</do>
  </b-finding>
</b-chapter>
<b-chapter id="examples" title="Six examples" icon="browser-tab">
  <b-prompt-tabs name="ex-en">
    <b-prompt-tab id="client" icon="chat" label="Customer reply" title="Reply to a customer thread">
      <b-why>The customer writes for the third time; the tone must stay calm, and only what the thread already says can be promised.</b-why>
      <b-prompt-parts>
        <part icon="user-alt">Role</part>
        <part icon="help-circle" off>Who and why</part>
        <part icon="file-text">Full data</part>
        <part icon="checklist">Example</part>
        <part icon="lines-alt">Format</part>
      </b-prompt-parts>
      <b-prompt>
        You are a support agent at [company].
        Below is the full thread with the customer.
        &lt;thread&gt;
        [paste in full]
        &lt;/thread&gt;
        Write the next reply. Tone: calm and friendly, like this example:
        &lt;example&gt;
        [one good past reply]
        &lt;/example&gt;
        No more than 5 sentences. Mention dates only if they appear in the thread.
      </b-prompt>
      <b-finding>
        <ex>A role, the thread in tags, a tone sample and two format rules.</ex>
        <gen>A past reply sets the tone better than any adjective. The dates rule is phrased as a permission with a condition, and the model follows it literally.</gen>
        <do>Keep two or three of the team’s best replies and drop one into the example block.</do>
      </b-finding>
    </b-prompt-tab>
    <b-prompt-tab id="meeting" icon="calendar" label="Meeting prep" title="Preparing for a meeting">
      <b-why>A 30-minute meeting tomorrow; the materials are scattered across threads and docs.</b-why>
      <b-prompt-parts>
        <part icon="user-alt" off>Role</part>
        <part icon="help-circle">Who and why</part>
        <part icon="file-text">Full data</part>
        <part icon="checklist" off>Example</part>
        <part icon="lines-alt">Format</part>
      </b-prompt-parts>
      <b-prompt>
        Tomorrow I meet [whom] about [topic], 30 minutes. My goal is [the decision I need].
        &lt;materials&gt;
        [threads and documents]
        &lt;/materials&gt;
        Prepare:
        1. Three questions to settle at the meeting.
        2. For each, what the materials already say, with a short quote.
        3. What I need to find out before the meeting.
        Format: a three-column table.
      </b-prompt>
      <b-cap>OpenAI Academy has an agenda template with time estimates<b-proof href="https://academy.openai.com/public/resources/chatgpt-for-any-role" quote="OpenAI Academy, ChatGPT for any role: “Create a structured agenda for a meeting about [topic]. Break the agenda into sections with time estimates and goals for each section” — academy.openai.com"/>.</b-cap>
      <b-finding>
        <ex>The meeting goal, materials in tags and a numbered list of what to return.</ex>
        <gen>The meeting goal filters the materials. Numbered steps help when order and completeness matter<b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “Show your prompt to a colleague with minimal context on the task and ask them to follow it. If they&#39;d be confused, Claude will be too” — platform.claude.com, Prompting best practices"/>.</gen>
        <do>Before any meeting of 30 minutes or more, run the materials through this prompt and open with its table.</do>
      </b-finding>
    </b-prompt-tab>
    <b-prompt-tab id="summary" icon="summary-lines" label="Thread summary" title="Summary of a long thread">
      <b-why>A chat of 200 messages; you need to know what was decided and who does what.</b-why>
      <b-prompt-parts>
        <part icon="user-alt" off>Role</part>
        <part icon="help-circle" off>Who and why</part>
        <part icon="file-text">Full data</part>
        <part icon="checklist" off>Example</part>
        <part icon="lines-alt">Format</part>
      </b-prompt-parts>
      <b-prompt>
        &lt;thread&gt;
        [paste in full]
        &lt;/thread&gt;
        First, copy the exact quotes where decisions are made or tasks are assigned.
        Then build a summary from those quotes:
        — decisions;
        — tasks with owners and dates;
        — open questions.
        One line per item. If a quote names no owner, write “unassigned”.
      </b-prompt>
      <b-finding>
        <ex>The long thread sits on top, the task at the end, quotes first, then the summary.</ex>
        <gen>For long documents Anthropic advises asking for quotes first<b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “For long document tasks, ask Claude to quote relevant parts of the documents first before carrying out its task” — platform.claude.com, Prompting best practices"/> and placing the question after the data: in tests that improved quality by up to 30%<b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “Place your long documents and inputs near the top of your prompt, above your query, instructions, and examples”; “Queries at the end can improve response quality by up to 30 percent in tests” — platform.claude.com, Prompting best practices"/>. The “unassigned” rule stops the model from inventing an owner.</gen>
        <do>For any thread longer than one screen, start by asking for quotes.</do>
      </b-finding>
    </b-prompt-tab>
    <b-prompt-tab id="table" icon="table" label="Table analysis" title="Analysing a table">
      <b-why>A month of tickets exported to CSV; find what changed.</b-why>
      <b-prompt-parts>
        <part icon="user-alt" off>Role</part>
        <part icon="help-circle" off>Who and why</part>
        <part icon="file-text">Full data</part>
        <part icon="checklist" off>Example</part>
        <part icon="lines-alt">Format</part>
      </b-prompt-parts>
      <b-prompt>
        Attached is an export of [tickets] for [period], CSV.
        Count [tickets] by [topic] and show the 5 biggest changes versus last month.
        For each, the number and one line on what may explain it.
        Show the code you used so I can check it.
      </b-prompt>
      <b-cap>Both ChatGPT and Claude process the file in an isolated sandbox<b-proof href="https://help.openai.com/en/articles/8437071-data-analysis-with-chatgpt" quote="ChatGPT: for data analysis it writes and runs Python in an isolated environment; review the code, output and assumptions before relying on the result. Paraphrased from the OpenAI Help Center — help.openai.com/en/articles/8437071"/><b-proof href="https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude" quote="Claude: “When Claude executes code or creates files, it operates within an isolated, sandboxed container” — support.claude.com/en/articles/12111783"/>.</b-cap>
      <b-finding>
        <ex>The whole file, an exact metric and breakdown, a “top 5” limit and a request for the code.</ex>
        <gen>The model computes with code in a sandbox, and code can be re-read. OpenAI advises checking the code, output and assumptions before relying on the result.</gen>
        <do>Check one number from the answer by hand. If it matches, trust the rest more.</do>
      </b-finding>
    </b-prompt-tab>
    <b-prompt-tab id="style" icon="pen" label="Company voice" title="Text in the company’s voice">
      <b-why>You need a post or email that sounds like the team, not like a template.</b-why>
      <b-prompt-parts>
        <part icon="user-alt" off>Role</part>
        <part icon="help-circle">Who and why</part>
        <part icon="file-text" off>Full data</part>
        <part icon="checklist">Example</part>
        <part icon="lines-alt">Format</part>
      </b-prompt-parts>
      <b-prompt>
        Here are three of our posts that landed well:
        &lt;example&gt;[post 1]&lt;/example&gt;
        &lt;example&gt;[post 2]&lt;/example&gt;
        &lt;example&gt;[post 3]&lt;/example&gt;
        Write a post about [topic] in the same style: length, tone and structure as in the examples.
        For whom: [audience]. Why: [what we want the reader to do].
      </b-prompt>
      <b-finding>
        <ex>Three examples in tags and one line on who it is for and why.</ex>
        <gen>Anthropic recommends 3–5 examples<b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “Include 3–5 examples for best results” — platform.claude.com, Prompting best practices"/>; Google’s guide also lists examples as the first practice<b-proof href="https://www.kaggle.com/whitepaper-prompt-engineering" quote="Google, Prompt Engineering: its best practices include providing examples, being specific about the output and using instructions over constraints. Paraphrased — kaggle.com/whitepaper-prompt-engineering"/>. A style shown in examples is copied more precisely than a style described in words.</gen>
        <do>Put good texts into a project and use them as examples, so you do not paste them every time.</do>
      </b-finding>
    </b-prompt-tab>
    <b-prompt-tab id="research" icon="search" label="Research" title="Researching a topic">
      <b-why>You need an overview of a market or practice with sources, half a day of searching by hand.</b-why>
      <b-prompt-parts>
        <part icon="user-alt" off>Role</part>
        <part icon="help-circle">Who and why</part>
        <part icon="file-text" off>Full data</part>
        <part icon="checklist" off>Example</part>
        <part icon="lines-alt">Format</part>
      </b-prompt-parts>
      <b-prompt>
        Research: [question].
        For whom: [audience]. Why: [the decision to make].
        Data no older than [year].
        Output: a table [columns] and a 5-point conclusion.
        A source link for every fact. If there is no data, say so.
      </b-prompt>
      <b-cap>Both chats have a deep research mode: deep research in ChatGPT and Research in Claude<b-proof href="https://help.openai.com/en/articles/10500283-deep-research-in-chatgpt" quote="ChatGPT: deep research gathers and synthesises information from the web into a report, takes 5 to 30 minutes and includes source links. Paraphrased from the OpenAI Help Center — help.openai.com/en/articles/10500283"/><b-proof href="https://support.claude.com/en/articles/11088861-use-research-on-claude" quote="Claude: Research is “conducting multiple searches that build on each other”, answers come “complete with easy-to-check citations”; “available for users with paid Claude plans (Pro, Max, Team, or Enterprise)” — support.claude.com/en/articles/11088861"/>.</b-cap>
      <b-finding>
        <ex>A goal, a freshness limit and an output format with links.</ex>
        <gen>In research mode the model runs a series of searches and returns a report with links. Links let you check every fact, and “if there is no data” stops gaps being filled with guesses.</gen>
        <do>Open two or three links from the report and check the fact against the source before passing the conclusion on.</do>
      </b-finding>
    </b-prompt-tab>
  </b-prompt-tabs>
</b-chapter>
<b-chapter id="learn" title="What to study next" icon="flag-alt">
  <b-why>Start with the 7-minute tutorial: it explains why the techniques in this article work. Then the prompting guides, and the courses when you have time.</b-why>
  <b-sublabel top="22">Foundations: how AI works</b-sublabel>
  <b-links cols="2">
    <item href="https://academy.claude.com/tutorials/the-4-properties-of-ai" k="Claude Academy · tutorial, 7 minutes" t="The 4 properties of AI" ext>Next-token prediction, knowledge, working memory, steerability: where the model’s strengths and weaknesses come from</item>
    <item href="https://academy.claude.com/courses/ai-capabilities-and-limitations" k="Claude Academy · course, 13 lessons, 3.5 hours" t="AI Capabilities and Limitations" ext>Why a model confidently makes things up, where context runs out and which instructions are reliable</item>
    <item href="https://academy.claude.com/courses/ai-fluency-framework-foundations" k="Claude Academy · course, 14 lessons, 4 hours" t="AI Fluency: Framework & Foundations" ext>Four skills: what to delegate, how to describe the task, how to check the result and who owns it</item>
  </b-links>
  <b-sublabel top="22">Prompting</b-sublabel>
  <b-links cols="2">
    <item href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" k="Anthropic · docs" t="Prompting best practices" ext>The main reference: clarity, examples, role, XML tags, long documents</item>
    <item href="https://claude.com/blog/best-practices-for-prompt-engineering" k="Anthropic · blog" t="Best practices for prompt engineering" ext>General prompting craft beyond a specific model</item>
    <item href="https://github.com/anthropics/prompt-eng-interactive-tutorial" k="Anthropic · tutorial" t="Interactive tutorial" ext>9 chapters with exercises, from prompt structure to XML tags and examples</item>
    <item href="https://www.kaggle.com/whitepaper-prompt-engineering" k="Google · whitepaper" t="Prompt Engineering" ext>Techniques and best practices: examples, output format, instructions over constraints</item>
    <item href="https://academy.openai.com/public/clubs/work-users-ynjqu/resources/prompting" k="OpenAI Academy" t="Prompting" ext>What, for whom and why, context, output format, iteration</item>
    <item href="https://academy.openai.com/public/resources/chatgpt-for-any-role" k="OpenAI Academy" t="ChatGPT for any role" ext>Ready work-prompt templates by task and role</item>
  </b-links>
  <b-sublabel top="22">For teams and admins</b-sublabel>
  <b-links cols="2">
    <item href="https://support.claude.com/en/articles/14782391-claude-enterprise-consumption-guide" k="Claude · help center" t="Claude Enterprise consumption guide" ext>How tokens are spent: Claude Code and Cowork use far more than plain chat; group limits and a default model</item>
  </b-links>
</b-chapter>
<b-chapter id="next" title="Further reading">
  <b-links cols="2">
    <item href="/en/blog/harness-work-approaches/" k="Approaches" t="If the answer misses">Answer loop and review that fixes the request</item>
    <item href="/en/blog/specs-rules-skills/" k="Context" t="Specs, bible, rules and skills">Where a prompt lives beyond one chat</item>
    <item href="/en/blog/ai-in-code-harness-and-tools/" k="Engineering" t="AI in code">The harness and three groups of tools</item>
    <item href="/en/blog/chatgpt-enterprise-usage-report/" k="Report" t="ChatGPT Enterprise usage report">Who in the company uses what</item>
  </b-links>
</b-chapter>
<b-footer>The prompts are templates: fill in what is in square brackets. The techniques follow the official Anthropic, OpenAI and Google guides; the source is behind the icon next to each claim. OpenAI Help Center and Google guide quotes are paraphrased.</b-footer>
</b-post>
