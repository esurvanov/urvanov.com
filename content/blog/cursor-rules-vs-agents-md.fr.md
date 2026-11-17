---
title: Cursor rules vs AGENTS.md : quoi mettre où
seoTitle: Cursor rules vs AGENTS.md : quoi mettre où (2026)
date: 2026-11-15
updated: 2026-11-17
description: Les règles Cursor vivent dans .cursor/rules, avec des modes ; AGENTS.md est un markdown simple lu par de nombreux agents. Comparatif et migration.
tags: IA, Cursor, AGENTS.md, règles, .cursorrules, harness
category: specs
layout: wide
mentions: AGENTS.md, Cursor, CLAUDE.md, Codex
toc: answer=Réponse rapide | table=Côte à côte | modes=Quatre modes | migrate=Migration | readers=Qui lit AGENTS.md | pick=Quoi mettre où | faq=Questions | next=Pour aller plus loin
---
Les règles Cursor et AGENTS.md donnent à un agent des instructions permanentes, mais de portée différente. AGENTS.md est un markdown simple à la racine du projet, lu par Cursor et de nombreux autres agents. Les règles de .cursor/rules sont des fichiers .mdc à quatre modes d’application, format propre à Cursor. Le commun va dans AGENTS.md, le conditionnel dans .mdc.

<b-post series="prompts">
<b-chapter id="answer" title="Réponse rapide" icon="crosshair">
  <b-why>Cursor accepte deux formats à la fois : AGENTS.md pour les cas simples et les règles de projet pour contrôler quand une règle s’applique<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: «For more control over when rules apply, use project rules in .cursor/rules/ instead» — cursor.com/help/customization/rules"/>.</b-why>
  <b-finding>
    <ex>AGENTS.md contient ce que tout agent doit savoir ; .cursor/rules contient ce que seul Cursor doit savoir, et seulement parfois.</ex>
    <gen>AGENTS.md n’a ni modes ni métadonnées, donc n’importe quel agent peut le lire. Une règle .mdc ajoute des modes, et peut donc attendre qu’un type de fichier ou une demande l’appelle.</gen>
    <do>Déplacer les commandes et les interdictions dans AGENTS.md, garder les règles par type de fichier dans .cursor/rules, supprimer .cursorrules.</do>
  </b-finding>
