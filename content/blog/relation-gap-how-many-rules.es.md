---
title: Cuántas reglas necesita un juego: dos para el jugador y una anotación para el contable, la brecha de relaciones
date: 2026-11-02
updated: 2026-11-13
description: Cómo contar con honestidad y con rapidez las reglas de un juego, y si las dos respuestas pueden diferir. Recorrido por el artículo de Bartholdi, Bridson, Mikhailov y Nicholson sobre la brecha de relaciones (arXiv 2610.23637): un juego con dos movimientos donde el jugador necesita dos reglas y el contable una anotación, con diagramas, fórmulas y cálculos.
tags: investigación, matemáticas, teoría de grupos, topología, IA en matemáticas
category: research
layout: wide
math: true
mentions: relation gap, group presentation, relation module, Cayley graph, Newman's theorem, one-relator group, Wall's D2 problem, D2 complex, homology, GAP, greatest common divisor, Gruenberg
toc: video=Vídeo | question=Pregunta | paper=Artículo y autores | rules=Dos reglas | why=Por qué este juego | player=Jugador | accountant=Contable | answer=Respuesta | friends=Amigos | coins=Monedas | main=Conclusión | formal=Formalmente | practice=Dónde aparece | when=Quién y cuándo | faq=Preguntas | next=Siguiente
---

Un juego con dos movimientos, un paso y una subida, necesita dos reglas si se cuenta con honestidad, como un jugador, y una sola anotación si se cuenta rápido, como un contable que apunta las reglas como lazos y olvida el orden de los movimientos. Así resolvieron cuatro matemáticos en octubre de 2026 la pregunta de la <a href="/materials/glossary/relation-gap/">brecha de relaciones</a>, abierta desde 1976.

<b-post series="kto">

<b-chapter id="video" icon="video" title="Vídeo: la misma historia en 7,5 minutos">
  <b-why>El artículo sigue la película escena por escena y entra en más detalle. Bajo cada diagrama hay un enlace a ese momento del vídeo.</b-why>
  <b-embed-frame src="https://www.youtube.com/embed/yPvbfDa_GCk" title="Cuántas reglas necesita un juego — el artículo arXiv 2610.23637 en palabras sencillas" ratio="16/9"/>
  <b-cap>Artículo: <a href="https://arxiv.org/abs/2610.23637" target="_blank" rel="noopener">Two-generator presentations with a relation gap</a>, arXiv 2610.23637, 16 de octubre de 2026. El juego, el paso, la subida, el jugador y el contable son imágenes para la explicación; en el artículo son un grupo, generadores, el menor número de relaciones y el menor número de generadores del módulo de relaciones. No hace falta ver la película: todo lo que aparece en ella se cuenta de nuevo a continuación.</b-cap>
</b-chapter>

<b-chapter id="question" icon="grid" title="Pregunta: cuántas reglas tiene un juego, y si hay dos formas de contarlas">
  <b-why>Los matemáticos describen rompecabezas y simetrías como juegos: hay movimientos y hay reglas. Una regla dice qué cadena de movimientos lo deja todo en su sitio.</b-why>

  Toma el cubo de Rubik. Los **movimientos** son giros de las caras. Los movimientos se combinan en cadenas: gira una cara, luego otra, luego una tercera. Todo movimiento se puede deshacer girando la cara hacia atrás. Los matemáticos llaman <a href="/materials/glossary/math-group/">grupo</a> al conjunto de todas esas cadenas, y conjunto de <a href="/materials/glossary/generators/">generadores</a> a un pequeño conjunto de movimientos con el que se construyen todos los demás. Una **regla** (los matemáticos dicen «<a href="/materials/glossary/group-relation/">relación</a>») es una cadena que no cambia nada: por ejemplo, cuatro giros seguidos de una cara devuelven el cubo adonde estaba.

  La pregunta: **cuántas reglas hacen falta para describir el juego por completo**, es decir, para que todo lo demás que se cumple en el juego se deduzca de esas reglas. Cuanto más corta la lista, más sencilla la descripción. Hay dos formas de contar.

  <b-table>
    <table><thead>
    <tr><th>Recuento</th><th>Cómo cuenta</th><th>En el artículo</th></tr>
    </thead><tbody>
    <tr><td><b>Jugador</b>: honesto</td><td>una regla es una ruta en el mapa del juego que vuelve al inicio; el orden de los movimientos importa: «derecha, arriba» y «arriba, derecha» son rutas distintas</td><td>el menor número de relaciones, $d_F(R)$</td></tr>
    <tr><td><b>Contable</b>: rápido</td><td>anota cada regla en un libro como un lazo; las anotaciones se pueden sumar en cualquier orden, el orden de los movimientos no se recuerda</td><td>el menor número de generadores del <a href="/materials/glossary/relation-module/">módulo de relaciones</a>, $d_{\mathbb{Z}G}(R^{ab})$</td></tr>
    </tbody></table>
  </b-table>

  <b-art names="relation-gap-how-many-rules/methods"/>
  <b-cap>El jugador recorre el mapa y el orden de los movimientos importa; el contable lleva la cuenta de los pasos y el orden no importa.</b-cap>

  El contable nunca necesita más anotaciones que reglas tiene el jugador: cada regla del jugador se convierte sin más en una anotación. La pregunta es la inversa: ¿puede haber **menos** anotaciones que reglas? Durante cincuenta años nadie lo supo. Esta pregunta se llama la **brecha de relaciones**: nació del trabajo de Karl Gruenberg de 1976 y entró en la lista de problemas de Wall de 1979 (problema B15). El caso de una sola anotación es especialmente interesante: ¿se deduce que el grupo tiene una sola regla? <a href="https://youtu.be/yPvbfDa_GCk?t=0" target="_blank" rel="noopener">▶ 0:00</a>
