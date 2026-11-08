---
title: MCP pour un agent IA : quel problème il résout et comment confier la configuration à l'agent lui-même
date: 2026-10-04
updated: 2026-11-08
unrelated: mcp-1c
description: MCP branche un agent sur GitLab, Jira, Confluence et les enregistrements de réunions. Quel problème il résout, comment le configurer en quelques minutes en déléguant la tâche à l'agent, ce qu'il fait gagner en temps et en tokens, et pourquoi l'agent invente moins.
tags: IA, agents, MCP, Jira, contexte, hallucinations, tokens, harness
category: harness
layout: wide
mentions: Model Context Protocol, MCP, AI agent, Claude Code, Jira, Airtable, hallucinations, tokens, permissions, prompt injection
toc: what=Ce que c'est | ours=Contextes | connect=Connexion | saving=Économies | facts=Faits | risks=Risques | first=Par où commencer | cases=Cas | faq=Questions | next=À lire ensuite
---

MCP branche un agent sur les systèmes de travail, pour qu'il lise les faits à la source plutôt que dans un récit de seconde main. C'est simple et rapide : il suffit de comprendre le problème qu'il résout et de confier la configuration à l'agent lui-même. Ci-dessous : l'idée, la connexion, ce que cela apporte et quels droits accorder. L'exemple de QA avec MCP est détaillé dans l'article [QA avec un agent via MCP](/blog/bug-report-to-reproduction-agent/#mcp).

<b-post series="harness">
<b-chapter id="what" icon="plug" title="Ce qu'est MCP">
<b-why align="left">MCP est une prise commune, comme l'USB. Branchez l'agent sur Jira ou GitLab et il y prend lui-même les données. <a href="https://modelcontextprotocol.io/docs/getting-started/intro" target="_blank" rel="noopener">En savoir plus</a></b-why>
<b-why align="left">L'image montre deux chemins pour les données. Dans le premier, une personne raconte la tâche à l'agent, et des détails se perdent en route. Dans le second, l'agent lit lui-même le système via MCP et voit tout ce que voit une personne. MCP (Model Context Protocol) est un standard ouvert qui relie les applications d'IA à des systèmes externes<b-proof href="https://modelcontextprotocol.io/docs/getting-started/intro" quote="MCP (Model Context Protocol) is an open-source standard for connecting AI applications to external systems."/>. L'agent possède un client MCP, le système possède un serveur MCP, et le serveur indique à l'agent quelles données et quelles actions sont disponibles.</b-why>
<b-lane title="Un récit ou le système lui-même" color="accent">
<b-scene names="mcp-agent-access/retell-vs-mcp"/>
</b-lane>
<b-finding>
  <ex>Dans Jira, l'agent voit ce que voit une personne : la tâche PAY-142 elle-même, les commentaires et l'historique des modifications. Inutile de trouver la tâche et de la copier dans la conversation. Il va chercher les tâches liées sur demande. Il peut commenter en votre nom, créer une tâche ou changer un statut (après votre confirmation). À la première utilisation, vous devriez ressentir un « wow » : c'est le signe que la configuration est bonne. Et c'est très simple.</ex>
  <gen>L'agent regarde plus large qu'une personne : il pèse les tâches voisines, les articles de la base de connaissances et les décisions passées, et trouve des pistes non évidentes qu'une seule tâche ne montre pas. Sans MCP, il ne connaît que ce qu'on y a collé. La personne cesse d'être un coursier entre des fenêtres et reste le relecteur.</gen>
  <do k="Que faire">Commencez par le gestionnaire de tâches : le démarrage le plus simple et le plus rapide. Comment connecter Jira : <a href="#connect">voir plus bas</a>. Comptez aussi combien de fois par jour vous copiez du texte dans la conversation : c'est votre liste de candidats à la connexion.</do>
