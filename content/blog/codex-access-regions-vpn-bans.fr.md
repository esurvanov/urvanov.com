---
title: Codex CLI indisponible dans votre pays : pays pris en charge, VPN et bannissements
seoTitle: Codex CLI indisponible dans votre pays (2026)
date: 2026-11-18
updated: 2026-11-18
description: Ce que dit la liste des pays d'OpenAI pour Codex, comment fonctionne la connexion, ce que les conditions disent des VPN et pourquoi des comptes sont bannis.
tags: IA, Codex, OpenAI, pays pris en charge, VPN, bannissement, Claude Code
category: harness
layout: wide
mentions: Codex, OpenAI, ChatGPT, Claude Code, Anthropic
toc: answer=Réponse rapide | list=Liste des pays | login=Connexion | vpn=VPN | bans=Bannissements | data=Données et réglages | compare=Face à Claude Code | legal=Options légitimes | faq=Questions | start=Requêtes | next=Pour aller plus loin
---

Codex n'est officiellement pas disponible en Russie : le pays ne figure pas sur la liste des pays pris en charge par OpenAI, et un accès hors de cette liste « may result in your account being blocked or suspended ». Aucune règle propre à Codex n'a été trouvée ; les VPN ne sont pas mentionnés, mais contourner les restrictions est interdit.

<b-post series="harness">
<b-chapter id="answer" title="Réponse rapide" icon="crosshair">
  <b-why>L'accès à Codex dépend de la liste générale des pays d'OpenAI pour ChatGPT et l'API. La Russie n'y figure pas<b-proof href="https://developers.openai.com/api/docs/supported-countries" quote="OpenAI: «Accessing or offering access to our services outside of the countries and territories listed below may result in your account being blocked or suspended.» — developers.openai.com/api/docs/supported-countries"/>.</b-why>

  <iso-art name="codex-access-regions-vpn-bans/world-map"></iso-art>
  <b-cap>Bleu : le pays figure sur la liste d'OpenAI. Orange : le pays ne figure pas sur la liste, la Russie dans un ton plus soutenu.</b-cap>
  <b-sublabel top="18">Ce que cela signifie en termes simples</b-sublabel>

  OpenAI est l'entreprise qui produit ChatGPT et Codex. Codex est un agent pour les programmeurs : il travaille dans le terminal et dans une application, lit les fichiers d'un projet et modifie le code selon la tâche que vous lui confiez. OpenAI publie une liste de pays où ses services sont disponibles. Si votre pays figure sur la liste, les règles régionales ne vous gênent pas. S'il n'y figure pas, l'accès peut se terminer par le blocage du compte. OpenAI n'explique pas pourquoi elle procède ainsi. À mon avis, il s'agit de la politique de l'entreprise, plus le risque lié aux sanctions, aux contrôles à l'exportation et aux lois des États-Unis et d'autres pays.

  Exemple concret. Dana habite à Almaty et veut essayer Codex. Elle ouvre la liste d'OpenAI et trouve la ligne « Kazakhstan ». L'entrée n'a ni parenthèses ni réserves, donc rien dans la région ne fait obstacle. Reste la partie ordinaire : se connecter à un compte ChatGPT ou créer une clé d'API et choisir un moyen de paiement. Une personne qui se trouve physiquement en Russie ne trouvera pas une telle entrée.

  On croit facilement que Codex obéit à des règles distinctes parce qu'il tourne dans le terminal et s'installe avec une seule commande. Il n'existe pas de liste de pays propre à Codex, ni sur les pages publiques d'OpenAI ni dans le dépôt du programme. La connexion à Codex renvoie à la liste générale de ChatGPT et de l'API. Autre point, le VPN, un service qui fait paraître une connexion comme venant d'un autre endroit : il n'est mentionné ni dans l'aide sur les pays ni dans les conditions d'utilisation. Les conditions interdisent de contourner les restrictions et les mesures de protection, et changer d'adresse peut entrer dans ce cadre ; cette conclusion est la mienne, OpenAI ne s'est pas exprimée directement à ce sujet.

  Vous pouvez vérifier la réponse en une minute : ouvrez la <a href="https://developers.openai.com/api/docs/supported-countries">page d'OpenAI avec la liste des pays pris en charge</a> et cherchez votre pays avec la recherche du navigateur. Le centre d'aide help.openai.com ne s'ouvre pas pour les requêtes automatiques (erreur 403) ; j'ai donc vérifié les lignes de la liste sur la page developers.openai.com.
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>Question</th><th>Réponse</th><th>Statut</th></tr>
    </thead>
    <tbody>
      <tr><td>🇷🇺 Russie sur la liste des pays d'OpenAI</td><td>non<b-proof href="https://developers.openai.com/api/docs/supported-countries" quote="OpenAI: «Accessing or offering access to our services outside of the countries and territories listed below may result in your account being blocked or suspended.» — developers.openai.com/api/docs/supported-countries"/></td><td>confirmé</td></tr>
      <tr><td>Une liste de pays propre à Codex</td><td>introuvable sur les pages publiques et dans le dépôt</td><td>non trouvé</td></tr>
      <tr><td>Connexion</td><td>compte ChatGPT ou clé d'API<b-proof href="https://learn.chatgpt.com/docs/auth" quote="OpenAI: «Sign in with ChatGPT for subscription access» / «Sign in with an API key for usage-based access» — learn.chatgpt.com/docs/auth"/></td><td>confirmé</td></tr>
      <tr><td>VPN dans les conditions et dans l'aide sur les pays</td><td>non mentionné</td><td>non trouvé</td></tr>
      <tr><td>Interdiction de contourner les restrictions et les mesures de protection</td><td>présente dans les conditions<b-proof href="https://openai.com/policies/row-terms-of-use/" quote="OpenAI: «circumvent any rate limits or restrictions or bypass any protective measures or safety mitigations we put on our Services» — openai.com/policies/row-terms-of-use"/></td><td>confirmé</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>Date de vérification : 18.11.2026. L'article reprend des documents officiels et ne contient aucun moyen de contourner les restrictions.</b-cap>