</b-chapter>

<b-chapter id="paper" icon="trophy" title="Artículo y autores: la respuesta en tres páginas">
  <b-why>Un preprint del 16 de octubre de 2026: cuatro matemáticos de Lyon y Ginebra, Oxford, San Petersburgo y Bonn.</b-why>

  <b-table>
    <table><thead>
    <tr><th>Autor</th><th>Dónde trabaja</th></tr>
    </thead><tbody>
    <tr><td>Laurent Bartholdi</td><td>Institut Camille Jordan, Lyon; Universidad de Ginebra</td></tr>
    <tr><td>Martin R. Bridson</td><td>Mathematical Institute, Universidad de Oxford</td></tr>
    <tr><td>Roman Mikhailov</td><td>Universidad Estatal de San Petersburgo</td></tr>
    <tr><td>John Nicholson</td><td>Max Planck Institute for Mathematics, Bonn</td></tr>
    </tbody></table>
  </b-table>

  El resultado en una frase: en un juego **con dos movimientos** el jugador necesita dos reglas, mientras que el contable necesita una anotación. En el artículo es el Teorema A, demostrado por completo y de forma elemental. El segundo resultado, el Corolario B, trata del <a href="/materials/glossary/wall-d2-problem/">problema D2 de Wall</a>. Se apoya en un preprint de OpenAI del 6 de octubre de 2026 y es condicional; más sobre él en el capítulo de la práctica. <a href="https://youtu.be/yPvbfDa_GCk?t=26" target="_blank" rel="noopener">▶ 0:26</a>

  El Teorema A en fórmulas (para cualesquiera $p, q \ge 2$ coprimos):

  $$G=\langle x,\,t \mid x^{pq},\ [x^{p},\ t\,x^{q}\,t^{-1}]\rangle$$

  <b-art names="relation-gap-how-many-rules/general"/>
  <b-cap>El caso general: una circunferencia de pq puntos, la media circunferencia son p pasos, el gancho son q pasos en el piso de arriba; p y q no tienen divisores comunes.</b-cap>

  Léelo así: «el juego $G$ se construye con dos movimientos $x$ y $t$ y obedece dos reglas». La primera regla: repite el movimiento $x$ $pq$ veces y todo vuelve a su sitio. La segunda regla: los movimientos $x^{p}$ y $t\,x^{q}\,t^{-1}$ se pueden intercambiar. El juego no se describe con una sola regla ($d_F(R)=2$), pero su módulo de relaciones lo genera una sola anotación ($d_{\mathbb{Z}G}(R^{ab})=1$).

  Los autores declaran abiertamente el papel de la IA, en la sección «Declaration of AI usage»: ChatGPT («6 Astra», tal como figura impreso) ayudó a descubrir los grupos del Teorema A, la demostración y un borrador inicial del manuscrito; Claude («Fable 5.1») se consultó durante la edición posterior; los argumentos y el texto fueron comprobados a fondo y revisados en gran medida por los autores, que son responsables del manuscrito final.
</b-chapter>

