---
title: Cómo escribir un buen prompt para el trabajo: cinco partes y seis ejemplos para ChatGPT y Claude
date: 2026-09-28
updated: 2026-11-08
description: Prompts para trabajar con un chat de IA: las partes de un buen prompt de trabajo, cómo se ven una petición débil y una fuerte, seis plantillas listas para tareas habituales y cómo guardarlas en un proyecto, según las guías de Anthropic, OpenAI y Google.
tags: IA, prompts, ChatGPT, Claude
category: prompts
layout: wide
toc: model=Human-in-the-loop | parts=Cinco partes | examples=Seis ejemplos | learn=Qué estudiar | faq=Preguntas | next=Para seguir leyendo
---

Un prompt de trabajo para ChatGPT y Claude se construye con cinco partes: un rol, para quién es la respuesta y para qué, los datos completos, un ejemplo y un formato, con la pregunta al final. El modelo solo sabe lo que dice la petición. La prueba es sencilla: enseña el prompt a un colega sin contexto, y si se pierde, el modelo también. Abajo hay una petición débil, una fuerte y seis plantillas para tareas habituales.

<b-post series="prompts">
<b-flow lead label="Una petición, dos resultados">
  <b-lane title="Una frase" color="muted">
    <node icon="chat" t="Petición">«escribe una respuesta al cliente»</node>
    <node icon="ai-box" t="Modelo">adivina el contexto</node>
    <node icon="file-x" t="Respuesta genérica">reescribir a mano</node>
  </b-lane>
  <b-lane title="Seis partes" color="accent">
    <node icon="prompt-stripes" t="Prompt">rol, datos, ejemplo, formato</node>
    <node icon="ai-box" t="Modelo">ve todo lo que necesita</node>
    <node icon="file-check" t="Borrador">retoques menores</node>
  </b-lane>
</b-flow>
<b-cap>El modelo es el mismo en ambos casos. El resultado depende de lo que dice el prompt: seis partes que se repiten en las guías de Anthropic, OpenAI y Google.</b-cap>
<b-chapter id="model" title="Human-in-the-loop: el camino de una petición" icon="share">
  <b-art names="work-prompts-examples/prompt-map" wide/>
  <b-finding>
    <ex>Una persona sostiene cada punto clave: plantea la tarea, construye el prompt, comprueba la respuesta, la devuelve para afinarla y toma la decisión. El modelo solo responde a lo que entró en la petición.</ex>
    <gen>Cada flecha tiene su propio punto de control: los datos entran completos, la respuesta se contrasta con quien la necesita, y una buena petición se guarda como plantilla para que la siguiente tarea del mismo tipo parta de ella.</gen>
    <do>Antes de escribir la petición, nombra al lector y la decisión que tomará con la respuesta: el rol y el formato salen de ahí.</do>
  </b-finding>
  <b-cta href="/blog/harness-driven-development/" k="Siguiente paso · HDD" t="Harness-Driven Development">Cómo convertir la comprobación de este diagrama en una regla que funcione para cada tarea siguiente</b-cta>
