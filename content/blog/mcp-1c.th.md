---
title: MCP server และเอเจนต์ AI สำหรับ 1C: ให้ Claude Code, Codex หรือ Cursor เข้าถึงฐานข้อมูลอย่างไรโดยไม่ทำให้พัง
date: 2026-10-12
updated: 2026-11-08
description: MCP server สำหรับ 1C:Enterprise ให้เอเจนต์ AI (Claude Code, Codex หรือ Cursor) เข้าถึงโค้ดของ configuration และข้อมูลในฐานข้อมูล เชื่อมต่อใน 3 ขั้น อะไรพังในทางปฏิบัติ แยกการอ่านออกจากการเขียนและตรวจผลอย่างไร
tags: AI, เอเจนต์, MCP, 1C, สิทธิ์, ความปลอดภัย, Claude Code, Codex, Cursor
category: harness
layout: wide
mentions: Model Context Protocol, MCP, 1C:Enterprise, AI agent, Claude Code, Codex, Cursor, permissions, prompt injection
toc: what=คืออะไร | specifics=ข้อเฉพาะของ 1C | breaks=พังตรงไหน | servers=เซิร์ฟเวอร์ | cases=อะไรพัง | scheme=แผนผัง | rights=สิทธิ์ | check=การตรวจ | agents=เอเจนต์ | start=เริ่มที่ไหน | faq=คำถามที่พบบ่อย | next=อ่านต่อ
---

หากต้องการให้ Claude Code, Codex หรือ Cursor เข้าถึงฐานข้อมูล 1C โดยไม่ทำให้พัง ให้เชื่อมต่อเอเจนต์ AI (AI agent) ผ่าน MCP server สำหรับ 1C ซึ่งเป็นสะพานไปยังโค้ดของ configuration และข้อมูลในฐานข้อมูล แล้วแยกสิทธิ์การเข้าถึง เอเจนต์อ่านฐานข้อมูลจริงได้อย่างเดียวภายใต้ผู้ใช้ที่ไม่มีสิทธิ์เขียน ทำการแก้ไขในสำเนาทดสอบ และคนเป็นผู้ย้ายการเปลี่ยนแปลงขึ้นระบบจริงผ่าน repository หลังรีวิว ด้านล่างเป็นเรื่องมีเซิร์ฟเวอร์อะไรบ้าง อะไรพังในทางปฏิบัติ บันไดสิทธิ์ และวิธีตรวจผล ส่วน MCP ทำงานอย่างไรโดยทั่วไปอยู่ใน [MCP สำหรับเอเจนต์ AI](/blog/mcp-agent-access/)

<b-post series="harness">
<b-chapter id="what" icon="plug" title="MCP server สำหรับ 1C คืออะไร">
<b-why align="left"><a href="/materials/glossary/mcp/">MCP</a> เป็นปลั๊กมาตรฐานระหว่างเอเจนต์กับระบบ สำหรับ 1C คือ <a href="/materials/glossary/mcp-server/">MCP server</a> ที่ให้เอเจนต์เข้าถึงโค้ดและเมทาดาทาของ configuration ข้อมูลในฐานข้อมูล วิธีใช้งานแพลตฟอร์ม หรือการตรวจสอบ เซิร์ฟเวอร์หลายตัวรวมหลายอย่างไว้ด้วยกัน ทำงานแบบเดียวกับระบบอื่น 1C เป็น<a href="/blog/mcp-agent-access/#ours">บริบทอื่น</a>อีกอย่างหนึ่ง เช่นเดียวกับ Jira หรือ GitLab ใช้ปลั๊กเดียวกันและเอเจนต์ตัวเดียวกัน ส่วนที่เฉพาะของ 1C มีเพียงวิธีที่เซิร์ฟเวอร์เข้าถึง 1C คือผ่านการ export, 1C IDE, ส่วนขยายของ configuration หรือ external data processor</b-why>
<b-lane title="MCP server ให้อะไร" color="accent">
<b-scene names="mcp-1c/servers"/>
</b-lane>
<b-table-plain>
<table><thead><tr><th></th><th>โค้ดและเมทาดาทา</th><th>ข้อมูลในฐานข้อมูล</th></tr></thead><tbody><tr><td>เอเจนต์เห็นอะไร</td><td>โมดูล เมทาดาทา ฟอร์ม</td><td>ไดเรกทอรี เอกสาร รีจิสเตอร์ รายงาน</td></tr><tr><td>มาจากไหน</td><td>การ export configuration หรือ 1C:EDT</td><td>ฐานข้อมูล 1C ผ่านส่วนขยายของ configuration หรือ external data processor</td></tr><tr><td>ทำไม</td><td>เขียนโค้ดตาม configuration จริง แต่งเรื่องน้อยลง</td><td>ตอบด้วยตัวเลขจากฐานข้อมูล วิเคราะห์ข้อมูล</td></tr><tr><td>ความเสี่ยงหลัก</td><td><b-tag-inline kind="no">แก้ configuration ผิดตัว</b-tag-inline></td><td><b-tag-inline kind="no">เขียนลงระบบจริง ข้อมูลของคนอื่น</b-tag-inline></td></tr></tbody></table>
</b-table-plain>
<b-finding>
  <ex k="โค้ด">เอเจนต์เลิกแต่งเมธอดและแอตทริบิวต์ที่ไม่มีใน configuration</ex>
  <gen k="ข้อมูล">เอเจนต์ตอบจากฐานข้อมูล ซึ่งหมายความว่ามันแก้ฐานข้อมูลได้ด้วย ตรงนี้ต้องมีกฎการเข้าถึง</gen>
  <do k="ทำอย่างไร">เริ่มจากโค้ดเพราะปลอดภัยกว่า เปิดการเข้าถึงข้อมูลตามแผนผังด้านล่างเท่านั้น แม้เซิร์ฟเวอร์จะทำได้ทั้งสองอย่าง</do>
