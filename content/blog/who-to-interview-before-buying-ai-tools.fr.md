---
title: Qui interviewer avant d'acheter des outils d'IA : 16 personnes issues de huit groupes polaires
date: 2026-09-28
updated: 2026-11-08
description: Comment choisir 16 personnes à partir du rapport, d'un questionnaire et des listes de licences, vérifier la couverture des équipes et les remplacements, et décider quoi leur demander.
tags: IA, custdev, recherche
category: research
layout: wide
image: /og/who-to-interview-before-buying-ai-tools.en.png
mentions: ChatGPT Enterprise, Codex
toc: why=Pourquoi un échantillon | top=Top par activité | groups=Huit groupes | teams=Couverture des équipes | ask=Quoi apprendre | order=Déroulement | faq=Questions | next=Pour aller plus loin
---

Avant d'acheter des outils d'IA, invitez 16 personnes à des entretiens : deux de chacun de huit groupes polaires, comme ceux qui travaillent uniquement dans Codex, ceux qui ont abandonné l'outil ou ceux qui mènent beaucoup de projets. Les utilisateurs les plus actifs comptent, mais ensemble ils décrivent un ou deux scénarios : le top par messages couvre 2 scénarios sur 8. Les personnes se choisissent à partir du rapport, d'un sondage et des listes de licences. Ci-dessous : les groupes, les seuils et quoi demander.

<b-post series="gruppy">
<b-credit para>Plan d'échantillonnage des entretiens établi d'après les recommandations de <a href="https://t.me/Kseniya_Vasil" target="_blank" rel="noopener">@Kseniya_Vasil</a></b-credit>
<b-gruppy-chain label="Du rapport à la liste d'entretiens">
  <stage n="340" t="Personnes dans le rapport" dots="340" on="5:c-code 31:c-code 58:c-work 77:c-work 96:c-chat 120:c-chat 141:c-silent 163:c-silent 187:c-none 205:c-none 226:c-light 248:c-light 269:c-proj 290:c-proj 311:c-team 333:c-team"/>
  <stage n="8" t="Groupes polaires" icons="code-alt:c-code zap-alt:c-work search-alt:c-chat card:c-silent slash:c-none log-out:c-light folder:c-proj grid-sm:c-team"/>
  <stage n="16" t="Entretiens" circles="c-code c-code c-work c-work c-chat c-chat c-silent c-silent c-none c-none c-light c-light c-proj c-proj c-team c-team"/>
</b-gruppy-chain>
<b-cap>Tous les chiffres et tous les noms sont des exemples</b-cap>

<b-chapter id="why" icon="target" title="Quelle décision cela éclaire">

