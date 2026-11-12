---
title: Cómo analizar el uso de ChatGPT Enterprise en una empresa: quién lo usa, para qué y qué herramientas de IA comprar después
date: 2026-09-28
updated: 2026-11-13
description: Cómo saber cómo usan ChatGPT Enterprise los empleados: cinco exportaciones de la consola de administración dan la profundidad de adopción, la uniformidad entre equipos, la herramienta principal, un mapa de tareas, comprobaciones de datos y una lista corta de personas a entrevistar.
tags: IA, investigación, analítica
category: research
layout: wide
image: /og/chatgpt-enterprise-usage-report.en.png
mentions: ChatGPT Enterprise, Codex, ChatGPT Work, Claude in Chrome
toc: why=Por qué el informe | order=Flujo de trabajo | data=Qué ve el administrador | layer1=Panorama general | layer2=Naturaleza del trabajo | layer3=Verificación | layer4=Selección de personas | start=Por dónde empezar | faq=Preguntas | next=Para seguir leyendo
---

Un informe de uso de ChatGPT Enterprise se construye con cinco exportaciones de su consola de administración, que muestra quién usa la herramienta y cómo. Da la profundidad de adopción, la uniformidad entre equipos, la naturaleza de las tareas y las personas a entrevistar. Sirve para decidir qué herramientas de IA comprar, a quién formar y qué supuestos comprobar.

<b-post series="kto">
<b-dir-map label="Cuatro áreas de análisis">
  <dir href="#layer1" n="01" color="c-chat" t="Panorama general" big="21%" sub="Lo usan cada semana" dec="Dónde invertir en formación"><b-mini-funnel><seg w="82%" color="d-rare" ink="d-rare-t">82%</seg><seg w="47%" color="d-reg" ink="d-reg-t">47%</seg><seg w="21%" color="d-week" ink="d-week-t">21%</seg></b-mini-funnel></dir>
  <dir href="#layer2" n="02" color="c-work" t="Naturaleza del trabajo" big="70%" sub="De las conexiones son Slack y Notion" dec="Qué herramienta comprar" art="chatgpt-enterprise-usage-report/map-donut"></dir>
  <dir href="#layer3" n="03" color="c-code" t="Verificación" big="±2%" sub="Tolerancia al conciliar exportaciones" dec="Si se puede confiar en los números"><b-csv-check><file color="c-chat">CHAT</file><file color="c-work">WORK</file><file color="c-code">CODEX</file></b-csv-check></dir>
  <dir href="#layer4" n="04" color="c-proj" t="Selección de personas" big="16" sub="De 340 en el ejemplo, para entrevistas" dec="Con quién hablar antes de comprar"><b-dot-grid n="340" on="5,31,58,77,96,120,141,163,187,205,226,248,269,290,311,333"/></dir>
</b-dir-map>
<b-chapter id="why" title="Qué decisiones ayuda a tomar el informe">
  <b-lead-large><b>Tarea de negocio:</b> averiguar en qué tareas de trabajo se queda corto el conjunto actual de herramientas de IA y qué soluciones merece la pena probar antes de comprar. La decisión la toma el responsable del presupuesto de herramientas de IA junto con los líderes de los equipos donde se hace el piloto. El acceso a los datos y la seguridad los aprueba el equipo de seguridad de la información. Los criterios de decisión son los signos de la tabla siguiente.</b-lead-large>

  Que el conjunto actual no es óptimo en algún punto es una suposición: el informe y las entrevistas la comprueban. «No óptimo» se descompone en signos comprobables. La conclusión «no hace falta ninguna herramienta nueva» también es un resultado.

  <b-table id="signs">
    <table><thead>
    <tr><th>Signo</th><th>Cómo se manifiesta</th><th>Categoría en la entrevista</th><th>Dónde lo muestra el informe</th></tr>
    </thead><tbody>
    <tr><td>Calidad del resultado</td><td>las respuestas son imprecisas o inventadas</td><td><b-tag kind="no" line>alucinaciones</b-tag></td><td><a href="/blog/chatgpt-enterprise-usage-report/#connectors">Conectores</a></td></tr>
    <tr><td>Tiempo y retrabajo manual</td><td>muchas idas y vueltas, el resultado se termina a mano</td><td><b-tag kind="no" line>prompt</b-tag></td><td><a href="/blog/chatgpt-enterprise-usage-report/#depth">Profundidad</a>, <a href="/blog/chatgpt-enterprise-usage-report/#main-tool">Herramienta principal</a></td></tr>
    <tr><td>Reproducibilidad</td><td>cada vez sale un resultado distinto para la misma tarea</td><td><b-tag kind="no" line>reproducibilidad</b-tag></td><td><a href="/blog/chatgpt-enterprise-usage-report/#skills">Skills</a>, <a href="/blog/chatgpt-enterprise-usage-report/#projects">Temas de proyectos</a></td></tr>
    <tr><td>Escala</td><td>un escenario que funciona no se traslada a otro equipo</td><td><b-tag kind="no" line>escala</b-tag></td><td><a href="/blog/chatgpt-enterprise-usage-report/#uniformity">Uniformidad</a></td></tr>
    <tr><td>Acceso a datos</td><td>el sistema necesario no está conectado</td><td><b-tag kind="no" line>acceso a datos</b-tag></td><td><a href="/blog/chatgpt-enterprise-usage-report/#connectors">Conectores</a></td></tr>
    <tr><td>Coste</td><td>caro por unidad de resultado</td><td><b-tag kind="no" line>coste</b-tag></td><td><a href="/blog/chatgpt-enterprise-usage-report/#top-spend">Ranking por gasto</a></td></tr>
    </tbody></table>
  </b-table>
  <b-cap>Límites de los datos: el informe solo ve la herramienta corporativa y solo durante el periodo de exportación, 3 meses. Las cuentas personales y otras herramientas no aparecen.</b-cap>
  <b-section-title id="decision" top="22">Cómo las respuestas se convierten en una decisión de compra</b-section-title>
  <b-why>El informe muestra dónde mirar, y la decisión de compra se toma solo tras estos cinco pasos, para que el dinero vaya a una tarea que tiene mucha gente y que hoy nada cubre.</b-why>
  <b-steps top="18" round>
    <step t="Entrevistas">Qué tareas y dificultades existen y cómo las resuelve la gente hoy</step>
    <step t="Cuestionario a toda la empresa">Cuántas personas se enfrentan a una dificultad, con qué frecuencia y cuánto les estorba</step>
    <step t="Comparar">Escala de la tarea, gravedad de las consecuencias, soluciones alternativas, coste de la solución</step>
    <step t="Probar herramientas">Opciones prometedoras en tareas reales, junto con los empleados</step>
    <step t="Decisión">El responsable del presupuesto decide según los seis <a href="#signs">signos de arriba</a>: calidad, tiempo y retrabajo, reproducibilidad, escala, acceso a datos, coste; «no hace falta ninguna herramienta nueva» es un resultado válido</step>
  </b-steps>
  <b-io justify>
    <item k="Entrada">Exportaciones de la consola: mensajes, gasto, proyectos y conectores de cada persona</item>
    <item k="Qué hace el informe">Convierte las exportaciones en segmentos, madurez de los equipos y personas concretas como material para decidir</item>
    <item k="Decisiones a la salida">Qué herramienta pilotar, para qué equipo, con quién hablar antes de comprar y dónde no hace falta presupuesto</item>
  </b-io>
