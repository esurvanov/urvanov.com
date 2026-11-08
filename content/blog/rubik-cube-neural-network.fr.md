---
title: Un solveur de Rubik's Cube par IA bat plus de 1 000 équipes sur les cubes 4×4×4 et 5×5×5 : il apprend à partir de mélanges, cherche avec un large front et garde la réponse la plus courte de plusieurs réseaux
date: 2026-10-22
updated: 2026-11-08
description: Comment le réseau de neurones CayleyPy résout un Rubik's Cube en un minimum de coups : combien de combinaisons a un cube, pourquoi la force brute est impossible, comment une boussole apprend à partir de mélanges aléatoires, et pourquoi un large front de recherche et une escouade de réseaux comptent. Résultats sur 3×3×3, 4×4×4 et 5×5×5, parcours en schémas de l'article arXiv 2502.13266.
tags: IA, recherche, réseaux de neurones, Rubik's Cube, solveur de Rubik's Cube, recherche de chemins
category: research
layout: wide
mentions: AI Rubik's Cube solver, neural network Rubik's Cube, Rubik's Cube combinations, God's number, 4x4 cube solver, 5x5 cube solver, CayleyPy, beam search, ResMLP, diffusion distance, Kaggle Santa 2023, DeepCubeA, EfficientCube, Cayley graph
toc: video=Vidéo | question=Question | count=Combien de combinaisons | paper=Article et auteurs | maze=Labyrinthe | walk=Marche | compass=Boussole | front=Front | squad=Escouade | results=Résultats | width=Largeur du front | team=Pourquoi une escouade | surprise=Surprises | main=Bilan | formal=Formellement | practice=À quoi cela sert | when=Qui et quand | faq=FAQ | next=Pour aller plus loin
---

Le solveur de Rubik's Cube par IA fonctionne en trois temps : un réseau de neurones apprend à partir de mélanges aléatoires combien de coups il reste, une recherche en faisceau suit son estimation à travers des millions de positions à la fois, et plusieurs réseaux indépendants tournent en parallèle en gardant la solution la plus courte. Cela a battu le meilleur de plus de 1 000 équipes sur les cubes 4×4×4 et 5×5×5.

<b-post series="kto">

<b-chapter id="video" icon="video" title="Vidéo : la même histoire en 12 minutes">
  <b-why>Cet article suit la vidéo scène par scène et entre davantage dans le détail. Sous les schémas se trouve un lien vers le moment correspondant de la vidéo, commentée en russe.</b-why>
  <b-embed-frame src="https://www.youtube.com/embed/bg7tVawVWMc" title="Comment résoudre un Rubik's Cube en un minimum de coups — l'article arXiv 2502.13266 en mots simples" ratio="16/9"/>
  <b-cap>Article : <a href="https://arxiv.org/abs/2502.13266" target="_blank" rel="noopener">A Machine Learning Approach That Beats Large Rubik's Cubes</a>, arXiv 2502.13266, 18 février 2025. Labyrinthe, boussole, front et escouade sont des images pour expliquer ; dans l'article, ce sont le graphe de Cayley, le réseau de neurones, la recherche en faisceau et l'ensemble.</b-cap>
</b-chapter>

<b-chapter id="question" icon="cube" title="La question : résoudre un cube est facile, le résoudre en un minimum de coups est difficile">
  <b-why>N'importe qui peut apprendre à résoudre un Rubik's Cube en une soirée avec un guide. Un guide donne une longue solution, en général de 50 à 100 coups ou plus. La solution la plus courte est un autre problème, et pour les grands cubes personne ne sait encore la trouver.</b-why>

  Deux mots seront nécessaires. Un **coup** est un quart de tour d'une face. Une **position** est la façon dont les faces sont colorées à un instant donné. Un tour de face fait passer le cube d'une position à une autre. La question de l'article : comment passer d'une position donnée à la position résolue en un minimum de coups.

  <b-art names="rubik-cube-neural-network/turn"/>
  <b-cap>À gauche : résolu ; au milieu : après un coup ; à droite : après 20 coups aléatoires. <a href="https://youtu.be/bg7tVawVWMc?t=12" target="_blank" rel="noopener">▶ 0:12</a></b-cap>

  Pourquoi ne pas suivre un guide en supprimant les coups superflus ? Un guide résout le cube couche par couche, et chaque étape défait puis refait temporairement ce qui est déjà fait. Cela prend plusieurs fois plus de coups que le minimum. Pour trouver le minimum, il faudrait comparer tous les chemins possibles, et il y en a bien trop.
