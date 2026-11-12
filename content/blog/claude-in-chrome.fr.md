---
title: Comment Claude Code teste un site dans votre navigateur : Claude in Chrome — débogage et formulaires sous votre identifiant
date: 2026-10-05
updated: 2026-11-13
description: Claude in Chrome relie Claude Code au navigateur : l'agent ouvre des onglets, lit la console, exécute des scénarios et remplit des formulaires sous votre identifiant. Comment le connecter, ce qu'il fait et quelles permissions donner.
tags: IA, agents, Claude Code, Claude in Chrome, navigateur, QA, harness
category: harness
layout: wide
mentions: Claude in Chrome, Claude Code, Chrome extension, browser automation, MCP, permissions, QA, Puppeteer, token cost
toc: what=Ce que c'est | connect=Connexion | gives=Ce qu'il fait | qa=Exemple | risks=Permissions et risques | tradeoff=Prix de la souplesse | custom=Script maison | first=Par où commencer | faq=Questions | next=Suite
---

Claude in Chrome relie l'agent à votre navigateur : il ouvre des onglets, lit les pages et la console, clique et saisit du texte sous votre identifiant. Ci-dessous : comment il fonctionne, comment le connecter en quelques minutes, ce que l'agent sait faire et quelles permissions donner. L'agent de l'article sur la [QA avec un agent](/blog/bug-report-to-reproduction-agent/) utilise ce canal, et la connexion fonctionne comme [MCP](/blog/mcp-agent-access/).

<b-post series="harness">

<b-chapter id="what" icon="monitor" title="Ce qu'est Claude in Chrome">
  <b-why>Une extension Chrome relie Claude Code au navigateur. L'agent ouvre de nouveaux onglets et travaille dans une fenêtre visible<b-proof href="https://code.claude.com/docs/en/chrome" quote="Browser actions run in a visible Chrome window in real time."/>.</b-why>
  <iso-art name="claude-in-chrome/terminal-to-browser"></iso-art>
  <b-why align="left">Le schéma montre trois participants de gauche à droite : Claude Code dans le terminal, l'extension et votre navigateur. L'agent donne des commandes à l'extension (ouvrir un onglet, cliquer, lire la page), et l'extension les exécute dans le navigateur où vous êtes déjà connecté à vos services. L'agent n'a donc pas besoin de saisir de mots de passe : votre session est déjà ouverte<b-proof href="https://code.claude.com/docs/en/chrome" quote="shares your browser's login state"/>. Le travail se déroule dans une fenêtre visible, et vous pouvez suivre les étapes.</b-why>
  <b-why align="left">Les étiquettes ci-dessous montrent avec quels navigateurs l'extension fonctionne. Chrome et Edge sont officiellement pris en charge<b-proof href="https://code.claude.com/docs/en/chrome" quote="Chrome integration works with Google Chrome and Microsoft Edge."/>. Brave, Arc, Vivaldi et Opera reposent sur le même moteur Chromium : Claude Code y trouve l'extension et s'y connecte<b-proof href="https://code.claude.com/docs/en/chrome" quote="Claude Code also detects the extension and sets up the connection in other Chromium-based browsers"/>. La dernière étiquette, « WSL : non », signifie que cette connexion ne fonctionne pas dans le Windows Subsystem for Linux (WSL)<b-proof href="https://code.claude.com/docs/en/chrome" quote="Chrome integration isn't supported in Windows Subsystem for Linux (WSL)."/>.</b-why>
  <b-pills>
    <pill>Chrome</pill>
    <pill>Edge</pill>
    <pill>Brave</pill>
    <pill>Arc</pill>
    <pill>Vivaldi</pill>
    <pill>Opera</pill>
    <pill>WSL : non</pill>
  </b-pills>
  <b-finding>
    <ex>L'agent dans le terminal pilote les onglets de Chrome via l'extension et utilise vos identifiants.</ex>
    <gen>Les actions sont visibles dans la fenêtre en temps réel. Sur une page de connexion ou un CAPTCHA, l'agent s'arrête et vous attend. Dans Claude Code, l'extension apparaît comme le serveur MCP claude-in-chrome : /mcp liste ses outils.</gen>
    <do k="À faire">Vérifiez les prérequis : extension en version 1.0.36 ou plus récente<b-proof href="https://code.claude.com/docs/en/chrome" quote="version 1.0.36 or later"/>, Claude Code, un forfait Pro, Max, Ultra, Team ou Enterprise<b-proof href="https://code.claude.com/docs/en/chrome" quote="A direct Anthropic plan (Pro, Max, Ultra, Team, or Enterprise)"/>, et connexion avec /login<b-proof href="https://code.claude.com/docs/en/chrome" quote="Chrome integration also requires signing in with"/>.</do>
  </b-finding>
