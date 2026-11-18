---
title: Codex ou ChatGPT : lequel choisir pour travailler avec du code
seoTitle: Codex ou ChatGPT : lequel choisir pour le code (2026)
date: 2026-11-17
updated: 2026-11-18
description: Le chat répond par du texte, l'agent Codex modifie le projet et lance les tests. Quand choisir chacun : tableau, formules, requêtes prêtes, questions.
tags: IA, Codex, ChatGPT, agent, harness, Claude Code, Cursor
category: harness
layout: wide
mentions: Codex, ChatGPT, Claude Code, Cursor, AGENTS.md
toc: answer=Réponse rapide | modes=Trois modes | table=Côte à côte | plans=Formule et limites | pick=Quand prendre quoi | start=Pour commencer | faq=Questions | next=Pour aller plus loin
---

Codex ou ChatGPT : lequel choisir dépend de la tâche. ChatGPT répond par du texte : il explique, rédige, analyse un extrait collé. Codex travaille dans le projet : il lit le code, modifie les fichiers, lance les tests et prépare une pull request. Pour une question, prenez le chat ; pour modifier un dépôt, Codex, inclus dans les formules ChatGPT.

<b-post series="prompts">
<b-chapter id="answer" title="Réponse rapide" icon="crosshair">
  <b-why>Dans l'aide d'OpenAI, ChatGPT est divisé en modes Chat, Work et Codex ; on choisit Codex pour les vues de développeur et le détail technique<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: «Select Codex when you want developer views or more technical detail, especially for software development» — learn.chatgpt.com/docs/use-chatgpt"/>.</b-why>

  <iso-art name="codex-or-chatgpt-what-to-choose/chat-vs-agent"></iso-art>
  <b-cap>À gauche, un chat : vous collez du code, recevez du texte et le reportez à la main. À droite, un agent : il ouvre le projet, le modifie et vérifie le résultat lui-même.</b-cap>
  <b-sublabel top="18">Ce que cela signifie en termes simples</b-sublabel>

  ChatGPT est l'application d'OpenAI où l'on parle à un modèle dans trois modes : Chat, Work et Codex. Un chat ne voit que ce que vous y avez collé et répond par du texte. Un agent pour les programmes, et Codex en est un, ouvre lui-même les fichiers de votre projet, les modifie et vérifie le résultat par des commandes. Une pull request est une proposition d'intégrer des changements dans la branche principale du projet : des collègues la relisent, puis l'acceptent ou la renvoient pour correction. Le modèle est le même dans tous les modes, de la famille GPT ; le choix se fait donc selon l'accès au projet et selon ce que vous voulez obtenir à la fin.

  Un exemple du quotidien. Timur habite à Almaty et entretient une boutique en ligne. Le matin, il colle dans le chat une fonction inconnue et demande comment elle calcule la remise : la réponse arrive en texte, cela suffit. L'après-midi, il doit corriger un test qui échoue. Il ouvre Codex, nomme le test et demande de lancer toutes les vérifications après la correction. L'agent trouve le fichier, le modifie, lance les tests et montre la liste des changements. Une question, une correction : deux modes dans la même journée.

  Une erreur fréquente consiste à demander au chat de corriger un dépôt. Le chat renvoie un morceau de code, et c'est à vous de le placer dans les bons fichiers et de lancer les tests. Si vous remarquez que vous reportez des réponses dans le projet à la main, encore et encore, la tâche relève de Codex. L'erreur inverse : lancer un agent pour une question du type « comment ça marche ». Pour expliquer, le chat suffit, et aucune modification du projet n'est nécessaire.

  Une question posée à vous-même permet de vérifier le choix : après la réponse, dois-je modifier des fichiers et lancer quelque chose ? Si oui, prenez Codex ; si vous n'avez besoin que d'une réponse, le chat.
