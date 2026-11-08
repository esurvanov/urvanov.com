01 Vue d'ensemble

21%L'utilisent chaque semaine

Où investir dans la formation

02 Nature du travail

70%Des connexions sont Slack et Notion

Quel outil acheter

03 Vérification

±2%Tolérance du rapprochement des exports

Peut-on se fier aux chiffres

04 Choix des personnes

16Sur 340 dans l'exemple, pour des entretiens

Avec qui parler avant d'acheter

## Quelles décisions le rapport aide à prendre

**Objectif métier :** déterminer pour quelles tâches de travail l'ensemble actuel d'outils d'IA est insuffisant et quelles solutions valent d'être testées avant un achat. La décision revient au responsable du budget des outils d'IA, avec les responsables des équipes où se déroule le pilote. L'accès aux données et la sécurité sont validés par l'équipe de sécurité de l'information. Les critères de décision sont les signes du tableau ci-dessous.



Que l'ensemble actuel soit sous-optimal quelque part est une hypothèse : le rapport et les entretiens la vérifient. « Sous-optimal » se décompose en signes vérifiables. La conclusion « aucun nouvel outil n'est nécessaire » est aussi un résultat.

| Signe | Comment il se manifeste | Catégorie d'entretien | Où le rapport le montre |
|---|---|---|---|
| Qualité du résultat | les réponses sont inexactes ou inventées | hallucinations | Connecteurs |
| Temps et reprise manuelle | beaucoup d'allers-retours, le résultat est terminé à la main | prompt | Profondeur, Outil principal |
| Reproductibilité | un résultat différent à chaque fois pour la même tâche | reproductibilité | Skills, Thèmes des projets |
| Passage à l'échelle | un scénario qui fonctionne ne se transfère pas à une autre équipe | échelle | Homogénéité |
| Accès aux données | le système nécessaire n'est pas connecté | accès aux données | Connecteurs |
| Coût | cher par unité de résultat | coût | Classement par dépense |

Limites des données : le rapport ne voit que l'outil d'entreprise et seulement sur la période d'export, 3 mois. Les comptes personnels et les autres outils n'y apparaissent pas.

### Comment les réponses deviennent une décision d'achat

Le rapport indique où regarder, et la décision d'achat ne se prend qu'après ces cinq étapes, afin que l'argent aille à une tâche que beaucoup de gens ont et que rien ne couvre aujourd'hui.

1

Entretiens

Quelles tâches et quelles difficultés existent, et comment les gens les contournent aujourd'hui

2

Questionnaire à toute l'entreprise

Combien de personnes rencontrent la difficulté, à quelle fréquence et à quel point elle gêne

3

Comparer

Ampleur de la tâche, gravité des conséquences, solutions de contournement, coût de la solution

4

Tester les outils

Les options prometteuses sur de vraies tâches, avec les employés

5

Décision

Le responsable du budget décide d'après les six signes ci-dessus : qualité, temps et reprise, reproductibilité, échelle, accès aux données, coût ; « aucun nouvel outil n'est nécessaire » est une issue valable

Entrée

Exports de la console : messages, dépenses, projets et connecteurs de chaque personne

Ce que fait le rapport

Transforme les exports en segments, en maturité des équipes et en personnes précises, comme matière pour une décision

Décisions en sortie

Quel outil piloter, pour quelle équipe, avec qui parler avant d'acheter et où aucun budget n'est nécessaire

## Déroulement

Cinq étapes, de l'export à la liste finale de personnes.

1

Exporter les données

Cinq sections de la console, détails dans « Où récupérer les données »

2

Construire la vue d'ensemble

Profondeur d'adoption, homogénéité entre équipes, outil principal, segments

3

Cartographier la nature du travail

Quelles tâches les gens résolvent, avec quels outils intégrés et via quelles intégrations

4

Vérifier sur les données brutes

Contrôler chaque synthèse par rapport à l'export d'origine

