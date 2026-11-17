---
title: Escalade vers un humain pour les agents IA : comment un agent s’arrête et demande via MCP et les hooks
date: 2026-11-14
updated: 2026-11-17
description: Quand un agent confie une décision à une personne : réponses d’elicitation MCP, modes de permission, hooks, fréquence réelle des questions.
tags: IA, agents, MCP, elicitation, escalade, hooks, Claude Code, autonomie, harness
category: harness
layout: wide
mentions: MCP, hooks, harness, bounded context, quality gate, Google DeepMind, escalation to a human
toc: answer=En bref | seen=Premier regard | penalty=Pénalité | measure=Métriques | time=Autonomie | behavior=Comportement | mcp=MCP | cc=Claude Code | narrow=Fenêtre | claims=Résultats | start=Démarrer | faq=Questions | next=À lire ensuite
---
L’escalade vers un humain est le moment où un agent cesse de travailler et confie une décision à une personne : question, demande de permission ou confirmation. MCP a pour cela l’elicitation (accepter, refuser, annuler) ; Claude Code, des hooks et des modes de permission. Le contrôle se tient hors de l’agent. Ci-dessous : l’aspect initial et les vérifications.

<b-post series="harness">
<b-callout icon="bulb">**Une observation.** Je pensais que les agents sont entraînés et mesurés sur la durée pendant laquelle ils travaillent seuls, sans personne. Le score est donné pour le résultat : tâche résolue vaut 1, non résolue vaut 0. Une question à une personne ne produit pas de résultat par elle-même, la pénalité vient donc de la tâche inachevée, et deviner rapporte davantage. J’ai vérifié cela dans des documents et des articles et déduit les formules ci-dessous. Une pénalité pour la question elle-même s’est révélée rare : certaines métriques ne prévoient pas de question et d’autres la récompensent.</b-callout>

<b-chapter id="answer" icon="chat" title="En bref : ce qu’est l’escalade et par où elle passe">
  <b-art names="agent-escalation-to-human/window" wide/>
  <b-cap>L’agent travaille dans son propre contexte ; une question traverse la séparation vers la personne et l’une des trois réponses revient.</b-cap>
  <b-why align="left"><b-icon name="chat"/> **Ce que c’est.** L’escalade est un arrêt déclenché par l’agent ou par le programme autour de lui : « je n’ai pas le droit de décider ici, il faut une personne ». Trois sortes courantes : une question de clarification, une demande de permission pour une action dangereuse, une confirmation du résultat avant la fusion. La porte de qualité décrite dans [« Que sont les portes de qualité pour les agents IA »](/blog/quality-gates-ai-agents/) remet à une personne tout ce dont la vérification n’est « pas sûre », l’escalade prolonge donc la porte.</b-why>
  <b-why align="left"><b-icon name="package"/> **Comment cela marche dans MCP.** Un serveur peut interroger une personne par l’intermédiaire du client : dans la spécification, c’est l’elicitation. Il y a trois réponses : accepter, refuser, annuler. Un serveur ne doit pas compter sur une réponse : le protocole lui-même exige de gérer un refus et une annulation.</b-why>
  <b-why align="left"><b-icon name="shield-check"/> **Comment cela marche dans Claude Code.** Les modes de permission décident quels appels vont à une personne, et les hooks interceptent un appel et répondent « allow », « deny » ou « ask ». Le programme l’impose, alors que le texte d’instruction ne fait que guider.</b-why>
  <b-finding>
    <ex>Un agent modifie la configuration d’un serveur de réservation. Un hook voit le chemin d’une configuration en production et répond « ask » : une personne reçoit une fenêtre avec une question. Si personne ne répond et que l’exécution n’a pas d’interface, l’appel est rejeté et l’agent poursuit avec un autre plan.</ex>
    <gen>L’escalade a deux parties : le programme autour de l’agent décide « demander », et la réponse vient d’une personne par une fenêtre étroite.</gen>
    <do>Noter trois actions de l’agent après lesquelles une question est souhaitée : suppression, mise en production, changement de permissions. Tout le reste peut être autorisé sans questions.</do>
  </b-finding>
</b-chapter>

<b-chapter id="seen" icon="eye" title="Ce que cela donnait au premier regard">
  <b-why align="left">L’observation de départ était simple : les agents s’arrêtent et demandent rarement, et le plus souvent devinent et continuent. Une chaîne de quatre hypothèses en est sortie, et chacune devait être vérifiée séparément.</b-why>
  <b-rules cols="2">
    <rule icon="shield-check" t="1. Le contrôle est à l’extérieur">Une porte et une question à une personne doivent vivre hors de l’agent, sinon il décidera seul.</rule>
    <rule icon="clock" t="2. Les agents sont entraînés à l’autonomie">Les agents sont entraînés et mesurés sur la durée de leur travail autonome : jusqu’où ils vont du début à l’arrêt sans personne.</rule>
    <rule icon="x" t="3. Une question est une perte">Le score donne 1 pour une tâche résolue et 0 pour une non résolue. Une question sans solution donne 0 alors qu’une supposition peut donner 1, donc demander ne rapporte pas.</rule>
    <rule icon="package" t="4. MCP est un goulot d’étranglement">Seuls une question et une réponse passent par MCP, et l’hôte décide du reste.</rule>
  </b-rules>
  <b-why align="left">Ensuite, dans l’ordre : ce que mesurent les benchmarks, ce que signifie « temps autonome », comment les agents demandent en pratique, ce que disent MCP et Claude Code. Les attentes et les résultats sont mis côte à côte dans un tableau vers la fin. D’abord, où se situe exactement la pénalité dans une telle métrique.</b-why>
