---
title: Comment trouver une race condition dans le code : un modèle Quint essaie tous les ordres d’actions
date: 2026-10-25
updated: 2026-11-08
description: Comment trouver une race condition dans le code : un modèle Quint essaie tous les ordres d’actions et montre la chaîne où une règle se brise. Exemples et limites.
tags: IA, spécifications, Quint, vérification formelle, tests, harness, race condition, vérification de modèles, data races
category: specs
layout: wide
mentions: Quint, Apalache, TLA+, model checking, formal verification, race condition, lost data, Claude Code, hooks, spec-driven development
toc: idea=L’idée | found=Ce que les modèles ont trouvé | pair=La paire | domains=Un modèle par domaine | teeth=Vérifier les vérifications | human=Où l’humain intervient | weak=Points faibles | start=Par où commencer | agent=Avec un agent | faq=FAQ | next=Pour aller plus loin
---

Une race condition se trouve en vérifiant tous les ordres dans lesquels deux opérations peuvent s’exécuter. Les tests ne couvrent que les ordres imaginés, alors qu’un modèle Quint les essaie tous seul et affiche la chaîne d’étapes où une règle se brise, par exemple un plantage en pleine écriture ou deux administrateurs en même temps, y compris dans du code écrit par un agent IA.

<b-post series="harness">
<b-art names="quint-models-find-races/intro" wide/>
<b-cap>Un test suit le scénario imaginé ; un modèle parcourt tous les scénarios d’un petit monde.</b-cap>

<b-chapter id="idea" icon="workflow" title="Comment fonctionne un modèle Quint : tous les scénarios au lieu de deviner">
  <b-why align="left">Le nom [Quint](/materials/glossary/quint/) se confond facilement avec le moteur de tests QUnit, mais c’est un autre programme : [comparaison avec les tests et TLA+](/blog/quint-vs-tests-and-tla/). La différence entre Quint, [TLA+](/materials/glossary/tla-plus/) et Alloy est traitée dans la [comparaison des trois langages](/blog/tla-alloy-quint-compare/). Un test ordinaire est un scénario imaginé à l’avance : cliquer, attendre, vérifier le résultat. Un bug auquel personne n’a pensé n’est pas dans ce scénario. Un modèle fonctionne autrement. On décrit les états du système et les actions permises, et le programme essaie tous les ordres d’actions dans un petit monde et montre le premier où une règle se brise.</b-why>
  <b-art names="quint-models-find-races/explore" wide/>
  <b-why align="left">Un modèle décrit un domaine de logique, comme la vie de l’enregistrement d’une réunion ou les droits d’accès d’un membre, et compte de quelques dizaines à quelques centaines de lignes. Viennent ensuite quelques histoires : ce que le modèle a trouvé exactement et pourquoi un test ne l’a pas vu.</b-why>
  <b-why align="left">Voici le fonctionnement pas à pas. D’abord on choisit un petit monde : par exemple un administrateur, un bot et une session. Puis on décrit ce qui peut arriver dans ce monde : se connecter, se déconnecter, un plantage du processus, un nouveau message. Le programme essaie tous les ordres de ces événements et vérifie les règles après chaque pas. Ce genre de recherche s’appelle la [vérification de modèles](/materials/glossary/model-checking/). Si une règle se brise, on obtient la chaîne exacte des étapes, que l’on peut rejouer à la main.</b-why>
  <b-why align="left">Le monde est petit à dessein. Le nombre d’ordres croît vite avec la taille du monde ; deux ou trois entités et cinq ou six actions donnent donc généralement un résultat en quelques secondes. Cela suffit pour les races : deux actions n’ont besoin que de deux participants pour se chevaucher.</b-why>
  <b-finding>
    <ex>Un test vérifie le scénario imaginé ; un modèle vérifie tous les scénarios possibles dans le petit monde choisi.</ex>
    <gen>Les bugs du genre « deux actions se sont chevauchées dans le temps » viennent rarement à l’esprit à l’avance<b-proof href="https://quint-lang.org/" quote="Quint: an executable specification language, a modern TLA+ alternative for software engineers"/>.</gen>
    <do>Choisissez une règle que vous craignez de perdre et écrivez-la en dix lignes.</do>
  </b-finding>
