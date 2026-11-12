1

**Prompt :** la formulation de la requête

2

**Contexte :** ce que sait le modèle

3

**Harness :** l’environnement de l’agent HDD

Étapes telles que décrites par Faros et marmelab

## Trois étapes

Prompt

rôle format exemple

corrige une requête

Contexte

documents mémoire du projet

corrige ce que le modèle sait

Harness

outils tests règles permissions

corrige chaque exécution future

**Bilan :**

**Dans cet exemple :** Un prompt corrige une réponse, le contexte corrige ce que le modèle sait, et le harness corrige chaque exécution future de l’agent.

**En général :** Le Harness-Driven Development est le travail à la troisième étape : le développeur écrit moins de code et passe plus de temps à configurer l’environnement dans lequel l’agent écrit, vérifie et corrige.

**Étape suivante :** Notez les trois dernières erreurs de l’agent et marquez l’étape à laquelle chacune aurait pu être corrigée pour de bon.

## La boucle HDD

Principe de Mitchell Hashimoto : quand l’agent fait une erreur, modifier le harness pour que cette erreur ne puisse plus se produire Faros

**Bilan :**

**Dans cet exemple :** Une erreur attrapée par les capteurs entre dans le harness comme une nouvelle règle, et l’agent reçoit cette règle à chaque exécution suivante.

**En général :** Un résultat corrigé à la main n’aide qu’une fois. Une règle dans le harness (une instruction, un test ou un hook) s’applique à toutes les tâches futures : le harness devient donc plus précis avec le temps sans changer le modèle.

**Étape suivante :** Adoptez une règle : toute erreur de l’agent que vous avez dû corriger à la main devient, le jour même, une ligne dans les instructions ou un test.

## Comment un harness est organisé : 3 × 3

Trois domaines de la boucle et trois contextes dans chacun — neuf canons. Chaque canon a exactement un domaine et un contexte.

**Spec :** ce qui doit être vrai

**Skill :** comment agir

**Memory :** sur quoi s’appuyer

**Expectation :** ce qui devrait être

Spec genres, schémas niveaux d’exigence passeport des nombres

Skill prédiction avant d’agir

Memory rôles des actionneurs live · MCP

**Observation :** ce qui a été mesuré

Spec rang des preuves format des constats échelle

Skill le capteur consigne le fait

Memory live seulement

**Loop :** comparer et décider

Spec critères de complétude des règles registre des constats

Skill comparer compter les répétitions corriger ou réviser

Memory vide pour l’instant

Expectation Observation

Loop ✕ pas de lien inverse

correctif révision des règles

→ skill → spec de son domaine· un script de hook de commit vérifie le sens

**snapshot :** un tableau, mis à jour après chaque nouvelle mesure

**live :** un protocole, frais à chaque fois, rien n’est stocké

**Bilan :**

**Dans cet exemple :** La boucle se divise en Expectation, Observation et Loop, chacune avec sa spec, son skill et sa mémoire. Loop lit les deux autres domaines ; eux ne lisent jamais Loop.

**En général :** C’est une boucle à rétroaction négative : la valeur cible est comparée à la valeur mesurée, et quelque chose ne change qu’en cas d’écart. Un sens de référence strict évite que les domaines ne s’emmêlent, et qu’un même concept se répète dans deux domaines n’est pas un défaut.

**Étape suivante :** Classez les fichiers de votre harness dans les neuf cellules et vérifiez qu’aucun fichier d’Expectation ou d’Observation ne renvoie à Loop.

## La double boucle

**boucle simple :** corriger l’action sous les mêmes règles

**double boucle :** changer les règles elles-mêmes

**Rustines sans nouvelle prédiction :** corriger par une règle

**Plusieurs plaintes :** tester d’abord une cause commune

**Une nouvelle règle :** acceptée seulement si les anciens cas en découlent

**Pas de vérification externe :** l’écarter, en le consignant

La boucle s’applique à elle-même : chaque exécution se termine par le risque résiduel, jamais par un statut « terminé ».

**Bilan :**

**Dans cet exemple :** Une série de rustines, des plaintes, une nouvelle règle et une vérification externe sont quatre principes vérifiables dont Loop se sert pour décider s’il faut corriger l’action ou changer les règles.

**En général :** Une boucle simple corrige le résultat dans le cadre des anciennes règles. Une double boucle change les règles elles-mêmes, et le fait selon des principes vérifiables : le harness apprend donc sans dériver au gré de modifications aléatoires.

**Étape suivante :** Quand le même correctif revient une troisième fois, arrêtez-vous et demandez quelle règle en est la cause. Ne changez la règle que si elle explique aussi les anciens cas.

## Guides et capteurs

**Guides :** avant l’action

**Capteurs :** après l’action

**Calculables :** rapides · fiables

types modèles de code générateurs

tests linter vérification des types

**Par IA :** souples · plus coûteux

AGENTS.md · CLAUDE.md skills spécifications

relecture par IA LLM juge

Répartition telle que décrite dans Birgitta Böckeler (martinfowler.com)

**Bilan :**

**Dans cet exemple :** Quatre cellules : les guides fixent le cap avant que l’agent ne travaille, les capteurs attrapent ensuite les écarts, et chacun peut être calculable ou par IA.

