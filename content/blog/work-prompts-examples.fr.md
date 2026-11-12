---
title: Prompts pour les tâches de travail : cinq parties et six exemples pour ChatGPT et Claude
date: 2026-09-28
updated: 2026-11-13
description: Des prompts pour travailler avec un chat IA : les parties d'un bon prompt de travail, à quoi ressemblent une demande faible et une demande solide, six modèles prêts pour des tâches courantes et comment les garder dans un projet, d'après les guides d'Anthropic, d'OpenAI et de Google.
tags: IA, prompts, ChatGPT, Claude
category: prompts
layout: wide
toc: model=Human-in-the-loop | parts=Cinq parties | examples=Six exemples | learn=Quoi étudier | faq=Questions | next=Pour aller plus loin
---

Un prompt de travail pour ChatGPT et Claude se construit en cinq parties : un rôle, à qui la réponse est destinée et pourquoi, les données complètes, un exemple et un format, la question venant à la fin. Le modèle ne sait que ce que dit la demande. Le test est simple : montrez le prompt à un collègue sans contexte, et s'il s'y perd, le modèle aussi. Ci-dessous, une demande faible et une demande solide, puis six modèles pour des tâches courantes.

<b-post series="prompts">
<b-flow lead label="Une demande, deux résultats">
  <b-lane title="Une phrase" color="muted">
    <node icon="chat" t="Demande">« écris une réponse au client »</node>
    <node icon="ai-box" t="Modèle">devine le contexte</node>
    <node icon="file-x" t="Réponse générique">à réécrire à la main</node>
  </b-lane>
  <b-lane title="Cinq parties" color="accent">
    <node icon="prompt-stripes" t="Prompt">rôle, données, exemple, format</node>
    <node icon="ai-box" t="Modèle">voit tout ce dont il a besoin</node>
    <node icon="file-check" t="Brouillon">retouches mineures</node>
  </b-lane>
</b-flow>
<b-cap>Le modèle est le même dans les deux cas. Le résultat dépend de ce que dit le prompt : cinq parties qui reviennent dans les guides d'Anthropic, d'OpenAI et de Google.</b-cap>
<b-chapter id="model" title="Human-in-the-loop : le chemin d'une demande" icon="share">
  <b-art names="work-prompts-examples/prompt-map" wide/>
  <b-finding>
    <ex>Une personne tient chaque point clé : elle fixe la tâche, construit le prompt, vérifie la réponse, la renvoie pour la préciser et prend la décision. Le modèle ne répond que sur ce qui est entré dans la demande.</ex>
    <gen>Chaque flèche a son propre point de contrôle : les données entrent en entier, la réponse est vérifiée par rapport à celui qui en a besoin, et une bonne demande est enregistrée comme modèle pour que la prochaine tâche du même type parte de là.</gen>
    <do>Avant d'écrire la demande, nommez le lecteur et la décision qu'il prendra à partir de la réponse : le rôle et le format en découlent.</do>
  </b-finding>
  <b-cta href="/blog/harness-driven-development/" k="Étape suivante · HDD" t="Harness-Driven Development">Comment transformer la vérification de ce schéma en une règle qui vaut pour chaque tâche suivante</b-cta>
