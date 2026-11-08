1

**Prompt:** la redacción de la petición

2

**Contexto:** lo que sabe el modelo

3

**Harness:** el entorno del agente HDD

Etapas según las describen Faros y marmelab

## Tres etapas

Prompt

rol formato ejemplo

corrige una petición

Contexto

documentos memoria del proyecto

corrige lo que sabe el modelo

Harness

herramientas pruebas reglas permisos

corrige cada ejecución futura

**Conclusión:**

**En este ejemplo:** Un prompt corrige una respuesta, el contexto corrige lo que sabe el modelo, y el harness corrige cada ejecución futura del agente.

**En general:** Harness-Driven Development es trabajo en la tercera etapa: el desarrollador escribe menos código y dedica más tiempo a preparar el entorno donde el agente escribe, comprueba y corrige.

**Siguiente paso:** Anota los tres últimos errores del agente y marca en qué etapa se podría haber corregido cada uno para siempre.

## El ciclo HDD

El principio de Mitchell Hashimoto: cuando el agente comete un error, cambia el harness para que ese error no pueda volver a ocurrir Faros

**Conclusión:**

**En este ejemplo:** Un error detectado por los sensores pasa al harness como una regla nueva, y el agente recibe esa regla en cada ejecución siguiente.

**En general:** Un resultado corregido a mano ayuda una vez. Una regla en el harness (una instrucción, una prueba o un hook) se aplica a todas las tareas futuras, de modo que el harness se vuelve más preciso con el tiempo sin cambiar el modelo.

**Siguiente paso:** Adopta una norma: todo error del agente que hayas tenido que corregir a mano se convierte el mismo día en una línea de las instrucciones o en una prueba.

## Cómo se organiza un harness: 3 × 3

Tres dominios del ciclo y tres contextos en cada uno: nueve cánones. Cada canon tiene exactamente un dominio y un contexto.

**Spec:** qué debe ser cierto

**Skill:** cómo actuar

**Memoria:** en qué apoyarse

**Expectativa:** qué debería ser

Spec géneros, esquemas niveles de requisitos pasaporte de cifras

Skill predicción antes de actuar

Memoria roles de actuadores en vivo · MCP

**Observación:** qué se midió

Spec rango de evidencias formato de hallazgos escala

Skill el sensor registra el hecho

Memoria solo en vivo

**Ciclo:** comparar y decidir

Spec criterios de completitud de reglas registro de hallazgos

Skill comparar contar repeticiones parchear o revisar

Memoria vacío por ahora

Expectativa Observación

Ciclo ✕ sin vínculo inverso

parche revisar reglas

→ skill → spec de su dominio· un script en un hook de commit comprueba la dirección

**snapshot:** una tabla, actualizada tras cada medición nueva

**live:** un protocolo, fresco cada vez, no se guarda nada

**Conclusión:**

**En este ejemplo:** El ciclo se divide en Expectativa, Observación y Ciclo, cada uno con su spec, su skill y su memoria. El Ciclo lee los otros dos dominios; estos nunca leen el Ciclo.

**En general:** Es un ciclo de realimentación negativa: el valor objetivo se compara con el medido, y algo cambia solo si no coinciden. Una dirección estricta de referencias evita que los dominios se enreden, y que un mismo concepto se repita en dos dominios no es un defecto.

**Siguiente paso:** Reparte los archivos de tu harness en las nueve celdas y comprueba que ningún archivo de Expectativa u Observación hace referencia al Ciclo.

## El doble ciclo

**ciclo simple:** corregir la acción con las mismas reglas

**doble ciclo:** cambiar las propias reglas

**Parches sin una predicción nueva:** corregir con una regla

**Varias quejas:** primero comprobar si tienen una causa común

**Una regla nueva:** se acepta solo si los casos antiguos se derivan de ella

**Sin comprobación externa:** descartarla, dejando constancia

El ciclo se aplica a sí mismo: cada ejecución termina con el riesgo residual, nunca con un estado «hecho».

**Conclusión:**

**En este ejemplo:** Una serie de parches, quejas, una regla nueva y una comprobación externa son cuatro principios comprobables con los que el Ciclo decide si corregir la acción o cambiar las reglas.

**En general:** Un ciclo simple corrige el resultado dentro de las reglas antiguas. Un doble ciclo cambia las propias reglas, y lo hace con principios comprobables, de modo que el harness aprende sin desviarse por ediciones al azar.

**Siguiente paso:** Cuando la misma corrección aparezca por tercera vez, detente y pregunta qué regla la provoca. Cambia la regla solo si también explica los casos antiguos.

## Guías y sensores

**Guías:** antes de la acción

**Sensores:** después de la acción

**Computacional:** rápido · fiable

tipos plantillas de código generadores

pruebas linter comprobación de tipos

**Basado en IA:** flexible · más caro

AGENTS.md · CLAUDE.md skills specs

revisión con IA LLM juez

División según se describe en Martin Fowler: Harness engineering

**Conclusión:**

**En este ejemplo:** Cuatro celdas: las guías marcan el rumbo antes de que trabaje el agente, los sensores detectan desviaciones después, y cada una puede ser computacional o basada en IA.

