---
title: Escalado a una persona en agentes de IA: cómo un agente se detiene y pregunta mediante MCP y hooks
date: 2026-11-14
updated: 2026-11-18
description: Un agente de IA traspasa una decisión a una persona mediante las tres respuestas de elicitation en MCP, los modos de permisos y los hooks de Claude Code.
tags: IA, agentes, MCP, elicitation, escalado, hooks, Claude Code, autonomía, harness
category: harness
layout: wide
mentions: MCP, hooks, harness, bounded context, quality gate, Google DeepMind, escalation to a human
toc: answer=En resumen | seen=Primera impresión | penalty=Penalización | measure=Métricas | time=Autonomía | behavior=Comportamiento | mcp=MCP | cc=Claude Code | narrow=Ventana | claims=Resultados | start=Empezar | faq=Preguntas | next=Seguir leyendo
---
El escalado a una persona es el momento en que un agente deja de trabajar y traspasa una decisión: mediante una pregunta, una petición de permiso o una confirmación. MCP tiene para ello elicitation (accept, decline, cancel); Claude Code, hooks y modos de permisos. La comprobación está fuera del agente. Abajo: el aspecto inicial y las comprobaciones.

<b-post series="harness">
<b-callout icon="bulb">**Una observación.** Pensaba que a los agentes se les entrena y se les mide por cuánto tiempo trabajan por su cuenta, sin una persona. La puntuación se da por el resultado: tarea resuelta vale 1, no resuelta vale 0. Una pregunta a una persona no produce por sí sola un resultado, así que la penalización llega por la tarea sin terminar, y adivinar compensa más. Lo comprobé con documentos y artículos científicos y deduje las fórmulas que siguen. Una penalización por la pregunta en sí resultó ser rara: algunas métricas no contemplan una pregunta y algunas la recompensan.</b-callout>

<b-chapter id="answer" icon="chat" title="En resumen: qué es el escalado y por dónde pasa">
  <b-art names="agent-escalation-to-human/window" wide/>
  <b-cap>El agente trabaja en su propio contexto; una pregunta pasa a la persona al otro lado del separador y vuelve una de tres respuestas.</b-cap>
  <b-why align="left"><b-icon name="chat"/> **Qué es.** El escalado es una parada iniciada por el agente o por el programa que lo rodea: «aquí no me corresponde decidir, hace falta una persona». Tres tipos habituales: una pregunta aclaratoria, una solicitud de permiso para una acción peligrosa, una confirmación del resultado antes de integrarlo (merge). La puerta de calidad de [«Qué son las puertas de calidad para agentes de IA»](/blog/quality-gates-ai-agents/) entrega a una persona todo aquello de lo que la comprobación «no está segura», así que el escalado continúa la puerta.</b-why>
  <b-why align="left"><b-icon name="package"/> **Cómo funciona en MCP.** Un servidor puede preguntar a una persona a través del cliente: en la especificación esto es elicitation. Hay tres respuestas: accept, decline, cancel. Un servidor no puede contar con que haya respuesta: el propio protocolo exige tratar un decline y un cancel.</b-why>
  <b-why align="left"><b-icon name="shield-check"/> **Cómo funciona en Claude Code.** Los modos de permisos deciden qué llamadas van a una persona, y los hooks interceptan una llamada y responden «allow», «deny» o «ask». El programa lo impone, mientras que el texto de las instrucciones solo orienta.</b-why>
  <b-finding>
    <ex>Un agente edita la configuración de un servidor de reservas. Un hook ve la ruta de una configuración en producción y responde «ask»: una persona recibe una ventana con una pregunta. Si nadie responde y la ejecución no tiene interfaz, la llamada se rechaza y el agente continúa con otro plan.</ex>
    <gen>El escalado tiene dos partes: el programa que rodea al agente decide «preguntar», y la respuesta viene de una persona a través de una ventana estrecha.</gen>
    <do>Anote tres acciones del agente tras las cuales quiere ver una pregunta: borrado, publicación, cambio de permisos. Todo lo demás puede permitirse sin preguntas.</do>
  </b-finding>
</b-chapter>

<b-chapter id="seen" icon="eye" title="Cómo se veía al principio">
  <b-why align="left">La observación de partida era sencilla: los agentes rara vez se detienen a preguntar, y más a menudo adivinan y siguen. De ahí salió una cadena de cuatro suposiciones, y cada una tenía que comprobarse por separado.</b-why>
  <b-rules cols="2">
    <rule icon="shield-check" t="1. La comprobación está fuera">Una puerta y una pregunta a una persona deben vivir fuera del agente, o este decidirá por sí mismo.</rule>
    <rule icon="clock" t="2. Se entrena a los agentes para la autonomía">Se entrena y se mide a los agentes por cuánto tiempo trabajan por su cuenta: hasta dónde llegan desde el inicio hasta la parada sin una persona.</rule>
    <rule icon="x" t="3. Una pregunta es una pérdida">La puntuación da 1 por una tarea resuelta y 0 por una no resuelta. Una pregunta sin solución da 0, mientras que una conjetura puede dar 1, así que preguntar no compensa.</rule>
    <rule icon="package" t="4. MCP es un cuello de botella">Por MCP solo pasan una pregunta y una respuesta, y el host decide el resto.</rule>
  </b-rules>
  <b-why align="left">A continuación, por orden: qué miden los benchmarks, qué significa «tiempo autónomo», cómo preguntan los agentes en la práctica, qué dicen MCP y Claude Code. Las expectativas y los hallazgos se ponen lado a lado en una tabla cerca del final. Primero, dónde está exactamente la penalización en una métrica así.</b-why>
