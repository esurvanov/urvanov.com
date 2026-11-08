---
title: วิธีสัมภาษณ์และวิเคราะห์การใช้ AI ในการทำงาน: สคริปต์ 30 นาที, prompt วิเคราะห์ และตาราง Airtable
date: 2026-09-28
updated: 2026-11-08
description: สคริปต์สัมภาษณ์ 30 นาที กฎการคุมหัวข้อ แบบสอบถามสั้นสำหรับทั้งบริษัท การวิเคราะห์บทสัมภาษณ์ด้วย ChatGPT หรือเอเจนต์ด้วย prompt สำเร็จรูป และการเทียบสิ่งที่คนพูดกับตัวเลขในรายงาน
tags: AI, custdev, การสัมภาษณ์
category: research
layout: wide
image: /og/ai-interviews-without-leading-questions.en.png
mentions: Airtable, tl;dv, ChatGPT, Claude Code, Model Context Protocol
toc: format=เลือกรูปแบบ | prep=เตรียมตัวก่อนพบ | script=สคริปต์ 30 นาที | focus=คุมหัวข้อ | base=บันทึกใน Airtable | agent=ใช้ Claude Code | wording=ข้อความ: การเขียนคำถาม | form=แบบสอบถาม | after=วิเคราะห์บทสัมภาษณ์ | faq=คำถามที่พบบ่อย | next=อ่านต่อ
---

การสัมภาษณ์เรื่องการทำงานกับ AI ใช้เวลา 30 นาที และเน้นที่งานจริงชิ้นล่าสุด: ทำอะไร ได้ผลอย่างไร ต้องใช้แรงเท่าไร จากนั้นถามถึงกรณีที่สำเร็จและกรณีที่เลิกใช้ AI หรือเปลี่ยนไปใช้อย่างอื่น ผู้ให้สัมภาษณ์เลือกรูปแบบเองได้ ทั้งโทรหรือตอบเป็นข้อความ คำตอบวิเคราะห์ด้วย prompt ใน ChatGPT หรือเอเจนต์ ลงตาราง Airtable แล้วเทียบกับข้อมูลการใช้งาน ด้านล่างคือสคริปต์ แบบสอบถาม และ prompt วิเคราะห์

<b-post series="intervyu">
<b-credit para>การออกแบบการสัมภาษณ์อิงคำแนะนำจาก <a href="https://t.me/Kseniya_Vasil" target="_blank" rel="noopener">@Kseniya_Vasil</a> รายชื่อ กลุ่ม และตัวเลขสำหรับการสัมภาษณ์มาจาก<a href="/blog/chatgpt-enterprise-usage-report/">รายงานการใช้งาน ChatGPT Enterprise</a> ในรายงานนั้นมี<a href="/blog/chatgpt-enterprise-usage-report/#why">โจทย์ทางธุรกิจ</a>ด้วย: บริษัทตัดสินใจเรื่องอะไร ใครเป็นผู้ตัดสิน และดูจากสัญญาณใด</b-credit>
<b-lead tight>การวิเคราะห์ในที่นี้มีสี่ขั้น: ส่งข้อความบทสนทนาให้ ChatGPT ด้วย prompt เดิมทุกครั้ง คัดลอกคำตอบลงแถวของคนนั้น จัดกลุ่มตารางตามความยาก แล้วตรวจสิ่งที่ซ้ำด้วยแบบสอบถามทั้งบริษัท สิ่งที่คนพูดจะถูกเทียบกับข้อมูลในรายงาน ด้านล่าง: สคริปต์การโทร ตาราง และ<a href="#after">prompt วิเคราะห์</a></b-lead>
<b-flow label="สองรูปแบบการสัมภาษณ์มารวมในตารางเดียว">
  <b-lane title="เสียง" color="c-chat">
    <node icon="phone" t="โทร">30 นาที</node>
    <node icon="record" t='<a href="https://tldv.io/" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline;text-underline-offset:3px">tl;dv</a> · <a href="https://www.granola.ai/" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline;text-underline-offset:3px">Granola</a>'>บันทึก</node>
    <node icon="file-text" t="ถอดความ">ลงช่องบันทึก</node>
  </b-lane>
  <b-lane title="ข้อความ" color="c-work">
    <node icon="doc-lines" t="คำถาม">ในแชต</node>
    <node icon="chat" t="ถามต่อ">1 ข้อความ</node>
    <node icon="file-text" t="ประวัติแชต">คัดลอกลงช่องบันทึก</node>
  </b-lane>
  <b-drop-arrows n="2"/>
  <b-airtable-preview icon="table" title='<a href="https://airtable.com" target="_blank" rel="noopener">Airtable</a>' sub="ทุกอย่างอยู่ในตารางเดียว" count="16 รายการ">
    <col w="1.1fr" mw="1.2fr">ชื่อ</col>
    <col w="1.7fr" kind="note">บันทึก</col>
    <col w=".9fr" kind="wide">รูปแบบ</col>
    <col w="1fr" mw="1fr" kind="ours">ความถี่ ที่ผู้ตอบบอกเอง</col>
    <col w="1fr" mw="1fr">ตามรายงาน</col>
    <col w=".9fr" kind="wide">สถานะ</col>
    <row>Hana Sato | Host [00:00]: Think back to the last… | <b-select-pill tone="cyan">เสียง</b-select-pill> | <b-select-pill tone="green">ทุกสัปดาห์</b-select-pill> | <b-select-pill tone="green">ทุกสัปดาห์</b-select-pill> | <b-select-pill tone="green">เสร็จแล้ว</b-select-pill></row>
    <row>Pavel Novak | [27.09 10:15] Host: Describe the last… | <b-select-pill tone="purple">ข้อความ</b-select-pill> | <b-select-pill tone="cyan">เป็นประจำ</b-select-pill> | <b-select-pill tone="red">ไม่ใช้</b-select-pill><b-match-mark kind="diff">≠</b-match-mark> | <b-select-pill tone="green">เสร็จแล้ว</b-select-pill></row>
    <row>Nadia Rahimi | Host [00:00] | <b-select-pill tone="cyan">เสียง</b-select-pill> | <b-select-pill tone="yellow">นานๆ ครั้ง</b-select-pill> | <b-select-pill tone="yellow">นานๆ ครั้ง</b-select-pill> | <b-select-pill tone="green">เสร็จแล้ว</b-select-pill></row>
  </b-airtable-preview>
