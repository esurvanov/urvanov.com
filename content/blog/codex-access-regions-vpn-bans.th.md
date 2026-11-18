---
title: Codex CLI ใช้ไม่ได้ในประเทศของคุณ: ประเทศที่รองรับ VPN และการแบน
seoTitle: Codex CLI ใช้ไม่ได้ในประเทศของคุณ (2026)
date: 2026-11-18
updated: 2026-11-18
description: รายชื่อประเทศของ OpenAI มีความหมายอย่างไรต่อ Codex การลงชื่อเข้าใช้ทำงานอย่างไร ข้อกำหนดพูดถึง VPN ว่าอะไร ทำไมบัญชีถูกแบน และโปรแกรมส่งข้อมูลอะไรบ้าง
tags: AI, Codex, OpenAI, ประเทศที่รองรับ, VPN, การแบน, Claude Code
category: harness
layout: wide
mentions: Codex, OpenAI, ChatGPT, Claude Code, Anthropic
toc: answer=คำตอบสั้น | list=รายชื่อประเทศ | login=การลงชื่อเข้าใช้ | vpn=VPN | bans=การแบน | data=ข้อมูลและการตั้งค่า | compare=เทียบกับ Claude Code | legal=ทางเลือกที่ถูกต้อง | faq=คำถาม | start=คำสั่งถึงเอเจนต์ | next=อ่านต่อ
---

Codex อย่างเป็นทางการใช้ไม่ได้ในรัสเซีย เพราะรัสเซียไม่อยู่ในรายชื่อประเทศที่ OpenAI รองรับ และการเข้าถึงจากนอกรายชื่อ “may result in your account being blocked or suspended” Codex CLI ลงชื่อเข้าใช้ด้วย ChatGPT หรือ API key ผมไม่พบกฎภูมิภาคแยกสำหรับ Codex เอกสารไม่กล่าวถึง VPN แต่ห้ามหลีกเลี่ยงข้อจำกัดและมาตรการป้องกัน

<b-post series="harness">
<b-chapter id="answer" title="คำตอบสั้น" icon="crosshair">
  <b-why>การเข้าถึง Codex ขึ้นอยู่กับรายชื่อประเทศทั่วไปของ OpenAI สำหรับ ChatGPT และ API รัสเซียไม่อยู่ในรายชื่อนั้น<b-proof href="https://developers.openai.com/api/docs/supported-countries" quote="OpenAI: «Accessing or offering access to our services outside of the countries and territories listed below may result in your account being blocked or suspended.» — developers.openai.com/api/docs/supported-countries"/></b-why>

  <iso-art name="codex-access-regions-vpn-bans/world-map"></iso-art>
  <b-cap>สีน้ำเงิน: ประเทศอยู่ในรายชื่อของ OpenAI สีส้ม: ประเทศไม่อยู่ในรายชื่อ โดยรัสเซียใช้โทนเข้มกว่า</b-cap>
  <b-sublabel top="18">พูดให้เข้าใจง่ายคืออะไร</b-sublabel>

  OpenAI คือบริษัทที่ทำ ChatGPT และ Codex Codex เป็นเอเจนต์สำหรับโปรแกรมเมอร์ ทำงานในเทอร์มินัลและในแอป อ่านไฟล์ของโปรเจกต์ และแก้โค้ดตามงานที่คุณสั่ง OpenAI เผยแพร่รายชื่อประเทศที่บริการพร้อมใช้งาน ถ้าประเทศของคุณอยู่ในรายชื่อ กฎเรื่องภูมิภาคจะไม่ขวางทาง ถ้าไม่อยู่ การเข้าถึงอาจจบลงด้วยการที่บัญชีถูกบล็อก OpenAI ไม่อธิบายว่าทำไมจึงจัดระบบแบบนี้ ตามที่ผมเดา สาเหตุคือนโยบายของบริษัทร่วมกับความเสี่ยงเรื่องมาตรการคว่ำบาตร การควบคุมการส่งออก และกฎหมายของสหรัฐฯ และประเทศอื่น

  ตัวอย่างในชีวิตประจำวัน ดานาอาศัยอยู่ในอัลมาตีและอยากลอง Codex เธอเปิดรายชื่อของ OpenAI และพบบรรทัด “Kazakhstan” รายการนั้นไม่มีวงเล็บและไม่มีข้อสงวน ภูมิภาคจึงไม่มีอะไรขวางทาง ที่เหลือเป็นขั้นตอนธรรมดา คือลงชื่อเข้าใช้บัญชี ChatGPT หรือสร้าง API key และเลือกวิธีชำระเงิน คนที่อยู่ในรัสเซียจริง ๆ จะไม่พบรายการแบบนี้

  ความเข้าใจผิดที่พบบ่อยคือคิดว่า Codex มีกฎของตัวเองเพราะทำงานในเทอร์มินัลและติดตั้งด้วยคำสั่งเดียว Codex ไม่มีรายชื่อประเทศแยก ทั้งในหน้าสาธารณะของ OpenAI และในที่เก็บโค้ดของโปรแกรม การลงชื่อเข้าใช้ของ Codex ชี้ไปที่รายชื่อทั่วไปของ ChatGPT และ API ส่วนความเข้าใจผิดข้อที่สองเกี่ยวกับ VPN คือบริการที่ทำให้การเชื่อมต่อดูเหมือนมาจากอีกที่หนึ่ง คำว่า VPN ไม่ปรากฏทั้งในหน้าช่วยเหลือเรื่องประเทศและในข้อกำหนดการใช้งาน ข้อกำหนดห้ามหลีกเลี่ยงข้อจำกัดและมาตรการป้องกัน และการเปลี่ยนที่อยู่เชื่อมต่ออาจเข้าข่ายนั้น ข้อสรุปนี้เป็นของผม OpenAI ไม่ได้แถลงเรื่องนี้โดยตรง

  คุณตรวจคำตอบได้ในหนึ่งนาที เปิด<a href="https://developers.openai.com/api/docs/supported-countries">หน้าของ OpenAI ที่มีรายชื่อประเทศที่รองรับ</a>และหาประเทศของคุณด้วยการค้นหาในหน้าของเบราว์เซอร์ ศูนย์ช่วยเหลือที่ help.openai.com เปิดไม่ได้เมื่อใช้คำขอแบบอัตโนมัติ (ข้อผิดพลาด 403) ผมจึงตรวจแถวของรายชื่อบนหน้า developers.openai.com
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>คำถาม</th><th>คำตอบ</th><th>สถานะ</th></tr>
    </thead>
    <tbody>
      <tr><td>🇷🇺 รัสเซียอยู่ในรายชื่อประเทศของ OpenAI</td><td>ไม่อยู่<b-proof href="https://developers.openai.com/api/docs/supported-countries" quote="OpenAI: «Accessing or offering access to our services outside of the countries and territories listed below may result in your account being blocked or suspended.» — developers.openai.com/api/docs/supported-countries"/></td><td>ยืนยันแล้ว</td></tr>
      <tr><td>รายชื่อประเทศแยกสำหรับ Codex</td><td>ไม่พบในหน้าสาธารณะหรือในที่เก็บโค้ด</td><td>ไม่พบ</td></tr>
      <tr><td>การลงชื่อเข้าใช้</td><td>บัญชี ChatGPT หรือ API key<b-proof href="https://learn.chatgpt.com/docs/auth" quote="OpenAI: «Sign in with ChatGPT for subscription access» / «Sign in with an API key for usage-based access» — learn.chatgpt.com/docs/auth"/></td><td>ยืนยันแล้ว</td></tr>
      <tr><td>VPN ในข้อกำหนดและในหน้าช่วยเหลือเรื่องประเทศ</td><td>ไม่กล่าวถึง</td><td>ไม่พบ</td></tr>
      <tr><td>ข้อห้ามหลีกเลี่ยงข้อจำกัดและมาตรการป้องกัน</td><td>มีอยู่ในข้อกำหนด<b-proof href="https://openai.com/policies/row-terms-of-use/" quote="OpenAI: «circumvent any rate limits or restrictions or bypass any protective measures or safety mitigations we put on our Services» — openai.com/policies/row-terms-of-use"/></td><td>ยืนยันแล้ว</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>วันที่ตรวจสอบ: 18.11.2026 บทความเล่าเอกสารทางการและไม่มีวิธีเลี่ยงข้อจำกัด</b-cap>
