---
title: Codex CLI no está disponible en tu país: países admitidos, VPN y bloqueos
seoTitle: Codex CLI no disponible en tu país (2026)
date: 2026-11-18
updated: 2026-11-18
description: Qué significa la lista de países de OpenAI para Codex, cómo se inicia sesión, qué dicen los términos sobre las VPN, por qué se bloquean cuentas y qué envía.
tags: IA, Codex, OpenAI, países admitidos, VPN, bloqueos, Claude Code
category: harness
layout: wide
mentions: Codex, OpenAI, ChatGPT, Claude Code, Anthropic
toc: answer=Respuesta breve | list=Lista de países | login=Inicio de sesión | vpn=VPN | bans=Bloqueos | data=Datos y ajustes | compare=Frente a Claude Code | legal=Opciones legítimas | faq=Preguntas | start=Prompts | next=Seguir leyendo
---

Codex no está disponible oficialmente en Rusia: el país no figura en la lista de países admitidos de OpenAI, y acceder desde fuera de ella “may result in your account being blocked or suspended”. Codex CLI inicia sesión con ChatGPT o con una clave de API. No encontré reglas regionales propias de Codex; las VPN no se mencionan, pero eludir medidas de protección está prohibido.

<b-post series="harness">
<b-chapter id="answer" title="Respuesta breve" icon="crosshair">
  <b-why>El acceso a Codex lo fija la lista general de países de OpenAI para ChatGPT y la API. Rusia no figura en ella<b-proof href="https://developers.openai.com/api/docs/supported-countries" quote="OpenAI: «Accessing or offering access to our services outside of the countries and territories listed below may result in your account being blocked or suspended.» — developers.openai.com/api/docs/supported-countries"/>.</b-why>

  <iso-art name="codex-access-regions-vpn-bans/world-map"></iso-art>
  <b-cap>Azul: el país está en la lista de OpenAI. Naranja: el país no está en la lista, con Rusia en un tono más fuerte.</b-cap>
  <b-sublabel top="18">Qué significa, en palabras sencillas</b-sublabel>

  OpenAI es la empresa que fabrica ChatGPT y Codex. Codex es un agente para programadores: trabaja en la terminal y en una aplicación, lee los archivos de un proyecto y edita el código según la tarea que le des. OpenAI publica una lista de países donde sus servicios están disponibles. Si tu país está en la lista, las reglas regionales no te estorban. Si no está, el acceso puede acabar con la cuenta bloqueada. OpenAI no explica por qué lo organiza así. Mi suposición es que se trata de la política de la empresa y del riesgo de sanciones, controles de exportación y leyes de Estados Unidos y de otros países.

  Ejemplo cotidiano. Dana vive en Almaty y quiere probar Codex. Abre la lista de OpenAI y encuentra la línea «Kazakhstan». La entrada no lleva paréntesis ni reservas, así que nada en la región se interpone. Queda la parte habitual: iniciar sesión en una cuenta de ChatGPT o crear una clave de API y elegir una forma de pago. Una persona que esté físicamente en Rusia no encontrará una entrada así.

  Un error frecuente es suponer que Codex se rige por reglas aparte porque funciona en la terminal y se instala con un solo comando. No existe una lista de países propia de Codex, ni en las páginas públicas de OpenAI ni en el repositorio del programa. El inicio de sesión de Codex remite a la lista general de ChatGPT y de la API. El segundo error se refiere a la VPN, un programa que cambia la dirección desde la que accedes a la red. La VPN no se menciona ni en la ayuda sobre países ni en los términos de uso. Los términos prohíben eludir restricciones y medidas de protección, y cambiar de dirección podría encajar ahí; esa conclusión es mía, y OpenAI no ha hecho ninguna declaración directa al respecto.

  Puedes comprobar la respuesta en un minuto: abre la <a href="https://developers.openai.com/api/docs/supported-countries">página de OpenAI con la lista de países admitidos</a> y busca tu país con la búsqueda de página del navegador. El centro de ayuda help.openai.com no se abre para solicitudes automáticas (error 403), así que las filas de la lista las comprobé en la página developers.openai.com.
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>Pregunta</th><th>Respuesta</th><th>Estado</th></tr>
    </thead>
    <tbody>
      <tr><td>🇷🇺 Rusia en la lista de países de OpenAI</td><td>no<b-proof href="https://developers.openai.com/api/docs/supported-countries" quote="OpenAI: «Accessing or offering access to our services outside of the countries and territories listed below may result in your account being blocked or suspended.» — developers.openai.com/api/docs/supported-countries"/></td><td>confirmado</td></tr>
      <tr><td>Una lista de países aparte para Codex</td><td>no encontrada en las páginas públicas ni en el repositorio</td><td>no encontrado</td></tr>
      <tr><td>Inicio de sesión</td><td>cuenta de ChatGPT o clave de API<b-proof href="https://learn.chatgpt.com/docs/auth" quote="OpenAI: «Sign in with ChatGPT for subscription access» / «Sign in with an API key for usage-based access» — learn.chatgpt.com/docs/auth"/></td><td>confirmado</td></tr>
      <tr><td>VPN en los términos y en la ayuda sobre países</td><td>no se menciona</td><td>no encontrado</td></tr>
      <tr><td>Prohibición de eludir restricciones y medidas de protección</td><td>presente en los términos<b-proof href="https://openai.com/policies/row-terms-of-use/" quote="OpenAI: «circumvent any rate limits or restrictions or bypass any protective measures or safety mitigations we put on our Services» — openai.com/policies/row-terms-of-use"/></td><td>confirmado</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>Fecha de comprobación: 18.11.2026. El artículo cuenta lo que dicen los documentos oficiales y no contiene formas de eludir las restricciones.</b-cap>