</b-chapter>
<b-chapter id="modes" title="Trois modes de ChatGPT" icon="layers">
  <b-why>L'aide d'OpenAI décrit chaque mode en une ligne : Chat pour une question ou un échange, Work pour une tâche plus grande menée jusqu'à un résultat vérifiable, Codex pour le développement<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: «Use Chat for a question or back-and-forth» — learn.chatgpt.com/docs/use-chatgpt"/>.</b-why>

  Un mode est une manière de travailler avec le même modèle : il détermine ce que vous obtenez à la fin et l'accès que reçoit ChatGPT. Les trois modes se trouvent dans la même application et partagent la formule.
  <iso-art name="codex-or-chatgpt-what-to-choose/three-modes"></iso-art>
  <b-cap>Ce que produit chaque mode : Chat donne du texte, Work un document ou un tableau terminé, Codex des modifications de code, le résultat des tests et une pull request.</b-cap>
  <b-sublabel top="18">Une situation de bout en bout</b-sublabel>

  Nadia habite à Berlin et gère un petit service de prise de rendez-vous. En une seule journée, il lui faut les trois modes. Le matin, elle demande en quoi deux façons de stocker l'heure dans une base diffèrent : c'est Chat. L'après-midi, il lui faut un bilan du mois pour un client : elle active Work et obtient un document terminé. Le soir, elle doit corriger le calcul de la durée d'un rendez-vous et le vérifier par des tests : c'est Codex. Nadia est arrivée à chaque mode à partir du résultat qu'elle voulait obtenir.

  <b-sublabel top="18">Chat : une question et un échange</b-sublabel>

  Chat est le mode pour une question ou une conversation avec des retours en arrière. L'aide d'OpenAI donne des exemples : idées, brouillons, résumés de fichiers. Le travail avec du code convient aussi, si vous devez comprendre un extrait ou une erreur : vous collez le texte et recevez une explication. Le résultat est toujours du texte. Exemple : Nadia a collé un message d'erreur tiré d'un journal et a demandé ce qu'il signifiait.

  <b-sublabel top="18">Work : une grande tâche jusqu'au résultat</b-sublabel>

  En mode Work, ChatGPT prend en charge une tâche plus grande et la mène jusqu'à un résultat que l'on peut vérifier. On active ce mode dans le sélecteur. À la sortie, un document, un tableau ou une recherche terminés. Sur le web, il s'exécute dans un cloud géré<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: «ChatGPT Work runs in a managed cloud environment» — learn.chatgpt.com/docs/use-chatgpt"/>. Exemple : Nadia a demandé un bilan pour le client et a reçu un document qu'il restait à relire et à envoyer.

  <b-sublabel top="18">Codex : des modifications dans le projet</b-sublabel>

  Codex est le mode pour le développement : détail technique et vues d'ingénieur. Il lit lui-même le dépôt, modifie les fichiers, lance les tests et prépare une pull request. Si vous voulez un schéma de la notion, il se trouve dans le glossaire.
  <iso-art name="term:codex"></iso-art>

  Exemple : Nadia a nommé le test qui échoue et a limité la modification à un seul dossier. Quelques minutes plus tard, elle avait la liste des changements et le résultat de l'exécution. Les restrictions régionales de Codex ne sont pas traitées dans cet article : elles font l'objet d'<a href="/blog/codex-access-regions-vpn-bans/">un article distinct sur l'accès à Codex</a>.

  <b-sublabel top="18">Où s'ouvre chaque mode</b-sublabel>

  Chat s'ouvre sur le site et dans l'application mobile<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: Chat is available on the web and mobile — learn.chatgpt.com/docs/use-chatgpt"/>. Work fonctionne sur le site, dans un cloud géré, et dans l'application de bureau. Codex se choisit dans l'application de bureau ; OpenAI cite le terminal, l'extension pour IDE et le cloud parmi les endroits où Codex s'exécute<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: Codex is selected in the desktop app; places include CLI, IDE extension, Cloud — learn.chatgpt.com/docs/use-chatgpt"/>. Un tiret sur le schéma signifie que l'aide ne nomme aucun endroit de ce type pour ce mode.
  <iso-art name="codex-or-chatgpt-what-to-choose/where-to-open"></iso-art>
  <b-cap>Les endroits où s'ouvre chaque mode. Le terminal et l'extension pour IDE ne sont nommés que pour Codex.</b-cap>
