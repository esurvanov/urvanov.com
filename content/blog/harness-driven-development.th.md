---
title: Harness engineering ในทางปฏิบัติ: เปลี่ยนความผิดพลาดของเอเจนต์ AI ให้เป็นกฎของสภาพแวดล้อม (HDD)
date: 2026-09-28
updated: 2026-11-08
description: วงจรจากความผิดพลาดสู่กฎ guide และ sensor การตรวจสามชั้น ความสัมพันธ์กับข้อกำหนด (spec) และห้าก้าวแรกในโปรเจกต์ของคุณเอง
tags: AI, Claude Code, harness engineering, harness, HDD, เอเจนต์
category: harness
layout: wide
image: /og/harness-driven-development.en.png
mentions: Harness engineering, Claude Code, AGENTS.md, CLAUDE.md, Spec-Driven Development
toc: loop=วงจร HDD | canons=ผัง 3 × 3 | double=วงจรสองชั้น | controls=Guide และ sensor | layers=การตรวจสามชั้น | shift=ยิ่งเร็วยิ่งถูก | human=คนสำคัญตรงไหน | spec=HDD กับ spec | start=เริ่มจากตรงไหน | faq=คำถาม | next=อ่านเพิ่ม
---

**Harness engineering** คือการออกแบบสภาพแวดล้อมรอบเอเจนต์ AI (AI agent) ได้แก่ คำสั่ง เครื่องมือ สิทธิ์ และการตรวจสอบ **Harness-Driven Development (HDD)** คือวิธีทำงานที่สร้างบนแนวคิดนี้: ความผิดพลาดของเอเจนต์ทุกครั้งกลายเป็นกฎของสภาพแวดล้อมนั้น

<b-post series="hdd">
<b-chapter id="loop" icon="refresh-cw" title="วงจร HDD">
  <b-why align="left">วงจรทำงานแบบนี้ เอเจนต์รับงานและสร้างผลลัพธ์ sensor (เทสต์ linter หรือการรีวิว) ตรวจผลลัพธ์ ถ้าผ่านทุกอย่าง งานก็ปิด ถ้า sensor พบข้อผิดพลาด คนไม่ได้แค่แก้ผลลัพธ์ แต่เปลี่ยนสภาพแวดล้อมของเอเจนต์ คือ harness: เพิ่มบรรทัดในคำสั่ง เพิ่มเทสต์ หรือเพิ่ม hook งานถัดไปรันพร้อมกฎนั้น และข้อผิดพลาดไม่เกิดซ้ำ</b-why>
  <b-hdd-scene name="harness-driven-development/loop" frame="loop"/>
  <b-cap>หลักการของ Mitchell Hashimoto: เมื่อเอเจนต์ทำพลาด ให้เปลี่ยน harness เพื่อไม่ให้ความผิดพลาดนั้นเกิดซ้ำได้ <a href="https://www.faros.ai/blog/harness-engineering" target="_blank" rel="noopener">Faros</a></b-cap>
  <b-why>พรอมต์แก้คำขอเดียว บริบทแก้สิ่งที่โมเดลรู้ ส่วน harness แก้ทุกการรันถัดไป ตัวอย่าง: เอเจนต์แก้โค้ดแล้วไม่รันเทสต์</b-why>
  <b-hdd-scene name="harness-driven-development/fix-levels" frame="fig"/>
  <b-cap>ขั้นต่าง ๆ ตามที่ <a href="https://www.faros.ai/blog/harness-engineering" target="_blank" rel="noopener">Faros</a> และ <a href="https://marmelab.com/blog/2026/09/24/the-state-of-ai-harness-engineering-2026.html" target="_blank" rel="noopener">marmelab</a> อธิบายไว้</b-cap>
  <b-why align="left">ตารางแสดงความผิดพลาดหนึ่งอย่าง (เอเจนต์แก้โค้ดแล้วไม่รันเทสต์) กับสามวิธีแก้ พรอมต์: เพิ่มคำว่า “รันเทสต์หลังแก้” วิธีนี้ได้ผลกับคำขอเดียว และคำขอถัดไปเริ่มจากศูนย์ บริบท: เขียนเรื่องเดียวกันลงในไฟล์คำสั่งของโปรเจกต์ โมเดลอ่านแต่อาจข้าม Harness: เพิ่ม hook ที่รันเทสต์เองหลังการแก้ทุกครั้ง hook รันโดยไม่ผ่านโมเดล การแก้จึงคงอยู่ในทุกการรันถัดไป</b-why>
  <b-finding>
    <ex>ความผิดพลาดที่ sensor จับได้ถูกใส่เข้า harness เป็นกฎใหม่ และเอเจนต์ได้กฎนั้นในทุกการรันถัดไป</ex>
    <gen>ผลลัพธ์ที่แก้ด้วยมือช่วยได้ครั้งเดียว กฎใน harness (คำสั่ง เทสต์ หรือ hook) ใช้กับงานในอนาคตทั้งหมด harness จึงแม่นยำขึ้นเรื่อย ๆ โดยไม่ต้องเปลี่ยนโมเดล</gen>
    <do>ตั้งกฎข้อหนึ่ง: ความผิดพลาดของเอเจนต์ทุกอย่างที่ต้องแก้ด้วยมือ ต้องกลายเป็นหนึ่งบรรทัดในคำสั่งหรือหนึ่งเทสต์ภายในวันเดียวกัน</do>
  </b-finding>
