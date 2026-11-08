---
title: Où vérifier le travail d’un agent IA : à la frontière de l’agrégat, car personne ne peut vérifier tous les programmes (théorème de Rice)
date: 2026-11-06
updated: 2026-11-08
description: Pourquoi aucune vérification ne peut contrôler n’importe quel code d’agent par rapport à n’importe quelle règle, quelles trois voies rendent une vérification finie, comment la frontière d’un agrégat issue de l’event storming devient un point de contrôle, comment la vérifiabilité fixe la taille d’un contexte délimité, et pourquoi le premier cadre doit être peu coûteux à déplacer.
tags: IA, agents, DDD, agrégat, contexte délimité, event storming, théorème de Rice, Quint, vérification de modèles
category: specs
layout: wide
math: true
mentions: Rice's theorem, halting problem, Gödel's incompleteness theorems, event storming, aggregate, invariant, bounded context, Quint, model checking, DDD
toc: answer=En bref | rice=Théorème de Rice | ways=Trois cadres | gate=Agrégat | size=Taille du contexte | agile=Premier cadre | godel=Gödel | faq=Questions | next=À lire ensuite
---

Placez la vérification du travail d’un agent IA à la frontière de l’agrégat : là où entrent les commandes, où sortent les événements, et où sont notées les règles qui doivent toujours tenir. L’agent écrit le code à l’intérieur de cette frontière. La raison est le théorème de Rice : aucune vérification ne peut contrôler n’importe quel programme par rapport à n’importe quelle règle de comportement ; la vérification est donc réduite à un cadre où la réponse est finie. Ci-dessous : pourquoi, trois façons de réduire la vérification et comment dimensionner un contexte.

<b-post series="agg">
<b-callout icon="bulb">**Ce sont mes réflexions.** L’article est la tentative de l’auteur de comprendre où tracer la frontière quand on travaille avec des agents IA et comment découper un système en contextes ; le théorème de Rice n’est ici qu’un moyen, qui aide à vérifier une frontière déjà tracée. Les affirmations qui ont une source sont marquées d’une icône ↗ à côté du texte : énoncés de théorèmes, définitions, citations. Tout le reste est constitué de mes conclusions et hypothèses : la frontière de l’agrégat comme lieu de la vérification, le critère de taille d’un contexte, la comparaison avec CAP et avec Gödel. À lire comme un point de vue qui reste à vérifier.</b-callout>

<b-hchain label="Chaîne : théorème de Rice, cadre, agrégat, taille du contexte">
  <step icon="alert-circle" t="Rice">on ne peut pas tout vérifier</step>
  <step icon="ring-dot" t="Cadre">réduire la vérification</step>
  <step icon="cube" t="Agrégat">point de contrôle</step>
  <step icon="workflow" sw="1.8" t="Contexte">dimensionné par la vérifiabilité</step>
</b-hchain>

