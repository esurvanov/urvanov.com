---
title: Les agents IA vont-ils prendre votre travail : tout dépend de qui charge qui — vous les agents, ou les agents vous
date: 2026-10-05
updated: 2026-11-08
description: Un agent IA va-t-il prendre votre travail ? En pratique, il demande souvent à la personne de lancer une commande, de chercher une tâche ou de copier un fichier. Ce que l’agent fait seul, ce qui reste à vous et comment cesser d’être le coursier entre les fenêtres.
tags: IA, agents, emploi, carrière, avenir du travail, délégation, MCP, harness
category: harness
layout: wide
mentions: AI replacing jobs, will AI take my job, AI agent, future of work, delegation, MCP, Claude Code, CLAUDE.md, harness, human-in-the-loop
toc: what=Prendra-t-il votre travail | phrases=Phrases-signaux | lazy=Pourquoi ça traîne | hard=Vraie complexité | fix=Casser l’habitude | human=Ce qui reste à vous | faq=FAQ | next=À lire ensuite
---

Les agents IA vont-ils prendre votre travail ? Ils prennent la routine et renvoient une partie du travail vers vous : ils vous demandent de lancer une commande, de chercher une tâche, de copier un fichier. Ci-dessous : ce que l’agent fait seul, comment repérer ces demandes, quoi répondre, comment écrire une règle et ce qui reste vraiment à la personne. Article lié : [MCP pour un agent IA](/blog/mcp-agent-access/).

<b-post series="harness">
<b-chapter id="what" icon="swap-hm" title="Un agent prendra-t-il votre travail">
<b-why align="left">L’agent prend la routine et renvoie une partie du travail vers vous : il vous demande de lancer, de chercher et de copier ce qu’il peut faire seul.</b-why>
<b-lane title="Qui fait le travail" color="accent">
<b-scene names="agent-hands-work-back-to-you/before-after"/>
</b-lane>
<b-finding>
  <ex>L’agent écrit : « Lance la commande et envoie-moi la sortie ». Il peut la lancer et lire la sortie lui-même.</ex>
  <gen>La routine passe à l’agent, tandis que les décisions et la responsabilité restent aux personnes. D’après l’expérience, un agent choisit aussi le chemin où c’est la personne qui travaille, et chacune de ces demandes vous remet dans le rôle de coursier entre les fenêtres.</gen>
  <do k="Que faire">Confiez la routine à l’agent et gardez les décisions. Une demande « fais-le toi-même » ? Répondez : « Fais-le toi-même ».</do>
</b-finding>
</b-chapter>
<b-chapter id="phrases" icon="check-circle" title="Phrases-signaux">
<b-why align="left">Deux demandes de l’agent et la réponse « fais-le toi-même ». Il sait gérer les deux.</b-why>
<b-agent-term app="Claude&#8203; Code" ver="v2.1" model="Sonnet 5.5 · Claude Max" path="~/projects/shop">
  <line kind="ask">Corrige le test qui échoue</line>
  <line kind="req" note="l’agent vous demande">Lance `npm test` et envoie-moi la sortie.</line>
  <line kind="you" note="vous : fais-le toi-même">Lance-le toi-même et lis la sortie.</line>
  <line kind="act">Bash(npm test)</line>
  <line kind="out">2 failed: auth.test.ts</line>
  <line kind="act">Cause trouvée dans auth.ts, je corrige.</line>
  <line kind="ask">Que contient la tâche PAY-142 ?</line>
  <line kind="req" note="l’agent vous demande">Ouvre Ji&#8203;ra et trouve la tâche.</line>
  <line kind="you" note="vous : fais-le toi-même">Trouve-la toi-même via M&#8203;CP.</line>
  <line kind="act">jira.get_issue(PAY-142)</line>
  <line kind="out">étapes, commentaires, historique</line>
  <line kind="act">Lu. Les étapes sont : …</line>
</b-agent-term>
<b-finding>
  <ex>L’agent demande d’ouvrir Jira. Vous répondez « Trouve-la toi-même via MCP » et vous obtenez toute la tâche.</ex>
  <gen>Derrière chaque phrase se cache une action que l’agent peut exécuter seul s’il a l’accès.</gen>
  <do k="Que faire">Notez les trois phrases que vous entendez le plus souvent et une réponse pour chacune.</do>