</b-chapter>

<b-chapter id="connect" icon="plug" title="Comment le connecter">
  <b-say-agent title="Dites à l'agent">Installe Claude in Chrome et connecte-le à Claude Code.</b-say-agent>
  <b-why align="left">Si l'extension est absente, Claude Code propose de l'installer<b-proof href="https://code.claude.com/docs/en/chrome" quote="Claude Code shows an install prompt titled"/> : vous acceptez et vous vous connectez via le navigateur. [Si l'agent vous demande de le faire](/blog/agent-hands-work-back-to-you/).</b-why>
  <b-spoiler summary="Comment faire à la main">
    <b-why align="left">La connexion se fait en trois étapes. Étape 1 : installer l'extension Claude dans votre Chrome depuis la boutique d'extensions, une seule fois. Étape 2 : dans le terminal où tourne Claude Code, lancer claude --chrome, et l'agent se lie au navigateur. Étape 3 : taper /chrome et regarder l'état : s'il indique « Enabled », la liaison fonctionne.</b-why>
    <iso-art name="claude-in-chrome/setup-steps"></iso-art>
    <b-codebox copy>
      claude --chrome
      /chrome   # status, permissions, reconnect
    </b-codebox>

<a href="https://chromewebstore.google.com/detail/claude/fcoeoabgfenejglbffodgkkbkcdhcgfn" target="_blank" rel="noopener">Extension dans le Chrome Web Store</a>. Pour se passer de l'option, ouvrez /chrome et activez « Enabled by default ». Les outils du navigateur sont alors toujours dans le contexte, et la consommation de tokens augmente<b-proof href="https://code.claude.com/docs/en/chrome" quote="Enabling Chrome by default increases context usage since the browser tools and their instructions are always loaded."/>. Dans VS Code, le navigateur se connecte en tapant @browser dans la zone de saisie, et « Enabled by default » est commun au terminal et à VS Code<b-proof href="https://code.claude.com/docs/en/chrome" quote="The two share one setting, so turning it on in either place turns it on for both the CLI and VS Code."/>.

    <b-spoiler summary="Si la connexion échoue">
      <b-node-grid min="170">
        <node icon="check" t="Extension activée">sur la page chrome://extensions</node>
        <node icon="play" t="Chrome est lancé">et Claude Code est à jour</node>
        <node icon="refresh-cw" t="Reconnecter">la commande /chrome, élément Reconnect extension</node>
        <node icon="monitor-screen" t="Première fois">redémarrer Chrome après l'installation</node>
      </b-node-grid>
    </b-spoiler>
  </b-spoiler>
  <b-finding>
    <ex>L'agent installe lui-même l'extension et la connecte à Claude Code. Vous n'avez qu'à accepter et à vous connecter via le navigateur.</ex>
    <gen>La connexion prend quelques minutes : l'extension vient du Chrome Web Store, et Claude Code fait le reste.</gen>
    <do k="À faire">Demandez à l'agent d'installer l'extension et vérifiez que /chrome affiche « Status: Enabled » et « Extension: Installed »<b-proof href="https://code.claude.com/docs/en/chrome" quote="The integration is working when the status panel shows"/>.</do>
  </b-finding>
</b-chapter>

<b-chapter id="gives" icon="grid-alt" title="Ce que l'agent sait faire dans le navigateur">
  <b-why align="left">Au centre du schéma se trouve le navigateur, et autour de lui quatre sortes de travail que l'agent y accomplit.</b-why>
  <iso-art name="claude-in-chrome/browser-uses"></iso-art>
  <b-why align="left">Premièrement : lire la console et la page, ce qui permet de trouver la cause d'une erreur. Deuxièmement : exécuter des scénarios et remplir des formulaires, ce qui vérifie que le parcours fonctionne. Troisièmement : travailler avec des documents sous votre identifiant, c'est-à-dire avec ce qui ne s'ouvre pas sans connexion. Quatrièmement : extraire des données et enregistrer un GIF pour laisser une trace à vérifier. Il n'est pas nécessaire d'écrire du code pour chaque petite chose : vous énoncez la tâche avec des mots et l'agent trouve lui-même les boutons et les champs.</b-why>
  <b-finding>
    <ex>Une seule connexion couvre le débogage, les tests, les formulaires, les documents et l'extraction de données.</ex>
    <gen>L'agent lit la console et le DOM, exécute des scénarios, remplit des formulaires, téléverse des fichiers (jusqu'à 10 Mo au total<b-proof href="https://code.claude.com/docs/en/chrome" quote="a single upload can include up to 10 MB of files in total"/>) et enregistre des GIF<b-proof href="https://code.claude.com/docs/en/chrome" quote="record browser interactions as GIFs"/>.</gen>
    <do k="À faire">Choisissez une tâche répétitive dans le navigateur et confiez-la à l'agent.</do>
  </b-finding>