</b-chapter>

<b-chapter id="penalty" icon="x" title="Por qué se penaliza a un agente: la métrica y sus fórmulas">
  <b-why align="left">Dos esquemas muestran qué magnitud baja cuando un agente se detiene y pregunta. Es un registro simplificado según el sentido de las métricas de las fuentes; las citas aparecen en los capítulos sobre las comprobaciones.</b-why>
  <b-art names="agent-escalation-to-human/score-cases" wide/>
  <b-cap>Puntuación por resultado: una respuesta correcta da 1, una incorrecta y una parada sin solución dan 0.</b-cap>
  <b-why align="left">La penalización recae sobre el resultado sin terminar: una parada sin solución recibe el mismo 0 que un error. Si existe un canal y la tarea se resuelve tras la respuesta, la pregunta incluso compensa, y así está construido HiL-Bench.</b-why>
  <b-art names="agent-escalation-to-human/turn-cut" wide/>
  <b-cap>Una pregunta corta el turno: un ejemplo inventado de 60 minutos.</b-cap>
  <b-why align="left">En Anthropic una pregunta pone fin al turno medido. El propio laboratorio llama supervisión a la parada de un agente.</b-why>
  <b-finding>
    <ex>Un agente dedica cuarenta minutos a arreglar una exportación, se topa con dos vías igualmente válidas y pregunta a una persona. Con una puntuación por resultado, la pregunta no cuesta nada mientras la tarea se resuelva después. Con la longitud del turno, parte 60 minutos en 40 y 20.</ex>
    <gen>La penalización está en dos sitios: el cero de una tarea no resuelta y el corte de un turno en una pregunta. Ninguna de las métricas revisadas resta por la pregunta en sí.</gen>
    <do>Escriba la fórmula de su métrica: qué hay en el numerador y qué le ocurre a la puntuación si el agente se detuvo y preguntó.</do>
  </b-finding>
</b-chapter>

