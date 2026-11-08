---
title: Qué dice el teorema de Rice: por qué ninguna comprobación sirve para todos los programas y qué hacer al respecto
date: 2026-11-06
updated: 2026-11-08
description: Qué afirma el teorema de Rice y por qué comprobar el comportamiento de un programa choca con el problema de la parada. Predicados sobre el texto y sobre el comportamiento, una demostración con un ejemplo de pagos, el vínculo con la paradoja del barbero y tres marcos que hacen exacta una comprobación.
tags: teorema de Rice, problema de la parada, paradoja del barbero, predicado, verificación formal, Quint, DDD, agentes
category: specs
layout: wide
math: true
mentions: Rice's theorem, CAP theorem, chaos engineering, fail-fast, Kubernetes, halting problem, barber paradox, Russell's paradox, Alan Turing, predicate, undecidability, declarative approach, imperative approach, model checking, ubiquitous language, bounded context
toc: essence=Lo esencial | predicate=Salida 1: texto del código | small-model=Salida 2: modelo | human=Salida 3: una persona | proof=Demostración | root=De dónde viene el truco | frames=Tres marcos | cap=Vínculo con CAP | faq=Preguntas | next=Sigue leyendo
---

El teorema de Rice dice que ningún programa puede decir siempre correctamente, para cualquier otro programa, cómo se comportará, por ejemplo si cobrará dinero sin un pedido. Cualquier programa puede contener a otro, y entonces la respuesta depende de si el programa contenido termina, algo que ningún programa puede decidir. Por eso, en la práctica se acota la pregunta: se revisa el texto del código, un modelo pequeño de las reglas, o los casos difíciles pasan a una persona.

<b-post series="agg">
<b-hchain label="Chain: Russell 1901, Turing 1936, Rice 1951, frame">
  <step icon="help-circle" t="Russell, 1901">¿el conjunto se contiene a sí mismo?</step>
  <step icon="cpu" t="Turing, 1936">¿el programa se detendrá?</step>
  <step icon="alert-circle" t="Rice, 1951">lo mismo para cualquier comportamiento</step>
  <step icon="ring-dot" t="Frame">dónde sí funciona comprobar</step>
</b-hchain>

<b-chapter id="essence" icon="alert-circle" title="Lo esencial: qué prohíbe el teorema de Rice">
  <b-why align="left">La prohibición afecta a un único verificador para todos los programas a la vez: para un programa concreto muchas veces sí se puede encontrar una respuesta. En su forma estricta, el teorema dice que ningún programa puede comprobar una propiedad del comportamiento que algunos programas tienen y otros no<b-proof href="https://en.wikipedia.org/wiki/Rice%27s_theorem" quote="Wikipedia: “Rice's theorem states that all non-trivial semantic properties of programs are undecidable.”"/>. Henry Gordon Rice lo demostró en su tesis doctoral de 1951<b-proof href="https://en.wikipedia.org/wiki/Rice%27s_theorem" quote="Wikipedia: “The theorem is named after Henry Gordon Rice, who proved it in his doctoral dissertation of 1951 at Syracuse University.”"/>.</b-why>
  <b-why align="left">Cómo leerlo en términos cotidianos. Imagina un verificador al que se le entrega cualquier programa y se le pregunta: «¿cobrará alguna vez dinero sin un pedido?». El verificador puede ser tan listo como quieras, trabajar todo el tiempo que quieras y conocer todos los lenguajes de programación. El teorema dice que aun así existe un programa en el que responde mal o nunca responde. Es una propiedad de la tarea misma, y mejorar el verificador no la elimina, igual que mejorar un diseño no produce una máquina de movimiento perpetuo. En el esquema de abajo, el verificador es el cubo azul: mira los programas uno por uno y responde «lo cumple» o «lo rompe» para cada uno. El programa naranja de la derecha está construido contra esa misma comprobación, a partir de su propio texto: en él la respuesta es errónea o no llega nunca. Otra comprobación tiene su propio programa así.</b-why>
  <iso-art name="term:rice-theorem"></iso-art>
  <b-why align="left">Imagina que añadiste una comprobación automática a la tienda. Lee cada cambio del código de pagos y responde: «este cambio nunca cobrará dinero sin un pedido» o «sí lo cobrará». Para poder fiarse de esa comprobación hacen falta tres cosas, numeradas en el esquema de abajo.</b-why>

  1. **Una respuesta sobre el comportamiento.** La comprobación debe decir qué hará el código al ejecutarse: si cobra dinero en una sola de todas las compras que pasarán alguna vez por él. Esas compras no se acaban nunca, y las pruebas no pueden probarlas todas.
  2. **Una comprobación para cualquier cambio.** No se puede acotar de antemano qué código llegará: la comprobación funciona con cualquier código que reciba, incluso uno escrito para engañarla.
  3. **Una respuesta para cada cambio.** Solo «cobrará» o «no cobrará», sin «no lo sé»: la comprobación previa a la fusión solo puede dejar pasar un cambio o bloquearlo.

  <b-why align="left">Además de estas tres, la respuesta debe ser correcta: «no cobrará» significa «seguro que no cobrará». Existen comprobaciones que siempre responden pero a veces se equivocan: las pruebas y las heurísticas. Son útiles, pero no se pueden tomar al pie de la letra, y de aquí en adelante solo se habla de comprobaciones correctas.</b-why>

  <b-why align="left">El teorema de Rice dice: no existe una comprobación correcta que tenga las tres propiedades; en algún cambio se equivocará o no responderá. En el esquema es la barra naranja. Si quitas cualquiera de las tres propiedades, una comprobación correcta pasa a ser posible, pero para una pregunta más estrecha. Cuál quitar es la elección que se hace en la práctica: la parte inferior del esquema muestra tres opciones.</b-why>
  <b-lane title="Three properties of a check" color="accent">
  <b-scene names="rice-theorem-explained/conditions"/>
  <b-pick-tabs id="rice-cond" group="rice-k" tone="accent">
    <tab t="Sobre el comportamiento">
    </tab>
    <tab t="Cualquier cambio">
    </tab>
    <tab t="Siempre una respuesta">
    </tab>
  </b-pick-tabs>
  </b-lane>
  <b-table id="rice-wishes">

