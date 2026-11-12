---
title: Comment mener et analyser des entretiens sur l’usage de l’IA : un script de 30 minutes, un prompt d’analyse et une table Airtable
date: 2026-09-28
updated: 2026-11-13
description: Un script d’appel de 30 minutes, des règles pour rester dans le sujet, un court questionnaire pour toute l’entreprise, l’analyse des entretiens avec ChatGPT ou un agent à l’aide d’un prompt prêt, et la comparaison entre le dit et le mesuré d’après les données du rapport.
tags: IA, custdev, entretiens
category: research
layout: wide
image: /og/ai-interviews-without-leading-questions.en.png
mentions: Airtable, tl;dv, ChatGPT, Claude Code, Model Context Protocol
toc: format=Choisir le format | prep=Préparer la rencontre | script=Un script de 30 minutes | focus=Rester dans le sujet | base=Consigner dans Airtable | agent=Avec Claude Code | wording=Texte : formulations | form=Questionnaire | after=Analyse des entretiens | faq=Questions | next=Pour aller plus loin
---

Un entretien sur le travail avec l’IA dure 30 minutes et s’organise autour de la dernière vraie tâche : ce qui a été fait, le résultat et le coût, puis un succès et un cas où la personne a abandonné l’IA ou changé. La personne choisit le format : appel ou texte. Les réponses sont analysées avec un prompt dans ChatGPT ou un agent, placées dans une table Airtable et confrontées aux données d’usage. Ci-dessous : le script, un questionnaire et le prompt d’analyse.

<b-post series="intervyu">
<b-credit para>La conception des entretiens s’appuie sur les recommandations de <a href="https://t.me/Kseniya_Vasil" target="_blank" rel="noopener">@Kseniya_Vasil</a>. Les personnes, les groupes et les chiffres des entretiens viennent du <a href="/blog/chatgpt-enterprise-usage-report/">rapport d’usage de ChatGPT Enterprise</a>. Il contient aussi la <a href="/blog/chatgpt-enterprise-usage-report/#why">tâche métier</a> : ce que l’entreprise décide, qui décide et selon quels signes.</b-credit>
<b-lead tight>L’analyse se fait ici en quatre étapes : le texte de la conversation va à ChatGPT avec le même prompt à chaque fois, la réponse est copiée dans la ligne de la personne, la table est regroupée par difficulté, et les répétitions sont vérifiées par un questionnaire pour toute l’entreprise. Ce que disent les gens est comparé aux données du rapport. Ci-dessous : le script d’appel, la table et le <a href="#after">prompt d’analyse</a>.</b-lead>
<b-flow label="Deux formats d’entretien convergent dans une seule table">
  <b-lane title="Voix" color="c-chat">
    <node icon="phone" t="Appel">30 min</node>
    <node icon="record" t='<a href="https://tldv.io/" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline;text-underline-offset:3px">tl;dv</a> · <a href="https://www.granola.ai/" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline;text-underline-offset:3px">Granola</a>'>Notes</node>
    <node icon="file-text" t="Transcription">Dans Notes</node>
  </b-lane>
  <b-lane title="Texte" color="c-work">
    <node icon="doc-lines" t="Questions">Dans le chat</node>
    <node icon="chat" t="Relance">1 message</node>
    <node icon="file-text" t="Journal du chat">Copié dans Notes</node>
  </b-lane>
  <b-drop-arrows n="2"/>
  <b-airtable-preview icon="table" title='<a href="https://airtable.com" target="_blank" rel="noopener">Airtable</a>' sub="Tout dans une seule table" count="16 enregistrements">
    <col w="1.1fr" mw="1.2fr">Nom</col>
    <col w="1.7fr" kind="note">Notes</col>
    <col w=".9fr" kind="wide">Format</col>
    <col w="1fr" mw="1fr" kind="ours">Fréquence déclarée</col>
    <col w="1fr" mw="1fr">Selon le rapport</col>
    <col w=".9fr" kind="wide">Statut</col>
    <row>Hana Sato | Animateur [00:00] : Repensez à la dernière… | <b-select-pill tone="cyan">voix</b-select-pill> | <b-select-pill tone="green">chaque semaine</b-select-pill> | <b-select-pill tone="green">chaque semaine</b-select-pill> | <b-select-pill tone="green">Terminé</b-select-pill></row>
    <row>Pavel Novak | [27.09 10:15] Animateur : Décrivez la dernière… | <b-select-pill tone="purple">texte</b-select-pill> | <b-select-pill tone="cyan">régulièrement</b-select-pill> | <b-select-pill tone="red">n’utilise pas</b-select-pill><b-match-mark kind="diff">≠</b-match-mark> | <b-select-pill tone="green">Terminé</b-select-pill></row>
    <row>Nadia Rahimi | Animateur [00:00] | <b-select-pill tone="cyan">voix</b-select-pill> | <b-select-pill tone="yellow">occasionnellement</b-select-pill> | <b-select-pill tone="yellow">occasionnellement</b-select-pill> | <b-select-pill tone="green">Terminé</b-select-pill></row>
  </b-airtable-preview>
