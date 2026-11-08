---
title: Quel arrangement de boules sur un anneau est le plus long à démêler : très probablement le « miroir » — force brute, IA et conjecture du nombre de paires
date: 2026-10-22
updated: 2026-11-08
description: Combien de coups exige l’arrangement le plus emmêlé de boules sur un anneau avec rotation et échange, et ce qu’est le diamètre d’un graphe de Cayley. Comment la force brute, un réseau de neurones avec recherche en faisceau, un concours Kaggle et des preuves convergent vers n(n−1)/2 — l’article CayleyPy RL (arXiv 2502.18663) expliqué en schémas.
tags: IA, recherche, réseaux de neurones, mathématiques, graphes de Cayley, recherche de chemin
category: research
layout: wide
mentions: Cayley graph, Cayley graph diameter, God's number, symmetric group, permutations, LRX, OEIS A186783, n(n−1)/2 conjecture, CayleyPy, beam search, Bellman equation, GAP, Kaggle, TopSpin puzzle, Hungarian Rings
toc: video=Vidéo | question=Question | paper=Article et auteurs | tower=Tour | mirror=Miroir | pairs=Paires | gap=Vingt boules | compass=Boussole | front=Front | hint=Astuce | contest=Concours | triples=Triplets | fork=Fourchette | main=Bilan | formal=Formellement | practice=À quoi ça sert | when=Qui et quand | faq=Questions | next=Pour aller plus loin
---

L’arrangement le plus long à démêler est très probablement le « miroir » — l’anneau reflété par rapport à la fenêtre d’échange — et il exige autant de coups qu’il y a de paires de boules : n(n−1)/2. La force brute jusqu’à 15 boules, un réseau de neurones avec recherche en faisceau jusqu’à 100 et un concours ouvert jusqu’à 200 boules concordent, et des preuves enserrent la réponse dans une fourchette étroite.

<b-post series="kto">

<b-chapter id="video" icon="video" title="Vidéo : la même histoire en 11 minutes">
  <b-why>L’article suit la vidéo scène par scène, avec plus de détails. Chaque schéma renvoie à son moment dans la vidéo.</b-why>
  <b-embed-frame src="https://www.youtube.com/embed/ecc2GvvZGvM" title="Quel arrangement de boules est le plus long à démêler — l’article arXiv 2502.18663 expliqué simplement (en russe)" ratio="16/9"/>
  <b-cap>Article : <a href="https://arxiv.org/abs/2502.18663" target="_blank" rel="noopener">CayleyPy RL: Pathfinding and Reinforcement Learning on Cayley Graphs</a>, arXiv 2502.18663, 25 février 2025 ; Advances in Theoretical and Mathematical Physics, 2026. L’anneau, les étages, le plafond, la boussole et le front sont des images pour expliquer ; dans l’article, ce sont un graphe de Cayley, la distance, le diamètre, un réseau de neurones et la recherche en faisceau. La vidéo est en russe.</b-cap>
</b-chapter>

<b-chapter id="question" icon="grid" title="Question : un anneau, trois coups et l’arrangement le plus emmêlé">
  <b-why>Prenez un anneau de boules numérotées. Quelle que soit la façon de les mélanger, on peut toujours les remettre en ordre. La question : quel arrangement est le plus long à démêler, et combien de coups faut-il ?</b-why>

  Trois mots vont compter. Un **coup** consiste à tourner l’anneau à gauche, à le tourner à droite, ou à échanger les deux boules dans la **fenêtre** du haut. Un **arrangement** est la façon dont les boules sont placées autour de l’anneau. Il n’y a pas d’autres coups : on ne peut pas prendre une boule au milieu, tout passe par la fenêtre.

  <b-art names="longest-ring-arrangement/moves"/>
  <b-cap>À gauche : boules en ordre ; au centre : après une rotation à gauche ; à droite : après un échange dans la fenêtre. <a href="https://youtu.be/ecc2GvvZGvM?t=8" target="_blank" rel="noopener">▶ 0:08</a></b-cap>

  Pourquoi est-ce difficile ? Démêler n’importe quel arrangement est facile : amener la boule voulue à la fenêtre et échanger jusqu’à ce que tout soit en place. Mais cela gaspille beaucoup de coups. Pour connaître le minimum, il faut comparer tous les chemins, et un anneau a 1·2·3·…·n arrangements, un nombre qui dépasse n’importe quelle puissance.

  Un problème voisin — le même anneau, avec rotation dans un seul sens plus l’échange — a été posé par le cybernéticien Viktor Glouchkov en 1968. Il est toujours ouvert.
