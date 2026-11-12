---
title: How many rules does a game need: the step-and-lift game needs two rules, while an accountant needs one entry — the relation gap
date: 2026-11-02
updated: 2026-11-13
description: How to count the rules of a game honestly and quickly, and whether the two answers can differ. A walkthrough of the paper by Bartholdi, Bridson, Mikhailov and Nicholson on the relation gap (arXiv 2610.23637): a game with two moves where the player needs two rules and the accountant needs one entry, with diagrams, formulas and calculations.
tags: research, mathematics, group theory, topology, AI in mathematics
category: research
layout: wide
math: true
mentions: relation gap, group presentation, relation module, Cayley graph, Newman's theorem, one-relator group, Wall's D2 problem, D2 complex, homology, GAP, greatest common divisor, Gruenberg
toc: video=Video | question=Question | paper=Paper and authors | rules=Two rules | why=Why this game | player=Player | accountant=Accountant | answer=Answer | friends=Friends | coins=Coins | main=Takeaway | formal=Formally | practice=Where it shows up | when=Who and when | faq=Questions | next=Next
---

A game with two moves, a step and a lift, needs two rules if counted honestly, like a player, and one entry if counted fast, like an accountant who writes rules down as loops and forgets the order of moves. That is how four mathematicians settled the <a href="/materials/glossary/relation-gap/">relation gap</a> question in October 2026, open since 1976.

<b-post series="kto">

<b-chapter id="video" icon="video" title="Video: the same story in 7.5 minutes">
  <b-why>The article follows the film scene by scene and goes into more detail. Under each diagram there is a link to that moment of the video.</b-why>
  <b-embed-frame src="https://www.youtube.com/embed/yPvbfDa_GCk" title="How many rules does a game need — the paper arXiv 2610.23637 in plain words" ratio="16/9"/>
  <b-cap>Paper: <a href="https://arxiv.org/abs/2610.23637" target="_blank" rel="noopener">Two-generator presentations with a relation gap</a>, arXiv 2610.23637, 16 October 2026. The game, the step, the lift, the player and the accountant are images for the explanation; in the paper they are a group, generators, the least number of relations and the least number of generators of the relation module. Watching the film is not required: everything in it is retold below.</b-cap>
</b-chapter>

<b-chapter id="question" icon="grid" title="Question: how many rules does a game have, and are there two ways to count">
  <b-why>Mathematicians describe puzzles and symmetries as games: there are moves and there are rules. A rule says which chain of moves puts everything back in place.</b-why>

  Take the Rubik's cube. The **moves** are turns of the faces. Moves combine into chains: turn one face, then another, then a third. Every move can be undone by turning the face back. Mathematicians call the whole set of such chains a <a href="/materials/glossary/math-group/">group</a>, and a small set of moves from which all others are built a set of <a href="/materials/glossary/generators/">generators</a>. A **rule** (mathematicians say “<a href="/materials/glossary/group-relation/">relation</a>”) is a chain that changes nothing: for example, four turns of one face in a row bring the cube back to where it was.

  The question: **how many rules are needed to describe the game completely**, that is, so that everything else true in the game follows from these rules? The shorter the list, the simpler the description. There are two ways to count.

  <b-table>
    <table><thead>
    <tr><th>Count</th><th>How it counts</th><th>In the paper</th></tr>
    </thead><tbody>
    <tr><td><b>Player</b> — honest</td><td>a rule is a route on the game map that returns to the start; the order of moves matters: “right, up” and “up, right” are different routes</td><td>the least number of relations, $d_F(R)$</td></tr>
    <tr><td><b>Accountant</b> — fast</td><td>writes each rule into a ledger as a loop; entries can be added in any order, the order of moves is not remembered</td><td>the least number of generators of the <a href="/materials/glossary/relation-module/">relation module</a>, $d_{\mathbb{Z}G}(R^{ab})$</td></tr>
    </tbody></table>
  </b-table>

  <b-art names="relation-gap-how-many-rules/methods"/>
  <b-cap>The player walks the map and the order of moves matters; the accountant keeps a tally of passes and the order does not matter.</b-cap>

  The accountant never needs more entries than the player has rules: each rule of the player simply becomes an entry. The question is the reverse: can there be **fewer** entries than rules? For fifty years nobody knew. This question is called the **relation gap**: it came from Karl Gruenberg's 1976 work and entered Wall's 1979 list of problems (problem B15). The case of a single entry is especially interesting: does it follow that the group has just one rule? <a href="https://youtu.be/yPvbfDa_GCk?t=0" target="_blank" rel="noopener">▶ 0:00</a>
