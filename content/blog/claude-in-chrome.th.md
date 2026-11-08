---
title: Claude Code ทดสอบเว็บไซต์ในเบราว์เซอร์ของคุณได้อย่างไร: Claude in Chrome ดีบักและกรอกฟอร์มภายใต้การล็อกอินของคุณ
date: 2026-10-05
updated: 2026-11-08
description: Claude in Chrome เชื่อม Claude Code กับเบราว์เซอร์ เอเจนต์เปิดแท็บ อ่านคอนโซล รันสถานการณ์ทดสอบ และกรอกฟอร์มภายใต้การล็อกอินของคุณ เชื่อมต่ออย่างไร ทำอะไรได้บ้าง และควรให้สิทธิ์อะไร
tags: AI, เอเจนต์, Claude Code, Claude in Chrome, เบราว์เซอร์, QA, harness
category: harness
layout: wide
mentions: Claude in Chrome, Claude Code, Chrome extension, browser automation, MCP, permissions, QA, Puppeteer, token cost
toc: what=คืออะไร | connect=การเชื่อมต่อ | gives=ทำอะไรได้ | qa=ตัวอย่าง | risks=สิทธิ์และความเสี่ยง | tradeoff=ราคาของความยืดหยุ่น | custom=สคริปต์เอง | first=เริ่มที่ไหน | faq=คำถามที่พบบ่อย | next=ต่อไป
---

Claude in Chrome เชื่อมเอเจนต์กับเบราว์เซอร์ของคุณ เอเจนต์เปิดแท็บ อ่านหน้าเว็บและคอนโซล คลิกและพิมพ์ภายใต้การล็อกอินของคุณ ด้านล่างอธิบายว่าทำงานอย่างไร เชื่อมต่อได้ในไม่กี่นาทีอย่างไร เอเจนต์ทำอะไรได้ และควรให้สิทธิ์อะไร เอเจนต์จากบทความ [QA ด้วยเอเจนต์](/blog/bug-report-to-reproduction-agent/) ใช้ช่องทางนี้ และการเชื่อมต่อทำงานคล้าย [MCP](/blog/mcp-agent-access/)

<b-post series="harness">

<b-chapter id="what" icon="monitor" title="Claude in Chrome คืออะไร">
  <b-why>ส่วนขยายของ Chrome เชื่อม Claude Code กับเบราว์เซอร์ เอเจนต์เปิดแท็บใหม่และทำงานในหน้าต่างที่มองเห็นได้<b-proof href="https://code.claude.com/docs/en/chrome" quote="Browser actions run in a visible Chrome window in real time."/></b-why>
  <iso-art name="claude-in-chrome/terminal-to-browser"></iso-art>
  <b-why align="left">ภาพแสดงผู้เข้าร่วมสามฝ่ายจากซ้ายไปขวา คือ Claude Code ในเทอร์มินัล ส่วนขยาย และเบราว์เซอร์ของคุณ เอเจนต์ส่งคำสั่งให้ส่วนขยาย (เปิดแท็บ คลิก อ่านหน้า) และส่วนขยายทำตามในเบราว์เซอร์ที่คุณล็อกอินบริการต่าง ๆ ไว้แล้ว เอเจนต์จึงไม่ต้องพิมพ์รหัสผ่าน เพราะเซสชันของคุณเปิดอยู่แล้ว<b-proof href="https://code.claude.com/docs/en/chrome" quote="shares your browser's login state"/> งานเกิดในหน้าต่างที่มองเห็นได้ และคุณติดตามขั้นตอนได้</b-why>
  <b-why align="left">แท็กด้านล่างแสดงเบราว์เซอร์ที่ส่วนขยายใช้ได้ Chrome และ Edge รองรับอย่างเป็นทางการ<b-proof href="https://code.claude.com/docs/en/chrome" quote="Chrome integration works with Google Chrome and Microsoft Edge."/> Brave, Arc, Vivaldi และ Opera สร้างบนเอนจิน Chromium เดียวกัน Claude Code พบส่วนขยายในนั้นและเชื่อมต่อได้<b-proof href="https://code.claude.com/docs/en/chrome" quote="Claude Code also detects the extension and sets up the connection in other Chromium-based browsers"/> แท็กสุดท้าย “WSL: no” หมายความว่าการเชื่อมต่อนี้ใช้ไม่ได้ใน Windows Subsystem for Linux (WSL)<b-proof href="https://code.claude.com/docs/en/chrome" quote="Chrome integration isn't supported in Windows Subsystem for Linux (WSL)."/></b-why>
  <b-pills>
    <pill>Chrome</pill>
    <pill>Edge</pill>
    <pill>Brave</pill>
    <pill>Arc</pill>
    <pill>Vivaldi</pill>
    <pill>Opera</pill>
    <pill>WSL: no</pill>
  </b-pills>
  <b-finding>
    <ex>เอเจนต์ในเทอร์มินัลควบคุมแท็บของ Chrome ผ่านส่วนขยายและใช้การล็อกอินของคุณ</ex>
    <gen>การกระทำมองเห็นได้ในหน้าต่างแบบเรียลไทม์ เมื่อเจอหน้าล็อกอินหรือ CAPTCHA เอเจนต์หยุดและรอคุณ ใน Claude Code ส่วนขยายปรากฏเป็น MCP server ชื่อ claude-in-chrome และ /mcp แสดงรายการเครื่องมือของมัน</gen>
    <do k="ทำอย่างไร">ตรวจข้อกำหนด คือส่วนขยายเวอร์ชัน 1.0.36 ขึ้นไป<b-proof href="https://code.claude.com/docs/en/chrome" quote="version 1.0.36 or later"/> Claude Code แผน Pro, Max, Team หรือ Enterprise<b-proof href="https://code.claude.com/docs/en/chrome" quote="A direct Anthropic plan (Pro, Max, Team, or Enterprise)"/> และลงชื่อเข้าใช้ด้วย /login<b-proof href="https://code.claude.com/docs/en/chrome" quote="Chrome integration also requires signing in with"/></do>
  </b-finding>
