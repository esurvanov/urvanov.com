---
title: วิธีติดตั้งและใช้คำสั่ง OpenSpec: ตัวอย่างการเปลี่ยนแปลงตั้งแต่แผนจนถึง merge
date: 2026-11-07
updated: 2026-11-08
description: OpenSpec ของ Fission AI ทำงานอย่างไร โฟลเดอร์การเปลี่ยนแปลงที่มีแผน ข้อกำหนด และงาน คำสั่งสามตัวสำหรับเอเจนต์ และการรวมเข้ากับ spec กลาง ติดตั้งด้วยสองคำสั่ง ตัวอย่างการเปลี่ยนแปลงจริงจากรีโพของเว็บไซต์ urvanov.com เปรียบเทียบกับ Spec Kit และพรอมต์สำเร็จรูปสำหรับเริ่มใช้
tags: AI, OpenSpec, spec, การพัฒนาโดยยึดข้อกำหนด, Claude Code, Codex, Cursor
category: specs
layout: wide
mentions: OpenSpec, Spec-Driven Development, Spec Kit, Claude Code, Codex, Cursor, GitHub Copilot
toc: what=คืออะไร | install=การติดตั้ง | flow=คำสั่งสามตัว | example=ตัวอย่าง | kit=OpenSpec หรือ Spec Kit | start=เริ่มอย่างไร | faq=คำถาม | next=อ่านเพิ่ม
---

OpenSpec คือเฟรมเวิร์กโอเพนซอร์สฟรีสำหรับการพัฒนาโดยยึดข้อกำหนด (Spec-Driven Development) ก่อนเขียนโค้ด เอเจนต์ AI (AI agent) จะเขียนแผนการเปลี่ยนแปลงลงในโฟลเดอร์ของโปรเจกต์ ได้แก่ เหตุผลที่ต้องเปลี่ยน ข้อกำหนด แนวทาง และงานที่ต้องทำ คุณรีวิวแผน เอเจนต์เขียนโค้ดตามงาน และข้อกำหนดที่เสร็จแล้วจะถูกรวมเข้ากับ spec กลางของโปรเจกต์ ด้านล่างคือการติดตั้ง คำสั่งสามตัว และการเดินดูการเปลี่ยนแปลงจริงหนึ่งรายการ