</b-chapter>

<b-chapter id="penalty" icon="x" title="Pour quoi un agent est pénalisé : la métrique et ses formules">
  <b-why align="left">Deux schémas montrent quelle quantité baisse quand un agent s’arrête et demande. C’est une notation simplifiée selon le sens des métriques dans les sources ; les citations viennent dans les chapitres des vérifications.</b-why>
  <b-art names="agent-escalation-to-human/score-cases" wide/>
  <b-cap>Score par résultat : une bonne réponse donne 1, une mauvaise et un arrêt sans solution donnent 0.</b-cap>
  <b-why align="left">La pénalité tombe sur le résultat inachevé : un arrêt sans solution reçoit le même 0 qu’une erreur. Si un canal existe et que la tâche est résolue après la réponse, la question rapporte même, et c’est ainsi que HiL-Bench est construit.</b-why>
  <b-art names="agent-escalation-to-human/turn-cut" wide/>
  <b-cap>Une question coupe le tour : un exemple inventé de 60 minutes.</b-cap>
  <b-why align="left">Chez Anthropic, une question termine le tour mesuré. Le laboratoire lui-même appelle l’arrêt d’un agent une supervision.</b-why>
  <b-finding>
    <ex>Un agent passe quarante minutes à réparer un export, tombe sur deux manières également valables et interroge une personne. Dans une notation par résultat, la question ne coûte rien tant que la tâche est résolue ensuite. Dans une notation par durée du tour, elle coupe 60 minutes en 40 et 20.</ex>
    <gen>La pénalité se trouve à deux endroits : le zéro d’une tâche non résolue et la coupure d’un tour à une question. Aucune des métriques examinées ne retranche quelque chose pour la question elle-même.</gen>
    <do>Écrire la formule de sa propre métrique : ce qui se trouve au numérateur et ce qui arrive au score si l’agent s’est arrêté et a demandé.</do>
  </b-finding>
</b-chapter>