</b-chapter>
<b-chapter id="table" title="Règles Cursor et AGENTS.md côte à côte" icon="table-grid">
  <b-why>Chaque cellule vient de la documentation de Cursor, d’agents.md ou d’OpenAI ; la source se trouve derrière l’icône. Vérifié le 15.11.2026.</b-why>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th></th><th>AGENTS.md</th><th>.cursor/rules/*.mdc</th></tr>
    </thead>
    <tbody>
      <tr><td>Portée</td><td>le projet ; un fichier imbriqué pour un sous-dossier<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: «Cursor supports AGENTS.md in the project root and subdirectories» — cursor.com/docs/context/rules"/></td><td>le projet, découpé en règles ; User Rules (tous les projets de la personne) et Team Rules (toute une organisation) sont des niveaux distincts<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: Team Rules → Project Rules → User Rules is the order of precedence; Team Rules are managed from the dashboard — cursor.com/docs/context/rules"/></td></tr>
      <tr><td>Qui le lit</td><td>Cursor, Codex, Copilot, Windsurf, OpenCode et d’autres<b-proof href="https://agents.md/" quote="agents.md: «A simple, open format for guiding coding agents» — Cursor and Codex are in the list of supporting agents — agents.md"/></td><td>Cursor</td></tr>
      <tr><td>Fichier et emplacement</td><td><code>AGENTS.md</code> à la racine et dans les sous-dossiers ; le fichier le plus proche de celui qu’on modifie l’emporte<b-proof href="https://agents.md/" quote="agents.md: «The closest AGENTS.md to the edited file wins; explicit user chat prompts override everything» — agents.md"/></td><td><code>.cursor/rules/</code>, un fichier par règle ; les règles peuvent se ranger dans des dossiers<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: «Stored in .cursor/rules, version-controlled and scoped to your codebase» — cursor.com/docs/context/rules"/></td></tr>
      <tr><td>Format</td><td>markdown simple, aucun champ obligatoire<b-proof href="https://agents.md/" quote="agents.md: «No. AGENTS.md is just standard Markdown» — agents.md"/></td><td>markdown avec un en-tête de <code>description</code>, <code>globs</code>, <code>alwaysApply</code> ; l’extension doit être <code>.mdc</code>, un simple <code>.md</code> est ignoré<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: «Project rules must use the .mdc extension» — cursor.com/docs/context/rules"/></td></tr>
      <tr><td>Quand il s’applique</td><td>pris en compte automatiquement, sans modes<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: «Write instructions in plain markdown. Cursor picks it up automatically» — cursor.com/help/customization/rules"/></td><td>un des quatre modes : toujours, par description, par motif de fichier, manuellement</td></tr>
      <tr><td>Gestion des versions</td><td>un fichier du dépôt, les changements passent par git</td><td>stocké dans le dépôt ; la documentation conseille de commiter les règles<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: «Check your rules into git so your whole team benefits» — cursor.com/docs/context/rules"/></td></tr>
      <tr><td>Taille</td><td>la documentation de Cursor ne donne pas de chiffre ; Codex plafonne l’ensemble de ses fichiers d’instructions à 32 KiB par défaut<b-proof href="https://learn.chatgpt.com/docs/agent-configuration/agents-md" quote="Codex: combined instructions are capped by project_doc_max_bytes, which is 32 KiB by default — learn.chatgpt.com/docs/agent-configuration/agents-md"/></td><td>moins de 500 lignes par règle, les grandes sont découpées<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: «Keep rules under 500 lines. Split large rules into smaller, focused files» — cursor.com/help/customization/rules"/></td></tr>
      <tr><td>Ancien .cursorrules</td><td colspan="2">un fichier unique à la racine, remplacé par les deux formats<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: «The .cursorrules file in your project root is legacy and will be deprecated» — cursor.com/help/customization/rules"/></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>Cursor traite aussi CLAUDE.md comme toujours actif : il s’applique à chaque conversation, quoi que dise <code>alwaysApply</code><b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: «CLAUDE.md files are always applied to every conversation, regardless of any alwaysApply frontmatter setting» — cursor.com/help/customization/rules"/>.</b-cap>
</b-chapter>
<b-chapter id="modes" title="Quatre modes d’une règle Cursor" icon="list-arrow">
  <b-why>Le mode décide quand une règle entre dans le contexte. Il se définit dans l’en-tête de la règle et dans le menu du type de règle.</b-why>
  <b-rule-modes>
    <mode t="Toujours">chaque chat</mode>
    <mode t="Par description">l’agent décide</mode>
    <mode t="Par fichiers">un motif de chemin correspond</mode>
    <mode t="Manuellement">@rule</mode>
  </b-rule-modes>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>Mode dans Cursor</th><th>Ce qui le déclenche</th><th>Champ de l’en-tête</th></tr>
    </thead>
    <tbody>
      <tr><td>Always Apply</td><td>chaque session de chat<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: Always Apply — «included in every conversation» — cursor.com/help/customization/rules"/></td><td><code>alwaysApply: true</code> ; globs et description sont alors ignorés<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: when alwaysApply is true the rule is always included, and globs and description are ignored — cursor.com/docs/context/rules"/></td></tr>
      <tr><td>Apply Intelligently</td><td>l’agent décide d’après la description<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: Apply Intelligently — «Agent decides when it's relevant» — cursor.com/help/customization/rules"/></td><td><code>description</code> avec <code>alwaysApply: false</code> et sans globs</td></tr>
      <tr><td>Apply to Specific Files</td><td>un fichier correspond à un motif<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: Apply to Specific Files — «only applies for files matching a pattern» — cursor.com/help/customization/rules"/></td><td><code>globs</code><b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: «Use globs to scope a rule to specific files or directories» — cursor.com/docs/context/rules"/></td></tr>
      <tr><td>Apply Manually</td><td>la règle est mentionnée avec @ dans le chat<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: Apply Manually — «only used when you @mention it in chat» — cursor.com/help/customization/rules"/></td><td>la règle est appelée par son nom, par exemple <code>@my-rule</code></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>Des guides plus anciens, écrits par des tiers, appellent les mêmes quatre modes Always, Auto Attached, Agent Requested et Manual. La documentation actuelle de Cursor utilise les noms du tableau.</b-cap>
</b-chapter>
<b-chapter id="migrate" title="Migration : de .cursorrules vers AGENTS.md et .mdc" icon="notebook">
  <b-why>Un projet d’exemple, écrit pour cet article. Les formats de fichiers suivent la documentation de Cursor ; le projet est inventé.</b-why>
  <b-sublabel top="18">Avant : un seul fichier à la racine</b-sublabel>
  <b-codebox title="Arborescence avant">
    my-app/
    ├── .cursorrules
    ├── src/
    └── package.json
  </b-codebox>
  <b-codebox title=".cursorrules">
    You are working on a React + TypeScript app.
    Run `npm test` before finishing a task.
    Format with `npm run lint -- --fix`.
    Never edit files in dist/.
    Never log tokens or user emails.
    Components: function components with hooks, one component per file,
    props typed with an interface named <Name>Props.
    The test file sits next to the component: Button.test.tsx.
    API calls go through src/api/client.ts; validate every response with zod.
  </b-codebox>
  <b-sublabel top="18">La voie officielle : quatre étapes</b-sublabel>
  <b-seq-row>
    <step t="Créer">une règle via la palette de commandes : « New Cursor Rule »</step>
    <step t="Copier">le texte de .cursorrules</step>
    <step t="Mode">Always Apply</step>
    <step t="Supprimer">.cursorrules à la racine</step>
  </b-seq-row>
  <b-cap>Ce sont les quatre étapes du guide de Cursor ; Always Apply conserve l’ancien comportement<b-proof href="https://cursor.com/help/customization/rules" quote="Cursor: «Set the rule type to Always Apply (this matches the old behavior)» — cursor.com/help/customization/rules"/>. Le résultat est une règle toujours active. Un découpage par condition est l’étape suivante.</b-cap>
  <b-sublabel top="18">Après : le texte commun dans AGENTS.md, le texte conditionnel dans .mdc</b-sublabel>
  <b-codebox title="Arborescence après">
    my-app/
    ├── AGENTS.md
    ├── .cursor/
    │   └── rules/
    │       ├── react-components.mdc
    │       └── api-validation.mdc
    ├── src/
    └── package.json
  </b-codebox>
  <b-codebox title="AGENTS.md" copy>
    # my-app
    React + TypeScript app.

    ## Commands
    - Run `npm test` before finishing a task.
    - Format with `npm run lint -- --fix`.

    ## Bans
    - Never edit files in `dist/`.
    - Never log tokens or user emails.
  </b-codebox>
  <b-codebox title=".cursor/rules/react-components.mdc" copy>
    ---
    description: Standards for React components
    globs: "*.tsx"
    alwaysApply: false
    ---
    - Function components with hooks, one component per file.
    - Props typed with an interface named `<Name>Props`.
    - The test file sits next to the component: `Button.test.tsx`.
  </b-codebox>
  <b-codebox title=".cursor/rules/api-validation.mdc" copy>
    ---
    description: Rules for API calls and response validation
    alwaysApply: false
    ---
    - API calls go through `src/api/client.ts`.
    - Validate every response with zod.
  </b-codebox>
  <b-finding>
    <ex>Neuf lignes d’un fichier sont devenues trois fichiers : cinq lignes que tout agent lit, et deux règles que Cursor ne charge que lorsqu’elles s’appliquent.</ex>
    <gen>Les commandes et les interdictions valent pour tout le projet, donc n’importe quel agent en a besoin. Les règles de composants et d’API ne comptent que pour une partie du code : la première pour les fichiers <code>.tsx</code>, la seconde quand l’agent juge la description pertinente.</gen>
    <do>Découper l’ancien fichier selon une seule question : tout agent a-t-il besoin de cette ligne à chaque session ? Oui, elle va dans AGENTS.md ; non, elle va dans une règle avec un mode.</do>
  </b-finding>
</b-chapter>
<b-chapter id="readers" title="Quels agents lisent AGENTS.md" icon="table-grid">
  <b-why>Le site agents.md liste de nombreux agents compatibles, dont Codex, Cursor, Copilot, Windsurf, Gemini CLI, Zed et Warp<b-proof href="https://agents.md/" quote="agents.md: the page lists Codex, Jules, Cursor, Gemini CLI, GitHub Copilot's coding agent, Windsurf and others — agents.md"/>. Les conditions diffèrent selon l’agent : Claude Code ne lit AGENTS.md que si le projet n’a pas de CLAUDE.md, Gemini CLI après un changement de réglage.</b-why>
  <b-links cols="1">
    <item href="/blog/specs-rules-skills/#matrix" k="Tableau" t="Quel agent lit quel fichier">Claude Code, Codex, Cursor, Copilot, Gemini CLI, Windsurf, OpenCode : AGENTS.md, CLAUDE.md et leurs propres fichiers</item>
  </b-links>
</b-chapter>
<b-chapter id="pick" title="Quoi mettre où" icon="crosshair">
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>Quoi</th><th>Où</th><th>Pourquoi</th></tr>
    </thead>
    <tbody>
      <tr><td>Commandes de build et de test</td><td>AGENTS.md</td><td>tout agent en a besoin à chaque session</td></tr>
      <tr><td>Interdictions : ne pas modifier <code>dist/</code>, pas de secrets dans les journaux</td><td>AGENTS.md</td><td>valent pour tout le projet</td></tr>
      <tr><td>Style d’un type de fichier, par exemple <code>*.tsx</code></td><td>.mdc, Apply to Specific Files</td><td>ne se charge que lorsqu’un tel fichier est en jeu</td></tr>
      <tr><td>Un sujet nécessaire de temps en temps : appels d’API, migrations</td><td>.mdc, Apply Intelligently</td><td>l’agent lit la description et fait entrer la règle</td></tr>
      <tr><td>Une liste de contrôle rare</td><td>.mdc, Apply Manually</td><td>n’entre dans le chat que sur mention avec @</td></tr>
      <tr><td>Une règle pour toute l’organisation</td><td>Team Rules</td><td>gérées depuis le tableau de bord de Cursor dans les offres Team et Enterprise<b-proof href="https://cursor.com/docs/context/rules" quote="Cursor: Team and Enterprise plans can create and enforce rules across their organization from the dashboard — cursor.com/docs/context/rules"/></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>Garder chaque instruction à un seul endroit. Une ligne copiée dans AGENTS.md et dans une règle doit être corrigée deux fois.</b-cap>
</b-chapter>
<b-chapter id="faq" icon="chat" title="Questions fréquentes">
  <b-faq-cards>
    <q t="Cursor lit-il AGENTS.md ?">Oui. Cursor lit AGENTS.md à la racine du projet et dans les sous-dossiers, comme du markdown simple sans métadonnées, et le prend en compte automatiquement. Les instructions d’un AGENTS.md imbriqué sont combinées avec celles des dossiers parents, et les plus spécifiques prennent le pas. Source : cursor.com/docs/context/rules et cursor.com/help/customization/rules, vérifié le 15.11.2026.</q>
    <q t="Faut-il encore .cursorrules ?">Non. La documentation de Cursor qualifie le .cursorrules de la racine d’ancien format (legacy) et décrit la migration : créer une règle en mode Always Apply, copier le texte, supprimer le fichier. Source : cursor.com/help/customization/rules, vérifié le 15.11.2026.</q>
    <q t="Peut-on garder à la fois AGENTS.md et .cursor/rules ?">Oui. Cursor les décrit comme deux options : AGENTS.md pour les cas simples, les règles de projet pour contrôler quand une règle s’applique. Un partage raisonnable : commandes et interdictions communes dans AGENTS.md, règles conditionnelles dans .cursor/rules ; chaque instruction vit à un seul endroit. Source : cursor.com/help/customization/rules, vérifié le 15.11.2026.</q>
    <q t="Combien de règles, et quelle longueur ?">Cursor recommande moins de 500 lignes par règle et de découper les grandes règles en fichiers plus petits et ciblés. Les pages consultées n’indiquent ni plafond du nombre de règles ni longueur pour AGENTS.md ; Codex plafonne l’ensemble de ses fichiers AGENTS.md à 32 KiB par défaut. Sources : documentation de Cursor et d’OpenAI, vérifiée le 15.11.2026.</q>
  </b-faq-cards>
</b-chapter>
<b-chapter id="next" title="Pour aller plus loin">
  <b-links cols="2">
    <item href="/blog/specs-rules-skills/" k="Contexte" t="AGENTS.md, CLAUDE.md et spec.md : quoi mettre où">Quatre couches, un tableau d’agents, un vrai fichier</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="Comparaison" t="Claude Code, Codex, Cursor et Hermes Agent">Quel agent pour quelle tâche</item>
    <item href="/blog/harness-driven-development/" k="Méthode" t="Harness-Driven Development">Une erreur de l’agent devient une règle</item>
  </b-links>
</b-chapter>
<b-footer>D’après la documentation de Cursor, d’agents.md et d’OpenAI ; la source se trouve derrière l’icône à côté de chaque affirmation ; vérifié le 15.11.2026. Le projet d’exemple est inventé.</b-footer>
</b-post>
