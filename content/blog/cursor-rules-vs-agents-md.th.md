---
title: Cursor rules กับ AGENTS.md: อะไรควรอยู่ตรงไหน
seoTitle: Cursor rules กับ AGENTS.md: อะไรควรอยู่ตรงไหน (2026)
date: 2026-11-15
updated: 2026-11-17
description: Cursor rules อยู่ใน .cursor/rules และมีโหมดการใช้งาน ส่วน AGENTS.md คือ markdown ธรรมดาที่เอเจนต์หลายตัวอ่านได้ มีตารางเปรียบเทียบ ตัวอย่างการย้าย และ FAQ
tags: AI, Cursor, AGENTS.md, กฎของเอเจนต์, .cursorrules, harness
category: specs
layout: wide
mentions: AGENTS.md, Cursor, CLAUDE.md, Codex
toc: answer=สรุปสั้น | table=เทียบกัน | modes=สี่โหมด | migrate=การย้าย | readers=ใครอ่าน AGENTS.md | pick=อะไรอยู่ตรงไหน | faq=คำถาม | next=อ่านต่อ
---

Cursor rules และ AGENTS.md ต่างก็ให้คำสั่งประจำแก่เอเจนต์ และต่างกันที่ขอบเขตการใช้งาน AGENTS.md คือไฟล์ markdown ธรรมดาที่รากของโปรเจกต์ ซึ่ง Cursor และเอเจนต์อื่นอีกมากอ่านได้ ส่วน rules ใน .cursor/rules คือไฟล์ .mdc ที่มีโหมดการใช้งานสี่แบบ และเป็นรูปแบบเฉพาะของ Cursor คำสั่งที่ใช้ร่วมกันควรอยู่ใน AGENTS.md และคำสั่งที่มีเงื่อนไขควรอยู่ใน .mdc

<b-post series="prompts">
<b-chapter id="answer" title="สรุปสั้น" icon="crosshair">
  <b-why>Cursor รับสองรูปแบบพร้อมกัน คือ AGENTS.md สำหรับกรณีง่าย และ project rules สำหรับควบคุมว่ากฎใช้เมื่อไร<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: «For more control over when rules apply, use project rules in .cursor/rules/ instead» — cursor.com/help/customization/rules"/></b-why>
  <b-finding>
    <ex>AGENTS.md เก็บสิ่งที่เอเจนต์ทุกตัวต้องรู้ ส่วน .cursor/rules เก็บสิ่งที่เฉพาะ Cursor ต้องรู้ และเฉพาะบางครั้ง</ex>
    <gen>AGENTS.md ไม่มีโหมดและไม่มี metadata เอเจนต์ตัวไหนก็อ่านได้ กฎ .mdc เพิ่มโหมดเข้ามา จึงรอได้จนกว่าประเภทไฟล์หรือคำขอจะเรียกใช้</gen>
    <do>ย้ายคำสั่งรันและข้อห้ามไปไว้ใน AGENTS.md เก็บกฎตามประเภทไฟล์ไว้ใน .cursor/rules และลบ .cursorrules</do>
  </b-finding>