</b-flow>
<b-chapter id="format" icon="split" title="เลือกรูปแบบ">
  <b-table>
    <table><thead><tr><th>เกณฑ์</th><th><b-icon name="mic" sw="2.2"/> เสียง</th><th><b-icon name="lines" sw="2.2"/> ข้อความ</th></tr></thead><tbody>
    <tr><td>ความลึกของคำตอบ</td><td><b-rating value="5" of="5" label="5 จาก 5"/></td><td><b-rating value="2" of="5" label="2 จาก 5"/></td></tr>
    <tr><td>ถามต่อได้ทันที</td><td><b-rating value="5" of="5" label="5 จาก 5"/></td><td><b-rating value="1" of="5" label="1 จาก 5"/></td></tr>
    <tr><td>เข้าถึงคนได้กี่คน</td><td><b-rating value="2" of="5" label="2 จาก 5"/></td><td><b-rating value="5" of="5" label="5 จาก 5"/></td></tr>
    <tr><td>เวลาของผู้ตอบ</td><td>30 นาที</td><td>10 นาที</td></tr>
    <tr><td>ความเสี่ยงที่จะออกนอกเรื่อง</td><td><b-rating value="4" of="5" warn label="4 จาก 5"/></td><td><b-rating value="1" of="5" warn label="1 จาก 5"/></td></tr>
    </tbody></table>
  </b-table>
  <b-cap>จุดคือคะแนนจาก 1 ถึง 5 ส่วนความเสี่ยง ยิ่งมีจุดมากยิ่งแย่</b-cap>
  <b-sublabel top="22">แบบผสม: ผู้ตอบเลือกรูปแบบเอง</b-sublabel>
  <b-choice-flow label="เสียงหรือข้อความ ผู้ตอบเป็นคนเลือก">
    <step t="คำเชิญ">ทางข้อความส่วนตัว</step>
    <step t="สะดวกโทรไหม">30 นาที</step>
    <opt k="ใช่" tone="cyan" pill="เสียง">โทรโดยมีผู้ช่วยจดบันทึก</opt>
    <opt k="ไม่" tone="purple" pill="ข้อความ">คำถามชุดเดิม ถามทีละข้อในแชต</opt>
  </b-choice-flow>
  <b-finding>
    <ex>เสียงได้ 5 จาก 5 ด้านความลึก ข้อความได้ 5 จาก 5 ด้านการเข้าถึง แต่ละคนเลือกรูปแบบเอง</ex>
    <gen>เมื่อให้คนเลือกรูปแบบเอง คนที่ปฏิเสธจะน้อยลง รูปแบบต่างกันที่ความลึก: การโทรได้เรื่องเล่าละเอียดพร้อมคำถามต่อ แชตได้คำตอบสั้น ดังนั้นคำตอบในแชตช่วยหากรณีและหัวข้อ แต่ไม่นับว่าเท่ากับการโทร เสียงเป็นรูปแบบหลัก แชตไว้สำหรับคนที่โทรไม่ได้ ส่วนแบบสอบถามทั้งบริษัทเป็นอีกเครื่องมือหนึ่ง เขียนหลังสัมภาษณ์เสร็จ</gen>
    <do>เสนอทั้งสองรูปแบบในประโยคเดียวในคำเชิญ: "คุยโทรกัน 30 นาทีดีไหม หรืออยากตอบคำถามในแชตมากกว่า"</do>
  </b-finding>
</b-chapter>
<b-chapter id="prep" icon="mic" title="เตรียมตัวก่อนพบ">
  <b-todo>
    <item t="บอกเรื่องผู้ช่วยจดบันทึก">ในคำเชิญและตอนเริ่มโทร: ผู้ช่วยจดบันทึกและถอดความที่เห็นได้เฉพาะทีม และคำตอบจะเข้ารายงานโดยไม่มีชื่อ ถ้าใช้ <b-ink-link href="https://www.granola.ai/">Granola</b-ink-link> จะไม่เก็บเสียง</item>
    <item t='<a href="https://tldv.io/" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline;text-underline-offset:3px">tl;dv</a> หรือ <a href="https://www.granola.ai/" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline;text-underline-offset:3px">Granola</a>'><b-ink-link href="https://tldv.io/">tl;dv</b-ink-link> เชื่อมกับปฏิทินและเข้าประชุม Google Meet หรือ Zoom เอง ส่วน <b-ink-link href="https://www.granola.ai/">Granola</b-ink-link> ทำงานโดยไม่ต้องมีบอต ใช้เสียงจากคอมพิวเตอร์ของคุณ และเก็บเฉพาะข้อความถอดความกับบันทึก</item>
    <item t="สร้างแถวใน Airtable ไว้ล่วงหน้า">ชื่อ กลุ่ม และตัวเลขจาก<a href="/blog/chatgpt-enterprise-usage-report/#people">ตารางรายชื่อทุกคน</a> สถานะ "กำลังดำเนินการ" ก่อนส่งข้อความแรก</item>
    <item t="เปิดคู่มือไว้บนจอที่สอง">สคริปต์เจ็ดช่วงและตัวจับเวลา 30 นาที</item>
    <item t="ผู้สัมภาษณ์คนเดียว ไม่ต้องจดเอง"><b-ink-link href="https://tldv.io/">tl;dv</b-ink-link> หรือ <b-ink-link href="https://www.granola.ai/">Granola</b-ink-link> ถอดความให้ ส่วน ChatGPT วิเคราะห์</item>
  </b-todo>
  <b-finding>
    <do>ก่อนพบ ตรวจว่า <b-ink-link href="https://tldv.io/">tl;dv</b-ink-link> เห็นการประชุมในปฏิทิน หรือ <b-ink-link href="https://www.granola.ai/">Granola</b-ink-link> เปิดอยู่บนคอมพิวเตอร์ และสร้างแถวใน Airtable ไว้ เพื่อให้ในการโทรเหลือแต่การถามคำถาม</do>
  </b-finding>