</b-chapter>

<b-chapter id="canons" icon="grid" title="harness จัดวางอย่างไร: 3 × 3">
  <b-why>สามโดเมนของวงจรและสามบริบทในแต่ละโดเมน รวมเก้า canon แต่ละ canon มีหนึ่งโดเมนและหนึ่งบริบทพอดี</b-why>
  <b-hdd-matrix kind="canons" label="harness จัดวางอย่างไร: 3 × 3">
    <column icon="book" t="Spec">อะไรต้องเป็นจริง</column>
    <column icon="sun" t="Skill">ลงมืออย่างไร</column>
    <column icon="database" t="Memory">พึ่งอะไร</column>
    <row icon="target" t="Expectation">สิ่งที่ควรเป็น</row>
    <cell>genres, schemas | requirement levels | number passport</cell>
    <cell>prediction before acting</cell>
    <cell>actuator roles | live · MCP</cell>
    <row icon="eye" t="Observation">สิ่งที่วัดได้</row>
    <cell>evidence rank | finding format | scale</cell>
    <cell>sensor records the fact</cell>
    <cell>live only</cell>
    <row icon="refresh-cw" t="Loop">เทียบและตัดสินใจ</row>
    <cell>rule completeness criteria | findings registry</cell>
    <cell>compare | count repeats | patch or revise</cell>
    <cell empty>ว่างไว้ก่อน</cell>
  </b-hdd-matrix>
  <b-hdd-fanin label="Expectation + Observation → Loop → patch / revise rules">
    <in icon="target">Expectation</in>
    <in icon="eye">Observation</in>
    <mid icon="refresh-cw" note="✕ ไม่มีลิงก์ย้อนกลับ">Loop</mid>
    <out>patch</out>
    <out alt>revise rules</out>
    <note from="sun" to="book">skill → spec ของโดเมนตัวเอง · สคริปต์ commit hook ตรวจทิศทาง</note>
  </b-hdd-fanin>
  <b-hdd-modes>
    <mode icon="table" t="snapshot">ตารางที่อัปเดตหลังการวัดใหม่ทุกครั้ง</mode>
    <mode icon="broadcast-pole" t="live">โปรโตคอลที่สดใหม่ทุกครั้ง ไม่เก็บอะไรไว้</mode>
  </b-hdd-modes>
  <b-why align="left">ผังอ่านเป็นสามคำถาม Expectation: ผลลัพธ์ควรเป็นอะไร (เช่น “หลังแก้ เทสต์ต้องผ่าน”) Observation: ผลลัพธ์จริงเป็นอะไร ซึ่ง sensor บันทึกไว้ Loop: เทียบสองอย่างนั้นแล้วตัดสินใจว่าจะทำอะไร แต่ละแถวจากสามแถวมีการรองรับสามแบบ: spec (อะไรต้องเป็นจริง) skill (ลงมืออย่างไร) และ memory (พึ่งอะไร) คำว่า “โดเมน” และ “canon” เป็นเพียงชื่อในที่นี้: โดเมนคือแถวหนึ่งของผัง canon คือหนึ่งช่อง เช่น spec ของ Expectation แผนภาพด้านล่างแสดงทิศทางของลิงก์: Expectation และ Observation ป้อนเข้า Loop และ Loop ให้ผลเป็น patch (แก้การกระทำ) หรือการทบทวนกฎ ไม่มีลิงก์ย้อนกลับมาที่ Loop โดเมนจึงไม่พันกัน โหมดของ memory: snapshot คือตารางที่อัปเดตเมื่อมีการวัดใหม่เข้ามา live หมายถึงข้อมูลถูกดึงจากระบบจริง (เช่นผ่าน MCP) ทุกครั้งและไม่ถูกเก็บ</b-why>
  <b-finding>
    <ex>วงจรแบ่งเป็น Expectation, Observation และ Loop แต่ละส่วนมี spec, skill และ memory ของตัวเอง Loop อ่านอีกสองโดเมน ส่วนสองโดเมนนั้นไม่อ่าน Loop</ex>
    <gen>นี่คือวงจรป้อนกลับเชิงลบ: ค่าเป้าหมายถูกเทียบกับค่าที่วัดได้ และจะเปลี่ยนอะไรก็ต่อเมื่อไม่ตรงกัน ทิศทางการอ้างอิงที่เข้มงวดทำให้โดเมนไม่พันกัน และแนวคิดเดียวกันที่ซ้ำในสองโดเมนไม่ใช่ข้อบกพร่อง</gen>
    <do>จัดไฟล์ใน harness ของคุณลงเก้าช่อง และตรวจว่าไม่มีไฟล์ของ Expectation หรือ Observation ที่อ้างถึง Loop</do>
  </b-finding>
