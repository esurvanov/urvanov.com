---
title: Niveaux de maturité des agents IA : du chat aux spécifications, skills, code, harness et système agentique
date: 2026-11-14
updated: 2026-11-17
description: Le travail avec l’IA passe d’un chat à un système agentique : ce qui est consigné à chaque étape, quand avancer et ce que cela coûte.
tags: IA, agents, spécifications, skills, harness, maturité, compound engineering
category: specs
layout: wide
mentions: Compound Engineering, Agent Skills, AGENTS.md, CLAUDE.md, Spec-Driven Development, Progressive Crystallization, Harness engineering, Harness-Driven Development
toc: map=Sept étapes | sources=Ce que dit le marché | chat=Chat | agent=Agent et règles | spec=Spec | skill=Skill | script=Script | crystal=Le coût d’une étape | harness=Harness | system=Système agentique | traps=Pièges | stop=Quand s’arrêter | start=Par où commencer | faq=Questions | next=Pour aller plus loin
---
Les niveaux de maturité des agents IA vont du chat à l’agent, la spécification, le skill, le script, le harness et le système agentique : à chaque étape, ce qu’on expliquait à voix haute passe dans un fichier ou du code, hors de toute mémoire. Les échelles de <a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every</a>, <a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a>, <a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a>, <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a>, <a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a> et <a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a> décrivent la même suite.

<b-post series="prompts">
<b-chapter id="map" title="Sept étapes" icon="stairs">
  <b-art names="ai-agent-maturity-levels/ladder ai-agent-maturity-levels/ladder-mobile"></b-art>
  <b-cap>Sept étapes. Le gris est la personne, le bleu est l’agent et tout ce qui est consigné pour lui, l’orange est le risque : devoir expliquer de nouveau. Le bug orange à l’étape Harness est une erreur trouvée dans le rapport terminé : le harness la transforme en vérification, ce que montre la flèche, pour que la même erreur ne revienne pas.</b-cap>
  <b-why>L’image montre où va le savoir. Dans un chat, il vit dans la tête de la personne et dans la conversation. Puis il passe, l’un après l’autre, dans la session de l’agent, un fichier d’exigences, un fichier de procédure, un script et enfin le dépôt avec ses vérifications. Le tableau ci-dessous suit le même rapport de lundi en lundi : ce que la personne fait à la main et ce qui se passe le lundi suivant.</b-why>
  <b-table code="prose">
    <table>
    <thead>
      <tr><th>Étape</th><th>Ce que la personne fait à la main</th><th>Où vit le savoir</th><th>Ce qui se passe le lundi suivant</th></tr>
    </thead>
    <tbody>
      <tr><td><b>1. Chat</b></td><td>colle le tableau des ventes dans un chat et explique quelles colonnes sont nécessaires</td><td>dans la tête et dans la conversation</td><td>tout est expliqué de nouveau</td></tr>
      <tr><td><b>2. <a class="s-term" href="/materials/glossary/ai-agent/">Agent</a></b></td><td>demande à un agent ayant accès aux fichiers de construire le rapport, le corrige et ajoute « montants en roubles » au fichier de règles</td><td>dans la session et dans le fichier de règles</td><td>l’agent se souvient des règles mais pas de la manière dont il a compté la dernière fois</td></tr>
      <tr><td><b>3. <a class="s-term" href="/materials/glossary/spec-driven-development/">Spec</a></b></td><td>écrit spec.md : quelles colonnes, d’où viennent les données, comment savoir que le rapport est terminé</td><td>dans <code>spec.md</code></td><td>n’importe quel agent construit le même rapport à partir de la même description</td></tr>
      <tr><td><b>4. <a class="s-term" href="/materials/glossary/agent-skills/">Skill</a></b></td><td>transforme l’ordre de construction du rapport en skill</td><td>dans <code>SKILL.md</code> avec des étapes et des exemples</td><td>l’agent trouve le skill tout seul quand un rapport est demandé</td></tr>
      <tr><td><b>5. Script</b></td><td>extrait les étapes stables du skill dans un script pour l’export et le tableau croisé : un skill sur des données n’est pas rentable, un script calcule de la même façon à chaque fois</td><td>dans <code>report.py</code></td><td>l’export s’exécute en quelques secondes sans coût de modèle et donne le même résultat sur les mêmes données ; le modèle n’écrit que les conclusions</td></tr>
      <tr><td><b>6. <a class="s-term" href="/materials/glossary/harness/">Harness</a></b></td><td>lit le rapport terminé ; une erreur du rapport devient une nouvelle règle ou vérification dans l’environnement de l’agent</td><td>dans le dépôt : règles, vérifications, hooks</td><td>la même erreur ne revient pas : la règle et la vérification se déclenchent d’elles-mêmes</td></tr>
      <tr><td><b>7. <a class="s-term" href="/materials/glossary/agentic-system/">Système agentique</a></b></td><td>ne confie à l’agent que les parties complexes comme le tri des demandes de clients et laisse le reste au code et aux vérifications</td><td>dans un seul service : code, planning, vérifications et un agent aux endroits complexes</td><td>le rapport arrive à l’heure : les étapes déterministes s’exécutent comme du code, la partie complexe est décidée par un agent avec des raisons consignées, la personne ne traite qu’une alerte de divergence</td></tr>
    </tbody>
    </table>
  </b-table>
  Cet article appelle le passage d’une étape à la suivante <b><a class="s-term" href="/materials/glossary/pulling-out/">extraction</a></b> (« vytyagivanie » dans la version russe) : la partie répétable de ce qu’une personne et un agent ont déjà fait ensemble est extraite et consignée un cran plus haut. C’est un processus évolutif de développement des processus dans une organisation : ils ne sont pas conçus d’un bloc à l’avance mais poussent pas à pas à partir du travail répété. Les règles sont extraites d’un chat, une spec des règles et des bonnes sessions, une procédure de skill d’une spec, un script d’un skill, et un harness des erreurs et des vérifications autour de l’agent. Le bout de l’échelle est un système agentique. Tout commence par l’approche « un agent le fait », mais au bout du chemin la part des agents reste petite : la base du système est du code classique, des vérifications et un planning, et les agents ne prennent que les blocs complexes qui ne peuvent pas être résolus autrement. Le comportement qui fonctionne n’est pas réinventé. Il est repris de ce qui a déjà marché et consigné là où il n’a plus à être expliqué.
  <b-finding>
    <ex>Un rapport hebdomadaire est passé d’une explication répétée dans un chat à un rapport sur planning.</ex>
    <gen>L’étape est déterminée par l’endroit où vit le savoir : dans la tête d’une personne, dans une session, dans un fichier ou dans du code. Plus il y a de choses consignées, moins il y a de dépendance à la mémoire d’une personne et à l’humeur du modèle.</gen>
    <do>Choisir une tâche récurrente et voir dans le tableau à quelle étape elle se trouve.</do>
  </b-finding>
</b-chapter>

