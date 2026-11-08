---
title: Installation et commandes d’OpenSpec : un exemple de changement, du plan à la fusion
date: 2026-11-07
updated: 2026-11-08
description: Comment fonctionne OpenSpec de Fission AI : un dossier de changement avec un plan, des exigences et des tâches, trois commandes pour l’agent et une fusion dans les spécifications communes. Installation en deux commandes, un vrai changement du dépôt du site urvanov.com, comparaison avec Spec Kit et prompts prêts pour démarrer.
tags: IA, OpenSpec, spécifications, Spec-Driven Development, Claude Code, Codex, Cursor
category: specs
layout: wide
mentions: OpenSpec, Spec-Driven Development, Spec Kit, Claude Code, Codex, Cursor, GitHub Copilot
toc: what=Ce que c’est | install=Installation | flow=Trois commandes | example=Exemple | kit=OpenSpec ou Spec Kit | start=Comment commencer | faq=Questions | next=Pour aller plus loin
---

OpenSpec est un framework open source gratuit pour le développement piloté par les spécifications (Spec-Driven Development). Avant tout code, un agent IA écrit dans le dossier du projet un plan de changement : pourquoi ce changement, les exigences, l’approche et les tâches. Vous relisez le plan, l’agent écrit le code d’après les tâches, et les exigences terminées fusionnent dans les spécifications communes du projet. Ci-dessous : l’installation, trois commandes et le déroulé d’un vrai changement.

<b-post series="specs">
<b-chapter id="what" icon="file-lines" title="Ce qu’est OpenSpec">
  <b-why align="left">Sans plan, un agent écrit du code directement à partir d’un message de chat. L’intention ne vit que dans ce chat : une semaine plus tard, personne ne se souvient pourquoi on a fait ainsi, et l’agent suivant repart de zéro et peut refaire les choses à sa façon.</b-why>
  <iso-art name="openspec/chat-vs-files"></iso-art>
  <b-why align="left">À gauche, la méthode habituelle : vous dites à l’agent « fais comme ça », puis « et aussi ça », et il écrit du code. Le code reste, mais l’explication de sa forme reste dans l’historique du chat. À droite, le travail avec OpenSpec : l’agent met d’abord un plan dans les fichiers du projet, vous lisez et corrigez ce plan, et seulement ensuite l’agent écrit le code strictement d’après lui. Le plan est stocké dans le dépôt avec le code, où chaque coéquipier et chaque agent ultérieur peut le voir.</b-why>
  <b-why align="left">OpenSpec sort l’intention du chat pour la mettre dans des fichiers à côté du code. Chaque changement a son propre dossier dans <code>openspec/changes</code> : on y note pourquoi, quelles exigences changent, comment faire et en quelles étapes. Les exigences vivantes de tout le système se trouvent séparément, dans <code>openspec/specs</code>. C’est du Markdown simple sans syntaxe particulière<b-proof href="https://github.com/Fission-AI/OpenSpec" quote="OpenSpec: «Plain Markdown — requirements with concrete scenarios, no special syntax to learn» — github.com/Fission-AI/OpenSpec"/> ; les personnes comme l’agent le lisent.</b-why>
  <iso-art name="term:openspec"></iso-art>
  <b-why align="left">Le schéma montre deux parties. Le dossier de changement est un brouillon : il contient ce que vous allez modifier. Les spécifications communes décrivent le système tel qu’il est déjà. Tant qu’un changement est en cours, les spécifications communes ne sont pas touchées. Quand le code est prêt, les exigences du dossier de changement passent dans les spécifications communes, et la description du système correspond de nouveau au code. Chaque changement comprend quatre fichiers :</b-why>
  <b-table>
  | Fichier | À quelle question il répond | Ce qu’il contient |
  |---|---|---|
  | <code>proposal.md</code> | Pourquoi ? | la raison du changement et ce qui change exactement |
  | <code>specs/</code> | Qu’est-ce qui doit être vrai ? | des exigences avec SHALL et MUST et des scénarios « quand — alors » |
  | <code>design.md</code> | Comment ? | décisions techniques, objectifs, non-objectifs, risques |
  | <code>tasks.md</code> | Dans quel ordre ? | une liste de tâches que suit l’agent |
  </b-table>
  <b-finding>
    <ex>Les quatre fichiers d’un changement répondent à quatre questions : pourquoi, quoi, comment et dans quel ordre.</ex>
    <gen>Le plan se trouve à côté du code et est relu avant que l’agent ne commence à écrire. Un défaut dans l’idée apparaît dans un paragraphe de texte, avant d’arriver dans le code.</gen>
    <do>Avant un gros changement, demandez à l’agent de mettre d’abord un plan dans un dossier de changement, et seulement ensuite d’écrire le code.</do>
  </b-finding>