</b-chapter>
<b-chapter id="list" title="Liste des pays d'OpenAI" icon="flag">
  <b-why>OpenAI tient une seule liste pour ChatGPT et l'API et ne publie pas de liste distincte des pays non pris en charge<b-proof href="https://help.openai.com/en/articles/7947663-chatgpt-and-openai-api-supported-countries-and-territories" quote="OpenAI: «OpenAI does not publish a separate list of countries and territories that are not supported. If a location is not included in the list below, our API is not available there.» — help.openai.com/en/articles/7947663"/>. Ce que la liste ne nomme pas n'est pas disponible.</b-why>

  La liste des pays est une page d'OpenAI qui nomme les endroits où l'on peut utiliser ChatGPT et l'API. Codex appartient au même ensemble : il se connecte soit avec un compte ChatGPT, soit avec une clé d'API, et les deux modes de connexion rencontrent donc cette liste. Il n'existe pas de page « pays où Codex est fermé ». L'absence d'un pays sur la liste est ainsi le seul signal d'un accès fermé.
  <iso-art name="codex-access-regions-vpn-bans/list-gate"></iso-art>
  <b-cap>La liste fonctionne comme une entrée unique pour ChatGPT, l'API et Codex : un pays listé passe, un pays hors de la liste est arrêté.</b-cap>
  <b-sublabel top="18">Comment lire une entrée</b-sublabel>

  La plupart des entrées de la liste tiennent en un mot : « Armenia », « Georgia », « Kazakhstan ». Une telle entrée signifie que tout le pays est pris en charge. Certaines entrées portent une réserve, dont la plus visible est « Ukraine (with certain exceptions) ». Je la décompose. « Ukraine » nomme le pays. Les parenthèses « with certain exceptions » signifient qu'une partie du territoire est exclue. Les endroits exclus ne sont pas nommés dans l'entrée sur la page d'OpenAI, et les pages publiques d'OpenAI n'ont pas de liste des exceptions. À titre de comparaison, Anthropic nomme une à une les régions exclues de l'Ukraine, alors qu'OpenAI n'a pas de liste de ce genre dans l'entrée. Une règle pratique en découle : si votre pays est écrit avec des parenthèses, le mot seul de la liste ne suffit pas, et il faudra demander une précision au support d'OpenAI.

  Exemple concret. Arsen habite à Erevan et monte une équipe avec des collègues d'Arménie, de Géorgie et d'Ukraine. Il ouvre la liste et trouve « Armenia » et « Georgia » sans parenthèses : pour les personnes qui se trouvent dans ces pays, aucune question. Il lit plus attentivement l'entrée « Ukraine (with certain exceptions) » et demande à une collègue de Kiev d'écrire au support d'OpenAI pour savoir si sa ville relève des exceptions. Pour vérifier vous-même : cherchez le pays avec la recherche de la page et regardez si des parenthèses suivent le nom.
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>Pays</th><th>OpenAI (ChatGPT et API)</th></tr>
    </thead>
    <tbody>
      <tr><td>Russie, Biélorussie</td><td>absents de la liste</td></tr>
      <tr><td>Chine, Hong Kong, Macao</td><td>absents de la liste</td></tr>
      <tr><td>Iran, Cuba, Corée du Nord, Syrie</td><td>absents de la liste</td></tr>
      <tr><td>Kazakhstan, Géorgie, Arménie, Ouzbékistan</td><td>sur la liste</td></tr>
      <tr><td>Ukraine</td><td>sur la liste « with certain exceptions »<b-proof href="https://developers.openai.com/api/docs/supported-countries" quote="OpenAI: «Ukraine (with certain exceptions)» — developers.openai.com/api/docs/supported-countries"/></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>Lignes vérifiées le 18.11.2026 sur la liste de developers.openai.com. Avant de décider, ouvrez la page d'OpenAI et cherchez votre pays : la liste change.</b-cap>
  <b-finding>
    <ex>Le pays n'est pas nommé dans la liste : l'accès à Codex via ChatGPT et l'API n'y est donc pas offert.</ex>
    <gen>OpenAI écrit « not available there » à propos de l'API, et les conditions préviennent d'un blocage du compte en cas d'accès hors de la liste. Les pages publiques ne prévoient aucune exception pour Codex.</gen>
    <do>Avant l'installation, trouvez votre pays sur la page d'OpenAI. S'il manque, considérez l'accès comme fermé.</do>
  </b-finding>
  <b-sublabel top="18">En quoi la liste d'OpenAI diffère de celle d'Anthropic</b-sublabel>

  Anthropic, l'entreprise qui produit Claude Code, a sa propre liste, qui ne coïncide pas entièrement avec celle d'OpenAI. La Russie, la Biélorussie, la Chine, l'Iran, Cuba, la Corée du Nord et la Syrie ne figurent sur aucune des deux. L'Afghanistan, le Myanmar et le Yémen sont sur la liste d'OpenAI et absents de celle d'Anthropic. La vérification d'un pays pour un agent ne remplace donc pas celle d'un autre : ouvrez la liste de celui que vous comptez installer. Aucune des deux entreprises n'explique les différences.