</b-chapter>

<b-chapter id="connect" icon="plug" title="เชื่อมต่ออย่างไร">
  <b-say-agent title="บอกเอเจนต์">ติดตั้ง Claude in Chrome และเชื่อมต่อกับ Claude Code</b-say-agent>
  <b-why align="left">ถ้ายังไม่มีส่วนขยาย Claude Code จะเสนอให้ติดตั้ง<b-proof href="https://code.claude.com/docs/en/chrome" quote="Claude Code shows an install prompt titled"/> คุณตกลงและลงชื่อเข้าใช้ผ่านเบราว์เซอร์ [ถ้าเอเจนต์ขอให้คุณทำเอง](/blog/agent-hands-work-back-to-you/)</b-why>
  <b-spoiler summary="ทำด้วยมืออย่างไร">
    <b-why align="left">การเชื่อมต่อมีสามขั้น ขั้นที่ 1: ติดตั้งส่วนขยาย Claude ใน Chrome ของคุณจากร้านส่วนขยาย ทำครั้งเดียว ขั้นที่ 2: ในเทอร์มินัลที่ Claude Code รันอยู่ เริ่ม claude --chrome แล้วเอเจนต์จะเชื่อมกับเบราว์เซอร์ ขั้นที่ 3: พิมพ์ /chrome แล้วดูสถานะ ถ้าขึ้น “Enabled” แสดงว่าเชื่อมต่อใช้งานได้</b-why>
    <iso-art name="claude-in-chrome/setup-steps"></iso-art>
    <b-codebox copy>
      claude --chrome
      /chrome   # status, permissions, reconnect
    </b-codebox>