<b-post series="specs">
<b-chapter id="what" icon="file-lines" title="OpenSpec คืออะไร">
  <b-why align="left">ถ้าไม่มีแผน เอเจนต์จะเขียนโค้ดตรงจากข้อความในแชต เจตนาอยู่แค่ในแชตนั้น อีกหนึ่งสัปดาห์ต่อมาไม่มีใครจำได้ว่าทำไมถึงทำแบบนี้ และเอเจนต์ตัวต่อไปเริ่มจากศูนย์และอาจทำใหม่ตามแบบของตัวเอง</b-why>
  <iso-art name="openspec/chat-vs-files"></iso-art>
  <b-why align="left">ด้านซ้ายคือวิธีปกติ: คุณบอกเอเจนต์ว่า “ทำแบบนี้” แล้วบอกว่า “แล้วก็ทำอันนี้ด้วย” และเอเจนต์เขียนโค้ด โค้ดอยู่ต่อไป แต่คำอธิบายว่าทำไมหน้าตาเป็นแบบนี้อยู่แค่ในประวัติแชต ด้านขวาคือการทำงานกับ OpenSpec: เอเจนต์วางแผนลงในไฟล์ของโปรเจกต์ก่อน คุณอ่านและแก้แผนนั้น แล้วเอเจนต์ค่อยเขียนโค้ดตามแผนอย่างเคร่งครัด แผนถูกเก็บในรีโพพร้อมโค้ด ซึ่งเพื่อนร่วมทีมทุกคนและเอเจนต์ทุกตัวต่อไปมองเห็น</b-why>
  <b-why align="left">OpenSpec ย้ายเจตนาออกจากแชตมาไว้ในไฟล์ข้างโค้ด การเปลี่ยนแปลงแต่ละรายการมีโฟลเดอร์ของตัวเองใน <code>openspec/changes</code> บันทึกว่าทำไม ข้อกำหนดข้อไหนเปลี่ยน ทำอย่างไร และทำเป็นขั้นอะไรบ้าง ข้อกำหนดที่ใช้งานอยู่ของทั้งระบบเก็บแยกไว้ใน <code>openspec/specs</code> ทั้งหมดเป็น Markdown ธรรมดาไม่มีไวยากรณ์พิเศษ<b-proof href="https://github.com/Fission-AI/OpenSpec" quote="OpenSpec: «Plain Markdown — requirements with concrete scenarios, no special syntax to learn» — github.com/Fission-AI/OpenSpec"/> ทั้งคนและเอเจนต์จึงอ่านได้</b-why>
  <iso-art name="term:openspec"></iso-art>
  <b-why align="left">แผนภาพมีสองส่วน โฟลเดอร์การเปลี่ยนแปลงคือฉบับร่าง เก็บสิ่งที่กำลังจะเปลี่ยน ส่วน spec กลางอธิบายระบบตามสภาพปัจจุบัน ระหว่างที่การเปลี่ยนแปลงยังดำเนินอยู่ spec กลางไม่ถูกแตะ เมื่อโค้ดเสร็จ ข้อกำหนดจากโฟลเดอร์การเปลี่ยนแปลงจะย้ายเข้า spec กลาง และคำอธิบายของระบบก็ตรงกับโค้ดอีกครั้ง การเปลี่ยนแปลงแต่ละรายการมีสี่ไฟล์:</b-why>
  <b-table>
  | ไฟล์ | ตอบคำถามอะไร | มีอะไรข้างใน |
  |---|---|---|
  | <code>proposal.md</code> | ทำไม? | เหตุผลของการเปลี่ยนแปลงและสิ่งที่เปลี่ยนจริง ๆ |
  | <code>specs/</code> | อะไรต้องเป็นจริง? | ข้อกำหนดด้วย SHALL และ MUST และสถานการณ์แบบ “เมื่อ — แล้ว” |
  | <code>design.md</code> | ทำอย่างไร? | การตัดสินใจทางเทคนิค เป้าหมาย สิ่งที่ไม่ใช่เป้าหมาย ความเสี่ยง |
  | <code>tasks.md</code> | ตามลำดับอะไร? | รายการงานที่เอเจนต์ทำตาม |
  </b-table>
  <b-finding>
    <ex>สี่ไฟล์ของการเปลี่ยนแปลงหนึ่งรายการตอบสี่คำถาม: ทำไม อะไร อย่างไร และตามลำดับอะไร</ex>
    <gen>แผนอยู่ข้างโค้ดและได้รับการรีวิวก่อนที่เอเจนต์จะเริ่มเขียน ข้อบกพร่องของแนวคิดจะปรากฏในข้อความหนึ่งย่อหน้า ก่อนจะลงไปถึงโค้ด</gen>
    <do>ก่อนการเปลี่ยนแปลงใหญ่ ให้ขอให้เอเจนต์ใส่แผนลงในโฟลเดอร์การเปลี่ยนแปลงก่อน แล้วค่อยเขียนโค้ด</do>
  </b-finding>
</b-chapter>

