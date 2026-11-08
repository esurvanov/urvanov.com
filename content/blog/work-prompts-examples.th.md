---
title: Prompt สำหรับงานจริง: ห้าส่วนและหกตัวอย่างสำหรับ ChatGPT และ Claude
date: 2026-09-28
updated: 2026-11-08
description: Prompt สำหรับทำงานกับแชต AI: ส่วนประกอบของ prompt งานที่ดี คำขอที่อ่อนและที่แข็งแรงต่างกันอย่างไร เทมเพลตพร้อมใช้หกแบบสำหรับงานที่พบบ่อย และวิธีเก็บไว้ใน project อ้างอิงคู่มือของ Anthropic, OpenAI และ Google
tags: AI, prompt, ChatGPT, Claude
category: prompts
layout: wide
toc: model=Human-in-the-loop | parts=ห้าส่วน | examples=หกตัวอย่าง | learn=ควรศึกษาอะไร | faq=คำถาม | next=อ่านเพิ่มเติม
---

prompt งานสำหรับ ChatGPT และ Claude ประกอบด้วยห้าส่วน: บทบาท คำตอบนี้สำหรับใครและเพื่ออะไร ข้อมูลครบถ้วน ตัวอย่าง และรูปแบบ โดยวางคำถามไว้ท้ายสุด โมเดลรู้เฉพาะสิ่งที่คำขอบอก วิธีตรวจง่าย ๆ: ให้เพื่อนร่วมงานที่ไม่รู้บริบทอ่าน prompt ถ้าเขางง โมเดลก็จะงงเช่นกัน ด้านล่างคือคำขอที่อ่อนและที่แข็งแรง และเทมเพลตหกแบบสำหรับงานที่พบบ่อย

<b-post series="prompts">
<b-flow lead label="คำขอเดียว ผลลัพธ์สองแบบ">
  <b-lane title="ประโยคเดียว" color="muted">
    <node icon="chat" t="คำขอ">“เขียนคำตอบถึงลูกค้า”</node>
    <node icon="ai-box" t="โมเดล">เดาบริบท</node>
    <node icon="file-x" t="คำตอบทั่วไป">ต้องเขียนใหม่ด้วยมือ</node>
  </b-lane>
  <b-lane title="หกส่วน" color="accent">
    <node icon="prompt-stripes" t="Prompt">บทบาท ข้อมูล ตัวอย่าง รูปแบบ</node>
    <node icon="ai-box" t="โมเดล">เห็นทุกอย่างที่ต้องใช้</node>
    <node icon="file-check" t="ร่าง">แก้เล็กน้อย</node>
  </b-lane>
</b-flow>
<b-cap>โมเดลเป็นตัวเดียวกันทั้งสองกรณี ผลลัพธ์ขึ้นอยู่กับสิ่งที่ prompt บอก: หกส่วนที่ปรากฏซ้ำในคู่มือของ Anthropic, OpenAI และ Google</b-cap>
<b-chapter id="model" title="Human-in-the-loop: เส้นทางของคำขอหนึ่งครั้ง" icon="share">
  <b-art names="work-prompts-examples/prompt-map" wide/>
  <b-finding>
    <ex>คนถือทุกจุดสำคัญ: กำหนดงาน สร้าง prompt ตรวจคำตอบ ส่งกลับไปปรับ และตัดสินใจ โมเดลตอบเฉพาะสิ่งที่อยู่ในคำขอ</ex>
    <gen>ทุกลูกศรมีจุดตรวจของตัวเอง: ข้อมูลเข้าไปครบ คำตอบถูกตรวจเทียบกับผู้ที่ต้องใช้ และคำขอที่ดีถูกเก็บเป็นเทมเพลต งานประเภทเดียวกันครั้งต่อไปจึงเริ่มจากมัน</gen>
    <do>ก่อนเขียนคำขอ ให้ระบุผู้อ่านและการตัดสินใจที่เขาจะทำจากคำตอบ: บทบาทและรูปแบบตามมาจากนั้น</do>
  </b-finding>
  <b-cta href="/blog/harness-driven-development/" k="ขั้นต่อไป · HDD" t="Harness-Driven Development">วิธีเปลี่ยนการตรวจในแผนภาพนี้ให้เป็นกฎที่ใช้ได้กับทุกงานถัดไป</b-cta>