<b-chapter id="sources" title="La position de l’auteur et ce que dit le marché" icon="book">
  <b-why>Les sept étapes ci-dessus sont la position de l’auteur, assemblées selon un seul critère : ce qui est exactement consigné à l’étape. Sur le marché, différents auteurs décrivent le même mouvement, chacun sur son tronçon : certains sur les règles, d’autres sur les specs, d’autres sur les skills ou le harness. Tous vont dans une même direction, d’une conversation vers un fichier et d’un fichier vers du code. Le tableau montre comment les étapes s’alignent sur les sources.</b-why>
  <b-art names="ai-agent-maturity-levels/matrix"></b-art>
  <b-cap>Plein signifie que l’auteur décrit explicitement l’étape, un anneau signifie qu’un équivalent proche est décrit (par exemple, les « deterministic tooling » chez <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a> et <a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a> sont comptés comme proches d’un script). La ligne du bas porte les sept étapes de cet article ; seul <a href="https://arxiv.org/abs/2607.07052" target="_blank" rel="noopener">Malik</a> décrit explicitement la dernière.</b-cap>

  La matrice montre comment le marché est organisé : chaque auteur décrit son propre tronçon du chemin, et ensemble les tronçons couvrent les sept étapes. <a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a> n’a ni specs ni skills, Rezvov et Clark n’ont pas de skills, <a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a> n’a pas de script. Les détails pour chaque auteur sont dans le tableau ci-dessous.
  <b-table>
    <table>
    <thead>
      <tr><th>Source</th><th>Étapes dans l’ordre</th><th>Où sont les specs et les skills</th></tr>
    </thead>
    <tbody>
      <tr><td><a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every, Compound Engineering</a> (Kieran Klaassen)</td><td>développement manuel → chat → agent avec relecture ligne à ligne → plan d’abord et relecture de la PR terminée → de l’idée à la PR → agents cloud en parallèle</td><td>le plan à l’étape 3 ; les skills et les règles s’ajoutent à l’étape Compound</td></tr>
      <tr><td><a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a>, 05.02.2026</td><td>abandonner le chatbot → reproduire son propre travail avec un agent → agents de fin de journée → externaliser les tâches faciles → concevoir le harness → avoir toujours un agent qui tourne</td><td>AGENTS.md et vérifications programmées à l’étape 5 ; pas de specs ni de skills</td></tr>
      <tr><td><a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a>, 10.03.2026</td><td>8 niveaux : tab complete et chat d’IDE → contexte → compounding → MCP et skills → harness → agents d’arrière-plan → équipes d’agents</td><td>skills au niveau 5 ; pas de specs</td></tr>
      <tr><td><a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a>, 06.04.2026</td><td>L0 référence → L1 surveillance de l’agent → L2 règles → L3 deterministic tooling → L4 SDD → L5 agents autonomes</td><td>specs à L4 ; pas de skills</td></tr>
      <tr><td><a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a>, Hyperact, 05.01.2026</td><td>7 niveaux : prompts manuels → aide de l’IDE → accès au dépôt → deterministic tooling → contexte d’équipe → flux parallèles spécialisés → spec-driven development</td><td>specs au niveau 7 ; pas de skills</td></tr>
      <tr><td><a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a>, 23.01.2026</td><td>niveaux 0 à 5 par analogie avec l’automatisation de la conduite : de l’autocomplétion à la « dark factory »</td><td>specs et skills au niveau 4 ; au niveau 5 les specs se transforment en logiciel</td></tr>
      <tr><td><a href="https://developers.redhat.com/articles/2026/03/30/vibes-specs-skills-agents-ai-coding" target="_blank" rel="noopener">Red Hat, Naszcyniec</a>, 30.03.2026</td><td>quatre piliers en pile : vibes → specs → skills → agents</td><td>les quatre dans un seul schéma</td></tr>
    </tbody>
    </table>
  </b-table>
  <b-callout icon="bulb">**Le fichier de règles** (CLAUDE.md, AGENTS.md) se trouve à des endroits différents. Chez <a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every</a>, <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a> et <a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a>, il apparaît juste après le premier agent ; chez <a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a> et <a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a> seulement au cinquième niveau. Dans cet article, il appartient à l’étape « agent » : la toute première entrée « l’agent s’est trompé, une règle a été ajoutée » transforme un chat en agent doté de mémoire.</b-callout>
  <b-callout icon="trend-up">Les échelles d’Eledath, de <a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a> et de Clark comptent les étapes par autonomie : combien d’agents travaillent et à quel point une personne regarde rarement le code. Les étapes de cet article sont comptées selon l’endroit où vit le savoir. Les deux échelles concordent : une fois le savoir consigné, on peut confier davantage à l’agent.</b-callout>
  <b-finding>
    <ex>Rezvov, Clark et Shapiro placent les specs, Eledath et Shapiro placent les skills ; cet article les met sur une seule échelle.</ex>
    <gen>Les différentes échelles décrivent le même mouvement sous différents angles : d’abord tout dans la conversation, puis dans un fichier, puis dans du code.</gen>
    <do>Comparer sa propre expérience aux sept étapes ci-dessus plutôt qu’à la liste d’un seul auteur.</do>
  </b-finding>
</b-chapter>

<b-chapter id="chat" title="Étape 1. Chat : le savoir vit dans une conversation" icon="chat">
  <b-why>Dans un chat, la personne fait passer les données dans les deux sens et dit à la main qu’une réponse est fausse. Pour une question ponctuelle, cela suffit.</b-why>
  <b-art names="ai-agent-maturity-levels/chat"></b-art>
  <b-cap>Trois lundis de suite, la personne répond aux mêmes questions. Le savoir de ce dont le rapport a besoin ne reste que dans sa tête.</b-cap>
  <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a> appelle ce mode une référence : l’agent comme « Stack Overflow, mais plus aimable », et il ajoute que ce n’est pas vraiment un niveau. <a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a> conseille d’abandonner le chatbot pour le travail sérieux<b-proof href="https://mitchellh.com/writing/my-ai-adoption-journey" quote="Hashimoto: “To find value, you must use an agent” — mitchellh.com/writing/my-ai-adoption-journey"></b-proof>, car un agent lit les fichiers, exécute des programmes et vérifie lui-même le résultat. <a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a> et <a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a> placent le chat au premier niveau : copier des fragments dans les deux sens.

  Même à cette étape, <a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every</a> conseille de tenir des notes sur les prompts qui ont bien marché : la toute première trace, avant tout fichier de règles<b-proof href="https://every.to/guides/compound-engineering" quote="Every: “Keep a running note of prompts that worked well” — every.to/guides/compound-engineering"></b-proof>. Une note répond à la question « comment l’ai-je expliqué la dernière fois », même si l’agent ne la lit pas encore.
  <b-finding>
    <ex>Chaque lundi, il faut expliquer de nouveau les colonnes du rapport.</ex>
    <gen>Un chat ne garde pas les accords d’une conversation à l’autre. Rezvov décrit ainsi la sortie : quand répéter la même chose devient pénible, les instructions répétées sont transformées en règles.</gen>
    <do>Au moment où l’on explique la même chose pour la deuxième fois, passer à l’étape suivante.</do>
  </b-finding>
</b-chapter>

