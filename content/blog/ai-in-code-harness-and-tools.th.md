---
title: Codex กับ Claude Code, Cursor กับ Hermes Agent: เปรียบเทียบเอเจนต์ AI สำหรับเขียนโค้ด
date: 2026-09-28
updated: 2026-11-13
description: Claude Code หรือ Codex, Cursor หรือ Hermes Agent: เอเจนต์รันที่ไหน มองเห็นอะไร คิดด้วยโมเดลอะไร และราคาเท่าไร เปรียบเทียบ harness ห้าตัวเคียงกัน และเลือกตัวไหนสำหรับงานแบบใด พร้อมลิงก์ไปยังเอกสาร
tags: AI, harness, Claude Code, Codex, Cursor, Hermes Agent
category: harness
layout: wide
toc: tasks=เลือก harness ตัวไหนสำหรับงานแบบใด | stable=อะไรที่คงที่ | harness=harness คืออะไร | compare=มองเห็นและทำอะไรได้ | faq=คำถามที่พบบ่อย | next=อ่านเพิ่มเติม
---

Codex กับ Claude Code ต่างกันที่ตระกูลโมเดล (GPT สำหรับ Codex, Claude สำหรับ Claude Code) และแผนการใช้งาน ส่วนการเข้าถึงโปรเจกต์และสิ่งที่ทำได้แทบเหมือนกัน จึงควรเลือกตัวที่ทีมมีโมเดลและการสมัครใช้งานอยู่แล้ว Cursor เหมาะถ้าทำงานในโปรแกรมแก้ไขโค้ดและต้องการโมเดลจากหลายผู้ให้บริการ Hermes Agent เหมาะถ้าต้องการโมเดลใดก็ได้ รวมถึงโมเดลที่รันในเครื่อง ด้านล่างมีแผนที่ ตาราง และการเลือกตามงาน

<b-post series="harness">
<b-tool-groups label="เครื่องมือสี่กลุ่ม">
  <group k="เอเจนต์ของผู้ให้บริการโมเดล" kind="pair" chips="Claude Code|Codex" swap="ใช้แทนกันได้เกือบทั้งหมด"></group>
  <group k="harness โอเพนซอร์ส" kind="open" chips="Hermes Agent" alts="และตัวเลือกอื่น: OpenCode, Aider, Cline, Goose">harness ประเภทเดียวกันที่ใช้โมเดลใดก็ได้ ผ่าน API ที่คิดเงินตามโทเค็น หรือรันในเครื่องของตัวเอง</group>
  <group k="โปรแกรมแก้ไขโค้ดที่มี AI" chip="Cursor">IDE ที่สร้างรอบ AI ใช้โมเดลจากหลายผู้ให้บริการ</group>
  <group k="ผู้ช่วย AI ในเบราว์เซอร์" kind="chat" chip="ChatGPT, Claude">โค้ดรันใน sandbox ไม่เข้าถึงโปรเจกต์</group>
</b-tool-groups>
<b-cap>ป้าย <b-drift sm>snapshot</b-drift> หมายความว่าข้อมูลเป็นปัจจุบันณ เดือนกันยายน 2026 และอาจล้าสมัยภายในหนึ่งสัปดาห์</b-cap>