</b-chapter>
<b-chapter id="list" title="Lista de países de OpenAI" icon="flag">
  <b-why>OpenAI mantiene una sola lista para ChatGPT y la API y no publica una lista aparte de países no disponibles<b-proof href="https://help.openai.com/en/articles/7947663-chatgpt-and-openai-api-supported-countries-and-territories" quote="OpenAI: «OpenAI does not publish a separate list of countries and territories that are not supported. If a location is not included in the list below, our API is not available there.» — help.openai.com/en/articles/7947663"/>. Lo que la lista no nombra no está disponible.</b-why>

  La lista de países es una página de OpenAI que nombra los lugares donde se pueden usar ChatGPT y la API. Codex pertenece al mismo conjunto: se conecta con una cuenta de ChatGPT o con una clave de API, así que las dos formas de iniciar sesión chocan con esta lista. No existe una página aparte con el título «países donde Codex está cerrado». Por eso la ausencia de un país en la lista es la única señal de que el acceso está cerrado.
  <iso-art name="codex-access-regions-vpn-bans/list-gate"></iso-art>
  <b-cap>La lista funciona como una sola puerta para ChatGPT, la API y Codex: un país de la lista pasa, un país fuera de ella se detiene.</b-cap>
  <b-sublabel top="18">Cómo leer una entrada</b-sublabel>

  La mayoría de las entradas de la lista son una sola palabra: «Armenia», «Georgia», «Kazakhstan». Una entrada así significa que todo el país está admitido. Algunas entradas llevan una reserva. La más visible es «Ukraine (with certain exceptions)». La desmonto. «Ukraine» nombra el país. Los paréntesis con «with certain exceptions» indican que una parte del territorio queda excluida. La entrada de la página de OpenAI no dice qué lugares se excluyen, y en las páginas públicas de OpenAI no hay una lista de excepciones. Como comparación, Anthropic nombra una por una las regiones excluidas de Ucrania, mientras que OpenAI no tiene esa lista en la entrada. De ahí sale una regla práctica: si tu país aparece con paréntesis, la palabra suelta de la lista no basta, y tendrás que aclarar la respuesta con el soporte de OpenAI.

  Ejemplo cotidiano. Arsen vive en Ereván y forma un equipo con colegas de Armenia, Georgia y Ucrania. Abre la lista y encuentra «Armenia» y «Georgia» sin paréntesis: para quienes están en esos países no hay dudas. Lee con más atención la entrada «Ukraine (with certain exceptions)» y pide a un colega de Kiev que escriba al soporte de OpenAI para saber si su ciudad entra en las excepciones. Puedes comprobarlo tú mismo así: busca el país con la búsqueda de página y mira si después del nombre hay paréntesis.
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>País</th><th>OpenAI (ChatGPT y API)</th></tr>
    </thead>
    <tbody>
      <tr><td>Rusia, Bielorrusia</td><td>no está en la lista</td></tr>
      <tr><td>China, Hong Kong, Macao</td><td>no está en la lista</td></tr>
      <tr><td>Irán, Cuba, Corea del Norte, Siria</td><td>no está en la lista</td></tr>
      <tr><td>Kazajistán, Georgia, Armenia, Uzbekistán</td><td>está en la lista</td></tr>
      <tr><td>Ucrania</td><td>está en la lista «with certain exceptions»<b-proof href="https://developers.openai.com/api/docs/supported-countries" quote="OpenAI: «Ukraine (with certain exceptions)» — developers.openai.com/api/docs/supported-countries"/></td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-cap>Filas comprobadas el 18.11.2026 con la lista de developers.openai.com. Antes de decidir, abre la página de OpenAI y busca tu país: la lista cambia.</b-cap>
  <b-finding>
    <ex>El país no se nombra en la lista: por tanto, allí no hay acceso a Codex a través de ChatGPT y la API.</ex>
    <gen>OpenAI escribe «not available there» sobre la API, y los términos advierten de un bloqueo de la cuenta por el acceso desde fuera de la lista. En las páginas públicas no hay ninguna excepción para Codex.</gen>
    <do>Antes de instalar, busca tu país en la página de OpenAI. Si falta, considera el acceso cerrado.</do>
  </b-finding>
  <b-sublabel top="18">En qué se diferencia la lista de OpenAI de la de Anthropic</b-sublabel>

  Anthropic, la empresa que fabrica Claude Code, tiene su propia lista, y no coincide del todo con la de OpenAI. Rusia, Bielorrusia, China, Irán, Cuba, Corea del Norte y Siria no están en ninguna de las dos. Afganistán, Myanmar y Yemen están en la lista de OpenAI y faltan en la de Anthropic. Así que la comprobación de país para un agente no sustituye a la de otro: abre la lista del que piensas instalar. Ninguna de las dos empresas explica las diferencias.