</b-chapter>
<b-chapter id="parts" title="Cinq parties d'un prompt" icon="grid">
  <b-prompt-anatomy label="Anatomie du prompt : rôle, audience et objectif, toutes les données dans des balises, exemple, format, question à la fin" order="order">
    <part kind="role" icon="user-round" t="Rôle" tip="Rôle : « Tu es un agent du support. » Une phrase fixe le ton et le niveau"><b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “Setting a role in the system prompt focuses Claude&#39;s behavior and tone for your use case. Even a single sentence makes a difference” — platform.claude.com, Prompting best practices"/></part>
    <part kind="who" icon="target" t="Audience et objectif" tip="Qui et pourquoi : qui lit le résultat et quelle décision il nourrit"><b-proof href="https://academy.openai.com/public/clubs/work-users-ynjqu/resources/prompting" quote="OpenAI Academy: “Be clear about what you need ChatGPT to do. Outline what you want, who it&#39;s for, and why it matters” — academy.openai.com, Prompting"/><b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “Providing context or motivation behind your instructions, such as explaining to Claude why such behavior is important, can help Claude better understand your goals and deliver more targeted responses” — platform.claude.com, Prompting best practices"/></part>
    <part kind="data" icon="file-text" t="Toutes les données" tip="Données complètes : collez le fil, le document ou le tableau en entier. L'entrée longue en haut, la question à la fin" tag="data"><b-proof href="https://academy.openai.com/public/clubs/work-users-ynjqu/resources/prompting" quote="OpenAI Academy: “Add any background (or documentation) that will help” — academy.openai.com, Prompting"/><b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “Place your long documents and inputs near the top of your prompt, above your query, instructions, and examples”; “Queries at the end can improve response quality by up to 30 percent in tests” — platform.claude.com, Prompting best practices"/></part>
    <part kind="ex" icon="card-text" t="Exemple" tip="Exemple : un à trois échantillons du ton ou du format souhaité" tag="example" note="1–3"><b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “Include 3–5 examples for best results” — platform.claude.com, Prompting best practices"/><b-proof href="https://www.kaggle.com/whitepaper-prompt-engineering" quote="Google, Prompt Engineering: its best practices include providing examples, being specific about the output and using instructions over constraints. Paraphrased — kaggle.com/whitepaper-prompt-engineering"/></part>
    <part kind="fmt" icon="list-dots" t="Format" tip="Format : « 5 puces, une ligne chacune ». Dites quoi faire, au lieu d'énumérer des interdits" note="5 points"><b-proof href="https://academy.openai.com/public/clubs/work-users-ynjqu/resources/prompting" quote="OpenAI Academy: “Tell ChatGPT how you&#39;d like the response” — academy.openai.com, Prompting"/><b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “Tell Claude what to do instead of what not to do” — platform.claude.com, Prompting best practices"/></part>
    <part kind="q" icon="help" t="Question à la fin" tip="Collez le fil, le document ou le tableau en entier. L'entrée longue en haut, la question à la fin"></part>
    <tags t="balises" tip="Balises pour les parties : &lt;thread&gt;…&lt;/thread&gt; sépare les données de l'instruction"><b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “Wrapping each type of content in its own tag (for example, &lt;instructions&gt;, &lt;context&gt;, &lt;input&gt;) reduces misinterpretation” — platform.claude.com, Prompting best practices"/></tags>
  </b-prompt-anatomy>
  <b-finding>
    <ex>Cinq parties plus des balises, chacune appuyée par un guide officiel.</ex>
    <gen>Le modèle ne sait que ce que dit le prompt. Anthropic propose un test : montrer le prompt à un collègue sans contexte ; s'il est perdu, le modèle le sera aussi<b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “Show your prompt to a colleague with minimal context on the task and ask them to follow it. If they&#39;d be confused, Claude will be too” — platform.claude.com, Prompting best practices"/>.</gen>
    <do>Ouvrez votre dernier prompt et repérez lesquelles des cinq parties manquent. Ajoutez un rôle et un format : deux phrases.</do>
  </b-finding>
