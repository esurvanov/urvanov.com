---
title: Portées MCP dans Claude Code : locale, projet et utilisateur — où vit un serveur et qui le voit
date: 2026-10-05
updated: 2026-11-13
description: Les trois portées des serveurs MCP dans Claude Code : locale, projet et utilisateur. Où vit la configuration, qui la voit, ce qui l'emporte quand les noms entrent en collision, comment partager des serveurs avec une équipe et garder les secrets hors des commits.
tags: IA, agents, MCP, Claude Code, équipe, harness
category: harness
layout: wide
mentions: MCP, Model Context Protocol, Claude Code, mcp scope, .mcp.json, environment variables
toc: what=Trois portées | pick=Laquelle choisir | order=Ce qui l'emporte | team=Projet pour une équipe | secrets=Secrets | first=Par où commencer | faq=Questions | next=Suite
---

La portée d'un serveur MCP répond à deux questions : dans quels projets il fonctionne et qui le voit. Claude Code a trois portées : locale, projet et utilisateur. Ci-dessous : en quoi elles diffèrent, laquelle choisir, ce qui l'emporte quand les noms entrent en collision et comment partager des serveurs avec une équipe. Ce qu'est MCP et comment le connecter est expliqué dans l'article [MCP pour un agent IA](/blog/mcp-agent-access/).

<b-post series="harness">

<b-chapter id="what" icon="layers" title="Trois portées">
  <iso-art name="mcp-scopes/scopes"></iso-art>
  <b-table code="prose">
| Portée | Fonctionne dans | Qui la voit | Stockée dans |
|---|---|---|---|
| Locale | le projet courant | vous seul | `~/.claude.json` |
| Projet | le projet courant | toute l'équipe, via le dépôt | `.mcp.json` à la racine |
| Utilisateur | tous vos projets | vous seul | `~/.claude.json` |
  </b-table>
  <b-finding>
    <ex>Un même serveur peut être connecté pour vous seul dans un projet, pour toute l'équipe ou pour tous vos projets.</ex>
    <gen>La portée locale est celle par défaut : le serveur n'est visible que de vous et seulement dans ce projet.</gen>
    <do k="Que faire">Regardez dans quelle portée vit chacun de vos serveurs : claude mcp list.</do>
  </b-finding>
</b-chapter>

<b-chapter id="pick" icon="help" title="Laquelle choisir">
  <b-say-agent title="Dites à l'agent">Montre dans quelles portées mes serveurs MCP sont configurés et propose lesquels déplacer vers la portée projet pour l'équipe.</b-say-agent>
  <b-why align="left">L'agent exécute lui-même les commandes : claude mcp list et claude mcp get.</b-why>
  <b-spoiler summary="Comment le faire à la main">
    <iso-art name="mcp-scopes/what-where"></iso-art>
    <b-codebox copy>
      # local — the default
      claude mcp add --transport http stripe https://mcp.stripe.com
      # project — the whole team, .mcp.json file
      claude mcp add --transport http shared-server --scope project https://example.com/mcp
      # user — all your projects
      claude mcp add --transport http hubspot --scope user https://mcp.hubspot.com/anthropic
    </b-codebox>

Liste des serveurs : `claude mcp list` ; détails : `claude mcp get <name>` ; suppression : `claude mcp remove <name>` ; dans Claude Code : `/mcp`.

  </b-spoiler>
  <b-finding>
    <ex>Une expérience démarre en portée locale, un outil partagé vit en portée projet, un utilitaire personnel en portée utilisateur.</ex>
    <gen>La portée décide qui voit le serveur et où vit sa configuration.</gen>
    <do k="Que faire">Ajoutez un outil partagé avec --scope project et un outil personnel avec --scope user.</do>
  </b-finding>
</b-chapter>

<b-chapter id="order" icon="layers" title="Ce qui l'emporte quand les noms entrent en collision">
  <b-why>Si un serveur du même nom existe à plusieurs endroits, l'entrée de la couche la plus haute est utilisée en entier.</b-why>
  <iso-art name="mcp-scopes/priority-layers"></iso-art>
  <b-finding>
    <ex>Les serveurs fournis par l’organisation (MCP géré) passent avant tout. Ensuite, la portée locale l’emporte sur projet et utilisateur, et projet l’emporte sur utilisateur. Les plugins et les connecteurs claude.ai se situent en dessous et comptent comme doublon s’ils pointent vers la même adresse.</ex>
    <gen>Une entrée personnelle remplace en bloc une entrée partagée du même nom : les champs des deux entrées ne sont pas fusionnés.</gen>
    <do k="Que faire">Donnez des noms différents aux serveurs personnels pour qu'ils ne remplacent pas les serveurs partagés.</do>
  </b-finding>
</b-chapter>