5

Choisir les personnes et conclure

Une liste d'entretiens et les questions à y vérifier

Qui interviewer · Comment mener les entretiens

## Où récupérer les données

Tout se construit à partir de cinq sections d'une même console d'administration ChatGPT Enterprise. Survolez i pour voir ce que contient exactement chaque section.

**Comment exporter.** La console dispose bien d'API, mais elles ne couvrent qu'une partie des données : l'analytique de Codex, le coût des crédits et les journaux de conversations pour la conformité. Les exports des utilisateurs, des projets et des skills, ainsi que le classement par produit, se récupèrent plus facilement dans l'interface. L'export convient bien à Claude in Chrome : il ouvre la bonne section, règle le filtre, clique sur l'export et enregistre le CSV. Chaque étape est visible à l'écran, donc un mauvais filtre ou une mauvaise section se repère aussitôt, avant que les chiffres n'arrivent dans le rapport.

**Accès.** L'API de la console n'est pas toujours disponible : les politiques de sécurité des entreprises restreignent souvent les clés d'API d'administration. Dans ce cas, exportez chaque section par l'interface.

Utilisateurs

chatgpt.com/admin/usage/users

Messages, dates d'activité et outils intégrés de chaque personne

iContenu Export CSV pour une période allant jusqu'à 12 mois. Champs : messages, tool_messages, gpt_messages, project_messages, department, groups, seat_type, last_day_active. La console marque elle-même les « power users » d'un badge.

Classement

admin.openai.com → Analytics → Leaderboard

Dépenses, tokens et lignes de code de chaque personne, séparément pour les produits Chat, Work et Codex

iContenu Bouton d'export à côté du titre → « User ranking », CSV ou JSON. Champs : Name, Email, Credits, Estimated costs, Tokens, Lines of code. Le filtre « Product » change le contenu de l'export. L'historique couvre environ 120 jours.

Projets

chatgpt.com/admin/usage/projects

Qui a créé un projet, combien de messages il contient et s'il est actif

iContenu Champs : project_name, project_creator_email, messages_workspace, unique_messagers_workspace, is_active. Certains noms arrivent sous la forme [content redacted] : la console les masque d'elle-même.

Vue d'ensemble : connecteurs et skills

chatgpt.com/admin/usage

À quelles applications les gens connectent l'assistant et quels skills ils utilisent

iContenu Les blocs « App interactions » et « Skills » : le nombre d'appels à chaque connecteur et à chaque skill sur la période choisie.

Analytique : tâches

admin.openai.com → Analytics → Tasks

La classification des tâches propre à la console : code ou travail de connaissance (tout sauf le code)

iContenu Part du code et du travail de connaissance, principales tâches par crédits. Un modèle d'OpenAI étiquette les tâches sur un échantillon d'environ 10 % des requêtes des 30 derniers jours.

## Vue d'ensemble

Les quatre sections suivantes forment le rapport lui-même, chacune avec son objectif. **Objectif :** montrer quels groupes de personnes existent dans l'entreprise et quelle est leur taille.

### Profondeur d'adoption

La profondeur d'adoption montre à quel point l'outil est entré dans le travail de l'entreprise : combien de personnes l'ont utilisé au moins une fois, régulièrement et chaque semaine. Celles qui n'écrivent jamais dans le chat et ne travaillent que via Codex sont comptées à part. **Décision :** dans quel groupe investir la formation et faut-il acheter des licences supplémentaires maintenant.

71

88

97

23

61

340 personnes

Source : Utilisateurs · Classement pour ceux qui ne travaillent que via Codex

**À retenir :**

**Dans cet exemple :** 82 % des personnes ont essayé l'outil, 47 % l'utilisent dans leur travail et, pour 21 %, il est devenu une habitude hebdomadaire. La marge de progression en profondeur se trouve chez les 97 personnes du groupe « occasionnellement ».