</b-chapter>

<b-chapter id="paper" icon="trophy" title="Paper and authors: the answer in three pages">
  <b-why>A preprint of 16 October 2026: four mathematicians from Lyon and Geneva, Oxford, Saint Petersburg and Bonn.</b-why>

  <b-table>
    <table><thead>
    <tr><th>Author</th><th>Where they work</th></tr>
    </thead><tbody>
    <tr><td>Laurent Bartholdi</td><td>Institut Camille Jordan, Lyon; University of Geneva</td></tr>
    <tr><td>Martin R. Bridson</td><td>Mathematical Institute, University of Oxford</td></tr>
    <tr><td>Roman Mikhailov</td><td>Saint Petersburg State University</td></tr>
    <tr><td>John Nicholson</td><td>Max Planck Institute for Mathematics, Bonn</td></tr>
    </tbody></table>
  </b-table>

  The result in one sentence: in a game **with two moves** the player needs two rules, while the accountant needs one entry. In the paper this is Theorem A, proved completely and in an elementary way. The second result, Corollary B, is about <a href="/materials/glossary/wall-d2-problem/">Wall's D2 problem</a>. It relies on an OpenAI preprint of 6 October 2026 and is conditional; more on it in the chapter on practice. <a href="https://youtu.be/yPvbfDa_GCk?t=26" target="_blank" rel="noopener">▶ 0:26</a>

  Theorem A in formulas (for any coprime $p, q \ge 2$):

  $$G=\langle x,\,t \mid x^{pq},\ [x^{p},\ t\,x^{q}\,t^{-1}]\rangle$$

  <b-art names="relation-gap-how-many-rules/general"/>
  <b-cap>The general case: a circle of pq points, the half-circle is p steps, the hook is q steps upstairs; p and q share no divisor.</b-cap>

  Read it like this: “the game $G$ is built from two moves $x$ and $t$ and obeys two rules.” The first rule: repeat the move $x$ $pq$ times and everything is back in place. The second rule: the moves $x^{p}$ and $t\,x^{q}\,t^{-1}$ can be swapped. The game is not described by one rule ($d_F(R)=2$), but its relation module is generated by one entry ($d_{\mathbb{Z}G}(R^{ab})=1$).

  The authors state the role of AI openly, in the section “Declaration of AI usage”: ChatGPT (“6 Astra”, as printed) helped to discover the groups of Theorem A, the proof, and an initial draft of the manuscript; Claude (“Fable 5.1”) was consulted during later editing; the arguments and the text were thoroughly checked and substantially revised by the authors, who are responsible for the final manuscript.
</b-chapter>