</b-chapter>
<b-chapter id="script" icon="clock" title="สคริปต์ 30 นาที">
  <b-share-bar kind="time" label="30">
    <seg w="2" color="c-none" ink="ink">2</seg>
    <seg w="3" color="c-light">3</seg>
    <seg w="8" color="c-chat">8</seg>
    <seg w="5" color="c-proj">5</seg>
    <seg w="4" color="c-team">4</seg>
    <seg w="5" color="c-work">5</seg>
    <seg w="3" color="c-none" ink="ink">3</seg>
  </b-share-bar>
  <b-cap>นาทีต่อช่วง</b-cap>
  <b-call-script>
    <step color="c-none" ink="ink" t="เริ่มต้น" q="&quot;ผมกำลังดูว่าคนในบริษัททำงานของตัวเองให้เสร็จจริงๆ อย่างไร นี่ไม่ใช่การประเมินตัวคุณ กรณีที่สำเร็จและไม่สำเร็จมีประโยชน์กับผมเท่ากัน มีผู้ช่วยจดบันทึกอยู่กับผมด้วย ข้อความถอดความเห็นได้เฉพาะเรา และคำตอบจะเข้ารายงานโดยไม่มีชื่อ ขอเปิดได้ไหมครับ&quot;"></step>
    <step color="c-light" t="บทบาทและบริบท" q='"ปกติสัปดาห์หนึ่งคุณใช้เวลากับอะไรมากที่สุด"'>งานอะไรที่ทำซ้ำ · หาข้อมูลและร่างงานจากที่ไหน</step>
    <step color="c-chat" t="งานล่าสุด" q='"ลองนึกถึงงานล่าสุดที่ใช้เวลาไปพอสมควร คุณต้องการได้อะไร"'>มีวิธีหรือเครื่องมืออะไรให้เลือก · เลือกอะไรและเพราะอะไร · ไปถึงผลลัพธ์ได้อย่างไร</step>
    <step color="c-proj" t="ผลลัพธ์และแรงที่ใช้" q='"สุดท้ายได้อะไร และต้องใช้แรงมากแค่ไหน"'>อะไรใช้ได้เลย · อะไรต้องแก้เอง · มีข้อจำกัดอะไรบ้าง: ข้อมูล สิทธิ์เข้าถึง ความปลอดภัย</step>
    <step color="c-team" t="กรณีที่สำเร็จ" q='"ลองนึกถึงครั้งที่งานแบบนี้ไปได้ดี ครั้งนั้นต่างจากปกติอย่างไร"'>เครื่องมือ · ข้อมูล · การเตรียมตัว</step>
    <step color="c-work" t="เลิกใช้และเปลี่ยนไปใช้อย่างอื่น" q='"เคยเลิกใช้เครื่องมือบางอย่างหรือเปลี่ยนไปใช้อย่างอื่นไหม เป็นอย่างไรบ้าง"'>เครื่องมืออะไร · เปลี่ยนไปใช้อะไร · เพราะอะไร ถ้าไม่เคยเกิดขึ้น ให้ข้าม</step>
    <step color="c-none" ink="ink" t="ปิดท้าย" q="&quot;มีอะไรที่ผมไม่ได้ถาม แต่สำคัญต่อการเข้าใจงานของคุณไหม&quot;">ขอบคุณ · บอกว่าคำตอบจะเข้าการวิเคราะห์รวมโดยไม่มีชื่อ</step>
  </b-call-script>
  <b-branch icon="git-branch" t="ถ้าผู้ตอบไม่พูดถึง AI">อย่าถามว่าทำไมไม่ใช้ ให้ถามว่าทำงานนั้นอย่างไรและพิจารณาทางเลือกอะไรบ้าง ถามเรื่อง AI เฉพาะเมื่อผู้ตอบเอ่ยถึงมันเองในฐานะทางเลือกหนึ่ง</b-branch>
  <b-finding>
    <ex>งานล่าสุด ผลลัพธ์ และแรงที่ใช้กินเวลา 13 จาก 30 นาที กรณีที่สำเร็จกับการเลิกใช้หรือเปลี่ยนอีก 9 นาที</ex>
    <gen>บทสนทนาสร้างรอบตัวงาน ไม่ใช่รอบเครื่องมือ จึงเห็นว่า AI ช่วยตรงไหน ผู้ตอบเลือกทางอื่นตรงไหน และตรงไหนไม่ต้องมีเครื่องมือใหม่ กรณีที่สำเร็จบอกว่าอะไรใช้ได้อยู่แล้ว ส่วนการเลิกใช้และเปลี่ยนบอกว่าทำไมเครื่องมือถูกแทนที่</gen>
    <do>ตั้งตัวจับเวลา: ภายในนาทีที่ 5 ให้ไปที่งานล่าสุด ถ้าไม่ทัน ให้ย่อบริบทเหลือคำถามเดียว เลือกหัวข้องานให้ผู้ตอบ: งานของแต่ละคนอยู่ใน<a href="/blog/chatgpt-enterprise-usage-report/#projects">หัวข้อโปรเจกต์</a></do>
  </b-finding>
</b-chapter>
<b-chapter id="focus" icon="target" title="คุมหัวข้อ">
  <b-rules>
    <rule icon="parking" t="ที่พักประเด็น">ประเด็นนอกเรื่องลงช่องแยก แล้วกลับมาคุยใน 2 นาทีสุดท้าย</rule>
    <rule icon="one" t="ถามทีละข้อ">ไม่มี "แล้วก็…" ในประโยคเดียวกัน</rule>
    <rule icon="undo" t="กลับมาที่กรณีจริง">ความเห็นทั่วไป → "นึกถึงครั้งใดครั้งหนึ่งได้ไหม"</rule>
    <rule icon="shield-off" t="ไม่ปกป้องเครื่องมือ">ตอบคำวิจารณ์ด้วยคำว่า "แล้วเกิดอะไรขึ้นต่อ" เท่านั้น</rule>
    <rule icon="pause" t="เงียบ 5 วินาที">เงียบหลังคำตอบ: คนมักเติมประเด็นสำคัญเอง</rule>
    <rule icon="bulb-off" t="ไม่เสนอทางแก้">ไม่ใส่ไอเดียของตัวเอง ไม่เอ่ยชื่อผลิตภัณฑ์อื่น</rule>
  </b-rules>
  <b-sublabel top="22">สถานการณ์ → ควรพูดอะไร</b-sublabel>
  <b-table>
    <table><thead>
    <tr><th>สถานการณ์</th><th>ประโยคของผู้สัมภาษณ์</th></tr>
    </thead><tbody>
    <tr><td>ขอฟีเจอร์ใหม่</td><td>"ครั้งล่าสุดที่ต้องใช้คือเมื่อไร ตอนนั้นทำอย่างไร"</td></tr>
    <tr><td>เริ่มบ่นเรื่องกระบวนการ</td><td>"ผมจดไว้ที่ที่พักประเด็นนะ กลับมาที่งานรายงาน: หลังจากนั้นเกิดอะไรขึ้น"</td></tr>
    <tr><td>ตอบว่า "ปกติ" และ "เสมอ"</td><td>"แล้วครั้งล่าสุดเป็นอย่างไร"</td></tr>
    <tr><td>ถามความเห็นของผู้สัมภาษณ์</td><td>"ผมจะเล่าตอนท้าย ตอนนี้สิ่งสำคัญคือมันใช้ได้กับคุณอย่างไร"</td></tr>
    <tr><td>หมดเวลาของช่วงนั้น</td><td>"ข้อนี้สำคัญ เราจดไว้ก่อน ขอไปข้อถัดไปนะ"</td></tr>
    </tbody></table>
  </b-table>
  <b-finding>
    <ex>ห้าสถานการณ์ที่พบบ่อย แต่ละอย่างมีประโยคที่พาบทสนทนากลับไปที่เหตุการณ์จริง</ex>
    <gen>เบื้องหลังคำขอฟีเจอร์มีกรณีจริงอยู่ และกรณีนั้นคือสิ่งที่ต้องการ ส่วนคำขอเองมีประโยชน์ทีหลังในฐานะเบาะแสว่าควรหาปัญหาที่ไหน</gen>
    <do>วางตารางประโยคไว้ข้างคู่มือ และจดคำขอฟีเจอร์ทุกข้อตามคำพูดเดิมลงช่องแยกสำหรับเรื่องนอกหัวข้อ</do>
  </b-finding>
