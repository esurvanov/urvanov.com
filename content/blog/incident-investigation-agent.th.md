---
title: สืบสวนเหตุขัดข้องด้วยเอเจนต์ AI: ข้อผิดพลาดใน Sentry และเมตริกใน Grafana รวมเป็นภาพเดียวผ่าน MCP
date: 2026-10-05
updated: 2026-11-13
description: วิธีสืบสวนเหตุขัดข้องด้วยเอเจนต์ AI: เชื่อม Sentry และ Grafana ผ่าน MCP ให้เอเจนต์จับคู่ข้อผิดพลาด เมตริก และเวลาปล่อยเวอร์ชัน จำกัดสิทธิ์ แล้วตรวจสมมติฐาน
tags: AI, เอเจนต์, MCP, Sentry, Grafana, เหตุขัดข้อง, harness
category: harness
layout: wide
mentions: MCP, Model Context Protocol, Sentry, Grafana, incident investigation, observability, Claude Code
toc: flow=ขั้นตอนการสืบสวน | connect=การเชื่อมต่อ | timeline=สิ่งที่เอเจนต์จับคู่ | rights=สิทธิ์และความเสี่ยง | first=เริ่มจากตรงไหน | faq=คำถาม | next=อ่านต่อ
---

ระหว่างเกิดเหตุขัดข้อง คนต้องสลับไปมาระหว่าง Sentry, Grafana และแชต แล้วประกอบภาพเอง เอเจนต์ที่เข้าถึงทั้งสองระบบได้จะรวบรวมข้อผิดพลาด เมตริก และเวลาของเหตุการณ์ไว้ในร่างเดียว ส่วนคนตรวจสมมติฐานและตัดสินใจว่าจะทำอะไรต่อ ด้านล่างอธิบายขั้นตอน วิธีเชื่อม Sentry และ Grafana และสิทธิ์ที่ควรให้ พื้นฐานอยู่ในบทความ [MCP สำหรับเอเจนต์ AI](/blog/mcp-agent-access/)

<b-post series="harness">

<b-chapter id="flow" icon="bug" title="ขั้นตอนการสืบสวน">
  <iso-art name="incident-investigation-agent/before-after"></iso-art>
  <b-finding>
    <ex>เอเจนต์อ่านข้อผิดพลาดใน Sentry และกราฟใน Grafana แล้วคนได้ร่างการสืบสวนหนึ่งฉบับ</ex>
    <gen>Sentry และ Grafana เชื่อมผ่าน MCP แบบอ่านอย่างเดียว เอเจนต์จึงไม่เปลี่ยนอะไรโดยไม่ได้รับอนุญาต คนเป็นผู้ตรวจสมมติฐาน</gen>
    <do k="ควรทำ">ไล่รายการระบบที่คุณเปิดหาสาเหตุในเหตุขัดข้องครั้งล่าสุด</do>
  </b-finding>
</b-chapter>

<b-chapter id="connect" icon="plug" title="เชื่อม Sentry และ Grafana อย่างไร">
  <b-say-agent title="บอกเอเจนต์">เชื่อม Sentry และ Grafana แบบอ่านอย่างเดียว หาข้อผิดพลาดใหม่ของบริการชำระเงินใน Sentry ในช่วงหนึ่งชั่วโมงที่ผ่านมา หาใน Grafana ว่าสัดส่วน response 5xx เพิ่มขึ้นเมื่อไร แล้วเทียบกับเวลาปล่อยเวอร์ชัน เสนอสมมติฐานและระบุแหล่งที่มาของทุกข้อเท็จจริง</b-say-agent>
  <b-why align="left">เอเจนต์รันคำสั่งเอง คุณเพียงล็อกอิน Sentry ผ่านเบราว์เซอร์และให้โทเคนของ Grafana [หากเอเจนต์ขอให้คุณทำเอง](/blog/agent-hands-work-back-to-you/)</b-why>
  <b-spoiler summary="ทำด้วยมืออย่างไร">
    <iso-art name="incident-investigation-agent/setup-steps"></iso-art>

#### Sentry

    <b-codebox copy>
      claude mcp add --transport http sentry https://mcp.sentry.dev/mcp
      /mcp   # sign in through the browser (OAuth)
    </b-codebox>

การล็อกอินใช้ OAuth โทเคนถูกเก็บและต่ออายุอัตโนมัติ

#### Grafana

    <b-codebox copy>
      claude mcp add --transport stdio \
        --env GRAFANA_URL=https://myinstance.grafana.net \
        --env GRAFANA_SERVICE_ACCOUNT_TOKEN=$GRAFANA_TOKEN \
        grafana -- uvx mcp-grafana --disable-write
    </b-codebox>

นี่คือเซิร์ฟเวอร์ทางการ <a href="https://github.com/grafana/mcp-grafana" target="_blank" rel="noopener">grafana/mcp-grafana</a> โทเคนมาจาก service account ที่มีสิทธิ์น้อยที่สุด และแฟลก --disable-write ห้ามการแก้ไข

  </b-spoiler>
  <b-finding>
    <ex>เอเจนต์เชื่อมทั้งสองระบบ หาข้อผิดพลาดและกราฟ จับคู่กับเวลาปล่อยเวอร์ชัน และระบุแหล่งที่มา</ex>
    <gen>ทั้งสองระบบเชื่อมได้ด้วยคำสั่งเดียว และสิทธิ์อ่านอย่างเดียวทำให้การสืบสวนปลอดภัย</gen>
    <do k="ควรทำ">มอบหมายการเชื่อมต่อให้เอเจนต์ แล้วเทียบผลลัพธ์กับที่คุณเห็นเองใน Sentry และ Grafana</do>
  </b-finding>
