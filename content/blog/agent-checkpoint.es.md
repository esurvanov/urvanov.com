---
title: Dónde comprobar el trabajo de un agente de IA: en el límite del agregado, porque nadie puede comprobar todos los programas (teorema de Rice)
date: 2026-11-06
updated: 2026-11-08
description: Por qué ninguna comprobación puede verificar cualquier código de un agente contra cualquier regla, qué tres vías vuelven finita una comprobación, cómo el límite de un agregado del event storming se convierte en punto de control, cómo la comprobabilidad fija el tamaño de un bounded context y por qué el primer marco debe ser barato de mover.
tags: IA, agentes, DDD, agregado, bounded context, event storming, teorema de Rice, Quint, verificación de modelos
category: specs
layout: wide
math: true
mentions: Rice's theorem, halting problem, Gödel's incompleteness theorems, event storming, aggregate, invariant, bounded context, Quint, model checking, DDD
toc: answer=En resumen | rice=Teorema de Rice | ways=Tres marcos | gate=Agregado | size=Tamaño del contexto | agile=Primer marco | godel=Gödel | faq=Preguntas | next=Seguir leyendo
---

El trabajo de un agente de IA se comprueba en el límite del agregado: por donde entran los comandos, salen los eventos y están escritas las reglas que siempre deben cumplirse. El agente escribe el código dentro de ese límite. El motivo es el teorema de Rice: ninguna comprobación puede verificar cualquier programa contra cualquier regla de comportamiento, así que se acota a un marco donde la respuesta es finita. Abajo: por qué, tres formas de acotar y cómo dimensionar un contexto.

<b-post series="agg">
<b-callout icon="bulb">**Estas son reflexiones propias.** El artículo es un intento del autor de entender dónde trazar el límite al trabajar con agentes de IA y cómo dividir un sistema en contextos; el teorema de Rice es aquí solo un medio que ayuda a comprobar un límite ya trazado. Las afirmaciones con fuente llevan al lado un icono ↗: enunciados de teoremas, definiciones, citas. Todo lo demás son conclusiones e hipótesis del autor: el límite del agregado como lugar de la comprobación, el criterio de tamaño del contexto, la comparación con CAP y con Gödel. Conviene leerlas como un punto de vista que aún necesita comprobación.</b-callout>

<b-hchain label="Cadena: teorema de Rice, marco, agregado, tamaño del contexto">
  <step icon="alert-circle" t="Rice">no se puede comprobar todo</step>
  <step icon="ring-dot" t="Marco">acotar la comprobación</step>
  <step icon="cube" t="Agregado">punto de control</step>
  <step icon="workflow" sw="1.8" t="Contexto">tamaño según comprobabilidad</step>
</b-hchain>