</b-flow>
<b-chapter id="format" icon="split" title="Choisir le format">
  <b-table>
    <table><thead><tr><th>Critère</th><th><b-icon name="mic" sw="2.2"/> Voix</th><th><b-icon name="lines" sw="2.2"/> Texte</th></tr></thead><tbody>
    <tr><td>Profondeur des réponses</td><td><b-rating value="5" of="5" label="5 sur 5"/></td><td><b-rating value="2" of="5" label="2 sur 5"/></td></tr>
    <tr><td>Relance sur le moment</td><td><b-rating value="5" of="5" label="5 sur 5"/></td><td><b-rating value="1" of="5" label="1 sur 5"/></td></tr>
    <tr><td>Nombre de personnes que l’on peut toucher</td><td><b-rating value="2" of="5" label="2 sur 5"/></td><td><b-rating value="5" of="5" label="5 sur 5"/></td></tr>
    <tr><td>Temps du répondant</td><td>30 min</td><td>10 min</td></tr>
    <tr><td>Risque de sortir du sujet</td><td><b-rating value="4" of="5" warn label="4 sur 5"/></td><td><b-rating value="1" of="5" warn label="1 sur 5"/></td></tr>
    </tbody></table>
  </b-table>
  <b-cap>Les points sont une note de 1 à 5. Pour le risque, plus de points est pire.</b-cap>
  <b-sublabel top="22">Formule mixte : le répondant choisit le format</b-sublabel>
  <b-choice-flow label="Voix ou texte — le répondant choisit">
    <step t="Invitation">Par message direct</step>
    <step t="Partant pour un appel ?">30 minutes</step>
    <opt k="oui" tone="cyan" pill="voix">appel avec un assistant de prise de notes</opt>
    <opt k="non" tone="purple" pill="texte">mêmes questions, une à la fois, dans le chat</opt>
  </b-choice-flow>
  <b-finding>
    <ex>La voix obtient 5 sur 5 en profondeur, le texte 5 sur 5 en portée. Chaque personne choisit le format.</ex>
    <gen>Quand les gens choisissent eux-mêmes le format, moins d’entre eux déclinent. Les formats diffèrent par la profondeur : un appel donne un récit détaillé avec des relances, un chat donne des réponses courtes. Les réponses du chat aident donc à trouver des cas et des sujets, mais ne sont pas tenues pour équivalentes à celles d’un appel. La voix est le format principal ; le chat est pour ceux qui ne peuvent pas prendre d’appel. Un questionnaire pour toute l’entreprise est un outil à part, rédigé après les entretiens.</gen>
    <do>Proposez les deux formats en une phrase dans l’invitation : « Un appel de 30 minutes, ou préférez-vous répondre aux questions dans le chat ? »</do>
  </b-finding>
</b-chapter>
<b-chapter id="prep" icon="mic" title="Préparer la rencontre">
  <b-todo>
    <item t="Mentionner l’assistant de prise de notes">Dans l’invitation et au début de l’appel : l’assistant prend des notes et une transcription que seule l’équipe voit, et les réponses vont dans le rapport sans noms. Avec <b-ink-link href="https://www.granola.ai/">Granola</b-ink-link>, aucun audio n’est conservé</item>
    <item t='<a href="https://tldv.io/" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline;text-underline-offset:3px">tl;dv</a> ou <a href="https://www.granola.ai/" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline;text-underline-offset:3px">Granola</a>'><b-ink-link href="https://tldv.io/">tl;dv</b-ink-link> est relié au calendrier et rejoint seul la réunion Google Meet ou Zoom. <b-ink-link href="https://www.granola.ai/">Granola</b-ink-link> fonctionne sans bot, avec l’audio de l’ordinateur, et ne conserve que la transcription et les notes</item>
    <item t="Ligne Airtable créée à l’avance">Nom, groupe et chiffres issus du <a href="/blog/chatgpt-enterprise-usage-report/#people">tableau de toutes les personnes</a>, statut « En cours », avant le premier message</item>
    <item t="Guide ouvert sur un second écran">Sept blocs de script et un minuteur de 30 minutes</item>
    <item t="Un seul animateur, sans prise de notes"><b-ink-link href="https://tldv.io/">tl;dv</b-ink-link> ou <b-ink-link href="https://www.granola.ai/">Granola</b-ink-link> fait la transcription, ChatGPT fait l’analyse</item>
  </b-todo>
  <b-finding>
    <do>Avant la rencontre, vérifiez que <b-ink-link href="https://tldv.io/">tl;dv</b-ink-link> voit la réunion dans le calendrier ou que <b-ink-link href="https://www.granola.ai/">Granola</b-ink-link> tourne sur votre ordinateur, et créez la ligne Airtable : il ne restera à l’appel que les questions.</do>
  </b-finding>
