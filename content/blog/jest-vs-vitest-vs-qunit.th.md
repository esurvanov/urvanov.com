---
title: Vitest vs Jest: เลือกตัวไหนสำหรับโปรเจกต์ JavaScript และเมื่อไรที่ QUnit ก็พอ
date: 2026-10-25
updated: 2026-11-08
description: Vitest vs Jest: การตั้งค่า ที่ที่การทดสอบรัน และวิธีเขียนการตรวจ เมื่อไรควรเลือก Vitest บน Vite เก็บ Jest ไว้ หรือใช้ QUnit ในเบราว์เซอร์ พร้อมตารางและคำถามที่พบบ่อย
tags: AI, การทดสอบ, JavaScript, Jest, Vitest, QUnit, Vite, Jest vs Vitest, ระบบทดสอบอัตโนมัติ
category: specs
layout: wide
mentions: Jest, Vitest, QUnit, Vite, Node.js, JavaScript, Jest vs Vitest, automated tests, test framework, snapshots, mocks, code coverage
toc: common=สิ่งที่เหมือนกัน | vite=Jest และ Vitest | qunit=QUnit | table=ใครมีอะไร | choose=เลือกอะไร | faq=คำถามที่พบบ่อย | next=อ่านเพิ่มเติม
---

Vitest vs Jest: โปรเจกต์ที่สร้างด้วย Vite ให้เลือก Vitest เพราะใช้การตั้งค่าเดียวกัน และถ้า Jest ใช้งานได้อยู่แล้วก็เก็บไว้ QUnit พอเมื่อต้องรันการทดสอบในเบราว์เซอร์โดยตรงโดยแทบไม่ต้องตั้งค่าอะไร ทั้งสามรันการทดสอบอัตโนมัติของ JavaScript และต่างกันที่ว่าอยู่ตรงไหนและต้องตั้งค่ามากแค่ไหน

บทความนี้เกิดจากอีกบทความหนึ่ง คือเรื่อง[แบบจำลองเชิงรูปนัยใน Quint](/blog/quint-models-find-races/)และการตรวจสอบเชิงรูปนัย ชื่อ QUnit กับ Quint คล้ายกันและสับสนง่าย จึงเขียนเรื่องเฟรมเวิร์กทดสอบแยกต่างหากด้วย Quint ต่างจากเฟรมเวิร์กเหล่านี้อย่างไร อยู่ใน[การเปรียบเทียบ Quint กับการทดสอบและ TLA+](/blog/quint-vs-tests-and-tla/)

<b-post series="harness">
<b-art names="jest-vs-vitest-vs-qunit/common" wide/>

<b-chapter id="common" icon="flask" title="สิ่งที่ Jest, Vitest และ QUnit เหมือนกัน">
  <b-why align="left">สมมติมีฟังก์ชันที่บวกเลขสองตัว การทดสอบบันทึกสิ่งที่คาดไว้ คือหนึ่งกับสองได้สาม เฟรมเวิร์กรันฟังก์ชัน เทียบคำตอบกับที่คาดไว้ และรายงานว่าการตรวจผ่านหรือไม่ผ่าน โปรเจกต์มีการทดสอบหลายร้อยรายการ จึงรันอัตโนมัติหลังการแก้ไขทุกครั้ง ถ้าการแก้ทำให้สิ่งที่เคยใช้ได้พัง การทดสอบจะล้มและเห็นทันที ทั้งสามเฟรมเวิร์กทำสิ่งนี้กับโค้ด [JavaScript](/materials/glossary/javascript/) คือรัน[ระบบทดสอบอัตโนมัติ](/materials/glossary/automated-test/)</b-why>
  <b-why align="left">สามคำจะปรากฏในคำอธิบายเฟรมเวิร์ก **snapshot** คือผลลัพธ์ใหญ่ที่บันทึกไว้เป็นต้นแบบ เช่นมาร์กอัปสำเร็จรูปของหน้า ใช้เทียบกับผลลัพธ์ใหม่ **mock** คือการแทนที่โค้ดจริงชั่วคราวด้วยตัวหลอก เช่นการส่งอีเมลจริง เพื่อไม่ให้การทดสอบออกไปข้างนอก **Coverage** คือรายงานว่าบรรทัดโค้ดใดถูกการทดสอบรันอย่างน้อยหนึ่งครั้ง การเลือกระหว่างเฟรมเวิร์กจึงแทบไม่ได้ตัดสินว่าโปรเจกต์มีการทดสอบหรือไม่ แต่ตัดสินว่าต้องตั้งค่ามากแค่ไหนและการทดสอบรันที่ไหน</b-why>
  <b-finding>
    <ex>Jest, Vitest และ QUnit ตอบคำถามเดียวกัน คือฟังก์ชันที่เสร็จแล้วให้คำตอบถูกสำหรับอินพุตที่กำหนดหรือไม่</ex>
    <gen>ไม่ได้ตรวจกฎของระบบหรือลำดับของเหตุการณ์ สำหรับเรื่องนั้นต้องใช้แบบจำลองอย่าง [Quint](/materials/glossary/quint/)</gen>
    <do>จดไว้ว่าต้องการตรวจอะไร ฟังก์ชันกับอินพุตที่กำหนด หรือกฎที่ข้ามหลายฟังก์ชัน</do>
  </b-finding>