</b-finding>
</b-chapter>
<b-chapter id="specifics" icon="form" title="1C ต่างจากที่อื่นอย่างไรสำหรับเอเจนต์ AI">
<b-why align="left">Vibe coding ใน 1C ทำงานต่างจากภาษาทั่วไป โปรแกรมอยู่ในฐานข้อมูลและในตัวออกแบบแบบภาพ โค้ดเป็นเพียงส่วนหนึ่ง ไดอะแกรมแสดงเส้นทางของโปรแกรมจากคอมพิวเตอร์ของ<a href="/materials/glossary/ai-agent/">เอเจนต์ AI</a>ไปยังระบบจริงใน <a href="/materials/glossary/gitlab/">GitLab</a> และใน 1C</b-why>
<b-lane title="เส้นทางของโปรแกรม: ในเครื่อง ทดสอบ ระบบจริง" color="accent">
<b-scene names="mcp-1c/pipeline"/>
</b-lane>
<b-rules-fixed cols="3" top="12" sw="1.8">
  <rule icon="monitor-hm" t="ในเครื่อง">ใน GitLab <a href="/materials/glossary/ai-agent/">เอเจนต์</a>แก้ไฟล์และรันทดสอบได้ทันที ใน 1C มันแก้ dump และตรวจได้หลังโหลดเข้าฐานข้อมูล ในเครื่องหรือฐานทดสอบ เท่านั้น</rule>
  <rule icon="git-fork" t="เวอร์ชัน">ใน GitLab เวอร์ชันอยู่ใน git repository พร้อม<a href="/materials/glossary/checks/">การตรวจ</a> ใน 1C อยู่ใน configuration repository จะใช้ git ก็ได้แต่ไม่บังคับ</rule>
  <rule icon="cylinder-hm" t="ทดสอบและระบบจริง">ใน GitLab โปรแกรมกับข้อมูลแยกจากกัน ใน 1C แต่ละสภาพแวดล้อมมีฐานข้อมูลของตัวเองที่เก็บทั้งสองอย่าง การอัปเดตระบบจริงคือการอัปเดตฐานข้อมูลจริง</rule>
</b-rules-fixed>
</b-chapter>
<b-chapter id="breaks" icon="alert" title="เอเจนต์ AI พังตรงไหนใน 1C และทำไม">
<b-why align="left">เลือกตัวเลขเพื่อดูว่าอะไรพังและอะไรช่วยได้ ใต้ไดอะแกรมโดยตรง ข้อเฉพาะห้าข้อเป็นเรื่องที่พูดถึงมากที่สุดในแชตของนักพัฒนา 1C ข้อที่หกเป็นเรื่อง MCP</b-why>
<b-lane title="อะไรพังและที่ไหน" color="warn">
<b-scene names="mcp-1c/breaks"/>
<b-pick-tabs id="brk" tone="warn">
  <tab t="อ่อน 1C">
    <b-pick-cell k="ข้อเฉพาะ" t="โมเดลรู้ภาษา 1C และไลบรารีมาตรฐานไม่ดี"/>
    <b-pick-cell k="อะไรพัง" tone="warn">แต่งเมธอดขึ้นมาเอง ใช้ไวยากรณ์ SQL แทนภาษาคิวรีของ 1C</b-pick-cell>
    <b-pick-cell k="อะไรช่วย" tone="accent">วิธีใช้งานแพลตฟอร์มผ่าน MCP ตัวอย่าง 2–3 ชิ้นจาก configuration ของผู้ผลิตเอง</b-pick-cell>
  </tab>
  <tab t="ไฟล์ ≠ ฐานข้อมูล">
    <b-pick-cell k="ข้อเฉพาะ" t="แก้ไฟล์บริการเป็นข้อความไม่ได้"/>
    <b-pick-cell k="อะไรพัง" tone="warn">โปรเจกต์เบี่ยงจากฐานข้อมูล การโหลดค้างหลายชั่วโมง</b-pick-cell>
    <b-pick-cell k="อะไรช่วย" tone="accent">แก้เฉพาะผ่าน MCP server บล็อกการเขียนตรง</b-pick-cell>
  </tab>
  <tab t="ฟอร์มด้วยเมาส์">
    <b-pick-cell k="ข้อเฉพาะ" t="ฟอร์ม รายงาน และเลย์เอาต์พิมพ์สร้างด้วยเมาส์"/>
    <b-pick-cell k="อะไรพัง" tone="warn">เอเจนต์ไม่เชื่อมเหตุการณ์ ทิ้งรายงานว่าง เลย์เอาต์ไม่เปลี่ยน</b-pick-cell>
    <b-pick-cell k="อะไรช่วย" tone="accent">โครงสร้างทำด้วยมือ ให้เอเจนต์ทำเฉพาะโค้ด และตรวจด้วยสแนปช็อตของฟอร์ม</b-pick-cell>
  </tab>
  <tab t="โหลดช้า">
    <b-pick-cell k="ข้อเฉพาะ" t="ลูปตรวจสอบช้า"/>
    <b-pick-cell k="อะไรพัง" tone="warn">การอัปเดตฐานข้อมูลใช้เวลาหลายสิบนาที เอเจนต์หลุดและรายงานเร็วเกินไป</b-pick-cell>
    <b-pick-cell k="อะไรช่วย" tone="accent">อัปเดตเบื้องหลัง รันทดสอบบนเซิร์ฟเวอร์แยก</b-pick-cell>
  </tab>
  <tab t="ไม่ใช่ส่วนขยาย">
    <b-pick-cell k="ข้อเฉพาะ" t="configuration ของผู้ผลิตที่อยู่ภายใต้การสนับสนุน เปลี่ยนแปลงผ่านส่วนขยาย"/>
    <b-pick-cell k="อะไรพัง" tone="warn">เอเจนต์เขียนลง configuration หลัก ดึงออบเจกต์ที่ยืมมาเกินจำเป็น</b-pick-cell>
    <b-pick-cell k="อะไรช่วย" tone="accent">ระบุโปรเจกต์ส่วนขยายไว้ในกฎของเอเจนต์ และปิดโปรเจกต์หลัก</b-pick-cell>
  </tab>
  <tab t="ข้ามการทดสอบ">
    <b-pick-cell k="ข้อเฉพาะ" t="การเขียนลงระบบจริงผ่าน MCP"/>
    <b-pick-cell k="อะไรพัง" tone="warn">การแก้ข้ามที่เก็บและการทดสอบ แล้วลงไปในข้อมูลจริง</b-pick-cell>
    <b-pick-cell k="อะไรช่วย" tone="accent">ระบบจริงอ่านอย่างเดียว การเขียนไปที่ฐานข้อมูลทดสอบ</b-pick-cell>
  </tab>
