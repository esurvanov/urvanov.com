---
title: Que sont AGENTS.md et CLAUDE.md : un exemple de fichier et où garder les spécifications, les règles et les skills
date: 2026-09-28
updated: 2026-11-08
description: Quatre sortes de contexte permanent pour l'IA (AGENTS.md, CLAUDE.md, skills) : la spécification de tâche, la bible du projet, les règles et les skills. Ce que contient chacune, quand elle entre dans le contexte et ce que proposent ChatGPT et Claude. D'après les documentations d'Anthropic, d'OpenAI, de GitHub, de Cursor et de Cline.
tags: IA, Claude Code, CLAUDE.md, harness, spécifications, skills
category: specs
layout: wide
mentions: AGENTS.md, CLAUDE.md, Agent Skills, Spec Kit, Memory Bank
toc: map=Quatre couches | spec=Spécification | bible=Bible | rules=Règles | skills=Skills | chat=Dans un chat | pick=Quoi où | faq=Questions | next=Pour aller plus loin
---

AGENTS.md et CLAUDE.md sont des fichiers à la racine du projet qui contiennent des instructions permanentes pour un agent IA : commandes de build et de test, style de code, interdictions. AGENTS.md est un format ouvert lu par Codex, Cursor, Gemini CLI, Copilot et d'autres agents ; CLAUDE.md est lu par Claude Code. Le harness (le harnais de l'agent) place un tel fichier au début de chaque session. Ci-dessous, un exemple de fichier et l'endroit où garder les spécifications, la bible du projet et les skills.

<b-post series="prompts">
<b-ctx-layers>
  <layer kind="spec" t="Spécification" when="pour une tâche">quoi construire dans une tâche</layer>
  <layer kind="bible" t="Bible" when="au début de la tâche">ce qu'est le produit</layer>
  <layer kind="rules" t="Règles" when="chaque session">comment travailler dans le projet</layer>
  <layer kind="skill" t="Skill" when="à l'appel">comment exécuter une procédure</layer>
</b-ctx-layers>
<b-cap>Un modèle ne se souvient pas d'un projet d'une session à l'autre<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: «Large language models don&#x27;t retain memory between completions. Rules provide persistent, reusable context at the prompt level» — cursor.com/docs/context/rules"/>. Quatre sortes de fichiers lui rendent ce contexte.</b-cap>
<b-chapter id="map" title="Quatre couches de contexte" icon="table-grid">
  <b-ctx-table phone="hide4">
    <table>
    <thead>
      <tr><th>Couche</th><th>Ce qu'elle contient</th><th>Quand dans le contexte</th><th>Fichiers</th></tr>
    </thead>
    <tbody>
      <tr><td><b-ctx-layer kind="spec">Spécification</b-ctx-layer></td><td>exigences, plan, étapes d'une tâche</td><td>pour une tâche</td><td><code>spec.md · plan.md · tasks.md</code></td></tr>
      <tr><td><b-ctx-layer kind="bible">Bible</b-ctx-layer></td><td>objectif du produit, utilisateurs, décisions</td><td>au début de la tâche</td><td><code>projectbrief.md · productContext.md</code></td></tr>
      <tr><td><b-ctx-layer kind="rules">Règles</b-ctx-layer></td><td>commandes, style, interdictions</td><td>chaque session</td><td><code>CLAUDE.md · AGENTS.md · .cursor/rules</code></td></tr>
      <tr><td><b-ctx-layer kind="skill">Skill</b-ctx-layer></td><td>procédure avec exemples et scripts</td><td>description toujours, corps à l'appel</td><td><code>SKILL.md</code></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-finding>
    <ex>Les couches diffèrent par leur durée de vie et par le moment où elles entrent dans le contexte.</ex>
    <gen>Les règles se chargent à chaque session, elles sont donc gardées courtes : Anthropic recommande moins de 200 lignes par fichier<b-proof href="https://code.claude.com/docs/en/memory" quote="Anthropic: «Size: target under 200 lines per CLAUDE.md file. Longer files consume more context and reduce adherence» — code.claude.com/docs/en/memory"/>. Le contenu long et rarement utilisé passe dans des skills, dont le corps ne se charge qu'à l'appel<b-proof href="https://code.claude.com/docs/en/skills" quote="Anthropic: «skill descriptions are loaded into context so Claude knows what&#x27;s available, but full skill content only loads when invoked» — code.claude.com/docs/en/skills"/>.</gen>
    <do>Parcourez votre fichier d'instructions : gardez les faits dans les règles, déplacez les procédures dans des skills et la description du produit dans la bible.</do>
  </b-finding>
