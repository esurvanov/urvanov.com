---
title: Which arrangement of balls on a ring takes longest to untangle: AI, brute force and the number-of-pairs conjecture
date: 2026-10-22
description: A ring of numbered balls, three moves and an open question: how many moves the most tangled arrangement needs. How a neural network with beam search, brute force, a competition and proofs converged on “the number of pairs of balls” — the CayleyPy RL paper (arXiv 2502.18663) scene by scene.
tags: AI, research, neural networks, mathematics, Cayley graphs, pathfinding
category: research
layout: wide
mentions: Cayley graph, graph diameter, symmetric group, LRX, OEIS A186783, CayleyPy, beam search, Bellman equation, GAP, Kaggle, TopSpin puzzle
toc: video=Video | question=Question | tower=Tower | mirror=Mirror | pairs=Pairs | gap=Twenty balls | compass=Compass | front=Front | hint=Hint | contest=Competition | triples=Triples | fork=Fork | main=Takeaway | formal=Formally | practice=Where it helps | when=Who and when | next=Further
---

<b-post series="kto">
<b-lead tight>The arrangement that takes longest to untangle is most likely the “mirror” — the ring reflected through the swap window — and it needs as many moves as there are pairs of balls: n(n−1)/2. Brute force up to 15 balls, a neural network with beam search up to 100 and an open competition up to 200 balls all agree, and proofs squeeze the answer into a narrow fork.</b-lead>

<b-chapter id="video" icon="video" title="Video: the same story in 11 minutes">
  <b-why>The article follows the video scene by scene. Each diagram links to its moment in the video.</b-why>
  <b-embed-frame src="https://www.youtube.com/embed/ecc2GvvZGvM" title="Which arrangement of balls takes longest to untangle — arXiv 2502.18663 explained simply (in Russian)" ratio="16/9"/>
  <b-cap>Paper: <a href="https://arxiv.org/abs/2502.18663" target="_blank" rel="noopener">CayleyPy RL: Pathfinding and Reinforcement Learning on Cayley Graphs</a>, arXiv 2502.18663, February 2025; Advances in Theoretical and Mathematical Physics, 2026. The same team as in the <a href="/blog/rubik-cube-neural-network/">Rubik's Cube walkthrough</a>. The video is in Russian.</b-cap>
</b-chapter>

<b-chapter id="question" icon="grid" title="Question: a ring, three moves and the most tangled arrangement">
  <b-why>Take a ring of balls, each with a number. However you shuffle them, you can always put them back in order. The question is which arrangement takes longest to untangle and how many moves it needs.</b-why>

  Three words will matter. A **move** is turning the ring left, turning it right, or swapping the two balls in the **window** at the top. An **arrangement** is how the balls sit around the ring.

  <b-art names="longest-ring-arrangement/moves"/>
  <b-cap>Three moves on a six-ball ring. <a href="https://youtu.be/ecc2GvvZGvM?t=8" target="_blank" rel="noopener">▶ 0:08</a></b-cap>

  A related problem — the same ring, but turning only one way plus the swap — was posed by the cybernetician Viktor Glushkov in 1968. It is still open.
</b-chapter>

<b-chapter id="tower" icon="boxes-route" title="The tower of arrangements: floors and the ceiling">
  <b-why>Let's draw all arrangements at once. Five balls have 120 of them.</b-why>

  Put each arrangement on a **floor**: how many moves it is from order. Order is at the bottom, three neighbors on the first floor, then floors widen and narrow again. The top floor is the **ceiling**: that many moves are enough for any arrangement. For five balls the ceiling is floor 10, and exactly one arrangement sits there.

  <b-art names="longest-ring-arrangement/tower"/>
  <b-cap>120 arrangements of five balls by floor, computed by brute force. <a href="https://youtu.be/ecc2GvvZGvM?t=73" target="_blank" rel="noopener">▶ 1:13</a></b-cap>
  <b-steps top="14" round>
    <step t="Floor">How many moves from the arrangement to order along the shortest path</step>
    <step t="Ceiling">The top floor: enough moves for any arrangement; in math, the graph diameter</step>
    <step t="Question">Who sits on the ceiling and how high it is for any number of balls</step>
  </b-steps>
</b-chapter>

<b-chapter id="mirror" icon="search" title="Who sits on the ceiling: the mirror">
  <b-why>The authors ran a brute-force search over every arrangement of rings up to 15 balls. For 15 that is over a trillion arrangements and several days of compute.</b-why>

  Every time, exactly one arrangement sits at the top — the **mirror**: the ring reflected through the window. Surprisingly, simply putting the balls in reverse order lands two floors lower.

  <b-art names="longest-ring-arrangement/mirror"/>
  <b-cap>Six balls: the mirror is on floor 15, the reversed order on floor 13. <a href="https://youtu.be/ecc2GvvZGvM?t=112" target="_blank" rel="noopener">▶ 1:52</a></b-cap>
  <b-art names="longest-ring-arrangement/count"/>
  <b-cap>The number of arrangements grows as 1·2·3·…·n. <a href="https://youtu.be/ecc2GvvZGvM?t=118" target="_blank" rel="noopener">▶ 1:58</a></b-cap>