<b-chapter id="team" icon="git-branch" title="Projet : configuration commune pour l'équipe">
  <b-rules sw="1.8">
    <rule icon="folder-tab" t=".mcp.json">Le fichier se trouve à la racine du projet, dans le dépôt : toute l'équipe obtient les mêmes serveurs.</rule>
    <rule icon="bell" t="Approbation">Dans une session interactive, Claude Code demande avant d'utiliser les serveurs de .mcp.json.</rule>
    <rule icon="users" t="Sans demande">Dans les exécutions non interactives (claude -p, l'Agent SDK, les sessions cloud), les serveurs se chargent sans demande.</rule>
    <rule icon="lock" t="Confiance dans le dossier">Dans un dossier non fiable, le serveur attend l'approbation (« Pending approval ») jusqu'à la boîte de dialogue de confiance.</rule>
    <rule icon="ban" t="Désactiver">Ajoutez un serveur indésirable à disabledMcpjsonServers ; claude mcp reset-project-choices efface les choix d'approbation.</rule>
  </b-rules>
  <b-finding>
    <ex>Un fichier dans le dépôt rend la configuration de l'agent commune : un nouveau membre obtient les serveurs avec le code.</ex>
    <gen>L'approbation protège contre le serveur d'un inconnu en travail interactif, tandis que dans les exécutions automatisées le serveur s'active aussitôt.</gen>
    <do k="Que faire">Relisez .mcp.json en revue de code comme n'importe quel code.</do>
  </b-finding>
</b-chapter>

<b-chapter id="secrets" icon="key" title="Secrets dans .mcp.json">
  <b-why>Le fichier contient des noms de variables d'environnement. ${VAR} insère la valeur et ${VAR:-default} fixe une valeur de repli. L'expansion fonctionne dans command, args, env, url et headers.</b-why>
  <iso-art name="mcp-scopes/env-keys"></iso-art>
  <b-codebox copy>
    {
      "mcpServers": {
        "api-server": {
          "type": "http",
          "url": "${API_BASE_URL:-https://api.example.com}/mcp",
          "headers": { "Authorization": "Bearer ${API_KEY}" }
        }
      }
    }
  </b-codebox>

Si une variable n'est pas définie et n'a pas de valeur par défaut, la configuration se charge telle quelle, et claude mcp list et /mcp affichent un avertissement. Les identifiants de Claude Code (ANTHROPIC_API_KEY, ANTHROPIC_AUTH_TOKEN) et plusieurs autres sont lus comme vides dans url et headers : copiez la valeur dans une variable portant un autre nom.

  <b-finding>
    <ex>Le dépôt contient ${API_KEY}, et chaque développeur garde la vraie clé dans sa propre variable d'environnement.</ex>
    <gen>Le fichier commun peut ainsi être committé sans risque.</gen>
    <do k="Que faire">Retirez les clés de .mcp.json et remplacez-les par des variables.</do>
  </b-finding>
</b-chapter>

<b-chapter id="first" icon="flag" title="Par où commencer">
  <iso-art name="mcp-scopes/steps"></iso-art>
  <b-finding>
    <ex>Trois étapes : regarder, partager, cacher les clés.</ex>
    <gen>D'abord mettre de l'ordre dans ses propres serveurs, ensuite la configuration commune pour l'équipe.</gen>
    <do k="Que faire">Lancez claude mcp list et trouvez un serveur dont toute l'équipe a besoin.</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Questions fréquentes">
  <b-faq-cards>
    <q t="Quelles portées MCP Claude Code propose-t-il ?">Trois : locale pour vous dans le projet courant, projet pour toute l'équipe via un fichier .mcp.json dans le dépôt, et utilisateur pour vous dans tous vos projets.</q>
    <q t="Quelle portée est celle par défaut ?">La portée locale : le serveur n'est visible que de vous et seulement dans ce projet.</q>
    <q t="Que se passe-t-il quand les noms de serveurs entrent en collision ?">L'entrée personnelle remplace entièrement l'entrée partagée du même nom : les champs des deux entrées ne sont pas fusionnés.</q>
    <q t="Comment partager un serveur MCP avec l'équipe ?">L'ajouter à la portée projet : le réglage va dans le dépôt, et les secrets restent dans des variables d'environnement.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Suite">
  <b-links>
    <item href="/blog/mcp-agent-access/" k="Bases" t="MCP pour un agent IA : quel problème il résout et comment confier la connexion à l'agent">Ce qu'est MCP et comment le connecter</item>
    <item href="/blog/claude-in-chrome/" k="Navigateur" t="Claude Code dans Chrome : comment l'agent teste un site dans le navigateur — débogage et formulaires sous votre identifiant">L'agent dans votre navigateur</item>
    <item href="/blog/bug-report-to-reproduction-agent/" k="Exemple" t="Travail de QA après le support avec un agent IA : enquête, description et documentation via MCP et skills">L'agent reproduit un bug Jira</item>
  </b-links>
</b-chapter>
<b-footer>Les faits sur les portées et la priorité suivent la documentation de Claude Code : <a href="https://code.claude.com/docs/en/mcp#mcp-installation-scopes" target="_blank" rel="noopener">MCP installation scopes</a>.</b-footer>
</b-post>