</b-chapter>
<b-chapter id="spec" title="Spécification : une tâche avant le code" icon="file-lines">
  <b-why>Une spécification décrit la tâche avant le début du travail : d'abord quoi et pourquoi, ensuite comment<b-proof href="https://github.com/github/spec-kit" quote="GitHub Spec Kit: «Define what and why before deciding how to build it. SDD turns your requirements into a specification, a technical plan, and actionable tasks, then guides implementation against those artifacts» — github.com/github/spec-kit"/>.</b-why>
  <b-seq-row>
    <step t="Principes">une fois par projet</step>
    <step t="Spécification">quoi et pourquoi</step>
    <step t="Plan">comment</step>
    <step t="Tâches">étapes</step>
    <step t="Implémentation">le code pas à pas</step>
  </b-seq-row>
  <b-cap>Étapes principales de GitHub Spec Kit<b-proof href="https://github.com/github/spec-kit" quote="GitHub Spec Kit: la constitution est créée une seule fois par projet — «Create principles focused on code quality, testing, and maintainability». Paraphrase — github.com/github/spec-kit"/>. Comment découper une grande spécification en parties : <a href="/blog/specs-by-aggregates/">Spécifications par agrégats</a></b-cap>
  <b-finding>
    <ex>Spec Kit mène une tâche des principes du projet jusqu'au code, en passant par la spécification, le plan et les étapes.</ex>
    <gen>Les exigences sont écrites avant le code, et la relecture vérifie le résultat par rapport à ce texte. La place d'une spécification dans le harness est décrite dans <a href="/blog/harness-driven-development/#spec">HDD et spécifications</a>.</gen>
    <do>Pour une tâche de plus d'une journée, écrivez une spécification : quoi, pourquoi et comment vous saurez que c'est terminé.</do>
  </b-finding>
</b-chapter>
<b-chapter id="bible" title="Bible du projet : ce qu'est le produit" icon="notebook">
  <b-why>La bible est une description permanente du produit : pourquoi il existe, qui il sert, comment il fonctionne et ce qui a été décidé. Le terme vient de la pratique ; l'analogue documenté le plus proche est le Memory Bank de Cline<b-proof href="https://docs.cline.bot/prompting/cline-memory-bank" quote="Cline: Memory Bank — «a documentation methodology that transforms Cline from a stateless assistant into a persistent development partner. Through structured markdown files, Cline can &#x27;remember&#x27; your project details across sessions» — docs.cline.bot/prompting/cline-memory-bank"/>.</b-why>
  <b-file-grid>
    <file name="projectbrief.md">objectifs et exigences</file>
    <file name="productContext.md">pourquoi il existe, ce qu'il résout</file>
    <file name="systemPatterns.md">architecture et patrons</file>
    <file name="techContext.md">pile technique et contraintes</file>
    <file name="activeContext.md">focus actuel et prochaines étapes</file>
    <file name="progress.md">ce qui fonctionne, ce qui reste</file>
  </b-file-grid>
  <b-finding>
    <ex>Six fichiers Memory Bank : de l'objectif du produit à l'avancement actuel.</ex>
    <gen>La bible répond aux questions qui seraient sinon posées dans chaque nouveau chat : ce qu'est le produit, quelles décisions ont été prises, ce qui est en cours. Le fichier du contexte actuel est celui qui change le plus souvent<b-proof href="https://docs.cline.bot/prompting/cline-memory-bank" quote="Cline: activeContext.md — focus actuel, derniers changements et prochaines étapes, mis à jour plus souvent que les autres. Paraphrase — docs.cline.bot/prompting/cline-memory-bank"/>.</gen>
    <do>Commencez par un fichier : objectif du produit, utilisateurs, termes clés et décisions récentes avec dates.</do>
  </b-finding>
