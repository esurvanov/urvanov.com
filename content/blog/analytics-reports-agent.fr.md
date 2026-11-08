---
title: Comment faire des rapports analytiques avec un agent IA : données d’une base, de feuilles et de documents via MCP
date: 2026-10-05
updated: 2026-11-08
description: Construire un rapport analytique avec un agent IA : connecter une base en lecture seule via MCP, déléguer les requêtes et la synthèse, vérifier un chiffre à la main et fixer les droits source par source.
tags: IA, agents, MCP, analytique, rapports, base de données, harness
category: harness
layout: wide
mentions: MCP, Model Context Protocol, analytics, reports, SQL, database, Claude Code, permissions
toc: flow=Comment se construit un rapport | access=Sources et droits | connect=Connexion | verify=Vérification | first=Par où commencer | faq=Questions | next=Suite
---

Un rapport fait à la main, c’est un export de base de données, un tableau, un graphique et un texte, et chaque étape attend une personne. Un agent IA qui a accès aux sources parcourt lui-même toute la chaîne, pendant qu’une personne vérifie les chiffres et décide de la suite. Ci-dessous : à quoi cela ressemble, quels droits donner à chaque source, comment connecter la base et vérifier le résultat. Les bases se trouvent dans l’article [MCP pour un agent IA](/blog/mcp-agent-access/).

<b-post series="harness">

<b-chapter id="flow" icon="grid-alt" title="Comment se construit un rapport">
  <iso-art name="analytics-reports-agent/before-after"></iso-art>
  <b-finding>
    <ex>À la main, une personne déplace les données entre la base, le tableau, le graphique et le texte. Avec un agent, elle reçoit un brouillon prêt et vérifie les chiffres.</ex>
    <gen>Les sources se connectent à l’agent via MCP. Chaque étape de la chaîne se répète et donne un résultat clair : elle peut donc passer à un agent. Ce que les chiffres signifient reste une décision humaine.</gen>
    <do k="Que faire">Listez les étapes de votre dernier rapport et marquez celles qui ne sont que du copier-coller.</do>
  </b-finding>
</b-chapter>

<b-chapter id="access" icon="lock" title="Sources et droits">
  <b-why>Systèmes, données et documents hors de la conversation. Les droits se fixent séparément pour chaque source.</b-why>
  <iso-art name="analytics-reports-agent/source-rights"></iso-art>
  <b-finding>
    <ex>Jira, les documents et la base sont ouverts en lecture, la feuille en écriture avec confirmation, et seul l’environnement de test peut être cassé.</ex>
    <gen>L’agent voit exactement ce qui est connecté et fait exactement ce qui est autorisé.</gen>
    <do k="Que faire">Pour chaque source, écrivez un mot : lecture, écriture ou environnement de test seulement.</do>
  </b-finding>
</b-chapter>

<b-chapter id="connect" icon="plug" title="Comment connecter la base de données">
  <b-say-agent title="Dites à l’agent">Connecte la base analytique en lecture seule. Montre le schéma de la table orders et calcule le chiffre d’affaires de ce mois. Montre la requête utilisée.</b-say-agent>
  <b-why align="left">L’agent lance lui-même la commande de connexion. [S’il vous demande de le faire](/blog/agent-hands-work-back-to-you/).</b-why>
  <b-spoiler summary="Comment le faire à la main">
    <iso-art name="analytics-reports-agent/setup-steps"></iso-art>
    <b-codebox copy>
      claude mcp add --transport stdio db -- npx -y @bytebase/dbhub \
        --dsn "postgresql://readonly:pass@prod.db.com:5432/analytics"
    </b-codebox>

Créez l’utilisateur en lecture seule : ainsi, les requêtes de l’agent ne peuvent rien modifier. Exemples de prompts tirés de la documentation : « What’s our total revenue this month? », « Show me the schema for the orders table ».

  </b-spoiler>
  <b-finding>
    <ex>L’agent connecte la base, regarde le schéma, calcule le chiffre d’affaires et montre la requête.</ex>
    <gen>Les droits en lecture seule rendent les requêtes sûres : l’agent ne peut pas modifier les données.</gen>
    <do k="Que faire">Créez d’abord un utilisateur de base en lecture seule et connectez-le.</do>
  </b-finding>
</b-chapter>

<b-chapter id="verify" icon="shield-check" title="Comment vérifier le rapport">
  <iso-art name="analytics-reports-agent/check-number"></iso-art>
  <b-finding>
    <ex>L’agent montre la requête et le résultat, une personne recalcule un chiffre autrement.</ex>
    <gen>Le modèle calcule par une requête, et une requête peut être relue. Un chiffre qui concorde renforce la confiance dans le reste.</gen>
    <do k="Que faire">Vérifiez à la main un chiffre du rapport avant de le transmettre.</do>
  </b-finding>
</b-chapter>

<b-chapter id="first" icon="flag" title="Par où commencer">
  <iso-art name="analytics-reports-agent/start-steps"></iso-art>
  <b-finding>
    <ex>Trois étapes : une base en lecture seule, un rapport, la vérification d’un chiffre.</ex>
    <gen>Commencez par un rapport dont vous connaissez déjà les chiffres : cela montre où l’agent s’est trompé.</gen>
    <do k="Que faire">Aujourd’hui, créez un utilisateur en lecture seule et demandez à l’agent de calculer un chiffre connu.</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Questions fréquentes">
  <b-faq-cards>
    <q t="Comment un agent IA construit-il un rapport analytique ?">Il parcourt lui-même la chaîne : export de la base, tableau, graphique et texte. Une personne vérifie les chiffres et décide de la suite.</q>
    <q t="Comment connecter une base de données à un agent ?">Via MCP, avec des droits en lecture seule : l’agent ne peut pas modifier les données.</q>
    <q t="Comment vérifier le rapport d’un agent ?">Relisez les requêtes qu’il a utilisées et comparez un ou deux chiffres avec des valeurs connues : une concordance renforce la confiance dans le reste.</q>
    <q t="Que voit l’agent dans les sources ?">Exactement ce qui a été connecté, et il fait exactement ce qui est autorisé.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Suite">
  <b-links>
    <item href="/blog/mcp-agent-access/" k="Bases" t="MCP pour un agent IA : quel problème il résout et comment confier la connexion à l’agent">Ce qu’est MCP et comment le connecter</item>
    <item href="/blog/incident-investigation-agent/" k="Autre cas" t="Enquête sur un incident avec un agent IA">Sentry et Grafana via MCP</item>
    <item href="/blog/work-prompts-examples/" k="Pratique" t="Prompts pour les tâches de travail : cinq parties et six exemples pour ChatGPT et Claude">L’exemple de l’« analyse de tableau »</item>
  </b-links>
</b-chapter>
<b-footer>L’exemple est inventé. La commande de connexion de la base et le conseil sur l’utilisateur en lecture seule suivent la documentation de Claude Code : <a href="https://code.claude.com/docs/en/mcp" target="_blank" rel="noopener">Connect Claude Code to tools via MCP</a>.</b-footer>
</b-post>
