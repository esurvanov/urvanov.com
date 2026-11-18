---
title: Codex หรือ ChatGPT: เลือกอะไรสำหรับทำงานกับโค้ด
seoTitle: Codex หรือ ChatGPT: เลือกอะไรสำหรับโค้ด (2026)
date: 2026-11-17
updated: 2026-11-18
description: แชตตอบเป็นข้อความ ส่วนเอเจนต์ Codex แก้โปรเจกต์และรันเทสต์เอง ดูว่าแต่ละแบบเหมาะกับงานไหน พร้อมตารางเทียบ แพ็กเกจ คำสั่งสำเร็จรูป และคำถามที่พบบ่อย
tags: AI, Codex, ChatGPT, เอเจนต์, harness, Claude Code, Cursor
category: harness
layout: wide
mentions: Codex, ChatGPT, Claude Code, Cursor, AGENTS.md
toc: answer=คำตอบสั้น | modes=สามโหมด | table=เทียบกัน | plans=แพ็กเกจและขีดจำกัด | pick=เลือกอะไรเมื่อไร | start=เริ่มอย่างไร | faq=คำถาม | next=อ่านต่อ
---

Codex หรือ ChatGPT เลือกอะไรขึ้นอยู่กับงาน ChatGPT ตอบเป็นข้อความ คืออธิบาย ร่างงาน และอ่านโค้ดที่คุณวางให้ ส่วน Codex ทำงานในตัวโปรเจกต์ คืออ่านโค้ด แก้ไฟล์ รันเทสต์ และเตรียมพูลรีเควสต์ ถ้าอยากถามให้ใช้แชต ถ้าจะแก้รีโพซิทอรีให้ใช้ Codex ซึ่งรวมอยู่ในแพ็กเกจ ChatGPT โดยไม่ต้องจ่ายแยก

<b-post series="prompts">
<b-chapter id="answer" title="คำตอบสั้น" icon="crosshair">
  <b-why>ในหน้าช่วยเหลือของ OpenAI ChatGPT แบ่งเป็นโหมด Chat, Work และ Codex โดยเลือก Codex เมื่อต้องการมุมมองสำหรับนักพัฒนาหรือรายละเอียดทางเทคนิค<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: “Select Codex when you want developer views or more technical detail, especially for software development” — learn.chatgpt.com/docs/use-chatgpt"/></b-why>

  <iso-art name="codex-or-chatgpt-what-to-choose/chat-vs-agent"></iso-art>
  <b-cap>ซ้ายคือแชต: คุณวางโค้ด ได้ข้อความกลับมา แล้วย้ายไปใส่เองด้วยมือ ขวาคือเอเจนต์: เปิดโปรเจกต์ แก้ และตรวจผลเอง</b-cap>
  <b-sublabel top="18">พูดให้เข้าใจง่ายคืออะไร</b-sublabel>

  ChatGPT คือแอปของ OpenAI ที่ให้คุณคุยกับโมเดลได้สามโหมด คือ Chat, Work และ Codex แชตเห็นเฉพาะสิ่งที่คุณวางเข้าไป และตอบเป็นข้อความ เอเจนต์สำหรับโปรแกรม ซึ่ง Codex เป็นแบบนั้นพอดี จะเปิดไฟล์ของโปรเจกต์เอง แก้ไข แล้วตรวจผลด้วยคำสั่ง พูลรีเควสต์คือข้อเสนอให้นำการแก้ไขเข้าสู่สาขาหลักของโปรเจกต์ เพื่อนร่วมทีมจะดูแล้วรับหรือส่งกลับให้แก้ โมเดลในทุกโหมดมาจากตระกูล GPT ดังนั้นการเลือกจึงขึ้นกับว่าเข้าถึงโปรเจกต์ได้หรือไม่ และคุณอยากได้อะไรเป็นผลลัพธ์

  ตัวอย่างในชีวิตประจำวัน ติมูร์อาศัยอยู่ในอัลมาตีและดูแลร้านค้าออนไลน์ ตอนเช้าเขาวางฟังก์ชันที่ไม่คุ้นลงในแชตและถามว่าคำนวณส่วนลดอย่างไร คำตอบมาเป็นข้อความ และแค่นั้นก็พอ ตอนบ่ายเขาต้องแก้เทสต์ที่ล้ม เขาเปิด Codex บอกชื่อเทสต์ และขอให้รันการตรวจสอบทั้งหมดหลังแก้ เอเจนต์หาไฟล์เจอ แก้ รันเทสต์ และแสดงรายการสิ่งที่เปลี่ยน คำถามหนึ่งข้อ การแก้หนึ่งจุด รวมเป็นสองโหมดในวันเดียว

  ข้อผิดพลาดที่พบบ่อยคือขอให้แชตแก้รีโพซิทอรี แชตส่งโค้ดชิ้นหนึ่งกลับมา แต่คุณยังต้องวางลงในไฟล์ที่ถูกต้องและรันเทสต์เอง ถ้าคุณพบว่าตัวเองย้ายคำตอบเข้าโปรเจกต์ด้วยมือซ้ำแล้วซ้ำอีก งานนั้นเหมาะกับ Codex ข้อผิดพลาดด้านตรงข้ามคือเปิดเอเจนต์เพื่อถามว่า "อันนี้ทำงานอย่างไร" การอธิบายใช้แชตก็พอ และไม่ต้องแก้อะไรในโปรเจกต์

  ตรวจการเลือกได้ด้วยคำถามเดียวกับตัวเอง หลังได้คำตอบแล้ว ฉันต้องแก้ไฟล์และรันอะไรต่อหรือไม่ ถ้าต้อง ให้ใช้ Codex ถ้าต้องการแค่คำตอบ ให้ใช้แชต
