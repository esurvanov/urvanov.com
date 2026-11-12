---
title: Travail de QA après le support avec un agent IA : enquête, description et documentation via MCP et skills
date: 2026-10-04
updated: 2026-11-13
description: Une seule étape de la chaîne est optimisée : la QA après le support. Un agent reproduit un bug Jira sur un banc de test via MCP, réduit le chemin, le décrit et le documente, un skill fait des étapes un processus répétable, la QA vérifie à la main. Le support et le développement ne changent pas.
tags: IA, agents, QA, Jira, MCP, skills, bugs, harness
category: harness
layout: wide
mentions: Jira, AI agent, QA, Model Context Protocol, skills, bug reproduction, sequence diagram, C4 model, human-in-the-loop
toc: route=Étape QA | stages=Trois parties | mcp=MCP | skill=Skill | parallel=En parallèle | example=Exemple | human=Ce que garde la QA | first=Comment démarrer | faq=Questions | next=À lire ensuite
---

Un bug signalé par un client passe par le support et arrive à la QA. C'est là que l'enquête, la description et la documentation se font à la main : c'est donc cette étape qui est optimisée. Un agent connecté à Jira et à un banc de test via MCP, avec un skill où les étapes sont écrites, prend la routine en charge. La QA vérifie le résultat à la main. Le support et le développement travaillent comme avant.

<b-post series="harness">
<b-view-toggle/>

<b-chapter id="route" icon="stairs" title="Une seule étape est optimisée : la QA après le support">
  <b-why align="left">Un bug va du client à la correction en quatre étapes : le client écrit, le support le prend en charge, la QA enquête, un développeur corrige. Avant, la QA faisait son étape entièrement à la main, et toute la journée de travail passait dans les bugs. Désormais, des agents travaillent sur cette étape pendant que la QA accepte le résultat et les pilote. Les trois autres étapes restent inchangées.</b-why>
  <b-view kind="pic">
    <b-art-plain name="bug-report-to-reproduction-agent/qa-step"/>
  </b-view>
  <b-view kind="struct">
    <b-lane title="Avant" color="muted">
      <b-qa-route>
        <node icon="user" t="client">écrit</node>
        <node icon="user" t="support">reçoit</node>
        <node kind="solo" t="QA" chips="enquête|description|documentation" time="Temps de QA par tâche" bar="exécution des tâches">fait le travail</node>
        <node icon="user" t="développeur">corrige</node>
      </b-qa-route>
    </b-lane>
    <b-lane title="Après" color="accent" top="12">
      <b-qa-route>
        <node icon="user" t="client">écrit</node>
        <node icon="user" t="support">reçoit</node>
        <node kind="pair" t="QA" frame="en binôme" tools="monitor-screen:Claude in Chrome|flask:Code, tests, PoC|code:API" n="× N" time="Temps de QA par tâche" bar="acceptation|pilotage des agents">acceptation</node>
        <node icon="user" t="développeur">corrige</node>
      </b-qa-route>
    </b-lane>
    <b-cap>L'échelle est illustrative, ce n'est pas une mesure.</b-cap>
  </b-view>
  <b-finding>
    <ex>Seule l'étape de QA change : tout le temps de QA passait à exécuter les tâches ; désormais, les agents les exécutent, et la QA accepte les résultats et pilote les agents.</ex>
    <gen>Plusieurs agents peuvent tourner en même temps, et le temps de QA par tâche diminue.</gen>
    <do k="Que faire">Chronométrez les minutes de QA par bug.</do>
  </b-finding>
</b-chapter>