<b-chapter id="rules" icon="boxes-route" title="El juego: un paso, una subida y dos reglas">
  <b-why>El juego tiene una ficha y una circunferencia de seis puntos. El primer movimiento, el **paso**, mueve la ficha un punto a lo largo de la circunferencia.</b-why>

  Seis pasos y la ficha vuelve. Esa es la **primera regla**. El juego no se queda en una sola circunferencia: desde cada punto de la circunferencia, su propia **subida** lleva la ficha a su propia circunferencia un piso más arriba, y una bajada la devuelve. Las circunferencias y las subidas forman el **mapa del juego**. Los matemáticos llaman a ese mapa el <a href="/materials/glossary/cayley-graph/">grafo de Cayley</a> de un grupo, y el mismo tipo de grafo está bajo el <a href="/blog/rubik-cube-neural-network/">cubo de Rubik</a> y bajo el <a href="/blog/longest-ring-arrangement/">anillo de bolas</a>: los vértices son posiciones, las aristas son movimientos.

  <b-art names="relation-gap-how-many-rules/map"/>
  <b-cap>Abajo, la circunferencia del piso 0, los números son puntos. La flecha azul es un paso, las verdes son subidas a circunferencias del piso 1. <a href="https://youtu.be/yPvbfDa_GCk?t=48" target="_blank" rel="noopener">▶ 0:48</a> y <a href="https://youtu.be/yPvbfDa_GCk?t=61" target="_blank" rel="noopener">▶ 1:01</a></b-cap>

  El mapa tiene una **segunda regla**. Una **media circunferencia** son tres pasos seguidos. Un **gancho** consiste en subir por la subida, dar dos pasos arriba y bajar. La bajada lleva a una circunferencia distinta, no a la de la que partiste. La regla dice: una media circunferencia seguida de un gancho es lo mismo que un gancho seguido de una media circunferencia. Estos dos movimientos se pueden intercambiar.

  <b-art names="relation-gap-how-many-rules/swap"/>
  <b-cap>Dos caminos desde el inicio llegan al mismo punto. <a href="https://youtu.be/yPvbfDa_GCk?t=76" target="_blank" rel="noopener">▶ 1:16</a></b-cap>

  Los matemáticos escriben lo mismo con letras. El paso es $x$, la subida es $t$, la bajada es $t^{-1}$. Una cadena de movimientos se escribe en fila, como una palabra, y una repetición es una potencia: $x^3$ son tres pasos. Así, la media circunferencia es $x^3$ y el gancho es $t\,x^2\,t^{-1}$: subir, dos pasos, bajar. Las reglas quedan así:

  $$x^{6}=1 \qquad\text{y}\qquad [\,x^{3},\ t\,x^{2}\,t^{-1}\,]=1$$

  Aquí 1 significa «no se hizo nada». Los corchetes son el <a href="/materials/glossary/commutator/">conmutador</a>: $[u,v]=u\,v\,u^{-1}v^{-1}$. Es igual a 1 exactamente cuando los movimientos $u$ y $v$ se pueden intercambiar: haz $u$, luego $v$, luego deshaz $u$ y $v$, y estás de vuelta en el inicio.
  <b-art names="relation-gap-how-many-rules/commutator"/>
  <b-cap>El conmutador: u, v, la inversa de u, la inversa de v. Si los movimientos se pueden intercambiar, aterrizas exactamente en el inicio.</b-cap>

  Todo el juego cabe en una línea, una <a href="/materials/glossary/group-presentation/">presentación de grupo</a>:

  $$G=\langle\, x,\ t \mid x^{6},\ [x^{3},\ t\,x^{2}\,t^{-1}]\,\rangle$$

  <b-art names="relation-gap-how-many-rules/present"/>
  <b-cap>El juego en una línea: los movimientos a la izquierda de la barra, las reglas a su derecha.</b-cap>

  A la izquierda de la barra están las letras de los movimientos; a la derecha, las reglas.
</b-chapter>

<b-chapter id="why" icon="search" title="Por qué el juego es exactamente así">
  <b-why>Cada detalle hace falta para la respuesta y ninguno sobra. Tres detalles trabajan para los dos protagonistas de la respuesta: los dos primeros, para el jugador; el tercero, para el contable.</b-why>

  <b-art names="relation-gap-how-many-rules/three"/>
  <b-cap>A la izquierda, tres detalles del juego; a la derecha, quién necesita cada uno. <a href="https://youtu.be/yPvbfDa_GCk?t=98" target="_blank" rel="noopener">▶ 1:38</a></b-cap>

  **Seis pasos y la ficha está en casa.** Lo necesita el jugador. El juego tiene un movimiento que, repetido varias veces, devuelve al inicio. En matemáticas esto se llama torsión. Para el teorema de Newman (véase el capítulo sobre los amigos) es la condición clave.

  **La media circunferencia y el gancho se intercambian.** También lo necesita el jugador. Los movimientos que se pueden intercambiar se llaman **amigos**. La media circunferencia tiene dos amigos: dos pasos a lo largo de la misma circunferencia y el gancho. Entre sí no son amigos, y de ahí se sigue que una sola regla no puede describir el juego.

  **Los números tres y dos.** Los necesita el contable. La media circunferencia tiene tres pasos, el gancho tiene dos pasos arriba, y 3 y 2 no tienen divisor común. Gracias a eso dos anotaciones se pueden fundir en una.

  En el artículo el número de pasos de la media circunferencia y del gancho es cualquier pareja de números coprimos $p$ y $q$, ambos al menos dos. La película toma la pareja más pequeña: $p=3$, $q=2$. Entonces la primera regla es $x^{pq}=x^{6}=1$, y la segunda dice que $x^{p}=x^{3}$ y el gancho $t\,x^{q}\,t^{-1}=t\,x^{2}\,t^{-1}$ conmutan.