</b-finding>
</b-chapter>
<b-chapter id="ours" icon="target-ring" title="Le contexte de l'agent et les autres">
<b-why align="left">Le contexte de l'agent est tout ce qu'il voit d'un seul coup (la conversation avec l'agent, les fichiers du projet). Les autres contextes sont tout le reste (GitLab, Jira, enregistrements de réunions, base de connaissances). Le pont entre eux est MCP : l'agent possède un client MCP et le système un serveur MCP.</b-why>
<b-lane-art names="mcp-agent-access/contexts"/>
<b-why align="left">À gauche de l'image se trouve le contexte de l'agent : la conversation avec lui et les fichiers du projet qu'il voit d'un seul coup. À droite se trouvent les autres systèmes : GitLab, Jira, tldv avec les enregistrements de réunions, Confluence avec une base de connaissances. Tant que MCP n'est pas connecté, l'agent ne les voit pas. Le pont entre eux comporte deux parties : un client MCP côté agent et un serveur MCP côté système.</b-why>
<b-section-h3 top="18">Ce qu'est le contexte</b-section-h3>
<b-why align="left">Le <a href="/materials/glossary/context/">contexte</a> est tout ce que le modèle voit à l'instant présent. Ce qui n'est pas dans le contexte, l'agent ne le sait pas.</b-why>
<b-lane title="Contexte" color="accent" top="12">
<b-scene names="term:context"/>
</b-lane>
<b-why align="left">Le contexte peut s'imaginer comme un bureau où se trouve tout ce que le modèle voit en ce moment : les messages de la conversation, les fichiers ouverts, les résultats d'appels. Ce qui n'est pas sur le bureau n'existe pas pour le modèle tant qu'on ne l'y a pas posé. La question principale, quand on travaille avec un agent, est donc de savoir ce qu'il y a sur son bureau.</b-why>
<b-table-plain>
<table><thead><tr><th>Où se trouve le fait</th><th>L'agent le voit</th><th>Ce qui se passe</th></tr></thead><tbody><tr><td><b>Le contexte de l'agent</b> : la conversation, les fichiers du projet</td><td><b-tag-inline kind="ok">d'emblée</b-tag-inline></td><td>une réponse fondée sur des données</td></tr><tr><td><b>Un autre contexte</b> : GitLab, Jira, enregistrements de réunions</td><td><b-tag-inline kind="ok">via MCP</b-tag-inline></td><td>l'agent va chercher ce dont il a besoin</td></tr><tr><td><b>Nulle part</b> : dans les têtes, dans un système fermé</td><td><b-tag-inline kind="no">non</b-tag-inline></td><td>une supposition à la place d'un fait</td></tr></tbody></table>
</b-table-plain>
<b-why align="left">Le tableau montre ce qui arrive à un fait selon l'endroit où il se trouve. Un fait dans le contexte de l'agent (la conversation, les fichiers du projet) : l'agent répond à partir de données. Un fait dans un autre système (GitLab, Jira, enregistrements de réunions) : l'agent va le chercher lui-même, mais seulement via MCP. Un fait écrit nulle part (dans la tête des gens, dans un système fermé) : l'agent ne le verra pas et le remplacera par une supposition. D'où la règle pratique : consigner les décisions là où l'agent peut les prendre.</b-why>
<b-section-h3 top="18">Comment l'agent va chercher un autre contexte : ReAct</b-section-h3>
<b-why align="left">L'agent travaille dans une boucle <a href="/materials/glossary/react/">ReAct</a> : il raisonne, agit, lit le résultat et raisonne de nouveau. MCP est l'étape « agir » : le résultat de l'appel arrive dans le contexte de l'agent.</b-why>
<b-lane title="ReAct" color="accent" top="12">
<b-scene names="term:react"/>
</b-lane>
<b-step-chain>
  <node t="Raisonne">« J'ai besoin des étapes du bug PAY-142 »</node>
  <node t="Agit">Appelle le serveur MCP de Jira</node>
  <node t="Lit">La réponse de Jira arrive dans le contexte</node>
</b-step-chain>
<b-rules-fixed cols="3" top="12">
  <rule t="Seulement raisonner">Les autres contextes sont fermés : le modèle invente la réponse.</rule>
  <rule t="Seulement agir">Appelle tout sans plan et brûle des tokens.</rule>
  <rule t="Alterner">Va chercher exactement ce qui manque et répond à partir des données.</rule>
