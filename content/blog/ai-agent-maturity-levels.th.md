---
title: ระดับความเติบโตของเอเจนต์ AI: จากแชตสู่ spec, skill, โค้ด, harness และระบบเอเจนต์
date: 2026-11-14
updated: 2026-11-18
description: งานของนักพัฒนากับ AI เติบโตจากถามในแชตไปเป็นระบบเอเจนต์ได้อย่างไร แต่ละขั้นมีอะไรบันทึกไว้ เมื่อไรควรก้าวต่อ และต้องจ่ายอะไร ตามบันไดของ Every และ Hashimoto
tags: AI, เอเจนต์, spec, skill, harness, ความเติบโต, compound engineering
category: specs
layout: wide
mentions: Compound Engineering, Agent Skills, AGENTS.md, CLAUDE.md, Spec-Driven Development, Progressive Crystallization, Harness engineering, Harness-Driven Development
toc: map=เจ็ดขั้น | sources=ตลาดว่าอย่างไร | chat=แชต | agent=เอเจนต์และกฎ | spec=Spec | skill=Skill | script=สคริปต์ | crystal=ราคาของแต่ละขั้น | harness=Harness | system=ระบบเอเจนต์ | traps=กับดัก | stop=หยุดเมื่อไร | start=เริ่มที่ไหน | faq=คำถาม | next=อ่านต่อ
---

ระดับความเติบโตของเอเจนต์ AI ไล่จากแชตไปยังเอเจนต์ spec skill สคริปต์ harness และระบบเอเจนต์ ในแต่ละขั้น สิ่งที่คนเคยอธิบายด้วยคำพูดจะถูกเขียนลงไฟล์หรือโค้ด และไม่ต้องพึ่งความจำของใครอีก บันไดของ <a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every</a>, <a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a>, <a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a>, <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a>, <a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a> และ <a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a> อธิบายลำดับเดียวกันนี้ในรูปแบบต่างกัน ด้านล่างคือแต่ละขั้น การเปลี่ยนผ่านระหว่างขั้น และราคาของขั้นสุดท้าย

<b-post series="prompts">
<b-chapter id="map" title="เจ็ดขั้น" icon="stairs">
  <b-art names="ai-agent-maturity-levels/ladder ai-agent-maturity-levels/ladder-mobile"></b-art>
  <b-cap>เจ็ดขั้น สีเทาคือคน สีน้ำเงินคือเอเจนต์และทุกอย่างที่เขียนไว้ให้มัน สีส้มคือความเสี่ยง นั่นคือต้องอธิบายซ้ำอีกครั้ง บั๊กสีส้มที่ขั้น Harness คือข้อผิดพลาดที่พบในรายงานที่เสร็จแล้ว harness เปลี่ยนมันเป็นการตรวจตามลูกศร ข้อผิดพลาดเดิมจึงไม่กลับมาอีก</b-cap>
  <b-why>ภาพแสดงว่าความรู้ไปอยู่ที่ไหน ในแชตมันอยู่ในหัวของคนและในบทสนทนา จากนั้นย้ายทีละขั้นไปอยู่ในเซสชันของเอเจนต์ ไฟล์ข้อกำหนด ไฟล์ขั้นตอน สคริปต์ และสุดท้ายคือรีโพซิทอรีพร้อมการตรวจ ตารางด้านล่างพารายงานฉบับเดียวกันเดินผ่านวันจันทร์ต่าง ๆ ว่าคนทำอะไรด้วยมือ และวันจันทร์หน้าเกิดอะไรขึ้น</b-why>
  <b-table code="prose">
    <table>
    <thead>
      <tr><th>ขั้น</th><th>สิ่งที่คนทำด้วยมือ</th><th>ความรู้อยู่ที่ไหน</th><th>วันจันทร์หน้าเกิดอะไรขึ้น</th></tr>
    </thead>
    <tbody>
      <tr><td><b>1. แชต</b></td><td>วางตารางยอดขายลงในแชตและอธิบายว่าต้องใช้คอลัมน์ไหน</td><td>ในหัวและในบทสนทนา</td><td>ต้องอธิบายทุกอย่างซ้ำ</td></tr>
      <tr><td><b>2. <a class="s-term" href="/materials/glossary/ai-agent/">เอเจนต์</a></b></td><td>ให้เอเจนต์ที่เข้าถึงไฟล์ได้สร้างรายงาน แก้ไข แล้วเพิ่ม “ยอดเงินเป็นรูเบิล” ลงในไฟล์กฎ</td><td>ในเซสชันและในไฟล์กฎ</td><td>เอเจนต์จำกฎได้ แต่ไม่รู้ว่าครั้งก่อนนับอย่างไร</td></tr>
      <tr><td><b>3. <a class="s-term" href="/materials/glossary/spec-driven-development/">Spec</a></b></td><td>เขียน spec.md ว่าใช้คอลัมน์ไหน ข้อมูลมาจากไหน และจะรู้ได้อย่างไรว่ารายงานเสร็จแล้ว</td><td>ใน <code>spec.md</code></td><td>เอเจนต์ตัวไหนก็สร้างรายงานเดียวกันจากคำอธิบายเดียวกันได้</td></tr>
      <tr><td><b>4. <a class="s-term" href="/materials/glossary/agent-skills/">Skill</a></b></td><td>เปลี่ยนลำดับการสร้างรายงานเป็น skill</td><td>ใน <code>SKILL.md</code> ที่มีขั้นตอนและตัวอย่าง</td><td>เอเจนต์หา skill เจอเองเมื่อมีคำขอรายงาน</td></tr>
      <tr><td><b>5. สคริปต์</b></td><td>ดึงขั้นตอนที่คงที่ออกจาก skill ไปเป็นสคริปต์สำหรับการส่งออกข้อมูลและตารางสรุป: skill กับข้อมูลไม่คุ้ม ส่วนสคริปต์คำนวณแบบเดียวกันทุกครั้ง</td><td>ใน <code>report.py</code></td><td>การส่งออกรันในไม่กี่วินาที ไม่เสียค่าโมเดล และให้ผลเหมือนเดิมกับข้อมูลเดิม โมเดลเขียนเฉพาะข้อสรุป</td></tr>
      <tr><td><b>6. <a class="s-term" href="/materials/glossary/harness/">Harness</a></b></td><td>อ่านรายงานที่เสร็จแล้ว ข้อผิดพลาดจากรายงานกลายเป็นกฎหรือการตรวจใหม่ในสภาพแวดล้อมของเอเจนต์</td><td>ในรีโพซิทอรี: กฎ การตรวจ hook</td><td>ข้อผิดพลาดเดิมไม่กลับมา กฎและการตรวจทำงานเอง</td></tr>
      <tr><td><b>7. <a class="s-term" href="/materials/glossary/agentic-system/">ระบบเอเจนต์</a></b></td><td>ส่งให้เอเจนต์เฉพาะส่วนที่ซับซ้อน เช่น การคัดแยกคำขอของลูกค้า ที่เหลือปล่อยให้โค้ดและการตรวจ</td><td>ในบริการเดียว: โค้ด ตารางเวลา การตรวจ และเอเจนต์ในจุดที่ซับซ้อน</td><td>รายงานมาตามกำหนด ขั้นตอนที่แน่นอนรันเป็นโค้ด ส่วนที่ซับซ้อนเอเจนต์ตัดสินพร้อมบันทึกเหตุผล คนจัดการเฉพาะการแจ้งเตือนเมื่อตัวเลขไม่ตรงกัน</td></tr>
    </tbody>
    </table>
  </b-table>
  บทความนี้เรียกการเลื่อนจากขั้นหนึ่งไปอีกขั้นว่า <b><a class="s-term" href="/materials/glossary/pulling-out/">การดึงออก (pulling out)</a></b> (“vytyagivanie” ในฉบับภาษารัสเซีย): ส่วนที่ซ้ำได้ของสิ่งที่คนกับเอเจนต์เคยทำร่วมกันจะถูกดึงออกมาและเขียนไว้สูงขึ้นหนึ่งขั้น นี่คือกระบวนการวิวัฒนาการของการพัฒนากระบวนการในองค์กร: กระบวนการไม่ได้ถูกออกแบบทั้งก้อนล่วงหน้า แต่เติบโตทีละขั้นจากงานที่ทำซ้ำ กฎถูกดึงออกจากแชต spec ถูกดึงออกจากกฎและเซสชันที่ดี ขั้นตอนของ skill ถูกดึงออกจาก spec สคริปต์ถูกดึงออกจาก skill และ harness ถูกดึงออกจากข้อผิดพลาดและการตรวจรอบเอเจนต์ ปลายบันไดคือระบบเอเจนต์ ทุกอย่างเริ่มจากแนวทาง “เอเจนต์ทำให้” แต่ที่ปลายทางสัดส่วนของเอเจนต์ยังคงน้อย: ฐานของระบบคือโค้ดแบบคลาสสิก การตรวจ และตารางเวลา ส่วนเอเจนต์รับเฉพาะบล็อกซับซ้อนที่แก้ด้วยวิธีอื่นไม่ได้ พฤติกรรมที่ใช้งานได้ไม่ถูกคิดใหม่ แต่ถูกนำมาจากสิ่งที่เคยได้ผลแล้ว และบันทึกไว้ในที่ที่ไม่ต้องอธิบายอีก
  <b-finding>
    <ex>รายงานรายสัปดาห์ฉบับเดียวเปลี่ยนจากการอธิบายซ้ำในแชตเป็นรายงานตามตารางเวลา</ex>
    <gen>ขั้นถูกกำหนดโดยที่ที่ความรู้อยู่: ในหัวของคน ในเซสชัน ในไฟล์ หรือในโค้ด ยิ่งเขียนไว้มาก ก็ยิ่งพึ่งความจำของคนและอารมณ์ของโมเดลน้อยลง</gen>
    <do>เลือกงานที่ทำซ้ำหนึ่งอย่าง แล้วใช้ตารางดูว่ามันอยู่ขั้นไหน</do>
  </b-finding>