</b-pick-tabs>
</b-lane>
<b-finding>
  <ex k="ความต่าง">ใน 1C เอเจนต์ต้องมีตัวกลาง คือ IDE วิธีใช้งาน และแพลตฟอร์มที่รันอยู่ ถ้าไม่มี มันจะแก้สิ่งที่มองไม่เห็น</ex>
  <gen k="ขนาด">configuration ของผู้ผลิตมีขนาดใหญ่ โมดูลละ 15–26 พันบรรทัด เอเจนต์ได้การค้นหา configuration และอ่านเฉพาะส่วนที่ต้องใช้</gen>
  <do k="ทำอย่างไร">เริ่มจากโค้ดและคิวรี ปล่อยฟอร์มกับรายงานให้คนทำ จนกว่าเอเจนต์จะแสดงผลที่คงที่</do>
</b-finding>
</b-chapter>
<b-chapter id="servers" icon="cylinder-alt" title="MCP server ฟรีสำหรับ 1C และ 1C:EDT">
<b-why align="left">มีเซิร์ฟเวอร์สำเร็จรูปมากมายและเปลี่ยนเร็ว ก่อนเชื่อมต่อตัวไหน ให้อ่านว่ารองรับการกระทำอะไร อ่านอย่างเดียว หรือเขียนได้ด้วย</b-why>
<b-source-rows wide>
  <row t="mcp-1c" note="โค้ดและข้อมูล" href="https://github.com/feenlace/mcp-1c" link="GitHub">โครงสร้าง configuration การค้นหาโค้ด วิธีใช้ภาษา และคิวรีข้อมูลแบบอ่านอย่างเดียว</row>
  <row t="1c_mcp" note="โค้ดและข้อมูล" href="https://github.com/vladimir-kharin/1c_mcp" link="GitHub">ชุดสำหรับสร้าง MCP server ของตัวเองภายใน 1C เป็นส่วนขยายของ configuration: configuration พร้อมใช้ทันที ข้อมูลผ่านเครื่องมือที่เขียนเอง</row>
  <row t="1c-mcp-toolkit" note="ข้อมูล" href="https://github.com/ROCTUP/1c-mcp-toolkit" link="GitHub">เชื่อมต่อกับฐานข้อมูลผ่าน external data processor โดยไม่เปลี่ยน configuration</row>
  <row t="EDT-MCP" note="โค้ด" href="https://github.com/DitriXNew/EDT-MCP" link="GitHub">ปลั๊กอินสำหรับ 1C:EDT: เอเจนต์ทำงานกับโปรเจกต์ผ่านเครื่องมือของ IDE</row>
  <row t="MCP:RSV Data" note="ข้อมูล" href="https://infostart.ru/1c/articles/2720241/" link="Infostart">ส่วนขยายสำหรับข้อมูลและเมทาดาทาของ configuration ใดก็ได้: อ่านอย่างเดียว และเห็นเฉพาะสิ่งที่ผู้ใช้ปัจจุบันเห็น</row>
  <row t="bsl-ai-toolkit" note="โค้ด" href="https://github.com/vgtitov/bsl-ai-toolkit" link="GitHub">กฎ skill และเซิร์ฟเวอร์ เพื่อให้เอเจนต์ทำงานจากโค้ดของคุณ</row>
  <row t="1c-mcp catalog" note="แคตตาล็อก" href="https://github.com/Untru/1c-mcp" link="GitHub">เซิร์ฟเวอร์แยกตามกลุ่ม: IDE ฐานข้อมูล โค้ด วิธีใช้งาน ทดสอบ</row>
  <row t="1C AI Dev Tools" note="แคตตาล็อก" href="https://aitools1c.dev" link="เว็บไซต์">แคตตาล็อกของเซิร์ฟเวอร์ skill และการเชื่อมต่อสำหรับพัฒนา 1C ด้วย AI</row>