</b-rules-fixed>
<b-why align="left">Un exemple du cycle : l'agent raisonne (« j'ai besoin des étapes du bug PAY-142 »), agit (appelle le serveur MCP de Jira), lit la réponse (elle arrive dans le contexte) et répond à partir des données. Les trois cartes montrent ce qui arrive quand le cycle se brise. Raisonner seul donne une réponse inventée, agir seul donne des appels superflus et une dépense de tokens, et alterner donne une réponse exactement tirée des données.</b-why>
<b-section-h3 top="18">Ancrage : chaque partie de la réponse a un appui</b-section-h3>
<b-why align="left">Une réponse est ancrée lorsque chacune de ses parties vient du contexte. Une telle correspondance sans case vide s'appelle un <a href="/materials/glossary/epimorphism/">épimorphisme</a>.</b-why>
<b-lane title="Épimorphisme" color="accent" top="12">
<b-scene names="term:epimorphism"/>
</b-lane>
<b-table-plain>
<table><thead><tr><th>Partie de la réponse</th><th>Appui</th></tr></thead><tbody><tr><td>Étapes de reproduction</td><td>Jira, ticket PAY-142</td></tr><tr><td>Où le code échoue</td><td>GitLab, fichier et ligne</td></tr><tr><td>Pourquoi cela a été décidé</td><td>tldv, enregistrement de réunion</td></tr></tbody></table>
</b-table-plain>
<b-why align="left">Le tableau montre une vérification d'appui sur un exemple. Les étapes de reproduction viennent du ticket Jira, l'endroit où le code échoue de GitLab, la raison de la décision d'un enregistrement de réunion. Si une partie de la réponse n'a pas un tel appui, elle est revérifiée à la main.</b-why>
<b-section-h3 top="18">Hallucination : une partie sans appui</b-section-h3>
<b-why align="left">Une <a href="/materials/glossary/hallucination/">hallucination</a> est une supposition assurée là où il n'y a aucun appui. Elle paraît aussi fluide qu'une réponse fondée sur des données. Les détails et les conseils d'Anthropic sont <a href="#facts">dans la section sur les hallucinations plus bas</a>.</b-why>
<b-lane title="Hallucination" color="accent" top="12">
<b-scene names="term:hallucination"/>
</b-lane>
<b-why align="left">Une hallucination paraît aussi fluide qu'une réponse fondée sur des données, on ne peut donc pas les distinguer au ton. Seul l'appui les distingue : il est là ou il n'y est pas.</b-why>
<b-section-h3 top="18">Pourquoi ceux-là</b-section-h3>
<b-source-rows>
  <row t="GitLab" note="MCP officiel" href="https://docs.gitlab.com/user/model_context_protocol/mcp_server/" miss="L'agent devine le code à partir d'autres contextes et se trompe souvent, c'est ainsi que naissent les hallucinations ; une personne copie à la main des fichiers et des diffs dans la conversation">Code et merge requests : l'agent lit le vrai code</row>
  <row t="Jira" note="MCP Atlassian officiel" href="https://support.atlassian.com/atlassian-rovo-mcp-server/docs/getting-started-with-the-atlassian-remote-mcp-server/" miss="Il y a beaucoup à copier à la main et l'historique des modifications se perd">Tâches et exigences : ce qui a réellement été demandé</row>
  <row t="Confluence" note="Même MCP Atlassian" href="https://support.atlassian.com/atlassian-rovo-mcp-server/docs/getting-started-with-the-atlassian-remote-mcp-server/" miss="La visualisation et l'affichage des exigences auxquels chaque développeur est habitué disparaissent. Il est important de cadrer l'agent et de ne pas le laisser s'égarer : d'anciennes exigences peuvent être périmées. Lui faire vérifier la situation réelle dans GitLab">Base de connaissances : règles, spécifications, décisions</row>
  <row t="tldv" note="Enregistrement et API ouverte" href="https://doc.tldv.io" miss="Les décisions restent dans les têtes, et les comptes rendus de réunion et les exigences sont rédigés de mémoire des heures plus tard, avec des erreurs">Enregistrements de réunions : des décisions qui n'existent nulle part par écrit. Selon l'expérience de l'auteur, l'accès apparaît 5 à 10 minutes après la réunion, donc le compte rendu et les exigences peuvent être rédigés tout de suite. La version entreprise, le contrôle d'accès et MCP sont plus faibles, mais les traductions et les transcriptions sont de meilleure qualité</row>
  <row t="Granola" note="MCP" href="https://docs.granola.ai/help-center/sharing/integrations/mcp" miss="Comme sans tldv : les décisions des réunions se perdent">Également des enregistrements de réunions. Il a un MCP, mais, selon l'expérience de l'auteur, il est légèrement en retard sur tldv : des mots espagnols se glissent dans le texte russe, ce qui nuit à l'expérience utilisateur et suscite des résistances à l'adoption. D'après la documentation : espace de travail actif uniquement, le forfait gratuit couvre 30 jours de notes</row>
