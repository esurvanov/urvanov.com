---
title: AGENTS.md และ CLAUDE.md คืออะไร: ไฟล์ตัวอย่าง และที่เก็บ spec, rule และ skill
date: 2026-09-28
updated: 2026-11-08
description: บริบทถาวรสี่ประเภทสำหรับ AI (AGENTS.md, CLAUDE.md, skill): spec ของงาน bible ของโปรเจกต์ rule และ skill แต่ละอย่างใส่อะไร เข้าสู่บริบทเมื่อไร และ ChatGPT กับ Claude มีอะไรให้ อ้างอิงเอกสารของ Anthropic, OpenAI, GitHub, Cursor และ Cline
tags: AI, Claude Code, CLAUDE.md, harness, spec, skill
category: specs
layout: wide
mentions: AGENTS.md, CLAUDE.md, Agent Skills, Spec Kit, Memory Bank
toc: map=สี่ชั้น | spec=Spec | bible=Bible | rules=Rule | skills=Skill | chat=ในแชต | pick=อะไรอยู่ที่ไหน | faq=คำถาม | next=อ่านเพิ่มเติม
---

AGENTS.md และ CLAUDE.md คือไฟล์ที่รากของโปรเจกต์ซึ่งเก็บคำสั่งถาวรสำหรับเอเจนต์ AI (AI agent): คำสั่งสำหรับ build และเทสต์ สไตล์โค้ด และข้อห้าม AGENTS.md เป็นรูปแบบเปิดที่ Codex, Cursor, Gemini CLI, Copilot และเอเจนต์อื่นอ่านได้ ส่วน CLAUDE.md ถูกอ่านโดย Claude Code harness จะวางไฟล์แบบนี้ไว้ต้นทุกเซสชัน ด้านล่างคือไฟล์ตัวอย่างและที่เก็บ spec, bible ของโปรเจกต์ และ skill

<b-post series="prompts">
<b-ctx-layers>
  <layer kind="spec" t="Spec" when="สำหรับงานหนึ่งงาน">จะสร้างอะไรในงานหนึ่งงาน</layer>
  <layer kind="bible" t="Bible" when="ตอนเริ่มงาน">ผลิตภัณฑ์คืออะไร</layer>
  <layer kind="rules" t="Rule" when="ทุกเซสชัน">ทำงานในโปรเจกต์อย่างไร</layer>
  <layer kind="skill" t="Skill" when="เมื่อเรียกใช้">รันขั้นตอนอย่างไร</layer>