</b-chapter>

<b-chapter id="paper" icon="trophy" title="L’article, ses auteurs et le concours">
  <b-why>La question est étudiée par 34 auteurs du projet CayleyPy — la même équipe qui a appris à un réseau de neurones à <a href="/blog/rubik-cube-neural-network/">résoudre des Rubik’s Cubes 4×4×4 et 5×5×5</a>.</b-why>

  « CayleyPy RL » est le deuxième article de la série : le premier montrait la méthode sur des cubes, celui-ci l’étend aux graphes de Cayley généraux et la teste sur l’anneau de boules. Quatre manières de répondre à une même question s’y rejoignent : la force brute sur de petits anneaux, un programme entraîné pour les grands, un concours de programmation ouvert et des preuves rigoureuses.

  <b-art names="longest-ring-arrangement/authors"/>
  <b-cap>34 auteurs dans l’ordre de l’article, noms tels qu’imprimés dans l’article.</b-cap>

  Kaggle est une plateforme où des chercheurs publient des problèmes et où des équipes du monde entier rivalisent sur les solutions. Les auteurs y ont ouvert trois défis sur cet anneau et publié leur code pour que chacun puisse l’exécuter et tenter de le battre.
</b-chapter>

<b-chapter id="tower" icon="boxes-route" title="La tour des arrangements : étages et plafond">
  <b-why>Voici tous les arrangements d’un coup. Cinq boules en ont 120.</b-why>

  Chaque arrangement se place à un **étage** : le nombre de coups qui le séparent de l’ordre par le plus court chemin. L’ordre est en bas, trois voisins au premier étage (un par coup), puis les étages s’élargissent et se resserrent de nouveau. L’étage le plus haut est le **plafond** : ce nombre de coups suffit pour n’importe quel arrangement. Pour cinq boules, le plafond est à l’étage 10, et un seul arrangement s’y trouve.

  <b-art names="longest-ring-arrangement/tower"/>
  <b-cap>La largeur de la barre est le nombre d’arrangements de l’étage ; calculé par force brute. <a href="https://youtu.be/ecc2GvvZGvM?t=73" target="_blank" rel="noopener">▶ 1:13</a></b-cap>

  Le plafond est la même chose que le <a href="/blog/rubik-cube-neural-network/">nombre de Dieu du Rubik’s Cube</a> : le plus grand nombre de coups que peut exiger la plus courte solution. En mathématiques, c’est le diamètre du graphe. Si l’étage de chaque arrangement était connu, démêler serait facile : toujours descendre d’un étage.
  <b-steps top="14" round>
    <step t="Étage">Combien de coups séparent l’arrangement de l’ordre par le plus court chemin</step>
    <step t="Plafond">L’étage le plus haut : assez de coups pour n’importe quel arrangement ; nombre de Dieu, diamètre du graphe</step>
    <step t="Question">Qui occupe le plafond et à quelle hauteur il se trouve pour un nombre quelconque de boules</step>
  </b-steps>
</b-chapter>

<b-chapter id="mirror" icon="search" title="Qui occupe le plafond : le miroir">
  <b-why>Les auteurs ont lancé une recherche par force brute sur tous les arrangements des anneaux jusqu’à 15 boules. Pour 15, cela fait plus d’un billion d’arrangements et plusieurs jours sur un cluster.</b-why>

  À chaque fois, un seul arrangement se trouve tout en haut — le **miroir** : l’anneau reflété par rapport à la fenêtre. Les deux boules de la fenêtre s’échangent, et les autres s’échangent par paires de part et d’autre de l’axe. Étonnamment, mettre simplement les boules dans l’ordre inverse tombe deux étages plus bas.

  <b-art names="longest-ring-arrangement/mirror"/>
  <b-cap>À gauche : l’ordre ; au centre : le miroir (en pointillés — l’axe passant par la fenêtre) ; à droite : l’ordre inversé. <a href="https://youtu.be/ecc2GvvZGvM?t=112" target="_blank" rel="noopener">▶ 1:52</a></b-cap>
  <b-art names="longest-ring-arrangement/count"/>
  <b-cap>La longueur de la barre est le nombre de chiffres du nombre d’arrangements. <a href="https://youtu.be/ecc2GvvZGvM?t=118" target="_blank" rel="noopener">▶ 1:58</a></b-cap>