<a href="https://chromewebstore.google.com/detail/claude/fcoeoabgfenejglbffodgkkbkcdhcgfn" target="_blank" rel="noopener">ส่วนขยายใน Chrome Web Store</a> หากไม่ต้องการใช้แฟลก ให้เปิด /chrome แล้วเปิด “Enabled by default” จากนั้นเครื่องมือของเบราว์เซอร์จะอยู่ในบริบทเสมอ และการใช้โทเค็นเพิ่มขึ้น<b-proof href="https://code.claude.com/docs/en/chrome" quote="Enabling Chrome by default increases context usage since the browser tools and their instructions are always loaded."/>

    <b-spoiler summary="ถ้าเชื่อมต่อไม่ได้">
      <b-node-grid min="170">
        <node icon="check" t="ส่วนขยายเปิดอยู่">ในหน้า chrome://extensions</node>
        <node icon="play" t="Chrome กำลังรัน">และ Claude Code เป็นเวอร์ชันล่าสุด</node>
        <node icon="refresh-cw" t="เชื่อมต่อใหม่">คำสั่ง /chrome เลือก Reconnect extension</node>
        <node icon="monitor-screen" t="ครั้งแรก">รีสตาร์ท Chrome หลังติดตั้ง</node>
      </b-node-grid>
    </b-spoiler>
  </b-spoiler>
  <b-finding>
    <ex>เอเจนต์ติดตั้งส่วนขยายเองและเชื่อมต่อกับ Claude Code คุณเพียงตกลงและลงชื่อเข้าใช้ผ่านเบราว์เซอร์</ex>
    <gen>การเชื่อมต่อใช้เวลาไม่กี่นาที ส่วนขยายมาจาก Chrome Web Store และ Claude Code ทำที่เหลือ</gen>
    <do k="ทำอย่างไร">บอกเอเจนต์ให้ติดตั้งส่วนขยาย และตรวจว่า /chrome แสดง “Status: Enabled” และ “Extension: Installed”<b-proof href="https://code.claude.com/docs/en/chrome" quote="The integration is working when the status panel shows"/></do>
  </b-finding>
</b-chapter>

<b-chapter id="gives" icon="grid-alt" title="เอเจนต์ทำอะไรได้ในเบราว์เซอร์">
  <b-why align="left">ตรงกลางภาพคือเบราว์เซอร์ และรอบ ๆ คืองานสี่แบบที่เอเจนต์ทำภายใน</b-why>
  <iso-art name="claude-in-chrome/browser-uses"></iso-art>
  <b-why align="left">แบบที่หนึ่ง: อ่านคอนโซลและหน้าเว็บ ซึ่งใช้หาสาเหตุของข้อผิดพลาด แบบที่สอง: รันสถานการณ์ทดสอบและกรอกฟอร์ม เพื่อตรวจว่าเส้นทางใช้งานได้ แบบที่สาม: ทำงานกับเอกสารภายใต้การล็อกอินของคุณ คือสิ่งที่เปิดไม่ได้ถ้าไม่ลงชื่อเข้าใช้ แบบที่สี่: ดึงข้อมูลและบันทึก GIF เพื่อให้มีร่องรอยไว้ตรวจสอบ ไม่ต้องเขียนโค้ดสำหรับทุกเรื่องเล็ก ๆ คุณบอกงานเป็นคำพูด และเอเจนต์หาปุ่มกับช่องเอง</b-why>
  <b-finding>
    <ex>การเชื่อมต่อเดียวครอบคลุมการดีบัก การทดสอบ ฟอร์ม เอกสาร และการดึงข้อมูล</ex>
    <gen>เอเจนต์อ่านคอนโซลและ DOM รันสถานการณ์ทดสอบ กรอกฟอร์ม อัปโหลดไฟล์ (รวมสูงสุด 10 MB<b-proof href="https://code.claude.com/docs/en/chrome" quote="a single upload can include up to 10 MB of files in total"/>) และบันทึก GIF<b-proof href="https://code.claude.com/docs/en/chrome" quote="record browser interactions as GIFs"/></gen>
    <do k="ทำอย่างไร">เลือกงานเบราว์เซอร์ที่ทำซ้ำหนึ่งอย่างแล้วมอบให้เอเจนต์</do>
  </b-finding>
</b-chapter>