</b-chapter>

<b-chapter id="found" icon="bug" title="Quelles erreurs un modèle Quint trouve : exemples">
  <b-why align="left">La principale valeur d’un modèle, ce sont les trouvailles que personne ne cherchait. Ci-dessous, les deux plus parlantes et la liste des autres. Elles ont une même forme, une [race condition](/materials/glossary/race-condition/) : deux actions, chacune correcte seule, provoquent ensemble une perte ou une confusion.</b-why>
  <b-sublabel>Histoire 1 : une course entre connexion et déconnexion</b-sublabel>
  <b-why align="left">Détaillons la première histoire. Supposons qu’une personne ait une session Telegram dans le système, et qu’un administrateur puisse y mettre fin. Au même moment, un bot peut utiliser cette session pour envoyer un message. Le code vérifiait d’abord que la session était vivante, puis passait à l’envoi. Entre la vérification et l’envoi, l’administrateur a eu le temps de déconnecter. Résultat : le message est parti au nom d’une personne dont l’accès était déjà fermé.</b-why>
  <b-why align="left">Aucun test ne l’a attrapé, car chaque étape fonctionne correctement isolément. L’erreur ne vit que dans l’ordre « vérifier, déconnecter, envoyer », et le modèle a trouvé cet ordre tout seul.</b-why>
  <b-art names="quint-models-find-races/race" wide/>
  <b-cap>Un administrateur se déconnecte pendant qu’un bot se connecte avec l’ancienne session. Le code a vérifié les droits une seule fois, au début, et s’est fié au résultat ensuite.</b-cap>
  <b-sublabel top="22">Histoire 2 : un enregistrement et un plantage</b-sublabel>
  <b-why align="left">La deuxième histoire concerne une perte de données. Un système de transcription enregistre une réunion et doit, à un moment, marquer qu’un enregistrement est en cours. Si le processus plante entre le début de l’enregistrement et ce marquage, après le redémarrage, le système ignore que l’enregistrement a existé. Le fichier est là, l’entrée en base non. L’utilisateur voit un vide à la place de la réunion.</b-why>
  <b-why align="left">Le remède est simple : poser le marquage avant le début de l’enregistrement, non après. Mais pour remarquer le problème, il faut imaginer un plantage précisément dans cet intervalle, et le modèle le fait sans effort, car un plantage est l’une de ses actions ordinaires.</b-why>
  <b-art names="quint-models-find-races/crash" wide/>
  <b-cap>Un enregistrement était en cours, le processus a planté, et aucun marquage « enregistrement en cours » n’est resté nulle part. Après le redémarrage, le système croit qu’il n’y a pas eu d’enregistrement, et les données sont perdues sans trace.</b-cap>
  <b-sublabel top="22">Autres trouvailles</b-sublabel>
  <b-rules cols="2">
    <rule icon="copy" t="Un point sur deux cartes">Un enregistrement a été repris, l’analyse a nommé un autre responsable</rule>
    <rule icon="check-square" t="Un ☑ perdu">Un point a perdu son responsable et a disparu avec « fait »</rule>
    <rule icon="close-alt" t="Suppression d’un élément non vide">La boîte « supprimer une balise vide » est restée ouverte, un bot a ajouté un membre</rule>
    <rule icon="key" t="Clés plus larges que les droits">Les droits d’une personne ont été réduits, ses clés fonctionnent comme avant</rule>
    <rule icon="user-alt" t="Un message à un inconnu">Un nom d’utilisateur est passé à quelqu’un d’autre</rule>
    <rule icon="chat-square" t="Une citation étrangère">Un message a été déplacé vers un autre poste, l’indice a gardé l’ancienne citation</rule>
  </b-rules>
  <b-why align="left">Comment lire la liste ci-dessus. Chaque ligne a la classe d’erreur à gauche et un exemple à droite. « Un point sur deux cartes » et « un ☑ perdu » relèvent des tâches de réunion, « suppression d’un élément non vide » et « clés plus larges que les droits » du côté administrateur, « un message à un inconnu » et « une citation étrangère » de la messagerie.</b-why>
  <b-why align="left">Les six ont un trait commun : des données appartenaient à un propriétaire puis se sont retrouvées chez un autre ou ont disparu. C’est pourquoi vérifier le propriétaire au moment de l’action, et non à l’avance, ferme presque toute la liste.</b-why>
  <b-finding>
    <ex>Presque toutes les trouvailles relèvent d’une même classe : deux actions se sont chevauchées, et le code n’a vérifié la condition qu’une fois.</ex>
    <gen>Le remède est unique aussi : revérifier la condition au moment de l’action côté serveur, ou placer les actions sous un même verrou.</gen>
    <do>Trouvez dans votre code un endroit où la vérification et l’action sont séparées par l’attente d’une réponse.</do>
  </b-finding>