</b-chapter>

<b-chapter id="pairs" icon="bulb" title="Le plafond égale le nombre de paires">
  <b-why>Cinq boules forment des paires le long de dix lignes, et le plafond pour cinq boules vaut aussi 10. Six boules : 15 paires et un plafond de 15.</b-why>

  <b-art names="longest-ring-arrangement/pairs"/>
  <b-cap>Chaque ligne est une paire de boules. <a href="https://youtu.be/ecc2GvvZGvM?t=150" target="_blank" rel="noopener">▶ 2:30</a></b-cap>

  Cela coïncide sur tous les anneaux couverts par la force brute, à partir de quatre boules ; trois boules ont un plafond de 2 mais 3 paires. D’où la conjecture tirée de l’Encyclopédie en ligne des suites de nombres entiers (OEIS A186783) : le plafond égale toujours le nombre de paires, n(n−1)/2.

  <b-table>
    <table><thead>
    <tr><th>Boules</th><th class="bk-table-r">Paires</th><th class="bk-table-r">Plafond par force brute</th></tr>
    </thead><tbody>
    <tr><td>4</td><td class="bk-table-r">6</td><td class="bk-table-r">6</td></tr>
    <tr><td>5</td><td class="bk-table-r">10</td><td class="bk-table-r">10</td></tr>
    <tr><td>6</td><td class="bk-table-r">15</td><td class="bk-table-r">15</td></tr>
    <tr><td>10</td><td class="bk-table-r">45</td><td class="bk-table-r">45</td></tr>
    <tr><td>15</td><td class="bk-table-r">105</td><td class="bk-table-r">105</td></tr>
    </tbody></table>
  </b-table>
  <b-finding>
    <ex>La force brute jusqu’à 15 boules a donné à la fois la réponse « miroir » et la formule « nombre de paires ».</ex>
    <gen>Résoudre exhaustivement de petits cas est un moyen peu coûteux d’obtenir une conjecture que l’on teste ensuite bien au-delà de leur portée.</gen>
    <do>Avant de construire une méthode ingénieuse, calculez les petits cas de front et cherchez le motif.</do>
  </b-finding>
</b-chapter>

<b-chapter id="gap" icon="flag-alt" title="Vingt boules : hors de portée de la force brute">
  <b-why>Vingt boules ont déjà 2,4·10¹⁸ arrangements — des milliards de milliards. La conjecture se teste donc autrement : prendre le miroir et chercher une façon plus courte de le démêler.</b-why>

  Si le chemin n’est jamais plus court que le nombre de paires, la conjecture tient. D’abord, le programme classique de calcul formel pour les groupes (GAP). Il trouve toujours un chemin, mais sans se soucier de sa longueur : sur un anneau de 20 boules, il travaille 41 minutes et renvoie 217 944 coups. Il n’y a que 190 paires.

  <b-art names="longest-ring-arrangement/gap"/>
  <b-cap>En haut : le nombre de paires ; en bas : le chemin du programme classique. <a href="https://youtu.be/ecc2GvvZGvM?t=180" target="_blank" rel="noopener">▶ 3:00</a></b-cap>
</b-chapter>

