---
title: En quoi la vérification de modèles diffère des tests : un test vérifie un scénario, un modèle vérifie tous les ordres d'actions (Quint, QUnit et TLA+)
date: 2026-10-25
updated: 2026-11-13
description: Un test vérifie un scénario auquel vous avez pensé, la vérification de modèles essaie tous les ordres d'actions. Ce que détectent QUnit, Jest, Vitest, et ce que détectent Quint, TLA+, Alloy.
tags: IA, spécifications, Quint, TLA+, Alloy, QUnit, Jest, Vitest, tests, vérification formelle
category: specs
layout: wide
mentions: Quint, QUnit, Jest, Vitest, TLA+, Alloy, Apalache, model checking, formal verification, Quint vs QUnit, test framework
toc: names=Deux noms | tests=Moteurs de test | tla=TLA+ et Alloy | choose=Que choisir | together=Ensemble | faq=FAQ | next=Pour aller plus loin
---

Un test vérifie un scénario auquel vous avez pensé, tandis que la vérification de modèles essaie tous les ordres d'actions et trouve une violation de règle que personne n'avait imaginée. Les frameworks de test comme QUnit, Jest et Vitest vérifient du code terminé sur des exemples. Quint et TLA+ vérifient les règles d'un système avant même que le code existe, y compris le code d'un agent IA.

<b-post series="harness">
<b-art names="quint-vs-tests-and-tla/names" wide/>

<b-chapter id="names" icon="swap" title="En quoi Quint diffère de QUnit : deux noms qui se ressemblent">
  <b-why align="left">[QUnit](/materials/glossary/qunit/) est un moteur de tests JavaScript, de la même famille que [Jest](/materials/glossary/jest/) et [Vitest](/materials/glossary/vitest/). On écrit une fonction, puis un test avec une entrée et une réponse attendue, et le moteur dit si elles concordent. Quint est un langage pour décrire comment un système doit se comporter. Le programme essaie lui-même tous les coups possibles et cherche ceux où une règle se brise. La confusion vient du nom, alors que, sur le fond, ce sont des programmes de classes différentes. Une comparaison des moteurs de test eux-mêmes se trouve dans l'article [Jest, Vitest et QUnit](/blog/jest-vs-vitest-vs-qunit/).</b-why>
  <b-why align="left">À quoi ressemble un test QUnit. Il prend une fonction terminée, par exemple l'addition, lui donne un et deux et compare la réponse à trois : `assert.equal(add(1, 2), 3)`, un exemple du site de QUnit<b-proof href="https://qunitjs.com/" quote="A Quick Example"/>. Si la réponse est juste, le test passe. Tout ce que le test sait du monde, c'est l'entrée et la réponse attendue que vous avez choisies à l'avance.</b-why>
  <b-why align="left">Un modèle Quint est construit autrement : il n'y a ni fonction ni réponse. On décrit les états dans lesquels le système peut se trouver, les actions qui le font passer d'un état à l'autre et les règles qui doivent toujours tenir. Quint exécute lui-même ce modèle, le simule et le vérifie avant la livraison du code<b-proof href="https://quint-lang.org/" quote="Write specs you can run, simulate, and verify before shipping code."/>. Peu importe donc que le code soit écrit : il vérifie l'intention, pas l'implémentation.</b-why>
  <b-vs-grid>
    <h></h>
    <h>QUnit (moteur de test)</h>
    <h>Quint (langage de modélisation)</h>
    <c>**Ce que c'est**</c>
    <c>un moteur de tests de code JavaScript, comme Jest et Vitest</c>
    <c>un langage de règles, le programme essaie lui-même tous les coups possibles</c>
    <c>**Ce qu'il vérifie**</c>
    <c>qu'une fonction terminée renvoie la bonne réponse pour des entrées données</c>
    <c>que le système décrit n'atteint jamais un état interdit, même dans des combinaisons auxquelles personne n'a pensé</c>
    <c>**Ce qu'il faut**</c>
    <c>du code écrit</c>
    <c>seulement une description des règles, le code peut ne pas exister</c>
    <c>**Exemple**</c>
    <c>un test qu'une fonction d'analyse de date renvoie la bonne date</c>
    <c>un modèle qui a trouvé qu'un plantage en pleine écriture laisse un enregistrement sans trace</c>
    <c>**Ce qui est difficile**</c>
    <c>imaginer des entrées</c>
    <c>énoncer les règles de façon à refléter la réalité</c>
  </b-vs-grid>
  <b-why align="left">Le tableau se lit mieux ligne par ligne. La ligne « Ce qu'il vérifie » montre la différence principale : un test répond à « cette fonction marche-t-elle correctement sur ces données », un modèle répond à « une situation que les règles interdisent est-elle possible, tout simplement ». Un test est limité par ce que vous avez imaginé. Un modèle est limité par ce que vous y avez mis.</b-why>
  <b-finding>
    <ex>QUnit vérifie du code déjà écrit, alors que Quint vérifie une intention qui n'est peut-être pas encore dans le code.</ex>
    <gen>QUnit, Jest et Vitest ne remplacent donc pas Quint, ni l'inverse : ils répondent à des questions différentes.</gen>
    <do>Si quelqu'un dit « c'est pareil que Jest », demandez ce qui est visé exactement : vérifier une fonction ou vérifier des règles.</do>
  </b-finding>