</b-chapter>

<b-chapter id="count" icon="grid" title="Combien de combinaisons a un Rubik's Cube">
  <b-why>Un Rubik's Cube 3×3×3 ordinaire a 43 252 003 274 489 856 000 combinaisons — environ 43 trillions, beaucoup trop pour les vérifier une à une. C'est pourquoi le résoudre en un minimum de coups est difficile.</b-why>

  Ce nombre vient des pièces. Un cube a 8 coins (3 couleurs chacun) et 12 arêtes (2 couleurs chacune) ; les centres des faces ne bougent jamais. Les coins peuvent être placés de 8! façons et tordus de 3⁷ façons — la torsion du dernier coin est fixée par les autres. Les arêtes peuvent être placées de 12! façons et retournées de 2¹¹ façons. La moitié des combinaisons ne peut pas se produire sur un vrai cube (on ne peut pas échanger exactement deux pièces sans le démonter), le produit est donc divisé par deux.

  <b-art names="rubik-cube-neural-network/pieces"/>
  <b-cap>À gauche : seuls les coins sont en couleur vive ; à droite : seulement les arêtes. <a href="https://youtu.be/bg7tVawVWMc?t=34" target="_blank" rel="noopener">▶ 0:34</a></b-cap>

  À un milliard de positions vérifiées par seconde, une recherche exhaustive d'un cube ordinaire prendrait environ 1 370 ans : départ en 2025, fin en 3395.

  <b-art names="rubik-cube-neural-network/years"/>
  <b-cap>Recherche exhaustive à un milliard de positions par seconde. <a href="https://youtu.be/bg7tVawVWMc?t=41" target="_blank" rel="noopener">▶ 0:41</a></b-cap>

  Les cubes plus grands ont plus de pièces, et le nombre croît encore plus vite. Un cube 5×5×5 a plus de positions qu'il n'y a d'atomes sur Terre.

  <b-art names="rubik-cube-neural-network/sizes"/>
  <b-cap>La longueur de la barre est le nombre de chiffres du nombre de positions. <a href="https://youtu.be/bg7tVawVWMc?t=51" target="_blank" rel="noopener">▶ 0:51</a></b-cap>

  Pour le cube ordinaire, le minimum est connu. Le **nombre de Dieu** est le plus grand nombre de coups que peut exiger la solution la plus courte d'une position quelconque. Il a été trouvé par recherche informatique avec des raccourcis de symétrie : 20 coups quand un demi-tour compte pour un coup (2010), et 26 coups quand seuls les quarts de tour sont comptés (2014). Pour les 4×4×4 et 5×5×5, il n'existe pas de telle réponse.

  <b-table>
    <table><thead>
    <tr><th>Cube</th><th class="bk-table-r">Positions</th><th>Ce que l'on sait des chemins les plus courts</th></tr>
    </thead><tbody>
    <tr><td>3×3×3</td><td class="bk-table-r">4.3·10¹⁹</td><td>nombre de Dieu : 20 coups (demi-tour = 1 coup), 26 coups (quarts de tour seulement)</td></tr>
    <tr><td>4×4×4</td><td class="bk-table-r">7.4·10⁴⁵</td><td>une conjecture de 48 coups, non démontrée</td></tr>
    <tr><td>5×5×5</td><td class="bk-table-r">2.8·10⁷⁴</td><td>inconnu</td></tr>
    </tbody></table>
  </b-table>
  <b-finding>
    <ex>Pour les cubes 4×4×4 et 5×5×5, une recherche exhaustive est impossible, et les chemins les plus courts sont inconnus.</ex>
    <gen>Quand l'espace des états est immense, les chemins les plus courts se cherchent sans énumération : avec une estimation de distance et une recherche intelligente. La qualité se vérifie sur des tâches dont la réponse est connue ou la meilleure connue.</gen>
    <do>Avant de juger que « l'IA a résolu le problème », cherchez à quoi on la compare : un optimum démontré ou la meilleure solution connue.</do>
  </b-finding>
</b-chapter>

