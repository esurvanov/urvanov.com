---
title: Claude Code ติดตั้งและราคา: แผนที่รวมไว้และประเทศที่ใช้ได้
seoTitle: Claude Code ติดตั้งและราคา 2026: แผนและการเข้าถึง
date: 2026-11-17
updated: 2026-11-18
description: วิธีติดตั้ง Claude Code บน Mac, Linux และ Windows แผน Pro, Max, Ultra และ Team รวมอะไรบ้าง ต้องใช้ API key หรือไม่ และใช้จากรัสเซียได้หรือไม่
tags: AI, Claude Code, ติดตั้ง, ราคา, แผน, harness
category: harness
layout: wide
mentions: Claude Code, OpenCode, Codex, Cursor, Gemini CLI, Antigravity CLI, CLAUDE.md
toc: answer=คำตอบสั้น | what=คืออะไร | install=ติดตั้ง | login=รันครั้งแรก | plans=แผนและราคา | check=ตรวจสอบ | errors=ข้อผิดพลาด | region=ใช้ได้ในประเทศไหน | alt=ทางเลือกอื่น | prompts=คำสั่งสำเร็จรูป | faq=คำถามที่พบบ่อย | next=อ่านเพิ่มเติม
---

Claude Code ติดตั้งด้วยคำสั่งเดียวในเทอร์มินัล: บน macOS, Linux และ WSL ใช้ `curl -fsSL https://claude.ai/install.sh | bash` บน Windows ใน PowerShell ใช้ `irm https://claude.ai/install.ps1 | iex` การเข้าสู่ระบบต้องมีสมาชิก Claude Pro แบบเสียเงินราคา $20 ต่อเดือน, Max, Ultra, Team หรือ Enterprise หรือบัญชี Console ที่คิดเงินตามการใช้ API แผนฟรีใช้ไม่ได้

<b-post series="harness">
<b-chapter id="answer" title="คำตอบสั้น" icon="crosshair">
  <b-why>ติดตั้งใช้คำสั่งเดียว และเข้าสู่ระบบผ่านเบราว์เซอร์ การเข้าถึงต้องเสียเงินเสมอ คือสมาชิกหรือการคิดเงินตาม API<b-proof href="https://code.claude.com/docs/en/setup" quote="Claude Code: «Claude Code requires a Pro, Max, Ultra, Team, Enterprise, or Console account. The free claude.ai plan does not include Claude Code access» — code.claude.com/docs/en/setup"/></b-why>

  <iso-art name="claude-code-install-and-price/install-flow"></iso-art>
  <b-cap>เส้นทางจากเทอร์มินัลว่างเปล่าถึงคำตอบแรก: เปิดเทอร์มินัล วางคำสั่ง เปิดหน้าต่างใหม่ ตรวจเวอร์ชัน แล้วเข้าสู่ระบบบัญชีของคุณ</b-cap>
  <b-sublabel top="18">พูดให้เข้าใจง่าย</b-sublabel>

  Claude Code คือเอเจนต์เขียนโค้ดจาก Anthropic บริษัทผู้สร้าง Claude ทำงานในเทอร์มินัล ซึ่งเป็นหน้าต่างที่พิมพ์คำสั่งเป็นข้อความ อ่านไฟล์โปรเจกต์ของคุณและแก้ไขเพื่อทำงานที่คุณสั่ง ติดตั้งด้วยคำสั่งเดียว: คัดลอกบรรทัดของระบบคุณ วางลงในเทอร์มินัลแล้วรอ จากนั้นเปิดเทอร์มินัลอีกครั้ง ตรวจเวอร์ชัน และเข้าสู่ระบบบัญชี Claude ผ่านเบราว์เซอร์ การเข้าถึงต้องเสียเงิน: ต้องมีสมาชิกหรือบัญชีที่คิดเงินตามการใช้ API แผนแชตฟรีของ Claude ยังคงฟรี แต่ Claude Code ไม่รวมอยู่ในแผนนั้น

  ตัวอย่างในชีวิตประจำวัน ลูกาอาศัยอยู่ในลิสบอนและทำงานบนแล็ปท็อป Ubuntu เขาเปิดเทอร์มินัลและวางคำสั่งสำหรับ macOS, Linux และ WSL ตัวติดตั้งไม่แสดงอะไรเลยอยู่หลายนาที และลูกาไม่ปิดหน้าต่าง จากนั้นเขาเปิดเทอร์มินัลหน้าต่างใหม่ พิมพ์ <code>claude --version</code> และเห็นหมายเลขเวอร์ชันพร้อมข้อความ "(Claude Code)" เหลือแค่เข้าสู่ระบบ ลูกาสั่ง <code>claude</code> ในโฟลเดอร์โปรเจกต์ เบราว์เซอร์เปิดหน้าเข้าสู่ระบบ และเขาเข้าสู่ระบบด้วยสมาชิก Pro ของเขา โปรตุเกสอยู่ในรายชื่อประเทศของ Anthropic จึงไม่มีอุปสรรคเรื่องภูมิภาค

  ข้อผิดพลาดที่พบบ่อยคือติดตั้ง Claude Code ทั้งที่มีแค่บัญชีแชตฟรี การติดตั้งสำเร็จ แต่การเข้าสู่ระบบจะไม่เปิดสิทธิ์ใช้เอเจนต์ เพราะแผนฟรีไม่รวม Claude Code ก่อนติดตั้งให้ตัดสินใจว่าจะจ่ายอย่างไร: สมาชิก Pro, Max, Ultra, Team หรือ Enterprise หรือการคิดเงินตาม API ผ่าน Console

  ตรวจคำตอบนี้ได้ทันทีหลังติดตั้ง: คำสั่ง <code>claude --version</code> แสดงหมายเลขเวอร์ชันและ "(Claude Code)" ราคาและเงื่อนไขตรวจกับ<a href="https://claude.com/pricing">หน้าราคาของ Claude</a>และ<a href="https://code.claude.com/docs/en/setup">หน้าติดตั้ง Claude Code</a>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>คำถาม</th><th>คำตอบ ณ 18.11.2026</th></tr>
    </thead>
    <tbody>
      <tr><td>ติดตั้งอย่างไร</td><td>คำสั่งเดียว: หนึ่งคำสั่งสำหรับ macOS, Linux และ WSL อีกหนึ่งคำสั่งสำหรับ Windows PowerShell หรือ CMD</td></tr>
      <tr><td>ราคา</td><td>Pro $20 ต่อเดือน, Max $100, Ultra $200; Team เริ่มที่ $25 ต่อที่นั่ง<b-proof href="https://claude.com/pricing" quote="Claude: Pro «$20 if billed monthly», Max «$100», Ultra «$200», Team standard seat «$25 if billed monthly» — claude.com/pricing"/></td></tr>
      <tr><td>แผนที่รวมไว้</td><td>Claude Code อยู่ใน Pro, Max, Ultra, Team และ Enterprise; แผนฟรีไม่มี Claude Code</td></tr>
      <tr><td>ใช้ได้ในประเทศไหน</td><td>รัสเซียไม่อยู่ในรายชื่อประเทศอย่างเป็นทางการของ Anthropic; เงื่อนไขระบุ Claude Code ไว้ในผลิตภัณฑ์ที่มีข้อจำกัดนี้<b-proof href="https://www.anthropic.com/supported-countries" quote="Anthropic: «Any country or region not listed is unsupported» — anthropic.com/supported-countries"/></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>วันที่ตรวจสอบ: 18.11.2026 ราคาและรายชื่อประเทศเปลี่ยนได้ ให้เปิดหน้าของ Anthropic อีกครั้งก่อนจ่ายเงิน</b-cap>