**En général :** L'écart entre « a essayé » et « utilise chaque semaine » montre combien de personnes se sont arrêtées après les premiers essais. Le repère d'une adoption de masse est de 50 à 70 % des employés qui l'utilisent dans leur travail quotidien. Tant que l'adoption n'atteint pas ce repère, davantage de licences ne produiront pas de croissance : autre chose que l'accès freine les gens.

**Étape suivante :** Investissez la formation dans le plus grand groupe situé entre « a essayé » et « chaque semaine » : c'est là que l'usage régulier progresse le plus vite. Recomptez la répartition après la formation pour voir où les gens sont passés.

**Important.** Choisissez 5 à 10 personnes dans le groupe « occasionnellement », découvrez en entretien comment elles accomplissent aujourd'hui leurs tâches et faites avec elles une revue de cas de travail réels. Recomptez la part hebdomadaire après la revue. La manière de poser les questions sans suggérer la réponse est décrite dans « Comment interviewer les gens sur leur usage de l'IA ».

### Homogénéité

L'homogénéité montre à quel point l'outil est entré de façon égale dans les différentes équipes : quelle part de chaque équipe l'utilise régulièrement et combien de messages écrit une personne en moyenne. **Décision :** de quelle équipe tirer les scénarios qui fonctionnent et dans quelle équipe les apporter en premier.

| Équipe | Utilisateurs réguliers | % | Msgs par personne |
|---|---|---|---|
| Équipe A (forte) |  | 74% | 1,120 |
| Équipe B (forte) |  | 66% | 870 |
| Équipe C (moyenne) |  | 51% | 720 |
| Équipe D (en retard) |  | 34% | 530 |
| Équipe E (en retard) |  | 18% | 290 |

Source : Utilisateurs · champs department et groups

**À retenir :**

**Dans cet exemple :** Dans l'équipe A, 74 % des personnes utilisent l'outil régulièrement ; dans l'équipe E, 18 % : un écart de 56 points de pourcentage.

**En général :** Un grand écart entre équipes signifie que des scénarios qui fonctionnent existent déjà mais vivent dans une ou deux équipes : les transférer coûte moins cher qu'acheter quelque chose de nouveau. Une part uniformément faible dans toutes les équipes indique un obstacle commun : l'accès, la formation ou des tâches inadaptées. Une part uniformément élevée signifie que l'outil a pris racine et que l'on peut passer à l'étape suivante. Une équipe qui rencontre des obstacles n'est pas encore prête pour un nouvel outil.

**Étape suivante :** En cas de grand écart, organisez une rencontre : l'équipe la plus forte présente trois de ses scénarios aux deux plus faibles. Avant la rencontre, menez 2 à 3 entretiens sur les obstacles dans l'équipe la plus faible. Recomptez l'écart après la rencontre : il doit se réduire.

### Outil principal

Lequel des trois outils absorbe plus de la moitié des dépenses d'une personne sur trois mois. Le type d'outil montre comment la personne travaille avec l'IA.

- Chat : dialogue, question → réponse, la personne mène le travail. Problèmes : prompt, hallucinations, reproductibilité, échelle.
- Work : agent orienté objectif, il collecte des données dans les applications et livre un document. Restent : reproductibilité, échelle.
- Codex : agent de programmation, il écrit et modifie du code dans le dépôt. Aucun problème ne subsiste.

164 · Chat

47 · Work

38 · Codex

91 · aucune dépense

340 personnes, fenêtre de 3 mois

Source : Classement · trois exports : filtre « Product » = Chat, Work, Codex

**À retenir :**

**Dans cet exemple :** Chat est le produit principal pour 164 personnes sur 340, Codex pour 38, Work pour 47.

**En général :** L'outil principal indique le type de travail : une conversation, une tâche confiée à un agent ou du code. Il détermine ce dont la personne a besoin ensuite et dans quel pilote la placer. La taille du groupe fixe la taille du pilote : un pilote large pour un scénario courant, un pilote étroit pour un scénario rare.

