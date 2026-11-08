---
title: Boucle de retour courte pour les bugs : d’un bouton « Signaler un bug » au correctif avec un agent IA
date: 2026-10-20
updated: 2026-11-08
description: Corriger les bugs plus vite sans téléphone arabe : les employés signalent depuis l’application, le contexte est collecté pour eux, un agent IA trouve la cause, une personne valide.
tags: IA, agents, bugs, retour utilisateur, MTTR, MCP, Claude Code, harness
category: harness
layout: wide
mentions: feedback loop, MTTR, DORA, bug report, AI agent, Claude Code, Model Context Protocol, human-in-the-loop
toc: chain=Où le temps se perd | button=Un bouton au lieu du récit | agent=Agent et humain | modes=Deux modes | cases=Cas et chiffres | risks=Risques | first=Comment commencer | faq=Questions | next=À lire ensuite
---

Une boucle de retour courte fonctionne ainsi : un employé envoie un bug avec un bouton dans l’application, l’application joint elle-même le contexte technique, un agent IA trouve la cause et propose un plan, et une personne valide le plan et le correctif. Aucun manager ni ticket ne raconte le bug de seconde main. Ci-dessous : où part le temps, deux modes, les risques.

<b-post series="harness">

<b-chapter id="chain" icon="clock" title="Où le temps se perd">
  <b-why align="left">Un bug fait généralement un long chemin entre celui qui l’a vu et celui qui le corrige. La chaîne du haut montre le trajet habituel : employé, manager, ticket, demandes de précisions, reproduction. La chaîne du bas montre la boucle courte : un bouton dans l’application, un rapport avec contexte, un agent, la validation humaine, la mise en production. Les barres montrent la fréquence des rapports incomplets : 92 % des bugs Android n’ont pas d’étapes de reproduction, environ 70 % des rapports GitHub sont incomplets, et seuls 37 à 44 % des bugs sont transmis.</b-why>
  <b-sublabel>Le trajet habituel</b-sublabel>
  <b-hchain label="Employé, manager, ticket, développeur, précisions, reproduction">
    <step icon="user" t="Employé">a vu</step>
    <step icon="users" t="Manager">a raconté</step>
    <step icon="file-text" t="Ticket">attend</step>
    <step icon="help" t="Précisions">échanges</step>
    <step icon="bug" t="Reproduction">heures</step>
  </b-hchain>
  <b-sublabel top="22">La boucle courte</b-sublabel>
  <b-hchain label="Bouton dans l’application, rapport avec contexte, agent, validation humaine, mise en production">
    <step icon="target" t="Bouton">dans l’appli</step>
    <step icon="database" t="Rapport">avec contexte</step>
    <step icon="bot" t="Agent">cause</step>
    <step icon="check-circle" t="Humain">valide</step>
    <step icon="zap" t="Release">corrigé</step>
  </b-hchain>
  <b-sublabel top="22">Part des bugs et des rapports</b-sublabel>
  <b-count-bars>
    <bar k="Sans étapes (Android)" w="92%" color="c-none">92%</bar>
    <bar k="Incomplets (GitHub)" w="70%" color="c-none">~70%</bar>
    <bar k="Transmis" w="44%" color="c-light">37–44%</bar>
  </b-count-bars>
  <b-finding>
    <ex>Chaque récit de seconde main perd ce dont le développeur a le plus besoin : les étapes, le résultat attendu, l’état de l’écran.</ex>
    <gen>Les développeurs ont surtout besoin des étapes de reproduction et de la pile d’erreur, et ce sont elles que les utilisateurs fournissent le plus difficilement<b-proof href="https://thomas-zimmermann.com/publications/files/zimmermann-tse-2010.pdf" quote="Zimmermann et al., What Makes a Good Bug Report — a survey of Apache, Eclipse and Mozilla developers"/>. Un rapport incomplet demande 201 minutes pour être reproduit, contre 120<b-proof href="https://arxiv.org/pdf/2203.12093" quote="A study of bug report completeness — arxiv.org/pdf/2203.12093"/>.</gen>
    <do>Comptez par combien de mains passe un bug, de celui qui l’a vu à celui qui le corrige.</do>
  </b-finding>
