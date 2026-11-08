---
title: เอเจนต์ AI = LLM + harness: LLM, harness และเอเจนต์ต่างกันอย่างไร และ harness มีอะไรบ้าง
date: 2026-10-12
updated: 2026-11-08
description: เอเจนต์ AI = LLM + harness LLM, harness และเอเจนต์ในตารางเดียว ห้ากลุ่มที่ harness ประกอบด้วย และทำไมโมเดลเดียวกันจึงทำงานต่างกันในแชตกับใน Claude Code
tags: AI, เอเจนต์, เอเจนต์ AI, LLM, harness, agent harness, harness engineering
category: harness
layout: wide
mentions: AI agent, LLM, agent harness, harness engineering, agent loop, MCP, Claude Code, Codex, ChatGPT
toc: formula=เอเจนต์ = LLM + harness | table=LLM, harness, เอเจนต์ | parts=harness มีอะไรบ้าง | same=โมเดลเดียวกัน | faq=คำถามที่พบบ่อย | next=อ่านต่อ
---

เอเจนต์ AI (AI agent) คือ LLM บวก harness LLM ทำได้เพียงให้เหตุผลและเขียนข้อความ ส่วน harness คือทุกอย่างรอบตัวมันที่ทำให้ลงมือทำได้ ได้แก่ลูปของขั้นตอน เครื่องมือ บริบท กฎ และการตรวจ ทั้งสองส่วนพางานไปถึงผลลัพธ์ ขณะที่ LLM ลำพังได้แต่ตอบ ด้านล่างเป็น LLM, harness และเอเจนต์ในตารางเดียว ห้ากลุ่มที่ harness ประกอบด้วย และโมเดลเดียวกันใน harness สองแบบ

<b-post series="harness">
<b-chapter id="formula" icon="target-dot" title="เอเจนต์ = LLM + harness">
<b-why align="left"><a href="/materials/glossary/llm/">LLM</a> เพียงต่อข้อความ <a href="/materials/glossary/harness/">harness</a> คือทุกอย่างรอบตัวมัน ลูปของขั้นตอน เครื่องมือ การเข้าถึงไฟล์และบริการ กฎ และการตรวจ รวมกันเป็น<a href="/materials/glossary/ai-agent/">เอเจนต์ AI</a></b-why>
<b-lane-art names="ai-agent-llm-harness/formula"/>
<b-finding>
  <ex>โมเดล Claude ตัวเดียวกันตอบในแชตและแก้โค้ดใน Claude Code ความต่างคือ harness</ex>
  <gen>แอปแชต ผู้ช่วย และเอเจนต์ ทำงานบนโมเดลเดียวกันได้ สิ่งที่แยกพวกมันคือสิ่งที่ล้อมรอบโมเดล</gen>
  <do>เมื่อเปรียบเทียบผลิตภัณฑ์ AI ให้เปรียบเทียบ harness ผลิตภัณฑ์ทำอะไรได้เองและที่ไหน</do>
