---
title: Serveur MCP et agent IA pour 1C : comment laisser Claude Code, Codex ou Cursor entrer dans la base sans la casser
date: 2026-10-12
updated: 2026-11-13
description: Un serveur MCP pour 1C:Enterprise donne à un agent IA (Claude Code, Codex ou Cursor) accès au code de la configuration et aux données de la base. Comment le connecter en 3 étapes, ce qui casse en pratique, comment séparer la lecture de l'écriture et vérifier les résultats.
tags: IA, agents, MCP, 1C, permissions, sécurité, Claude Code, Codex, Cursor
category: harness
layout: wide
mentions: Model Context Protocol, MCP, 1C:Enterprise, AI agent, Claude Code, Codex, Cursor, permissions, prompt injection
toc: what=Ce que c'est | specifics=Particularités de 1C | breaks=Où ça casse | servers=Serveurs | cases=Ce qui casse | scheme=Schéma | rights=Droits | check=Vérifications | agents=Agents | start=Par où commencer | faq=Questions | next=À lire ensuite
---

Pour laisser Claude Code, Codex ou Cursor entrer dans une base 1C sans la casser, connectez l'agent IA via un serveur MCP pour 1C — un pont vers le code de la configuration et les données de la base — et séparez les accès. L'agent ne fait que lire la base de production sous un utilisateur sans droit d'écriture, apporte les modifications dans une copie de test, et une personne transfère les changements en production via le dépôt après relecture. Ci-dessous : quels serveurs existent, ce qui casse en pratique, l'échelle des droits et comment vérifier les résultats. Le fonctionnement général de MCP est traité dans [MCP pour un agent IA](/blog/mcp-agent-access/).

<b-post series="harness">
<b-chapter id="what" icon="plug" title="Ce qu'est un serveur MCP pour 1C">
<b-why align="left"><a href="/materials/glossary/mcp/">MCP</a> est une prise commune entre un agent et un système. Pour 1C, c'est un <a href="/materials/glossary/mcp-server/">serveur MCP</a> qui donne à l'agent le code et les métadonnées de la configuration, les données de la base, l'aide de la plateforme ou des vérifications. Beaucoup de serveurs en combinent plusieurs. Cela fonctionne comme pour n'importe quel autre système : 1C est un <a href="/blog/mcp-agent-access/#ours">contexte de plus</a>, comme Jira ou GitLab, avec la même prise et les mêmes agents. La seule part propre à 1C est la façon dont le serveur atteint 1C : par un export, l'IDE 1C, une extension de configuration ou un traitement externe.</b-why>
<b-lane title="Ce que donne un serveur MCP" color="accent">
<b-scene names="mcp-1c/servers"/>
</b-lane>
<b-table-plain>
<table><thead><tr><th></th><th>Code et métadonnées</th><th>Données de la base</th></tr></thead><tbody><tr><td>Ce que voit l'agent</td><td>modules, métadonnées, formulaires</td><td>référentiels, documents, registres, rapports</td></tr><tr><td>D'où cela vient</td><td>un export de la configuration ou 1C:EDT</td><td>la base 1C via une extension de configuration ou un traitement externe</td></tr><tr><td>À quoi cela sert</td><td>écrit le code d'après la vraie configuration, invente moins</td><td>répond avec des chiffres de la base, analyse les données</td></tr><tr><td>Risque principal</td><td><b-tag-inline kind="no">modifier la mauvaise configuration</b-tag-inline></td><td><b-tag-inline kind="no">écritures en production, données d'autrui</b-tag-inline></td></tr></tbody></table>
</b-table-plain>
<b-finding>
  <ex k="Code">L'agent cesse d'inventer des méthodes et des attributs qui ne sont pas dans la configuration.</ex>
  <gen k="Données">L'agent répond à partir de la base, ce qui veut dire qu'il peut aussi la modifier. C'est là que des règles d'accès sont nécessaires.</gen>
  <do k="À faire">Commencez par le code : c'est plus sûr. N'activez l'accès aux données que d'après le schéma ci-dessous, même si le serveur sait faire les deux.</do>
