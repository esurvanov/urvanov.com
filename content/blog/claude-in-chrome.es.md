---
title: Claude Code en Chrome: cómo prueba el agente un sitio en el navegador, depuración y formularios con tu sesión iniciada
date: 2026-10-05
updated: 2026-11-13
description: Claude in Chrome conecta Claude Code con el navegador: el agente abre pestañas, lee la consola, ejecuta escenarios y rellena formularios con tu sesión iniciada. Cómo conectarlo, qué hace y qué permisos dar.
tags: IA, agentes, Claude Code, Claude in Chrome, navegador, QA, harness
category: harness
layout: wide
mentions: Claude in Chrome, Claude Code, Chrome extension, browser automation, MCP, permissions, QA, Puppeteer, token cost
toc: what=Qué es | connect=Conexión | gives=Qué hace | qa=Ejemplo | risks=Permisos y riesgos | tradeoff=Precio de la flexibilidad | custom=Script propio | first=Por dónde empezar | faq=Preguntas | next=Siguiente
---

Claude Code prueba un sitio en el navegador mediante la extensión Claude in Chrome: iniciado con `claude --chrome`, el agente abre tu sitio en una pestaña, recorre un escenario, rellena formularios y lee la consola con tu sesión iniciada, y luego corrige el código que falló. Hace falta un plan de pago de Claude. La extensión en sí está descrita en el [glosario](/materials/glossary/claude-in-chrome/). Abajo: conexión, qué puede hacer el agente y qué permisos darle.

<b-post series="harness">

<b-chapter id="what" icon="monitor" title="Qué es Claude in Chrome">
  <b-why>Una extensión de Chrome conecta Claude Code con el navegador. El agente abre pestañas nuevas y trabaja en una ventana visible<b-proof href="https://code.claude.com/docs/en/chrome" quote="Browser actions run in a visible Chrome window in real time."/>.</b-why>
  <iso-art name="claude-in-chrome/terminal-to-browser"></iso-art>
  <b-why align="left">La imagen muestra tres participantes de izquierda a derecha: Claude Code en la terminal, la extensión y tu navegador. El agente da órdenes a la extensión (abrir una pestaña, hacer clic, leer la página), y la extensión las ejecuta en el navegador donde ya has iniciado sesión en tus servicios. Así el agente no necesita escribir contraseñas: tu sesión ya está abierta<b-proof href="https://code.claude.com/docs/en/chrome" quote="shares your browser's login state"/>. El trabajo ocurre en una ventana visible y puedes seguir los pasos.</b-why>
  <b-why align="left">Las etiquetas de abajo muestran con qué navegadores funciona la extensión. Chrome y Edge tienen soporte oficial<b-proof href="https://code.claude.com/docs/en/chrome" quote="Chrome integration works with Google Chrome and Microsoft Edge."/>. Brave, Arc, Vivaldi y Opera están construidos sobre el mismo motor Chromium: Claude Code encuentra la extensión en ellos y se conecta<b-proof href="https://code.claude.com/docs/en/chrome" quote="Claude Code also detects the extension and sets up the connection in other Chromium-based browsers"/>. La última etiqueta, «WSL: no», significa que esta conexión no funciona en el Subsistema de Windows para Linux (WSL)<b-proof href="https://code.claude.com/docs/en/chrome" quote="Chrome integration isn't supported in Windows Subsystem for Linux (WSL)."/>.</b-why>
  <b-pills>
    <pill>Chrome</pill>
    <pill>Edge</pill>
    <pill>Brave</pill>
    <pill>Arc</pill>
    <pill>Vivaldi</pill>
    <pill>Opera</pill>
    <pill>WSL: no</pill>
  </b-pills>
  <b-finding>
    <ex>El agente en la terminal maneja las pestañas de Chrome mediante la extensión y usa tus sesiones iniciadas.</ex>
    <gen>Las acciones se ven en la ventana en tiempo real. Ante una página de inicio de sesión o un CAPTCHA el agente se detiene y te espera. En Claude Code la extensión aparece como el servidor MCP claude-in-chrome: /mcp muestra sus herramientas.</gen>
    <do k="Qué hacer">Comprueba los requisitos: extensión en la versión 1.0.36 o posterior<b-proof href="https://code.claude.com/docs/en/chrome" quote="version 1.0.36 or later"/>, Claude Code, un plan Pro, Max, Ultra, Team o Enterprise<b-proof href="https://code.claude.com/docs/en/chrome" quote="A direct Anthropic plan (Pro, Max, Ultra, Team, or Enterprise)"/>, e inicio de sesión con /login<b-proof href="https://code.claude.com/docs/en/chrome" quote="Chrome integration also requires signing in with"/>.</do>
  </b-finding>