<b-chapter id="stages" icon="lines" title="Trois parties du travail de QA et ce qu'elles deviennent">
  <b-why align="left">Le travail de la QA sur un bug se divise en trois parties : enquête, description et documentation. Pour chacune, les images ci-dessous montrent comment la QA la faisait avant, ce que fait l'agent et ce qui reste à un humain.</b-why>
  <b-view kind="pic">
    <b-lane-stack>
    <b-icon-lane icon="search-alt" title="Enquête">
      <b-art-plain name="bug-report-to-reproduction-agent/investigation"/>
    </b-icon-lane>
    </b-lane-stack>
  </b-view>
  <b-view kind="struct">
    <b-lane-stack>
    <b-icon-lane icon="search-alt" title="Enquête">
      <b-qa-row label="Avant">
        <node icon="user">QA</node>
        <node icon="refresh-cw">répétition</node>
        <node icon="scissors">réduction</node>
        <node icon="target">cause</node>
      </b-qa-row>
      <b-qa-row label="Après" now>
        <node icon="bot">Agent</node>
        <node icon="play">chemin sur le banc</node>
        <node icon="scissors">réduction</node>
        <node icon="eye">la QA relit</node>
      </b-qa-row>
    </b-icon-lane>
    </b-lane-stack>
  </b-view>
  <b-why align="left">L'enquête est la recherche du chemin le plus court vers le bug. La plainte d'un client énumère en général tout ce qu'il a fait : connexion, catalogue, adresse, panier, code promo, paiement. La QA répétait ces actions et retirait les éléments superflus un par un jusqu'à ce que le bug cesse de se reproduire. L'agent fait de même sur un banc de test : il retire une action, vérifie si le bug est toujours là, et continue jusqu'au minimum. Dans l'exemple, trois actions sur six se révèlent nécessaires. La QA examine le chemin réduit et vérifie que ce qui a été retiré était vraiment superflu : l'agent a pu barrer une étape sans laquelle le bug ne se reproduit en fait pas.</b-why>
  <b-view kind="pic">
    <b-lane-stack>
    <b-icon-lane icon="lines" title="Description">
      <b-art-plain name="bug-report-to-reproduction-agent/description"/>
    </b-icon-lane>
    </b-lane-stack>
  </b-view>
  <b-view kind="struct">
    <b-lane-stack>
    <b-icon-lane icon="lines" title="Description">
      <b-qa-row label="Avant">
        <node icon="user">QA</node>
        <node icon="lines">étapes</node>
        <node icon="file-text">attendu / obtenu</node>
        <node icon="doc-lines">style personnel</node>
      </b-qa-row>
      <b-qa-row label="Après" now>
        <node icon="bot">Agent</node>
        <node icon="table">modèle</node>
        <node icon="workflow">séquence · C4</node>
      </b-qa-row>
    </b-icon-lane>
    </b-lane-stack>
  </b-view>
  <b-why align="left">La description est la rédaction du rapport de bug : étapes, résultat attendu et obtenu, environnement. Avant, chaque QA avait son propre style, et le développeur devait s'y réhabituer à chaque fois. L'agent remplit un seul modèle de rapport, donc tous les rapports se ressemblent. Si la description n'indique pas où cela casse, la QA demande un schéma : un diagramme de séquence (qui appelle qui et dans quel ordre) ou un schéma de la structure du système (C4). La QA compare la description avec ce qu'elle a vu personnellement et corrige les inexactitudes.</b-why>
  <b-view kind="pic">
    <b-lane-stack>
    <b-icon-lane icon="file-text" title="Documentation">
      <b-art-plain name="bug-report-to-reproduction-agent/documentation"/>
    </b-icon-lane>
    </b-lane-stack>
  </b-view>
  <b-view kind="struct">
    <b-lane-stack>
    <b-icon-lane icon="file-text" title="Documentation">
      <b-qa-row label="Avant">
        <node icon="user">QA</node>
        <node icon="image">captures d'écran</node>
        <node icon="link">liens</node>
        <node icon="doc-lines">champs Jira</node>
      </b-qa-row>
      <b-qa-row label="Après" now>
        <node icon="bot">Agent</node>
        <node icon="plug">MCP</node>
        <node icon="lines">Jira</node>
        <node icon="pencil">la QA corrige les points contestés</node>
      </b-qa-row>
    </b-icon-lane>
    </b-lane-stack>
  </b-view>
  <b-why align="left">La documentation consiste à reporter le résultat dans Jira : captures d'écran, liens, champs du ticket. À la main, c'est une corvée à part qui absorbe une part notable du temps. L'agent est connecté à Jira via MCP et écrit le commentaire et les champs directement dans le ticket. La QA ouvre le ticket, lit l'entrée et corrige les points contestés : priorité, formulation, pièces jointes superflues.</b-why>
  <b-view kind="struct">
    <b-agents-lane title="Une QA — plusieurs agents à la fois" agents="agent · PAY-142|agent · PAY-143|agent · PAY-144" note="Le temps de QA se déplace vers le pilotage et l'acceptation" top="10">Chacune des trois parties tourne, pour chaque bug, dans son propre agent, et la QA en lance plusieurs à la fois.</b-agents-lane>
  </b-view>
  <b-finding>
    <ex>L'enquête, la description et la documentation s'enchaînent et passent par l'agent. La QA garde la vérification finale et les points contestés.</ex>
    <gen>Les trois parties sont des actions répétables avec un résultat clair, on peut donc les consigner par écrit et les confier. La décision « est-ce un bug et quelle importance a-t-il » reste à un humain.</gen>
    <do k="Que faire">Découpez votre travail sur un bug en ces trois parties et notez laquelle prend le plus de temps.</do>
  </b-finding>