</b-finding>
</b-chapter>
<b-chapter id="specifics" icon="form" title="En quoi 1C diffère pour un agent IA">
<b-why align="left">Le vibe coding dans 1C fonctionne autrement que dans les langages ordinaires : le programme vit dans la base et dans des concepteurs visuels, et le code n'en est qu'une partie. Le schéma montre le chemin du programme depuis l'ordinateur de l'<a href="/materials/glossary/ai-agent/">agent IA</a> jusqu'à la production dans <a href="/materials/glossary/gitlab/">GitLab</a> et dans 1C.</b-why>
<b-lane title="Chemin du programme : local, test, production" color="accent">
<b-scene names="mcp-1c/pipeline"/>
</b-lane>
<b-rules-fixed cols="3" top="12" sw="1.8">
  <rule icon="monitor-hm" t="Local">Dans GitLab, l'<a href="/materials/glossary/ai-agent/">agent</a> modifie des fichiers et lance aussitôt les tests. Dans 1C, il modifie l'export et ne peut le vérifier qu'après l'avoir chargé dans une base, locale ou de test.</rule>
  <rule icon="git-fork" t="Versions">Dans GitLab, les versions vivent dans un dépôt git avec une <a href="/materials/glossary/checks/">vérification</a>. Dans 1C, elles vivent dans le dépôt de configuration ; git existe mais reste facultatif.</rule>
  <rule icon="cylinder-hm" t="Test et production">Dans GitLab, le programme et les données sont séparés. Dans 1C, chaque environnement a sa propre base qui contient les deux : mettre à jour la production, c'est mettre à jour la base de production.</rule>
</b-rules-fixed>
</b-chapter>
<b-chapter id="breaks" icon="alert" title="Où un agent IA casse dans 1C, et pourquoi">
<b-why align="left">Choisissez un numéro pour voir ce qui casse et ce qui aide, juste sous le schéma. Cinq particularités sont les plus discutées dans les chats de développeurs 1C, la sixième concerne MCP.</b-why>
<b-lane title="Ce qui casse et où" color="warn">
<b-scene names="mcp-1c/breaks"/>
<b-pick-tabs id="brk" tone="warn">
  <tab t="Faible en 1C">
    <b-pick-cell k="Particularité" t="Les modèles connaissent mal le langage 1C et sa bibliothèque standard"/>
    <b-pick-cell k="Ce qui casse" tone="warn">méthodes inventées, syntaxe SQL au lieu du langage de requêtes 1C</b-pick-cell>
    <b-pick-cell k="Ce qui aide" tone="accent">l'aide de la plateforme via MCP, 2 à 3 exemples tirés de la configuration de l'éditeur elle-même</b-pick-cell>
  </tab>
  <tab t="Fichiers ≠ base">
    <b-pick-cell k="Particularité" t="Les fichiers de service ne se modifient pas comme du texte"/>
    <b-pick-cell k="Ce qui casse" tone="warn">le projet dérive par rapport à la base, le chargement se bloque pendant des heures</b-pick-cell>
    <b-pick-cell k="Ce qui aide" tone="accent">modifications uniquement via le serveur MCP, écritures directes bloquées</b-pick-cell>
  </tab>
  <tab t="Formulaires à la souris">
    <b-pick-cell k="Particularité" t="Les formulaires, rapports et mises en page d'impression se construisent à la souris"/>
    <b-pick-cell k="Ce qui casse" tone="warn">l'agent ne relie pas les événements, laisse un rapport vide, la mise en page ne change pas</b-pick-cell>
    <b-pick-cell k="Ce qui aide" tone="accent">le squelette à la main, seulement le code pour l'agent ; un instantané du formulaire pour vérifier</b-pick-cell>
  </tab>
  <tab t="Chargement lent">
    <b-pick-cell k="Particularité" t="Une boucle de vérification lente"/>
    <b-pick-cell k="Ce qui casse" tone="warn">la mise à jour de la base prend des dizaines de minutes, l'agent décroche et rend compte trop tôt</b-pick-cell>
    <b-pick-cell k="Ce qui aide" tone="accent">mises à jour en arrière-plan, tests sur un serveur séparé</b-pick-cell>
  </tab>
  <tab t="Pas l'extension">
    <b-pick-cell k="Particularité" t="Une configuration d'éditeur sous support, changements dans une extension"/>
    <b-pick-cell k="Ce qui casse" tone="warn">l'agent écrit dans la configuration principale, tire des objets empruntés superflus</b-pick-cell>
    <b-pick-cell k="Ce qui aide" tone="accent">le projet d'extension nommé dans les règles de l'agent, le projet principal fermé</b-pick-cell>
  </tab>
  <tab t="Saute le test">
    <b-pick-cell k="Particularité" t="Écriture en production via MCP"/>
    <b-pick-cell k="Ce qui casse" tone="warn">une modification saute le dépôt et le test et atterrit dans les données réelles</b-pick-cell>
    <b-pick-cell k="Ce qui aide" tone="accent">production en lecture seule, écritures vers la base de test</b-pick-cell>
  </tab>