</b-chapter>

<b-chapter id="player" icon="bulb" title="El recuento del jugador: dos reglas, y no menos">
  <b-why>El jugador escribe una regla como una ruta en el mapa, y en ella el orden de los movimientos importa. El objetivo es la lista más corta de la que se deducen todas las demás reglas del juego.</b-why>

  ¿Qué significa «se deduce»? Si se cumple $x^{6}=1$, entonces también se cumple $x^{12}=1$: doce pasos son seis pasos y otros seis más. Una regla así no añade nada a la lista, y el jugador la tacha. Lo mismo vale para cualquier consecuencia: mientras una regla salga de las ya escritas, sobra. Tras tachar, en la lista quedan dos reglas: seis pasos te devuelven al inicio, y la media circunferencia se intercambia con el gancho.

  <b-art names="relation-gap-how-many-rules/player"/>
  <b-cap>De cuatro candidatas, dos reglas entran en la lista; las demás son consecuencias. <a href="https://youtu.be/yPvbfDa_GCk?t=124" target="_blank" rel="noopener">▶ 2:04</a></b-cap>

  ¿Por qué la lista no puede tener una sola regla? Si un juego tiene una regla, el teorema de Newman dice que los amigos de cualquier movimiento son amigos entre sí. Aquí los amigos de la media circunferencia, dos pasos y el gancho, no son amigos entre sí (capítulo «Amigos» más abajo), así que una regla no basta. Los matemáticos lo escriben como $d_F(R)=2$: el menor número de generadores normales del grupo de reglas es dos.
</b-chapter>

<b-chapter id="accountant" icon="bulb" title="El recuento del contable: una anotación">
  <b-why>El contable anota cada regla en un libro como un lazo: una ruta que volvió al inicio. Las anotaciones se suman en cualquier orden y se mueven por el mapa.</b-why>

  Cómo funciona una anotación. El contable recorre una ruta y lleva la cuenta: cuántas veces se pasó cada segmento del mapa hacia delante (más uno) y hacia atrás (menos uno). Un lazo alrededor de un cuadrado da más uno en cada lado. Dos rutas que rodean el mismo cuadrado con inicios distintos dejan **la misma anotación**: ni el orden ni el inicio se conservan. Por eso las anotaciones se pueden sumar en cualquier orden, como números en un libro, y se pueden mover a cualquier lugar del mapa. Los matemáticos llaman a esa anotación <a href="/materials/glossary/group-homology/">homología</a> del grafo, y a todas las anotaciones juntas, el módulo de relaciones.

  <b-art names="relation-gap-how-many-rules/loops"/>
  <b-cap>Dos lazos con inicios distintos dan una anotación: la cuenta de pasos por los segmentos. <a href="https://youtu.be/yPvbfDa_GCk?t=144" target="_blank" rel="noopener">▶ 2:24</a></b-cap>

  El contable nunca tiene más anotaciones que reglas el jugador: cada regla del jugador se anota como un lazo. ¿Y menos? Los autores construyeron una anotación ingeniosa $v$, una mezcla de las anotaciones de ambas reglas. De sus copias (desplazamientos por el mapa y sumas) sale de inmediato la anotación de la segunda regla, y la de la primera regla en tres acciones. Así, **una anotación basta para el contable**: todas las demás salen de $v$ sumando y moviendo. Los matemáticos lo escriben como $d_{\mathbb{Z}G}(R^{ab})=1$ y dicen que el módulo de relaciones es **cíclico**.

  <b-art names="relation-gap-how-many-rules/merge"/>
  <b-cap>Una anotación ingeniosa sustituye a dos. Funciona porque 3 y 2 no tienen divisor común. <a href="https://youtu.be/yPvbfDa_GCk?t=166" target="_blank" rel="noopener">▶ 2:46</a></b-cap>

  En forma general la anotación es $R^{ab}=R/[R,R]$: todas las reglas $R$ con el orden «olvidado» (cociente por los conmutadores), y los coeficientes vienen de $\mathbb{Z}G$: sumas de movimientos con coeficientes enteros del tipo «tantas veces hacia delante, tantas hacia atrás, en cada punto del mapa».
</b-chapter>

<b-chapter id="answer" icon="flag" title="Respuesta: sí, los dos recuentos pueden diferir">
  <b-why>La pregunta era: ¿puede el recuento rápido del contable dar menos reglas que el recuento honesto del jugador? Sí puede.</b-why>

  <b-art names="relation-gap-how-many-rules/counts"/>
  <b-cap>Jugador: dos reglas. Contable: una anotación. <a href="https://youtu.be/yPvbfDa_GCk?t=166" target="_blank" rel="noopener">▶ 2:46</a></b-cap>

  En el juego «paso y subida» el jugador necesita dos reglas y el contable necesita una anotación. Eso cierra una pregunta de cincuenta años. <a href="https://youtu.be/yPvbfDa_GCk?t=175" target="_blank" rel="noopener">▶ 2:55</a> Siguen dos argumentos: por qué una regla no basta para el jugador y por qué una anotación basta para el contable.