</b-chapter>
<b-chapter id="order" title="Flujo de trabajo">

  Cinco pasos, de la exportación a la lista final de personas.

  <b-steps top="18" round>
    <step t="Exportar los datos">Cinco secciones de la consola, detalles en «Dónde obtener los datos»</step>
    <step t="Construir el panorama general">Profundidad de adopción, uniformidad entre equipos, herramienta principal, segmentos</step>
    <step t="Mapear la naturaleza del trabajo">Qué tareas resuelve la gente, con qué herramientas integradas y con qué integraciones</step>
    <step t="Comprobar con los datos en bruto">Verificar cada resumen con la exportación original</step>
    <step t="Seleccionar personas y sacar conclusiones">Una lista de entrevistas y las preguntas que hay que comprobar en ellas<b-link-chips><item href="/blog/who-to-interview-before-buying-ai-tools/" icon="arrow-right">A quién entrevistar</item><item href="/blog/ai-interviews-without-leading-questions/" icon="arrow-right">Cómo hacer las entrevistas</item></b-link-chips></step>
  </b-steps>
</b-chapter>
<b-chapter id="data" title="Qué ve el administrador de ChatGPT Enterprise: dónde obtener los datos">

  Todo se construye con cinco secciones de una misma consola de administración de <a href="https://openai.com/chatgpt/enterprise/" target="_blank" rel="noopener">ChatGPT Enterprise</a>. Pasa el cursor sobre <b>i</b> para ver qué contiene exactamente cada sección.

  <b-subhead>Cómo exportar datos de la consola de ChatGPT Enterprise: a mano y con el agente de navegador Claude in Chrome</b-subhead>
  <b-howto><b>Cómo exportar.</b> La consola sí tiene API, pero cubren solo una parte de los datos: <a href="https://learn.chatgpt.com/docs/enterprise/analytics-api" target="_blank" rel="noopener">analítica de Codex</a>, costes en créditos y registros de conversaciones para cumplimiento normativo. Las exportaciones de usuarios, proyectos y skills y el ranking por producto son más fáciles de recoger en la interfaz. Exportar es un buen trabajo para <a href="https://claude.com/claude-in-chrome" target="_blank" rel="noopener">Claude in Chrome</a>: abre la sección correcta, pone el filtro, pulsa exportar y guarda el CSV. Cada paso se ve en pantalla, así que un filtro o una sección equivocados se detectan al instante, antes de que los números lleguen al informe.<warn icon="shield-alert"><b>Acceso.</b> La API de la consola no siempre está disponible: las políticas de seguridad de la empresa suelen restringir las claves de API de administrador. En ese caso, exporta cada sección desde la interfaz.</warn></b-howto>
  <b-sources>
    <src icon="users-alt" href="https://chatgpt.com/admin/usage/users" t="Usuarios" path="chatgpt.com/admin/usage/users" what="Mensajes, fechas de actividad y herramientas integradas de cada persona" tip-label="Qué hay dentro de la sección Usuarios">Exportación CSV de un periodo de hasta 12 meses. Campos: messages, tool_messages, gpt_messages, project_messages, department, groups, seat_type, last_day_active. La propia consola marca a los «power users» con una insignia.</src>
    <src icon="trophy" href="https://admin.openai.com" t="Ranking" path="admin.openai.com → Analytics → Leaderboard" what="Gasto, tokens y líneas de código de cada persona, por separado para los productos Chat, Work y Codex" tip-label="Qué hay dentro del ranking">Botón de exportar junto al encabezado → «User ranking», CSV o JSON. Campos: Name, Email, Credits, Estimated costs, Tokens, Lines of code. El filtro «Product» cambia el contenido de la exportación. El historial abarca unos 120 días.</src>
    <src icon="folder-iv" href="https://chatgpt.com/admin/usage/projects" t="Proyectos" path="chatgpt.com/admin/usage/projects" what="Quién creó un proyecto, cuántos mensajes tiene y si está activo" tip-label="Qué hay dentro de la sección Proyectos">Campos: project_name, project_creator_email, messages_workspace, unique_messagers_workspace, is_active. Algunos nombres llegan como [content redacted]: la consola los oculta por sí sola.</src>
    <src icon="plug-alt" href="https://chatgpt.com/admin/usage" t="Resumen: conectores y skills" path="chatgpt.com/admin/usage" what="A qué aplicaciones conecta la gente el asistente y qué skills usa" tip-label="Qué hay dentro de la sección Resumen">Los bloques «App interactions» y «Skills»: número de llamadas a cada conector y skill durante el periodo elegido.</src>
    <src icon="chart-line-iv" href="https://admin.openai.com" t="Analítica: tareas" path="admin.openai.com → Analytics → Tasks" what="La clasificación de tareas de la propia consola: código o trabajo de conocimiento (todo lo que no es código)" tip-label="Qué hay dentro de la pestaña Tareas">Proporción de código y de trabajo de conocimiento, tareas principales por créditos. Un modelo de OpenAI etiqueta las tareas sobre una muestra de aproximadamente el 10% de las solicitudes de 30 días.</src>
  </b-sources>