</b-chapter>

<b-chapter id="qa" icon="bug" title="Exemple : un bug sur le banc de test">
  <b-why>Le ticket PAY-142 de l'article [sur la QA avec un agent](/blog/bug-report-to-reproduction-agent/) : l'agent parcourt lui-même le chemin et rapporte des preuves.</b-why>
  <b-say-agent title="Dites à l'agent">Ouvre le banc de test, ajoute un article au panier, applique le code promo et paie avec une carte de test. Si le paiement échoue, regarde la console et enregistre un GIF du parcours.</b-say-agent>
  <b-why align="left">Voici l'exemple de l'article sur la QA : le ticket PAY-142 et le chemin de l'agent jusqu'au résultat final.</b-why>
  <iso-art name="claude-in-chrome/ticket-to-report"></iso-art>
  <b-why align="left">Le schéma montre le chemin du ticket au résultat. Le ticket parvient à l'agent, l'agent parcourt le panier, le code promo et le paiement dans le navigateur, trouve l'erreur dans la console et enregistre un GIF. La QA reçoit non pas un récit mais une trace vérifiable : le texte de la console et un enregistrement du déplacement sur la page. Si l'enregistrement et la console ne correspondent pas au rapport, cela se voit aussitôt.</b-why>
  <b-finding>
    <ex>L'agent parcourt le chemin, trouve l'erreur de console et enregistre un GIF pour le ticket.</ex>
    <gen>La fenêtre est visible : la QA suit les étapes et peut arrêter l'agent. Le texte de la console et le GIF laissent une trace vérifiable.</gen>
    <do k="À faire">Demandez un GIF et un extrait de console avec chaque résultat.</do>
  </b-finding>
</b-chapter>

<b-chapter id="risks" icon="shield-check" title="Permissions et risques">
  <b-why align="left">L'agent travaille dans votre navigateur : tout ce à quoi vous êtes connecté lui est donc accessible. La première ligne de défense, sur le schéma, est la liste des sites autorisés et la demande de permission sur les nouveaux.</b-why>
  <iso-art name="claude-in-chrome/site-permissions"></iso-art>
  <b-why align="left">À gauche du schéma, vous décidez : l'agent demande « autoriser ? ». Au centre se trouvent les sites A et B, que vous avez autorisés et où l'agent travaille. À droite, le site C, fermé à l'agent. Une action sur un nouveau site commence par votre accord. Voici les règles une à une : ce que voit l'agent, où il s'arrête et ce qu'il faut regarder avant d'envoyer un enregistrement.</b-why>
  <b-rules sw="1.8">
    <rule icon="lines" t="Sites">Les réglages de l'extension déterminent sur quels sites l'agent peut naviguer, cliquer et saisir du texte.</rule>
    <rule icon="bell" t="Demande">La boîte de dialogue « Claude in Chrome wants to » autorise une action ou tout le site pour la session.</rule>
    <rule icon="key" t="Vos identifiants">L'agent peut accéder à tout ce à quoi vous êtes connecté dans ce navigateur.</rule>
    <rule icon="pause" t="Connexion et CAPTCHA">L'agent se met en pause et vous attend.</rule>
    <rule icon="video" t="GIF">L'enregistrement contient tout ce qui est visible, y compris les données du compte : relisez-le avant de le partager.</rule>
    <rule icon="ban" t="Boîtes de dialogue">Les boîtes alert, confirm et prompt bloquent les commandes : fermez-les à la main et demandez à l'agent de continuer.</rule>
  </b-rules>
  <b-why align="left">Chacune de ces règles figure dans la documentation de Claude Code. L'agent s'arrête sur une connexion et sur un CAPTCHA<b-proof href="https://code.claude.com/docs/en/chrome" quote="When Claude encounters a login page or CAPTCHA, it pauses and asks you to handle it manually."/>. La demande de permission commence par « Claude in Chrome wants to »<b-proof href="https://code.claude.com/docs/en/chrome" quote="The dialog starts with"/>. Un enregistrement GIF capture tout ce qui est visible, y compris les données du compte<b-proof href="https://code.claude.com/docs/en/chrome" quote="The recording captures everything visible in the browser, including account details on logged-in pages"/>. Les boîtes alert, confirm et prompt bloquent les commandes<b-proof href="https://code.claude.com/docs/en/chrome" quote="JavaScript dialogs block browser events and prevent Claude from receiving commands."/>. La liste des sites se règle dans les paramètres de l'extension<b-proof href="https://code.claude.com/docs/en/chrome" quote="Manage permissions in the Chrome extension settings to control which sites Claude can browse, click, and type on."/>.</b-why>
  <b-cap>Le texte d'une page peut viser l'agent. Ce risque est traité dans [un article à part](/blog/data-plane-control-plane-prompt-injection/).</b-cap>
  <b-finding>
    <ex>Les sites autorisés sont ouverts à l'agent, les autres restent fermés, et les actions sur un nouveau site demandent votre accord.</ex>
    <gen>L'agent travaille avec vos identifiants : les permissions par site sont donc la première ligne de défense.</gen>
    <do k="À faire">Ouvrez les paramètres de l'extension et ne gardez que les sites dont la tâche a besoin.</do>
  </b-finding>
