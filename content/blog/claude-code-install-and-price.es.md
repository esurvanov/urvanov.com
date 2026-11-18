---
title: Claude Code: cómo instalarlo y cuánto cuesta, planes y disponibilidad por país
seoTitle: Claude Code: cómo instalarlo y cuánto cuesta en 2026
date: 2026-11-17
updated: 2026-11-18
description: Instala Claude Code en Mac, Linux o Windows, mira qué incluyen Pro, Max, Ultra y Team, si hace falta clave de API y si funciona desde Rusia. Comandos y errores.
tags: IA, Claude Code, instalación, precio, planes, harness
category: harness
layout: wide
mentions: Claude Code, OpenCode, Codex, Cursor, Gemini CLI, Antigravity CLI, CLAUDE.md
toc: answer=Respuesta rápida | what=Qué es | install=Instalación | login=Primer inicio | plans=Planes | check=Comprobación | errors=Errores | region=Disponibilidad | alt=Alternativas | prompts=Prompts | faq=Preguntas | next=Seguir leyendo
---

Claude Code se instala con un solo comando en la terminal: en macOS, Linux y WSL, `curl -fsSL https://claude.ai/install.sh | bash`; en Windows, en PowerShell, `irm https://claude.ai/install.ps1 | iex`. Para iniciar sesión hace falta una suscripción de pago: Claude Pro por 20 dólares al mes, Max, Ultra, Team o Enterprise, o una cuenta de Console con cobro por uso de la API; el plan gratuito no sirve.

<b-post series="harness">
<b-chapter id="answer" title="Respuesta rápida" icon="crosshair">
  <b-why>Instalar lleva un comando, y el inicio de sesión se hace en el navegador. Siempre hace falta un acceso de pago: una suscripción o la facturación de la API<b-proof href="https://code.claude.com/docs/en/setup" quote="Claude Code: «Claude Code requires a Pro, Max, Ultra, Team, Enterprise, or Console account. The free claude.ai plan does not include Claude Code access» — code.claude.com/docs/en/setup"/>.</b-why>

  <iso-art name="claude-code-install-and-price/install-flow"></iso-art>
  <b-cap>El camino desde una terminal vacía hasta la primera respuesta: abrir la terminal, pegar el comando, abrir una ventana nueva, comprobar la versión, iniciar sesión en la cuenta.</b-cap>
  <b-sublabel top="18">Qué significa, en palabras sencillas</b-sublabel>

  Claude Code es un agente de programación de Anthropic, la empresa que hace Claude. Trabaja en la terminal, una ventana donde se escriben comandos de texto, lee los archivos de tu proyecto y los edita para cumplir la tarea que le des. Se instala con un comando: copias la línea de tu sistema, la pegas en la terminal y esperas. Después abres la terminal otra vez, compruebas la versión e inicias sesión en tu cuenta de Claude a través del navegador. El acceso es de pago: hace falta una suscripción o una cuenta con cobro por uso de la API. El plan gratuito del chat de Claude sigue siendo gratuito, pero Claude Code no forma parte de él.

  Ejemplo cotidiano. Luka vive en Lisboa y trabaja en un portátil con Ubuntu. Abre la terminal y pega el comando para macOS, Linux y WSL. Durante unos minutos el instalador no muestra nada, y Luka no cierra la ventana. Luego abre una ventana de terminal nueva, escribe <code>claude --version</code> y ve un número de versión con la nota «(Claude Code)». Falta iniciar sesión: Luka ejecuta <code>claude</code> en la carpeta del proyecto, el navegador abre la página de acceso y entra con su suscripción Pro. Portugal está en la lista de países de Anthropic, así que la región no es un obstáculo.

  Error típico: instalar Claude Code con una cuenta gratuita del chat. La instalación termina bien, pero el inicio de sesión no da acceso al agente, porque el plan gratuito no incluye Claude Code. Antes de instalar, decide cómo vas a pagar: una suscripción Pro, Max, Ultra, Team o Enterprise, o la facturación de la API en Console.

  Puedes comprobar la respuesta nada más instalar: el comando <code>claude --version</code> muestra un número de versión y «(Claude Code)». Los precios y las condiciones se comprobaron en la <a href="https://claude.com/pricing">página de precios de Claude</a> y en la <a href="https://code.claude.com/docs/en/setup">página de instalación de Claude Code</a>.
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>Pregunta</th><th>Respuesta a 18.11.2026</th></tr>
    </thead>
    <tbody>
      <tr><td>Cómo instalar</td><td>un comando: uno para macOS, Linux y WSL, otro para Windows PowerShell o CMD</td></tr>
      <tr><td>Precio</td><td>Pro 20 dólares al mes, Max 100, Ultra 200; Team desde 25 dólares por puesto<b-proof href="https://claude.com/pricing" quote="Claude: Pro «$20 if billed monthly», Max «$100», Ultra «$200», Team standard seat «$25 if billed monthly» — claude.com/pricing"/></td></tr>
      <tr><td>Qué planes lo incluyen</td><td>Claude Code está en Pro, Max, Ultra, Team y Enterprise; el plan gratuito no lo incluye</td></tr>
      <tr><td>Disponibilidad</td><td>Rusia no está en la lista oficial de países de Anthropic; los términos nombran a Claude Code entre los productos con esta restricción<b-proof href="https://www.anthropic.com/supported-countries" quote="Anthropic: «Any country or region not listed is unsupported» — anthropic.com/supported-countries"/></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>Fecha de comprobación: 18.11.2026. Los precios y la lista de países cambian: abre otra vez las páginas de Anthropic antes de pagar.</b-cap>
