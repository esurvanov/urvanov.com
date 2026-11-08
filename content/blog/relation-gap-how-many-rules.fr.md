---
title: Combien de règles faut-il à un jeu : le jeu « pas et montée » en demande deux, le comptable n'a besoin que d'une entrée — l'écart de relations
date: 2026-11-02
updated: 2026-11-08
description: Comment compter honnêtement et vite les règles d'un jeu, et si les deux réponses peuvent différer. Lecture pas à pas de l'article de Bartholdi, Bridson, Mikhailov et Nicholson sur l'écart de relations (arXiv 2610.23637) : un jeu à deux mouvements où le joueur a besoin de deux règles et le comptable d'une seule entrée, avec schémas, formules et calculs.
tags: recherche, mathématiques, théorie des groupes, topologie, IA en mathématiques
category: research
layout: wide
math: true
mentions: relation gap, group presentation, relation module, Cayley graph, Newman's theorem, one-relator group, Wall's D2 problem, D2 complex, homology, GAP, greatest common divisor, Gruenberg
toc: video=Vidéo | question=Question | paper=Article et auteurs | rules=Deux règles | why=Pourquoi ce jeu | player=Joueur | accountant=Comptable | answer=Réponse | friends=Amis | coins=Pièces | main=Bilan | formal=Formellement | practice=Où cela apparaît | when=Qui et quand | faq=Questions | next=Suite
---

Un jeu à deux mouvements, un pas et une montée, demande deux règles si on les compte honnêtement, comme un joueur, et une seule entrée si on les compte vite, comme un comptable qui note les règles sous forme de boucles et oublie l'ordre des mouvements. C'est ainsi que quatre mathématiciens ont tranché en octobre 2026 la question de l'<a href="/materials/glossary/relation-gap/">écart de relations</a> (relation gap), ouverte depuis 1976.

<b-post series="kto">

<b-chapter id="video" icon="video" title="Vidéo : la même histoire en 7,5 minutes">
  <b-why>L'article suit le film scène par scène et entre davantage dans le détail. Sous chaque schéma, un lien mène au moment correspondant de la vidéo.</b-why>
  <b-embed-frame src="https://www.youtube.com/embed/yPvbfDa_GCk" title="Combien de règles faut-il à un jeu — l'article arXiv 2610.23637 en termes simples" ratio="16/9"/>
  <b-cap>Article : <a href="https://arxiv.org/abs/2610.23637" target="_blank" rel="noopener">Two-generator presentations with a relation gap</a>, arXiv 2610.23637, 16 octobre 2026. Le jeu, le pas, la montée, le joueur et le comptable sont des images pour l'explication ; dans l'article, ce sont un groupe, des générateurs, le plus petit nombre de relations et le plus petit nombre de générateurs du module des relations. Il n'est pas nécessaire de regarder le film : tout ce qu'il contient est repris ci-dessous.</b-cap>
</b-chapter>

<b-chapter id="question" icon="grid" title="Question : combien de règles a un jeu, et y a-t-il deux manières de compter">
  <b-why>Les mathématiciens décrivent les casse-têtes et les symétries comme des jeux : il y a des mouvements et il y a des règles. Une règle dit quelle suite de mouvements remet tout en place.</b-why>

  Prenons le Rubik's cube. Les **mouvements** sont les rotations des faces. Les mouvements s'enchaînent : on tourne une face, puis une autre, puis une troisième. Chaque mouvement peut être annulé en tournant la face en sens inverse. L'ensemble de ces enchaînements s'appelle en mathématiques un <a href="/materials/glossary/math-group/">groupe</a>, et un petit ensemble de mouvements à partir duquel tous les autres se construisent, un ensemble de <a href="/materials/glossary/generators/">générateurs</a>. Une **règle** (les mathématiciens disent « <a href="/materials/glossary/group-relation/">relation</a> ») est un enchaînement qui ne change rien : par exemple, quatre rotations d'une même face à la suite ramènent le cube là où il était.

  La question : **combien de règles faut-il pour décrire entièrement le jeu**, c'est-à-dire pour que tout le reste de ce qui est vrai dans le jeu en découle ? Plus la liste est courte, plus la description est simple. Il y a deux manières de compter.

  <b-table>
    <table><thead>
    <tr><th>Décompte</th><th>Comment il compte</th><th>Dans l'article</th></tr>
    </thead><tbody>
    <tr><td><b>Joueur</b> — honnête</td><td>une règle est un parcours sur la carte du jeu qui revient au départ ; l'ordre des mouvements compte : « droite, haut » et « haut, droite » sont deux parcours différents</td><td>le plus petit nombre de relations, $d_F(R)$</td></tr>
    <tr><td><b>Comptable</b> — rapide</td><td>inscrit chaque règle dans un registre comme une boucle ; les entrées s'additionnent dans n'importe quel ordre, l'ordre des mouvements n'est pas retenu</td><td>le plus petit nombre de générateurs du <a href="/materials/glossary/relation-module/">module des relations</a>, $d_{\mathbb{Z}G}(R^{ab})$</td></tr>
    </tbody></table>
  </b-table>

  <b-art names="relation-gap-how-many-rules/methods"/>
  <b-cap>Le joueur parcourt la carte et l'ordre des mouvements compte ; le comptable tient un décompte des passages et l'ordre n'a pas d'importance.</b-cap>

  Le comptable n'a jamais besoin de plus d'entrées que le joueur n'a de règles : chaque règle du joueur devient simplement une entrée. La question inverse est celle-ci : peut-il y avoir **moins** d'entrées que de règles ? Pendant cinquante ans, personne ne le savait. Cette question s'appelle l'**écart de relations** : elle vient d'un travail de Karl Gruenberg de 1976 et figure dans la liste de problèmes de Wall de 1979 (problème B15). Le cas d'une seule entrée est particulièrement intéressant : s'ensuit-il que le groupe n'a qu'une seule règle ? <a href="https://youtu.be/yPvbfDa_GCk?t=0" target="_blank" rel="noopener">▶ 0:00</a>