<b-chapter id="measure" icon="gauge" title="Vérification : ce que mesurent les benchmarks d’autonomie et la place d’une personne dedans">
  <b-why align="left">L’autonomie se mesure de différentes façons, et la façon décide si une métrique peut voir un arrêt pour poser une question. Dans l’ordre ci-dessous : l’image d’une métrique avec une ligne d’arrivée, l’horizon de METR, les benchmarks classiques et les métriques où une question compte.</b-why>
  <b-art names="agent-escalation-to-human/finish-line" wide/>
  <b-cap>La métrique marque l’arrivée ; le chemin d’une question vers une personne n’entre pas dans le décompte.</b-cap>
  <b-subhead>L’horizon de METR : combien de temps une tâche prend à une personne</b-subhead>
  <b-why align="left">METR définit l’horizon comme le temps que les personnes mettent en général sur des tâches que le modèle résout avec 50 % de réussite<b-proof href="https://arxiv.org/abs/2503.14499" quote="METR, arXiv 2503.14499: „the time humans typically take to complete tasks that AI models can complete with 50% success rate“"/>. Le temps d’une tâche vient des exécutions humaines réussies. L’ensemble ne contient aucune tâche impliquant une demande à une personne, et METR avertit lui-même que l’horizon n’est pas la durée du travail indépendant<b-proof href="https://metr.org/notes/2026-01-22-time-horizon-limitations/" quote="METR, 22.01.2026: „Time horizon is not the length of time AIs can work independently“; „We have no tasks involving multi-turn interaction with a human so there is no right answer.“"/>. Dans le rapport du 19 mai 2026, le meilleur modèle partagé a obtenu 16 à 20 heures au niveau de 50 % et 3 à 4 heures au niveau de 80 %<b-proof href="https://metr.org/blog/2026-05-19-frontier-risk-report/" quote="METR, Frontier Risk Report: „the 50% time horizon point estimate of the most capable shared model was between 16 and 20 hours“"/>.</b-why>
  <b-codebox title="Comment l’horizon de METR est calculé">
    p(success | task of length t) = σ( (ln h − ln t) · β )
    h — the horizon: the task length at which p = 0.5
    t — the geometric mean of successful human run times
  </b-codebox>
  <b-why align="left">La méthode de METR est une courbe logistique sur la longueur des tâches, l’horizon étant pris au point de 50 % (ou 80 %)<b-proof href="https://arxiv.org/abs/2503.14499" quote="METR, arXiv 2503.14499: „we use logistic regression to find the task difficulty at which the agent has a 50% chance of success“"/>. Le temps propre de l’agent ne figure nulle part dans la formule.</b-why>
  <b-art names="agent-escalation-to-human/horizon" wide/>
  <b-cap>Heures de tâche du meilleur modèle : au niveau de 50 % et au niveau de 80 %.</b-cap>
  <b-subhead>Benchmarks de tâches : aucune personne dedans</b-subhead>
  <b-why align="left">SWE-bench note par des tests : « the percentage of task instances that are resolved »<b-proof href="https://arxiv.org/abs/2310.06770" quote="SWE-bench: „The metric for our benchmark is the percentage of task instances that are resolved.“"/>. Dans OSWorld, Terminal-Bench, GAIA et Cybench, c’est un script, un test ou un drapeau qui juge, et il n’y a pas de canal vers une personne. L’expression « minimal human intervention » dans ces articles décrit un objectif ou la croissance de l’ensemble, et n’est pas une métrique. Dans tau-bench, la récompense est 0 ou 1 selon la base de données finale, et un transfert à une personne est une action ordinaire : dans certaines tâches, il fait partie de la référence, dans les autres la base ne correspondra pas.</b-why>
  <b-subhead>Métriques où une question compte : HiL-Bench, HAS-Bench, Anthropic</b-subhead>
  <b-why align="left">Ces trois sources comptent une question différemment, le contraste le plus net vient donc en premier : ce qui arrive à un modèle quand une tâche ne peut pas être résolue sans demander.</b-why>
  <b-art names="agent-escalation-to-human/hil-bench" wide/>
  <b-cap>Quand la partie manquante doit être trouvée en interrogeant une personne, la part de tâches résolues chute de plusieurs fois.</b-cap>
  <b-why align="left">HiL-Bench, de Scale AI, est construit pour qu’une tâche ne puisse pas être résolue sans demander. Les auteurs écrivent que les benchmarks ordinaires sont aveugles à cet échec<b-proof href="https://arxiv.org/abs/2604.09408" quote="HiL-Bench, 04.05.2026: „an agent that makes a lucky guess for a missing requirement will score identically to one that would have asked to be certain“"/>. Avec une fonction « demander à une personne », les meilleurs modèles résolvent de 1 à 39 % des tâches, contre 67 à 91 % avec l’information complète. La récompense d’entraînement : +0,3 pour une question pertinente et −0,1 pour une question superflue. HAS-Bench introduit la part d’intervention humaine comme chiffre descriptif<b-proof href="https://arxiv.org/abs/2607.04329" quote="HAS-Bench, 05.07.2026: „HIR is a descriptive cost/intensity metric. Higher HIR means more human involvement, not necessarily better task performance.“"/>. Dans son travail sur l’autonomie en production, Anthropic compte séparément les interventions et les arrêts initiés par l’agent, et appelle ces arrêts une forme de supervision<b-proof href="https://www.anthropic.com/research/measuring-agent-autonomy" quote="Anthropic, 18.02.2026: „agent-initiated stops are an important kind of oversight in deployed systems.“"/>.</b-why>
  <b-codebox title="Trois façons de compter une question">
    HiL-Bench:  r_question = +0.3 if the question targets something missing
                r_question = −0.1 if it is extra or a repeat
                a task counts only when everything missing is resolved
    HAS-Bench:  HIR = steps done by people / all steps   (a description, not a penalty)
    Anthropic:  an agent stop counts as oversight, an intervention separately
  </b-codebox>
  <b-art names="agent-escalation-to-human/metrics" wide/>
  <b-cap>Quatre façons de traiter la question d’un agent : pas de canal, neutre, récompense, forme de supervision.</b-cap>
  <b-why align="left">Ce résumé réunit les quatre façons : le même travail d’agent, alors qu’une métrique peut ne pas voir une question, la récompenser ou la compter comme supervision.</b-why>
  <b-finding>
    <ex>Le même agent ne peut pas demander dans SWE-bench, demande pour une récompense dans HiL-Bench, et dans les métriques de production d’Anthropic son arrêt est enregistré comme supervision. Il y a plus d’une métrique, et une demande à une personne est enregistrée différemment dans chacune.</ex>
    <gen>L’affirmation « les métriques d’autonomie punissent une question » est fausse comme règle générale. Ce qui tient est plus étroit : les benchmarks classiques ne prévoient pas de question, et un arrêt sans solution équivaut à un échec.</gen>
    <do>Poser la question pour sa propre métrique d’autonomie : qu’enregistre-t-elle quand l’agent s’est arrêté et a demandé : succès, échec ou rien.</do>
  </b-finding>
</b-chapter>