</b-chapter>
<b-chapter id="what" title="Qué es Claude Code" icon="terminal">
  <b-why>Claude Code es un agente de programación de Anthropic. Lee tu proyecto, edita archivos, ejecuta comandos y pruebas, y trabaja con git. El Claude normal del chat responde con texto, mientras que Claude Code cambia por sí mismo los archivos del proyecto.</b-why>

  <iso-art name="term:claude-code"></iso-art>
  <b-links cols="1">
    <item href="/materials/glossary/claude-code/" k="Término" t="Claude Code">Qué puede hacer, dónde se ejecuta, qué modelos usa</item>
  </b-links>
  <b-sublabel top="18">Qué significa, en palabras sencillas</b-sublabel>

  Un agente hace el trabajo por sí mismo: describes la tarea con palabras, y él abre los archivos del proyecto que hacen falta, hace los cambios, ejecuta las comprobaciones y muestra el resultado. Git es un programa que guarda el historial de cambios de un proyecto; Claude Code puede trabajar con él. Las pruebas son comprobaciones que confirman que el programa sigue funcionando tras un cambio; el agente las ejecuta él mismo y lee el resultado.

  Claude Code funciona en la terminal, en VS Code y JetBrains, en la aplicación de escritorio, en el navegador, en Slack y en CI. Este artículo trata de la terminal, que es la forma principal de usarlo<b-proof href="https://code.claude.com/docs/en/quickstart" quote="Claude Code: «Claude Code is also available on the web, as a desktop app, in VS Code and JetBrains IDEs, in Slack, and in CI/CD» — code.claude.com/docs/en/quickstart"/>.

  Ejemplo cotidiano. Rita vive en Riga y lleva una pequeña web con pruebas y un historial de cambios en git. Primero le pregunta a Claude en el chat por qué no funciona un botón y recibe una explicación en texto: el código tiene que arreglarlo ella. Después lanza Claude Code en la carpeta de la web y escribe la misma tarea. El agente encuentra el archivo adecuado, lo edita, ejecuta las pruebas y muestra el cambio. Rita mira la edición en git y la acepta. Letonia está en la lista de países de Anthropic, así que la región no plantea dudas.

  <b>¿Claude Code es el mismo Claude del chat, solo que en la terminal?</b> No. En el chat Claude responde con texto, y los cambios los pasas tú. Claude Code cambia archivos del proyecto y ejecuta comandos: por eso necesita una instalación aparte y solo viene en los planes de pago. Cómo comprobarlo: el plan gratuito no incluye Claude Code, y en la tabla de planes de <a href="https://claude.com/pricing">claude.com/pricing</a> la columna Free dice «Claude Code: No».
