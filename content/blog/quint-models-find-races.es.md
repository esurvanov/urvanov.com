---
title: Cómo encontrar una condición de carrera en el código: un modelo de Quint prueba todos los órdenes de acciones
date: 2026-10-25
updated: 2026-11-08
description: Una condición de carrera se encuentra revisando todos los órdenes en que pueden ejecutarse dos operaciones; un modelo de Quint los recorre solo y muestra la cadena de pasos donde se rompe una regla. Ejemplos y límites.
tags: IA, specs, Quint, verificación formal, pruebas, harness, condición de carrera, verificación de modelos, data races
category: specs
layout: wide
mentions: Quint, Apalache, TLA+, model checking, formal verification, race condition, lost data, Claude Code, hooks, spec-driven development
toc: idea=La idea | found=Qué encontraron los modelos | pair=La pareja | domains=Un modelo por dominio | teeth=Comprobar las comprobaciones | human=Dónde entra una persona | weak=Puntos débiles | start=Por dónde empezar | agent=Con un agente | faq=FAQ | next=Seguir leyendo
---

Una condición de carrera se encuentra comprobando todos los órdenes en que pueden ejecutarse dos operaciones. Las pruebas cubren solo los órdenes que imaginas, mientras que un modelo de Quint los prueba todos por sí mismo e imprime la cadena de pasos donde se rompe una regla, por ejemplo un fallo a mitad de una escritura o dos administradores a la vez, también en código escrito por un agente de IA.

<b-post series="harness">
<b-art names="quint-models-find-races/intro" wide/>
<b-cap>Una prueba sigue el escenario que imaginaste; un modelo recorre todos los escenarios de un mundo pequeño.</b-cap>

<b-chapter id="idea" icon="workflow" title="Cómo funciona un modelo de Quint: todos los escenarios en lugar de adivinar">
  <b-why align="left">El nombre [Quint](/materials/glossary/quint/) se confunde fácilmente con el motor de pruebas QUnit, pero es otro programa: [una comparación con las pruebas y TLA+](/blog/quint-vs-tests-and-tla/). En qué se diferencia Quint de [TLA+](/materials/glossary/tla-plus/) y Alloy se explica en la [comparación de los tres lenguajes](/blog/tla-alloy-quint-compare/). Una prueba corriente es un escenario pensado de antemano: clic, espera, comprobación del resultado. Un error en el que nunca pensaste no está en ese escenario. Un modelo funciona de otro modo. Describes los estados del sistema y las acciones permitidas, y el programa prueba todos los órdenes de acciones en un mundo pequeño y muestra el primero en que se rompe una regla.</b-why>
  <b-art names="quint-models-find-races/explore" wide/>
  <b-why align="left">Un modelo describe un área de la lógica, como la vida de una grabación de reunión o los derechos de acceso de un miembro, y ocupa de unas decenas a unos cientos de líneas. A continuación, algunas historias: qué encontró exactamente el modelo y por qué no lo hizo una prueba.</b-why>
  <b-why align="left">Así funciona, paso a paso. Primero eliges un mundo pequeño: digamos, un administrador, un bot y una sesión. Después describes lo que puede pasar en ese mundo: iniciar sesión, cerrar sesión, un fallo del proceso, un mensaje nuevo. El programa prueba todos los órdenes de esos eventos y comprueba las reglas tras cada paso. Este tipo de búsqueda se llama [verificación de modelos](/materials/glossary/model-checking/). Si una regla se rompe, obtienes la cadena exacta de pasos, que puedes repetir a mano.</b-why>
  <b-why align="left">El mundo es pequeño a propósito. El número de órdenes crece rápido con el tamaño del mundo, así que dos o tres entidades y cinco o seis acciones suelen dar un resultado en segundos. Eso basta para las carreras: para que dos acciones se solapen bastan dos participantes.</b-why>
  <b-finding>
    <ex>Una prueba comprueba el escenario que imaginaste; un modelo comprueba todos los escenarios posibles en el mundo pequeño que elegiste.</ex>
    <gen>Los errores del tipo «dos acciones se solaparon en el tiempo» rara vez se le ocurren a nadie de antemano<b-proof href="https://quint-lang.org/" quote="Quint: an executable specification language, a modern TLA+ alternative for software engineers"/>.</gen>
    <do>Elige una regla que temas perder y escríbela en diez líneas.</do>
  </b-finding>