</b-source-rows>
<b-finding>
  <ex k="การเลือก">โค้ดมาก่อน ข้อมูลเป็นขั้นที่สองแยกต่างหาก</ex>
  <gen k="การตรวจ">รายการเครื่องมือของเซิร์ฟเวอร์คือรายการสิ่งที่เอเจนต์จะทำกับฐานข้อมูลได้</gen>
  <do k="ทำอย่างไร">ลิสต์เครื่องมือของเซิร์ฟเวอร์ แล้วทำเครื่องหมายว่าตัวไหนเปลี่ยนข้อมูล</do>
</b-finding>
</b-chapter>
<b-chapter id="cases" icon="alert-alt" title="อะไรพังในทางปฏิบัติ">
<b-why align="left">แชตเปิดของนักพัฒนา 1C บรรยายกรณีที่คล้ายกัน เล่าใหม่ด้วยถ้อยคำเอง ไม่ระบุชื่อ นี่เป็นตัวอย่างจากทางปฏิบัติ ตรวจสอบแต่ละกรณีไม่ได้ เลือกกรณีหนึ่ง ไดอะแกรมแสดงว่าเกิดที่ไหน การ์ดแสดงว่าทำไมและป้องกันอย่างไร</b-why>
<b-lane title="กรณีจากทางปฏิบัติ" color="warn">
<b-scene names="mcp-1c/cases"/>
<b-pick-tabs id="cs" tone="warn">
  <tab t="ระบบจริง">
    <b-pick-cell k="เกิดอะไรขึ้น" t="ทำฐานข้อมูลจริงพัง">เอเจนต์ได้สิทธิ์เขียนลงระบบจริงเพื่อให้เร็วขึ้น การแก้ลงไปในบัญชีจริง และต้องย้อนกลับจากข้อมูลสำรอง</b-pick-cell>
    <b-pick-cell k="ทำไม" tone="warn">ไม่มีฐานข้อมูลทดสอบคั่นระหว่างเอเจนต์กับข้อมูลจริง การเขียนลงระบบจริงเปิดอยู่</b-pick-cell>
    <b-pick-cell k="การป้องกัน" tone="accent">ระบบจริงอ่านอย่างเดียว เอเจนต์เขียนลงฐานข้อมูลทดสอบ คนย้ายการเปลี่ยนแปลงหลังรีวิว</b-pick-cell>
  </tab>
  <tab t="ร้อยฐานข้อมูล">
    <b-pick-cell k="เกิดอะไรขึ้น" t="ลบรายการฐานข้อมูลร้อยฐาน">เอเจนต์จัดระเบียบเซิร์ฟเวอร์และลบของที่ไม่จำเป็น รวมถึงรายการฐานข้อมูลที่ใช้งานอยู่</b-pick-cell>
    <b-pick-cell k="ทำไม" tone="warn">บัญชีที่มีสิทธิ์ผู้ดูแลเซิร์ฟเวอร์ ทั้งที่งานเกี่ยวกับฐานข้อมูลเดียว</b-pick-cell>
    <b-pick-cell k="การป้องกัน" tone="accent">ผู้ใช้แยกสำหรับงานนั้น สิทธิ์เฉพาะฐานข้อมูลเดียว ไม่มีการดูแลเซิร์ฟเวอร์</b-pick-cell>
  </tab>
  <tab t="ข้อมูลของคนอื่น">
    <b-pick-cell k="เกิดอะไรขึ้น" t="ให้ข้อมูลของผู้อำนวยการแก่นักบัญชี">เอเจนต์ MCP ตอบพนักงาน นักบัญชีได้ตัวเลขที่ไม่ควรเห็น</b-pick-cell>
    <b-pick-cell k="ทำไม" tone="warn">เซิร์ฟเวอร์เข้าถึงฐานข้อมูลด้วยผู้ใช้ร่วมคนเดียวที่มีสิทธิ์เต็ม บทบาทและข้อจำกัดของ 1C จึงไม่มีผล</b-pick-cell>
    <b-pick-cell k="การป้องกัน" tone="accent">ลงชื่อเข้าใช้ในนามคนที่ถาม แล้วบทบาทและข้อจำกัดระดับระเบียนของเขาจะมีผล</b-pick-cell>
  </tab>
  <tab t="รหัสผ่านในล็อก">
    <b-pick-cell k="เกิดอะไรขึ้น" t="รหัสผ่านและคีย์ไปอยู่ในล็อก">รหัสผ่านฐานข้อมูลถูกส่งให้เอเจนต์ในคำขอเลย มันค้างอยู่ในล็อกการเรียกและประวัติแชต</b-pick-cell>
    <b-pick-cell k="ทำไม" tone="warn">ความลับอยู่ในอาร์กิวเมนต์ของเครื่องมือและวางอยู่ในไฟล์ข้างโปรเจกต์</b-pick-cell>
    <b-pick-cell k="การป้องกัน" tone="accent">ความลับอยู่ในการตั้งค่าเซิร์ฟเวอร์เท่านั้น ไม่เคยแสดงให้เอเจนต์ ปิดโฟลเดอร์ที่มีคีย์จากเอเจนต์</b-pick-cell>
  </tab>
  <tab t="“เสร็จแล้ว”">
    <b-pick-cell k="เกิดอะไรขึ้น" t="“เสร็จแล้ว” แต่ไม่มีอะไรเปลี่ยน">เอเจนต์เพิ่มแอตทริบิวต์แล้วรายงานว่าเสร็จ ในโหมดผู้ใช้ไม่มีอะไรเปลี่ยน เพราะไม่ได้อัปเดตฐานข้อมูลหลังการแก้</b-pick-cell>
    <b-pick-cell k="ทำไม" tone="warn">รับรายงานของเอเจนต์โดยไม่ตรวจผลลัพธ์</b-pick-cell>
    <b-pick-cell k="การป้องกัน" tone="accent">หลังแก้: อัปเดตฐานข้อมูล ตรวจข้อผิดพลาด และรัน autotest “เสร็จแล้ว” ต้องมีลิงก์ไปยังผลลัพธ์</b-pick-cell>
  </tab>
  <tab t="คำตอบผิด">
    <b-pick-cell k="เกิดอะไรขึ้น" t="คิวรีไม่มีข้อผิดพลาด แต่คำตอบผิด">เอเจนต์เขียนคิวรีที่รันได้โดยไม่มีข้อผิดพลาด แต่ตัวเลขไม่ตรงกับรายงานของ 1C</b-pick-cell>
    <b-pick-cell k="ทำไม" tone="warn">โมเดลรู้รีจิสเตอร์และช่วงเวลาของ 1C ไม่ดี และเขียนคิวรีเหมือนกับฐานข้อมูลทั่วไป</b-pick-cell>
    <b-pick-cell k="การป้องกัน" tone="accent">ตรวจเทียบกับรายงานมาตรฐานของ 1C หรือตอบผ่านรายงานสำเร็จรูปแทนคิวรีที่เขียนเอง</b-pick-cell>
  </tab>
  <tab t="ข้อมูลบนคลาวด์">
    <b-pick-cell k="เกิดอะไรขึ้น" t="ข้อมูลส่วนบุคคลไปอยู่บนคลาวด์">เอเจนต์ได้ dump ที่มีพาสปอร์ตและเงินเดือน และมันไปถึงโมเดลบนคลาวด์</b-pick-cell>
    <b-pick-cell k="ทำไม" tone="warn">เอเจนต์ได้ทั้งฐานข้อมูลแทนที่จะได้เฉพาะฟิลด์ที่ต้องใช้</b-pick-cell>
    <b-pick-cell k="การป้องกัน" tone="accent">ทำให้ข้อมูลนิรนามและส่งเฉพาะฟิลด์ที่จำเป็น สำหรับข้อมูลอ่อนไหว ใช้โมเดลภายในเครือข่ายของตัวเอง</b-pick-cell>
  </tab>
