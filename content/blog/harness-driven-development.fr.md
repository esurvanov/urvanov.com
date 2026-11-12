---
title: Harness engineering en pratique : transformer les erreurs d’un agent IA en règles de son environnement (HDD)
date: 2026-09-28
updated: 2026-11-13
description: La boucle erreur-règle, guides et capteurs, trois couches de vérifications, l’articulation avec les spécifications et cinq premiers pas dans votre propre projet.
tags: IA, Claude Code, harness engineering, harness, HDD, agents
category: harness
layout: wide
image: /og/harness-driven-development.en.png
mentions: Harness engineering, Claude Code, AGENTS.md, CLAUDE.md, Spec-Driven Development
toc: loop=La boucle HDD | canons=La disposition 3 × 3 | double=Double boucle | controls=Guides et capteurs | layers=Trois couches de vérification | shift=Plus tôt, c’est moins cher | human=Où l’humain compte | spec=HDD et spécifications | start=Par où commencer | faq=Questions | next=Pour aller plus loin
---

Le **harness engineering** est le travail qui consiste à façonner l’environnement autour d’un agent IA, le harness (le harnais de l’agent) : instructions, systèmes connectés, permissions et vérifications. Le **Harness-Driven Development (HDD)** est une méthode de travail construite dessus : chaque erreur de l’agent devient une règle de cet environnement. On commence par un fichier d’instructions AGENTS.md ou CLAUDE.md et un journal des erreurs de l’agent : une fois par semaine, les entrées du journal deviennent des règles, des tests ou des hooks.

<b-post series="hdd">
<b-chapter id="loop" icon="refresh-cw" title="La boucle HDD">
  <b-why align="left">La boucle fonctionne ainsi. L’agent reçoit une tâche et produit un résultat. Des capteurs (un test, un linter, une relecture) vérifient le résultat. Si tout passe, la tâche est close. Si un capteur trouve une erreur, une personne modifie l’environnement de l’agent, le harness : elle ajoute une ligne aux instructions, un test ou un hook. La tâche suivante s’exécute avec cette règle, et l’erreur ne se répète pas.</b-why>
  <b-hdd-scene name="harness-driven-development/loop" frame="loop"/>
  <b-cap>Principe de Mitchell Hashimoto : quand l’agent fait une erreur, modifier le harness pour que cette erreur ne puisse plus se produire <a href="https://www.faros.ai/blog/harness-engineering" target="_blank" rel="noopener">Faros</a></b-cap>
  <b-why>Un prompt corrige une requête, le contexte corrige ce que le modèle sait, le harness corrige toutes les exécutions suivantes. Exemple : l’agent modifie du code et ne lance pas les tests.</b-why>
  <b-hdd-scene name="harness-driven-development/fix-levels" frame="fig"/>
  <b-cap>Étapes telles que décrites par <a href="https://www.faros.ai/blog/harness-engineering" target="_blank" rel="noopener">Faros</a> et <a href="https://marmelab.com/blog/2026/09/24/the-state-of-ai-harness-engineering-2026.html" target="_blank" rel="noopener">marmelab</a></b-cap>
  <b-why align="left">Le tableau montre une erreur (l’agent modifie du code et ne lance pas les tests) et trois façons de la corriger. Prompt : ajouter « lance les tests après la modification ». Cela ne marche que pour une requête, et la suivante repart de zéro. Contexte : écrire la même chose dans le fichier d’instructions du projet. Le modèle le lit mais peut l’ignorer. Harness : ajouter un hook qui lance lui-même les tests après chaque modification. Il s’exécute sans le modèle, donc le correctif tient dans toutes les exécutions suivantes.</b-why>
  <b-finding>
    <ex>Une erreur attrapée par les capteurs entre dans le harness comme une nouvelle règle, et l’agent reçoit cette règle à chaque exécution suivante.</ex>
    <gen>Un résultat corrigé à la main n’aide qu’une fois. Une règle dans le harness (une instruction, un test ou un hook) s’applique à toutes les tâches futures : le harness devient donc plus précis avec le temps sans changer le modèle.</gen>
    <do>Adoptez une règle : toute erreur de l’agent que vous avez dû corriger à la main devient, le jour même, une ligne dans les instructions ou un test.</do>
  </b-finding>