</b-chapter>
<b-chapter id="what" title="Claude Code คืออะไร" icon="terminal">
  <b-why>Claude Code คือเอเจนต์เขียนโค้ดจาก Anthropic อ่านโปรเจกต์ แก้ไฟล์ รันคำสั่งและเทสต์ และทำงานกับ git ได้ Claude ในแชตตอบเป็นข้อความ ส่วน Claude Code แก้ไฟล์ของโปรเจกต์เอง</b-why>

  <iso-art name="term:claude-code"></iso-art>
  <b-links cols="1">
    <item href="/materials/glossary/claude-code/" k="ศัพท์" t="Claude Code">ทำอะไรได้ ทำงานที่ไหน ใช้โมเดลอะไร</item>
  </b-links>
  <b-sublabel top="18">พูดให้เข้าใจง่าย</b-sublabel>

  เอเจนต์ลงมือทำงานเอง: คุณอธิบายงานเป็นคำพูด แล้วมันเปิดไฟล์โปรเจกต์ที่ถูกต้อง แก้ไข รันการตรวจสอบ และแสดงผล git คือโปรแกรมที่เก็บประวัติการเปลี่ยนแปลงของโปรเจกต์ Claude Code ทำงานกับ git ได้ เทสต์คือการตรวจสอบว่าโปรแกรมยังทำงานได้หลังการแก้ไข เอเจนต์รันเองและอ่านผลเอง

  Claude Code ทำงานในเทอร์มินัล ใน VS Code และ JetBrains ในแอปเดสก์ท็อป ในเบราว์เซอร์ ใน Slack และใน CI บทความนี้ครอบคลุมเทอร์มินัล ซึ่งเป็นวิธีใช้หลัก<b-proof href="https://code.claude.com/docs/en/quickstart" quote="Claude Code: «Claude Code is also available on the web, as a desktop app, in VS Code and JetBrains IDEs, in Slack, and in CI/CD» — code.claude.com/docs/en/quickstart"/>

  ตัวอย่างในชีวิตประจำวัน ริตาอาศัยอยู่ในริกาและดูแลเว็บไซต์เล็ก ๆ ที่มีเทสต์และประวัติการเปลี่ยนแปลงใน git ก่อนอื่นเธอถาม Claude ในแชตว่าทำไมปุ่มหนึ่งไม่ทำงาน และได้คำอธิบายเป็นข้อความ เธอต้องแก้โค้ดเอง จากนั้นเธอเปิด Claude Code ในโฟลเดอร์ของเว็บไซต์และเขียนงานเดิม เอเจนต์หาไฟล์ที่ถูกต้อง แก้ไข รันเทสต์ และแสดงการเปลี่ยนแปลง ริตาดูการแก้ไขใน git แล้วยอมรับ ลัตเวียอยู่ในรายชื่อประเทศของ Anthropic จึงไม่มีคำถามเรื่องภูมิภาค

  <b>Claude Code คือ Claude ตัวเดียวกับในแชตที่มาอยู่ในเทอร์มินัลหรือเปล่า?</b> ไม่ใช่ ในแชต Claude ตอบเป็นข้อความ และคุณต้องย้ายการแก้ไขไปใส่เอง Claude Code แก้ไฟล์โปรเจกต์และรันคำสั่ง จึงต้องติดตั้งแยกและรวมอยู่เฉพาะในแผนแบบเสียเงิน วิธีตรวจ: แผนฟรีไม่รวม Claude Code และในตารางแผนที่ <a href="https://claude.com/pricing">claude.com/pricing</a> คอลัมน์ Free เขียนว่า "Claude Code: No"
</b-chapter>
<b-chapter id="install" title="ติดตั้งทีละขั้น" icon="arrow-down">
  <b-why>ข้อกำหนด: macOS 13+, Windows 10 1809+ หรือ Windows Server 2019+, Ubuntu 20.04+, Debian 10+, Alpine 3.19+; หน่วยความจำ 4 GB ขึ้นไป โปรเซสเซอร์ x64 หรือ ARM64 และอินเทอร์เน็ต<b-proof href="https://code.claude.com/docs/en/setup" quote="Claude Code: «macOS 13.0+», «Windows 10 1809+ or Windows Server 2019+», «Ubuntu 20.04+», «4 GB+ RAM» — code.claude.com/docs/en/setup"/> คำสั่งมาจากหน้าติดตั้ง วันที่ตรวจสอบ: 18.11.2026</b-why>

  <b-sublabel top="18">เลือกคำสั่งไหน</b-sublabel>

  คำสั่งขึ้นอยู่กับหน้าต่างที่คุณพิมพ์ บน macOS, Linux และใน WSL (สภาพแวดล้อม Linux ภายใน Windows) ใช้บรรทัดเดียว บน Windows มีสองหน้าต่างคือ PowerShell และ CMD และคำสั่งต่างกัน แยกได้จากพรอมต์: ใน PowerShell ขึ้นต้นด้วย "PS" ใน CMD ไม่มี "PS" ถ้าใช้คำสั่งของอีกหน้าต่าง การติดตั้งจะไม่เริ่ม
  <iso-art name="claude-code-install-and-price/which-shell"></iso-art>
  <b-cap>สามคำสั่งสำหรับสามหน้าต่าง: macOS, Linux และ WSL; PowerShell ที่พรอมต์มี "PS"; CMD ที่ไม่มี "PS"</b-cap>
  <b-sublabel top="18">macOS, Linux และ WSL</b-sublabel>
  <b-codebox title="เทอร์มินัล" copy>
    curl -fsSL https://claude.ai/install.sh | bash
  </b-codebox>
  <b-sublabel top="18">Windows: PowerShell (พรอมต์มี PS)</b-sublabel>
  <b-codebox title="PowerShell" copy>
    irm https://claude.ai/install.ps1 | iex
  </b-codebox>
  <b-sublabel top="18">Windows: CMD (พรอมต์ไม่มี PS)</b-sublabel>
  <b-codebox title="CMD" copy>
    curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
  </b-codebox>
  <b-cap>ตัวติดตั้งไม่แสดงความคืบหน้าระหว่างดาวน์โหลดไฟล์ บน Windows ไม่ต้องใช้สิทธิ์ผู้ดูแลระบบ การติดตั้ง Git for Windows เป็นทางเลือก: ถ้าไม่มี Claude Code จะรันคำสั่งผ่าน PowerShell<b-proof href="https://code.claude.com/docs/en/setup" quote="Claude Code: «Installing Git for Windows is optional» — code.claude.com/docs/en/setup"/></b-cap>

  ตัวอย่างในชีวิตประจำวัน ยานอาศัยอยู่ในกดัญสก์และทำงานบนแล็ปท็อป Windows เขาเปิด PowerShell และเห็น "PS" ที่ต้นบรรทัด เขาจึงต้องใช้คำสั่ง <code>irm https://claude.ai/install.ps1 | iex</code> ยานวางคำสั่งและไม่เห็นสักบรรทัดอยู่หลายนาที แต่เขาไม่ปิดหน้าต่าง เพราะตัวติดตั้งไม่แสดงความคืบหน้า เขาไม่ต้องใช้สิทธิ์ผู้ดูแลระบบและไม่ได้ติดตั้ง Git for Windows เมื่อการติดตั้งเสร็จ ยานเปิด PowerShell อีกครั้งและสั่ง <code>claude --version</code> โปแลนด์อยู่ในรายชื่อประเทศของ Anthropic ตรวจว่าเป็นหน้าต่างที่ถูกต้องได้จากสองตัวอักษรแรกของพรอมต์

  <b-sublabel top="18">ตัวติดตั้งหรือตัวจัดการแพ็กเกจ</b-sublabel>

  ตัวติดตั้ง คือคำสั่งที่มี <code>curl</code> หรือ <code>irm</code> เป็นวิธีที่แนะนำ: มันอัปเดต Claude Code เองในเบื้องหลัง ตัวจัดการแพ็กเกจคือโปรแกรมที่ติดตั้งและอัปเดตโปรแกรมอื่นตามชื่อ วิธีนี้ใช้ได้เช่นกัน แต่ต้องอัปเดต Claude Code เอง ถ้าใช้ npm ให้ติดตั้งโดยไม่ใช้ <code>sudo</code> เอกสารเตือนว่าการติดตั้งแบบนั้นจะอัปเดตตัวเองไม่ได้<b-proof href="https://code.claude.com/docs/en/setup" quote="Claude Code: «Do NOT use sudo npm install -g as this can lead to permission issues and security risks» — code.claude.com/docs/en/setup"/>
  <iso-art name="claude-code-install-and-price/install-methods"></iso-art>
  <b-cap>ตัวติดตั้งอัปเดตตัวเอง ตัวจัดการแพ็กเกจอัปเดตด้วยมือ: Homebrew, WinGet, npm, apt, dnf, apk</b-cap>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>วิธี</th><th>คำสั่ง</th><th>การอัปเดต</th></tr>
    </thead>
    <tbody>
      <tr><td>ตัวติดตั้ง (แนะนำ)</td><td><code>curl -fsSL https://claude.ai/install.sh | bash</code></td><td>อัตโนมัติในเบื้องหลัง</td></tr>
      <tr><td>Homebrew (macOS)</td><td><code>brew install --cask claude-code</code></td><td>ด้วยมือ: <code>brew upgrade claude-code</code></td></tr>
      <tr><td>WinGet (Windows)</td><td><code>winget install Anthropic.ClaudeCode</code></td><td>ด้วยมือ: <code>winget upgrade Anthropic.ClaudeCode</code></td></tr>
      <tr><td>npm (ต้องมี Node.js 22+)</td><td><code>npm install -g @anthropic-ai/claude-code@latest</code></td><td>รันคำสั่งติดตั้งซ้ำ</td></tr>
      <tr><td>apt, dnf, apk</td><td>เพิ่มที่เก็บแพ็กเกจของ Anthropic ตามคำแนะนำในเอกสาร</td><td>ไปพร้อมการอัปเดตระบบตามปกติ</td></tr>
    </tbody>
    </table>
  </b-ctx-table>

  ตัวอย่างในชีวิตประจำวัน มาร์โกอาศัยอยู่ในมิลานและทำงานบน Mac เขาติดตั้งโปรแกรมทุกตัวผ่าน Homebrew อยู่แล้ว จึงเลือก <code>brew install --cask claude-code</code> แทนตัวติดตั้ง ทุกอย่างทำงานเหมือนกัน แต่หนึ่งเดือนต่อมามาร์โกอัปเดต Claude Code ด้วย <code>brew upgrade claude-code</code> เพราะมันจะไม่อัปเดตตัวเอง อิตาลีอยู่ในรายชื่อประเทศของ Anthropic วิธีตรวจว่าติดตั้งด้วยวิธีไหน: ถ้า Homebrew เป็นผู้ติดตั้ง ให้อัปเดตด้วย Homebrew ตัวเดิม

  <b-sublabel top="18">Windows: ติดตั้งตรงหรือผ่าน WSL</b-sublabel>

  WSL คือสภาพแวดล้อม Linux ภายใน Windows: Claude Code ทำงานในนั้นเหมือนบน Linux ปกติ ตัวเลือกขึ้นอยู่กับโปรเจกต์ ถ้าโปรเจกต์และโปรแกรมของมันเป็นของ Windows ให้ติดตั้งบน Windows โดยตรง ถ้าต้องใช้โปรแกรม Linux หรือการแยกคำสั่ง (แซนด์บอกซ์ คือการรันคำสั่งของเอเจนต์ในสภาพแวดล้อมที่จำกัด) ให้เลือก WSL 2 WSL 1 เหมาะเมื่อใช้ WSL 2 ไม่ได้ แต่ไม่รองรับการแยกคำสั่ง
  <iso-art name="claude-code-install-and-price/windows-modes"></iso-art>
  <b-cap>สามโหมดบน Windows: ติดตั้งตรง, WSL 2 ที่มีการแยกคำสั่ง, WSL 1 ที่ไม่มีการแยก</b-cap>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>ตัวเลือก</th><th>เลือกเมื่อไร</th><th>การแยกคำสั่ง (แซนด์บอกซ์)</th></tr>
    </thead>
    <tbody>
      <tr><td>Windows โดยตรง</td><td>โปรเจกต์และโปรแกรมสำหรับ Windows</td><td>ไม่รองรับ</td></tr>
      <tr><td>WSL 2</td><td>โปรแกรม Linux หรือต้องการแยกคำสั่ง</td><td>รองรับ</td></tr>
      <tr><td>WSL 1</td><td>ถ้าใช้ WSL 2 ไม่ได้</td><td>ไม่รองรับ</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>ใน WSL ให้รันคำสั่งของ Linux ในหน้าต่าง WSL ไม่ใช่จาก PowerShell<b-proof href="https://code.claude.com/docs/en/setup" quote="Claude Code: «You install and launch claude inside the WSL terminal, not from PowerShell or CMD» — code.claude.com/docs/en/setup"/> บน Alpine ต้องมี <code>bash</code> และ <code>curl</code> ก่อนติดตั้ง: <code>apk add bash curl</code></b-cap>