</b-chapter>
<b-chapter id="modes" title="ChatGPT สามโหมด" icon="layers">
  <b-why>หน้าช่วยเหลือของ OpenAI อธิบายแต่ละโหมดในบรรทัดเดียว คือ Chat สำหรับคำถามหรือการคุยโต้ตอบ Work สำหรับงานใหญ่ที่ทำจนได้ผลลัพธ์ที่ตรวจได้ และ Codex สำหรับการพัฒนา<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: “Use Chat for a question or back-and-forth” — learn.chatgpt.com/docs/use-chatgpt"/></b-why>

  โหมดคือวิธีทำงานกับโมเดลตัวเดียวกัน ซึ่งกำหนดว่าคุณจะได้อะไรเป็นผลลัพธ์ และ ChatGPT จะได้สิทธิ์เข้าถึงอะไร ทั้งสามโหมดอยู่ในแอปเดียวและใช้การสมัครสมาชิกร่วมกัน
  <iso-art name="codex-or-chatgpt-what-to-choose/three-modes"></iso-art>
  <b-cap>แต่ละโหมดให้อะไร: Chat ให้ข้อความ Work ให้เอกสารหรือตารางที่เสร็จแล้ว Codex ให้การแก้โค้ด ผลเทสต์ และพูลรีเควสต์</b-cap>
  <b-sublabel top="18">หนึ่งวัน สามโหมด</b-sublabel>

  นาเดียอาศัยอยู่ในเบอร์ลินและดูแลบริการจองคิวขนาดเล็ก ในวันเดียวเธอต้องใช้ครบสามโหมด ตอนเช้าเธอถามว่าการเก็บเวลาในฐานข้อมูลสองวิธีต่างกันอย่างไร นั่นคือ Chat ตอนบ่ายเธอต้องการสรุปงานเดือนนี้ให้ลูกค้า เธอเปิด Work และได้เอกสารที่เสร็จแล้ว ตอนเย็นเธอต้องแก้การคำนวณความยาวของการนัดและตรวจด้วยเทสต์ นั่นคือ Codex นาเดียเลือกแต่ละโหมดโดยดูจากผลลัพธ์ที่เธออยากได้

  <b-sublabel top="18">Chat: คำถามและการสนทนา</b-sublabel>

  Chat คือโหมดสำหรับคำถามหรือการคุยที่ย้อนกลับไปมาได้ หน้าช่วยเหลือของ OpenAI ยกตัวอย่างไว้ คือไอเดีย ร่างงาน และสรุปไฟล์ งานกับโค้ดก็เหมาะ ถ้าต้องการเข้าใจโค้ดชิ้นหนึ่งหรือข้อผิดพลาด คุณวางข้อความแล้วได้คำอธิบาย ผลลัพธ์เป็นข้อความเสมอ ตัวอย่าง นาเดียวางข้อความผิดพลาดจากล็อกและถามว่าหมายความว่าอะไร

  <b-sublabel top="18">Work: งานใหญ่จนได้ผลลัพธ์</b-sublabel>

  ในโหมด Work ChatGPT รับงานใหญ่และทำไปจนได้ผลลัพธ์ที่ตรวจได้ คุณเปิดโหมดนี้ได้ที่ตัวสลับ ผลลัพธ์คือเอกสาร ตาราง หรืองานวิจัยที่เสร็จแล้ว บนเว็บมันทำงานในคลาวด์ที่มีการจัดการ<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: “ChatGPT Work runs in a managed cloud environment” — learn.chatgpt.com/docs/use-chatgpt"/> ตัวอย่าง นาเดียขอสรุปสำหรับลูกค้าและได้เอกสารที่เหลือแค่อ่านแล้วส่ง

  <b-sublabel top="18">Codex: แก้ในโปรเจกต์</b-sublabel>

  Codex คือโหมดสำหรับการพัฒนา มีรายละเอียดทางเทคนิคและมุมมองแบบวิศวกร มันอ่านรีโพซิทอรีเอง แก้ไฟล์ รันเทสต์ และเตรียมพูลรีเควสต์ ถ้าอยากดูแผนภาพของแนวคิดนี้ มีอยู่ในอภิธานศัพท์
  <iso-art name="term:codex"></iso-art>

  ตัวอย่าง นาเดียบอกชื่อเทสต์ที่ล้มและจำกัดการแก้ไว้ในโฟลเดอร์เดียว ไม่กี่นาทีต่อมาเธอมีรายการสิ่งที่เปลี่ยนและผลการรัน ข้อจำกัดตามภูมิภาคของ Codex ไม่ได้อธิบายในบทความนี้ เรื่องนั้นมี<a href="/blog/codex-access-regions-vpn-bans/">บทความแยกเรื่องการเข้าถึง Codex</a>

  <b-sublabel top="18">แต่ละโหมดเปิดได้ที่ไหน</b-sublabel>

  Chat เปิดได้บนเว็บไซต์และในแอปมือถือ<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: Chat is available on the web and mobile — learn.chatgpt.com/docs/use-chatgpt"/> Work ทำงานบนเว็บไซต์ในคลาวด์ที่มีการจัดการ และในแอปบนคอมพิวเตอร์ Codex เลือกในแอปบนคอมพิวเตอร์ OpenAI ระบุเทอร์มินัล ส่วนขยายสำหรับ IDE และคลาวด์ไว้เป็นที่ใช้ Codex<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: Codex is selected in the desktop app; places include CLI, IDE extension, Cloud — learn.chatgpt.com/docs/use-chatgpt"/> เครื่องหมายขีดในแผนภาพหมายความว่าหน้าช่วยเหลือไม่ได้ระบุที่แบบนั้นสำหรับโหมดนั้น
  <iso-art name="codex-or-chatgpt-what-to-choose/where-to-open"></iso-art>
  <b-cap>ที่ที่แต่ละโหมดเปิดได้ เทอร์มินัลและส่วนขยายสำหรับ IDE ระบุไว้เฉพาะ Codex</b-cap>