</b-chapter>

<b-chapter id="friends" icon="shield-check" title="Por qué una regla no basta para el jugador: los amigos no conmutan">
  <b-why>Un movimiento se llama amigo de otro dado si los dos se pueden intercambiar. La media circunferencia tiene dos amigos.</b-why>

  Son dos pasos a lo largo de la misma circunferencia y el gancho. Entre sí no son amigos: el orden de estos dos movimientos no se puede cambiar. En 1973 Newman demostró un teorema: si un juego tiene **una** regla y algún movimiento vuelve al inicio, como un paso tras seis repeticiones, entonces los amigos de cualquier movimiento son amigos entre sí. El artículo lo enuncia con más rigor: todo elemento distinto de la identidad de un grupo de una sola relación con torsión tiene un <a href="/materials/glossary/centralizer/">centralizador</a> cíclico (el conjunto de todos los movimientos que se intercambian con él), es decir, formado por potencias de un solo movimiento. En este juego los amigos de la media circunferencia no son amigos entre sí, así que una regla no puede describirlo.

  <b-art names="relation-gap-how-many-rules/friends"/>
  <b-cap>Los amigos de la media circunferencia conmutan con ella, pero no entre sí. <a href="https://youtu.be/yPvbfDa_GCk?t=175" target="_blank" rel="noopener">▶ 2:55</a></b-cap>

  Cómo lo comprueba el artículo: la media circunferencia se colapsa a un punto, y lo que queda del juego es el producto libre de un grupo cíclico de tres elementos y un grupo cíclico infinito, $C_3 * \mathbb{Z}$. Por la forma normal de un producto libre, $x^{2}$ y el gancho no se pueden intercambiar ahí, así que tampoco conmutan en el juego original.

  <b-art names="relation-gap-how-many-rules/free"/>
  <b-cap>La media circunferencia se colapsa a un punto: quedan un triángulo y una recta infinita. Juntos forman un árbol donde dos caminos nunca se encuentran.</b-cap>
</b-chapter>

<b-chapter id="coins" icon="shield-check" title="Por qué una anotación basta para el contable: tres y dos">
  <b-why>El máximo común divisor de tres y dos es uno, y eso permite fundir dos anotaciones en una.</b-why>

  De tres y dos se puede obtener uno: tres menos dos. Como con monedas de 3 y 2 rublos: entregas 3, te devuelven 2 de cambio y te queda 1 rublo. El <a href="/materials/glossary/gcd/">máximo común divisor</a> de 3 y 2 es uno, así que

  $$\gcd(3,2)=1=3-2$$

  Con el mismo principio los autores funden dos anotaciones en una de la que se pueden recuperar ambas. <a href="https://youtu.be/yPvbfDa_GCk?t=201" target="_blank" rel="noopener">▶ 3:21</a>

  <b-art names="relation-gap-how-many-rules/coins"/>
  <b-cap>1 = 3 − 2: por eso dos anotaciones se funden en una. <a href="https://youtu.be/yPvbfDa_GCk?t=207" target="_blank" rel="noopener">▶ 3:27</a></b-cap>

  El cálculo para $p=3$, $q=2$ es álgebra de colegio. La notación del artículo, primero con palabras:

  <b-table>
    <table><thead>
    <tr><th>Símbolo</th><th>Qué es</th></tr>
    </thead><tbody>
    <tr><td>$a=x^{3}$</td><td>la media circunferencia</td></tr>
    <tr><td>$b=t\,x^{2}\,t^{-1}$</td><td>el gancho</td></tr>
    <tr><td>$N_a=1+a$,&nbsp; $N_b=1+b+b^{2}$</td><td>sumas de potencias de la media circunferencia y del gancho: «hacer la media circunferencia cero o una vez» y «el gancho cero, una o dos veces»</td></tr>
    <tr><td>$N_x=1+x+\dots+x^{5}$</td><td>la anotación de la primera regla: dar la vuelta a toda la circunferencia, seis desplazamientos seguidos</td></tr>
    <tr><td>$u$</td><td>la anotación de la segunda regla (de la matriz de Fox, fórmula (1) del artículo)</td></tr>
    <tr><td>$v$</td><td>la anotación ingeniosa de la que salen ambas</td></tr>
    </tbody></table>
  </b-table>

  Siguen las fórmulas (3) y (4) del artículo. Propiedades de las sumas:

  $$N_aN_x=2N_x,\qquad N_a\,u=(1-b)\,N_x,\qquad N_b\,u=(a-1)\,t\,N_x$$

  <b-art names="relation-gap-how-many-rules/f1"/>
  <b-cap>Fórmulas (3): la suma «quedarse o girar media circunferencia» da a la circunferencia peso dos; aplicada a la anotación de la segunda regla da la circunferencia menos su copia desplazada.</b-cap>

  La anotación ingeniosa es una mezcla de las dos:

  $$v=N_x+(b+b^{2})\,u$$

  <b-art names="relation-gap-how-many-rules/f2"/>
  <b-cap>Fórmula (4): la anotación ingeniosa es la circunferencia más dos copias de la anotación de la segunda regla, desplazadas por el gancho.</b-cap>

  Multiplícala por $N_a$ y $N_b$:

  $$N_a\,v=(1+b)\,N_x,\qquad N_b\,v=N_bN_x+2\,(a-1)\,t\,N_x$$

  <b-art names="relation-gap-how-many-rules/f3"/>
  <b-cap>Multiplicación de la anotación ingeniosa por las sumas.</b-cap>

  Como $b^{3}=1$, al simplificar se obtiene:

  $$(1-b+b^{2})\,N_a\,v=2N_x,\qquad (N_b-b\,N_a)\,v=N_x+2\,(a-1)\,t\,N_x$$

  <b-art names="relation-gap-how-many-rules/f4"/>
  <b-cap>Tras simplificar: la circunferencia con peso dos, y la circunferencia más dos circunferencias elevadas.</b-cap>

  Multiplica la primera igualdad por $(a-1)\,t$ y réstala de la segunda. La anotación de la primera regla sale a través de $v$:

  $$N_x=\bigl(N_b-b\,N_a-(a-1)\,t\,(1-b+b^{2})\,N_a\bigr)\,v$$

  <b-art names="relation-gap-how-many-rules/f5"/>
  <b-cap>El resultado: las dos anotaciones salen de v, así que una anotación basta.</b-cap>

  La anotación de la segunda regla $u$ también se expresa mediante $v$ a partir de $v=N_x+(b+b^2)u$. Así, todo el módulo de relaciones lo genera un único elemento $v$. Estas igualdades se comprobaron a mano al preparar la película.
