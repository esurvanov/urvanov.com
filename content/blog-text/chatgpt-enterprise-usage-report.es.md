Panorama general

21%Lo usan cada semana

Dónde invertir en formación

82%

47%

21%

Naturaleza del trabajo

70%De las conexiones son Slack y Notion

Qué herramienta comprar

Verificación

±2%Tolerancia al conciliar exportaciones

Si se puede confiar en los números

CHAT

WORK

CODEX

Selección de personas

16De 340 en el ejemplo, para entrevistas

Con quién hablar antes de comprar

## Qué decisiones ayuda a tomar el informe

**Tarea de negocio:** averiguar en qué tareas de trabajo se queda corto el conjunto actual de herramientas de IA y qué soluciones merece la pena probar antes de comprar. La decisión la toma el responsable del presupuesto de herramientas de IA junto con los líderes de los equipos donde se hace el piloto. El acceso a los datos y la seguridad los aprueba el equipo de seguridad de la información. Los criterios de decisión son los signos de la tabla siguiente.

Que el conjunto actual no es óptimo en algún punto es una suposición: el informe y las entrevistas la comprueban. «No óptimo» se descompone en signos comprobables. La conclusión «no hace falta ninguna herramienta nueva» también es un resultado.

| Signo | Cómo se manifiesta | Categoría en la entrevista | Dónde lo muestra el informe |
|---|---|---|---|
| Calidad del resultado | las respuestas son imprecisas o inventadas | alucinaciones | Conectores |
| Tiempo y retrabajo manual | muchas idas y vueltas, el resultado se termina a mano | prompt | Profundidad, Herramienta principal |
| Reproducibilidad | cada vez sale un resultado distinto para la misma tarea | reproducibilidad | Skills, Temas de proyectos |
| Escala | un escenario que funciona no se traslada a otro equipo | escala | Uniformidad |
| Acceso a datos | el sistema necesario no está conectado | acceso a datos | Conectores |
| Coste | caro por unidad de resultado | coste | Ranking por gasto |

Límites de los datos: el informe solo ve la herramienta corporativa y solo durante el periodo de exportación, 3 meses. Las cuentas personales y otras herramientas no aparecen.

### Cómo las respuestas se convierten en una decisión de compra

El informe muestra dónde mirar, y la decisión de compra se toma solo tras estos cinco pasos, para que el dinero vaya a una tarea que tiene mucha gente y que hoy nada cubre.

Entrevistas

Qué tareas y dificultades existen y cómo las resuelve la gente hoy

Cuestionario a toda la empresa

Cuántas personas se enfrentan a una dificultad, con qué frecuencia y cuánto les estorba

Comparar

Escala de la tarea, gravedad de las consecuencias, soluciones alternativas, coste de la solución

Probar herramientas

Opciones prometedoras en tareas reales, junto con los empleados

Decisión

El responsable del presupuesto decide según los seis signos de arriba: calidad, tiempo y retrabajo, reproducibilidad, escala, acceso a datos, coste; «no hace falta ninguna herramienta nueva» es un resultado válido

Entrada

Exportaciones de la consola: mensajes, gasto, proyectos y conectores de cada persona

Qué hace el informe

Convierte las exportaciones en segmentos, madurez de los equipos y personas concretas como material para decidir

Decisiones a la salida

Qué herramienta pilotar, para qué equipo, con quién hablar antes de comprar y dónde no hace falta presupuesto

## Flujo de trabajo

Cinco pasos, de la exportación a la lista final de personas.

Exportar los datos

Cinco secciones de la consola, detalles en «Dónde obtener los datos»

Construir el panorama general

Profundidad de adopción, uniformidad entre equipos, herramienta principal, segmentos

Mapear la naturaleza del trabajo

Qué tareas resuelve la gente, con qué herramientas integradas y con qué integraciones

Comprobar con los datos en bruto

Verificar cada resumen con la exportación original

Seleccionar personas y sacar conclusiones

Una lista de entrevistas y las preguntas que hay que comprobar en ellas

A quién entrevistar

Cómo hacer las entrevistas

## Qué ve el administrador de ChatGPT Enterprise: dónde obtener los datos

Todo se construye con cinco secciones de una misma consola de administración de ChatGPT Enterprise. Pasa el cursor sobre **i** para ver qué contiene exactamente cada sección.

Cómo exportar datos de la consola de ChatGPT Enterprise: a mano y con el agente de navegador Claude in Chrome