</b-pick-tabs>
</b-lane>
<b-finding>
  <ex k="Différence">Dans 1C, l'agent a besoin d'un intermédiaire : l'IDE, l'aide et une plateforme en marche. Sans eux, il modifie ce qu'il ne voit pas.</ex>
  <gen k="Taille">Les configurations d'éditeur sont énormes, avec des modules de 15 à 26 mille lignes. L'agent reçoit une recherche dans la configuration et ne lit que la partie dont il a besoin.</gen>
  <do k="À faire">Commencez par le code et les requêtes ; laissez les formulaires et les rapports à une personne tant que l'agent n'a pas montré de résultats stables.</do>
</b-finding>
</b-chapter>
<b-chapter id="servers" icon="cylinder-alt" title="Serveurs MCP gratuits pour 1C et 1C:EDT">
<b-why align="left">Il existe beaucoup de serveurs prêts à l'emploi et ils changent vite. Avant d'en connecter un, lisez quelles actions il prend en charge : lecture seule, ou écriture aussi.</b-why>
<b-source-rows wide>
  <row t="mcp-1c" note="Code et données" href="https://github.com/feenlace/mcp-1c" link="GitHub">Structure de la configuration, recherche dans le code, aide sur le langage et requêtes de données en lecture seule</row>
  <row t="1c_mcp" note="Code et données" href="https://github.com/vladimir-kharin/1c_mcp" link="GitHub">Un kit pour votre propre serveur MCP dans 1C sous forme d'extension de configuration : configuration d'emblée, données via vos propres outils</row>
  <row t="1c-mcp-toolkit" note="Données" href="https://github.com/ROCTUP/1c-mcp-toolkit" link="GitHub">Se connecte à la base via un traitement externe, sans modifier la configuration</row>
  <row t="EDT-MCP" note="Code" href="https://github.com/DitriXNew/EDT-MCP" link="GitHub">Un plugin pour 1C:EDT : l'agent travaille avec le projet via les outils de l'IDE</row>
  <row t="MCP:RSV Data" note="Données" href="https://infostart.ru/1c/articles/2720241/" link="Infostart">Une extension pour les données et les métadonnées de n'importe quelle configuration : lecture seule, et seulement ce que l'utilisateur courant peut voir</row>
  <row t="bsl-ai-toolkit" note="Code" href="https://github.com/vgtitov/bsl-ai-toolkit" link="GitHub">Règles, skills et serveurs pour que l'agent travaille à partir de votre code</row>
  <row t="1c-mcp catalog" note="Catalogue" href="https://github.com/Untru/1c-mcp" link="GitHub">Serveurs par groupe : IDE, base, code, aide, tests</row>
  <row t="1C AI Dev Tools" note="Catalogue" href="https://aitools1c.dev" link="Site web">Un catalogue de serveurs, de skills et d'intégrations pour le développement 1C avec l'IA</row>
</b-source-rows>
<b-finding>
  <ex k="Choix">Le code d'abord, les données dans un second temps, à part.</ex>
  <gen k="Vérification">La liste des outils du serveur est la liste de ce que l'agent pourra faire à la base.</gen>
  <do k="À faire">Listez les outils du serveur et marquez ceux qui modifient des données.</do>