</b-chapter>
<b-chapter id="login" title="Cómo inicia sesión Codex" icon="key">
  <b-why>La documentación del inicio de sesión de Codex remite a la lista general de países y no contiene restricciones regionales propias<b-proof href="https://learn.chatgpt.com/docs/auth" quote="OpenAI: «Sign in with ChatGPT for subscription access» — learn.chatgpt.com/docs/auth"/>.</b-why>

  Iniciar sesión es la forma en que Codex demuestra a los servidores de OpenAI que las solicitudes vienen de tu cuenta. Hay dos formas, y cada una va ligada a su propia facturación. Iniciar sesión con ChatGPT usa una suscripción de ChatGPT: pagas una cantidad fija y usas el agente dentro de sus límites. Iniciar sesión con una clave de API usa una clave de programación: pagas las tarifas de la API por el uso real. Los dos caminos pasan por la misma puerta, la de la lista de países, y cuál elegir depende de cómo pagas y de lo que necesitas. Codex en la nube (Codex cloud), donde el agente se ejecuta en los servidores de OpenAI, exige iniciar sesión con ChatGPT, y una clave de API no sirve para él.
  <iso-art name="codex-access-regions-vpn-bans/login-paths"></iso-art>
  <b-cap>Dos caminos de inicio de sesión: ChatGPT (suscripción) y clave de API (pago por uso). Los datos de inicio de sesión viven en tu ordenador, en un archivo o en el almacenamiento del sistema.</b-cap>

  El programa guarda en caché los datos de inicio de sesión en el dispositivo. Están en el archivo <code>~/.codex/auth.json</code> o en el almacén de contraseñas del sistema operativo. El modo lo fija el parámetro <code>cli_auth_credentials_store</code>, con cuatro valores: <code>file</code>, <code>keyring</code>, <code>auto</code> y <code>ephemeral</code>. El archivo con los datos de inicio de sesión equivale a una llave de la cuenta. Quien lo copie puede usar tu cuenta, y los términos de OpenAI prohíben compartir los datos de inicio de sesión y poner la cuenta a disposición de otros<b-proof href="https://openai.com/policies/row-terms-of-use/" quote="OpenAI: «You may not share your account credentials or make your account available to anyone else and are responsible for all activities that occur under your account.» — openai.com/policies/row-terms-of-use"/>.
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th></th><th>Inicio de sesión con ChatGPT</th><th>Inicio de sesión con clave de API</th></tr>
    </thead>
    <tbody>
      <tr><td>Pago</td><td>suscripción de ChatGPT</td><td>tarifas de la API</td></tr>
      <tr><td>Codex cloud</td><td>este camino es obligatorio</td><td>no funciona</td></tr>
      <tr><td>Dónde se guardan los datos de inicio de sesión</td><td colspan="2">en el archivo ~/.codex/auth.json o en el almacenamiento del sistema; el modo lo fija el parámetro cli_auth_credentials_store (file, keyring, auto, ephemeral)</td></tr>
      <tr><td>Comprobación regional</td><td colspan="2">no se describe en la página de inicio de sesión; se aplica la lista general de países</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-sublabel top="18">Una situación de principio a fin</b-sublabel>

  Nika vive en Tiflis e instala Codex en su portátil de trabajo. Arranca el programa y elige iniciar sesión con ChatGPT, porque ya tiene una suscripción. Los datos de inicio de sesión se guardan en el portátil. Su país figura en la lista como «Georgia», sin paréntesis, así que no hay dudas sobre la región. Una semana después decide usar Codex en la nube y descubre que necesita justo el inicio de sesión con ChatGPT: la clave de API que usa su colega no sirve para la nube. Para comprobar cómo inició sesión el programa, puedes preguntárselo al propio agente: existe un prompt preparado para eso.

  <b-sublabel top="18">Qué comprueban los servidores al iniciar sesión</b-sublabel>

  Qué comprueban realmente los servidores de OpenAI al iniciar sesión no se describe en las páginas públicas: la dirección de conexión, los datos de pago, un número de teléfono o todo junto. Esto no está confirmado. Por eso el artículo no afirma nada sobre la señal con la que OpenAI determinaría que estás fuera de la lista. Lo único que se sabe es que al iniciar sesión no se describe ninguna comprobación regional, y que se remite a la lista general.