</b-chapter>
<b-chapter id="table" title="Codex และ ChatGPT เทียบกัน" icon="table-grid">
  <b-why>แต่ละแถวมาจากหน้าช่วยเหลือของ OpenAI เรื่องโหมดและแพ็กเกจ แหล่งที่มาอยู่ติดกับข้อความ วันที่ตรวจสอบ: 18.11.2026</b-why>

  ดาวิดอาศัยอยู่ในทบิลิซีและกำลังเลือกว่าจะเริ่มจากอะไรในทีมสามคน เขาใช้ตารางสรุปเป็นบันทึกช่วยจำ ไล่ดูแถว "ใช้ทำอะไร" "ผลลัพธ์" และ "เห็นโปรเจกต์ไหม" แล้วเห็นทันทีว่าแชตแทนเอเจนต์ในรีโพซิทอรีไม่ได้ ตรวจตารางเองได้จากสองหน้าของ OpenAI คือหน้าช่วยเหลือเรื่องโหมดและหน้าช่วยเหลือเรื่องแพ็กเกจ
  <b-sublabel top="18">Codex ทำงานอย่างไร</b-sublabel>

  การทำงานของ Codex เป็นวงรอบหลายขั้นตอน เอเจนต์อ่านโปรเจกต์ แก้ไฟล์ รันเทสต์ และแสดง diff คือรายการสิ่งที่เปลี่ยนทีละบรรทัด ถ้าเทสต์ล้ม มันกลับไปแก้ใหม่ ผลลัพธ์คือพูลรีเควสต์ที่คนเป็นผู้ตรวจ เอเจนต์อ่านคำแนะนำของโปรเจกต์จากไฟล์ AGENTS.md ควรเขียนคำสั่งสร้างและข้อห้ามไว้ที่นั่น
  <iso-art name="codex-or-chatgpt-what-to-choose/codex-loop"></iso-art>
  <b-cap>วงรอบของ Codex: อ่าน แก้ รันเทสต์ และแก้ใหม่เมื่อล้ม คนตรวจ diff และพูลรีเควสต์</b-cap>
  <b-sublabel top="18">ตารางสรุป</b-sublabel>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th></th><th>ChatGPT Chat</th><th>ChatGPT Work</th><th>Codex</th></tr>
    </thead>
    <tbody>
      <tr><td>ใช้ทำอะไร</td><td>คำถามหรือการคุยโต้ตอบ: ไอเดีย ร่างงาน สรุปไฟล์<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: “Use Chat for a question or back-and-forth” — learn.chatgpt.com/docs/use-chatgpt"/></td><td>งานใหญ่ที่ทำจนได้ผลลัพธ์ที่ตรวจได้<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: “carry a larger task through to a reviewable result” — learn.chatgpt.com/docs/use-chatgpt"/></td><td>การพัฒนา: รายละเอียดทางเทคนิคและมุมมองแบบวิศวกร<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: Codex is the mode for technical detail in the mode table — learn.chatgpt.com/docs/use-chatgpt"/></td></tr>
      <tr><td>ผลลัพธ์</td><td>ข้อความ</td><td>งานที่เสร็จแล้ว: เอกสาร ตาราง งานวิจัย</td><td>การแก้โค้ด ผลเทสต์ พูลรีเควสต์</td></tr>
      <tr><td>เห็นโปรเจกต์ไหม</td><td>เฉพาะสิ่งที่วางเข้าไป</td><td>สิ่งที่คุณเปิดสิทธิ์ให้</td><td>อ่านรีโพซิทอรีเอง</td></tr>
      <tr><td>เปิดที่ไหน</td><td>เว็บไซต์และแอปมือถือ<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: Chat is available on the web and mobile — learn.chatgpt.com/docs/use-chatgpt"/></td><td>เว็บไซต์และแอปบนคอมพิวเตอร์ บนเว็บทำงานในคลาวด์ที่มีการจัดการ<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: “ChatGPT Work runs in a managed cloud environment” — learn.chatgpt.com/docs/use-chatgpt"/></td><td>แอปบนคอมพิวเตอร์ เทอร์มินัล ส่วนขยายสำหรับ IDE คลาวด์<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: Codex is selected in the desktop app; places include CLI, IDE extension, Cloud — learn.chatgpt.com/docs/use-chatgpt"/></td></tr>
      <tr><td>แพ็กเกจ</td><td colspan="3">Work และ Codex รวมอยู่ใน Free, Go, Plus, Pro, Business, Edu และ Enterprise ไม่มีค่าใช้จ่ายแยก<b-proof href="https://learn.chatgpt.com/docs/pricing" quote="OpenAI: “ChatGPT Work and Codex are included in your ChatGPT Free, Go, Plus, Pro, Business, Edu, or Enterprise plan” — learn.chatgpt.com/docs/pricing"/></td></tr>
      <tr><td>ขีดจำกัด</td><td colspan="3">ขึ้นกับแพ็กเกจ บน Free และ Go Codex ออกแบบไว้สำหรับงานเบา ส่วน Plus ราคา 20 ดอลลาร์ต่อเดือน<b-proof href="https://learn.chatgpt.com/docs/pricing" quote="OpenAI: Free — quick coding tasks, Go — lightweight tasks, Plus — $20/month — learn.chatgpt.com/docs/pricing"/></td></tr>
      <tr><td>ผ่านคีย์ API</td><td>—</td><td>—</td><td>เทอร์มินัล SDK และ IDE คิดเงินตามอัตรา API ฟังก์ชันบนคลาวด์ เช่น การตรวจโค้ดบน GitHub ไม่รวมอยู่ด้วย<b-proof href="https://learn.chatgpt.com/docs/pricing" quote="OpenAI: an API key lets you use Codex in the CLI, SDK or IDE at API rates; cloud features not included — learn.chatgpt.com/docs/pricing"/></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>โมเดลของทั้งสามโหมดมาจากตระกูล GPT สิ่งที่ต่างกันคือการเข้าถึงโปรเจกต์และชนิดของผลลัพธ์</b-cap>