</b-chapter>

<b-chapter id="canons" icon="grid" title="Comment un harness est organisé : 3 × 3">
  <b-why>Trois domaines de la boucle et trois contextes dans chacun — neuf canons. Chaque canon a exactement un domaine et un contexte.</b-why>
  <b-hdd-matrix kind="canons" label="Comment un harness est organisé : 3 × 3">
    <column icon="book" t="Spec">ce qui doit être vrai</column>
    <column icon="sun" t="Skill">comment agir</column>
    <column icon="database" t="Memory">sur quoi s’appuyer</column>
    <row icon="target" t="Expectation">ce qui devrait être</row>
    <cell>genres, schémas | niveaux d’exigence | passeport des nombres</cell>
    <cell>prédiction avant d’agir</cell>
    <cell>rôles des actionneurs | live · MCP</cell>
    <row icon="eye" t="Observation">ce qui a été mesuré</row>
    <cell>rang des preuves | format des constats | échelle</cell>
    <cell>le capteur consigne le fait</cell>
    <cell>live seulement</cell>
    <row icon="refresh-cw" t="Loop">comparer et décider</row>
    <cell>critères de complétude des règles | registre des constats</cell>
    <cell>comparer | compter les répétitions | corriger ou réviser</cell>
    <cell empty>vide pour l’instant</cell>
  </b-hdd-matrix>
  <b-hdd-fanin label="Expectation + Observation → Loop → corriger / réviser les règles">
    <in icon="target">Expectation</in>
    <in icon="eye">Observation</in>
    <mid icon="refresh-cw" note="✕ pas de lien inverse">Loop</mid>
    <out>correctif</out>
    <out alt>révision des règles</out>
    <note from="sun" to="book">skill → spec de son domaine · un script de hook de commit vérifie le sens</note>
  </b-hdd-fanin>
  <b-hdd-modes>
    <mode icon="table" t="snapshot">un tableau, mis à jour après chaque nouvelle mesure</mode>
    <mode icon="broadcast-pole" t="live">un protocole, frais à chaque fois, rien n’est stocké</mode>
  </b-hdd-modes>
  <b-why align="left">La matrice se lit comme trois questions. Expectation : ce que le résultat devrait être (par exemple « après la modification, les tests passent »). Observation : ce qu’il est réellement devenu, ce qu’un capteur consigne. Loop : compare les deux et décide quoi faire. Chacune des trois lignes a trois sortes de support : spec (ce qui doit être vrai), skill (comment agir) et memory (sur quoi s’appuyer). Les mots « domaine » et « canon » ne sont ici que des noms : un domaine est une ligne de la matrice, un canon est une cellule, par exemple la spec d’Expectation. Le schéma ci-dessous montre le sens des liens : Expectation et Observation alimentent Loop, qui donne soit un correctif (corriger l’action), soit une révision des règles. Il n’y a pas de lien en retour vers Loop, les domaines ne s’emmêlent donc pas. Les modes de mémoire : snapshot est un tableau mis à jour quand une nouvelle mesure arrive ; live signifie que les données sont prises dans le système vivant (par exemple via MCP) à chaque fois et ne sont pas stockées.</b-why>
  <b-finding>
    <ex>La boucle se divise en Expectation, Observation et Loop, chacune avec sa spec, son skill et sa mémoire. Loop lit les deux autres domaines ; eux ne lisent jamais Loop.</ex>
    <gen>C’est une boucle à rétroaction négative : la valeur cible est comparée à la valeur mesurée, et quelque chose ne change qu’en cas d’écart. Un sens de référence strict évite que les domaines ne s’emmêlent, et qu’un même concept se répète dans deux domaines n’est pas un défaut.</gen>
    <do>Classez les fichiers de votre harness dans les neuf cellules et vérifiez qu’aucun fichier d’Expectation ou d’Observation ne renvoie à Loop.</do>
  </b-finding>
</b-chapter>