</b-chapter>

<b-chapter id="tests" icon="flask" title="Quint ou Jest et Vitest : ce que vérifie un test et ce que vérifie un modèle">
  <b-art names="quint-vs-tests-and-tla/when" wide/>
    <b-why align="left">Un moteur de test trouve une erreur sur les entrées auxquelles vous avez pensé. Si vous n'avez pas pensé à deux administrateurs en même temps, aucun test à ce sujet n'est écrit, et l'erreur reste. Un modèle fonctionne autrement : il construit lui-même des combinaisons d'étapes, y compris celles auxquelles personne n'a pensé, et montre la première où une règle s'est brisée.</b-why>
  <b-vs-grid>
    <h></h>
    <h>Moteur de test</h>
    <h>Quint</h>
    <c>**Ce qu'il trouve**</c>
    <c>une erreur sur les entrées auxquelles vous avez pensé</c>
    <c>une erreur dans une combinaison d'étapes à laquelle personne n'a pensé</c>
    <c>**Quand il est nécessaire**</c>
    <c>le code existe déjà</c>
    <c>le code n'est pas encore écrit ou n'existe pas du tout</c>
    <c>**Point faible**</c>
    <c>ne voit pas ce à quoi vous n'avez pas pensé</c>
    <c>un modèle peut ne pas correspondre à la réalité, on le vérifie donc par rapport à des faits confirmés</c>
  </b-vs-grid>
  <b-why align="left">Ce qu'un test attrape bien : une erreur dans la fonction elle-même, par exemple un mauvais calcul de remise ou une mauvaise analyse de date. L'entrée est ici connue d'avance, et le test montre vite ce qui a cassé. Ce qu'un test manque : les [race conditions](/materials/glossary/race-condition/) et les autres erreurs qui n'apparaissent que dans un certain ordre d'événements. Dans des exemples pratiques, c'est ainsi qu'ont été trouvés une connexion et une déconnexion d'administrateur qui se chevauchent dans le temps, et un plantage au milieu de l'enregistrement d'une réunion. Aucune des deux actions n'est fautive seule, si bien qu'un test de chacune passe.</b-why>
  <b-why align="left">Le point faible de Quint est qu'il vérifie un modèle, pas le code. Si le modèle est décrit de façon inexacte, il prouve quelque chose sur un système imaginaire. On vérifie donc le modèle par rapport à des cas réels déjà confirmés, et l'on y garde une paire « tel quel et tel que requis ». Plus de détails dans l'[article sur les modèles](/blog/quint-models-find-races/).</b-why>
  <b-finding>
    <ex>Un test et un modèle répondent à des questions différentes, donc « lequel est meilleur » est la mauvaise question.</ex>
    <gen>Pour vérifier « deux personnes en même temps peuvent-elles casser l'ordre des actions », un moteur de test est presque inutile, et pour vérifier « la date est-elle analysée correctement », un modèle est excessif.</gen>
    <do>Pour chaque règle à vérifier, notez de quoi elle traite : les données d'entrée ou l'ordre des actions.</do>
  </b-finding>