</b-chapter>

<b-chapter id="pair" icon="swap" title="Une paire de modèles : tel quel et tel qu’exigé">
  <b-why align="left">Pour chaque domaine, deux versions du modèle sont conservées dans un même fichier. La première copie le code tel qu’il est et doit reproduire un bug connu. La seconde décrit l’exigence : la règle n’est jamais brisée. Un interrupteur en haut du fichier active les correctifs, si bien que la différence entre les versions se voit d’emblée.</b-why>
  <b-art names="quint-models-find-races/pair" wide/>
  <b-cap>À gauche, le chemin vers la pièce rouge, la violation, est ouvert. À droite, une barrière se dresse sur ce chemin et la règle tient.</b-cap>
  <b-vs-grid>
    <h></h>
    <h>current : le code tel quel</h>
    <h>fixed : l’exigence</h>
    <c>**Rôle**</c>
    <c>reproduit le bug par un scénario</c>
    <c>montre que le correctif ferme le bug</c>
    <c>**La règle**</c>
    <c>est violée</c>
    <c>tient</c>
    <c>**Correctifs**</c>
    <c>aucun</c>
    <c>chacun est étiqueté et marqué « was: … »</c>
  </b-vs-grid>
  <b-why align="left">Le tableau a trois lignes. La première dit à quoi sert chaque modèle : celui de gauche reproduit le bug trouvé, celui de droite montre que l’exigence peut être satisfaite. La deuxième ligne montre le résultat attendu de la vérification : à gauche la règle est violée, à droite elle tient. Si à gauche elle ne l’est soudain plus, le modèle a cessé de refléter le code, et c’est un signal pour le mettre à jour.</b-why>
  <b-why align="left">La troisième ligne concerne les correctifs. Chaque différence du modèle de droite par rapport à celui de gauche porte une étiquette comme П1, П2 (la lettre П correspond au mot russe pour « correctif ») et une note « was: … ». Ces étiquettes permettent d’aller de l’exigence à un endroit précis du code et de voir exactement quoi changer.</b-why>
  <b-finding>
    <ex>Un fichier contient les deux variantes : un interrupteur active les correctifs, la comparaison avant-après est donc toujours à portée de main.</ex>
    <gen>Chaque bug devient un court scénario de régression qui échoue sur l’ancienne version et passe sur la nouvelle.</gen>
    <do>Commencez un tableau d’exigences avec une colonne « se prête à un modèle » et marquez les trois premières lignes.</do>
  </b-finding>
</b-chapter>