</b-chapter>
<b-chapter id="parts" title="Cinco partes de un prompt" icon="grid">
  <b-prompt-anatomy label="Anatomía de un prompt: rol, audiencia y objetivo, todos los datos en etiquetas, ejemplo, formato, pregunta al final" order="order">
    <part kind="role" icon="user-round" t="Rol" tip="Rol: «Eres un agente de soporte». Una frase fija el tono y el nivel"><b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “Setting a role in the system prompt focuses Claude&#39;s behavior and tone for your use case. Even a single sentence makes a difference” — platform.claude.com, Prompting best practices"/></part>
    <part kind="who" icon="target" t="Audiencia y objetivo" tip="Quién y para qué: quién lee el resultado y qué decisión alimenta"><b-proof href="https://academy.openai.com/public/clubs/work-users-ynjqu/resources/prompting" quote="OpenAI Academy: “Be clear about what you need ChatGPT to do. Outline what you want, who it&#39;s for, and why it matters” — academy.openai.com, Prompting"/><b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “Providing context or motivation behind your instructions, such as explaining to Claude why such behavior is important, can help Claude better understand your goals and deliver more targeted responses” — platform.claude.com, Prompting best practices"/></part>
    <part kind="data" icon="file-text" t="Todos los datos" tip="Datos completos: pega el hilo, el documento o la tabla enteros. La entrada larga arriba, la pregunta al final" tag="data"><b-proof href="https://academy.openai.com/public/clubs/work-users-ynjqu/resources/prompting" quote="OpenAI Academy: “Add any background (or documentation) that will help” — academy.openai.com, Prompting"/><b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “Place your long documents and inputs near the top of your prompt, above your query, instructions, and examples”; “Queries at the end can improve response quality by up to 30 percent in tests” — platform.claude.com, Prompting best practices"/></part>
    <part kind="ex" icon="card-text" t="Ejemplo" tip="Ejemplo: de una a tres muestras del tono o del formato que quieres" tag="example" note="1–3"><b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “Include 3–5 examples for best results” — platform.claude.com, Prompting best practices"/><b-proof href="https://www.kaggle.com/whitepaper-prompt-engineering" quote="Google, Prompt Engineering: sus buenas prácticas incluyen dar ejemplos, ser específico con la salida y usar instrucciones en lugar de restricciones. Paráfrasis — kaggle.com/whitepaper-prompt-engineering"/></part>
    <part kind="fmt" icon="list-dots" t="Formato" tip="Formato: «5 viñetas, una línea cada una». Di qué hacer, en lugar de enumerar prohibiciones" note="5 puntos"><b-proof href="https://academy.openai.com/public/clubs/work-users-ynjqu/resources/prompting" quote="OpenAI Academy: “Tell ChatGPT how you&#39;d like the response” — academy.openai.com, Prompting"/><b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “Tell Claude what to do instead of what not to do” — platform.claude.com, Prompting best practices"/></part>
    <part kind="q" icon="help" t="Pregunta al final" tip="Pega el hilo, el documento o la tabla enteros. La entrada larga arriba, la pregunta al final"></part>
    <tags t="etiquetas" tip="Etiquetas para las partes: &lt;thread&gt;…&lt;/thread&gt; mantiene los datos separados de la instrucción"><b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “Wrapping each type of content in its own tag (for example, &lt;instructions&gt;, &lt;context&gt;, &lt;input&gt;) reduces misinterpretation” — platform.claude.com, Prompting best practices"/></tags>
  </b-prompt-anatomy>
  <b-finding>
    <ex>Cinco partes más etiquetas, cada una respaldada por una guía oficial.</ex>
    <gen>El modelo solo sabe lo que dice el prompt. Anthropic propone una prueba: enseña el prompt a un colega sin contexto; si se confunde, el modelo también<b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “Show your prompt to a colleague with minimal context on the task and ask them to follow it. If they&#39;d be confused, Claude will be too” — platform.claude.com, Prompting best practices"/>.</gen>
    <do>Abre tu último prompt y marca cuáles de las cinco partes faltan. Añade un rol y un formato: dos frases.</do>
  </b-finding>