<b-chapter id="answer" icon="shield-check" title="En resumen: qué comprueba una persona y qué hace el agente">
  <b-art names="agent-checkpoint/overview" wide/>
  <b-cap>Tres zonas de trabajo con un agente: dónde es libre, dónde está la comprobación y dónde decide una persona.</b-cap>
  <b-why align="left"><b-icon name="cpu"/> **Dentro del agregado trabaja el agente.** Escribe los manejadores de comandos, las consultas a la base de datos, el almacenamiento de datos y las pruebas. El agente puede reescribir toda la estructura interna: partir una tabla en dos, cambiar las consultas, rehacer el procesamiento. Mientras el límite se mantenga, una persona no necesita leer cada línea.</b-why>
  <b-why align="left"><b-icon name="shield-check"/> **La comprobación está en el límite del agregado.** Ahí se escribe qué comandos acepta el agregado, qué eventos entrega a los vecinos y qué reglas se cumplen siempre. Una máquina comprueba ese límite. Un modelo de Quint es un registro de las reglas del sistema en un lenguaje especial, a partir del cual un programa prueba todos los órdenes posibles de comandos y busca uno que rompa una regla. Las restricciones de la base de datos son reglas que esta comprueba en cada escritura, y se niega a guardar lo prohibido. Una persona revisa solo los cambios del propio límite.</b-why>
  <b-why align="left"><b-icon name="workflow"/> **Una persona sostiene el límite del contexto.** Qué agregados viven juntos y dónde cambia el significado de las palabras no se puede calcular a partir del código: depende de cambios futuros. Por eso una persona fija este marco y lo mueve según el historial de cambios y los planes; más en [«El primer marco»](#agile).</b-why>
  <b-finding>
    <ex>El agregado «Reserva de salas de reuniones»: el comando «Reservar una sala», el evento «BookingCreated», la regla «las reservas de una misma sala nunca se solapan». Cómo guardarlas y procesarlas lo decide el agente.</ex>
    <gen>Una persona mantiene una lista corta de cosas en el límite, y una máquina puede comprobar esa lista hasta el final. Todo lo de dentro cambia libremente mientras el límite siga intacto.</gen>
    <do>En tu proyecto, elige un agregado y escribe tres líneas para su límite: comandos, eventos, reglas.</do>
  </b-finding>
</b-chapter>

<b-chapter id="rice" icon="alert-circle" title="Por qué no se puede comprobar todo el código de un agente: el teorema de Rice">
  <b-why align="left">**La idea.** Por ingeniosa que sea la comprobación del código de un agente, hay código con el que falla. Henry Gordon Rice lo demostró en 1951<b-proof href="https://en.wikipedia.org/wiki/Rice%27s_theorem" quote="Wikipedia: “The theorem is named after Henry Gordon Rice, who proved it in his doctoral dissertation of 1951 at Syracuse University.”"/>.</b-why>

  - **Qué no se puede comprobar:** el comportamiento de un programa, lo que hace al ejecutarse. Por ejemplo, «nunca cobra dinero sin un pedido»<b-proof href="https://en.wikipedia.org/wiki/Rice%27s_theorem" quote="Wikipedia: “Rice's theorem states that all non-trivial semantic properties of programs are undecidable.”"/>.
  - **La condición del teorema:** unos programas tienen la propiedad y otros no. Si la tienen todos o ninguno, la respuesta se conoce de antemano.
  - **En detalle, con la demostración:** [«El teorema de Rice en palabras sencillas»](/blog/rice-theorem-explained/).

  <b-why align="left">**Dos tipos de preguntas sobre un programa.** Los matemáticos llaman predicado a una pregunta de sí o no. El teorema descarta una respuesta exacta solo para el segundo tipo.</b-why>
  <b-vs-grid>
    <h></h>
    <h><b-icon name="file-text"/> Cómo está escrito el código</h>
    <h><b-icon name="play"/> Qué hace el código al ejecutarse</h>
    <c>**Ejemplo**</c>
    <c>¿el código escribe en la tabla de pagos?</c>
    <c>¿el programa cobrará alguna vez dinero sin un pedido?</c>
    <c>**Qué hay que examinar**</c>
    <c>el texto del código: es finito</c>
    <c>cada ejecución con cada entrada: infinitas, algunas no terminan nunca</c>
    <c>**Respuesta**</c>
    <c>exacta, con una búsqueda en el código</c>
    <c>imposible en general</c>
  </b-vs-grid>
  <b-why align="left">**Un movimiento práctico:** reescribir el código para que una regla importante pase a ser una pregunta del primer tipo.</b-why>
  <b-art names="agent-checkpoint/rewrite-rule" wide/>
  <b-why align="left">**Una distinción parecida** existe entre el enfoque imperativo y el declarativo. El código imperativo describe pasos y, en general, no se puede saber el resultado a partir de ellos. Una notación declarativa sencilla, como una restricción de base de datos, indica cuál debe ser el resultado, y la base de datos lo hace cumplir.</b-why>
  <iso-art name="term:rice-predicate"></iso-art>
  <b-cap>El código es el mismo. Una pregunta sobre el texto se resuelve leyendo un texto finito; una pregunta sobre el comportamiento exige recorrer todas las ejecuciones.</b-cap>
  <b-why align="left">Por qué una pregunta de comportamiento no se puede responder para todos los programas se deduce de una sola construcción. Toma cualquier programa $P$ y cualquier entrada $w$ para él; $P(w)$ significa «el programa $P$ ejecutado con la entrada $w$». Construye un programa nuevo $Q$: primero ejecuta $P(w)$ y, cuando termina, da un paso $B$ que rompe la regla, como cobrar dinero sin un pedido. Si $P(w)$ nunca termina, el paso $B$ no se alcanza y la regla no se rompe. Así que una comprobación de la regla para $Q$ tiene que saber si $P(w)$ termina. El diagrama siguiente muestra esta construcción, con las fórmulas y la conclusión justo debajo.</b-why>
  <b-art names="agent-checkpoint/rice" wide/>
  <b-cap>La demostración en un diagrama: comprobar la regla para $Q$ diría si $P(w)$ se detiene.</b-cap>
  Cómo es la demostración. Toma cualquier programa $P$ con entrada $w$ y construye a partir de él un programa nuevo $Q$:

  $$Q(x) \;=\; \text{run } P(w)\text{; when it finishes, run } B(x)$$

  El paso $B(x)$ rompe la regla, mientras que un programa que se ejecuta para siempre no la rompe. Así, $Q$ llega a la infracción solo si $P(w)$ llega a terminar:

  $$Q \text{ breaks the rule} \iff P(w) \text{ halts}$$

  Si existiera una comprobación de la regla para todos los programas, dado $Q$ respondería también si $P(w)$ se detiene. Esa pregunta, el problema de la parada, no la puede decidir ningún programa: lo demostró Alan Turing<b-proof href="https://en.wikipedia.org/wiki/Halting_problem" quote="Wikipedia: “Alan Turing proved in 1937 that the halting problem is undecidable.”"/>.
  <b-finding>
    <ex>El agente trajo 2000 líneas. Una comprobación de que «este código nunca crea reservas solapadas» es imposible para código arbitrario en general, por mucho que se mejore.</ex>
    <gen>Queda una elección: comprobar menos que todo, o comprobar dentro de un marco donde la respuesta es finita. No hay una tercera vía, y esto vale tanto para la comprobación con programas como para la revisión humana.</gen>
    <do>Para una regla que quieras comprobar en el trabajo del agente, pregunta: ¿en qué marco la respuesta es exacta? Si no hay ninguno, la regla solo se comprueba con ejemplos.</do>
  </b-finding>
</b-chapter>

<b-chapter id="ways" icon="ring-dot" title="Tres formas de hacer finita una comprobación">
  <b-why align="left">Como no hay una comprobación exacta para todos los programas, se limita la comprobación para que ya no cubra todos. Hay tres formas: reducir el mundo que se comprueba, estrechar el lenguaje en que se escribe el código, o dejar que la comprobación responda con honestidad «no lo sé». El diagrama pone las tres una junto a otra.</b-why>
  <b-art names="agent-checkpoint/three-ways" wide/>
  <b-cap>A la izquierda, probar un mundo pequeño por completo; en el centro, una sola vía de escritura en la base de datos; a la derecha, tres respuestas de la comprobación, la tercera para una persona.</b-cap>
  <b-why align="left">La tabla da las mismas tres formas con más detalle: cómo funciona cada una, qué condición del teorema elimina y por qué entonces la respuesta es exacta, y qué se pierde. Cómo es cada forma para la regla «las reservas de una misma sala nunca se solapan» se ve más abajo, en «Cómo se ve en la práctica».</b-why>
  <b-table>

| Forma | Qué se hace en la práctica | Por qué la respuesta es exacta | Qué se pierde |
|---|---|---|---|
| <b-icon name="package"/> Mundo pequeño | se escribe un modelo de Quint de la reserva: 3 salas, hasta 5 reservas, acciones «reservar» y «cancelar». Un programa prueba cada secuencia de estas acciones y tras cada paso comprueba la regla «las reservas de una misma sala nunca se solapan» | hay un número finito de variantes, así que la búsqueda llega al final y dice «la regla se cumple» o muestra la cadena de pasos donde se rompió | un error que solo aparece con 50 reservas simultáneas no lo verá una búsqueda con 5 |
| <b-icon name="list-check"/> Lenguaje estrecho | la regla se escribe como restricción de PostgreSQL, y solo el archivo `booking/repository.ts` puede escribir en la tabla de reservas. En cada cambio del agente, una búsqueda comprueba que ningún otro archivo escribe en la tabla de reservas | la restricción es una línea en el esquema de la base de datos y esta la comprueba en cada escritura; una búsqueda de archivos siempre termina y da una respuesta exacta | el agente no puede escribir reservas desde donde le resulte cómodo: hasta una importación masiva de reservas tiene que pasar por el mismo archivo permitido |
| <b-icon name="help-circle"/> «No lo sé» | la comprobación de un cambio del agente devuelve una de tres respuestas: «se cumple», «rota», «no se puede saber». La tercera respuesta pone al cambio la etiqueta «necesita una persona» | la comprobación no tiene que resolver los casos difíciles, como una consulta a la base de datos construida con cadenas al vuelo: ahí dice con honestidad «no se puede saber», y donde dice «se cumple» o «rota» la respuesta es exacta | un desarrollador dedica tiempo a los cambios con la etiqueta «necesita una persona» |

  </b-table>
  <b-why align="left">Más, con la demostración de por qué cada forma levanta la prohibición, en [«El teorema de Rice en palabras sencillas»](/blog/rice-theorem-explained/#frames).</b-why>
  <b-subhead>Cómo se ve en la práctica: una regla, tres comprobaciones</b-subhead>
  <b-why align="left">Toma la regla «las reservas de una misma sala nunca se solapan en el tiempo» y un agente que escribe el código de reservas. Abajo, para cada forma: qué se escribe exactamente, qué se ejecuta y qué sale.</b-why>
  <b-why align="left"><b-icon name="package"/> **Reducir el mundo: un modelo de Quint.** La regla y las acciones del sistema se escriben como una descripción corta, sin código real. Un estado es una instantánea de los datos en un momento dado: qué reservas existen, de qué sala, desde cuándo hasta cuándo. Las acciones son «reservar» y «cancelar». La regla es una línea: para dos reservas cualesquiera de la misma sala, una termina antes de que empiece la otra.</b-why>
  <b-codebox title="La regla en un modelo de Quint">
    val noOverlap = bookings.forall(a => bookings.forall(b =>
      a == b or a.room != b.room or a.end <= b.start or b.end <= a.start))
  </b-codebox>
  <b-why align="left">Después el programa prueba todas las secuencias de acciones en un mundo pequeño: 3 salas, hasta 5 reservas. Si la regla se rompe en algún punto, imprime la cadena de pasos. Por ejemplo: dos clientes reservan la sala 2 de 10:00 a 11:00 a la vez, las dos comprobaciones «¿está libre?» pasan antes de que se haga cualquiera de las escrituras, y la base de datos acaba con dos reservas para el mismo hueco. Esa cadena es el hallazgo: el error de diseño aparece antes de que el agente escriba código. Un mundo pequeño basta porque esos errores aparecen con solo dos o tres reservas.</b-why>
  <b-why align="left"><b-icon name="list-check"/> **Estrechar el lenguaje: la regla en la base de datos y un único escritor.** La regla se traslada a donde la mantiene la propia base de datos, no el código del agente. En PostgreSQL es una restricción en la tabla de reservas: la base de datos se niega a guardar una reserva cuyo horario se solape con otra reserva de la misma sala.</b-why>
  <b-codebox title="Una restricción de PostgreSQL">
    CREATE EXTENSION IF NOT EXISTS btree_gist;
    ALTER TABLE bookings ADD CONSTRAINT no_overlap
      EXCLUDE USING gist (room_id WITH =, tstzrange(starts_at, ends_at) WITH &&);
  </b-codebox>
  <b-why align="left">La segunda mitad es un único escritor: solo un módulo puede escribir en la tabla de reservas. Esto se comprueba buscando en el texto del código en cada cambio del agente. El comando de abajo encuentra todos los archivos que escriben en la tabla de reservas salvo el permitido; un resultado vacío significa «ningún rodeo».</b-why>
  <b-codebox title="La comprobación del «único escritor» con una búsqueda en el código">
    grep -rl "INSERT INTO bookings" src | grep -v src/booking/repository.ts
  </b-codebox>
  <b-why align="left">La pregunta «¿puede el código del agente crear reservas solapadas?» se ha convertido en dos preguntas sobre texto: ¿está la restricción en el esquema de la base de datos? y ¿no hay ninguna escritura que la rodee? Ambas tienen una respuesta exacta.</b-why>
  <b-why align="left"><b-icon name="help-circle"/> **Permitir el «no lo sé»: tres veredictos sobre un cambio del agente.** La comprobación de un cambio del agente se construye con las dos anteriores y devuelve una de tres respuestas. «Demostrado»: el modelo de Quint pasó, la restricción de la base de datos está puesta y la búsqueda no encontró escrituras que la rodeen. «Roto»: la búsqueda encontró que el agente añadió una escritura en la tabla de reservas desde el módulo de informes. «No estoy seguro»: el agente construye la consulta a la base de datos con cadenas al vuelo, y una búsqueda de texto no puede saber en qué tabla escribe. Entonces el cambio recibe la etiqueta «necesita una persona» y lo revisa un desarrollador. La persona gasta tiempo solo en el tercer caso.</b-why>
  <b-why align="left">Cada una de las tres respuestas es exacta solo dentro de sus límites. La búsqueda demuestra que la regla se cumple en un modelo con 3 salas y 5 reservas, no en la base de datos de producción con miles de reservas. La búsqueda en el código demuestra que no hay escritura que rodee la regla, no que la propia restricción de la base de datos esté bien escrita. Una respuesta «se cumple» es exacta, pero algunos cambios siguen yendo a una persona. Por eso las formas se usan juntas: el modelo comprueba el diseño antes del código, la restricción y la búsqueda comprueban el propio código, y una persona mira lo que queda con etiqueta.</b-why>
  <b-why align="left">Hay también una cuarta opción, la más común en la práctica: responder siempre, pero a veces equivocarse. Las pruebas con ejemplos y la revisión de código por otro modelo funcionan así. Es una elección aceptable también, pero deliberada: sirve donde un error es barato, no para dinero ni accesos. Una bifurcación parecida se conoce del teorema CAP sobre sistemas distribuidos: durante una partición, un servidor o espera o responde con una copia obsoleta. Comparten algo: mientras un evento no ha ocurrido, no se puede saber si ocurrirá más tarde o nunca, por mucho que se espere; pero las razones difieren; detalles en [«El teorema de Rice en palabras sencillas»](/blog/rice-theorem-explained/#cap).</b-why>
  <b-finding>
    <ex>La regla «las reservas nunca se solapan»: un modelo de Quint probó todos los órdenes de comandos para 3 salas, una restricción de la base de datos prohíbe el solapamiento, y un linter, un programa que comprueba el texto del código contra reglas fijadas, se asegura de que solo un módulo escribe en la tabla de reservas.</ex>
    <gen>«No estoy seguro» es un resultado honesto de la comprobación. Muestra dónde acaba el marco y la responsabilidad vuelve a una persona, y así fija qué riesgo se acepta.</gen>
    <do>Para cada regla, marca cuál de las tres formas la sostiene. Una regla sin marca solo se comprueba con pruebas de ejemplo.</do>
  </b-finding>
</b-chapter>

<b-chapter id="gate" icon="cube" title="El agregado como punto de control: qué aporta el event storming">
  <b-why align="left">El event storming es un formato de taller en el que un equipo despliega el dominio de negocio como eventos<b-proof href="https://www.eventstorming.com/" quote="eventstorming.com: “EventStorming is a flexible workshop format for collaborative exploration of complex business domains.”"/>. Después, cada agregado tiene cuatro cosas: los comandos que lo cambian, los eventos que emite, los modelos de lectura con los que se consulta y los invariantes, las reglas que se cumplen en todo estado.</b-why>
  <iso-art name="term:aggregate"></iso-art>
  <b-why align="left">Estas cuatro cosas forman el límite donde encaja bien una comprobación. Todo cambio pasa por comandos, todo lo que ven los vecinos sale como eventos y las reglas viven en un solo lugar. Es justo la segunda forma de la sección anterior: solo el agregado escribe en su tabla, así que ningún otro código puede romper la regla, y solo queda una cosa por comprobar: que nada más escribe en esa tabla.</b-why>
  <b-art names="agent-checkpoint/gate" wide/>
  <b-cap>El punto de control está donde entran los comandos y salen los eventos. Dentro del límite el agente es libre.</b-cap>
  <b-why align="left">La tabla va fila por fila: cuáles de las cuatro partes del agregado están en el límite y las comprueban una máquina y una persona, y cuáles quedan dentro y las hace el agente sin revisión línea a línea.</b-why>
  <b-vs-grid>
    <h></h>
    <h>En el límite (se comprueba)</h>
    <h>Dentro (lo hace el agente)</h>
    <c>**Comandos**</c>
    <c>cuáles existen y qué reciben</c>
    <c>cómo manejarlos</c>
    <c>**Eventos**</c>
    <c>cuáles salen y con qué campos</c>
    <c>cuándo y cómo construirlos</c>
    <c>**Invariantes**</c>
    <c>un modelo de Quint, restricciones de la base de datos</c>
    <c>código que no los rompa</c>
    <c>**Modelos de lectura**</c>
    <c>qué muestran</c>
    <c>cómo construirlos rápido</c>
  </b-vs-grid>
  <b-finding>
    <ex>El agente pasó el almacenamiento de reservas de una tabla a dos. El límite siguió igual: los mismos comandos y eventos, el modelo de Quint pasa, la restricción de la base de datos se cumple. La revisión humana se reduce a una pregunta: ¿se tocó el límite?</ex>
    <gen>Una vez escrito el límite, comprobar un cambio del agente se vuelve finito: se compara el límite antes y después. El código de dentro puede revisarse por muestreo.</gen>
    <do>Crea un archivo de límite para el agregado: comandos, eventos, invariantes, modelos de lectura. Cualquier cambio en ese archivo requiere revisión humana; los cambios de dentro no.</do>
  </b-finding>
</b-chapter>

<b-chapter id="size" icon="workflow" title="Cómo dimensionar un bounded context: según la comprobabilidad">
  <b-why align="left">Pasar de un dominio de negocio a bounded contexts es la parte más difícil de DDD. Las señales habituales de un límite: una palabra empieza a significar otra cosa, cambia el equipo, las reglas ya no tienen que cumplirse a la vez.</b-why>
  <b-callout icon="list-check">**Un criterio de tamaño del contexto.** Un contexto es lo bastante pequeño si un modelo de Quint de sus reglas se puede recorrer hasta el final con números pequeños y dice «la regla se cumple» o muestra una infracción. Si la búsqueda no termina, el contexto debe dividirse. El criterio se deduce del teorema de Rice: una respuesta exacta es posible solo donde hay un número finito de variantes y se pueden probar todas.</b-callout>
  <b-why align="left">**Cómo aplicar el criterio a tu proyecto.** Toma una parte del sistema que consideres candidata a contexto, como «reservas», y compruébala en cinco pasos.</b-why>

  1. **Enumera las reglas y las acciones.** Las reglas son lo que debe cumplirse siempre: «las reservas de una misma sala nunca se solapan». Las acciones son los comandos que cambian datos: «reservar», «cancelar».
  2. **Escríbelas como un modelo de Quint.** El estado es qué reservas existen; las acciones, cómo cambian el estado; las reglas, comprobaciones tras cada paso. Son decenas de líneas, sin código real.
  3. **Elige números pequeños.** 2–3 objetos de cada tipo: 3 salas, 5 reservas, 2 clientes. Normalmente basta para que aparezcan las combinaciones problemáticas típicas: dos reservas de una sala, dos clientes en el mismo minuto. No hay garantía: un error que necesite más objetos pasará desapercibido.
  4. **Ejecuta la búsqueda con un límite de tiempo,** por ejemplo 10 minutos.
  5. **Lee el resultado con la tabla de abajo.** La búsqueda terminó sin infracciones: el tamaño es adecuado. Terminó y mostró una infracción: el tamaño es adecuado, pero las reglas o las acciones tienen un error que corregir. No terminó dentro del límite: hay demasiados estados y el candidato se divide.

  <b-callout icon="alert-circle">**Sin estimaciones.** Los números de aquí son una guía, no umbrales medidos. Nadie ha medido, para este criterio, cuántos objetos bastan para detectar los errores de un contexto ni qué límite de tiempo debe considerarse «demasiado grande». Elígelos para tu proyecto y anota con qué números se comprobó el modelo.</b-callout>

  <b-codebox title="Ejecutar la búsqueda para el modelo de reservas">
    quint verify booking.qnt --invariant=noOverlap --max-steps=10
  </b-codebox>
  <b-why align="left">**Cómo dividir si la búsqueda no terminó.** Para cada regla, anota qué datos toca. Las reglas sin datos en común van a partes distintas: «las reservas nunca se solapan» toca solo reservas, «una factura nunca se paga dos veces» toca solo facturas. Entre las partes, deja eventos como «BookingCreated». Después comprueba cada parte con los mismos cinco pasos.</b-why>
  <b-art names="agent-checkpoint/size" wide/>
  <b-cap>Si el modelo de un contexto responde «no estoy seguro», el contexto se divide y entre las partes solo quedan eventos.</b-cap>
  <b-why align="left">Cómo usar esta señal: escribe las reglas del contexto como un modelo de Quint, fija números pequeños y ejecuta la búsqueda. El resultado cae en una de las filas de la tabla, y la última columna dice qué hacer a continuación.</b-why>
  <b-table>

| Señal | Significado | Qué hacer |
|---|---|---|
| <b-status-dot color="accent">El modelo pasa con números pequeños</b-status-dot> | el modelo se comprobó hasta el final, sin infracciones | conservarlo |
| <b-status-dot color="warn">El modelo no termina</b-status-dot> | demasiados estados | dividir por reglas que no necesitan cumplirse juntas |
| <b-status-dot color="warn">Una regla no se puede escribir sin el mundo exterior</b-status-dot> | el límite está en el sitio equivocado | mover el mundo exterior más allá del límite y hablar con él mediante eventos |
| <b-status-dot color="accent">Solo eventos entre las partes</b-status-dot> | las partes no tocan los datos de las otras | cada parte tiene su propio modelo y su propio agente |

  </b-table>
  <b-finding>
    <ex>Reservas, pagos y notificaciones en un solo modelo: la búsqueda no termina en una hora. Reservas solas y pagos solos, unidos por el evento «BookingCreated»: cada modelo pasa en segundos.</ex>
    <gen>El tamaño del contexto deja de ser cuestión de gusto: si las reglas de dentro no se pueden comprobar hasta el final, el contexto es demasiado grande o sus reglas están escritas en un lenguaje demasiado potente. Más sobre un agente por contexto en [cuántos agentes de IA se necesitan](/blog/agents-per-bounded-context/).</gen>
    <do>Escribe un modelo de Quint de tu contexto más grande con números pequeños. Si la búsqueda no termina, encuentra reglas que no necesiten cumplirse juntas y traza el límite entre ellas.</do>
  </b-finding>
</b-chapter>

<b-chapter id="agile" icon="refresh" title="El primer marco: por qué será erróneo y cómo hacerlo barato">
  <b-callout icon="help-circle">**Una pregunta abierta.** Cómo funciona la elección de un marco aún no está del todo claro; esta sección recoge una hipótesis preliminar para futuros artículos. La hipótesis: elegir un marco choca con el mismo núcleo común que el teorema CAP y el teorema de Rice: mientras un evento no ha ocurrido, no se puede saber si ocurrirá más tarde o nunca, por mucho que se espere; aquí el evento es un cambio que obligaría a cambiar de marco: si llega el mes que viene o nunca, no se puede saber de antemano. Ese núcleo se trata en [«El vínculo con el teorema CAP»](/blog/rice-theorem-explained/#cap). Todavía no hay hechos ni ejemplos comprobados suficientes que la respalden, así que el resto de la sección debe leerse como un boceto que necesita comprobación. Es una dirección para investigar más.</b-callout>
  <b-art names="agent-checkpoint/frame-question" wide/>
  <b-cap>El marco se trazó alrededor de reservas y salas. Si el siguiente cambio trata de reservas y salas, el marco encaja. Si trata de reservas y facturas, cruza el límite y el marco tiene que moverse. Cuál llegará no se puede saber ahora: esa es la pregunta abierta.</b-cap>
  <b-why align="left">**Lo que queda por averiguar:**</b-why>

  - si la elección de un marco puede enunciarse con rigor como un problema de información ausente, como se hizo con CAP, o el parecido es solo verbal;
  - cuánto predice el historial de cambios pasados los futuros: no hay mediciones, solo observaciones de proyectos concretos;
  - qué duración del ciclo de revisión del marco funciona: las dos semanas de abajo son un ejemplo, no un número comprobado;
  - cómo se relacionan dos preguntas: qué tamaño debe tener una parte (aquí ayuda el teorema de Rice) y dónde trazar sus límites (esto requiere información sobre el futuro).

  <b-why align="left">Elegir un marco choca con una prohibición distinta de la del teorema de Rice. Una comprobación de código tiene toda la información, todo el código está delante, pero la respuesta no se puede calcular a partir de él. A un marco le falta la propia información. Un buen marco es aquel donde vivirán los cambios futuros, y no hay datos sobre el futuro ni en el código ni en ningún otro sitio. Es exactamente la posición del servidor en el teorema CAP: no sabe qué pasa en su vecino al otro lado del enlace roto, y aquí nadie sabe qué cambios llegarán el mes que viene.</b-why>
  <b-why align="left">Por eso las salidas son las mismas que en CAP. Esperar a que el futuro se conozca no es posible: el trabajo se hace ahora. Queda responder ahora con lo disponible y estar preparado para equivocarse. «Lo disponible» son dos aproximaciones al futuro: el historial de cambios pasados, que muestra qué suele cambiar junto, y tus planes, que solo tú conoces. Y la tercera salida de CAP, acotar el tiempo, se convierte aquí en los ciclos cortos de agile: fijar el marco para dos semanas, ver cómo viven los cambios en él y moverlo. Como el marco será erróneo de todos modos, lo que importa es que moverlo sea barato.</b-why>
  <b-why align="left">El teorema de Rice sigue participando en esta sección, con otro papel. No ayuda a adivinar el futuro, pero da una comprobación de un marco ya elegido: si un modelo de Quint de las reglas de una parte se puede recorrer hasta el final, la parte es lo bastante pequeña; si no, debe dividirse. Esa señal se trató en la sección sobre el tamaño del contexto.</b-why>

  <b-subhead>De dónde salen las primeras partes</b-subhead>
  <b-why align="left">No hace falta conocer las partes de antemano: el primer corte sale de lo que ya existe, y una persona solo nombra las partes y fija los puntos discutidos.</b-why>
  <b-table>

| Qué existe | Primer corte | Después |
|---|---|---|
| <b-icon name="git-branch"/> Historial de cambios | las tablas que casi siempre cambian en los mismos commits se unen en una parte | comprobar el corte contra las épicas del backlog |
| <b-icon name="list-check"/> Reglas de datos, sin historial | las tablas mencionadas en una misma regla van a una parte | comparar con el historial tras las primeras decenas de commits |
| <b-icon name="sparkle"/> Nada, arranque en frío | una parte por concepto principal: proyecto, informe, épica, acceso | comparar con el historial tras las primeras decenas de commits y mover |

  </b-table>
  <b-why align="left">Cómo funciona unir por reglas. Enumera las reglas de datos, por ejemplo «una épica cerrada no tiene informes abiertos», «un token ve solo sus propios proyectos». Si una regla menciona dos tablas, van a una parte. Los grupos resultantes son el primer corte.</b-why>
  <b-art names="agent-checkpoint/first-cut" wide/>
  <b-cap>Los grupos de tablas unidas son el primer corte. Una tabla que todos necesitan se convierte en un núcleo compartido.</b-cap>
  <b-why align="left">Donde una regla lo ata casi todo, como el estado de un informe que necesitan tanto las épicas como el tablero, esa tabla se convierte en un núcleo compartido con un único responsable. Las demás partes solo llegan a ella a través de ese responsable. Solo el núcleo escribe en la tabla de estados, así que ni las épicas ni el tablero pueden romper la regla del estado.</b-why>
  <b-finding>
    <ex>Las épicas y los informes fueron a una parte, los tokens y los proyectos a otra, y el estado del informe se convirtió en el núcleo. Un mes después el historial mostró que los archivos de proyectos y de épicas se editaban en los mismos commits: los proyectos pasaron a las épicas.</ex>
    <gen>Un marco erróneo es barato de corregir: mover una tabla a otra parte es un cambio de una línea, tras el cual las propias comprobaciones muestran si las cosas mejoraron o empeoraron. Como el marco no se puede adivinar de antemano, se mantiene fácil de mover.</gen>
    <do>Pide al agente que compruebe el corte contra el historial de cambios y el backlog.</do>
  </b-finding>
</b-chapter>

<b-chapter id="godel" icon="bulb" title="Dónde encaja Gödel: solo como analogía">
  <b-why align="left">El vínculo entre el teorema de incompletitud de Gödel y este tema es una suposición propia; no he encontrado fuentes que lo establezcan. El motivo: las demostraciones de Gödel y de Rice se apoyan en el mismo truco, un programa o una fórmula que habla de sí mismo. Pero el primer teorema de Gödel trata de sistemas formales en los que se puede hacer aritmética elemental<b-proof href="https://en.wikipedia.org/wiki/G%C3%B6del%27s_incompleteness_theorems" quote="Wikipedia: “Any consistent formal system F within which a certain amount of elementary arithmetic can be carried out…”"/>, y no dice nada sobre los límites de un dominio de negocio. Para el argumento sobre comprobar a un agente, el resultado exacto es el teorema de Rice.</b-why>
  <b-why align="left">El segundo teorema sirve como analogía: un sistema así no puede demostrar su propia consistencia<b-proof href="https://en.wikipedia.org/wiki/G%C3%B6del%27s_incompleteness_theorems" quote="Wikipedia: “The second incompleteness theorem, an extension of the first, shows that no such system can demonstrate its own consistency.”"/>. Trasladado al trabajo con agentes: un agente no puede confirmar por sí solo que hizo bien el trabajo; necesita un verificador fuera de su marco. Es una imagen, sin conclusión matemática detrás.</b-why>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Preguntas frecuentes">
  <b-faq-cards>
    <q t="¿Dónde hay que comprobar el trabajo de un agente de IA?">En el límite del agregado: en los comandos, los eventos y las reglas que deben cumplirse siempre. Una máquina puede comprobar ese límite hasta el final, y el agente escribe el código dentro.</q>
    <q t="¿Qué dice el teorema de Rice en palabras sencillas?">Ningún programa puede decir, para todos los programas, si tienen una propiedad de comportamiento dada. Por eso se acota la comprobación: con un mundo pequeño, un lenguaje estrecho o un «no lo sé» honesto.</q>
    <q t="¿Cómo se dimensiona un bounded context?">Además de los cambios en el significado de las palabras y en el equipo, hay una señal comprobable: un modelo de las reglas del contexto debe terminar con números pequeños. Si no termina, el contexto se divide por reglas que no necesitan cumplirse juntas.</q>
    <q t="¿Cómo se elige el primer marco sin historial de cambios?">Las tablas mencionadas en una misma regla de datos van a una parte, y si aún no hay reglas, se empieza con una parte por concepto principal. Tras las primeras decenas de commits, se compara el corte con el historial y se mueve.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Seguir leyendo">
  <b-links>
    <item href="/blog/specs-by-aggregates/" k="Specs" t="Specs por agregado">la ficha del agregado y los niveles de requisitos</item>
    <item href="/blog/agents-per-bounded-context/" k="Agentes" t="Cuántos agentes de IA se necesitan">un agente por bounded context</item>
    <item href="/blog/quint-vs-tests-and-tla/" k="Comprobaciones" t="Verificación de modelos frente a pruebas">Quint, QUnit y TLA+</item>
    <item href="/blog/quint-models-find-races/" k="Modelos" t="Encontrar condiciones de carrera">modelos de Quint en la práctica</item>
    <item href="/blog/rice-theorem-explained/" k="Teoría" t="El teorema de Rice en palabras sencillas">predicado, demostración, tres marcos</item>
  </b-links>
</b-chapter>
<b-footer>Datos: a 6 de noviembre de 2026, de Wikipedia (teoremas de Rice y de Gödel) y eventstorming.com. El ejemplo de las reservas es ilustrativo.</b-footer>
</b-post>