<b-chapter id="time" icon="clock" title="Ce qui compte comme temps autonome chez METR, Anthropic et DeepMind">
  <b-why align="left">L’expression « temps autonome » signifie trois choses différentes dans trois laboratoires, et cela décide si la question d’un agent à une personne nuit à la métrique. Ci-dessous, tour à tour : ce que compte METR, ce que compte Anthropic et ce que compte Google DeepMind.</b-why>
  <b-art names="agent-escalation-to-human/three-clocks" wide/>
  <b-cap>Trois mesures : les heures d’une personne sur la tâche, un tour du début à l’arrêt, une tâche sans intervention humaine.</b-cap>
  <b-why align="left">« Travailler seul » peut se mesurer de trois façons. La première : combien d’heures une tâche prend à une personne, une tâche que l’agent résout. La deuxième : jusqu’où l’agent va du début à l’arrêt. La troisième : quelle part des tâches est faite sans intervention humaine. Les formules des trois sont ci-dessous.</b-why>
  <b-subhead>METR : la difficulté d’une tâche, le temps propre de l’agent n’est pas dans la métrique</b-subhead>
  <b-why align="left">METR répond lui-même à la question de savoir si c’est le temps du travail indépendant<b-proof href="https://metr.org/notes/2026-01-22-time-horizon-limitations/" quote="METR, 22.01.2026: „Time horizon is not the length of time AIs can work independently. Rather, it's the amount of serial human labor they can replace with a 50% success rate.“"/>. La FAQ de la page des horizons dit la même chose : elle mesure la difficulté d’une tâche, et le temps que l’IA y passe n’en fait pas partie<b-proof href="https://metr.org/time-horizons" quote="METR, FAQ: „It’s a measure of the difficulty of a task, rather than the time an AI spends to complete the task.“"/>. METR ne publie pas le temps propre de l’agent : il varie beaucoup selon le fournisseur du modèle et la configuration de l’agent.</b-why>
  <b-subhead>Anthropic : le tour d’un agent du début à l’arrêt</b-subhead>
  <b-why align="left">Dans son travail sur l’autonomie en production, le temps est compté mécaniquement à partir de la télémétrie de Claude Code : du début du travail jusqu’à un arrêt, et un arrêt peut être une question à une personne<b-proof href="https://www.anthropic.com/research/measuring-agent-autonomy" quote="Anthropic, 18.02.2026: „tracking how much time has elapsed between when Claude starts working and when it stops (whether because it finished the task, asked a question, or was interrupted by the user)“"/>. Ainsi, la question d’un agent coupe le tour et raccourcit formellement le temps mesuré. Les auteurs précisent eux-mêmes que la durée du tour est un indicateur imparfait de l’autonomie.</b-why>
  <b-why align="left">Anthropic ne traite pas un arrêt pour demander comme un défaut. Selon lui, sur les tâches plus difficiles, Claude limite sa propre autonomie en s’arrêtant pour consulter l’humain, et une note ajoute que poser une question à l’utilisateur est en soi une forme d’agentivité<b-proof href="https://www.anthropic.com/research/measuring-agent-autonomy" quote="Anthropic: „stopping to ask the user a question is itself a form of agency“"/>. Seule compte une question bloquante du genre « j’en ai besoin pour continuer » ; une question comme « je commite ? » après une tâche terminée n’est pas un arrêt.</b-why>
  <b-subhead>Google DeepMind : la tâche est faite sans intervention humaine</b-subhead>
  <b-why align="left">DeepMind n’a pas de métrique de durée du tour. Dans « Levels of AGI », l’autonomie est décrite par niveaux, de « AI as a Tool » à « AI as an Agent », selon le style d’interaction plutôt que le temps, et la capacité de se tourner vers une personne fait partie du niveau supérieur : une IA entièrement autonome agit sans supervision continue mais sait quand consulter des humains<b-proof href="https://arxiv.org/abs/2311.02462" quote="Levels of AGI, arXiv 2311.02462: „such a fully autonomous AI can act in an aligned fashion without continuous human oversight, but knows when to consult humans“"/>. Dans le rapport du Frontier Safety Framework (octobre 2026), l’autonomie est définie comme « la tâche a été faite sans intervention humaine » : on regarde si l’agent a réussi seul et si une personne est intervenue, et la part de pull requests entièrement déléguées est passée de 7,5 % à 11,9 %<b-proof href="https://storage.googleapis.com/deepmind-media/gemini/gemini_4_argon_fsf_report.pdf" quote="Gemini 4 Argon FSF report: „whether the agent succeeded autonomously, and whether the human intervened or the outcome was otherwise negative or ambiguous“"/>. Une métrique distincte « l’agent a demandé à une personne » n’y a pas été trouvée.</b-why>
  <b-table>

| Qui | Ce qui compte comme autonome | Une question d’un agent à une personne |
|---|---|---|
| **METR** | difficulté de la tâche en heures humaines | pas d’événement de ce genre : les tâches n’ont pas de dialogue |
| **Anthropic** | durée du tour jusqu’à un arrêt | coupe le tour mais est appelée supervision |
| **Google DeepMind** | une tâche sans intervention humaine | n’est pas une intervention, non comptée séparément |

  </b-table>
  <b-finding>
    <ex>L’agent s’est arrêté et a demandé. Chez Anthropic, le tour s’est terminé là ; chez METR, il n’y a pas d’événement de ce genre ; et DeepMind regarde si une personne est intervenue de son propre chef.</ex>
    <gen>La question d’un agent ne raccourcit que le tour chez Anthropic, et même là elle est appelée supervision. Les laboratoires comptent comme un moins l’intervention propre d’un humain.</gen>
    <do>Quand on annonce des heures de travail autonome pour un agent, demander de quelle mesure il s’agit : durée du tour, difficulté de la tâche ou part des tâches sans intervention.</do>
  </b-finding>
</b-chapter>