</b-chapter>
<b-chapter id="parts" title="ห้าส่วนของ prompt" icon="grid">
  <b-prompt-anatomy label="โครงสร้างของ prompt: บทบาท ผู้รับและเป้าหมาย ข้อมูลทั้งหมดในแท็ก ตัวอย่าง รูปแบบ คำถามท้ายสุด" order="order">
    <part kind="role" icon="user-round" t="บทบาท" tip="บทบาท: “คุณคือเจ้าหน้าที่ฝ่ายสนับสนุน” ประโยคเดียวกำหนดน้ำเสียงและระดับ"><b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “Setting a role in the system prompt focuses Claude&#39;s behavior and tone for your use case. Even a single sentence makes a difference” — platform.claude.com, Prompting best practices"/></part>
    <part kind="who" icon="target" t="ผู้รับและเป้าหมาย" tip="ใครและทำไม: ใครอ่านผลลัพธ์ และมันนำไปสู่การตัดสินใจอะไร"><b-proof href="https://academy.openai.com/public/clubs/work-users-ynjqu/resources/prompting" quote="OpenAI Academy: “Be clear about what you need ChatGPT to do. Outline what you want, who it&#39;s for, and why it matters” — academy.openai.com, Prompting"/><b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “Providing context or motivation behind your instructions, such as explaining to Claude why such behavior is important, can help Claude better understand your goals and deliver more targeted responses” — platform.claude.com, Prompting best practices"/></part>
    <part kind="data" icon="file-text" t="ข้อมูลทั้งหมด" tip="ข้อมูลครบ: วางเธรด เอกสาร หรือตารางทั้งหมด ข้อมูลยาวไว้ด้านบน คำถามไว้ท้ายสุด" tag="data"><b-proof href="https://academy.openai.com/public/clubs/work-users-ynjqu/resources/prompting" quote="OpenAI Academy: “Add any background (or documentation) that will help” — academy.openai.com, Prompting"/><b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “Place your long documents and inputs near the top of your prompt, above your query, instructions, and examples”; “Queries at the end can improve response quality by up to 30 percent in tests” — platform.claude.com, Prompting best practices"/></part>
    <part kind="ex" icon="card-text" t="ตัวอย่าง" tip="ตัวอย่าง: หนึ่งถึงสามตัวอย่างของน้ำเสียงหรือรูปแบบที่ต้องการ" tag="example" note="1–3"><b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “Include 3–5 examples for best results” — platform.claude.com, Prompting best practices"/><b-proof href="https://www.kaggle.com/whitepaper-prompt-engineering" quote="Google, Prompt Engineering: its best practices include providing examples, being specific about the output and using instructions over constraints. Paraphrased — kaggle.com/whitepaper-prompt-engineering"/></part>
    <part kind="fmt" icon="list-dots" t="รูปแบบ" tip="รูปแบบ: “5 ข้อ ข้อละหนึ่งบรรทัด” บอกว่าให้ทำอะไร แทนการไล่รายการสิ่งที่ห้าม" note="5 ข้อ"><b-proof href="https://academy.openai.com/public/clubs/work-users-ynjqu/resources/prompting" quote="OpenAI Academy: “Tell ChatGPT how you&#39;d like the response” — academy.openai.com, Prompting"/><b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “Tell Claude what to do instead of what not to do” — platform.claude.com, Prompting best practices"/></part>
    <part kind="q" icon="help" t="คำถามท้ายสุด" tip="วางเธรด เอกสาร หรือตารางทั้งหมด ข้อมูลยาวไว้ด้านบน คำถามไว้ท้ายสุด"></part>
    <tags t="แท็ก" tip="แท็กสำหรับแต่ละส่วน: &lt;thread&gt;…&lt;/thread&gt; แยกข้อมูลออกจากคำสั่ง"><b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “Wrapping each type of content in its own tag (for example, &lt;instructions&gt;, &lt;context&gt;, &lt;input&gt;) reduces misinterpretation” — platform.claude.com, Prompting best practices"/></tags>
  </b-prompt-anatomy>
  <b-finding>
    <ex>ห้าส่วนบวกแท็ก แต่ละอย่างมีคู่มืออย่างเป็นทางการรองรับ</ex>
    <gen>โมเดลรู้เฉพาะสิ่งที่ prompt บอก Anthropic เสนอวิธีทดสอบ: ให้เพื่อนร่วมงานที่ไม่มีบริบทอ่าน prompt ถ้าเขางง โมเดลก็จะงงเช่นกัน<b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “Show your prompt to a colleague with minimal context on the task and ask them to follow it. If they&#39;d be confused, Claude will be too” — platform.claude.com, Prompting best practices"/></gen>
    <do>เปิด prompt ล่าสุดของคุณ แล้วทำเครื่องหมายว่าขาดส่วนไหนในห้าส่วน เพิ่มบทบาทและรูปแบบ: สองประโยค</do>
  </b-finding>