</b-chapter>
<b-chapter id="install" title="Instalación paso a paso" icon="arrow-down">
  <b-why>Requisitos: macOS 13+, Windows 10 1809+ o Windows Server 2019+, Ubuntu 20.04+, Debian 10+, Alpine 3.19+; 4 GB de memoria o más, un procesador x64 o ARM64, acceso a internet<b-proof href="https://code.claude.com/docs/en/setup" quote="Claude Code: «macOS 13.0+», «Windows 10 1809+ or Windows Server 2019+», «Ubuntu 20.04+», «4 GB+ RAM» — code.claude.com/docs/en/setup"/>. Los comandos vienen de la página de instalación, fecha de comprobación: 18.11.2026.</b-why>

  <b-sublabel top="18">Qué comando tomar</b-sublabel>

  El comando depende de la ventana donde escribes. En macOS, Linux y en WSL (un entorno Linux dentro de Windows) se usa una sola línea. En Windows hay dos ventanas, PowerShell y CMD, y sus comandos son distintos. Se distinguen por el indicador: en PowerShell empieza por «PS», en CMD no hay «PS». Si tomas el comando de la otra ventana, la instalación no arranca.
  <iso-art name="claude-code-install-and-price/which-shell"></iso-art>
  <b-cap>Tres comandos para tres ventanas: macOS, Linux y WSL; PowerShell con el indicador «PS»; CMD sin «PS».</b-cap>
  <b-sublabel top="18">macOS, Linux y WSL</b-sublabel>
  <b-codebox title="Terminal" copy>
    curl -fsSL https://claude.ai/install.sh | bash
  </b-codebox>
  <b-sublabel top="18">Windows: PowerShell (el indicador lleva PS)</b-sublabel>
  <b-codebox title="PowerShell" copy>
    irm https://claude.ai/install.ps1 | iex
  </b-codebox>
  <b-sublabel top="18">Windows: CMD (el indicador no lleva PS)</b-sublabel>
  <b-codebox title="CMD" copy>
    curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
  </b-codebox>
  <b-cap>El instalador no muestra el progreso mientras descarga archivos. En Windows no hacen falta derechos de administrador. Instalar Git for Windows es opcional: sin él, Claude Code ejecuta los comandos a través de PowerShell<b-proof href="https://code.claude.com/docs/en/setup" quote="Claude Code: «Installing Git for Windows is optional» — code.claude.com/docs/en/setup"/>.</b-cap>

  Ejemplo cotidiano. Jan vive en Gdansk y trabaja en un portátil con Windows. Abre PowerShell y ve «PS» al principio de la línea. Por tanto, necesita el comando <code>irm https://claude.ai/install.ps1 | iex</code>. Jan lo pega y durante unos minutos no ve ni una línea, pero no cierra la ventana: el instalador no muestra el progreso. No necesitó derechos de administrador ni instaló Git for Windows. Al terminar la instalación, Jan abrió PowerShell otra vez y ejecutó <code>claude --version</code>. Polonia está en la lista de países de Anthropic. Para saber si la ventana es la correcta, mira las dos primeras letras del indicador.

  <b-sublabel top="18">Instalador o gestor de paquetes</b-sublabel>

  El instalador, es decir, el comando con <code>curl</code> o <code>irm</code>, es la vía recomendada: actualiza Claude Code por sí solo en segundo plano. Un gestor de paquetes es un programa que instala y actualiza otros programas por su nombre; esta vía también funciona, pero Claude Code hay que actualizarlo a mano. Con npm, instala sin <code>sudo</code>: la documentación advierte de que una instalación así no podrá actualizarse sola<b-proof href="https://code.claude.com/docs/en/setup" quote="Claude Code: «Do NOT use sudo npm install -g as this can lead to permission issues and security risks» — code.claude.com/docs/en/setup"/>.
  <iso-art name="claude-code-install-and-price/install-methods"></iso-art>
  <b-cap>El instalador se actualiza solo, los gestores de paquetes se actualizan a mano: Homebrew, WinGet, npm, apt, dnf, apk.</b-cap>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>Vía</th><th>Comando</th><th>Actualizaciones</th></tr>
    </thead>
    <tbody>
      <tr><td>Instalador (recomendado)</td><td><code>curl -fsSL https://claude.ai/install.sh | bash</code></td><td>automáticas, en segundo plano</td></tr>
      <tr><td>Homebrew (macOS)</td><td><code>brew install --cask claude-code</code></td><td>a mano: <code>brew upgrade claude-code</code></td></tr>
      <tr><td>WinGet (Windows)</td><td><code>winget install Anthropic.ClaudeCode</code></td><td>a mano: <code>winget upgrade Anthropic.ClaudeCode</code></td></tr>
      <tr><td>npm (requiere Node.js 22+)</td><td><code>npm install -g @anthropic-ai/claude-code@latest</code></td><td>repetir el comando de instalación</td></tr>
      <tr><td>apt, dnf, apk</td><td>añadir el repositorio de Anthropic siguiendo las instrucciones de la documentación</td><td>con la actualización normal del sistema</td></tr>
    </tbody>
    </table>
  </b-ctx-table>

  Ejemplo cotidiano. Marco vive en Milán y trabaja en un Mac. Ya instala todos sus programas con Homebrew, así que elige <code>brew install --cask claude-code</code> en lugar del instalador. Todo funciona igual, pero un mes después Marco actualiza Claude Code con <code>brew upgrade claude-code</code>: no se actualizará solo. Italia está en la lista de países de Anthropic. Cómo comprobar la vía de instalación: si lo instaló Homebrew, se actualiza con el mismo Homebrew.

  <b-sublabel top="18">Windows: directamente o con WSL</b-sublabel>

  WSL es un entorno Linux dentro de Windows: Claude Code funciona en él como en un Linux normal. La elección depende del proyecto. Si el proyecto y sus programas son para Windows, instala directamente en Windows. Si necesitas programas de Linux o el aislamiento de comandos (un sandbox, es decir, ejecutar los comandos del agente en un entorno restringido), elige WSL 2. WSL 1 sirve si WSL 2 no está disponible, pero no admite el aislamiento de comandos.
  <iso-art name="claude-code-install-and-price/windows-modes"></iso-art>
  <b-cap>Tres modos en Windows: directo, WSL 2 con aislamiento de comandos, WSL 1 sin aislamiento.</b-cap>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>Opción</th><th>Cuándo elegirla</th><th>Aislamiento de comandos (sandbox)</th></tr>
    </thead>
    <tbody>
      <tr><td>Windows directamente</td><td>proyectos y programas para Windows</td><td>no se admite</td></tr>
      <tr><td>WSL 2</td><td>programas de Linux o aislamiento de comandos</td><td>se admite</td></tr>
      <tr><td>WSL 1</td><td>si WSL 2 no está disponible</td><td>no se admite</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>En WSL ejecutas el comando de Linux dentro de la ventana de WSL, no desde PowerShell<b-proof href="https://code.claude.com/docs/en/setup" quote="Claude Code: «You install and launch claude inside the WSL terminal, not from PowerShell or CMD» — code.claude.com/docs/en/setup"/>. En Alpine hacen falta <code>bash</code> y <code>curl</code> antes de instalar: <code>apk add bash curl</code>.</b-cap>
</b-chapter>
<b-chapter id="login" title="Primer inicio e inicio de sesión" icon="key">
  <b-why>El inicio de sesión se hace en el navegador: Claude Code abre la página por sí mismo, y al entrar la terminal muestra «Login successful»<b-proof href="https://code.claude.com/docs/en/authentication" quote="Claude Code: «When login completes, the terminal shows Login successful and prompts you to press Enter to continue» — code.claude.com/docs/en/authentication"/>.</b-why>

  <b-sublabel top="18">Cómo arrancar</b-sublabel>

  Ve a la carpeta del proyecto y ejecuta <code>claude</code>. El programa abre el navegador, entras en tu cuenta de Claude, y la terminal muestra «Login successful» y la invitación a pulsar Enter. Después ya puedes hacer preguntas sobre el proyecto.
  <b-codebox title="Primer inicio" copy>
    cd path/to/project
    claude
  </b-codebox>
  <b-cap>Si el navegador no se abrió, pulsa <code>c</code>: la dirección de acceso se copia al portapapeles. Para cerrar sesión usa el comando <code>/logout</code> y para entrar otra vez, <code>/login</code>. La ayuda dentro de la sesión es <code>/help</code>.</b-cap>
  <b-sublabel top="18">Con qué se puede iniciar sesión</b-sublabel>

  La forma de entrar depende de cómo pagues. Una suscripción Pro, Max o Ultra se emite a una persona. Team y Enterprise usan la cuenta de un empleado invitado por un administrador. Claude Console es una cuenta aparte con cobro por uso de la API y créditos de prepago. Amazon Bedrock, Google Cloud y Microsoft Foundry sirven a las organizaciones que ya tienen un proveedor de nube.
  <iso-art name="claude-code-install-and-price/login-paths"></iso-art>
  <b-cap>Cuatro caminos de acceso: una suscripción, Team o Enterprise, Console, proveedores de nube.</b-cap>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>Con qué iniciar sesión</th><th>Para quién es</th></tr>
    </thead>
    <tbody>
      <tr><td>Suscripción Pro, Max o Ultra</td><td>una persona, que entra con una cuenta de claude.ai</td></tr>
      <tr><td>Team o Enterprise</td><td>un empleado invitado por un administrador</td></tr>
      <tr><td>Claude Console</td><td>facturación de la API con créditos de prepago</td></tr>
      <tr><td>Amazon Bedrock, Google Cloud, Microsoft Foundry</td><td>organizaciones con un proveedor de nube</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>La lista de cuentas viene de la página de autenticación y de la guía rápida de la documentación<b-proof href="https://code.claude.com/docs/en/quickstart" quote="Claude Code: «Claude Console (API access with pre-paid credits)» — code.claude.com/docs/en/quickstart"/>.</b-cap>

  Ejemplo cotidiano. Emma vive en Viena y compró una suscripción Pro. Va a la carpeta del proyecto, ejecuta <code>claude</code>, y el navegador abre la página de acceso. Emma entra en la misma cuenta de Claude que usa para el chat. La terminal muestra «Login successful», ella pulsa Enter y pregunta: «¿qué hace este proyecto?». Unos segundos después el agente describe el proyecto. Más tarde Emma quiere saber qué cuenta usa el programa y escribe <code>/status</code>; para cambiar de cuenta usa <code>/logout</code> y <code>/login</code>. Austria está en la lista de países de Anthropic, así que la región no es un obstáculo.

  <b>¿La suscripción del chat y Claude Code son dos inicios de sesión distintos?</b> No. Una suscripción Pro, Max o Ultra se emite a una cuenta de claude.ai, y esa misma cuenta abre Claude Code. Comparten un solo límite. Cómo comprobarlo: tras iniciar sesión, escribe <code>/status</code> y mira qué método de acceso aparece.

  <b>¿Basta con una cuenta gratuita de Claude?</b> No. Los requisitos de instalación dicen: «The free claude.ai plan does not include Claude Code access». A Claude Code solo se entra por una vía de pago: una suscripción, Team, Enterprise, Console o un proveedor de nube. Cómo comprobarlo: abre la <a href="https://code.claude.com/docs/en/setup">página de instalación de Claude Code</a> y busca esa frase en los requisitos.