</b-source-rows>
<b-why align="left">Ces systèmes ont été choisis parce qu'ils contiennent quatre sortes de faits : le code, les tâches, les règles et les décisions des réunions. Chaque ligne indique ce qui se perd sans la connexion. Confluence vient avec une réserve : ne le connecter que si les pages sont soignées (un responsable et une date de vérification), et laisser l'agent comparer la situation réelle avec le code dans GitLab. Il est encore plus fiable de garder les exigences et les spécifications dans Git : une modification y a un auteur, une date et une raison.</b-why>
<b-finding>
  <ex>Vous posez une question sur un bug et la conversation ne contient pas les étapes. L'agent cherche dans les fichiers du projet, Jira lui est fermé : il rédige donc lui-même les étapes, avec assurance, avec fluidité, en les inventant. Vous suivez un chemin qui n'existe pas.</ex>
  <gen>Un agent répond rarement « je ne sais pas ». Si la réponse n'est pas dans son contexte et que les autres sont fermés, il comble le vide avec des schémas généraux et le présente comme un fait. Chaque source connectée réduit la place laissée à l'invention.</gen>
  <do k="Que faire">Chaque fois que l'agent hallucine, trouvez le contexte qui contient la réponse et donnez-lui l'accès. Commencez par la dernière question à laquelle il a répondu par une invention.</do>
</b-finding>
</b-chapter>
<b-chapter id="connect" icon="arrow-right" title="Comment connecter Jira">
<b-why align="left">L'agent et son harness (le harnais de l'agent) peuvent se connecter tout seuls. Guides : <a href="https://support.atlassian.com/atlassian-rovo-mcp-server/docs/getting-started-with-the-atlassian-remote-mcp-server/" target="_blank" rel="noopener">Atlassian</a> et <a href="https://code.claude.com/docs/en/mcp" target="_blank" rel="noopener">Claude Code</a>.</b-why>
<b-lane title="À la main ou en déléguant" color="accent">
<b-scene names="mcp-agent-access/one-phrase-setup"/>
</b-lane>
<b-why align="left">L'image compare deux façons de faire. À la main : vous cherchez les instructions, tapez des commandes, vous connectez et vérifiez le résultat. En déléguant à l'agent : vous dites une phrase, l'agent connecte Jira lui-même, et tout ce que vous faites est de vous connecter dans le navigateur.</b-why>
<b-section-h3 top="14">Dites à l'agent</b-section-h3>
<b-copy-quote>Connecte le serveur MCP de Jira en suivant le guide d'Atlassian et teste-le sur la tâche PAY-142 : lis-la et résume les commentaires.</b-copy-quote>
<b-why align="left">L'agent exécute lui-même les commandes. Tout ce que vous faites est de vous connecter via le navigateur (OAuth) : l'agent n'obtient jamais votre mot de passe. <a href="/blog/agent-hands-work-back-to-you/" target="_blank" rel="noopener">Si l'agent vous demande de le faire</a>.</b-why>
<b-section-h3 top="14">Ce qui va se passer</b-section-h3>
<b-steps-round>
  <step t="L'agent connecte Jira">avec une seule commande, vous ne tapez rien</step>
  <step hl t="Une page Jira s'ouvre — l'étape clé">elle propose de donner à l'agent l'accès à Jira ; vous vous connectez et vous validez, et l'agent ne voit jamais le mot de passe</step>
  <step t="L'agent lit PAY-142">ouvre la tâche avec ses commentaires et les résume</step>