</b-chapter>
<b-chapter id="login" title="รันครั้งแรกและเข้าสู่ระบบ" icon="key">
  <b-why>การเข้าสู่ระบบเกิดในเบราว์เซอร์: Claude Code เปิดหน้าให้เอง และหลังเข้าสู่ระบบเทอร์มินัลแสดง "Login successful"<b-proof href="https://code.claude.com/docs/en/authentication" quote="Claude Code: «When login completes, the terminal shows Login successful and prompts you to press Enter to continue» — code.claude.com/docs/en/authentication"/></b-why>

  <b-sublabel top="18">วิธีเปิดใช้</b-sublabel>

  ไปที่โฟลเดอร์โปรเจกต์และสั่ง <code>claude</code> โปรแกรมเปิดเบราว์เซอร์ คุณเข้าสู่ระบบบัญชี Claude แล้วเทอร์มินัลแสดง "Login successful" พร้อมข้อความให้กด Enter หลังจากนั้นถามเกี่ยวกับโปรเจกต์ได้
  <b-codebox title="รันครั้งแรก" copy>
    cd path/to/project
    claude
  </b-codebox>
  <b-cap>ถ้าเบราว์เซอร์ไม่เปิด ให้กด <code>c</code>: ที่อยู่หน้าเข้าสู่ระบบจะถูกคัดลอกไปที่คลิปบอร์ด ออกจากระบบได้ด้วยคำสั่ง <code>/logout</code> และเข้าใหม่ด้วย <code>/login</code> วิธีขอความช่วยเหลือในเซสชันคือ <code>/help</code></b-cap>
  <b-sublabel top="18">เข้าสู่ระบบด้วยอะไรได้บ้าง</b-sublabel>

  วิธีเข้าสู่ระบบขึ้นอยู่กับวิธีจ่ายเงิน สมาชิก Pro, Max หรือ Ultra ออกให้บุคคลหนึ่งคน Team และ Enterprise ใช้บัญชีของพนักงานที่ผู้ดูแลระบบเชิญ Claude Console เป็นบัญชีแยกที่คิดเงินตามการใช้ API ด้วยเครดิตที่ชำระล่วงหน้า Amazon Bedrock, Google Cloud และ Microsoft Foundry เหมาะกับองค์กรที่มีผู้ให้บริการคลาวด์อยู่แล้ว
  <iso-art name="claude-code-install-and-price/login-paths"></iso-art>
  <b-cap>สี่เส้นทางเข้าสู่ระบบ: สมาชิก, Team หรือ Enterprise, Console, ผู้ให้บริการคลาวด์</b-cap>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>เข้าสู่ระบบด้วยอะไร</th><th>เหมาะกับใคร</th></tr>
    </thead>
    <tbody>
      <tr><td>สมาชิก Pro, Max หรือ Ultra</td><td>บุคคลหนึ่งคน เข้าสู่ระบบผ่านบัญชี claude.ai</td></tr>
      <tr><td>Team หรือ Enterprise</td><td>พนักงานที่ผู้ดูแลระบบเชิญ</td></tr>
      <tr><td>Claude Console</td><td>การคิดเงินตาม API ด้วยเครดิตที่ชำระล่วงหน้า</td></tr>
      <tr><td>Amazon Bedrock, Google Cloud, Microsoft Foundry</td><td>องค์กรที่มีผู้ให้บริการคลาวด์</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>รายการบัญชีมาจากหน้าการยืนยันตัวตนและหน้าเริ่มต้นใช้งานในเอกสาร<b-proof href="https://code.claude.com/docs/en/quickstart" quote="Claude Code: «Claude Console (API access with pre-paid credits)» — code.claude.com/docs/en/quickstart"/></b-cap>

  ตัวอย่างในชีวิตประจำวัน เอมมาอาศัยอยู่ในเวียนนาและซื้อสมาชิก Pro เธอไปที่โฟลเดอร์โปรเจกต์ สั่ง <code>claude</code> และเบราว์เซอร์เปิดหน้าเข้าสู่ระบบ เอมมาเข้าสู่ระบบด้วยบัญชี Claude เดียวกับที่ใช้แชต เทอร์มินัลแสดง "Login successful" เธอกด Enter และถามว่า "what does this project do?" ไม่กี่วินาทีต่อมาเอเจนต์อธิบายโปรเจกต์ ภายหลังเอมมาอยากตรวจว่าโปรแกรมใช้บัญชีไหน เธอพิมพ์ <code>/status</code> และถ้าจะสลับบัญชีก็ใช้ <code>/logout</code> กับ <code>/login</code> ออสเตรียอยู่ในรายชื่อประเทศของ Anthropic จึงไม่มีอุปสรรคเรื่องภูมิภาค

  <b>สมาชิกแชตกับ Claude Code ต้องเข้าสู่ระบบแยกกันสองครั้งหรือเปล่า?</b> ไม่ต้อง สมาชิก Pro, Max หรือ Ultra ออกให้บัญชี claude.ai และบัญชีเดียวกันเปิด Claude Code ได้ ทั้งสองใช้ขีดจำกัดร่วมกัน วิธีตรวจ: หลังเข้าสู่ระบบ พิมพ์ <code>/status</code> แล้วดูว่าแสดงวิธีเข้าสู่ระบบแบบไหน

  <b>บัญชี Claude ฟรีพอไหม?</b> ไม่พอ ข้อกำหนดการติดตั้งเขียนว่า "The free claude.ai plan does not include Claude Code access" เข้าสู่ Claude Code ได้เฉพาะทางที่เสียเงิน: สมาชิก, Team, Enterprise, Console หรือผู้ให้บริการคลาวด์ วิธีตรวจ: เปิด<a href="https://code.claude.com/docs/en/setup">หน้าติดตั้ง Claude Code</a>และหาประโยคนี้ในหัวข้อข้อกำหนด