</b-chapter>

<b-chapter id="paper" icon="trophy" title="Article et auteurs : la réponse en trois pages">
  <b-why>Un preprint du 16 octobre 2026 : quatre mathématiciens de Lyon et Genève, d'Oxford, de Saint-Pétersbourg et de Bonn.</b-why>

  <b-table>
    <table><thead>
    <tr><th>Auteur</th><th>Lieu de travail</th></tr>
    </thead><tbody>
    <tr><td>Laurent Bartholdi</td><td>Institut Camille Jordan, Lyon ; Université de Genève</td></tr>
    <tr><td>Martin R. Bridson</td><td>Mathematical Institute, Université d'Oxford</td></tr>
    <tr><td>Roman Mikhailov</td><td>Université d'État de Saint-Pétersbourg</td></tr>
    <tr><td>John Nicholson</td><td>Institut Max Planck de mathématiques, Bonn</td></tr>
    </tbody></table>
  </b-table>

  Le résultat en une phrase : dans un jeu **à deux mouvements**, le joueur a besoin de deux règles, tandis que le comptable n'a besoin que d'une entrée. Dans l'article, c'est le théorème A, démontré complètement et de façon élémentaire. Le second résultat, le corollaire B, porte sur le <a href="/materials/glossary/wall-d2-problem/">problème D2 de Wall</a>. Il s'appuie sur un preprint d'OpenAI du 6 octobre 2026 et il est conditionnel ; détails dans le chapitre sur les applications. <a href="https://youtu.be/yPvbfDa_GCk?t=26" target="_blank" rel="noopener">▶ 0:26</a>

  Le théorème A en formules (pour tous $p, q \ge 2$ premiers entre eux) :

  $$G=\langle x,\,t \mid x^{pq},\ [x^{p},\ t\,x^{q}\,t^{-1}]\rangle$$

  <b-art names="relation-gap-how-many-rules/general"/>
  <b-cap>Le cas général : un cercle de pq points, le demi-cercle fait p pas, le crochet fait q pas à l'étage supérieur ; p et q n'ont pas de diviseur commun.</b-cap>

  Cela se lit ainsi : « le jeu $G$ est construit à partir de deux mouvements $x$ et $t$ et obéit à deux règles ». Première règle : répéter le mouvement $x$ $pq$ fois remet tout en place. Seconde règle : les mouvements $x^{p}$ et $t\,x^{q}\,t^{-1}$ peuvent être échangés. Le jeu n'est pas décrit par une seule règle ($d_F(R)=2$), mais son module des relations est engendré par une seule entrée ($d_{\mathbb{Z}G}(R^{ab})=1$).

  Les auteurs indiquent ouvertement le rôle de l'IA, dans la section « Declaration of AI usage » : ChatGPT (« 6 Astra », tel qu'imprimé) a aidé à découvrir les groupes du théorème A, la démonstration et un premier brouillon du manuscrit ; Claude (« Fable 5.1 ») a été consulté lors de la relecture ; les arguments et le texte ont été minutieusement vérifiés et substantiellement remaniés par les auteurs, qui sont responsables du manuscrit final.
</b-chapter>