</b-chapter>
<b-chapter id="plans" title="แพ็กเกจและขีดจำกัด" icon="card">
  <b-why>Work และ Codex ไม่ได้ขายแยก แต่รวมอยู่ในแพ็กเกจ ChatGPT<b-proof href="https://learn.chatgpt.com/docs/pricing" quote="OpenAI: “ChatGPT Work and Codex are included in your ChatGPT Free, Go, Plus, Pro, Business, Edu, or Enterprise plan” — learn.chatgpt.com/docs/pricing"/></b-why>

  แพ็กเกจคือสิ่งที่คุณจ่ายให้ ChatGPT และแพ็กเกจเดียวเปิดให้ใช้ครบทั้งสามโหมด ความต่างระหว่างแพ็กเกจอยู่ที่ขีดจำกัด คืองานของ Codex ใส่ในแพ็กเกจของคุณได้มากแค่ไหน บน Free และ Go ออกแบบไว้สำหรับงานเบาและงานด่วน ส่วน Plus ราคา 20 ดอลลาร์ต่อเดือน<b-proof href="https://learn.chatgpt.com/docs/pricing" quote="OpenAI: Free — quick coding tasks, Go — lightweight tasks, Plus — $20/month — learn.chatgpt.com/docs/pricing"/> บทความนี้ไม่ให้ตัวเลขขีดจำกัดที่แน่นอน ฉันหาไม่พบ และตัวเลขขึ้นกับแพ็กเกจ
  <iso-art name="codex-or-chatgpt-what-to-choose/one-subscription"></iso-art>
  <b-cap>แพ็กเกจเดียวเปิดสามโหมด ขีดจำกัดขึ้นกับแพ็กเกจ</b-cap>
  <b-sublabel top="18">หนึ่งแพ็กเกจ หนึ่งเรื่องราว</b-sublabel>

  ลีนาอาศัยอยู่ในวอร์ซอและเขียนสคริปต์ให้สำนักงานบัญชี เธอเปิดหน้าแพ็กเกจของ OpenAI และเห็นว่า Codex รวมอยู่แม้ในแพ็กเกจฟรี แต่ที่นั่นออกแบบไว้สำหรับงานด่วน สัปดาห์แรกแค่นี้ก็พอ เธอแก้สคริปต์หนึ่งตัวและยืนยันได้ว่าวิธีนี้ใช้ได้ เมื่องานเพิ่มขึ้น เธอย้ายไป Plus ราคา 20 ดอลลาร์ต่อเดือน คุณตรวจแพ็กเกจของตัวเองได้ที่หน้าแพ็กเกจของ OpenAI ซึ่งระบุบรรทัดเรื่อง Codex ของแต่ละแพ็กเกจ

  <b-sublabel top="18">ทำงานด้วยคีย์ API</b-sublabel>

  คีย์ API คือรหัสผ่านสำหรับโปรแกรมที่ให้โปรแกรมเรียกใช้โมเดลได้โดยไม่ต้องสมัครสมาชิก การจ่ายเงินคิดตามอัตรา API ตามการใช้งานจริง ด้วยคีย์แบบนี้ Codex ทำงานในเทอร์มินัล (CLI) ใน SDK และในส่วนขยายสำหรับ IDE ฟังก์ชันบนคลาวด์ เช่น การตรวจโค้ดบน GitHub ไม่รวมอยู่ในโหมดนี้<b-proof href="https://learn.chatgpt.com/docs/pricing" quote="OpenAI: an API key lets you use Codex in the CLI, SDK or IDE at API rates; cloud features not included — learn.chatgpt.com/docs/pricing"/>
  <iso-art name="codex-or-chatgpt-what-to-choose/api-key-mode"></iso-art>
  <b-cap>คีย์ API: จ่ายตามอัตรา API เทอร์มินัล SDK และ IDE ใช้ได้ ฟังก์ชันบนคลาวด์ใช้ไม่ได้</b-cap>
  <b-sublabel top="18">ความเข้าใจผิดที่พบบ่อย</b-sublabel>

  <b>Codex คิดเงินแยกหรือไม่?</b> ไม่ Codex รวมอยู่ในแพ็กเกจ ChatGPT Free, Go, Plus, Pro, Business, Edu และ Enterprise ไม่มีการจ่ายแยก วิธีตรวจ: เปิด<a href="https://learn.chatgpt.com/docs/pricing">หน้าช่วยเหลือของ OpenAI เรื่องแพ็กเกจ</a>แล้วหาบรรทัด "included in your ChatGPT … plan"

  <b>คีย์ API ให้ทุกอย่างเท่ากับการสมัครสมาชิกหรือไม่?</b> ไม่ เทอร์มินัล SDK และส่วนขยายสำหรับ IDE ใช้ได้กับคีย์ ฟังก์ชันบนคลาวด์ไม่รวมอยู่ด้วย และการจ่ายเงินคิดตามอัตรา API วิธีตรวจ: อ่านย่อหน้าเรื่องคีย์ API ในหน้าช่วยเหลือเรื่องแพ็กเกจหน้าเดียวกัน

  <b>แพ็กเกจฟรีใช้ Codex ไม่ได้ใช่หรือไม่?</b> ใช้ได้ Codex รวมอยู่ใน Free แต่ออกแบบไว้สำหรับงานโค้ดด่วน งานแบบนี้ใส่ในขีดจำกัดได้กี่งาน ฉันหาไม่พบในหน้าช่วยเหลือ