</b-chapter>
<b-chapter id="list" title="รายชื่อประเทศของ OpenAI" icon="flag">
  <b-why>OpenAI มีรายชื่อเดียวสำหรับ ChatGPT และ API และไม่เผยแพร่รายชื่อประเทศที่ไม่รองรับแยกต่างหาก<b-proof href="https://help.openai.com/en/articles/7947663-chatgpt-and-openai-api-supported-countries-and-territories" quote="OpenAI: «OpenAI does not publish a separate list of countries and territories that are not supported. If a location is not included in the list below, our API is not available there.» — help.openai.com/en/articles/7947663"/></b-why>

  รายชื่อประเทศคือหน้าของ OpenAI ที่ระบุสถานที่ซึ่งใช้ ChatGPT และ API ได้ Codex อยู่ในชุดเดียวกัน เพราะเชื่อมต่อผ่านบัญชี ChatGPT หรือด้วย API key วิธีลงชื่อเข้าใช้ทั้งสองแบบจึงเจอรายชื่อเดียวกัน ไม่มีหน้าแยกชื่อ “ประเทศที่ Codex ปิด” ดังนั้นการที่ประเทศไม่อยู่ในรายชื่อเป็นสัญญาณเดียวว่าการเข้าถึงปิดอยู่
  <iso-art name="codex-access-regions-vpn-bans/list-gate"></iso-art>
  <b-cap>รายชื่อทำหน้าที่เป็นประตูบานเดียวของ ChatGPT, API และ Codex ประเทศที่อยู่ในรายชื่อผ่านได้ ประเทศนอกรายชื่อถูกหยุด</b-cap>
  <b-sublabel top="18">อ่านรายการอย่างไร</b-sublabel>

  รายการส่วนใหญ่ในรายชื่อเป็นคำเดียว เช่น “Armenia”, “Georgia”, “Kazakhstan” รายการแบบนี้หมายความว่ารองรับทั้งประเทศ บางรายการมีข้อสงวน ที่เห็นชัดที่สุดคือ “Ukraine (with certain exceptions)” ผมขอแยกอธิบาย “Ukraine” ระบุประเทศ ส่วนวงเล็บ “with certain exceptions” หมายความว่ามีบางส่วนของดินแดนที่ถูกยกเว้น รายการบนหน้าของ OpenAI ไม่ระบุว่าที่ใดถูกยกเว้น และหน้าสาธารณะของ OpenAI ไม่มีรายการข้อยกเว้น เทียบกับ Anthropic ซึ่งระบุภูมิภาคของยูเครนที่ถูกยกเว้นทีละแห่ง ขณะที่ OpenAI ไม่มีรายการแบบนั้นในรายการนี้ กฎที่ใช้ได้จริงคือ ถ้าประเทศของคุณเขียนพร้อมวงเล็บ คำเดียวในรายชื่อยังไม่พอ และคุณต้องสอบถามฝ่ายสนับสนุนของ OpenAI เพิ่มเติม

  ตัวอย่างในชีวิตประจำวัน อาร์เซนอาศัยอยู่ในเยเรวานและกำลังตั้งทีมกับเพื่อนร่วมงานจากอาร์เมเนีย จอร์เจีย และยูเครน เขาเปิดรายชื่อและพบ “Armenia” กับ “Georgia” ไม่มีวงเล็บ คนที่อยู่ในสองประเทศนี้จึงไม่มีข้อสงสัย เขาอ่านรายการ “Ukraine (with certain exceptions)” ละเอียดขึ้นและขอให้เพื่อนร่วมงานจากเคียฟเขียนถึงฝ่ายสนับสนุนของ OpenAI เพื่อถามว่าเมืองของเขาเข้าข่ายข้อยกเว้นหรือไม่ คุณตรวจเองได้แบบนี้ หาประเทศด้วยการค้นหาในหน้าและดูว่ามีวงเล็บตามหลังชื่อหรือไม่
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>ประเทศ</th><th>OpenAI (ChatGPT และ API)</th></tr>
    </thead>
    <tbody>
      <tr><td>รัสเซีย เบลารุส</td><td>ไม่อยู่ในรายชื่อ</td></tr>
      <tr><td>จีน ฮ่องกง มาเก๊า</td><td>ไม่อยู่ในรายชื่อ</td></tr>
      <tr><td>อิหร่าน คิวบา เกาหลีเหนือ ซีเรีย</td><td>ไม่อยู่ในรายชื่อ</td></tr>
      <tr><td>คาซัคสถาน จอร์เจีย อาร์เมเนีย อุซเบกิสถาน</td><td>อยู่ในรายชื่อ</td></tr>
      <tr><td>ยูเครน</td><td>อยู่ในรายชื่อ “with certain exceptions”<b-proof href="https://developers.openai.com/api/docs/supported-countries" quote="OpenAI: «Ukraine (with certain exceptions)» — developers.openai.com/api/docs/supported-countries"/></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>ตรวจแถวเมื่อ 18.11.2026 กับรายชื่อบน developers.openai.com ก่อนตัดสินใจ ให้เปิดหน้าของ OpenAI และหาประเทศของคุณ เพราะรายชื่อเปลี่ยนได้</b-cap>
  <b-finding>
    <ex>ประเทศไม่มีชื่อในรายชื่อ จึงไม่มีการเข้าถึง Codex ผ่าน ChatGPT และ API ที่นั่น</ex>
    <gen>OpenAI เขียนเกี่ยวกับ API ว่า “not available there” และข้อกำหนดเตือนว่าบัญชีอาจถูกบล็อกเมื่อเข้าถึงจากนอกรายชื่อ หน้าสาธารณะไม่มีข้อยกเว้นสำหรับ Codex</gen>
    <do>ก่อนติดตั้ง หาประเทศของคุณบนหน้าของ OpenAI ถ้าไม่มี ให้ถือว่าการเข้าถึงปิดอยู่</do>
  </b-finding>
  <b-sublabel top="18">รายชื่อของ OpenAI ต่างจากรายชื่อของ Anthropic อย่างไร</b-sublabel>

  Anthropic บริษัทที่ทำ Claude Code มีรายชื่อของตัวเอง และไม่ตรงกับของ OpenAI ทั้งหมด รัสเซีย เบลารุส จีน อิหร่าน คิวบา เกาหลีเหนือ และซีเรียไม่อยู่ในทั้งสองรายชื่อ อัฟกานิสถาน เมียนมา และเยเมนอยู่ในรายชื่อของ OpenAI และไม่มีในรายชื่อของ Anthropic การตรวจประเทศสำหรับเอเจนต์ตัวหนึ่งจึงใช้แทนอีกตัวไม่ได้ ให้เปิดรายชื่อของตัวที่คุณวางแผนจะติดตั้ง ทั้งสองบริษัทไม่อธิบายความแตกต่าง
