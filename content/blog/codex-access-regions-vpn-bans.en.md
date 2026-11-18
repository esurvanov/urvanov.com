---
title: Codex CLI not available in your country: supported countries, VPN and bans
seoTitle: Codex CLI not available in your country (2026)
date: 2026-11-18
updated: 2026-11-18
description: What OpenAI's country list means for Codex, how sign-in works, what the terms say about VPNs, why accounts get banned and what the program sends.
tags: AI, Codex, OpenAI, supported countries, VPN, ban, Claude Code
category: harness
layout: wide
mentions: Codex, OpenAI, ChatGPT, Claude Code, Anthropic
toc: answer=Quick answer | list=Country list | login=Sign-in | vpn=VPN | bans=Bans | data=Data and settings | compare=Versus Claude Code | legal=Legal options | faq=Questions | start=Prompts | next=Further reading
---

Codex is officially unavailable in Russia: Russia is not on OpenAI's supported-countries list, and access outside it “may result in your account being blocked or suspended”. Codex CLI signs in through ChatGPT or an API key. No separate Codex regional rules were found, VPN is not mentioned, but bypassing restrictions and protective measures is forbidden.

<b-post series="harness">
<b-chapter id="answer" title="Quick answer" icon="crosshair">
  <b-why>Access to Codex is set by OpenAI's general list of countries for ChatGPT and the API. Russia is not on it<b-proof href="https://developers.openai.com/api/docs/supported-countries" quote="OpenAI: «Accessing or offering access to our services outside of the countries and territories listed below may result in your account being blocked or suspended.» — developers.openai.com/api/docs/supported-countries"/>.</b-why>

  <iso-art name="codex-access-regions-vpn-bans/world-map"></iso-art>
  <b-cap>Blue: the country is on the OpenAI list. Orange: the country is not on the list, with Russia in the stronger tone.</b-cap>
  <b-sublabel top="18">What this means in plain words</b-sublabel>

  OpenAI is the company that makes ChatGPT and Codex. Codex is an agent for programmers: it works in the terminal and in an app, reads the files of a project and edits code for the task you give it. OpenAI publishes a list of countries where its services are available. If your country is on the list, the regional rules do not get in your way. If it is not, access can end with the account being blocked. OpenAI does not explain why it is built this way. In my own guess, it is company policy plus the risk of sanctions, export controls and laws of the United States and other countries.

  Everyday example. Dana lives in Almaty and wants to try Codex. She opens the OpenAI list and finds the line “Kazakhstan”. The entry has no brackets and no reservations, so nothing in the region stands in the way. What remains is the ordinary part: sign in to a ChatGPT account or create an API key and choose a payment method. A person who is physically in Russia will not find such an entry.

  A common mistake is to assume that Codex lives by separate rules because it runs in the terminal and installs with one command. There is no separate country list for Codex, either on OpenAI's public pages or in the program's repository. Codex sign-in points to the general ChatGPT and API list. The second mistake concerns VPN, a program that replaces the address from which you reach the network. VPN is not mentioned in the country help or in the terms of use. The terms forbid circumventing restrictions and protective measures, and replacing an address may fall under that; this conclusion is mine, OpenAI has made no direct statement about it.

  You can check the answer in a minute: open the <a href="https://developers.openai.com/api/docs/supported-countries">OpenAI page with the list of supported countries</a> and find your country with the browser's page search. The help center at help.openai.com does not open for automated requests (error 403), so the rows of the list were checked on the developers.openai.com page.
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>Question</th><th>Answer</th><th>Status</th></tr>
    </thead>
    <tbody>
      <tr><td>🇷🇺 Russia on the OpenAI country list</td><td>no<b-proof href="https://developers.openai.com/api/docs/supported-countries" quote="OpenAI: «Accessing or offering access to our services outside of the countries and territories listed below may result in your account being blocked or suspended.» — developers.openai.com/api/docs/supported-countries"/></td><td>confirmed</td></tr>
      <tr><td>A separate country list for Codex</td><td>not found on public pages or in the repository</td><td>not found</td></tr>
      <tr><td>Sign-in</td><td>ChatGPT account or API key<b-proof href="https://learn.chatgpt.com/docs/auth" quote="OpenAI: «Sign in with ChatGPT for subscription access» / «Sign in with an API key for usage-based access» — learn.chatgpt.com/docs/auth"/></td><td>confirmed</td></tr>
      <tr><td>VPN in the terms and in the country help</td><td>not mentioned</td><td>not found</td></tr>
      <tr><td>A ban on circumventing restrictions and protective measures</td><td>present in the terms<b-proof href="https://openai.com/policies/row-terms-of-use/" quote="OpenAI: «circumvent any rate limits or restrictions or bypass any protective measures or safety mitigations we put on our Services» — openai.com/policies/row-terms-of-use"/></td><td>confirmed</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>Date checked: 18.11.2026. The article retells official documents and contains no ways to bypass restrictions.</b-cap>