</b-chapter>

<b-chapter id="install" icon="terminal" title="Installation">
  <b-why align="left">OpenSpec a deux parties. La première est le programme en ligne de commande <code>openspec</code> : il s’installe une fois par ordinateur. La seconde est la configuration d’un projet précis : <code>openspec init</code> y crée un dossier <code>openspec/</code> et ajoute à vos agents des commandes comme <code>/opsx:propose</code>.</b-why>
  <iso-art name="openspec/install"></iso-art>
  <b-why align="left">L’ordre sur le schéma : d’abord le programme apparaît sur l’ordinateur, puis un dossier <code>openspec/</code> apparaît dans le projet avec deux sous-dossiers — <code>specs</code> pour les exigences vivantes et <code>changes</code> pour les changements en cours — et enfin vos agents reçoivent de nouvelles commandes. Le code du projet lui-même ne change pas : seuls le dossier des plans et les fichiers de commandes pour les agents sont ajoutés. La commande pour macOS et Linux :</b-why>
  <b-codebox title="Installation sur macOS et Linux">
    curl -fsSL https://openspec.dev/cli/install.sh | sh
  </b-codebox>
  <b-why align="left">Si vous préférez npm, il faut Node.js 22.12 ou plus récent<b-proof href="https://github.com/Fission-AI/OpenSpec" quote="OpenSpec: «npm install -g @fission-ai/openspec@latest (needs Node.js 22.12.0 or higher)» — github.com/Fission-AI/OpenSpec"/>. Windows a son propre script d’installation PowerShell, et macOS une formule Homebrew. Ouvrez ensuite le dossier du projet et activez OpenSpec :</b-why>
  <b-codebox title="Via npm et dans le projet">
    npm install -g @fission-ai/openspec@latest
    cd your-project
    openspec init
  </b-codebox>
  <b-why align="left"><code>openspec init</code> demande quels agents vous utilisez et installe des commandes pour ceux-là précisément. Le nom de la commande diffère selon l’agent : <code>/opsx:propose</code> dans Claude Code, <code>/opsx-propose</code> dans Cursor et GitHub Copilot, <code>$openspec-propose</code> dans Codex<b-proof href="https://github.com/Fission-AI/OpenSpec" quote="OpenSpec: «/opsx:propose is the canonical name; your tool may spell it /opsx-propose (Cursor, GitHub Copilot), @opsx-propose (Amazon Q) or $openspec-propose (Codex)» — github.com/Fission-AI/OpenSpec"/>. Le reste de l’article utilise l’écriture de Claude Code.</b-why>
  <b-why align="left">Si le projet utilise plusieurs agents, par exemple une partie de l’équipe travaille dans Cursor et une autre dans Claude Code, cochez-les tous : le plan de changement est commun, et chaque agent reçoit ses propres commandes. Le programme est gratuit, tourne en local et n’exige aucun compte.</b-why>
  <b-finding>
    <ex>Deux commandes : l’une installe le programme, l’autre prépare le projet et connecte les agents.</ex>
    <gen>Inutile de tout configurer à la main : OpenSpec propose un prompt prêt avec lequel l’agent installe le programme, lance <code>openspec init</code> et vérifie le résultat.</gen>
    <do>Demandez à l’agent : « Installe OpenSpec et lance openspec init dans ce projet, montre quelles commandes sont apparues ».</do>
  </b-finding>
</b-chapter>