<b-chapter id="measure" icon="gauge" title="Comprobación: qué miden los benchmarks de autonomía y dónde está en ellos una persona">
  <b-why align="left">La autonomía se mide de maneras distintas, y la manera decide si una métrica puede ver una parada para hacer una pregunta. Por orden, a continuación: la imagen de una métrica con línea de meta, el horizonte de METR, los benchmarks clásicos y las métricas en las que cuenta una pregunta.</b-why>
  <b-art names="agent-escalation-to-human/finish-line" wide/>
  <b-cap>La métrica marca la meta; el camino de una pregunta hacia una persona no entra en la cuenta.</b-cap>
  <b-subhead>El horizonte de METR: cuánto tarda una persona en una tarea</b-subhead>
  <b-why align="left">METR define el horizonte como el tiempo que suelen tardar las personas en tareas que el modelo resuelve con un 50 % de éxito<b-proof href="https://arxiv.org/abs/2503.14499" quote="METR, arXiv 2503.14499: „the time humans typically take to complete tasks that AI models can complete with 50% success rate“"/>. El tiempo de una tarea sale de ejecuciones humanas exitosas. El conjunto no tiene tareas que impliquen una petición a una persona, y el propio METR advierte de que el horizonte no es el tiempo de trabajo independiente<b-proof href="https://metr.org/notes/2026-01-22-time-horizon-limitations/" quote="METR, 22.01.2026: „Time horizon is not the length of time AIs can work independently“; „We have no tasks involving multi-turn interaction with a human so there is no right answer.“"/>. En el informe del 19 de mayo de 2026, el mejor modelo compartido obtuvo 16–20 horas en el nivel del 50 % y 3–4 horas en el nivel del 80 %<b-proof href="https://metr.org/blog/2026-05-19-frontier-risk-report/" quote="METR, Frontier Risk Report: „the 50% time horizon point estimate of the most capable shared model was between 16 and 20 hours“"/>.</b-why>
  <b-codebox title="Cómo se calcula el horizonte de METR">
    p(éxito | tarea de longitud t) = σ( (ln h − ln t) · β )
    h — el horizonte: la longitud de tarea en la que p = 0,5
    t — la media geométrica de los tiempos de ejecución humanos exitosos
  </b-codebox>
  <b-why align="left">El método de METR es una curva logística sobre la longitud de la tarea, con el horizonte tomado en el punto del 50 % (o del 80 %)<b-proof href="https://arxiv.org/abs/2503.14499" quote="METR, arXiv 2503.14499: „we use logistic regression to find the task difficulty at which the agent has a 50% chance of success“"/>. El tiempo propio del agente no aparece en ninguna parte de la fórmula.</b-why>
  <b-art names="agent-escalation-to-human/horizon" wide/>
  <b-cap>Horas de tarea del mejor modelo: en el nivel del 50 % y en el del 80 %.</b-cap>
  <b-subhead>Benchmarks de tareas: no hay en ellos una persona</b-subhead>
  <b-why align="left">SWE-bench puntúa con pruebas: «the percentage of task instances that are resolved»<b-proof href="https://arxiv.org/abs/2310.06770" quote="SWE-bench: „The metric for our benchmark is the percentage of task instances that are resolved.“"/>. En OSWorld, Terminal-Bench, GAIA y Cybench juzga un script, una prueba o una bandera, y no hay canal hacia una persona. La frase «minimal human intervention» en esos artículos describe un objetivo o el crecimiento del conjunto, y no es una métrica. En tau-bench la recompensa es 0 o 1 según la base de datos final, y un traspaso a una persona es una acción corriente: en algunas tareas forma parte de la referencia, en el resto la base de datos no coincidirá.</b-why>
  <b-subhead>Métricas en las que cuenta una pregunta: HiL-Bench, HAS-Bench, Anthropic</b-subhead>
  <b-why align="left">Estas tres fuentes cuentan una pregunta de manera distinta, así que va primero el contraste más nítido: qué le ocurre a un modelo cuando una tarea no puede resolverse sin preguntar.</b-why>
  <b-art names="agent-escalation-to-human/hil-bench" wide/>
  <b-cap>Cuando la parte que falta debe averiguarse preguntando a una persona, la proporción de tareas resueltas se divide varias veces.</b-cap>
  <b-why align="left">HiL-Bench, de Scale AI, está construido de modo que una tarea no puede resolverse sin preguntar. Los autores escriben que los benchmarks ordinarios son ciegos a este fallo<b-proof href="https://arxiv.org/abs/2604.09408" quote="HiL-Bench, 04.05.2026: „an agent that makes a lucky guess for a missing requirement will score identically to one that would have asked to be certain“"/>. Con una función «preguntar a una persona», los mejores modelos resuelven del 1 al 39 % de las tareas, frente al 67–91 % con información completa. La recompensa de entrenamiento: +0,3 por una pregunta pertinente y −0,1 por una superflua. HAS-Bench introduce la proporción de intervención humana como cifra descriptiva<b-proof href="https://arxiv.org/abs/2607.04329" quote="HAS-Bench, 05.07.2026: „HIR is a descriptive cost/intensity metric. Higher HIR means more human involvement, not necessarily better task performance.“"/>. En su trabajo sobre autonomía en producción, Anthropic cuenta por separado las intervenciones y las paradas iniciadas por el agente, y llama a las paradas una forma de supervisión<b-proof href="https://www.anthropic.com/research/measuring-agent-autonomy" quote="Anthropic, 18.02.2026: „agent-initiated stops are an important kind of oversight in deployed systems.“"/>.</b-why>
  <b-codebox title="Tres maneras de contar una pregunta">
    HiL-Bench:  r_pregunta = +0,3 si la pregunta apunta a algo que falta
                r_pregunta = −0,1 si es superflua o repetida
                una tarea cuenta solo cuando todo lo que falta está resuelto
    HAS-Bench:  HIR = pasos hechos por personas / todos los pasos   (una descripción, no una penalización)
    Anthropic:  una parada del agente cuenta como supervisión, una intervención aparte
  </b-codebox>
  <b-art names="agent-escalation-to-human/metrics" wide/>
  <b-cap>Cuatro maneras de tratar la pregunta de un agente: sin canal, neutral, recompensa, una forma de supervisión.</b-cap>
  <b-why align="left">Este resumen junta las cuatro maneras: el mismo trabajo del agente, mientras que una métrica puede no ver una pregunta, recompensarla o contarla como supervisión.</b-why>
  <b-finding>
    <ex>El mismo agente no puede preguntar en SWE-bench, pregunta a cambio de una recompensa en HiL-Bench y, en las métricas de producción de Anthropic, su parada se registra como supervisión. Hay más de una métrica, y una petición a una persona se registra de forma distinta en cada una.</ex>
    <gen>La afirmación «las métricas de autonomía castigan una pregunta» es errónea como regla general. Lo que se sostiene es más acotado: los benchmarks clásicos no contemplan una pregunta, y una parada sin solución equivale a un fallo.</gen>
    <do>Pregunte por su propia métrica de autonomía: qué registra cuando el agente se detuvo y preguntó: éxito, fallo o nada.</do>
  </b-finding>
</b-chapter>