</b-chapter>

<b-chapter id="vite" icon="swap" title="Jest หรือ Vitest: ต้องแก้กี่ที่เพื่อตั้งค่า">
  <b-art names="jest-vs-vitest-vs-qunit/vite" wide/>
    <b-why align="left">[Jest](/materials/glossary/jest/) มุ่งให้ใช้ได้โดยไม่ต้องตั้งค่ากับโปรเจกต์ JavaScript ส่วนใหญ่<b-proof href="https://jestjs.io/" quote="Jest aims to work out of the box, config free, on most JavaScript projects."/> เข้าใจโปรเจกต์บน Babel, TypeScript, React, Angular และ Vue มี snapshot และ mock ในตัว และเปิด code coverage ด้วยแฟลกเดียว `--coverage` โดยไม่ต้องตั้งค่าเพิ่ม รันการทดสอบแบบขนาน แต่ละรายการในโปรเซสของตัวเองเพื่อไม่ให้กระทบกัน และเอาที่ล้มเหลวครั้งก่อนขึ้นก่อน<b-proof href="https://jestjs.io/" quote="Jest runs previously failed tests first"/> รูปแบบการตรวจคุ้นเคย: `test` อธิบายกรณี `expect` เทียบคำตอบ</b-why>
  <b-why align="left">[Vitest](/materials/glossary/vitest/) ทำเกือบเหมือนกัน แต่สร้างบนตัวรวมโค้ด [Vite](/materials/glossary/vite/)<b-proof href="https://vitest.dev/guide/" quote="a next generation testing framework powered by Vite"/> ถ้าเว็บไซต์สร้างด้วย Vite อยู่แล้ว Vitest ใช้การตั้งค่าและปลั๊กอินเดียวกัน ขณะที่ Jest ต้องมีการตั้งค่าที่สองแยกต่างหาก ผู้สร้าง Vitest เรียกสิ่งนี้ว่าความซับซ้อนซ้ำซ้อน<b-proof href="https://vitest.dev/guide/comparisons" quote="two different pipelines to configure and maintain"/> ความเข้ากันได้กับ Jest สูง Vitest รองรับอินเทอร์เฟซของ Jest และไลบรารีส่วนใหญ่<b-proof href="https://vitest.dev/guide/comparisons" quote="compatibility with most of the Jest API and ecosystem libraries"/> ในโปรเจกต์ส่วนใหญ่จึงใช้แทนได้</b-why>
  <b-why align="left">Vitest ยังมีโหมด watch ที่เร็ว เมื่อแก้ไฟล์ การทดสอบรันซ้ำทันทีบน hot module replacement เดียวกับใน Vite เอง<b-proof href="https://vitest.dev/guide/comparisons" quote="default watch mode using Vite instant Hot Module Reload"/> เอกสารยังระบุโหมดที่รันการทดสอบในเบราว์เซอร์จริงและเว็บอินเทอร์เฟซแสดงผล แต่มีข้อแลกเปลี่ยนอย่างหนึ่ง คือต้องใช้ Vite และ [Node.js](/materials/glossary/node-js/) ที่ค่อนข้างใหม่ และเอกสารปัจจุบันระบุ Vite 6.4 และ Node 22.12<b-proof href="https://vitest.dev/guide/" quote="Vitest requires Vite >=v6.4.0 and Node >=v22.12.0"/></b-why>
  <b-finding>
    <ex>บนโปรเจกต์ Vite Vitest ประหยัดการตั้งค่าที่สอง ส่วนบนโปรเจกต์ที่ไม่มี Vite ความต่างจาก Jest เล็กน้อย</ex>
    <gen>ถ้า Jest ใช้งานได้อยู่แล้วและไม่รบกวนใคร การย้ายเพียงเพื่อย้ายมักไม่คุ้ม</gen>
    <do>ดูว่าเว็บไซต์ของคุณสร้างอย่างไร ถ้าเป็น Vite ลอง Vitest กับหนึ่งโมดูล</do>
  </b-finding>
