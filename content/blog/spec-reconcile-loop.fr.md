---
title: Une boucle de réconciliation pour les spécifications : comme Kubernetes, avec la spec comme état désiré et le code comme état réel
date: 2026-09-28
updated: 2026-11-08
description: Le développement piloté par les spécifications avec une boucle de réconciliation : qui change l'état désiré et qui y ramène le code, pourquoi des tests au vert ne signifient pas encore « correct », et de quelles six capacités de l'environnement l'agent a besoin pour fermer la boucle.
tags: IA, développement piloté par les spécifications, spécifications, Kubernetes, harness
category: specs
layout: wide
image: /og/spec-reconcile-loop.en.png
mentions: Kubernetes, reconcile loop, human-in-the-loop, Model Context Protocol, Spec-Driven Development
toc: k8s=Comme Kubernetes | sensors=Limites des vérifications | env=Environnement | faq=Questions | next=À lire ensuite
---

Une boucle de réconciliation pour les spécifications fonctionne comme un contrôleur dans Kubernetes : une personne change l'état désiré (la spec), l'agent le compare à l'état réel (le code) et met le code en conformité, et les tests mesurent le résultat. Des tests au vert ne vérifient que ce qui y est écrit, donc chaque MUST a besoin de sa propre vérification, et l'environnement de l'agent doit offrir l'exécution du code, des tests, des logs, des données, des services et un bac à sable (sandbox).

<b-post series="rec">
<b-hchain label="La chaîne de réconciliation : le désiré est la spec, l'acteur est l'agent, le réel est le code, la mesure ce sont les tests">
  <step icon="book" t="Désiré">spec</step>
  <step icon="bot" t="Acteur">agent</step>
  <step icon="code-slash" t="Réel">code</step>
  <step icon="gauge" sw="1.8" t="Mesure">tests</step>