</b-chapter>

<b-chapter id="tradeoff" icon="scales" title="Le prix de la souplesse : plus lent qu'un script et avec un risque d'erreur">
  <b-why align="left">Un agent dans le navigateur travaille autrement qu'un script ou qu'un programme écrit. Un script exécute les mêmes étapes, vite et à l'identique. À chaque étape, l'agent lit la page, réfléchit et décide de la suite : il est donc plus lent et consomme des tokens. Il peut se tromper : cliquer sur le mauvais bouton ou raconter ce qui n'est pas sur la page, c'est-à-dire [halluciner](/materials/glossary/hallucination/). En échange, il vient à bout d'une tâche impossible à décrire d'avance en code : la page a changé, un bouton a bougé, la tâche est énoncée avec des mots. C'est le prix de la souplesse, et mieux vaut le payer en connaissance de cause.</b-why>
  <b-table id="agent-vs-script">

| | Script | Agent dans le navigateur |
|---|---|---|
| Vitesse | rapide, les mêmes étapes | plus lent : lit et réfléchit à chaque étape |
| Répétabilité | le même résultat à chaque fois | la réponse peut différer d'une exécution à l'autre |
| Si la page a changé | casse jusqu'à correction | s'adapte, mais peut se tromper ou inventer |
| Préparation | il faut écrire et maintenir du code | décrire la tâche avec des mots suffit |
| Où il convient | travail régulier de masse | travail ponctuel, reconnaissance, pages inhabituelles |

  </b-table>
  <b-why align="left">Il y a aussi l'observation de l'auteur. Les services réputés stricts envers l'automatisation, LinkedIn par exemple, traitent en général un agent dans un vrai navigateur avec plus de calme que des scripts et des scrapers : les actions viennent de votre fenêtre, sous votre identifiant, au rythme d'une personne vivante. Cela ne garantit rien. Les règles de ces services interdisent en général les actions automatisées, et le risque de blocage du compte reste pour vous. Donnez donc à l'agent ce que vous feriez à la main, par petites portions et en vérifiant le résultat.</b-why>
  <b-cap>La vitesse, les erreurs de l'agent et la réaction des services sont décrites d'après les observations de l'auteur : la documentation de Claude Code n'en parle pas.</b-cap>
  <b-finding>
    <ex>L'agent est plus lent qu'un script et peut se tromper, mais il s'en sort là où un script devrait être réécrit.</ex>
    <gen>On échange vitesse et répétabilité contre de la souplesse. Une trace vérifiable (console, GIF, texte du résultat) rend le contrôle des erreurs.</gen>
    <do k="À faire">Pour le travail ponctuel et inhabituel, utilisez l'agent ; pour le travail de masse et régulier, écrivez un script. Comparez le résultat de l'agent avec ce que vous voyez vous-même.</do>
  </b-finding>
</b-chapter>