<b-chapter id="compass" icon="search" title="La boussole de la vidéo précédente">
  <b-why>Les auteurs réutilisent l’astuce du <a href="/blog/rubik-cube-neural-network/">Rubik’s Cube</a> : une boussole entraînée sur des marches aléatoires.</b-why>

  D’abord, les **marches** : à partir de l’ordre, faire des coups au hasard et, après chacun, noter l’arrangement et le nombre de coups effectués. Nul besoin d’une carte de tous les arrangements, et les marches ne coûtent presque rien. Une **boussole** apprend à partir de ces notes — un réseau de neurones qui regarde un arrangement et devine son étage.

  <b-art names="longest-ring-arrangement/net"/>
  <b-cap>La boussole est un réseau de neurones ordinaire : un arrangement en entrée, un nombre en sortie.</b-cap>

  La boussole devine avec une erreur : une marche boucle, elle compte donc plus de coups que le plus court chemin. Mais plus une marche est allée loin, plus l’étage est haut en moyenne ; la boussole indique donc la bonne direction : là où le nombre est plus petit, l’ordre est plus proche.

  <b-art names="longest-ring-arrangement/walk"/>
  <b-cap>La marche de la vidéo : en gris, le pas de la marche ; en bleu, le véritable étage. <a href="https://youtu.be/ecc2GvvZGvM?t=222" target="_blank" rel="noopener">▶ 3:42</a></b-cap>
  <b-io justify>
    <item k="Entrée">Un arrangement : la liste des numéros des boules autour de l’anneau</item>
    <item k="Boussole">Un réseau de neurones simple (une couche de 128 neurones suffit souvent) ou un gradient boosting</item>
    <item k="Sortie">Une estimation : combien de coups jusqu’à l’ordre</item>
  </b-io>
</b-chapter>

<b-chapter id="front" icon="flag-alt" title="Le front : plusieurs arrangements à la fois">
  <b-why>Les erreurs de la boussole mènent un chemin unique dans une impasse. La recherche avance donc comme un front — la recherche en faisceau (beam search) dans l’article.</b-why>

  Un front, ce sont plusieurs arrangements à la fois. À chaque pas, les trois coups sont essayés depuis chacun d’eux, la boussole note les nouveaux voisins, et seuls les plus prometteurs restent pour le pas suivant. Si la boussole se trompe sur un arrangement, il y en a d’autres dans le front, et le chemin ne se rompt pas.

  Sur 20 boules, cela trouve un chemin d’exactement 190 coups — en 3 minutes 48 secondes au lieu de 41 minutes. Jusqu’à 28 boules, le chemin égale le nombre de paires ; jusqu’à 44, il est trouvé mais plus long.

  <b-art names="longest-ring-arrangement/front"/>
  <b-cap>La hauteur de la barre est le chemin trouvé divisé par le nombre de paires ; la ligne correspond exactement aux paires. Tableaux 2–3 de l’article. <a href="https://youtu.be/ecc2GvvZGvM?t=258" target="_blank" rel="noopener">▶ 4:18</a></b-cap>
  <b-numchain>
    <step>essayer trois coups depuis chaque arrangement du front</step>
    <step>écarter les doublons, la boussole les note</step>
    <step>garder les meilleurs et recommencer</step>
  </b-numchain>
</b-chapter>

<b-chapter id="hint" icon="bulb" title="Une astuce d’une ligne">
  <b-why>Les auteurs ont ajouté une ligne à la recherche : ne pas échanger les boules de la fenêtre si elles sont déjà dans l’ordre.</b-why>

  L’idée est simple : échanger une paire déjà ordonnée ne rapporte presque jamais, tandis que l’option supplémentaire gonfle le front. Cette ligne a repoussé la limite de 40 à 100 boules. Pour 100 boules, un chemin est trouvé en 9 heures, bien qu’il soit encore plus de trois fois plus long que le nombre de paires : 16 632 coups contre 4 950 paires. Et l’astuce est taillée pour cet anneau : pour d’autres problèmes, elle reste à trouver.

  <b-art names="longest-ring-arrangement/hint"/>
  <b-cap>À gauche : la fenêtre où l’échange est interdit ; à droite : combien de boules peuvent être démêlées. <a href="https://youtu.be/ecc2GvvZGvM?t=294" target="_blank" rel="noopener">▶ 4:54</a></b-cap>
  <b-finding>
    <ex>Une règle tirée de la structure du problème a fait passer les anneaux résolubles de 40 à 100 boules.</ex>
    <gen>La connaissance du problème sous forme d’interdiction des pas manifestement inutiles fonctionne mieux que le réglage du modèle.</gen>
    <do>Cherchez les coups qui ne rapprochent jamais du but et retirez-les de la recherche.</do>
  </b-finding>