</b-hchain>
<b-chapter id="k8s" title="La même boucle que dans Kubernetes" icon="hub" sw="1.6">
  <b-why align="left">Kubernetes est un système qui fait tourner des services et les maintient en marche sur de nombreux serveurs. Son idée centrale est simple : une personne décrit comment les choses doivent être (« garder trois copies du service »), et un programme superviseur, le contrôleur, compare sans cesse la description à ce qui existe réellement et corrige les écarts. C'est la boucle de réconciliation. Pour les spécifications, le même schéma fonctionne : une personne fixe l'état désiré, et un agent peut y ramener le code.</b-why>
  <b-why>L'état désiré est ici le <a href="/blog/specs-by-aggregates/">dictionnaire d'agrégats</a> : une entrée par concept, des exigences marquées MUST et SHOULD.</b-why>
  <b-k8s-loop label="Kubernetes : chart, contrôleur, nœuds, sondes. Spécifications : dictionnaire, agent, code, tests. Un humain ne change que l'état désiré, et l'acteur ne cesse de rapprocher la mesure de celui-ci." cols="désiré | acteur | réel | mesure" human="un humain change l'état désiré" back="mesure → acteur, en boucle">
    <b-k8s-row icon="hub" sw="1.6" t="Kubernetes">
      <cell on>chart · manifeste</cell>
      <cell>contrôleur</cell>
      <cell>nœuds · pods</cell>
      <cell>sondes · métriques</cell>
    </b-k8s-row>
    <b-k8s-row icon="book" t="Spécifications">
      <cell on>dictionnaire · MUST</cell>
      <cell hz>agent</cell>
      <cell>code</cell>
      <cell hz>tests · qualité</cell>
    </b-k8s-row>
    <b-k8s-row icon="help" t="En clair">
      <cell>comment cela doit être</cell>
      <cell>qui l'y amène</cell>
      <cell>comment c'est maintenant</cell>
      <cell>ce qui les compare</cell>
    </b-k8s-row>
  </b-k8s-loop>
  <b-why align="left">Comment lire l'image. Les quatre colonnes sont les quatre rôles de la boucle, les deux lignes sont deux systèmes, et la troisième ligne met les termes en clair. L'état désiré (en plein) est ce qu'une personne change. Dans Kubernetes, ce sont le chart et le manifeste : des fichiers qui disent quelles parties d'un service doivent tourner et en combien d'exemplaires. Dans les spécifications, c'est le dictionnaire d'agrégats avec les mots MUST (« obligatoire ») et SHOULD (« recommandé »). L'acteur amène l'état réel vers l'état désiré : dans Kubernetes, le contrôleur ; dans les spécifications, l'agent. L'état réel est ce qui existe maintenant : des nœuds (serveurs) et des pods (les parties d'un service qui y tournent), ou le code. La mesure indique s'ils concordent : des sondes (de courtes vérifications automatiques « fonctionnes-tu ? ») et des métriques, ou des tests et des contrôles de qualité. La flèche descendante en haut signifie qu'une personne ne change que l'état désiré. La flèche de boucle en bas signifie que la mesure retourne à l'acteur, et ainsi de suite jusqu'à la concordance. Exemple : une personne écrit dans le dictionnaire « une réservation se ferme au bout de 15 minutes », l'agent modifie le code, les tests le vérifient, et un test rouge renvoie l'agent au code.</b-why>
  <b-cap>La boucle de réconciliation suit la <a href="https://kubernetes.io/docs/concepts/architecture/controller/" target="_blank" rel="noopener">documentation de Kubernetes sur les contrôleurs</a>.</b-cap>
  <b-finding>
    <ex>Dans Kubernetes, un humain modifie le chart et le contrôleur y amène les nœuds. Ici, un humain modifie le dictionnaire et l'agent y amène le code et vérifie avec des tests.</ex>
    <gen>Les deux systèmes séparent l'état désiré de l'état réel et les rapprochent dans une boucle. L'humain dans la boucle ne change que l'état désiré, donc chaque modification devient aussitôt du travail pour l'acteur.</gen>
    <do>Modifiez l'exigence dans le dictionnaire au lieu de corriger le code à la main, et lancez l'agent avec la tâche de mettre le code en conformité avec le dictionnaire.</do>
  </b-finding>
</b-chapter>
<b-chapter id="sensors" title="Une vérification ne voit que ce qu'on y a mis" icon="gauge">
  <b-why align="left">Une vérification ne montre que ce qu'on y a mis. Dans Kubernetes, une sonde est une courte requête automatique à un service : « réponds-tu ? ». Si le service répond « 200 » (le code de succès), la sonde est verte, même si le service ne fait peut-être pas l'essentiel : par exemple, la file des commandes est bloquée. Dans les spécifications, il en va de même avec les tests. Si une exigence n'a pas de test, tous les tests restent verts et personne ne remarque que l'exigence n'est pas satisfaite.</b-why>
  <b-why>L'exemple est la réservation de salles de réunion de <a href="/blog/specs-by-aggregates/">Spécifications par agrégats</a> : trois exigences MUST et une SHOULD.</b-why>
  <b-probe-check>
    <b-probe-panel icon="hub" sw="1.6" t="Kubernetes" verdict="la sonde est verte, le service ne fonctionne pas">
      <probe kind="ok" note="sonde">le service a répondu « 200 : fonctionne »</probe>
      <probe kind="no" note="non vérifié">les commandes ne sont pas traitées</probe>
    </b-probe-panel>
    <b-probe-panel icon="book" t="Spécifications" verdict="les tests sont verts, un MUST n'est pas vérifié">
      <probe kind="ok" note="a un test">MUST · les réservations d'une même salle ne se chevauchent pas</probe>
      <probe kind="ok" note="a un test">MUST · le statut d'une réservation ne va que vers l'avant</probe>
      <probe kind="no" note="aucune vérification">MUST · sans confirmation, une réservation se ferme au bout de 15 minutes</probe>
      <probe kind="eye" note="une personne regarde">SHOULD · la confirmation arrive par le même canal</probe>
      <cov t="MUST couverts" value="67">2 / 3</cov>
    </b-probe-panel>
    <rule>chaque MUST a besoin de sa propre vérification</rule>
    <rule>un MUST sans vérification est une lacune</rule>
    <rule>vert ne veut pas dire correct</rule>
  </b-probe-check>
  <b-why align="left">Comment lire l'image. À gauche, Kubernetes : la sonde a reçu la réponse « 200 : fonctionne » et est verte, mais les commandes ne sont pas traitées, donc la sonde n'a pas vérifié l'essentiel. À droite, les spécifications, avec une réservation de salle de réunion : trois exigences MUST et une SHOULD. Deux MUST sont couverts par des tests (les réservations ne se chevauchent pas, le statut ne va que vers l'avant). Le troisième, « sans confirmation, une réservation se ferme au bout de 15 minutes », n'est vérifié par personne. Une personne relit la SHOULD sur le canal. 2 MUST sur 3 sont couverts, soit 67 %. Les trois règles sous le schéma : chaque MUST a sa propre vérification ; un MUST sans vérification compte comme une lacune à combler ; un résultat vert ne signifie pas encore que tout est correct.</b-why>
  <b-cap>Quelles sondes existent et ce qu'elles vérifient : <a href="https://kubernetes.io/docs/concepts/configuration/liveness-readiness-startup-probes/" target="_blank" rel="noopener">Kubernetes : sondes</a>.</b-cap>
  <b-finding>
    <ex>La sonde répond « 200 » alors que les commandes sont bloquées, et les tests de réservation sont verts alors que personne ne vérifie la règle des 15 minutes.</ex>
    <gen>Une vérification ne confirme que ce qui y est écrit et ne dit rien du reste. La fiche d'agrégat est donc comparée aux vérifications : un MUST sans vérification est une lacune, pas une exigence satisfaite.</gen>
    <do>Passez en revue les MUST de votre dictionnaire et repérez ceux qui n'ont pas de test. Transformez chacun en tâche, ou rétrogradez-le délibérément en SHOULD.</do>
  </b-finding>
