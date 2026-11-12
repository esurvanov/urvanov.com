---
title: รายงานการใช้งาน ChatGPT Enterprise ของบริษัท: ใครใช้ ใช้ทำอะไร และควรซื้อเครื่องมือ AI ตัวไหนต่อ
date: 2026-09-28
updated: 2026-11-13
description: จะรู้ได้อย่างไรว่าพนักงานใช้ ChatGPT Enterprise อย่างไร: ไฟล์ส่งออกห้าชุดจากคอนโซลผู้ดูแลระบบกลายเป็นความลึกของการนำไปใช้ ความสม่ำเสมอระหว่างทีม เครื่องมือหลัก แผนที่งาน การตรวจสอบข้อมูล และรายชื่อผู้ที่ควรสัมภาษณ์
tags: AI, วิจัย, การวิเคราะห์
category: research
layout: wide
image: /og/chatgpt-enterprise-usage-report.en.png
mentions: ChatGPT Enterprise, Codex, ChatGPT Work, Claude in Chrome
toc: why=ทำไมต้องมีรายงาน | order=ขั้นตอนการทำงาน | data=สิ่งที่ผู้ดูแลระบบเห็น | layer1=ภาพรวม | layer2=ลักษณะของงาน | layer3=การตรวจสอบ | layer4=การเลือกบุคคล | start=เริ่มจากตรงไหน | faq=คำถาม | next=อ่านเพิ่มเติม
---

ChatGPT Enterprise คือ ChatGPT เวอร์ชันสำหรับองค์กรที่มีคอนโซลผู้ดูแลระบบซึ่งแสดงว่าใครใช้เครื่องมือและใช้อย่างไร รายงานนี้สร้างจากไฟล์ส่งออกห้าชุดจากคอนโซล และแสดงความลึกของการนำไปใช้ ความสม่ำเสมอระหว่างทีม ลักษณะของงาน และบุคคลที่ควรสัมภาษณ์ ใช้ตัดสินใจว่าจะซื้อเครื่องมือ AI ตัวไหน ควรฝึกอบรมใคร และควรทดสอบสมมติฐานอะไร

<b-post series="kto">
<b-dir-map label="สี่ด้านของการวิเคราะห์">
  <dir href="#layer1" n="01" color="c-chat" t="ภาพรวม" big="21%" sub="ใช้ทุกสัปดาห์" dec="ควรลงทุนฝึกอบรมที่ไหน"><b-mini-funnel><seg w="82%" color="d-rare" ink="d-rare-t">82%</seg><seg w="47%" color="d-reg" ink="d-reg-t">47%</seg><seg w="21%" color="d-week" ink="d-week-t">21%</seg></b-mini-funnel></dir>
  <dir href="#layer2" n="02" color="c-work" t="ลักษณะของงาน" big="70%" sub="ของการเชื่อมต่อคือ Slack และ Notion" dec="ควรซื้อเครื่องมือตัวไหน" art="chatgpt-enterprise-usage-report/map-donut"></dir>
  <dir href="#layer3" n="03" color="c-code" t="การตรวจสอบ" big="±2%" sub="ค่าเผื่อในการกระทบยอดไฟล์ส่งออก" dec="เชื่อตัวเลขได้ไหม"><b-csv-check><file color="c-chat">CHAT</file><file color="c-work">WORK</file><file color="c-code">CODEX</file></b-csv-check></dir>
  <dir href="#layer4" n="04" color="c-proj" t="การเลือกบุคคล" big="16" sub="จาก 340 ในตัวอย่าง — สำหรับสัมภาษณ์" dec="ควรคุยกับใครก่อนซื้อ"><b-dot-grid n="340" on="5,31,58,77,96,120,141,163,187,205,226,248,269,290,311,333"/></dir>
</b-dir-map>
<b-chapter id="why" title="รายงานช่วยตัดสินใจเรื่องอะไร">
  <b-lead-large><b>โจทย์ธุรกิจ:</b> หาว่าชุดเครื่องมือ AI ปัจจุบันขาดตกบกพร่องในงานด้านใด และควรทดสอบโซลูชันใดก่อนซื้อ ผู้ตัดสินใจคือเจ้าของงบประมาณเครื่องมือ AI ร่วมกับหัวหน้าทีมที่รันโครงการนำร่อง ส่วนการเข้าถึงข้อมูลและความปลอดภัยต้องได้รับอนุมัติจากทีมความมั่นคงปลอดภัยสารสนเทศ เกณฑ์การตัดสินใจคือสัญญาณในตารางด้านล่าง</b-lead-large>

  การที่ชุดปัจจุบันยังไม่เหมาะสมที่ใดที่หนึ่งเป็นเพียงสมมติฐาน: รายงานและการสัมภาษณ์เป็นตัวทดสอบ คำว่า "ไม่เหมาะสม" แยกเป็นสัญญาณที่ทดสอบได้ ข้อสรุปว่า "ไม่ต้องใช้เครื่องมือใหม่" ก็เป็นผลลัพธ์เช่นกัน

  <b-table id="signs">
    <table><thead>
    <tr><th>สัญญาณ</th><th>ปรากฏอย่างไร</th><th>หมวดการสัมภาษณ์</th><th>รายงานแสดงตรงไหน</th></tr>
    </thead><tbody>
    <tr><td>คุณภาพของผลลัพธ์</td><td>คำตอบไม่แม่นยำหรือแต่งขึ้น</td><td><b-tag kind="no" line>hallucination</b-tag></td><td><a href="/blog/chatgpt-enterprise-usage-report/#connectors">ตัวเชื่อมต่อ</a></td></tr>
    <tr><td>เวลาและการแก้ไขด้วยมือ</td><td>โต้ตอบไปมาจำนวนมาก ผลลัพธ์ต้องแก้ให้เสร็จด้วยมือ</td><td><b-tag kind="no" line>prompt</b-tag></td><td><a href="/blog/chatgpt-enterprise-usage-report/#depth">ความลึก</a>, <a href="/blog/chatgpt-enterprise-usage-report/#main-tool">เครื่องมือหลัก</a></td></tr>
    <tr><td>การทำซ้ำได้</td><td>งานเดียวกันได้ผลต่างกันทุกครั้ง</td><td><b-tag kind="no" line>การทำซ้ำได้</b-tag></td><td><a href="/blog/chatgpt-enterprise-usage-report/#skills">Skill</a>, <a href="/blog/chatgpt-enterprise-usage-report/#projects">หัวข้อ project</a></td></tr>
    <tr><td>การขยายขนาด</td><td>สถานการณ์ที่ใช้ได้ไม่ถ่ายโอนไปยังทีมอื่น</td><td><b-tag kind="no" line>การขยายขนาด</b-tag></td><td><a href="/blog/chatgpt-enterprise-usage-report/#uniformity">ความสม่ำเสมอ</a></td></tr>
    <tr><td>การเข้าถึงข้อมูล</td><td>ระบบที่ต้องใช้ไม่ได้เชื่อมต่อ</td><td><b-tag kind="no" line>การเข้าถึงข้อมูล</b-tag></td><td><a href="/blog/chatgpt-enterprise-usage-report/#connectors">ตัวเชื่อมต่อ</a></td></tr>
    <tr><td>ต้นทุน</td><td>แพงต่อหน่วยผลลัพธ์</td><td><b-tag kind="no" line>ต้นทุน</b-tag></td><td><a href="/blog/chatgpt-enterprise-usage-report/#top-spend">อันดับตามการใช้จ่าย</a></td></tr>
    </tbody></table>
  </b-table>
  <b-cap>ขอบเขตของข้อมูล: รายงานเห็นเฉพาะเครื่องมือของบริษัทและเฉพาะช่วงเวลาที่ส่งออก คือ 3 เดือน บัญชีส่วนตัวและเครื่องมืออื่นไม่ปรากฏในรายงาน</b-cap>
  <b-section-title id="decision" top="22">คำตอบกลายเป็นการตัดสินใจซื้ออย่างไร</b-section-title>
  <b-why>รายงานบอกว่าควรดูที่ไหน และการตัดสินใจซื้อทำหลังห้าขั้นตอนนี้เท่านั้น เพื่อให้เงินไปลงกับงานที่หลายคนมีและยังไม่มีอะไรรองรับ</b-why>
  <b-steps top="18" round>
    <step t="การสัมภาษณ์">มีงานและความยากลำบากอะไรบ้าง และตอนนี้ผู้คนแก้ปัญหาอ้อมอย่างไร</step>
    <step t="แบบสอบถามทั้งบริษัท">กี่คนเจอความยากลำบากนี้ บ่อยแค่ไหน และขัดขวางการทำงานมากเพียงใด</step>
    <step t="เปรียบเทียบ">ขนาดของงาน ความรุนแรงของผลที่ตามมา วิธีแก้ปัญหาอ้อม ต้นทุนของโซลูชัน</step>
    <step t="ทดสอบเครื่องมือ">ตัวเลือกที่น่าสนใจบนงานจริงร่วมกับพนักงาน</step>
    <step t="การตัดสินใจ">เจ้าของงบประมาณตัดสินใจตาม<a href="#signs">หกสัญญาณข้างบน</a>: คุณภาพ เวลาและการแก้ไข การทำซ้ำได้ การขยายขนาด การเข้าถึงข้อมูล ต้นทุน; "ไม่ต้องใช้เครื่องมือใหม่" เป็นผลลัพธ์ที่ใช้ได้</step>
  </b-steps>
  <b-io justify>
    <item k="อินพุต">ไฟล์ส่งออกจากคอนโซล: ข้อความ ค่าใช้จ่าย project และตัวเชื่อมต่อของแต่ละคน</item>
    <item k="รายงานทำอะไร">แปลงไฟล์ส่งออกเป็นกลุ่ม ความพร้อมของทีม และบุคคลเฉพาะราย เป็นวัตถุดิบสำหรับการตัดสินใจ</item>
    <item k="การตัดสินใจที่ได้">นำเครื่องมือไหนไปทดลอง กับทีมไหน ควรคุยกับใครก่อนซื้อ และตรงไหนไม่ต้องใช้งบ</item>
  </b-io>