</b-chapter>
<b-chapter id="layer1" icon="grid" title="Panorama general">

  Las cuatro secciones siguientes son el informe en sí, cada una con su objetivo. <b>Objetivo:</b> mostrar qué grupos de personas hay en la empresa y de qué tamaño.

  <b-subsection id="depth" title="Profundidad de adopción">
    <b-art-row names="chatgpt-enterprise-usage-report/depth-tried chatgpt-enterprise-usage-report/depth-regular chatgpt-enterprise-usage-report/depth-weekly"/>
    <b-why>La profundidad de adopción muestra hasta qué punto la herramienta ha entrado en el trabajo de la empresa: cuántas personas la han usado al menos una vez, con regularidad y cada semana. Quienes nunca escriben en el chat y trabajan solo con Codex se muestran aparte. <b>Decisión:</b> en qué grupo invertir la formación y si conviene comprar más licencias ahora.</b-why>
    <b-share-bar kind="wide">
      <seg w="20.9%" color="d-week" ink="d-week-t">71</seg>
      <seg w="25.9%" color="d-reg" ink="d-reg-t">88</seg>
      <seg w="28.5%" color="d-rare" ink="d-rare-t">97</seg>
      <seg w="6.8%" color="d-api" ink="d-api-t">23</seg>
      <seg w="17.9%" color="d-none" ink="d-none-t">61</seg>
    </b-share-bar>
    <b-legend>
      <item color="d-week">cada semana</item>
      <item color="d-reg">con regularidad</item>
      <item color="d-rare">de vez en cuando</item>
      <item color="d-api">solo Codex</item>
      <item color="d-none">totalmente inactivos</item>
    </b-legend>
    <b-cap>340 personas</b-cap>
    <b-cap>Fuente: <a href="https://chatgpt.com/admin/usage/users" target="_blank" rel="noopener">Usuarios</a> · <a href="https://admin.openai.com" target="_blank" rel="noopener">Ranking</a> para quienes trabajan solo con Codex</b-cap>
    <b-finding>
      <ex>El 82% de las personas ha probado la herramienta, el 47% la usa en su trabajo y para el 21% se ha vuelto un hábito semanal. El margen para ganar profundidad está en las 97 personas del grupo «de vez en cuando».</ex>
      <gen>La diferencia entre «la probó» y «la usa cada semana» muestra cuántas personas lo dejaron tras los primeros intentos. La referencia para una adopción masiva es que entre el 50% y el 70% de los empleados la use en su trabajo diario. Mientras la adopción no llegue a esa referencia, más licencias no traerán crecimiento: algo distinto del acceso frena a la gente.</gen>
      <do>Dedica la formación al grupo más grande entre «la probó» y «cada semana»: da el crecimiento más rápido en uso regular. Vuelve a contar el desglose tras la formación para ver adónde se movió la gente.</do>
    </b-finding>
    <b-info-note icon="flag-alt-iv"><b>Importante.</b> Elige de 5 a 10 personas del grupo «de vez en cuando», averigua en entrevistas cómo resuelven hoy sus tareas y haz con ellas una revisión de casos reales de trabajo. Vuelve a contar la proporción semanal después de la revisión. Cómo preguntar sin sugerir la respuesta se explica en <a href="/blog/ai-interviews-without-leading-questions/">«Cómo entrevistar a las personas sobre su uso de IA»</a>.</b-info-note>
  </b-subsection>
  <b-subsection id="uniformity" title="Uniformidad">
    <b-art-row names="chatgpt-enterprise-usage-report/team-groups" cols="1"/>
    <b-why>La uniformidad muestra con qué igualdad ha entrado la herramienta en distintos equipos: qué proporción de cada equipo la usa con regularidad y cuántos mensajes escribe de media una persona. <b>Decisión:</b> de qué equipo tomar escenarios de trabajo y a cuál llevarlos primero.</b-why>
    <b-table>
      <table><thead>
      <tr><th>Equipo</th><th>Usuarios regulares</th><th class="bk-table-r">%</th><th class="bk-table-r">Msgs por persona</th></tr>
      </thead><tbody><b-table-group color="d-week" span="4">Fuertes · fuente de escenarios</b-table-group>
      <tr><td>Equipo A</td><td><b-bar value="74" min="120"/></td><td class="bk-table-r">74%</td><td class="bk-table-r">1,120</td></tr>
      <tr><td>Equipo B</td><td><b-bar value="66" min="120"/></td><td class="bk-table-r">66%</td><td class="bk-table-r">870</td></tr><b-table-group color="d-reg" span="4">Intermedios</b-table-group>
      <tr><td>Equipo C</td><td><b-bar value="51" min="120"/></td><td class="bk-table-r">51%</td><td class="bk-table-r">720</td></tr><b-table-group color="d-rare" span="4">Rezagados · adonde llevar escenarios</b-table-group>
      <tr><td>Equipo D</td><td><b-bar value="34" min="120"/></td><td class="bk-table-r">34%</td><td class="bk-table-r">530</td></tr>
      <tr><td>Equipo E</td><td><b-bar value="18" min="120"/></td><td class="bk-table-r">18%</td><td class="bk-table-r">290</td></tr>
      </tbody></table>
    </b-table>
    <b-cap>Fuente: <a href="https://chatgpt.com/admin/usage/users" target="_blank" rel="noopener">Usuarios</a> · campos department y groups</b-cap>
    <b-finding>
      <ex>En el Equipo A, el 74% de las personas usa la herramienta con regularidad; en el Equipo E, el 18%: una dispersión de 56 puntos porcentuales.</ex>
      <gen>Una gran dispersión entre equipos significa que ya hay escenarios de trabajo, pero viven en uno o dos equipos: trasladarlos sale más barato que comprar algo nuevo. Una proporción uniformemente baja en todos los equipos apunta a una barrera común: acceso, formación o tareas poco adecuadas. Una proporción uniformemente alta significa que la herramienta ha echado raíces y se puede pasar al siguiente paso. Un equipo con barreras todavía no está listo para una herramienta nueva.</gen>
      <do>Con una dispersión grande, organiza un encuentro: el equipo más fuerte enseña tres de sus escenarios a los dos más débiles. Antes del encuentro, haz 2–3 entrevistas sobre barreras en el equipo más débil. Vuelve a contar la dispersión después: debería reducirse.</do>
    </b-finding>
  </b-subsection>
  <b-subsection id="main-tool" title="Herramienta principal">
    <b-why>Cuál de las tres herramientas se lleva más de la mitad del gasto de una persona en tres meses. El tipo de herramienta muestra cómo trabaja la persona con IA.</b-why>
    <b-tool-types>
      <prob title="muchos mensajes por tarea; ">Prompt</prob>
      <prob title="pocas conexiones con aplicaciones; ">Alucinaciones</prob>
      <prob title="las mismas tareas sin proyectos ni skills; ">Reproducibilidad</prob>
      <prob title="las skills se crean en un solo equipo; ">Escala</prob>
      <tool n="1" href="https://openai.com/chatgpt/enterprise/" color="c-chat" t="Chat" art="chatgpt-enterprise-usage-report/tool-chat" on="1,2,3,4"/>
      <tool n="2" href="https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex" color="c-work" t="Work" art="chatgpt-enterprise-usage-report/tool-work" on="3,4"/>
      <tool n="3" href="https://openai.com/codex/" color="c-code" t="Codex" art="chatgpt-enterprise-usage-report/tool-codex" on=""/>
    </b-tool-types>
    <b-share-bar kind="wide">
      <seg w="48.2%" color="c-chat">164 · Chat</seg>
      <seg w="13.8%" color="c-work">47 · Work</seg>
      <seg w="11.2%" color="c-code">38 · Codex</seg>
      <seg w="26.8%" color="c-none" ink="ink">91 · sin gasto</seg>
    </b-share-bar>
    <b-cap>340 personas, ventana de 3 meses</b-cap>
    <b-cap>Fuente: <a href="https://admin.openai.com" target="_blank" rel="noopener">Ranking</a> · tres exportaciones: filtro «Product» = Chat, Work, Codex</b-cap>
    <b-finding>
      <ex>Chat es el producto principal para 164 de 340 personas, Codex para 38, Work para 47.</ex>
      <gen>La herramienta principal muestra el tipo de trabajo: una conversación, una tarea encargada a un agente o código. Determina qué necesita la persona a continuación y en qué piloto incluirla. El tamaño del grupo fija el tamaño del piloto: uno amplio para un escenario común, uno reducido para un escenario poco frecuente.</gen>
      <do>La decisión es llevar cada grupo al siguiente paso. Para el grupo de Chat: Work con conectores y MCP a los datos de trabajo, lo que elimina los problemas de prompts y las alucinaciones. Para el grupo de Work: specs, configuración del harness (arnés del agente) y skills compartidas, que hacen el resultado reproducible y transferible a otros equipos.</do>
    </b-finding>
  </b-subsection>
  <b-subsection id="top-spend" title="Ranking por gasto">
    <b-art-row names="chatgpt-enterprise-usage-report/spend-few chatgpt-enterprise-usage-report/spend-mentor chatgpt-enterprise-usage-report/spend-experiment"/>
    <b-why>El ranking ordena a las personas por la cantidad gastada en un producto concreto, por ejemplo Codex. Así, la lista incluye a quien gasta mucho en Codex aunque la mayor parte de su gasto vaya a Chat.</b-why>
    <b-table>
      <table><thead>
      <tr><th>Persona</th><th>Equipo</th><th class="bk-table-r">$ en código / 3 meses</th><th class="bk-table-r">Tokens / 3 meses</th><th class="bk-table-r">Tokens por $</th></tr>
      </thead><tbody>
      <tr><td>Hana Sato</td><td>Equipo C</td><td class="bk-table-r">438.20</td><td class="bk-table-r">21.9M</td><td class="bk-table-r">50K</td></tr>
      <tr><td>Luis Moreno</td><td>Equipo A</td><td class="bk-table-r">395.60</td><td class="bk-table-r">12.7M</td><td class="bk-table-r">32K</td></tr>
      <tr><td>Ada Kowalski</td><td>Equipo D</td><td class="bk-table-r">84.30</td><td class="bk-table-r">4.3M</td><td class="bk-table-r">51K</td></tr>
      </tbody></table>
    </b-table>
    <b-cap>Fuente: <a href="https://admin.openai.com" target="_blank" rel="noopener">Ranking</a> · una exportación por producto</b-cap>
    <b-finding>
      <ex>Hana Sato y Luis Moreno gastan en código unas cinco veces más que la tercera persona de la lista. Con un gasto parecido, Hana obtiene una vez y media más tokens por dólar que Luis.</ex>
      <gen>Los usuarios del top son agentes de cambio: encuentran antes los escenarios que funcionan, y su experiencia influye en si una herramienta especializada se amortiza. A su lado hay colegas más cautelosos que necesitan más tiempo y un ejemplo en vivo con sus propias tareas. Ordenar por proporción del gasto oculta a los agentes de cambio, así que conviene mirar el gasto absoluto.</gen>
      <do>Implica a los usuarios del top como mentores: que muestren sus escenarios a colegas que están empezando, con las tareas de esos colegas. Invita a los más cautelosos mediante ejemplos y resultados, sin imposiciones. Ofrece a los dos o tres primeros un experimento con una herramienta especializada, con un informe de antes y después.</do>
    </b-finding>
    <b-info-note icon="chart-bar">El ranking tiene tanto el gasto como los tokens. Compara la relación entre tokens y gasto dentro de un mismo grupo: un producto y tareas parecidas. Quien obtiene claramente más tokens por dólar suele elegir mejor los modelos y los modos. Son los usuarios más avanzados y eficientes, y los primeros a quienes invitar como mentores. Preséntalos a colegas del mismo grupo cuya relación sea menor: resolver una tarea juntos suele dar más que una formación general. Las parejas de equipos distintos aportan polinización cruzada: las buenas técnicas pasan de un equipo a otro.</b-info-note>
    <b-info-note icon="info">Durante el despliegue, los usuarios del top pueden gastar un orden de magnitud más que el resto. Es mejor no introducir límites en esta etapa: desmotivan con facilidad a quienes adoptan la herramienta primero. En lugar de límites, acuerda experimentos y un informe de resultados. Los límites tienen sentido más adelante, cuando las prácticas estén probadas y se conozca el coste normal de un escenario.</b-info-note>
  </b-subsection>
  <b-subsection id="segments" title="Segmentos de comportamiento">
    <b-art-chain label="segmento → entrevista → problema → herramienta">
      <step art="chatgpt-enterprise-usage-report/chain-segment">segmento</step>
      <step art="chatgpt-enterprise-usage-report/chain-custdev">entrevista</step>
      <step art="chatgpt-enterprise-usage-report/chain-problem">problema</step>
      <step art="chatgpt-enterprise-usage-report/chain-tool">herramienta</step>
    </b-art-chain>
    <b-why>Grupos por intensidad de comportamiento, construidos a partir de varias exportaciones: cuánto escribe una persona, cuánto gasta y qué hace.</b-why>
    <b-table>
      <table><thead>
      <tr><th>Segmento</th><th class="bk-table-r">Personas</th><th>Detalles</th></tr>
      </thead><tbody>
      <tr><td>Escriben código en cualquier producto</td><td class="bk-table-r">44</td><td>19 de ellas fuera de los equipos técnicos</td></tr>
      <tr><td>Investigación intensiva en el chat</td><td class="bk-table-r">58</td><td>más de 1,900 mensajes de media</td></tr>
      <tr><td>Tareas con agentes</td><td class="bk-table-r">33</td><td>escenarios de varios pasos, conectores</td></tr>
      <tr><td>Generación de imágenes</td><td class="bk-table-r">21</td><td>dos tercios de un solo equipo</td></tr>
      <tr><td>Totalmente inactivos</td><td class="bk-table-r">61</td><td>0 mensajes, $0 en todo el periodo</td></tr>
      </tbody></table>
    </b-table>
    <b-cap>Fuente: <a href="https://chatgpt.com/admin/usage/users" target="_blank" rel="noopener">Usuarios</a> · <a href="https://admin.openai.com" target="_blank" rel="noopener">Ranking</a></b-cap>
    <b-finding>
      <ex>Los segmentos más grandes para entrevistas con clientes son la investigación intensiva (58) y el código (44, de ellos 19 fuera de los equipos técnicos). Para las 61 personas inactivas la pregunta es otra: qué les impide empezar.</ex>
      <gen>Los datos muestran qué hace la gente, pero no si la herramienta actual les basta. Por eso un segmento es una hipótesis: sugiere a quién invitar a las entrevistas con clientes, qué preguntas hacer y con qué problemas puede toparse la gente. Los candidatos a herramienta aparecen ya aquí, y la elección entre ellos se hace después de las entrevistas, para un problema confirmado.</gen>
      <do>Para cada segmento, habla con 2–3 personas: dónde se queda corta la herramienta actual y qué siguen haciendo a mano. Reúne candidatos para un problema confirmado de tres fuentes: consultas con innovadores dentro de la empresa, expertos externos y referencias del mercado, es decir, qué usan empresas similares. Después, sigue el <a href="#decision">procedimiento de decisión</a>: cuestionario, comparación y prueba de candidatos en tareas reales. Si el problema no se confirma, aplaza el segmento hasta el siguiente recuento.</do>
    </b-finding>
  </b-subsection>