</b-chapter>

<b-chapter id="plans" title="แผน: รวมอะไรและราคาเท่าไร" icon="coin">
  <b-why>Claude Code รวมอยู่ในแผนแบบเสียเงิน Pro, Max, Ultra, Team และ Enterprise และไม่รวมอยู่ในแผนฟรี<b-proof href="https://claude.com/pricing" quote="Claude: Free «Claude Code: No», Pro «$20 if billed monthly», Ultra «10x Pro usage every week», Team premium seat «5x more usage than standard seats» — claude.com/pricing"/> ราคาและสิ่งที่รวมมาจาก claude.com/pricing วันที่ตรวจสอบ: 18.11.2026 แผนเปลี่ยนได้ จึงควรเปิดหน้าราคาของ Anthropic อีกครั้งก่อนจ่ายเงิน</b-why>

  แผนคือสมาชิกที่มีราคารายเดือนคงที่และปริมาณการใช้งานของตัวเอง Claude Code ไม่มีราคาแยก: มาพร้อมสมาชิก ร่วมกับ Claude ธรรมดาในแชต ยิ่งแผนสูง ยิ่งใช้งานได้มากขึ้นทั้งในช่วงห้าชั่วโมงและในหนึ่งสัปดาห์ Pro, Max และ Ultra เหมาะกับบุคคลหนึ่งคน ที่นั่ง Team เหมาะกับทีม และ Enterprise เหมาะกับบริษัทที่มีสัญญา
  <iso-art name="claude-code-install-and-price/plans-ladder"></iso-art>
  <b-cap>บันไดแผน: Free ที่ไม่มี Claude Code จากนั้น Pro, Max, Ultra, ที่นั่ง Team มาตรฐานและพรีเมียม และ Enterprise ตามสัญญา</b-cap>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>แผน</th><th>ราคาต่อเดือน</th><th>Claude Code</th><th>ปริมาณการใช้งาน</th></tr>
    </thead>
    <tbody>
      <tr><td>Free</td><td>$0</td><td>ไม่มี</td><td>จำกัด</td></tr>
      <tr><td>Pro</td><td>$20 ถ้าจ่ายรายเดือน, $17 ถ้าจ่ายรายปี (จ่าย $200 ล่วงหน้า)</td><td>มี</td><td>พื้นฐาน</td></tr>
      <tr><td>Max</td><td>$100</td><td>มี</td><td>5 เท่าของ Pro</td></tr>
      <tr><td>Ultra</td><td>$200</td><td>มี</td><td>10 เท่าของ Pro ต่อสัปดาห์</td></tr>
      <tr><td>Team ที่นั่งมาตรฐาน</td><td>$25 รายเดือน, $20 ถ้าจ่ายรายปี</td><td>มี</td><td>ตามสมาชิกของที่นั่งนั้น</td></tr>
      <tr><td>Team ที่นั่งพรีเมียม</td><td>$125 รายเดือน, $100 ถ้าจ่ายรายปี</td><td>มี</td><td>5 เท่าของที่นั่งมาตรฐาน</td></tr>
      <tr><td>Enterprise</td><td>ตามหน้าเว็บ: $20 ต่อที่นั่งต่อเดือนถ้าจ่ายรายปี เริ่มที่ 20 ที่นั่ง</td><td>มี</td><td>ตามสัญญา</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>แหล่งที่มา: claude.com/pricing วันที่ตรวจสอบ: 18.11.2026</b-cap>
  <b-sublabel top="18">ตัวอย่างการคิดจริง</b-sublabel>

  โยนัสอาศัยอยู่ในวิลนีอุสและอยากลอง Claude Code กับโปรเจกต์ของตัวเอง เขาเปิดหน้าราคาและเห็นข้อความ “Claude Code: No” ข้างแผน Free ตัวเลือกฟรีจึงตกไป Pro ราคา 20 ดอลลาร์ต่อเดือนเมื่อจ่ายรายเดือน และพอสำหรับเริ่มต้น การจ่ายรายปีลดราคาเหลือ 17 ดอลลาร์ต่อเดือน แต่ถูกเรียกเก็บ 200 ดอลลาร์ทีเดียว และโยนัสยังไม่แน่ใจว่าจะใช้เอเจนต์ทุกวัน เขาเลือกจ่ายรายเดือน วิธีตรวจกรณีของคุณ: เปิดหน้าราคาและหาข้อความเรื่อง Claude Code ในแถวของแผนที่คุณเลือก

  <b-sublabel top="18">ขีดจำกัด</b-sublabel>

  ขีดจำกัดคือปริมาณการใช้งานที่เมื่อถึงแล้วสมาชิกจะขอให้รอ Pro และ Max มีสองแบบ: ขีดจำกัดต่อเซสชันห้าชั่วโมงและขีดจำกัดรายสัปดาห์<b-proof href="https://support.claude.com/en/articles/11145838-using-claude-code-with-your-pro-or-max-plan" quote="Claude Help Center: «Pro and Max plans have a five-hour session limit and a weekly limit» — support.claude.com"/> Ultra มีขีดจำกัดรายสัปดาห์ และบัญชี Ultra ที่ยืนยันแล้วไม่มีขีดจำกัดห้าชั่วโมง ขีดจำกัดใช้ร่วมกันระหว่าง Claude ในแชตและ Claude Code: ถ้าใช้ปริมาณไปกับแชต ก็เหลือให้เอเจนต์น้อยลง
  <iso-art name="claude-code-install-and-price/limits"></iso-art>
  <b-cap>สองช่วงการใช้: ห้าชั่วโมงและรายสัปดาห์ ปริมาณการใช้งานก้อนเดียวสำหรับแชตและ Claude Code</b-cap>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>แผน</th><th>ขีดจำกัดแบบไหน</th></tr>
    </thead>
    <tbody>
      <tr><td>Pro และ Max</td><td>ขีดจำกัดต่อเซสชันห้าชั่วโมงและขีดจำกัดรายสัปดาห์</td></tr>
      <tr><td>Ultra</td><td>ขีดจำกัดรายสัปดาห์ บัญชี Ultra ที่ยืนยันแล้วไม่มีขีดจำกัดห้าชั่วโมง</td></tr>
      <tr><td>สมาชิกทุกแบบ</td><td>ขีดจำกัดใช้ร่วมกันระหว่าง Claude ในแชตและ Claude Code</td></tr>
    </tbody>
    </table>
  </b-ctx-table>

  เมื่อขีดจำกัดหมด คุณเปิดการใช้งานเพิ่มที่จ่ายด้วยเครดิต หรือซื้อเครดิต API ในราคา API มาตรฐานได้ ถ้าอยากอยู่ในกรอบของสมาชิก ให้ปฏิเสธการจ่ายด้วยเครดิต หนึ่งสัปดาห์ต่อมาโยนัสสังเกตว่าตอนเย็นเอเจนต์ขอให้เขารอ เพราะเช้านั้นเขาคุยกับ Claude ในแชตนาน และปริมาณที่ใช้ร่วมกันหมดไปแล้ว เขาตัดสินใจไม่ซื้อเครดิตและรอช่วงใหม่เฉย ๆ

  <b-sublabel top="18">API key แทนสมาชิก</b-sublabel>

  API key คือรหัสผ่านสำหรับโปรแกรมที่ Claude Code ใช้จ่ายเงินทุกคำขอในอัตรา API สมาชิกมีราคาคงที่ ส่วน key จ่ายตามปริมาณ ถ้าตั้งตัวแปร <code>ANTHROPIC_API_KEY</code> ไว้ในระบบ Claude Code จะใช้ key แทนสมาชิก สำหรับโยนัสนี่เป็นเรื่องที่ไม่คาดคิด: ตัวแปรตกค้างมาจากอีกโปรเจกต์ และค่าใช้จ่ายไปตามอัตรา API ทั้งที่สมาชิกของเขาชำระแล้ว
  <iso-art name="claude-code-install-and-price/api-vs-subscription"></iso-art>
  <b-cap>สองวิธีจ่าย: สมาชิกราคาคงที่ และ API key ที่จ่ายตามปริมาณ key มาแทนที่สมาชิก</b-cap>
  <b-finding>
    <ex>ถ้าตั้งตัวแปร <code>ANTHROPIC_API_KEY</code> ไว้ในระบบ Claude Code จะใช้ key แทนสมาชิก และค่าใช้จ่ายไปตามอัตรา API</ex>
    <gen>สมาชิกมีราคาคงที่และมีขีดจำกัด ส่วน key จ่ายตามปริมาณ key คุ้มเมื่อปริมาณงานไม่สม่ำเสมอหรือต้องการใบเรียกเก็บแยกตามโปรเจกต์</gen>
    <do>เพื่อกลับไปใช้สมาชิก ให้ลบตัวแปร (<code>unset ANTHROPIC_API_KEY</code>) และตรวจวิธีเข้าสู่ระบบด้วยคำสั่ง <code>/status</code><b-proof href="https://code.claude.com/docs/en/authentication" quote="Claude Code: «Run unset ANTHROPIC_API_KEY to fall back to your subscription, and check /status to confirm which method is active» — code.claude.com/docs/en/authentication"/></do>
  </b-finding>

  ราคาต่อหนึ่งล้านโทเคนแยกตามโมเดลไม่ได้ระบุไว้ที่นี่: ผมไม่ได้ตรวจในหน้าราคาเมื่อ 18.11.2026

  <b-sublabel top="18">ความเข้าใจผิดที่พบบ่อย</b-sublabel>

  <b>แผนฟรีให้ Claude Code หรือเปล่า?</b> ไม่ให้ เอกสารการติดตั้งระบุว่า Claude Code ต้องใช้บัญชี Pro, Max, Ultra, Team, Enterprise หรือ Console และแผน claude.ai ฟรีไม่รวมสิทธิ์เข้าถึง<b-proof href="https://code.claude.com/docs/en/setup" quote="Claude Code: «Claude Code requires a Pro, Max, Ultra, Team, Enterprise, or Console account. The free claude.ai plan does not include Claude Code access» — code.claude.com/docs/en/setup"/> วิธีตรวจ: เปิดหน้าราคาและหาข้อความ “Claude Code: No” ข้างแผน Free

  <b>สมาชิกแบบเสียเงินปลดข้อจำกัดเรื่องภูมิภาคได้หรือไม่?</b> ไม่ได้ รายชื่อประเทศของ Anthropic ใช้กับการใช้งานไม่ว่าจะเป็นแผนไหนและจ่ายด้วยวิธีใด<b-proof href="https://www.anthropic.com/supported-countries" quote="Anthropic: «Any country or region not listed is unsupported» — anthropic.com/supported-countries"/> วิธีตรวจ: หาประเทศของคุณในรายชื่อบนหน้าของ Anthropic

  <b>API key ถูกกว่าสมาชิกจริงไหม?</b> ขึ้นอยู่กับปริมาณงาน สมาชิกมีราคาคงที่ ส่วน key คิดเงินตามปริมาณ และผมไม่ได้ตรวจอัตราที่แน่นอนในหน้าราคาเมื่อ 18.11.2026 วิธีตรวจ: เทียบค่าใช้จ่ายหนึ่งเดือนใน Console กับราคาของสมาชิก
