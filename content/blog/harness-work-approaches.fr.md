---
title: Comment travailler avec un harness : la boucle de réponse et la revue qui corrige la requête d'origine
date: 2026-09-28
updated: 2026-11-08
description: Que faire quand une réponse de l'IA rate sa cible : trois voies et une boucle répétée. Comment la revue trouve les lacunes, pourquoi elles vont dans la requête d'origine et pourquoi tout le pipeline repart. D'après les guides d'Anthropic, d'OpenAI et de Google.
tags: IA, harness, prompts, revue
category: prompts
layout: wide
toc: iterate=Si la réponse rate | review=Revue de la réponse | faq=Questions | next=Pour aller plus loin
---

Quand une réponse de l'IA rate sa cible, il y a trois voies : préciser dans le même chat, réécrire la requête d'origine, ou demander d'abord au modèle de poser des questions. Quand une revue trouve une lacune, elle va dans la requête d'origine et tout le cycle repart : modification, tests, revue. La requête devient complète, et la prochaine tâche du même genre part de celle-ci. Ci-dessous, les deux approches d'après les guides d'Anthropic, d'OpenAI et de Google.

<b-post series="prompts">
<b-flow lead label="Deux approches : la boucle de réponse et la revue qui corrige la requête">
  <b-lane title="Réponse ratée" color="muted">
    <node icon="x" t="Réponse">hors sujet</node>
    <node icon="refresh" t="L'une des trois voies">préciser, refaire, demander</node>
    <node icon="ai-box" t="Nouvelle réponse">revérifiée</node>
  </b-lane>
  <b-lane title="La revue a trouvé une lacune" color="accent">
    <node icon="file" t="Requête v1">la tâche d'origine</node>
    <node icon="search" t="Revue">deux lacunes</node>
    <node icon="check" t="Requête v2">et tout le pipeline de nouveau</node>
  </b-lane>
</b-flow>
<b-cap>Les deux approches fonctionnent dans n'importe quel harness : un chat, Claude Code, Codex ou Cursor.</b-cap>

<b-chapter id="iterate" icon="refresh" title="Si la réponse rate sa cible">
  <b-art names="harness-work-approaches/answer-paths harness-work-approaches/answer-paths-mobile"/>
  <b-sublabel top="22">Voie 3 : trois questions et une nouvelle requête</b-sublabel>
  <b-sublabel top="16">Étape 1</b-sublabel>
  <b-prompt>
    [task description]
    Before doing the task, ask me 3 questions whose answers would improve the result the most. Do not start the work until I answer.
  </b-prompt>
  <b-sublabel top="12">Étape 2</b-sublabel>
  <b-why>Répondez aux questions du modèle avec vos propres mots, dans le même chat.</b-why>
  <b-sublabel top="12">Étape 3</b-sublabel>
  <b-prompt>
    Build a final prompt from the task and my answers: role, who and why, data, example, format, question at the end. Output only the prompt text.
  </b-prompt>
  <b-finding>
    <ex>Trois situations et une action pour chacune : préciser dans le même chat, refaire le prompt, ou obtenir d'abord des questions du modèle.</ex>
    <gen>
      Préciser conserve le contexte déjà donné et convient quand la tâche a été comprise. Si la tâche a été mal comprise, refaire le prompt est plus rapide.
      Si le modèle a inventé des faits, donnez-lui les données nécessaires dans la nouvelle requête et autorisez-le à dire « je ne sais pas »<b-proof href="https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations" quote="Anthropic: “Explicitly give Claude permission to admit uncertainty. This simple technique can drastically reduce false information” — platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations"/>.
      La nouvelle réponse est vérifiée de la même façon, et la boucle se répète jusqu'à ce qu'elle convienne.
      Les questions du modèle aident quand on ne sait pas quel contexte est nécessaire : l'ambiguïté laisse au modèle la marge de mal interpréter<b-proof href="https://claude.com/blog/best-practices-for-prompt-engineering" quote="Anthropic: “Don&#39;t assume the AI reads minds: Be specific about what you want. Leaving things ambiguous gives the AI room to misinterpret” — claude.com/blog/best-practices-for-prompt-engineering"/>,
      et quand l'intention n'est pas claire, les modèles demandent plus souvent des précisions<b-proof href="https://developers.openai.com/api/docs/guides/prompt-guidance" quote="OpenAI: “When the user&#39;s intent is unclear, the model is more likely to ask the user for clarification to proceed”; and “Before asking the user clarifying questions, you should complete the work that is already authorized from context” — developers.openai.com/api/docs/guides/prompt-guidance"/>.
    </gen>
    <do>Pour une nouvelle tâche dont le contexte reste incertain, commencez par demander trois questions. Envoyez le prompt final construit à partir des réponses comme nouvelle requête dans un nouveau chat.</do>
  </b-finding>
