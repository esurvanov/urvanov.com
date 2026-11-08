---
title: ต้องใช้เอเจนต์ AI กี่ตัว: จำนวนเอเจนต์เพิ่มตามจำนวน bounded context
date: 2026-10-10
updated: 2026-11-08
description: หนึ่งเอเจนต์ต่อหนึ่ง bounded context ทำไมเอเจนต์จึงมีเท่ากับจำนวนขอบเขตความหมาย ขยายขนาดอย่างไร อะไรอยู่ระหว่างเอเจนต์ และเริ่มจากตรงไหน
tags: AI, เอเจนต์, bounded context, DDD, สถาปัตยกรรม, การขยายขนาด, harness
category: harness
layout: wide
mentions: bounded context, multi-agent, AI agent, DDD, context map, contracts, scaling, harness
toc: idea=หนึ่งเอเจนต์ต่อหนึ่ง context | scale=การขยายขนาด | borders=ระหว่างเอเจนต์ | first=เริ่มจากตรงไหน | faq=คำถามที่พบบ่อย | next=อ่านต่อ
---

ต้องใช้เอเจนต์ AI (AI agent) กี่ตัว? เท่ากับจำนวน bounded context: ขอบเขตความหมายแต่ละขอบเขตมีเอเจนต์ของตัวเอง ด้านล่างอธิบายเหตุผล วิธีขยายขนาด สิ่งที่อยู่ระหว่างเอเจนต์ และจุดเริ่มต้น

<b-post series="harness">

<b-chapter id="idea" icon="ring-dot" title="หนึ่งเอเจนต์ต่อหนึ่ง context">
  <b-why align="left">จำนวนเอเจนต์เท่ากับจำนวน [bounded context](/materials/glossary/bounded-context/) แบบนี้ [เอเจนต์](/materials/glossary/ai-agent/) จะมีบริบทพอใช้งาน</b-why>
  <b-lane title="ตัวเดียวทำทั้งหมด หรือหนึ่งตัวต่อหนึ่ง context" color="accent">
    <iso-art name="agents-per-bounded-context/one-vs-per-context"></iso-art>
  </b-lane>
  <b-finding>
    <ex>คำว่า "ออเดอร์" ในฝ่ายขาย การจัดส่ง และการชำระเงินมีความหมายต่างกัน เอเจนต์ตัวเดียวจะปนความหมายเข้าด้วยกัน ส่วนเอเจนต์สามตัวต่างถือความหมายของตัวเอง</ex>
    <gen>ขอบเขตของ context บอกอยู่แล้วว่าความหมายเปลี่ยนตรงไหน จึงเป็นจุดที่เหมาะจะแบ่งทั้งข้อกำหนด (spec) และงานของเอเจนต์</gen>
    <do k="ควรทำ">ไล่รายการ context ของโปรเจกต์ แล้วเขียนข้างแต่ละตัวว่าใครทำงานภายในขอบเขตนั้น</do>
  </b-finding>
</b-chapter>

<b-chapter id="scale" icon="chart-axes" title="ขยายขนาดอย่างไร">
  <b-lane title="ภาระงานกับจำนวนเอเจนต์" color="accent">
    <iso-art name="agents-per-bounded-context/load-chart"></iso-art>
  </b-lane>
  <b-finding>
    <ex>มีแปด context: เอเจนต์ตัวเดียวจมอยู่กับความหมายมากมาย ส่วนเอเจนต์แปดตัวต่างทำงานภายในขอบเขตของตัวเอง</ex>
    <gen>จำนวนเอเจนต์เพิ่มเป็นเส้นตรงตามจำนวน context ขณะที่ภาระของแต่ละตัวคงที่</gen>
    <do k="ควรทำ">เพิ่มเอเจนต์พร้อมกับ context ใหม่ แทนที่จะขยายบริบทของเอเจนต์ตัวเดิม</do>
  </b-finding>
</b-chapter>