</b-chapter>
<b-chapter id="check" title="ตรวจว่าทุกอย่างทำงานอย่างไร" icon="check-circle">
  <b-why>การติดตั้งที่ทำงานได้จะแสดงหมายเลขเวอร์ชันพร้อมข้อความ “(Claude Code)”<b-proof href="https://code.claude.com/docs/en/setup" quote="Claude Code: «A working installation prints a version number such as 2.1.211 (Claude Code)» — code.claude.com/docs/en/setup"/> จากนั้นคือการวินิจฉัย วิธีเข้าสู่ระบบ และคำถามแรกเกี่ยวกับโปรเจกต์</b-why>

  การตรวจมีห้าขั้นสั้น ๆ และแต่ละขั้นตอบคำถามของตัวเอง เวอร์ชันแสดงว่าพบโปรแกรมและมันเริ่มทำงานได้ การวินิจฉัยรวบรวมรายงานเรื่องการติดตั้งและการตั้งค่าโดยไม่เริ่มเซสชัน สถานะภายในเซสชันบอกว่าคุณเข้าสู่ระบบด้วยอะไร: สมาชิกหรือ key คำถามเกี่ยวกับโปรเจกต์ทดสอบทั้งสายในครั้งเดียว: การเข้าสู่ระบบ เครือข่าย และการอ่านไฟล์ การอัปเดตแสดงว่าการติดตั้งรับเวอร์ชันใหม่ได้
  <iso-art name="claude-code-install-and-price/check-ladder"></iso-art>
  <b-cap>บันไดการตรวจ: เวอร์ชัน การวินิจฉัย สถานะ คำถามเกี่ยวกับโปรเจกต์ การอัปเดต</b-cap>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>การตรวจ</th><th>คำสั่ง</th><th>ควรเห็นอะไร</th></tr>
    </thead>
    <tbody>
      <tr><td>เวอร์ชัน</td><td><code>claude --version</code></td><td>หมายเลขเวอร์ชันและ “(Claude Code)”</td></tr>
      <tr><td>การวินิจฉัย</td><td><code>claude doctor</code></td><td>รายงานเรื่องการติดตั้งและการตั้งค่าโดยไม่เริ่มเซสชัน</td></tr>
      <tr><td>การเข้าสู่ระบบ</td><td><code>/status</code> ภายในเซสชัน</td><td>วิธีเข้าสู่ระบบ: สมาชิกหรือ key</td></tr>
      <tr><td>ทำงานกับโปรเจกต์</td><td>คำถาม “what does this project do?”</td><td>คำอธิบายสั้น ๆ ของโปรเจกต์</td></tr>
      <tr><td>การอัปเดต</td><td><code>claude update</code></td><td>“Claude Code is up to date”</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-sublabel top="18">ตัวอย่างการคิดจริง</b-sublabel>

  ซาราห์อาศัยอยู่ในดับลินและเพิ่งติดตั้ง Claude Code บนแล็ปท็อป เธอเปิดเทอร์มินัลหน้าต่างใหม่และพิมพ์ <code>claude --version</code> หมายเลขเวอร์ชันปรากฏพร้อมข้อความ “(Claude Code)” แปลว่าพบโปรแกรมแล้ว จากนั้นเธอสั่ง <code>claude doctor</code> และได้รายงานการติดตั้ง ในโฟลเดอร์โปรเจกต์เธอสั่ง <code>claude</code> พิมพ์ <code>/status</code> และเห็นว่าเธอเข้าสู่ระบบด้วยสมาชิกโดยไม่มี key เข้ามาเกี่ยว ขั้นสุดท้ายคือคำถาม “what does this project do?”: ถ้าได้คำอธิบายสั้น ๆ ของโปรเจกต์ แปลว่าทั้งสายทำงานได้ คุณตรวจเองได้ในห้านาทีโดยไล่ตารางจากบนลงล่าง

  <b-sublabel top="18">ข้อผิดพลาดที่พบบ่อย</b-sublabel>

  หยุดที่เวอร์ชัน หมายเลขเวอร์ชันยืนยันแค่ว่าพบโปรแกรมใน PATH ไม่ได้ตรวจการเข้าสู่ระบบ เครือข่าย หรือสิทธิ์ของไฟล์ ถ้าเวอร์ชันแสดงแต่คำถามเกี่ยวกับโปรเจกต์ไม่ได้คำตอบ ให้หาสาเหตุที่การเข้าสู่ระบบ: ตรวจ <code>/status</code> และสั่ง <code>/login</code> ถ้าจำเป็น