</b-chapter>

<b-chapter id="connect" icon="plug" title="Cómo conectarlo">
  <b-say-agent title="Dile al agente">Instala Claude in Chrome y conéctalo a Claude Code.</b-say-agent>
  <b-why align="left">Si falta la extensión, Claude Code ofrece instalarla<b-proof href="https://code.claude.com/docs/en/chrome" quote="Claude Code shows an install prompt titled"/>: aceptas e inicias sesión desde el navegador. [Si el agente te pide hacerlo a ti](/blog/agent-hands-work-back-to-you/).</b-why>
  <b-spoiler summary="Cómo hacerlo a mano">
    <b-why align="left">Conectar lleva tres pasos. Paso 1: instalar la extensión de Claude en tu Chrome desde la tienda de extensiones, una sola vez. Paso 2: en la terminal donde se ejecuta Claude Code, iniciar claude --chrome, y el agente se enlaza con el navegador. Paso 3: escribir /chrome y mirar el estado: si dice «Enabled», el enlace funciona.</b-why>
    <iso-art name="claude-in-chrome/setup-steps"></iso-art>
    <b-codebox copy>
      claude --chrome
      /chrome   # status, permissions, reconnect
    </b-codebox>

<a href="https://chromewebstore.google.com/detail/claude/fcoeoabgfenejglbffodgkkbkcdhcgfn" target="_blank" rel="noopener">Extensión en Chrome Web Store</a>. Para no usar la opción, abre /chrome y activa «Enabled by default». Entonces las herramientas del navegador están siempre en el contexto y el consumo de tokens crece<b-proof href="https://code.claude.com/docs/en/chrome" quote="Enabling Chrome by default increases context usage since the browser tools and their instructions are always loaded."/>. En VS Code, el navegador se conecta escribiendo @browser en el cuadro de mensaje, y «Enabled by default» es común a la terminal y a VS Code<b-proof href="https://code.claude.com/docs/en/chrome" quote="The two share one setting, so turning it on in either place turns it on for both the CLI and VS Code."/>.

    <b-spoiler summary="Si no se conecta">
      <b-node-grid min="170">
        <node icon="check" t="La extensión está activa">en la página chrome://extensions</node>
        <node icon="play" t="Chrome está abierto">y Claude Code está actualizado</node>
        <node icon="refresh-cw" t="Reconectar">el comando /chrome, opción Reconnect extension</node>
        <node icon="monitor-screen" t="La primera vez">reinicia Chrome tras instalar</node>
      </b-node-grid>
    </b-spoiler>
  </b-spoiler>
  <b-finding>
    <ex>El agente instala la extensión por sí mismo y la conecta a Claude Code. Tú solo aceptas e inicias sesión desde el navegador.</ex>
    <gen>Conectar lleva minutos: la extensión viene de Chrome Web Store, y Claude Code hace el resto.</gen>
    <do k="Qué hacer">Dile al agente que instale la extensión y comprueba que /chrome muestra «Status: Enabled» y «Extension: Installed»<b-proof href="https://code.claude.com/docs/en/chrome" quote="The integration is working when the status panel shows"/>.</do>
  </b-finding>
</b-chapter>

<b-chapter id="gives" icon="grid-alt" title="Qué puede hacer el agente en el navegador">
  <b-why align="left">En el centro de la imagen está el navegador, y alrededor cuatro tipos de trabajo que el agente hace dentro de él.</b-why>
  <iso-art name="claude-in-chrome/browser-uses"></iso-art>
  <b-why align="left">Primero: leer la consola y la página, que es como se encuentra la causa de un error. Segundo: ejecutar escenarios y rellenar formularios, lo que comprueba que el camino funciona. Tercero: trabajar con documentos bajo tu sesión, es decir, con lo que no se puede abrir sin iniciar sesión. Cuarto: extraer datos y grabar un GIF para que quede un rastro que comprobar. No hace falta escribir código para cada cosa pequeña: planteas la tarea con palabras y el agente encuentra por sí mismo los botones y campos.</b-why>
  <b-finding>
    <ex>Una sola conexión cubre depuración, pruebas, formularios, documentos y extracción de datos.</ex>
    <gen>El agente lee la consola y el DOM, ejecuta escenarios, rellena formularios, sube archivos (hasta 10 MB en total<b-proof href="https://code.claude.com/docs/en/chrome" quote="a single upload can include up to 10 MB of files in total"/>) y graba GIF<b-proof href="https://code.claude.com/docs/en/chrome" quote="record browser interactions as GIFs"/>.</gen>
    <do k="Qué hacer">Elige una tarea repetitiva del navegador y encárgasela al agente.</do>
  </b-finding>