<b-chapter id="tasks" icon="venn" title="เลือก harness ตัวไหนสำหรับงานแบบใด">
  <b-why>การเลือกเริ่มจากงาน วงกลมสองวงคือตระกูลโมเดล Claude และ GPT ตำแหน่งของผลิตภัณฑ์บนแผนที่บอกว่าใช้งานกับโมเดลใดได้ Claude Code และ Codex ผูกกับตระกูลของตัวเอง Cursor และแชตอยู่ในส่วนที่ซ้อนกัน ส่วน Hermes Agent ครอบคลุม Cursor และแชตทั้งหมด ซ้อนกับ Claude Code และ Codex บางส่วน และล้นออกนอกวงกลมทั้งสอง เพราะเชื่อมต่อโมเดลใดก็ได้ รวมถึงโมเดลในเครื่อง<b-proof href="https://hermes-agent.nousresearch.com/docs/integrations/providers" quote="Hermes Agent: local models via Ollama, llama.cpp, vLLM or LM Studio — “Ollama runs open-weight models locally with one command. Best for: quick local experimentation, privacy-sensitive work, offline use” — hermes-agent.nousresearch.com/docs/integrations/providers"/></b-why>
  <b-drift>หมายเหตุ · snapshot กันยายน 2026</b-drift>
  <b-venn name="ai-in-code-harness-and-tools/venn"/>
  <b-table>
  | งาน | กลุ่ม |
  |---|---|
  | ถามครั้งเดียวโดยไม่ต้องใช้ repository | แชต: ChatGPT หรือ Claude |
  | แก้ภายในโปรเจกต์ที่เปิดอยู่ หลายไฟล์ | เอเจนต์ในโปรแกรมแก้ไขโค้ด |
  | ทำงานตั้งแต่ต้นจนจบโดยไม่ต้องคอยดูทีละขั้น | Claude Code หรือ Codex |
  | ทำงานในโปรเจกต์เดียวในโปรแกรมแก้ไขที่คุ้นเคย พร้อมโมเดลจากหลายผู้ให้บริการ | Cursor |
  | harness แบบกำหนดเองบนโมเดลใดก็ได้ คิดเงินตามโทเค็น | Hermes Agent |
  | prompt สำหรับใช้งานจริงผ่าน API กับอินพุตขนาดใหญ่ | ข้อมูลในแท็ก XML |
  </b-table>
  <b-sublabel top="22">คำถามที่พบบ่อย</b-sublabel>
  <b-qa>
    <q t="Claude Code หรือ Codex">ทั้งสองเหมือนกันในการเข้าถึงโปรเจกต์และสิ่งที่ทำได้ ต่างกันที่โมเดล (Claude และ GPT) และฟีเจอร์เฉพาะตัวที่เปลี่ยนไปในแต่ละรุ่น ทีมเลือกตามโมเดลและแผนที่มีอยู่แล้ว</q>
    <q t="Cursor หรือ Claude Code">Cursor ทำงานภายในโปรแกรมแก้ไขโค้ดที่เปิดโปรเจกต์ไว้ และเลือกระหว่างโมเดลจากหลายผู้ให้บริการได้ Claude Code รับงานตั้งแต่ต้นจนจบในเทอร์มินัล แต่ใช้ได้เฉพาะโมเดล Claude</q>
    <q t="Hermes Agent หรือ Claude Code">Hermes Agent เป็น harness โอเพนซอร์ส เชื่อมต่อโมเดลใดก็ได้ รวมถึงโมเดลในเครื่อง และจ่ายตามโทเค็น Claude Code ผูกกับตระกูล Claude และการสมัครใช้งาน เลือก Hermes ถ้าต้องการโมเดลจากหลายผู้ให้บริการหรือโมเดลของตัวเอง</q>
    <q t="ทางเลือกแทน Claude Code">ในบรรดาที่กล่าวถึงที่นี่: Codex (การออกแบบเดียวกัน โมเดล GPT) Cursor (โปรแกรมแก้ไขโค้ด โมเดลจากหลายผู้ให้บริการ) และ Hermes Agent ส่วน <a href="https://opencode.ai" target="_blank" rel="noopener">OpenCode</a>, <a href="https://aider.chat" target="_blank" rel="noopener">Aider</a>, <a href="https://cline.bot" target="_blank" rel="noopener">Cline</a> และ <a href="https://goose-docs.ai" target="_blank" rel="noopener">Goose</a> สร้างในแนวคล้ายกัน</q>
  </b-qa>
  <b-finding>
    <ex>งานกำหนดสองข้อกับ harness คือต้องใช้โปรเจกต์หรือไม่ และตระกูลโมเดลไหนเหมาะ เอเจนต์ของผู้ให้บริการใช้ได้ตระกูลเดียว Cursor และแชตให้เลือกระหว่าง Claude กับ GPT ส่วน harness โอเพนซอร์สรับโมเดลใดก็ได้ รวมถึงโมเดลในเครื่อง</ex>
    <gen>เลือกกลุ่มตามงานก่อน แล้วค่อยเลือกผลิตภัณฑ์ในกลุ่ม Claude Code และ Codex ต่างกันที่โมเดลและฟีเจอร์เฉพาะของ harness ที่เปลี่ยนไปในแต่ละรุ่น แต่ในหลักการสร้างแบบเดียวกัน ดังนั้นสิ่งที่ตัดสินคือโมเดลและแผนที่ทีมมีอยู่แล้ว</gen>
    <do>อธิบายงานในหนึ่งบรรทัดและตกลงสามเงื่อนไข ต้องใช้โปรเจกต์หรือไม่ ต้องมีคนดูทุกขั้นหรือไม่ และต้องใช้โมเดลของผู้ให้บริการอื่นหรือโมเดลในเครื่องหรือไม่ แล้วเลือกกลุ่มตามเงื่อนไขเหล่านั้น</do>
  </b-finding>
</b-chapter>