</b-chapter>
<b-chapter id="errors" title="ข้อผิดพลาดการติดตั้งที่พบบ่อย" icon="alert-circle">
  <b-why>เอกสารมีวิธีแก้สำหรับทุกข้อความผิดพลาด: ตาราง “Find your error” ในหน้า “Troubleshoot installation and login”<b-proof href="https://code.claude.com/docs/en/troubleshoot-install" quote="Claude Code: the “Find your error” table gives a fix for each message — code.claude.com/docs/en/troubleshoot-install"/> วันที่ตรวจสอบ: 18.11.2026</b-why>

  ข้อผิดพลาดการติดตั้งอ่านจากข้อความที่แสดง: จากข้อความไปสู่สาเหตุ และจากสาเหตุไปสู่การกระทำ สาเหตุส่วนใหญ่ธรรมดา: โฟลเดอร์ติดตั้งไม่อยู่ใน PATH (รายการโฟลเดอร์ที่เทอร์มินัลใช้หาโปรแกรม) คำสั่งเป็นของเชลล์ผิดตัว หรือสิทธิ์หรือหน่วยความจำไม่พอ ประเทศนอกรายชื่อที่รองรับเป็นอีกกรณีหนึ่ง: ตารางอธิบายไว้ในแถวเรื่อง 403 และ “App unavailable in region”
  <iso-art name="claude-code-install-and-price/install-errors"></iso-art>
  <b-cap>ต้นไม้ข้อผิดพลาด: เห็นอะไร สาเหตุคืออะไร ต้องทำอะไร</b-cap>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>เห็นอะไร</th><th>สาเหตุ</th><th>ต้องทำอะไร</th></tr>
    </thead>
    <tbody>
      <tr><td><code>command not found: claude</code> หรือ “'claude' is not recognized”</td><td>โฟลเดอร์ติดตั้งไม่อยู่ใน PATH</td><td>เปิดเทอร์มินัลหน้าต่างใหม่; บน macOS และ Linux เพิ่ม <code>~/.local/bin</code> ลงใน PATH</td></tr>
      <tr><td><code>The token '&amp;&amp;' is not a valid statement separator</code></td><td>รันคำสั่งของ CMD ใน PowerShell</td><td>ใช้คำสั่ง <code>irm … | iex</code></td></tr>
      <tr><td><code>'irm' is not recognized</code></td><td>รันคำสั่งของ PowerShell ใน CMD</td><td>ใช้คำสั่ง <code>curl … install.cmd</code></td></tr>
      <tr><td><code>syntax error near unexpected token '&lt;'</code></td><td>ได้หน้าเว็บมาแทนสคริปต์</td><td>ตรวจเครือข่ายและพร็อกซี เปิดส่วนวิธีแก้ในเอกสาร</td></tr>
      <tr><td><code>curl: (22) … 403</code></td><td>พร็อกซีหรือตัวกรองบล็อกที่อยู่นั้น หรือประเทศอยู่นอกรายชื่อที่รองรับ</td><td>ตรวจเครือข่าย; เรื่องรายชื่อประเทศและสิ่งที่ต้องทำ อ่าน<a href="/blog/claude-code-access-regions-vpn-bans/">บทความเรื่องการเข้าถึงตามประเทศ VPN และการแบน</a></td></tr>
      <tr><td><code>EACCES: permission denied</code></td><td>ไม่มีสิทธิ์ในโฟลเดอร์ติดตั้ง</td><td>แก้สิทธิ์ของโฟลเดอร์ ไม่ใช้ <code>sudo</code></td></tr>
      <tr><td><code>TLS connect error</code></td><td>ใบรับรองล้าสมัย หรือพร็อกซีที่ตรวจสอบทราฟฟิก</td><td>อัปเดตใบรับรองของระบบ</td></tr>
      <tr><td><code>Killed</code> ระหว่างติดตั้งบน Linux</td><td>หน่วยความจำไม่พอ</td><td>คืนหน่วยความจำหรือเพิ่ม swap</td></tr>
      <tr><td><code>App unavailable in region</code></td><td>Claude Code ใช้ไม่ได้ในประเทศนั้น</td><td>ตรวจรายชื่อประเทศที่รองรับ: <a href="/blog/claude-code-access-regions-vpn-bans/">Claude Code ใช้ไม่ได้ในประเทศของคุณ: รายชื่อประเทศที่รองรับ VPN และการแบน</a></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-sublabel top="18">ตัวอย่างการคิดจริง</b-sublabel>

  มาเตอุสอาศัยอยู่ในเซาเปาลูและติดตั้ง Claude Code บน Mac ด้วยคำสั่งเดียว ตัวติดตั้งทำงานเสร็จ แต่เทอร์มินัลแสดง “command not found: claude” เขาคิดว่าการติดตั้งพัง และอยากรันใหม่ ก่อนอื่นเขาเปิดเทอร์มินัลหน้าต่างใหม่ เพราะหน้าต่างเก่าไม่รู้จักโฟลเดอร์ใหม่ ถ้าข้อความยังอยู่ สาเหตุคือ PATH และเขาต้องเพิ่ม <code>~/.local/bin</code> ลงในไฟล์ตั้งค่า zsh แล้วเปิดหน้าต่างใหม่อีกครั้ง (คำสั่งอยู่ในกล่องถัดไป) หลังจากนั้น <code>claude --version</code> แสดงเวอร์ชัน วิธีตรวจว่าคุณทำเหมือนกัน: ดูผลลัพธ์ของ <code>claude --version</code>

  <b-sublabel top="18">PATH บน macOS ที่ใช้ zsh</b-sublabel>
  <b-codebox title="เพิ่มโฟลเดอร์ลงใน PATH" copy>
    echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
  </b-codebox>

  สำหรับ bash ให้ใช้ <code>~/.bashrc</code> แทน <code>~/.zshrc</code> หลังแก้แล้วเปิดเทอร์มินัลหน้าต่างใหม่<b-proof href="https://code.claude.com/docs/en/troubleshoot-install" quote="Claude Code: «echo 'export PATH=&quot;$HOME/.local/bin:$PATH&quot;' >> ~/.zshrc» — code.claude.com/docs/en/troubleshoot-install"/>

  <b-sublabel top="18">ความเข้าใจผิดที่พบบ่อย</b-sublabel>

  <b>ถ้าหา claude ไม่เจอ แปลว่าตัวติดตั้งล้มเหลวใช่ไหม?</b> ส่วนใหญ่มันทำงานสำเร็จ และเทอร์มินัลแค่ไม่รู้จักโฟลเดอร์ใหม่: ในตารางคือแถว PATH ที่มีวิธีแก้ “เปิดเทอร์มินัลหน้าต่างใหม่” วิธีตรวจ: เปิดหน้าต่างใหม่และสั่ง <code>claude --version</code> ซ้ำ

  <b>การเปลี่ยนเครือข่ายแก้ข้อผิดพลาด 403 ได้ทุกครั้งไหม?</b> ไม่ใช่ ในตาราง 403 มีสองสาเหตุ: พร็อกซีหรือตัวกรอง หรือประเทศอยู่นอกรายชื่อที่รองรับ ในกรณีหลัง เครือข่ายไม่ช่วย และต้องดูรายชื่อประเทศของ Anthropic

  <b>EACCES แก้ได้ด้วย sudo หรือเปล่า?</b> ไม่ได้ ตารางระบุว่าวิธีแก้คือแก้สิทธิ์ของโฟลเดอร์ และบอกว่าไม่ให้ใช้ <code>sudo</code>
