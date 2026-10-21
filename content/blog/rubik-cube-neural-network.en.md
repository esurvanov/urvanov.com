---
title: AI Rubik's Cube solver beats 1,000+ teams on 4×4×4 and 5×5×5: how the neural network works
date: 2026-10-22
description: The CayleyPy solver learns to estimate distance to the solved cube from random scrambles, searches with a beam of up to 16 million positions and keeps the shortest answer of several networks. A scene-by-scene walkthrough with diagrams: results, what worked, and what is still unproven (arXiv 2502.13266).
tags: AI, research, neural networks, Rubik's Cube, Rubik's Cube solver, pathfinding
category: research
layout: wide
mentions: AI Rubik's Cube solver, 5x5 cube solver, Rubik's Cube combinations, CayleyPy, beam search, ResMLP, diffusion distance, Kaggle Santa 2023, DeepCubeA, EfficientCube, Cayley graph
toc: video=Video | question=Question | count=How many combinations | paper=Paper | maze=Maze | walk=Walk | compass=Compass | front=Front | squad=Squad | results=Results | width=Front width | team=Why a squad | surprise=Surprises | main=Takeaway | formal=Formally | practice=Where it helps | when=Who and when | next=Further
---

<b-post series="kto">
<b-lead tight>The AI Rubik's Cube solver works in three steps: a neural network learns from random scrambles how many moves are left, a beam search follows its estimate through millions of positions at once, and several independent networks run in parallel, keeping the shortest solution. This beat the best of 1,000+ teams on 4×4×4 and 5×5×5 cubes.</b-lead>

<b-chapter id="video" icon="video" title="Video: the same story in 12 minutes">
  <b-why>This post follows the video scene by scene. Under the diagrams is a link to that moment of the video, which is narrated in Russian.</b-why>
  <b-embed-frame src="https://www.youtube.com/embed/bg7tVawVWMc" title="How to solve a Rubik's Cube in the fewest moves — the arXiv 2502.13266 paper in plain words" ratio="16/9"/>
  <b-cap>Paper: <a href="https://arxiv.org/abs/2502.13266" target="_blank" rel="noopener">A Machine Learning Approach That Beats Large Rubik's Cubes</a>, arXiv 2502.13266, February 2025. Maze, compass, front and squad are the video's images; in the paper they are the Cayley graph, the neural network, beam search and the ensemble of agents.</b-cap>
</b-chapter>

<b-chapter id="question" icon="cube" title="The question: solving a cube is easy, solving it in the fewest moves is hard">
  <b-why>Anyone can learn to solve a Rubik's Cube in an evening from a guide. But a guide gives a long solution; the shortest one is a different problem.</b-why>

  Two words we will need. A **move** is a quarter turn of one face. A **position** is how the faces are colored right now. A face turn takes the cube from one position to another, and the paper's question is: how to get from a given position to the solved one in the fewest moves.

  <b-art names="rubik-cube-neural-network/turn"/>
  <b-cap>A move is one face turn. <a href="https://youtu.be/bg7tVawVWMc?t=12" target="_blank" rel="noopener">▶ 0:12</a></b-cap>
</b-chapter>

