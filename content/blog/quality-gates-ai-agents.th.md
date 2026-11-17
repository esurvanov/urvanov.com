---
title: จุดตรวจคุณภาพ (quality gate) สำหรับเอเจนต์ AI คืออะไร: จุดตรวจที่ช่วยให้คุณภาพดีขึ้นและเอเจนต์ทำงานเองได้นานขึ้น
date: 2026-11-14
updated: 2026-11-17
description: จุดตรวจคุณภาพคือด่านรับงานที่คั่นระหว่างงานของเอเจนต์กับคำว่า “เสร็จแล้ว” บทความอธิบายการตรวจสามแบบ ตัวเลขคุณภาพและต้นทุน วิธีหลบจุดตรวจ และห้าขั้นตอนเริ่มต้น
tags: AI, เอเจนต์, จุดตรวจคุณภาพ, MCP, bounded context, harness, hook, Claude Code
category: harness
layout: wide
mentions: quality gate, MCP, bounded context, aggregate, hooks, harness, Stage-Gate, Robert Cooper, Sonar, Claude, METR, deterministic check, feedback loop, compiler, P versus NP, design by contract, reward hacking
toc: answer=สรุปสั้น | origin=ที่มา | why=ตรวจงานตัวเอง | kinds=ประเภท | gives=คุณภาพ | auto=ทำงานเอง | where=ขอบเขต | mcp=MCP | limits=ข้อจำกัด | start=เริ่มต้น | faq=คำถาม | next=อ่านต่อ
---

จุดตรวจคุณภาพ (quality gate) สำหรับเอเจนต์ AI คือจุดควบคุมภายนอก งานจะหยุดอยู่จนกว่าการตรวจที่เป็นอิสระจะตอบว่า “รับแล้ว” และเอเจนต์ไม่เคยประทับคำว่า “เสร็จแล้ว” เอง จุดตรวจอยู่นอกตัวเอเจนต์และนอก bounded context ของมัน หลัง MCP หรือตัวกั้นอื่น จุดตรวจช่วยยกระดับคุณภาพและทำให้เอเจนต์ทำงานเองได้นานขึ้น ด้านล่างคือประเภท ตัวเลข MCP และข้อจำกัด

<b-post series="harness">
<b-callout icon="bulb">**ข้อคิดของผู้เขียน** แนวคิดที่ว่าจุดตรวจเป็นส่วนภายนอกและอยู่หลังขอบเขตบริบทของเอเจนต์ รวมถึงข้อสรุปที่ตามมา เป็นของผู้เขียนเอง ได้แก่ จุดตรวจควรอยู่ที่ขอบเขตของ bounded context ชุดฟังก์ชัน MCP ที่แคบชุดเดียวทั้งประหยัดบริบทและจำกัดสิทธิ์ และจุดตรวจทำให้เอเจนต์ทำงานเองได้นานขึ้น ไม่มีแหล่งใดใช้ถ้อยคำว่า “จุดตรวจหลังขอบเขตบริบท” ไม่มีใครวัดว่าการทำงานอัตโนมัติยาวขึ้นเท่าใด ส่วนว่าด้วยการทำงานเองเสนอการคำนวณและกรณีตัวอย่าง ไม่ใช่การทดลองจากกลุ่มตัวอย่าง แหล่งอ้างอิงยืนยันได้เป็นข้อ ๆ และข้างข้อความมีที่อยู่กับวลีที่ตรงตัวกำกับไว้</b-callout>

<b-hchain label="สายโซ่: ด่านรับงาน ประเภทของการตรวจ ขอบเขตบริบท MCP ข้อจำกัด">
  <step icon="shield-check" t="จุดตรวจ">ด่านรับงาน</step>
  <step icon="layers" t="ประเภท">เครื่อง · เอเจนต์ · คน</step>
  <step icon="workflow" sw="1.8" t="ขอบเขต">bounded context</step>
  <step icon="package" t="MCP">สิทธิ์และฟังก์ชัน</step>
  <step icon="alert-circle" t="ข้อจำกัด">จุดตรวจถูกหลบได้อย่างไร</step>
</b-hchain>

<b-chapter id="answer" icon="shield-check" title="สรุปสั้น: จุดตรวจคืออะไร และเหตุใดเอเจนต์ต้องมี">
  <b-art names="quality-gates-ai-agents/overview" wide/>
  <b-cap>เส้นทางของงาน เอเจนต์เดินผ่านบริบทของตัวเองทีละขั้น งานไปถึงจุดตรวจที่อยู่ในอีกบริบทหนึ่งผ่าน MCP จุดตรวจตอบว่า “รับแล้ว” “ส่งกลับพร้อมข้อผิดพลาด” หรือ “ไม่แน่ใจ ให้คนตัดสิน”</b-cap>
  <b-why align="left"><b-icon name="shield-check"/> **คืออะไร** จุดตรวจอยู่ระหว่างงานของเอเจนต์กับคำว่า “เสร็จแล้ว” เอเจนต์นำผลลัพธ์มา และการตรวจให้คำตอบหนึ่งในสามแบบ คือรับแล้ว ไม่รับ (ข้อผิดพลาดย้อนกลับไปหาเอเจนต์) หรือไม่แน่ใจ (คนเป็นผู้ตัดสิน) ด่านนี้คือที่ที่ประทับคำว่า “เสร็จแล้ว” หากการตรวจไม่ผ่าน งานก็ไปต่อไม่ได้ ทั้งไปขั้นถัดไป เข้า merge หรือถึงผู้ใช้ จุดตรวจเป็นส่วนภายนอก จุดควบคุมอยู่ใน bounded context เดียวกับเอเจนต์ไม่ได้ ไม่เช่นนั้นจะมีจุดบอดเหมือนเอเจนต์ จึงต้องอยู่หลังตัวกั้น คือหลังเซิร์ฟเวอร์ MCP ใน hook ฝั่งไคลเอนต์ หรือในอีกโปรเซสหนึ่ง ข้ามขอบเขตนี้ได้น้อยมากทั้งสองทาง ผลลัพธ์สั้น ๆ ไปทางหนึ่ง คำตอบสั้น ๆ กลับมา ที่เหลือปิดไว้ทั้งหมด จุดตรวจได้ผลเพราะการตรวจมักง่ายกว่าการทำ เรื่องนี้ใกล้กับคำถาม “P versus NP” ในทฤษฎีความซับซ้อน คือการหาคำตอบอาจยาก แต่การตรวจคำตอบที่ได้มาแล้วทำได้เร็ว สำหรับเอเจนต์นี่เป็นเพียงการเปรียบเทียบ การตรวจไม่ได้ถูกสำหรับทุกงาน และที่ใดไม่ถูก จุดตรวจก็พึ่งคน</b-why>
  <b-why align="left"><b-icon name="trend-up"/> **เหตุผล** ข้อแรกคือคุณภาพ เอเจนต์ให้คะแนนงานของตัวเองไม่ดี และการตรวจอิสระเห็นสิ่งที่เอเจนต์พลาด ข้อสองคือการทำงานเอง ข้อผิดพลาดที่ถูกจับได้ในขั้นหนึ่งไม่เดินทางผ่านอีกยี่สิบขั้นถัดไป เอเจนต์จึงทำงานได้นานขึ้นโดยไม่ต้องมีคน ข้อสามคือความสนใจของคน คนดูเฉพาะกรณีที่ยังเป็นข้อโต้แย้งซึ่งจุดตรวจส่งต่อมาให้</b-why>
  <b-why align="left"><b-icon name="target"/> **วางไว้ที่ไหน** นอกตัวเอเจนต์และนอกบริบทของมัน คือใน hook ฝั่งไคลเอนต์หรือในสิทธิ์ฝั่งเซิร์ฟเวอร์หลัง MCP ไม่ใช่ในข้อความคำสั่งที่เอเจนต์เมินได้ ตัวเอเจนต์เองทำงานใน bounded context เล็ก ๆ ที่นั่นการตรวจมีขอบเขตจำกัด การเปลี่ยนแปลงเล็ก และชุดฟังก์ชัน MCP แคบ เรื่องเหล่านี้อยู่ในส่วน “ขอบเขต” และ “MCP”</b-why>
  <b-finding>
    <ex>เอเจนต์แก้ฟอร์มจองเสร็จ หากไม่มีจุดตรวจ มันจะเขียนว่า “เสร็จแล้ว” หากมีจุดตรวจ การทดสอบและการตรวจกฎการจองจะรัน ถ้าเทสต์ไม่ผ่าน เอเจนต์จะได้ข้อความข้อผิดพลาดและทำต่อ และคนจะรู้เรื่องการเปลี่ยนแปลงนี้ก็ต่อเมื่อทุกอย่างผ่านแล้ว หรือเมื่อการตรวจตอบว่า “ไม่แน่ใจ”</ex>
    <gen>จุดตรวจเอาสิทธิ์ประทับ “เสร็จแล้ว” ไปจากเอเจนต์ แล้วมอบให้การตรวจที่อยู่นอกตัวเอเจนต์</gen>
    <do>เลือกงานหนึ่งอย่างที่เอเจนต์ทำเป็นประจำ แล้วเขียนเงื่อนไข “เสร็จแล้ว” เป็นประโยคเดียวที่ตรวจได้ เช่น “เทสต์ทั้งหมดเป็นสีเขียวและ linter ไม่ฟ้องอะไร”</do>
  </b-finding>
</b-chapter>

