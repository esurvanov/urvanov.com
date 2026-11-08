---
title: ข้อกำหนดแบ่งตาม aggregate: ระดับข้อกำหนดแบบ RFC และ bounded context แทนการเขียน spec แยกตามฟีเจอร์
date: 2026-09-28
updated: 2026-11-08
description: การพัฒนาโดยยึดข้อกำหนดโดยไม่ให้ spec ล้นเกิน: เก็บ spec ไว้ในพจนานุกรม aggregate เดียว จะได้ไม่เพิ่มตามทุกฟีเจอร์ ครอบคลุมระดับข้อกำหนด การ์ด aggregate และขอบเขตของ context
tags: AI, การพัฒนาโดยยึดข้อกำหนด, spec, DDD, เอเจนต์
category: specs
layout: wide
image: /og/specs-by-aggregates.en.png
mentions: RFC 2119, Domain-Driven Design, OpenSpec, Spec-Driven Development
toc: growth=ทำไม spec จึงพอกพูน | rfc=ระดับตาม RFC | card=การ์ด aggregate | contexts=Context | faq=คำถาม | next=อ่านต่อ
---

ข้อกำหนดแบ่งตาม aggregate คือการมีหนึ่งรายการต่อหนึ่งแนวคิดของโดเมน เช่น การจองหรือออเดอร์ แทนการเขียน spec แยกสำหรับแต่ละฟีเจอร์ ฟีเจอร์เพียงเพิ่มข้อกำหนดลงในรายการที่ถูกต้อง ไฟล์จึงไม่เพิ่มตามทุกงาน และแนวคิดเดียวไม่กระจัดกระจายตาม spec ต่าง ๆ ข้อกำหนดใช้ระดับตาม RFC: MUST ตรวจด้วยเทสต์ SHOULD ตรวจตอนรีวิว ด้านล่างคือการ์ด aggregate และขอบเขตของ context

<b-post series="agg">
<b-hchain label="สายโซ่: bounded context, aggregate, invariant ระดับ MUST, การตรวจสอบ">
  <step icon="workflow" sw="1.8" t="Context">booking</step>
  <step icon="cube" t="Aggregate">Reservation</step>
  <step icon="list-check" sw="1.8" t="Invariant">MUST</step>
  <step icon="flask" t="ตรวจสอบ">เทสต์</step>
</b-hchain>
<b-chapter id="growth" title="ทำไม spec จึงพอกพูน" icon="bar-chart-rise">
  <b-spec-growth>
    <b-growth-panel icon="file" t="Spec ต่อฟีเจอร์" sub="แนวคิดหนึ่งถูกอธิบายในทุกฟีเจอร์" files="101101010110" n="12 ไฟล์" note="“Booking” อยู่ใน 7 ไฟล์" chip="โตตามฟีเจอร์"></b-growth-panel>
    <b-growth-panel good icon="cube" t="พจนานุกรม aggregate" sub="แนวคิดหนึ่งอธิบายครั้งเดียว" n="4 รายการ" note="“Booking” อยู่ใน 1 รายการ" chip="โตตามโดเมน">
      <agg dots="5">Reservation</agg>
      <agg dots="3">Room</agg>
      <agg dots="2">TimeSlot</agg>
      <agg dots="2">Member</agg>
    </b-growth-panel>
    <step>ฟีเจอร์ที่ 13</step>
    <step em="+1 MUST">[booking::Reservation]</step>
    <step em="+1">เทสต์</step>
  </b-spec-growth>
  <b-cap>ตัวเลขเป็นตัวอย่างประกอบ วิธีที่ <a href="https://github.com/Fission-AI/OpenSpec" target="_blank" rel="noopener">OpenSpec</a> จัดวาง spec และการเปลี่ยนแปลง: โฟลเดอร์ specs/ และ changes/ ส่วนการเปลี่ยนแปลงที่เสร็จแล้วจะย้ายไปคลังเก็บถาวร</b-cap>
  <b-finding>
    <ex>สิบสองฟีเจอร์ให้ spec สิบสองฉบับ และการจองถูกอธิบายอยู่ในเจ็ดฉบับ ซึ่งแต่ละฉบับต่างกันเล็กน้อย ในพจนานุกรม ฟีเจอร์ชุดเดียวกันเพียงเพิ่มบรรทัดลงในสี่รายการของ aggregate</ex>
    <gen>เมื่อ spec ผูกกับการเปลี่ยนแปลงหรือฟีเจอร์ ทุกงานจะเพิ่มไฟล์ และแนวคิดเดียวกระจัดกระจายไปหลายที่ เมื่อหน่วยคือ aggregate จำนวนรายการถูกจำกัดโดยโดเมนเอง และฟีเจอร์เพียงเพิ่มข้อกำหนดลงในรายการ</gen>
    <do>ไล่หาแนวคิดที่ปรากฏใน spec สามฉบับขึ้นไป แล้วให้แต่ละแนวคิดมีรายการเดียวในพจนานุกรม ให้ spec ของฟีเจอร์ลิงก์ไปที่รายการนั้น แทนการเล่าซ้ำ</do>
  </b-finding>