**Étape suivante :** La décision consiste à faire passer chaque groupe à l'étape suivante. Pour le groupe Chat : Work avec des connecteurs et MCP vers les données de travail, ce qui supprime les problèmes de prompt et d'hallucinations. Pour le groupe Work : des spécifications, la mise en place du harness et des skills partagés, qui rendent le résultat reproductible et transférable à d'autres équipes.

### Classement par dépense

Le classement ordonne les personnes selon la somme dépensée sur un produit précis, par exemple Codex. Ainsi, la liste inclut quelqu'un qui dépense beaucoup sur Codex même si l'essentiel de sa dépense va à Chat.

| Personne | Équipe | $ sur le code / 3 mois | Tokens / 3 mois | Tokens par $ |
|---|---|---|---|---|
| Hana Sato | Équipe C | 438.20 | 21.9M | 50K |
| Luis Moreno | Équipe A | 395.60 | 12.7M | 32K |
| Ada Kowalski | Équipe D | 84.30 | 4.3M | 51K |

Source : Classement · un export par produit

**À retenir :**

**Dans cet exemple :** Hana Sato et Luis Moreno dépensent environ cinq fois plus pour le code que la troisième personne de la liste. À dépense comparable, Hana obtient une fois et demie plus de tokens par dollar que Luis.

**En général :** Les plus gros utilisateurs sont des agents du changement : ils trouvent les premiers les scénarios qui fonctionnent, et leur expérience influence la rentabilité d'un outil spécialisé. À côté d'eux se trouvent des collègues plus prudents, qui ont besoin de plus de temps et d'un exemple concret sur leurs propres tâches. Un classement par part de dépense masque les agents du changement : il vaut mieux regarder la dépense absolue.

**Étape suivante :** Impliquez les plus gros utilisateurs comme mentors : qu'ils montrent leurs scénarios à des collègues qui débutent, sur les tâches de ces collègues. Invitez les collègues prudents par des exemples et des résultats, sans obligation. Proposez aux deux ou trois premiers une expérience avec un outil spécialisé, accompagnée d'un compte rendu avant-après.

Le classement contient à la fois les dépenses et les tokens. Comparez le rapport tokens/dépense au sein d'un même groupe : un produit et des tâches similaires. Celui qui obtient nettement plus de tokens par dollar choisit en général mieux les modèles et les modes. Ce sont les utilisateurs les plus avancés et les plus efficaces, et ce sont les premiers à inviter comme mentors. Mettez-les en relation avec des collègues du même groupe dont le rapport est plus faible : résoudre une tâche ensemble apporte souvent plus qu'une formation générale. Des binômes issus d'équipes différentes favorisent la fertilisation croisée : les bonnes techniques circulent entre les équipes.

Pendant le déploiement, les plus gros utilisateurs peuvent dépenser un ordre de grandeur de plus que les autres. Il vaut mieux ne pas instaurer de limites à ce stade : elles démotivent facilement ceux qui adoptent l'outil en premier. À la place des limites, convenez d'expériences et d'un compte rendu des résultats. Les limites ont du sens plus tard, une fois les pratiques éprouvées et le coût normal d'un scénario connu.

### Segments de comportement

Des groupes selon l'intensité du comportement, construits à partir de plusieurs exports : combien une personne écrit, dépense et ce qu'elle fait.



| Segment | Personnes | Détails |
|---|---|---|
| Écrivent du code dans n'importe quel produit | 44 | dont 19 hors des équipes techniques |
| Recherche intensive dans le chat | 58 | plus de 1 900 messages en moyenne |
| Tâches agentiques | 33 | scénarios en plusieurs étapes, connecteurs |
| Génération d'images | 21 | deux tiers viennent d'une seule équipe |
| Totalement inactifs | 61 | 0 message, 0 $ sur toute la période |