</b-chapter>

<b-chapter id="plans" title="Planes: qué incluyen y cuánto cuestan" icon="coin">
  <b-why>Claude Code viene incluido en los planes de pago Pro, Max, Ultra, Team y Enterprise y no viene en el plan gratuito<b-proof href="https://claude.com/pricing" quote="Claude: Free «Claude Code: No», Pro «$20 if billed monthly», Ultra «10x Pro usage every week», Team premium seat «5x more usage than standard seats» — claude.com/pricing"/>. Los precios y el contenido salen de claude.com/pricing. Fecha de comprobación: 18.11.2026. Los planes cambian, así que abre otra vez la página de precios de Anthropic antes de pagar.</b-why>

  Un plan es una suscripción con un precio mensual fijo y su propia cantidad de uso. Claude Code no tiene un precio aparte: viene con la suscripción, junto con el Claude normal del chat. Cuanto más alto el plan, más uso puedes gastar en una ventana de cinco horas y en una semana. Pro, Max y Ultra son para una persona, los puestos de Team son para un equipo y Enterprise es para una empresa con contrato.
  <iso-art name="claude-code-install-and-price/plans-ladder"></iso-art>
  <b-cap>La escalera de planes: Free sin Claude Code, luego Pro, Max, Ultra, los puestos estándar y premium de Team, y Enterprise por contrato.</b-cap>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>Plan</th><th>Precio al mes</th><th>Claude Code</th><th>Uso</th></tr>
    </thead>
    <tbody>
      <tr><td>Free</td><td>$0</td><td>no</td><td>limitado</td></tr>
      <tr><td>Pro</td><td>$20 con pago mensual, $17 con pago anual ($200 por adelantado)</td><td>sí</td><td>básico</td></tr>
      <tr><td>Max</td><td>$100</td><td>sí</td><td>5 veces Pro</td></tr>
      <tr><td>Ultra</td><td>$200</td><td>sí</td><td>10 veces Pro por semana</td></tr>
      <tr><td>Team, puesto estándar</td><td>$25 al mes, $20 con pago anual</td><td>sí</td><td>el de la suscripción del puesto</td></tr>
      <tr><td>Team, puesto premium</td><td>$125 al mes, $100 con pago anual</td><td>sí</td><td>5 veces un puesto estándar</td></tr>
      <tr><td>Enterprise</td><td>en la página: $20 por puesto al mes con pago anual, desde 20 puestos</td><td>sí</td><td>por contrato</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>Fuente: claude.com/pricing. Fecha de comprobación: 18.11.2026.</b-cap>
  <b-sublabel top="18">Un ejemplo resuelto</b-sublabel>

  Jonas vive en Vilna y quiere probar Claude Code en su propio proyecto. Abre la página de precios y ve la nota «Claude Code: No» junto a Free, así que la opción gratuita queda descartada. Pro cuesta 20 dólares al mes con pago mensual, y eso basta para empezar. El pago anual baja el precio a 17 dólares al mes, pero se cobran 200 dólares de golpe, y Jonas aún no sabe si usará el agente todos los días. Elige el pago mensual. Para comprobar tu propio caso, abre la página de precios y busca la nota de Claude Code en la fila de tu plan.

  <b-sublabel top="18">Límites</b-sublabel>

  Un límite es la cantidad de uso a partir de la cual la suscripción te pide esperar. Pro y Max tienen dos: un límite de sesión de cinco horas y un límite semanal<b-proof href="https://support.claude.com/en/articles/11145838-using-claude-code-with-your-pro-or-max-plan" quote="Claude Help Center: «Pro and Max plans have a five-hour session limit and a weekly limit» — support.claude.com"/>. Ultra tiene un límite semanal, y las cuentas Ultra verificadas no tienen límite de cinco horas. El límite es común para Claude en el chat y Claude Code: si gastaste el uso en el chat, queda menos para el agente.
  <iso-art name="claude-code-install-and-price/limits"></iso-art>
  <b-cap>Dos ventanas de gasto, de cinco horas y semanal; un solo fondo de uso para el chat y Claude Code.</b-cap>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>Plan</th><th>Qué límite</th></tr>
    </thead>
    <tbody>
      <tr><td>Pro y Max</td><td>un límite de sesión de cinco horas y un límite semanal</td></tr>
      <tr><td>Ultra</td><td>un límite semanal; las cuentas Ultra verificadas no tienen límite de cinco horas</td></tr>
      <tr><td>Todas las suscripciones</td><td>el límite es común para Claude en el chat y Claude Code</td></tr>
    </tbody>
    </table>
  </b-ctx-table>

  Cuando se agota el límite, puedes activar el uso extra pagado con créditos o comprar créditos de API a los precios estándar de la API. Para mantenerte dentro de la suscripción, rechaza pagar con créditos. Una semana después Jonas nota que por la tarde el agente le pide esperar: por la mañana habló mucho rato con Claude en el chat, y el uso compartido ya se acabó. Decide no comprar créditos y esperar a la ventana nueva.

  <b-sublabel top="18">Una clave de API en lugar de una suscripción</b-sublabel>

  Una clave de API es una contraseña para programas con la que Claude Code paga cada solicitud a las tarifas de la API. Una suscripción tiene un precio fijo, mientras que una clave se paga por volumen. Si la variable <code>ANTHROPIC_API_KEY</code> está definida en el sistema, Claude Code toma la clave en lugar de la suscripción. Para Jonas fue una sorpresa: la variable se había quedado de otro proyecto, y el gasto iba a tarifas de API aunque su suscripción estaba pagada.
  <iso-art name="claude-code-install-and-price/api-vs-subscription"></iso-art>
  <b-cap>Dos formas de pagar: una suscripción con precio fijo y una clave de API que se paga por volumen. La clave tiene prioridad sobre la suscripción.</b-cap>
  <b-finding>
    <ex>Si la variable <code>ANTHROPIC_API_KEY</code> está definida en el sistema, Claude Code toma la clave en lugar de la suscripción, y el gasto va a tarifas de API.</ex>
    <gen>Una suscripción tiene precio fijo y límites, una clave se paga por volumen. La clave compensa cuando la carga es irregular o necesitas una factura por proyecto.</gen>
    <do>Para volver a la suscripción, elimina la variable (<code>unset ANTHROPIC_API_KEY</code>) y comprueba el método de acceso con el comando <code>/status</code><b-proof href="https://code.claude.com/docs/en/authentication" quote="Claude Code: «Run unset ANTHROPIC_API_KEY to fall back to your subscription, and check /status to confirm which method is active» — code.claude.com/docs/en/authentication"/>.</do>
  </b-finding>

  Los precios por millón de tokens según el modelo no se dan aquí: no los comprobé en la página de precios el 18.11.2026.

  <b-sublabel top="18">Ideas equivocadas frecuentes</b-sublabel>

  <b>¿El plan gratuito da Claude Code?</b> No. La documentación de instalación dice que Claude Code requiere una cuenta Pro, Max, Ultra, Team, Enterprise o Console, y que el plan gratuito de claude.ai no incluye acceso a él<b-proof href="https://code.claude.com/docs/en/setup" quote="Claude Code: «Claude Code requires a Pro, Max, Ultra, Team, Enterprise, or Console account. The free claude.ai plan does not include Claude Code access» — code.claude.com/docs/en/setup"/>. Cómo comprobarlo: abre la página de precios y busca la nota «Claude Code: No» junto a Free.

  <b>¿Una suscripción de pago levanta la restricción regional?</b> No. La lista de países de Anthropic se aplica al uso con independencia del plan y de la forma de pago<b-proof href="https://www.anthropic.com/supported-countries" quote="Anthropic: «Any country or region not listed is unsupported» — anthropic.com/supported-countries"/>. Cómo comprobarlo: busca tu país en la lista de la página de Anthropic.

  <b>¿Una clave de API sale más barata que una suscripción?</b> Depende de la carga. Una suscripción cuesta una suma fija, una clave cobra dinero por volumen, y las tarifas exactas no las comprobé en la página de precios el 18.11.2026. Cómo comprobarlo: compara un mes de gasto en Console con el precio de la suscripción.