**Cómo exportar.** La consola sí tiene API, pero cubren solo una parte de los datos: analítica de Codex, costes en créditos y registros de conversaciones para cumplimiento normativo. Las exportaciones de usuarios, proyectos y skills y el ranking por producto son más fáciles de recoger en la interfaz. Exportar es un buen trabajo para Claude in Chrome: abre la sección correcta, pone el filtro, pulsa exportar y guarda el CSV. Cada paso se ve en pantalla, así que un filtro o una sección equivocados se detectan al instante, antes de que los números lleguen al informe.

**Acceso.** La API de la consola no siempre está disponible: las políticas de seguridad de la empresa suelen restringir las claves de API de administrador. En ese caso, exporta cada sección desde la interfaz.

Usuarios chatgpt.com/admin/usage/users Mensajes, fechas de actividad y herramientas integradas de cada persona Exportación CSV de un periodo de hasta 12 meses. Campos: messages, tool_messages, gpt_messages, project_messages, department, groups, seat_type, last_day_active. La propia consola marca a los «power users» con una insignia.

Ranking admin.openai.com → Analytics → Leaderboard Gasto, tokens y líneas de código de cada persona, por separado para los productos Chat, Work y Codex Botón de exportar junto al encabezado → «User ranking», CSV o JSON. Campos: Name, Email, Credits, Estimated costs, Tokens, Lines of code. El filtro «Product» cambia el contenido de la exportación. El historial abarca unos 120 días.

Proyectos chatgpt.com/admin/usage/projects Quién creó un proyecto, cuántos mensajes tiene y si está activo Campos: project_name, project_creator_email, messages_workspace, unique_messagers_workspace, is_active. Algunos nombres llegan como [content redacted]: la consola los oculta por sí sola.

Resumen: conectores y skills chatgpt.com/admin/usage A qué aplicaciones conecta la gente el asistente y qué skills usa Los bloques «App interactions» y «Skills»: número de llamadas a cada conector y skill durante el periodo elegido.

Analítica: tareas admin.openai.com → Analytics → Tasks La clasificación de tareas de la propia consola: código o trabajo de conocimiento (todo lo que no es código) Proporción de código y de trabajo de conocimiento, tareas principales por créditos. Un modelo de OpenAI etiqueta las tareas sobre una muestra de aproximadamente el 10% de las solicitudes de 30 días.

## Panorama general

Las cuatro secciones siguientes son el informe en sí, cada una con su objetivo. **Objetivo:** mostrar qué grupos de personas hay en la empresa y de qué tamaño.

### Profundidad de adopción

La profundidad de adopción muestra hasta qué punto la herramienta ha entrado en el trabajo de la empresa: cuántas personas la han usado al menos una vez, con regularidad y cada semana. Quienes nunca escriben en el chat y trabajan solo con Codex se muestran aparte. **Decisión:** en qué grupo invertir la formación y si conviene comprar más licencias ahora.

71

88

97

23

61

cada semana

con regularidad

de vez en cuando

solo Codex

totalmente inactivos

340 personas

Fuente: Usuarios · Ranking para quienes trabajan solo con Codex

El 82% de las personas ha probado la herramienta, el 47% la usa en su trabajo y para el 21% se ha vuelto un hábito semanal. El margen para ganar profundidad está en las 97 personas del grupo «de vez en cuando».

La diferencia entre «la probó» y «la usa cada semana» muestra cuántas personas lo dejaron tras los primeros intentos. La referencia para una adopción masiva es que entre el 50% y el 70% de los empleados la use en su trabajo diario. Mientras la adopción no llegue a esa referencia, más licencias no traerán crecimiento: algo distinto del acceso frena a la gente.

Dedica la formación al grupo más grande entre «la probó» y «cada semana»: da el crecimiento más rápido en uso regular. Vuelve a contar el desglose tras la formación para ver adónde se movió la gente.

**Importante.** Elige de 5 a 10 personas del grupo «de vez en cuando», averigua en entrevistas cómo resuelven hoy sus tareas y haz con ellas una revisión de casos reales de trabajo. Vuelve a contar la proporción semanal después de la revisión. Cómo preguntar sin sugerir la respuesta se explica en «Cómo entrevistar a las personas sobre su uso de IA».

### Uniformidad

La uniformidad muestra con qué igualdad ha entrado la herramienta en distintos equipos: qué proporción de cada equipo la usa con regularidad y cuántos mensajes escribe de media una persona. **Decisión:** de qué equipo tomar escenarios de trabajo y a cuál llevarlos primero.