</b-chapter>
<b-chapter id="table" title="Codex et ChatGPT côte à côte" icon="table-grid">
  <b-why>Les lignes viennent de l'aide d'OpenAI sur les modes et les formules ; la source est indiquée à côté de chaque affirmation. Date de vérification : 18.11.2026.</b-why>

  David habite à Tbilissi et choisit par où commencer dans une équipe de trois personnes. Il prend le tableau récapitulatif comme aide-mémoire : il parcourt les lignes « pour quoi », « résultat » et « voit le projet » et constate vite qu'un chat ne remplace pas un agent dans un dépôt. Pour vérifier le tableau vous-même, deux pages d'OpenAI suffisent : l'aide sur les modes et l'aide sur les formules.
  <b-sublabel top="18">Comment fonctionne Codex</b-sublabel>

  Le travail de Codex est une boucle de plusieurs étapes. L'agent lit le projet, modifie les fichiers, lance les tests et montre un diff, c'est-à-dire la liste des changements ligne par ligne. Si les tests échouent, il revient à la modification. À la sortie, une pull request qu'une personne relit. L'agent prend les instructions du projet dans le fichier AGENTS.md : les commandes de build et les interdictions gagnent à y être consignées.
  <iso-art name="codex-or-chatgpt-what-to-choose/codex-loop"></iso-art>
  <b-cap>La boucle de Codex : il lit, modifie, lance les tests et recommence la modification en cas d'échec ; une personne relit le diff et la pull request.</b-cap>
  <b-sublabel top="18">Tableau récapitulatif</b-sublabel>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th></th><th>ChatGPT Chat</th><th>ChatGPT Work</th><th>Codex</th></tr>
    </thead>
    <tbody>
      <tr><td>Pour quoi</td><td>une question et un échange : idées, brouillons, résumés de fichiers<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: «Use Chat for a question or back-and-forth» — learn.chatgpt.com/docs/use-chatgpt"/></td><td>une grande tâche menée jusqu'à un résultat vérifiable<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: «carry a larger task through to a reviewable result» — learn.chatgpt.com/docs/use-chatgpt"/></td><td>développement : détail technique et vues d'ingénieur<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: Codex is the mode for technical detail in the mode table — learn.chatgpt.com/docs/use-chatgpt"/></td></tr>
      <tr><td>Résultat</td><td>du texte</td><td>un livrable terminé : document, tableau, recherche</td><td>modifications de code, résultat des tests, pull request</td></tr>
      <tr><td>Voit le projet</td><td>seulement ce que vous collez</td><td>ce à quoi vous donnez accès</td><td>lit le dépôt lui-même</td></tr>
      <tr><td>Où l'ouvrir</td><td>site et application mobile<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: Chat is available on the web and mobile — learn.chatgpt.com/docs/use-chatgpt"/></td><td>site et application de bureau ; sur le web, il s'exécute dans un cloud géré<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: «ChatGPT Work runs in a managed cloud environment» — learn.chatgpt.com/docs/use-chatgpt"/></td><td>application de bureau, terminal, extension pour IDE, cloud<b-proof href="https://learn.chatgpt.com/docs/use-chatgpt" quote="OpenAI: Codex is selected in the desktop app; places include CLI, IDE extension, Cloud — learn.chatgpt.com/docs/use-chatgpt"/></td></tr>
      <tr><td>Formule</td><td colspan="3">Work et Codex sont inclus dans Free, Go, Plus, Pro, Business, Edu et Enterprise ; aucun paiement séparé<b-proof href="https://learn.chatgpt.com/docs/pricing" quote="OpenAI: «ChatGPT Work and Codex are included in your ChatGPT Free, Go, Plus, Pro, Business, Edu, or Enterprise plan» — learn.chatgpt.com/docs/pricing"/></td></tr>
      <tr><td>Limites</td><td colspan="3">dépendent de la formule ; sur Free et Go, Codex est prévu pour des tâches légères, et Plus coûte 20 dollars par mois<b-proof href="https://learn.chatgpt.com/docs/pricing" quote="OpenAI: Free — quick coding tasks, Go — lightweight tasks, Plus — $20/month — learn.chatgpt.com/docs/pricing"/></td></tr>
      <tr><td>Avec une clé d'API</td><td>—</td><td>—</td><td>terminal, SDK et IDE sont facturés aux tarifs de l'API ; les fonctions cloud, comme la revue de code sur GitHub, n'en font pas partie<b-proof href="https://learn.chatgpt.com/docs/pricing" quote="OpenAI: an API key lets you use Codex in the CLI, SDK or IDE at API rates; cloud features not included — learn.chatgpt.com/docs/pricing"/></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>Le modèle des trois modes est de la famille GPT ; ce qui diffère, c'est l'accès au projet et le type de résultat.</b-cap>