</b-chapter>
<b-chapter id="pick" title="เลือกอะไรเมื่อไร" icon="crosshair">
  <b-why>เลือกทีละงาน ทุกโหมดใช้การสมัครสมาชิกเดียวกัน จึงไม่ต้องเลือกโหมดเดียวตลอดทั้งโปรเจกต์</b-why>

  เริ่มจากถามตัวเองว่าสุดท้ายอยากได้อะไร คือคำอธิบาย เอกสาร หรือโปรเจกต์ที่แก้และตรวจแล้ว คำตอบนั้นกำหนดโหมด
  <iso-art name="codex-or-chatgpt-what-to-choose/pick-tree"></iso-art>
  <b-cap>แผนผังการเลือก: จากสิ่งที่ต้องการไปสู่โหมด</b-cap>
  <b-sublabel top="18">ตารางเลือก</b-sublabel>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>สถานการณ์</th><th>ควรใช้อะไร</th><th>เพราะอะไร</th></tr>
    </thead>
    <tbody>
      <tr><td>เข้าใจโค้ดของคนอื่นหรือข้อผิดพลาดจากล็อก</td><td>ChatGPT Chat</td><td>วางข้อความก็ได้คำอธิบายแล้ว</td></tr>
      <tr><td>แก้บั๊กในรีโพซิทอรีและตรวจด้วยเทสต์</td><td>Codex</td><td>หาไฟล์เอง แก้ และรันเทสต์</td></tr>
      <tr><td>เขียนจดหมาย เอกสารข้อกำหนด สรุป หรือสไลด์</td><td>ChatGPT Work</td><td>ผลลัพธ์คือเอกสาร ไม่ใช่โค้ด</td></tr>
      <tr><td>แก้ใหญ่หลายไฟล์ ต้องมีพูลรีเควสต์</td><td>Codex บนคลาวด์หรือในเทอร์มินัล</td><td>งานรันในแซนด์บอกซ์แยก และผลลัพธ์คือการแก้ไขให้ตรวจ</td></tr>
      <tr><td>ต้องการโมเดลอื่นหรือทำงานในเอดิเตอร์</td><td><a href="/blog/ai-in-code-harness-and-tools/">Claude Code หรือ Cursor</a></td><td>Claude Code ทำงานบนโมเดล Claude ส่วน Cursor เชื่อมต่อโมเดลของหลายบริษัท</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-sublabel top="18">สามสถานการณ์</b-sublabel>

  ออสการ์อาศัยอยู่ในเฮลซิงกิและได้ข้อผิดพลาดจากล็อกที่เขาไม่รู้จัก เขาวางข้อความลงในแชต หนึ่งนาทีต่อมาก็รู้ว่าเป็นข้อผิดพลาดอะไร ไม่มีอะไรต้องแก้ในโปรเจกต์ จึงใช้ Chat เออร์มาในทาลลินน์เตรียมสรุปโปรเจกต์ให้ผู้บริหาร เธอต้องการเอกสาร ไม่ใช่โค้ด จึงเปิด Work พาเวลในปราก ต้องแก้การคำนวณค่าจัดส่งในสี่ไฟล์และแนบพูลรีเควสต์ เขามอบงานให้ Codex บนคลาวด์และได้การแก้ไขมาให้ตรวจ ทั้งสามคนเลือกโหมดจากผลลัพธ์ที่คาดหวังในตอนท้าย

  ถ้าคุณต้องย้ายคำตอบเข้าโค้ดด้วยมือเกินสองครั้ง ให้มอบงานนั้นให้ Codex ถ้าต้องการโมเดลอื่นหรือทำงานในเอดิเตอร์ Claude Code ทำงานบนโมเดล Claude ส่วน Cursor เชื่อมต่อโมเดลของหลายบริษัท และ<a href="/blog/ai-in-code-harness-and-tools/">การเปรียบเทียบเอเจนต์เหล่านี้</a>อยู่ในบทความแยก