</b-chapter>

<b-chapter id="main" icon="flag" title="Conclusión">
  <b-why>La pregunta era: ¿puede el recuento rápido del contable dar menos reglas que el recuento honesto del jugador? Sí puede, y el ejemplo es un juego con dos movimientos.</b-why>

  <b-art names="relation-gap-how-many-rules/summary"/>
  <b-cap>El hilo del razonamiento: el juego, un jugador con dos reglas, un contable con una anotación, la brecha «dos contra uno».</b-cap>

  <b-callout icon="shield-check">**Una salvedad.** El Teorema A está demostrado por completo e independientemente de OpenAI. El Corolario B, un contraejemplo al problema D2 de Wall, se apoya en un preprint de OpenAI del 6 de octubre de 2026, y los propios autores lo llaman condicional. El artículo aún no ha sido verificado de forma independiente.</b-callout>
</b-chapter>

<b-chapter id="formal" icon="boxes-route" title="Formalmente: el mismo camino en el lenguaje del artículo">
  <b-why>La segunda parte de la película: los mismos pasos con fórmulas y el vocabulario de los matemáticos. Primero un mapa de correspondencias, luego una tabla con fórmulas, luego un esquema de la demostración.</b-why>

  <b-art names="relation-gap-how-many-rules/dict"/>
  <b-cap>A la izquierda las palabras de la película, a la derecha su notación en el artículo. <a href="https://youtu.be/yPvbfDa_GCk?t=252" target="_blank" rel="noopener">▶ 4:12</a></b-cap>

  <b-table>
    <table><thead>
    <tr><th>En la película</th><th>En el artículo</th><th>Cómo funciona</th></tr>
    </thead><tbody>
    <tr><td>el juego</td><td>el grupo $G=F/R$</td><td>$F$ es el grupo libre: todas las palabras en las letras $x$, $t$ sin reglas; $R$ es todo lo que se deduce de las reglas (clausura normal)</td></tr>
    <tr><td>paso, subida</td><td>generadores $x$, $t$</td><td>una bajada es $t^{-1}$; una cadena de movimientos se escribe como una palabra</td></tr>
    <tr><td>primera regla</td><td>$x^{pq}=1$</td><td>para $p=3$, $q=2$: $x^{6}=1$, como seis giros de $60^\circ$</td></tr>
    <tr><td>segunda regla</td><td>$[x^{p},\,t\,x^{q}\,t^{-1}]=1$</td><td>$[u,v]=u\,v\,u^{-1}v^{-1}$: derecha y luego arriba es igual a arriba y luego derecha</td></tr>
    <tr><td>el juego entero</td><td>$G=\langle x,t\mid x^{pq},\,[x^{p},\,t\,x^{q}\,t^{-1}]\rangle$</td><td>Teorema A: $p,q\ge 2$ coprimos</td></tr>
    <tr><td>el recuento del jugador</td><td>$d_F(R)$</td><td>el menor número de generadores normales de $R$; aquí 2</td></tr>
    <tr><td>el recuento del contable</td><td>$d_{\mathbb{Z}G}(R^{ab})$</td><td>el menor número de generadores del módulo de relaciones $R/[R,R]$; aquí 1</td></tr>
    <tr><td>lazo: anotación</td><td>primera homología del grafo de Cayley</td><td>el módulo de relaciones es la imagen del operador de borde $\partial_2$, dado por la matriz de Fox</td></tr>
    <tr><td>amigos</td><td>centralizador</td><td>teorema de Newman: en un grupo de una sola relación con torsión los centralizadores son cíclicos</td></tr>
    <tr><td>números 3 y 2</td><td>$p$ y $q$ coprimos</td><td>$\gcd(3,2)=1=3-2$</td></tr>
    </tbody></table>
  </b-table>

  La demostración del Teorema A ocupa página y media en el artículo. Los pasos:

  <b-steps top="14" round>
    <step t="No una regla">El grupo no es un grupo de una sola regla: la media circunferencia $a=x^{p}$ tiene orden $q$, y $x^{q}$ y el gancho $b$ la centralizan, pero no conmutan entre sí. Por tanto $d_F(R)=2$ (teorema de Newman).</step>
    <step t="Dos anotaciones">El módulo de relaciones es la imagen del operador de borde del complejo de recubrimiento. La matriz de Fox da dos anotaciones: $N_x$ y $u$.</step>
    <step t="Una anotación">Para $p=3$, $q=2$ se construye $v=N_x+(b+b^{2})\,u$, y $N_x$, $u$ se expresan mediante $v$ (cálculo de arriba). El caso general es similar, con una fórmula más engorrosa para $v$.</step>
  </b-steps>

  El grupo se puede definir en el <a href="/materials/glossary/computer-algebra-system/">sistema de álgebra computacional</a> GAP con dos líneas: <a href="https://youtu.be/yPvbfDa_GCk?t=389" target="_blank" rel="noopener">▶ 6:29</a>

  <b-codebox copy>
    F := FreeGroup("x", "t");;  x := F.1;;  t := F.2;;
    G := F / [ x^6, Comm(x^3, t*x^2*t^-1) ];;
  </b-codebox>
  <b-cap>El grupo libre en x y t dividido por dos relaciones. Después se puede trabajar con el grupo como con un objeto normal.</b-cap>