</b-chapter>

<b-chapter id="found" icon="bug" title="Qué errores encuentra un modelo de Quint: ejemplos">
  <b-why align="left">El mayor valor de un modelo son los hallazgos que nadie buscaba. Abajo están los dos más reveladores y una lista de los demás. Comparten una forma, la [condición de carrera](/materials/glossary/race-condition/): dos acciones, cada una correcta por sí sola, provocan juntas una pérdida o una confusión.</b-why>
  <b-sublabel>Historia 1: una carrera entre iniciar y cerrar sesión</b-sublabel>
  <b-why align="left">Repasemos la primera historia con detalle. Supongamos que una persona tiene una sesión de Telegram en el sistema, y un administrador puede terminarla. En ese mismo momento un bot puede usar esa sesión para enviar un mensaje. El código primero comprobó que la sesión estaba viva y luego se puso a enviar. Entre la comprobación y el envío el administrador alcanzó a cerrar la sesión. El resultado: el mensaje salió en nombre de una persona cuyo acceso ya estaba cerrado.</b-why>
  <b-why align="left">Ninguna prueba lo detectó, porque cada paso por separado funciona bien. El error vive solo en el orden «comprobar, cerrar sesión, enviar», y el modelo encontró ese orden por sí mismo.</b-why>
  <b-art names="quint-models-find-races/race" wide/>
  <b-cap>Un administrador cierra sesión mientras un bot entra con la sesión antigua. El código comprobó los derechos una sola vez, al principio, y después se fio del resultado.</b-cap>
  <b-sublabel top="22">Historia 2: una grabación y un fallo</b-sublabel>
  <b-why align="left">La segunda historia trata de la pérdida de datos. Un sistema de transcripción graba una reunión y en algún momento debe marcar que hay una grabación en curso. Si el proceso falla entre el inicio de la grabación y esa marca, tras reiniciar el sistema no sabe que la grabación existió. El archivo está, la entrada en la base de datos no. El usuario ve un hueco vacío donde debería estar la reunión.</b-why>
  <b-why align="left">El remedio es sencillo: poner la marca antes de que empiece la grabación, no después. Pero para notar el problema hay que imaginar un fallo justo en ese hueco, y el modelo lo hace sin esfuerzo, porque un fallo es una de sus acciones corrientes.</b-why>
  <b-art names="quint-models-find-races/crash" wide/>
  <b-cap>Había una grabación en curso, el proceso falló y no quedó en ningún sitio la marca «grabación en curso». Tras reiniciar, el sistema cree que no hubo grabación y los datos se pierden sin dejar rastro.</b-cap>
  <b-sublabel top="22">Otros hallazgos</b-sublabel>
  <b-rules cols="2">
    <rule icon="copy" t="Un elemento en dos tarjetas">Se reanudó una grabación, el análisis nombró a otro responsable</rule>
    <rule icon="check-square" t="Un ☑ perdido">Un elemento perdió a su responsable y desapareció junto con «hecho»</rule>
    <rule icon="close-alt" t="Borrar un elemento no vacío">El diálogo «borrar etiqueta vacía» quedó abierto, un bot añadió un miembro</rule>
    <rule icon="key" t="Claves más amplias que los derechos">Se redujeron los derechos de una persona, sus claves siguen funcionando como antes</rule>
    <rule icon="user-alt" t="Un mensaje a un desconocido">Un nombre de usuario pasó a otra persona</rule>
    <rule icon="chat-square" t="Una cita ajena">Un mensaje se movió a otra vacante, la pista conservó la cita antigua</rule>
  </b-rules>
  <b-why align="left">Cómo leer la lista anterior. Cada fila tiene la clase de error a la izquierda y un ejemplo a la derecha. «Un elemento en dos tarjetas» y «un ☑ perdido» pertenecen a las tareas de reuniones, «borrar un elemento no vacío» y «claves más amplias que los derechos» al lado del administrador, «un mensaje a un desconocido» y «una cita ajena» a la mensajería.</b-why>
  <b-why align="left">Los seis comparten un rasgo: los datos pertenecían a un propietario y luego acabaron con otro o desaparecieron. Por eso comprobar al propietario en el momento de la acción, no de antemano, cierra casi toda la lista.</b-why>
  <b-finding>
    <ex>Casi todos los hallazgos pertenecen a una sola clase: dos acciones se solaparon y el código comprobó la condición una sola vez.</ex>
    <gen>El remedio también es uno: volver a comprobar la condición en el momento de la acción en el servidor, o poner las acciones bajo un mismo bloqueo.</gen>
    <do>Busca en tu código un lugar donde la comprobación y la acción estén separadas por la espera de una respuesta.</do>
  </b-finding>
