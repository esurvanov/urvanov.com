---
title: Comment analyser l'usage de ChatGPT Enterprise dans une entreprise : qui l'utilise, pour quoi et quels outils d'IA acheter ensuite
date: 2026-09-28
updated: 2026-11-13
description: Comment savoir ce que les employés font de ChatGPT Enterprise : cinq exports de la console d'administration donnent la profondeur d'adoption, l'homogénéité entre équipes, l'outil principal, une carte des tâches, des contrôles de données et une courte liste de personnes à interviewer.
tags: IA, recherche, analytique
category: research
layout: wide
image: /og/chatgpt-enterprise-usage-report.en.png
mentions: ChatGPT Enterprise, Codex, ChatGPT Work, Claude in Chrome
toc: why=Pourquoi ce rapport | order=Déroulement | data=Ce que voit l'administrateur | layer1=Vue d'ensemble | layer2=Nature du travail | layer3=Vérification | layer4=Choix des personnes | start=Par où commencer | faq=Questions | next=Pour aller plus loin
---

ChatGPT Enterprise est la version de ChatGPT destinée aux organisations, avec une console d'administration qui montre qui utilise l'outil et comment. Le rapport se construit à partir de cinq exports de cette console et donne la profondeur d'adoption, l'homogénéité entre équipes, la nature des tâches et les personnes à interviewer. Il sert à décider quels outils d'IA acheter, qui former et quelles hypothèses vérifier.

<b-post series="kto">
<b-dir-map label="Quatre axes d'analyse">
  <dir href="#layer1" n="01" color="c-chat" t="Vue d'ensemble" big="21%" sub="L'utilisent chaque semaine" dec="Où investir dans la formation"><b-mini-funnel><seg w="82%" color="d-rare" ink="d-rare-t">82%</seg><seg w="47%" color="d-reg" ink="d-reg-t">47%</seg><seg w="21%" color="d-week" ink="d-week-t">21%</seg></b-mini-funnel></dir>
  <dir href="#layer2" n="02" color="c-work" t="Nature du travail" big="70%" sub="Des connexions sont Slack et Notion" dec="Quel outil acheter" art="chatgpt-enterprise-usage-report/map-donut"></dir>
  <dir href="#layer3" n="03" color="c-code" t="Vérification" big="±2%" sub="Tolérance du rapprochement des exports" dec="Peut-on se fier aux chiffres"><b-csv-check><file color="c-chat">CHAT</file><file color="c-work">WORK</file><file color="c-code">CODEX</file></b-csv-check></dir>
  <dir href="#layer4" n="04" color="c-proj" t="Choix des personnes" big="16" sub="Sur 340 dans l'exemple, pour des entretiens" dec="Avec qui parler avant d'acheter"><b-dot-grid n="340" on="5,31,58,77,96,120,141,163,187,205,226,248,269,290,311,333"/></dir>
</b-dir-map>
<b-chapter id="why" title="Quelles décisions le rapport aide à prendre">
  <b-lead-large><b>Objectif métier :</b> déterminer pour quelles tâches de travail l'ensemble actuel d'outils d'IA est insuffisant et quelles solutions valent d'être testées avant un achat. La décision revient au responsable du budget des outils d'IA, avec les responsables des équipes où se déroule le pilote. L'accès aux données et la sécurité sont validés par l'équipe de sécurité de l'information. Les critères de décision sont les signes du tableau ci-dessous.</b-lead-large>

  Que l'ensemble actuel soit sous-optimal quelque part est une hypothèse : le rapport et les entretiens la vérifient. « Sous-optimal » se décompose en signes vérifiables. La conclusion « aucun nouvel outil n'est nécessaire » est aussi un résultat.

  <b-table id="signs">
    <table><thead>
    <tr><th>Signe</th><th>Comment il se manifeste</th><th>Catégorie d'entretien</th><th>Où le rapport le montre</th></tr>
    </thead><tbody>
    <tr><td>Qualité du résultat</td><td>les réponses sont inexactes ou inventées</td><td><b-tag kind="no" line>hallucinations</b-tag></td><td><a href="/blog/chatgpt-enterprise-usage-report/#connectors">Connecteurs</a></td></tr>
    <tr><td>Temps et reprise manuelle</td><td>beaucoup d'allers-retours, le résultat est terminé à la main</td><td><b-tag kind="no" line>prompt</b-tag></td><td><a href="/blog/chatgpt-enterprise-usage-report/#depth">Profondeur</a>, <a href="/blog/chatgpt-enterprise-usage-report/#main-tool">Outil principal</a></td></tr>
    <tr><td>Reproductibilité</td><td>un résultat différent à chaque fois pour la même tâche</td><td><b-tag kind="no" line>reproductibilité</b-tag></td><td><a href="/blog/chatgpt-enterprise-usage-report/#skills">Skills</a>, <a href="/blog/chatgpt-enterprise-usage-report/#projects">Thèmes des projets</a></td></tr>
    <tr><td>Passage à l'échelle</td><td>un scénario qui fonctionne ne se transfère pas à une autre équipe</td><td><b-tag kind="no" line>échelle</b-tag></td><td><a href="/blog/chatgpt-enterprise-usage-report/#uniformity">Homogénéité</a></td></tr>
    <tr><td>Accès aux données</td><td>le système nécessaire n'est pas connecté</td><td><b-tag kind="no" line>accès aux données</b-tag></td><td><a href="/blog/chatgpt-enterprise-usage-report/#connectors">Connecteurs</a></td></tr>
    <tr><td>Coût</td><td>cher par unité de résultat</td><td><b-tag kind="no" line>coût</b-tag></td><td><a href="/blog/chatgpt-enterprise-usage-report/#top-spend">Classement par dépense</a></td></tr>
    </tbody></table>
  </b-table>
  <b-cap>Limites des données : le rapport ne voit que l'outil d'entreprise et seulement sur la période d'export, 3 mois. Les comptes personnels et les autres outils n'y apparaissent pas.</b-cap>
  <b-section-title id="decision" top="22">Comment les réponses deviennent une décision d'achat</b-section-title>
  <b-why>Le rapport indique où regarder, et la décision d'achat ne se prend qu'après ces cinq étapes, afin que l'argent aille à une tâche que beaucoup de gens ont et que rien ne couvre aujourd'hui.</b-why>
  <b-steps top="18" round>
    <step t="Entretiens">Quelles tâches et quelles difficultés existent, et comment les gens les contournent aujourd'hui</step>
    <step t="Questionnaire à toute l'entreprise">Combien de personnes rencontrent la difficulté, à quelle fréquence et à quel point elle gêne</step>
    <step t="Comparer">Ampleur de la tâche, gravité des conséquences, solutions de contournement, coût de la solution</step>
    <step t="Tester les outils">Les options prometteuses sur de vraies tâches, avec les employés</step>
    <step t="Décision">Le responsable du budget décide d'après les six <a href="#signs">signes ci-dessus</a> : qualité, temps et reprise, reproductibilité, échelle, accès aux données, coût ; « aucun nouvel outil n'est nécessaire » est une issue valable</step>
  </b-steps>
  <b-io justify>
    <item k="Entrée">Exports de la console : messages, dépenses, projets et connecteurs de chaque personne</item>
    <item k="Ce que fait le rapport">Transforme les exports en segments, en maturité des équipes et en personnes précises, comme matière pour une décision</item>
    <item k="Décisions en sortie">Quel outil piloter, pour quelle équipe, avec qui parler avant d'acheter et où aucun budget n'est nécessaire</item>
  </b-io>