<b-chapter id="rules" icon="boxes-route" title="The game: a step, a lift and two rules">
  <b-why>The game has a token and a circle of six points. The first move, the **step**, moves the token one point along the circle.</b-why>

  Six steps and the token is back. That is the **first rule**. The game does not stay on one circle: from each point of the circle its own **lift** raises the token to its own circle one floor up, and a lift down brings it back. Circles and lifts make up the **game map**. Mathematicians call such a map the <a href="/materials/glossary/cayley-graph/">Cayley graph</a> of a group, and the same kind of graph lies under the <a href="/blog/rubik-cube-neural-network/">Rubik's cube</a> and under the <a href="/blog/longest-ring-arrangement/">ring of balls</a>: vertices are positions, edges are moves.

  <b-art names="relation-gap-how-many-rules/map"/>
  <b-cap>Below, the circle of floor 0, numbers are points. The blue arrow is a step, the green ones are lifts to circles of floor 1. <a href="https://youtu.be/yPvbfDa_GCk?t=48" target="_blank" rel="noopener">▶ 0:48</a> and <a href="https://youtu.be/yPvbfDa_GCk?t=61" target="_blank" rel="noopener">▶ 1:01</a></b-cap>

  The map has a **second rule**. A **half-circle** is three steps in a row. A **hook** is to go up in the lift, take two steps upstairs and come down. The descent leads to a different circle, not the one you started from. The rule says: a half-circle followed by a hook is the same as a hook followed by a half-circle. These two moves can be swapped.

  <b-art names="relation-gap-how-many-rules/swap"/>
  <b-cap>Two paths from the start arrive at the same point. <a href="https://youtu.be/yPvbfDa_GCk?t=76" target="_blank" rel="noopener">▶ 1:16</a></b-cap>

  Mathematicians write the same thing with letters. The step is $x$, the lift is $t$, a lift down is $t^{-1}$. A chain of moves is written in a row, like a word, and a repeat is a power: $x^3$ is three steps. So the half-circle is $x^3$, and the hook is $t\,x^2\,t^{-1}$: go up, two steps, come down. The rules become:

  $$x^{6}=1 \qquad\text{and}\qquad [\,x^{3},\ t\,x^{2}\,t^{-1}\,]=1$$

  Here 1 means “nothing was done”. The square brackets are the <a href="/materials/glossary/commutator/">commutator</a>: $[u,v]=u\,v\,u^{-1}v^{-1}$. It equals 1 exactly when the moves $u$ and $v$ can be swapped: do $u$, then $v$, then undo $u$ and $v$, and you are back at the start.
  <b-art names="relation-gap-how-many-rules/commutator"/>
  <b-cap>The commutator: u, v, the inverse of u, the inverse of v. If the moves can be swapped you land exactly at the start.</b-cap>

  The whole game fits in one line, a <a href="/materials/glossary/group-presentation/">group presentation</a>:

  $$G=\langle\, x,\ t \mid x^{6},\ [x^{3},\ t\,x^{2}\,t^{-1}]\,\rangle$$

  <b-art names="relation-gap-how-many-rules/present"/>
  <b-cap>The game in one line: moves left of the bar, rules right of it.</b-cap>

  To the left of the bar are the letters of the moves, to the right the rules.
</b-chapter>

<b-chapter id="why" icon="search" title="Why the game is exactly like this">
  <b-why>Every detail is needed for the answer, and none is spare. Three details work for the two heroes of the answer: the first two are for the player, the third is for the accountant.</b-why>

  <b-art names="relation-gap-how-many-rules/three"/>
  <b-cap>On the left, three details of the game; on the right, who needs each one. <a href="https://youtu.be/yPvbfDa_GCk?t=98" target="_blank" rel="noopener">▶ 1:38</a></b-cap>

  **Six steps and the token is home.** Needed by the player. The game has a move that, repeated several times, returns to the start. In mathematics this is called torsion. For Newman's theorem (see the chapter on friends) it is the key condition.

  **The half-circle and the hook swap places.** Also needed by the player. Moves that can be swapped are called **friends**. The half-circle has two friends: two steps along the same circle and the hook. Between themselves they are not friends, and from that it follows that one rule cannot describe the game.

  **The numbers three and two.** Needed by the accountant. The half-circle has three steps, the hook has two steps upstairs, and 3 and 2 share no divisor. Thanks to this two entries can be merged into one.

  In the paper the number of steps in the half-circle and in the hook is any pair of coprime numbers $p$ and $q$, both at least two. The film takes the smallest pair: $p=3$, $q=2$. Then the first rule is $x^{pq}=x^{6}=1$, and the second says that $x^{p}=x^{3}$ and the hook $t\,x^{q}\,t^{-1}=t\,x^{2}\,t^{-1}$ commute.
</b-chapter>