</b-chapter>

<b-chapter id="pair" icon="swap" title="Una pareja de modelos: tal como es y tal como se requiere">
  <b-why align="left">Para cada área se guardan en un archivo dos versiones del modelo. La primera copia el código tal como está ahora y debe reproducir un error conocido. La segunda describe el requisito: la regla nunca se rompe. Un interruptor al principio del archivo activa las correcciones, de modo que la diferencia entre versiones se ve de inmediato.</b-why>
  <b-art names="quint-models-find-races/pair" wide/>
  <b-cap>A la izquierda, el camino hasta la sala roja, la infracción, está abierto. A la derecha hay una barrera en ese camino y la regla se cumple.</b-cap>
  <b-vs-grid>
    <h></h>
    <h>current: el código tal como es</h>
    <h>fixed: el requisito</h>
    <c>**Propósito**</c>
    <c>reproduce el error con un escenario</c>
    <c>muestra que la corrección cierra el error</c>
    <c>**La regla**</c>
    <c>se infringe</c>
    <c>se cumple</c>
    <c>**Correcciones**</c>
    <c>ninguna</c>
    <c>cada una lleva etiqueta y la marca «era: …»</c>
  </b-vs-grid>
  <b-why align="left">La tabla tiene tres filas. La primera dice para qué sirve cada modelo: el de la izquierda reproduce el error encontrado, el de la derecha muestra que el requisito se puede cumplir. La segunda fila muestra el resultado esperado de la comprobación: a la izquierda la regla se infringe, a la derecha se cumple. Si a la izquierda de pronto no se infringe, el modelo ha dejado de reflejar el código, y eso es una señal para actualizarlo.</b-why>
  <b-why align="left">La tercera fila trata de las correcciones. Cada diferencia del modelo de la derecha respecto al de la izquierda lleva una etiqueta como П1, П2 (la letra П corresponde a la palabra rusa para «corrección») y una nota «era: …». Estas etiquetas permiten ir del requisito a un lugar concreto del código y ver exactamente qué cambiar.</b-why>
  <b-finding>
    <ex>Un archivo contiene ambas variantes: un interruptor activa las correcciones, así que la comparación de antes y después siempre está a mano.</ex>
    <gen>Cada error se convierte en un escenario breve de regresión que falla con la versión antigua y pasa con la nueva.</gen>
    <do>Empieza una tabla de requisitos con una columna «encaja en un modelo» y marca las tres primeras filas.</do>
  </b-finding>
</b-chapter>