<b-chapter id="double" icon="loop-double" title="La double boucle">
  <b-why align="left">La double boucle répond à la question de ce qu’il faut changer exactement après une erreur. Prenons la même erreur : l’agent n’a pas lancé les tests. Dans une boucle simple, on le lui rappelle, il lance les tests, et les règles restent ce qu’elles étaient. Dans une double boucle, on demande quelle règle a permis l’erreur et on la change : désormais un hook lance les tests après chaque modification. L’idée vient de la théorie de l’apprentissage organisationnel (Chris Argyris et Donald Schön) : une boucle simple corrige l’action, une double boucle révise les règles dont l’action découlait. <a href="https://en.wikipedia.org/wiki/Double-loop_learning" target="_blank" rel="noopener">Wikipedia: Double-loop learning</a>.</b-why>
  <b-hdd-loops>
    <loop kind="single" t="boucle simple">corriger l’action sous les mêmes règles</loop>
    <loop kind="double" t="double boucle" on>changer les règles elles-mêmes</loop>
  </b-hdd-loops>
  <b-hdd-principles>
    <principle icon="wave-line" t="Rustines sans nouvelle prédiction">corriger par une règle</principle>
    <principle icon="flask" t="Plusieurs plaintes">tester d’abord une cause commune</principle>
    <principle icon="history" t="Une nouvelle règle">acceptée seulement si les anciens cas en découlent</principle>
    <principle icon="shield-check" t="Pas de vérification externe">l’écarter, en le consignant</principle>
  </b-hdd-principles>
  <b-cap>La boucle s’applique à elle-même : chaque exécution se termine par le risque résiduel, jamais par un statut « terminé ».</b-cap>
  <b-why align="left">Changer les règles après chaque plainte est risqué : le harness se met à proliférer sous l’effet de modifications fortuites. Loop applique donc quatre vérifications. Si les correctifs ne font que boucher des trous et ne prédisent rien de nouveau, ils sont remplacés par une seule règle. S’il y a plusieurs plaintes, on teste d’abord si elles ont une cause commune. Une nouvelle règle n’est acceptée que si les anciens cas restent expliqués avec elle. Une règle sans vérification externe est écartée, mais la trace dit ce qui a été écarté et pourquoi. La légende sous les cartes signifie que Loop s’applique aussi à lui-même : une exécution se termine par le risque résiduel.</b-why>
  <b-finding>
    <ex>Une série de rustines, des plaintes, une nouvelle règle et une vérification externe sont quatre principes vérifiables dont Loop se sert pour décider s’il faut corriger l’action ou changer les règles.</ex>
    <gen>Une boucle simple corrige le résultat dans le cadre des anciennes règles. Une double boucle change les règles elles-mêmes, et le fait selon des principes vérifiables : le harness apprend donc sans dériver au gré de modifications aléatoires.</gen>
    <do>Quand le même correctif revient une troisième fois, arrêtez-vous et demandez quelle règle en est la cause. Ne changez la règle que si elle explique aussi les anciens cas.</do>
  </b-finding>
</b-chapter>

<b-chapter id="controls" icon="grid" title="Guides et capteurs">
  <b-why align="left">Les vérifications d’un harness se répartissent selon deux critères. Le premier est le moment où elles se déclenchent. Les guides agissent avant l’agent et fixent le cap : types, modèles de code, instructions, spécifications. Les capteurs agissent après l’action et attrapent les écarts : tests, linter, relecture par IA. Le second critère est la construction de la vérification. Les vérifications calculables (types, tests, linter) se déclenchent en quelques secondes et ne se trompent pas dans le cadre de leur règle. Les vérifications par IA (relecture par IA, modèle juge) sont plus souples et plus coûteuses, elles sont donc réservées au sens : style, clarté, adéquation à l’intention.</b-why>
  <b-hdd-matrix kind="guides" label="Matrice : les guides agissent avant l’agent, les capteurs après ; chacun est soit calculable, soit par IA">
    <column icon="arrow-right" t="Guides">avant l’action</column>
    <column icon="eye" t="Capteurs">après l’action</column>
    <row icon="cpu" t="Calculables" speed="3">rapides · fiables</row>
    <cell>types | modèles de code | générateurs</cell>
    <cell>tests | linter | vérification des types</cell>
    <row icon="sparkle-4" t="Par IA" speed="1">souples · plus coûteux</row>
    <cell>AGENTS.md · CLAUDE.md | skills | spécifications</cell>
    <cell>relecture par IA | LLM juge</cell>
  </b-hdd-matrix>
  <b-cap>Répartition telle que décrite dans <a href="https://martinfowler.com/articles/harness-engineering.html" target="_blank" rel="noopener">Birgitta Böckeler (martinfowler.com)</a></b-cap>
  <b-finding>
    <ex>Quatre cellules : les guides fixent le cap avant que l’agent ne travaille, les capteurs attrapent ensuite les écarts, et chacun peut être calculable ou par IA.</ex>
    <gen>Les vérifications calculables s’exécutent en quelques secondes et ne se trompent pas dans le cadre de leur règle : utilisez-les partout où une règle peut s’écrire formellement. Gardez les vérifications par IA pour le sens : style, clarté, adéquation à l’intention.</gen>
    <do>Pour chaque règle des instructions de l’agent, demandez-vous si un test ou un linter pourrait la vérifier. Si oui, déplacez-la là.</do>
  </b-finding>