</b-chapter>

<b-chapter id="double" icon="loop-double" title="วงจรสองชั้น">
  <b-why align="left">วงจรสองชั้นตอบคำถามว่าหลังความผิดพลาดต้องเปลี่ยนอะไรกันแน่ ลองความผิดพลาดเดิม: เอเจนต์ไม่ได้รันเทสต์ ในวงจรชั้นเดียว คุณเตือนเอเจนต์ เอเจนต์รันเทสต์ และกฎยังเหมือนเดิม ในวงจรสองชั้น คุณถามว่ากฎข้อไหนยอมให้เกิดความผิดพลาดนี้ แล้วเปลี่ยนกฎนั้น: ตอนนี้ hook รันเทสต์หลังการแก้ทุกครั้ง แนวคิดนี้มาจากทฤษฎีการเรียนรู้ขององค์กร (Chris Argyris และ Donald Schön): วงจรชั้นเดียวแก้การกระทำ วงจรสองชั้นทบทวนกฎที่การกระทำนั้นเกิดจาก <a href="https://en.wikipedia.org/wiki/Double-loop_learning" target="_blank" rel="noopener">Wikipedia: Double-loop learning</a></b-why>
  <b-hdd-loops>
    <loop kind="single" t="วงจรชั้นเดียว">แก้การกระทำภายใต้กฎเดิม</loop>
    <loop kind="double" t="วงจรสองชั้น" on>เปลี่ยนตัวกฎเอง</loop>
  </b-hdd-loops>
  <b-hdd-principles>
    <principle icon="wave-line" t="Patch ที่ไม่มีการทำนายใหม่">แก้ด้วยกฎ</principle>
    <principle icon="flask" t="คำบ่นหลายเรื่อง">ทดสอบก่อนว่ามีสาเหตุร่วมหรือไม่</principle>
    <principle icon="history" t="กฎใหม่">ยอมรับเมื่อกรณีเก่าอธิบายตามได้</principle>
    <principle icon="shield-check" t="ไม่มีการตรวจจากภายนอก">ทิ้งไป พร้อมบันทึกไว้</principle>
  </b-hdd-principles>
  <b-cap>วงจรใช้กับตัวเองด้วย: ทุกการรันจบด้วยความเสี่ยงที่เหลือ ไม่เคยจบด้วยสถานะ “เสร็จแล้ว”</b-cap>
  <b-why align="left">การเปลี่ยนกฎหลังคำบ่นทุกครั้งมีความเสี่ยง: harness จะบวมจากการแก้แบบสุ่ม Loop จึงใช้สี่การตรวจ ถ้าการแก้เพียงอุดรูและไม่ทำนายอะไรใหม่ ให้แทนด้วยกฎข้อเดียว ถ้ามีคำบ่นหลายเรื่อง ให้ทดสอบก่อนว่ามีสาเหตุร่วมหรือไม่ กฎใหม่ยอมรับเมื่อกรณีเก่ายังอธิบายได้ด้วยกฎนั้น กฎที่ไม่มีการตรวจจากภายนอกถูกทิ้ง แต่บันทึกจะบอกว่าทิ้งอะไรและทำไม คำบรรยายใต้การ์ดหมายความว่า Loop ใช้กับตัวเองด้วย: การรันไม่ตั้งสถานะ “เสร็จแล้ว” แต่จบด้วยความเสี่ยงที่เหลือ</b-why>
  <b-finding>
    <ex>ชุดของ patch คำบ่น กฎใหม่ และการตรวจจากภายนอก เป็นสี่หลักการที่ตรวจได้ ซึ่ง Loop ใช้ตัดสินว่าจะแก้การกระทำหรือเปลี่ยนกฎ</ex>
    <gen>วงจรชั้นเดียวแก้ผลลัพธ์ภายใต้กฎเดิม วงจรสองชั้นเปลี่ยนตัวกฎ และทำตามหลักการที่ตรวจได้ harness จึงเรียนรู้โดยไม่ลอยไปตามการแก้แบบสุ่ม</gen>
    <do>เมื่อการแก้แบบเดิมโผล่มาเป็นครั้งที่สาม ให้หยุดแล้วถามว่ากฎข้อไหนเป็นต้นเหตุ เปลี่ยนกฎก็ต่อเมื่อกฎใหม่อธิบายกรณีเก่าได้ด้วย</do>
  </b-finding>