<b-chapter id="domains" icon="boxes-link" title="Un modèle pour chaque domaine">
  <b-why align="left">Chaque [contexte délimité](/materials/glossary/bounded-context/) a ses propres règles, écrites en MUST dans une [fiche d’agrégat](/blog/specs-by-aggregates/). Un modèle formel rend ces règles vérifiables, et un [agent par contexte](/blog/agents-per-bounded-context/) travaille dans leurs frontières.</b-why>
  <b-art names="quint-models-find-races/contexts" wide/>
  <b-rules cols="2">
    <rule icon="users" t="Réunion">Les participants d’un enregistrement ne passent jamais au suivant sur le même lien</rule>
    <rule icon="lock" t="Données privées">Un enregistrement privé n’atteint jamais le stockage commun</rule>
    <rule icon="user-alt" t="Membre">Un ID Telegram, une fiche, l’historique n’est jamais perdu</rule>
    <rule icon="target" t="Poste">Le statut d’un poste n’appartient qu’au candidat de son appariement</rule>
  </b-rules>
  <b-why align="left">Ce qui se cache derrière chaque exemple. « Réunion » est la règle selon laquelle les personnes de l’enregistrement précédent ne passent pas dans le suivant, même si le lien de la réunion est le même. « Données privées » signifie qu’un enregistrement privé ne peut finir dans le stockage commun dans aucun ordre d’actions. « Membre » signifie qu’un compte Telegram correspond à une fiche de membre et que l’historique survit à une fusion. « Poste » signifie qu’un statut sur un poste appartient à une paire précise candidat-poste, et non au candidat en général.</b-why>
  <b-finding>
    <ex>Une règle MUST d’une fiche d’agrégat devient une propriété du modèle, et une violation retourne à l’agent de ce contexte sous forme de chaîne d’étapes.</ex>
    <gen>La frontière d’un contexte sert trois choses à la fois : la spécification, l’agent et le modèle.</gen>
    <do>Choisissez un contexte et une règle MUST et écrivez le premier modèle pour eux.</do>
  </b-finding>
</b-chapter>

<b-chapter id="teeth" icon="shield-check" title="Vérifier les vérifications">
  <b-why align="left">Un résultat vert peut signifier « tout est correct » ou « la vérification n’a rien vérifié ». Les vérifications elles-mêmes sont donc vérifiées : l’auteur ou un agent casse le modèle exprès (par exemple en retirant une condition) pour voir si la règle le remarque. Sinon, la règle est inutile.</b-why>
  <b-sublabel>Exemple : part des règles que le code actuel d’un système d’enregistrement de réunions viole</b-sublabel>
  <b-count-bars>
    <bar k="Participants" w="100%" color="c-none">2 sur 2</bar>
    <bar k="Fiches de personnes" w="75%" color="c-none">3 sur 4</bar>
    <bar k="Remise des bugs" w="67%" color="c-none">2 sur 3</bar>
    <bar k="Objectif de réunion" w="57%" color="c-light">4 sur 7</bar>
    <bar k="Enregistrement" w="50%" color="c-light">2 sur 4</bar>
    <bar k="Confidentialité" w="25%" color="c-work">1 sur 4</bar>
  </b-count-bars>
  <b-why align="left">Les barres montrent la part des règles que le code actuel viole. Plus la barre est longue, plus le modèle a attrapé de règles sur du code réel. « Participants 2 sur 2 » signifie que les deux vérifications ont trouvé un problème. « Confidentialité 1 sur 4 » signifie que le code tient en grande partie, mais qu’un trou existe.</b-why>
  <b-why align="left">Ce n’est pas une note de qualité du code. Une barre dépend des règles choisies et en montre davantage là où le modèle a apporté le plus.</b-why>
  <b-art names="quint-models-find-races/mutant" wide/>
  <b-cap>Une copie cassée du modèle doit déclencher la règle. Si elle passe sans que rien ne se déclenche, la règle ne vérifie rien.</b-cap>
  <b-sublabel top="22">Une vérification automatique après chaque modification du modèle</b-sublabel>
  <b-art names="quint-models-find-races/hook" wide/>
  <b-cap>Après chaque modification du modèle, une vérification se lance automatiquement. Si une règle est violée, l’agent reçoit la chaîne d’étapes et corrige aussitôt le modèle ou le code.</b-cap>
  <b-rules cols="2">
    <rule icon="file-check" t="Un en-tête comme contrat">Quelles règles, ce qui doit échouer, quelles situations doivent se produire</rule>
    <rule icon="flask" t="Une copie cassée">Une règle que le code satisfait déjà doit échouer sur une copie avec un défaut</rule>
    <rule icon="eye" t="Situations qui doivent se produire">« Si A alors B » ne veut rien dire tant que A n’a pas eu lieu</rule>
    <rule icon="ban" t="Impasses">Le programme écarte silencieusement les exécutions en impasse et affiche « ok »</rule>
    <rule icon="eye-wide" t="Intention séparée">Ce que voulait l’utilisateur est consigné indépendamment du champ testé</rule>
    <rule icon="refresh-cw" t="Vérification automatique">Une violation retourne à l’agent juste après la modification</rule>
  </b-rules>
  <b-why align="left">Ce que signifie chaque ligne. « Un en-tête comme contrat » signifie que le haut du fichier liste les règles, les violations attendues et les situations qui doivent se produire. « Une copie cassée » vérifie qu’une règle est capable de se déclencher. « Situations qui doivent se produire » protège contre les règles « si A alors B » où A n’a jamais eu lieu. Les « impasses » sont les cas où le programme écarte silencieusement une exécution et où « ok » sort tout seul.</b-why>
  <b-why align="left">Les deux dernières lignes concernent les personnes et les agents. « Intention séparée » signifie que le souhait de la personne est consigné dans le modèle indépendamment du champ testé, sinon la règle compare un champ avec lui-même. « Vérification automatique » (en fait un [hook](/materials/glossary/hooks/)) signifie qu’un agent ne peut pas oublier de lancer le modèle : il se lance seul après chaque modification.</b-why>
  <b-finding>
    <ex>Un modèle vert sans ces vérifications ne prouve rien : une règle peut tenir parce que la situation nécessaire ne se présente jamais.</ex>
    <gen>Par défaut, le programme répond « ok » pour un échantillon, non pour une preuve<b-proof href="https://apalache-mc.org/" quote="Apalache: the symbolic model checker for TLA+"/>.</gen>
    <do>Pour chaque règle immédiatement verte, écrivez un défaut qui la casse.</do>
  </b-finding>
