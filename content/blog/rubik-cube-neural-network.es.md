---
title: Cómo resuelve una IA el cubo de Rubik: supera a más de 1000 equipos en 4×4×4 y 5×5×5, aprende de mezclas aleatorias, busca con un frente ancho y se queda con la respuesta más corta de varias redes
date: 2026-10-22
updated: 2026-11-08
description: Cómo resuelve la red neuronal CayleyPy un cubo de Rubik en el mínimo de movimientos: cuántas combinaciones tiene un cubo, por qué la fuerza bruta es imposible, cómo aprende una brújula a partir de mezclas aleatorias y por qué importan un frente de búsqueda ancho y un escuadrón de redes. Resultados en 3×3×3, 4×4×4 y 5×5×5, y un recorrido por los esquemas del artículo arXiv 2502.13266.
tags: IA, investigación, redes neuronales, cubo de Rubik, resolutor del cubo de Rubik, búsqueda de caminos
category: research
layout: wide
mentions: AI Rubik's Cube solver, neural network Rubik's Cube, Rubik's Cube combinations, God's number, 4x4 cube solver, 5x5 cube solver, CayleyPy, beam search, ResMLP, diffusion distance, Kaggle Santa 2023, DeepCubeA, EfficientCube, Cayley graph
toc: video=Vídeo | question=Pregunta | count=Cuántas combinaciones | paper=Artículo y autores | maze=Laberinto | walk=Paseo | compass=Brújula | front=Frente | squad=Escuadrón | results=Resultados | width=Ancho del frente | team=Por qué un escuadrón | surprise=Sorpresas | main=Conclusión | formal=Formalmente | practice=Dónde ayuda | when=Quién y cuándo | faq=FAQ | next=Más
---

El resolutor de cubos de Rubik con IA funciona en tres pasos: una red neuronal aprende de mezclas aleatorias cuántos movimientos faltan, una búsqueda en haz (beam search) sigue su estimación por millones de posiciones a la vez y varias redes independientes trabajan en paralelo, y se queda con la solución más corta. Así superó al mejor de más de 1000 equipos en cubos 4×4×4 y 5×5×5.

<b-post series="kto">

<b-chapter id="video" icon="video" title="Vídeo: la misma historia en 12 minutos">
  <b-why>Este artículo sigue el vídeo escena por escena y entra en más detalle. Debajo de los esquemas hay un enlace a ese momento del vídeo, que está narrado en ruso.</b-why>
  <b-embed-frame src="https://www.youtube.com/embed/bg7tVawVWMc" title="How to solve a Rubik's Cube in the fewest moves — the arXiv 2502.13266 paper in plain words" ratio="16/9"/>
  <b-cap>Artículo: <a href="https://arxiv.org/abs/2502.13266" target="_blank" rel="noopener">A Machine Learning Approach That Beats Large Rubik's Cubes</a>, arXiv 2502.13266, 18 de febrero de 2025. Laberinto, brújula, frente y escuadrón son imágenes para explicar; en el artículo son el grafo de Cayley, la red neuronal, la búsqueda en haz y el conjunto de modelos (ensemble).</b-cap>
</b-chapter>

<b-chapter id="question" icon="cube" title="La pregunta: resolver un cubo es fácil, resolverlo en el mínimo de movimientos es difícil">
  <b-why>Cualquiera puede aprender a resolver un cubo de Rubik en una tarde con una guía. Una guía da una solución larga, normalmente de 50 a 100 movimientos o más. La solución más corta es otro problema, y en los cubos grandes todavía nadie sabe encontrarla.</b-why>

  Hacen falta dos palabras. Un **movimiento** es un cuarto de giro de una cara. Una **posición** es cómo están coloreadas las caras ahora mismo. Un giro de cara lleva el cubo de una posición a otra. La pregunta del artículo: cómo llegar desde una posición dada hasta la resuelta con el mínimo de movimientos.

  <b-art names="rubik-cube-neural-network/turn"/>
  <b-cap>Izquierda: resuelto; centro: tras un movimiento; derecha: tras 20 movimientos aleatorios. <a href="https://youtu.be/bg7tVawVWMc?t=12" target="_blank" rel="noopener">▶ 0:12</a></b-cap>

  ¿Por qué no seguir una guía y recortar los movimientos sobrantes? Una guía resuelve el cubo capa por capa, y cada paso rompe y repara temporalmente lo que ya estaba hecho. Eso cuesta varias veces más movimientos que el mínimo. Para encontrar el mínimo habría que comparar todos los caminos posibles, y son demasiados.