</b-chapter>
<b-chapter id="check" title="Cómo comprobar que todo funciona" icon="check-circle">
  <b-why>Una instalación que funciona muestra un número de versión con la nota «(Claude Code)»<b-proof href="https://code.claude.com/docs/en/setup" quote="Claude Code: «A working installation prints a version number such as 2.1.211 (Claude Code)» — code.claude.com/docs/en/setup"/>. Después vienen el diagnóstico, el método de acceso y una primera pregunta sobre el proyecto.</b-why>

  La comprobación son cinco pasos cortos, y cada uno responde a su propia pregunta. La versión muestra que el programa se encuentra y arranca. El diagnóstico reúne un informe sobre la instalación y los ajustes sin iniciar una sesión. El estado dentro de una sesión te dice cómo entraste: con una suscripción o con una clave. Una pregunta sobre el proyecto prueba toda la cadena a la vez: inicio de sesión, red y lectura de archivos. La actualización muestra que la instalación puede recibir versiones nuevas.
  <iso-art name="claude-code-install-and-price/check-ladder"></iso-art>
  <b-cap>La escalera de comprobaciones: versión, diagnóstico, estado, una pregunta sobre el proyecto, actualización.</b-cap>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>Comprobación</th><th>Comando</th><th>Qué debes ver</th></tr>
    </thead>
    <tbody>
      <tr><td>Versión</td><td><code>claude --version</code></td><td>un número de versión y «(Claude Code)»</td></tr>
      <tr><td>Diagnóstico</td><td><code>claude doctor</code></td><td>un informe sobre la instalación y los ajustes sin iniciar una sesión</td></tr>
      <tr><td>Inicio de sesión</td><td><code>/status</code> dentro de una sesión</td><td>el método de acceso: suscripción o clave</td></tr>
      <tr><td>Trabajo con un proyecto</td><td>la pregunta «¿qué hace este proyecto?»</td><td>una descripción breve del proyecto</td></tr>
      <tr><td>Actualización</td><td><code>claude update</code></td><td>«Claude Code is up to date»</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-sublabel top="18">Un ejemplo resuelto</b-sublabel>

  Sarah vive en Dublín y acaba de instalar Claude Code en su portátil. Abre una ventana de terminal nueva y escribe <code>claude --version</code>. Aparece un número de versión con la nota «(Claude Code)», así que el programa se encuentra. Luego ejecuta <code>claude doctor</code> y recibe un informe sobre la instalación. En la carpeta del proyecto ejecuta <code>claude</code>, escribe <code>/status</code> y ve que entró con una suscripción y sin ninguna clave. El último paso es la pregunta «¿qué hace este proyecto?»: una descripción breve del proyecto significa que toda la cadena funciona. Puedes comprobarlo tú mismo en cinco minutos recorriendo las comprobaciones en el orden de la tabla.

  <b-sublabel top="18">Un error frecuente</b-sublabel>

  Quedarse en la versión. Un número de versión solo confirma que el programa se encuentra en PATH. No comprueba el inicio de sesión, la red ni los permisos de archivos. Si la versión se muestra pero la pregunta sobre el proyecto no recibe respuesta, busca la causa en el acceso: revisa <code>/status</code> y ejecuta <code>/login</code> si hace falta.