</b-chapter>
<b-chapter id="examples" title="หกตัวอย่าง" icon="browser-tab">
  <b-prompt-tabs name="ex-en">
    <b-prompt-tab id="client" icon="chat" label="ตอบลูกค้า" title="ตอบเธรดของลูกค้า">
      <b-why>ลูกค้าเขียนมาเป็นครั้งที่สาม น้ำเสียงต้องสงบ และสัญญาได้เฉพาะสิ่งที่เธรดกล่าวไว้แล้ว</b-why>
      <b-prompt-parts>
        <part icon="user-alt">บทบาท</part>
        <part icon="help-circle" off>ใครและทำไม</part>
        <part icon="file-text">ข้อมูลครบ</part>
        <part icon="checklist">ตัวอย่าง</part>
        <part icon="lines-alt">รูปแบบ</part>
      </b-prompt-parts>
      <b-prompt>
        คุณคือเจ้าหน้าที่ฝ่ายสนับสนุนของ [บริษัท]
        ด้านล่างคือเธรดทั้งหมดกับลูกค้า
        &lt;thread&gt;
        [วางทั้งหมด]
        &lt;/thread&gt;
        เขียนคำตอบถัดไป น้ำเสียง: สงบและเป็นมิตร เหมือนตัวอย่างนี้
        &lt;example&gt;
        [คำตอบที่ดีในอดีตหนึ่งฉบับ]
        &lt;/example&gt;
        ไม่เกิน 5 ประโยค ระบุวันที่เฉพาะที่ปรากฏในเธรด
      </b-prompt>
      <b-finding>
        <ex>บทบาท เธรดในแท็ก ตัวอย่างน้ำเสียง และกฎรูปแบบสองข้อ</ex>
        <gen>คำตอบในอดีตกำหนดน้ำเสียงได้ดีกว่าคำคุณศัพท์ใด ๆ กฎเรื่องวันที่เขียนเป็นการอนุญาตที่มีเงื่อนไข และโมเดลทำตามตามตัวอักษร</gen>
        <do>เก็บคำตอบที่ดีที่สุดของทีมสองสามฉบับ แล้วใส่หนึ่งฉบับในบล็อกตัวอย่าง</do>
      </b-finding>
    </b-prompt-tab>
    <b-prompt-tab id="meeting" icon="calendar" label="เตรียมประชุม" title="เตรียมตัวสำหรับการประชุม">
      <b-why>ประชุม 30 นาทีพรุ่งนี้ เอกสารกระจายอยู่ในเธรดและไฟล์ต่าง ๆ</b-why>
      <b-prompt-parts>
        <part icon="user-alt" off>บทบาท</part>
        <part icon="help-circle">ใครและทำไม</part>
        <part icon="file-text">ข้อมูลครบ</part>
        <part icon="checklist" off>ตัวอย่าง</part>
        <part icon="lines-alt">รูปแบบ</part>
      </b-prompt-parts>
      <b-prompt>
        พรุ่งนี้ฉันประชุมกับ [ใคร] เรื่อง [หัวข้อ] 30 นาที เป้าหมายของฉันคือ [การตัดสินใจที่ต้องการ]
        &lt;materials&gt;
        [เธรดและเอกสาร]
        &lt;/materials&gt;
        เตรียม:
        1. คำถามสามข้อที่ต้องตกลงในที่ประชุม
        2. สำหรับแต่ละข้อ เอกสารบอกอะไรไว้แล้ว พร้อมคำพูดสั้น ๆ ที่ยกมา
        3. สิ่งที่ฉันต้องหาให้ได้ก่อนประชุม
        รูปแบบ: ตารางสามคอลัมน์
      </b-prompt>
      <b-cap>OpenAI Academy มีเทมเพลตวาระการประชุมพร้อมเวลาประมาณการ<b-proof href="https://academy.openai.com/public/resources/chatgpt-for-any-role" quote="OpenAI Academy, ChatGPT for any role: “Create a structured agenda for a meeting about [topic]. Break the agenda into sections with time estimates and goals for each section” — academy.openai.com"/></b-cap>
      <b-finding>
        <ex>เป้าหมายของการประชุม เอกสารในแท็ก และรายการลำดับเลขของสิ่งที่ต้องส่งกลับ</ex>
        <gen>เป้าหมายของการประชุมกรองเอกสาร ขั้นตอนที่มีเลขลำดับช่วยเมื่อลำดับและความครบถ้วนสำคัญ<b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “Show your prompt to a colleague with minimal context on the task and ask them to follow it. If they&#39;d be confused, Claude will be too” — platform.claude.com, Prompting best practices"/></gen>
        <do>ก่อนการประชุมที่ยาว 30 นาทีขึ้นไป ให้ส่งเอกสารผ่าน prompt นี้ และเปิดประชุมด้วยตารางที่ได้</do>
      </b-finding>
    </b-prompt-tab>
    <b-prompt-tab id="summary" icon="summary-lines" label="สรุปเธรด" title="สรุปเธรดยาว">
      <b-why>แชต 200 ข้อความ ต้องรู้ว่าตัดสินใจอะไรและใครทำอะไร</b-why>
      <b-prompt-parts>
        <part icon="user-alt" off>บทบาท</part>
        <part icon="help-circle" off>ใครและทำไม</part>
        <part icon="file-text">ข้อมูลครบ</part>
        <part icon="checklist" off>ตัวอย่าง</part>
        <part icon="lines-alt">รูปแบบ</part>
      </b-prompt-parts>
      <b-prompt>
        &lt;thread&gt;
        [วางทั้งหมด]
        &lt;/thread&gt;
        ก่อนอื่น คัดลอกคำพูดตรง ๆ ตรงที่มีการตัดสินใจหรือมอบหมายงาน
        จากนั้นสร้างสรุปจากคำพูดเหล่านั้น:
        — การตัดสินใจ;
        — งานพร้อมผู้รับผิดชอบและวันที่;
        — คำถามที่ยังเปิดอยู่
        หนึ่งบรรทัดต่อหนึ่งรายการ หากคำพูดไม่ระบุผู้รับผิดชอบ ให้เขียนว่า “ยังไม่มอบหมาย”
      </b-prompt>
      <b-finding>
        <ex>เธรดยาวอยู่ด้านบน งานอยู่ท้ายสุด คำพูดมาก่อน แล้วจึงสรุป</ex>
        <gen>สำหรับเอกสารยาว Anthropic แนะนำให้ขอคำพูดก่อน<b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “For long document tasks, ask Claude to quote relevant parts of the documents first before carrying out its task” — platform.claude.com, Prompting best practices"/> และวางคำถามหลังข้อมูล: ในการทดสอบ ช่วยให้คุณภาพดีขึ้นถึง 30%<b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “Place your long documents and inputs near the top of your prompt, above your query, instructions, and examples”; “Queries at the end can improve response quality by up to 30 percent in tests” — platform.claude.com, Prompting best practices"/> กฎ “ยังไม่มอบหมาย” ป้องกันไม่ให้โมเดลแต่งชื่อผู้รับผิดชอบขึ้นมาเอง</gen>
        <do>กับทุกเธรดที่ยาวกว่าหนึ่งหน้าจอ ให้เริ่มด้วยการขอคำพูด</do>
      </b-finding>
    </b-prompt-tab>
    <b-prompt-tab id="table" icon="table" label="วิเคราะห์ตาราง" title="วิเคราะห์ตาราง">
      <b-why>ทิกเก็ตหนึ่งเดือนที่ส่งออกเป็น CSV หาว่าอะไรเปลี่ยนไป</b-why>
      <b-prompt-parts>
        <part icon="user-alt" off>บทบาท</part>
        <part icon="help-circle" off>ใครและทำไม</part>
        <part icon="file-text">ข้อมูลครบ</part>
        <part icon="checklist" off>ตัวอย่าง</part>
        <part icon="lines-alt">รูปแบบ</part>
      </b-prompt-parts>
      <b-prompt>
        แนบไฟล์ส่งออกของ [ทิกเก็ต] ช่วง [ระยะเวลา] เป็น CSV
        นับ [ทิกเก็ต] ตาม [หัวข้อ] และแสดงการเปลี่ยนแปลงที่ใหญ่ที่สุด 5 รายการเทียบกับเดือนก่อน
        สำหรับแต่ละรายการ ให้ตัวเลขและหนึ่งบรรทัดว่าอะไรอาจอธิบายได้
        แสดงโค้ดที่ใช้ เพื่อให้ฉันตรวจได้
      </b-prompt>
      <b-cap>ทั้ง ChatGPT และ Claude ประมวลผลไฟล์ใน sandbox ที่แยกออกมา<b-proof href="https://help.openai.com/en/articles/8437071-data-analysis-with-chatgpt" quote="ChatGPT: for data analysis it writes and runs Python in an isolated environment; review the code, output and assumptions before relying on the result. Paraphrased from the OpenAI Help Center — help.openai.com/en/articles/8437071"/><b-proof href="https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude" quote="Claude: “When Claude executes code or creates files, it operates within an isolated, sandboxed container” — support.claude.com/en/articles/12111783"/></b-cap>
      <b-finding>
        <ex>ไฟล์ทั้งหมด เมตริกและการแจกแจงที่ชัดเจน ขีดจำกัด "5 อันดับแรก" และคำขอโค้ด</ex>
        <gen>โมเดลคำนวณด้วยโค้ดใน sandbox และโค้ดอ่านทวนได้ OpenAI แนะนำให้ตรวจโค้ด ผลลัพธ์ และข้อสมมติก่อนพึ่งพาผล</gen>
        <do>ตรวจตัวเลขหนึ่งตัวจากคำตอบด้วยมือ ถ้าตรงกัน ก็เชื่อส่วนที่เหลือได้มากขึ้น</do>
      </b-finding>
    </b-prompt-tab>
    <b-prompt-tab id="style" icon="pen" label="น้ำเสียงบริษัท" title="ข้อความในน้ำเสียงของบริษัท">
      <b-why>ต้องการโพสต์หรืออีเมลที่ฟังเป็นเสียงของทีม ไม่ใช่เทมเพลต</b-why>
      <b-prompt-parts>
        <part icon="user-alt" off>บทบาท</part>
        <part icon="help-circle">ใครและทำไม</part>
        <part icon="file-text" off>ข้อมูลครบ</part>
        <part icon="checklist">ตัวอย่าง</part>
        <part icon="lines-alt">รูปแบบ</part>
      </b-prompt-parts>
      <b-prompt>
        นี่คือโพสต์ของทีมสามโพสต์ที่ได้ผลดี:
        &lt;example&gt;[โพสต์ 1]&lt;/example&gt;
        &lt;example&gt;[โพสต์ 2]&lt;/example&gt;
        &lt;example&gt;[โพสต์ 3]&lt;/example&gt;
        เขียนโพสต์เรื่อง [หัวข้อ] ในสไตล์เดียวกัน: ความยาว น้ำเสียง และโครงสร้างตามตัวอย่าง
        สำหรับใคร: [กลุ่มเป้าหมาย] เพื่ออะไร: [สิ่งที่ต้องการให้ผู้อ่านทำ]
      </b-prompt>
      <b-finding>
        <ex>สามตัวอย่างในแท็ก และหนึ่งบรรทัดว่าสำหรับใครและเพื่ออะไร</ex>
        <gen>Anthropic แนะนำ 3–5 ตัวอย่าง<b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “Include 3–5 examples for best results” — platform.claude.com, Prompting best practices"/> คู่มือของ Google ก็จัดตัวอย่างเป็นแนวปฏิบัติแรก<b-proof href="https://www.kaggle.com/whitepaper-prompt-engineering" quote="Google, Prompt Engineering: its best practices include providing examples, being specific about the output and using instructions over constraints. Paraphrased — kaggle.com/whitepaper-prompt-engineering"/> สไตล์ที่แสดงด้วยตัวอย่างถูกเลียนแบบได้แม่นกว่าสไตล์ที่อธิบายด้วยคำพูด</gen>
        <do>เก็บข้อความที่ดีไว้ใน project แล้วใช้เป็นตัวอย่าง จะได้ไม่ต้องวางซ้ำทุกครั้ง</do>
      </b-finding>
    </b-prompt-tab>
    <b-prompt-tab id="research" icon="search" label="ค้นคว้า" title="ค้นคว้าหัวข้อหนึ่ง">
      <b-why>ต้องการภาพรวมของตลาดหรือแนวปฏิบัติพร้อมแหล่งอ้างอิง ถ้าหาด้วยมือใช้เวลาครึ่งวัน</b-why>
      <b-prompt-parts>
        <part icon="user-alt" off>บทบาท</part>
        <part icon="help-circle">ใครและทำไม</part>
        <part icon="file-text" off>ข้อมูลครบ</part>
        <part icon="checklist" off>ตัวอย่าง</part>
        <part icon="lines-alt">รูปแบบ</part>
      </b-prompt-parts>
      <b-prompt>
        ค้นคว้า: [คำถาม]
        สำหรับใคร: [กลุ่มเป้าหมาย] เพื่ออะไร: [การตัดสินใจที่ต้องทำ]
        ข้อมูลไม่เก่ากว่า [ปี]
        ผลลัพธ์: ตาราง [คอลัมน์] และข้อสรุป 5 ข้อ
        ลิงก์แหล่งที่มาสำหรับทุกข้อเท็จจริง หากไม่มีข้อมูล ให้บอกตรง ๆ
      </b-prompt>
      <b-cap>แชตทั้งสองมีโหมดค้นคว้าเชิงลึก: deep research ใน ChatGPT และ Research ใน Claude<b-proof href="https://help.openai.com/en/articles/10500283-deep-research-in-chatgpt" quote="ChatGPT: deep research gathers and synthesises information from the web into a report, takes 5 to 30 minutes and includes source links. Paraphrased from the OpenAI Help Center — help.openai.com/en/articles/10500283"/><b-proof href="https://support.claude.com/en/articles/11088861-use-research-on-claude" quote="Claude: Research is “conducting multiple searches that build on each other”, answers come “complete with easy-to-check citations”; “available for users with paid Claude plans (Pro, Max, Team, or Enterprise)” — support.claude.com/en/articles/11088861"/></b-cap>
      <b-finding>
        <ex>เป้าหมาย ขีดจำกัดความใหม่ของข้อมูล และรูปแบบผลลัพธ์พร้อมลิงก์</ex>
        <gen>ในโหมดค้นคว้า โมเดลค้นหาต่อเนื่องหลายรอบและส่งรายงานพร้อมลิงก์กลับมา ลิงก์ช่วยให้ตรวจทุกข้อเท็จจริงได้ และ “หากไม่มีข้อมูล” ป้องกันไม่ให้ช่องว่างถูกเติมด้วยการเดา</gen>
        <do>เปิดลิงก์สองสามอันจากรายงานและตรวจข้อเท็จจริงกับแหล่งที่มา ก่อนส่งต่อข้อสรุป</do>
      </b-finding>
    </b-prompt-tab>
  </b-prompt-tabs>