</b-chapter>

<b-chapter id="controls" icon="grid" title="Guide และ sensor">
  <b-why align="left">การตรวจใน harness แบ่งตามสองลักษณะ ลักษณะแรกคือเมื่อไรที่ทำงาน Guide ทำงานก่อนที่เอเจนต์ลงมือและกำหนดทิศทาง: ชนิดข้อมูล แม่แบบโค้ด คำสั่ง spec Sensor ทำงานหลังลงมือและจับความเบี่ยงเบน: เทสต์ linter การรีวิวด้วย AI ลักษณะที่สองคือการตรวจสร้างขึ้นอย่างไร การตรวจแบบคำนวณได้ (ชนิดข้อมูล เทสต์ linter) ทำงานในไม่กี่วินาทีและไม่พลาดภายในกฎของมัน การตรวจด้วย AI (การรีวิวด้วย AI, โมเดลที่ทำหน้าที่ตัดสิน) ยืดหยุ่นกว่าแต่แพงกว่า จึงเก็บไว้ใช้กับเรื่องความหมาย: สไตล์ ความชัดเจน ความตรงกับเจตนา</b-why>
  <b-hdd-matrix kind="guides" label="ตาราง: guide ทำงานก่อนเอเจนต์ sensor ทำงานหลัง แต่ละอย่างเป็นแบบคำนวณได้หรือแบบ AI">
    <column icon="arrow-right" t="Guide">ก่อนลงมือ</column>
    <column icon="eye" t="Sensor">หลังลงมือ</column>
    <row icon="cpu" t="แบบคำนวณได้" speed="3">เร็ว · เชื่อถือได้</row>
    <cell>types | code templates | generators</cell>
    <cell>tests | linter | type checking</cell>
    <row icon="sparkle-4" t="แบบ AI" speed="1">ยืดหยุ่น · แพงกว่า</row>
    <cell>AGENTS.md · CLAUDE.md | skills | specs</cell>
    <cell>AI review | LLM judge</cell>
  </b-hdd-matrix>
  <b-cap>การแบ่งตามที่อธิบายใน <a href="https://martinfowler.com/articles/harness-engineering.html" target="_blank" rel="noopener">Martin Fowler: Harness engineering</a></b-cap>
  <b-finding>
    <ex>สี่ช่อง: guide กำหนดทิศทางก่อนเอเจนต์ทำงาน sensor จับความเบี่ยงเบนทีหลัง และแต่ละอย่างเป็นแบบคำนวณได้หรือแบบ AI ก็ได้</ex>
    <gen>การตรวจแบบคำนวณได้ทำงานในไม่กี่วินาทีและไม่พลาด จึงใช้ทุกที่ที่เขียนกฎเป็นทางการได้ เก็บการตรวจแบบ AI ไว้กับเรื่องความหมาย: สไตล์ ความชัดเจน ความตรงกับเจตนา</gen>
    <do>สำหรับกฎแต่ละข้อในคำสั่งของเอเจนต์ ให้ถามว่าเทสต์หรือ linter ตรวจได้ไหม ถ้าได้ ย้ายไปไว้ที่นั่น</do>
  </b-finding>
