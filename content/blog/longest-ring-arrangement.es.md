---
title: Qué disposición de bolas en un anillo tarda más en desenredarse: probablemente el «espejo» — fuerza bruta, IA y la conjetura del número de pares
date: 2026-10-22
updated: 2026-11-08
description: Cuántos movimientos necesita la disposición más enredada de bolas en un anillo con giro e intercambio, y qué es el diámetro de un grafo de Cayley. Cómo la fuerza bruta, una red neuronal con beam search, una competición de Kaggle y las demostraciones convergieron en n(n−1)/2: el artículo CayleyPy RL (arXiv 2502.18663) explicado con diagramas.
tags: IA, investigación, redes neuronales, matemáticas, grafos de Cayley, búsqueda de caminos
category: research
layout: wide
mentions: Cayley graph, Cayley graph diameter, God's number, symmetric group, permutations, LRX, OEIS A186783, n(n−1)/2 conjecture, CayleyPy, beam search, Bellman equation, GAP, Kaggle, TopSpin puzzle, Hungarian Rings
toc: video=Vídeo | question=Pregunta | paper=Artículo y autores | tower=Torre | mirror=Espejo | pairs=Pares | gap=Veinte bolas | compass=Brújula | front=Frente | hint=Pista | contest=Competición | triples=Tríos | fork=Horquilla | main=Conclusión | formal=Formalmente | practice=Dónde ayuda | when=Quién y cuándo | faq=Preguntas | next=Más
---

La disposición que más tarda en desenredarse es, muy probablemente, el «espejo» (el anillo reflejado a través de la ventana de intercambio), y necesita tantos movimientos como pares de bolas hay: n(n−1)/2. La fuerza bruta hasta 15 bolas, una red neuronal con beam search hasta 100 y una competición abierta hasta 200 bolas coinciden, y las demostraciones encierran la respuesta en una horquilla estrecha.

<b-post series="kto">

<b-chapter id="video" icon="video" title="Vídeo: la misma historia en 11 minutos">
  <b-why>El artículo sigue el vídeo escena por escena, con más detalle. Cada diagrama enlaza con su momento en el vídeo.</b-why>
  <b-embed-frame src="https://www.youtube.com/embed/ecc2GvvZGvM" title="Which arrangement of balls takes longest to untangle — arXiv 2502.18663 explained simply (in Russian)" ratio="16/9"/>
  <b-cap>Artículo: <a href="https://arxiv.org/abs/2502.18663" target="_blank" rel="noopener">CayleyPy RL: Pathfinding and Reinforcement Learning on Cayley Graphs</a>, arXiv 2502.18663, 25 de febrero de 2025; Advances in Theoretical and Mathematical Physics, 2026. El anillo, los pisos, el techo, la brújula y el frente son imágenes para explicar; en el artículo son un grafo de Cayley, la distancia, el diámetro, una red neuronal y beam search. El vídeo está en ruso.</b-cap>
</b-chapter>

<b-chapter id="question" icon="grid" title="Pregunta: un anillo, tres movimientos y la disposición más enredada">
  <b-why>Toma un anillo de bolas, cada una con un número. Por mucho que las mezcles, siempre puedes volver a ponerlas en orden. La pregunta es qué disposición tarda más en desenredarse y cuántos movimientos necesita.</b-why>

  Tres palabras serán importantes. Un **movimiento** es girar el anillo a la izquierda, girarlo a la derecha, o intercambiar las dos bolas de la **ventana** de arriba. Una **disposición** es cómo están colocadas las bolas alrededor del anillo. No hay otros movimientos: no se puede sacar una bola del medio, todo pasa por la ventana.

  <b-art names="longest-ring-arrangement/moves"/>
  <b-cap>Izquierda: bolas en orden; centro: tras un giro a la izquierda; derecha: tras un intercambio en la ventana. <a href="https://youtu.be/ecc2GvvZGvM?t=8" target="_blank" rel="noopener">▶ 0:08</a></b-cap>

  ¿Por qué es difícil? Desenredar cualquier disposición es fácil: llevar la bola necesaria a la ventana e intercambiar hasta que todo esté en su sitio. Pero así se gastan muchos movimientos. Para saber el mínimo hay que comparar todos los caminos, y un anillo tiene 1·2·3·…·n disposiciones, un número que supera cualquier potencia.

  Un problema emparentado (el mismo anillo, girando solo en un sentido más el intercambio) lo planteó el cibernético Viktor Glushkov en 1968. Sigue abierto.