<b-chapter id="domains" icon="boxes-link" title="Un modelo para cada dominio">
  <b-why align="left">Cada [bounded context](/materials/glossary/bounded-context/) tiene sus propias reglas, escritas como MUST en una [ficha de agregado](/blog/specs-by-aggregates/). Un modelo formal hace comprobables esas reglas, y un [agente por contexto](/blog/agents-per-bounded-context/) trabaja dentro de sus límites.</b-why>
  <b-art names="quint-models-find-races/contexts" wide/>
  <b-rules cols="2">
    <rule icon="users" t="Reunión">Los participantes de una grabación nunca pasan a la siguiente con el mismo enlace</rule>
    <rule icon="lock" t="Datos privados">Una grabación privada nunca llega al almacenamiento compartido</rule>
    <rule icon="user-alt" t="Miembro">Un ID de Telegram, un registro, el historial nunca se pierde</rule>
    <rule icon="target" t="Vacante">El estado de una vacante pertenece solo al candidato de su emparejamiento</rule>
  </b-rules>
  <b-why align="left">Qué hay detrás de cada ejemplo. «Reunión» es la regla de que las personas de la grabación anterior no pasan a la siguiente, aunque el enlace de la reunión sea el mismo. «Datos privados» significa que una grabación privada no puede acabar en el almacenamiento compartido con ningún orden de acciones. «Miembro» significa que una cuenta de Telegram corresponde a un registro de miembro y el historial sobrevive a una fusión. «Vacante» significa que el estado de una vacante pertenece a una pareja concreta de candidato y vacante, no al candidato en general.</b-why>
  <b-finding>
    <ex>Una regla MUST de una ficha de agregado se convierte en una propiedad del modelo, y una infracción vuelve al agente de ese contexto como una cadena de pasos.</ex>
    <gen>El límite de un contexto sirve a tres cosas a la vez: la spec, el agente y el modelo.</gen>
    <do>Elige un contexto y una regla MUST y escribe para ella el primer modelo.</do>
  </b-finding>
</b-chapter>

<b-chapter id="teeth" icon="shield-check" title="Comprobar las comprobaciones">
  <b-why align="left">Un resultado verde puede significar «todo correcto» o «la comprobación no comprobó nada». Por eso las propias comprobaciones se comprueban: el autor o un agente rompe el modelo a propósito (por ejemplo, quita una condición) para ver si la regla lo nota. Si no lo nota, la regla no sirve.</b-why>
  <b-sublabel>Ejemplo: proporción de reglas que infringe el código actual de un sistema de grabación de reuniones</b-sublabel>
  <b-count-bars>
    <bar k="Participantes" w="100%" color="c-none">2 de 2</bar>
    <bar k="Fichas de personas" w="75%" color="c-none">3 de 4</bar>
    <bar k="Entrega de errores" w="67%" color="c-none">2 de 3</bar>
    <bar k="Objetivo de la reunión" w="57%" color="c-light">4 de 7</bar>
    <bar k="Grabación" w="50%" color="c-light">2 de 4</bar>
    <bar k="Privacidad" w="25%" color="c-work">1 de 4</bar>
  </b-count-bars>
  <b-why align="left">Las barras muestran qué proporción de reglas infringe el código actual. Cuanto más larga la barra, más reglas atrapó el modelo en código real. «Participantes 2 de 2» significa que las dos comprobaciones encontraron un problema. «Privacidad 1 de 4» significa que el código en general aguanta, pero existe un agujero.</b-why>
  <b-why align="left">Esto no es una nota de calidad del código. Una barra depende de qué reglas se eligieron, y muestra más donde el modelo aportó más beneficio.</b-why>
  <b-art names="quint-models-find-races/mutant" wide/>
  <b-cap>Una copia rota del modelo debe hacer saltar la regla. Si pasa sin que nada salte, la regla no comprueba nada.</b-cap>
  <b-sublabel top="22">Una comprobación automática tras cada edición del modelo</b-sublabel>
  <b-art names="quint-models-find-races/hook" wide/>
  <b-cap>Tras cada edición del modelo se ejecuta una comprobación automática. Si se infringe una regla, el agente recibe la cadena de pasos y corrige el modelo o el código al instante.</b-cap>
  <b-rules cols="2">
    <rule icon="file-check" t="Una cabecera como contrato">Qué reglas, qué debe fallar, qué situaciones deben darse</rule>
    <rule icon="flask" t="Una copia rota">Una regla que el código ya cumple debe fallar en una copia con un defecto</rule>
    <rule icon="eye" t="Situaciones que deben darse">«Si A entonces B» no significa nada hasta que ocurre A</rule>
    <rule icon="ban" t="Callejones sin salida">El programa descarta en silencio las ejecuciones sin salida e imprime «ok»</rule>
    <rule icon="eye-wide" t="La intención, aparte">Lo que quería el usuario se registra con independencia del campo bajo prueba</rule>
    <rule icon="refresh-cw" t="Comprobación automática">Una infracción vuelve al agente justo después de la edición</rule>
  </b-rules>
  <b-why align="left">Qué significa cada fila. «Una cabecera como contrato» significa que el principio del archivo enumera las reglas, las infracciones esperadas y las situaciones que deben darse. «Una copia rota» comprueba que una regla es capaz de saltar siquiera. «Situaciones que deben darse» protege de las reglas «si A entonces B» en las que A nunca ocurrió. Los «callejones sin salida» son casos en que el programa descarta una ejecución en silencio y el «ok» sale solo.</b-why>
  <b-why align="left">Las dos últimas filas se refieren a personas y agentes. «La intención, aparte» significa que el deseo de la persona se registra en el modelo con independencia del campo bajo prueba, pues de lo contrario la regla compara un campo consigo mismo. «Comprobación automática» (en la práctica, un [hook](/materials/glossary/hooks/)) significa que un agente no puede olvidarse de ejecutar el modelo: se ejecuta solo tras cada edición.</b-why>
  <b-finding>
    <ex>Un modelo verde sin estas comprobaciones no prueba nada: una regla puede cumplirse porque la situación necesaria nunca se da.</ex>
    <gen>Por defecto, el programa responde «ok» para una muestra, no para una demostración<b-proof href="https://apalache-mc.org/" quote="Apalache: the symbolic model checker for TLA+"/>.</gen>
    <do>Para cada regla que sale verde de inmediato, escribe un defecto que la rompa.</do>
  </b-finding>