<b-chapter id="rules" icon="boxes-route" title="Le jeu : un pas, une montée et deux règles">
  <b-why>Le jeu comporte un jeton et un cercle de six points. Le premier mouvement, le **pas**, déplace le jeton d'un point le long du cercle.</b-why>

  Six pas et le jeton est revenu. C'est la **première règle**. Le jeu ne reste pas sur un seul cercle : de chaque point du cercle, une **montée** propre élève le jeton vers son propre cercle, un étage plus haut, et une descente le ramène. Les cercles et les montées forment la **carte du jeu**. Les mathématiciens appellent une telle carte le <a href="/materials/glossary/cayley-graph/">graphe de Cayley</a> d'un groupe, et le même genre de graphe se trouve sous le <a href="/blog/rubik-cube-neural-network/">Rubik's cube</a> et sous l'<a href="/blog/longest-ring-arrangement/">anneau de boules</a> : les sommets sont des positions, les arêtes sont des mouvements.

  <b-art names="relation-gap-how-many-rules/map"/>
  <b-cap>En bas, le cercle de l'étage 0, les nombres sont des points. La flèche bleue est un pas, les vertes sont des montées vers les cercles de l'étage 1. <a href="https://youtu.be/yPvbfDa_GCk?t=48" target="_blank" rel="noopener">▶ 0:48</a> et <a href="https://youtu.be/yPvbfDa_GCk?t=61" target="_blank" rel="noopener">▶ 1:01</a></b-cap>

  La carte a une **seconde règle**. Un **demi-cercle** est trois pas à la suite. Un **crochet** consiste à monter, faire deux pas à l'étage supérieur puis redescendre. La descente mène à un autre cercle, pas à celui dont on est parti. La règle dit : un demi-cercle suivi d'un crochet équivaut à un crochet suivi d'un demi-cercle. Ces deux mouvements peuvent être échangés.

  <b-art names="relation-gap-how-many-rules/swap"/>
  <b-cap>Deux chemins partis du même point arrivent au même point. <a href="https://youtu.be/yPvbfDa_GCk?t=76" target="_blank" rel="noopener">▶ 1:16</a></b-cap>

  Les mathématiciens écrivent la même chose avec des lettres. Le pas est $x$, la montée est $t$, la descente est $t^{-1}$. Un enchaînement de mouvements s'écrit à la suite, comme un mot, et une répétition est une puissance : $x^3$ est trois pas. Le demi-cercle est donc $x^3$, et le crochet est $t\,x^2\,t^{-1}$ : monter, deux pas, redescendre. Les règles deviennent :

  $$x^{6}=1 \qquad\text{et}\qquad [\,x^{3},\ t\,x^{2}\,t^{-1}\,]=1$$

  Ici 1 signifie « rien n'a été fait ». Les crochets carrés désignent le <a href="/materials/glossary/commutator/">commutateur</a> : $[u,v]=u\,v\,u^{-1}v^{-1}$. Il vaut 1 exactement lorsque les mouvements $u$ et $v$ peuvent être échangés : on fait $u$, puis $v$, puis on annule $u$ et $v$, et l'on est de retour au départ.
  <b-art names="relation-gap-how-many-rules/commutator"/>
  <b-cap>Le commutateur : u, v, l'inverse de u, l'inverse de v. Si les mouvements peuvent être échangés, on retombe exactement au départ.</b-cap>

  Le jeu entier tient en une ligne, une <a href="/materials/glossary/group-presentation/">présentation de groupe</a> :

  $$G=\langle\, x,\ t \mid x^{6},\ [x^{3},\ t\,x^{2}\,t^{-1}]\,\rangle$$

  <b-art names="relation-gap-how-many-rules/present"/>
  <b-cap>Le jeu en une ligne : les mouvements à gauche de la barre, les règles à droite.</b-cap>

  À gauche de la barre se trouvent les lettres des mouvements, à droite les règles.
</b-chapter>

<b-chapter id="why" icon="search" title="Pourquoi le jeu est exactement ainsi">
  <b-why>Chaque détail est nécessaire à la réponse, et aucun n'est superflu. Trois détails travaillent pour les deux héros de la réponse : les deux premiers pour le joueur, le troisième pour le comptable.</b-why>

  <b-art names="relation-gap-how-many-rules/three"/>
  <b-cap>À gauche, trois détails du jeu ; à droite, qui a besoin de chacun. <a href="https://youtu.be/yPvbfDa_GCk?t=98" target="_blank" rel="noopener">▶ 1:38</a></b-cap>

  **Six pas et le jeton est à la maison.** Utile au joueur. Le jeu comporte un mouvement qui, répété plusieurs fois, ramène au départ. En mathématiques, on parle de torsion. Pour le théorème de Newman (voir le chapitre sur les amis), c'est la condition clé.

  **Le demi-cercle et le crochet échangent leurs places.** Également utile au joueur. Les mouvements qui peuvent être échangés s'appellent des **amis**. Le demi-cercle a deux amis : deux pas sur le même cercle et le crochet. Entre eux, ils ne sont pas amis, et il en découle qu'une seule règle ne peut pas décrire le jeu.

  **Les nombres trois et deux.** Utiles au comptable. Le demi-cercle compte trois pas, le crochet deux pas à l'étage supérieur, et 3 et 2 n'ont pas de diviseur commun. Grâce à cela, deux entrées peuvent être fusionnées en une.

  Dans l'article, le nombre de pas du demi-cercle et du crochet est un couple quelconque de nombres premiers entre eux $p$ et $q$, tous deux au moins égaux à deux. Le film prend le plus petit couple : $p=3$, $q=2$. La première règle est alors $x^{pq}=x^{6}=1$, et la seconde dit que $x^{p}=x^{3}$ et le crochet $t\,x^{q}\,t^{-1}=t\,x^{2}\,t^{-1}$ commutent.
</b-chapter>