</b-chapter>
<b-chapter id="order" title="ขั้นตอนการทำงาน">

  ห้าขั้นตอนจากการส่งออกถึงรายชื่อบุคคลที่เสร็จสมบูรณ์

  <b-steps top="18" round>
    <step t="ส่งออกข้อมูล">ห้าส่วนของคอนโซล รายละเอียดใน "แหล่งข้อมูล"</step>
    <step t="สร้างภาพรวม">ความลึกของการนำไปใช้ ความสม่ำเสมอระหว่างทีม เครื่องมือหลัก กลุ่ม</step>
    <step t="วาดแผนที่ลักษณะของงาน">ผู้คนแก้งานอะไร ด้วยเครื่องมือในตัวอะไร และด้วยการเชื่อมต่ออะไร</step>
    <step t="ตรวจเทียบข้อมูลดิบ">ตรวจสรุปแต่ละอย่างเทียบกับไฟล์ส่งออกต้นทาง</step>
    <step t="เลือกบุคคลและสรุป">รายชื่อสัมภาษณ์และคำถามที่จะทดสอบในนั้น<b-link-chips><item href="/blog/who-to-interview-before-buying-ai-tools/" icon="arrow-right">ควรสัมภาษณ์ใคร</item><item href="/blog/ai-interviews-without-leading-questions/" icon="arrow-right">สัมภาษณ์อย่างไร</item></b-link-chips></step>
  </b-steps>
</b-chapter>
<b-chapter id="data" title="ผู้ดูแลระบบ ChatGPT Enterprise เห็นอะไร: ได้ข้อมูลจากที่ไหน">

  ทุกอย่างสร้างจากห้าส่วนของคอนโซลผู้ดูแลระบบ <a href="https://openai.com/chatgpt/enterprise/" target="_blank" rel="noopener">ChatGPT Enterprise</a> เดียว วางเมาส์เหนือ <b>i</b> เพื่อดูว่าแต่ละส่วนมีอะไรบ้าง

  <b-subhead>ส่งออกข้อมูลจากคอนโซล ChatGPT Enterprise อย่างไร: ด้วยมือ และด้วยเอเจนต์เบราว์เซอร์ Claude in Chrome</b-subhead>
  <b-howto><b>ส่งออกอย่างไร</b> คอนโซลมี API แต่ครอบคลุมเพียงบางส่วนของข้อมูล: <a href="https://learn.chatgpt.com/docs/enterprise/analytics-api" target="_blank" rel="noopener">การวิเคราะห์ Codex</a> ต้นทุนเครดิต และบันทึกการสนทนาเพื่อการปฏิบัติตามข้อกำหนด ไฟล์ส่งออกของผู้ใช้ project และ skill รวมถึง leaderboard รายผลิตภัณฑ์ รวบรวมผ่านอินเทอร์เฟซได้ง่ายกว่า การส่งออกเป็นงานที่เหมาะกับ <a href="https://claude.com/claude-in-chrome" target="_blank" rel="noopener">Claude in Chrome</a>: มันเปิดส่วนที่ถูกต้อง ตั้งตัวกรอง คลิกส่งออก และบันทึก CSV ทุกขั้นตอนมองเห็นบนหน้าจอ จึงจับตัวกรองหรือส่วนที่ผิดได้ทันที ก่อนตัวเลขจะเข้าสู่รายงาน<warn icon="shield-alert"><b>การเข้าถึง</b> API ของคอนโซลไม่ได้ใช้ได้เสมอไป: นโยบายความปลอดภัยของบริษัทมักจำกัดคีย์ API ของผู้ดูแลระบบ ในกรณีนั้น ให้ส่งออกทุกส่วนผ่านอินเทอร์เฟซ</warn></b-howto>
  <b-sources>
    <src icon="users-alt" href="https://chatgpt.com/admin/usage/users" t="ผู้ใช้" path="chatgpt.com/admin/usage/users" what="ข้อความ วันที่ใช้งาน และเครื่องมือในตัวของแต่ละคน" tip-label="สิ่งที่อยู่ในส่วนผู้ใช้">ส่งออก CSV สำหรับช่วงเวลาไม่เกิน 12 เดือน ฟิลด์: messages, tool_messages, gpt_messages, project_messages, department, groups, seat_type, last_day_active คอนโซลเองติดป้าย "power users" ให้</src>
    <src icon="trophy" href="https://admin.openai.com" t="Leaderboard" path="admin.openai.com → Analytics → Leaderboard" what="ค่าใช้จ่าย โทเคน และบรรทัดโค้ดของแต่ละคน แยกตามผลิตภัณฑ์ Chat, Work และ Codex" tip-label="สิ่งที่อยู่ใน Leaderboard">ปุ่มส่งออกข้างหัวข้อ → "User ranking" CSV หรือ JSON ฟิลด์: Name, Email, Credits, Estimated costs, Tokens, Lines of code ตัวกรอง "Product" เปลี่ยนเนื้อหาของไฟล์ส่งออก ประวัติครอบคลุมประมาณ 120 วัน</src>
    <src icon="folder-iv" href="https://chatgpt.com/admin/usage/projects" t="Project" path="chatgpt.com/admin/usage/projects" what="ใครสร้าง project มีกี่ข้อความ และยังใช้งานอยู่หรือไม่" tip-label="สิ่งที่อยู่ในส่วน Project">ฟิลด์: project_name, project_creator_email, messages_workspace, unique_messagers_workspace, is_active บางชื่อมาเป็น [content redacted]: คอนโซลซ่อนเอง</src>
    <src icon="plug-alt" href="https://chatgpt.com/admin/usage" t="ภาพรวม: ตัวเชื่อมต่อและ skill" path="chatgpt.com/admin/usage" what="ผู้คนเชื่อมผู้ช่วยกับแอปไหน และใช้ skill อะไร" tip-label="สิ่งที่อยู่ในส่วนภาพรวม">บล็อก "App interactions" และ "Skills": จำนวนการเรียกใช้ตัวเชื่อมต่อและ skill แต่ละอย่างในช่วงเวลาที่เลือก</src>
    <src icon="chart-line-iv" href="https://admin.openai.com" t="Analytics: งาน" path="admin.openai.com → Analytics → Tasks" what="การจำแนกงานของคอนโซลเอง: โค้ด หรืองานความรู้ (ทุกอย่างยกเว้นโค้ด)" tip-label="สิ่งที่อยู่ในแท็บงาน">สัดส่วนโค้ดและงานความรู้ งานอันดับต้นตามเครดิต โมเดลของ OpenAI ติดป้ายงานบนตัวอย่างประมาณ 10% ของคำขอในช่วง 30 วัน</src>
  </b-sources>