</b-chapter>

<b-chapter id="layers" icon="layers" title="การตรวจสามชั้น">
  <b-why align="left">การตรวจจัดเป็นสามชั้น คุณภาพโค้ด: สไตล์ การจัดรูปแบบ ชนิดข้อมูล ข้อผิดพลาดง่าย ๆ สถาปัตยกรรม: ขอบเขตของโมดูลและความสัมพันธ์ระหว่างกัน ข้อกำหนดด้านความเร็ว พฤติกรรม: ผลิตภัณฑ์ทำสิ่งที่ผู้ใช้ต้องการหรือไม่ แท่งในภาพแสดงว่าชั้นนั้นเรียนรู้ที่จะตรวจอัตโนมัติได้ดีแค่ไหน: แท่งแรกเกือบเต็ม พฤติกรรมสั้นที่สุด</b-why>
  <b-hdd-layers label="สามชั้น: คุณภาพโค้ดสุกงอมที่สุด สถาปัตยกรรมอยู่กลาง พฤติกรรมสุกงอมน้อยที่สุด">
    <layer icon="brush" t="คุณภาพโค้ด" value="88">สุกงอม</layer>
    <layer icon="modules" t="สถาปัตยกรรม" value="55">กำลังพัฒนา</layer>
    <layer icon="user-round" t="พฤติกรรม" value="25" sw="1.8">ยากที่สุด</layer>
  </b-hdd-layers>
  <b-cap>ความสุกงอมของแต่ละชั้นตามการประเมินของ <a href="https://martinfowler.com/articles/harness-engineering.html" target="_blank" rel="noopener">Martin Fowler</a></b-cap>
  <b-finding>
    <ex>คุณภาพโค้ดตรวจง่ายที่สุดในวันนี้ และพฤติกรรมของผลิตภัณฑ์ตรวจยากที่สุด</ex>
    <gen>linter และตัวจัดรูปแบบครอบคลุมชั้นแรกได้เกือบทันที สถาปัตยกรรมตรวจด้วยกฎความสัมพันธ์และข้อกำหนดด้านประสิทธิภาพ พฤติกรรมยังต้องใช้เทสต์ตามสถานการณ์ที่ดีและสายตาของคน</gen>
    <do>เริ่มจากชั้นแรก: รัน linter และตัวจัดรูปแบบทุกครั้งที่เอเจนต์รัน แล้วเพิ่มกฎเรื่องขอบเขตโมดูลหนึ่งข้อ</do>
  </b-finding>
</b-chapter>

