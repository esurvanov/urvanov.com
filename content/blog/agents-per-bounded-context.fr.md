---
title: Combien d'agents IA faut-il : le nombre d'agents croît avec le nombre de contextes délimités
date: 2026-10-10
updated: 2026-11-08
description: Un agent par contexte délimité : pourquoi il y a autant d'agents que de frontières de sens, comment cela passe à l'échelle, ce qui se trouve entre les agents et par où commencer.
tags: IA, agents, contexte délimité, DDD, architecture, passage à l'échelle, harness
category: harness
layout: wide
mentions: bounded context, multi-agent, AI agent, DDD, context map, contracts, scaling, harness
toc: idea=Un agent par contexte | scale=Passage à l'échelle | borders=Entre les agents | first=Par où commencer | faq=Questions | next=À lire ensuite
---

Combien d'agents IA faut-il ? Autant qu'il y a de contextes délimités : chaque frontière de sens reçoit son propre agent. Ci-dessous : pourquoi, comment cela passe à l'échelle, ce qui se trouve entre les agents et par où commencer.

<b-post series="harness">

<b-chapter id="idea" icon="ring-dot" title="Un agent par contexte">
  <b-why align="left">Il y a autant d'agents que de [contextes délimités](/materials/glossary/bounded-context/). Ainsi, un [agent](/materials/glossary/ai-agent/) dispose d'assez de contexte.</b-why>
  <b-lane title="Un seul pour tous ou un par contexte" color="accent">
    <iso-art name="agents-per-bounded-context/one-vs-per-context"></iso-art>
  </b-lane>
  <b-finding>
    <ex>« Commande » signifie des choses différentes dans la vente, la livraison et le paiement. Un seul agent mélange les sens, trois agents gardent chacun le leur.</ex>
    <gen>Une frontière de contexte montre déjà où le sens change. C'est un endroit pratique pour découper à la fois les specs et le travail des agents.</gen>
    <do k="Que faire">Listez les contextes du projet et notez à côté de chacun qui travaille à l'intérieur de ses frontières.</do>
  </b-finding>
</b-chapter>

<b-chapter id="scale" icon="chart-axes" title="Comment cela passe à l'échelle">
  <b-lane title="Charge et nombre d'agents" color="accent">
    <iso-art name="agents-per-bounded-context/load-chart"></iso-art>
  </b-lane>
  <b-finding>
    <ex>Huit contextes : un seul agent se noie dans les sens, tandis que huit agents travaillent chacun dans leurs propres frontières.</ex>
    <gen>Le nombre d'agents croît linéairement avec le nombre de contextes, tandis que la charge de chacun reste constante.</gen>
    <do k="Que faire">Ajoutez un agent en même temps qu'un nouveau contexte, au lieu de gonfler le contexte d'un seul agent.</do>
  </b-finding>
</b-chapter>

<b-chapter id="borders" icon="boxes-link" title="Ce qui se trouve entre les agents">
  <b-why align="left">Les agents communiquent par des contrats : événements et API. Un contexte étranger échappe à votre contrôle, donc l'agent n'y accède que par le contrat et avec votre confirmation. Pour juger de la complexité : [où la complexité est réelle](/blog/agent-hands-work-back-to-you/#hard).</b-why>
  <b-lane title="Carte des contextes" color="accent">
    <iso-art name="agents-per-bounded-context/context-map"></iso-art>
  </b-lane>
  <b-finding>
    <ex>L'agent des ventes lit l'événement « commande payée » du paiement et n'écrit dans le système du partenaire que par un contrat approuvé.</ex>
    <gen>Un contrat remplace le contexte partagé : les agents n'ont pas besoin de connaître l'intérieur de la frontière d'autrui, et une erreur ne se propage pas.</gen>
    <do k="Que faire">Pour chaque lien entre contextes, écrivez le contrat en une ligne : ce qu'il donne, ce qu'il prend, qui en est responsable.</do>
  </b-finding>
</b-chapter>

<b-chapter id="first" icon="shield-check" title="Par où commencer">
  <b-lane title="La première étape" color="accent">
    <iso-art name="agents-per-bounded-context/start"></iso-art>
  </b-lane>
  <b-finding>
    <ex>Commencez par deux contextes voisins et un contrat entre eux.</ex>
    <gen>Un contexte, un agent, un contrat : cela met le schéma à l'épreuve avant de l'étendre à tout le projet.</gen>
    <do k="Que faire">Choisissez deux contextes où les mots se mélangent le plus souvent et lancez un agent pour chacun.</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Questions fréquentes">
  <b-faq-cards>
    <q t="Combien d'agents IA faut-il ?">Autant qu'il y a de contextes délimités : chaque frontière de sens reçoit son propre agent.</q>
    <q t="Comment cela passe-t-il à l'échelle ?">Le nombre d'agents croît linéairement avec le nombre de contextes, tandis que la charge de chacun reste uniforme.</q>
    <q t="Qu'est-ce qui relie les agents ?">Un contrat à la frontière : les agents n'ont pas à connaître l'intérieur d'un autre contexte, et une erreur ne se propage pas.</q>
    <q t="Par où commencer ?">Par un contexte, un agent et un contrat : cela met le dispositif à l'épreuve avant de l'étendre à tout le projet.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" icon="arrow-right" title="À lire ensuite">
  <b-links>
    <item href="/blog/specs-by-aggregates/" k="Spécifications" t="Spécifications par agrégats">les frontières de contextes dans les specs</item>
    <item href="/blog/agent-hands-work-back-to-you/" k="Agent" t="Les agents vont-ils prendre votre travail">où la complexité est réelle</item>
    <item href="/materials/glossary/bounded-context/" k="Terme" t="Contexte délimité">ce que c'est et pourquoi</item>
    <item href="/blog/agent-checkpoint/" k="Vérifications" t="Où vérifier le travail d'un agent IA">la frontière de l'agrégat et la taille du contexte</item>
  </b-links>
</b-chapter>
</b-post>