</b-chapter>
<b-chapter id="start" title="เริ่มอย่างไร" icon="zap">
  <b-why>คำสั่งสำเร็จรูปสามข้อ แต่ละข้อบอกเป้าหมาย สถานที่ และวิธีตรวจ เอเจนต์ไม่รู้เองว่าแค่ไหนถึงเรียกว่าเสร็จ จนกว่าคุณจะบอก</b-why>

  ยานาอาศัยอยู่ในบราติสลาวาและรัน Codex บนโปรเจกต์งานเป็นครั้งแรก เธอไล่ไปทีละขั้น ก่อนอื่นขอให้อ่านและรันเทสต์โดยไม่แก้อะไร จากนั้นให้แก้เทสต์หนึ่งตัว แล้วจึงเตรียมพูลรีเควสต์ ในแต่ละขั้นเธอตรวจผลก่อนไปต่อ
  <iso-art name="codex-or-chatgpt-what-to-choose/start-ladder"></iso-art>
  <b-cap>สามขั้น: อ่านและรัน แก้หนึ่งจุด พูลรีเควสต์</b-cap>
  <b-sublabel top="18">คำสั่งถึงเอเจนต์สามข้อ</b-sublabel>
  <b-codebox>
    อ่าน README และ AGENTS.md บอกว่ารันเทสต์อย่างไร แล้วรันโดยไม่เปลี่ยนอะไร แสดงว่าเทสต์ตัวไหนล้ม
    แก้เทสต์ที่ล้มใน tests/orders.test.ts แก้เฉพาะใน src/orders/ หลังแก้ให้รันเทสต์ทั้งหมดและแสดง diff
    เตรียมพูลรีเควสต์จากการแก้ไขเหล่านี้: ชื่อสั้น ๆ สิ่งที่เปลี่ยน และวิธีตรวจ
  </b-codebox>
  <b-sublabel top="18">ทำไมคำสั่งแรกจึงไม่เปลี่ยนอะไร</b-sublabel>

  คำสั่งแรกตรวจว่าเอเจนต์หาเทสต์เจอและรันได้ ถ้าเทสต์รันได้ หลังจากนั้นเอเจนต์ตรวจตัวเองได้ ถ้ารันไม่ได้ การแก้แบบมองไม่เห็นผลก็ไม่ได้อะไร เพราะเอเจนต์จะไม่รู้ว่าแก้เทสต์สำเร็จหรือไม่ ดังนั้นเริ่มด้วยคำสั่งให้อ่านและรัน แล้วค่อยอนุญาตให้แก้

  <b-sublabel top="18">AGENTS.md</b-sublabel>

  AGENTS.md คือไฟล์คำแนะนำสำหรับเอเจนต์ที่ Codex อ่านตอนเริ่มงาน คุณเขียนลงไปได้ทั้งคำสั่งสร้างและรันเทสต์ โฟลเดอร์ที่ห้ามแตะ และกฎการจัดรูปแบบ ยิ่งไฟล์ชัดเจน เอเจนต์ยิ่งเดาน้อยลง วิธีตรวจ: ในคำสั่งแรกให้เอเจนต์เล่าว่ารันเทสต์อย่างไร แล้วเทียบกับไฟล์
