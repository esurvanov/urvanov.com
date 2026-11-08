**Contexte :** réservation

**Agrégat :** Reservation

**Invariant :** MUST

**Vérification :** test

## Pourquoi les specs s'accumulent

**Une spec par fonctionnalité :** un concept est décrit dans chaque fonctionnalité

**12 fichiers :** « Réservation » dans 7

croît avec les fonctionnalités

**Dictionnaire d'agrégats :** un concept est décrit une seule fois

Reservation

Room

TimeSlot

Member

**4 entrées :** « Réservation » dans 1

croît avec le domaine

Fonctionnalité 13 → [booking::Reservation]+1 MUST → test+1

Les chiffres sont illustratifs. Comment OpenSpec organise les specs et les changements : dossiers specs/ et changes/, les changements terminés vont dans une archive.

**À retenir :**

**Dans cet exemple :** Douze fonctionnalités ont produit douze specs, et la réservation est décrite dans sept d'entre elles, chaque fois un peu différemment. Dans le dictionnaire, les mêmes fonctionnalités ont ajouté des lignes à quatre entrées d'agrégats.

**En général :** Quand une spec est liée à un changement ou à une fonctionnalité, chaque tâche ajoute des fichiers, et un même concept dérive à plusieurs endroits. Quand l'unité est un agrégat, le nombre d'entrées est borné par le domaine lui-même, et une fonctionnalité ne fait qu'ajouter des exigences à une entrée.

**Étape suivante :** Listez les concepts qui apparaissent dans trois specs ou plus et donnez à chacun une entrée unique dans le dictionnaire. Faites pointer les specs de fonctionnalités vers l'entrée au lieu de la raconter à nouveau.

## Niveaux d'exigence de la RFC 2119

Mot Signification Force Vérification

MUSTobligatoire test automatisébloque

MUST NOTinterdit test automatisébloque

SHOULDpar défaut, s'en écarter avec une raison relectureavertit

MAYpermis aucunenon vérifié

MUST = SHALL

Les mots et leurs significations suivent la RFC 2119. Chaque mot correspond à son propre type de vérification.

**À retenir :**

**Dans cet exemple :** Dans l'entrée de la réservation, « les intervalles ne se chevauchent pas » est un MUST vérifié par un test, et « la confirmation passe par le même canal » est un SHOULD examiné en relecture.

**En général :** Le mot d'exigence indique tout de suite comment la vérifier et que faire en cas de violation. L'agent lit MUST comme une limite et SHOULD comme une valeur par défaut, et ne les confond pas.

**Étape suivante :** Réécrivez les exigences de votre spec avec ces quatre mots et placez à côté de chaque MUST le test qui le vérifie.

## La fiche d'agrégat
```
## [booking::Reservation]

Class: aggregate

Description: Une salle de réunion réservée pour un intervalle.
```
1 adresse : contexte::nom
```
Invariants:

  - MUST: les réservations actives d'une salle ne se chevauchent jamais

  - MUST: held → confirmed → closed, uniquement vers l'avant

  - MUST: held non confirmée pendant 15 min → closed

  - SHOULD: confirmer sur le canal où la réservation a été faite
```
2 exigences → vérifications
```
Commands: HoldRoom, ConfirmReservation,

          CancelReservation
```
3 la seule façon de la modifier
```
Access:

  CanHoldRoom: [booking::Role::Member]

  CanCancelReservation: Member (la sienne), Admin
```
4 qui a le droit
```
Depends on: [[booking::Room]], [[booking::TimeSlot]]
```
5 liens par identifiant
```
Spec: [[room-booking]]
```
6 de quelle fonctionnalité elle vient

L'exemple est inventé. Les termes suivent Martin Fowler : DDD Aggregate.

**À retenir :**

**Dans cet exemple :** Toute la réservation tient sur une fiche : une adresse, quatre exigences, trois commandes, des permissions, des liens et la fonctionnalité d'origine.

**En général :** Un agrégat est une frontière à l'intérieur de laquelle les exigences sont toujours respectées, et il ne peut changer que par ses propres commandes. C'est pourquoi la fiche garde les règles à côté des seules façons de les enfreindre.

**Étape suivante :** Donnez à chaque agrégat une fiche à six champs. Si une exigence ne peut être attribuée à aucun agrégat, c'est très probablement que l'agrégat n'a pas encore été nommé.

## Contextes délimités

booking

Reservation Room TimeSlot

billing

Invoice Tariff

access

Pass Level

les liens entre contextes passent uniquement par identifiant billing::Invoice→ id → booking::Reservation access::Pass→ id → booking::Reservation

« Level »

booking::Room.floorÉtage

access::LevelHabilitation

un mot, deux termes, des libellés différents

un terme = une entrée lien sous la forme [[ctx::Name]] même mot → entrées séparées le dictionnaire change avec la spec

L'approche repose sur Bounded Context et Ubiquitous Language.

**À retenir :**

**Dans cet exemple :** La facture et le badge se réfèrent à une réservation par identifiant et ne savent rien de son intérieur. « Level » signifie un étage dans la réservation et une habilitation dans l'accès, et ce sont deux entrées distinctes.

**En général :** Un contexte est un domaine où chaque mot a un seul sens. Quand un mot apparaît dans deux contextes, il faut créer deux termes avec des libellés différents ; sinon, l'agent reporte une règle de l'un dans l'autre.

**Étape suivante :** Répartissez vos agrégats en contextes et repérez les mots qui apparaissent dans deux d'entre eux. Donnez à chacun de ces mots des entrées séparées et des libellés différents dans l'interface.

## À lire ensuite

Suite

**Une boucle de réconciliation pour les spécifications :** comme Kubernetes : état désiré, vérifications et environnement de l'agent

Boucle d'erreurs

Harness-Driven Development

comment les erreurs de l'agent deviennent des règles

Contexte

Spécifications, bible, règles et skills

ce que l'agent sait du projet et où cela vit

Environnement

Comparaison des harness

où l'agent travaille et ce qu'il voit

L'exemple de réservation est inventé. Les termes et les approches suivent les sources liées sous les schémas.