</b-chapter>

<b-chapter id="human" icon="users" title="Où l’humain intervient">
  <b-why align="left">Un modèle vérifie tout ce qui peut s’écrire comme une liste finie de conditions : un enregistrement a-t-il disparu, des participants se sont-ils mélangés, existe-t-il une issue à une impasse. La clarté des libellés, la commodité et l’impression d’ensemble d’un écran ne se décrivent pas ainsi ; une personne en juge donc sur une maquette.</b-why>
  <b-art names="quint-models-find-races/boundary" wide/>
  <b-two-lists>
    <list icon="cpu" t="Le modèle vérifie" items="si un enregistrement a disparu|si des participants se sont mélangés|si une action dangereuse demande confirmation|s’il existe une issue à une impasse"></list>
    <list icon="user" t="Une personne vérifie" items="si les libellés sont clairs|si le panneau est surchargé|si le choix est commode|si l’extension s’installe sur un profil vierge"></list>
  </b-two-lists>
  <b-why align="left">La liste de gauche contient tout ce qui peut se formuler en « toujours » ou « jamais » : un enregistrement ne disparaît pas, les participants ne se mélangent pas, une action dangereuse demande confirmation. Le modèle vérifie ces règles complètement.</b-why>
  <b-why align="left">La liste de droite contient ce qui n’a pas de liste finie de caractéristiques. La clarté d’un libellé se décide chez le lecteur. Dans le tableau d’exigences, les lignes « demande une vérification humaine » sont donc marquées d’avance et on ne cherche pas à les formaliser.</b-why>
  <b-finding>
    <ex>Les règles d’écran deviennent elles aussi vérifiables : confirmation, motif sur un bouton désactivé, état honnête.</ex>
    <gen>Le goût et la clarté n’ont pas de liste finie de caractéristiques ; ils se vérifient donc sur une maquette.</gen>
    <do>Marquez d’avance les lignes « demande une vérification humaine » dans le tableau d’exigences, pour ne pas courir après une formule.</do>
  </b-finding>
</b-chapter>