<b-chapter id="agent" title="Étape 2. Agent et fichier de règles" icon="bot">
  <b-why>L’agent obtient l’accès aux fichiers et aux commandes et agit seul. La première trace faite pour lui est un fichier de règles : une liste de ce que l’agent doit savoir du projet à chaque session.</b-why>
  <b-art names="ai-agent-maturity-levels/agent-rules"></b-art>
  <b-cap>Une erreur de l’agent devient une ligne du fichier de règles, et la session suivante de l’agent commence avec elle déjà présente.</b-cap>
  <a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a> a vécu cette étape au sens littéral : il a refait tous ses commits manuels avec un agent<b-proof href="https://mitchellh.com/writing/my-ai-adoption-journey" quote="Hashimoto: “I literally did the work twice” — mitchellh.com/writing/my-ai-adoption-journey"></b-proof> et en a tiré trois leçons : découper le travail en tâches claires, séparer la planification de l’exécution, et donner à l’agent un moyen de vérifier son résultat. Le guide d’<a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every</a> propose le premier pas vers la consignation : créer un fichier CLAUDE.md et y ajouter une note après chaque erreur de l’agent.
  <b-steps>
    <step t="L’agent s’est trompé">par exemple, il a compté les sommes en dollars au lieu de roubles.</step>
    <step t="Une ligne dans le fichier de règles">« les sommes du rapport sont en roubles » : une ligne par mauvais comportement. Hashimoto écrit que, dans le fichier du projet Ghostty, chaque ligne repose sur un mauvais comportement de l’agent<b-proof href="https://mitchellh.com/writing/my-ai-adoption-journey" quote="Hashimoto: “Each line in that file is based on a bad agent behavior” — mitchellh.com/writing/my-ai-adoption-journey"></b-proof>.</step>
    <step t="La session suivante">l’agent lit le fichier au début et ne répète pas l’erreur.</step>
  </b-steps>
  <b-callout icon="alert-circle">Un fichier de règles peut être surchargé. <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a> avertit que des règles mal écrites donnent un résultat pire que l’absence de règles<b-proof href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" quote="Rezvov: “poorly written rules can actually make output worse than having no rules at all” — dev.to/arezvov"></b-proof>. <a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a> déconseille de tout mettre dans le fichier de règles : il vaut mieux tenir à jour un dossier de documentation où l’agent trouve ce dont il a besoin.</b-callout>

  Hashimoto fait de l’étape une habitude : pendant la dernière demi-heure de la journée de travail, il lance des agents pour la recherche, pour les idées floues et pour le tri des tâches, afin d’obtenir le matin un « warm start »<b-proof href="https://mitchellh.com/writing/my-ai-adoption-journey" quote="Hashimoto: “warm start” — mitchellh.com/writing/my-ai-adoption-journey"></b-proof>. Il ne laisse pas d’agents tourner la nuit : la plupart de ses tâches se terminent en moins d’une demi-heure. Every avertit que la plupart des développeurs restent bloqués à cette étape<b-proof href="https://every.to/guides/compound-engineering" quote="Every: “Most developers plateau here” — every.to/guides/compound-engineering"></b-proof> en approuvant chaque action de l’agent à la main.
  <b-finding>
    <ex>La ligne sur les roubles dans le fichier de règles ferme définitivement une erreur récurrente.</ex>
    <gen>Une règle conserve un accord mais pas toute l’intention d’une tâche : ce qu’il faut faire et comment savoir que c’est terminé n’y est pas écrit.</gen>
    <do>Garder le fichier de règles court ; déplacer la description de la tâche dans une spec. Plus dans l’article <a href="/blog/specs-rules-skills/">AGENTS.md, CLAUDE.md et spec.md : quoi mettre où</a>.</do>
  </b-finding>
</b-chapter>

<b-chapter id="spec" title="Étape 3. Spec : l’intention est écrite avant le code" icon="file-lines">
  <b-why>Une spec décrit une tâche : ce qui doit être produit et comment savoir que c’est terminé. L’agent et la personne lisent le même texte, et la relecture vérifie le résultat par rapport à lui.</b-why>
  <a href="https://developers.redhat.com/articles/2026/03/30/vibes-specs-skills-agents-ai-coding" target="_blank" rel="noopener">Red Hat</a> sépare les specs en deux sortes : « quoi » (objectif, exigences, critères de réussite) et « comment » (sécurité, structure, tests, normes). L’auteur recommande plusieurs petits fichiers comme <code>what-vision.md</code>, <code>how-security.md</code> et <code>how-testing.md</code> au lieu d’un long document, afin que seul le contexte pertinent soit chargé<b-proof href="https://developers.redhat.com/articles/2026/03/30/vibes-specs-skills-agents-ai-coding" quote="Naszcyniec, Red Hat: “the days of the 100-page PDF specification are over” — developers.redhat.com"></b-proof>. <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a> ajoute une traçabilité de bout en bout : une exigence a un identifiant tel que FR-AUTH-PASSWORDRESET, visible dans la description de l’API, le code et les tests<b-proof href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" quote="Rezvov: “The core of SDD is traceability” — dev.to/arezvov"></b-proof>.
  Une spec a aussi sa propre échelle de maturité. Les trois premiers niveaux ont été décrits par Birgitta <a href="https://martinfowler.com/articles/harness-engineering.html" target="_blank" rel="noopener">Böckeler</a> (Thoughtworks)<b-proof href="https://www.martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html" quote="Böckeler: three maturity levels of a spec, spec-first, spec-anchored and spec-as-source (paraphrase) — martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html"></b-proof> ; le quatrième, Spec-in-the-loop, est ajouté dans l’exposé de l’auteur du site <a href="/talk/spec-driven-development/">« Spec-Driven Development »</a> (en russe) : sur la <a href="/slide/20/">diapositive aux quatre niveaux</a>, la spec apprend du système en marche, et ses métriques et incidents corrigent la spec.
  <b-art names="ai-agent-maturity-levels/spec-levels"></b-art>
  <b-cap>Comme sur la diapositive de l’exposé : la spec à gauche, le code à droite, les flèches montrent ce qui vient de quoi et qui renvoie les changements. Une flèche grise en pointillés signifie qu’une personne renvoie le changement, une bleue que le système en marche le fait lui-même. À droite : ce que le niveau résout et ce qui le bloque.</b-cap>
  <b-table>
    <table>
    <thead>
      <tr><th>Niveau de spec</th><th>Ce qui arrive à la spec</th><th>Programme d’exemple</th></tr>
    </thead>
    <tbody>
      <tr><td><b>Spec-first</b></td><td>la spec est écrite avant le code et utilisée pour une tâche</td><td>GitHub Spec Kit</td></tr>
      <tr><td><b>Spec-anchored</b></td><td>la spec survit à la tâche : les changements y sont fusionnés</td><td><a href="/blog/openspec/">OpenSpec</a></td></tr>
      <tr><td><b>Spec-as-source</b></td><td>une personne ne modifie que la spec, le code en est généré</td><td>Tessl ; seul celui-ci est revendiqué par <a href="https://martinfowler.com/articles/harness-engineering.html" target="_blank" rel="noopener">Böckeler</a></td></tr>
      <tr><td><b>Spec-in-the-loop</b></td><td>les métriques et incidents du système en marche corrigent la spec</td><td>pas de programmes prêts ; comportement similaire chez <a href="https://developers.redhat.com/articles/2026/03/30/vibes-specs-skills-agents-ai-coding" target="_blank" rel="noopener">Red Hat</a> et <a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every</a>, voir ci-dessous</td></tr>
    </tbody>
    </table>
  </b-table>

  Red Hat distingue deux modes de travail avec une spec. Dans le mode « interacting », la personne affine la spec avec l’agent : par exemple, elle demande à l’agent de la noter de 0 à 10 et de dire ce qui manque pour une implémentation autonome. Quand la note est de 9 à 10, le mode « instructing » démarre : l’agent lit les specs, trouve les skills dont il a besoin, écrit le code, exécute les tests et corrige lui-même les erreurs. Chez <a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a>, cela correspond au quatrième niveau, où la personne écrit une spec, discute avec l’agent à son sujet et s’en va<b-proof href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" quote="Shapiro: “You write a spec. You argue with it about the spec.” — danshapiro.com"></b-proof>.
  <b-callout icon="refresh">Red Hat appelle le quatrième niveau la « co-évolution » de la spec. L’agent tient un fichier LessonsLearned.md : à chaque erreur, il consigne la cause et la correction et propose une modification de la spec « comment » concernée<b-proof href="https://developers.redhat.com/articles/2026/03/30/vibes-specs-skills-agents-ai-coding" quote="Naszcyniec, Red Hat: “turns every off-key moment into a permanent improvement” — developers.redhat.com"></b-proof>. Every fait la même chose à l’étape Compound, décrite plus bas.</b-callout>
  <b-finding>
    <ex>Le spec.md du rapport dit : quelles colonnes, d’où viennent les données, et que le rapport est terminé quand les sommes correspondent à l’export.</ex>
    <gen><a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a> place les specs au sommet de son échelle : l’implémentation y devient une sortie interchangeable plutôt qu’un actif durable<b-proof href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" quote="Clark: “interchangeable output rather than a durable asset” — hyperact.co.uk"></b-proof>. Il qualifie aussi le septième niveau de plus proche d’une remise à zéro que d’une suite de l’échelle.</gen>
    <do>Écrire une spec pour toute tâche de plus d’une journée. Comment découper une grande spec en parties : voir l’article <a href="/blog/specs-by-aggregates/">Spécifications par agrégats</a>.</do>
  </b-finding>