</b-chapter>

<b-chapter id="paper" icon="trophy" title="El artículo, sus autores y la competición">
  <b-why>La pregunta la estudian 34 autores del proyecto CayleyPy, el mismo equipo que enseñó a una red neuronal a <a href="/blog/rubik-cube-neural-network/">resolver cubos de Rubik de 4×4×4 y 5×5×5</a>.</b-why>

  «CayleyPy RL» es el segundo artículo de la serie: el primero mostró el método en cubos, este lo extiende a grafos de Cayley generales y lo prueba en el anillo de bolas. En él se encuentran cuatro vías para responder a una misma pregunta: la fuerza bruta en anillos pequeños, un programa entrenado para los grandes, una competición abierta de programación y demostraciones rigurosas.

  <b-art names="longest-ring-arrangement/authors"/>
  <b-cap>34 autores en el orden del artículo, con los nombres tal como se imprimen en él.</b-cap>

  Kaggle es una plataforma donde los investigadores publican problemas y equipos de todo el mundo compiten con sus soluciones. Los autores abrieron allí tres retos sobre este anillo y publicaron su código para que cualquiera pueda ejecutarlo e intentar superarlo.
</b-chapter>

<b-chapter id="tower" icon="boxes-route" title="La torre de disposiciones: pisos y techo">
  <b-why>Dibujemos todas las disposiciones a la vez. Cinco bolas tienen 120.</b-why>

  Coloca cada disposición en un **piso**: a cuántos movimientos está del orden por el camino más corto. El orden está abajo, tres vecinos en el primer piso (uno por movimiento), y luego los pisos se ensanchan y vuelven a estrecharse. El piso más alto es el **techo**: ese número de movimientos basta para cualquier disposición. Con cinco bolas el techo es el piso 10, y allí hay exactamente una disposición.

  <b-art names="longest-ring-arrangement/tower"/>
  <b-cap>El ancho de la barra es el número de disposiciones del piso; calculado por fuerza bruta. <a href="https://youtu.be/ecc2GvvZGvM?t=73" target="_blank" rel="noopener">▶ 1:13</a></b-cap>

  El techo es lo mismo que el <a href="/blog/rubik-cube-neural-network/">número de Dios del cubo de Rubik</a>: el mayor número de movimientos que puede necesitar la solución más corta. En matemáticas es el diámetro del grafo. Si se conociera el piso de cada disposición, desenredar sería fácil: bastaría bajar siempre un piso.
  <b-steps top="14" round>
    <step t="Piso">Cuántos movimientos hay de la disposición al orden por el camino más corto</step>
    <step t="Techo">El piso más alto: movimientos suficientes para cualquier disposición; número de Dios, diámetro del grafo</step>
    <step t="Pregunta">Quién ocupa el techo y a qué altura está para cualquier número de bolas</step>
  </b-steps>
</b-chapter>

<b-chapter id="mirror" icon="search" title="Quién ocupa el techo: el espejo">
  <b-why>Los autores hicieron una búsqueda por fuerza bruta sobre todas las disposiciones de anillos de hasta 15 bolas. Con 15 son más de un billón de disposiciones y varios días en un clúster.</b-why>

  Cada vez hay exactamente una disposición en lo más alto: el **espejo**, el anillo reflejado a través de la ventana. Las dos bolas de la ventana se intercambian, y las demás se intercambian por parejas a través del eje. Sorprendentemente, poner simplemente las bolas en orden inverso queda dos pisos más abajo.

  <b-art names="longest-ring-arrangement/mirror"/>
  <b-cap>Izquierda: orden; centro: el espejo (línea discontinua: el eje que pasa por la ventana); derecha: invertido. <a href="https://youtu.be/ecc2GvvZGvM?t=112" target="_blank" rel="noopener">▶ 1:52</a></b-cap>
  <b-art names="longest-ring-arrangement/count"/>
  <b-cap>La longitud de la barra es el número de dígitos de la cantidad de disposiciones. <a href="https://youtu.be/ecc2GvvZGvM?t=118" target="_blank" rel="noopener">▶ 1:58</a></b-cap>