</b-finding>
</b-chapter>
<b-chapter id="cases" icon="alert-alt" title="Ce qui casse en pratique">
<b-why align="left">Les chats ouverts de développeurs 1C décrivent des cas semblables. Ils sont racontés ici avec d'autres mots, sans noms. Ce sont des exemples tirés de la pratique : chaque cas ne peut pas être vérifié. Choisissez un cas : le schéma montre où cela s'est produit, la fiche montre pourquoi et comment se protéger.</b-why>
<b-lane title="Cas tirés de la pratique" color="warn">
<b-scene names="mcp-1c/cases"/>
<b-pick-tabs id="cs" tone="warn">
  <tab t="Production">
    <b-pick-cell k="Ce qui s'est passé" t="A cassé la base de production">L'agent a reçu un accès en écriture à la production pour aller plus vite. La modification a atterri dans la comptabilité réelle et a été annulée depuis une sauvegarde.</b-pick-cell>
    <b-pick-cell k="Pourquoi" tone="warn">Aucune base de test entre l'agent et les données réelles ; les écritures en production étaient ouvertes.</b-pick-cell>
    <b-pick-cell k="Protection" tone="accent">Production en lecture seule. L'agent écrit dans une base de test ; une personne transfère les changements après relecture.</b-pick-cell>
  </tab>
  <tab t="Une centaine de bases">
    <b-pick-cell k="Ce qui s'est passé" t="A supprimé une liste d'une centaine de bases">L'agent rangeait le serveur et a supprimé le superflu, y compris la liste des bases en exploitation.</b-pick-cell>
    <b-pick-cell k="Pourquoi" tone="warn">Un compte avec des droits d'administrateur du serveur, alors que la tâche concernait une seule base.</b-pick-cell>
    <b-pick-cell k="Protection" tone="accent">Un utilisateur distinct pour la tâche, des droits sur une seule base, pas d'administration du serveur.</b-pick-cell>
  </tab>
  <tab t="Données d'autrui">
    <b-pick-cell k="Ce qui s'est passé" t="A donné à un comptable les données du directeur">Un agent MCP répondait aux employés. Un comptable a reçu des chiffres qu'il ne devait pas voir.</b-pick-cell>
    <b-pick-cell k="Pourquoi" tone="warn">Le serveur accédait à la base sous un seul utilisateur commun aux droits complets, si bien que les rôles et restrictions de 1C ne s'appliquaient pas.</b-pick-cell>
    <b-pick-cell k="Protection" tone="accent">Se connecter en tant que la personne qui demande : ses rôles et ses restrictions au niveau des enregistrements s'appliquent alors.</b-pick-cell>
  </tab>
  <tab t="Mots de passe dans les logs">
    <b-pick-cell k="Ce qui s'est passé" t="Mots de passe et clés dans les logs">Un mot de passe de base a été transmis à l'agent directement dans la demande. Il est resté dans le journal des appels et l'historique du chat.</b-pick-cell>
    <b-pick-cell k="Pourquoi" tone="warn">Les secrets passaient dans les arguments des outils et traînaient dans des fichiers à côté du projet.</b-pick-cell>
    <b-pick-cell k="Protection" tone="accent">Secrets uniquement dans les réglages du serveur, jamais montrés à l'agent. Dossiers de clés fermés à l'agent.</b-pick-cell>
  </tab>
  <tab t="« Fait »">
    <b-pick-cell k="Ce qui s'est passé" t="« Fait », mais rien n'a changé">L'agent a ajouté un attribut et déclaré que c'était fait. En mode utilisateur, rien n'avait changé : la base n'avait pas été mise à jour après la modification.</b-pick-cell>
    <b-pick-cell k="Pourquoi" tone="warn">Le compte rendu de l'agent a été accepté sans vérifier le résultat.</b-pick-cell>
    <b-pick-cell k="Protection" tone="accent">Après une modification : mise à jour de la base, vérification des erreurs et test automatique. « Fait » seulement avec un lien vers le résultat.</b-pick-cell>
  </tab>
  <tab t="Mauvaise réponse">
    <b-pick-cell k="Ce qui s'est passé" t="Une requête sans erreur, mais une mauvaise réponse">L'agent a écrit une requête qui s'exécutait sans erreur, mais les chiffres ne correspondaient pas au rapport 1C.</b-pick-cell>
    <b-pick-cell k="Pourquoi" tone="warn">Le modèle connaît mal les registres et les périodes de 1C et écrit la requête comme pour une base ordinaire.</b-pick-cell>
    <b-pick-cell k="Protection" tone="accent">Recoupement avec le rapport standard de 1C, ou réponse via un rapport prêt plutôt qu'une requête maison.</b-pick-cell>
  </tab>
  <tab t="Données dans le cloud">
    <b-pick-cell k="Ce qui s'est passé" t="Des données personnelles sont parties dans le cloud">L'agent a reçu un export avec des passeports et des salaires, et il est parti vers un modèle dans le cloud.</b-pick-cell>
    <b-pick-cell k="Pourquoi" tone="warn">L'agent a reçu toute la base au lieu des seuls champs dont il avait besoin.</b-pick-cell>
    <b-pick-cell k="Protection" tone="accent">Anonymisation et seulement les champs nécessaires. Pour les données sensibles, un modèle dans votre périmètre.</b-pick-cell>
  </tab>