</b-chapter>

<b-chapter id="qunit" icon="workflow" title="QUnit: เมื่อต้องการการทดสอบในเบราว์เซอร์โดยตรง">
  <b-art names="jest-vs-vitest-vs-qunit/qunit-env" wide/>
    <b-why align="left">[QUnit](/materials/glossary/qunit/) อธิบายตัวเองว่าเป็นเฟรมเวิร์กทดสอบที่ทรงพลังและใช้ง่าย ไม่ต้องตั้งค่าสำหรับ Node.js และการตั้งค่าขั้นต่ำก็พอสำหรับเบราว์เซอร์<b-proof href="https://qunitjs.com/" quote="Zero configuration and setup for any Node.js project"/> รันได้ทุกที่ที่มี JavaScript คือในเบราว์เซอร์ ใน Node.js ในเอนจิน SpiderMonkey และใน thread เบื้องหลังของหน้า<b-proof href="https://qunitjs.com/" quote="QUnit can run anywhere; web browsers, Node, SpiderMonkey, even in a Web Worker!"/> Jest และ Vitest ต่างจากมัน ส่วนใหญ่รันใน Node.js</b-why>
  <b-why align="left">รูปแบบของมันเป็นของตัวเอง การทดสอบที่เกี่ยวข้องกันจัดกลุ่มด้วย `QUnit.module` การทดสอบหนึ่งรายการอธิบายด้วย `QUnit.test` และเทียบคำตอบผ่าน `assert` สำหรับการทดสอบที่แตะหน้าเว็บ มี fixture ที่คืนหน้ากลับสู่สภาพเดิมหลังทุกการทดสอบ และมีการตรวจลำดับการเรียกแยกต่างหากสำหรับเหตุการณ์และคำตอบที่ล่าช้า ขยาย QUnit ตามต้องการได้ ทั้ง assertion ตัวรัน และรายงานของตัวเอง ยังรองรับเบราว์เซอร์เก่า เวอร์ชัน 2 ทำงานกับ Internet Explorer 9 ขึ้นไป<b-proof href="https://qunitjs.com/intro/" quote="QUnit supports the following runtime environments"/></b-why>
  <b-finding>
    <ex>QUnit เหมาะที่การทดสอบต้องรันในเบราว์เซอร์โดยตรงและไม่มีขั้นตอน build</ex>
    <gen>สำหรับโปรเจกต์สมัยใหม่ที่มี build และต้องการ mock, snapshot และ coverage พร้อมใช้ มักเลือก Jest หรือ Vitest</gen>
    <do>ถ้าการทดสอบต้องเปิดในเบราว์เซอร์เหมือนหน้าเว็บธรรมดา ตรวจ QUnit ก่อน</do>
  </b-finding>
</b-chapter>

<b-chapter id="table" icon="scales" title="ใครมีอะไร: Jest, Vitest และ QUnit ทีละประเด็น">
<b-table id="jvq">

| | Jest | Vitest | QUnit |
|---|---|---|---|
| **แนวคิด** | เฟรมเวิร์กแบบทั่วไปที่มีครบชุด: snapshot, mock, coverage | เฟรมเวิร์กรุ่นใหม่ที่สร้างบน Vite | เฟรมเวิร์กเรียบง่ายที่รันได้ทุกที่ |
| **การตั้งค่า** | การตั้งค่าของตัวเอง | เหมือนของ Vite | แทบไม่มี |
| **รันที่ไหน** | ส่วนใหญ่ใน Node.js | ส่วนใหญ่ใน Node.js | เบราว์เซอร์ Node.js สภาพแวดล้อมอื่น |
| **เขียนการตรวจอย่างไร** | `test` และ `expect` | `test` และ `expect` เหมือน Jest | `QUnit.test` และ `assert` |
| **เหมาะเมื่อ** | มี Jest อยู่แล้วและใช้งานได้ | โปรเจกต์สร้างด้วย Vite | ต้องการการทดสอบในเบราว์เซอร์โดยไม่มี build |

</b-table>
  <b-why align="left">อ่านตารางทีละแถว “แนวคิด” บอกว่าเฟรมเวิร์กเกิดมาทำไม “การตั้งค่า” แสดงว่ามีงานให้ทำเท่าไรก่อนการทดสอบแรก “รันที่ไหน” และ “เขียนการตรวจอย่างไร” สำคัญถ้ามีการทดสอบสำเร็จรูปจำนวนมาก รูปแบบของ Jest และ Vitest ตรงกัน การย้ายระหว่างกันจึงง่าย ส่วนบน QUnit ต้องเขียนการตรวจใหม่</b-why>
</b-chapter>