</b-chapter>
<b-chapter id="base" icon="table" title="บันทึกใน Airtable">
  <b-why>ตารางเก็บทุกคนในกลุ่มตัวอย่าง บทสนทนา และข้อมูลจากรายงานไว้ที่เดียว <b>การตัดสินใจ:</b> ควรเชิญใครเพิ่มเพื่อให้แต่ละกลุ่มมีบทสัมภาษณ์พอ ควรส่งคำถามตามไปหาใคร และช่องว่างระหว่างการใช้ที่ผู้ตอบบอกเองกับที่วัดได้ ข้อไหนควรคุยกับคนนั้น</b-why>
  <b-pipe label="เส้นทางของระเบียนจากการโทรถึงตาราง">
    <node icon="record" color="c-chat" sub="ข้อความถอดความ"><b-ink-link href="https://tldv.io/">tl;dv</b-ink-link> · <b-ink-link href="https://www.granola.ai/">Granola</b-ink-link></node>
    <node icon="table" color="c-proj" sub="ช่องบันทึกในแถวของคนนั้น"><b-ink-link href="https://airtable.com" plain>Airtable</b-ink-link></node>
  </b-pipe>
  <b-tool-links>
    <item href="https://airtable.com" icon="external" sub="ฐานข้อมูลและฟอร์ม">Airtable</item>
    <item href="https://tldv.io" icon="external" sub="บันทึกและข้อความถอดความของการโทร">tl;dv</item>
    <item href="https://www.granola.ai/" icon="external" sub="บันทึกโดยไม่ใช้บอต ไม่เก็บเสียง">Granola</item>
  </b-tool-links>
  <b-cap>เสียง: ข้อความถอดความจาก <b-ink-link href="https://tldv.io/">tl;dv</b-ink-link> หรือ <b-ink-link href="https://www.granola.ai/">Granola</b-ink-link> คัดลอกลงช่องบันทึก ข้อความ: ประวัติแชตคัดลอกลงช่องเดียวกัน พร้อมวันที่และเวลาของแต่ละข้อความ</b-cap>
  <b-sublabel top="22">หนึ่งตาราง: หนึ่งแถวต่อหนึ่งคน</b-sublabel>
  <b-airtable-grid foot="16 รายการ · แสดง 9">
    <field type="A" kind="name">ชื่อ</field>
    <field type="≡" kind="note">บันทึก</field>
    <field type="◉">รูปแบบ</field>
    <field type="◉">กลุ่ม</field>
    <field type="◉">สถานะ</field>
    <field type="◉" kind="ours">ความถี่ · ผู้ตอบบอกเอง</field>
    <field type="◉">ความถี่ · ตามรายงาน</field>
    <field type="ƒ" kind="mark">≠</field>
    <field type="#" kind="num">โทเคน · 3 เดือน</field>
    <field type="#" kind="num">$ / 3 เดือน</field>
    <field type="▦" kind="num">กิจกรรม</field>
    <row>Hana Sato | Host [00:00]: Think back to the last time you… | <b-select-pill tone="cyan">เสียง</b-select-pill> | โค้ด | <b-select-pill tone="green">เสร็จแล้ว</b-select-pill> | <b-select-pill tone="green">ทุกสัปดาห์</b-select-pill> | <b-select-pill tone="green">ทุกสัปดาห์</b-select-pill> | <b-match-mark kind="same">=</b-match-mark> | 21.9M | 438 | 25.09</row>
    <row>Luis Moreno | Host [00:00]: Thanks for making the time… | <b-select-pill tone="cyan">เสียง</b-select-pill> | โค้ด | <b-select-pill tone="green">เสร็จแล้ว</b-select-pill> | <b-select-pill tone="cyan">เป็นประจำ</b-select-pill> | <b-select-pill tone="green">ทุกสัปดาห์</b-select-pill> | <b-match-mark kind="diff">≠</b-match-mark> | 12.7M | 396 | 24.09</row>
    <row>Mira Castellano | [26.09 18:40] Host: What result were you expecting… | <b-select-pill tone="purple">ข้อความ</b-select-pill> | เอเจนต์ | <b-select-pill tone="yellow">ไม่ครบ</b-select-pill> | <b-select-pill tone="cyan">เป็นประจำ</b-select-pill> | <b-select-pill tone="cyan">เป็นประจำ</b-select-pill> | <b-match-mark kind="same">=</b-match-mark> | 3.9M | 97 | 26.09</row>
    <row>Jonas Keller | Host [00:00]: What do you spend most of your… | <b-select-pill tone="cyan">เสียง</b-select-pill> | วิจัย | <b-select-pill tone="green">เสร็จแล้ว</b-select-pill> | <b-select-pill tone="green">ทุกสัปดาห์</b-select-pill> | <b-select-pill tone="green">ทุกสัปดาห์</b-select-pill> | <b-match-mark kind="same">=</b-match-mark> | 1.1M | 19 | 26.09</row>
    <row>Ben Ortiz |  |  | ใช้ Codex อย่างเดียว | <b-select-pill tone="cyan">รอคำตอบ</b-select-pill> |  | <b-select-pill tone="purple">ใช้ Codex อย่างเดียว</b-select-pill> |  | 3.2M | 64 | 22.09</row>
    <row>Pavel Novak | [27.09 10:15] Host: Describe the last task… | <b-select-pill tone="purple">ข้อความ</b-select-pill> | ไม่ได้ใช้งาน | <b-select-pill tone="green">เสร็จแล้ว</b-select-pill> | <b-select-pill tone="cyan">เป็นประจำ</b-select-pill> | <b-select-pill tone="red">ไม่ใช้</b-select-pill> | <b-match-mark kind="diff">≠</b-match-mark> | 0 | 0 | —</row>
    <row>Sara Quinn |  |  | ไม่ได้ใช้งาน | <b-select-pill tone="red">ปฏิเสธ</b-select-pill> |  | <b-select-pill tone="red">ไม่ใช้</b-select-pill> |  | 0 | 0 | —</row>
    <row>Nadia Rahimi | Host [00:00]: What did you do in ChatGPT yesterday… | <b-select-pill tone="cyan">เสียง</b-select-pill> | เครื่องมืออื่น | <b-select-pill tone="green">เสร็จแล้ว</b-select-pill> | <b-select-pill tone="yellow">นานๆ ครั้ง</b-select-pill> | <b-select-pill tone="yellow">นานๆ ครั้ง</b-select-pill> | <b-match-mark kind="same">=</b-match-mark> | 0.3M | 6 | 20.09</row>
    <row>Elif Demir |  |  | โปรเจกต์ | <b-select-pill tone="gray">กำลังดำเนินการ</b-select-pill> |  | <b-select-pill tone="green">ทุกสัปดาห์</b-select-pill> |  | 1.8M | 41 | 27.09</row>
  </b-airtable-grid>
  <b-cap>ChatGPT กรอกช่องสีส้มจากบทสนทนาในช่องบันทึก ส่วน "ตามรายงาน" "โทเคน" "$" และ "กิจกรรม" มาจาก<a href="/blog/chatgpt-enterprise-usage-report/">รายงานการใช้งาน ChatGPT Enterprise</a> ช่อง "≠" เป็นสูตรที่เทียบความถี่สองค่า</b-cap>
  <b-sublabel top="22">อ่านตาราง: แต่ละคอลัมน์ให้อะไร</b-sublabel>
  <b-table>
    <table><thead>
    <tr><th>คอลัมน์</th><th>ที่มา</th><th>ใช้ทำอะไร</th></tr>
    </thead><tbody>
    <tr><td>ชื่อ · กลุ่ม</td><td>กลุ่มตัวอย่าง<a href="/blog/who-to-interview-before-buying-ai-tools/#groups">"แปดกลุ่ม"</a></td><td>คนนั้นเป็นตัวแทนวิธีทำงานแบบใด</td></tr>
    <tr><td>บันทึก</td><td><b-ink-link href="https://tldv.io/">tl;dv</b-ink-link>, <b-ink-link href="https://www.granola.ai/">Granola</b-ink-link> หรือประวัติแชต</td><td>แหล่งที่มาของทุกช่อง ข้อสรุปทุกข้อตรวจกับคำพูดจริง</td></tr>
    <tr><td>รูปแบบ</td><td>ผู้สัมภาษณ์</td><td>ความลึกของคำตอบ: แชตมีรายละเอียดน้อยกว่าการโทร</td></tr>
    <tr><td>สถานะ</td><td>ผู้สัมภาษณ์</td><td>ขั้นถัดไป: เตือน ถามตาม หรือหาคนมาแทน</td></tr>
    <tr><td>ความถี่ · ผู้ตอบบอกเอง</td><td>ChatGPT ดึงจากบทสนทนา</td><td>ผู้ตอบบอกว่าใช้ AI บ่อยแค่ไหน</td></tr>
    <tr><td>ความถี่ · ตามรายงาน</td><td><a href="/blog/chatgpt-enterprise-usage-report/#depth">รายงาน · ความลึกของการใช้</a></td><td>ใช้บ่อยแค่ไหนตามข้อมูลจากคอนโซล</td></tr>
    <tr><td>≠</td><td>สูตร Airtable: เทียบความถี่สองค่า</td><td>ถ้าไม่ตรงกัน เป็นคำถามให้ชี้แจงในการสัมภาษณ์ เพราะรายงานเห็นเฉพาะเครื่องมือขององค์กรใน 3 เดือน</td></tr>
    <tr><td>โทเคน · 3 เดือน</td><td>รายงาน · <a href="/blog/chatgpt-enterprise-usage-report/#top-spend">อันดับตามค่าใช้จ่าย</a></td><td>ปริมาณงานในเครื่องมือขององค์กรใน 3 เดือน ใช้เลือกกลุ่มตัวอย่าง ไม่ใช้ถ่วงน้ำหนักคำตอบ</td></tr>
    <tr><td>$ · 3 เดือน</td><td>รายงาน · ตารางอันดับ</td><td>ค่าใช้จ่ายใน 3 เดือน ใช้เลือกกลุ่มตัวอย่าง ไม่ใช้ถ่วงน้ำหนักคำตอบ</td></tr>
    <tr><td>กิจกรรม</td><td>รายงาน · ข้อมูลผู้ใช้ที่ส่งออก</td><td>วันที่ทำรายการล่าสุด: ถ้านานมากแล้ว เป็นผู้สมัครเข้ากลุ่ม "ลองแล้วเลิก"</td></tr>
    </tbody></table>
  </b-table>
  <b-sublabel top="22">อ่านแถวตัวอย่างอย่างไร</b-sublabel>
  <b-table>
    <table><thead>
    <tr><th>แถว</th><th>สัญญาณ</th><th>ควรทำอะไร</th></tr>
    </thead><tbody>
    <tr><td>Hana Sato</td><td>ความถี่ตรงกัน · $438 กับโค้ด · <b-select-pill tone="green">เสร็จแล้ว</b-select-pill></td><td>ค่าใช้จ่ายด้านโค้ดสูงสุด: การคุยเรื่องงานล่าสุดของเธอจะบอกว่าเครื่องมือปัจจุบันพอหรือไม่</td></tr>
    <tr><td>Luis Moreno</td><td><b-match-mark kind="diff">≠</b-match-mark> บอกว่า "เป็นประจำ" แต่จริงๆ ทุกสัปดาห์</td><td>ถามให้ชัด: เขานับงานแบบไหนว่าเป็นงานที่ใช้ AI</td></tr>
    <tr><td>Pavel Novak</td><td><b-match-mark kind="diff">≠</b-match-mark> "เป็นประจำ" แต่โทเคนเป็นศูนย์</td><td>ถามให้ชัด: ใช้เครื่องมืออะไรกับงานอะไร</td></tr>
    <tr><td>Mira Castellano</td><td><b-select-pill tone="yellow">ไม่ครบ</b-select-pill></td><td>ส่งคำถามตามหนึ่งครั้ง: ในงานนั้นต้องทำต่อด้วยมือตรงไหน</td></tr>
    <tr><td>Ben Ortiz</td><td><b-select-pill tone="cyan">รอคำตอบ</b-select-pill> · ใช้ Codex อย่างเดียว · $64</td><td>ส่งข้อความเตือน: ถ้าไม่มีเขา กลุ่ม "ใช้ Codex อย่างเดียว" จะว่างเปล่า</td></tr>
    <tr><td>Sara Quinn</td><td><b-select-pill tone="red">ปฏิเสธ</b-select-pill></td><td>หาคนแทนตาม<a href="/blog/who-to-interview-before-buying-ai-tools/#teams">กฎการแทนที่</a>: ผู้สมัครคนถัดไปของกลุ่ม "ไม่ได้ใช้งาน"</td></tr>
    <tr><td>Elif Demir</td><td><b-select-pill tone="gray">กำลังดำเนินการ</b-select-pill> · 7 โปรเจกต์ที่ใช้งานอยู่</td><td>นัดโทร กรอกความถี่ที่ผู้ตอบบอกเองหลังคุยเสร็จ</td></tr>
    </tbody></table>
  </b-table>
  <b-sublabel top="22">สิ่งที่ผู้ตอบบอกเทียบกับข้อมูล: ต้องถามให้ชัดอะไรในการสัมภาษณ์</b-sublabel>
  <b-vs-grid>
    <h>วัดในการสัมภาษณ์</h>
    <h>คู่ในรายงาน</h>
    <h>ถ้าไม่ตรง ให้ถามว่า</h>
    <c><b>ใช้บ่อยแค่ไหน</b></c>
    <c><a href="/blog/chatgpt-enterprise-usage-report/#depth">กิจกรรมรายสัปดาห์</a></c>
    <c>ผู้ตอบใช้เครื่องมืออะไรกับงานอะไร</c>
    <c><b>งานหลัก</b></c>
    <c><a href="/blog/chatgpt-enterprise-usage-report/#main-tool">เครื่องมือหลัก</a></c>
    <c>ผู้ตอบนับงานแบบไหนว่าเป็นงานที่ใช้ AI</c>
    <c><b>ครอบคลุมงานกี่อย่าง</b></c>
    <c><a href="/blog/chatgpt-enterprise-usage-report/#projects">จำนวนโปรเจกต์</a></c>
    <c>โปรเจกต์ไหนยังใช้งานอยู่และใช้กับงานอะไร</c>
    <c><b>ใช้อะไรอีก</b></c>
    <c><a href="/blog/chatgpt-enterprise-usage-report/#connectors">ตัวเชื่อมต่อ</a></c>
    <c>เครื่องมือเหล่านี้คืออะไรและใช้กับงานอะไร บันทึกไว้เป็นวิธีทำงาน</c>
    <c><b>ประหยัดเวลาได้เท่าไร</b></c>
    <c>ไม่มีคู่</c>
    <c>ผู้ตอบบอกเองเท่านั้น</c>
  </b-vs-grid>
  <b-cap>ขอบเขตของข้อมูล: รายงานเห็นเฉพาะเครื่องมือขององค์กร และเฉพาะ 3 เดือน บัญชีส่วนตัวและเครื่องมืออื่นไม่ปรากฏในรายงาน ดังนั้นความไม่ตรงกันเป็นคำถามให้ชี้แจง ไม่ใช่ข้อสรุป</b-cap>
  <b-sublabel top="22">สถานะของผู้ได้รับเชิญ 16 คน</b-sublabel>
  <b-share-bar kind="status" label="สัดส่วนสถานะ">
    <seg w="9" color="pg" ink="pg-i">เสร็จแล้ว · 9</seg>
    <seg w="2" color="py" ink="py-i">2</seg>
    <seg w="2" color="pc" ink="pc-i">2</seg>
    <seg w="2" color="pn" ink="pn-i">2</seg>
    <seg w="1" color="pr" ink="pr-i">1</seg>
  </b-share-bar>
  <b-legend>
    <item color="pg">เสร็จแล้ว</item>
    <item color="py">ไม่ครบ</item>
    <item color="pc">รอคำตอบ</item>
    <item color="pn">กำลังดำเนินการ</item>
    <item color="pr">ปฏิเสธ</item>
  </b-legend>
  <b-finding>
    <ex>ผู้ได้รับเชิญ 9 จาก 16 คนให้สัมภาษณ์แล้ว: สัดส่วน "เสร็จแล้ว" คือ 56% ความถี่ที่ Pavel Novak บอกเองไม่ตรงกับรายงาน</ex>
    <gen>หนึ่งแถวต่อหนึ่งคนเก็บข้อมูลรายงาน รูปแบบ บทสนทนาดิบ และสถานะไว้ด้วยกัน สถานะบอกว่าคนพอหรือยัง: สัดส่วน "เสร็จแล้ว" ของผู้ได้รับเชิญบอกว่าต้องเชิญกี่คนเพื่อให้แต่ละกลุ่มได้บทสัมภาษณ์ตามจำนวนที่ต้องการ ช่องว่างระหว่างการใช้ที่บอกเองกับที่วัดได้เป็นคำถามให้ชี้แจง เพราะรายงานเห็นเฉพาะเครื่องมือขององค์กรใน 3 เดือน</gen>
    <do>อัปเดตสถานะทันทีหลังคุยแต่ละครั้ง รักษาจำนวนบทสัมภาษณ์ที่ต้องการในแต่ละกลุ่ม: เมื่อสัดส่วน "เสร็จแล้ว" อยู่ที่ 56% ให้เชิญสี่คนเพื่อให้ได้สองบทสัมภาษณ์ต่อกลุ่ม ส่งคำถามตามหนึ่งครั้งถึงทุกคนที่มีสถานะ "ไม่ครบ"</do>
  </b-finding>