</b-chapter>

<b-chapter id="sources" title="จุดยืนของผู้เขียนและสิ่งที่ตลาดว่าไว้" icon="book">
  <b-why>เจ็ดขั้นข้างต้นคือจุดยืนของผู้เขียน ประกอบขึ้นด้วยเกณฑ์เดียว: ในแต่ละขั้นมีอะไรถูกบันทึกไว้ ในตลาด ผู้เขียนแต่ละคนอธิบายการเคลื่อนที่เดียวกันในช่วงของตัวเอง บางคนพูดถึงกฎ บางคนพูดถึง spec บางคนพูดถึง skill หรือ harness ทุกคนไปทางเดียวกัน จากบทสนทนาลงไฟล์ และจากไฟล์ลงโค้ด ตารางแสดงว่าขั้นต่าง ๆ ตรงกับแหล่งอย่างไร</b-why>
  <b-art names="ai-agent-maturity-levels/matrix"></b-art>
  <b-cap>วงกลมทึบหมายถึงผู้เขียนอธิบายขั้นนั้นอย่างชัดเจน วงแหวนหมายถึงอธิบายสิ่งที่ใกล้เคียง (เช่น “deterministic tooling” ของ <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a> และ <a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a> นับว่าใกล้เคียงกับสคริปต์) แถวล่างสุดคือเจ็ดขั้นของบทความนี้ มีเพียง <a href="https://arxiv.org/abs/2607.07052" target="_blank" rel="noopener">Malik</a> ที่อธิบายขั้นสุดท้ายอย่างชัดเจน</b-cap>

  เมทริกซ์แสดงว่าตลาดเรียงตัวอย่างไร ผู้เขียนแต่ละคนอธิบายช่วงของตัวเองบนเส้นทาง และเมื่อรวมกันแล้วช่วงเหล่านั้นครอบคลุมครบทั้งเจ็ดขั้น <a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a> ไม่มี spec และ skill, Rezvov และ Clark ไม่มี skill, <a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a> ไม่มีสคริปต์ รายละเอียดของผู้เขียนแต่ละคนอยู่ในตาราง
  <b-table>
    <table>
    <thead>
      <tr><th>แหล่ง</th><th>ขั้นตามลำดับ</th><th>spec และ skill อยู่ตรงไหน</th></tr>
    </thead>
    <tbody>
      <tr><td><a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every, Compound Engineering</a> (Kieran Klaassen)</td><td>พัฒนาด้วยมือ → แชต → เอเจนต์พร้อมรีวิวทีละบรรทัด → วางแผนก่อนแล้วรีวิว PR ที่เสร็จ → จากไอเดียถึง PR → เอเจนต์บนคลาวด์แบบขนาน</td><td>แผนอยู่ที่ขั้น 3 skill และกฎเพิ่มเข้ามาที่ขั้น Compound</td></tr>
      <tr><td><a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a>, 05.02.2026</td><td>เลิกใช้แชตบอต → ทำงานของตัวเองซ้ำด้วยเอเจนต์ → เอเจนต์ท้ายวัน → มอบงานง่ายให้เอเจนต์ → วิศวกรรม harness → ให้มีเอเจนต์รันอยู่เสมอ</td><td>AGENTS.md และการตรวจที่เขียนเป็นโปรแกรมอยู่ที่ขั้น 5 ไม่มี spec และ skill</td></tr>
      <tr><td><a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a>, 10.03.2026</td><td>8 ระดับ: tab complete และแชตใน IDE → context → compounding → MCP และ skill → harness → เอเจนต์เบื้องหลัง → ทีมเอเจนต์</td><td>skill อยู่ที่ระดับ 5 ไม่มี spec</td></tr>
      <tr><td><a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a>, 06.04.2026</td><td>L0 reference → L1 เฝ้าเอเจนต์ → L2 กฎ → L3 deterministic tooling → L4 SDD → L5 เอเจนต์อัตโนมัติ</td><td>spec อยู่ที่ L4 ไม่มี skill</td></tr>
      <tr><td><a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a>, Hyperact, 05.01.2026</td><td>7 ระดับ: prompt ด้วยมือ → ตัวช่วยใน IDE → เข้าถึงรีโพซิทอรี → deterministic tooling → context ของทีม → เวิร์กโฟลว์เฉพาะทางแบบขนาน → spec-driven development</td><td>spec อยู่ที่ระดับ 7 ไม่มี skill</td></tr>
      <tr><td><a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a>, 23.01.2026</td><td>ระดับ 0–5 โดยเทียบกับระบบขับขี่อัตโนมัติ: จาก autocomplete ถึง “dark factory”</td><td>spec และ skill อยู่ที่ระดับ 4 ที่ระดับ 5 spec กลายเป็นซอฟต์แวร์</td></tr>
      <tr><td><a href="https://developers.redhat.com/articles/2026/03/30/vibes-specs-skills-agents-ai-coding" target="_blank" rel="noopener">Red Hat, Naszcyniec</a>, 30.03.2026</td><td>เสาหลักสี่ต้นเป็นชั้นซ้อน: vibes → spec → skill → เอเจนต์</td><td>ครบทั้งสี่ในแผนภาพเดียว</td></tr>
    </tbody>
    </table>
  </b-table>
  <b-callout icon="bulb">**ไฟล์กฎ** (CLAUDE.md, AGENTS.md) อยู่คนละตำแหน่งในแต่ละแหล่ง ที่ <a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every</a>, <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a> และ <a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a> มันปรากฏทันทีหลังเอเจนต์ตัวแรก ที่ <a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a> และ <a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a> มันอยู่เฉพาะระดับที่ห้า ในบทความนี้มันอยู่ในขั้น “เอเจนต์”: บันทึกแรกสุดที่ว่า “เอเจนต์ทำผิด จึงเพิ่มกฎ” เปลี่ยนแชตให้เป็นเอเจนต์ที่มีความจำ</b-callout>
  <b-callout icon="trend-up">บันไดของ Eledath, <a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a> และ Clark นับขั้นตามความเป็นอิสระ: มีเอเจนต์ทำงานกี่ตัว และคนดูโค้ดน้อยแค่ไหน ส่วนขั้นในบทความนี้นับตามที่ที่ความรู้อยู่ สองมาตราวัดสอดคล้องกัน: เมื่อความรู้ถูกเขียนไว้แล้ว ก็ไว้ใจเอเจนต์ให้ทำได้มากขึ้น</b-callout>
  <b-finding>
    <ex>Rezvov, Clark และ Shapiro วาง spec ไว้ Eledath และ Shapiro วาง skill ไว้ บทความนี้วางทั้งหมดบนบันไดเดียว</ex>
    <gen>บันไดต่าง ๆ อธิบายการเคลื่อนที่เดียวกันจากคนละด้าน: แรกสุดทุกอย่างอยู่ในบทสนทนา แล้วอยู่ในไฟล์ แล้วอยู่ในโค้ด</gen>
    <do>เทียบประสบการณ์ของตัวเองกับเจ็ดขั้นข้างต้น ไม่ใช่กับรายการของผู้เขียนคนใดคนหนึ่ง</do>
  </b-finding>
</b-chapter>

<b-chapter id="chat" title="ขั้นที่ 1 แชต: ความรู้อยู่ในบทสนทนา" icon="chat">
  <b-why>ในแชต คนเป็นผู้ขนข้อมูลไปมาและบอกด้วยมือว่าคำตอบผิด สำหรับคำถามครั้งเดียวก็เพียงพอ</b-why>
  <b-art names="ai-agent-maturity-levels/chat"></b-art>
  <b-cap>สามวันจันทร์ติดกัน คนตอบคำถามเดิม ความรู้ว่ารายงานต้องการอะไรอยู่แค่ในหัวของเขา</b-cap>
  <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a> เรียกโหมดนี้ว่า reference: เอเจนต์เป็น “Stack Overflow แต่เป็นมิตรกว่า” และเขาเสริมว่าจริง ๆ แล้วนี่ไม่ใช่ระดับ <a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a> แนะนำให้เลิกใช้แชตบอตกับงานที่มีความหมาย<b-proof href="https://mitchellh.com/writing/my-ai-adoption-journey" quote="Hashimoto: “To find value, you must use an agent” — mitchellh.com/writing/my-ai-adoption-journey"></b-proof> เพราะเอเจนต์อ่านไฟล์ รันโปรแกรม และตรวจผลเอง <a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a> และ <a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a> วางแชตไว้ที่ระดับแรก: คัดลอกชิ้นส่วนไปมา

  แม้ในขั้นนี้ <a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every</a> ก็แนะนำให้จดบันทึก prompt ที่ได้ผล: บันทึกแรกสุด ก่อนจะมีไฟล์กฎ<b-proof href="https://every.to/guides/compound-engineering" quote="Every: “Keep a running note of prompts that worked well” — every.to/guides/compound-engineering"></b-proof> บันทึกตอบคำถามว่า “ครั้งก่อนฉันอธิบายเรื่องนี้อย่างไร” แม้เอเจนต์ยังไม่อ่านมัน
  <b-finding>
    <ex>ทุกวันจันทร์ต้องอธิบายคอลัมน์ของรายงานใหม่</ex>
    <gen>แชตไม่เก็บข้อตกลงข้ามบทสนทนา Rezvov อธิบายทางออกไว้ว่า: เมื่อการพูดซ้ำเรื่องเดิมน่าเบื่อ คำสั่งที่ซ้ำก็ถูกเปลี่ยนเป็นกฎ</gen>
    <do>ในจังหวะที่อธิบายเรื่องเดิมเป็นครั้งที่สอง ให้ไปขั้นต่อไป</do>
  </b-finding>
</b-chapter>