<b-chapter id="flow" icon="list-arrow" title="Trois commandes : plan, code, fusion">
  <b-why align="left">Le travail suit une boucle de trois commandes. Avant elles, on peut réfléchir à voix haute avec <code>/opsx:explore</code> : l’agent lit le code, propose des options et ne change rien. Une fois clair ce qu’il faut faire, le chemin principal commence.</b-why>
  <iso-art name="openspec/loop"></iso-art>
  <b-why align="left">Lisez la boucle dans le sens des aiguilles d’une montre. La première commande, <code>/opsx:propose</code>, demande à l’agent d’écrire un plan : il crée un dossier de changement et quatre fichiers. C’est ensuite à vous : vous lisez le plan et le corrigez dans le chat ou directement dans les fichiers. C’est le principal point de contrôle, car corriger un paragraphe de texte coûte moins cher que réécrire du code terminé. La deuxième commande, <code>/opsx:apply</code>, lance le travail d’après les tâches : l’agent prend les tâches de <code>tasks.md</code> une à une et coche chacune. La troisième commande, <code>/opsx:archive</code>, clôt le changement : les exigences passent dans les spécifications communes, et le dossier part aux archives avec tout son historique de décisions. Le changement suivant part des spécifications mises à jour.</b-why>
  <b-why align="left">Voici à quoi ressemble une courte session dans le terminal. Une session type d’après la démo de la description d’OpenSpec<b-proof href="https://github.com/Fission-AI/OpenSpec" quote="OpenSpec: «You: /opsx:propose add-dark-mode / AI: Created openspec/changes/add-dark-mode/ ✓ proposal.md ✓ specs/ ✓ design.md ✓ tasks.md … You: /opsx:archive / AI: Archived to openspec/changes/archive/… Specs updated.» — github.com/Fission-AI/OpenSpec"/> :</b-why>
  <b-agent-term app="Claude&#8203; Code" ver="v2" model="OpenSpec · /opsx" path="~/projects/shop">
    <line kind="ask">/opsx:propose add-dark-mode</line>
    <line kind="act">Created openspec/changes/add-dark-mode/</line>
    <line kind="out">proposal.md · specs/ · design.md · tasks.md</line>
    <line kind="you" note="vous relisez le plan">Ajoute un scénario : le thème survit à un rechargement</line>
    <line kind="ask">/opsx:apply</line>
    <line kind="act">1.1 theme context ✓ · 1.2 toggle ✓ · 2.1 colours ✓</line>
    <line kind="out">all tasks complete</line>
    <line kind="ask">/opsx:archive</line>
    <line kind="act">Exigences déplacées dans openspec/specs, dossier du changement envoyé aux archives</line>
  </b-agent-term>
  <b-table>
  | Commande | Ce que fait l’agent | Ce qui apparaît dans le projet | Ce que vous faites |
  |---|---|---|---|
  | <code>/opsx:explore</code> | lit le code, propose des options | rien | choisir une option |
  | <code>/opsx:propose</code> | écrit le plan du changement | un dossier <code>openspec/changes/name/</code> avec quatre fichiers | lire et corriger le plan |
  | <code>/opsx:apply</code> | écrit le code d’après les tâches, les coche | code et tests | vérifier le résultat |
  | <code>/opsx:archive</code> | fusionne les exigences dans les spécifications communes | <code>openspec/specs</code> mis à jour, dossier archivé | rien, c’est la fin |
  </b-table>
  <b-why align="left">Pour les grosses tâches, il existe un jeu étendu : créer un changement pas à pas, en continuer un en cours, vérifier le code par rapport à la spécification. Activez-le avec <code>openspec config profile</code>.</b-why>
  <b-finding>
    <ex>Après l’archivage, <code>openspec/specs</code> contient la description actuelle du système, et l’historique des décisions se trouve dans les archives des changements.</ex>
    <gen>Les spécifications sont mises à jour dans la même étape que le code : elles ne vieillissent donc pas comme un wiki à part.</gen>
    <do>Ne sautez pas l’archivage : sans lui, le changement suivant s’appuie sur d’anciennes exigences.</do>
  </b-finding>
</b-chapter>

