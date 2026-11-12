---
title: ขอบเขต MCP ใน Claude Code: local, project และ user — เซิร์ฟเวอร์เก็บที่ไหนและใครเห็น
date: 2026-10-05
updated: 2026-11-13
description: ขอบเขตของเซิร์ฟเวอร์ MCP ใน Claude Code มีสามแบบ คือ local, project และ user การตั้งค่าอยู่ที่ไหน ใครเห็น อะไรชนะเมื่อชื่อซ้ำกัน แชร์เซิร์ฟเวอร์กับทีมอย่างไร และเก็บความลับไม่ให้หลุดเข้า commit
tags: AI, เอเจนต์, MCP, Claude Code, ทีม, harness
category: harness
layout: wide
mentions: MCP, Model Context Protocol, Claude Code, mcp scope, .mcp.json, environment variables
toc: what=สามขอบเขต | pick=เลือกแบบไหน | order=อะไรชนะ | team=Project สำหรับทีม | secrets=ความลับ | first=เริ่มจากตรงไหน | faq=คำถาม | next=อ่านต่อ
---

ขอบเขต (scope) ของเซิร์ฟเวอร์ MCP ตอบสองคำถาม คือเซิร์ฟเวอร์ทำงานในโปรเจกต์ไหน และใครเห็นเซิร์ฟเวอร์นั้น Claude Code มีสามขอบเขต: local, project และ user ด้านล่างอธิบายความต่าง วิธีเลือก อะไรชนะเมื่อชื่อซ้ำกัน และวิธีแชร์เซิร์ฟเวอร์กับทีม MCP คืออะไรและเชื่อมอย่างไร อยู่ในบทความ [MCP สำหรับเอเจนต์ AI](/blog/mcp-agent-access/)

<b-post series="harness">

<b-chapter id="what" icon="layers" title="สามขอบเขต">
  <iso-art name="mcp-scopes/scopes"></iso-art>
  <b-table code="prose">
| ขอบเขต | ทำงานใน | ใครเห็น | เก็บใน |
|---|---|---|---|
| Local | โปรเจกต์ปัจจุบัน | เฉพาะคุณ | `~/.claude.json` |
| Project | โปรเจกต์ปัจจุบัน | ทั้งทีม ผ่านรีโพซิทอรี | `.mcp.json` ที่ราก |
| User | ทุกโปรเจกต์ของคุณ | เฉพาะคุณ | `~/.claude.json` |
  </b-table>
  <b-finding>
    <ex>เซิร์ฟเวอร์ตัวเดียวกันเชื่อมได้สามแบบ: เฉพาะคุณในโปรเจกต์เดียว ทั้งทีม หรือทุกโปรเจกต์ของคุณ</ex>
    <gen>Local เป็นค่าเริ่มต้น: เซิร์ฟเวอร์มองเห็นเฉพาะคุณและเฉพาะในโปรเจกต์นี้</gen>
    <do k="ควรทำ">ดูว่าเซิร์ฟเวอร์แต่ละตัวอยู่ในขอบเขตไหน: claude mcp list</do>
  </b-finding>
</b-chapter>

<b-chapter id="pick" icon="help" title="เลือกแบบไหน">
  <b-say-agent title="บอกเอเจนต์">แสดงว่าเซิร์ฟเวอร์ MCP ของฉันตั้งค่าอยู่ในขอบเขตไหนบ้าง และแนะนำว่าตัวไหนควรย้ายไป project เพื่อให้ทีมใช้</b-say-agent>
  <b-why align="left">เอเจนต์รันคำสั่งเอง: claude mcp list และ claude mcp get</b-why>
  <b-spoiler summary="ทำด้วยมืออย่างไร">
    <iso-art name="mcp-scopes/what-where"></iso-art>
    <b-codebox copy>
      # local — the default
      claude mcp add --transport http stripe https://mcp.stripe.com
      # project — the whole team, .mcp.json file
      claude mcp add --transport http shared-server --scope project https://example.com/mcp
      # user — all your projects
      claude mcp add --transport http hubspot --scope user https://mcp.hubspot.com/anthropic
    </b-codebox>