</b-chapter>

<b-chapter id="count" icon="grid" title="Cuántas combinaciones tiene un cubo de Rubik">
  <b-why>Un cubo de Rubik normal de 3×3×3 tiene 43.252.003.274.489.856.000 combinaciones, unos 43 trillones (43 quintillones en la escala corta), demasiadas para revisarlas una por una. Por eso resolverlo en el mínimo de movimientos es difícil.</b-why>

  El número sale de las piezas. Un cubo tiene 8 esquinas (3 colores cada una) y 12 aristas (2 colores cada una); los centros de las caras nunca se mueven. Las esquinas se pueden colocar de 8! maneras y girar de 3⁷ maneras: el giro de la última esquina lo fijan las demás. Las aristas se pueden colocar de 12! maneras y voltear de 2¹¹ maneras. La mitad de las combinaciones no puede darse en un cubo real (no se pueden intercambiar exactamente dos piezas sin desmontarlo), así que el producto se divide entre dos.

  <b-art names="rubik-cube-neural-network/pieces"/>
  <b-cap>Izquierda: solo las esquinas brillan; derecha: solo las aristas. <a href="https://youtu.be/bg7tVawVWMc?t=34" target="_blank" rel="noopener">▶ 0:34</a></b-cap>

  Revisando mil millones de posiciones por segundo, una búsqueda completa en un cubo normal llevaría unos 1370 años: empezar en 2025 y terminar en 3395.

  <b-art names="rubik-cube-neural-network/years"/>
  <b-cap>Búsqueda completa a mil millones de posiciones por segundo. <a href="https://youtu.be/bg7tVawVWMc?t=41" target="_blank" rel="noopener">▶ 0:41</a></b-cap>

  Los cubos más grandes tienen más piezas, y el número crece aún más rápido. Un cubo de 5×5×5 tiene más posiciones que átomos hay en la Tierra.

  <b-art names="rubik-cube-neural-network/sizes"/>
  <b-cap>La longitud de la barra es el número de dígitos de la cantidad de posiciones. <a href="https://youtu.be/bg7tVawVWMc?t=51" target="_blank" rel="noopener">▶ 0:51</a></b-cap>

  Para el cubo normal se conoce el mínimo. El **número de Dios** es la mayor cantidad de movimientos que puede necesitar la solución más corta de cualquier posición. Se encontró con una búsqueda por ordenador con atajos de simetría: 20 movimientos cuando medio giro cuenta como un movimiento (2010) y 26 movimientos cuando solo se cuentan cuartos de giro (2014). Para 4×4×4 y 5×5×5 no existe una respuesta así.

  <b-table>
    <table><thead>
    <tr><th>Cubo</th><th class="bk-table-r">Posiciones</th><th>Qué se sabe de los caminos más cortos</th></tr>
    </thead><tbody>
    <tr><td>3×3×3</td><td class="bk-table-r">4.3·10¹⁹</td><td>número de Dios: 20 movimientos (medio giro = 1 movimiento), 26 movimientos (solo cuartos de giro)</td></tr>
    <tr><td>4×4×4</td><td class="bk-table-r">7.4·10⁴⁵</td><td>una conjetura de 48 movimientos, sin demostrar</td></tr>
    <tr><td>5×5×5</td><td class="bk-table-r">2.8·10⁷⁴</td><td>se desconoce</td></tr>
    </tbody></table>
  </b-table>
  <b-finding>
    <ex>En cubos de 4×4×4 y 5×5×5 una búsqueda completa es imposible, y los caminos más cortos se desconocen.</ex>
    <gen>Cuando el espacio de estados es enorme, los caminos más cortos se buscan sin enumerar: con una estimación de distancia y una búsqueda inteligente. La calidad se comprueba en tareas con una respuesta conocida o la mejor conocida.</gen>
    <do>Antes de juzgar que «la IA resolvió el problema», averigua con qué se compara: con un óptimo demostrado o con la mejor solución conocida.</do>
  </b-finding>
</b-chapter>

