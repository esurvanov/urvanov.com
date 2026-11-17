---
title: Quint vs TLA+ : différences et lequel choisir
date: 2026-11-15
updated: 2026-11-17
description: Quint ou TLA+ : comparaison en sept points, de la notation à la courbe d’apprentissage, choix de l’outil et migration des spécifications.
tags: IA, spécifications, Quint, TLA+, Quint vs TLA+, TLA+ vs Quint, TLAPS, Apalache, TLC, PlusCal, vérification formelle, vérification de modèles
category: specs
layout: wide
mentions: Quint, TLA+, TLAPS, Apalache, TLC, PlusCal, model checking, formal specification, Leslie Lamport, Quint vs TLA+, TLA+ vs Quint
toc: same=Points communs | table=Tableau | choose=Que choisir | migrate=Migration | practice=Pratique | faq=FAQ | next=Pour aller plus loin
---
Quint et TLA+ décrivent le même comportement d’un système et sont vérifiés par les mêmes programmes, TLC et Apalache. Ils diffèrent par la notation, les types et les preuves : Quint s’écrit comme du code typé, vérifié dans l’éditeur ; TLA+ utilise des formules sans types, avec TLAPS. Sans bagage mathématique, Quint ; pour des preuves strictes, TLA+.

<b-post series="harness">

<b-chapter id="same" icon="link" title="Ce que Quint et TLA+ ont en commun">
  <b-why align="left">Les deux langages reposent sur une seule logique, la Temporal Logic of Actions (TLA). La FAQ de Quint le dit directement : Quint repose sur la même logique, il est donc très proche de TLA+ pour ce qu’il peut vérifier et pour les cas où il aide<b-proof href="https://quint.sh/faq" quote="Quint is based on TLA+ and uses the same underlying logic"/>. Le résultat est le même pour les deux : on décrit les états d’un système et les pas autorisés, on énonce les règles qui doivent toujours tenir, et un programme cherche une chaîne de pas où une règle se brise. C’est la [vérification de modèles](/materials/glossary/model-checking/).</b-why>
  <b-why align="left">[TLA+](/materials/glossary/tla-plus/) a été créé par Leslie Lamport, et [Quint](/materials/glossary/quint/) a été conçu comme une autre syntaxe pour la même logique. Le lien va dans les deux sens : Quint est restreint à une partie de TLA+, de sorte qu’une spécification Quint peut être traduite automatiquement en spécification TLA+<b-proof href="https://quint.sh/faq" quote="a Quint specification can be automatically translated to a TLA+ specification"/>. Depuis la ligne de commande de Quint, les mêmes programmes de vérification se lancent, [TLC](/materials/glossary/tlc/) et [Apalache](/materials/glossary/apalache/). Le choix entre les langages change donc à peine ce qu’on peut trouver. Il change le confort pour écrire, lire et prouver.</b-why>
  <b-finding>
    <ex>Quint et TLA+ trouvent le même genre d’erreur : une règle brisée quelque part dans une chaîne de pas.</ex>
    <gen>Le choix se décide sur la notation, les types, les preuves et le confort au quotidien, tandis que les capacités de vérification sont communes.</gen>
    <do>Noter ce qui compte le plus : la lisibilité pour toute l’équipe ou une preuve stricte. Le reste du choix en découle.</do>
  </b-finding>
</b-chapter>

<b-chapter id="table" icon="scales" title="Quint vs TLA+ : tableau de sept différences">
<b-table id="quint-tla-plus">

| | TLA+ | Quint |
|---|---|---|
| **Notation** | mathématique, dans le style de LaTeX | proche du code, dans l’esprit de TypeScript et des langages fonctionnels |
| **Types** | aucun : le langage est volontairement non typé | vérificateur de types et d’effets, la plupart des types sont déduits |
| **Preuves** | dispose du système de preuve TLAPS | aucune |
| **Vérification de modèles** | TLC et Apalache | les mêmes TLC et Apalache depuis la ligne de commande de Quint, plus son propre simulateur aléatoire |
| **Exécution comme tests** | pas d’équivalent direct | une « exécution » (run, une chaîne concrète de pas) fait partie du langage et peut servir de test |
| **Maturité et écosystème** | utilisé depuis plus longtemps, plus de livres, d’exemples et de programmes autour | plus jeune, mais le support d’éditeur, le REPL et le simulateur s’installent avec une seule commande npm |
| **Courbe d’apprentissage** | raide pour beaucoup de personnes | probablement plus douce pour qui découvre la spécification formelle |