<b-chapter id="paper" icon="trophy" title="L'article, les auteurs et la compétition">
  <b-why>En 2023, plus d'un millier d'équipes de programmeurs ont concouru sur Kaggle dans Santa 2023 : qui saurait résoudre des puzzles, grands cubes compris, avec le moins de coups au total.</b-why>

  Kaggle est une plateforme où des entreprises et des chercheurs publient des problèmes et où des équipes du monde entier s'affrontent sur les solutions. Santa 2023 avait un score simple : le nombre total de coups sur tous les puzzles, le plus bas étant le meilleur. Les meilleures réponses de la compétition sont devenues la référence pour les grands cubes.

  Le 18 février 2025, douze auteurs du projet CayleyPy ont publié l'article « A Machine Learning Approach That Beats Large Rubik's Cubes ». Leur programme a battu les meilleures réponses de la compétition sur les cubes 4×4×4 et 5×5×5 et est devenu le premier réseau de neurones à résoudre des cubes plus grands que le cube ordinaire.

  <b-art names="rubik-cube-neural-network/authors"/>
  <b-cap>Auteurs dans l'ordre de l'article. L'auteur de ce blog est l'un des coauteurs.</b-cap>
  <b-art names="rubik-cube-neural-network/race"/>
  <b-cap>La compétition et le résultat : longueur moyenne de la solution, en coups. <a href="https://youtu.be/bg7tVawVWMc?t=77" target="_blank" rel="noopener">▶ 1:17</a></b-cap>
</b-chapter>

<b-chapter id="maze" icon="boxes-route" title="Le cube comme labyrinthe de positions">
  <b-why>L'image centrale : chaque position est une salle, chaque coup est une porte vers une salle voisine, le cube résolu est la sortie.</b-why>

  **Une salle est une coloration du cube.** Tournez une face et vous êtes dans la salle voisine. Elle est voisine parce que la coloration diffère d'un seul tour.

  <b-art names="rubik-cube-neural-network/rooms"/>
  <b-cap>À droite, la même coloration avec la face droite tournée. <a href="https://youtu.be/bg7tVawVWMc?t=95" target="_blank" rel="noopener">▶ 1:35</a></b-cap>

  Chaque salle d'un cube ordinaire a 12 portes : le cube a 6 faces, chacune peut être tournée dans le sens horaire ou antihoraire.

  <b-art names="rubik-cube-neural-network/doors"/>
  <b-cap>Les 12 salles voisines : derrière chaque porte se trouve une coloration différente. <a href="https://youtu.be/bg7tVawVWMc?t=105" target="_blank" rel="noopener">▶ 1:45</a></b-cap>

  Toutes les salles ensemble forment le labyrinthe — en mathématiques, le graphe de Cayley du groupe du cube. **Il y a toujours une sortie : le cube résolu.** **Le départ est votre cube mélangé**, la position à résoudre. Résoudre le cube en un minimum de coups, c'est aller du départ à la sortie en franchissant le moins de portes possible.

  Ci-dessous, un labyrinthe jouet de 40 salles. Le vrai en compte 4.3·10¹⁹, à 12 portes chacune ; il ne peut pas être dessiné, et le petit montre comment fonctionne chaque partie du programme.

  <b-art names="rubik-cube-neural-network/map"/>
  <b-cap>Sortie à gauche, départ à droite, les traits épais sont des murs. <a href="https://youtu.be/bg7tVawVWMc?t=132" target="_blank" rel="noopener">▶ 2:12</a></b-cap>

  Élevons maintenant chaque salle à une hauteur égale à son nombre de coups jusqu'à la sortie. On obtient un relief : la sortie est le point le plus bas, et le chemin le plus court depuis n'importe quelle salle est une descente d'escalier, chaque marche d'un cran plus bas. Si la hauteur de chaque salle était connue, résoudre serait facile : toujours descendre. Personne ne connaît ces hauteurs — c'est ce que le réseau de neurones va deviner.

  <b-art names="rubik-cube-neural-network/relief"/>
  <b-cap>Le relief du même labyrinthe. <a href="https://youtu.be/bg7tVawVWMc?t=119" target="_blank" rel="noopener">▶ 1:59</a></b-cap>
</b-chapter>