<b-chapter id="stable" icon="lock" title="อะไรที่คงที่">
  <b-why>Claude Code และ Codex เป็นผลิตภัณฑ์คู่แข่งที่ความสามารถเข้าใกล้กันทุกรุ่น ช่องว่างระหว่างสองตัวเล็ก บทความนี้จึงอิงสิ่งที่คงที่</b-why>
  <b-two-lists>
    <list icon="lock" t="คงที่" items="ตระกูลโมเดล|วิธีสร้าง harness|วิธีทำงานกับเอเจนต์"></list>
    <list icon="refresh" t="เปลี่ยนทุกสัปดาห์" warn items="ฟีเจอร์และโหมด|การตั้งค่าความอิสระเริ่มต้น|การวางตำแหน่ง|โมเดล แผน และขีดจำกัด"><b-proof href="https://code.claude.com/docs/en/changelog" quote="Claude Code: 8 releases from 17 to 25 September 2026, from 2.1.275 to 2.1.283 — code.claude.com/docs/en/changelog"/><b-proof href="https://learn.chatgpt.com/docs/changelog" quote="Codex: four CLI releases from 22 to 26 September 2026 and the new GPT-6 Sol and Luna models — learn.chatgpt.com/docs/changelog"/></list>
  </b-two-lists>
  <b-finding>
    <ex>Claude Code ออก 8 รุ่นระหว่าง 17 ถึง 25 กันยายน ส่วน Codex ออก 4 รุ่นและโมเดล GPT-6 ใหม่ระหว่าง 22 ถึง 26 กันยายน</ex>
    <gen>การเปรียบเทียบฟีเจอร์ของ Claude Code กับ Codex ล้าสมัยเร็วกว่าที่ใครจะตามทัน สามอย่างที่คงที่คือ ตระกูลโมเดล วิธีสร้าง harness และวิธีทำงานกับเอเจนต์</gen>
    <do>เมื่อเลือกระหว่าง Claude Code กับ Codex ให้ตัดสินจากโมเดลและแผนที่ทีมมีอยู่แล้ว</do>
  </b-finding>
</b-chapter>