</b-chapter>

<b-chapter id="timeline" icon="lines" title="สิ่งที่เอเจนต์จับคู่">
  <iso-art name="incident-investigation-agent/event-timeline"></iso-art>
  <b-finding>
    <ex>การปล่อยเวอร์ชันขึ้น [production](/materials/glossary/prod/) ข้อผิดพลาดที่พุ่งขึ้น และการแจ้งเตือน ถูกวางบนไทม์ไลน์เดียว ทำให้เห็นว่าอะไรเกิดก่อน</ex>
    <gen>เวลาที่ตรงกันให้สมมติฐาน แต่ไม่พิสูจน์สาเหตุ: การตรวจสอบยังเป็นหน้าที่ของคน</gen>
    <do k="ควรทำ">ขอลิงก์ไปยังกราฟหรือเหตุการณ์ประกอบทุกข้อสรุป</do>
  </b-finding>
</b-chapter>

<b-chapter id="rights" icon="shield-check" title="สิทธิ์และความเสี่ยง">
  <iso-art name="incident-investigation-agent/rights-ladder"></iso-art>
  <b-rules sw="1.8">
    <rule icon="key" t="โทเคน">service account ของ Grafana ที่มีสิทธิ์น้อยที่สุด ค่าเก็บในตัวแปรสภาพแวดล้อม</rule>
    <rule icon="lock" t="อ่านอย่างเดียว">แฟลก --disable-write ห้ามการแก้ไข รวมถึงการสร้าง incident</rule>
    <rule icon="ban" t="เซิร์ฟเวอร์ของบุคคลที่สาม">เชื่อมเฉพาะเซิร์ฟเวอร์ที่ไว้ใจได้: เซิร์ฟเวอร์ที่อ่านข้อความจากภายนอกเปิดทางให้การโจมตีแบบ prompt injection</rule>
  </b-rules>
  <b-finding>
    <ex>เอเจนต์อ่านข้อผิดพลาดและกราฟ และไม่มีสิทธิ์เปลี่ยนอะไรในระบบ</ex>
    <gen>สิทธิ์ให้แยกตามแหล่งข้อมูล และสิทธิ์ที่กว้างที่สุดยังคงปิดไว้</gen>
    <do k="ควรทำ">สร้าง service account แบบอ่านอย่างเดียว และเชื่อม Grafana ด้วยแฟลก --disable-write</do>
  </b-finding>
</b-chapter>

<b-chapter id="first" icon="flag" title="เริ่มจากตรงไหน">
  <iso-art name="incident-investigation-agent/start-steps"></iso-art>
  <b-finding>
    <ex>สามขั้นตอน: Sentry, Grafana, ทดสอบกับเหตุขัดข้องในอดีต</ex>
    <gen>คุณรู้เรื่องเหตุขัดข้องในอดีตอยู่แล้ว จึงเห็นว่าเอเจนต์หาสาเหตุเจอตรงไหนและพลาดตรงไหน</gen>
    <do k="ควรทำ">เลือกเหตุขัดข้องที่ปิดไปแล้ว แล้วให้เอเจนต์หาสาเหตุผ่าน Sentry และ Grafana</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="คำถามที่พบบ่อย">
  <b-faq-cards>
    <q t="เอเจนต์ AI ช่วยสืบสวนเหตุขัดข้องอย่างไร?">รวบรวมข้อผิดพลาดจาก Sentry เมตริกจาก Grafana และเวลาของเหตุการณ์ไว้ในร่างเดียว ส่วนคนตรวจสมมติฐานและตัดสินใจว่าจะทำอะไรต่อ</q>
    <q t="เชื่อม Sentry และ Grafana กับเอเจนต์อย่างไร?">ผ่าน MCP ด้วยคำสั่ง โดยให้สิทธิ์อ่านอย่างเดียว</q>
    <q t="เชื่อข้อสรุปของเอเจนต์ได้หรือไม่?">เวลาที่ตรงกันให้สมมติฐาน แต่ไม่พิสูจน์สาเหตุ การตรวจสอบยังเป็นหน้าที่ของคน</q>
    <q t="ควรให้เอเจนต์มีสิทธิ์อะไรบ้าง?">แยกตามแหล่งข้อมูล และอ่านอย่างเดียว สิทธิ์ที่กว้างที่สุดให้ปิดไว้</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="อ่านต่อ">
  <b-links>
    <item href="/blog/mcp-agent-access/" k="พื้นฐาน" t="MCP สำหรับเอเจนต์ AI: แก้ปัญหาอะไร และมอบหมายการเชื่อมต่อให้เอเจนต์อย่างไร">MCP คืออะไรและเชื่อมอย่างไร</item>
    <item href="/blog/analytics-reports-agent/" k="อีกกรณี" t="รายงานเชิงวิเคราะห์ด้วยเอเจนต์ AI">ฐานข้อมูล ชีต และเอกสารผ่าน MCP</item>
    <item href="/blog/mcp-scopes/" k="ตั้งค่า" t="ขอบเขต MCP ใน Claude Code: local, project และ user — เซิร์ฟเวอร์เก็บที่ไหนและใครเห็น">เซิร์ฟเวอร์อยู่ที่ไหนและใครเห็น</item>
  </b-links>
</b-chapter>
<b-footer>เหตุขัดข้องนี้สมมติขึ้น การเชื่อม Sentry อ้างอิงเอกสาร Claude Code: <a href="https://code.claude.com/docs/en/mcp" target="_blank" rel="noopener">MCP</a> ส่วน Grafana อ้างอิงรีโพซิทอรี <a href="https://github.com/grafana/mcp-grafana" target="_blank" rel="noopener">grafana/mcp-grafana</a></b-footer>
</b-post>
