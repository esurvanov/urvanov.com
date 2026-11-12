---
title: Le théorème de Rice en mots simples : pourquoi aucune vérification ne marche sur tous les programmes et que faire
date: 2026-11-06
updated: 2026-11-13
description: Ce que dit le théorème de Rice et pourquoi vérifier le comportement d'un programme se heurte au problème de l'arrêt. Prédicats sur le texte et sur le comportement, une preuve sur un exemple de paiement, le lien avec le paradoxe du barbier et trois cadres qui rendent une vérification exacte.
tags: théorème de Rice, problème de l'arrêt, paradoxe du barbier, prédicat, vérification formelle, Quint, DDD, agents
category: specs
layout: wide
math: true
mentions: Rice's theorem, CAP theorem, chaos engineering, fail-fast, Kubernetes, halting problem, barber paradox, Russell's paradox, Alan Turing, predicate, undecidability, declarative approach, imperative approach, model checking, ubiquitous language, bounded context
toc: essence=L'essentiel | predicate=Issue 1 : texte du code | small-model=Issue 2 : modèle | human=Issue 3 : une personne | proof=Preuve | root=D'où vient l'astuce | frames=Trois cadres | cap=Lien avec CAP | faq=Questions | next=À lire ensuite
---

Le théorème de Rice dit qu'aucun programme ne peut toujours dire correctement, pour n'importe quel autre programme, comment il se comportera, par exemple s'il débitera de l'argent sans commande. Tout programme peut en contenir un autre, et la réponse dépend alors de la terminaison du programme contenu, ce qu'aucun programme ne peut décider. En pratique, la question est donc restreinte : vérifier le texte du code, un petit modèle des règles, ou confier les cas difficiles à une personne.

<b-post series="agg">
<b-hchain label="Chaîne : Russell 1901, Turing 1936, Rice 1951, cadre">
  <step icon="help-circle" t="Russell, 1901">l'ensemble s'appartient-il à lui-même ?</step>
  <step icon="cpu" t="Turing, 1936">le programme s'arrêtera-t-il ?</step>
  <step icon="alert-circle" t="Rice, 1951">pareil pour tout comportement</step>
  <step icon="ring-dot" t="Cadre">là où la vérification marche</step>
</b-hchain>

<b-chapter id="essence" icon="alert-circle" title="L'essentiel : ce qu'interdit le théorème de Rice">
  <b-why align="left">L'interdiction porte sur un vérificateur unique pour tous les programmes à la fois : pour un programme précis, on peut souvent trouver une réponse. Dans sa forme stricte, le théorème dit qu'aucun programme ne peut vérifier une propriété de comportement que certains programmes ont et d'autres non<b-proof href="https://en.wikipedia.org/wiki/Rice%27s_theorem" quote="Wikipedia: “Rice's theorem states that all non-trivial semantic properties of programs are undecidable.”"/>. Henry Gordon Rice l'a démontré dans sa thèse de 1951<b-proof href="https://en.wikipedia.org/wiki/Rice%27s_theorem" quote="Wikipedia: “The theorem is named after Henry Gordon Rice, who proved it in his doctoral dissertation of 1951 at Syracuse University.”"/>.</b-why>
  <b-why align="left">Comment le lire en termes courants. Imaginez un vérificateur à qui l'on remet un programme quelconque en demandant : « Débitera-t-il un jour de l'argent sans commande ? » Le vérificateur peut être aussi astucieux qu'on veut, travailler aussi longtemps qu'on veut et connaître tous les langages de programmation. Le théorème dit qu'il existe quand même un programme sur lequel il répond faux ou ne répond jamais. C'est une propriété de la tâche elle-même, et améliorer le vérificateur ne la lève pas, comme améliorer un plan ne produit pas un mouvement perpétuel. Dans le schéma ci-dessous, le vérificateur est le cube bleu : il regarde les programmes un par un et répond « respecte » ou « enfreint » pour chacun. Le programme orange à droite est construit contre cette vérification même, à partir de son propre texte : sur lui, la réponse est fausse ou n'arrive jamais. Une autre vérification a son propre programme de ce genre.</b-why>
  <iso-art name="term:rice-theorem"></iso-art>
  <b-why align="left">Imaginez qu'une vérification automatique ait été ajoutée à la boutique. Elle lit chaque modification du code de paiement et répond : « cette modification ne débitera jamais d'argent sans commande » ou « elle en débitera ». Pour qu'on puisse se fier à une telle vérification, il lui faut trois choses, numérotées dans le schéma ci-dessous.</b-why>

  1. **Une réponse sur le comportement.** La vérification doit dire ce que fera le code à l'exécution : débite-t-il de l'argent ne serait-ce que sur un seul des achats qui passeront un jour par lui. Ces achats ne finissent jamais, et les tests ne peuvent pas tous les essayer.
  2. **Une vérification pour toute modification.** On ne peut pas restreindre d'avance le code qui peut arriver : la vérification fonctionne sur n'importe quel code qu'on lui donne, même écrit pour la tromper.
  3. **Une réponse pour chaque modification.** Seulement « débitera » ou « ne débitera pas », sans « je ne sais pas » : la vérification avant fusion ne peut que laisser passer une modification ou la bloquer.

  <b-why align="left">En plus de ces trois propriétés, la réponse doit être juste : « ne débitera pas » signifie « ne débitera certainement pas ». Il existe des vérifications qui répondent toujours mais se trompent parfois : les tests et les heuristiques. Elles sont utiles, mais on ne peut pas les croire sur parole, et dans la suite il n'est question que de vérifications correctes.</b-why>

  <b-why align="left">Le théorème de Rice dit : une vérification correcte ayant les trois propriétés n'existe pas ; sur une modification, elle se trompera ou ne répondra pas. Dans le schéma, c'est la barre orange. Retirez n'importe laquelle des propriétés et une vérification correcte devient possible, mais pour une question restreinte. Laquelle retirer est le choix fait en pratique : le bas du schéma montre trois options.</b-why>
  <b-lane title="Trois propriétés d'une vérification" color="accent">
  <b-scene names="rice-theorem-explained/conditions"/>
  <b-pick-tabs id="rice-cond" group="rice-k" tone="accent">
    <tab t="Sur le comportement">
    </tab>
    <tab t="Toute modification">
    </tab>
    <tab t="Toujours une réponse">
    </tab>
  </b-pick-tabs>
  </b-lane>
  <b-table id="rice-wishes">