</b-chapter>
<b-chapter id="list" title="OpenAI country list" icon="flag">
  <b-why>OpenAI keeps one list for ChatGPT and the API and publishes no separate list of unavailable countries<b-proof href="https://help.openai.com/en/articles/7947663-chatgpt-and-openai-api-supported-countries-and-territories" quote="OpenAI: «OpenAI does not publish a separate list of countries and territories that are not supported. If a location is not included in the list below, our API is not available there.» — help.openai.com/en/articles/7947663"/>. What the list does not name is unavailable.</b-why>

  The country list is an OpenAI page that names the places where ChatGPT and the API can be used. Codex belongs to the same set: it connects either through a ChatGPT account or with an API key, so both ways of signing in run into this list. There is no separate page called “countries where Codex is closed”. So the absence of a country from the list is the only signal that access is closed.
  <iso-art name="codex-access-regions-vpn-bans/list-gate"></iso-art>
  <b-cap>The list works as one gate for ChatGPT, the API and Codex: a country on the list passes, a country outside it is stopped.</b-cap>
  <b-sublabel top="18">How to read an entry</b-sublabel>

  Most entries in the list are a single word: “Armenia”, “Georgia”, “Kazakhstan”. Such an entry means the whole country is supported. Some entries carry a reservation. The most visible one is “Ukraine (with certain exceptions)”. I will take it apart. “Ukraine” names the country. The brackets with “with certain exceptions” mean that part of the territory is excluded. Which places are excluded is not named in the entry on the OpenAI page, and there is no list of exceptions on OpenAI's public pages. For comparison, Anthropic names the excluded regions of Ukraine one by one, while OpenAI has no such list in the entry. A practical rule follows: if your country is written with brackets, the single word from the list is not enough, and you will have to clarify the answer with OpenAI support.

  Everyday example. Arsen lives in Yerevan and is building a team with colleagues from Armenia, Georgia and Ukraine. He opens the list and finds “Armenia” and “Georgia” without brackets: for people located in those countries there are no questions. He reads the entry “Ukraine (with certain exceptions)” more carefully and asks a colleague from Kyiv to write to OpenAI support to find out whether his city falls under the exceptions. You can check it yourself like this: find the country with the page search and see whether brackets follow the name.
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>Country</th><th>OpenAI (ChatGPT and API)</th></tr>
    </thead>
    <tbody>
      <tr><td>Russia, Belarus</td><td>not on the list</td></tr>
      <tr><td>China, Hong Kong, Macao</td><td>not on the list</td></tr>
      <tr><td>Iran, Cuba, North Korea, Syria</td><td>not on the list</td></tr>
      <tr><td>Kazakhstan, Georgia, Armenia, Uzbekistan</td><td>on the list</td></tr>
      <tr><td>Ukraine</td><td>on the list “with certain exceptions”<b-proof href="https://developers.openai.com/api/docs/supported-countries" quote="OpenAI: «Ukraine (with certain exceptions)» — developers.openai.com/api/docs/supported-countries"/></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>Rows checked on 18.11.2026 against the list on developers.openai.com. Before deciding, open the OpenAI page and find your country: the list changes.</b-cap>
  <b-finding>
    <ex>The country is not named in the list: so there is no access to Codex through ChatGPT and the API there.</ex>
    <gen>OpenAI writes “not available there” about the API, and the terms warn of an account block for access outside the list. There is no exception for Codex on public pages.</gen>
    <do>Before installing, find your country on the OpenAI page. If it is missing, treat access as closed.</do>
  </b-finding>
  <b-sublabel top="18">How the OpenAI list differs from the Anthropic list</b-sublabel>

  Anthropic, the company that makes Claude Code, has a list of its own, and it does not fully match OpenAI's. Russia, Belarus, China, Iran, Cuba, North Korea and Syria are on neither. Afghanistan, Myanmar and Yemen are on the OpenAI list and missing from Anthropic's. So a country check for one agent does not replace the check for another: open the list of the one you plan to install. Neither company explains the differences.