<b-chapter id="time" icon="clock" title="Qué cuenta como tiempo autónomo en METR, Anthropic y DeepMind">
  <b-why align="left">La expresión «tiempo autónomo» significa tres cosas distintas en tres laboratorios, y eso decide si la pregunta de un agente a una persona daña la métrica. A continuación, por turnos: qué cuenta METR, qué cuenta Anthropic y qué cuenta Google DeepMind.</b-why>
  <b-art names="agent-escalation-to-human/three-clocks" wide/>
  <b-cap>Tres medidas: las horas de una persona en la tarea, un turno desde el inicio hasta la parada, una tarea sin intervención humana.</b-cap>
  <b-why align="left">«Trabajar por su cuenta» puede medirse de tres maneras. La primera: cuántas horas le lleva a una persona una tarea que el agente resuelve. La segunda: hasta dónde llega el agente desde el inicio hasta la parada. La tercera: qué proporción de tareas se hace sin intervención humana. Cada una tiene su propia fórmula.</b-why>
  <b-subhead>METR: la dificultad de una tarea, el tiempo propio del agente no está en la métrica</b-subhead>
  <b-why align="left">El propio METR responde si este es el tiempo de trabajo independiente<b-proof href="https://metr.org/notes/2026-01-22-time-horizon-limitations/" quote="METR, 22.01.2026: „Time horizon is not the length of time AIs can work independently. Rather, it's the amount of serial human labor they can replace with a 50% success rate.“"/>. Las preguntas frecuentes de la página de horizontes dicen lo mismo: mide la dificultad de una tarea, y el tiempo que emplea una IA no forma parte de ella<b-proof href="https://metr.org/time-horizons" quote="METR, FAQ: „It’s a measure of the difficulty of a task, rather than the time an AI spends to complete the task.“"/>. METR no publica el tiempo propio del agente: varía mucho según el proveedor del modelo y la configuración del agente.</b-why>
  <b-subhead>Anthropic: el turno de un agente desde el inicio hasta la parada</b-subhead>
  <b-why align="left">En su trabajo sobre autonomía en producción, el tiempo se cuenta de forma mecánica a partir de la telemetría de Claude Code: desde el inicio del trabajo hasta una parada, y una parada puede ser una pregunta a una persona<b-proof href="https://www.anthropic.com/research/measuring-agent-autonomy" quote="Anthropic, 18.02.2026: „tracking how much time has elapsed between when Claude starts working and when it stops (whether because it finished the task, asked a question, or was interrupted by the user)“"/>. Así, la pregunta de un agente corta el turno y acorta formalmente el tiempo medido. Los propios autores advierten de que la longitud del turno es un indicador imperfecto de la autonomía.</b-why>
  <b-why align="left">Anthropic no trata una parada para preguntar como un defecto. En sus palabras, en tareas más difíciles Claude limita su propia autonomía deteniéndose a consultar a la persona, y una nota al pie añade que preguntar al usuario es en sí mismo una forma de agencia<b-proof href="https://www.anthropic.com/research/measuring-agent-autonomy" quote="Anthropic: „stopping to ask the user a question is itself a form of agency“"/>. Solo cuenta una pregunta bloqueante del tipo «necesito esto para continuar»; una pregunta como «¿hago el commit?» tras una tarea terminada no es una parada.</b-why>
  <b-subhead>Google DeepMind: la tarea se hace sin intervención humana</b-subhead>
  <b-why align="left">DeepMind no tiene una métrica de longitud de turno. En «Levels of AGI» la autonomía se describe por niveles, desde «AI as a Tool» hasta «AI as an Agent», por estilo de interacción y no por tiempo, y la capacidad de acudir a una persona forma parte del nivel superior: una IA totalmente autónoma actúa sin supervisión continua pero sabe cuándo consultar a las personas<b-proof href="https://arxiv.org/abs/2311.02462" quote="Levels of AGI, arXiv 2311.02462: „such a fully autonomous AI can act in an aligned fashion without continuous human oversight, but knows when to consult humans“"/>. En el informe del Frontier Safety Framework (octubre de 2026) la autonomía se define como «la tarea se hizo sin intervención humana»: se examina si el agente tuvo éxito por sí solo y si intervino una persona, y la proporción de pull requests totalmente delegadas creció del 7,5 % al 11,9 %<b-proof href="https://storage.googleapis.com/deepmind-media/gemini/gemini_4_argon_fsf_report.pdf" quote="Gemini 4 Argon FSF report: „whether the agent succeeded autonomously, and whether the human intervened or the outcome was otherwise negative or ambiguous“"/>. Allí no se encontró una métrica aparte de «el agente preguntó a una persona».</b-why>
  <b-table>

| Quién | Qué cuenta como autónomo | La pregunta de un agente a una persona |
|---|---|---|
| **METR** | dificultad de la tarea en horas humanas | no existe tal evento: las tareas no tienen diálogo |
| **Anthropic** | longitud del turno hasta una parada | corta el turno pero se llama supervisión |
| **Google DeepMind** | una tarea sin intervención humana | no es una intervención, no se cuenta aparte |

  </b-table>
  <b-finding>
    <ex>El agente se detuvo y preguntó. En Anthropic el turno terminó ahí, en METR no existe tal evento, y a DeepMind le importa si una persona intervino por iniciativa propia.</ex>
    <gen>La pregunta de un agente acorta el turno solo en Anthropic, e incluso allí se llama supervisión. Los laboratorios cuentan como lo negativo la intervención por iniciativa de una persona.</gen>
    <do>Cuando le den horas de trabajo autónomo de un agente, pregunte de qué medida se trata: longitud del turno, dificultad de la tarea o proporción de tareas sin intervención.</do>
  </b-finding>
</b-chapter>