</b-chapter>

<b-chapter id="pairs" icon="bulb" title="El techo es igual al número de pares">
  <b-why>Cinco bolas forman pares a lo largo de diez líneas, y el techo para cinco bolas también es 10. Seis bolas: 15 pares y un techo de 15.</b-why>

  <b-art names="longest-ring-arrangement/pairs"/>
  <b-cap>Cada línea es un par de bolas. <a href="https://youtu.be/ecc2GvvZGvM?t=150" target="_blank" rel="noopener">▶ 2:30</a></b-cap>

  Coincide en todos los anillos que cubrió la fuerza bruta, a partir de cuatro bolas; tres bolas tienen un techo de 2 pero 3 pares. De ahí la conjetura de la Enciclopedia en línea de secuencias de enteros (OEIS A186783): el techo siempre es igual al número de pares, n(n−1)/2.

  <b-table>
    <table><thead>
    <tr><th>Bolas</th><th class="bk-table-r">Pares</th><th class="bk-table-r">Techo por fuerza bruta</th></tr>
    </thead><tbody>
    <tr><td>4</td><td class="bk-table-r">6</td><td class="bk-table-r">6</td></tr>
    <tr><td>5</td><td class="bk-table-r">10</td><td class="bk-table-r">10</td></tr>
    <tr><td>6</td><td class="bk-table-r">15</td><td class="bk-table-r">15</td></tr>
    <tr><td>10</td><td class="bk-table-r">45</td><td class="bk-table-r">45</td></tr>
    <tr><td>15</td><td class="bk-table-r">105</td><td class="bk-table-r">105</td></tr>
    </tbody></table>
  </b-table>
  <b-finding>
    <ex>La fuerza bruta hasta 15 bolas dio tanto la respuesta «espejo» como la fórmula «número de pares».</ex>
    <gen>Resolver por completo los casos pequeños es una forma barata de obtener una conjetura que luego se comprueba mucho más allá de su alcance.</gen>
    <do>Antes de construir un método ingenioso, calcula los casos pequeños de frente y busca el patrón.</do>
  </b-finding>
</b-chapter>

<b-chapter id="gap" icon="flag-alt" title="Veinte bolas: la fuerza bruta no llega">
  <b-why>Veinte bolas ya tienen 2,4·10¹⁸ disposiciones: miles de millones de millones. Por eso la conjetura se comprueba de otra manera: tomar el espejo y buscar un camino más corto para desenredarlo.</b-why>

  Si el camino nunca es más corto que el número de pares, la conjetura se sostiene. Primero, el programa clásico de álgebra computacional para grupos (GAP). Siempre encuentra algún camino pero no le importa su longitud: en un anillo de 20 bolas trabaja 41 minutos y devuelve 217 944 movimientos. Solo hay 190 pares.

  <b-art names="longest-ring-arrangement/gap"/>
  <b-cap>Arriba: el número de pares; abajo: el camino del programa clásico. <a href="https://youtu.be/ecc2GvvZGvM?t=180" target="_blank" rel="noopener">▶ 3:00</a></b-cap>
</b-chapter>