</b-chapter>

<b-chapter id="layers" icon="layers" title="Trois couches de vérification">
  <b-why align="left">Les vérifications se répartissent en trois couches. Qualité du code : style, formatage, types, erreurs simples. Architecture : frontières des modules et dépendances entre eux, exigences de vitesse. Comportement : le produit fait-il ce dont l’utilisateur a besoin. Les barres du schéma montrent à quel point on a appris à vérifier automatiquement cette couche : la première barre est presque pleine, celle du comportement est la plus courte.</b-why>
  <b-hdd-layers label="Trois couches : la qualité du code est la plus mûre, l’architecture est au milieu, le comportement est le moins mûr">
    <layer icon="brush" t="Qualité du code" value="88">mûre</layer>
    <layer icon="modules" t="Architecture" value="55">en croissance</layer>
    <layer icon="user-round" t="Comportement" value="25" sw="1.8">la plus difficile</layer>
  </b-hdd-layers>
  <b-cap>Maturité des couches selon l’évaluation de <a href="https://martinfowler.com/articles/harness-engineering.html" target="_blank" rel="noopener">Birgitta Böckeler (martinfowler.com)</a></b-cap>
  <b-finding>
    <ex>La qualité du code est aujourd’hui la plus facile à vérifier, et le comportement du produit la plus difficile.</ex>
    <gen>Les linters et formateurs couvrent la première couche presque immédiatement. L’architecture se vérifie avec des règles de dépendances et des exigences de performance. Le comportement demande encore de bons tests de scénarios et un œil humain.</gen>
    <do>Commencez par la première couche : lancez un linter et un formateur à chaque exécution de l’agent, puis ajoutez une règle sur les frontières des modules.</do>
  </b-finding>
</b-chapter>

<b-chapter id="shift" icon="clock" title="Plus tôt, c’est moins cher">
  <b-why align="left">Toute vérification se déclenche à un moment, et plus il est précoce, moins l’erreur coûte à corriger. Le schéma montre quatre moments : avant que l’agent ne travaille (instructions et spécifications), à l’écriture (hooks et linter), en CI (build et tests automatiques quand le code est poussé dans le dépôt) et en relecture humaine. Les signes $ montrent le prix croissant d’une erreur.</b-why>
  <b-hdd-cost label="Plus une vérification s’exécute tôt, moins l’erreur coûte : avant que l’agent démarre, à l’écriture, en CI, en relecture">
    <stage icon="arrow-right" t="Avant le travail" cost="$">instructions · spécifications</stage>
    <stage icon="cpu" t="À l’écriture" cost="$$">hooks · linter</stage>
    <stage icon="refresh-cw" t="En CI" cost="$$$" sw="1.8">tests · build</stage>
    <stage icon="user-round" t="En relecture" cost="$$$$" sw="1.8">une personne</stage>
  </b-hdd-cost>
  <b-why align="left">Les tests sont exécutés par des moteurs comme [QUnit](/materials/glossary/qunit/), [Jest](/materials/glossary/jest/) et [Vitest](/materials/glossary/vitest/). Leurs différences et le choix à faire sont traités dans l’article [Vitest, Jest ou QUnit : que choisir pour un projet JavaScript](/blog/jest-vs-vitest-vs-qunit/). Les règles de comportement que les tests ordinaires ne peuvent pas vérifier sont trouvées par un [modèle en Quint](/blog/quint-vs-tests-and-tla/).</b-why>
  <b-finding>
    <ex>La même erreur coûte le moins avant que l’agent ne démarre et le plus à la relecture humaine.</ex>
    <gen>Placez les vérifications rapides le plus tôt possible : l’agent corrige lui-même le problème tant que le contexte de la tâche est encore devant lui, et seuls les points discutables arrivent à une personne.</gen>
    <do>Branchez les tests et le linter dans un hook que l’agent lance après chaque modification, en plus de la CI.</do>
  </b-finding>