</b-chapter>

<b-chapter id="skill" title="Étape 4. Skill : la procédure est écrite pour l’agent" icon="notebook">
  <b-why>Si une spec dit ce qui doit être produit, un skill dit comment on le fait. C’est un dossier avec un fichier SKILL.md : un nom, une description et des instructions pas à pas, parfois avec des modèles et des scripts.</b-why>
  <b-art names="ai-agent-maturity-levels/spec-skill"></b-art>
  <b-cap>Une spec se trouve dans le contexte de la tâche. Un skill occupe deux lignes du contexte jusqu’à ce qu’il soit nécessaire et n’est chargé en entier qu’à l’appel.</b-cap>
  <a href="https://developers.redhat.com/articles/2026/03/30/vibes-specs-skills-agents-ai-coding" target="_blank" rel="noopener">Red Hat</a> décrit les skills comme des procédures modulaires répétables : l’agent trouve un skill par son nom et sa description et le charge en entier quand la tâche s’y prête<b-proof href="https://developers.redhat.com/articles/2026/03/30/vibes-specs-skills-agents-ai-coding" quote="Naszcyniec, Red Hat: “A skill is not just a prompt; it is a directory containing a SKILL.md file” — developers.redhat.com"></b-proof>. Anthropic compare un skill à un guide d’accueil pour une nouvelle recrue<b-proof href="https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills" quote="Anthropic: “like putting together an onboarding guide for a new hire” — anthropic.com/engineering"></b-proof>. Pour <a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a>, créer des skills marque le quatrième niveau, où la personne ne s’assoit plus à côté de l’agent mais écrit des specs et des skills et s’en va.
  Andrew <a href="https://dev.to/0xandrewshu/turn-chats-into-skills-skills-into-scripts-2ndg" target="_blank" rel="noopener">Shu</a> a décrit comment tirer un skill d’un chat : si l’agent répète la même tâche, lui demander de relire la conversation et de la transformer en skill<b-proof href="https://dev.to/0xandrewshu/turn-chats-into-skills-skills-into-scripts-2ndg" quote="Shu: “ask it to reflect on the conversation and turn it into an Agent Skill” — dev.to/0xandrewshu"></b-proof>.

  Un exemple de skill tiré de l’article de Red Hat est le déploiement d’une application sur OpenShift. C’est un dossier ordinaire de trois fichiers : une instruction avec un nom et une description au début, un modèle et un script de vérification.
  <b-file-grid>
    <file name="SKILL.md">nom, description, étapes : vérifier la connexion, choisir le projet, appliquer le modèle, vérifier le résultat ; contraintes</file>
    <file name="deploy-template.yaml">le modèle de déploiement qu’utilise l’instruction</file>
    <file name="validate-route.sh">un script qui vérifie que l’application s’ouvre</file>
  </b-file-grid>
  <b-cap>Le skill contient déjà un script : il n’y a pas de frontière nette entre les étapes « skill » et « script », ce sont deux parties d’un même dossier.</b-cap>
  <b-finding>
    <ex>Après une construction réussie du rapport, l’agent, sur demande, a transformé l’ordre de construction en skill avec des étapes et un exemple du tableau final.</ex>
    <gen>Au début d’une session, un skill n’occupe dans le contexte que son nom et sa description et n’est chargé en entier qu’à l’appel. Les procédures nécessaires de temps en temps sont donc mieux gardées dans des skills, en ne laissant que le permanent dans le fichier de règles.</gen>
    <do>Si la même procédure s’est bien passée deux fois, demander à l’agent de la transformer en skill.</do>
  </b-finding>
</b-chapter>