</b-chapter>
<b-chapter id="rfc" title="ระดับข้อกำหนดตาม RFC 2119" icon="list-check">
  <b-rfc-levels cols="คำ | ความหมาย | ความเข้ม | การตรวจ">
    <level k="MUST" s="5" w="100" check="test" t="เทสต์อัตโนมัติ" note="บล็อก">จำเป็นต้องมี</level>
    <level k="MUST NOT" s="5" w="100" check="test" t="เทสต์อัตโนมัติ" note="บล็อก">ห้าม</level>
    <level k="SHOULD" s="3" w="60" check="review" t="รีวิว" note="เตือน">ค่าเริ่มต้น เบี่ยงได้เมื่อมีเหตุผล</level>
    <level k="MAY" s="1" w="20" check="none" t="ไม่มี" note="ไม่ตรวจ">อนุญาต</level>
    <syn>MUST = SHALL</syn>
  </b-rfc-levels>
  <b-cap>คำและความหมายอ้างอิง <a href="https://www.rfc-editor.org/rfc/rfc2119" target="_blank" rel="noopener">RFC 2119</a> แต่ละคำสอดคล้องกับการตรวจแบบของตัวเอง</b-cap>
  <b-finding>
    <ex>ในรายการการจอง "ช่วงเวลาต้องไม่ทับกัน" เป็น MUST ที่ตรวจด้วยเทสต์ ส่วน "การยืนยันส่งไปช่องทางเดียวกัน" เป็น SHOULD ที่ดูตอนรีวิว</ex>
    <gen>คำที่ใช้กำกับข้อกำหนดบอกทันทีว่าจะตรวจอย่างไรและต้องทำอะไรเมื่อฝ่าฝืน เอเจนต์อ่าน MUST เป็นขอบเขต และ SHOULD เป็นค่าเริ่มต้น และไม่สับสนสองอย่างนี้</gen>
    <do>เขียนข้อกำหนดใน spec ใหม่ด้วยสี่คำนี้ และวางเทสต์ที่ตรวจไว้ข้างทุก MUST</do>
  </b-finding>
</b-chapter>
<b-chapter id="card" title="การ์ด aggregate" icon="card-lines">
  <b-aggregate-card label="ตัวอย่างรายการของ aggregate Reservation ใน context การจอง: ที่อยู่ invariant คำสั่ง สิทธิ์ ลิงก์ และ spec ของฟีเจอร์">
    <field icon="id-card" t="ที่อยู่: context::ชื่อ">## [booking::Reservation]&#10;Class: aggregate&#10;Description: A meeting room booked for an interval.</field>
    <field icon="list-check" sw="1.8" t="ข้อกำหนด → การตรวจ">Invariants:&#10;  - MUST: active bookings of a room never overlap&#10;  - MUST: held → confirmed → closed, forward only&#10;  - MUST: held unconfirmed for 15 min → closed&#10;  - SHOULD: confirm in the channel it was made in</field>
    <field icon="play" t="ทางเดียวที่เปลี่ยนได้">Commands: HoldRoom, ConfirmReservation,&#10;          CancelReservation</field>
    <field icon="user" t="ใครทำได้">Access:&#10;  CanHoldRoom: [booking::Role::Member]&#10;  CanCancelReservation: Member (own), Admin</field>
    <field icon="link" t="ลิงก์ด้วย id">Depends on: [[booking::Room]], [[booking::TimeSlot]]</field>
    <field icon="file" t="มาจากฟีเจอร์ไหน">Spec: [[room-booking]]</field>
  </b-aggregate-card>
  <b-cap>ตัวอย่างนี้สมมติขึ้น ศัพท์อ้างอิง <a href="https://martinfowler.com/bliki/DDD_Aggregate.html" target="_blank" rel="noopener">Martin Fowler: DDD Aggregate</a></b-cap>
  <b-finding>
    <ex>การจองทั้งหมดอยู่ในการ์ดใบเดียว: ที่อยู่ ข้อกำหนดสี่ข้อ คำสั่งสามคำสั่ง สิทธิ์ ลิงก์ และฟีเจอร์ต้นทาง</ex>
    <gen>aggregate คือขอบเขตที่ข้อกำหนดเป็นจริงเสมอภายใน และเปลี่ยนได้ผ่านคำสั่งของตัวเองเท่านั้น การ์ดจึงวางกฎไว้ข้างทางเดียวที่จะทำให้กฎเสียหายได้</gen>
    <do>ทำการ์ดหกช่องให้ทุก aggregate หากข้อกำหนดข้อใดไม่เข้ากับ aggregate ใดเลย มักแปลว่ายังไม่ได้ตั้งชื่อ aggregate นั้น</do>
  </b-finding>