<b-chapter id="shift" icon="clock" title="ยิ่งเร็วยิ่งถูก">
  <b-why align="left">การตรวจทุกอย่างทำงานในช่วงเวลาหนึ่ง ยิ่งเร็วเท่าไร การแก้ความผิดพลาดก็ยิ่งถูก ภาพแสดงสี่ช่วงเวลา: ก่อนเอเจนต์ทำงาน (คำสั่งและ spec) ตอนเขียน (hook และ linter) ใน CI (การ build และเทสต์อัตโนมัติเมื่อ push โค้ดเข้ารีโพ) และในการรีวิวโดยคน เครื่องหมาย $ แสดงราคาของความผิดพลาดที่สูงขึ้น</b-why>
  <b-hdd-cost label="ยิ่งตรวจเร็ว ความผิดพลาดยิ่งถูก: ก่อนเอเจนต์เริ่ม ตอนเขียน ใน CI ตอนรีวิว">
    <stage icon="arrow-right" t="ก่อนทำงาน" cost="$">คำสั่ง · spec</stage>
    <stage icon="cpu" t="ตอนเขียน" cost="$$">hook · linter</stage>
    <stage icon="refresh-cw" t="ใน CI" cost="$$$" sw="1.8">เทสต์ · build</stage>
    <stage icon="user-round" t="ตอนรีวิว" cost="$$$$" sw="1.8">คน</stage>
  </b-hdd-cost>
  <b-why align="left">เทสต์รันโดยเอนจินอย่าง [QUnit](/materials/glossary/qunit/), [Jest](/materials/glossary/jest/) และ [Vitest](/materials/glossary/vitest/) ความต่างและวิธีเลือกอยู่ในบทความ [Vitest vs Jest: เลือกอะไรสำหรับโปรเจกต์ JavaScript และเมื่อไรที่ QUnit พอ](/blog/jest-vs-vitest-vs-qunit/) กฎด้านพฤติกรรมที่เทสต์ธรรมดาตรวจไม่ได้ หาพบได้ด้วย[โมเดลใน Quint](/blog/quint-vs-tests-and-tla/)</b-why>
  <b-finding>
    <ex>ความผิดพลาดเดียวกันมีต้นทุนต่ำสุดก่อนเอเจนต์เริ่ม และสูงสุดตอนคนรีวิว</ex>
    <gen>วางการตรวจที่เร็วให้เร็วที่สุดเท่าที่ทำได้: เอเจนต์แก้ปัญหาเองขณะที่บริบทของงานยังอยู่ตรงหน้า และมีเพียงประเด็นที่ถกเถียงได้เท่านั้นที่ไปถึงคน</gen>
    <do>ต่อเทสต์และ linter เข้ากับ hook ที่เอเจนต์รันหลังการแก้ทุกครั้ง เพิ่มจาก CI</do>
  </b-finding>
</b-chapter>

<b-chapter id="human" icon="user-round" title="คนสำคัญตรงไหน">
  <b-why align="left">harness รับการตรวจประจำไปทำ: สไตล์ ชนิดข้อมูล เทสต์ ขอบเขตโมดูล คนตัดสินใจเรื่องที่การตรวจแบบเป็นทางการครอบคลุมไม่ได้: สถาปัตยกรรม ประเด็นด้านผลิตภัณฑ์ และกฎใหม่ ตัวเลขในภาพแสดงสัดส่วนตัวอย่าง: 36 การตรวจเป็นของ harness และ 6 เป็นของคน</b-why>
  <b-hdd-split label="harness จัดการการตรวจประจำ คนตัดสินใจเรื่องสถาปัตยกรรมและผลิตภัณฑ์ และปรับปรุงตัว harness เอง">
    <side icon="sun" t="Harness" n="36">สไตล์ · ชนิดข้อมูล · เทสต์ · ขอบเขต</side>
    <side icon="user-round" t="คน" n="6" sw="1.8">สถาปัตยกรรม · ผลิตภัณฑ์ · กฎใหม่</side>
  </b-hdd-split>
  <b-cap>"harness ที่ดีเก็บคนไว้ในวงจรและชี้ความสนใจของคนไปยังจุดที่สำคัญที่สุด" — ถอดความจาก <a href="https://martinfowler.com/articles/harness-engineering.html" target="_blank" rel="noopener">Martin Fowler</a></b-cap>
  <b-finding>
    <ex>harness รับการตรวจส่วนใหญ่ไป คนเก็บการตัดสินใจและงานปรับปรุง harness ไว้</ex>
    <gen>นักพัฒนาที่มีประสบการณ์พก harness โดยนัยไว้ในหัว คือความรู้เรื่องสถาปัตยกรรม นิสัยของทีม และความรู้สึกต่อความเสี่ยง HDD ย้ายความรู้นั้นมาเป็นกฎที่ชัดเจน เอเจนต์ทุกการรันจึงได้รับความรู้นั้น</gen>
    <do>หลังรีวิวโค้ดของเอเจนต์ทุกครั้ง ให้จดความเห็นหนึ่งข้อที่เจอซ้ำ ๆ แล้วเปลี่ยนเป็นกฎ</do>
  </b-finding>