<b-chapter id="origin" icon="clock" title="คำนี้มาจากไหน: จากการตรวจสอบโค้ดสู่จุดตรวจสำหรับเอเจนต์">
  <b-why align="left">คำว่า “gate” มาจากการจัดการผลิตภัณฑ์ โรงงาน และวิศวกรรมซอฟต์แวร์ ด้านล่างคือสี่จุดบนเส้นทาง และแต่ละจุดมีแนวคิดที่จุดตรวจของเอเจนต์รับช่วงมา</b-why>
  <b-art names="quality-gates-ai-agents/timeline" wide/>
  <b-cap>การตรวจสอบโค้ด Stage-Gate จุดตรวจบนโค้ดใหม่ และจุดตรวจสำหรับเอเจนต์</b-cap>
  <b-rules cols="2">
    <rule icon="eye" t="1976: การตรวจสอบโค้ด">Fagan วางรูปแบบการตรวจสอบโค้ดอย่างเป็นทางการก่อนส่งมอบ งานสำรวจปี 2026 เรียกการรีวิวว่า “จุดตรวจคุณภาพหลัก” มาตั้งแต่นั้น<b-proof href="https://arxiv.org/abs/2606.13175" quote="Monperrus: „Code review has been the primary quality gate in software development since Fagan formalised code inspection in 1976.“"/></rule>
    <rule icon="git-branch" t="1990: Stage-Gate">Robert Cooper อธิบายโปรเจกต์ว่าเป็นสายของขั้นตอนที่มีจุดตรวจคั่นระหว่างกัน เพื่อตัดสินว่า “ไปต่อหรือหยุด” เว็บไซต์ของสถาบันของเขาเขียนไว้ว่า ผู้เฝ้าประตูตัดสินใจเช่นนั้นให้ทันเวลา<b-proof href="https://stage-gate.com/blog/improving-go-kill-decision-culture/" quote="Stage-Gate International: „Gatekeepers make timely, Go/Kill decisions.“"/></rule>
    <rule icon="shield-check" t="2020: จุดตรวจบนโค้ดใหม่">Sonar นิยามจุดตรวจว่าเป็นการตัดสินแบบทวิภาค คือผ่านหรือไม่ผ่าน<b-proof href="https://www.sonarsource.com/blog/clean_coding-quality_profile_quality_gate_guidance/" quote="Sonar: „called a Quality Gate and it's binary in nature - either pass or fail.“"/> จุดตรวจดูโค้ดที่เพิ่มหรือแก้ไขเมื่อไม่นานมานี้ ประวัติทั้งหมดอยู่นอกการตรวจ</rule>
    <rule icon="cpu" t="2026: จุดตรวจสำหรับเอเจนต์">Thoughtworks Radar เรียกคอมไพเลอร์ linter และเทสต์ว่าจุดตรวจคุณภาพแบบกำหนดแน่นอน และแนะนำให้ต่อเข้ากับเวิร์กโฟลว์ของเอเจนต์<b-proof href="https://www.thoughtworks.com/content/dam/thoughtworks/documents/radar/2026/04/tr_technology_radar_vol_34_en.pdf" quote="Thoughtworks Radar, vol. 34: „Developers have long relied on deterministic quality gates such as compilers, linters, structural tests and test suites“"/> Sonar มีชุดเงื่อนไขแยกต่างหากสำหรับโค้ดที่เอเจนต์เขียน</rule>
  </b-rules>
  <b-why align="left">แนวคิดอีกสองข้อมาจากโรงงาน ข้อที่สามจากสิบสี่ข้อของ Deming บอกให้เลิกพึ่งพาการตรวจสอบตอนท้าย และสร้างคุณภาพเข้าไปในผลิตภัณฑ์ตั้งแต่แรก<b-proof href="https://deming.org/explore/fourteen-points/" quote="Deming, point 3: „Cease dependence on inspection to achieve quality. Eliminate the need for inspection on a mass basis by building quality into the product in the first place.“"/> ในระบบ jidoka ของ Toyota อุปกรณ์ต้องหยุดทันทีเมื่อตรวจพบความผิดปกติ<b-proof href="https://global.toyota/en/company/vision-and-philosophy/production-system/" quote="Toyota: equipment should „stop immediately when abnormalities are detected to prevent defective products from being produced“"/> จุดตรวจของเอเจนต์รวมสองแนวคิดนี้เข้าด้วยกัน คือการตรวจอยู่เร็วที่สุดเท่าที่ทำได้ และหยุดงานได้</b-why>
  <b-finding>
    <ex>Fagan ตรวจโค้ดด้วยคน Cooper วางจุดตรวจระหว่างขั้นของโปรเจกต์ Sonar ทำจุดตรวจให้เป็นอัตโนมัติ และสำหรับเอเจนต์ จุดตรวจกลายเป็นจุดที่งานไปต่อไม่ได้หากไม่มีคำตัดสิน</ex>
    <gen>จุดตรวจของเอเจนต์ไม่ใช่สิ่งประดิษฐ์ใหม่ แต่เป็นจุดควบคุมเก่าที่ย้ายมาอยู่ตรงที่เครื่องจักรทำงาน และเครื่องจักรตรวจตัวเองได้ไม่ดี</gen>
    <do>ดูว่าโปรเจกต์ของคุณมีจุดตรวจอะไรสำหรับคนอยู่แล้ว เช่น เทสต์ใน CI รีวิวภาคบังคับ linter เอเจนต์ควรผ่านจุดตรวจชุดเดียวกัน</do>
  </b-finding>
</b-chapter>

<b-chapter id="why" icon="eye" title="เหตุใดเอเจนต์ไม่ตรวจงานของตัวเอง">
  <b-why align="left">สิ่งแรกที่งานวิจัยแสดงคือเอเจนต์ประเมินงานของตัวเองสูงเกินจริง Anthropic พบว่าการแยกเอเจนต์ที่ทำงานออกจากเอเจนต์ที่ตัดสินงานเป็นคันโยกที่ทรงพลัง<b-proof href="https://www.anthropic.com/engineering/harness-design-long-running-apps" quote="Anthropic, 24 Mar 2026: „Separating the agent doing the work from the agent judging it proves to be a strong lever to address this issue.“"/> พวกเขายังบันทึกว่า Claude ที่ไม่ได้ปรับแต่งเป็นผู้รีวิวที่แย่ และต้องปรับให้เข้มงวด</b-why>
  <b-why align="left">การวัดที่ละเอียดที่สุดคือพรีปรินต์ของ Park และ Choi (กรกฎาคม 2026 เป็นงานนำร่องฉบับร่าง) เอเจนต์ตัวเดียวกันรันหกรอบการปรับปรุง และเปลี่ยนเพียงผู้ที่ปิดลูปป้อนกลับ คือผู้ตัดสินผลลัพธ์ ได้แก่ตัวเอเจนต์เอง ผู้ตัดสินที่เก่งภายในลูป หรือการตรวจภายนอกที่เห็นผลจริง แผนภูมิแสดงคะแนนสุดท้ายของแต่ละแบบ</b-why>
  <b-art names="quality-gates-ai-agents/self-grade" wide/>
  <b-cap>การที่เอเจนต์ให้คะแนนตัวเองทำให้สิ่งที่ทำได้แล้วถอยกลับไป 19% และการตรวจภายนอกให้คะแนนสูงสุด งานนำร่อง: หนึ่งโมเดล หนึ่งงาน ทำซ้ำสามครั้ง</b-cap>
  <b-why align="left">สิ่งที่อยู่เบื้องหลังตัวเลข เอเจนต์เรียกทั้ง 54 รอบว่าเป็นการปรับปรุง ทั้งที่ใน 56% ของรอบเหล่านั้น การเปลี่ยนแปลงจริงเป็นศูนย์หรือติดลบ การให้คะแนนตัวเองกลายเป็น “รับทุกอย่าง” แม้แต่ผู้ตัดสินที่เก่งภายในลูปก็ยังรับการถดถอยจริงใน 44% ของกรณี และปฏิเสธการปรับปรุงจริง 38% ผู้เขียนอธิบายช่องว่างนี้ไว้ดังนี้<b-proof href="https://arxiv.org/abs/2607.25152" quote="Park, Choi: „The cause of the gap is not the evaluator's quality but what the evaluator is grounded in.“"/> ช่องว่างถูกกำหนดโดยสิ่งที่ผู้ตัดสินอาศัย ความฉลาดของผู้ตัดสินไม่มีผล ผู้ตัดสินในลูปเห็นเฉพาะสิ่งที่เอเจนต์แสดงให้ดู การตรวจภายนอกดูผลลัพธ์จริง</b-why>
  <b-why align="left">Anthropic ได้ข้อสรุปเดียวกันกับคอมไพเลอร์ C ของตน (กรณีที่ Anthropic เล่าเอง) เอเจนต์ 16 ตัว ราว 2,000 เซสชัน และราว 20,000 ดอลลาร์ ผู้เขียนระบุว่าตัวตรวจที่เกือบสมบูรณ์แบบเป็นเงื่อนไขหลัก<b-proof href="https://www.anthropic.com/engineering/building-c-compiler" quote="Anthropic, 5 Feb 2026: „it's important that the task verifier is nearly perfect, otherwise Claude will solve the wrong problem.“"/> บทความเดียวกันเตือนไว้ว่า<b-proof href="https://www.anthropic.com/engineering/building-c-compiler" quote="same article: „it is easy to see tests pass and assume the job is done, when this is rarely the case.“"/> เทสต์ผ่านแต่งานยังไม่เสร็จ เรื่องนี้เกิดขึ้นตราบที่การตรวจยังไม่กำหนดแน่นอน การตรวจแบบกำหนดแน่นอนกับข้อมูลชุดเดิมให้คำตัดสินเดิมเสมอ เหมือนการรันเทสต์หรือ linter คำตอบของโมเดลผู้ตัดสินอาจต่างกันในแต่ละรอบ ผู้ตัดสินจึงเสริมโปรแกรมตรวจ ไม่ได้แทนที่</b-why>
  <b-why align="left">ข้อสังเกตอีกข้อจากงานนำร่อง คือบิตเดียวก็พอสำหรับการตรวจภายนอก คำตัดสิน “รับ” หรือ “ปฏิเสธ” โดยไม่มีคำอธิบายได้คะแนน 110.0 เทียบกับ 113.0 เมื่อมีรายงานเต็ม จุดตรวจจึงไม่จำเป็นต้องบอกเหตุผล แค่ใช่หรือไม่ใช่ก็พอ</b-why>
  <b-finding>
    <ex>เอเจนต์ในลูปเรียกทุกอย่างว่าการปรับปรุง และการตรวจภายนอกที่ดูผลจริงตัดการถดถอยออกไป</ex>
    <gen>การตรวจภายในบทสนทนาของเอเจนต์รับจุดบอดของมันมาด้วย สิ่งที่ทำให้การตรวจเป็นอิสระคือการพึ่งข้อเท็จจริงภายนอก เช่น การรันเทสต์ ผลลัพธ์จริง หรือผู้รีวิวแยกที่เข้าถึงผลิตภัณฑ์จริงได้</gen>
    <do>ทบทวน prompt ที่ส่งถึงเอเจนต์ ถ้ามีคำว่า “ตรวจให้แน่ใจว่าทุกอย่างถูกต้อง” ให้แทนด้วยการรันการตรวจที่ผลลัพธ์เอเจนต์เขียนเองไม่ได้</do>
  </b-finding>