<b-chapter id="answer" icon="shield-check" title="En bref : ce que vérifie une personne et ce que fait l’agent">
  <b-art names="agent-checkpoint/overview" wide/>
  <b-cap>Trois zones de travail avec un agent : là où il est libre, là où se trouve la vérification et là où une personne décide.</b-cap>
  <b-why align="left"><b-icon name="cpu"/> **À l’intérieur de l’agrégat, l’agent travaille.** Il écrit les gestionnaires de commandes, les requêtes de base de données, le stockage des données et les tests. L’agent peut réécrire toute la structure interne : scinder une table en deux, changer les requêtes, remanier le traitement. Tant que la frontière tient, une personne n’a pas besoin de lire chaque ligne.</b-why>
  <b-why align="left"><b-icon name="shield-check"/> **La vérification se trouve à la frontière de l’agrégat.** C’est là qu’est écrit quelles commandes l’agrégat accepte, quels événements il remet à ses voisins et quelles règles tiennent toujours. Une machine vérifie cette frontière. Un modèle Quint est une description des règles du système dans un langage spécial, à partir de laquelle un programme essaie tous les ordres possibles de commandes et cherche celui qui brise une règle. Les contraintes de base de données sont des règles que la base vérifie à chaque écriture, en refusant d’enregistrer ce qui est interdit. Une personne ne relit que les modifications de la frontière elle-même.</b-why>
  <b-why align="left"><b-icon name="workflow"/> **Une personne tient la frontière du contexte.** Quels agrégats vivent ensemble et où le sens des mots change ne peut pas se calculer à partir du code : cela dépend des changements futurs. C’est donc une personne qui fixe ce cadre et le déplace d’après l’historique des modifications et les plans ; plus de détails dans [« Le premier cadre »](#agile).</b-why>
  <b-finding>
    <ex>L’agrégat « Réservation de salle » : la commande « Réserver une salle », l’événement « BookingCreated », la règle « les réservations d’une même salle ne se chevauchent jamais ». Comment les stocker et les traiter relève de l’agent.</ex>
    <gen>Une personne tient une courte liste de choses à la frontière, et une machine peut vérifier cette liste jusqu’au bout. Tout ce qui est à l’intérieur change librement tant que la frontière reste intacte.</gen>
    <do>Pour votre projet, choisissez un agrégat et écrivez trois lignes pour sa frontière : commandes, événements, règles.</do>
  </b-finding>
</b-chapter>

<b-chapter id="rice" icon="alert-circle" title="Pourquoi on ne peut pas vérifier tout le code d’un agent : le théorème de Rice">
  <b-why align="left">**L’essentiel.** Si ingénieuse que soit la vérification du code d’un agent, il existe du code sur lequel elle se trompe. Henry Gordon Rice l’a démontré en 1951<b-proof href="https://en.wikipedia.org/wiki/Rice%27s_theorem" quote="Wikipedia: “The theorem is named after Henry Gordon Rice, who proved it in his doctoral dissertation of 1951 at Syracuse University.”"/>.</b-why>

  - **Ce qui ne peut pas être vérifié :** le comportement d’un programme, ce qu’il fait quand il s’exécute. Par exemple, « ne prélève jamais d’argent sans commande »<b-proof href="https://en.wikipedia.org/wiki/Rice%27s_theorem" quote="Wikipedia: “Rice's theorem states that all non-trivial semantic properties of programs are undecidable.”"/>.
  - **La condition du théorème :** certains programmes ont la propriété et d’autres non. Si tous l’ont ou si aucun ne l’a, la réponse est connue d’avance.
  - **En détail, avec la preuve :** [« Le théorème de Rice en mots simples »](/blog/rice-theorem-explained/).

  <b-why align="left">**Deux sortes de questions sur un programme.** Les mathématiciens appellent prédicat une question à réponse oui ou non. Le théorème exclut une réponse exacte seulement pour la seconde sorte.</b-why>
  <b-vs-grid>
    <h></h>
    <h><b-icon name="file-text"/> Comment le code est écrit</h>
    <h><b-icon name="play"/> Ce que fait le code à l’exécution</h>
    <c>**Exemple**</c>
    <c>le code écrit-il dans la table des paiements ?</c>
    <c>le programme prélèvera-t-il un jour de l’argent sans commande ?</c>
    <c>**Ce qu’il faut examiner**</c>
    <c>le texte du code : il est fini</c>
    <c>chaque exécution avec chaque entrée : une infinité, dont certaines ne se terminent jamais</c>
    <c>**Réponse**</c>
    <c>exacte, par recherche dans le code</c>
    <c>impossible en général</c>
  </b-vs-grid>
  <b-why align="left">**Une démarche pratique :** réécrire le code pour qu’une règle importante devienne une question de la première sorte.</b-why>
  <b-art names="agent-checkpoint/rewrite-rule" wide/>
  <b-why align="left">**Une distinction semblable** existe entre l’approche impérative et l’approche déclarative. Le code impératif décrit des étapes, et en général on ne peut pas en déduire le résultat. Une notation déclarative simple, comme une contrainte de base de données, énonce ce que le résultat doit être, et la base le fait respecter.</b-why>
  <iso-art name="term:rice-predicate"></iso-art>
  <b-cap>Le code est le même. Une question sur le texte se règle en lisant un texte fini ; une question sur le comportement exige de parcourir chaque exécution.</b-cap>
  <b-why align="left">Pourquoi une question de comportement ne peut pas recevoir de réponse pour tout programme découle d’une construction. Prenons un programme quelconque $P$ et une entrée quelconque $w$ ; $P(w)$ signifie « le programme $P$ exécuté sur l’entrée $w$ ». Construisons un nouveau programme $Q$ : il exécute d’abord $P(w)$ et, quand celui-ci se termine, accomplit une étape $B$ qui brise la règle, par exemple prélever de l’argent sans commande. Si $P(w)$ ne se termine jamais, l’étape $B$ n’est jamais atteinte et la règle n’est pas brisée. Une vérification de la règle pour $Q$ doit donc savoir si $P(w)$ se termine. Le schéma ci-dessous montre cette construction, avec les formules et la conclusion juste dessous.</b-why>
  <b-art names="agent-checkpoint/rice" wide/>
  <b-cap>La preuve en un schéma : vérifier la règle pour $Q$ dirait si $P(w)$ s’arrête.</b-cap>
  Voici comment se déroule la preuve. Prenons un programme quelconque $P$ avec l’entrée $w$ et construisons à partir de lui un nouveau programme $Q$ :

  $$Q(x) \;=\; \text{run } P(w)\text{; when it finishes, run } B(x)$$

  L’étape $B(x)$ brise la règle, alors qu’un programme qui tourne indéfiniment ne la brise pas. $Q$ n’atteint donc la violation que si $P(w)$ se termine un jour :

  $$Q \text{ breaks the rule} \iff P(w) \text{ halts}$$

  Si une vérification de la règle existait pour tout programme, elle répondrait aussi, à partir de $Q$, à la question de savoir si $P(w)$ s’arrête. Cette question, le problème de l’arrêt, aucun programme ne peut la trancher : Alan Turing l’a démontré<b-proof href="https://en.wikipedia.org/wiki/Halting_problem" quote="Wikipedia: “Alan Turing proved in 1937 that the halting problem is undecidable.”"/>.
  <b-finding>
    <ex>L’agent a apporté 2 000 lignes. Une vérification que « ce code ne crée jamais de réservations qui se chevauchent » est impossible en général pour un code arbitraire, quelles que soient les améliorations.</ex>
    <gen>Il reste un choix : vérifier moins que tout, ou vérifier dans un cadre où la réponse est finie. Il n’y a pas de troisième voie, et cela vaut pour la vérification par programme comme pour la relecture humaine.</gen>
    <do>Pour une règle que vous voulez vérifier dans le travail de l’agent, demandez-vous : dans quel cadre la réponse est-elle exacte ? S’il n’y en a pas, la règle n’est vérifiée que sur des exemples.</do>
  </b-finding>
</b-chapter>

<b-chapter id="ways" icon="ring-dot" title="Trois façons de rendre une vérification finie">
  <b-why align="left">Puisqu’il n’existe pas de vérification exacte pour tout programme, la vérification est limitée pour ne plus couvrir tous les programmes. Il y a trois façons de le faire : réduire le monde vérifié, restreindre le langage dans lequel le code est écrit, ou laisser la vérification répondre honnêtement « je ne sais pas ». Le schéma met les trois côte à côte.</b-why>
  <b-art names="agent-checkpoint/three-ways" wide/>
  <b-cap>À gauche, un petit monde essayé en entier ; au centre, un seul chemin d’écriture vers la base ; à droite, trois réponses de la vérification, la troisième allant à une personne.</b-cap>
  <b-why align="left">Le tableau donne les mêmes trois façons plus en détail : comment chacune fonctionne, quelle condition du théorème elle lève et pourquoi la réponse est alors exacte, et ce qui est perdu. À quoi ressemble chaque façon pour la règle « les réservations d’une même salle ne se chevauchent jamais » est montré plus bas, sous « À quoi cela ressemble en pratique ».</b-why>
  <b-table>

| Façon | Ce qui est fait en pratique | Pourquoi la réponse est exacte | Ce qui est perdu |
|---|---|---|---|
| <b-icon name="package"/> Petit monde | écrire un modèle Quint de la réservation : 3 salles, jusqu’à 5 réservations, actions « réserver » et « annuler ». Un programme essaie chaque suite de ces actions et, après chaque pas, vérifie la règle « les réservations d’une même salle ne se chevauchent jamais » | il y a un nombre fini de variantes ; la recherche va donc jusqu’au bout et dit soit « la règle tient », soit montre la chaîne d’étapes où elle s’est brisée | une erreur qui n’apparaît qu’avec 50 réservations simultanées ne sera pas vue par une recherche à 5 |
| <b-icon name="list-check"/> Langage restreint | la règle est écrite comme une contrainte PostgreSQL, et seul le fichier `booking/repository.ts` a le droit d’écrire dans la table des réservations. À chaque modification de l’agent, une recherche vérifie qu’aucun autre fichier n’écrit dans la table des réservations | la contrainte tient en une ligne dans le schéma de la base et la base la vérifie à chaque écriture ; une recherche de fichiers se termine toujours et donne une réponse exacte | l’agent ne peut pas écrire des réservations de n’importe où : même un import massif de réservations doit passer par le même fichier autorisé |
| <b-icon name="help-circle"/> « Je ne sais pas » | la vérification d’une modification de l’agent renvoie l’une de trois réponses : « tient », « brisée », « impossible de dire ». La troisième réponse pose une étiquette « demande une personne » sur la modification | la vérification n’a pas à résoudre les cas difficiles, comme une requête de base construite à la volée à partir de chaînes : elle y dit honnêtement « impossible de dire », et là où elle dit « tient » ou « brisée », la réponse est exacte | un développeur passe du temps sur les modifications étiquetées « demande une personne » |

  </b-table>
  <b-why align="left">Plus de détails, avec la preuve de la raison pour laquelle chaque façon lève l’interdiction, dans [« Le théorème de Rice en mots simples »](/blog/rice-theorem-explained/#frames).</b-why>
  <b-subhead>À quoi cela ressemble en pratique : une règle, trois vérifications</b-subhead>
  <b-why align="left">Prenons la règle « les réservations d’une même salle ne se chevauchent jamais dans le temps » et un agent qui écrit le code de réservation. Ci-dessous, pour chaque façon : ce qui est écrit exactement, ce qui est exécuté et ce qui en sort.</b-why>
  <b-why align="left"><b-icon name="package"/> **Réduire le monde : un modèle Quint.** La règle et les actions du système sont écrites sous forme de courte description, sans code réel. Un état est un instantané des données à un moment donné : quelles réservations existent, pour quelle salle, de quand à quand. Les actions sont « réserver » et « annuler ». La règle tient en une ligne : pour deux réservations quelconques de la même salle, l’une se termine avant que l’autre ne commence.</b-why>
  <b-codebox title="La règle dans un modèle Quint">
    val noOverlap = bookings.forall(a => bookings.forall(b =>
      a == b or a.room != b.room or a.end <= b.start or b.end <= a.start))
  </b-codebox>
  <b-why align="left">Le programme essaie ensuite chaque suite d’actions pour un petit monde : 3 salles, jusqu’à 5 réservations. Si la règle se brise quelque part, il affiche la chaîne d’étapes. Par exemple : deux clients réservent la salle 2 de 10:00 à 11:00 en même temps, les deux vérifications « est-elle libre » passent avant l’une ou l’autre écriture, et la base se retrouve avec deux réservations pour le même créneau. Cette chaîne est la trouvaille : l’erreur de conception apparaît avant que l’agent n’écrive le moindre code. Un petit monde suffit, car de telles erreurs apparaissent avec seulement deux ou trois réservations.</b-why>
  <b-why align="left"><b-icon name="list-check"/> **Restreindre le langage : la règle dans la base et un seul rédacteur.** La règle passe là où la base elle-même la tient, et non dans le code de l’agent. Dans PostgreSQL, c’est une contrainte sur la table des réservations : la base refuse d’enregistrer une réservation dont l’horaire en chevauche une autre de la même salle.</b-why>
  <b-codebox title="Une contrainte PostgreSQL">
    CREATE EXTENSION IF NOT EXISTS btree_gist;
    ALTER TABLE bookings ADD CONSTRAINT no_overlap
      EXCLUDE USING gist (room_id WITH =, tstzrange(starts_at, ends_at) WITH &&);
  </b-codebox>
  <b-why align="left">La seconde moitié est un rédacteur unique : un seul module a le droit d’écrire dans la table des réservations. Cela se vérifie par une recherche dans le texte du code à chaque modification de l’agent. La commande ci-dessous trouve tous les fichiers qui écrivent dans la table des réservations sauf celui qui est autorisé ; un résultat vide signifie « pas de contournement ».</b-why>
  <b-codebox title="La vérification « rédacteur unique » par recherche dans le code">
    grep -rl "INSERT INTO bookings" src | grep -v src/booking/repository.ts
  </b-codebox>
  <b-why align="left">La question « le code de l’agent peut-il créer des réservations qui se chevauchent » est devenue deux questions sur du texte : la contrainte est-elle dans le schéma de la base, et n’y a-t-il aucune écriture qui la contourne. Les deux reçoivent une réponse exacte.</b-why>
  <b-why align="left"><b-icon name="help-circle"/> **Admettre « je ne sais pas » : trois verdicts sur une modification de l’agent.** La vérification d’une modification de l’agent est construite à partir des deux précédentes et renvoie l’une de trois réponses. « Prouvé » : le modèle Quint est passé, la contrainte de base est en place, la recherche n’a trouvé aucune écriture de contournement. « Brisé » : la recherche a trouvé que l’agent a ajouté une écriture dans la table des réservations depuis le module de rapports. « Pas sûr » : l’agent construit la requête de base à la volée à partir de chaînes, et une recherche textuelle ne peut pas dire dans quelle table elle écrit. La modification reçoit alors l’étiquette « demande une personne » et un développeur la relit. La personne ne passe du temps que sur le troisième cas.</b-why>
  <b-why align="left">Chacune des trois réponses n’est exacte que dans ses limites. La recherche prouve que la règle tient dans un modèle à 3 salles et 5 réservations, non dans la base de production avec des milliers de réservations. La recherche dans le code prouve qu’aucune écriture ne contourne la règle, non que la contrainte de base elle-même est correctement écrite. Une réponse « tient » est exacte, mais certaines modifications partent quand même vers une personne. Les façons s’emploient donc ensemble : le modèle vérifie la conception avant le code, la contrainte et la recherche vérifient le code lui-même, et une personne regarde ce qui reste avec une étiquette.</b-why>
  <b-why align="left">Il existe aussi une quatrième option, la plus courante en pratique : toujours répondre, mais se tromper parfois. Les tests par exemples et la relecture de code par un autre modèle fonctionnent ainsi. C’est un choix acceptable lui aussi, mais délibéré : bon là où une erreur coûte peu, pas pour l’argent et les accès. Une bifurcation semblable est connue dans le théorème CAP sur les systèmes distribués : pendant une partition, un serveur soit attend, soit répond d’après une copie périmée. Elles ont un point commun — tant qu’un événement n’a pas eu lieu, on ne peut pas dire s’il aura lieu plus tard ou jamais, aussi longtemps qu’on attende — mais les raisons diffèrent ; détails dans [« Le théorème de Rice en mots simples »](/blog/rice-theorem-explained/#cap).</b-why>
  <b-finding>
    <ex>La règle « les réservations ne se chevauchent jamais » : un modèle Quint a essayé tous les ordres de commandes pour 3 salles, une contrainte de base interdit le chevauchement, et un linter, programme qui vérifie le texte du code selon des règles fixées, s’assure qu’un seul module écrit dans la table des réservations.</ex>
    <gen>« Pas sûr » est un résultat honnête de la vérification. Il montre où finit le cadre et où la responsabilité revient à une personne, et fixe ainsi quel risque est accepté.</gen>
    <do>Pour chaque règle, marquez laquelle des trois façons la tient. Une règle sans marque n’est vérifiée que par des tests d’exemples.</do>
  </b-finding>
</b-chapter>

<b-chapter id="gate" icon="cube" title="L’agrégat comme point de contrôle : ce que donne l’event storming">
  <b-why align="left">L’event storming est un format d’atelier où une équipe déploie le domaine métier sous forme d’événements<b-proof href="https://www.eventstorming.com/" quote="eventstorming.com: “EventStorming is a flexible workshop format for collaborative exploration of complex business domains.”"/>. Ensuite, chaque agrégat a quatre éléments : les commandes qui le modifient, les événements qu’il émet, les modèles de lecture qui servent à le consulter, et les invariants, les règles qui tiennent dans tous les états.</b-why>
  <iso-art name="term:aggregate"></iso-art>
  <b-why align="left">Ces quatre éléments forment la frontière où une vérification s’insère bien. Chaque changement passe par des commandes, tout ce que voient les voisins sort sous forme d’événements, et les règles vivent à un seul endroit. C’est exactement la deuxième façon de la section précédente : seul l’agrégat écrit dans sa table, donc aucun autre code ne peut briser la règle, et il ne reste qu’une chose à vérifier : que rien d’autre n’écrit dans cette table.</b-why>
  <b-art names="agent-checkpoint/gate" wide/>
  <b-cap>Le point de contrôle se trouve là où les commandes entrent et où les événements sortent. À l’intérieur de la frontière, l’agent est libre.</b-cap>
  <b-why align="left">Le tableau procède ligne par ligne : lesquelles des quatre parties de l’agrégat se trouvent à la frontière et sont vérifiées par une machine et une personne, et lesquelles restent à l’intérieur et sont faites par l’agent sans relecture ligne à ligne.</b-why>
  <b-vs-grid>
    <h></h>
    <h>À la frontière (vérifié)</h>
    <h>À l’intérieur (fait par l’agent)</h>
    <c>**Commandes**</c>
    <c>lesquelles existent et ce qu’elles prennent</c>
    <c>comment les traiter</c>
    <c>**Événements**</c>
    <c>lesquels sortent et avec quels champs</c>
    <c>quand et comment les construire</c>
    <c>**Invariants**</c>
    <c>un modèle Quint, des contraintes de base</c>
    <c>du code qui ne les brise pas</c>
    <c>**Modèles de lecture**</c>
    <c>ce qu’ils montrent</c>
    <c>comment les construire vite</c>
  </b-vs-grid>
  <b-finding>
    <ex>L’agent a déplacé le stockage des réservations d’une table vers deux. La frontière est restée la même : mêmes commandes et événements, le modèle Quint passe, la contrainte de base tient. La relecture humaine se réduit à une question : la frontière a-t-elle été touchée ?</ex>
    <gen>Une fois la frontière notée, vérifier un changement de l’agent devient fini : comparer la frontière avant et après. Le code à l’intérieur peut être échantillonné.</gen>
    <do>Créez un fichier de frontière pour l’agrégat : commandes, événements, invariants, modèles de lecture. Toute modification de ce fichier appelle une relecture humaine ; celles de l’intérieur, non.</do>
  </b-finding>
</b-chapter>

<b-chapter id="size" icon="workflow" title="Comment dimensionner un contexte délimité : par la vérifiabilité">
  <b-why align="left">Passer d’un domaine métier à des contextes délimités est la partie la plus difficile du DDD. Les signes habituels d’une frontière : un mot se met à signifier autre chose, l’équipe change, des règles n’ont plus à tenir en même temps.</b-why>
  <b-callout icon="list-check">**Un critère de taille de contexte.** Un contexte est assez petit si un modèle Quint de ses règles peut être exploré jusqu’au bout avec de petits nombres et dit soit « la règle tient », soit montre une violation. Si la recherche ne se termine pas, le contexte doit être scindé. Le critère découle du théorème de Rice : une réponse exacte n’est possible que là où il y a un nombre fini de variantes et où toutes peuvent être essayées.</b-callout>
  <b-why align="left">**Comment appliquer le critère à votre projet.** Prenez une partie du système que vous considérez comme un contexte candidat, par exemple « réservation », et vérifiez-la en cinq étapes.</b-why>

  1. **Lister les règles et les actions.** Les règles sont ce qui doit toujours tenir : « les réservations d’une même salle ne se chevauchent jamais ». Les actions sont les commandes qui modifient les données : « réserver », « annuler ».
  2. **Les écrire sous forme de modèle Quint.** L’état est quelles réservations existent ; les actions sont la façon dont elles modifient l’état ; les règles sont des vérifications après chaque pas. Ce sont des dizaines de lignes, sans code réel.
  3. **Choisir de petits nombres.** 2 à 3 objets de chaque sorte : 3 salles, 5 réservations, 2 clients. En général, cela suffit pour que les combinaisons vicieuses typiques apparaissent : deux réservations d’une même salle, deux clients dans la même minute. Rien n’est garanti : une erreur qui exige davantage d’objets passera entre les mailles.
  4. **Lancer la recherche avec une limite de temps,** disons 10 minutes.
  5. **Lire le résultat avec le tableau ci-dessous.** La recherche s’est terminée sans violation : la taille convient. Elle s’est terminée et a montré une violation : la taille convient, mais les règles ou les actions contiennent une erreur à corriger. Elle ne s’est pas terminée dans la limite : il y a trop d’états, et le candidat est scindé.

  <b-callout icon="alert-circle">**Pas d’estimations.** Les nombres donnés ici sont une indication, non des seuils mesurés. Personne n’a mesuré, pour ce critère, combien d’objets suffisent à attraper les erreurs d’un contexte ni quelle limite de temps doit compter comme « trop grand ». Choisissez-les pour votre projet et notez les nombres avec lesquels le modèle a été vérifié.</b-callout>

  <b-codebox title="Lancer la recherche pour le modèle de réservation">
    quint verify booking.qnt --invariant=noOverlap --max-steps=10
  </b-codebox>
  <b-why align="left">**Comment scinder si la recherche ne s’est pas terminée.** Pour chaque règle, notez quelles données elle touche. Les règles sans données communes vont dans des parties différentes : « les réservations ne se chevauchent jamais » ne touche que les réservations, « une facture n’est jamais payée deux fois » ne touche que les factures. Entre les parties, laissez des événements comme « BookingCreated ». Vérifiez ensuite chaque partie avec les mêmes cinq étapes.</b-why>
  <b-art names="agent-checkpoint/size" wide/>
  <b-cap>Si le modèle d’un contexte répond « pas sûr », le contexte est scindé, et il ne reste que des événements entre les parties.</b-cap>
  <b-why align="left">Comment utiliser ce signe : écrire les règles du contexte sous forme de modèle Quint, fixer de petits nombres et lancer la recherche. Le résultat tombe dans l’une des lignes du tableau, et la dernière colonne dit quoi faire ensuite.</b-why>
  <b-table>

| Signe | Signification | Que faire |
|---|---|---|
| <b-status-dot color="accent">Le modèle passe avec de petits nombres</b-status-dot> | le modèle a été vérifié jusqu’au bout, sans violation | le garder |
| <b-status-dot color="warn">Le modèle ne se termine pas</b-status-dot> | trop d’états | scinder selon des règles qui n’ont pas à tenir ensemble |
| <b-status-dot color="warn">Une règle ne peut pas s’écrire sans le monde extérieur</b-status-dot> | la frontière est au mauvais endroit | reporter le monde extérieur au-delà de la frontière et lui parler par des événements |
| <b-status-dot color="accent">Seulement des événements entre les parties</b-status-dot> | les parties ne touchent pas aux données les unes des autres | chaque partie a son propre modèle et son propre agent |

  </b-table>
  <b-finding>
    <ex>Réservation, paiement et notifications dans un même modèle : la recherche ne se termine pas en une heure. La réservation seule et le paiement seul, reliés par l’événement « BookingCreated » : chaque modèle passe en quelques secondes.</ex>
    <gen>La taille du contexte cesse d’être une affaire de goût : si les règles à l’intérieur ne peuvent pas être vérifiées jusqu’au bout, le contexte est trop grand ou ses règles sont écrites dans un langage trop fort. Plus sur un agent par contexte dans [de combien d’agents IA on a besoin](/blog/agents-per-bounded-context/).</gen>
    <do>Écrivez un modèle Quint de votre plus grand contexte avec de petits nombres. Si la recherche ne se termine pas, trouvez des règles qui n’ont pas à tenir ensemble et tracez la frontière entre elles.</do>
  </b-finding>
</b-chapter>

<b-chapter id="agile" icon="refresh" title="Le premier cadre : pourquoi il sera faux et comment le rendre peu coûteux">
  <b-callout icon="help-circle">**Une question ouverte.** Comment fonctionne le choix d’un cadre n’est pas encore tout à fait clair ; cette section consigne une hypothèse préliminaire pour de futurs articles. L’hypothèse : le choix d’un cadre se heurte au même noyau commun que le théorème CAP et le théorème de Rice — tant qu’un événement n’a pas eu lieu, on ne peut pas dire s’il aura lieu plus tard ou jamais, aussi longtemps qu’on attende ; ici l’événement est une modification qui imposerait de changer de cadre : qu’elle vienne le mois prochain ou jamais, on ne peut pas le savoir d’avance. Ce noyau est traité dans [« Le lien avec le théorème CAP »](/blog/rice-theorem-explained/#cap). Il n’y a pas encore assez de faits ni d’exemples éprouvés pour l’étayer ; le reste de la section est donc à lire comme une esquisse à vérifier. C’est une direction pour des recherches ultérieures.</b-callout>
  <b-art names="agent-checkpoint/frame-question" wide/>
  <b-cap>Le cadre a été tracé autour des réservations et des salles. Si une modification sur les réservations et les salles vient ensuite, le cadre convient. Si une modification sur les réservations et les factures vient, elle franchit la frontière et le cadre doit bouger. Laquelle viendra ne peut pas être su maintenant : c’est la question ouverte.</b-cap>
  <b-why align="left">**Ce qu’il reste à élucider :**</b-why>

  - si le choix d’un cadre peut être énoncé strictement comme un problème d’information manquante, comme cela a été fait pour CAP, ou si la ressemblance n’est que verbale ;
  - dans quelle mesure l’historique des modifications passées prédit les futures : il n’y a pas de mesures, seulement des observations de projets isolés ;
  - quelle durée de cycle de revue du cadre fonctionne : les deux semaines ci-dessous sont un exemple, non un nombre éprouvé ;
  - comment deux questions sont liées : quelle taille doit avoir une partie (le théorème de Rice aide ici) et où tracer ses frontières (cela exige de l’information sur l’avenir).

  <b-why align="left">Le choix d’un cadre se heurte à une interdiction différente de celle du théorème de Rice. Une vérification de code a toute l’information, tout le code est devant elle, mais la réponse ne peut pas en être calculée. Un cadre manque de l’information elle-même. Un bon cadre est celui où vivront les changements futurs, et il n’y a de données sur l’avenir ni dans le code ni ailleurs. C’est exactement la position du serveur dans le théorème CAP : il ignore ce qui se passe chez son voisin au-delà du lien rompu, et ici personne ne sait quelles modifications viendront le mois prochain.</b-why>
  <b-why align="left">Les issues sont donc les mêmes que dans CAP. Attendre que l’avenir soit connu n’est pas possible : le travail se fait maintenant. Il reste à répondre maintenant avec ce qui est disponible et à être prêt à se tromper. « Ce qui est disponible », ce sont deux approximations de l’avenir : l’historique des modifications passées, qui montre ce qui change habituellement ensemble, et vos plans, que vous seul connaissez. Et la troisième issue de CAP, borner le temps, devient ici les cycles courts de l’agile : fixer le cadre pour deux semaines, observer comment les modifications y vivent, puis le déplacer. Comme le cadre sera de toute façon faux, l’important est qu’il soit peu coûteux à déplacer.</b-why>
  <b-why align="left">Le théorème de Rice participe encore à cette section, dans un autre rôle. Il n’aide pas à deviner l’avenir, mais fournit une vérification d’un cadre déjà choisi : si un modèle Quint des règles d’une partie peut être exploré jusqu’au bout, la partie est assez petite ; sinon, elle doit être scindée. Ce signe a été traité dans la section sur la taille du contexte.</b-why>

  <b-subhead>D’où viennent les premières parties</b-subhead>
  <b-why align="left">Inutile de connaître les parties d’avance : le premier découpage vient de ce qui existe déjà, et une personne se contente de nommer les parties et de trancher les points disputés.</b-why>
  <b-table>

| Ce qui existe | Premier découpage | Ensuite |
|---|---|---|
| <b-icon name="git-branch"/> Historique des modifications | les tables qui changent presque toujours dans les mêmes commits sont collées en une seule partie | vérifier le découpage par rapport aux epics du backlog |
| <b-icon name="list-check"/> Règles de données, pas d’historique | les tables citées dans une même règle vont dans une même partie | comparer avec l’historique après les premières dizaines de commits |
| <b-icon name="sparkle"/> Rien, démarrage à froid | une partie par concept principal : projet, rapport, epic, accès | comparer avec l’historique après les premières dizaines de commits et déplacer |

  </b-table>
  <b-why align="left">Comment fonctionne le collage par règles. Listez les règles de données, par exemple « un epic clos n’a pas de rapport ouvert », « un token ne voit que ses propres projets ». Si une règle cite deux tables, elles vont dans une même partie. Les groupes obtenus sont le premier découpage.</b-why>
  <b-art names="agent-checkpoint/first-cut" wide/>
  <b-cap>Les groupes de tables collées sont le premier découpage. Une table dont tout le monde a besoin devient un noyau commun.</b-cap>
  <b-why align="left">Là où une règle lie presque tout, comme un statut de rapport nécessaire à la fois aux epics et au tableau, cette table devient un noyau commun avec un seul propriétaire. Les autres parties n’y accèdent que par ce propriétaire. Seul le noyau écrit dans la table des statuts : ni les epics ni le tableau ne peuvent donc briser la règle du statut.</b-why>
  <b-finding>
    <ex>Les epics et les rapports sont allés dans une partie, les tokens et les projets dans une autre, et le statut du rapport est devenu le noyau. Un mois plus tard, l’historique a montré que les fichiers de projets et d’epics étaient modifiés dans les mêmes commits : les projets sont passés aux epics.</ex>
    <gen>Un cadre faux est peu coûteux à corriger : déplacer une table vers une autre partie est une modification d’une ligne, après quoi les vérifications elles-mêmes montrent si les choses se sont améliorées ou aggravées. Comme le cadre ne peut pas être deviné d’avance, il est gardé facile à déplacer.</gen>
    <do>Demandez à l’agent de vérifier le découpage par rapport à l’historique des modifications et au backlog.</do>
  </b-finding>
</b-chapter>

<b-chapter id="godel" icon="bulb" title="Où se place Gödel : seulement comme analogie">
  <b-why align="left">Le lien entre le théorème d’incomplétude de Gödel et ce sujet est une supposition personnelle ; je n’ai pas trouvé de sources qui le tracent. La raison : les preuves de Gödel comme de Rice reposent sur la même astuce, un programme ou une formule qui parle de lui-même. Mais le premier théorème de Gödel porte sur des systèmes formels dans lesquels on peut faire de l’arithmétique élémentaire<b-proof href="https://en.wikipedia.org/wiki/G%C3%B6del%27s_incompleteness_theorems" quote="Wikipedia: “Any consistent formal system F within which a certain amount of elementary arithmetic can be carried out…”"/>, et ne dit rien des frontières d’un domaine métier. Pour l’argument sur la vérification d’un agent, le résultat exact est le théorème de Rice.</b-why>
  <b-why align="left">Le second théorème est utile comme analogie : un tel système ne peut pas démontrer sa propre cohérence<b-proof href="https://en.wikipedia.org/wiki/G%C3%B6del%27s_incompleteness_theorems" quote="Wikipedia: “The second incompleteness theorem, an extension of the first, shows that no such system can demonstrate its own consistency.”"/>. Traduit pour le travail avec des agents : un agent ne peut pas confirmer seul qu’il a bien fait son travail ; il lui faut un vérificateur hors de son cadre. C’est une image, sans conclusion mathématique derrière.</b-why>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Questions fréquentes">
  <b-faq-cards>
    <q t="Où faut-il vérifier le travail d’un agent IA ?">À la frontière de l’agrégat : sur les commandes, les événements et les règles qui doivent toujours tenir. Une machine peut vérifier cette frontière jusqu’au bout, et l’agent écrit le code à l’intérieur.</q>
    <q t="Que dit le théorème de Rice en mots simples ?">Aucun programme ne peut dire, pour tout programme, s’il possède une propriété de comportement donnée. La vérification est donc réduite : par un petit monde, un langage restreint ou un honnête « je ne sais pas ».</q>
    <q t="Comment dimensionner un contexte délimité ?">Outre les changements de sens des mots et d’équipe, il existe un signe vérifiable : un modèle des règles du contexte doit se terminer avec de petits nombres. Sinon, le contexte est scindé selon des règles qui n’ont pas à tenir ensemble.</q>
    <q t="Comment choisir le premier cadre sans historique des modifications ?">Les tables citées dans une même règle de données vont dans une même partie, et s’il n’y a pas encore de règles, commencer par une partie par concept principal. Après les premières dizaines de commits, comparer le découpage avec l’historique et le déplacer.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="À lire ensuite">
  <b-links>
    <item href="/blog/specs-by-aggregates/" k="Spécifications" t="Spécifications par agrégat">la fiche d’agrégat et les niveaux d’exigence</item>
    <item href="/blog/agents-per-bounded-context/" k="Agents" t="De combien d’agents IA on a besoin">un agent par contexte délimité</item>
    <item href="/blog/quint-vs-tests-and-tla/" k="Vérifications" t="Vérification de modèles et tests">Quint, QUnit et TLA+</item>
    <item href="/blog/quint-models-find-races/" k="Modèles" t="Trouver les race conditions">les modèles Quint en pratique</item>
    <item href="/blog/rice-theorem-explained/" k="Théorie" t="Le théorème de Rice en mots simples">prédicat, preuve, trois cadres</item>
  </b-links>
</b-chapter>
<b-footer>Faits : à la date du 6 novembre 2026, d’après Wikipedia (théorèmes de Rice et de Gödel) et eventstorming.com. L’exemple de la réservation est illustratif.</b-footer>
</b-post>
