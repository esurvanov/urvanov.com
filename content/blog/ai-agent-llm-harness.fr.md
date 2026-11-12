---
title: Agent IA = LLM + harness : différence entre LLM, harness et agent, et ce que contient le harness
date: 2026-10-12
updated: 2026-11-13
description: Agent IA = LLM + harness. LLM, harness et agent dans un seul tableau, les cinq groupes d'un harness et pourquoi le même modèle se comporte autrement dans un chat et dans Claude Code.
tags: IA, agents, agent IA, LLM, harness, harness d'agent, ingénierie du harness
category: harness
layout: wide
mentions: AI agent, LLM, agent harness, harness engineering, agent loop, MCP, Claude Code, Codex, ChatGPT
toc: formula=Agent = LLM + harness | concepts=Cinq notions | table=LLM, harness et agent | parts=Ce que contient le harness | same=Le même modèle | example=Exemple | loop=Fonctionnement | when=Quoi choisir | faq=FAQ | next=À lire ensuite
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
<b-chapter id="concepts" icon="table-cols" title="Cinq notions dans un tableau">
<b-why align="left">Les colonnes se comparent le mieux sur la ligne « Qui conduit la tâche ». Les définitions de l'assistant et de l'agent suivent <a href="https://www.ibm.com/think/topics/ai-agents-vs-ai-assistants" target="_blank" rel="noopener">IBM</a> : les assistants sont réactifs et exécutent des tâches à votre demande, tandis que les agents sont avant tout proactifs, planifient et agissent seuls vers un objectif.</b-why>
<b-table>
<table><thead><tr><th></th><th>LLM</th><th>Chat</th><th>Chatbot</th><th>Assistant</th><th>Agent IA</th></tr></thead><tbody><tr><td>Sert à</td><td>le moteur à l'intérieur des produits</td><td>toutes questions et tous textes</td><td>les questions types d'une entreprise</td><td>vos corvées dans les applications</td><td>une tâche menée jusqu'au résultat</td></tr><tr><td>Qui conduit la tâche</td><td>—</td><td>vous</td><td>un script</td><td>vous, commande après commande</td><td><b>l'agent lui-même</b></td></tr><tr><td>Comprend le langage libre</td><td><b-tag-inline kind="ok">oui</b-tag-inline></td><td><b-tag-inline kind="ok">oui</b-tag-inline></td><td><b-tag-inline kind="muted">en partie</b-tag-inline></td><td><b-tag-inline kind="ok">oui</b-tag-inline></td><td><b-tag-inline kind="ok">oui</b-tag-inline></td></tr><tr><td>Agit dans les applications</td><td><b-tag-inline kind="no">non</b-tag-inline></td><td><b-tag-inline kind="muted">en partie</b-tag-inline></td><td><b-tag-inline kind="muted">en partie</b-tag-inline></td><td><b-tag-inline kind="ok">oui</b-tag-inline></td><td><b-tag-inline kind="ok">oui</b-tag-inline></td></tr><tr><td>Choisit seul ses étapes et ses vérifications</td><td><b-tag-inline kind="no">non</b-tag-inline></td><td><b-tag-inline kind="no">non</b-tag-inline></td><td><b-tag-inline kind="no">non</b-tag-inline></td><td><b-tag-inline kind="no">non</b-tag-inline></td><td><b-tag-inline kind="ok">oui</b-tag-inline></td></tr><tr><td>Créé par</td><td>les fournisseurs de modèles</td><td>les fournisseurs, souvent avec le modèle, et les agrégateurs</td><td>des constructeurs no-code pour les entreprises</td><td>les plateformes : OS, bureautique, recherche</td><td>des agents industriels pour le travail</td></tr><tr><td>Exemple</td><td><a href="/materials/glossary/openai/">GPT</a>, <a href="/materials/glossary/anthropic/">Claude</a>, <a href="/materials/glossary/deepseek/">DeepSeek</a></td><td><a href="/materials/glossary/openai/">ChatGPT</a>, <a href="/materials/glossary/anthropic/">Claude</a> ; agrégateurs : <a href="https://poe.com/" target="_blank" rel="noopener">Poe</a>, <a href="https://openrouter.ai/" target="_blank" rel="noopener">OpenRouter</a></td><td><a href="https://vivochat.ai/" target="_blank" rel="noopener">vivochat.ai</a>, un bot de support bancaire</td><td><a href="/materials/glossary/yandex/">Alice</a>, <a href="/materials/glossary/microsoft/">Copilot</a></td><td><a href="/materials/glossary/claude-code/">Claude Code</a>, <a href="/materials/glossary/codex/">Codex</a>, <a href="/materials/glossary/cursor/">Cursor</a></td></tr></tbody></table>
</b-table>
<b-why align="left" top="10"><b>Chatbot et assistant.</b> Un chatbot répond pour une entreprise selon un script : boutons, mots-clés, passage à un opérateur. Certains bots tournent sur un LLM, mais les limites restent les mêmes. Un assistant comprend n'importe quelle demande et l'exécute dans vos applications : un e-mail, un rappel, une recherche. Chaque étape suivante est une nouvelle commande de votre part.</b-why>
<b-why align="left" top="6"><b>Les agents d'aujourd'hui sont industriels :</b> pour le code, les données, le support. Les agents cloud grand public « pour tout le monde » n'existent pas encore. Observation tirée des projets de l'auteur.</b-why>
<b-finding>
  <ex>Un bot bancaire répond sur les frais. Alice crée un rappel sur commande. Un agent reçoit l'objectif « préparer la release » et décide quoi lire, quoi exécuter et quand s'arrêter.</ex>
  <gen>Un chatbot suit le script de l'entreprise, un assistant suit vos commandes, un agent se conduit lui-même. Le modèle à l'intérieur peut être le même.</gen>
  <do>Demandez-vous, pour un produit : qui choisit l'étape suivante ? Un script, c'est un bot ; vous, c'est un assistant ou un chat ; le produit lui-même, c'est un agent.</do>
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
<b-chapter id="example" icon="arrow-right" title="Exemple : ce que chacun voit du projet">
<b-why align="left">Une tâche, « corriger le test qui échoue », et cinq programmes. La bande sous les parties du projet montre ce que chacun voit. Ce qu'il ne voit pas, il le devine ou vous le renvoie.</b-why>
<b-lane-art names="ai-agent-llm-harness/example"/>
<b-sublabel top="18">Pourquoi un LLM se trompe à l'aveugle</b-sublabel>
<b-arrow-rows>
  <row t="Ce qu'il voit" color="muted">seulement votre texte : ni code, ni test, ni erreur</row>
  <row t="Ce qu'il fait" color="warn">comble les manques de façon plausible : invente des fichiers, des fonctions, des bibliothèques</row>
  <row t="1 sur 5" color="warn">des noms de bibliothèques dans le code écrit par des LLM n'existent pas : 19,7 % sur 576 000 échantillons de code de 16 modèles (<a href="https://arxiv.org/abs/2406.10279" target="_blank" rel="noopener">Spracklen et al.</a>)</row>
  <row t="0–7 % contre 31 %" color="accent">de tâches réelles résolues : un modèle en un seul passage, même avec les bons fichiers, contre un agent avec une boucle « exécuter, vérifier » (<a href="https://arxiv.org/abs/2602.16069" target="_blank" rel="noopener">Raju et al., 2026</a>)</row>
