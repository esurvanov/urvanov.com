---
title: Claude Code: install and pricing, plans and availability by country
seoTitle: Claude Code: install and pricing in 2026, plans and access
date: 2026-11-17
updated: 2026-11-17
description: How to install Claude Code on Mac, Linux and Windows, which Claude plans include it, when an API key is needed and where it works. Commands and errors.
tags: AI, Claude Code, install, pricing, plans, harness
category: harness
layout: wide
mentions: Claude Code, OpenCode, Codex, Cursor, Gemini CLI, Antigravity CLI, CLAUDE.md
toc: answer=Quick answer | what=What it is | install=Install | login=First run | plans=Plans | check=Check | errors=Errors | region=Availability | alt=Alternatives | prompts=Prompts | faq=Questions | next=Further reading
---

Claude Code installs with one terminal command: on macOS, Linux and WSL `curl -fsSL https://claude.ai/install.sh | bash`, on Windows in PowerShell `irm https://claude.ai/install.ps1 | iex`. Signing in needs a Claude Pro subscription ($20 a month), Max, Ultra, Team or Enterprise, or a Console account billed by API usage; the free plan does not include it. Checked 17.11.2026.

<b-post series="harness">
<b-chapter id="answer" title="Quick answer" icon="crosshair">
  <b-why>Installing takes one command and sign-in happens in the browser. Paid access is always required: a subscription or API billing<b-proof href="https://code.claude.com/docs/en/setup" quote="Claude Code: “Claude Code requires a Pro, Max, Ultra, Team, Enterprise, or Console account. The free claude.ai plan does not include Claude Code access” — code.claude.com/docs/en/setup"/>.</b-why>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>Question</th><th>Answer as of 17.11.2026</th></tr>
    </thead>
    <tbody>
      <tr><td>How to install</td><td>one command: one for macOS, Linux and WSL, another for Windows PowerShell or CMD</td></tr>
      <tr><td>Price</td><td>Pro $20 a month, Max $100, Ultra $200; Team from $25 a seat<b-proof href="https://claude.com/pricing" quote="Claude: Pro “$20 if billed monthly”, Max “$100”, Ultra “$200”, Team standard seat “$25 if billed monthly” — claude.com/pricing"/></td></tr>
      <tr><td>What includes it</td><td>Claude Code is in Pro, Max, Ultra, Team and Enterprise; the free plan has no Claude Code</td></tr>
      <tr><td>Availability</td><td>Russia is not in Anthropic's official country list; the terms name Claude Code among the products with this restriction<b-proof href="https://www.anthropic.com/supported-countries" quote="Anthropic: “Any country or region not listed is unsupported” — anthropic.com/supported-countries"/></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
</b-chapter>
<b-chapter id="what" title="What Claude Code is" icon="terminal">
  <b-why>Claude Code is a coding agent from Anthropic. It reads the project, edits files, runs commands and tests, and works with git. Claude in a chat answers with text, while Claude Code changes the project's files itself.</b-why>
  <b-links cols="1">
    <item href="/materials/glossary/claude-code/" k="Term" t="Claude Code">What it does, where it runs, which models</item>
  </b-links>
  <b-cap>It runs in the terminal, in VS Code and JetBrains, in the desktop app, in the browser, in Slack and in CI. This article covers the terminal, the main way to use it<b-proof href="https://code.claude.com/docs/en/quickstart" quote="Claude Code: “Claude Code is also available on the web, as a desktop app, in VS Code and JetBrains IDEs, in Slack, and in CI/CD” — code.claude.com/docs/en/quickstart"/>.</b-cap>
  <iso-art name="term:claude-code"></iso-art>