<b-chapter id="agent" title="ขั้นที่ 2 เอเจนต์และไฟล์กฎ" icon="bot">
  <b-why>เอเจนต์ได้เข้าถึงไฟล์และคำสั่ง และลงมือเอง บันทึกแรกที่ทำไว้ให้มันคือไฟล์กฎ: รายการสิ่งที่เอเจนต์ต้องรู้เกี่ยวกับโปรเจกต์ในทุกเซสชัน</b-why>
  <b-art names="ai-agent-maturity-levels/agent-rules"></b-art>
  <b-cap>ข้อผิดพลาดของเอเจนต์กลายเป็นหนึ่งบรรทัดในไฟล์กฎ และเซสชันถัดไปของเอเจนต์เริ่มโดยมีบรรทัดนั้นอยู่แล้ว</b-cap>
  <a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a> ผ่านขั้นนี้ตามตัวอักษร: เขาทำ commit ด้วยมือทั้งหมดซ้ำด้วยเอเจนต์<b-proof href="https://mitchellh.com/writing/my-ai-adoption-journey" quote="Hashimoto: “I literally did the work twice” — mitchellh.com/writing/my-ai-adoption-journey"></b-proof> และได้สามบทเรียน: แบ่งงานเป็นงานย่อยที่ชัดเจน แยกการวางแผนออกจากการลงมือ และให้เอเจนต์มีวิธีตรวจผลของตัวเอง คู่มือของ <a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every</a> เสนอก้าวแรกสู่การเขียนบันทึก: สร้างไฟล์ CLAUDE.md และเพิ่มหมายเหตุลงไปหลังเอเจนต์ทำผิดทุกครั้ง
  <b-steps>
    <step t="เอเจนต์ทำผิด">เช่น มันนับยอดเป็นดอลลาร์แทนที่จะเป็นรูเบิล</step>
    <step t="หนึ่งบรรทัดในไฟล์กฎ">“ยอดในรายงานเป็นรูเบิล”: หนึ่งบรรทัดต่อพฤติกรรมแย่หนึ่งอย่าง Hashimoto เขียนว่าในไฟล์ของโปรเจกต์ Ghostty ทุกบรรทัดมีที่มาจากพฤติกรรมแย่ของเอเจนต์<b-proof href="https://mitchellh.com/writing/my-ai-adoption-journey" quote="Hashimoto: “Each line in that file is based on a bad agent behavior” — mitchellh.com/writing/my-ai-adoption-journey"></b-proof></step>
    <step t="เซสชันถัดไป">เอเจนต์อ่านไฟล์ตอนเริ่มและไม่ทำผิดซ้ำ</step>
  </b-steps>
  <b-callout icon="alert-circle">ไฟล์กฎอาจถูกใส่จนล้น <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a> เตือนว่ากฎที่เขียนไม่ดีให้ผลแย่กว่าไม่มีกฎ<b-proof href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" quote="Rezvov: “poorly written rules can actually make output worse than having no rules at all” — dev.to/arezvov"></b-proof> <a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a> แนะนำว่าอย่าใส่ทุกอย่างลงไฟล์กฎ: ควรมีโฟลเดอร์เอกสารที่อัปเดตอยู่เสมอ เพื่อให้เอเจนต์หาสิ่งที่ต้องการเจอ</b-callout>

  Hashimoto ทำขั้นนี้ให้เป็นนิสัย: ในครึ่งชั่วโมงสุดท้ายของวันทำงาน เขาปล่อยเอเจนต์ไปค้นคว้า ไปดูไอเดียคลุมเครือ และไปคัดแยกงาน เพื่อให้ตอนเช้าได้ “warm start”<b-proof href="https://mitchellh.com/writing/my-ai-adoption-journey" quote="Hashimoto: “warm start” — mitchellh.com/writing/my-ai-adoption-journey"></b-proof> เขาไม่ปล่อยเอเจนต์รันข้ามคืน: งานส่วนใหญ่ของเขาเสร็จในไม่ถึงครึ่งชั่วโมง Every เตือนว่านักพัฒนาส่วนใหญ่ติดอยู่ที่ขั้นนี้<b-proof href="https://every.to/guides/compound-engineering" quote="Every: “Most developers plateau here” — every.to/guides/compound-engineering"></b-proof> ขณะอนุมัติทุกการกระทำของเอเจนต์ด้วยมือ
  <b-finding>
    <ex>บรรทัดเรื่องรูเบิลในไฟล์กฎปิดข้อผิดพลาดที่เกิดซ้ำหนึ่งอย่างได้ถาวร</ex>
    <gen>กฎเก็บข้อตกลง แต่ไม่เก็บเจตนาทั้งหมดของงาน: ต้องทำอะไรและรู้ได้อย่างไรว่าเสร็จ ไม่ได้เขียนไว้ในนั้น</gen>
    <do>ให้ไฟล์กฎสั้น ย้ายคำอธิบายงานไปไว้ใน spec อ่านเพิ่มในบทความ <a href="/blog/specs-rules-skills/">AGENTS.md, CLAUDE.md และ spec.md: อะไรอยู่ที่ไหน</a></do>
  </b-finding>
</b-chapter>

<b-chapter id="spec" title="ขั้นที่ 3 Spec: เจตนาถูกเขียนก่อนโค้ด" icon="file-lines">
  <b-why>spec อธิบายงานหนึ่งอย่าง: ต้องผลิตอะไร และรู้ได้อย่างไรว่าเสร็จ เอเจนต์และคนอ่านข้อความเดียวกัน และการรีวิวตรวจผลเทียบกับมัน</b-why>
  <a href="https://developers.redhat.com/articles/2026/03/30/vibes-specs-skills-agents-ai-coding" target="_blank" rel="noopener">Red Hat</a> แบ่ง spec เป็นสองชนิด: “อะไร” (เป้าหมาย ข้อกำหนด เกณฑ์ความสำเร็จ) และ “อย่างไร” (ความปลอดภัย โครงสร้าง การทดสอบ มาตรฐาน) ผู้เขียนแนะนำให้ใช้ไฟล์เล็กหลายไฟล์ เช่น <code>what-vision.md</code>, <code>how-security.md</code> และ <code>how-testing.md</code> แทนเอกสารยาวฉบับเดียว เพื่อให้โหลดเฉพาะ context ที่เกี่ยวข้อง<b-proof href="https://developers.redhat.com/articles/2026/03/30/vibes-specs-skills-agents-ai-coding" quote="Naszcyniec, Red Hat: “the days of the 100-page PDF specification are over” — developers.redhat.com"></b-proof> <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a> เพิ่มการติดตามได้ครบเส้นทาง: ข้อกำหนดมีรหัส เช่น FR-AUTH-PASSWORDRESET และเห็นได้ในคำอธิบาย API ในโค้ด และในเทสต์<b-proof href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" quote="Rezvov: “The core of SDD is traceability” — dev.to/arezvov"></b-proof>
  spec ก็มีบันไดความเติบโตของตัวเอง สามระดับแรกอธิบายโดย Birgitta <a href="https://martinfowler.com/articles/harness-engineering.html" target="_blank" rel="noopener">Böckeler</a> (Thoughtworks)<b-proof href="https://www.martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html" quote="Böckeler: three maturity levels of a spec, spec-first, spec-anchored and spec-as-source (paraphrase) — martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html"></b-proof> ระดับที่สี่ Spec-in-the-loop เพิ่มเข้ามาในการบรรยายของผู้เขียนเว็บไซต์ <a href="/talk/spec-driven-development/">“Spec-Driven Development”</a> (ภาษารัสเซีย): ใน<a href="/slide/20/">สไลด์สี่ระดับ</a> spec เรียนรู้จากระบบที่กำลังรันอยู่ และเมตริกกับเหตุการณ์ผิดปกติของระบบแก้ไข spec
  <b-art names="ai-agent-maturity-levels/spec-levels"></b-art>
  <b-cap>เหมือนในสไลด์การบรรยาย: spec อยู่ซ้าย โค้ดอยู่ขวา ลูกศรแสดงว่าอะไรมาจากอะไร และใครส่งการเปลี่ยนแปลงกลับ ลูกศรประสีเทาหมายถึงคนเป็นผู้ส่งการเปลี่ยนแปลงกลับ ลูกศรสีน้ำเงินหมายถึงระบบที่รันอยู่ทำเอง ทางขวา: ระดับนั้นแก้ปัญหาอะไร และอะไรขวางอยู่</b-cap>
  <b-table>
    <table>
    <thead>
      <tr><th>ระดับของ spec</th><th>spec เกิดอะไรขึ้น</th><th>โปรแกรมตัวอย่าง</th></tr>
    </thead>
    <tbody>
      <tr><td><b>Spec-first</b></td><td>spec ถูกเขียนก่อนโค้ดและใช้กับงานหนึ่งงาน</td><td>GitHub Spec Kit</td></tr>
      <tr><td><b>Spec-anchored</b></td><td>spec ยังอยู่หลังงานเสร็จ: การเปลี่ยนแปลงถูกรวมเข้าไปในมัน</td><td><a href="/blog/openspec/">OpenSpec</a></td></tr>
      <tr><td><b>Spec-as-source</b></td><td>คนแก้เฉพาะ spec โค้ดถูกสร้างจากมัน</td><td>Tessl; มีเพียงระดับนี้ที่ <a href="https://martinfowler.com/articles/harness-engineering.html" target="_blank" rel="noopener">Böckeler</a> อ้างถึง</td></tr>
      <tr><td><b>Spec-in-the-loop</b></td><td>เมตริกและเหตุการณ์ผิดปกติจากระบบที่รันอยู่แก้ไข spec</td><td>ยังไม่มีโปรแกรมสำเร็จรูป มีพฤติกรรมคล้ายกันที่ <a href="https://developers.redhat.com/articles/2026/03/30/vibes-specs-skills-agents-ai-coding" target="_blank" rel="noopener">Red Hat</a> และ <a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every</a> ดูด้านล่าง</td></tr>
    </tbody>
    </table>
  </b-table>

  Red Hat แยกการทำงานกับ spec เป็นสองโหมด ในโหมด “interacting” คนปรับ spec ร่วมกับเอเจนต์: เช่น ขอให้เอเจนต์ให้คะแนนจาก 0 ถึง 10 และบอกว่าขาดอะไรสำหรับการลงมือทำแบบอัตโนมัติ เมื่อคะแนนถึง 9–10 โหมด “instructing” จะเริ่ม: เอเจนต์อ่าน spec หา skill ที่ต้องใช้ เขียนโค้ด รันเทสต์ และแก้ข้อผิดพลาดเอง ที่ <a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a> ตรงกับระดับที่สี่ ที่คนเขียน spec โต้แย้งกับเอเจนต์เรื่อง spec แล้วเดินจากไป<b-proof href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" quote="Shapiro: “You write a spec. You argue with it about the spec.” — danshapiro.com"></b-proof>
  <b-callout icon="refresh">Red Hat เรียกระดับที่สี่ว่า “co-evolution” ของ spec เอเจนต์เก็บไฟล์ LessonsLearned.md: ทุกครั้งที่ทำผิดมันบันทึกสาเหตุและวิธีแก้ และเสนอการแก้ spec “อย่างไร” ที่เกี่ยวข้อง<b-proof href="https://developers.redhat.com/articles/2026/03/30/vibes-specs-skills-agents-ai-coding" quote="Naszcyniec, Red Hat: “turns every off-key moment into a permanent improvement” — developers.redhat.com"></b-proof> Every ทำแบบเดียวกันที่ขั้น Compound</b-callout>
  <b-finding>
    <ex>spec.md ของรายงานระบุว่า: ใช้คอลัมน์ไหน ข้อมูลมาจากไหน และรายงานเสร็จเมื่อผลรวมตรงกับข้อมูลที่ส่งออก</ex>
    <gen><a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a> วาง spec ไว้บนสุดของบันได: การลงมือทำที่นั่นกลายเป็นผลลัพธ์ที่สลับกันได้ ไม่ใช่สินทรัพย์ถาวร<b-proof href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" quote="Clark: “interchangeable output rather than a durable asset” — hyperact.co.uk"></b-proof> เขายังบอกว่าระดับที่เจ็ดใกล้กับการรีเซ็ตมากกว่าการต่อบันได</gen>
    <do>เขียน spec สำหรับงานที่ยาวกว่าหนึ่งวัน วิธีแบ่ง spec ใหญ่เป็นส่วน ๆ อยู่ในบทความ <a href="/blog/specs-by-aggregates/">Spec ตาม aggregate</a></do>
  </b-finding>