</b-table>
  <b-why align="left">**Notation.** Dans TLA+, une seule action mélange souvent choix non déterministe, conditions d’applicabilité, logique métier et mises à jour d’état, si bien que la notation est loin du code habituel. Dans Quint, la logique métier s’écrit en fonctions pures, séparément de la manière dont leur application modifie l’état<b-proof href="https://quint.sh/faq" quote="Quint uses programming-style syntax inspired by TypeScript and functional languages."/>. Pour la relecture, la différence est nette : quiconque lit du TypeScript peut lire une règle.</b-why>
  <b-why align="left">**Types.** TLA+ n’est pas typé volontairement<b-proof href="https://quint.sh/faq" quote="TLA+ is purposely untyped so that designers can focus on algorithmic concepts."/> : un algorithme de consensus a le même aspect pour des entiers et pour des chaînes. Le prix : une erreur comme une chaîne dans un ensemble d’entiers n’est parfois visible que dans un contre-exemple du vérificateur. Quint vérifie les types et les effets, donc une partie des erreurs apparaît dans l’éditeur avant toute exécution. Il est rarement nécessaire d’écrire les types, car la plupart sont déduits.</b-why>
  <b-why align="left">**Preuves et vérification.** Parmi les principaux programmes pour TLA+, la page de Lamport nomme le vérificateur de modèles TLC et le système de preuve TLAPS<b-proof href="https://lamport.azurewebsites.net/tla/tla.html" quote="The primary ones are the TLC model checker and the TLAPS proof system."/>. Quint n’a pas de tel système de preuve et confie la vérification à deux programmes. TLC énumère les états un par un<b-proof href="https://quint-lang.org/docs/model-checkers" quote="TLC is an explicit-state model checker"/>. Apalache transforme le modèle en contraintes pour le solveur [Z3](/materials/glossary/z3/)<b-proof href="https://apalache-mc.org/" quote="Apalache translates TLA+ into the logic supported by SMT solvers such as Microsoft Z3."/> et examine les chaînes jusqu’à une longueur fixée<b-proof href="https://quint-lang.org/docs/model-checkers" quote="Apalache cannot check an arbitrary number of steps"/>. Son « OK » signifie donc : aucune violation dans cette longueur.</b-why>
  <b-why align="left">**Exécutions comme tests.** Dans Quint, une exécution (run) est un objet du langage. C’est une chaîne concrète de pas, qui peut s’écrire comme un test ou un modèle de test. Pour TLA+, la FAQ dit clairement qu’il n’y a pas d’équivalent direct<b-proof href="https://quint.sh/faq" quote="TLA+ has no direct equivalent."/>. Quint a aussi une simulation aléatoire rapide : elle échantillonne à la recherche de violations et ne prouve pas leur absence. Avec Quint Connect, des tests peuvent être générés à partir du modèle pour vérifier le code réel en intégration continue.</b-why>
  <b-why align="left">**Maturité et courbe d’apprentissage.** Le radar de Thoughtworks voit dans Quint de la lisibilité et une bonne expérience développeur, mais le place dans l’anneau « Assess » (à explorer) et cite la maturité de TLA+ comme argument de poids. Selon la FAQ, Quint est déjà utilisé dans les flux de travail de plusieurs équipes d’ingénierie, et le langage, la ligne de commande et l’extension VS Code sont qualifiés de stables. Pour qui découvre la spécification formelle, Quint est probablement la voie la plus rapide<b-proof href="https://quint.sh/faq" quote="If you are new to formal specification, Quint is likely the faster path"/>. Qui écrit déjà du TLA+ trouvera Quint familier.</b-why>
  <b-finding>
    <ex>Sur les sept différences, deux sont en faveur de TLA+ (preuves et maturité), quatre en faveur de Quint (notation, types, tests, courbe d’apprentissage), et la vérification est identique.</ex>
    <gen>Si les preuves ne sont pas nécessaires, la balance penche vers Quint ; si elles le sont, il ne reste que TLA+.</gen>
    <do>Avant de choisir, répondre à une question : faut-il une preuve stricte vérifiée par un programme, par opposition à une recherche dans des limites fixées ?</do>
  </b-finding>
</b-chapter>