</b-pick-tabs>
</b-lane>
<b-finding>
  <ex k="ประเด็นร่วม">เกือบทุกกรณีเกี่ยวกับสิทธิ์และการตรวจ โมเดลเป็นเรื่องรอง</ex>
  <gen k="สาเหตุ">เอเจนต์ได้สิทธิ์เท่าผู้ดูแลระบบ และเชื่อรายงานของมันตามที่พูด</gen>
  <do k="ทำอย่างไร">ไล่ดูกรณีเหล่านี้ และทำเครื่องหมายว่ามีการป้องกันข้อไหนอยู่แล้ว</do>
</b-finding>
</b-chapter>
<b-chapter id="scheme" icon="shield-check" title="แผนผังที่ปลอดภัย">
<b-why align="left">เอเจนต์อ่านฐานข้อมูลจริงได้อย่างเดียว เขียนลงฐานข้อมูลทดสอบ คนย้ายการเปลี่ยนแปลงขึ้นระบบจริงหลังรีวิว</b-why>
<b-lane title="แยกการอ่านออกจากการเขียน" color="accent">
<b-scene names="mcp-1c/safe-scheme"/>
<b-pick-tabs id="sf" tone="accent">
  <tab t="อ่าน">
    <b-pick-cell k="ขั้น" t="เอเจนต์อ่าน">ข้อมูลและโค้ดของระบบจริง เพื่อตอบและวิเคราะห์</b-pick-cell>
    <b-pick-cell k="ที่ไหน" tone="accent">ระบบจริง ภายใต้ผู้ใช้ 1C ของมันเองที่มีบทบาทอ่านอย่างเดียว</b-pick-cell>
    <b-pick-cell k="ทำไม">เอเจนต์เห็นข้อมูลจริงแต่แก้ไม่ได้</b-pick-cell>
  </tab>
  <tab t="เขียน">
    <b-pick-cell k="ขั้น" t="เอเจนต์เขียน">โค้ด เมทาดาทา และเอกสาร</b-pick-cell>
    <b-pick-cell k="ที่ไหน" tone="accent">ฐานข้อมูลทดสอบหรือ <a href="/materials/glossary/sandbox/">sandbox</a> ที่มีสำเนาของระบบจริง</b-pick-cell>
    <b-pick-cell k="ทำไม">ข้อผิดพลาดอยู่ในฐานข้อมูลทดสอบและไม่ไปถึงบัญชี</b-pick-cell>
  </tab>
  <tab t="ตรวจและย้าย">
    <b-pick-cell k="ขั้น" t="ตรวจและย้าย">autotest จากนั้นคนรีวิวการเปลี่ยนแปลง</b-pick-cell>
    <b-pick-cell k="ที่ไหน" tone="accent">การเปลี่ยนแปลงไปที่ storage และระบบจริงอัปเดตจากที่นั่น</b-pick-cell>
    <b-pick-cell k="ทำไม">เฉพาะการเปลี่ยนแปลงที่ตรวจแล้วเท่านั้นที่ถึงระบบจริง และแต่ละรายการมีเวอร์ชัน</b-pick-cell>
  </tab>
