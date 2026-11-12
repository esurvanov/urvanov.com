---
title: Vitest ou Jest : lequel choisir pour un projet JavaScript, et quand QUnit suffit
date: 2026-10-25
updated: 2026-11-13
description: Vitest ou Jest : configuration, lieu d'exécution des tests, écriture des vérifications. Quand choisir Vitest avec Vite, garder Jest ou prendre QUnit dans le navigateur. Tableau et FAQ.
tags: IA, tests, JavaScript, Jest, Vitest, QUnit, Vite, Jest vs Vitest, automatisation des tests
category: specs
layout: wide
mentions: Jest, Vitest, QUnit, Vite, Node.js, JavaScript, Jest vs Vitest, automated tests, test framework, snapshots, mocks, code coverage
toc: common=Ce qu'ils ont en commun | vite=Jest et Vitest | qunit=QUnit | table=Qui a quoi | choose=Que choisir | faq=FAQ | next=Pour aller plus loin
---

Vitest ou Jest : sur un projet construit avec Vite, prenez Vitest, car il réutilise la même configuration ; et si Jest fonctionne déjà, gardez-le. QUnit suffit quand les tests doivent tourner directement dans le navigateur avec presque aucune configuration. Les trois exécutent des tests JavaScript automatisés et se distinguent par l'endroit où ils vivent et par la quantité de configuration qu'ils demandent.

Cet article est né d'un autre, consacré aux [modèles formels en Quint](/blog/quint-models-find-races/) et à la vérification formelle. Les noms QUnit et Quint se ressemblent et se confondent facilement ; j'ai donc décidé d'écrire aussi à part sur les frameworks de test. La différence entre Quint et ces frameworks est traitée dans la [comparaison de Quint avec les tests et TLA+](/blog/quint-vs-tests-and-tla/).

<b-post series="harness">
<b-art names="jest-vs-vitest-vs-qunit/common" wide/>

<b-chapter id="common" icon="flask" title="Ce que Jest, Vitest et QUnit ont en commun">
  <b-why align="left">Prenons une fonction qui additionne deux nombres. Un test consigne une attente : pour un et deux, la réponse est trois. Le framework exécute la fonction, compare la réponse à celle attendue et indique si la vérification est réussie ou non. Un projet compte des centaines de tests, qui s'exécutent donc automatiquement après chaque modification : si une modification casse quelque chose qui marchait, un test échoue et cela se voit aussitôt. Les trois frameworks font exactement cela pour du code [JavaScript](/materials/glossary/javascript/), c'est-à-dire qu'ils exécutent des [tests automatisés](/materials/glossary/automated-test/).</b-why>
  <b-why align="left">Trois mots reviendront dans la description des frameworks. Un **snapshot** est une référence enregistrée d'un gros résultat, par exemple le balisage final d'une page, à laquelle on compare un nouveau résultat. Un **mock** est le remplacement temporaire de code réel par une doublure, par exemple l'envoi réel d'un e-mail, pour que le test ne sorte pas vers l'extérieur. La **couverture** est un rapport des lignes de code que les tests ont exécutées au moins une fois. Le choix entre les frameworks décide donc rarement si un projet a des tests. Il décide de la quantité de configuration à prévoir et de l'endroit où les tests s'exécutent.</b-why>
  <b-finding>
    <ex>Jest, Vitest et QUnit répondent à la même question : une fonction terminée donne-t-elle la bonne réponse pour des entrées données ?</ex>
    <gen>Ils ne vérifient ni les règles d'un système ni l'ordre des événements : pour cela, il faut des modèles tels que [Quint](/materials/glossary/quint/).</gen>
    <do>Notez ce que vous voulez vérifier : une fonction sur des entrées données, ou une règle qui traverse plusieurs fonctions.</do>
  </b-finding>
</b-chapter>