</b-chapter>
<b-chapter id="plans" title="Formule et limites" icon="card">
  <b-why>Work et Codex ne se vendent pas séparément : ils sont inclus dans les formules ChatGPT<b-proof href="https://learn.chatgpt.com/docs/pricing" quote="OpenAI: «ChatGPT Work and Codex are included in your ChatGPT Free, Go, Plus, Pro, Business, Edu, or Enterprise plan» — learn.chatgpt.com/docs/pricing"/>.</b-why>

  La formule est ce que vous payez à ChatGPT, et une seule formule ouvre les trois modes. Les formules se distinguent par leurs limites : combien de travail avec Codex tient dans votre formule. Sur Free et Go, il est prévu pour des tâches légères et rapides, et Plus coûte 20 dollars par mois<b-proof href="https://learn.chatgpt.com/docs/pricing" quote="OpenAI: Free — quick coding tasks, Go — lightweight tasks, Plus — $20/month — learn.chatgpt.com/docs/pricing"/>. Cet article ne donne pas de chiffres exacts pour les limites : je ne les ai pas trouvés, et ils dépendent de la formule.
  <iso-art name="codex-or-chatgpt-what-to-choose/one-subscription"></iso-art>
  <b-cap>Une formule ouvre trois modes. Les limites dépendent de la formule.</b-cap>
  <b-sublabel top="18">Une situation de bout en bout</b-sublabel>

  Lina habite à Varsovie et écrit des scripts pour un cabinet comptable. Elle ouvre la page des formules d'OpenAI et voit que Codex est inclus même dans la formule gratuite, mais prévu pour des tâches rapides. Pour sa première semaine, cela suffit : elle corrige un script et constate que l'approche fonctionne. Quand les tâches se multiplient, elle passe à Plus pour 20 dollars par mois. Vous pouvez vérifier votre propre formule sur la page des formules d'OpenAI : elle nomme la ligne sur Codex pour chaque formule.

  <b-sublabel top="18">Travailler avec une clé d'API</b-sublabel>

  Une clé d'API est un mot de passe pour programmes : il permet à un programme d'appeler un modèle sans abonnement ; le paiement se fait aux tarifs de l'API, selon l'usage réel. Avec une telle clé, Codex fonctionne dans le terminal (CLI), dans le SDK et dans l'extension pour IDE. Les fonctions cloud, comme la revue de code sur GitHub, ne sont pas incluses dans ce mode<b-proof href="https://learn.chatgpt.com/docs/pricing" quote="OpenAI: an API key lets you use Codex in the CLI, SDK or IDE at API rates; cloud features not included — learn.chatgpt.com/docs/pricing"/>.
  <iso-art name="codex-or-chatgpt-what-to-choose/api-key-mode"></iso-art>
  <b-cap>Clé d'API : paiement aux tarifs de l'API ; le terminal, le SDK et l'IDE fonctionnent, les fonctions cloud non.</b-cap>
  <b-sublabel top="18">Idées reçues fréquentes</b-sublabel>

  <b>Codex se paie-t-il à part ?</b> Non. Il est inclus dans les formules ChatGPT Free, Go, Plus, Pro, Business, Edu et Enterprise, sans paiement séparé. Comment vérifier : ouvrir l'<a href="https://learn.chatgpt.com/docs/pricing">aide d'OpenAI sur les formules</a> et trouver la ligne « included in your ChatGPT … plan ».

  <b>Une clé d'API donne-t-elle tout ce que donne un abonnement ?</b> Non. Le terminal, le SDK et l'extension pour IDE fonctionnent avec une clé, les fonctions cloud n'en font pas partie, et le paiement se fait aux tarifs de l'API. Comment vérifier : lire le paragraphe sur la clé d'API dans la même aide sur les formules.

  <b>Codex est-il indisponible sur la formule gratuite ?</b> Il est disponible : il est inclus dans Free, mais prévu pour des tâches rapides sur le code. Combien de telles tâches tiennent dans la limite, je ne l'ai pas trouvé dans l'aide.