| <label for="rice-cond1"><b-icon name="play"/> 1. Sur le comportement</label> | <label for="rice-cond2"><b-icon name="file-text"/> 2. Toute modification</label> | <label for="rice-cond3"><b-icon name="help-circle"/> 3. Toujours une réponse</label> |
|---|---|---|
| **Sens :** ce que le code fera sur tous les achats futurs | **Sens :** une vérification pour n'importe quel code, même écrit pour la tromper | **Sens :** seulement « oui » ou « non », pas de « je ne sais pas » |
| **Ce que voit un développeur :** un relecteur devine si la modification pourrait débiter de l'argent pour une commande | **Ce que voit un développeur :** un seul linter ou un seul modèle relecteur pour toute modification | **Ce que voit un développeur :** la vérification avant fusion se contente de laisser passer ou de bloquer les modifications |
| **Si retirée — texte du code :** une recherche vérifie que seul le module de paiement écrit dans la table des paiements | **Si retirée — petit modèle :** règles de paiement pour 3 commandes et 2 clients, toutes les variantes essayées ; on vérifie le modèle des règles, le code se vérifie à part | **Si retirée — une personne :** sur une modification difficile, la vérification répond « je ne sais pas » et un développeur la regarde |

  </b-table>
  <b-why align="left">Choisissez un côté du triangle : les deux propriétés à ses extrémités restent, la troisième disparaît. Les onglets ici et sous le schéma des propriétés sont liés : le numéro de l'onglet est le numéro de la propriété, et sa colonne dans le tableau ci-dessus s'allume.</b-why>
  <b-lane title="À quelle propriété renoncer" color="accent">
  <b-scene names="rice-theorem-explained/triangle"/>
  <b-pick-tabs id="rice-tri" group="rice-k" tone="accent">
    <tab t="Texte du code">
    </tab>
    <tab t="Petit modèle">
    </tab>
    <tab t="Une personne">
    </tab>
  </b-pick-tabs>
  </b-lane>

  <b-why align="left">**Une quatrième voie, en dehors du triangle,** consiste à toujours répondre mais à se tromper parfois. Les tests et l'ingénierie du chaos fonctionnent ainsi : des pannes provoquées délibérément en production montrent si le système tient. C'est une vérification par l'exemple, qui ne donne pas de preuve pour tous les cas.</b-why>
  <b-callout icon="bulb">**Une note pour ceux qui conçoivent avec le DDD.** Dans le DDD, un système est découpé en contextes bornés, des parties avec leur propre vocabulaire, comme « Paiements ». Pour garder le raisonnement simple, prenez un petit modèle pour décrire un contexte : l'état de ses agrégats, les commandes comme actions et les invariants comme vérifications après chaque étape, le tout sur de petits nombres. Le modèle sert à raisonner sur les frontières et la taille des contextes : si le modèle d'un contexte ne peut pas être essayé en entier même sur de petits nombres, le contexte est probablement trop grand. Il ne donne aucune garantie que le contexte fonctionne. Le code peut dériver par rapport au modèle ; le code lui-même se vérifie donc à part : avec des contraintes de base de données, des tests et la recherche dans le code. Un bug qui n'apparaît qu'avec mille commandes ne se montrera pas dans un modèle de trois. Et le modèle ne dit rien de ce qui n'y a pas été écrit : modèles de lecture, systèmes externes, temps. Le signal de taille est une hypothèse de l'auteur ; plus de détails dans [« Où vérifier le travail d'un agent IA »](/blog/agent-checkpoint/#size).</b-callout>
  <b-finding>
    <ex>Une modification arrive avec 2 000 lignes de code de paiement. Aucun linter (un programme qui vérifie le texte du code selon des règles fixées), aucun modèle relecteur ni aucun autre programme ne peut garantir qu'elle ne débitera jamais d'argent sans commande si les trois propriétés sont attendues à la fois.</ex>
    <gen>C'est une limite de la tâche elle-même. Tant que la vérification doit répondre sur le comportement, sur toute modification et toujours, sans « je ne sais pas », sur une modification elle se trompera ou ne répondra jamais, quelles que soient ses améliorations.</gen>
    <do>Pour chaque règle importante, choisissez à laquelle des trois propriétés renoncer : vérifier le texte du code, essayer un petit modèle de règles et vérifier le code à part, ou confier les modifications difficiles à une personne.</do>
  </b-finding>
</b-chapter>

<b-chapter id="predicate" icon="list-check" title="Issue 1. Texte du code : une question sur l'écriture plutôt que sur le comportement">
  <b-why align="left">Ici on renonce à la propriété 1, « sur le comportement » : la question de ce que fera le code est remplacée par celle de la façon dont il est écrit. Pourquoi cela marche : les questions sur le code sont de deux sortes, et le théorème exclut une réponse exacte pour une seule d'entre elles.</b-why>

  - **Comment le code est écrit :** « le code écrit-il dans la table des paiements ? ». Pour répondre, lire chaque ligne suffit, et il n'y en a qu'un nombre fini.
  - **Ce que le code fera :** « débitera-t-il un jour de l'argent sans commande ? ». Pour répondre, il faut le résultat de chaque exécution avec chaque commande, et elles ne finissent jamais.

  <b-why align="left">**Lien avec les approches de développement :**</b-why>

  - **Le code impératif** décrit des étapes, et une règle sur le résultat en ressort ; il faut donc la vérifier sur le comportement. C'est la ligne du bas du schéma.
  - **Une notation déclarative** énonce ce qui doit tenir : une contrainte de base de données « pas de paiement sans commande ». Son comportement est visible dans la notation même, la vérification du texte est donc exacte. C'est la ligne du haut. Kubernetes fonctionne de la même façon : un fichier décrit l'état voulu, et le système le maintient seul.
  - **L'ingénierie du chaos** vérifie le comportement en production : des pannes sont injectées délibérément dans le système en marche pour voir s'il tient. Elle répond à la question de la ligne du bas seulement pour les pannes mises en scène, pas pour chaque exécution.

  <b-why align="left">Une telle question à réponse oui ou non s'appelle un prédicat. Le schéma pose les deux questions au même code : la ligne du haut sur le texte, celle du bas sur le comportement.</b-why>
  <iso-art name="term:rice-predicate"></iso-art>
  <b-vs-grid>
    <h></h>
    <h><b-icon name="file-text"/> Comment c'est écrit</h>
    <h><b-icon name="play"/> Ce qui en sort</h>
    <c>**Question**</c>
    <c>le code écrit-il dans la table des paiements ?</c>
    <c>le programme débitera-t-il un jour de l'argent sans commande ?</c>
    <c>**Ce qu'il faut examiner**</c>
    <c>les lignes de code ; en nombre fini, toutes peuvent être lues</c>
    <c>chaque exécution avec chaque entrée ; en nombre infini, certaines ne finissent jamais</c>
    <c>**Réponse**</c>
    <c>toujours disponible</c>
    <c>en général, aucune</c>
  </b-vs-grid>
  <b-why align="left">Ce que signifie « une question sur le comportement ». Une telle question ne dépend que de ce que fait le programme, pas de la façon dont il est écrit. Si deux programmes se comportent de la même façon sur chaque entrée, ils reçoivent la même réponse à une question sur le comportement. Exemple : un programme additionne les achats avec une boucle, un autre avec une fonction de bibliothèque. Les textes diffèrent, le comportement est le même, et « la somme peut-elle être négative » a une seule réponse pour les deux. Mais « le code contient-il une boucle » a des réponses différentes, car c'est une question sur le texte.</b-why>
  <b-table>

| Question | Porte sur | Décidable ? |
|---|---|---|
| la fonction compte-t-elle plus de 50 lignes | le texte | oui, en comptant |
| le code appelle-t-il `delete` | le texte | oui, par recherche |
| y a-t-il une écriture dans la table des commandes en dehors d'un module | le texte | oui, par recherche, si les requêtes ne sont pas construites à la volée |
| le programme se terminera-t-il sur chaque entrée | le comportement | non, en général |
| la fonction peut-elle un jour renvoyer une somme négative | le comportement | non, en général |
| le gestionnaire débitera-t-il de l'argent sans commande | le comportement | non, en général |

  </b-table>
  <b-finding>
    <ex>« Seul le module de paiement écrit dans la table des paiements » est une question de texte ; une recherche dans le code la vérifie. « Un paiement ne passe jamais sans commande » est une question de comportement.</ex>
    <gen>Une question de comportement peut souvent être remplacée par une question de texte si le code est écrit de sorte qu'un seul endroit puisse enfreindre la règle, par exemple un seul fichier qui écrit dans la table des paiements.</gen>
    <do>Réécrivez les règles importantes pour qu'elles deviennent des questions de texte : un seul écrivain par table, une contrainte de base de données, la règle en un seul endroit.</do>
  </b-finding>
</b-chapter>

<b-chapter id="small-model" icon="package" title="Issue 2. Un petit modèle : tout essayer, mais sur de petits nombres">
  <b-why align="left">Ici on renonce à la propriété 2, « toute modification ». Ce qui est vérifié est une courte description des règles de paiement, le code à part, et seulement sur de petits nombres : 3 commandes et 2 clients. Les variantes deviennent finies, et un programme les essaie toutes jusqu'au bout.</b-why>
  <b-art names="rice-theorem-explained/small-model" wide/>

  1. **État :** quelles commandes existent, combien de fois chacune a été débitée, quelle commande chaque client a vérifiée.
  2. **Actions :** « créer une commande », « vérifier que la commande n'est pas payée », « débiter l'argent ».
  3. **Règles :** pas de paiement sans commande et pas de double débit, vérifiés après chaque étape.
  4. **Recherche :** tous les ordres d'actions pour 3 commandes et 2 clients.

  <b-vs-grid>
    <h></h>
    <h><b-icon name="check"/> Attrape</h>
    <h><b-icon name="alert-circle"/> Ne voit pas</h>
    <c>**Où**</c>
    <c>les erreurs de conception des règles, avant tout code</c>
    <c>les bugs du code lui-même : le modèle ne le lit pas</c>
    <c>**Exemple**</c>
    <c>deux clients qui paient une même commande au même instant</c>
    <c>une panne qui n'apparaît qu'avec mille commandes</c>
  </b-vs-grid>
  <b-why align="left">**Pourquoi la recherche se termine.** Le modèle a un nombre fini d'états : chacune des 3 commandes est créée ou non et débitée au plus deux fois, et chacun des 2 clients tient au plus un paiement commencé. Chaque action fait passer le modèle d'un état à un autre. Un programme visite chaque état atteignable et vérifie la règle après chaque étape. L'interdiction du théorème ne s'applique pas ici : on vérifie une description précise dans un monde fini, alors que le théorème parle de n'importe quel programme.</b-why>
  <b-codebox title="Un modèle de paiement en Quint">
    module payments {
      val ORDERS = Set(1, 2, 3)
      val CLIENTS = Set(1, 2)
      var orders: Set[int]     // commandes créées
      var paid: int -> int     // commande → nombre de débits
      var pending: int -> int  // client → commande vérifiée (0 — aucune)
      action init = all {
        orders' = Set(), paid' = ORDERS.mapBy(o => 0), pending' = CLIENTS.mapBy(c => 0),
      }
      action createOrder(o: int): bool = all {
        not(orders.contains(o)),
        orders' = orders.union(Set(o)), paid' = paid, pending' = pending,
      }
      // étape 1 : la commande existe et n'est pas payée
      action check(c: int, o: int): bool = all {
        pending.get(c) == 0, orders.contains(o), paid.get(o) == 0,
        pending' = pending.set(c, o), orders' = orders, paid' = paid,
      }
      // étape 2 : débiter l'argent
      action charge(c: int): bool = all {
        pending.get(c) != 0,
        paid' = paid.setBy(pending.get(c), n => n + 1),
        pending' = pending.set(c, 0), orders' = orders,
      }
      action step = {
        nondet o = ORDERS.oneOf()
        nondet c = CLIENTS.oneOf()
        any { createOrder(o), check(c, o), charge(c) }
      }
      val noPaymentWithoutOrder = ORDERS.forall(o => paid.get(o) > 0 implies orders.contains(o))
      val noDoubleCharge = ORDERS.forall(o => paid.get(o) <= 1)
    }
  </b-codebox>
  <b-codebox title="Essayer tous les ordres jusqu'à 10 étapes">
    quint verify payments.qnt --invariant=noDoubleCharge --max-steps=10
  </b-codebox>
  <b-why align="left">Dans cette description, la vérification « la commande n'est pas payée » et le débit sont deux étapes séparées. La recherche trouve un enchaînement de cinq étapes : une commande est créée, le client 1 la vérifie, le client 2 la vérifie, les deux débitent, et une commande est débitée deux fois. Le correctif consiste à répéter la vérification dans le débit lui-même : `paid.get(pending.get(c)) == 0`. Après cela, la recherche ne trouve plus de violation. 10 étapes couvrent tout le modèle : son enchaînement le plus long fait 10 étapes, après quoi aucune action n'est permise.</b-why>
  <b-why align="left">**Pourquoi de petits nombres suffisent.** La plupart des erreurs de règles apparaissent déjà avec deux ou trois objets : deux clients et une commande, une commande et une annulation en cours de route. C'est une observation, pas une garantie : un bug qui demande plus d'objets passera à travers une telle recherche.</b-why>
  <b-table>

| Erreur | Visible avec 3 commandes et 2 clients ? |
|---|---|
| deux clients paient une même commande au même instant | oui : deux clients suffisent |
| argent débité après l'annulation de la commande | oui : une commande suffit |
| le montant déborde à un million de commandes | non : il faut de grands nombres |
| le code saute une vérification que le modèle a | non : le modèle ne lit pas le code |

  </b-table>
  <b-why align="left">Le petit modèle vérifie donc la conception, et d'autres moyens tiennent le code : une contrainte de base de données refuse un paiement sans commande, et des tests comparent le code au modèle sur des exemples.</b-why>
  <b-why align="left">**Lien avec les contextes bornés.** Un modèle s'écrit en général pour un contexte borné, comme « Paiements », mais le propos de cette issue est les petits nombres : ce sont eux qui rendent la recherche finie. Plus de détails dans la note sur le DDD de « L'essentiel ».</b-why>
  <b-finding>
    <ex>La recherche trouve un enchaînement : deux clients appuient sur « payer » au même instant, les deux vérifications « commande pas encore payée » passent avant l'un ou l'autre débit, et l'argent est débité deux fois.</ex>
    <gen>Un petit modèle attrape les erreurs de conception avant le code, mais le code se vérifie à part : avec des tests, des contraintes de base de données et la recherche dans le code.</gen>
    <do>Pour les règles sur l'argent, écrivez un petit modèle en <a href="/blog/quint-models-find-races/">Quint</a> et lancez la recherche avant chaque version.</do>
  </b-finding>
</b-chapter>

<b-chapter id="human" icon="help-circle" title="Issue 3. « Je ne sais pas » → une personne : une troisième réponse honnête">
  <b-why align="left">Ici on renonce à la propriété 3, « toujours une réponse ». La vérification examine toute modification, mais elle a trois réponses au lieu de deux. La troisième, « je ne sais pas », signifie qu'une personne regarde la modification.</b-why>
  <b-art names="rice-theorem-explained/human" wide/>
  <b-table>

| Réponse | Quand | Et ensuite |
|---|---|---|
| <b-status-dot color="accent">tient</b-status-dot> | les paiements passent uniquement par le module de paiement | la modification passe |
| <b-status-dot color="warn">enfreinte</b-status-dot> | une écriture dans la table des paiements contournant le module est trouvée | la modification est bloquée |
| <b-status-dot color="warn">je ne sais pas</b-status-dot> | une requête de base de données collée à la volée à partir de morceaux de texte, un appel dans la bibliothèque de quelqu'un d'autre | une étiquette « à voir par une personne » |

  </b-table>
  <b-why align="left">**Pourquoi la troisième réponse lève l'interdiction.** La preuve du théorème construit un programme sur lequel la vérification doit dire « oui » ou « non » et sur lequel les deux réponses sont fausses. Si « je ne sais pas » est permis, la vérification répond cela sur ce programme, et il n'y a pas de contradiction. Le seul prix : la vérification dira aussi « je ne sais pas » sur certaines modifications normales.</b-why>
  <b-why align="left">**Pourquoi « je ne sais pas » vaut mieux que deviner.** Une vérification peut se tromper de deux façons : manquer une violation ou lever une fausse alerte. « Je ne sais pas » choisit délibérément la seconde : mieux vaut qu'un développeur regarde une modification de plus qu'un double débit n'arrive chez un client.</b-why>
  <b-table>

| Cas difficile | Pourquoi la vérification n'est pas sûre |
|---|---|
| une requête de base de données collée à partir de morceaux de texte | le nom de la table n'apparaît qu'à l'exécution |
| une fonction appelée par un nom stocké dans une variable | le texte ne montre pas quelle fonction s'exécute |
| un appel dans la bibliothèque de quelqu'un d'autre sans les sources | on ne voit pas ce qui s'y passe |
| du code écrit et exécuté à la volée | il n'y a pas de texte à vérifier avant l'exécution |

  </b-table>
  <b-codebox title="À quoi cela ressemble dans la vérification avant fusion">
    payments-rule  tient          src/billing/charge.ts
    payments-rule  enfreinte      src/admin/refund.ts:18  écriture dans payments en contournant le module
    payments-rule  je ne sais pas src/reports/export.ts:42  requête collée à partir de chaînes → à voir par une personne
  </b-codebox>
  <b-why align="left">**Comment garder « je ne sais pas » rare.** Chaque « je ne sais pas » coûte du temps à une personne. S'ils sont nombreux, le code est simplifié pour que la vérification voie davantage : les requêtes vers les paiements sont écrites en entier, sans coller de chaînes, et les appels au service de paiement restent dans un seul module. C'est l'issue 1 : certains cas difficiles deviennent des questions sur le texte.</b-why>
  <b-why align="left">**Une idée voisine : fail-fast.** Fail-fast arrête un programme dès qu'il échoue, pendant son exécution. « Je ne sais pas » arrête une modification douteuse encore plus tôt, avant la fusion, et la confie à une personne.</b-why>
  <b-finding>
    <ex>Une modification colle une requête de base de données à partir de morceaux de texte. La vérification ne peut pas dire dans quelle table elle écrit, répond « je ne sais pas », et un développeur regarde la modification.</ex>
    <gen>« Tient » et « enfreinte » sont exacts, et le prix est le temps d'une personne sur la troisième réponse.</gen>
    <do>Faites de « je ne sais pas » un statut distinct de la vérification avec une étiquette « à voir par une personne ». Laisser passer en silence une modification difficile en fait une erreur.</do>
  </b-finding>
</b-chapter>

<b-chapter id="proof" icon="workflow" title="La preuve sur un exemple">
  <iso-art name="term:rice-proof"></iso-art>

  L'idée de la preuve est une réduction. Si une tâche pouvait être résolue, une autre, déjà connue comme insoluble, le serait aussi. La première est donc insoluble elle aussi. Ici la première tâche est la vérification d'une règle de comportement et la seconde est le problème de l'arrêt.

  Notation : $P$ est un programme quelconque, $w$ les données avec lesquelles il est exécuté, $P(w)$ l'exécution de $P$ sur $w$. Le problème de l'arrêt est la tâche consistant à dire, pour tous $P$ et $w$, si $P(w)$ se termine un jour.

  Prenons un programme quelconque $P$ avec l'entrée $w$ et construisons à partir de lui un nouveau programme $Q$ :

  $$Q(x) \;=\; \text{exécuter } P(w)\text{ ; quand il se termine, exécuter } B(x)$$

  Ici $x$ est la donnée avec laquelle $Q$ est exécuté. L'étape $B(x)$ enfreint la règle, alors qu'un programme qui tourne indéfiniment ne l'enfreint pas. $Q$ n'atteint donc la violation que si $P(w)$ se termine un jour :

  $$Q \text{ enfreint la règle} \iff P(w) \text{ s'arrête}$$

  Si une vérification de la règle existait pour tout programme, alors, donné $Q$, elle répondrait aussi à la question de savoir si $P(w)$ s'arrête. Mais Alan Turing, dans un article de 1936 (publié en 1937), a démontré qu'aucun programme ne répond à cette question, le problème de l'arrêt<b-proof href="https://en.wikipedia.org/wiki/Halting_problem" quote="Wikipedia: “Alan Turing proved in 1937 that the halting problem is undecidable.”"/>. Il n'existe donc pas non plus de vérification universelle de règle. La règle peut être quelconque : toute propriété de comportement aux réponses différentes convient à la place de « argent sans commande ».

  Les mêmes étapes dans l'ordre :

  1. Prenez n'importe quelle règle de comportement que certains programmes enfreignent et d'autres non. Il existe donc un programme qui l'enfreint. La partie de ce programme qui enfreint la règle est l'étape $B$.
  2. Prenez un programme quelconque $P$ et son entrée $w$ pour lesquels la question est de savoir si $P(w)$ s'arrête.
  3. Assemblez $Q$ : d'abord $P(w)$, puis $B$. L'assemblage est une procédure mécanique simple qu'on écrirait en une minute.
  4. Donnez $Q$ à la vérification universelle imaginée. Sa réponse « enfreint » signifie « $P(w)$ s'est arrêté », et « n'enfreint pas » signifie « ne s'est pas arrêté ».
  5. C'est une solution du problème de l'arrêt, qui n'existe pas. La vérification universelle n'existe donc pas non plus.

  Une réserve pour la précision. La construction suppose qu'un programme qui tourne indéfiniment sans rien faire n'enfreint pas la règle. Si ce n'est pas le cas pour une règle, prenez la règle opposée : la vérifier n'est pas plus facile, et l'argument se répète mot pour mot.


  <b-finding>
    <ex>Un gestionnaire de paiement fonctionne ainsi : il appelle d'abord un calcul de remise de la bibliothèque de quelqu'un d'autre, puis débite de l'argent sans vérifier qu'une commande existe. Qu'il enfreigne la règle ou non dépend uniquement de la terminaison du calcul de remise : s'il se bloque indéfiniment, le débit n'est jamais atteint.</ex>
    <gen>Pour répondre exactement à partir du code, une vérification devrait décider si ce calcul s'arrête. C'est le même schéma : $P(w)$ est le calcul de remise, $B$ est le débit sans commande.</gen>
    <do>Fermez une telle règle avec un cadre : une contrainte de base de données refuse d'enregistrer un débit sans commande, quoi qu'ait fait le code avant.</do>
  </b-finding>
</b-chapter>

<b-chapter id="root" icon="bulb" title="D'où vient l'astuce : le problème de l'arrêt et le paradoxe du barbier">
  <b-why align="left">La preuve du théorème de Rice réduit le problème de l'arrêt à une vérification de comportement : si une vérification de comportement existait, elle résoudrait aussi le problème de l'arrêt. La vérification hérite donc de son indécidabilité. Le problème de l'arrêt, lui, se démontre avec une astuce vieille de plus de cent ans : une question sur soi-même.</b-why>
  <iso-art name="term:halting-problem/2"></iso-art>
  <b-why align="left">Supposons qu'il existe un juge qui dit, pour tout programme, s'il s'arrête. Écrivons un programme contrariant : il interroge le juge sur lui-même et fait le contraire. Si le juge dit « s'arrête », le contrariant boucle indéfiniment ; s'il dit « ne s'arrêtera pas », le contrariant s'arrête aussitôt. Le juge a tort dans les deux cas, il ne peut donc pas exister.</b-why>
  <iso-art name="term:barber-paradox"></iso-art>
  <b-why align="left">La même astuce se trouve dans le paradoxe du barbier, une version imagée du paradoxe de Russell de 1901. Les villageois se répartissent en l'ensemble $A$, ceux qui se rasent eux-mêmes, et l'ensemble $B$, ceux que rase le barbier, et chacun est dans exactement un des deux. Le barbier n'a pas de place : dans $A$ il se retrouve dans $B$, dans $B$ il se retrouve dans $A$. Russell a la même chose pour les ensembles : $R$ est l'ensemble de tous les ensembles qui ne se contiennent pas eux-mêmes, c'est-à-dire $R = \{x : x \notin x\}$. $R$ s'appartient-il à lui-même ? S'il s'appartient, par définition il ne devrait pas ; sinon, il devrait : $R \in R \iff R \notin R$.</b-why>
  <b-table>

| Année | Qui | Quoi | Astuce |
|---|---|---|---|
| 1901 | Bertrand Russell | l'ensemble de tous les ensembles qui ne se contiennent pas eux-mêmes | s'appartient-il à lui-même ? |
| 1936 | Alan Turing | aucun juge ne peut dire si un programme quelconque s'arrête | le contrariant s'interroge sur lui-même |
| 1951 | Henry Gordon Rice | aucune vérification d'une propriété de comportement aux réponses différentes | réduire l'arrêt à la vérification, comme dans la preuve ci-dessus |

  </b-table>
  <b-why align="left">Pourquoi une question sur soi-même est si puissante. Un programme est aussi du texte, on peut donc le donner à un autre programme et même à lui-même. Dès qu'un vérificateur peut parler de n'importe quel programme, il doit aussi parler d'un programme qui l'interroge sur lui-même et fait le contraire. Alors toute réponse qu'il donne est fausse. Le même mouvement apparaît dans le paradoxe du barbier, le paradoxe de Russell et le théorème d'incomplétude de Gödel (dans tout système de règles cohérent donné par une liste d'axiomes et capable de décrire l'arithmétique, il existe des énoncés qui ne peuvent être ni démontrés ni réfutés).</b-why>
</b-chapter>

<b-chapter id="frames" icon="ring-dot" title="Que faire : trois cadres à l'intérieur desquels la réponse est exacte">
  <iso-art name="term:rice-frames"></iso-art>
  <b-why align="left">Le théorème interdit à une vérification correcte de combiner les trois conditions de la première section : une question **sur le comportement**, **n'importe quel programme**, **toujours une réponse** « oui » ou « non ». L'interdiction vaut déjà pour une seule question de comportement. La preuve s'appuie sur les trois : elle construit un programme $Q$ que la vérification doit accepter, lui pose une question de comportement et exige une réponse définie. Chaque voie retire une condition, et la preuve cesse de fonctionner.</b-why>
  <b-table>

| Voie | Ce qui est fait en pratique | Pourquoi la réponse est exacte | Ce qui est perdu |
|---|---|---|---|
| <b-icon name="package"/> Petit monde | écrire un modèle Quint de réservation : 3 chambres, jusqu'à 5 réservations, actions « réserver » et « annuler ». Un programme essaie toute séquence de ces actions jusqu'à une longueur fixée et vérifie après chaque étape la règle « les réservations d'une même chambre ne se chevauchent jamais » | il y a un nombre fini de variantes ; la recherche va donc jusqu'au bout et dit soit « la règle tient », soit montre l'enchaînement d'étapes où elle s'est brisée | une erreur qui n'apparaît qu'avec 50 réservations simultanées ne sera pas vue par une recherche à 5 |
| <b-icon name="list-check"/> Langage étroit | la règle est écrite comme une contrainte PostgreSQL, et seul le fichier `booking/repository.ts` peut écrire dans la table des réservations. À chaque modification du code, une recherche vérifie qu'aucun autre fichier n'écrit dans la table des réservations | la contrainte tient en une ligne du schéma de la base et la base la vérifie à chaque écriture ; une recherche de fichiers se termine toujours et donne une réponse exacte, tant que les requêtes vers la table ne sont pas construites à la volée : une règle de linter l'interdit aussi | l'agent ne peut pas écrire des réservations de n'importe où : même un import massif de réservations doit passer par le même fichier autorisé |
| <b-icon name="help-circle"/> « Je ne sais pas » | la vérification d'une modification renvoie l'une de trois réponses : « tient », « enfreinte », « impossible à dire ». La troisième réponse pose sur la modification une étiquette « à voir par une personne » | la vérification n'a pas à résoudre les cas difficiles, comme une requête de base de données construite à partir de chaînes à la volée : elle y dit honnêtement « impossible à dire », et là où elle dit « tient » ou « enfreinte », la réponse est exacte | un développeur passe du temps sur les modifications étiquetées « à voir par une personne » |

  </b-table>
  <b-why align="left">Chacune des trois réponses n'est exacte que dans ses limites. La recherche prouve que la règle tient dans un modèle de 3 chambres et 5 réservations, pas dans la base de production avec des milliers de réservations. La recherche dans le code prouve qu'il n'y a pas d'écriture contournant la règle, pas que la contrainte de base elle-même est correctement écrite. Une réponse « tient » est exacte, mais certaines modifications vont quand même à une personne. Les voies s'utilisent donc ensemble : le modèle vérifie la conception avant le code, la contrainte et la recherche vérifient le code lui-même, et une personne regarde ce qui reste avec une étiquette.</b-why>
  <b-why align="left">Toute vérification qui travaille dans un cadre commet des erreurs de deux sortes. Il est utile de décider d'avance avec laquelle on peut vivre.</b-why>
  <b-table>

| Erreur de la vérification | Ce qui s'est passé | Quand elle est tolérable | Exemple de réservation |
|---|---|---|---|
| <b-status-dot color="warn">un oubli</b-status-dot> | la vérification a dit « tout va bien », mais la règle est enfreinte | quand une violation est facile à remarquer et peu coûteuse à corriger | les tests vérifiaient la réservation par un seul client, alors que deux clients ont obtenu simultanément la chambre 2 à 10 h 00 |
| <b-status-dot color="accent">une fausse alerte</b-status-dot> | la vérification a dit « enfreinte » ou « impossible à dire », mais la règle tient | quand un oubli coûte cher : argent, accès, données personnelles | la recherche a trouvé une écriture dans la table des réservations dans un fichier de migration de données qui n'enfreint pas la règle, et la modification a été retenue jusqu'à ce qu'une personne la regarde |

  </b-table>
  <b-why align="left">Pour les règles sur l'argent et les accès, choisissez des vérifications qui lèvent de fausses alertes mais ne manquent jamais une violation : une contrainte de base de données, la vérification de types, un seul écrivain par table. Un développeur lève une étiquette superflue en quelques minutes, alors qu'un double débit manqué revient sous forme de réclamation client et de remboursement.</b-why>
  <b-why align="left">En termes de DDD (une façon de concevoir un logiciel autour du domaine métier), cela donne ceci. Un contexte borné est une partie du système avec son propre vocabulaire. Le contexte « Réservation » ne parle que de chambres, de réservations et de temps : il n'a pas de mots comme « paiement » ou « notification ». La règle « les réservations ne se chevauchent jamais » concerne une table, et un agrégat, « Réservation », y écrit ; un agrégat est un groupe de données modifié uniquement par lui-même. « Le code peut-il enfreindre la règle » se réduit donc à une question de texte : autre chose que l'agrégat écrit-il dans cette table. Ce qui rend la règle vérifiable, c'est l'interdiction d'écrire dans la table en contournant l'agrégat. Le petit vocabulaire du contexte aide les personnes et l'agent à comprendre le code, mais n'a aucun effet sur la vérifiabilité. La frontière de l'agrégat est commode parce que l'interdiction se trouve en un seul endroit.</b-why>
  <b-finding>
    <ex>La règle « les réservations d'une même chambre ne se chevauchent jamais » : un modèle Quint essaie tous les ordres de commandes pour 3 chambres, une contrainte de base de données interdit le chevauchement, et une vérification de texte s'assure qu'un seul module écrit dans la table des réservations.</ex>
    <gen>Les trois cadres se combinent en général : le petit monde attrape les erreurs de conception, le langage étroit fixe la règle dans le code, et « je ne sais pas » montre où une personne est nécessaire.</gen>
    <do>Pour chaque règle, notez quel cadre la tient. Une règle sans cadre n'est vérifiée que par des tests d'exemples.</do>
  </b-finding>
</b-chapter>

<b-chapter id="cap" icon="boxes-link" title="Le lien avec le théorème CAP : un noyau commun, des raisons différentes">
  <b-why align="left">Le théorème CAP est une interdiction bien connue des systèmes distribués ; le nom est formé des initiales de trois propriétés : cohérence (consistency), disponibilité (availability), tolérance au partitionnement (partition tolerance). Quand des données vivent sur plusieurs serveurs et que la liaison entre eux se rompt, le système ne peut pas à la fois répondre à chaque requête et montrer à tous les mêmes données. Il doit choisir : attendre le retour de la liaison, ou répondre depuis sa propre copie, qui peut être périmée. Eric Brewer l'a énoncé en 2000 ; Seth Gilbert et Nancy Lynch l'ont démontré en 2002.</b-why>
  <iso-art name="term:cap-theorem"></iso-art>
  <b-why align="left">**Le noyau commun.** Dans les deux interdictions : tant qu'un événement ne s'est pas produit, on ne peut pas dire s'il se produira plus tard ou jamais, quelle que soit la durée d'attente. Un serveur ne sait pas si le message d'un voisin est perdu ou simplement en retard. Une vérification de programme ne sait pas si le programme se terminera en un milliard d'étapes ou jamais. Tant que le temps d'attente n'est pas borné, les deux n'ont que deux issues, dont une seule peut être choisie : attendre ou répondre tout de suite.</b-why>
  <b-art names="rice-theorem-explained/cap-fork" wide/>
  <b-cap>Le haut du schéma est une bifurcation entre deux issues qui s'excluent. Le bas est la limitation du temps : pour les vérifications de programmes, elle supprime la bifurcation, dans un réseau elle ne supprime que l'incertitude.</b-cap>
  <b-why align="left">À quoi ressemblent les deux branches de la bifurcation dans un réseau et dans une vérification de programme :</b-why>
  <b-table>

| Issue | Dans un réseau (CAP) | Dans une vérification de programme |
|---|---|---|
| <b-icon name="clock"/> attendre | le serveur attend le retour de la liaison ; les données sont justes, mais il n'y a pas encore de réponse, et elle peut tarder longtemps | la vérification attend la fin du programme, ou répond « impossible à dire » ; il n'y a pas d'erreur, mais il peut ne pas y avoir de réponse |
| <b-icon name="zap"/> répondre tout de suite | le serveur répond depuis sa propre copie ; il y a une réponse, mais il peut lui manquer une réservation récente de l'autre serveur | la vérification répond d'après des tests ou une exécution de 1 000 étapes ; il y a une réponse, mais le programme pourrait enfreindre la règle à l'étape 1 001 |

  </b-table>
  <b-why align="left">**Limiter le temps : cela aide les programmes, pas les réseaux.** Si un langage ou un modèle garantit que tout programme se termine en un nombre connu d'étapes, la vérification l'exécute jusqu'au bout et répond exactement. C'est ainsi que fonctionne le petit monde de la section précédente ; le prix est un langage dans lequel on ne peut pas écrire de boucle sans fin. Dans un réseau, un délai borné ne supprime que l'incertitude : si un message ne prend pas plus de 2 secondes, au bout de 2 secondes le serveur sait avec certitude que la liaison est coupée. Cela n'apporte pas de données plus fraîches, et le choix demeure : refuser de répondre ou répondre depuis sa propre copie. L'interdiction de CAP tient toujours.</b-why>
  <b-why align="left">**Des raisons différentes.** Un serveur CAP manque d'information : même un serveur infiniment astucieux ne peut pas apprendre ce qui se passe chez son voisin au-delà de la liaison rompue. Une vérification de programme a l'information, tout le code est devant elle, mais la réponse ne peut pas être calculée à partir de ce code. Ce sont deux sortes d'impossibilité différentes ; le théorème de Rice et CAP ne sont donc pas la même chose.</b-why>
  <b-why align="left">**Quel degré de rigueur.** Les deux moitiés sont établies : le théorème de Rice et la preuve de CAP sont publiés. La correspondance des issues est une observation de l'auteur ; il n'existe pas de théorème unique pour les deux cas. Brewer lui-même a averti plus tard que la formule « deux sur trois » (l'idée que sur trois propriétés on n'en a que deux) simplifie trop<b-proof href="https://www.infoq.com/articles/cap-twelve-years-later-how-the-rules-have-changed/" quote="Eric Brewer: “The «2 of 3» formulation was always misleading”"/> : en réalité, c'est une échelle, et le choix ne se pose que pendant un partitionnement. Il en va de même des vérifications : ce qui compte, c'est la fréquence à laquelle une vérification dit « je ne sais pas » ou se trompe.</b-why>
  <b-finding>
    <ex>Une vérification automatique attend une exécution de tests bloquée. Attendre plus longtemps, c'est comme un serveur qui attend le retour de la liaison ; couper sur un délai et dire « réussi », c'est comme un serveur qui répond depuis une copie périmée.</ex>
    <gen>Attendre et deviner sont les issues communes aux deux interdictions. Limiter le temps d'avance supprime la bifurcation pour les vérifications de programmes, alors que dans un réseau cela transforme seulement « attendre indéfiniment » en « je sais que la liaison est coupée ».</gen>
    <do>Donnez à chaque vérification automatique une limite de temps et décidez d'avance ce que signifie la dépasser : « je ne sais pas » confié à une personne, ou « enfreinte ».</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Questions fréquentes">
  <b-faq-cards>
    <q t="Qu'est-ce que le théorème de Rice en mots simples ?">Aucun programme ne peut dire, pour tous les programmes, si quelque chose est vrai de leur comportement, dès lors que certains programmes ont cette propriété et d'autres non. On peut répondre sur le texte du code ; sur le comportement d'un programme quelconque, non.</q>
    <q t="Quel est le lien entre le théorème de Rice et le problème de l'arrêt ?">Toute question d'arrêt peut être transformée en question de comportement : construire un programme qui n'enfreint la règle que si un autre programme se termine. Une vérification de comportement n'est donc pas plus facile que l'arrêt, et aucun programme ne répond à la question de l'arrêt.</q>
    <q t="Vérifier des programmes est donc inutile ?">Seule une vérification valable pour tous les programmes est impossible. À l'intérieur d'un cadre — un petit monde, un langage étroit ou une réponse « je ne sais pas » — une vérification correcte est possible : c'est ainsi que fonctionnent la recherche dans un modèle Quint, les contraintes de base de données et les interdictions étroites d'un linter comme « un seul fichier écrit dans cette table ».</q>
    <q t="Quel rapport avec le paradoxe du barbier ?">Le problème de l'arrêt se démontre avec la même astuce que le paradoxe du barbier et le paradoxe de Russell : une question sur soi-même. Le théorème de Rice hérite de cette astuce : sa preuve réduit l'arrêt à une vérification de comportement.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="À lire ensuite">
  <b-links>
    <item href="/blog/agent-checkpoint/" k="Agents" t="Où vérifier le travail d'un agent IA">la frontière de l'agrégat comme point de contrôle</item>
    <item href="/blog/quint-vs-tests-and-tla/" k="Vérifications" t="Vérification de modèles et tests">Quint, QUnit et TLA+</item>
    <item href="/blog/specs-by-aggregates/" k="Specs" t="Specs par agrégat">les règles dans la fiche de l'agrégat</item>
    <item href="/blog/quint-models-find-races/" k="Modèles" t="Trouver les race conditions">les modèles Quint en pratique</item>
  </b-links>
</b-chapter>
<b-footer>Faits : au 6 novembre 2026, d'après Wikipédia (théorème de Rice, problème de l'arrêt, paradoxe du barbier). L'exemple du paiement est illustratif.</b-footer>
</b-post>