<b-chapter id="player" icon="bulb" title="The player's count: two rules, and not fewer">
  <b-why>The player writes a rule as a route on the map, and the order of moves in it matters. The goal is the shortest list from which all other rules of the game follow.</b-why>

  What does “follow” mean? If $x^{6}=1$ holds, then $x^{12}=1$ holds too: twelve steps are six steps and then six more. Such a rule adds nothing to the list, and the player crosses it out. The same works for any consequence: as long as a rule comes from the ones already written, it is spare. After crossing out, two rules remain on the list: six steps bring you back, and the half-circle swaps with the hook.

  <b-art names="relation-gap-how-many-rules/player"/>
  <b-cap>Of four candidates, two rules make the list; the others are consequences. <a href="https://youtu.be/yPvbfDa_GCk?t=124" target="_blank" rel="noopener">▶ 2:04</a></b-cap>

  Why can the list not hold just one rule? If a game has one rule, Newman's theorem says that the friends of any move are friends with each other. Here the friends of the half-circle, two steps and the hook, are not friends with each other (chapter “Friends” below), so one rule is not enough. Mathematicians write this as $d_F(R)=2$: the least number of normal generators of the group of rules is two.
</b-chapter>

<b-chapter id="accountant" icon="bulb" title="The accountant's count: one entry">
  <b-why>The accountant writes each rule into a ledger as a loop: a route that came back to the start. Entries are added in any order and moved around the map.</b-why>

  How an entry works. The accountant walks a route and keeps a tally: how many times each segment of the map was passed forward (plus one) and backward (minus one). A loop around a square gives plus one on each side. Two routes that go around the same square with different starts leave **the same entry**: order and start are not kept. So entries can be added in any order, like numbers in a ledger, and can be moved to any place on the map. Mathematicians call such an entry <a href="/materials/glossary/group-homology/">homology</a> of the graph, and all entries together the relation module.

  <b-art names="relation-gap-how-many-rules/loops"/>
  <b-cap>Two loops with different starts give one entry: a tally of passes over segments. <a href="https://youtu.be/yPvbfDa_GCk?t=144" target="_blank" rel="noopener">▶ 2:24</a></b-cap>

  The accountant never has more entries than the player has rules: each rule of the player is written down as a loop. And fewer? The authors built one clever entry $v$, a mix of the entries of both rules. From its copies (shifts around the map and sums) the entry of the second rule comes out at once, and the entry of the first rule in three actions. So **one entry is enough for the accountant**: all other entries come from $v$ by adding and moving. Mathematicians write this as $d_{\mathbb{Z}G}(R^{ab})=1$ and say that the relation module is **cyclic**.

  <b-art names="relation-gap-how-many-rules/merge"/>
  <b-cap>One clever entry replaces two. It works because 3 and 2 share no divisor. <a href="https://youtu.be/yPvbfDa_GCk?t=166" target="_blank" rel="noopener">▶ 2:46</a></b-cap>

  In general form the entry is $R^{ab}=R/[R,R]$: all rules $R$ with the order “forgotten” (division by commutators), and the coefficients come from $\mathbb{Z}G$: sums of moves with integer coefficients of the kind “so many times forward, so many times backward, at every point of the map”.
</b-chapter>

<b-chapter id="answer" icon="flag" title="Answer: yes, the two counts can differ">
  <b-why>The question was: can the accountant's fast count give fewer rules than the player's honest count? It can.</b-why>

  <b-art names="relation-gap-how-many-rules/counts"/>
  <b-cap>Player: two rules. Accountant: one entry. <a href="https://youtu.be/yPvbfDa_GCk?t=166" target="_blank" rel="noopener">▶ 2:46</a></b-cap>

  In the game “step and lift” the player needs two rules and the accountant needs one entry. That closes a question fifty years old. <a href="https://youtu.be/yPvbfDa_GCk?t=175" target="_blank" rel="noopener">▶ 2:55</a> Two arguments follow: why one rule is not enough for the player and why one entry is enough for the accountant.
</b-chapter>