<b-chapter id="install" icon="terminal" title="การติดตั้ง">
  <b-why align="left">OpenSpec มีสองส่วน ส่วนแรกคือโปรแกรมบรรทัดคำสั่ง <code>openspec</code> ซึ่งติดตั้งครั้งเดียวต่อเครื่อง ส่วนที่สองคือการตั้งค่าโปรเจกต์หนึ่ง ๆ: <code>openspec init</code> สร้างโฟลเดอร์ <code>openspec/</code> ในโปรเจกต์ และเพิ่มคำสั่งอย่าง <code>/opsx:propose</code> ให้เอเจนต์ของคุณ</b-why>
  <iso-art name="openspec/install"></iso-art>
  <b-why align="left">ลำดับในแผนภาพ: โปรแกรมปรากฏบนเครื่องก่อน จากนั้นโฟลเดอร์ <code>openspec/</code> ปรากฏในโปรเจกต์พร้อมสองโฟลเดอร์ย่อย คือ <code>specs</code> สำหรับข้อกำหนดที่ใช้งานอยู่ และ <code>changes</code> สำหรับการเปลี่ยนแปลงที่กำลังทำ และสุดท้ายเอเจนต์ของคุณได้คำสั่งใหม่ โค้ดของโปรเจกต์เองไม่เปลี่ยน มีแค่โฟลเดอร์แผนและไฟล์คำสั่งสำหรับเอเจนต์ที่ถูกเพิ่มเข้ามา คำสั่งสำหรับ macOS และ Linux:</b-why>
  <b-codebox title="ติดตั้งบน macOS และ Linux">
    curl -fsSL https://openspec.dev/cli/install.sh | sh
  </b-codebox>
  <b-why align="left">ถ้าชอบ npm ต้องใช้ Node.js 22.12 ขึ้นไป<b-proof href="https://github.com/Fission-AI/OpenSpec" quote="OpenSpec: «npm install -g @fission-ai/openspec@latest (needs Node.js 22.12.0 or higher)» — github.com/Fission-AI/OpenSpec"/> Windows มีสคริปต์ติดตั้ง PowerShell ของตัวเอง และ macOS มี Homebrew formula จากนั้นเปิดโฟลเดอร์โปรเจกต์แล้วเปิดใช้ OpenSpec:</b-why>
  <b-codebox title="ผ่าน npm และในโปรเจกต์">
    npm install -g @fission-ai/openspec@latest
    cd your-project
    openspec init
  </b-codebox>
  <b-why align="left"><code>openspec init</code> ถามว่าใช้เอเจนต์ตัวไหนและติดตั้งคำสั่งให้ตัวนั้นพอดี ชื่อคำสั่งต่างกันตามเอเจนต์: <code>/opsx:propose</code> ใน Claude Code, <code>/opsx-propose</code> ใน Cursor และ GitHub Copilot, <code>$openspec-propose</code> ใน Codex<b-proof href="https://github.com/Fission-AI/OpenSpec" quote="OpenSpec: «/opsx:propose is the canonical name; your tool may spell it /opsx-propose (Cursor, GitHub Copilot), @opsx-propose (Amazon Q) or $openspec-propose (Codex)» — github.com/Fission-AI/OpenSpec"/> ส่วนที่เหลือของบทความใช้รูปแบบของ Claude Code</b-why>
  <b-why align="left">ถ้าโปรเจกต์ใช้เอเจนต์หลายตัว เช่น ทีมส่วนหนึ่งทำงานใน Cursor และอีกส่วนใน Claude Code ให้เลือกทั้งหมด: แผนการเปลี่ยนแปลงใช้ร่วมกัน และเอเจนต์แต่ละตัวได้คำสั่งของตัวเอง โปรแกรมฟรี รันในเครื่อง และไม่ต้องมีบัญชี</b-why>
  <b-finding>
    <ex>สองคำสั่ง: อันหนึ่งติดตั้งโปรแกรม อีกอันเตรียมโปรเจกต์และเชื่อมเอเจนต์</ex>
    <gen>ไม่จำเป็นต้องตั้งค่าด้วยมือ: OpenSpec มีพรอมต์สำเร็จรูปที่ให้เอเจนต์ติดตั้งโปรแกรม รัน <code>openspec init</code> และตรวจผลให้</gen>
    <do>บอกเอเจนต์ว่า: “ติดตั้ง OpenSpec และรัน openspec init ในโปรเจกต์นี้ แล้วแสดงว่ามีคำสั่งอะไรเพิ่มขึ้นมา”</do>
  </b-finding>
</b-chapter>