</b-chapter>
<b-chapter id="login" title="Comment Codex se connecte" icon="key">
  <b-why>La documentation sur la connexion à Codex renvoie à la liste générale des pays et ne contient aucune restriction régionale propre<b-proof href="https://learn.chatgpt.com/docs/auth" quote="OpenAI: «Sign in with ChatGPT for subscription access» — learn.chatgpt.com/docs/auth"/>.</b-why>

  La connexion est la manière dont Codex prouve aux serveurs d'OpenAI que les requêtes viennent de votre compte. Il y a deux modes, chacun lié à sa propre facturation. La connexion avec ChatGPT utilise un abonnement ChatGPT : vous payez un montant fixe et utilisez l'agent dans ses limites. La connexion avec une clé d'API utilise une clé destinée aux programmes : vous payez au tarif de l'API selon l'usage réel. Les deux chemins passent par la même porte, celle de la liste des pays, et le choix dépend de votre façon de payer et de vos besoins. Codex cloud (Codex dans le cloud), où l'agent s'exécute sur les serveurs d'OpenAI, exige la connexion avec ChatGPT, et une clé d'API n'y fonctionne pas.
  <iso-art name="codex-access-regions-vpn-bans/login-paths"></iso-art>
  <b-cap>Deux chemins de connexion : ChatGPT (abonnement) et clé d'API (paiement à l'usage). Les données de connexion restent sur votre ordinateur, dans un fichier ou dans le stockage du système.</b-cap>

  Le programme met en cache les données de connexion sur l'appareil. Elles se trouvent dans le fichier <code>~/.codex/auth.json</code> ou dans le stockage de mots de passe du système d'exploitation. Le mode est défini par le paramètre <code>cli_auth_credentials_store</code>, qui a quatre valeurs : <code>file</code>, <code>keyring</code>, <code>auto</code> et <code>ephemeral</code>. Le fichier des données de connexion équivaut à une clé du compte. Quiconque le copie peut utiliser votre compte, et les conditions d'OpenAI interdisent de partager ses identifiants et de mettre son compte à la disposition d'autrui<b-proof href="https://openai.com/policies/row-terms-of-use/" quote="OpenAI: «You may not share your account credentials or make your account available to anyone else and are responsible for all activities that occur under your account.» — openai.com/policies/row-terms-of-use"/>.
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th></th><th>Connexion avec ChatGPT</th><th>Connexion avec une clé d'API</th></tr>
    </thead>
    <tbody>
      <tr><td>Paiement</td><td>abonnement ChatGPT</td><td>tarifs de l'API</td></tr>
      <tr><td>Codex cloud</td><td>ce mode est obligatoire</td><td>ne fonctionne pas</td></tr>
      <tr><td>Où sont stockées les données de connexion</td><td colspan="2">dans le fichier ~/.codex/auth.json ou dans le stockage du système ; le mode est défini par le paramètre cli_auth_credentials_store (file, keyring, auto, ephemeral)</td></tr>
      <tr><td>Contrôle régional</td><td colspan="2">non décrit sur la page de connexion ; la liste générale des pays s'applique</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-sublabel top="18">Une situation de bout en bout</b-sublabel>

  Nika habite à Tbilissi et installe Codex sur son ordinateur de travail. Elle lance le programme et choisit la connexion avec ChatGPT, car elle a déjà un abonnement. Les données de connexion sont enregistrées sur l'ordinateur. Son pays figure sur la liste sous le nom « Georgia », sans parenthèses, donc aucune question sur la région. Une semaine plus tard, elle décide d'utiliser Codex cloud et découvre qu'il exige précisément la connexion ChatGPT : la clé d'API que son collègue utilise ne fonctionne pas pour le cloud. Pour vérifier comment le programme s'est connecté, vous pouvez le demander à l'agent lui-même : une requête toute prête figure à la fin de l'article.

  <b-sublabel top="18">Ce que les serveurs vérifient à la connexion</b-sublabel>

  Ce que les serveurs d'OpenAI vérifient réellement à la connexion n'est pas décrit sur les pages publiques : l'adresse de connexion, les données de paiement, un numéro de téléphone, ou tout cela ensemble. Ce n'est pas confirmé. L'article n'affirme donc rien sur le signal par lequel OpenAI déterminerait que vous êtes hors de la liste. On sait seulement qu'aucun contrôle régional n'est décrit à la connexion, et qu'elle renvoie à la liste générale.
