---
title: Spécifications par agrégats : exigences RFC et contextes délimités au lieu d'une spec par fonctionnalité
date: 2026-09-28
updated: 2026-11-08
description: Le développement piloté par les spécifications sans prolifération de specs : comment garder les spécifications dans un seul dictionnaire d'agrégats pour qu'elles ne se multiplient pas à chaque fonctionnalité : niveaux d'exigence, fiche d'agrégat et frontières de contextes.
tags: IA, développement piloté par les spécifications, spécifications, DDD, agents
category: specs
layout: wide
image: /og/specs-by-aggregates.en.png
mentions: RFC 2119, Domain-Driven Design, OpenSpec, Spec-Driven Development
toc: growth=Pourquoi les specs s'accumulent | rfc=Niveaux RFC | card=Fiche d'agrégat | contexts=Contextes | faq=Questions | next=À lire ensuite
---

Les spécifications par agrégats consistent à tenir une entrée par concept du domaine, comme une réservation ou une commande, au lieu d'une spec distincte par fonctionnalité. Une fonctionnalité ajoute seulement des exigences à la bonne entrée : les fichiers ne se multiplient pas à chaque tâche et un concept ne dérive pas d'une spec à l'autre. Les exigences utilisent les niveaux RFC : un MUST est vérifié par un test, un SHOULD en relecture. Ci-dessous, la fiche d'agrégat et les frontières de contextes.

<b-post series="agg">
<b-hchain label="Chaîne : contexte délimité, agrégat, invariant de niveau MUST, vérification">
  <step icon="workflow" sw="1.8" t="Contexte">réservation</step>
  <step icon="cube" t="Agrégat">Reservation</step>
  <step icon="list-check" sw="1.8" t="Invariant">MUST</step>
  <step icon="flask" t="Vérification">test</step>
</b-hchain>
<b-chapter id="growth" title="Pourquoi les specs s'accumulent" icon="bar-chart-rise">
  <b-spec-growth>
    <b-growth-panel icon="file" t="Une spec par fonctionnalité" sub="un concept est décrit dans chaque fonctionnalité" files="101101010110" n="12 fichiers" note="« Réservation » dans 7" chip="croît avec les fonctionnalités"></b-growth-panel>
    <b-growth-panel good icon="cube" t="Dictionnaire d'agrégats" sub="un concept est décrit une seule fois" n="4 entrées" note="« Réservation » dans 1" chip="croît avec le domaine">
      <agg dots="5">Reservation</agg>
      <agg dots="3">Room</agg>
      <agg dots="2">TimeSlot</agg>
      <agg dots="2">Member</agg>
    </b-growth-panel>
    <step>Fonctionnalité 13</step>
    <step em="+1 MUST">[booking::Reservation]</step>
    <step em="+1">test</step>
  </b-spec-growth>
  <b-cap>Les chiffres sont illustratifs. Comment <a href="https://github.com/Fission-AI/OpenSpec" target="_blank" rel="noopener">OpenSpec</a> organise les specs et les changements : dossiers specs/ et changes/, les changements terminés vont dans une archive.</b-cap>
  <b-finding>
    <ex>Douze fonctionnalités ont produit douze specs, et la réservation est décrite dans sept d'entre elles, chaque fois un peu différemment. Dans le dictionnaire, les mêmes fonctionnalités ont ajouté des lignes à quatre entrées d'agrégats.</ex>
    <gen>Quand une spec est liée à un changement ou à une fonctionnalité, chaque tâche ajoute des fichiers, et un même concept dérive à plusieurs endroits. Quand l'unité est un agrégat, le nombre d'entrées est borné par le domaine lui-même, et une fonctionnalité ne fait qu'ajouter des exigences à une entrée.</gen>
    <do>Listez les concepts qui apparaissent dans trois specs ou plus et donnez à chacun une entrée unique dans le dictionnaire. Faites pointer les specs de fonctionnalités vers l'entrée au lieu de la raconter à nouveau.</do>
  </b-finding>