</b-chapter>
<b-chapter id="login" title="How Codex signs in" icon="key">
  <b-why>The Codex sign-in documentation points to the general list of countries and contains no regional restrictions of its own<b-proof href="https://learn.chatgpt.com/docs/auth" quote="OpenAI: «Sign in with ChatGPT for subscription access» — learn.chatgpt.com/docs/auth"/>.</b-why>

  Sign-in is the way Codex proves to OpenAI's servers that requests come from your account. There are two ways, and each is tied to its own billing. Signing in with ChatGPT uses a ChatGPT subscription: you pay a fixed amount and use the agent within its limits. Signing in with an API key uses a programmatic key: you pay API rates for actual use. Both paths sit behind the same gate with the country list, and which one to choose depends on how you pay and what you need. Cloud Codex (Codex cloud), where the agent runs on OpenAI's servers, requires signing in with ChatGPT, and an API key does not work for it.
  <iso-art name="codex-access-regions-vpn-bans/login-paths"></iso-art>
  <b-cap>Two sign-in paths: ChatGPT (subscription) and API key (pay per use). The sign-in data lives on your computer, in a file or in the system storage.</b-cap>

  The program caches the sign-in data on the device. It lies in the file <code>~/.codex/auth.json</code> or in the operating system's password storage. The mode is set by the parameter <code>cli_auth_credentials_store</code> with four values: <code>file</code>, <code>keyring</code>, <code>auto</code> and <code>ephemeral</code>. The file with the sign-in data is equivalent to a key to the account. Whoever copies it can use your account, and OpenAI's terms forbid sharing sign-in data and making an account available to others<b-proof href="https://openai.com/policies/row-terms-of-use/" quote="OpenAI: «You may not share your account credentials or make your account available to anyone else and are responsible for all activities that occur under your account.» — openai.com/policies/row-terms-of-use"/>.
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th></th><th>Sign-in with ChatGPT</th><th>Sign-in with an API key</th></tr>
    </thead>
    <tbody>
      <tr><td>Payment</td><td>ChatGPT subscription</td><td>API rates</td></tr>
      <tr><td>Codex cloud</td><td>this way is required</td><td>does not work</td></tr>
      <tr><td>Where sign-in data is stored</td><td colspan="2">in the file ~/.codex/auth.json or in the system storage; the mode is set by the parameter cli_auth_credentials_store (file, keyring, auto, ephemeral)</td></tr>
      <tr><td>Regional check</td><td colspan="2">not described on the sign-in page; the general country list applies</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-sublabel top="18">An end-to-end situation</b-sublabel>

  Nika lives in Tbilisi and installs Codex on her work laptop. She launches the program and picks sign-in with ChatGPT, because she already has a subscription. The sign-in data is saved on the laptop. Her country is on the list as “Georgia”, without brackets, so there are no questions about the region. A week later she decides to use cloud Codex and finds out that it needs exactly the ChatGPT sign-in: the API key her colleague uses does not work for the cloud. To check how the program signed in, you can ask the agent itself: a ready prompt is at the end of the article.

  <b-sublabel top="18">What the servers check at sign-in</b-sublabel>

  What OpenAI's servers actually check at sign-in is not described on public pages: the connection address, payment details, a phone number or all of them together. This is not confirmed. So the article makes no claim about the signal by which OpenAI would determine that you are outside the list. All that is known is that no regional checks are described at sign-in, and it points to the general list.