</b-finding>
</b-chapter>
<b-chapter id="lazy" icon="clock" title="Pourquoi l’agent traîne les pieds">
<b-why align="left">L’agent estime l’effort à l’avance. D’après l’expérience, il décide souvent « c’est long et difficile », surtout pour les intégrations. Parfois il a raison, parfois non.</b-why>
<b-embed-frame src="/embed/estimate-check.html?v=27&lang=en" title="Trois scènes : comment pense l’agent, comment vous pensez et comment c’est en réalité. La scène 3D et le graphique fonctionnent en synchronisation" ratio="4/4"/>
<b-finding>
  <ex>Agent : « L’intégration Jira sera longue ». Vous : « Lis une tâche ». Une minute plus tard, la tâche est lue.</ex>
  <gen>L’estimation de l’agent reste une supposition tant qu’un essai ne l’a pas vérifiée. Certaines estimations sont justes : pas d’accès, une connexion est nécessaire, un réseau fermé.</gen>
  <do k="Que faire">Laissez-le toujours essayer d’abord. Pas de résultat après 2–3 essais : demandez-lui de découper la tâche en étapes et de dire où se trouve le problème possible. Demandez à l’agent pourquoi cela ne marche pas.</do>
</b-finding>
</b-chapter>
<b-chapter id="hard" icon="cube" title="Où la complexité est réelle">
<b-why align="left">Le point de départ est le <a href="/materials/glossary/osi/">modèle OSI</a> : une requête traverse sept couches, et ces couches peuvent vivre sur des systèmes physiques différents. La complexité est réelle là où il y a plus de couches et de systèmes, et là où plusieurs <a href="/materials/glossary/bounded-context/">contextes délimités</a> sont impliqués, surtout si l’un d’eux échappe au contrôle. D’après l’expérience.</b-why>
<b-why align="left" top="14">La complexité vient du volume de recherche. Un service interne est ouvert : le code et les tests sont à portée de main, il suffit de lire. Un système étranger est une boîte noire : on ne peut apprendre son fonctionnement qu’en le sondant de l’extérieur.</b-why>
<b-lane title="La clé : combien de recherche exigent les boîtes noires" color="warn" top="12">
<b-scene names="agent-hands-work-back-to-you/research-volume"/>
</b-lane>
<b-why align="left" top="14">Prenons un exemple : deux tâches dans un même projet.</b-why>
<b-view-switch id="vt-hard">
  <view label="Simple"><b-lane title="Faut-il des changements" color="accent">
<b-scene names="agent-hands-work-back-to-you/whose-changes"/>
</b-lane>
<b-why align="left" top="10">Une seule question : faut-il des changements chez autrui. Par exemple, modifier les remises entre deux services internes : tout est dans la zone propre, aucun changement externe n’est nécessaire, l’agent s’en charge. Mais dès que le stock vient du système d’entrepôt d’une autre équipe, cette équipe doit faire des changements, et ce n’est plus le travail de l’agent.</b-why></view>
  <view label="Détaillé"><b-lane title="A · remise : deux services internes" color="accent">
<b-scene names="agent-hands-work-back-to-you/layers-discount"/>
</b-lane>
<b-why align="left" top="16">La remise traverse une seule couche et reste en interne. Le stock de l’entrepôt traverse les couches de l’autre côté, et chacune exige un sondage à l’aveugle.</b-why>
<b-lane title="B · stock de l’entrepôt : chemin à travers trois couches" color="warn" top="16">
<b-scene names="agent-hands-work-back-to-you/layers-warehouse"/>
</b-lane></view>
</b-view-switch>
<b-finding>
  <ex>Une remise entre services internes : tout est interne, l’agent s’en charge. Le stock de l’entrepôt : l’équipe de l’entrepôt doit changer des choses (accès, port), donc l’agent a raison de dire que c’est long.</ex>
  <gen>La clé est la quantité d’inconnu à explorer. Une boîte noire ne s’ouvre pas, elle se vérifie par des sondages de l’extérieur, et chaque couche et chaque système étranger en ajoute.</gen>
  <do k="Que faire">Estimez combien de sondages à l’aveugle vous attendent. Beaucoup : découpez la tâche le long des frontières entre systèmes et demandez à l’agent d’en vérifier un à la fois.</do>
</b-finding>
</b-chapter>
<b-chapter id="fix" icon="arrow-right" title="Comment casser l’habitude">
<b-why align="left">L’ancre est la bible du projet : une description permanente du produit et de ses règles que l’agent lit à chaque session. Trois niveaux : l’accès, une note dans la bible, un rappel. <a href="https://code.claude.com/docs/en/memory" target="_blank" rel="noopener">Plus de détails</a></b-why>
<b-lane-art names="agent-hands-work-back-to-you/project-bible" top="10"/>
<b-step-chain>
  <node t="1">Donner l’accès</node>
  <node t="2">L’écrire dans la bible</node>
  <node t="3">Rappeler en une phrase</node>