<b-chapter id="flow" icon="list-arrow" title="คำสั่งสามตัว: วางแผน เขียนโค้ด รวม">
  <b-why align="left">งานวนไปตามวงจรของคำสั่งสามตัว ก่อนหน้านั้นคิดออกเสียงได้ด้วย <code>/opsx:explore</code>: เอเจนต์อ่านโค้ด เสนอทางเลือก และไม่เปลี่ยนอะไร เมื่อชัดแล้วว่าจะทำอะไร เส้นทางหลักจึงเริ่ม</b-why>
  <iso-art name="openspec/loop"></iso-art>
  <b-why align="left">อ่านวงจรตามเข็มนาฬิกา คำสั่งแรก <code>/opsx:propose</code> ขอให้เอเจนต์เขียนแผน: สร้างโฟลเดอร์การเปลี่ยนแปลงและสี่ไฟล์ จากนั้นถึงตาคุณ: อ่านแผนและแก้ในแชตหรือในไฟล์โดยตรง นี่คือจุดควบคุมหลัก เพราะแก้ข้อความหนึ่งย่อหน้าถูกกว่าเขียนโค้ดที่เสร็จแล้วใหม่ คำสั่งที่สอง <code>/opsx:apply</code> เริ่มทำงานตามงาน: เอเจนต์หยิบงานจาก <code>tasks.md</code> ทีละข้อและติ๊กออก คำสั่งที่สาม <code>/opsx:archive</code> ปิดการเปลี่ยนแปลง: ข้อกำหนดย้ายเข้า spec กลาง และโฟลเดอร์ไปอยู่ในคลังพร้อมประวัติการตัดสินใจทั้งหมด การเปลี่ยนแปลงถัดไปเริ่มจาก spec ที่อัปเดตแล้ว</b-why>
  <b-why align="left">หน้าตาของเซสชันเทอร์มินัลสั้น ๆ เป็นแบบนี้ ตัวอย่างเซสชันอิงจากเดโมในคำอธิบายของ OpenSpec<b-proof href="https://github.com/Fission-AI/OpenSpec" quote="OpenSpec: «You: /opsx:propose add-dark-mode / AI: Created openspec/changes/add-dark-mode/ ✓ proposal.md ✓ specs/ ✓ design.md ✓ tasks.md … You: /opsx:archive / AI: Archived to openspec/changes/archive/… Specs updated.» — github.com/Fission-AI/OpenSpec"/>:</b-why>
  <b-agent-term app="Claude&#8203; Code" ver="v2" model="OpenSpec · /opsx" path="~/projects/shop">
    <line kind="ask">/opsx:propose add-dark-mode</line>
    <line kind="act">Created openspec/changes/add-dark-mode/</line>
    <line kind="out">proposal.md · specs/ · design.md · tasks.md</line>
    <line kind="you" note="คุณรีวิวแผน">เพิ่มสถานการณ์: ธีมยังอยู่หลังรีโหลด</line>
    <line kind="ask">/opsx:apply</line>
    <line kind="act">1.1 theme context ✓ · 1.2 toggle ✓ · 2.1 colours ✓</line>
    <line kind="out">all tasks complete</line>
    <line kind="ask">/opsx:archive</line>
    <line kind="act">ย้ายข้อกำหนดเข้า openspec/specs และย้ายโฟลเดอร์การเปลี่ยนแปลงเข้าคลัง</line>
  </b-agent-term>
  <b-table>
  | คำสั่ง | เอเจนต์ทำอะไร | อะไรปรากฏในโปรเจกต์ | คุณทำอะไร |
  |---|---|---|---|
  | <code>/opsx:explore</code> | อ่านโค้ด เสนอทางเลือก | ไม่มีอะไร | เลือกทางเลือก |
  | <code>/opsx:propose</code> | เขียนแผนการเปลี่ยนแปลง | โฟลเดอร์ <code>openspec/changes/name/</code> พร้อมสี่ไฟล์ | อ่านและแก้แผน |
  | <code>/opsx:apply</code> | เขียนโค้ดตามงาน ติ๊กงานออก | โค้ดและเทสต์ | ตรวจผลลัพธ์ |
  | <code>/opsx:archive</code> | รวมข้อกำหนดเข้า spec กลาง | <code>openspec/specs</code> ที่อัปเดตแล้ว โฟลเดอร์ถูกเก็บเข้าคลัง | ไม่ต้องทำอะไร จบแล้ว |
  </b-table>
  <b-why align="left">สำหรับงานใหญ่มีชุดขยาย: สร้างการเปลี่ยนแปลงทีละขั้น ทำต่อรายการที่ค้างอยู่ ตรวจโค้ดเทียบกับ spec เปิดใช้ด้วย <code>openspec config profile</code></b-why>
  <b-finding>
    <ex>หลังเก็บเข้าคลัง <code>openspec/specs</code> เก็บคำอธิบายปัจจุบันของระบบ และประวัติการตัดสินใจอยู่ในคลังการเปลี่ยนแปลง</ex>
    <gen>spec อัปเดตในขั้นเดียวกับโค้ด จึงไม่ล้าสมัยเหมือนวิกิแยกต่างหาก</gen>
    <do>อย่าข้ามการเก็บเข้าคลัง: ถ้าไม่ทำ การเปลี่ยนแปลงถัดไปจะสร้างบนข้อกำหนดเก่า</do>
  </b-finding>
