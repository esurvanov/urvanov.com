Contexto

reserva

Agregado

Reservation

Invariante

MUST

Comprobación

prueba

## Por qué se acumulan las specs

Reservation

Room

TimeSlot

Member

Funcionalidad 13

[booking::Reservation]

prueba

Los números son ilustrativos. Cómo organiza OpenSpec las specs y los cambios: carpetas specs/ y changes/, los cambios terminados van a un archivo.

Doce funcionalidades produjeron doce specs, y la reserva se describe en siete de ellas, cada vez un poco distinta. En el diccionario las mismas funcionalidades añadieron líneas a cuatro entradas de agregados.

Cuando una spec está atada a un cambio o a una funcionalidad, cada tarea añade archivos, y un concepto se dispersa por varios lugares. Cuando la unidad es un agregado, el número de entradas lo limita el propio dominio, y una funcionalidad solo añade requisitos a una entrada.

Haz una lista de los conceptos que aparecen en tres o más specs y dale a cada uno una única entrada de diccionario. Haz que las specs de funcionalidad enlacen a la entrada en lugar de volver a contarla.

## Niveles de requisitos de RFC 2119

obligatorio

prohibido

por defecto, desviarse con una razón

permitido

MUST = SHALL

Las palabras y los significados siguen la RFC 2119. Cada palabra corresponde a su propio tipo de comprobación.

En la entrada de la reserva, «los intervalos no se solapan» es un MUST que se comprueba con una prueba, y «la confirmación va por el mismo canal» es un SHOULD que se mira en la revisión.

La palabra del requisito dice de inmediato cómo comprobarlo y qué hacer si se infringe. El agente lee MUST como un límite y SHOULD como un valor por defecto, y no los confunde.

Reescribe los requisitos de tu spec con estas cuatro palabras y pon junto a cada MUST la prueba que lo comprueba.

## La ficha del agregado

## [booking::Reservation]
Class: aggregate
Description: A meeting room booked for an interval.

Invariants:
- MUST: active bookings of a room never overlap
- MUST: held → confirmed → closed, forward only
- MUST: held unconfirmed for 15 min → closed
- SHOULD: confirm in the channel it was made in

Commands: HoldRoom, ConfirmReservation,
CancelReservation

Access:
CanHoldRoom: [booking::Role::Member]
CanCancelReservation: Member (own), Admin

Depends on: [[booking::Room]], [[booking::TimeSlot]]

Spec: [[room-booking]]

El ejemplo es inventado. Los términos siguen a Martin Fowler: DDD Aggregate.

Toda la reserva es una sola ficha: una dirección, cuatro requisitos, tres comandos, permisos, enlaces y la funcionalidad de la que viene.

Un agregado es un límite dentro del cual los requisitos se cumplen siempre, y solo puede cambiar mediante sus propios comandos. Por eso la ficha guarda las reglas junto a las únicas formas de romperlas.

Dale a cada agregado una ficha de seis campos. Si un requisito no se puede asignar a ningún agregado, lo más probable es que el agregado aún no tenga nombre.

## Bounded contexts

Reservation, Room, TimeSlot

Invoice, Tariff

Pass, Level

Planta

Autorización

un término = una entrada

enlazar como [[ctx::Name]]

la misma palabra → entradas separadas

el diccionario cambia con la spec

El enfoque es Bounded Context y Ubiquitous Language.

La factura y el pase se refieren a una reserva por id y no saben nada de su interior. «Level» significa una planta en reservas y una autorización en acceso, y son dos entradas separadas.

Un contexto es un área donde cada palabra tiene un solo significado. Cuando una palabra aparece en dos contextos, se crean dos términos con etiquetas distintas; de lo contrario el agente traslada una regla de uno al otro.

Reparte tus agregados en contextos y encuentra las palabras que aparecen en dos de ellos. Da a cada una de esas palabras entradas separadas y etiquetas distintas en la interfaz.

## Preguntas frecuentes

¿Por qué se multiplican las specs?

Si una spec está atada a una funcionalidad, los archivos crecen con cada tarea y un concepto se dispersa por varios lugares.

¿Qué es una spec por agregado?

Una entrada por concepto del dominio, como una reserva. Una funcionalidad solo le añade requisitos.

¿Por qué los niveles MUST y SHOULD?

La palabra dice cómo comprobar el requisito: un MUST se comprueba con una prueba, un SHOULD en la revisión. El agente lee MUST como un límite estricto.

¿Qué pasa si una palabra significa cosas distintas en dos contextos?

Crea dos términos con etiquetas distintas, o el agente trasladará una regla de un contexto al otro.

## Siguiente lectura

como en Kubernetes: estado deseado, comprobaciones y el entorno del agente

Ciclo de errores

cómo los errores del agente se convierten en reglas

Contexto

qué sabe el agente del proyecto y dónde vive

Entorno

dónde trabaja el agente y qué ve

Comprobaciones

el agregado como punto de control

Specs

Cómo instalar y usar OpenSpec

specs y cambios en archivos junto al código

El ejemplo de la reserva es inventado. Los términos y enfoques siguen las fuentes enlazadas bajo los diagramas.