Source : Utilisateurs · Classement

**À retenir :**

**Dans cet exemple :** Les plus grands segments pour les entretiens clients sont la recherche intensive (58) et le code (44, dont 19 hors des équipes techniques). Pour les 61 inactifs, la question est autre : qu'est-ce qui les empêche de commencer.

**En général :** Les données montrent ce que font les gens, mais pas si l'outil actuel leur suffit. Un segment est donc une hypothèse : il suggère qui inviter aux entretiens clients, quelles questions poser et quels problèmes les gens peuvent rencontrer. Des candidats d'outils apparaissent déjà ici, et le choix entre eux se fait après les entretiens, pour un problème confirmé.

**Étape suivante :** Pour chaque segment, parlez à 2 ou 3 personnes : où l'outil actuel est insuffisant et ce qu'elles font encore à la main. Réunissez les candidats pour un problème confirmé à partir de trois sources : consultations d'innovateurs au sein de l'entreprise, experts extérieurs et repères du marché, c'est-à-dire ce qu'utilisent des entreprises comparables. Suivez ensuite la procédure de décision : questionnaire, comparaison et test des candidats sur de vraies tâches. Si le problème n'est pas confirmé, reportez le segment au prochain recomptage.

## Nature du travail

**Objectif :** montrer quelles tâches les gens résolvent avec l'outil, avec quelles fonctions intégrées et via quelles intégrations.

### Connecteurs

Les connecteurs relient l'assistant aux données de travail : discussions, documents, code, agendas. Ils déterminent le volume d'hallucinations : sans accès aux données, le modèle comble lui-même la réponse. **Décision :** quelles équipes et quels systèmes connecter en premier.

Slack 520

Notion 340

GitHub 210

Calendrier 150

Source : Vue d'ensemble · bloc « App interactions »

**À retenir :**

**Dans cet exemple :** Slack et Notion représentent 70 % de toutes les connexions. Le modèle ne voit pas les systèmes hors de cette liste : il répond aux questions à leur sujet par une supposition.

**En général :** Le volume d'hallucinations baisse là où le modèle dispose du contexte nécessaire. Sans lui, l'agent essaie de combler le trou tout seul. Les équipes sans aucune connexion travaillent avec le modèle à l'aveugle, et presque toute réponse sur leurs processus est une supposition. Le signe en entretien client : « je dois tout revérifier ».

**Étape suivante :** Repérez les équipes sans aucune connexion et demandez en entretien où se trouvent leurs données de travail. Connectez une telle source et comparez avant et après sur 10 questions identiques : combien de réponses sont fausses et combien s'appuient sur les données de travail.

### Skills

Les skills montrent la maturité des processus : un scénario décrit une fois sous forme de skill se répète de la même façon pour quiconque le lance. Les statistiques indiquent quels skills sont utilisés et qui crée les siens. **Décision :** quels processus peuvent déjà être déployés dans d'autres équipes et lesquels dépendent encore de personnes précises.

spreadsheets 88

pdf 57

skill-creator 29

Source : Vue d'ensemble · bloc « Skills »

**À retenir :**

**Dans cet exemple :** Les skills pour les tableurs et les PDF totalisent 88 et 57 appels : ces processus sont déjà reproductibles. 29 appels à skill-creator : certaines personnes transforment leurs scénarios en skills.

**En général :** La maturité d'un processus progresse par étapes : demandes ponctuelles → skill personnel → skill partagé de l'équipe. À la première étape, le résultat dépend de qui a demandé et de la façon de le faire. Avec un skill, il est reproductible : la même entrée donne le même résultat. Un skill partagé rend le processus transférable à d'autres équipes.

**Étape suivante :** Rassemblez les skills dans une liste unique avec leurs auteurs et notez l'étape de chaque processus. Transformez les deux skills personnels les plus utilisés en skills partagés : l'auteur les présente à une équipe voisine, et l'équipe vérifie que les mêmes entrées donnent le même résultat. Les scénarios sans skill qui reviennent chaque semaine sont les premiers candidats à de nouveaux skills.

