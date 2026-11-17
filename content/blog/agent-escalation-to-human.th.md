---
title: การส่งต่อให้คนตัดสินใจ (escalation to a human) ในเอเจนต์ AI: เอเจนต์หยุดแล้วถามผ่าน MCP และ hook ได้อย่างไร
date: 2026-11-14
updated: 2026-11-17
description: เมื่อเอเจนต์ส่งการตัดสินใจให้คน จะเกิด elicitation ใน MCP, permission mode และ hook ของ Claude Code บทความนี้ดูว่าเอเจนต์ถามบ่อยแค่ไหน และทำไมทางถึงคนจึงแคบ
tags: AI, เอเจนต์, MCP, elicitation, escalation, hook, Claude Code, ความเป็นอิสระ, harness
category: harness
layout: wide
mentions: MCP, hooks, harness, bounded context, quality gate, Google DeepMind, escalation to a human
toc: answer=สรุปสั้น | seen=ภาพแรก | penalty=บทลงโทษ | measure=เมตริก | time=ความเป็นอิสระ | behavior=พฤติกรรม | mcp=MCP | cc=Claude Code | narrow=ช่องแคบ | claims=ผลลัพธ์ | start=เริ่มต้น | faq=คำถาม | next=อ่านต่อ
---

การส่งต่อให้คนตัดสินใจ (escalation to a human) คือช่วงที่เอเจนต์หยุดทำงานแล้วส่งการตัดสินใจให้คน ด้วยคำถาม คำขออนุญาต หรือการขอให้ยืนยัน MCP มี elicitation สำหรับเรื่องนี้ โดยมีคำตอบสามแบบ (accept, decline, cancel) ส่วน Claude Code มี hook และ permission mode การตรวจอยู่นอกเอเจนต์ และตัวการส่งต่อเองผ่านช่องที่แคบ ด้านล่างคือภาพแรกที่เห็นและสิ่งที่การตรวจพบ

<b-post series="harness">
<b-callout icon="bulb">**ข้อสังเกต** ผู้เขียนเคยคิดว่าเอเจนต์ถูกฝึกและถูกวัดจากระยะเวลาที่ทำงานเองได้โดยไม่มีคน คะแนนให้ตามผลลัพธ์: งานแก้ได้คือ 1 แก้ไม่ได้คือ 0 คำถามถึงคนไม่ได้สร้างผลลัพธ์ในตัวเอง บทลงโทษจึงมาจากงานที่ยังไม่เสร็จ และการเดาให้ผลดีกว่า ผู้เขียนตรวจสิ่งนี้กับเอกสารและงานวิจัย แล้วสรุปเป็นสูตรด้านล่าง ปรากฏว่าบทลงโทษสำหรับตัวคำถามเองพบได้น้อย: เมตริกบางตัวไม่ได้กำหนดเรื่องคำถามไว้ และบางตัวให้รางวัลกับคำถาม</b-callout>

<b-chapter id="answer" icon="chat" title="สรุปสั้น: escalation คืออะไรและผ่านทางไหน">
  <b-art names="agent-escalation-to-human/window" wide/>
  <b-cap>เอเจนต์ทำงานในบริบทของตัวเอง คำถามหนึ่งข้อไปถึงคนที่อยู่หลังเส้นกั้น และคำตอบหนึ่งในสามแบบส่งกลับมา</b-cap>
  <b-why align="left"><b-icon name="chat"/> **คืออะไร** Escalation คือการหยุดที่เอเจนต์หรือโปรแกรมรอบตัวเอเจนต์เป็นผู้เริ่ม: “ตรงนี้ตัดสินใจเองไม่ได้ ต้องใช้คน” มีสามแบบที่พบบ่อย คือคำถามขอความกระจ่าง คำขออนุญาตสำหรับการกระทำที่อันตราย และการขอให้ยืนยันผลลัพธ์ก่อน merge จุดตรวจคุณภาพจากบทความ [“จุดตรวจคุณภาพสำหรับเอเจนต์ AI คืออะไร”](/blog/quality-gates-ai-agents/) ส่งให้คนดูสิ่งที่การตรวจ “ไม่แน่ใจ” escalation จึงเป็นส่วนต่อของจุดตรวจนั้น</b-why>
  <b-why align="left"><b-icon name="package"/> **ทำงานอย่างไรใน MCP** เซิร์ฟเวอร์ถามคนผ่านไคลเอนต์ได้ ในสเปกเรียกว่า elicitation มีคำตอบสามแบบ: accept, decline, cancel เซิร์ฟเวอร์ห้ามพึ่งว่าจะมีคำตอบเสมอ เพราะตัวโปรโตคอลบังคับให้จัดการทั้ง decline และ cancel</b-why>
  <b-why align="left"><b-icon name="shield-check"/> **ทำงานอย่างไรใน Claude Code** Permission mode กำหนดว่าการเรียกแบบใดไปถึงคน และ hook ดักการเรียกแล้วตอบ “allow”, “deny” หรือ “ask” โปรแกรมเป็นผู้บังคับใช้ ส่วนข้อความคำสั่งเป็นเพียงแนวทาง</b-why>
  <b-finding>
    <ex>เอเจนต์แก้ไฟล์ config ของเซิร์ฟเวอร์จองที่พัก hook เห็นว่าเป็น path ของ config ที่ใช้งานจริงจึงตอบ “ask” คนได้รับหน้าต่างพร้อมคำถาม ถ้าไม่มีใครตอบและการรันไม่มีส่วนติดต่อผู้ใช้ การเรียกนั้นจะถูกปฏิเสธ และเอเจนต์ทำต่อด้วยแผนอื่น</ex>
    <gen>Escalation มีสองส่วน: โปรแกรมรอบเอเจนต์ตัดสินว่า “ถาม” และคำตอบมาจากคนผ่านช่องแคบ</gen>
    <do>จดการกระทำของเอเจนต์สามอย่างที่ต้องการให้ถามก่อน เช่น การลบ การปล่อยเวอร์ชัน การเปลี่ยนสิทธิ์ ส่วนที่เหลืออนุญาตได้โดยไม่ต้องถาม</do>
  </b-finding>
</b-chapter>

<b-chapter id="seen" icon="eye" title="ภาพแรกที่เห็นเป็นอย่างไร">
  <b-why align="left">ข้อสังเกตตั้งต้นง่ายมาก: เอเจนต์ไม่ค่อยหยุดถาม แต่เดาแล้วทำต่อมากกว่า จากนี้เกิดสมมติฐานสี่ข้อต่อกัน และแต่ละข้อต้องตรวจแยกกัน</b-why>
  <b-rules cols="2">
    <rule icon="shield-check" t="1. การตรวจอยู่ข้างนอก">จุดตรวจและคำถามถึงคนควรอยู่นอกเอเจนต์ ไม่เช่นนั้นเอเจนต์จะตัดสินเอง</rule>
    <rule icon="clock" t="2. เอเจนต์ถูกฝึกให้เป็นอิสระ">เอเจนต์ถูกฝึกและถูกวัดจากระยะเวลาที่ทำงานเองได้: ไปได้ไกลแค่ไหนจากเริ่มจนหยุดโดยไม่มีคน</rule>
    <rule icon="x" t="3. คำถามคือความสูญเสีย">คะแนนให้ 1 เมื่อแก้ได้และ 0 เมื่อแก้ไม่ได้ คำถามที่ไม่ได้ทำให้งานเสร็จได้ 0 ส่วนการเดาอาจได้ 1 การถามจึงไม่คุ้ม</rule>
    <rule icon="package" t="4. MCP เป็นคอขวด">ผ่าน MCP ได้เพียงคำถามและคำตอบ ส่วนที่เหลือโฮสต์เป็นผู้ตัดสิน</rule>
  </b-rules>
  <b-why align="left">ต่อไปตามลำดับ: เกณฑ์วัดวัดอะไร “เวลาทำงานอัตโนมัติ” หมายถึงอะไร เอเจนต์ถามในทางปฏิบัติอย่างไร และ MCP กับ Claude Code ว่าอย่างไร ความคาดหวังกับสิ่งที่พบจะวางเทียบกันในตารางใกล้ท้ายบทความ เริ่มจากว่าบทลงโทษอยู่ตรงไหนในเมตริกแบบนี้</b-why>