<b-chapter id="choose" icon="target" title="Quand TLA+, quand Quint">
  <b-rules cols="2">
    <rule icon="shield-check" t="TLA+ : il faut des preuves">Garanties strictes pour un système distribué complexe : TLAPS existe pour TLA+ et pas pour Quint</rule>
    <rule icon="book" t="TLA+ : spécifications existantes">Les livres, cours et pas-à-pas en TLA+ restent valables, et il n’y a aucune raison de les réécrire</rule>
    <rule icon="code" t="Quint : toute l’équipe le lit">Une notation proche du code se relit plus facilement, surtout quand un agent écrit la spécification</rule>
    <rule icon="flask" t="Quint : des tests à partir du modèle">Les exécutions du modèle deviennent des tests pour l’implémentation</rule>
    <rule icon="zap" t="Quint : démarrage rapide">REPL, simulateur et vérification de modèles s’installent avec une seule commande npm, et l’éditeur VS Code met en évidence les erreurs de types</rule>
    <rule icon="users" t="Quint : équipe sans bagage mathématique">Les règles métier comme « une note privée n’arrive jamais dans le stockage partagé » se lisent sans formules</rule>
  </b-rules>
  <b-why align="left">Cela correspond à l’évaluation du Thoughtworks Technology Radar de novembre 2026. Il place Quint dans l’anneau « Assess » et juge le choix entre Quint et TLA+ serré<b-proof href="https://www.thoughtworks.com/radar/languages-and-frameworks/quint" quote="Our teams have found the choice between Quint and TLA+ a close call"/> : l’outillage pour développeurs de Quint d’un côté, la maturité de TLA+ de l’autre. Le radar décrit les différences de Quint comme la lisibilité et l’expérience développeur, une syntaxe proche de TypeScript, plus facile à relire quand un agent écrit la spécification, et un éditeur, un REPL et un simulateur.</b-why>
  <b-why align="left">Une règle simple pour les cas douteux : pour des règles métier dans le temps et une équipe sans bagage mathématique, commencer par Quint. Pour un protocole de consensus entre nœuds où des garanties strictes comptent, prendre TLA+ et prévoir du temps pour l’apprendre. Les idées passent dans les deux sens, car les règles restent les mêmes.</b-why>
</b-chapter>

<b-chapter id="migrate" icon="swap" title="Comment passer de TLA+ à Quint">
  <b-why align="left">La FAQ de Quint ne contient pas de guide de migration pas à pas, cette section est donc construite uniquement sur ce qu’elle dit. L’affirmation principale : Quint repose sur TLA+, donc la plupart des spécifications se traduisent directement<b-proof href="https://quint.sh/faq" quote="most TLA+ specs can be directly translated into the Quint syntax"/>. La FAQ ne mentionne pas de traduction automatique dans l’autre sens, de TLA+ vers Quint : elle dit seulement qu’une spécification Quint peut être traduite automatiquement en TLA+.</b-why>
  <b-why align="left">**1. Décider si TLAPS est nécessaire.** Si des preuves sont nécessaires pour cette spécification, rester sur TLA+ : Quint n’a pas un tel système.</b-why>
  <b-why align="left">**2. Reporter la notation.** Réécrire la spécification en syntaxe Quint, une pour une. L’essentiel passe directement, et certaines formes de récursion demanderont un contournement, comme le note la FAQ.</b-why>
  <b-why align="left">**3. Remanier dans le style de Quint.** Les auteurs conseillent de séparer la couche des actions de la couche des fonctions<b-proof href="https://quint.sh/faq" quote="separating the action layer from the functional layer"/>. Les règles de logique métier vont dans des fonctions pures, et les actions ne font que les appliquer à l’état.</b-why>
  <b-why align="left">**4. Vérifier avec les mêmes programmes.** Lancer la vérification depuis la ligne de commande de Quint. Apalache demande une limite sur la longueur des chaînes, et TLC un petit monde. Il est judicieux de comparer le résultat avec l’exécution TLA+ précédente : les violations trouvées là-bas doivent l’être aussi ici.</b-why>
  <b-prompt>
    Voici une spécification TLA+ (coller le texte).
    Traduis-la en Quint littéralement et lance la vérification.
    Sépare ensuite les règles des actions : place la logique métier dans des fonctions pures.
    Montre où la spécification utilise la récursion et ce qu’il a fallu changer pour elle.
  </b-prompt>
  <b-why align="left">Ce que les sources ne confirment pas et que cette page ne promet pas : un convertisseur prêt à l’emploi de TLA+ vers Quint, des délais de migration, ou le nombre de spécifications qui se traduisent sans retouche. La FAQ dit « la plupart », sans chiffre.</b-why>
</b-chapter>