<b-chapter id="weak" icon="alert" title="Points faibles de la vérification de modèles">
  <b-why align="left">La méthode a des limites, et mieux vaut les connaître avant de commencer. Un modèle ne suit pas le code de lui-même, ne vérifie pas « tôt ou tard », et ne voit que le monde qu’on y met.</b-why>
  <b-rules cols="2">
    <rule icon="link" t="Pas de lien avec le code">Les modèles sont écrits à la main, ils dérivent donc du code</rule>
    <rule icon="clock" t="Pas de vérifications « tôt ou tard »">Qu’un bug atteigne finalement l’équipe ne se vérifie qu’indirectement</rule>
    <rule icon="scales" t="Un monde minuscule">Un bug qui exige cinq entités peut passer entre les mailles</rule>
    <rule icon="circle-dot" t="Verts vides">Une règle tient parce que la fonctionnalité n’est pas encore dans le code</rule>
  </b-rules>
  <b-why align="left">Pas de lien avec le code : un modèle s’écrit à la main, et rien ne l’oblige à évoluer avec le code. Un mois plus tard, il peut décrire ce qui n’existe plus. Le remède : garder dans l’en-tête le commit d’où le modèle a été tiré et le mettre à jour avec le code. Un remède plus fort consiste à faire passer des traces du modèle dans le vrai gestionnaire, mais cette étape n’existe pas encore. Une tâche voisine, garder l’état souhaité, le code et la mesure d’accord, est traitée dans l’article sur la [boucle de réconciliation des spécifications](/blog/spec-reconcile-loop/).</b-why>
  <b-why align="left">Pas de vérifications « tôt ou tard » : qu’un bug atteigne finalement l’équipe ne se vérifie qu’indirectement. Un monde minuscule : un bug qui exige cinq entités à la fois peut passer entre les mailles. Verts vides : une règle tient uniquement parce que la fonctionnalité nécessaire n’est pas encore dans le code, et le vert est trompeur.</b-why>
  <b-finding>
    <ex>Un modèle ne décrit que ce qu’on y met, et sans vérification par rapport au code il prend du retard.</ex>
    <gen>L’étape suivante dans ce domaine est de faire passer des traces du modèle dans le vrai gestionnaire et de comparer les résultats.</gen>
    <do>Consignez dans l’en-tête d’un modèle le commit d’où il a été tiré et mettez-le à jour avec le code.</do>
  </b-finding>
</b-chapter>

<b-chapter id="start" icon="flag" title="Par où commencer avec Quint : un premier modèle en une soirée">
  <b-why align="left">Un ordre pour la première soirée. Ouvrez la liste des bugs corrigés et choisissez-en un dont la cause est l’ordre ou le moment des événements. Notez les participants et les actions qui y ont mené. Décrivez-les dans un modèle, lancez-le et attendez que le programme trouve lui-même la chaîne. Ajoutez ensuite le correctif sous un interrupteur et vérifiez que la règle tient. Enfin, cassez le modèle exprès et vérifiez que la règle le remarque.</b-why>
  <b-why align="left">Inutile de modéliser tout le produit d’un coup. Prenez un bug récent qui a dû être corrigé deux fois ou qu’un utilisateur a trouvé. Décrivez dans un modèle ses participants et deux ou trois actions, lancez la recherche et vérifiez que le programme trouve ce bug sans indice. Corrigez-le ensuite et vérifiez que la règle tient.</b-why>
  <b-finding>
    <ex>Le premier modèle peut s’écrire en une soirée si l’on prend un bug qui a déjà eu lieu.</ex>
    <gen>L’historique des bugs corrigés donne une liste toute prête de règles pour les modèles suivants.</gen>
    <do>Prenez votre dernier bug corrigé et énoncez la règle qui l’aurait empêché de revenir.</do>
  </b-finding>
</b-chapter>