</b-chapter>
<b-chapter id="layer2" icon="briefcase" title="Naturaleza del trabajo">

  <b>Objetivo:</b> mostrar qué tareas resuelve la gente con la herramienta, con qué funciones integradas y a través de qué integraciones.

  <b-subsection id="connectors" title="Conectores">
    <b-art-row names="chatgpt-enterprise-usage-report/conn-guess chatgpt-enterprise-usage-report/conn-data chatgpt-enterprise-usage-report/conn-errors" arrows/>
    <b-why>Los conectores unen el asistente con los datos de trabajo: chats, documentos, código, calendarios. Determinan el volumen de alucinaciones: sin acceso a datos, el modelo rellena la respuesta por su cuenta. <b>Decisión:</b> qué equipos y qué sistemas conectar primero.</b-why>
    <b-count-bars>
      <bar k="Slack" w="100%" color="c-work">520</bar>
      <bar k="Notion" w="65%" color="c-work">340</bar>
      <bar k="GitHub" w="40%" color="c-work">210</bar>
      <bar k="Calendar" w="29%" color="c-work">150</bar>
    </b-count-bars>
    <b-cap>Fuente: <a href="https://chatgpt.com/admin/usage" target="_blank" rel="noopener">Resumen</a> · bloque «App interactions»</b-cap>
    <b-finding>
      <ex>Slack y Notion suman el 70% de todas las conexiones. El modelo no ve los sistemas fuera de esta lista: responde sobre ellos adivinando.</ex>
      <gen>El volumen de alucinaciones baja donde el modelo tiene el contexto que necesita. Sin él, el agente intenta rellenar el hueco por sí mismo. Los equipos con cero conexiones trabajan con el modelo a ciegas, y casi cualquier respuesta sobre sus procesos es una conjetura. La señal en una entrevista con clientes: «tengo que comprobarlo todo».</gen>
      <do>Encuentra los equipos con cero conexiones y pregunta en las entrevistas dónde viven sus datos de trabajo. Conecta una de esas fuentes y compara antes y después con 10 preguntas idénticas: cuántas respuestas son erróneas y cuántas se apoyan en datos de trabajo.</do>
    </b-finding>
  </b-subsection>
  <b-subsection id="skills" title="Skills">
    <b-art-row names="chatgpt-enterprise-usage-report/skill-adhoc chatgpt-enterprise-usage-report/skill-repeat chatgpt-enterprise-usage-report/shared-skill" arrows/>
    <b-why>Las skills muestran la madurez de los procesos: un escenario descrito una vez como skill se repite igual para cualquiera que lo ejecute. Las estadísticas muestran qué skills se usan y quién crea las suyas. <b>Decisión:</b> qué procesos se pueden extender ya a otros equipos y cuáles siguen dependiendo de personas concretas.</b-why>
    <b-count-bars>
      <bar k="spreadsheets" w="100%" color="c-code">88</bar>
      <bar k="pdf" w="65%" color="c-code">57</bar>
      <bar k="skill-creator" w="33%" color="c-code">29</bar>
    </b-count-bars>
    <b-cap>Fuente: <a href="https://chatgpt.com/admin/usage" target="_blank" rel="noopener">Resumen</a> · bloque «Skills»</b-cap>
    <b-finding>
      <ex>Las skills de hojas de cálculo y de PDF tienen 88 y 57 llamadas: esos procesos ya son reproducibles. 29 llamadas a skill-creator: algunas personas están convirtiendo sus escenarios en skills.</ex>
      <gen>La madurez del proceso crece por pasos: peticiones puntuales → una skill personal → una skill compartida del equipo. En el primer paso, el resultado depende de quién pidió y cómo. Con una skill es reproducible: la misma entrada da el mismo resultado. Una skill compartida hace el proceso transferible a otros equipos.</gen>
      <do>Reúne las skills en una sola lista con sus autores y marca el paso de cada proceso. Convierte en compartidas las dos skills personales más usadas: el autor se las enseña a un equipo vecino, y el equipo comprueba que las mismas entradas dan el mismo resultado. Los escenarios sin skill que se repiten cada semana son los primeros candidatos a nuevas skills.</do>
    </b-finding>
  </b-subsection>
  <b-subsection id="projects" title="Temas de proyectos">
    <b-art-row names="chatgpt-enterprise-usage-report/proj-files chatgpt-enterprise-usage-report/proj-topics chatgpt-enterprise-usage-report/proj-author" arrows/>
    <b-why>El resumen agrupa los proyectos por significado y muestra las tareas concretas que la gente ejecuta en proyectos permanentes. Para las entrevistas con clientes es una lista lista para usar: qué tareas tratar y con quién. <b>Decisión:</b> qué tareas y los proyectos de quién cubrir primero en las entrevistas.</b-why>
    <b-table>
      <table><thead>
      <tr><th>Tema</th><th class="bk-table-r">Proyectos</th><th>Tareas</th><th>Pregunta para el autor</th></tr>
      </thead><tbody>
      <tr><td>Ventas<b-cell-sub>Biblioteca de pitches · Elif Demir</b-cell-sub></td><td class="bk-table-r">11</td><td>pitches, manejo de objeciones, propuestas comerciales</td><td><b-cell-quote>«¿Qué parte de un pitch hace bien el modelo y qué reescribes?»</b-cell-quote></td></tr>
      <tr><td>Incorporación<b-cell-sub>Guía para nuevos empleados · Rafael Costa</b-cell-sub></td><td class="bk-table-r">8</td><td>guías para recién llegados, respuestas a preguntas típicas</td><td><b-cell-quote>«¿Qué preguntas de los recién llegados resuelve ya el modelo sin ti?»</b-cell-quote></td></tr>
      <tr><td>Estudio de mercado<b-cell-sub>Notas sobre competidores · Jonas Keller</b-cell-sub></td><td class="bk-table-r">5</td><td>resúmenes de competidores, comparaciones de precios</td><td><b-cell-quote>«¿De dónde sacas los datos y con qué rapidez caducan?»</b-cell-quote></td></tr>
      </tbody></table>
    </b-table>
    <b-cap>Fuente: <a href="https://chatgpt.com/admin/usage/projects" target="_blank" rel="noopener">Proyectos</a> · nombres agrupados por significado</b-cap>
    <b-finding>
      <ex>Ventas (11) e incorporación (8) tienen más proyectos permanentes. Los autores de los proyectos más grandes son las primeras personas a entrevistar.</ex>
      <gen>Un proyecto es una base de conocimiento: archivos e instrucciones en los que el modelo se apoya en cada respuesta. Cuanto más completa la base, más precisos y estables los resultados. Lo que contiene un proyecto sugiere qué preguntar en una entrevista: qué archivos se añadieron, qué falta y dónde las respuestas aún necesitan corrección.</gen>
      <do>Abre los tres proyectos más activos de cada tema y haz una lista de las tareas concretas. En la entrevista, hazle al autor la pregunta de la tabla y pregunta qué archivos e instrucciones cambiaron más la calidad de las respuestas. Convierte una configuración de proyecto exitosa en una plantilla para ese tema.</do>
    </b-finding>
  </b-subsection>