</b-chapter>
<b-chapter id="script" icon="clock" title="Un script de 30 minutes">
  <b-share-bar kind="time" label="30">
    <seg w="2" color="c-none" ink="ink">2</seg>
    <seg w="3" color="c-light">3</seg>
    <seg w="8" color="c-chat">8</seg>
    <seg w="5" color="c-proj">5</seg>
    <seg w="4" color="c-team">4</seg>
    <seg w="5" color="c-work">5</seg>
    <seg w="3" color="c-none" ink="ink">3</seg>
  </b-share-bar>
  <b-cap>Minutes par bloc</b-cap>
  <b-call-script>
    <step color="c-none" ink="ink" t="Introduction" q="« Je regarde comment les gens de l’entreprise accomplissent réellement leurs tâches de travail. Ce n’est pas une évaluation de votre personne. Les cas réussis comme les cas ratés me sont tout aussi utiles. Un assistant de prise de notes est avec moi : seule l’équipe voit la transcription, et les réponses vont dans le rapport sans noms. Puis-je l’activer ? »"></step>
    <step color="c-light" t="Rôle et contexte" q='« À quoi consacrez-vous l’essentiel de votre semaine ? »'>Quelles tâches reviennent · où vous cherchez l’information et rédigez des brouillons</step>
    <step color="c-chat" t="La dernière tâche de travail" q='« Pensez à la dernière tâche de travail qui vous a pris un temps notable. Qu’aviez-vous besoin d’obtenir ? »'>Quels moyens vous aviez · ce que vous avez choisi et pourquoi · comment vous êtes arrivé au résultat</step>
    <step color="c-proj" t="Résultat et effort" q='« Qu’avez-vous obtenu au final, et quel effort cela a-t-il demandé ? »'>Ce que vous avez utilisé tel quel · ce que vous avez terminé vous-même · quelles contraintes il y avait : données, accès, sécurité</step>
    <step color="c-team" t="Un cas réussi" q='« Pensez à une fois où une tâche similaire s’est bien passée. Qu’est-ce qui était différent alors ? »'>Outil · données · préparation</step>
    <step color="c-work" t="Abandon et changement" q='« Vous est-il arrivé d’arrêter d’utiliser un outil ou d’en changer ? Comment cela s’est-il passé ? »'>Quel outil · vers quoi vous êtes passé · pourquoi. Si cela n’est jamais arrivé, sautez</step>
    <step color="c-none" ink="ink" t="Conclusion" q="« Qu’est-ce que je n’ai pas demandé et qui compte pour comprendre votre travail ? »">Remercier · dire que les réponses vont dans l’analyse commune sans noms</step>
  </b-call-script>
  <b-branch icon="git-branch" t="Si la personne ne mentionne pas l’IA">Ne demandez pas pourquoi elle ne l’utilise pas. Demandez comment elle a fait la tâche et quelles options elle a envisagées. Ne parlez d’IA que si la personne l’a elle-même citée comme option possible</b-branch>
  <b-finding>
    <ex>La dernière tâche, le résultat et l’effort prennent 13 minutes sur 30 ; le cas réussi et l’abandon ou le changement en prennent 9 de plus.</ex>
    <gen>La conversation est construite autour du travail et non de l’outil. Cela montre où l’IA aide, où la personne a choisi une autre voie, et où aucun nouvel outil n’est nécessaire. Le cas réussi montre ce qui marche déjà ; l’abandon et le changement montrent pourquoi les outils sont remplacés.</gen>
    <do>Réglez un minuteur : à la minute 5, passez à la dernière tâche de travail. Sinon, réduisez le contexte à une seule question. Choisissez vous-même le sujet de la tâche pour la personne : ses tâches apparaissent dans les <a href="/blog/chatgpt-enterprise-usage-report/#projects">thèmes de projets</a>.</do>
  </b-finding>
</b-chapter>
<b-chapter id="focus" icon="target" title="Rester dans le sujet">
  <b-rules>
    <rule icon="parking" t="Parking">Les points hors sujet vont dans un champ séparé ; on y revient dans les 2 dernières minutes</rule>
    <rule icon="one" t="Une question à la fois">Pas de « et aussi… » dans la même phrase</rule>
    <rule icon="undo" t="Retour au cas">Opinion générale → « Pouvez-vous vous rappeler une fois précise ? »</rule>
    <rule icon="shield-off" t="Ne pas défendre l’outil">Répondre à la critique seulement par « Qu’est-ce qui s’est passé ensuite ? »</rule>
    <rule icon="pause" t="Pause de 5 secondes">Se taire après une réponse : les gens ajoutent souvent eux-mêmes l’essentiel</rule>
    <rule icon="bulb-off" t="Ne pas suggérer de solutions">Pas d’idées personnelles, pas de noms d’autres produits</rule>
  </b-rules>
  <b-sublabel top="22">Situation → que dire</b-sublabel>
  <b-table>
    <table><thead>
    <tr><th>Situation</th><th>Réplique de l’animateur</th></tr>
    </thead><tbody>
    <tr><td>Demande une nouvelle fonctionnalité</td><td>« Quand en avez-vous eu besoin pour la dernière fois ? Qu’avez-vous fait alors ? »</td></tr>
    <tr><td>Dérive vers des plaintes sur les processus</td><td>« Je le mets au parking. Retour à la tâche du rapport : qu’est-ce qui s’est passé ensuite ? »</td></tr>
    <tr><td>Répond par « d’habitude » et « toujours »</td><td>« Et la dernière fois, comment cela s’est-il passé ? »</td></tr>
    <tr><td>Demande l’avis de l’animateur</td><td>« Je le partagerai à la fin. Pour l’instant, ce qui compte, c’est comment cela marche pour vous »</td></tr>
    <tr><td>Le temps du bloc est écoulé</td><td>« C’est important, notons-le. Je passe à la question suivante »</td></tr>
    </tbody></table>
  </b-table>
  <b-finding>
    <ex>Cinq situations courantes, chacune avec une réplique qui ramène la conversation à l’épisode.</ex>
    <gen>Derrière une demande de fonctionnalité se cache un cas précis, et c’est ce cas qu’il faut. La demande elle-même sert plus tard d’indice pour savoir où chercher le problème.</gen>
    <do>Gardez le tableau de répliques à côté du guide et notez chaque demande de fonctionnalité mot pour mot dans un champ séparé de la table pour les points hors sujet.</do>
  </b-finding>
