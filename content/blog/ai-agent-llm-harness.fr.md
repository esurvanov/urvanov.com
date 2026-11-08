---
title: Agent IA = LLM + harness : différence entre LLM, harness et agent, et ce que contient le harness
date: 2026-10-12
updated: 2026-11-08
description: Agent IA = LLM + harness. LLM, harness et agent dans un seul tableau, les cinq groupes d'un harness et pourquoi le même modèle se comporte autrement dans un chat et dans Claude Code.
tags: IA, agents, agent IA, LLM, harness, harness d'agent, ingénierie du harness
category: harness
layout: wide
mentions: AI agent, LLM, agent harness, harness engineering, agent loop, MCP, Claude Code, Codex, ChatGPT
toc: formula=Agent = LLM + harness | table=LLM, harness et agent | parts=Ce que contient le harness | same=Le même modèle | faq=FAQ | next=À lire ensuite
---

Un agent IA est un LLM plus un harness (le harnais de l'agent) : le LLM ne fait que raisonner et écrire du texte, et le harness est tout ce qui l'entoure et lui permet d'agir — une boucle d'étapes, des outils, du contexte, des règles et des vérifications. Ensemble, ils mènent une tâche à son résultat, alors qu'un LLM seul se contente de répondre. Ci-dessous : LLM, harness et agent dans un tableau, les cinq groupes d'un harness et le même modèle dans deux harness.

<b-post series="harness">
<b-chapter id="formula" icon="target-dot" title="Agent = LLM + harness">
<b-why align="left">Un <a href="/materials/glossary/llm/">LLM</a> ne fait que prolonger du texte. Le <a href="/materials/glossary/harness/">harness</a> est tout ce qui l'entoure : la boucle d'étapes, les outils, l'accès aux fichiers et aux services, les règles et les vérifications. Ensemble, ils forment un <a href="/materials/glossary/ai-agent/">agent IA</a>.</b-why>
<b-lane-art names="ai-agent-llm-harness/formula"/>
<b-finding>
  <ex>Le même modèle Claude répond dans un chat et modifie du code dans Claude Code. La différence tient au harness.</ex>
  <gen>Les applications de chat, les assistants et les agents peuvent tourner sur les mêmes modèles. Ce qui les distingue, c'est ce qui entoure le modèle.</gen>
  <do>Pour comparer des produits d'IA, comparez leurs harness : ce que le produit sait faire seul, et où.</do>
</b-finding>
</b-chapter>
<b-chapter id="table" icon="table-cols" title="LLM, harness et agent">
<b-why align="left">Ce que possède chacun des trois. La colonne de l'agent est la somme des deux premières.</b-why>
<b-table>
<table><thead><tr><th></th><th>LLM</th><th>Harness</th><th>Agent IA</th></tr></thead><tbody><tr><td><a href="/materials/glossary/llm/">Modèle</a> qui raisonne en texte</td><td><b-tag-inline kind="ok">oui</b-tag-inline></td><td><b-tag-inline kind="no">non</b-tag-inline></td><td><b-tag-inline kind="ok">oui</b-tag-inline></td></tr><tr><td><a href="/materials/glossary/agent-loop/">Boucle</a> : étape, action, observation</td><td><b-tag-inline kind="no">non</b-tag-inline></td><td><b-tag-inline kind="ok">oui</b-tag-inline></td><td><b-tag-inline kind="ok">oui</b-tag-inline></td></tr><tr><td><a href="/materials/glossary/tool/">Outils</a> et <a href="/materials/glossary/mcp/">MCP</a></td><td><b-tag-inline kind="no">non</b-tag-inline></td><td><b-tag-inline kind="ok">oui</b-tag-inline></td><td><b-tag-inline kind="ok">oui</b-tag-inline></td></tr><tr><td><a href="/materials/glossary/context/">Contexte</a> et <a href="/materials/glossary/memory/">mémoire</a></td><td><b-tag-inline kind="no">non</b-tag-inline></td><td><b-tag-inline kind="ok">oui</b-tag-inline></td><td><b-tag-inline kind="ok">oui</b-tag-inline></td></tr><tr><td>Règles : <a href="/materials/glossary/claude-md/">CLAUDE.md</a>, <a href="/materials/glossary/agents-md/">AGENTS.md</a>, <a href="/materials/glossary/agent-skills/">skills</a></td><td><b-tag-inline kind="no">non</b-tag-inline></td><td><b-tag-inline kind="ok">oui</b-tag-inline></td><td><b-tag-inline kind="ok">oui</b-tag-inline></td></tr><tr><td><a href="/materials/glossary/permissions/">Permissions</a>, <a href="/materials/glossary/sandbox/">sandbox</a>, <a href="/materials/glossary/hooks/">hooks</a></td><td><b-tag-inline kind="no">non</b-tag-inline></td><td><b-tag-inline kind="ok">oui</b-tag-inline></td><td><b-tag-inline kind="ok">oui</b-tag-inline></td></tr><tr><td><a href="/materials/glossary/checks/">Vérifications</a> et <a href="/materials/glossary/human-in-the-loop/">humain dans la boucle</a></td><td><b-tag-inline kind="no">non</b-tag-inline></td><td><b-tag-inline kind="ok">oui</b-tag-inline></td><td><b-tag-inline kind="ok">oui</b-tag-inline></td></tr><tr><td>Agit de façon autonome</td><td><b-tag-inline kind="no">non</b-tag-inline></td><td><b-tag-inline kind="no">non</b-tag-inline></td><td><b-tag-inline kind="ok">oui</b-tag-inline></td></tr></tbody></table>
</b-table>
<b-finding>
  <ex>Un harness sans modèle a des outils, mais personne pour choisir entre eux. Un modèle sans harness choisit, mais ne peut pas agir.</ex>
  <gen>Aucune des deux moitiés n'est un agent à elle seule. Agent = modèle + harness fonctionne comme définition : sans l'un ou l'autre, l'agent disparaît.</gen>
  <do>Nommez le harness de l'agent que vous utilisez : où se trouvent sa boucle, ses outils, ses règles et ses vérifications.</do>
</b-finding>
</b-chapter>
<b-chapter id="parts" icon="cube" title="Ce que contient le harness : cinq groupes">
<b-arrow-rows>
  <row t="Boucle" color="accent">boucle de l'agent, orchestration de sous-agents</row>
  <row t="Portée" color="accent">outils, serveurs MCP, sandbox, navigateur</row>
  <row t="Connaissances" color="accent">contexte, mémoire, CLAUDE.md / AGENTS.md, skills</row>
  <row t="Contrôle" color="warn">permissions, hooks, validation humaine des étapes risquées</row>
  <row t="Vérification" color="warn">tests, linters, logs et traçage</row>
</b-arrow-rows>
<b-finding>
  <ex>Claude Code : la boucle dans la CLI, les outils via MCP, les règles dans CLAUDE.md, le contrôle par les permissions et les hooks, la vérification par vos tests.</ex>
  <gen>Dans la pratique, la plupart des échecs d'un agent remontent à l'un des cinq groupes : un outil absent, un contexte absent ou une vérification absente.</gen>
  <do>Quand l'agent échoue, demandez-vous quel groupe manquait et corrigez-le là, au lieu de réécrire le prompt.</do>
</b-finding>
</b-chapter>
<b-chapter id="same" icon="chart-line" title="Même modèle, autre harness">
<b-table>
<table><thead><tr><th>Modèle</th><th>Harness de chat</th><th>Harness d'agent</th></tr></thead><tbody><tr><td>Claude</td><td>Claude dans le navigateur : conversation, sans accès au projet</td><td>Claude Code : lit le dépôt, modifie des fichiers, exécute des commandes</td></tr><tr><td>GPT</td><td>ChatGPT : conversation, sans accès au projet</td><td>Codex : travaille dans le dépôt, exécute les tests, ouvre des pull requests</td></tr></tbody></table>
</b-table>
<b-why align="left" top="10">Une étude présentée à l'ICML 2026 a constaté que choisir le meilleur harness apporte des gains comparables à ceux du choix du meilleur modèle. <a href="https://icml.cc/virtual/2026/68323" target="_blank" rel="noopener">Source</a></b-why>
<b-finding>
  <ex>Passer du chat à Claude Code ne change que le harness, et la tâche passe du conseil à une modification terminée.</ex>
  <gen>Le choix du modèle et le choix du harness pèsent à peu près autant. Les équipes qui ne comparent que les modèles passent à côté de la moitié du résultat.</gen>
  <do>Avant de changer de modèle, essayez un harness plus solide avec le modèle que vous avez déjà.</do>
</b-finding>
</b-chapter>
<b-chapter id="faq" icon="check-circle" title="FAQ">
<b-faq-cards>
  <q t="Qu'est-ce que le harness d'un agent ?">Tout le code et toute la configuration autour du modèle qui ne sont pas le modèle : boucle, outils, contexte, règles, permissions et vérifications.</q>
  <q t="Agent IA et LLM : quelle différence ?">Un LLM génère du texte. Un agent IA est un LLM placé dans un harness qui transforme ce texte en actions et vérifie le résultat.</q>
  <q t="Agent IA ou chatbot ?">Un chatbot répond dans le cadre d'un script ou d'une conversation. Un agent agit dans vos systèmes et décide lui-même de l'étape suivante.</q>
  <q t="ChatGPT est-il un agent ?">Dans un chat ordinaire, c'est une application de chat. En mode agent et dans Codex, le même modèle reçoit un harness d'action, ce qui en fait un agent.</q>
  <q t="Harness ou framework ?">Un framework fournit des briques pour écrire un agent. Un harness est la couche d'exécution qui fait tourner la boucle et la contrôle.</q>
</b-faq-cards>
</b-chapter>
<b-chapter id="next" icon="arrow-right" title="À lire ensuite">
  <b-links>
    <item href="/materials/glossary/harness/" k="Terme" t="Harness">chaque partie, avec ses liens</item>
    <item href="/blog/harness-driven-development/" k="Pratique" t="Ingénierie du harness">transformer les erreurs en règles</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="Choix" t="Claude Code, Codex, Cursor">quel agent choisir</item>
  </b-links>
</b-chapter>
</b-post>