</b-chapter>
<b-chapter id="install" title="Install step by step" icon="arrow-down">
  <b-why>Requirements: macOS 13+, Windows 10 1809+ or Windows Server 2019+, Ubuntu 20.04+, Debian 10+, Alpine 3.19+; 4 GB+ of memory, an x64 or ARM64 processor, internet<b-proof href="https://code.claude.com/docs/en/setup" quote="Claude Code: “macOS 13.0+”, “Windows 10 1809+ or Windows Server 2019+”, “Ubuntu 20.04+”, “4 GB+ RAM” — code.claude.com/docs/en/setup"/>. Commands come from the install page, checked 17.11.2026.</b-why>
  <b-seq-row>
    <step t="Terminal">open a terminal window</step>
    <step t="Command">paste the command for your system</step>
    <step t="New window">open the terminal again</step>
    <step t="Version">claude --version</step>
  </b-seq-row>
  <b-sublabel top="18">macOS, Linux and WSL</b-sublabel>
  <b-codebox title="Terminal" copy>
    curl -fsSL https://claude.ai/install.sh | bash
  </b-codebox>
  <b-sublabel top="18">Windows: PowerShell (the prompt starts with PS)</b-sublabel>
  <b-codebox title="PowerShell" copy>
    irm https://claude.ai/install.ps1 | iex
  </b-codebox>
  <b-sublabel top="18">Windows: CMD (the prompt has no PS)</b-sublabel>
  <b-codebox title="CMD" copy>
    curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
  </b-codebox>
  <b-cap>The installer shows no progress while it downloads. Administrator rights are not needed on Windows. Git for Windows is optional: without it Claude Code runs shell commands through PowerShell<b-proof href="https://code.claude.com/docs/en/setup" quote="Claude Code: “Installing Git for Windows is optional” — code.claude.com/docs/en/setup"/>.</b-cap>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>Method</th><th>Command</th><th>Updates</th></tr>
    </thead>
    <tbody>
      <tr><td>Installer (recommended)</td><td><code>curl -fsSL https://claude.ai/install.sh | bash</code></td><td>automatic, in the background</td></tr>
      <tr><td>Homebrew (macOS)</td><td><code>brew install --cask claude-code</code></td><td>manual: <code>brew upgrade claude-code</code></td></tr>
      <tr><td>WinGet (Windows)</td><td><code>winget install Anthropic.ClaudeCode</code></td><td>manual: <code>winget upgrade Anthropic.ClaudeCode</code></td></tr>
      <tr><td>npm (needs Node.js 22+)</td><td><code>npm install -g @anthropic-ai/claude-code@latest</code></td><td>rerun the install command</td></tr>
      <tr><td>apt, dnf, apk</td><td>add the Anthropic repository as the documentation describes</td><td>with the usual system upgrade</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>With npm, install without <code>sudo</code>: the documentation warns that such an install cannot update itself<b-proof href="https://code.claude.com/docs/en/setup" quote="Claude Code: “Do NOT use sudo npm install -g as this can lead to permission issues and security risks” — code.claude.com/docs/en/setup"/>.</b-cap>
  <b-sublabel top="18">Windows: native or WSL</b-sublabel>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>Option</th><th>When to pick it</th><th>Command sandboxing</th></tr>
    </thead>
    <tbody>
      <tr><td>Native Windows</td><td>projects and programs for Windows</td><td>not supported</td></tr>
      <tr><td>WSL 2</td><td>Linux programs or sandboxed commands</td><td>supported</td></tr>
      <tr><td>WSL 1</td><td>if WSL 2 is unavailable</td><td>not supported</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>In WSL the Linux command runs inside the WSL window, not from PowerShell<b-proof href="https://code.claude.com/docs/en/setup" quote="Claude Code: “You install and launch claude inside the WSL terminal, not from PowerShell or CMD” — code.claude.com/docs/en/setup"/>. On Alpine, <code>bash</code> and <code>curl</code> are needed first: <code>apk add bash curl</code>.</b-cap>