<b-chapter id="walk" icon="flag" title="Une marche depuis la sortie">
  <b-why>Personne n'a de carte du labyrinthe : il y a trop de salles. Les auteurs travaillent donc à rebours.</b-why>

  Ils se placent à la sortie et font des coups au hasard — une marche, c'est-à-dire simplement un mélange du cube résolu. Après chaque coup, ils notent la coloration et le nombre de coups effectués. L'ordinateur génère de telles paires « position → nombre de coups » par milliards pendant l'entraînement même : une marche ne coûte presque rien et ne demande aucune carte.

  <b-art names="rubik-cube-neural-network/walks"/>
  <b-cap>À gauche : une marche dans le labyrinthe ; à droite : les notes dont le réseau apprend. <a href="https://youtu.be/bg7tVawVWMc?t=164" target="_blank" rel="noopener">▶ 2:44</a></b-cap>
  <b-kv-rows>
    <row k="Marche">coups aléatoires depuis le cube résolu, sans jamais revenir directement en arrière</row>
    <row k="Longueur">jusqu'à 26 coups pour le 3×3×3, 45 pour le 4×4×4, 65 pour le 5×5×5</row>
    <row k="Note">position → coups effectués jusque-là</row>
    <row k="Volume">8 milliards de positions ; 1 million de nouvelles avant chaque tour d'entraînement</row>
  </b-kv-rows>
</b-chapter>

<b-chapter id="compass" icon="search" title="La boussole : un réseau qui devine la distance à la sortie">
  <b-why>La boussole apprend à partir des marches : elle regarde une coloration et devine combien de coups restent jusqu'à la sortie — la hauteur de la salle sur le relief.</b-why>

  <b-art names="rubik-cube-neural-network/net"/>
  <b-cap>La boussole est un réseau de neurones ordinaire : une coloration en entrée, un nombre en sortie.</b-cap>

  La boussole se trompe, et par excès : une marche tourne en rond, il faut donc plus de coups que par le chemin le plus court. Sur le schéma, une marche atteint une salle en 8 coups alors que la salle est en réalité à 2 coups. Mais plus une marche est allée loin, plus la salle est en moyenne éloignée de la sortie ; la boussole indique donc la bonne direction : un nombre plus petit signifie plus près de la sortie. Les auteurs appellent distance de diffusion le nombre moyen de coups de marche jusqu'à une position.

  <b-art names="rubik-cube-neural-network/loop"/>
  <b-cap>Pourquoi la boussole surestime. <a href="https://youtu.be/bg7tVawVWMc?t=186" target="_blank" rel="noopener">▶ 3:06</a></b-cap>
  <b-io justify>
    <item k="Entrée">La position du cube : une liste de nombres indiquant où se trouve maintenant chacun des 54 autocollants</item>
    <item k="Réseau">10 couches, 4 millions de paramètres ; entraîné sur 8 milliards de positions issues de marches</item>
    <item k="Sortie">Une estimation du nombre de coups restant jusqu'au cube résolu</item>
  </b-io>

  La boussole est la première partie du programme des auteurs. Dans la suite, tout le programme s'appelle le **solveur** : boussole, front et escouade.
</b-chapter>

<b-chapter id="front" icon="flag-alt" title="Le front : pourquoi un seul chemin ne suffit pas">
  <b-why>Si l'on suit un seul chemin là où pointe la boussole, une seule erreur de la boussole mène à une impasse.</b-why>

  La façon simple de suivre une boussole : depuis la salle courante, passer dans la voisine au nombre le plus petit. Sur le schéma, les nombres dans les salles sont les estimations d'une boussole qui se trompe d'un ou deux coups. Le chemin unique fait trois pas, entre dans une salle où la boussole s'était trompée, et heurte un mur.

  <b-art names="rubik-cube-neural-network/deadend"/>
  <b-cap>Un chemin unique qui suit la boussole. <a href="https://youtu.be/bg7tVawVWMc?t=217" target="_blank" rel="noopener">▶ 3:37</a></b-cap>

  Le solveur avance donc en front — la recherche en faisceau (beam search) de l'article. Un front, c'est plusieurs salles à la fois. À chaque pas, le solveur ouvre toutes les portes de toutes les salles du front, la boussole note les nouveaux voisins, et seuls les plus prometteurs continuent. Le nombre de salles gardées est la largeur du front ; les auteurs montent jusqu'à 2²⁴ ≈ 16 millions. Si la boussole se trompe sur une salle, les autres salles du front sont toujours là et le chemin ne se brise pas.

  <b-art names="rubik-cube-neural-network/front"/>
  <b-cap>La même boussole, un front de largeur 3. <a href="https://youtu.be/bg7tVawVWMc?t=249" target="_blank" rel="noopener">▶ 4:09</a></b-cap>
</b-chapter>