<b-chapter id="vite" icon="swap" title="Jest ou Vitest : combien d'endroits à modifier pour la configuration">
  <b-art names="jest-vs-vitest-vs-qunit/vite" wide/>
    <b-why align="left">[Jest](/materials/glossary/jest/) vise à fonctionner sans configuration sur la plupart des projets JavaScript<b-proof href="https://jestjs.io/" quote="Jest aims to work out of the box, config free, on most JavaScript projects."/>. Il comprend les projets sous Babel, TypeScript, React, Angular et Vue. Les snapshots et les mocks sont intégrés, et la couverture de code s'active avec un seul indicateur, `--coverage`, sans configuration supplémentaire. Il exécute les tests en parallèle, chacun dans son propre processus pour qu'ils ne s'influencent pas, et place en tête ceux qui avaient échoué la fois précédente<b-proof href="https://jestjs.io/" quote="Jest runs previously failed tests first"/>. Le style des vérifications est connu : `test` décrit un cas, `expect` compare la réponse.</b-why>
  <b-why align="left">[Vitest](/materials/glossary/vitest/) fait presque la même chose mais repose sur le bundler [Vite](/materials/glossary/vite/)<b-proof href="https://vitest.dev/guide/" quote="a next generation testing framework powered by Vite"/>. Si le site est déjà construit avec Vite, Vitest reprend les mêmes réglages et les mêmes plugins, alors que Jest exigerait une seconde configuration, distincte. Les auteurs de Vitest parlent de duplication de la complexité<b-proof href="https://vitest.dev/guide/comparisons" quote="two different pipelines to configure and maintain"/>. La compatibilité avec Jest est élevée : Vitest prend en charge la majeure partie de l'interface de Jest et de ses bibliothèques<b-proof href="https://vitest.dev/guide/comparisons" quote="compatibility with most of the Jest API and ecosystem libraries"/>, de sorte que, dans la plupart des projets, il convient comme remplaçant.</b-why>
  <b-why align="left">Vitest dispose aussi d'un mode watch rapide : quand un fichier change, les tests se relancent instantanément, grâce au même remplacement à chaud des modules que dans Vite lui-même<b-proof href="https://vitest.dev/guide/comparisons" quote="default watch mode using Vite instant Hot Module Reload"/>. La documentation mentionne aussi un mode qui exécute les tests dans un vrai navigateur et une interface web pour les résultats. Cela a un prix : il faut des versions assez récentes de Vite et de [Node.js](/materials/glossary/node-js/), et la documentation indique aujourd'hui Vite 6.4 et Node 22.12<b-proof href="https://vitest.dev/guide/" quote="Vitest requires Vite >=v6.4.0 and Node >=v22.12.0"/>.</b-why>
  <b-finding>
    <ex>Sur un projet Vite, Vitest épargne une seconde configuration, alors que sur un projet sans Vite, la différence avec Jest est faible.</ex>
    <gen>Si Jest fonctionne déjà et ne gêne personne, migrer pour migrer rapporte rarement.</gen>
    <do>Regardez comment votre site est construit. Si c'est avec Vite, essayez Vitest sur un module.</do>
  </b-finding>
</b-chapter>

<b-chapter id="qunit" icon="workflow" title="QUnit : quand il faut des tests directement dans le navigateur">
  <b-art names="jest-vs-vitest-vs-qunit/qunit-env" wide/>
    <b-why align="left">[QUnit](/materials/glossary/qunit/) se décrit comme un framework de test puissant et simple à utiliser. Il n'exige aucune configuration pour Node.js, et une configuration minimale suffit pour le navigateur<b-proof href="https://qunitjs.com/" quote="Zero configuration and setup for any Node.js project"/>. Il fonctionne partout où il y a du JavaScript : dans les navigateurs, dans Node.js, dans le moteur SpiderMonkey et dans un thread d'arrière-plan d'une page<b-proof href="https://qunitjs.com/" quote="QUnit can run anywhere; web browsers, Node, SpiderMonkey, even in a Web Worker!"/>. Jest et Vitest, eux, s'exécutent le plus souvent dans Node.js.</b-why>
  <b-why align="left">Son style est propre. Les tests apparentés se regroupent avec `QUnit.module`, un test se décrit avec `QUnit.test`, et la réponse se compare via `assert`. Pour les tests qui touchent une page, il existe une fixture qui remet la page dans son état initial après chaque test, ainsi qu'une vérification distincte de l'ordre des appels pour les événements et les réponses différées. QUnit peut être étendu selon les besoins : assertions, exécuteurs et rapports personnalisés. La version actuelle, la 3, fonctionne dans les navigateurs modernes et dans Node.js 18 et suivants ; Internet Explorer 9–11 n'était pris en charge que par la version 2<b-proof href="https://qunitjs.com/intro/" quote="QUnit supports the following runtime environments"/>.</b-why>
  <b-finding>
    <ex>QUnit convient là où les tests doivent tourner directement dans le navigateur et sans build.</ex>
    <gen>Pour les projets modernes avec build, où mocks, snapshots et couverture sont nécessaires d'emblée, on prend plus souvent Jest ou Vitest.</gen>
    <do>Si les tests doivent s'ouvrir dans le navigateur comme une page ordinaire, vérifiez d'abord QUnit.</do>
  </b-finding>
</b-chapter>

<b-chapter id="table" icon="scales" title="Qui a quoi : Jest, Vitest et QUnit point par point">
<b-table id="jvq">

