---
title: Enquête sur un incident avec un agent IA : erreurs Sentry et métriques Grafana en une seule image via MCP
date: 2026-10-05
updated: 2026-11-13
description: Comment enquêter sur un incident avec un agent IA : connecter Sentry et Grafana via MCP, lui faire rapprocher erreurs, métriques et heure de la version, limiter les permissions et vérifier l'hypothèse.
tags: IA, agents, MCP, Sentry, Grafana, incidents, harness
category: harness
layout: wide
mentions: MCP, Model Context Protocol, Sentry, Grafana, incident investigation, observability, Claude Code
toc: flow=Déroulement | connect=Connexion | timeline=Ce que rapproche l'agent | rights=Permissions et risques | first=Par où commencer | faq=Questions | next=Suite
---

Pendant un incident, une personne saute entre Sentry, Grafana et le chat et assemble elle-même le tableau. Un agent qui a accès aux deux systèmes réunit les erreurs, les métriques et les heures des événements dans un seul brouillon, pendant qu'une personne vérifie l'hypothèse et décide quoi faire. Ci-dessous : le déroulement, la connexion de Sentry et de Grafana, les permissions à donner. Les bases sont dans l'article [MCP pour un agent IA](/blog/mcp-agent-access/).

<b-post series="harness">

<b-chapter id="flow" icon="bug" title="Comment se déroule l'enquête">
  <iso-art name="incident-investigation-agent/before-after"></iso-art>
  <b-finding>
    <ex>L'agent lit les erreurs dans Sentry et les graphiques dans Grafana, et une personne reçoit un seul brouillon d'enquête.</ex>
    <gen>Sentry et Grafana se connectent via MCP en lecture seule, donc l'agent ne change rien sans votre permission. Une personne vérifie l'hypothèse.</gen>
    <do k="Que faire">Listez les systèmes où vous avez cherché la cause lors de votre dernier incident.</do>
  </b-finding>
</b-chapter>

<b-chapter id="connect" icon="plug" title="Comment connecter Sentry et Grafana">
  <b-say-agent title="Dites à l'agent">Connecte Sentry et Grafana en lecture seule. Trouve dans Sentry les nouvelles erreurs du service de paiement sur la dernière heure, trouve dans Grafana quand la part des réponses 5xx a augmenté, et rapproche-la de l'heure de la version. Propose une hypothèse et nomme la source de chaque fait.</b-say-agent>
  <b-why align="left">L'agent exécute lui-même les commandes ; vous vous contentez de vous connecter à Sentry dans le navigateur et de fournir un token Grafana. [Si l'agent vous demande de le faire](/blog/agent-hands-work-back-to-you/).</b-why>
  <b-spoiler summary="Comment le faire à la main">
    <iso-art name="incident-investigation-agent/setup-steps"></iso-art>

#### Sentry

    <b-codebox copy>
      claude mcp add --transport http sentry https://mcp.sentry.dev/mcp
      /mcp   # sign in through the browser (OAuth)
    </b-codebox>

La connexion passe par OAuth, et les tokens sont stockés et renouvelés automatiquement.

#### Grafana

    <b-codebox copy>
      claude mcp add --transport stdio \
        --env GRAFANA_URL=https://myinstance.grafana.net \
        --env GRAFANA_SERVICE_ACCOUNT_TOKEN=$GRAFANA_TOKEN \
        grafana -- uvx mcp-grafana --disable-write
    </b-codebox>

C'est le serveur officiel <a href="https://github.com/grafana/mcp-grafana" target="_blank" rel="noopener">grafana/mcp-grafana</a>. Le token vient d'un compte de service aux droits minimaux, et l'option --disable-write interdit les modifications.

  </b-spoiler>
  <b-finding>
    <ex>L'agent connecte les deux systèmes, trouve les erreurs et le graphique, les rapproche de la version et nomme les sources.</ex>
    <gen>Les deux systèmes se connectent avec une commande, et l'accès en lecture garde l'enquête sûre.</gen>
    <do k="Que faire">Déléguez la connexion à l'agent et comparez sa sortie avec ce que vous voyez vous-même dans Sentry et Grafana.</do>
  </b-finding>
