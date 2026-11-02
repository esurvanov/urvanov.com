---
title: How many rules does a game need: the relation gap, a step and a lift
date: 2026-11-02
updated: 2026-11-02
description: How to count the rules of a game honestly and quickly, and whether the two answers can differ. A walkthrough of the paper by Bartholdi, Bridson, Mikhailov and Nicholson on the relation gap (arXiv 2610.23637): a game with two moves where the player needs two rules and the accountant needs one entry, with diagrams and calculations.
tags: research, mathematics, group theory, topology, AI in mathematics
category: research
layout: wide
mentions: relation gap, group presentation, relation module, Cayley graph, Newman's theorem, one-relator group, Wall's D2 problem, D2 complex, homology, GAP, greatest common divisor, Gruenberg
toc: video=Video | question=Question | paper=Paper and authors | rules=Two rules | why=Why this game | player=Player | accountant=Accountant | answer=Answer | friends=Friends | coins=Coins | main=Takeaway | formal=Formally | practice=Where it shows up | when=Who and when | faq=Questions | next=Next
---

<b-post series="kto">
<b-lead tight>A game with two moves, a step and a lift, needs two rules if counted honestly, like a player, and one entry if counted fast, like an accountant who writes rules down as loops and forgets the order of moves. That is how four mathematicians settled the relation gap question in October 2026, open since 1976.</b-lead>

<b-chapter id="video" icon="video" title="Video: the same story in 7.5 minutes">
  <b-why>The article follows the film scene by scene and goes into more detail. Under each diagram there is a link to that moment of the video.</b-why>
  <b-embed-frame src="https://www.youtube.com/embed/yPvbfDa_GCk" title="How many rules does a game need — the paper arXiv 2610.23637 in plain words" ratio="16/9"/>
  <b-cap>Paper: <a href="https://arxiv.org/abs/2610.23637" target="_blank" rel="noopener">Two-generator presentations with a relation gap</a>, arXiv 2610.23637, 16 October 2026. The game, the step, the lift, the player and the accountant are images for the explanation; in the paper they are a group, generators, the least number of relations and the least number of generators of the relation module.</b-cap>
</b-chapter>

<b-chapter id="question" icon="grid" title="Question: how many rules does a game have, and are there two ways to count">
  <b-why>Mathematicians describe puzzles and symmetries as games: there are moves and there are rules. A rule says which chain of moves puts everything back in place.</b-why>

  The question: **how many rules are needed to describe a game completely?** There are two ways to count.

  <b-table>
    <table><thead>
    <tr><th>Count</th><th>How it counts</th><th>In the paper</th></tr>
    </thead><tbody>
    <tr><td><b>Player</b> — honest</td><td>a rule is a route on the game map that returns to the start; the order of moves matters</td><td>the least number of relations d<sub>F</sub>(R)</td></tr>
    <tr><td><b>Accountant</b> — fast</td><td>writes each rule into a ledger as a loop; entries can be added in any order, the order of moves is not remembered</td><td>the least number of generators of the relation module d<sub>ℤG</sub>(R<sup>ab</sup>)</td></tr>
    </tbody></table>
  </b-table>

  The accountant never needs more entries than the player has rules: each rule of the player simply becomes an entry. The question is the reverse: can there be **fewer** entries than rules? For fifty years nobody knew. This question is called the **relation gap**: it came from Karl Gruenberg's 1976 work and entered Wall's 1979 list of problems (problem B15). The case of a single entry is especially interesting: does it follow that the group has just one relation? <a href="https://youtu.be/yPvbfDa_GCk?t=0" target="_blank" rel="noopener">▶ 0:00</a>
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

  The result in one sentence: in a game **with two moves** the player needs two rules, while the accountant needs one entry. The main theorem is proved completely and in an elementary way. The second result, Corollary B, relies on an OpenAI preprint of 6 October 2026 and is conditional; more on it in the chapter on practice. <a href="https://youtu.be/yPvbfDa_GCk?t=26" target="_blank" rel="noopener">▶ 0:26</a>

  The authors state the role of AI openly, in the section “Declaration of AI usage”: ChatGPT (“6 Astra”, as printed) helped to discover the groups of Theorem A, the proof, and an initial draft of the manuscript; Claude (“Fable 5.1”) was consulted during later editing; the arguments and the text were thoroughly checked and substantially revised by the authors, who are responsible for the final manuscript.