</b-chapter>

<b-chapter id="mcp" icon="plug" title="MCP : l'agent travaille là où travaille la QA">
  <b-why>MCP (Model Context Protocol) est un moyen de connecter un agent aux systèmes de travail pour qu'il y lise et y écrive lui-même, au lieu de recevoir un récit de seconde main.</b-why>
  <b-why align="left">L'agent a besoin de cinq choses. Jira : il lit le ticket et y écrit le résultat. Un banc de test : une copie de test du produit où il parcourt le chemin comme un utilisateur, dans le navigateur avec [Claude in Chrome](/blog/claude-in-chrome/). Des documents : schémas et descriptions placés à côté du ticket. Des données : des données de test que l'on peut réinitialiser. Des permissions : seul le banc de test peut être cassé, les systèmes de production sont hors de portée.</b-why>
  <b-view kind="pic">
    <b-art-plain name="bug-report-to-reproduction-agent/access-sandbox"/>
  </b-view>
  <b-view kind="struct">
    <b-node-grid>
      <node icon="lines" sw="1.8" t="Jira">lit le ticket, écrit le rapport</node>
      <node icon="play" t="Banc de test">parcourt le chemin comme un utilisateur</node>
      <node icon="file-text" sw="1.8" t="Docs">schémas et notes à côté du ticket</node>
      <node icon="cylinder" t="Données">données de test, réinitialisables</node>
      <node icon="shield-check" t="Permissions">seul le banc de test peut être cassé</node>
    </b-node-grid>
  </b-view>
  <b-finding>
    <ex>Via MCP, l'agent lit PAY-142 dans Jira, va sur le banc de test et réécrit le résultat. La QA ne copie rien entre des fenêtres.</ex>
    <gen>Sans connexion aux systèmes, il faut donner à l'agent un récit, et un récit perd des détails. Le banc de test est l'endroit où l'agent peut essayer et casser sans toucher à la production.</gen>
    <do k="Que faire">Commencez par deux connexions : Jira et le banc de test. Ajoutez le reste au besoin.</do>
  </b-finding>
</b-chapter>