</b-steps-round>
<b-why align="left">L'étape clé est ici la deuxième : vous donnez vous-même l'accès, en vous connectant par le navigateur. L'agent ne voit pas votre mot de passe et n'obtient que les droits que vous avez confirmés sur la page de Jira. L'agent fait lui-même les première et troisième étapes.</b-why>
<b-callout icon="shield-check"><b>Lecture seule.</b> Il n'est pas toujours possible de choisir l'accès en lecture seule sur cette page. Ce n'est pas grave : l'agent a tendance à lire et n'écrit presque rien tant que vous ne le lui demandez pas.</b-callout>
<b-details-more summary="Comment faire à la main" top="12">
<b-scene names="mcp-agent-access/setup-steps"/>
<b-copy-code>
  claude mcp add --transport http atlassian https://mcp.atlassian.com/v2/mcp
  /mcp               # log in via browser (OAuth)
  claude mcp list     # status: connected / needs login / failed
</b-copy-code>
<b-scene names="mcp-agent-access/scopes"/>
<p>Où vit la configuration et qui voit le serveur : <a href="/blog/mcp-scopes/">portées MCP dans Claude Code</a>.</p>
</b-details-more>
<b-why align="left">À la main, ce sont trois commandes : ajouter le serveur, se connecter par le navigateur avec /mcp et vérifier le statut. Le statut prend trois formes : connecté, connexion requise ou erreur. Le schéma ci-dessus le montre pas à pas, et les portées ci-dessous indiquent où le réglage est stocké.</b-why>
<b-finding>
  <ex>L'agent exécute les commandes et vérifie lui-même la connexion, et la tâche PAY-142 est lue en entier avec ses commentaires. C'est le moment « wow ».</ex>
  <gen>La connexion prend quelques minutes. La portée « Project » place la configuration dans le dépôt pour que toute l'équipe obtienne les mêmes serveurs. Les trois portées sont décrites dans <a href="/blog/mcp-scopes/">Portées MCP dans Claude Code</a>.</gen>
  <do k="Que faire">Déléguez la configuration à l'agent et comparez sa réponse avec ce que vous voyez vous-même dans Jira.</do>
</b-finding>
</b-chapter>
<b-chapter id="saving" icon="coin-hm" title="Économies">
<b-why align="left">L'économie vient de la précision. Une demande floue donne une réponse floue, une correction engendre une nouvelle demande, et les erreurs s'accumulent d'étape en étape ; en copiant et en racontant à la main, une personne y ajoute sans le remarquer de telles approximations. L'agent prend les données directement à la source : la chaîne est plus courte et comporte moins d'erreurs. Le prix à payer est une consommation de tokens qui grandit sur une longue session, et des limiteurs existent pour cela.</b-why>
<b-lane title="Erreurs qui s'accumulent : à la main ou depuis la source" color="accent">
<b-scene names="mcp-agent-access/exact-request"/>
</b-lane>
<b-why align="left">À gauche, le chemin avec copie manuelle : chaque étape ajoute une imprécision, et au troisième passage les erreurs se sont accumulées. À droite, le chemin depuis la source : une demande exacte et une réponse, sans chaîne de récits.</b-why>
<b-spacer h="12"/>
<b-rules sw="1.8">
  <rule icon="eye" t="Demandes et réponses floues">Raconter et copier à la main perdent des détails : la demande sort floue, et la réponse aussi.</rule>
  <rule icon="users" t="Les erreurs s'accumulent">Chaque correction engendre une nouvelle demande avec une nouvelle imprécision : les erreurs s'additionnent d'étape en étape.</rule>
  <rule icon="layers" t="Coût : tokens">Il y a moins d'étapes, mais la consommation de tokens augmente sur une longue session ; des limites existent pour cela.</rule>