</b-chapter>
<b-chapter id="base" icon="table" title="Consigner dans Airtable">
  <b-why>La table garde au même endroit tous les membres de l’échantillon, leurs conversations et les données du rapport. <b>Décision :</b> qui inviter encore pour que chaque groupe ait assez d’entretiens, à qui envoyer une relance, et quels écarts entre usage déclaré et usage mesuré discuter avec la personne.</b-why>
  <b-pipe label="Chemin d’un enregistrement, de l’appel à la table">
    <node icon="record" color="c-chat" sub="Transcription"><b-ink-link href="https://tldv.io/">tl;dv</b-ink-link> · <b-ink-link href="https://www.granola.ai/">Granola</b-ink-link></node>
    <node icon="table" color="c-proj" sub="Champ Notes dans la ligne de la personne"><b-ink-link href="https://airtable.com" plain>Airtable</b-ink-link></node>
  </b-pipe>
  <b-tool-links>
    <item href="https://airtable.com" icon="external" sub="Base et formulaires">Airtable</item>
    <item href="https://tldv.io" icon="external" sub="Notes et transcriptions d’appels">tl;dv</item>
    <item href="https://www.granola.ai/" icon="external" sub="Notes sans bot, aucun audio conservé">Granola</item>
  </b-tool-links>
  <b-cap>Voix : la transcription de <b-ink-link href="https://tldv.io/">tl;dv</b-ink-link> ou de <b-ink-link href="https://www.granola.ai/">Granola</b-ink-link> est copiée dans le champ Notes. Texte : le journal du chat est copié dans le même champ avec la date et l’heure de chaque message.</b-cap>
  <b-sublabel top="22">Une table : une ligne par personne</b-sublabel>
  <b-airtable-grid foot="16 enregistrements · 9 affichés">
    <field type="A" kind="name">Nom</field>
    <field type="≡" kind="note">Notes</field>
    <field type="◉">Format</field>
    <field type="◉">Groupe</field>
    <field type="◉">Statut</field>
    <field type="◉" kind="ours">Fréquence · déclarée</field>
    <field type="◉">Fréquence · selon le rapport</field>
    <field type="ƒ" kind="mark">≠</field>
    <field type="#" kind="num">Tokens · 3 mois</field>
    <field type="#" kind="num">$ / 3 mois</field>
    <field type="▦" kind="num">Activité</field>
    <row>Hana Sato | Animateur [00:00] : Repensez à la dernière fois où vous… | <b-select-pill tone="cyan">voix</b-select-pill> | code | <b-select-pill tone="green">Terminé</b-select-pill> | <b-select-pill tone="green">chaque semaine</b-select-pill> | <b-select-pill tone="green">chaque semaine</b-select-pill> | <b-match-mark kind="same">=</b-match-mark> | 21.9M | 438 | 25.09</row>
    <row>Luis Moreno | Animateur [00:00] : Merci d’avoir pris le temps… | <b-select-pill tone="cyan">voix</b-select-pill> | code | <b-select-pill tone="green">Terminé</b-select-pill> | <b-select-pill tone="cyan">régulièrement</b-select-pill> | <b-select-pill tone="green">chaque semaine</b-select-pill> | <b-match-mark kind="diff">≠</b-match-mark> | 12.7M | 396 | 24.09</row>
    <row>Mira Castellano | [26.09 18:40] Animateur : Quel résultat attendiez-vous… | <b-select-pill tone="purple">texte</b-select-pill> | agent | <b-select-pill tone="yellow">Partiel</b-select-pill> | <b-select-pill tone="cyan">régulièrement</b-select-pill> | <b-select-pill tone="cyan">régulièrement</b-select-pill> | <b-match-mark kind="same">=</b-match-mark> | 3.9M | 97 | 26.09</row>
    <row>Jonas Keller | Animateur [00:00] : À quoi consacrez-vous l’essentiel de votre… | <b-select-pill tone="cyan">voix</b-select-pill> | recherche | <b-select-pill tone="green">Terminé</b-select-pill> | <b-select-pill tone="green">chaque semaine</b-select-pill> | <b-select-pill tone="green">chaque semaine</b-select-pill> | <b-match-mark kind="same">=</b-match-mark> | 1.1M | 19 | 26.09</row>
    <row>Ben Ortiz |  |  | Codex seul | <b-select-pill tone="cyan">En attente de réponse</b-select-pill> |  | <b-select-pill tone="purple">Codex seul</b-select-pill> |  | 3.2M | 64 | 22.09</row>
    <row>Pavel Novak | [27.09 10:15] Animateur : Décrivez la dernière tâche… | <b-select-pill tone="purple">texte</b-select-pill> | inactif | <b-select-pill tone="green">Terminé</b-select-pill> | <b-select-pill tone="cyan">régulièrement</b-select-pill> | <b-select-pill tone="red">n’utilise pas</b-select-pill> | <b-match-mark kind="diff">≠</b-match-mark> | 0 | 0 | —</row>
    <row>Sara Quinn |  |  | inactif | <b-select-pill tone="red">Refusé</b-select-pill> |  | <b-select-pill tone="red">n’utilise pas</b-select-pill> |  | 0 | 0 | —</row>
    <row>Nadia Rahimi | Animateur [00:00] : Pensez à la dernière tâche qui vous a pris… | <b-select-pill tone="cyan">voix</b-select-pill> | autres outils | <b-select-pill tone="green">Terminé</b-select-pill> | <b-select-pill tone="yellow">occasionnellement</b-select-pill> | <b-select-pill tone="yellow">occasionnellement</b-select-pill> | <b-match-mark kind="same">=</b-match-mark> | 0.3M | 6 | 20.09</row>
    <row>Elif Demir |  |  | projets | <b-select-pill tone="gray">En cours</b-select-pill> |  | <b-select-pill tone="green">chaque semaine</b-select-pill> |  | 1.8M | 41 | 27.09</row>
  </b-airtable-grid>
  <b-cap>ChatGPT remplit le champ orange d’après la conversation dans Notes. « Selon le rapport », « Tokens », « $ » et « Activité » viennent du <a href="/blog/chatgpt-enterprise-usage-report/">rapport d’usage de ChatGPT Enterprise</a>. Le champ « ≠ » est une formule qui compare les deux fréquences.</b-cap>
  <b-sublabel top="22">Lire la table : ce que donne chaque colonne</b-sublabel>
  <b-table>
    <table><thead>
    <tr><th>Colonne</th><th>Source</th><th>Ce qu’elle influence</th></tr>
    </thead><tbody>
    <tr><td>Nom · Groupe</td><td>échantillon <a href="/blog/who-to-interview-before-buying-ai-tools/#groups">« Huit groupes »</a></td><td>quelle façon d’accomplir les tâches la personne représente</td></tr>
    <tr><td>Notes</td><td><b-ink-link href="https://tldv.io/">tl;dv</b-ink-link>, <b-ink-link href="https://www.granola.ai/">Granola</b-ink-link> ou journal du chat</td><td>source de chaque champ ; toute conclusion est vérifiée par une citation</td></tr>
    <tr><td>Format</td><td>animateur</td><td>profondeur des réponses : un chat a moins de détails qu’un appel</td></tr>
    <tr><td>Statut</td><td>animateur</td><td>action suivante : relancer, faire un suivi ou remplacer la personne</td></tr>
    <tr><td>Fréquence · déclarée</td><td>ChatGPT la tire de la conversation</td><td>à quelle fréquence la personne dit utiliser l’IA</td></tr>
    <tr><td>Fréquence · selon le rapport</td><td><a href="/blog/chatgpt-enterprise-usage-report/#depth">rapport · profondeur d’adoption</a></td><td>à quelle fréquence elle l’utilise d’après les données de la console</td></tr>
    <tr><td>≠</td><td>formule Airtable : compare les deux fréquences</td><td>pas de concordance : une question à éclaircir lors de l’entretien, car le rapport ne voit que l’outil d’entreprise sur 3 mois</td></tr>
    <tr><td>Tokens · 3 mois</td><td>rapport · <a href="/blog/chatgpt-enterprise-usage-report/#top-spend">classement par dépense</a></td><td>volume de travail dans l’outil d’entreprise sur 3 mois, pour l’échantillonnage, non pour pondérer la réponse</td></tr>
    <tr><td>$ · 3 mois</td><td>rapport · classement</td><td>dépense sur 3 mois, pour l’échantillonnage, non pour pondérer la réponse</td></tr>
    <tr><td>Activité</td><td>rapport · export des utilisateurs</td><td>date de la dernière action : ancienne signifie un candidat pour le groupe « Essayé et abandonné »</td></tr>
    </tbody></table>
  </b-table>
  <b-sublabel top="22">Comment lire les lignes d’exemple</b-sublabel>
  <b-table>
    <table><thead>
    <tr><th>Ligne</th><th>Signal</th><th>Que faire</th></tr>
    </thead><tbody>
    <tr><td>Hana Sato</td><td>fréquences concordantes · 438 $ sur le code · <b-select-pill tone="green">Terminé</b-select-pill></td><td>la plus forte dépense sur le code : une conversation sur sa dernière tâche montre si l’outil actuel suffit</td></tr>
    <tr><td>Luis Moreno</td><td><b-match-mark kind="diff">≠</b-match-mark> dit « régulièrement », en réalité chaque semaine</td><td>éclaircir : quelles tâches il compte comme du travail avec l’IA</td></tr>
    <tr><td>Pavel Novak</td><td><b-match-mark kind="diff">≠</b-match-mark> « régulièrement » avec zéro token</td><td>éclaircir : quels outils il utilise et pour quelles tâches</td></tr>
    <tr><td>Mira Castellano</td><td><b-select-pill tone="yellow">Partiel</b-select-pill></td><td>envoyer une relance : à quel moment de la tâche il a fallu finir à la main</td></tr>
    <tr><td>Ben Ortiz</td><td><b-select-pill tone="cyan">En attente de réponse</b-select-pill> · Codex seul · 64 $</td><td>envoyer un rappel : sans lui, le groupe « Codex seul » reste vide</td></tr>
    <tr><td>Sara Quinn</td><td><b-select-pill tone="red">Refusé</b-select-pill></td><td>remplacer selon la <a href="/blog/who-to-interview-before-buying-ai-tools/#teams">règle de remplacement</a> : le candidat suivant du groupe « Inactifs »</td></tr>
    <tr><td>Elif Demir</td><td><b-select-pill tone="gray">En cours</b-select-pill> · 7 projets actifs</td><td>planifier un appel ; remplir la fréquence déclarée après la conversation</td></tr>
    </tbody></table>
  </b-table>
  <b-sublabel top="22">Déclaré et données : que préciser lors de l’entretien</b-sublabel>
  <b-vs-grid>
    <h>Mesuré lors de l’entretien</h>
    <h>Pendant dans le rapport</h>
    <h>S’ils diffèrent, éclaircir</h>
    <c><b>À quelle fréquence on l’utilise</b></c>
    <c><a href="/blog/chatgpt-enterprise-usage-report/#depth">activité hebdomadaire</a></c>
    <c>quels outils la personne utilise et pour quelles tâches</c>
    <c><b>Tâche principale</b></c>
    <c><a href="/blog/chatgpt-enterprise-usage-report/#main-tool">outil principal</a></c>
    <c>quelles tâches la personne compte comme du travail avec l’IA</c>
    <c><b>Combien de tâches cela couvre</b></c>
    <c><a href="/blog/chatgpt-enterprise-usage-report/#projects">nombre de projets</a></c>
    <c>quels projets sont vivants et pour quelles tâches</c>
    <c><b>Que l’on utilise d’autre</b></c>
    <c><a href="/blog/chatgpt-enterprise-usage-report/#connectors">connecteurs</a></c>
    <c>ce que sont ces outils et pour quelles tâches ; les noter comme manière de travailler</c>
    <c><b>Combien de temps cela fait gagner</b></c>
    <c>pas de pendant</c>
    <c>déclaré seulement</c>
  </b-vs-grid>
  <b-cap>Limites des données : le rapport ne voit que l’outil d’entreprise et seulement sur 3 mois. Les comptes personnels et les autres outils n’y figurent pas ; un écart est donc une question à éclaircir, non une conclusion.</b-cap>
  <b-sublabel top="22">Statuts des 16 invités</b-sublabel>
  <b-share-bar kind="status" label="Répartition des statuts">
    <seg w="9" color="pg" ink="pg-i">Terminé · 9</seg>
    <seg w="2" color="py" ink="py-i">2</seg>
    <seg w="2" color="pc" ink="pc-i">2</seg>
    <seg w="2" color="pn" ink="pn-i">2</seg>
    <seg w="1" color="pr" ink="pr-i">1</seg>
  </b-share-bar>
  <b-legend>
    <item color="pg">Terminé</item>
    <item color="py">Partiel</item>
    <item color="pc">En attente de réponse</item>
    <item color="pn">En cours</item>
    <item color="pr">Refusé</item>
  </b-legend>
  <b-finding>
    <ex>9 invités sur 16 ont donné un entretien : la part « Terminé » est de 56 %. La fréquence déclarée de Pavel Novak ne concorde pas avec le rapport.</ex>
    <gen>Une ligne par personne garde ensemble les données du rapport, le format, la conversation brute et le statut. Les statuts montrent si l’on a assez de monde : la part « Terminé » parmi les invités indique combien inviter pour que chaque groupe obtienne le nombre voulu d’entretiens. Un écart entre usage déclaré et usage mesuré est une question à éclaircir : le rapport ne voit que l’outil d’entreprise sur 3 mois.</gen>
    <do>Mettez le statut à jour juste après chaque conversation. Gardez le nombre d’entretiens nécessaire dans chaque groupe : avec une part « Terminé » de 56 %, invitez quatre personnes pour deux entretiens par groupe. Envoyez une relance à tous ceux marqués Partiel.</do>
  </b-finding>