<b-chapter id="skill" icon="doc-square" title="Un skill : un processus écrit plutôt qu'une répétition à la main">
  <b-why>Un skill est une manière de travailler consignée par écrit pour l'agent : étapes, modèle de rapport, règles. Une autre personne et un autre agent peuvent la reproduire.</b-why>
  <b-why align="left">Un skill fait parcourir à l'agent six étapes. Il lit le ticket, parcourt le chemin critique sur le banc, le réduit au minimum, décrit le bug d'après le modèle, dessine des schémas sur demande et écrit le résultat dans Jira. Les trois premières étapes relèvent de l'enquête, les autres de la description et de la documentation du chapitre précédent. Une erreur de l'agent revient dans le skill sous forme de nouvelle règle, pour ne pas se répéter la fois suivante.</b-why>
  <b-view kind="pic">
    <b-art-plain name="bug-report-to-reproduction-agent/skill-pipeline"/>
  </b-view>
  <b-view kind="struct">
    <b-lane title="Skill « reproduire un bug »" color="accent">
      <b-num-chain top="6">
        <step>lire le ticket</step>
        <step>parcourir le chemin critique sur le banc</step>
        <step>réduire au minimum</step>
      </b-num-chain>
      <b-num-chain start="4" top="10">
        <step>décrire d'après le modèle</step>
        <step>schémas sur demande</step>
        <step>écrire dans Jira</step>
      </b-num-chain>
    </b-lane>
    <b-agents-lane title="Une QA — plusieurs agents à la fois" agents="agent · PAY-142|agent · PAY-143|agent · PAY-144" note="Le temps de QA se déplace vers le pilotage et l'acceptation" top="10">Un skill, de nombreux lancements : un agent par bug. Le processus écrit n'exige pas que la QA le répète personnellement.</b-agents-lane>
    <b-chiprow top="12">
      <chip>mêmes étapes à chaque fois</chip>
      <chip>un seul modèle de rapport</chip>
      <chip>transmis aux collègues</chip>
      <chip>amélioré à partir des erreurs</chip>
    </b-chiprow>
  </b-view>
  <b-finding>
    <ex>Les six étapes sont écrites une fois. N'importe quelle QA lance le skill sur un nouveau ticket et obtient un rapport au même format.</ex>
    <gen>Un skill transforme « ma façon habituelle de faire » en un processus qui ne dépend pas de la personne de permanence aujourd'hui. Une erreur de l'agent entre dans le skill sous forme de nouvelle règle, et la fois suivante elle a disparu.</gen>
    <do k="Que faire">Écrivez vos étapes pour un type de bug sous forme de skill et lancez-le sur trois tickets clos.</do>
  </b-finding>
</b-chapter>

<b-chapter id="parallel" icon="grid-alt" title="Une QA — plusieurs agents : le temps se déplace vers le pilotage et l'acceptation">
  <b-why>Les bugs peuvent être reproduits par différents canaux, et chaque agent prend le sien.</b-why>
  <b-why align="left">Avant (à gauche), la QA traite trois bugs l'un après l'autre. Maintenant (à droite), trois agents travaillent en même temps : un dans le navigateur, un par le code, un par l'API. La QA vérifie brièvement chaque rapport terminé, et le temps libéré va au pilotage des agents et à l'acceptation. En mode « Structure », la même chose est montrée en barres de temps : les bugs un par un en haut, les agents en parallèle en dessous, et trois cases d'acceptation (142, 143, 144) restent pour la QA.</b-why>
  <b-view kind="pic">
    <b-art-plain name="bug-report-to-reproduction-agent/parallel"/>
  </b-view>
  <b-view kind="struct">
    <b-node-grid min="170">
      <node icon="monitor-screen" t="Claude in Chrome">parcourt le chemin dans un navigateur</node>
      <node icon="flask" t="Code et tests">exécution locale, PoC sans navigateur</node>
      <node icon="code" t="API">appelle directement les requêtes</node>
    </b-node-grid>
    <b-art-plain name="bug-report-to-reproduction-agent/qa-time"/>
    <b-cap>Une esquisse du principe ; l'échelle est arbitraire, ce n'est pas une mesure.</b-cap>
  </b-view>
  <b-finding>
    <ex>La QA lance des agents sur PAY-142, PAY-143 et PAY-144 en même temps. Pendant qu'ils travaillent, la QA ne reste pas penchée sur un seul bug mais vérifie un à un les résultats terminés.</ex>
    <gen>Avant, le temps de QA s'additionnait sur tous les bugs à la suite. Maintenant, chaque bug a son propre agent : par le navigateur, par le code ou par l'API, et la QA ne garde qu'une courte vérification. Plus il y a d'agents en marche, plus le temps de QA va au pilotage et à la relecture, et non à la routine.</gen>
    <do k="Que faire">Augmentez le nombre d'agents progressivement : il est borné par le nombre de bancs de test, de jeux de données de test et de limites. Consacrez le temps que la QA ne passe plus sur la routine au pilotage des agents, à la vérification et à l'amélioration du skill.</do>
  </b-finding>