</b-chapter>

<b-chapter id="tla" icon="scales" title="En quoi Quint diffère de TLA+ et d'Alloy">
  <b-art names="quint-vs-tests-and-tla/notation" wide/>
    <b-why align="left">TLA+ et Alloy sont des langages formels du même genre : on y décrit aussi des règles et l'on cherche leurs violations. Ils sont plus anciens que Quint et mieux couverts par les livres. Mais la notation de TLA+ est mathématique, et un débutant a besoin de temps pour la lire. Quint a été conçu comme une notation plus accessible pour la même tâche : il ressemble à du code ordinaire, et les ingénieurs sans formation en mathématiques le lisent. Une comparaison détaillée des trois langages se trouve dans l'article [TLA+, Alloy ou Quint](/blog/tla-alloy-quint-compare/).</b-why>
  <b-art names="quint-vs-tests-and-tla/engine" wide/>
  <b-why align="left">Ce que signifie « les mêmes programmes ». Quint peut être vérifié par deux programmes : TLC et Apalache<b-proof href="https://quint-lang.org/docs/model-checkers" quote="Quint specifications can be verified by two model checkers: TLC and Apalache"/>. TLC est le tout premier programme de vérification de TLA+ : il parcourt les états un par un<b-proof href="https://quint-lang.org/docs/model-checkers" quote="TLC is an explicit-state model checker"/>, et pour Quint on le lance avec <code>quint verify --backend=tlc</code><b-proof href="https://quint-lang.org/docs/model-checkers" quote="TLC (no acronym defined!) is the first model checker for TLA+, and is provided as an alternative backend for quint verify by passing the --backend=tlc flag"/>. Une telle recherche est prévisible, mais le monde doit rester petit.</b-why>
  <b-why align="left">[Apalache](/materials/glossary/apalache/) est intégré à Quint<b-proof href="https://quint-lang.org/docs/model-checkers" quote="Apalache is a symbolic model checker that is integrated with Quint tooling"/> : il traduit le modèle en conditions et interroge le solveur [Z3](/materials/glossary/z3/). Il ne peut vérifier que des enchaînements jusqu'à une longueur donnée<b-proof href="https://quint-lang.org/docs/model-checkers" quote="Apalache cannot check an arbitrary number of steps"/>, de sorte que son « ok » signifie « aucune violation dans cette longueur ». TLA+ est vérifié par les deux mêmes programmes, tandis qu'Alloy a son propre analyseur. Outre la vérification, Quint propose une simulation aléatoire rapide : elle cherche des violations par échantillonnage et ne prouve pas qu'il n'y en a pas.</b-why>
    <b-vs-grid>
    <h></h>
    <h>Quint</h>
    <h>TLA+ / Alloy</h>
    <c>**Notation**</c>
    <c>ressemble à du code ordinaire, les ingénieurs le lisent</c>
    <c>notation mathématique, un ticket d'entrée plus élevé</c>
    <c>**Ce qui le vérifie**</c>
    <c>TLC ou Apalache</c>
    <c>TLA+ : les mêmes TLC et Apalache ; Alloy : son propre analyseur</c>
    <c>**Maturité**</c>
    <c>plus jeune</c>
    <c>plus ancien, plus d'exemples</c>
  </b-vs-grid>
  <b-why align="left">Chacun des trois langages repose sur sa propre idée. [TLA+](/materials/glossary/tla-plus/) est construit sur la pensée de Leslie Lamport selon laquelle la façon la plus précise de décrire un système est la mathématique simple<b-proof href="https://lamport.azurewebsites.net/tla/tla.html" quote="the best way to describe things precisely is with simple mathematics"/>. [Alloy](/materials/glossary/alloy/) décrit des structures évolutives et fournit un programme pour les explorer<b-proof href="https://alloytools.org/about.html" quote="a language for describing evolving structures and a tool for exploring them"/>. [Quint](/materials/glossary/quint/) propose la même tâche dans une notation que les ingénieurs comprennent : la description peut être exécutée, simulée et vérifiée avant la livraison du code<b-proof href="https://quint-lang.org/" quote="Write specs you can run, simulate, and verify before shipping code."/>.</b-why>
  <b-art names="quint-vs-tests-and-tla/maturity" wide/>
  <b-why align="left">La maturité compte quand il faut de lourdes preuves : grands systèmes, garanties strictes pour des protocoles distribués. La première version du langage Alloy est apparue en 1997<b-proof href="https://en.wikipedia.org/wiki/Alloy_(specification_language)" quote="The first version of the Alloy language appeared in 1997"/>. TLA+ a été créé par Leslie Lamport<b-proof href="https://en.wikipedia.org/wiki/TLA%2B" quote="TLA+ is a formal specification language developed by Leslie Lamport"/>, et d'après Wikipédia, le langage date de 1999. Le vérificateur Apalache a été lancé en 2015, et le dépôt de Quint a été créé en 2021, d'après GitHub. TLA+ a donc environ 27 ans d'histoire et Quint environ cinq.</b-why>
  <b-why align="left">Pendant ces années, TLA+ a accumulé des livres, des cours et des récits de systèmes réels, alors que Quint en a moins. Mais le langage évolue vite : des modifications ont été poussées dans le dépôt du projet la veille de la date de cet article<b-proof href="https://github.com/informalsystems/quint" quote="executable specification language with delightful tooling"/>. Pour des règles de produit comme « un enregistrement privé n'atteint jamais le stockage partagé », la profondeur de preuve est moins souvent nécessaire, et la lisibilité compte davantage.</b-why>
  <b-finding>
    <ex>Quint donne la même tâche et la même classe de vérifications dans une notation plus lisible, au prix d'une maturité moindre.</ex>
    <gen>Pour des règles de produit, c'est un compromis raisonnable, car les règles sont lues et discutées par des personnes sans formation en mathématiques, et les modèles s'écrivent plus facilement avec un agent IA.</gen>
    <do>Si vous avez besoin de lourdes preuves, transposez le modèle en TLA+ : les idées et les règles restent les mêmes.</do>
  </b-finding>