</b-chapter>
<b-chapter id="wording" icon="lines" title="Texte : formulations">
  <b-why>Dans un chat ou un questionnaire, il est difficile de redemander ; une question mal formulée gâche donc la réponse sans possibilité de rattraper. Cinq erreurs courantes :</b-why>
  <b-question-pairs>
    <pair tag="orientée" bad="Dans quelle mesure l’outil est-il pratique pour vous ?">Décrivez la dernière tâche de travail qui vous a pris un temps notable.</pair>
    <pair tag="provocatrice" bad="Pourquoi n’utilisez-vous pas l’outil si l’entreprise le paie ?">Comment avez-vous fait votre dernière tâche de ce genre ? Quelles options avez-vous envisagées ?</pair>
    <pair tag="demande de fonctionnalité" bad="Quelles fonctionnalités vous manquent ?">À quel moment de votre dernière tâche avez-vous dû finir le travail à la main ?</pair>
    <pair tag="hypothétique" bad="L’utiliseriez-vous davantage s’il avait un agent ?">Qu’avez-vous fait la dernière fois que le résultat ne vous convenait pas ?</pair>
    <pair tag="double question" bad="Que faites-vous dans l’outil et à quelle fréquence ?">Quelle est la dernière tâche que vous avez faite avec l’IA ?</pair>
  </b-question-pairs>
  <b-finding>
    <ex>Les cinq questions corrigées portent toutes sur un épisode passé.</ex>
    <gen>Les questions sur la commodité, les fonctionnalités et l’avenir recueillent des opinions. Une décision d’achat repose sur ce que les gens ont déjà fait ; une bonne question porte donc sur un cas passé précis.</gen>
    <do>Relisez les questions du chat et du questionnaire et réécrivez toute question contenant « pratique », « aimeriez-vous » ou « quelles fonctionnalités » en une question sur la dernière tâche de travail.</do>
  </b-finding>