<b-chapter id="behavior" icon="eye" title="Vérification : les agents demandent-ils vraiment">
  <b-art names="agent-escalation-to-human/ask-rate" wide/>
  <b-cap>La part des sessions avec une question dans une étude : de zéro à la moitié.</b-cap>
  <b-why align="left">Il n’y a pas de part unique ; le résultat dépend du modèle, du prompt et du harness. Sans permission de demander, les modèles sont presque muets : dans Ambig-SWE (500 tâches de SWE-bench), « without explicit prompting, models almost never interact »<b-proof href="https://arxiv.org/abs/2502.13069" quote="Ambig-SWE, arXiv 2502.13069: „Without explicit prompting, models almost never interact, even for severely underspecified inputs.“"/>. Avec un prompt, Sonnet 4 demande dans 82 % des cas sur des tâches sous-spécifiées, dans 3 % sur des tâches complètes. Le graphique ci-dessus montre « Ask Early, Ask Late, Ask Right », un autre ensemble : Sonnet 4.5 a demandé dans 23 % des sessions, GPT-5.2 dans 52 %, Gemini 3 Flash dans 0 %, et aucun modèle n’a demandé dans la meilleure fenêtre, vers 10 % de l’exécution (arXiv 2605.07937).</b-why>
  <b-why align="left">L’extrême opposé existe aussi. Dans LHAW (arXiv 2602.10525), GPT-5.2 demande dans 81 à 97 % des exécutions avec peu de bénéfice par question, et dans « Ask or Assume » (arXiv 2603.26233), Sonnet 4.5 demande dans 73,8 % des tâches. Les personnes sont elles aussi surchargées : d’après les données d’Anthropic sur le mode auto, les utilisateurs acceptent 93 % des demandes de permission, et l’article parle directement de fatigue de confirmation<b-proof href="https://www.anthropic.com/engineering/claude-code-auto-mode" quote="Anthropic, 25.03.2026: „users accept 93%“ of permission requests"/>.</b-why>
  <b-art names="agent-escalation-to-human/ask-extremes" wide/>
  <b-cap>Deux extrêmes : silencieux et devinant, ou inondant de questions.</b-cap>
  <b-why align="left">La cause « l’entraînement récompense l’achèvement » est avancée par les auteurs de plusieurs articles, mais il n’existe pas de mesure pour les agents. Un article voisin de Kalai et al. (arXiv 2509.04664) montre qu’avec une notation binaire s’abstenir ne rapporte pas, et 9 des 10 benchmarks vérifiés sont binaires, SWE-bench compris. Cet article porte sur la réponse « je ne sais pas » ; la transposer à une question à une personne reste une analogie.</b-why>
  <b-finding>
    <ex>Un agent sans permission de demander reste silencieux et devine, alors qu’un agent avec permission inonde une personne de questions. Les deux cas figurent dans les mesures, il faut donc fixer les conditions : quand demander et à quelle fréquence.</ex>
    <gen>« Les agents ne demandent pas » et « les agents demandent trop » sont vrais tous les deux, selon les modèles et les réglages.</gen>
    <do>Donner à l’agent un seuil explicite : « demande si la décision est irréversible ou si tu as deux lectures égales de la tâche ; décide seul du reste ».</do>
  </b-finding>
</b-chapter>

<b-chapter id="mcp" icon="package" title="Vérification : ce que dit MCP de l’elicitation">
  <b-why align="left">L’elicitation est la manière dont un serveur MCP demande des données supplémentaires à une personne par l’intermédiaire du client<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28/client/elicitation" quote="MCP specification: „The Model Context Protocol (MCP) provides a standardized way for servers to request additional information from users through the client during interactions.“"/>. Ci-dessous, les faits de la version 2026-07-28 et ce qui y a changé.</b-why>
  <b-rules cols="2">
    <rule icon="check" t="Trois réponses">Accept : la personne a approuvé et envoyé des données. Decline : la personne a explicitement dit « non ». Cancel : la personne a fermé la fenêtre sans choisir<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28/client/elicitation#response-actions" quote="MCP specification: „Decline (action: 'decline'): User explicitly declined the request“; „Cancel (action: 'cancel'): User dismissed without making an explicit choice“"/>. Le serveur doit gérer un refus et une annulation<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28/client/elicitation#error-handling" quote="MCP specification: „Servers SHOULD NOT assume that elicitation requests will always succeed, and MUST handle cases where the user declines or cancels the elicitation“"/>.</rule>
    <rule icon="layers" t="Deux modes">Form : un schéma plat avec des champs simples, le client voit les données. URL : la personne est envoyée vers une adresse externe et les données ne passent ni par le client ni par le modèle. Demander des mots de passe, des clés et des données de paiement par un formulaire est interdit, et le mode URL existe pour eux<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28/client/elicitation#user-interaction-model" quote="MCP specification: „Servers MUST NOT use form mode elicitation to request sensitive information such as passwords, API keys, access tokens, or payment credentials.“"/>.</rule>
    <rule icon="refresh" t="Nouveau dans 2026-07-28">Un serveur n’envoie plus de requête de sa propre initiative : il répond à une requête du client par un résultat « input required », le client recueille la réponse et répète la requête<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28/basic/patterns/mrtr" quote="MCP specification: „Servers MUST send server-to-client requests (such as roots/list, sampling/createMessage, or elicitation/create) using the MRTR pattern. The previous pattern of server-initiated requests is no longer supported.“"/>. Sampling, Roots et Logging sont marqués comme dépréciés (SEP-2577).</rule>
    <rule icon="user" t="Humain dans la boucle">Pour l’elicitation, le client doit montrer quel serveur demande, proposer refuser et annuler, et laisser la personne relire et modifier une réponse de formulaire. Pour les appels de fonctions et le sampling, la formulation est plus douce : « SHOULD always be a human in the loop »<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28/server/tools#user-interaction-model" quote="MCP specification: „For trust & safety and security, there SHOULD always be a human in the loop with the ability to deny tool invocations.“"/>.</rule>
  </b-rules>
  <b-why align="left">Les deux modes diffèrent sur un point : qui voit la réponse de la personne. L’image le montre.</b-why>
  <b-art names="agent-escalation-to-human/elicit-modes" wide/>
  <b-cap>Form et URL : qui voit la réponse de la personne.</b-cap>
  <b-why align="left">Ce que la spécification n’a pas. Elle ne permet ni n’interdit à un client ou à un agent de répondre à la place d’une personne : le mot « user » figure partout, et aucune interface n’est imposée (« the protocol itself does not mandate any specific user interaction model »). Il n’y a pas non plus de sanctions pour une telle réponse automatique, et la spécification le dit elle-même<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28" quote="MCP specification: „While MCP itself cannot enforce these security principles at the protocol level, implementors SHOULD: 1. Build robust consent and authorization flows into their applications“"/>. Les mots « bottleneck » ou « limitation » n’apparaissent pas dans la spécification.</b-why>
  <b-finding>
    <ex>Un serveur de paiement demande de confirmer un virement. Si le client appuie lui-même sur « accept », le protocole ne le remarquera pas : le contrôle reste à l’hôte et à ses réglages.</ex>
    <gen>MCP décrit comment demander et quelles réponses existent, mais qui répond et si l’on peut répondre à la place d’une personne est décidé par le client.</gen>
    <do>Vérifier son client : un agent ou un script peut-il répondre à une elicitation à la place d’une personne. Si oui, l’interdire pour les serveurs dangereux.</do>
  </b-finding>