</b-ctx-layers>
<b-cap>โมเดลไม่จำโปรเจกต์ข้ามเซสชัน<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: «Large language models don&#x27;t retain memory between completions. Rules provide persistent, reusable context at the prompt level» — cursor.com/docs/context/rules"/> ไฟล์สี่ประเภทนำบริบทนั้นกลับมาให้</b-cap>
<b-chapter id="map" title="บริบทสี่ชั้น" icon="table-grid">
  <b-ctx-table phone="hide4">
    <table>
    <thead>
      <tr><th>ชั้น</th><th>ใส่อะไร</th><th>เข้าสู่บริบทเมื่อไร</th><th>ไฟล์</th></tr>
    </thead>
    <tbody>
      <tr><td><b-ctx-layer kind="spec">Spec</b-ctx-layer></td><td>ข้อกำหนด แผน และขั้นตอนของงานหนึ่งงาน</td><td>สำหรับงานหนึ่งงาน</td><td><code>spec.md · plan.md · tasks.md</code></td></tr>
      <tr><td><b-ctx-layer kind="bible">Bible</b-ctx-layer></td><td>เป้าหมายของผลิตภัณฑ์ ผู้ใช้ การตัดสินใจ</td><td>ตอนเริ่มงาน</td><td><code>projectbrief.md · productContext.md</code></td></tr>
      <tr><td><b-ctx-layer kind="rules">Rule</b-ctx-layer></td><td>คำสั่ง สไตล์ ข้อห้าม</td><td>ทุกเซสชัน</td><td><code>CLAUDE.md · AGENTS.md · .cursor/rules</code></td></tr>
      <tr><td><b-ctx-layer kind="skill">Skill</b-ctx-layer></td><td>ขั้นตอนพร้อมตัวอย่างและสคริปต์</td><td>คำอธิบายอยู่เสมอ เนื้อหาเมื่อเรียกใช้</td><td><code>SKILL.md</code></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-finding>
    <ex>แต่ละชั้นต่างกันที่อายุการใช้งานและเวลาที่เข้าสู่บริบท</ex>
    <gen>Rule โหลดเข้าทุกเซสชัน จึงต้องสั้น: Anthropic แนะนำไม่เกิน 200 บรรทัดต่อไฟล์<b-proof href="https://code.claude.com/docs/en/memory" quote="Anthropic: «Size: target under 200 lines per CLAUDE.md file. Longer files consume more context and reduce adherence» — code.claude.com/docs/en/memory"/> เนื้อหายาวที่ใช้นาน ๆ ครั้งให้ย้ายไปไว้ใน skill ซึ่งเนื้อหาจะโหลดเมื่อเรียกใช้เท่านั้น<b-proof href="https://code.claude.com/docs/en/skills" quote="Anthropic: «skill descriptions are loaded into context so Claude knows what&#x27;s available, but full skill content only loads when invoked» — code.claude.com/docs/en/skills"/></gen>
    <do>ไล่ดูไฟล์คำสั่งของคุณ: เก็บข้อเท็จจริงไว้ใน rule ย้ายขั้นตอนไปไว้ใน skill และคำอธิบายผลิตภัณฑ์ไปไว้ใน bible</do>
  </b-finding>
</b-chapter>
<b-chapter id="spec" title="Spec: งานหนึ่งงานก่อนเขียนโค้ด" icon="file-lines">
  <b-why>Spec อธิบายงานก่อนเริ่มทำ: อะไรและทำไมก่อน แล้วจึงตามด้วยทำอย่างไร<b-proof href="https://github.com/github/spec-kit" quote="GitHub Spec Kit: «Define what and why before deciding how to build it. SDD turns your requirements into a specification, a technical plan, and actionable tasks, then guides implementation against those artifacts» — github.com/github/spec-kit"/></b-why>
  <b-seq-row>
    <step t="หลักการ">ครั้งเดียวต่อโปรเจกต์</step>
    <step t="Spec">อะไรและทำไม</step>
    <step t="แผน">ทำอย่างไร</step>
    <step t="งานย่อย">ขั้นตอน</step>
    <step t="ลงมือทำ">เขียนโค้ดทีละขั้น</step>
  </b-seq-row>
  <b-cap>ขั้นตอนหลักของ GitHub Spec Kit<b-proof href="https://github.com/github/spec-kit" quote="GitHub Spec Kit: constitution ถูกสร้างครั้งเดียวต่อโปรเจกต์ — «Create principles focused on code quality, testing, and maintainability». สรุปความ — github.com/github/spec-kit"/> วิธีแบ่ง spec ขนาดใหญ่ออกเป็นส่วน ๆ: <a href="/blog/specs-by-aggregates/">ข้อกำหนดแบ่งตาม aggregate</a></b-cap>
  <b-finding>
    <ex>Spec Kit พางานจากหลักการของโปรเจกต์ผ่าน spec และแผน ไปสู่ขั้นตอนและโค้ด</ex>
    <gen>ข้อกำหนดถูกเขียนก่อนโค้ด และรีวิวตรวจผลลัพธ์เทียบกับข้อความนั้น ส่วนที่ spec อยู่ตรงไหนของ harness อธิบายใน <a href="/blog/harness-driven-development/#spec">HDD และ spec</a></gen>
    <do>สำหรับงานที่ยาวกว่าหนึ่งวัน ให้เขียน spec: อะไร ทำไม และจะรู้ได้อย่างไรว่าเสร็จแล้ว</do>
  </b-finding>