<b-chapter id="player" icon="bulb" title="Le décompte du joueur : deux règles, pas moins">
  <b-why>Le joueur écrit une règle comme un parcours sur la carte, et l'ordre des mouvements y compte. Le but est la liste la plus courte dont découlent toutes les autres règles du jeu.</b-why>

  Que signifie « découler » ? Si $x^{6}=1$ est vrai, alors $x^{12}=1$ l'est aussi : douze pas, c'est six pas puis six autres. Une telle règle n'ajoute rien à la liste, et le joueur la barre. Il en va de même pour toute conséquence : tant qu'une règle découle de celles déjà écrites, elle est superflue. Après le tri, deux règles restent sur la liste : six pas ramènent au départ, et le demi-cercle s'échange avec le crochet.

  <b-art names="relation-gap-how-many-rules/player"/>
  <b-cap>Sur quatre candidates, deux règles entrent dans la liste ; les autres sont des conséquences. <a href="https://youtu.be/yPvbfDa_GCk?t=124" target="_blank" rel="noopener">▶ 2:04</a></b-cap>

  Pourquoi la liste ne peut-elle pas contenir une seule règle ? Si un jeu a une seule règle, le théorème de Newman dit que les amis de n'importe quel mouvement sont amis entre eux. Ici, les amis du demi-cercle, deux pas et le crochet, ne sont pas amis entre eux (chapitre « Amis » plus bas), donc une règle ne suffit pas. Les mathématiciens écrivent $d_F(R)=2$ : le plus petit nombre de générateurs normaux du groupe des règles est deux.
</b-chapter>

<b-chapter id="accountant" icon="bulb" title="Le décompte du comptable : une entrée">
  <b-why>Le comptable inscrit chaque règle dans un registre comme une boucle : un parcours revenu au départ. Les entrées s'additionnent dans n'importe quel ordre et se déplacent sur la carte.</b-why>

  Comment fonctionne une entrée. Le comptable parcourt un chemin et tient un décompte : combien de fois chaque segment de la carte a été franchi vers l'avant (plus un) et vers l'arrière (moins un). Une boucle autour d'un carré donne plus un sur chaque côté. Deux parcours qui font le tour du même carré avec des départs différents laissent **la même entrée** : l'ordre et le départ ne sont pas conservés. Les entrées peuvent donc s'additionner dans n'importe quel ordre, comme des nombres dans un registre, et se déplacer vers n'importe quel endroit de la carte. Les mathématiciens appellent une telle entrée l'<a href="/materials/glossary/group-homology/">homologie</a> du graphe, et l'ensemble des entrées le module des relations.

  <b-art names="relation-gap-how-many-rules/loops"/>
  <b-cap>Deux boucles aux départs différents donnent une seule entrée : un décompte des passages sur les segments. <a href="https://youtu.be/yPvbfDa_GCk?t=144" target="_blank" rel="noopener">▶ 2:24</a></b-cap>

  Le comptable n'a jamais plus d'entrées que le joueur n'a de règles : chaque règle du joueur est inscrite comme une boucle. Et moins ? Les auteurs ont construit une entrée astucieuse $v$, un mélange des entrées des deux règles. De ses copies (décalages sur la carte et sommes), l'entrée de la seconde règle ressort aussitôt, et celle de la première règle en trois opérations. **Une seule entrée suffit donc au comptable** : toutes les autres entrées viennent de $v$ par addition et déplacement. Les mathématiciens écrivent $d_{\mathbb{Z}G}(R^{ab})=1$ et disent que le module des relations est **cyclique**.

  <b-art names="relation-gap-how-many-rules/merge"/>
  <b-cap>Une entrée astucieuse en remplace deux. Cela fonctionne parce que 3 et 2 n'ont pas de diviseur commun. <a href="https://youtu.be/yPvbfDa_GCk?t=166" target="_blank" rel="noopener">▶ 2:46</a></b-cap>

  Sous forme générale, l'entrée est $R^{ab}=R/[R,R]$ : toutes les règles $R$ dont l'ordre est « oublié » (division par les commutateurs), et les coefficients viennent de $\mathbb{Z}G$ : des sommes de mouvements à coefficients entiers du type « tant de fois vers l'avant, tant de fois vers l'arrière, en chaque point de la carte ».
</b-chapter>

<b-chapter id="answer" icon="flag" title="Réponse : oui, les deux décomptes peuvent différer">
  <b-why>La question était : le décompte rapide du comptable peut-il donner moins de règles que le décompte honnête du joueur ? Oui.</b-why>

  <b-art names="relation-gap-how-many-rules/counts"/>
  <b-cap>Joueur : deux règles. Comptable : une entrée. <a href="https://youtu.be/yPvbfDa_GCk?t=166" target="_blank" rel="noopener">▶ 2:46</a></b-cap>

  Dans le jeu « pas et montée », le joueur a besoin de deux règles et le comptable d'une entrée. Cela referme une question vieille de cinquante ans. <a href="https://youtu.be/yPvbfDa_GCk?t=175" target="_blank" rel="noopener">▶ 2:55</a> Deux arguments suivent : pourquoi une règle ne suffit pas au joueur et pourquoi une entrée suffit au comptable.