</b-chapter>

<b-chapter id="button" icon="target" title="Un bouton au lieu du récit">
  <b-why>La personne ne donne que ce qu’une machine ne peut pas savoir : ce qu’elle voulait et ce qu’elle a vu. L’application enregistre le reste toute seule.</b-why>
  <b-rules>
    <rule icon="image" t="Capture avec cadre">La personne entoure l’endroit, et les cadres sont incrustés dans l’image</rule>
    <rule icon="list-check" t="Trois questions">Ce que vous avez fait, ce que vous attendiez, ce qui s’est passé ; la première est préremplie d’après les derniers clics</rule>
    <rule icon="mic" t="Voix">On le dit à voix haute, et la transcription est ajoutée à la bonne étape</rule>
    <rule icon="history" t="Actions">Clics, navigation, saisie sans les valeurs</rule>
    <rule icon="log-lines" t="Requêtes et erreurs">Les dernières requêtes serveur avec leurs réponses, erreurs de la console, état du serveur</rule>
    <rule icon="lock" t="Données personnelles masquées">Noms, contacts et messages dans le texte sont masqués, les clés sont retirées</rule>
  </b-rules>
  <b-finding>
    <ex>Décrire le bug prend quelques secondes : les réponses se choisissent d’un geste.</ex>
    <gen>Le rapport est écrit pour un agent qui peut lire n’importe quel volume de détails techniques ; tout est donc collecté d’emblée.</gen>
    <do>Placez le bouton là où les gens voient le problème, à la place d’un tracker séparé.</do>
  </b-finding>
</b-chapter>

<b-chapter id="agent" icon="bot" title="Agent et humain">
  <b-why align="left">L’agent fait l’analyse, l’humain prend les décisions. L’agent prend chaque rapport séparément, l’examine et rapporte une synthèse : ce qui est visible, la cause probable avec l’endroit dans le code, un plan et les risques. Il ne modifie ni code ni statuts. L’humain valide le plan. Ensuite l’agent fait le correctif dans une branche à part, et l’humain fusionne la modification et la met en production. La phrase encadrée est une demande toute prête pour l’agent.</b-why>
  <b-steps>
    <step t="L’agent prend un rapport">chaque rapport va à son propre agent, sans hypothèses partagées</step>
    <step t="Examine et rapporte" hl>ce qui est visible, la cause probable avec l’endroit dans le code, un plan, les risques, les questions ; ne touche ni au code ni aux statuts</step>
    <step t="L’humain valide le plan">ou pose des questions</step>
    <step t="Correctif">branche, vérifications, merge request</step>
    <step t="L’humain fusionne et publie">l’agent rejoue jusqu’au bout le scénario du rapport avant de dire « corrigé »</step>
  </b-steps>
  <b-say-agent title="Dites à l’agent">Prends les rapports de bugs ouverts, analyse chacun avec un agent séparé et reviens avec une synthèse. Ne change rien tant que je n’ai pas validé.</b-say-agent>
  <b-finding>
    <ex>Le tracker remet lui-même les règles de travail à l’agent à la connexion, si bien que chaque session se comporte de la même façon.</ex>
    <gen>Les agents apportent la vitesse, et les décisions restent à l’humain en deux points : le plan et la fusion.</gen>
    <do>Écrivez l’ordre « examiner → rapporter → attendre la validation » là où l’agent le lira sans vous.</do>
  </b-finding>
</b-chapter>

<b-chapter id="modes" icon="scales" title="Deux modes : sur bouton ou automatique">
  <b-why align="left">Il y a deux modes. Sur bouton, le développeur lance l’agent d’une seule commande, l’agent trouve la cause et un plan, et l’humain valide. En mode automatique, le système lance un agent à chaque rapport, et celui-ci écrit aussitôt le correctif. Le tableau compare les modes par vitesse et par coût.</b-why>
  <b-table>