<b-chapter id="example" icon="notebook" title="Exemple : un changement dans le dépôt du site urvanov.com">
  <b-why align="left">Cet exemple vient du dépôt d’urvanov.com, le site où cet article est publié. Le code du site contient un dossier <code>openspec/</code> où ce changement est conservé. Le site a un <a href="/patterns">catalogue de patterns d’IA</a> : 73 techniques pour travailler avec des agents IA, regroupées en 10 thèmes comme le contexte et la mémoire, l’orchestration, la sécurité et le contrôle qualité. Chaque technique est présentée sous forme de carte. Le catalogue a été réalisé en complément de l’exposé « Spec-Driven Development in Practice » à la conférence Podlodka Crew.</b-why>
  <b-why align="left">Le problème : au clic, 72 des 73 cartes n’affichaient qu’un nom et une ligne de description. Chaque carte devait s’ouvrir en entier : quel problème la technique résout, comment elle fonctionne, une citation d’un praticien, quand elle marche et quand elle casse. La matière existait déjà dans des notes de recherche ; il fallait la transférer avec soin, sans rien inventer. Le changement s’appelait <code>fill-all-pattern-details</code>. Voici ce que l’agent a écrit dans ses quatre fichiers :</b-why>
  <b-table>
  | Fichier | Ce qu’il contenait |
  |---|---|
  | <code>proposal.md</code> | pourquoi : le catalogue est une pièce clé de l’exposé et des cartes vides le gâchent ; ce qui change : les 73 techniques reçoivent une description détaillée |
  | <code>design.md</code> | une tâche par catégorie de patterns ; des citations uniquement tirées du fichier source, rien d’inventé ; un schéma seulement là où il y a un flux de données |
  | <code>specs/pattern-detail/spec.md</code> | l’exigence « chaque pattern a un détail rempli » et trois scénarios d’affichage d’une carte |
  | <code>tasks.md</code> | 10 tâches pour 10 catégories, toutes cochées |
  </b-table>
  <b-why align="left">Ci-dessous, un extrait du fichier d’exigences. SHALL marque une exigence obligatoire. Un Scenario est une vérification : WHEN décrit la situation, THEN ce qui doit se produire. Ici, detail est la description complète d’une technique, et problem et solution sont ses parties « problème » et « solution ».</b-why>
  <b-codebox title="Extrait d’une exigence de specs/pattern-detail/spec.md">
    ## MODIFIED Requirements
    ### Requirement: Pattern detail content structure
    All patterns in all categories SHALL have a filled detail.
    #### Scenario: Partial content
    - WHEN the user opens a pattern that has only problem and solution
    - THEN the card shows only those sections, with no empty blocks
  </b-codebox>
  <b-why align="left">La décision « des citations uniquement tirées de la source » a été écrite dans design.md avant le code. L’agent n’a donc pas inventé de citations là où il n’y en avait pas, et le scénario « contenu partiel » fixait à l’avance l’aspect d’une carte sans citation ni schéma.</b-why>
  <b-why align="left">Le travail a compté 10 tâches, une par thème du catalogue. Les 10 tâches sont cochées, mais la commande d’archivage n’a jamais été lancée : le dossier du changement est toujours dans <code>openspec/changes</code>, et le site n’a pas de spécifications communes. C’est une erreur fréquente. L’exigence « chaque technique a une description détaillée » ne vit que dans le brouillon du changement, et l’agent suivant qui lira les spécifications communes ne la connaîtra pas. Une seule commande <code>/opsx:archive</code> la déplacerait dans les spécifications communes.</b-why>
  <b-finding>
    <ex>Le scénario « contenu partiel » est apparu dans le plan avant le code et a fixé le comportement d’une carte sans citation ni schéma.</ex>
    <gen>Des exigences avec des scénarios « quand — alors » se lisent comme des tests : l’agent sait ce qui compte comme terminé.</gen>
    <do>Dans chaque exigence, écrivez au moins un scénario pour un cas limite : données vides, données partielles, une erreur.</do>
  </b-finding>
</b-chapter>