<b-chapter id="squad" icon="users-alt" title="L'escouade : plusieurs boussoles et la réponse la plus courte">
  <b-why>Chaque boussole apprend à partir de ses propres marches aléatoires ; deux boussoles se trompent donc sur des salles différentes.</b-why>

  Les auteurs constituent une escouade : plusieurs réseaux entraînés indépendamment, chacun avec son propre front. Chacun cherche de son côté, et le chemin le plus court trouvé devient la réponse. Vérifier une réponse coûte peu — il suffit de compter les coups — donc des réseaux supplémentaires ne nuisent jamais ; ils ajoutent seulement des chances d'un chemin plus court.

  <b-art names="rubik-cube-neural-network/squad"/>
  <b-cap>Trois boussoles aux erreurs différentes sur le même labyrinthe. <a href="https://youtu.be/bg7tVawVWMc?t=276" target="_blank" rel="noopener">▶ 4:36</a></b-cap>
</b-chapter>

<b-chapter id="results" icon="trophy" title="Résultats">
  <b-why>Trois cubes, trois histoires.</b-why>

  **Cube ordinaire 3×3×3.** Le solveur trouve le chemin le plus court possible dans 98 cas sur 100. Les meilleurs réseaux précédents — DeepCubeA (2019) et EfficientCube (2023) — en réussissaient 60 et 70.

  <b-dot-grid n="100" on="0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97"></b-dot-grid>
  <b-cap>98 tâches sur 100 — chemin le plus court (précisément, 98,4 % sur 1 000 positions du travail DeepCubeA). <a href="https://youtu.be/bg7tVawVWMc?t=283" target="_blank" rel="noopener">▶ 4:43</a></b-cap>

  **Cube 4×4×4.** Le chemin du solveur est en moyenne plus court de 7 coups que celui des meilleures équipes de la compétition : 46,5 contre 53,5. C'est en dessous de la limite conjecturée de 48 coups.

  <b-share-bar kind="wide" label="Cube 4×4×4 : longueur moyenne de la solution">
    <seg w="46.51" color="accent" ink="#fff">solveur · 46,5</seg>
    <seg w="6.98" color="d-none">+7 pour les meilleures équipes</seg>
  </b-share-bar>

  **Cube 5×5×5.** Le solveur est plus court que les meilleures équipes sur chacune des 19 tâches de la compétition : 92,2 coups contre 96,6 en moyenne.

  <b-art names="rubik-cube-neural-network/checks"/>
  <b-cap>19 sur 19. <a href="https://youtu.be/bg7tVawVWMc?t=302" target="_blank" rel="noopener">▶ 5:02</a></b-cap>
  <b-table>
    <table><thead>
    <tr><th>Cube</th><th>Jeu de tâches</th><th>Meilleur avant l'article</th><th>CayleyPy</th></tr>
    </thead><tbody>
    <tr><td>3×3×3</td><td>1 000 positions du travail DeepCubeA</td><td>60,3 % et 69,6 % de chemins les plus courts (DeepCubeA, EfficientCube)</td><td><b>98,4 %</b>, 26 boussoles</td></tr>
    <tr><td>4×4×4</td><td>43 positions, Kaggle Santa 2023</td><td>53,49 coups en moyenne</td><td><b>46,51</b> coups, 29 boussoles</td></tr>
    <tr><td>5×5×5</td><td>19 positions, Kaggle Santa 2023</td><td>96,58 coups</td><td><b>92,16</b> coups, 69 boussoles</td></tr>
    </tbody></table>
  </b-table>
  <b-cap>Tableau I de l'article.</b-cap>
</b-chapter>