</b-pick-tabs>
</b-lane>
<b-finding>
  <ex k="แผนผัง">ข้อผิดพลาดของเอเจนต์อยู่ในฐานข้อมูลทดสอบและไม่ไปถึงบัญชี</ex>
  <gen k="ต้นทุน">ต้องมีฐานข้อมูลทดสอบข้างระบบจริง ซึ่งถูกกว่าการกู้คืนจากข้อมูลสำรองหนึ่งครั้ง</gen>
  <do k="ทำอย่างไร">ตั้ง<a href="/materials/glossary/test-stand/">สภาพแวดล้อมทดสอบ</a>พร้อมสำเนาฐานข้อมูลก่อนเชื่อมต่อเซิร์ฟเวอร์ข้อมูล</do>
</b-finding>
</b-chapter>
<b-chapter id="rights" icon="key" title="สิทธิ์: บันไดการเข้าถึง">
<b-why align="left">สิทธิ์ของเอเจนต์สร้างเป็นขั้น ขั้นถัดไปเปิดเมื่อขั้นก่อนหน้าผ่านไปโดยไม่มีเรื่องน่าตกใจ <a href="/materials/glossary/permissions/">สิทธิ์ของเอเจนต์คืออะไร</a></b-why>
<b-lane title="บันไดการเข้าถึง" color="accent">
<b-scene names="mcp-1c/rights"/>
<b-pick-tabs id="rt" tone="accent">
  <tab t="อ่านโค้ด">
    <b-pick-cell k="เอเจนต์ทำอะไรได้" t="อ่านโค้ด">โมดูล เมทาดาทา ฟอร์ม</b-pick-cell>
    <b-pick-cell k="เปิดเมื่อไร" tone="accent">ทันที</b-pick-cell>
    <b-pick-cell k="ตั้งค่าอย่างไร">เซิร์ฟเวอร์ที่เข้าถึง dump ของ configuration หรือโปรเจกต์ EDT โดยไม่เข้าถึงฐานข้อมูล</b-pick-cell>
  </tab>
  <tab t="อ่านข้อมูล">
    <b-pick-cell k="เอเจนต์ทำอะไรได้" t="อ่านข้อมูล">คิวรีและรายงานภายใต้ผู้ใช้ 1C ของมันเอง</b-pick-cell>
    <b-pick-cell k="เปิดเมื่อไร" tone="accent">บนสำเนาฐานข้อมูล หลังจากการอ่านโค้ดไม่มีเรื่องน่าตกใจ</b-pick-cell>
    <b-pick-cell k="ตั้งค่าอย่างไร">ผู้ใช้ 1C ที่มีบทบาทอ่านอย่างเดียว ปิดเครื่องมือ “รันโค้ดใดก็ได้”</b-pick-cell>
  </tab>
  <tab t="เขียนลงทดสอบ">
    <b-pick-cell k="เอเจนต์ทำอะไรได้" t="เขียนลงฐานทดสอบ">โค้ด เมทาดาทา เอกสาร</b-pick-cell>
    <b-pick-cell k="เปิดเมื่อไร" tone="accent">เมื่อมี autotest แล้ว</b-pick-cell>
    <b-pick-cell k="ตั้งค่าอย่างไร">ฐานข้อมูลทดสอบแยก ตรวจข้อผิดพลาดและรัน autotest หลังการแก้ทุกครั้ง</b-pick-cell>
  </tab>
  <tab t="เขียนลงระบบจริง">
    <b-pick-cell k="เอเจนต์ทำอะไรได้" t="เขียนลงระบบจริง">ไม่มีอะไร ขั้นนี้ปิดสำหรับเอเจนต์</b-pick-cell>
    <b-pick-cell k="เปิดเมื่อไร" tone="accent">ไม่เคย เฉพาะคนเท่านั้น</b-pick-cell>
    <b-pick-cell k="ตั้งค่าอย่างไร">คนย้ายการเปลี่ยนแปลงผ่าน storage หลังรีวิว</b-pick-cell>
  </tab>
</b-pick-tabs>
</b-lane>
<b-rules-fixed cols="2" sw="1.8">
  <rule icon="user" t="ผู้ใช้ 1C ของมันเอง">เอเจนต์ลงชื่อเข้าใช้เป็นผู้ใช้แยกหรือเป็นคนที่ถาม แล้วสิทธิ์ปกติและข้อจำกัดระดับระเบียนมีผล</rule>
  <rule icon="eye-wide-hm" t="บทบาทอ่านอย่างเดียว">สำหรับระบบจริง ใช้บทบาทที่ไม่มีสิทธิ์เขียนหรือผ่านรายการเอกสาร ตัวอย่าง: ใน mcp-1c คิวรีฐานข้อมูลอ่านอย่างเดียวโดยการออกแบบ</rule>
  <rule icon="prompt" t="ไม่มีโค้ดตามอำเภอใจ">ปิดเครื่องมือ “รันโค้ดใดก็ได้” บนระบบจริง เพราะมันข้ามสิทธิ์ทั้งหมด</rule>
  <rule icon="lock-alt" t="เก็บความลับแยก">รหัสผ่านและคีย์อยู่ในการตั้งค่าเซิร์ฟเวอร์ ไม่แสดงให้เอเจนต์และไม่ส่งในคำขอ</rule>