</b-pick-tabs>
</b-lane>
<b-finding>
  <ex k="Fil conducteur">Presque tous les cas portent sur les droits et les vérifications. Le modèle passe ici au second plan.</ex>
  <gen k="Cause">L'agent a reçu autant de droits qu'un administrateur, et son compte rendu a été pris au mot.</gen>
  <do k="À faire">Passez les cas en revue et marquez les protections que vous avez déjà.</do>
</b-finding>
</b-chapter>
<b-chapter id="scheme" icon="shield-check" title="Un schéma sûr">
<b-why align="left">L'agent ne fait que lire la base de production. Il écrit dans une base de test. Une personne transfère les changements en production après relecture.</b-why>
<b-lane title="Lecture séparée de l'écriture" color="accent">
<b-scene names="mcp-1c/safe-scheme"/>
<b-pick-tabs id="sf" tone="accent">
  <tab t="Lire">
    <b-pick-cell k="Étape" t="L'agent lit">Données et code de production, pour les réponses et l'analyse.</b-pick-cell>
    <b-pick-cell k="Où" tone="accent">Production, sous son propre utilisateur 1C avec un rôle en lecture seule.</b-pick-cell>
    <b-pick-cell k="Pourquoi">L'agent voit les données réelles mais ne peut pas les modifier.</b-pick-cell>
  </tab>
  <tab t="Écrire">
    <b-pick-cell k="Étape" t="L'agent écrit">Code, métadonnées et documents.</b-pick-cell>
    <b-pick-cell k="Où" tone="accent">Une base de test ou un <a href="/materials/glossary/sandbox/">bac à sable (sandbox)</a> avec une copie de la production.</b-pick-cell>
    <b-pick-cell k="Pourquoi">Une erreur reste dans la base de test et n'atteint jamais la comptabilité.</b-pick-cell>
  </tab>
  <tab t="Vérifier et transférer">
    <b-pick-cell k="Étape" t="Vérifier et transférer">Tests automatiques, puis une personne relit les changements.</b-pick-cell>
    <b-pick-cell k="Où" tone="accent">Les changements vont dans le dépôt, la production est mise à jour depuis lui.</b-pick-cell>
    <b-pick-cell k="Pourquoi">Seuls les changements vérifiés atteignent la production, et chacun a une version.</b-pick-cell>
  </tab>
</b-pick-tabs>
</b-lane>
<b-finding>
  <ex k="Schéma">L'erreur de l'agent reste dans la base de test et n'atteint jamais la comptabilité.</ex>
  <gen k="Coût">Il faut une base de test à côté de la production. C'est moins cher qu'une seule restauration depuis une sauvegarde.</gen>
  <do k="À faire">Mettez en place un <a href="/materials/glossary/test-stand/">banc de test</a> avec une copie de la base avant de connecter le serveur de données.</do>