</b-chapter>

<b-chapter id="contest" icon="trophy" title="Un concours ouvert">
  <b-why>Les auteurs ont invité tout le monde à démêler le miroir : un concours de programmation ouvert sur Kaggle, avec des anneaux de 2 à 200 boules.</b-why>

  Les participants ont atteint des chemins d’exactement le nombre de paires. Personne n’en a trouvé de plus court — ni par programme, ni à la main.

  <b-art names="longest-ring-arrangement/contest"/>
  <b-cap>Anneaux de 2 à 200 boules ; une coche signifie un chemin d’exactement le nombre de paires. <a href="https://youtu.be/ecc2GvvZGvM?t=327" target="_blank" rel="noopener">▶ 5:27</a></b-cap>
</b-chapter>

<b-chapter id="triples" icon="shield-check" title="Pourquoi ce ne peut pas être plus court : les triplets">
  <b-why>Prenez trois boules quelconques. Autour de l’anneau, elles vont soit dans le sens des aiguilles d’une montre, soit dans le sens inverse.</b-why>

  Tourner l’anneau ne retourne pas un triplet : toutes les boules bougent ensemble et l’ordre autour est conservé. Seul un échange dans la fenêtre peut le retourner, et seulement quand deux de ses boules sont dans la fenêtre. Or le miroir retourne tous les triplets à la fois. De là, les auteurs ont démontré que le miroir exige presque autant de coups qu’il y a de paires : au plus la moitié du nombre de boules plus un coup de moins.

  <b-art names="longest-ring-arrangement/triples"/>
  <b-cap>Le triplet 1, 2, 4 : à gauche tel quel, au centre après une rotation, à droite après un échange. <a href="https://youtu.be/ecc2GvvZGvM?t=351" target="_blank" rel="noopener">▶ 5:51</a></b-cap>
</b-chapter>

<b-chapter id="fork" icon="shield-check" title="La fourchette : bornes démontrées">
  <b-why>Par le haut, le plafond est borné par la méthode de démêlage des auteurs : tout arrangement se démêle en au plus le nombre de paires plus trois coups par boule.</b-why>

  Cela donne une fourchette. Pour 20 boules, le plafond se situe entre 179 et 250, alors que la conjecture dit 190. Plus il y a de boules, plus la fourchette est étroite par rapport au plafond lui-même : pour 100 boules, elle représente quelques pour cent du nombre de paires.

  <b-art names="longest-ring-arrangement/fork"/>
  <b-cap>La barre représente les bornes démontrées, la ligne la conjecture. <a href="https://youtu.be/ecc2GvvZGvM?t=389" target="_blank" rel="noopener">▶ 6:29</a></b-cap>
</b-chapter>

<b-chapter id="main" icon="flag" title="Bilan">
  <b-why>La question était : quel arrangement est le plus long à démêler et combien de coups exige-t-il ? Très probablement le miroir, avec autant de coups qu’il y a de paires de boules.</b-why>

  <b-step-chain>
    <node t="Force brute">jusqu’à 15 boules : miroir et paires</node>
    <node t="Boussole et front">exact jusqu’à 28, 100 avec l’astuce</node>
    <node t="Concours">jusqu’à 200 boules, rien de plus court</node>
    <node t="Preuve">une fourchette autour du nombre de paires</node>
  </b-step-chain>

  Après l’article, l’un de ses auteurs, Grigorii Antiufeev, a publié une preuve que le miroir ne peut pas être démêlé plus vite que le nombre de paires (<a href="https://arxiv.org/abs/2601.08715" target="_blank" rel="noopener">arXiv 2601.08715</a>, prépublication de 2026). Une chose reste ouverte : existe-t-il un arrangement encore plus éloigné.
  <b-callout icon="shield-check">**Réserve.** « Plafond = nombre de paires » est une conjecture : seules les bornes sont démontrées. La borne inférieure d’exactement le nombre de paires est une prépublication pas encore relue par des pairs.</b-callout>
</b-chapter>