</b-chapter>
<b-chapter id="login" title="First run and sign-in" icon="key">
  <b-why>Sign-in goes through the browser: Claude Code opens the page itself, and after signing in the terminal shows “Login successful”<b-proof href="https://code.claude.com/docs/en/authentication" quote="Claude Code: “When login completes, the terminal shows Login successful and prompts you to press Enter to continue” — code.claude.com/docs/en/authentication"/>.</b-why>
  <b-seq-row>
    <step t="Folder">go to the project folder</step>
    <step t="Start">claude</step>
    <step t="Browser">sign in to your Claude account</step>
    <step t="Question">ask about the project</step>
  </b-seq-row>
  <b-codebox title="First run" copy>
    cd path/to/project
    claude
  </b-codebox>
  <b-cap>If the browser does not open, press <code>c</code> to copy the sign-in address to the clipboard. Sign out with <code>/logout</code>, sign in again with <code>/login</code>. In-session help is <code>/help</code>.</b-cap>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>Sign in with</th><th>Who it is for</th></tr>
    </thead>
    <tbody>
      <tr><td>Pro, Max or Ultra subscription</td><td>one person, claude.ai account</td></tr>
      <tr><td>Team or Enterprise</td><td>an employee invited by an administrator</td></tr>
      <tr><td>Claude Console</td><td>API billing with pre-paid credits</td></tr>
      <tr><td>Amazon Bedrock, Google Cloud, Microsoft Foundry</td><td>organizations with a cloud provider</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>The account list comes from the authentication and quickstart pages of the documentation<b-proof href="https://code.claude.com/docs/en/quickstart" quote="Claude Code: “Claude Console (API access with pre-paid credits)” — code.claude.com/docs/en/quickstart"/>.</b-cap>
</b-chapter>
<b-chapter id="plans" title="Plans: what is included and the price" icon="coin">
  <b-why>Prices and contents come from claude.com/pricing as of 17.11.2026. Plans change, so reopen the page before paying.</b-why>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>Plan</th><th>Price per month</th><th>Claude Code</th><th>Usage</th></tr>
    </thead>
    <tbody>
      <tr><td>Free</td><td>$0</td><td>no</td><td>limited</td></tr>
      <tr><td>Pro</td><td>$20 billed monthly, $17 billed annually ($200 up front)</td><td>yes</td><td>baseline</td></tr>
      <tr><td>Max</td><td>$100</td><td>yes</td><td>5x Pro</td></tr>
      <tr><td>Ultra</td><td>$200</td><td>yes</td><td>10x Pro every week</td></tr>
      <tr><td>Team, standard seat</td><td>$25 monthly, $20 billed annually</td><td>yes</td><td>per-seat plan usage</td></tr>
      <tr><td>Team, premium seat</td><td>$125 monthly, $100 billed annually</td><td>yes</td><td>5x a standard seat</td></tr>
      <tr><td>Enterprise</td><td>on the page: $20 per seat per month billed annually, 20 seats minimum</td><td>yes</td><td>by contract</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>Source: claude.com/pricing, checked 17.11.2026<b-proof href="https://claude.com/pricing" quote="Claude: Free “Claude Code: No”, Pro “$20 if billed monthly”, Ultra “10x Pro usage every week”, Team premium seat “5x more usage than standard seats” — claude.com/pricing"/>.</b-cap>
  <b-sublabel top="18">Limits</b-sublabel>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>Plan</th><th>Limit</th></tr>
    </thead>
    <tbody>
      <tr><td>Pro and Max</td><td>a five-hour session limit and a weekly limit<b-proof href="https://support.claude.com/en/articles/11145838-using-claude-code-with-your-pro-or-max-plan" quote="Claude Help Center: “Pro and Max plans have a five-hour session limit and a weekly limit” — support.claude.com"/></td></tr>
      <tr><td>Ultra</td><td>a weekly limit; verified Ultra accounts have no five-hour limit</td></tr>
      <tr><td>All subscriptions</td><td>the limit is shared between Claude in chat and Claude Code</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>When a limit is reached you can turn on extra usage with credits or buy API credits at standard API rates. To stay within the subscription, decline the credit option.</b-cap>
  <b-sublabel top="18">API key instead of a subscription</b-sublabel>
  <b-finding>
    <ex>If the <code>ANTHROPIC_API_KEY</code> variable is set, Claude Code uses the key instead of the subscription and the usage is billed at API rates.</ex>
    <gen>A subscription has a fixed price and limits; a key is billed by volume. A key pays off when the load is irregular or when costs must be split by project.</gen>
    <do>To go back to the subscription, remove the variable (<code>unset ANTHROPIC_API_KEY</code>) and check the sign-in method with <code>/status</code><b-proof href="https://code.claude.com/docs/en/authentication" quote="Claude Code: “Run unset ANTHROPIC_API_KEY to fall back to your subscription, and check /status to confirm which method is active” — code.claude.com/docs/en/authentication"/>.</do>
  </b-finding>
  <b-cap>Per-million-token prices by model are not listed here: they were not checked on the pricing page on 17.11.2026.</b-cap>