<b-chapter id="count" icon="grid" title="How many combinations does a Rubik's Cube have">
  <b-why>A regular 3×3×3 Rubik's Cube has 43,252,003,274,489,856,000 combinations — about 43 quintillion, too many to check one by one. That is why solving it in the fewest moves is hard.</b-why>

  The number comes from the pieces. A regular cube has 8 corner pieces and 12 edge pieces. Corners can be permuted in 8! ways and twisted in 3⁷ ways — 88 million options. Edges can be permuted in 12! ways and flipped in 2¹¹ ways — about 981 billion. Half of the combinations can't be reached on a real cube, so the product is divided by two.

  <b-art names="rubik-cube-neural-network/pieces"/>
  <b-cap>8 corners and 12 edges: permute, twist, flip — that is where the positions come from. <a href="https://youtu.be/bg7tVawVWMc?t=34" target="_blank" rel="noopener">▶ 0:34</a></b-cap>

  Checking a billion positions per second, a full search of a regular cube would take about 1,370 years: start in 2025, finish in 3395.

  <b-art names="rubik-cube-neural-network/years"/>
  <b-cap>Full search at a billion positions per second. <a href="https://youtu.be/bg7tVawVWMc?t=41" target="_blank" rel="noopener">▶ 0:41</a></b-cap>

  Bigger cubes have more pieces, and the number grows even faster. A 5×5×5 cube has more positions than there are atoms on Earth.

  <b-table>
    <table><thead>
    <tr><th>Cube</th><th class="bk-table-r">Positions</th><th>What is known about shortest paths</th></tr>
    </thead><tbody>
    <tr><td>3×3×3</td><td class="bk-table-r">4.3·10¹⁹</td><td>any position can be solved in 26 quarter turns — proven in 2014</td></tr>
    <tr><td>4×4×4</td><td class="bk-table-r">7.4·10⁴⁵</td><td>a conjecture of 48 moves, not proven</td></tr>
    <tr><td>5×5×5</td><td class="bk-table-r">1.2·10⁷⁴</td><td>unknown</td></tr>
    </tbody></table>
  </b-table>
  <b-art names="rubik-cube-neural-network/sizes"/>
  <b-cap>Bar length is the number of digits. A 5×5×5 has more positions than there are atoms on Earth. <a href="https://youtu.be/bg7tVawVWMc?t=51" target="_blank" rel="noopener">▶ 0:51</a></b-cap>
  <b-finding>
    <ex>For 4×4×4 and 5×5×5 cubes a full search is impossible, and shortest paths are unknown.</ex>
    <gen>When the state space is huge, shortest paths are searched without enumeration: with a distance estimate and a smart search. Quality is checked on tasks with a known or best-known answer.</gen>
    <do>Before judging that “AI solved the problem”, find out what it is compared with: a proven optimum or the best known solution.</do>
  </b-finding>
</b-chapter>

<b-chapter id="paper" icon="trophy" title="The paper and the competition">
  <b-why>In 2023, more than a thousand teams of programmers competed on Kaggle (Santa 2023) to solve big cubes in fewer moves.</b-why>

  In February 2025, twelve authors from Moscow, Paris and Munich led by Alexander Chervov and Kirill Khoruzhii posted the paper “A Machine Learning Approach That Beats Large Rubik's Cubes”. Their program beat the competition's best answers on 4×4×4 and 5×5×5 cubes and became the first neural network to solve cubes bigger than the regular one.

  <b-art names="rubik-cube-neural-network/race"/>
  <b-cap>1,000+ competition teams and the authors' program. <a href="https://youtu.be/bg7tVawVWMc?t=77" target="_blank" rel="noopener">▶ 1:17</a></b-cap>
</b-chapter>

<b-chapter id="maze" icon="boxes-route" title="The cube as a maze of positions">
  <b-why>The central picture: each position is a room, each move is a door to a neighboring room, the solved cube is the exit.</b-why>

  **A room is one coloring of the cube.** Turn a face and you are in the neighboring room. Every room of a regular cube has 12 doors: 6 faces, each turned one way or the other.

  <b-art names="rubik-cube-neural-network/rooms"/>
  <b-cap>A face turn is a step through a door into the next room. <a href="https://youtu.be/bg7tVawVWMc?t=95" target="_blank" rel="noopener">▶ 1:35</a></b-cap>
  <b-art names="rubik-cube-neural-network/doors"/>
  <b-cap>12 neighbors: one per face and turn direction. <a href="https://youtu.be/bg7tVawVWMc?t=105" target="_blank" rel="noopener">▶ 1:45</a></b-cap>

  All rooms together form the maze — in mathematics, the Cayley graph of the cube group. The room where the cube is solved is the exit. In the video, rooms are placed higher the farther they are from the exit: that gives a relief, and from above, a map. The drawn maze is a sketch: the real one has 4.3·10¹⁹ rooms with 12 doors each.

  <b-art names="rubik-cube-neural-network/relief"/>
  <b-cap>Relief: a room's height is its distance to the exit. <a href="https://youtu.be/bg7tVawVWMc?t=119" target="_blank" rel="noopener">▶ 1:59</a></b-cap>

  Solving the cube in the fewest moves means finding the shortest path from a given room to the exit.

  <b-art names="rubik-cube-neural-network/map"/>
  <b-cap>The shortest path on the sketch — 7 moves. <a href="https://youtu.be/bg7tVawVWMc?t=132" target="_blank" rel="noopener">▶ 2:12</a></b-cap>
  <b-steps top="14" round>
    <step t="Room">One coloring of the cube</step>
    <step t="Door">One face turn; every room of a regular cube has 12</step>
    <step t="Exit">The solved cube; the task is to reach it through the fewest doors</step>
  </b-steps>