</b-chapter>
<b-chapter id="learn" title="ควรศึกษาอะไรต่อ" icon="flag-alt">
  <b-why>เริ่มจากบทเรียน 7 นาที: อธิบายว่าทำไมเทคนิคในบทความนี้จึงได้ผล จากนั้นคู่มือการเขียน prompt และค่อยเรียนคอร์สเมื่อมีเวลา</b-why>
  <b-sublabel top="22">พื้นฐาน: AI ทำงานอย่างไร</b-sublabel>
  <b-links cols="2">
    <item href="https://academy.claude.com/tutorials/the-4-properties-of-ai" k="Claude Academy · บทเรียน 7 นาที" t="The 4 properties of AI" ext>การทำนายโทเคนถัดไป ความรู้ หน่วยความจำขณะทำงาน การบังคับทิศทางได้: จุดแข็งและจุดอ่อนของโมเดลมาจากไหน</item>
    <item href="https://academy.claude.com/courses/ai-capabilities-and-limitations" k="Claude Academy · คอร์ส 13 บทเรียน 3.5 ชั่วโมง" t="AI Capabilities and Limitations" ext>ทำไมโมเดลแต่งเรื่องอย่างมั่นใจ บริบทหมดตรงไหน และคำสั่งแบบไหนเชื่อถือได้</item>
    <item href="https://academy.claude.com/courses/ai-fluency-framework-foundations" k="Claude Academy · คอร์ส 14 บทเรียน 4 ชั่วโมง" t="AI Fluency: Framework & Foundations" ext>สี่ทักษะ: อะไรควรมอบหมาย อธิบายงานอย่างไร ตรวจผลอย่างไร และใครเป็นเจ้าของ</item>
  </b-links>
  <b-sublabel top="22">การเขียน prompt</b-sublabel>
  <b-links cols="2">
    <item href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" k="Anthropic · เอกสาร" t="Prompting best practices" ext>เอกสารอ้างอิงหลัก: ความชัดเจน ตัวอย่าง บทบาท แท็ก XML เอกสารยาว</item>
    <item href="https://claude.com/blog/best-practices-for-prompt-engineering" k="Anthropic · บล็อก" t="Best practices for prompt engineering" ext>งานฝีมือการเขียน prompt โดยทั่วไป ไม่ผูกกับโมเดลใดโดยเฉพาะ</item>
    <item href="https://github.com/anthropics/prompt-eng-interactive-tutorial" k="Anthropic · บทเรียน" t="Interactive tutorial" ext>9 บทพร้อมแบบฝึกหัด ตั้งแต่โครงสร้าง prompt ถึงแท็ก XML และตัวอย่าง</item>
    <item href="https://www.kaggle.com/whitepaper-prompt-engineering" k="Google · whitepaper" t="Prompt Engineering" ext>เทคนิคและแนวปฏิบัติ: ตัวอย่าง รูปแบบผลลัพธ์ คำสั่งดีกว่าข้อจำกัด</item>
    <item href="https://academy.openai.com/public/clubs/work-users-ynjqu/resources/prompting" k="OpenAI Academy" t="Prompting" ext>อะไร สำหรับใคร และทำไม บริบท รูปแบบผลลัพธ์ การปรับซ้ำ</item>
    <item href="https://academy.openai.com/public/resources/chatgpt-for-any-role" k="OpenAI Academy" t="ChatGPT for any role" ext>เทมเพลต prompt งานพร้อมใช้ แยกตามงานและบทบาท</item>
  </b-links>
  <b-sublabel top="22">สำหรับทีมและผู้ดูแลระบบ</b-sublabel>
  <b-links cols="2">
    <item href="https://support.claude.com/en/articles/14782391-claude-enterprise-consumption-guide" k="Claude · ศูนย์ช่วยเหลือ" t="Claude Enterprise consumption guide" ext>โทเคนถูกใช้อย่างไร: Claude Code และ Cowork ใช้มากกว่าแชตธรรมดาอย่างมาก; ขีดจำกัดของกลุ่มและโมเดลเริ่มต้น</item>
  </b-links>