| | Sur bouton | Automatique |
|---|---|---|
| Qui le lance | le développeur, d’une seule commande | le système, dès qu’un rapport arrive |
| Ce que fait l’agent | trouve la cause et un plan | écrit aussitôt le correctif |
| Rôle du développeur | valide le plan, vérifie la modification | vérifie la modification terminée |
| Vitesse | des minutes jusqu’à un rapport | la modification est prête à l’arrivée de l’humain |
| Coût | l’agent ne travaille que sur les rapports qui comptent | l’agent est dépensé sur chaque rapport, doublons et faux bugs compris |
  </b-table>
  <b-finding>
    <ex>Abnormal AI fait des deux modes des étiquettes sur une tâche : la première demande à l’agent de trouver la cause, la seconde d’écrire le correctif<b-proof href="https://abnormal.ai/blog/ai-agents-are-absorbing-the-first-pass-on-every-bug" quote="Abnormal AI: AI agents are absorbing the first pass on every bug"/>.</ex>
    <gen>Il est moins coûteux de commencer par le mode sur bouton : le développeur écarte le bruit avant que l’agent ne se mette à écrire du code.</gen>
    <do>Activez le mode automatique quand le flux de rapports est propre et que les doublons sont rares.</do>
  </b-finding>
</b-chapter>

<b-chapter id="cases" icon="trend-up" title="Cas et chiffres">
  <b-why align="left">Les chiffres issus de la pratique d’entreprises montrent l’ampleur de l’effet : chez Wix, le délai est passé de semaines à des heures, et chez Ramp avec Jam, un rapport prend des secondes au lieu de 15 à 20 minutes. La ligne sous le tableau renvoie à l’exemple propre de l’auteur : sur 25 rapports dans le tracker intégré, 23 sont clos.</b-why>
  <b-table>
| Qui | Ce qui a été fait | Avant → après |
|---|---|---|
| Wix | des agents collectent le contexte, écrivent et vérifient le correctif, un humain valide | semaines → heures |
| Salesforce | un modèle analyse les bugs clients | ~300 jours-personnes → moins d’une semaine |
| Metaview | un agent analyse les incidents, un humain vérifie | 30–45 min → ~5 min |
| LaunchDarkly | des agents trouvent les bugs et ouvrent des correctifs | ~40 % des bugs uniques ont abouti à un correctif |
| Ramp + Jam | un rapport avec capture et collecte automatique du contexte | 15–20 min → secondes par rapport |
  </b-table>
  <b-metric-line value="23 sur 25">rapports clos dans le tracker intégré d’une application en production</b-metric-line>
  <b-finding>
    <ex>Tous les cas partagent un même geste : le contexte est collecté avant qu’un humain s’assoie devant le bug.</ex>
    <gen>Un temps de correction plus court (MTTR dans les métriques DORA) vient de la collecte du contexte et d’une chaîne courte de personnes<b-proof href="https://www.wix.engineering/post/from-weeks-to-hours-inside-wix-s-autonomous-bug-fixing-system" quote="Wix Engineering: From weeks to hours — inside Wix’s autonomous bug-fixing system"/>.</gen>
    <do>Mesurez dès maintenant le temps entre le rapport et la mise en production, pour avoir de quoi comparer.</do>
  </b-finding>
</b-chapter>