</b-chapter>
<b-chapter id="rules" title="Règles : à chaque session" icon="list-arrow">
  <b-why>Les règles sont des instructions que le harness place au début de chaque session<b-proof href="https://code.claude.com/docs/en/memory" quote="Anthropic: «CLAUDE.md files are loaded into the context window at the start of every session» — code.claude.com/docs/en/memory"/>.</b-why>
  <b-io justify>
    <item k="CLAUDE.md" mono>Claude Code, règles limitées à des chemins dans <code>.claude/rules/</code><b-proof href="https://code.claude.com/docs/en/memory" quote="Anthropic: «Rules can also be scoped to specific file paths, so they only load into context when Claude works with matching files» — code.claude.com/docs/en/memory"/></item>
    <item k="AGENTS.md" mono>« Un README pour les agents » : Codex, Cursor, Gemini CLI, Copilot et d'autres<b-proof href="https://agents.md/" quote="agents.md: «Think of AGENTS.md as a README for agents: a dedicated, predictable place to provide the context and instructions to help AI coding agents work on your project» — agents.md"/></item>
    <item k=".cursor/rules" mono>Cursor, quatre modes d'application<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: quatre modes — Always Apply, Apply Intelligently, Apply to Specific Files, Apply Manually — cursor.com/docs/context/rules"/></item>
  </b-io>
  <b-why align="left">Un exemple d'AGENTS.md pour un projet web. Le fichier ne contient que ce que l'agent ne peut pas apprendre du code : commandes, style et interdictions. CLAUDE.md pour Claude Code fonctionne de la même façon.</b-why>
  <b-codebox title="Exemple d'AGENTS.md">
    # AGENTS.md
    ## Commandes
    - Installation : npm ci
    - Tests : npm test
    - Vérification des types : npx tsc --noEmit
    ## Style
    - TypeScript strict, pas de any
    - noms de fichiers en kebab-case
    ## Interdit
    - Ne pas modifier migrations/ sans tâche dédiée
    - Ne pas committer .env ni les clés
    ## Avant de terminer
    - Lancer les tests et la vérification des types
  </b-codebox>
  <b-sublabel top="18">Quand une règle entre dans le contexte · Cursor</b-sublabel>
  <b-rule-modes>
    <mode t="Toujours">chaque chat</mode>
    <mode t="Par description">l'agent décide</mode>
    <mode t="Par fichiers">le motif de chemin correspond</mode>
    <mode t="Manuellement">@rule</mode>
  </b-rule-modes>
  <b-metric-line value="≤ 200">lignes par fichier CLAUDE.md<b-proof href="https://code.claude.com/docs/en/memory" quote="Anthropic: «Size: target under 200 lines per CLAUDE.md file. Longer files consume more context and reduce adherence» — code.claude.com/docs/en/memory"/></b-metric-line>
  <b-finding>
    <ex>Trois formats d'une même idée : un fichier d'instructions que le harness lit au début.</ex>
    <gen>Les règles restent du contexte, et le modèle peut les enfreindre ; une action qui ne doit jamais avoir lieu est bloquée par un hook. Plus une règle est précise et concise, plus elle est suivie de façon constante<b-proof href="https://code.claude.com/docs/en/memory" quote="Anthropic: «Claude treats them as context, not enforced configuration. To block an action regardless of what Claude decides, use a PreToolUse hook instead. The more specific and concise your instructions, the more consistently Claude follows them» — code.claude.com/docs/en/memory"/>.</gen>
    <do>Créez AGENTS.md ou CLAUDE.md : commandes de build et de test, style de code, interdictions. Déplacez les règles propres à un dossier dans des règles limitées à des chemins.</do>
  </b-finding>