</b-chapter>
<b-chapter id="vpn" title="VPN : ce qui est dit et ce qui ne l'est pas" icon="shield-check">
  <b-why>Les conditions pour les particuliers (en vigueur depuis le 1er janvier 2026) parlent de « restrictions » et de « mesures de protection » en termes généraux. Le VPN et la région n'y sont pas mentionnés.</b-why>

  Le VPN est un service qui change l'adresse à partir de laquelle un site voit votre connexion. On l'installe pour la confidentialité sur un réseau public ou pour accéder à un réseau d'entreprise. OpenAI ne dit rien du VPN dans ses documents ; j'ai donc séparé trois choses : ce qui est écrit mot pour mot, ce qui découle des conditions et ce qui reste une opinion. On voit ainsi où se trouve la règle et où se trouve la rumeur.
  <iso-art name="codex-access-regions-vpn-bans/vpn-rules"></iso-art>
  <b-cap>Les documents d'OpenAI disent peu de choses sur le VPN : il n'est pas mentionné, alors que contourner les restrictions et les mesures de protection est interdit.</b-cap>

  Mot pour mot, les documents contiennent ceci. Le VPN n'est mentionné ni dans l'aide sur les pays ni dans les conditions d'utilisation. Les conditions interdisent de contourner les limites, les restrictions et les mesures de protection. Elles interdisent aussi de céder le compte à d'autres et d'utiliser les services dans des pays sous embargo américain. Ni « le VPN est autorisé » ni « le VPN est interdit » n'apparaît dans ces documents. Toute conclusion dans un sens ou dans l'autre reste une interprétation du texte.
  <iso-art name="codex-access-regions-vpn-bans/four-bans"></iso-art>
  <b-cap>Quatre interdictions dans les conditions d'OpenAI : contourner les restrictions et les mesures de protection, céder le compte à d'autres, utiliser les services dans des pays sous embargo américain et enfreindre les conditions.</b-cap>

  Quatre interdictions des conditions touchent au sujet de l'accès, et chacune peut se lire comme une règle distincte.

  <b-steps round>
    <step t="Contourner les restrictions et les mesures de protection">Perturber les services est interdit, y compris contourner les limites, les restrictions et les mesures de protection. Un contrôle régional peut compter comme une telle mesure, mais les conditions ne le nomment pas.</step>
    <step t="Céder le compte à d'autres">Partager ses identifiants de connexion et mettre le compte à la disposition de quelqu'un d'autre n'est pas permis. La responsabilité de tout ce qui se passe sous le compte reste au titulaire.</step>
    <step t="Utiliser les services dans des pays sous embargo américain">Les services ne peuvent pas être utilisés dans un pays ou un territoire sous embargo américain, ni au profit de personnes avec lesquelles les lois commerciales interdisent de traiter.</step>
    <step t="Enfreindre les conditions et les règles d'usage">En cas d'infraction aux conditions ou aux Usage Policies, OpenAI peut suspendre ou fermer l'accès. OpenAI tire la même conclusion en cas de risque de préjudice et lorsque la loi l'exige.</step>
  </b-steps>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>Quoi</th><th>Présent dans les documents</th></tr>
    </thead>
    <tbody>
      <tr><td>VPN dans l'aide sur les pays</td><td>non mentionné</td></tr>
      <tr><td>VPN dans les conditions d'utilisation</td><td>non mentionné</td></tr>
      <tr><td>Interdiction de contourner les « restrictions » et les « mesures de protection »</td><td>oui<b-proof href="https://openai.com/policies/row-terms-of-use/" quote="OpenAI: «Interfere with or disrupt our Services, including circumvent any rate limits or restrictions or bypass any protective measures or safety mitigations we put on our Services.» — openai.com/policies/row-terms-of-use"/></td></tr>
      <tr><td>Interdiction de céder le compte à d'autres</td><td>oui<b-proof href="https://openai.com/policies/row-terms-of-use/" quote="OpenAI: «You may not share your account credentials or make your account available to anyone else and are responsible for all activities that occur under your account.» — openai.com/policies/row-terms-of-use"/></td></tr>
      <tr><td>Interdiction d'utiliser les services dans des pays sous embargo américain</td><td>oui<b-proof href="https://openai.com/policies/row-terms-of-use/" quote="OpenAI: «Our Services may not be used in or for the benefit of, or exported or re-exported to (a) any U.S. embargoed country or territory or (b) any individual or entity with whom dealings are prohibited or restricted under applicable trade laws.» — openai.com/policies/row-terms-of-use"/></td></tr>
      <tr><td>« Le VPN est autorisé » ou « le VPN est interdit » mot pour mot</td><td>aucun des deux : toute conclusion de ce genre est une interprétation sans citation derrière elle</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-finding>
    <ex>Ni une autorisation ni une interdiction du VPN ne se déduit mot pour mot des documents.</ex>
    <gen>Le critère d'OpenAI est la liste des pays où les services sont offerts, ainsi que l'interdiction de contourner les restrictions. Comment OpenAI l'applique en pratique, je ne l'ai pas trouvé dans les sources ouvertes.</gen>
    <do>Ne décidez pas d'après des récits sur des forums. Lisez les conditions et la liste des pays sur les pages d'OpenAI et, en cas de doute, écrivez au support d'OpenAI.</do>
  </b-finding>
  <b-sublabel top="18">Idées reçues fréquentes</b-sublabel>

  <b>Puisque le VPN n'est pas mentionné dans les conditions, est-il autorisé ?</b> L'absence de mention n'autorise rien. L'interdiction de contourner les restrictions et les mesures de protection est formulée en termes généraux, et changer d'adresse peut y entrer. Pour vérifier : trouvez la phrase sur « circumvent any rate limits or restrictions » dans les <a href="https://openai.com/policies/row-terms-of-use/">conditions d'utilisation d'OpenAI</a> et lisez-la en entier.

  <b>Les conditions interdisent-elles le VPN purement et simplement ?</b> Il n'y est pas mentionné. On déduit une interdiction de contourner la région de l'interdiction générale de contourner les mesures de protection, mais cette déduction est une interprétation sans citation derrière elle.

  <b>Un abonnement payant donne-t-il le droit d'accéder depuis n'importe quel pays ?</b> Les conditions et l'aide nomment la liste des pays comme critère, et les formules tarifaires ne figurent pas parmi les critères. Un abonnement ChatGPT et une clé d'API se tiennent derrière la même porte. Pour vérifier : lisez la première phrase de la page avec la liste.

  <b>Si le pays est sur la liste, peut-on cesser de s'inquiéter du VPN ?</b> L'interdiction de contourner les mesures de protection figure dans les conditions pour tous les utilisateurs, et la liste des pays ne l'annule pas. L'aide sur les pays contient aussi une réserve sur l'appareil : l'erreur « OpenAI's services are not available in your country. » peut apparaître même dans un pays pris en charge. Les conditions de son apparition ne sont pas décrites dans l'aide ; il vaut donc la peine de demander au support.

  <b>Est-ce plus simple avec Claude Code ?</b> Anthropic ne mentionne pas non plus le VPN dans ses règles régionales, mais la documentation de Claude Code a sa propre formulation sur la compatibilité du programme avec les VPN. Les formulations diffèrent d'une entreprise à l'autre et la logique est proche : une liste de pays plus une interdiction générale de contourner les mesures de protection. L'analyse détaillée pour Claude Code se trouve dans un <a href="/blog/claude-code-access-regions-vpn-bans/" target="_blank" rel="noopener">article distinct</a>.

  La décision sur le risque vous appartient. Je ne décris ni ne recommande aucune façon de se connecter : sur ce sujet, je n'ai que la formulation des conditions.
</b-chapter>