</b-chapter>

<b-chapter id="practice" icon="grid" title="Dónde aparece">
  <b-why>Los usos directos del resultado están por ahora en la propia matemática; el resto son analogías con la misma lección: una estimación rápida de la complejidad puede resultar menor que la real.</b-why>

  <b-art names="relation-gap-how-many-rules/uses"/>
  <b-cap>Directo: sistemas de álgebra computacional; condicional: topología; por analogía: el cubo, los datos, las especificaciones.</b-cap>

  <b-table>
    <table><thead>
    <tr><th>Vínculo</th><th>Dónde y qué significa</th></tr>
    </thead><tbody>
    <tr><td><b-tag kind="ok">directo</b-tag></td><td><a href="/materials/glossary/computer-algebra-system/">sistemas de álgebra computacional</a> (GAP, Magma): los grupos se dan mediante movimientos y reglas, y ahora se sabe que una anotación puede bastar donde hay dos relaciones</td></tr>
    <tr><td><b-tag kind="ok">directo, condicional</b-tag></td><td>topología: los mismos grupos dan la forma del <a href="/materials/glossary/wall-d2-problem/">problema D2 de Wall</a>: un complejo de seis celdas (un punto, dos aristas, dos celdas planas y una celda sólida); si se confirma el resultado de OpenAI, esta forma no se reduce a una bidimensional</td></tr>
    <tr><td><b-tag kind="plain">analogía</b-tag></td><td>cubo de Rubik y rompecabezas: movimientos y reglas, donde también se cuenta «cuántas reglas hacen falta» (<a href="/blog/rubik-cube-neural-network/">artículo sobre el cubo</a>)</td></tr>
    <tr><td><b-tag kind="plain">analogía</b-tag></td><td>análisis de datos: un recuento lineal rápido de los «agujeros» en la forma de los datos puede subestimar la complejidad</td></tr>
    <tr><td><b-tag kind="plain">analogía</b-tag></td><td>especificaciones de software: el conjunto más corto de reglas y una estimación rápida del número de reglas pueden diferir</td></tr>
    </tbody></table>
  </b-table>
  <b-callout icon="bulb">**Lección.** Una estimación lineal rápida de la complejidad puede quedarse corta. Ahora está demostrado con un ejemplo de dos movimientos. <a href="https://youtu.be/yPvbfDa_GCk?t=401" target="_blank" rel="noopener">▶ 6:41</a></b-callout>