</b-chapter>

<b-chapter id="penalty" icon="x" title="เอเจนต์ถูกลงโทษเรื่องอะไร: เมตริกและสูตร">
  <b-why align="left">แผนภาพสองแบบแสดงว่าค่าใดลดลงเมื่อเอเจนต์หยุดถาม นี่เป็นบันทึกแบบง่ายตามความหมายของเมตริกในแหล่งอ้างอิง ส่วนคำอ้างอิงอยู่ในบทที่ว่าด้วยการตรวจ</b-why>
  <b-art names="agent-escalation-to-human/score-cases" wide/>
  <b-cap>คะแนนตามผลลัพธ์: คำตอบที่ถูกได้ 1 คำตอบที่ผิดและการหยุดโดยไม่มีคำตอบได้ 0</b-cap>
  <b-why align="left">บทลงโทษตกที่ผลลัพธ์ที่ยังไม่เสร็จ: การหยุดโดยไม่มีคำตอบได้ 0 เท่ากับความผิดพลาด ถ้ามีช่องทางถามและงานแก้ได้หลังได้คำตอบ คำถามกลับคุ้มค่า และ HiL-Bench สร้างขึ้นตามหลักนี้</b-why>
  <b-art names="agent-escalation-to-human/turn-cut" wide/>
  <b-cap>คำถามตัดรอบการทำงาน: ตัวอย่างสมมติ 60 นาที</b-cap>
  <b-why align="left">ที่ Anthropic คำถามจบรอบที่ใช้วัด ห้องวิจัยเองเรียกการหยุดของเอเจนต์ว่าการกำกับดูแล (oversight)</b-why>
  <b-finding>
    <ex>เอเจนต์ใช้เวลาสี่สิบนาทีแก้การส่งออกข้อมูล พบสองวิธีที่ถูกต้องเท่ากันแล้วถามคน เมื่อให้คะแนนตามผลลัพธ์ คำถามไม่เสียอะไรตราบที่งานแก้ได้ภายหลัง เมื่อวัดตามความยาวรอบ คำถามตัด 60 นาทีเป็น 40 กับ 20</ex>
    <gen>บทลงโทษอยู่สองที่: ศูนย์สำหรับงานที่แก้ไม่ได้ และการตัดรอบเมื่อมีคำถาม ไม่มีเมตริกใดที่ตรวจแล้วหักคะแนนเพราะตัวคำถามเอง</gen>
    <do>เขียนสูตรของเมตริกที่ใช้อยู่: ตัวตั้งคืออะไร และคะแนนเป็นอย่างไรถ้าเอเจนต์หยุดแล้วถาม</do>
  </b-finding>
</b-chapter>