<b-chapter id="friends" icon="shield-check" title="Why one rule is not enough for the player: the friends do not commute">
  <b-why>A move is called a friend of a given move if the two can be swapped. The half-circle has two friends.</b-why>

  They are two steps along the same circle and the hook. Between themselves they are not friends: the order of these two moves cannot be changed. In 1973 Newman proved a theorem: if a game has **one** rule and some move returns to the start, like a step after six repeats, then the friends of any move are friends with each other. The paper states it more strictly: every nonidentity element of a one-relator group with torsion has a cyclic <a href="/materials/glossary/centralizer/">centraliser</a> (the set of all moves that swap with it), that is, it consists of powers of one move. In this game the friends of the half-circle are not friends with each other, so one rule cannot describe it.

  <b-art names="relation-gap-how-many-rules/friends"/>
  <b-cap>The friends of the half-circle commute with it, but not with each other. <a href="https://youtu.be/yPvbfDa_GCk?t=175" target="_blank" rel="noopener">▶ 2:55</a></b-cap>

  How the paper checks it: the half-circle is collapsed to a point, and what remains of the game is the free product of a cyclic group of three elements and an infinite cyclic group, $C_3 * \mathbb{Z}$. By the normal form of a free product, $x^{2}$ and the hook cannot be swapped there, so they do not commute in the original game either.

  <b-art names="relation-gap-how-many-rules/free"/>
  <b-cap>The half-circle is collapsed to a point: a triangle and an infinite line remain. Together they form a tree where two paths never meet.</b-cap>
</b-chapter>

<b-chapter id="coins" icon="shield-check" title="Why one entry is enough for the accountant: three and two">
  <b-why>The greatest common divisor of three and two is one, and that lets two entries be merged into one.</b-why>

  One can be obtained from three and two: three minus two. Like coins of 3 and 2 roubles: you hand over 3, get 2 back as change, and 1 rouble is left. The <a href="/materials/glossary/gcd/">greatest common divisor</a> of 3 and 2 is one, so

  $$\gcd(3,2)=1=3-2$$

  By the same principle the authors merge two entries into one from which both can be recovered. <a href="https://youtu.be/yPvbfDa_GCk?t=201" target="_blank" rel="noopener">▶ 3:21</a>

  <b-art names="relation-gap-how-many-rules/coins"/>
  <b-cap>1 = 3 − 2: that is why two entries merge into one. <a href="https://youtu.be/yPvbfDa_GCk?t=207" target="_blank" rel="noopener">▶ 3:27</a></b-cap>

  The calculation for $p=3$, $q=2$ is school algebra. Notation from the paper, first in words:

  <b-table>
    <table><thead>
    <tr><th>Symbol</th><th>What it is</th></tr>
    </thead><tbody>
    <tr><td>$a=x^{3}$</td><td>the half-circle</td></tr>
    <tr><td>$b=t\,x^{2}\,t^{-1}$</td><td>the hook</td></tr>
    <tr><td>$N_a=1+a$,&nbsp; $N_b=1+b+b^{2}$</td><td>sums of powers of the half-circle and the hook: “do the half-circle zero or one times” and “the hook zero, one or two times”</td></tr>
    <tr><td>$N_x=1+x+\dots+x^{5}$</td><td>the entry of the first rule: go around the whole circle, six shifts in a row</td></tr>
    <tr><td>$u$</td><td>the entry of the second rule (from the Fox matrix, formula (1) of the paper)</td></tr>
    <tr><td>$v$</td><td>the clever entry from which both come out</td></tr>
    </tbody></table>
  </b-table>

  Next come formulas (3) and (4) of the paper. Properties of the sums:

  $$N_aN_x=2N_x,\qquad N_a\,u=(1-b)\,N_x,\qquad N_b\,u=(a-1)\,t\,N_x$$

  <b-art names="relation-gap-how-many-rules/f1"/>
  <b-cap>Formulas (3): the sum “stay or turn by a half-circle” gives the circle weight two; applied to the entry of the second rule it gives the circle minus its shifted copy.</b-cap>

  The clever entry is a mix of the two:

  $$v=N_x+(b+b^{2})\,u$$

  <b-art names="relation-gap-how-many-rules/f2"/>
  <b-cap>Formula (4): the clever entry is the circle plus two copies of the entry of the second rule, shifted by the hook.</b-cap>

  Multiply it by $N_a$ and $N_b$:

  $$N_a\,v=(1+b)\,N_x,\qquad N_b\,v=N_bN_x+2\,(a-1)\,t\,N_x$$

  <b-art names="relation-gap-how-many-rules/f3"/>
  <b-cap>Multiplying the clever entry by the sums.</b-cap>

  Since $b^{3}=1$, simplifying gives:

  $$(1-b+b^{2})\,N_a\,v=2N_x,\qquad (N_b-b\,N_a)\,v=N_x+2\,(a-1)\,t\,N_x$$

  <b-art names="relation-gap-how-many-rules/f4"/>
  <b-cap>After simplifying: the circle with weight two, and the circle plus two lifted circles.</b-cap>

  Multiply the first equality by $(a-1)\,t$ and subtract it from the second. The entry of the first rule comes out through $v$:

  $$N_x=\bigl(N_b-b\,N_a-(a-1)\,t\,(1-b+b^{2})\,N_a\bigr)\,v$$

  <b-art names="relation-gap-how-many-rules/f5"/>
  <b-cap>The result: both entries come out of v, so one entry is enough.</b-cap>

  The entry of the second rule $u$ is also expressed through $v$ from $v=N_x+(b+b^2)u$. So the whole relation module is generated by the single element $v$. These equalities were checked by hand while preparing the film.