<b-chapter id="paper" icon="trophy" title="El artículo, los autores y la competición">
  <b-why>En 2023, más de mil equipos de programadores compitieron en Kaggle en Santa 2023: quién resolvía puzles, cubos grandes incluidos, con el menor número total de movimientos.</b-why>

  Kaggle es una plataforma donde empresas e investigadores publican problemas y equipos de todo el mundo compiten con sus soluciones. Santa 2023 tenía una puntuación simple: el número total de movimientos en todos los puzles, cuanto menos, mejor. Las mejores respuestas de la competición se convirtieron en la vara de medir para los cubos grandes.

  El 18 de febrero de 2025, doce autores del proyecto CayleyPy publicaron el artículo «A Machine Learning Approach That Beats Large Rubik's Cubes». Su programa superó las mejores respuestas de la competición en cubos de 4×4×4 y 5×5×5 y fue la primera red neuronal en resolver cubos más grandes que el normal.

  <b-art names="rubik-cube-neural-network/authors"/>
  <b-cap>Autores en el orden del artículo. El autor de este blog es uno de los coautores.</b-cap>
  <b-art names="rubik-cube-neural-network/race"/>
  <b-cap>La competición y el resultado: longitud media de la solución, en movimientos. <a href="https://youtu.be/bg7tVawVWMc?t=77" target="_blank" rel="noopener">▶ 1:17</a></b-cap>
</b-chapter>

<b-chapter id="maze" icon="boxes-route" title="El cubo como un laberinto de posiciones">
  <b-why>La imagen central: cada posición es una habitación, cada movimiento es una puerta a una habitación vecina y el cubo resuelto es la salida.</b-why>

  **Una habitación es una coloración del cubo.** Giras una cara y estás en la habitación vecina. Es vecina porque la coloración difiere en un giro.

  <b-art names="rubik-cube-neural-network/rooms"/>
  <b-cap>A la derecha, la misma coloración con la cara derecha girada. <a href="https://youtu.be/bg7tVawVWMc?t=95" target="_blank" rel="noopener">▶ 1:35</a></b-cap>

  Cada habitación de un cubo normal tiene 12 puertas: el cubo tiene 6 caras y cada una se puede girar en sentido horario o antihorario.

  <b-art names="rubik-cube-neural-network/doors"/>
  <b-cap>Las 12 habitaciones vecinas: detrás de cada puerta hay una coloración distinta. <a href="https://youtu.be/bg7tVawVWMc?t=105" target="_blank" rel="noopener">▶ 1:45</a></b-cap>

  Todas las habitaciones juntas forman el laberinto: en matemáticas, el grafo de Cayley del grupo del cubo. **Siempre hay una sola salida: el cubo resuelto.** **El inicio es tu cubo mezclado**, la posición que hay que resolver. Resolver el cubo en el mínimo de movimientos significa llegar del inicio a la salida pasando por el menor número de puertas.

  Abajo hay un laberinto de juguete de 40 habitaciones. El real tiene 4.3·10¹⁹ habitaciones con 12 puertas cada una, así que no se puede dibujar; el pequeño muestra cómo funciona cada parte del programa.

  <b-art names="rubik-cube-neural-network/map"/>
  <b-cap>La salida a la izquierda, el inicio a la derecha, las líneas gruesas son paredes. <a href="https://youtu.be/bg7tVawVWMc?t=132" target="_blank" rel="noopener">▶ 2:12</a></b-cap>

  Ahora eleva cada habitación a una altura igual a su número de movimientos hasta la salida. Resulta un relieve: la salida es el punto más bajo, y el camino más corto desde cualquier habitación es un descenso por una escalera, con cada peldaño un nivel más abajo. Si se conociera la altura de cada habitación, resolver sería fácil: bajar siempre. Nadie conoce las alturas; eso es lo que la red neuronal va a estimar.

  <b-art names="rubik-cube-neural-network/relief"/>
  <b-cap>El relieve del mismo laberinto. <a href="https://youtu.be/bg7tVawVWMc?t=119" target="_blank" rel="noopener">▶ 1:59</a></b-cap>
</b-chapter>