</b-chapter>

<b-chapter id="example" icon="notebook" title="ตัวอย่าง: การเปลี่ยนแปลงในรีโพของเว็บไซต์ urvanov.com">
  <b-why align="left">ตัวอย่างนี้มาจากรีโพของ urvanov.com ซึ่งเป็นเว็บไซต์ที่ตีพิมพ์บทความนี้ โค้ดของเว็บไซต์มีโฟลเดอร์ <code>openspec/</code> ที่เก็บการเปลี่ยนแปลงนี้ไว้ เว็บไซต์มี<a href="/patterns">แคตตาล็อกแพตเทิร์น AI</a>: 73 เทคนิคสำหรับทำงานกับเอเจนต์ AI จัดเป็น 10 หัวข้อ เช่น บริบทและความจำ การประสานงาน ความปลอดภัย และการควบคุมคุณภาพ แต่ละเทคนิคแสดงเป็นการ์ด แคตตาล็อกนี้ทำเป็นส่วนประกอบของการบรรยาย “Spec-Driven Development in Practice” ในงาน Podlodka Crew</b-why>
  <b-why align="left">ปัญหาคือ เมื่อคลิก 72 จาก 73 การ์ดแสดงแค่ชื่อและคำอธิบายหนึ่งบรรทัด ทุกการ์ดต้องเปิดแสดงครบ: เทคนิคแก้ปัญหาอะไร ทำงานอย่างไร คำพูดจากผู้ปฏิบัติ เมื่อไรได้ผลและเมื่อไรพัง เนื้อหามีอยู่แล้วในบันทึกการวิจัย ต้องย้ายมาอย่างระมัดระวังโดยไม่แต่งเพิ่ม การเปลี่ยนแปลงนี้ตั้งชื่อว่า <code>fill-all-pattern-details</code> นี่คือสิ่งที่เอเจนต์เขียนลงในสี่ไฟล์:</b-why>
  <b-table>
  | ไฟล์ | มีอะไร |
  |---|---|
  | <code>proposal.md</code> | ทำไม: แคตตาล็อกเป็นส่วนสำคัญของการบรรยาย และการ์ดว่างทำให้เสียภาพ; เปลี่ยนอะไร: ทั้ง 73 เทคนิคได้คำอธิบายละเอียด |
  | <code>design.md</code> | หนึ่งงานต่อหนึ่งหมวดแพตเทิร์น; คำพูดเอามาจากไฟล์ต้นทางเท่านั้น ไม่แต่งเอง; แผนภาพเฉพาะที่มีการไหลของข้อมูล |
  | <code>specs/pattern-detail/spec.md</code> | ข้อกำหนด “ทุกแพตเทิร์นมี detail ที่กรอกแล้ว” และสามสถานการณ์สำหรับการแสดงการ์ด |
  | <code>tasks.md</code> | 10 งานสำหรับ 10 หมวด ติ๊กครบทั้งหมด |
  </b-table>
  <b-why align="left">ด้านล่างคือชิ้นส่วนของไฟล์ข้อกำหนด SHALL ระบุข้อกำหนดที่ต้องมี Scenario คือการตรวจสอบ: WHEN อธิบายสถานการณ์ THEN คือสิ่งที่ต้องเกิดขึ้น ในที่นี้ detail คือคำอธิบายเต็มของเทคนิค ส่วน problem และ solution คือส่วน “ปัญหา” และ “ทางแก้” ของมัน</b-why>
  <b-codebox title="ข้อความตัดตอนของข้อกำหนดจาก specs/pattern-detail/spec.md">
    ## MODIFIED Requirements
    ### Requirement: Pattern detail content structure
    All patterns in all categories SHALL have a filled detail.
    #### Scenario: Partial content
    - WHEN the user opens a pattern that has only problem and solution
    - THEN the card shows only those sections, with no empty blocks
  </b-codebox>
  <b-why align="left">การตัดสินใจเรื่อง “คำพูดจากต้นทางเท่านั้น” ถูกเขียนใน design.md ก่อนเขียนโค้ด เอเจนต์จึงไม่แต่งคำพูดขึ้นเองในที่ที่ไม่มี และสถานการณ์ “เนื้อหาไม่ครบ” กำหนดไว้ล่วงหน้าว่าการ์ดที่ไม่มีคำพูดหรือแผนภาพหน้าตาเป็นอย่างไร</b-why>
  <b-why align="left">งานนี้ใช้ 10 งาน หนึ่งงานต่อหนึ่งหัวข้อของแคตตาล็อก ทั้ง 10 งานติ๊กแล้ว แต่ไม่เคยรันคำสั่ง archive: โฟลเดอร์การเปลี่ยนแปลงยังอยู่ใน <code>openspec/changes</code> และเว็บไซต์ยังไม่มี spec กลาง นี่เป็นข้อผิดพลาดที่พบบ่อย ข้อกำหนด “ทุกเทคนิคมีคำอธิบายละเอียด” อยู่แค่ในฉบับร่างของการเปลี่ยนแปลง และเอเจนต์ตัวต่อไปที่อ่าน spec กลางจะไม่รู้เรื่องนี้ คำสั่ง <code>/opsx:archive</code> คำสั่งเดียวจะย้ายมันเข้า spec กลาง</b-why>
  <b-finding>
    <ex>สถานการณ์ “เนื้อหาไม่ครบ” ปรากฏในแผนก่อนโค้ด และกำหนดว่าการ์ดทำงานอย่างไรเมื่อไม่มีคำพูดหรือแผนภาพ</ex>
    <gen>ข้อกำหนดที่มีสถานการณ์แบบ “เมื่อ — แล้ว” อ่านเหมือนเทสต์: เอเจนต์รู้ว่าอะไรนับว่าเสร็จ</gen>
    <do>ในทุกข้อกำหนดให้เขียนอย่างน้อยหนึ่งสถานการณ์สำหรับกรณีขอบ: ข้อมูลว่าง ข้อมูลไม่ครบ ข้อผิดพลาด</do>
  </b-finding>