<b-chapter id="compass" icon="search" title="La brújula del vídeo anterior">
  <b-why>Los autores reutilizan el truco del <a href="/blog/rubik-cube-neural-network/">cubo de Rubik</a>: una brújula entrenada con paseos aleatorios.</b-why>

  Primero, los **paseos**: desde el orden, se hacen movimientos al azar y tras cada uno se anota la disposición y cuántos movimientos se llevan. No hace falta un mapa de todas las disposiciones, y los paseos cuestan casi nada. Una **brújula** aprende de esos registros: una red neuronal que mira una disposición y adivina su piso.

  <b-art names="longest-ring-arrangement/net"/>
  <b-cap>La brújula es una red neuronal corriente: entra una disposición, sale un número.</b-cap>

  La brújula adivina con error: un paseo da vueltas, así que tiene más movimientos que el camino más corto. Pero cuanto más lejos llegó un paseo, más alto es el piso en promedio, así que la brújula señala en el buen sentido: donde el número es menor, el orden está más cerca.

  <b-art names="longest-ring-arrangement/walk"/>
  <b-cap>El paseo del vídeo: gris, el paso del paseo; azul, el piso real. <a href="https://youtu.be/ecc2GvvZGvM?t=222" target="_blank" rel="noopener">▶ 3:42</a></b-cap>
  <b-io justify>
    <item k="Entrada">Una disposición: la lista de números de bolas alrededor del anillo</item>
    <item k="Brújula">Una red neuronal simple (a menudo basta una capa de 128 neuronas) o gradient boosting</item>
    <item k="Salida">Una estimación: cuántos movimientos faltan para el orden</item>
  </b-io>
</b-chapter>

<b-chapter id="front" icon="flag-alt" title="El frente: muchas disposiciones a la vez">
  <b-why>Los errores de la brújula llevan un único camino a un callejón sin salida. Por eso la búsqueda avanza como un frente: beam search en el artículo.</b-why>

  Un frente son varias disposiciones a la vez. En cada paso se prueban los tres movimientos desde cada una, la brújula puntúa a los nuevos vecinos y solo los más prometedores pasan al paso siguiente. Si la brújula se equivoca con una disposición, hay otras en el frente y el camino no se rompe.

  Con 20 bolas esto encuentra un camino de exactamente 190 movimientos, en 3 minutos y 48 segundos en lugar de 41 minutos. Hasta 28 bolas el camino es igual al número de pares; hasta 44 se encuentra pero es más largo.

  <b-art names="longest-ring-arrangement/front"/>
  <b-cap>La altura de la barra es el camino encontrado dividido por el número de pares; la línea es exactamente el número de pares. Tablas 2–3 del artículo. <a href="https://youtu.be/ecc2GvvZGvM?t=258" target="_blank" rel="noopener">▶ 4:18</a></b-cap>
  <b-numchain>
    <step>probar tres movimientos desde cada disposición del frente</step>
    <step>descartar duplicados, la brújula los puntúa</step>
    <step>quedarse con las mejores y repetir</step>
  </b-numchain>
</b-chapter>

<b-chapter id="hint" icon="bulb" title="Una pista de una línea">
  <b-why>Los autores añadieron una línea a la búsqueda: no intercambiar las bolas de la ventana si ya están en orden.</b-why>

  La idea es simple: intercambiar un par que ya está ordenado casi nunca compensa, mientras que la opción extra infla el frente. Esa línea llevó el límite de 40 bolas a 100. Para 100 bolas se encuentra un camino en 9 horas, aunque sigue siendo más de tres veces más largo que el número de pares: 16 632 movimientos frente a 4950 pares. Y la pista está hecha a medida de este anillo: para otros problemas aún hay que encontrarla.

  <b-art names="longest-ring-arrangement/hint"/>
  <b-cap>Izquierda: la ventana donde está prohibido intercambiar; derecha: cuántas bolas se pueden desenredar. <a href="https://youtu.be/ecc2GvvZGvM?t=294" target="_blank" rel="noopener">▶ 4:54</a></b-cap>
  <b-finding>
    <ex>Una regla tomada de la estructura del problema hizo crecer los anillos resolubles de 40 a 100 bolas.</ex>
    <gen>El conocimiento del problema, en forma de prohibición de pasos claramente inútiles, funciona mejor que ajustar el modelo.</gen>
    <do>Busca movimientos que nunca te acercan al objetivo y táchalos de la búsqueda.</do>
  </b-finding>
</b-chapter>