</b-arrow-rows>
<b-finding>
  <ex>Un agent exécute seul toute la boucle « lancer, lire, corriger, vérifier ». Les autres vous confient ces étapes.</ex>
  <gen>Plus une tâche demande d'étapes dans vos systèmes, plus l'agent y gagne. Pour une réponse à une question, un chat est plus rapide et moins cher.</gen>
  <do>Comptez combien de fois vous copiez d'une fenêtre à l'autre dans une tâche type. Plus de deux fois, essayez un agent.</do>
</b-finding>
</b-chapter>
<b-chapter id="loop" icon="swap-hm" title="Comment fonctionne un agent IA : une boucle jusqu'au résultat">
<b-why align="left">Comment fonctionne un agent IA ? Il suit une <a href="/materials/glossary/agent-loop/">boucle d'agent</a> : le modèle choisit l'étape suivante, le harness l'exécute avec un outil et renvoie le résultat au modèle. La boucle se répète jusqu'à ce que la tâche soit résolue ou qu'un humain soit nécessaire. Ce schéma « raisonner, agir, observer » a été décrit dans l'article ReAct ; les agents de code comme Claude Code, Codex et Cursor fonctionnent de la même façon.</b-why>
<b-arrow-rows>
  <row t="1 · Réfléchir" color="muted">le modèle lit la tâche, le contexte et les résultats précédents, et choisit une étape</row>
  <row t="2 · Appeler un outil" color="accent">le harness exécute une commande, lit un fichier, appelle un service</row>
  <row t="3 · Regarder le résultat" color="accent">la sortie de la commande, un texte d'erreur ou la réponse d'un service retourne au modèle</row>
  <row t="4 · Décider" color="warn">terminé : on sort ; une erreur : retour à l'étape 1 ; une étape risquée : on demande à un humain</row>