</b-chapter>
<b-chapter id="layer3" icon="check-circle-alt-iv" title="Verificación">

  <b>Objetivo:</b> comprobar los resúmenes con las exportaciones en bruto, la lista de proyectos y el ranking. Cualquier número del informe se puede rastrear hasta su fila de origen en una exportación.

  <b-subsection title="Lista completa de proyectos">
    <b-why>Todos los proyectos con autor y estado. Esta lista sirve para verificar el resumen por temas y para encontrar al autor de un proyecto concreto.</b-why>
    <b-table>
      <table><thead>
      <tr><th>Proyecto</th><th>Autor</th><th>Estado</th><th class="bk-table-r">Msgs</th></tr>
      </thead><tbody>
      <tr><td>Pitch library</td><td>Elif Demir</td><td><b-status-dot color="c-work">activo</b-status-dot></td><td class="bk-table-r">268</td></tr>
      <tr><td>Price list 2026</td><td>Oskar Berg</td><td><b-status-dot color="c-work">activo</b-status-dot></td><td class="bk-table-r">64</td></tr>
      <tr><td>Personal draft</td><td>Pavel Novak</td><td><b-status-dot color="c-none">abandonado</b-status-dot></td><td class="bk-table-r">0</td></tr>
      </tbody></table>
    </b-table>
    <b-cap>Fuente: <a href="https://chatgpt.com/admin/usage/projects" target="_blank" rel="noopener">Proyectos</a></b-cap>
    <b-finding>
      <ex>El proyecto «Personal draft» tiene cero mensajes.</ex>
      <gen>Un proyecto vacío es un intento abandonado: la persona empezó, pero la herramienta nunca pasó a formar parte de su trabajo. Si esos proyectos se quedan en el recuento, el resumen por temas exagera el uso.</gen>
      <do>Filtra los proyectos con cero mensajes antes de contar e invita a 2–3 de sus autores: el motivo por el que lo dejaron es una respuesta valiosa.</do>
    </b-finding>
  </b-subsection>
  <b-subsection title="Ranking">
    <b-why>La exportación de facturación por persona y producto. De ella se calculan las herramientas principales y los tops.</b-why>
    <b-table>
      <table><thead>
      <tr><th>Nombre</th><th>Email</th><th class="bk-table-r">Créditos</th><th class="bk-table-r">$</th></tr>
      </thead><tbody>
      <tr><td>Hana Sato</td><td>hana@example.com</td><td class="bk-table-r">10,955</td><td class="bk-table-r">438.20</td></tr>
      <tr><td>Mira Castellano</td><td>mira@example.com</td><td class="bk-table-r">2,425</td><td class="bk-table-r">97.00</td></tr>
      <tr><td>Jonas Keller</td><td>jonas@example.com</td><td class="bk-table-r">470</td><td class="bk-table-r">18.80</td></tr>
      </tbody></table>
    </b-table>
    <b-cap>Fuente: <a href="https://admin.openai.com" target="_blank" rel="noopener">Ranking</a> · tres exportaciones con distintos filtros «Product»</b-cap>
    <b-finding>
      <ex>Las tres exportaciones por producto suman el gasto total de cada persona de la lista.</ex>
      <gen>Las tres exportaciones con distintos filtros Product suman el gasto total de cada persona. Una diferencia superior al 2% significa que una exportación está incompleta o que los periodos no coinciden.</gen>
      <do>Antes de compartir el informe, suma las tres exportaciones por persona y compáralas con el gasto total. Si difieren, vuelve a exportar los datos del mismo periodo.</do>
    </b-finding>
  </b-subsection>