<b-chapter id="borders" icon="boxes-link" title="อะไรอยู่ระหว่างเอเจนต์">
  <b-why align="left">เอเจนต์สื่อสารกันผ่านสัญญา (contract) ได้แก่ event และ API context ของคนอื่นไม่ได้อยู่ในการควบคุมของคุณ เอเจนต์จึงเข้าถึงได้ผ่านสัญญาและต้องได้รับการยืนยันจากคุณเท่านั้น เรื่องการประเมินความซับซ้อนอ่านต่อที่ [ความซับซ้อนที่แท้จริงอยู่ตรงไหน](/blog/agent-hands-work-back-to-you/#hard)</b-why>
  <b-lane title="Context map" color="accent">
    <iso-art name="agents-per-bounded-context/context-map"></iso-art>
  </b-lane>
  <b-finding>
    <ex>เอเจนต์ฝ่ายขายอ่าน event "ชำระเงินแล้ว" จากระบบชำระเงิน และเขียนไปยังระบบของพาร์ตเนอร์ผ่านสัญญาที่อนุมัติแล้วเท่านั้น</ex>
    <gen>สัญญาแทนที่บริบทร่วม: เอเจนต์ไม่ต้องรู้เรื่องภายในขอบเขตของคนอื่น และความผิดพลาดจะไม่ลามไปที่อื่น</gen>
    <do k="ควรทำ">สำหรับทุกการเชื่อมระหว่าง context ให้เขียนสัญญาหนึ่งบรรทัด: ให้อะไร รับอะไร ใครเป็นเจ้าของ</do>
  </b-finding>
</b-chapter>

<b-chapter id="first" icon="shield-check" title="เริ่มจากตรงไหน">
  <b-lane title="ก้าวแรก" color="accent">
    <iso-art name="agents-per-bounded-context/start"></iso-art>
  </b-lane>
  <b-finding>
    <ex>เริ่มจาก context ที่อยู่ติดกันสองตัวและสัญญาหนึ่งฉบับระหว่างกัน</ex>
    <gen>หนึ่ง context หนึ่งเอเจนต์ หนึ่งสัญญา: เป็นการทดสอบแนวทางนี้ก่อนจะขยายไปทั้งโปรเจกต์</gen>
    <do k="ควรทำ">เลือกสอง context ที่คำศัพท์ปนกันบ่อยที่สุด แล้วเริ่มเอเจนต์หนึ่งตัวต่อหนึ่ง context</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="คำถามที่พบบ่อย">
  <b-faq-cards>
    <q t="ต้องใช้เอเจนต์ AI กี่ตัว?">เท่ากับจำนวน bounded context: ขอบเขตความหมายแต่ละขอบเขตมีเอเจนต์ของตัวเอง</q>
    <q t="ขยายขนาดอย่างไร?">จำนวนเอเจนต์เพิ่มเป็นเส้นตรงตามจำนวน context ขณะที่ภาระของแต่ละตัวสม่ำเสมอ</q>
    <q t="อะไรเชื่อมเอเจนต์เข้าด้วยกัน?">สัญญาที่ขอบเขต: เอเจนต์ไม่ต้องรู้เรื่องภายในของ context อื่น และความผิดพลาดจะไม่ลามไปที่อื่น</q>
    <q t="เริ่มจากตรงไหน?">จาก context เดียว เอเจนต์เดียว และสัญญาเดียว: เป็นการทดสอบแนวทางนี้ก่อนขยายไปทั้งโปรเจกต์</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" icon="arrow-right" title="อ่านต่อ">
  <b-links>
    <item href="/blog/specs-by-aggregates/" k="Specs" t="ข้อกำหนดแบ่งตาม aggregate">ขอบเขต context ในข้อกำหนด</item>
    <item href="/blog/agent-hands-work-back-to-you/" k="Agent" t="เอเจนต์จะมาแทนงานของคุณไหม">ความซับซ้อนที่แท้จริงอยู่ตรงไหน</item>
    <item href="/materials/glossary/bounded-context/" k="Term" t="Bounded context">คืออะไรและทำไมสำคัญ</item>
    <item href="/blog/agent-checkpoint/" k="Checks" t="ตรวจงานของเอเจนต์ AI ตรงไหน">ขอบเขต aggregate และขนาดของ context</item>
  </b-links>
</b-chapter>
</b-post>