</b-chapter>

<b-chapter id="rules" icon="boxes-route" title="The game: a step, a lift and two rules">
  <b-why>The game has a token and a circle of six points. The first move, the **step**, moves the token one point along the circle.</b-why>

  Six steps and the token is back. That is the **first rule**. The game does not stay on one circle: from each point of the circle its own **lift** raises the token to its own circle one floor up, and a lift down brings it back. Circles and lifts make up the **game map**. Mathematicians call such a map the Cayley graph of a group, and the same kind of graph lies under the <a href="/blog/rubik-cube-neural-network/">Rubik's cube</a> and under the <a href="/blog/longest-ring-arrangement/">ring of balls</a>: vertices are positions, edges are moves.

  <b-art names="relation-gap-how-many-rules/map"/>
  <b-cap>Below, the circle of floor 0, numbers are points. The orange arrow is a step, the blue ones are lifts to circles of floor 1. <a href="https://youtu.be/yPvbfDa_GCk?t=48" target="_blank" rel="noopener">▶ 0:48</a> and <a href="https://youtu.be/yPvbfDa_GCk?t=61" target="_blank" rel="noopener">▶ 1:01</a></b-cap>

  The map has a **second rule**. A **half-circle** is three steps in a row. A **hook** is to go up in the lift, take two steps upstairs and come down. The descent leads to a different circle, not the one you started from. The rule says: a half-circle followed by a hook is the same as a hook followed by a half-circle. These two moves can be swapped.

  <b-art names="relation-gap-how-many-rules/swap"/>
  <b-cap>Two paths from the start arrive at the same point. <a href="https://youtu.be/yPvbfDa_GCk?t=76" target="_blank" rel="noopener">▶ 1:16</a></b-cap>
</b-chapter>

<b-chapter id="why" icon="search" title="Why the game is exactly like this">
  <b-why>Every detail is needed for the answer, and none is spare.</b-why>

  <b-table>
    <table><thead>
    <tr><th>Detail</th><th>What it is for</th></tr>
    </thead><tbody>
    <tr><td>six steps bring you back</td><td>the player: the game has a move that returns to the start</td></tr>
    <tr><td>a half-circle and a hook can be swapped</td><td>the player: moves that can be swapped are called friends</td></tr>
    <tr><td>the numbers three and two in the half-circle and the hook</td><td>the accountant: three and two have no common divisor</td></tr>
    </tbody></table>
  </b-table>

  In the paper the number of steps in the half-circle and in the hook is any pair of coprime numbers p and q, both at least two. The film takes the smallest pair: p = 3, q = 2. Then the first rule is x<sup>6</sup> = 1, and the second says that x<sup>3</sup> and the hook t·x<sup>2</sup>·t<sup>−1</sup> commute. <a href="https://youtu.be/yPvbfDa_GCk?t=98" target="_blank" rel="noopener">▶ 1:38</a>
</b-chapter>

<b-chapter id="player" icon="bulb" title="The player's count: two rules, and not fewer">
  <b-why>The player needs a rule as a route on the map, and the order of moves in it matters.</b-why>

  The player throws away spare rules. Twelve steps also return to the start, but that is just the first rule written twice. After crossing out, two rules remain, and the player cannot make the list shorter. <a href="https://youtu.be/yPvbfDa_GCk?t=124" target="_blank" rel="noopener">▶ 2:04</a>
</b-chapter>

<b-chapter id="accountant" icon="bulb" title="The accountant's count: one entry">
  <b-why>The accountant writes each rule into a ledger as a loop: a route that came back to the start.</b-why>

  Entries can be added in any order and moved to other places on the map, because the accountant does not remember the order of moves. So there are never more entries than the player has rules. And fewer? The authors built one clever entry, a mixture of the loops of both rules. From copies of this entry the loop of the second rule comes out at once, and the loop of the first rule in three actions. So one entry is enough for the accountant. <a href="https://youtu.be/yPvbfDa_GCk?t=144" target="_blank" rel="noopener">▶ 2:24</a>

  <b-art names="relation-gap-how-many-rules/counts"/>
  <b-cap>Player: two rules. Accountant: one entry. <a href="https://youtu.be/yPvbfDa_GCk?t=166" target="_blank" rel="noopener">▶ 2:46</a></b-cap>