</b-chapter>

<b-chapter id="spec" icon="file-text" sw="2" title="HDD กับ spec">
  <b-why align="left">spec กับ harness เสริมกัน spec ตอบว่า “ควรได้อะไร” harness ตรวจว่าได้สิ่งนั้นจริง ในภาพ spec กำหนดผลลัพธ์ที่ต้องการ harness ตรวจ และโค้ดถูกยอมรับจากผลการตรวจ ไม่ใช่จากการอ่านทุกบรรทัด</b-why>
  <b-hdd-specflow label="spec กำหนดเป้าหมาย harness ตรวจว่าเอเจนต์ไปถึงเป้าหมาย">
    <node icon="target" t="Spec">ผลลัพธ์ที่ต้องการ</node>
    <node icon="sun" t="Harness">ตรวจอย่างไรว่าได้แล้ว</node>
    <node icon="check-circle-alt" t="โค้ดที่ยอมรับ">ไม่ต้องรีวิวด้วยมือทีละบรรทัด</node>
  </b-hdd-specflow>
  <b-cap>"Specs define the target state, the harness is the control system" — <a href="https://loiane.com/2026/04/harness-engineering-missing-layer-specs-driven-ai-development/" target="_blank" rel="noopener">Loiane Groner</a> อ่านเรื่อง spec เพิ่มเติมในการบรรยาย <a href="/en/talk/spec-driven-development/">Spec-Driven Development in practice</a></b-cap>
  <b-finding>
    <ex>spec ตอบว่า "เรากำลังสร้างอะไร" harness ตอบว่า "เรารู้ได้อย่างไรว่าสร้างเสร็จ"</ex>
    <gen>ถ้าไม่มี spec harness ก็ไม่มีอะไรให้ตรวจ และถ้าไม่มี harness spec ก็เป็นแค่เอกสาร สองอย่างรวมกันทำให้ยอมรับโค้ดของเอเจนต์จากผลการตรวจ แทนการอ่านทุกบรรทัด</gen>
    <do>สำหรับข้อกำหนดแต่ละข้อใน spec ให้จดว่าเทสต์หรือการตรวจแบบไหนจะยืนยันว่าเป็นไปตามข้อกำหนด</do>
  </b-finding>
</b-chapter>