<b-chapter id="measure" icon="gauge" title="การตรวจ: เกณฑ์วัดความเป็นอิสระวัดอะไร และคนอยู่ตรงไหน">
  <b-why align="left">ความเป็นอิสระวัดได้หลายวิธี และวิธีที่ใช้ตัดสินว่าเมตริกมองเห็นการหยุดเพื่อถามหรือไม่ ตามลำดับด้านล่าง: ภาพของเมตริกที่มีเส้นชัย ขอบเขตเวลา (horizon) ของ METR เกณฑ์แบบดั้งเดิม และเมตริกที่นับคำถาม</b-why>
  <b-art names="agent-escalation-to-human/finish-line" wide/>
  <b-cap>เมตริกกำหนดเส้นชัย ทางของคำถามไปถึงคนไม่อยู่ในการนับ</b-cap>
  <b-subhead>Horizon ของ METR: งานใช้เวลาของคนนานแค่ไหน</b-subhead>
  <b-why align="left">METR นิยาม horizon เป็นเวลาที่คนใช้ตามปกติกับงานที่โมเดลแก้ได้ด้วยอัตราสำเร็จ 50%<b-proof href="https://arxiv.org/abs/2503.14499" quote="METR, arXiv 2503.14499: „the time humans typically take to complete tasks that AI models can complete with 50% success rate“"/> เวลาของงานมาจากการรันของคนที่สำเร็จ ชุดงานไม่มีงานที่มีการขอให้คนช่วย และ METR เองเตือนว่า horizon ไม่ใช่เวลาของการทำงานอย่างอิสระ<b-proof href="https://metr.org/notes/2026-01-22-time-horizon-limitations/" quote="METR, 22.01.2026: „Time horizon is not the length of time AIs can work independently“; „We have no tasks involving multi-turn interaction with a human so there is no right answer.“"/> ในรายงานวันที่ 19 พฤษภาคม 2026 โมเดลร่วมที่ดีที่สุดได้ 16–20 ชั่วโมงที่ระดับ 50% และ 3–4 ชั่วโมงที่ระดับ 80%<b-proof href="https://metr.org/blog/2026-05-19-frontier-risk-report/" quote="METR, Frontier Risk Report: „the 50% time horizon point estimate of the most capable shared model was between 16 and 20 hours“"/></b-why>
  <b-codebox title="วิธีคำนวณ horizon ของ METR">
    p(success | task of length t) = σ( (ln h − ln t) · β )
    h — the horizon: the task length at which p = 0.5
    t — the geometric mean of successful human run times
  </b-codebox>
  <b-why align="left">วิธีของ METR คือเส้นโค้งโลจิสติกตามความยาวงาน โดยอ่าน horizon ที่จุด 50% (หรือ 80%)<b-proof href="https://arxiv.org/abs/2503.14499" quote="METR, arXiv 2503.14499: „we use logistic regression to find the task difficulty at which the agent has a 50% chance of success“"/> เวลาของเอเจนต์เองไม่อยู่ในสูตรเลย</b-why>
  <b-art names="agent-escalation-to-human/horizon" wide/>
  <b-cap>ชั่วโมงของงานสำหรับโมเดลที่ดีที่สุด: ที่ระดับ 50% และที่ระดับ 80%</b-cap>
  <b-subhead>เกณฑ์ชุดงาน: ไม่มีคนอยู่ในนั้น</b-subhead>
  <b-why align="left">SWE-bench ให้คะแนนด้วยเทสต์: “สัดส่วนของงานที่แก้ได้”<b-proof href="https://arxiv.org/abs/2310.06770" quote="SWE-bench: „The metric for our benchmark is the percentage of task instances that are resolved.“"/> ใน OSWorld, Terminal-Bench, GAIA และ Cybench สคริปต์ เทสต์ หรือ flag เป็นผู้ตัดสิน และไม่มีช่องทางไปถึงคน วลี “minimal human intervention” ในงานเหล่านี้อธิบายเป้าหมายหรือการขยายชุดงาน ไม่ใช่เมตริก ใน tau-bench รางวัลเป็น 0 หรือ 1 ตามฐานข้อมูลสุดท้าย และการส่งต่อให้คนเป็นการกระทำธรรมดา: ในบางงานอยู่ในเฉลยอ้างอิง ในที่เหลือฐานข้อมูลจะไม่ตรงกับเฉลย</b-why>
  <b-subhead>เมตริกที่นับคำถาม: HiL-Bench, HAS-Bench, Anthropic</b-subhead>
  <b-why align="left">แหล่งทั้งสามนับคำถามต่างกัน จึงเริ่มจากความต่างที่ชัดที่สุด: เกิดอะไรกับโมเดลเมื่อแก้งานไม่ได้หากไม่ถาม</b-why>
  <b-art names="agent-escalation-to-human/hil-bench" wide/>
  <b-cap>เมื่อส่วนที่ขาดต้องหาโดยถามคน สัดส่วนงานที่แก้ได้ลดลงหลายเท่า</b-cap>
  <b-why align="left">HiL-Bench จาก Scale AI สร้างให้แก้งานไม่ได้หากไม่ถาม ผู้เขียนระบุว่าเกณฑ์ทั่วไปมองไม่เห็นความล้มเหลวนี้<b-proof href="https://arxiv.org/abs/2604.09408" quote="HiL-Bench, 04.05.2026: „an agent that makes a lucky guess for a missing requirement will score identically to one that would have asked to be certain“"/> เมื่อมีฟังก์ชัน “ถามคน” โมเดลที่ดีที่สุดแก้งานได้ 1 ถึง 39% เทียบกับ 67 ถึง 91% เมื่อมีข้อมูลครบ รางวัลตอนฝึกคือ +0.3 สำหรับคำถามที่เกี่ยวข้อง และ −0.1 สำหรับคำถามที่เกินจำเป็น HAS-Bench เสนอสัดส่วนการแทรกแซงของคนเป็นตัวเลขเชิงพรรณนา<b-proof href="https://arxiv.org/abs/2607.04329" quote="HAS-Bench, 05.07.2026: „HIR is a descriptive cost/intensity metric. Higher HIR means more human involvement, not necessarily better task performance.“"/> ในงานว่าด้วยความเป็นอิสระใน production Anthropic นับการแทรกแซงกับการหยุดที่เอเจนต์เริ่มแยกกัน และเรียกการหยุดว่ารูปแบบหนึ่งของการกำกับดูแล<b-proof href="https://www.anthropic.com/research/measuring-agent-autonomy" quote="Anthropic, 18.02.2026: „agent-initiated stops are an important kind of oversight in deployed systems.“"/></b-why>
  <b-codebox title="สามวิธีนับคำถาม">
    HiL-Bench:  r_question = +0.3 if the question targets something missing
                r_question = −0.1 if it is extra or a repeat
                a task counts only when everything missing is resolved
    HAS-Bench:  HIR = steps done by people / all steps   (a description, not a penalty)
    Anthropic:  an agent stop counts as oversight, an intervention separately
  </b-codebox>
  <b-art names="agent-escalation-to-human/metrics" wide/>
  <b-cap>สี่วิธีที่ปฏิบัติต่อคำถามของเอเจนต์: ไม่มีช่องทาง เป็นกลาง ให้รางวัล และเป็นรูปแบบของการกำกับดูแล</b-cap>
  <b-why align="left">สรุปนี้รวมสี่วิธีไว้ด้วยกัน: งานของเอเจนต์เหมือนเดิม แต่เมตริกอาจมองไม่เห็นคำถาม ให้รางวัลกับมัน หรือนับเป็นการกำกับดูแล</b-why>
  <b-finding>
    <ex>เอเจนต์ตัวเดียวกันถามไม่ได้ใน SWE-bench ถามเพื่อรับรางวัลใน HiL-Bench และในเมตริก production ของ Anthropic การหยุดของมันถูกบันทึกเป็นการกำกับดูแล เมตริกมีมากกว่าหนึ่งแบบ และคำขอถึงคนถูกบันทึกต่างกันในแต่ละแบบ</ex>
    <gen>ข้อความว่า “เมตริกความเป็นอิสระลงโทษคำถาม” ผิดในฐานะกฎทั่วไป ที่ถูกต้องแคบกว่านั้น: เกณฑ์แบบดั้งเดิมไม่ได้กำหนดเรื่องคำถามไว้ และการหยุดโดยไม่มีคำตอบเท่ากับความล้มเหลว</gen>
    <do>ถามเมตริกความเป็นอิสระของตัวเองว่า เมื่อเอเจนต์หยุดแล้วถาม มันบันทึกอะไร: สำเร็จ ล้มเหลว หรือไม่บันทึกอะไรเลย</do>
  </b-finding>
</b-chapter>