</b-chapter>

<b-chapter id="answer" icon="flag" title="Answer: yes, the two counts can differ">
  <b-why>The question was: can the accountant's fast count give fewer rules than the player's honest count? It can.</b-why>

  In the game “step and lift” the player needs two rules and the accountant needs one entry. That closes a question fifty years old. <a href="https://youtu.be/yPvbfDa_GCk?t=175" target="_blank" rel="noopener">▶ 2:55</a> Two arguments follow: why one rule is not enough for the player and why one entry is enough for the accountant.
</b-chapter>

<b-chapter id="friends" icon="shield-check" title="Why one rule is not enough for the player: the friends do not commute">
  <b-why>A move is called a friend of a given move if the two can be swapped. The half-circle has two friends.</b-why>

  They are two steps along the same circle and the hook. Between themselves they are not friends: the order of these two moves cannot be changed. In 1973 Newman proved a theorem: if a game has **one** rule and some move returns to the start, like a step after six repeats, then the friends of any move are friends with each other. The paper states it more strictly: every nonidentity element of a one-relator group with torsion has a cyclic centraliser. In this game the friends of the half-circle are not friends with each other, so one rule cannot describe it.

  <b-art names="relation-gap-how-many-rules/friends"/>
  <b-cap>The friends of the half-circle commute with it, but not with each other. <a href="https://youtu.be/yPvbfDa_GCk?t=175" target="_blank" rel="noopener">▶ 2:55</a></b-cap>

  How the paper checks it: the half-circle is collapsed to a point, and what remains of the game is the free product of a cyclic group of three elements and an infinite cyclic group (C<sub>3</sub> ∗ ℤ). By the normal form of a free product, x<sup>2</sup> and the hook cannot be swapped there.
</b-chapter>

<b-chapter id="coins" icon="shield-check" title="Why one entry is enough for the accountant: three and two">
  <b-why>The greatest common divisor of three and two is one, and that lets two entries be merged into one.</b-why>

  One can be obtained from three and two: three minus two. Like coins of 3 and 2 roubles: you hand over 3, get 2 back as change, and 1 rouble is left. By the same principle the authors merge two entries into one from which both can be recovered. <a href="https://youtu.be/yPvbfDa_GCk?t=201" target="_blank" rel="noopener">▶ 3:21</a>

  <b-art names="relation-gap-how-many-rules/coins"/>
  <b-cap>1 = 3 − 2: that is why two entries merge into one. <a href="https://youtu.be/yPvbfDa_GCk?t=207" target="_blank" rel="noopener">▶ 3:27</a></b-cap>

  The calculation for p = 3, q = 2 is school algebra. Let a = x<sup>3</sup>, b = t·x<sup>2</sup>·t<sup>−1</sup>, N<sub>a</sub> = 1 + a, N<sub>b</sub> = 1 + b + b<sup>2</sup>, N<sub>x</sub> = 1 + x + … + x<sup>5</sup>. In the paper, formulas (3) and (4):

  <b-table>
    <table><thead>
    <tr><th>Step</th><th>Equality</th></tr>
    </thead><tbody>
    <tr><td>properties of the sums</td><td>N<sub>a</sub>·N<sub>x</sub> = 2·N<sub>x</sub>, N<sub>a</sub>·u = (1 − b)·N<sub>x</sub>, N<sub>b</sub>·u = (a − 1)·t·N<sub>x</sub></td></tr>
    <tr><td>the generator</td><td>v = N<sub>x</sub> + (b + b<sup>2</sup>)·u</td></tr>
    <tr><td>multiplying by v</td><td>N<sub>a</sub>·v = (1 + b)·N<sub>x</sub>, N<sub>b</sub>·v = N<sub>b</sub>·N<sub>x</sub> + 2(a − 1)·t·N<sub>x</sub></td></tr>
    <tr><td>after simplifying (b³ = 1)</td><td>(1 − b + b<sup>2</sup>)·N<sub>a</sub>·v = 2·N<sub>x</sub>, (N<sub>b</sub> − b·N<sub>a</sub>)·v = N<sub>x</sub> + 2(a − 1)·t·N<sub>x</sub></td></tr>
    <tr><td>result</td><td>N<sub>x</sub> = (N<sub>b</sub> − b·N<sub>a</sub> − (a − 1)·t·(1 − b + b<sup>2</sup>)·N<sub>a</sub>)·v</td></tr>
    </tbody></table>
  </b-table>

  So N<sub>x</sub> is expressed through v, and the whole relation module is generated by the single element v. These equalities were checked by hand while preparing the film.
