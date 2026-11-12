---
title: Exigences et comptes rendus de réunion avec l'IA : source, hypothèse, fait — et la suite
date: 2026-10-05
updated: 2026-11-13
description: Les exigences avec l'IA : source, hypothèse, statut. Les faits viennent de Git via MCP ; l'agent fait les petites corrections, une personne tranche les grandes.
tags: IA, agents, exigences, hallucinations, comptes rendus, harness
category: harness
layout: wide
mentions: requirements, meeting notes, hallucinations, sources, assumptions, use cases, change management
toc: what=Ce qu'il faut exiger | sources=Sources via MCP | format=Comment demander | levels=Grandes et petites | cases=Cas d'usage | first=Par où commencer | faq=Questions | next=Suite
---

Un agent rédige des exigences avec assurance, et ses suppositions ressemblent à des faits. Exigez une preuve, c'est-à-dire un lien vers la source, les hypothèses du modèle et un statut « fait ou pas un fait » pour chaque point, et connectez les sources via MCP, de préférence depuis Git. L'agent fait lui-même les petites corrections, et une personne tranche les grandes. Base : [MCP pour un agent IA](/blog/mcp-agent-access/#facts).

<b-post series="harness">

<b-chapter id="what" icon="shield-check" title="Ce qu'il faut exiger de l'agent">
  <b-why align="left">Un agent reformule avec fluidité des comptes rendus de réunion et des documents, et le texte ne montre pas où finit un fait et où commence une supposition. Cela tient au fonctionnement du modèle : il prolonge le texte de façon plausible, et un trou dans les données se comble par une phrase fluide. Chaque point des exigences et des comptes rendus a donc besoin de trois choses : une preuve (un lien vers la source avec une citation), une hypothèse (ce que l'agent a complété de lui-même) et un statut (fait, pas un fait ou question à une personne).</b-why>
  <iso-art name="requirements-sources-facts-assumptions/marks"></iso-art>
  <b-why align="left">L'image montre trois sortes de marques sur un même point. La source répond à « d'où cela vient-il » : un lien vers un fichier ou une citation d'un enregistrement de réunion avec l'heure. L'hypothèse répond à « qu'est-ce que le modèle a complété ici » : par exemple, l'enregistrement dit « paiement par carte », ne dit rien de la devise, et l'agent a écrit « en roubles ». Une telle supposition doit figurer sur sa propre ligne, à part des faits. Le statut répond à « peut-on s'y fier » : « fait » s'il y a une preuve, « pas un fait » s'il n'y en a pas, et « question » si une personne doit trancher.</b-why>
  <b-table id="marks-example">

| | Sans marques | Avec marques |
|---|---|---|
| Point | « Paiement par carte en roubles » | « Paiement par carte » |
| Source | non indiquée | réunion du 12 oct., 14:32, « le client paie par carte à la caisse » |
| Hypothèse | cachée dans le texte : « en roubles » | sur sa propre ligne : « paiement en roubles uniquement » |
| Statut | se lit comme un fait | pas un fait : la devise n'a pas été abordée en réunion |
| Ce que fait le lecteur | le prend pour argent comptant | vérifie l'hypothèse ou pose une question |

  </b-table>
  <b-rules sw="1.8">
    <rule icon="key" t="Lien (preuve)">Un lien vers un document ou une citation de l'enregistrement de la réunion avec l'horodatage.</rule>
    <rule icon="help" t="Hypothèse">Ce que l'agent a complété de lui-même est écrit sur une ligne à part.</rule>
    <rule icon="shield-check" t="Statut">Fait, pas un fait ou question à une personne.</rule>
  </b-rules>
  <b-why align="left">La règle est simple : sans source, le statut est « pas un fait ». Ainsi, un point sans preuve ne se transforme pas discrètement en exigence. Une personne voit ces points sous forme de liste et décide quoi en faire : trouver une source, confirmer en réunion ou abandonner. Les marques accélèrent la vérification : une citation avec l'heure se vérifie en quelques secondes, et la ligne d'hypothèse indique où chercher une erreur. Où trouver les sources, c'est dans le chapitre suivant, et que faire quand un point change vient après.</b-why>
  <b-finding>
    <ex>Chaque point a une source, une ligne séparée pour la supposition et un statut.</ex>
    <gen>Un point sans source reçoit le statut « pas un fait », et une personne le vérifie avant de s'y fier. Cela prolonge l'idée de la section sur [les hallucinations dans l'article sur MCP](/blog/mcp-agent-access/#facts).</gen>
    <do k="Que faire">Ajoutez les trois marques à votre modèle d'exigences et de comptes rendus de réunion.</do>
  </b-finding>
</b-chapter>

<b-chapter id="sources" icon="plug" title="Sources via MCP : Git fonctionne le mieux">
  <b-why align="left">La marque « source » ne fonctionne que si l'agent prend les faits dans de vrais systèmes au lieu de les évoquer de mémoire. Pour cela, l'agent est connecté aux systèmes via MCP : il ouvre lui-même un fichier, un enregistrement de réunion ou une page et cite le bon passage<b-proof href="https://modelcontextprotocol.io/docs/getting-started/intro" quote="MCP (Model Context Protocol) is an open-source standard for connecting AI applications to external systems."/>. Mais les sources ne sont pas fiables au même degré. Git convient le mieux : les exigences vivent sous forme de fichiers à côté du code, chaque modification a un auteur, une date et une raison, et les versions antérieures sont visibles dans l'historique. Confluence ne convient que si les pages sont soignées : chacune a un responsable et une date de vérification, et les pages périmées sont archivées. Sinon, l'agent lit une ancienne page comme un fait et produit une hallucination, alors que le modèle n'a rien inventé de lui-même. Une source à part est le compte rendu de réunion : ce qui a été convenu, avec un lien vers l'enregistrement. Mais ce qui a été convenu et ce qui figure dans le code peuvent diverger : il faut donc vérifier avec ce qui se trouve réellement dans Git, car réunions et code se désynchronisent bel et bien.</b-why>
  <iso-art name="requirements-sources-facts-assumptions/sources-mcp"></iso-art>
  <b-why align="left">À droite de l'image se trouvent trois sortes de sources, à gauche le résultat. L'agent s'y connecte via MCP (les fils avec des prises), prend les faits et rédige des exigences où chaque point a un lien et un statut. Git vient en premier : c'est la source principale. Confluence est dessiné en pointillés : on ne le connecte que lorsque les pages sont à jour. Les enregistrements de réunions sont une source à part : l'agent y prend ce qui a été convenu, avec un lien et une heure. Ce qui a été convenu doit être vérifié avec le code dans Git : réunions et code se désynchronisent bel et bien.</b-why>
  <b-why align="left">Il est commode de tenir les sources dans un registre : une ligne par source. Le tableau comporte trois colonnes : le lien (où aller), la description (ce qu'il y a et à quel point c'est récent) et le type (Git, enregistrement de réunion, Confluence). Dans la ligne « Source » de chaque exigence, l'agent place un lien issu de ce registre.</b-why>
  <b-table id="sources-registry">

| Lien | Description | Type |
|---|---|---|
| git.example.com/shop/requirements/payments.md | L'exigence « Paiement par carte » ; l'historique des modifications, les auteurs et les raisons sont visibles dans les commits | Git : fichier |
| git.example.com/shop/requirements/tags | Versions des exigences : v1.1, v2.0 | Git : tags |
| tldv.io/meeting/12-10 | Enregistrement de la réunion du 12 oct. : ce qui a été convenu, citations avec l'heure ; à vérifier avec le code, ils peuvent diverger | Accord : compte rendu de réunion |
| confluence.example.com/pay-rules | Règles de paiement ; la page a un responsable, vérifiée le 1er oct. | Confluence, pages à jour uniquement |

  </b-table>
  <b-finding>
    <ex>L'agent prend les faits via MCP dans le registre des sources, et chaque exigence a un lien issu de ce registre.</ex>
    <gen>Les comptes rendus de réunion montrent ce qui a été convenu, et ils doivent être vérifiés avec le code dans Git : réunions et code se désynchronisent bel et bien. Dans Git, une modification a un auteur, une date et une raison, et une version d'exigence correspond à un tag : vérifier et revenir en arrière sont donc simples. Une page Confluence sans responsable ni date de vérification se périme sans bruit, et l'agent reformule un texte obsolète comme un fait.</gen>
    <do k="Que faire">Démarrez un registre à trois colonnes : lien, description, type. Commencez par Git, et n'ajoutez une page Confluence qu'après vérification : il y a un responsable, une date, et le superflu est archivé.</do>
  </b-finding>
</b-chapter>

<b-chapter id="format" icon="lines" title="Comment demander dans les comptes rendus et les exigences">
  <iso-art name="requirements-sources-facts-assumptions/pipeline"></iso-art>
  <b-say-agent title="Dites à l'agent" plain>Analyse l'enregistrement de la réunion et rédige une liste d'exigences. Pour chaque point, donne la source (un lien du registre et une citation avec l'heure), tes hypothèses sur une ligne séparée et un statut : fait, pas un fait ou question. S'il n'y a pas de source, marque « pas un fait ».</b-say-agent>
  <b-why align="left">Le prompt demande à l'agent de découper l'enregistrement en points, chacun avec trois marques. Sa dernière phrase compte : elle interdit de traiter un point comme un fait en l'absence de source. Un tel prompt convient à un enregistrement de réunion, à un e-mail, à un fil de discussion et à n'importe quel document.</b-why>
  <b-codebox title="Modèle d'un point">
    Exigence : Paiement par carte
    Source : git.example.com/shop/requirements/payments.md, ligne 12 ; réunion du 12 oct., 14:32, « le client paie par carte à la caisse »
    Hypothèse : paiement en roubles uniquement
    Statut : fait | pas un fait | question
    Confirmé par : —
  </b-codebox>
  <b-why align="left">Comment lire le modèle. « Exigence » est le nom court du point. « Source » est un lien du registre et une citation avec l'heure : le relecteur trouve l'endroit en quelques secondes. « Hypothèse » est ce que la source ne dit pas mais que l'agent a décidé lui-même (devise, délai, rôle). « Statut » vaut « fait » si la source le dit explicitement, « pas un fait » pour une supposition et « question » si une personne doit trancher. « Confirmé par » est rempli par une personne : un nom et la date de vérification. Tant qu'il contient un tiret, le point n'est pas considéré comme accepté.</b-why>
  <b-codebox title="Exemple de réponse de l'agent">
    Exigence : Paiement par carte
    Source : réunion du 12 oct., 14:32, « le client paie par carte à la caisse »
    Hypothèse : paiement en roubles uniquement
    Statut : pas un fait
    Confirmé par : —

    Exigence : Reçu par e-mail
    Source : réunion du 12 oct., 15:05, « le reçu est envoyé à l'e-mail du client »
    Hypothèse : aucune
    Statut : fait
    Confirmé par : —
  </b-codebox>
  <b-why align="left">Le premier point a reçu le statut « pas un fait » : la devise n'a pas été nommée en réunion, c'est donc une hypothèse de l'agent. Le second point a été dit explicitement en réunion, c'est donc un « fait ». Les deux points attendent la confirmation d'une personne, et la liste des points « pas un fait » devient l'ordre du jour de la réunion suivante.</b-why>
  <b-finding>
    <ex>L'enregistrement de la réunion devient des exigences où chaque ligne est marquée.</ex>
    <gen>Une citation avec horodatage permet une vérification en quelques secondes, et la ligne d'hypothèses montre où le modèle a comblé des trous.</gen>
    <do k="Que faire">Passez l'une de vos réunions dans ce prompt et comparez avec ce dont vous vous souvenez.</do>
  </b-finding>
</b-chapter>

<b-chapter id="levels" icon="layers" title="Grandes et petites modifications">
  <b-why align="left">Quand un agent ou une personne modifie une exigence, la gravité de la modification compte. La différence est simple : pour une petite modification, on peut trouver une preuve ; pour une grande, il n'y en a pas. Une petite modification ne change pas le comportement du système : le point fonctionne de la même façon, seuls la confiance qu'on lui accorde ou le libellé ont changé. On peut la vérifier à la source : trouver une citation dans un enregistrement de réunion ou voir dans l'historique Git que le sens n'a pas changé. L'agent fait donc lui-même les petites modifications. Une grande modification change le comportement du système et rien ne permet de la confirmer : les sources ne contiennent pas encore une telle décision, il n'y a nulle part où prendre une preuve. Les grandes modifications reviennent donc à une personne : l'agent prépare la liste des cas d'usage concernés et un brouillon, et le responsable de l'exigence tranche. Après approbation, la décision elle-même (qui, quand et pourquoi) est consignée dans Git et devient une nouvelle source. Les numéros de version des logiciels fonctionnent de la même façon : v1.0 → v1.1 désigne une petite précision, v1.0 → v2.0 un changement dont il faut avertir les gens<b-proof href="https://semver.org/" quote="MAJOR version when you make incompatible API changes"/><b-proof href="https://semver.org/" quote="MINOR version when you add functionality in a backward compatible manner"/>.</b-why>
  <iso-art name="requirements-sources-facts-assumptions/versions"></iso-art>
  <b-why align="left">À gauche de l'image se trouve la version d'origine, v1.0. Au milieu, une petite modification : un petit bloc est ajouté, le sens est le même, le deuxième nombre change (v1.1). À droite, une grande modification : un gros bloc est ajouté, le comportement a changé, le premier nombre change (v2.0). Sous la petite modification, la légende dit « preuve trouvée, l'agent s'en charge », sous la grande « pas de preuve, une personne tranche ».</b-why>
  <b-rules sw="1.8">
    <rule icon="eye" t="Supposition confirmée">Le statut devient « fait », le texte reste : petite modification.</rule>
    <rule icon="bug" t="Supposition réfutée">Le texte du point change : grande modification.</rule>
    <rule icon="ban" t="Un fait a changé">Si la nouvelle version de la source change le comportement, la modification est grande : une preuve montre ce qui a changé dans la source, et c'est à une personne de décider si l'on veut ce changement.</rule>
    <rule icon="pause" t="Libellé">Une faute de frappe ou une formulation plus claire au même sens va dans l'historique des modifications.</rule>
  </b-rules>
  <b-table id="major-minor">

| Type de modification | Ce qui s'est passé | Preuve | Ce que fait l'agent | Ce que fait une personne |
|---|---|---|---|---|
| Petite | La supposition « paiement en roubles uniquement » a été confirmée par l'enregistrement de la réunion : le statut passe de « pas un fait » à « fait » | il y en a : tldv.io/meeting/12-10, 14:32, « paiement uniquement en roubles » | s'en charge : change le statut, ajoute le lien et la citation, l'inscrit dans l'historique, version v1.1 | rien : peut parcourir l'historique |
| Petite | Le libellé a été précisé : « Paiement par carte » est devenu « Paiement par carte bancaire » | il y en a : comparaison de versions dans Git, git.example.com/shop/requirements/commit/a1b2c3, mots changés, sens identique | s'en charge et l'inscrit dans l'historique | rien |
| Grande | Quelqu'un a proposé d'accepter aussi les euros : ni les enregistrements de réunions ni les documents n'en disent rien | aucune : les sources ne contiennent pas une telle décision, nulle part où prendre une preuve | prépare : écrit ce qui va changer, liste les cas d'usage et les tests concernés, rédige un brouillon v2.0 | tranche : le responsable de l'exigence approuve ou rejette, la décision est consignée dans Git |
| Grande | Quelqu'un a proposé de confirmer un paiement par un code de la banque : les exigences ne le prévoient pas encore | aucune : aucune source ne contient la décision | prépare la même chose | tranche : le responsable de l'exigence approuve ou rejette |

  </b-table>
  <b-why align="left">La preuve est la frontière entre les deux sortes de modifications. Si l'agent a trouvé une citation, un fichier ou un commit qui confirme la modification, elle est petite et l'agent la fait lui-même. S'il n'y a rien pour la confirmer, la modification est grande : l'agent écrit honnêtement « pas de preuve », prépare la liste des cas d'usage concernés et remet la décision à une personne. Avec Git, c'est simple : l'agent valide lui-même une petite modification dans un commit et dépose une grande modification sous forme de merge request que seule une personne peut fusionner. L'approbation du responsable dans cette demande devient plus tard une preuve pour les modifications futures.</b-why>
  <b-finding>
    <ex>Pour une petite modification, on peut trouver la preuve ; pour une grande, il n'y en a pas.</ex>
    <gen>L'agent fait ce qu'une source confirme et s'arrête là où rien ne permet de confirmer. Il reste à la personne exactement les décisions que seule une personne peut prendre.</gen>
    <do k="Que faire">Convenez de qui confirme les grandes modifications et inscrivez-le dans le modèle.</do>
  </b-finding>
</b-chapter>

<b-chapter id="cases" icon="git-branch" title="Cas d'usage">
  <b-why align="left">Un cas d'usage (par définition, une description structurée du comportement d'un système lorsqu'il répond aux requêtes d'acteurs externes<b-proof href="https://en.wikipedia.org/wiki/Use_case" quote="structured description of a system’s behavior as it responds to requests from external actors"/>) est un scénario d'utilisation d'une exigence par les gens. L'exigence « Paiement par carte » en compte trois : un paiement normal, un refus de la banque et un paiement répété. Ils sont écrits parce qu'une modification touche en général un ou deux scénarios, et ce sont ceux-là qu'il faut revérifier. C'est le lien avec le chapitre précédent : une grande modification change le comportement, l'agent dresse donc la liste des cas d'usage concernés et de leurs tests. Une petite modification ne change pas le comportement, et l'agent se contente de confirmer que les cas d'usage sont restés tels quels. Ainsi, une petite modification n'oblige pas à revérifier toute l'exigence.</b-why>
  <iso-art name="requirements-sources-facts-assumptions/use-cases"></iso-art>
  <b-why align="left">L'image le montre sur un exemple. À gauche se trouve l'exigence « Paiement par carte ». À droite, ses trois cas d'usage : un paiement normal (le client paie aussitôt), un refus de la banque (une erreur et une nouvelle tentative) et un paiement répété (protection contre le double débit). Le point d'exclamation est sur le troisième : supposons que la réunion ait décidé de changer la protection contre le double débit. C'est une grande modification, et elle ne touche que le paiement répété. L'agent liste exactement ce cas d'usage et ses tests, tandis que le paiement normal et le refus de la banque restent tels quels.</b-why>
  <b-pills>
    <pill>Cas : chemin normal</pill>
    <pill>Cas : erreur</pill>
    <pill>Cas : répétition</pill>
  </b-pills>
  <b-why align="left">Un exemple. En réunion, il a été décidé qu'un paiement répété dans la minute compte comme la même commande. C'est une grande modification, et elle ne touche que le cas d'usage « répétition ». Pour lui, l'agent liste les tests à mettre à jour, par exemple « un second paiement dans les 30 secondes ne débite pas deux fois ». Les cas d'usage « chemin normal » et « erreur » restent tels quels, et leurs tests s'exécutent sans changement. S'il n'y a pas une telle liste, ce sont les utilisateurs qui découvrent le cas d'usage touché.</b-why>
  <b-finding>
    <ex>L'exigence « Paiement par carte » se divise en trois cas, et une modification sur le paiement répété ne touche que le troisième.</ex>
    <gen>Pour une grande modification, l'agent liste les cas concernés ; pour une petite, il confirme que les cas n'ont pas changé.</gen>
    <do k="Que faire">Après chaque modification, demandez à l'agent de lister les cas concernés et leurs tests.</do>
  </b-finding>
</b-chapter>

<b-chapter id="first" icon="flag" title="Par où commencer">
  <b-why align="left">Étape 1. Registre des sources : démarrer un tableau de trois colonnes et connecter Git via MCP. Étape 2. Ajouter les trois marques au modèle de point et envoyer à l'agent un prompt avec un enregistrement de réunion. Étape 3. Convenir de la règle : si une modification a une preuve, l'agent la fait lui-même, sinon une personne tranche. En une heure, on obtient un compte rendu où chaque point est marqué et une liste de points « pas un fait » pour la réunion suivante. S'ils sont nombreux, ce n'est pas grave : l'agent vient de montrer pour la première fois où se trouvaient les suppositions.</b-why>
  <b-numchain>
    <step>Registre des sources : Git via MCP</step>
    <step>Trois marques dans le modèle et un prompt à l'agent</step>
    <step>Règle : preuve trouvée, l'agent fait la modification ; pas de preuve, une personne tranche</step>
  </b-numchain>
  <b-finding>
    <ex>Trois étapes : registre des sources, modèle avec un prompt, règle sur les modifications.</ex>
    <gen>Commencez par une réunion et un document : le résultat est visible en une heure.</gen>
    <do k="Que faire">Aujourd'hui, analysez un enregistrement de réunion avec le modèle.</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Questions fréquentes">
  <b-faq-cards>
    <q t="Comment empêcher l'IA de faire passer une supposition pour un fait dans les exigences ?">Exigez un lien vers la source pour chaque point, une liste des hypothèses du modèle et un statut « fait ou pas un fait ».</q>
    <q t="D'où l'agent doit-il tirer les sources ?">Via MCP, de préférence depuis Git : une modification y a un auteur, une date et un historique.</q>
    <q t="Que modifie l'agent lui-même, et que tranche une personne ?">Les petites modifications confirmées par une source, l'agent les fait lui-même. Les grandes et celles qui ne sont pas confirmées, une personne les tranche.</q>
    <q t="Pourquoi vérifier les comptes rendus de réunion avec le code ?">Réunions et code divergent : le compte rendu montre ce qui a été convenu, Git montre ce qui a réellement été fait.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Suite">
  <b-links>
    <item href="/blog/mcp-agent-access/" k="Source" t="MCP pour un agent IA : quel problème il résout et comment confier la connexion à l'agent">Comment l'agent prend les faits dans les systèmes</item>
    <item href="/blog/bug-report-to-reproduction-agent/" k="Exemple" t="Travail de QA après le support avec un agent IA : enquête, description et documentation via MCP et skills">L'agent reproduit un bug Jira</item>
    <item href="/blog/analytics-reports-agent/" k="Rapports" t="Rapports analytiques avec un agent IA : données de la base, tableaux et documents via MCP">La même approche pour l'analytique</item>
    <item href="/blog/specs-by-aggregates/" k="Spécifications" t="Spécifications par agrégats">où ranger les exigences : une entrée par concept</item>
  </b-links>
</b-chapter>
<b-footer>Le ticket, la réunion et les liens sont inventés pour l'exemple. Le modèle, le registre et les règles grandes/petites modifications sont des pratiques d'équipe et peuvent être modifiés.</b-footer>
</b-post>