</b-chapter>
<b-chapter id="faq" icon="chat" title="คำถามที่พบบ่อย">
  <b-faq-cards>
    <q t="Codex กับ ChatGPT เป็นสิ่งเดียวกันหรือไม่?">ไม่ ChatGPT ในโหมด Chat ตอบเป็นข้อความ ส่วน Codex ทำงานในโปรเจกต์ คืออ่านโค้ด แก้ไฟล์ และรันเทสต์ ทั้งสองอยู่ในแอป ChatGPT และใช้การสมัครสมาชิกร่วมกัน แหล่งที่มา: learn.chatgpt.com/docs/use-chatgpt วันที่ตรวจสอบ: 18.11.2026</q>
    <q t="ต้องจ่ายเงินแยกสำหรับ Codex หรือไม่?">ไม่ Codex รวมอยู่ในแพ็กเกจ ChatGPT Free, Go, Plus, Pro, Business, Edu และ Enterprise และขีดจำกัดขึ้นกับแพ็กเกจ เมื่อทำงานด้วยคีย์ API การจ่ายเงินคิดตามอัตรา API แหล่งที่มา: learn.chatgpt.com/docs/pricing วันที่ตรวจสอบ: 18.11.2026</q>
    <q t="เขียนโค้ดในแชตธรรมดาอย่างเดียวได้หรือไม่?">ได้ แชตอธิบายโค้ด เขียนฟังก์ชัน และวิเคราะห์ข้อผิดพลาดให้ได้ แต่การย้ายผลเข้าโปรเจกต์และการรันเทสต์ยังเป็นหน้าที่ของคุณ เมื่อมีการแก้จำนวนมาก Codex ช่วยประหยัดเวลา เพราะเปิดไฟล์และตรวจผลเอง</q>
    <q t="ถ้าต้องการโมเดลอื่น ควรใช้อะไรแทน Codex?">Claude Code ทำงานบนโมเดล Claude ส่วน Cursor เชื่อมต่อโมเดลของหลายบริษัท การเลือกระหว่างสองตัวนี้อธิบายไว้ในบทความแยก แหล่งที่มา: learn.chatgpt.com/docs และ code.claude.com/docs/en/overview (ตรวจเมื่อ 15.11.2026 ไม่ได้ตรวจซ้ำสำหรับบทความนี้)</q>
    <q t="โหมด Work คืออะไร และต่างจาก Codex อย่างไร?">Work ทำงานใหญ่จนได้ผลลัพธ์ที่เสร็จแล้ว คือเอกสาร ตาราง หรืองานวิจัย ส่วน Codex ทำงานกับโค้ดของโปรเจกต์และให้การแก้ไข ผลเทสต์ และพูลรีเควสต์ แหล่งที่มา: learn.chatgpt.com/docs/use-chatgpt</q>
    <q t="รัน Codex ด้วยคีย์ API แทนการสมัครสมาชิกได้หรือไม่?">ได้ เทอร์มินัล SDK และส่วนขยายสำหรับ IDE คิดเงินตามอัตรา API ฟังก์ชันบนคลาวด์ เช่น การตรวจโค้ดบน GitHub ไม่รวมอยู่ในโหมดนี้ แหล่งที่มา: learn.chatgpt.com/docs/pricing</q>
  </b-faq-cards>