<b-chapter id="script" title="Étape 5. Script : le code exécute les étapes" icon="code">
  <b-why>Un skill reste du texte, et le modèle l’exécute à nouveau à chaque fois. Un script est du code ordinaire : plus rapide, moins cher et identique à chaque exécution.</b-why>
  <a href="https://dev.to/0xandrewshu/turn-chats-into-skills-skills-into-scripts-2ndg" target="_blank" rel="noopener">Shu</a> les compare : un skill est non déterministe, car dix exécutions d’un même skill peuvent montrer des comportements sensiblement différents<b-proof href="https://dev.to/0xandrewshu/turn-chats-into-skills-skills-into-scripts-2ndg" quote="Shu: “running the same Skill 10 times can lead to different behavior” — dev.to/0xandrewshu"></b-proof>. Les scripts sont plus rapides, plus stables et ne dépensent pas de tokens, mais ils prennent du temps à écrire, sont plus rigides face aux conditions inattendues et peuvent casser. <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a> pose la règle plus simplement : confier le plus possible à la logique déterministe et ne laisser au modèle que la partie créative<b-proof href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" quote="Rezvov: “Delegate as much as possible to deterministic logic” — dev.to/arezvov"></b-proof>. <a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a> applique la même idée aux erreurs de l’agent : à côté de la règle dans le fichier, il écrit des outils programmés comme des scripts de captures d’écran et d’exécution de tests filtrés.
  <b-art names="ai-agent-maturity-levels/skill-script"></b-art>
  <b-cap>La même exécution dix fois : un skill montre de la dispersion et dépense des tokens, un script répète le résultat et ne dépense rien.</b-cap>
  <b-table>
    <table>
    <thead>
      <tr><th></th><th>Skill</th><th>Script</th></tr>
    </thead>
    <tbody>
      <tr><td><b>Ce que c’est</b></td><td>des instructions en langage naturel dans SKILL.md</td><td>du code en Bash, Python et langages similaires</td></tr>
      <tr><td><b>Qui l’exécute</b></td><td>le modèle, à nouveau à chaque fois</td><td>l’ordinateur, sans modèle</td></tr>
      <tr><td><b>Le résultat est-il identique</b></td><td>non : des différences sensibles entre exécutions sont possibles</td><td>oui, pour la même entrée</td></tr>
      <tr><td><b>Coût par exécution</b></td><td>des tokens à chaque exécution</td><td>des secondes et zéro token</td></tr>
      <tr><td><b>Quand cela convient</b></td><td>la procédure change, de la souplesse est nécessaire, elle s’exécute rarement</td><td>la procédure se répète, est coûteuse ou doit être prévisible</td></tr>
      <tr><td><b>Prix</b></td><td>moins de temps pour la créer</td><td>temps d’écriture, rigidité face à l’inattendu, maintenance</td></tr>
    </tbody>
    </table>
  </b-table>
  <b-cap>D’après le texte d’Andrew <a href="https://dev.to/0xandrewshu/turn-chats-into-skills-skills-into-scripts-2ndg" target="_blank" rel="noopener">Shu</a> « Turn chats into Skills, Skills into scripts » (19.09.2026). L’auteur souligne qu’il ne faut pas tout automatiser : un skill comme un script ont un coût de création et de maintenance.</b-cap>
  Un script est <b>extrait</b> d’un skill dès que le skill commence à se répéter. Faire un skill pour un tel travail devient non rentable : sur les mêmes données, un script se comporte de la même façon à chaque exécution, alors qu’un skill porte la dispersion dans le modèle lui-même. Cette dispersion produit des <a class="s-term" href="/materials/glossary/flaky-test/">tests instables</a> : la même étape sur les mêmes données passe parfois et échoue parfois, parce que l’agent se comporte un peu différemment à chaque fois. Un script n’a pas cette cause, donc pour un travail répétitif le déterminisme rapporte davantage.
  <b-callout icon="alert-circle">Beaucoup d’incertitude demeure : le format des données d’entrée, les lacunes, les valeurs inattendues. Les scripts commencent généralement à travailler avec des données, donc ce qui compte pour eux est la partie déterministe : la même entrée donne la même sortie et une erreur peut être reproduite. L’incertitude passe de l’étape à la vérification des données d’entrée.</b-callout>
  <b-finding>
    <ex>L’export de la base de données et le tableau croisé du rapport sont identiques chaque lundi, c’est donc le script report.py qui les a repris, et le modèle n’écrit que les conclusions.</ex>
    <gen>Shu intègre souvent des scripts dans les skills : le skill reste une enveloppe qui exécute les scripts, les relie et vérifie l’entrée et la sortie.</gen>
    <do>Transformer un skill en script quand il se répète, est complexe ou coûteux. Garder en skills les procédures rares et changeantes.</do>
  </b-finding>
</b-chapter>

<b-chapter id="crystal" title="Le coût d’une étape : ce qu’a mesuré Malik" icon="gauge">
  <b-why>Le passage d’un skill à un script est généralement décrit par des mots. Arun <a href="https://arxiv.org/abs/2607.07052" target="_blank" rel="noopener">Malik</a>, de l’équipe Azure Networking (Microsoft), l’a mesuré sur un système en production et l’a appelé « cristallisation progressive » : un comportement qu’un agent a trouvé et vérifié se transforme peu à peu en code déterministe<b-proof href="https://arxiv.org/abs/2607.07052" quote="Malik: “agent exploration should be a discovery mechanism, not a permanent execution model” — arxiv.org/abs/2607.07052"></b-proof>.</b-why>
  Le système de Malik traite des incidents dans un réseau cloud. Un nouvel incident est d’abord résolu par un agent, et son chemin est consigné. Si le chemin est confirmé par des succès répétés, il devient un modèle, puis un scénario hybride et enfin du code sans modèle. Les trois modes sont des étapes de la vie d’un même comportement découvert. C’est l’extraction aux dernières étapes : le chemin que l’agent a parcouru seul est extrait dans un modèle, puis un hybride, puis du code.
  <b-art names="ai-agent-maturity-levels/crystal-modes"></b-art>
  <b-cap>En montant l’échelle, le comportement est promu selon le nombre d’exécutions réussies et renvoyé en bas à un échec : la cristallisation est réversible.</b-cap>
  <b-table>
    <table>
    <thead>
      <tr><th>Mode</th><th>Comment il s’exécute</th><th>Le résultat est-il identique</th><th>Tokens par exécution</th></tr>
    </thead>
    <tbody>
      <tr><td><b>Agent</b> (Type 3)</td><td>des sous-agents raisonnent dans un périmètre limité, les étapes d’écriture attendent l’approbation d’une personne</td><td>environ 50 %</td><td>10 à 50 mille</td></tr>
      <tr><td><b>Hybride</b> (Type 2)</td><td>les étapes sont fixées, le modèle intervient à certaines phases : analyse, classification, résumé ; chaque action est vérifiée par rapport à un schéma</td><td>environ 90 %</td><td>1 à 5 mille</td></tr>
      <tr><td><b>Code</b> (Type 1)</td><td>logique écrite à l’avance, pas de modèle à l’exécution</td><td>100 %</td><td>0</td></tr>
    </tbody>
    </table>
  </b-table>
  <b-sublabel top="22">Quand promouvoir un mode</b-sublabel>
  <b-steps>
    <step t="Agent → hybride" hl>au moins 10 exécutions réussies, zéro violation de sécurité, au moins 90 % des exécutions donnent la même suite d’actions, les tests d’acceptation créés automatiquement passent.</step>
    <step t="Hybride → code">au moins 50 exécutions hybrides réussies, cohérence des réponses du modèle d’au moins 99 %, la règle couvre toutes les variantes d’entrée observées, la suite complète de régression passe sans le modèle, une personne a relu la logique finale.</step>
    <step t="Code → retour">à un échec, une violation de sécurité ou des tests en échec, le playbook est rétrogradé. Un exemple de l’article : après une mise à jour du firmware, le format de sortie d’une commande a changé, l’analyseur a échoué, le playbook est revenu à l’hybride et, après une série d’exécutions propres, a été promu de nouveau<b-proof href="https://arxiv.org/abs/2607.07052" quote="Malik: “Crystallization is not one-way” — arxiv.org/abs/2607.07052"></b-proof>.</step>
  </b-steps>
  <b-sublabel top="22">Ce que cela a donné en 8 mois</b-sublabel>
  <b-count-bars>
    <bar k="Code" w="45%" color="accent">45 %</bar>
    <bar k="Hybride" w="30%" color="c-light">30 %</bar>
    <bar k="Agent" w="25%" color="c-none">25 %</bar>
  </b-count-bars>
  <b-cap>Part des exécutions par mode à la fin du huitième mois (section VIII de l’article de <a href="https://arxiv.org/abs/2607.07052" target="_blank" rel="noopener">Malik</a>). Au début, presque toutes les exécutions se faisaient en mode « agent ».</b-cap>
  Le coût de l’agent par incident a chuté de plus de 70 % alors que le nombre d’incidents a à peu près doublé. Plus de 90 % des catégories typiques d’incidents sont résolues de façon autonome, et la part de corrections à faux positif reste sous 5 %. L’auteur formule ainsi la conclusion : la plateforme est devenue moins chère à mesure qu’elle en faisait plus, parce qu’elle a cessé de payer l’inférence pour un travail déjà appris<b-proof href="https://arxiv.org/abs/2607.07052" quote="Malik: “the platform got cheaper as it did more” — arxiv.org/abs/2607.07052"></b-proof>.
  <b-callout icon="alert-circle">Les réserves de l’auteur. Les résultats viennent d’une seule organisation et d’un seul domaine, les seuils doivent donc être recalculés. Ce sont des observations de la plateforme sur huit mois ; il n’y a pas de comparaison contrôlée. Le chiffre de 45 % désigne la part des exécutions servies par du code ; il ne peut pas être lu comme une part d’incidents résolus « sans IA ». Le gain est plus faible là où dominent des tâches ponctuelles réellement nouvelles.</b-callout>
  <b-callout icon="bulb">Le mot « cristallisation » apparaît aussi dans un autre article : Linghao Zhang (<a href="https://arxiv.org/abs/2603.10808" target="_blank" rel="noopener">arXiv 2603.10808</a>, 11.03.2026) décrit comment le savoir fragmenté issu de dialogues de travail est périodiquement consolidé en actifs structurés réutilisables. Dans l’article de Zhang, un dialogue devient du savoir, dans celui de Malik une trace d’exécution devient du code. Les deux décrivent le même mouvement le long de l’échelle : de la conversation vers ce qui est consigné.</b-callout>
  <b-finding>
    <ex>Dans le système de Malik, la part des exécutions sans modèle est passée de zéro à 45 % en huit mois, et le coût par incident a chuté de plus de 70 %.</ex>
    <gen>Le passage le long de l’échelle, du modèle au code, rapporte là où les mêmes tâches se répètent. L’autonomie est liée à l’historique accumulé des exécutions d’un scénario précis et croît avec lui ; un modèle plus puissant ne l’accorde pas à lui seul<b-proof href="https://arxiv.org/abs/2607.07052" quote="Malik: “A more capable model does not automatically earn more autonomy; a track record does” — arxiv.org/abs/2607.07052"></b-proof>.</gen>
    <do>Compter les exécutions réussies d’un skill. Dix atteintes sans échec : transformer les étapes répétables en script, et prévoir un retour à l’étape supérieure pour le jour où le script casse.</do>
  </b-finding>
