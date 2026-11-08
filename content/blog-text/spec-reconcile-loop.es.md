Deseado

spec

Actor

agente

Real

código

Medida

pruebas

## El mismo bucle que en Kubernetes

Kubernetes es un sistema que ejecuta servicios y los mantiene funcionando en muchos servidores. Su idea principal es simple: una persona describe cómo debe ser todo («mantén tres copias del servicio»), y un programa supervisor, el controlador, compara sin parar la descripción con lo que existe de verdad y corrige las diferencias. Eso es el bucle de reconciliación. Con las specs funciona el mismo esquema: una persona fija el estado deseado, y un agente puede acercar el código a él.

El estado deseado aquí es el diccionario de agregados: una entrada por concepto, con requisitos marcados MUST y SHOULD.

chart · manifiesto

controlador

nodos · pods

sondas · métricas

diccionario · MUST

agente

código

pruebas · calidad

cómo debería ser

quién lo lleva hasta ahí

cómo es ahora

qué los compara

Cómo leer la imagen. Las cuatro columnas son los cuatro papeles del bucle, las dos filas son dos sistemas, y la tercera fila pone los términos en palabras sencillas. El estado deseado (relleno) es lo que cambia una persona. En Kubernetes son el chart y el manifiesto: archivos que dicen qué partes de un servicio deben ejecutarse y cuántas. En las specs es el diccionario de agregados con las palabras MUST («obligatorio») y SHOULD («recomendado»). El actor lleva el estado real hasta el deseado: en Kubernetes el controlador, en las specs el agente. El estado real es lo que existe ahora: nodos (servidores) y pods (las partes de un servicio que se ejecutan en ellos), o el código. La medida muestra si coinciden: sondas (comprobaciones automáticas breves de «¿estás funcionando?») y métricas, o pruebas y comprobaciones de calidad. La flecha hacia abajo en la parte superior significa que una persona cambia solo el estado deseado. La flecha del bucle en la parte inferior significa que la medida vuelve al actor, y así hasta que coincidan. Ejemplo: una persona escribe en el diccionario «una reserva se cierra a los 15 minutos», el agente cambia el código, las pruebas lo comprueban, y una prueba en rojo devuelve al agente al código.

El bucle de reconciliación sigue la documentación de Kubernetes sobre controladores.

En Kubernetes una persona edita el chart y el controlador lleva los nodos hasta él. Aquí una persona edita el diccionario y el agente lleva el código hasta él y lo comprueba con pruebas.

Ambos sistemas mantienen el estado deseado separado del real y los reconcilian en un bucle. La persona en el bucle cambia solo el estado deseado, así que cada edición se convierte de inmediato en trabajo para el actor.

Edita el requisito en el diccionario en lugar de corregir el código a mano, y lanza al agente con la tarea de ajustar el código al diccionario.

## Una comprobación solo ve lo que se puso en ella

Una comprobación muestra solo lo que se puso en ella. En Kubernetes una sonda es una petición automática breve a un servicio: «¿respondes?». Si el servicio contesta «200» (el código de éxito), la sonda está en verde aunque el servicio pueda no estar haciendo lo principal: digamos, la cola de pedidos está atascada. En las specs pasa lo mismo con las pruebas. Si un requisito no tiene prueba, todas las pruebas siguen en verde y nadie nota que el requisito no se cumple.

El ejemplo es la reserva de salas de reuniones de Specs por agregado: tres requisitos MUST y uno SHOULD.

el servicio respondió «200: funcionando»

los pedidos no se están procesando

MUST · las reservas de una misma sala no se solapan

MUST · el estado de la reserva solo avanza

MUST · sin confirmación una reserva se cierra a los 15 minutos

SHOULD · la confirmación llega por el mismo canal

2 / 3

cada MUST necesita su propia comprobación

un MUST sin comprobación es un hueco

verde no significa correcto