</b-chapter>

<b-chapter id="friends" icon="shield-check" title="Pourquoi une règle ne suffit pas au joueur : les amis ne commutent pas">
  <b-why>Un mouvement est dit ami d'un mouvement donné si les deux peuvent être échangés. Le demi-cercle a deux amis.</b-why>

  Ce sont deux pas sur le même cercle et le crochet. Entre eux, ils ne sont pas amis : l'ordre de ces deux mouvements ne peut pas être changé. En 1973, Newman a démontré un théorème : si un jeu a **une** règle et qu'un mouvement revient au départ, comme un pas après six répétitions, alors les amis de n'importe quel mouvement sont amis entre eux. L'article l'énonce plus strictement : tout élément non trivial d'un groupe à un relateur avec torsion a un <a href="/materials/glossary/centralizer/">centralisateur</a> cyclique (l'ensemble de tous les mouvements qui s'échangent avec lui), c'est-à-dire formé de puissances d'un seul mouvement. Dans ce jeu, les amis du demi-cercle ne sont pas amis entre eux, donc une seule règle ne peut pas le décrire.

  <b-art names="relation-gap-how-many-rules/friends"/>
  <b-cap>Les amis du demi-cercle commutent avec lui, mais pas entre eux. <a href="https://youtu.be/yPvbfDa_GCk?t=175" target="_blank" rel="noopener">▶ 2:55</a></b-cap>

  Comment l'article le vérifie : le demi-cercle est contracté en un point, et ce qui reste du jeu est le produit libre d'un groupe cyclique à trois éléments et d'un groupe cyclique infini, $C_3 * \mathbb{Z}$. Par la forme normale d'un produit libre, $x^{2}$ et le crochet ne peuvent pas y être échangés, donc ils ne commutent pas non plus dans le jeu d'origine.

  <b-art names="relation-gap-how-many-rules/free"/>
  <b-cap>Le demi-cercle est contracté en un point : il reste un triangle et une droite infinie. Ensemble, ils forment un arbre où deux chemins ne se rejoignent jamais.</b-cap>
</b-chapter>

<b-chapter id="coins" icon="shield-check" title="Pourquoi une entrée suffit au comptable : trois et deux">
  <b-why>Le plus grand commun diviseur de trois et deux est un, et cela permet de fusionner deux entrées en une.</b-why>

  On peut obtenir un à partir de trois et deux : trois moins deux. Comme avec des pièces de 3 et de 2 roubles : on tend 3, on reçoit 2 de monnaie, et il reste 1 rouble. Le <a href="/materials/glossary/gcd/">plus grand commun diviseur</a> de 3 et 2 est un, donc

  $$\gcd(3,2)=1=3-2$$

  Selon le même principe, les auteurs fusionnent deux entrées en une seule dont les deux peuvent être retrouvées. <a href="https://youtu.be/yPvbfDa_GCk?t=201" target="_blank" rel="noopener">▶ 3:21</a>

  <b-art names="relation-gap-how-many-rules/coins"/>
  <b-cap>1 = 3 − 2 : c'est pourquoi deux entrées fusionnent en une. <a href="https://youtu.be/yPvbfDa_GCk?t=207" target="_blank" rel="noopener">▶ 3:27</a></b-cap>

  Le calcul pour $p=3$, $q=2$ relève de l'algèbre scolaire. Notations de l'article, d'abord en mots :

  <b-table>
    <table><thead>
    <tr><th>Symbole</th><th>Ce que c'est</th></tr>
    </thead><tbody>
    <tr><td>$a=x^{3}$</td><td>le demi-cercle</td></tr>
    <tr><td>$b=t\,x^{2}\,t^{-1}$</td><td>le crochet</td></tr>
    <tr><td>$N_a=1+a$,&nbsp; $N_b=1+b+b^{2}$</td><td>sommes de puissances du demi-cercle et du crochet : « faire le demi-cercle zéro ou une fois » et « le crochet zéro, une ou deux fois »</td></tr>
    <tr><td>$N_x=1+x+\dots+x^{5}$</td><td>l'entrée de la première règle : faire tout le tour du cercle, six décalages à la suite</td></tr>
    <tr><td>$u$</td><td>l'entrée de la seconde règle (issue de la matrice de Fox, formule (1) de l'article)</td></tr>
    <tr><td>$v$</td><td>l'entrée astucieuse dont les deux se déduisent</td></tr>
    </tbody></table>
  </b-table>

  Viennent ensuite les formules (3) et (4) de l'article. Propriétés des sommes :

  $$N_aN_x=2N_x,\qquad N_a\,u=(1-b)\,N_x,\qquad N_b\,u=(a-1)\,t\,N_x$$

  <b-art names="relation-gap-how-many-rules/f1"/>
  <b-cap>Formules (3) : la somme « rester ou tourner d'un demi-cercle » donne au cercle le poids deux ; appliquée à l'entrée de la seconde règle, elle donne le cercle moins sa copie décalée.</b-cap>

  L'entrée astucieuse est un mélange des deux :

  $$v=N_x+(b+b^{2})\,u$$

  <b-art names="relation-gap-how-many-rules/f2"/>
  <b-cap>Formule (4) : l'entrée astucieuse est le cercle plus deux copies de l'entrée de la seconde règle, décalées par le crochet.</b-cap>

  Multiplions-la par $N_a$ et $N_b$ :

  $$N_a\,v=(1+b)\,N_x,\qquad N_b\,v=N_bN_x+2\,(a-1)\,t\,N_x$$

  <b-art names="relation-gap-how-many-rules/f3"/>
  <b-cap>Multiplication de l'entrée astucieuse par les sommes.</b-cap>

  Comme $b^{3}=1$, la simplification donne :

  $$(1-b+b^{2})\,N_a\,v=2N_x,\qquad (N_b-b\,N_a)\,v=N_x+2\,(a-1)\,t\,N_x$$

  <b-art names="relation-gap-how-many-rules/f4"/>
  <b-cap>Après simplification : le cercle de poids deux, et le cercle plus deux cercles remontés.</b-cap>

  Multiplions la première égalité par $(a-1)\,t$ et soustrayons-la de la seconde. L'entrée de la première règle s'exprime à l'aide de $v$ :

  $$N_x=\bigl(N_b-b\,N_a-(a-1)\,t\,(1-b+b^{2})\,N_a\bigr)\,v$$

  <b-art names="relation-gap-how-many-rules/f5"/>
  <b-cap>Le résultat : les deux entrées se déduisent de v, donc une entrée suffit.</b-cap>

  L'entrée de la seconde règle $u$ s'exprime aussi à l'aide de $v$ à partir de $v=N_x+(b+b^2)u$. Le module des relations tout entier est donc engendré par le seul élément $v$. Ces égalités ont été vérifiées à la main lors de la préparation du film.