</b-finding>
</b-chapter>
<b-chapter id="rights" icon="key" title="Droits : une échelle d'accès">
<b-why align="left">Les droits de l'agent se construisent par étapes : chacune s'ouvre une fois que la précédente s'est déroulée sans surprise. <a href="/materials/glossary/permissions/">Ce que sont les permissions d'un agent</a></b-why>
<b-lane title="Échelle d'accès" color="accent">
<b-scene names="mcp-1c/rights"/>
<b-pick-tabs id="rt" tone="accent">
  <tab t="Lire le code">
    <b-pick-cell k="Ce que l'agent peut faire" t="Lire le code">Modules, métadonnées, formulaires.</b-pick-cell>
    <b-pick-cell k="Quand l'ouvrir" tone="accent">Tout de suite.</b-pick-cell>
    <b-pick-cell k="Comment le régler">Un serveur ayant accès à l'export de la configuration ou à un projet EDT, sans accès à la base.</b-pick-cell>
  </tab>
  <tab t="Lire les données">
    <b-pick-cell k="Ce que l'agent peut faire" t="Lire les données">Requêtes et rapports sous son propre utilisateur 1C.</b-pick-cell>
    <b-pick-cell k="Quand l'ouvrir" tone="accent">Sur une copie de la base, une fois que la lecture du code n'a causé aucune surprise.</b-pick-cell>
    <b-pick-cell k="Comment le régler">Un utilisateur 1C avec un rôle en lecture seule ; l'outil « exécuter n'importe quel code » désactivé.</b-pick-cell>
  </tab>
  <tab t="Écrire en test">
    <b-pick-cell k="Ce que l'agent peut faire" t="Écrire en test">Code, métadonnées, documents.</b-pick-cell>
    <b-pick-cell k="Quand l'ouvrir" tone="accent">Une fois que des tests automatiques existent.</b-pick-cell>
    <b-pick-cell k="Comment le régler">Une base de test distincte ; une vérification des erreurs et des tests automatiques après chaque modification.</b-pick-cell>
  </tab>
  <tab t="Écrire en production">
    <b-pick-cell k="Ce que l'agent peut faire" t="Écrire en production">Rien : cette étape est fermée à l'agent.</b-pick-cell>
    <b-pick-cell k="Quand l'ouvrir" tone="accent">Jamais — une personne seulement.</b-pick-cell>
    <b-pick-cell k="Comment le régler">Une personne transfère les changements via le dépôt après relecture.</b-pick-cell>
  </tab>
</b-pick-tabs>
</b-lane>
<b-rules-fixed cols="2" sw="1.8">
  <rule icon="user" t="Son propre utilisateur 1C">L'agent se connecte comme un utilisateur distinct ou comme la personne qui a demandé. Les droits habituels et les restrictions au niveau des enregistrements s'appliquent alors.</rule>
  <rule icon="eye-wide-hm" t="Un rôle en lecture seule">Pour la production, un rôle sans droit d'écrire ni de comptabiliser des documents. Exemple : dans mcp-1c, les requêtes à la base sont en lecture seule par conception.</rule>
  <rule icon="prompt" t="Pas de code arbitraire">Désactivez l'outil « exécuter n'importe quel code » en production : il contourne tous les droits.</rule>
  <rule icon="lock-alt" t="Secrets à part">Mots de passe et clés vivent dans les réglages du serveur. Ils ne sont jamais montrés à l'agent ni transmis dans les requêtes.</rule>
</b-rules-fixed>
<b-finding>
  <ex k="Données comme commandes">Un commentaire dans un document ou un e-mail dans la base peut contenir une instruction destinée à l'agent. C'est de l'<a href="/materials/glossary/prompt-injection/">injection de prompt</a>, et les droits en limitent les dégâts.</ex>
  <gen k="Règle">L'agent reçoit les droits d'un utilisateur ordinaire. Ce que l'utilisateur ne peut pas faire, l'agent ne le peut pas non plus.</gen>
  <do k="À faire">Comment distinguer les données des commandes est traité <a href="/blog/data-plane-control-plane-prompt-injection/">dans l'article sur l'injection de prompt</a>.</do>