</b-chapter>
<b-chapter id="order" title="Déroulement">

  Cinq étapes, de l'export à la liste finale de personnes.

  <b-steps top="18" round>
    <step t="Exporter les données">Cinq sections de la console, détails dans « Où récupérer les données »</step>
    <step t="Construire la vue d'ensemble">Profondeur d'adoption, homogénéité entre équipes, outil principal, segments</step>
    <step t="Cartographier la nature du travail">Quelles tâches les gens résolvent, avec quels outils intégrés et via quelles intégrations</step>
    <step t="Vérifier sur les données brutes">Contrôler chaque synthèse par rapport à l'export d'origine</step>
    <step t="Choisir les personnes et conclure">Une liste d'entretiens et les questions à y vérifier<b-link-chips><item href="/blog/who-to-interview-before-buying-ai-tools/" icon="arrow-right">Qui interviewer</item><item href="/blog/ai-interviews-without-leading-questions/" icon="arrow-right">Comment mener les entretiens</item></b-link-chips></step>
  </b-steps>
</b-chapter>
<b-chapter id="data" title="Ce que voit l'administrateur de ChatGPT Enterprise : où récupérer les données">

  Tout se construit à partir de cinq sections d'une même console d'administration <a href="https://openai.com/chatgpt/enterprise/" target="_blank" rel="noopener">ChatGPT Enterprise</a>. Survolez <b>i</b> pour voir ce que contient exactement chaque section.

  <b-subhead>Comment exporter les données de la console ChatGPT Enterprise : à la main et avec l'agent de navigateur Claude in Chrome</b-subhead>
  <b-howto><b>Comment exporter.</b> La console dispose bien d'API, mais elles ne couvrent qu'une partie des données : <a href="https://learn.chatgpt.com/docs/enterprise/analytics-api" target="_blank" rel="noopener">l'analytique de Codex</a>, le coût des crédits et les journaux de conversations pour la conformité. Les exports des utilisateurs, des projets et des skills, ainsi que le classement par produit, se récupèrent plus facilement dans l'interface. L'export convient bien à <a href="https://claude.com/claude-in-chrome" target="_blank" rel="noopener">Claude in Chrome</a> : il ouvre la bonne section, règle le filtre, clique sur l'export et enregistre le CSV. Chaque étape est visible à l'écran, donc un mauvais filtre ou une mauvaise section se repère aussitôt, avant que les chiffres n'arrivent dans le rapport.<warn icon="shield-alert"><b>Accès.</b> L'API de la console n'est pas toujours disponible : les politiques de sécurité des entreprises restreignent souvent les clés d'API d'administration. Dans ce cas, exportez chaque section par l'interface.</warn></b-howto>
  <b-sources>
    <src icon="users-alt" href="https://chatgpt.com/admin/usage/users" t="Utilisateurs" path="chatgpt.com/admin/usage/users" what="Messages, dates d'activité et outils intégrés de chaque personne" tip-label="Contenu de la section Utilisateurs">Export CSV pour une période allant jusqu'à 12 mois. Champs : messages, tool_messages, gpt_messages, project_messages, department, groups, seat_type, last_day_active. La console marque elle-même les « power users » d'un badge.</src>
    <src icon="trophy" href="https://admin.openai.com" t="Classement" path="admin.openai.com → Analytics → Leaderboard" what="Dépenses, tokens et lignes de code de chaque personne, séparément pour les produits Chat, Work et Codex" tip-label="Contenu du classement">Bouton d'export à côté du titre → « User ranking », CSV ou JSON. Champs : Name, Email, Credits, Estimated costs, Tokens, Lines of code. Le filtre « Product » change le contenu de l'export. L'historique couvre environ 120 jours.</src>
    <src icon="folder-iv" href="https://chatgpt.com/admin/usage/projects" t="Projets" path="chatgpt.com/admin/usage/projects" what="Qui a créé un projet, combien de messages il contient et s'il est actif" tip-label="Contenu de la section Projets">Champs : project_name, project_creator_email, messages_workspace, unique_messagers_workspace, is_active. Certains noms arrivent sous la forme [content redacted] : la console les masque d'elle-même.</src>
    <src icon="plug-alt" href="https://chatgpt.com/admin/usage" t="Vue d'ensemble : connecteurs et skills" path="chatgpt.com/admin/usage" what="À quelles applications les gens connectent l'assistant et quels skills ils utilisent" tip-label="Contenu de la section Vue d'ensemble">Les blocs « App interactions » et « Skills » : le nombre d'appels à chaque connecteur et à chaque skill sur la période choisie.</src>
    <src icon="chart-line-iv" href="https://admin.openai.com" t="Analytique : tâches" path="admin.openai.com → Analytics → Tasks" what="La classification des tâches propre à la console : code ou travail de connaissance (tout sauf le code)" tip-label="Contenu de l'onglet Tâches">Part du code et du travail de connaissance, principales tâches par crédits. Un modèle d'OpenAI étiquette les tâches sur un échantillon d'environ 10 % des requêtes des 30 derniers jours.</src>
  </b-sources>