</b-chapter>

<b-chapter id="qa" icon="bug" title="Ejemplo: un error en el entorno de pruebas">
  <b-why>El ticket PAY-142 del artículo [sobre QA con un agente](/blog/bug-report-to-reproduction-agent/): el agente recorre el camino por sí mismo y trae pruebas.</b-why>
  <b-say-agent title="Dile al agente">Abre el entorno de pruebas, añade un artículo al carrito, aplica el código promocional y paga con una tarjeta de prueba. Si el pago falla, mira la consola y graba un GIF del camino.</b-say-agent>
  <b-why align="left">A continuación, el ejemplo del artículo de QA: el ticket PAY-142 y el camino del agente hasta un resultado terminado.</b-why>
  <iso-art name="claude-in-chrome/ticket-to-report"></iso-art>
  <b-why align="left">La imagen muestra el camino del ticket al resultado. El ticket llega al agente, el agente recorre en el navegador el carrito, el código promocional y el pago, encuentra el error en la consola y graba un GIF. QA recibe no un relato sino un rastro verificable: el texto de la consola y una grabación del recorrido por la página. Si la grabación y la consola no coinciden con el informe, se nota enseguida.</b-why>
  <b-finding>
    <ex>El agente recorre el camino, encuentra el error de la consola y graba un GIF para el ticket.</ex>
    <gen>La ventana es visible, así que QA sigue los pasos y puede detener al agente. El texto de la consola y el GIF dejan un rastro comprobable.</gen>
    <do k="Qué hacer">Pide un GIF y un extracto de la consola con cada resultado.</do>
  </b-finding>
</b-chapter>

<b-chapter id="risks" icon="shield-check" title="Permisos y riesgos">
  <b-why align="left">El agente trabaja dentro de tu navegador, así que todo aquello en lo que tienes la sesión iniciada está a su alcance. La primera línea de defensa en la imagen es la lista de sitios permitidos y la solicitud de permiso en los nuevos.</b-why>
  <iso-art name="claude-in-chrome/site-permissions"></iso-art>
  <b-why align="left">A la izquierda de la imagen decides tú: el agente pregunta «¿permitir?». En el centro están los sitios A y B, que permitiste y donde el agente trabaja. A la derecha está el sitio C, cerrado al agente. Una acción en un sitio nuevo empieza con tu consentimiento. Abajo están las reglas una por una: qué ve el agente, dónde se detiene y qué mirar antes de enviar una grabación.</b-why>
  <b-rules sw="1.8">
    <rule icon="lines" t="Sitios">La configuración de la extensión controla en qué sitios puede navegar, hacer clic y escribir el agente.</rule>
    <rule icon="bell" t="Solicitud">El cuadro «Claude in Chrome wants to» permite una acción o todo el sitio durante la sesión.</rule>
    <rule icon="key" t="Tus sesiones">El agente puede llegar a todo aquello en lo que tienes la sesión iniciada en este navegador.</rule>
    <rule icon="pause" t="Inicio de sesión y CAPTCHA">El agente se detiene y te espera.</rule>
    <rule icon="video" t="GIF">La grabación incluye todo lo visible, también los datos de la cuenta: revísala antes de compartirla.</rule>
    <rule icon="ban" t="Cuadros de diálogo">Los cuadros alert, confirm y prompt bloquean los comandos: ciérralos a mano y pide al agente que continúe.</rule>
  </b-rules>
  <b-why align="left">Cada una de estas reglas está en la documentación de Claude Code. El agente se detiene ante un inicio de sesión y un CAPTCHA<b-proof href="https://code.claude.com/docs/en/chrome" quote="When Claude encounters a login page or CAPTCHA, it pauses and asks you to handle it manually."/>. La solicitud de permiso empieza con «Claude in Chrome wants to»<b-proof href="https://code.claude.com/docs/en/chrome" quote="The dialog starts with"/>. Una grabación en GIF captura todo lo visible, incluidos los datos de la cuenta<b-proof href="https://code.claude.com/docs/en/chrome" quote="The recording captures everything visible in the browser, including account details on logged-in pages"/>. Los cuadros alert, confirm y prompt bloquean los comandos<b-proof href="https://code.claude.com/docs/en/chrome" quote="JavaScript dialogs block browser events and prevent Claude from receiving commands."/>. La lista de sitios se define en la configuración de la extensión<b-proof href="https://code.claude.com/docs/en/chrome" quote="Manage permissions in the Chrome extension settings to control which sites Claude can browse, click, and type on."/>.</b-why>
  <b-cap>El texto de una página puede estar dirigido al agente. Este riesgo se trata en [un artículo aparte](/blog/data-plane-control-plane-prompt-injection/).</b-cap>
  <b-finding>
    <ex>Los sitios permitidos están abiertos al agente, el resto sigue cerrado, y las acciones en un sitio nuevo necesitan tu consentimiento.</ex>
    <gen>El agente trabaja con tus sesiones iniciadas, así que los permisos por sitio son la primera línea de defensa.</gen>
    <do k="Qué hacer">Abre la configuración de la extensión y deja solo los sitios que necesita la tarea.</do>
  </b-finding>