</b-chapter>
<b-chapter id="rfc" title="Niveaux d'exigence de la RFC 2119" icon="list-check">
  <b-rfc-levels cols="Mot | Signification | Force | Vérification">
    <level k="MUST" s="5" w="100" check="test" t="test automatisé" note="bloque">obligatoire</level>
    <level k="MUST NOT" s="5" w="100" check="test" t="test automatisé" note="bloque">interdit</level>
    <level k="SHOULD" s="3" w="60" check="review" t="relecture" note="avertit">par défaut, s'en écarter avec une raison</level>
    <level k="MAY" s="1" w="20" check="none" t="aucune" note="non vérifié">permis</level>
    <syn>MUST = SHALL</syn>
  </b-rfc-levels>
  <b-cap>Les mots et leurs significations suivent la <a href="https://www.rfc-editor.org/rfc/rfc2119" target="_blank" rel="noopener">RFC 2119</a>. Chaque mot correspond à son propre type de vérification.</b-cap>
  <b-finding>
    <ex>Dans l'entrée de la réservation, « les intervalles ne se chevauchent pas » est un MUST vérifié par un test, et « la confirmation passe par le même canal » est un SHOULD examiné en relecture.</ex>
    <gen>Le mot d'exigence indique tout de suite comment la vérifier et que faire en cas de violation. L'agent lit MUST comme une limite et SHOULD comme une valeur par défaut, et ne les confond pas.</gen>
    <do>Réécrivez les exigences de votre spec avec ces quatre mots et placez à côté de chaque MUST le test qui le vérifie.</do>
  </b-finding>
</b-chapter>
<b-chapter id="card" title="La fiche d'agrégat" icon="card-lines">
  <b-aggregate-card label="Exemple d'entrée pour l'agrégat Reservation dans le contexte de réservation : adresse, invariants, commandes, accès, liens et spec de la fonctionnalité">
    <field icon="id-card" t="adresse : contexte::nom">## [booking::Reservation]&#10;Class: aggregate&#10;Description: Une salle de réunion réservée pour un intervalle.</field>
    <field icon="list-check" sw="1.8" t="exigences → vérifications">Invariants:&#10;  - MUST: les réservations actives d'une salle ne se chevauchent jamais&#10;  - MUST: held → confirmed → closed, uniquement vers l'avant&#10;  - MUST: held non confirmée pendant 15 min → closed&#10;  - SHOULD: confirmer sur le canal où la réservation a été faite</field>
    <field icon="play" t="la seule façon de la modifier">Commands: HoldRoom, ConfirmReservation,&#10;          CancelReservation</field>
    <field icon="user" t="qui a le droit">Access:&#10;  CanHoldRoom: [booking::Role::Member]&#10;  CanCancelReservation: Member (la sienne), Admin</field>
    <field icon="link" t="liens par identifiant">Depends on: [[booking::Room]], [[booking::TimeSlot]]</field>
    <field icon="file" t="de quelle fonctionnalité elle vient">Spec: [[room-booking]]</field>
  </b-aggregate-card>
  <b-cap>L'exemple est inventé. Les termes suivent <a href="https://martinfowler.com/bliki/DDD_Aggregate.html" target="_blank" rel="noopener">Martin Fowler : DDD Aggregate</a>.</b-cap>
  <b-finding>
    <ex>Toute la réservation tient sur une fiche : une adresse, quatre exigences, trois commandes, des permissions, des liens et la fonctionnalité d'origine.</ex>
    <gen>Un agrégat est une frontière à l'intérieur de laquelle les exigences sont toujours respectées, et il ne peut changer que par ses propres commandes. C'est pourquoi la fiche garde les règles à côté des seules façons de les enfreindre.</gen>
    <do>Donnez à chaque agrégat une fiche à six champs. Si une exigence ne peut être attribuée à aucun agrégat, c'est très probablement que l'agrégat n'a pas encore été nommé.</do>
  </b-finding>