</b-chapter>
<b-chapter id="login" title="Codex ลงชื่อเข้าใช้อย่างไร" icon="key">
  <b-why>เอกสารการลงชื่อเข้าใช้ของ Codex ชี้ไปที่รายชื่อประเทศทั่วไป และไม่มีข้อจำกัดเรื่องภูมิภาคของตัวเอง<b-proof href="https://learn.chatgpt.com/docs/auth" quote="OpenAI: «Sign in with ChatGPT for subscription access» — learn.chatgpt.com/docs/auth"/></b-why>

  การลงชื่อเข้าใช้คือวิธีที่ Codex พิสูจน์กับเซิร์ฟเวอร์ของ OpenAI ว่าคำขอมาจากบัญชีของคุณ มีสองวิธี และแต่ละวิธีผูกกับการเรียกเก็บเงินของตัวเอง การลงชื่อเข้าใช้ด้วย ChatGPT ใช้การสมัครสมาชิก ChatGPT คุณจ่ายจำนวนคงที่และใช้เอเจนต์ภายในขีดจำกัด การลงชื่อเข้าใช้ด้วย API key ใช้คีย์สำหรับโปรแกรม คุณจ่ายตามอัตราของ API ตามการใช้งานจริง ทั้งสองเส้นทางอยู่หลังประตูเดียวกับรายชื่อประเทศ และจะเลือกแบบไหนขึ้นอยู่กับวิธีที่คุณชำระเงินและสิ่งที่คุณต้องการ Codex บนคลาวด์ (Codex cloud) ที่เอเจนต์ทำงานบนเซิร์ฟเวอร์ของ OpenAI ต้องลงชื่อเข้าใช้ด้วย ChatGPT และ API key ใช้กับมันไม่ได้
  <iso-art name="codex-access-regions-vpn-bans/login-paths"></iso-art>
  <b-cap>สองเส้นทางลงชื่อเข้าใช้: ChatGPT (สมัครสมาชิก) และ API key (จ่ายตามการใช้) ข้อมูลลงชื่อเข้าใช้อยู่ในคอมพิวเตอร์ของคุณ ในไฟล์หรือในที่เก็บของระบบ</b-cap>

  โปรแกรมเก็บข้อมูลลงชื่อเข้าใช้ไว้ในเครื่อง อยู่ในไฟล์ <code>~/.codex/auth.json</code> หรือในที่เก็บรหัสผ่านของระบบปฏิบัติการ โหมดกำหนดด้วยพารามิเตอร์ <code>cli_auth_credentials_store</code> ซึ่งมีสี่ค่า คือ <code>file</code>, <code>keyring</code>, <code>auto</code> และ <code>ephemeral</code> ไฟล์ที่มีข้อมูลลงชื่อเข้าใช้เทียบเท่ากุญแจของบัญชี ใครคัดลอกไปก็ใช้บัญชีของคุณได้ และข้อกำหนดของ OpenAI ห้ามแชร์ข้อมูลลงชื่อเข้าใช้และห้ามให้ผู้อื่นใช้บัญชี<b-proof href="https://openai.com/policies/row-terms-of-use/" quote="OpenAI: «You may not share your account credentials or make your account available to anyone else and are responsible for all activities that occur under your account.» — openai.com/policies/row-terms-of-use"/>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th></th><th>ลงชื่อเข้าใช้ด้วย ChatGPT</th><th>ลงชื่อเข้าใช้ด้วย API key</th></tr>
    </thead>
    <tbody>
      <tr><td>การชำระเงิน</td><td>สมัครสมาชิก ChatGPT</td><td>อัตราของ API</td></tr>
      <tr><td>Codex cloud</td><td>ต้องใช้วิธีนี้</td><td>ใช้ไม่ได้</td></tr>
      <tr><td>ที่เก็บข้อมูลลงชื่อเข้าใช้</td><td colspan="2">ในไฟล์ ~/.codex/auth.json หรือในที่เก็บของระบบ โหมดกำหนดด้วยพารามิเตอร์ cli_auth_credentials_store (file, keyring, auto, ephemeral)</td></tr>
      <tr><td>การตรวจภูมิภาค</td><td colspan="2">หน้าการลงชื่อเข้าใช้ไม่อธิบายไว้ ใช้รายชื่อประเทศทั่วไป</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-sublabel top="18">สถานการณ์ตั้งแต่ต้นจนจบ</b-sublabel>

  นิกาอาศัยอยู่ในทบิลิซีและติดตั้ง Codex บนแล็ปท็อปที่ทำงาน เธอเปิดโปรแกรมและเลือกลงชื่อเข้าใช้ด้วย ChatGPT เพราะมีการสมัครสมาชิกอยู่แล้ว ข้อมูลลงชื่อเข้าใช้ถูกเก็บไว้ในแล็ปท็อป ประเทศของเธออยู่ในรายชื่อเป็น “Georgia” ไม่มีวงเล็บ ภูมิภาคจึงไม่มีข้อสงสัย หนึ่งสัปดาห์ต่อมาเธอตัดสินใจใช้ Codex บนคลาวด์ และพบว่าต้องใช้การลงชื่อเข้าใช้ด้วย ChatGPT เท่านั้น API key ที่เพื่อนร่วมงานใช้ใช้กับคลาวด์ไม่ได้ ถ้าจะตรวจว่าโปรแกรมลงชื่อเข้าใช้ด้วยวิธีใด ถามเอเจนต์เองได้ คำสั่งสำเร็จรูปอยู่ท้ายบทความ

  <b-sublabel top="18">เซิร์ฟเวอร์ตรวจอะไรตอนลงชื่อเข้าใช้</b-sublabel>

  สิ่งที่เซิร์ฟเวอร์ของ OpenAI ตรวจจริงตอนลงชื่อเข้าใช้ ไม่มีอธิบายในหน้าสาธารณะ จะเป็นที่อยู่เชื่อมต่อ ข้อมูลการชำระเงิน เบอร์โทรศัพท์ หรือทั้งหมดรวมกันก็ยังไม่ยืนยัน บทความจึงไม่ยืนยันว่า OpenAI ใช้สัญญาณใดตัดสินว่าคุณอยู่นอกรายชื่อ สิ่งที่รู้มีเพียงว่าไม่มีการตรวจภูมิภาคที่อธิบายไว้ตอนลงชื่อเข้าใช้ และหน้านั้นชี้ไปที่รายชื่อทั่วไป