</b-chapter>

<b-chapter id="example" icon="chat-square" title="Exemple : PAY-142, du ticket au rapport">
  <b-why align="left">Un client a écrit une seule ligne au support : le paiement avec un code promo échoue. L'image ci-dessous se lit de gauche à droite en trois étapes : la plainte du client, le travail de l'agent, le résultat dans Jira. Ensuite, chaque étape est montrée en détail sur le ticket PAY-142.</b-why>
  <b-view kind="pic">
    <b-art-plain name="bug-report-to-reproduction-agent/complaint-to-report"/>
  </b-view>
  <b-why align="left">Étape 1 : la QA n'a que la plainte du client, sans étapes, et une capture d'écran de l'erreur. Étape 2 : l'agent parcourt sur le banc de test les six actions du client et retire les éléments superflus un par un. Connexion, catalogue et adresse sont barrés, panier, code promo et paiement restent, et le bug se reproduit sur eux : le service de promotions répond par une erreur 500. Étape 3 : l'agent écrit le rapport et un schéma dans Jira, et la QA ouvre le ticket et vérifie le résultat.</b-why>
  <b-why align="left">Voici l'étape 1 dans Jira : le titre du client, aucune étape de reproduction, une capture d'écran de l'erreur en pièce jointe. L'agent part de là.</b-why>
  <b-lane title="Ticket Jira · une demande client transmise du support à la QA" color="accent">
    <b-ticket key="PAY-142">Le paiement par carte échoue lorsqu'un code promo est saisi</b-ticket>
    <b-chiprow start top="10">
      <chip>vient du client</chip>
      <chip>transmis par le support</chip>
      <chip>sans étapes</chip>
      <chip>capture d'écran de l'erreur</chip>
    </b-chiprow>
  </b-lane>
  <b-why align="left">Étape 2, première partie : la réduction du chemin. L'agent a barré la connexion, le catalogue et l'adresse, car le bug subsiste sans eux. Le panier, le code promo et le paiement par carte restent.</b-why>
  <b-lane title="Enquête : 6 actions → 3 restantes" color="accent" top="10">
    <b-chiprow start>
      <chip kind="del">connexion</chip>
      <chip kind="del">catalogue</chip>
      <chip kind="del">adresse</chip>
      <chip kind="on">panier</chip>
      <chip kind="on">code promo</chip>
      <chip kind="on">paiement par carte</chip>
      Réduction : l'agent retire les actions une par une et vérifie après chacune si le bug se reproduit encore. Tout ce sans quoi le bug survit est barré.
    </b-chiprow>
  </b-lane>
  <b-why align="left">Étape 2, seconde partie : le schéma. Pour que le développeur voie où cela casse, l'agent dessine un diagramme de séquence. Quatre participants sont en haut, des flèches descendent dans l'ordre du temps, les orange montrent l'erreur : le service de promotions a répondu par une erreur 500, et le paiement a échoué.</b-why>
  <b-lane title="Sur demande · diagramme de séquence" color="accent" top="10">
    <b-art-plain name="bug-report-to-reproduction-agent/promo-sequence"/>
  </b-lane>
  <b-why align="left">Étape 3 : l'entrée dans Jira. L'agent écrit le résultat sous forme de commentaire sur PAY-142 : étapes, ce qui était attendu, ce qui s'est passé, l'environnement et où chercher la cause.</b-why>
  <b-lane title="Description et entrée Jira · commentaire sur PAY-142" color="accent" top="10">
    <b-kv-rows>
      <row k="Étapes">panier → code promo → paiement par carte</row>
      <row k="Attendu">le paiement passe avec la remise</row>
      <row k="Obtenu">« payment failed », le service de promotions renvoie une erreur 500</row>
      <row k="Environnement">banc de test, carte de test</row>
      <row k="Où chercher">l'appel au service de promotions depuis les paiements (voir le schéma)</row>
    </b-kv-rows>
  </b-lane>
  <b-view kind="struct">
    <b-agents-lane title="Une QA — plusieurs agents à la fois" agents="agent · PAY-142|agent · PAY-143|agent · PAY-144" note="Le temps de QA se déplace vers le pilotage et l'acceptation" top="10">Pendant que l'agent traite PAY-142, d'autres agents prennent PAY-143 et PAY-144, et la QA vérifie ce qui est déjà fait.</b-agents-lane>
  </b-view>
  <b-why align="left">D'une seule ligne du client sont sortis un chemin court, un schéma et un rapport terminé. La QA ne les a pas assemblés : elle ouvre le rapport, rejoue les étapes à la main et confirme qu'il s'agit bien du même bug.</b-why>
  <b-cap>Le ticket et tous les noms sont inventés pour l'exemple.</b-cap>
  <b-finding>
    <ex>D'une seule ligne du client sont sortis un chemin court de trois actions, un schéma et un rapport prêt dans Jira. La QA ne l'a pas fait ; elle relit le résultat.</ex>
    <gen>Chacune des trois parties du travail de QA a laissé une trace visible : un chemin réduit, un schéma, une entrée. Ainsi, le résultat peut être vérifié en quelques minutes au lieu d'être reconstitué de mémoire.</gen>
    <do k="Que faire">Demandez à l'agent de montrer le chemin réduit et l'entrée : ils révèlent tout de suite s'il s'est trompé de direction.</do>
  </b-finding>