### Thèmes des projets

La synthèse regroupe les projets par sens et montre les tâches concrètes que les gens exécutent dans les projets en cours. Pour les entretiens clients, c'est une liste toute prête : quelles tâches aborder et avec qui. **Décision :** quelles tâches et les projets de qui couvrir en premier lors des entretiens.

| Thème | Projets | Tâches | Question à l'auteur |
|---|---|---|---|
| Ventes (Pitch library · Elif Demir) | 11 | argumentaires, traitement des objections, propositions commerciales | « Quelle partie d'un argumentaire le modèle fait-il bien, et que réécrivez-vous ? » |
| Intégration des nouveaux (New hire guide · Rafael Costa) | 8 | guides pour les nouveaux arrivants, réponses aux questions courantes | « Quelles questions des nouveaux le modèle traite-t-il déjà sans vous ? » |
| Étude de marché (Competitor notes · Jonas Keller) | 5 | synthèses sur les concurrents, comparaisons de prix | « Où prenez-vous les données, et à quelle vitesse deviennent-elles périmées ? » |

Source : Projets · noms regroupés par sens

**À retenir :**

**Dans cet exemple :** Les ventes (11) et l'intégration des nouveaux (8) ont le plus de projets permanents. Les auteurs des plus grands projets sont les premières personnes à interviewer.

**En général :** Un projet est une base de connaissances : des fichiers et des instructions sur lesquels le modèle s'appuie dans chaque réponse. Plus la base est riche, plus le résultat est précis et stable. Le contenu d'un projet suggère quoi demander en entretien : quels fichiers ont été ajoutés, ce qui manque et où les réponses demandent encore des corrections.

**Étape suivante :** Ouvrez les trois projets les plus actifs de chaque thème et dressez la liste des tâches concrètes. En entretien, posez à l'auteur la question du tableau et demandez quels fichiers et quelles instructions ont le plus changé la qualité des réponses. Transformez une configuration de projet réussie en modèle pour ce thème.

## Vérification

**Objectif :** vérifier les synthèses par rapport aux exports bruts, à la liste des projets et au classement. Tout chiffre du rapport peut être ramené à sa ligne d'origine dans un export.

### Liste complète des projets

Tous les projets avec leur auteur et leur statut. Cette liste sert à contrôler la synthèse par thèmes et à retrouver l'auteur d'un projet précis.

| Projet | Auteur | Statut | Msgs |
|---|---|---|---|
| Pitch library | Elif Demir | actif | 268 |
| Price list 2026 | Oskar Berg | actif | 64 |
| Personal draft | Pavel Novak | abandonné | 0 |

Source : Projets

**À retenir :**

**Dans cet exemple :** Le projet « Personal draft » compte zéro message.

**En général :** Un projet vide est une tentative abandonnée : la personne a commencé, mais l'outil n'est jamais entré dans son travail. Si ces projets restent dans le calcul, la synthèse par thèmes surestime l'usage.

**Étape suivante :** Écartez les projets à zéro message avant de compter et invitez 2 ou 3 de leurs auteurs : la raison de leur abandon est une réponse précieuse.

### Classement

L'export de facturation de chaque personne et de chaque produit. Les outils principaux et les classements en sont déduits.

| Nom | E-mail | Crédits | $ |
|---|---|---|---|
| Hana Sato | hana@example.com | 10,955 | 438.20 |
| Mira Castellano | mira@example.com | 2,425 | 97.00 |
| Jonas Keller | jonas@example.com | 470 | 18.80 |

Source : Classement · trois exports avec des filtres « Product » différents

**À retenir :**

**Dans cet exemple :** Les trois exports par produit s'additionnent pour donner la dépense totale de chaque personne de la liste.