</b-chapter>
<b-chapter id="bible" title="Bible ของโปรเจกต์: ผลิตภัณฑ์คืออะไร" icon="notebook">
  <b-why>Bible คือคำอธิบายถาวรของผลิตภัณฑ์: ทำไมจึงมีอยู่ ให้บริการใคร ทำงานอย่างไร และตัดสินใจอะไรไปแล้ว คำนี้มาจากการปฏิบัติจริง สิ่งที่ใกล้เคียงที่สุดและมีเอกสารรองรับคือ Memory Bank ของ Cline<b-proof href="https://docs.cline.bot/prompting/cline-memory-bank" quote="Cline: Memory Bank — «a documentation methodology that transforms Cline from a stateless assistant into a persistent development partner. Through structured markdown files, Cline can &#x27;remember&#x27; your project details across sessions» — docs.cline.bot/prompting/cline-memory-bank"/></b-why>
  <b-file-grid>
    <file name="projectbrief.md">เป้าหมายและข้อกำหนด</file>
    <file name="productContext.md">ทำไมจึงมีอยู่ แก้ปัญหาอะไร</file>
    <file name="systemPatterns.md">สถาปัตยกรรมและแพตเทิร์น</file>
    <file name="techContext.md">สแตกและข้อจำกัด</file>
    <file name="activeContext.md">โฟกัสปัจจุบันและขั้นต่อไป</file>
    <file name="progress.md">อะไรใช้ได้แล้ว อะไรยังเหลือ</file>
  </b-file-grid>
  <b-finding>
    <ex>ไฟล์ Memory Bank หกไฟล์: ตั้งแต่เป้าหมายของผลิตภัณฑ์ถึงความคืบหน้าปัจจุบัน</ex>
    <gen>Bible ตอบคำถามที่ไม่เช่นนั้นจะถูกถามซ้ำในทุกแชตใหม่: ผลิตภัณฑ์คืออะไร ตัดสินใจอะไรไปแล้ว อะไรกำลังทำอยู่ ไฟล์บริบทปัจจุบันเปลี่ยนบ่อยที่สุด<b-proof href="https://docs.cline.bot/prompting/cline-memory-bank" quote="Cline: activeContext.md — โฟกัสปัจจุบัน การเปลี่ยนแปลงล่าสุด และขั้นต่อไป อัปเดตบ่อยกว่าไฟล์อื่น สรุปความ — docs.cline.bot/prompting/cline-memory-bank"/></gen>
    <do>เริ่มจากไฟล์เดียว: เป้าหมายของผลิตภัณฑ์ ผู้ใช้ ศัพท์สำคัญ และการตัดสินใจล่าสุดพร้อมวันที่</do>
  </b-finding>