**En general:** Las comprobaciones computacionales se ejecutan en segundos y no cometen errores, así que úsalas siempre que una regla se pueda escribir de forma formal. Reserva las comprobaciones basadas en IA para el sentido: estilo, claridad, ajuste con la intención.

**Siguiente paso:** Para cada regla de las instrucciones del agente, pregunta si una prueba o un linter podría comprobarla. Si es así, muévela allí.

## Tres capas de comprobación

**Calidad del código:**

madura

**Arquitectura:**

en crecimiento

**Comportamiento:**

la más difícil

Madurez de las capas según la evaluación de Martin Fowler

**Conclusión:**

**En este ejemplo:** La calidad del código es hoy lo más fácil de comprobar, y el comportamiento del producto lo más difícil.

**En general:** Los linters y los formateadores cubren la primera capa casi de inmediato. La arquitectura se comprueba con reglas de dependencias y requisitos de rendimiento. El comportamiento sigue necesitando buenas pruebas de escenarios y un ojo humano.

**Siguiente paso:** Empieza por la primera capa: ejecuta un linter y un formateador en cada ejecución del agente, y luego añade una regla para los límites de módulos.

## Antes es más barato

**Antes del trabajo:** instrucciones · specs $

**Al escribir:** hooks · linter $$

**En CI:** pruebas · compilación $$$

**En la revisión:** una persona $$$$

**Conclusión:**

**En este ejemplo:** El mismo error cuesta menos antes de que empiece el agente y más en la revisión humana.

**En general:** Pon las comprobaciones rápidas lo más pronto posible: el agente corrige el problema por sí mismo mientras aún tiene delante el contexto de la tarea, y a una persona solo llegan los puntos discutibles.

**Siguiente paso:** Conecta las pruebas y el linter a un hook que el agente ejecute tras cada edición, además de CI.

## Dónde importan las personas

Harness

estilo · tipos · pruebas · límites

Persona

arquitectura · producto · reglas nuevas

«Un buen harness mantiene a la persona en el ciclo y dirige su atención adonde más importa», parafraseando a Martin Fowler

**Conclusión:**

**En este ejemplo:** El harness asume la mayoría de las comprobaciones; la persona se queda con las decisiones y con el trabajo de mejorar el harness.

**En general:** Un desarrollador con experiencia lleva en la cabeza un harness implícito: conocimiento de la arquitectura, hábitos del equipo, olfato para el riesgo. HDD traslada ese conocimiento a reglas explícitas, de modo que cada ejecución del agente lo recibe.

**Siguiente paso:** Tras cada revisión del código del agente, anota un comentario que se repita y conviértelo en una regla.

## HDD y specs

**Spec:** el resultado que necesitas

**Harness:** cómo comprobar que lo conseguiste

**Código aceptado:** sin revisión manual línea a línea

«Las specs definen el estado objetivo, el harness es el sistema de control», según Loiane Groner. Más sobre specs en la charla Spec-Driven Development en la práctica

**Conclusión:**

**En este ejemplo:** La spec responde a «qué construimos», el harness responde a «cómo sabemos que lo construimos».

**En general:** Sin una spec el harness no tiene nada que comprobar, y sin un harness la spec se queda en documento. Juntos permiten aceptar el código del agente según comprobaciones en lugar de leer cada línea.

**Siguiente paso:** Para cada requisito de la spec, anota qué prueba o comprobación confirmará que se cumple.

## Por dónde empezar

1

Un archivo de instrucciones para el agente

AGENTS.md o CLAUDE.md en la raíz del proyecto: cómo compilar, cómo probar, qué no hacer

2

Linter y pruebas tras cada edición

un hook que el agente ejecuta él mismo antes de entregar el resultado

3

Un registro de errores del agente

cada error corregido a mano recibe una línea con su causa

4

Error → regla

una vez por semana, pasar las entradas del registro a instrucciones, pruebas o hooks

5

Un archivo de progreso para tareas largas

una lista de funciones con estados y el historial de commits, para que una sesión nueva retome donde acabó la anterior Anthropic

**Conclusión:**

**En este ejemplo:** Cinco pasos: dos preparan el harness enseguida, tres ponen en marcha el ciclo «error → regla».

**En general:** Nadie diseña un harness completo por adelantado. Crece a partir de los errores reales del agente en tu proyecto, y en pocas semanas el agente deja de repetir los más comunes.

**Siguiente paso:** Hoy, crea el archivo de instrucciones y el registro de errores. Dentro de una semana, pasa las primeras entradas del registro a reglas.

## Seguir leyendo

Etapa 1–2

Prompts para tareas de trabajo

cómo escribir una petición suelta y aportar datos

Etapa 3

Comparación de harnesses

Claude Code, Codex, Cursor, Hermes y chat

Para leer más: Martin Fowler · Anthropic: Harness design · Becoming a Harness-Driven Developer · awesome-harness-engineering

Los términos y la división en capas siguen las fuentes enlazadas en los pies de los diagramas.