</b-chapter>

<b-chapter id="walk" icon="flag" title="A walk from the exit">
  <b-why>Nobody has a map of the maze: there are too many rooms. So the authors work backwards.</b-why>

  They stand at the exit and make random moves — a walk, which is just scrambling the solved cube. After each move they record the position and how many moves have been made. The computer generates such “position → number of moves” pairs by the billion right during training: a walk costs almost nothing.

  <b-art names="rubik-cube-neural-network/walks"/>
  <b-cap>Walks from the exit; each record is a position and the number of moves made. <a href="https://youtu.be/bg7tVawVWMc?t=164" target="_blank" rel="noopener">▶ 2:44</a></b-cap>
  <b-kv-rows>
    <row k="Walk">random moves from the solved cube, never stepping straight back</row>
    <row k="Length">up to 26 moves for 3×3×3, 45 for 4×4×4, 65 for 5×5×5</row>
    <row k="Record">position → moves made so far</row>
  </b-kv-rows>
</b-chapter>

<b-chapter id="compass" icon="search" title="The compass: a network that guesses the distance to the exit">
  <b-why>The compass learns from the walks: it looks at a position and guesses how many moves are left to the exit.</b-why>

  The compass is wrong, and wrong on the high side: a walk loops around, so it takes more moves than the shortest path. On the sketch a walk reaches a room in 8 moves while the room is really 2 moves away. But the farther a walk went, the farther the room is from the exit on average, so the compass points the right way. The authors call the average number of walk moves to a position the diffusion distance.

  <b-art names="rubik-cube-neural-network/loop"/>
  <b-cap>Why the compass overestimates: the walk took 8 moves, the real distance is 2. <a href="https://youtu.be/bg7tVawVWMc?t=186" target="_blank" rel="noopener">▶ 3:06</a></b-cap>
  <b-io justify>
    <item k="Input">The cube position: a list of numbers saying where each of the 54 stickers is now</item>
    <item k="Network">10 layers, 4 million parameters; trained on 8 billion positions from walks</item>
    <item k="Output">An estimate of how many moves remain to the solved cube</item>
  </b-io>

  The compass is the first part of the authors' program. Below we call the whole program the **solver**: compass, front and squad.
</b-chapter>

<b-chapter id="front" icon="flag-alt" title="The front: why one path is not enough">
  <b-why>Walking a single path wherever the compass points, one compass mistake leads into a dead end.</b-why>

  <b-art names="rubik-cube-neural-network/deadend"/>
  <b-cap>One path by the compass — a dead end. <a href="https://youtu.be/bg7tVawVWMc?t=217" target="_blank" rel="noopener">▶ 3:37</a></b-cap>

  So the solver moves as a front — beam search in the paper. From every room of the front it opens all doors, the compass rates the new neighbors, and only the most promising go on to the next step. How many rooms to keep is the width of the front; the authors go up to 2²⁴ ≈ 16 million. A compass mistake in one room is corrected by the other rooms of the front.

  <b-art names="rubik-cube-neural-network/front"/>
  <b-cap>A front of width 3 finds a path where the single path got stuck. <a href="https://youtu.be/bg7tVawVWMc?t=249" target="_blank" rel="noopener">▶ 4:09</a></b-cap>
  <b-numchain>
    <step>open all doors from the front's rooms</step>
    <step>rate the neighbors with the compass</step>
    <step>keep the most promising</step>
  </b-numchain>