<b-chapter id="formal" icon="boxes-route" title="Formellement : le même chemin dans le langage de l’article">
  <b-why>La deuxième partie de la vidéo : les mêmes étapes sous forme de formules.</b-why>

  <b-table>
    <table><thead>
    <tr><th>Dans la vidéo</th><th>Dans l’article</th><th>Comment ça marche</th></tr>
    </thead><tbody>
    <tr><td>anneau avec tous les arrangements</td><td>graphe de Cayley LRX du groupe symétrique Sₙ</td><td>les sommets sont des permutations, les arêtes sont des coups</td></tr>
    <tr><td>coups</td><td>générateurs L, R, X</td><td>L — décalage à gauche, R = L⁻¹, X = (0, 1) — échange des deux premières positions</td></tr>
    <tr><td>plafond</td><td>diamètre du graphe</td><td>conjecture : n(n−1)/2 pour n ≥ 4</td></tr>
    <tr><td>miroir</td><td>élément le plus long ℓₙ</td><td>(1 0 n−1 … 3 2) = R² · (ordre inversé)</td></tr>
    <tr><td>boussole</td><td>réseau sur la distance de diffusion + Q-learning</td><td>apprend d’abord sur des marches, puis est vérifié par l’équation de Bellman d(s) = 1 + min d(t) sur les voisins t</td></tr>
    <tr><td>front</td><td>recherche en faisceau</td><td>largeur jusqu’à 2²⁰ ; l’astuce est le X-trick</td></tr>
    <tr><td>fourchette</td><td>propositions 4.2 et 4.3</td><td>n(n−1)/2 − n/2 − 1 ≤ diamètre ≤ n(n−1)/2 + 3n</td></tr>
    </tbody></table>
  </b-table>

  La nouveauté de l’article tient à l’entraînement de la boussole. Les marches donnent une première estimation, puis la boussole est vérifiée par rapport à ses voisins : un coup de plus jusqu’à l’ordre que depuis le voisin le plus proche. Comme le chemin du retour : si votre voisin est à cinq minutes, vous êtes à six au plus. Sur un anneau de 28 boules, cela a ramené le chemin typique de 650 coups à 402, avec 378 paires.

  <b-codebox copy>
    def beam_search(start, model, W, steps=1000):
        front = [start]
        for _ in range(steps):
            nbrs = {m(s) for s in front for m in (L, R, X)
                    if not (m is X and s[0] < s[1])}   # the hint
            if SORTED in nbrs: return True
            front = sorted(nbrs, key=model)[:W]   # W best by the compass
        return False
  </b-codebox>
  <b-cap>Esquisse de la recherche en faisceau avec l’astuce ; le code complet est sur Kaggle. <a href="https://youtu.be/ecc2GvvZGvM?t=586" target="_blank" rel="noopener">▶ 9:46</a></b-cap>
</b-chapter>

<b-chapter id="practice" icon="grid" title="À quoi ça sert">
  <b-why>La boussole et le front ne se soucient pas que ce soit un anneau : il leur faut seulement des états, des coups et un but. La même approche convient donc à toute tâche consistant à passer d’un état à un autre par le plus court chemin.</b-why>
  <b-table>
    <table><thead>
    <tr><th>Lien</th><th>Où</th></tr>
    </thead><tbody>
    <tr><td><b-tag kind="ok">direct</b-tag></td><td>les casse-têtes TopSpin (Oval Track) et Hungarian Rings fonctionnent presque de la même façon</td></tr>
    <tr><td><b-tag kind="ok">direct</b-tag></td><td>réseaux de processeurs : le diamètre du graphe de liaisons est le plus long délai d’un message</td></tr>
    <tr><td><b-tag kind="ok">direct</b-tag></td><td>plus courts chemins dans d’énormes graphes de permutations où la force brute est impossible</td></tr>
    <tr><td><b-tag kind="plain">analogie</b-tag></td><td>planification : passer d’un état à un autre par petits pas</td></tr>
    </tbody></table>
  </b-table>
  <b-callout icon="bulb">**Leçon.** La force brute donne une conjecture, un programme entraîné la teste bien au-delà de la force brute, et une preuve enserre la réponse dans une fourchette.</b-callout>
</b-chapter>