| Equipo | Usuarios regulares | % | Msgs por persona |
|---|---|---|---|
| Equipo A |  | 74% | 1,120 |
| Equipo B |  | 66% | 870 |
| Equipo C |  | 51% | 720 |
| Equipo D |  | 34% | 530 |
| Equipo E |  | 18% | 290 |

Fuente: Usuarios · campos department y groups

En el Equipo A, el 74% de las personas usa la herramienta con regularidad; en el Equipo E, el 18%: una dispersión de 56 puntos porcentuales.

Una gran dispersión entre equipos significa que ya hay escenarios de trabajo, pero viven en uno o dos equipos: trasladarlos sale más barato que comprar algo nuevo. Una proporción uniformemente baja en todos los equipos apunta a una barrera común: acceso, formación o tareas poco adecuadas. Una proporción uniformemente alta significa que la herramienta ha echado raíces y se puede pasar al siguiente paso. Un equipo con barreras todavía no está listo para una herramienta nueva.

Con una dispersión grande, organiza un encuentro: el equipo más fuerte enseña tres de sus escenarios a los dos más débiles. Antes del encuentro, haz 2–3 entrevistas sobre barreras en el equipo más débil. Vuelve a contar la dispersión después: debería reducirse.

### Herramienta principal

Cuál de las tres herramientas se lleva más de la mitad del gasto de una persona en tres meses. El tipo de herramienta muestra cómo trabaja la persona con IA.

Prompt

Alucinaciones

Reproducibilidad

Escala

164 · Chat

47 · Work

38 · Codex

91 · sin gasto

340 personas, ventana de 3 meses

Fuente: Ranking · tres exportaciones: filtro «Product» = Chat, Work, Codex

Chat es el producto principal para 164 de 340 personas, Codex para 38, Work para 47.

La herramienta principal muestra el tipo de trabajo: una conversación, una tarea encargada a un agente o código. Determina qué necesita la persona a continuación y en qué piloto incluirla. El tamaño del grupo fija el tamaño del piloto: uno amplio para un escenario común, uno reducido para un escenario poco frecuente.

La decisión es llevar cada grupo al siguiente paso. Para el grupo de Chat: Work con conectores y MCP a los datos de trabajo, lo que elimina los problemas de prompts y las alucinaciones. Para el grupo de Work: specs, configuración del harness (arnés del agente) y skills compartidas, que hacen el resultado reproducible y transferible a otros equipos.

### Ranking por gasto

El ranking ordena a las personas por la cantidad gastada en un producto concreto, por ejemplo Codex. Así, la lista incluye a quien gasta mucho en Codex aunque la mayor parte de su gasto vaya a Chat.

| Persona | Equipo | $ en código / 3 meses | Tokens / 3 meses | Tokens por $ |
|---|---|---|---|---|
| Hana Sato | Equipo C | 438.20 | 21.9M | 50K |
| Luis Moreno | Equipo A | 395.60 | 12.7M | 32K |
| Ada Kowalski | Equipo D | 84.30 | 4.3M | 51K |

Fuente: Ranking · una exportación por producto

Hana Sato y Luis Moreno gastan en código unas cinco veces más que la tercera persona de la lista. Con un gasto parecido, Hana obtiene una vez y media más tokens por dólar que Luis.

Los usuarios del top son agentes de cambio: encuentran antes los escenarios que funcionan, y su experiencia influye en si una herramienta especializada se amortiza. A su lado hay colegas más cautelosos que necesitan más tiempo y un ejemplo en vivo con sus propias tareas. Ordenar por proporción del gasto oculta a los agentes de cambio, así que conviene mirar el gasto absoluto.

Implica a los usuarios del top como mentores: que muestren sus escenarios a colegas que están empezando, con las tareas de esos colegas. Invita a los más cautelosos mediante ejemplos y resultados, sin imposiciones. Ofrece a los dos o tres primeros un experimento con una herramienta especializada, con un informe de antes y después.

El ranking tiene tanto el gasto como los tokens. Compara la relación entre tokens y gasto dentro de un mismo grupo: un producto y tareas parecidas. Quien obtiene claramente más tokens por dólar suele elegir mejor los modelos y los modos. Son los usuarios más avanzados y eficientes, y los primeros a quienes invitar como mentores. Preséntalos a colegas del mismo grupo cuya relación sea menor: resolver una tarea juntos suele dar más que una formación general. Las parejas de equipos distintos aportan polinización cruzada: las buenas técnicas pasan de un equipo a otro.