</b-chapter>
<b-chapter id="vpn" title="VPN: what is said and what is not" icon="shield-check">
  <b-why>The terms for individuals (effective 1 January 2026) speak of “restrictions” and “protective measures” in general. VPN and region are not mentioned in them.</b-why>

  VPN is a program that replaces the address from which a site sees your connection. People install it for privacy on a public network or for access to a corporate network. OpenAI is silent about VPN in its documents, so I separated three things: what is written word for word, what follows from the terms and what remains opinion. This shows where the rule is and where the rumor is.
  <iso-art name="codex-access-regions-vpn-bans/vpn-rules"></iso-art>
  <b-cap>OpenAI's documents say little about VPN: VPN is not mentioned, while circumventing restrictions and protective measures is forbidden.</b-cap>

  Word for word, the documents contain the following. VPN is not mentioned in the country help or in the terms of use. The terms forbid circumventing limits, restrictions and protective measures. They also forbid passing the account to others and using the services in countries under a US embargo. Neither “VPN is allowed” nor “VPN is forbidden” appears in these documents. Any conclusion either way remains an interpretation of the text.
  <iso-art name="codex-access-regions-vpn-bans/four-bans"></iso-art>
  <b-cap>Four bans in OpenAI's terms: circumventing restrictions and protective measures, passing the account to others, use in countries under a US embargo and breaking the terms.</b-cap>

  Four bans in the terms relate to the topic of access, and each can be read as a separate rule.

  <b-steps round>
    <step t="Circumvent restrictions and protective measures">Interfering with the services is forbidden, including circumventing limits, restrictions and protective measures. A regional check may count as such a measure, but the terms do not name it.</step>
    <step t="Pass the account to others">Sharing sign-in data and making the account available to anyone else is not allowed. Responsibility for everything that happens under the account stays with the owner.</step>
    <step t="Use the services in countries under a US embargo">The services may not be used in a country or territory under a US embargo, or for the benefit of persons with whom dealings are prohibited by trade laws.</step>
    <step t="Break the terms and usage policies">For breaking the terms or the Usage Policies OpenAI may suspend or close access. OpenAI draws the same conclusion in case of risk of harm and when the law requires it.</step>
  </b-steps>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>What</th><th>Present in the documents</th></tr>
    </thead>
    <tbody>
      <tr><td>VPN in the country help</td><td>not mentioned</td></tr>
      <tr><td>VPN in the terms of use</td><td>not mentioned</td></tr>
      <tr><td>A ban on circumventing “restrictions” and “protective measures”</td><td>yes<b-proof href="https://openai.com/policies/row-terms-of-use/" quote="OpenAI: «Interfere with or disrupt our Services, including circumvent any rate limits or restrictions or bypass any protective measures or safety mitigations we put on our Services.» — openai.com/policies/row-terms-of-use"/></td></tr>
      <tr><td>A ban on passing the account to others</td><td>yes<b-proof href="https://openai.com/policies/row-terms-of-use/" quote="OpenAI: «You may not share your account credentials or make your account available to anyone else and are responsible for all activities that occur under your account.» — openai.com/policies/row-terms-of-use"/></td></tr>
      <tr><td>A ban on using the services in countries under a US embargo</td><td>yes<b-proof href="https://openai.com/policies/row-terms-of-use/" quote="OpenAI: «Our Services may not be used in or for the benefit of, or exported or re-exported to (a) any U.S. embargoed country or territory or (b) any individual or entity with whom dealings are prohibited or restricted under applicable trade laws.» — openai.com/policies/row-terms-of-use"/></td></tr>
      <tr><td>“VPN is allowed” or “VPN is forbidden” word for word</td><td>neither: any such conclusion is an interpretation with no quotation behind it</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-finding>
    <ex>Neither a permission nor a ban on VPN can be derived word for word from the documents.</ex>
    <gen>OpenAI's criterion is the list of countries where the services are offered, together with the ban on circumventing restrictions. How OpenAI applies this in practice was not found in open sources.</gen>
    <do>Do not decide from retellings on forums. Read the terms and the country list on OpenAI's pages and, when in doubt, write to OpenAI support.</do>
  </b-finding>
  <b-sublabel top="18">Common misconceptions</b-sublabel>

  <b>Since VPN is not mentioned in the terms, is it allowed?</b> The absence of a mention permits nothing. The ban on circumventing restrictions and protective measures is worded in general terms, and replacing an address may fall under it. How to check: find the phrase about “circumvent any rate limits or restrictions” in <a href="https://openai.com/policies/row-terms-of-use/">OpenAI's terms of use</a> and read it in full.

  <b>Do the terms forbid VPN outright?</b> VPN is not mentioned in them. People derive a ban on bypassing the region from the general ban on circumventing protective measures, but such a derivation is an interpretation with no quotation behind it.

  <b>Does a paid subscription give the right to access from any country?</b> The terms and the help name the list of countries as the criterion, and pricing plans are not mentioned among the criteria. A ChatGPT subscription and an API key stand behind the same gate. How to check: read the first sentence of the page with the list.

  <b>If the country is on the list, can you stop worrying about VPN?</b> The ban on circumventing protective measures is written in the terms for all users, and the country list does not cancel it. The country help also has a reservation about the device: the error “OpenAI's services are not available in your country.” can appear even in a supported country. The conditions for its appearance are not described in the help, so it is worth asking support.

  <b>Is it simpler with Claude Code?</b> Anthropic does not mention VPN in its region rules either, but the Claude Code documentation has its own wording on the program's compatibility with VPNs. The wording differs between the companies and the logic is similar: a list of countries plus a general ban on circumventing protective measures. A detailed analysis for Claude Code is in a <a href="/en/blog/claude-code-access-regions-vpn-bans/" target="_blank" rel="noopener">separate article</a>.

  The decision about risk stays with you. I do not describe or recommend ways to connect: on this topic I have only the wording of the terms.
</b-chapter>