<b-chapter id="contest" icon="trophy" title="Una competición abierta">
  <b-why>Los autores invitaron a todos a desenredar el espejo: una competición abierta de programación en Kaggle, con anillos de 2 a 200 bolas.</b-why>

  Los participantes llegaron a caminos de exactamente el número de pares. Nadie encontró uno más corto, ni con programa ni a mano.

  <b-art names="longest-ring-arrangement/contest"/>
  <b-cap>Anillos de 2 a 200 bolas; una marca significa un camino de exactamente el número de pares. <a href="https://youtu.be/ecc2GvvZGvM?t=327" target="_blank" rel="noopener">▶ 5:27</a></b-cap>
</b-chapter>

<b-chapter id="triples" icon="shield-check" title="Por qué no puede ser más corto: los tríos">
  <b-why>Toma tres bolas cualesquiera. Alrededor del anillo van en sentido horario o antihorario.</b-why>

  Girar el anillo no invierte un trío: todas las bolas se mueven juntas y se conserva el orden alrededor. Solo un intercambio en la ventana puede invertirlo, y solo cuando dos de sus bolas están en la ventana. Y el espejo invierte todos los tríos a la vez. De aquí los autores demostraron que el espejo necesita casi tantos movimientos como pares: como máximo, la mitad del número de bolas más uno de movimientos menos.

  <b-art names="longest-ring-arrangement/triples"/>
  <b-cap>El trío 1, 2, 4: izquierda, tal cual; centro, tras un giro; derecha, tras un intercambio. <a href="https://youtu.be/ecc2GvvZGvM?t=351" target="_blank" rel="noopener">▶ 5:51</a></b-cap>
</b-chapter>

<b-chapter id="fork" icon="shield-check" title="La horquilla: cotas demostradas">
  <b-why>Por arriba, el techo está acotado por el método de desenredo de los autores: cualquier disposición se desenreda en como máximo el número de pares más tres movimientos por bola.</b-why>

  Eso da una horquilla. Para 20 bolas el techo está entre 179 y 250, mientras que la conjetura dice 190. Cuantas más bolas, más estrecha es la horquilla respecto al propio techo: para 100 bolas abarca unos pocos por ciento del número de pares.

  <b-art names="longest-ring-arrangement/fork"/>
  <b-cap>La barra son las cotas demostradas, la línea es la conjetura. <a href="https://youtu.be/ecc2GvvZGvM?t=389" target="_blank" rel="noopener">▶ 6:29</a></b-cap>
</b-chapter>

<b-chapter id="main" icon="flag" title="Conclusión">
  <b-why>La pregunta era: ¿qué disposición tarda más en desenredarse y cuántos movimientos necesita? Muy probablemente el espejo, con tantos movimientos como pares de bolas.</b-why>

  <b-step-chain>
    <node t="Fuerza bruta">hasta 15 bolas: espejo y pares</node>
    <node t="Brújula y frente">exacto hasta 28, 100 con la pista</node>
    <node t="Competición">hasta 200 bolas, nada más corto</node>
    <node t="Demostración">una horquilla alrededor del número de pares</node>
  </b-step-chain>

  Tras el artículo, uno de sus autores, Grigorii Antiufeev, publicó una demostración de que el espejo no se puede desenredar más rápido que el número de pares (<a href="https://arxiv.org/abs/2601.08715" target="_blank" rel="noopener">arXiv 2601.08715</a>, un preprint de 2026). Queda abierto un punto: si alguna disposición está aún más lejos.
  <b-callout icon="shield-check">**Advertencia.** «Techo = número de pares» es una conjetura: solo están demostradas las cotas. La cota inferior de exactamente el número de pares es un preprint que aún no ha pasado revisión por pares.</b-callout>
</b-chapter>