</b-chapter>

<b-chapter id="main" icon="flag" title="Takeaway">
  <b-why>The question was: can the accountant's fast count give fewer rules than the player's honest count? It can, and the example is a game with two moves.</b-why>

  <b-art names="relation-gap-how-many-rules/summary"/>
  <b-cap>The line of reasoning: the game, a player with two rules, an accountant with one entry, the gap “two against one”.</b-cap>

  <b-callout icon="shield-check">**A caveat.** Theorem A is proved completely and independently of OpenAI. Corollary B, a counterexample to Wall's D2 problem, relies on an OpenAI preprint of 6 October 2026, and the authors themselves call it conditional. The paper has not been independently verified yet.</b-callout>
</b-chapter>

<b-chapter id="formal" icon="boxes-route" title="Formally: the same path in the language of the paper">
  <b-why>The second part of the film: the same steps with formulas and the mathematicians' vocabulary. First a map of correspondences, then a table with formulas, then an outline of the proof.</b-why>

  <b-art names="relation-gap-how-many-rules/dict"/>
  <b-cap>On the left the words of the film, on the right their notation in the paper. <a href="https://youtu.be/yPvbfDa_GCk?t=252" target="_blank" rel="noopener">▶ 4:12</a></b-cap>

  <b-table>
    <table><thead>
    <tr><th>In the film</th><th>In the paper</th><th>How it works</th></tr>
    </thead><tbody>
    <tr><td>the game</td><td>the group $G=F/R$</td><td>$F$ is the free group: all words in the letters $x$, $t$ with no rules; $R$ is everything that follows from the rules (normal closure)</td></tr>
    <tr><td>step, lift</td><td>generators $x$, $t$</td><td>a lift down is $t^{-1}$; a chain of moves is written as a word</td></tr>
    <tr><td>first rule</td><td>$x^{pq}=1$</td><td>for $p=3$, $q=2$: $x^{6}=1$, like six turns of $60^\circ$</td></tr>
    <tr><td>second rule</td><td>$[x^{p},\,t\,x^{q}\,t^{-1}]=1$</td><td>$[u,v]=u\,v\,u^{-1}v^{-1}$: right-then-up equals up-then-right</td></tr>
    <tr><td>the whole game</td><td>$G=\langle x,t\mid x^{pq},\,[x^{p},\,t\,x^{q}\,t^{-1}]\rangle$</td><td>Theorem A: $p,q\ge 2$ coprime</td></tr>
    <tr><td>the player's count</td><td>$d_F(R)$</td><td>the least number of normal generators of $R$; here 2</td></tr>
    <tr><td>the accountant's count</td><td>$d_{\mathbb{Z}G}(R^{ab})$</td><td>the least number of generators of the relation module $R/[R,R]$; here 1</td></tr>
    <tr><td>loop — entry</td><td>first homology of the Cayley graph</td><td>the relation module is the image of the boundary map $\partial_2$, given by the Fox matrix</td></tr>
    <tr><td>friends</td><td>centraliser</td><td>Newman's theorem: in a one-relator group with torsion centralisers are cyclic</td></tr>
    <tr><td>numbers 3 and 2</td><td>$p$ and $q$ coprime</td><td>$\gcd(3,2)=1=3-2$</td></tr>
    </tbody></table>
  </b-table>

  The proof of Theorem A takes a page and a half in the paper. The steps:

  <b-steps top="14" round>
    <step t="Not one rule">The group is not a one-rule group: the half-circle $a=x^{p}$ has order $q$, and $x^{q}$ and the hook $b$ both centralise it but do not commute with each other. So $d_F(R)=2$ (Newman's theorem).</step>
    <step t="Two entries">The relation module is the image of the boundary map of the covering complex. The Fox matrix gives two entries: $N_x$ and $u$.</step>
    <step t="One entry">For $p=3$, $q=2$ one builds $v=N_x+(b+b^{2})\,u$, and $N_x$, $u$ are expressed through $v$ (calculation above). The general case is similar, with a more cumbersome formula for $v$.</step>
  </b-steps>

  The group can be defined in the <a href="/materials/glossary/computer-algebra-system/">computer algebra system</a> GAP with two lines: <a href="https://youtu.be/yPvbfDa_GCk?t=389" target="_blank" rel="noopener">▶ 6:29</a>

  <b-codebox copy>
    F := FreeGroup("x", "t");;  x := F.1;;  t := F.2;;
    G := F / [ x^6, Comm(x^3, t*x^2*t^-1) ];;
  </b-codebox>
  <b-cap>The free group on x and t divided by two relations. After that the group can be worked with as an ordinary object.</b-cap>
</b-chapter>

<b-chapter id="practice" icon="grid" title="Where it shows up">
  <b-why>The direct uses of the result are so far in mathematics itself; the rest are analogies with the same lesson: a fast estimate of complexity can turn out lower than the real one.</b-why>

  <b-art names="relation-gap-how-many-rules/uses"/>
  <b-cap>Direct: computer algebra systems; conditional: topology; by analogy: the cube, data, specifications.</b-cap>

  <b-table>
    <table><thead>
    <tr><th>Link</th><th>Where and what it means</th></tr>
    </thead><tbody>
    <tr><td><b-tag kind="ok">direct</b-tag></td><td><a href="/materials/glossary/computer-algebra-system/">computer algebra systems</a> (GAP, Magma): groups are given by moves and rules, and it is now known that one entry can be enough where there are two relations</td></tr>
    <tr><td><b-tag kind="ok">direct, conditional</b-tag></td><td>topology: the same groups give the shape from <a href="/materials/glossary/wall-d2-problem/">Wall's D2 problem</a>: a complex of six cells (one point, two edges, two flat cells and one solid cell); if the OpenAI result is confirmed, this shape does not reduce to a two-dimensional one</td></tr>
    <tr><td><b-tag kind="plain">analogy</b-tag></td><td>Rubik's cube and puzzles: moves and rules, where one also counts “how many rules are needed” (<a href="/blog/rubik-cube-neural-network/">post on the cube</a>)</td></tr>
    <tr><td><b-tag kind="plain">analogy</b-tag></td><td>data analysis: a fast linear count of “holes” in the shape of data can undercount complexity</td></tr>
    <tr><td><b-tag kind="plain">analogy</b-tag></td><td>software specifications: the shortest set of rules and a fast estimate of the number of rules can differ</td></tr>
    </tbody></table>
  </b-table>
  <b-callout icon="bulb">**Lesson.** A fast linear estimate of complexity can understate it. This is now proved on an example with two moves. <a href="https://youtu.be/yPvbfDa_GCk?t=401" target="_blank" rel="noopener">▶ 6:41</a></b-callout>
</b-chapter>

<b-chapter id="when" icon="shield-check" title="Who and when, what is proved">
  <b-steps top="14" round>
    <step t="1965">Wall raises the question about D2 complexes (<a href="/materials/glossary/wall-d2-problem/">the D2 problem</a>)</step>
    <step t="1973">Newman: a theorem on centralisers in one-relator groups</step>
    <step t="1976">Gruenberg: the relation gap question</step>
    <step t="1979">Problem B15 in Wall's list</step>
    <step t="6.10.2026">OpenAI preprint on a counterexample to Wall's D2 problem</step>
    <step t="16.10.2026" hl>The paper: four authors, Theorem A proved completely</step>
  </b-steps>

  Theorem A: for coprime $p,q\ge 2$ the group $\langle x,t\mid x^{pq},\,[x^{p},\,t\,x^{q}\,t^{-1}]\rangle$ is not a one-relator group, but its relation module is cyclic; hence $d_F(R)=2$ and $d_{\mathbb{Z}G}(R^{ab})=1$. Corollary B relies on the OpenAI result, and the authors themselves call it conditional. The example is minimal: six cells, the fewest a counterexample to Wall's problem can have. <a href="https://youtu.be/yPvbfDa_GCk?t=420" target="_blank" rel="noopener">▶ 7:00</a>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Frequently asked questions">
  <b-faq-cards>
    <q t="What is the relation gap?">The situation where the least number of relations of a group is larger than the least number of generators of its relation module. The question whether this happens was raised in 1976; the 2026 paper shows that it does.</q>
    <q t="What is a relation module?">All consequences of the relations of a group, written so that the order of writing does not matter: loops on the game map that can be added and moved around. In the paper it is $R/[R,R]$ with the group acting by conjugation.</q>
    <q t="How does the player differ from the accountant?">The player counts rules honestly, as routes on the map where the order of moves matters. The accountant counts entries where the order of moves is not remembered. The player gets two, the accountant one.</q>
    <q t="What are the friends of a move?">Moves that can be swapped with the given one. In the paper this is the centraliser of an element. Newman's theorem says that with one rule and a move that returns to the start, the friends commute with each other.</q>
    <q t="Is Wall's D2 problem solved?">Conditionally. The paper builds a D2 complex of six cells, but the conclusion rests on an OpenAI preprint of 6 October 2026, and the authors call Corollary B conditional. Theorem A, on the relation gap, does not depend on that preprint.</q>
    <q t="What role did AI play?">According to the authors, ChatGPT helped to find the groups and the proof and produced a first draft, and Claude was consulted during editing. The authors checked and revised the arguments and the text themselves and are responsible for the result.</q>
    <q t="Can I check it myself?">Yes: the group of Theorem A is defined in GAP with two lines (code above), and the calculation for $p=3$, $q=2$ is school algebra, given in the chapter on three and two.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Further reading">
  <b-links cols="2">
    <item href="https://arxiv.org/abs/2610.23637" k="Paper" t="arXiv 2610.23637" ext>Two-generator presentations with a relation gap</item>
    <item href="https://youtu.be/yPvbfDa_GCk" k="Video" t="Walkthrough on YouTube" ext>The same story in 7.5 minutes, with the game map and formulas</item>
    <item href="/blog/longest-ring-arrangement/" k="The same Cayley graph" t="Ring of balls">A map of moves and the most tangled arrangement</item>
    <item href="/blog/rubik-cube-neural-network/" k="The same Cayley graph" t="Rubik's cube">Moves and rules where brute force is impossible</item>
  </b-links>
</b-chapter>
<b-footer>Facts are from the paper by L. Bartholdi, M. R. Bridson, R. Mikhailov, J. Nicholson, arXiv 2610.23637 (Theorem A, Corollary B, formulas (1)–(4), the section “Declaration of AI usage”). The calculation for p = 3, q = 2 was recomputed by hand while preparing the film; the paper has not been independently verified yet.</b-footer>
</b-post>