</b-chapter>
<b-chapter id="examples" title="Seis ejemplos" icon="browser-tab">
  <b-prompt-tabs name="ex-en">
    <b-prompt-tab id="client" icon="chat" label="Respuesta al cliente" title="Respuesta a un hilo con un cliente">
      <b-why>El cliente escribe por tercera vez; el tono debe seguir tranquilo, y solo se puede prometer lo que el hilo ya dice.</b-why>
      <b-prompt-parts>
        <part icon="user-alt">Rol</part>
        <part icon="help-circle" off>Quién y para qué</part>
        <part icon="file-text">Datos completos</part>
        <part icon="checklist">Ejemplo</part>
        <part icon="lines-alt">Formato</part>
      </b-prompt-parts>
      <b-prompt>
        Eres un agente de soporte de [empresa].
        Abajo está el hilo completo con el cliente.
        &lt;thread&gt;
        [pega el hilo entero]
        &lt;/thread&gt;
        Escribe la siguiente respuesta. Tono: tranquilo y amable, como en este ejemplo:
        &lt;example&gt;
        [una buena respuesta anterior]
        &lt;/example&gt;
        No más de 5 frases. Menciona fechas solo si aparecen en el hilo.
      </b-prompt>
      <b-finding>
        <ex>Un rol, el hilo en etiquetas, una muestra de tono y dos reglas de formato.</ex>
        <gen>Una respuesta anterior fija el tono mejor que cualquier adjetivo. La regla de las fechas está formulada como un permiso con una condición, y el modelo la sigue al pie de la letra.</gen>
        <do>Guarda dos o tres de las mejores respuestas del equipo y mete una en el bloque de ejemplo.</do>
      </b-finding>
    </b-prompt-tab>
    <b-prompt-tab id="meeting" icon="calendar" label="Preparar una reunión" title="Preparación de una reunión">
      <b-why>Una reunión de 30 minutos mañana; los materiales están repartidos entre hilos y documentos.</b-why>
      <b-prompt-parts>
        <part icon="user-alt" off>Rol</part>
        <part icon="help-circle">Quién y para qué</part>
        <part icon="file-text">Datos completos</part>
        <part icon="checklist" off>Ejemplo</part>
        <part icon="lines-alt">Formato</part>
      </b-prompt-parts>
      <b-prompt>
        Mañana me reúno con [quién] sobre [tema], 30 minutos. Mi objetivo es [la decisión que necesito].
        &lt;materials&gt;
        [hilos y documentos]
        &lt;/materials&gt;
        Prepara:
        1. Tres preguntas que resolver en la reunión.
        2. Para cada una, lo que los materiales ya dicen, con una cita breve.
        3. Lo que necesito averiguar antes de la reunión.
        Formato: una tabla de tres columnas.
      </b-prompt>
      <b-cap>OpenAI Academy tiene una plantilla de agenda con estimaciones de tiempo<b-proof href="https://academy.openai.com/public/resources/chatgpt-for-any-role" quote="OpenAI Academy, ChatGPT for any role: “Create a structured agenda for a meeting about [topic]. Break the agenda into sections with time estimates and goals for each section” — academy.openai.com"/>.</b-cap>
      <b-finding>
        <ex>El objetivo de la reunión, los materiales en etiquetas y una lista numerada de lo que debe devolver.</ex>
        <gen>El objetivo de la reunión filtra los materiales. Los pasos numerados ayudan cuando importan el orden y la exhaustividad<b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “Show your prompt to a colleague with minimal context on the task and ask them to follow it. If they&#39;d be confused, Claude will be too” — platform.claude.com, Prompting best practices"/>.</gen>
        <do>Antes de cualquier reunión de 30 minutos o más, pasa los materiales por este prompt y abre la reunión con su tabla.</do>
      </b-finding>
    </b-prompt-tab>
    <b-prompt-tab id="summary" icon="summary-lines" label="Resumen de un hilo" title="Resumen de un hilo largo">
      <b-why>Un chat de 200 mensajes; necesitas saber qué se decidió y quién hace qué.</b-why>
      <b-prompt-parts>
        <part icon="user-alt" off>Rol</part>
        <part icon="help-circle" off>Quién y para qué</part>
        <part icon="file-text">Datos completos</part>
        <part icon="checklist" off>Ejemplo</part>
        <part icon="lines-alt">Formato</part>
      </b-prompt-parts>
      <b-prompt>
        &lt;thread&gt;
        [pega el hilo entero]
        &lt;/thread&gt;
        Primero, copia las citas exactas donde se toman decisiones o se asignan tareas.
        Luego construye un resumen a partir de esas citas:
        — decisiones;
        — tareas con responsables y fechas;
        — preguntas abiertas.
        Una línea por punto. Si una cita no nombra a un responsable, escribe «sin asignar».
      </b-prompt>
      <b-finding>
        <ex>El hilo largo va arriba, la tarea al final, primero las citas y luego el resumen.</ex>
        <gen>Para documentos largos Anthropic aconseja pedir primero las citas<b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “For long document tasks, ask Claude to quote relevant parts of the documents first before carrying out its task” — platform.claude.com, Prompting best practices"/> y poner la pregunta después de los datos: en las pruebas eso mejoró la calidad hasta un 30%<b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “Place your long documents and inputs near the top of your prompt, above your query, instructions, and examples”; “Queries at the end can improve response quality by up to 30 percent in tests” — platform.claude.com, Prompting best practices"/>. La regla de «sin asignar» impide que el modelo invente un responsable.</gen>
        <do>Para cualquier hilo de más de una pantalla, empieza pidiendo las citas.</do>
      </b-finding>
    </b-prompt-tab>
    <b-prompt-tab id="table" icon="table" label="Análisis de una tabla" title="Análisis de una tabla">
      <b-why>Un mes de tickets exportados a CSV; averiguar qué cambió.</b-why>
      <b-prompt-parts>
        <part icon="user-alt" off>Rol</part>
        <part icon="help-circle" off>Quién y para qué</part>
        <part icon="file-text">Datos completos</part>
        <part icon="checklist" off>Ejemplo</part>
        <part icon="lines-alt">Formato</part>
      </b-prompt-parts>
      <b-prompt>
        Adjunto una exportación de [tickets] de [periodo], en CSV.
        Cuenta los [tickets] por [tema] y muestra los 5 mayores cambios respecto al mes anterior.
        Para cada uno, la cifra y una línea sobre lo que puede explicarlo.
        Muestra el código que usaste para que pueda comprobarlo.
      </b-prompt>
      <b-cap>Tanto ChatGPT como Claude procesan el archivo en un sandbox aislado<b-proof href="https://help.openai.com/en/articles/8437071-data-analysis-with-chatgpt" quote="ChatGPT: para el análisis de datos escribe y ejecuta Python en un entorno aislado; revisa el código, la salida y las suposiciones antes de fiarte del resultado. Paráfrasis del Centro de ayuda de OpenAI — help.openai.com/en/articles/8437071"/><b-proof href="https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude" quote="Claude: “When Claude executes code or creates files, it operates within an isolated, sandboxed container” — support.claude.com/en/articles/12111783"/>.</b-cap>
      <b-finding>
        <ex>El archivo entero, una métrica y un desglose exactos, un límite de «top 5» y una petición del código.</ex>
        <gen>El modelo calcula con código en un sandbox, y el código se puede releer. OpenAI aconseja revisar el código, la salida y las suposiciones antes de fiarse del resultado.</gen>
        <do>Comprueba a mano una cifra de la respuesta. Si coincide, confía más en el resto.</do>
      </b-finding>
    </b-prompt-tab>
    <b-prompt-tab id="style" icon="pen" label="Voz de la empresa" title="Un texto con la voz de la empresa">
      <b-why>Necesitas una publicación o un correo que suene al equipo, no a una plantilla.</b-why>
      <b-prompt-parts>
        <part icon="user-alt" off>Rol</part>
        <part icon="help-circle">Quién y para qué</part>
        <part icon="file-text" off>Datos completos</part>
        <part icon="checklist">Ejemplo</part>
        <part icon="lines-alt">Formato</part>
      </b-prompt-parts>
      <b-prompt>
        Aquí tienes tres publicaciones del equipo que funcionaron bien:
        &lt;example&gt;[publicación 1]&lt;/example&gt;
        &lt;example&gt;[publicación 2]&lt;/example&gt;
        &lt;example&gt;[publicación 3]&lt;/example&gt;
        Escribe una publicación sobre [tema] con el mismo estilo: longitud, tono y estructura como en los ejemplos.
        Para quién: [audiencia]. Para qué: [qué queremos que haga el lector].
      </b-prompt>
      <b-finding>
        <ex>Tres ejemplos en etiquetas y una línea sobre para quién es y para qué.</ex>
        <gen>Anthropic recomienda 3–5 ejemplos<b-proof href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" quote="Anthropic: “Include 3–5 examples for best results” — platform.claude.com, Prompting best practices"/>; la guía de Google también incluye los ejemplos como primera práctica<b-proof href="https://www.kaggle.com/whitepaper-prompt-engineering" quote="Google, Prompt Engineering: sus buenas prácticas incluyen dar ejemplos, ser específico con la salida y usar instrucciones en lugar de restricciones. Paráfrasis — kaggle.com/whitepaper-prompt-engineering"/>. Un estilo mostrado en ejemplos se copia con más precisión que uno descrito con palabras.</gen>
        <do>Mete los buenos textos en un proyecto y úsalos como ejemplos, para no pegarlos cada vez.</do>
      </b-finding>
    </b-prompt-tab>
    <b-prompt-tab id="research" icon="search" label="Investigación" title="Investigar un tema">
      <b-why>Necesitas un panorama de un mercado o de una práctica con fuentes, medio día de búsqueda a mano.</b-why>
      <b-prompt-parts>
        <part icon="user-alt" off>Rol</part>
        <part icon="help-circle">Quién y para qué</part>
        <part icon="file-text" off>Datos completos</part>
        <part icon="checklist" off>Ejemplo</part>
        <part icon="lines-alt">Formato</part>
      </b-prompt-parts>
      <b-prompt>
        Investigación: [pregunta].
        Para quién: [audiencia]. Para qué: [la decisión que hay que tomar].
        Datos de no más de [año] de antigüedad.
        Salida: una tabla [columnas] y una conclusión de 5 puntos.
        Un enlace a la fuente para cada hecho. Si no hay datos, dilo.
      </b-prompt>
      <b-cap>Ambos chats tienen un modo de investigación profunda: deep research en ChatGPT y Research en Claude<b-proof href="https://help.openai.com/en/articles/10500283-deep-research-in-chatgpt" quote="ChatGPT: deep research reúne y sintetiza información de la web en un informe, tarda de 5 a 30 minutos e incluye enlaces a las fuentes. Paráfrasis del Centro de ayuda de OpenAI — help.openai.com/en/articles/10500283"/><b-proof href="https://support.claude.com/en/articles/11088861-use-research-on-claude" quote="Claude: Research is “conducting multiple searches that build on each other”, answers come “complete with easy-to-check citations”; “available for users with paid Claude plans (Pro, Max, Team, or Enterprise)” — support.claude.com/en/articles/11088861"/>.</b-cap>
      <b-finding>
        <ex>Un objetivo, un límite de antigüedad y un formato de salida con enlaces.</ex>
        <gen>En el modo de investigación el modelo hace una serie de búsquedas y devuelve un informe con enlaces. Los enlaces permiten comprobar cada hecho, y «si no hay datos» evita que los huecos se rellenen con conjeturas.</gen>
        <do>Abre dos o tres enlaces del informe y comprueba el hecho en la fuente antes de pasar la conclusión.</do>
      </b-finding>
    </b-prompt-tab>
  </b-prompt-tabs>