</b-chapter>

<b-chapter id="human" icon="user-round" title="Où l’humain compte">
  <b-why align="left">Le harness prend en charge les vérifications de routine : style, types, tests, frontières des modules. Une personne décide de ce qu’une vérification formelle ne peut pas couvrir : l’architecture, les questions de produit et les nouvelles règles. Les chiffres du schéma montrent un rapport d’exemple : 36 vérifications pour le harness et 6 pour une personne.</b-why>
  <b-hdd-split label="Le harness gère les vérifications de routine ; une personne décide de l’architecture et des questions de produit et améliore le harness lui-même">
    <side icon="sun" t="Harness" n="36">style · types · tests · frontières</side>
    <side icon="user-round" t="Personne" n="6" sw="1.8">architecture · produit · nouvelles règles</side>
  </b-hdd-split>
  <b-cap>« Un bon harness garde l’humain dans la boucle et dirige son attention là où elle compte le plus » — d’après <a href="https://martinfowler.com/articles/harness-engineering.html" target="_blank" rel="noopener">Birgitta Böckeler (martinfowler.com)</a></b-cap>
  <b-finding>
    <ex>Le harness prend la plupart des vérifications ; la personne garde les décisions et le travail d’amélioration du harness.</ex>
    <gen>Un développeur expérimenté porte un harness implicite dans sa tête : connaissance de l’architecture, habitudes d’équipe, sens du risque. Le HDD transfère ce savoir dans des règles explicites, pour que chaque exécution de l’agent en bénéficie.</gen>
    <do>Après chaque relecture du code de l’agent, notez un commentaire qui revient sans cesse et transformez-le en règle.</do>
  </b-finding>
</b-chapter>

<b-chapter id="spec" icon="file-text" sw="2" title="HDD et spécifications">
  <b-why align="left">Une spécification et un harness se complètent. La spécification répond à « ce qui doit sortir », le harness vérifie que c’est exactement cela qui est sorti. Sur le schéma, la spécification fixe le résultat voulu, le harness le vérifie, et le code est accepté d’après les résultats des vérifications plutôt qu’en lisant chaque ligne.</b-why>
  <b-hdd-specflow label="La spécification fixe l’objectif ; le harness vérifie que l’agent l’a atteint">
    <node icon="target" t="Spec">le résultat voulu</node>
    <node icon="sun" t="Harness">comment vérifier qu’on l’a obtenu</node>
    <node icon="check-circle-alt" t="Code accepté">sans relecture manuelle ligne à ligne</node>
  </b-hdd-specflow>
  <b-cap>« Les spécifications définissent l’état cible, le harness est le système de contrôle » — <a href="https://loiane.com/2026/04/harness-engineering-missing-layer-specs-driven-ai-development/" target="_blank" rel="noopener">Loiane Groner</a>. Plus sur les spécifications dans l’exposé <a href="/talk/spec-driven-development/">Spec-Driven Development en pratique</a></b-cap>
  <b-finding>
    <ex>La spécification répond à « que construit-on », le harness répond à « comment sait-on qu’on l’a construit ».</ex>
    <gen>Sans spécification, le harness n’a rien à vérifier, et sans harness, la spécification reste un document. Ensemble, ils permettent d’accepter le code de l’agent d’après des vérifications au lieu de lire chaque ligne.</gen>
    <do>Pour chaque exigence de la spécification, notez quel test ou quelle vérification confirmera qu’elle est remplie.</do>
  </b-finding>