<b-chapter id="behavior" icon="eye" title="Comprobación: ¿preguntan de verdad los agentes?">
  <b-art names="agent-escalation-to-human/ask-rate" wide/>
  <b-cap>La proporción de sesiones con una pregunta en un estudio: de cero a la mitad.</b-cap>
  <b-why align="left">No hay una proporción única; el resultado depende del modelo, del prompt y del harness. Sin permiso para preguntar, los modelos casi no hablan: en Ambig-SWE (500 tareas de SWE-bench) «without explicit prompting, models almost never interact»<b-proof href="https://arxiv.org/abs/2502.13069" quote="Ambig-SWE, arXiv 2502.13069: „Without explicit prompting, models almost never interact, even for severely underspecified inputs.“"/>. Con un prompt, Sonnet 4 pregunta en tareas poco especificadas en el 82 % de los casos, en las completas en el 3 %. El gráfico de arriba muestra «Ask Early, Ask Late, Ask Right», otro conjunto: Sonnet 4.5 preguntó en el 23 % de las sesiones, GPT-5.2 en el 52 %, Gemini 3 Flash en el 0 %, y ningún modelo preguntó en la mejor ventana, hacia el 10 % de la ejecución (arXiv 2605.07937).</b-why>
  <b-why align="left">Existe también el extremo opuesto. En LHAW (arXiv 2602.10525), GPT-5.2 pregunta en el 81–97 % de las ejecuciones con poco beneficio por pregunta, y en «Ask or Assume» (arXiv 2603.26233) Sonnet 4.5 pregunta en el 73,8 % de las tareas. Las personas también se saturan: según los datos de Anthropic sobre el modo auto, los usuarios aceptan el 93 % de las solicitudes de permiso, y la publicación habla directamente de fatiga de confirmación<b-proof href="https://www.anthropic.com/engineering/claude-code-auto-mode" quote="Anthropic, 25.03.2026: „users accept 93%“ of permission requests"/>.</b-why>
  <b-art names="agent-escalation-to-human/ask-extremes" wide/>
  <b-cap>Dos extremos: callar y adivinar, o inundar con preguntas.</b-cap>
  <b-why align="left">La causa «el entrenamiento recompensa terminar» la plantean los autores de varios artículos, pero no hay medición para agentes. Un artículo relacionado de Kalai et al. (arXiv 2509.04664) muestra que con una calificación binaria abstenerse no compensa, y 9 de 10 benchmarks comprobados son binarios, SWE-bench incluido. Ese artículo trata de la respuesta «no lo sé»; trasladarlo a una pregunta a una persona sigue siendo una analogía.</b-why>
  <b-finding>
    <ex>Un agente sin permiso para preguntar calla y adivina, mientras que un agente con permiso inunda de preguntas a una persona. Ambos casos están registrados en mediciones, así que hay que fijar las condiciones: cuándo preguntar y con qué frecuencia.</ex>
    <gen>«Los agentes no preguntan» y «los agentes preguntan demasiado» son ciertos los dos, en modelos y configuraciones distintos.</gen>
    <do>Dé al agente un umbral explícito: «pregunta si la decisión es irreversible o si hay dos lecturas igual de válidas de la tarea; el resto, decídelo tú».</do>
  </b-finding>
</b-chapter>

<b-chapter id="mcp" icon="package" title="Comprobación: qué dice MCP sobre elicitation">
  <b-why align="left">Elicitation es la manera en que un servidor MCP pide a una persona datos adicionales a través del cliente<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28/client/elicitation" quote="MCP specification: „The Model Context Protocol (MCP) provides a standardized way for servers to request additional information from users through the client during interactions.“"/>. A continuación van los hechos de la versión 2026-07-28 y lo que cambió en ella.</b-why>
  <b-rules cols="2">
    <rule icon="check" t="Tres respuestas">Accept: la persona aprobó y envió datos. Decline: la persona dijo explícitamente «no». Cancel: la persona cerró la ventana sin elegir<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28/client/elicitation#response-actions" quote="MCP specification: „Decline (action: 'decline'): User explicitly declined the request“; „Cancel (action: 'cancel'): User dismissed without making an explicit choice“"/>. El servidor debe tratar un decline y un cancel<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28/client/elicitation#error-handling" quote="MCP specification: „Servers SHOULD NOT assume that elicitation requests will always succeed, and MUST handle cases where the user declines or cancels the elicitation“"/>.</rule>
    <rule icon="layers" t="Dos modos">Form: un esquema plano con campos simples, el cliente ve los datos. URL: se envía a la persona a una dirección externa y los datos no pasan por el cliente ni por el modelo. Pedir contraseñas, claves y datos de pago mediante un formulario está prohibido, y el modo URL existe para ellos<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28/client/elicitation#user-interaction-model" quote="MCP specification: „Servers MUST NOT use form mode elicitation to request sensitive information such as passwords, API keys, access tokens, or payment credentials.“"/>.</rule>
    <rule icon="refresh" t="Novedad en 2026-07-28">Un servidor ya no envía una petición por iniciativa propia: responde a una petición del cliente con un resultado «input required», el cliente recoge la respuesta y repite la petición<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28/basic/patterns/mrtr" quote="MCP specification: „Servers MUST send server-to-client requests (such as roots/list, sampling/createMessage, or elicitation/create) using the MRTR pattern. The previous pattern of server-initiated requests is no longer supported.“"/>. Sampling, Roots y Logging se marcan como obsoletos (SEP-2577).</rule>
    <rule icon="user" t="Human in the loop">Para elicitation, el cliente debe mostrar qué servidor pregunta, ofrecer decline y cancel, y dejar que la persona revise y edite la respuesta de un formulario. Para las llamadas a funciones y el sampling la redacción es más blanda: «SHOULD always be a human in the loop»<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28/server/tools#user-interaction-model" quote="MCP specification: „For trust & safety and security, there SHOULD always be a human in the loop with the ability to deny tool invocations.“"/>.</rule>
  </b-rules>
  <b-why align="left">Los dos modos se diferencian en una cosa: quién ve la respuesta de la persona. La imagen lo muestra.</b-why>
  <b-art names="agent-escalation-to-human/elicit-modes" wide/>
  <b-cap>Form y URL: quién ve la respuesta de la persona.</b-cap>
  <b-why align="left">Lo que falta en la especificación. No permite ni prohíbe que un cliente o un agente responda en lugar de una persona: la palabra «user» aparece en todas partes, y no se impone ninguna interfaz («the protocol itself does not mandate any specific user interaction model»). Tampoco hay sanciones para una respuesta automática así, y la propia especificación lo dice<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28" quote="MCP specification: „While MCP itself cannot enforce these security principles at the protocol level, implementors SHOULD: 1. Build robust consent and authorization flows into their applications“"/>. Las palabras «bottleneck» o «limitation» no aparecen en la especificación.</b-why>
  <b-finding>
    <ex>Un servidor de pagos pide confirmar una transferencia. Si el cliente pulsa «accept» por sí mismo, el protocolo no lo notará: el control queda en el host y sus ajustes.</ex>
    <gen>MCP describe cómo preguntar y qué respuestas existen, pero quién responde y si se puede responder por una persona lo decide el cliente.</gen>
    <do>Compruebe su cliente: ¿puede un agente o un script responder a elicitation en lugar de una persona? Si puede, prohíbalo para los servidores peligrosos.</do>
  </b-finding>