</b-chapter>
<b-chapter id="env" title="L'environnement décide si la boucle se ferme" icon="terminal-screen">
  <b-why align="left">La boucle ne se ferme que si l'acteur dispose de tout ce qu'il faut pour comparer. Un contrôleur Kubernetes fonctionne parce que le cluster lui donne accès à tout ce dont il a besoin. Pour un agent, cet environnement s'appelle le harness (le harnais de l'agent) : le cadre dans lequel il travaille, avec des programmes, des permissions et des vérifications.</b-why>
  <b-env-caps>
    <side icon="hub" sw="1.6" t="Cluster Kubernetes">où vit le contrôleur</side>
    <side icon="terminal-screen" sw="1.8" t="Harness">où vit l'agent</side>
    <cap icon="play" t="Exécuter le code">l'agent devine comment le programme fonctionne</cap>
    <cap icon="flask" t="Tests">rien pour vérifier un MUST</cap>
    <cap icon="log-lines" t="Logs">impossible de voir ce qui a cassé exactement</cap>
    <cap icon="database" t="Données de test">les vérifications tournent sur une base vide</cap>
    <cap icon="plug" t="Services via MCP">les intégrations sont vérifiées à l'aveugle</cap>
    <cap icon="shield-check" t="Sandbox et permissions">trop risqué de laisser l'agent agir</cap>
  </b-env-caps>
  <b-cta href="/blog/ai-in-code-harness-and-tools/" k="Article à part" t="Choisir l'environnement : comparaison des harness" icon="terminal-screen" sw="1.8">Claude Code, Codex, Cursor, Hermes et le chat sur une seule carte</b-cta>
  <b-why align="left">Les six capacités de l'image sont ce dont un agent a besoin pour fermer la boucle, et ce qui se passe sans chacune. Sans exécution du code, l'agent devine comment le programme fonctionne. Sans tests, un MUST ne peut pas être vérifié. Sans logs, on ne voit pas ce qui a cassé exactement. Sans données de test, la vérification tourne sur une base vide et ne montre rien. Sans services via MCP, les intégrations sont vérifiées à l'aveugle. Sans bac à sable (sandbox, un endroit isolé où l'on peut essayer et casser sans risque), il est effrayant de laisser l'agent agir. Si une capacité manque, la boucle reste ouverte à cet endroit.</b-why>
  <b-finding>
    <ex>Le contrôleur Kubernetes fonctionne parce que le cluster lui donne une API, des nœuds et des sondes. Pour la même boucle, l'agent a besoin d'exécuter du code, de tests, de logs, de données, de services et d'un bac à sable.</ex>
    <gen>Le dictionnaire fixe l'état désiré, mais seul celui qui peut exécuter et mesurer le code peut le mettre en conformité avec cet état. Ce que l'environnement n'offre pas, l'agent ne peut pas le vérifier, et la boucle reste ouverte à cet endroit.</gen>
    <do>Repérez lesquelles des six capacités votre agent possède. Pour chacune qui manque, décidez de l'ajouter au harness ou de changer de harness.</do>
  </b-finding>
</b-chapter>
<b-chapter id="faq" icon="chat" title="Questions fréquentes">
  <b-faq-cards>
    <q t="Qu'est-ce qu'une boucle de réconciliation pour les spécifications ?">Une boucle où une personne change l'état désiré, la spec, où l'agent compare le code à celle-ci et le met en conformité, et où les tests mesurent le résultat. C'est ainsi que fonctionne un contrôleur Kubernetes.</q>
    <q t="Pourquoi des tests au vert ne suffisent-ils pas ?">Un test ne confirme que ce qui y est écrit. Chaque exigence MUST a donc besoin de sa propre vérification.</q>
    <q t="De quoi l'environnement de l'agent a-t-il besoin pour que la boucle se ferme ?">De l'exécution du code, de tests, de logs, de données, de services et d'un bac à sable. Ce que l'environnement n'offre pas, l'agent ne peut pas le vérifier.</q>
    <q t="Que change la personne dans cette boucle ?">Uniquement l'état désiré, la spec. Toute modification devient aussitôt du travail pour l'agent.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="À lire ensuite">
  <b-links cols="3">
    <item href="/blog/specs-by-aggregates/" k="État désiré" t="Spécifications par agrégats">dictionnaire, exigences RFC et contextes</item>
    <item href="/blog/harness-driven-development/" k="Boucle d'erreurs" t="Harness-Driven Development">comment les erreurs de l'agent deviennent des règles</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="Environnement" t="Comparaison des harness">où l'agent travaille et ce qu'il voit</item>
  </b-links>
</b-chapter>
<b-footer compact>L'exemple de réservation est inventé. Les termes et les approches suivent les sources liées sous les schémas.</b-footer>
</b-post>