<b-chapter id="width" icon="bulb" title="Pourquoi : la largeur du front">
  <b-why>Une erreur de la boussole dans une salle est corrigée par les autres salles du front ; plus le front est large, plus le chemin trouvé est court.</b-why>

  Sur le schéma, la même boussole tombe dans une impasse à la largeur 1, trouve un chemin de 11 coups à la largeur 2 et le plus court, 9 coups, à la largeur 3. Les chemins sont calculés par une vraie recherche en faisceau. Le prix de la largeur est le temps : un front plus large examine plus de salles.

  <b-art names="rubik-cube-neural-network/width"/>
  <b-cap>La même boussole, une largeur de front différente. <a href="https://youtu.be/bg7tVawVWMc?t=331" target="_blank" rel="noopener">▶ 5:31</a></b-cap>

  Dans l'article, sur le cube 4×4×4, un front 256 fois plus large a fait passer le chemin de 60 coups à 50, et chaque doublement de la largeur retirait à peu près le même nombre de coups.

  <b-count-bars>
    <bar k="65 K" w="100%" color="c-none">60.2</bar>
    <bar k="262 K" w="94%" color="c-none">56.7</bar>
    <bar k="1 M" w="92%" color="c-none">55.3</bar>
    <bar k="4 M" w="88%" color="c-none">52.8</bar>
    <bar k="16 M" w="84%" color="accent">50.6</bar>
  </b-count-bars>
  <b-cap>Largeur du front et chemin moyen sur le cube 4×4×4, en coups. Tableau III de l'article.</b-cap>
  <b-finding>
    <ex>Chaque doublement de la largeur retire à peu près le même nombre de coups du chemin.</ex>
    <gen>De tous les réglages, la largeur du front est celui qui influe le plus sur le résultat — plus que la taille du réseau ou la quantité de données.</gen>
    <do>Quand l'estimation de distance est imprécise, investissez dans la largeur de recherche plutôt que dans une estimation parfaite.</do>
  </b-finding>
</b-chapter>

<b-chapter id="team" icon="users" title="Pourquoi : l'escouade">
  <b-why>Pour le cube 5×5×5, les auteurs ont entraîné 69 boussoles. Sur chaque tâche, celle au chemin le plus court l'emporte, et les chemins de 10 d'entre elles ont fini dans les réponses finales.</b-why>

  Même les boussoles faibles se sont révélées utiles : chacune a remporté une ou deux tâches difficiles. Ensemble, l'escouade trouve des chemins jusqu'à 8 coups plus courts que la meilleure boussole seule. Et la toute première boussole du 4×4×4 battait à elle seule toutes les meilleures réponses de la compétition — sans pour autant entrer dans l'ensemble final : les autres, réunies, étaient plus courtes.

  <b-dot-grid n="69" on="3,11,17,24,30,38,45,52,60,66"></b-dot-grid>
  <b-cap>69 boussoles pour le 5×5×5 ; les 10 dont les chemins sont entrés dans la réponse sont mises en évidence. Lesquelles exactement est une esquisse ; dans l'article, c'est la figure 3. <a href="https://youtu.be/bg7tVawVWMc?t=362" target="_blank" rel="noopener">▶ 6:02</a></b-cap>
  <b-finding>
    <ex>Un ensemble de 10 boussoles différentes est jusqu'à 8 coups plus court que la meilleure d'entre elles.</ex>
    <gen>Quand une réponse est facile à vérifier, plusieurs modèles entraînés indépendamment avec sélection de la meilleure réponse apportent plus que le perfectionnement d'un seul modèle.</gen>
    <do>Si vérifier une réponse coûte peu, lancez plusieurs modèles différents et prenez le meilleur résultat.</do>
  </b-finding>
</b-chapter>

<b-chapter id="surprise" icon="bulb" title="Surprises">
  <b-why>Trois observations que les auteurs qualifient d'inattendues.</b-why>

  <b-art names="rubik-cube-neural-network/surprises"/>
  <b-cap>Données, taille du réseau, temps. <a href="https://youtu.be/bg7tVawVWMc?t=397" target="_blank" rel="noopener">▶ 6:37</a></b-cap>
  <b-steps top="14" round>
    <step t="Plus de données n'est pas mieux">Au-delà de 8 milliards de positions, la boussole ne s'améliore presque plus : 4, 8 et 16 milliards donnent un chemin moyen de 55,4, 55,1 et 55,8 coups sur le cube 4×4×4</step>
    <step t="Une petite boussole est plus précise">4 millions de paramètres contre 14,7 millions dans les réseaux précédents — presque quatre fois plus petite et pourtant plus précise ; même un réseau à une seule couche atteint 90,4 % de chemins les plus courts</step>
    <step t="Plus rapide">L'entraînement prend 4 h 40 min au lieu de 86 h 25 min ; résoudre un cube sur la même machine avec la même largeur de front prend 10,9 s contre 287,8 s, soit environ 26 fois plus vite</step>
  </b-steps>
</b-chapter>