Cómo leer la imagen. A la izquierda está Kubernetes: la sonda recibió la respuesta «200: funcionando» y está en verde, pero los pedidos no se procesan, así que la sonda no comprobó lo principal. A la derecha están las specs, con una reserva de sala de reuniones: tres requisitos MUST y uno SHOULD. Dos MUST están cubiertos por pruebas (las reservas no se solapan, el estado solo avanza). El tercero, «sin confirmación una reserva se cierra a los 15 minutos», no lo comprueba nadie. Una persona revisa el SHOULD sobre el canal. 2 de 3 MUST están cubiertos, es decir, el 67%. Las tres reglas bajo el diagrama: cada MUST tiene su propia comprobación; un MUST sin comprobación cuenta como un hueco que cerrar; un resultado en verde aún no significa que todo sea correcto.

Qué sondas existen y qué comprueban: Kubernetes: sondas.

La sonda responde «200» mientras los pedidos están atascados, y las pruebas de reservas están en verde mientras nadie comprueba la regla de los 15 minutos.

Una comprobación confirma solo lo que está escrito en ella y no dice nada del resto. Por eso la ficha del agregado se contrasta con las comprobaciones: un MUST sin comprobación es un hueco, no un requisito cumplido.

Repasa los MUST de tu diccionario y marca los que no tienen prueba. Convierte cada uno en una tarea, o rebájalo deliberadamente a SHOULD.

## El entorno decide si el bucle se cierra

El bucle se cierra solo si el actor tiene todo lo necesario para comparar. Un controlador de Kubernetes funciona porque el clúster le da acceso a todo lo que necesita. Para un agente ese entorno se llama harness (arnés del agente): el entorno en el que trabaja, con programas, permisos y comprobaciones.

donde vive el controlador

donde vive el agente

el agente adivina cómo funciona el programa

nada con lo que comprobar un MUST

no se ve qué se rompió exactamente

las comprobaciones se ejecutan sobre una base de datos vacía

las integraciones se comprueban a ciegas

demasiado arriesgado dejar actuar al agente

Claude Code, Codex, Cursor, Hermes y el chat en un mismo mapa

Las seis capacidades de la imagen son lo que un agente necesita para cerrar el bucle, y lo que pasa sin cada una. Sin ejecución de código el agente adivina cómo funciona el programa. Sin pruebas no se puede comprobar un MUST. Sin logs no se ve qué se rompió exactamente. Sin datos de prueba la comprobación se ejecuta sobre una base de datos vacía y no muestra nada. Sin servicios mediante MCP, las integraciones se comprueban a ciegas. Sin un sandbox (un lugar aislado donde es seguro probar y romper cosas) da miedo dejar actuar al agente. Si falta alguna capacidad, el bucle queda abierto en ese punto.

El controlador de Kubernetes funciona porque el clúster le da una API, nodos y sondas. Para el mismo bucle el agente necesita ejecutar código, pruebas, logs, datos, servicios y un sandbox.

El diccionario fija el estado deseado, pero solo quien puede ejecutar y medir el código puede reconciliarlo con ese estado. Lo que le falte al entorno, el agente no puede comprobarlo, y el bucle queda abierto en ese punto.

Marca cuáles de las seis capacidades tiene tu agente. Para cada una que falte, decide si añadirla al harness o cambiar de harness.

## Preguntas frecuentes

¿Qué es un bucle de reconciliación para specs?

Un bucle donde una persona cambia el estado deseado, la spec, el agente compara el código con ella y lo ajusta, y las pruebas miden el resultado. Así funciona un controlador de Kubernetes.

¿Por qué no bastan las pruebas en verde?

Una prueba confirma solo lo que está escrito en ella. Por eso cada requisito MUST necesita su propia comprobación.

¿Qué necesita el entorno del agente para que el bucle se cierre?

Ejecución de código, pruebas, logs, datos, servicios y un sandbox. Lo que le falte al entorno, el agente no puede comprobarlo.

¿Qué cambia la persona en este bucle?

Solo el estado deseado, la spec. Cualquier edición se convierte de inmediato en trabajo para el agente.

## Siguiente lectura

Estado deseado

diccionario, requisitos RFC y contextos

Ciclo de errores

cómo los errores del agente se convierten en reglas

Entorno

dónde trabaja el agente y qué ve

El ejemplo de la reserva es inventado. Los términos y enfoques siguen las fuentes enlazadas bajo los diagramas.