</b-chapter>
<b-chapter id="vpn" title="VPN: qué se dice y qué no" icon="shield-check">
  <b-why>Los términos para particulares (en vigor desde el 1 de enero de 2026) hablan de «restricciones» y de «medidas de protección» en general. La VPN y la región no se mencionan en ellos.</b-why>

  Una VPN es un programa que cambia la dirección desde la que un sitio ve tu conexión. La gente la instala por privacidad en una red pública o para acceder a una red corporativa. OpenAI guarda silencio sobre las VPN en sus documentos, así que separé tres cosas: lo que está escrito literalmente, lo que se desprende de los términos y lo que sigue siendo opinión. Así se ve dónde está la regla y dónde el rumor.
  <iso-art name="codex-access-regions-vpn-bans/vpn-rules"></iso-art>
  <b-cap>Los documentos de OpenAI dicen poco sobre las VPN: la VPN no se menciona, mientras que eludir restricciones y medidas de protección está prohibido.</b-cap>

  Literalmente, los documentos contienen lo siguiente. La VPN no se menciona ni en la ayuda sobre países ni en los términos de uso. Los términos prohíben eludir límites, restricciones y medidas de protección. También prohíben pasar la cuenta a otras personas y usar los servicios en países sometidos a un embargo de Estados Unidos. En estos documentos no aparece ni «la VPN está permitida» ni «la VPN está prohibida». Cualquier conclusión en un sentido u otro sigue siendo una interpretación del texto.
  <iso-art name="codex-access-regions-vpn-bans/four-bans"></iso-art>
  <b-cap>Cuatro prohibiciones en los términos de OpenAI: eludir restricciones y medidas de protección, pasar la cuenta a otros, usar los servicios en países sometidos a embargo de Estados Unidos e incumplir los términos.</b-cap>

  Cuatro prohibiciones de los términos se relacionan con el tema del acceso, y cada una puede leerse como una regla aparte.

  <b-steps round>
    <step t="Eludir restricciones y medidas de protección">Está prohibido interferir con los servicios, incluido eludir límites, restricciones y medidas de protección. Una comprobación regional puede contar como una de esas medidas, pero los términos no la nombran.</step>
    <step t="Pasar la cuenta a otros">No se permite compartir los datos de inicio de sesión ni poner la cuenta a disposición de nadie más. La responsabilidad por todo lo que ocurra bajo la cuenta sigue siendo del titular.</step>
    <step t="Usar los servicios en países sometidos a embargo de EE. UU.">Los servicios no pueden usarse en un país o territorio sometido a un embargo de Estados Unidos, ni en beneficio de personas con las que las leyes comerciales prohíben negociar.</step>
    <step t="Incumplir los términos y las políticas de uso">Si se incumplen los términos o las Usage Policies, OpenAI puede suspender o cerrar el acceso. OpenAI llega a la misma conclusión si hay riesgo de daño y cuando lo exige la ley.</step>
  </b-steps>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th>Qué</th><th>Presente en los documentos</th></tr>
    </thead>
    <tbody>
      <tr><td>VPN en la ayuda sobre países</td><td>no se menciona</td></tr>
      <tr><td>VPN en los términos de uso</td><td>no se menciona</td></tr>
      <tr><td>Prohibición de eludir «restricciones» y «medidas de protección»</td><td>sí<b-proof href="https://openai.com/policies/row-terms-of-use/" quote="OpenAI: «Interfere with or disrupt our Services, including circumvent any rate limits or restrictions or bypass any protective measures or safety mitigations we put on our Services.» — openai.com/policies/row-terms-of-use"/></td></tr>
      <tr><td>Prohibición de pasar la cuenta a otros</td><td>sí<b-proof href="https://openai.com/policies/row-terms-of-use/" quote="OpenAI: «You may not share your account credentials or make your account available to anyone else and are responsible for all activities that occur under your account.» — openai.com/policies/row-terms-of-use"/></td></tr>
      <tr><td>Prohibición de usar los servicios en países sometidos a embargo de EE. UU.</td><td>sí<b-proof href="https://openai.com/policies/row-terms-of-use/" quote="OpenAI: «Our Services may not be used in or for the benefit of, or exported or re-exported to (a) any U.S. embargoed country or territory or (b) any individual or entity with whom dealings are prohibited or restricted under applicable trade laws.» — openai.com/policies/row-terms-of-use"/></td></tr>
      <tr><td>«La VPN está permitida» o «la VPN está prohibida» literalmente</td><td>ninguna de las dos: cualquier conclusión así es una interpretación sin cita que la respalde</td></tr>
    </tbody>
    </table>
  </b-ctx-table>
  <b-finding>
    <ex>De los documentos no se puede deducir literalmente ni un permiso ni una prohibición de la VPN.</ex>
    <gen>El criterio de OpenAI es la lista de países donde se ofrecen los servicios, junto con la prohibición de eludir restricciones. Cómo aplica esto OpenAI en la práctica no lo encontré en fuentes abiertas.</gen>
    <do>No decidas por resúmenes de foros. Lee los términos y la lista de países en las páginas de OpenAI y, si tienes dudas, escribe al soporte de OpenAI.</do>
  </b-finding>
  <b-sublabel top="18">Ideas equivocadas frecuentes</b-sublabel>

  <b>¿Si la VPN no se menciona en los términos, está permitida?</b> La ausencia de mención no permite nada. La prohibición de eludir restricciones y medidas de protección está redactada en términos generales, y cambiar de dirección podría quedar dentro. Cómo comprobarlo: busca la frase sobre «circumvent any rate limits or restrictions» en los <a href="https://openai.com/policies/row-terms-of-use/">términos de uso de OpenAI</a> y léela completa.

  <b>¿Los términos prohíben la VPN sin más?</b> La VPN no se menciona en ellos. Hay quien deduce una prohibición de saltarse la región a partir de la prohibición general de eludir medidas de protección, pero esa deducción es una interpretación sin cita que la respalde.

  <b>¿Una suscripción de pago da derecho a acceder desde cualquier país?</b> Los términos y la ayuda nombran la lista de países como criterio, y los planes de precios no figuran entre los criterios. Una suscripción de ChatGPT y una clave de API están detrás de la misma puerta. Cómo comprobarlo: lee la primera frase de la página con la lista.

  <b>¿Si el país está en la lista, ya no hay que preocuparse por la VPN?</b> La prohibición de eludir medidas de protección está escrita en los términos para todos los usuarios, y la lista de países no la anula. La ayuda sobre países también hace una reserva sobre el dispositivo: el error «OpenAI's services are not available in your country.» puede aparecer incluso en un país admitido. Las condiciones de su aparición no se describen en la ayuda, así que conviene preguntar al soporte.

  <b>¿Es más sencillo con Claude Code?</b> Anthropic tampoco menciona las VPN en sus reglas regionales, pero la documentación de Claude Code tiene su propia redacción sobre la compatibilidad del programa con las VPN. La redacción difiere entre las empresas y la lógica es parecida: una lista de países más una prohibición general de eludir medidas de protección. Un análisis detallado para Claude Code está en un <a href="/blog/claude-code-access-regions-vpn-bans/" target="_blank" rel="noopener">artículo aparte</a>.

  La decisión sobre el riesgo es tuya. No describo ni recomiendo formas de conectarse: sobre este tema solo tengo la redacción de los términos.
</b-chapter>