</b-chapter>
<b-chapter id="check" title="How to check that it works" icon="check-circle">
  <b-why>Three checks: version, diagnostics, a first question. A working install prints a version number followed by “(Claude Code)”<b-proof href="https://code.claude.com/docs/en/setup" quote="Claude Code: “A working installation prints a version number such as 2.1.211 (Claude Code)” — code.claude.com/docs/en/setup"/>.</b-why>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>Check</th><th>Command</th><th>Expected</th></tr>
    </thead>
    <tbody>
      <tr><td>Version</td><td><code>claude --version</code></td><td>a version number and “(Claude Code)”</td></tr>
      <tr><td>Diagnostics</td><td><code>claude doctor</code></td><td>a report on the install and settings without starting a session</td></tr>
      <tr><td>Sign-in</td><td><code>/status</code> inside a session</td><td>the sign-in method: subscription or key</td></tr>
      <tr><td>Working with a project</td><td>the question “what does this project do?”</td><td>a short description of the project</td></tr>
      <tr><td>Update</td><td><code>claude update</code></td><td>“Claude Code is up to date”</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
</b-chapter>
<b-chapter id="errors" title="Common install errors" icon="alert-circle">
  <b-why>Errors and fixes come from the “Troubleshoot installation and login” page, checked 17.11.2026<b-proof href="https://code.claude.com/docs/en/troubleshoot-install" quote="Claude Code: the “Find your error” table gives a fix for each message — code.claude.com/docs/en/troubleshoot-install"/>.</b-why>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>What you see</th><th>Cause</th><th>What to do</th></tr>
    </thead>
    <tbody>
      <tr><td><code>command not found: claude</code> or “'claude' is not recognized”</td><td>the install folder is not on PATH</td><td>open a new terminal window; on macOS and Linux add <code>~/.local/bin</code> to PATH</td></tr>
      <tr><td><code>The token '&amp;&amp;' is not a valid statement separator</code></td><td>the CMD command was run in PowerShell</td><td>use the <code>irm … | iex</code> command</td></tr>
      <tr><td><code>'irm' is not recognized</code></td><td>the PowerShell command was run in CMD</td><td>use the <code>curl … install.cmd</code> command</td></tr>
      <tr><td><code>syntax error near unexpected token '&lt;'</code></td><td>a web page came back instead of the script</td><td>check the network and proxy, open the documentation's fix section</td></tr>
      <tr><td><code>curl: (22) … 403</code></td><td>a proxy or filter blocks the address, or the country is not supported</td><td>check the network; the country list is in the availability section below</td></tr>
      <tr><td><code>EACCES: permission denied</code></td><td>no rights to the install folder</td><td>fix the folder permissions, do not use <code>sudo</code></td></tr>
      <tr><td><code>TLS connect error</code></td><td>outdated certificates or proxy traffic inspection</td><td>update the system certificates</td></tr>
      <tr><td><code>Killed</code> during install on Linux</td><td>not enough memory</td><td>free memory or add swap</td></tr>
      <tr><td><code>App unavailable in region</code></td><td>Claude Code is not available in the country</td><td>see the list of supported countries</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-sublabel top="18">PATH on macOS with zsh</b-sublabel>
  <b-codebox title="Add the folder to PATH" copy>
    echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
  </b-codebox>
  <b-cap>For bash use <code>~/.bashrc</code> instead of <code>~/.zshrc</code>. Open a new terminal window afterwards<b-proof href="https://code.claude.com/docs/en/troubleshoot-install" quote="Claude Code: “echo 'export PATH=&quot;$HOME/.local/bin:$PATH&quot;' >> ~/.zshrc” — code.claude.com/docs/en/troubleshoot-install"/>.</b-cap>