</b-chapter>

<b-chapter id="kit" icon="crosshair" title="OpenSpec หรือ Spec Kit">
  <b-why align="left">ทั้งสองขับเคลื่อนการพัฒนาจากข้อกำหนด แต่มองลำดับต่างกัน Spec Kit ของ GitHub เดินผ่านแต่ละเฟสตามลำดับอย่างเคร่งครัด ส่วน OpenSpec ให้กลับไปที่แผนได้ทุกเมื่อ และสร้างมาสำหรับโปรเจกต์ที่มีโค้ดอยู่แล้ว<b-proof href="https://github.com/Fission-AI/OpenSpec" quote="OpenSpec: «fluid not rigid → iterative not waterfall → easy not complex → built for brownfield not just greenfield» — github.com/Fission-AI/OpenSpec"/></b-why>
  <b-table>
  | | OpenSpec | Spec Kit |
  |---|---|---|
  | ลำดับขั้นตอน | ยืดหยุ่น: กลับไปที่แผนได้ทุกเมื่อ | เฟสตายตัว: หลักการ, spec, แผน, งาน, โค้ด |
  | spec อยู่ที่ไหน | <code>openspec/specs</code> และโฟลเดอร์การเปลี่ยนแปลง | โฟลเดอร์ของฟีเจอร์ที่มี spec แผน และงาน |
  | โปรเจกต์แบบไหน | เหมาะกับโค้ดที่ทำงานอยู่แล้ว | เหมาะกับฟีเจอร์ใหม่ตั้งแต่ศูนย์ |
  | หลายรีโพ | ที่เก็บแผนร่วม (Stores, เบตา) | แต่ละรีโพแยกกัน |
  | ผู้สร้าง | Fission AI | GitHub |
  </b-table>
  <b-finding>
    <ex>OpenSpec บรรยายตัวเองว่ายืดหยุ่นและสร้างมาสำหรับโค้ดที่มีอยู่แล้ว</ex>
    <gen>Spec Kit พาเดินทีละขั้นและเหมาะกับทีมที่ต้องการวินัย OpenSpec เบากว่าและเข้ากับโปรเจกต์ที่มีโค้ดอยู่แล้วได้เร็วกว่า</gen>
    <do>สำหรับการเปลี่ยนแปลงในโปรเจกต์ที่ใช้งานอยู่ ให้เริ่มด้วย OpenSpec; สำหรับฟีเจอร์ใหม่ขนาดใหญ่ตั้งแต่ศูนย์ ลองทั้งสองกับงานเดียวกัน</do>
  </b-finding>