<b-chapter id="qa" icon="bug" title="ตัวอย่าง: บั๊กบนสภาพแวดล้อมทดสอบ">
  <b-why>ตั๋ว PAY-142 จากบทความ [เรื่อง QA ด้วยเอเจนต์](/blog/bug-report-to-reproduction-agent/): เอเจนต์เดินตามเส้นทางเองและนำหลักฐานมาให้</b-why>
  <b-say-agent title="บอกเอเจนต์">เปิดสภาพแวดล้อมทดสอบ เพิ่มสินค้าลงตะกร้า ใช้รหัสโปรโมชัน และชำระด้วยบัตรทดสอบ ถ้าการชำระเงินล้มเหลว ให้ดูคอนโซลและบันทึก GIF ของเส้นทาง</b-say-agent>
  <b-why align="left">ต่อไปเป็นตัวอย่างจากบทความ QA คือตั๋ว PAY-142 และเส้นทางของเอเจนต์จนได้ผลลัพธ์สำเร็จรูป</b-why>
  <iso-art name="claude-in-chrome/ticket-to-report"></iso-art>
  <b-why align="left">ภาพแสดงเส้นทางจากตั๋วถึงผลลัพธ์ ตั๋วไปถึงเอเจนต์ เอเจนต์เดินผ่านตะกร้า รหัสโปรโมชัน และการชำระเงินในเบราว์เซอร์ พบข้อผิดพลาดในคอนโซลและบันทึก GIF QA ได้รับร่องรอยที่ตรวจสอบได้ ไม่ใช่การเล่าซ้ำ คือข้อความในคอนโซลและการบันทึกการเคลื่อนไหวบนหน้า ถ้าการบันทึกและคอนโซลไม่ตรงกับรายงาน จะเห็นทันที</b-why>
  <b-finding>
    <ex>เอเจนต์เดินตามเส้นทาง พบข้อผิดพลาดในคอนโซล และบันทึก GIF สำหรับตั๋ว</ex>
    <gen>หน้าต่างมองเห็นได้ QA จึงติดตามขั้นตอนและหยุดเอเจนต์ได้ ข้อความในคอนโซลและ GIF ทิ้งร่องรอยที่ตรวจสอบได้</gen>
    <do k="ทำอย่างไร">ขอ GIF และตัวอย่างจากคอนโซลทุกครั้งที่ได้ผลลัพธ์</do>
  </b-finding>
</b-chapter>

<b-chapter id="risks" icon="shield-check" title="สิทธิ์และความเสี่ยง">
  <b-why align="left">เอเจนต์ทำงานภายในเบราว์เซอร์ของคุณ ทุกอย่างที่คุณล็อกอินอยู่จึงเข้าถึงได้ ด่านป้องกันแรกในภาพคือรายการเว็บไซต์ที่อนุญาตและคำขอสิทธิ์สำหรับเว็บไซต์ใหม่</b-why>
  <iso-art name="claude-in-chrome/site-permissions"></iso-art>
  <b-why align="left">ทางซ้ายของภาพคุณเป็นผู้ตัดสินใจ เอเจนต์ถามว่า “อนุญาตไหม” ตรงกลางคือเว็บไซต์ A และ B ที่คุณอนุญาตและเอเจนต์ทำงานอยู่ ทางขวาคือเว็บไซต์ C ที่ปิดไม่ให้เอเจนต์เข้า การกระทำบนเว็บไซต์ใหม่เริ่มจากความยินยอมของคุณ ด้านล่างเป็นกฎทีละข้อ คือเอเจนต์เห็นอะไร หยุดตรงไหน และควรดูอะไรก่อนส่งการบันทึก</b-why>
  <b-rules sw="1.8">
    <rule icon="lines" t="เว็บไซต์">การตั้งค่าของส่วนขยายควบคุมว่าเอเจนต์เข้าดู คลิก และพิมพ์บนเว็บไซต์ใดได้</rule>
    <rule icon="bell" t="คำขอ">กล่องโต้ตอบ “Claude in Chrome wants to” อนุญาตการกระทำหนึ่งอย่างหรือทั้งเว็บไซต์สำหรับเซสชัน</rule>
    <rule icon="key" t="การล็อกอินของคุณ">เอเจนต์เข้าถึงทุกอย่างที่คุณลงชื่อเข้าใช้ในเบราว์เซอร์นี้ได้</rule>
    <rule icon="pause" t="ล็อกอินและ CAPTCHA">เอเจนต์หยุดและรอคุณ</rule>
    <rule icon="video" t="GIF">การบันทึกรวมทุกอย่างที่มองเห็น รวมถึงรายละเอียดบัญชี ตรวจทานก่อนแชร์</rule>
    <rule icon="ban" t="กล่องโต้ตอบ">กล่องโต้ตอบ alert, confirm และ prompt ขวางคำสั่ง ปิดด้วยมือแล้วบอกเอเจนต์ให้ทำต่อ</rule>
  </b-rules>
  <b-why align="left">กฎเหล่านี้ทุกข้ออยู่ในเอกสารของ Claude Code เอเจนต์หยุดที่หน้าล็อกอินและ CAPTCHA<b-proof href="https://code.claude.com/docs/en/chrome" quote="When Claude encounters a login page or CAPTCHA, it pauses and asks you to handle it manually."/> คำขอสิทธิ์เริ่มด้วย “Claude in Chrome wants to”<b-proof href="https://code.claude.com/docs/en/chrome" quote="The dialog starts with"/> การบันทึก GIF จับทุกอย่างที่มองเห็น รวมถึงรายละเอียดบัญชี<b-proof href="https://code.claude.com/docs/en/chrome" quote="The recording captures everything visible in the browser, including account details on logged-in pages"/> กล่องโต้ตอบ alert, confirm และ prompt ขวางคำสั่ง<b-proof href="https://code.claude.com/docs/en/chrome" quote="JavaScript dialogs block browser events and prevent Claude from receiving commands."/> รายการเว็บไซต์ตั้งในการตั้งค่าของส่วนขยาย<b-proof href="https://code.claude.com/docs/en/chrome" quote="Manage permissions in the Chrome extension settings to control which sites Claude can browse, click, and type on."/></b-why>
  <b-cap>ข้อความบนหน้าเว็บอาจมุ่งเป้าที่เอเจนต์ได้ ความเสี่ยงนี้อธิบายไว้ใน[บทความแยก](/blog/data-plane-control-plane-prompt-injection/)</b-cap>
  <b-finding>
    <ex>เว็บไซต์ที่อนุญาตเปิดให้เอเจนต์ ที่เหลือปิดอยู่ และการกระทำบนเว็บไซต์ใหม่ต้องได้รับความยินยอมจากคุณ</ex>
    <gen>เอเจนต์ทำงานด้วยการล็อกอินของคุณ สิทธิ์ของเว็บไซต์จึงเป็นด่านป้องกันแรก</gen>
    <do k="ทำอย่างไร">เปิดการตั้งค่าของส่วนขยายและเก็บเฉพาะเว็บไซต์ที่งานต้องใช้</do>
  </b-finding>