</b-rules>
<b-section-h3 top="14">Limites de dépense</b-section-h3>
<b-why align="left">La réponse d'un système connecté arrive dans la conversation et y occupe de la place, et la place se mesure en tokens. Claude Code surveille donc la taille des réponses et fixe deux seuils.</b-why>
<b-scene names="mcp-agent-access/reply-size-scale"/>
<b-why align="left">L'échelle montre la taille de la réponse d'un système en tokens. Jusqu'à 10 000 tokens, une réponse passe sans remarque. Au-delà de 10 000, Claude Code avertit que la réponse est volumineuse. Au-delà de 25 000, la réponse n'entre pas en entier dans la conversation et est enregistrée dans un fichier.</b-why>
<b-art-note top="6">Le plafond de 25 000 peut être relevé avec la variable d'environnement MAX_MCP_OUTPUT_TOKENS, tandis que le seuil d'avertissement est fixe.</b-art-note>
<b-why align="left"><a href="https://code.claude.com/docs/en/mcp" target="_blank" rel="noopener">En savoir plus</a>.</b-why>
<b-finding>
  <ex>Trois passages avec des erreurs croissantes se transforment en un seul passage sur une demande exacte.</ex>
  <gen>L'économie tient à l'absence de tours superflus : une demande exacte et une réponse issue de la source n'accumulent pas d'erreurs. Les chiffres exacts ne viennent que de la mesure de son propre travail.</gen>
  <gen k="À propos des limites">Plus le travail est long, plus il consomme de tokens, c'est pourquoi Claude Code limite les longues réponses : il avertit au-delà de 10 000 tokens et enregistre dans un fichier au-delà de 25 000.</gen>
  <do k="Que faire">Mesurez deux choses sur une même tâche : combien de minutes et de corrections prend le transfert manuel, et combien de tokens l'agent dépense.</do>
</b-finding>
</b-chapter>
<b-chapter id="facts" icon="check-circle" title="Moins d'hallucinations">
<b-why align="left">Hallucination : le modèle produit un texte qui a l'air juste mais est faux ou ne découle pas des données. Le modèle paraît également sûr de lui dans deux situations. <a href="https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations" target="_blank" rel="noopener">En savoir plus</a></b-why>
<b-rules-fixed cols="2" sw="1.8">
  <rule icon="help" t="Peu de contexte">Le modèle comble lui-même les vides et ne dit pas que c'est une supposition.</rule>
  <rule icon="file-text" t="Contexte présent">Le modèle le cite avec aplomb et assurance : ouvrez le lien et vérifiez.</rule>
</b-rules-fixed>
<b-lane title="Là où les données manquent" color="accent" top="14">
<b-scene names="mcp-agent-access/fills-gaps"/>
</b-lane>
<b-art-note top="10" align="left">La réponse de l'agent est confrontée aux données : chacune de ses parties doit avoir un appui. En mathématiques, une telle correspondance s'appelle un épimorphisme. Les parties sans appui sont comblées par le modèle sous forme de supposition, et elles paraissent tout aussi assurées.</b-art-note>
<b-why align="left">Ce que cela signifie en pratique. Si les systèmes ne sont pas connectés, l'agent comble les vides par une supposition et la formule sur le même ton assuré : le texte ne distingue pas une supposition d'un fait. Si les systèmes sont connectés, des données réelles accompagnées d'un lien remplacent la supposition, et la vérification prend un clic. Les trois conseils d'Anthropic fonctionnent ensemble : autoriser l'agent à dire « je ne sais pas » quand il n'y a pas de données, lui demander de s'appuyer sur le texte mot pour mot de la source, et exiger un lien pour chaque affirmation.</b-why>
<b-section-h3 top="18">Ce que recommande Anthropic</b-section-h3>
<b-step-chain>
  <node t="&quot;Je ne sais pas&quot;">Autoriser à admettre l'absence de données</node>
  <node t="Citation">S'appuyer sur le texte de la source mot pour mot</node>
  <node t="Référence">Chaque affirmation reçoit sa source</node>