</b-chapter>

<b-chapter id="human" icon="users" title="Dónde entra una persona">
  <b-why align="left">Un modelo comprueba lo que se puede escribir como una lista finita de condiciones: si una grabación desapareció, si se mezclaron participantes, si hay salida de un callejón sin salida. Las etiquetas claras, la comodidad y la sensación general de una pantalla no se pueden describir así, por lo que las juzga una persona sobre una maqueta.</b-why>
  <b-art names="quint-models-find-races/boundary" wide/>
  <b-two-lists>
    <list icon="cpu" t="El modelo comprueba" items="si una grabación desapareció|si se mezclaron participantes|si una acción peligrosa pide confirmación|si hay salida de un callejón sin salida"></list>
    <list icon="user" t="Una persona comprueba" items="si las etiquetas son claras|si el panel está sobrecargado|si elegir es cómodo|si la extensión se instala en un perfil limpio"></list>
  </b-two-lists>
  <b-why align="left">La lista de la izquierda contiene todo lo que se puede formular como «siempre» o «nunca»: una grabación no desaparece, los participantes no se mezclan, una acción peligrosa pide confirmación. El modelo comprueba esas reglas por completo.</b-why>
  <b-why align="left">La lista de la derecha contiene cosas sin una lista finita de rasgos. Si una etiqueta es clara lo decide quien la lee. Por eso en la tabla de requisitos las filas «necesita comprobación humana» se marcan de antemano y no se intenta formalizarlas.</b-why>
  <b-finding>
    <ex>Las reglas de pantalla también se vuelven comprobables: la confirmación, un motivo en un botón desactivado, un estado honesto.</ex>
    <gen>El gusto y la claridad no tienen una lista finita de rasgos, por lo que se comprueban sobre una maqueta.</gen>
    <do>Marca de antemano las filas «necesita comprobación humana» en la tabla de requisitos, para no perseguir una fórmula.</do>
  </b-finding>