<b-chapter id="bans" title="Bloqueos y sus causas" icon="alert-circle">
  <b-why>Un bloqueo es la suspensión o el cierre de una cuenta de OpenAI, tras el cual dejan de funcionar el inicio de sesión en ChatGPT, la API y Codex. Los términos de OpenAI nombran tres motivos, y uno de ellos es el incumplimiento de los términos o de las políticas de uso<b-proof href="https://openai.com/policies/row-terms-of-use/" quote="OpenAI: «We reserve the right to suspend or terminate your access to our Services or delete your account if we determine: You breached these Terms or our Usage Policies. We must do so to comply with the law. Your use of our Services could cause risk or harm to OpenAI, our users, or anyone else.» — openai.com/policies/row-terms-of-use"/>.</b-why>

  Los motivos están escritos en los términos de uso para particulares (<a href="https://openai.com/policies/row-terms-of-use/" target="_blank" rel="noopener">Terms of Use</a>, en vigor desde el 1 de enero de 2026) y en el artículo de ayuda sobre la lista de países. Los términos dan tres motivos: el incumplimiento de los propios términos o de las Usage Policies, un requisito legal y un riesgo de daño para OpenAI, otros usuarios o cualquier otra persona. Un cuarto motivo está en el artículo de ayuda sobre la lista de países: el acceso a los servicios desde fuera de los países de la lista “may result in your account being blocked or suspended”.
  <iso-art name="codex-access-regions-vpn-bans/ban-ladder"></iso-art>
  <b-cap>El camino del esquema: un motivo, luego la suspensión o el cierre, luego una apelación a través del soporte. La decisión la toma OpenAI, y a la persona le queda una solicitud al soporte; los términos no prometen ningún resultado.</b-cap>

  Con qué rapidez llega un bloqueo y qué aspecto tiene en pantalla no se describe en las páginas públicas de OpenAI: no encontré nada. Solo dicen que el derecho de suspender o cerrar el acceso es de la empresa, y que se puede presentar una apelación si la decisión fue un error.
  <b-sublabel top="18">Causas según los documentos</b-sublabel>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>Causa</th><th>Qué se dice</th></tr>
    </thead>
    <tbody>
      <tr><td>Acceso desde fuera de la lista de países</td><td>la cuenta puede ser bloqueada o suspendida: «Accessing or offering access to our services outside of the countries and territories listed below may result in your account being blocked or suspended.»</td></tr>
      <tr><td>Incumplimiento de los términos o de las políticas de uso</td><td>OpenAI puede suspender o cerrar el acceso: «You breached these Terms or our Usage Policies.»</td></tr>
      <tr><td>Error en alguna región</td><td>el texto del error en el artículo de ayuda sobre países: «OpenAI's services are not available in your country.» El artículo añade que el error es posible incluso en un país admitido después de que un dispositivo se usara en una región no admitida</td></tr>
      <tr><td>Apelación</td><td>a través del soporte<b-proof href="https://openai.com/policies/row-terms-of-use/" quote="OpenAI: «If you believe we have suspended or terminated your account in error, you can file an appeal with us by contacting our Support team» — openai.com/policies/row-terms-of-use"/></td></tr>
    </tbody>
    </table>
  </b-ctx-table>

  Otra disposición de los términos se refiere a la responsabilidad: una cuenta no puede pasarse a otros, y el titular responde de todo lo que ocurra bajo ella<b-proof href="https://openai.com/policies/row-terms-of-use/" quote="OpenAI: «You may not share your account credentials or make your account available to anyone else and are responsible for all activities that occur under your account.» — openai.com/policies/row-terms-of-use"/>. Así, una cuenta ajena, o un acceso compartido dentro de un equipo, sigue siendo motivo de restricción aunque el país esté en la lista.
  <b-sublabel top="18">La apelación, paso a paso</b-sublabel>
  <b-steps round>
    <step t="Soporte">escribe al soporte de OpenAI y explica que, a tu juicio, el bloqueo es un error</step>
    <step t="Datos">adjunta la fecha, el país desde el que iniciaste sesión, el texto del error y copias de los correos</step>
    <step t="Espera">espera una respuesta: los términos no dan plazos ni probabilidad de éxito</step>
  </b-steps>

  En las páginas públicas no hay un formulario de apelación con nombre, ni una dirección, ni plazos de revisión, así que los pasos contienen solo lo que dicen los términos: una solicitud al soporte. Una apelación corrige un error, pero el motivo que nombra el artículo de ayuda sigue igual mientras una persona continúe usando el servicio desde un país fuera de la lista. Es mi lectura de los términos y del artículo de ayuda; OpenAI no hace esa comparación.
  <b-sublabel top="18">Un ejemplo seguido</b-sublabel>
  <b-steps round>
    <step t="Oleg vive en Rusia y quiere probar Codex">Instala el programa, intenta iniciar sesión y ve el texto «OpenAI's services are not available in your country.» Rusia no figura en la lista de países de OpenAI, y los términos advierten del bloqueo o la suspensión de la cuenta por acceder desde fuera de la lista. Qué comprobación se activó realmente, la dirección, el número de teléfono o los datos de pago, no se describe en las páginas públicas. Una apelación a través del soporte es posible, pero no incluye al país en la lista. Para comprobarlo tú mismo: abre la lista de países de OpenAI, busca Rusia y compara el resultado con el texto del error del artículo de ayuda.</step>
  </b-steps>

  <b-sublabel top="18">Ideas equivocadas frecuentes</b-sublabel>

  <b>¿Los bloqueos se dan solo por incumplir los términos?</b> No: los términos tienen dos motivos más, un requisito legal y un riesgo de daño, y el artículo de ayuda sobre países nombra aparte el acceso desde fuera de la lista.

  <b>¿Una apelación devuelve el acceso?</b> Los términos solo dicen que se puede presentar una apelación a través del soporte. No prometen ningún resultado.

  <b>¿Las causas de un bloqueo de OpenAI están listadas por completo en el centro de ayuda?</b> El artículo de ayuda aparte de OpenAI sobre las causas de bloqueo de cuentas está cerrado a la comprobación automática (error 403), así que no cuento sus disposiciones. Los términos para empresas, los Service Terms y las Usage Policies están cerrados del mismo modo. Para organizaciones hay que leer estos documentos por separado en openai.com y help.openai.com.
  <b-cap>Límite del conocimiento: lo que dicen los términos para particulares y el artículo de ayuda sobre países está confirmado. Lo que hay en los documentos cerrados no está confirmado.</b-cap>