<b-chapter id="main" icon="flag" title="Le bilan">
  <b-why>La question était : peut-on trouver une solution courte pour un cube immense sans vérifier chaque position ? Oui.</b-why>

  Trois parties suffisent : une boussole apprend à partir de marches aléatoires qui s'éloignent de la sortie, un large front pardonne ses erreurs, et une escouade de boussoles différentes choisit le chemin le plus court. Le solveur ne sait rien du cube lui-même — seulement des salles et des portes — et convient donc à d'autres labyrinthes.

  <b-step-chain>
    <node t="Marches">données bon marché, pas de carte</node>
    <node t="Boussole">estimation des coups jusqu'à la sortie</node>
    <node t="Front">pardonne les erreurs de la boussole</node>
    <node t="Escouade">la plus courte des réponses</node>
  </b-step-chain>
  <b-callout icon="shield-check">**Réserve.** Les chemins les plus courts pour les grands cubes sont inconnus ; le solveur est donc comparé aux meilleures solutions connues, pas à l'optimum.</b-callout>
</b-chapter>

<b-chapter id="formal" icon="boxes-route" title="Formellement : le même parcours dans le langage de l'article">
  <b-why>La seconde partie de la vidéo : les mêmes étapes sous forme de formules.</b-why>

  <b-table>
    <table><thead>
    <tr><th>Dans la vidéo</th><th>Dans l'article</th><th>Comment cela fonctionne</th></tr>
    </thead><tbody>
    <tr><td>labyrinthe</td><td>graphe de Cayley (Schreier) du groupe du cube</td><td>les sommets sont les positions, les arêtes sont les coups</td></tr>
    <tr><td>position</td><td>permutation</td><td>(p(0), …, p(53)) : où est allé chacun des 54 autocollants ; un coup déplace 20 autocollants</td></tr>
    <tr><td>marche</td><td>paires (position, k)</td><td>le k moyen est la distance de diffusion ; elle dépasse la distance la plus courte</td></tr>
    <tr><td>boussole</td><td>réseau de neurones ResMLP</td><td>10 couches, 4 M de paramètres, minimise (estimation − k)² ; 1 M de nouvelles positions avant chaque tour d'entraînement</td></tr>
    <tr><td>front</td><td>recherche en faisceau</td><td>voisins → déduplication → estimation → les W meilleurs ; W jusqu'à 2²⁴, au plus 200 pas</td></tr>
    <tr><td>escouade</td><td>agents</td><td>longueur de la réponse = min(L₁, …, L_A) sur les agents</td></tr>
    </tbody></table>
  </b-table>
  <b-art names="rubik-cube-neural-network/perm"/>
  <b-cap>Une position est une permutation : comme un jeu de cartes battu — les mêmes cartes, un ordre différent. 9 des 54 autocollants sont montrés. <a href="https://youtu.be/bg7tVawVWMc?t=495" target="_blank" rel="noopener">▶ 8:15</a></b-cap>
  <b-art names="rubik-cube-neural-network/beam"/>
  <b-cap>Un pas de recherche en faisceau : comme un tour de tournoi, les meilleurs passent. <a href="https://youtu.be/bg7tVawVWMc?t=579" target="_blank" rel="noopener">▶ 9:39</a></b-cap>

  La recherche en faisceau en quelques lignes ; les auteurs ont publié le code PyTorch complet avec l'article.

  <b-codebox copy>
    def beam_search(start, model, W, steps=200):
        front = [start]
        for _ in range(steps):
            nbrs = unique(move(v) for v in front for move in MOVES)
            if SOLVED in nbrs: return True
            front = sorted(nbrs, key=model)[:W]   # W best by the compass
        return False
  </b-codebox>
</b-chapter>

<b-chapter id="practice" icon="grid" title="À quoi cela sert">
  <b-why>Le solveur ne sait pas qu'il regarde un cube : il lui faut seulement des positions, des coups et un but. La même approche convient donc à tout problème consistant à passer d'un état à un autre par le chemin le plus court.</b-why>
  <b-table>
    <table><thead>
    <tr><th>Lien</th><th>Où</th></tr>
    </thead><tbody>
    <tr><td><b-tag kind="ok">direct</b-tag></td><td>puzzles : cubes de toute taille, la compétition Kaggle Santa</td></tr>
    <tr><td><b-tag kind="ok">direct</b-tag></td><td>chemins les plus courts dans d'immenses graphes de permutations où l'énumération est impossible</td></tr>
    <tr><td><b-tag kind="plain">projets des auteurs</b-tag></td><td>problèmes de biologie et de programmation</td></tr>
    <tr><td><b-tag kind="plain">analogie</b-tag></td><td>planification : un robot ou un jeu qui doit passer d'un état à un autre</td></tr>
    </tbody></table>
  </b-table>
  <b-callout icon="bulb">**Leçon.** Sans carte, entraînez une boussole sur des marches aléatoires et avancez en large front.</b-callout>