</b-chapter>
<b-chapter id="learn" title="Qué estudiar después" icon="flag-alt">
  <b-why>Empieza por el tutorial de 7 minutos: explica por qué funcionan las técnicas de este artículo. Luego las guías de prompting, y los cursos cuando tengas tiempo.</b-why>
  <b-sublabel top="22">Fundamentos: cómo funciona la IA</b-sublabel>
  <b-links cols="2">
    <item href="https://academy.claude.com/tutorials/the-4-properties-of-ai" k="Claude Academy · tutorial, 7 minutos" t="The 4 properties of AI" ext>Predicción del siguiente token, conocimiento, memoria de trabajo, capacidad de guía: de dónde vienen los puntos fuertes y débiles del modelo</item>
    <item href="https://academy.claude.com/courses/ai-capabilities-and-limitations" k="Claude Academy · curso, 13 lecciones, 3,5 horas" t="AI Capabilities and Limitations" ext>Por qué un modelo se inventa cosas con seguridad, dónde se acaba el contexto y qué instrucciones son fiables</item>
    <item href="https://academy.claude.com/courses/ai-fluency-framework-foundations" k="Claude Academy · curso, 14 lecciones, 4 horas" t="AI Fluency: Framework & Foundations" ext>Cuatro habilidades: qué delegar, cómo describir la tarea, cómo comprobar el resultado y quién responde de él</item>
  </b-links>
  <b-sublabel top="22">Prompting</b-sublabel>
  <b-links cols="2">
    <item href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" k="Anthropic · documentación" t="Prompting best practices" ext>La referencia principal: claridad, ejemplos, rol, etiquetas XML, documentos largos</item>
    <item href="https://claude.com/blog/best-practices-for-prompt-engineering" k="Anthropic · blog" t="Best practices for prompt engineering" ext>El oficio general del prompting más allá de un modelo concreto</item>
    <item href="https://github.com/anthropics/prompt-eng-interactive-tutorial" k="Anthropic · tutorial" t="Interactive tutorial" ext>9 capítulos con ejercicios, de la estructura del prompt a las etiquetas XML y los ejemplos</item>
    <item href="https://www.kaggle.com/whitepaper-prompt-engineering" k="Google · whitepaper" t="Prompt Engineering" ext>Técnicas y buenas prácticas: ejemplos, formato de salida, instrucciones en lugar de restricciones</item>
    <item href="https://academy.openai.com/public/clubs/work-users-ynjqu/resources/prompting" k="OpenAI Academy" t="Prompting" ext>Qué, para quién y para qué, contexto, formato de salida, iteración</item>
    <item href="https://academy.openai.com/public/resources/chatgpt-for-any-role" k="OpenAI Academy" t="ChatGPT for any role" ext>Plantillas de prompts de trabajo listas, por tarea y rol</item>
  </b-links>
  <b-sublabel top="22">Para equipos y administradores</b-sublabel>
  <b-links cols="2">
    <item href="https://support.claude.com/en/articles/14782391-claude-enterprise-consumption-guide" k="Claude · centro de ayuda" t="Claude Enterprise consumption guide" ext>Cómo se gastan los tokens: Claude Code y Cowork usan mucho más que un chat normal; límites por grupo y un modelo por defecto</item>
  </b-links>