</b-chapter>
<b-chapter id="contexts" title="Bounded context" icon="workflow">
  <b-ctx-map>
    <ctx name="booking">Reservation, Room, TimeSlot</ctx>
    <ctx name="billing">Invoice, Tariff</ctx>
    <ctx name="access">Pass, Level</ctx>
  </b-ctx-map>
  <b-ctx-links t="ลิงก์ระหว่าง context ใช้ id เท่านั้น">
    <ref from="billing::Invoice" to="booking::Reservation"/>
    <ref from="access::Pass" to="booking::Reservation"/>
  </b-ctx-links>
  <b-ctx-clash word="“Level”" note="คำเดียว สองศัพท์ ป้ายต่างกัน">
    <sense code="booking::Room.floor">ชั้น</sense>
    <sense code="access::Level">ระดับสิทธิ์</sense>
  </b-ctx-clash>
  <b-ctx-rules>
    <rule icon="id-card">หนึ่งศัพท์ = หนึ่งรายการ</rule>
    <rule icon="link">ลิงก์ในรูป [[ctx::Name]]</rule>
    <rule icon="fork">คำเดียวกัน → แยกรายการ</rule>
    <rule icon="cycle">พจนานุกรมเปลี่ยนไปพร้อมกับ spec</rule>
  </b-ctx-rules>
  <b-cap>แนวทางนี้คือ <a href="https://martinfowler.com/bliki/BoundedContext.html" target="_blank" rel="noopener">Bounded Context</a> และ <a href="https://martinfowler.com/bliki/UbiquitousLanguage.html" target="_blank" rel="noopener">Ubiquitous Language</a></b-cap>
  <b-finding>
    <ex>ใบแจ้งหนี้และบัตรผ่านอ้างถึงการจองด้วย id และไม่รู้อะไรเกี่ยวกับภายในของมัน "Level" หมายถึงชั้นใน booking และระดับสิทธิ์ใน access ซึ่งเป็นสองรายการแยกกัน</ex>
    <gen>context คือพื้นที่ที่ทุกคำมีความหมายเดียว เมื่อคำหนึ่งปรากฏในสอง context ให้สร้างสองศัพท์ที่มีป้ายต่างกัน มิฉะนั้นเอเจนต์จะเอากฎจากที่หนึ่งไปใช้กับอีกที่หนึ่ง</gen>
    <do>จัด aggregate ของคุณเข้า context แล้วหาคำที่ปรากฏในสอง context ให้แต่ละคำมีรายการแยกกันและป้ายต่างกันในหน้าจอ</do>
  </b-finding>
</b-chapter>
<b-chapter id="faq" icon="chat" title="คำถามที่พบบ่อย">
  <b-faq-cards>
    <q t="ทำไม spec จึงเพิ่มจำนวนเรื่อย ๆ?">ถ้า spec ผูกกับฟีเจอร์ ไฟล์จะเพิ่มตามทุกงาน และแนวคิดเดียวกระจัดกระจายไปหลายที่</q>
    <q t="spec แบบแบ่งตาม aggregate คืออะไร?">หนึ่งรายการต่อหนึ่งแนวคิดของโดเมน เช่น การจอง ฟีเจอร์เพียงเพิ่มข้อกำหนดลงในรายการนั้น</q>
    <q t="ทำไมต้องมีระดับ MUST และ SHOULD?">คำบอกวิธีตรวจข้อกำหนด: MUST ตรวจด้วยเทสต์ SHOULD ตรวจตอนรีวิว เอเจนต์อ่าน MUST เป็นขีดจำกัดที่เด็ดขาด</q>
    <q t="ถ้าคำหนึ่งมีความหมายต่างกันในสอง context ต้องทำอย่างไร?">สร้างสองศัพท์ที่มีป้ายต่างกัน มิฉะนั้นเอเจนต์จะเอากฎจาก context หนึ่งไปใช้กับอีก context หนึ่ง</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="อ่านต่อ">
  <b-cta href="/blog/spec-reconcile-loop/" k="ภาคต่อ" t="วงจร reconcile สำหรับ spec" icon="hub" sw="1.6">เหมือน Kubernetes: สถานะที่ต้องการ การตรวจสอบ และสภาพแวดล้อมของเอเจนต์</b-cta>
  <b-links cols="3">
    <item href="/blog/harness-driven-development/" k="วงจรความผิดพลาด" t="Harness-Driven Development">ความผิดพลาดของเอเจนต์กลายเป็นกฎได้อย่างไร</item>
    <item href="/blog/specs-rules-skills/" k="บริบท" t="Spec, bible, rule และ skill">เอเจนต์รู้อะไรเกี่ยวกับโปรเจกต์และความรู้นั้นอยู่ที่ไหน</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="สภาพแวดล้อม" t="เปรียบเทียบ harness">เอเจนต์ทำงานที่ไหนและเห็นอะไร</item>
    <item href="/blog/agent-checkpoint/" k="ตรวจสอบ" t="ตรวจงานของเอเจนต์ AI ตรงไหน">aggregate เป็นจุดตรวจ</item>
  </b-links>
</b-chapter>
<b-footer compact>ตัวอย่างการจองสมมติขึ้น ศัพท์และแนวทางอ้างอิงแหล่งที่มาที่ลิงก์ไว้ใต้แผนภาพ</b-footer>
</b-post>