</b-chapter>
<b-chapter id="examples" title="Six exemples" icon="browser-tab">
  <b-prompt-tabs name="ex-en">
    <b-prompt-tab id="client" icon="chat" label="Réponse client" title="Réponse à un fil de discussion client">
      <b-why>Le client écrit pour la troisième fois ; le ton doit rester calme, et l'on ne peut promettre que ce que le fil dit déjà.</b-why>
      <b-prompt-parts>
        <part icon="user-alt">Rôle</part>
        <part icon="help-circle" off>Qui et pourquoi</part>
        <part icon="file-text">Données complètes</part>
        <part icon="checklist">Exemple</part>
        <part icon="lines-alt">Format</part>
      </b-prompt-parts>
      <b-prompt>
        Tu es un agent du support chez [entreprise].
        Voici le fil complet de la conversation avec le client.
        &lt;thread&gt;
        [coller en entier]
        &lt;/thread&gt;
        Rédige la réponse suivante. Ton : calme et aimable, comme dans cet exemple :
        &lt;example&gt;
        [une bonne réponse passée]
        &lt;/example&gt;
        Pas plus de 5 phrases. N'indique des dates que si elles figurent dans le fil.
      </b-prompt>
      <b-finding>
        <ex>Un rôle, le fil dans des balises, un échantillon de ton et deux règles de format.</ex>
        <gen>Une réponse passée fixe le ton mieux que n'importe quel adjectif. La règle sur les dates est formulée comme une permission assortie d'une condition, et le modèle la suit à la lettre.</gen>
        <do>Gardez deux ou trois des meilleures réponses de l'équipe et placez-en une dans le bloc d'exemple.</do>
      </b-finding>
    </b-prompt-tab>
    <b-prompt-tab id="meeting" icon="calendar" label="Préparer une réunion" title="Préparation d'une réunion">
      <b-why>Une réunion de 30 minutes demain ; les documents sont dispersés entre des fils et des documents.</b-why>
      <b-prompt-parts>
        <part icon="user-alt" off>Rôle</part>
        <part icon="help-circle">Qui et pourquoi</part>
        <part icon="file-text">Données complètes</part>
        <part icon="checklist" off>Exemple</part>
        <part icon="lines-alt">Format</part>
      </b-prompt-parts>
      <b-prompt>
        Demain, je rencontre [qui] au sujet de [sujet], 30 minutes. Mon objectif est [la décision dont j'ai besoin].
        &lt;materials&gt;
        [fils et documents]
        &lt;/materials&gt;
        Prépare :
        1. Trois questions à trancher pendant la réunion.
        2. Pour chacune, ce que disent déjà les documents, avec une courte citation.
        3. Ce que je dois apprendre avant la réunion.
        Format : un tableau à trois colonnes.
      </b-prompt>
      <b-cap>OpenAI Academy propose un modèle d'ordre du jour avec des estimations de durée<b-proof href="https://academy.openai.com/public/resources/chatgpt-for-any-role" quote="OpenAI Academy, ChatGPT for any role: “Create a structured agenda for a meeting about [topic]. Break the agenda into sections with time estimates and goals for each section” — academy.openai.com"/>.</b-cap>
      <b-finding>
        <ex>L'objectif de la réunion, les documents dans des balises et une liste numérotée de ce qu'il faut rendre.</ex>
        <gen>L'objectif de la réunion filtre les documents. Les étapes numérotées aident quand l'ordre et l'exhaustivité comptent<b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “Provide instructions as sequential steps using numbered lists or bullet points when the order or completeness of steps matters” — platform.claude.com, Prompting best practices"/>.</gen>
        <do>Avant toute réunion de 30 minutes ou plus, passez les documents dans ce prompt et ouvrez la réunion avec son tableau.</do>
      </b-finding>
    </b-prompt-tab>
    <b-prompt-tab id="summary" icon="summary-lines" label="Résumé d'un fil" title="Résumé d'un long fil de discussion">
      <b-why>Un chat de 200 messages ; il faut savoir ce qui a été décidé et qui fait quoi.</b-why>
      <b-prompt-parts>
        <part icon="user-alt" off>Rôle</part>
        <part icon="help-circle" off>Qui et pourquoi</part>
        <part icon="file-text">Données complètes</part>
        <part icon="checklist" off>Exemple</part>
        <part icon="lines-alt">Format</part>
      </b-prompt-parts>
      <b-prompt>
        &lt;thread&gt;
        [coller en entier]
        &lt;/thread&gt;
        D'abord, recopie les citations exactes où des décisions sont prises ou des tâches attribuées.
        Ensuite, construis un résumé à partir de ces citations :
        — décisions ;
        — tâches avec responsables et dates ;
        — questions ouvertes.
        Une ligne par point. Si une citation ne nomme aucun responsable, écris « non attribué ».
      </b-prompt>
      <b-finding>
        <ex>Le long fil est en haut, la tâche à la fin, les citations d'abord, puis le résumé.</ex>
        <gen>Pour les longs documents, Anthropic conseille de demander d'abord des citations<b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “For long document tasks, ask Claude to quote relevant parts of the documents first before carrying out its task” — platform.claude.com, Prompting best practices"/> et de placer la question après les données : lors des tests, cela a amélioré la qualité jusqu'à 30 %<b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “Place your long documents and inputs near the top of your prompt, above your query, instructions, and examples”; “Queries at the end can improve response quality by up to 30 percent in tests” — platform.claude.com, Prompting best practices"/>. La règle « non attribué » empêche le modèle d'inventer un responsable.</gen>
        <do>Pour tout fil plus long qu'un écran, commencez par demander des citations.</do>
      </b-finding>
    </b-prompt-tab>
    <b-prompt-tab id="table" icon="table" label="Analyse de tableau" title="Analyse d'un tableau">
      <b-why>Un mois de tickets exporté en CSV ; trouver ce qui a changé.</b-why>
      <b-prompt-parts>
        <part icon="user-alt" off>Rôle</part>
        <part icon="help-circle" off>Qui et pourquoi</part>
        <part icon="file-text">Données complètes</part>
        <part icon="checklist" off>Exemple</part>
        <part icon="lines-alt">Format</part>
      </b-prompt-parts>
      <b-prompt>
        Ci-joint un export de [tickets] pour [période], en CSV.
        Compte les [tickets] par [thème] et montre les 5 plus fortes variations par rapport au mois dernier.
        Pour chacune, le nombre et une ligne sur ce qui peut l'expliquer.
        Montre le code utilisé pour que je puisse le vérifier.
      </b-prompt>
      <b-cap>ChatGPT comme Claude traitent le fichier dans un bac à sable (sandbox) isolé<b-proof href="https://help.openai.com/en/articles/8437071-data-analysis-with-chatgpt" quote="ChatGPT: for data analysis it writes and runs Python in an isolated environment; review the code, output and assumptions before relying on the result. Paraphrased from the OpenAI Help Center — help.openai.com/en/articles/8437071"/><b-proof href="https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude" quote="Claude: “When Claude executes code or creates files, it operates within an isolated, sandboxed container” — support.claude.com/en/articles/12111783"/>.</b-cap>
      <b-finding>
        <ex>Le fichier entier, une métrique et une ventilation exactes, une limite « top 5 » et une demande du code.</ex>
        <gen>Le modèle calcule avec du code dans un bac à sable, et le code peut être relu. OpenAI conseille de vérifier le code, le résultat et les hypothèses avant de s'y fier.</gen>
        <do>Vérifiez un chiffre de la réponse à la main. S'il concorde, faites davantage confiance au reste.</do>
      </b-finding>
    </b-prompt-tab>
    <b-prompt-tab id="style" icon="pen" label="Voix de l'entreprise" title="Un texte dans la voix de l'entreprise">
      <b-why>Il faut un post ou un e-mail qui sonne comme l'équipe, et non comme un modèle générique.</b-why>
      <b-prompt-parts>
        <part icon="user-alt" off>Rôle</part>
        <part icon="help-circle">Qui et pourquoi</part>
        <part icon="file-text" off>Données complètes</part>
        <part icon="checklist">Exemple</part>
        <part icon="lines-alt">Format</part>
      </b-prompt-parts>
      <b-prompt>
        Voici trois posts de l'entreprise qui ont bien fonctionné :
        &lt;example&gt;[post 1]&lt;/example&gt;
        &lt;example&gt;[post 2]&lt;/example&gt;
        &lt;example&gt;[post 3]&lt;/example&gt;
        Rédige un post sur [sujet] dans le même style : longueur, ton et structure comme dans les exemples.
        Pour qui : [audience]. Pourquoi : [ce que le lecteur doit faire].
      </b-prompt>
      <b-finding>
        <ex>Trois exemples dans des balises et une ligne sur le destinataire et le but.</ex>
        <gen>Anthropic recommande 3 à 5 exemples<b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “Include 3–5 examples for best results” — platform.claude.com, Prompting best practices"/> ; le guide de Google place lui aussi les exemples en tête des pratiques<b-proof href="https://www.kaggle.com/whitepaper-prompt-engineering" quote="Google, Prompt Engineering: its best practices include providing examples, being specific about the output and using instructions over constraints. Paraphrased — kaggle.com/whitepaper-prompt-engineering"/>. Un style montré par des exemples est copié plus précisément qu'un style décrit avec des mots.</gen>
        <do>Placez les bons textes dans un projet et servez-vous-en comme exemples, pour ne pas les recoller chaque fois.</do>
      </b-finding>
    </b-prompt-tab>
    <b-prompt-tab id="research" icon="search" label="Recherche" title="Recherche sur un sujet">
      <b-why>Il faut un panorama d'un marché ou d'une pratique avec des sources, soit une demi-journée de recherche à la main.</b-why>
      <b-prompt-parts>
        <part icon="user-alt" off>Rôle</part>
        <part icon="help-circle">Qui et pourquoi</part>
        <part icon="file-text" off>Données complètes</part>
        <part icon="checklist" off>Exemple</part>
        <part icon="lines-alt">Format</part>
      </b-prompt-parts>
      <b-prompt>
        Recherche : [question].
        Pour qui : [audience]. Pourquoi : [la décision à prendre].
        Données pas plus anciennes que [année].
        Sortie : un tableau [colonnes] et une conclusion en 5 points.
        Un lien vers la source pour chaque fait. S'il n'y a pas de données, dis-le.
      </b-prompt>
      <b-cap>Les deux chats ont un mode de recherche approfondie : deep research dans ChatGPT et Research dans Claude<b-proof href="https://help.openai.com/en/articles/10500283-deep-research-in-chatgpt" quote="ChatGPT: deep research gathers and synthesises information from the web into a report, takes 5 to 30 minutes and includes source links. Paraphrased from the OpenAI Help Center — help.openai.com/en/articles/10500283"/><b-proof href="https://support.claude.com/en/articles/11088861-use-research-on-claude" quote="Claude: Research is “conducting multiple searches that build on each other”, answers come “complete with easy-to-check citations”; “available for users with paid Claude plans (Pro, Max, Ultra, Team, or Enterprise)” — support.claude.com/en/articles/11088861"/>.</b-cap>
      <b-finding>
        <ex>Un objectif, une limite de fraîcheur et un format de sortie avec des liens.</ex>
        <gen>En mode recherche, le modèle enchaîne une série de recherches et renvoie un rapport avec des liens. Les liens permettent de vérifier chaque fait, et « s'il n'y a pas de données » empêche de combler les trous par des suppositions.</gen>
        <do>Ouvrez deux ou trois liens du rapport et vérifiez le fait à la source avant de transmettre la conclusion.</do>
      </b-finding>
    </b-prompt-tab>
  </b-prompt-tabs>
</b-chapter>
<b-chapter id="learn" title="Quoi étudier ensuite" icon="flag-alt">
  <b-why>Commencez par le tutoriel de 7 minutes : il explique pourquoi les techniques de cet article fonctionnent. Ensuite les guides de prompting, puis les cours quand le temps le permet.</b-why>
  <b-sublabel top="22">Fondamentaux : comment fonctionne l'IA</b-sublabel>
  <b-links cols="2">
    <item href="https://academy.claude.com/tutorials/the-4-properties-of-ai" k="Claude Academy · tutoriel, 7 minutes" t="The 4 properties of AI" ext>Prédiction du token suivant, connaissances, mémoire de travail, orientabilité : d'où viennent les forces et les faiblesses du modèle</item>
    <item href="https://academy.claude.com/courses/ai-capabilities-and-limitations" k="Claude Academy · cours, 13 leçons, 3,5 heures" t="AI Capabilities and Limitations" ext>Pourquoi un modèle invente avec aplomb, où le contexte s'épuise et quelles instructions sont fiables</item>
    <item href="https://academy.claude.com/courses/ai-fluency-framework-foundations" k="Claude Academy · cours, 14 leçons, 4 heures" t="AI Fluency: Framework & Foundations" ext>Quatre compétences : quoi déléguer, comment décrire la tâche, comment vérifier le résultat et qui en répond</item>
  </b-links>
  <b-sublabel top="22">Prompting</b-sublabel>
  <b-links cols="2">
    <item href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" k="Anthropic · documentation" t="Prompting best practices" ext>La référence principale : clarté, exemples, rôle, balises XML, longs documents</item>
    <item href="https://claude.com/resources/articles/best-practices-for-prompt-engineering" k="Anthropic · blog" t="Best practices for prompt engineering" ext>L'art général du prompting, au-delà d'un modèle précis</item>
    <item href="https://github.com/anthropics/prompt-eng-interactive-tutorial" k="Anthropic · tutoriel" t="Interactive tutorial" ext>9 chapitres avec exercices, de la structure du prompt aux balises XML et aux exemples</item>
    <item href="https://www.kaggle.com/whitepaper-prompt-engineering" k="Google · livre blanc" t="Prompt Engineering" ext>Techniques et bonnes pratiques : exemples, format de sortie, instructions plutôt que contraintes</item>
    <item href="https://academy.openai.com/public/clubs/work-users-ynjqu/resources/prompting" k="OpenAI Academy" t="Prompting" ext>Quoi, pour qui et pourquoi, contexte, format de sortie, itération</item>
    <item href="https://academy.openai.com/public/resources/chatgpt-for-any-role" k="OpenAI Academy" t="ChatGPT for any role" ext>Modèles de prompts de travail prêts à l'emploi, par tâche et par rôle</item>
  </b-links>
  <b-sublabel top="22">Pour les équipes et les administrateurs</b-sublabel>
  <b-links cols="2">
    <item href="https://support.claude.com/en/articles/14782391-claude-enterprise-consumption-guide" k="Claude · centre d'aide" t="Claude Enterprise consumption guide" ext>Comment les tokens sont dépensés : Claude Code et Cowork en consomment bien plus qu'un simple chat ; limites de groupe et modèle par défaut</item>
  </b-links>
</b-chapter>
<b-chapter id="faq" icon="chat" title="Questions fréquentes">
  <b-faq-cards>
    <q t="Qu'est-ce qui fait un bon prompt ?">Cinq parties : un rôle, à qui la réponse est destinée et pourquoi, les données complètes, un exemple et un format. La question vient à la fin.</q>
    <q t="Comment vérifier un prompt ?">Montrez-le à un collègue sans contexte : s'il s'y perd, le modèle aussi.</q>
    <q t="Pourquoi mettre un exemple dans un prompt ?">Un exemple de réponse passée fixe le ton plus précisément que n'importe quels adjectifs.</q>
    <q t="Que faire d'un bon prompt ?">L'enregistrer comme modèle : la prochaine tâche du même type en part.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Pour aller plus loin">
  <b-links cols="2">
    <item href="/blog/harness-work-approaches/" k="Approches" t="Si la réponse rate la cible">Boucle de réponse et relecture qui corrige la demande</item>
    <item href="/blog/specs-rules-skills/" k="Contexte" t="Spécifications, bible, règles et skills">Où vit un prompt au-delà d'un seul chat</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="Ingénierie" t="L'IA dans le code">Le harness et quatre groupes d'outils</item>
    <item href="/blog/chatgpt-enterprise-usage-report/" k="Rapport" t="Rapport d'usage de ChatGPT Enterprise">Qui utilise quoi dans l'entreprise</item>
  </b-links>
</b-chapter>
<b-footer>Les prompts sont des modèles : remplissez ce qui est entre crochets. Les techniques suivent les guides officiels d'Anthropic, d'OpenAI et de Google ; la source se trouve derrière l'icône à côté de chaque affirmation. Les citations du centre d'aide d'OpenAI et du guide de Google sont paraphrasées.</b-footer>
</b-post>