</b-chapter>

<b-chapter id="tradeoff" icon="scales" title="ราคาของความยืดหยุ่น: ช้ากว่าสคริปต์และเสี่ยงผิดพลาด">
  <b-why align="left">เอเจนต์ในเบราว์เซอร์ทำงานต่างจากสคริปต์หรือโปรแกรมที่เขียนไว้ สคริปต์รันขั้นตอนเดิมเร็วและเหมือนเดิมทุกครั้ง ส่วนเอเจนต์ในทุกขั้นจะอ่านหน้า คิด และตัดสินใจว่าจะทำอะไรต่อ จึงช้ากว่าและใช้โทเค็น มันผิดพลาดได้ เช่นคลิกผิดปุ่มหรือเล่าสิ่งที่ไม่มีบนหน้า ซึ่งก็คือ[hallucination](/materials/glossary/hallucination/) แต่ในทางกลับกัน มันรับมือกับงานที่อธิบายเป็นโค้ดล่วงหน้าไม่ได้ เช่นหน้าเปลี่ยน ปุ่มย้ายที่ หรืองานที่ระบุเป็นคำพูด นี่คือราคาของความยืดหยุ่น และควรจ่ายอย่างรู้ตัว</b-why>
  <b-table id="agent-vs-script">

| | สคริปต์ | เอเจนต์ในเบราว์เซอร์ |
|---|---|---|
| ความเร็ว | เร็ว ขั้นตอนเดิม | ช้ากว่า อ่านและคิดทุกขั้น |
| ความซ้ำได้ | ผลเดิมทุกครั้ง | คำตอบอาจต่างกันในแต่ละรอบ |
| ถ้าหน้าเปลี่ยน | พังจนกว่าจะแก้ | ปรับตัวได้ แต่อาจผิดหรือแต่งเรื่อง |
| การเตรียมตัว | ต้องเขียนและดูแลโค้ด | อธิบายงานเป็นคำพูดก็พอ |
| เหมาะกับ | งานประจำจำนวนมาก | งานครั้งเดียว การสำรวจ หน้าที่ไม่ปกติ |

  </b-table>
  <b-why align="left">มีข้อสังเกตของผู้เขียนอีกข้อ บริการที่เข้มงวดเรื่องระบบอัตโนมัติ เช่น LinkedIn มักปฏิบัติต่อเอเจนต์ในเบราว์เซอร์จริงอย่างผ่อนปรนกว่าสคริปต์และตัวขูดข้อมูล เพราะการกระทำมาจากหน้าต่างของคุณ ภายใต้การล็อกอินของคุณ ด้วยจังหวะของคนจริง นี่ไม่ใช่การรับประกัน กฎของบริการเหล่านี้มักห้ามการกระทำอัตโนมัติ และความเสี่ยงที่บัญชีถูกแบนยังอยู่กับคุณ ดังนั้นควรให้เอเจนต์ทำสิ่งที่คุณจะทำด้วยมือ ทีละน้อยและตรวจผลลัพธ์</b-why>
  <b-cap>ความเร็ว ข้อผิดพลาดของเอเจนต์ และปฏิกิริยาของบริการ อธิบายจากข้อสังเกตของผู้เขียน เอกสารของ Claude Code ไม่ได้กล่าวถึง</b-cap>
  <b-finding>
    <ex>เอเจนต์ช้ากว่าสคริปต์และอาจผิดพลาด แต่รับมือได้ในที่ที่สคริปต์ต้องเขียนใหม่</ex>
    <gen>แลกความเร็วและความซ้ำได้กับความยืดหยุ่น ร่องรอยที่ตรวจสอบได้ (คอนโซล GIF ข้อความผลลัพธ์) นำการควบคุมข้อผิดพลาดกลับมา</gen>
    <do k="ทำอย่างไร">สำหรับงานครั้งเดียวและงานที่ไม่ปกติ ใช้เอเจนต์ สำหรับงานประจำจำนวนมาก เขียนสคริปต์ เปรียบเทียบผลลัพธ์ของเอเจนต์กับสิ่งที่คุณเห็นเอง</do>
  </b-finding>