<b-chapter id="walk" icon="flag" title="Un paseo desde la salida">
  <b-why>Nadie tiene un mapa del laberinto: hay demasiadas habitaciones. Por eso los autores trabajan hacia atrás.</b-why>

  Se colocan en la salida y hacen movimientos aleatorios: un paseo, que no es más que mezclar el cubo resuelto. Después de cada movimiento anotan la coloración y cuántos movimientos se han hecho. El ordenador genera pares así, «posición → número de movimientos», por miles de millones durante el propio entrenamiento: un paseo casi no cuesta nada y no necesita mapa.

  <b-art names="rubik-cube-neural-network/walks"/>
  <b-cap>Izquierda: un paseo por el laberinto; derecha: los registros con los que aprende la red. <a href="https://youtu.be/bg7tVawVWMc?t=164" target="_blank" rel="noopener">▶ 2:44</a></b-cap>
  <b-kv-rows>
    <row k="Paseo">movimientos aleatorios desde el cubo resuelto, sin dar nunca el paso inmediato de vuelta</row>
    <row k="Longitud">hasta 26 movimientos para 3×3×3, 45 para 4×4×4, 65 para 5×5×5</row>
    <row k="Registro">posición → movimientos hechos hasta ahora</row>
    <row k="Volumen">8 mil millones de posiciones; 1 millón de nuevas antes de cada ronda de entrenamiento</row>
  </b-kv-rows>
</b-chapter>

<b-chapter id="compass" icon="search" title="La brújula: una red que adivina la distancia hasta la salida">
  <b-why>La brújula aprende de los paseos: mira una coloración y adivina cuántos movimientos faltan hasta la salida, la altura de la habitación en el relieve.</b-why>

  <b-art names="rubik-cube-neural-network/net"/>
  <b-cap>La brújula es una red neuronal corriente: entra una coloración, sale un número.</b-cap>

  La brújula se equivoca, y se equivoca por exceso: un paseo da vueltas, así que necesita más movimientos que el camino más corto. En el esquema, un paseo llega a una habitación en 8 movimientos, cuando en realidad está a 2. Pero cuanto más lejos llegó un paseo, más lejos está de media la habitación de la salida, así que la brújula apunta en la dirección correcta: un número menor significa más cerca de la salida. Los autores llaman distancia de difusión al número medio de movimientos de paseo hasta una posición.

  <b-art names="rubik-cube-neural-network/loop"/>
  <b-cap>Por qué la brújula sobrestima. <a href="https://youtu.be/bg7tVawVWMc?t=186" target="_blank" rel="noopener">▶ 3:06</a></b-cap>
  <b-io justify>
    <item k="Entrada">La posición del cubo: una lista de números que dice dónde está ahora cada una de las 54 pegatinas</item>
    <item k="Red">10 capas, 4 millones de parámetros; entrenada con 8 mil millones de posiciones de paseos</item>
    <item k="Salida">Una estimación de cuántos movimientos faltan para el cubo resuelto</item>
  </b-io>

  La brújula es la primera parte del programa de los autores. De aquí en adelante, el programa completo (brújula, frente y escuadrón) se llama **resolutor**.
</b-chapter>

<b-chapter id="front" icon="flag-alt" title="El frente: por qué un solo camino no basta">
  <b-why>Si se recorre un único camino hacia donde apunta la brújula, un solo error de la brújula lleva a un callejón sin salida.</b-why>

  La forma simple de seguir una brújula: desde la habitación actual, pasar a la vecina con el número menor. En el esquema, los números de las habitaciones son las estimaciones de una brújula que se equivoca en uno o dos movimientos. El camino único da tres pasos, entra en una habitación donde la brújula se equivocó y choca con una pared.

  <b-art names="rubik-cube-neural-network/deadend"/>
  <b-cap>Un camino único siguiendo la brújula. <a href="https://youtu.be/bg7tVawVWMc?t=217" target="_blank" rel="noopener">▶ 3:37</a></b-cap>

  Por eso el resolutor avanza como un frente (búsqueda en haz, beam search, en el artículo). Un frente son varias habitaciones a la vez. En cada paso el resolutor abre todas las puertas de todas las habitaciones del frente, la brújula puntúa a los nuevos vecinos y solo siguen los más prometedores. Cuántas habitaciones se conservan es el ancho del frente; los autores llegan hasta 2²⁴ ≈ 16 millones. Si la brújula se equivoca con una habitación, las demás habitaciones del frente siguen ahí y el camino no se rompe.

  <b-art names="rubik-cube-neural-network/front"/>
  <b-cap>La misma brújula, un frente de ancho 3. <a href="https://youtu.be/bg7tVawVWMc?t=249" target="_blank" rel="noopener">▶ 4:09</a></b-cap>
</b-chapter>