<b-chapter id="bans" title="Bans and their causes" icon="alert-circle">
  <b-why>A ban is the suspension or closure of an OpenAI account, after which sign-in to ChatGPT, the API and Codex stops working. OpenAI's terms name three grounds, and one of them is a breach of the terms or the usage policies<b-proof href="https://openai.com/policies/row-terms-of-use/" quote="OpenAI: «We reserve the right to suspend or terminate your access to our Services or delete your account if we determine: You breached these Terms or our Usage Policies. We must do so to comply with the law. Your use of our Services could cause risk or harm to OpenAI, our users, or anyone else.» — openai.com/policies/row-terms-of-use"/>.</b-why>

  The grounds are written in the terms of use for individuals (<a href="https://openai.com/policies/row-terms-of-use/" target="_blank" rel="noopener">Terms of Use</a>, effective 1 January 2026) and in the help article on the country list. The terms give three grounds: a breach of the terms themselves or of the Usage Policies, a legal requirement, and a risk of harm to OpenAI, other users or anyone else. A fourth ground sits in the help article on the country list: access to the services outside the listed countries “may result in your account being blocked or suspended”.
  <iso-art name="codex-access-regions-vpn-bans/ban-ladder"></iso-art>
  <b-cap>The path in the diagram: a ground, then suspension or closure, then an appeal through support. OpenAI makes the decision, and the person is left with a request to support; the terms promise no outcome.</b-cap>

  How quickly a ban arrives and what it looks like on screen is not described on OpenAI's public pages: I found nothing. They say only that the right to suspend or terminate access belongs to the company, and that an appeal can be filed if the decision was a mistake.
  <b-sublabel top="18">Causes according to the documents</b-sublabel>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>Cause</th><th>What is said</th></tr>
    </thead>
    <tbody>
      <tr><td>Access outside the country list</td><td>the account may be blocked or suspended: «Accessing or offering access to our services outside of the countries and territories listed below may result in your account being blocked or suspended.»</td></tr>
      <tr><td>Breach of the terms or usage policies</td><td>OpenAI may suspend or terminate access (the quote is at the start of the chapter)</td></tr>
      <tr><td>Error in some region</td><td>the error text in the country help article: «OpenAI's services are not available in your country.» The article adds that the error is possible even in a supported country after a device was used in an unsupported region</td></tr>
      <tr><td>Appeal</td><td>through support<b-proof href="https://openai.com/policies/row-terms-of-use/" quote="OpenAI: «If you believe we have suspended or terminated your account in error, you can file an appeal with us by contacting our Support team» — openai.com/policies/row-terms-of-use"/></td></tr>
    </tbody>
    </table>
  </b-ctx-table>

  Another provision of the terms concerns responsibility: an account cannot be passed to others, and the owner is responsible for everything that happens under it<b-proof href="https://openai.com/policies/row-terms-of-use/" quote="OpenAI: «You may not share your account credentials or make your account available to anyone else and are responsible for all activities that occur under your account.» — openai.com/policies/row-terms-of-use"/>. So someone else's account, or shared access inside a team, remains a ground for restriction even if the country is on the list.
  <b-sublabel top="18">Appeal step by step</b-sublabel>
  <b-steps round>
    <step t="Support">write to OpenAI support and state that, in your view, the ban is a mistake</step>
    <step t="Details">attach the date, the country you signed in from, the error text and copies of the emails</step>
    <step t="Waiting">wait for a reply: the terms give no deadlines and no chance of success</step>
  </b-steps>

  The public pages have no appeal form with a name, no address and no review deadlines, so the steps contain only what the terms say: a request to support. An appeal fixes a mistake, but the ground named in the help article stays the same while a person keeps using the service from a country outside the list. This is my reading of the terms and the help article; OpenAI makes no such comparison.
  <b-sublabel top="18">A running example</b-sublabel>
  <b-steps round>
    <step t="Oleg lives in Russia and wants to try Codex">He installs the program, tries to sign in and sees the text “OpenAI's services are not available in your country.” Russia is absent from OpenAI's country list, and the terms warn of a block or suspension of the account for access outside the list. Which check actually fired, the address, the phone number or the payment details, is not described on the public pages. An appeal through support is possible, but it does not put the country on the list. To check it yourself: open OpenAI's country list, find Russia in it and compare the result with the error text from the help article.</step>
  </b-steps>

  <b-sublabel top="18">Common misconceptions</b-sublabel>

  <b>Are bans given only for breaking the terms?</b> No: the terms have two more grounds, a legal requirement and a risk of harm, and the country help article separately names access outside the list.

  <b>Does an appeal bring access back?</b> The terms say only that an appeal can be filed through support. They promise no result.

  <b>Are the causes of an OpenAI ban fully listed in the help center?</b> OpenAI's separate help article on the causes of account bans is closed to automated checking (error 403), so I do not retell its provisions. The business terms, the Service Terms and the Usage Policies are closed in the same way. For organizations these documents have to be read separately on openai.com and help.openai.com.
  <b-cap>Boundary of knowledge: what the terms for individuals and the country help article say is confirmed. What lies in the closed documents is not confirmed.</b-cap>
