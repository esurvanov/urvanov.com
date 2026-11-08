---
title: แนวทางทำงานกับ harness: ลูปของคำตอบและการรีวิวที่แก้คำขอต้นฉบับ
date: 2026-09-28
updated: 2026-11-08
description: ทำอย่างไรเมื่อคำตอบไม่ตรง: สามเส้นทางและลูปที่ทำซ้ำ การรีวิวพบช่องว่างอย่างไร ทำไมช่องว่างจึงเข้าไปอยู่ในคำขอต้นฉบับ และไปป์ไลน์รันใหม่ทั้งหมด อิงคู่มือของ Anthropic, OpenAI และ Google
tags: AI, harness, prompt, รีวิว
category: prompts
layout: wide
toc: iterate=ถ้าคำตอบไม่ตรง | review=การรีวิวคำตอบ | faq=คำถามที่พบบ่อย | next=อ่านเพิ่มเติม
---

เมื่อคำตอบของ AI ไม่ตรง มีสามทาง คือขยายความในแชตเดิม เขียนคำขอต้นฉบับใหม่ หรือให้โมเดลถามคำถามก่อน เมื่อการรีวิวพบช่องว่าง ช่องว่างนั้นเข้าไปอยู่ในคำขอต้นฉบับ และรอบทั้งหมดรันใหม่: แก้ไข ทดสอบ รีวิว คำขอจึงสมบูรณ์ขึ้น และงานคล้ายกันครั้งถัดไปเริ่มจากคำขอนั้น ด้านล่างเป็นทั้งสองแนวทางตามคู่มือของ Anthropic, OpenAI และ Google

<b-post series="prompts">
<b-flow lead label="สองแนวทาง: ลูปของคำตอบและการรีวิวที่แก้คำขอ">
  <b-lane title="คำตอบไม่ตรง" color="muted">
    <node icon="x" t="คำตอบ">ออกนอกงาน</node>
    <node icon="refresh" t="หนึ่งในสามทาง">ขยายความ ทำใหม่ ถามก่อน</node>
    <node icon="ai-box" t="คำตอบใหม่">ตรวจอีกครั้ง</node>
  </b-lane>
  <b-lane title="การรีวิวพบช่องว่าง" color="accent">
    <node icon="file" t="คำขอ v1">งานต้นฉบับ</node>
    <node icon="search" t="รีวิว">สองช่องว่าง</node>
    <node icon="check" t="คำขอ v2">และรันไปป์ไลน์ทั้งหมดอีกครั้ง</node>
  </b-lane>
</b-flow>
<b-cap>ทั้งสองแนวทางใช้ได้ใน harness ใดก็ได้: แชต Claude Code, Codex หรือ Cursor</b-cap>

<b-chapter id="iterate" icon="refresh" title="ถ้าคำตอบไม่ตรง">
  <b-art names="harness-work-approaches/answer-paths harness-work-approaches/answer-paths-mobile"/>
  <b-sublabel top="22">ทางที่ 3: สามคำถามและคำขอใหม่</b-sublabel>
  <b-sublabel top="16">ขั้นที่ 1</b-sublabel>
  <b-prompt>
    [คำอธิบายงาน]
    ก่อนทำงาน ให้ถามฉัน 3 ข้อที่คำตอบจะช่วยให้ผลลัพธ์ดีขึ้นมากที่สุด อย่าเริ่มทำจนกว่าฉันจะตอบ
  </b-prompt>
  <b-sublabel top="12">ขั้นที่ 2</b-sublabel>
  <b-why>ตอบคำถามของโมเดลด้วยคำพูดของตัวเอง ในแชตเดิม</b-why>
  <b-sublabel top="12">ขั้นที่ 3</b-sublabel>
  <b-prompt>
    สร้าง prompt สุดท้ายจากงานและคำตอบของฉัน: บทบาท ใครและทำไม ข้อมูล ตัวอย่าง รูปแบบ คำถามตอนท้าย ให้แสดงเฉพาะข้อความของ prompt
  </b-prompt>
  <b-finding>
    <ex>สามสถานการณ์และหนึ่งการกระทำสำหรับแต่ละอย่าง: ขยายความในแชตเดิม ทำ prompt ใหม่ หรือให้โมเดลถามคำถามก่อน</ex>
    <gen>
      การขยายความเก็บบริบทที่ให้ไปแล้ว และเหมาะเมื่อโมเดลเข้าใจงาน ถ้าเข้าใจงานผิด ทำ prompt ใหม่เร็วกว่า
      ถ้าโมเดลแต่งข้อเท็จจริง ให้ข้อมูลที่ต้องการในคำขอใหม่และอนุญาตให้มันพูดว่า “ไม่ทราบ”<b-proof href="https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations" quote="Anthropic: “Explicitly give Claude permission to admit uncertainty. This simple technique can drastically reduce false information” — platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations"/>
      คำตอบใหม่ตรวจแบบเดียวกัน และลูปซ้ำจนกว่าจะพอดี
      คำถามจากโมเดลช่วยเมื่อไม่ชัดว่าต้องใช้บริบทอะไร: ความกำกวมเปิดช่องให้โมเดลตีความผิด<b-proof href="https://claude.com/blog/best-practices-for-prompt-engineering" quote="Anthropic: “Don&#39;t assume the AI reads minds: Be specific about what you want. Leaving things ambiguous gives the AI room to misinterpret” — claude.com/blog/best-practices-for-prompt-engineering"/>
      และเมื่อเจตนาไม่ชัด โมเดลมักขอคำชี้แจงบ่อยขึ้น<b-proof href="https://developers.openai.com/api/docs/guides/prompt-guidance" quote="OpenAI: “When the user&#39;s intent is unclear, the model is more likely to ask the user for clarification to proceed”; and “Before asking the user clarifying questions, you should complete the work that is already authorized from context” — developers.openai.com/api/docs/guides/prompt-guidance"/>
    </gen>
    <do>สำหรับงานใหม่ที่ไม่แน่ใจเรื่องบริบท เริ่มด้วยการขอสามคำถาม ส่ง prompt สุดท้ายที่สร้างจากคำตอบเป็นคำขอใหม่ในแชตใหม่</do>
  </b-finding>