</b-chapter>

<b-chapter id="custom" icon="boxes-route" title="เมื่อต้องมีสคริปต์ของตัวเอง">
  <b-why align="left">Claude in Chrome เหมาะกับงานครั้งเดียว แต่งานในระบบจริงมักต้องมีสคริปต์ของตัวเอง</b-why>
  <b-rules sw="1.8">
    <rule icon="code" t="Puppeteer">ไลบรารีที่ควบคุมเบราว์เซอร์จากโค้ด เปิดหน้า คลิก ดึงสิ่งที่ต้องการ รันได้โดยไม่ต้องมีเอเจนต์ในทุกขั้น</rule>
    <rule icon="page-lines" t="ทั้งหน้า">Claude Code รับทั้งหน้า คือข้อความ องค์ประกอบ และภาพหน้าจอ สะดวกสำหรับงานครั้งเดียว</rule>
    <rule icon="coin" t="โทเค็นและความเร็ว">หน้ายิ่งใหญ่ โทเค็นในแต่ละขั้นยิ่งมาก ช้าลงและแพงขึ้น</rule>
    <rule icon="boxes-route" t="สคริปต์ของตัวเอง">วิธีแก้ที่ทำเองรับเฉพาะส่วนของเว็บไซต์หรือหน้าที่ต้องใช้ เช่นตาราง ฟอร์ม หรือบล็อกเดียว เอเจนต์ได้ผลลัพธ์สั้น</rule>
    <rule icon="scales" t="เลือกอะไร">งานครั้งเดียวและการสำรวจ: Claude in Chrome งานประจำที่ปริมาณมากและมีงบโทเค็น: สคริปต์ของตัวเองที่เอเจนต์เรียกเป็นเครื่องมือ</rule>
  </b-rules>
  <b-cap>สคริปต์เชื่อมกับเอเจนต์ได้ผ่าน [MCP](/blog/mcp-agent-access/) หรือ skill เอเจนต์ขอส่วนของหน้าที่ต้องการแทนการเปิดทั้งหน้า</b-cap>
  <b-finding>
    <ex>เอเจนต์อ่านทั้งหน้าและใช้โทเค็นกับเวลาไปกับมัน</ex>
    <gen>สำหรับระบบจริง โทเค็นและความเร็วสำคัญ จึงควรรับเฉพาะส่วนของเว็บไซต์และหน้าที่จำเป็น</gen>
    <do k="ทำอย่างไร">ปล่อยงานครั้งเดียวให้ Claude in Chrome ย้ายงานที่ทำซ้ำไปเป็นสคริปต์ Puppeteer แล้วมอบให้เอเจนต์</do>
  </b-finding>