</b-chapter>
<b-chapter id="skills" title="Skills : une procédure à l'appel" icon="zap">
  <b-why>Un skill est un dossier contenant une instruction SKILL.md, des exemples et des scripts pour une procédure récurrente<b-proof href="https://learn.chatgpt.com/docs/build-skills" quote="OpenAI: «ChatGPT and Codex start with each skill&#x27;s name and description, then load the full SKILL.md instructions when they decide to use that skill» — learn.chatgpt.com/docs/build-skills"/>.</b-why>
  <b-skill-pick start="Début de session" start-note="nom + description" picked="↓ l'agent a choisi « revue de PR »" call="À l'appel" call-note="corps complet" file="SKILL.md" file-note="instructions, exemples, scripts">
    <skill>rapport</skill>
    <skill on>revue de PR</skill>
    <skill>release</skill>
    <skill>e-mail client</skill>
  </b-skill-pick>
  <b-finding>
    <ex>Les descriptions de tous les skills sont toujours dans le contexte ; le corps se charge une fois qu'un skill est choisi.</ex>
    <gen>Une longue référence à l'intérieur d'un skill ne coûte donc presque rien tant qu'elle n'est pas utilisée. Un skill vaut la peine d'être créé quand la même instruction ou la même liste de contrôle est collée sans cesse dans le chat, ou quand une section des règles est devenue une procédure<b-proof href="https://code.claude.com/docs/en/skills" quote="Anthropic: «Create a skill when you keep pasting the same instructions, checklist, or multi-step procedure into chat, or when a section of CLAUDE.md has grown into a procedure rather than a fact. Unlike CLAUDE.md content, a skill&#x27;s body loads only when it&#x27;s used» — code.claude.com/docs/en/skills"/>.</gen>
    <do>Repérez dans vos règles une section qui décrit une procédure et déplacez-la dans un skill, avec une description précise de quand l'utiliser.</do>
  </b-finding>
</b-chapter>
<b-chapter id="chat" title="La même chose dans un chat : projets et skills" icon="chat">
  <b-io justify>
    <item k="Instructions du projet" eq="≈ règles">Rôle et format une fois pour toutes, pour chaque chat du projet<b-proof href="https://help.openai.com/en/articles/10169521-projects-in-chatgpt" quote="ChatGPT: a project keeps chats, files and instructions together; project instructions apply only inside it, and it can be shared with teammates. Paraphrased from the OpenAI Help Center — help.openai.com/en/articles/10169521"/><b-proof href="https://support.claude.com/en/articles/9517075-what-are-projects" quote="Claude: “You can define project instructions for each project to further tailor Claude&#39;s responses. For example, instructing Claude to use a more formal tone or answer questions from the perspective of a specific role” — support.claude.com/en/articles/9517075"/></item>
    <item k="Fichiers du projet" eq="≈ bible">Exemples de réponses, politiques et modèles vivent dans le projet<b-proof href="https://support.claude.com/en/articles/9517075-what-are-projects" quote="Claude: “You can upload relevant documents, text, code, or other files to a project&#39;s knowledge base, which Claude will use to better understand the context” — support.claude.com/en/articles/9517075"/></item>
    <item k="Skills" eq="= skills">Un flux de travail répétable avec instructions et exemples<b-proof href="https://support.claude.com/en/articles/12512180-use-skills-in-claude" quote="Claude: “Skills extend Claude&#39;s capabilities by giving it access to specialized knowledge and workflows” — support.claude.com/en/articles/12512180"/><b-proof href="https://help.openai.com/en/articles/20001066-skills-in-chatgpt" quote="ChatGPT: skills are reusable workflows with instructions, examples and code, on Business, Enterprise and Edu plans. Paraphrased from the OpenAI Help Center — help.openai.com/en/articles/20001066"/></item>
  </b-io>
  <b-finding>
    <ex>Trois endroits où un prompt survit à un seul chat : instructions, fichiers et skills.</ex>
    <gen>Un rôle, des exemples et un format placés dans un projet fonctionnent dans chaque nouveau chat sans copie. Un projet partagé donne à toute l'équipe le même jeu d'exemples.</gen>
    <do>Créez un projet pour votre tâche hebdomadaire la plus fréquente et déplacez le rôle et le format de votre meilleur prompt dans ses instructions.</do>
  </b-finding>