</b-chapter>
<b-chapter id="vpn" title="VPN: อะไรที่ระบุไว้และอะไรที่ไม่ระบุ" icon="shield-check">
  <b-why>ข้อกำหนดสำหรับบุคคลทั่วไป (มีผลตั้งแต่ 1 มกราคม 2026) พูดถึง “ข้อจำกัด” และ “มาตรการป้องกัน” ในภาพรวม ไม่มีคำว่า VPN และภูมิภาคอยู่ในนั้น</b-why>

  VPN คือโปรแกรมที่เปลี่ยนที่อยู่ซึ่งเว็บไซต์เห็นว่าคุณเชื่อมต่อมาจากที่ใด คนติดตั้งเพื่อความเป็นส่วนตัวบนเครือข่ายสาธารณะหรือเพื่อเข้าเครือข่ายขององค์กร OpenAI ไม่พูดถึง VPN ในเอกสาร ผมจึงแยกสามอย่าง คือสิ่งที่เขียนไว้ตรงตัว สิ่งที่ตามมาจากข้อกำหนด และสิ่งที่ยังเป็นความเห็น วิธีนี้ชี้ว่ากฎอยู่ตรงไหนและข่าวลืออยู่ตรงไหน
  <iso-art name="codex-access-regions-vpn-bans/vpn-rules"></iso-art>
  <b-cap>เอกสารของ OpenAI พูดถึง VPN น้อยมาก VPN ไม่ถูกกล่าวถึง ส่วนการหลีกเลี่ยงข้อจำกัดและมาตรการป้องกันถูกห้าม</b-cap>

  ตรงตัว เอกสารมีดังนี้ VPN ไม่ถูกกล่าวถึงทั้งในหน้าช่วยเหลือเรื่องประเทศและในข้อกำหนดการใช้งาน ข้อกำหนดห้ามหลีกเลี่ยงขีดจำกัด ข้อจำกัด และมาตรการป้องกัน และห้ามส่งต่อบัญชีให้ผู้อื่นและใช้บริการในประเทศที่อยู่ภายใต้มาตรการห้ามค้าขายของสหรัฐฯ ไม่มีทั้ง “อนุญาต VPN” และ “ห้าม VPN” ในเอกสารเหล่านี้ ข้อสรุปไม่ว่าทางใดยังเป็นการตีความข้อความ
  <iso-art name="codex-access-regions-vpn-bans/four-bans"></iso-art>
  <b-cap>สี่ข้อห้ามในข้อกำหนดของ OpenAI: หลีกเลี่ยงข้อจำกัดและมาตรการป้องกัน ส่งต่อบัญชีให้ผู้อื่น ใช้ในประเทศที่อยู่ภายใต้มาตรการห้ามค้าขายของสหรัฐฯ และละเมิดข้อกำหนด</b-cap>

  สี่ข้อห้ามในข้อกำหนดเกี่ยวกับเรื่องการเข้าถึง และอ่านแต่ละข้อเป็นกฎแยกกันได้

  <b-steps round>
    <step t="หลีกเลี่ยงข้อจำกัดและมาตรการป้องกัน">ห้ามรบกวนบริการ รวมถึงการหลีกเลี่ยงขีดจำกัด ข้อจำกัด และมาตรการป้องกัน การตรวจภูมิภาคอาจนับเป็นมาตรการแบบนี้ แต่ข้อกำหนดไม่ได้ระบุชื่อ</step>
    <step t="ส่งต่อบัญชีให้ผู้อื่น">ห้ามแชร์ข้อมูลลงชื่อเข้าใช้และห้ามให้ผู้อื่นใช้บัญชี ความรับผิดชอบต่อทุกอย่างที่เกิดขึ้นภายใต้บัญชียังอยู่กับเจ้าของ</step>
    <step t="ใช้บริการในประเทศที่อยู่ภายใต้มาตรการห้ามค้าขายของสหรัฐฯ">ห้ามใช้บริการในประเทศหรือดินแดนที่อยู่ภายใต้มาตรการห้ามค้าขายของสหรัฐฯ หรือเพื่อประโยชน์ของบุคคลที่กฎหมายการค้าห้ามทำธุรกรรมด้วย</step>
    <step t="ละเมิดข้อกำหนดและนโยบายการใช้">เมื่อมีการละเมิดข้อกำหนดหรือ Usage Policies OpenAI อาจระงับหรือปิดการเข้าถึง OpenAI ทำเช่นเดียวกันเมื่อมีความเสี่ยงต่อความเสียหายและเมื่อกฎหมายกำหนด</step>
  </b-steps>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>อะไร</th><th>มีในเอกสาร</th></tr>
    </thead>
    <tbody>
      <tr><td>VPN ในหน้าช่วยเหลือเรื่องประเทศ</td><td>ไม่กล่าวถึง</td></tr>
      <tr><td>VPN ในข้อกำหนดการใช้งาน</td><td>ไม่กล่าวถึง</td></tr>
      <tr><td>ข้อห้ามหลีกเลี่ยง “ข้อจำกัด” และ “มาตรการป้องกัน”</td><td>มี<b-proof href="https://openai.com/policies/row-terms-of-use/" quote="OpenAI: «Interfere with or disrupt our Services, including circumvent any rate limits or restrictions or bypass any protective measures or safety mitigations we put on our Services.» — openai.com/policies/row-terms-of-use"/></td></tr>
      <tr><td>ข้อห้ามส่งต่อบัญชีให้ผู้อื่น</td><td>มี<b-proof href="https://openai.com/policies/row-terms-of-use/" quote="OpenAI: «You may not share your account credentials or make your account available to anyone else and are responsible for all activities that occur under your account.» — openai.com/policies/row-terms-of-use"/></td></tr>
      <tr><td>ข้อห้ามใช้บริการในประเทศที่อยู่ภายใต้มาตรการห้ามค้าขายของสหรัฐฯ</td><td>มี<b-proof href="https://openai.com/policies/row-terms-of-use/" quote="OpenAI: «Our Services may not be used in or for the benefit of, or exported or re-exported to (a) any U.S. embargoed country or territory or (b) any individual or entity with whom dealings are prohibited or restricted under applicable trade laws.» — openai.com/policies/row-terms-of-use"/></td></tr>
      <tr><td>“อนุญาต VPN” หรือ “ห้าม VPN” ตรงตัว</td><td>ไม่มีทั้งสองอย่าง ข้อสรุปแบบนั้นเป็นการตีความที่ไม่มีคำพูดรองรับ</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-finding>
    <ex>จากเอกสาร ไม่อาจสรุปตรงตัวได้ทั้งว่าอนุญาตหรือห้าม VPN</ex>
    <gen>เกณฑ์ของ OpenAI คือรายชื่อประเทศที่เสนอบริการ ร่วมกับข้อห้ามหลีกเลี่ยงข้อจำกัด OpenAI ใช้เรื่องนี้ในทางปฏิบัติอย่างไร ผมไม่พบในแหล่งที่เปิดเผย</gen>
    <do>อย่าตัดสินจากเรื่องเล่าในฟอรัม ให้อ่านข้อกำหนดและรายชื่อประเทศบนหน้าของ OpenAI และเมื่อสงสัย ให้เขียนถึงฝ่ายสนับสนุนของ OpenAI</do>
  </b-finding>
  <b-sublabel top="18">ความเข้าใจผิดที่พบบ่อย</b-sublabel>

  <b>เมื่อข้อกำหนดไม่กล่าวถึง VPN แปลว่าอนุญาตใช่หรือไม่?</b> การไม่มีคำกล่าวถึงไม่ได้อนุญาตอะไร ข้อห้ามหลีกเลี่ยงข้อจำกัดและมาตรการป้องกันเขียนไว้กว้าง ๆ และการเปลี่ยนที่อยู่เชื่อมต่ออาจเข้าข่าย วิธีตรวจ: หาประโยคเรื่อง “circumvent any rate limits or restrictions” ใน<a href="https://openai.com/policies/row-terms-of-use/">ข้อกำหนดการใช้งานของ OpenAI</a>และอ่านให้ครบ

  <b>ข้อกำหนดห้าม VPN โดยตรงหรือไม่?</b> VPN ไม่ถูกกล่าวถึงในข้อกำหนด คนสรุปข้อห้ามเลี่ยงภูมิภาคจากข้อห้ามทั่วไปเรื่องการหลีกเลี่ยงมาตรการป้องกัน แต่ข้อสรุปแบบนั้นเป็นการตีความที่ไม่มีคำพูดรองรับ

  <b>การสมัครสมาชิกแบบชำระเงินให้สิทธิ์เข้าถึงจากทุกประเทศหรือไม่?</b> ข้อกำหนดและหน้าช่วยเหลือระบุรายชื่อประเทศเป็นเกณฑ์ และไม่กล่าวถึงแพ็กเกจราคาในเกณฑ์ การสมัครสมาชิก ChatGPT และ API key อยู่หลังประตูเดียวกัน วิธีตรวจ: อ่านประโยคแรกของหน้าที่มีรายชื่อ

  <b>ถ้าประเทศอยู่ในรายชื่อ ไม่ต้องกังวลเรื่อง VPN แล้วใช่หรือไม่?</b> ข้อห้ามหลีกเลี่ยงมาตรการป้องกันเขียนไว้ในข้อกำหนดสำหรับผู้ใช้ทุกคน และรายชื่อประเทศไม่ยกเลิกข้อนี้ หน้าช่วยเหลือเรื่องประเทศยังมีข้อสงวนเรื่องอุปกรณ์ด้วย ข้อผิดพลาด “OpenAI's services are not available in your country.” อาจปรากฏแม้ในประเทศที่รองรับ เงื่อนไขที่ทำให้ปรากฏไม่ได้อธิบายไว้ในหน้าช่วยเหลือ จึงควรถามฝ่ายสนับสนุน

  <b>ใช้ Claude Code ง่ายกว่าหรือไม่?</b> Anthropic ก็ไม่กล่าวถึง VPN ในกฎภูมิภาคเช่นกัน แต่เอกสาร Claude Code มีถ้อยคำของตัวเองเรื่องความเข้ากันได้ของโปรแกรมกับ VPN ถ้อยคำต่างกันระหว่างสองบริษัทและตรรกะคล้ายกัน คือรายชื่อประเทศร่วมกับข้อห้ามทั่วไปเรื่องการหลีกเลี่ยงมาตรการป้องกัน การวิเคราะห์โดยละเอียดสำหรับ Claude Code อยู่ใน<a href="/blog/claude-code-access-regions-vpn-bans/" target="_blank" rel="noopener">บทความแยก</a>

  การตัดสินใจเรื่องความเสี่ยงอยู่ที่คุณ ผมไม่อธิบายและไม่แนะนำวิธีเชื่อมต่อ ในเรื่องนี้ผมมีเพียงถ้อยคำของข้อกำหนด
</b-chapter>