</b-chapter>
<b-chapter id="layer1" icon="grid" title="Vue d'ensemble">

  Les quatre sections suivantes forment le rapport lui-même, chacune avec son objectif. <b>Objectif :</b> montrer quels groupes de personnes existent dans l'entreprise et quelle est leur taille.

  <b-subsection id="depth" title="Profondeur d'adoption">
    <b-art-row names="chatgpt-enterprise-usage-report/depth-tried chatgpt-enterprise-usage-report/depth-regular chatgpt-enterprise-usage-report/depth-weekly"/>
    <b-why>La profondeur d'adoption montre à quel point l'outil est entré dans le travail de l'entreprise : combien de personnes l'ont utilisé au moins une fois, régulièrement et chaque semaine. Celles qui n'écrivent jamais dans le chat et ne travaillent que via Codex sont comptées à part. <b>Décision :</b> dans quel groupe investir la formation et faut-il acheter des licences supplémentaires maintenant.</b-why>
    <b-share-bar kind="wide">
      <seg w="20.9%" color="d-week" ink="d-week-t">71</seg>
      <seg w="25.9%" color="d-reg" ink="d-reg-t">88</seg>
      <seg w="28.5%" color="d-rare" ink="d-rare-t">97</seg>
      <seg w="6.8%" color="d-api" ink="d-api-t">23</seg>
      <seg w="17.9%" color="d-none" ink="d-none-t">61</seg>
    </b-share-bar>
    <b-legend>
      <item color="d-week">chaque semaine</item>
      <item color="d-reg">régulièrement</item>
      <item color="d-rare">occasionnellement</item>
      <item color="d-api">Codex uniquement</item>
      <item color="d-none">totalement inactifs</item>
    </b-legend>
    <b-cap>340 personnes</b-cap>
    <b-cap>Source : <a href="https://chatgpt.com/admin/usage/users" target="_blank" rel="noopener">Utilisateurs</a> · <a href="https://admin.openai.com" target="_blank" rel="noopener">Classement</a> pour ceux qui ne travaillent que via Codex</b-cap>
    <b-finding>
      <ex>82 % des personnes ont essayé l'outil, 47 % l'utilisent dans leur travail et, pour 21 %, il est devenu une habitude hebdomadaire. La marge de progression en profondeur se trouve chez les 97 personnes du groupe « occasionnellement ».</ex>
      <gen>L'écart entre « a essayé » et « utilise chaque semaine » montre combien de personnes se sont arrêtées après les premiers essais. Le repère d'une adoption de masse est de 50 à 70 % des employés qui l'utilisent dans leur travail quotidien. Tant que l'adoption n'atteint pas ce repère, davantage de licences ne produiront pas de croissance : autre chose que l'accès freine les gens.</gen>
      <do>Investissez la formation dans le plus grand groupe situé entre « a essayé » et « chaque semaine » : c'est là que l'usage régulier progresse le plus vite. Recomptez la répartition après la formation pour voir où les gens sont passés.</do>
    </b-finding>
    <b-info-note icon="flag-alt-iv"><b>Important.</b> Choisissez 5 à 10 personnes dans le groupe « occasionnellement », découvrez en entretien comment elles accomplissent aujourd'hui leurs tâches et faites avec elles une revue de cas de travail réels. Recomptez la part hebdomadaire après la revue. La manière de poser les questions sans suggérer la réponse est décrite dans <a href="/blog/ai-interviews-without-leading-questions/">« Comment interviewer les gens sur leur usage de l'IA »</a>.</b-info-note>
  </b-subsection>
  <b-subsection id="uniformity" title="Homogénéité">
    <b-art-row names="chatgpt-enterprise-usage-report/team-groups" cols="1"/>
    <b-why>L'homogénéité montre à quel point l'outil est entré de façon égale dans les différentes équipes : quelle part de chaque équipe l'utilise régulièrement et combien de messages écrit une personne en moyenne. <b>Décision :</b> de quelle équipe tirer les scénarios qui fonctionnent et dans quelle équipe les apporter en premier.</b-why>
    <b-table>
      <table><thead>
      <tr><th>Équipe</th><th>Utilisateurs réguliers</th><th class="bk-table-r">%</th><th class="bk-table-r">Msgs par personne</th></tr>
      </thead><tbody><b-table-group color="d-week" span="4">Fortes · source de scénarios</b-table-group>
      <tr><td>Équipe A</td><td><b-bar value="74" min="120"/></td><td class="bk-table-r">74%</td><td class="bk-table-r">1,120</td></tr>
      <tr><td>Équipe B</td><td><b-bar value="66" min="120"/></td><td class="bk-table-r">66%</td><td class="bk-table-r">870</td></tr><b-table-group color="d-reg" span="4">Moyennes</b-table-group>
      <tr><td>Équipe C</td><td><b-bar value="51" min="120"/></td><td class="bk-table-r">51%</td><td class="bk-table-r">720</td></tr><b-table-group color="d-rare" span="4">En retard · où apporter les scénarios</b-table-group>
      <tr><td>Équipe D</td><td><b-bar value="34" min="120"/></td><td class="bk-table-r">34%</td><td class="bk-table-r">530</td></tr>
      <tr><td>Équipe E</td><td><b-bar value="18" min="120"/></td><td class="bk-table-r">18%</td><td class="bk-table-r">290</td></tr>
      </tbody></table>
    </b-table>
    <b-cap>Source : <a href="https://chatgpt.com/admin/usage/users" target="_blank" rel="noopener">Utilisateurs</a> · champs department et groups</b-cap>
    <b-finding>
      <ex>Dans l'équipe A, 74 % des personnes utilisent l'outil régulièrement ; dans l'équipe E, 18 % : un écart de 56 points de pourcentage.</ex>
      <gen>Un grand écart entre équipes signifie que des scénarios qui fonctionnent existent déjà mais vivent dans une ou deux équipes : les transférer coûte moins cher qu'acheter quelque chose de nouveau. Une part uniformément faible dans toutes les équipes indique un obstacle commun : l'accès, la formation ou des tâches inadaptées. Une part uniformément élevée signifie que l'outil a pris racine et que l'on peut passer à l'étape suivante. Une équipe qui rencontre des obstacles n'est pas encore prête pour un nouvel outil.</gen>
      <do>En cas de grand écart, organisez une rencontre : l'équipe la plus forte présente trois de ses scénarios aux deux plus faibles. Avant la rencontre, menez 2 à 3 entretiens sur les obstacles dans l'équipe la plus faible. Recomptez l'écart après la rencontre : il doit se réduire.</do>
    </b-finding>
  </b-subsection>
  <b-subsection id="main-tool" title="Outil principal">
    <b-why>Lequel des trois outils absorbe plus de la moitié des dépenses d'une personne sur trois mois. Le type d'outil montre comment la personne travaille avec l'IA.</b-why>
    <b-tool-types>
      <prob title="beaucoup de messages par tâche ; ">Prompt</prob>
      <prob title="peu de connexions aux applications ; ">Hallucinations</prob>
      <prob title="les mêmes tâches sans projets ni skills ; ">Reproductibilité</prob>
      <prob title="les skills ne sont créés que dans une seule équipe ; ">Échelle</prob>
      <tool n="1" href="https://openai.com/chatgpt/enterprise/" color="c-chat" t="Chat" art="chatgpt-enterprise-usage-report/tool-chat" on="1,2,3,4"/>
      <tool n="2" href="https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex" color="c-work" t="Work" art="chatgpt-enterprise-usage-report/tool-work" on="3,4"/>
      <tool n="3" href="https://openai.com/codex/" color="c-code" t="Codex" art="chatgpt-enterprise-usage-report/tool-codex" on=""/>
    </b-tool-types>
    <b-share-bar kind="wide">
      <seg w="48.2%" color="c-chat">164 · Chat</seg>
      <seg w="13.8%" color="c-work">47 · Work</seg>
      <seg w="11.2%" color="c-code">38 · Codex</seg>
      <seg w="26.8%" color="c-none" ink="ink">91 · aucune dépense</seg>
    </b-share-bar>
    <b-cap>340 personnes, fenêtre de 3 mois</b-cap>
    <b-cap>Source : <a href="https://admin.openai.com" target="_blank" rel="noopener">Classement</a> · trois exports : filtre « Product » = Chat, Work, Codex</b-cap>
    <b-finding>
      <ex>Chat est le produit principal pour 164 personnes sur 340, Codex pour 38, Work pour 47.</ex>
      <gen>L'outil principal indique le type de travail : une conversation, une tâche confiée à un agent ou du code. Il détermine ce dont la personne a besoin ensuite et dans quel pilote la placer. La taille du groupe fixe la taille du pilote : un pilote large pour un scénario courant, un pilote étroit pour un scénario rare.</gen>
      <do>La décision consiste à faire passer chaque groupe à l'étape suivante. Pour le groupe Chat : Work avec des connecteurs et MCP vers les données de travail, ce qui supprime les problèmes de prompt et d'hallucinations. Pour le groupe Work : des spécifications, la mise en place du harness et des skills partagés, qui rendent le résultat reproductible et transférable à d'autres équipes.</do>
    </b-finding>
  </b-subsection>
  <b-subsection id="top-spend" title="Classement par dépense">
    <b-art-row names="chatgpt-enterprise-usage-report/spend-few chatgpt-enterprise-usage-report/spend-mentor chatgpt-enterprise-usage-report/spend-experiment"/>
    <b-why>Le classement ordonne les personnes selon la somme dépensée sur un produit précis, par exemple Codex. Ainsi, la liste inclut quelqu'un qui dépense beaucoup sur Codex même si l'essentiel de sa dépense va à Chat.</b-why>
    <b-table>
      <table><thead>
      <tr><th>Personne</th><th>Équipe</th><th class="bk-table-r">$ sur le code / 3 mois</th><th class="bk-table-r">Tokens / 3 mois</th><th class="bk-table-r">Tokens par $</th></tr>
      </thead><tbody>
      <tr><td>Hana Sato</td><td>Équipe C</td><td class="bk-table-r">438.20</td><td class="bk-table-r">21.9M</td><td class="bk-table-r">50K</td></tr>
      <tr><td>Luis Moreno</td><td>Équipe A</td><td class="bk-table-r">395.60</td><td class="bk-table-r">12.7M</td><td class="bk-table-r">32K</td></tr>
      <tr><td>Ada Kowalski</td><td>Équipe D</td><td class="bk-table-r">84.30</td><td class="bk-table-r">4.3M</td><td class="bk-table-r">51K</td></tr>
      </tbody></table>
    </b-table>
    <b-cap>Source : <a href="https://admin.openai.com" target="_blank" rel="noopener">Classement</a> · un export par produit</b-cap>
    <b-finding>
      <ex>Hana Sato et Luis Moreno dépensent environ cinq fois plus pour le code que la troisième personne de la liste. À dépense comparable, Hana obtient une fois et demie plus de tokens par dollar que Luis.</ex>
      <gen>Les plus gros utilisateurs sont des agents du changement : ils trouvent les premiers les scénarios qui fonctionnent, et leur expérience influence la rentabilité d'un outil spécialisé. À côté d'eux se trouvent des collègues plus prudents, qui ont besoin de plus de temps et d'un exemple concret sur leurs propres tâches. Un classement par part de dépense masque les agents du changement : il vaut mieux regarder la dépense absolue.</gen>
      <do>Impliquez les plus gros utilisateurs comme mentors : qu'ils montrent leurs scénarios à des collègues qui débutent, sur les tâches de ces collègues. Invitez les collègues prudents par des exemples et des résultats, sans obligation. Proposez aux deux ou trois premiers une expérience avec un outil spécialisé, accompagnée d'un compte rendu avant-après.</do>
    </b-finding>
    <b-info-note icon="chart-bar">Le classement contient à la fois les dépenses et les tokens. Comparez le rapport tokens/dépense au sein d'un même groupe : un produit et des tâches similaires. Celui qui obtient nettement plus de tokens par dollar choisit en général mieux les modèles et les modes. Ce sont les utilisateurs les plus avancés et les plus efficaces, et ce sont les premiers à inviter comme mentors. Mettez-les en relation avec des collègues du même groupe dont le rapport est plus faible : résoudre une tâche ensemble apporte souvent plus qu'une formation générale. Des binômes issus d'équipes différentes favorisent la fertilisation croisée : les bonnes techniques circulent entre les équipes.</b-info-note>
    <b-info-note icon="info">Pendant le déploiement, les plus gros utilisateurs peuvent dépenser un ordre de grandeur de plus que les autres. Il vaut mieux ne pas instaurer de limites à ce stade : elles démotivent facilement ceux qui adoptent l'outil en premier. À la place des limites, convenez d'expériences et d'un compte rendu des résultats. Les limites ont du sens plus tard, une fois les pratiques éprouvées et le coût normal d'un scénario connu.</b-info-note>
  </b-subsection>
  <b-subsection id="segments" title="Segments de comportement">
    <b-art-chain label="segment → entretien → problème → outil">
      <step art="chatgpt-enterprise-usage-report/chain-segment">segment</step>
      <step art="chatgpt-enterprise-usage-report/chain-custdev">entretien</step>
      <step art="chatgpt-enterprise-usage-report/chain-problem">problème</step>
      <step art="chatgpt-enterprise-usage-report/chain-tool">outil</step>
    </b-art-chain>
    <b-why>Des groupes selon l'intensité du comportement, construits à partir de plusieurs exports : combien une personne écrit, dépense et ce qu'elle fait.</b-why>
    <b-table>
      <table><thead>
      <tr><th>Segment</th><th class="bk-table-r">Personnes</th><th>Détails</th></tr>
      </thead><tbody>
      <tr><td>Écrivent du code dans n'importe quel produit</td><td class="bk-table-r">44</td><td>dont 19 hors des équipes techniques</td></tr>
      <tr><td>Recherche intensive dans le chat</td><td class="bk-table-r">58</td><td>plus de 1 900 messages en moyenne</td></tr>
      <tr><td>Tâches agentiques</td><td class="bk-table-r">33</td><td>scénarios en plusieurs étapes, connecteurs</td></tr>
      <tr><td>Génération d'images</td><td class="bk-table-r">21</td><td>deux tiers viennent d'une seule équipe</td></tr>
      <tr><td>Totalement inactifs</td><td class="bk-table-r">61</td><td>0 message, 0 $ sur toute la période</td></tr>
      </tbody></table>
    </b-table>
    <b-cap>Source : <a href="https://chatgpt.com/admin/usage/users" target="_blank" rel="noopener">Utilisateurs</a> · <a href="https://admin.openai.com" target="_blank" rel="noopener">Classement</a></b-cap>
    <b-finding>
      <ex>Les plus grands segments pour les entretiens clients sont la recherche intensive (58) et le code (44, dont 19 hors des équipes techniques). Pour les 61 inactifs, la question est autre : qu'est-ce qui les empêche de commencer.</ex>
      <gen>Les données montrent ce que font les gens, mais pas si l'outil actuel leur suffit. Un segment est donc une hypothèse : il suggère qui inviter aux entretiens clients, quelles questions poser et quels problèmes les gens peuvent rencontrer. Des candidats d'outils apparaissent déjà ici, et le choix entre eux se fait après les entretiens, pour un problème confirmé.</gen>
      <do>Pour chaque segment, parlez à 2 ou 3 personnes : où l'outil actuel est insuffisant et ce qu'elles font encore à la main. Réunissez les candidats pour un problème confirmé à partir de trois sources : consultations d'innovateurs au sein de l'entreprise, experts extérieurs et repères du marché, c'est-à-dire ce qu'utilisent des entreprises comparables. Suivez ensuite la <a href="#decision">procédure de décision</a> : questionnaire, comparaison et test des candidats sur de vraies tâches. Si le problème n'est pas confirmé, reportez le segment au prochain recomptage.</do>
    </b-finding>
  </b-subsection>