<b-chapter id="choose" icon="target" title="เลือกอะไร: Jest, Vitest หรือ QUnit">
  <b-art names="jest-vs-vitest-vs-qunit/choose" wide/>
  <b-why align="left">โปรเจกต์เป็นตัวกำหนดทางเลือก โปรเจกต์สร้างด้วย Vite: เลือก Vitest เพราะการตั้งค่ามีอยู่แล้ว มี Jest ในโปรเจกต์แล้วและทุกอย่างใช้ได้: เก็บไว้ ต้องการการตรวจในเบราว์เซอร์โดยไม่มี build: เลือก QUnit การย้ายระหว่าง Jest กับ Vitest มักไม่แพง การเลือกผิดจึงไม่ใช่เรื่องย้อนกลับไม่ได้ ถ้าต้องตรวจกฎและลำดับของเหตุการณ์แทนฟังก์ชัน ดูบทความ [Quint vs QUnit และ TLA+](/blog/quint-vs-tests-and-tla/) และ[เรื่องแบบจำลอง Quint](/blog/quint-models-find-races/)</b-why>
  <b-finding>
    <ex>สามเฟรมเวิร์กปิดงานเดียวกัน และสภาพแวดล้อมเป็นผู้ตัดสิน ตัวรวมโค้ด เบราว์เซอร์ หรือชุดการทดสอบที่มีอยู่</ex>
    <gen>ไม่ว่าจะเลือกอะไร การทดสอบตรวจสถานการณ์ที่กำหนด ส่วนกฎที่พังในลำดับเหตุการณ์พิเศษ แบบจำลองจะจับได้</gen>
    <do>เลือกเฟรมเวิร์กตามสภาพแวดล้อมของโปรเจกต์ และเพิ่มการตรวจตัวการทดสอบเอง: [mutation testing](/materials/glossary/mutation-testing/) แสดงว่าการทดสอบสังเกตเห็นข้อบกพร่องหรือไม่</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="คำถามที่พบบ่อย">
  <b-faq-cards>
    <q t="ควรเลือก Jest หรือ Vitest">บนโปรเจกต์ที่สร้างด้วย Vite เลือก Vitest ใช้การตั้งค่าเดียวกัน จึงไม่ต้องมีการตั้งค่าที่สอง ถ้า Jest ใช้งานได้อยู่แล้วและไม่รบกวนใคร การย้ายมักไม่คุ้ม</q>
    <q t="Vitest ต่างจาก Jest อย่างไร">Vitest สร้างบน Vite รองรับอินเทอร์เฟซของ Jest ส่วนใหญ่ และรีสตาร์ทการทดสอบเร็วเมื่อไฟล์เปลี่ยน ต้องใช้ Vite และ Node.js ที่ค่อนข้างใหม่</q>
    <q t="เมื่อไรต้องใช้ QUnit">เมื่อการทดสอบต้องรันในเบราว์เซอร์โดยตรงโดยไม่มีขั้นตอน build QUnit รันในเบราว์เซอร์ ใน Node.js และในสภาพแวดล้อม JavaScript อื่น และไม่ต้องตั้งค่าสำหรับ Node.js</q>
    <q t="ย้ายจาก Jest ไป Vitest ยากไหม">โดยปกติไม่ยาก ทั้งสองเขียนการตรวจด้วย `test` และ `expect` การย้ายระหว่างกันจึงง่าย การย้ายไป QUnit หมายถึงเขียนการตรวจใหม่</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="อ่านเพิ่มเติม">
  <b-links>
    <item href="/blog/quint-vs-tests-and-tla/" k="เปรียบเทียบ" t="การตรวจสอบแบบจำลองกับการทดสอบ: Quint, QUnit, TLA+">Quint ต่างจาก QUnit, Jest และ TLA+ อย่างไร</item>
  <item href="/blog/quint-models-find-races/" k="แบบจำลอง" t="หา race condition และข้อมูลที่หายไปอย่างไร">แบบจำลอง Quint เชิงรูปนัยสำหรับกฎและลำดับของเหตุการณ์</item>
  <item href="/blog/tla-alloy-quint-compare/" k="เปรียบเทียบ" t="TLA+, Alloy หรือ Quint">ภาษาข้อกำหนดเคียงข้างเฟรมเวิร์กทดสอบ</item>
  </b-links>
</b-chapter>
<b-footer>ข้อมูล: เว็บไซต์ทางการของ Jest, Vitest และ QUnit ณ วันที่ 25 ตุลาคม 2026 การเลือกขึ้นกับโปรเจกต์ของคุณ ที่นี่อธิบายสัญญาณทั่วไป</b-footer>
</b-post>