</b-chapter>

<b-chapter id="when" icon="shield-check" title="Quién y cuándo, qué está demostrado">
  <b-steps top="14" round>
    <step t="1965">Wall plantea la pregunta sobre los complejos D2 (<a href="/materials/glossary/wall-d2-problem/">el problema D2</a>)</step>
    <step t="1973">Newman: un teorema sobre centralizadores en grupos de una sola relación</step>
    <step t="1976">Gruenberg: la pregunta de la brecha de relaciones</step>
    <step t="1979">Problema B15 en la lista de Wall</step>
    <step t="6.10.2026">Preprint de OpenAI sobre un contraejemplo al problema D2 de Wall</step>
    <step t="16.10.2026" hl>El artículo: cuatro autores, Teorema A demostrado por completo</step>
  </b-steps>

  Teorema A: para $p,q\ge 2$ coprimos el grupo $\langle x,t\mid x^{pq},\,[x^{p},\,t\,x^{q}\,t^{-1}]\rangle$ no es un grupo de una sola relación, pero su módulo de relaciones es cíclico; por tanto $d_F(R)=2$ y $d_{\mathbb{Z}G}(R^{ab})=1$. El Corolario B se apoya en el resultado de OpenAI, y los propios autores lo llaman condicional. El ejemplo es mínimo: seis celdas, las menos que puede tener un contraejemplo al problema de Wall. <a href="https://youtu.be/yPvbfDa_GCk?t=420" target="_blank" rel="noopener">▶ 7:00</a>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Preguntas frecuentes">
  <b-faq-cards>
    <q t="¿Qué es la brecha de relaciones?">La situación en que el menor número de relaciones de un grupo es mayor que el menor número de generadores de su módulo de relaciones. La pregunta de si esto ocurre se planteó en 1976; el artículo de 2026 muestra que sí.</q>
    <q t="¿Qué es un módulo de relaciones?">Todas las consecuencias de las relaciones de un grupo, escritas de modo que el orden de escritura no importe: lazos en el mapa del juego que se pueden sumar y mover. En el artículo es $R/[R,R]$ con el grupo actuando por conjugación.</q>
    <q t="¿En qué se diferencia el jugador del contable?">El jugador cuenta las reglas con honestidad, como rutas en el mapa donde el orden de los movimientos importa. El contable cuenta anotaciones donde el orden de los movimientos no se recuerda. El jugador obtiene dos, el contable una.</q>
    <q t="¿Qué son los amigos de un movimiento?">Los movimientos que se pueden intercambiar con el dado. En el artículo es el centralizador de un elemento. El teorema de Newman dice que, con una regla y un movimiento que vuelve al inicio, los amigos conmutan entre sí.</q>
    <q t="¿Está resuelto el problema D2 de Wall?">De forma condicional. El artículo construye un complejo D2 de seis celdas, pero la conclusión se apoya en un preprint de OpenAI del 6 de octubre de 2026, y los autores llaman condicional al Corolario B. El Teorema A, sobre la brecha de relaciones, no depende de ese preprint.</q>
    <q t="¿Qué papel desempeñó la IA?">Según los autores, ChatGPT ayudó a encontrar los grupos y la demostración y produjo un primer borrador, y Claude se consultó durante la edición. Los autores comprobaron y revisaron por sí mismos los argumentos y el texto y son responsables del resultado.</q>
    <q t="¿Puedo comprobarlo yo mismo?">Sí: el grupo del Teorema A se define en GAP con dos líneas (código arriba), y el cálculo para $p=3$, $q=2$ es álgebra de colegio, dada en el capítulo sobre tres y dos.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Para seguir leyendo">
  <b-links cols="2">
    <item href="https://arxiv.org/abs/2610.23637" k="Artículo" t="arXiv 2610.23637" ext>Two-generator presentations with a relation gap</item>
    <item href="https://youtu.be/yPvbfDa_GCk" k="Vídeo" t="Recorrido en YouTube" ext>La misma historia en 7,5 minutos, con el mapa del juego y las fórmulas</item>
    <item href="/blog/longest-ring-arrangement/" k="El mismo grafo de Cayley" t="Anillo de bolas">Un mapa de movimientos y la disposición más enredada</item>
    <item href="/blog/rubik-cube-neural-network/" k="El mismo grafo de Cayley" t="Cubo de Rubik">Movimientos y reglas donde la fuerza bruta es imposible</item>
  </b-links>
</b-chapter>
<b-footer>Los hechos proceden del artículo de L. Bartholdi, M. R. Bridson, R. Mikhailov y J. Nicholson, arXiv 2610.23637 (Teorema A, Corolario B, fórmulas (1)–(4), la sección «Declaration of AI usage»). El cálculo para p = 3, q = 2 se recalculó a mano al preparar la película; el artículo aún no ha sido verificado de forma independiente.</b-footer>
</b-post>