</b-chapter>
<b-chapter id="layer2" icon="briefcase" title="Nature du travail">

  <b>Objectif :</b> montrer quelles tâches les gens résolvent avec l'outil, avec quelles fonctions intégrées et via quelles intégrations.

  <b-subsection id="connectors" title="Connecteurs">
    <b-art-row names="chatgpt-enterprise-usage-report/conn-guess chatgpt-enterprise-usage-report/conn-data chatgpt-enterprise-usage-report/conn-errors" arrows/>
    <b-why>Les connecteurs relient l'assistant aux données de travail : discussions, documents, code, agendas. Ils déterminent le volume d'hallucinations : sans accès aux données, le modèle comble lui-même la réponse. <b>Décision :</b> quelles équipes et quels systèmes connecter en premier.</b-why>
    <b-count-bars>
      <bar k="Slack" w="100%" color="c-work">520</bar>
      <bar k="Notion" w="65%" color="c-work">340</bar>
      <bar k="GitHub" w="40%" color="c-work">210</bar>
      <bar k="Calendrier" w="29%" color="c-work">150</bar>
    </b-count-bars>
    <b-cap>Source : <a href="https://chatgpt.com/admin/usage" target="_blank" rel="noopener">Vue d'ensemble</a> · bloc « App interactions »</b-cap>
    <b-finding>
      <ex>Slack et Notion représentent 70 % de toutes les connexions. Le modèle ne voit pas les systèmes hors de cette liste : il répond aux questions à leur sujet par une supposition.</ex>
      <gen>Le volume d'hallucinations baisse là où le modèle dispose du contexte nécessaire. Sans lui, l'agent essaie de combler le trou tout seul. Les équipes sans aucune connexion travaillent avec le modèle à l'aveugle, et presque toute réponse sur leurs processus est une supposition. Le signe en entretien client : « je dois tout revérifier ».</gen>
      <do>Repérez les équipes sans aucune connexion et demandez en entretien où se trouvent leurs données de travail. Connectez une telle source et comparez avant et après sur 10 questions identiques : combien de réponses sont fausses et combien s'appuient sur les données de travail.</do>
    </b-finding>
  </b-subsection>
  <b-subsection id="skills" title="Skills">
    <b-art-row names="chatgpt-enterprise-usage-report/skill-adhoc chatgpt-enterprise-usage-report/skill-repeat chatgpt-enterprise-usage-report/shared-skill" arrows/>
    <b-why>Les skills montrent la maturité des processus : un scénario décrit une fois sous forme de skill se répète de la même façon pour quiconque le lance. Les statistiques indiquent quels skills sont utilisés et qui crée les siens. <b>Décision :</b> quels processus peuvent déjà être déployés dans d'autres équipes et lesquels dépendent encore de personnes précises.</b-why>
    <b-count-bars>
      <bar k="spreadsheets" w="100%" color="c-code">88</bar>
      <bar k="pdf" w="65%" color="c-code">57</bar>
      <bar k="skill-creator" w="33%" color="c-code">29</bar>
    </b-count-bars>
    <b-cap>Source : <a href="https://chatgpt.com/admin/usage" target="_blank" rel="noopener">Vue d'ensemble</a> · bloc « Skills »</b-cap>
    <b-finding>
      <ex>Les skills pour les tableurs et les PDF totalisent 88 et 57 appels : ces processus sont déjà reproductibles. 29 appels à skill-creator : certaines personnes transforment leurs scénarios en skills.</ex>
      <gen>La maturité d'un processus progresse par étapes : demandes ponctuelles → skill personnel → skill partagé de l'équipe. À la première étape, le résultat dépend de qui a demandé et de la façon de le faire. Avec un skill, il est reproductible : la même entrée donne le même résultat. Un skill partagé rend le processus transférable à d'autres équipes.</gen>
      <do>Rassemblez les skills dans une liste unique avec leurs auteurs et notez l'étape de chaque processus. Transformez les deux skills personnels les plus utilisés en skills partagés : l'auteur les présente à une équipe voisine, et l'équipe vérifie que les mêmes entrées donnent le même résultat. Les scénarios sans skill qui reviennent chaque semaine sont les premiers candidats à de nouveaux skills.</do>
    </b-finding>
  </b-subsection>
  <b-subsection id="projects" title="Thèmes des projets">
    <b-art-row names="chatgpt-enterprise-usage-report/proj-files chatgpt-enterprise-usage-report/proj-topics chatgpt-enterprise-usage-report/proj-author" arrows/>
    <b-why>La synthèse regroupe les projets par sens et montre les tâches concrètes que les gens exécutent dans les projets en cours. Pour les entretiens clients, c'est une liste toute prête : quelles tâches aborder et avec qui. <b>Décision :</b> quelles tâches et les projets de qui couvrir en premier lors des entretiens.</b-why>
    <b-table>
      <table><thead>
      <tr><th>Thème</th><th class="bk-table-r">Projets</th><th>Tâches</th><th>Question à l'auteur</th></tr>
      </thead><tbody>
      <tr><td>Ventes<b-cell-sub>Pitch library · Elif Demir</b-cell-sub></td><td class="bk-table-r">11</td><td>argumentaires, traitement des objections, propositions commerciales</td><td><b-cell-quote>« Quelle partie d'un argumentaire le modèle fait-il bien, et que réécrivez-vous ? »</b-cell-quote></td></tr>
      <tr><td>Intégration des nouveaux<b-cell-sub>New hire guide · Rafael Costa</b-cell-sub></td><td class="bk-table-r">8</td><td>guides pour les nouveaux arrivants, réponses aux questions courantes</td><td><b-cell-quote>« Quelles questions des nouveaux le modèle traite-t-il déjà sans vous ? »</b-cell-quote></td></tr>
      <tr><td>Étude de marché<b-cell-sub>Competitor notes · Jonas Keller</b-cell-sub></td><td class="bk-table-r">5</td><td>synthèses sur les concurrents, comparaisons de prix</td><td><b-cell-quote>« Où prenez-vous les données, et à quelle vitesse deviennent-elles périmées ? »</b-cell-quote></td></tr>
      </tbody></table>
    </b-table>
    <b-cap>Source : <a href="https://chatgpt.com/admin/usage/projects" target="_blank" rel="noopener">Projets</a> · noms regroupés par sens</b-cap>
    <b-finding>
      <ex>Les ventes (11) et l'intégration des nouveaux (8) ont le plus de projets permanents. Les auteurs des plus grands projets sont les premières personnes à interviewer.</ex>
      <gen>Un projet est une base de connaissances : des fichiers et des instructions sur lesquels le modèle s'appuie dans chaque réponse. Plus la base est riche, plus le résultat est précis et stable. Le contenu d'un projet suggère quoi demander en entretien : quels fichiers ont été ajoutés, ce qui manque et où les réponses demandent encore des corrections.</gen>
      <do>Ouvrez les trois projets les plus actifs de chaque thème et dressez la liste des tâches concrètes. En entretien, posez à l'auteur la question du tableau et demandez quels fichiers et quelles instructions ont le plus changé la qualité des réponses. Transformez une configuration de projet réussie en modèle pour ce thème.</do>
    </b-finding>
  </b-subsection>