</b-chapter>

<b-chapter id="skill" title="ขั้นที่ 4 Skill: ขั้นตอนถูกเขียนไว้ให้เอเจนต์" icon="notebook">
  <b-why>ถ้า spec บอกว่าต้องผลิตอะไร skill บอกว่าทำอย่างไร มันคือโฟลเดอร์ที่มีไฟล์ SKILL.md: ชื่อ คำอธิบาย และคำสั่งทีละขั้น บางครั้งมีเทมเพลตและสคริปต์ด้วย</b-why>
  <b-art names="ai-agent-maturity-levels/spec-skill"></b-art>
  <b-cap>spec อยู่ใน context ของงาน skill ใช้ context สองบรรทัดจนกว่าจะต้องใช้ และโหลดเต็มเฉพาะเมื่อถูกเรียก</b-cap>
  <a href="https://developers.redhat.com/articles/2026/03/30/vibes-specs-skills-agents-ai-coding" target="_blank" rel="noopener">Red Hat</a> อธิบาย skill ว่าเป็นขั้นตอนแบบโมดูลที่ทำซ้ำได้: เอเจนต์หา skill เจอจากชื่อและคำอธิบาย และโหลดเต็มเมื่องานตรงกัน<b-proof href="https://developers.redhat.com/articles/2026/03/30/vibes-specs-skills-agents-ai-coding" quote="Naszcyniec, Red Hat: “A skill is not just a prompt; it is a directory containing a SKILL.md file” — developers.redhat.com"></b-proof> Anthropic เปรียบ skill กับคู่มือปฐมนิเทศของพนักงานใหม่<b-proof href="https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills" quote="Anthropic: “like putting together an onboarding guide for a new hire” — anthropic.com/engineering"></b-proof> สำหรับ <a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a> การสร้าง skill เป็นเครื่องหมายของระดับที่สี่ ที่คนไม่นั่งข้างเอเจนต์อีกแล้ว แต่เขียน spec และ skill แล้วเดินจากไป
  Andrew <a href="https://dev.to/0xandrewshu/turn-chats-into-skills-skills-into-scripts-2ndg" target="_blank" rel="noopener">Shu</a> อธิบายวิธีได้ skill จากแชต: ถ้าเอเจนต์ทำงานเดิมซ้ำ ให้ขอให้มันอ่านบทสนทนาอีกรอบและเปลี่ยนเป็น skill<b-proof href="https://dev.to/0xandrewshu/turn-chats-into-skills-skills-into-scripts-2ndg" quote="Shu: “ask it to reflect on the conversation and turn it into an Agent Skill” — dev.to/0xandrewshu"></b-proof>

  ตัวอย่าง skill จากบทความของ Red Hat คือการ deploy แอปพลิเคชันไปยัง OpenShift มันเป็นโฟลเดอร์ธรรมดาที่มีสามไฟล์: คำสั่งที่มีชื่อและคำอธิบายอยู่ต้นไฟล์ เทมเพลต และสคริปต์ตรวจ
  <b-file-grid>
    <file name="SKILL.md">ชื่อ คำอธิบาย ขั้นตอน: ตรวจการล็อกอิน เลือกโปรเจกต์ ใช้เทมเพลต ตรวจผล ข้อจำกัด</file>
    <file name="deploy-template.yaml">เทมเพลตการ deploy ที่คำสั่งใช้</file>
    <file name="validate-route.sh">สคริปต์ที่ตรวจว่าแอปพลิเคชันเปิดได้</file>
  </b-file-grid>
  <b-cap>skill มีสคริปต์อยู่แล้ว: ขั้น “skill” กับ “สคริปต์” ไม่มีเส้นแบ่งคมชัด เป็นสองส่วนของโฟลเดอร์เดียวกัน</b-cap>
  <b-finding>
    <ex>หลังสร้างรายงานสำเร็จ เอเจนต์ตามคำขอเปลี่ยนลำดับการสร้างเป็น skill ที่มีขั้นตอนและตัวอย่างตารางสุดท้าย</ex>
    <gen>ตอนเริ่มเซสชัน skill ใช้ context แค่ชื่อและคำอธิบาย และโหลดเต็มเมื่อถูกเรียก ขั้นตอนที่ใช้เป็นครั้งคราวจึงควรอยู่ใน skill และเหลือไว้ในไฟล์กฎเฉพาะสิ่งที่ถาวร</gen>
    <do>ถ้าขั้นตอนเดียวกันได้ผลดีสองครั้ง ให้ขอเอเจนต์เปลี่ยนมันเป็น skill</do>
  </b-finding>
</b-chapter>