</b-chapter>
<b-chapter id="data" title="Qué envía Codex al servidor" icon="eye">
  <b-why>Las solicitudes al modelo siempre van al servidor, si no el agente no funciona. Los demás flujos (analítica, métricas, envío de comentarios) se desactivan en config.toml, y el texto de los prompts llega a los registros de OpenTelemetry solo con consentimiento explícito<b-proof href="https://learn.chatgpt.com/docs/config-file/config-reference" quote="OpenAI: «Opt in to exporting raw user prompts with OpenTelemetry logs.» — learn.chatgpt.com/docs/config-file/config-reference"/>.</b-why>

  Me basé en el código fuente de Codex CLI (commit 8011b92 del 18.11.2026) y en la página de ajustes de OpenAI. Codex es un agente de programación: trabaja en la terminal y en la aplicación y habla constantemente con el servidor. Algunos datos hacen falta para el trabajo, otros se recogen además. Los datos necesarios son tus solicitudes al modelo y sus respuestas. Los flujos adicionales son la analítica de los productos de Codex, las métricas y los comentarios enviados con el comando /feedback. La telemetría es el envío automático de información sobre cómo funciona el programa: cuánto tardó una acción, si se produjo un error. OpenTelemetry es un estándar abierto para esa información.
  <iso-art name="codex-access-regions-vpn-bans/data-flows"></iso-art>
  <b-cap>Las solicitudes al modelo siempre salen. La analítica, las métricas y /feedback se desactivan con ajustes. El texto de los prompts va a OpenTelemetry solo con consentimiento.</b-cap>

  <b-sublabel top="18">Qué se envía cuando está activado</b-sublabel>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>Qué</th><th>Por defecto</th><th>Cómo desactivarlo</th></tr>
    </thead>
    <tbody>
      <tr><td>Analítica de OpenAI en los productos de Codex<b-proof href="https://learn.chatgpt.com/docs/config-file/config-reference" quote="OpenAI: «Enable or disable analytics for this machine or profile.» — learn.chatgpt.com/docs/config-file/config-reference"/></td><td>activada en la versión de lanzamiento</td><td>[analytics] enabled = false</td></tr>
      <tr><td>Métricas de OpenTelemetry (exportador integrado)<b-proof href="https://learn.chatgpt.com/docs/config-file/config-reference" quote="OpenAI: «Select the OpenTelemetry metrics exporter. The default, `statsig`, follows `analytics.enabled`.» — learn.chatgpt.com/docs/config-file/config-reference"/></td><td>activadas, siguen el ajuste de analítica</td><td>[otel] metrics_exporter = "none"</td></tr>
      <tr><td>Envío de comentarios con /feedback<b-proof href="https://learn.chatgpt.com/docs/config-file/config-reference" quote="OpenAI: «Enable feedback submission via `/feedback` across local clients (default: true).» — learn.chatgpt.com/docs/config-file/config-reference"/></td><td>activado</td><td>[feedback] enabled = false</td></tr>
      <tr><td>Texto de los prompts en los registros de OpenTelemetry<b-proof href="https://learn.chatgpt.com/docs/config-file/config-reference" quote="OpenAI: «Opt in to exporting raw user prompts with OpenTelemetry logs.» — learn.chatgpt.com/docs/config-file/config-reference"/></td><td>desactivado, hace falta consentimiento explícito</td><td>no hace falta activarlo</td></tr>
    </tbody>
    </table>
  </b-ctx-table>

  Las dos primeras filas están vinculadas: por defecto el exportador de métricas integrado sigue el ajuste de analítica. El envío de comentarios va aparte: no se envía nada hasta que la persona ejecuta /feedback. La última fila muestra el único flujo que está desactivado por defecto.
  <b-sublabel top="18">Ajustes en config.toml</b-sublabel>
  <b-codebox title="Codex config.toml" copy>
    [analytics]
    enabled = false

    [otel]
    metrics_exporter = "none"

    [feedback]
    enabled = false
  </b-codebox>
  <b-cap>El esquema de ajustes del repositorio aclara: con analytics enabled = false, los exportadores OTLP propios del programa siguen activos, y para apagar las métricas hace falta metrics_exporter = "none". Qué guarda exactamente OpenAI del código y de las solicitudes, y durante cuánto tiempo, no se encuentra en las páginas públicas de Codex CLI: sin confirmar.</b-cap>

  Estos ajustes se refieren a la recogida de datos. No tienen efecto sobre la lista de países: desactivar la analítica no hace permitido el uso desde un país fuera de la lista.
  <b-sublabel top="18">Un ejemplo seguido</b-sublabel>
  <b-steps round>
    <step t="Timur vive en Taskent y escribe código para un cliente">Uzbekistán está en la lista de países de OpenAI, así que inicia sesión en Codex con su cuenta de ChatGPT. El cliente le pide que no envíe nada de más. Timur abre config.toml y escribe tres bloques: analítica desactivada, métricas desactivadas, envío de comentarios desactivado. Las solicitudes al modelo siguen saliendo, porque el trabajo del agente depende de ellas. Para comprobarlo tú mismo: pide al agente que muestre los valores de los tres ajustes y asegúrate de que cada uno esté desactivado.</step>
  </b-steps>

  <b-sublabel top="18">Ideas equivocadas frecuentes</b-sublabel>

  <b>¿Desactivar la analítica impide que se envíen solicitudes al modelo?</b> No: las solicitudes y las respuestas siempre van al servidor, es la base del trabajo del agente.

  <b>¿Basta con la sola línea [analytics] enabled = false?</b> El esquema de ajustes aclara que en ese caso los exportadores OTLP propios del programa siguen activos, y que las métricas se apagan por completo con metrics_exporter = "none".

  <b>¿Todo lo que el agente registró localmente va al servidor?</b> No: en el código de Codex CLI, las bases de datos locales del directorio ~/.codex (historial de sesiones, registros) se escriben siempre, pero no encontré código de red que las sincronice. La excepción: los registros de ellas pueden salir al enviar /feedback, y solo por decisión de la persona.