<b-chapter id="squad" icon="users-alt" title="El escuadrón: varias brújulas y la respuesta más corta">
  <b-why>Cada brújula aprende de sus propios paseos aleatorios, así que dos brújulas se equivocan en habitaciones distintas.</b-why>

  Los autores montan un escuadrón: varias redes entrenadas de forma independiente, cada una con su propio frente. Cada una busca por su cuenta, y el camino más corto encontrado se convierte en la respuesta. Comprobar una respuesta es barato (basta contar los movimientos), así que las redes extra nunca perjudican; solo añaden oportunidades de un camino más corto.

  <b-art names="rubik-cube-neural-network/squad"/>
  <b-cap>Tres brújulas con errores distintos en el mismo laberinto. <a href="https://youtu.be/bg7tVawVWMc?t=276" target="_blank" rel="noopener">▶ 4:36</a></b-cap>
</b-chapter>

<b-chapter id="results" icon="trophy" title="Resultados">
  <b-why>Tres cubos, tres historias.</b-why>

  **Cubo normal de 3×3×3.** El resolutor encuentra el camino más corto posible en 98 casos de cada 100. Las mejores redes anteriores, DeepCubeA (2019) y EfficientCube (2023), lograron 60 y 70.

  <b-dot-grid n="100" on="0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97"></b-dot-grid>
  <b-cap>98 de 100 tareas: camino más corto (con precisión, 98,4 % en 1000 posiciones del trabajo de DeepCubeA). <a href="https://youtu.be/bg7tVawVWMc?t=283" target="_blank" rel="noopener">▶ 4:43</a></b-cap>

  **Cubo de 4×4×4.** El camino del resolutor es de media 7 movimientos más corto que el de los mejores equipos de la competición: 46,5 frente a 53,5. Está por debajo del límite conjeturado de 48 movimientos.

  <b-share-bar kind="wide" label="Cubo 4×4×4: longitud media de la solución">
    <seg w="46.51" color="accent" ink="#fff">resolutor · 46,5</seg>
    <seg w="6.98" color="d-none">+7 de los mejores equipos</seg>
  </b-share-bar>

  **Cubo de 5×5×5.** El resolutor es más corto que los mejores equipos en cada una de las 19 tareas de la competición: 92,2 movimientos frente a 96,6 de media.

  <b-art names="rubik-cube-neural-network/checks"/>
  <b-cap>19 de 19. <a href="https://youtu.be/bg7tVawVWMc?t=302" target="_blank" rel="noopener">▶ 5:02</a></b-cap>
  <b-table>
    <table><thead>
    <tr><th>Cubo</th><th>Conjunto de tareas</th><th>Lo mejor antes del artículo</th><th>CayleyPy</th></tr>
    </thead><tbody>
    <tr><td>3×3×3</td><td>1000 posiciones del trabajo de DeepCubeA</td><td>60,3 % y 69,6 % de caminos más cortos (DeepCubeA, EfficientCube)</td><td><b>98,4 %</b>, 26 brújulas</td></tr>
    <tr><td>4×4×4</td><td>43 posiciones, Kaggle Santa 2023</td><td>53,49 movimientos de media</td><td><b>46,51</b> movimientos, 29 brújulas</td></tr>
    <tr><td>5×5×5</td><td>19 posiciones, Kaggle Santa 2023</td><td>96,58 movimientos</td><td><b>92,16</b> movimientos, 69 brújulas</td></tr>
    </tbody></table>
  </b-table>
  <b-cap>Tabla I del artículo.</b-cap>
</b-chapter>