</b-chapter>

<b-chapter id="harness" title="Étape 6. Harness : les erreurs deviennent des règles de l’environnement" icon="loop-double">
  <b-why>Quand les specs, les skills et les scripts existent, l’étape suivante est de construire un environnement autour de l’agent : un harness. C’est tout sauf le modèle lui-même, et il grandit à partir des erreurs : chaque tâche laisse une trace et la suivante se passe mieux.</b-why>
  <a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every</a> construit tout son guide autour d’une boucle de quatre étapes : Plan → Work → Review → Compound<b-proof href="https://every.to/guides/compound-engineering" quote="Every: “Plan → Work → Review → Compound → Repeat” — every.to/guides/compound-engineering"></b-proof>. Les trois premières étapes produisent une fonctionnalité, la quatrième produit un système qui construit mieux les fonctionnalités à chaque fois<b-proof href="https://every.to/guides/compound-engineering" quote="Every: “a system that builds features better each time” — every.to/guides/compound-engineering"></b-proof>. Selon Every, environ 80 % du temps d’un ingénieur devrait aller à la planification et à la relecture, et les 20 % restants au travail et à l’étape Compound.
  <b-art names="ai-agent-maturity-levels/compound-loop"></b-art>
  <b-cap>Les trois premières étapes produisent une fonctionnalité. La quatrième écrit la leçon dans des fichiers et des skills, de sorte que chaque tour suivant démarre mieux que le précédent.</b-cap>
  <b-steps round>
    <step t="Plan">une idée devient un plan : étudier l’exigence et le code, concevoir la solution et valider le plan.</step>
    <step t="Work">l’agent exécute le plan dans une branche séparée ; les tests et le linter s’exécutent après chaque changement.</step>
    <step t="Review">plusieurs agents vérifient le résultat, les constats reçoivent une priorité P1, P2 ou P3 et sont consignés.</step>
    <step t="Compound" hl>ce qui a marché et ce qui n’a pas marché est consigné dans les bons fichiers : notes dans CLAUDE.md, un document de solution dans docs/solutions/, de nouveaux agents et skills. La question de contrôle : le système rattrapera-t-il cette erreur tout seul la prochaine fois ?</step>
  </b-steps>
  <b-cap>D’après le guide d’Every. Les solutions sont stockées dans docs/solutions/ avec des métadonnées pour la recherche, les plans dans docs/plans/, les constats de relecture dans todos/.</b-cap>
  Birgitta <a href="https://martinfowler.com/articles/harness-engineering.html" target="_blank" rel="noopener">Böckeler</a> sépare un harness en deux sortes de contrôles : les « guides » fixent à l’avance le cap de l’agent, tandis que les « capteurs » observent le résultat et l’aident à se corriger<b-proof href="https://martinfowler.com/articles/harness-engineering.html" quote="Böckeler: guides “anticipate the agent's behaviour and aim to steer it before it acts”; sensors “observe after the agent acts and help it self-correct”"></b-proof>. Sa règle : quand un problème se répète, il faut améliorer les guides et les capteurs<b-proof href="https://martinfowler.com/articles/harness-engineering.html" quote="Böckeler: “Whenever an issue happens multiple times, the feedforward and feedback controls should be improved”"></b-proof>. La discipline de réglage d’un harness s’appelle harness engineering, et HDD (Harness-Driven Development) en est une méthode : chaque erreur de l’agent devient une règle de l’environnement, c’est-à-dire une instruction, une vérification ou une limite.
  <a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a> place un harness au niveau 6 : tests, linters et vérifications pour que l’agent voie le résultat de son propre travail. Il pose une condition : un retour est nécessaire, sinon le résultat est une machine à bâcler<b-proof href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" quote="Eledath: “If you want autonomy, you need backpressure” — bassimeledath.com"></b-proof>.
  <b-finding>
    <ex>L’agent s’est trompé sur un taux de change : la relecture a consigné la cause, une règle est apparue dans CLAUDE.md et une vérification du taux a été ajoutée au script.</ex>
    <gen>Un harness diffère d’un ensemble de fichiers en ce qu’une erreur se transforme automatiquement en trace : une règle, une vérification, un skill ou une modification de la spec. <a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a> appelle cette idée harness engineering. Plus dans l’article <a href="/blog/harness-driven-development/">Harness engineering en pratique</a>.</gen>
    <do>Après chaque erreur corrigée, poser une question : que consigner pour qu’elle ne se répète pas. Cette trace est l’étape Compound et une modification du harness.</do>
  </b-finding>
</b-chapter>