<b-chapter id="time" icon="clock" title="อะไรนับเป็นเวลาอัตโนมัติที่ METR, Anthropic และ DeepMind">
  <b-why align="left">วลี “เวลาอัตโนมัติ” มีสามความหมายที่ต่างกันในสามห้องวิจัย และนั่นตัดสินว่าคำถามของเอเจนต์ถึงคนทำให้เมตริกเสียหรือไม่ ด้านล่างตามลำดับ: METR นับอะไร Anthropic นับอะไร และ Google DeepMind นับอะไร</b-why>
  <b-art names="agent-escalation-to-human/three-clocks" wide/>
  <b-cap>สามการวัด: ชั่วโมงของคนที่ใช้กับงาน รอบการทำงานตั้งแต่เริ่มจนหยุด และงานที่ไม่มีการแทรกแซงของคน</b-cap>
  <b-why align="left">“ทำงานเอง” วัดได้สามทาง ทางแรก: งานที่เอเจนต์แก้ได้ใช้เวลาของคนกี่ชั่วโมง ทางที่สอง: เอเจนต์ไปได้ไกลแค่ไหนจากเริ่มจนหยุด ทางที่สาม: งานสัดส่วนเท่าใดเสร็จโดยไม่มีการแทรกแซงของคน สูตรของทั้งสามอยู่ด้านล่าง</b-why>
  <b-subhead>METR: ความยากของงาน เวลาของเอเจนต์เองไม่อยู่ในเมตริก</b-subhead>
  <b-why align="left">METR ตอบเองว่านี่คือเวลาของการทำงานอย่างอิสระหรือไม่<b-proof href="https://metr.org/notes/2026-01-22-time-horizon-limitations/" quote="METR, 22.01.2026: „Time horizon is not the length of time AIs can work independently. Rather, it's the amount of serial human labor they can replace with a 50% success rate.“"/> FAQ ในหน้า horizon ก็ว่าเช่นกัน: มันวัดความยากของงาน และเวลาที่ AI ใช้ไม่เป็นส่วนของมัน<b-proof href="https://metr.org/time-horizons" quote="METR, FAQ: „It’s a measure of the difficulty of a task, rather than the time an AI spends to complete the task.“"/> METR ไม่เผยแพร่เวลาของเอเจนต์เอง: มันต่างกันมากตามผู้ให้บริการโมเดลและการตั้งค่าเอเจนต์</b-why>
  <b-subhead>Anthropic: รอบการทำงานของเอเจนต์ตั้งแต่เริ่มจนหยุด</b-subhead>
  <b-why align="left">ในงานว่าด้วยความเป็นอิสระใน production เวลานับแบบกลไกจาก telemetry ของ Claude Code: ตั้งแต่เริ่มทำงานจนถึงการหยุด และการหยุดอาจเป็นคำถามถึงคนก็ได้<b-proof href="https://www.anthropic.com/research/measuring-agent-autonomy" quote="Anthropic, 18.02.2026: „tracking how much time has elapsed between when Claude starts working and when it stops (whether because it finished the task, asked a question, or was interrupted by the user)“"/> ดังนั้นคำถามของเอเจนต์ตัดรอบและทำให้เวลาที่วัดได้สั้นลงตามรูปแบบ ผู้เขียนงานเองก็ระบุว่าความยาวรอบเป็นตัวแทนที่ไม่สมบูรณ์ของความเป็นอิสระ</b-why>
  <b-why align="left">Anthropic ไม่ถือว่าการหยุดเพื่อถามเป็นข้อบกพร่อง ตามถ้อยคำของงาน ในงานที่ยากกว่า Claude จำกัดความเป็นอิสระของตัวเองด้วยการหยุดปรึกษาคน และเชิงอรรถเสริมว่าการถามผู้ใช้เป็นรูปแบบหนึ่งของ agency<b-proof href="https://www.anthropic.com/research/measuring-agent-autonomy" quote="Anthropic: „stopping to ask the user a question is itself a form of agency“"/> นับเฉพาะคำถามที่ขวางงานแบบ “ต้องมีสิ่งนี้จึงจะทำต่อได้” ส่วนคำถามอย่าง “ให้ commit ไหม” หลังงานเสร็จแล้วไม่ใช่การหยุด</b-why>
  <b-subhead>Google DeepMind: งานเสร็จโดยไม่มีการแทรกแซงของคน</b-subhead>
  <b-why align="left">DeepMind ไม่มีเมตริกความยาวรอบ ใน “Levels of AGI” ความเป็นอิสระอธิบายเป็นระดับจาก “AI as a Tool” ถึง “AI as an Agent” ตามรูปแบบปฏิสัมพันธ์ ไม่ใช่เวลา และความสามารถในการหันไปหาคนเป็นส่วนของระดับสูงสุด: AI ที่เป็นอิสระเต็มที่ทำงานโดยไม่มีการกำกับดูแลต่อเนื่อง แต่รู้ว่าเมื่อใดควรปรึกษาคน<b-proof href="https://arxiv.org/abs/2311.02462" quote="Levels of AGI, arXiv 2311.02462: „such a fully autonomous AI can act in an aligned fashion without continuous human oversight, but knows when to consult humans“"/> ในรายงาน Frontier Safety Framework (ตุลาคม 2026) ความเป็นอิสระนิยามว่า “งานเสร็จโดยไม่มีการแทรกแซงของคน”: ดูว่าเอเจนต์สำเร็จเองหรือไม่ และคนเข้าแทรกแซงหรือไม่ และสัดส่วน pull request ที่มอบหมายเต็มรูปแบบเพิ่มจาก 7.5% เป็น 11.9%<b-proof href="https://storage.googleapis.com/deepmind-media/gemini/gemini_4_argon_fsf_report.pdf" quote="Gemini 4 Argon FSF report: „whether the agent succeeded autonomously, and whether the human intervened or the outcome was otherwise negative or ambiguous“"/> ไม่พบเมตริกแยกว่า “เอเจนต์ถามคน” ในรายงานนั้น</b-why>
  <b-table>

| ใคร | อะไรนับเป็นอิสระ | คำถามของเอเจนต์ถึงคน |
|---|---|---|
| **METR** | ความยากของงานเป็นชั่วโมงของคน | ไม่มีเหตุการณ์นี้: งานไม่มีบทสนทนา |
| **Anthropic** | ความยาวรอบจนถึงการหยุด | ตัดรอบ แต่เรียกว่าการกำกับดูแล |
| **Google DeepMind** | งานที่ไม่มีการแทรกแซงของคน | ไม่ใช่การแทรกแซง ไม่นับแยก |

  </b-table>
  <b-finding>
    <ex>เอเจนต์หยุดแล้วถาม ที่ Anthropic รอบจบตรงนั้น ที่ METR ไม่มีเหตุการณ์แบบนี้ และ DeepMind สนใจว่าคนเข้าแทรกแซงเองหรือไม่</ex>
    <gen>คำถามของเอเจนต์ทำให้สั้นลงเฉพาะรอบที่ Anthropic และแม้ที่นั่นก็เรียกว่าการกำกับดูแล ห้องวิจัยนับการแทรกแซงของคนเองเป็นส่วนที่ลบ</gen>
    <do>เมื่อมีคนบอกชั่วโมงการทำงานอัตโนมัติของเอเจนต์ ให้ถามว่าเป็นการวัดแบบใด: ความยาวรอบ ความยากของงาน หรือสัดส่วนงานที่ไม่มีการแทรกแซง</do>
  </b-finding>
</b-chapter>

<b-chapter id="behavior" icon="eye" title="การตรวจ: เอเจนต์ถามจริงหรือไม่">
  <b-art names="agent-escalation-to-human/ask-rate" wide/>
  <b-cap>สัดส่วนเซสชันที่มีคำถามในงานวิจัยหนึ่ง: ตั้งแต่ศูนย์จนถึงครึ่งหนึ่ง</b-cap>
  <b-why align="left">ไม่มีสัดส่วนเดียว ผลขึ้นกับโมเดล prompt และ harness เมื่อไม่ได้รับอนุญาตให้ถาม โมเดลแทบไม่พูดอะไร: ใน Ambig-SWE (500 งานจาก SWE-bench) “without explicit prompting, models almost never interact”<b-proof href="https://arxiv.org/abs/2502.13069" quote="Ambig-SWE, arXiv 2502.13069: „Without explicit prompting, models almost never interact, even for severely underspecified inputs.“"/> เมื่อมี prompt Sonnet 4 ถามในงานที่กำหนดไม่ครบถึง 82% และในงานที่ครบ 3% แผนภูมิด้านบนแสดง “Ask Early, Ask Late, Ask Right” ซึ่งเป็นอีกชุดข้อมูล: Sonnet 4.5 ถามใน 23% ของเซสชัน GPT-5.2 ใน 52% Gemini 3 Flash ใน 0% และไม่มีโมเดลใดถามในช่วงที่ดีที่สุด ราว 10% ของการรัน (arXiv 2605.07937)</b-why>
  <b-why align="left">สุดขั้วตรงข้ามก็มี ใน LHAW (arXiv 2602.10525) GPT-5.2 ถามใน 81–97% ของการรัน โดยได้ประโยชน์ต่อคำถามน้อย และใน “Ask or Assume” (arXiv 2603.26233) Sonnet 4.5 ถามใน 73.8% ของงาน คนเองก็รับภาระมากเกินไป: ตามข้อมูลของ Anthropic เกี่ยวกับ auto mode ผู้ใช้ยอมรับ 93% ของคำขออนุญาต และโพสต์พูดถึงความล้าจากการยืนยันโดยตรง<b-proof href="https://www.anthropic.com/engineering/claude-code-auto-mode" quote="Anthropic, 25.03.2026: „users accept 93%“ of permission requests"/></b-why>
  <b-art names="agent-escalation-to-human/ask-extremes" wide/>
  <b-cap>สองสุดขั้ว: เงียบและเดา หรือท่วมด้วยคำถาม</b-cap>
  <b-why align="left">สาเหตุ “การฝึกให้รางวัลกับการทำให้เสร็จ” ถูกเสนอโดยผู้เขียนหลายงาน แต่ไม่มีการวัดกับเอเจนต์ งานที่เกี่ยวข้องของ Kalai และคณะ (arXiv 2509.04664) แสดงว่าเมื่อให้คะแนนแบบสองค่า การงดตอบไม่คุ้ม และ 9 จาก 10 เกณฑ์ที่ตรวจเป็นแบบสองค่า รวมถึง SWE-bench งานนั้นว่าด้วยคำตอบ “ไม่ทราบ” การนำมาใช้กับคำถามถึงคนยังคงเป็นเพียงการเปรียบเทียบ</b-why>
  <b-finding>
    <ex>เอเจนต์ที่ไม่ได้รับอนุญาตให้ถามจะเงียบและเดา ส่วนเอเจนต์ที่ได้รับอนุญาตจะท่วมคนด้วยคำถาม ทั้งสองกรณีถูกบันทึกในการวัด จึงต้องกำหนดเงื่อนไข: เมื่อใดควรถามและถามบ่อยแค่ไหน</ex>
    <gen>“เอเจนต์ไม่ถาม” และ “เอเจนต์ถามมากเกินไป” เป็นจริงทั้งคู่ ในโมเดลและการตั้งค่าที่ต่างกัน</gen>
    <do>ให้เกณฑ์ที่ชัดแก่เอเจนต์: “ถามถ้าการตัดสินใจย้อนกลับไม่ได้หรือมีสองการตีความงานที่เท่ากัน ส่วนที่เหลือตัดสินเอง”</do>
  </b-finding>