</b-chapter>

<b-chapter id="start" icon="flag" title="เริ่มอย่างไร">
  <b-why align="left">เริ่มจากการเปลี่ยนแปลงเล็ก ๆ หนึ่งอย่างที่ตั้งใจจะทำอยู่แล้ว มีห้าพรอมต์สำหรับเอเจนต์ หนึ่งพรอมต์ต่อหนึ่งขั้น: วางลงใน Claude Code, Codex หรือ Cursor แล้วใส่งานของคุณ</b-why>
  <b-hdd-steps>
    <step t="ติดตั้ง">“ติดตั้ง OpenSpec และรัน openspec init ในโปรเจกต์นี้ แสดงว่ามีคำสั่งอะไรเพิ่มขึ้นมา”</step>
    <step t="สำรวจ">“/opsx:explore ฉันอยากเพิ่ม … ดูโค้ดและเสนอสองทางเลือกโดยไม่เปลี่ยนอะไร”</step>
    <step t="วางแผน">“/opsx:propose … เอาแต่แผนก่อน ในข้อกำหนดให้มีสถานการณ์สำหรับข้อมูลว่างและข้อมูลไม่ครบ”</step>
    <step t="เขียนโค้ด">“/opsx:apply ทำงานทีละข้อ และรันเทสต์หลังแต่ละข้อ”</step>
    <step t="รวม">“/opsx:archive ย้ายข้อกำหนดเข้า spec และแสดงว่า openspec/specs เปลี่ยนอะไร”</step>
  </b-hdd-steps>
</b-chapter>

<b-chapter id="faq" icon="chat" title="คำถามที่พบบ่อย">
  <b-faq-cards>
    <q t="OpenSpec คืออะไร?">เฟรมเวิร์กโอเพนซอร์สฟรีของ Fission AI สำหรับการพัฒนาโดยยึดข้อกำหนด เอเจนต์เขียนแผนการเปลี่ยนแปลงลงไฟล์ Markdown คุณรีวิว เอเจนต์เขียนโค้ด และข้อกำหนดถูกรวมเข้ากับ spec กลางของโปรเจกต์</q>
    <q t="ติดตั้ง OpenSpec อย่างไร?">ด้วย curl -fsSL https://openspec.dev/cli/install.sh | sh บน macOS และ Linux หรือด้วย npm install -g @fission-ai/openspec@latest จากนั้นรัน openspec init ในโฟลเดอร์โปรเจกต์</q>
    <q t="OpenSpec ต่างจาก Spec Kit อย่างไร?">OpenSpec ยืดหยุ่นกว่าและสร้างมาสำหรับโค้ดที่ทำงานอยู่แล้ว ขั้นตอนทำซ้ำตามลำดับใดก็ได้ ส่วน Spec Kit ของ GitHub เดินผ่านเฟสตายตัว: หลักการ, spec, แผน, งาน, โค้ด</q>
    <q t="OpenSpec ใช้กับเอเจนต์ตัวไหนได้?">Claude Code, Codex, Cursor, GitHub Copilot, Amazon Q และอื่น ๆ openspec init ติดตั้งคำสั่งให้เอเจนต์ที่เลือก</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="อ่านเพิ่ม">
  <b-links>
    <item href="/blog/specs-rules-skills/" k="บริบท" t="AGENTS.md และ CLAUDE.md">เอเจนต์ควรรู้อะไรเกี่ยวกับโปรเจกต์และเก็บไว้ที่ไหน</item>
    <item href="/blog/specs-by-aggregates/" k="Spec" t="Spec แยกตาม aggregate">แบ่งข้อกำหนดออกเป็นส่วน ๆ อย่างไร</item>
    <item href="/blog/spec-reconcile-loop/" k="Spec" t="วงจรปรับให้ตรงกันของ spec">รักษาให้ spec กับโค้ดตรงกันอย่างไร</item>
    <item href="/materials/glossary/spec-driven-development/" k="ศัพท์" t="Spec-Driven Development">การพัฒนาโดยยึดข้อกำหนดคืออะไร</item>
  </b-links>
</b-chapter>
</b-post>