<b-chapter id="harness" icon="layers" title="harness คืออะไร">
  <b-why>โมเดลตอบเป็นข้อความ harness คือทุกอย่างรอบตัวมัน ได้แก่ skill เครื่องมือ สภาพแวดล้อม และคนที่อยู่ในลูป ทุกผลิตภัณฑ์ AI มี harness ตั้งแต่เอเจนต์ในเทอร์มินัลไปจนถึงแชตในเบราว์เซอร์<b-proof href="https://claude.com/blog/a-harness-for-every-task-dynamic-workflows-in-claude-code" quote="Anthropic calls Claude Code a harness: the post “A harness for every task” — claude.com/blog/a-harness-for-every-task-dynamic-workflows-in-claude-code"/> สิ่งที่ต่างกันคือองค์ประกอบ คอลัมน์ "ผ่าน API" ใช้ Hermes Agent เป็นตัวอย่าง harness โอเพนซอร์สมีมากมาย เช่น OpenCode, Aider, Cline และ Goose และสร้างแบบเดียวกัน</b-why>
  <b-drift>snapshot · กันยายน 2026</b-drift>
  <b-harness-matrix label="ชั้นของ harness แยกตามคอลัมน์" diff="ต่างจากแบบองค์กร" legend="ต่างจากแบบองค์กร|ใช่|บางส่วน">
    <col icon="code-wide" t="ผ่าน API">Hermes Agent · API สาธารณะ</col>
    <col icon="laptop" t="องค์กร">Claude Code · Codex · API ส่วนตัว</col>
    <col icon="cloud" t="คลาวด์">Claude Code · Codex</col>
    <col icon="chat-box" t="แชต">ChatGPT · Claude</col>
    <row t="คน"/>
    <row t="สภาพแวดล้อม"/>
    <row t="เครื่องมือ"/>
    <row t="Skills"/>
    <row t="โมเดล"/>
    <cell icon="user-alt" t="ร่วมทาง / ตอนท้าย"><b-proof href="https://hermes-agent.nousresearch.com/docs/user-guide/security" quote="Hermes Agent: for dangerous commands “the user must explicitly approve it”; sessions without a human use unattended_mode — hermes-agent.nousresearch.com/docs/user-guide/security"/></cell>
    <cell icon="user-alt" t="ร่วมทาง / ตอนท้าย"><b-proof href="https://code.claude.com/docs/en/permission-modes" quote="Claude Code: “In Manual mode, Claude Code stops and asks you before most actions… In auto mode, a second model, the classifier, reviews actions instead of you” — code.claude.com/docs/en/permission-modes"/><b-proof href="https://learn.chatgpt.com/docs/sandboxing" quote="Codex: “The agent works inside the sandbox by default and asks when it needs to go beyond that boundary” — learn.chatgpt.com/docs/sandboxing"/></cell>
    <cell icon="user-alt" t="ร่วมทาง / ตอนท้าย"><b-proof href="https://code.claude.com/docs/en/claude-code-on-the-web" quote="Claude Code: “You pick a cloud session's permission mode from the mode dropdown, both when you create the task and while the session runs” — code.claude.com/docs/en/claude-code-on-the-web"/><b-proof href="https://learn.chatgpt.com/docs/cloud" quote="Codex: “Give longer tasks dedicated environments and let them continue while you work on something else” — learn.chatgpt.com/docs/cloud"/></cell>
    <cell icon="user-alt" t="ทุกขั้น" diff></cell>
    <cell icon="rows" t="คอมพิวเตอร์ของคุณ"><b-proof href="https://hermes-agent.nousresearch.com/docs/user-guide/security" quote="Hermes Agent: the default backend is “local — runs on host”, commands run on your computer — hermes-agent.nousresearch.com/docs/user-guide/security"/></cell>
    <cell icon="rows" t="คอมพิวเตอร์ของคุณ"><b-proof href="https://code.claude.com/docs/en/overview" quote="Claude Code: “Desktop scheduled tasks run on your computer, with direct access to your local files and tools” — code.claude.com/docs/en/overview"/><b-proof href="https://learn.chatgpt.com/docs/codex/cli" quote="Codex: “Codex can inspect files, make edits, and run the tools already installed on your computer” — learn.chatgpt.com/docs/codex/cli"/></cell>
    <cell icon="cloud" t="VM ของผู้ให้บริการ" diff part><b-proof href="https://code.claude.com/docs/en/claude-code-on-the-web" quote="Claude Code: “Isolated virtual machines: each session runs in an isolated, Anthropic-managed VM” — code.claude.com/docs/en/claude-code-on-the-web"/><b-proof href="https://learn.chatgpt.com/docs/cloud" quote="Codex: “Run tasks in isolated cloud environments, work in parallel, and start work from the web, GitHub, GitLab, Linear, or Slack” — learn.chatgpt.com/docs/cloud"/></cell>
    <cell icon="rows" t="sandbox" diff part><b-proof href="https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude" quote="Claude: “When Claude executes code or creates files, it operates within an isolated, sandboxed container” — support.claude.com/en/articles/12111783"/><b-proof href="https://help.openai.com/en/articles/8437071-data-analysis-with-chatgpt" quote="ChatGPT: สำหรับการวิเคราะห์ข้อมูล เขียนและรัน Python ในสภาพแวดล้อมแยกที่ไม่มีคำขอภายนอก สรุปความจาก OpenAI Help Center — help.openai.com/en/articles/8437071"/></cell>
    <cell icon="terminal-alt"><b-proof href="https://hermes-agent.nousresearch.com/docs/user-guide/features/overview" quote="Hermes Agent: built-in tools — “web search, terminal execution, file editing, memory, delegation” — hermes-agent.nousresearch.com/docs/user-guide/features/overview"/></cell>
    <cell icon="terminal-alt"><b-proof href="https://code.claude.com/docs/en/overview" quote="Claude Code: “reads your codebase, edits files, runs commands, and integrates with your development tools” — code.claude.com/docs/en/overview"/><b-proof href="https://learn.chatgpt.com/docs/codex/cli" quote="Codex: “Inspect code, make changes, run commands, and automate repeatable work without leaving your terminal” — learn.chatgpt.com/docs/codex/cli"/></cell>
    <cell icon="terminal-alt"><b-proof href="https://code.claude.com/docs/en/overview" quote="Claude Code: “reads your codebase, edits files, runs commands, and integrates with your development tools” — code.claude.com/docs/en/overview"/><b-proof href="https://learn.chatgpt.com/docs/codex/cli" quote="Codex: “Inspect code, make changes, run commands, and automate repeatable work without leaving your terminal” — learn.chatgpt.com/docs/codex/cli"/></cell>
    <cell icon="terminal-alt" t="ตัวเชื่อมต่อ" diff part><b-proof href="https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities" quote="Claude: “Connectors let Claude access your apps and services, retrieve your data, and take actions within connected services” — support.claude.com/en/articles/11176164"/><b-proof href="https://help.openai.com/en/articles/11487775-connected-apps-in-chatgpt" quote="ChatGPT: “An app connects ChatGPT to an external service, such as Google Drive or Slack, so it can access information or perform supported actions” — help.openai.com/en/articles/11487775"/></cell>
    <cell icon="sparkle"><b-proof href="https://hermes-agent.nousresearch.com/docs/user-guide/features/skills" quote="Hermes Agent: skills are “on-demand knowledge documents the agent can load when needed”, following agentskills.io — hermes-agent.nousresearch.com/docs/user-guide/features/skills"/></cell>
    <cell icon="sparkle"><b-proof href="https://code.claude.com/docs/en/overview" quote="Claude Code: “Each surface connects to the same underlying Claude Code engine, so your repo's CLAUDE.md files, settings, and MCP servers work across all of them” — code.claude.com/docs/en/overview"/><b-proof href="https://learn.chatgpt.com/docs/customization/overview" quote="Codex: “AGENTS.md gives Codex durable project guidance that travels with your repository”; “Skills give Codex reusable capabilities for repeatable workflows” — learn.chatgpt.com/docs/customization/overview"/></cell>
    <cell icon="sparkle"><b-proof href="https://code.claude.com/docs/en/overview" quote="Claude Code: “Each surface connects to the same underlying Claude Code engine, so your repo's CLAUDE.md files, settings, and MCP servers work across all of them” — code.claude.com/docs/en/overview"/><b-proof href="https://learn.chatgpt.com/docs/customization/overview" quote="Codex: “AGENTS.md gives Codex durable project guidance that travels with your repository”; “Skills give Codex reusable capabilities for repeatable workflows” — learn.chatgpt.com/docs/customization/overview"/></cell>
    <cell icon="sparkle"><b-proof href="https://support.claude.com/en/articles/12512180-use-skills-in-claude" quote="Claude: “Skills extend Claude's capabilities by giving it access to specialized knowledge and workflows” — support.claude.com/en/articles/12512180"/><b-proof href="https://help.openai.com/en/articles/20001066-skills-in-chatgpt" quote="ChatGPT: skills คือเวิร์กโฟลว์ที่นำกลับมาใช้ซ้ำได้ ประกอบด้วยคำสั่ง ตัวอย่าง และโค้ด ในแผน Business, Enterprise และ Edu สรุปความจาก OpenAI Help Center — help.openai.com/en/articles/20001066"/></cell>
    <cell icon="circle-dot" t="ใดก็ได้ · API ราคาต่อโทเค็น หรือในเครื่อง" diff><b-proof href="https://hermes-agent.nousresearch.com/docs/integrations/providers" quote="Hermes Agent: “works with any OpenAI-compatible API endpoint”; with a provider key “requests are billed pay-per-token against that key's organization (standard API pricing)” — hermes-agent.nousresearch.com/docs/integrations/providers"/><b-proof href="https://hermes-agent.nousresearch.com/docs/integrations/providers" quote="Hermes Agent: local models via Ollama, llama.cpp, vLLM or LM Studio — “Ollama runs open-weight models locally with one command. Best for: quick local experimentation, privacy-sensitive work, offline use” — hermes-agent.nousresearch.com/docs/integrations/providers"/></cell>
    <cell icon="circle-dot" t="Claude / GPT · API ส่วนตัว แผน"><b-proof href="https://code.claude.com/docs/en/overview" quote="Claude Code: “Most surfaces require a Claude subscription or Anthropic Console account” — code.claude.com/docs/en/overview"/><b-proof href="https://learn.chatgpt.com/docs/pricing" quote="Codex: “ChatGPT Work and Codex are included in your ChatGPT Free, Go, Plus, Pro, Business, Edu, or Enterprise plan” — learn.chatgpt.com/docs/pricing"/></cell>
    <cell icon="circle-dot" t="Claude / GPT · API ส่วนตัว แผน"><b-proof href="https://code.claude.com/docs/en/claude-code-on-the-web" quote="Claude Code: “Cloud sessions are available on Pro, Max, and Team plans, and for Enterprise users with premium seats” — code.claude.com/docs/en/claude-code-on-the-web"/><b-proof href="https://learn.chatgpt.com/docs/pricing" quote="Codex: “ChatGPT Work and Codex are included in your ChatGPT Free, Go, Plus, Pro, Business, Edu, or Enterprise plan” — learn.chatgpt.com/docs/pricing"/></cell>
    <cell icon="circle-dot" t="Claude / GPT ฟรี / แผน" diff></cell>
  </b-harness-matrix>
  <b-sublabel top="22">แชตและเอเจนต์</b-sublabel>
  <b-qa>
    <q t="Claude Code ต่างจาก Claude ในแชตอย่างไร">ตระกูลโมเดลเดียวกัน แต่ harness ต่างกัน แชตตอบในบทสนทนาและมองไม่เห็นโปรเจกต์ของคุณ Claude Code อ่านโค้ด แก้ไฟล์ และรันคำสั่งในโปรเจกต์ ทั้งในเทอร์มินัล โปรแกรมแก้ไขโค้ด แอปเดสก์ท็อป หรือเบราว์เซอร์ <a href="https://code.claude.com/docs/en/overview" target="_blank" rel="noopener">เอกสาร</a></q>
    <q t="Codex ต่างจาก ChatGPT อย่างไร">หลักเดียวกัน โมเดล GPT ใช้ร่วมกัน สภาพแวดล้อมต่างกัน ChatGPT สนทนาโดยไม่เข้าถึงโปรเจกต์ ส่วน Codex ทำงานกับโค้ดและรันคำสั่ง</q>
  </b-qa>
  <b-finding>
    <ex>สี่ประเภทต่างกันที่สองสมบัติ คือโค้ดรันที่ไหนและเข้าถึงโมเดลอย่างไร แบบโอเพนซอร์สและแบบองค์กรรันบนคอมพิวเตอร์ของคุณ ต่างกันที่การเข้าถึงโมเดลเท่านั้น ซึ่งเป็นที่มาของส่วนต่างด้านราคา</ex>
    <gen>ประเภทที่รันในเครื่องเหมาะกับงานที่เกี่ยวกับไฟล์และความลับบนคอมพิวเตอร์ของคุณ คลาวด์เหมาะกับงานยาวและงานขนาน แชตเหมาะกับงานที่ไม่ต้องเข้าถึงโปรเจกต์ ข้อจำกัดบีบทางเลือกให้แคบลง แผนองค์กรไม่มีให้ในทุกเขตอำนาจ<b-proof href="https://www.anthropic.com/supported-countries" quote="Anthropic: “To the extent permitted by law, Anthropic reserves the right to not provide its products or services to entities whose majority direct or indirect ownership is attributable to nations other than those listed in our Supported Regions Policy” — anthropic.com/supported-countries"/></gen>
    <do>ตัดสินว่างานต้องใช้ไฟล์บนคอมพิวเตอร์ของคุณหรือไม่ เอเจนต์ควรทำงานโดยไม่มีคุณหรือไม่ และใช้โมเดลใดได้ ข้อแรกชี้ไปที่ประเภทที่รันในเครื่อง ข้อสองชี้ไปที่คลาวด์ ไม่มีข้อใดเลยชี้ไปที่แชต</do>
  </b-finding>