<b-chapter id="bans" title="Bannissements et leurs causes" icon="alert-circle">
  <b-why>Un bannissement est la suspension ou la fermeture d'un compte OpenAI, après laquelle la connexion à ChatGPT, à l'API et à Codex ne fonctionne plus. Les conditions d'OpenAI nomment trois motifs, dont l'un est une infraction aux conditions ou aux règles d'usage<b-proof href="https://openai.com/policies/row-terms-of-use/" quote="OpenAI: «We reserve the right to suspend or terminate your access to our Services or delete your account if we determine: You breached these Terms or our Usage Policies. We must do so to comply with the law. Your use of our Services could cause risk or harm to OpenAI, our users, or anyone else.» — openai.com/policies/row-terms-of-use"/>.</b-why>

  Les motifs sont écrits dans les conditions d'utilisation pour les particuliers (<a href="https://openai.com/policies/row-terms-of-use/" target="_blank" rel="noopener">Terms of Use</a>, en vigueur depuis le 1er janvier 2026) et dans l'article d'aide sur la liste des pays. Les conditions donnent trois motifs : une infraction aux conditions elles-mêmes ou aux Usage Policies, une exigence légale, et un risque de préjudice pour OpenAI, pour d'autres utilisateurs ou pour quiconque. Un quatrième motif figure dans l'article d'aide sur la liste des pays : l'accès aux services hors des pays listés « may result in your account being blocked or suspended ».
  <iso-art name="codex-access-regions-vpn-bans/ban-ladder"></iso-art>
  <b-cap>Le chemin du schéma : un motif, puis la suspension ou la fermeture, puis un recours auprès du support. OpenAI prend la décision, et la personne n'a qu'une demande au support ; les conditions ne promettent aucun résultat.</b-cap>

  La rapidité avec laquelle un bannissement arrive et son aspect à l'écran ne sont pas décrits sur les pages publiques d'OpenAI : je n'ai rien trouvé. Elles disent seulement que le droit de suspendre ou de fermer l'accès appartient à l'entreprise, et qu'un recours peut être déposé si la décision était une erreur.
  <b-sublabel top="18">Causes selon les documents</b-sublabel>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>Cause</th><th>Ce qui est dit</th></tr>
    </thead>
    <tbody>
      <tr><td>Accès hors de la liste des pays</td><td>le compte peut être bloqué ou suspendu : «Accessing or offering access to our services outside of the countries and territories listed below may result in your account being blocked or suspended.»</td></tr>
      <tr><td>Infraction aux conditions ou aux règles d'usage</td><td>OpenAI peut suspendre ou fermer l'accès (la citation figure au début du chapitre)</td></tr>
      <tr><td>Erreur dans une région</td><td>le texte de l'erreur dans l'article d'aide sur les pays : «OpenAI's services are not available in your country.» L'article ajoute que l'erreur est possible même dans un pays pris en charge après l'utilisation d'un appareil dans une région non prise en charge</td></tr>
      <tr><td>Recours</td><td>par le support<b-proof href="https://openai.com/policies/row-terms-of-use/" quote="OpenAI: «If you believe we have suspended or terminated your account in error, you can file an appeal with us by contacting our Support team» — openai.com/policies/row-terms-of-use"/></td></tr>
    </tbody>
    </table>
  </b-ctx-table>

  Une autre disposition des conditions concerne la responsabilité : un compte ne peut pas être cédé à d'autres, et le titulaire répond de tout ce qui se passe sous son compte<b-proof href="https://openai.com/policies/row-terms-of-use/" quote="OpenAI: «You may not share your account credentials or make your account available to anyone else and are responsible for all activities that occur under your account.» — openai.com/policies/row-terms-of-use"/>. Le compte d'un autre, ou un accès partagé au sein d'une équipe, reste donc un motif de restriction même si le pays figure sur la liste.
  <b-sublabel top="18">Le recours étape par étape</b-sublabel>
  <b-steps round>
    <step t="Support">écrivez au support d'OpenAI et indiquez que, selon vous, le bannissement est une erreur</step>
    <step t="Détails">joignez la date, le pays depuis lequel vous vous êtes connecté, le texte de l'erreur et des copies des courriels</step>
    <step t="Attente">attendez une réponse : les conditions ne donnent ni délais ni chances de succès</step>
  </b-steps>

  Les pages publiques n'ont ni formulaire de recours nommé, ni adresse, ni délais d'examen ; les étapes ne contiennent donc que ce que disent les conditions : une demande au support. Un recours corrige une erreur, mais le motif nommé dans l'article d'aide reste le même tant qu'une personne continue d'utiliser le service depuis un pays hors de la liste. C'est ma lecture des conditions et de l'article d'aide ; OpenAI ne fait aucune comparaison de ce genre.
  <b-sublabel top="18">Un exemple suivi</b-sublabel>
  <b-steps round>
    <step t="Oleg habite en Russie et veut essayer Codex">Il installe le programme, tente de se connecter et voit le texte « OpenAI's services are not available in your country. » La Russie est absente de la liste des pays d'OpenAI, et les conditions préviennent d'un blocage ou d'une suspension du compte en cas d'accès hors de la liste. Quel contrôle s'est réellement déclenché, l'adresse, le numéro de téléphone ou les données de paiement, les pages publiques ne le décrivent pas. Un recours par le support est possible, mais il ne fait pas entrer le pays sur la liste. Pour vérifier vous-même : ouvrez la liste des pays d'OpenAI, trouvez-y la Russie et comparez le résultat avec le texte de l'erreur de l'article d'aide.</step>
  </b-steps>

  <b-sublabel top="18">Idées reçues fréquentes</b-sublabel>

  <b>Les bannissements ne sont-ils prononcés que pour une infraction aux conditions ?</b> Non : les conditions ont deux autres motifs, une exigence légale et un risque de préjudice, et l'article d'aide sur les pays nomme séparément l'accès hors de la liste.

  <b>Un recours rend-il l'accès ?</b> Les conditions disent seulement qu'un recours peut être déposé par le support. Elles ne promettent aucun résultat.

  <b>Les causes d'un bannissement chez OpenAI sont-elles entièrement listées dans le centre d'aide ?</b> L'article d'aide distinct sur les causes des bannissements de comptes d'OpenAI est fermé à la vérification automatique (erreur 403) ; je ne reprends donc pas ses dispositions. Les conditions pour les entreprises, les Service Terms et les Usage Policies sont fermés de la même façon. Pour les organisations, ces documents sont à lire séparément sur openai.com et help.openai.com.
  <b-cap>Limite de ce que je sais : ce que disent les conditions pour les particuliers et l'article d'aide sur les pays est confirmé. Ce que contiennent les documents fermés n'est pas confirmé.</b-cap>