</b-chapter>

<b-chapter id="review" icon="search" title="การรีวิวคำตอบ: แก้คำขอต้นฉบับ">
  <b-why>เส้นทาง “เขียนคำขอใหม่” เป็นตัวอย่าง: การรีวิวพบช่องว่าง คำขอต้นฉบับเสียส่วนที่ผิดไปและได้ส่วนที่ขาด แล้วทุกอย่างรันใหม่</b-why>
  <b-art names="harness-work-approaches/two-runs harness-work-approaches/two-runs-mobile"/>
  <b-finding>
    <ex>การรีวิวพบสองกรณีที่ไม่ได้อยู่ในงาน คือรหัสนำหน้าระหว่างประเทศที่ไม่มีเครื่องหมายบวก และสตริงว่าง ข้อจำกัด “เฉพาะเบอร์รัสเซีย” ที่ไม่จำเป็นถูกลบออกจากคำขอต้นฉบับ เพิ่มสองกรณีเข้าไป และรันไปป์ไลน์ทั้งหมดอีกครั้ง</ex>
    <gen>
      ช่องว่างที่การรีวิวพบเข้าไปอยู่ในคำขอต้นฉบับ และรอบเริ่มใหม่: เอเจนต์เขียนโค้ดอีกครั้ง การทดสอบและการรีวิวตรวจกรณีใหม่ และคำชี้แจงอยู่ในงานสำหรับการรันครั้งต่อไป
      รอบรีวิวแยกที่มีคำสั่งของตัวเองมีอธิบายไว้ในคู่มือ prompt ของ Google<b-proof href="https://www.kaggle.com/whitepaper-prompt-engineering" quote="Google, Prompt Engineering whitepaper: the code section, including review and debugging as a separate prompt — kaggle.com/whitepaper-prompt-engineering"/>
    </gen>
    <do>เมื่อการรีวิวพบอะไร ให้เพิ่มในคำขอต้นฉบับและรันรอบทั้งหมดอีกครั้ง: แก้ไข ทดสอบ รีวิว</do>
  </b-finding>
  <b-cta href="/blog/harness-driven-development/" k="ขั้นต่อไป · HDD" t="การพัฒนาที่ขับเคลื่อนด้วย harness (Harness-Driven Development)">ย้ายช่องว่างที่เกิดซ้ำจากคำขอไปเป็นกฎของ harness อย่างไร</b-cta>
</b-chapter>

<b-chapter id="faq" icon="chat" title="คำถามที่พบบ่อย">
  <b-faq-cards>
    <q t="ทำอย่างไรเมื่อคำตอบของ AI ไม่ตรง">ขยายความในแชตเดิมถ้าโมเดลเข้าใจงาน เขียนคำขอใหม่ถ้าเข้าใจผิด หรือให้โมเดลถามคำถามก่อน</q>
    <q t="ทำไมต้องให้โมเดลถามคำถาม">เมื่อไม่แน่ใจเรื่องบริบทของงาน คำถามของโมเดลแสดงว่ามันขาดอะไร คำขอสุดท้ายไปอยู่ในแชตใหม่</q>
    <q t="ทำอย่างไรกับสิ่งที่การรีวิวพบ">เพิ่มในคำขอต้นฉบับและรันรอบทั้งหมดอีกครั้ง: แก้ไข ทดสอบ รีวิว</q>
    <q t="ทำไมต้องแก้คำขอต้นฉบับ">คำขอจะสมบูรณ์ขึ้น และงานคล้ายกันครั้งถัดไปเริ่มจากคำขอนั้น</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="อ่านเพิ่มเติม">
  <b-links cols="2">
    <item href="/blog/specs-rules-skills/" k="บริบท" t="Spec, bible, กฎ และ skill">เอเจนต์ควรรู้อะไรเกี่ยวกับโปรเจกต์</item>
    <item href="/blog/harness-driven-development/" k="วิธีการ" t="การพัฒนาที่ขับเคลื่อนด้วย harness">ข้อผิดพลาดของเอเจนต์ → กฎของสภาพแวดล้อม</item>
    <item href="/blog/work-prompts-examples/" k="ปฏิบัติ" t="Prompt สำหรับงานจริง">ห้าส่วนและหกตัวอย่าง</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="เปรียบเทียบ" t="เปรียบเทียบ harness">Claude Code, Codex, Cursor, Hermes และแชต</item>
  </b-links>
</b-chapter>
<b-footer>เทคนิคอิงคู่มือทางการของ Anthropic, OpenAI และ Google แหล่งที่มาอยู่หลังไอคอนข้างแต่ละข้อความ คำอ้างอิงจากคู่มือของ Google เป็นการสรุปความ</b-footer>
</b-post>