</b-chapter>

<b-chapter id="weak" icon="alert" title="Puntos débiles de la verificación de modelos">
  <b-why align="left">El método tiene límites, y conviene conocerlos antes de empezar. Un modelo no sigue el código por sí mismo, no comprueba «eventualmente» y solo ve el mundo que le pusiste.</b-why>
  <b-rules cols="2">
    <rule icon="link" t="Sin vínculo con el código">Los modelos se escriben a mano, así que se alejan del código</rule>
    <rule icon="clock" t="Sin comprobaciones de «eventualmente»">Que un error llegue por fin al equipo solo se comprueba de forma indirecta</rule>
    <rule icon="scales" t="Un mundo diminuto">Un error que necesita cinco entidades puede escaparse</rule>
    <rule icon="circle-dot" t="Verdes vacíos">Una regla se cumple porque la función aún no está en el código</rule>
  </b-rules>
  <b-why align="left">Sin vínculo con el código: un modelo se escribe a mano, y nada lo obliga a cambiar con el código. Un mes después puede describir lo que ya no existe. El remedio: guardar en la cabecera el commit del que se tomó el modelo y actualizarlo con el código. Un remedio más fuerte es pasar las trazas del modelo por el manejador real, pero ese paso aún no existe. Una tarea relacionada, mantener de acuerdo el estado deseado, el código y la medición, se trata en el artículo sobre el [ciclo de reconciliación para specs](/blog/spec-reconcile-loop/).</b-why>
  <b-why align="left">Sin comprobaciones de «eventualmente»: que un error llegue por fin al equipo solo se comprueba de forma indirecta. Un mundo diminuto: un error que necesita cinco entidades a la vez puede escaparse. Verdes vacíos: una regla se cumple solo porque la función necesaria aún no está en el código, y el color verde engaña.</b-why>
  <b-finding>
    <ex>Un modelo describe solo lo que le pusiste, y sin comprobación contra el código se queda atrás.</ex>
    <gen>El siguiente paso en esta área es pasar las trazas del modelo por el manejador real y comparar resultados.</gen>
    <do>Anota en la cabecera de un modelo el commit del que se tomó y actualízalo junto con el código.</do>
  </b-finding>
</b-chapter>

<b-chapter id="start" icon="flag" title="Por dónde empezar con Quint: un primer modelo en una tarde">
  <b-why align="left">Un orden para tu primera tarde. Abre la lista de errores corregidos y elige uno cuya causa sea el orden o el momento de los eventos. Anota los participantes y las acciones que llevaron a él. Descríbelos en un modelo, ejecútalo y espera a que el programa encuentre la cadena por sí mismo. Después añade la corrección bajo un interruptor y comprueba que la regla se cumple. Por último, rompe el modelo a propósito y comprueba que la regla lo nota.</b-why>
  <b-why align="left">No hace falta modelar todo el producto de una vez. Toma un error reciente que hubo que corregir dos veces o que encontró un usuario. Describe en un modelo sus participantes y dos o tres acciones, ejecuta la búsqueda y comprueba que el programa encuentra ese error sin pistas. Después corrígelo y comprueba que la regla se cumple.</b-why>
  <b-finding>
    <ex>El primer modelo se puede escribir en una tarde si tomas un error que ya ocurrió.</ex>
    <gen>El historial de errores corregidos da una lista lista de reglas para los siguientes modelos.</gen>
    <do>Toma tu último error corregido y enuncia la regla que habría evitado que volviera.</do>
  </b-finding>
</b-chapter>