<b-chapter id="script" title="ขั้นที่ 5 สคริปต์: โค้ดรันขั้นตอน" icon="code">
  <b-why>skill ยังเป็นข้อความ และโมเดลรันมันใหม่ทุกครั้ง สคริปต์คือโค้ดธรรมดา: เร็วกว่า ถูกกว่า และเหมือนเดิมทุกครั้งที่รัน</b-why>
  <a href="https://dev.to/0xandrewshu/turn-chats-into-skills-skills-into-scripts-2ndg" target="_blank" rel="noopener">Shu</a> เปรียบเทียบทั้งสอง: skill ไม่แน่นอน เพราะ skill เดียวกันรันสิบครั้งอาจแสดงพฤติกรรมต่างกันอย่างเห็นได้ชัด<b-proof href="https://dev.to/0xandrewshu/turn-chats-into-skills-skills-into-scripts-2ndg" quote="Shu: “running the same Skill 10 times can lead to different behavior” — dev.to/0xandrewshu"></b-proof> สคริปต์เร็วกว่า เสถียรกว่า และไม่เสีย token แต่ใช้เวลาเขียน แข็งกว่าเมื่อเจอสภาวะที่ไม่คาดคิด และอาจพังได้ <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a> สรุปกฎให้ง่ายกว่านั้น: ส่งให้ตรรกะที่แน่นอนให้มากที่สุดเท่าที่ทำได้ และเหลือโมเดลไว้เฉพาะส่วนสร้างสรรค์<b-proof href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" quote="Rezvov: “Delegate as much as possible to deterministic logic” — dev.to/arezvov"></b-proof> <a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a> ใช้แนวคิดเดียวกันกับข้อผิดพลาดของเอเจนต์: ถัดจากกฎในไฟล์ เขาเขียนเครื่องมือที่เป็นโปรแกรม เช่น สคริปต์ถ่ายภาพหน้าจอและรันเทสต์ที่กรองไว้
  <b-art names="ai-agent-maturity-levels/skill-script"></b-art>
  <b-cap>รันเดียวกันสิบครั้ง: skill แสดงความกระจายและเสีย token สคริปต์ให้ผลซ้ำเดิมและไม่เสียอะไร</b-cap>
  <b-table>
    <table>
    <thead>
      <tr><th></th><th>Skill</th><th>สคริปต์</th></tr>
    </thead>
    <tbody>
      <tr><td><b>คืออะไร</b></td><td>คำสั่งภาษาธรรมชาติใน SKILL.md</td><td>โค้ดใน Bash, Python และภาษาทำนองเดียวกัน</td></tr>
      <tr><td><b>ใครรัน</b></td><td>โมเดล ใหม่ทุกครั้ง</td><td>คอมพิวเตอร์ โดยไม่มีโมเดล</td></tr>
      <tr><td><b>ผลเหมือนเดิมหรือไม่</b></td><td>ไม่: อาจต่างกันอย่างเห็นได้ชัดระหว่างการรัน</td><td>ใช่ สำหรับอินพุตเดียวกัน</td></tr>
      <tr><td><b>ต้นทุนต่อการรัน</b></td><td>token ในทุกการรัน</td><td>ไม่กี่วินาทีและไม่เสีย token</td></tr>
      <tr><td><b>เหมาะเมื่อ</b></td><td>ขั้นตอนเปลี่ยนไป ต้องการความยืดหยุ่น รันนาน ๆ ครั้ง</td><td>ขั้นตอนซ้ำ แพง หรือต้องคาดเดาได้</td></tr>
      <tr><td><b>ราคา</b></td><td>ใช้เวลาสร้างน้อยกว่า</td><td>เวลาเขียน ความแข็งต่อสิ่งที่ไม่คาดคิด การบำรุงรักษา</td></tr>
    </tbody>
    </table>
  </b-table>
  <b-cap>ตามข้อเขียน “Turn chats into Skills, Skills into scripts” (19.09.2026) ของ Andrew <a href="https://dev.to/0xandrewshu/turn-chats-into-skills-skills-into-scripts-2ndg" target="_blank" rel="noopener">Shu</a> ผู้เขียนย้ำว่าไม่ใช่ทุกอย่างควรทำอัตโนมัติ: ทั้ง skill และสคริปต์มีต้นทุนในการสร้างและบำรุงรักษา</b-cap>
  สคริปต์ถูก<b>ดึงออก</b>จาก skill เมื่อ skill เริ่มซ้ำ การทำ skill สำหรับงานแบบนั้นกลายเป็นไม่คุ้ม: กับข้อมูลเดียวกัน สคริปต์ทำงานเหมือนเดิมทุกครั้งที่รัน ขณะที่ skill พาความกระจายอยู่ในตัวโมเดลเอง ความกระจายนั้นคือสิ่งที่สร้าง<a class="s-term" href="/materials/glossary/flaky-test/">เทสต์ที่ไม่เสถียร</a>: ขั้นตอนเดียวกันกับข้อมูลเดียวกันบางครั้งผ่านบางครั้งไม่ผ่าน เพราะเอเจนต์ทำงานต่างกันเล็กน้อยทุกครั้ง สคริปต์ไม่มีสาเหตุแบบนั้น ดังนั้นสำหรับงานที่ทำซ้ำ ความแน่นอนให้ผลตอบแทนดีกว่า
  <b-callout icon="alert-circle">ความไม่แน่นอนยังเหลืออยู่มาก: รูปแบบของข้อมูลนำเข้า ช่องว่าง ค่าที่ไม่คาดคิด สคริปต์มักเริ่มทำงานกับข้อมูล สิ่งที่สำคัญสำหรับมันจึงเป็นส่วนที่แน่นอน: อินพุตเดียวกันให้เอาต์พุตเดียวกัน และทำซ้ำข้อผิดพลาดได้ ความไม่แน่นอนย้ายจากขั้นตอนไปอยู่ที่การตรวจข้อมูลนำเข้า</b-callout>
  <b-finding>
    <ex>การส่งออกฐานข้อมูลและตารางสรุปในรายงานเหมือนเดิมทุกวันจันทร์ สคริปต์ report.py จึงรับช่วงไป และโมเดลเขียนเฉพาะข้อสรุป</ex>
    <gen>Shu มักฝังสคริปต์ไว้ใน skill: skill ยังเป็นตัวห่อที่รันสคริปต์ ต่อสคริปต์เข้าด้วยกัน และตรวจอินพุตกับเอาต์พุต</gen>
    <do>เปลี่ยน skill เป็นสคริปต์เมื่อมันซ้ำ ซับซ้อน หรือแพง ขั้นตอนที่หายากและเปลี่ยนบ่อยให้คงเป็น skill</do>
  </b-finding>
</b-chapter>

<b-chapter id="crystal" title="ราคาของแต่ละขั้น: สิ่งที่ Malik วัด" icon="gauge">
  <b-why>การเปลี่ยนจาก skill เป็นสคริปต์มักถูกอธิบายด้วยคำพูด Arun <a href="https://arxiv.org/abs/2607.07052" target="_blank" rel="noopener">Malik</a> จากทีม Azure Networking (Microsoft) วัดมันบนระบบที่ใช้งานจริง และเรียกว่า “progressive crystallization”: พฤติกรรมที่เอเจนต์ค้นพบและตรวจสอบแล้วค่อย ๆ กลายเป็นโค้ดที่แน่นอน<b-proof href="https://arxiv.org/abs/2607.07052" quote="Malik: “agent exploration should be a discovery mechanism, not a permanent execution model” — arxiv.org/abs/2607.07052"></b-proof></b-why>
  ระบบของ Malik จัดการเหตุการณ์ผิดปกติในเครือข่ายคลาวด์ เหตุการณ์ใหม่ถูกแก้โดยเอเจนต์ก่อน และเส้นทางของมันถูกบันทึก ถ้าเส้นทางได้รับการยืนยันด้วยความสำเร็จซ้ำ ก็กลายเป็นเทมเพลต แล้วเป็นสถานการณ์แบบไฮบริด และสุดท้ายเป็นโค้ดที่ไม่มีโมเดล ทั้งสามโหมดคือช่วงชีวิตของพฤติกรรมที่ค้นพบอันเดียวกัน นี่คือการดึงออกในขั้นท้าย ๆ: เส้นทางที่เอเจนต์เดินคนเดียวถูกดึงออกเป็นเทมเพลต แล้วเป็นไฮบริด แล้วเป็นโค้ด
  <b-art names="ai-agent-maturity-levels/crystal-modes"></b-art>
  <b-cap>ขึ้นบันได พฤติกรรมถูกเลื่อนขั้นตามจำนวนการรันที่สำเร็จ และถูกส่งกลับลงเมื่อล้มเหลว: crystallization ย้อนกลับได้</b-cap>
  <b-table>
    <table>
    <thead>
      <tr><th>โหมด</th><th>รันอย่างไร</th><th>ผลเหมือนเดิมหรือไม่</th><th>token ต่อการรัน</th></tr>
    </thead>
    <tbody>
      <tr><td><b>เอเจนต์</b> (Type 3)</td><td>subagent ใช้เหตุผลในขอบเขตจำกัด ขั้นที่เขียนข้อมูลรอคนอนุมัติ</td><td>ประมาณ 50%</td><td>10–50 พัน</td></tr>
      <tr><td><b>ไฮบริด</b> (Type 2)</td><td>ขั้นตอนตายตัว โมเดลเข้าร่วมในบางช่วง: การแยกวิเคราะห์ การจัดประเภท การสรุป ทุกการกระทำถูกตรวจกับ schema</td><td>ประมาณ 90%</td><td>1–5 พัน</td></tr>
      <tr><td><b>โค้ด</b> (Type 1)</td><td>ตรรกะที่เขียนล่วงหน้า ไม่มีโมเดลตอนรัน</td><td>100%</td><td>0</td></tr>
    </tbody>
    </table>
  </b-table>
  <b-sublabel top="22">เมื่อไรควรเลื่อนโหมด</b-sublabel>
  <b-steps>
    <step t="เอเจนต์ → ไฮบริด" hl>รันสำเร็จอย่างน้อย 10 ครั้ง ไม่มีการละเมิดความปลอดภัยเลย อย่างน้อย 90% ของการรันให้ลำดับการกระทำเดียวกัน และเทสต์ตรวจรับที่สร้างอัตโนมัติผ่าน</step>
    <step t="ไฮบริด → โค้ด">รันไฮบริดสำเร็จอย่างน้อย 50 ครั้ง คำตอบของโมเดลสอดคล้องกันอย่างน้อย 99% กฎครอบคลุมรูปแบบอินพุตที่สังเกตเห็นทั้งหมด ชุดเทสต์ถดถอยเต็มชุดผ่านโดยไม่มีโมเดล และคนรีวิวตรรกะสุดท้ายแล้ว</step>
    <step t="โค้ด → ย้อนกลับ">เมื่อล้มเหลว ละเมิดความปลอดภัย หรือเทสต์ไม่ผ่าน playbook จะถูกลดขั้น ตัวอย่างจากเปเปอร์: หลังอัปเดตเฟิร์มแวร์ รูปแบบเอาต์พุตของคำสั่งเปลี่ยนไป ตัวแยกวิเคราะห์ล้ม playbook ถูกส่งกลับเป็นไฮบริด และหลังรันสะอาดหลายครั้งก็ถูกเลื่อนขั้นอีกครั้ง<b-proof href="https://arxiv.org/abs/2607.07052" quote="Malik: “Crystallization is not one-way” — arxiv.org/abs/2607.07052"></b-proof></step>
  </b-steps>
  <b-sublabel top="22">ผลหลัง 8 เดือน</b-sublabel>
  <b-count-bars>
    <bar k="โค้ด" w="45%" color="accent">45%</bar>
    <bar k="ไฮบริด" w="30%" color="c-light">30%</bar>
    <bar k="เอเจนต์" w="25%" color="c-none">25%</bar>
  </b-count-bars>
  <b-cap>สัดส่วนการรันตามโหมดเมื่อสิ้นเดือนที่แปด (หัวข้อ VIII ของเปเปอร์ <a href="https://arxiv.org/abs/2607.07052" target="_blank" rel="noopener">Malik</a>) ตอนเริ่ม การรันเกือบทั้งหมดอยู่ในโหมด “เอเจนต์”</b-cap>
  ต้นทุนของเอเจนต์ต่อเหตุการณ์ลดลงมากกว่า 70% ขณะที่จำนวนเหตุการณ์เพิ่มขึ้นประมาณสองเท่า หมวดเหตุการณ์ทั่วไปมากกว่า 90% ถูกแก้โดยอัตโนมัติ และสัดส่วนการแก้ที่เป็นผลบวกลวงยังต่ำกว่า 5% ผู้เขียนสรุปว่า แพลตฟอร์มถูกลงเมื่อทำมากขึ้น เพราะหยุดจ่ายค่า inference กับงานที่เรียนรู้ไปแล้ว<b-proof href="https://arxiv.org/abs/2607.07052" quote="Malik: “the platform got cheaper as it did more” — arxiv.org/abs/2607.07052"></b-proof>
  <b-callout icon="alert-circle">ข้อสงวนของผู้เขียน ผลมาจากองค์กรเดียวและโดเมนเดียว จึงต้องคำนวณเกณฑ์ใหม่ นี่คือการสังเกตแพลตฟอร์มตลอดแปดเดือน ไม่มีการเปรียบเทียบแบบควบคุม ตัวเลข 45% หมายถึงสัดส่วนการรันที่ให้บริการด้วยโค้ด ไม่อาจอ่านเป็นสัดส่วนเหตุการณ์ที่แก้ได้ “โดยไม่ใช้ AI” ผลที่ได้น้อยลงในที่ที่งานใหม่แบบครั้งเดียวมีมาก</b-callout>
  <b-callout icon="bulb">คำว่า “crystallization” ปรากฏในเปเปอร์อีกฉบับด้วย: Linghao Zhang (<a href="https://arxiv.org/abs/2603.10808" target="_blank" rel="noopener">arXiv 2603.10808</a>, 11.03.2026) อธิบายว่าความรู้ที่กระจัดกระจายจากบทสนทนาการทำงานถูกรวมเป็นสินทรัพย์ที่มีโครงสร้างและใช้ซ้ำได้เป็นระยะอย่างไร ในเปเปอร์ของ Zhang บทสนทนากลายเป็นความรู้ ในของ Malik ร่องรอยการรันกลายเป็นโค้ด ทั้งสองอธิบายการเคลื่อนที่เดียวกันลงบันได: จากบทสนทนาสู่สิ่งที่เขียนไว้</b-callout>
  <b-finding>
    <ex>ในระบบของ Malik สัดส่วนการรันที่ไม่ใช้โมเดลโตจากศูนย์เป็น 45% ในแปดเดือน และต้นทุนต่อเหตุการณ์ลดลงมากกว่า 70%</ex>
    <gen>การเลื่อนลงบันได จากโมเดลสู่โค้ด คุ้มในที่ที่งานเดิมซ้ำ ความเป็นอิสระผูกกับประวัติการรันสะสมของสถานการณ์หนึ่ง ๆ และเติบโตไปกับมัน โมเดลที่แรงกว่าไม่ได้ให้ความเป็นอิสระด้วยตัวเอง<b-proof href="https://arxiv.org/abs/2607.07052" quote="Malik: “A more capable model does not automatically earn more autonomy; a track record does” — arxiv.org/abs/2607.07052"></b-proof></gen>
    <do>นับจำนวนการรัน skill ที่สำเร็จ ถึงสิบครั้งโดยไม่ล้มเหลว ให้เปลี่ยนขั้นตอนที่ซ้ำได้เป็นสคริปต์ และวางแผนการกลับไปขั้นข้างบนไว้สำหรับตอนที่สคริปต์พัง</do>
  </b-finding>