</b-chapter>

<b-chapter id="cc" icon="shield-check" title="Comprobación: modos, hooks y una pregunta a una persona en Claude Code">
  <b-art names="agent-escalation-to-human/hook-vs-text" wide/>
  <b-cap>Un hook y las reglas de permisos los impone el programa. El texto de las instrucciones sigue siendo un consejo.</b-cap>
  <b-why align="left">La documentación de Claude Code lo dice directamente: las reglas de permisos las impone el programa Claude Code, y las instrucciones de un prompt o de CLAUDE.md no cambian lo que permite<b-proof href="https://code.claude.com/docs/en/permissions" quote="Claude Code docs: „Permission rules are enforced by Claude Code, not by the model. Instructions in your prompt or CLAUDE.md shape what Claude tries to do, but they don't change what Claude Code allows.“"/>.</b-why>
  <b-subhead>Modos: cuántas preguntas llegan a una persona</b-subhead>
  <b-why align="left">La persona elige el modo al iniciar: decide cuántas preguntas le llegan en absoluto.</b-why>
  <b-art names="agent-escalation-to-human/modes-ladder" wide/>
  <b-cap>Seis modos, desde «pregunta todo» hasta «no pregunta nada», y qué no se aprueba automáticamente.</b-cap>
  <b-why align="left">Incluso en el modo más libre hay cosas que no se aprueban automáticamente: la función integrada AskUserQuestion, las funciones MCP marcadas como que requieren interacción del usuario y las reglas «ask»<b-proof href="https://code.claude.com/docs/en/permission-modes" quote="Claude Code docs: „Claude Code doesn't auto-approve the following in any mode, including `bypassPermissions`“ — among them explicit `ask` rules and „Tools that require user interaction: the built-in `AskUserQuestion` tool and MCP tools marked `requiresUserInteraction`“"/>. Un permiso no puede obtenerse de una persona a posteriori: sin persona, no hay respuesta.</b-why>
  <b-subhead>Hooks: decidir si se pregunta</b-subhead>
  <b-why align="left">El hook PreToolUse responde antes de una llamada a una función con una de cuatro decisiones: allow, deny, ask o defer<b-proof href="https://code.claude.com/docs/en/hooks" quote="Claude Code docs: „PreToolUse hooks can control whether a tool call proceeds. [...] four outcomes (allow, deny, ask, or defer)“"/>. Con varios hooks el orden es: deny gana a defer, defer gana a ask, ask gana a allow. La decisión «defer» es para ejecuciones sin interfaz: el programa que llama pausa a Claude, recoge la respuesta por su propia interfaz y reanuda desde el mismo punto. El hook Elicitation lo enlaza con MCP: responde a una petición del servidor con accept, decline o cancel, y sin interfaz una petición no tratada se cancela.</b-why>
  <b-why align="left">Un límite para los subagentes: AskUserQuestion siempre se les retira. En una ejecución sin interfaz, una llamada que requeriría una pregunta se rechaza salvo que haya una regla allow, un hook o un host para las peticiones. Así, una ejecución autónoma sin reglas configuradas recibe una denegación, y la respuesta de una persona no llegará.</b-why>
  <b-art names="agent-escalation-to-human/night-run" wide/>
  <b-cap>Sin persona, una pregunta se convierte en un informe ante una puerta cerrada.</b-cap>
  <b-why align="left">Así es el escalado sin persona: una parada y un motivo registrado en lugar de una conjetura.</b-why>
  <b-finding>
    <ex>Una ejecución nocturna en un servidor de compilación. El agente quiere publicar una compilación y no hay a quién preguntar. En el modo dontAsk la llamada se rechaza, el agente escribe un informe de bloqueo y por la mañana una persona lo ve en lugar de un rodeo silencioso.</ex>
    <gen>En una ejecución autónoma el escalado pasa de ser una pregunta a ser un informe de bloqueo: el agente se detiene, registra el motivo y espera.</gen>
    <do>Para las ejecuciones nocturnas, fije reglas «deny» explícitas para las acciones peligrosas y exija al agente un archivo de bloqueos en lugar de una conjetura silenciosa.</do>
  </b-finding>
</b-chapter>