</b-chapter>
<b-chapter id="pick" title="Quand prendre quoi" icon="crosshair">
  <b-why>On choisit pour chaque tâche : les modes partagent un seul abonnement, il n'y a donc pas à en retenir un pour tout le projet.</b-why>

  Commencez par vous demander ce que vous voulez à la fin : une explication, un document, ou un projet modifié et vérifié. La réponse détermine le mode.
  <iso-art name="codex-or-chatgpt-what-to-choose/pick-tree"></iso-art>
  <b-cap>Arbre de décision : de ce qu'il faut obtenir vers le mode.</b-cap>
  <b-sublabel top="18">Tableau de choix</b-sublabel>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>Situation</th><th>Que prendre</th><th>Pourquoi</th></tr>
    </thead>
    <tbody>
      <tr><td>Comprendre l'extrait de code de quelqu'un d'autre ou une erreur d'un journal</td><td>ChatGPT Chat</td><td>il suffit de coller le texte pour obtenir une explication</td></tr>
      <tr><td>Corriger un bogue dans un dépôt et vérifier par des tests</td><td>Codex</td><td>trouve lui-même le fichier, le modifie et lance les tests</td></tr>
      <tr><td>Rédiger une lettre, un cahier des charges, un bilan ou une présentation</td><td>ChatGPT Work</td><td>le résultat est un document, sans code</td></tr>
      <tr><td>Une grosse modification sur plusieurs fichiers, une pull request est nécessaire</td><td>Codex dans le cloud ou dans le terminal</td><td>la tâche s'exécute dans un bac à sable séparé, et le résultat est un ensemble de modifications à relire</td></tr>
      <tr><td>Il vous faut un autre modèle ou un travail dans l'éditeur</td><td><a href="/blog/ai-in-code-harness-and-tools/">Claude Code ou Cursor</a></td><td>Claude Code fonctionne avec les modèles Claude, Cursor connecte des modèles de différentes entreprises</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-sublabel top="18">Trois situations</b-sublabel>

  Oscar habite à Helsinki et a reçu des journaux une erreur qu'il ne reconnaît pas. Il colle le message dans le chat et, une minute plus tard, sait de quelle erreur il s'agit. Il n'y a rien à modifier dans le projet : Chat. Irma, à Tallinn, prépare pour la direction un bilan du projet : il lui faut un document et aucun code, alors elle active Work. Pavel, à Prague, doit corriger le calcul de la livraison dans quatre fichiers et joindre une pull request : il confie la tâche à Codex dans le cloud et reçoit des modifications à relire. Chacun a choisi le mode d'après le résultat attendu à la fin.

  Si vous devez reporter une réponse dans le code à la main plus de deux fois, confiez la tâche à Codex. Si vous avez besoin d'un autre modèle ou d'un travail dans l'éditeur : Claude Code fonctionne avec les modèles Claude, Cursor connecte des modèles de différentes entreprises, et <a href="/blog/ai-in-code-harness-and-tools/">la comparaison de ces agents</a> fait l'objet d'un article distinct.
</b-chapter>
<b-chapter id="start" title="Pour commencer" icon="zap">
  <b-why>Trois requêtes prêtes : chacune nomme l'objectif, l'endroit et la façon de vérifier. Un agent ne sait pas ce qui compte comme terminé tant qu'on ne le lui dit pas.</b-why>

  Yana habite à Bratislava et lance Codex pour la première fois sur un projet de travail. Elle monte une échelle : d'abord elle demande de lire et de lancer les tests sans rien changer, ensuite de corriger un test, puis de préparer une pull request. À chaque marche, elle vérifie le résultat avant de passer à la suivante.
  <iso-art name="codex-or-chatgpt-what-to-choose/start-ladder"></iso-art>
  <b-cap>Trois marches : lire et lancer, une modification, une pull request.</b-cap>
  <b-sublabel top="18">Trois requêtes pour l'agent</b-sublabel>
  <b-codebox>
    Lis README et AGENTS.md. Dis-moi comment on lance les tests et lance-les sans rien modifier. Montre ceux qui échouent.
    Corrige le test qui échoue dans tests/orders.test.ts. Modifie uniquement src/orders/. Après la correction, lance tous les tests et montre le diff.
    Prépare une pull request à partir de ces modifications : un titre court, ce qui a changé et comment vérifier.
  </b-codebox>
  <b-sublabel top="18">Pourquoi la première requête ne change rien</b-sublabel>

  La première requête vérifie que l'agent trouve et lance les tests. Si les tests se lancent, l'agent peut ensuite se vérifier lui-même. S'ils ne se lancent pas, une modification à l'aveugle ne mène nulle part : l'agent ne saura pas s'il a corrigé le test. Commencez donc par une requête de lecture et d'exécution, et n'autorisez les modifications qu'ensuite.

  <b-sublabel top="18">AGENTS.md</b-sublabel>

  AGENTS.md est un fichier d'instructions pour l'agent, que Codex lit au début du travail. On y consigne les commandes de build et de lancement des tests, les dossiers à ne pas toucher et les règles de style. Plus le fichier est précis, moins l'agent devine. Comment vérifier : dans la première requête, demander à l'agent de raconter comment on lance les tests, et comparer avec le fichier.