<b-chapter id="risks" icon="alert" title="Risques">
  <b-why align="left">L’agent lit un texte écrit par des personnes ; la méthode a donc ses propres risques : faux rapports, données personnelles dans les captures, tests au vert avec une fonction cassée, et responsabilité diluée. Les quatre cartes ci-dessous nomment chaque risque et la manière de l’écarter.</b-why>
  <b-rules cols="2">
    <rule icon="shield-alert" t="Faux rapport">Le texte du rapport est écrit par des personnes ; l’agent le lit comme des données, jamais comme des commandes</rule>
    <rule icon="lock" t="Données personnelles">Le texte est masqué, la capture part telle quelle, et une boîte de dialogue en avertit</rule>
    <rule icon="check-square" t="Tests au vert, fonction cassée">La vérification est un rejeu du scénario exact du rapport sur le même type de données</rule>
    <rule icon="users" t="Responsabilité diluée">Un humain valide le plan et fusionne ; le silence ne vaut pas accord</rule>
  </b-rules>
  <b-finding>
    <ex>Un agent avec accès en écriture et du texte d’utilisateurs est un canal de tromperie par le texte.</ex>
    <gen>Pour en savoir plus sur la façon d’empêcher que des données deviennent des commandes, voir l’article sur le [plan de données et le plan de contrôle](/blog/data-plane-control-plane-prompt-injection/).</gen>
    <do>Donnez à l’agent une clé séparée : lecture seule pour l’analyse, écriture seulement après validation.</do>
  </b-finding>
</b-chapter>

<b-chapter id="first" icon="flag" title="Comment commencer">
  <b-why align="left">Commencez par mesurer : mesurez d’abord le trajet du bug, ajoutez ensuite le bouton, puis donnez à l’agent l’accès en lecture et la règle « rapport d’abord, validation ensuite ». L’accès en écriture et le mode automatique viennent plus tard.</b-why>
  <b-steps>
    <step t="Mesurer le trajet du bug">combien de personnes et de jours entre « vu » et « corrigé »</step>
    <step t="Ajouter le bouton">capture, trois questions, collecte automatique des actions et des erreurs</step>
    <step t="Donner à l’agent l’accès en lecture" hl>et la règle : rapport d’abord, validation ensuite</step>
  </b-steps>
  <b-finding>
    <ex>Trois étapes sans mode automatique et sans accès en écriture.</ex>
    <gen>D’abord une chaîne courte de personnes, ensuite la vitesse de l’agent.</gen>
    <do>Commencez avec une application et dix rapports.</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Questions fréquentes">
  <b-faq-cards>
    <q t="Qu’est-ce qu’une boucle de retour courte ?">Un employé envoie un bug avec un bouton dans l’application, l’application joint le contexte technique, un agent trouve la cause et propose un plan, et une personne valide le plan et le correctif.</q>
    <q t="Pourquoi un bouton « Signaler un bug » compte-t-il ?">Les développeurs ont surtout besoin des étapes de reproduction et de la pile d’erreur, que les utilisateurs fournissent le plus difficilement. Le bouton les collecte tout seul.</q>
    <q t="Où une personne décide-t-elle ?">En deux points : la validation du plan de correction et la fusion du code.</q>
    <q t="Par quel mode commencer ?">Par le mode à la demande : un développeur écarte le bruit avant que l’agent ne se mette à écrire du code.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="À lire ensuite">
  <b-links>
    <item href="/blog/jira-ai-agent-boundaries/" k="Frontière" t="Jira et un agent IA : avantages, limites et où tracer la frontière">Pourquoi la collecte des bugs est un service séparé</item>
    <item href="/blog/bug-report-to-reproduction-agent/" k="QA" t="Travail du QA après le support avec un agent IA">L’agent reproduit un bug de Jira</item>
    <item href="/blog/incident-investigation-agent/" k="Incidents" t="Enquête sur un incident avec un agent IA">Sentry et Grafana via MCP</item>
  </b-links>
</b-chapter>
<b-footer>Les chiffres viennent d’études sur les rapports de bugs (Zimmermann et al. ; arxiv 2203.12093, 2301.01235 ; Jeong et al.) et des blogs d’ingénierie de Wix, Salesforce, Metaview, LaunchDarkly, Abnormal AI et Jam. L’exemple est le tracker de bugs intégré d’une application en production, octobre 2026.</b-footer>
</b-post>