</b-chapter>
<b-chapter id="region" title="การเข้าถึงจากรัสเซีย" icon="flag">
  <b-why>รัสเซียไม่อยู่ในรายชื่อประเทศที่รองรับอย่างเป็นทางการของ Anthropic และเงื่อนไขระบุ Claude Code ไว้ในผลิตภัณฑ์ที่ใช้ได้เฉพาะในประเทศที่อยู่ในรายชื่อ วันที่ตรวจสอบ: 18.11.2026 เงื่อนไขมีผลเมื่อ 12.11.2026<b-proof href="https://www.anthropic.com/supported-countries" quote="Anthropic: «Any country or region not listed is unsupported» — anthropic.com/supported-countries"/></b-why>

  รายชื่อประเทศเป็นเอกสารของ Anthropic ที่ระบุสถานที่ที่ใช้ Claude ได้ ประเทศหรือภูมิภาคใดที่ไม่อยู่ในรายชื่อถือว่าไม่รองรับ ในรายชื่อไม่มีรายการ “Russia” การติดตั้งและการเข้าสู่ระบบจากรัสเซียจึงไม่รองรับ Anthropic ไม่ได้บอกเหตุผล ผมเดาว่าเหตุผลอยู่ที่นโยบายของสหรัฐฯ และประเทศอื่น: การคว่ำบาตร ข้อจำกัดการส่งออก และกฎหมาย นี่เป็นการเดา และในเอกสารของบริษัทไม่มีคำอธิบายแบบนี้
  <iso-art name="claude-code-access-regions-vpn-bans/world-map"></iso-art>
  <b-cap>แผนที่ประเทศที่ Anthropic รองรับ Claude Code และประเทศที่อยู่นอกรายชื่อ</b-cap>

  ระหว่างติดตั้งจะเห็นเป็นข้อความ “App unavailable in region” และข้อผิดพลาด 403 ตอนดาวน์โหลด: ทั้งสองแถวอยู่ในตารางข้อผิดพลาด สมาชิกแบบเสียเงินไม่ปลดข้อจำกัด: รายชื่อใช้กับแผนแบบเสียเงินและ API key เหมือนกัน ข้อจำกัดนี้หมายความว่าอย่างไร วิธีอ่านรายการที่มีวงเล็บ และสิ่งที่ทำได้อย่างถูกต้องถ้าประเทศของคุณไม่อยู่ในรายชื่อ อธิบายละเอียดในบทความแยกต่างหาก
  <b-links cols="1">
    <item href="/blog/claude-code-access-regions-vpn-bans/" k="รายละเอียด" t="Claude Code ใช้ไม่ได้ในประเทศของคุณ: รายชื่อประเทศที่รองรับ VPN และการแบน">ข้อจำกัดนี้หมายความว่าอย่างไรและควรทำอะไร</item>
  </b-links>
</b-chapter>
<b-chapter id="alt" title="ทางเลือกอื่นแทน Claude Code" icon="grid">
  <b-why>ทางเลือกอื่นทำสิ่งเดียวกับ Claude Code: อ่านโปรเจกต์ แก้ไฟล์ และรันคำสั่ง ต่างกันที่โมเดล ราคา และที่ทำงาน แต่ละตัวมีเงื่อนไขการเข้าถึงของตัวเอง ซึ่งตรวจได้บนเว็บไซต์ของโปรแกรมนั้น</b-why>

  ทางเลือกคือเอเจนต์เขียนโค้ดอีกตัว: ทำงานในเทอร์มินัลหรือในเอดิเตอร์ และแก้ไฟล์โปรเจกต์ตามที่คุณขอ เลือกด้วยสามคำถาม โมเดลของใครอยู่ข้างใน ทำงานที่ไหน: ในเทอร์มินัล ในแอป หรือในเอดิเตอร์ และจ่ายเงินอย่างไร เอเจนต์แต่ละตัวมีคำอธิบายในอภิธานศัพท์ของเว็บไซต์ ข้อมูลเรื่อง Gemini CLI และ Antigravity CLI มาจากบทความของทั้งสองตัว ซึ่งระบุวันที่ไว้ด้วย
  <iso-art name="claude-code-install-and-price/alternatives-map"></iso-art>
  <b-cap>แผนที่ทางเลือก: OpenCode, Codex, Cursor, Gemini CLI และตัวต่อ Antigravity CLI</b-cap>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>เอเจนต์</th><th>ของใคร บนโมเดลอะไร</th><th>ทำงานที่ไหน</th></tr>
    </thead>
    <tbody>
      <tr><td>OpenCode</td><td>เอเจนต์โอเพนซอร์ส คุณเลือกโมเดลเอง: Claude, GPT, Gemini และอื่น ๆ ผ่าน API หรือโมเดลในเครื่อง; คุณจ่ายให้ผู้ให้บริการโมเดล</td><td>เทอร์มินัล แอป เว็บ</td></tr>
      <tr><td>Codex</td><td>OpenAI โมเดล GPT</td><td>ChatGPT แอป เทอร์มินัล IDE</td></tr>
      <tr><td>Cursor</td><td>Anysphere เอดิเตอร์บน VS Code ที่มีเอเจนต์ในตัว; โมเดลของตัวเองและของบริษัทอื่น</td><td>เอดิเตอร์</td></tr>
      <tr><td>Gemini CLI</td><td>Google โมเดล Gemini; หยุดทำงานสำหรับผู้ใช้ทั่วไปเมื่อ 18 มิถุนายน 2026</td><td>เทอร์มินัล</td></tr>
      <tr><td>Antigravity CLI</td><td>Google; Gemini CLI ถูกย้ายมาอยู่ในนี้</td><td>เทอร์มินัล แอป Antigravity</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-sublabel top="18">เลือกอย่างไร</b-sublabel>

  ถ้าต้องการโมเดลของตัวเองและจ่ายตรงให้ผู้ให้บริการ ให้ดู OpenCode ถ้าจ่ายค่า ChatGPT อยู่แล้ว ให้ดู Codex ถ้าชอบทำงานในเอดิเตอร์มากกว่าเทอร์มินัล ให้ดู Cursor ถ้าเคยใช้ Gemini CLI ตอนนี้ Antigravity CLI เข้ามาแทนที่ คำสั่งติดตั้งของทางเลือกอื่นไม่ได้ระบุไว้ที่นี่: แต่ละตัวมีของตัวเองและเปลี่ยนได้ หาได้บนเว็บไซต์ของโปรแกรมนั้นเอง
  <b-links cols="2">
    <item href="/materials/glossary/opencode/" k="ศัพท์" t="OpenCode">เอเจนต์โอเพนซอร์สบนเทอร์มินัล</item>
    <item href="/materials/glossary/codex/" k="ศัพท์" t="Codex">เอเจนต์ของ OpenAI</item>
    <item href="/materials/glossary/cursor/" k="ศัพท์" t="Cursor">เอดิเตอร์พร้อมเอเจนต์</item>
    <item href="/materials/glossary/gemini-cli/" k="ศัพท์" t="Gemini CLI">เอเจนต์เทอร์มินัลของ Google</item>
    <item href="/materials/glossary/antigravity-cli/" k="ศัพท์" t="Antigravity CLI">ตัวต่อจาก Gemini CLI</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="เปรียบเทียบ" t="Codex กับ Claude Code, Cursor กับ Hermes Agent: เปรียบเทียบเอเจนต์ AI สำหรับเขียนโค้ด">เอเจนต์ไหนเหมาะกับงานแบบไหน</item>
    <item href="/blog/codex-or-chatgpt-what-to-choose/" k="เลือก" t="Codex คืออะไร ต่างจาก ChatGPT อย่างไร: เลือกอะไรสำหรับทำงานกับโค้ด">แชตหรือเอเจนต์เขียนโค้ด</item>
  </b-links>