</b-chapter>

<b-chapter id="mcp" icon="package" title="การตรวจ: MCP ว่าอย่างไรเกี่ยวกับ elicitation">
  <b-why align="left">Elicitation คือวิธีที่เซิร์ฟเวอร์ MCP ขอข้อมูลเพิ่มจากคนผ่านไคลเอนต์<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28/client/elicitation" quote="MCP specification: „The Model Context Protocol (MCP) provides a standardized way for servers to request additional information from users through the client during interactions.“"/> ด้านล่างคือข้อเท็จจริงของเวอร์ชัน 2026-07-28 และสิ่งที่เปลี่ยนไปในเวอร์ชันนั้น</b-why>
  <b-rules cols="2">
    <rule icon="check" t="คำตอบสามแบบ">Accept: คนอนุมัติและส่งข้อมูล Decline: คนปฏิเสธอย่างชัดเจนว่า “ไม่” Cancel: คนปิดหน้าต่างโดยไม่เลือก<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28/client/elicitation#response-actions" quote="MCP specification: „Decline (action: 'decline'): User explicitly declined the request“; „Cancel (action: 'cancel'): User dismissed without making an explicit choice“"/> เซิร์ฟเวอร์ต้องจัดการทั้ง decline และ cancel<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28/client/elicitation#error-handling" quote="MCP specification: „Servers SHOULD NOT assume that elicitation requests will always succeed, and MUST handle cases where the user declines or cancels the elicitation“"/></rule>
    <rule icon="layers" t="สองโหมด">Form: schema แบบแบนที่มีช่องง่าย ๆ ไคลเอนต์เห็นข้อมูล URL: พาคนไปยังที่อยู่ภายนอก และข้อมูลไม่ผ่านไคลเอนต์หรือโมเดล การขอรหัสผ่าน คีย์ และข้อมูลการชำระเงินผ่าน form ห้ามทำ และโหมด URL มีไว้สำหรับกรณีเหล่านี้<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28/client/elicitation#user-interaction-model" quote="MCP specification: „Servers MUST NOT use form mode elicitation to request sensitive information such as passwords, API keys, access tokens, or payment credentials.“"/></rule>
    <rule icon="refresh" t="ใหม่ใน 2026-07-28">เซิร์ฟเวอร์ไม่ส่งคำขอเองตามความริเริ่มอีกต่อไป: มันตอบคำขอของไคลเอนต์ด้วยผลลัพธ์ “input required” ไคลเอนต์เก็บคำตอบแล้วส่งคำขอซ้ำ<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28/basic/patterns/mrtr" quote="MCP specification: „Servers MUST send server-to-client requests (such as roots/list, sampling/createMessage, or elicitation/create) using the MRTR pattern. The previous pattern of server-initiated requests is no longer supported.“"/> Sampling, Roots และ Logging ถูกทำเครื่องหมายว่า deprecated (SEP-2577)</rule>
    <rule icon="user" t="Human in the loop">สำหรับ elicitation ไคลเอนต์ต้องแสดงว่าเซิร์ฟเวอร์ใดถาม เสนอ decline และ cancel และให้คนตรวจและแก้คำตอบใน form ได้ สำหรับการเรียกฟังก์ชันและ sampling ถ้อยคำอ่อนกว่า: “SHOULD always be a human in the loop”<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28/server/tools#user-interaction-model" quote="MCP specification: „For trust & safety and security, there SHOULD always be a human in the loop with the ability to deny tool invocations.“"/></rule>
  </b-rules>
  <b-why align="left">สองโหมดต่างกันเรื่องเดียว: ใครเห็นคำตอบของคน ภาพแสดงไว้</b-why>
  <b-art names="agent-escalation-to-human/elicit-modes" wide/>
  <b-cap>Form และ URL: ใครเห็นคำตอบของคน</b-cap>
  <b-why align="left">สิ่งที่สเปกไม่มี สเปกไม่อนุญาตและไม่ห้ามไคลเอนต์หรือเอเจนต์ตอบแทนคน: ทุกที่ใช้คำว่า “user” และไม่กำหนดส่วนติดต่อใด (“the protocol itself does not mandate any specific user interaction model”) ไม่มีบทลงโทษสำหรับการตอบอัตโนมัติเช่นนั้นเช่นกัน และสเปกเองก็ระบุไว้<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28" quote="MCP specification: „While MCP itself cannot enforce these security principles at the protocol level, implementors SHOULD: 1. Build robust consent and authorization flows into their applications“"/> คำว่า “bottleneck” หรือ “limitation” ไม่ปรากฏในสเปก</b-why>
  <b-finding>
    <ex>เซิร์ฟเวอร์ชำระเงินขอให้ยืนยันการโอน ถ้าไคลเอนต์กด “accept” เอง โปรโตคอลจะไม่รู้: การควบคุมอยู่ที่โฮสต์และการตั้งค่า</ex>
    <gen>MCP อธิบายวิธีถามและคำตอบที่มีได้ แต่ใครเป็นผู้ตอบ และตอบแทนคนได้หรือไม่ ไคลเอนต์เป็นผู้ตัดสิน</gen>
    <do>ตรวจไคลเอนต์ของตัวเอง: เอเจนต์หรือสคริปต์ตอบ elicitation แทนคนได้หรือไม่ ถ้าได้ ให้ห้ามสำหรับเซิร์ฟเวอร์ที่อันตราย</do>
  </b-finding>