</b-chapter>

<b-chapter id="main" icon="flag" title="Takeaway">
  <b-why>The question was: can the accountant's fast count give fewer rules than the player's honest count? It can, and the example is a game with two moves.</b-why>

  <b-step-chain>
    <node t="Game">two moves: a step and a lift; two rules</node>
    <node t="Player">the friends of the half-circle do not commute: one rule is not enough</node>
    <node t="Accountant">3 and 2 are coprime: one entry</node>
    <node t="Gap">two against one: the question of 1976 is settled</node>
  </b-step-chain>

  <b-callout icon="shield-check">**A caveat.** Theorem A is proved completely and independently of OpenAI. Corollary B, a counterexample to Wall's D2 problem, relies on an OpenAI preprint of 6 October 2026, and the authors themselves call it conditional. The paper has not been independently verified yet.</b-callout>
</b-chapter>

<b-chapter id="formal" icon="boxes-route" title="Formally: the same path in the language of the paper">
  <b-why>The second part of the film: the same steps with formulas and the mathematicians' vocabulary.</b-why>

  <b-table>
    <table><thead>
    <tr><th>In the film</th><th>In the paper</th><th>How it works</th></tr>
    </thead><tbody>
    <tr><td>the game</td><td>the group G = F/R</td><td>F is the free group on the letters x, t; R is the normal closure of the relations</td></tr>
    <tr><td>step, lift</td><td>generators x, t</td><td>step = x, lift = t, lift down = t<sup>−1</sup>; a chain of moves is written as a word</td></tr>
    <tr><td>first rule</td><td>x<sup>pq</sup> = 1</td><td>for p = 3, q = 2: x<sup>6</sup> = 1, like six turns of 60°</td></tr>
    <tr><td>second rule</td><td>[x<sup>p</sup>, t·x<sup>q</sup>·t<sup>−1</sup>] = 1</td><td>[u, v] = uvu<sup>−1</sup>v<sup>−1</sup>: right-then-up equals up-then-right</td></tr>
    <tr><td>the whole game</td><td>G = ⟨x, t | x<sup>pq</sup>, [x<sup>p</sup>, t·x<sup>q</sup>·t<sup>−1</sup>]⟩</td><td>Theorem A: p, q ≥ 2 coprime</td></tr>
    <tr><td>the player's count</td><td>d<sub>F</sub>(R)</td><td>the least number of normal generators of R; here 2</td></tr>
    <tr><td>the accountant's count</td><td>d<sub>ℤG</sub>(R<sup>ab</sup>)</td><td>the least number of generators of the relation module R/[R, R]; here 1</td></tr>
    <tr><td>loop — entry</td><td>first homology of the Cayley graph</td><td>the relation module is the image of the boundary map ∂<sub>2</sub>, given by the Fox matrix</td></tr>
    <tr><td>friends</td><td>centraliser</td><td>Newman's theorem: in a one-relator group with torsion centralisers are cyclic</td></tr>
    <tr><td>numbers 3 and 2</td><td>p and q coprime</td><td>gcd(3, 2) = 1 = 3 − 2</td></tr>
    </tbody></table>
  </b-table>

  The group acts on the relation module by conjugation, so the accountant's entries can be moved around the map: multiplying by group elements is the move. The code that defines the group in the computer algebra system GAP: <a href="https://youtu.be/yPvbfDa_GCk?t=389" target="_blank" rel="noopener">▶ 6:29</a>

  <b-codebox copy>
    F := FreeGroup("x", "t");;  x := F.1;;  t := F.2;;
    G := F / [ x^6, Comm(x^3, t*x^2*t^-1) ];;
  </b-codebox>
  <b-cap>Three lines: the free group on x and t divided by two relations. After that the group can be worked with as an ordinary object.</b-cap>
</b-chapter>