</b-chapter>
<b-chapter id="layer1" icon="grid" title="ภาพรวม">

  สี่ส่วนถัดไปคือตัวรายงาน แต่ละส่วนมีเป้าหมายของตัวเอง <b>เป้าหมาย:</b> แสดงว่าในบริษัทมีกลุ่มคนอะไรบ้างและแต่ละกลุ่มใหญ่แค่ไหน

  <b-subsection id="depth" title="ความลึกของการนำไปใช้">
    <b-art-row names="chatgpt-enterprise-usage-report/depth-tried chatgpt-enterprise-usage-report/depth-regular chatgpt-enterprise-usage-report/depth-weekly"/>
    <b-why>ความลึกของการนำไปใช้แสดงว่าเครื่องมือเข้าไปอยู่ในงานของบริษัทลึกแค่ไหน: กี่คนเคยใช้อย่างน้อยหนึ่งครั้ง ใช้เป็นประจำ และใช้ทุกสัปดาห์ ผู้ที่ไม่เคยเขียนในแชตและทำงานผ่าน Codex อย่างเดียวแสดงแยกต่างหาก <b>การตัดสินใจ:</b> ควรลงทุนฝึกอบรมกลุ่มไหน และควรซื้อสิทธิ์ใช้งานเพิ่มตอนนี้หรือไม่</b-why>
    <b-share-bar kind="wide">
      <seg w="20.9%" color="d-week" ink="d-week-t">71</seg>
      <seg w="25.9%" color="d-reg" ink="d-reg-t">88</seg>
      <seg w="28.5%" color="d-rare" ink="d-rare-t">97</seg>
      <seg w="6.8%" color="d-api" ink="d-api-t">23</seg>
      <seg w="17.9%" color="d-none" ink="d-none-t">61</seg>
    </b-share-bar>
    <b-legend>
      <item color="d-week">ทุกสัปดาห์</item>
      <item color="d-reg">เป็นประจำ</item>
      <item color="d-rare">นาน ๆ ครั้ง</item>
      <item color="d-api">Codex อย่างเดียว</item>
      <item color="d-none">ไม่ใช้เลย</item>
    </b-legend>
    <b-cap>340 คน</b-cap>
    <b-cap>แหล่งที่มา: <a href="https://chatgpt.com/admin/usage/users" target="_blank" rel="noopener">ผู้ใช้</a> · <a href="https://admin.openai.com" target="_blank" rel="noopener">Leaderboard</a> สำหรับผู้ที่ทำงานผ่าน Codex อย่างเดียว</b-cap>
    <b-finding>
      <ex>82% ของผู้คนเคยลองเครื่องมือนี้ 47% ใช้ในงาน และสำหรับ 21% กลายเป็นนิสัยประจำสัปดาห์ พื้นที่ที่จะเพิ่มความลึกคือ 97 คนในกลุ่ม "นาน ๆ ครั้ง"</ex>
      <gen>ช่องว่างระหว่าง "เคยลอง" กับ "ใช้ทุกสัปดาห์" แสดงว่ากี่คนหยุดหลังความพยายามครั้งแรก ๆ เกณฑ์เทียบสำหรับการนำไปใช้ในวงกว้างคือ 50–70% ของพนักงานใช้ในงานประจำวัน จนกว่าการนำไปใช้จะถึงเกณฑ์นี้ สิทธิ์ใช้งานเพิ่มจะไม่ผลักดันการเติบโต: มีบางอย่างนอกเหนือจากการเข้าถึงที่รั้งผู้คนไว้</gen>
      <do>ลงทุนฝึกอบรมในกลุ่มที่ใหญ่ที่สุดระหว่าง "เคยลอง" กับ "ทุกสัปดาห์": ให้การเติบโตของการใช้เป็นประจำเร็วที่สุด นับการแบ่งกลุ่มใหม่หลังฝึกอบรมเพื่อดูว่าผู้คนย้ายไปที่ไหน</do>
    </b-finding>
    <b-info-note icon="flag-alt-iv"><b>สำคัญ</b> เลือก 5–10 คนจากกลุ่ม "นาน ๆ ครั้ง" หาในการสัมภาษณ์ว่าตอนนี้พวกเขาทำงานให้เสร็จอย่างไร และทบทวนกรณีงานจริงร่วมกับพวกเขา นับสัดส่วนรายสัปดาห์ใหม่หลังทบทวน วิธีถามโดยไม่ชี้นำคำตอบอยู่ใน <a href="/blog/ai-interviews-without-leading-questions/">"สัมภาษณ์ผู้คนเรื่องการใช้ AI อย่างไร"</a></b-info-note>
  </b-subsection>
  <b-subsection id="uniformity" title="ความสม่ำเสมอ">
    <b-art-row names="chatgpt-enterprise-usage-report/team-groups" cols="1"/>
    <b-why>ความสม่ำเสมอแสดงว่าเครื่องมือเข้าไปอยู่ในทีมต่าง ๆ อย่างเท่าเทียมแค่ไหน: ทีมละกี่เปอร์เซ็นต์ใช้เป็นประจำ และหนึ่งคนเขียนเฉลี่ยกี่ข้อความ <b>การตัดสินใจ:</b> จะนำสถานการณ์ที่ใช้ได้จากทีมไหน และนำไปให้ทีมไหนก่อน</b-why>
    <b-table>
      <table><thead>
      <tr><th>ทีม</th><th>ผู้ใช้เป็นประจำ</th><th class="bk-table-r">%</th><th class="bk-table-r">ข้อความต่อคน</th></tr>
      </thead><tbody><b-table-group color="d-week" span="4">แข็งแรง · แหล่งของสถานการณ์</b-table-group>
      <tr><td>ทีม A</td><td><b-bar value="74" min="120"/></td><td class="bk-table-r">74%</td><td class="bk-table-r">1,120</td></tr>
      <tr><td>ทีม B</td><td><b-bar value="66" min="120"/></td><td class="bk-table-r">66%</td><td class="bk-table-r">870</td></tr><b-table-group color="d-reg" span="4">ปานกลาง</b-table-group>
      <tr><td>ทีม C</td><td><b-bar value="51" min="120"/></td><td class="bk-table-r">51%</td><td class="bk-table-r">720</td></tr><b-table-group color="d-rare" span="4">ตามหลัง · ที่ที่ควรนำสถานการณ์ไปให้</b-table-group>
      <tr><td>ทีม D</td><td><b-bar value="34" min="120"/></td><td class="bk-table-r">34%</td><td class="bk-table-r">530</td></tr>
      <tr><td>ทีม E</td><td><b-bar value="18" min="120"/></td><td class="bk-table-r">18%</td><td class="bk-table-r">290</td></tr>
      </tbody></table>
    </b-table>
    <b-cap>แหล่งที่มา: <a href="https://chatgpt.com/admin/usage/users" target="_blank" rel="noopener">ผู้ใช้</a> · ฟิลด์ department และ groups</b-cap>
    <b-finding>
      <ex>ในทีม A ผู้คน 74% ใช้เครื่องมือเป็นประจำ ในทีม E 18%: ห่างกัน 56 จุดเปอร์เซ็นต์</ex>
      <gen>ความต่างระหว่างทีมที่กว้างหมายความว่าสถานการณ์ที่ใช้ได้มีอยู่แล้วแต่อยู่ในหนึ่งหรือสองทีม: การย้ายถูกกว่าการซื้อของใหม่ สัดส่วนต่ำสม่ำเสมอในทุกทีมชี้ถึงอุปสรรคร่วม: การเข้าถึง การฝึกอบรม หรืองานที่ไม่เหมาะ สัดส่วนสูงสม่ำเสมอหมายความว่าเครื่องมือหยั่งรากแล้วและไปขั้นต่อไปได้ ทีมที่มีอุปสรรคยังไม่พร้อมสำหรับเครื่องมือใหม่</gen>
      <do>เมื่อความต่างกว้าง ให้จัด meetup: ทีมที่แข็งแรงที่สุดแสดงสามสถานการณ์ให้สองทีมที่อ่อนที่สุด ก่อน meetup สัมภาษณ์ 2–3 ครั้งเรื่องอุปสรรคในทีมที่อ่อนที่สุด นับความต่างใหม่หลัง meetup: ควรแคบลง</do>
    </b-finding>
  </b-subsection>
  <b-subsection id="main-tool" title="เครื่องมือหลัก">
    <b-why>เครื่องมือใดในสามตัวที่กินเกินครึ่งของค่าใช้จ่ายของคนหนึ่งคนในสามเดือน ประเภทของเครื่องมือแสดงว่าคนนั้นทำงานกับ AI อย่างไร</b-why>
    <b-tool-types>
      <prob title="หลายข้อความต่อหนึ่งงาน; ">Prompt</prob>
      <prob title="เชื่อมต่อกับแอปน้อย; ">Hallucination</prob>
      <prob title="งานเดิมโดยไม่มี project หรือ skill; ">การทำซ้ำได้</prob>
      <prob title="สร้าง skill ในทีมเดียวเท่านั้น; ">การขยายขนาด</prob>
      <tool n="1" href="https://openai.com/chatgpt/enterprise/" color="c-chat" t="Chat" art="chatgpt-enterprise-usage-report/tool-chat" on="1,2,3,4"/>
      <tool n="2" href="https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex" color="c-work" t="Work" art="chatgpt-enterprise-usage-report/tool-work" on="3,4"/>
      <tool n="3" href="https://openai.com/codex/" color="c-code" t="Codex" art="chatgpt-enterprise-usage-report/tool-codex" on=""/>
    </b-tool-types>
    <b-share-bar kind="wide">
      <seg w="48.2%" color="c-chat">164 · Chat</seg>
      <seg w="13.8%" color="c-work">47 · Work</seg>
      <seg w="11.2%" color="c-code">38 · Codex</seg>
      <seg w="26.8%" color="c-none" ink="ink">91 · ไม่มีค่าใช้จ่าย</seg>
    </b-share-bar>
    <b-cap>340 คน ช่วง 3 เดือน</b-cap>
    <b-cap>แหล่งที่มา: <a href="https://admin.openai.com" target="_blank" rel="noopener">Leaderboard</a> · ไฟล์ส่งออกสามชุด: ตัวกรอง "Product" = Chat, Work, Codex</b-cap>
    <b-finding>
      <ex>Chat เป็นผลิตภัณฑ์หลักของ 164 จาก 340 คน Codex ของ 38 คน Work ของ 47 คน</ex>
      <gen>เครื่องมือหลักแสดงประเภทของงาน: การสนทนา งานที่ส่งให้เอเจนต์ หรือโค้ด มันกำหนดว่าคนนั้นต้องการอะไรต่อไปและควรใส่ในโครงการนำร่องแบบไหน ขนาดกลุ่มกำหนดขนาดโครงการนำร่อง: กว้างสำหรับสถานการณ์ทั่วไป แคบสำหรับสถานการณ์ที่พบน้อย</gen>
      <do>การตัดสินใจคือย้ายแต่ละกลุ่มไปขั้นถัดไป สำหรับกลุ่ม Chat: Work พร้อมตัวเชื่อมต่อและ MCP ไปยังข้อมูลงาน ซึ่งขจัด prompt และ hallucination สำหรับกลุ่ม Work: spec การตั้งค่า harness และ skill ร่วมกัน ซึ่งทำให้ผลลัพธ์ทำซ้ำได้และถ่ายโอนไปยังทีมอื่นได้</do>
    </b-finding>
  </b-subsection>
  <b-subsection id="top-spend" title="อันดับตามการใช้จ่าย">
    <b-art-row names="chatgpt-enterprise-usage-report/spend-few chatgpt-enterprise-usage-report/spend-mentor chatgpt-enterprise-usage-report/spend-experiment"/>
    <b-why>รายการอันดับเรียงผู้คนตามจำนวนเงินที่จ่ายกับผลิตภัณฑ์เฉพาะ เช่น Codex วิธีนี้ทำให้รายการรวมผู้ที่จ่ายกับ Codex มาก แม้ส่วนใหญ่ของค่าใช้จ่ายจะไปที่ Chat</b-why>
    <b-table>
      <table><thead>
      <tr><th>บุคคล</th><th>ทีม</th><th class="bk-table-r">$ กับโค้ด / 3 เดือน</th><th class="bk-table-r">โทเคน / 3 เดือน</th><th class="bk-table-r">โทเคนต่อ $</th></tr>
      </thead><tbody>
      <tr><td>Hana Sato</td><td>ทีม C</td><td class="bk-table-r">438.20</td><td class="bk-table-r">21.9M</td><td class="bk-table-r">50K</td></tr>
      <tr><td>Luis Moreno</td><td>ทีม A</td><td class="bk-table-r">395.60</td><td class="bk-table-r">12.7M</td><td class="bk-table-r">32K</td></tr>
      <tr><td>Ada Kowalski</td><td>ทีม D</td><td class="bk-table-r">84.30</td><td class="bk-table-r">4.3M</td><td class="bk-table-r">51K</td></tr>
      </tbody></table>
    </b-table>
    <b-cap>แหล่งที่มา: <a href="https://admin.openai.com" target="_blank" rel="noopener">Leaderboard</a> · ไฟล์ส่งออกหนึ่งชุดต่อผลิตภัณฑ์</b-cap>
    <b-finding>
      <ex>Hana Sato และ Luis Moreno จ่ายกับโค้ดมากกว่าคนที่สามในรายการประมาณห้าเท่า ด้วยค่าใช้จ่ายที่ใกล้เคียงกัน Hana ได้โทเคนต่อดอลลาร์มากกว่า Luis หนึ่งเท่าครึ่ง</ex>
      <gen>ผู้ใช้อันดับต้นเป็นผู้นำการเปลี่ยนแปลง: พบสถานการณ์ที่ใช้ได้ก่อน และประสบการณ์ของพวกเขามีผลต่อว่าเครื่องมือเฉพาะทางคุ้มหรือไม่ ข้าง ๆ พวกเขามีเพื่อนร่วมงานที่ระมัดระวังกว่า ซึ่งต้องการเวลามากขึ้นและตัวอย่างจริงบนงานของตัวเอง การจัดอันดับตามสัดส่วนค่าใช้จ่ายซ่อนผู้นำการเปลี่ยนแปลงไว้ จึงควรดูค่าใช้จ่ายสัมบูรณ์</gen>
      <do>ดึงผู้ใช้อันดับต้นมาเป็นผู้ให้คำปรึกษา (mentor): ให้พวกเขาแสดงสถานการณ์ของตัวเองให้เพื่อนร่วมงานที่เพิ่งเริ่ม บนงานของเพื่อนร่วมงานเหล่านั้น ชวนเพื่อนร่วมงานที่ระมัดระวังด้วยตัวอย่างและผลลัพธ์ โดยไม่บังคับ เสนอให้สองถึงสามคนแรกทดลองเครื่องมือเฉพาะทางพร้อมรายงานก่อนและหลัง</do>
    </b-finding>
    <b-info-note icon="chart-bar">leaderboard มีทั้งค่าใช้จ่ายและโทเคน เปรียบเทียบอัตราส่วนโทเคนต่อค่าใช้จ่ายภายในกลุ่มเดียวกัน: ผลิตภัณฑ์เดียวและงานที่คล้ายกัน ใครได้โทเคนต่อดอลลาร์มากกว่าอย่างเห็นได้ชัดมักเลือกโมเดลและโหมดได้ดีกว่า นี่คือผู้ใช้ที่ก้าวหน้าและมีประสิทธิภาพที่สุด และเป็นกลุ่มแรกที่ควรเชิญเป็น mentor แนะนำพวกเขาให้รู้จักเพื่อนร่วมงานในกลุ่มเดียวกันที่อัตราส่วนต่ำกว่า: การทำงานหนึ่งงานด้วยกันมักให้ผลมากกว่าการฝึกอบรมทั่วไป คู่จากต่างทีมนำการถ่ายเทความรู้ข้ามทีม: เทคนิคที่ดีเคลื่อนไปมาระหว่างทีม</b-info-note>
    <b-info-note icon="info">ระหว่างการนำไปใช้ ผู้ใช้อันดับต้นอาจใช้จ่ายมากกว่าคนอื่นถึงหนึ่งลำดับขนาด ควรไม่ตั้งขีดจำกัดในขั้นนี้: ขีดจำกัดทำให้ผู้ที่ใช้เครื่องมือก่อนหมดกำลังใจได้ง่าย แทนที่จะจำกัด ให้ตกลงเรื่องการทดลองและรายงานผล ขีดจำกัดสมเหตุสมผลในภายหลัง เมื่อแนวปฏิบัติพิสูจน์แล้วและรู้ต้นทุนปกติของสถานการณ์</b-info-note>
  </b-subsection>
  <b-subsection id="segments" title="กลุ่มตามพฤติกรรม">
    <b-art-chain label="กลุ่ม → สัมภาษณ์ → ปัญหา → เครื่องมือ">
      <step art="chatgpt-enterprise-usage-report/chain-segment">กลุ่ม</step>
      <step art="chatgpt-enterprise-usage-report/chain-custdev">สัมภาษณ์</step>
      <step art="chatgpt-enterprise-usage-report/chain-problem">ปัญหา</step>
      <step art="chatgpt-enterprise-usage-report/chain-tool">เครื่องมือ</step>
    </b-art-chain>
    <b-why>กลุ่มตามความเข้มของพฤติกรรม สร้างจากไฟล์ส่งออกหลายชุด: คนหนึ่งเขียนมากแค่ไหน ใช้จ่ายเท่าไร และทำอะไร</b-why>
    <b-table>
      <table><thead>
      <tr><th>กลุ่ม</th><th class="bk-table-r">คน</th><th>รายละเอียด</th></tr>
      </thead><tbody>
      <tr><td>เขียนโค้ดในผลิตภัณฑ์ใดก็ตาม</td><td class="bk-table-r">44</td><td>19 คนอยู่นอกทีมเทคนิค</td></tr>
      <tr><td>ค้นคว้าอย่างเข้มข้นในแชต</td><td class="bk-table-r">58</td><td>เฉลี่ย 1,900+ ข้อความ</td></tr>
      <tr><td>งานแบบเอเจนต์</td><td class="bk-table-r">33</td><td>สถานการณ์หลายขั้นตอน ตัวเชื่อมต่อ</td></tr>
      <tr><td>สร้างภาพ</td><td class="bk-table-r">21</td><td>สองในสามมาจากทีมเดียว</td></tr>
      <tr><td>ไม่ใช้เลย</td><td class="bk-table-r">61</td><td>0 ข้อความ $0 ตลอดช่วงเวลา</td></tr>
      </tbody></table>
    </b-table>
    <b-cap>แหล่งที่มา: <a href="https://chatgpt.com/admin/usage/users" target="_blank" rel="noopener">ผู้ใช้</a> · <a href="https://admin.openai.com" target="_blank" rel="noopener">Leaderboard</a></b-cap>
    <b-finding>
      <ex>กลุ่มที่ใหญ่ที่สุดสำหรับการสัมภาษณ์ลูกค้าคือการค้นคว้าอย่างเข้มข้น (58) และโค้ด (44 โดย 19 คนอยู่นอกทีมเทคนิค) สำหรับ 61 คนที่ไม่ใช้เลย คำถามต่างออกไป: อะไรทำให้พวกเขาไม่เริ่ม</ex>
      <gen>ข้อมูลแสดงว่าผู้คนทำอะไร แต่ไม่ได้แสดงว่าเครื่องมือปัจจุบันเพียงพอสำหรับพวกเขาหรือไม่ กลุ่มจึงเป็นสมมติฐาน: ชี้ว่าควรเชิญใครสัมภาษณ์ลูกค้า ควรถามอะไร และผู้คนอาจเจอปัญหาอะไร ตัวเลือกเครื่องมือปรากฏตั้งแต่ตรงนี้ และการเลือกระหว่างตัวเลือกทำหลังการสัมภาษณ์ สำหรับปัญหาที่ยืนยันแล้ว</gen>
      <do>สำหรับแต่ละกลุ่ม คุยกับ 2–3 คน: เครื่องมือปัจจุบันขาดตรงไหน และพวกเขายังทำอะไรด้วยมืออยู่ รวบรวมตัวเลือกสำหรับปัญหาที่ยืนยันแล้วจากสามแหล่ง: การปรึกษาผู้บุกเบิกภายในบริษัท ผู้เชี่ยวชาญภายนอก และเกณฑ์เทียบของตลาด คือสิ่งที่บริษัทคล้ายกันใช้ จากนั้นทำตาม<a href="#decision">ขั้นตอนการตัดสินใจ</a>: แบบสอบถาม การเปรียบเทียบ และทดสอบตัวเลือกบนงานจริง หากปัญหาไม่ได้รับการยืนยัน ให้เลื่อนกลุ่มนั้นไปจนถึงการนับครั้งต่อไป</do>
    </b-finding>
  </b-subsection>