**En général :** Les trois exports avec des filtres Product différents s'additionnent pour donner la dépense totale de chaque personne. Un écart supérieur à 2 % signifie qu'un export est incomplet ou que les périodes diffèrent.

**Étape suivante :** Avant de diffuser le rapport, additionnez les trois exports par personne et comparez avec la dépense totale. S'ils diffèrent, réexportez les données pour la même période.

## Choix des personnes

**Objectif :** désigner des personnes précises pour chaque manière d'accomplir les tâches.

### Candidats aux entretiens

Une courte liste de personnes pour chaque orientation repérée. Dans l'exemple, la liste finale compte 16 personnes sur 340 ; le tableau montre les trois premières. Chaque entreprise obtiendra son propre nombre. Le rapport ChatGPT est l'une des sources de l'échantillon : les utilisateurs d'autres outils et les personnes qui ont abandonné s'ajoutent selon les règles de « Qui interviewer », et la vérification auprès de tous les employés se fait par un questionnaire.

| Personne | Orientation | Signal |
|---|---|---|
| Hana Sato | code | 438 $ / 3 mois |
| Mira Castellano | tâches agentiques | 97 $ / 3 mois |
| Jonas Keller | recherche | 3 200+ msgs |

Source : les exports des utilisateurs, du classement et des projets, joints par e-mail

**À retenir :**

**Dans cet exemple :** Hana Sato, Mira Castellano et Jonas Keller représentent trois manières de travailler différentes : le code, les tâches agentiques et la recherche.

**En général :** La liste courte compte une personne par orientation : code, tâches d'agent, recherche. Chaque conversation montre alors sa propre manière de travailler et n'en répète pas une autre.

**Étape suivante :** Planifiez trois entretiens, un par orientation. Décidez ensuite quelle orientation nécessite 2 à 3 personnes de plus.

### Tableau de toutes les personnes

Tout le monde, avec des filtres par équipe, activité, orientation et outil principal.

Équipe B Activité : chaque semaine Outil : Work

| Personne | Équipe | Chat / Work | $ / 3 mois |
|---|---|---|---|
| Tomás Reid | Équipe B |  | 112.00 |
| Mira Castellano | Équipe B |  | 97.00 |

Source : les exports des utilisateurs, du classement et des projets, joints par e-mail

**À retenir :**

**Dans cet exemple :** Les filtres « Équipe B » et « Outil : Work » ont laissé deux personnes : Mira Castellano et Tomás Reid.

**En général :** Un tableau de toutes les personnes avec des filtres par équipe, activité et outil principal sert de base à tout échantillon suivant : une liste pour une nouvelle question n'exige aucun nouvel export.

**Étape suivante :** Enregistrez chaque jeu de filtres comme une vue distincte du tableau, pour que la liste suivante ne demande qu'un clic.

## Par où commencer aujourd'hui

Il n'est pas nécessaire d'avoir tout le rapport d'un coup : le premier résultat utile, une liste des utilisateurs les plus actifs, apparaît après le deuxième point.

Exporter les utilisateurs et le classement sur trois mois Le classement trois fois, une par produit. Un agent de navigateur peut se charger de l'export : Claude in Chrome · Gemini in Chrome · Perplexity Comet

Calculer les outils principaux et le classement par montant La première liste des utilisateurs les plus actifs est prête

**Calculer la profondeur d'adoption :** Au moins une fois / régulièrement / chaque semaine, en comptant à part ceux qui ne travaillent que via Codex

Dresser une liste de personnes et planifier les entretiens La manière de choisir ces personnes est décrite dans « Qui interviewer »

## Pour aller plus loin

Entretiens

Qui interviewer

Comment constituer un échantillon d'entretiens à partir du tableau des personnes

Entretiens

Comment interviewer les gens sur leur usage de l'IA

Un appel, un questionnaire et un seul tableau Airtable

Tous les noms, équipes, adresses et chiffres des exemples sont fictifs.