</b-chapter>
<b-chapter id="data" title="Ce que Codex envoie au serveur" icon="eye">
  <b-why>Les requêtes au modèle partent toujours vers le serveur, sinon l'agent ne fonctionne pas. Les autres flux (analyse d'usage, métriques, envoi de commentaires) se désactivent dans config.toml, et le texte des requêtes n'arrive dans les journaux OpenTelemetry qu'avec un consentement explicite<b-proof href="https://learn.chatgpt.com/docs/config-file/config-reference" quote="OpenAI: «Opt in to exporting raw user prompts with OpenTelemetry logs.» — learn.chatgpt.com/docs/config-file/config-reference"/>.</b-why>

  Je me suis appuyé sur le code source de Codex CLI (commit 8011b92 du 18.11.2026) et sur la page des réglages d'OpenAI. Codex est un agent de programmation : il travaille dans le terminal et dans l'application et parle en permanence au serveur. Certaines données sont nécessaires au travail, d'autres sont collectées en plus. Les données nécessaires sont vos requêtes au modèle et ses réponses. Les flux supplémentaires sont l'analyse d'usage des produits Codex, les métriques et les commentaires envoyés par la commande /feedback. La télémétrie est l'envoi automatique d'informations sur le fonctionnement du programme : combien de temps a duré une action, une erreur s'est-elle produite. OpenTelemetry est un standard ouvert pour ce type d'informations.
  <iso-art name="codex-access-regions-vpn-bans/data-flows"></iso-art>
  <b-cap>Les requêtes au modèle partent toujours. L'analyse d'usage, les métriques et /feedback sont désactivés par des réglages. Le texte des requêtes va dans OpenTelemetry uniquement avec consentement.</b-cap>

  <b-sublabel top="18">Ce qui est envoyé quand c'est activé</b-sublabel>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>Quoi</th><th>Par défaut</th><th>Comment désactiver</th></tr>
    </thead>
    <tbody>
      <tr><td>Analyse d'usage d'OpenAI dans les produits Codex<b-proof href="https://learn.chatgpt.com/docs/config-file/config-reference" quote="OpenAI: «Enable or disable analytics for this machine or profile.» — learn.chatgpt.com/docs/config-file/config-reference"/></td><td>activée dans la version publiée</td><td>[analytics] enabled = false</td></tr>
      <tr><td>Métriques OpenTelemetry (exportateur intégré)<b-proof href="https://learn.chatgpt.com/docs/config-file/config-reference" quote="OpenAI: «Select the OpenTelemetry metrics exporter. The default, `statsig`, follows `analytics.enabled`.» — learn.chatgpt.com/docs/config-file/config-reference"/></td><td>activées, suivent le réglage de l'analyse d'usage</td><td>[otel] metrics_exporter = "none"</td></tr>
      <tr><td>Envoi de commentaires par /feedback<b-proof href="https://learn.chatgpt.com/docs/config-file/config-reference" quote="OpenAI: «Enable feedback submission via `/feedback` across local clients (default: true).» — learn.chatgpt.com/docs/config-file/config-reference"/></td><td>activé</td><td>[feedback] enabled = false</td></tr>
      <tr><td>Texte des requêtes dans les journaux OpenTelemetry<b-proof href="https://learn.chatgpt.com/docs/config-file/config-reference" quote="OpenAI: «Opt in to exporting raw user prompts with OpenTelemetry logs.» — learn.chatgpt.com/docs/config-file/config-reference"/></td><td>désactivé, consentement explicite requis</td><td>inutile de l'activer</td></tr>
    </tbody>
    </table>
  </b-ctx-table>

  Les deux premières lignes sont liées : par défaut, l'exportateur de métriques intégré suit le réglage de l'analyse d'usage. L'envoi de commentaires est à part : rien ne part tant que la personne n'a pas lancé /feedback. La dernière ligne montre le seul flux désactivé par défaut.
  <b-sublabel top="18">Réglages dans config.toml</b-sublabel>
  <b-codebox title="config.toml de Codex" copy>
    [analytics]
    enabled = false

    [otel]
    metrics_exporter = "none"

    [feedback]
    enabled = false
  </b-codebox>
  <b-cap>Le schéma des réglages dans le dépôt précise : avec analytics enabled = false, les exportateurs OTLP du programme restent actifs, et pour désactiver les métriques il faut metrics_exporter = "none". Ce qu'OpenAI conserve exactement du code et des requêtes, et pour combien de temps, je ne l'ai pas trouvé sur les pages publiques de Codex CLI : non confirmé.</b-cap>

  Ces réglages concernent la collecte de données. Ils n'ont aucun effet sur la liste des pays : une analyse d'usage désactivée ne rend pas permis l'usage depuis un pays hors de la liste.
  <b-sublabel top="18">Un exemple suivi</b-sublabel>
  <b-steps round>
    <step t="Timur habite à Tachkent et écrit du code pour un client">L'Ouzbékistan figure sur la liste des pays d'OpenAI ; il se connecte donc à Codex avec son compte ChatGPT. Le client lui demande de n'envoyer rien de superflu. Timur ouvre config.toml et écrit trois blocs : analyse d'usage désactivée, métriques désactivées, envoi de commentaires désactivé. Les requêtes au modèle continuent de partir, car le travail de l'agent en dépend. Pour vérifier vous-même : demandez à l'agent d'afficher les valeurs des trois réglages et assurez-vous que chacune est désactivée.</step>
  </b-steps>

  <b-sublabel top="18">Idées reçues fréquentes</b-sublabel>

  <b>Désactiver l'analyse d'usage arrête-t-il l'envoi des requêtes au modèle ?</b> Non : les requêtes et les réponses partent toujours vers le serveur, c'est le fondement du travail de l'agent.

  <b>La seule ligne [analytics] enabled = false suffit-elle ?</b> Le schéma des réglages précise que les exportateurs OTLP du programme restent alors actifs, et que les métriques ne sont entièrement désactivées que par metrics_exporter = "none".

  <b>Tout ce que l'agent a enregistré localement part-il vers le serveur ?</b> Non : dans le code de Codex CLI, les bases de données locales du répertoire ~/.codex (historique des sessions, journaux) sont toujours écrites, mais je n'ai trouvé aucun code réseau qui les synchronise. L'exception : des journaux issus de ces bases peuvent partir lors de l'envoi de /feedback, et seulement sur décision de la personne.