</b-finding>
</b-chapter>
<b-chapter id="table" icon="table-cols" title="LLM, harness และเอเจนต์">
<b-why align="left">สิ่งที่แต่ละอย่างมี คอลัมน์เอเจนต์คือผลรวมของสองคอลัมน์แรก</b-why>
<b-table>
<table><thead><tr><th></th><th>LLM</th><th>Harness</th><th>เอเจนต์ AI</th></tr></thead><tbody><tr><td><a href="/materials/glossary/llm/">โมเดล</a>ที่ให้เหตุผลเป็นข้อความ</td><td><b-tag-inline kind="ok">มี</b-tag-inline></td><td><b-tag-inline kind="no">ไม่มี</b-tag-inline></td><td><b-tag-inline kind="ok">มี</b-tag-inline></td></tr><tr><td><a href="/materials/glossary/agent-loop/">ลูป</a>: คิด ลงมือ สังเกต</td><td><b-tag-inline kind="no">ไม่มี</b-tag-inline></td><td><b-tag-inline kind="ok">มี</b-tag-inline></td><td><b-tag-inline kind="ok">มี</b-tag-inline></td></tr><tr><td><a href="/materials/glossary/tool/">เครื่องมือ</a>และ <a href="/materials/glossary/mcp/">MCP</a></td><td><b-tag-inline kind="no">ไม่มี</b-tag-inline></td><td><b-tag-inline kind="ok">มี</b-tag-inline></td><td><b-tag-inline kind="ok">มี</b-tag-inline></td></tr><tr><td><a href="/materials/glossary/context/">บริบท</a>และ<a href="/materials/glossary/memory/">หน่วยความจำ</a></td><td><b-tag-inline kind="no">ไม่มี</b-tag-inline></td><td><b-tag-inline kind="ok">มี</b-tag-inline></td><td><b-tag-inline kind="ok">มี</b-tag-inline></td></tr><tr><td>กฎ: <a href="/materials/glossary/claude-md/">CLAUDE.md</a>, <a href="/materials/glossary/agents-md/">AGENTS.md</a>, <a href="/materials/glossary/agent-skills/">skill</a></td><td><b-tag-inline kind="no">ไม่มี</b-tag-inline></td><td><b-tag-inline kind="ok">มี</b-tag-inline></td><td><b-tag-inline kind="ok">มี</b-tag-inline></td></tr><tr><td><a href="/materials/glossary/permissions/">สิทธิ์</a>, <a href="/materials/glossary/sandbox/">sandbox</a>, <a href="/materials/glossary/hooks/">hook</a></td><td><b-tag-inline kind="no">ไม่มี</b-tag-inline></td><td><b-tag-inline kind="ok">มี</b-tag-inline></td><td><b-tag-inline kind="ok">มี</b-tag-inline></td></tr><tr><td><a href="/materials/glossary/checks/">การตรวจ</a>และ<a href="/materials/glossary/human-in-the-loop/">คนในลูป</a></td><td><b-tag-inline kind="no">ไม่มี</b-tag-inline></td><td><b-tag-inline kind="ok">มี</b-tag-inline></td><td><b-tag-inline kind="ok">มี</b-tag-inline></td></tr><tr><td>ลงมือทำเอง</td><td><b-tag-inline kind="no">ไม่มี</b-tag-inline></td><td><b-tag-inline kind="no">ไม่มี</b-tag-inline></td><td><b-tag-inline kind="ok">มี</b-tag-inline></td></tr></tbody></table>
</b-table>
<b-finding>
  <ex>harness ที่ไม่มีโมเดลมีเครื่องมือแต่ไม่มีใครเลือกระหว่างกัน โมเดลที่ไม่มี harness เลือกได้แต่ลงมือไม่ได้</ex>
  <gen>ไม่มีครึ่งใดเป็นเอเจนต์ด้วยตัวเอง เอเจนต์ = โมเดล + harness ใช้ได้เป็นนิยาม เอาด้านใดออก เอเจนต์ก็หายไป</gen>
  <do>ระบุ harness ของเอเจนต์ที่คุณใช้ ลูป เครื่องมือ กฎ และการตรวจอยู่ที่ไหน</do>
</b-finding>
</b-chapter>
<b-chapter id="parts" icon="cube" title="harness มีอะไรบ้าง: ห้ากลุ่ม">
<b-arrow-rows>
  <row t="ลูป" color="accent">agent loop การประสานงานของ subagent</row>
  <row t="การเข้าถึง" color="accent">เครื่องมือ MCP server sandbox เบราว์เซอร์</row>
  <row t="ความรู้" color="accent">บริบท หน่วยความจำ CLAUDE.md / AGENTS.md และ skill</row>
  <row t="การควบคุม" color="warn">สิทธิ์ hook การอนุมัติโดยคนสำหรับขั้นที่เสี่ยง</row>
  <row t="การตรวจสอบ" color="warn">การทดสอบ linter ล็อก และ tracing</row>
</b-arrow-rows>
<b-finding>
  <ex>Claude Code: ลูปอยู่ใน CLI เครื่องมือผ่าน MCP กฎใน CLAUDE.md การควบคุมผ่านสิทธิ์และ hook การตรวจสอบผ่านการทดสอบของคุณ</ex>
  <gen>ในทางปฏิบัติ ความล้มเหลวของเอเจนต์ส่วนใหญ่ย้อนไปถึงหนึ่งในห้ากลุ่ม คือขาดเครื่องมือ ขาดบริบท หรือขาดการตรวจ</gen>
  <do>เมื่อเอเจนต์ล้มเหลว ให้ถามว่าขาดกลุ่มไหน และแก้ที่นั่น แทนการเขียน prompt ใหม่</do>