</b-step-chain>
<b-section-h3 top="14">Que mettre dans la bible</b-section-h3>
<b-arrow-rows wide>
  <row t="L’agent estime au lieu de faire" color="accent">Essayer d’abord, estimer après l’essai</row>
  <row t="L’essai a échoué 2–3 fois" color="warn">Découper la tâche en étapes, dire où le problème est possible et expliquer pourquoi cela ne marche pas</row>
  <row t="Un système étranger : une boîte noire" color="muted">L’étudier par des sondages de l’extérieur et noter les résultats dans la bible pour ne pas les rechercher à nouveau</row>
  <row t="Il faut une connexion, un secret, une confirmation, un paiement" color="accent">C’est une personne qui s’en charge, le reste est à faire par l’agent</row>
</b-arrow-rows>
<b-section-h3 top="14">Règles dans la bible du projet</b-section-h3>
<b-code-text wrap>
  Essaie d’abord, estime après l’essai.
  Si l’essai a échoué 2–3 fois : découpe la tâche en étapes, dis où le problème peut se trouver et explique pourquoi cela ne marche pas.
  Étudie un système étranger par des sondages de l’extérieur et note les résultats ici.
  Si tu peux le faire toi-même, fais-le. Ne demande à la personne que ce qui la requiert : connexion, mots de passe, confirmation d’une écriture, paiements.
</b-code-text>
<b-why align="left">La bible vit dans les fichiers <a href="/materials/glossary/claude-md/">CLAUDE.md</a> et <a href="/materials/glossary/agents-md/">AGENTS.md</a> : l’agent les lit à chaque session, mais les traite comme du contexte et non comme un blocage strict. Plus la règle est précise et courte, plus elle fonctionne de façon fiable. Les processus récurrents se regroupent en <a href="/materials/glossary/agent-skills/">skills</a>. Plus sur la bible, les règles, les spécifications et les skills : <a href="/blog/specs-rules-skills/">Spécifications, bible, règles et skills</a>.</b-why>
<b-finding>
  <ex>L’agent est connecté à Jira et connaît la règle. Au lieu de « ouvre Jira », il lit la tâche lui-même.</ex>
  <gen>Sans accès, la règle n’aide pas : l’agent ne peut pas le faire seul. D’abord la connexion, ensuite la règle.</gen>
  <do k="Que faire">Connectez la source vers laquelle l’agent vous renvoie le plus souvent et écrivez la règle dans la bible du projet.</do>
</b-finding>
</b-chapter>
<b-chapter id="human" icon="shield-check" title="Ce qui reste à vous">
<b-lane title="La frontière" color="accent">
<b-scene names="agent-hands-work-back-to-you/split"/>
</b-lane>
<b-finding>
  <ex>L’agent lit la tâche et prépare un commentaire lui-même, et la publication dans Jira se fait après votre confirmation.</ex>
  <gen>Ce qui reste à la personne, c’est là où l’identité et la responsabilité comptent : connexion, secrets, confirmation d’une écriture, argent.</gen>
  <do k="Que faire">Écrivez la frontière dans la règle du projet pour que l’agent ne demande ni trop, ni ne fasse trop.</do>
</b-finding>
</b-chapter>
<b-chapter id="faq" icon="check-circle" title="FAQ">
<b-faq-cards>
  <q t="Un agent IA remplacera-t-il un spécialiste ?">L’agent prend en charge les étapes de routine. Les décisions, la responsabilité et la vérification du résultat restent à la personne.</q>
  <q t="Quel travail l’agent fait-il seul ?">Il lit, cherche, copie, lance des commandes et rédige des brouillons, à condition d’avoir accès aux systèmes.</q>
  <q t="Que ne fera pas l’agent sans vous ?">Se connecter, saisir un mot de passe, confirmer une écriture, payer. Cela reste à la personne.</q>
  <q t="Pourquoi l’agent me demande-t-il de faire ce qu’il peut faire seul ?">D’après l’expérience, il choisit le chemin où c’est la personne qui travaille. L’accès aux systèmes et une règle dans les instructions du projet aident.</q>
  <q t="Comment travailler avec un agent sans perdre professionnellement ?">Confiez la routine, gardez la définition des tâches et la relecture. Ces étapes restent à la personne.</q>
</b-faq-cards>
</b-chapter>
<b-chapter id="next" icon="arrow-right" title="À lire ensuite">
  <b-links>
    <item href="/blog/mcp-agent-access/" k="MCP" t="MCP pour un agent IA">comment donner l’accès à l’agent</item>
    <item href="/blog/specs-rules-skills/" k="Règles" t="Spécifications, règles et skills">que mettre dans les instructions</item>
    <item href="/blog/harness-driven-development/" k="Boucle d’erreurs" t="Harness-Driven Development">comment les erreurs de l’agent deviennent des règles</item>
  </b-links>
</b-chapter>
</b-post>