</b-chapter>

<b-chapter id="main" icon="flag" title="Bilan">
  <b-why>La question était : le décompte rapide du comptable peut-il donner moins de règles que le décompte honnête du joueur ? Oui, et l'exemple est un jeu à deux mouvements.</b-why>

  <b-art names="relation-gap-how-many-rules/summary"/>
  <b-cap>Le fil du raisonnement : le jeu, un joueur à deux règles, un comptable à une entrée, l'écart « deux contre un ».</b-cap>

  <b-callout icon="shield-check">**Une réserve.** Le théorème A est démontré complètement et indépendamment d'OpenAI. Le corollaire B, un contre-exemple au problème D2 de Wall, s'appuie sur un preprint d'OpenAI du 6 octobre 2026, et les auteurs le qualifient eux-mêmes de conditionnel. L'article n'a pas encore été vérifié de manière indépendante.</b-callout>
</b-chapter>

<b-chapter id="formal" icon="boxes-route" title="Formellement : le même chemin dans le langage de l'article">
  <b-why>La seconde partie du film : les mêmes étapes avec des formules et le vocabulaire des mathématiciens. D'abord une carte des correspondances, puis un tableau de formules, puis le plan de la démonstration.</b-why>

  <b-art names="relation-gap-how-many-rules/dict"/>
  <b-cap>À gauche les mots du film, à droite leur notation dans l'article. <a href="https://youtu.be/yPvbfDa_GCk?t=252" target="_blank" rel="noopener">▶ 4:12</a></b-cap>

  <b-table>
    <table><thead>
    <tr><th>Dans le film</th><th>Dans l'article</th><th>Comment cela fonctionne</th></tr>
    </thead><tbody>
    <tr><td>le jeu</td><td>le groupe $G=F/R$</td><td>$F$ est le groupe libre : tous les mots en lettres $x$, $t$ sans aucune règle ; $R$ est tout ce qui découle des règles (clôture normale)</td></tr>
    <tr><td>pas, montée</td><td>générateurs $x$, $t$</td><td>une descente est $t^{-1}$ ; un enchaînement de mouvements s'écrit comme un mot</td></tr>
    <tr><td>première règle</td><td>$x^{pq}=1$</td><td>pour $p=3$, $q=2$ : $x^{6}=1$, comme six rotations de $60^\circ$</td></tr>
    <tr><td>seconde règle</td><td>$[x^{p},\,t\,x^{q}\,t^{-1}]=1$</td><td>$[u,v]=u\,v\,u^{-1}v^{-1}$ : droite puis haut égale haut puis droite</td></tr>
    <tr><td>le jeu entier</td><td>$G=\langle x,t\mid x^{pq},\,[x^{p},\,t\,x^{q}\,t^{-1}]\rangle$</td><td>Théorème A : $p,q\ge 2$ premiers entre eux</td></tr>
    <tr><td>le décompte du joueur</td><td>$d_F(R)$</td><td>le plus petit nombre de générateurs normaux de $R$ ; ici 2</td></tr>
    <tr><td>le décompte du comptable</td><td>$d_{\mathbb{Z}G}(R^{ab})$</td><td>le plus petit nombre de générateurs du module des relations $R/[R,R]$ ; ici 1</td></tr>
    <tr><td>boucle — entrée</td><td>premier groupe d'homologie du graphe de Cayley</td><td>le module des relations est l'image de l'application bord $\partial_2$, donnée par la matrice de Fox</td></tr>
    <tr><td>amis</td><td>centralisateur</td><td>Théorème de Newman : dans un groupe à un relateur avec torsion, les centralisateurs sont cycliques</td></tr>
    <tr><td>nombres 3 et 2</td><td>$p$ et $q$ premiers entre eux</td><td>$\gcd(3,2)=1=3-2$</td></tr>
    </tbody></table>
  </b-table>

  La démonstration du théorème A occupe une page et demie dans l'article. Les étapes :

  <b-steps top="14" round>
    <step t="Pas une règle">Le groupe n'est pas un groupe à une règle : le demi-cercle $a=x^{p}$ est d'ordre $q$, et $x^{q}$ et le crochet $b$ le centralisent tous deux sans commuter entre eux. Donc $d_F(R)=2$ (théorème de Newman).</step>
    <step t="Deux entrées">Le module des relations est l'image de l'application bord du complexe de revêtement. La matrice de Fox donne deux entrées : $N_x$ et $u$.</step>
    <step t="Une entrée">Pour $p=3$, $q=2$, on construit $v=N_x+(b+b^{2})\,u$, et $N_x$, $u$ s'expriment à l'aide de $v$ (calcul ci-dessus). Le cas général est analogue, avec une formule plus lourde pour $v$.</step>
  </b-steps>

  Le groupe peut être défini dans le <a href="/materials/glossary/computer-algebra-system/">système de calcul formel</a> GAP en deux lignes : <a href="https://youtu.be/yPvbfDa_GCk?t=389" target="_blank" rel="noopener">▶ 6:29</a>

  <b-codebox copy>
    F := FreeGroup("x", "t");;  x := F.1;;  t := F.2;;
    G := F / [ x^6, Comm(x^3, t*x^2*t^-1) ];;
  </b-codebox>
  <b-cap>Le groupe libre sur x et t quotienté par deux relations. Ensuite, le groupe se manipule comme un objet ordinaire.</b-cap>