</b-chapter>
<b-chapter id="next" title="อ่านต่อ">
  <b-links cols="2">
    <item href="/blog/ai-in-code-harness-and-tools/" k="เปรียบเทียบ" t="Codex กับ Claude Code, Cursor กับ Hermes Agent: เปรียบเทียบเอเจนต์ AI สำหรับเขียนโค้ด">เอเจนต์ตัวไหนเหมาะกับงานอะไร</item>
    <item href="/blog/specs-rules-skills/" k="บริบท" t="AGENTS.md และ CLAUDE.md คืออะไร: ไฟล์ตัวอย่าง และที่เก็บ spec, rule และ skill">เอเจนต์อ่านคำแนะนำอะไรบ้าง</item>
    <item href="/blog/harness-driven-development/" k="วิธีการ" t="Harness engineering ในทางปฏิบัติ: เปลี่ยนความผิดพลาดของเอเจนต์ AI ให้เป็นกฎของสภาพแวดล้อม (HDD)">ความผิดพลาดของเอเจนต์กลายเป็นกฎ</item>
    <item href="/blog/claude-code-install-and-price/" k="ติดตั้ง" t="Claude Code ติดตั้งและราคา: แผนที่รวมไว้และประเทศที่ใช้ได้">คำสั่ง การลงชื่อเข้าใช้ แพ็กเกจ</item>
    <item href="/blog/cursor-rules-vs-agents-md/" k="กฎ" t="Cursor rules กับ AGENTS.md: อะไรควรอยู่ตรงไหน">ไฟล์กฎที่ Codex อ่าน</item>
    <item href="/blog/codex-access-regions-vpn-bans/" k="การเข้าถึง" t="Codex CLI ใช้ไม่ได้ในประเทศของคุณ: ประเทศที่รองรับ VPN และการแบน">รายชื่อประเทศและการลงชื่อเข้าใช้</item>
    <item href="/blog/ai-agent-llm-harness/" k="พื้นฐาน" t="เอเจนต์ต่างจากแชตอย่างไร">เอเจนต์ ผู้ช่วย แชตบอต และโครงข่ายประสาท</item>
    <item href="/blog/work-prompts-examples/" k="Prompt" t="Prompt สำหรับงานจริง">คำขอสำหรับ Chat และ Work</item>
    <item href="/materials/glossary/codex/" k="ศัพท์" t="Codex">ทำอะไรได้ ทำงานที่ไหน</item>
  </b-links>
</b-chapter>
<b-footer>อิงจากหน้าช่วยเหลือของ OpenAI แหล่งที่มาอยู่ติดกับข้อความ วันที่ตรวจสอบ: 18.11.2026</b-footer>
</b-post>