</b-chapter>

<b-chapter id="review" icon="search" title="Revue de la réponse : corriger la requête d'origine">
  <b-why>La voie « réécrire la requête » en exemple : la revue a trouvé des lacunes, la requête d'origine a perdu ce qui était faux et gagné ce qui manquait, et tout a été relancé.</b-why>
  <b-art names="harness-work-approaches/two-runs harness-work-approaches/two-runs-mobile"/>
  <b-finding>
    <ex>La revue a trouvé deux cas absents de la tâche : un préfixe international sans plus et une chaîne vide. La limite inutile « numéros russes uniquement » a été retirée de la requête d'origine, les deux cas ont été ajoutés, et tout le pipeline est reparti.</ex>
    <gen>
      Une lacune trouvée par la revue va dans la requête d'origine, et le cycle recommence : l'agent réécrit le code, les tests et la revue vérifient les nouveaux cas, et la précision reste dans la tâche pour les prochaines exécutions.
      Une passe de revue séparée, avec sa propre consigne, est décrite dans le guide de prompts de Google<b-proof href="https://www.kaggle.com/whitepaper-prompt-engineering" quote="Google, Prompt Engineering whitepaper: the code section, including review and debugging as a separate prompt — kaggle.com/whitepaper-prompt-engineering"/>.
    </gen>
    <do>Quand la revue trouve quelque chose, ajoutez-le à la requête d'origine et relancez tout le cycle : modification, tests, revue.</do>
  </b-finding>
  <b-cta href="/blog/harness-driven-development/" k="Étape suivante · HDD" t="Harness-Driven Development">Comment faire passer une lacune qui revient sans cesse de la requête aux règles du harness</b-cta>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Questions fréquentes">
  <b-faq-cards>
    <q t="Que faire quand une réponse de l'IA rate sa cible ?">Préciser dans le même chat si la tâche a été comprise ; réécrire la requête si elle a été mal comprise ; ou demander d'abord au modèle de poser des questions.</q>
    <q t="Pourquoi demander au modèle de poser des questions ?">Quand le contexte de la tâche est incertain, les questions du modèle montrent ce qui lui manque. La requête finale part dans un nouveau chat.</q>
    <q t="Que faire des constats de la revue ?">Les ajouter à la requête d'origine et relancer tout le cycle : modification, tests, revue.</q>
    <q t="Pourquoi modifier la requête d'origine ?">La requête devient alors complète, et la prochaine tâche du même genre part de celle-ci.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Pour aller plus loin">
  <b-links cols="2">
    <item href="/blog/specs-rules-skills/" k="Contexte" t="Specs, bible, règles et skills">Ce qu'un agent doit savoir d'un projet</item>
    <item href="/blog/harness-driven-development/" k="Méthode" t="Harness-Driven Development">Erreur de l'agent → règle de l'environnement</item>
    <item href="/blog/work-prompts-examples/" k="Pratique" t="Prompts pour les tâches de travail">Cinq parties et six exemples</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="Comparaison" t="Comparaison des harness">Claude Code, Codex, Cursor, Hermes et chat</item>
  </b-links>
</b-chapter>
<b-footer>Les techniques suivent les guides officiels d'Anthropic, d'OpenAI et de Google ; la source se trouve derrière l'icône à côté de chaque affirmation. Les citations du guide de Google sont paraphrasées.</b-footer>
</b-post>