</b-chapter>
<b-chapter id="data" title="What Codex sends to the server" icon="eye">
  <b-why>Requests to the model always go to the server, otherwise the agent does not work. The other flows (analytics, metrics, feedback submission) are switched off in config.toml, and the text of prompts reaches OpenTelemetry logs only with explicit consent<b-proof href="https://learn.chatgpt.com/docs/config-file/config-reference" quote="OpenAI: «Opt in to exporting raw user prompts with OpenTelemetry logs.» — learn.chatgpt.com/docs/config-file/config-reference"/>.</b-why>

  I based this on the source code of Codex CLI (commit 8011b92 of 18.11.2026) and on OpenAI's settings page. Codex is a coding agent: it works in the terminal and in the app and constantly talks to the server. Some data is needed for the work, some is collected on top. The needed data is your requests to the model and its replies. The extra flows are analytics of Codex products, metrics, and feedback sent by the /feedback command. Telemetry is the automatic sending of information about how the program runs: how long an action took, whether an error occurred. OpenTelemetry is an open standard for such information.
  <iso-art name="codex-access-regions-vpn-bans/data-flows"></iso-art>
  <b-cap>Requests to the model always go out. Analytics, metrics and /feedback are switched off by settings. Prompt text goes into OpenTelemetry only with consent.</b-cap>

  <b-sublabel top="18">What is sent when enabled</b-sublabel>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>What</th><th>Default</th><th>How to turn off</th></tr>
    </thead>
    <tbody>
      <tr><td>OpenAI analytics in Codex products<b-proof href="https://learn.chatgpt.com/docs/config-file/config-reference" quote="OpenAI: «Enable or disable analytics for this machine or profile.» — learn.chatgpt.com/docs/config-file/config-reference"/></td><td>on in the release build</td><td>[analytics] enabled = false</td></tr>
      <tr><td>OpenTelemetry metrics (built-in exporter)<b-proof href="https://learn.chatgpt.com/docs/config-file/config-reference" quote="OpenAI: «Select the OpenTelemetry metrics exporter. The default, `statsig`, follows `analytics.enabled`.» — learn.chatgpt.com/docs/config-file/config-reference"/></td><td>on, follow the analytics setting</td><td>[otel] metrics_exporter = "none"</td></tr>
      <tr><td>Feedback submission through /feedback<b-proof href="https://learn.chatgpt.com/docs/config-file/config-reference" quote="OpenAI: «Enable feedback submission via `/feedback` across local clients (default: true).» — learn.chatgpt.com/docs/config-file/config-reference"/></td><td>on</td><td>[feedback] enabled = false</td></tr>
      <tr><td>Prompt text in OpenTelemetry logs<b-proof href="https://learn.chatgpt.com/docs/config-file/config-reference" quote="OpenAI: «Opt in to exporting raw user prompts with OpenTelemetry logs.» — learn.chatgpt.com/docs/config-file/config-reference"/></td><td>off, explicit consent needed</td><td>no need to enable</td></tr>
    </tbody>
    </table>
  </b-ctx-table>

  The first two rows are linked: by default the built-in metrics exporter follows the analytics setting. Feedback submission stands apart: nothing is sent until the person runs /feedback. The last row shows the only flow that is off by default.
  <b-sublabel top="18">Settings in config.toml</b-sublabel>
  <b-codebox title="Codex config.toml" copy>
    [analytics]
    enabled = false

    [otel]
    metrics_exporter = "none"

    [feedback]
    enabled = false
  </b-codebox>
  <b-cap>The settings schema in the repository clarifies: with analytics enabled = false, the program's own OTLP exporters stay on, and to switch metrics off you need metrics_exporter = "none". What exactly OpenAI stores from the code and requests, and for how long, is not found on the public pages for Codex CLI: not confirmed.</b-cap>

  These settings concern data collection. They have no effect on the country list: switched-off analytics does not make use from a country outside the list permitted.
  <b-sublabel top="18">A running example</b-sublabel>
  <b-steps round>
    <step t="Timur lives in Tashkent and writes code for a client">Uzbekistan is on OpenAI's country list, so he signs in to Codex through his ChatGPT account. The client asks him not to send anything extra. Timur opens config.toml and writes three blocks: analytics off, metrics off, feedback submission off. Requests to the model keep going out, because the agent's work depends on them. To check it yourself: ask the agent to show the values of the three settings and make sure each one is set to off.</step>
  </b-steps>

  <b-sublabel top="18">Common misconceptions</b-sublabel>

  <b>Does turning off analytics stop requests to the model from being sent?</b> No: requests and replies always go to the server, this is the basis of the agent's work.

  <b>Is the single line [analytics] enabled = false enough?</b> The settings schema clarifies that the program's own OTLP exporters stay on in that case, and metrics are fully switched off by metrics_exporter = "none".

  <b>Does everything the agent recorded locally go to the server?</b> No: in the Codex CLI code, local databases in the ~/.codex directory (session history, logs) are always written, but no network code that syncs them was found. The exception: logs from them can go out when /feedback is submitted, and only by the person's decision.