<b-chapter id="custom" icon="boxes-route" title="Quand il faut son propre script">
  <b-why align="left">Claude in Chrome convient au travail ponctuel, mais les tâches de production demandent souvent un script maison.</b-why>
  <b-rules sw="1.8">
    <rule icon="code" t="Puppeteer">Une bibliothèque qui pilote le navigateur depuis le code : ouvrir une page, cliquer, extraire l'utile. Elle fonctionne sans agent à chaque étape.</rule>
    <rule icon="page-lines" t="Page entière">Claude Code prend la page entière : texte, éléments, captures d'écran. C'est pratique pour une tâche ponctuelle.</rule>
    <rule icon="coin" t="Tokens et vitesse">Plus la page est grande, plus chaque étape coûte de tokens : plus lent et plus cher.</rule>
    <rule icon="boxes-route" t="Script maison">Une solution sur mesure ne prend que la partie du site ou de la page dont vous avez besoin : un tableau, un formulaire, un bloc. L'agent reçoit un résultat court.</rule>
    <rule icon="scales" t="Que choisir">Tâches ponctuelles et exploration : Claude in Chrome. Travail régulier et volumineux avec un budget de tokens : votre propre script que l'agent appelle comme un outil.</rule>
  </b-rules>
  <b-cap>Le script peut être relié à l'agent par [MCP](/blog/mcp-agent-access/) ou par un skill : l'agent demande le morceau de page dont il a besoin au lieu de tout ouvrir.</b-cap>
  <b-finding>
    <ex>L'agent lit la page entière et y dépense des tokens et du temps.</ex>
    <gen>En production, les tokens et la vitesse comptent : on ne prend donc que les parties utiles des sites et des pages.</gen>
    <do k="À faire">Laissez le travail ponctuel à Claude in Chrome. Déplacez le travail répétitif dans un script Puppeteer et donnez-le à l'agent.</do>
  </b-finding>
</b-chapter>

<b-chapter id="first" icon="flag" title="Par où commencer">
  <b-why align="left">Les trois étapes reprennent le début de l'article : extension, lancement, vérification.</b-why>
  <iso-art name="claude-in-chrome/start-steps"></iso-art>
  <b-why align="left">Pour le premier lancement, prenez un banc local ou de test : si l'agent se trompe, rien n'est abîmé. Demandez-lui d'abord seulement de lire (ouvrir une page et la raconter), puis autorisez les actions. Ainsi, les erreurs de l'agent se remarquent sur une tâche sans danger.</b-why>
  <b-finding>
    <ex>Trois étapes : extension, lancement, vérification.</ex>
    <gen>Commencez par un banc local : une erreur n'y casse rien.</gen>
    <do k="À faire">Aujourd'hui, dites à l'agent d'installer l'extension et vérifiez l'état avec /chrome.</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Questions fréquentes">
  <b-faq-cards>
    <q t="Comment connecter Claude in Chrome ?">Installez l'extension depuis le Chrome Web Store, et Claude Code fait le reste. Cela prend quelques minutes.</q>
    <q t="Que sait faire l'agent dans le navigateur ?">Il lit la console et le balisage des pages, parcourt des scénarios, remplit des formulaires, téléverse des fichiers jusqu'à 10 Mo au total et enregistre des GIF.</q>
    <q t="Donner le navigateur à un agent est-il sûr ?">Les actions sont visibles dans la fenêtre en temps réel, et sur une page de connexion ou un captcha l'agent s'arrête et vous attend. Les permissions et les risques sont traités à part dans l'article.</q>
    <q t="Quand un script est-il préférable ?">Un agent dans le navigateur est plus lent qu'un script et peut commettre des erreurs. Pour des vérifications répétées où la vitesse et la précision comptent, écrivez un script.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Suite">
  <b-links>
    <item href="/blog/bug-report-to-reproduction-agent/" k="Exemple" t="Le travail de la QA après le support avec un agent IA : enquête, description et documentation via MCP et skills">L'agent reproduit un bug Jira</item>
    <item href="/blog/mcp-agent-access/" k="Connexion" t="MCP pour un agent IA : quel problème il résout et comment confier la connexion à l'agent">Comment l'agent obtient l'accès aux systèmes</item>
    <item href="/blog/agent-hands-work-back-to-you/" k="Passage de relais" t="L'agent aime vous mettre au travail : comment l'obliger à le faire lui-même">Quand l'agent demande de l'aide à un humain</item>
  </b-links>
</b-chapter>
<b-footer>Le ticket PAY-142 est inventé pour l'exemple. Les faits sur la connexion et les permissions suivent la documentation de Claude Code : <a href="https://code.claude.com/docs/en/chrome" target="_blank" rel="noopener">Use Claude Code with Chrome</a>.</b-footer>
</b-post>