**En général :** Les vérifications calculables s’exécutent en quelques secondes et ne se trompent pas dans le cadre de leur règle : utilisez-les partout où une règle peut s’écrire formellement. Gardez les vérifications par IA pour le sens : style, clarté, adéquation à l’intention.

**Étape suivante :** Pour chaque règle des instructions de l’agent, demandez-vous si un test ou un linter pourrait la vérifier. Si oui, déplacez-la là.

## Trois couches de vérification

**Qualité du code :**

mûre

**Architecture :**

en croissance

**Comportement :**

la plus difficile

Maturité des couches selon l’évaluation de Birgitta Böckeler (martinfowler.com)

**Bilan :**

**Dans cet exemple :** La qualité du code est aujourd’hui la plus facile à vérifier, et le comportement du produit la plus difficile.

**En général :** Les linters et formateurs couvrent la première couche presque immédiatement. L’architecture se vérifie avec des règles de dépendances et des exigences de performance. Le comportement demande encore de bons tests de scénarios et un œil humain.

**Étape suivante :** Commencez par la première couche : lancez un linter et un formateur à chaque exécution de l’agent, puis ajoutez une règle sur les frontières des modules.

## Plus tôt, c’est moins cher

**Avant le travail :** instructions · spécifications $

**À l’écriture :** hooks · linter $$

**En CI :** tests · build $$$

**En relecture :** une personne $$$$

**Bilan :**

**Dans cet exemple :** La même erreur coûte le moins avant que l’agent ne démarre et le plus à la relecture humaine.

**En général :** Placez les vérifications rapides le plus tôt possible : l’agent corrige lui-même le problème tant que le contexte de la tâche est encore devant lui, et seuls les points discutables arrivent à une personne.

**Étape suivante :** Branchez les tests et le linter dans un hook que l’agent lance après chaque modification, en plus de la CI.

## Où l’humain compte

Harness

style · types · tests · frontières

Personne

architecture · produit · nouvelles règles

« Un bon harness garde l’humain dans la boucle et dirige son attention là où elle compte le plus » — d’après Birgitta Böckeler (martinfowler.com)

**Bilan :**

**Dans cet exemple :** Le harness prend la plupart des vérifications ; la personne garde les décisions et le travail d’amélioration du harness.

**En général :** Un développeur expérimenté porte un harness implicite dans sa tête : connaissance de l’architecture, habitudes d’équipe, sens du risque. Le HDD transfère ce savoir dans des règles explicites, pour que chaque exécution de l’agent en bénéficie.

**Étape suivante :** Après chaque relecture du code de l’agent, notez un commentaire qui revient sans cesse et transformez-le en règle.

## HDD et spécifications

**Spec :** le résultat voulu

**Harness :** comment vérifier qu’on l’a obtenu

**Code accepté :** sans relecture manuelle ligne à ligne

« Les spécifications définissent l’état cible, le harness est le système de contrôle » — Loiane Groner. Plus sur les spécifications dans l’exposé Spec-Driven Development en pratique

**Bilan :**

**Dans cet exemple :** La spécification répond à « que construit-on », le harness répond à « comment sait-on qu’on l’a construit ».

**En général :** Sans spécification, le harness n’a rien à vérifier, et sans harness, la spécification reste un document. Ensemble, ils permettent d’accepter le code de l’agent d’après des vérifications au lieu de lire chaque ligne.

**Étape suivante :** Pour chaque exigence de la spécification, notez quel test ou quelle vérification confirmera qu’elle est remplie.

## Par où commencer

1

Un fichier d’instructions pour l’agent

AGENTS.md ou CLAUDE.md à la racine du projet : comment construire, comment tester, ce qu’il ne faut pas faire

2

Linter et tests après chaque modification

un hook que l’agent lance lui-même avant de rendre le résultat

3

Un journal des erreurs de l’agent

chaque erreur corrigée à la main reçoit une ligne avec sa cause

4

Erreur → règle

une fois par semaine, transférer les entrées du journal dans les instructions, les tests ou les hooks

5

Un fichier de progression pour les longues tâches

une liste de fonctionnalités avec statuts et l’historique des commits, pour qu’une nouvelle session reprenne là où la précédente s’est arrêtée Anthropic

**Bilan :**

**Dans cet exemple :** Cinq pas : deux installent le harness tout de suite, trois lancent la boucle « erreur → règle ».

**En général :** Personne ne conçoit un harness en entier à l’avance. Il pousse à partir des vraies erreurs de l’agent dans votre projet, et en quelques semaines l’agent cesse de répéter les plus courantes.

**Étape suivante :** Aujourd’hui, créez le fichier d’instructions et le journal des erreurs. Dans une semaine, transférez les premières entrées du journal dans des règles.

## Pour aller plus loin

Étape 1–2

Prompts pour les tâches de travail

comment écrire une requête isolée et fournir des données

Étape 3

Comparaison des harness

Claude Code, Codex, Cursor, Hermes et chat

À lire aussi : Birgitta Böckeler (martinfowler.com) · Anthropic: Harness design · Becoming a Harness-Driven Developer · awesome-harness-engineering

Les termes et la répartition en couches suivent les sources liées dans les légendes sous les schémas.