</b-chapter>
<b-chapter id="layer2" icon="briefcase" title="ลักษณะของงาน">

  <b>เป้าหมาย:</b> แสดงว่าผู้คนแก้งานอะไรด้วยเครื่องมือ ด้วยความสามารถในตัวอะไร และผ่านการเชื่อมต่ออะไร

  <b-subsection id="connectors" title="ตัวเชื่อมต่อ">
    <b-art-row names="chatgpt-enterprise-usage-report/conn-guess chatgpt-enterprise-usage-report/conn-data chatgpt-enterprise-usage-report/conn-errors" arrows/>
    <b-why>ตัวเชื่อมต่อเชื่อมผู้ช่วยกับข้อมูลงาน: แชต เอกสาร โค้ด ปฏิทิน มันกำหนดปริมาณ hallucination: หากไม่มีการเข้าถึงข้อมูล โมเดลเติมคำตอบเอง <b>การตัดสินใจ:</b> ควรเชื่อมทีมไหนและระบบไหนก่อน</b-why>
    <b-count-bars>
      <bar k="Slack" w="100%" color="c-work">520</bar>
      <bar k="Notion" w="65%" color="c-work">340</bar>
      <bar k="GitHub" w="40%" color="c-work">210</bar>
      <bar k="ปฏิทิน" w="29%" color="c-work">150</bar>
    </b-count-bars>
    <b-cap>แหล่งที่มา: <a href="https://chatgpt.com/admin/usage" target="_blank" rel="noopener">ภาพรวม</a> · บล็อก "App interactions"</b-cap>
    <b-finding>
      <ex>Slack และ Notion คิดเป็น 70% ของการเชื่อมต่อทั้งหมด โมเดลไม่เห็นระบบนอกรายการนี้: มันตอบคำถามเกี่ยวกับระบบเหล่านั้นด้วยการเดา</ex>
      <gen>ปริมาณ hallucination ลดลงเมื่อโมเดลมีบริบทที่ต้องการ หากไม่มี เอเจนต์พยายามเติมช่องว่างเอง ทีมที่ไม่มีการเชื่อมต่อเลยทำงานกับโมเดลแบบมองไม่เห็น และคำตอบเกือบทุกข้อเกี่ยวกับกระบวนการของพวกเขาเป็นการเดา สัญญาณในการสัมภาษณ์ลูกค้า: "ฉันต้องตรวจสอบซ้ำทุกอย่าง"</gen>
      <do>หาทีมที่ไม่มีการเชื่อมต่อเลย และถามในการสัมภาษณ์ว่าข้อมูลงานของพวกเขาอยู่ที่ไหน เชื่อมแหล่งหนึ่งแล้วเทียบก่อนและหลังกับคำถามเดียวกัน 10 ข้อ: กี่คำตอบผิด และกี่คำตอบอาศัยข้อมูลงาน</do>
    </b-finding>
  </b-subsection>
  <b-subsection id="skills" title="Skill">
    <b-art-row names="chatgpt-enterprise-usage-report/skill-adhoc chatgpt-enterprise-usage-report/skill-repeat chatgpt-enterprise-usage-report/shared-skill" arrows/>
    <b-why>skill แสดงความสุกงอมของกระบวนการ: สถานการณ์ที่เคยอธิบายเป็น skill ทำซ้ำได้เหมือนกันสำหรับทุกคนที่รัน สถิติแสดงว่า skill ไหนถูกใช้และใครสร้างของตัวเอง <b>การตัดสินใจ:</b> กระบวนการใดนำไปใช้กับทีมอื่นได้แล้ว และกระบวนการใดยังขึ้นกับบุคคล</b-why>
    <b-count-bars>
      <bar k="spreadsheets" w="100%" color="c-code">88</bar>
      <bar k="pdf" w="65%" color="c-code">57</bar>
      <bar k="skill-creator" w="33%" color="c-code">29</bar>
    </b-count-bars>
    <b-cap>แหล่งที่มา: <a href="https://chatgpt.com/admin/usage" target="_blank" rel="noopener">ภาพรวม</a> · บล็อก "Skills"</b-cap>
    <b-finding>
      <ex>skill สเปรดชีตและ PDF มีการเรียกใช้ 88 และ 57 ครั้ง: กระบวนการเหล่านี้ทำซ้ำได้แล้ว การเรียกใช้ skill-creator 29 ครั้ง: บางคนกำลังเปลี่ยนสถานการณ์ของตัวเองเป็น skill</ex>
      <gen>ความสุกงอมของกระบวนการเติบโตเป็นขั้น: คำขอครั้งเดียว → skill ส่วนตัว → skill ร่วมของทีม ในขั้นแรก ผลลัพธ์ขึ้นกับว่าใครขอและขออย่างไร ด้วย skill ทำซ้ำได้: อินพุตเดียวกันให้ผลเดียวกัน skill ร่วมทำให้กระบวนการถ่ายโอนไปยังทีมอื่นได้</gen>
      <do>รวบรวม skill ไว้ในรายการเดียวพร้อมผู้สร้าง และทำเครื่องหมายขั้นของแต่ละกระบวนการ เปลี่ยน skill ส่วนตัวที่ใช้มากที่สุดสองตัวให้เป็น skill ร่วม: ผู้สร้างแสดงให้ทีมข้างเคียงดู และทีมตรวจว่าอินพุตเดียวกันให้ผลเดียวกัน สถานการณ์ที่ไม่มี skill และเกิดซ้ำทุกสัปดาห์เป็นตัวเลือกแรกสำหรับ skill ใหม่</do>
    </b-finding>
  </b-subsection>
  <b-subsection id="projects" title="หัวข้อ project">
    <b-art-row names="chatgpt-enterprise-usage-report/proj-files chatgpt-enterprise-usage-report/proj-topics chatgpt-enterprise-usage-report/proj-author" arrows/>
    <b-why>สรุปจัดกลุ่ม project ตามความหมาย และแสดงงานเฉพาะที่ผู้คนทำใน project ที่ดำเนินอยู่ สำหรับการสัมภาษณ์ลูกค้า นี่คือรายการสำเร็จรูป: งานไหนควรคุย และกับใคร <b>การตัดสินใจ:</b> งานไหนและ project ของใครที่ควรครอบคลุมในการสัมภาษณ์ก่อน</b-why>
    <b-table>
      <table><thead>
      <tr><th>หัวข้อ</th><th class="bk-table-r">Project</th><th>งาน</th><th>คำถามสำหรับผู้สร้าง</th></tr>
      </thead><tbody>
      <tr><td>การขาย<b-cell-sub>Pitch library · Elif Demir</b-cell-sub></td><td class="bk-table-r">11</td><td>pitch การรับมือข้อโต้แย้ง ข้อเสนอเชิงพาณิชย์</td><td><b-cell-quote>"ส่วนไหนของ pitch ที่โมเดลทำได้ดี และส่วนไหนที่คุณเขียนใหม่?"</b-cell-quote></td></tr>
      <tr><td>การต้อนรับพนักงานใหม่<b-cell-sub>New hire guide · Rafael Costa</b-cell-sub></td><td class="bk-table-r">8</td><td>คู่มือสำหรับคนใหม่ คำตอบสำหรับคำถามทั่วไป</td><td><b-cell-quote>"คำถามของคนใหม่ข้อไหนที่โมเดลตอบได้เองโดยไม่ต้องพึ่งคุณ?"</b-cell-quote></td></tr>
      <tr><td>วิจัยตลาด<b-cell-sub>Competitor notes · Jonas Keller</b-cell-sub></td><td class="bk-table-r">5</td><td>สรุปคู่แข่ง เปรียบเทียบราคา</td><td><b-cell-quote>"คุณได้ข้อมูลจากที่ไหน และล้าสมัยเร็วแค่ไหน?"</b-cell-quote></td></tr>
      </tbody></table>
    </b-table>
    <b-cap>แหล่งที่มา: <a href="https://chatgpt.com/admin/usage/projects" target="_blank" rel="noopener">Project</a> · ชื่อจัดกลุ่มตามความหมาย</b-cap>
    <b-finding>
      <ex>การขาย (11) และการต้อนรับพนักงานใหม่ (8) มี project ที่ใช้งานอยู่มากที่สุด ผู้สร้าง project ที่ใหญ่ที่สุดเป็นกลุ่มแรกที่ควรสัมภาษณ์</ex>
      <gen>project คือฐานความรู้: ไฟล์และคำสั่งที่โมเดลอาศัยในทุกคำตอบ ยิ่งฐานเต็ม ผลลัพธ์ยิ่งแม่นยำและคงที่ สิ่งที่อยู่ใน project บอกว่าควรถามอะไรในการสัมภาษณ์: เพิ่มไฟล์อะไร ขาดอะไร และคำตอบยังต้องแก้ตรงไหน</gen>
      <do>เปิดสาม project ที่ใช้งานมากที่สุดในแต่ละหัวข้อ แล้วจดรายการงานเฉพาะ ในการสัมภาษณ์ ถามผู้สร้างด้วยคำถามจากตาราง และถามว่าไฟล์และคำสั่งใดเปลี่ยนคุณภาพคำตอบมากที่สุด เปลี่ยนการตั้งค่า project ที่ประสบความสำเร็จให้เป็นเทมเพลตสำหรับหัวข้อนั้น</do>
    </b-finding>
  </b-subsection>