<b-chapter id="start" icon="flag" title="เริ่มจากตรงไหน">
  <b-why align="left">ไม่จำเป็นต้องออกแบบ harness ให้ครบทั้งหมดตั้งแต่แรก เริ่มด้วยห้าขั้น: สองขั้นแรกตั้งสภาพแวดล้อมทันที อีกสามขั้นเริ่มวงจร “ความผิดพลาด → กฎ” ไฟล์ความคืบหน้าจำเป็นเมื่องานยาวกว่าหนึ่งเซสชัน: เก็บรายการฟีเจอร์พร้อมสถานะ และเซสชันใหม่ของเอเจนต์ทำต่อจากจุดเดิม</b-why>
  <b-hdd-steps>
    <step t="ไฟล์คำสั่งสำหรับเอเจนต์">AGENTS.md หรือ CLAUDE.md ที่รากโปรเจกต์: build อย่างไร ทดสอบอย่างไร ห้ามทำอะไร</step>
    <step t="linter และเทสต์หลังแก้ทุกครั้ง">hook ที่เอเจนต์รันเองก่อนส่งมอบผลลัพธ์</step>
    <step t="บันทึกความผิดพลาดของเอเจนต์">ความผิดพลาดทุกอย่างที่แก้ด้วยมือได้หนึ่งบรรทัดพร้อมสาเหตุ</step>
    <step t="ความผิดพลาด → กฎ">สัปดาห์ละครั้ง ย้ายรายการในบันทึกไปเป็นคำสั่ง เทสต์ หรือ hook</step>
    <step t="ไฟล์ความคืบหน้าสำหรับงานยาว">รายการฟีเจอร์พร้อมสถานะและประวัติ commit เพื่อให้เซสชันใหม่ทำต่อจากที่เซสชันก่อนหยุด <a href="https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents" target="_blank" rel="noopener">Anthropic</a></step>
  </b-hdd-steps>
  <b-finding>
    <ex>ห้าขั้น: สองขั้นตั้ง harness ทันที สามขั้นเริ่มวงจร "ความผิดพลาด → กฎ"</ex>
    <gen>ไม่มีใครออกแบบ harness ให้ครบตั้งแต่ต้น harness เติบโตจากความผิดพลาดจริงของเอเจนต์ในโปรเจกต์ของคุณ และภายในไม่กี่สัปดาห์เอเจนต์จะเลิกทำพลาดแบบที่พบบ่อยที่สุด</gen>
    <do>วันนี้สร้างไฟล์คำสั่งและบันทึกความผิดพลาด อีกหนึ่งสัปดาห์ย้ายรายการแรกในบันทึกไปเป็นกฎ</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="คำถามที่พบบ่อย">
  <b-faq-cards>
    <q t="Harness engineering คืออะไร?">การตั้งค่าสภาพแวดล้อมรอบเอเจนต์ AI ได้แก่ คำสั่ง เครื่องมือ สิทธิ์ และการตรวจสอบ</q>
    <q t="HDD คืออะไร?">Harness-Driven Development: วิธีทำงานที่ความผิดพลาดของเอเจนต์ทุกอย่างกลายเป็นกฎของสภาพแวดล้อม ไม่ว่าจะเป็นคำสั่ง เทสต์ หรือ hook</q>
    <q t="ทำไมกฎจึงดีกว่าการแก้ด้วยมือ?">ผลลัพธ์ที่แก้ด้วยมือช่วยได้ครั้งเดียว ส่วนกฎใน harness ทำงานกับทุกงานในอนาคต</q>
    <q t="เริ่มใช้ HDD อย่างไร?">สร้างไฟล์คำสั่งสำหรับเอเจนต์และบันทึกความผิดพลาดของมัน แล้วสัปดาห์ละครั้งย้ายรายการในบันทึกไปเป็นกฎ เทสต์ หรือ hook</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="อ่านเพิ่ม">
  <b-links cols="2">
    <item href="/blog/work-prompts-examples/" k="ขั้น 1–2" t="พรอมต์สำหรับงานประจำ">เขียนคำขอเดียวและป้อนข้อมูลอย่างไร</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="ขั้น 3" t="เปรียบเทียบ harness">Claude Code, Codex, Cursor, Hermes และแชต</item>
  </b-links>
  <b-cap>อ่านเพิ่ม: <a href="https://martinfowler.com/articles/harness-engineering.html" target="_blank" rel="noopener">Martin Fowler</a> · <a href="https://www.anthropic.com/engineering/harness-design-long-running-apps" target="_blank" rel="noopener">Anthropic: Harness design</a> · <a href="https://leanpub.com/becoming-a-harness-driven-developer" target="_blank" rel="noopener">Becoming a Harness-Driven Developer</a> · <a href="https://github.com/ai-boost/awesome-harness-engineering" target="_blank" rel="noopener">awesome-harness-engineering</a></b-cap>
</b-chapter>
<b-footer>ศัพท์และการแบ่งชั้นอ้างอิงตามแหล่งที่ลิงก์ไว้ในคำบรรยายใต้แผนภาพ</b-footer>
</b-post>