</b-chapter>
<b-chapter id="compare" title="Accès : Codex et Claude Code" icon="table-grid">
  <b-why>Pour les deux agents, la connexion est liée à la liste des pays de l'entreprise qui le propose, et la Russie ne figure sur aucune des deux<b-proof href="https://www.anthropic.com/supported-countries" quote="Anthropic: «Any country or region not listed is unsupported.» — anthropic.com/supported-countries"/>. Les critères des listes diffèrent : chez OpenAI, ce sont les pays où les services sont offerts ; chez Anthropic, s'y ajoutent l'emplacement physique de la personne, l'enregistrement de l'entreprise et qui la détient.</b-why>

  Claude Code est l'agent de programmation d'Anthropic, et il travaille lui aussi dans le terminal. La comparaison aide quand on choisit entre deux agents et qu'on veut savoir si l'accès fonctionne de la même façon pour les deux. Sur le point principal, c'est le cas : les deux entreprises publient une liste de pays, et hors de la liste l'accès n'est pas offert. Ce qui diffère, c'est ce qui est vérifié exactement et ce que la liste couvre.
  <iso-art name="codex-access-regions-vpn-bans/compare-lists"></iso-art>
  <b-cap>Deux entrées : la liste d'OpenAI et la liste d'Anthropic. La Russie est absente des deux, et les critères des listes diffèrent.</b-cap>

  <b-sublabel top="18">Tableau récapitulatif</b-sublabel>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th></th><th>Codex (OpenAI)</th><th>Claude Code (Anthropic)</th></tr>
    </thead>
    <tbody>
      <tr><td>Russie sur la liste</td><td>non</td><td>non</td></tr>
      <tr><td>Ce que couvre la liste</td><td>ChatGPT et l'API ; aucune règle distincte pour Codex</td><td>les applications, dont Claude Code, et l'API</td></tr>
      <tr><td>Critère</td><td>liste des pays où les services sont offerts</td><td>emplacement physique, enregistrement et qui détient l'entreprise</td></tr>
      <tr><td>VPN dans la politique régionale</td><td>non mentionné</td><td>non mentionné</td></tr>
      <tr><td>Connexion</td><td>ChatGPT ou clé d'API</td><td>un abonnement Claude ou un compte Console</td></tr>
      <tr><td>Différences entre les listes</td><td colspan="2">L'Afghanistan, le Myanmar et le Yémen sont sur la liste d'OpenAI et pas sur celle d'Anthropic</td></tr>
    </tbody>
    </table>
  </b-ctx-table>

  Trois lignes du tableau demandent une explication. Dans la ligne de la couverture, OpenAI a une seule liste pour ChatGPT et l'API, et Codex n'a pas de règle propre, alors que la liste d'Anthropic nomme directement les applications, dont Claude Code. Dans la ligne du critère, Anthropic vérifie trois signes : une entreprise d'une région non prise en charge est donc exclue même si ses salariés sont dans un pays listé. La liste des pays d'OpenAI n'a pas de tels signes pour les entreprises. La dernière ligne donne la différence par pays : l'Afghanistan, le Myanmar et le Yémen sont nommés sur la liste d'OpenAI et absents de celle d'Anthropic.

  L'analyse pour Claude Code, avec les erreurs d'installation, la vérification par téléphone et le paiement, se trouve dans un article distinct sur les régions, les VPN et les bannissements.
  <b-links cols="2">
    <item href="/blog/claude-code-access-regions-vpn-bans/" k="Région" t="Claude Code : régions, VPN et bannissements">Le même sujet pour Claude Code</item>
    <item href="/blog/claude-code-install-and-price/" k="Installation" t="Claude Code : installation et prix">Commande, connexion, formules</item>
  </b-links>
</b-chapter>
<b-chapter id="legal" title="Ce que vous pouvez faire légitimement" icon="check">
  <b-why>Les conditions d'OpenAI laissent quatre chemins qui ne demandent aucun contournement : trouver votre pays sur la liste, lire les conditions, écrire au support et choisir un autre agent.</b-why>

  Des options légitimes existent, et contourner les règles n'entre dans aucune d'elles. Le chemin le plus direct est de trouver votre pays sur la liste d'OpenAI. Le suivant est de lire les conditions pour les particuliers ou pour les organisations avant de commencer à travailler. Un troisième chemin sert quand le pays figure sur la liste mais que la connexion ne fonctionne pas : écrire au support. Le quatrième est de choisir un autre agent dont les conditions admettent votre pays.
  <iso-art name="codex-access-regions-vpn-bans/legal-paths"></iso-art>
  <b-cap>Quatre chemins marqués d'une coche sont ouverts : un pays sur la liste, les conditions, le support et un autre agent. La porte orange fermée représente le contournement des règles, qui n'a pas sa place ici.</b-cap>

  <b-seq-row>
    <step t="Pays">le trouver sur la liste d'OpenAI</step>
    <step t="Conditions">lire les conditions pour les particuliers ou les organisations</step>
    <step t="Support">si la liste ne vous convient pas, écrire au support</step>
    <step t="Autre agent">choisir un programme à l'accès ouvert</step>
  </b-seq-row>

  <b-sublabel top="18">Que faire dans chaque situation</b-sublabel>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>Situation</th><th>Étape</th></tr>
    </thead>
    <tbody>
      <tr><td>Le pays est sur la liste, mais la connexion ne fonctionne pas</td><td>écrire au support d'OpenAI en joignant le texte de l'erreur ; un recours passe par le même canal</td></tr>
      <tr><td>Le pays n'est pas sur la liste</td><td>considérer l'accès comme fermé ; chercher un agent dont les conditions admettent votre pays</td></tr>
      <tr><td>Vous devez travailler avec un modèle local</td><td><a href="/materials/glossary/opencode/">OpenCode</a> : vous choisissez le modèle vous-même, y compris un modèle local ; vérifiez séparément les conditions du modèle et de son fournisseur</td></tr>
      <tr><td>Une entreprise dans une région non prise en charge</td><td>un examen juridique des conditions avant de commencer à travailler ; Anthropic ferme l'accès aux organisations enregistrées ou contrôlées depuis une région non prise en charge</td></tr>
    </tbody>
    </table>
  </b-ctx-table>

  OpenCode est un agent ouvert : il ne fournit pas de modèle propre et se connecte au modèle du fournisseur que vous choisissez, et ce fournisseur fixe les règles régionales. Le choix doit donc suivre la liste des pays du fournisseur du modèle.
  <b-sublabel top="18">Un exemple suivi</b-sublabel>
  <b-steps round>
    <step t="Aigul habite à Bichkek et veut commencer avec Codex">Elle trouve la ligne « Kyrgyzstan » sur la liste d'OpenAI, lit les conditions pour les particuliers et se connecte avec un abonnement ChatGPT à son propre nom. Une semaine plus tard, la connexion cesse de fonctionner et l'écran affiche une erreur. Elle écrit au support d'OpenAI, joint le texte de l'erreur et la date, et attend une réponse. Pour vérifier vous-même : ouvrez la liste, trouvez votre pays et enregistrez une capture d'écran de la ligne avec la date.</step>
  </b-steps>

  <b-cap>Le compte d'un autre, la clé d'API d'un autre, les intermédiaires et la revente d'accès enfreignent les conditions : un compte ne peut pas être cédé à d'autres. Ces voies ne sont pas traitées ici.</b-cap>