</b-chapter>

<b-chapter id="cc" icon="shield-check" title="การตรวจ: mode, hook และคำถามถึงคนใน Claude Code">
  <b-art names="agent-escalation-to-human/hook-vs-text" wide/>
  <b-cap>Hook และกฎสิทธิ์โปรแกรมเป็นผู้บังคับใช้ ข้อความคำสั่งยังคงเป็นคำแนะนำ</b-cap>
  <b-why align="left">เอกสารของ Claude Code ระบุตรง ๆ: กฎสิทธิ์ถูกบังคับใช้โดยโปรแกรม Claude Code และคำสั่งใน prompt หรือ CLAUDE.md ไม่เปลี่ยนสิ่งที่โปรแกรมอนุญาต<b-proof href="https://code.claude.com/docs/en/permissions" quote="Claude Code docs: „Permission rules are enforced by Claude Code, not by the model. Instructions in your prompt or CLAUDE.md shape what Claude tries to do, but they don't change what Claude Code allows.“"/></b-why>
  <b-subhead>Mode: มีกี่คำถามที่ไปถึงคน</b-subhead>
  <b-why align="left">คนเลือก mode ตอนเริ่ม: มันกำหนดว่ามีกี่คำถามที่ไปถึงเขาเลย</b-why>
  <b-art names="agent-escalation-to-human/modes-ladder" wide/>
  <b-cap>หกโหมดตั้งแต่ “ถามทุกอย่าง” ถึง “ไม่ถามอะไรเลย” และสิ่งที่ไม่ได้รับอนุมัติอัตโนมัติ</b-cap>
  <b-why align="left">แม้ในโหมดที่อิสระที่สุดบางอย่างก็ไม่ถูกอนุมัติอัตโนมัติ: ฟังก์ชัน AskUserQuestion ที่มีในตัว ฟังก์ชัน MCP ที่ทำเครื่องหมายว่าต้องมีปฏิสัมพันธ์กับผู้ใช้ และกฎ “ask”<b-proof href="https://code.claude.com/docs/en/permission-modes" quote="Claude Code docs: „Claude Code doesn't auto-approve the following in any mode, including `bypassPermissions`“ — among them explicit `ask` rules and „Tools that require user interaction: the built-in `AskUserQuestion` tool and MCP tools marked `requiresUserInteraction`“"/> ขออนุญาตจากคนย้อนหลังไม่ได้: ไม่มีคนก็ไม่มีคำตอบ</b-why>
  <b-subhead>Hook: ตัดสินว่าจะถามหรือไม่</b-subhead>
  <b-why align="left">hook PreToolUse ตอบก่อนการเรียกฟังก์ชันด้วยหนึ่งในสี่การตัดสิน: allow, deny, ask หรือ defer<b-proof href="https://code.claude.com/docs/en/hooks" quote="Claude Code docs: „PreToolUse hooks can control whether a tool call proceeds. [...] four outcomes (allow, deny, ask, or defer)“"/> เมื่อมีหลาย hook ลำดับคือ: deny ชนะ defer, defer ชนะ ask, ask ชนะ allow การตัดสิน “defer” มีไว้สำหรับการรันที่ไม่มีส่วนติดต่อผู้ใช้: โปรแกรมที่เรียกหยุด Claude รวบรวมคำตอบผ่านส่วนติดต่อของตัวเอง แล้วเริ่มต่อจากจุดเดิม hook Elicitation เชื่อมสิ่งนี้กับ MCP: มันตอบคำขอของเซิร์ฟเวอร์ด้วย accept, decline หรือ cancel และเมื่อไม่มีส่วนติดต่อผู้ใช้ คำขอที่ไม่มีใครจัดการจะถูก cancel</b-why>
  <b-why align="left">ข้อจำกัดสำหรับ subagent: AskUserQuestion ถูกถอดออกจากพวกมันเสมอ ในการรันที่ไม่มีส่วนติดต่อผู้ใช้ การเรียกที่ต้องมีคำถามจะถูกปฏิเสธ เว้นแต่มีกฎ allow, hook หรือโฮสต์สำหรับคำขอ ดังนั้นการรันอัตโนมัติที่ไม่ได้ตั้งกฎจะได้รับการปฏิเสธ และคำตอบจากคนจะไม่มา</b-why>
  <b-art names="agent-escalation-to-human/night-run" wide/>
  <b-cap>เมื่อไม่มีคน คำถามกลายเป็นรายงานที่ประตูปิด</b-cap>
  <b-why align="left">นี่คือหน้าตาของ escalation เมื่อไม่มีคน: การหยุดและเหตุผลที่บันทึกไว้ แทนการเดา</b-why>
  <b-finding>
    <ex>การรันกลางคืนบนเซิร์ฟเวอร์ build เอเจนต์ต้องการปล่อย build และไม่มีใครให้ถาม ในโหมด dontAsk การเรียกถูกปฏิเสธ เอเจนต์เขียนรายงานสิ่งที่ติดขัด และตอนเช้าคนเห็นรายงานนั้น แทนที่จะเป็นทางเลี่ยงที่เงียบ ๆ</ex>
    <gen>ในการรันอัตโนมัติ escalation เปลี่ยนจากคำถามเป็นรายงานสิ่งที่ติดขัด: เอเจนต์หยุด บันทึกเหตุผล และรอ</gen>
    <do>สำหรับการรันกลางคืน ตั้งกฎ “deny” ที่ชัดเจนสำหรับการกระทำอันตราย และให้เอเจนต์เขียนไฟล์สิ่งที่ติดขัด แทนการเดาแบบเงียบ ๆ</do>
  </b-finding>
</b-chapter>