</b-chapter>
<b-chapter id="wording" icon="lines" title="ข้อความ: การเขียนคำถาม">
  <b-why>ในแชตหรือแบบสอบถามถามซ้ำได้ยาก คำถามที่เขียนไม่ดีจึงทำให้คำตอบเสียโดยแก้ไม่ได้ ห้าข้อผิดพลาดที่พบบ่อย:</b-why>
  <b-question-pairs>
    <pair tag="นำคำตอบ" bad="เครื่องมือนี้สะดวกสำหรับคุณแค่ไหน">เล่าถึงงานล่าสุดที่ใช้เวลาไปพอสมควร</pair>
    <pair tag="ยั่วให้โต้แย้ง" bad="ทำไมไม่ใช้เครื่องมือนี้ ในเมื่อบริษัทจ่ายเงินให้">งานแบบนี้ครั้งล่าสุดคุณทำอย่างไร พิจารณาทางเลือกอะไรบ้าง</pair>
    <pair tag="ขอฟีเจอร์" bad="คุณขาดฟีเจอร์อะไร">ในงานล่าสุด มีจุดไหนที่ต้องทำต่อเองด้วยมือ</pair>
    <pair tag="สมมติ" bad="ถ้ามีเอเจนต์ คุณจะใช้มากขึ้นไหม">ครั้งล่าสุดที่ผลลัพธ์ใช้ไม่ได้ คุณทำอย่างไร</pair>
    <pair tag="ถามสองเรื่องพร้อมกัน" bad="คุณทำอะไรกับเครื่องมือนี้ และบ่อยแค่ไหน">งานล่าสุดที่คุณทำด้วย AI คืออะไร</pair>
  </b-question-pairs>
  <b-finding>
    <ex>คำถามที่แก้แล้วทั้งห้าข้อถามถึงเหตุการณ์ในอดีต</ex>
    <gen>คำถามเรื่องความสะดวก ฟีเจอร์ และอนาคตได้ความเห็นมา การตัดสินใจซื้อต้องอิงสิ่งที่คนทำไปแล้ว คำถามที่ดีจึงถามถึงกรณีเฉพาะในอดีต</gen>
    <do>อ่านคำถามในแชตและแบบสอบถามอีกรอบ แล้วเขียนคำถามที่มีคำว่า "สะดวก" "อยากได้ไหม" หรือ "ฟีเจอร์อะไร" ใหม่เป็นคำถามเกี่ยวกับงานล่าสุด</do>
  </b-finding>