</b-finding>
</b-chapter>
<b-chapter id="check" icon="check-square" title="Vérifier le résultat">
<b-why align="left">Le « fait » de l'agent est une affirmation. Des vérifications et un <a href="/materials/glossary/human-in-the-loop/">humain dans la boucle</a> la confirment.</b-why>
<b-lane title="Quatre vérifications avant un résultat" color="accent">
<b-scene names="mcp-1c/checks"/>
<b-pick-tabs id="ck" tone="accent">
  <tab t="Erreurs de l'IDE">
    <b-pick-cell k="Vérification" t="Vérification des erreurs de l'IDE"/>
    <b-pick-cell k="Ce qu'elle attrape" tone="warn">Syntaxe, méthodes et attributs inexistants.</b-pick-cell>
    <b-pick-cell k="Comment la lancer" tone="accent">Après chaque modification ; l'agent montre le résultat de la vérification dans son compte rendu.</b-pick-cell>
  </tab>
  <tab t="Tests automatiques">
    <b-pick-cell k="Vérification" t="Tests automatiques"/>
    <b-pick-cell k="Ce qu'elle attrape" tone="warn">Un scénario échoue, un formulaire ne s'ouvre pas.</b-pick-cell>
    <b-pick-cell k="Comment la lancer" tone="accent">Tests de scénario et tests unitaires sur la base de test à chaque cycle.</b-pick-cell>
  </tab>
  <tab t="Recoupement avec 1C">
    <b-pick-cell k="Vérification" t="Recoupement avec un rapport 1C"/>
    <b-pick-cell k="Ce qu'elle attrape" tone="warn">Les chiffres de l'agent ne correspondent pas à la comptabilité.</b-pick-cell>
    <b-pick-cell k="Comment la lancer" tone="accent">Même période et même société dans le rapport standard ; un écart signifie stop.</b-pick-cell>
  </tab>
  <tab t="Une personne">
    <b-pick-cell k="Vérification" t="Une personne relit les changements"/>
    <b-pick-cell k="Ce qu'elle attrape" tone="warn">Modifications au mauvais endroit, objets empruntés superflus, outils contournés.</b-pick-cell>
    <b-pick-cell k="Comment la lancer" tone="accent">Comparer les changements avant le transfert : l'extension seulement, les objets nécessaires seulement.</b-pick-cell>
  </tab>
</b-pick-tabs>
</b-lane>
<b-finding>
  <ex k="Erreur courante">L'agent modifie les fichiers de configuration en contournant les outils de l'IDE, et le projet dérive par rapport à la base.</ex>
  <gen k="Règle">Chaque « fait » s'appuie sur une vérification ou un lien vers le résultat.</gen>
  <do k="À faire">Ajoutez aux règles de l'agent : après une modification, lancer la vérification des erreurs et en montrer le résultat.</do>
</b-finding>
</b-chapter>
<b-chapter id="agents" icon="prompt" title="Claude Code, Codex et Cursor pour 1C">
<b-why align="left">Un serveur MCP pour 1C se connecte à n'importe quel agent qui prend en charge MCP. Seul l'endroit de la configuration diffère.</b-why>
<b-section-h3 top="4">Connexion en 3 étapes</b-section-h3>
<b-step-chain>
  <node t="1. Choisir un serveur">Pour le code ou pour les données, dans la liste ci-dessus</node>
  <node t="2. Confier à l'agent">« Connecte le serveur MCP 1C en suivant son README »</node>
  <node t="3. Tester sur une copie">Demander la liste des outils et chercher un référentiel</node>