</b-chapter>

<b-chapter id="cc" icon="shield-check" title="Vérification : modes, hooks et question à une personne dans Claude Code">
  <b-art names="agent-escalation-to-human/hook-vs-text" wide/>
  <b-cap>Un hook et les règles de permission sont imposés par le programme. Le texte d’instruction reste un conseil.</b-cap>
  <b-why align="left">La documentation de Claude Code le dit directement : les règles de permission sont imposées par le programme Claude Code, et les instructions d’un prompt ou de CLAUDE.md ne changent pas ce qu’il autorise<b-proof href="https://code.claude.com/docs/en/permissions" quote="Claude Code docs: „Permission rules are enforced by Claude Code, not by the model. Instructions in your prompt or CLAUDE.md shape what Claude tries to do, but they don't change what Claude Code allows.“"/>.</b-why>
  <b-subhead>Modes : combien de questions atteignent une personne</b-subhead>
  <b-why align="left">La personne choisit le mode au lancement : il décide combien de questions lui parviennent.</b-why>
  <b-art names="agent-escalation-to-human/modes-ladder" wide/>
  <b-cap>Six modes de « demande tout » à « ne demande rien », et ce qui n’est pas approuvé automatiquement.</b-cap>
  <b-why align="left">Même dans le mode le plus libre, certaines choses ne sont pas approuvées automatiquement : la fonction intégrée AskUserQuestion, les fonctions MCP marquées comme nécessitant une interaction de l’utilisateur, et les règles « ask »<b-proof href="https://code.claude.com/docs/en/permission-modes" quote="Claude Code docs: „Claude Code doesn't auto-approve the following in any mode, including `bypassPermissions`“ — among them explicit `ask` rules and „Tools that require user interaction: the built-in `AskUserQuestion` tool and MCP tools marked `requiresUserInteraction`“"/>. Une permission ne peut pas être obtenue d’une personne après coup : pas de personne, pas de réponse.</b-why>
  <b-subhead>Hooks : décider s’il faut demander</b-subhead>
  <b-why align="left">Le hook PreToolUse répond avant un appel de fonction par l’une de quatre décisions : allow, deny, ask ou defer<b-proof href="https://code.claude.com/docs/en/hooks" quote="Claude Code docs: „PreToolUse hooks can control whether a tool call proceeds. [...] four outcomes (allow, deny, ask, or defer)“"/>. Avec plusieurs hooks, l’ordre est : deny l’emporte sur defer, defer sur ask, ask sur allow. La décision « defer » est pour les exécutions sans interface : le programme appelant met Claude en pause, recueille la réponse par sa propre interface et reprend au même endroit. Le hook Elicitation le relie à MCP : il répond à une requête de serveur par accept, decline ou cancel, et sans interface une requête non traitée est annulée.</b-why>
  <b-why align="left">Une limite pour les sous-agents : AskUserQuestion leur est toujours retirée. Dans une exécution sans interface, un appel qui nécessiterait une question est rejeté, sauf s’il y a une règle allow, un hook ou un hôte pour les requêtes. Une exécution autonome sans règles configurées reçoit donc un refus, et la réponse d’une personne ne viendra pas.</b-why>
  <b-art names="agent-escalation-to-human/night-run" wide/>
  <b-cap>Sans personne, une question devient un rapport devant une porte fermée.</b-cap>
  <b-why align="left">Voici à quoi ressemble l’escalade sans personne : un arrêt et une raison consignée au lieu d’une supposition.</b-why>
  <b-finding>
    <ex>Une exécution de nuit sur un serveur de build. L’agent veut publier un build et personne ne peut être interrogé. En mode dontAsk, l’appel est rejeté, l’agent écrit un rapport de blocage, et le matin une personne le voit au lieu d’un contournement silencieux.</ex>
    <gen>Dans une exécution autonome, l’escalade passe d’une question à un rapport de blocage : l’agent s’arrête, consigne la raison et attend.</gen>
    <do>Pour les exécutions de nuit, fixer des règles « deny » explicites pour les actions dangereuses et exiger de l’agent un fichier de blocages au lieu d’une supposition silencieuse.</do>
  </b-finding>
</b-chapter>