<b-chapter id="width" icon="bulb" title="Por qué: el ancho del frente">
  <b-why>Un error de la brújula en una habitación lo corrigen las demás habitaciones del frente, así que cuanto más ancho es el frente, más corto es el camino encontrado.</b-why>

  En el esquema, la misma brújula llega a un callejón sin salida con ancho 1, encuentra un camino de 11 movimientos con ancho 2 y el más corto, de 9 movimientos, con ancho 3. Los caminos los calcula una búsqueda en haz real. El precio del ancho es el tiempo: un frente más ancho revisa más habitaciones.

  <b-art names="rubik-cube-neural-network/width"/>
  <b-cap>La misma brújula, distinto ancho de frente. <a href="https://youtu.be/bg7tVawVWMc?t=331" target="_blank" rel="noopener">▶ 5:31</a></b-cap>

  En el artículo, en el cubo de 4×4×4, un frente 256 veces más ancho recortó el camino de 60 movimientos a 50, y cada duplicación del ancho recortó aproximadamente el mismo número de movimientos.

  <b-count-bars>
    <bar k="65 K" w="100%" color="c-none">60.2</bar>
    <bar k="262 K" w="94%" color="c-none">56.7</bar>
    <bar k="1 M" w="92%" color="c-none">55.3</bar>
    <bar k="4 M" w="88%" color="c-none">52.8</bar>
    <bar k="16 M" w="84%" color="accent">50.6</bar>
  </b-count-bars>
  <b-cap>Ancho del frente y camino medio en el cubo de 4×4×4, en movimientos. Tabla III del artículo.</b-cap>
  <b-finding>
    <ex>Cada duplicación del ancho recorta aproximadamente el mismo número de movimientos del camino.</ex>
    <gen>De todos los ajustes, el ancho del frente es el que más afecta al resultado, más que el tamaño de la red o la cantidad de datos.</gen>
    <do>Cuando la estimación de distancia es imprecisa, invierte en ancho de búsqueda en lugar de en una estimación perfecta.</do>
  </b-finding>
</b-chapter>

<b-chapter id="team" icon="users" title="Por qué: el escuadrón">
  <b-why>Para el cubo de 5×5×5 los autores entrenaron 69 brújulas. En cada tarea gana la que tiene el camino más corto, y los caminos de 10 de ellas llegaron a las respuestas finales.</b-why>

  Incluso las brújulas débiles resultaron útiles: cada una ganó una o dos tareas difíciles. Juntas, el escuadrón encuentra caminos hasta 8 movimientos más cortos que la mejor brújula sola. Y la primerísima brújula de 4×4×4 superó por sí sola todas las mejores respuestas de la competición, y aun así no entró en el conjunto final: las demás juntas eran más cortas.

  <b-dot-grid n="69" on="3,11,17,24,30,38,45,52,60,66"></b-dot-grid>
  <b-cap>69 brújulas para 5×5×5; están resaltadas las 10 cuyos caminos llegaron a la respuesta. Cuáles exactamente es un esquema; en el artículo es la figura 3. <a href="https://youtu.be/bg7tVawVWMc?t=362" target="_blank" rel="noopener">▶ 6:02</a></b-cap>
  <b-finding>
    <ex>Un conjunto de 10 brújulas distintas es hasta 8 movimientos más corto que la mejor de ellas.</ex>
    <gen>Cuando una respuesta es fácil de comprobar, varios modelos entrenados de forma independiente con selección de la mejor respuesta dan más que pulir un solo modelo.</gen>
    <do>Si comprobar una respuesta es barato, lanza varios modelos distintos y quédate con el mejor resultado.</do>
  </b-finding>
</b-chapter>

<b-chapter id="surprise" icon="bulb" title="Sorpresas">
  <b-why>Tres observaciones que los autores llaman inesperadas.</b-why>

  <b-art names="rubik-cube-neural-network/surprises"/>
  <b-cap>Datos, tamaño de la red, tiempo. <a href="https://youtu.be/bg7tVawVWMc?t=397" target="_blank" rel="noopener">▶ 6:37</a></b-cap>
  <b-steps top="14" round>
    <step t="Más datos no es mejor">Más allá de 8 mil millones de posiciones la brújula apenas mejora: 4, 8 y 16 mil millones dan un camino medio de 55,4, 55,1 y 55,8 movimientos en el cubo de 4×4×4</step>
    <step t="Una brújula pequeña es más precisa">4 millones de parámetros frente a 14,7 millones de las redes anteriores, casi cuatro veces más pequeña y aun así más precisa; incluso una red de una sola capa alcanza un 90,4 % de caminos más cortos</step>
    <step t="Más rápido">El entrenamiento tarda 4 h 40 min en lugar de 86 h 25 min; resolver un cubo en la misma máquina con el mismo ancho de frente tarda 10,9 s frente a 287,8 s, unas 26 veces más rápido</step>
  </b-steps>
</b-chapter>