<b-chapter id="practice" icon="grid" title="Where it shows up">
  <b-why>The direct uses of the result are so far in mathematics itself; the rest are analogies with the same lesson.</b-why>
  <b-table>
    <table><thead>
    <tr><th>Link</th><th>Where</th></tr>
    </thead><tbody>
    <tr><td><b-tag kind="ok">direct</b-tag></td><td>computer algebra (GAP, Magma): groups are given by moves and rules, and it is now known that one entry can be enough where there are two relations</td></tr>
    <tr><td><b-tag kind="ok">direct, conditional</b-tag></td><td>topology: the same groups give the shape from Wall's D2 problem (a D2 complex of six cells: one point, two edges, two flat cells and one solid cell); if the OpenAI result is confirmed, this shape does not reduce to a two-dimensional one</td></tr>
    <tr><td><b-tag kind="plain">analogy</b-tag></td><td>Rubik's cube and puzzles: moves and rules, where one also counts “how many rules are needed”</td></tr>
    <tr><td><b-tag kind="plain">analogy</b-tag></td><td>data analysis: a fast linear count of “holes” in the shape of data can undercount complexity</td></tr>
    <tr><td><b-tag kind="plain">analogy</b-tag></td><td>software specifications: the shortest set of rules and a fast estimate of the number of rules can differ</td></tr>
    </tbody></table>
  </b-table>
  <b-callout icon="bulb">**Lesson.** A fast linear estimate of complexity can understate it. This is now proved on an example with two moves. <a href="https://youtu.be/yPvbfDa_GCk?t=401" target="_blank" rel="noopener">▶ 6:41</a></b-callout>
</b-chapter>

<b-chapter id="when" icon="shield-check" title="Who and when, what is proved">
  <b-steps top="14" round>
    <step t="1965">Wall raises the question about D2 complexes (the D2 problem)</step>
    <step t="1973">Newman: a theorem on centralisers in one-relator groups</step>
    <step t="1976">Gruenberg: the relation gap question</step>
    <step t="1979">Problem B15 in Wall's list</step>
    <step t="6.10.2026">OpenAI preprint on a counterexample to Wall's D2 problem</step>
    <step t="16.10.2026" hl>The paper: four authors, Theorem A proved completely</step>
  </b-steps>

  Theorem A: for coprime p, q ≥ 2 the group ⟨x, t | x<sup>pq</sup>, [x<sup>p</sup>, t·x<sup>q</sup>·t<sup>−1</sup>]⟩ is not a one-relator group, but its relation module is cyclic; hence d<sub>F</sub>(R) = 2 and d<sub>ℤG</sub>(R<sup>ab</sup>) = 1. Corollary B relies on the OpenAI result, and the authors themselves call it conditional. The example is minimal: six cells, the fewest a counterexample to Wall's problem can have. <a href="https://youtu.be/yPvbfDa_GCk?t=420" target="_blank" rel="noopener">▶ 7:00</a>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Frequently asked questions">
  <b-faq-cards>
    <q t="What is the relation gap?">The situation where the least number of relations of a group is larger than the least number of generators of its relation module. The question whether this happens was raised in 1976; the 2026 paper shows that it does.</q>
    <q t="What is a relation module?">All consequences of the relations of a group, written so that the order of writing does not matter: loops on the game map that can be added and moved around. In the paper it is R/[R, R] with the group acting by conjugation.</q>
    <q t="How does the player differ from the accountant?">The player counts rules honestly, as routes on the map where the order of moves matters. The accountant counts entries where the order of moves is not remembered. The player gets two, the accountant one.</q>
    <q t="Is Wall's D2 problem solved?">Conditionally. The paper builds a D2 complex of six cells, but the conclusion rests on an OpenAI preprint of 6 October 2026, and the authors call Corollary B conditional. Theorem A, on the relation gap, does not depend on that preprint.</q>
    <q t="What role did AI play?">According to the authors, ChatGPT helped to find the groups and the proof and produced a first draft, and Claude was consulted during editing. The authors checked and revised the arguments and the text themselves and are responsible for the result.</q>
    <q t="Can I check it myself?">Yes: the group of Theorem A is defined in GAP with three lines (code above), and the calculation for p = 3, q = 2 is school algebra, given in the chapter on three and two.</q>
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