Durante el despliegue, los usuarios del top pueden gastar un orden de magnitud más que el resto. Es mejor no introducir límites en esta etapa: desmotivan con facilidad a quienes adoptan la herramienta primero. En lugar de límites, acuerda experimentos y un informe de resultados. Los límites tienen sentido más adelante, cuando las prácticas estén probadas y se conozca el coste normal de un escenario.

### Segmentos de comportamiento

segmento

entrevista

problema

herramienta

Grupos por intensidad de comportamiento, construidos a partir de varias exportaciones: cuánto escribe una persona, cuánto gasta y qué hace.

| Segmento | Personas | Detalles |
|---|---|---|
| Escriben código en cualquier producto | 44 | 19 de ellas fuera de los equipos técnicos |
| Investigación intensiva en el chat | 58 | más de 1,900 mensajes de media |
| Tareas con agentes | 33 | escenarios de varios pasos, conectores |
| Generación de imágenes | 21 | dos tercios de un solo equipo |
| Totalmente inactivos | 61 | 0 mensajes, $0 en todo el periodo |

Fuente: Usuarios · Ranking

Los segmentos más grandes para entrevistas con clientes son la investigación intensiva (58) y el código (44, de ellos 19 fuera de los equipos técnicos). Para las 61 personas inactivas la pregunta es otra: qué les impide empezar.

Los datos muestran qué hace la gente, pero no si la herramienta actual les basta. Por eso un segmento es una hipótesis: sugiere a quién invitar a las entrevistas con clientes, qué preguntas hacer y con qué problemas puede toparse la gente. Los candidatos a herramienta aparecen ya aquí, y la elección entre ellos se hace después de las entrevistas, para un problema confirmado.

Para cada segmento, habla con 2–3 personas: dónde se queda corta la herramienta actual y qué siguen haciendo a mano. Reúne candidatos para un problema confirmado de tres fuentes: consultas con innovadores dentro de la empresa, expertos externos y referencias del mercado, es decir, qué usan empresas similares. Después, sigue el procedimiento de decisión: cuestionario, comparación y prueba de candidatos en tareas reales. Si el problema no se confirma, aplaza el segmento hasta el siguiente recuento.

## Naturaleza del trabajo

**Objetivo:** mostrar qué tareas resuelve la gente con la herramienta, con qué funciones integradas y a través de qué integraciones.

### Conectores

Los conectores unen el asistente con los datos de trabajo: chats, documentos, código, calendarios. Determinan el volumen de alucinaciones: sin acceso a datos, el modelo rellena la respuesta por su cuenta. **Decisión:** qué equipos y qué sistemas conectar primero.

520

340

210

150

Fuente: Resumen · bloque «App interactions»

Slack y Notion suman el 70% de todas las conexiones. El modelo no ve los sistemas fuera de esta lista: responde sobre ellos adivinando.

El volumen de alucinaciones baja donde el modelo tiene el contexto que necesita. Sin él, el agente intenta rellenar el hueco por sí mismo. Los equipos con cero conexiones trabajan con el modelo a ciegas, y casi cualquier respuesta sobre sus procesos es una conjetura. La señal en una entrevista con clientes: «tengo que comprobarlo todo».

Encuentra los equipos con cero conexiones y pregunta en las entrevistas dónde viven sus datos de trabajo. Conecta una de esas fuentes y compara antes y después con 10 preguntas idénticas: cuántas respuestas son erróneas y cuántas se apoyan en datos de trabajo.

### Skills

Las skills muestran la madurez de los procesos: un escenario descrito una vez como skill se repite igual para cualquiera que lo ejecute. Las estadísticas muestran qué skills se usan y quién crea las suyas. **Decisión:** qué procesos se pueden extender ya a otros equipos y cuáles siguen dependiendo de personas concretas.

88

57

29

Fuente: Resumen · bloque «Skills»

Las skills de hojas de cálculo y de PDF tienen 88 y 57 llamadas: esos procesos ya son reproducibles. 29 llamadas a skill-creator: algunas personas están convirtiendo sus escenarios en skills.

La madurez del proceso crece por pasos: peticiones puntuales → una skill personal → una skill compartida del equipo. En el primer paso, el resultado depende de quién pidió y cómo. Con una skill es reproducible: la misma entrada da el mismo resultado. Una skill compartida hace el proceso transferible a otros equipos.

Reúne las skills en una sola lista con sus autores y marca el paso de cada proceso. Convierte en compartidas las dos skills personales más usadas: el autor se las enseña a un equipo vecino, y el equipo comprueba que las mismas entradas dan el mismo resultado. Los escenarios sin skill que se repiten cada semana son los primeros candidatos a nuevas skills.