</b-arrow-rows>
<b-lane-art names="term:agent-loop"/>
<b-finding>
  <ex>Un test échoue : l'agent lit l'erreur et fait une nouvelle modification sans commande de votre part.</ex>
  <gen>Une boucle sans vérifications devient une série de suppositions. C'est pourquoi les tests, les linters et la validation humaine des étapes risquées font partie du harness.</gen>
  <do>Donnez à l'agent un moyen de se vérifier : une commande de test, un critère de fin, un accès aux logs.</do>
</b-finding>
</b-chapter>
<b-chapter id="when" icon="shield-check" title="Quand un chat suffit et quand il faut un agent">
<b-lane-art names="ai-agent-llm-harness/choose"/>
<b-table>
<table><thead><tr><th>Tâche</th><th>Quoi prendre</th><th>Exemple dans le blog</th></tr></thead><tbody><tr><td>Une question, une explication, un brouillon d'e-mail</td><td>chat</td><td><a href="/blog/work-prompts-examples/">Prompts pour les tâches de travail</a></td></tr><tr><td>Questions types de clients, par script</td><td>chatbot</td><td>—</td></tr><tr><td>Une action dans une application, à la voix ou par commande</td><td>assistant</td><td>—</td></tr><tr><td>Une tâche en plusieurs étapes dans le code, les fichiers, les services</td><td>agent IA</td><td><a href="/blog/incident-investigation-agent/">Enquête sur un incident avec un agent IA</a><br><a href="/blog/bug-report-to-reproduction-agent/">Travail de QA après le support avec un agent IA</a><br><a href="/blog/analytics-reports-agent/">Rapports analytiques avec un agent IA</a></td></tr><tr><td>Étapes touchant à l'argent, aux accès, à la publication</td><td>agent + validation humaine</td><td><a href="/blog/agent-hands-work-back-to-you/#human">Les agents IA prendront-ils votre emploi</a><br><a href="/blog/data-plane-control-plane-prompt-injection/">Plan de données et plan de contrôle d'un agent</a></td></tr></tbody></table>
</b-table>
<b-finding>
  <ex>Un e-mail à un client, c'est un chat. Trouver une tâche dans Jira, corriger le code et ouvrir une merge request, c'est un agent.</ex>
  <gen>Sur une question simple, un agent est plus lent et coûte plus cher : il lit le contexte et enchaîne les étapes. Sur une tâche en plusieurs étapes, il vous épargne le travail manuel.</gen>
  <do>Choisissez une tâche en plusieurs étapes de la semaine et confiez-la entière à un agent.</do>
</b-finding>
</b-chapter>
<b-chapter id="faq" icon="check-circle" title="FAQ">
<b-faq-cards>
  <q t="Agent IA et assistant : quelle différence ?">Un assistant exécute votre demande par des fonctions prédéfinies : une action à la fois. Un agent reçoit un objectif, planifie lui-même les étapes, choisit les outils et vérifie le résultat.</q>
  <q t="Agent IA ou chatbot ?">Un chatbot répond selon un script ou à partir d'une base de réponses. Un agent agit dans vos systèmes et vérifie le résultat.</q>
  <q t="Agent IA et LLM : quelle différence ?">Un LLM génère du texte. Un agent IA est un LLM placé dans un harness qui transforme ce texte en actions et vérifie le résultat.</q>
  <q t="Qu'est-ce que le harness d'un agent ?">Tout le code et toute la configuration autour du modèle qui ne sont pas le modèle : boucle, outils, contexte, règles, permissions et vérifications.</q>
  <q t="Harness ou framework ?">Un framework fournit des briques pour écrire un agent. Un harness est la couche d'exécution qui fait tourner la boucle et la contrôle.</q>
  <q t="Comment fonctionne un agent IA ?">En boucle : le modèle choisit une étape, le harness l'exécute, le résultat retourne au modèle. La boucle tourne jusqu'à ce que la tâche soit résolue ou qu'un humain soit nécessaire.</q>
  <q t="ChatGPT est-il un agent ?">Dans un chat ordinaire, c'est une application de chat. En mode agent et dans Codex, le même modèle reçoit un harness d'action, ce qui en fait un agent.</q>
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