<b-chapter id="system" title="Étape 7. Système agentique : du code à la base, des agents aux endroits complexes" icon="boxes-link">
  <b-why>L’échelle se termine par un système agentique : un système construit sur des principes classiques dans lequel les blocs complexes sont remplacés par des agents, et où tout fonctionne ensemble dans un seul service. L’article montre comment y arriver : pas à pas, en extrayant dans du code et des vérifications ce qui se répète.</b-why>
  Le chemin commence par des agents : dans un chat et dans une session, un agent fait tout. À la fin du chemin, la part des agents reste petite, et la base du système est du code classique : scripts, vérifications, planning, données. Un agent ne prend que les endroits complexes qui, avant les grands modèles de langage, étaient résolus par des équipes de spécialistes du ML : analyse du texte des demandes, classification, mesure de similarité, résumé. C’est désormais une solution toute faite : un modèle est appelé comme une partie du service, donne une meilleure qualité et explique ses décisions en mots, de sorte que le raisonnement peut être lu et vérifié. Le système dans son ensemble reste prévisible parce que la partie complexe est entourée de vérifications déterministes.
  Les chiffres de <a href="https://arxiv.org/abs/2607.07052" target="_blank" rel="noopener">Malik</a> vont dans le même sens : en huit mois, la part des exécutions par du code sans modèle est montée à 45 %, tandis que l’agent est resté à 25 % des exécutions. Les échelles d’<a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a> (niveaux 7 et 8 : agents d’arrière-plan et équipes d’agents), de <a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a> (la « dark factory », une boîte noire qui transforme des specs en logiciel) et de <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a> (une personne ne crée que des tickets dans un tracker pendant que les agents les prennent eux-mêmes, et la sécurité est la principale barrière) continuent vers une autonomie croissante. Pour qu’une telle autonomie ne casse pas, il lui faut un harness, l’étape ci-dessus.
  <b-finding>
    <ex>Le rapport hebdomadaire : un script calcule l’export et le tableau croisé, les règles et vérifications vivent dans le harness, et l’agent ne traite que le texte libre des commentaires des responsables.</ex>
    <gen>Un système agentique repose sur du code et des vérifications, et un agent ne résout que ce qui ne peut pas l’être autrement. La part des agents y est petite, et la prévisibilité vient de la base déterministe.</gen>
    <do>Avant de confier un bloc à un agent, se demander s’il peut s’écrire comme du code ou une vérification. Ne laisser à l’agent que ce que le code ne résout pas, et mettre des vérifications sur l’entrée et la sortie.</do>
  </b-finding>
</b-chapter>

<b-chapter id="traps" title="Pièges à chaque étape" icon="alert-circle">
  <b-why>Chaque étape a une erreur typique qui arrête la montée ou la rend trop coûteuse. Le tableau est assemblé à partir des réserves des auteurs eux-mêmes.</b-why>
  <b-table>
    <table>
    <thead>
      <tr><th>Étape</th><th>Piège typique</th><th>Qui en parle</th><th>Comment en sortir</th></tr>
    </thead>
    <tbody>
      <tr><td><b>1. Chat</b></td><td>faire passer du texte dans les deux sens au lieu de laisser l’agent travailler sur les fichiers</td><td><a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a> : un travail sérieux demande un agent</td><td>donner à l’agent l’accès au projet et un moyen de vérifier le résultat</td></tr>
      <tr><td><b>2. <a class="s-term" href="/materials/glossary/ai-agent/">Agent</a></b></td><td>la personne approuve chaque action pendant que le fichier de règles grossit sans tri</td><td><a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every</a> : la plupart restent bloqués ici ; <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a> : de mauvaises règles sont pires que pas de règles</td><td>planifier à l’avance, garder les règles courtes et relire chaque ligne</td></tr>
      <tr><td><b>3. <a class="s-term" href="/materials/glossary/spec-driven-development/">Spec</a></b></td><td>une spec pour la moindre bricole : Kiro a transformé un petit bug en 4 user stories et 16 critères d’acceptation</td><td><a href="https://www.martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html" target="_blank" rel="noopener">Böckeler</a> (Thoughtworks)</td><td>écrire une spec pour les tâches de plus d’une journée et laisser les petites corrections sans spec</td></tr>
      <tr><td><b>4. <a class="s-term" href="/materials/glossary/agent-skills/">Skill</a></b></td><td>un skill pour tout : il a un coût de création et de maintenance</td><td><a href="https://dev.to/0xandrewshu/turn-chats-into-skills-skills-into-scripts-2ndg" target="_blank" rel="noopener">Shu</a></td><td>faire un skill après deux répétitions réussies, pas à l’avance</td></tr>
      <tr><td><b>5. Script</b></td><td>promotion prématurée : un modèle vu seulement quelques fois se révèle peu fiable</td><td><a href="https://arxiv.org/abs/2607.07052" target="_blank" rel="noopener">Malik</a> : la qualité dépend des tests construits à partir des exécutions</td><td>un seuil sur le nombre d’exécutions et un retour d’un cran en haut à un échec</td></tr>
      <tr><td><b>6. Harness</b></td><td>la relecture humaine devient le goulot d’étranglement ; des vérifications écrites par le même agent confirment n’importe quoi</td><td><a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a> : la relecture humaine devient le goulot d’étranglement ; <a href="https://law.stanford.edu/2026/02/08/built-by-agents-tested-by-agents-trusted-by-whom/" target="_blank" rel="noopener">Stanford CodeX</a> : des agents ont écrit un bouchon (stub) qui renvoie toujours « succès »</td><td>les vérifications doivent être indépendantes de l’agent et la relecture en partie automatisée</td></tr>
      <tr><td><b>7. Système agentique</b></td><td>les agents reçoivent ce que le code pourrait résoudre : le prix et la dispersion des résultats augmentent</td><td><a href="https://arxiv.org/abs/2607.07052" target="_blank" rel="noopener">Malik</a> : le comportement trouvé par un agent passe dans le code selon le nombre d’exécutions réussies</td><td>ne mettre un agent que sur l’endroit complexe et extraire dans du code ce qui se répète</td></tr>
    </tbody>
    </table>
  </b-table>
  <b-cap>Le cas du bouchon de StrongDM est discuté <a href="https://law.stanford.edu/2026/02/08/built-by-agents-tested-by-agents-trusted-by-whom/" target="_blank" rel="noopener">dans l’article de Stanford CodeX</a>.</b-cap>
  <b-finding>
    <ex>L’agent a écrit à la fois le code et la vérification, et la vérification renvoyait simplement « succès » : le système paraissait vert et ne vérifiait rien.</ex>
    <gen>Plus l’étape est haute, plus une erreur de consignation coûte cher : une mauvaise règle, une mauvaise vérification ou un script prématuré touche toutes les exécutions suivantes.</gen>
    <do>Avant de consigner quelque chose, se demander : qui vérifiera cette trace et comment ? S’il n’y a personne, garder le savoir un cran plus bas.</do>
  </b-finding>
</b-chapter>

<b-chapter id="stop" title="Quand s’arrêter" icon="target">
  <b-why>Les étapes hautes coûtent plus cher que les basses, et toutes les équipes n’en ont pas besoin.</b-why>
  <b-table>
    <table>
    <thead>
      <tr><th>Ce que dit la source</th><th>Ce que cela signifie en pratique</th></tr>
    </thead>
    <tbody>
      <tr><td><a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a> : la plupart des équipes devraient viser le niveau 5 ; au-dessus, le débit croît mais pas la capacité à comprendre et vérifier le résultat</td><td>des règles écrites, des deterministic tooling et un contexte partagé comptent souvent plus qu’une automatisation maximale</td></tr>
      <tr><td><a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a> : pour le travail quotidien, le levier est au niveau 7 ; l’auteur voit le niveau 8 comme une frontière que personne ne maîtrise encore</td><td>des agents d’arrière-plan avec des vérifications sont aujourd’hui une limite supérieure raisonnable</td></tr>
      <tr><td><a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a> : au niveau 3, beaucoup de gens ont l’impression que les choses ont empiré parce que le travail se réduit à lire des diffs</td><td>après la première accélération, un creux est possible ; on le franchit en passant aux specs et aux skills, sans revenir au chat</td></tr>
      <tr><td><a href="https://dev.to/0xandrewshu/turn-chats-into-skills-skills-into-scripts-2ndg" target="_blank" rel="noopener">Shu</a> : un skill comme un script ont un coût de création et de maintenance</td><td>automatiser ce qui se répète vraiment</td></tr>
      <tr><td><a href="https://arxiv.org/abs/2607.07052" target="_blank" rel="noopener">Malik</a> : le gain est plus faible là où dominent de nouvelles tâches ponctuelles</td><td>pour un travail exploratoire, rester sur un agent avec une spec</td></tr>
    </tbody>
    </table>
  </b-table>
  <b-finding>
    <ex>Dans l’échelle de <a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a>, le septième niveau est à part : il le dit plus proche d’une remise à zéro que d’une suite.</ex>
    <gen>Monter l’échelle a du sens tant qu’elle réduit le travail de la personne ; le nombre de fichiers dans un dépôt ne prouve rien.</gen>
    <do>Avant chaque passage, vérifier : la tâche se répète-t-elle ? Le résultat peut-il être vérifié automatiquement ? Sinon, rester à l’étape actuelle.</do>
  </b-finding>