<b-chapter id="practice" icon="flask" title="Un exemple tiré de la pratique de ce site">
  <b-why align="left">Ce dépôt ne contient aucun fichier de modèle : l’article décrit des modèles d’un autre projet, il n’y a donc pas ici d’exemple de code honnête dans deux langages. La pratique est la suivante : des modèles Quint vérifient des règles métier dans le temps, et les vérifications elles-mêmes sont testées avec des copies volontairement cassées du modèle. Une règle que le code respecte déjà doit échouer sur une copie contenant un seul défaut. Détails, exemples et schémas : [Comment trouver une condition de concurrence : un modèle Quint](/blog/quint-models-find-races/), section sur le test des vérifications.</b-why>
  <b-finding>
    <ex>Pour des règles métier avec un agent, le site propose des modèles Quint : la notation se lit sans formules, et les mêmes TLC et Apalache font la vérification.</ex>
    <gen>Si des preuves lourdes deviennent nécessaires, les règles passent à TLA+ sans repenser les idées.</gen>
    <do>Prendre un bug récemment corrigé, causé par l’ordre des événements, et le décrire en Quint sur une seule page.</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="FAQ">
  <b-faq-cards>
    <q t="Faut-il passer de TLA+ à Quint ?">Si des preuves sont nécessaires pour la spécification, non : TLAPS existe pour TLA+ et pas pour Quint. Si une notation lisible, des vérifications de types dans l’éditeur et des tests issus du modèle sont nécessaires, c’est possible : la plupart des spécifications TLA+ se traduisent directement en Quint. La FAQ de Quint ne contient pas de guide de migration pas à pas.</q>
    <q t="En quoi Quint diffère-t-il de PlusCal ?">PlusCal se place au-dessus de TLA+ et se compile en TLA+<b-proof href="https://quint.sh/faq" quote="PlusCal is a language on top of TLA+ that is precompiled into TLA+."/>. Il ajoute des boucles et des affectations à un langage déclaratif. Quint reste déclaratif : il décrit des transitions entre états, et non une suite d’étapes. Quint n’utilise TLA+ comme langage intermédiaire que pour la vérification de modèles, et son REPL, son simulateur et ses fonctions de test lui sont propres<b-proof href="https://quint.sh/faq" quote="Quint does not use TLA+ as an intermediate language (except for model checking)."/>.</q>
    <q t="Faut-il des types dans une spécification formelle ?">Pas forcément : TLA+ est non typé volontairement pour que les concepteurs se concentrent sur l’idée de l’algorithme. Le prix : une partie des erreurs n’apparaît que dans un contre-exemple du vérificateur. Quint vérifie les types et les effets et montre une partie des erreurs dans l’éditeur avant toute exécution. Il est rarement nécessaire d’écrire les types, puisque la plupart sont déduits.</q>
    <q t="Qu’est-ce qui s’apprend le plus vite, Quint ou TLA+ ?">Pour qui découvre la spécification formelle, Quint est probablement plus rapide : la notation ressemble à TypeScript, et l’éditeur donne un retour rapide. TLA+ a une courbe d’apprentissage raide pour beaucoup de personnes. Si TLA+ est déjà connu, Quint paraîtra familier et le passage prend peu de temps.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Pour aller plus loin">
  <b-links>
    <item href="/blog/tla-alloy-quint-compare/" k="Comparaison" t="TLA+, Quint ou Alloy : quel langage choisir">Les trois langages côte à côte, et quand Alloy convient</item>
    <item href="/blog/quint-vs-tests-and-tla/" k="Comparaison" t="Vérification de modèles vs tests : Quint, QUnit, TLA+">En quoi un modèle diffère d’un test</item>
    <item href="/blog/quint-models-find-races/" k="Modèles" t="Comment trouver une condition de concurrence : un modèle Quint">Modèles formels en Quint : résultats et test des vérifications</item>
    <item href="/materials/glossary/tla-plus/" k="Terme" t="TLA+">Ce que signifie TLA+ dans le glossaire</item>
    <item href="/materials/glossary/quint/" k="Terme" t="Quint">Ce que signifie Quint dans le glossaire</item>
  </b-links>
</b-chapter>
<b-footer>Faits : la FAQ de Quint (quint.sh), la documentation des vérificateurs de modèles de Quint, la page TLA+ de Leslie Lamport, le site d’Apalache, Thoughtworks Technology Radar (novembre 2026), état au 15 novembre 2026. Le choix dépend de la tâche ; les signes généraux sont décrits ici.</b-footer>
</b-post>