<b-chapter id="formal" icon="boxes-route" title="Formalmente: el mismo camino en el lenguaje del artículo">
  <b-why>La segunda parte del vídeo: los mismos pasos como fórmulas.</b-why>

  <b-table>
    <table><thead>
    <tr><th>En el vídeo</th><th>En el artículo</th><th>Cómo funciona</th></tr>
    </thead><tbody>
    <tr><td>anillo con todas las disposiciones</td><td>grafo de Cayley LRX del grupo simétrico Sₙ</td><td>los vértices son permutaciones, las aristas son movimientos</td></tr>
    <tr><td>movimientos</td><td>generadores L, R, X</td><td>L — desplazamiento a la izquierda, R = L⁻¹, X = (0, 1) — intercambio de las dos primeras posiciones</td></tr>
    <tr><td>techo</td><td>diámetro del grafo</td><td>conjetura: n(n−1)/2 para n ≥ 4</td></tr>
    <tr><td>espejo</td><td>elemento más largo ℓₙ</td><td>(1 0 n−1 … 3 2) = R² · (orden inverso)</td></tr>
    <tr><td>brújula</td><td>red sobre distancia de difusión + Q-learning</td><td>primero aprende de paseos, luego se contrasta con la ecuación de Bellman d(s) = 1 + min d(t) sobre los vecinos t</td></tr>
    <tr><td>frente</td><td>beam search</td><td>anchura de hasta 2²⁰; la pista es el truco de X</td></tr>
    <tr><td>horquilla</td><td>proposiciones 4.2 y 4.3</td><td>n(n−1)/2 − n/2 − 1 ≤ diámetro ≤ n(n−1)/2 + 3n</td></tr>
    </tbody></table>
  </b-table>

  La novedad del artículo es cómo se entrena la brújula. Los paseos dan una primera estimación, y después la brújula se contrasta con sus vecinos: un movimiento más hasta el orden que desde el vecino más cercano. Como el camino a casa: si tu vecino está a cinco minutos, tú estás como mucho a seis. En un anillo de 28 bolas esto redujo el camino típico de 650 movimientos a 402, con 378 pares.

  <b-codebox copy>
    def beam_search(start, model, W, steps=1000):
        front = [start]
        for _ in range(steps):
            nbrs = {m(s) for s in front for m in (L, R, X)
                    if not (m is X and s[0] < s[1])}   # the hint
            if SORTED in nbrs: return True
            front = sorted(nbrs, key=model)[:W]   # W best by the compass
        return False
  </b-codebox>
  <b-cap>Un esbozo de beam search con la pista; el código completo está en Kaggle. <a href="https://youtu.be/ecc2GvvZGvM?t=586" target="_blank" rel="noopener">▶ 9:46</a></b-cap>
</b-chapter>

<b-chapter id="practice" icon="grid" title="Dónde ayuda">
  <b-why>A la brújula y al frente les da igual que sea un anillo: solo necesitan estados, movimientos y un objetivo. Así que el mismo enfoque sirve para cualquier tarea de ir de un estado a otro por el camino más corto.</b-why>
  <b-table>
    <table><thead>
    <tr><th>Vínculo</th><th>Dónde</th></tr>
    </thead><tbody>
    <tr><td><b-tag kind="ok">directo</b-tag></td><td>los rompecabezas TopSpin (Oval Track) y Hungarian Rings funcionan casi igual</td></tr>
    <tr><td><b-tag kind="ok">directo</b-tag></td><td>redes de procesadores: el diámetro del grafo de enlaces es el mayor retardo de un mensaje</td></tr>
    <tr><td><b-tag kind="ok">directo</b-tag></td><td>caminos más cortos en enormes grafos de permutaciones donde la fuerza bruta es imposible</td></tr>
    <tr><td><b-tag kind="plain">analogía</b-tag></td><td>planificación: ir de un estado a otro en pasos pequeños</td></tr>
    </tbody></table>
  </b-table>
  <b-callout icon="bulb">**Lección.** La fuerza bruta da una conjetura, un programa entrenado la comprueba mucho más allá de la fuerza bruta, y una demostración encierra la respuesta en una horquilla.</b-callout>
</b-chapter>