</b-chapter>
<b-chapter id="compare" title="Access: Codex and Claude Code" icon="table-grid">
  <b-why>For both agents sign-in is tied to the country list of the company behind it, and Russia is on neither<b-proof href="https://www.anthropic.com/supported-countries" quote="Anthropic: «Any country or region not listed is unsupported.» — anthropic.com/supported-countries"/>. The criteria of the lists differ: for OpenAI it is the countries where the services are offered, for Anthropic it is also the person's physical location, the company's registration and who owns the company.</b-why>

  Claude Code is Anthropic's coding agent, and it also works in the terminal. The comparison helps when a person chooses between two agents and wants to know whether access works the same way for both. It is the same in the main point: both companies publish a country list, and outside the list access is not offered. What differs is what exactly is checked and what the list covers.
  <iso-art name="codex-access-regions-vpn-bans/compare-lists"></iso-art>
  <b-cap>Two entrances: the OpenAI list and the Anthropic list. Russia is absent from both, and the criteria of the lists differ.</b-cap>

  <b-sublabel top="18">Summary table</b-sublabel>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th></th><th>Codex (OpenAI)</th><th>Claude Code (Anthropic)</th></tr>
    </thead>
    <tbody>
      <tr><td>Russia on the list</td><td>no</td><td>no</td></tr>
      <tr><td>What the list covers</td><td>ChatGPT and the API; no separate rule for Codex</td><td>apps, including Claude Code, and the API</td></tr>
      <tr><td>Criterion</td><td>list of countries where the services are offered</td><td>physical location, registration and who owns the company</td></tr>
      <tr><td>VPN in the region policy</td><td>not mentioned</td><td>not mentioned</td></tr>
      <tr><td>Sign-in</td><td>ChatGPT or an API key</td><td>a Claude subscription or a Console account</td></tr>
      <tr><td>Differences between the lists</td><td colspan="2">Afghanistan, Myanmar and Yemen are on OpenAI's list and not on Anthropic's</td></tr>
    </tbody>
    </table>
  </b-ctx-table>

  Three rows of the table need an explanation. In the coverage row, OpenAI has one list for ChatGPT and the API, and Codex gets no rule of its own, while Anthropic's list names the apps directly, Claude Code among them. In the criterion row, Anthropic checks three signs, so a company from an unsupported region is closed out even if its employees are in a listed country. OpenAI's country list has no such signs for companies. The last row is the difference by country: Afghanistan, Myanmar and Yemen are named on OpenAI's list and absent from Anthropic's.

  The analysis for Claude Code, with install errors, phone verification and payment, is in a separate article on regions, VPNs and bans.
  <b-links cols="2">
    <item href="/en/blog/claude-code-access-regions-vpn-bans/" k="Region" t="Claude Code: regions, VPN and bans">The same topic for Claude Code</item>
    <item href="/en/blog/claude-code-install-and-price/" k="Install" t="Claude Code: install and pricing">Command, sign-in, plans</item>
  </b-links>
</b-chapter>
<b-chapter id="legal" title="What you can do legitimately" icon="check">
  <b-why>OpenAI's terms leave four paths that need no workaround: find your country on the list, read the terms, write to support and choose another agent.</b-why>

  Legitimate options exist, and getting around the rules is part of none of them. The most direct path is to find your country on OpenAI's list. The next is to read the terms for individuals or for organizations before starting work. A third path is for the case when the country is on the list but sign-in does not work: write to support. The fourth is to choose another agent whose terms allow your country.
  <iso-art name="codex-access-regions-vpn-bans/legal-paths"></iso-art>
  <b-cap>Four paths with a check mark are open: a country on the list, the terms, support and another agent. The closed orange door stands for getting around the rules, which does not belong here.</b-cap>

  <b-seq-row>
    <step t="Country">find it on OpenAI's list</step>
    <step t="Terms">read the terms for individuals or organizations</step>
    <step t="Support">if the list is wrong for you, write to support</step>
    <step t="Another agent">choose a program with open access</step>
  </b-seq-row>

  <b-sublabel top="18">What to do in each situation</b-sublabel>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>Situation</th><th>Step</th></tr>
    </thead>
    <tbody>
      <tr><td>The country is on the list, but sign-in does not work</td><td>write to OpenAI support and attach the error text; an appeal goes through the same channel</td></tr>
      <tr><td>The country is not on the list</td><td>treat access as closed; look for an agent whose terms allow your country</td></tr>
      <tr><td>You need to work with a local model</td><td><a href="/materials/glossary/opencode/">OpenCode</a>: you choose the model yourself, including a local one; check the terms of the model and its provider separately</td></tr>
      <tr><td>A company in an unsupported region</td><td>a legal review of the terms before starting work; Anthropic closes organizations registered or controlled from an unsupported region</td></tr>
    </tbody>
    </table>
  </b-ctx-table>

  OpenCode is an open agent: it provides no model of its own and connects to the model of the provider you choose, and that provider sets the region rules. So the choice should follow the country list of the model's provider.
  <b-sublabel top="18">A running example</b-sublabel>
  <b-steps round>
    <step t="Aigul lives in Bishkek and wants to start with Codex">She finds the row “Kyrgyzstan” on OpenAI's list, reads the terms for individuals and signs in through a ChatGPT subscription in her own name. A week later sign-in stops working and the screen shows an error. She writes to OpenAI support, attaches the error text and the date, and waits for a reply. To check it yourself: open the list, find your country and save a screenshot of the row together with the date.</step>
  </b-steps>

  <b-cap>Someone else's account, someone else's API key, intermediaries and resale of access break the terms: an account cannot be passed to others. These ways are not covered here.</b-cap>