</b-step-chain>
<b-lane title="Où le configurer" color="accent">
<b-scene names="mcp-1c/agents"/>
<b-pick-tabs id="ag" tone="accent">
  <tab t="Claude Code">
    <b-pick-cell k="Où le configurer">la commande <code>claude mcp add</code></b-pick-cell>
    <b-pick-cell k="Pour une équipe" tone="accent"><code>.mcp.json</code> dans le dépôt</b-pick-cell>
    <b-pick-cell k="Docs"><a href="https://code.claude.com/docs/en/mcp" target="_blank" rel="noopener">MCP dans Claude Code</a></b-pick-cell>
  </tab>
  <tab t="Codex">
    <b-pick-cell k="Où le configurer"><code>~/.codex/config.toml</code> ou <code>.codex/config.toml</code> dans le projet</b-pick-cell>
    <b-pick-cell k="Pour une équipe" tone="accent"><code>.codex/config.toml</code> dans un projet de confiance</b-pick-cell>
    <b-pick-cell k="Docs"><a href="https://learn.chatgpt.com/docs/extend/mcp?surface=cli" target="_blank" rel="noopener">MCP dans Codex</a></b-pick-cell>
  </tab>
  <tab t="Cursor">
    <b-pick-cell k="Où le configurer">le fichier <code>mcp.json</code></b-pick-cell>
    <b-pick-cell k="Pour une équipe" tone="accent">une place de marché de serveurs d'équipe</b-pick-cell>
    <b-pick-cell k="Docs"><a href="https://cursor.com/docs/mcp" target="_blank" rel="noopener">MCP dans Cursor</a></b-pick-cell>
  </tab>
</b-pick-tabs>
</b-lane>
<b-finding>
  <ex k="Point commun">Les droits sont fixés par le serveur et l'utilisateur 1C. Le schéma ci-dessus fonctionne avec chacun des trois.</ex>
  <gen k="Confirmations">Gardez la confirmation activée pour les outils qui modifient des données.</gen>
  <do k="À faire">Confiez la configuration à l'agent lui-même, comme décrit <a href="/blog/mcp-agent-access/#connect">dans l'article sur MCP</a>.</do>
</b-finding>
</b-chapter>
<b-chapter id="start" icon="flag-alt" title="Par où commencer">
<b-why align="left">Trois étapes. Chacune vient après que la précédente s'est déroulée sans surprise.</b-why>
<b-lane-art names="mcp-1c/start-steps"/>
<b-finding>
  <ex k="Semaine 1">Le serveur de code et la lecture des données sur une copie de la base. Vérifiez 5 réponses de l'agent à la main.</ex>
  <gen k="Semaine 2">Écriture dans une base de test et tests automatiques. L'agent montre ce qu'il a vérifié.</gen>
  <do k="Ensuite">La production reste en lecture seule. Le transfert des changements revient à une personne.</do>
</b-finding>
</b-chapter>
<b-chapter id="faq" icon="chat" title="Questions fréquentes">
  <b-faq-cards>
    <q t="Comment connecter un agent IA à 1C ?">Via un serveur MCP pour 1C, un pont vers le code de la configuration et les données de la base. Cela fonctionne pour Claude Code, Codex et Cursor.</q>
    <q t="Comment éviter de casser la base 1C en exploitation ?">L'agent ne fait que lire la base en exploitation sous un utilisateur sans droit d'écriture, modifie dans une copie de test, et une personne transfère les changements vers la base en exploitation via le dépôt après relecture.</q>
    <q t="Quelles permissions donner à l'agent dans 1C ?">Suivre une échelle d'accès : commencer en lecture seule et élever les droits pas à pas, seulement quand la tâche l'exige.</q>
    <q t="Existe-t-il des serveurs MCP gratuits pour 1C ?">Oui, l'article présente des serveurs MCP gratuits pour 1C et 1C:EDT et ce qui y casse en pratique.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" icon="arrow-right" title="À lire ensuite">
  <b-links>
    <item href="/blog/mcp-agent-access/" k="Connexion" t="MCP pour un agent IA">comment le connecter et le confier à l'agent</item>
    <item href="/blog/data-plane-control-plane-prompt-injection/" k="Sécurité" t="Données et commandes">comment se défendre contre l'injection de prompt</item>
    <item href="/blog/mcp-scopes/" k="Portées" t="Portées de MCP">où est stockée la configuration du serveur</item>
  </b-links>
</b-chapter>
<b-footer>Les cas sont repris de discussions ouvertes entre développeurs 1C, sans noms ni citations. Ce sont des exemples tirés de la pratique, et chaque cas ne peut pas être vérifié. Les règles de protection relèvent de la pratique de l'auteur.</b-footer>
</b-post>