</b-chapter>

<b-chapter id="choose" icon="target" title="Que choisir : Quint, tests ou TLA+">
  <b-art names="quint-vs-tests-and-tla/choose" wide/>
  <b-rules cols="3">
    <rule icon="flask" t="Une fonction terminée">Vérifier qu'une fonction renvoie la bonne réponse pour des entrées données : un moteur de test, QUnit, Jest ou Vitest</rule>
    <rule icon="workflow" t="Ordre des actions">Trouver une combinaison d'étapes où une règle de produit se brise, même si le code n'existe pas encore : Quint</rule>
    <rule icon="scales" t="Lourdes preuves">Garanties strictes pour un grand système distribué : TLA+, avec plus d'expérience et d'exemples</rule>
  </b-rules>
  <b-why align="left">Le choix dépend de la question. Si la question est « cette fonction marche-t-elle correctement », prenez un test. Si la question est « une règle peut-elle se briser dans une certaine séquence d'événements », prenez un modèle. S'il faut des garanties au niveau d'un protocole distribué, prenez TLA+ et prévoyez du temps pour l'apprendre.</b-why>
  <b-finding>
    <ex>Trois options répondent à trois questions différentes, et aucune ne remplace une autre.</ex>
    <gen>Pour une logique de produit avec des agents et plusieurs participants, il faut le plus souvent à la fois des tests et Quint.</gen>
    <do>Notez trois questions sur votre produit et placez en face de chacune l'option adaptée à l'aide du tableau ci-dessus.</do>
  </b-finding>