</b-chapter>
<b-chapter id="agent" icon="terminal" title="กรอกตารางด้วย Claude Code">
  <b-why>ส่งตารางทั้งหมดให้เอเจนต์ทำได้: Claude Code หรือเอเจนต์อื่นที่รองรับ MCP เชื่อมต่อ Airtable แล้วสร้างแถว ดึงข้อมูลรายงาน และวิเคราะห์บทสนทนาเอง</b-why>
  <b-pipe label="เอเจนต์กรอกตาราง">
    <node icon="terminal" color="c-code" sub="หรือเอเจนต์อื่นที่รองรับ MCP"><b-ink-link href="https://code.claude.com/docs" plain>Claude Code</b-ink-link></node>
    <node icon="plug" color="c-light" sub="อ่านและเขียนตาราง">Airtable MCP</node>
    <node icon="table" color="c-proj" sub="ทุกช่องและทุกสถานะ">Airtable</node>
  </b-pipe>
  <b-todo top="12">
    <item t="สร้างแถว">จากรายชื่อคนที่เลือกไว้สัมภาษณ์: ชื่อ กลุ่ม สถานะ</item>
    <item t="ดึงข้อมูลรายงาน">โทเคน $ กิจกรรม ความถี่ตามรายงาน</item>
    <item t="วิเคราะห์ช่องบันทึก">ด้วย prompt เดียวกับใน ChatGPT: ช่องต่างๆ ความยาก ความถี่ที่บอกเอง คำพูดอ้างอิง</item>
    <item t="อัปเดตสถานะ">"ไม่ครบ" (คำตอบไม่สมบูรณ์) ถ้าผลวิเคราะห์มี "ไม่มีข้อมูล"</item>
  </b-todo>
  <b-tool-links>
    <item href="https://support.airtable.com/docs/using-the-airtable-mcp-server" icon="external" sub="วิธีเชื่อมต่อ">Airtable MCP</item>
  </b-tool-links>
  <b-finding>
    <ex>เอเจนต์สร้างแถว ดึงรายงาน วิเคราะห์ช่องบันทึก และอัปเดตสถานะ: สี่ขั้นโดยไม่ต้องกรอกเอง</ex>
    <gen>ผ่าน MCP เอเจนต์ทำงานกับตารางโดยตรง ผู้วิจัยเหลือหน้าที่คุยกับผู้ตอบและตรวจข้อสรุปกับคำพูดจริง prompt วิเคราะห์เดียวสำหรับทั้งเอเจนต์และ ChatGPT ทำให้แถวเทียบกันได้</gen>
    <do>เชื่อม Airtable MCP กับ Claude Code และเริ่มด้วยคำสั่งเดียว: "สร้างแถวให้คนในรายชื่อด้วยสถานะ กำลังดำเนินการ"</do>
  </b-finding>