</b-chapter>

<b-chapter id="squad" icon="users-alt" title="The squad: several compasses and the shortest answer">
  <b-why>Each compass learns from its own random walks, so two compasses make different mistakes.</b-why>

  The authors assemble a squad: several independent networks, each with its own front. Each searches for a path on its own, and the shortest one found becomes the answer.

  <b-art names="rubik-cube-neural-network/squad"/>
  <b-cap>Three compasses — 11, 9 and 7 moves; the answer is 7. Numbers are from the sketch, not the paper. <a href="https://youtu.be/bg7tVawVWMc?t=276" target="_blank" rel="noopener">▶ 4:36</a></b-cap>
</b-chapter>

<b-chapter id="results" icon="trophy" title="Results">
  <b-why>Three cubes, three stories.</b-why>

  **Regular cube.** The solver finds the shortest possible path in 98 cases out of 100. The previous best networks managed 60 and 70.

  <b-dot-grid n="100" on="0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97"></b-dot-grid>
  <b-cap>98 of 100 tasks — shortest path (precisely, 98.4% on 1,000 positions from the DeepCubeA work).</b-cap>

  **4×4×4 cube.** The solver's path is on average 7 moves shorter than the best competition teams: 46.5 versus 53.5.

  <b-share-bar kind="wide" label="4×4×4 cube: average solution length">
    <seg w="46.51" color="accent" ink="#fff">solver · 46.5</seg>
    <seg w="6.98" color="d-none">+7</seg>
  </b-share-bar>

  **5×5×5 cube.** The solver is shorter than the best teams on every one of the 19 competition tasks: 92.2 moves versus 96.6 on average.

  <b-art names="rubik-cube-neural-network/checks"/>
  <b-cap>19 out of 19. <a href="https://youtu.be/bg7tVawVWMc?t=302" target="_blank" rel="noopener">▶ 5:02</a></b-cap>
  <b-table>
    <table><thead>
    <tr><th>Cube</th><th>Task set</th><th>Best before the paper</th><th>CayleyPy</th></tr>
    </thead><tbody>
    <tr><td>3×3×3</td><td>1,000 positions from the DeepCubeA work</td><td>60.3% and 69.6% shortest paths (DeepCubeA, EfficientCube)</td><td><b>98.4%</b>, 26 compasses</td></tr>
    <tr><td>4×4×4</td><td>43 positions, Kaggle Santa 2023</td><td>53.49 moves on average</td><td><b>46.51</b> moves, 29 compasses</td></tr>
    <tr><td>5×5×5</td><td>19 positions, Kaggle Santa 2023</td><td>96.58 moves</td><td><b>92.16</b> moves, 69 compasses</td></tr>
    </tbody></table>
  </b-table>
  <b-cap>Table I of the paper.</b-cap>
</b-chapter>

<b-chapter id="width" icon="bulb" title="Why: the width of the front">
  <b-why>A compass mistake in one room is corrected by the other rooms of the front, so the wider the front, the shorter the path found.</b-why>

  On the sketch, the same compass hits a dead end at width 1, finds a 9-move path at width 2 and the shortest, 7 moves, at width 3. The paths are computed by a real beam search with a compass that is off by −1…+2 moves. In the paper, on the 4×4×4 cube, a front 256 times wider cut the path from 60 moves to 50.

  <b-art names="rubik-cube-neural-network/width"/>
  <b-cap>Same compass, different front width; rooms the front visited are highlighted. <a href="https://youtu.be/bg7tVawVWMc?t=331" target="_blank" rel="noopener">▶ 5:31</a></b-cap>
  <b-count-bars>
    <bar k="65 K" w="100%" color="c-none">60.2</bar>
    <bar k="262 K" w="94%" color="c-none">56.7</bar>
    <bar k="1 M" w="92%" color="c-none">55.3</bar>
    <bar k="4 M" w="88%" color="c-none">52.8</bar>
    <bar k="16 M" w="84%" color="accent">50.6</bar>
  </b-count-bars>
  <b-cap>Front width and average path on the 4×4×4 cube, moves. Table III of the paper.</b-cap>
  <b-finding>
    <ex>Each doubling of the width cuts roughly the same number of moves from the path.</ex>
    <gen>Of all settings, the front width affects the result the most — more than network size or the amount of data.</gen>
    <do>When the distance estimate is imprecise, invest in search width rather than in a perfect estimate.</do>
  </b-finding>