<b-chapter id="when" icon="shield-check" title="Quién y cuándo, qué está demostrado">
  <b-steps top="14" round>
    <step t="1968">Viktor Glushkov: el problema del anillo con dos movimientos</step>
    <step t="2011">La secuencia de tres movimientos entró en la OEIS (A186783)</step>
    <step t="2020">Se registra la conjetura: techo = n(n−1)/2</step>
    <step t="2025" hl>El artículo CayleyPy RL: 34 autores, IA, fuerza bruta, una competición y cotas</step>
    <step t="2026">Publicación en revista; preprint de Antiufeev: una cota inferior de exactamente el número de pares</step>
  </b-steps>

  Demostrado: n(n−1)/2 − n/2 − 1 ≤ diámetro ≤ n(n−1)/2 + 3n; la igualdad y la unicidad del espejo son conjeturas. El artículo tiene pequeñas incoherencias: el resumen de arXiv escribe la cota inferior sin el «− 1», y la sección 3.3 remite a la tabla 8 en lugar de a la tabla 6.
</b-chapter>

<b-chapter id="faq" icon="chat" title="Preguntas frecuentes">
  <b-faq-cards>
    <q t="¿Qué es un grafo de Cayley?">Un mapa de todos los estados de un rompecabezas o un grupo: cada estado es un punto, cada movimiento permitido es una línea hacia un estado vecino. Para el anillo de bolas son todas las disposiciones y los tres movimientos entre ellas.</q>
    <q t="¿Qué son el diámetro de un grafo y el número de Dios?">El mayor número de movimientos que puede necesitar el camino más corto entre dos estados. Para el cubo de Rubik se llama número de Dios: 20 movimientos si un medio giro cuenta como un movimiento.</q>
    <q t="¿Cuál es el diámetro del anillo con giro e intercambio?">Según la conjetura, n(n−1)/2, el número de pares de bolas, a partir de cuatro bolas. La fuerza bruta lo confirma hasta 15 bolas; está demostrado que queda entre n(n−1)/2 − n/2 − 1 y n(n−1)/2 + 3n.</q>
    <q t="¿Está demostrada la conjetura?">No del todo. En 2026 uno de los autores publicó una demostración de la cota inferior de exactamente el número de pares, pero es un preprint; la cota superior sigue 3 movimientos por bola más arriba.</q>
    <q t="¿Cómo encuentra una red neuronal un camino en un grafo enorme?">Una red brújula aprende de paseos aleatorios a adivinar la distancia al objetivo, y el beam search conserva a la vez muchos de los mejores estados según su estimación, para que un error no lleve a un callejón sin salida.</q>
    <q t="¿Puedo probarlo yo mismo?">Sí: el código de los autores es abierto y se ejecuta gratis en Kaggle, y la biblioteca CayleyPy está en GitHub (enlaces abajo).</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Más">
  <b-links cols="2">
    <item href="https://arxiv.org/abs/2502.18663" k="Artículo" t="arXiv 2502.18663" ext>CayleyPy RL: Pathfinding and Reinforcement Learning on Cayley Graphs</item>
    <item href="https://github.com/cayleypy/cayleypy" k="Código" t="CayleyPy en GitHub" ext>Una biblioteca para búsqueda de caminos en grafos de permutaciones</item>
    <item href="/blog/rubik-cube-neural-network/" k="Recorrido anterior" t="Cubo de Rubik">El mismo equipo: brújula, frente y escuadra en cubos de 4×4×4 y 5×5×5</item>
    <item href="https://youtu.be/ecc2GvvZGvM" k="Vídeo" t="En YouTube" ext>La misma historia en 11 minutos, con 3D y fórmulas (en ruso)</item>
  </b-links>
</b-chapter>
<b-footer>Las cifras proceden de A. Chervov, M. Obozov, A. Soibelman, …, K. Khoruzhii, A. Romanov, arXiv 2502.18663 (tablas 2–6, proposiciones 4.2–4.3), y de OEIS A186783. Los pisos para cinco y seis bolas se recalcularon por fuerza bruta; el ejemplo del diagrama de la brújula está en el piso 7. El autor del blog fue coautor del primer artículo de CayleyPy, sobre el cubo de Rubik.</b-footer>
</b-post>