</b-chapter>
<b-chapter id="errors" title="Errores de instalación frecuentes" icon="alert-circle">
  <b-why>La documentación tiene una solución para cada mensaje de error: la tabla «Find your error» de la página «Troubleshoot installation and login»<b-proof href="https://code.claude.com/docs/en/troubleshoot-install" quote="Claude Code: the “Find your error” table gives a fix for each message — code.claude.com/docs/en/troubleshoot-install"/>. Fecha de comprobación: 18.11.2026.</b-why>

  Un error de instalación se lee en el texto del mensaje: de él pasas a la causa, y de la causa a la acción. Lo más habitual es que la causa sea simple: la carpeta de instalación no está en PATH (la lista de carpetas donde la terminal busca programas), el comando es para otra consola, o faltan permisos o memoria. Los países fuera de la lista admitida son un caso aparte: la tabla lo recoge con las filas sobre el 403 y «App unavailable in region».
  <iso-art name="claude-code-install-and-price/install-errors"></iso-art>
  <b-cap>El árbol de errores: qué ves, cuál es la causa, qué hacer.</b-cap>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>Qué ves</th><th>Causa</th><th>Qué hacer</th></tr>
    </thead>
    <tbody>
      <tr><td><code>command not found: claude</code> o “'claude' is not recognized”</td><td>la carpeta de instalación no está en PATH</td><td>abre una ventana de terminal nueva; en macOS y Linux añade <code>~/.local/bin</code> a PATH</td></tr>
      <tr><td><code>The token '&amp;&amp;' is not a valid statement separator</code></td><td>el comando de CMD se ejecutó en PowerShell</td><td>toma el comando <code>irm … | iex</code></td></tr>
      <tr><td><code>'irm' is not recognized</code></td><td>el comando de PowerShell se ejecutó en CMD</td><td>toma el comando <code>curl … install.cmd</code></td></tr>
      <tr><td><code>syntax error near unexpected token '&lt;'</code></td><td>llegó una página web en lugar del script</td><td>revisa la red y el proxy, abre la parte de soluciones de la documentación</td></tr>
      <tr><td><code>curl: (22) … 403</code></td><td>un proxy o filtro bloquea la dirección, o el país está fuera de la lista admitida</td><td>revisa la red; para la lista de países y qué hacer, lee el <a href="/blog/claude-code-access-regions-vpn-bans/">artículo sobre el acceso por país, las VPN y los bloqueos</a></td></tr>
      <tr><td><code>EACCES: permission denied</code></td><td>no hay permisos sobre la carpeta de instalación</td><td>corrige los permisos de la carpeta, no uses <code>sudo</code></td></tr>
      <tr><td><code>TLS connect error</code></td><td>certificados anticuados o un proxy que inspecciona el tráfico</td><td>actualiza los certificados del sistema</td></tr>
      <tr><td><code>Killed</code> durante la instalación en Linux</td><td>no hay memoria suficiente</td><td>libera memoria o añade swap</td></tr>
      <tr><td><code>App unavailable in region</code></td><td>Claude Code no está disponible en el país</td><td>revisa la lista de países admitidos: <a href="/blog/claude-code-access-regions-vpn-bans/">Claude Code no está disponible en tu país: países admitidos, VPN y bloqueos</a></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-sublabel top="18">Un ejemplo resuelto</b-sublabel>

  Mateus vive en São Paulo e instaló Claude Code en un Mac con un solo comando. El instalador terminó, pero la terminal muestra «command not found: claude». Cree que la instalación se rompió y quiere repetirla. Primero abre una ventana de terminal nueva: la ventana antigua no sabe nada de la carpeta nueva. Si el mensaje sigue, la causa es PATH, y tiene que añadir <code>~/.local/bin</code> al archivo de ajustes de zsh con el comando <code>echo ... >> ~/.zshrc</code> y abrir la ventana otra vez. Después <code>claude --version</code> muestra una versión. Para comprobar que hiciste lo mismo, mira la salida de <code>claude --version</code>.

  <b-sublabel top="18">PATH en macOS con zsh</b-sublabel>
  <b-codebox title="Añadir la carpeta a PATH" copy>
    echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
  </b-codebox>

  Para bash sirve <code>~/.bashrc</code> en lugar de <code>~/.zshrc</code>. Tras la edición, abre una ventana de terminal nueva<b-proof href="https://code.claude.com/docs/en/troubleshoot-install" quote="Claude Code: «echo 'export PATH=&quot;$HOME/.local/bin:$PATH&quot;' >> ~/.zshrc» — code.claude.com/docs/en/troubleshoot-install"/>.

  <b-sublabel top="18">Ideas equivocadas frecuentes</b-sublabel>

  <b>¿Si no se encuentra claude, falló el instalador?</b> Casi siempre funcionó, y es la terminal la que no conoce la carpeta nueva: en la tabla es la fila de PATH con la solución «abre una ventana de terminal nueva». Cómo comprobarlo: abre una ventana nueva y repite <code>claude --version</code>.

  <b>¿Cambiar de red cura siempre el error 403?</b> No. En la tabla el 403 tiene dos causas: un proxy o filtro, o un país fuera de la lista admitida. En el segundo caso la red no ayuda, y hay que mirar la lista de países de Anthropic.

  <b>¿EACCES se cura con sudo?</b> No. La tabla indica como solución corregir los permisos de la carpeta y dice que no se use <code>sudo</code>.