รายการเซิร์ฟเวอร์: `claude mcp list` รายละเอียด: `claude mcp get <name>` ลบ: `claude mcp remove <name>` ภายใน Claude Code: `/mcp`

  </b-spoiler>
  <b-finding>
    <ex>การทดลองเริ่มใน local เครื่องมือที่ใช้ร่วมกันอยู่ใน project ยูทิลิตีส่วนตัวอยู่ใน user</ex>
    <gen>ขอบเขตกำหนดว่าใครเห็นเซิร์ฟเวอร์และการตั้งค่าอยู่ที่ไหน</gen>
    <do k="ควรทำ">เพิ่มเครื่องมือที่ใช้ร่วมกันด้วย --scope project และเครื่องมือส่วนตัวด้วย --scope user</do>
  </b-finding>
</b-chapter>

<b-chapter id="order" icon="layers" title="อะไรชนะเมื่อชื่อซ้ำกัน">
  <b-why>หากมีเซิร์ฟเวอร์ชื่อเดียวกันในหลายที่ ระบบจะใช้รายการจากชั้นบนสุดทั้งรายการ</b-why>
  <iso-art name="mcp-scopes/priority-layers"></iso-art>
  <b-finding>
    <ex>เซิร์ฟเวอร์ที่องค์กรกำหนด (managed MCP) อยู่สูงสุด ถัดมา local ชนะ project และ user, project ชนะ user ส่วนปลั๊กอินและตัวเชื่อมต่อของ claude.ai อยู่ถัดลงไป และนับเป็นรายการซ้ำเมื่อชี้ไปยังที่อยู่เดียวกัน</ex>
    <gen>รายการส่วนตัวแทนที่รายการร่วมที่ชื่อเดียวกันทั้งรายการ: ฟิลด์ของสองรายการจะไม่ถูกผสมกัน</gen>
    <do k="ควรทำ">ตั้งชื่อเซิร์ฟเวอร์ส่วนตัวให้ต่างออกไป เพื่อไม่ให้ไปทับเซิร์ฟเวอร์ที่ใช้ร่วมกัน</do>
  </b-finding>
</b-chapter>

<b-chapter id="team" icon="git-branch" title="Project: การตั้งค่าร่วมสำหรับทีม">
  <b-rules sw="1.8">
    <rule icon="folder-tab" t=".mcp.json">ไฟล์อยู่ที่รากของโปรเจกต์ ในรีโพซิทอรี: ทั้งทีมได้เซิร์ฟเวอร์ชุดเดียวกัน</rule>
    <rule icon="bell" t="การอนุมัติ">ในเซสชันแบบโต้ตอบ Claude Code จะถามก่อนใช้เซิร์ฟเวอร์จาก .mcp.json</rule>
    <rule icon="users" t="ไม่มีการถาม">ในการรันแบบไม่โต้ตอบ (claude -p, Agent SDK, เซสชันบนคลาวด์) เซิร์ฟเวอร์โหลดโดยไม่ถาม</rule>
    <rule icon="lock" t="ความน่าเชื่อถือของโฟลเดอร์">ในโฟลเดอร์ที่ไม่ได้ไว้ใจ เซิร์ฟเวอร์จะรอการอนุมัติ ("Pending approval") จนกว่าจะผ่านกล่องยืนยันความไว้ใจ</rule>
    <rule icon="ban" t="ปิดใช้งาน">เพิ่มเซิร์ฟเวอร์ที่ไม่ต้องการลงใน disabledMcpjsonServers ส่วน claude mcp reset-project-choices ล้างตัวเลือกการอนุมัติ</rule>
  </b-rules>
  <b-finding>
    <ex>ไฟล์ในรีโพซิทอรีทำให้การตั้งค่าเอเจนต์เป็นของส่วนกลาง: สมาชิกใหม่ได้เซิร์ฟเวอร์มาพร้อมโค้ด</ex>
    <gen>การอนุมัติป้องกันเซิร์ฟเวอร์ของคนแปลกหน้าในงานแบบโต้ตอบ ส่วนในการรันอัตโนมัติ เซิร์ฟเวอร์จะเปิดทันที</gen>
    <do k="ควรทำ">ตรวจ .mcp.json ในขั้นตอน code review เหมือนโค้ดทั่วไป</do>
  </b-finding>
</b-chapter>

<b-chapter id="secrets" icon="key" title="ความลับใน .mcp.json">
  <b-why>ไฟล์เก็บชื่อตัวแปรสภาพแวดล้อม ${VAR} แทรกค่า และ ${VAR:-default} กำหนดค่าสำรอง การแทนค่าใช้ได้ใน command, args, env, url และ headers</b-why>
  <iso-art name="mcp-scopes/env-keys"></iso-art>
  <b-codebox copy>
    {
      "mcpServers": {
        "api-server": {
          "type": "http",
          "url": "${API_BASE_URL:-https://api.example.com}/mcp",
          "headers": { "Authorization": "Bearer ${API_KEY}" }
        }
      }
    }
  </b-codebox>