</b-chapter>

<b-chapter id="team" icon="users" title="Why: the squad">
  <b-why>For the 5×5×5 cube the authors trained 69 compasses. On each task the one with the shorter path wins, and in the end 10 of them were needed.</b-why>

  Even weak compasses turned out useful: each won one or two hard tasks. Together the squad finds paths up to 8 moves shorter than the best compass alone. And the very first 4×4×4 compass beat all the best competition answers by itself — and still didn't make the final set: the others together were shorter.

  <b-dot-grid n="69" on="3,11,17,24,30,38,45,52,60,66"></b-dot-grid>
  <b-finding>
    <ex>An ensemble of 10 different compasses is up to 8 moves shorter than the best of them.</ex>
    <gen>When an answer is easy to check, several independently trained models with best-answer selection give more than polishing one model.</gen>
    <do>If checking an answer is cheap, run several different models and take the best result.</do>
  </b-finding>
</b-chapter>

<b-chapter id="surprise" icon="bulb" title="Surprises">
  <b-why>Three observations the authors call unexpected.</b-why>

  <b-art names="rubik-cube-neural-network/surprises"/>
  <b-cap>Data, network size, training time. <a href="https://youtu.be/bg7tVawVWMc?t=397" target="_blank" rel="noopener">▶ 6:37</a></b-cap>
  <b-steps top="14" round>
    <step t="More data is not better">Beyond 8 billion positions the compass barely improves: 4, 8 and 16 billion give an average path of 55.4, 55.1 and 55.8 moves on the 4×4×4 cube</step>
    <step t="A small compass is more accurate">4 million parameters versus 14.7 million in previous networks — almost four times smaller and still more accurate; even a single-layer network reaches 90.4% shortest paths</step>
    <step t="Faster">Training takes 4 h 40 min instead of 86 h 25 min; solving a cube on the same machine with the same front width takes 10.9 s versus 287.8 s, about 26 times faster</step>
  </b-steps>
</b-chapter>

<b-chapter id="main" icon="flag" title="The takeaway">
  <b-why>The question was: can you find a short solution for a huge cube without checking every position? You can.</b-why>

  Three parts are enough: a compass learns from random walks away from the exit, a wide front forgives its mistakes, and a squad of different compasses picks the shortest path. The solver knows nothing about the cube itself — only rooms and doors — so it fits other mazes too.

  <b-step-chain>
    <node t="Walks">cheap data, no map</node>
    <node t="Compass">moves-to-exit estimate</node>
    <node t="Front">forgives compass errors</node>
    <node t="Squad">shortest of the answers</node>
  </b-step-chain>
  <b-callout icon="shield-check">**Caveat.** Shortest paths for big cubes are unknown, so the solver is compared with the best known solutions, not with the optimum.</b-callout>
</b-chapter>