</b-chapter>
<b-chapter id="contexts" title="Contextes délimités" icon="workflow">
  <b-ctx-map>
    <ctx name="booking">Reservation, Room, TimeSlot</ctx>
    <ctx name="billing">Invoice, Tariff</ctx>
    <ctx name="access">Pass, Level</ctx>
  </b-ctx-map>
  <b-ctx-links t="les liens entre contextes passent uniquement par identifiant">
    <ref from="billing::Invoice" to="booking::Reservation"/>
    <ref from="access::Pass" to="booking::Reservation"/>
  </b-ctx-links>
  <b-ctx-clash word="« Level »" note="un mot, deux termes, des libellés différents">
    <sense code="booking::Room.floor">Étage</sense>
    <sense code="access::Level">Habilitation</sense>
  </b-ctx-clash>
  <b-ctx-rules>
    <rule icon="id-card">un terme = une entrée</rule>
    <rule icon="link">lien sous la forme [[ctx::Name]]</rule>
    <rule icon="fork">même mot → entrées séparées</rule>
    <rule icon="cycle">le dictionnaire change avec la spec</rule>
  </b-ctx-rules>
  <b-cap>L'approche repose sur <a href="https://martinfowler.com/bliki/BoundedContext.html" target="_blank" rel="noopener">Bounded Context</a> et <a href="https://martinfowler.com/bliki/UbiquitousLanguage.html" target="_blank" rel="noopener">Ubiquitous Language</a>.</b-cap>
  <b-finding>
    <ex>La facture et le badge se réfèrent à une réservation par identifiant et ne savent rien de son intérieur. « Level » signifie un étage dans la réservation et une habilitation dans l'accès, et ce sont deux entrées distinctes.</ex>
    <gen>Un contexte est un domaine où chaque mot a un seul sens. Quand un mot apparaît dans deux contextes, il faut créer deux termes avec des libellés différents ; sinon, l'agent reporte une règle de l'un dans l'autre.</gen>
    <do>Répartissez vos agrégats en contextes et repérez les mots qui apparaissent dans deux d'entre eux. Donnez à chacun de ces mots des entrées séparées et des libellés différents dans l'interface.</do>
  </b-finding>
</b-chapter>
<b-chapter id="faq" icon="chat" title="Questions fréquentes">
  <b-faq-cards>
    <q t="Pourquoi les specs se multiplient-elles ?">Si une spec est liée à une fonctionnalité, les fichiers croissent à chaque tâche et un même concept dérive à plusieurs endroits.</q>
    <q t="Qu'est-ce qu'une spec par agrégat ?">Une entrée par concept du domaine, comme une réservation. Une fonctionnalité ne fait qu'y ajouter des exigences.</q>
    <q t="Pourquoi des niveaux MUST et SHOULD ?">Le mot indique comment vérifier l'exigence : un MUST est vérifié par un test, un SHOULD en relecture. L'agent lit MUST comme une limite stricte.</q>
    <q t="Que faire si un mot a des sens différents dans deux contextes ?">Créer deux termes avec des libellés différents, sinon l'agent reportera une règle d'un contexte dans l'autre.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="À lire ensuite">
  <b-cta href="/blog/spec-reconcile-loop/" k="Suite" t="Une boucle de réconciliation pour les spécifications" icon="hub" sw="1.6">comme Kubernetes : état désiré, vérifications et environnement de l'agent</b-cta>
  <b-links cols="3">
    <item href="/blog/harness-driven-development/" k="Boucle d'erreurs" t="Harness-Driven Development">comment les erreurs de l'agent deviennent des règles</item>
    <item href="/blog/specs-rules-skills/" k="Contexte" t="Spécifications, bible, règles et skills">ce que l'agent sait du projet et où cela vit</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="Environnement" t="Comparaison des harness">où l'agent travaille et ce qu'il voit</item>
    <item href="/blog/agent-checkpoint/" k="Vérifications" t="Où vérifier le travail d'un agent IA">l'agrégat comme point de contrôle</item>
  </b-links>
</b-chapter>
<b-footer compact>L'exemple de réservation est inventé. Les termes et les approches suivent les sources liées sous les schémas.</b-footer>
</b-post>