</b-chapter>
<b-chapter id="region" title="Availability by country, including Russia" icon="flag">
  <b-why>Access follows the official country list. Checked 17.11.2026 on the Anthropic page; the terms take effect 12.11.2026.</b-why>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>What it says</th><th>Source</th></tr>
    </thead>
    <tbody>
      <tr><td>Russia is not in the list of supported countries</td><td>anthropic.com/supported-countries</td></tr>
      <tr><td>“Any country or region not listed is unsupported”<b-proof href="https://www.anthropic.com/supported-countries" quote="Anthropic: “Any country or region not listed is unsupported” — anthropic.com/supported-countries"/></td><td>same page</td></tr>
      <tr><td>The terms name Claude Code, Claude.ai and the API: they are available only in the listed countries</td><td>same page</td></tr>
      <tr><td>Access is also closed to organizations incorporated or controlled from an unsupported region</td><td>same page</td></tr>
      <tr><td>Location is one of Claude Code's system requirements</td><td>code.claude.com/docs/en/setup</td></tr>
      <tr><td>The error “App unavailable in region” means Claude Code is not available in the country</td><td>code.claude.com/docs/en/troubleshoot-install</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>The pages checked do not describe card payments or sign-in from a specific country. Such questions go to Anthropic support: support.claude.com. The country list can change, so check it on the official page before installing.</b-cap>
</b-chapter>
<b-chapter id="alt" title="Claude Code alternatives" icon="grid">
  <b-why>Alternatives do the same: read the project, edit files, run commands. They differ in model, price and where they run. Each one has a glossary entry; access terms differ per product and are checked on the product's own site.</b-why>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>Agent</th><th>Whose, which model</th><th>Where it runs</th></tr>
    </thead>
    <tbody>
      <tr><td>OpenCode</td><td>open-source agent, you pick the model: Claude, GPT, Gemini and others through an API or a local one; you pay the model provider</td><td>terminal, desktop app, web</td></tr>
      <tr><td>Codex</td><td>OpenAI, GPT models</td><td>ChatGPT, desktop app, terminal, IDE</td></tr>
      <tr><td>Cursor</td><td>Anysphere, a VS Code-based editor with a built-in agent; its own models and other vendors' models</td><td>editor</td></tr>
      <tr><td>Gemini CLI</td><td>Google, Gemini models; since June 18, 2026 it no longer serves individual users</td><td>terminal</td></tr>
      <tr><td>Antigravity CLI</td><td>Google; Gemini CLI moved into it</td><td>terminal, Antigravity app</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>Descriptions come from the site glossary; the Gemini CLI and Antigravity CLI facts come from their entries, with dates. Install commands for the alternatives are not given here: each has its own and they change.</b-cap>
  <b-links cols="2">
    <item href="/materials/glossary/opencode/" k="Term" t="OpenCode">Open-source terminal agent</item>
    <item href="/materials/glossary/codex/" k="Term" t="Codex">OpenAI's agent</item>
    <item href="/materials/glossary/cursor/" k="Term" t="Cursor">Editor with an agent</item>
    <item href="/materials/glossary/gemini-cli/" k="Term" t="Gemini CLI">Google's terminal agent</item>
    <item href="/materials/glossary/antigravity-cli/" k="Term" t="Antigravity CLI">Successor to Gemini CLI</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="Comparison" t="Codex or Claude Code, Cursor and Hermes Agent">Which agent for which task</item>
    <item href="/en/blog/codex-or-chatgpt-what-to-choose/" k="Choice" t="Codex or ChatGPT: which to choose">Chat or a coding agent</item>
  </b-links>