</b-chapter>

<b-chapter id="harness" title="ขั้นที่ 6 Harness: ข้อผิดพลาดกลายเป็นกฎของสภาพแวดล้อม" icon="loop-double">
  <b-why>เมื่อมี spec, skill และสคริปต์แล้ว ขั้นต่อไปคือสร้างสภาพแวดล้อมรอบเอเจนต์: harness มันคือทุกอย่างยกเว้นตัวโมเดล และเติบโตจากข้อผิดพลาด: แต่ละงานทิ้งบันทึกไว้ และงานถัดไปไปได้ดีขึ้น</b-why>
  <a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every</a> สร้างคู่มือทั้งฉบับรอบลูปสี่ขั้น: Plan → Work → Review → Compound<b-proof href="https://every.to/guides/compound-engineering" quote="Every: “Plan → Work → Review → Compound → Repeat” — every.to/guides/compound-engineering"></b-proof> สามขั้นแรกผลิตฟีเจอร์ ขั้นที่สี่ผลิตระบบที่สร้างฟีเจอร์ได้ดีขึ้นทุกครั้ง<b-proof href="https://every.to/guides/compound-engineering" quote="Every: “a system that builds features better each time” — every.to/guides/compound-engineering"></b-proof> ตามที่ Every ว่า เวลาของวิศวกรราว 80% ควรใช้กับการวางแผนและการรีวิว ส่วนที่เหลือ 20% ใช้กับการลงมือและขั้น Compound
  <b-art names="ai-agent-maturity-levels/compound-loop"></b-art>
  <b-cap>สามขั้นแรกผลิตฟีเจอร์ ขั้นที่สี่เขียนบทเรียนลงไฟล์และ skill ดังนั้นรอบถัดไปแต่ละรอบเริ่มได้ดีกว่ารอบก่อน</b-cap>
  <b-steps round>
    <step t="Plan">ไอเดียกลายเป็นแผน: ศึกษาข้อกำหนดและโค้ด ออกแบบทางแก้ และตรวจแผน</step>
    <step t="Work">เอเจนต์ทำตามแผนในบรานช์แยก เทสต์และ linter รันหลังทุกการเปลี่ยนแปลง</step>
    <step t="Review">เอเจนต์หลายตัวตรวจผล ข้อค้นพบได้ลำดับความสำคัญ P1, P2 หรือ P3 และถูกบันทึก</step>
    <step t="Compound" hl>สิ่งที่ได้ผลและไม่ได้ผลถูกเขียนลงไฟล์ที่ถูกต้อง: หมายเหตุใน CLAUDE.md เอกสารทางแก้ใน docs/solutions/ เอเจนต์และ skill ใหม่ คำถามตรวจสอบ: คราวหน้าระบบจะจับข้อผิดพลาดนี้ได้เองหรือไม่?</step>
  </b-steps>
  <b-cap>ตามคู่มือของ Every ทางแก้เก็บใน docs/solutions/ พร้อมเมทาดาทาสำหรับค้นหา แผนเก็บใน docs/plans/ ข้อค้นพบจากการรีวิวเก็บใน todos/</b-cap>
  Birgitta <a href="https://martinfowler.com/articles/harness-engineering.html" target="_blank" rel="noopener">Böckeler</a> แบ่ง harness เป็นการควบคุมสองชนิด: “guides” กำหนดเส้นทางของเอเจนต์ล่วงหน้า ส่วน “sensors” เฝ้าดูผลและช่วยให้มันแก้ไขตัวเอง<b-proof href="https://martinfowler.com/articles/harness-engineering.html" quote="Böckeler: guides “anticipate the agent's behaviour and aim to steer it before it acts”; sensors “observe after the agent acts and help it self-correct”"></b-proof> กฎของเธอ: เมื่อปัญหาเกิดซ้ำ ควรปรับปรุง guides และ sensors<b-proof href="https://martinfowler.com/articles/harness-engineering.html" quote="Böckeler: “Whenever an issue happens multiple times, the feedforward and feedback controls should be improved”"></b-proof> วินัยในการปรับแต่ง harness เรียกว่า harness engineering และ HDD (Harness-Driven Development) เป็นวิธีหนึ่งในนั้น: ทุกข้อผิดพลาดของเอเจนต์กลายเป็นกฎของสภาพแวดล้อม คือคำสั่ง การตรวจ หรือขีดจำกัด
  <a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a> วาง harness ไว้ที่ระดับ 6: เทสต์ linter และการตรวจ เพื่อให้เอเจนต์เห็นผลงานของตัวเอง เขามีเงื่อนไขข้อเดียว: ต้องมีฟีดแบ็ก ไม่เช่นนั้นผลลัพธ์คือเครื่องผลิตของเสีย (slop machine)<b-proof href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" quote="Eledath: “If you want autonomy, you need backpressure” — bassimeledath.com"></b-proof>
  <b-finding>
    <ex>เอเจนต์ใช้อัตราแลกเปลี่ยนผิด: การรีวิวบันทึกสาเหตุ กฎปรากฏใน CLAUDE.md และเพิ่มการตรวจอัตราแลกเปลี่ยนในสคริปต์</ex>
    <gen>harness ต่างจากกองไฟล์ตรงที่ข้อผิดพลาดกลายเป็นบันทึกโดยอัตโนมัติ: กฎ การตรวจ skill หรือการแก้ spec <a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a> เรียกแนวคิดนี้ว่า harness engineering อ่านเพิ่มในบทความ <a href="/blog/harness-driven-development/">Harness engineering ในทางปฏิบัติ</a></gen>
    <do>หลังแก้ข้อผิดพลาดแต่ละครั้ง ถามคำถามเดียว: ต้องเขียนอะไรไว้เพื่อไม่ให้มันเกิดซ้ำ บันทึกนั้นคือขั้น Compound และเป็นหนึ่งการเปลี่ยนแปลงของ harness</do>
  </b-finding>
</b-chapter>