</b-step-chain>
<b-why align="left">Les trois conseils d'Anthropic comblent les trous dans les données. Autoriser « je ne sais pas » : sinon le modèle comble le vide par une supposition. S'appuyer sur une citation : le texte mot pour mot d'une source peut être vérifié. Donner un lien pour chaque affirmation : on peut l'ouvrir et comparer.</b-why>
<b-finding>
  <ex>Jira est fermé : l'agent a donc inventé deux parties de la réponse. Une fois Jira connecté, ces endroits contiennent les données du ticket PAY-142 avec un lien, et vous l'ouvrez en un clic.</ex>
  <gen>L'agent comble les trous dans les données par une supposition sans le dire. Les trois conseils d'Anthropic les referment : autoriser « je ne sais pas », s'appuyer sur une citation, donner un lien vers la source. Cela ne supprime pas entièrement les hallucinations, une vérification humaine reste nécessaire.</gen>
  <do k="Que faire">Exigez une source pour chaque fait : système, numéro, champ. La manière de procéder dans les exigences et les comptes rendus de réunion est décrite dans <a href="/blog/requirements-sources-facts-assumptions/">un article à part</a>.</do>
</b-finding>
</b-chapter>
<b-chapter id="risks" icon="shield-check" title="Risques et règles">
<b-why align="left">Dans la plupart des cas, la protection est déjà intégrée au fonctionnement de MCP dans Claude Code. Il reste à choisir des serveurs de confiance et à ne pas accorder de droits superflus. <a href="https://code.claude.com/docs/en/mcp" target="_blank" rel="noopener">En savoir plus</a></b-why>
<b-why align="left">Trois risques sont à retenir. Des droits excessifs : un serveur à qui l'on a donné l'accès en écriture peut modifier ou supprimer des données, les droits sont donc accordés au minimum. Un serveur non fiable : un serveur MCP tiers accède à ce que vous lui avez ouvert, connectez donc des serveurs vérifiés. Le texte venant des systèmes : une tâche ou un commentaire peut contenir une phrase destinée à l'agent, ce qui est traité dans l'article [sur le plan de données et le plan de contrôle](/blog/data-plane-control-plane-prompt-injection/).</b-why>
<b-rules sw="1.8">
  <rule icon="bell" t="Autorisation">Claude Code demande l'autorisation avant d'utiliser un outil d'un serveur.</rule>
  <rule icon="folder-hm" t="Serveurs du projet">Les serveurs du fichier .mcp.json d'un projet doivent être approuvés avant la première utilisation.</rule>
  <rule icon="key" t="Droits">Pour les serveurs avec connexion, on peut limiter les droits qu'ils demandent.</rule>
</b-rules>
<b-lane title="Échelle des droits" color="accent" top="14">
<b-scene names="mcp-agent-access/rights-ladder"/>
</b-lane>
<b-why align="left">L'échelle de l'image montre l'ordre d'attribution des droits. D'abord la lecture : l'agent ne fait que regarder. Puis l'écriture avec confirmation : l'agent propose, une personne approuve chaque écriture. L'écriture sans confirmation attend que la confiance soit établie. On ne monte d'un cran qu'après avoir vérifié que le précédent fonctionne.</b-why>
<b-finding>
  <ex>L'agent lit la prod, écrit seulement dans une feuille de test et montre chaque écriture à une personne.</ex>
  <gen>Les droits montent le long de l'échelle : d'abord la lecture, puis l'écriture confirmée. L'écriture sans confirmation attend que la confiance soit gagnée.</gen>
  <do k="Que faire">Donnez à un nouveau serveur la lecture seule et relevez les droits après une semaine de travail vérifié.</do>