</b-chapter>
<b-chapter id="layer4" icon="target" title="Selección de personas">

  <b>Objetivo:</b> nombrar personas concretas para cada forma de resolver tareas.

  <b-subsection id="candidates" title="Candidatos a entrevista">
    <b-why>Una lista corta de personas para cada dirección encontrada. En el ejemplo la lista final es de 16 personas de 340; la tabla muestra las tres primeras. Cada empresa tendrá su propio número. El informe de ChatGPT es una de las fuentes de la muestra: los usuarios de otras herramientas y quienes lo dejaron se añaden según las reglas de <a href="/blog/who-to-interview-before-buying-ai-tools/#groups">«A quién entrevistar»</a>, y la comprobación en todos los empleados se hace con un <a href="/blog/ai-interviews-without-leading-questions/#form">cuestionario</a>.</b-why>
    <b-table>
      <table><thead>
      <tr><th>Persona</th><th>Dirección</th><th class="bk-table-r">Señal</th></tr>
      </thead><tbody>
      <tr><td>Hana Sato</td><td><b-status-dot color="c-code">código</b-status-dot></td><td class="bk-table-r">$438 / 3 meses</td></tr>
      <tr><td>Mira Castellano</td><td><b-status-dot color="c-work">tareas con agentes</b-status-dot></td><td class="bk-table-r">$97 / 3 meses</td></tr>
      <tr><td>Jonas Keller</td><td><b-status-dot color="c-chat">investigación</b-status-dot></td><td class="bk-table-r">3,200+ msgs</td></tr>
      </tbody></table>
    </b-table>
    <b-cap>Fuente: las exportaciones de usuarios, ranking y proyectos, unidas por email</b-cap>
    <b-finding>
      <ex>Hana Sato, Mira Castellano y Jonas Keller representan tres formas distintas de trabajar: código, tareas con agentes e investigación.</ex>
      <gen>La lista corta tiene una persona por dirección: código, tareas con agentes, investigación. Así cada conversación muestra su propia forma de trabajar y no repite otra.</gen>
      <do>Programa tres entrevistas, una por dirección. Después decide qué dirección necesita 2–3 personas más.</do>
    </b-finding>
  </b-subsection>
  <b-subsection id="people" title="Tabla de todas las personas">
    <b-why>Todos, con filtros por equipo, actividad, dirección y herramienta principal.</b-why>
    <b-filter-chips>
      <f>Equipo B</f>
      <f>Actividad: cada semana</f>
      <f on>Herramienta: Work</f>
    </b-filter-chips>
    <b-table>
      <table><thead>
      <tr><th>Persona</th><th>Equipo</th><th>Chat / Work</th><th class="bk-table-r">$ / 3 meses</th></tr>
      </thead><tbody>
      <tr><td>Tomás Reid</td><td>Equipo B</td><td><b-split-bar parts="c-chat:28% c-work:72%"/></td><td class="bk-table-r">112.00</td></tr>
      <tr><td>Mira Castellano</td><td>Equipo B</td><td><b-split-bar parts="c-chat:35% c-work:65%"/></td><td class="bk-table-r">97.00</td></tr>
      </tbody></table>
    </b-table>
    <b-cap>Fuente: las exportaciones de usuarios, ranking y proyectos, unidas por email</b-cap>
    <b-finding>
      <ex>Los filtros «Equipo B» y «Herramienta: Work» dejaron a dos personas: Mira Castellano y Tomás Reid.</ex>
      <gen>Una tabla de todas las personas con filtros por equipo, actividad y herramienta principal es la base de cualquier muestra posterior: una lista para una pregunta nueva no necesita una nueva exportación.</gen>
      <do>Guarda cada conjunto de filtros como una vista de tabla distinta para que la siguiente lista cueste un clic.</do>
    </b-finding>
  </b-subsection>