</b-chapter>
<b-chapter id="layer3" icon="check-circle-alt-iv" title="การตรวจสอบ">

  <b>เป้าหมาย:</b> ตรวจสรุปเทียบกับไฟล์ส่งออกดิบ รายการ project และ leaderboard ตัวเลขใดก็ตามในรายงานย้อนไปถึงแถวต้นทางในไฟล์ส่งออกได้

  <b-subsection title="รายการ project ทั้งหมด">
    <b-why>ทุก project พร้อมผู้สร้างและสถานะ รายการนี้ใช้ตรวจสรุปหัวข้อและหาผู้สร้างของ project เฉพาะ</b-why>
    <b-table>
      <table><thead>
      <tr><th>Project</th><th>ผู้สร้าง</th><th>สถานะ</th><th class="bk-table-r">ข้อความ</th></tr>
      </thead><tbody>
      <tr><td>Pitch library</td><td>Elif Demir</td><td><b-status-dot color="c-work">ใช้งานอยู่</b-status-dot></td><td class="bk-table-r">268</td></tr>
      <tr><td>Price list 2026</td><td>Oskar Berg</td><td><b-status-dot color="c-work">ใช้งานอยู่</b-status-dot></td><td class="bk-table-r">64</td></tr>
      <tr><td>Personal draft</td><td>Pavel Novak</td><td><b-status-dot color="c-none">ถูกทิ้ง</b-status-dot></td><td class="bk-table-r">0</td></tr>
      </tbody></table>
    </b-table>
    <b-cap>แหล่งที่มา: <a href="https://chatgpt.com/admin/usage/projects" target="_blank" rel="noopener">Project</a></b-cap>
    <b-finding>
      <ex>project "Personal draft" มีศูนย์ข้อความ</ex>
      <gen>project ว่างคือความพยายามที่ถูกทิ้ง: คนนั้นเริ่มแล้ว แต่เครื่องมือไม่เคยกลายเป็นส่วนหนึ่งของงาน หาก project แบบนี้ยังอยู่ สรุปตามหัวข้อจะนับการใช้งานเกินจริง</gen>
      <do>กรอง project ที่มีศูนย์ข้อความออกก่อนนับ และเชิญผู้สร้าง 2–3 คน: เหตุผลที่เลิกเป็นคำตอบที่มีค่า</do>
    </b-finding>
  </b-subsection>
  <b-subsection title="Leaderboard">
    <b-why>ไฟล์ส่งออกการเรียกเก็บเงินสำหรับแต่ละคนและผลิตภัณฑ์ เครื่องมือหลักและรายการอันดับคำนวณจากไฟล์นี้</b-why>
    <b-table>
      <table><thead>
      <tr><th>ชื่อ</th><th>อีเมล</th><th class="bk-table-r">เครดิต</th><th class="bk-table-r">$</th></tr>
      </thead><tbody>
      <tr><td>Hana Sato</td><td>hana@example.com</td><td class="bk-table-r">10,955</td><td class="bk-table-r">438.20</td></tr>
      <tr><td>Mira Castellano</td><td>mira@example.com</td><td class="bk-table-r">2,425</td><td class="bk-table-r">97.00</td></tr>
      <tr><td>Jonas Keller</td><td>jonas@example.com</td><td class="bk-table-r">470</td><td class="bk-table-r">18.80</td></tr>
      </tbody></table>
    </b-table>
    <b-cap>แหล่งที่มา: <a href="https://admin.openai.com" target="_blank" rel="noopener">Leaderboard</a> · ไฟล์ส่งออกสามชุดที่ใช้ตัวกรอง "Product" ต่างกัน</b-cap>
    <b-finding>
      <ex>ไฟล์ส่งออกของสามผลิตภัณฑ์รวมกันได้เท่ากับค่าใช้จ่ายรวมของแต่ละคนในรายการ</ex>
      <gen>ไฟล์ส่งออกสามชุดที่ใช้ตัวกรอง Product ต่างกันรวมกันได้เท่ากับค่าใช้จ่ายรวมของแต่ละคน ส่วนต่างเกิน 2% หมายถึงไฟล์ส่งออกไม่ครบหรือช่วงเวลาไม่ตรงกัน</gen>
      <do>ก่อนแชร์รายงาน ให้รวมไฟล์ส่งออกสามชุดต่อคนและเทียบกับค่าใช้จ่ายรวม หากต่างกัน ส่งออกข้อมูลใหม่สำหรับช่วงเวลาเดียวกัน</do>
    </b-finding>
  </b-subsection>