<b-chapter id="system" title="ขั้นที่ 7 ระบบเอเจนต์: โค้ดเป็นฐาน เอเจนต์อยู่ในจุดซับซ้อน" icon="boxes-link">
  <b-why>บันไดจบที่ระบบเอเจนต์: ระบบที่สร้างบนหลักการแบบคลาสสิก โดยบล็อกซับซ้อนถูกแทนด้วยเอเจนต์ และทุกอย่างทำงานร่วมกันในบริการเดียว บทความแสดงวิธีไปถึงจุดนั้น: ทีละขั้น ดึงสิ่งที่ซ้ำออกเป็นโค้ดและการตรวจ</b-why>
  เส้นทางเริ่มจากเอเจนต์: ในแชตและในเซสชัน เอเจนต์ทำทุกอย่าง เมื่อถึงปลายทาง สัดส่วนของเอเจนต์ยังน้อย และฐานของระบบคือโค้ดแบบคลาสสิก: สคริปต์ การตรวจ ตารางเวลา ข้อมูล เอเจนต์รับเฉพาะจุดซับซ้อนที่ก่อนมีโมเดลภาษาขนาดใหญ่ต้องใช้ทีมผู้เชี่ยวชาญ ML แก้: การแยกวิเคราะห์ข้อความของคำขอ การจัดประเภท การวัดความคล้าย การสรุป ตอนนี้เป็นทางแก้สำเร็จรูป: โมเดลถูกเรียกเป็นส่วนหนึ่งของบริการ ให้คุณภาพสูงกว่า และอธิบายการตัดสินใจเป็นคำพูด เหตุผลจึงอ่านและตรวจได้ ระบบโดยรวมยังคาดเดาได้เพราะส่วนที่ซับซ้อนถูกล้อมด้วยการตรวจที่แน่นอน
  ตัวเลขของ <a href="https://arxiv.org/abs/2607.07052" target="_blank" rel="noopener">Malik</a> ชี้ไปทางเดียวกัน: ในแปดเดือน สัดส่วนการรันด้วยโค้ดที่ไม่มีโมเดลเพิ่มเป็น 45% ขณะที่เอเจนต์เหลือ 25% ของการรัน บันไดของ <a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a> (ระดับ 7–8: เอเจนต์เบื้องหลังและทีมเอเจนต์), <a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a> (“dark factory” กล่องดำที่เปลี่ยน spec เป็นซอฟต์แวร์) และ <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a> (คนแค่สร้างตั๋วในตัวติดตามงาน ขณะที่เอเจนต์หยิบไปทำเอง และความปลอดภัยคืออุปสรรคหลัก) ไปต่อทางความเป็นอิสระที่เพิ่มขึ้น เพื่อไม่ให้ความเป็นอิสระแบบนั้นพัง ต้องมี harness คือขั้นก่อนหน้า
  <b-finding>
    <ex>รายงานรายสัปดาห์: สคริปต์คำนวณการส่งออกและตารางสรุป กฎและการตรวจอยู่ใน harness และเอเจนต์จัดการเฉพาะข้อความอิสระในความเห็นของผู้จัดการ</ex>
    <gen>ระบบเอเจนต์ตั้งอยู่บนโค้ดและการตรวจ และเอเจนต์แก้เฉพาะสิ่งที่แก้ด้วยวิธีอื่นไม่ได้ สัดส่วนของเอเจนต์ในนั้นน้อย และความคาดเดาได้มาจากฐานที่แน่นอน</gen>
    <do>ก่อนมอบบล็อกให้เอเจนต์ ถามว่าเขียนเป็นโค้ดหรือการตรวจได้ไหม ให้เอเจนต์เฉพาะสิ่งที่โค้ดแก้ไม่ได้ และวางการตรวจที่อินพุตและเอาต์พุต</do>
  </b-finding>
</b-chapter>

<b-chapter id="traps" title="กับดักในทุกขั้น" icon="alert-circle">
  <b-why>แต่ละขั้นมีข้อผิดพลาดทั่วไปที่หยุดการไต่ขึ้นหรือทำให้แพงเกินไป ตารางประกอบจากข้อสงวนของผู้เขียนเอง</b-why>
  <b-table>
    <table>
    <thead>
      <tr><th>ขั้น</th><th>กับดักทั่วไป</th><th>ใครเขียนถึง</th><th>ออกอย่างไร</th></tr>
    </thead>
    <tbody>
      <tr><td><b>1. แชต</b></td><td>ขนข้อความไปมาแทนที่เอเจนต์จะทำงานกับไฟล์</td><td><a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a>: งานที่มีความหมายต้องใช้เอเจนต์</td><td>ให้เอเจนต์เข้าถึงโปรเจกต์และมีวิธีตรวจผล</td></tr>
      <tr><td><b>2. <a class="s-term" href="/materials/glossary/ai-agent/">เอเจนต์</a></b></td><td>คนอนุมัติทุกการกระทำ ขณะที่ไฟล์กฎโตขึ้นโดยไม่คัดแยก</td><td><a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every</a>: ส่วนใหญ่ติดอยู่ที่นี่ <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a>: กฎแย่แย่กว่าไม่มีกฎ</td><td>วางแผนล่วงหน้า ให้กฎสั้น และตรวจทุกบรรทัด</td></tr>
      <tr><td><b>3. <a class="s-term" href="/materials/glossary/spec-driven-development/">Spec</a></b></td><td>ทำ spec ให้ทุกเรื่องจุกจิก: Kiro เปลี่ยนบั๊กเล็กเป็น 4 user story และ 16 เกณฑ์ตรวจรับ</td><td><a href="https://www.martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html" target="_blank" rel="noopener">Böckeler</a> (Thoughtworks)</td><td>เขียน spec สำหรับงานที่ยาวกว่าหนึ่งวัน และปล่อยการแก้เล็ก ๆ โดยไม่มี</td></tr>
      <tr><td><b>4. <a class="s-term" href="/materials/glossary/agent-skills/">Skill</a></b></td><td>ทำ skill ให้ทุกอย่าง: มันมีต้นทุนในการสร้างและบำรุงรักษา</td><td><a href="https://dev.to/0xandrewshu/turn-chats-into-skills-skills-into-scripts-2ndg" target="_blank" rel="noopener">Shu</a></td><td>ทำ skill หลังทำซ้ำสำเร็จสองครั้ง ไม่ใช่ล่วงหน้า</td></tr>
      <tr><td><b>5. สคริปต์</b></td><td>เลื่อนขั้นเร็วเกินไป: เทมเพลตที่เห็นแค่ไม่กี่ครั้งกลับไม่น่าเชื่อถือ</td><td><a href="https://arxiv.org/abs/2607.07052" target="_blank" rel="noopener">Malik</a>: คุณภาพขึ้นกับเทสต์ที่สร้างจากการรัน</td><td>กำหนดเกณฑ์จำนวนการรัน และกลับขึ้นไปหนึ่งขั้นเมื่อล้มเหลว</td></tr>
      <tr><td><b>6. Harness</b></td><td>การรีวิวโดยคนกลายเป็นคอขวด การตรวจที่เอเจนต์ตัวเดิมเขียนยืนยันได้ทุกอย่าง</td><td><a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a>: การรีวิวโดยคนกลายเป็นคอขวด <a href="https://law.stanford.edu/2026/02/08/built-by-agents-tested-by-agents-trusted-by-whom/" target="_blank" rel="noopener">Stanford CodeX</a>: เอเจนต์เขียน stub ที่คืนค่า “สำเร็จ” เสมอ</td><td>การตรวจต้องไม่ขึ้นกับเอเจนต์ และทำการรีวิวบางส่วนให้อัตโนมัติ</td></tr>
      <tr><td><b>7. ระบบเอเจนต์</b></td><td>เอเจนต์ได้งานที่โค้ดแก้ได้: ราคาและความกระจายของผลเพิ่มขึ้น</td><td><a href="https://arxiv.org/abs/2607.07052" target="_blank" rel="noopener">Malik</a>: พฤติกรรมที่เอเจนต์ค้นพบย้ายเข้าโค้ดตามจำนวนการรันที่สำเร็จ</td><td>วางเอเจนต์เฉพาะจุดซับซ้อน และดึงสิ่งที่ซ้ำออกเป็นโค้ด</td></tr>
    </tbody>
    </table>
  </b-table>
  <b-cap>กรณี stub ของ StrongDM มีการกล่าวถึง<a href="https://law.stanford.edu/2026/02/08/built-by-agents-tested-by-agents-trusted-by-whom/" target="_blank" rel="noopener">ในบทความของ Stanford CodeX</a></b-cap>
  <b-finding>
    <ex>เอเจนต์เขียนทั้งโค้ดและการตรวจ และการตรวจแค่คืนค่า “สำเร็จ”: ระบบดูเขียวและไม่ได้ตรวจอะไรเลย</ex>
    <gen>ยิ่งขั้นสูง ความผิดพลาดในการบันทึกยิ่งแพง: กฎที่ผิด การตรวจที่แย่ หรือสคริปต์ที่มาเร็วเกินไปกระทบทุกการรันที่ตามมา</gen>
    <do>ก่อนเขียนอะไรลงไป ถามว่า: ใครจะตรวจบันทึกนี้ และอย่างไร ถ้าไม่มีใคร ให้เก็บความรู้ไว้ต่ำลงหนึ่งขั้น</do>
  </b-finding>
</b-chapter>