<b-chapter id="bans" title="การแบนและสาเหตุ" icon="alert-circle">
  <b-why>การแบนคือการระงับหรือปิดบัญชี OpenAI หลังจากนั้นการลงชื่อเข้าใช้ ChatGPT, API และ Codex จะใช้ไม่ได้ ข้อกำหนดของ OpenAI ระบุเหตุผลสามข้อ และหนึ่งในนั้นคือการละเมิดข้อกำหนดหรือนโยบายการใช้<b-proof href="https://openai.com/policies/row-terms-of-use/" quote="OpenAI: «We reserve the right to suspend or terminate your access to our Services or delete your account if we determine: You breached these Terms or our Usage Policies. We must do so to comply with the law. Your use of our Services could cause risk or harm to OpenAI, our users, or anyone else.» — openai.com/policies/row-terms-of-use"/></b-why>

  เหตุผลเขียนไว้ในข้อกำหนดการใช้งานสำหรับบุคคลทั่วไป (<a href="https://openai.com/policies/row-terms-of-use/" target="_blank" rel="noopener">Terms of Use</a> มีผลตั้งแต่ 1 มกราคม 2026) และในบทความช่วยเหลือเรื่องรายชื่อประเทศ ข้อกำหนดให้เหตุผลสามข้อ คือการละเมิดข้อกำหนดเองหรือ Usage Policies ข้อบังคับของกฎหมาย และความเสี่ยงต่อความเสียหายของ OpenAI ผู้ใช้อื่น หรือผู้ใดก็ตาม เหตุผลข้อที่สี่อยู่ในบทความช่วยเหลือเรื่องรายชื่อประเทศ การเข้าถึงบริการนอกประเทศที่อยู่ในรายชื่อ “may result in your account being blocked or suspended”
  <iso-art name="codex-access-regions-vpn-bans/ban-ladder"></iso-art>
  <b-cap>เส้นทางในแผนภาพ: เหตุผล แล้วการระงับหรือปิดบัญชี แล้วการอุทธรณ์ผ่านฝ่ายสนับสนุน OpenAI เป็นผู้ตัดสิน และคนที่ถูกแบนเหลือเพียงคำขอถึงฝ่ายสนับสนุน ข้อกำหนดไม่รับปากผลลัพธ์</b-cap>

  การแบนมาเร็วแค่ไหนและหน้าจอแสดงอย่างไร หน้าสาธารณะของ OpenAI ไม่อธิบาย ผมไม่พบ หน้าเหล่านั้นบอกเพียงว่าสิทธิ์ระงับหรือยุติการเข้าถึงเป็นของบริษัท และอุทธรณ์ได้ถ้าการตัดสินใจผิดพลาด
  <b-sublabel top="18">สาเหตุตามเอกสาร</b-sublabel>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>สาเหตุ</th><th>ที่ระบุไว้</th></tr>
    </thead>
    <tbody>
      <tr><td>เข้าถึงนอกรายชื่อประเทศ</td><td>บัญชีอาจถูกบล็อกหรือระงับ: «Accessing or offering access to our services outside of the countries and territories listed below may result in your account being blocked or suspended.»</td></tr>
      <tr><td>ละเมิดข้อกำหนดหรือนโยบายการใช้</td><td>OpenAI อาจระงับหรือยุติการเข้าถึง (คำพูดอยู่ต้นหัวข้อ)</td></tr>
      <tr><td>ข้อผิดพลาดในบางภูมิภาค</td><td>ข้อความข้อผิดพลาดในบทความช่วยเหลือเรื่องประเทศ: «OpenAI's services are not available in your country.» บทความเพิ่มว่าข้อผิดพลาดนี้เกิดได้แม้ในประเทศที่รองรับ หลังจากอุปกรณ์เคยถูกใช้ในภูมิภาคที่ไม่รองรับ</td></tr>
      <tr><td>การอุทธรณ์</td><td>ผ่านฝ่ายสนับสนุน<b-proof href="https://openai.com/policies/row-terms-of-use/" quote="OpenAI: «If you believe we have suspended or terminated your account in error, you can file an appeal with us by contacting our Support team» — openai.com/policies/row-terms-of-use"/></td></tr>
    </tbody>
    </table>
  </b-ctx-table>

  ข้อกำหนดอีกข้อเกี่ยวกับความรับผิดชอบ คือห้ามส่งต่อบัญชีให้ผู้อื่น และเจ้าของรับผิดชอบทุกอย่างที่เกิดขึ้นภายใต้บัญชี<b-proof href="https://openai.com/policies/row-terms-of-use/" quote="OpenAI: «You may not share your account credentials or make your account available to anyone else and are responsible for all activities that occur under your account.» — openai.com/policies/row-terms-of-use"/> บัญชีของผู้อื่นหรือการใช้ร่วมกันในทีมจึงยังเป็นเหตุผลให้ถูกจำกัดได้ แม้ประเทศจะอยู่ในรายชื่อ
  <b-sublabel top="18">การอุทธรณ์ทีละขั้น</b-sublabel>
  <b-steps round>
    <step t="ฝ่ายสนับสนุน">เขียนถึงฝ่ายสนับสนุนของ OpenAI และระบุว่าในมุมมองของคุณการแบนเป็นความผิดพลาด</step>
    <step t="รายละเอียด">แนบวันที่ ประเทศที่คุณลงชื่อเข้าใช้ ข้อความข้อผิดพลาด และสำเนาอีเมล</step>
    <step t="รอ">รอคำตอบ ข้อกำหนดไม่ให้กำหนดเวลาและไม่ให้โอกาสสำเร็จ</step>
  </b-steps>

  หน้าสาธารณะไม่มีแบบฟอร์มอุทธรณ์ที่มีชื่อ ไม่มีที่อยู่ และไม่มีกำหนดเวลาตรวจสอบ ขั้นตอนจึงมีเพียงสิ่งที่ข้อกำหนดระบุ คือคำขอถึงฝ่ายสนับสนุน การอุทธรณ์แก้ความผิดพลาดได้ แต่เหตุผลที่ระบุในบทความช่วยเหลือยังเหมือนเดิมตราบที่คนยังใช้บริการจากประเทศนอกรายชื่อ นี่คือการอ่านข้อกำหนดและบทความช่วยเหลือของผม OpenAI ไม่ได้เปรียบเทียบเช่นนั้น
  <b-sublabel top="18">สถานการณ์ต่อเนื่อง</b-sublabel>
  <b-steps round>
    <step t="โอเล็กอาศัยอยู่ในรัสเซียและอยากลอง Codex">เขาติดตั้งโปรแกรม ลองลงชื่อเข้าใช้ และเห็นข้อความ “OpenAI's services are not available in your country.” รัสเซียไม่อยู่ในรายชื่อประเทศของ OpenAI และข้อกำหนดเตือนว่าบัญชีอาจถูกบล็อกหรือระงับเมื่อเข้าถึงจากนอกรายชื่อ การตรวจแบบไหนทำงานจริง ทั้งที่อยู่เชื่อมต่อ เบอร์โทรศัพท์ หรือข้อมูลการชำระเงิน ไม่มีอธิบายในหน้าสาธารณะ การอุทธรณ์ผ่านฝ่ายสนับสนุนทำได้ แต่ไม่ทำให้ประเทศเข้าไปอยู่ในรายชื่อ ตรวจเองได้ดังนี้ เปิดรายชื่อประเทศของ OpenAI หารัสเซียในนั้น และเทียบผลกับข้อความข้อผิดพลาดจากบทความช่วยเหลือ</step>
  </b-steps>

  <b-sublabel top="18">ความเข้าใจผิดที่พบบ่อย</b-sublabel>

  <b>การแบนให้เฉพาะเมื่อละเมิดข้อกำหนดใช่หรือไม่?</b> ไม่ใช่ ข้อกำหนดมีเหตุผลอีกสองข้อ คือข้อบังคับของกฎหมายและความเสี่ยงต่อความเสียหาย และบทความช่วยเหลือเรื่องประเทศระบุการเข้าถึงนอกรายชื่อแยกต่างหาก

  <b>การอุทธรณ์คืนการเข้าถึงหรือไม่?</b> ข้อกำหนดบอกเพียงว่ายื่นอุทธรณ์ผ่านฝ่ายสนับสนุนได้ และไม่รับปากผลลัพธ์

  <b>ศูนย์ช่วยเหลือระบุสาเหตุของการแบน OpenAI ครบถ้วนหรือไม่?</b> บทความช่วยเหลือแยกของ OpenAI เรื่องสาเหตุที่บัญชีถูกแบนปิดต่อการตรวจแบบอัตโนมัติ (ข้อผิดพลาด 403) ผมจึงไม่เล่าข้อความในนั้น ข้อกำหนดสำหรับธุรกิจ Service Terms และ Usage Policies ก็ปิดเช่นกัน สำหรับองค์กร ต้องอ่านเอกสารเหล่านี้แยกบน openai.com และ help.openai.com
  <b-cap>ขอบเขตของความรู้: สิ่งที่ข้อกำหนดสำหรับบุคคลทั่วไปและบทความช่วยเหลือเรื่องประเทศระบุเป็นเรื่องที่ยืนยันแล้ว ส่วนที่อยู่ในเอกสารที่ปิดยังไม่ยืนยัน</b-cap>