</b-chapter>
<b-chapter id="form" icon="doc-lines" title="แบบสอบถาม">
  <b-why>แบบสอบถามเขียนหลังการสัมภาษณ์ เมื่อรู้แล้วว่ามีงานและความยากแบบไหนบ้าง ส่งถึงทั้งบริษัทเพื่อดูว่าเรื่องเหล่านั้นแพร่หลายแค่ไหน คำถามสั้น และตัวเลือกคำตอบมาจากการวิเคราะห์บทสัมภาษณ์</b-why>
  <b-survey>
    <q t="คุณทำงานต่อไปนี้ข้อใดบ้างในที่ทำงาน" color="c-proj" tag="งาน">เลือก: งานจากบทสัมภาษณ์ · อื่นๆ ช่องกรอกเอง</q>
    <q t="คุณทำงานเหล่านี้บ่อยแค่ไหน" color="c-proj" tag="ความถี่ของงาน">เลือก: ทุกวัน · ทุกสัปดาห์ · น้อยกว่านั้น · ไม่ได้ทำ</q>
    <q t="คุณใช้เครื่องมือใดกับงานเหล่านี้" color="c-proj" tag="เครื่องมือ">เลือก: ChatGPT · Claude · Cursor · เครื่องมือ AI อื่น · ไม่ใช้ AI</q>
    <q t="คุณเจอความยากอะไรบ้างในงานเหล่านี้" color="c-proj" tag="ความยาก">เลือก: ความยากจากบทสัมภาษณ์ · ไม่เจอความยากใดเลย · อื่นๆ ช่องกรอกเอง</q>
    <q t="ความยากนี้ขัดขวางงานบ่อยแค่ไหน" color="c-proj" tag="ความถี่ของความยาก">เลือก: เกือบทุกงาน · บางครั้ง · นานๆ ครั้ง</q>
    <q t="ส่งผลต่อผลลัพธ์มากแค่ไหน" color="c-proj" tag="ผลกระทบ">เลือก: ขัดขวางมาก · ขัดขวาง · แทบไม่มีผล</q>
    <q t="ตอนนี้คุณแก้ปัญหาความยากนี้อย่างไร" tag="วิธีแก้ขัด">ช่องกรอกเอง · ไม่ได้ทำอะไร</q>
    <q t="มีอะไรสำคัญอีกที่คำถามไม่ได้ถาม" tag="ที่ตกหล่น">ช่องกรอกเอง</q>
  </b-survey>
  <b-finding>
    <ex>แปดคำถามสั้น: หกข้อแบบเลือกคำตอบ โดยตัวเลือกมาจากบทสัมภาษณ์ และสองข้อเป็นช่องกรอกเอง</ex>
    <gen>การสัมภาษณ์บอกว่ามีงานและความยากอะไรบ้าง แบบสอบถามบอกว่ามีคนเจอกี่คนและขัดขวางมากแค่ไหน ตัวเลือก "ไม่เจอความยากใดเลย" "ไม่ใช้ AI" และช่องกรอกเองจับสิ่งที่การสัมภาษณ์พลาดไป</gen>
    <do>รวบรวมตัวเลือกคำตอบจากการวิเคราะห์บทสัมภาษณ์ แล้วส่งแบบสอบถามถึงทั้งบริษัท นับสัดส่วนคนที่เจอความยากแต่ละอย่าง บ่อยแค่ไหน และขัดขวางมากเท่าไร สัดส่วนเหล่านี้ป้อนเข้า<a href="/blog/chatgpt-enterprise-usage-report/#decision">ขั้นตอนการตัดสินใจ</a>ในรายงาน</do>
  </b-finding>