</b-chapter>

<b-chapter id="pairs" icon="bulb" title="The ceiling equals the number of pairs">
  <b-why>Five balls form pairs along ten lines, and the ceiling for five balls is also 10. Six balls: 15 pairs and a ceiling of 15.</b-why>

  <b-art names="longest-ring-arrangement/pairs"/>
  <b-cap>Pairs of balls and the ceiling. <a href="https://youtu.be/ecc2GvvZGvM?t=150" target="_blank" rel="noopener">▶ 2:30</a></b-cap>

  It matches on every ring the brute force covered, starting from four balls; three balls have a ceiling of 2 but 3 pairs. Hence the conjecture from the Online Encyclopedia of Integer Sequences (OEIS A186783): the ceiling always equals the number of pairs, n(n−1)/2.

  <b-table>
    <table><thead>
    <tr><th>Balls</th><th class="bk-table-r">Pairs</th><th class="bk-table-r">Ceiling by brute force</th></tr>
    </thead><tbody>
    <tr><td>4</td><td class="bk-table-r">6</td><td class="bk-table-r">6</td></tr>
    <tr><td>5</td><td class="bk-table-r">10</td><td class="bk-table-r">10</td></tr>
    <tr><td>6</td><td class="bk-table-r">15</td><td class="bk-table-r">15</td></tr>
    <tr><td>10</td><td class="bk-table-r">45</td><td class="bk-table-r">45</td></tr>
    <tr><td>15</td><td class="bk-table-r">105</td><td class="bk-table-r">105</td></tr>
    </tbody></table>
  </b-table>
  <b-finding>
    <ex>Brute force up to 15 balls gave both the answer “mirror” and the formula “number of pairs”.</ex>
    <gen>Exhaustively solving small cases is a cheap way to get a conjecture you then test far beyond their reach.</gen>
    <do>Before building a clever method, compute the small cases head-on and look for the pattern.</do>
  </b-finding>
</b-chapter>

<b-chapter id="gap" icon="flag-alt" title="Twenty balls: brute force can't reach">
  <b-why>Twenty balls already have 2.4·10¹⁸ arrangements — billions of billions. So the conjecture is tested differently: take the mirror and look for a shorter way to untangle it.</b-why>

  If the path is never shorter than the number of pairs, the conjecture holds. The classic computer algebra program for groups (GAP) works on a 20-ball ring for 41 minutes and finds a path of 217,944 moves. There are only 190 pairs.

  <b-art names="longest-ring-arrangement/gap"/>
  <b-cap>The classic program's path versus the number of pairs. <a href="https://youtu.be/ecc2GvvZGvM?t=180" target="_blank" rel="noopener">▶ 3:00</a></b-cap>
</b-chapter>

<b-chapter id="compass" icon="search" title="The compass from the previous video">
  <b-why>The authors reuse the trick from the <a href="/blog/rubik-cube-neural-network/">Rubik's Cube</a>: a compass trained on random walks.</b-why>

  First, **walks**: from order, make random moves and after each one record the arrangement and how many moves were made. A **compass** learns from these walks — a neural network that looks at an arrangement and guesses its floor. It guesses with an error: a walk loops, so it has more moves than the shortest path. But the compass points the right way.

  <b-art names="longest-ring-arrangement/walk"/>
  <b-cap>The walk from the video: 12 steps, while the true floor at the end is 6. <a href="https://youtu.be/ecc2GvvZGvM?t=222" target="_blank" rel="noopener">▶ 3:42</a></b-cap>
  <b-io justify>
    <item k="Input">An arrangement: the list of ball numbers around the ring</item>
    <item k="Compass">A simple neural network (one layer of 128 neurons is often enough) or gradient boosting</item>
    <item k="Output">An estimate: how many moves to order</item>
  </b-io>
</b-chapter>