### Temas de proyectos

El resumen agrupa los proyectos por significado y muestra las tareas concretas que la gente ejecuta en proyectos permanentes. Para las entrevistas con clientes es una lista lista para usar: qué tareas tratar y con quién. **Decisión:** qué tareas y los proyectos de quién cubrir primero en las entrevistas.

| Tema | Proyectos | Tareas | Pregunta para el autor |
|---|---|---|---|
| VentasBiblioteca de pitches · Elif Demir | 11 | pitches, manejo de objeciones, propuestas comerciales | «¿Qué parte de un pitch hace bien el modelo y qué reescribes?» |
| IncorporaciónGuía para nuevos empleados · Rafael Costa | 8 | guías para recién llegados, respuestas a preguntas típicas | «¿Qué preguntas de los recién llegados resuelve ya el modelo sin ti?» |
| Estudio de mercadoNotas sobre competidores · Jonas Keller | 5 | resúmenes de competidores, comparaciones de precios | «¿De dónde sacas los datos y con qué rapidez caducan?» |

Fuente: Proyectos · nombres agrupados por significado

Ventas (11) e incorporación (8) tienen más proyectos permanentes. Los autores de los proyectos más grandes son las primeras personas a entrevistar.

Un proyecto es una base de conocimiento: archivos e instrucciones en los que el modelo se apoya en cada respuesta. Cuanto más completa la base, más precisos y estables los resultados. Lo que contiene un proyecto sugiere qué preguntar en una entrevista: qué archivos se añadieron, qué falta y dónde las respuestas aún necesitan corrección.

Abre los tres proyectos más activos de cada tema y haz una lista de las tareas concretas. En la entrevista, hazle al autor la pregunta de la tabla y pregunta qué archivos e instrucciones cambiaron más la calidad de las respuestas. Convierte una configuración de proyecto exitosa en una plantilla para ese tema.

## Verificación

**Objetivo:** comprobar los resúmenes con las exportaciones en bruto, la lista de proyectos y el ranking. Cualquier número del informe se puede rastrear hasta su fila de origen en una exportación.

### Lista completa de proyectos

Todos los proyectos con autor y estado. Esta lista sirve para verificar el resumen por temas y para encontrar al autor de un proyecto concreto.

| Proyecto | Autor | Estado | Msgs |
|---|---|---|---|
| Pitch library | Elif Demir | activo | 268 |
| Price list 2026 | Oskar Berg | activo | 64 |
| Personal draft | Pavel Novak | abandonado | 0 |

Fuente: Proyectos

El proyecto «Personal draft» tiene cero mensajes.

Un proyecto vacío es un intento abandonado: la persona empezó, pero la herramienta nunca pasó a formar parte de su trabajo. Si esos proyectos se quedan en el recuento, el resumen por temas exagera el uso.

Filtra los proyectos con cero mensajes antes de contar e invita a 2–3 de sus autores: el motivo por el que lo dejaron es una respuesta valiosa.

### Ranking

La exportación de facturación por persona y producto. De ella se calculan las herramientas principales y los tops.

| Nombre | Email | Créditos | $ |
|---|---|---|---|
| Hana Sato | hana@example.com | 10,955 | 438.20 |
| Mira Castellano | mira@example.com | 2,425 | 97.00 |
| Jonas Keller | jonas@example.com | 470 | 18.80 |

Fuente: Ranking · tres exportaciones con distintos filtros «Product»

Las tres exportaciones por producto suman el gasto total de cada persona de la lista.

Las tres exportaciones con distintos filtros Product suman el gasto total de cada persona. Una diferencia superior al 2% significa que una exportación está incompleta o que los periodos no coinciden.

Antes de compartir el informe, suma las tres exportaciones por persona y compáralas con el gasto total. Si difieren, vuelve a exportar los datos del mismo periodo.

## Selección de personas

**Objetivo:** nombrar personas concretas para cada forma de resolver tareas.

### Candidatos a entrevista

Una lista corta de personas para cada dirección encontrada. En el ejemplo la lista final es de 16 personas de 340; la tabla muestra las tres primeras. Cada empresa tendrá su propio número. El informe de ChatGPT es una de las fuentes de la muestra: los usuarios de otras herramientas y quienes lo dejaron se añaden según las reglas de «A quién entrevistar», y la comprobación en todos los empleados se hace con un cuestionario.