</b-chapter>
<b-chapter id="layer3" icon="check-circle-alt-iv" title="Vérification">

  <b>Objectif :</b> vérifier les synthèses par rapport aux exports bruts, à la liste des projets et au classement. Tout chiffre du rapport peut être ramené à sa ligne d'origine dans un export.

  <b-subsection title="Liste complète des projets">
    <b-why>Tous les projets avec leur auteur et leur statut. Cette liste sert à contrôler la synthèse par thèmes et à retrouver l'auteur d'un projet précis.</b-why>
    <b-table>
      <table><thead>
      <tr><th>Projet</th><th>Auteur</th><th>Statut</th><th class="bk-table-r">Msgs</th></tr>
      </thead><tbody>
      <tr><td>Pitch library</td><td>Elif Demir</td><td><b-status-dot color="c-work">actif</b-status-dot></td><td class="bk-table-r">268</td></tr>
      <tr><td>Price list 2026</td><td>Oskar Berg</td><td><b-status-dot color="c-work">actif</b-status-dot></td><td class="bk-table-r">64</td></tr>
      <tr><td>Personal draft</td><td>Pavel Novak</td><td><b-status-dot color="c-none">abandonné</b-status-dot></td><td class="bk-table-r">0</td></tr>
      </tbody></table>
    </b-table>
    <b-cap>Source : <a href="https://chatgpt.com/admin/usage/projects" target="_blank" rel="noopener">Projets</a></b-cap>
    <b-finding>
      <ex>Le projet « Personal draft » compte zéro message.</ex>
      <gen>Un projet vide est une tentative abandonnée : la personne a commencé, mais l'outil n'est jamais entré dans son travail. Si ces projets restent dans le calcul, la synthèse par thèmes surestime l'usage.</gen>
      <do>Écartez les projets à zéro message avant de compter et invitez 2 ou 3 de leurs auteurs : la raison de leur abandon est une réponse précieuse.</do>
    </b-finding>
  </b-subsection>
  <b-subsection title="Classement">
    <b-why>L'export de facturation de chaque personne et de chaque produit. Les outils principaux et les classements en sont déduits.</b-why>
    <b-table>
      <table><thead>
      <tr><th>Nom</th><th>E-mail</th><th class="bk-table-r">Crédits</th><th class="bk-table-r">$</th></tr>
      </thead><tbody>
      <tr><td>Hana Sato</td><td>hana@example.com</td><td class="bk-table-r">10,955</td><td class="bk-table-r">438.20</td></tr>
      <tr><td>Mira Castellano</td><td>mira@example.com</td><td class="bk-table-r">2,425</td><td class="bk-table-r">97.00</td></tr>
      <tr><td>Jonas Keller</td><td>jonas@example.com</td><td class="bk-table-r">470</td><td class="bk-table-r">18.80</td></tr>
      </tbody></table>
    </b-table>
    <b-cap>Source : <a href="https://admin.openai.com" target="_blank" rel="noopener">Classement</a> · trois exports avec des filtres « Product » différents</b-cap>
    <b-finding>
      <ex>Les trois exports par produit s'additionnent pour donner la dépense totale de chaque personne de la liste.</ex>
      <gen>Les trois exports avec des filtres Product différents s'additionnent pour donner la dépense totale de chaque personne. Un écart supérieur à 2 % signifie qu'un export est incomplet ou que les périodes diffèrent.</gen>
      <do>Avant de diffuser le rapport, additionnez les trois exports par personne et comparez avec la dépense totale. S'ils diffèrent, réexportez les données pour la même période.</do>
    </b-finding>
  </b-subsection>