</b-chapter>
<b-chapter id="agent" icon="terminal" title="Remplir la table avec Claude Code">
  <b-why>Toute la table peut être confiée à un agent : Claude Code ou tout autre agent compatible MCP se connecte à Airtable, crée les lignes, récupère les données du rapport et analyse les conversations tout seul.</b-why>
  <b-pipe label="Un agent remplit la table">
    <node icon="terminal" color="c-code" sub="Ou tout agent compatible MCP"><b-ink-link href="https://code.claude.com/docs" plain>Claude Code</b-ink-link></node>
    <node icon="plug" color="c-light" sub="Lit et écrit la table">Airtable MCP</node>
    <node icon="table" color="c-proj" sub="Tous les champs et statuts">Airtable</node>
  </b-pipe>
  <b-todo top="12">
    <item t="Créer les lignes">À partir de la liste des personnes retenues pour les entretiens : nom, groupe, statut</item>
    <item t="Récupérer les données du rapport">Tokens, $, activité, fréquence selon le rapport</item>
    <item t="Analyser Notes">Avec le même prompt que dans ChatGPT : champs, difficultés, fréquence déclarée, citations</item>
    <item t="Mettre à jour les statuts">« Partiel » (réponse incomplète) si l’analyse contient « pas de données »</item>
  </b-todo>
  <b-tool-links>
    <item href="https://support.airtable.com/docs/using-the-airtable-mcp-server" icon="external" sub="Comment connecter">Airtable MCP</item>
  </b-tool-links>
  <b-finding>
    <ex>L’agent crée les lignes, récupère le rapport, analyse Notes et met à jour les statuts : quatre étapes sans saisie manuelle.</ex>
    <gen>Via MCP, l’agent travaille directement avec la table, laissant au chercheur les conversations et la vérification des conclusions par les citations. Un seul prompt d’analyse pour l’agent et pour ChatGPT garde les lignes comparables.</gen>
    <do>Connectez Airtable MCP à Claude Code et commencez par une commande : « Crée des lignes pour les personnes de la liste avec le statut En cours ».</do>
  </b-finding>