<b-chapter id="agent" icon="cpu" title="Cómo empezar junto con un agente">
  <b-art names="quint-models-find-races/agent" wide/>
  <b-why align="left">**1. Instalar Quint.** El agente lo instala solo mediante npm<b-proof href="https://github.com/informalsystems/quint" quote="The quickest way to install Quint is using npm."/>.</b-why>
  <b-prompt>
    Instala Quint para ti y comprueba que se ejecuta.
  </b-prompt>
  <b-why align="left">**2. Primero los requisitos, no el código.** Así el [agente](/materials/glossary/ai-agent/) describe primero el mundo y edita el código después.</b-why>
  <b-prompt>
    No cambies el código. Haz requisitos en Quint para [área].
    Para cada regla muestra dos versiones: tal como es ahora y tal como debe ser.
  </b-prompt>
  <b-why align="left">**3. Comprobar el resultado.**</b-why>
  <b-rules cols="2">
    <rule icon="swap" t="Dos versiones">La regla se rompe «tal como es» y se cumple «tal como se requiere»</rule>
    <rule icon="eye" t="Situaciones necesarias">Se dan y no se evitan</rule>
    <rule icon="flask" t="Una copia rota">Hace saltar la regla</rule>
    <rule icon="bug" t="Un caso real">El modelo lo reproduce</rule>
  </b-rules>
  <b-why align="left">**4. La lógica y la pantalla, por separado.** Por defecto un agente las mezcla: escribe reglas de pantalla como lógica y se salta casos en la lógica.</b-why>
  <b-prompt>
    Haz dos listas de requisitos.
    1. Lógica: solo «siempre» y «nunca», comprobada por un modelo de Quint.
    2. Pantalla: claridad y comodidad, que comprobaré yo mismo sobre una maqueta.
  </b-prompt>
</b-chapter>

<b-chapter id="faq" icon="chat" title="FAQ">
  <b-faq-cards>
    <q t="¿Qué es Quint y para qué sirve?">Quint es un lenguaje para describir los estados de un sistema, sus acciones y las reglas que deben cumplirse siempre. Un programa prueba todos los órdenes de acciones y muestra la cadena de pasos donde se rompe una regla.</q>
    <q t="¿Cómo se encuentran condiciones de carrera y pérdidas de datos que las pruebas no detectan?">Describe los participantes y dos o tres acciones en un modelo y ejecuta la búsqueda. El modelo encuentra órdenes como «comprobar, cerrar sesión, enviar» que a nadie se le ocurrió escribir como prueba.</q>
    <q t="¿Un modelo de Quint sustituye a las pruebas normales?">No, responden a preguntas distintas. Una prueba protege una función, mientras que un modelo comprueba reglas que dependen del orden de los eventos; una cadena de pasos encontrada por el modelo se convierte en una prueba de regresión breve.</q>
    <q t="¿Cómo se empieza con Quint?">Toma un error corregido hace poco cuya causa esté en el orden o el momento de los eventos. Describe sus participantes y dos o tres acciones, ejecuta la búsqueda y comprueba que el programa encuentra el error por sí solo.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Seguir leyendo">
  <b-links>
    <item href="/blog/quint-vs-tests-and-tla/" k="Comparación" t="Verificación de modelos frente a pruebas: Quint, QUnit, TLA+">En qué se diferencia Quint de QUnit, Jest y TLA+ y qué elegir</item>
    <item href="/blog/agents-per-bounded-context/" k="Agentes" t="Cuántos agentes de IA se necesitan">Un agente por bounded context</item>
    <item href="/blog/spec-reconcile-loop/" k="Specs" t="Un ciclo de reconciliación para specs">Cerrar el ciclo entre estado deseado, código y medición</item>
    <item href="/blog/specs-by-aggregates/" k="Specs" t="Specs por agregados">Una entrada por concepto, requisitos con MUST y SHOULD</item>
  <item href="/blog/tla-alloy-quint-compare/" k="Comparación" t="TLA+, Alloy o Quint">Qué lenguaje de especificación elegir</item>
  </b-links>
</b-chapter>
<b-footer>Datos: los casos descritos a 25 de octubre de 2026, documentación de Quint y Apalache. Las cifras de los ejemplos son ilustrativas; tu código será distinto.</b-footer>
</b-post>