<b-chapter id="front" icon="flag-alt" title="The front: many arrangements at once">
  <b-why>Compass errors lead a single path into a dead end. So the search moves as a front — beam search in the paper.</b-why>

  Keep many of the most promising arrangements at once and try every move from each; the best by the compass go on to the next step. On 20 balls this finds a path of exactly 190 moves — in 3 minutes 48 seconds instead of 41 minutes. Up to 28 balls the path equals the number of pairs; up to 44 it is found but longer.

  <b-art names="longest-ring-arrangement/front"/>
  <b-cap>Found path length relative to the number of pairs; tables 2–3 of the paper. <a href="https://youtu.be/ecc2GvvZGvM?t=258" target="_blank" rel="noopener">▶ 4:18</a></b-cap>
  <b-numchain>
    <step>try three moves from every arrangement in the front</step>
    <step>drop duplicates, the compass scores them</step>
    <step>keep the best and repeat</step>
  </b-numchain>
</b-chapter>

<b-chapter id="hint" icon="bulb" title="A one-line hint">
  <b-why>The authors added one line to the search: don't swap the balls in the window if they are already in order.</b-why>

  That line pushed the limit from 40 balls to 100. For 100 balls a path is found in 9 hours, although it is still more than three times longer than the number of pairs: 16,632 moves against 4,950 pairs. And the hint is tailored to this ring: for other problems it is yet to be found.

  <b-art names="longest-ring-arrangement/hint"/>
  <b-cap>The window where a swap is forbidden, and the new limit. <a href="https://youtu.be/ecc2GvvZGvM?t=294" target="_blank" rel="noopener">▶ 4:54</a></b-cap>
  <b-finding>
    <ex>One rule taken from the structure of the problem grew solvable rings from 40 to 100 balls.</ex>
    <gen>Problem knowledge in the form of a ban on clearly useless steps works better than tuning the model.</gen>
    <do>Look for moves that never bring you closer to the goal and strike them from the search.</do>
  </b-finding>
</b-chapter>

<b-chapter id="contest" icon="trophy" title="An open competition">
  <b-why>The authors invited everyone to untangle the mirror: an open programming competition on Kaggle, rings from 2 to 200 balls.</b-why>

  Participants reached paths of exactly the number of pairs. Nobody found a shorter one.

  <b-art names="longest-ring-arrangement/contest"/>
  <b-cap>Rings from 2 to 200 balls. <a href="https://youtu.be/ecc2GvvZGvM?t=327" target="_blank" rel="noopener">▶ 5:27</a></b-cap>
</b-chapter>

<b-chapter id="triples" icon="shield-check" title="Why it can't be shorter: triples">
  <b-why>Take any three balls. Around the ring they run either clockwise or counterclockwise.</b-why>

  Turning the ring doesn't flip a triple; only a swap in the window can. And the mirror flips all triples at once. From this the authors proved that the mirror needs almost as many moves as there are pairs: at most half the number of balls plus one move fewer.

  <b-art names="longest-ring-arrangement/triples"/>
  <b-cap>The triple 1, 2, 4: a turn keeps it, a swap flips it. <a href="https://youtu.be/ecc2GvvZGvM?t=351" target="_blank" rel="noopener">▶ 5:51</a></b-cap>
</b-chapter>

<b-chapter id="fork" icon="shield-check" title="The fork: proven bounds">
  <b-why>From above, the ceiling is bounded by the authors' untangling method: any arrangement is untangled in at most the number of pairs plus three moves per ball.</b-why>

  That gives a fork. For 20 balls the ceiling lies between 179 and 250, while the conjecture says 190. The more balls, the narrower the fork relative to the ceiling itself.

  <b-art names="longest-ring-arrangement/fork"/>
  <b-cap>Bounds for 10, 20 and 100 balls; the line is the conjecture. <a href="https://youtu.be/ecc2GvvZGvM?t=389" target="_blank" rel="noopener">▶ 6:29</a></b-cap>
</b-chapter>

<b-chapter id="main" icon="flag" title="Takeaway">
  <b-why>The question was: which arrangement takes longest to untangle and how many moves does it need? Most likely the mirror, with as many moves as there are pairs of balls.</b-why>

  <b-step-chain>
    <node t="Brute force">up to 15 balls: mirror and pairs</node>
    <node t="Compass and front">exact up to 28, 100 with the hint</node>
    <node t="Competition">up to 200 balls, nothing shorter</node>
    <node t="Proof">a fork around the number of pairs</node>
  </b-step-chain>

  After the paper, one of its authors, Grigorii Antiufeev, posted a proof that the mirror cannot be untangled faster than the number of pairs (<a href="https://arxiv.org/abs/2601.08715" target="_blank" rel="noopener">arXiv 2601.08715</a>, a 2026 preprint). One thing remains open: whether some arrangement sits even farther away.
  <b-callout icon="shield-check">**Caveat.** “Ceiling = number of pairs” is a conjecture: only the bounds are proven. The lower bound of exactly the number of pairs is a preprint not yet peer-reviewed.</b-callout>
</b-chapter>