</b-chapter>
<b-chapter id="layer4" icon="target" title="การเลือกบุคคล">

  <b>เป้าหมาย:</b> ระบุบุคคลเฉพาะรายสำหรับแต่ละวิธีทำงานให้เสร็จ

  <b-subsection id="candidates" title="ผู้ที่ควรสัมภาษณ์">
    <b-why>รายชื่อสั้น ๆ ของบุคคลสำหรับแต่ละทิศทางที่พบ ในตัวอย่าง รายชื่อสุดท้ายคือ 16 คนจาก 340 ตารางแสดงสามคนแรก บริษัทของคุณจะมีตัวเลขของตัวเอง รายงาน ChatGPT เป็นหนึ่งในแหล่งของกลุ่มตัวอย่าง: ผู้ใช้เครื่องมืออื่นและผู้ที่เลิกใช้เพิ่มตามกฎใน<a href="/blog/who-to-interview-before-buying-ai-tools/#groups">"ควรสัมภาษณ์ใคร"</a> และการตรวจทั่วทั้งพนักงานทำด้วย<a href="/blog/ai-interviews-without-leading-questions/#form">แบบสอบถาม</a></b-why>
    <b-table>
      <table><thead>
      <tr><th>บุคคล</th><th>ทิศทาง</th><th class="bk-table-r">สัญญาณ</th></tr>
      </thead><tbody>
      <tr><td>Hana Sato</td><td><b-status-dot color="c-code">โค้ด</b-status-dot></td><td class="bk-table-r">$438 / 3 เดือน</td></tr>
      <tr><td>Mira Castellano</td><td><b-status-dot color="c-work">งานแบบเอเจนต์</b-status-dot></td><td class="bk-table-r">$97 / 3 เดือน</td></tr>
      <tr><td>Jonas Keller</td><td><b-status-dot color="c-chat">การค้นคว้า</b-status-dot></td><td class="bk-table-r">3,200+ ข้อความ</td></tr>
      </tbody></table>
    </b-table>
    <b-cap>แหล่งที่มา: ไฟล์ส่งออกผู้ใช้ leaderboard และ project รวมกันด้วยอีเมล</b-cap>
    <b-finding>
      <ex>Hana Sato, Mira Castellano และ Jonas Keller เป็นตัวแทนของสามวิธีทำงานที่ต่างกัน: โค้ด งานแบบเอเจนต์ และการค้นคว้า</ex>
      <gen>รายชื่อสั้นมีหนึ่งคนต่อหนึ่งทิศทาง: โค้ด งานเอเจนต์ การค้นคว้า แต่ละบทสนทนาจึงแสดงวิธีทำงานของตัวเองและไม่ซ้ำกับอีกอัน</gen>
      <do>นัดสัมภาษณ์สามครั้ง ทิศทางละหนึ่งครั้ง จากนั้นตัดสินใจว่าทิศทางไหนต้องการอีก 2–3 คน</do>
    </b-finding>
  </b-subsection>
  <b-subsection id="people" title="ตารางบุคคลทั้งหมด">
    <b-why>ทุกคน พร้อมตัวกรองตามทีม กิจกรรม ทิศทาง และเครื่องมือหลัก</b-why>
    <b-filter-chips>
      <f>ทีม B</f>
      <f>กิจกรรม: ทุกสัปดาห์</f>
      <f on>เครื่องมือ: Work</f>
    </b-filter-chips>
    <b-table>
      <table><thead>
      <tr><th>บุคคล</th><th>ทีม</th><th>Chat / Work</th><th class="bk-table-r">$ / 3 เดือน</th></tr>
      </thead><tbody>
      <tr><td>Tomás Reid</td><td>ทีม B</td><td><b-split-bar parts="c-chat:28% c-work:72%"/></td><td class="bk-table-r">112.00</td></tr>
      <tr><td>Mira Castellano</td><td>ทีม B</td><td><b-split-bar parts="c-chat:35% c-work:65%"/></td><td class="bk-table-r">97.00</td></tr>
      </tbody></table>
    </b-table>
    <b-cap>แหล่งที่มา: ไฟล์ส่งออกผู้ใช้ leaderboard และ project รวมกันด้วยอีเมล</b-cap>
    <b-finding>
      <ex>ตัวกรอง "ทีม B" และ "เครื่องมือ: Work" เหลือสองคน: Mira Castellano และ Tomás Reid</ex>
      <gen>ตารางบุคคลทั้งหมดพร้อมตัวกรองตามทีม กิจกรรม และเครื่องมือหลัก เป็นฐานสำหรับกลุ่มตัวอย่างถัดไป: รายชื่อสำหรับคำถามใหม่ไม่ต้องส่งออกใหม่</gen>
      <do>บันทึกชุดตัวกรองแต่ละชุดเป็นมุมมองตารางแยก เพื่อให้รายการถัดไปใช้แค่คลิกเดียว</do>
    </b-finding>
  </b-subsection>