</b-chapter>
<b-chapter id="region" title="Acceso desde Rusia" icon="flag">
  <b-why>Rusia no está en la lista oficial de países admitidos de Anthropic, y los términos nombran a Claude Code entre los productos disponibles solo en los países de la lista. Fecha de comprobación: 18.11.2026. Los términos entraron en vigor el 12.11.2026<b-proof href="https://www.anthropic.com/supported-countries" quote="Anthropic: «Any country or region not listed is unsupported» — anthropic.com/supported-countries"/>.</b-why>

  La lista de países es un documento de Anthropic que nombra los lugares donde se puede usar Claude. Todo país o región que no esté en la lista cuenta como no admitido. En la lista no hay una entrada «Russia», así que la instalación y el inicio de sesión desde Rusia no están admitidos. Anthropic no da sus motivos. Mi suposición es que están en la política de Estados Unidos y de otros países: sanciones, restricciones a la exportación y leyes. Es una suposición, y los documentos de la empresa no traen esa explicación.
  <iso-art name="claude-code-access-regions-vpn-bans/world-map"></iso-art>
  <b-cap>Un mapa de los países donde Anthropic admite Claude Code, y los países fuera de la lista.</b-cap>

  Durante la instalación esto aparece como el mensaje «App unavailable in region» y como un error 403 al descargar. Una suscripción de pago no levanta la restricción: la lista se aplica igual a un plan de pago y a una clave de API. Qué significa la restricción, cómo leer las entradas con paréntesis y qué es legal hacer si tu país no está en la lista se explica con detalle en un artículo aparte.
  <b-links cols="1">
    <item href="/blog/claude-code-access-regions-vpn-bans/" k="En detalle" t="Claude Code no está disponible en tu país: países admitidos, VPN y bloqueos">Qué significa la restricción y qué hacer</item>
  </b-links>
</b-chapter>
<b-chapter id="alt" title="Alternativas a Claude Code" icon="grid">
  <b-why>Las alternativas hacen lo mismo que Claude Code: leen un proyecto, editan archivos y ejecutan comandos. Se diferencian en el modelo, el precio y el lugar de trabajo. Cada una tiene sus propias condiciones de acceso, que se comprueban en la web del programa.</b-why>

  Una alternativa es otro agente de programación: funciona en una terminal o en un editor y cambia archivos del proyecto a petición tuya. Se elige con tres preguntas. ¿De quién es el modelo que lleva dentro? ¿Dónde trabaja: en una terminal, en una aplicación o en un editor? ¿Cómo se paga? Cada agente tiene una descripción en el glosario del sitio; los datos sobre Gemini CLI y Antigravity CLI vienen de sus artículos, que también dan las fechas.
  <iso-art name="claude-code-install-and-price/alternatives-map"></iso-art>
  <b-cap>Un mapa de alternativas: OpenCode, Codex, Cursor, Gemini CLI y su sucesor Antigravity CLI.</b-cap>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>Agente</th><th>De quién, con qué modelo</th><th>Dónde funciona</th></tr>
    </thead>
    <tbody>
      <tr><td>OpenCode</td><td>un agente abierto, tú eliges el modelo: Claude, GPT, Gemini y otros por API o uno local; pagas al proveedor del modelo</td><td>terminal, aplicación, web</td></tr>
      <tr><td>Codex</td><td>OpenAI, modelos GPT</td><td>ChatGPT, aplicación, terminal, IDE</td></tr>
      <tr><td>Cursor</td><td>Anysphere, un editor basado en VS Code con un agente integrado; modelos propios y de otras empresas</td><td>editor</td></tr>
      <tr><td>Gemini CLI</td><td>Google, modelos Gemini; dejó de funcionar para los usuarios normales el 18 de junio de 2026</td><td>terminal</td></tr>
      <tr><td>Antigravity CLI</td><td>Google; Gemini CLI se trasladó a él</td><td>terminal, aplicación Antigravity</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-sublabel top="18">Cómo elegir</b-sublabel>

  Si necesitas un modelo propio y el pago directo al proveedor, mira OpenCode. Si ya pagas ChatGPT, mira Codex. Si prefieres trabajar en un editor y no en una terminal, mira Cursor. Si usabas Gemini CLI, Antigravity CLI ocupó su lugar. Los comandos de instalación de las alternativas no se dan aquí: cada una tiene el suyo y cambian. Los encuentras en la web del propio programa.
  <b-links cols="2">
    <item href="/materials/glossary/opencode/" k="Término" t="OpenCode">Un agente abierto para la terminal</item>
    <item href="/materials/glossary/codex/" k="Término" t="Codex">El agente de OpenAI</item>
    <item href="/materials/glossary/cursor/" k="Término" t="Cursor">Un editor con agente</item>
    <item href="/materials/glossary/gemini-cli/" k="Término" t="Gemini CLI">El agente de Google en la terminal</item>
    <item href="/materials/glossary/antigravity-cli/" k="Término" t="Antigravity CLI">El sucesor de Gemini CLI</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="Comparación" t="Diferencia entre Codex y Claude Code, Cursor y Hermes Agent">Qué agente para qué tarea</item>
    <item href="/blog/codex-or-chatgpt-what-to-choose/" k="Elección" t="Codex o ChatGPT: cuál elegir">Un chat o un agente de programación</item>
  </b-links>