La **tâche métier** vient du [rapport](/blog/chatgpt-enterprise-usage-report/#why) : pour quelles tâches de travail l'ensemble actuel d'outils d'IA est insuffisant et que tester avant d'acheter. Le rapport dit aussi qui prend la décision et selon quels signes. L'échantillon détermine les tâches de qui seront visibles dans les entretiens.

Il faut d'abord définir les façons d'accomplir les tâches qu'il faut voir : via l'outil d'IA de l'entreprise, via d'autres outils d'IA, à la main ou par l'intermédiaire de collègues, et parmi les personnes qui ont essayé l'outil puis l'ont abandonné. Le [rapport d'usage de ChatGPT Enterprise](/blog/chatgpt-enterprise-usage-report/) est l'une des sources : il permet de trouver le premier groupe et ceux qui ont abandonné. Les utilisateurs d'autres outils se trouvent grâce à un [questionnaire](/blog/ai-interviews-without-leading-questions/#form) à l'échelle de l'entreprise et aux listes de licences et d'achats.

  <b-io justify>
    <item k="Entrée">Tableau des personnes issu du rapport, questionnaire à l'échelle de l'entreprise, listes de licences et d'achats</item>
    <item k="Ce que fait la méthode">Choisit 2 personnes pour chaque façon d'accomplir les tâches</item>
    <item k="Décision en sortie">Avec qui parler avant l'achat et que tester, jusqu'à la conclusion qu'aucun nouvel outil n'est nécessaire</item>
  </b-io>
</b-chapter>

<b-chapter id="top" icon="bar-chart" title="Pourquoi un top par activité ne suffit pas">
  <b-why>Trois façons de recruter 16 personnes. La couleur du point est le scénario d'usage. Les personnes les plus actives et les volontaires sont de bons répondants et ont leur place dans tout échantillon, mais cela ne suffit pas à lui seul.</b-why>
  <b-gruppy-compare>
    <way kind="bad" s="partial" t="Top par messages" dots="c-chat c-chat c-chat c-chat c-chat c-chat c-work c-chat c-chat c-chat c-chat c-chat c-work c-chat c-chat c-chat">scénarios : **2 sur 8**</way>
    <way kind="bad" s="partial" t="Volontaires" dots="c-chat c-chat c-code c-chat c-code c-chat c-proj c-chat c-chat c-code c-chat c-chat c-proj c-chat c-chat c-chat">scénarios : **3 sur 8**</way>
    <way kind="good" s="full" t="Groupes polaires" dots="c-code c-code c-work c-work c-chat c-chat c-silent c-silent c-none c-none c-light c-light c-proj c-proj c-team c-team">scénarios : **8 sur 8**</way>
  </b-gruppy-compare>
  <b-finding>
    <ex>Le top par messages couvre 2 scénarios sur 8, les volontaires 3, et les groupes polaires les 8.</ex>
    <gen>Les personnes les plus actives et les plus réactives connaissent le mieux l'outil et valent la peine d'être invitées. Elles se ressemblent et décrivent ensemble un ou deux scénarios. Pour entendre les autres, l'échantillon se complète avec des personnes situées aux extrêmes d'autres critères.</gen>
    <do>Prenez 2 à 3 personnes dans le top par messages. Donnez les places restantes à des personnes ayant d'autres scénarios : celles qui travaillent uniquement via Codex, ont abandonné l'outil, utilisent d'autres outils ou mènent beaucoup de projets.</do>
  </b-finding>
</b-chapter>

<b-chapter id="groups" icon="grid" title="Huit groupes">
  <b-why>Six groupes viennent des seuils du rapport, « abandon » de la date de dernière activité, et « autres outils » du questionnaire. Chaque groupe aide à tester une question. La réponse peut être n'importe laquelle, y compris « aucun nouvel outil n'est nécessaire ». Les seuils ci-dessous servent de repère : ajustez-les pour que chaque groupe compte 2 à 5 personnes.</b-why>
  <b-gruppy-groups>
    <group icon="code-alt" color="c-code" t="Les plus actifs en code" c="code &gt; 200 $ / 3 mois" p="Hana Sato, Luis Moreno">ce qui manque en développement : un outil, l'accès au dépôt, ou rien</group>
    <group icon="zap-alt" color="c-work" t="Tâches d'agent" c="agent &gt; 60 $ / 3 mois" p="Mira Castellano, Tomás Reid">où l'agent est insuffisant et pourquoi : les données, la tâche ou l'agent lui-même</group>
    <group icon="search-alt" color="c-chat" t="Recherche intensive" c="&gt; 3 000 messages, le chat est l'usage principal" p="Jonas Keller, Aiko Lind">comment ils vérifient les réponses et si la recherche actuelle suffit</group>
    <group icon="card" color="c-silent" t="Codex uniquement" c="0 message et &gt; 20 $ / 3 mois" p="Ben Ortiz, Lena Moss">quelles tâches ils traitent sans chat et s'ils ont besoin d'autre chose</group>
    <group icon="slash" color="c-none" t="Inactifs" c="0 message et 0 $ sur la période" p="Pavel Novak, Sara Quinn">comment ils accomplissent leurs tâches et quelles options ils ont envisagées</group>
    <group icon="log-out" color="c-light" t="Essayé puis abandonné" c="avaient des messages, 0 sur les 60 derniers jours" p="Farah Nasser, Yara Selim">pourquoi ils ont arrêté : résultat, temps, sécurité, ou la tâche a disparu</group>
    <group icon="folder" color="c-proj" t="Organisateurs de projets" c="≥ 6 projets actifs" p="Elif Demir, Rafael Costa">ce que les projets leur apportent et ce qui leur manque</group>
    <group icon="grid-sm" color="c-team" t="Autres outils" c="d'après le questionnaire : l'outil d'IA principal n'est pas celui de l'entreprise" p="Nadia Rahimi, Oskar Berg">ce qui est mieux dans l'autre outil et si l'outil actuel peut l'offrir</group>
  </b-gruppy-groups>
  <b-stack label="16 entretiens par groupe">
    <seg w="2" color="c-code">2</seg>
    <seg w="2" color="c-work">2</seg>
    <seg w="2" color="c-chat">2</seg>
    <seg w="2" color="c-silent">2</seg>
    <seg w="2" color="c-none" ink="ink">2</seg>
    <seg w="2" color="c-light" ink="ink">2</seg>
    <seg w="2" color="c-proj">2</seg>
    <seg w="2" color="c-team">2</seg>
  </b-stack>
  <b-legend>
    <item color="c-code">code</item>
    <item color="c-work">agent</item>
    <item color="c-chat">recherche</item>
    <item color="c-silent">Codex uniquement</item>
    <item color="c-none">inactifs</item>
    <item color="c-light">abandon</item>
    <item color="c-proj">projets</item>
    <item color="c-team">autres outils</item>
  </b-legend>
  <b-finding>
    <ex>16 conversations : deux dans chacun des huit groupes.</ex>
    <gen>Deux ou trois personnes par groupe montrent si un problème se répète : si deux sur trois disent la même chose, c'est un signal. Les personnes aux valeurs moyennes sont écartées : leurs réponses ressemblent à celles des groupes voisins et n'ajoutent aucun nouveau scénario sur 16 conversations.</gen>
    <do>Dans chaque groupe, triez les candidats selon son seuil et prenez les deux aux valeurs les plus extrêmes, d'équipes différentes si possible. Si une personne relève de deux groupes, gardez-la dans celui où sa valeur est la plus extrême et prenez le candidat suivant dans l'autre.</do>
  </b-finding>
</b-chapter>

<b-chapter id="teams" icon="alert-circle" title="Couverture des équipes et remplacements">
  <b-why>Une étape distincte après le recrutement, qui ne modifie pas les groupes : combien de personnes sélectionnées relèvent de chaque équipe et qui remplace celles qui déclinent.</b-why>
<b-table>
| Équipe | Utilisateurs réguliers | Sélectionnés | Statut |
|---|---|---|---|
| Équipe A | <b-bar value="74"/> | <b-gruppy-cov colors="c-code c-chat c-silent c-proj c-light"/> | <b-tag kind="ok" inline>couverte</b-tag> |
| Équipe B | <b-bar value="66"/> | <b-gruppy-cov colors="c-work c-work c-chat c-none"/> | <b-tag kind="ok" inline>couverte</b-tag> |
| Équipe C | <b-bar value="51"/> | <b-gruppy-cov colors="c-code c-silent c-none c-proj"/> | <b-tag kind="ok" inline>couverte</b-tag> |
| Équipe D | <b-bar value="34"/> | <b-gruppy-cov colors="c-team"/> | <b-tag kind="ok" inline>après remplacement</b-tag> |
| Équipe E | <b-bar value="18"/> | <b-gruppy-cov colors="c-light c-team"/> | <b-tag kind="ok" inline>après remplacement</b-tag> |
</b-table>
  <b-finding>
    <ex>Après le recrutement par groupe, les équipes D et E n'avaient personne. Trois candidats ont été remplacés par des personnes de D et E au comportement identique, et les cinq équipes sont désormais couvertes.</ex>
    <gen>Les seuils de dépense et de messages attrapent les utilisateurs extrêmes. Une équipe où tout le monde utilise peu l'outil ne franchit jamais un seuil, et ses tâches sortent de l'enquête. C'est pourquoi les équipes se vérifient dans une étape distincte.</gen>
    <do>Répartissez les personnes sélectionnées par équipe. Si une équipe n'a personne, remplacez un candidat d'un groupe adapté par une personne de cette équipe au comportement identique. Remplacez toute personne qui décline par le candidat suivant du même groupe selon son seuil.</do>
  </b-finding>
</b-chapter>

<b-chapter id="ask" icon="chat" title="Quoi apprendre pendant l'entretien">
  <b-why>La conversation part de la dernière tâche de travail, pas de l'outil : ce qu'il fallait obtenir, de quels moyens la personne disposait, ce qu'elle a choisi et comment elle est arrivée au résultat. Le script complet se trouve dans l'[article sur les entretiens](/blog/ai-interviews-without-leading-questions/#script).</b-why>
  <b-gruppy-phases>
    <b-gruppy-phase icon="clock-sm" color="c-chat" t="Tâche">
      <item t="La dernière tâche de travail">Ce qu'il fallait obtenir et pour qui</item>
      <item t="Moyens et choix">De quoi la personne disposait, ce qu'elle a choisi et pourquoi</item>
    </b-gruppy-phase>
    <b-gruppy-phase icon="eye-wide" color="c-proj" t="Parcours">
      <item t="Comment elle est arrivée au résultat">Ce qu'elle a utilisé tel quel, ce qu'elle a terminé elle-même</item>
      <item t="Effort et contraintes">Temps, données, accès, sécurité</item>
    </b-gruppy-phase>
    <b-gruppy-phase icon="check-thin" color="c-work" t="Un cas réussi">
      <item t="Quand cela s'est bien passé">Ce qui était différent alors</item>
    </b-gruppy-phase>
    <b-gruppy-phase icon="trend-up" color="c-code" t="Abandon et changement">
      <item t="A abandonné ou changé d'outil">Vers quoi elle est passée et pourquoi</item>
    </b-gruppy-phase>
  </b-gruppy-phases>
  <b-finding>
    <ex>Six points : quatre sur une même tâche, un cas réussi, et l'abandon ou le changement.</ex>
    <gen>Le récit d'une tâche passée donne des faits : on voit où la personne a choisi l'IA, où une autre voie, et pourquoi. Le cas réussi montre ce qui marche déjà ; l'abandon et le changement montrent pourquoi les outils sont remplacés. Une prévision sur l'avenir ne peut pas être vérifiée.</gen>
    <do>Demandez-lui de nommer sa dernière tâche de travail dans les premières minutes et menez toute la conversation à partir d'elle. Si la personne ne mentionne pas l'IA, demandez quelles options elle a envisagées, plutôt que pourquoi elle n'en utilise pas.</do>
  </b-finding>
</b-chapter>

<b-chapter id="order" icon="list-dotted" title="Déroulement">
  <b-gruppy-steps>
    <step t="Répartir les candidats en huit groupes">Six groupes d'après les seuils du rapport, « abandon » d'après la date de dernière activité, « autres outils » d'après le questionnaire</step>
    <step t="Garder 2 personnes par groupe">D'équipes différentes si le choix existe ; une personne dans un seul groupe</step>
    <step t="Vérifier la couverture des équipes">Si une équipe n'a personne, remplacer un candidat par une personne de cette équipe au comportement identique</step>
    <step t="Planifier des entretiens de 30 minutes">La conversation part de la dernière tâche de travail : ce qu'il fallait obtenir, de quels moyens la personne disposait, ce qu'elle a choisi et comment elle est arrivée au résultat. Avec ceux qui ont abandonné, parler aussi des raisons de l'arrêt</step>
  </b-gruppy-steps>
  <b-gruppy-limit t="Limite.">16 entretiens montrent quels problèmes existent et à quoi ils ressemblent dans le travail réel. Ils ne disent pas combien de personnes dans l'entreprise y sont confrontées. Pour connaître l'ampleur, envoyez à toute l'entreprise un court [questionnaire](/blog/ai-interviews-without-leading-questions/#form), rédigé après les entretiens. Si les problèmes ne sont pas confirmés, c'est aussi un résultat : aucun nouvel outil n'est nécessaire.</b-gruppy-limit>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Questions fréquentes">
  <b-faq-cards>
    <q t="Combien de personnes interviewer avant d'acheter de l'IA ?">16 personnes : deux de chacun de huit groupes polaires.</q>
    <q t="Pourquoi interviewer les utilisateurs les plus actifs ne suffit-il pas ?">Ils se ressemblent et décrivent ensemble un ou deux scénarios : le top par messages couvre 2 scénarios sur 8.</q>
    <q t="Comment choisir les personnes pour les groupes ?">À partir du rapport, d'un sondage et des listes de licences : dans chaque groupe, prendre les deux personnes aux valeurs les plus extrêmes, d'équipes différentes si possible.</q>
    <q t="Que demander pendant l'entretien ?">La dernière tâche réelle : où la personne a choisi l'IA, où une autre voie, et pourquoi.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Pour aller plus loin">
  <b-links>
    <item href="/blog/chatgpt-enterprise-usage-report/" k="Rapport" t="Rapport d'usage de ChatGPT Enterprise">Comment construire le rapport d'usage dont vient le tableau des personnes</item>
    <item href="/blog/ai-interviews-without-leading-questions/" k="Entretiens" t="Entretiens sans questions orientées">Comment mener la conversation à l'oral ou par questionnaire et recueillir les réponses dans Airtable</item>
  </b-links>
</b-chapter>
<b-footer>Plan d'échantillonnage des entretiens établi d'après les recommandations de <a href="https://t.me/Kseniya_Vasil" target="_blank" rel="noopener">@Kseniya_Vasil</a>. Tous les noms, équipes et chiffres des exemples sont fictifs.</b-footer>
</b-post>