</b-chapter>
<b-chapter id="prompts" title="คำสั่งสำเร็จรูปสำหรับเอเจนต์" icon="chat">
  <b-why>สี่คำสั่งสำหรับเซสชันแรก วางลงใน Claude Code หลังสั่ง <code>claude</code> ในโฟลเดอร์โปรเจกต์</b-why>

  คำสั่งเรียงจากเบาไปหนัก: ก่อนอื่นเอเจนต์อ่านและเล่าเท่านั้น จากนั้นสร้างไฟล์กฎ จากนั้นแก้เล็กน้อย และท้ายสุดรันเทสต์ ทุกคำสั่งขอให้แสดงผลก่อนเขียน หรือให้ไฟล์คงเดิม เซสชันแรกจึงปลอดภัย
  <b-codebox title="1. ทำความรู้จักโปรเจกต์" copy>
    โปรเจกต์นี้ทำอะไร ใช้เทคโนโลยีอะไรบ้าง และจุดเริ่มต้นหลักอยู่ที่ไหน ตอบเป็นรายการห้าข้อ
  </b-codebox>
  <b-codebox title="2. กฎของโปรเจกต์" copy>
    อ่านโปรเจกต์แล้วสร้างไฟล์ CLAUDE.md: คำสั่งสร้างและเทสต์ โครงสร้างโฟลเดอร์ และสิ่งที่ห้ามแตะ แสดงข้อความให้ผมดูก่อนเขียน
  </b-codebox>
  <b-codebox title="3. การแก้ไขเล็กน้อย" copy>
    เพิ่มหัวข้อ “การติดตั้ง” ใน README พร้อมคำสั่งจาก package.json แสดงการเปลี่ยนแปลงให้ผมดูและรอให้ผมยืนยัน
  </b-codebox>
  <b-codebox title="4. ตรวจว่าทำงานได้" copy>
    รันเทสต์ของโปรเจกต์และแสดงรายการที่ล้มเหลว เสนอสาเหตุของแต่ละรายการ แต่ยังอย่าแก้ไฟล์ใด ๆ
  </b-codebox>
  <b-links cols="1">
    <item href="/materials/glossary/claude-md/" k="ศัพท์" t="CLAUDE.md">ไฟล์กฎของโปรเจกต์ที่ Claude Code อ่านทุกเซสชัน</item>
  </b-links>
</b-chapter>
<b-chapter id="faq" icon="chat" title="คำถามที่พบบ่อย">
  <b-faq-cards>
    <q t="ติดตั้ง Claude Code อย่างไร?">เปิดเทอร์มินัลและสั่งคำสั่งเดียว: บน macOS, Linux และ WSL ใช้ curl -fsSL https://claude.ai/install.sh | bash บน Windows ใน PowerShell ใช้ irm https://claude.ai/install.ps1 | iex จากนั้นเปิดเทอร์มินัลหน้าต่างใหม่ ตรวจ claude --version และสั่ง claude ในโฟลเดอร์โปรเจกต์ แหล่งที่มา: code.claude.com/docs/en/setup วันที่ตรวจสอบ: 18.11.2026</q>
    <q t="Claude Code ราคาเท่าไร?">ไม่มีราคาแยก: Claude Code รวมอยู่ในสมาชิก เมื่อ 18.11.2026 Pro ราคา 20 ดอลลาร์ต่อเดือนเมื่อจ่ายรายเดือน Max 100 Ultra 200 ที่นั่ง Team 25 แผนฟรีไม่รวม Claude Code ทางเลือกแทนสมาชิกคือจ่ายตาม API ผ่าน Console แหล่งที่มา: claude.com/pricing</q>
    <q t="Claude Code ใช้ได้ในรัสเซียไหม?">รัสเซียไม่อยู่ในรายชื่อประเทศที่รองรับอย่างเป็นทางการของ Anthropic และเงื่อนไขระบุ Claude Code ไว้ในผลิตภัณฑ์ที่ใช้ได้เฉพาะในประเทศที่อยู่ในรายชื่อ ประเทศใดที่อยู่นอกรายชื่อถือว่าไม่รองรับ เงื่อนไขมีผลเมื่อ 12.11.2026 แหล่งที่มา: anthropic.com/supported-countries วันที่ตรวจสอบ: 18.11.2026 อ่านเพิ่มใน<a href="/blog/claude-code-access-regions-vpn-bans/">บทความเรื่องการเข้าถึงตามประเทศ VPN และการแบน</a></q>
    <q t="อะไรแทน Claude Code ได้?">เอเจนต์ที่คล้ายกัน: OpenCode ที่ใช้โมเดลที่คุณเลือก, Codex จาก OpenAI, เอดิเตอร์ Cursor ที่มีเอเจนต์ในตัว และจาก Google คือ Antigravity CLI แทน Gemini CLI ที่ปิดสำหรับผู้ใช้ทั่วไป การเข้าถึงและราคาต่างกันในแต่ละตัว และตรวจได้บนเว็บไซต์ของโปรแกรมนั้น</q>
    <q t="Claude Code อยู่ในแผนฟรีไหม?">ไม่อยู่ Claude Code ต้องใช้บัญชี Pro, Max, Ultra, Team, Enterprise หรือ Console แผน claude.ai ฟรีไม่รวมสิทธิ์เข้าถึง แหล่งที่มา: code.claude.com/docs/en/setup</q>
    <q t="รู้ได้อย่างไรว่า Claude Code เข้าสู่ระบบด้วยสมาชิกหรือ key?">สั่ง claude ในโฟลเดอร์โปรเจกต์แล้วพิมพ์ /status: คำสั่งแสดงวิธีเข้าสู่ระบบที่ใช้อยู่ ถ้าตั้งตัวแปร ANTHROPIC_API_KEY ไว้ในระบบ Claude Code จะใช้ key แทนสมาชิก เพื่อกลับไปใช้สมาชิก ให้สั่ง unset ANTHROPIC_API_KEY แหล่งที่มา: code.claude.com/docs/en/authentication</q>
  </b-faq-cards>
</b-chapter>
<b-chapter id="next" title="อ่านเพิ่มเติม">
  <b-links cols="2">
    <item href="/blog/claude-code-access-regions-vpn-bans/" k="การเข้าถึง" t="Claude Code ใช้ไม่ได้ในประเทศของคุณ: รายชื่อประเทศที่รองรับ VPN และการแบน">ข้อจำกัดตามประเทศหมายความว่าอย่างไร</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="เปรียบเทียบ" t="Codex กับ Claude Code, Cursor กับ Hermes Agent: เปรียบเทียบเอเจนต์ AI สำหรับเขียนโค้ด">เอเจนต์ไหนเหมาะกับงานแบบไหน</item>
    <item href="/blog/specs-rules-skills/" k="บริบท" t="AGENTS.md และ CLAUDE.md คืออะไร: ไฟล์ตัวอย่าง และที่เก็บ spec, rule และ skill">ไฟล์กฎสำหรับเอเจนต์</item>
    <item href="/blog/cursor-rules-vs-agents-md/" k="กฎ" t="Cursor rules กับ AGENTS.md: อะไรควรอยู่ตรงไหน">อะไรควรอยู่ตรงไหน</item>
    <item href="/blog/harness-driven-development/" k="วิธีการ" t="Harness engineering ในทางปฏิบัติ: เปลี่ยนความผิดพลาดของเอเจนต์ AI ให้เป็นกฎของสภาพแวดล้อม (HDD)">ความผิดพลาดของเอเจนต์กลายเป็นกฎ</item>
  </b-links>
</b-chapter>
<b-footer>อ้างอิงจากเอกสาร Claude Code, claude.com/pricing, ศูนย์ช่วยเหลือของ Claude และเงื่อนไขการเข้าถึงของ Anthropic วันที่ตรวจสอบ: 18.11.2026 ราคาและรายชื่อประเทศเปลี่ยนได้</b-footer>
</b-post>