</b-chapter>
<b-chapter id="faq" icon="chat" title="คำถามที่พบบ่อย">
  <b-faq-cards>
    <q t="prompt ที่ดีมีอะไรบ้าง?">ห้าส่วน: บทบาท คำตอบนี้สำหรับใครและเพื่ออะไร ข้อมูลครบถ้วน ตัวอย่าง และรูปแบบ คำถามอยู่ท้ายสุด</q>
    <q t="ตรวจ prompt อย่างไร?">ให้เพื่อนร่วมงานที่ไม่รู้บริบทอ่าน: ถ้าเขางง โมเดลก็จะงงเช่นกัน</q>
    <q t="ทำไมต้องใส่ตัวอย่างใน prompt?">ตัวอย่างคำตอบในอดีตกำหนดน้ำเสียงได้แม่นยำกว่าคำคุณศัพท์ใด ๆ</q>
    <q t="ควรทำอย่างไรกับ prompt ที่ดี?">เก็บเป็นเทมเพลต: งานประเภทเดียวกันครั้งต่อไปเริ่มจากมัน</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="อ่านเพิ่มเติม">
  <b-links cols="2">
    <item href="/blog/harness-work-approaches/" k="แนวทาง" t="ถ้าคำตอบไม่ตรง">วงจรคำตอบและการรีวิวที่แก้คำขอ</item>
    <item href="/blog/specs-rules-skills/" k="บริบท" t="Spec, bible, rule และ skill">prompt อยู่ที่ไหนนอกเหนือจากแชตเดียว</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="วิศวกรรม" t="AI ในงานโค้ด">harness และเครื่องมือสามกลุ่ม</item>
    <item href="/blog/chatgpt-enterprise-usage-report/" k="รายงาน" t="รายงานการใช้งาน ChatGPT Enterprise">ใครในบริษัทใช้อะไร</item>
  </b-links>
</b-chapter>
<b-footer>prompt เหล่านี้เป็นเทมเพลต: กรอกส่วนที่อยู่ในวงเล็บเหลี่ยม เทคนิคอ้างอิงคู่มืออย่างเป็นทางการของ Anthropic, OpenAI และ Google แหล่งที่มาอยู่หลังไอคอนข้างแต่ละข้อความ คำพูดจากศูนย์ช่วยเหลือของ OpenAI และคู่มือของ Google เป็นการสรุปความ</b-footer>
</b-post>