</b-chapter>
<b-chapter id="start" title="Por dónde empezar hoy">

  No necesitas todo el informe de golpe: el primer resultado útil, una lista de los usuarios más activos, aparece tras el segundo punto.

  <b-checklist>
    <item t="Exporta usuarios y ranking de tres meses">El ranking, tres veces, una por producto. Un agente de navegador puede hacer la exportación<b-link-chips><item href="https://claude.com/claude-in-chrome" icon="arrow-up-right">Claude in Chrome</item><item href="https://support.google.com/gemini/answer/16821166" icon="arrow-up-right">Gemini in Chrome</item><item href="https://www.perplexity.ai/comet" icon="arrow-up-right">Perplexity Comet</item></b-link-chips></item>
    <item t="Calcula las herramientas principales y el top por importe">Ya está la primera lista de los usuarios más activos</item>
    <item t="Calcula la profundidad de adopción">Al menos una vez / con regularidad / cada semana, contando aparte a quienes trabajan solo con Codex</item>
    <item t="Haz una lista de personas y programa las entrevistas">Cómo elegir a estas personas se explica en «A quién entrevistar»</item>
  </b-checklist>
</b-chapter>
<b-chapter id="faq" icon="chat" title="Preguntas frecuentes">
  <b-faq-cards>
    <q t="¿Qué muestra la consola de administración de ChatGPT Enterprise?">Usuarios, ranking, proyectos, un resumen y tareas. Con ellos se construyen la profundidad de adopción, la coherencia entre equipos y la naturaleza del trabajo.</q>
    <q t="¿Cómo saber si hacen falta más licencias?">Por la profundidad de adopción: cuántas personas la usan al menos una vez, con regularidad y cada semana. La referencia para una adopción amplia es entre el 50% y el 70% de los empleados.</q>
    <q t="¿Qué significa una gran diferencia entre equipos?">Ya existen escenarios de trabajo, pero viven en uno o dos equipos. Compensa más extenderlos a otros equipos que comprar algo nuevo.</q>
    <q t="¿A quién entrevistar después del informe?">A personas de cada dirección encontrada: 16 de 340 en el ejemplo, incluidas quienes usan otro software o lo dejaron.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Para seguir leyendo">
  <b-links>
    <item href="/blog/who-to-interview-before-buying-ai-tools/" k="Entrevistas" t="A quién entrevistar">Cómo construir una muestra de entrevistas a partir de la tabla de personas</item>
    <item href="/blog/ai-interviews-without-leading-questions/" k="Entrevistas" t="Cómo entrevistar a las personas sobre su uso de IA">Una llamada, una encuesta y una tabla de Airtable</item>
  </b-links>
</b-chapter>
<b-footer>Todos los nombres, equipos, direcciones y números de los ejemplos son ficticios.</b-footer>
</b-post>