<b-chapter id="formal" icon="boxes-route" title="Formally: the same path in the paper's language">
  <b-why>The second part of the video: the same steps as formulas.</b-why>

  <b-table>
    <table><thead>
    <tr><th>In the video</th><th>In the paper</th><th>How it works</th></tr>
    </thead><tbody>
    <tr><td>maze</td><td>Cayley (Schreier) graph of the cube group</td><td>vertices are positions, edges are moves</td></tr>
    <tr><td>position</td><td>permutation</td><td>(p(0), …, p(53)): where each of the 54 stickers went; a move shifts 20 stickers</td></tr>
    <tr><td>walk</td><td>pairs (position, k)</td><td>the average k is the diffusion distance; it exceeds the shortest one</td></tr>
    <tr><td>compass</td><td>ResMLP neural network</td><td>10 layers, 4 M parameters, minimizes (estimate − k)²; 1 M fresh positions before each training round</td></tr>
    <tr><td>front</td><td>beam search</td><td>neighbors → dedupe → estimate → W best; W up to 2²⁴, at most 200 steps</td></tr>
    <tr><td>squad</td><td>agents</td><td>answer length = min(L₁, …, L_A) over agents</td></tr>
    </tbody></table>
  </b-table>
  <b-art names="rubik-cube-neural-network/perm"/>
  <b-cap>A position is a permutation: like a shuffled deck — same cards, different order. 9 of the 54 stickers shown. <a href="https://youtu.be/bg7tVawVWMc?t=495" target="_blank" rel="noopener">▶ 8:15</a></b-cap>
  <b-art names="rubik-cube-neural-network/beam"/>
  <b-cap>One beam search step: like a tournament round, the best go through. <a href="https://youtu.be/bg7tVawVWMc?t=579" target="_blank" rel="noopener">▶ 9:39</a></b-cap>

  Beam search in a few lines; the authors published full PyTorch code with the paper.

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

<b-chapter id="practice" icon="grid" title="Where it helps">
  <b-table>
    <table><thead>
    <tr><th>Link</th><th>Where</th></tr>
    </thead><tbody>
    <tr><td><b-tag kind="ok">direct</b-tag></td><td>puzzles: cubes, the Kaggle Santa competition</td></tr>
    <tr><td><b-tag kind="ok">direct</b-tag></td><td>paths in huge permutation graphs where enumeration is impossible</td></tr>
    <tr><td><b-tag kind="plain">authors' plans</b-tag></td><td>problems from biology and programming</td></tr>
    <tr><td><b-tag kind="plain">analogy</b-tag></td><td>planning: a robot or a game that must get from one state to another</td></tr>
    </tbody></table>
  </b-table>
  <b-callout icon="bulb">**Lesson.** With no map, train a compass on random walks and move as a wide front.</b-callout>
</b-chapter>

<b-chapter id="when" icon="shield-check" title="Who and when, what is proven">
  <b-steps top="14" round>
    <step t="1974">Ernő Rubik invents the cube</step>
    <step t="2014">Proven: any 3×3×3 position can be solved in 26 quarter turns</step>
    <step t="2019">The DeepCubeA network from the University of California solves the regular cube for the first time</step>
    <step t="2023">Kaggle Santa competition: 1,000+ teams solve big cubes</step>
    <step t="2025" hl>The CayleyPy paper: the first neural network to beat everyone on 4×4×4 and 5×5×5</step>
  </b-steps>

  This is an experiment, not a proof: the numbers are measured on task sets from earlier work and from the competition, and shortest paths for big cubes are unknown. The average path of 46.5 moves on the 4×4×4 cube is below the conjectured limit of 48 moves, but the conjecture itself is not proven. Several numbers in the paper disagree: the share of shortest paths on a regular cube is given as both 98.4% and 97.6%, and the number of networks in the 4×4×4 squad below 48 moves as both 29 and 6.
</b-chapter>

<b-chapter id="next" title="Further">
  <b-links cols="3">
    <item href="https://arxiv.org/abs/2502.13266" k="Paper" t="arXiv 2502.13266" ext>A Machine Learning Approach That Beats Large Rubik's Cubes</item>
    <item href="https://github.com/cayleypy/cayleypy" k="Code" t="CayleyPy on GitHub" ext>A library for pathfinding in permutation graphs</item>
    <item href="https://youtu.be/bg7tVawVWMc" k="Video" t="Walkthrough on YouTube" ext>The same story in 12 minutes, with 3D and formulas (in Russian)</item>
  </b-links>
</b-chapter>
<b-footer>Numbers are from the paper by A. Chervov, K. Khoruzhii et al., arXiv 2502.13266 (tables I–III, figures 2–3). The drawn maze and its numbers are a sketch; its paths are computed by beam search. The author of this blog is one of the paper's co-authors.</b-footer>
</b-post>