</b-chapter>

<b-chapter id="together" icon="link" title="Comment ils fonctionnent ensemble">
  <b-why align="left">En pratique, tests et modèles vont de pair. Un test protège une fonction précise contre la casse lors des modifications. Un modèle protège une règle qui traverse plusieurs fonctions et dépend de l'ordre des événements. Quand un modèle trouve un enchaînement d'étapes, il en sort un court test de régression : il échoue sur l'ancien code et passe sur le code corrigé.</b-why>
  <b-why align="left">Le modèle transmet donc aux tests ce qu'il a trouvé, et les tests le maintiennent dans le code. Un récit détaillé des découvertes, de la paire « tel quel et tel que requis » et de la vérification des vérifications se trouve dans l'[article principal sur Quint](/blog/quint-models-find-races/), et les frontières de contexte pour lesquelles les modèles sont écrits sont traitées dans l'article sur les [agents par contexte](/blog/agents-per-bounded-context/).</b-why>
  <b-finding>
    <ex>Un modèle trouve un enchaînement d'étapes, et un test le fixe dans le code pour que l'erreur ne revienne pas.</ex>
    <gen>Le résultat est un binôme : le modèle cherche l'inconnu, le test garde le trouvé.</gen>
    <do>Transformez le prochain enchaînement d'étapes trouvé en court test et placez-le à côté des autres.</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="FAQ">
  <b-faq-cards>
    <q t="En quoi Quint diffère-t-il de QUnit ?">QUnit exécute des tests de code JavaScript terminé, tandis que Quint décrit les règles d'un système et essaie lui-même les ordres d'actions. Les noms se ressemblent, mais ce sont des programmes de natures différentes.</q>
    <q t="En quoi Quint diffère-t-il de TLA+ ?">Ils décrivent la même chose et diffèrent par la notation : Quint ressemble à du code ordinaire, TLA+ utilise des formules. Une comparaison détaillée des trois langages se trouve dans l'article « TLA+, Quint ou Alloy ».</q>
    <q t="Que choisir : Quint, Jest ou TLA+ ?">Si la question est de savoir si une fonction marche correctement, prenez un test. Si c'est de savoir si une règle peut se briser dans une certaine séquence d'événements, prenez Quint ; pour de lourdes preuves sur un système distribué, on prend TLA+.</q>
    <q t="Peut-on utiliser Quint avec des tests ?">Oui, ils se complètent. Un modèle trouve l'enchaînement d'étapes où une règle se brise, et un court test le fixe dans le code pour que l'erreur ne revienne pas.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Pour aller plus loin">
  <b-links>
    <item href="/blog/jest-vs-vitest-vs-qunit/" k="Comparaison" t="Vitest ou Jest, et quand QUnit suffit">Quel framework de test JavaScript choisir</item>
    <item href="/blog/tla-alloy-quint-compare/" k="Comparaison" t="TLA+, Alloy ou Quint">En quoi diffèrent les langages de spécification formelle</item>
    <item href="/blog/quint-models-find-races/" k="Modèles" t="Comment trouver une race condition : un modèle Quint">Modèles formels en Quint : découvertes, paires de modèles, vérification des vérifications</item>
    <item href="/blog/agents-per-bounded-context/" k="Agents" t="De combien d'agents IA on a besoin">Un agent par contexte borné</item>
  </b-links>
</b-chapter>
<b-footer>Faits : au 25 octobre 2026, documentation de Quint, de TLA+ et d'Alloy. Le choix dépend de l'équipe et de la tâche.</b-footer>
</b-post>
