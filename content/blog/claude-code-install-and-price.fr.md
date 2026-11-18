---
title: Claude Code : installation et prix, abonnements et disponibilité par pays
seoTitle: Claude Code : installation et prix en 2026, abonnements
date: 2026-11-17
updated: 2026-11-18
description: Installer Claude Code sur Mac, Linux ou Windows : ce que comprennent Pro, Max, Ultra et Team, clé API, usage depuis la Russie. Commandes et erreurs.
tags: IA, Claude Code, installation, prix, abonnements, harness
category: harness
layout: wide
mentions: Claude Code, OpenCode, Codex, Cursor, Gemini CLI, Antigravity CLI, CLAUDE.md
toc: answer=Réponse rapide | what=C'est quoi | install=Installation | login=Première connexion | plans=Abonnements | check=Vérification | errors=Erreurs | region=Disponibilité | alt=Alternatives | prompts=Requêtes | faq=Questions | next=À lire ensuite
---

Claude Code s'installe avec une seule commande dans le terminal : sur macOS, Linux et WSL `curl -fsSL https://claude.ai/install.sh | bash`, sous Windows dans PowerShell `irm https://claude.ai/install.ps1 | iex`. La connexion exige un abonnement payant Claude Pro à 20 $ par mois, Max, Ultra, Team ou Enterprise, ou un compte Console facturé à l'usage de l'API ; le plan gratuit ne convient pas.

<b-post series="harness">
<b-chapter id="answer" title="Réponse rapide" icon="crosshair">
  <b-why>L'installation tient en une commande et la connexion se fait dans le navigateur. Un accès payant est toujours nécessaire : un abonnement ou une facturation à l'API<b-proof href="https://code.claude.com/docs/en/setup" quote="Claude Code: «Claude Code requires a Pro, Max, Ultra, Team, Enterprise, or Console account. The free claude.ai plan does not include Claude Code access» — code.claude.com/docs/en/setup"/>.</b-why>

  <iso-art name="claude-code-install-and-price/install-flow"></iso-art>
  <b-cap>Le chemin d'un terminal vide à la première réponse : ouvrir un terminal, coller la commande, ouvrir une nouvelle fenêtre, vérifier la version, se connecter à son compte.</b-cap>
  <b-sublabel top="18">Ce que cela signifie en termes simples</b-sublabel>

  Claude Code est un agent de programmation d'Anthropic, l'entreprise qui fait Claude. Il travaille dans le terminal, une fenêtre où l'on tape des commandes textuelles, lit les fichiers de votre projet et les modifie pour accomplir la tâche que vous lui donnez. Il s'installe avec une commande : vous copiez la ligne de votre système, la collez dans le terminal et attendez. Ensuite vous rouvrez le terminal, vérifiez la version et vous connectez à votre compte Claude par le navigateur. L'accès est payant : il faut un abonnement ou un compte facturé à l'usage de l'API. Le plan gratuit du chat Claude reste gratuit, mais Claude Code n'en fait pas partie.

  Exemple du quotidien. Luka habite à Lisbonne et travaille sur un portable sous Ubuntu. Il ouvre le terminal et colle la commande pour macOS, Linux et WSL. L'installateur n'affiche rien pendant quelques minutes, et Luka ne ferme pas la fenêtre. Puis il ouvre une nouvelle fenêtre de terminal, tape <code>claude --version</code> et voit un numéro de version avec la mention « (Claude Code) ». Reste la connexion : Luka lance <code>claude</code> dans le dossier du projet, le navigateur ouvre la page de connexion, et il se connecte avec son abonnement Pro. Le Portugal figure dans la liste des pays d'Anthropic, la région n'est donc pas un obstacle.

  Erreur fréquente : installer Claude Code avec un simple compte de chat gratuit. L'installation réussira, mais la connexion ne donnera pas accès à l'agent : le plan gratuit n'inclut pas Claude Code. Avant d'installer, décidez comment vous paierez : un abonnement Pro, Max, Ultra, Team ou Enterprise, ou une facturation à l'API via Console.

  Vous pouvez vérifier la réponse juste après l'installation : la commande <code>claude --version</code> affiche un numéro de version et « (Claude Code) ». Les prix et les conditions ont été vérifiés sur la <a href="https://claude.com/pricing">page des tarifs de Claude</a> et sur la <a href="https://code.claude.com/docs/en/setup">page d'installation de Claude Code</a>.
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>Question</th><th>Réponse au 18.11.2026</th></tr>
    </thead>
    <tbody>
      <tr><td>Comment installer</td><td>une commande : une pour macOS, Linux et WSL, une autre pour PowerShell ou CMD sous Windows</td></tr>
      <tr><td>Prix</td><td>Pro 20 $ par mois, Max 100 $, Ultra 200 $ ; Team à partir de 25 $ par siège<b-proof href="https://claude.com/pricing" quote="Claude: Pro «$20 if billed monthly», Max «$100», Ultra «$200», Team standard seat «$25 if billed monthly» — claude.com/pricing"/></td></tr>
      <tr><td>Quel abonnement l'inclut</td><td>Claude Code est dans Pro, Max, Ultra, Team et Enterprise ; le plan gratuit n'a pas Claude Code</td></tr>
      <tr><td>Disponibilité</td><td>la Russie ne figure pas sur la liste officielle des pays d'Anthropic ; les conditions citent Claude Code parmi les produits soumis à cette restriction<b-proof href="https://www.anthropic.com/supported-countries" quote="Anthropic: «Any country or region not listed is unsupported» — anthropic.com/supported-countries"/></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>Date de vérification : 18.11.2026. Les prix et la liste des pays changent : rouvrez les pages d'Anthropic avant de payer.</b-cap>