</b-chapter>
<b-chapter id="table" title="Cursor rules กับ AGENTS.md เทียบกัน" icon="table-grid">
  <b-why>ทุกช่องมาจากเอกสารของ Cursor, agents.md หรือ OpenAI โดยแหล่งที่มาอยู่หลังไอคอน ตรวจเมื่อ 15.11.2026</b-why>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th></th><th>AGENTS.md</th><th>.cursor/rules/*.mdc</th></tr>
    </thead>
    <tbody>
      <tr><td>ขอบเขต</td><td>ทั้งโปรเจกต์ และไฟล์ซ้อนสำหรับโฟลเดอร์ย่อย<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: «Cursor supports AGENTS.md in the project root and subdirectories» — cursor.com/docs/context/rules"/></td><td>ทั้งโปรเจกต์ แยกเป็นหลายกฎ ส่วน User Rules (ทุกโปรเจกต์ของคุณ) และ Team Rules (ทั้งองค์กร) เป็นระดับแยกต่างหาก<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: Team Rules → Project Rules → User Rules is the order of precedence; Team Rules are managed from the dashboard — cursor.com/docs/context/rules"/></td></tr>
      <tr><td>ใครอ่าน</td><td>Cursor, Codex, Copilot, Windsurf, OpenCode และตัวอื่น ๆ<b-proof href="https://agents.md/" quote="agents.md: «A simple, open format for guiding coding agents» — Cursor and Codex are in the list of supporting agents — agents.md"/></td><td>Cursor</td></tr>
      <tr><td>ไฟล์และตำแหน่ง</td><td><code>AGENTS.md</code> ที่รากและในโฟลเดอร์ย่อย ไฟล์ที่ใกล้ไฟล์ที่กำลังแก้ที่สุดมีผลเหนือกว่า<b-proof href="https://agents.md/" quote="agents.md: «The closest AGENTS.md to the edited file wins; explicit user chat prompts override everything» — agents.md"/></td><td><code>.cursor/rules/</code> หนึ่งไฟล์ต่อหนึ่งกฎ และวางกฎในโฟลเดอร์ได้<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: «Stored in .cursor/rules, version-controlled and scoped to your codebase» — cursor.com/docs/context/rules"/></td></tr>
      <tr><td>รูปแบบ</td><td>markdown ธรรมดา ไม่มีช่องที่ต้องกรอก<b-proof href="https://agents.md/" quote="agents.md: «No. AGENTS.md is just standard Markdown» — agents.md"/></td><td>markdown ที่มีส่วนหัวเป็น <code>description</code>, <code>globs</code>, <code>alwaysApply</code> นามสกุลต้องเป็น <code>.mdc</code> ไฟล์ <code>.md</code> ธรรมดาจะถูกข้าม<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: «Project rules must use the .mdc extension» — cursor.com/docs/context/rules"/></td></tr>
      <tr><td>ใช้เมื่อไร</td><td>ถูกโหลดอัตโนมัติ ไม่มีโหมด<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: «Write instructions in plain markdown. Cursor picks it up automatically» — cursor.com/help/customization/rules"/></td><td>หนึ่งในสี่โหมด คือเสมอ ตามคำอธิบาย ตามรูปแบบไฟล์ และด้วยตนเอง</td></tr>
      <tr><td>การจัดเวอร์ชัน</td><td>ไฟล์ในรีโพสิทอรี การเปลี่ยนแปลงผ่าน git</td><td>เก็บในรีโพสิทอรี เอกสารแนะนำให้ commit กฎ<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: «Check your rules into git so your whole team benefits» — cursor.com/docs/context/rules"/></td></tr>
      <tr><td>ขนาด</td><td>เอกสาร Cursor ไม่ระบุตัวเลข ส่วน Codex จำกัดไฟล์คำสั่งทั้งหมดรวมกันที่ 32 KiB เป็นค่าเริ่มต้น<b-proof href="https://learn.chatgpt.com/docs/agent-configuration/agents-md" quote="Codex: combined instructions are capped by project_doc_max_bytes, which is 32 KiB by default — learn.chatgpt.com/docs/agent-configuration/agents-md"/></td><td>ไม่เกิน 500 บรรทัดต่อกฎ กฎที่ใหญ่ให้แยก<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: «Keep rules under 500 lines. Split large rules into smaller, focused files» — cursor.com/help/customization/rules"/></td></tr>
      <tr><td>.cursorrules แบบเก่า</td><td colspan="2">ไฟล์เดียวที่ราก ถูกแทนที่ด้วยทั้งสองรูปแบบ<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: «The .cursorrules file in your project root is legacy and will be deprecated» — cursor.com/help/customization/rules"/></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>Cursor ยังถือว่า CLAUDE.md เปิดใช้เสมอ คือใช้กับทุกบทสนทนา ไม่ว่า <code>alwaysApply</code> จะตั้งไว้อย่างไร<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: «CLAUDE.md files are always applied to every conversation, regardless of any alwaysApply frontmatter setting» — cursor.com/help/customization/rules"/></b-cap>
</b-chapter>
<b-chapter id="modes" title="สี่โหมดของกฎ Cursor" icon="list-arrow">
  <b-why>โหมดกำหนดว่ากฎเข้าสู่บริบทเมื่อไร ตั้งได้ที่ส่วนหัวของกฎและในเมนูประเภทกฎ</b-why>
  <b-rule-modes>
    <mode t="เสมอ">ทุกแชต</mode>
    <mode t="ตามคำอธิบาย">เอเจนต์ตัดสินใจ</mode>
    <mode t="ตามไฟล์">ตรงกับรูปแบบพาธ</mode>
    <mode t="ด้วยตนเอง">@rule</mode>
  </b-rule-modes>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>โหมดใน Cursor</th><th>อะไรเป็นตัวเรียกใช้</th><th>ช่องในส่วนหัว</th></tr>
    </thead>
    <tbody>
      <tr><td>Always Apply</td><td>ทุกเซสชันแชต<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: Always Apply — «included in every conversation» — cursor.com/help/customization/rules"/></td><td><code>alwaysApply: true</code> ซึ่ง globs และ description จะถูกเมินเมื่อตั้งแบบนี้<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: when alwaysApply is true the rule is always included, and globs and description are ignored — cursor.com/docs/context/rules"/></td></tr>
      <tr><td>Apply Intelligently</td><td>เอเจนต์ตัดสินใจจากคำอธิบาย<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: Apply Intelligently — «Agent decides when it's relevant» — cursor.com/help/customization/rules"/></td><td><code>description</code> พร้อม <code>alwaysApply: false</code> และไม่มี globs</td></tr>
      <tr><td>Apply to Specific Files</td><td>ไฟล์ตรงกับรูปแบบ<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: Apply to Specific Files — «only applies for files matching a pattern» — cursor.com/help/customization/rules"/></td><td><code>globs</code><b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: «Use globs to scope a rule to specific files or directories» — cursor.com/docs/context/rules"/></td></tr>
      <tr><td>Apply Manually</td><td>คุณ @mention กฎในแชต<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: Apply Manually — «only used when you @mention it in chat» — cursor.com/help/customization/rules"/></td><td>เรียกกฎด้วยชื่อ เช่น <code>@my-rule</code></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>คู่มือเก่าจากบุคคลที่สามเรียกสี่โหมดเดียวกันนี้ว่า Always, Auto Attached, Agent Requested และ Manual เอกสาร Cursor ปัจจุบันใช้ชื่อตามตาราง</b-cap>
</b-chapter>
<b-chapter id="migrate" title="การย้าย: จาก .cursorrules ไปเป็น AGENTS.md และ .mdc" icon="notebook">
  <b-why>โปรเจกต์ตัวอย่างที่เขียนขึ้นสำหรับบทความนี้ รูปแบบไฟล์เป็นไปตามเอกสาร Cursor ส่วนตัวโปรเจกต์เป็นของสมมติ</b-why>
  <b-sublabel top="18">ก่อน: ไฟล์เดียวที่ราก</b-sublabel>
  <b-codebox title="โครงโปรเจกต์ก่อน">
    my-app/
    ├── .cursorrules
    ├── src/
    └── package.json
  </b-codebox>
  <b-codebox title=".cursorrules">
    You are working on a React + TypeScript app.
    Run `npm test` before finishing a task.
    Format with `npm run lint -- --fix`.
    Never edit files in dist/.
    Never log tokens or user emails.
    Components: function components with hooks, one component per file,
    props typed with an interface named <Name>Props.
    The test file sits next to the component: Button.test.tsx.
    API calls go through src/api/client.ts; validate every response with zod.
  </b-codebox>
  <b-sublabel top="18">วิธีทางการ: สี่ขั้นตอน</b-sublabel>
  <b-seq-row>
    <step t="สร้าง">กฎผ่าน command palette: “New Cursor Rule”</step>
    <step t="คัดลอก">ข้อความจาก .cursorrules</step>
    <step t="โหมด">Always Apply</step>
    <step t="ลบ">.cursorrules ออกจากราก</step>
  </b-seq-row>
  <b-cap>นี่คือสี่ขั้นตอนจากคู่มือของ Cursor โหมด Always Apply คงพฤติกรรมเดิมไว้<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: «Set the rule type to Always Apply (this matches the old behavior)» — cursor.com/help/customization/rules"/> ผลลัพธ์คือกฎเดียวที่เปิดตลอด การแยกตามเงื่อนไขคือขั้นต่อไป</b-cap>
  <b-sublabel top="18">หลัง: ข้อความที่ใช้ร่วมกันอยู่ใน AGENTS.md ข้อความที่มีเงื่อนไขอยู่ใน .mdc</b-sublabel>
  <b-codebox title="โครงโปรเจกต์หลัง">
    my-app/
    ├── AGENTS.md
    ├── .cursor/
    │   └── rules/
    │       ├── react-components.mdc
    │       └── api-validation.mdc
    ├── src/
    └── package.json
  </b-codebox>
  <b-codebox title="AGENTS.md" copy>
    # my-app
    React + TypeScript app.

    ## Commands
    - Run `npm test` before finishing a task.
    - Format with `npm run lint -- --fix`.

    ## Bans
    - Never edit files in `dist/`.
    - Never log tokens or user emails.
  </b-codebox>
  <b-codebox title=".cursor/rules/react-components.mdc" copy>
    ---
    description: Standards for React components
    globs: "*.tsx"
    alwaysApply: false
    ---
    - Function components with hooks, one component per file.
    - Props typed with an interface named `<Name>Props`.
    - The test file sits next to the component: `Button.test.tsx`.
  </b-codebox>
  <b-codebox title=".cursor/rules/api-validation.mdc" copy>
    ---
    description: Rules for API calls and response validation
    alwaysApply: false
    ---
    - API calls go through `src/api/client.ts`.
    - Validate every response with zod.
  </b-codebox>
  <b-finding>
    <ex>ไฟล์เดียวเก้าบรรทัดกลายเป็นสามไฟล์ คือห้าบรรทัดที่เอเจนต์ทุกตัวอ่าน และสองกฎที่ Cursor โหลดเฉพาะเมื่อเข้าเงื่อนไข</ex>
    <gen>คำสั่งรันและข้อห้ามใช้ได้ทั้งโปรเจกต์ เอเจนต์ทุกตัวจึงต้องใช้ ส่วนกฎของคอมโพเนนต์และ API สำคัญกับโค้ดเพียงบางส่วน อย่างแรกสำหรับไฟล์ <code>.tsx</code> อย่างหลังเมื่อเอเจนต์เห็นว่าคำอธิบายเกี่ยวข้อง</gen>
    <do>แยกไฟล์เก่าด้วยคำถามเดียว คือเอเจนต์ทุกตัวต้องใช้บรรทัดนี้ในทุกเซสชันหรือไม่ ถ้าใช่ให้ไปอยู่ใน AGENTS.md ถ้าไม่ใช่ให้ไปอยู่ในกฎที่มีโหมด</do>
  </b-finding>
</b-chapter>
<b-chapter id="readers" title="เอเจนต์ตัวไหนอ่าน AGENTS.md" icon="table-grid">
  <b-why>เว็บไซต์ agents.md รายชื่อเอเจนต์ที่รองรับไว้หลายตัว เช่น Codex, Cursor, Copilot, Windsurf, Gemini CLI, Zed และ Warp<b-proof href="https://agents.md/" quote="agents.md: the page lists Codex, Jules, Cursor, Gemini CLI, GitHub Copilot's coding agent, Windsurf and others — agents.md"/> เงื่อนไขต่างกันตามเอเจนต์ Claude Code อ่าน AGENTS.md เฉพาะเมื่อโปรเจกต์ไม่มี CLAUDE.md ส่วน Gemini CLI อ่านหลังเปลี่ยนการตั้งค่า</b-why>
  <b-links cols="1">
    <item href="/blog/specs-rules-skills/#matrix" k="ตาราง" t="เอเจนต์ตัวไหนอ่านไฟล์ไหน">Claude Code, Codex, Cursor, Copilot, Gemini CLI, Windsurf, OpenCode: AGENTS.md, CLAUDE.md และไฟล์ของแต่ละตัว</item>
  </b-links>
</b-chapter>
<b-chapter id="pick" title="อะไรอยู่ตรงไหน" icon="crosshair">
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>อะไร</th><th>ที่ไหน</th><th>เหตุผล</th></tr>
    </thead>
    <tbody>
      <tr><td>คำสั่ง build และ test</td><td>AGENTS.md</td><td>เอเจนต์ทุกตัวต้องใช้ในทุกเซสชัน</td></tr>
      <tr><td>ข้อห้าม: ห้ามแก้ <code>dist/</code> ห้ามใส่ความลับในล็อก</td><td>AGENTS.md</td><td>ใช้ได้ทั้งโปรเจกต์</td></tr>
      <tr><td>สไตล์ของไฟล์ประเภทเดียว เช่น <code>*.tsx</code></td><td>.mdc, Apply to Specific Files</td><td>โหลดเฉพาะเมื่อมีไฟล์ประเภทนั้นเกี่ยวข้อง</td></tr>
      <tr><td>หัวข้อที่ต้องใช้เป็นครั้งคราว: การเรียก API การ migrate</td><td>.mdc, Apply Intelligently</td><td>เอเจนต์อ่านคำอธิบายแล้วดึงกฎเข้ามา</td></tr>
      <tr><td>เช็กลิสต์ที่ใช้นาน ๆ ครั้ง</td><td>.mdc, Apply Manually</td><td>เข้าแชตเฉพาะเมื่อ @mention</td></tr>
      <tr><td>กฎสำหรับทั้งองค์กร</td><td>Team Rules</td><td>จัดการจากแดชบอร์ดของ Cursor สำหรับแผน Team และ Enterprise<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: Team and Enterprise plans can create and enforce rules across their organization from the dashboard — cursor.com/docs/context/rules"/></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>เก็บแต่ละคำสั่งไว้ที่เดียว บรรทัดที่คัดลอกไว้ทั้งใน AGENTS.md และในกฎ ต้องแก้สองครั้ง</b-cap>
</b-chapter>
<b-chapter id="faq" icon="chat" title="คำถามที่พบบ่อย">
  <b-faq-cards>
    <q t="Cursor อ่าน AGENTS.md ไหม">อ่าน Cursor อ่าน AGENTS.md ที่รากของโปรเจกต์และในโฟลเดอร์ย่อย เป็น markdown ธรรมดาที่ไม่มี metadata และโหลดให้อัตโนมัติ คำสั่งจาก AGENTS.md ที่ซ้อนอยู่จะรวมกับของโฟลเดอร์แม่ และคำสั่งที่เฉพาะเจาะจงกว่ามีผลเหนือกว่า แหล่งที่มา: cursor.com/docs/context/rules และ cursor.com/help/customization/rules ตรวจเมื่อ 15.11.2026</q>
    <q t="ยังต้องใช้ .cursorrules อยู่ไหม">ไม่ต้อง เอกสาร Cursor เรียก .cursorrules ที่รากว่าเป็นแบบเก่า และอธิบายวิธีย้ายไว้ คือสร้างกฎในโหมด Always Apply คัดลอกข้อความ แล้วลบไฟล์ แหล่งที่มา: cursor.com/help/customization/rules ตรวจเมื่อ 15.11.2026</q>
    <q t="ใช้ทั้ง AGENTS.md และ .cursor/rules พร้อมกันได้ไหม">ได้ Cursor อธิบายว่าเป็นสองทางเลือก คือ AGENTS.md สำหรับกรณีง่าย และ project rules สำหรับควบคุมว่ากฎใช้เมื่อไร การแบ่งที่เหมาะสมคือคำสั่งรันและข้อห้ามที่ใช้ร่วมกันอยู่ใน AGENTS.md และกฎที่มีเงื่อนไขอยู่ใน .cursor/rules โดยแต่ละคำสั่งอยู่ที่เดียว แหล่งที่มา: cursor.com/help/customization/rules ตรวจเมื่อ 15.11.2026</q>
    <q t="ควรมีกฎกี่ข้อและยาวแค่ไหน">Cursor แนะนำให้แต่ละกฎไม่เกิน 500 บรรทัด และแยกกฎที่ใหญ่ออกเป็นไฟล์เล็กที่โฟกัสเฉพาะเรื่อง หน้าที่ตรวจไม่ได้ระบุเพดานจำนวนกฎ และไม่ได้ระบุความยาวของ AGENTS.md ส่วน Codex จำกัดไฟล์ AGENTS.md ทั้งหมดรวมกันที่ 32 KiB เป็นค่าเริ่มต้น แหล่งที่มา: เอกสารของ Cursor และ OpenAI ตรวจเมื่อ 15.11.2026</q>
  </b-faq-cards>
</b-chapter>
<b-chapter id="next" title="อ่านต่อ">
  <b-links cols="2">
    <item href="/blog/specs-rules-skills/" k="บริบท" t="AGENTS.md, CLAUDE.md และ spec.md: อะไรอยู่ตรงไหน">สี่ชั้น ตารางของเอเจนต์ และไฟล์จริง</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="เปรียบเทียบ" t="Claude Code, Codex, Cursor และ Hermes Agent">เอเจนต์ตัวไหนเหมาะกับงานแบบไหน</item>
    <item href="/blog/harness-driven-development/" k="วิธีการ" t="Harness-Driven Development">ความผิดพลาดของเอเจนต์กลายเป็นกฎ</item>
  </b-links>
</b-chapter>
<b-footer>อ้างอิงจากเอกสารของ Cursor, agents.md และ OpenAI โดยแหล่งที่มาอยู่หลังไอคอนข้างแต่ละข้อความ ตรวจเมื่อ 15.11.2026 โปรเจกต์ตัวอย่างเป็นของสมมติ</b-footer>
</b-post>