</b-chapter>
<b-chapter id="start" title="เริ่มวันนี้จากตรงไหน">

  ไม่ต้องทำทั้งรายงานในครั้งเดียว: ผลลัพธ์ที่มีประโยชน์แรก คือรายชื่อผู้ใช้ที่ใช้งานมากที่สุด จะได้หลังรายการที่สอง

  <b-checklist>
    <item t="ส่งออกผู้ใช้และ leaderboard สามเดือน">leaderboard สามครั้ง ผลิตภัณฑ์ละหนึ่งครั้ง เอเจนต์เบราว์เซอร์ทำการส่งออกได้<b-link-chips><item href="https://claude.com/claude-in-chrome" icon="arrow-up-right">Claude in Chrome</item><item href="https://support.google.com/gemini/answer/16821166" icon="arrow-up-right">Gemini in Chrome</item><item href="https://www.perplexity.ai/comet" icon="arrow-up-right">Perplexity Comet</item></b-link-chips></item>
    <item t="คำนวณเครื่องมือหลักและอันดับตามจำนวนเงิน">รายชื่อแรกของผู้ใช้ที่ใช้งานมากที่สุดพร้อมแล้ว</item>
    <item t="คำนวณความลึกของการนำไปใช้">อย่างน้อยหนึ่งครั้ง / เป็นประจำ / ทุกสัปดาห์ โดยนับผู้ที่ทำงานผ่าน Codex อย่างเดียวแยกต่างหาก</item>
    <item t="สร้างรายชื่อบุคคลและนัดสัมภาษณ์">วิธีเลือกบุคคลเหล่านี้อยู่ใน "ควรสัมภาษณ์ใคร"</item>
  </b-checklist>