</b-chapter>
<b-chapter id="what" title="Claude Code, c'est quoi" icon="terminal">
  <b-why>Claude Code est un agent de programmation d'Anthropic. Il lit votre projet, modifie des fichiers, lance des commandes et des tests, et travaille avec git. Claude dans le chat répond par du texte, alors que Claude Code modifie lui-même les fichiers du projet.</b-why>

  <iso-art name="term:claude-code"></iso-art>
  <b-links cols="1">
    <item href="/materials/glossary/claude-code/" k="Terme" t="Claude Code">Ce qu'il fait, où il tourne, quels modèles il utilise</item>
  </b-links>
  <b-sublabel top="18">Ce que cela signifie en termes simples</b-sublabel>

  Un agent fait le travail lui-même : vous décrivez la tâche avec des mots, et il ouvre les bons fichiers du projet, fait les modifications, lance les vérifications et montre le résultat. Git est un programme qui garde l'historique des modifications d'un projet ; Claude Code sait travailler avec lui. Les tests sont des vérifications qui confirment que le programme fonctionne toujours après une modification ; l'agent les lance lui-même et lit le résultat.

  Claude Code fonctionne dans le terminal, dans VS Code et JetBrains, dans l'application de bureau, dans le navigateur, dans Slack et en CI. Cet article traite du terminal, qui est le moyen principal de l'utiliser<b-proof href="https://code.claude.com/docs/en/quickstart" quote="Claude Code: «Claude Code is also available on the web, as a desktop app, in VS Code and JetBrains IDEs, in Slack, and in CI/CD» — code.claude.com/docs/en/quickstart"/>.

  Exemple du quotidien. Rita habite à Riga et gère un petit site avec des tests et un historique dans git. D'abord elle demande à Claude dans le chat pourquoi un bouton ne marche pas et reçoit une explication en texte : c'est à elle de corriger le code. Ensuite elle lance Claude Code dans le dossier du site et écrit la même tâche. L'agent trouve le bon fichier, le modifie, lance les tests et montre le changement. Rita regarde la modification dans git et l'accepte. La Lettonie figure dans la liste des pays d'Anthropic, la région ne soulève donc aucune question.

  <b>Claude Code est-il le même Claude que dans le chat, simplement dans le terminal ?</b> Non. Dans le chat, Claude répond par du texte, et vous reportez vous-même les modifications. Claude Code modifie les fichiers du projet et lance des commandes : c'est pourquoi il demande une installation séparée et n'est inclus que dans les abonnements payants. Comment vérifier : le plan gratuit n'inclut pas Claude Code, et dans le tableau des abonnements sur <a href="https://claude.com/pricing">claude.com/pricing</a> la colonne Free indique « Claude Code: No ».