</b-chapter>

<b-chapter id="timeline" icon="lines" title="Ce que rapproche l'agent">
  <iso-art name="incident-investigation-agent/event-timeline"></iso-art>
  <b-finding>
    <ex>La mise en [production](/materials/glossary/prod/), le pic d'erreurs et l'alerte sont placés sur une seule ligne du temps, et l'on voit ce qui s'est passé en premier.</ex>
    <gen>Une coïncidence dans le temps donne une hypothèse et ne prouve pas la cause : la vérification reste à une personne.</gen>
    <do k="Que faire">Demandez un lien vers un graphique ou un événement pour chaque conclusion.</do>
  </b-finding>
</b-chapter>

<b-chapter id="rights" icon="shield-check" title="Permissions et risques">
  <iso-art name="incident-investigation-agent/rights-ladder"></iso-art>
  <b-rules sw="1.8">
    <rule icon="key" t="Token">Un compte de service Grafana aux droits minimaux ; la valeur vit dans une variable d'environnement.</rule>
    <rule icon="lock" t="Lecture seule">L'option --disable-write interdit les modifications, y compris la création d'incidents.</rule>
    <rule icon="ban" t="Serveur tiers">Ne connectez que des serveurs de confiance : les serveurs qui lisent du texte externe ouvrent la porte à l'injection de prompt.</rule>
  </b-rules>
  <b-finding>
    <ex>L'agent lit les erreurs et les graphiques, et ne peut rien modifier dans les systèmes.</ex>
    <gen>Les permissions sont données par source, et les plus larges restent fermées.</gen>
    <do k="Que faire">Créez un compte de service en lecture seule et connectez Grafana avec l'option --disable-write.</do>
  </b-finding>
</b-chapter>

<b-chapter id="first" icon="flag" title="Par où commencer">
  <iso-art name="incident-investigation-agent/start-steps"></iso-art>
  <b-finding>
    <ex>Trois étapes : Sentry, Grafana, un essai sur un incident passé.</ex>
    <gen>L'incident passé est connu, on voit donc où l'agent a trouvé la cause et où il s'est trompé.</gen>
    <do k="Que faire">Prenez un incident clos et demandez à l'agent de trouver la cause via Sentry et Grafana.</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Questions fréquentes">
  <b-faq-cards>
    <q t="Comment un agent IA aide-t-il à enquêter sur un incident ?">Il réunit les erreurs de Sentry, les métriques de Grafana et les heures des événements dans un seul brouillon, et une personne vérifie l'hypothèse et décide quoi faire.</q>
    <q t="Comment connecter Sentry et Grafana à un agent ?">Via MCP, avec une commande, en lecture seule.</q>
    <q t="Peut-on se fier à la conclusion de l'agent ?">Une coïncidence dans le temps donne une hypothèse et ne prouve pas la cause. La vérification reste à une personne.</q>
    <q t="Quelles permissions donner à l'agent ?">Séparément pour chaque source, en lecture seule ; les droits les plus larges restent fermés.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Suite">
  <b-links>
    <item href="/blog/mcp-agent-access/" k="Bases" t="MCP pour un agent IA : quel problème il résout et comment confier la connexion à l'agent">Ce qu'est MCP et comment le connecter</item>
    <item href="/blog/analytics-reports-agent/" k="Autre cas" t="Rapports analytiques avec un agent IA">Base de données, feuilles et documents via MCP</item>
    <item href="/blog/mcp-scopes/" k="Configuration" t="Portées MCP dans Claude Code : locale, projet et utilisateur — où vit un serveur et qui le voit">Où vit un serveur et qui le voit</item>
  </b-links>
</b-chapter>
<b-footer>L'incident est inventé. La connexion de Sentry suit la documentation de Claude Code : <a href="https://code.claude.com/docs/en/mcp" target="_blank" rel="noopener">MCP</a>, celle de Grafana suit le dépôt <a href="https://github.com/grafana/mcp-grafana" target="_blank" rel="noopener">grafana/mcp-grafana</a>.</b-footer>
</b-post>