</b-chapter>
<b-chapter id="faq" icon="chat" title="คำถามที่พบบ่อย">
  <b-faq-cards>
    <q t="คอนโซลผู้ดูแลระบบ ChatGPT Enterprise แสดงอะไร?">ผู้ใช้ leaderboard project ภาพรวม และงาน จากนั้นสร้างความลึกของการนำไปใช้ ความสม่ำเสมอระหว่างทีม และลักษณะของงาน</q>
    <q t="จะรู้ได้อย่างไรว่าต้องการสิทธิ์ใช้งานเพิ่ม?">จากความลึกของการนำไปใช้: กี่คนใช้อย่างน้อยหนึ่งครั้ง เป็นประจำ และทุกสัปดาห์ เกณฑ์เทียบสำหรับการนำไปใช้ในวงกว้างคือ 50–70% ของพนักงาน</q>
    <q t="ความต่างระหว่างทีมที่กว้างหมายความว่าอะไร?">สถานการณ์ที่ใช้ได้มีอยู่แล้วแต่อยู่ในหนึ่งหรือสองทีม การกระจายไปยังทีมอื่นคุ้มกว่าการซื้อของใหม่</q>
    <q t="ควรสัมภาษณ์ใครหลังรายงาน?">บุคคลสำหรับแต่ละทิศทางที่พบ: 16 จาก 340 ในตัวอย่าง รวมผู้ที่ใช้ซอฟต์แวร์อื่นหรือเลิกใช้</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="อ่านเพิ่มเติม">
  <b-links>
    <item href="/blog/who-to-interview-before-buying-ai-tools/" k="สัมภาษณ์" t="ควรสัมภาษณ์ใคร">สร้างกลุ่มตัวอย่างสัมภาษณ์จากตารางบุคคลอย่างไร</item>
    <item href="/blog/ai-interviews-without-leading-questions/" k="สัมภาษณ์" t="สัมภาษณ์ผู้คนเรื่องการใช้ AI อย่างไร">การโทร แบบสำรวจ และตาราง Airtable เดียว</item>
  </b-links>
</b-chapter>
<b-footer>ชื่อ ทีม ที่อยู่ และตัวเลขทั้งหมดในตัวอย่างเป็นเรื่องสมมติ</b-footer>
</b-post>