<b-chapter id="narrow" icon="workflow" title="ผลที่ได้: ทำไมจุดตรวจและ escalation ใส่ใน MCP ทั้งหมดไม่ได้">
  <b-why align="left">โฮสต์เก็บบทสนทนาทั้งหมด และเซิร์ฟเวอร์ได้รับเฉพาะสิ่งที่ต้องใช้ ในสเปกนี่คือหลักสถาปัตยกรรมข้อที่สาม<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28" quote="MCP specification: „Servers should not be able to read the whole conversation, nor 'see into' other servers.“ / „Full conversation history stays with the host“"/> เซิร์ฟเวอร์ในเครื่องรันด้วยสิทธิ์ของไคลเอนต์<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28/basic/security_best_practices#local-mcp-server-compromise" quote="MCP specification: „MCP servers run with the same privileges as the client“"/> จากนี้ได้ข้อสรุปที่ผู้เขียนสรุปเอง: คำขอและคำตอบผ่าน MCP ส่วนที่เหลืออยู่ฝั่งโฮสต์</b-why>
  <b-art names="agent-escalation-to-human/barrier-intercom" wide/>
  <b-cap>โฮสต์ตั้งไม้กั้น MCP ให้อินเตอร์คอม ทางเลี่ยงคือการตอบแทนคน</b-cap>
  <b-why align="left">สิ่งที่ผ่าน MCP จริง ๆ และสิ่งที่อยู่ฝั่งโฮสต์ แสดงไว้ด้านล่าง</b-why>
  <b-rules cols="2">
    <rule icon="package" t="ผ่าน MCP">การเรียกฟังก์ชัน ผลลัพธ์ตาม schema คำขอข้อมูลจากคน สิทธิ์ของเซิร์ฟเวอร์</rule>
    <rule icon="shield-check" t="นอก MCP">hook ของไคลเอนต์ permission mode sandbox ประวัติบทสนทนา บทสนทนาของคนเองกับเอเจนต์</rule>
  </b-rules>
  <b-why align="left">ดังนั้นส่วนหนึ่งของจุดตรวจอยู่ใน MCP: คำขอถึงคน สิทธิ์ schema ของผลลัพธ์ อีกส่วนอยู่ในโฮสต์: hook และ mode การตัดสินใจ “ถาม” หนึ่งเดียวประกอบจากสองส่วน และถ้าเหลือเพียง MCP กฎตั้งต้นจะชนกับข้อเท็จจริงว่าไคลเอนต์ตอบแทนคนได้ นี่คือช่องแคบ: คำถามผ่านได้ แต่การตัดสินว่า “จะถามเลยหรือไม่” เกิดข้างนอก</b-why>
  <b-finding>
    <ex>เซิร์ฟเวอร์ MCP ถามคนเรื่องการโอนเงินได้ ไคลเอนต์จะแสดงคำถามหรือตอบเอง ขึ้นกับไคลเอนต์และ hook ของมัน</ex>
    <gen>จุดตรวจและ escalation ประกอบจากสองที่: ช่องใน MCP และกฎในโฮสต์ ขาดอย่างใดอย่างหนึ่งก็เกิดช่องโหว่</gen>
    <do>สำหรับทุกการดำเนินการที่อันตราย ตรวจทั้งสองฝั่ง: เซิร์ฟเวอร์ถามได้ และไคลเอนต์ตอบแทนคนไม่ได้</do>
  </b-finding>
</b-chapter>

<b-chapter id="claims" icon="target" title="สิ่งที่คาดและสิ่งที่พบ">
  <b-why align="left">สมมติฐานสี่ข้อจากตอนต้น ตรวจกับข้อความของเอกสารและงานวิจัยเอง สิ่งที่เปิดหรือตรวจไม่ได้ครบถ้วนมีการทำเครื่องหมายไว้</b-why>
  <b-art names="agent-escalation-to-human/thesis-check" wide/>
  <b-cap>ข้อสรุปของสมมติฐานทั้งสี่ข้อ</b-cap>
  <b-why align="left">รายละเอียดอยู่ในตาราง: สิ่งที่คาด ผลลัพธ์ และสิ่งที่พบ</b-why>
  <b-table>

| ภาพแรกที่เห็น | ผลลัพธ์ | สิ่งที่พบ |
|---|---|---|
| **จุดตรวจอยู่นอกบริบทของเอเจนต์** | <b-status-dot color="accent">ใช่</b-status-dot> | ผู้ตัดสินในลูปได้ 86.7 เทียบกับ 113.0 สำหรับการตรวจจากข้างนอก (arXiv 2607.25152, การทดลองนำร่อง) ใน Claude Code เอกสารเองแยกข้อความคำสั่งออกจากกฎที่โปรแกรมบังคับใช้ |
| **เอเจนต์ถูกฝึกและถูกวัดตามเวลารันอัตโนมัติ** | <b-status-dot color="accent">บางส่วน</b-status-dot> | METR วัด horizon ของงาน: 16–20 ชั่วโมงที่อัตราสำเร็จ 50% สำหรับโมเดลร่วมที่ดีที่สุด Anthropic และ Google DeepMind ฝึกเพื่อ horizon ยาวอย่างไรกันแน่ ไม่พบในเอกสารสาธารณะ |
| **สำหรับเมตริก คำถามถึงคนคือความสูญเสีย จึงถามแล้วไม่คุ้ม** (บทลงโทษ: 0 สำหรับงานที่แก้ไม่ได้ และรอบที่ถูกตัด) | <b-status-dot color="warn">ไม่</b-status-dot> | เกณฑ์แบบดั้งเดิมไม่มีช่องทางถึงคน และการหยุดโดยไม่มีคำตอบนับเป็นความล้มเหลว ใน tau-bench การส่งต่อให้คนโดยไม่จำเป็นได้ 0 เมตริกที่นับคำถามนั้นให้รางวัล (HiL-Bench) หรือถือเป็นกลาง (HAS-Bench) ไม่พบถ้อยคำแบบ “คำถามคือความสูญเสีย” ไม่มีการวัด “ก่อนและหลังการฝึกเพื่อให้เสร็จ” |
| **MCP เป็นคอขวด** | <b-status-dot color="warn">ในแง่ความหมาย</b-status-dot> | ไม่มีคำอ้างอิงตรง ๆ: สเปกไม่มีถ้อยคำแบบ “bottleneck” แต่ระบุว่าตัวโปรโตคอลบังคับหลักความปลอดภัยเองไม่ได้ และโฮสต์เป็นผู้จัดการการแยกส่วน |

  </b-table>
  <b-why align="left">ตารางให้ผลเดียว: สมมติฐานเรื่องการลงโทษคำถามเป็นข้อเดียวที่แหล่งอ้างอิงไม่รองรับ และมันเป็นสิ่งที่ยึดห่วงโซ่ทั้งหมดไว้</b-why>
  <b-finding>
    <ex>สมมติฐานเรื่องการลงโทษคำถามดูน่าเชื่อ แต่กรณีจริงเพียงกรณีเดียวที่พบคือเกณฑ์ที่ไม่มีช่องทางถึงคน ซึ่งเป็นอีกเรื่อง: ถามไม่ได้ที่นั่น จึงไม่มีอะไรให้ลงโทษ</ex>
    <gen>ถ้าเมตริกไม่ได้กำหนดเรื่องคำถาม การฝึกด้วยเมตริกนั้นไม่สอนให้ถาม นี่เป็นผลจากวิธีสร้างเมตริก และไม่มีหลักฐานตรงว่ามีผลต่อพฤติกรรม</gen>
    <do>ก่อนสรุปว่าทำไมเอเจนต์จึงทำตัวแบบหนึ่ง ให้หาการวัด: เอเจนต์ตัวเดียวกันเทียบก่อนและหลังการฝึก ถ้าไม่มี ก็เป็นเพียงสมมติฐาน</do>
  </b-finding>
</b-chapter>