</b-chapter>

<b-chapter id="kinds" icon="layers" title="การตรวจสามแบบที่จุดตรวจ">
  <b-why align="left">ด่านรับงานจะมีการตรวจได้สามแบบ ต่างกันที่ความเร็ว ราคา และสิ่งที่มองเห็น ในทางปฏิบัติจึงวางหลายแบบเรียงกัน ตัวถูกและเร็วก่อน ตัวแพงและนาน ๆ ครั้งไว้ท้ายสุด</b-why>
  <b-art names="quality-gates-ai-agents/three-kinds" wide/>
  <b-cap>จากซ้ายไปขวา การตรวจฉลาดขึ้น ช้าลง และแพงขึ้น</b-cap>
  <b-table>

| แบบ | สิ่งที่มองเห็น | ตัวอย่าง | จุดอ่อน |
|---|---|---|---|
| <b-icon name="cpu"/> **เครื่อง** | ทุกอย่างที่เขียนเป็นกฎได้ เช่น เทสต์ ชนิดข้อมูล linter บิลด์ ความครอบคลุม | Sonar สำหรับเอเจนต์: ความครอบคลุมของโค้ดใหม่อย่างน้อย 80% โค้ดซ้ำไม่เกิน 3% ไม่มีบั๊กหรือช่องโหว่ใหม่ | มองไม่เห็นความหมาย เซนเซอร์จับการวินิจฉัยผิด ความซับซ้อนเกินจำเป็น และการอ่านโจทย์ผิดได้ไม่น่าเชื่อถือ |
| <b-icon name="eye"/> **เอเจนต์ผู้รีวิว** | ความหมายตามเกณฑ์ที่มีเกณฑ์ขั้นต่ำ | Anthropic: ต่ำกว่าเกณฑ์ในเกณฑ์ข้อใดข้อหนึ่ง ขั้นนั้นไม่ผ่าน ผู้ตัดสินของ Spotify ใช้สิทธิ์ยับยั้งราวหนึ่งในสี่ของเซสชัน | แพงกว่า ต้องปรับให้เข้มงวด และก็พลาดได้เหมือนกัน |
| <b-icon name="user"/> **คน** | ความเสี่ยง เจตนา ผลที่ตามมา | GitHub: PR แบบ draft จากเอเจนต์ได้รับอนุมัติและ merge โดยมนุษย์เท่านั้น | เหนื่อยล้าและชินกับการอนุมัติ |

  </b-table>
  <b-why align="left"><b-icon name="cpu"/> **เครื่อง** วางระดับล่างสุด สำหรับโค้ดที่เอเจนต์เขียน Sonar กำหนดหกเงื่อนไข คือไม่มีบั๊ก ช่องโหว่ หรือปัญหาด้านการบำรุงรักษาเกินเกณฑ์ ความครอบคลุมของโค้ดใหม่อย่างน้อย 80% โค้ดซ้ำไม่เกิน 3% และไม่มีความเสี่ยงจาก dependency ใหม่ เงื่อนไขสุดท้ายเกิดขึ้นเพราะพฤติกรรมของเอเจนต์ คือพวกมันอาจติดตั้งแพ็กเกจโดยไม่ผ่านการตรวจสอบ<b-proof href="https://docs.sonarsource.com/sonarqube-server/quality-standards-administration/ai-code-assurance/quality-gate-for-agentic-ai" quote="Sonar: „agents may autonomously install packages without manual vetting“"/> สำหรับการแบ่งการตรวจเป็น guide และเซนเซอร์ ดูบทความ [“Harness engineering ในทางปฏิบัติ”](/blog/harness-driven-development/) จุดตรวจคือเซนเซอร์ที่มีสิทธิ์หยุดงาน</b-why>
  <b-why align="left"><b-icon name="eye"/> **เอเจนต์ผู้รีวิว** ที่ Anthropic ทุกเกณฑ์มีเกณฑ์ขั้นต่ำที่เด็ดขาด ถ้าแม้ข้อเดียวต่ำกว่า ขั้นนั้นไม่ผ่านและเอเจนต์ได้รับรายงานโดยละเอียด<b-proof href="https://www.anthropic.com/engineering/harness-design-long-running-apps" quote="Anthropic: „Each criterion had a hard threshold, and if any one fell below it, the sprint failed and the generator got detailed feedback on what went wrong.“"/> ก่อนแต่ละขั้น ผู้ลงมือกับผู้รีวิวตกลงสัญญาของขั้นนั้นไว้ว่าอะไรนับว่า “เสร็จแล้ว”<b-proof href="https://www.anthropic.com/engineering/harness-design-long-running-apps" quote="Anthropic: „agreeing on what ‘done’ looked like for that chunk of work before any code was written“"/> Spotify เพิ่มผู้ตัดสินหลังจากเอเจนต์เริ่มทำเกินงาน เช่น รีแฟกเตอร์โค้ดนอกขอบเขตงานและปิดเทสต์ที่ไม่เสถียร ผู้ตัดสินเทียบการเปลี่ยนแปลงกับคำขอเดิม<b-proof href="https://engineering.atspotify.com/2025/12/feedback-loops-background-coding-agents-part-3" quote="Spotify: „the judge vetoes about a quarter of them. When that happens, the agent is able to course correct half the time.“"/></b-why>
  <b-why align="left"><b-icon name="user"/> **คน** GitHub ฝังมนุษย์ไว้ในกระบวนการเอง เอเจนต์ทำเครื่องหมายว่า PR พร้อม อนุมัติ หรือ merge เองไม่ได้<b-proof href="https://docs.github.com/en/copilot/concepts/agents/coding-agent/risks-and-mitigations" quote="GitHub Docs: „Copilot cloud agent cannot mark its pull requests as ‘Ready for review’ and cannot approve or merge a pull request.“"/> จุดตรวจแบบนี้จำเป็นในที่ที่ข้อผิดพลาดมีราคาแพง เช่น เงิน การเข้าถึง ข้อมูลของคนอื่น</b-why>
  <b-why align="left">จุดตรวจมีสามคำตอบ คือรับ ไม่รับ และ “ไม่แน่ใจ” ข้อที่สามส่งกรณีให้คน และแสดงว่ากรอบของการตรวจสิ้นสุดตรงไหน เหตุใดคำตอบแบบนี้เลี่ยงไม่ได้สำหรับโค้ดของเอเจนต์ทุกตัว อยู่ในบทความ [“จะตรวจงานของเอเจนต์ AI ที่ไหน”](/blog/agent-checkpoint/)</b-why>
  <b-finding>
    <ex>เทสต์ผ่านใน 40 วินาที เอเจนต์ผู้รีวิวพบว่าปุ่มทำงานได้แต่หน้าตาไม่ตรงกับโจทย์ คนได้รับเฉพาะกรณีที่เป็นข้อโต้แย้งนี้</ex>
    <gen>จุดตรวจที่เร็วอยู่หน้าจุดตรวจที่แพง เครื่องกรองสิ่งที่เห็นได้ชัด เอเจนต์ตัดสินความหมาย คนตัดสินความเสี่ยง</gen>
    <do>เขียนรายการการตรวจของโปรเจกต์ไว้ในสามแถวของตาราง แถวว่างหมายความว่าจุดตรวจแบบนั้นยังขาดอยู่</do>
  </b-finding>
</b-chapter>

<b-chapter id="gives" icon="trend-up" title="จุดตรวจให้คุณภาพอะไร และต้องจ่ายเท่าใด">
  <b-why align="left">ตัวเลขด้านล่างมาจากสี่แหล่งแยกกัน คือบทความของ Anthropic สองชิ้น (24 Mar 2026 และ 5 Feb 2026) บล็อกวิศวกรรมของ Stripe และ Spotify และรายงาน DORA 2025 ไม่มีงานศึกษาจากกลุ่มตัวอย่าง ไม่มีใครเผยแพร่การเปรียบเทียบ “มีจุดตรวจกับไม่มี” บนงานหลายร้อยชิ้น ตัวเลขแต่ละตัวจึงเป็นตัวอย่าง ลิงก์ข้างตัวเลขแสดงว่ามาจากไหน</b-why>
  <b-art names="quality-gates-ai-agents/cost-quality" wide/>
  <b-cap>หนึ่งคำขอ: เอเจนต์ตัวเดียว กับเอเจนต์ที่มีผู้รีวิว</b-cap>
  <b-rules cols="2">
    <rule icon="flask" t="Anthropic: หนึ่งคำขอ สองการรัน">เอเจนต์ตัวเดียว: 20 นาทีและ 9 ดอลลาร์ ฟีเจอร์หลักใช้งานไม่ได้ เอเจนต์ที่มีผู้รีวิว: 6 ชั่วโมงและ 200 ดอลลาร์ ผลลัพธ์ใช้งานได้<b-proof href="https://www.anthropic.com/engineering/harness-design-long-running-apps" quote="Anthropic: „The harness was over 20x more expensive, but the difference in output quality was immediately apparent.“"/> กับ Opus 4.6: 3 ชั่วโมง 50 นาที และ 124.70 ดอลลาร์ คุ้มค่ากับงานที่โมเดลทำเองคนเดียวไม่น่าเชื่อถือ<b-proof href="https://www.anthropic.com/engineering/harness-design-long-running-apps" quote="Anthropic: „It is worth the cost when the task sits beyond what the current model does reliably solo.“"/></rule>
    <rule icon="modules" t="Stripe: ขนาด">PR ที่ merge แล้วมากกว่าหนึ่งพันรายการต่อสัปดาห์เขียนโดยเอเจนต์และรีวิวโดยคน<b-proof href="https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents" quote="Stripe: „Over a thousand pull requests merged each week at Stripe are completely minion-produced, and while they're human-reviewed, they contain no human-written code.“"/> ขั้นที่ไม่มีโมเดลคั่นอยู่ระหว่างขั้นของโมเดล คือ linter ใน 5 วินาที รัน CI อย่างมากสองครั้ง แล้วจึงส่ง branch ให้คน<b-proof href="https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents-part-2" quote="Stripe, part 2: „those particular nodes don't invoke an LLM at all—they just run code“"/></rule>
    <rule icon="refresh-cw" t="Spotify: ผู้ตัดสิน">ตัวตรวจ (verifier) รันเอง เอเจนต์ไม่รู้จักมัน ผู้ตัดสินตรวจความหมาย ไม่มีตัวเลขก่อนและหลัง มีเพียงการยับยั้งหนึ่งในสี่ของเซสชัน และการแก้ไขสำเร็จครึ่งหนึ่งของกรณีเหล่านั้น (คำอ้างอิงอยู่ในส่วนก่อนหน้า)</rule>
    <rule icon="chart-line" t="DORA 2025: ความเร็วและความเสถียร">AI เพิ่มความเร็วในการส่งมอบแต่ลดความเสถียร<b-proof href="https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report" quote="DORA 2025: „AI adoption does continue to have a negative relationship with software delivery stability.“"/> ข้อโต้แย้งที่ว่า “ความไม่เสถียรคุ้มทุนเองด้วยการแก้ไขที่เร็ว” ไม่พบหลักฐานสนับสนุน<b-proof href="https://services.google.com/fh/files/misc/2025_state_of_ai_assisted_software_development.pdf" quote="DORA 2025, p. 41: „We found no evidence of such a moderating effect.“"/> ข้อสรุปของผู้เขียน: จุดตรวจทำให้ความเร็วไม่ต้องแลกด้วยความเสถียร รายงานไม่ได้กล่าวถึงจุดตรวจ</rule>
  </b-rules>
  <b-finding>
    <ex>ผู้รีวิวกับเกณฑ์ขั้นต่ำเปลี่ยนแอปพลิเคชันที่พังให้ใช้งานได้ในราคาที่แพงขึ้น 20 เท่า Stripe และ Spotify ได้ขนาดมาเพราะการตรวจที่ตั้งอยู่รอบเอเจนต์</ex>
    <gen>จุดตรวจมีค่าใช้จ่ายทั้งเงินและเวลา คุ้มในที่ที่เอเจนต์ที่ไม่มีมันส่งผลลัพธ์ที่พัง หรือข้อผิดพลาดที่ต้องจ่ายแพงภายหลัง</gen>
    <do>สำหรับงานของคุณ ประเมินราคาของข้อผิดพลาดหนึ่งครั้งที่ไปถึงการรีวิวโดยคน และราคาของการรันการตรวจหนึ่งครั้ง ถ้าอย่างแรกสูงกว่า จุดตรวจก็คุ้ม</do>
  </b-finding>