</b-chapter>
<b-chapter id="pick" title="Quoi où" icon="crosshair">
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>Si c'est…</th><th>Où</th></tr>
    </thead>
    <tbody>
      <tr><td>une commande, un style ou une interdiction nécessaire à chaque tâche</td><td><b-ctx-layer kind="rules">Règles</b-ctx-layer></td></tr>
      <tr><td>une procédure en plusieurs étapes nécessaire de temps en temps</td><td><b-ctx-layer kind="skill">Skill</b-ctx-layer></td></tr>
      <tr><td>les exigences d'une tâche</td><td><b-ctx-layer kind="spec">Spécification</b-ctx-layer></td></tr>
      <tr><td>la connaissance du produit et les décisions prises</td><td><b-ctx-layer kind="bible">Bible</b-ctx-layer></td></tr>
      <tr><td>une erreur d'agent qui revient sans cesse</td><td><a href="/blog/harness-driven-development/#loop">règle ou vérification · HDD</a></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-finding>
    <ex>Cinq situations et cinq endroits.</ex>
    <gen>La fréquence et la durée de vie décident de l'endroit. Ce qui est toujours nécessaire est gardé court ; ce qui est rarement nécessaire peut être détaillé.</gen>
    <do>Passez les règles en revue une fois par semaine : déplacez les procédures dans des skills et les décisions dans la bible, avec une date.</do>
  </b-finding>
</b-chapter>
<b-chapter id="faq" icon="chat" title="Questions fréquentes">
  <b-faq-cards>
    <q t="Que sont AGENTS.md et CLAUDE.md ?">Des fichiers à la racine du projet avec des instructions permanentes pour un agent IA : commandes de build et de test, style de code, interdictions.</q>
    <q t="Quels agents lisent AGENTS.md ?">Codex, Cursor, Gemini CLI, Copilot et d'autres. Claude Code lit CLAUDE.md.</q>
    <q t="Quelle longueur pour CLAUDE.md ?">Anthropic recommande moins de 200 lignes par fichier : les règles se chargent à chaque session. Le contenu long et rare passe dans des skills.</q>
    <q t="En quoi les règles diffèrent-elles des skills ?">L'agent voit les règles à chaque session. Un skill est une procédure que l'agent ne charge en entier que lorsqu'une tâche correspond.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Pour aller plus loin">
  <b-links cols="2">
    <item href="/blog/harness-driven-development/" k="Méthode" t="Harness-Driven Development">Erreur de l'agent → règle de l'environnement</item>
    <item href="/blog/harness-work-approaches/" k="Approches" t="Approches pour travailler avec un harness">Boucle de réponse et relecture</item>
    <item href="/blog/work-prompts-examples/" k="Pratique" t="Prompts pour les tâches de travail">Cinq parties et six exemples</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="Comparaison" t="Comparaison des harness">Claude Code, Codex, Cursor, Hermes</item>
  </b-links>
</b-chapter>
<b-footer>D'après les documentations d'Anthropic, d'OpenAI, de GitHub, de Cursor et de Cline ; la source se trouve derrière l'icône à côté de chaque affirmation. « Bible du projet » est un terme de praticiens ; les paraphrases sont signalées dans l'infobulle de la source.</b-footer>
</b-post>