<b-chapter id="kit" icon="crosshair" title="OpenSpec ou Spec Kit">
  <b-why align="left">Les deux pilotent le développement à partir d’une spécification, mais ils conçoivent l’ordre différemment. Spec Kit de GitHub traverse les phases strictement l’une après l’autre. OpenSpec permet de revenir au plan à tout moment et est conçu pour un projet où du code existe déjà<b-proof href="https://github.com/Fission-AI/OpenSpec" quote="OpenSpec: «fluid not rigid → iterative not waterfall → easy not complex → built for brownfield not just greenfield» — github.com/Fission-AI/OpenSpec"/>.</b-why>
  <b-table>
  | | OpenSpec | Spec Kit |
  |---|---|---|
  | Ordre des étapes | souple : on peut revenir au plan à tout moment | phases fixes : principes, spécification, plan, tâches, code |
  | Où vivent les spécifications | <code>openspec/specs</code> et les dossiers de changement | un dossier de fonctionnalité avec une spécification, un plan et des tâches |
  | Quel projet | convient à du code qui tourne déjà | convient à une nouvelle fonctionnalité partie de zéro |
  | Plusieurs dépôts | un stockage commun des plans (Stores, bêta) | chaque dépôt séparément |
  | Réalisé par | Fission AI | GitHub |
  </b-table>
  <b-finding>
    <ex>OpenSpec se décrit comme souple et conçu pour du code existant.</ex>
    <gen>Spec Kit guide pas à pas et convient à une équipe qui a besoin de discipline. OpenSpec est plus léger et s’installe plus vite dans un projet où du code existe déjà.</gen>
    <do>Pour des changements dans un projet en production, commencez par OpenSpec ; pour une grosse fonctionnalité neuve partie de zéro, essayez les deux sur une même tâche.</do>
  </b-finding>
</b-chapter>

<b-chapter id="start" icon="flag" title="Comment commencer">
  <b-why align="left">Commencez par un petit changement que vous comptiez faire de toute façon. Cinq prompts pour l’agent, un par étape : collez-les dans Claude Code, Codex ou Cursor et remplissez votre tâche.</b-why>
  <b-hdd-steps>
    <step t="Installation">« Installe OpenSpec et lance openspec init dans ce projet. Montre quelles commandes sont apparues »</step>
    <step t="Exploration">« /opsx:explore Je veux ajouter … Regarde le code et propose deux options sans rien changer »</step>
    <step t="Plan">« /opsx:propose … Seulement le plan d’abord. Donne dans les exigences des scénarios pour des données vides et partielles »</step>
    <step t="Code">« /opsx:apply Fais les tâches une par une et lance les tests après chacune »</step>
    <step t="Fusion">« /opsx:archive Déplace les exigences dans les spécifications et montre ce qui a changé dans openspec/specs »</step>
  </b-hdd-steps>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Questions fréquentes">
  <b-faq-cards>
    <q t="Qu’est-ce qu’OpenSpec ?">Un framework open source gratuit de Fission AI pour le développement piloté par les spécifications. L’agent écrit un plan de changement dans des fichiers Markdown, vous le relisez, l’agent écrit le code, et les exigences fusionnent dans les spécifications communes du projet.</q>
    <q t="Comment installer OpenSpec ?">Avec curl -fsSL https://openspec.dev/cli/install.sh | sh sur macOS et Linux, ou avec npm install -g @fission-ai/openspec@latest. Lancez ensuite openspec init dans le dossier du projet.</q>
    <q t="En quoi OpenSpec diffère-t-il de Spec Kit ?">OpenSpec est plus souple et conçu pour du code qui tourne déjà ; les étapes peuvent se répéter dans n’importe quel ordre. Spec Kit de GitHub suit des phases fixes : principes, spécification, plan, tâches, code.</q>
    <q t="Avec quels agents OpenSpec fonctionne-t-il ?">Claude Code, Codex, Cursor, GitHub Copilot, Amazon Q et d’autres. openspec init installe des commandes pour les agents choisis.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Pour aller plus loin">
  <b-links>
    <item href="/blog/specs-rules-skills/" k="Contexte" t="AGENTS.md et CLAUDE.md">ce qu’un agent doit savoir d’un projet et où le conserver</item>
    <item href="/blog/specs-by-aggregates/" k="Spécifications" t="Spécifications par agrégats">comment découper les exigences en parties</item>
    <item href="/blog/spec-reconcile-loop/" k="Spécifications" t="Une boucle de réconciliation pour les spécifications">comment garder la spécification et le code d’accord</item>
    <item href="/materials/glossary/spec-driven-development/" k="Terme" t="Spec-Driven Development">ce qu’est le développement piloté par les spécifications</item>
  </b-links>
</b-chapter>
</b-post>