</b-chapter>
<b-chapter id="layer4" icon="target" title="Choix des personnes">

  <b>Objectif :</b> désigner des personnes précises pour chaque manière d'accomplir les tâches.

  <b-subsection id="candidates" title="Candidats aux entretiens">
    <b-why>Une courte liste de personnes pour chaque orientation repérée. Dans l'exemple, la liste finale compte 16 personnes sur 340 ; le tableau montre les trois premières. Chaque entreprise obtiendra son propre nombre. Le rapport ChatGPT est l'une des sources de l'échantillon : les utilisateurs d'autres outils et les personnes qui ont abandonné s'ajoutent selon les règles de <a href="/blog/who-to-interview-before-buying-ai-tools/#groups">« Qui interviewer »</a>, et la vérification auprès de tous les employés se fait par un <a href="/blog/ai-interviews-without-leading-questions/#form">questionnaire</a>.</b-why>
    <b-table>
      <table><thead>
      <tr><th>Personne</th><th>Orientation</th><th class="bk-table-r">Signal</th></tr>
      </thead><tbody>
      <tr><td>Hana Sato</td><td><b-status-dot color="c-code">code</b-status-dot></td><td class="bk-table-r">438 $ / 3 mois</td></tr>
      <tr><td>Mira Castellano</td><td><b-status-dot color="c-work">tâches agentiques</b-status-dot></td><td class="bk-table-r">97 $ / 3 mois</td></tr>
      <tr><td>Jonas Keller</td><td><b-status-dot color="c-chat">recherche</b-status-dot></td><td class="bk-table-r">3 200+ msgs</td></tr>
      </tbody></table>
    </b-table>
    <b-cap>Source : les exports des utilisateurs, du classement et des projets, joints par e-mail</b-cap>
    <b-finding>
      <ex>Hana Sato, Mira Castellano et Jonas Keller représentent trois manières de travailler différentes : le code, les tâches agentiques et la recherche.</ex>
      <gen>La liste courte compte une personne par orientation : code, tâches d'agent, recherche. Chaque conversation montre alors sa propre manière de travailler et n'en répète pas une autre.</gen>
      <do>Planifiez trois entretiens, un par orientation. Décidez ensuite quelle orientation nécessite 2 à 3 personnes de plus.</do>
    </b-finding>
  </b-subsection>
  <b-subsection id="people" title="Tableau de toutes les personnes">
    <b-why>Tout le monde, avec des filtres par équipe, activité, orientation et outil principal.</b-why>
    <b-filter-chips>
      <f>Équipe B</f>
      <f>Activité : chaque semaine</f>
      <f on>Outil : Work</f>
    </b-filter-chips>
    <b-table>
      <table><thead>
      <tr><th>Personne</th><th>Équipe</th><th>Chat / Work</th><th class="bk-table-r">$ / 3 mois</th></tr>
      </thead><tbody>
      <tr><td>Tomás Reid</td><td>Équipe B</td><td><b-split-bar parts="c-chat:28% c-work:72%"/></td><td class="bk-table-r">112.00</td></tr>
      <tr><td>Mira Castellano</td><td>Équipe B</td><td><b-split-bar parts="c-chat:35% c-work:65%"/></td><td class="bk-table-r">97.00</td></tr>
      </tbody></table>
    </b-table>
    <b-cap>Source : les exports des utilisateurs, du classement et des projets, joints par e-mail</b-cap>
    <b-finding>
      <ex>Les filtres « Équipe B » et « Outil : Work » ont laissé deux personnes : Mira Castellano et Tomás Reid.</ex>
      <gen>Un tableau de toutes les personnes avec des filtres par équipe, activité et outil principal sert de base à tout échantillon suivant : une liste pour une nouvelle question n'exige aucun nouvel export.</gen>
      <do>Enregistrez chaque jeu de filtres comme une vue distincte du tableau, pour que la liste suivante ne demande qu'un clic.</do>
    </b-finding>
  </b-subsection>