</b-chapter>
<b-chapter id="prompts" title="Prompts listos para el agente" icon="chat">
  <b-why>Cuatro prompts para la primera sesión. Pégalos en Claude Code después de ejecutar <code>claude</code> en la carpeta del proyecto.</b-why>

  Los prompts van en orden creciente: primero el agente solo lee y cuenta, luego crea un archivo de reglas, después hace un cambio pequeño y al final ejecuta las pruebas. Cada prompt pide mostrar el resultado antes de escribir o dejar los archivos sin cambios, así la primera sesión es segura.
  <b-codebox title="1. Conocer el proyecto" copy>
    ¿Qué hace este proyecto? ¿Qué tecnologías usa y dónde está el punto de entrada principal? Responde con una lista de cinco puntos.
  </b-codebox>
  <b-codebox title="2. Reglas del proyecto" copy>
    Lee el proyecto y crea un archivo CLAUDE.md: comandos de compilación y de pruebas, estructura de carpetas, qué no se debe tocar. Muéstrame el texto antes de escribirlo.
  </b-codebox>
  <b-codebox title="3. Un cambio pequeño" copy>
    Añade al README una sección «Instalación» con los comandos de package.json. Muéstrame el cambio y espera mi confirmación.
  </b-codebox>
  <b-codebox title="4. Comprobar que funciona" copy>
    Ejecuta las pruebas del proyecto y haz una lista de las que fallan. Propón una causa para cada una, pero no cambies ningún archivo todavía.
  </b-codebox>
  <b-links cols="1">
    <item href="/materials/glossary/claude-md/" k="Término" t="CLAUDE.md">El archivo de reglas del proyecto que Claude Code lee en cada sesión</item>
  </b-links>
</b-chapter>
<b-chapter id="faq" icon="chat" title="Preguntas frecuentes">
  <b-faq-cards>
    <q t="¿Cómo instalo Claude Code?">Abre una terminal y ejecuta un comando: en macOS, Linux y WSL, curl -fsSL https://claude.ai/install.sh | bash; en Windows, en PowerShell, irm https://claude.ai/install.ps1 | iex. Después abre una ventana de terminal nueva, comprueba claude --version y ejecuta claude en la carpeta del proyecto. Fuente: code.claude.com/docs/en/setup. Fecha de comprobación: 18.11.2026.</q>
    <q t="¿Cuánto cuesta Claude Code?">No tiene un precio aparte: Claude Code viene incluido en las suscripciones. A 18.11.2026 Pro cuesta 20 dólares al mes con pago mensual, Max 100, Ultra 200, un puesto de Team 25; el plan gratuito no incluye Claude Code. La alternativa a una suscripción es pagar por la API a través de Console. Fuente: claude.com/pricing.</q>
    <q t="¿Funciona Claude Code en Rusia?">Rusia no está en la lista oficial de países admitidos de Anthropic, y los términos nombran a Claude Code entre los productos disponibles solo en los países de la lista. Todo país fuera de la lista cuenta como no admitido. Los términos entraron en vigor el 12.11.2026. Fuente: anthropic.com/supported-countries. Fecha de comprobación: 18.11.2026. Más en el <a href="/blog/claude-code-access-regions-vpn-bans/">artículo sobre el acceso por país, las VPN y los bloqueos</a>.</q>
    <q t="¿Qué puede sustituir a Claude Code?">Agentes parecidos: OpenCode con el modelo que elijas, Codex de OpenAI, el editor Cursor con un agente integrado y, de Google, Antigravity CLI en lugar de Gemini CLI, que está cerrado para los usuarios normales. El acceso y los precios son distintos en cada uno, y se comprueban en la web del programa.</q>
    <q t="¿Está Claude Code en el plan gratuito?">No. Claude Code requiere una cuenta Pro, Max, Ultra, Team, Enterprise o Console; el plan gratuito de claude.ai no incluye acceso a él. Fuente: code.claude.com/docs/en/setup.</q>
    <q t="¿Cómo sé si Claude Code entró con una suscripción o con una clave?">Ejecuta claude en la carpeta del proyecto y escribe /status: el comando muestra el método de acceso activo. Si la variable ANTHROPIC_API_KEY está definida en el sistema, Claude Code toma la clave en lugar de la suscripción; para volver a la suscripción, ejecuta unset ANTHROPIC_API_KEY. Fuente: code.claude.com/docs/en/authentication.</q>
  </b-faq-cards>
</b-chapter>
<b-chapter id="next" title="Seguir leyendo">
  <b-links cols="2">
    <item href="/blog/claude-code-access-regions-vpn-bans/" k="Acceso" t="Claude Code no está disponible en tu país: países admitidos, VPN y bloqueos">Qué significa la restricción por país</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="Comparación" t="Diferencia entre Codex y Claude Code, Cursor y Hermes Agent">Qué agente para qué tarea</item>
    <item href="/blog/specs-rules-skills/" k="Contexto" t="Qué son AGENTS.md y CLAUDE.md">Archivos de reglas para el agente</item>
    <item href="/blog/cursor-rules-vs-agents-md/" k="Reglas" t="Cursor rules vs AGENTS.md">Qué va en cada uno</item>
    <item href="/blog/harness-driven-development/" k="Método" t="Harness-Driven Development">El error de un agente se convierte en regla</item>
  </b-links>
</b-chapter>
<b-footer>Basado en la documentación de Claude Code, claude.com/pricing, el centro de ayuda de Claude y los términos de acceso de Anthropic. Fecha de comprobación: 18.11.2026. Los precios y la lista de países cambian.</b-footer>
</b-post>