| | Jest | Vitest | QUnit |
|---|---|---|---|
| **Idée** | le framework habituel au kit complet : snapshots, mocks, couverture | un framework de nouvelle génération construit sur Vite | un framework simple qui tourne partout |
| **Configuration** | sa propre configuration | la même que celle de Vite | presque aucune |
| **Où il s'exécute** | le plus souvent dans Node.js | le plus souvent dans Node.js | navigateur, Node.js, autres environnements |
| **Écriture d'une vérification** | `test` et `expect` | `test` et `expect`, comme dans Jest | `QUnit.test` et `assert` |
| **Quand il convient** | Jest est déjà là et fonctionne | le projet est construit avec Vite | il faut des tests dans le navigateur, sans build |

</b-table>
  <b-why align="left">Le tableau ligne par ligne. « Idée » dit pourquoi le framework est apparu. « Configuration » montre la quantité de travail avant le premier test. « Où il s'exécute » et « Écriture d'une vérification » comptent si vous avez beaucoup de tests prêts : le style de Jest et de Vitest est le même, passer de l'un à l'autre est donc simple, alors qu'avec QUnit il faudrait réécrire les vérifications.</b-why>
</b-chapter>

<b-chapter id="choose" icon="target" title="Que choisir : Jest, Vitest ou QUnit">
  <b-art names="jest-vs-vitest-vs-qunit/choose" wide/>
  <b-why align="left">Le choix dépend du projet. Le projet est construit avec Vite : prenez Vitest, la configuration est déjà là. Jest est déjà dans le projet et tout fonctionne : gardez-le. Il vous faut des vérifications directement dans le navigateur sans build : prenez QUnit. Passer de Jest à Vitest coûte en général peu, un mauvais choix ne sera donc pas irréversible. Pour vérifier des règles et l'ordre d'événements plutôt que des fonctions, voir les articles [Quint, QUnit et TLA+](/blog/quint-vs-tests-and-tla/) et [les modèles Quint](/blog/quint-models-find-races/).</b-why>
  <b-finding>
    <ex>Les trois frameworks font le même travail, et c'est l'environnement qui tranche : un bundler, un navigateur ou un jeu de tests existant.</ex>
    <gen>Quel que soit le choix, les tests vérifient les scénarios donnés, tandis que les règles qui se brisent dans un ordre d'événements particulier sont attrapées par un modèle.</gen>
    <do>Choisissez un framework selon l'environnement du projet et ajoutez une vérification des tests eux-mêmes : le [test de mutation](/materials/glossary/mutation-testing/) montre si les tests remarquent seulement un défaut.</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="FAQ">
  <b-faq-cards>
    <q t="Faut-il choisir Jest ou Vitest ?">Sur un projet construit avec Vite, prenez Vitest : il réutilise la même configuration, donc aucune seconde configuration n'est nécessaire. Si Jest fonctionne déjà et ne gêne personne, migrer rapporte rarement.</q>
    <q t="En quoi Vitest diffère-t-il de Jest ?">Vitest repose sur Vite, prend en charge la majeure partie de l'interface de Jest et relance rapidement les tests quand un fichier change. Il demande des versions assez récentes de Vite et de Node.js.</q>
    <q t="Quand a-t-on besoin de QUnit ?">Quand les tests doivent tourner directement dans le navigateur, sans étape de build. QUnit s'exécute dans les navigateurs, dans Node.js et dans d'autres environnements JavaScript, et n'exige aucune configuration pour Node.js.</q>
    <q t="Est-ce difficile de passer de Jest à Vitest ?">En général non : les deux écrivent les vérifications avec `test` et `expect`, passer de l'un à l'autre est donc simple. Passer à QUnit oblige à réécrire les vérifications.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Pour aller plus loin">
  <b-links>
    <item href="/blog/quint-vs-tests-and-tla/" k="Comparaison" t="Vérification de modèles et tests : Quint, QUnit, TLA+">En quoi Quint diffère de QUnit, de Jest et de TLA+</item>
  <item href="/blog/quint-models-find-races/" k="Modèles" t="Comment trouver les race conditions et les données perdues">Modèles formels Quint pour les règles et l'ordre des événements</item>
  <item href="/blog/tla-alloy-quint-compare/" k="Comparaison" t="TLA+, Alloy ou Quint">Les langages de spécification à côté des frameworks de test</item>
  </b-links>
</b-chapter>
<b-footer>Faits : les sites officiels de Jest, Vitest et QUnit au 25 octobre 2026. Le choix dépend de votre projet, et les critères généraux sont décrits ici.</b-footer>
</b-post>