<b-chapter id="narrow" icon="workflow" title="Lo que salió: por qué una puerta y el escalado no caben enteros en MCP">
  <b-why align="left">El host guarda toda la conversación, y un servidor recibe solo lo que necesita. En la especificación este es el tercer principio de arquitectura<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28" quote="MCP specification: „Servers should not be able to read the whole conversation, nor 'see into' other servers.“ / „Full conversation history stays with the host“"/>. Un servidor local se ejecuta con los privilegios del cliente<b-proof href="https://modelcontextprotocol.io/specification/2026-07-28/basic/security_best_practices#local-mcp-server-compromise" quote="MCP specification: „MCP servers run with the same privileges as the client“"/>. De ahí se sigue una conclusión que extraigo yo mismo: por MCP pasan una petición y una respuesta, y todo lo demás queda del lado del host.</b-why>
  <b-art names="agent-escalation-to-human/barrier-intercom" wide/>
  <b-cap>El host pone la barrera, MCP da el interfono; un atajo es responder por la persona.</b-cap>
  <b-why align="left">A continuación se enumera qué pasa exactamente por MCP y qué queda del lado del host.</b-why>
  <b-rules cols="2">
    <rule icon="package" t="Por MCP">una llamada a una función, un resultado según un esquema, una petición de datos a una persona, los permisos del servidor</rule>
    <rule icon="shield-check" t="Fuera de MCP">los hooks del cliente, los modos de permisos, el sandbox, el historial de la conversación, el propio diálogo de la persona con el agente</rule>
  </b-rules>
  <b-why align="left">Así, una parte de una puerta vive en MCP: la petición a una persona, los permisos, el esquema del resultado. La otra parte está en el host: hooks y modos. La decisión única «preguntar» se compone de ambas partes, y si solo queda MCP, la regla por defecto choca con que un cliente puede responder por una persona. Esta es la ventana estrecha: una pregunta cabe en ella, mientras que la decisión de «si preguntar o no» se toma fuera.</b-why>
  <b-finding>
    <ex>Un servidor MCP puede preguntar a una persona por una transferencia de dinero. Si el cliente mostrará la pregunta o responderá por sí mismo lo determinan el cliente y sus hooks.</ex>
    <gen>Una puerta y el escalado se componen de dos lugares: la ventana en MCP y las reglas en el host. Cada una por separado deja un hueco.</gen>
    <do>Para cada operación peligrosa, compruebe ambos lados: el servidor puede preguntar, y el cliente no puede responder en lugar de una persona.</do>
  </b-finding>
</b-chapter>

<b-chapter id="claims" icon="target" title="Lo esperado y lo encontrado">
  <b-why align="left">Las cuatro suposiciones del principio, contrastadas con el texto de los propios documentos y artículos. Lo que no pudo abrirse o comprobarse por completo está marcado.</b-why>
  <b-art names="agent-escalation-to-human/thesis-check" wide/>
  <b-cap>El veredicto sobre cada una de las cuatro suposiciones.</b-cap>
  <b-why align="left">Los detalles están en la tabla: qué se esperaba, el resultado y qué se encontró.</b-why>
  <b-table>

| Cómo se veía | Resultado | Qué se encontró |
|---|---|---|
| **Una puerta está fuera del contexto del agente** | <b-status-dot color="accent">sí</b-status-dot> | un juez dentro del bucle puntuó 86,7 frente a 113,0 de una comprobación desde fuera (arXiv 2607.25152, piloto). En Claude Code la propia documentación separa el texto de las instrucciones de las reglas que impone el programa |
| **A los agentes se les entrena y se les mide por el tiempo de ejecución autónoma** | <b-status-dot color="accent">en parte</b-status-dot> | METR mide un horizonte de tareas: 16–20 horas con un 50 % de éxito para el mejor modelo compartido. No se encontró en documentos públicos cómo entrenan exactamente Anthropic y Google DeepMind para un horizonte largo |
| **Para las métricas una pregunta a una persona es una pérdida, así que preguntar no compensa** (la penalización: 0 por una tarea no resuelta y un turno cortado) | <b-status-dot color="warn">no</b-status-dot> | los benchmarks clásicos no tienen canal hacia una persona, y una parada sin solución cuenta como fallo. En tau-bench un traspaso innecesario a una persona puntúa 0. Las métricas que cuentan una pregunta la recompensan (HiL-Bench) o la tratan como neutral (HAS-Bench). No se encontró ninguna redacción del tipo «una pregunta es una pérdida». No hay una medición «antes y después de entrenar para terminar» |
| **MCP es un cuello de botella** | <b-status-dot color="warn">en el sentido</b-status-dot> | No hay una cita directa: la especificación no tiene palabras como «bottleneck». Sí dice que el protocolo no puede imponer por sí mismo los principios de seguridad, y que el host aporta el aislamiento |

  </b-table>
  <b-why align="left">La tabla da un resultado: la suposición sobre castigar una pregunta es la única que las fuentes no respaldaron, y mantenía unida toda la cadena.</b-why>
  <b-finding>
    <ex>La suposición sobre castigar una pregunta parecía convincente, pero el único caso real encontrado son benchmarks sin canal hacia una persona. Es otra cosa: allí una pregunta es imposible, y no hay nada que castigar.</ex>
    <gen>Si una métrica no contempla una pregunta, entrenar con ella no enseña a preguntar. Eso se sigue de cómo está construida la métrica, y no hay prueba directa de un efecto sobre el comportamiento.</gen>
    <do>Antes de concluir por qué un agente se comporta de cierta manera, busque una medición: el mismo agente comparado antes y después del entrenamiento. Sin ella solo queda una hipótesis.</do>
  </b-finding>
</b-chapter>