</b-rules-fixed>
<b-finding>
  <ex k="ข้อมูลเป็นคำสั่ง">ความคิดเห็นในเอกสารหรืออีเมลในฐานข้อมูลอาจมีคำสั่งถึงเอเจนต์ นั่นคือ<a href="/materials/glossary/prompt-injection/">การโจมตีแบบ prompt injection</a> และสิทธิ์จำกัดความเสียหายของมัน</ex>
  <gen k="กฎ">เอเจนต์ได้สิทธิ์ของผู้ใช้ทั่วไป สิ่งที่ผู้ใช้ทำไม่ได้ เอเจนต์ก็ทำไม่ได้</gen>
  <do k="ทำอย่างไร">วิธีแยกข้อมูลออกจากคำสั่งอยู่<a href="/blog/data-plane-control-plane-prompt-injection/">ในบทความเรื่อง prompt injection</a></do>
</b-finding>
</b-chapter>
<b-chapter id="check" icon="check-square" title="ตรวจผลลัพธ์">
<b-why align="left">“เสร็จแล้ว” ของเอเจนต์เป็นเพียงคำกล่าวอ้าง การตรวจและ<a href="/materials/glossary/human-in-the-loop/">คนในลูป</a>เป็นผู้ยืนยัน</b-why>
<b-lane title="สี่การตรวจก่อนรับผลลัพธ์" color="accent">
<b-scene names="mcp-1c/checks"/>
<b-pick-tabs id="ck" tone="accent">
  <tab t="ข้อผิดพลาดใน IDE">
    <b-pick-cell k="การตรวจ" t="ตรวจข้อผิดพลาดใน IDE"/>
    <b-pick-cell k="จับอะไรได้" tone="warn">ไวยากรณ์ เมธอดและแอตทริบิวต์ที่ไม่มีอยู่จริง</b-pick-cell>
    <b-pick-cell k="รันอย่างไร" tone="accent">หลังการแก้ทุกครั้ง เอเจนต์แสดงผลการตรวจในรายงาน</b-pick-cell>
  </tab>
  <tab t="Autotest">
    <b-pick-cell k="การตรวจ" t="Autotest"/>
    <b-pick-cell k="จับอะไรได้" tone="warn">สถานการณ์ล้มเหลว ฟอร์มเปิดไม่ได้</b-pick-cell>
    <b-pick-cell k="รันอย่างไร" tone="accent">การทดสอบสถานการณ์และ unit test บนฐานข้อมูลทดสอบทุกรอบ</b-pick-cell>
  </tab>
  <tab t="ตรวจเทียบ 1C">
    <b-pick-cell k="การตรวจ" t="ตรวจเทียบกับรายงานของ 1C"/>
    <b-pick-cell k="จับอะไรได้" tone="warn">ตัวเลขของเอเจนต์ไม่ตรงกับบัญชี</b-pick-cell>
    <b-pick-cell k="รันอย่างไร" tone="accent">ช่วงเวลาและบริษัทเดียวกันในรายงานมาตรฐาน ถ้าไม่ตรงให้หยุด</b-pick-cell>
  </tab>
  <tab t="คน">
    <b-pick-cell k="การตรวจ" t="คนรีวิวการเปลี่ยนแปลง"/>
    <b-pick-cell k="จับอะไรได้" tone="warn">การแก้ผิดที่ ออบเจกต์ที่ยืมมาเกินจำเป็น เครื่องมือที่ถูกข้าม</b-pick-cell>
    <b-pick-cell k="รันอย่างไร" tone="accent">เทียบการเปลี่ยนแปลงก่อนย้าย: เฉพาะส่วนขยาย เฉพาะออบเจกต์ที่ต้องใช้</b-pick-cell>
  </tab>
</b-pick-tabs>
</b-lane>
<b-finding>
  <ex k="ข้อผิดพลาดทั่วไป">เอเจนต์แก้ไฟล์ configuration โดยข้ามเครื่องมือของ IDE และโปรเจกต์เบี่ยงจากฐานข้อมูล</ex>
  <gen k="กฎ">ทุก “เสร็จแล้ว” ต้องมีการตรวจหรือลิงก์ไปยังผลลัพธ์รองรับ</gen>
  <do k="ทำอย่างไร">เพิ่มในกฎของเอเจนต์: หลังการแก้ ให้รันการตรวจข้อผิดพลาดและแสดงผล</do>
</b-finding>
</b-chapter>
<b-chapter id="agents" icon="prompt" title="Claude Code, Codex และ Cursor สำหรับ 1C">
<b-why align="left">MCP server สำหรับ 1C เชื่อมต่อกับเอเจนต์ใดก็ได้ที่รองรับ MCP ต่างกันเพียงที่ตั้งค่า</b-why>
<b-section-h3 top="4">เชื่อมต่อใน 3 ขั้น</b-section-h3>
<b-step-chain>
  <node t="1. เลือกเซิร์ฟเวอร์">สำหรับโค้ดหรือข้อมูล จากรายการด้านบน</node>
  <node t="2. มอบหมายให้เอเจนต์">“เชื่อมต่อ MCP server ของ 1C ตาม README ของมัน”</node>
  <node t="3. ทดสอบบนสำเนา">ขอรายการเครื่องมือและลองค้นหนึ่งไดเรกทอรี</node>