</b-chapter>
<b-chapter id="compare" title="Acceso: Codex y Claude Code" icon="table-grid">
  <b-why>En ambos agentes el inicio de sesión está ligado a la lista de países de la empresa que está detrás, y Rusia no está en ninguna<b-proof href="https://www.anthropic.com/supported-countries" quote="Anthropic: «Any country or region not listed is unsupported.» — anthropic.com/supported-countries"/>. Los criterios de las listas difieren: para OpenAI son los países donde se ofrecen los servicios, para Anthropic también cuentan la ubicación física de la persona, el registro de la empresa y quién es su dueño.</b-why>

  Claude Code es el agente de programación de Anthropic, y también funciona en la terminal. La comparación ayuda cuando una persona elige entre dos agentes y quiere saber si el acceso funciona igual en ambos. Es igual en lo principal: las dos empresas publican una lista de países, y fuera de la lista no se ofrece acceso. Lo que cambia es qué se comprueba exactamente y qué cubre la lista.
  <iso-art name="codex-access-regions-vpn-bans/compare-lists"></iso-art>
  <b-cap>Dos entradas: la lista de OpenAI y la lista de Anthropic. Rusia no está en ninguna, y los criterios de las listas difieren.</b-cap>

  <b-sublabel top="18">Tabla resumen</b-sublabel>
  <b-ctx-table phone="wrap" first="34">
    <table>
    <thead>
      <tr><th></th><th>Codex (OpenAI)</th><th>Claude Code (Anthropic)</th></tr>
    </thead>
    <tbody>
      <tr><td>Rusia en la lista</td><td>no</td><td>no</td></tr>
      <tr><td>Qué cubre la lista</td><td>ChatGPT y la API; sin regla aparte para Codex</td><td>aplicaciones, incluido Claude Code, y la API</td></tr>
      <tr><td>Criterio</td><td>lista de países donde se ofrecen los servicios</td><td>ubicación física, registro y quién es dueño de la empresa</td></tr>
      <tr><td>VPN en la política regional</td><td>no se menciona</td><td>no se menciona</td></tr>
      <tr><td>Inicio de sesión</td><td>ChatGPT o una clave de API</td><td>una suscripción de Claude o una cuenta de Console</td></tr>
      <tr><td>Diferencias entre las listas</td><td colspan="2">Afganistán, Myanmar y Yemen están en la lista de OpenAI y no en la de Anthropic</td></tr>
    </tbody>
    </table>
  </b-ctx-table>

  Tres filas de la tabla necesitan una explicación. En la fila de cobertura, OpenAI tiene una lista para ChatGPT y la API, y Codex no recibe una regla propia, mientras que la lista de Anthropic nombra directamente las aplicaciones, Claude Code entre ellas. En la fila del criterio, Anthropic comprueba tres señales, así que una empresa de una región no admitida queda fuera aunque sus empleados estén en un país de la lista. La lista de países de OpenAI no tiene esas señales para las empresas. La última fila es la diferencia por país: Afganistán, Myanmar y Yemen figuran en la lista de OpenAI y faltan en la de Anthropic.

  El análisis para Claude Code, con errores de instalación, verificación por teléfono y pago, está en un artículo aparte sobre regiones, VPN y bloqueos.
  <b-links cols="2">
    <item href="/blog/claude-code-access-regions-vpn-bans/" k="Región" t="Claude Code: regiones, VPN y bloqueos">El mismo tema para Claude Code</item>
    <item href="/blog/claude-code-install-and-price/" k="Instalación" t="Claude Code: cómo instalarlo y cuánto cuesta">Comando, inicio de sesión, planes</item>
  </b-links>
</b-chapter>
<b-chapter id="legal" title="Qué puedes hacer de forma legítima" icon="check">
  <b-why>Los términos de OpenAI dejan cuatro caminos que no necesitan ningún rodeo: buscar tu país en la lista, leer los términos, escribir al soporte y elegir otro agente.</b-why>

  Existen opciones legítimas, y ninguna incluye saltarse las reglas. El camino más directo es buscar tu país en la lista de OpenAI. El siguiente es leer los términos para particulares o para organizaciones antes de empezar a trabajar. Un tercer camino es para cuando el país está en la lista pero el inicio de sesión no funciona: escribe al soporte. El cuarto es elegir otro agente cuyos términos admitan tu país.
  <iso-art name="codex-access-regions-vpn-bans/legal-paths"></iso-art>
  <b-cap>Cuatro caminos con una marca de verificación están abiertos: un país de la lista, los términos, el soporte y otro agente. La puerta naranja cerrada representa saltarse las reglas, que aquí no cabe.</b-cap>

  <b-seq-row>
    <step t="País">búscalo en la lista de OpenAI</step>
    <step t="Términos">lee los términos para particulares o para organizaciones</step>
    <step t="Soporte">si la lista no te corresponde, escribe al soporte</step>
    <step t="Otro agente">elige un programa con acceso abierto</step>
  </b-seq-row>

  <b-sublabel top="18">Qué hacer en cada situación</b-sublabel>
  <b-ctx-table phone="wrap">
    <table>
    <thead>
      <tr><th>Situación</th><th>Paso</th></tr>
    </thead>
    <tbody>
      <tr><td>El país está en la lista, pero el inicio de sesión no funciona</td><td>escribe al soporte de OpenAI y adjunta el texto del error; la apelación va por el mismo canal</td></tr>
      <tr><td>El país no está en la lista</td><td>considera el acceso cerrado; busca un agente cuyos términos admitan tu país</td></tr>
      <tr><td>Necesitas trabajar con un modelo local</td><td><a href="/materials/glossary/opencode/">OpenCode</a>: eliges tú el modelo, incluido uno local; comprueba aparte los términos del modelo y de su proveedor</td></tr>
      <tr><td>Una empresa en una región no admitida</td><td>una revisión legal de los términos antes de empezar a trabajar; Anthropic cierra las organizaciones registradas o controladas desde una región no admitida</td></tr>
    </tbody>
    </table>
  </b-ctx-table>

  OpenCode es un agente abierto: no aporta ningún modelo propio y se conecta al modelo del proveedor que elijas, y ese proveedor fija las reglas regionales. Por eso la elección debe seguir la lista de países del proveedor del modelo.
  <b-sublabel top="18">Un ejemplo seguido</b-sublabel>
  <b-steps round>
    <step t="Aigul vive en Biskek y quiere empezar con Codex">Encuentra la fila «Kyrgyzstan» en la lista de OpenAI, lee los términos para particulares e inicia sesión con una suscripción de ChatGPT a su nombre. Una semana después el inicio de sesión deja de funcionar y la pantalla muestra un error. Escribe al soporte de OpenAI, adjunta el texto del error y la fecha, y espera una respuesta. Para comprobarlo tú mismo: abre la lista, busca tu país y guarda una captura de pantalla de la fila junto con la fecha.</step>
  </b-steps>

  <b-cap>Una cuenta ajena, una clave de API ajena, los intermediarios y la reventa de acceso incumplen los términos: una cuenta no puede pasarse a otros. Estas formas no se tratan aquí.</b-cap>