</b-chapter>

<b-chapter id="practice" icon="grid" title="Où cela apparaît">
  <b-why>Les applications directes du résultat restent pour l'instant dans les mathématiques elles-mêmes ; les autres sont des analogies avec la même leçon : une estimation rapide de la complexité peut se révéler inférieure à la complexité réelle.</b-why>

  <b-art names="relation-gap-how-many-rules/uses"/>
  <b-cap>Direct : les systèmes de calcul formel ; conditionnel : la topologie ; par analogie : le cube, les données, les spécifications.</b-cap>

  <b-table>
    <table><thead>
    <tr><th>Lien</th><th>Où et ce que cela signifie</th></tr>
    </thead><tbody>
    <tr><td><b-tag kind="ok">direct</b-tag></td><td><a href="/materials/glossary/computer-algebra-system/">systèmes de calcul formel</a> (GAP, Magma) : les groupes sont donnés par des mouvements et des règles, et l'on sait désormais qu'une entrée peut suffire là où il y a deux relations</td></tr>
    <tr><td><b-tag kind="ok">direct, conditionnel</b-tag></td><td>topologie : les mêmes groupes donnent la forme du <a href="/materials/glossary/wall-d2-problem/">problème D2 de Wall</a> : un complexe de six cellules (un point, deux arêtes, deux cellules plates et une cellule solide) ; si le résultat d'OpenAI est confirmé, cette forme ne se ramène pas à une forme de dimension deux</td></tr>
    <tr><td><b-tag kind="plain">analogie</b-tag></td><td>Rubik's cube et casse-têtes : des mouvements et des règles, où l'on compte aussi « combien de règles sont nécessaires » (<a href="/blog/rubik-cube-neural-network/">article sur le cube</a>)</td></tr>
    <tr><td><b-tag kind="plain">analogie</b-tag></td><td>analyse de données : un décompte linéaire rapide des « trous » dans la forme des données peut sous-estimer la complexité</td></tr>
    <tr><td><b-tag kind="plain">analogie</b-tag></td><td>spécifications logicielles : le plus court ensemble de règles et une estimation rapide du nombre de règles peuvent différer</td></tr>
    </tbody></table>
  </b-table>
  <b-callout icon="bulb">**Leçon.** Une estimation linéaire rapide de la complexité peut la sous-évaluer. C'est désormais démontré sur un exemple à deux mouvements. <a href="https://youtu.be/yPvbfDa_GCk?t=401" target="_blank" rel="noopener">▶ 6:41</a></b-callout>
</b-chapter>