</b-step-chain>
<b-lane title="ตั้งค่าที่ไหน" color="accent">
<b-scene names="mcp-1c/agents"/>
<b-pick-tabs id="ag" tone="accent">
  <tab t="Claude Code">
    <b-pick-cell k="ตั้งค่าที่ไหน">คำสั่ง <code>claude mcp add</code></b-pick-cell>
    <b-pick-cell k="สำหรับทีม" tone="accent"><code>.mcp.json</code> ใน repository</b-pick-cell>
    <b-pick-cell k="เอกสาร"><a href="https://code.claude.com/docs/en/mcp" target="_blank" rel="noopener">MCP ใน Claude Code</a></b-pick-cell>
  </tab>
  <tab t="Codex">
    <b-pick-cell k="ตั้งค่าที่ไหน"><code>~/.codex/config.toml</code> หรือ <code>.codex/config.toml</code> ในโปรเจกต์</b-pick-cell>
    <b-pick-cell k="สำหรับทีม" tone="accent"><code>.codex/config.toml</code> ในโปรเจกต์ที่ไว้วางใจ</b-pick-cell>
    <b-pick-cell k="เอกสาร"><a href="https://developers.openai.com/codex/mcp" target="_blank" rel="noopener">MCP ใน Codex</a></b-pick-cell>
  </tab>
  <tab t="Cursor">
    <b-pick-cell k="ตั้งค่าที่ไหน">ไฟล์ <code>mcp.json</code></b-pick-cell>
    <b-pick-cell k="สำหรับทีม" tone="accent">มาร์เก็ตเพลสเซิร์ฟเวอร์ของทีม</b-pick-cell>
    <b-pick-cell k="เอกสาร"><a href="https://cursor.com/docs/context/mcp" target="_blank" rel="noopener">MCP ใน Cursor</a></b-pick-cell>
  </tab>
</b-pick-tabs>
</b-lane>
<b-finding>
  <ex k="จุดร่วม">สิทธิ์กำหนดโดยเซิร์ฟเวอร์และผู้ใช้ 1C แผนผังข้างบนใช้ได้กับทั้งสามตัว</ex>
  <gen k="การยืนยัน">เปิดการยืนยันไว้สำหรับเครื่องมือที่เปลี่ยนข้อมูล</gen>
  <do k="ทำอย่างไร">มอบหมายการตั้งค่าให้เอเจนต์เอง ตามที่อธิบายไว้<a href="/blog/mcp-agent-access/#connect">ในบทความเรื่อง MCP</a></do>
</b-finding>
</b-chapter>
<b-chapter id="start" icon="flag-alt" title="เริ่มที่ไหน">
<b-why align="left">สามขั้น ขั้นถัดไปมาหลังจากขั้นก่อนหน้าผ่านไปโดยไม่มีเรื่องน่าตกใจ</b-why>
<b-lane-art names="mcp-1c/start-steps"/>
<b-finding>
  <ex k="สัปดาห์ที่ 1">เซิร์ฟเวอร์โค้ดและการอ่านข้อมูลบนสำเนาฐานข้อมูล ตรวจคำตอบของเอเจนต์ 5 ข้อด้วยมือ</ex>
  <gen k="สัปดาห์ที่ 2">เขียนลงฐานข้อมูลทดสอบและ autotest เอเจนต์แสดงสิ่งที่ตรวจ</gen>
  <do k="หลังจากนั้น">ระบบจริงยังคงอ่านอย่างเดียว การย้ายการเปลี่ยนแปลงเป็นหน้าที่ของคน</do>
</b-finding>
</b-chapter>
<b-chapter id="faq" icon="chat" title="คำถามที่พบบ่อย">
  <b-faq-cards>
    <q t="เชื่อมต่อเอเจนต์ AI กับ 1C อย่างไร">ผ่าน MCP server สำหรับ 1C ซึ่งเป็นสะพานไปยังโค้ดของ configuration และข้อมูลในฐานข้อมูล ใช้ได้กับ Claude Code, Codex และ Cursor</q>
    <q t="ทำอย่างไรไม่ให้ฐานข้อมูล 1C ที่ใช้งานจริงพัง">เอเจนต์อ่านฐานข้อมูลจริงได้อย่างเดียวภายใต้ผู้ใช้ที่ไม่มีสิทธิ์เขียน แก้ไขในสำเนาทดสอบ และคนย้ายการเปลี่ยนแปลงขึ้นฐานข้อมูลจริงผ่าน repository หลังรีวิว</q>
    <q t="ควรให้เอเจนต์มีสิทธิ์อะไรใน 1C">ใช้บันไดการเข้าถึง เริ่มจากอ่านอย่างเดียว แล้วยกระดับสิทธิ์ทีละขั้นเมื่องานต้องการเท่านั้น</q>
    <q t="มี MCP server ฟรีสำหรับ 1C ไหม">มี บทความนี้รวบรวม MCP server ฟรีสำหรับ 1C และ 1C:EDT และสิ่งที่พังในทางปฏิบัติ</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" icon="arrow-right" title="อ่านต่อ">
  <b-links>
    <item href="/blog/mcp-agent-access/" k="การเชื่อมต่อ" t="MCP สำหรับเอเจนต์ AI">วิธีเชื่อมต่อและมอบหมายให้เอเจนต์ทำ</item>
    <item href="/blog/data-plane-control-plane-prompt-injection/" k="ความปลอดภัย" t="ข้อมูลและคำสั่ง">วิธีป้องกัน prompt injection</item>
    <item href="/blog/mcp-scopes/" k="ขอบเขต" t="ขอบเขตของ MCP">การตั้งค่าเซิร์ฟเวอร์เก็บไว้ที่ไหน</item>
  </b-links>
</b-chapter>
<b-footer>กรณีต่าง ๆ เล่าใหม่จากการสนทนาเปิดของนักพัฒนา 1C โดยไม่ระบุชื่อและไม่อ้างถ้อยคำ เป็นตัวอย่างจากทางปฏิบัติ และตรวจสอบแต่ละกรณีไม่ได้ กฎการป้องกันเป็นแนวปฏิบัติของผู้เขียน</b-footer>
</b-post>