<b-chapter id="main" icon="flag" title="La conclusión">
  <b-why>La pregunta era: ¿se puede encontrar una solución corta para un cubo enorme sin revisar todas las posiciones? Se puede.</b-why>

  Bastan tres piezas: una brújula aprende de paseos aleatorios que se alejan de la salida, un frente ancho perdona sus errores y un escuadrón de brújulas distintas elige el camino más corto. El resolutor no sabe nada del cubo en sí, solo de habitaciones y puertas, así que sirve también para otros laberintos.

  <b-step-chain>
    <node t="Paseos">datos baratos, sin mapa</node>
    <node t="Brújula">estimación de movimientos hasta la salida</node>
    <node t="Frente">perdona los errores de la brújula</node>
    <node t="Escuadrón">la más corta de las respuestas</node>
  </b-step-chain>
  <b-callout icon="shield-check">**Salvedad.** Los caminos más cortos de los cubos grandes se desconocen, así que el resolutor se compara con las mejores soluciones conocidas, no con el óptimo.</b-callout>
</b-chapter>

<b-chapter id="formal" icon="boxes-route" title="Formalmente: el mismo camino en el lenguaje del artículo">
  <b-why>La segunda parte del vídeo: los mismos pasos en forma de fórmulas.</b-why>

  <b-table>
    <table><thead>
    <tr><th>En el vídeo</th><th>En el artículo</th><th>Cómo funciona</th></tr>
    </thead><tbody>
    <tr><td>laberinto</td><td>grafo de Cayley (Schreier) del grupo del cubo</td><td>los vértices son posiciones, las aristas son movimientos</td></tr>
    <tr><td>posición</td><td>permutación</td><td>(p(0), …, p(53)): adónde fue cada una de las 54 pegatinas; un movimiento desplaza 20 pegatinas</td></tr>
    <tr><td>paseo</td><td>pares (posición, k)</td><td>la k media es la distancia de difusión; supera a la más corta</td></tr>
    <tr><td>brújula</td><td>red neuronal ResMLP</td><td>10 capas, 4 M de parámetros, minimiza (estimación − k)²; 1 M de posiciones nuevas antes de cada ronda de entrenamiento</td></tr>
    <tr><td>frente</td><td>búsqueda en haz (beam search)</td><td>vecinos → quitar duplicados → estimar → las W mejores; W hasta 2²⁴, como mucho 200 pasos</td></tr>
    <tr><td>escuadrón</td><td>agentes</td><td>longitud de la respuesta = min(L₁, …, L_A) sobre los agentes</td></tr>
    </tbody></table>
  </b-table>
  <b-art names="rubik-cube-neural-network/perm"/>
  <b-cap>Una posición es una permutación: como una baraja mezclada, las mismas cartas en otro orden. Se muestran 9 de las 54 pegatinas. <a href="https://youtu.be/bg7tVawVWMc?t=495" target="_blank" rel="noopener">▶ 8:15</a></b-cap>
  <b-art names="rubik-cube-neural-network/beam"/>
  <b-cap>Un paso de la búsqueda en haz: como una ronda de torneo, pasan los mejores. <a href="https://youtu.be/bg7tVawVWMc?t=579" target="_blank" rel="noopener">▶ 9:39</a></b-cap>

  La búsqueda en haz en unas pocas líneas; los autores publicaron el código completo en PyTorch junto con el artículo.

  <b-codebox copy>
    def beam_search(start, model, W, steps=200):
        front = [start]
        for _ in range(steps):
            nbrs = unique(move(v) for v in front for move in MOVES)
            if SOLVED in nbrs: return True
            front = sorted(nbrs, key=model)[:W]   # W best by the compass
        return False
  </b-codebox>
</b-chapter>

<b-chapter id="practice" icon="grid" title="Dónde ayuda">
  <b-why>El resolutor no sabe que está mirando un cubo: solo necesita posiciones, movimientos y una meta. Por eso el mismo enfoque sirve para cualquier problema de ir de un estado a otro por el camino más corto.</b-why>
  <b-table>
    <table><thead>
    <tr><th>Vínculo</th><th>Dónde</th></tr>
    </thead><tbody>
    <tr><td><b-tag kind="ok">directo</b-tag></td><td>puzles: cubos de cualquier tamaño, la competición Kaggle Santa</td></tr>
    <tr><td><b-tag kind="ok">directo</b-tag></td><td>caminos más cortos en enormes grafos de permutaciones donde enumerar es imposible</td></tr>
    <tr><td><b-tag kind="plain">planes de los autores</b-tag></td><td>problemas de biología y de programación</td></tr>
    <tr><td><b-tag kind="plain">analogía</b-tag></td><td>planificación: un robot o un juego que debe llegar de un estado a otro</td></tr>
    </tbody></table>
  </b-table>
  <b-callout icon="bulb">**Lección.** Sin mapa, entrena una brújula con paseos aleatorios y avanza como un frente ancho.</b-callout>