| <label for="rice-cond1"><b-icon name="play"/> 1. Sobre el comportamiento</label> | <label for="rice-cond2"><b-icon name="file-text"/> 2. Cualquier cambio</label> | <label for="rice-cond3"><b-icon name="help-circle"/> 3. Siempre una respuesta</label> |
|---|---|---|
| **Significado:** qué hará el código en todas las compras futuras | **Significado:** una comprobación para cualquier código, incluso uno escrito para engañarla | **Significado:** solo «sí» o «no», sin «no lo sé» |
| **Lo que ve un desarrollador:** un revisor adivina si el cambio podría cobrar dinero en algún pedido | **Lo que ve un desarrollador:** un solo linter o un solo modelo revisor para cada cambio | **Lo que ve un desarrollador:** la comprobación previa a la fusión solo deja pasar cambios o los bloquea |
| **Si se quita: texto del código:** una búsqueda comprueba que solo el módulo de pagos escribe en la tabla de pagos | **Si se quita: modelo pequeño:** reglas de pago para 3 pedidos y 2 clientes, con todas las variantes probadas; se comprueba el modelo de las reglas, el código se revisa aparte | **Si se quita: una persona:** ante un cambio difícil la comprobación responde «no lo sé» y lo mira un desarrollador |

  </b-table>
  <b-why align="left">Elige un lado del triángulo: las dos propiedades de sus extremos se quedan y la tercera cae. Las pestañas de aquí y las de debajo del esquema de propiedades están enlazadas: el número de la pestaña es el número de la propiedad, y se ilumina su columna en la tabla de arriba.</b-why>
  <b-lane title="Which property to give up" color="accent">
  <b-scene names="rice-theorem-explained/triangle"/>
  <b-pick-tabs id="rice-tri" group="rice-k" tone="accent">
    <tab t="Texto del código">
    </tab>
    <tab t="Modelo pequeño">
    </tab>
    <tab t="Una persona">
    </tab>
  </b-pick-tabs>
  </b-lane>

  <b-why align="left">**Un cuarto camino, fuera del triángulo,** es responder siempre pero equivocarse a veces. Así funcionan las pruebas y la ingeniería del caos (chaos engineering): los fallos provocados a propósito en producción muestran si el sistema aguanta. Es una comprobación por ejemplos y no da una demostración para todos los casos.</b-why>
  <b-callout icon="bulb">**Una nota para quien diseña con DDD.** En DDD un sistema se divide en contextos delimitados (bounded contexts), partes con vocabulario propio, como «Pagos». Para razonar con sencillez, conviene tomar un modelo pequeño que describa un contexto: el estado de sus agregados, los comandos como acciones y las invariantes como comprobaciones después de cada paso, todo con números pequeños. El modelo sirve para razonar sobre los límites y el tamaño de los contextos: si el modelo de un contexto no se puede probar entero ni con números pequeños, probablemente el contexto es demasiado grande. No garantiza que el contexto funcione. El código puede desviarse del modelo, así que el código se comprueba aparte: con restricciones de la base de datos, pruebas y búsqueda en el código. Un error que solo aparece con mil pedidos no saldrá en un modelo con tres. Y el modelo no dice nada de lo que no se escribió en él: modelos de lectura, sistemas externos, el tiempo. La señal de tamaño es una hipótesis del autor; más en [«Dónde comprobar el trabajo de un agente de IA»](/blog/agent-checkpoint/#size).</b-callout>
  <b-finding>
    <ex>Llega un cambio con 2000 líneas de código de pagos. Ningún linter (un programa que comprueba el texto del código con reglas fijas), ningún modelo revisor ni ningún otro programa puede garantizar que nunca cobrará dinero sin un pedido si se esperan las tres propiedades a la vez.</ex>
    <gen>Es un límite de la tarea misma. Mientras la comprobación deba responder sobre el comportamiento, sobre cualquier cambio y siempre, sin «no lo sé», en algún cambio se equivocará o no responderá nunca, por mucho que se mejore.</gen>
    <do>Para cada regla importante, elige qué propiedad de las tres abandonar: revisar el texto del código, probar un modelo pequeño de reglas y comprobar el código contra él por separado, o pasar los cambios difíciles a una persona.</do>
  </b-finding>
</b-chapter>

<b-chapter id="predicate" icon="list-check" title="Salida 1. Texto del código: una pregunta sobre cómo está escrito en lugar de sobre el comportamiento">
  <b-why align="left">Aquí se abandona la propiedad 1, «sobre el comportamiento»: la pregunta de qué hará el código se sustituye por la pregunta de cómo está escrito. Por qué funciona: las preguntas sobre código son de dos tipos, y el teorema descarta una respuesta exacta solo para uno de ellos.</b-why>

  - **Cómo está escrito el código:** «¿el código escribe en la tabla de pagos?». Para responder basta leer cada línea, y son finitas.
  - **Qué hará el código:** «¿cobrará alguna vez dinero sin un pedido?». Para responder hace falta el resultado de cada ejecución con cada pedido, y no se acaban nunca.

  <b-why align="left">**Cómo se relaciona esto con los enfoques de desarrollo:**</b-why>

  - **El código imperativo** describe pasos, y una regla sobre el resultado surge de ellos, así que hay que comprobarla contra el comportamiento. Es la fila inferior del esquema.
  - **Una notación declarativa** indica qué debe cumplirse: una restricción de base de datos «ningún pago sin pedido». Su comportamiento se ve en la propia notación, así que comprobar el texto es exacto. Es la fila superior. Kubernetes funciona igual: un archivo describe el estado deseado y el sistema lo mantiene por sí solo.
  - **La ingeniería del caos** comprueba el comportamiento en producción: se inyectan fallos a propósito en el sistema en marcha para ver si aguanta. Responde a la pregunta de la fila inferior solo para los fallos provocados, no para cada ejecución.

  <b-why align="left">Una pregunta así, de sí o no, se llama predicado. El esquema hace las dos preguntas sobre el mismo código: la fila superior sobre el texto, la inferior sobre el comportamiento.</b-why>
  <iso-art name="term:rice-predicate"></iso-art>
  <b-vs-grid>
    <h></h>
    <h><b-icon name="file-text"/> Cómo está escrito</h>
    <h><b-icon name="play"/> Qué resulta</h>
    <c>**Pregunta**</c>
    <c>¿el código escribe en la tabla de pagos?</c>
    <c>¿cobrará el programa alguna vez dinero sin un pedido?</c>
    <c>**Qué examinar**</c>
    <c>líneas de código; finitas, se pueden leer todas</c>
    <c>cada ejecución con cada entrada; infinitas, algunas no terminan nunca</c>
    <c>**Respuesta**</c>
    <c>siempre disponible</c>
    <c>en general, ninguna</c>
  </b-vs-grid>
  <b-why align="left">Qué significa «una pregunta sobre el comportamiento». Una pregunta así depende solo de lo que hace el programa y no de cómo está escrito. Si dos programas se comportan igual con cada entrada, obtienen la misma respuesta a una pregunta sobre el comportamiento. Ejemplo: un programa suma las compras con un bucle, otro con una función de biblioteca. Los textos difieren, el comportamiento es el mismo y «¿puede la suma ser negativa?» tiene una sola respuesta para ambos. Pero «¿el código contiene un bucle?» tiene respuestas distintas, porque es una pregunta sobre el texto.</b-why>
  <b-table>

| Pregunta | Sobre | ¿Decidible? |
|---|---|---|
| ¿la función tiene más de 50 líneas? | texto | sí, contando |
| ¿el código llama a `delete`? | texto | sí, buscando |
| ¿hay una escritura en la tabla de pedidos fuera de un módulo? | texto | sí, buscando, si las consultas no se construyen sobre la marcha |
| ¿el programa terminará con cualquier entrada? | comportamiento | no, en general |
| ¿la función puede devolver alguna vez una suma negativa? | comportamiento | no, en general |
| ¿el manejador cobrará dinero sin un pedido? | comportamiento | no, en general |

  </b-table>
  <b-finding>
    <ex>«Solo el módulo de pagos escribe en la tabla de pagos» es una pregunta sobre el texto; una búsqueda en el código la comprueba. «Un pago nunca se hace sin un pedido» es una pregunta sobre el comportamiento.</ex>
    <gen>Una pregunta sobre el comportamiento muchas veces se puede sustituir por una sobre el texto si el código se escribe de modo que solo un lugar pueda romper la regla, por ejemplo un único archivo que escribe en la tabla de pagos.</gen>
    <do>Reescribe las reglas importantes para que se conviertan en preguntas sobre el texto: un único escritor por tabla, una restricción de base de datos, la regla en un solo lugar.</do>
  </b-finding>
</b-chapter>

<b-chapter id="small-model" icon="package" title="Salida 2. Un modelo pequeño: probar todo, pero con números pequeños">
  <b-why align="left">Aquí se abandona la propiedad 2, «cualquier cambio». Lo que se comprueba es una descripción breve de las reglas de pago, no el código, y solo con números pequeños: 3 pedidos y 2 clientes. Las variantes pasan a ser finitas y un programa las prueba todas hasta el final.</b-why>
  <b-art names="rice-theorem-explained/small-model" wide/>

  1. **Estado:** qué pedidos existen, cuántas veces se cobró cada uno, qué pedido tiene comprobado cada cliente.
  2. **Acciones:** «crear un pedido», «comprobar que el pedido no está pagado», «cobrar dinero».
  3. **Reglas:** ningún pago sin pedido y ningún doble cobro, comprobado después de cada paso.
  4. **Búsqueda:** todos los órdenes de acciones para 3 pedidos y 2 clientes.

  <b-vs-grid>
    <h></h>
    <h><b-icon name="check"/> Detecta</h>
    <h><b-icon name="alert-circle"/> No ve</h>
    <c>**Dónde**</c>
    <c>errores en el diseño de las reglas, antes de cualquier código</c>
    <c>errores en el propio código: el modelo no lo lee</c>
    <c>**Ejemplo**</c>
    <c>dos clientes que pagan el mismo pedido en el mismo momento</c>
    <c>un fallo que solo aparece con mil pedidos</c>
  </b-vs-grid>
  <b-why align="left">**Por qué la búsqueda termina.** El modelo tiene un número finito de estados: cada uno de los 3 pedidos se crea o no y se cobra como máximo dos veces, y cada uno de los 2 clientes tiene como máximo un pago iniciado. Cada acción lleva el modelo de un estado a otro. Un programa visita todos los estados alcanzables y comprueba la regla después de cada paso. La prohibición del teorema no llega aquí: se comprueba una descripción concreta en un mundo finito, mientras que el teorema habla de cualquier programa.</b-why>
  <b-codebox title="A payment model in Quint">
    module payments {
      val ORDERS = Set(1, 2, 3)
      val CLIENTS = Set(1, 2)
      var orders: Set[int]     // created orders
      var paid: int -> int     // order → times charged
      var pending: int -> int  // customer → checked order (0 — none)
      action init = all {
        orders' = Set(), paid' = ORDERS.mapBy(o => 0), pending' = CLIENTS.mapBy(c => 0),
      }
      action createOrder(o: int): bool = all {
        not(orders.contains(o)),
        orders' = orders.union(Set(o)), paid' = paid, pending' = pending,
      }
      // step 1: the order exists and is unpaid
      action check(c: int, o: int): bool = all {
        pending.get(c) == 0, orders.contains(o), paid.get(o) == 0,
        pending' = pending.set(c, o), orders' = orders, paid' = paid,
      }
      // step 2: charge money
      action charge(c: int): bool = all {
        pending.get(c) != 0,
        paid' = paid.setBy(pending.get(c), n => n + 1),
        pending' = pending.set(c, 0), orders' = orders,
      }
      action step = {
        nondet o = ORDERS.oneOf()
        nondet c = CLIENTS.oneOf()
        any { createOrder(o), check(c, o), charge(c) }
      }
      val noPaymentWithoutOrder = ORDERS.forall(o => paid.get(o) > 0 implies orders.contains(o))
      val noDoubleCharge = ORDERS.forall(o => paid.get(o) <= 1)
    }
  </b-codebox>
  <b-codebox title="Trying every order up to 10 steps">
    quint verify payments.qnt --invariant=noDoubleCharge --max-steps=10
  </b-codebox>
  <b-why align="left">En esta descripción, la comprobación «el pedido no está pagado» y el cobro son dos pasos separados. La búsqueda encuentra una cadena de cinco pasos: se crea un pedido, el cliente 1 lo comprueba, el cliente 2 lo comprueba, ambos cobran y un pedido se cobra dos veces. La corrección es repetir la comprobación dentro del propio cobro: `paid.get(pending.get(c)) == 0`. Después, la búsqueda no encuentra ninguna violación. 10 pasos cubren todo el modelo: su cadena más larga es de 10 pasos, tras los cuales no se permite ninguna acción.</b-why>
  <b-why align="left">**Por qué bastan los números pequeños.** La mayoría de los errores en las reglas ya se ven con dos o tres objetos: dos clientes y un pedido, un pedido y una cancelación a medias. Es una observación, no una garantía: un error que necesita más objetos se escapará de una búsqueda así.</b-why>
  <b-table>

| Error | ¿Se ve con 3 pedidos y 2 clientes? |
|---|---|
| dos clientes pagan el mismo pedido en el mismo momento | sí: bastan dos clientes |
| se cobra dinero después de cancelar el pedido | sí: basta un pedido |
| la cantidad se desborda con un millón de pedidos | no: hacen falta números grandes |
| el código se salta una comprobación que sí tiene el modelo | no: el modelo no lee el código |

  </b-table>
  <b-why align="left">Así, el modelo pequeño comprueba el diseño, y el código lo sostienen otros medios: una restricción de base de datos rechaza un pago sin pedido, y las pruebas comparan el código con el modelo en ejemplos.</b-why>
  <b-why align="left">**El vínculo con los contextos delimitados.** Un modelo suele escribirse para un contexto delimitado, como «Pagos», pero el sentido de esta salida son los números pequeños: son lo que hace finita la búsqueda. Más en la nota sobre DDD de «Lo esencial».</b-why>
  <b-finding>
    <ex>La búsqueda encuentra una cadena: dos clientes pulsan «pagar» en el mismo momento, las dos comprobaciones «el pedido aún no está pagado» pasan antes de que ocurra cualquier cobro, y el dinero se cobra dos veces.</ex>
    <gen>Un modelo pequeño detecta errores de diseño antes del código, pero el código se comprueba aparte: con pruebas, restricciones de base de datos y búsqueda en el código.</gen>
    <do>Para las reglas sobre dinero, escribe un modelo pequeño en <a href="/blog/quint-models-find-races/">Quint</a> y lanza la búsqueda antes de cada versión.</do>
  </b-finding>
</b-chapter>

<b-chapter id="human" icon="help-circle" title="Salida 3. «No lo sé» → una persona: una tercera respuesta honesta">
  <b-why align="left">Aquí se abandona la propiedad 3, «siempre una respuesta». La comprobación mira cualquier cambio, pero tiene tres respuestas en lugar de dos. La tercera, «no lo sé», significa que una persona mira el cambio.</b-why>
  <b-art names="rice-theorem-explained/human" wide/>
  <b-table>

| Respuesta | Cuándo | Qué sigue |
|---|---|---|
| <b-status-dot color="accent">se cumple</b-status-dot> | los pagos pasan solo por el módulo de pagos | el cambio pasa |
| <b-status-dot color="warn">se rompe</b-status-dot> | se encuentra una escritura en la tabla de pagos que se salta el módulo | el cambio se bloquea |
| <b-status-dot color="warn">no lo sé</b-status-dot> | una consulta a la base de datos montada sobre la marcha con trozos de texto, una llamada a una biblioteca ajena | una etiqueta «necesita a una persona» |

  </b-table>
  <b-why align="left">**Por qué la tercera respuesta levanta la prohibición.** La demostración del teorema construye un programa en el que la comprobación debe decir «sí» o «no» y en el que cualquiera de las dos respuestas es errónea. Si se permite «no lo sé», la comprobación responde eso en ese programa y no hay contradicción. El único precio: la comprobación también dirá «no lo sé» en algunos cambios normales.</b-why>
  <b-why align="left">**Por qué «no lo sé» es mejor que adivinar.** Una comprobación puede equivocarse de dos maneras: dejar pasar una violación o dar una falsa alarma. «No lo sé» elige a propósito la segunda: mejor que un desarrollador mire un cambio de más que un doble cobro llegue a un cliente.</b-why>
  <b-table>

| Caso difícil | Por qué la comprobación no está segura |
|---|---|
| una consulta a la base de datos montada con trozos de texto | el nombre de la tabla aparece solo en tiempo de ejecución |
| una función llamada por un nombre guardado en una variable | el texto no muestra qué función se ejecuta |
| una llamada a una biblioteca ajena sin código fuente | no se ve qué ocurre dentro |
| código escrito y ejecutado sobre la marcha | no hay texto que comprobar hasta que se ejecuta |

  </b-table>
  <b-codebox title="How it looks in the check before merging">
    payments-rule  holds       src/billing/charge.ts
    payments-rule  broken      src/admin/refund.ts:18  write to payments bypassing the module
    payments-rule  don't know  src/reports/export.ts:42  query glued from strings → needs a person
  </b-codebox>
  <b-why align="left">**Cómo mantener «no lo sé» poco frecuente.** Cada «no lo sé» cuesta tiempo de una persona. Si hay muchos, se simplifica el código para que la comprobación vea más: las consultas a pagos se escriben enteras, sin pegar cadenas, y las llamadas al servicio de pagos se quedan en un módulo. Es la salida 1: algunos casos difíciles se convierten en preguntas sobre el texto.</b-why>
  <b-why align="left">**Una idea parecida: fail-fast.** Fail-fast detiene el programa en cuanto hay un fallo, mientras se ejecuta. «No lo sé» detiene un cambio dudoso todavía antes, antes de la fusión, y se lo pasa a una persona.</b-why>
  <b-finding>
    <ex>Un cambio monta una consulta a la base de datos con trozos de texto. La comprobación no puede saber en qué tabla escribe, responde «no lo sé» y un desarrollador mira el cambio.</ex>
    <gen>«Se cumple» y «se rompe» son exactos, y el precio es el tiempo de una persona en la tercera respuesta.</gen>
    <do>Haz de «no lo sé» un estado propio de la comprobación, con una etiqueta «necesita a una persona». Dejar pasar en silencio un cambio difícil lo convierte en un error.</do>
  </b-finding>
</b-chapter>

<b-chapter id="proof" icon="workflow" title="La demostración con un ejemplo">
  <iso-art name="term:rice-proof"></iso-art>

  La idea de la demostración es una reducción. Si se pudiera resolver una tarea, también se podría resolver otra que ya se sabe irresoluble. Entonces la primera también es irresoluble. Aquí la primera tarea es comprobar una regla de comportamiento y la segunda es el problema de la parada.

  Notación: $P$ es cualquier programa, $w$ son los datos con los que se ejecuta, $P(w)$ es la ejecución de $P$ sobre $w$. El problema de la parada es la tarea de decir, para cualesquiera $P$ y $w$, si $P(w)$ termina alguna vez.

  Toma cualquier programa $P$ con entrada $w$ y construye a partir de él un programa nuevo $Q$:

  $$Q(x) \;=\; \text{run } P(w)\text{; when it finishes, run } B(x)$$

  Aquí $x$ son los datos con los que se ejecuta $Q$. El paso $B(x)$ rompe la regla, mientras que un programa que se ejecuta para siempre no. Así, $Q$ llega a la violación solo si $P(w)$ termina alguna vez:

  $$Q \text{ breaks the rule} \iff P(w) \text{ halts}$$

  Si existiera una comprobación de la regla para todos los programas, dado $Q$ también respondería si $P(w)$ se detiene. Pero Alan Turing, en un artículo de 1936 (publicado en 1937), demostró que ningún programa responde a esa pregunta, el problema de la parada<b-proof href="https://en.wikipedia.org/wiki/Halting_problem" quote="Wikipedia: “Alan Turing proved in 1937 that the halting problem is undecidable.”"/>. Por tanto, tampoco existe una comprobación universal de la regla. La regla puede ser cualquiera: cualquier propiedad de comportamiento con respuestas distintas sirve en lugar de «dinero sin pedido».

  Los mismos pasos, en orden:

  1. Toma cualquier regla de comportamiento que algunos programas rompen y otros no. Por tanto, algún programa la rompe. La parte de ese programa que rompe la regla es el paso $B$.
  2. Toma cualquier programa $P$ y su entrada $w$ para los que la pregunta es si $P(w)$ se detiene.
  3. Pega $Q$: primero $P(w)$, luego $B$. El pegado es un procedimiento mecánico sencillo que se escribe en un minuto.
  4. Entrega $Q$ a la comprobación universal imaginada. Su respuesta «rompe» significa «$P(w)$ se detuvo», y «no rompe» significa «no se detuvo».
  5. Eso es una solución del problema de la parada, que no existe. Por tanto, la comprobación universal tampoco existe.

  Una salvedad por precisión. La construcción supone que un programa que se ejecuta para siempre sin hacer nada no rompe la regla. Si para alguna regla no es así, se toma la regla opuesta: comprobarla no es más fácil y el argumento se repite palabra por palabra.


  <b-finding>
    <ex>Un manejador de pagos funciona así: primero llama a un cálculo de descuento de una biblioteca ajena y luego cobra dinero sin comprobar que existe un pedido. Que rompa la regla depende solo de si el cálculo del descuento termina: si se cuelga para siempre, el cobro nunca se alcanza.</ex>
    <gen>Para responder con exactitud a partir del código, una comprobación tendría que decidir si ese cálculo se detiene. Es el mismo esquema: $P(w)$ es el cálculo del descuento, $B$ es el cobro sin pedido.</gen>
    <do>Cierra una regla así con un marco: una restricción de base de datos se niega a registrar un cobro sin pedido, haga lo que haga el código antes.</do>
  </b-finding>
</b-chapter>

<b-chapter id="root" icon="bulb" title="De dónde viene el truco: el problema de la parada y la paradoja del barbero">
  <b-why align="left">La demostración del teorema de Rice reduce el problema de la parada a una comprobación de comportamiento: si existiera una comprobación de comportamiento, resolvería también el problema de la parada. Así la comprobación hereda su indecidibilidad. El problema de la parada, a su vez, se demuestra con un truco de más de cien años: una pregunta sobre uno mismo.</b-why>
  <iso-art name="term:halting-problem/2"></iso-art>
  <b-why align="left">Supón que hay un juez que dice, para cualquier programa, si se detiene. Escribe un programa contrario: le pregunta al juez por sí mismo y hace lo opuesto. Si el juez dice «se detiene», el contrario entra en un bucle infinito; si dice «no se detendrá», el contrario se detiene de inmediato. El juez se equivoca en ambos casos, así que no puede existir.</b-why>
  <iso-art name="term:barber-paradox"></iso-art>
  <b-why align="left">El mismo truco está en la paradoja del barbero, una versión gráfica de la paradoja de Russell de 1901. Los aldeanos se dividen en el conjunto $A$, los que se afeitan ellos mismos, y el conjunto $B$, los que afeita el barbero, y cada uno está exactamente en uno. El barbero no tiene sitio: en $A$ acaba en $B$, en $B$ acaba en $A$. Russell tiene lo mismo con conjuntos: $R$ es el conjunto de todos los conjuntos que no se contienen a sí mismos, es decir $R = \{x : x \notin x\}$. ¿$R$ es miembro de sí mismo? Si lo es, por definición no debería serlo; si no lo es, debería serlo: $R \in R \iff R \notin R$.</b-why>
  <b-table>

| Año | Quién | Qué | Truco |
|---|---|---|---|
| 1901 | Bertrand Russell | el conjunto de todos los conjuntos que no se contienen a sí mismos | ¿es miembro de sí mismo? |
| 1936 | Alan Turing | ningún juez puede decir si cualquier programa se detiene | el contrario pregunta por sí mismo |
| 1951 | Henry Gordon Rice | ninguna comprobación de una propiedad de comportamiento con respuestas distintas | reducir la parada a la comprobación, como en la demostración de arriba |

  </b-table>
  <b-why align="left">Por qué una pregunta sobre uno mismo es tan potente. Un programa también es texto, así que se le puede dar a otro programa e incluso a sí mismo. En cuanto un verificador puede hablar de cualquier programa, también debe hablar de un programa que le pregunta por sí mismo y hace lo contrario. Entonces cualquier respuesta que dé es errónea. El mismo movimiento aparece en la paradoja del barbero, en la paradoja de Russell y en el teorema de incompletitud de Gödel (en cualquier sistema consistente de reglas dado por una lista de axiomas y capaz de describir la aritmética hay enunciados que no se pueden ni demostrar ni refutar).</b-why>
</b-chapter>

<b-chapter id="frames" icon="ring-dot" title="Qué hacer: tres marcos dentro de los cuales la respuesta es exacta">
  <iso-art name="term:rice-frames"></iso-art>
  <b-why align="left">El teorema prohíbe que una comprobación correcta combine las tres condiciones de la primera sección: una pregunta **sobre el comportamiento**, **cualquier programa**, **siempre una respuesta** «sí» o «no». La prohibición ya vale para una sola pregunta de comportamiento. La demostración se apoya en las tres: construye un programa $Q$ que la comprobación debe aceptar, le hace una pregunta de comportamiento y exige una respuesta definida. Cada camino quita una condición y la demostración deja de funcionar.</b-why>
  <b-table>

| Camino | Qué se hace en la práctica | Por qué la respuesta es exacta | Qué se pierde |
|---|---|---|---|
| <b-icon name="package"/> Mundo pequeño | se escribe un modelo de reservas en Quint: 3 habitaciones, hasta 5 reservas, acciones «reservar» y «cancelar». Un programa prueba todas las secuencias de esas acciones hasta una longitud fijada y después de cada paso comprueba la regla «las reservas de una misma habitación nunca se solapan» | hay un número finito de variantes, así que la búsqueda llega al final y dice «la regla se cumple» o muestra la cadena de pasos en la que se rompió | un error que aparece solo con 50 reservas simultáneas no lo verá una búsqueda con 5 |
| <b-icon name="list-check"/> Lenguaje estrecho | la regla se escribe como restricción de PostgreSQL, y solo el archivo `booking/repository.ts` puede escribir en la tabla de reservas. En cada cambio de código, una búsqueda comprueba que ningún otro archivo escribe en la tabla de reservas | la restricción es una línea en el esquema de la base de datos y la base de datos la comprueba en cada escritura; una búsqueda de archivos siempre termina y da una respuesta exacta, siempre que las consultas a la tabla no se construyan sobre la marcha: una regla del linter también lo prohíbe | el agente no puede escribir reservas desde donde le venga bien: hasta una importación masiva de reservas debe pasar por el mismo archivo permitido |
| <b-icon name="help-circle"/> «No lo sé» | la comprobación de un cambio devuelve una de tres respuestas: «se cumple», «se rompe», «no se puede decir». La tercera respuesta pone al cambio una etiqueta «necesita a una persona» | la comprobación no tiene que resolver los casos difíciles, como una consulta a la base de datos construida con cadenas sobre la marcha: ahí dice honestamente «no se puede decir», y donde dice «se cumple» o «se rompe» la respuesta es exacta | un desarrollador dedica tiempo a los cambios con la etiqueta «necesita a una persona» |

  </b-table>
  <b-why align="left">Cada una de las tres respuestas es exacta solo dentro de sus límites. La búsqueda demuestra que la regla se cumple en un modelo con 3 habitaciones y 5 reservas, no en la base de datos de producción con miles de reservas. La búsqueda en el código demuestra que no hay una escritura que esquive la regla, no que la propia restricción de la base de datos esté bien escrita. Una respuesta «se cumple» es exacta, pero algunos cambios siguen yendo a una persona. Por eso los caminos se usan juntos: el modelo comprueba el diseño antes del código, la restricción y la búsqueda comprueban el propio código, y una persona mira lo que queda con etiqueta.</b-why>
  <b-why align="left">Cualquier comprobación que funcione dentro de un marco comete errores de dos tipos. Conviene decidir de antemano con cuál se puede vivir.</b-why>
  <b-table>

| Error de la comprobación | Qué pasó | Cuándo es tolerable | Ejemplo de reservas |
|---|---|---|---|
| <b-status-dot color="warn">un fallo no detectado</b-status-dot> | la comprobación dijo «todo bien», pero la regla está rota | cuando una violación es fácil de notar y barata de arreglar | las pruebas comprobaron la reserva de un solo cliente, mientras dos clientes obtuvieron a la vez la habitación 2 a las 10:00 |
| <b-status-dot color="accent">una falsa alarma</b-status-dot> | la comprobación dijo «se rompe» o «no se puede decir», pero la regla se cumple | cuando un fallo no detectado es caro: dinero, accesos, datos personales | la búsqueda encontró una escritura en la tabla de reservas en un archivo de migración de datos que no rompe la regla, y el cambio quedó retenido hasta que lo miró una persona |

  </b-table>
  <b-why align="left">Para reglas sobre dinero y accesos, elige comprobaciones que den falsas alarmas pero nunca dejen pasar una violación: una restricción de base de datos, la comprobación de tipos, un único escritor por tabla. Un desarrollador quita una etiqueta de más en unos minutos, mientras que un doble cobro no detectado vuelve como queja de un cliente y un reembolso.</b-why>
  <b-why align="left">En términos de DDD (una forma de diseñar software alrededor del dominio del negocio) se ve así. Un contexto delimitado es una parte del sistema con vocabulario propio. El contexto «Reservas» habla solo de habitaciones, reservas y tiempo: no tiene palabras como «pago» o «notificación». La regla «las reservas nunca se solapan» concierne a una tabla, y un agregado, «Reserva», escribe en ella; un agregado es un grupo de datos que se cambia solo a través de sí mismo. Así, «¿puede el código romper la regla?» se reduce a una pregunta sobre el texto: ¿algo distinto del agregado escribe en esa tabla? Lo que hace comprobable la regla es la prohibición de escribir en la tabla esquivando el agregado. El vocabulario pequeño del contexto ayuda a las personas y al agente a entender el código, pero no influye en la comprobabilidad. El límite del agregado es cómodo porque la prohibición está en un solo lugar.</b-why>
  <b-finding>
    <ex>La regla «las reservas de una misma habitación nunca se solapan»: un modelo de Quint prueba todos los órdenes de comandos para 3 habitaciones, una restricción de base de datos prohíbe el solapamiento y una comprobación de texto se asegura de que solo un módulo escribe en la tabla de reservas.</ex>
    <gen>Los tres marcos suelen combinarse: el mundo pequeño detecta errores de diseño, el lenguaje estrecho fija la regla en el código y «no lo sé» muestra dónde hace falta una persona.</gen>
    <do>Para cada regla, anota qué marco la sostiene. Una regla sin marco solo se comprueba con pruebas por ejemplos.</do>
  </b-finding>
</b-chapter>

<b-chapter id="cap" icon="boxes-link" title="El vínculo con el teorema CAP: un núcleo común, razones distintas">
  <b-why align="left">El teorema CAP es una prohibición conocida de los sistemas distribuidos; el nombre se forma con las iniciales de tres propiedades, en inglés: consistency, availability, partition tolerance (consistencia, disponibilidad, tolerancia a particiones). Cuando los datos viven en varios servidores y se corta el enlace entre ellos, el sistema no puede a la vez responder a cada petición y mostrar a todos los mismos datos. Tiene que elegir: esperar a que vuelva el enlace o responder desde su propia copia, que puede estar desactualizada. Eric Brewer lo formuló en 2000; Seth Gilbert y Nancy Lynch lo demostraron en 2002.</b-why>
  <iso-art name="term:cap-theorem"></iso-art>
  <b-why align="left">**El núcleo común.** En ambas prohibiciones: mientras un suceso no ha ocurrido, no se puede saber si ocurrirá más tarde o nunca, por mucho que se espere. Un servidor no sabe si el mensaje de un vecino se perdió o solo llega tarde. Una comprobación de programa no sabe si el programa terminará en mil millones de pasos o nunca. Mientras el tiempo de espera no esté acotado, ambos tienen exactamente dos salidas, y solo se puede elegir una: esperar o responder ya.</b-why>
  <b-art names="rice-theorem-explained/cap-fork" wide/>
  <b-cap>La parte superior del esquema es una bifurcación entre dos salidas que se excluyen. La inferior es acotar el tiempo: en las comprobaciones de programas elimina la bifurcación, en una red solo elimina la incertidumbre.</b-cap>
  <b-why align="left">Cómo se ven las dos ramas de la bifurcación en una red y en una comprobación de programa:</b-why>
  <b-table>

| Salida | En una red (CAP) | En una comprobación de programa |
|---|---|---|
| <b-icon name="clock"/> esperar | el servidor espera a que vuelva el enlace; los datos son correctos, pero aún no hay respuesta y puede tardar mucho | la comprobación espera a que el programa termine, o responde «no se puede decir»; no hay error, pero puede no haber respuesta |
| <b-icon name="zap"/> responder ya | el servidor responde desde su propia copia; hay respuesta, pero puede faltar una reserva reciente del otro servidor | la comprobación responde a partir de pruebas o de una ejecución de 1000 pasos; hay respuesta, pero el programa podría romper la regla en el paso 1001 |

  </b-table>
  <b-why align="left">**Acotar el tiempo: ayuda a los programas, no a las redes.** Si un lenguaje o un modelo garantiza que todo programa termina en un número conocido de pasos, la comprobación lo ejecuta hasta el final y responde con exactitud. Así funciona el mundo pequeño de la sección anterior; el precio es un lenguaje en el que no se puede escribir un bucle infinito. En una red, un retardo acotado solo elimina la incertidumbre: si un mensaje no tarda más de 2 segundos, pasados los 2 segundos el servidor sabe seguro que el enlace está caído. Eso no trae datos más frescos y la elección sigue ahí: negarse a responder o responder desde su propia copia. La prohibición de CAP sigue en pie.</b-why>
  <b-why align="left">**Razones distintas.** Un servidor de CAP carece de información: ni siquiera un servidor infinitamente listo puede saber qué ocurre en su vecino al otro lado del enlace roto. Una comprobación de programa tiene la información, tiene delante todo el código, pero la respuesta no se puede calcular a partir de ese código. Son tipos distintos de imposibilidad, así que el teorema de Rice y CAP no son lo mismo.</b-why>
  <b-why align="left">**Qué tan estricto es esto.** Las dos mitades están establecidas: el teorema de Rice y la demostración de CAP están publicados. La coincidencia de las salidas es una observación del autor; no hay un teorema único para ambos casos. El propio Brewer advirtió más tarde de que la fórmula «dos de tres» (la idea de que de tres propiedades solo se pueden tener dos) simplifica en exceso<b-proof href="https://www.infoq.com/articles/cap-twelve-years-later-how-the-rules-have-changed/" quote="Eric Brewer: “The «2 of 3» formulation was always misleading”"/>: en realidad es una escala, y la elección surge solo durante una partición. Con las comprobaciones pasa igual: importa con qué frecuencia una comprobación dice «no lo sé» o se equivoca.</b-why>
  <b-finding>
    <ex>Una comprobación automática espera una ejecución de pruebas que se ha colgado. Esperar más es como un servidor que espera al enlace; cortar por tiempo límite y decir «pasó» es como un servidor que responde desde una copia desactualizada.</ex>
    <gen>Esperar y adivinar son las salidas comunes de ambas prohibiciones. Acotar el tiempo de antemano elimina la bifurcación en las comprobaciones de programas, mientras que en una red solo convierte «esperar para siempre» en «sé que el enlace está caído».</gen>
    <do>Ponle un límite de tiempo a cada comprobación automática y decide de antemano qué significa superarlo: «no lo sé» pasado a una persona, o «se rompe».</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Preguntas frecuentes">
  <b-faq-cards>
    <q t="¿Qué es el teorema de Rice en palabras sencillas?">Ningún programa puede decir, para todos los programas, si algo se cumple sobre su comportamiento, cuando algunos programas tienen esa propiedad y otros no. Sobre el texto del código se puede responder; sobre el comportamiento de cualquier programa, no.</q>
    <q t="¿Cómo se relaciona el teorema de Rice con el problema de la parada?">Cualquier pregunta de parada se puede convertir en una pregunta de comportamiento: se construye un programa que rompe la regla solo si otro programa termina. Así, comprobar el comportamiento no es más fácil que la parada, y ningún programa responde a la pregunta de la parada.</q>
    <q t="¿Entonces comprobar programas no tiene sentido?">Solo es imposible una comprobación para todos los programas. Dentro de un marco (un mundo pequeño, un lenguaje estrecho o una respuesta «no lo sé») sí es posible una comprobación correcta: así funcionan la búsqueda de modelos en Quint, las restricciones de base de datos y las prohibiciones estrechas de linter como «solo un archivo escribe en esta tabla».</q>
    <q t="¿Qué tiene que ver la paradoja del barbero?">El problema de la parada se demuestra con el mismo truco que la paradoja del barbero y la paradoja de Russell: una pregunta sobre uno mismo. El teorema de Rice hereda ese truco: su demostración reduce la parada a una comprobación de comportamiento.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Sigue leyendo">
  <b-links>
    <item href="/blog/agent-checkpoint/" k="Agentes" t="Dónde comprobar el trabajo de un agente de IA">el límite del agregado como punto de control</item>
    <item href="/blog/quint-vs-tests-and-tla/" k="Comprobaciones" t="Verificación de modelos frente a pruebas">Quint, QUnit y TLA+</item>
    <item href="/blog/specs-by-aggregates/" k="Specs" t="Specs por agregado">reglas en la ficha del agregado</item>
    <item href="/blog/quint-models-find-races/" k="Modelos" t="Cómo encontrar condiciones de carrera">modelos de Quint en la práctica</item>
  </b-links>
</b-chapter>
<b-footer>Datos a 6 de noviembre de 2026, de Wikipedia (teorema de Rice, problema de la parada, paradoja del barbero). El ejemplo de pagos es ilustrativo.</b-footer>
</b-post>
