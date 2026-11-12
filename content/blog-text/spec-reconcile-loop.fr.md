**Désiré :** spec

**Acteur :** agent

**Réel :** code

**Mesure :** tests

## La même boucle que dans Kubernetes

L'état désiré est ici le dictionnaire d'agrégats : une entrée par concept, des exigences marquées MUST et SHOULD.

un humain change l'état désiré

désiré

acteur

réel

mesure

**Kubernetes :**

désiré chart · manifeste

acteur contrôleur

réel nœuds · pods

mesure sondes · métriques

**Spécifications :**

désiré dictionnaire · MUST

acteur agent

réel code

mesure tests · qualité

mesure → acteur, en boucle

La boucle de réconciliation suit la documentation de Kubernetes sur les contrôleurs.

**À retenir :**

**Dans cet exemple :** Dans Kubernetes, un humain modifie le chart et le contrôleur y amène les nœuds. Ici, un humain modifie le dictionnaire et l'agent y amène le code et vérifie avec des tests.

**En général :** Les deux systèmes séparent l'état désiré de l'état réel et les rapprochent dans une boucle. L'humain dans la boucle ne change que l'état désiré, donc chaque modification devient aussitôt du travail pour l'acteur.

**Étape suivante :** Modifiez l'exigence dans le dictionnaire au lieu de corriger le code à la main, et lancez l'agent avec la tâche de mettre le code en conformité avec le dictionnaire.

## Une vérification ne voit que ce qu'on y a mis

L'exemple est la réservation de salles de réunion de Spécifications par agrégats : trois exigences MUST et une SHOULD.

**Kubernetes :**

/healthz → 200

la file des commandes est bloquée

la sonde est verte, le service est en panne

**Spécifications :**

MUST · pas de chevauchementtest

MUST · uniquement vers l'avanttest

MUST · 15 min → closaucune vérification

SHOULD · canalrelecture

MUST couverts

**2 / 3 :**

les tests sont verts, un MUST n'est pas vérifié

chaque MUST → sa propre vérification MUST sans vérification = lacune vert ≠ correct

Quelles sondes existent et ce qu'elles vérifient : Kubernetes : sondes.

**À retenir :**

**Dans cet exemple :** La sonde répond « 200 » alors que les commandes sont bloquées, et les tests de réservation sont verts alors que personne ne vérifie la règle des 15 minutes.

**En général :** Une vérification ne confirme que ce qui y est écrit et ne dit rien du reste. La fiche d'agrégat est donc comparée aux vérifications : un MUST sans vérification est une lacune, pas une exigence satisfaite.

**Étape suivante :** Passez en revue les MUST de votre dictionnaire et repérez ceux qui n'ont pas de test. Transformez chacun en tâche, ou rétrogradez-le délibérément en SHOULD.

## L'environnement décide si la boucle se ferme

**cluster :** l'environnement du contrôleur

≈

**harness :** l'environnement de l'agent

**Exécuter le code :** sans cela → des suppositions au lieu de faits

**Tests :** sans cela → impossible de vérifier un MUST

**Logs :** sans cela → impossible de voir ce qui a cassé

**Données de test :** sans cela → des vérifications sur des tables vides

**Services via MCP :** sans cela → intégrations dans le noir

**Sandbox et permissions :** sans cela → trop risqué de le laisser agir

Article à part Choisir l'environnement : comparaison des harness Claude Code, Codex, Cursor, Hermes et le chat sur une seule carte

**À retenir :**

**Dans cet exemple :** Le contrôleur Kubernetes fonctionne parce que le cluster lui donne une API, des nœuds et des sondes. Pour la même boucle, l'agent a besoin d'exécuter du code, de tests, de logs, de données, de services et d'un bac à sable.

**En général :** Le dictionnaire fixe l'état désiré, mais seul celui qui peut exécuter et mesurer le code peut le mettre en conformité avec cet état. Ce que l'environnement n'offre pas, l'agent ne peut pas le vérifier, et la boucle reste ouverte à cet endroit.

**Étape suivante :** Repérez lesquelles des six capacités votre agent possède. Pour chacune qui manque, décidez de l'ajouter au harness ou de changer de harness.

## À lire ensuite

État désiré

Spécifications par agrégats

dictionnaire, exigences RFC et contextes

Boucle d'erreurs

Harness-Driven Development

comment les erreurs de l'agent deviennent des règles

Environnement

Comparaison des harness

où l'agent travaille et ce qu'il voit

Spécifications

Installation et commandes d’OpenSpec

spécifications et changements dans des fichiers à côté du code

L'exemple de réservation est inventé. Les termes et les approches suivent les sources liées sous les schémas.