</b-chapter>

<b-chapter id="tradeoff" icon="scales" title="El precio de la flexibilidad: más lento que un script y con riesgo de error">
  <b-why align="left">Un agente en el navegador funciona de otra manera que un script o un programa escrito. Un script ejecuta los mismos pasos rápido e idénticos. En cada paso, el agente lee la página, piensa y decide qué hacer a continuación, así que es más lento y gasta tokens. Puede equivocarse: pulsar el botón equivocado o contar lo que no está en la página, es decir, [alucinar](/materials/glossary/hallucination/). A cambio, se las arregla con una tarea que no se puede describir de antemano en código: la página cambió, un botón se movió, la tarea está planteada con palabras. Es el precio de la flexibilidad, y conviene pagarlo a sabiendas.</b-why>
  <b-table id="agent-vs-script">

| | Script | Agente en el navegador |
|---|---|---|
| Velocidad | rápido, los mismos pasos | más lento: lee y piensa en cada paso |
| Repetibilidad | el mismo resultado cada vez | la respuesta puede variar de una ejecución a otra |
| Si la página cambió | se rompe hasta que se arregla | se adapta, pero puede equivocarse o inventar |
| Preparación | hay que escribir y mantener código | basta con describir la tarea con palabras |
| Dónde encaja | trabajo regular y masivo | trabajo puntual, reconocimiento, páginas inusuales |

  </b-table>
  <b-why align="left">Hay además una observación del autor. Los servicios con fama de estrictos con la automatización, LinkedIn por ejemplo, suelen tratar a un agente en un navegador real con más calma que a los scripts y scrapers: las acciones vienen de tu ventana, con tu sesión, al ritmo de una persona. Esto no da ninguna garantía. Las reglas de esos servicios suelen prohibir las acciones automatizadas, y el riesgo de que bloqueen la cuenta sigue siendo tuyo. Por eso, encarga al agente lo que harías a mano, en porciones pequeñas y comprobando el resultado.</b-why>
  <b-cap>La velocidad, los errores del agente y cómo reaccionan los servicios se describen según las observaciones del autor: la documentación de Claude Code no los cubre.</b-cap>
  <b-finding>
    <ex>El agente es más lento que un script y puede equivocarse, pero se las arregla donde habría que reescribir un script.</ex>
    <gen>Se cambia velocidad y repetibilidad por flexibilidad. Un rastro verificable (consola, GIF, texto del resultado) devuelve el control sobre los errores.</gen>
    <do k="Qué hacer">Para trabajo puntual e inusual usa el agente; para trabajo masivo y regular escribe un script. Compara el resultado del agente con lo que ves tú mismo.</do>
  </b-finding>
</b-chapter>