<b-chapter id="start" icon="flag" title="วิธีเริ่ม: สี่ขั้นตอนและ prompt สำเร็จรูปสำหรับเอเจนต์">
  <b-why align="left">ขั้นตอนเรียงจากถูกไปละเอียด สองขั้นแรกพอให้ escalation ไม่ขึ้นกับอารมณ์ของเอเจนต์</b-why>
  <b-rules cols="2">
    <rule icon="checklist" t="1. รายการที่ต้องหยุด">เขียนในไฟล์ว่าการกระทำใดที่เอเจนต์ต้องหยุดและถาม</rule>
    <rule icon="shield-check" t="2. กฎและ hook">ใส่การกระทำอันตรายใน “deny” หรือ “ask” ผ่านสิทธิ์และ hook PreToolUse</rule>
    <rule icon="package" t="3. สิทธิ์บนเซิร์ฟเวอร์ MCP">มอบฟังก์ชันอันตรายเฉพาะพร้อม scope ที่จำเป็น</rule>
    <rule icon="clock" t="4. บันทึกคำถาม">นับว่าเอเจนต์ถามกี่ครั้ง ถามโดยไม่จำเป็นกี่ครั้ง และเงียบกี่ครั้งทั้งที่ควรถาม</rule>
  </b-rules>
  <b-why align="left">prompt แรกรวบรวมรายการที่ต้องหยุด: นี่คือขั้นที่ 1</b-why>
  <b-prompt>
    สร้างไฟล์ escalation.md ที่ระบุกรณีที่เอเจนต์ต้องหยุดและถามฉัน: การกระทำที่ย้อนกลับไม่ได้
    การปล่อยเวอร์ชัน การเปลี่ยนสิทธิ์ และงานที่ตีความได้สองแบบเท่ากัน แต่ละกรณีให้เขียนว่าจะถามคำถามใดและคำตอบแบบใดนับเป็นการยินยอม
    ส่วนที่เหลือเอเจนต์ตัดสินเอง
  </b-prompt>
  <b-why align="left">prompt ที่สองเปลี่ยนรายการเป็นกฎ hook: นี่คือขั้นที่ 2</b-why>
  <b-prompt>
    ตั้งค่า hook PreToolUse ใน .claude/settings.json: สำหรับคำสั่งจาก escalation.md ให้ตอบ “ask” และสำหรับคำสั่งที่อันตรายชัดเจนให้ตอบ “deny”
    พร้อมเหตุผลที่เอเจนต์จะเห็น แสดงไฟล์สุดท้ายและตัวอย่างการเรียกที่ทำให้ hook ทำงาน
  </b-prompt>
  <b-why align="left">prompt ที่สามตรวจว่าไคลเอนต์ตอบแทนคนได้หรือไม่: นี่คือขั้นที่ 3</b-why>
  <b-prompt>
    ตรวจไคลเอนต์ MCP ของฉัน: เอเจนต์หรือสคริปต์ตอบคำขอข้อมูลจากคนแทนฉันได้หรือไม่ ถ้าได้ ให้เสนอการตั้งค่า
    ที่ป้องกันเรื่องนี้สำหรับเซิร์ฟเวอร์ที่มีฟังก์ชันอันตราย
  </b-prompt>
  <b-why align="left">หลังสองขั้นแรกจะเป็นแบบนี้</b-why>
  <b-finding>
    <ex>หนึ่งสัปดาห์ต่อมาบันทึกแสดงว่า จากสิบคำถาม แปดคำถามเป็นเรื่องการเปลี่ยนชื่อไฟล์ รายการที่ต้องหยุดถูกลดเหลือเฉพาะการกระทำที่ย้อนกลับไม่ได้ และคำถามลดเหลือวันละสองข้อ</ex>
    <gen>Escalation ปรับด้วยบันทึก: คำถามมากเกินไปกินความสนใจของคน คำถามน้อยเกินไปทิ้งการเดาของเอเจนต์ไว้</gen>
    <do>ทำขั้นที่ 1 และ 2 กับงานหนึ่งงานวันนี้ และเริ่มบันทึกในอีกหนึ่งสัปดาห์จากคำถามจริง</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="คำถามที่พบบ่อย">
  <b-faq-cards>
    <q t="การส่งต่อให้คนตัดสินใจ (escalation to a human) ในเอเจนต์ AI คืออะไร">การหยุดที่เอเจนต์หรือโปรแกรมรอบตัวเอเจนต์ส่งการตัดสินใจให้คน ด้วยคำถาม คำขออนุญาต หรือการขอให้ยืนยัน กฎและ hook ตัดสินว่า “ถาม” และคนให้คำตอบ</q>
    <q t="Elicitation ใน MCP คืออะไร">วิธีที่เซิร์ฟเวอร์ MCP ขอให้คนให้ข้อมูลผ่านไคลเอนต์ มีคำตอบสามแบบ: accept, decline และ cancel การขอรหัสผ่านและคีย์ใน form ห้ามทำ และมีโหมดที่อยู่ภายนอกสำหรับกรณีเหล่านั้น</q>
    <q t="เมตริกความเป็นอิสระลงโทษเอเจนต์ที่ถามคนหรือไม่">บทลงโทษมาจากผลลัพธ์ที่ยังไม่เสร็จ: 0 แทน 1 และที่ Anthropic คำถามตัดรอบ ไม่พบการหักคะแนนเพราะตัวคำถามเอง เกณฑ์แบบดั้งเดิมไม่มีช่องทางถึงคนเท่านั้น HiL-Bench ล่าสุดและงานของ Anthropic ให้รางวัลคำถามหรือถือเป็นการกำกับดูแล และ HAS-Bench ถือเป็นกลาง</q>
    <q t="ใส่จุดตรวจและ escalation ใน MCP ทั้งหมดได้หรือไม่">ไม่ได้ MCP นำคำถามและคำตอบ ส่วนการตัดสินว่าจะแสดงคำถามให้คนหรือตอบอัตโนมัติ โฮสต์เป็นผู้ตัดสิน: hook, permission mode และไคลเอนต์ ตัวโปรโตคอลบังคับการตัดสินนั้นเองไม่ได้</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="อ่านต่อ">
  <b-links>
    <item href="/blog/quality-gates-ai-agents/" k="จุดตรวจ" t="จุดตรวจคุณภาพสำหรับเอเจนต์ AI คืออะไร">จุดรับงานที่บอกว่า “เสร็จแล้ว”</item>
    <item href="/blog/agent-checkpoint/" k="การตรวจ" t="ควรวางการตรวจงานของเอเจนต์ไว้ที่ไหน">ขอบเขต aggregate และทฤษฎีบทของไรซ์</item>
    <item href="/blog/mcp-agent-access/" k="MCP" t="MCP สำหรับเอเจนต์ AI">แก้ปัญหาอะไรและเชื่อมต่ออย่างไร</item>
    <item href="/blog/mcp-scopes/" k="MCP" t="MCP scope ใน Claude Code">local, project และ user</item>
    <item href="/blog/harness-driven-development/" k="Harness" t="Harness engineering ในทางปฏิบัติ">guide, sensor และลูป “ข้อผิดพลาด — กฎ”</item>
    <item href="/blog/ai-agent-maturity-levels/" k="ความเป็นผู้ใหญ่" t="ระดับความเป็นผู้ใหญ่ของเอเจนต์ AI">จากแชตสู่ spec, skill, โค้ด และระบบ</item>
  </b-links>
</b-chapter>
<b-footer>ข้อเท็จจริง: ณ วันที่ 14 พฤศจิกายน 2026 จากเอกสารและงานวิจัยที่ลิงก์ด้วยเครื่องหมาย ↗ หน้า openai.com และโพสต์โซเชียลของ METR เปิดไม่ได้ จึงไม่ใช้ตัวเลขของ OpenAI เรื่องสัดส่วนงานที่ไม่มีการแทรกแซงในที่นี้ คำอ้างอิงบางส่วนเกี่ยวกับคำถามของเอเจนต์และเกี่ยวกับ METR ตรวจผ่านสรุปของหน้า ควรตรวจกับต้นฉบับก่อนอ้างอิง ตัวอย่างที่มี config เซิร์ฟเวอร์ชำระเงิน และการรันกลางคืนเป็นตัวอย่างสมมติ</b-footer>
</b-post>