หากตัวแปรไม่ได้ตั้งค่าและไม่มีค่าเริ่มต้น การตั้งค่าจะโหลดตามที่เขียนไว้ และ claude mcp list กับ /mcp จะแสดงคำเตือน ข้อมูลรับรองของ Claude Code (ANTHROPIC_API_KEY, ANTHROPIC_AUTH_TOKEN) และอีกบางตัวจะอ่านเป็นค่าว่างใน url และ headers: ให้คัดลอกค่าไปใส่ตัวแปรที่ใช้ชื่ออื่น

  <b-finding>
    <ex>รีโพซิทอรีเก็บ ${API_KEY} และนักพัฒนาแต่ละคนเก็บคีย์จริงไว้ในตัวแปรสภาพแวดล้อมของตัวเอง</ex>
    <gen>ทำให้ไฟล์ร่วมนี้ commit ได้อย่างปลอดภัย</gen>
    <do k="ควรทำ">ลบคีย์ออกจาก .mcp.json แล้วแทนด้วยตัวแปร</do>
  </b-finding>
</b-chapter>

<b-chapter id="first" icon="flag" title="เริ่มจากตรงไหน">
  <iso-art name="mcp-scopes/steps"></iso-art>
  <b-finding>
    <ex>สามขั้นตอน: ดู แชร์ ซ่อนคีย์</ex>
    <gen>จัดเซิร์ฟเวอร์ของตัวเองให้เป็นระเบียบก่อน แล้วค่อยตั้งค่าร่วมสำหรับทีม</gen>
    <do k="ควรทำ">รัน claude mcp list แล้วหาเซิร์ฟเวอร์ที่ทั้งทีมต้องใช้</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="คำถามที่พบบ่อย">
  <b-faq-cards>
    <q t="Claude Code มีขอบเขต MCP อะไรบ้าง?">สามแบบ: local สำหรับคุณในโปรเจกต์ปัจจุบัน, project สำหรับทั้งทีมผ่านไฟล์ .mcp.json ในรีโพซิทอรี และ user สำหรับคุณในทุกโปรเจกต์</q>
    <q t="ขอบเขตไหนเป็นค่าเริ่มต้น?">Local: เซิร์ฟเวอร์มองเห็นเฉพาะคุณและเฉพาะในโปรเจกต์นี้</q>
    <q t="เกิดอะไรขึ้นเมื่อชื่อเซิร์ฟเวอร์ซ้ำกัน?">รายการส่วนตัวแทนที่รายการร่วมที่ชื่อเดียวกันทั้งรายการ: ฟิลด์ของสองรายการจะไม่ถูกผสมกัน</q>
    <q t="แชร์เซิร์ฟเวอร์ MCP กับทีมอย่างไร?">เพิ่มในขอบเขต project: การตั้งค่าเข้าไปอยู่ในรีโพซิทอรี ส่วนความลับอยู่ในตัวแปรสภาพแวดล้อม</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="อ่านต่อ">
  <b-links>
    <item href="/blog/mcp-agent-access/" k="พื้นฐาน" t="MCP สำหรับเอเจนต์ AI: แก้ปัญหาอะไร และมอบหมายการเชื่อมต่อให้เอเจนต์อย่างไร">MCP คืออะไรและเชื่อมอย่างไร</item>
    <item href="/blog/claude-in-chrome/" k="เบราว์เซอร์" t="Claude in Chrome: เอเจนต์ทำงานในเบราว์เซอร์ของคุณอย่างไร — ทดสอบ ดีบัก และกรอกฟอร์มภายใต้การล็อกอินของคุณ">เอเจนต์ในเบราว์เซอร์ของคุณ</item>
    <item href="/blog/bug-report-to-reproduction-agent/" k="ตัวอย่าง" t="งานของ QA หลังฝ่ายสนับสนุนกับเอเจนต์ AI: ค้นคว้า เขียนรายงาน และจัดทำเอกสารผ่าน MCP และ skill">เอเจนต์จำลองบั๊กจาก Jira</item>
  </b-links>
</b-chapter>
<b-footer>ข้อเท็จจริงเรื่องขอบเขตและลำดับความสำคัญอ้างอิงเอกสาร Claude Code: <a href="https://code.claude.com/docs/en/mcp#mcp-installation-scopes" target="_blank" rel="noopener">MCP installation scopes</a></b-footer>
</b-post>