</b-chapter>

<b-chapter id="when" icon="shield-check" title="Qui et quand, ce qui est démontré">
  <b-steps top="14" round>
    <step t="1974">Ernő Rubik invente le cube</step>
    <step t="2010">Démontré : toute position du 3×3×3 se résout en 20 coups quand un demi-tour compte pour un coup</step>
    <step t="2014">Démontré : en 26 coups quand seuls les quarts de tour sont comptés</step>
    <step t="2019">Le réseau DeepCubeA, de l'Université de Californie à Irvine, résout pour la première fois le cube ordinaire sans indication humaine</step>
    <step t="2023">Compétition Kaggle Santa : plus de 1 000 équipes résolvent de grands cubes</step>
    <step t="2025" hl>L'article CayleyPy : le premier réseau de neurones à battre tout le monde sur les 4×4×4 et 5×5×5</step>
  </b-steps>

  C'est une expérience, pas une démonstration : les chiffres sont mesurés sur des jeux de tâches issus de travaux antérieurs et de la compétition, et les chemins les plus courts pour les grands cubes sont inconnus. Le chemin moyen de 46,5 coups sur le cube 4×4×4 est en dessous de la limite conjecturée de 48 coups, mais la conjecture elle-même n'est pas démontrée. Plusieurs chiffres de l'article ne concordent pas : la part de chemins les plus courts sur un cube ordinaire est donnée à la fois comme 98,4 % et 97,6 %, et le nombre de réseaux de l'escouade du 4×4×4 sous 48 coups à la fois comme 29 et 6.
</b-chapter>

<b-chapter id="faq" icon="chat" title="FAQ">
  <b-faq-cards>
    <q t="Un réseau de neurones peut-il résoudre un Rubik's Cube ?">Oui. Des réseaux de neurones résolvent le cube ordinaire depuis 2019 (DeepCubeA), et en 2025 CayleyPy est devenu le premier réseau de neurones à résoudre des cubes 4×4×4 et 5×5×5, en moins de coups que les meilleures équipes de la compétition.</q>
    <q t="Combien de combinaisons a un Rubik's Cube 3×3×3 ?">43 252 003 274 489 856 000 — environ 4,3·10¹⁹. Un 4×4×4 en a environ 7,4·10⁴⁵, un 5×5×5 environ 2,8·10⁷⁴.</q>
    <q t="Quel est le nombre minimal de coups pour résoudre n'importe quel Rubik's Cube ?">Le cube ordinaire 3×3×3 demande au plus 20 coups quand un demi-tour compte pour un coup, et 26 quand seuls les quarts de tour sont comptés. Pour les cubes plus grands, la réponse exacte est inconnue.</q>
    <q t="En quoi CayleyPy diffère-t-il de DeepCubeA ?">Son réseau est presque quatre fois plus petit et s'entraîne environ 18 fois plus vite, et la recherche se fait en large front avec une escouade de réseaux. Sur le cube ordinaire, cela donne 98 % de chemins les plus courts contre 60 %.</q>
    <q t="Puis-je l'essayer moi-même ?">Oui : le code des auteurs est ouvert, la bibliothèque CayleyPy est sur GitHub (lien ci-dessous).</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Pour aller plus loin">
  <b-links cols="3">
    <item href="https://arxiv.org/abs/2502.13266" k="Article" t="arXiv 2502.13266" ext>A Machine Learning Approach That Beats Large Rubik's Cubes</item>
    <item href="https://github.com/cayleypy/cayleypy" k="Code" t="CayleyPy sur GitHub" ext>Une bibliothèque de recherche de chemins dans les graphes de permutations</item>
    <item href="https://youtu.be/bg7tVawVWMc" k="Vidéo" t="Présentation sur YouTube" ext>La même histoire en 12 minutes, avec la 3D et les formules (en russe)</item>
  </b-links>
</b-chapter>
<b-footer>Les chiffres viennent de l'article de A. Chervov, K. Khoruzhii, …, E. Urvanov, A. Romanov, arXiv 2502.13266 (tableaux I–III, figures 2–3). Le labyrinthe dessiné et ses nombres sont une esquisse ; ses chemins sont calculés par recherche en faisceau. L'auteur de ce blog est l'un des coauteurs de l'article.</b-footer>
</b-post>