<b-chapter id="when" icon="shield-check" title="Qui et quand, ce qui est démontré">
  <b-steps top="14" round>
    <step t="1965">Wall soulève la question des complexes D2 (<a href="/materials/glossary/wall-d2-problem/">le problème D2</a>)</step>
    <step t="1973">Newman : un théorème sur les centralisateurs dans les groupes à un relateur</step>
    <step t="1976">Gruenberg : la question de l'écart de relations</step>
    <step t="1979">Problème B15 dans la liste de Wall</step>
    <step t="6.10.2026">Preprint d'OpenAI sur un contre-exemple au problème D2 de Wall</step>
    <step t="16.10.2026" hl>L'article : quatre auteurs, théorème A démontré complètement</step>
  </b-steps>

  Théorème A : pour $p,q\ge 2$ premiers entre eux, le groupe $\langle x,t\mid x^{pq},\,[x^{p},\,t\,x^{q}\,t^{-1}]\rangle$ n'est pas un groupe à un relateur, mais son module des relations est cyclique ; donc $d_F(R)=2$ et $d_{\mathbb{Z}G}(R^{ab})=1$. Le corollaire B s'appuie sur le résultat d'OpenAI, et les auteurs le qualifient eux-mêmes de conditionnel. L'exemple est minimal : six cellules, le moins qu'un contre-exemple au problème de Wall puisse avoir. <a href="https://youtu.be/yPvbfDa_GCk?t=420" target="_blank" rel="noopener">▶ 7:00</a>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Questions fréquentes">
  <b-faq-cards>
    <q t="Qu'est-ce que l'écart de relations ?">La situation où le plus petit nombre de relations d'un groupe est supérieur au plus petit nombre de générateurs de son module des relations. La question de savoir si cela arrive a été posée en 1976 ; l'article de 2026 montre que oui.</q>
    <q t="Qu'est-ce qu'un module des relations ?">Toutes les conséquences des relations d'un groupe, écrites de sorte que l'ordre d'écriture n'ait pas d'importance : des boucles sur la carte du jeu que l'on peut additionner et déplacer. Dans l'article, c'est $R/[R,R]$ avec le groupe agissant par conjugaison.</q>
    <q t="En quoi le joueur diffère-t-il du comptable ?">Le joueur compte les règles honnêtement, comme des parcours sur la carte où l'ordre des mouvements compte. Le comptable compte des entrées où l'ordre des mouvements n'est pas retenu. Le joueur en obtient deux, le comptable une.</q>
    <q t="Que sont les amis d'un mouvement ?">Les mouvements qui peuvent être échangés avec le mouvement donné. Dans l'article, c'est le centralisateur d'un élément. Le théorème de Newman dit qu'avec une seule règle et un mouvement qui revient au départ, les amis commutent entre eux.</q>
    <q t="Le problème D2 de Wall est-il résolu ?">Sous condition. L'article construit un complexe D2 de six cellules, mais la conclusion repose sur un preprint d'OpenAI du 6 octobre 2026, et les auteurs qualifient le corollaire B de conditionnel. Le théorème A, sur l'écart de relations, ne dépend pas de ce preprint.</q>
    <q t="Quel rôle l'IA a-t-elle joué ?">D'après les auteurs, ChatGPT a aidé à trouver les groupes et la démonstration et a produit un premier brouillon, et Claude a été consulté pendant la relecture. Les auteurs ont eux-mêmes vérifié et remanié les arguments et le texte, et sont responsables du résultat.</q>
    <q t="Puis-je vérifier moi-même ?">Oui : le groupe du théorème A se définit dans GAP en deux lignes (code ci-dessus), et le calcul pour $p=3$, $q=2$ relève de l'algèbre scolaire, donnée dans le chapitre sur trois et deux.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Pour aller plus loin">
  <b-links cols="2">
    <item href="https://arxiv.org/abs/2610.23637" k="Article" t="arXiv 2610.23637" ext>Two-generator presentations with a relation gap</item>
    <item href="https://github.com/esurvanov/awesome-papers/tree/main/papers/2610.23637-relation-gap" k="Source du film" t="papers/2610.23637-relation-gap" ext>Fiche, narration, scènes et scénario du film sur GitHub</item>
    <item href="https://github.com/esurvanov/awesome-papers" k="Dépôt" t="awesome-papers" ext>Des films sur des articles scientifiques en termes simples : code, règles, vérifications</item>
    <item href="https://youtu.be/yPvbfDa_GCk" k="Vidéo" t="Présentation sur YouTube" ext>La même histoire en 7,5 minutes, avec la carte du jeu et les formules</item>
    <item href="/blog/longest-ring-arrangement/" k="Le même graphe de Cayley" t="Anneau de boules">Une carte des mouvements et l'arrangement le plus emmêlé</item>
    <item href="/blog/rubik-cube-neural-network/" k="Le même graphe de Cayley" t="Rubik's cube">Des mouvements et des règles là où la force brute est impossible</item>
  </b-links>
</b-chapter>
<b-footer>Les faits proviennent de l'article de L. Bartholdi, M. R. Bridson, R. Mikhailov et J. Nicholson, arXiv 2610.23637 (théorème A, corollaire B, formules (1)–(4), section « Declaration of AI usage »). Le calcul pour p = 3, q = 2 a été refait à la main lors de la préparation du film ; l'article n'a pas encore été vérifié de manière indépendante.</b-footer>
</b-post>