</b-chapter>
<b-chapter id="faq" icon="chat" title="Preguntas frecuentes">
  <b-faq-cards>
    <q t="¿Funciona Codex en Rusia?">Oficialmente no: Rusia no está en la lista de países admitidos de OpenAI para ChatGPT y la API, y las páginas públicas no tienen reglas aparte para Codex. Fuente: help.openai.com/en/articles/7947663 y developers.openai.com/api/docs/supported-countries. Fecha de comprobación: 18.11.2026.</q>
    <q t="¿Puedo usar Codex con una VPN?">La VPN no se menciona ni en los términos ni en el artículo de ayuda sobre países. Una VPN es un programa que cambia la dirección desde la que accedes a la red. Los términos prohíben saltarse restricciones y medidas de protección, y OpenAI advierte de un bloqueo de la cuenta por acceder desde fuera de la lista. Los documentos no dan una respuesta clara, así que la decisión es tuya y bajo tu propio riesgo. Fuente: openai.com/policies/row-terms-of-use. Fecha de comprobación: 18.11.2026.</q>
    <q t="¿Por qué bloquea OpenAI las cuentas?">Lo confirmado: el acceso desde fuera de la lista de países, el incumplimiento de los términos o de las políticas de uso, un requisito legal y un riesgo de daño. El artículo de ayuda aparte sobre las causas de bloqueo compruébalo a mano en help.openai.com. Una apelación va por el soporte. Fecha de comprobación: 18.11.2026.</q>
    <q t="¿Cómo desactivo la analítica en Codex?">En config.toml añade [analytics] enabled = false, [otel] metrics_exporter = "none" y [feedback] enabled = false. Los dos primeros desactivan la analítica y las métricas integradas, el tercero desactiva el envío de comentarios. Las solicitudes al modelo siguen saliendo. Fuente: learn.chatgpt.com/docs/config-file/config-reference. Fecha de comprobación: 18.11.2026.</q>
    <q t="¿En qué se diferencia la lista de países de OpenAI de la de Anthropic?">Los criterios difieren. Para OpenAI son los países donde se ofrecen los servicios de ChatGPT y la API. Para Anthropic también cuentan la ubicación física de la persona, el registro de la empresa y quién es su dueño. Afganistán, Myanmar y Yemen están en la lista de OpenAI y no en la de Anthropic. Fecha de comprobación: 18.11.2026.</q>
    <q t="¿Qué hago si el país está en la lista pero el inicio de sesión no funciona?">Escribe al soporte de OpenAI y adjunta el texto del error: el artículo de ayuda sobre países dice que el error es posible incluso en un país admitido después de que un dispositivo se usara en una región no admitida. Una apelación contra un bloqueo va por el mismo soporte. Fecha de comprobación: 18.11.2026.</q>
  </b-faq-cards>
</b-chapter>
<b-chapter id="start" title="Prompts para el agente" icon="zap">
  <b-why>Tres prompts preparados que no cambian nada sin tu confirmación.</b-why>

  El primer prompt solo lee: muestra tres ajustes de recogida de datos. El segundo muestra cómo inició sesión Codex, con ChatGPT o con una clave de API, y dónde están los datos de inicio de sesión. El tercero escribe en el archivo de ajustes, así que el agente primero muestra un diff, es decir, la diferencia entre el archivo antiguo y el nuevo, y espera la confirmación.
  <b-codebox title="1. Qué ajustes de recogida de datos hay" copy>
    Muéstrame qué ajustes de analytics, otel y feedback están puestos ahora en el config.toml de Codex. No cambies nada.
  </b-codebox>
  <b-codebox title="2. Cómo inició sesión Codex" copy>
    Muéstrame cómo tengo iniciada la sesión en Codex ahora: con ChatGPT o con una clave de API, y dónde están los datos de inicio de sesión.
  </b-codebox>
  <b-codebox title="3. Desactivar el envío de datos de más" copy>
    Añade los bloques [analytics] enabled = false, [otel] metrics_exporter = "none" y [feedback] enabled = false a config.toml. Primero muéstrame el diff y espera mi confirmación.
  </b-codebox>
  <b-cap>El primer y el segundo prompt solo leen. El tercero escribe en el archivo de ajustes, así que mira el diff antes de que se escriba.</b-cap>
</b-chapter>
<b-chapter id="next" title="Seguir leyendo">
  <b-links cols="2">
    <item href="/blog/codex-or-chatgpt-what-to-choose/" k="Elección" t="Codex o ChatGPT">Qué elegir para trabajar con código</item>
    <item href="/blog/claude-code-access-regions-vpn-bans/" k="Región" t="Claude Code: regiones, VPN y bloqueos">El mismo tema para Claude Code</item>
    <item href="/blog/claude-code-install-and-price/" k="Instalación" t="Claude Code: cómo instalarlo y cuánto cuesta">Comando, inicio de sesión, planes</item>
    <item href="/blog/ai-in-code-harness-and-tools/" k="Comparación" t="Diferencia entre Codex y Claude Code, Cursor y Hermes Agent">Qué agente para qué tarea</item>
    <item href="/blog/specs-rules-skills/" k="Contexto" t="AGENTS.md, CLAUDE.md y spec.md">Qué instrucciones lee el agente</item>
    <item href="/materials/glossary/codex/" k="Término" t="Codex">Qué hace y dónde se ejecuta</item>
  </b-links>
</b-chapter>
<b-footer>Basado en las listas de países y los términos de OpenAI, la documentación de Codex y el código fuente de Codex CLI. Fecha de comprobación: 18.11.2026. Las listas de países cambian; abre la fuente primaria antes de decidir.</b-footer>
</b-post>