</b-chapter>
<b-chapter id="data" title="Codex ส่งอะไรไปที่เซิร์ฟเวอร์" icon="eye">
  <b-why>คำขอไปยังโมเดลไปที่เซิร์ฟเวอร์เสมอ ไม่เช่นนั้นเอเจนต์ไม่ทำงาน กระแสอื่น (การวิเคราะห์ เมตริก การส่งข้อเสนอแนะ) ปิดได้ใน config.toml และข้อความของพรอมต์ไปถึงบันทึกของ OpenTelemetry เมื่อยินยอมอย่างชัดเจนเท่านั้น<b-proof href="https://learn.chatgpt.com/docs/config-file/config-reference" quote="OpenAI: «Opt in to exporting raw user prompts with OpenTelemetry logs.» — learn.chatgpt.com/docs/config-file/config-reference"/></b-why>

  ผมอิงซอร์สโค้ดของ Codex CLI (คอมมิต 8011b92 วันที่ 18.11.2026) และหน้าการตั้งค่าของ OpenAI Codex เป็นเอเจนต์เขียนโค้ด ทำงานในเทอร์มินัลและในแอป และคุยกับเซิร์ฟเวอร์ตลอดเวลา ข้อมูลบางส่วนจำเป็นต่อการทำงาน บางส่วนถูกเก็บเพิ่ม ข้อมูลที่จำเป็นคือคำขอของคุณไปยังโมเดลและคำตอบของมัน กระแสเพิ่มเติมคือการวิเคราะห์ของผลิตภัณฑ์ Codex เมตริก และข้อเสนอแนะที่ส่งด้วยคำสั่ง /feedback เทเลเมทรีคือการส่งข้อมูลอัตโนมัติเกี่ยวกับการทำงานของโปรแกรม เช่น การกระทำใช้เวลานานเท่าใดและเกิดข้อผิดพลาดหรือไม่ OpenTelemetry คือมาตรฐานเปิดสำหรับข้อมูลแบบนี้
  <iso-art name="codex-access-regions-vpn-bans/data-flows"></iso-art>
  <b-cap>คำขอไปยังโมเดลส่งออกไปเสมอ การวิเคราะห์ เมตริก และ /feedback ปิดได้ด้วยการตั้งค่า ข้อความของพรอมต์ไปที่ OpenTelemetry เมื่อยินยอมเท่านั้น</b-cap>

  <b-sublabel top="18">สิ่งที่ส่งเมื่อเปิดไว้</b-sublabel>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>อะไร</th><th>ค่าเริ่มต้น</th><th>วิธีปิด</th></tr>
    </thead>
    <tbody>
      <tr><td>การวิเคราะห์ของ OpenAI ในผลิตภัณฑ์ Codex<b-proof href="https://learn.chatgpt.com/docs/config-file/config-reference" quote="OpenAI: «Enable or disable analytics for this machine or profile.» — learn.chatgpt.com/docs/config-file/config-reference"/></td><td>เปิดในบิลด์รุ่นจริง</td><td>[analytics] enabled = false</td></tr>
      <tr><td>เมตริก OpenTelemetry (ตัวส่งออกในตัว)<b-proof href="https://learn.chatgpt.com/docs/config-file/config-reference" quote="OpenAI: «Select the OpenTelemetry metrics exporter. The default, `statsig`, follows `analytics.enabled`.» — learn.chatgpt.com/docs/config-file/config-reference"/></td><td>เปิด ตามการตั้งค่าการวิเคราะห์</td><td>[otel] metrics_exporter = "none"</td></tr>
      <tr><td>การส่งข้อเสนอแนะผ่าน /feedback<b-proof href="https://learn.chatgpt.com/docs/config-file/config-reference" quote="OpenAI: «Enable feedback submission via `/feedback` across local clients (default: true).» — learn.chatgpt.com/docs/config-file/config-reference"/></td><td>เปิด</td><td>[feedback] enabled = false</td></tr>
      <tr><td>ข้อความของพรอมต์ในบันทึก OpenTelemetry<b-proof href="https://learn.chatgpt.com/docs/config-file/config-reference" quote="OpenAI: «Opt in to exporting raw user prompts with OpenTelemetry logs.» — learn.chatgpt.com/docs/config-file/config-reference"/></td><td>ปิด ต้องยินยอมอย่างชัดเจน</td><td>ไม่ต้องเปิด</td></tr>
    </tbody>
    </table>
  </b-ctx-table>

  สองแถวแรกเชื่อมกัน โดยค่าเริ่มต้นตัวส่งออกเมตริกในตัวตามการตั้งค่าการวิเคราะห์ การส่งข้อเสนอแนะแยกต่างหาก ไม่มีอะไรถูกส่งจนกว่าคนจะรัน /feedback แถวสุดท้ายแสดงกระแสเดียวที่ปิดโดยค่าเริ่มต้น
  <b-sublabel top="18">การตั้งค่าใน config.toml</b-sublabel>
  <b-codebox title="Codex config.toml" copy>
    [analytics]
    enabled = false

    [otel]
    metrics_exporter = "none"

    [feedback]
    enabled = false
  </b-codebox>
  <b-cap>สคีมาการตั้งค่าในที่เก็บโค้ดอธิบายเพิ่มว่า เมื่อ analytics enabled = false ตัวส่งออก OTLP ของโปรแกรมเองยังทำงานอยู่ และเพื่อปิดเมตริกต้องใช้ metrics_exporter = "none" OpenAI เก็บอะไรจากโค้ดและคำขอ และเก็บนานเท่าใด ไม่พบในหน้าสาธารณะสำหรับ Codex CLI จึงยังไม่ยืนยัน</b-cap>

  การตั้งค่าเหล่านี้เกี่ยวกับการเก็บข้อมูล ไม่มีผลต่อรายชื่อประเทศ การปิดการวิเคราะห์ไม่ทำให้การใช้จากประเทศนอกรายชื่อได้รับอนุญาต
  <b-sublabel top="18">สถานการณ์ต่อเนื่อง</b-sublabel>
  <b-steps round>
    <step t="ติมูร์อาศัยอยู่ในทาชเคนต์และเขียนโค้ดให้ลูกค้า">อุซเบกิสถานอยู่ในรายชื่อประเทศของ OpenAI เขาจึงลงชื่อเข้าใช้ Codex ด้วยบัญชี ChatGPT ลูกค้าขอไม่ให้ส่งอะไรเกินจำเป็น ติมูร์เปิด config.toml และเขียนสามบล็อก คือปิดการวิเคราะห์ ปิดเมตริก ปิดการส่งข้อเสนอแนะ คำขอไปยังโมเดลยังส่งออกไป เพราะการทำงานของเอเจนต์ขึ้นกับมัน ตรวจเองได้ดังนี้ ขอให้เอเจนต์แสดงค่าของทั้งสามการตั้งค่าและตรวจว่าแต่ละค่าตั้งเป็นปิด</step>
  </b-steps>

  <b-sublabel top="18">ความเข้าใจผิดที่พบบ่อย</b-sublabel>

  <b>การปิดการวิเคราะห์หยุดการส่งคำขอไปยังโมเดลหรือไม่?</b> ไม่ คำขอและคำตอบไปที่เซิร์ฟเวอร์เสมอ นี่คือพื้นฐานของการทำงานของเอเจนต์

  <b>บรรทัดเดียว [analytics] enabled = false พอหรือไม่?</b> สคีมาการตั้งค่าอธิบายเพิ่มว่าในกรณีนั้นตัวส่งออก OTLP ของโปรแกรมเองยังทำงานอยู่ และเมตริกถูกปิดทั้งหมดด้วย metrics_exporter = "none"

  <b>ทุกอย่างที่เอเจนต์บันทึกไว้ในเครื่องไปที่เซิร์ฟเวอร์หรือไม่?</b> ไม่ ในโค้ดของ Codex CLI ฐานข้อมูลในเครื่องในไดเรกทอรี ~/.codex (ประวัติเซสชัน บันทึก) ถูกเขียนเสมอ แต่ไม่พบโค้ดเครือข่ายที่ซิงก์ข้อมูลเหล่านั้น ข้อยกเว้น บันทึกจากฐานข้อมูลเหล่านั้นอาจออกไปเมื่อส่ง /feedback และเป็นไปตามการตัดสินใจของคนเท่านั้น