</b-chapter>
<b-chapter id="form" icon="doc-lines" title="Questionnaire">
  <b-why>Le questionnaire est rédigé après les entretiens, une fois que l’on sait quelles tâches et quelles difficultés existent. Il part vers toute l’entreprise pour savoir leur étendue. Les questions sont courtes, et les options de réponse viennent de l’analyse des entretiens.</b-why>
  <b-survey>
    <q t="Parmi ces tâches, lesquelles faites-vous au travail ?" color="c-proj" tag="tâches">choix : tâches issues des entretiens · autre, champ libre</q>
    <q t="À quelle fréquence faites-vous ces tâches ?" color="c-proj" tag="fréquence des tâches">choix : tous les jours · toutes les semaines · plus rarement · je n’en fais pas</q>
    <q t="Quels outils utilisez-vous pour elles ?" color="c-proj" tag="outils">choix : ChatGPT · Claude · Cursor · un autre outil d’IA · je n’utilise pas l’IA</q>
    <q t="À quelles difficultés vous heurtez-vous dans ces tâches ?" color="c-proj" tag="difficultés">choix : difficultés issues des entretiens · je ne me heurte à aucune · autre, champ libre</q>
    <q t="À quelle fréquence cette difficulté gêne-t-elle ?" color="c-proj" tag="fréquence de la difficulté">choix : dans presque chaque tâche · parfois · rarement</q>
    <q t="Quelle importance cela a-t-il pour le résultat ?" color="c-proj" tag="impact">choix : gêne beaucoup · gêne · compte à peine</q>
    <q t="Comment contournez-vous aujourd’hui cette difficulté ?" tag="contournements">champ libre · je ne la contourne pas</q>
    <q t="Qu’y a-t-il encore d’important que les questions ont manqué ?" tag="oublis">champ libre</q>
  </b-survey>
  <b-finding>
    <ex>Huit questions courtes : six à choix multiples avec des options issues des entretiens et deux champs libres.</ex>
    <gen>Les entretiens montrent quelles tâches et difficultés existent ; le questionnaire montre combien de personnes y sont confrontées et à quel point cela gêne. Les options « je ne me heurte à aucune », « je n’utilise pas l’IA » et le champ libre captent ce que les entretiens ont manqué.</gen>
    <do>Rassemblez les options de réponse à partir de l’analyse des entretiens et envoyez le questionnaire à toute l’entreprise. Comptez quelle part des gens est confrontée à chaque difficulté, à quelle fréquence et à quel point elle gêne. Ces parts alimentent la <a href="/blog/chatgpt-enterprise-usage-report/#decision">procédure de décision</a> du rapport.</do>
  </b-finding>