<b-chapter id="narrow" icon="workflow" title="Ce qui en est sorti : pourquoi une porte et l’escalade ne tiennent pas entièrement dans MCP">
  <b-why align="left">L’hôte garde toute la conversation, et un serveur ne reçoit que ce dont il a besoin. Dans la spécification, c’est le troisième principe d’architecture<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28" quote="MCP specification: „Servers should not be able to read the whole conversation, nor 'see into' other servers.“ / „Full conversation history stays with the host“"/>. Un serveur local s’exécute avec les privilèges du client<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28/basic/security_best_practices#local-mcp-server-compromise" quote="MCP specification: „MCP servers run with the same privileges as the client“"/>. J’en tire moi-même une conclusion : une requête et une réponse passent par MCP, et tout le reste reste du côté de l’hôte.</b-why>
  <b-art names="agent-escalation-to-human/barrier-intercom" wide/>
  <b-cap>L’hôte place la barrière, MCP fournit l’interphone ; un contournement consiste à répondre pour la personne.</b-cap>
  <b-why align="left">Ce qui passe exactement par MCP et ce qui reste du côté de l’hôte est listé ci-dessous.</b-why>
  <b-rules cols="2">
    <rule icon="package" t="Par MCP">un appel de fonction, un résultat selon un schéma, une demande de données à une personne, les permissions du serveur</rule>
    <rule icon="shield-check" t="Hors de MCP">les hooks du client, les modes de permission, le bac à sable, l’historique de la conversation, le dialogue propre de la personne avec l’agent</rule>
  </b-rules>
  <b-why align="left">Une partie d’une porte vit donc dans MCP : la demande à une personne, les permissions, le schéma du résultat. L’autre partie se trouve dans l’hôte : hooks et modes. La décision unique « demander » est assemblée à partir des deux parties, et s’il ne reste que MCP, la règle par défaut se heurte au fait qu’un client peut répondre pour une personne. C’est la fenêtre étroite : une question y tient, alors que la décision « faut-il demander » est prise à l’extérieur.</b-why>
  <b-finding>
    <ex>Un serveur MCP peut interroger une personne sur un virement d’argent. Que le client montre la question ou réponde lui-même est déterminé par le client et ses hooks.</ex>
    <gen>Une porte et l’escalade sont assemblées à partir de deux endroits : la fenêtre dans MCP et les règles dans l’hôte. Chacune seule laisse un trou.</gen>
    <do>Pour chaque opération dangereuse, vérifier les deux côtés : le serveur peut demander, et le client ne peut pas répondre à la place d’une personne.</do>
  </b-finding>
</b-chapter>

<b-chapter id="claims" icon="target" title="Attendu et trouvé">
  <b-why align="left">Les quatre hypothèses du début, vérifiées contre le texte des documents et des articles eux-mêmes. Tout ce qui n’a pas pu être ouvert ou vérifié en entier est marqué.</b-why>
  <b-art names="agent-escalation-to-human/thesis-check" wide/>
  <b-cap>Le verdict sur chacune des quatre hypothèses.</b-cap>
  <b-why align="left">Les détails sont dans le tableau : ce qui était attendu, le résultat et ce qui a été trouvé.</b-why>
  <b-table>

| Ce que cela donnait | Résultat | Ce qui a été trouvé |
|---|---|---|
| **Une porte se tient hors du contexte de l’agent** | <b-status-dot color="accent">oui</b-status-dot> | un juge à l’intérieur de la boucle a obtenu 86,7 contre 113,0 pour un contrôle de l’extérieur (arXiv 2607.25152, essai pilote). Dans Claude Code, la documentation elle-même distingue le texte d’instruction des règles imposées par le programme |
| **Les agents sont entraînés et mesurés sur la durée d’exécution autonome** | <b-status-dot color="accent">en partie</b-status-dot> | METR mesure un horizon de tâche : 16 à 20 heures à 50 % de réussite pour le meilleur modèle partagé. Comment exactement Anthropic et Google DeepMind entraînent pour un long horizon n’a pas été trouvé dans les documents publics |
| **Pour les métriques, une question à une personne est une perte, donc demander ne rapporte pas** (la pénalité : 0 pour une tâche non résolue et un tour coupé) | <b-status-dot color="warn">non</b-status-dot> | les benchmarks classiques n’ont pas de canal vers une personne, et un arrêt sans solution compte comme un échec. Dans tau-bench, un transfert inutile à une personne vaut 0. Les métriques qui comptent une question la récompensent (HiL-Bench) ou la traitent comme neutre (HAS-Bench). Aucune formulation du genre « une question est une perte » n’a été trouvée. Il n’existe pas de mesure « avant et après un entraînement à l’achèvement » |
| **MCP est un goulot d’étranglement** | <b-status-dot color="warn">dans le sens</b-status-dot> | Il n’y a pas de citation directe : la spécification n’a pas de mots comme « bottleneck ». Elle dit en revanche que le protocole ne peut pas imposer lui-même les principes de sécurité, et que l’hôte assure l’isolation |

  </b-table>
  <b-why align="left">Le tableau donne un seul résultat : l’hypothèse sur la punition d’une question est la seule que les sources n’ont pas confirmée, et c’est elle qui tenait toute la chaîne.</b-why>
  <b-finding>
    <ex>L’hypothèse sur la punition d’une question paraissait convaincante, or le seul cas réel trouvé est celui des benchmarks sans canal vers une personne. C’est autre chose : une question y est impossible, et il n’y a rien à punir.</ex>
    <gen>Si une métrique ne prévoit pas de question, s’entraîner dessus n’apprend pas à demander. Cela découle de la construction de la métrique, et il n’y a pas de preuve directe d’un effet sur le comportement.</gen>
    <do>Avant de conclure pourquoi un agent se comporte d’une certaine manière, trouver une mesure : le même agent comparé avant et après l’entraînement. Sans elle, il ne reste qu’une hypothèse.</do>
  </b-finding>
</b-chapter>