<b-chapter id="when" icon="shield-check" title="Qui et quand, ce qui est démontré">
  <b-steps top="14" round>
    <step t="1968">Viktor Glouchkov : le problème de l’anneau avec deux coups</step>
    <step t="2011">La suite à trois coups entre dans l’OEIS (A186783)</step>
    <step t="2020">La conjecture est consignée : plafond = n(n−1)/2</step>
    <step t="2025" hl>L’article CayleyPy RL : 34 auteurs, IA, force brute, un concours et des bornes</step>
    <step t="2026">Publication en revue ; prépublication d’Antiufeev : une borne inférieure d’exactement le nombre de paires</step>
  </b-steps>

  Démontré : n(n−1)/2 − n/2 − 1 ≤ diamètre ≤ n(n−1)/2 + 3n ; l’égalité et l’unicité du miroir sont des conjectures. L’article comporte de petites incohérences : le résumé sur arXiv écrit la borne inférieure sans le « − 1 », et la section 3.3 renvoie au tableau 8 au lieu du tableau 6.
</b-chapter>

<b-chapter id="faq" icon="chat" title="Questions fréquentes">
  <b-faq-cards>
    <q t="Qu’est-ce qu’un graphe de Cayley ?">Une carte de tous les états d’un casse-tête ou d’un groupe : chaque état est un point, chaque coup autorisé est une ligne vers un état voisin. Pour l’anneau de boules, ce sont tous les arrangements et les trois coups qui les relient.</q>
    <q t="Que sont le diamètre d’un graphe et le nombre de Dieu ?">Le plus grand nombre de coups que peut exiger le plus court chemin entre deux états. Pour le Rubik’s Cube, on l’appelle nombre de Dieu : 20 coups si un demi-tour compte pour un coup.</q>
    <q t="Quel est le diamètre de l’anneau avec rotation et échange ?">Selon la conjecture, n(n−1)/2 — le nombre de paires de boules, à partir de quatre boules. La force brute le confirme jusqu’à 15 boules ; il est démontré qu’il se situe entre n(n−1)/2 − n/2 − 1 et n(n−1)/2 + 3n.</q>
    <q t="La conjecture est-elle démontrée ?">Pas entièrement. En 2026, l’un des auteurs a publié une preuve de la borne inférieure d’exactement le nombre de paires, mais c’est une prépublication ; la borne supérieure est encore plus haute de 3 coups par boule.</q>
    <q t="Comment un réseau de neurones trouve-t-il un chemin dans un énorme graphe ?">Un réseau-boussole apprend sur des marches aléatoires à deviner la distance au but, et la recherche en faisceau garde en même temps de nombreux meilleurs états selon son estimation, pour qu’une erreur ne mène pas dans une impasse.</q>
    <q t="Puis-je essayer moi-même ?">Oui : le code des auteurs est ouvert et tourne gratuitement sur Kaggle, et la bibliothèque CayleyPy est sur GitHub (liens ci-dessous).</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Pour aller plus loin">
  <b-links cols="2">
    <item href="https://arxiv.org/abs/2502.18663" k="Article" t="arXiv 2502.18663" ext>CayleyPy RL: Pathfinding and Reinforcement Learning on Cayley Graphs</item>
    <item href="https://github.com/cayleypy/cayleypy" k="Code" t="CayleyPy sur GitHub" ext>Une bibliothèque de recherche de chemins dans les graphes de permutations</item>
    <item href="/blog/rubik-cube-neural-network/" k="Exposé précédent" t="Rubik’s Cube">La même équipe : boussole, front et escouade sur des cubes 4×4×4 et 5×5×5</item>
    <item href="https://youtu.be/ecc2GvvZGvM" k="Vidéo" t="Sur YouTube" ext>La même histoire en 11 minutes, avec la 3D et les formules (en russe)</item>
  </b-links>
</b-chapter>
<b-footer>Les chiffres viennent de A. Chervov, M. Obozov, A. Soibelman, …, K. Khoruzhii, A. Romanov, arXiv 2502.18663 (tableaux 2–6, propositions 4.2–4.3), et de l’OEIS A186783. Les étages pour cinq et six boules ont été recalculés par force brute ; l’exemple du schéma de la boussole se situe à l’étage 7. L’auteur du blog est coauteur du premier article CayleyPy, sur le Rubik’s Cube.</b-footer>
</b-post>
