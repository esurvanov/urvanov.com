---
title: Approaches to working with a harness: the answer loop and review that fixes the original request
date: 2026-09-28
description: What to do when an answer misses: three paths and a repeated loop. How review finds gaps, why they go into the original request and the pipeline runs again. Based on Anthropic, OpenAI and Google guides.
tags: AI, harness, prompts, review
category: prompts
layout: wide
toc: iterate=If it misses | review=Answer review | next=Further reading
---

<b-post series="prompts">
<b-flow lead label="Two approaches: the answer loop and review that fixes the request">
  <b-lane title="Answer missed" color="muted">
    <node icon="x" t="Answer">off the task</node>
    <node icon="refresh" t="One of three paths">refine, redo, ask</node>
    <node icon="ai-box" t="New answer">checked again</node>
  </b-lane>
  <b-lane title="Review found a gap" color="accent">
    <node icon="file" t="Request v1">the original task</node>
    <node icon="search" t="Review">two gaps</node>
    <node icon="check" t="Request v2">and the whole pipeline again</node>
  </b-lane>
</b-flow>
<b-cap>Both approaches work in any harness: a chat, Claude Code, Codex or Cursor.</b-cap>

<b-chapter id="iterate" icon="refresh" title="If the answer misses">
  <b-art names="harness-work-approaches/answer-paths harness-work-approaches/answer-paths-mobile"/>
  <b-sublabel top="22">Path 3: three questions and a new request</b-sublabel>
  <b-sublabel top="16">Step 1</b-sublabel>
  <b-prompt>
    [task description]
    Before doing the task, ask me 3 questions whose answers would improve the result the most. Do not start the work until I answer.
  </b-prompt>
  <b-sublabel top="12">Step 2</b-sublabel>
  <b-why>Answer the model's questions in your own words, in the same chat.</b-why>
  <b-sublabel top="12">Step 3</b-sublabel>
  <b-prompt>
    Build a final prompt from the task and my answers: role, who and why, data, example, format, question at the end. Output only the prompt text.
  </b-prompt>
  <b-finding>
    <ex>Three situations and one action for each: refine in the same chat, redo the prompt, or get questions from the model first.</ex>
    <gen>
      Refining keeps the context already given and fits when the task was understood. If the task was misread, redoing the prompt is faster.
      If the model made facts up, give it the needed data in the new request and allow it to say “I don’t know”<b-proof href="https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations" quote="Anthropic: “Explicitly give Claude permission to admit uncertainty. This simple technique can drastically reduce false information” — platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations"/>.
      The new answer is checked the same way, and the loop repeats until it fits.
      Questions from the model help when it is unclear what context is needed: ambiguity gives the model room to misinterpret<b-proof href="https://claude.com/blog/best-practices-for-prompt-engineering" quote="Anthropic: “Don&#39;t assume the AI reads minds: Be specific about what you want. Leaving things ambiguous gives the AI room to misinterpret” — claude.com/blog/best-practices-for-prompt-engineering"/>,
      and when intent is unclear, models ask for clarification more often<b-proof href="https://developers.openai.com/api/docs/guides/prompt-guidance" quote="OpenAI: “When the user&#39;s intent is unclear, the model is more likely to ask the user for clarification to proceed”; and “Before asking the user clarifying questions, you should complete the work that is already authorized from context” — developers.openai.com/api/docs/guides/prompt-guidance"/>.
    </gen>
    <do>For a new task where you are unsure of the context, start by asking for three questions. Send the final prompt built from the answers as a new request in a new chat.</do>
  </b-finding>
</b-chapter>

<b-chapter id="review" icon="search" title="Answer review: fix the original request">
  <b-why>The “rewrite the request” path as an example: the review found gaps, the original request lost what was wrong and gained what was missing, and everything ran again.</b-why>
  <b-art names="harness-work-approaches/two-runs harness-work-approaches/two-runs-mobile"/>
  <b-finding>
    <ex>The review found two cases that were not in the task: an international prefix without a plus and an empty string. The needless “Russian numbers only” limit was removed from the original request, the two cases were added, and the whole pipeline ran again.</ex>
    <gen>
      A gap the review finds goes into the original request, and the cycle starts over: the agent writes the code again, tests and review check the new cases, and the clarification stays in the task for future runs.
      A separate review pass with its own instruction is described in Google’s prompting guide<b-proof href="https://www.kaggle.com/whitepaper-prompt-engineering" quote="Google, Prompt Engineering whitepaper: the code section, including review and debugging as a separate prompt — kaggle.com/whitepaper-prompt-engineering"/>.
    </gen>
    <do>When the review finds something, add it to the original request and rerun the whole cycle: change, tests, review.</do>
  </b-finding>
  <b-cta href="/en/blog/harness-driven-development/" k="Next step · HDD" t="Harness-Driven Development">How to move a gap that keeps coming back from the request into the harness rules</b-cta>
</b-chapter>

<b-chapter id="next" title="Further reading">
  <b-links cols="2">
    <item href="/en/blog/specs-rules-skills/" k="Context" t="Specs, bible, rules and skills">What an agent should know about a project</item>
    <item href="/en/blog/harness-driven-development/" k="Method" t="Harness-Driven Development">Agent error → environment rule</item>
    <item href="/en/blog/work-prompts-examples/" k="Practice" t="Prompts for work tasks">Five parts and six examples</item>
    <item href="/en/blog/ai-in-code-harness-and-tools/" k="Comparison" t="Comparing harnesses">Claude Code, Codex, Cursor, Hermes and chat</item>
  </b-links>
</b-chapter>
<b-footer>Techniques follow the official Anthropic, OpenAI and Google guides; the source is behind the icon next to each claim. Quotes from Google’s guide are paraphrased.</b-footer>
</b-post>