</b-chapter>

<b-chapter id="compare" icon="table" title="มองเห็นและทำอะไรได้">
  <b-drift>snapshot · กันยายน 2026</b-drift>
  <b-harness-compare label="มองเห็นอะไร · ทำอะไรได้เอง · โมเดล" heads="มองเห็นอะไร|ทำอะไรได้เอง|โมเดล|ค่าใช้จ่าย|แหล่งที่มา" acts="แก้ไฟล์ในโปรเจกต์|รันคำสั่งบนคอมพิวเตอร์ของคุณ|รันลูป “แก้ → ทดสอบ → แก้” ได้เอง|ทำงานในสภาพแวดล้อมแยก" yes="ได้" no="ไม่ได้" cheap="ถูกกว่า" dear="แพงกว่า · ราคาจริงในคำอธิบายเมื่อวางเมาส์">
    <row t="Hermes Agent" scope="3" scopelabel="โค้ดทั้งหมด" acts="1110" models="5" modelslabel="โมเดลใดก็ได้: ผ่าน API หรือในเครื่อง" cost="3" costlabel="ต่อโทเค็น หรือ $0 API ตามราคาผู้ให้บริการ หรือโมเดลของคุณเองในเครื่อง" costproofs="2"><b-proof href="https://hermes-agent.nousresearch.com/docs/integrations/providers" quote="Hermes Agent: with a provider key “requests are billed pay-per-token against that key's organization (standard API pricing)” — hermes-agent.nousresearch.com/docs/integrations/providers"/><b-proof href="https://hermes-agent.nousresearch.com/docs/integrations/providers" quote="Hermes Agent: local models via Ollama, llama.cpp, vLLM or LM Studio — “Ollama runs open-weight models locally with one command. Best for: quick local experimentation, privacy-sensitive work, offline use” — hermes-agent.nousresearch.com/docs/integrations/providers"/><b-proof href="https://hermes-agent.nousresearch.com/docs/user-guide/security" quote="Hermes Agent: works in your project, the default backend is “local — runs on host” — hermes-agent.nousresearch.com/docs/user-guide/security"/><b-proof href="https://hermes-agent.nousresearch.com/docs/user-guide/features/overview" quote="Hermes Agent: edits files, runs terminal commands, uses skills — hermes-agent.nousresearch.com/docs/user-guide/features/overview"/><b-proof href="https://hermes-agent.nousresearch.com/docs/integrations/providers" quote="Hermes Agent: connects to models from different providers via API — hermes-agent.nousresearch.com/docs/integrations/providers"/></row>
    <row t="Claude Code และ Codex" scope="3" scopelabel="โค้ดทั้งหมด" acts="1110" models="1" modelslabel="หนึ่งตระกูลโมเดล: แต่ละผลิตภัณฑ์มีของตัวเอง" cost="2" costlabel="เริ่มที่ $20/เดือน หรือต่อโทเค็นผ่าน API" costproofs="3"><b-proof href="https://claude.com/pricing" quote="Claude: Pro is $20 a month billed monthly, Claude Code is included in Pro and Max; Enterprise is “Seat price + usage at API rates” — claude.com/pricing"/><b-proof href="https://learn.chatgpt.com/docs/pricing" quote="Codex: “ChatGPT Work and Codex are included in your ChatGPT Free, Go, Plus, Pro, Business, Edu, or Enterprise plan”; the alternative is to “Pay for Codex usage based on API pricing” — learn.chatgpt.com/docs/pricing"/><b-proof href="https://help.openai.com/en/articles/6950777-what-is-chatgpt-plus" quote="ChatGPT Plus ราคา $20 ต่อเดือน สรุปความจาก OpenAI Help Center — help.openai.com/en/articles/6950777"/><b-proof href="https://code.claude.com/docs/en/overview" quote="Claude Code: “Claude Code is an agentic coding tool that reads your codebase” — code.claude.com/docs/en/overview"/><b-proof href="https://learn.chatgpt.com/docs/codex/cli" quote="Codex: “Codex can inspect files, make edits, and run the tools already installed on your computer” — learn.chatgpt.com/docs/codex/cli"/><b-proof href="https://code.claude.com/docs/en/overview" quote="Claude Code: “reads your codebase, edits files, runs commands, and integrates with your development tools” — code.claude.com/docs/en/overview"/><b-proof href="https://learn.chatgpt.com/docs/codex/cli" quote="Codex: “Inspect code, make changes, run commands, and automate repeatable work without leaving your terminal” — learn.chatgpt.com/docs/codex/cli"/></row>
    <row t="Cursor" scope="2" scopelabel="โปรเจกต์ที่เปิดอยู่" acts="1100" models="4" modelslabel="โมเดลจาก 8 ผู้ให้บริการ" cost="2" costlabel="เริ่มที่ $8/เดือน (เฉพาะ Grok) โมเดลอื่นเริ่มที่ $30/เดือน คิดตามราคา API" costproofs="1"><b-proof href="https://cursor.com/pricing" quote="Cursor: Plus is “$8 /month”, “Plus includes Grok models only”; Premium is “$30 /month”; “Third Party model usage in Cursor is not included in the monthly prices shown and must be purchased separately” — cursor.com/pricing, November 2026"/><b-proof href="https://cursor.com/docs/agent/chat/checkpoints" quote="Cursor: “Checkpoints save snapshots of your codebase during an Agent session” — cursor.com/docs/agent/chat/checkpoints"/><b-proof href="https://cursor.com/docs/agent/overview" quote="Cursor: “Suggest edits to files and apply them automatically”, “Execute terminal commands and monitor output” — cursor.com/docs/agent/overview"/><b-proof href="https://cursor.com/docs/models" quote="Cursor: “Cursor supports frontier models from OpenAI, Anthropic, Google, SpaceXSI, and more”; it also has its own models such as Composer 2.5 — cursor.com/docs/models"/><b-proof href="https://cursor.com/pricing" quote="Cursor: “Third Party model usage in Cursor is not included in the monthly prices shown and must be purchased separately” — cursor.com/pricing"/></row>
    <row t="แชต: ChatGPT, Claude" scope="1" scopelabel="เฉพาะบทสนทนาและบริการที่เชื่อมต่อ" acts="0001" models="1" modelslabel="หนึ่งตระกูลโมเดล: แต่ละผลิตภัณฑ์มีของตัวเอง" cost="1" costlabel="ฟรี · สมัครใช้งานเริ่มที่ $20" costproofs="2"><b-proof href="https://claude.com/pricing" quote="Claude: Pro is $20 a month billed monthly, Claude Code is included in Pro and Max; Enterprise is “Seat price + usage at API rates” — claude.com/pricing"/><b-proof href="https://help.openai.com/en/articles/6950777-what-is-chatgpt-plus" quote="ChatGPT Plus ราคา $20 ต่อเดือน สรุปความจาก OpenAI Help Center — help.openai.com/en/articles/6950777"/><b-proof href="https://support.claude.com/en/articles/11176164-use-connectors-to-extend-claude-s-capabilities" quote="Claude: “Connectors let Claude access your apps and services, retrieve your data, and take actions within connected services” — support.claude.com/en/articles/11176164"/><b-proof href="https://help.openai.com/en/articles/11487775-connected-apps-in-chatgpt" quote="ChatGPT: “An app connects ChatGPT to an external service, such as Google Drive or Slack, so it can access information or perform supported actions” — help.openai.com/en/articles/11487775"/><b-proof href="https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude" quote="Claude: “When Claude executes code or creates files, it operates within an isolated, sandboxed container” — support.claude.com/en/articles/12111783"/><b-proof href="https://help.openai.com/en/articles/8437071-data-analysis-with-chatgpt" quote="ChatGPT: สำหรับการวิเคราะห์ข้อมูล เขียนและรัน Python ในสภาพแวดล้อมแยกที่ไม่มีคำขอภายนอก สรุปความจาก OpenAI Help Center — help.openai.com/en/articles/8437071"/></row>
  </b-harness-compare>
  <b-sublabel top="22">แต่ละอย่างคืออะไร</b-sublabel>
  <b-qa cols="3">
    <q t="Codex คืออะไร">เอเจนต์ของ OpenAI สำหรับทำงานกับโค้ด รับงาน แก้ไฟล์ และรันคำสั่ง ทำงานได้ในเทอร์มินัล ส่วนขยายของโปรแกรมแก้ไขโค้ด และบนคลาวด์ ด้วยโมเดล GPT สิ่งที่ทำให้ต่างจากแชต ChatGPT คือการเข้าถึงโปรเจกต์ <a href="https://learn.chatgpt.com/docs/codex/cli" target="_blank" rel="noopener">เอกสาร</a></q>
    <q t="Cursor คืออะไร">โปรแกรมแก้ไขโค้ดที่มีเอเจนต์ในตัว เอเจนต์ทำงานจนเสร็จเอง รันคำสั่งในเทอร์มินัล และแก้โค้ด ทำงานในโปรเจกต์ที่เปิดอยู่ และรองรับโมเดลจากหลายผู้ให้บริการ <a href="https://cursor.com/docs/agent/overview" target="_blank" rel="noopener">เอกสาร</a></q>
    <q t="Hermes Agent คืออะไร">เอเจนต์โอเพนซอร์สจาก Nous Research รันบนคอมพิวเตอร์ของคุณ เชื่อมต่อผู้ให้บริการโมเดลหลายราย รวมถึง Claude และโมเดลเปิด และทำงานกับโมเดลในเครื่องได้ <a href="https://hermes-agent.nousresearch.com/docs/user-guide/features/overview" target="_blank" rel="noopener">เอกสาร</a></q>
  </b-qa>
  <b-finding>
    <ex>Claude Code และ Codex เหมือนกันในการเข้าถึงโปรเจกต์และสิ่งที่ทำได้ ต่างกันที่โมเดลและฟีเจอร์เฉพาะของ harness ขณะที่ในหลักการเหมือนกัน</ex>
    <gen>Cursor โดดเด่นด้วยโปรแกรมแก้ไขโค้ดในตัวและโมเดลจากหลายผู้ให้บริการ แชตโดดเด่นด้วยการไม่เข้าถึงโปรเจกต์ ระหว่าง Claude Code กับ Codex โมเดลและแผนเป็นตัวตัดสิน</gen>
    <do>ถ้างานต้องใช้ไฟล์ของโปรเจกต์ แชตไม่เหมาะ จากนั้นเลือกตามโมเดลที่ทีมมีอยู่แล้ว</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="คำถามที่พบบ่อย">
  <b-faq-cards>
    <q t="Codex หรือ Claude Code: เลือกตัวไหน">ในการเข้าถึงโปรเจกต์และสิ่งที่ทำได้แทบเหมือนกัน ต่างกันที่โมเดล GPT สำหรับ Codex และ Claude สำหรับ Claude Code เลือกตัวที่ทีมมีโมเดลและการสมัครใช้งานอยู่แล้ว</q>
    <q t="Cursor หรือ Claude Code">Cursor ทำงานภายในโปรแกรมแก้ไขโค้ดและให้เลือกโมเดลจากหลายผู้ให้บริการ Claude Code รับงานตั้งแต่ต้นจนได้ผลลัพธ์ในเทอร์มินัลด้วยโมเดล Claude</q>
    <q t="มีทางเลือกอะไรแทน Claude Code บ้าง">Codex ที่สร้างแบบเดียวกันบนโมเดล GPT, Cursor ที่มีโปรแกรมแก้ไขโค้ดของตัวเอง และ Hermes Agent ที่ใช้โมเดลใดก็ได้ ส่วน OpenCode, Aider, Cline และ Goose ทำงานในแนวคล้ายกัน</q>
    <q t="ทำไมการเปรียบเทียบฟีเจอร์จึงล้าสมัยเร็ว">Claude Code และ Codex ออกเวอร์ชันใหม่ทุกสัปดาห์ สามอย่างที่คงที่คือ ตระกูลโมเดล การออกแบบ harness และวิธีทำงานกับเอเจนต์</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="อ่านเพิ่มเติม">
  <b-links cols="2">
    <item href="/blog/chatgpt-enterprise-usage-report/" k="รายงาน" t="รายงานการใช้งาน ChatGPT Enterprise">ใครในบริษัทใช้อะไร</item>
    <item href="/blog/ai-interviews-without-leading-questions/" k="สัมภาษณ์" t="สัมภาษณ์โดยไม่ใช้คำถามชี้นำ">วิธีหาว่าพนักงานต้องการอะไรจาก AI จริง ๆ</item>
  </b-links>
</b-chapter>
<b-footer>Snapshot ณ เดือนกันยายน 2026 ข้อมูลผลิตภัณฑ์อิงเอกสารทางการของ Anthropic, OpenAI, Cursor และ Nous Research แหล่งที่มาอยู่หลังไอคอนข้างแต่ละข้อความ คำอ้างอิงจาก OpenAI Help Center สองรายการเป็นการสรุปความ</b-footer>
</b-post>