</b-chapter>
<b-chapter id="rules" title="Rule: ในทุกเซสชัน" icon="list-arrow">
  <b-why>Rule คือคำสั่งที่ harness วางไว้ต้นทุกเซสชัน<b-proof href="https://code.claude.com/docs/en/memory" quote="Anthropic: «CLAUDE.md files are loaded into the context window at the start of every session» — code.claude.com/docs/en/memory"/></b-why>
  <b-io justify>
    <item k="CLAUDE.md" mono>Claude Code, rule ที่จำกัดตามเส้นทางอยู่ใน <code>.claude/rules/</code><b-proof href="https://code.claude.com/docs/en/memory" quote="Anthropic: «Rules can also be scoped to specific file paths, so they only load into context when Claude works with matching files» — code.claude.com/docs/en/memory"/></item>
    <item k="AGENTS.md" mono>"README สำหรับเอเจนต์": Codex, Cursor, Gemini CLI, Copilot และอื่น ๆ<b-proof href="https://agents.md/" quote="agents.md: «Think of AGENTS.md as a README for agents: a dedicated, predictable place to provide the context and instructions to help AI coding agents work on your project» — agents.md"/></item>
    <item k=".cursor/rules" mono>Cursor, สี่วิธีในการใช้งาน<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: สี่โหมด — Always Apply, Apply Intelligently, Apply to Specific Files, Apply Manually — cursor.com/docs/context/rules"/></item>
  </b-io>
  <b-why align="left">ตัวอย่าง AGENTS.md สำหรับโปรเจกต์เว็บ ไฟล์เก็บเฉพาะสิ่งที่เอเจนต์เรียนรู้จากโค้ดไม่ได้: คำสั่ง สไตล์ และข้อห้าม CLAUDE.md สำหรับ Claude Code ทำงานแบบเดียวกัน</b-why>
  <b-codebox title="ตัวอย่าง AGENTS.md">
    # AGENTS.md
    ## Commands
    - Install: npm ci
    - Tests: npm test
    - Type check: npx tsc --noEmit
    ## Style
    - Strict TypeScript, no any
    - kebab-case file names
    ## Don't
    - Don't change migrations/ without a task for it
    - Don't commit .env or keys
    ## Before finishing
    - Run the tests and the type check
  </b-codebox>
  <b-sublabel top="18">Rule เข้าสู่บริบทเมื่อไร · Cursor</b-sublabel>
  <b-rule-modes>
    <mode t="เสมอ">ทุกแชต</mode>
    <mode t="ตามคำอธิบาย">เอเจนต์ตัดสินใจเอง</mode>
    <mode t="ตามไฟล์">เส้นทางตรงกับแพตเทิร์น</mode>
    <mode t="ด้วยมือ">@rule</mode>
  </b-rule-modes>
  <b-metric-line value="≤ 200">บรรทัดต่อไฟล์ CLAUDE.md<b-proof href="https://code.claude.com/docs/en/memory" quote="Anthropic: «Size: target under 200 lines per CLAUDE.md file. Longer files consume more context and reduce adherence» — code.claude.com/docs/en/memory"/></b-metric-line>
  <b-finding>
    <ex>แนวคิดเดียวสามรูปแบบ: ไฟล์คำสั่งที่ harness อ่านตอนเริ่มต้น</ex>
    <gen>Rule ยังคงเป็นบริบท และโมเดลฝ่าฝืนได้ การกระทำที่ต้องไม่เกิดขึ้นเด็ดขาดให้บล็อกด้วย hook ยิ่ง rule เฉพาะเจาะจงและกระชับ ก็ยิ่งถูกปฏิบัติตามสม่ำเสมอ<b-proof href="https://code.claude.com/docs/en/memory" quote="Anthropic: «Claude treats them as context, not enforced configuration. To block an action regardless of what Claude decides, use a PreToolUse hook instead. The more specific and concise your instructions, the more consistently Claude follows them» — code.claude.com/docs/en/memory"/></gen>
    <do>สร้าง AGENTS.md หรือ CLAUDE.md: คำสั่ง build และเทสต์ สไตล์โค้ด ข้อห้าม ย้าย rule เฉพาะโฟลเดอร์ไปเป็น rule ที่จำกัดตามเส้นทาง</do>
  </b-finding>
</b-chapter>
<b-chapter id="skills" title="Skill: ขั้นตอนที่เรียกใช้เมื่อต้องการ" icon="zap">
  <b-why>Skill คือโฟลเดอร์ที่มีคำสั่ง SKILL.md ตัวอย่าง และสคริปต์สำหรับขั้นตอนที่ทำซ้ำ<b-proof href="https://learn.chatgpt.com/docs/build-skills" quote="OpenAI: «ChatGPT and Codex start with each skill&#x27;s name and description, then load the full SKILL.md instructions when they decide to use that skill» — learn.chatgpt.com/docs/build-skills"/></b-why>
  <b-skill-pick start="เริ่มเซสชัน" start-note="ชื่อ + คำอธิบาย" picked="↓ เอเจนต์เลือก “PR review”" call="เมื่อเรียกใช้" call-note="เนื้อหาเต็ม" file="SKILL.md" file-note="คำสั่ง ตัวอย่าง สคริปต์">
    <skill>report</skill>
    <skill on>PR review</skill>
    <skill>release</skill>
    <skill>client email</skill>
  </b-skill-pick>
  <b-finding>
    <ex>คำอธิบายของทุก skill อยู่ในบริบทเสมอ เนื้อหาโหลดเมื่อเลือกใช้</ex>
    <gen>เอกสารอ้างอิงยาว ๆ ใน skill จึงแทบไม่มีต้นทุนจนกว่าจะถูกใช้ ควรสร้าง skill เมื่อคำสั่งหรือเช็กลิสต์เดิมถูกวางลงในแชตซ้ำ ๆ หรือเมื่อส่วนหนึ่งของ rule ขยายเป็นขั้นตอนไปแล้ว<b-proof href="https://code.claude.com/docs/en/skills" quote="Anthropic: «Create a skill when you keep pasting the same instructions, checklist, or multi-step procedure into chat, or when a section of CLAUDE.md has grown into a procedure rather than a fact. Unlike CLAUDE.md content, a skill&#x27;s body loads only when it&#x27;s used» — code.claude.com/docs/en/skills"/></gen>
    <do>หาส่วนใน rule ของคุณที่อธิบายขั้นตอน แล้วย้ายไปเป็น skill พร้อมคำอธิบายที่ชัดเจนว่าใช้เมื่อไร</do>
  </b-finding>