| Persona | Dirección | Señal |
|---|---|---|
| Hana Sato | código | $438 / 3 meses |
| Mira Castellano | tareas con agentes | $97 / 3 meses |
| Jonas Keller | investigación | 3,200+ msgs |

Fuente: las exportaciones de usuarios, ranking y proyectos, unidas por email

Hana Sato, Mira Castellano y Jonas Keller representan tres formas distintas de trabajar: código, tareas con agentes e investigación.

La lista corta tiene una persona por dirección: código, tareas con agentes, investigación. Así cada conversación muestra su propia forma de trabajar y no repite otra.

Programa tres entrevistas, una por dirección. Después decide qué dirección necesita 2–3 personas más.

### Tabla de todas las personas

Todos, con filtros por equipo, actividad, dirección y herramienta principal.

Equipo B

Actividad: cada semana

Herramienta: Work

| Persona | Equipo | Chat / Work | $ / 3 meses |
|---|---|---|---|
| Tomás Reid | Equipo B |  | 112.00 |
| Mira Castellano | Equipo B |  | 97.00 |

Fuente: las exportaciones de usuarios, ranking y proyectos, unidas por email

Los filtros «Equipo B» y «Herramienta: Work» dejaron a dos personas: Mira Castellano y Tomás Reid.

Una tabla de todas las personas con filtros por equipo, actividad y herramienta principal es la base de cualquier muestra posterior: una lista para una pregunta nueva no necesita una nueva exportación.

Guarda cada conjunto de filtros como una vista de tabla distinta para que la siguiente lista cueste un clic.

## Por dónde empezar hoy

No necesitas todo el informe de golpe: el primer resultado útil, una lista de los usuarios más activos, aparece tras el segundo punto.

Exporta usuarios y ranking de tres meses

El ranking, tres veces, una por producto. Un agente de navegador puede hacer la exportación

Claude in Chrome

Gemini in Chrome

Perplexity Comet

Calcula las herramientas principales y el top por importe

Ya está la primera lista de los usuarios más activos

Calcula la profundidad de adopción

Al menos una vez / con regularidad / cada semana, contando aparte a quienes trabajan solo con Codex

Haz una lista de personas y programa las entrevistas

Cómo elegir a estas personas se explica en «A quién entrevistar»

Preguntas frecuentes

Qué muestra la consola de administración de ChatGPT Enterprise

Cinco secciones: usuarios, ranking, proyectos, resumen y tareas. Dan la profundidad de adopción, la uniformidad entre equipos, la herramienta principal, la naturaleza de las tareas y una comprobación con los datos en bruto.

Cómo exportar datos de la consola

La consola tiene API, pero cubren solo una parte de los datos: analítica de Codex, costes en créditos y registros de conversaciones para cumplimiento normativo. Las exportaciones de usuarios, proyectos y skills y el ranking por producto son más fáciles de recoger en la interfaz, y la exportación se puede encargar a Claude in Chrome.

Cómo saber si hacen falta licencias nuevas

La profundidad de adopción muestra cuántas personas usan la herramienta al menos una vez, con regularidad y cada semana. Decide a qué grupo formar y si conviene comprar licencias nuevas ahora.

Cómo elegir a las personas a entrevistar

Se eligen personas para cada dirección encontrada: en el ejemplo la lista final es de 16 personas de 340. Los usuarios de otras herramientas y quienes la dejaron se añaden según las reglas de «A quién entrevistar».

## Preguntas frecuentes

¿Qué muestra la consola de administración de ChatGPT Enterprise?

Usuarios, ranking, proyectos, un resumen y tareas. Con ellos se construyen la profundidad de adopción, la coherencia entre equipos y la naturaleza del trabajo.

¿Cómo saber si hacen falta más licencias?

Por la profundidad de adopción: cuántas personas la usan al menos una vez, con regularidad y cada semana. La referencia para una adopción amplia es entre el 50% y el 70% de los empleados.

¿Qué significa una gran diferencia entre equipos?

Ya existen escenarios de trabajo, pero viven en uno o dos equipos. Compensa más extenderlos a otros equipos que comprar algo nuevo.

¿A quién entrevistar después del informe?

A personas de cada dirección encontrada: 16 de 340 en el ejemplo, incluidas quienes usan otro software o lo dejaron.

## Para seguir leyendo

Entrevistas

Cómo construir una muestra de entrevistas a partir de la tabla de personas

Entrevistas

Una llamada, una encuesta y una tabla de Airtable

Todos los nombres, equipos, direcciones y números de los ejemplos son ficticios.