<b-chapter id="formal" icon="boxes-route" title="Formally: the same path in the paper's language">
  <b-why>The second part of the video: the same steps as formulas.</b-why>

  <b-table>
    <table><thead>
    <tr><th>In the video</th><th>In the paper</th><th>How it works</th></tr>
    </thead><tbody>
    <tr><td>ring with all arrangements</td><td>LRX Cayley graph of the symmetric group Sₙ</td><td>vertices are permutations, edges are moves</td></tr>
    <tr><td>moves</td><td>generators L, R, X</td><td>L — left shift, R = L⁻¹, X = (0, 1) — swap of the first two positions</td></tr>
    <tr><td>ceiling</td><td>graph diameter</td><td>conjecture: n(n−1)/2 for n ≥ 4</td></tr>
    <tr><td>mirror</td><td>longest element ℓₙ</td><td>(1 0 n−1 … 3 2) = R² · (reversed order)</td></tr>
    <tr><td>compass</td><td>network on diffusion distance + Q-learning</td><td>first learns from walks, then is checked against the Bellman equation d(s) = 1 + min d(t) over neighbors t</td></tr>
    <tr><td>front</td><td>beam search</td><td>width up to 2²⁰; the hint is the X-trick</td></tr>
    <tr><td>fork</td><td>propositions 4.2 and 4.3</td><td>n(n−1)/2 − n/2 − 1 ≤ diameter ≤ n(n−1)/2 + 3n</td></tr>
    </tbody></table>
  </b-table>

  The paper's novelty is how the compass is trained. Walks give a first guess, then the compass is checked against its neighbors: one move more to order than from the nearest neighbor. On a 28-ball ring this cut the typical path from 650 moves to 402, with 378 pairs.

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
  <b-cap>A sketch of beam search with the hint; the full code is on Kaggle. <a href="https://youtu.be/ecc2GvvZGvM?t=586" target="_blank" rel="noopener">▶ 9:46</a></b-cap>
</b-chapter>

<b-chapter id="practice" icon="grid" title="Where it helps">
  <b-table>
    <table><thead>
    <tr><th>Link</th><th>Where</th></tr>
    </thead><tbody>
    <tr><td><b-tag kind="ok">direct</b-tag></td><td>the TopSpin (Oval Track) and Hungarian Rings puzzles work almost the same way</td></tr>
    <tr><td><b-tag kind="ok">direct</b-tag></td><td>processor networks: the diameter of the link graph is the longest message delay</td></tr>
    <tr><td><b-tag kind="plain">analogy</b-tag></td><td>planning: getting from one state to another in small steps</td></tr>
    </tbody></table>
  </b-table>
  <b-callout icon="bulb">**Lesson.** Brute force gives a conjecture, a trained program tests it far beyond brute force, and a proof squeezes the answer into a fork.</b-callout>
</b-chapter>

<b-chapter id="when" icon="shield-check" title="Who and when, what is proven">
  <b-steps top="14" round>
    <step t="1968">Viktor Glushkov: the ring problem with two moves</step>
    <step t="2011">The three-move sequence entered the OEIS (A186783)</step>
    <step t="2020">The conjecture is recorded: ceiling = n(n−1)/2</step>
    <step t="2025" hl>The CayleyPy RL paper: 34 authors, AI, brute force, a competition and bounds</step>
    <step t="2026">Journal publication; Antiufeev's preprint: a lower bound of exactly the number of pairs</step>
  </b-steps>

  Proven: n(n−1)/2 − n/2 − 1 ≤ diameter ≤ n(n−1)/2 + 3n; equality and the uniqueness of the mirror are conjectures. The paper has small inconsistencies: the arXiv abstract writes the lower bound without the “− 1”, and section 3.3 refers to table 8 instead of table 6.
</b-chapter>

<b-chapter id="next" title="Further">
  <b-links cols="3">
    <item href="https://arxiv.org/abs/2502.18663" k="Paper" t="arXiv 2502.18663" ext>CayleyPy RL: Pathfinding and Reinforcement Learning on Cayley Graphs</item>
    <item href="/blog/rubik-cube-neural-network/" k="Previous walkthrough" t="Rubik's Cube">Same team: compass, front and squad on 4×4×4 and 5×5×5 cubes</item>
    <item href="https://youtu.be/ecc2GvvZGvM" k="Video" t="On YouTube" ext>The same story in 11 minutes, with 3D and formulas (in Russian)</item>
  </b-links>
</b-chapter>
<b-footer>Numbers come from A. Chervov, M. Obozov et al., arXiv 2502.18663 (tables 2–6, propositions 4.2–4.3), and OEIS A186783. Floors for five and six balls were recomputed by brute force. The blog author co-authored the first CayleyPy paper, on the Rubik's Cube.</b-footer>
</b-post>