</b-chapter>
<b-chapter id="start" title="Par où commencer aujourd'hui">

  Il n'est pas nécessaire d'avoir tout le rapport d'un coup : le premier résultat utile, une liste des utilisateurs les plus actifs, apparaît après le deuxième point.

  <b-checklist>
    <item t="Exporter les utilisateurs et le classement sur trois mois">Le classement trois fois, une par produit. Un agent de navigateur peut se charger de l'export<b-link-chips><item href="https://claude.com/claude-in-chrome" icon="arrow-up-right">Claude in Chrome</item><item href="https://support.google.com/gemini/answer/16821166" icon="arrow-up-right">Gemini in Chrome</item><item href="https://www.perplexity.ai/comet" icon="arrow-up-right">Perplexity Comet</item></b-link-chips></item>
    <item t="Calculer les outils principaux et le classement par montant">La première liste des utilisateurs les plus actifs est prête</item>
    <item t="Calculer la profondeur d'adoption">Au moins une fois / régulièrement / chaque semaine, en comptant à part ceux qui ne travaillent que via Codex</item>
    <item t="Dresser une liste de personnes et planifier les entretiens">La manière de choisir ces personnes est décrite dans « Qui interviewer »</item>
  </b-checklist>
</b-chapter>
<b-chapter id="faq" icon="chat" title="Questions fréquentes">
  <b-faq-cards>
    <q t="Que montre la console d'administration de ChatGPT Enterprise ?">Les utilisateurs, le classement, les projets, une vue d'ensemble et les tâches. Elles permettent de construire la profondeur d'adoption, la cohérence entre équipes et la nature du travail.</q>
    <q t="Comment savoir si davantage de licences sont nécessaires ?">D'après la profondeur d'adoption : combien de personnes l'utilisent au moins une fois, régulièrement et chaque semaine. Un repère d'adoption large est de 50 à 70 % des employés.</q>
    <q t="Que signifie un grand écart entre équipes ?">Des scénarios qui fonctionnent existent déjà mais vivent dans une ou deux équipes. Il est plus rentable de les diffuser aux autres équipes que d'acheter quelque chose de nouveau.</q>
    <q t="Qui interviewer après le rapport ?">Des personnes pour chaque orientation repérée : 16 sur 340 dans l'exemple, y compris celles qui utilisent d'autres logiciels ou qui ont abandonné.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Pour aller plus loin">
  <b-links>
    <item href="/blog/who-to-interview-before-buying-ai-tools/" k="Entretiens" t="Qui interviewer">Comment constituer un échantillon d'entretiens à partir du tableau des personnes</item>
    <item href="/blog/ai-interviews-without-leading-questions/" k="Entretiens" t="Comment interviewer les gens sur leur usage de l'IA">Un appel, un questionnaire et un seul tableau Airtable</item>
  </b-links>
</b-chapter>
<b-footer>Tous les noms, équipes, adresses et chiffres des exemples sont fictifs.</b-footer>
</b-post>