</b-chapter>
<b-chapter id="chat" title="แบบเดียวกันในแชต: project และ skill" icon="chat">
  <b-io justify>
    <item k="คำสั่งของ project" eq="≈ rule">กำหนดบทบาทและรูปแบบครั้งเดียว ใช้ได้กับทุกแชตใน project<b-proof href="https://help.openai.com/en/articles/10169521-projects-in-chatgpt" quote="ChatGPT: a project keeps chats, files and instructions together; project instructions apply only inside it, and it can be shared with teammates. Paraphrased from the OpenAI Help Center — help.openai.com/en/articles/10169521"/><b-proof href="https://support.claude.com/en/articles/9517075-what-are-projects" quote="Claude: “You can define project instructions for each project to further tailor Claude&#39;s responses. For example, instructing Claude to use a more formal tone or answer questions from the perspective of a specific role” — support.claude.com/en/articles/9517075"/></item>
    <item k="ไฟล์ของ project" eq="≈ bible">ตัวอย่างคำตอบ นโยบาย และเทมเพลตอยู่ใน project<b-proof href="https://support.claude.com/en/articles/9517075-what-are-projects" quote="Claude: “You can upload relevant documents, text, code, or other files to a project&#39;s knowledge base, which Claude will use to better understand the context” — support.claude.com/en/articles/9517075"/></item>
    <item k="Skill" eq="= skill">เวิร์กโฟลว์ที่ทำซ้ำได้ พร้อมคำสั่งและตัวอย่าง<b-proof href="https://support.claude.com/en/articles/12512180-use-skills-in-claude" quote="Claude: “Skills extend Claude&#39;s capabilities by giving it access to specialized knowledge and workflows” — support.claude.com/en/articles/12512180"/><b-proof href="https://help.openai.com/en/articles/20001066-skills-in-chatgpt" quote="ChatGPT: skills are reusable workflows with instructions, examples and code, on Business, Enterprise and Edu plans. Paraphrased from the OpenAI Help Center — help.openai.com/en/articles/20001066"/></item>
  </b-io>
  <b-finding>
    <ex>สามที่ที่ prompt อยู่ได้นานกว่าแชตเดียว: คำสั่ง ไฟล์ และ skill</ex>
    <gen>บทบาท ตัวอย่าง และรูปแบบที่ย้ายไปไว้ใน project ใช้ได้ในทุกแชตใหม่โดยไม่ต้องคัดลอก project ที่แชร์กันทำให้ทั้งทีมมีชุดตัวอย่างเดียวกัน</gen>
    <do>สร้าง project สำหรับงานที่ทำบ่อยที่สุดในแต่ละสัปดาห์ แล้วย้ายบทบาทและรูปแบบจาก prompt ที่ดีที่สุดของคุณไปไว้ในคำสั่งของ project</do>
  </b-finding>