</b-chapter>
<b-chapter id="compare" title="การเข้าถึง: Codex และ Claude Code" icon="table-grid">
  <b-why>เอเจนต์ทั้งสองตัวผูกการลงชื่อเข้าใช้กับรายชื่อประเทศของบริษัทเจ้าของ และรัสเซียไม่อยู่ในทั้งสองรายชื่อ<b-proof href="https://www.anthropic.com/supported-countries" quote="Anthropic: «Any country or region not listed is unsupported.» — anthropic.com/supported-countries"/> เกณฑ์ของรายชื่อต่างกัน สำหรับ OpenAI คือประเทศที่เสนอบริการ สำหรับ Anthropic คือตำแหน่งจริงของบุคคล การจดทะเบียนของบริษัท และผู้ที่เป็นเจ้าของบริษัทด้วย</b-why>

  Claude Code คือเอเจนต์เขียนโค้ดของ Anthropic และทำงานในเทอร์มินัลเช่นกัน การเปรียบเทียบช่วยเมื่อคนเลือกระหว่างเอเจนต์สองตัวและอยากรู้ว่าการเข้าถึงทำงานเหมือนกันหรือไม่ ประเด็นหลักเหมือนกัน คือทั้งสองบริษัทเผยแพร่รายชื่อประเทศ และนอกรายชื่อไม่เสนอการเข้าถึง สิ่งที่ต่างคือสิ่งที่ตรวจจริงและสิ่งที่รายชื่อครอบคลุม
  <iso-art name="codex-access-regions-vpn-bans/compare-lists"></iso-art>
  <b-cap>สองทางเข้า คือรายชื่อของ OpenAI และรายชื่อของ Anthropic รัสเซียไม่อยู่ในทั้งสองรายชื่อ และเกณฑ์ของรายชื่อต่างกัน</b-cap>

  <b-sublabel top="18">ตารางสรุป</b-sublabel>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th></th><th>Codex (OpenAI)</th><th>Claude Code (Anthropic)</th></tr>
    </thead>
    <tbody>
      <tr><td>รัสเซียอยู่ในรายชื่อ</td><td>ไม่</td><td>ไม่</td></tr>
      <tr><td>สิ่งที่รายชื่อครอบคลุม</td><td>ChatGPT และ API ไม่มีกฎแยกสำหรับ Codex</td><td>แอป รวมถึง Claude Code และ API</td></tr>
      <tr><td>เกณฑ์</td><td>รายชื่อประเทศที่เสนอบริการ</td><td>ตำแหน่งจริง การจดทะเบียน และผู้ที่เป็นเจ้าของบริษัท</td></tr>
      <tr><td>VPN ในนโยบายภูมิภาค</td><td>ไม่กล่าวถึง</td><td>ไม่กล่าวถึง</td></tr>
      <tr><td>การลงชื่อเข้าใช้</td><td>ChatGPT หรือ API key</td><td>การสมัครสมาชิก Claude หรือบัญชี Console</td></tr>
      <tr><td>ความต่างระหว่างรายชื่อ</td><td colspan="2">อัฟกานิสถาน เมียนมา และเยเมนอยู่ในรายชื่อของ OpenAI และไม่อยู่ในรายชื่อของ Anthropic</td></tr>
    </tbody>
    </table>
  </b-ctx-table>

  สามแถวของตารางต้องอธิบาย ในแถวสิ่งที่ครอบคลุม OpenAI มีรายชื่อเดียวสำหรับ ChatGPT และ API และ Codex ไม่มีกฎของตัวเอง ขณะที่รายชื่อของ Anthropic ระบุแอปโดยตรง รวมถึง Claude Code ในแถวเกณฑ์ Anthropic ตรวจสามสัญญาณ บริษัทจากภูมิภาคที่ไม่รองรับจึงถูกกันออก แม้พนักงานจะอยู่ในประเทศที่อยู่ในรายชื่อ รายชื่อประเทศของ OpenAI ไม่มีสัญญาณแบบนี้สำหรับบริษัท แถวสุดท้ายคือความต่างตามประเทศ อัฟกานิสถาน เมียนมา และเยเมนระบุไว้ในรายชื่อของ OpenAI และไม่มีในรายชื่อของ Anthropic

  การวิเคราะห์สำหรับ Claude Code พร้อมข้อผิดพลาดการติดตั้ง การยืนยันทางโทรศัพท์ และการชำระเงิน อยู่ในบทความแยกเรื่องภูมิภาค VPN และการแบน
  <b-links cols="2">
    <item href="/blog/claude-code-access-regions-vpn-bans/" k="ภูมิภาค" t="Claude Code: ภูมิภาค VPN และการแบน">หัวข้อเดียวกันสำหรับ Claude Code</item>
    <item href="/blog/claude-code-install-and-price/" k="ติดตั้ง" t="Claude Code: ติดตั้งและราคา">คำสั่ง การลงชื่อเข้าใช้ แพ็กเกจ</item>
  </b-links>
</b-chapter>
<b-chapter id="legal" title="สิ่งที่ทำได้อย่างถูกต้อง" icon="check">
  <b-why>ข้อกำหนดของ OpenAI เหลือสี่เส้นทางที่ไม่ต้องหาทางอ้อม คือหาประเทศของคุณในรายชื่อ อ่านข้อกำหนด เขียนถึงฝ่ายสนับสนุน และเลือกเอเจนต์ตัวอื่น</b-why>

  ทางเลือกที่ถูกต้องมีอยู่ และการเลี่ยงกฎไม่ได้เป็นส่วนของทางใดเลย เส้นทางตรงที่สุดคือหาประเทศของคุณในรายชื่อของ OpenAI เส้นทางถัดไปคืออ่านข้อกำหนดสำหรับบุคคลทั่วไปหรือสำหรับองค์กรก่อนเริ่มงาน เส้นทางที่สามใช้เมื่อประเทศอยู่ในรายชื่อแต่การลงชื่อเข้าใช้ใช้ไม่ได้ คือเขียนถึงฝ่ายสนับสนุน เส้นทางที่สี่คือเลือกเอเจนต์ตัวอื่นที่ข้อกำหนดอนุญาตประเทศของคุณ
  <iso-art name="codex-access-regions-vpn-bans/legal-paths"></iso-art>
  <b-cap>สี่เส้นทางที่มีเครื่องหมายถูกเปิดอยู่ คือประเทศในรายชื่อ ข้อกำหนด ฝ่ายสนับสนุน และเอเจนต์ตัวอื่น ประตูสีส้มที่ปิดคือการเลี่ยงกฎ ซึ่งไม่อยู่ในที่นี้</b-cap>

  <b-seq-row>
    <step t="ประเทศ">หาในรายชื่อของ OpenAI</step>
    <step t="ข้อกำหนด">อ่านข้อกำหนดสำหรับบุคคลทั่วไปหรือองค์กร</step>
    <step t="ฝ่ายสนับสนุน">ถ้ารายชื่อไม่ตรงกับกรณีของคุณ ให้เขียนถึงฝ่ายสนับสนุน</step>
    <step t="เอเจนต์ตัวอื่น">เลือกโปรแกรมที่การเข้าถึงเปิดอยู่</step>
  </b-seq-row>

  <b-sublabel top="18">ทำอะไรในแต่ละสถานการณ์</b-sublabel>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>สถานการณ์</th><th>ขั้นตอน</th></tr>
    </thead>
    <tbody>
      <tr><td>ประเทศอยู่ในรายชื่อ แต่ลงชื่อเข้าใช้ไม่ได้</td><td>เขียนถึงฝ่ายสนับสนุนของ OpenAI และแนบข้อความข้อผิดพลาด การอุทธรณ์ไปทางช่องทางเดียวกัน</td></tr>
      <tr><td>ประเทศไม่อยู่ในรายชื่อ</td><td>ถือว่าการเข้าถึงปิดอยู่ มองหาเอเจนต์ที่ข้อกำหนดอนุญาตประเทศของคุณ</td></tr>
      <tr><td>ต้องทำงานกับโมเดลในเครื่อง</td><td><a href="/materials/glossary/opencode/">OpenCode</a>: คุณเลือกโมเดลเอง รวมถึงโมเดลในเครื่อง ตรวจข้อกำหนดของโมเดลและผู้ให้บริการแยกต่างหาก</td></tr>
      <tr><td>บริษัทในภูมิภาคที่ไม่รองรับ</td><td>ตรวจสอบข้อกำหนดทางกฎหมายก่อนเริ่มงาน Anthropic ปิดกั้นองค์กรที่จดทะเบียนหรือถูกควบคุมจากภูมิภาคที่ไม่รองรับ</td></tr>
    </tbody>
    </table>
  </b-ctx-table>

  OpenCode เป็นเอเจนต์แบบเปิด ไม่มีโมเดลของตัวเอง และเชื่อมต่อกับโมเดลของผู้ให้บริการที่คุณเลือก ผู้ให้บริการนั้นกำหนดกฎภูมิภาค การเลือกจึงควรดูรายชื่อประเทศของผู้ให้บริการโมเดล
  <b-sublabel top="18">สถานการณ์ต่อเนื่อง</b-sublabel>
  <b-steps round>
    <step t="ไอกุลอาศัยอยู่ในบิชเคกและอยากเริ่มด้วย Codex">เธอพบแถว “Kyrgyzstan” ในรายชื่อของ OpenAI อ่านข้อกำหนดสำหรับบุคคลทั่วไป และลงชื่อเข้าใช้ผ่านการสมัครสมาชิก ChatGPT ในชื่อของตัวเอง หนึ่งสัปดาห์ต่อมาการลงชื่อเข้าใช้ใช้ไม่ได้และหน้าจอแสดงข้อผิดพลาด เธอเขียนถึงฝ่ายสนับสนุนของ OpenAI แนบข้อความข้อผิดพลาดและวันที่ แล้วรอคำตอบ ตรวจเองได้ดังนี้ เปิดรายชื่อ หาประเทศของคุณ และบันทึกภาพหน้าจอของแถวนั้นพร้อมวันที่</step>
  </b-steps>

  <b-cap>บัญชีของผู้อื่น API key ของผู้อื่น คนกลาง และการขายต่อสิทธิ์เข้าถึงฝ่าฝืนข้อกำหนด ห้ามส่งต่อบัญชีให้ผู้อื่น วิธีเหล่านี้ไม่อยู่ในบทความนี้</b-cap>