<b-chapter id="start" icon="flag" title="Cómo empezar: cuatro pasos y prompts listos para el agente">
  <b-why align="left">Los pasos van de lo barato a lo exhaustivo. Los dos primeros bastan para que el escalado deje de depender del humor del agente.</b-why>
  <b-rules cols="2">
    <rule icon="checklist" t="1. Lista de paradas">Anote en un archivo qué acciones exigen que el agente se detenga y pregunte.</rule>
    <rule icon="shield-check" t="2. Reglas y un hook">Ponga las acciones peligrosas en «deny» o «ask» mediante permisos y un hook PreToolUse.</rule>
    <rule icon="package" t="3. Permisos en el servidor MCP">Conceda las funciones peligrosas solo con el alcance (scope) necesario.</rule>
    <rule icon="clock" t="4. Registro de preguntas">Cuente cuántas veces preguntó el agente, cuántas sin necesidad y cuántas calló cuando debía haber preguntado.</rule>
  </b-rules>
  <b-why align="left">El primer prompt recoge la lista de paradas: es el paso 1.</b-why>
  <b-prompt>
    Crea un archivo escalation.md con los casos en que el agente debe detenerse y preguntarme: acciones irreversibles,
    publicación, cambios de permisos, dos lecturas igual de válidas de la tarea. Para cada caso escribe qué pregunta hacer y qué respuesta cuenta como consentimiento.
    Todo lo demás lo decide el agente por sí mismo.
  </b-prompt>
  <b-why align="left">El segundo prompt convierte la lista en reglas de hook: es el paso 2.</b-why>
  <b-prompt>
    Configura un hook PreToolUse en .claude/settings.json: para los comandos de escalation.md responde «ask», para los claramente peligrosos responde «deny»
    con un motivo que vea el agente. Muestra el archivo final y un ejemplo de llamada en la que se activó el hook.
  </b-prompt>
  <b-why align="left">El tercer prompt comprueba si el cliente puede responder por una persona: es el paso 3.</b-why>
  <b-prompt>
    Comprueba mi cliente MCP: ¿puede un agente o un script responder a una petición de datos a una persona en mi lugar? Si puede, sugiere un ajuste
    que lo impida para los servidores con funciones peligrosas.
  </b-prompt>
  <b-why align="left">Así se ve tras los dos primeros pasos.</b-why>
  <b-finding>
    <ex>Una semana después el registro mostró: de diez preguntas, ocho eran sobre renombrar archivos. La lista de paradas se recortó a las acciones irreversibles, y las preguntas bajaron a dos al día.</ex>
    <gen>El escalado se ajusta con el registro: demasiadas preguntas consumen la atención de una persona, demasiado pocas dejan las conjeturas del agente.</gen>
    <do>Haga hoy los pasos 1 y 2 para una tarea, y empiece el registro dentro de una semana a partir de preguntas reales.</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Preguntas frecuentes">
  <b-faq-cards>
    <q t="¿Qué es el escalado a una persona en agentes de IA?">Una parada en la que el agente o el programa que lo rodea traspasa una decisión a una persona: mediante una pregunta, una solicitud de permiso o una confirmación. Las reglas y los hooks toman la decisión «preguntar», y la persona da la respuesta.</q>
    <q t="¿Qué es elicitation en MCP?">La manera en que un servidor MCP pide a una persona que aporte datos a través del cliente. Hay tres respuestas: accept, decline y cancel. Pedir contraseñas y claves en un formulario está prohibido, y para ellas existe un modo de dirección externa.</q>
    <q t="¿Penalizan las métricas de autonomía a un agente por preguntar a una persona?">La penalización llega por un resultado sin terminar: 0 en lugar de 1, y en Anthropic una pregunta corta el turno. No se encontró una resta por la pregunta en sí. Los benchmarks clásicos simplemente no tienen canal hacia una persona. El reciente HiL-Bench y el trabajo de Anthropic recompensan una pregunta o la tratan como supervisión, y HAS-Bench la trata de forma neutral.</q>
    <q t="¿Pueden una puerta y el escalado construirse enteros dentro de MCP?">No. MCP transporta una pregunta y una respuesta, mientras que la decisión de mostrar la pregunta a una persona o de responder automáticamente la toma el host: sus hooks, sus modos de permisos y el cliente. El propio protocolo no puede imponer esa decisión.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Seguir leyendo">
  <b-links>
    <item href="/blog/quality-gates-ai-agents/" k="Puertas" t="Qué son las puertas de calidad para agentes de IA">una publicación de recepción que dice «hecho»</item>
    <item href="/blog/agent-checkpoint/" k="Comprobación" t="Dónde poner una comprobación del trabajo de un agente">el límite del agregado y el teorema de Rice</item>
    <item href="/blog/mcp-agent-access/" k="MCP" t="MCP para un agente de IA">qué problema resuelve y cómo conectarlo</item>
    <item href="/blog/mcp-scopes/" k="MCP" t="Ámbitos de MCP en Claude Code">local, de proyecto y de usuario</item>
    <item href="/blog/harness-driven-development/" k="Harness" t="Harness engineering en la práctica">guías, sensores y el ciclo «error — regla»</item>
    <item href="/blog/ai-agent-maturity-levels/" k="Madurez" t="Niveles de madurez de un agente de IA">del chat a las especificaciones, los skills, el código y un sistema</item>
  </b-links>
</b-chapter>
<b-footer>Datos: a 14 de noviembre de 2026, de los documentos y artículos enlazados con las marcas ↗. Las páginas de openai.com y la publicación en redes de METR no se abrieron, así que aquí no se usa la cifra de OpenAI sobre la proporción de tareas sin intervención. Algunas citas sobre las preguntas de los agentes y sobre METR se comprobaron mediante un resumen de la página; verifíquelas con el original antes de citarlas. Los ejemplos con una configuración, un servidor de pagos y una ejecución nocturna son hipotéticos.</b-footer>
</b-post>