</b-chapter>

<b-chapter id="first" icon="flag" title="เริ่มที่ไหน">
  <b-why align="left">สามขั้นซ้ำกับตอนต้นบทความ คือส่วนขยาย เริ่มใช้งาน ตรวจสอบ</b-why>
  <iso-art name="claude-in-chrome/start-steps"></iso-art>
  <b-why align="left">สำหรับการเริ่มครั้งแรก ใช้สภาพแวดล้อมในเครื่องหรือสภาพแวดล้อมทดสอบ ถ้าเอเจนต์ผิดพลาดก็ไม่เสียหาย ขอให้มันอ่านอย่างเดียวก่อน (เปิดหน้าแล้วเล่าซ้ำ) แล้วค่อยอนุญาตการกระทำ วิธีนี้ทำให้สังเกตข้อผิดพลาดของเอเจนต์ในงานที่ปลอดภัย</b-why>
  <b-finding>
    <ex>สามขั้น: ส่วนขยาย เริ่มใช้งาน ตรวจสอบ</ex>
    <gen>เริ่มจากสภาพแวดล้อมในเครื่อง ข้อผิดพลาดตรงนั้นไม่ทำให้อะไรพัง</gen>
    <do k="ทำอย่างไร">วันนี้ บอกเอเจนต์ให้ติดตั้งส่วนขยายและตรวจสถานะด้วย /chrome</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="คำถามที่พบบ่อย">
  <b-faq-cards>
    <q t="เชื่อมต่อ Claude in Chrome อย่างไร">ติดตั้งส่วนขยายจาก Chrome Web Store แล้ว Claude Code ทำที่เหลือ ใช้เวลาไม่กี่นาที</q>
    <q t="เอเจนต์ทำอะไรในเบราว์เซอร์ได้บ้าง">อ่านคอนโซลและมาร์กอัปของหน้า รันสถานการณ์ทดสอบ กรอกฟอร์ม อัปโหลดไฟล์รวมไม่เกิน 10 MB และบันทึก GIF</q>
    <q t="ให้เอเจนต์ใช้เบราว์เซอร์ปลอดภัยไหม">การกระทำมองเห็นได้ในหน้าต่างแบบเรียลไทม์ และเมื่อเจอหน้าลงชื่อเข้าใช้หรือ CAPTCHA เอเจนต์หยุดและรอคุณ สิทธิ์และความเสี่ยงอธิบายแยกไว้ในบทความ</q>
    <q t="เมื่อไรสคริปต์ดีกว่า">เอเจนต์ในเบราว์เซอร์ช้ากว่าสคริปต์และผิดพลาดได้ สำหรับการตรวจซ้ำที่ความเร็วและความแม่นยำสำคัญ ให้เขียนสคริปต์</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="ต่อไป">
  <b-links>
    <item href="/blog/bug-report-to-reproduction-agent/" k="ตัวอย่าง" t="งานของ QA หลังมีเอเจนต์ AI ช่วย: ศึกษา อธิบาย และบันทึกผ่าน MCP และ skill">เอเจนต์ทำซ้ำบั๊กจาก Jira</item>
    <item href="/blog/mcp-agent-access/" k="การเชื่อมต่อ" t="MCP สำหรับเอเจนต์ AI: แก้ปัญหาอะไร และมอบหมายให้เอเจนต์เชื่อมต่อเองอย่างไร">เอเจนต์เข้าถึงระบบต่าง ๆ ได้อย่างไร</item>
    <item href="/blog/agent-hands-work-back-to-you/" k="ส่งต่องาน" t="เอเจนต์ชอบโยนงานให้คุณ: ทำให้มันทำเองได้อย่างไร">เมื่อเอเจนต์ขอความช่วยเหลือจากคน</item>
  </b-links>
</b-chapter>
<b-footer>ตั๋ว PAY-142 สมมติขึ้นสำหรับตัวอย่าง ข้อเท็จจริงเรื่องการเชื่อมต่อและสิทธิ์อิงเอกสารของ Claude Code: <a href="https://code.claude.com/docs/en/chrome" target="_blank" rel="noopener">Use Claude Code with Chrome</a></b-footer>
</b-post>