<b-chapter id="custom" icon="boxes-route" title="Cuándo hace falta un script propio">
  <b-why align="left">Claude in Chrome sirve para trabajo puntual, pero las tareas de producción suelen necesitar un script propio.</b-why>
  <b-rules sw="1.8">
    <rule icon="code" t="Puppeteer">Una biblioteca que maneja el navegador desde código: abrir una página, hacer clic, sacar lo que necesitas. Funciona sin un agente en cada paso.</rule>
    <rule icon="page-lines" t="Página entera">Claude Code toma la página entera: texto, elementos, capturas de pantalla. Es cómodo para una tarea puntual.</rule>
    <rule icon="coin" t="Tokens y velocidad">Cuanto mayor es la página, más tokens cuesta cada paso: más lento y más caro.</rule>
    <rule icon="boxes-route" t="Tu propio script">Una solución a medida toma solo la parte del sitio o de la página que necesitas: una tabla, un formulario, un bloque. El agente recibe un resultado corto.</rule>
    <rule icon="scales" t="Qué elegir">Tareas puntuales y exploración: Claude in Chrome. Trabajo regular y de gran volumen con presupuesto de tokens: tu propio script al que el agente llama como herramienta.</rule>
  </b-rules>
  <b-cap>El script se puede conectar al agente mediante [MCP](/blog/mcp-agent-access/) o una skill: el agente pide el trozo de página que necesita en lugar de abrirla entera.</b-cap>
  <b-finding>
    <ex>El agente lee la página entera y gasta tokens y tiempo en ello.</ex>
    <gen>En producción importan los tokens y la velocidad, así que solo se toman las partes necesarias de los sitios y las páginas.</gen>
    <do k="Qué hacer">Deja el trabajo puntual a Claude in Chrome. Pasa el trabajo repetido a un script de Puppeteer y dáselo al agente.</do>
  </b-finding>
</b-chapter>

<b-chapter id="first" icon="flag" title="Por dónde empezar">
  <b-why align="left">Los tres pasos repiten el inicio del artículo: extensión, arranque, comprobación.</b-why>
  <iso-art name="claude-in-chrome/start-steps"></iso-art>
  <b-why align="left">Para el primer arranque, usa un entorno local o de pruebas: si el agente se equivoca, no se daña nada. Primero pídele solo que lea (abrir una página y contarla), y después permite acciones. Así se notan los errores del agente en una tarea segura.</b-why>
  <b-finding>
    <ex>Tres pasos: extensión, arranque, comprobación.</ex>
    <gen>Empieza con un entorno local: un error allí no rompe nada.</gen>
    <do k="Qué hacer">Hoy mismo, dile al agente que instale la extensión y comprueba el estado con /chrome.</do>
  </b-finding>
</b-chapter>

<b-chapter id="faq" icon="chat" title="Preguntas frecuentes">
  <b-faq-cards>
    <q t="¿Cómo se conecta Claude in Chrome?">Instala la extensión desde Chrome Web Store, y Claude Code hace el resto. Lleva minutos.</q>
    <q t="¿Qué puede hacer el agente en el navegador?">Lee la consola y el marcado de la página, recorre escenarios, rellena formularios, sube archivos de hasta 10 MB en total y graba GIF.</q>
    <q t="¿Es seguro dar el navegador a un agente?">Las acciones se ven en la ventana en tiempo real, y ante una página de inicio de sesión o un captcha el agente se detiene y te espera. Los permisos y riesgos se tratan por separado en el artículo.</q>
    <q t="¿Cuándo es mejor un script?">Un agente en el navegador es más lento que un script y puede cometer errores. Para comprobaciones repetidas donde importan la velocidad y la precisión, escribe un script.</q>
  </b-faq-cards>
</b-chapter>

<b-chapter id="next" title="Siguiente">
  <b-links>
    <item href="/blog/bug-report-to-reproduction-agent/" k="Ejemplo" t="Cómo hacer QA con un agente de IA tras el soporte: investigar, describir y documentar mediante MCP y skills">El agente reproduce un error de Jira</item>
    <item href="/blog/mcp-agent-access/" k="Conexión" t="Qué es MCP para un agente de IA: qué problema resuelve y cómo delegar la configuración en el agente">Cómo obtiene el agente acceso a los sistemas</item>
    <item href="/blog/agent-hands-work-back-to-you/" k="Traspaso" t="¿Te quitará el trabajo un agente de IA?: depende de quién carga trabajo sobre quién, tú sobre los agentes o los agentes sobre ti">Cuando el agente pide ayuda a una persona</item>
  </b-links>
</b-chapter>
<b-footer>El ticket PAY-142 es inventado para el ejemplo. Los datos sobre la conexión y los permisos siguen la documentación de Claude Code: <a href="https://code.claude.com/docs/en/chrome" target="_blank" rel="noopener">Use Claude Code with Chrome</a>.</b-footer>
</b-post>