</b-chapter>
<b-chapter id="faq" icon="chat" title="Preguntas frecuentes">
  <b-faq-cards>
    <q t="¿Qué hace bueno a un prompt?">Cinco partes: un rol, para quién es la respuesta y para qué, los datos completos, un ejemplo y un formato. La pregunta va al final.</q>
    <q t="¿Cómo se comprueba un prompt?">Enséñaselo a un colega sin contexto: si se pierde, el modelo también.</q>
    <q t="¿Por qué poner un ejemplo en un prompt?">Un ejemplo de una respuesta anterior fija el tono con más precisión que cualquier adjetivo.</q>
    <q t="¿Qué se hace con un buen prompt?">Guardarlo como plantilla: la siguiente tarea del mismo tipo parte de él.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Para seguir leyendo">
  <b-links cols="2">
    <item href="/blog/harness-work-approaches/" k="Enfoques" t="Si la respuesta no acierta">Ciclo de respuesta y revisión que corrige la petición</item>
    <item href="/blog/specs-rules-skills/" k="Contexto" t="Specs, biblia, reglas y skills">Dónde vive un prompt más allá de un chat</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="Ingeniería" t="IA en el código">El harness y tres grupos de herramientas</item>
    <item href="/blog/chatgpt-enterprise-usage-report/" k="Informe" t="Informe de uso de ChatGPT Enterprise">Quién en la empresa usa qué</item>
  </b-links>
</b-chapter>
<b-footer>Los prompts son plantillas: rellena lo que va entre corchetes. Las técnicas siguen las guías oficiales de Anthropic, OpenAI y Google; la fuente está tras el icono junto a cada afirmación. Las citas del Centro de ayuda de OpenAI y de la guía de Google son paráfrasis.</b-footer>
</b-post>