</b-chapter>
<b-chapter id="install" title="Installer Claude Code pas à pas" icon="arrow-down">
  <b-why>Prérequis : macOS 13+, Windows 10 1809+ ou Windows Server 2019+, Ubuntu 20.04+, Debian 10+, Alpine 3.19+ ; 4 Go de mémoire ou plus, un processeur x64 ou ARM64, un accès à internet<b-proof href="https://code.claude.com/docs/en/setup" quote="Claude Code: «macOS 13.0+», «Windows 10 1809+ or Windows Server 2019+», «Ubuntu 20.04+», «4 GB+ RAM» — code.claude.com/docs/en/setup"/>. Les commandes viennent de la page d'installation, date de vérification : 18.11.2026.</b-why>

  <b-sublabel top="18">Quelle commande prendre</b-sublabel>

  La commande dépend de la fenêtre où vous tapez. Sur macOS, Linux et dans WSL (un environnement Linux à l'intérieur de Windows), une seule ligne sert. Sous Windows il y a deux fenêtres, PowerShell et CMD, et leurs commandes diffèrent. On les distingue par l'invite : dans PowerShell elle commence par « PS », dans CMD il n'y a pas de « PS ». Si vous prenez la commande de l'autre fenêtre, l'installation ne démarrera pas.
  <iso-art name="claude-code-install-and-price/which-shell"></iso-art>
  <b-cap>Trois commandes pour trois fenêtres : macOS, Linux et WSL ; PowerShell avec l'invite « PS » ; CMD sans « PS ».</b-cap>
  <b-sublabel top="18">macOS, Linux et WSL</b-sublabel>
  <b-codebox title="Terminal" copy>
    curl -fsSL https://claude.ai/install.sh | bash
  </b-codebox>
  <b-sublabel top="18">Windows : PowerShell (l'invite contient PS)</b-sublabel>
  <b-codebox title="PowerShell" copy>
    irm https://claude.ai/install.ps1 | iex
  </b-codebox>
  <b-sublabel top="18">Windows : CMD (l'invite ne contient pas PS)</b-sublabel>
  <b-codebox title="CMD" copy>
    curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
  </b-codebox>
  <b-cap>L'installateur n'affiche aucune progression pendant le téléchargement des fichiers. Les droits d'administrateur ne sont pas nécessaires sous Windows. Installer Git for Windows est facultatif : sans lui, Claude Code lance les commandes via PowerShell<b-proof href="https://code.claude.com/docs/en/setup" quote="Claude Code: «Installing Git for Windows is optional» — code.claude.com/docs/en/setup"/>.</b-cap>

  Exemple du quotidien. Jan habite à Gdansk et travaille sur un portable Windows. Il ouvre PowerShell et voit « PS » au début de la ligne. Il lui faut donc la commande <code>irm https://claude.ai/install.ps1 | iex</code>. Jan la colle et ne voit aucune ligne pendant quelques minutes, mais il ne ferme pas la fenêtre : l'installateur n'affiche pas de progression. Il n'a eu besoin d'aucun droit d'administrateur et n'a pas installé Git for Windows. Une fois l'installation terminée, Jan a rouvert PowerShell et lancé <code>claude --version</code>. La Pologne figure dans la liste des pays d'Anthropic. Pour vérifier que la fenêtre est la bonne, regardez les deux premières lettres de l'invite.

  <b-sublabel top="18">Installateur ou gestionnaire de paquets</b-sublabel>

  L'installateur, c'est-à-dire la commande avec <code>curl</code> ou <code>irm</code>, est la méthode recommandée : il met Claude Code à jour tout seul en arrière-plan. Un gestionnaire de paquets est un programme qui installe et met à jour d'autres programmes par leur nom ; cette voie fonctionne aussi, mais il faut mettre Claude Code à jour à la main. Avec npm, installez sans <code>sudo</code> : la documentation avertit qu'une telle installation ne pourra pas se mettre à jour elle-même<b-proof href="https://code.claude.com/docs/en/setup" quote="Claude Code: «Do NOT use sudo npm install -g as this can lead to permission issues and security risks» — code.claude.com/docs/en/setup"/>.
  <iso-art name="claude-code-install-and-price/install-methods"></iso-art>
  <b-cap>L'installateur se met à jour seul, les gestionnaires de paquets se mettent à jour à la main : Homebrew, WinGet, npm, apt, dnf, apk.</b-cap>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>Méthode</th><th>Commande</th><th>Mises à jour</th></tr>
    </thead>
    <tbody>
      <tr><td>Installateur (recommandé)</td><td><code>curl -fsSL https://claude.ai/install.sh | bash</code></td><td>automatiques, en arrière-plan</td></tr>
      <tr><td>Homebrew (macOS)</td><td><code>brew install --cask claude-code</code></td><td>à la main : <code>brew upgrade claude-code</code></td></tr>
      <tr><td>WinGet (Windows)</td><td><code>winget install Anthropic.ClaudeCode</code></td><td>à la main : <code>winget upgrade Anthropic.ClaudeCode</code></td></tr>
      <tr><td>npm (Node.js 22+ requis)</td><td><code>npm install -g @anthropic-ai/claude-code@latest</code></td><td>répéter la commande d'installation</td></tr>
      <tr><td>apt, dnf, apk</td><td>ajouter le dépôt d'Anthropic en suivant les instructions de la documentation</td><td>avec la mise à jour habituelle du système</td></tr>
    </tbody>
    </table>
  </b-ctx-table>

  Exemple du quotidien. Marco habite à Milan et travaille sur un Mac. Il installe déjà tous ses programmes avec Homebrew, il choisit donc <code>brew install --cask claude-code</code> à la place de l'installateur. Tout fonctionne de la même façon, mais un mois plus tard Marco met Claude Code à jour avec <code>brew upgrade claude-code</code> : il ne se mettra pas à jour tout seul. L'Italie figure dans la liste des pays d'Anthropic. Pour vérifier la méthode d'installation : si Homebrew l'a installé, mettez-le à jour avec le même Homebrew.

  <b-sublabel top="18">Windows : directement ou via WSL</b-sublabel>

  WSL est un environnement Linux à l'intérieur de Windows : Claude Code y fonctionne comme sur un Linux ordinaire. Le choix dépend du projet. Si le projet et ses programmes sont pour Windows, installez directement sous Windows. Si vous avez besoin de programmes Linux ou de l'isolation des commandes (un bac à sable, c'est-à-dire l'exécution des commandes de l'agent dans un environnement restreint), prenez WSL 2. WSL 1 convient quand WSL 2 n'est pas disponible, mais il ne prend pas en charge l'isolation des commandes.
  <iso-art name="claude-code-install-and-price/windows-modes"></iso-art>
  <b-cap>Trois modes sous Windows : directement, WSL 2 avec isolation des commandes, WSL 1 sans isolation.</b-cap>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>Option</th><th>Quand la choisir</th><th>Isolation des commandes (bac à sable)</th></tr>
    </thead>
    <tbody>
      <tr><td>Windows directement</td><td>projets et programmes pour Windows</td><td>non prise en charge</td></tr>
      <tr><td>WSL 2</td><td>programmes Linux ou isolation des commandes</td><td>prise en charge</td></tr>
      <tr><td>WSL 1</td><td>si WSL 2 n'est pas disponible</td><td>non prise en charge</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>Dans WSL, la commande Linux se lance dans la fenêtre WSL ; PowerShell ne convient pas<b-proof href="https://code.claude.com/docs/en/setup" quote="Claude Code: «You install and launch claude inside the WSL terminal, not from PowerShell or CMD» — code.claude.com/docs/en/setup"/>. Sous Alpine, <code>bash</code> et <code>curl</code> sont nécessaires avant l'installation : <code>apk add bash curl</code>.</b-cap>
</b-chapter>
<b-chapter id="login" title="Première connexion" icon="key">
  <b-why>La connexion se fait dans le navigateur : Claude Code ouvre lui-même la page, et après la connexion le terminal affiche « Login successful »<b-proof href="https://code.claude.com/docs/en/authentication" quote="Claude Code: «When login completes, the terminal shows Login successful and prompts you to press Enter to continue» — code.claude.com/docs/en/authentication"/>.</b-why>

  <b-sublabel top="18">Comment le lancer</b-sublabel>

  Allez dans le dossier du projet et lancez <code>claude</code>. Le programme ouvre le navigateur, vous vous connectez à votre compte Claude, et le terminal affiche « Login successful » et l'invitation à appuyer sur Entrée. Ensuite vous pouvez poser des questions sur le projet.
  <b-codebox title="Premier lancement" copy>
    cd path/to/project
    claude
  </b-codebox>
  <b-cap>Si le navigateur ne s'est pas ouvert, appuyez sur <code>c</code> : l'adresse de connexion est copiée dans le presse-papiers. On se déconnecte avec la commande <code>/logout</code> et on se reconnecte avec <code>/login</code>. L'aide dans la session est <code>/help</code>.</b-cap>
  <b-sublabel top="18">Avec quoi se connecter</b-sublabel>

  La façon de se connecter dépend de la façon de payer. Un abonnement Pro, Max ou Ultra est délivré à une personne. Team et Enterprise utilisent le compte d'un employé invité par un administrateur. Claude Console est un compte distinct, facturé à l'usage de l'API avec des crédits prépayés. Amazon Bedrock, Google Cloud et Microsoft Foundry conviennent aux organisations qui ont déjà un fournisseur cloud.
  <iso-art name="claude-code-install-and-price/login-paths"></iso-art>
  <b-cap>Quatre chemins de connexion : un abonnement, Team ou Enterprise, Console, les fournisseurs cloud.</b-cap>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>Avec quoi se connecter</th><th>Pour qui</th></tr>
    </thead>
    <tbody>
      <tr><td>Abonnement Pro, Max ou Ultra</td><td>une personne, qui se connecte avec un compte claude.ai</td></tr>
      <tr><td>Team ou Enterprise</td><td>un employé invité par un administrateur</td></tr>
      <tr><td>Claude Console</td><td>facturation à l'usage de l'API avec des crédits prépayés</td></tr>
      <tr><td>Amazon Bedrock, Google Cloud, Microsoft Foundry</td><td>organisations qui ont un fournisseur cloud</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>La liste des comptes vient de la page sur l'authentification et du guide de démarrage de la documentation<b-proof href="https://code.claude.com/docs/en/quickstart" quote="Claude Code: «Claude Console (API access with pre-paid credits)» — code.claude.com/docs/en/quickstart"/>.</b-cap>

  Exemple du quotidien. Emma habite à Vienne et a acheté un abonnement Pro. Elle va dans le dossier du projet, lance <code>claude</code>, et le navigateur ouvre la page de connexion. Emma se connecte au même compte Claude que celui du chat. Le terminal affiche « Login successful », elle appuie sur Entrée et demande : « que fait ce projet ? ». Quelques secondes plus tard, l'agent décrit le projet. Plus tard, Emma veut savoir quel compte le programme utilise et tape <code>/status</code> ; pour changer de compte, elle utilise <code>/logout</code> et <code>/login</code>. L'Autriche figure dans la liste des pays d'Anthropic, la région n'est donc pas un obstacle.

  <b>L'abonnement du chat et Claude Code demandent-ils deux connexions distinctes ?</b> Non. Un abonnement Pro, Max ou Ultra est délivré à un compte claude.ai, et ce même compte ouvre Claude Code. Ils partagent une seule limite. Comment vérifier : après la connexion, tapez <code>/status</code> et regardez quelle méthode de connexion s'affiche.

  <b>Un compte Claude gratuit suffit-il ?</b> Non. Les prérequis de l'installation disent : « The free claude.ai plan does not include Claude Code access ». On ne peut se connecter à Claude Code que par une voie payante : un abonnement, Team, Enterprise, Console ou un fournisseur cloud. Comment vérifier : ouvrez la <a href="https://code.claude.com/docs/en/setup">page d'installation de Claude Code</a> et trouvez cette phrase dans les prérequis.
</b-chapter>

<b-chapter id="plans" title="Abonnements : ce qui est inclus et combien cela coûte" icon="coin">
  <b-why>Claude Code est inclus dans les abonnements payants Pro, Max, Ultra, Team et Enterprise, et n'est pas inclus dans le plan gratuit<b-proof href="https://claude.com/pricing" quote="Claude: Free «Claude Code: No», Pro «$20 if billed monthly», Ultra «10x Pro usage every week», Team premium seat «5x more usage than standard seats» — claude.com/pricing"/>. Les prix et le contenu viennent de claude.com/pricing. Date de vérification : 18.11.2026. Les abonnements changent : rouvrez la page des tarifs d'Anthropic avant de payer.</b-why>

  Un abonnement est une formule à prix mensuel fixe, avec sa propre quantité d'utilisation. Claude Code n'a pas de prix séparé : il vient avec l'abonnement, en même temps que Claude ordinaire dans le chat. Plus l'abonnement est élevé, plus vous pouvez dépenser d'utilisation dans une fenêtre de cinq heures et sur une semaine. Pro, Max et Ultra conviennent à une personne, les sièges Team à une équipe, et Enterprise à une entreprise sous contrat.
  <iso-art name="claude-code-install-and-price/plans-ladder"></iso-art>
  <b-cap>L'échelle des abonnements : Free sans Claude Code, puis Pro, Max, Ultra, les sièges Team standard et premium, Enterprise sous contrat.</b-cap>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>Abonnement</th><th>Prix par mois</th><th>Claude Code</th><th>Utilisation</th></tr>
    </thead>
    <tbody>
      <tr><td>Free</td><td>0 $</td><td>non</td><td>limitée</td></tr>
      <tr><td>Pro</td><td>20 $ en facturation mensuelle, 17 $ en facturation annuelle (200 $ payés d'avance)</td><td>oui</td><td>de base</td></tr>
      <tr><td>Max</td><td>100 $</td><td>oui</td><td>5 fois Pro</td></tr>
      <tr><td>Ultra</td><td>200 $</td><td>oui</td><td>10 fois Pro par semaine</td></tr>
      <tr><td>Team, siège standard</td><td>25 $ en mensuel, 20 $ en facturation annuelle</td><td>oui</td><td>comme dans l'abonnement du siège</td></tr>
      <tr><td>Team, siège premium</td><td>125 $ en mensuel, 100 $ en facturation annuelle</td><td>oui</td><td>5 fois un siège standard</td></tr>
      <tr><td>Enterprise</td><td>sur la page : 20 $ par siège et par mois en facturation annuelle, à partir de 20 sièges</td><td>oui</td><td>selon le contrat</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>Source : claude.com/pricing. Date de vérification : 18.11.2026.</b-cap>
  <b-sublabel top="18">Un exemple suivi</b-sublabel>

  Jonas habite à Vilnius et veut essayer Claude Code sur son propre projet. Il ouvre la page des tarifs et voit la mention « Claude Code: No » à côté de Free : l'option gratuite est écartée. Pro coûte 20 dollars par mois en facturation mensuelle, et cela suffit pour commencer. La facturation annuelle abaisse le prix à 17 dollars par mois, mais 200 dollars sont prélevés d'un coup, et Jonas n'est pas encore sûr d'utiliser l'agent chaque jour. Il choisit la facturation mensuelle. Pour vérifier votre propre cas, ouvrez la page des tarifs et trouvez la mention Claude Code sur la ligne de votre abonnement.

  <b-sublabel top="18">Limites</b-sublabel>

  Une limite est la quantité d'utilisation au-delà de laquelle l'abonnement vous demande d'attendre. Pro et Max en ont deux : une limite de session de cinq heures et une limite hebdomadaire<b-proof href="https://support.claude.com/en/articles/11145838-using-claude-code-with-your-pro-or-max-plan" quote="Claude Help Center: «Pro and Max plans have a five-hour session limit and a weekly limit» — support.claude.com"/>. Ultra a une limite hebdomadaire, et les comptes Ultra vérifiés n'ont pas de limite de cinq heures. La limite est partagée entre Claude dans le chat et Claude Code : si vous avez dépensé l'utilisation dans le chat, il en reste moins pour l'agent.
  <iso-art name="claude-code-install-and-price/limits"></iso-art>
  <b-cap>Deux fenêtres de dépense, de cinq heures et hebdomadaire ; une seule réserve d'utilisation pour le chat et Claude Code.</b-cap>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>Abonnement</th><th>Quelle limite</th></tr>
    </thead>
    <tbody>
      <tr><td>Pro et Max</td><td>une limite de session de cinq heures et une limite hebdomadaire</td></tr>
      <tr><td>Ultra</td><td>une limite hebdomadaire ; les comptes Ultra vérifiés n'ont pas de limite de cinq heures</td></tr>
      <tr><td>Tous les abonnements</td><td>la limite est partagée entre Claude dans le chat et Claude Code</td></tr>
    </tbody>
    </table>
  </b-ctx-table>

  Quand la limite est épuisée, vous pouvez activer une utilisation supplémentaire payée avec des crédits ou acheter des crédits d'API aux tarifs standard de l'API. Pour rester dans l'abonnement, refusez de payer avec des crédits. Une semaine plus tard, Jonas remarque que le soir l'agent lui demande d'attendre : le matin il a longuement parlé à Claude dans le chat, et l'utilisation partagée est déjà épuisée. Il décide de ne pas acheter de crédits et attend simplement la nouvelle fenêtre.

  <b-sublabel top="18">Une clé d'API à la place d'un abonnement</b-sublabel>

  Une clé d'API est un mot de passe pour programmes, avec lequel Claude Code paie chaque requête aux tarifs de l'API. Un abonnement a un prix fixe, alors qu'une clé se paie au volume. Si la variable <code>ANTHROPIC_API_KEY</code> est définie dans le système, Claude Code prend la clé à la place de l'abonnement. Pour Jonas, ce fut une surprise : la variable était restée d'un autre projet, et les dépenses sont parties aux tarifs de l'API alors que son abonnement était payé.
  <iso-art name="claude-code-install-and-price/api-vs-subscription"></iso-art>
  <b-cap>Deux façons de payer : un abonnement à prix fixe et une clé d'API payée au volume. La clé l'emporte sur l'abonnement.</b-cap>
  <b-finding>
    <ex>Si la variable <code>ANTHROPIC_API_KEY</code> est définie dans le système, Claude Code prend la clé à la place de l'abonnement, et les dépenses partent aux tarifs de l'API.</ex>
    <gen>Un abonnement a un prix fixe et des limites, une clé se paie au volume. Une clé est rentable quand la charge de travail est irrégulière ou qu'il faut une facture par projet.</gen>
    <do>Pour revenir à l'abonnement, supprimez la variable (<code>unset ANTHROPIC_API_KEY</code>) et vérifiez la méthode de connexion avec la commande <code>/status</code><b-proof href="https://code.claude.com/docs/en/authentication" quote="Claude Code: «Run unset ANTHROPIC_API_KEY to fall back to your subscription, and check /status to confirm which method is active» — code.claude.com/docs/en/authentication"/>.</do>
  </b-finding>

  Les prix par million de jetons selon le modèle ne sont pas donnés ici : je ne les ai pas vérifiés sur la page des tarifs le 18.11.2026.

  <b-sublabel top="18">Idées reçues fréquentes</b-sublabel>

  <b>Le plan gratuit donne-t-il Claude Code ?</b> Non. La documentation d'installation dit que Claude Code demande un compte Pro, Max, Ultra, Team, Enterprise ou Console, et que le plan gratuit de claude.ai n'inclut pas l'accès à Claude Code<b-proof href="https://code.claude.com/docs/en/setup" quote="Claude Code: «Claude Code requires a Pro, Max, Ultra, Team, Enterprise, or Console account. The free claude.ai plan does not include Claude Code access» — code.claude.com/docs/en/setup"/>. Comment vérifier : ouvrez la page des tarifs et trouvez la mention « Claude Code: No » à côté de Free.

  <b>Un abonnement payant lève-t-il la restriction régionale ?</b> Non. La liste des pays d'Anthropic s'applique à l'usage quels que soient l'abonnement et le mode de paiement<b-proof href="https://www.anthropic.com/supported-countries" quote="Anthropic: «Any country or region not listed is unsupported» — anthropic.com/supported-countries"/>. Comment vérifier : trouvez votre pays dans la liste sur la page d'Anthropic.

  <b>Une clé d'API coûte-t-elle moins cher qu'un abonnement ?</b> Cela dépend de la charge de travail. Un abonnement coûte une somme fixe, une clé facture l'argent au volume, et je n'ai pas vérifié les tarifs exacts sur la page des tarifs le 18.11.2026. Comment vérifier : comparez un mois de dépenses dans Console avec le prix de l'abonnement.
</b-chapter>
<b-chapter id="check" title="Comment vérifier que tout fonctionne" icon="check-circle">
  <b-why>Une installation qui fonctionne affiche un numéro de version avec la mention « (Claude Code) »<b-proof href="https://code.claude.com/docs/en/setup" quote="Claude Code: «A working installation prints a version number such as 2.1.211 (Claude Code)» — code.claude.com/docs/en/setup"/>. Viennent ensuite le diagnostic, la méthode de connexion et une première question sur le projet.</b-why>

  La vérification tient en cinq petites étapes, et chacune répond à sa propre question. La version montre que le programme est trouvé et démarre. Le diagnostic produit un rapport sur l'installation et les réglages sans ouvrir de session. Le statut dans une session dit comment vous êtes connecté : avec un abonnement ou avec une clé. Une question sur le projet teste toute la chaîne d'un coup : connexion, réseau et lecture des fichiers. La mise à jour montre que l'installation peut recevoir de nouvelles versions.
  <iso-art name="claude-code-install-and-price/check-ladder"></iso-art>
  <b-cap>L'échelle des vérifications : version, diagnostic, statut, question sur le projet, mise à jour.</b-cap>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>Vérification</th><th>Commande</th><th>Ce que vous devez voir</th></tr>
    </thead>
    <tbody>
      <tr><td>Version</td><td><code>claude --version</code></td><td>un numéro de version et « (Claude Code) »</td></tr>
      <tr><td>Diagnostic</td><td><code>claude doctor</code></td><td>un rapport sur l'installation et les réglages sans ouvrir de session</td></tr>
      <tr><td>Connexion</td><td><code>/status</code> dans une session</td><td>la méthode de connexion : abonnement ou clé</td></tr>
      <tr><td>Travail avec un projet</td><td>la question « que fait ce projet ? »</td><td>une courte description du projet</td></tr>
      <tr><td>Mise à jour</td><td><code>claude update</code></td><td>« Claude Code is up to date »</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-sublabel top="18">Un exemple suivi</b-sublabel>

  Sarah habite à Dublin et vient d'installer Claude Code sur son portable. Elle ouvre une nouvelle fenêtre de terminal et tape <code>claude --version</code>. Un numéro de version apparaît avec la mention « (Claude Code) » : le programme est donc trouvé. Puis elle lance <code>claude doctor</code> et obtient un rapport sur l'installation. Dans le dossier du projet elle lance <code>claude</code>, tape <code>/status</code> et voit qu'elle s'est connectée avec un abonnement, sans clé. La dernière étape est la question « que fait ce projet ? » : une courte description du projet signifie que toute la chaîne fonctionne. Vous pouvez le vérifier vous-même en cinq minutes en parcourant le tableau de haut en bas.

  <b-sublabel top="18">Une erreur fréquente</b-sublabel>

  S'arrêter à la version. Un numéro de version confirme seulement que le programme est trouvé dans le PATH. Il ne vérifie ni la connexion, ni le réseau, ni les droits sur les fichiers. Si la version s'affiche mais que la question sur le projet reste sans réponse, cherchez la cause du côté de la connexion : vérifiez <code>/status</code> et lancez <code>/login</code> si besoin.
</b-chapter>
<b-chapter id="errors" title="Erreurs d'installation fréquentes" icon="alert-circle">
  <b-why>La documentation a une solution pour chaque message d'erreur : le tableau « Find your error » sur la page « Troubleshoot installation and login »<b-proof href="https://code.claude.com/docs/en/troubleshoot-install" quote="Claude Code: the “Find your error” table gives a fix for each message — code.claude.com/docs/en/troubleshoot-install"/>. Date de vérification : 18.11.2026.</b-why>

  Une erreur d'installation se lit dans le texte du message : de lui on remonte à la cause, et de la cause à l'action. Le plus souvent la cause est simple : le dossier d'installation n'est pas dans le PATH (la liste des dossiers où le terminal cherche les programmes), la commande est prévue pour un autre shell, ou bien les droits ou la mémoire manquent. Les pays hors de la liste forment un cas à part : le tableau le décrit par les lignes sur 403 et « App unavailable in region ».
  <iso-art name="claude-code-install-and-price/install-errors"></iso-art>
  <b-cap>L'arbre des erreurs : ce que vous voyez, quelle est la cause, que faire.</b-cap>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>Ce que vous voyez</th><th>Cause</th><th>Que faire</th></tr>
    </thead>
    <tbody>
      <tr><td><code>command not found: claude</code> ou « 'claude' is not recognized »</td><td>le dossier d'installation n'est pas dans le PATH</td><td>ouvrir une nouvelle fenêtre de terminal ; sur macOS et Linux, ajouter <code>~/.local/bin</code> au PATH</td></tr>
      <tr><td><code>The token '&amp;&amp;' is not a valid statement separator</code></td><td>la commande CMD a été lancée dans PowerShell</td><td>prendre la commande <code>irm … | iex</code></td></tr>
      <tr><td><code>'irm' is not recognized</code></td><td>la commande PowerShell a été lancée dans CMD</td><td>prendre la commande <code>curl … install.cmd</code></td></tr>
      <tr><td><code>syntax error near unexpected token '&lt;'</code></td><td>une page web est arrivée à la place du script</td><td>vérifier le réseau et le proxy, ouvrir la section des solutions de la documentation</td></tr>
      <tr><td><code>curl: (22) … 403</code></td><td>un proxy ou un filtre bloque l'adresse, ou le pays est hors de la liste des pays pris en charge</td><td>vérifier le réseau ; pour la liste des pays et la marche à suivre, lire l'<a href="/blog/claude-code-access-regions-vpn-bans/">article sur l'accès par pays, les VPN et les bannissements</a></td></tr>
      <tr><td><code>EACCES: permission denied</code></td><td>pas de droits sur le dossier d'installation</td><td>corriger les permissions du dossier, ne pas utiliser <code>sudo</code></td></tr>
      <tr><td><code>TLS connect error</code></td><td>certificats périmés ou proxy qui inspecte le trafic</td><td>mettre à jour les certificats du système</td></tr>
      <tr><td><code>Killed</code> pendant l'installation sous Linux</td><td>mémoire insuffisante</td><td>libérer de la mémoire ou ajouter du swap</td></tr>
      <tr><td><code>App unavailable in region</code></td><td>Claude Code n'est pas disponible dans le pays</td><td>vérifier la liste des pays pris en charge : <a href="/blog/claude-code-access-regions-vpn-bans/">Claude Code indisponible dans votre pays : pays pris en charge, VPN et bannissements</a></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-sublabel top="18">Un exemple suivi</b-sublabel>

  Mateus habite à São Paulo et a installé Claude Code sur un Mac avec une seule commande. L'installateur a terminé, mais le terminal affiche « command not found: claude ». Il pense que l'installation est cassée et veut la relancer. D'abord il ouvre une nouvelle fenêtre de terminal : l'ancienne ne connaît pas le nouveau dossier. Si le message reste, la cause est le PATH, et il doit ajouter <code>~/.local/bin</code> au fichier de réglages de zsh, puis rouvrir la fenêtre (la commande est dans le bloc de code). Après cela, <code>claude --version</code> affiche une version. Pour vérifier que vous avez fait la même chose, regardez la sortie de <code>claude --version</code>.

  <b-sublabel top="18">PATH sur macOS avec zsh</b-sublabel>
  <b-codebox title="Ajouter le dossier au PATH" copy>
    echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
  </b-codebox>

  Pour bash, <code>~/.bashrc</code> convient à la place de <code>~/.zshrc</code>. Après la modification, ouvrez une nouvelle fenêtre de terminal<b-proof href="https://code.claude.com/docs/en/troubleshoot-install" quote="Claude Code: «echo 'export PATH=&quot;$HOME/.local/bin:$PATH&quot;' >> ~/.zshrc» — code.claude.com/docs/en/troubleshoot-install"/>.

  <b-sublabel top="18">Idées reçues fréquentes</b-sublabel>

  <b>Si claude est introuvable, l'installateur a-t-il échoué ?</b> Le plus souvent il a fonctionné, et le terminal ne connaît pas le nouveau dossier : dans le tableau, c'est la ligne du PATH avec la solution « ouvrir une nouvelle fenêtre de terminal ». Comment vérifier : ouvrez une nouvelle fenêtre et répétez <code>claude --version</code>.

  <b>Changer de réseau guérit-il toujours l'erreur 403 ?</b> Non. Dans le tableau, le 403 a deux causes : un proxy ou un filtre, ou un pays hors de la liste des pays pris en charge. Dans le second cas, le réseau n'y changera rien, et il faut regarder la liste des pays d'Anthropic.

  <b>Faut-il corriger EACCES avec sudo ?</b> Non. Le tableau donne comme solution la correction des permissions du dossier et dit de ne pas utiliser <code>sudo</code>.
</b-chapter>
<b-chapter id="region" title="Accès depuis la Russie" icon="flag">
  <b-why>La Russie ne figure pas sur la liste officielle des pays pris en charge par Anthropic, et les conditions citent Claude Code parmi les produits disponibles uniquement dans les pays de la liste. Date de vérification : 18.11.2026. Les conditions sont entrées en vigueur le 12.11.2026<b-proof href="https://www.anthropic.com/supported-countries" quote="Anthropic: «Any country or region not listed is unsupported» — anthropic.com/supported-countries"/>.</b-why>

  La liste des pays est un document d'Anthropic qui nomme les endroits où Claude peut être utilisé. Tout pays ou région absent de la liste est considéré comme non pris en charge. La liste ne contient aucune entrée « Russia » : l'installation et la connexion depuis la Russie ne sont donc pas prises en charge. Anthropic n'en donne pas les raisons. Je suppose qu'elles tiennent à la politique des États-Unis et d'autres pays : sanctions, restrictions à l'exportation et lois. C'est une supposition, et les documents de l'entreprise ne contiennent pas cette explication.
  <iso-art name="claude-code-access-regions-vpn-bans/world-map"></iso-art>
  <b-cap>Une carte des pays où Anthropic prend en charge Claude Code, et des pays hors de la liste.</b-cap>

  À l'installation, cela se voit par le message « App unavailable in region » et par une erreur 403 au téléchargement : les deux lignes figurent dans le tableau des erreurs. Un abonnement payant ne lève pas la restriction : la liste s'applique à un abonnement payant comme à une clé d'API. Ce que signifie la restriction, comment lire les entrées avec parenthèses et ce qu'il est légal de faire si votre pays ne figure pas sur la liste, un article séparé le détaille.
  <b-links cols="1">
    <item href="/blog/claude-code-access-regions-vpn-bans/" k="En détail" t="Claude Code indisponible dans votre pays : pays pris en charge, VPN et bannissements">Ce que signifie la restriction et que faire</item>
  </b-links>
</b-chapter>
<b-chapter id="alt" title="Alternatives à Claude Code" icon="grid">
  <b-why>Les alternatives font la même chose que Claude Code : elles lisent un projet, modifient des fichiers et lancent des commandes. Elles diffèrent par le modèle, le prix et le lieu de travail. Chacune a ses propres conditions d'accès, que vous vérifiez sur le site du programme.</b-why>

  Une alternative est un autre agent de programmation : il travaille dans un terminal ou dans un éditeur et modifie les fichiers du projet à votre demande. On en choisit un avec trois questions. Quel modèle y tourne ? Où travaille-t-il : dans un terminal, dans une application ou dans un éditeur ? Comment le paie-t-on ? Chaque agent a une description dans le glossaire du site ; les faits sur Gemini CLI et Antigravity CLI viennent de leurs articles, qui donnent aussi les dates.
  <iso-art name="claude-code-install-and-price/alternatives-map"></iso-art>
  <b-cap>Une carte des alternatives : OpenCode, Codex, Cursor, Gemini CLI et son successeur Antigravity CLI.</b-cap>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>Agent</th><th>De qui, sur quel modèle</th><th>Où il travaille</th></tr>
    </thead>
    <tbody>
      <tr><td>OpenCode</td><td>un agent ouvert, vous choisissez le modèle : Claude, GPT, Gemini et d'autres via une API ou en local ; vous payez le fournisseur du modèle</td><td>terminal, application, web</td></tr>
      <tr><td>Codex</td><td>OpenAI, modèles GPT</td><td>ChatGPT, application, terminal, IDE</td></tr>
      <tr><td>Cursor</td><td>Anysphere, un éditeur basé sur VS Code avec un agent intégré ; ses propres modèles et ceux d'autres entreprises</td><td>éditeur</td></tr>
      <tr><td>Gemini CLI</td><td>Google, modèles Gemini ; a cessé de fonctionner pour les utilisateurs ordinaires le 18 juin 2026</td><td>terminal</td></tr>
      <tr><td>Antigravity CLI</td><td>Google ; Gemini CLI y a été transféré</td><td>terminal, application Antigravity</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-sublabel top="18">Comment choisir</b-sublabel>

  Si vous voulez votre propre modèle et un paiement direct au fournisseur, regardez OpenCode. Si vous payez déjà ChatGPT, regardez Codex. Si vous préférez travailler dans un éditeur plutôt que dans un terminal, regardez Cursor. Si vous utilisiez Gemini CLI, Antigravity CLI a pris sa place. Les commandes d'installation des alternatives ne sont pas données ici : chacune a la sienne et elles changent. Vous les trouverez sur le site du programme lui-même.
  <b-links cols="2">
    <item href="/materials/glossary/opencode/" k="Terme" t="OpenCode">Un agent ouvert pour le terminal</item>
    <item href="/materials/glossary/codex/" k="Terme" t="Codex">L'agent d'OpenAI</item>
    <item href="/materials/glossary/cursor/" k="Terme" t="Cursor">Un éditeur avec un agent</item>
    <item href="/materials/glossary/gemini-cli/" k="Terme" t="Gemini CLI">L'agent de Google dans le terminal</item>
    <item href="/materials/glossary/antigravity-cli/" k="Terme" t="Antigravity CLI">Le successeur de Gemini CLI</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="Comparaison" t="Codex ou Claude Code, Cursor ou Hermes Agent : comparatif des agents IA de programmation">Quel agent pour quelle tâche</item>
    <item href="/blog/codex-or-chatgpt-what-to-choose/" k="Choix" t="Codex ou ChatGPT">Un chat ou un agent de programmation</item>
  </b-links>
</b-chapter>
<b-chapter id="prompts" title="Requêtes prêtes à l'emploi pour l'agent" icon="chat">
  <b-why>Quatre requêtes pour la première session. Collez-les dans Claude Code après avoir lancé <code>claude</code> dans le dossier du projet.</b-why>

  Les requêtes vont par ordre croissant : d'abord l'agent lit et raconte seulement, puis il crée un fichier de règles, puis il fait une petite modification, et à la fin il lance les tests. Chaque requête demande de montrer le résultat avant d'écrire ou de laisser les fichiers intacts, la première session reste donc sûre.
  <b-codebox title="1. Découvrir le projet" copy>
    Que fait ce projet ? Quelles technologies utilise-t-il et où se trouve le point d'entrée principal ? Réponds par une liste de cinq points.
  </b-codebox>
  <b-codebox title="2. Règles du projet" copy>
    Lis le projet et crée un fichier CLAUDE.md : commandes de build et de test, structure des dossiers, ce qu'il ne faut pas toucher. Montre-moi le texte avant d'écrire.
  </b-codebox>
  <b-codebox title="3. Une petite modification" copy>
    Ajoute au README une section « Installation » avec les commandes de package.json. Montre-moi la modification et attends ma confirmation.
  </b-codebox>
  <b-codebox title="4. Vérifier que ça fonctionne" copy>
    Lance les tests du projet et liste ceux qui échouent. Propose une cause pour chacun, mais ne modifie encore aucun fichier.
  </b-codebox>
  <b-links cols="1">
    <item href="/materials/glossary/claude-md/" k="Terme" t="CLAUDE.md">Le fichier de règles du projet que Claude Code lit à chaque session</item>
  </b-links>
</b-chapter>
<b-chapter id="faq" icon="chat" title="Questions fréquentes">
  <b-faq-cards>
    <q t="Comment installer Claude Code ?">Ouvrez un terminal et lancez une commande : sur macOS, Linux et WSL, curl -fsSL https://claude.ai/install.sh | bash ; sous Windows dans PowerShell, irm https://claude.ai/install.ps1 | iex. Ouvrez ensuite une nouvelle fenêtre de terminal, vérifiez claude --version et lancez claude dans le dossier du projet. Source : code.claude.com/docs/en/setup. Date de vérification : 18.11.2026.</q>
    <q t="Combien coûte Claude Code ?">Il n'y a pas de prix séparé : Claude Code est inclus dans les abonnements. Au 18.11.2026, Pro coûte 20 dollars par mois en facturation mensuelle, Max 100, Ultra 200, un siège Team 25 ; le plan gratuit n'inclut pas Claude Code. L'alternative à l'abonnement est le paiement à l'API via Console. Source : claude.com/pricing.</q>
    <q t="Claude Code fonctionne-t-il en Russie ?">La Russie ne figure pas sur la liste officielle des pays pris en charge par Anthropic, et les conditions citent Claude Code parmi les produits disponibles uniquement dans les pays de la liste. Tout pays hors de la liste est considéré comme non pris en charge. Les conditions sont entrées en vigueur le 12.11.2026. Source : anthropic.com/supported-countries. Date de vérification : 18.11.2026. Plus de détails dans l'<a href="/blog/claude-code-access-regions-vpn-bans/">article sur l'accès par pays, les VPN et les bannissements</a>.</q>
    <q t="Que peut remplacer Claude Code ?">Des agents semblables : OpenCode avec le modèle de votre choix, Codex d'OpenAI, l'éditeur Cursor avec un agent intégré, et chez Google Antigravity CLI à la place de Gemini CLI, fermé aux utilisateurs ordinaires. L'accès et les prix diffèrent pour chacun, et vous les vérifiez sur le site du programme.</q>
    <q t="Claude Code est-il dans le plan gratuit ?">Non. Claude Code demande un compte Pro, Max, Ultra, Team, Enterprise ou Console ; le plan gratuit de claude.ai n'inclut pas l'accès à Claude Code. Source : code.claude.com/docs/en/setup.</q>
    <q t="Comment savoir si Claude Code s'est connecté avec un abonnement ou une clé ?">Lancez claude dans le dossier du projet et tapez /status : la commande affiche la méthode de connexion active. Si la variable ANTHROPIC_API_KEY est définie dans le système, Claude Code prend la clé à la place de l'abonnement ; pour revenir à l'abonnement, lancez unset ANTHROPIC_API_KEY. Source : code.claude.com/docs/en/authentication.</q>
  </b-faq-cards>
</b-chapter>
<b-chapter id="next" title="À lire ensuite">
  <b-links cols="2">
    <item href="/blog/claude-code-access-regions-vpn-bans/" k="Accès" t="Claude Code indisponible dans votre pays : pays pris en charge, VPN et bannissements">Ce que signifie la restriction par pays</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="Comparaison" t="Codex ou Claude Code, Cursor ou Hermes Agent : comparatif des agents IA de programmation">Quel agent pour quelle tâche</item>
    <item href="/blog/specs-rules-skills/" k="Contexte" t="Que sont AGENTS.md et CLAUDE.md : un exemple de fichier et où garder les spécifications, les règles et les skills">Les fichiers de règles pour l'agent</item>
    <item href="/blog/cursor-rules-vs-agents-md/" k="Règles" t="Cursor rules vs AGENTS.md : quoi mettre où">Quoi mettre où</item>
    <item href="/blog/harness-driven-development/" k="Méthode" t="Harness engineering en pratique : transformer les erreurs d’un agent IA en règles de son environnement (HDD)">L'erreur d'un agent devient une règle</item>
  </b-links>
</b-chapter>
<b-footer>D'après la documentation de Claude Code, claude.com/pricing, le centre d'aide de Claude et les conditions d'accès d'Anthropic. Date de vérification : 18.11.2026. Les prix et la liste des pays changent.</b-footer>
</b-post>