<b-chapter id="start" icon="flag" title="Comment démarrer : quatre étapes et des prompts prêts pour l’agent">
  <b-why align="left">Les étapes vont du moins coûteux au plus approfondi. Les deux premières suffisent pour que l’escalade cesse de dépendre de l’humeur de l’agent.</b-why>
  <b-rules cols="2">
    <rule icon="checklist" t="1. Liste des arrêts">Écrire dans un fichier quelles actions exigent que l’agent s’arrête et demande.</rule>
    <rule icon="shield-check" t="2. Règles et hook">Mettre les actions dangereuses en « deny » ou « ask » via les permissions et un hook PreToolUse.</rule>
    <rule icon="package" t="3. Permissions sur le serveur MCP">Ne distribuer les fonctions dangereuses qu’avec la portée (scope) requise.</rule>
    <rule icon="clock" t="4. Journal des questions">Compter combien de fois l’agent a demandé, combien de fois inutilement et combien de fois il s’est tu alors qu’il aurait dû demander.</rule>
  </b-rules>
  <b-why align="left">Le premier prompt recueille la liste des arrêts : c’est l’étape 1.</b-why>
  <b-prompt>
    Crée un fichier escalation.md listant les cas où l’agent doit s’arrêter et me demander : actions irréversibles,
    mise en production, changements de permissions, deux lectures égales de la tâche. Pour chaque cas, écris quelle question poser et quelle réponse vaut accord.
    L’agent décide lui-même de tout le reste.
  </b-prompt>
  <b-why align="left">Le deuxième prompt transforme la liste en règles de hook : c’est l’étape 2.</b-why>
  <b-prompt>
    Configure un hook PreToolUse dans .claude/settings.json : pour les commandes de escalation.md, réponds « ask » ; pour les commandes clairement dangereuses, réponds « deny »
    avec une raison que l’agent verra. Montre le fichier final et un exemple d’appel où le hook s’est déclenché.
  </b-prompt>
  <b-why align="left">Le troisième prompt vérifie si le client peut répondre pour une personne : c’est l’étape 3.</b-why>
  <b-prompt>
    Vérifie mon client MCP : un agent ou un script peut-il répondre à une demande de données destinée à une personne à ma place. Si oui, propose un réglage
    qui l’empêche pour les serveurs à fonctions dangereuses.
  </b-prompt>
  <b-why align="left">Voici ce que cela donne après les deux premières étapes.</b-why>
  <b-finding>
    <ex>Une semaine plus tard, le journal montrait : sur dix questions, huit portaient sur le renommage de fichiers. La liste des arrêts a été réduite aux actions irréversibles, et les questions sont tombées à deux par jour.</ex>
    <gen>L’escalade se règle par le journal : trop de questions mangent l’attention d’une personne, trop peu laissent les suppositions de l’agent.</gen>
    <do>Faire les étapes 1 et 2 pour une tâche aujourd’hui, et démarrer le journal dans une semaine à partir de vraies questions.</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Questions fréquentes">
  <b-faq-cards>
    <q t="Qu’est-ce que l’escalade vers un humain pour les agents IA ?">Un arrêt où l’agent ou le programme autour de lui confie une décision à une personne : par une question, une demande de permission ou une confirmation. Les règles et les hooks prennent la décision « demander », et la personne donne la réponse.</q>
    <q t="Qu’est-ce que l’elicitation dans MCP ?">La manière dont un serveur MCP demande à une personne de fournir des données par l’intermédiaire du client. Il y a trois réponses : accepter, refuser et annuler. Demander des mots de passe et des clés dans un formulaire est interdit, et un mode à adresse externe existe pour eux.</q>
    <q t="Les métriques d’autonomie punissent-elles un agent qui interroge une personne ?">La pénalité vient d’un résultat inachevé : 0 au lieu de 1, et chez Anthropic une question coupe le tour. Une soustraction pour la question elle-même n’a pas été trouvée. Les benchmarks classiques n’ont simplement pas de canal vers une personne. Les récents HiL-Bench et le travail d’Anthropic récompensent une question ou la traitent comme une supervision, et HAS-Bench la traite de façon neutre.</q>
    <q t="Une porte et l’escalade peuvent-elles être intégrées entièrement dans MCP ?">Non. MCP transporte une question et une réponse, alors que la décision de montrer la question à une personne ou de répondre automatiquement est prise par l’hôte : ses hooks, ses modes de permission et le client. Le protocole lui-même ne peut pas imposer cette décision.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="À lire ensuite">
  <b-links>
    <item href="/blog/quality-gates-ai-agents/" k="Portes" t="Que sont les portes de qualité pour les agents IA">un poste d’accueil qui dit « terminé »</item>
    <item href="/blog/agent-checkpoint/" k="Vérification" t="Où placer la vérification du travail d’un agent">frontière de l’agrégat et théorème de Rice</item>
    <item href="/blog/mcp-agent-access/" k="MCP" t="MCP pour un agent IA">quel problème il résout et comment le connecter</item>
    <item href="/blog/mcp-scopes/" k="MCP" t="Portées MCP dans Claude Code">local, projet et utilisateur</item>
    <item href="/blog/harness-driven-development/" k="Harness" t="Harness engineering en pratique">guides, capteurs et la boucle « erreur — règle »</item>
    <item href="/blog/ai-agent-maturity-levels/" k="Maturité" t="Niveaux de maturité des agents IA">du chat aux spécifications, skills, code et système</item>
  </b-links>
</b-chapter>
<b-footer>Faits : état au 14 novembre 2026, d’après les documents et articles liés par les marques ↗. Les pages d’openai.com et la publication de METR sur un réseau social ne se sont pas ouvertes, le chiffre d’OpenAI sur la part des tâches sans intervention n’est donc pas utilisé ici. Certaines citations sur les questions des agents et sur METR ont été vérifiées à travers un résumé de page ; les comparer à l’original avant de les citer. Les exemples avec une configuration, un serveur de paiement et une exécution de nuit sont hypothétiques.</b-footer>
</b-post>