<b-chapter id="agent" icon="cpu" title="Comment commencer avec un agent">
  <b-art names="quint-models-find-races/agent" wide/>
  <b-why align="left">**1. Installer Quint.** L’agent l’installe lui-même via npm<b-proof href="https://github.com/informalsystems/quint" quote="The quickest way to install Quint is using npm."/>.</b-why>
  <b-prompt>
    Installe Quint pour toi et vérifie qu’il fonctionne.
  </b-prompt>
  <b-why align="left">**2. D’abord les exigences, pas le code.** Ainsi l’[agent](/materials/glossary/ai-agent/) décrit d’abord le monde et ne modifie le code qu’ensuite.</b-why>
  <b-prompt>
    Ne change pas le code. Fais des exigences en Quint pour [domaine].
    Pour chaque règle, montre deux versions : telle qu’elle est maintenant et telle qu’elle doit être.
  </b-prompt>
  <b-why align="left">**3. Vérifier le résultat.**</b-why>
  <b-rules cols="2">
    <rule icon="swap" t="Deux versions">La règle est brisée « telle quelle » et tient « telle qu’exigée »</rule>
    <rule icon="eye" t="Situations nécessaires">Elles se produisent et ne sont pas évitées</rule>
    <rule icon="flask" t="Une copie cassée">Elle déclenche la règle</rule>
    <rule icon="bug" t="Un cas réel">Le modèle le reproduit</rule>
  </b-rules>
  <b-why align="left">**4. Logique et écran séparés.** Par défaut, un agent les confond : il écrit des règles d’écran comme de la logique et saute des cas dans la logique.</b-why>
  <b-prompt>
    Fais deux listes d’exigences.
    1. Logique : seulement « toujours » et « jamais », vérifié par un modèle Quint.
    2. Écran : clarté et commodité, que je vérifierai moi-même sur une maquette.
  </b-prompt>
</b-chapter>

<b-chapter id="faq" icon="chat" title="FAQ">
  <b-faq-cards>
    <q t="Qu’est-ce que Quint et à quoi sert-il ?">Quint est un langage pour décrire les états d’un système, ses actions et les règles qui doivent toujours tenir. Un programme essaie tous les ordres d’actions et montre la chaîne d’étapes où une règle se brise.</q>
    <q t="Comment trouver les race conditions et les pertes de données que les tests manquent ?">Décrivez dans un modèle les participants et deux ou trois actions, puis lancez la recherche. Le modèle trouve des ordres comme « vérifier, déconnecter, envoyer » que personne n’a pensé à écrire comme test.</q>
    <q t="Un modèle Quint remplace-t-il les tests ordinaires ?">Non, ils répondent à des questions différentes. Un test protège une fonction, tandis qu’un modèle vérifie des règles qui dépendent de l’ordre des événements ; une chaîne d’étapes trouvée par le modèle devient un court test de régression.</q>
    <q t="Comment commencer avec Quint ?">Prenez un bug récemment corrigé dont la cause tient à l’ordre ou au moment des événements. Décrivez ses participants et deux ou trois actions, lancez la recherche et vérifiez que le programme trouve le bug tout seul.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Pour aller plus loin">
  <b-links>
    <item href="/blog/quint-vs-tests-and-tla/" k="Comparaison" t="Vérification de modèles et tests : Quint, QUnit, TLA+">En quoi Quint diffère de QUnit, Jest et TLA+ et que choisir</item>
    <item href="/blog/agents-per-bounded-context/" k="Agents" t="De combien d’agents IA on a besoin">Un agent par contexte délimité</item>
    <item href="/blog/spec-reconcile-loop/" k="Spécifications" t="Une boucle de réconciliation pour les spécifications">Fermer la boucle entre état souhaité, code et mesure</item>
    <item href="/blog/specs-by-aggregates/" k="Spécifications" t="Spécifications par agrégats">Une entrée par concept, exigences avec MUST et SHOULD</item>
  <item href="/blog/tla-alloy-quint-compare/" k="Comparaison" t="TLA+, Alloy ou Quint">Quel langage de spécification choisir</item>
  </b-links>
</b-chapter>
<b-footer>Faits : les cas décrits à la date du 25 octobre 2026, documentation de Quint et d’Apalache. Les chiffres des exemples sont illustratifs ; votre code sera différent.</b-footer>
</b-post>