</b-chapter>
<b-chapter id="after" icon="bulb" title="วิเคราะห์บทสัมภาษณ์: prompt วิเคราะห์และการตรวจกับข้อมูลรายงาน">
  <b-steps round>
    <step t="ส่งข้อความในช่องบันทึกให้ ChatGPT">ด้วย prompt เดียวกันทุกบทสัมภาษณ์</step>
    <step t="ย้ายคำตอบของ ChatGPT ลงแถวของคนนั้น">งาน บริบท วิธีที่เลือก ผลลัพธ์ แรงที่ใช้ ข้อจำกัด ความยาก ความถี่ที่บอกเอง</step>
    <step t="จัดกลุ่มตารางตามความยาก">คนที่มีความยากเหมือนกันมาอยู่ติดกัน: เห็นว่ามีกี่คนและมาจากกลุ่มไหน</step>
    <step t="ตรวจด้วยแบบสอบถาม">สิ่งที่ซ้ำกลายเป็นตัวเลือกคำตอบในแบบสอบถามทั้งบริษัท การแจกแจงตามทีมเทียบกับ<a href="/blog/chatgpt-enterprise-usage-report/#uniformity">ความสม่ำเสมอ</a></step>
  </b-steps>
  <b-subhead>Prompt วิเคราะห์บทสัมภาษณ์</b-subhead>
  <b-prompt>
    Below is a conversation with an employee about their work tasks.
    Return strictly by field, only what the person said themselves:
    1. Task: the last specific work task
    2. Context: for whom and why, what means they had
    3. Chosen tool or way, and why
    4. Result
    5. Effort: time and manual rework
    6. Constraints: data, access, security
    7. Difficulties: categories from the list {categories from the report's sign table} or "no difficulties"; if none fits, a new category in your own words
    8. Self-reported frequency: weekly / regularly / occasionally / doesn't use / unknown
    9. 1–2 verbatim quotes
    If something is not in the conversation, write "no data" and don't make it up.

    {text from Notes}
  </b-prompt>
  <b-gauge label="ทำอย่างไรกับสิ่งที่ซ้ำ">
    <row k="1 คน" w="15%" color="c-none">กรณีเดี่ยว</row>
    <row k="ซ้ำในหลายคน" w="45%" color="c-light">ตรวจด้วยแบบสอบถาม</row>
    <row k="แบบสอบถามยืนยัน" w="100%" color="c-work">เข้าขั้นตอนการตัดสินใจ</row>
  </b-gauge>
  <b-finding>
    <ex>ความยากของคนเดียวเป็นกรณีเดี่ยว ส่วนสิ่งที่ซ้ำในหลายคนเป็นเหตุให้ตรวจด้วยแบบสอบถาม</ex>
    <gen>การวิเคราะห์เก็บงานทั้งชิ้น ไม่ใช่แค่ความยาก: ถ้าไม่มีบริบท วิธีที่เลือก และแรงที่ใช้ จะบอกไม่ได้ว่าต้องมีเครื่องมือใหม่หรือไม่ สิ่งที่ซ้ำในบทสัมภาษณ์บอกว่าควรตรวจอะไร ไม่ได้บอกว่ามีคนเจอกี่คน เรื่องนั้นมีแต่แบบสอบถามที่บอกได้ prompt เดียวสำหรับทุกบทสนทนาทำให้ช่องเทียบกันได้ และคำว่า "ไม่มีข้อมูล" กัน ChatGPT ไม่ให้แต่งเรื่องเอง</gen>
    <do>เมื่อมีผลวิเคราะห์สะสมหลายชิ้น ให้จัดกลุ่มตารางตามความยาก แล้วย้ายสิ่งที่ซ้ำไปเป็นตัวเลือกคำตอบของ<a href="#form">แบบสอบถาม</a> บันทึก "ไม่มีความยาก" เป็นผลลัพธ์หนึ่ง ใช้หมวดหมู่จาก<a href="/blog/chatgpt-enterprise-usage-report/#signs">ตารางสัญญาณ</a>ของรายงาน และเพิ่มหมวดใหม่ถ้าไม่มีหมวดใดตรง การตัดสินใจเรื่องโครงการนำร่องเป็นไปตาม<a href="/blog/chatgpt-enterprise-usage-report/#decision">ขั้นตอน</a>ในรายงาน</do>
  </b-finding>
  <b-sublabel top="22">คำถามที่พบบ่อย</b-sublabel>
  <b-qa>
    <q t="วิเคราะห์บทสัมภาษณ์ด้วย ChatGPT อย่างไร">ส่งข้อความบทสนทนาจากช่องบันทึกให้ ChatGPT ด้วย prompt เดียวกันทุกบทสัมภาษณ์ แล้วคัดลอกคำตอบลงแถวของคนนั้น: งาน บริบท วิธี ผลลัพธ์ แรงที่ใช้ ข้อจำกัด ความยาก และความถี่ตามที่ผู้ตอบบอก จากนั้นจัดกลุ่มตารางตามความยาก</q>
    <q t="เอเจนต์วิเคราะห์บทสัมภาษณ์แทนได้ไหม">ได้ Claude Code หรือเอเจนต์อื่นที่รองรับ MCP เชื่อมต่อ Airtable สร้างแถว ดึงข้อมูลรายงาน และวิเคราะห์ช่องบันทึกด้วย prompt เดียวกัน ผู้วิจัยยังคุยกับผู้ตอบและตรวจข้อสรุปกับคำพูดจริงเอง</q>
    <q t="เทียบสิ่งที่คนพูดกับข้อมูลอย่างไร">ตารางมีสองช่อง: ความถี่ที่ผู้ตอบบอกเอง และความถี่ตามรายงาน โดยมีเครื่องหมายแจ้งความไม่ตรงกันอยู่ข้างๆ ความไม่ตรงกันเอาไปคุยกับผู้ตอบ แทนที่จะแก้ตัวเลขเงียบๆ</q>
    <q t="วิเคราะห์การโทรกับคำตอบเป็นข้อความร่วมกันอย่างไร">บทสนทนาแบบข้อความคัดลอกลงช่องบันทึกช่องเดียวกันพร้อมเวลาของแต่ละข้อความ คำตอบแบบข้อความช่วยหากรณีและหัวข้อ แต่ไม่นับว่าเท่ากับการโทร</q>
  </b-qa>
</b-chapter>
<b-chapter id="faq" icon="chat" title="คำถามที่พบบ่อย">
  <b-faq-cards>
    <q t="สัมภาษณ์เรื่องการทำงานกับ AI ใน 30 นาทีทำอย่างไร">สร้างบทสนทนารอบงานจริงชิ้นล่าสุด: ทำอะไร ได้ผลอย่างไร ต้องใช้แรงเท่าไร จากนั้นถามถึงกรณีที่สำเร็จและกรณีที่ผู้ตอบเลิกใช้ AI</q>
    <q t="โทรหรือข้อความ">ผู้ตอบเลือกรูปแบบเอง การโทรได้เรื่องเล่าละเอียดพร้อมคำถามต่อ ข้อความได้คำตอบสั้น จึงไม่นับคำตอบแบบข้อความว่าเท่ากับการโทร</q>
    <q t="วิเคราะห์บทสัมภาษณ์ด้วย ChatGPT อย่างไร">ส่งข้อความบทสนทนาให้ ChatGPT ด้วย prompt เดียวกันทุกบทสัมภาษณ์ แล้วคัดลอกคำตอบลงแถวของคนนั้นใน Airtable</q>
    <q t="ตรวจสิ่งที่คนพูดกับข้อมูลอย่างไร">ตารางมีสองช่องวางคู่กัน: ความถี่ที่ผู้ตอบบอกเอง และความถี่จากรายงาน ความแตกต่างเอาไปคุยกับผู้ตอบ</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="อ่านต่อ">
  <b-links cols="2">
    <item href="/blog/chatgpt-enterprise-usage-report/" k="รายงาน" t="รายงานการใช้งาน ChatGPT Enterprise">ใครใช้ ใช้กับงานอะไร และควรซื้อเครื่องมือใดต่อไป</item>
    <item href="/blog/who-to-interview-before-buying-ai-tools/" k="กลุ่มตัวอย่าง" t="ควรสัมภาษณ์ใคร">ควรเชิญใครมาสัมภาษณ์</item>
  </b-links>
</b-chapter>
<b-footer>การออกแบบการสัมภาษณ์อิงคำแนะนำจาก <a href="https://t.me/Kseniya_Vasil" target="_blank" rel="noopener">@Kseniya_Vasil</a> ชื่อ ทีม และตัวเลขทั้งหมดในตัวอย่างเป็นข้อมูลสมมติ</b-footer>
</b-post>