</b-chapter>
<b-chapter id="prompts" title="Ready-made prompts for the agent" icon="chat">
  <b-why>Prompts for the first session. Paste them into Claude Code after running <code>claude</code> in the project folder.</b-why>
  <b-codebox title="1. Get to know the project" copy>
    What does this project do? Which technologies does it use and where is the main entry point? Answer in a list of five points.
  </b-codebox>
  <b-codebox title="2. Project rules" copy>
    Read the project and create a CLAUDE.md file: build and test commands, folder structure, what must not be touched. Show me the text before writing it.
  </b-codebox>
  <b-codebox title="3. A small change" copy>
    Add an "Installation" section to the README with the commands from package.json. Show the change and wait for my confirmation.
  </b-codebox>
  <b-codebox title="4. Check that it works" copy>
    Run the project's tests and list the failing ones. Suggest a cause for each, but do not change any files yet.
  </b-codebox>
  <b-links cols="1">
    <item href="/materials/glossary/claude-md/" k="Term" t="CLAUDE.md">The project rules file Claude Code reads in every session</item>
  </b-links>
</b-chapter>
<b-chapter id="faq" icon="chat" title="Frequently asked questions">
  <b-faq-cards>
    <q t="How do I install Claude Code?">Open a terminal and run one command: on macOS, Linux and WSL curl -fsSL https://claude.ai/install.sh | bash, on Windows in PowerShell irm https://claude.ai/install.ps1 | iex. Then open a new terminal window, check claude --version and run claude in a project folder. Source: code.claude.com/docs/en/setup, checked 17.11.2026.</q>
    <q t="How much does Claude Code cost?">There is no separate price: Claude Code is included in subscriptions. As of 17.11.2026 Pro is $20 a month billed monthly, Max is $100, Ultra is $200, a Team seat is $25; the free plan does not include Claude Code. The alternative to a subscription is API billing through Console. Source: claude.com/pricing.</q>
    <q t="Does Claude Code work in Russia?">Russia is not in Anthropic's official list of supported countries, and the terms name Claude Code among the products available only in the listed countries. Any country outside the list counts as unsupported. The terms take effect 12.11.2026. Source: anthropic.com/supported-countries, checked 17.11.2026.</q>
    <q t="What can replace Claude Code?">Similar agents: OpenCode with a model of your choice, OpenAI's Codex, the Cursor editor with a built-in agent, and from Google Antigravity CLI in place of Gemini CLI, which no longer serves individual users. Access and prices differ per product and are checked on the product's own site.</q>
  </b-faq-cards>
</b-chapter>
<b-chapter id="next" title="Further reading">
  <b-links cols="2">
    <item href="/blog/ai-in-code-harness-and-tools/" k="Comparison" t="Codex or Claude Code, Cursor and Hermes Agent">Which agent for which task</item>
    <item href="/blog/specs-rules-skills/" k="Context" t="AGENTS.md, CLAUDE.md and spec.md: what goes where">Rules files for the agent</item>
    <item href="/blog/cursor-rules-vs-agents-md/" k="Rules" t="Cursor rules and AGENTS.md">What goes where</item>
    <item href="/blog/harness-driven-development/" k="Method" t="Harness-Driven Development">An agent's mistake becomes a rule</item>
  </b-links>
</b-chapter>
<b-footer>Based on the Claude Code documentation, claude.com/pricing, the Claude help center and Anthropic's access terms; checked 17.11.2026. Prices and the country list change.</b-footer>
</b-post>