</b-chapter>

<b-chapter id="human" icon="eye" title="Ce que garde la QA">
  <b-why align="left">La QA se tient à la porte d'acceptation. L'agent apporte un rapport, et la QA répond à quatre questions : est-ce le bon chemin, est-ce la bonne erreur, la réduction est-elle correcte et quelle importance cela a-t-il. Si le bug se reproduit à la main, le ticket part chez le développeur. Sinon, le rapport retourne à l'agent.</b-why>
  <b-view kind="pic">
    <b-art-plain name="bug-report-to-reproduction-agent/acceptance-gate"/>
  </b-view>
  <b-view kind="struct">
    <b-node-grid>
      <node icon="check" t="Bon chemin">rejoue les étapes à la main sur le banc</node>
      <node icon="check" t="Bonne erreur">correspond à la capture d'écran du client</node>
      <node icon="check" t="Bonne réduction">les étapes barrées sont vraiment superflues</node>
      <node icon="check" t="Quelle importance">un humain décide de la gravité et de la priorité</node>
      <node icon="check" t="Améliore le skill">erreur de l'agent → nouvelle règle</node>
    </b-node-grid>
    <b-agents-lane title="Une QA — plusieurs agents à la fois" agents="agent · PAY-142|agent · PAY-143|agent · PAY-144" note="Le temps de QA se déplace vers le pilotage et l'acceptation" top="10">Le temps que la QA ne passe plus sur la routine de chaque bug va au pilotage des agents, à la vérification, aux priorités et à l'amélioration du skill.</b-agents-lane>
  </b-view>
  <b-finding>
    <ex>La QA ouvre le banc, rejoue à la main les étapes du rapport et confirme qu'il s'agit du bug décrit par le client. Ensuite, le ticket va au développeur comme avant ; en cas d'échec, le rapport retourne à l'agent.</ex>
    <gen>Un modèle se donne volontiers raison, et des détails inventés ressemblent à des constatations. Le dernier mot reste donc à un humain qui regarde de ses propres yeux. Le travail de la QA passe de l'exécution de la routine à la vérification et à l'amélioration du processus.</gen>
    <do k="Que faire">Convenez qu'un rapport que la QA n'a pas pu rejouer à la main ne part pas chez le développeur.</do>
  </b-finding>