</b-finding>
</b-chapter>
<b-chapter id="first" icon="arrow-right" title="Par où commencer">
<b-why align="left">Mieux vaut commencer petit : une source, une personne qui vérifie et le mode lecture seule. Connectez Jira, posez à l'agent cinq questions sur de vraies tâches et comparez les réponses avec ce que vous voyez vous-même. Cela montre jusqu'où l'on peut faire confiance à l'agent avant de lui donner des droits d'écriture.</b-why>
<b-scene names="mcp-agent-access/start-small"/>
<b-finding>
  <ex>Commencez par Jira en lecture seule et comparez cinq réponses de l'agent avec ce que vous voyez vous-même.</ex>
  <gen>Une source, un relecteur, un cran de droits à la fois.</gen>
  <do k="Que faire">Connectez le premier serveur aujourd'hui et notez ce que l'agent a lu correctement et ce qu'il n'a pas lu correctement.</do>
</b-finding>
</b-chapter>
<b-chapter id="cases" icon="grid-alt" title="Autres cas">
<b-why>Une même approche vaut pour toutes les tâches : l'agent lit les sources et une personne vérifie le résultat.</b-why>
<b-scene names="mcp-agent-access/three-cases"/>
<b-table>
<table><thead><tr><th>Cas</th><th>Sources</th><th>Ce que fait l'agent</th><th>Ce que vérifie un humain</th></tr></thead><tbody><tr><td><a href="/blog/bug-report-to-reproduction-agent/">QA</a></td><td>Jira, banc de test, navigateur</td><td>reproduit un bug, réduit le chemin, rédige un rapport</td><td>les étapes à la main sur le banc de test</td></tr><tr><td><a href="/blog/analytics-reports-agent/">Rapports et analytique</a></td><td>base de données, feuilles, documents</td><td>calcule par requêtes, assemble une synthèse</td><td>un chiffre recalculé autrement</td></tr><tr><td><a href="/blog/incident-investigation-agent/">Incidents</a></td><td>Sentry, Grafana</td><td>rapproche erreurs, métriques et heure de la version</td><td>l'hypothèse face aux graphiques et aux événements</td></tr></tbody></table>
</b-table>
<b-why align="left">Comment lire le tableau. Chaque ligne suit le même ordre : l'agent lit les sources, fait le travail principal et apporte un résultat, et une personne le vérifie par une courte action. En QA, les étapes du rapport sont rejouées à la main sur le banc de test. En analytique, un chiffre est recalculé autrement. Pour les incidents, l'hypothèse est comparée aux graphiques et aux événements. Les détails se trouvent dans les articles derrière les liens.</b-why>
</b-chapter>
<b-chapter id="faq" icon="chat" title="Questions fréquentes">
  <b-faq-cards>
    <q t="Quel problème MCP résout-il ?">Sans MCP, un agent ne sait que ce qu'on lui dit. MCP le connecte aux systèmes de travail, pour qu'il lise les faits à la source.</q>
    <q t="Comment connecter MCP ?">Demandez à l'agent de faire lui-même la connexion : cela prend quelques minutes, et la portée projet place la configuration dans le dépôt pour toute l'équipe.</q>
    <q t="Pourquoi y a-t-il moins d'hallucinations avec MCP ?">Quand la réponse n'est pas dans le contexte, l'agent la comble par une supposition. Chaque source connectée comble ce vide avec des faits.</q>
    <q t="Quelles permissions accorder à MCP ?">Commencez par l'accès en lecture et n'accordez l'écriture que là où la tâche l'exige.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" icon="arrow-right" title="À lire ensuite">
  <b-links>
    <item href="/blog/bug-report-to-reproduction-agent/" k="QA avec un agent" t="QA après le support">MCP et skills dans le travail de QA</item>
    <item href="/blog/specs-rules-skills/" k="Skills" t="Spécifications, règles et skills">ce que l'agent doit savoir du projet</item>
    <item href="/blog/harness-driven-development/" k="Boucle d'erreurs" t="Harness-Driven Development">comment les erreurs de l'agent deviennent des règles</item>
  </b-links>
</b-chapter>
<b-footer>La tâche PAY-142 est inventée pour l'exemple.</b-footer>
</b-post>