</b-chapter>
<b-chapter id="faq" icon="chat" title="คำถามที่พบบ่อย">
  <b-faq-cards>
    <q t="Codex ใช้ได้ในรัสเซียหรือไม่?">อย่างเป็นทางการไม่ได้ รัสเซียไม่อยู่ในรายชื่อประเทศที่ OpenAI รองรับสำหรับ ChatGPT และ API และหน้าสาธารณะไม่มีกฎแยกสำหรับ Codex แหล่งที่มา: help.openai.com/en/articles/7947663 และ developers.openai.com/api/docs/supported-countries วันที่ตรวจสอบ: 18.11.2026</q>
    <q t="ใช้ Codex ผ่าน VPN ได้หรือไม่?">ข้อกำหนดและบทความช่วยเหลือเรื่องประเทศไม่กล่าวถึง VPN VPN คือโปรแกรมที่เปลี่ยนที่อยู่ซึ่งคุณเชื่อมต่อเข้าเครือข่าย ข้อกำหนดห้ามหลีกเลี่ยงข้อจำกัดและมาตรการป้องกัน และ OpenAI เตือนว่าบัญชีอาจถูกบล็อกเมื่อเข้าถึงจากนอกรายชื่อ เอกสารไม่ให้คำตอบที่ชัดเจน การตัดสินใจจึงเป็นของคุณและความเสี่ยงเป็นของคุณ แหล่งที่มา: openai.com/policies/row-terms-of-use วันที่ตรวจสอบ: 18.11.2026</q>
    <q t="ทำไม OpenAI จึงแบนบัญชี?">สิ่งที่ยืนยันแล้ว คือการเข้าถึงนอกรายชื่อประเทศ การละเมิดข้อกำหนดหรือนโยบายการใช้ ข้อบังคับของกฎหมาย และความเสี่ยงต่อความเสียหาย บทความช่วยเหลือแยกเรื่องสาเหตุของการแบนให้ตรวจเองบน help.openai.com การอุทธรณ์ไปผ่านฝ่ายสนับสนุน วันที่ตรวจสอบ: 18.11.2026</q>
    <q t="ปิดการวิเคราะห์ใน Codex อย่างไร?">ใน config.toml เพิ่ม [analytics] enabled = false, [otel] metrics_exporter = "none" และ [feedback] enabled = false สองอย่างแรกปิดการวิเคราะห์และเมตริกในตัว อย่างที่สามปิดการส่งข้อเสนอแนะ คำขอไปยังโมเดลยังส่งออกไป แหล่งที่มา: learn.chatgpt.com/docs/config-file/config-reference วันที่ตรวจสอบ: 18.11.2026</q>
    <q t="รายชื่อประเทศของ OpenAI ต่างจากของ Anthropic อย่างไร?">เกณฑ์ต่างกัน สำหรับ OpenAI คือประเทศที่เสนอบริการ ChatGPT และ API สำหรับ Anthropic คือตำแหน่งจริงของบุคคล การจดทะเบียนของบริษัท และผู้ที่เป็นเจ้าของบริษัทด้วย อัฟกานิสถาน เมียนมา และเยเมนอยู่ในรายชื่อของ OpenAI และไม่อยู่ในรายชื่อของ Anthropic วันที่ตรวจสอบ: 18.11.2026</q>
    <q t="ถ้าประเทศอยู่ในรายชื่อแต่ลงชื่อเข้าใช้ไม่ได้ ต้องทำอย่างไร?">เขียนถึงฝ่ายสนับสนุนของ OpenAI และแนบข้อความข้อผิดพลาด บทความช่วยเหลือเรื่องประเทศระบุว่าข้อผิดพลาดนี้เกิดได้แม้ในประเทศที่รองรับ หลังจากอุปกรณ์เคยถูกใช้ในภูมิภาคที่ไม่รองรับ การอุทธรณ์การแบนไปผ่านฝ่ายสนับสนุนเดียวกัน วันที่ตรวจสอบ: 18.11.2026</q>
  </b-faq-cards>
</b-chapter>
<b-chapter id="start" title="คำสั่งถึงเอเจนต์" icon="zap">
  <b-why>สามพรอมต์สำเร็จรูปที่ไม่เปลี่ยนอะไรเลยหากคุณไม่ยืนยัน</b-why>

  พรอมต์แรกอ่านอย่างเดียว คือแสดงสามการตั้งค่าการเก็บข้อมูล พรอมต์ที่สองแสดงว่า Codex ลงชื่อเข้าใช้ด้วยวิธีใด ผ่าน ChatGPT หรือ API key และข้อมูลลงชื่อเข้าใช้อยู่ที่ไหน พรอมต์ที่สามเขียนลงไฟล์การตั้งค่า เอเจนต์จึงแสดง diff คือความต่างระหว่างไฟล์เก่ากับไฟล์ใหม่ก่อน แล้วรอการยืนยัน
  <b-codebox title="1. ตั้งค่าการเก็บข้อมูลอะไรไว้บ้าง" copy>
    แสดงว่าตอนนี้ตั้งค่า analytics, otel และ feedback อะไรไว้ใน config.toml ของ Codex อย่าแก้อะไร
  </b-codebox>
  <b-codebox title="2. Codex ลงชื่อเข้าใช้อย่างไร" copy>
    แสดงว่าตอนนี้ Codex ลงชื่อเข้าใช้ให้ฉันด้วยวิธีใด ผ่าน ChatGPT หรือ API key และข้อมูลลงชื่อเข้าใช้อยู่ที่ไหน
  </b-codebox>
  <b-codebox title="3. ปิดการส่งข้อมูลส่วนเกิน" copy>
    เพิ่มบล็อก [analytics] enabled = false, [otel] metrics_exporter = "none" และ [feedback] enabled = false ลงใน config.toml แสดง diff ก่อนและรอการยืนยันจากฉัน
  </b-codebox>
  <b-cap>พรอมต์แรกและพรอมต์ที่สองอ่านอย่างเดียว พรอมต์ที่สามเขียนลงไฟล์การตั้งค่า จึงควรดู diff ก่อนเขียน</b-cap>
</b-chapter>
<b-chapter id="next" title="อ่านต่อ">
  <b-links cols="2">
    <item href="/blog/codex-or-chatgpt-what-to-choose/" k="ตัวเลือก" t="Codex หรือ ChatGPT">เลือกอะไรสำหรับงานกับโค้ด</item>
    <item href="/blog/claude-code-access-regions-vpn-bans/" k="ภูมิภาค" t="Claude Code: ภูมิภาค VPN และการแบน">หัวข้อเดียวกันสำหรับ Claude Code</item>
    <item href="/blog/claude-code-install-and-price/" k="ติดตั้ง" t="Claude Code: ติดตั้งและราคา">คำสั่ง การลงชื่อเข้าใช้ แพ็กเกจ</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="เปรียบเทียบ" t="Claude Code, Codex, Cursor และ Hermes Agent">เอเจนต์ตัวไหนเหมาะกับงานแบบไหน</item>
    <item href="/blog/specs-rules-skills/" k="บริบท" t="AGENTS.md, CLAUDE.md และ spec.md">เอเจนต์อ่านคำสั่งอะไรบ้าง</item>
    <item href="/materials/glossary/codex/" k="คำศัพท์" t="Codex">ทำอะไรได้และรันที่ไหน</item>
  </b-links>
</b-chapter>
<b-footer>อิงจากรายชื่อประเทศและข้อกำหนดของ OpenAI เอกสาร Codex และซอร์สโค้ดของ Codex CLI วันที่ตรวจสอบ: 18.11.2026 รายชื่อประเทศเปลี่ยนได้ ควรเปิดแหล่งที่มาก่อนตัดสินใจ</b-footer>
</b-post>