</b-chapter>

<b-chapter id="first" icon="shield-check" title="Comment démarrer">
  <b-why align="left">Le mieux est de commencer sur des bugs clos dont la réponse est déjà connue. Étape 1 : connecter Jira et un banc de test à l'agent via MCP. Étape 2 : écrire sous forme de skill vos étapes pour un type de bug. Étape 3 : lancer le skill sur cinq bugs clos du mois dernier et comparer les rapports de l'agent avec ce que l'on sait de ces bugs. Là où l'agent s'est trompé, ajouter une règle au skill. Une QA vérifie le résultat à la main.</b-why>
  <b-view kind="pic">
    <b-art-plain name="bug-report-to-reproduction-agent/start-steps"/>
  </b-view>
  <b-view kind="struct">
    <b-num-chain>
      <step>connecter Jira et le banc via MCP</step>
      <step>écrire les étapes de la QA sous forme de skill</step>
      <step>lancer sur 5 bugs clos et ajouter des règles</step>
    </b-num-chain>
  </b-view>
  <b-finding>
    <ex>Sur des bugs clos, la réponse est connue : on voit donc où l'agent ou le skill s'est trompé.</ex>
    <gen>Un nouveau scénario se lance plus sûrement sur des tâches dont l'issue est connue, en transformant chaque erreur en règle du skill.</gen>
    <do k="Que faire">Commencez par cinq bugs du mois dernier et une QA qui vérifie le résultat à la main.</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Questions fréquentes">
  <b-faq-cards>
    <q t="Quelle partie du travail de QA peut-on confier à un agent IA ?">L'enquête, la description et la documentation d'un bug : ce sont des actions répétables avec un résultat clair. Décider s'il s'agit d'un bug et quelle importance il a reste du ressort d'une personne.</q>
    <q t="Pourquoi l'agent a-t-il besoin de MCP pour le travail de QA ?">Via MCP, l'agent travaille dans les mêmes systèmes que la QA, Jira et le banc de test, et lit les faits à la source plutôt que dans un récit de seconde main.</q>
    <q t="Qu'apporte un skill ?">Un processus écrit qui ne dépend pas de la personne de permanence. Une erreur de l'agent entre dans le skill sous forme de nouvelle règle et ne se répète pas.</q>
    <q t="Que reste-t-il à la QA ?">Vérifier à la main le résultat de l'agent et l'accepter : la QA pilote plusieurs agents et décide de ce qu'elle accepte.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" icon="arrow-right" title="À lire ensuite">
  <b-links>
    <item href="/blog/claude-in-chrome/" k="Navigateur" t="Claude Code dans Chrome : comment l'agent teste un site dans le navigateur — débogage et formulaires sous votre identifiant">l’agent parcourt le chemin sur le banc de test</item>
    <item href="/blog/specs-rules-skills/" k="Skills" t="Spécifications, règles et skills">ce qu'un agent doit savoir d'un projet</item>
    <item href="/blog/harness-driven-development/" k="Boucle d'erreurs" t="Harness-Driven Development">comment les erreurs de l'agent deviennent des règles</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="Environnement" t="Comparaison des harness">où l'agent travaille et ce qu'il voit</item>
  </b-links>
</b-chapter>
<b-footer>Le ticket PAY-142 et le schéma sont inventés pour l'exemple.</b-footer>
</b-post>