</b-chapter>
<b-chapter id="faq" icon="chat" title="Frequently asked questions">
  <b-faq-cards>
    <q t="Does Codex work in Russia?">Officially no: Russia is not on OpenAI's list of supported countries for ChatGPT and the API, and the public pages have no separate rules for Codex. Source: help.openai.com/en/articles/7947663 and developers.openai.com/api/docs/supported-countries. Date checked: 18.11.2026.</q>
    <q t="Can I use Codex through a VPN?">VPN is not mentioned in the terms or in the country help article. A VPN is a program that replaces the address from which you reach the network. The terms forbid getting around restrictions and protective measures, and OpenAI warns of an account block for access outside the list. The documents give no clear answer, so the decision is yours and at your own risk. Source: openai.com/policies/row-terms-of-use. Date checked: 18.11.2026.</q>
    <q t="Why does OpenAI ban accounts?">What is confirmed: access outside the country list, a breach of the terms or usage policies, a legal requirement and a risk of harm. Check the separate help article on the causes of bans by hand on help.openai.com. An appeal goes through support. Date checked: 18.11.2026.</q>
    <q t="How do I turn off analytics in Codex?">In config.toml add [analytics] enabled = false, [otel] metrics_exporter = "none" and [feedback] enabled = false. The first two switch off built-in analytics and metrics, the third turns off feedback submission. Requests to the model keep going out. Source: learn.chatgpt.com/docs/config-file/config-reference. Date checked: 18.11.2026.</q>
    <q t="How does OpenAI's country list differ from Anthropic's?">The criteria differ. For OpenAI it is the countries where ChatGPT and API services are offered. For Anthropic it is also the person's physical location, the company's registration and who owns the company. Afghanistan, Myanmar and Yemen are on OpenAI's list and not on Anthropic's. Date checked: 18.11.2026.</q>
    <q t="What should I do if the country is on the list but sign-in does not work?">Write to OpenAI support and attach the error text: the country help article says the error is possible even in a supported country after a device was used in an unsupported region. An appeal against a ban goes through the same support. Date checked: 18.11.2026.</q>
  </b-faq-cards>
</b-chapter>
<b-chapter id="start" title="Prompts for the agent" icon="zap">
  <b-why>Three ready-made prompts that change nothing without your confirmation.</b-why>

  The first prompt only reads: it shows three data-collection settings. The second shows how Codex signed in, through ChatGPT or an API key, and where the sign-in data lives. The third writes to the settings file, so the agent first shows a diff, that is, the difference between the old and the new file, and waits for confirmation.
  <b-codebox title="1. Which data-collection settings are set" copy>
    Show which analytics, otel and feedback settings are currently set in the Codex config.toml. Change nothing.
  </b-codebox>
  <b-codebox title="2. How Codex signed in" copy>
    Show how Codex is currently signed in for me: through ChatGPT or an API key, and where the sign-in data lives.
  </b-codebox>
  <b-codebox title="3. Turn off extra data sending" copy>
    Add the blocks [analytics] enabled = false, [otel] metrics_exporter = "none" and [feedback] enabled = false to config.toml. First show the diff and wait for my confirmation.
  </b-codebox>
  <b-cap>The first and second prompts only read. The third writes to the settings file, so look at the diff before it is written.</b-cap>
</b-chapter>
<b-chapter id="next" title="Further reading">
  <b-links cols="2">
    <item href="/en/blog/codex-or-chatgpt-what-to-choose/" k="Choice" t="Codex or ChatGPT">What to take for working with code</item>
    <item href="/en/blog/claude-code-access-regions-vpn-bans/" k="Region" t="Claude Code: regions, VPN and bans">The same topic for Claude Code</item>
    <item href="/en/blog/claude-code-install-and-price/" k="Install" t="Claude Code: install and pricing">Command, sign-in, plans</item>
    <item href="/en/blog/ai-in-code-harness-and-tools/" k="Comparison" t="Claude Code, Codex, Cursor and Hermes Agent">Which agent for which task</item>
    <item href="/en/blog/specs-rules-skills/" k="Context" t="AGENTS.md, CLAUDE.md and spec.md">Which instructions the agent reads</item>
    <item href="/materials/glossary/codex/" k="Term" t="Codex">What it does, where it runs</item>
  </b-links>
</b-chapter>
<b-footer>Based on OpenAI's country lists and terms, the Codex documentation and the Codex CLI source code. Date checked: 18.11.2026. Country lists change; open the primary source before deciding.</b-footer>
</b-post>