</b-chapter>
<b-chapter id="pick" title="อะไรอยู่ที่ไหน" icon="crosshair">
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>ถ้าเป็น…</th><th>เก็บที่</th></tr>
    </thead>
    <tbody>
      <tr><td>คำสั่ง สไตล์ หรือข้อห้ามที่ต้องใช้ในทุกงาน</td><td><b-ctx-layer kind="rules">Rule</b-ctx-layer></td></tr>
      <tr><td>ขั้นตอนหลายขั้นที่ต้องใช้เป็นครั้งคราว</td><td><b-ctx-layer kind="skill">Skill</b-ctx-layer></td></tr>
      <tr><td>ข้อกำหนดของงานหนึ่งงาน</td><td><b-ctx-layer kind="spec">Spec</b-ctx-layer></td></tr>
      <tr><td>ความรู้เรื่องผลิตภัณฑ์และการตัดสินใจที่ผ่านมา</td><td><b-ctx-layer kind="bible">Bible</b-ctx-layer></td></tr>
      <tr><td>ข้อผิดพลาดของเอเจนต์ที่เกิดซ้ำ</td><td><a href="/blog/harness-driven-development/#loop">rule หรือการตรวจ · HDD</a></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-finding>
    <ex>ห้าสถานการณ์ ห้าที่เก็บ</ex>
    <gen>ความถี่และอายุการใช้งานเป็นตัวกำหนดที่เก็บ สิ่งที่ต้องใช้เสมอให้เก็บแบบสั้น สิ่งที่ใช้นาน ๆ ครั้งจะละเอียดได้</gen>
    <do>ทบทวน rule สัปดาห์ละครั้ง: ย้ายขั้นตอนไปไว้ใน skill และการตัดสินใจไปไว้ใน bible พร้อมวันที่</do>
  </b-finding>
</b-chapter>
<b-chapter id="faq" icon="chat" title="คำถามที่พบบ่อย">
  <b-faq-cards>
    <q t="AGENTS.md และ CLAUDE.md คืออะไร?">ไฟล์ที่รากของโปรเจกต์ซึ่งเก็บคำสั่งถาวรสำหรับเอเจนต์ AI: คำสั่ง build และเทสต์ สไตล์โค้ด และข้อห้าม</q>
    <q t="เอเจนต์ตัวไหนอ่าน AGENTS.md?">Codex, Cursor, Gemini CLI, Copilot และอื่น ๆ ส่วน Claude Code อ่าน CLAUDE.md</q>
    <q t="CLAUDE.md ควรยาวแค่ไหน?">Anthropic แนะนำไม่เกิน 200 บรรทัดต่อไฟล์ เพราะ rule โหลดเข้าทุกเซสชัน เนื้อหายาวและใช้นาน ๆ ครั้งให้ย้ายไปไว้ใน skill</q>
    <q t="rule ต่างจาก skill อย่างไร?">เอเจนต์เห็น rule ในทุกเซสชัน ส่วน skill คือขั้นตอนที่เอเจนต์โหลดเต็มรูปแบบเมื่องานตรงกันเท่านั้น</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="อ่านเพิ่มเติม">
  <b-links cols="2">
    <item href="/blog/harness-driven-development/" k="วิธีการ" t="Harness-Driven Development">ข้อผิดพลาดของเอเจนต์ → rule ของสภาพแวดล้อม</item>
    <item href="/blog/harness-work-approaches/" k="แนวทาง" t="แนวทางการทำงานกับ harness">วงจรคำตอบและการรีวิว</item>
    <item href="/blog/work-prompts-examples/" k="ปฏิบัติ" t="prompt สำหรับงานจริง">ห้าส่วนและหกตัวอย่าง</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="เปรียบเทียบ" t="เปรียบเทียบ harness">Claude Code, Codex, Cursor, Hermes</item>
  </b-links>
</b-chapter>
<b-footer>อ้างอิงเอกสารของ Anthropic, OpenAI, GitHub, Cursor และ Cline แหล่งที่มาอยู่หลังไอคอนข้างแต่ละข้อความ "Bible ของโปรเจกต์" เป็นคำที่ใช้ในทางปฏิบัติ ข้อความสรุปความระบุไว้ในคำอธิบายแหล่งที่มา</b-footer>
</b-post>