</b-chapter>

<b-chapter id="start" icon="flag" title="Par où commencer">
  <b-why align="left">Un harness n’a pas à être conçu d’un bloc. Commencez par cinq pas : les deux premiers installent l’environnement d’emblée, les trois autres lancent la boucle « erreur → règle ». Un fichier de progression est utile quand une tâche dépasse une session : il contient une liste de fonctionnalités avec un statut, et une nouvelle session de l’agent reprend au même point.</b-why>
  <b-hdd-steps>
    <step t="Un fichier d’instructions pour l’agent">AGENTS.md ou CLAUDE.md à la racine du projet : comment construire, comment tester, ce qu’il ne faut pas faire</step>
    <step t="Linter et tests après chaque modification">un hook que l’agent lance lui-même avant de rendre le résultat</step>
    <step t="Un journal des erreurs de l’agent">chaque erreur corrigée à la main reçoit une ligne avec sa cause</step>
    <step t="Erreur → règle">une fois par semaine, transférer les entrées du journal dans les instructions, les tests ou les hooks</step>
    <step t="Un fichier de progression pour les longues tâches">une liste de fonctionnalités avec statuts et l’historique des commits, pour qu’une nouvelle session reprenne là où la précédente s’est arrêtée <a href="https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents" target="_blank" rel="noopener">Anthropic</a></step>
  </b-hdd-steps>
  <b-finding>
    <ex>Cinq pas : deux installent le harness tout de suite, trois lancent la boucle « erreur → règle ».</ex>
    <gen>Personne ne conçoit un harness en entier à l’avance. Il pousse à partir des vraies erreurs de l’agent dans votre projet, et en quelques semaines l’agent cesse de répéter les plus courantes.</gen>
    <do>Aujourd’hui, créez le fichier d’instructions et le journal des erreurs. Dans une semaine, transférez les premières entrées du journal dans des règles.</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Questions fréquentes">
  <b-faq-cards>
    <q t="Qu’est-ce que le harness engineering ?">La mise en place de l’environnement autour d’un agent IA : instructions, outils, permissions et vérifications.</q>
    <q t="Qu’est-ce que le HDD ?">Le Harness-Driven Development : une méthode où chaque erreur de l’agent devient une règle de l’environnement, une instruction, un test ou un hook.</q>
    <q t="Pourquoi une règle vaut-elle mieux qu’une correction manuelle ?">Un résultat corrigé à la main n’aide qu’une fois, alors qu’une règle dans le harness agit pour toutes les tâches futures.</q>
    <q t="Comment commencer avec le HDD ?">Créez un fichier d’instructions pour l’agent et un journal de ses erreurs, et une fois par semaine transférez les entrées du journal dans des règles, des tests ou des hooks.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Pour aller plus loin">
  <b-links cols="2">
    <item href="/blog/work-prompts-examples/" k="Étape 1–2" t="Prompts pour les tâches de travail">comment écrire une requête isolée et fournir des données</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="Étape 3" t="Comparaison des harness">Claude Code, Codex, Cursor, Hermes et chat</item>
  </b-links>
  <b-cap>À lire aussi : <a href="https://martinfowler.com/articles/harness-engineering.html" target="_blank" rel="noopener">Birgitta Böckeler (martinfowler.com)</a> · <a href="https://www.anthropic.com/engineering/harness-design-long-running-apps" target="_blank" rel="noopener">Anthropic: Harness design</a> · <a href="https://leanpub.com/becoming-a-harness-driven-developer" target="_blank" rel="noopener">Becoming a Harness-Driven Developer</a> · <a href="https://github.com/ai-boost/awesome-harness-engineering" target="_blank" rel="noopener">awesome-harness-engineering</a></b-cap>
</b-chapter>
<b-footer>Les termes et la répartition en couches suivent les sources liées dans les légendes sous les schémas.</b-footer>
</b-post>