</b-chapter>
<b-chapter id="faq" icon="chat" title="Questions fréquentes">
  <b-faq-cards>
    <q t="Codex fonctionne-t-il en Russie ?">Officiellement non : la Russie ne figure pas sur la liste des pays pris en charge par OpenAI pour ChatGPT et l'API, et les pages publiques n'ont aucune règle distincte pour Codex. Source : help.openai.com/en/articles/7947663 et developers.openai.com/api/docs/supported-countries. Date de vérification : 18.11.2026.</q>
    <q t="Puis-je utiliser Codex avec un VPN ?">Le VPN n'est mentionné ni dans les conditions ni dans l'article d'aide sur les pays. Un VPN est un service qui fait paraître une connexion comme venant d'un autre endroit. Les conditions interdisent de contourner les restrictions et les mesures de protection, et OpenAI prévient d'un blocage du compte en cas d'accès hors de la liste. Les documents ne donnent pas de réponse nette : la décision vous appartient, à vos risques. Source : openai.com/policies/row-terms-of-use. Date de vérification : 18.11.2026.</q>
    <q t="Pourquoi OpenAI bannit-elle des comptes ?">Ce qui est confirmé : l'accès hors de la liste des pays, une infraction aux conditions ou aux règles d'usage, une exigence légale et un risque de préjudice. L'article d'aide distinct sur les causes des bannissements est à vérifier à la main sur help.openai.com. Un recours passe par le support. Date de vérification : 18.11.2026.</q>
    <q t="Comment désactiver l'analyse d'usage dans Codex ?">Dans config.toml, ajoutez [analytics] enabled = false, [otel] metrics_exporter = "none" et [feedback] enabled = false. Les deux premiers désactivent l'analyse d'usage et les métriques intégrées, le troisième coupe l'envoi de commentaires. Les requêtes au modèle continuent de partir. Source : learn.chatgpt.com/docs/config-file/config-reference. Date de vérification : 18.11.2026.</q>
    <q t="En quoi la liste des pays d'OpenAI diffère-t-elle de celle d'Anthropic ?">Les critères diffèrent. Chez OpenAI, ce sont les pays où les services ChatGPT et API sont offerts. Chez Anthropic, s'y ajoutent l'emplacement physique de la personne, l'enregistrement de l'entreprise et qui la détient. L'Afghanistan, le Myanmar et le Yémen sont sur la liste d'OpenAI et pas sur celle d'Anthropic. Date de vérification : 18.11.2026.</q>
    <q t="Que faire si le pays est sur la liste mais que la connexion ne fonctionne pas ?">Écrivez au support d'OpenAI en joignant le texte de l'erreur : l'article d'aide sur les pays dit que l'erreur est possible même dans un pays pris en charge après l'utilisation d'un appareil dans une région non prise en charge. Un recours contre un bannissement passe par le même support. Date de vérification : 18.11.2026.</q>
  </b-faq-cards>
</b-chapter>
<b-chapter id="start" title="Requêtes pour l'agent" icon="zap">
  <b-why>Trois requêtes toutes prêtes qui ne changent rien sans votre confirmation.</b-why>

  La première requête ne fait que lire : elle affiche trois réglages de collecte de données. La deuxième montre comment Codex s'est connecté, avec ChatGPT ou avec une clé d'API, et où se trouvent les données de connexion. La troisième écrit dans le fichier des réglages ; l'agent montre donc d'abord un diff, c'est-à-dire la différence entre l'ancien et le nouveau fichier, et attend la confirmation.
  <b-codebox title="1. Quels réglages de collecte de données sont définis" copy>
    Show which analytics, otel and feedback settings are currently set in the Codex config.toml. Change nothing.
  </b-codebox>
  <b-codebox title="2. Comment Codex s'est connecté" copy>
    Show how Codex is currently signed in for me: through ChatGPT or an API key, and where the sign-in data lives.
  </b-codebox>
  <b-codebox title="3. Désactiver l'envoi de données superflues" copy>
    Add the blocks [analytics] enabled = false, [otel] metrics_exporter = "none" and [feedback] enabled = false to config.toml. First show the diff and wait for my confirmation.
  </b-codebox>
  <b-cap>La première et la deuxième requête ne font que lire. La troisième écrit dans le fichier des réglages : regardez le diff avant qu'il soit écrit.</b-cap>
</b-chapter>
<b-chapter id="next" title="Pour aller plus loin">
  <b-links cols="2">
    <item href="/blog/codex-or-chatgpt-what-to-choose/" k="Choix" t="Codex ou ChatGPT">Lequel prendre pour travailler avec du code</item>
    <item href="/blog/claude-code-access-regions-vpn-bans/" k="Région" t="Claude Code : régions, VPN et bannissements">Le même sujet pour Claude Code</item>
    <item href="/blog/claude-code-install-and-price/" k="Installation" t="Claude Code : installation et prix">Commande, connexion, formules</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="Comparaison" t="Claude Code, Codex, Cursor et Hermes Agent">Quel agent pour quelle tâche</item>
    <item href="/blog/specs-rules-skills/" k="Contexte" t="AGENTS.md, CLAUDE.md et spec.md">Quelles instructions l'agent lit</item>
    <item href="/materials/glossary/codex/" k="Terme" t="Codex">Ce qu'il fait, où il s'exécute</item>
  </b-links>
</b-chapter>
<b-footer>D'après les listes de pays et les conditions d'OpenAI, la documentation de Codex et le code source de Codex CLI. Date de vérification : 18.11.2026. Les listes de pays changent ; ouvrez la source primaire avant de décider.</b-footer>
</b-post>