<b-chapter id="stop" title="หยุดเมื่อไร" icon="target">
  <b-why>ขั้นบนแพงกว่าขั้นล่าง และไม่ใช่ทุกทีมที่ต้องการมัน</b-why>
  <b-table>
    <table>
    <thead>
      <tr><th>แหล่งว่าอย่างไร</th><th>ในทางปฏิบัติหมายความว่า</th></tr>
    </thead>
    <tbody>
      <tr><td><a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a>: ทีมส่วนใหญ่ควรตั้งเป้าที่ระดับ 5 เหนือนั้นขึ้นไป throughput เพิ่ม แต่ความสามารถในการเข้าใจและตรวจผลไม่เพิ่ม</td><td>กฎที่เขียนไว้ deterministic tooling และ context ร่วมกัน มักสำคัญกว่าการทำอัตโนมัติสูงสุด</td></tr>
      <tr><td><a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a>: สำหรับงานประจำวัน แรงยกอยู่ที่ระดับ 7 ผู้เขียนมองระดับ 8 เป็นแนวหน้าที่ยังไม่มีใครเชี่ยวชาญ</td><td>เอเจนต์เบื้องหลังที่มีการตรวจเป็นเพดานที่สมเหตุสมผลในวันนี้</td></tr>
      <tr><td><a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a>: ที่ระดับ 3 หลายคนรู้สึกว่าแย่ลง เพราะงานเหลือแค่การอ่าน diff</td><td>หลังเร็วขึ้นครั้งแรกอาจมีช่วงตก ผ่านไปได้ด้วยการย้ายไป spec และ skill ไม่ต้องกลับไปแชต</td></tr>
      <tr><td><a href="https://dev.to/0xandrewshu/turn-chats-into-skills-skills-into-scripts-2ndg" target="_blank" rel="noopener">Shu</a>: ทั้ง skill และสคริปต์มีต้นทุนในการสร้างและบำรุงรักษา</td><td>ทำอัตโนมัติเฉพาะสิ่งที่ซ้ำจริง</td></tr>
      <tr><td><a href="https://arxiv.org/abs/2607.07052" target="_blank" rel="noopener">Malik</a>: ผลที่ได้น้อยลงในที่ที่งานใหม่แบบครั้งเดียวมีมาก</td><td>สำหรับงานสำรวจ ให้อยู่กับเอเจนต์ที่มี spec</td></tr>
    </tbody>
    </table>
  </b-table>
  <b-finding>
    <ex>ในบันไดของ <a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a> ระดับที่เจ็ดอยู่แยกออกมา: เขาบอกว่ามันใกล้กับการรีเซ็ตมากกว่าการต่อเนื่อง</ex>
    <gen>การไต่บันไดมีเหตุผลตราบที่มันลดงานของคน จำนวนไฟล์ในรีโพซิทอรีไม่พิสูจน์อะไร</gen>
    <do>ก่อนก้าวแต่ละครั้ง ตรวจว่า: งานทำซ้ำไหม ตรวจผลอัตโนมัติได้ไหม ถ้าไม่ ให้อยู่ที่ขั้นปัจจุบัน</do>
  </b-finding>
</b-chapter>

<b-chapter id="start" title="เริ่มที่ไหน: prompt พร้อมใช้สำหรับเอเจนต์" icon="play">
  <b-why>prompt สี่ข้อที่ยกความรู้ขึ้นหนึ่งขั้น นั่นคือดึงมันออกจากขั้นข้างล่าง ใส่งานของตัวเองแทนวงเล็บเหลี่ยม</b-why>
  <b-sublabel top="12">จากแชตสู่ไฟล์กฎ</b-sublabel>
  <b-prompt>
    อ่านบทสนทนานี้อีกรอบ หาจุดที่ฉันแก้คำตอบของคุณหรือพูดเรื่องเดิมซ้ำ
    สำหรับแต่ละจุด เขียนกฎสั้น ๆ หนึ่งบรรทัดสำหรับไฟล์ CLAUDE.md
    อย่าเพิ่มคำแนะนำทั่วไป เอาเฉพาะสิ่งที่อยู่ในบทสนทนา
  </b-prompt>
  <b-sublabel top="22">จากกฎสู่ spec</b-sublabel>
  <b-prompt>
    งาน: [คำอธิบาย] ก่อนเขียนโค้ด ให้ร่าง spec.md:
    ต้องผลิตอะไร ข้อมูลมาจากไหน มีข้อจำกัดอะไร และรู้ได้อย่างไรว่างานเสร็จ
    ถามฉันถ้ามีอะไรขาดไป
  </b-prompt>
  <b-sublabel top="22">จากการรันที่ดีสู่ skill</b-sublabel>
  <b-prompt>
    อ่านบทสนทนานี้อีกรอบ และเปลี่ยนขั้นตอนที่คุณทำในนั้นเป็น skill: โฟลเดอร์ที่มี SKILL.md
    ชื่อและคำอธิบายอยู่ต้นไฟล์ ตามด้วยคำสั่งทีละขั้น ข้อจำกัด และตัวอย่างผลลัพธ์
  </b-prompt>
  <b-sublabel top="22">จาก skill สู่สคริปต์</b-sublabel>
  <b-prompt>
    ดู skill [ชื่อ] เลือกขั้นตอนที่ทำเหมือนเดิมทุกครั้ง และเขียนสคริปต์ Python สำหรับขั้นเหล่านั้น
    ใน skill ให้เหลือเฉพาะการเรียกสคริปต์และการตรวจผล
  </b-prompt>
  <b-finding>
    <ex>prompt สี่ข้อแทนการอภิปรายเรื่อง “จะนำ AI มาใช้อย่างไร”: แต่ละข้อยกความรู้ขึ้นหนึ่งขั้นพอดีหนึ่งส่วน</ex>
    <gen>มีกฎการเปลี่ยนผ่านข้อเดียว: เกิดซ้ำเป็นครั้งที่สอง ให้เขียนลง บันทึกซ้ำและคงที่ ให้เปลี่ยนเป็นโค้ด</gen>
    <do>เริ่มจาก prompt ที่ตรงกับขั้นปัจจุบันของคุณจากตารางต้นบทความ</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="คำถามที่พบบ่อย">
  <b-faq-cards>
    <q t="การทำงานกับ AI ในการพัฒนามีระดับความเติบโตอะไรบ้าง?">ไม่มีมาตราเดียว บทความนี้มีเจ็ดขั้น <a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every</a> มีหกขั้นจากการพัฒนาด้วยมือถึงเอเจนต์บนคลาวด์แบบขนาน <a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a> มีแปดระดับ <a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a> เจ็ด และ <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a> กับ <a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a> อย่างละหก (ระดับ 0–5) ทั้งหมดเห็นตรงกันว่าเส้นทางไปจากแชตสู่เอเจนต์ แล้วสู่กฎและ spec ที่เขียนไว้ และต่อไปสู่ระบบอัตโนมัติ</q>
    <q t="compound engineering คืออะไร?">แนวทางจาก Every ที่ทุกงานที่เสร็จทิ้งบันทึกที่ช่วยงานหลัง ๆ: ลูป Plan → Work → Review → Compound ขั้นสุดท้ายเขียนบทเรียนลง CLAUDE.md เอกสารทางแก้ skill และเอเจนต์</q>
    <q t="skill ต่างจากสคริปต์อย่างไร?">skill คือคำสั่งที่เป็นข้อความ ซึ่งโมเดลรันใหม่ทุกครั้ง ผลจึงอาจต่างกัน สคริปต์คือโค้ดธรรมดา: เร็วกว่า ถูกกว่า และให้ผลเหมือนเดิม แต่เขียนช้ากว่าและแข็งกว่าเมื่อเจอสภาวะที่ไม่คาดคิด</q>
    <q t="จำเป็นต้องไปถึง “dark factory” หรือไม่?">ไม่ Clark แนะนำให้ทีมส่วนใหญ่หยุดที่ระดับ 5 และ Eledath ชี้ระดับ 7 ว่าเป็นจุดที่ได้แรงยกหลัก ไต่สูงกว่านั้นก็ต่อเมื่องานทำซ้ำและตรวจผลอัตโนมัติได้</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="อ่านต่อ">
  <b-links cols="2">
    <item href="/blog/harness-driven-development/" k="วิธีการ" t="Harness-Driven Development">ข้อผิดพลาดของเอเจนต์ → กฎของสภาพแวดล้อม</item>
    <item href="/blog/specs-rules-skills/" k="Context" t="AGENTS.md, CLAUDE.md และ spec.md">อะไรอยู่ที่ไหน: spec กฎ skill</item>
    <item href="/blog/spec-reconcile-loop/" k="Spec" t="ลูป reconcile ของ spec">spec เรียนรู้จากระบบที่รันอยู่ได้อย่างไร</item>
    <item href="/blog/specs-by-aggregates/" k="Spec" t="Spec ตาม aggregate">วิธีแบ่ง spec ใหญ่เป็นส่วน ๆ</item>
    <item href="/blog/quality-gates-ai-agents/" k="จุดตรวจ" t="จุดตรวจคุณภาพสำหรับเอเจนต์ AI คืออะไร">ควรวางการตรวจอะไรไว้ที่ขั้นต่าง ๆ ของบันได</item>
    <item href="/blog/agent-escalation-to-human/" k="Escalation" t="การส่งต่อให้คนในเอเจนต์ AI">เอเจนต์หยุดและถามอย่างไร</item>
  </b-links>
</b-chapter>
<b-footer>อ้างอิงจากแหล่งปฐมภูมิ: <a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every</a> (compound engineering), <a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a> (05.02.2026), <a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a> (10.03.2026), <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a> (06.04.2026), <a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a> (05.01.2026), <a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a> (23.01.2026), <a href="https://developers.redhat.com/articles/2026/03/30/vibes-specs-skills-agents-ai-coding" target="_blank" rel="noopener">Red Hat</a> (30.03.2026), <a href="https://dev.to/0xandrewshu/turn-chats-into-skills-skills-into-scripts-2ndg" target="_blank" rel="noopener">Shu</a> (19.09.2026), <a href="https://arxiv.org/abs/2607.07052" target="_blank" rel="noopener">Malik</a> (arXiv 2607.07052, 08.07.2026), Zhang (arXiv 2603.10808), <a href="https://martinfowler.com/articles/harness-engineering.html" target="_blank" rel="noopener">Böckeler</a> (martinfowler.com) หกขั้นประกอบจากแหล่งเหล่านี้ด้วยเกณฑ์ “อะไรถูกบันทึกไว้” ผู้เขียนเหล่านั้นไม่มีบันไดเดียวที่เรียงลำดับแบบนี้</b-footer>
</b-post>