</b-chapter>

<b-chapter id="start" title="Par où commencer : des prompts prêts pour l’agent" icon="play">
  <b-why>Quatre prompts qui font monter le savoir d’un cran, c’est-à-dire l’extraient de l’étape inférieure. Mettre sa propre tâche à la place des crochets.</b-why>
  <b-sublabel top="12">D’un chat à un fichier de règles</b-sublabel>
  <b-prompt>
    Relis ce dialogue. Trouve les endroits où je t’ai corrigé ou où j’ai répété la même chose.
    Pour chacun, écris une courte ligne de règle pour le fichier CLAUDE.md.
    N’ajoute pas de conseils généraux, uniquement ce qui figurait dans le dialogue.
  </b-prompt>
  <b-sublabel top="22">Des règles à une spec</b-sublabel>
  <b-prompt>
    Tâche : [description]. Avant d’écrire du code, rédige spec.md :
    ce qui doit être produit, d’où viennent les données, quelles sont les contraintes et comment savoir que la tâche est terminée.
    Pose-moi des questions s’il manque quelque chose.
  </b-prompt>
  <b-sublabel top="22">D’une bonne exécution à un skill</b-sublabel>
  <b-prompt>
    Relis ce dialogue et transforme la procédure que tu y as suivie en skill : un dossier avec SKILL.md,
    un nom et une description au début, puis des instructions pas à pas, des contraintes et un exemple de résultat.
  </b-prompt>
  <b-sublabel top="22">D’un skill à un script</b-sublabel>
  <b-prompt>
    Regarde le skill [nom]. Repère les étapes qui s’exécutent de la même façon à chaque fois et écris pour elles un script Python.
    Ne laisse dans le skill que le lancement du script et la vérification du résultat.
  </b-prompt>
  <b-finding>
    <ex>Quatre prompts remplacent une discussion sur « comment adopter l’IA » : chacun fait monter exactement une portion de savoir d’un cran.</ex>
    <gen>Il y a une seule règle de passage : cela s’est répété une deuxième fois — l’écrire ; la trace se répète et est stable — la transformer en code.</gen>
    <do>Commencer par le prompt qui correspond à son étape actuelle d’après le tableau du début de l’article.</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Questions fréquentes">
  <b-faq-cards>
    <q t="Quels niveaux de maturité existent pour le travail avec l’IA en développement ?">Il n’y a pas d’échelle unique. Cet article compte sept étapes, <a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every</a> six étapes du développement manuel aux agents cloud en parallèle, <a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a> huit niveaux, <a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a> sept, et <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a> et <a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a> six chacun (niveaux 0 à 5). Tous s’accordent sur le chemin : d’un chat à un agent, puis à des règles écrites et des specs, et enfin à un système autonome.</q>
    <q t="Qu’est-ce que le compound engineering ?">Une approche d’Every dans laquelle chaque tâche terminée laisse une trace qui aide les tâches suivantes : la boucle Plan → Work → Review → Compound. La dernière étape écrit la leçon dans CLAUDE.md, des documents de solutions, des skills et des agents.</q>
    <q t="En quoi un skill diffère-t-il d’un script ?">Un skill est une instruction textuelle que le modèle exécute de nouveau à chaque fois, donc les résultats peuvent différer. Un script est du code ordinaire : plus rapide, moins cher et donnant le même résultat, mais plus long à écrire et plus rigide face aux conditions inattendues.</q>
    <q t="Faut-il atteindre la « dark factory » ?">Non. Clark conseille à la plupart des équipes de s’arrêter au niveau 5, et Eledath désigne le niveau 7 comme le point de levier principal. Ne monter plus haut que si les tâches se répètent et que le résultat peut être vérifié automatiquement.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Pour aller plus loin">
  <b-links cols="2">
    <item href="/blog/harness-driven-development/" k="Méthode" t="Harness-Driven Development">Une erreur de l’agent → une règle de l’environnement</item>
    <item href="/blog/specs-rules-skills/" k="Contexte" t="AGENTS.md, CLAUDE.md et spec.md">Quoi mettre où : specs, règles, skills</item>
    <item href="/blog/spec-reconcile-loop/" k="Specs" t="La boucle de réconciliation de la spec">Comment une spec apprend d’un système en marche</item>
    <item href="/blog/specs-by-aggregates/" k="Specs" t="Spécifications par agrégats">Comment découper une grande spec en parties</item>
    <item href="/blog/quality-gates-ai-agents/" k="Portes" t="Que sont les portes de qualité pour les agents IA">quelles vérifications placer aux étapes de l’échelle</item>
    <item href="/blog/agent-escalation-to-human/" k="Escalade" t="Escalade vers un humain pour les agents IA">comment un agent s’arrête et demande</item>
  </b-links>
</b-chapter>
<b-footer>D’après les sources primaires : <a href="https://every.to/guides/compound-engineering" target="_blank" rel="noopener">Every</a> (compound engineering), <a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank" rel="noopener">Hashimoto</a> (05.02.2026), <a href="https://www.bassimeledath.com/blog/levels-of-agentic-engineering" target="_blank" rel="noopener">Eledath</a> (10.03.2026), <a href="https://dev.to/arezvov/five-levels-of-ai-agent-adoption-in-software-development-teams-50pi" target="_blank" rel="noopener">Rezvov</a> (06.04.2026), <a href="https://www.hyperact.co.uk/blog/7-levels-of-ai-assisted-development" target="_blank" rel="noopener">Clark</a> (05.01.2026), <a href="https://www.danshapiro.com/blog/2026/01/the-five-levels-from-spicy-autocomplete-to-the-software-factory/" target="_blank" rel="noopener">Shapiro</a> (23.01.2026), <a href="https://developers.redhat.com/articles/2026/03/30/vibes-specs-skills-agents-ai-coding" target="_blank" rel="noopener">Red Hat</a> (30.03.2026), <a href="https://dev.to/0xandrewshu/turn-chats-into-skills-skills-into-scripts-2ndg" target="_blank" rel="noopener">Shu</a> (19.09.2026), <a href="https://arxiv.org/abs/2607.07052" target="_blank" rel="noopener">Malik</a> (arXiv 2607.07052, 08.07.2026), Zhang (arXiv 2603.10808), <a href="https://martinfowler.com/articles/harness-engineering.html" target="_blank" rel="noopener">Böckeler</a> (martinfowler.com). Les six étapes sont assemblées à partir de ces sources selon le critère « ce qui est consigné » ; les auteurs n’ont pas d’échelle unique avec cette suite.</b-footer>
</b-post>