</b-finding>
</b-chapter>
<b-chapter id="same" icon="chart-line" title="โมเดลเดียวกัน harness ต่างกัน">
<b-table>
<table><thead><tr><th>โมเดล</th><th>harness แบบแชต</th><th>harness แบบเอเจนต์</th></tr></thead><tbody><tr><td>Claude</td><td>Claude ในเบราว์เซอร์: สนทนา ไม่เข้าถึงโปรเจกต์</td><td>Claude Code: อ่าน repo แก้ไฟล์ รันคำสั่ง</td></tr><tr><td>GPT</td><td>ChatGPT: สนทนา ไม่เข้าถึงโปรเจกต์</td><td>Codex: ทำงานใน repo รันการทดสอบ เปิด pull request</td></tr></tbody></table>
</b-table>
<b-why align="left" top="10">งานวิจัยที่ ICML 2026 พบว่าการเลือก harness ที่ดีที่สุดให้ผลที่เทียบได้กับการเลือกโมเดลที่ดีที่สุด <a href="https://icml.cc/virtual/2026/68323" target="_blank" rel="noopener">แหล่งที่มา</a></b-why>
<b-finding>
  <ex>การเปลี่ยนจากแชตเป็น Claude Code เปลี่ยนเฉพาะ harness และงานเปลี่ยนจากคำแนะนำเป็นการเปลี่ยนแปลงที่เสร็จสมบูรณ์</ex>
  <gen>การเลือกโมเดลและการเลือก harness มีน้ำหนักพอ ๆ กัน ทีมที่เปรียบเทียบแต่โมเดลพลาดไปครึ่งหนึ่งของผลลัพธ์</gen>
  <do>ก่อนเปลี่ยนโมเดล ลอง harness ที่แข็งแกร่งกว่ากับโมเดลที่มีอยู่</do>
</b-finding>
</b-chapter>
<b-chapter id="faq" icon="check-circle" title="คำถามที่พบบ่อย">
<b-faq-cards>
  <q t="agent harness คืออะไร">โค้ดและการตั้งค่าทั้งหมดรอบโมเดลที่ไม่ใช่ตัวโมเดล ได้แก่ลูป เครื่องมือ บริบท กฎ สิทธิ์ และการตรวจ</q>
  <q t="เอเจนต์ AI กับ LLM ต่างกันอย่างไร">LLM สร้างข้อความ เอเจนต์ AI คือ LLM ภายใน harness ที่เปลี่ยนข้อความนั้นเป็นการกระทำและตรวจผลลัพธ์</q>
  <q t="เอเจนต์ AI กับแชตบอตต่างกันอย่างไร">แชตบอตตอบภายในสคริปต์หรือบทสนทนา เอเจนต์ลงมือทำในระบบของคุณและตัดสินใจขั้นต่อไปเอง</q>
  <q t="ChatGPT เป็นเอเจนต์ไหม">ในแชตธรรมดาเป็นแอปแชต ในโหมดเอเจนต์และใน Codex โมเดลเดียวกันได้ harness สำหรับลงมือทำ ซึ่งทำให้เป็นเอเจนต์</q>
  <q t="harness กับเฟรมเวิร์กต่างกันอย่างไร">เฟรมเวิร์กให้ส่วนประกอบสำหรับเขียนเอเจนต์ harness คือชั้นที่ทำงานจริง รันลูปและควบคุมมัน</q>
</b-faq-cards>
</b-chapter>
<b-chapter id="next" icon="arrow-right" title="อ่านต่อ">
  <b-links>
    <item href="/materials/glossary/harness/" k="คำศัพท์" t="Harness">ทุกส่วน พร้อมลิงก์</item>
    <item href="/blog/harness-driven-development/" k="ปฏิบัติ" t="Harness engineering">เปลี่ยนข้อผิดพลาดเป็นกฎ</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="การเลือก" t="Claude Code, Codex, Cursor">เลือกเอเจนต์ตัวไหน</item>
  </b-links>
</b-chapter>
</b-post>