</b-chapter>
<b-chapter id="faq" icon="chat" title="Questions fréquentes">
  <b-faq-cards>
    <q t="Codex et ChatGPT, est-ce la même chose ?">Non. ChatGPT en mode Chat répond par du texte, alors que Codex travaille dans le projet : il lit le code, modifie les fichiers et lance les tests. Les deux se trouvent dans l'application ChatGPT et partagent un seul abonnement. Source : learn.chatgpt.com/docs/use-chatgpt, date de vérification : 18.11.2026.</q>
    <q t="Faut-il payer Codex séparément ?">Non. Codex est inclus dans les formules ChatGPT Free, Go, Plus, Pro, Business, Edu et Enterprise, et les limites dépendent de la formule. Avec une clé d'API, le paiement se fait aux tarifs de l'API. Source : learn.chatgpt.com/docs/pricing, date de vérification : 18.11.2026.</q>
    <q t="Peut-on écrire du code uniquement dans un chat ordinaire ?">On le peut : un chat expliquera, écrira une fonction et analysera une erreur. Mais reporter le résultat dans le projet et lancer les tests reste à votre charge. Quand les modifications sont nombreuses, Codex fait gagner du temps, car il ouvre lui-même les fichiers et vérifie le résultat.</q>
    <q t="Que prendre à la place de Codex si j'ai besoin d'un autre modèle ?">Claude Code fonctionne avec les modèles Claude, Cursor connecte des modèles de différentes entreprises. Le choix entre eux est décrit dans un article distinct. Sources : learn.chatgpt.com/docs et code.claude.com/docs/en/overview (vérifié le 15.11.2026, non revérifié pour cet article).</q>
    <q t="Qu'est-ce que le mode Work et en quoi diffère-t-il de Codex ?">Work mène une grande tâche jusqu'à un résultat terminé : un document, un tableau, une recherche. Codex travaille avec le code du projet et produit des modifications, le résultat des tests et une pull request. Source : learn.chatgpt.com/docs/use-chatgpt.</q>
    <q t="Peut-on lancer Codex avec une clé d'API au lieu d'un abonnement ?">On le peut : le terminal, le SDK et l'extension pour IDE fonctionnent aux tarifs de l'API. Les fonctions cloud, par exemple la revue de code sur GitHub, ne sont pas incluses dans ce mode. Source : learn.chatgpt.com/docs/pricing.</q>
  </b-faq-cards>
</b-chapter>
<b-chapter id="next" title="Pour aller plus loin">
  <b-links cols="2">
    <item href="/blog/ai-in-code-harness-and-tools/" k="Comparaison" t="Claude Code, Codex, Cursor et Hermes Agent">Quel agent pour quelle tâche</item>
    <item href="/blog/specs-rules-skills/" k="Contexte" t="AGENTS.md, CLAUDE.md et spec.md : quoi mettre où">Quelles instructions l'agent lit</item>
    <item href="/blog/harness-driven-development/" k="Méthode" t="Harness-Driven Development">L'erreur de l'agent devient une règle</item>
    <item href="/blog/claude-code-install-and-price/" k="Installation" t="Claude Code : installation et prix">Commande, connexion, formules</item>
    <item href="/blog/cursor-rules-vs-agents-md/" k="Règles" t="Cursor rules et AGENTS.md">Un fichier de règles que Codex lit</item>
    <item href="/blog/codex-access-regions-vpn-bans/" k="Accès" t="Codex CLI indisponible dans votre pays : pays pris en charge, VPN et bannissements">Liste des pays et connexion</item>
    <item href="/blog/ai-agent-llm-harness/" k="Bases" t="Agent ou chat : la différence">Agent, assistant, chatbot et réseau de neurones</item>
    <item href="/blog/work-prompts-examples/" k="Prompts" t="Prompts pour le travail">Requêtes pour Chat et Work</item>
    <item href="/materials/glossary/codex/" k="Terme" t="Codex">Ce qu'il fait, où il s'exécute</item>
  </b-links>
</b-chapter>
<b-footer>D'après l'aide d'OpenAI, la source est indiquée à côté de chaque affirmation. Date de vérification : 18.11.2026.</b-footer>
</b-post>