</b-chapter>

<b-chapter id="when" icon="shield-check" title="Quién y cuándo, qué está demostrado">
  <b-steps top="14" round>
    <step t="1974">Ernő Rubik inventa el cubo</step>
    <step t="2010">Demostrado: cualquier posición de 3×3×3 se puede resolver en 20 movimientos cuando medio giro cuenta como un movimiento</step>
    <step t="2014">Demostrado: en 26 movimientos cuando solo se cuentan cuartos de giro</step>
    <step t="2019">La red DeepCubeA de la Universidad de California en Irvine resuelve por primera vez el cubo normal sin pistas humanas</step>
    <step t="2023">Competición Kaggle Santa: más de 1000 equipos resuelven cubos grandes</step>
    <step t="2025" hl>El artículo de CayleyPy: la primera red neuronal que supera a todos en 4×4×4 y 5×5×5</step>
  </b-steps>

  Es un experimento, no una demostración: los números se miden en conjuntos de tareas de trabajos anteriores y de la competición, y los caminos más cortos de los cubos grandes se desconocen. El camino medio de 46,5 movimientos en el cubo de 4×4×4 está por debajo del límite conjeturado de 48 movimientos, pero la propia conjetura no está demostrada. Varios números del artículo no coinciden: la proporción de caminos más cortos en un cubo normal aparece como 98,4 % y como 97,6 %, y el número de redes del escuadrón de 4×4×4 por debajo de 48 movimientos como 29 y como 6.
</b-chapter>

<b-chapter id="faq" icon="chat" title="FAQ">
  <b-faq-cards>
    <q t="¿Puede una red neuronal resolver un cubo de Rubik?">Sí. Las redes neuronales resuelven el cubo normal desde 2019 (DeepCubeA), y en 2025 CayleyPy fue la primera red neuronal en resolver cubos de 4×4×4 y 5×5×5, con menos movimientos que los mejores equipos de la competición.</q>
    <q t="¿Cuántas combinaciones tiene un cubo de Rubik de 3×3×3?">43.252.003.274.489.856.000, unos 4,3·10¹⁹. Un 4×4×4 tiene unos 7,4·10⁴⁵ y un 5×5×5 unos 2,8·10⁷⁴.</q>
    <q t="¿Cuál es el mínimo de movimientos para resolver cualquier cubo de Rubik?">El cubo normal de 3×3×3 necesita como máximo 20 movimientos cuando medio giro cuenta como un movimiento, y 26 cuando solo se cuentan cuartos de giro. Para cubos más grandes la respuesta exacta se desconoce.</q>
    <q t="¿En qué se diferencia CayleyPy de DeepCubeA?">Su red es casi cuatro veces más pequeña y se entrena unas 18 veces más rápido, y la búsqueda funciona como un frente ancho con un escuadrón de redes. En el cubo normal eso da un 98 % de caminos más cortos frente a un 60 %.</q>
    <q t="¿Puedo probarlo yo mismo?">Sí: el código de los autores es abierto, la biblioteca CayleyPy está en GitHub (enlace abajo).</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Más">
  <b-links cols="3">
    <item href="https://arxiv.org/abs/2502.13266" k="Artículo" t="arXiv 2502.13266" ext>A Machine Learning Approach That Beats Large Rubik's Cubes</item>
    <item href="https://github.com/cayleypy/cayleypy" k="Código" t="CayleyPy en GitHub" ext>Una biblioteca para búsqueda de caminos en grafos de permutaciones</item>
    <item href="https://youtu.be/bg7tVawVWMc" k="Vídeo" t="Recorrido en YouTube" ext>La misma historia en 12 minutos, con 3D y fórmulas (en ruso)</item>
  </b-links>
</b-chapter>
<b-footer>Los números son del artículo de A. Chervov, K. Khoruzhii, …, E. Urvanov, A. Romanov, arXiv 2502.13266 (tablas I–III, figuras 2–3). El laberinto dibujado y sus números son un esquema; sus caminos los calcula una búsqueda en haz. El autor de este blog es uno de los coautores del artículo.</b-footer>
</b-post>