</b-chapter>
<b-chapter id="after" icon="bulb" title="Analyse des entretiens : le prompt d’analyse et la comparaison avec les données du rapport">
  <b-steps round>
    <step t="Donner le texte de Notes à ChatGPT">Avec le même prompt pour chaque entretien</step>
    <step t="Reporter la réponse de ChatGPT dans la ligne de la personne">Tâche, contexte, voie choisie, résultat, effort, contraintes, difficultés, fréquence déclarée</step>
    <step t="Regrouper la table par difficulté">Les personnes ayant la même difficulté se retrouvent côte à côte : on voit combien elles sont et de quels groupes</step>
    <step t="Vérifier avec le questionnaire">Les répétitions deviennent des options de réponse du questionnaire pour toute l’entreprise ; la répartition par équipe est comparée à l’<a href="/blog/chatgpt-enterprise-usage-report/#uniformity">uniformité</a></step>
  </b-steps>
  <b-subhead>Prompt pour l’analyse des entretiens</b-subhead>
  <b-prompt>
    Ci-dessous, une conversation avec un employé sur ses tâches de travail.
    Réponds strictement par champ, uniquement ce que la personne a dit elle-même :
    1. Tâche : la dernière tâche de travail précise
    2. Contexte : pour qui et pourquoi, de quels moyens elle disposait
    3. Outil ou voie choisis, et pourquoi
    4. Résultat
    5. Effort : temps et reprises manuelles
    6. Contraintes : données, accès, sécurité
    7. Difficultés : catégories de la liste {catégories du tableau de signes du rapport} ou « pas de difficultés » ; si aucune ne convient, une nouvelle catégorie dans tes propres mots
    8. Fréquence déclarée : chaque semaine / régulièrement / occasionnellement / n’utilise pas / inconnue
    9. 1 à 2 citations mot pour mot
    Si quelque chose n’est pas dans la conversation, écris « pas de données » et ne l’invente pas.

    {texte de Notes}
  </b-prompt>
  <b-gauge label="Que faire d’une répétition">
    <row k="1 personne" w="15%" color="c-none">cas</row>
    <row k="répétition chez plusieurs" w="45%" color="c-light">vérifier avec le questionnaire</row>
    <row k="questionnaire confirmé" w="100%" color="c-work">dans la procédure de décision</row>
  </b-gauge>
  <b-finding>
    <ex>Une difficulté chez une personne est un cas ; une répétition chez plusieurs est une raison de vérifier avec le questionnaire.</ex>
    <gen>L’analyse garde toute la tâche, pas seulement la difficulté : sans le contexte, la voie choisie et l’effort, on ne peut pas dire si un nouvel outil est nécessaire. Une répétition dans les entretiens montre ce qu’il faut vérifier, non combien de personnes y sont confrontées : seul le questionnaire le montre. Un seul prompt pour toutes les conversations garde les champs comparables, et « pas de données » empêche ChatGPT d’inventer.</gen>
    <do>Quand plusieurs analyses se sont accumulées, regroupez la table par difficulté et reportez les répétitions dans les options de réponse du <a href="#form">questionnaire</a>. Notez « pas de difficultés » comme un résultat. Prenez les catégories dans le <a href="/blog/chatgpt-enterprise-usage-report/#signs">tableau de signes</a> du rapport et ajoutez-en de nouvelles si aucune ne convient. La décision de pilote suit la <a href="/blog/chatgpt-enterprise-usage-report/#decision">procédure</a> du rapport.</do>
  </b-finding>
  <b-sublabel top="22">Questions courantes</b-sublabel>
  <b-qa>
    <q t="Comment analyser un entretien avec ChatGPT">Le texte de la conversation du champ Notes va à ChatGPT avec le même prompt pour chaque entretien. La réponse est copiée dans la ligne de la personne : tâche, contexte, méthode, résultat, coûts, contraintes, difficultés, fréquence déclarée. La table est ensuite regroupée par difficulté.</q>
    <q t="Un agent peut-il faire l’analyse des entretiens">Oui. Claude Code ou un autre agent compatible MCP se connecte à Airtable, crée les lignes, récupère les données du rapport et analyse Notes avec le même prompt. Le chercheur garde les conversations et vérifie les conclusions par les citations.</q>
    <q t="Comment comparer ce que disent les gens avec les données">La table a deux champs : la fréquence déclarée et la fréquence selon le rapport, avec un indicateur d’écart à côté. Les écarts se discutent avec la personne au lieu d’être corrigés en silence.</q>
    <q t="Comment analyser ensemble les appels et les réponses textuelles">La conversation textuelle est copiée dans le même champ Notes avec l’heure de chaque message. Les réponses textuelles aident à trouver des cas et des thèmes, mais ne sont pas tenues pour équivalentes à celles d’un appel.</q>
  </b-qa>
</b-chapter>
<b-chapter id="faq" icon="chat" title="Questions fréquentes">
  <b-faq-cards>
    <q t="Comment mener un entretien de 30 minutes sur le travail avec l’IA ?">Construisez la conversation autour de la dernière vraie tâche : ce qui a été fait, le résultat et le coût, puis un succès et un cas où la personne a abandonné l’IA.</q>
    <q t="Un appel ou du texte ?">La personne choisit le format. Un appel donne un récit détaillé avec des relances, le texte donne des réponses courtes ; les réponses textuelles ne sont donc pas tenues pour équivalentes à celles d’un appel.</q>
    <q t="Comment analyser des entretiens avec ChatGPT ?">Donnez le texte de la conversation à ChatGPT avec le même prompt pour chaque entretien et copiez la réponse dans la ligne de la personne dans Airtable.</q>
    <q t="Comment confronter ce que disent les gens aux données ?">La table a deux champs côte à côte : la fréquence déclarée et la fréquence issue du rapport. Les différences se discutent avec la personne.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Pour aller plus loin">
  <b-links cols="2">
    <item href="/blog/chatgpt-enterprise-usage-report/" k="Rapport" t="Rapport d’usage de ChatGPT Enterprise">Qui l’utilise, pour quelles tâches, et quels outils acheter ensuite</item>
    <item href="/blog/who-to-interview-before-buying-ai-tools/" k="Échantillon" t="Qui interroger">Qui inviter aux entretiens</item>
  </b-links>
</b-chapter>
<b-footer>La conception des entretiens s’appuie sur les recommandations de <a href="https://t.me/Kseniya_Vasil" target="_blank" rel="noopener">@Kseniya_Vasil</a>. Tous les noms, équipes et chiffres des exemples sont fictifs.</b-footer>
</b-post>