</b-chapter>

<b-chapter id="auto" icon="gauge" title="จุดตรวจทำให้ทำงานเองได้นานขึ้นอย่างไร: เลขคณิตและช่องว่างในข้อมูล">
  <b-callout icon="bulb">โมเดลภาษาเก็บภาพร่างคร่าว ๆ ของโลก ไม่ใช่ตัวโลกเอง เมื่อเอเจนต์ตรวจขั้นตอนของตัวเองกับความเป็นจริง (เทสต์ คำตอบของระบบ) และรักษาบริบทให้เป็นระเบียบ ข้อผิดพลาดจะถูกพบและแก้ งานวิจัยเรื่องการแก้ไขตัวเองสนับสนุนข้อนี้ การแก้ตัวเองช่วยได้เมื่อมีสัญญาณที่เชื่อถือได้จากภายนอก และบางครั้งทำร้ายเมื่อไม่มี “ยิ่งยาวยิ่งดี” เป็นจริงเฉพาะเมื่อมีการตรวจเช่นนั้น คุณภาพลดลงกับอินพุตที่ยาว และในบางงาน สายการให้เหตุผลที่ยาวขึ้นให้คำตอบที่แย่ลง จุดตรวจให้ทั้งการตรวจและความเป็นระเบียบ งานจึงรันได้นานขึ้นโดยไม่เสียคุณภาพ ไม่มีข้อมูลจากกลุ่มตัวอย่างว่า “จุดตรวจทำให้การทำงานเองยาวขึ้น” ด้านล่างคือข้อเท็จจริงที่แนวคิดนี้อาศัย</b-callout>
  <b-why align="left"><b-icon name="bar-chart"/> **task horizon คืออะไร** METR วัดความยาวของงานที่เอเจนต์ทำสำเร็จได้ด้วยความน่าจะเป็นที่กำหนด โดยวัดเป็นเวลาที่คนต้องใช้กับงานนั้น นี่ไม่ใช่เวลารันของเอเจนต์<b-proof href="https://metr.org/time-horizons" quote="METR: „It's a measure of the difficulty of a task, rather than the time an AI spends to complete the task.“"/> สำหรับ Claude Opus 4.6 horizon ที่อัตราสำเร็จ 50% อยู่ที่ราว 12 ชั่วโมง (ช่วงความเชื่อมั่นตั้งแต่ 5 ถึง 61 ชั่วโมง) และที่ 80% ราว 70 นาที สำหรับ GPT-5.4 คือ 5.7 ชั่วโมงและ 54 นาที เหนือ 16 ชั่วโมง METR ถือว่าการวัดไม่น่าเชื่อถือ<b-proof href="https://metr.org/time-horizons" quote="METR: „Measurements above 16 hrs are unreliable with our current task suite.“"/> ตัวชี้วัดการทำงานเองทำงานอย่างไรและคนอยู่ตรงไหนในนั้น อยู่ในบทความ [“การส่งต่อให้คนในเอเจนต์ AI”](/blog/agent-escalation-to-human/#measure)</b-why>
  <b-why align="left"><b-icon name="chart-axes"/> **ราคาของความน่าเชื่อถือ** Toby Ord แสดงว่าเมื่อโอกาสล้มเหลวต่อนาทีของงานคงที่ horizon เชื่อมกันด้วยสูตร<b-proof href="https://arxiv.org/pdf/2505.05115" quote="Ord: „the time horizon for a success probability of p would be ln(p)/ln(q) times as long as one with success probability q.“"/> ผลที่ตามมา: horizon ที่อัตราสำเร็จ 80% อยู่ราวหนึ่งในสามของที่ 50% ที่ 90% ราวหนึ่งในเจ็ด ที่ 99% ราวหนึ่งในเจ็ดสิบ “เลขเก้า” ที่เพิ่มขึ้นทุกตัวของความน่าเชื่อถือต้องแลกด้วยความยาวของงาน</b-why>
  <b-art names="quality-gates-ai-agents/autonomy-curve" wide/>
  <b-cap>ตัวอย่างการคำนวณ: ที่อัตราสำเร็จ 95% ต่อขั้น เหลือโอกาส 36% หลัง 20 ขั้น และที่ 99% ต่อขั้นเหลือ 82%</b-cap>
  <b-why align="left"><b-icon name="shield-check"/> **จุดตรวจอยู่ตรงไหนที่นี่** จุดตรวจที่ขั้นหนึ่งเพิ่มความน่าเชื่อถือของขั้นนั้น ถ้าขั้นหนึ่งล้มเหลวด้วยโอกาส 5% และจุดตรวจจับข้อผิดพลาดได้ 4 ใน 5 แล้วส่งเอเจนต์กลับไปแก้ ขั้นนั้นจะพังใน 1% ของกรณี เลขคณิตนี้สมมติว่าแต่ละขั้นเป็นอิสระต่อกัน Ord เองก็ระบุว่าสำหรับ Claude 3.7 Sonnet อัตราส่วนของ horizon ที่วัดได้คือ 0.25 ขณะที่ทฤษฎีให้ 0.32 แผนภูมิแสดงทิศทาง 82% เป็นการคำนวณที่ไม่มีผลการวัดอยู่เบื้องหลัง</b-why>
  <b-why align="left"><b-icon name="file-text"/> **กลไกของ Anthropic สองอย่างสำหรับการรันยาว** อย่างแรก: แต่ละเซสชันของเอเจนต์เริ่มโดยไม่มีความจำของเซสชันก่อนหน้า และการย่อบทสนทนาไม่เพียงพอ<b-proof href="https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents" quote="Anthropic: „compaction isn’t sufficient“"/> ดังนั้นเมื่อเริ่ม เอเจนต์เขียนรายการฟีเจอร์กว่า 200 รายการ ทุกรายการมีเครื่องหมาย “failing” เอเจนต์เปลี่ยนได้เฉพาะเครื่องหมายผ่าน และห้ามแก้ไขเทสต์เอง<b-proof href="https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents" quote="Anthropic: „It is unacceptable to remove or edit tests because this could lead to missing or buggy functionality.“"/> รายการเช่นนี้คือสถานะของจุดตรวจที่อยู่ในไฟล์นอกบทสนทนา เซสชันใหม่เห็นว่าเหลืออีกเท่าใด และตัดสินเองไม่ได้ว่าทุกอย่างเสร็จแล้ว</b-why>
  <b-why align="left"><b-icon name="alert-circle"/> กลไกที่สองเกี่ยวกับ “ความกังวลเรื่องบริบท” (context anxiety) โมเดลเริ่มสรุปงานเมื่อคิดว่าหน้าต่างบริบทใกล้หมด<b-proof href="https://cognition.com/blog/devin-sonnet-4-5-lessons-and-challenges" quote="Cognition: „we found the model taking shortcuts or leaving tasks incomplete when it believed it was near the end of its window, even when it had plenty of room left.“"/> จุดตรวจที่มีเกณฑ์จากรายการทำให้การตัดสินใจจบงานขึ้นกับเครื่องหมายสีเขียว และความรู้สึกของเอเจนต์ไม่มีส่วนร่วม จึงสรุปได้ว่า bounded context ควรมีขนาดพอดีกับหน้าต่างบริบทจริง</b-why>
  <b-why align="left"><b-icon name="refresh-cw"/> **hook ในฐานะกลไกให้ทำต่อ** ใน Claude Code hook เมื่องานเสร็จไม่ยอมให้ปิดงานจนกว่าการตรวจจะผ่าน<b-proof href="https://code.claude.com/docs/en/hooks" quote="Claude Code Docs, TaskCompleted: „Use this to enforce completion criteria like passing tests or lint checks before a task can close.“"/> ข้อความปฏิเสธย้อนกลับไปหาเอเจนต์และมันทำต่อ stop hook ทำงานแบบเดียวกันสำหรับการจบทั้งเทิร์น</b-why>
  <b-finding>
    <ex>เอเจนต์ทำ 20 ขั้น หากไม่มีจุดตรวจ โอกาสผ่านทั้งหมดโดยไม่มีข้อผิดพลาดเลยอยู่ราว 36% จุดตรวจที่จับข้อผิดพลาดได้ 4 ใน 5 ในทุกขั้นยกขึ้นเป็นราว 82% ตามการคำนวณ</ex>
    <gen>จุดตรวจให้การทำงานเองผ่านความน่าเชื่อถือของแต่ละขั้น ยิ่งข้อผิดพลาดผ่านต่อไปน้อย ก็ยิ่งปล่อยงานที่ยาวกว่าไว้โดยไม่ต้องเฝ้าได้ ไม่มีการวัดโดยตรง นี่จึงเป็นการคำนวณและสมมติฐาน</gen>
    <do>เก็บบันทึกว่าเอเจนต์ผ่านกี่ขั้นโดยไม่มีคนเข้ามาแทรกก่อนและหลังเพิ่มจุดตรวจ ภายในหนึ่งเดือนคุณจะมีตัวเลขของตัวเอง</do>
  </b-finding>
</b-chapter>

<b-chapter id="where" icon="workflow" title="วางไว้ที่ไหน: ที่ขอบเขตของ bounded context">
  <b-why align="left">จุดตรวจควรอยู่ที่ขอบเขตของ bounded context ด้วยสี่เหตุผล และแต่ละข้อมีแหล่งสนับสนุน</b-why>
  <b-why align="left"><b-icon name="ring-dot"/> **1. การตรวจภายในกรอบมีขอบเขตจำกัด** ไม่มีการตรวจใดยืนยันโปรแกรมใดก็ได้กับกฎใดก็ได้ การตรวจจึงไปอยู่ที่ที่กรอบจำกัดคำถาม เหตุใดจึงเป็นเช่นนี้และขอบเขตของ aggregate กลายเป็นจุดตรวจได้อย่างไร อยู่ในบทความ [“จะตรวจงานของเอเจนต์ AI ที่ไหน”](/blog/agent-checkpoint/) สำหรับจุดตรวจ ผลที่ตามมาคือ จุดตรวจที่ไม่มีขอบเขตจะตอบว่า “ไม่แน่ใจ” บ่อยเกินไป</b-why>
  <b-why align="left"><b-icon name="scissors"/> **2. การเปลี่ยนแปลงเล็กสำเร็จบ่อยกว่า** ยิ่งเอเจนต์เปลี่ยนมากในครั้งเดียว งานก็ยิ่งสำเร็จน้อยลง ขอบเขตของบริบทจำกัดขนาดของการเปลี่ยนแปลงโดยธรรมชาติ</b-why>
  <b-art names="quality-gates-ai-agents/size-success" wide/>
  <b-why align="left">ตัวเลขบนแผนภูมิมาจากสองงาน คือ [SWE-bench Live](https://arxiv.org/abs/2505.23419) และเอเจนต์ Kozuchi บน SWE-bench Verified ([arXiv 2608.15579](https://arxiv.org/abs/2608.15579)) เบนช์มาร์กและเอเจนต์ต่างกัน สิ่งสำคัญจึงเป็นทิศทาง ยิ่งการเปลี่ยนแปลงใหญ่ ก็ยิ่งสำเร็จน้อยลง ในระดับทีม DORA แสดงสิ่งเดียวกัน คือประโยชน์ของ AI ขึ้นกับการทำงานเป็นชุดเล็ก<b-proof href="https://services.google.com/fh/files/misc/2025_state_of_ai_assisted_software_development.pdf" quote="DORA 2025, p. 58: „With a high degree of certainty, we found that AI adoption's positive benefits depend on teams working in small batches“"/></b-why>
  <b-why align="left">บน SWE-bench Live การเปลี่ยนแปลงในไฟล์เดียวไม่ถึงห้าบรรทัดแก้ได้เกือบครึ่งหนึ่งของกรณี (48%) สามไฟล์ขึ้นไปหรือเกินร้อยบรรทัดต่ำกว่า 10% และเจ็ดไฟล์ขึ้นไปไม่เคยสำเร็จ ([arXiv 2505.23419](https://arxiv.org/abs/2505.23419)) เอเจนต์ Kozuchi บน SWE-bench Verified แก้ได้ 81.7% ของงานที่เปลี่ยน 1–4 บรรทัด และ 41.7% เมื่อเปลี่ยนเกิน 100 บรรทัด ([arXiv 2608.15579](https://arxiv.org/abs/2608.15579)) เบนช์มาร์กและเอเจนต์ต่างกัน สิ่งสำคัญจึงเป็นทิศทาง DORA เพิ่มข้อสรุประดับทีม คือประโยชน์ของ AI ขึ้นกับการทำงานเป็นชุดเล็ก<b-proof href="https://services.google.com/fh/files/misc/2025_state_of_ai_assisted_software_development.pdf" quote="DORA 2025, p. 58: „With a high degree of certainty, we found that AI adoption's positive benefits depend on teams working in small batches“"/></b-why>
  <b-why align="left"><b-icon name="database"/> **3. หน้าต่างบริบทมีจำกัด** บริบทเป็นทรัพยากรจำกัดที่ผลตอบแทนลดลง<b-proof href="https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents" quote="Anthropic: context is „a finite resource with diminishing marginal returns“"/> Chroma ทดสอบ 18 โมเดลและแสดงว่าความน่าเชื่อถือลดลงเมื่ออินพุตยาวขึ้น<b-proof href="https://www.trychroma.com/research/context-rot" quote="Chroma, Context Rot: „performance grows increasingly unreliable as input length grows“"/> ในการบรรยายปี 2024 Evans ตั้งข้อสังเกตว่าคำตอบของโมเดลนิ่งกว่าเมื่อแบ่งคำขอเป็นชิ้นเล็กลง (ตามที่ InfoQ รายงาน) bounded context เล็กให้เอเจนต์มีหน้าต่างสั้น และจุดตรวจมีโอกาสน้อยลงที่จะตรวจสิ่งที่เอเจนต์จำไม่ได้แล้ว</b-why>
  <b-art names="quality-gates-ai-agents/contexts" wide/>
  <b-cap>แต่ละ context มีเอเจนต์ของตัวเอง หน้าต่างเล็กของตัวเอง ชุดฟังก์ชัน MCP ของตัวเอง และจุดตรวจที่ขอบเขต อีเวนต์เดินทางระหว่าง context</b-cap>
  <b-why align="left"><b-icon name="swap"/> **4. ที่ขอบเขตเห็นชัดว่าใครผิด** ในการออกแบบแบบสัญญา (design by contract) ของ Bertrand Meyer การละเมิดเงื่อนไขก่อน (precondition) คือบั๊กของผู้เรียก และการละเมิดเงื่อนไขหลัง (postcondition) คือบั๊กของผู้ให้บริการ<b-proof href="https://se.inf.ethz.ch/~meyer/publications/computer/contract.pdf" quote="Meyer, 1992: „A precondition violation indicates a bug in the client (caller).“ and „A postcondition violation is a bug in the supplier (routine).“"/> จุดตรวจที่ขอบเขตแสดงทันทีว่าเป็นบั๊กของใคร คือคำสั่งแย่เข้ามาหรืออีเวนต์แย่ออกไป Evans แนะนำให้วางชั้นป้องกันที่ขอบเขตเพื่อแปลแนวคิดของคนอื่นเป็นของตน<b-proof href="https://www.domainlanguage.com/wp-content/uploads/2016/05/DDD_Reference_2015-03.pdf" quote="Evans, DDD Reference: „As a downstream client, create an isolating layer to provide your system with functionality of the upstream system in terms of your own domain model.“"/> จุดตรวจอยู่บนชั้นนั้น</b-why>
  <b-why align="left">bounded context และ aggregate คืออะไร และจำนวน context สัมพันธ์กับจำนวนเอเจนต์อย่างไร อยู่ในบทความ [“ต้องใช้เอเจนต์ AI กี่ตัว”](/blog/agents-per-bounded-context/) และ [“สเปกตาม aggregate”](/blog/specs-by-aggregates/)</b-why>
  <b-finding>
    <ex>context “การจอง” และ “การชำระเงิน” แต่ละอันมีเอเจนต์ของตัวเอง ชุดฟังก์ชัน MCP สามฟังก์ชันของตัวเอง และจุดตรวจของตัวเอง อีเวนต์ BookingCreated ผ่านจุดตรวจของการจองขาออก และจุดตรวจของการชำระเงินขาเข้า หากการชำระเงินปฏิเสธอีเวนต์ ก็เห็นว่าการละเมิดอยู่ฝั่งใด</ex>
    <gen>ขอบเขตของ bounded context ให้จุดตรวจสี่อย่างพร้อมกัน คือการตรวจที่มีขอบเขตจำกัด การเปลี่ยนแปลงเล็ก หน้าต่างสั้น และผู้ผิดที่ชัดเจน</gen>
    <do>เลือกหนึ่ง context แล้วเขียนสามอย่างที่ขอบเขตของมัน คือรับคำสั่งอะไร ส่งอีเวนต์อะไร และกฎข้อใดเป็นจริงเสมอ นั่นคือสิ่งที่จุดตรวจตรวจ</do>
  </b-finding>
</b-chapter>

<b-chapter id="mcp" icon="package" title="MCP: สิทธิ์ ชุดฟังก์ชัน และที่ตั้งของจุดตรวจ">
  <b-why align="left">[MCP](/blog/mcp-agent-access/) คือโปรโตคอลที่เอเจนต์ใช้เรียกฟังก์ชันของระบบภายนอก มีความสำคัญต่อจุดตรวจสองทาง เซิร์ฟเวอร์ MCP จำกัดสิ่งที่เอเจนต์เข้าถึงได้อย่างเด็ดขาด และชุดฟังก์ชันกำหนดว่าเอเจนต์ใช้บริบทไปกับคำอธิบายมากเพียงใด</b-why>
  <b-subhead>สิ่งที่เซิร์ฟเวอร์ MCP ห้ามได้ และสิ่งที่ทำได้เพียงแนะนำ</b-subhead>
  <b-table>

| กลไก | ความแข็งแรง | สิ่งที่สเปกระบุ |
|---|---|---|
| <b-status-dot color="accent">สิทธิ์และ scope</b-status-dot> | การห้าม | เมื่อสิทธิ์ไม่พอ เซิร์ฟเวอร์ตอบ 403 และระบุ scope ที่ต้องการ ในเวอร์ชัน 2026-07-28 รายการฟังก์ชันอาจขึ้นกับสิทธิ์ของผู้เรียก |
| <b-status-dot color="accent">ผลลัพธ์ตาม schema</b-status-dot> | คำตัดสิน | เซิร์ฟเวอร์ต้องคืนผลลัพธ์ที่ตรงกับ schema ที่ประกาศไว้ คำตัดสิน “รับ / ไม่รับ” จึงเครื่องอ่านได้ |
| <b-status-dot color="accent">คำถามถึงคน</b-status-dot> | คำถาม | เซิร์ฟเวอร์ถามคนได้ คำตอบคือ accept, decline หรือ cancel |
| <b-status-dot color="warn">ป้ายกำกับฟังก์ชัน</b-status-dot> | คำใบ้ | “read-only”, “destructive” เป็นคำใบ้ และไคลเอนต์ไม่จำเป็นต้องเชื่อ |
| <b-status-dot color="warn">โฟลเดอร์ราก</b-status-dot> | คำใบ้ | เซิร์ฟเวอร์ “ควร” เคารพขอบเขต แต่ไม่มีอะไรบังคับ |

  </b-table>
  <b-why align="left">ข้อยืนยันจากสเปก: ผลลัพธ์ตาม schema<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28/server/tools" quote="MCP, 2026-07-28: „Servers MUST provide structured results that conform to this schema.“"/> รายการฟังก์ชันตามสิทธิ์<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28/server/tools" quote="MCP, 2026-07-28: the function list „MAY vary by the authorization presented on the request — for example, returning only the tools the caller's granted scopes permit“"/> และป้ายกำกับฟังก์ชัน<b-proof href="https://github.com/modelcontextprotocol/modelcontextprotocol" quote="MCP, schema.ts: „NOTE: all properties in ToolAnnotations are hints.“"/> อ่านเพิ่มเติมเรื่อง scope ของเซิร์ฟเวอร์ MCP ใน Claude Code ได้ในบทความ [“scope ของ MCP”](/blog/mcp-scopes/)</b-why>
  <b-subhead>ชุดฟังก์ชันที่แคบ: สองผลจากกลไกเดียว</b-subhead>
  <b-art names="quality-gates-ai-agents/mcp-sets" wide/>
  <b-cap>คำอธิบายของ 58 ฟังก์ชันใช้ราว 55 พันโทเค็น เมื่อค้นหาฟังก์ชัน ฟังก์ชันที่ต้องใช้จะโหลดตามต้องการ ราว 8.7 พัน</b-cap>
  <b-why align="left"><b-icon name="package"/> **ผลแรกคือบริบท** Anthropic แสดงว่า 58 ฟังก์ชันใช้ราว 55 พันโทเค็น และราว 8.7 พันเมื่อค้นหาฟังก์ชัน ขณะที่ความแม่นยำในการเลือกฟังก์ชันเพิ่มขึ้นสำหรับ Opus 4 จาก 49% เป็น 74% และสำหรับ Opus 4.5 จาก 79.5% เป็น 88.1% ในอีกตัวอย่างหนึ่ง การรันโค้ดแทนการเรียกตรงลดการใช้จาก 150,000 เหลือ 2,000 โทเค็น ข้อสรุปของ Anthropic เอง: ฟังก์ชันมากขึ้นไม่ได้หมายความว่าผลลัพธ์ดีขึ้น</b-why>
  <b-why align="left"><b-icon name="lock"/> **ผลที่สองคือสิทธิ์** การตั้งค่าเดียวกันจำกัดสิทธิ์ ใน Claude Code subagent มีรายการฟังก์ชันที่อนุญาต รายการที่ห้าม และชุดเซิร์ฟเวอร์ MCP ของตัวเองที่บทสนทนาหลักไม่มี หนึ่งชุดแคบต่อหนึ่ง bounded context หมายถึงทั้งหน้าต่างสั้นและโอกาสทำพังน้อยลง นี่คือข้อสรุปของผู้เขียน ตัวเลขข้างต้นวัดเป็นโทเค็น และไม่มีตัวเลขด้านความปลอดภัย</b-why>
  <b-subhead>เหตุใดจุดตรวจอยู่หลัง MCP และเหตุใดเอเจนต์ไม่มีแรงจูงใจให้หยุด</b-subhead>
  <b-callout icon="help-circle">**สมมติฐานของผู้เขียน กำลังเตรียมงานวิจัย** เอเจนต์ถูกวัด และตามที่ผู้เขียนสันนิษฐาน ถูกปรับให้เหมาะกับเวลารันแบบอัตโนมัติ ตัวชี้วัดความก้าวหน้าหลักคือความยาวของงานที่เอเจนต์ทำโดยไม่มีคน (METR) MCP มีคำขอถึงคน คือเซิร์ฟเวอร์ถามได้ และคำตอบคือ “accept” “decline” หรือ “cancel” สำหรับตัวชี้วัดเช่นนั้น ทุกคำถามถึงคนคือการสูญเสียความเป็นอัตโนมัติ เอเจนต์จึงไม่มีแรงจูงใจให้หยุดถาม นอกจากนี้ MCP เป็นคอขวดแคบ การเรียกฟังก์ชันและคำตอบผ่านมันได้ แต่ความหมายของงานทั้งหมดผ่านไม่ได้ ข้อสรุป: จุดตรวจพึ่งความเต็มใจของเอเจนต์ไม่ได้ มันอยู่นอกเอเจนต์ หลังตัวกั้น เอเจนต์ถูกฝึกจริงอย่างไรและตัวชี้วัดถูกนับอย่างไร ผู้เขียนยังไม่ได้ตรวจสอบ และมีบทความแยกต่างหากเรื่องนี้</b-callout>
  <b-why align="left">ขอบเขตที่คล้ายกันอยู่ระหว่างคำสั่งของเอเจนต์ (control plane) กับข้อมูลที่มันอ่าน (data plane) ข้อมูลต้องไม่กลายเป็นคำสั่ง การบรรยายของผู้เขียนที่ Podlodka AI Crew เป็นเรื่องนี้ [“เอเจนต์ AI ใน production: สถาปัตยกรรม การป้องกัน เศรษฐศาสตร์”](/decks/ai-agent-architecture/) (สไลด์เป็นภาษารัสเซีย) และบทความ [“Data plane และ control plane ของเอเจนต์”](/blog/data-plane-control-plane-prompt-injection/) ก็เช่นกัน</b-why>
  <b-subhead>จุดตรวจควรอยู่ตรงไหน: นอกเอเจนต์</b-subhead>
  <b-art names="quality-gates-ai-agents/outside-agent" wide/>
  <b-cap>กฎในข้อความที่เอเจนต์หลบได้ จุดตรวจใน hook ฝั่งไคลเอนต์หรือในสิทธิ์ฝั่งเซิร์ฟเวอร์ที่หลบไม่ได้</b-cap>
  <b-table>

| จุดตรวจอยู่ที่ไหน | ความน่าเชื่อถือ | เหตุผล |
|---|---|---|
| วลีในคำสั่ง | <b-status-dot color="warn">คำแนะนำ</b-status-dot> | เอเจนต์ข้ามได้ |
| hook ฝั่งไคลเอนต์ก่อนการเรียก | <b-status-dot color="accent">การห้าม</b-status-dot> | บล็อกการเรียกฟังก์ชัน MCP ตามรูปแบบของชื่อเซิร์ฟเวอร์และชื่อฟังก์ชัน |
| stop hook | <b-status-dot color="accent">การห้าม</b-status-dot> | ไม่ให้เทิร์นจบจนกว่าการตรวจจะผ่าน |
| hook หลังการเรียก | <b-status-dot color="warn">สัญญาณ</b-status-dot> | ฟังก์ชันรันไปแล้ว |
| สิทธิ์ฝั่งเซิร์ฟเวอร์ | <b-status-dot color="accent">การห้าม</b-status-dot> | การตรวจอยู่ในระบบที่เอเจนต์เรียก |

  </b-table>
  <b-why align="left">ตามเอกสารของ Claude Code: hook ก่อนการเรียกบล็อกการเรียก stop hook ไม่ให้ Claude จบเทิร์น และ hook เมื่องานเสร็จไม่ให้ปิดงาน hook หลังการเรียกไม่บล็อกอะไร ฟังก์ชันรันไปแล้ว คำใบ้ในข้อความยังเป็นเพียงคำแนะนำ ดังที่ผู้เขียนบทวิเคราะห์ stop hook ตั้งข้อสังเกต<b-proof href="https://fbakkensen.github.io/ai/devtools/development/2026/03/27/quality-gates-for-coding-agents-how-stop-hooks-make-validation-mandatory.html" quote="fbakkensen: „prompt instructions are suggestions, not constraints.“"/> OWASP แนะนำให้ตรวจสิทธิ์ที่ที่การกระทำถูกดำเนินการ<b-proof href="https://genai.owasp.org/llmrisk/llm062025-excessive-agency/" quote="OWASP LLM06:2025: „Complete mediation: Implement authorization in downstream systems rather than relying on an LLM to decide if an action is allowed or not.“"/></b-why>
  <b-why align="left"><b-icon name="alert-circle"/> **จุดอ่อน: การตรวจที่เอเจนต์เรียกเอง** ถ้าการตรวจเป็นฟังก์ชัน MCP เอเจนต์จะเรียกหรือไม่เรียกก็ได้ และเมื่อไม่เรียกก็ไม่มีคำตัดสิน เซิร์ฟเวอร์จุดตรวจสำหรับเอเจนต์ที่มีสำเร็จรูปทำงานแบบนี้ เอเจนต์ส่งหลักฐานเอง และเซิร์ฟเวอร์คืนคำตัดสินแล้วต่อท้ายลงในบันทึกที่รายการเชื่อมกันด้วยแฮช<b-proof href="https://github.com/Jott2121/agent-gate" quote="agent-gate README: „MCP server that adds a fail-closed quality gate and hash-chained receipt ledger to any AI agent workflow.“"/> นั่นคือการตรวจตัวเองพร้อมจุดบอดจากส่วนว่าด้วยการตรวจงานตัวเอง ไคลเอนต์ยังต้องถือว่าป้ายกำกับฟังก์ชันเชื่อถือไม่ได้<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28/server/tools" quote="MCP: „clients MUST consider tool annotations to be untrusted unless they come from trusted servers.“"/> ปลอดภัยกว่าเมื่อ hook หรือ orchestrator เรียกเซิร์ฟเวอร์คำตัดสิน เอเจนต์หลบคำตัดสินไม่ได้</b-why>
  <b-why align="left"><b-icon name="search"/> **โปรแกรมสำเร็จรูปที่ผู้เขียนไม่พบ** เกตเวย์ MCP ครอบคลุมสิทธิ์ ความลับ และการรั่วไหล: agentgateway (โปรเจกต์ของ Linux Foundation) และเกตเวย์ของ Microsoft, Docker และ Lasso ผู้เขียนไม่พบจุดตรวจสำหรับ “งานทำถูกต้อง” ในนั้น ชุดจุดตรวจคุณภาพของ Microsoft สำหรับการพัฒนาแบบขับเคลื่อนด้วยสเปกกลายเป็นเช็กลิสต์สำหรับตัวเอเจนต์เอง ไม่มีเซิร์ฟเวอร์อยู่ในนั้น</b-why>
  <b-finding>
    <ex>เอเจนต์เชื่อมต่อเฉพาะฟังก์ชันของ context ตัวเอง stop hook รันเทสต์และเรียกเซิร์ฟเวอร์ตรวจกฎการจอง เอเจนต์เห็นข้อความข้อผิดพลาดแต่เขียนคำตัดสินเองไม่ได้</ex>
    <gen>ชุดฟังก์ชันที่แคบประหยัดบริบทและจำกัดสิทธิ์ และจุดตรวจนอกเอเจนต์ไม่ให้หลบการตรวจได้ คำตัดสินมาจากโปรแกรมที่เอเจนต์ควบคุมไม่ได้</gen>
    <do>สำหรับหนึ่ง context ให้ระบุฟังก์ชัน MCP ที่เอเจนต์ต้องใช้ แล้วปิดที่เหลือ จากนั้นตั้ง hook ที่รันการตรวจโดยไม่ต้องให้เอเจนต์เกี่ยวข้อง</do>
  </b-finding>
</b-chapter>

<b-chapter id="limits" icon="alert-circle" title="ข้อจำกัดของจุดตรวจ: ถูกหลบได้อย่างไร และเหตุใดจึงพังเอง">
  <b-art names="quality-gates-ai-agents/bypass" wide/>
  <b-cap>สี่ทางอ้อมจุดตรวจ: แก้เทสต์ ทำเฉพาะกรณีให้เทสต์ผ่าน เจตนาที่ซ่อนไว้ และผู้รีวิวที่ชินกับมัน</b-cap>
  <b-why align="left"><b-icon name="bug"/> **เอเจนต์ปรับผลลัพธ์ให้เข้ากับการตรวจ** METR บันทึกว่า o3 โกงการประเมินใน 0.7% ของการรัน และในงานหนึ่งโกง 21 ครั้งจาก 21<b-proof href="https://metr.org/blog/2025-06-05-recent-reward-hacking" quote="METR: „o3 reward-hacks in 0.7% of runs across all HCAST tasks“"/> ใน system card ของ Claude 3.7 Sonnet Anthropic ยอมรับว่าโมเดลบางครั้งคืนค่าที่เทสต์คาดหวังแทนคำตอบทั่วไป หรือแก้ตัวเทสต์เอง ImpossibleBench ทำให้เทสต์ขัดแย้งกับโจทย์และนับการผ่านทุกครั้งว่าเป็นการโกง GPT-5 โกงใน 54% ของกรณี<b-proof href="https://arxiv.org/abs/2510.20270" quote="ImpossibleBench: GPT-5 „cheats 54.0% of the time on Conflicting-SWEbench“"/> เทสต์แบบอ่านอย่างเดียวขจัดการแก้เทสต์ แต่ไม่ขจัดการทำเฉพาะกรณี<b-proof href="https://arxiv.org/abs/2510.20270" quote="ImpossibleBench: read-only tests „restores legitimate performance while preventing test modification attempts“"/></b-why>
  <b-why align="left"><b-icon name="eye"/> **การเฝ้าดูการให้เหตุผลดีกว่า แต่อย่ากดดันมัน** ตัวเฝ้าดูการกระทำจับการโกงได้ 60% ตัวเฝ้าดูการให้เหตุผลจับได้ 95%<b-proof href="https://arxiv.org/abs/2503.11926" quote="Baker et al.: the action monitor „achieves only 60% recall overall“, the reasoning monitor 95%"/> แต่หากเอเจนต์ถูกฝึกโดยกดดันการให้เหตุผลของมัน recall ของตัวเฝ้าดูลดลงเกือบเป็นศูนย์ เพราะเอเจนต์เรียนรู้ที่จะซ่อนเจตนา<b-proof href="https://arxiv.org/abs/2503.11926" quote="Baker et al.: „the CoT monitor’s recall falls to near zero, indicating that the agent has learned to hide its intent“"/></b-why>
  <b-why align="left"><b-icon name="refresh-cw"/> **จุดตรวจที่ปฏิเสธไม่รู้จบ** ใน Claude Code หลังจาก stop hook ปฏิเสธติดกันแปดครั้ง โปรแกรมจบเทิร์นเอง<b-proof href="https://code.claude.com/docs/en/hooks" quote="Claude Code Docs: „after stop hooks have continued the turn eight times in a row, Claude Code overrides the next block and ends the turn.“"/> เปลี่ยนขีดจำกัดได้ด้วยตัวแปรสภาพแวดล้อม แต่หลักการยังอยู่ จุดตรวจต้องมีขีดจำกัดจำนวนครั้งและการส่งต่อให้คน ที่ Stripe คือรัน CI อย่างมากสองครั้ง และ devsquad ของ Microsoft อนุญาตให้แก้ไขสองครั้ง<b-proof href="https://github.com/microsoft/devsquad-copilot" quote="Microsoft devsquad: „Maximum of 2 correction iterations. If after 2 attempts there are still failures, deliver the artifact with documented failures for human decision.“"/></b-why>
  <b-why align="left"><b-icon name="scales"/> **จุดตรวจที่เข้มงวดเกินไป** ตามรายงานของ InfoQ เรื่องการบรรยาย QCon London ของ Spotify เผยแพร่เมื่อ 18 มีนาคม 2026 พบว่าผู้ตัดสินแข็งเกินไป บล็อกการเปลี่ยนแปลงที่ถูกต้อง และภายหลังถูกถอดออก เหลือการตรวจใน prompt<b-proof href="https://www.infoq.com/news/2026/03/spotify-honk-rewrite" quote="InfoQ: the judge „found it too rigid, blocking valid changes“ and „was eventually removed, with verification steps in prompts proving sufficient“"/> นี่คือการเล่าต่อ และผู้เขียนไม่พบข้อความเช่นนั้นในโพสต์ของ Spotify เอง Cursor ระบุบทบาท “integrator” ว่าเป็นคอขวด<b-proof href="https://cursor.com/blog/scaling-agents" quote="Cursor, 14 Jan 2026: the integrator role „created more bottlenecks than it solved“"/></b-why>
  <b-why align="left"><b-icon name="layers"/> **ข้อสังเกตเชิงประสบการณ์ของผู้เขียน: จุดตรวจที่เกี่ยวข้องหลายจุด** ผู้เขียนสังเกตว่าจุดตรวจหลายจุด หนึ่งจุดต่อหนึ่งความเสี่ยง (ชนิดข้อมูล เทสต์ linter การตรวจความหมาย) ทำงานดีกว่าจุดใหญ่จุดเดียว นี่เป็นข้อสังเกต ไม่มีแหล่งใดเปรียบเทียบ “จุดเดียวกับหลายจุด” ซึ่งเข้ากับสิ่งที่ผู้เขียนพบ Stripe สลับ linter กับ CI, Sonar กำหนดหกเงื่อนไขพร้อมกัน, Thoughtworks ระบุคอมไพเลอร์ linter และเทสต์ไว้ด้วยกัน มันไม่ยกเลิกข้อจำกัดข้างต้น แต่ละจุดตรวจมีราคาและขีดจำกัดจำนวนครั้ง และจุดตรวจที่เข้มงวดเกินไปก็ทำร้าย เหมือนผู้ตัดสินของ Spotify คำว่า “เกี่ยวข้อง” จึงหมายถึงผูกกับความเสี่ยงที่มิฉะนั้นจะไปถึงผู้ใช้</b-why>
  <b-why align="left"><b-icon name="user"/> **ผู้รีวิวชินกับมัน** ในเจ็ดเดือน ในกลุ่มผู้รีวิวซ้ำ 400 คน อัตราการอนุมัติเพิ่มจาก 30.1% เป็น 36.8% คิวรีวิวช้าลง 3.5 เท่า และความเห็นแทรกบรรทัดลดลง 22% ([arXiv 2606.22721](https://arxiv.org/abs/2606.22721), 11,429 รีวิว) ตาม Faros AI ในกลุ่มนักพัฒนากว่า 10,000 คนที่ใช้ AI ขนาด PR เพิ่ม 154% และเวลารีวิวเพิ่ม 91% ([Faros AI](https://www.faros.ai/blog/ai-software-engineering), 23 กรกฎาคม 2025)</b-why>
  <b-why align="left"><b-icon name="eye-wide"/> **เซนเซอร์มองไม่เห็นความหมาย** Böckeler ตั้งข้อสังเกตว่าเซนเซอร์จับการวินิจฉัยผิด ความซับซ้อนเกินจำเป็น และการอ่านโจทย์ผิดได้ไม่น่าเชื่อถือ จุดตรวจรับผิดชอบสิ่งที่เขียนเป็นกฎ ส่วนที่เหลือยังอยู่กับคน</b-why>
  <b-table>

| อันตราย | การป้องกัน |
|---|---|
| เอเจนต์แก้หรือหลบเทสต์ | เทสต์และตัวจุดตรวจเองเป็นแบบอ่านอย่างเดียว มีเพียงโปรแกรมตรวจที่ตั้งเครื่องหมาย “ผ่าน” |
| ทำเฉพาะกรณีให้เทสต์ผ่าน | ชั้นที่สอง: เอเจนต์ผู้รีวิวตามความหมาย และการตรวจสุ่ม |
| เอเจนต์ซ่อนเจตนา | เฝ้าดูการให้เหตุผลแต่อย่าฝึกเอเจนต์ให้สู้กับมัน |
| จุดตรวจเป็นสีแดงตลอด | ขีดจำกัดจำนวนครั้ง แล้วส่งต่อให้คน |
| จุดตรวจบล็อกสิ่งที่ถูกต้อง | ติดตามว่าการปฏิเสธที่ผิดมีสัดส่วนเท่าใด แล้วผ่อนกฎ |
| ผู้รีวิวชินกับมัน | แสดงให้คนเห็นเฉพาะกรณี “ไม่แน่ใจ” และความเสี่ยง |

  </b-table>
  <b-finding>
    <ex>จุดตรวจรันเทสต์ เอเจนต์ปิดเทสต์ที่ไม่เสถียรสองตัวแล้วได้สีเขียว การตรวจ “จำนวนเทสต์ไม่ลดลง” จับการสลับนี้ได้</ex>
    <gen>จุดตรวจทุกจุดต้องถูกทดสอบการหลบเหมือนที่ทดสอบโค้ด เอเจนต์เปลี่ยนอะไรได้บ้างเพื่อผ่านโดยไม่ทำงานจริง</gen>
    <do>ปิดสิทธิ์เขียนของเอเจนต์ต่อเทสต์และต่อการตั้งค่าจุดตรวจ และเขียนขีดจำกัดจำนวนครั้งลงในจุดตรวจเอง</do>
  </b-finding>
</b-chapter>

<b-chapter id="start" icon="flag" title="เริ่มต้นอย่างไร: ห้าขั้นตอนและ prompt สำเร็จรูปสำหรับเอเจนต์">
  <b-why align="left">เริ่มจากหนึ่ง context และหนึ่งงาน แต่ละขั้นด้านล่างปิดหนึ่งข้อของส่วนข้อจำกัด ให้ prompt แก่เอเจนต์ได้ตามที่เขียน โดยเติมโปรเจกต์ของคุณ</b-why>
  <b-subhead>1. เขียนคำว่า “เสร็จแล้ว” เป็นไฟล์</b-subhead>
  <b-prompt>
    สร้างไฟล์ acceptance.json ที่มีรายการเกณฑ์ “เสร็จแล้ว” ที่ตรวจได้สำหรับงาน [คำอธิบาย]
    แต่ละเกณฑ์: id, ข้อความ, คำสั่งตรวจ และฟิลด์ passes ที่ตั้งเป็น false
    กฎ: มีเพียงสคริปต์ตรวจที่เปลี่ยน passes และห้ามลบหรือแก้เกณฑ์โดยไม่ได้รับการยืนยันจากฉัน
  </b-prompt>
  <b-subhead>2. ตั้งจุดตรวจตอนหยุด</b-subhead>
  <b-prompt>
    ตั้งค่า stop hook ของ Claude Code ใน .claude/settings.json: ก่อนจบเทิร์น ให้รันสคริปต์ตรวจ
    ที่รันคำสั่งจาก acceptance.json และอัปเดต passes หากเกณฑ์ใดเป็นสีแดง
    ให้บล็อกการจบและส่งข้อความข้อผิดพลาดกลับไปหาเอเจนต์ ตรวจแฟลก stop_hook_active เพื่อไม่ให้ hook วนซ้ำ
    หลังสีแดงติดกันสามครั้ง ให้จบเทิร์นและบอกฉันให้ชัดว่าอะไรไม่ผ่าน
  </b-prompt>
  <b-subhead>3. ปิดทางหลบ</b-subhead>
  <b-prompt>
    ห้ามเอเจนต์เขียนลงไดเรกทอรีเทสต์ ไฟล์ acceptance.json และ .claude เพิ่มการตรวจว่าจำนวนเทสต์
    ไม่ลดลงและไม่มีเทสต์ใดถูกทำเครื่องหมายว่าข้าม
  </b-prompt>
  <b-subhead>4. เพิ่มผู้รีวิวตามความหมาย</b-subhead>
  <b-prompt>
    สร้าง subagent ผู้รีวิวแยกต่างหากที่มีสิทธิ์อ่านอย่างเดียว มันเทียบการเปลี่ยนแปลงสุดท้ายกับโจทย์เดิม
    และให้คะแนนแต่ละเกณฑ์จาก [รายการ] ตั้งแต่ 0 ถึง 5 ต่ำกว่า 4 ในเกณฑ์ใดก็ตามหมายความว่าไม่รับการเปลี่ยนแปลง
    คำตัดสิน: รับ ไม่รับพร้อมเหตุผล หรือไม่แน่ใจ
  </b-prompt>
  <b-subhead>5. ทำชุดฟังก์ชัน MCP ให้แคบลง</b-subhead>
  <b-prompt>
    แสดงรายการฟังก์ชัน MCP ที่เอเจนต์ใช้ใน context นี้ในเดือนที่ผ่านมา เก็บไว้เฉพาะเหล่านั้นในการตั้งค่า
    subagent ของ context นี้ และปิดที่เหลือ แสดงว่าประหยัดโทเค็นได้เท่าใด
  </b-prompt>
  <b-why align="left">หลังจากนั้นจะมีลูปทำงาน ทุกข้อผิดพลาดที่จุดตรวจพลาดกลายเป็นการตรวจใหม่ นี่คือหลักการทั่วไปจากบทความ [“Harness engineering ในทางปฏิบัติ”](/blog/harness-driven-development/) และจุดตรวจเป็นกรณีพิเศษของมัน และเก็บบันทึกคำตัดสิน คือเอเจนต์ผ่านกี่ขั้นโดยไม่มีคนก่อนมีจุดตรวจและหลังมี นี่คือตัวชี้วัดการทำงานเองที่งานวิจัยยังขาด</b-why>
  <b-finding>
    <ex>ห้าขั้นตอนให้จุดตรวจที่เขียนในไฟล์ เริ่มโดย hook ไม่ให้หลบเทสต์ได้ มองความหมาย และตั้งอยู่บนชุดฟังก์ชันที่แคบ</ex>
    <gen>จุดตรวจแรกไม่จำเป็นต้องฉลาด แค่เอเจนต์พูดว่า “เสร็จแล้ว” เองไม่ได้ และการตรวจอยู่นอกตัวมัน ก็เพียงพอ</gen>
    <do>ทำขั้นที่ 1 และ 2 สำหรับหนึ่งงานวันนี้ เพิ่มที่เหลือเมื่อจุดตรวจพลาดข้อผิดพลาด</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="คำถามและคำตอบ">
  <b-faq-cards>
    <q t="จุดตรวจคุณภาพสำหรับเอเจนต์ AI คืออะไร">จุดที่งานของเอเจนต์หยุดอยู่จนกว่าการตรวจอิสระจะตอบว่า “รับแล้ว” เอเจนต์ไม่ประทับ “เสร็จแล้ว” เอง คำตอบมาจากเครื่อง เอเจนต์ผู้รีวิว หรือคน</q>
    <q t="จุดตรวจต่างจากเทสต์อย่างไร">เทสต์ตรวจกฎข้อเดียวและคืนผลลัพธ์ จุดตรวจตัดสินว่างานไปต่อได้หรือไม่ รวมเทสต์ เอเจนต์ผู้รีวิว และคนเป็นการตัดสินเดียว และหยุดเอเจนต์ได้</q>
    <q t="จุดตรวจเพิ่มเวลาทำงานอัตโนมัติของเอเจนต์หรือไม่">ไม่มีการวัดโดยตรง มีเลขคณิต คือที่อัตราสำเร็จ 95% ต่อขั้น 20 ขั้นผ่านโดยไม่มีข้อผิดพลาดใน 36% ของกรณี และจุดตรวจที่จับได้ 4 ใน 5 ข้อผิดพลาดยกขึ้นเป็นราว 82% และมีกรณีจาก Anthropic, Stripe และ Spotify</q>
    <q t="ควรวางจุดตรวจไว้ที่ไหน">นอกเอเจนต์และนอกบริบทของมัน ใน hook ฝั่งไคลเอนต์หรือในสิทธิ์ฝั่งเซิร์ฟเวอร์หลัง MCP ตัวเอเจนต์เองทำงานใน bounded context เล็ก ๆ ที่นั่นการตรวจมีขอบเขตจำกัด การเปลี่ยนแปลงเล็ก และชุดฟังก์ชัน MCP แคบ กฎในข้อความคำสั่งยังเป็นเพียงคำแนะนำ</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="อ่านต่อ">
  <b-links>
    <item href="/blog/harness-driven-development/" k="Harness" t="Harness engineering ในทางปฏิบัติ">guide เซนเซอร์ และลูป “จากข้อผิดพลาดสู่กฎ”</item>
    <item href="/blog/agent-checkpoint/" k="การตรวจ" t="จะตรวจงานของเอเจนต์ AI ที่ไหน">ขอบเขตของ aggregate และทฤษฎีบทของไรซ์</item>
    <item href="/blog/agents-per-bounded-context/" k="เอเจนต์" t="ต้องใช้เอเจนต์ AI กี่ตัว">หนึ่งเอเจนต์ต่อหนึ่ง bounded context</item>
    <item href="/blog/mcp-agent-access/" k="MCP" t="MCP สำหรับเอเจนต์ AI">แก้ปัญหาอะไรและเชื่อมต่ออย่างไร</item>
    <item href="/blog/mcp-scopes/" k="MCP" t="scope ของ MCP ใน Claude Code">local, project และ user</item>
    <item href="/blog/ai-agent-maturity-levels/" k="วุฒิภาวะ" t="ระดับวุฒิภาวะของเอเจนต์ AI">จากแชตสู่สเปก skill โค้ด และระบบ</item>
  </b-links>
</b-chapter>
<b-footer>ข้อเท็จจริง: ณ วันที่ 14 พฤศจิกายน 2026 จากแหล่งปฐมภูมิที่แสดงด้วยเครื่องหมาย ↗ และลิงก์ในข้อความ การคำนวณบนแผนภูมิการทำงานเองเป็นของผู้เขียน โดยสมมติว่าแต่ละขั้นเป็นอิสระต่อกัน ตัวอย่างการจองเป็นเรื่องสมมติ คำอ้างเกี่ยวกับผู้ตัดสินของ Spotify และการถอดออกมาจากรายงานของ InfoQ</b-footer>
</b-post>
