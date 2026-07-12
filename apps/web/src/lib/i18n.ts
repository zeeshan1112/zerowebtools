export type SupportedLocale = "en" | "es" | "de" | "fr" | "pt" | "ja" | "zh" | "hi" | "it" | "ar";

export const LOCALES: SupportedLocale[] = ["en", "es", "de", "fr", "pt", "ja", "zh", "hi", "it", "ar"];

export interface TranslationDictionary {
  homeTitle: string;
  homeDesc: string;
  searchPlaceholder: string;
  exploreAllTools: string;
  allTools: string;
  pdfTools: string;
  imageTools: string;
  developerTools: string;
  generators: string;
  textTools: string;
  calculators: string;
  fun: string;
  launch: string;
  extensionTools: string;
  live: string;
  savedTools: string;
  spotlightUtilities: string;
  guidesResources: string;
  privacy: string;
  terms: string;
  comingSoon: string;
  toolFilter: string;
  privateBadge: string;
  faqTitle: string;
  faqSubtitle: string;
  howToDesc: string;
  faqQ1: string;
  faqA1: string;
  faqQ2: string;
  faqA2: string;
  faqQ3: string;
  faqA3: string;
  aboutTitle: string;
  aboutMission: string;
  aboutMissionP1: string;
  aboutMissionP2: string;
  aboutArchitecture: string;
  aboutArchitectureP1: string;
  aboutArchList1: string;
  aboutArchList2: string;
  aboutArchList3: string;
  aboutOpenSource: string;
  aboutOpenSourceP1: string;
  aboutWhoWeAre: string;
  aboutWhoWeAreP1: string;
  contactTitle: string;
  contactSubtitle: string;
  contactEmailLabel: string;
  contactEmailDesc: string;
  contactRequestLabel: string;
  contactRequestDesc: string;
  contactFormTitle: string;
  contactFormSuccess: string;
  contactFormSuccessDesc: string;
  contactFormSendAnother: string;
  contactFormEmailLabel: string;
  contactFormEmailPlaceholder: string;
  contactFormSubjectLabel: string;
  contactFormSubjectPlaceholder: string;
  contactFormMessageLabel: string;
  contactFormMessagePlaceholder: string;
  contactFormError: string;
  contactFormSubmitting: string;
  contactFormSubmit: string;
  privacyTitle: string;
  privacyDataColTitle: string;
  privacyDataColDesc: string;
  privacyCookiesTitle: string;
  privacyCookiesDesc: string;
  privacyThirdPartyTitle: string;
  privacyThirdPartyDesc: string;
  privacyContactTitle: string;
  privacyContactDesc: string;
  termsTitle: string;
  termsUseTitle: string;
  termsUseDesc: string;
  termsWarrantiesTitle: string;
  termsWarrantiesDesc: string;
  termsIPTitle: string;
  extTag: string;
  extTitle: string;
  extDesc: string;
  extChrome: string;
  extFirefox: string;
  extCard1Title: string;
  extCard1Desc: string;
  extCard1ClientSide: string;
  extCard2Title: string;
  extCard2Desc: string;
  extCard2Privacy: string;
  extHowTitle: string;
  extStep1Title: string;
  extStep1Desc: string;
  extStep2Title: string;
  extStep2Desc: string;
  extStep3Title: string;
  extStep3Desc: string;
  extSecurityTitle: string;
  extSecurityDesc: string;
  headerAbout: string;
  headerContact: string;
  searchNoResults: string;
  searchResults: string;
  searchPopular: string;
  searchClientSide: string;
  searchNavigate: string;
  searchSelect: string;
  searchQuick: string;
  searchDesktopOnly: string;
  compareTag: string;
  compareTitle: string;
  compareDesc: string;
  compareVs: string;
  compareBtn: string;
  recipesTag: string;
  recipesTitle: string;
  recipesDesc: string;
  recipesViewGuide: string;
  searchEscape: string;
  termsIPDesc: string;
  termsAdsTitle: string;
  termsAdsDesc: string;
  termsChangesTitle: string;
  termsChangesDesc: string;
  termsContactTitle: string;
  termsContactDesc: string;
}

const DICTIONARIES: Record<SupportedLocale, TranslationDictionary> = {
  en: {
    homeTitle: "Simple, Private Web Tools Right in Your Browser.",
    homeDesc: "Free, fast, and completely secure tools to edit PDFs, convert formats, check MRR growth, and resize images. All tools run entirely locally on your device so your files never leave your computer.",
    searchPlaceholder: "Search for a tool (e.g. merge pdf)...",
    exploreAllTools: "Explore All Tools",
    allTools: "All Tools",
    pdfTools: "PDF Tools",
    imageTools: "Media & Video",
    developerTools: "Developer Tools",
    generators: "Generators",
    textTools: "Text Tools",
    calculators: "Calculators",
    fun: "Fun",
    launch: "Launch",
    extensionTools: "Extension Tools",
    live: "LIVE",
    savedTools: "Your Saved Tools",
    spotlightUtilities: "Spotlight Utilities",
    guidesResources: "Guides & Resources",
    privacy: "Privacy",
    terms: "Terms",
    comingSoon: "Coming",
    toolFilter: "Tool Filter",
    privateBadge: "100% Private • {count} free online tools",
    faqTitle: "Frequently Asked Questions",
    faqSubtitle: "Everything you need to know about ZeroWebTools privacy and usage.",
    howToDesc: "Explore quick-start tutorials, visual multi-tool chaining recipes, and detailed privacy-first competitor comparisons.",
    faqQ1: "Is it completely free?",
    faqA1: "Yes, ZeroWebTools is 100% free. No subscriptions, no hidden fees, and no sign-up required.",
    faqQ2: "Are my files uploaded to a server?",
    faqA2: "No. All tools execute entirely client-side using WebAssembly in your browser. Your files never leave your device.",
    faqQ3: "Do I need to download anything?",
    faqA3: "No, you do not need to install any apps or software. Everything works securely inside your web browser.",
    aboutTitle: "About ZeroWebTools",
    aboutMission: "Our Mission",
    aboutMissionP1: "ZeroWebTools was founded with a simple but critical mission: to provide developers, system administrators, and content creators with a premium, lightning-fast suite of utility tools that respects their data privacy.",
    aboutMissionP2: "Standard online tools—such as PDF compilers, JSON formatters, or base64 decoders—frequently upload your files, tokens, and sensitive logs to remote servers for processing. This exposes proprietary code, customer records, and secure tokens to potential interception or data leaks.",
    aboutArchitecture: "100% Client-Side Architecture",
    aboutArchitectureP1: "To solve this vulnerability, we built ZeroWebTools with a privacy-first local architecture. Every tool in our catalog of 57+ resources runs entirely within your browser context:",
    aboutArchList1: "Zero Server Uploads: Your documents, code blocks, and parameters never leave your local computer.",
    aboutArchList2: "WebAssembly Power: Heavy operations like image conversions and PDF rendering are compiled directly into WebAssembly (Wasm) and executed client-side at native speed.",
    aboutArchList3: "Offline Support: Because no server-side computing is required, our tools can be accessed and operated entirely offline.",
    aboutOpenSource: "Open Source & Transparency",
    aboutOpenSourceP1: "For advanced features like local CORS requests and webpage content scraping, we maintain the open-source ZeroWebTools Companion extension and main repository. Like our web platform, the companion runs fully client-side and performs zero remote logging or analytics. By publishing our source code publicly on GitHub, we invite users and security auditors to verify our code integrity.",
    aboutWhoWeAre: "Who We Are",
    aboutWhoWeAreP1: "We are an independent, developer-driven team dedicated to building a cleaner, safer web platform. ZeroWebTools is free to use, and we support our development and hosting costs entirely through clean, non-intrusive ad networks.",
    contactTitle: "Contact Support",
    contactSubtitle: "Have a question, feedback, tool request, or bug report? Get in touch with us directly. We respond to all technical inquiries within 24–48 hours.",
    contactEmailLabel: "Email Address",
    contactEmailDesc: "For general support, API queries, or corporate licensing requests, email us directly:",
    contactRequestLabel: "Feature Requests & Bugs",
    contactRequestDesc: "Want a new tool? Found a bug? Open an issue on our GitHub repository:",
    contactFormTitle: "Send a Message",
    contactFormSuccess: "Message sent successfully!",
    contactFormSuccessDesc: "Thank you for reaching out. We will get back to you at your email soon.",
    contactFormSendAnother: "Send another message",
    contactFormEmailLabel: "Your Email",
    contactFormEmailPlaceholder: "developer@example.com",
    contactFormSubjectLabel: "Subject",
    contactFormSubjectPlaceholder: "Bug Report / Tool Request",
    contactFormMessageLabel: "Message",
    contactFormMessagePlaceholder: "Describe your issue or suggestion in detail...",
    contactFormError: "Something went wrong. Please try again or email us directly.",
    contactFormSubmitting: "Sending...",
    contactFormSubmit: "Send Message",
    privacyTitle: "Privacy Policy",
    privacyDataColTitle: "Data Collection",
    privacyDataColDesc: "ZeroWebTools operates entirely within your browser. No personal data, tool inputs, or processing results are transmitted to any server. All computations execute client-side using JavaScript.",
    privacyCookiesTitle: "Cookies and Analytics",
    privacyCookiesDesc: "We may use essential cookies for site functionality and third-party analytics cookies to understand usage patterns. Google AdSense may serve advertisements using cookies as described in Google's advertising policies.",
    privacyThirdPartyTitle: "Third-Party Services",
    privacyThirdPartyDesc: "Google AdSense may use cookies and web beacons to serve advertisements based on prior visits. Users may opt out of personalized advertising through Google Ads Settings.",
    privacyContactTitle: "Contact",
    privacyContactDesc: "For privacy-related inquiries, contact us directly at ",
    termsTitle: "Terms of Service",
    termsUseTitle: "Use of Service",
    termsUseDesc: "ZeroWebTools provides free, browser-based developer utility tools. By using these tools, you agree to these terms. All tools process data locally in your browser; no data is sent to external servers.",
    termsWarrantiesTitle: "Disclaimer of Warranties",
    termsWarrantiesDesc: "The tools are provided 'as is' without warranty of any kind. We make no guarantees about accuracy, reliability, or fitness for a particular purpose. Use results at your own discretion.",
    termsIPTitle: "Intellectual Property",
    extTag: "OFFICIAL COMPANION EXTENSION",
    extTitle: "ZeroWebTools Companion",
    extDesc: "A secure browser extension designed to extend the web platform's capabilities. Unlocks offline developer utilities and bridges browser permissions for advanced online tools.",
    extChrome: "Add to Chrome",
    extFirefox: "Add to Firefox",
    extCard1Title: "Offline Utility Toolbar",
    extCard1Desc: "Access critical utility editors directly in your browser's menu bar at any time—no internet connection required. Runs in a fully private local sandbox.",
    extCard1ClientSide: "⚡ 100% Client-Side Processing",
    extCard2Title: "Platform API Bridge",
    extCard2Desc: "Unlock advanced tools on zerowebtools.com that require elevated browser scopes or CORS permissions. The extension safely executes them on your behalf.",
    extCard2Privacy: "🛡️ End-to-End Privacy Guarded",
    extHowTitle: "How The Companion Integrates",
    extStep1Title: "Install the Extension",
    extStep1Desc: "Download from the Chrome Web Store. It sits silently in your extension toolbar waiting for command triggers.",
    extStep2Title: "Bridge Detection",
    extStep2Desc: "When you visit toolpages like the REST API Client, the page detects the companion secure bridge automatically.",
    extStep3Title: "Execute Locally",
    extStep3Desc: "Queries and scrapes run directly from your browser engine, bypassing CORS limits without third-party servers.",
    extSecurityTitle: "100% Open & Auditable",
    extSecurityDesc: "The ZeroWebTools Companion contains **zero tracking pixels, diagnostic pings, or analytics databases**. It acts solely as an offline processing container and a local proxy bridge on your hardware.",
    headerAbout: "About",
    headerContact: "Contact",
    searchNoResults: "No tools found matching your query.",
    searchResults: "Search results",
    searchPopular: "Popular quick tools",
    searchClientSide: "Client-side",
    searchNavigate: "Navigate",
    searchSelect: "Select",
    searchQuick: "Quick search...",
    searchDesktopOnly: "Desktop Only",
    compareTag: "Alternatives & Matchups",
    compareTitle: "ZeroWebTools vs Competitors",
    compareDesc: "Discover why ZeroWebTools is the leading privacy-first alternative. 100% local, browser-based execution with zero file uploads and no subscription walls.",
    compareVs: "vs",
    compareBtn: "Compare",
    recipesTag: "Chaining Workflows",
    recipesTitle: "Multi-Tool Workflow Recipes",
    recipesDesc: "Combine actions in a single tab. Learn how to sequence and chain our 100% private web utilities without download-upload loops.",
    recipesViewGuide: "View Guide",
    searchEscape: "ESC",
    termsIPDesc: "The ZeroWebTools website design, code, and branding are protected by intellectual property laws. You may not reproduce, modify, or distribute the site's source code without explicit permission.",
    termsAdsTitle: "Advertising",
    termsAdsDesc: "ZeroWebTools displays third-party advertisements through Google AdSense. These ads are subject to Google's own terms and privacy policies. We are not responsible for third-party ad content.",
    termsChangesTitle: "Changes to Terms",
    termsChangesDesc: "We reserve the right to update these terms at any time. Continued use of the site after changes constitutes acceptance of the updated terms.",
    termsContactTitle: "Contact",
    termsContactDesc: "If you have any questions about these Terms, please contact us at ",
  },
  es: {
    homeTitle: "Herramientas web simples y privadas en su navegador.",
    homeDesc: "Herramientas gratuitas, rápidas y seguras para editar PDF, convertir formatos y cambiar el tamaño de imágenes. Todo se ejecuta localmente en su dispositivo sin subir archivos.",
    searchPlaceholder: "Buscar una herramienta (ej. unir pdf)...",
    exploreAllTools: "Explorar Todas",
    allTools: "Todas",
    pdfTools: "Herramientas PDF",
    imageTools: "Medios y Vídeo",
    developerTools: "Desarrolladores",
    generators: "Generadores",
    textTools: "Texto",
    calculators: "Calculadoras",
    fun: "Diversión",
    launch: "Abrir",
    extensionTools: "Herramientas de extensión",
    live: "VIVIR",
    savedTools: "Tus Herramientas Guardadas",
    spotlightUtilities: "Destacadas",
    guidesResources: "Guías y Recursos",
    privacy: "Privacidad",
    terms: "Términos",
    comingSoon: "Próximamente",
    toolFilter: "Filtro",
    privateBadge: "100% Privado • {count} herramientas gratuitas",
    faqTitle: "Preguntas Frecuentes",
    faqSubtitle: "Todo lo que necesita saber sobre la privacidad de ZeroWebTools.",
    howToDesc: "Explore tutoriales de inicio rápido, recetas visuales de encadenamiento de herramientas y comparaciones detalladas de competidores que priorizan la privacidad.",
    faqQ1: "¿Es completamente gratis?",
    faqA1: "Sí, ZeroWebTools es 100% gratuito. Sin suscripciones, sin tarifas ocultas y sin necesidad de registrarse.",
    faqQ2: "¿Mis archivos se cargan en un servidor?",
    faqA2: "No. Todas las herramientas se ejecutan completamente en el lado del cliente mediante WebAssembly en su navegador. Tus archivos nunca salen de tu dispositivo.",
    faqQ3: "¿Necesito descargar algo?",
    faqA3: "No, no es necesario instalar ninguna aplicación o software. Todo funciona de forma segura dentro de su navegador web.",
    aboutTitle: "Acerca de ZeroWebTools",
    aboutMission: "Nuestra Misión",
    aboutMissionP1: "ZeroWebTools se fundó con una misión simple pero fundamental: proporcionar a los desarrolladores, administradores de sistemas y creadores de contenido un conjunto de herramientas de utilidad premium, ultrarrápido y que respete la privacidad de sus datos.",
    aboutMissionP2: "Las herramientas en línea estándar, como compiladores de PDF, formateadores JSON o decodificadores base64, cargan con frecuencia sus archivos, tokens y registros confidenciales a servidores remotos para su procesamiento. Esto expone el código propietario, los registros de clientes y los tokens seguros a posibles interceptaciones o fugas de datos.",
    aboutArchitecture: "Arquitectura 100% del lado del cliente",
    aboutArchitectureP1: "Para resolver esta vulnerabilidad, creamos ZeroWebTools con una arquitectura local que prioriza la privacidad. Cada herramienta de nuestro catálogo de más de 57 recursos se ejecuta completamente dentro del contexto de su navegador:",
    aboutArchList1: "Cargas de servidor cero: sus documentos, bloques de código y parámetros nunca salen de su computadora local.",
    aboutArchList2: "WebAssembly Power: operaciones pesadas como conversiones de imágenes y renderizado de PDF se compilan directamente en WebAssembly (Wasm) y se ejecutan en el lado del cliente a velocidad nativa.",
    aboutArchList3: "Soporte sin conexión: debido a que no se requiere computación del lado del servidor, se puede acceder a nuestras herramientas y operarlas completamente sin conexión.",
    aboutOpenSource: "Código abierto y transparencia",
    aboutOpenSourceP1: "Para funciones avanzadas como solicitudes CORS locales y extracción de contenido de páginas web, mantenemos la extensión ZeroWebTools Companion de código abierto y el repositorio principal. Al igual que nuestra plataforma web, el complemento se ejecuta completamente en el lado del cliente y no realiza registros ni análisis remotos. Al publicar nuestro código fuente públicamente en GitHub, invitamos a los usuarios y auditores de seguridad a verificar la integridad de nuestro código.",
    aboutWhoWeAre: "Quienes somos",
    aboutWhoWeAreP1: "Somos un equipo independiente, impulsado por desarrolladores, dedicado a construir una plataforma web más limpia y segura. ZeroWebTools es de uso gratuito y respaldamos nuestros costos de desarrollo y alojamiento completamente a través de redes publicitarias limpias y no intrusivas.",
    contactTitle: "Contactar con soporte",
    contactSubtitle: "¿Tiene alguna pregunta, comentario, solicitud de herramienta o informe de error? Ponte en contacto con nosotros directamente. Respondemos a todas las consultas técnicas en un plazo de 24 a 48 horas.",
    contactEmailLabel: "Dirección de correo electrónico",
    contactEmailDesc: "Para soporte general, consultas de API o solicitudes de licencias corporativas, envíenos un correo electrónico directamente:",
    contactRequestLabel: "Solicitudes de funciones y errores",
    contactRequestDesc: "¿Quieres una nueva herramienta? ¿Encontraste un error? Abra una incidencia en nuestro repositorio de GitHub:",
    contactFormTitle: "Enviar un mensaje",
    contactFormSuccess: "¡Mensaje enviado exitosamente!",
    contactFormSuccessDesc: "Gracias por comunicarte. Nos comunicaremos con usted pronto a su correo electrónico.",
    contactFormSendAnother: "enviar otro mensaje",
    contactFormEmailLabel: "Tu correo electrónico",
    contactFormEmailPlaceholder: "desarrollador@ejemplo.com",
    contactFormSubjectLabel: "Sujeto",
    contactFormSubjectPlaceholder: "Informe de error/solicitud de herramienta",
    contactFormMessageLabel: "Mensaje",
    contactFormMessagePlaceholder: "Describe tu problema o sugerencia en detalle...",
    contactFormError: "Algo salió mal. Inténtelo de nuevo o envíenos un correo electrónico directamente.",
    contactFormSubmitting: "Envío...",
    contactFormSubmit: "Enviar mensaje",
    privacyTitle: "política de privacidad",
    privacyDataColTitle: "Recopilación de datos",
    privacyDataColDesc: "ZeroWebTools funciona completamente dentro de su navegador. No se transmiten datos personales, entradas de herramientas ni resultados de procesamiento a ningún servidor. Todos los cálculos se ejecutan en el lado del cliente mediante JavaScript.",
    privacyCookiesTitle: "Cookies y análisis",
    privacyCookiesDesc: "Podemos utilizar cookies esenciales para la funcionalidad del sitio y cookies analíticas de terceros para comprender los patrones de uso. Google AdSense puede publicar anuncios utilizando cookies como se describe en las políticas publicitarias de Google.",
    privacyThirdPartyTitle: "Servicios de terceros",
    privacyThirdPartyDesc: "Google AdSense puede utilizar cookies y balizas web para publicar anuncios basados ​​en visitas anteriores. Los usuarios pueden optar por no recibir publicidad personalizada a través de la Configuración de anuncios de Google.",
    privacyContactTitle: "Contacto",
    privacyContactDesc: "Para consultas relacionadas con la privacidad, contáctenos directamente al",
    termsTitle: "Términos de servicio",
    termsUseTitle: "Uso del servicio",
    termsUseDesc: "ZeroWebTools proporciona herramientas de utilidad para desarrolladores gratuitas basadas en navegador. Al utilizar estas herramientas, usted acepta estos términos. Todas las herramientas procesan datos localmente en su navegador; no se envían datos a servidores externos.",
    termsWarrantiesTitle: "Renuncia de garantías",
    termsWarrantiesDesc: "Las herramientas se proporcionan \"tal cual\" sin garantía de ningún tipo. No ofrecemos garantías sobre la precisión, confiabilidad o idoneidad para un propósito particular. Utilice los resultados a su propia discreción.",
    termsIPTitle: "Propiedad Intelectual",
    extTag: "EXTENSIÓN OFICIAL DE ACOMPAÑANTE",
    extTitle: "Compañero de ZeroWebTools",
    extDesc: "Una extensión de navegador segura diseñada para ampliar las capacidades de la plataforma web. Desbloquea utilidades para desarrolladores fuera de línea y une los permisos del navegador para herramientas avanzadas en línea.",
    extChrome: "Agregar a Chrome",
    extFirefox: "Añadir a Firefox",
    extCard1Title: "Barra de herramientas de utilidad sin conexión",
    extCard1Desc: "Acceda a editores de utilidades importantes directamente desde la barra de menú de su navegador en cualquier momento, sin necesidad de conexión a Internet. Se ejecuta en una zona de pruebas local totalmente privada.",
    extCard1ClientSide: "⚡ Procesamiento 100% del lado del cliente",
    extCard2Title: "Puente API de plataforma",
    extCard2Desc: "Desbloquee herramientas avanzadas en zerowebtools.com que requieren alcances de navegador elevados o permisos CORS. La extensión los ejecuta de forma segura en su nombre.",
    extCard2Privacy: "🛡️ Privacidad protegida de extremo a extremo",
    extHowTitle: "Cómo se integra el compañero",
    extStep1Title: "Instalar la extensión",
    extStep1Desc: "Descárguelo desde Chrome Web Store. Se encuentra silenciosamente en la barra de herramientas de su extensión esperando que se activen comandos.",
    extStep2Title: "Detección de puentes",
    extStep2Desc: "Cuando visita páginas de herramientas como el Cliente API REST, la página detecta automáticamente el puente seguro complementario.",
    extStep3Title: "Ejecutar localmente",
    extStep3Desc: "Las consultas y los scrapes se ejecutan directamente desde el motor de su navegador, sin pasar por los límites de CORS sin servidores de terceros.",
    extSecurityTitle: "100% abierto y auditable",
    extSecurityDesc: "ZeroWebTools Companion contiene **cero píxeles de seguimiento, pings de diagnóstico o bases de datos de análisis**. Actúa únicamente como un contenedor de procesamiento fuera de línea y un puente proxy local en su hardware.",
    headerAbout: "Acerca de",
    headerContact: "Contacto",
    searchNoResults: "No se encontraron herramientas que coincidan con su consulta.",
    searchResults: "Resultados de la búsqueda",
    searchPopular: "Herramientas rápidas populares",
    searchClientSide: "Lado del cliente",
    searchNavigate: "Navegar por",
    searchSelect: "Seleccionar",
    searchQuick: "Búsqueda rápida...",
    searchDesktopOnly: "Solo escritorio",
    compareTag: "Alternativas y enfrentamientos",
    compareTitle: "ZeroWebTools frente a la competencia",
    compareDesc: "Descubra por qué ZeroWebTools es la alternativa líder que prioriza la privacidad. Ejecución 100 % local, basada en navegador, sin carga de archivos y sin muros de suscripción.",
    compareVs: "vs",
    compareBtn: "Comparar",
    recipesTag: "Encadenamiento de flujos de trabajo",
    recipesTitle: "Recetas de flujo de trabajo de múltiples herramientas",
    recipesDesc: "Combina acciones en una sola pestaña. Aprenda a secuenciar y encadenar nuestras utilidades web 100 % privadas sin bucles de descarga y carga.",
    recipesViewGuide: "Ver guía",
    searchEscape: "ESC",
    termsIPDesc: "El diseño, el código y la marca del sitio web ZeroWebTools están protegidos por leyes de propiedad intelectual. No puede reproducir, modificar ni distribuir el código fuente del sitio sin permiso explícito.",
    termsAdsTitle: "Publicidad",
    termsAdsDesc: "ZeroWebTools muestra anuncios de terceros a través de Google AdSense. Estos anuncios están sujetos a los términos y políticas de privacidad propios de Google. No somos responsables del contenido publicitario de terceros.",
    termsChangesTitle: "Cambios a los términos",
    termsChangesDesc: "Nos reservamos el derecho de actualizar estos términos en cualquier momento. El uso continuo del sitio después de los cambios constituye la aceptación de los términos actualizados.",
    termsContactTitle: "Contacto",
    termsContactDesc: "Si tiene alguna pregunta sobre estos Términos, contáctenos en",
  },
  de: {
    homeTitle: "Einfache, private Web-Tools in Ihrem Browser.",
    homeDesc: "Kostenlose, schnelle und sichere Tools zum Bearbeiten von PDFs, Konvertieren von Formaten und Ändern der Bildgröße. Alles läuft lokal ohne Datei-Uploads.",
    searchPlaceholder: "Nach einem Tool suchen (z.B. PDF zusammenfügen)...",
    exploreAllTools: "Alle Tools entdecken",
    allTools: "Alle Tools",
    pdfTools: "PDF-Tools",
    imageTools: "Medien & Video",
    developerTools: "Entwickler-Tools",
    generators: "Generatoren",
    textTools: "Text-Tools",
    calculators: "Rechner",
    fun: "Spaß",
    launch: "Starten",
    extensionTools: "Erweiterungstools",
    live: "LIVE",
    savedTools: "Gespeicherte Tools",
    spotlightUtilities: "Im Rampenlicht",
    guidesResources: "Anleitungen",
    privacy: "Datenschutz",
    terms: "Bedingungen",
    comingSoon: "Demnächst",
    toolFilter: "Filter",
    privateBadge: "100% Privat • {count} kostenlose Tools",
    faqTitle: "Häufig gestellte Fragen",
    faqSubtitle: "Alles, was Sie über die ZeroWebTools wissen müssen.",
    howToDesc: "Entdecken Sie Schnellstart-Anleitungen, visuelle Rezepte zur Tool-Verkettung und detaillierte, datenschutzfreundliche Vergleiche mit Mitbewerbern.",
    faqQ1: "Ist es völlig kostenlos?",
    faqA1: "Ja, ZeroWebTools ist 100 % kostenlos. Keine Abonnements, keine versteckten Gebühren und keine Anmeldung erforderlich.",
    faqQ2: "Werden meine Dateien auf einen Server hochgeladen?",
    faqA2: "Nein. Alle Tools werden vollständig clientseitig mit WebAssembly in Ihrem Browser ausgeführt. Ihre Dateien verlassen niemals Ihr Gerät.",
    faqQ3: "Muss ich etwas herunterladen?",
    faqA3: "Nein, Sie müssen keine Apps oder Software installieren. Alles funktioniert sicher in Ihrem Webbrowser.",
    aboutTitle: "Über ZeroWebTools",
    aboutMission: "Unsere Mission",
    aboutMissionP1: "ZeroWebTools wurde mit einer einfachen, aber entscheidenden Mission gegründet: Entwicklern, Systemadministratoren und Inhaltserstellern eine erstklassige, blitzschnelle Suite von Hilfstools zur Verfügung zu stellen, die ihren Datenschutz respektiert.",
    aboutMissionP2: "Standardmäßige Online-Tools – wie PDF-Compiler, JSON-Formatierer oder Base64-Decoder – laden Ihre Dateien, Token und vertraulichen Protokolle häufig zur Verarbeitung auf Remote-Server hoch. Dadurch sind proprietärer Code, Kundendaten und sichere Token potenziellem Abfangen oder Datenlecks ausgesetzt.",
    aboutArchitecture: "100 % clientseitige Architektur",
    aboutArchitectureP1: "Um diese Schwachstelle zu beheben, haben wir ZeroWebTools mit einer datenschutzorientierten lokalen Architektur entwickelt. Jedes Tool in unserem Katalog mit über 57 Ressourcen läuft vollständig in Ihrem Browser-Kontext:",
    aboutArchList1: "Keine Server-Uploads: Ihre Dokumente, Codeblöcke und Parameter verlassen niemals Ihren lokalen Computer.",
    aboutArchList2: "WebAssembly Power: Schwere Vorgänge wie Bildkonvertierungen und PDF-Rendering werden direkt in WebAssembly (Wasm) kompiliert und clientseitig mit nativer Geschwindigkeit ausgeführt.",
    aboutArchList3: "Offline-Support: Da kein serverseitiges Computing erforderlich ist, können unsere Tools vollständig offline aufgerufen und betrieben werden.",
    aboutOpenSource: "Open Source und Transparenz",
    aboutOpenSourceP1: "Für erweiterte Funktionen wie lokale CORS-Anfragen und das Scraping von Webseiteninhalten pflegen wir die Open-Source-Erweiterung ZeroWebTools Companion und das Haupt-Repository. Wie unsere Webplattform läuft der Begleiter vollständig clientseitig und führt keine Remote-Protokollierung oder -Analyse durch. Durch die öffentliche Veröffentlichung unseres Quellcodes auf GitHub laden wir Benutzer und Sicherheitsprüfer ein, die Integrität unseres Codes zu überprüfen.",
    aboutWhoWeAre: "Wer wir sind",
    aboutWhoWeAreP1: "Wir sind ein unabhängiges, entwicklerorientiertes Team, das sich dem Aufbau einer saubereren und sichereren Webplattform widmet. Die Nutzung von ZeroWebTools ist kostenlos und wir decken unsere Entwicklungs- und Hostingkosten vollständig durch saubere, nicht aufdringliche Werbenetzwerke.",
    contactTitle: "Kontaktieren Sie den Support",
    contactSubtitle: "Haben Sie eine Frage, ein Feedback, eine Tool-Anfrage oder einen Fehlerbericht? Nehmen Sie direkt Kontakt mit uns auf. Wir beantworten alle technischen Anfragen innerhalb von 24–48 Stunden.",
    contactEmailLabel: "E-Mail-Adresse",
    contactEmailDesc: "Für allgemeinen Support, API-Anfragen oder Unternehmenslizenzanfragen senden Sie uns direkt eine E-Mail:",
    contactRequestLabel: "Funktionswünsche und Fehler",
    contactRequestDesc: "Möchten Sie ein neues Werkzeug? Einen Fehler gefunden? Öffnen Sie ein Problem in unserem GitHub-Repository:",
    contactFormTitle: "Senden Sie eine Nachricht",
    contactFormSuccess: "Nachricht erfolgreich gesendet!",
    contactFormSuccessDesc: "Vielen Dank, dass Sie sich gemeldet haben. Wir werden uns in Kürze per E-Mail bei Ihnen melden.",
    contactFormSendAnother: "Senden Sie eine weitere Nachricht",
    contactFormEmailLabel: "Ihre E-Mail",
    contactFormEmailPlaceholder: "Developer@example.com",
    contactFormSubjectLabel: "Thema",
    contactFormSubjectPlaceholder: "Fehlerbericht/Tool-Anfrage",
    contactFormMessageLabel: "Nachricht",
    contactFormMessagePlaceholder: "Beschreiben Sie Ihr Problem oder Ihren Vorschlag ausführlich ...",
    contactFormError: "Etwas ist schief gelaufen. Bitte versuchen Sie es erneut oder senden Sie uns direkt eine E-Mail.",
    contactFormSubmitting: "Senden...",
    contactFormSubmit: "Nachricht senden",
    privacyTitle: "Datenschutzrichtlinie",
    privacyDataColTitle: "Datenerfassung",
    privacyDataColDesc: "ZeroWebTools funktioniert vollständig in Ihrem Browser. Es werden keine personenbezogenen Daten, Werkzeugeingaben oder Verarbeitungsergebnisse an einen Server übermittelt. Alle Berechnungen werden clientseitig mit JavaScript ausgeführt.",
    privacyCookiesTitle: "Cookies und Analysen",
    privacyCookiesDesc: "Wir verwenden möglicherweise wesentliche Cookies für die Funktionalität der Website und Analysecookies von Drittanbietern, um Nutzungsmuster zu verstehen. Google AdSense kann Werbung mithilfe von Cookies schalten, wie in den Werberichtlinien von Google beschrieben.",
    privacyThirdPartyTitle: "Dienste Dritter",
    privacyThirdPartyDesc: "Google AdSense verwendet möglicherweise Cookies und Web-Beacons, um Werbung auf der Grundlage früherer Besuche zu schalten. Nutzer können personalisierte Werbung über die Google-Anzeigeneinstellungen deaktivieren.",
    privacyContactTitle: "Kontakt",
    privacyContactDesc: "Bei Fragen zum Datenschutz wenden Sie sich bitte direkt an uns unter",
    termsTitle: "Nutzungsbedingungen",
    termsUseTitle: "Nutzung des Dienstes",
    termsUseDesc: "ZeroWebTools bietet kostenlose, browserbasierte Hilfsprogramme für Entwickler. Durch die Nutzung dieser Tools stimmen Sie diesen Bedingungen zu. Alle Tools verarbeiten Daten lokal in Ihrem Browser; Es werden keine Daten an externe Server gesendet.",
    termsWarrantiesTitle: "Haftungsausschluss",
    termsWarrantiesDesc: "Die Werkzeuge werden „wie besehen“ ohne jegliche Gewährleistung bereitgestellt. Wir geben keine Garantien hinsichtlich der Genauigkeit, Zuverlässigkeit oder Eignung für einen bestimmten Zweck. Nutzen Sie die Ergebnisse nach eigenem Ermessen.",
    termsIPTitle: "Geistiges Eigentum",
    extTag: "OFFIZIELLE COMPANION-ERWEITERUNG",
    extTitle: "ZeroWebTools-Begleiter",
    extDesc: "Eine sichere Browsererweiterung zur Erweiterung der Funktionen der Webplattform. Schaltet Offline-Entwicklerdienstprogramme frei und überbrückt Browserberechtigungen für erweiterte Online-Tools.",
    extChrome: "Zu Chrome hinzufügen",
    extFirefox: "Zu Firefox hinzufügen",
    extCard1Title: "Symbolleiste des Offline-Dienstprogramms",
    extCard1Desc: "Greifen Sie jederzeit direkt in der Menüleiste Ihres Browsers auf wichtige Dienstprogramm-Editoren zu – keine Internetverbindung erforderlich. Läuft in einer vollständig privaten lokalen Sandbox.",
    extCard1ClientSide: "⚡ 100 % clientseitige Verarbeitung",
    extCard2Title: "Plattform-API-Brücke",
    extCard2Desc: "Schalten Sie erweiterte Tools auf zerowebtools.com frei, die erhöhte Browserbereiche oder CORS-Berechtigungen erfordern. Die Erweiterung führt sie sicher in Ihrem Namen aus.",
    extCard2Privacy: "🛡️ Durchgängiger Datenschutz",
    extHowTitle: "Wie sich der Companion integriert",
    extStep1Title: "Installieren Sie die Erweiterung",
    extStep1Desc: "Aus dem Chrome Web Store herunterladen. Es befindet sich still in der Symbolleiste Ihrer Erweiterung und wartet auf Befehlsauslöser.",
    extStep2Title: "Brückenerkennung",
    extStep2Desc: "Wenn Sie Toolpages wie den REST-API-Client besuchen, erkennt die Seite die begleitende sichere Bridge automatisch.",
    extStep3Title: "Lokal ausführen",
    extStep3Desc: "Abfragen und Scrapes werden direkt von Ihrer Browser-Engine ausgeführt und umgehen CORS-Grenzwerte ohne Server von Drittanbietern.",
    extSecurityTitle: "100 % offen und überprüfbar",
    extSecurityDesc: "Der ZeroWebTools Companion enthält **keine Tracking-Pixel, Diagnose-Pings oder Analysedatenbanken**. Es fungiert ausschließlich als Offline-Verarbeitungscontainer und lokale Proxy-Brücke auf Ihrer Hardware.",
    headerAbout: "Um",
    headerContact: "Kontakt",
    searchNoResults: "Es wurden keine Tools gefunden, die Ihrer Anfrage entsprechen.",
    searchResults: "Suchergebnisse",
    searchPopular: "Beliebte Schnellwerkzeuge",
    searchClientSide: "Client-seitig",
    searchNavigate: "Navigieren",
    searchSelect: "Wählen",
    searchQuick: "Schnellsuche...",
    searchDesktopOnly: "Nur Desktop",
    compareTag: "Alternativen und Matchups",
    compareTitle: "ZeroWebTools gegen Konkurrenten",
    compareDesc: "Entdecken Sie, warum ZeroWebTools die führende Datenschutz-Alternative ist. 100 % lokale, browserbasierte Ausführung ohne Datei-Uploads und ohne Abonnementsperren.",
    compareVs: "vs",
    compareBtn: "Vergleichen",
    recipesTag: "Verketten von Arbeitsabläufen",
    recipesTitle: "Multi-Tool-Workflow-Rezepte",
    recipesDesc: "Kombinieren Sie Aktionen in einer einzigen Registerkarte. Erfahren Sie, wie Sie unsere 100 % privaten Web-Dienstprogramme ohne Download-Upload-Schleifen sequenzieren und verketten.",
    recipesViewGuide: "Anleitung anzeigen",
    searchEscape: "ESC",
    termsIPDesc: "Das Design, der Code und das Branding der ZeroWebTools-Website sind durch Gesetze zum Schutz des geistigen Eigentums geschützt. Sie dürfen den Quellcode der Website nicht ohne ausdrückliche Genehmigung reproduzieren, ändern oder verbreiten.",
    termsAdsTitle: "Werbung",
    termsAdsDesc: "ZeroWebTools zeigt Drittanbieter-Werbung über Google AdSense an. Diese Anzeigen unterliegen den Nutzungsbedingungen und Datenschutzrichtlinien von Google. Wir übernehmen keine Verantwortung für den Anzeigeninhalt Dritter.",
    termsChangesTitle: "Änderungen der Bedingungen",
    termsChangesDesc: "Wir behalten uns das Recht vor, diese Bedingungen jederzeit zu aktualisieren. Die fortgesetzte Nutzung der Website nach Änderungen stellt die Annahme der aktualisierten Bedingungen dar.",
    termsContactTitle: "Kontakt",
    termsContactDesc: "Wenn Sie Fragen zu diesen Bedingungen haben, kontaktieren Sie uns bitte unter",
  },
  fr: {
    homeTitle: "Des outils web simples et privés dans votre navigateur.",
    homeDesc: "Outils gratuits, rapides et sécurisés pour éditer des PDF, convertir des formats et redimensionner des images. Tout fonctionne localement sans téléchargement.",
    searchPlaceholder: "Rechercher un outil (ex: fusionner pdf)...",
    exploreAllTools: "Explorer Tous Les Outils",
    allTools: "Tous",
    pdfTools: "Outils PDF",
    imageTools: "Média & Vidéo",
    developerTools: "Développeurs",
    generators: "Générateurs",
    textTools: "Texte",
    calculators: "Calculatrices",
    fun: "Amusement",
    launch: "Lancer",
    extensionTools: "Outils d'extension",
    live: "EN DIRECT",
    savedTools: "Vos Outils Sauvegardés",
    spotlightUtilities: "À La Une",
    guidesResources: "Guides et Ressources",
    privacy: "Confidentialité",
    terms: "Conditions",
    comingSoon: "Bientôt",
    toolFilter: "Filtre",
    privateBadge: "100% Privé • {count} outils gratuits",
    faqTitle: "Foire Aux Questions",
    faqSubtitle: "Tout ce que vous devez savoir sur ZeroWebTools.",
    howToDesc: "Explorez des tutoriels de démarrage rapide, des recettes visuelles d'enchaînement d'outils et des comparaisons détaillées de concurrents respectant la vie privée.",
    faqQ1: "Est-ce totalement gratuit ?",
    faqA1: "Oui, ZeroWebTools est 100 % gratuit. Aucun abonnement, aucun frais caché et aucune inscription requise.",
    faqQ2: "Mes fichiers sont-ils téléchargés sur un serveur ?",
    faqA2: "Non. Tous les outils s'exécutent entièrement côté client à l'aide de WebAssembly dans votre navigateur. Vos fichiers ne quittent jamais votre appareil.",
    faqQ3: "Dois-je télécharger quelque chose ?",
    faqA3: "Non, vous n'avez pas besoin d'installer d'applications ou de logiciels. Tout fonctionne en toute sécurité dans votre navigateur Web.",
    aboutTitle: "À propos de ZeroWebTools",
    aboutMission: "Notre mission",
    aboutMissionP1: "ZeroWebTools a été fondé avec une mission simple mais essentielle : fournir aux développeurs, aux administrateurs système et aux créateurs de contenu une suite d'outils utilitaires haut de gamme et ultra-rapides qui respectent la confidentialité de leurs données.",
    aboutMissionP2: "Les outils en ligne standard, tels que les compilateurs PDF, les formateurs JSON ou les décodeurs base64, téléchargent fréquemment vos fichiers, jetons et journaux sensibles sur des serveurs distants pour traitement. Cela expose le code propriétaire, les enregistrements clients et les jetons sécurisés à d’éventuelles interceptions ou fuites de données.",
    aboutArchitecture: "Architecture 100 % côté client",
    aboutArchitectureP1: "Pour résoudre cette vulnérabilité, nous avons construit ZeroWebTools avec une architecture locale axée sur la confidentialité. Chaque outil de notre catalogue de plus de 57 ressources s'exécute entièrement dans le contexte de votre navigateur :",
    aboutArchList1: "Zéro téléchargement sur le serveur : vos documents, blocs de code et paramètres ne quittent jamais votre ordinateur local.",
    aboutArchList2: "Puissance WebAssembly : les opérations lourdes telles que les conversions d'images et le rendu PDF sont compilées directement dans WebAssembly (Wasm) et exécutées côté client à la vitesse native.",
    aboutArchList3: "Assistance hors ligne : étant donné qu'aucune informatique côté serveur n'est requise, nos outils sont accessibles et utilisés entièrement hors ligne.",
    aboutOpenSource: "Open Source et transparence",
    aboutOpenSourceP1: "Pour les fonctionnalités avancées telles que les requêtes CORS locales et la récupération de contenu de pages Web, nous maintenons l'extension open source ZeroWebTools Companion et le référentiel principal. Comme notre plate-forme Web, le compagnon fonctionne entièrement côté client et n'effectue aucune journalisation ou analyse à distance. En publiant publiquement notre code source sur GitHub, nous invitons les utilisateurs et les auditeurs de sécurité à vérifier l'intégrité de notre code.",
    aboutWhoWeAre: "Qui nous sommes",
    aboutWhoWeAreP1: "Nous sommes une équipe indépendante dirigée par des développeurs et dédiée à la création d'une plateforme Web plus propre et plus sûre. ZeroWebTools est gratuit et nous prenons entièrement en charge nos coûts de développement et d'hébergement via des réseaux publicitaires propres et non intrusifs.",
    contactTitle: "Contacter l'assistance",
    contactSubtitle: "Vous avez une question, un retour, une demande d'outil ou un rapport de bug ? Contactez-nous directement. Nous répondons à toutes les demandes techniques dans un délai de 24 à 48 heures.",
    contactEmailLabel: "Adresse email",
    contactEmailDesc: "Pour une assistance générale, des requêtes API ou des demandes de licence d'entreprise, envoyez-nous un e-mail directement :",
    contactRequestLabel: "Demandes de fonctionnalités et bugs",
    contactRequestDesc: "Envie d'un nouvel outil ? Vous avez trouvé un bug ? Ouvrez un ticket sur notre dépôt GitHub :",
    contactFormTitle: "Envoyer un message",
    contactFormSuccess: "Message envoyé avec succès !",
    contactFormSuccessDesc: "Merci de nous avoir contactés. Nous vous répondrons bientôt à votre email.",
    contactFormSendAnother: "Envoyer un autre message",
    contactFormEmailLabel: "Votre e-mail",
    contactFormEmailPlaceholder: "développeur@exemple.com",
    contactFormSubjectLabel: "Sujet",
    contactFormSubjectPlaceholder: "Rapport de bug/demande d'outil",
    contactFormMessageLabel: "Message",
    contactFormMessagePlaceholder: "Décrivez votre problème ou votre suggestion en détail...",
    contactFormError: "Quelque chose s'est mal passé. Veuillez réessayer ou envoyez-nous un e-mail directement.",
    contactFormSubmitting: "Envoi...",
    contactFormSubmit: "Envoyer un message",
    privacyTitle: "politique de confidentialité",
    privacyDataColTitle: "Collecte de données",
    privacyDataColDesc: "ZeroWebTools fonctionne entièrement dans votre navigateur. Aucune donnée personnelle, saisie d’outil ou résultat de traitement n’est transmise à un serveur. Tous les calculs sont exécutés côté client à l'aide de JavaScript.",
    privacyCookiesTitle: "Cookies et analyses",
    privacyCookiesDesc: "Nous pouvons utiliser des cookies essentiels pour la fonctionnalité du site et des cookies d'analyse tiers pour comprendre les modèles d'utilisation. Google AdSense peut diffuser des publicités à l'aide de cookies comme décrit dans les politiques publicitaires de Google.",
    privacyThirdPartyTitle: "Services tiers",
    privacyThirdPartyDesc: "Google AdSense peut utiliser des cookies et des balises Web pour diffuser des publicités basées sur des visites antérieures. Les utilisateurs peuvent désactiver la publicité personnalisée via les paramètres Google Ads.",
    privacyContactTitle: "Contact",
    privacyContactDesc: "Pour toute demande relative à la confidentialité, contactez-nous directement à",
    termsTitle: "Conditions d'utilisation",
    termsUseTitle: "Utilisation du Service",
    termsUseDesc: "ZeroWebTools fournit des outils utilitaires de développement gratuits basés sur un navigateur. En utilisant ces outils, vous acceptez ces conditions. Tous les outils traitent les données localement dans votre navigateur ; aucune donnée n'est envoyée à des serveurs externes.",
    termsWarrantiesTitle: "Exclusion de garanties",
    termsWarrantiesDesc: "Les outils sont fournis « tels quels » sans garantie d'aucune sorte. Nous ne garantissons pas l'exactitude, la fiabilité ou l'adéquation à un usage particulier. Utilisez les résultats à votre propre discrétion.",
    termsIPTitle: "Propriété intellectuelle",
    extTag: "EXTENSION COMPAGNON OFFICIELLE",
    extTitle: "Compagnon ZeroWebTools",
    extDesc: "Une extension de navigateur sécurisée conçue pour étendre les capacités de la plateforme Web. Débloque les utilitaires de développement hors ligne et relie les autorisations du navigateur aux outils en ligne avancés.",
    extChrome: "Ajouter à Chrome",
    extFirefox: "Ajouter à Firefox",
    extCard1Title: "Barre d'outils utilitaire hors ligne",
    extCard1Desc: "Accédez à tout moment aux éditeurs d'utilitaires critiques directement dans la barre de menu de votre navigateur, aucune connexion Internet n'est requise. Fonctionne dans un bac à sable local entièrement privé.",
    extCard1ClientSide: "⚡ Traitement 100 % côté client",
    extCard2Title: "Pont API de plateforme",
    extCard2Desc: "Débloquez des outils avancés sur zerowebtools.com qui nécessitent des étendues de navigateur élevées ou des autorisations CORS. L'extension les exécute en toute sécurité en votre nom.",
    extCard2Privacy: "🛡️ Confidentialité de bout en bout protégée",
    extHowTitle: "Comment le compagnon s'intègre",
    extStep1Title: "Installer l'extension",
    extStep1Desc: "Téléchargez depuis le Chrome Web Store. Il reste silencieusement dans la barre d'outils de votre extension en attendant les déclencheurs de commandes.",
    extStep2Title: "Détection de pont",
    extStep2Desc: "Lorsque vous visitez des pages d'outils telles que le client API REST, la page détecte automatiquement le pont sécurisé compagnon.",
    extStep3Title: "Exécuter localement",
    extStep3Desc: "Les requêtes et les scrapes s'exécutent directement à partir du moteur de votre navigateur, contournant les limites CORS sans serveurs tiers.",
    extSecurityTitle: "100 % ouvert et vérifiable",
    extSecurityDesc: "Le compagnon ZeroWebTools contient **zéro pixel de suivi, pings de diagnostic ou bases de données analytiques**. Il agit uniquement comme un conteneur de traitement hors ligne et un pont proxy local sur votre matériel.",
    headerAbout: "À propos",
    headerContact: "Contact",
    searchNoResults: "Aucun outil trouvé correspondant à votre requête.",
    searchResults: "Résultats de la recherche",
    searchPopular: "Outils rapides populaires",
    searchClientSide: "Côté client",
    searchNavigate: "Naviguer",
    searchSelect: "Sélectionner",
    searchQuick: "Recherche rapide...",
    searchDesktopOnly: "Bureau uniquement",
    compareTag: "Alternatives et correspondances",
    compareTitle: "ZeroWebTools vs concurrents",
    compareDesc: "Découvrez pourquoi ZeroWebTools est la principale alternative axée sur la confidentialité. Exécution 100 % locale, basée sur un navigateur, sans téléchargement de fichiers et sans murs d'abonnement.",
    compareVs: "contre",
    compareBtn: "Comparer",
    recipesTag: "Chaînage des flux de travail",
    recipesTitle: "Recettes de flux de travail multi-outils",
    recipesDesc: "Combinez les actions dans un seul onglet. Apprenez à séquencer et enchaîner nos utilitaires web 100% privés sans boucles de téléchargement-téléchargement.",
    recipesViewGuide: "Voir le guide",
    searchEscape: "ÉCHAP",
    termsIPDesc: "La conception, le code et la marque du site Web ZeroWebTools sont protégés par les lois sur la propriété intellectuelle. Vous ne pouvez pas reproduire, modifier ou distribuer le code source du site sans autorisation explicite.",
    termsAdsTitle: "Publicité",
    termsAdsDesc: "ZeroWebTools affiche des publicités tierces via Google AdSense. Ces annonces sont soumises aux propres conditions et politiques de confidentialité de Google. Nous ne sommes pas responsables du contenu publicitaire de tiers.",
    termsChangesTitle: "Modifications des conditions",
    termsChangesDesc: "Nous nous réservons le droit de mettre à jour ces conditions à tout moment. L'utilisation continue du site après des modifications constitue l'acceptation des conditions mises à jour.",
    termsContactTitle: "Contact",
    termsContactDesc: "Si vous avez des questions concernant ces Conditions, veuillez nous contacter à",
  },
  pt: {
    homeTitle: "Ferramentas web simples e privadas no seu navegador.",
    homeDesc: "Ferramentas gratuitas, rápidas e seguras para editar PDFs, converter formatos e redimensionar imagens. Tudo roda localmente no seu dispositivo.",
    searchPlaceholder: "Pesquisar uma ferramenta (ex: juntar pdf)...",
    exploreAllTools: "Explorar Todas",
    allTools: "Todas",
    pdfTools: "Ferramentas PDF",
    imageTools: "Mídia e Vídeo",
    developerTools: "Desenvolvedores",
    generators: "Geradores",
    textTools: "Texto",
    calculators: "Calculadoras",
    fun: "Diversão",
    launch: "Abrir",
    extensionTools: "Ferramentas de extensão",
    live: "AO VIVO",
    savedTools: "Ferramentas Salvas",
    spotlightUtilities: "Destaques",
    guidesResources: "Guias e Recursos",
    privacy: "Privacidade",
    terms: "Termos",
    comingSoon: "Em Breve",
    toolFilter: "Filtro",
    privateBadge: "100% Privado • {count} ferramentas gratuitas",
    faqTitle: "Perguntas Frequentes",
    faqSubtitle: "Tudo o que você precisa saber sobre o ZeroWebTools.",
    howToDesc: "Explore tutoriais de início rápido, receitas visuais de encadeamento de ferramentas e comparações detalhadas de concorrentes com foco na privacidade.",
    faqQ1: "É totalmente gratuito?",
    faqA1: "Sim, ZeroWebTools é 100% gratuito. Sem assinaturas, sem taxas ocultas e sem necessidade de inscrição.",
    faqQ2: "Meus arquivos são enviados para um servidor?",
    faqA2: "Não. Todas as ferramentas são executadas inteiramente no lado do cliente usando WebAssembly em seu navegador. Seus arquivos nunca saem do seu dispositivo.",
    faqQ3: "Preciso baixar alguma coisa?",
    faqA3: "Não, você não precisa instalar nenhum aplicativo ou software. Tudo funciona de forma segura dentro do seu navegador.",
    aboutTitle: "Sobre ZeroWebTools",
    aboutMission: "Nossa Missão",
    aboutMissionP1: "ZeroWebTools foi fundada com uma missão simples, mas crítica: fornecer aos desenvolvedores, administradores de sistema e criadores de conteúdo um conjunto premium e extremamente rápido de ferramentas utilitárias que respeitam a privacidade de seus dados.",
    aboutMissionP2: "Ferramentas on-line padrão, como compiladores de PDF, formatadores JSON ou decodificadores base64, carregam frequentemente seus arquivos, tokens e logs confidenciais em servidores remotos para processamento. Isso expõe código proprietário, registros de clientes e tokens seguros a possíveis interceptações ou vazamentos de dados.",
    aboutArchitecture: "Arquitetura 100% do lado do cliente",
    aboutArchitectureP1: "Para resolver esta vulnerabilidade, construímos ZeroWebTools com uma arquitetura local que prioriza a privacidade. Cada ferramenta em nosso catálogo de mais de 57 recursos é executada inteiramente no contexto do seu navegador:",
    aboutArchList1: "Zero uploads de servidor: seus documentos, blocos de código e parâmetros nunca saem do seu computador local.",
    aboutArchList2: "Poder do WebAssembly: operações pesadas, como conversões de imagens e renderização de PDF, são compiladas diretamente no WebAssembly (Wasm) e executadas no lado do cliente em velocidade nativa.",
    aboutArchList3: "Suporte offline: Como não é necessária nenhuma computação no servidor, nossas ferramentas podem ser acessadas e operadas totalmente offline.",
    aboutOpenSource: "Código aberto e transparência",
    aboutOpenSourceP1: "Para recursos avançados, como solicitações CORS locais e extração de conteúdo de páginas da web, mantemos a extensão ZeroWebTools Companion de código aberto e o repositório principal. Assim como nossa plataforma web, o complemento é executado totalmente no lado do cliente e não realiza nenhum registro ou análise remota. Ao publicar nosso código-fonte publicamente no GitHub, convidamos usuários e auditores de segurança a verificar a integridade de nosso código.",
    aboutWhoWeAre: "Quem somos",
    aboutWhoWeAreP1: "Somos uma equipe independente e voltada para desenvolvedores, dedicada a construir uma plataforma web mais limpa e segura. ZeroWebTools é de uso gratuito e suportamos nossos custos de desenvolvimento e hospedagem inteiramente por meio de redes de anúncios limpas e não intrusivas.",
    contactTitle: "Contate o suporte",
    contactSubtitle: "Tem alguma dúvida, feedback, solicitação de ferramenta ou relatório de bug? Entre em contato conosco diretamente. Respondemos a todas as consultas técnicas dentro de 24 a 48 horas.",
    contactEmailLabel: "Endereço de email",
    contactEmailDesc: "Para suporte geral, dúvidas sobre API ou solicitações de licenciamento corporativo, envie-nos um e-mail diretamente:",
    contactRequestLabel: "Solicitações de recursos e bugs",
    contactRequestDesc: "Quer uma nova ferramenta? Encontrou um bug? Abra um problema em nosso repositório GitHub:",
    contactFormTitle: "Envie uma mensagem",
    contactFormSuccess: "Mensagem enviada com sucesso!",
    contactFormSuccessDesc: "Obrigado por entrar em contato. Entraremos em contato com você em seu e-mail em breve.",
    contactFormSendAnother: "Envie outra mensagem",
    contactFormEmailLabel: "Seu e-mail",
    contactFormEmailPlaceholder: "desenvolvedor@exemplo.com",
    contactFormSubjectLabel: "Assunto",
    contactFormSubjectPlaceholder: "Relatório de bug/solicitação de ferramenta",
    contactFormMessageLabel: "Mensagem",
    contactFormMessagePlaceholder: "Descreva seu problema ou sugestão detalhadamente...",
    contactFormError: "Algo deu errado. Por favor, tente novamente ou envie-nos um e-mail diretamente.",
    contactFormSubmitting: "Enviando...",
    contactFormSubmit: "Enviar mensagem",
    privacyTitle: "política de Privacidade",
    privacyDataColTitle: "Coleta de dados",
    privacyDataColDesc: "ZeroWebTools opera inteiramente dentro do seu navegador. Nenhum dado pessoal, entrada de ferramenta ou resultado de processamento é transmitido a qualquer servidor. Todos os cálculos são executados no lado do cliente usando JavaScript.",
    privacyCookiesTitle: "Cookies e análises",
    privacyCookiesDesc: "Podemos usar cookies essenciais para a funcionalidade do site e cookies analíticos de terceiros para compreender os padrões de uso. O Google AdSense pode veicular anúncios usando cookies conforme descrito nas políticas de publicidade do Google.",
    privacyThirdPartyTitle: "Serviços de terceiros",
    privacyThirdPartyDesc: "O Google AdSense pode usar cookies e web beacons para veicular anúncios com base em visitas anteriores. Os usuários podem cancelar a publicidade personalizada nas configurações do Google Ads.",
    privacyContactTitle: "Contato",
    privacyContactDesc: "Para dúvidas relacionadas à privacidade, entre em contato conosco diretamente em",
    termsTitle: "Termos de Serviço",
    termsUseTitle: "Uso do Serviço",
    termsUseDesc: "ZeroWebTools fornece ferramentas utilitárias gratuitas para desenvolvedores baseadas em navegador. Ao usar essas ferramentas, você concorda com estes termos. Todas as ferramentas processam dados localmente no seu navegador; nenhum dado é enviado para servidores externos.",
    termsWarrantiesTitle: "Isenção de garantias",
    termsWarrantiesDesc: "As ferramentas são fornecidas 'como estão', sem qualquer tipo de garantia. Não oferecemos garantias sobre precisão, confiabilidade ou adequação a uma finalidade específica. Use os resultados a seu critério.",
    termsIPTitle: "Propriedade intelectual",
    extTag: "EXTENSÃO DE COMPANHEIRO OFICIAL",
    extTitle: "Companheiro ZeroWebTools",
    extDesc: "Uma extensão de navegador segura projetada para ampliar os recursos da plataforma web. Desbloqueia utilitários de desenvolvedor off-line e conecta permissões do navegador a ferramentas on-line avançadas.",
    extChrome: "Adicionar ao Chrome",
    extFirefox: "Adicionar ao Firefox",
    extCard1Title: "Barra de ferramentas de utilitários off-line",
    extCard1Desc: "Acesse editores de utilitários críticos diretamente na barra de menu do seu navegador a qualquer momento, sem necessidade de conexão com a Internet. É executado em uma sandbox local totalmente privada.",
    extCard1ClientSide: "⚡ Processamento 100% do lado do cliente",
    extCard2Title: "Ponte API da plataforma",
    extCard2Desc: "Desbloqueie ferramentas avançadas em zerowebtools.com que exigem escopos de navegador elevados ou permissões CORS. A extensão os executa com segurança em seu nome.",
    extCard2Privacy: "🛡️ Privacidade protegida de ponta a ponta",
    extHowTitle: "Como o Companion se integra",
    extStep1Title: "Instale a extensão",
    extStep1Desc: "Baixe na Chrome Web Store. Ele fica silenciosamente na barra de ferramentas de extensão aguardando acionamentos de comando.",
    extStep2Title: "Detecção de ponte",
    extStep2Desc: "Ao visitar páginas de ferramentas como o REST API Client, a página detecta automaticamente a ponte segura complementar.",
    extStep3Title: "Executar localmente",
    extStep3Desc: "Consultas e raspagens são executadas diretamente no mecanismo do seu navegador, ignorando os limites do CORS sem servidores de terceiros.",
    extSecurityTitle: "100% aberto e auditável",
    extSecurityDesc: "O ZeroWebTools Companion contém **zero pixels de rastreamento, pings de diagnóstico ou bancos de dados analíticos**. Ele atua apenas como um contêiner de processamento offline e uma ponte proxy local em seu hardware.",
    headerAbout: "Sobre",
    headerContact: "Contato",
    searchNoResults: "Nenhuma ferramenta encontrada que corresponda à sua consulta.",
    searchResults: "Resultados da pesquisa",
    searchPopular: "Ferramentas rápidas populares",
    searchClientSide: "Lado do cliente",
    searchNavigate: "Navegar",
    searchSelect: "Selecione",
    searchQuick: "Pesquisa rápida...",
    searchDesktopOnly: "Somente área de trabalho",
    compareTag: "Alternativas e confrontos",
    compareTitle: "ZeroWebTools vs Concorrentes",
    compareDesc: "Descubra por que ZeroWebTools é a alternativa líder em privacidade. Execução 100% local, baseada em navegador, sem upload de arquivos e sem paredes de assinatura.",
    compareVs: "contra",
    compareBtn: "Comparar",
    recipesTag: "Encadeamento de fluxos de trabalho",
    recipesTitle: "Receitas de fluxo de trabalho com várias ferramentas",
    recipesDesc: "Combine ações em uma única guia. Aprenda como sequenciar e encadear nossos utilitários web 100% privados sem loops de download e upload.",
    recipesViewGuide: "Ver guia",
    searchEscape: "ESC",
    termsIPDesc: "O design, código e marca do site ZeroWebTools são protegidos por leis de propriedade intelectual. Você não pode reproduzir, modificar ou distribuir o código-fonte do site sem permissão explícita.",
    termsAdsTitle: "Anúncio",
    termsAdsDesc: "ZeroWebTools exibe anúncios de terceiros através do Google AdSense. Esses anúncios estão sujeitos aos próprios termos e políticas de privacidade do Google. Não somos responsáveis ​​pelo conteúdo de anúncios de terceiros.",
    termsChangesTitle: "Mudanças nos Termos",
    termsChangesDesc: "Reservamo-nos o direito de atualizar estes termos a qualquer momento. O uso continuado do site após as alterações constitui aceitação dos termos atualizados.",
    termsContactTitle: "Contato",
    termsContactDesc: "Se você tiver alguma dúvida sobre estes Termos, entre em contato conosco em",
  },
  ja: {
    homeTitle: "ブラウザで動くシンプルでプライベートなWebツール。",
    homeDesc: "PDFの編集、ファイル変換、画像のリサイズなど、安全で高速な無料ツール。すべてのツールはデバイス上でローカルに実行されるため、ファイルが外部に送信されることはありません。",
    searchPlaceholder: "ツールを検索 (例: PDF 結合)...",
    exploreAllTools: "すべてのツールを探索",
    allTools: "すべてのツール",
    pdfTools: "PDFツール",
    imageTools: "メディアツール",
    developerTools: "開発者ツール",
    generators: "ジェネレーター",
    textTools: "テキストツール",
    calculators: "計算ツール",
    fun: "楽しいツール",
    launch: "起動",
    extensionTools: "拡張ツール",
    live: "ライブ",
    savedTools: "保存したツール",
    spotlightUtilities: "注目のユーティリティ",
    guidesResources: "ガイドとリソース",
    privacy: "プライバシー",
    terms: "利用規約",
    comingSoon: "近日公開",
    toolFilter: "フィルター",
    privateBadge: "100% プライベート • {count} 個の無料オンラインツール",
    faqTitle: "よくある質問",
    faqSubtitle: "ZeroWebToolsのプライバシーと使用方法に関するすべての情報。",
    howToDesc: "プライバシーを重視したクイックスタートチュートリアル、複数のツールを組み合わせたビジュアルレシピ、競合他社との詳細な比較をご覧ください。",
    faqQ1: "完全に無料ですか?",
    faqA1: "はい、ZeroWebTools は完全に無料です。サブスクリプション、隠れた料金、サインアップは必要ありません。",
    faqQ2: "私のファイルはサーバーにアップロードされていますか?",
    faqA2: "いいえ。すべてのツールはブラウザーの WebAssembly を使用して完全にクライアント側で実行されます。ファイルがデバイスの外に出ることはありません。",
    faqQ3: "何かをダウンロードする必要がありますか?",
    faqA3: "いいえ、アプリやソフトウェアをインストールする必要はありません。 Web ブラウザ内ではすべてが安全に動作します。",
    aboutTitle: "ZeroWebTools について",
    aboutMission: "私たちの使命",
    aboutMissionP1: "ZeroWebTools は、開発者、システム管理者、コンテンツ作成者に、データ プライバシーを尊重するプレミアムかつ超高速のユーティリティ ツール スイートを提供するという、シンプルだが重要な使命を持って設立されました。",
    aboutMissionP2: "PDF コンパイラ、JSON フォーマッタ、base64 デコーダなどの標準オンライン ツールは、ファイル、トークン、機密ログを処理のためにリモート サーバーに頻繁にアップロードします。これにより、独自のコード、顧客記録、安全なトークンが傍受やデータ漏洩の可能性にさらされます。",
    aboutArchitecture: "100% クライアント側のアーキテクチャ",
    aboutArchitectureP1: "この脆弱性を解決するために、プライバシー最優先のローカル アーキテクチャを備えた ZeroWebTools を構築しました。 57 以上のリソースのカタログにあるすべてのツールは、完全にブラウザーのコンテキスト内で実行されます。",
    aboutArchList1: "サーバーへのアップロードゼロ: ドキュメント、コード ブロック、パラメーターがローカル コンピューターから離れることはありません。",
    aboutArchList2: "WebAssembly パワー: 画像変換や PDF レンダリングなどの負荷の高い操作は WebAssembly (Wasm) に直接コンパイルされ、クライアント側でネイティブ速度で実行されます。",
    aboutArchList3: "オフライン サポート: サーバー側のコンピューティングが必要ないため、ツールは完全にオフラインでアクセスして操作できます。",
    aboutOpenSource: "オープンソースと透明性",
    aboutOpenSourceP1: "ローカル CORS リクエストや Web ページ コンテンツのスクレイピングなどの高度な機能については、オープンソースの ZeroWebTools Companion 拡張機能とメイン リポジトリを維持しています。当社の Web プラットフォームと同様に、コンパニオンは完全にクライアント側で実行され、リモート ロギングや分析は一切実行されません。 GitHub でソース コードを公開することで、ユーザーとセキュリティ監査人にコードの整合性を検証してもらいます。",
    aboutWhoWeAre: "私たちは誰なのか",
    aboutWhoWeAreP1: "私たちは、よりクリーンで安全な Web プラットフォームの構築に専念する、開発者主導の独立したチームです。 ZeroWebTools は無料で使用でき、クリーンで非侵入的な広告ネットワークを通じて開発とホスティングのコストをすべてサポートします。",
    contactTitle: "サポートに連絡する",
    contactSubtitle: "ご質問、フィードバック、ツールのリクエスト、またはバグレポートがありますか?直接ご連絡ください。すべての技術的なお問い合わせには 24 ～ 48 時間以内に回答いたします。",
    contactEmailLabel: "電子メールアドレス",
    contactEmailDesc: "一般的なサポート、API の問い合わせ、または企業ライセンスのリクエストについては、直接メールでお問い合わせください。",
    contactRequestLabel: "機能リクエストとバグ",
    contactRequestDesc: "新しいツールが必要ですか?バグが見つかりましたか? GitHub リポジトリで問題を開きます。",
    contactFormTitle: "メッセージを送信する",
    contactFormSuccess: "メッセージは正常に送信されました。",
    contactFormSuccessDesc: "ご連絡いただきありがとうございます。すぐにメールでご連絡させていただきます。",
    contactFormSendAnother: "別のメッセージを送信する",
    contactFormEmailLabel: "あなたのメールアドレス",
    contactFormEmailPlaceholder: "開発者@example.com",
    contactFormSubjectLabel: "主題",
    contactFormSubjectPlaceholder: "バグレポート/ツールリクエスト",
    contactFormMessageLabel: "メッセージ",
    contactFormMessagePlaceholder: "問題や提案を詳しく説明してください...",
    contactFormError: "何か問題が発生しました。もう一度お試しいただくか、直接メールでご連絡ください。",
    contactFormSubmitting: "送信中...",
    contactFormSubmit: "メッセージを送信する",
    privacyTitle: "プライバシーポリシー",
    privacyDataColTitle: "データ収集",
    privacyDataColDesc: "ZeroWebTools は完全にブラウザ内で動作します。個人データ、ツール入力、処理結果がサーバーに送信されることはありません。すべての計算は JavaScript を使用してクライアント側で実行されます。",
    privacyCookiesTitle: "クッキーと分析",
    privacyCookiesDesc: "当社は、サイトの機能に必須の Cookie を使用し、使用パターンを把握するためにサードパーティの分析 Cookie を使用する場合があります。 Google AdSense は、Google の広告ポリシーに記載されているとおり、Cookie を使用して広告を配信する場合があります。",
    privacyThirdPartyTitle: "サードパーティのサービス",
    privacyThirdPartyDesc: "Google AdSense は、以前の訪問に基づいて広告を配信するために Cookie と Web ビーコンを使用する場合があります。ユーザーは、Google 広告の設定を通じてパーソナライズされた広告をオプトアウトできます。",
    privacyContactTitle: "接触",
    privacyContactDesc: "プライバシー関連のお問い合わせについては、次のアドレスまで直接お問い合わせください。",
    termsTitle: "利用規約",
    termsUseTitle: "サービスの利用",
    termsUseDesc: "ZeroWebTools は、ブラウザベースの開発者ユーティリティ ツールを無料で提供します。これらのツールを使用すると、これらの規約に同意したことになります。すべてのツールはブラウザ内でデータをローカルに処理します。データは外部サーバーに送信されません。",
    termsWarrantiesTitle: "保証の否認",
    termsWarrantiesDesc: "ツールは「現状のまま」提供され、いかなる種類の保証もありません。当社は、正確性、信頼性、または特定の目的への適合性については保証しません。結果はご自身の判断でご使用ください。",
    termsIPTitle: "知的財産",
    extTag: "公式コンパニオンの拡張機能",
    extTitle: "ZeroWebTools コンパニオン",
    extDesc: "Web プラットフォームの機能を拡張するために設計された安全なブラウザ拡張機能。オフライン開発者ユーティリティのロックを解除し、高度なオンライン ツールに対するブラウザ権限をブリッジします。",
    extChrome: "Chromeに追加",
    extFirefox: "Firefox に追加",
    extCard1Title: "オフラインユーティリティツールバー",
    extCard1Desc: "インターネット接続は必要なく、いつでもブラウザのメニュー バーから重要なユーティリティ エディタに直接アクセスできます。完全にプライベートなローカル サンドボックスで実行されます。",
    extCard1ClientSide: "⚡ 100% クライアント側処理",
    extCard2Title: "プラットフォームAPIブリッジ",
    extCard2Desc: "zerowebtools.com で、高度なブラウザー スコープまたは CORS 権限を必要とする高度なツールのロックを解除します。拡張機能は、ユーザーに代わってそれらを安全に実行します。",
    extCard2Privacy: "🛡️ エンドツーエンドのプライバシー保護",
    extHowTitle: "コンパニオンの統合方法",
    extStep1Title: "拡張機能をインストールする",
    extStep1Desc: "Chrome ウェブストアからダウンロードします。これは拡張機能ツールバーに静かに常駐し、コマンドのトリガーを待っています。",
    extStep2Title: "ブリッジの検出",
    extStep2Desc: "REST API クライアントなどのツールページにアクセスすると、ページはコンパニオン セキュア ブリッジを自動的に検出します。",
    extStep3Title: "ローカルで実行",
    extStep3Desc: "クエリとスクレイピングはブラウザ エンジンから直接実行され、サードパーティ サーバーを使用せずに CORS 制限を回避します。",
    extSecurityTitle: "100% オープンで監査可能",
    extSecurityDesc: "ZeroWebTools Companion には、**ゼロ追跡ピクセル、診断 ping、または分析データベース**が含まれています。これは、オフライン処理コンテナーおよびハードウェア上のローカル プロキシ ブリッジとしてのみ機能します。",
    headerAbout: "について",
    headerContact: "接触",
    searchNoResults: "クエリに一致するツールが見つかりませんでした。",
    searchResults: "検索結果",
    searchPopular: "人気のクイックツール",
    searchClientSide: "クライアント側",
    searchNavigate: "ナビゲート",
    searchSelect: "選択",
    searchQuick: "クイック検索...",
    searchDesktopOnly: "デスクトップのみ",
    compareTag: "代替案と対戦",
    compareTitle: "ZeroWebTools と競合他社",
    compareDesc: "ZeroWebTools がプライバシー最優先の主要な選択肢である理由をご覧ください。ファイルのアップロードやサブスクリプションの壁がない、100% ローカルのブラウザベースの実行。",
    compareVs: "対",
    compareBtn: "比較する",
    recipesTag: "ワークフローの連鎖",
    recipesTitle: "マルチツールワークフローレシピ",
    recipesDesc: "アクションを 1 つのタブに結合します。ダウンロードとアップロードのループを発生させずに、100% プライベート Web ユーティリティをシーケンスしてチェーンする方法を学びます。",
    recipesViewGuide: "ガイドを見る",
    searchEscape: "ESC",
    termsIPDesc: "ZeroWebTools の Web サイトのデザイン、コード、およびブランディングは、知的財産法によって保護されています。明示的な許可がない限り、サイトのソース コードを複製、変更、配布することはできません。",
    termsAdsTitle: "広告",
    termsAdsDesc: "ZeroWebTools は、Google AdSense を通じてサードパーティの広告を表示します。これらの広告には、Google 独自の規約とプライバシー ポリシーが適用されます。当社は第三者の広告コンテンツについては責任を負いません。",
    termsChangesTitle: "規約の変更",
    termsChangesDesc: "当社は、これらの規約をいつでも更新する権利を留保します。変更後もサイトを継続して使用すると、更新された規約に同意したものとみなされます。",
    termsContactTitle: "接触",
    termsContactDesc: "本規約に関してご質問がある場合は、下記までお問い合わせください。",
  },
  zh: {
    homeTitle: "在浏览器中运行的简单、隐私网页工具。",
    homeDesc: "免费、快速且完全安全的工具，用于编辑 PDF、转换格式和调整图片大小。所有工具均在您的设备上本地运行，文件绝不会离开您的电脑。",
    searchPlaceholder: "搜索工具 (例如：合并 PDF)...",
    exploreAllTools: "探索所有工具",
    allTools: "所有工具",
    pdfTools: "PDF 工具",
    imageTools: "媒体与视频工具",
    developerTools: "开发者工具",
    generators: "生成器",
    textTools: "文本工具",
    calculators: "计算器",
    fun: "趣味工具",
    launch: "启动",
    extensionTools: "扩展工具",
    live: "居住",
    savedTools: "已保存的工具",
    spotlightUtilities: "精选工具",
    guidesResources: "指南与资源",
    privacy: "隐私政策",
    terms: "服务条款",
    comingSoon: "即将推出",
    toolFilter: "筛选器",
    privateBadge: "100% 本地隐私 • {count} 个免费在线工具",
    faqTitle: "常见问题",
    faqSubtitle: "您需要了解的关于 ZeroWebTools 隐私和使用的所有信息。",
    howToDesc: "探索快速入门教程、可视化多工具链配方以及详细的隐私第一竞争对手比较。",
    faqQ1: "是完全免费的吗？",
    faqA1: "是的，ZeroWebTools 100% 免费。无需订阅，无隐藏费用，也无需注册。",
    faqQ2: "我的文件是否上传到服务器？",
    faqA2: "不会。所有工具都在浏览器中使用 WebAssembly 完全在客户端执行。您的文件永远不会离开您的设备。",
    faqQ3: "我需要下载什么东西吗？",
    faqA3: "不，您不需要安装任何应用程序或软件。一切都可以在您的网络浏览器中安全地运行。",
    aboutTitle: "关于 ZeroWebTools",
    aboutMission: "我们的使命",
    aboutMissionP1: "ZeroWebTools 的成立有一个简单但重要的使命：为开发人员、系统管理员和内容创建者提供一套优质、快如闪电的实用工具，尊重他们的数据隐私。",
    aboutMissionP2: "标准在线工具（例如 PDF 编译器、JSON 格式化程序或 base64 解码器）经常将文件、令牌和敏感日志上传到远程服务器进行处理。这会将专有代码、客户记录和安全令牌暴露给潜在的拦截或数据泄漏。",
    aboutArchitecture: "100% 客户端架构",
    aboutArchitectureP1: "为了解决这个漏洞，我们构建了具有隐私优先本地架构的 ZeroWebTools。我们的 57 多个资源目录中的每个工具都完全在您的浏览器上下文中运行：",
    aboutArchList1: "零服务器上传：您的文档、代码块和参数永远不会离开您的本地计算机。",
    aboutArchList2: "WebAssembly 强大功能：图像转换和 PDF 渲染等繁重操作直接编译到 WebAssembly (Wasm) 中，并以本机速度在客户端执行。",
    aboutArchList3: "离线支持：由于不需要服务器端计算，因此我们的工具可以完全离线访问和操作。",
    aboutOpenSource: "开源和透明度",
    aboutOpenSourceP1: "对于本地 CORS 请求和网页内容抓取等高级功能，我们维护开源 ZeroWebTools Companion 扩展和主存储库。与我们的网络平台一样，该伴侣完全在客户端运行并执行零远程日志记录或分析。通过在 GitHub 上公开发布我们的源代码，我们邀请用户和安全审核员来验证我们的代码完整性。",
    aboutWhoWeAre: "我们是谁",
    aboutWhoWeAreP1: "我们是一个独立的、由开发人员驱动的团队，致力于构建一个更清洁、更安全的网络平台。 ZeroWebTools 可以免费使用，我们完全通过干净、非侵入性的广告网络来支持我们的开发和托管成本。",
    contactTitle: "联系支持人员",
    contactSubtitle: "有问题、反馈、工具请求或错误报告吗？直接与我们联系。我们会在 24-48 小时内回复所有技术询问。",
    contactEmailLabel: "电子邮件",
    contactEmailDesc: "如需一般支持、API 查询或企业许可请求，请直接向我们发送电子邮件：",
    contactRequestLabel: "功能请求和错误",
    contactRequestDesc: "想要一个新工具吗？发现错误？在我们的 GitHub 存储库上打开一个问题：",
    contactFormTitle: "发送消息",
    contactFormSuccess: "消息发送成功！",
    contactFormSuccessDesc: "感谢您伸出援手。我们会尽快通过您的电子邮件回复您。",
    contactFormSendAnother: "发送另一条消息",
    contactFormEmailLabel: "您的电子邮件",
    contactFormEmailPlaceholder: "开发者@example.com",
    contactFormSubjectLabel: "主题",
    contactFormSubjectPlaceholder: "错误报告/工具请求",
    contactFormMessageLabel: "信息",
    contactFormMessagePlaceholder: "详细描述您的问题或建议...",
    contactFormError: "出了点问题。请重试或直接给我们发电子邮件。",
    contactFormSubmitting: "正在发送...",
    contactFormSubmit: "发送消息",
    privacyTitle: "隐私政策",
    privacyDataColTitle: "数据收集",
    privacyDataColDesc: "ZeroWebTools 完全在您的浏览器中运行。任何个人数据、工具输入或处理结果都不会传输到任何服务器。所有计算均使用 JavaScript 在客户端执行。",
    privacyCookiesTitle: "Cookie 和分析",
    privacyCookiesDesc: "我们可能会使用基本 cookie 来实现网站功能，并使用第三方分析 cookie 来了解使用模式。 Google AdSense 可能会使用 Google 广告政策中所述的 Cookie 来提供广告。",
    privacyThirdPartyTitle: "第三方服务",
    privacyThirdPartyDesc: "Google AdSense 可能会使用 cookie 和网络信标根据之前的访问来提供广告服务。用户可以通过 Google Ads 设置选择退出个性化广告。",
    privacyContactTitle: "接触",
    privacyContactDesc: "对于隐私相关的咨询，请直接联系我们：",
    termsTitle: "服务条款",
    termsUseTitle: "服务的使用",
    termsUseDesc: "ZeroWebTools 提供免费的、基于浏览器的开发人员实用工具。使用这些工具即表示您同意这些条款。所有工具都在您的浏览器中本地处理数据；没有数据发送到外部服务器。",
    termsWarrantiesTitle: "免责声明",
    termsWarrantiesDesc: "这些工具按“原样”提供，不提供任何形式的保证。我们不保证准确性、可靠性或特定用途的适用性。请自行决定使用结果。",
    termsIPTitle: "知识产权",
    extTag: "官方伴侣扩展",
    extTitle: "ZeroWebTools 伴侣",
    extDesc: "一个安全的浏览器扩展，旨在扩展网络平台的功能。解锁离线开发人员实用程序并为高级在线工具桥接浏览器权限。",
    extChrome: "添加到 Chrome",
    extFirefox: "添加到火狐浏览器",
    extCard1Title: "离线实用工具栏",
    extCard1Desc: "随时直接在浏览器的菜单栏中访问关键实用程序编辑器 - 无需互联网连接。在完全私有的本地沙箱中运行。",
    extCard1ClientSide: "⚡ 100% 客户端处理",
    extCard2Title: "平台API桥",
    extCard2Desc: "在 Zerowebtools.com 上解锁需要提升浏览器范围或 CORS 权限的高级工具。该扩展代表您安全地执行它们。",
    extCard2Privacy: "🛡️ 端到端隐私保护",
    extHowTitle: "伴侣如何整合",
    extStep1Title: "安装扩展",
    extStep1Desc: "从 Chrome 网上应用店下载。它静静地坐在您的扩展工具栏中等待命令触发。",
    extStep2Title: "桥梁检测",
    extStep2Desc: "当您访问 REST API 客户端等工具页面时，该页面会自动检测配套的安全桥。",
    extStep3Title: "本地执行",
    extStep3Desc: "查询和抓取直接从浏览器引擎运行，绕过 CORS 限制，无需第三方服务器。",
    extSecurityTitle: "100% 开放且可审计",
    extSecurityDesc: "ZeroWebTools Companion 包含**零跟踪像素、诊断 ping 或分析数据库**。它仅充当离线处理容器和硬件上的本地代理桥。",
    headerAbout: "关于",
    headerContact: "接触",
    searchNoResults: "未找到与您的查询匹配的工具。",
    searchResults: "搜索结果",
    searchPopular: "流行的快速工具",
    searchClientSide: "客户端",
    searchNavigate: "导航",
    searchSelect: "选择",
    searchQuick: "快速搜索...",
    searchDesktopOnly: "仅限桌面版",
    compareTag: "替代方案和比赛",
    compareTitle: "ZeroWebTools 与竞争对手",
    compareDesc: "了解为什么 ZeroWebTools 是领先的隐私优先替代方案。 100% 本地、基于浏览器的执行，零文件上传且无订阅墙。",
    compareVs: "与",
    compareBtn: "比较",
    recipesTag: "链接工作流程",
    recipesTitle: "多工具工作流程秘诀",
    recipesDesc: "将操作合并到单个选项卡中。了解如何排序和链接我们的 100% 私有网络实用程序，而无需下载-上传循环。",
    recipesViewGuide: "查看指南",
    searchEscape: "ESC键",
    termsIPDesc: "ZeroWebTools 网站设计、代码和品牌均受知识产权法保护。未经明确许可，您不得复制、修改或分发本网站的源代码。",
    termsAdsTitle: "广告",
    termsAdsDesc: "ZeroWebTools 通过 Google AdSense 显示第三方广告。这些广告受 Google 自己的条款和隐私政策的约束。我们不对第三方广告内容负责。",
    termsChangesTitle: "条款变更",
    termsChangesDesc: "我们保留随时更新这些条款的权利。更改后继续使用本网站即表示接受更新的条款。",
    termsContactTitle: "接触",
    termsContactDesc: "如果您对这些条款有任何疑问，请通过以下方式联系我们：",
  },
  hi: {
    homeTitle: "आपके ब्राउज़र में सरल और निजी वेब टूल्स।",
    homeDesc: "PDF संपादित करने, फ़ॉर्मेट बदलने और छवियों का आकार बदलने के लिए मुफ़्त, तेज़ और पूरी तरह से सुरक्षित उपकरण। सभी उपकरण आपके डिवाइस पर स्थानीय रूप से चलते हैं।",
    searchPlaceholder: "टूल खोजें (जैसे: PDF जोड़ें)...",
    exploreAllTools: "सभी टूल्स देखें",
    allTools: "सभी टूल्स",
    pdfTools: "PDF टूल्स",
    imageTools: "मीडिया टूल्स",
    developerTools: "डेवलपर टूल्स",
    generators: "जेनरेटर्स",
    textTools: "टेक्स्ट टूल्स",
    calculators: "कैलकुलेटर",
    fun: "मनोरंजन",
    launch: "शुरू करें",
    extensionTools: "विस्तार उपकरण",
    live: "रहना",
    savedTools: "आपके सहेजे गए टूल्स",
    spotlightUtilities: "स्पॉटलाइट यूटिलिटीज",
    guidesResources: "गाइड और संसाधन",
    privacy: "गोपनीयता",
    terms: "नियम व शर्तें",
    comingSoon: "जल्د आ रहा है",
    toolFilter: "फिल्टर",
    privateBadge: "100% निजी • {count} मुफ़्त ऑनलाइन टूल्स",
    faqTitle: "अक्सर पूछे जाने वाले प्रश्न",
    faqSubtitle: "ZeroWebTools गोपनीयता और उपयोग के बारे में वह सब कुछ जो आपको जानना आवश्यक है।",
    howToDesc: "त्वरित-प्रारंभ ट्यूटोरियल, विज़ुअल मल्टी-टूल चेनिंग रेसिपी और विस्तृत गोपनीयता-प्रथम प्रतियोगी तुलनाओं का अन्वेषण करें।",
    faqQ1: "क्या यह पूर्णतः निःशुल्क है?",
    faqA1: "हाँ, ZeroWebTools 100% मुफ़्त है। कोई सदस्यता नहीं, कोई छिपी हुई फीस नहीं, और कोई साइन-अप आवश्यक नहीं है।",
    faqQ2: "क्या मेरी फ़ाइलें सर्वर पर अपलोड की गई हैं?",
    faqA2: "नहीं, सभी उपकरण आपके ब्राउज़र में WebAssembly का उपयोग करके पूरी तरह से क्लाइंट-साइड निष्पादित करते हैं। आपकी फ़ाइलें कभी भी आपका डिवाइस नहीं छोड़तीं।",
    faqQ3: "क्या मुझे कुछ भी डाउनलोड करने की आवश्यकता है?",
    faqA3: "नहीं, आपको कोई ऐप या सॉफ़्टवेयर इंस्टॉल करने की ज़रूरत नहीं है. आपके वेब ब्राउज़र के अंदर सब कुछ सुरक्षित रूप से काम करता है।",
    aboutTitle: "ज़ीरोवेबटूल्स के बारे में",
    aboutMission: "हमारा विशेष कार्य",
    aboutMissionP1: "ज़ीरोवेबटूल्स की स्थापना एक सरल लेकिन महत्वपूर्ण मिशन के साथ की गई थी: डेवलपर्स, सिस्टम प्रशासकों और सामग्री निर्माताओं को उपयोगिता उपकरणों का एक प्रीमियम, बिजली-तेज़ सूट प्रदान करना जो उनकी डेटा गोपनीयता का सम्मान करता है।",
    aboutMissionP2: "मानक ऑनलाइन उपकरण—जैसे पीडीएफ कंपाइलर, JSON फॉर्मेटर, या बेस64 डिकोडर—प्रक्रिया के लिए अक्सर आपकी फ़ाइलें, टोकन और संवेदनशील लॉग को दूरस्थ सर्वर पर अपलोड करते हैं। यह संभावित अवरोधन या डेटा लीक के लिए मालिकाना कोड, ग्राहक रिकॉर्ड और सुरक्षित टोकन को उजागर करता है।",
    aboutArchitecture: "100% क्लाइंट-साइड आर्किटेक्चर",
    aboutArchitectureP1: "इस भेद्यता को हल करने के लिए, हमने गोपनीयता-प्रथम स्थानीय वास्तुकला के साथ ZeroWebTools का निर्माण किया। 57+ संसाधनों की हमारी सूची में प्रत्येक उपकरण पूरी तरह से आपके ब्राउज़र संदर्भ में चलता है:",
    aboutArchList1: "शून्य सर्वर अपलोड: आपके दस्तावेज़, कोड ब्लॉक और पैरामीटर आपके स्थानीय कंप्यूटर को कभी नहीं छोड़ते हैं।",
    aboutArchList2: "वेबअसेंबली पावर: छवि रूपांतरण और पीडीएफ रेंडरिंग जैसे भारी संचालन को सीधे वेबअसेंबली (Wasm) में संकलित किया जाता है और क्लाइंट-साइड को मूल गति से निष्पादित किया जाता है।",
    aboutArchList3: "ऑफ़लाइन समर्थन: क्योंकि सर्वर-साइड कंप्यूटिंग की आवश्यकता नहीं है, हमारे टूल तक पूरी तरह ऑफ़लाइन पहुंच और संचालन किया जा सकता है।",
    aboutOpenSource: "खुला स्रोत एवं पारदर्शिता",
    aboutOpenSourceP1: "स्थानीय सीओआरएस अनुरोधों और वेबपेज सामग्री स्क्रैपिंग जैसी उन्नत सुविधाओं के लिए, हम ओपन-सोर्स ज़ीरोवेबटूल्स कंपेनियन एक्सटेंशन और मुख्य रिपॉजिटरी बनाए रखते हैं। हमारे वेब प्लेटफ़ॉर्म की तरह, साथी पूरी तरह से क्लाइंट-साइड चलता है और शून्य रिमोट लॉगिंग या एनालिटिक्स करता है। अपने स्रोत कोड को GitHub पर सार्वजनिक रूप से प्रकाशित करके, हम उपयोगकर्ताओं और सुरक्षा लेखा परीक्षकों को हमारे कोड की अखंडता को सत्यापित करने के लिए आमंत्रित करते हैं।",
    aboutWhoWeAre: "हम जो हैं",
    aboutWhoWeAreP1: "हम एक स्वतंत्र, डेवलपर-संचालित टीम हैं जो एक स्वच्छ, सुरक्षित वेब प्लेटफ़ॉर्म बनाने के लिए समर्पित है। ZeroWebTools का उपयोग मुफ़्त है, और हम अपने विकास और होस्टिंग लागतों का समर्थन पूरी तरह से स्वच्छ, गैर-दखल देने वाले विज्ञापन नेटवर्क के माध्यम से करते हैं।",
    contactTitle: "समर्थन से संपर्क करें",
    contactSubtitle: "क्या आपके पास कोई प्रश्न, फीडबैक, टूल अनुरोध या बग रिपोर्ट है? सीधे हमसे संपर्क करें. हम 24-48 घंटों के भीतर सभी तकनीकी पूछताछ का जवाब देते हैं।",
    contactEmailLabel: "मेल पता",
    contactEmailDesc: "सामान्य समर्थन, एपीआई प्रश्नों या कॉर्पोरेट लाइसेंसिंग अनुरोधों के लिए, हमें सीधे ईमेल करें:",
    contactRequestLabel: "फ़ीचर अनुरोध और बग",
    contactRequestDesc: "एक नया उपकरण चाहिए? कोई बग मिला? हमारे GitHub रिपॉजिटरी पर एक मुद्दा खोलें:",
    contactFormTitle: "एक संदेश भेजो",
    contactFormSuccess: "संदेश सफलतापूर्वक भेजा गया!",
    contactFormSuccessDesc: "संपर्क करने के लिए धन्यवाद. हम जल्द ही आपके ईमेल पर आपसे संपर्क करेंगे।",
    contactFormSendAnother: "दूसरा संदेश भेजें",
    contactFormEmailLabel: "आपका ईमेल",
    contactFormEmailPlaceholder: "डेवलपर@example.com",
    contactFormSubjectLabel: "विषय",
    contactFormSubjectPlaceholder: "बग रिपोर्ट/टूल अनुरोध",
    contactFormMessageLabel: "संदेश",
    contactFormMessagePlaceholder: "अपनी समस्या या सुझाव का विस्तार से वर्णन करें...",
    contactFormError: "कुछ गलत हो गया। कृपया पुनः प्रयास करें या हमें सीधे ईमेल करें।",
    contactFormSubmitting: "भेजा जा रहा है...",
    contactFormSubmit: "मेसेज भेजें",
    privacyTitle: "गोपनीयता नीति",
    privacyDataColTitle: "डेटा संग्रहण",
    privacyDataColDesc: "ZeroWebTools पूरी तरह से आपके ब्राउज़र के भीतर संचालित होता है। कोई भी व्यक्तिगत डेटा, टूल इनपुट या प्रोसेसिंग परिणाम किसी भी सर्वर पर प्रेषित नहीं किया जाता है। सभी संगणनाएँ जावास्क्रिप्ट का उपयोग करके क्लाइंट-साइड निष्पादित करती हैं।",
    privacyCookiesTitle: "कुकीज़ और विश्लेषण",
    privacyCookiesDesc: "हम साइट कार्यक्षमता के लिए आवश्यक कुकीज़ और उपयोग पैटर्न को समझने के लिए तृतीय-पक्ष विश्लेषण कुकीज़ का उपयोग कर सकते हैं। Google AdSense Google की विज्ञापन नीतियों में वर्णित कुकीज़ का उपयोग करके विज्ञापन प्रस्तुत कर सकता है।",
    privacyThirdPartyTitle: "तृतीय-पक्ष सेवाएँ",
    privacyThirdPartyDesc: "Google AdSense पूर्व विज़िट के आधार पर विज्ञापन देने के लिए कुकीज़ और वेब बीकन का उपयोग कर सकता है। उपयोगकर्ता Google विज्ञापन सेटिंग्स के माध्यम से वैयक्तिकृत विज्ञापन से बाहर निकल सकते हैं।",
    privacyContactTitle: "संपर्क",
    privacyContactDesc: "गोपनीयता संबंधी पूछताछ के लिए, हमसे सीधे संपर्क करें",
    termsTitle: "सेवा की शर्तें",
    termsUseTitle: "सेवा का उपयोग",
    termsUseDesc: "ZeroWebTools मुफ़्त, ब्राउज़र-आधारित डेवलपर उपयोगिता उपकरण प्रदान करता है। इन टूल का उपयोग करके, आप इन शर्तों से सहमत होते हैं। सभी उपकरण आपके ब्राउज़र में स्थानीय रूप से डेटा संसाधित करते हैं; कोई डेटा बाहरी सर्वर पर नहीं भेजा जाता है.",
    termsWarrantiesTitle: "वारंटियों का अस्वीकरण",
    termsWarrantiesDesc: "उपकरण किसी भी प्रकार की वारंटी के बिना 'जैसे हैं' प्रदान किए जाते हैं। हम किसी विशेष उद्देश्य के लिए सटीकता, विश्वसनीयता या उपयुक्तता के बारे में कोई गारंटी नहीं देते हैं। परिणामों का उपयोग अपने विवेक से करें।",
    termsIPTitle: "बौद्धिक संपदा",
    extTag: "आधिकारिक सहयोगी विस्तार",
    extTitle: "ज़ीरोवेबटूल्स कंपेनियन",
    extDesc: "वेब प्लेटफ़ॉर्म की क्षमताओं को बढ़ाने के लिए डिज़ाइन किया गया एक सुरक्षित ब्राउज़र एक्सटेंशन। ऑफ़लाइन डेवलपर उपयोगिताओं को अनलॉक करता है और उन्नत ऑनलाइन टूल के लिए ब्राउज़र अनुमतियों को जोड़ता है।",
    extChrome: "क्रोम में जोड़",
    extFirefox: "फ़ायरफ़ॉक्स में जोड़ें",
    extCard1Title: "ऑफ़लाइन उपयोगिता टूलबार",
    extCard1Desc: "किसी भी समय सीधे अपने ब्राउज़र के मेनू बार में महत्वपूर्ण उपयोगिता संपादकों तक पहुंचें - इंटरनेट कनेक्शन की आवश्यकता नहीं है। पूरी तरह से निजी स्थानीय सैंडबॉक्स में चलता है।",
    extCard1ClientSide: "⚡ 100% क्लाइंट-साइड प्रोसेसिंग",
    extCard2Title: "प्लेटफ़ॉर्म एपीआई ब्रिज",
    extCard2Desc: "Zerowebtools.com पर उन्नत टूल अनलॉक करें जिनके लिए उन्नत ब्राउज़र स्कोप या CORS अनुमतियों की आवश्यकता होती है। एक्सटेंशन आपकी ओर से उन्हें सुरक्षित रूप से निष्पादित करता है।",
    extCard2Privacy: "🛡️ शुरू से अंत तक गोपनीयता सुरक्षित",
    extHowTitle: "साथी कैसे एकीकृत होता है",
    extStep1Title: "एक्सटेंशन इंस्टॉल करें",
    extStep1Desc: "Chrome वेब स्टोर से डाउनलोड करें. यह आपके एक्सटेंशन टूलबार में कमांड ट्रिगर्स की प्रतीक्षा में चुपचाप बैठा रहता है।",
    extStep2Title: "पुल का पता लगाना",
    extStep2Desc: "जब आप REST API क्लाइंट जैसे टूलपेज पर जाते हैं, तो पेज स्वचालित रूप से साथी सुरक्षित ब्रिज का पता लगाता है।",
    extStep3Title: "स्थानीय रूप से निष्पादित करें",
    extStep3Desc: "तृतीय-पक्ष सर्वर के बिना CORS सीमाओं को दरकिनार करते हुए क्वेरीज़ और स्क्रैप सीधे आपके ब्राउज़र इंजन से चलते हैं।",
    extSecurityTitle: "100% खुला एवं श्रव्य",
    extSecurityDesc: "ज़ीरोवेबटूल्स कंपेनियन में **शून्य ट्रैकिंग पिक्सेल, डायग्नोस्टिक पिंग, या एनालिटिक्स डेटाबेस** शामिल हैं। यह पूरी तरह से आपके हार्डवेयर पर एक ऑफ़लाइन प्रोसेसिंग कंटेनर और एक स्थानीय प्रॉक्सी ब्रिज के रूप में कार्य करता है।",
    headerAbout: "के बारे में",
    headerContact: "संपर्क",
    searchNoResults: "आपकी क्वेरी से मेल खाता कोई उपकरण नहीं मिला.",
    searchResults: "खोज के परिणाम",
    searchPopular: "लोकप्रिय त्वरित उपकरण",
    searchClientSide: "ग्राहक पक्ष",
    searchNavigate: "नेविगेट",
    searchSelect: "चुनना",
    searchQuick: "त्वरित खोज...",
    searchDesktopOnly: "केवल डेस्कटॉप",
    compareTag: "विकल्प और मैचअप",
    compareTitle: "ज़ीरोवेबटूल्स बनाम प्रतिस्पर्धी",
    compareDesc: "पता लगाएं कि ज़ीरोवेबटूल्स अग्रणी गोपनीयता-प्रथम विकल्प क्यों है। 100% स्थानीय, ब्राउज़र-आधारित निष्पादन, शून्य फ़ाइल अपलोड और कोई सदस्यता दीवार नहीं।",
    compareVs: "बनाम",
    compareBtn: "तुलना करना",
    recipesTag: "चेनिंग वर्कफ़्लोज़",
    recipesTitle: "मल्टी-टूल वर्कफ़्लो रेसिपी",
    recipesDesc: "क्रियाओं को एक ही टैब में संयोजित करें. डाउनलोड-अपलोड लूप के बिना हमारी 100% निजी वेब उपयोगिताओं को अनुक्रमित और श्रृंखलाबद्ध करना सीखें।",
    recipesViewGuide: "गाइड देखें",
    searchEscape: "ईएससी",
    termsIPDesc: "ZeroWebTools वेबसाइट डिज़ाइन, कोड और ब्रांडिंग बौद्धिक संपदा कानूनों द्वारा संरक्षित हैं। आप स्पष्ट अनुमति के बिना साइट के स्रोत कोड का पुनरुत्पादन, संशोधन या वितरण नहीं कर सकते।",
    termsAdsTitle: "विज्ञापन देना",
    termsAdsDesc: "ZeroWebTools Google AdSense के माध्यम से तृतीय-पक्ष विज्ञापन प्रदर्शित करता है। ये विज्ञापन Google की अपनी शर्तों और गोपनीयता नीतियों के अधीन हैं। हम तृतीय-पक्ष विज्ञापन सामग्री के लिए ज़िम्मेदार नहीं हैं।",
    termsChangesTitle: "शर्तों में परिवर्तन",
    termsChangesDesc: "हम किसी भी समय इन शर्तों को अद्यतन करने का अधिकार सुरक्षित रखते हैं। परिवर्तनों के बाद साइट का निरंतर उपयोग अद्यतन शर्तों की स्वीकृति माना जाता है।",
    termsContactTitle: "संपर्क",
    termsContactDesc: "यदि इन शर्तों के बारे में आपके कोई प्रश्न हैं, तो कृपया हमसे यहां संपर्क करें",
  },
  it: {
    homeTitle: "Strumenti web semplici e privati nel tuo browser.",
    homeDesc: "Strumenti gratuiti, veloci e sicuri per modificare PDF, convertire formati e ridimensionare immagini. Tutto funziona localmente senza caricare file.",
    searchPlaceholder: "Cerca uno strumento (es. unisci pdf)...",
    exploreAllTools: "Esplora tutti gli strumenti",
    allTools: "Tutti gli strumenti",
    pdfTools: "Strumenti PDF",
    imageTools: "Strumenti Media",
    developerTools: "Sviluppatori",
    generators: "Generatori",
    textTools: "Testo",
    calculators: "Calcolatori",
    fun: "Divertimento",
    launch: "Avvia",
    extensionTools: "Strumenti di estensione",
    live: "VIVERE",
    savedTools: "Strumenti Salvati",
    spotlightUtilities: "In evidenza",
    guidesResources: "Guide & Risorse",
    privacy: "Privacy",
    terms: "Termini",
    comingSoon: "Prossimamente",
    toolFilter: "Filtra",
    privateBadge: "100% Privato • {count} strumenti online gratuiti",
    faqTitle: "Domande Frequenti",
    faqSubtitle: "Tutto quello che c'è da sapere sulla privacy e l'uso di ZeroWebTools.",
    howToDesc: "Esplora tutorial rapidi, ricette visive per concatenare più strumenti e confronti dettagliati dei concorrenti orientati alla privacy.",
    faqQ1: "È completamente gratuito?",
    faqA1: "Sì, ZeroWebTools è gratuito al 100%. Nessun abbonamento, nessun costo nascosto e nessuna registrazione richiesta.",
    faqQ2: "I miei file vengono caricati su un server?",
    faqA2: "No. Tutti gli strumenti vengono eseguiti interamente sul lato client utilizzando WebAssembly nel browser. I tuoi file non lasciano mai il tuo dispositivo.",
    faqQ3: "Devo scaricare qualcosa?",
    faqA3: "No, non è necessario installare alcuna app o software. Tutto funziona in modo sicuro all'interno del tuo browser web.",
    aboutTitle: "Informazioni su ZeroWebTools",
    aboutMission: "La nostra missione",
    aboutMissionP1: "ZeroWebTools è stata fondata con una missione semplice ma fondamentale: fornire a sviluppatori, amministratori di sistema e creatori di contenuti una suite premium e velocissima di strumenti di utilità che rispetti la privacy dei dati.",
    aboutMissionP2: "Gli strumenti online standard, come compilatori PDF, formattatori JSON o decodificatori base64, caricano spesso file, token e log sensibili su server remoti per l'elaborazione. Ciò espone il codice proprietario, i record dei clienti e i token sicuri a potenziali intercettazioni o fughe di dati.",
    aboutArchitecture: "Architettura lato client al 100%.",
    aboutArchitectureP1: "Per risolvere questa vulnerabilità, abbiamo creato ZeroWebTools con un'architettura locale incentrata sulla privacy. Ogni strumento nel nostro catalogo di oltre 57 risorse funziona interamente nel contesto del tuo browser:",
    aboutArchList1: "Nessun caricamento sul server: i tuoi documenti, blocchi di codice e parametri non lasciano mai il tuo computer locale.",
    aboutArchList2: "Potenza di WebAssembly: operazioni pesanti come conversioni di immagini e rendering di PDF vengono compilate direttamente in WebAssembly (Wasm) ed eseguite lato client a velocità nativa.",
    aboutArchList3: "Supporto offline: poiché non è richiesta alcuna elaborazione lato server, è possibile accedere e utilizzare i nostri strumenti interamente offline.",
    aboutOpenSource: "Open Source e trasparenza",
    aboutOpenSourceP1: "Per funzionalità avanzate come le richieste CORS locali e lo scraping del contenuto delle pagine Web, manteniamo l'estensione ZeroWebTools Companion open source e il repository principale. Come la nostra piattaforma web, il compagno funziona completamente lato client e non esegue alcuna registrazione o analisi remota. Pubblicando pubblicamente il nostro codice sorgente su GitHub, invitiamo gli utenti e i revisori della sicurezza a verificare l'integrità del nostro codice.",
    aboutWhoWeAre: "Chi siamo",
    aboutWhoWeAreP1: "Siamo un team indipendente, guidato dagli sviluppatori, dedicato alla creazione di una piattaforma web più pulita e sicura. ZeroWebTools è gratuito e sosteniamo i nostri costi di sviluppo e hosting interamente tramite reti pubblicitarie pulite e non invasive.",
    contactTitle: "Contatta l'assistenza",
    contactSubtitle: "Hai una domanda, un feedback, una richiesta di strumenti o una segnalazione di bug? Mettiti in contatto direttamente con noi. Rispondiamo a tutte le richieste tecniche entro 24-48 ore.",
    contactEmailLabel: "Indirizzo e-mail",
    contactEmailDesc: "Per supporto generale, domande API o richieste di licenze aziendali, inviaci un'e-mail direttamente:",
    contactRequestLabel: "Richieste di funzionalità e bug",
    contactRequestDesc: "Vuoi un nuovo strumento? Trovato un bug? Apri un problema sul nostro repository GitHub:",
    contactFormTitle: "Invia un messaggio",
    contactFormSuccess: "Messaggio inviato con successo!",
    contactFormSuccessDesc: "Grazie per avermi contattato. Ti risponderemo presto alla tua email.",
    contactFormSendAnother: "Invia un altro messaggio",
    contactFormEmailLabel: "La tua e-mail",
    contactFormEmailPlaceholder: "sviluppatore@esempio.com",
    contactFormSubjectLabel: "Soggetto",
    contactFormSubjectPlaceholder: "Segnalazione bug/Richiesta strumento",
    contactFormMessageLabel: "Messaggio",
    contactFormMessagePlaceholder: "Descrivi il tuo problema o suggerimento in dettaglio...",
    contactFormError: "Qualcosa è andato storto. Riprova o inviaci direttamente un'e-mail.",
    contactFormSubmitting: "Invio...",
    contactFormSubmit: "Invia messaggio",
    privacyTitle: "politica sulla riservatezza",
    privacyDataColTitle: "Raccolta dati",
    privacyDataColDesc: "ZeroWebTools funziona interamente all'interno del tuo browser. Nessun dato personale, input di strumenti o risultati di elaborazione viene trasmesso ad alcun server. Tutti i calcoli vengono eseguiti lato client utilizzando JavaScript.",
    privacyCookiesTitle: "Cookie e analisi",
    privacyCookiesDesc: "Potremmo utilizzare cookie essenziali per la funzionalità del sito e cookie analitici di terze parti per comprendere i modelli di utilizzo. Google AdSense può pubblicare annunci pubblicitari utilizzando i cookie come descritto nelle norme pubblicitarie di Google.",
    privacyThirdPartyTitle: "Servizi di terze parti",
    privacyThirdPartyDesc: "Google AdSense può utilizzare cookie e web beacon per pubblicare annunci pubblicitari in base alle visite precedenti. Gli utenti possono disattivare la pubblicità personalizzata tramite le Impostazioni annunci di Google.",
    privacyContactTitle: "Contatto",
    privacyContactDesc: "Per domande relative alla privacy, contattaci direttamente all'indirizzo",
    termsTitle: "Termini di servizio",
    termsUseTitle: "Utilizzo del servizio",
    termsUseDesc: "ZeroWebTools fornisce strumenti di utilità per sviluppatori gratuiti basati su browser. Utilizzando questi strumenti, accetti questi termini. Tutti gli strumenti elaborano i dati localmente nel tuo browser; nessun dato viene inviato a server esterni.",
    termsWarrantiesTitle: "Esclusione di garanzie",
    termsWarrantiesDesc: "Gli strumenti vengono forniti \"così come sono\" senza garanzie di alcun tipo. Non forniamo alcuna garanzia circa l'accuratezza, l'affidabilità o l'idoneità per uno scopo particolare. Utilizza i risultati a tua discrezione.",
    termsIPTitle: "Proprietà intellettuale",
    extTag: "ESTENSIONE UFFICIALE COMPAGNO",
    extTitle: "Compagno di ZeroWebTools",
    extDesc: "Un'estensione del browser sicura progettata per estendere le funzionalità della piattaforma web. Sblocca le utilità per sviluppatori offline e collega le autorizzazioni del browser per strumenti online avanzati.",
    extChrome: "Aggiungi a Chrome",
    extFirefox: "Aggiungi a Firefox",
    extCard1Title: "Barra degli strumenti dell'utilità offline",
    extCard1Desc: "Accedi in qualsiasi momento agli editor di utilità essenziali direttamente dalla barra dei menu del browser, senza bisogno di connessione Internet. Funziona in un sandbox locale completamente privato.",
    extCard1ClientSide: "⚡ Elaborazione 100% lato client",
    extCard2Title: "Ponte API della piattaforma",
    extCard2Desc: "Sblocca strumenti avanzati su zerowebtools.com che richiedono ambiti del browser elevati o autorizzazioni CORS. L'estensione li esegue in modo sicuro per tuo conto.",
    extCard2Privacy: "🛡️ Privacy protetta end-to-end",
    extHowTitle: "Come il compagno si integra",
    extStep1Title: "Installa l'estensione",
    extStep1Desc: "Scaricalo dal Chrome Web Store. Si trova silenziosamente nella barra degli strumenti dell'estensione in attesa dell'attivazione dei comandi.",
    extStep2Title: "Rilevamento del ponte",
    extStep2Desc: "Quando visiti le pagine degli strumenti come il client API REST, la pagina rileva automaticamente il bridge sicuro associato.",
    extStep3Title: "Esegui localmente",
    extStep3Desc: "Query e scrap vengono eseguiti direttamente dal motore del tuo browser, aggirando i limiti CORS senza server di terze parti.",
    extSecurityTitle: "100% aperto e verificabile",
    extSecurityDesc: "ZeroWebTools Companion contiene **zero pixel di tracciamento, ping diagnostici o database di analisi**. Funziona esclusivamente come contenitore di elaborazione offline e bridge proxy locale sul tuo hardware.",
    headerAbout: "Di",
    headerContact: "Contatto",
    searchNoResults: "Nessuno strumento trovato corrispondente alla tua query.",
    searchResults: "Risultati della ricerca",
    searchPopular: "Strumenti rapidi popolari",
    searchClientSide: "Lato client",
    searchNavigate: "Navigare",
    searchSelect: "Selezionare",
    searchQuick: "Ricerca rapida...",
    searchDesktopOnly: "Solo desktop",
    compareTag: "Alternative e abbinamenti",
    compareTitle: "ZeroWebTools contro la concorrenza",
    compareDesc: "Scopri perché ZeroWebTools è la principale alternativa attenta alla privacy. Esecuzione locale al 100% basata su browser con zero caricamenti di file e nessun limite di abbonamento.",
    compareVs: "contro",
    compareBtn: "Confrontare",
    recipesTag: "Concatenamento dei flussi di lavoro",
    recipesTitle: "Ricette per flussi di lavoro multistrumento",
    recipesDesc: "Combina le azioni in un'unica scheda. Scopri come sequenziare e concatenare le nostre utilità web private al 100% senza cicli di download-caricamento.",
    recipesViewGuide: "Visualizza la guida",
    searchEscape: "ESC",
    termsIPDesc: "Il design, il codice e il marchio del sito Web ZeroWebTools sono protetti dalle leggi sulla proprietà intellettuale. Non è possibile riprodurre, modificare o distribuire il codice sorgente del sito senza esplicita autorizzazione.",
    termsAdsTitle: "Pubblicità",
    termsAdsDesc: "ZeroWebTools visualizza annunci pubblicitari di terze parti tramite Google AdSense. Questi annunci sono soggetti ai termini e alle norme sulla privacy di Google. Non siamo responsabili per il contenuto degli annunci di terze parti.",
    termsChangesTitle: "Modifiche ai Termini",
    termsChangesDesc: "Ci riserviamo il diritto di aggiornare questi termini in qualsiasi momento. L'uso continuato del sito dopo le modifiche implica l'accettazione dei termini aggiornati.",
    termsContactTitle: "Contatto",
    termsContactDesc: "In caso di domande sui presenti Termini, contattarci all'indirizzo",
  },
  ar: {
    homeTitle: "أدوات ويب بسيطة وخاصة في متصفحك مباشرة.",
    homeDesc: "أدوات مجانية وسريعة وآمنة تماماً لتعديل ملفات PDF وتحويل التنسيقات وتغيير حجم الصور. تعمل جميع الأدوات محلياً بالكامل على جهازك دون رفع أي ملفات.",
    searchPlaceholder: "ابحث عن أداة (مثال: دمج PDF)...",
    exploreAllTools: "استكشف جميع الأدوات",
    allTools: "جميع الأدوات",
    pdfTools: "أدوات PDF",
    imageTools: "أدوات الوسائط",
    developerTools: "أدوات المطورين",
    generators: "المولدات",
    textTools: "أدوات النصوص",
    calculators: "الحاسبات",
    fun: "مرح",
    launch: "تشغيل",
    extensionTools: "أدوات التمديد",
    live: "يعيش",
    savedTools: "أدواتك المحفوظة",
    spotlightUtilities: "أدوات مميزة",
    guidesResources: "الأدلة والمصادر",
    privacy: "الخصوصية",
    terms: "الشروط",
    comingSoon: "قريباً",
    toolFilter: "تصفية",
    privateBadge: "خصوصية 100% • {count} أداة مجانية عبر الإنترنت",
    faqTitle: "الأسئلة الشائعة",
    faqSubtitle: "كل ما تحتاج لمعرفته حول خصوصية واستخدام ZeroWebTools.",
    howToDesc: "استكشف البرامج التعليمية لبدء التشغيل السريع، ووصفات تسلسل الأدوات المتعددة المرئية، والمقارنات التفصيلية للمنافسين التي تعطي الأولوية للخصوصية.",
    faqQ1: "هل هو مجاني تماما؟",
    faqA1: "نعم، ZeroWebTools مجاني 100%. لا توجد اشتراكات، ولا رسوم مخفية، ولا يلزم التسجيل.",
    faqQ2: "هل يتم تحميل ملفاتي على الخادم؟",
    faqA2: "لا، يتم تنفيذ جميع الأدوات بالكامل من جانب العميل باستخدام WebAssembly في متصفحك. ملفاتك لا تترك جهازك أبدًا.",
    faqQ3: "هل أحتاج إلى تنزيل أي شيء؟",
    faqA3: "لا، لا تحتاج إلى تثبيت أي تطبيقات أو برامج. كل شيء يعمل بشكل آمن داخل متصفح الويب الخاص بك.",
    aboutTitle: "حول ZeroWebTools",
    aboutMission: "مهمتنا",
    aboutMissionP1: "تم تأسيس ZeroWebTools لمهمة بسيطة ولكنها حاسمة: تزويد المطورين ومسؤولي النظام ومنشئي المحتوى بمجموعة متميزة وسريعة من الأدوات المساعدة التي تحترم خصوصية بياناتهم.",
    aboutMissionP2: "تقوم الأدوات القياسية عبر الإنترنت - مثل برامج تجميع PDF أو تنسيقات JSON أو وحدات فك ترميز base64 - بتحميل ملفاتك ورموزك المميزة وسجلاتك الحساسة بشكل متكرر إلى خوادم بعيدة للمعالجة. وهذا يعرض رمز الملكية وسجلات العملاء والرموز الآمنة للاعتراض المحتمل أو تسرب البيانات.",
    aboutArchitecture: "بنية 100% من جانب العميل",
    aboutArchitectureP1: "لحل هذه الثغرة الأمنية، قمنا ببناء ZeroWebTools ببنية محلية تضع الخصوصية أولاً. تعمل كل أداة في كتالوجنا الذي يضم أكثر من 57 موردًا بالكامل ضمن سياق المتصفح الخاص بك:",
    aboutArchList1: "عدم تحميلات الخادم: لا تترك مستنداتك وكتل التعليمات البرمجية والمعلمات جهاز الكمبيوتر المحلي الخاص بك أبدًا.",
    aboutArchList2: "قوة WebAssembly: يتم تجميع العمليات الثقيلة مثل تحويلات الصور وعرض PDF مباشرة في WebAssembly (Wasm) ويتم تنفيذها من جانب العميل بالسرعة الأصلية.",
    aboutArchList3: "الدعم دون الاتصال بالإنترنت: نظرًا لعدم الحاجة إلى حوسبة من جانب الخادم، يمكن الوصول إلى أدواتنا وتشغيلها بالكامل دون اتصال بالإنترنت.",
    aboutOpenSource: "المصدر المفتوح والشفافية",
    aboutOpenSourceP1: "بالنسبة للميزات المتقدمة مثل طلبات CORS المحلية واستخراج محتوى صفحة الويب، فإننا نحافظ على ملحق ZeroWebTools Companion مفتوح المصدر والمستودع الرئيسي. مثل منصة الويب الخاصة بنا، يعمل الرفيق بالكامل من جانب العميل ولا يقوم بإجراء أي تسجيل أو تحليلات عن بعد. من خلال نشر كود المصدر الخاص بنا بشكل عام على GitHub، فإننا ندعو المستخدمين ومدققي الأمان للتحقق من سلامة الكود الخاص بنا.",
    aboutWhoWeAre: "من نحن",
    aboutWhoWeAreP1: "نحن فريق مستقل يقوده المطورون ومخصصون لبناء منصة ويب أكثر نظافة وأمانًا. إن استخدام ZeroWebTools مجاني، ونحن ندعم تكاليف التطوير والاستضافة بالكامل من خلال شبكات إعلانية نظيفة وغير تدخلية.",
    contactTitle: "اتصل بالدعم",
    contactSubtitle: "هل لديك سؤال أو تعليق أو طلب أداة أو تقرير خطأ؟ تواصل معنا مباشرة. نقوم بالرد على جميع الاستفسارات الفنية خلال 24-48 ساعة.",
    contactEmailLabel: "عنوان البريد الإلكتروني",
    contactEmailDesc: "للحصول على الدعم العام، أو استفسارات واجهة برمجة التطبيقات، أو طلبات ترخيص الشركة، راسلنا عبر البريد الإلكتروني مباشرة:",
    contactRequestLabel: "طلبات الميزات والأخطاء",
    contactRequestDesc: "هل تريد أداة جديدة؟ العثور على خطأ؟ افتح مشكلة في مستودع GitHub الخاص بنا:",
    contactFormTitle: "أرسل رسالة",
    contactFormSuccess: "تم إرسال الرسالة بنجاح!",
    contactFormSuccessDesc: "شكرا لتواصلك معنا. سوف نقوم بالرد عليك على البريد الإلكتروني الخاص بك قريبا.",
    contactFormSendAnother: "أرسل رسالة أخرى",
    contactFormEmailLabel: "البريد الإلكتروني الخاص بك",
    contactFormEmailPlaceholder: "Developer@example.com",
    contactFormSubjectLabel: "موضوع",
    contactFormSubjectPlaceholder: "تقرير الأخطاء / طلب الأداة",
    contactFormMessageLabel: "رسالة",
    contactFormMessagePlaceholder: "قم بوصف مشكلتك أو اقتراحك بالتفصيل...",
    contactFormError: "حدث خطأ ما. يرجى المحاولة مرة أخرى أو مراسلتنا عبر البريد الإلكتروني مباشرة.",
    contactFormSubmitting: "إرسال...",
    contactFormSubmit: "أرسل رسالة",
    privacyTitle: "سياسة الخصوصية",
    privacyDataColTitle: "جمع البيانات",
    privacyDataColDesc: "تعمل ZeroWebTools بالكامل داخل متصفحك. لا يتم نقل أي بيانات شخصية أو مدخلات الأدوات أو نتائج المعالجة إلى أي خادم. يتم تنفيذ جميع الحسابات من جانب العميل باستخدام JavaScript.",
    privacyCookiesTitle: "ملفات تعريف الارتباط والتحليلات",
    privacyCookiesDesc: "قد نستخدم ملفات تعريف الارتباط الأساسية لوظائف الموقع وملفات تعريف الارتباط التحليلية التابعة لجهات خارجية لفهم أنماط الاستخدام. قد يعرض Google AdSense الإعلانات باستخدام ملفات تعريف الارتباط كما هو موضح في سياسات Google الإعلانية.",
    privacyThirdPartyTitle: "خدمات الطرف الثالث",
    privacyThirdPartyDesc: "قد يستخدم Google AdSense ملفات تعريف الارتباط وإشارات الويب لعرض الإعلانات بناءً على الزيارات السابقة. يمكن للمستخدمين إلغاء الاشتراك في الإعلانات المخصصة من خلال إعدادات إعلانات Google.",
    privacyContactTitle: "اتصال",
    privacyContactDesc: "للاستفسارات المتعلقة بالخصوصية، اتصل بنا مباشرة على",
    termsTitle: "شروط الخدمة",
    termsUseTitle: "استخدام الخدمة",
    termsUseDesc: "توفر ZeroWebTools أدوات مساعدة مجانية للمطورين قائمة على المتصفح. باستخدام هذه الأدوات، فإنك توافق على هذه الشروط. تقوم جميع الأدوات بمعالجة البيانات محليًا في متصفحك؛ لا يتم إرسال أي بيانات إلى خوادم خارجية.",
    termsWarrantiesTitle: "إخلاء المسؤولية عن الضمانات",
    termsWarrantiesDesc: "يتم توفير الأدوات \"كما هي\" دون أي ضمان من أي نوع. نحن لا نقدم أي ضمانات بشأن الدقة أو الموثوقية أو الملاءمة لغرض معين. استخدم النتائج وفقًا لتقديرك الخاص.",
    termsIPTitle: "الملكية الفكرية",
    extTag: "تمديد الشركة الرسمية",
    extTitle: "رفيق ZeroWebTools",
    extDesc: "ملحق متصفح آمن مصمم لتوسيع قدرات منصة الويب. يفتح أدوات المطورين غير المتصلة بالإنترنت ويربط أذونات المتصفح بالأدوات المتقدمة عبر الإنترنت.",
    extChrome: "أضف إلى كروم",
    extFirefox: "أضف إلى فايرفوكس",
    extCard1Title: "شريط الأدوات المساعدة دون اتصال",
    extCard1Desc: "يمكنك الوصول إلى برامج تحرير الأدوات المساعدة المهمة مباشرةً في شريط قوائم المتصفح الخاص بك في أي وقت، دون الحاجة إلى اتصال بالإنترنت. يعمل في وضع الحماية المحلي الخاص بالكامل.",
    extCard1ClientSide: "⚡ معالجة من جانب العميل بنسبة 100%",
    extCard2Title: "جسر API الخاص بالمنصة",
    extCard2Desc: "افتح الأدوات المتقدمة على موقع Zerowebtools.com التي تتطلب نطاقات متصفح مرتفعة أو أذونات CORS. يقوم الامتداد بتنفيذها بأمان نيابة عنك.",
    extCard2Privacy: "🛡️ حماية الخصوصية من البداية إلى النهاية",
    extHowTitle: "كيف يتكامل الرفيق",
    extStep1Title: "قم بتثبيت الامتداد",
    extStep1Desc: "قم بالتنزيل من سوق Chrome الإلكتروني. إنه موجود بصمت في شريط أدوات الامتداد الخاص بك في انتظار مشغلات الأوامر.",
    extStep2Title: "كشف الجسر",
    extStep2Desc: "عند زيارتك لصفحات الأدوات مثل REST API Client، تكتشف الصفحة الجسر الآمن المصاحب تلقائيًا.",
    extStep3Title: "تنفيذ محليا",
    extStep3Desc: "يتم تشغيل الاستعلامات والنسخ مباشرة من محرك المتصفح الخاص بك، مما يتجاوز حدود CORS بدون خوادم خارجية.",
    extSecurityTitle: "مفتوحة وقابلة للتدقيق بنسبة 100%",
    extSecurityDesc: "يحتوي ZeroWebTools Companion على ** صفر بكسلات تتبع أو أصوات تشخيصية أو قواعد بيانات تحليلية **. إنه يعمل فقط كحاوية معالجة دون اتصال بالإنترنت وجسر وكيل محلي على أجهزتك.",
    headerAbout: "عن",
    headerContact: "اتصال",
    searchNoResults: "لم يتم العثور على أدوات تطابق استعلامك.",
    searchResults: "نتائج البحث",
    searchPopular: "أدوات سريعة شعبية",
    searchClientSide: "من جانب العميل",
    searchNavigate: "انتقل",
    searchSelect: "يختار",
    searchQuick: "بحث سريع...",
    searchDesktopOnly: "سطح المكتب فقط",
    compareTag: "البدائل والمطابقات",
    compareTitle: "ZeroWebTools مقابل المنافسين",
    compareDesc: "اكتشف لماذا يعتبر ZeroWebTools البديل الرائد للخصوصية أولاً. تنفيذ محلي بنسبة 100% يعتمد على المتصفح بدون تحميلات للملفات وبدون جدران اشتراك.",
    compareVs: "مقابل",
    compareBtn: "يقارن",
    recipesTag: "تسلسل سير العمل",
    recipesTitle: "وصفات سير العمل متعددة الأدوات",
    recipesDesc: "الجمع بين الإجراءات في علامة تبويب واحدة. تعرف على كيفية ترتيب وتسلسل أدوات الويب المساعدة الخاصة بنسبة 100% دون تكرار حلقات التنزيل والتحميل.",
    recipesViewGuide: "عرض الدليل",
    searchEscape: "خروج",
    termsIPDesc: "إن تصميم موقع ZeroWebTools ورمزه وعلامته التجارية محمية بموجب قوانين الملكية الفكرية. لا يجوز لك إعادة إنتاج أو تعديل أو توزيع الكود المصدري للموقع دون الحصول على إذن صريح.",
    termsAdsTitle: "دعاية",
    termsAdsDesc: "يعرض ZeroWebTools إعلانات الجهات الخارجية من خلال Google AdSense. تخضع هذه الإعلانات لشروط وسياسات الخصوصية الخاصة بشركة Google. نحن لسنا مسؤولين عن محتوى إعلان الطرف الثالث.",
    termsChangesTitle: "التغييرات في الشروط",
    termsChangesDesc: "نحن نحتفظ بالحق في تحديث هذه الشروط في أي وقت. استمرار استخدام الموقع بعد التغييرات يشكل قبولا للشروط المحدثة.",
    termsContactTitle: "اتصال",
    termsContactDesc: "إذا كان لديك أي أسئلة حول هذه الشروط، يرجى الاتصال بنا على",
  }

};

export function getTranslations(lang: string | undefined): TranslationDictionary {
  const safeLang = (lang as SupportedLocale) || "en";
  return DICTIONARIES[safeLang] || DICTIONARIES["en"];
}

// Map to handle dynamic translations for the 4 Spotlight tools to show how it's done for SEO
const TOOL_TRANSLATIONS: Record<string, Record<string, { title: string; description: string; metaDescription?: string }>> = {
  "pdf-merge": {
    "es": {
      "title": "Fusionar PDF",
      "description": "Combine varios archivos PDF en un solo documento en cualquier orden.",
      "metaDescription": "Fusione archivos PDF en uno: gratis, instantáneo y 100 % privado. Sin registro, sin carga a servidores. Reorganice las páginas y descárguelas en segundos."
    },
    "de": {
      "title": "PDF zusammenführen",
      "description": "Kombinieren Sie mehrere PDFs in beliebiger Reihenfolge zu einem einzigen Dokument.",
      "metaDescription": "Führen Sie PDF-Dateien zu einer zusammen – kostenlos, sofort und 100 % privat. Keine Anmeldung, kein Upload auf Server. Ordnen Sie Seiten neu an und laden Sie sie in Sekundenschnelle herunter."
    },
    "fr": {
      "title": "Fusionner un PDF",
      "description": "Combinez plusieurs PDF en un seul document dans n'importe quel ordre.",
      "metaDescription": "Fusionnez des fichiers PDF en un seul – gratuitement, instantanément et 100 % privé. Pas d'inscription, pas de téléchargement sur les serveurs. Réorganisez les pages et téléchargez en quelques secondes."
    },
    "pt": {
      "title": "Mesclar PDF",
      "description": "Combine vários PDFs em um único documento em qualquer ordem.",
      "metaDescription": "Mesclar arquivos PDF em um só — gratuito, instantâneo e 100% privado. Sem inscrição, sem upload para servidores. Reorganize as páginas e baixe em segundos."
    },
    "ja": {
      "title": "PDFを結合",
      "description": "複数の PDF を任意の順序で 1 つのドキュメントに結合します。",
      "metaDescription": "PDF ファイルを 1 つに結合します。無料、インスタント、そして完全にプライベートです。サインアップやサーバーへのアップロードは必要ありません。ページを並べ替えて数秒でダウンロードできます。"
    },
    "zh": {
      "title": "合并PDF",
      "description": "以任意顺序将多个 PDF 合并为一个文档。",
      "metaDescription": "将 PDF 文件合并为一个 — 免费、即时且 100% 私密。无需注册，无需上传到服务器。重新排列页面并在几秒钟内下载。"
    },
    "hi": {
      "title": "पीडीएफ मर्ज करें",
      "description": "किसी भी क्रम में एकाधिक पीडीएफ़ को एक ही दस्तावेज़ में संयोजित करें।",
      "metaDescription": "पीडीएफ फाइलों को एक में मर्ज करें - निःशुल्क, तत्काल और 100% निजी। कोई साइनअप नहीं, सर्वर पर कोई अपलोड नहीं। पृष्ठों को पुनर्व्यवस्थित करें और सेकंडों में डाउनलोड करें।"
    },
    "it": {
      "title": "Unisci PDF",
      "description": "Combina più PDF in un unico documento in qualsiasi ordine.",
      "metaDescription": "Unisci file PDF in uno solo: gratuito, istantaneo e privato al 100%. Nessuna registrazione, nessun caricamento sui server. Riorganizza le pagine e scaricale in pochi secondi."
    },
    "ar": {
      "title": "دمج قوات الدفاع الشعبي",
      "description": "قم بدمج ملفات PDF متعددة في مستند واحد بأي ترتيب.",
      "metaDescription": "دمج ملفات PDF في ملف واحد - مجاني وفوري وخاص بنسبة 100%. لا يوجد اشتراك، لا يوجد تحميل على الخوادم. إعادة ترتيب الصفحات وتنزيلها في ثوان."
    }
  },
  "pdf-split": {
    "es": {
      "title": "Dividir PDF",
      "description": "Extraiga o elimine páginas individuales de documentos PDF.",
      "metaDescription": "Divida o extraiga páginas PDF al instante: gratis, privado y sin cargas en el servidor. Seleccione páginas o rangos exactos y descárguelos con un solo clic."
    },
    "de": {
      "title": "PDF teilen",
      "description": "Extrahieren oder entfernen Sie einzelne Seiten aus PDF-Dokumenten.",
      "metaDescription": "Teilen oder extrahieren Sie PDF-Seiten sofort – kostenlos, privat, ohne Server-Uploads. Wählen Sie genaue Seiten oder Bereiche aus und laden Sie sie mit einem Klick herunter."
    },
    "fr": {
      "title": "Fractionner un PDF",
      "description": "Extrayez ou supprimez des pages individuelles des documents PDF.",
      "metaDescription": "Divisez ou extrayez des pages PDF instantanément : gratuitement, en privé et sans téléchargement sur le serveur. Sélectionnez des pages ou des plages exactes et téléchargez en un clic."
    },
    "pt": {
      "title": "Dividir PDF",
      "description": "Extraia ou remova páginas individuais de documentos PDF.",
      "metaDescription": "Divida ou extraia páginas PDF instantaneamente — gratuito, privado e sem uploads de servidor. Selecione páginas ou intervalos exatos e faça o download com um clique."
    },
    "ja": {
      "title": "PDFの分割",
      "description": "PDF ドキュメントから個々のページを抽出または削除します。",
      "metaDescription": "PDF ページを瞬時に分割または抽出します。無料、プライベート、サーバーへのアップロードは不要です。正確なページまたは範囲を選択し、ワンクリックでダウンロードします。"
    },
    "zh": {
      "title": "分割PDF",
      "description": "从 PDF 文档中提取或删除单个页面。",
      "metaDescription": "立即分割或提取 PDF 页面 — 免费、私密、无需服务器上传。选择确切的页面或范围并一键下载。"
    },
    "hi": {
      "title": "पीडीएफ को विभाजित करें",
      "description": "पीडीएफ दस्तावेजों से अलग-अलग पेज निकालें या हटाएं।",
      "metaDescription": "पीडीएफ पृष्ठों को तुरंत विभाजित करें या निकालें - मुफ़्त, निजी, कोई सर्वर अपलोड नहीं। सटीक पेज या रेंज चुनें और एक क्लिक में डाउनलोड करें।"
    },
    "it": {
      "title": "PDF diviso",
      "description": "Estrai o rimuovi singole pagine dai documenti PDF.",
      "metaDescription": "Dividi o estrai le pagine PDF all'istante: gratuitamente, in privato, senza caricamenti sul server. Seleziona pagine o intervalli esatti e scarica con un clic."
    },
    "ar": {
      "title": "تقسيم قوات الدفاع الشعبي",
      "description": "استخراج أو إزالة الصفحات الفردية من مستندات PDF.",
      "metaDescription": "قم بتقسيم صفحات PDF أو استخراجها على الفور - مجانًا، وخاص، وبدون تحميلات على الخادم. حدد الصفحات أو النطاقات المحددة وقم بتنزيلها بنقرة واحدة."
    }
  },
  "pdf-compress": {
    "es": {
      "title": "Comprimir PDF",
      "description": "Reduzca el tamaño del archivo PDF eliminando objetos no utilizados y optimizando las transmisiones.",
      "metaDescription": "Reduzca el tamaño de los archivos PDF hasta en un 90 %: gratis, rápido y totalmente privado. Tres niveles de compresión. No es necesario registrarse ni enviar un correo electrónico."
    },
    "de": {
      "title": "PDF komprimieren",
      "description": "Reduzieren Sie die Größe von PDF-Dateien, indem Sie nicht verwendete Objekte entfernen und Streams optimieren.",
      "metaDescription": "Verkleinern Sie die Größe von PDF-Dateien um bis zu 90 % – kostenlos, schnell und vollständig privat. Drei Komprimierungsstufen. Keine Anmeldung, keine E-Mail erforderlich."
    },
    "fr": {
      "title": "Compresser un PDF",
      "description": "Réduisez la taille du fichier PDF en supprimant les objets inutilisés et en optimisant les flux.",
      "metaDescription": "Réduisez la taille des fichiers PDF jusqu'à 90 % - gratuitement, rapidement et entièrement privé. Trois niveaux de compression. Aucune inscription, aucun e-mail requis."
    },
    "pt": {
      "title": "Compactar PDF",
      "description": "Reduza o tamanho do arquivo PDF removendo objetos não utilizados e otimizando fluxos.",
      "metaDescription": "Reduza o tamanho dos arquivos PDF em até 90% — gratuito, rápido e totalmente privado. Três níveis de compressão. Sem inscrição, sem necessidade de e-mail."
    },
    "ja": {
      "title": "PDFを圧縮する",
      "description": "未使用のオブジェクトを削除し、ストリームを最適化することで、PDF ファイルのサイズを削減します。",
      "metaDescription": "PDF ファイルのサイズを最大 90% 縮小します — 無料、高速、そして完全にプライベートです。 3 つの圧縮レベル。サインアップもメールも必要ありません。"
    },
    "zh": {
      "title": "压缩PDF",
      "description": "通过删除未使用的对象和优化流来减小 PDF 文件大小。",
      "metaDescription": "将 PDF 文件大小缩小高达 90% — 免费、快速且完全私密。三个压缩级别。无需注册，无需电子邮件。"
    },
    "hi": {
      "title": "पीडीएफ को कंप्रेस करें",
      "description": "अप्रयुक्त वस्तुओं को हटाकर और स्ट्रीम को अनुकूलित करके पीडीएफ फ़ाइल का आकार कम करें।",
      "metaDescription": "पीडीएफ फ़ाइल का आकार 90% तक छोटा करें - मुफ़्त, तेज़ और पूरी तरह से निजी। तीन संपीड़न स्तर। कोई साइनअप नहीं, कोई ईमेल आवश्यक नहीं।"
    },
    "it": {
      "title": "Comprimi PDF",
      "description": "Riduci le dimensioni del file PDF rimuovendo gli oggetti inutilizzati e ottimizzando i flussi.",
      "metaDescription": "Riduci le dimensioni dei file PDF fino al 90%: gratis, veloce e completamente privato. Tre livelli di compressione. Nessuna registrazione, nessuna email richiesta."
    },
    "ar": {
      "title": "ضغط قوات الدفاع الشعبي",
      "description": "قم بتقليل حجم ملف PDF عن طريق إزالة الكائنات غير المستخدمة وتحسين التدفقات.",
      "metaDescription": "تقليص أحجام ملفات PDF بنسبة تصل إلى 90% - مجانًا، وسريع، وخاص تمامًا. ثلاثة مستويات للضغط. لا الاشتراك، لا البريد الإلكتروني المطلوبة."
    }
  },
  "pdf-rotate": {
    "es": {
      "title": "Girar PDF",
      "description": "Gire páginas individuales o archivos PDF completos 90, 180 o 270 grados.",
      "metaDescription": "Gire las páginas PDF al instante: 90, 180 o 270 grados. Gratis, privado, funciona directamente en tu navegador. No es necesario registrarse."
    },
    "de": {
      "title": "PDF drehen",
      "description": "Drehen Sie einzelne Seiten oder ganze PDFs um 90, 180 oder 270 Grad.",
      "metaDescription": "Drehen Sie PDF-Seiten sofort – um 90, 180 oder 270 Grad. Kostenlos, privat, funktioniert direkt in Ihrem Browser. Keine Anmeldung erforderlich."
    },
    "fr": {
      "title": "Faire pivoter le PDF",
      "description": "Faites pivoter des pages individuelles ou des PDF entiers de 90, 180 ou 270 degrés.",
      "metaDescription": "Faites pivoter instantanément les pages PDF : 90, 180 ou 270 degrés. Gratuit, privé, fonctionne directement dans votre navigateur. Aucune inscription nécessaire."
    },
    "pt": {
      "title": "Girar PDF",
      "description": "Gire páginas individuais ou PDFs inteiros em 90, 180 ou 270 graus.",
      "metaDescription": "Gire páginas PDF instantaneamente — 90, 180 ou 270 graus. Gratuito, privado, funciona direto no seu navegador. Não é necessária inscrição."
    },
    "ja": {
      "title": "PDFを回転する",
      "description": "個々のページまたは PDF 全体を 90、180、または 270 度回転します。",
      "metaDescription": "PDF ページを瞬時に回転します (90 度、180 度、または 270 度)。無料、プライベート、ブラウザで直接動作します。サインアップは必要ありません。"
    },
    "zh": {
      "title": "旋转 PDF",
      "description": "将单个页面或整个 PDF 旋转 90、180 或 270 度。",
      "metaDescription": "立即旋转 PDF 页面 — 90、180 或 270 度。免费、私密，可在您的浏览器中运行。无需注册。"
    },
    "hi": {
      "title": "पीडीएफ घुमाएँ",
      "description": "अलग-अलग पृष्ठों या संपूर्ण PDF को 90, 180, या 270 डिग्री तक घुमाएँ।",
      "metaDescription": "पीडीएफ पृष्ठों को तुरंत घुमाएँ - 90, 180, या 270 डिग्री। मुफ़्त, निजी, सीधे आपके ब्राउज़र में काम करता है। किसी साइनअप की आवश्यकता नहीं."
    },
    "it": {
      "title": "Ruota PDF",
      "description": "Ruota singole pagine o interi PDF di 90, 180 o 270 gradi.",
      "metaDescription": "Ruota istantaneamente le pagine PDF: 90, 180 o 270 gradi. Gratuito, privato, funziona direttamente nel tuo browser. Non è necessaria alcuna registrazione."
    },
    "ar": {
      "title": "تدوير قوات الدفاع الشعبي",
      "description": "قم بتدوير الصفحات الفردية أو ملفات PDF بأكملها بمقدار 90 أو 180 أو 270 درجة.",
      "metaDescription": "قم بتدوير صفحات PDF على الفور – 90 أو 180 أو 270 درجة. مجاني وخاص ويعمل مباشرة في متصفحك. لا حاجة للتسجيل."
    }
  },
  "pdf-to-jpg": {
    "es": {
      "title": "PDF a JPG",
      "description": "Convierta cada página PDF en una imagen JPG de alta resolución.",
      "metaDescription": "Convierta páginas PDF en imágenes JPG de alta calidad: gratis, instantáneo y privado. Se admite la conversión por lotes. Sin cargas de servidor, sin registro."
    },
    "de": {
      "title": "PDF zu JPG",
      "description": "Konvertieren Sie jede PDF-Seite in ein hochauflösendes JPG-Bild.",
      "metaDescription": "Konvertieren Sie PDF-Seiten in hochwertige JPG-Bilder – kostenlos, sofort und privat. Stapelkonvertierung unterstützt. Keine Server-Uploads, keine Anmeldung."
    },
    "fr": {
      "title": "PDF en JPG",
      "description": "Convertissez chaque page PDF en une image JPG haute résolution.",
      "metaDescription": "Convertissez des pages PDF en images JPG de haute qualité – gratuitement, instantanément et privées. Conversion par lots prise en charge. Aucun téléchargement de serveur, aucune inscription."
    },
    "pt": {
      "title": "PDF para JPG",
      "description": "Converta cada página PDF em uma imagem JPG de alta resolução.",
      "metaDescription": "Converta páginas PDF em imagens JPG de alta qualidade — gratuito, instantâneo e privado. Conversão em lote suportada. Nenhum upload de servidor, nenhuma inscrição."
    },
    "ja": {
      "title": "PDFからJPGへ",
      "description": "各 PDF ページを高解像度の JPG 画像に変換します。",
      "metaDescription": "PDF ページを高品質の JPG 画像に無料で瞬時に非公開に変換します。バッチ変換がサポートされています。サーバーへのアップロードやサインアップは必要ありません。"
    },
    "zh": {
      "title": "PDF 转 JPG",
      "description": "将每个 PDF 页面转换为高分辨率 JPG 图像。",
      "metaDescription": "将 PDF 页面转换为高质量的 JPG 图像 - 免费、即时且私密。支持批量转换。无需服务器上传，无需注册。"
    },
    "hi": {
      "title": "पीडीएफ से जेपीजी",
      "description": "प्रत्येक पीडीएफ पेज को उच्च-रिज़ॉल्यूशन वाली जेपीजी छवि में बदलें।",
      "metaDescription": "पीडीएफ पृष्ठों को उच्च-गुणवत्ता वाली जेपीजी छवियों में बदलें - मुफ़्त, त्वरित और निजी। बैच रूपांतरण समर्थित. कोई सर्वर अपलोड नहीं, कोई साइनअप नहीं।"
    },
    "it": {
      "title": "Da PDF a JPG",
      "description": "Converti ogni pagina PDF in un'immagine JPG ad alta risoluzione.",
      "metaDescription": "Converti pagine PDF in immagini JPG di alta qualità: gratis, istantaneo e privato. Conversione batch supportata. Nessun caricamento sul server, nessuna registrazione."
    },
    "ar": {
      "title": "قوات الدفاع الشعبي إلى JPG",
      "description": "قم بتحويل كل صفحة PDF إلى صورة JPG عالية الدقة.",
      "metaDescription": "قم بتحويل صفحات PDF إلى صور JPG عالية الجودة - مجانًا وفوريًا وخاصًا. دعم تحويل الدفعة. لا توجد تحميلات الخادم، لا الاشتراك."
    }
  },
  "jpg-to-pdf": {
    "es": {
      "title": "JPG a PDF",
      "description": "Convierta varias imágenes JPG en un solo documento PDF.",
      "metaDescription": "Convierta imágenes JPG en un PDF limpio: gratis, privado e instantáneo. Ajuste el tamaño, los márgenes y la orientación de la página. No es necesario registrarse."
    },
    "de": {
      "title": "JPG zu PDF",
      "description": "Konvertieren Sie mehrere JPG-Bilder in ein einziges PDF-Dokument.",
      "metaDescription": "Verwandeln Sie JPG-Bilder in ein sauberes PDF – kostenlos, privat und sofort. Passen Sie Seitengröße, Ränder und Ausrichtung an. Keine Anmeldung erforderlich."
    },
    "fr": {
      "title": "JPG en PDF",
      "description": "Convertissez plusieurs images JPG en un seul document PDF.",
      "metaDescription": "Transformez les images JPG en un PDF épuré — gratuit, privé et instantané. Ajustez la taille de la page, les marges et l’orientation. Aucune inscription nécessaire."
    },
    "pt": {
      "title": "JPG para PDF",
      "description": "Converta várias imagens JPG em um único documento PDF.",
      "metaDescription": "Transforme imagens JPG em um PDF limpo — gratuito, privado e instantâneo. Ajuste o tamanho, as margens e a orientação da página. Não é necessária inscrição."
    },
    "ja": {
      "title": "JPGからPDFへ",
      "description": "複数の JPG 画像を 1 つの PDF ドキュメントに変換します。",
      "metaDescription": "JPG 画像をクリーンな PDF に変換します。無料、プライベート、そして即時です。ページのサイズ、余白、向きを調整します。サインアップは必要ありません。"
    },
    "zh": {
      "title": "JPG 转 PDF",
      "description": "将多个 JPG 图像转换为单个 PDF 文档。",
      "metaDescription": "将 JPG 图像转换为干净的 PDF — 免费、私密且即时。调整页面大小、页边距和方向。无需注册。"
    },
    "hi": {
      "title": "जेपीजी से पीडीएफ",
      "description": "एकाधिक JPG छवियों को एक एकल पीडीएफ दस्तावेज़ में परिवर्तित करें।",
      "metaDescription": "JPG छवियों को एक साफ़ पीडीएफ में बदलें - निःशुल्क, निजी और तत्काल। पेज का आकार, मार्जिन और ओरिएंटेशन समायोजित करें। किसी साइनअप की आवश्यकता नहीं."
    },
    "it": {
      "title": "da JPG a PDF",
      "description": "Converti più immagini JPG in un unico documento PDF.",
      "metaDescription": "Trasforma le immagini JPG in un PDF pulito: gratuito, privato e istantaneo. Regola le dimensioni, i margini e l'orientamento della pagina. Non è necessaria alcuna registrazione."
    },
    "ar": {
      "title": "JPG إلى PDF",
      "description": "تحويل صور JPG متعددة إلى مستند PDF واحد.",
      "metaDescription": "قم بتحويل صور JPG إلى ملف PDF نظيف - مجاني وخاص وفوري. ضبط حجم الصفحة والهوامش والاتجاه. لا حاجة للتسجيل."
    }
  },
  "pdf-protect": {
    "es": {
      "title": "Proteger PDF",
      "description": "Agregue cifrado de contraseña a los archivos PDF para evitar el acceso no autorizado.",
      "metaDescription": "Proteja con contraseña su PDF en segundos: gratis, privado e instantáneo. Cifrado de 128 bits. Sin registro, sin cargas de servidor."
    },
    "de": {
      "title": "PDF schützen",
      "description": "Fügen Sie PDF-Dateien eine Passwortverschlüsselung hinzu, um unbefugten Zugriff zu verhindern.",
      "metaDescription": "Schützen Sie Ihr PDF in Sekundenschnelle mit einem Passwort – kostenlos, privat und sofort. 128-Bit-Verschlüsselung. Keine Anmeldung, keine Server-Uploads."
    },
    "fr": {
      "title": "Protéger le PDF",
      "description": "Ajoutez un cryptage par mot de passe aux fichiers PDF pour empêcher tout accès non autorisé.",
      "metaDescription": "Protégez votre PDF par mot de passe en quelques secondes – gratuitement, privé et instantané. Cryptage 128 bits. Aucune inscription, aucun téléchargement sur le serveur."
    },
    "pt": {
      "title": "Proteger PDF",
      "description": "Adicione criptografia de senha aos arquivos PDF para evitar acesso não autorizado.",
      "metaDescription": "Proteja seu PDF com senha em segundos – gratuito, privado e instantâneo. Criptografia de 128 bits. Sem inscrição, sem uploads de servidor."
    },
    "ja": {
      "title": "PDFを保護する",
      "description": "PDF ファイルにパスワード暗号化を追加して、不正なアクセスを防ぎます。",
      "metaDescription": "PDF を数秒でパスワード保護 - 無料、プライベート、即時。 128ビット暗号化。サインアップやサーバーへのアップロードは必要ありません。"
    },
    "zh": {
      "title": "保护PDF",
      "description": "为 PDF 文件添加密码加密，以防止未经授权的访问。",
      "metaDescription": "几秒钟内即可用密码保护您的 PDF — 免费、私密且即时。 128 位加密。无需注册，无需服务器上传。"
    },
    "hi": {
      "title": "पीडीएफ को सुरक्षित रखें",
      "description": "अनधिकृत पहुंच को रोकने के लिए पीडीएफ फाइलों में पासवर्ड एन्क्रिप्शन जोड़ें।",
      "metaDescription": "अपने पीडीएफ को सेकंडों में पासवर्ड से सुरक्षित करें - निःशुल्क, निजी और तत्काल। 128-बिट एन्क्रिप्शन। कोई साइनअप नहीं, कोई सर्वर अपलोड नहीं।"
    },
    "it": {
      "title": "Proteggi PDF",
      "description": "Aggiungi la crittografia tramite password ai file PDF per impedire l'accesso non autorizzato.",
      "metaDescription": "Proteggi con password il tuo PDF in pochi secondi: gratuito, privato e immediato. Crittografia a 128 bit. Nessuna registrazione, nessun caricamento sul server."
    },
    "ar": {
      "title": "حماية قوات الدفاع الشعبي",
      "description": "أضف تشفير كلمة المرور إلى ملفات PDF لمنع الوصول غير المصرح به.",
      "metaDescription": "قم بحماية ملف PDF الخاص بك بكلمة مرور في ثوانٍ - مجانًا وخاصًا وفوريًا. تشفير 128 بت. لا يوجد اشتراك، ولا يوجد تحميلات على الخادم."
    }
  },
  "pdf-watermark": {
    "es": {
      "title": "Agregar marca de agua",
      "description": "Estampe marcas de agua de texto o imágenes en páginas PDF.",
      "metaDescription": "Estampe marcas de agua en su PDF: CONFIDENCIAL, BORRADOR o su marca. Fuente, opacidad, ángulo y posición personalizados. Gratis y privado."
    },
    "de": {
      "title": "Wasserzeichen hinzufügen",
      "description": "Stempeln Sie Text- oder Bildwasserzeichen auf PDF-Seiten.",
      "metaDescription": "Stempeln Sie Wasserzeichen in Ihr PDF – VERTRAULICH, ENTWURF oder Ihren Markennamen. Benutzerdefinierte Schriftart, Deckkraft, Winkel und Position. Kostenlos und privat."
    },
    "fr": {
      "title": "Ajouter un filigrane",
      "description": "Tamponnez des filigranes de texte ou d’image sur les pages PDF.",
      "metaDescription": "Tamponnez des filigranes sur votre PDF — CONFIDENTIEL, BROUILLON ou le nom de votre marque. Police, opacité, angle et position personnalisés. Gratuit et privé."
    },
    "pt": {
      "title": "Adicionar marca d’água",
      "description": "Carimbe marcas d'água de texto ou imagem em páginas PDF.",
      "metaDescription": "Carimbe marcas d’água em seu PDF – CONFIDENCIAL, RASCUNHO ou o nome de sua marca. Fonte, opacidade, ângulo e posição personalizados. Gratuito e privado."
    },
    "ja": {
      "title": "透かしを追加する",
      "description": "PDF ページにテキストまたは画像の透かしをスタンプします。",
      "metaDescription": "PDF に社外秘、下書き、またはブランド名などの透かしをスタンプします。カスタムのフォント、不透明度、角度、位置。無料かつプライベート。"
    },
    "zh": {
      "title": "添加水印",
      "description": "将文本或图像水印标记到 PDF 页面上。",
      "metaDescription": "在 PDF 上添加水印 - 机密、草稿或您的品牌名称。自定义字体、不透明度、角度和位置。免费且私密。"
    },
    "hi": {
      "title": "वॉटरमार्क जोड़ें",
      "description": "पीडीएफ पृष्ठों पर टेक्स्ट या छवि वॉटरमार्क अंकित करें।",
      "metaDescription": "अपने पीडीएफ पर वॉटरमार्क अंकित करें - गोपनीय, ड्राफ्ट, या अपने ब्रांड का नाम। कस्टम फ़ॉन्ट, अस्पष्टता, कोण और स्थिति। मुफ़्त और निजी."
    },
    "it": {
      "title": "Aggiungi filigrana",
      "description": "Applica filigrane di testo o immagini sulle pagine PDF.",
      "metaDescription": "Applica filigrane sul tuo PDF: RISERVATO, BOZZA o il nome del tuo marchio. Carattere, opacità, angolo e posizione personalizzati. Gratuito e privato."
    },
    "ar": {
      "title": "أضف علامة مائية",
      "description": "ختم العلامات المائية النصية أو المصورة على صفحات PDF.",
      "metaDescription": "ختم العلامات المائية على ملف PDF الخاص بك — سري، أو مسودة، أو اسم علامتك التجارية. الخط المخصص والعتامة والزاوية والموضع. مجانية وخاصة."
    }
  },
  "pdf-page-numbers": {
    "es": {
      "title": "Agregar números de página",
      "description": "Inserte números de página en documentos PDF con posición y formato personalizados.",
      "metaDescription": "Agregue números de página a cualquier PDF: superior, inferior, central o esquina. Fuente, tamaño y número inicial personalizados. Gratis, privado, instantáneo."
    },
    "de": {
      "title": "Fügen Sie Seitenzahlen hinzu",
      "description": "Fügen Sie Seitenzahlen mit benutzerdefinierter Position und Formatierung in PDF-Dokumente ein.",
      "metaDescription": "Fügen Sie Seitenzahlen zu jeder PDF-Datei hinzu – oben, unten, in der Mitte oder in der Ecke. Benutzerdefinierte Schriftart, Größe und Startnummer. Kostenlos, privat, sofort."
    },
    "fr": {
      "title": "Ajouter des numéros de page",
      "description": "Insérez des numéros de page dans des documents PDF avec une position et un formatage personnalisés.",
      "metaDescription": "Ajoutez des numéros de page à n'importe quel PDF : en haut, en bas, au centre ou dans le coin. Police, taille et numéro de départ personnalisés. Gratuit, privé, instantané."
    },
    "pt": {
      "title": "Adicionar números de página",
      "description": "Insira números de página em documentos PDF com posição e formatação personalizadas.",
      "metaDescription": "Adicione números de página a qualquer PDF – na parte superior, inferior, central ou canto. Fonte, tamanho e número inicial personalizados. Gratuito, privado, instantâneo."
    },
    "ja": {
      "title": "ページ番号を追加する",
      "description": "カスタムの位置と書式を使用して PDF ドキュメントにページ番号を挿入します。",
      "metaDescription": "PDF にページ番号 (上、下、中央、隅) を追加します。カスタムのフォント、サイズ、開始番号。無料、プライベート、インスタント。"
    },
    "zh": {
      "title": "添加页码",
      "description": "使用自定义位置和格式将页码插入 PDF 文档。",
      "metaDescription": "向任何 PDF 添加页码 - 顶部、底部、中心或角。自定义字体、大小和起始数字。免费、私密、即时。"
    },
    "hi": {
      "title": "पेज नंबर जोड़ें",
      "description": "कस्टम स्थिति और फ़ॉर्मेटिंग के साथ पीडीएफ दस्तावेज़ों में पृष्ठ संख्याएँ डालें।",
      "metaDescription": "किसी भी पीडीएफ में पेज नंबर जोड़ें - ऊपर, नीचे, केंद्र या कोने में। कस्टम फ़ॉन्ट, आकार और आरंभिक संख्या। निःशुल्क, निजी, तत्काल।"
    },
    "it": {
      "title": "Aggiungi numeri di pagina",
      "description": "Inserisci i numeri di pagina nei documenti PDF con posizione e formattazione personalizzate.",
      "metaDescription": "Aggiungi numeri di pagina a qualsiasi PDF: in alto, in basso, al centro o negli angoli. Carattere, dimensione e numero iniziale personalizzati. Gratuito, privato, immediato."
    },
    "ar": {
      "title": "إضافة أرقام الصفحات",
      "description": "أدخل أرقام الصفحات في مستندات PDF بموضع وتنسيق مخصصين.",
      "metaDescription": "أضف أرقام الصفحات إلى أي ملف PDF — أعلى أو أسفل أو وسط أو زاوية. الخط المخصص والحجم ورقم البداية. مجاني، خاص، فوري."
    }
  },
  "pdf-organize": {
    "es": {
      "title": "Organizar PDF",
      "description": "Reordene, elimine o extraiga páginas de documentos PDF.",
      "metaDescription": "Organizador de páginas PDF de arrastrar y soltar: reordene, elimine o extraiga páginas visualmente. Gratis, privado y funciona directamente en tu navegador."
    },
    "de": {
      "title": "PDF organisieren",
      "description": "Ordnen Sie Seiten aus PDF-Dokumenten neu an, löschen Sie sie oder extrahieren Sie sie.",
      "metaDescription": "PDF-Seiten-Organizer per Drag-and-Drop verschieben – Seiten visuell neu anordnen, löschen oder extrahieren. Kostenlos, privat und funktioniert direkt in Ihrem Browser."
    },
    "fr": {
      "title": "Organiser le PDF",
      "description": "Réorganisez, supprimez ou extrayez des pages de documents PDF.",
      "metaDescription": "Organisateur de pages PDF par glisser-déposer : réorganisez, supprimez ou extrayez les pages visuellement. Gratuit, privé et fonctionne directement dans votre navigateur."
    },
    "pt": {
      "title": "Organizar PDF",
      "description": "Reordene, exclua ou extraia páginas de documentos PDF.",
      "metaDescription": "Organizador de páginas PDF de arrastar e soltar — reordene, exclua ou extraia páginas visualmente. Gratuito, privado e funciona diretamente no seu navegador."
    },
    "ja": {
      "title": "PDFを整理する",
      "description": "PDF ドキュメントからページを並べ替え、削除、または抽出します。",
      "metaDescription": "ドラッグ アンド ドロップ PDF ページ オーガナイザー — ページを視覚的に並べ替え、削除、または抽出します。無料、プライベート、ブラウザで直接動作します。"
    },
    "zh": {
      "title": "整理 PDF",
      "description": "从 PDF 文档中重新排序、删除或提取页面。",
      "metaDescription": "拖放 PDF 页面管理器 — 直观地重新排序、删除或提取页面。免费、私密，并且可以在您的浏览器中运行。"
    },
    "hi": {
      "title": "पीडीएफ व्यवस्थित करें",
      "description": "पीडीएफ दस्तावेज़ों से पृष्ठों को पुन: व्यवस्थित करें, हटाएं या निकालें।",
      "metaDescription": "पीडीएफ पेज आयोजक को खींचें और छोड़ें - पृष्ठों को दृश्य रूप से पुन: व्यवस्थित करें, हटाएं या निकालें। मुफ़्त, निजी और सीधे आपके ब्राउज़र में काम करता है।"
    },
    "it": {
      "title": "Organizza PDF",
      "description": "Riordina, elimina o estrai pagine da documenti PDF.",
      "metaDescription": "Organizzatore di pagine PDF con trascinamento: riordina, elimina o estrai visivamente le pagine. Gratuito, privato e funziona direttamente nel tuo browser."
    },
    "ar": {
      "title": "تنظيم قوات الدفاع الشعبي",
      "description": "إعادة ترتيب الصفحات أو حذفها أو استخراجها من مستندات PDF.",
      "metaDescription": "منظم صفحات PDF بالسحب والإسقاط - إعادة ترتيب الصفحات أو حذفها أو استخراجها بشكل مرئي. مجاني وخاص ويعمل مباشرة في متصفحك."
    }
  },
  "pdf-unlock": {
    "es": {
      "title": "Desbloquear PDF",
      "description": "Elimine la protección con contraseña de los archivos PDF (requiere que conozca la contraseña).",
      "metaDescription": "Elimine la protección con contraseña de PDF al instante, de forma gratuita y privada. Ingrese su contraseña, descifre y descargue. No hay cargas del servidor."
    },
    "de": {
      "title": "PDF entsperren",
      "description": "Entfernen Sie den Passwortschutz von PDF-Dateien (erfordert die Kenntnis des Passworts).",
      "metaDescription": "Entfernen Sie den PDF-Passwortschutz sofort – kostenlos und privat. Geben Sie Ihr Passwort ein, entschlüsseln Sie es und laden Sie es herunter. Keine Server-Uploads."
    },
    "fr": {
      "title": "Déverrouiller le PDF",
      "description": "Supprimez la protection par mot de passe des fichiers PDF (vous devez connaître le mot de passe).",
      "metaDescription": "Supprimez instantanément la protection par mot de passe des PDF – gratuitement et en privé. Entrez votre mot de passe, décryptez et téléchargez. Aucun téléchargement sur le serveur."
    },
    "pt": {
      "title": "Desbloquear PDF",
      "description": "Remova a proteção por senha de arquivos PDF (requer que você saiba a senha).",
      "metaDescription": "Remova a proteção por senha de PDF instantaneamente — de forma gratuita e privada. Digite sua senha, descriptografe e faça o download. Nenhum upload de servidor."
    },
    "ja": {
      "title": "PDFのロックを解除する",
      "description": "PDF ファイルからパスワード保護を解除します (パスワードを知っている必要があります)。",
      "metaDescription": "PDF のパスワード保護を即座に解除します — 無料かつプライベートです。パスワードを入力し、復号化してダウンロードします。サーバーへのアップロードはありません。"
    },
    "zh": {
      "title": "解锁 PDF",
      "description": "删除 PDF 文件的密码保护（要求您知道密码）。",
      "metaDescription": "立即删除 PDF 密码保护 — 免费且私密。输入密码，解密并下载。没有服务器上传。"
    },
    "hi": {
      "title": "पीडीएफ अनलॉक करें",
      "description": "पीडीएफ फाइलों से पासवर्ड सुरक्षा हटाएं (आपको पासवर्ड जानना आवश्यक है)।",
      "metaDescription": "पीडीएफ पासवर्ड सुरक्षा तुरंत हटाएं - निःशुल्क और निजी। अपना पासवर्ड दर्ज करें, डिक्रिप्ट करें और डाउनलोड करें। कोई सर्वर अपलोड नहीं."
    },
    "it": {
      "title": "Sblocca PDF",
      "description": "Rimuovi la protezione tramite password dai file PDF (è necessario conoscere la password).",
      "metaDescription": "Rimuovi istantaneamente la protezione tramite password dei PDF: gratuita e privata. Inserisci la tua password, decodifica e scarica. Nessun caricamento sul server."
    },
    "ar": {
      "title": "فتح ملف PDF",
      "description": "إزالة حماية كلمة المرور من ملفات PDF (يتطلب منك معرفة كلمة المرور).",
      "metaDescription": "قم بإزالة حماية كلمة مرور PDF على الفور - مجانًا وخاصة. أدخل كلمة المرور الخاصة بك، وفك التشفير، والتنزيل. لا توجد تحميلات الخادم."
    }
  },
  "pdf-sign": {
    "es": {
      "title": "Firmar PDF",
      "description": "Dibuja, escribe o carga una firma para firmar páginas PDF localmente con escala de arrastrar y soltar.",
      "metaDescription": "Firme archivos PDF de forma segura en su navegador, gratis y privado. Dibuja tu firma, escríbela o sube firmas PNG. Escale y colóquelos visualmente. No hay cargas del servidor."
    },
    "de": {
      "title": "PDF signieren",
      "description": "Zeichnen, tippen oder laden Sie eine Signatur hoch, um PDF-Seiten lokal mit Drag-and-Drop-Skalierung zu signieren.",
      "metaDescription": "Signieren Sie PDF-Dateien sicher in Ihrem Browser – kostenlos und privat. Zeichnen Sie Ihre Signatur, geben Sie sie ein oder laden Sie PNG-Signaturen hoch. Skalieren und platzieren Sie sie visuell. Keine Server-Uploads."
    },
    "fr": {
      "title": "Signer le PDF",
      "description": "Dessinez, saisissez ou téléchargez une signature pour signer des pages PDF localement avec une mise à l'échelle par glisser-déposer.",
      "metaDescription": "Signez des fichiers PDF en toute sécurité dans votre navigateur – gratuitement et en privé. Dessinez votre signature, tapez-la ou téléchargez des signatures PNG. Mettez-les à l’échelle et placez-les visuellement. Aucun téléchargement sur le serveur."
    },
    "pt": {
      "title": "Assinar PDF",
      "description": "Desenhe, digite ou carregue uma assinatura para assinar páginas PDF localmente com escala de arrastar e soltar.",
      "metaDescription": "Assine arquivos PDF com segurança em seu navegador — gratuito e privado. Desenhe sua assinatura, digite-a ou carregue assinaturas PNG. Dimensione e posicione-os visualmente. Nenhum upload de servidor."
    },
    "ja": {
      "title": "PDFに署名",
      "description": "署名を描画、入力、またはアップロードして、ドラッグ アンド ドロップの拡大縮小を使用して PDF ページにローカルで署名します。",
      "metaDescription": "ブラウザで PDF ファイルに安全に署名します。無料かつプライベートです。署名を描くか、入力するか、PNG 署名をアップロードします。視覚的に拡大縮小して配置します。サーバーへのアップロードはありません。"
    },
    "zh": {
      "title": "签署 PDF",
      "description": "绘制、输入或上传签名，通过拖放缩放在本地签署 PDF 页面。",
      "metaDescription": "在浏览器中安全地签署 PDF 文件 - 免费且私密。绘制您的签名、输入签名或上传 PNG 签名。直观地缩放和放置它们。没有服务器上传。"
    },
    "hi": {
      "title": "पीडीएफ पर हस्ताक्षर करें",
      "description": "ड्रैग-एंड-ड्रॉप स्केलिंग के साथ स्थानीय रूप से पीडीएफ पृष्ठों पर हस्ताक्षर करने के लिए हस्ताक्षर बनाएं, टाइप करें या अपलोड करें।",
      "metaDescription": "अपने ब्राउज़र में सुरक्षित रूप से पीडीएफ फाइलों पर हस्ताक्षर करें - निःशुल्क और निजी। अपना हस्ताक्षर बनाएं, उसे टाइप करें, या पीएनजी हस्ताक्षर अपलोड करें। स्केल करें और उन्हें दृष्टिगत रूप से रखें। कोई सर्वर अपलोड नहीं."
    },
    "it": {
      "title": "Firma PDF",
      "description": "Disegna, digita o carica una firma per firmare le pagine PDF localmente con il ridimensionamento tramite trascinamento.",
      "metaDescription": "Firma i file PDF in modo sicuro nel tuo browser: gratuito e privato. Disegna la tua firma, digitala o carica firme PNG. Ridimensionali e posizionali visivamente. Nessun caricamento sul server."
    },
    "ar": {
      "title": "التوقيع على قوات الدفاع الشعبي",
      "description": "ارسم توقيعًا أو اكتبه أو قم بتحميله لتوقيع صفحات PDF محليًا باستخدام مقياس السحب والإفلات.",
      "metaDescription": "قم بتوقيع ملفات PDF بشكل آمن في متصفحك - مجانًا وخاصة. ارسم توقيعك، أو اكتبه، أو قم بتحميل توقيعات PNG. مقياس ووضعها بصريا. لا توجد تحميلات الخادم."
    }
  },
  "pdf-crop": {
    "es": {
      "title": "Recorte de PDF y cambio de tamaño de página",
      "description": "Recorte los márgenes del PDF y cambie el tamaño de las páginas a tamaños estándar (A4, Carta, Legal) en el lado del cliente.",
      "metaDescription": "Recorte los márgenes del PDF visualmente o cambie el tamaño de las páginas a diseños A4, Carta y Legal al instante. Utilidad gratuita y privada en el navegador. No hay cargas del servidor."
    },
    "de": {
      "title": "PDF-Zuschnitt und Seitengröße ändern",
      "description": "Beschneiden Sie PDF-Ränder und ändern Sie die Seitengröße clientseitig auf Standardgrößen (A4, Letter, Legal).",
      "metaDescription": "Beschneiden Sie PDF-Ränder visuell oder ändern Sie die Seitengröße sofort in die Layouts A4, Letter und Legal. Kostenloses und privates In-Browser-Dienstprogramm. Keine Server-Uploads."
    },
    "fr": {
      "title": "Recadrage PDF et redimensionnement de page",
      "description": "Recadrez les marges du PDF et redimensionnez les pages aux formats standard (A4, Lettre, Légal) côté client.",
      "metaDescription": "Recadrez visuellement les marges du PDF ou redimensionnez instantanément les pages aux mises en page A4, Lettre et Légal. Utilitaire gratuit et privé dans le navigateur. Aucun téléchargement sur le serveur."
    },
    "pt": {
      "title": "Corte de PDF e redimensionamento de página",
      "description": "Corte as margens do PDF e redimensione as páginas para tamanhos padrão (A4, Carta, Ofício) no lado do cliente.",
      "metaDescription": "Corte visualmente as margens do PDF ou redimensione as páginas para layouts A4, Carta e Ofício instantaneamente. Utilitário gratuito e privado no navegador. Nenhum upload de servidor."
    },
    "ja": {
      "title": "PDF のトリミングとページのサイズ変更",
      "description": "クライアント側で PDF の余白をトリミングし、ページを標準サイズ (A4、レター、リーガル) にサイズ変更します。",
      "metaDescription": "PDF の余白を視覚的にトリミングしたり、ページのサイズを A4、レター、リーガルのレイアウトに瞬時に変更したりできます。無料のプライベートなブラウザ内ユーティリティ。サーバーへのアップロードはありません。"
    },
    "zh": {
      "title": "PDF 裁剪和页面调整大小",
      "description": "在客户端裁剪 PDF 页边距并将页面大小调整为标准尺寸（A4、Letter、Legal）。",
      "metaDescription": "直观地裁剪 PDF 边距或立即将页面大小调整为 A4、Letter 和 Legal 布局。免费且私密的浏览器内实用程序。没有服务器上传。"
    },
    "hi": {
      "title": "पीडीएफ फसल और पृष्ठ का आकार बदलें",
      "description": "पीडीएफ मार्जिन को काटें और पेजों को मानक आकार (ए4, लेटर, लीगल) क्लाइंट-साइड में आकार दें।",
      "metaDescription": "पीडीएफ मार्जिन को दृश्य रूप से काटें या पृष्ठों का आकार A4, लेटर और कानूनी लेआउट में तुरंत बदलें। मुफ़्त और निजी इन-ब्राउज़र उपयोगिता। कोई सर्वर अपलोड नहीं."
    },
    "it": {
      "title": "Ritaglia PDF e ridimensiona la pagina",
      "description": "Ritaglia i margini del PDF e ridimensiona le pagine in formati standard (A4, Lettera, Legale) lato client.",
      "metaDescription": "Ritaglia visivamente i margini del PDF o ridimensiona istantaneamente le pagine nei layout A4, Lettera e Legale. Utilità interna al browser gratuita e privata. Nessun caricamento sul server."
    },
    "ar": {
      "title": "قص PDF وتغيير حجم الصفحة",
      "description": "قص هوامش PDF وتغيير حجم الصفحات إلى الأحجام القياسية (A4، Letter، Legal) من جانب العميل.",
      "metaDescription": "يمكنك قص هوامش PDF بشكل مرئي أو تغيير حجم الصفحات إلى تخطيطات A4 وLetter وLegal على الفور. فائدة مجانية وخاصة في المتصفح. لا توجد تحميلات الخادم."
    }
  },
  "pdf-to-text": {
    "es": {
      "title": "Extractor de PDF a texto",
      "description": "Extraiga secuencias de texto sin formato y reconstruya localmente listas de diseños de páginas estructuradas.",
      "metaDescription": "Extraiga texto de archivos PDF en su navegador: gratis y privado. El algoritmo de reconstrucción de diseño coincide con secuencias tabulares. Descargar como texto sin formato. No hay cargas del servidor."
    },
    "de": {
      "title": "PDF-zu-Text-Extraktor",
      "description": "Extrahieren Sie Rohtextströme und erstellen Sie strukturierte Seitenlayoutlisten lokal neu.",
      "metaDescription": "Extrahieren Sie Text aus PDF-Dateien in Ihrem Browser – kostenlos und privat. Der Layout-Rekonstruktionsalgorithmus gleicht Tabellenströme ab. Als Klartext herunterladen. Keine Server-Uploads."
    },
    "fr": {
      "title": "Extracteur de PDF en texte",
      "description": "Extrayez les flux de texte brut et reconstruisez localement les listes de mises en page structurées.",
      "metaDescription": "Extrayez le texte des fichiers PDF dans votre navigateur – gratuitement et en privé. L'algorithme de reconstruction de mise en page correspond aux flux tabulaires. Téléchargez sous forme de texte brut. Aucun téléchargement sur le serveur."
    },
    "pt": {
      "title": "Extrator de PDF para Texto",
      "description": "Extraia fluxos de texto bruto e reconstrua listas de layout de página estruturadas localmente.",
      "metaDescription": "Extraia texto de arquivos PDF em seu navegador — gratuito e privado. O algoritmo de reconstrução de layout corresponde aos fluxos tabulares. Baixe como texto simples. Nenhum upload de servidor."
    },
    "ja": {
      "title": "PDF からテキストへの抽出",
      "description": "生のテキスト ストリームを抽出し、構造化されたページ レイアウト リストをローカルで再構築します。",
      "metaDescription": "ブラウザで PDF ファイルからテキストを抽出します — 無料かつ非公開です。レイアウト再構築アルゴリズムは表形式のストリームと一致します。プレーンテキストとしてダウンロードします。サーバーへのアップロードはありません。"
    },
    "zh": {
      "title": "PDF 到文本提取器",
      "description": "提取原始文本流并在本地重建结构化页面布局列表。",
      "metaDescription": "在浏览器中从 PDF 文件中提取文本 - 免费且私密。布局重建算法与表格流匹配。以纯文本形式下载。没有服务器上传。"
    },
    "hi": {
      "title": "पीडीएफ से टेक्स्ट एक्सट्रैक्टर",
      "description": "कच्ची पाठ धाराएँ निकालें और स्थानीय रूप से संरचित पृष्ठ लेआउट सूचियों का पुनर्निर्माण करें।",
      "metaDescription": "अपने ब्राउज़र में पीडीएफ फाइलों से टेक्स्ट निकालें - निःशुल्क और निजी। लेआउट-पुनर्निर्माण एल्गोरिदम सारणीबद्ध धाराओं से मेल खाता है। सादे पाठ के रूप में डाउनलोड करें. कोई सर्वर अपलोड नहीं."
    },
    "it": {
      "title": "Estrattore da PDF a testo",
      "description": "Estrai flussi di testo non elaborato e ricostruisci localmente elenchi di layout di pagina strutturati.",
      "metaDescription": "Estrai testo da file PDF nel tuo browser: gratuito e privato. L'algoritmo di ricostruzione del layout corrisponde ai flussi tabulari. Scarica come testo normale. Nessun caricamento sul server."
    },
    "ar": {
      "title": "PDF إلى مستخرج النص",
      "description": "قم باستخراج تدفقات النص الخام وإعادة بناء قوائم تخطيط الصفحة المنظمة محليًا.",
      "metaDescription": "قم باستخراج النص من ملفات PDF في متصفحك - مجانًا وخاص. تطابق خوارزمية إعادة بناء التخطيط التدفقات الجدولية. تحميل كنص عادي. لا توجد تحميلات الخادم."
    }
  },
  "word-counter": {
    "es": {
      "title": "Contador de palabras profesional",
      "description": "Cuente palabras, caracteres, oraciones y párrafos en tiempo real, además de análisis de densidad de palabras clave.",
      "metaDescription": "Contador gratuito de palabras y caracteres del lado del cliente. Analice el tiempo de lectura, el tiempo de conversación, las líneas, las oraciones y la densidad de palabras clave. 100% privado."
    },
    "de": {
      "title": "Wortzähler Pro",
      "description": "Zählen Sie Wörter, Zeichen, Sätze und Absätze in Echtzeit und analysieren Sie die Keyword-Dichte.",
      "metaDescription": "Kostenloser clientseitiger Wort- und Zeichenzähler. Analysieren Sie Lesezeit, Sprechzeit, Zeilen, Sätze und Keyword-Dichte. 100 % privat."
    },
    "fr": {
      "title": "Compteur de mots Pro",
      "description": "Comptez les mots, les caractères, les phrases et les paragraphes en temps réel, ainsi qu'une analyse de la densité des mots clés.",
      "metaDescription": "Compteur de mots et de caractères gratuit côté client. Analysez le temps de lecture, le temps de parole, les lignes, les phrases et la densité des mots clés. 100% privé."
    },
    "pt": {
      "title": "Contador de palavras profissional",
      "description": "Conte palavras, caracteres, frases e parágrafos em tempo real, além de análise de densidade de palavras-chave.",
      "metaDescription": "Contador gratuito de palavras e caracteres do lado do cliente. Analise o tempo de leitura, tempo de fala, falas, frases e densidade de palavras-chave. 100% privado."
    },
    "ja": {
      "title": "ワードカウンタープロ",
      "description": "リアルタイムで単語、文字、文、段落をカウントし、キーワード密度を分析します。",
      "metaDescription": "無料のクライアント側の単語および文字カウンター。読書時間、発話時間、セリフ、文章、キーワード密度を分析します。 100%プライベートです。"
    },
    "zh": {
      "title": "字数统计专业版",
      "description": "实时统计单词、字符、句子和段落，以及关键词密度分析。",
      "metaDescription": "免费的客户端单词和字符计数器。分析阅读时间、说话时间、台词、句子和关键词密度。 100% 私人。"
    },
    "hi": {
      "title": "वर्ड काउंटर प्रो",
      "description": "वास्तविक समय में शब्दों, वर्णों, वाक्यों और पैराग्राफों की गणना करें, साथ ही कीवर्ड घनत्व विश्लेषण भी करें।",
      "metaDescription": "मुफ़्त क्लाइंट-साइड शब्द और वर्ण काउंटर। पढ़ने का समय, बोलने का समय, पंक्तियाँ, वाक्य और कीवर्ड घनत्व का विश्लेषण करें। 100% निजी."
    },
    "it": {
      "title": "Contatore di parole Pro",
      "description": "Conta parole, caratteri, frasi e paragrafi in tempo reale, oltre all'analisi della densità delle parole chiave.",
      "metaDescription": "Contatore di parole e caratteri gratuito lato client. Analizza il tempo di lettura, il tempo di conversazione, le battute, le frasi e la densità delle parole chiave. 100% privato."
    },
    "ar": {
      "title": "عداد الكلمات برو",
      "description": "عد الكلمات والأحرف والجمل والفقرات في الوقت الفعلي، بالإضافة إلى تحليل كثافة الكلمات الرئيسية.",
      "metaDescription": "عداد حر للكلمات والأحرف من جانب العميل. تحليل وقت القراءة ووقت التحدث والسطور والجمل وكثافة الكلمات الرئيسية. خاص 100%."
    }
  },
  "case-converter": {
    "es": {
      "title": "Convertidor de cajas",
      "description": "Transforme las convenciones de nomenclatura entre camelCase, Snake_case, kebab-case y más.",
      "metaDescription": "Convierta texto entre cualquier convención de nomenclatura: camelCase, Snake_case, kebab-case, PascalCase, CONSTANT_CASE. Gratis, instantáneo y privado."
    },
    "de": {
      "title": "Fallkonverter",
      "description": "Wandeln Sie Namenskonventionen zwischen camelCase, Snake_case, kebab-case und mehr um.",
      "metaDescription": "Konvertieren Sie Text zwischen beliebigen Namenskonventionen – CamelCase, Snake_Case, Kebab-Case, PascalCase, CONSTANT_CASE. Kostenlos, sofort und privat."
    },
    "fr": {
      "title": "Convertisseur de cas",
      "description": "Transformez les conventions de dénomination entre camelCase, Snake_case, Kebab-case, etc.",
      "metaDescription": "Convertissez le texte entre n'importe quelle convention de dénomination : camelCase, Snake_case, kebab-case, PascalCase, CONSTANT_CASE. Gratuit, instantané et privé."
    },
    "pt": {
      "title": "Conversor de Caso",
      "description": "Transforme as convenções de nomenclatura entre camelCase, snake_case, kebab-case e muito mais.",
      "metaDescription": "Converta texto entre qualquer convenção de nomenclatura — camelCase, snake_case, kebab-case, PascalCase, CONSTANT_CASE. Gratuito, instantâneo e privado."
    },
    "ja": {
      "title": "大文字と小文字の変換",
      "description": "キャメルケース、スネークケース、ケバブケースなどの間で命名規則を変換します。",
      "metaDescription": "テキストを任意の命名規則 (キャメルケース、スネークケース、ケバブケース、パスカルケース、CONSTANT_CASE) 間で変換します。無料、インスタント、プライベート。"
    },
    "zh": {
      "title": "大小写转换器",
      "description": "转换camelCase、snake_case、kebab-case等之间的命名约定。",
      "metaDescription": "在任何命名约定之间转换文本——camelCase、snake_case、kebab-case、PascalCase、CONSTANT_CASE。免费、即时且私密。"
    },
    "hi": {
      "title": "केस परिवर्तक",
      "description": "कैमलकेस, स्नेक_केस, कबाब-केस और अन्य के बीच नामकरण परंपराओं को बदलें।",
      "metaDescription": "टेक्स्ट को किसी भी नामकरण परंपरा के बीच परिवर्तित करें - कैमलकेस, स्नेक_केस, कबाब-केस, पास्कलकेस, CONSTANT_CASE। मुफ़्त, तत्काल और निजी।"
    },
    "it": {
      "title": "Convertitore di casi",
      "description": "Trasforma le convenzioni di denominazione tra camelCase, snake_case, kebab-case e altro ancora.",
      "metaDescription": "Converti testo con qualsiasi convenzione di denominazione: camelCase, snake_case, kebab-case, PascalCase, CONSTANT_CASE. Gratuito, immediato e privato."
    },
    "ar": {
      "title": "محول الحالة",
      "description": "قم بتحويل اصطلاحات التسمية بين حالة الجمل، وحالة الثعبان، وحالة الكباب، والمزيد.",
      "metaDescription": "تحويل النص بين أي اصطلاح تسمية - CamelCase، وsnake_case، وkebab-case، وPascalCase، وCONSTANT_CASE. مجاني وفوري وخاص."
    }
  },
  "text-cleaner": {
    "es": {
      "title": "Limpiador de texto universal",
      "description": "Limpie espacios, elimine líneas duplicadas, elimine líneas vacías, elimine HTML, ordene listas y ejecute consultas de búsqueda y reemplazo.",
      "metaDescription": "Limpiar, formatear, ordenar y reemplazar secuencias de texto en el lado del cliente. Elimine duplicados y líneas vacías, elimine HTML y ejecute expresiones regulares buscar-reemplazar. 100% privado."
    },
    "de": {
      "title": "Universeller Textreiniger",
      "description": "Bereinigen Sie Leerzeichen, deduplizieren Sie Zeilen, entfernen Sie leere Zeilen, entfernen Sie HTML, sortieren Sie Listen und führen Sie Such- und Ersetzungsabfragen durch.",
      "metaDescription": "Bereinigen, formatieren, sortieren und ersetzen Sie Textsequenzen clientseitig. Entfernen Sie Duplikate und leere Zeilen, entfernen Sie HTML und führen Sie Regex Find-Replace aus. 100 % privat."
    },
    "fr": {
      "title": "Nettoyeur de texte universel",
      "description": "Nettoyez les espaces, dédoublonnez les lignes, supprimez les lignes vides, supprimez le code HTML, triez les listes et exécutez des requêtes de recherche et de remplacement.",
      "metaDescription": "Nettoyez, formatez, triez et remplacez les séquences de texte côté client. Supprimez les doublons et les lignes vides, supprimez le HTML et exécutez la recherche-remplacement de l'expression régulière. 100% privé."
    },
    "pt": {
      "title": "Limpador de texto universal",
      "description": "Limpe espaços, desduplique linhas, remova linhas vazias, elimine HTML, classifique listas e execute consultas de pesquisa e substituição.",
      "metaDescription": "Limpe, formate, classifique e substitua sequências de texto no lado do cliente. Remova duplicatas e linhas vazias, retire o HTML e execute regex find-replace. 100% privado."
    },
    "ja": {
      "title": "ユニバーサルテキストクリーナー",
      "description": "スペースの削除、行の重複排除、空行の削除、HTML の削除、リストの並べ替え、検索と置換クエリの実行。",
      "metaDescription": "クライアント側でテキスト シーケンスをクリーンアップ、フォーマット、並べ替え、置換します。重複と空行を削除し、HTML を削除し、正規表現の検索と置換を実行します。 100%プライベートです。"
    },
    "zh": {
      "title": "通用文本清理器",
      "description": "清理空格、删除重复行、删除空行、剥离 HTML、对列表进行排序以及运行搜索和替换查询。",
      "metaDescription": "客户端文本序列的清理、格式化、排序和替换。删除重复项和空行、剥离 HTML 并运行正则表达式查找替换。 100% 私人。"
    },
    "hi": {
      "title": "यूनिवर्सल टेक्स्ट क्लीनर",
      "description": "रिक्त स्थान साफ़ करें, पंक्तियाँ हटाएँ, रिक्त पंक्तियाँ हटाएँ, HTML हटाएँ, सूचियाँ क्रमबद्ध करें, और खोज-और-प्रतिस्थापन क्वेरी चलाएँ।",
      "metaDescription": "क्लाइंट-साइड टेक्स्ट अनुक्रमों को साफ़ करें, प्रारूपित करें, क्रमबद्ध करें और बदलें। डुप्लिकेट और खाली लाइनें हटाएं, HTML हटाएं, और रेगेक्स फाइंड-रिप्लेस चलाएं। 100% निजी."
    },
    "it": {
      "title": "Pulitore universale del testo",
      "description": "Pulisci gli spazi, deduplica le righe, rimuovi le righe vuote, elimina l'HTML, ordina gli elenchi ed esegui query di ricerca e sostituzione.",
      "metaDescription": "Pulisci, formatta, ordina e sostituisci sequenze di testo lato client. Rimuovi duplicati e righe vuote, rimuovi HTML ed esegui regex find-replace. 100% privato."
    },
    "ar": {
      "title": "منظف ​​النص العالمي",
      "description": "تنظيف المساحات، وإلغاء تكرار الأسطر، وإزالة الأسطر الفارغة، وتجريد HTML، وفرز القوائم، وتشغيل استعلامات البحث والاستبدال.",
      "metaDescription": "تنظيف وتنسيق وفرز واستبدال تسلسلات النص من جانب العميل. قم بإزالة التكرارات والأسطر الفارغة، وقم بإزالة HTML، وقم بتشغيل regex find-replace. خاص 100%."
    }
  },
  "voice-dictator": {
    "es": {
      "title": "Dictador y lector de voz nativa",
      "description": "Dicte voz a texto y nare texto a voz sin conexión utilizando las API nativas de Web Speech.",
      "metaDescription": "Convierta voz en texto con dictado en vivo y lea texto en voz alta con conversión de texto a voz local. Utilidad 100% privada del lado del cliente. No hay cargas del servidor."
    },
    "de": {
      "title": "Muttersprachlicher Diktator und Vorleser",
      "description": "Diktieren Sie mithilfe nativer Web-Speech-APIs Sprache in Text und erzählen Sie Text in Sprache offline.",
      "metaDescription": "Wandeln Sie Sprache mit Live-Diktat in Text um und lesen Sie Text mit lokaler Text-zu-Sprache vor. 100 % privates, clientseitiges Dienstprogramm. Keine Server-Uploads."
    },
    "fr": {
      "title": "Dictateur et lecteur de voix native",
      "description": "Dictez la parole en texte et racontez la synthèse vocale hors ligne à l'aide des API Web Speech natives.",
      "metaDescription": "Convertissez la parole en texte avec la dictée en direct et lisez le texte à haute voix avec la synthèse vocale locale. Utilitaire côté client 100% privé. Aucun téléchargement sur le serveur."
    },
    "pt": {
      "title": "Ditador e leitor de voz nativa",
      "description": "Dite fala para texto e narre texto para fala off-line usando APIs nativas de Web Speech.",
      "metaDescription": "Converta fala em texto com ditado ao vivo e leia texto em voz alta com conversão de texto em fala local. Utilitário 100% privado do lado do cliente. Nenhum upload de servidor."
    },
    "ja": {
      "title": "ネイティブ音声の独裁者とリーダー",
      "description": "ネイティブ Web Speech API を使用して、オフラインで音声をテキストに書き起こし、テキストを音声にナレーションします。",
      "metaDescription": "ライブディクテーションで音声をテキストに変換し、ローカルのテキスト読み上げでテキストを読み上げます。 100% プライベートのクライアント側ユーティリティ。サーバーへのアップロードはありません。"
    },
    "zh": {
      "title": "本地语音独裁者和阅读器",
      "description": "使用本机 Web 语音 API 离线听写语音到文本以及将文本叙述到语音。",
      "metaDescription": "通过实时听写将语音转换为文本，并通过本地文本转语音朗读文本。 100% 私人客户端实用程序。没有服务器上传。"
    },
    "hi": {
      "title": "देशी आवाज तानाशाह और पाठक",
      "description": "मूल वेब स्पीच एपीआई का उपयोग करके भाषण को पाठ से निर्देशित करें और पाठ से भाषण को ऑफ़लाइन सुनाएँ।",
      "metaDescription": "लाइव डिक्टेशन के साथ भाषण को टेक्स्ट में बदलें, और स्थानीय टेक्स्ट-टू-स्पीच के साथ टेक्स्ट को ज़ोर से पढ़ें। 100% निजी क्लाइंट-साइड उपयोगिता। कोई सर्वर अपलोड नहीं."
    },
    "it": {
      "title": "Dittatore e lettore vocale nativo",
      "description": "Detta la voce in testo e racconta la voce in voce offline utilizzando le API Web Speech native.",
      "metaDescription": "Converti la voce in testo con la dettatura in tempo reale e leggi il testo ad alta voce con la sintesi vocale locale. Utilità lato client privata al 100%. Nessun caricamento sul server."
    },
    "ar": {
      "title": "الدكتاتور الصوتي الأصلي والقارئ",
      "description": "قم بإملاء الكلام إلى نص وسرد النص إلى كلام دون الاتصال بالإنترنت باستخدام واجهات برمجة تطبيقات كلام الويب الأصلية.",
      "metaDescription": "قم بتحويل الكلام إلى نص باستخدام الإملاء المباشر، وقراءة النص بصوت عالٍ باستخدام ميزة تحويل النص إلى كلام محلي. فائدة خاصة من جانب العميل بنسبة 100%. لا توجد تحميلات الخادم."
    }
  },
  "markdown-converter": {
    "es": {
      "title": "Rebajas ↔ Convertidor HTML",
      "description": "Convierta el marcado Markdown a HTML y viceversa en tiempo real con vistas previas HTML enriquecidas una al lado de la otra.",
      "metaDescription": "Convierta instantáneamente Markdown a HTML y HTML a Markdown. Diseño de panel dividido con vista previa de texto enriquecido en vivo y funcionalidad de copiar al portapapeles. Gratis y privado."
    },
    "de": {
      "title": "Markdown ↔ HTML-Konverter",
      "description": "Konvertieren Sie Markdown-Markup in Echtzeit in HTML und umgekehrt mit Rich-HTML-Vorschauen nebeneinander.",
      "metaDescription": "Konvertieren Sie Markdown sofort in HTML und HTML in Markdown. Geteiltes Fensterlayout mit Live-Rich-Text-Vorschau und Funktion zum Kopieren in die Zwischenablage. Kostenlos und privat."
    },
    "fr": {
      "title": "Markdown ↔ Convertisseur HTML",
      "description": "Convertissez le balisage Markdown en HTML et vice versa en temps réel avec de riches aperçus HTML côte à côte.",
      "metaDescription": "Convertissez instantanément Markdown en HTML et HTML en Markdown. Disposition en volet divisé avec aperçu du texte enrichi en direct et fonctionnalité de copie dans le presse-papiers. Gratuit et privé."
    },
    "pt": {
      "title": "Markdown ↔ Conversor HTML",
      "description": "Converta a marcação Markdown em HTML e vice-versa em tempo real com visualizações avançadas de HTML lado a lado.",
      "metaDescription": "Converta instantaneamente Markdown em HTML e HTML em Markdown. Layout de painel dividido com visualização de rich text ao vivo e funcionalidade de cópia para área de transferência. Gratuito e privado."
    },
    "ja": {
      "title": "マークダウン ↔ HTML コンバーター",
      "description": "並べて表示されるリッチ HTML プレビューを使用して、Markdown マークアップを HTML に、またはその逆にリアルタイムに変換します。",
      "metaDescription": "Markdown を HTML に、HTML を Markdown に瞬時に変換します。 Split-pane layout with live rich text preview and copy-to-clipboard functionality.無料かつプライベート。"
    },
    "zh": {
      "title": "Markdown ↔ HTML 转换器",
      "description": "通过并排丰富的 HTML 预览，实时将 Markdown 标记转换为 HTML，反之亦然。",
      "metaDescription": "立即将 Markdown 转换为 HTML，并将 HTML 转换为 Markdown。具有实时富文本预览和复制到剪贴板功能的分割窗格布局。免费且私密。"
    },
    "hi": {
      "title": "मार्कडाउन ↔ HTML कनवर्टर",
      "description": "साथ-साथ समृद्ध HTML पूर्वावलोकन के साथ वास्तविक समय में मार्कडाउन मार्कअप को HTML और इसके विपरीत में कनवर्ट करें।",
      "metaDescription": "मार्कडाउन को तुरंत HTML में और HTML को मार्कडाउन में बदलें। लाइव रिच टेक्स्ट पूर्वावलोकन और कॉपी-टू-क्लिपबोर्ड कार्यक्षमता के साथ स्प्लिट-पेन लेआउट। मुफ़्त और निजी."
    },
    "it": {
      "title": "Markdown ↔ Convertitore HTML",
      "description": "Converti markup Markdown in HTML e viceversa in tempo reale con anteprime HTML affiancate.",
      "metaDescription": "Converti istantaneamente Markdown in HTML e HTML in Markdown. Layout a riquadro diviso con anteprima in formato rich text dal vivo e funzionalità di copia negli appunti. Gratuito e privato."
    },
    "ar": {
      "title": "تخفيض السعر ↔ محول HTML",
      "description": "قم بتحويل ترميز Markdown إلى HTML والعكس في الوقت الفعلي من خلال معاينات HTML الغنية جنبًا إلى جنب.",
      "metaDescription": "قم بتحويل Markdown على الفور إلى HTML وHTML إلى Markdown. تخطيط جزء مقسم مع معاينة نصية غنية مباشرة ووظيفة النسخ إلى الحافظة. مجانية وخاصة."
    }
  },
  "random-picker": {
    "es": {
      "title": "Mezclador de listas y selector aleatorio",
      "description": "Mezcla listas, dibuja elementos aleatorios, elige nombres o elige ganadores de rifas entre líneas personalizadas.",
      "metaDescription": "Mezcla listas aleatoriamente o elige artículos/ganadores aleatorios de tus entradas. Gratis, 100% privado y se ejecuta completamente en tu navegador. No hay cargas del servidor."
    },
    "de": {
      "title": "Listen-Shuffler und Zufallsauswahl",
      "description": "Mischen Sie Listen, ziehen Sie zufällige Gegenstände, wählen Sie Namen aus oder wählen Sie die Gewinner einer Verlosung aus benutzerdefinierten Zeilen-Feeds aus.",
      "metaDescription": "Mischen Sie die Listen nach dem Zufallsprinzip oder wählen Sie zufällige Artikel/Gewinner aus Ihren Einträgen aus. Free, 100% private, and runs entirely in your browser. Keine Server-Uploads."
    },
    "fr": {
      "title": "Mélangeur de liste et sélecteur aléatoire",
      "description": "Mélangez les listes, tirez au hasard des éléments, choisissez des noms ou choisissez les gagnants d'un tirage au sort à partir de flux de ligne personnalisés.",
      "metaDescription": "Mélangez les listes au hasard ou choisissez des éléments/gagnants au hasard parmi vos participations. Gratuit, 100% privé et fonctionne entièrement dans votre navigateur. Aucun téléchargement sur le serveur."
    },
    "pt": {
      "title": "Embaralhador de lista e selecionador aleatório",
      "description": "Embaralhe listas, sorteie itens aleatórios, escolha nomes ou escolha vencedores de sorteios em feeds de linha personalizados.",
      "metaDescription": "Embaralhe listas aleatoriamente ou escolha itens/vencedores aleatórios de suas entradas. Gratuito, 100% privado e roda inteiramente no seu navegador. Nenhum upload de servidor."
    },
    "ja": {
      "title": "リストシャッフラーとランダムピッカー",
      "description": "リストをシャッフルしたり、ランダムなアイテムを描画したり、名前を選択したり、カスタム改行から抽選の当選者を選択したりできます。",
      "metaDescription": "リストをランダムにシャッフルするか、エントリーからランダムなアイテム/勝者を選択します。無料、完全プライベート、完全にブラウザ内で実行されます。サーバーへのアップロードはありません。"
    },
    "zh": {
      "title": "列表洗牌器和随机选择器",
      "description": "随机排列列表、随机抽取项目、挑选名称或从自定义换行中选择抽奖获奖者。",
      "metaDescription": "随机排列列表或从您的条目中随机选择项目/获胜者。免费、100% 私密，并且完全在您的浏览器中运行。没有服务器上传。"
    },
    "hi": {
      "title": "सूची शफ़लर और रैंडम पिकर",
      "description": "सूचियों में फेरबदल करें, यादृच्छिक आइटम बनाएं, नाम चुनें, या कस्टम लाइन फ़ीड से रैफ़ल विजेता चुनें।",
      "metaDescription": "सूचियों को बेतरतीब ढंग से फेरबदल करें या अपनी प्रविष्टियों में से यादृच्छिक आइटम/विजेता चुनें। मुफ़्त, 100% निजी, और पूरी तरह से आपके ब्राउज़र में चलता है। कोई सर्वर अपलोड नहीं."
    },
    "it": {
      "title": "Elenco mescolatore e selettore casuale",
      "description": "Mescola elenchi, estrai oggetti casuali, scegli nomi o scegli i vincitori della lotteria da feed di riga personalizzati.",
      "metaDescription": "Mescola gli elenchi in modo casuale o scegli oggetti/vincitori casuali dalle tue voci. Gratuito, privato al 100% e funziona interamente nel tuo browser. Nessun caricamento sul server."
    },
    "ar": {
      "title": "قائمة المتثاقل ومنتقي عشوائي",
      "description": "قم بتبديل القوائم أو رسم عناصر عشوائية أو اختيار الأسماء أو اختيار الفائزين بالسحب من خلاصات الخطوط المخصصة.",
      "metaDescription": "قم بتبديل القوائم بشكل عشوائي أو اختر عناصر/فائزين عشوائيين من إدخالاتك. مجاني، وخاص بنسبة 100%، ويعمل بالكامل في متصفحك. لا توجد تحميلات الخادم."
    }
  },
  "json-formatter": {
    "es": {
      "title": "Formateador JSON",
      "description": "Valide, embellezca y minimice datos JSON con el explorador de estructuras de árbol en tiempo real.",
      "metaDescription": "Valide, formatee y explore datos JSON visualmente: gratis, instantáneo y 100% privado. Vista de árbol, resaltado de sintaxis y detección de errores en vivo. No hay cargas del servidor."
    },
    "de": {
      "title": "JSON-Formatierer",
      "description": "Validieren, verschönern und minimieren Sie JSON-Daten mit dem Echtzeit-Baumstruktur-Explorer.",
      "metaDescription": "Validieren, formatieren und untersuchen Sie JSON-Daten visuell – kostenlos, sofort und 100 % privat. Baumansicht, Syntaxhervorhebung und Live-Fehlererkennung. Keine Server-Uploads."
    },
    "fr": {
      "title": "Formateur JSON",
      "description": "Validez, embellissez et réduisez les données JSON avec l'explorateur de structure arborescente en temps réel.",
      "metaDescription": "Validez, formatez et explorez visuellement les données JSON — gratuitement, instantanément et 100 % privées. Vue arborescente, coloration syntaxique et détection d'erreurs en direct. Aucun téléchargement sur le serveur."
    },
    "pt": {
      "title": "Formatador JSON",
      "description": "Valide, embeleze e reduza dados JSON com o explorador de estrutura de árvore em tempo real.",
      "metaDescription": "Valide, formate e explore dados JSON visualmente — gratuito, instantâneo e 100% privado. Visualização em árvore, destaque de sintaxe e detecção de erros ao vivo. Nenhum upload de servidor."
    },
    "ja": {
      "title": "JSON フォーマッタ",
      "description": "リアルタイム ツリー構造エクスプローラーを使用して、JSON データを検証、整形、縮小します。",
      "metaDescription": "JSON データを視覚的に検証、フォーマット、探索できます。無料、即時、完全にプライベートです。ツリー ビュー、構文の強調表示、ライブ エラー検出。サーバーへのアップロードはありません。"
    },
    "zh": {
      "title": "JSON 格式化程序",
      "description": "使用实时树结构浏览器验证、美化和缩小 JSON 数据。",
      "metaDescription": "直观地验证、格式化和探索 JSON 数据 — 免费、即时且 100% 私密。树视图、语法突出显示和实时错误检测。没有服务器上传。"
    },
    "hi": {
      "title": "JSON फ़ॉर्मेटर",
      "description": "रीयल-टाइम ट्री स्ट्रक्चर एक्सप्लोरर के साथ JSON डेटा को सत्यापित, सुशोभित और छोटा करें।",
      "metaDescription": "JSON डेटा को दृश्य रूप से सत्यापित, प्रारूपित और एक्सप्लोर करें - निःशुल्क, त्वरित और 100% निजी। ट्री व्यू, सिंटैक्स हाइलाइटिंग और लाइव एरर डिटेक्शन। कोई सर्वर अपलोड नहीं."
    },
    "it": {
      "title": "Formattatore JSON",
      "description": "Convalida, abbellisci e minimizza i dati JSON con l'esploratore della struttura ad albero in tempo reale.",
      "metaDescription": "Convalida, formatta ed esplora visivamente i dati JSON: gratuitamente, istantaneamente e privati ​​al 100%. Visualizzazione ad albero, evidenziazione della sintassi e rilevamento degli errori in tempo reale. Nessun caricamento sul server."
    },
    "ar": {
      "title": "تنسيق JSON",
      "description": "التحقق من صحة بيانات JSON وتجميلها وتقليلها باستخدام مستكشف بنية الشجرة في الوقت الفعلي.",
      "metaDescription": "يمكنك التحقق من صحة بيانات JSON وتنسيقها واستكشافها بشكل مرئي - مجانًا وفوريًا وخاصة بنسبة 100%. عرض الشجرة، وتسليط الضوء على بناء الجملة، والكشف المباشر عن الأخطاء. لا توجد تحميلات الخادم."
    }
  },
  "diff-checker": {
    "es": {
      "title": "Comprobador de diferencias lado a lado",
      "description": "Compare dos bloques de texto o archivos de código uno al lado del otro o en línea para resaltar adiciones, eliminaciones y modificaciones de caracteres.",
      "metaDescription": "Compare dos archivos de texto uno al lado del otro o en línea para resaltar adiciones, eliminaciones y modificaciones de caracteres en tiempo real. 100% privado y del lado del cliente."
    },
    "de": {
      "title": "Side-by-Side-Diff-Checker",
      "description": "Vergleichen Sie zwei Textblöcke oder Codedateien nebeneinander oder inline, um Hinzufügungen, Löschungen und Zeichenänderungen hervorzuheben.",
      "metaDescription": "Vergleichen Sie zwei Textdateien nebeneinander oder inline, um Hinzufügungen, Löschungen und Zeichenänderungen in Echtzeit hervorzuheben. 100 % privat und kundenseitig."
    },
    "fr": {
      "title": "Vérificateur de différentiel côte à côte",
      "description": "Comparez deux blocs de texte ou fichiers de code côte à côte ou en ligne pour mettre en évidence les ajouts, les suppressions et les modifications de caractères.",
      "metaDescription": "Comparez deux fichiers texte côte à côte ou en ligne pour mettre en évidence les ajouts, suppressions et modifications de caractères en temps réel. 100% privé et côté client."
    },
    "pt": {
      "title": "Verificador de diferenças lado a lado",
      "description": "Compare dois blocos de texto ou arquivos de código lado a lado ou embutidos para destacar adições, exclusões e modificações de caracteres.",
      "metaDescription": "Compare dois arquivos de texto lado a lado ou embutidos para destacar adições, exclusões e modificações de caracteres em tempo real. 100% privado e do lado do cliente."
    },
    "ja": {
      "title": "サイドバイサイド差分チェッカー",
      "description": "2 つのテキスト ブロックまたはコード ファイルを並べて、またはインラインで比較して、追加、削除、文字の変更を強調表示します。",
      "metaDescription": "2 つのテキスト ファイルを並べて比較またはインラインで比較し、追加、削除、文字の変更をリアルタイムで強調表示します。 100% プライベートでクライアント側です。"
    },
    "zh": {
      "title": "并排差异检查器",
      "description": "并排或内联比较两个文本块或代码文件，以突出显示添加、删除和字符修改。",
      "metaDescription": "并排或内联比较两个文本文件，以实时突出显示添加、删除和字符修改。 100% 私有和客户端。"
    },
    "hi": {
      "title": "साइड-बाय-साइड डिफ चेकर",
      "description": "परिवर्धन, विलोपन और वर्ण संशोधनों को उजागर करने के लिए दो टेक्स्ट ब्लॉक या कोड फ़ाइलों की अगल-बगल या इनलाइन तुलना करें।",
      "metaDescription": "वास्तविक समय में परिवर्धन, विलोपन और वर्ण संशोधनों को उजागर करने के लिए दो पाठ फ़ाइलों की अगल-बगल या इनलाइन तुलना करें। 100% निजी और ग्राहक-पक्ष।"
    },
    "it": {
      "title": "Controllo delle differenze affiancate",
      "description": "Confronta due blocchi di testo o file di codice affiancati o in linea per evidenziare aggiunte, eliminazioni e modifiche ai caratteri.",
      "metaDescription": "Confronta due file di testo affiancati o in linea per evidenziare aggiunte, eliminazioni e modifiche ai caratteri in tempo reale. 100% privato e lato cliente."
    },
    "ar": {
      "title": "مدقق الفرق جنبًا إلى جنب",
      "description": "قارن بين كتلتين نصيتين أو ملفات تعليمات برمجية جنبًا إلى جنب أو مضمنة لتسليط الضوء على الإضافات والحذف وتعديلات الأحرف.",
      "metaDescription": "قارن بين ملفين نصيين جنبًا إلى جنب أو مضمنين لتسليط الضوء على الإضافات والحذف وتعديلات الأحرف في الوقت الفعلي. 100% خاص ومن جانب العميل."
    }
  },
  "jwt-debugger": {
    "es": {
      "title": "Depurador y decodificador JWT",
      "description": "Decodifica el encabezado, la carga útil y las firmas de JSON Web Tokens (JWT) en el lado del cliente, con validación de notificaciones.",
      "metaDescription": "Decodifica, analiza y valida tokens web JSON (JWT) localmente. Revise algoritmos, reclamos de carga útil y detalles de vencimiento con 100 % de privacidad del lado del cliente."
    },
    "de": {
      "title": "JWT-Debugger und Decoder",
      "description": "Dekodieren Sie den Header, die Nutzlast und die Signaturen von JSON Web Tokens (JWT) clientseitig mit Anspruchsvalidierung.",
      "metaDescription": "Dekodieren, analysieren und validieren Sie JSON Web Tokens (JWT) lokal. Überprüfen Sie Algorithmen, Nutzlastansprüche und Ablaufdetails mit 100 % clientseitigem Datenschutz."
    },
    "fr": {
      "title": "Débogueur et décodeur JWT",
      "description": "Décodez l’en-tête, la charge utile et les signatures des jetons Web JSON (JWT) côté client, avec validation des revendications.",
      "metaDescription": "Décodez, analysez et validez les jetons Web JSON (JWT) localement. Examinez les algorithmes, les réclamations de charge utile et les détails d'expiration avec une confidentialité à 100 % côté client."
    },
    "pt": {
      "title": "Depurador e decodificador JWT",
      "description": "Decodifique cabeçalho, carga útil e assinaturas JSON Web Tokens (JWT) no lado do cliente, com validação de declarações.",
      "metaDescription": "Decodifique, analise e valide JSON Web Tokens (JWT) localmente. Revise algoritmos, declarações de carga útil e detalhes de expiração com 100% de privacidade do lado do cliente."
    },
    "ja": {
      "title": "JWT デバッガーおよびデコーダー",
      "description": "クレーム検証を使用して、クライアント側で JSON Web Token (JWT) ヘッダー、ペイロード、署名をデコードします。",
      "metaDescription": "JSON Web Token (JWT) をローカルでデコード、解析、検証します。クライアント側のプライバシーを 100% 保護しながら、アルゴリズム、ペイロード要求、有効期限の詳細を確認します。"
    },
    "zh": {
      "title": "JWT 调试器和解码器",
      "description": "在客户端解码 JSON Web 令牌 (JWT) 标头、负载和签名，并进行声明验证。",
      "metaDescription": "在本地解码、解析和验证 JSON Web 令牌 (JWT)。以 100% 客户端隐私审查算法、有效负载声明和过期详细信息。"
    },
    "hi": {
      "title": "जेडब्ल्यूटी डिबगर और डिकोडर",
      "description": "दावों के सत्यापन के साथ JSON वेब टोकन (JWT) हेडर, पेलोड और हस्ताक्षर क्लाइंट-साइड को डिकोड करें।",
      "metaDescription": "JSON वेब टोकन (JWT) को स्थानीय रूप से डिकोड, पार्स और मान्य करें। 100% क्लाइंट-साइड गोपनीयता के साथ एल्गोरिदम, पेलोड दावों और समाप्ति विवरण की समीक्षा करें।"
    },
    "it": {
      "title": "Debugger e decodificatore JWT",
      "description": "Decodifica intestazione, payload e firme JSON Web Tokens (JWT) lato client, con convalida delle attestazioni.",
      "metaDescription": "Decodifica, analizza e convalida localmente i token Web JSON (JWT). Esamina algoritmi, richieste di payload e dettagli sulla scadenza con il 100% di privacy lato client."
    },
    "ar": {
      "title": "JWT مصحح الأخطاء ووحدة فك الترميز",
      "description": "قم بفك تشفير رأس JSON Web Tokens (JWT) والحمولة والتوقيعات من جانب العميل، مع التحقق من صحة المطالبات.",
      "metaDescription": "قم بفك تشفير JSON Web Tokens (JWT) وتحليلها والتحقق من صحتها محليًا. قم بمراجعة الخوارزميات ومطالبات الحمولة وتفاصيل انتهاء الصلاحية مع خصوصية 100% من جانب العميل."
    }
  },
  "regex-tester": {
    "es": {
      "title": "Probador interactivo de expresiones regulares",
      "description": "Pruebe expresiones regulares, resalte coincidencias e inspeccione grupos de captura.",
      "metaDescription": "Pruebe y depure expresiones regulares localmente, de forma gratuita y privada. Resalte coincidencias de sintaxis en tiempo real, capture grupos y consulte hojas de referencia. No hay cargas del servidor."
    },
    "de": {
      "title": "Interaktiver Regex-Tester",
      "description": "Testen Sie reguläre Ausdrücke, markieren Sie Übereinstimmungen und überprüfen Sie Erfassungsgruppen.",
      "metaDescription": "Testen und debuggen Sie reguläre Ausdrücke lokal – kostenlos und privat. Syntaxhervorhebungsübereinstimmungen in Echtzeit, Erfassung von Gruppen und Überprüfung von Spickzetteln. Keine Server-Uploads."
    },
    "fr": {
      "title": "Testeur d'expressions régulières interactif",
      "description": "Testez les expressions régulières, mettez en surbrillance les correspondances et inspectez les groupes de capture.",
      "metaDescription": "Testez et déboguez les expressions régulières localement – ​​gratuitement et privé. La syntaxe en temps réel met en évidence les correspondances, capture des groupes et vérifie les aide-mémoire. Aucun téléchargement sur le serveur."
    },
    "pt": {
      "title": "Testador Regex interativo",
      "description": "Teste expressões regulares, destaque correspondências e inspecione grupos de captura.",
      "metaDescription": "Teste e depure expressões regulares localmente — gratuitamente e de forma privada. A sintaxe em tempo real destaca correspondências, captura grupos e verifica folhas de dicas. Nenhum upload de servidor."
    },
    "ja": {
      "title": "インタラクティブな正規表現テスター",
      "description": "正規表現をテストし、一致を強調表示し、キャプチャ グループを検査します。",
      "metaDescription": "正規表現をローカルでテストおよびデバッグします。無料かつ非公開です。リアルタイムの構文ハイライト一致、グループのキャプチャ、およびチートシートのチェック。サーバーへのアップロードはありません。"
    },
    "zh": {
      "title": "交互式正则表达式测试器",
      "description": "测试正则表达式、突出显示匹配项并检查捕获组。",
      "metaDescription": "在本地测试和调试正则表达式 - 免费且私密。实时语法突出显示匹配、捕获组并检查备忘单。没有服务器上传。"
    },
    "hi": {
      "title": "इंटरएक्टिव रेगेक्स परीक्षक",
      "description": "नियमित अभिव्यक्तियों का परीक्षण करें, मिलानों को हाइलाइट करें और कैप्चरिंग समूहों का निरीक्षण करें।",
      "metaDescription": "स्थानीय रूप से नियमित अभिव्यक्तियों का परीक्षण और डिबग करें - मुफ़्त और निजी। रीयल-टाइम सिंटैक्स मैचों को हाइलाइट करें, समूहों को कैप्चर करें और चीट शीट की जांच करें। कोई सर्वर अपलोड नहीं."
    },
    "it": {
      "title": "Tester regex interattivo",
      "description": "Testa le espressioni regolari, evidenzia le corrispondenze e controlla i gruppi di acquisizione.",
      "metaDescription": "Testa ed esegui il debug delle espressioni regolari localmente: in modo gratuito e privato. La sintassi in tempo reale evidenzia le corrispondenze, acquisisce i gruppi e controlla i foglietti illustrativi. Nessun caricamento sul server."
    },
    "ar": {
      "title": "اختبار Regex التفاعلي",
      "description": "اختبار التعبيرات العادية، وتمييز التطابقات، وفحص مجموعات الالتقاط.",
      "metaDescription": "اختبار التعبيرات العادية وتصحيح أخطائها محليًا - مجانًا وخاصة. يقوم بناء الجملة في الوقت الفعلي بتمييز المطابقات والتقاط المجموعات والتحقق من أوراق الغش. لا توجد تحميلات الخادم."
    }
  },
  "sql-formatter": {
    "es": {
      "title": "Formateador y embellecedor de SQL",
      "description": "Formatee, embellezca y capitalice las declaraciones de dialecto SQL en el lado del cliente.",
      "metaDescription": "Embellezca y formatee declaraciones SQL al instante, de forma gratuita y privada. Utilice mayúsculas en las palabras clave SQL, dé formato a las cláusulas y limpie la sangría. No hay cargas del servidor."
    },
    "de": {
      "title": "SQL-Formatierer und Verschönerer",
      "description": "Formatieren, verschönern und schreiben Sie SQL-Dialektanweisungen clientseitig groß.",
      "metaDescription": "Verschönern und formatieren Sie SQL-Anweisungen sofort – kostenlos und privat. Großschreiben Sie SQL-Schlüsselwörter, Formatierungsklauseln und saubere Einrückungen. Keine Server-Uploads."
    },
    "fr": {
      "title": "Formateur et embellisseur SQL",
      "description": "Formatez, embellissez et capitalisez les instructions de dialecte SQL côté client.",
      "metaDescription": "Embellissez et formatez instantanément les instructions SQL, gratuitement et en privé. Mettez en majuscules les mots-clés SQL, les clauses de format et une indentation propre. Aucun téléchargement sur le serveur."
    },
    "pt": {
      "title": "Formatador e embelezador SQL",
      "description": "Formate, embeleze e coloque instruções de dialeto SQL em letras maiúsculas no lado do cliente.",
      "metaDescription": "Embeleze e formate instruções SQL instantaneamente — de forma gratuita e privada. Coloque palavras-chave SQL em maiúscula, cláusulas de formato e recuo limpo. Nenhum upload de servidor."
    },
    "ja": {
      "title": "SQL フォーマッタとビューティファイア",
      "description": "クライアント側で SQL 方言ステートメントをフォーマット、整形、大文字化します。",
      "metaDescription": "SQL ステートメントを即座に美しくし、フォーマットします。無料かつ非公開です。 SQL キーワードを大文字にし、句をフォーマットし、インデントをきれいにします。サーバーへのアップロードはありません。"
    },
    "zh": {
      "title": "SQL 格式化器和美化器",
      "description": "客户端 SQL 方言语句的格式、美化和大写。",
      "metaDescription": "立即美化和格式化 SQL 语句 - 免费且私密。 SQL 关键字、格式子句和干净的缩进大写。没有服务器上传。"
    },
    "hi": {
      "title": "एसक्यूएल फ़ॉर्मेटर और ब्यूटीफायर",
      "description": "SQL बोली कथन क्लाइंट-साइड को प्रारूपित करें, सुशोभित करें और बड़े अक्षरों में लिखें।",
      "metaDescription": "SQL कथनों को तुरंत सुशोभित और प्रारूपित करें - मुफ़्त और निजी। SQL कीवर्ड को बड़े अक्षरों में लिखें, क्लॉज़ को फ़ॉर्मेट करें और इंडेंटेशन साफ़ करें। कोई सर्वर अपलोड नहीं."
    },
    "it": {
      "title": "Formattatore e abbellitore SQL",
      "description": "Formatta, abbellisci e metti in maiuscolo le istruzioni del dialetto SQL lato client.",
      "metaDescription": "Abbellisci e formatta istantaneamente le istruzioni SQL: in modo gratuito e privato. Utilizza parole chiave SQL in maiuscolo, clausole di formato e rientro pulito. Nessun caricamento sul server."
    },
    "ar": {
      "title": "منسق SQL والتجميل",
      "description": "تنسيق وتجميل وتكبير عبارات لهجة SQL من جانب العميل.",
      "metaDescription": "قم بتجميل وتنسيق عبارات SQL على الفور - مجانًا وخاصة. استخدم الحروف الكبيرة لكلمات SQL الأساسية وجمل التنسيق والمسافات البادئة النظيفة. لا توجد تحميلات الخادم."
    }
  },
  "base64-encoder": {
    "es": {
      "title": "Modelador de cifrado Base64",
      "description": "Codifique texto o archivos en Base64 y decodifique Base64 a un formato legible al instante.",
      "metaDescription": "Codifique y decodifique Base64 al instante, de forma gratuita y privada. Convierta texto o archivos hacia y desde Base64 directamente en su navegador. No hay cargas del servidor."
    },
    "de": {
      "title": "Base64-Verschlüsselungsmodellierer",
      "description": "Kodieren Sie Texte oder Dateien in Base64 und dekodieren Sie Base64 sofort wieder in ein lesbares Format.",
      "metaDescription": "Kodieren und dekodieren Sie Base64 sofort – kostenlos und privat. Konvertieren Sie Texte oder Dateien direkt in Ihrem Browser in und aus Base64. Keine Server-Uploads."
    },
    "fr": {
      "title": "Modélisateur de chiffrement Base64",
      "description": "Encodez du texte ou des fichiers en Base64 et décodez instantanément Base64 dans un format lisible.",
      "metaDescription": "Encodez et décodez instantanément Base64, gratuitement et en privé. Convertissez du texte ou des fichiers vers et depuis Base64 directement dans votre navigateur. Aucun téléchargement sur le serveur."
    },
    "pt": {
      "title": "Modelador de criptografia Base64",
      "description": "Codifique texto ou arquivos em Base64 e decodifique Base64 de volta para um formato legível instantaneamente.",
      "metaDescription": "Codifique e decodifique Base64 instantaneamente – gratuito e privado. Converta texto ou arquivos de e para Base64 diretamente no seu navegador. Nenhum upload de servidor."
    },
    "ja": {
      "title": "Base64暗号モデラー",
      "description": "テキストまたはファイルを Base64 にエンコードし、Base64 を即座に読み取り可能な形式にデコードします。",
      "metaDescription": "Base64 を即座にエンコードおよびデコードします。無料かつプライベートです。ブラウザ内でテキストやファイルを Base64 との間で直接変換します。サーバーへのアップロードはありません。"
    },
    "zh": {
      "title": "Base64 密码建模器",
      "description": "将文本或文件编码为 Base64 并立即将 Base64 解码回可读格式。",
      "metaDescription": "立即编码和解码 Base64 — 免费且私密。直接在浏览器中将文本或文件与 Base64 相互转换。没有服务器上传。"
    },
    "hi": {
      "title": "बेस64 सिफर मॉडलर",
      "description": "टेक्स्ट या फ़ाइलों को बेस64 में एनकोड करें और बेस64 को तुरंत पढ़ने योग्य प्रारूप में डीकोड करें।",
      "metaDescription": "बेस64 को तुरंत एनकोड और डीकोड करें - मुफ़्त और निजी। टेक्स्ट या फ़ाइलों को सीधे अपने ब्राउज़र में Base64 में कनवर्ट करें। कोई सर्वर अपलोड नहीं."
    },
    "it": {
      "title": "Modellatore cifrario Base64",
      "description": "Codifica testo o file in Base64 e decodifica nuovamente Base64 in formato leggibile all'istante.",
      "metaDescription": "Codifica e decodifica Base64 istantaneamente: gratuito e privato. Converti testo o file da e verso Base64 direttamente nel tuo browser. Nessun caricamento sul server."
    },
    "ar": {
      "title": "مصمم نماذج التشفير Base64",
      "description": "قم بتشفير النص أو الملفات إلى Base64 وفك تشفير Base64 مرة أخرى إلى التنسيق القابل للقراءة على الفور.",
      "metaDescription": "قم بتشفير وفك تشفير Base64 على الفور - مجانًا وخاص. قم بتحويل النص أو الملفات من وإلى Base64 مباشرة في متصفحك. لا توجد تحميلات الخادم."
    }
  },
  "url-encoder": {
    "es": {
      "title": "Codificador/decodificador de URL y cuadrícula de parámetros",
      "description": "Codifique o decodifique cadenas porcentualmente y edite parámetros de consulta de forma interactiva en un diseño de cuadrícula tabular.",
      "metaDescription": "Codifica y decodifica URL al instante. Analice los parámetros de consulta de URL en una cuadrícula tabular editable para agregar, eliminar o modificar claves y volver a ensamblarlas. 100% del lado del cliente."
    },
    "de": {
      "title": "URL-Encoder/Decoder und Parameterraster",
      "description": "Kodieren oder dekodieren Sie Zeichenfolgen prozentual und bearbeiten Sie Abfrageparameter interaktiv in einem tabellarischen Rasterlayout.",
      "metaDescription": "Kodieren und dekodieren Sie URLs sofort. Analysieren Sie URL-Abfrageparameter in einem bearbeitbaren Tabellenraster, um Schlüssel hinzuzufügen, zu löschen oder zu ändern und sie wieder zusammenzusetzen. 100 % kundenseitig."
    },
    "fr": {
      "title": "Encodeur/décodeur d'URL et grille de paramètres",
      "description": "Encodez ou décodez des chaînes en pourcentage et modifiez les paramètres de requête de manière interactive dans une disposition en grille tabulaire.",
      "metaDescription": "Encodez et décodez les URL instantanément. Analysez les paramètres de requête d'URL dans une grille tabulaire modifiable pour ajouter, supprimer ou modifier des clés et les réassembler. 100% côté client."
    },
    "pt": {
      "title": "Codificador/decodificador de URL e grade de parâmetros",
      "description": "Codifique ou decodifique strings por cento e edite parâmetros de consulta interativamente em um layout de grade tabular.",
      "metaDescription": "Codifique e decodifique URLs instantaneamente. Analise parâmetros de consulta de URL em uma grade tabular editável para adicionar, excluir ou modificar chaves e remontá-las. 100% do lado do cliente."
    },
    "ja": {
      "title": "URL エンコーダ/デコーダおよびパラメータ グリッド",
      "description": "表形式のグリッド レイアウトで文字列をパーセント エンコードまたはデコードし、クエリ パラメーターを対話的に編集します。",
      "metaDescription": "URL を瞬時にエンコードおよびデコードします。 URL クエリ パラメーターを編集可能な表形式のグリッドに解析して、キーを追加、削除、または変更し、それらを再構築します。 100% クライアント側。"
    },
    "zh": {
      "title": "URL 编码器/解码器和参数网格",
      "description": "在表格网格布局中以交互方式对字符串进行百分比编码或解码并编辑查询参数。",
      "metaDescription": "立即对 URL 进行编码和解码。将 URL 查询参数解析为可编辑的表格网格，以添加、删除或修改键并重新组合它们。 100% 客户端。"
    },
    "hi": {
      "title": "यूआरएल एनकोडर/डिकोडर और पैरामीटर ग्रिड",
      "description": "प्रतिशत-एन्कोड या डीकोड स्ट्रिंग्स और एक सारणीबद्ध ग्रिड लेआउट में इंटरैक्टिव रूप से क्वेरी पैरामीटर संपादित करें।",
      "metaDescription": "यूआरएल को तुरंत एनकोड और डीकोड करें। कुंजियाँ जोड़ने, हटाने या संशोधित करने और उन्हें पुन: संयोजित करने के लिए संपादन योग्य सारणीबद्ध ग्रिड में URL क्वेरी पैरामीटर को पार्स करें। 100% ग्राहक-पक्ष।"
    },
    "it": {
      "title": "Codificatore/decodificatore URL e griglia dei parametri",
      "description": "Codifica o decodifica in percentuale le stringhe e modifica i parametri di query in modo interattivo in un layout a griglia tabellare.",
      "metaDescription": "Codifica e decodifica gli URL istantaneamente. Analizza i parametri di query dell'URL in una griglia tabellare modificabile per aggiungere, eliminare o modificare le chiavi e riassemblarle. 100% lato client."
    },
    "ar": {
      "title": "أداة تشفير/فك ترميز URL وشبكة المعلمات",
      "description": "تشفير النسبة المئوية أو فك تشفير السلاسل وتحرير معلمات الاستعلام بشكل تفاعلي في تخطيط شبكة جدولي.",
      "metaDescription": "تشفير وفك تشفير عناوين URL على الفور. قم بتحليل معلمات استعلام URL في شبكة جدولية قابلة للتحرير لإضافة المفاتيح أو حذفها أو تعديلها وإعادة تجميعها. 100% من جانب العميل."
    }
  },
  "file-hasher": {
    "es": {
      "title": "Hasher de archivos del lado del cliente",
      "description": "Calcule resúmenes de suma de comprobación criptográfica MD5, SHA-1, SHA-256 y SHA-512.",
      "metaDescription": "Genere hashes de suma de comprobación de archivos criptográficos localmente, de forma gratuita y privada. Admite MD5, SHA-1, SHA-256 y SHA-512. No hay cargas del servidor."
    },
    "de": {
      "title": "Clientseitiger Datei-Hasher",
      "description": "Berechnen Sie kryptografische MD5-, SHA-1-, SHA-256- und SHA-512-Prüfsummen-Digests.",
      "metaDescription": "Generieren Sie Prüfsummen-Hashes für kryptografische Dateien lokal – kostenlos und privat. Unterstützt MD5, SHA-1, SHA-256 und SHA-512. Keine Server-Uploads."
    },
    "fr": {
      "title": "Hachage de fichiers côté client",
      "description": "Calculez les résumés de somme de contrôle cryptographique MD5, SHA-1, SHA-256 et SHA-512.",
      "metaDescription": "Générez localement des hachages de somme de contrôle de fichiers cryptographiques – gratuits et privés. Prend en charge MD5, SHA-1, SHA-256 et SHA-512. Aucun téléchargement sur le serveur."
    },
    "pt": {
      "title": "Hasher de arquivo do lado do cliente",
      "description": "Calcule resumos de soma de verificação criptográfica MD5, SHA-1, SHA-256 e SHA-512.",
      "metaDescription": "Gere hashes de soma de verificação de arquivos criptográficos localmente – gratuito e privado. Suporta MD5, SHA-1, SHA-256 e SHA-512. Nenhum upload de servidor."
    },
    "ja": {
      "title": "クライアント側ファイルハッシャー",
      "description": "MD5、SHA-1、SHA-256、および SHA-512 暗号化チェックサム ダイジェストを計算します。",
      "metaDescription": "暗号化ファイルのチェックサム ハッシュをローカルで生成します — 無料かつ非公開です。 MD5、SHA-1、SHA-256、および SHA-512 をサポートします。サーバーへのアップロードはありません。"
    },
    "zh": {
      "title": "客户端文件哈希器",
      "description": "计算 MD5、SHA-1、SHA-256 和 SHA-512 加密校验和摘要。",
      "metaDescription": "在本地生成加密文件校验和哈希值 - 免费且私密。支持 MD5、SHA-1、SHA-256 和 SHA-512。没有服务器上传。"
    },
    "hi": {
      "title": "क्लाइंट-साइड फ़ाइल हैशर",
      "description": "MD5, SHA-1, SHA-256, और SHA-512 क्रिप्टोग्राफ़िक चेकसम डाइजेस्ट की गणना करें।",
      "metaDescription": "क्रिप्टोग्राफ़िक फ़ाइल चेकसम हैश स्थानीय रूप से उत्पन्न करें - मुफ़्त और निजी। MD5, SHA-1, SHA-256 और SHA-512 को सपोर्ट करता है। कोई सर्वर अपलोड नहीं."
    },
    "it": {
      "title": "Hasher di file lato client",
      "description": "Calcola i digest di checksum crittografici MD5, SHA-1, SHA-256 e SHA-512.",
      "metaDescription": "Genera hash di checksum dei file crittografici localmente: in modo gratuito e privato. Supporta MD5, SHA-1, SHA-256 e SHA-512. Nessun caricamento sul server."
    },
    "ar": {
      "title": "أداة تجزئة الملفات من جانب العميل",
      "description": "احسب ملخصات المجموع الاختباري للتشفير MD5 وSHA-1 وSHA-256 وSHA-512.",
      "metaDescription": "قم بإنشاء تجزئات المجموع الاختباري لملف التشفير محليًا - مجانًا وخاصة. يدعم MD5، SHA-1، SHA-256، وSHA-512. لا توجد تحميلات الخادم."
    }
  },
  "password-generator": {
    "es": {
      "title": "Medidor y generador de seguridad de contraseña",
      "description": "Genere contraseñas aleatorias seguras y calcule la fuerza de la entropía criptográfica.",
      "metaDescription": "Cree contraseñas sólidas y seguras y calcule calificaciones de entropía en el lado del cliente, de forma gratuita y privada. Restricciones personalizables. No hay cargas del servidor."
    },
    "de": {
      "title": "Messgerät und Generator für die Passwortstärke",
      "description": "Generieren Sie sichere Zufallskennwörter und berechnen Sie die kryptografische Entropiestärke.",
      "metaDescription": "Erstellen Sie starke, sichere Passwörter und berechnen Sie clientseitig Entropiebewertungen – kostenlos und privat. Anpassbare Einschränkungen. Keine Server-Uploads."
    },
    "fr": {
      "title": "Compteur et générateur de force de mot de passe",
      "description": "Générez des mots de passe aléatoires sécurisés et calculez la force d'entropie cryptographique.",
      "metaDescription": "Créez des mots de passe forts et sécurisés et calculez les notes d’entropie côté client – ​​gratuitement et en privé. Contraintes personnalisables. Aucun téléchargement sur le serveur."
    },
    "pt": {
      "title": "Medidor e gerador de força de senha",
      "description": "Gere senhas aleatórias seguras e calcule a força da entropia criptográfica.",
      "metaDescription": "Crie senhas fortes e seguras e calcule classificações de entropia do lado do cliente — de forma gratuita e privada. Restrições personalizáveis. Nenhum upload de servidor."
    },
    "ja": {
      "title": "パスワード強度メーターとジェネレーター",
      "description": "安全なランダムパスワードを生成し、暗号エントロピー強度を計算します。",
      "metaDescription": "強力で安全なパスワードを作成し、クライアント側でエントロピー評価を無料かつ非公開で計算します。カスタマイズ可能な制約。サーバーへのアップロードはありません。"
    },
    "zh": {
      "title": "密码强度计和生成器",
      "description": "生成安全的随机密码并计算加密熵强度。",
      "metaDescription": "创建强大、安全的密码并在客户端计算熵评级 - 免费且私密。可定制的约束。没有服务器上传。"
    },
    "hi": {
      "title": "पासवर्ड स्ट्रेंथ मीटर और जेनरेटर",
      "description": "सुरक्षित यादृच्छिक पासवर्ड बनाएं और क्रिप्टोग्राफ़िक एन्ट्रॉपी ताकत की गणना करें।",
      "metaDescription": "मजबूत, सुरक्षित पासवर्ड बनाएं और एन्ट्रॉपी रेटिंग क्लाइंट-साइड की गणना करें - मुफ़्त और निजी। अनुकूलन योग्य बाधाएँ। कोई सर्वर अपलोड नहीं."
    },
    "it": {
      "title": "Misuratore e generatore di forza della password",
      "description": "Genera password casuali sicure e calcola la forza dell'entropia crittografica.",
      "metaDescription": "Crea password complesse e sicure e calcola i livelli di entropia lato client: in modo gratuito e privato. Vincoli personalizzabili. Nessun caricamento sul server."
    },
    "ar": {
      "title": "مقياس قوة كلمة المرور والمولد",
      "description": "قم بإنشاء كلمات مرور عشوائية آمنة وحساب قوة إنتروبيا التشفير.",
      "metaDescription": "أنشئ كلمات مرور قوية وآمنة واحسب تقييمات الإنتروبيا من جانب العميل - مجانًا وخاصة. قيود قابلة للتخصيص. لا توجد تحميلات الخادم."
    }
  },
  "css-box-shadow": {
    "es": {
      "title": "Generador de sombras de cuadros CSS",
      "description": "Genere y personalice sombras de cuadros CSS con vista previa en vivo, opciones de inserción y fragmentos de código de copiar y pegar.",
      "metaDescription": "Genere sombras de cuadros CSS visualmente con vista previa en tiempo real, modo de inserción, capas de múltiples sombras y compatibilidad con copia instantánea. 100% privado."
    },
    "de": {
      "title": "CSS-Box-Schattengenerator",
      "description": "Erstellen und passen Sie CSS-Boxschatten mit Live-Vorschau, Einfügungsoptionen und Code-Snippets zum Kopieren und Einfügen an.",
      "metaDescription": "Erzeugen Sie CSS-Boxschatten visuell mit Echtzeitvorschau, Inset-Modus, Multi-Shadow-Layering und Unterstützung für sofortiges Kopieren. 100 % privat."
    },
    "fr": {
      "title": "Générateur d'ombre de boîte CSS",
      "description": "Générez et personnalisez des ombres de boîte CSS avec un aperçu en direct, des options d'encart et des extraits de code copiés-collés.",
      "metaDescription": "Générez visuellement des ombres de boîte CSS avec un aperçu en temps réel, un mode encart, une superposition d'ombres multiples et une prise en charge de la copie instantanée. 100% privé."
    },
    "pt": {
      "title": "Gerador de sombra de caixa CSS",
      "description": "Gere e personalize sombras de caixa CSS com visualização ao vivo, opções de inserção e trechos de código de copiar e colar.",
      "metaDescription": "Gere sombras de caixa CSS visualmente com visualização em tempo real, modo de inserção, camadas de múltiplas sombras e suporte para cópia instantânea. 100% privado."
    },
    "ja": {
      "title": "CSS ボックス シャドウ ジェネレーター",
      "description": "ライブ プレビュー、挿入オプション、コード スニペットのコピー＆ペーストを使用して、CSS ボックスのシャドウを生成およびカスタマイズします。",
      "metaDescription": "リアルタイム プレビュー、インセット モード、マルチシャドウ レイヤリング、インスタント コピーのサポートにより、CSS ボックスのシャドウを視覚的に生成します。 100%プライベートです。"
    },
    "zh": {
      "title": "CSS 盒子阴影生成器",
      "description": "使用实时预览、插入选项和复制粘贴代码片段生成和自定义 CSS 框阴影。",
      "metaDescription": "通过实时预览、插图模式、多重阴影分层和即时复制支持，直观地生成 CSS 框阴影。 100% 私人。"
    },
    "hi": {
      "title": "सीएसएस बॉक्स छाया जनरेटर",
      "description": "लाइव पूर्वावलोकन, इनसेट विकल्पों और कॉपी-पेस्ट कोड स्निपेट्स के साथ सीएसएस बॉक्स छाया उत्पन्न और अनुकूलित करें।",
      "metaDescription": "वास्तविक समय पूर्वावलोकन, इनसेट मोड, मल्टी-शैडो लेयरिंग और तत्काल कॉपी समर्थन के साथ सीएसएस बॉक्स छाया उत्पन्न करें। 100% निजी."
    },
    "it": {
      "title": "Generatore di ombre della casella CSS",
      "description": "Genera e personalizza ombre di riquadri CSS con anteprima dal vivo, opzioni di inserimento e snippet di codice copia-incolla.",
      "metaDescription": "Genera visivamente ombre di riquadri CSS con anteprima in tempo reale, modalità inserita, stratificazione di ombre multiple e supporto per la copia istantanea. 100% privato."
    },
    "ar": {
      "title": "مولد الظل لصندوق CSS",
      "description": "قم بإنشاء وتخصيص ظلال مربعات CSS من خلال المعاينة المباشرة والخيارات الداخلية ومقتطفات التعليمات البرمجية للنسخ واللصق.",
      "metaDescription": "قم بإنشاء ظلال مربعات CSS بشكل مرئي من خلال المعاينة في الوقت الفعلي، ووضع الإدراج، وطبقات الظل المتعددة، ودعم النسخ الفوري. خاص 100%."
    }
  },
  "unix-timestamp-converter": {
    "es": {
      "title": "Convertidor de marcas de tiempo de Unix",
      "description": "Convierta marcas de tiempo de época de Unix en fechas legibles por humanos (UTC y zona horaria local) y viceversa.",
      "metaDescription": "Convierta marcas de tiempo de época de Unix en fechas legibles por humanos (UTC y zona horaria local) y viceversa. Detecta automáticamente segundos frente a milisegundos. 100% privado."
    },
    "de": {
      "title": "Unix-Zeitstempelkonverter",
      "description": "Konvertieren Sie Zeitstempel der Unix-Epoche in für Menschen lesbare Daten (UTC und lokale Zeitzone) und umgekehrt.",
      "metaDescription": "Konvertieren Sie Zeitstempel der Unix-Epoche in für Menschen lesbare Daten (UTC und lokale Zeitzone) und umgekehrt. Erkennt automatisch Sekunden und Millisekunden. 100 % privat."
    },
    "fr": {
      "title": "Convertisseur d'horodatage Unix",
      "description": "Convertissez les horodatages d'époque Unix en dates lisibles par l'homme (UTC et fuseau horaire local) et vice versa.",
      "metaDescription": "Convertissez les horodatages d'époque Unix en dates lisibles par l'homme (UTC et fuseau horaire local) et vice versa. Détecte automatiquement les secondes par rapport aux millisecondes. 100% privé."
    },
    "pt": {
      "title": "Conversor de carimbo de data/hora Unix",
      "description": "Converta carimbos de data/hora da época Unix em datas legíveis por humanos (UTC e fuso horário local) e vice-versa.",
      "metaDescription": "Converta carimbos de data/hora da época Unix em datas legíveis por humanos (UTC e fuso horário local) e vice-versa. Detecta automaticamente segundos versus milissegundos. 100% privado."
    },
    "ja": {
      "title": "Unix タイムスタンプコンバータ",
      "description": "Unix エポック タイムスタンプを人間が判読できる日付 (UTC およびローカル タイムゾーン) に変換したり、その逆の変換を行ったりします。",
      "metaDescription": "Unix エポック タイムスタンプを人間が判読できる日付 (UTC およびローカル タイムゾーン) に変換したり、その逆の変換を行ったりします。秒とミリ秒を自動検出します。 100%プライベートです。"
    },
    "zh": {
      "title": "Unix 时间戳转换器",
      "description": "将 Unix 纪元时间戳转换为人类可读的日期（UTC 和本地时区），反之亦然。",
      "metaDescription": "将 Unix 纪元时间戳转换为人类可读的日期（UTC 和本地时区），反之亦然。自动检测秒与毫秒。 100% 私人。"
    },
    "hi": {
      "title": "यूनिक्स टाइमस्टैम्प कनवर्टर",
      "description": "यूनिक्स युग टाइमस्टैम्प को मानव-पठनीय तिथियों (UTC और स्थानीय समयक्षेत्र) में बदलें और इसके विपरीत।",
      "metaDescription": "यूनिक्स युग टाइमस्टैम्प को मानव-पठनीय तिथियों (UTC और स्थानीय समयक्षेत्र) में बदलें और इसके विपरीत। सेकंड बनाम मिलीसेकंड का स्वतः पता लगाता है। 100% निजी."
    },
    "it": {
      "title": "Convertitore di timestamp Unix",
      "description": "Converti i timestamp dell'epoca Unix in date leggibili dall'uomo (UTC e fuso orario locale) e viceversa.",
      "metaDescription": "Converti i timestamp dell'epoca Unix in date leggibili dall'uomo (UTC e fuso orario locale) e viceversa. Rileva automaticamente i secondi e i millisecondi. 100% privato."
    },
    "ar": {
      "title": "محول يونكس للطوابع الزمنية",
      "description": "قم بتحويل الطوابع الزمنية لعصر Unix إلى تواريخ يمكن قراءتها بواسطة الإنسان (UTC والمنطقة الزمنية المحلية) والعكس صحيح.",
      "metaDescription": "قم بتحويل الطوابع الزمنية لعصر Unix إلى تواريخ يمكن قراءتها بواسطة الإنسان (UTC والمنطقة الزمنية المحلية) والعكس صحيح. يكتشف تلقائيًا الثواني مقابل المللي ثانية. خاص 100%."
    }
  },
  "cron-generator": {
    "es": {
      "title": "Generador y analizador de expresiones cron",
      "description": "Cree expresiones de programación cron visualmente o analice expresiones cron sin procesar en oraciones legibles en inglés.",
      "metaDescription": "Cree expresiones de programación cron visualmente o analice expresiones cron sin procesar en un inglés legible. Ver las próximas 5 fechas de ejecución. 100% privado."
    },
    "de": {
      "title": "Cron-Ausdrucksgenerator und Parser",
      "description": "Erstellen Sie Cron-Zeitplanausdrücke visuell oder analysieren Sie rohe Cron-Ausdrücke in lesbare englische Sätze.",
      "metaDescription": "Erstellen Sie Cron-Zeitplanausdrücke visuell oder analysieren Sie rohe Cron-Ausdrücke in lesbares Englisch. Sehen Sie sich die nächsten 5 Laufzeittermine an. 100 % privat."
    },
    "fr": {
      "title": "Générateur et analyseur d'expressions Cron",
      "description": "Créez visuellement des expressions de planification cron ou analysez les expressions cron brutes en phrases anglaises lisibles.",
      "metaDescription": "Créez visuellement des expressions de planification cron ou analysez les expressions cron brutes en anglais lisible. Afficher les 5 prochaines dates d’exécution. 100% privé."
    },
    "pt": {
      "title": "Gerador e analisador de expressão Cron",
      "description": "Crie expressões de cronograma cron visualmente ou analise expressões cron brutas em frases legíveis em inglês.",
      "metaDescription": "Crie expressões de agendamento cron visualmente ou analise expressões cron brutas em inglês legível. Veja as próximas 5 datas de execução. 100% privado."
    },
    "ja": {
      "title": "Cron 式ジェネレータおよびパーサー",
      "description": "cron スケジュール式を視覚的に構築したり、生の cron 式を解析して読みやすい英語の文章を作成したりできます。",
      "metaDescription": "cron スケジュール式を視覚的に構築するか、生の cron 式を解析して読みやすい英語に変換します。次の 5 つの実行日を表示します。 100%プライベートです。"
    },
    "zh": {
      "title": "Cron 表达式生成器和解析器",
      "description": "直观地构建 cron 计划表达式或将原始 cron 表达式解析为可读的英语句子。",
      "metaDescription": "直观地构建 cron 计划表达式或将原始 cron 表达式解析为可读的英语。查看接下来 5 个运行日期。 100% 私人。"
    },
    "hi": {
      "title": "क्रॉन एक्सप्रेशन जेनरेटर और पार्सर",
      "description": "क्रॉन शेड्यूल एक्सप्रेशन को दृश्य रूप से बनाएं या कच्चे क्रॉन एक्सप्रेशन को पढ़ने योग्य अंग्रेजी वाक्यों में पार्स करें।",
      "metaDescription": "क्रॉन शेड्यूल एक्सप्रेशन को दृश्य रूप से बनाएं या कच्चे क्रॉन एक्सप्रेशन को पठनीय अंग्रेजी में पार्स करें। अगली 5 रनटाइम तिथियां देखें. 100% निजी."
    },
    "it": {
      "title": "Generatore e parser di espressioni Cron",
      "description": "Crea visivamente espressioni di pianificazione cron o analizza espressioni cron grezze in frasi inglesi leggibili.",
      "metaDescription": "Crea visivamente le espressioni della pianificazione cron o analizza le espressioni cron grezze in un inglese leggibile. Visualizza le prossime 5 date di esecuzione. 100% privato."
    },
    "ar": {
      "title": "مولد ومحلل تعبير كرون",
      "description": "أنشئ تعبيرات جدول cron بشكل مرئي أو قم بتحليل تعبيرات cron الأولية إلى جمل إنجليزية قابلة للقراءة.",
      "metaDescription": "أنشئ تعبيرات جدول cron بشكل مرئي أو قم بتحليل تعبيرات cron الأولية إلى لغة إنجليزية قابلة للقراءة. عرض تواريخ التشغيل الخمسة التالية. خاص 100%."
    }
  },
  "heic-to-jpg": {
    "es": {
      "title": "Convertidor de fotos HEIC",
      "description": "Convierta fotos Apple HEIC al formato JPG o PNG estándar instantáneamente en lotes.",
      "metaDescription": "Convierta HEIC a JPG o PNG al instante: gratis, privado y sin registro. Cargue por lotes fotos de Apple, ajuste la calidad y descárguelas como ZIP. Todo en tu navegador."
    },
    "de": {
      "title": "HEIC-Fotokonverter",
      "description": "Konvertieren Sie Apple HEIC-Fotos sofort im Stapelbetrieb in das Standard-JPG- oder PNG-Format.",
      "metaDescription": "Konvertieren Sie HEIC sofort in JPG oder PNG – kostenlos, privat und ohne Anmeldung. Laden Sie Apple-Fotos stapelweise hoch, passen Sie die Qualität an und laden Sie sie als ZIP herunter. Alles in Ihrem Browser."
    },
    "fr": {
      "title": "Convertisseur de photos HEIC",
      "description": "Convertissez instantanément les photos Apple HEIC au format JPG ou PNG standard par lots.",
      "metaDescription": "Convertissez instantanément HEIC en JPG ou PNG — gratuitement, privé et sans inscription. Téléchargez par lots des photos Apple, ajustez la qualité et téléchargez-les au format ZIP. Tout cela dans votre navigateur."
    },
    "pt": {
      "title": "Conversor de fotos HEIC",
      "description": "Converta fotos HEIC da Apple para o formato JPG ou PNG padrão instantaneamente em lote.",
      "metaDescription": "Converta HEIC para JPG ou PNG instantaneamente – gratuito, privado e sem inscrição. Faça upload em lote de fotos da Apple, ajuste a qualidade e baixe como ZIP. Tudo no seu navegador."
    },
    "ja": {
      "title": "HEICフォトコンバーター",
      "description": "Apple HEIC 写真をバッチで瞬時に標準の JPG または PNG 形式に変換します。",
      "metaDescription": "HEIC を JPG または PNG に即座に変換します。無料、プライベート、サインアップは不要です。 Apple 写真をバッチアップロードし、品質を調整し、ZIP としてダウンロードします。すべてブラウザ内で。"
    },
    "zh": {
      "title": "HEIC 照片转换器",
      "description": "立即批量将 Apple HEIC 照片转换为标准 JPG 或 PNG 格式。",
      "metaDescription": "立即将 HEIC 转换为 JPG 或 PNG — 免费、私密且无需注册。批量上传Apple照片，调整质量，并下载为ZIP。一切都在您的浏览器中。"
    },
    "hi": {
      "title": "HEIC फोटो कन्वर्टर",
      "description": "Apple HEIC फ़ोटो को तुरंत बैच में मानक JPG या PNG प्रारूप में परिवर्तित करें।",
      "metaDescription": "HEIC को तुरंत JPG या PNG में बदलें - मुफ़्त, निजी और कोई साइनअप नहीं। बैच में Apple फ़ोटो अपलोड करें, गुणवत्ता समायोजित करें और ज़िप के रूप में डाउनलोड करें। सब कुछ आपके ब्राउज़र में."
    },
    "it": {
      "title": "Convertitore di foto HEIC",
      "description": "Converti istantaneamente le foto HEIC di Apple in formato JPG o PNG standard in batch.",
      "metaDescription": "Converti istantaneamente HEIC in JPG o PNG: gratuitamente, privatamente e senza registrazione. Carica in batch le foto Apple, regola la qualità e scaricale come ZIP. Tutto nel tuo browser."
    },
    "ar": {
      "title": "محول الصور HEIC",
      "description": "قم بتحويل صور Apple HEIC إلى تنسيق JPG أو PNG القياسي دفعة واحدة على الفور.",
      "metaDescription": "قم بتحويل HEIC إلى JPG أو PNG على الفور - مجانًا، وخاص، وبدون اشتراك. قم بتحميل صور Apple دفعة واحدة وضبط الجودة وتنزيلها بتنسيق ZIP. كل ذلك في متصفحك."
    }
  },
  "bulk-image-resizer": {
    "es": {
      "title": "Compresor y redimensionador de imágenes a granel",
      "description": "Cambie el tamaño, comprima y convierta varias imágenes a la vez. Descargar como ZIP.",
      "metaDescription": "Cambie el tamaño, comprima y convierta imágenes en masa, de forma gratuita y privada. Procese por lotes a WebP, JPEG o PNG. Calidad y dimensiones ajustables. Descargar como ZIP."
    },
    "de": {
      "title": "Massenbild-Resizer und -Kompressor",
      "description": "Ändern Sie die Größe, komprimieren und konvertieren Sie mehrere Bilder gleichzeitig. Als ZIP herunterladen.",
      "metaDescription": "Massenskalierung, Komprimierung und Konvertierung von Bildern – kostenlos und privat. Stapelverarbeitung in WebP, JPEG oder PNG. Qualität und Abmessungen einstellbar. Als ZIP herunterladen."
    },
    "fr": {
      "title": "Redimensionneur et compresseur d'images en masse",
      "description": "Redimensionnez, compressez et convertissez plusieurs images à la fois. Télécharger au format ZIP.",
      "metaDescription": "Redimensionnez, compressez et convertissez des images en masse – gratuitement et en privé. Traitement par lots vers WebP, JPEG ou PNG. Qualité et dimensions réglables. Télécharger au format ZIP."
    },
    "pt": {
      "title": "Redimensionador e compressor de imagens em massa",
      "description": "Redimensione, compacte e converta várias imagens de uma só vez. Baixe como ZIP.",
      "metaDescription": "Redimensione, compacte e converta imagens em massa — gratuito e privado. Processo em lote para WebP, JPEG ou PNG. Qualidade e dimensões ajustáveis. Baixe como ZIP."
    },
    "ja": {
      "title": "一括画像リサイズと圧縮",
      "description": "複数の画像を一度にサイズ変更、圧縮、変換します。 ZIP 形式でダウンロードします。",
      "metaDescription": "画像の一括サイズ変更、圧縮、変換を無料かつ非公開で行います。 WebP、JPEG、または PNG へのバッチ処理。品質と寸法を調整可能。 ZIP 形式でダウンロードします。"
    },
    "zh": {
      "title": "批量图像调整器和压缩器",
      "description": "一次调整、压缩和转换多个图像。下载为 ZIP。",
      "metaDescription": "批量调整图像大小、压缩和转换图像 - 免费且私密。批处理为 WebP、JPEG 或 PNG。可调节的质量和尺寸。下载为 ZIP。"
    },
    "hi": {
      "title": "बल्क इमेज रिसाइज़र और कंप्रेसर",
      "description": "एक साथ कई छवियों का आकार बदलें, संपीड़ित करें और परिवर्तित करें। ज़िप के रूप में डाउनलोड करें.",
      "metaDescription": "छवियों का थोक आकार बदलना, संपीड़ित करना और परिवर्तित करना - मुफ़्त और निजी। WebP, JPEG, या PNG में बैच प्रक्रिया। समायोज्य गुणवत्ता और आयाम। ज़िप के रूप में डाउनलोड करें."
    },
    "it": {
      "title": "Ridimensionatore e compressore di immagini in blocco",
      "description": "Ridimensiona, comprimi e converti più immagini contemporaneamente. Scarica come ZIP.",
      "metaDescription": "Ridimensiona, comprimi e converti in blocco le immagini: in modo gratuito e privato. Elaborazione batch in WebP, JPEG o PNG. Qualità e dimensioni regolabili. Scarica come ZIP."
    },
    "ar": {
      "title": "حجم الصورة السائبة والضاغط",
      "description": "تغيير حجم وضغط وتحويل صور متعددة في وقت واحد. تنزيل بصيغة ZIP.",
      "metaDescription": "يمكنك تغيير حجم الصور وضغطها وتحويلها بشكل مجمّع - مجانًا وخاصة. عملية مجمعة إلى WebP أو JPEG أو PNG. جودة وأبعاد قابلة للتعديل. تنزيل بصيغة ZIP."
    }
  },
  "image-cropper": {
    "es": {
      "title": "Recortador de imágenes visuales",
      "description": "Recorte imágenes visualmente a relaciones de aspecto estándar o formatos de perfil circular.",
      "metaDescription": "Recorta tus imágenes visualmente desde el lado del cliente: gratis, instantáneo y privado. Admite perfiles cuadrados 1:1, horizontales 16:9 y circulares. No hay cargas del servidor."
    },
    "de": {
      "title": "Visueller Bildbeschnitt",
      "description": "Beschneiden Sie Bilder visuell auf Standard-Seitenverhältnisse oder kreisförmige Profilformate.",
      "metaDescription": "Beschneiden Sie Ihre Bilder visuell clientseitig – kostenlos, sofort und privat. Unterstützt Quadrat 1:1, Querformat 16:9 und runde Profile. Keine Server-Uploads."
    },
    "fr": {
      "title": "Recadrage d'image visuelle",
      "description": "Recadrez visuellement les images selon des proportions standard ou des formats de profil circulaire.",
      "metaDescription": "Recadrez vos images visuellement côté client – ​​gratuitement, instantanément et privé. Prend en charge les profils Carré 1:1, Paysage 16:9 et circulaires. Aucun téléchargement sur le serveur."
    },
    "pt": {
      "title": "Cortador de imagem visual",
      "description": "Corte imagens visualmente em proporções padrão ou formatos de perfil circular.",
      "metaDescription": "Corte suas imagens visualmente do lado do cliente — gratuito, instantâneo e privado. Suporta perfis quadrados 1:1, horizontais 16:9 e circulares. Nenhum upload de servidor."
    },
    "ja": {
      "title": "ビジュアルイメージクロッパー",
      "description": "画像を標準のアスペクト比または円形プロファイル形式に視覚的にトリミングします。",
      "metaDescription": "画像をクライアント側で視覚的にトリミングします。無料、インスタント、プライベートです。正方形 1:1、ランドスケープ 16:9、および円形プロファイルをサポートします。サーバーへのアップロードはありません。"
    },
    "zh": {
      "title": "视觉图像裁剪器",
      "description": "将图像直观地裁剪为标准纵横比或圆形轮廓格式。",
      "metaDescription": "在客户端直观地裁剪您的图像 - 免费、即时且私密。支持方形 1:1、横向 16:9 和圆形轮廓。没有服务器上传。"
    },
    "hi": {
      "title": "विज़ुअल इमेज क्रॉपर",
      "description": "छवियों को दृश्य रूप से मानक पहलू अनुपात या गोलाकार प्रोफ़ाइल प्रारूप में काटें।",
      "metaDescription": "अपनी छवियों को दृश्य रूप से क्लाइंट-साइड में काटें - मुफ़्त, त्वरित और निजी। स्क्वायर 1:1, लैंडस्केप 16:9 और गोलाकार प्रोफाइल का समर्थन करता है। कोई सर्वर अपलोड नहीं."
    },
    "it": {
      "title": "Ritaglia immagini visive",
      "description": "Ritaglia visivamente le immagini in proporzioni standard o formati di profilo circolare.",
      "metaDescription": "Ritaglia visivamente le tue immagini lato client: gratuito, istantaneo e privato. Supporta profili quadrati 1:1, orizzontali 16:9 e circolari. Nessun caricamento sul server."
    },
    "ar": {
      "title": "برنامج قص الصور المرئية",
      "description": "قم بقص الصور بشكل مرئي إلى نسب العرض إلى الارتفاع القياسية أو تنسيقات الملفات الشخصية الدائرية.",
      "metaDescription": "قم بقص صورك بصريًا من جانب العميل - مجانًا وفوريًا وخاصًا. يدعم الأشكال المربعة 1:1، والمناظر الطبيعية 16:9، والملفات الدائرية. لا توجد تحميلات الخادم."
    }
  },
  "svg-minifier": {
    "es": {
      "title": "Minificador y limpiador SVG",
      "description": "Minimice y optimice el marcado SVG vectorial eliminando comentarios, espacios de nombres y redondeando decimales.",
      "metaDescription": "Optimice y minimice el marcado SVG sin conexión: gratis y 100 % privado. Limpie definiciones de espacios de nombres, elimine comentarios y dé formato a coordenadas decimales."
    },
    "de": {
      "title": "SVG Minifier & Cleaner",
      "description": "Minimieren und optimieren Sie Vektor-SVG-Markup durch Entfernen von Kommentaren, Namespaces und Runden von Dezimalstellen.",
      "metaDescription": "Optimieren und minimieren Sie SVG-Markup offline – kostenlos und 100 % privat. Bereinigen Sie Namespace-Definitionen, entfernen Sie Kommentare und formatieren Sie Dezimalkoordinaten."
    },
    "fr": {
      "title": "Minificateur et nettoyeur SVG",
      "description": "Réduisez et optimisez le balisage SVG vectoriel en supprimant les commentaires, les espaces de noms et en arrondissant les décimales.",
      "metaDescription": "Optimisez et réduisez le balisage SVG hors ligne – gratuit et 100 % privé. Nettoyez les définitions d'espace de noms, supprimez les commentaires et formatez les coordonnées décimales."
    },
    "pt": {
      "title": "Minificador e limpador SVG",
      "description": "Minimize e otimize a marcação SVG vetorial eliminando comentários, namespaces e arredondando decimais.",
      "metaDescription": "Otimize e reduza a marcação SVG off-line — gratuito e 100% privado. Limpe as definições de namespace, remova comentários e formate coordenadas decimais."
    },
    "ja": {
      "title": "SVG ミニファイアー & クリーナー",
      "description": "コメント、名前空間、および小数点以下の四捨五入を削除することで、ベクター SVG マークアップを縮小および最適化します。",
      "metaDescription": "SVG マークアップをオフラインで最適化および縮小します。無料で完全にプライベートです。名前空間定義をクリーンアップし、コメントを削除し、10 進座標をフォーマットします。"
    },
    "zh": {
      "title": "SVG 缩小器和清洁器",
      "description": "通过剥离注释、命名空间和舍入小数来缩小和优化矢量 SVG 标记。",
      "metaDescription": "离线优化和缩小 SVG 标记 — 免费且 100% 私密。清理命名空间定义、删除注释并格式化十进制坐标。"
    },
    "hi": {
      "title": "एसवीजी मिनिफायर और क्लीनर",
      "description": "टिप्पणियों, नामस्थानों और दशमलवों को पूर्णांकित करके वेक्टर एसवीजी मार्कअप को छोटा और अनुकूलित करें।",
      "metaDescription": "एसवीजी मार्कअप को ऑफ़लाइन अनुकूलित और छोटा करें - मुफ़्त और 100% निजी। स्वच्छ नामस्थान परिभाषाएँ, स्ट्रिप टिप्पणियाँ, और दशमलव निर्देशांक प्रारूपित करें।"
    },
    "it": {
      "title": "Minimizzatore e pulitore SVG",
      "description": "Minimizza e ottimizza il markup SVG vettoriale eliminando commenti, spazi dei nomi e arrotondando i decimali.",
      "metaDescription": "Ottimizza e minimizza il markup SVG offline: gratuito e privato al 100%. Pulisci le definizioni degli spazi dei nomi, elimina i commenti e formatta le coordinate decimali."
    },
    "ar": {
      "title": "مُصغر ومنظف SVG",
      "description": "قم بتصغير وتحسين ترميز SVG المتجه عن طريق تجريد التعليقات ومساحات الأسماء وتقريب الكسور العشرية.",
      "metaDescription": "تحسين وتصغير ترميز SVG دون الاتصال بالإنترنت - مجاني وخاص بنسبة 100%. تعريفات مساحة الاسم النظيفة، والتعليقات الشريطية، وتنسيق الإحداثيات العشرية."
    }
  },
  "qr-code-generator": {
    "es": {
      "title": "Generador y personalizador de códigos QR",
      "description": "Genere códigos QR personalizables con colores, tamaños, márgenes y superposiciones de logotipos centrales personalizados.",
      "metaDescription": "Genere códigos QR personalizables con colores, tamaños, márgenes y superposiciones de logotipos centrales personalizados. Descargue como vector SVG o PNG. 100% privado."
    },
    "de": {
      "title": "QR-Code-Generator und -Anpasser",
      "description": "Generieren Sie anpassbare QR-Codes mit benutzerdefinierten Farben, Größen, Rändern und Logo-Overlays in der Mitte.",
      "metaDescription": "Generieren Sie anpassbare QR-Codes mit benutzerdefinierten Farben, Größen, Rändern und Logo-Overlays in der Mitte. Als Vektor-SVG oder PNG herunterladen. 100 % privat."
    },
    "fr": {
      "title": "Générateur et personnalisateur de code QR",
      "description": "Générez des codes QR personnalisables avec des couleurs, des tailles, des marges et des superpositions de logos personnalisés.",
      "metaDescription": "Générez des codes QR personnalisables avec des couleurs, des tailles, des marges et des superpositions de logos personnalisés. Téléchargez en tant que vecteur SVG ou PNG. 100% privé."
    },
    "pt": {
      "title": "Gerador e personalizador de código QR",
      "description": "Gere códigos QR personalizáveis ​​com cores, tamanhos, margens e sobreposições de logotipo central personalizados.",
      "metaDescription": "Gere códigos QR personalizáveis ​​com cores, tamanhos, margens e sobreposições de logotipo central personalizados. Baixe como vetor SVG ou PNG. 100% privado."
    },
    "ja": {
      "title": "QRコードジェネレーター＆カスタマイザー",
      "description": "カスタムの色、サイズ、余白、中央のロゴ オーバーレイを使用して、カスタマイズ可能な QR コードを生成します。",
      "metaDescription": "カスタムの色、サイズ、余白、中央のロゴ オーバーレイを使用して、カスタマイズ可能な QR コードを生成します。ベクター SVG または PNG としてダウンロードします。 100%プライベートです。"
    },
    "zh": {
      "title": "二维码生成器和定制器",
      "description": "生成具有自定义颜色、尺寸、边距和中心徽标叠加层的可自定义 QR 码。",
      "metaDescription": "生成具有自定义颜色、尺寸、边距和中心徽标叠加层的可自定义 QR 码。下载为矢量 SVG 或 PNG。 100% 私人。"
    },
    "hi": {
      "title": "क्यूआर कोड जेनरेटर और कस्टमाइज़र",
      "description": "कस्टम रंग, आकार, मार्जिन और केंद्र लोगो ओवरले के साथ अनुकूलन योग्य क्यूआर कोड उत्पन्न करें।",
      "metaDescription": "कस्टम रंग, आकार, मार्जिन और केंद्र लोगो ओवरले के साथ अनुकूलन योग्य क्यूआर कोड उत्पन्न करें। वेक्टर एसवीजी या पीएनजी के रूप में डाउनलोड करें। 100% निजी."
    },
    "it": {
      "title": "Generatore e personalizzazione di codici QR",
      "description": "Genera codici QR personalizzabili con colori, dimensioni, margini e sovrapposizioni del logo centrale personalizzati.",
      "metaDescription": "Genera codici QR personalizzabili con colori, dimensioni, margini e sovrapposizioni del logo centrale personalizzati. Scarica come vettore SVG o PNG. 100% privato."
    },
    "ar": {
      "title": "مولد رمز الاستجابة السريعة ومخصص",
      "description": "قم بإنشاء رموز QR قابلة للتخصيص بألوان وحجم وهوامش وتراكبات شعار مركزية مخصصة.",
      "metaDescription": "قم بإنشاء رموز QR قابلة للتخصيص بألوان وحجم وهوامش وتراكبات شعار مركزية مخصصة. قم بالتنزيل كمتجه SVG أو PNG. خاص 100%."
    }
  },
  "saas-mrr": {
    "es": {
      "title": "Proyecciones de MRR de SaaS",
      "description": "Proyecte el crecimiento de los ingresos recurrentes mensuales, cohortes de valor de vida del cliente y tasas de abandono.",
      "metaDescription": "Modele su trayectoria de crecimiento de SaaS MRR: gratis, privado e instantáneo. Pronostique los ingresos, la deserción y el LTV de los clientes con gráficos interactivos. No es necesario registrarse."
    },
    "de": {
      "title": "SaaS-MRR-Prognosen",
      "description": "Projizieren Sie das monatlich wiederkehrende Umsatzwachstum, die Kohorten des Customer Lifetime Value und die Abwanderungsraten.",
      "metaDescription": "Modellieren Sie Ihren SaaS-MRR-Wachstumspfad – kostenlos, privat und sofort. Prognostizieren Sie Umsatz, Abwanderung und Kunden-LTV mit interaktiven Diagrammen. Keine Anmeldung erforderlich."
    },
    "fr": {
      "title": "Projections MRR SaaS",
      "description": "Projetez la croissance des revenus récurrents mensuels, les cohortes de valeur à vie du client et les taux de désabonnement.",
      "metaDescription": "Modélisez votre trajectoire de croissance SaaS MRR : gratuite, privée et instantanée. Prévoyez les revenus, le taux de désabonnement et la LTV des clients avec des graphiques interactifs. Aucune inscription nécessaire."
    },
    "pt": {
      "title": "Projeções SaaS MRR",
      "description": "Projete o crescimento da receita recorrente mensal, coortes de valor de vida do cliente e taxas de rotatividade.",
      "metaDescription": "Modele sua trajetória de crescimento SaaS MRR — gratuito, privado e instantâneo. Preveja receita, rotatividade e LTV do cliente com gráficos interativos. Não é necessária inscrição."
    },
    "ja": {
      "title": "SaaS MRR 予測",
      "description": "毎月の経常収益の成長、顧客生涯価値コホート、および解約率をプロジェクトします。",
      "metaDescription": "SaaS MRR の成長軌跡を無料、プライベート、即時にモデル化します。インタラクティブなグラフを使用して、収益、解約、顧客 LTV を予測します。サインアップは必要ありません。"
    },
    "zh": {
      "title": "SaaS MRR 预测",
      "description": "项目每月经常性收入增长、客户终身价值群体和流失率。",
      "metaDescription": "为您的 SaaS MRR 增长轨迹建模——免费、私密且即时。使用交互式图表预测收入、流失率和客户生命周期价值。无需注册。"
    },
    "hi": {
      "title": "सास एमआरआर अनुमान",
      "description": "परियोजना मासिक आवर्ती राजस्व वृद्धि, ग्राहक आजीवन मूल्य समूह, और मंथन दरें।",
      "metaDescription": "अपने SaaS MRR विकास पथ को मॉडल करें - मुफ़्त, निजी और त्वरित। इंटरैक्टिव चार्ट के साथ राजस्व, मंथन और ग्राहक एलटीवी का पूर्वानुमान लगाएं। किसी साइनअप की आवश्यकता नहीं."
    },
    "it": {
      "title": "Proiezioni MRR SaaS",
      "description": "Proietta la crescita dei ricavi ricorrenti mensili, i gruppi di Customer Lifetime Value e i tassi di abbandono.",
      "metaDescription": "Modella la tua traiettoria di crescita SaaS MRR: gratuita, privata e istantanea. Prevedi ricavi, abbandono e LTV dei clienti con grafici interattivi. Non è necessaria alcuna registrazione."
    },
    "ar": {
      "title": "توقعات SaaS MRR",
      "description": "نمو الإيرادات المتكررة الشهرية للمشروع، ومجموعات القيمة الدائمة للعميل، ومعدلات التوقف عن العمل.",
      "metaDescription": "قم بوضع نموذج لمسار نمو SaaS MRR الخاص بك - مجاني وخاص وفوري. توقع الإيرادات، والحركة، والقيمة الدائمة للعملاء باستخدام الرسوم البيانية التفاعلية. لا حاجة للتسجيل."
    }
  },
  "startup-equity": {
    "es": {
      "title": "Modelador de adquisición de derechos de capital",
      "description": "Calcule los cronogramas de adquisición de opciones para los empleados, las valoraciones de las acciones y las curvas de dilución de los fundadores.",
      "metaDescription": "Calcule la adquisición de derechos, la dilución y las valoraciones de opciones de capital inicial: gratis, privado e instantáneo. Modelo chaleco de 4 años con acantilado de 1 año. No es necesario registrarse."
    },
    "de": {
      "title": "Equity Vesting Modeler",
      "description": "Berechnen Sie Zeitpläne für die Ausübung von Mitarbeiteroptionen, Aktienbewertungen und Verwässerungskurven für Gründer.",
      "metaDescription": "Berechnen Sie die Vesting-, Verwässerungs- und Optionsbewertungen von Startup-Eigenkapital – kostenlos, privat und sofort. Modell 4-Jahres-Weste mit 1-Jahres-Klippe. Keine Anmeldung erforderlich."
    },
    "fr": {
      "title": "Modélisateur d'acquisition d'actions",
      "description": "Calculez les calendriers d’acquisition des options des employés, les valorisations des actions et les courbes de dilution des fondateurs.",
      "metaDescription": "Calculez l’acquisition des capitaux propres, la dilution et les évaluations d’options de démarrage – gratuitement, privé et instantané. Modèle gilet 4 ans avec falaise 1 an. Aucune inscription nécessaire."
    },
    "pt": {
      "title": "Modelador de aquisição de ações",
      "description": "Calcule cronogramas de aquisição de opções de funcionários, avaliações de ações e curvas de diluição do fundador.",
      "metaDescription": "Calcule aquisição de capital inicial, diluição e avaliações de opções - gratuitas, privadas e instantâneas. Colete modelo 4 anos com penhasco de 1 ano. Não é necessária inscrição."
    },
    "ja": {
      "title": "株式権利確定モデラー",
      "description": "従業員のオプション権利確定スケジュール、株式評価、創業者の希薄化曲線を計算します。",
      "metaDescription": "スタートアップ企業の株式の権利確定、希薄化、オプションの評価を無料、非公開、即時に計算します。 4年モデルベストと1年クリフ。サインアップは必要ありません。"
    },
    "zh": {
      "title": "股权归属建模师",
      "description": "计算员工期权行权时间表、股票估值和创始人稀释曲线。",
      "metaDescription": "计算初创企业股权归属、稀释和期权估值——免费、私密且即时。模型 4 年背心，带 1 年悬崖。无需注册。"
    },
    "hi": {
      "title": "इक्विटी वेस्टिंग मॉडलर",
      "description": "कर्मचारी विकल्प निहित कार्यक्रम, स्टॉक मूल्यांकन और संस्थापक कमजोर पड़ने वाले वक्र की गणना करें।",
      "metaDescription": "स्टार्टअप इक्विटी वेस्टिंग, डाइल्यूशन और विकल्प मूल्यांकन की गणना करें - मुफ़्त, निजी और तत्काल। 1-वर्षीय क्लिफ़ के साथ मॉडल 4-वर्षीय बनियान। किसी साइनअप की आवश्यकता नहीं."
    },
    "it": {
      "title": "Modellatore di maturazione azionaria",
      "description": "Calcola i programmi di maturazione delle opzioni dei dipendenti, le valutazioni delle azioni e le curve di diluizione del fondatore.",
      "metaDescription": "Calcola la maturazione azionaria delle startup, la diluizione e le valutazioni delle opzioni: gratuito, privato e istantaneo. Gilet modello 4 anni con scogliera 1 anno. Non è necessaria alcuna registrazione."
    },
    "ar": {
      "title": "نموذج استحقاق الأسهم",
      "description": "حساب جداول استحقاق خيار الموظف، وتقييمات الأسهم، ومنحنيات تخفيف المؤسس.",
      "metaDescription": "Calculate startup equity vesting, dilution, and option valuations — free, private, and instant. سترة نموذجية لمدة 4 سنوات مع جرف لمدة عام واحد. لا حاجة للتسجيل."
    }
  },
  "mortgage-calculator": {
    "es": {
      "title": "Calendario de amortización de hipotecas y préstamos",
      "description": "Modele calendarios de amortización de capital versus intereses durante 10 a 30 años.",
      "metaDescription": "Calcule los pagos mensuales del préstamo y los calendarios de amortización del principal frente a los intereses localmente, de forma gratuita y privada. Plazos personalizables hasta 30 años. No hay cargas del servidor."
    },
    "de": {
      "title": "Tilgungsplan für Hypotheken und Darlehen",
      "description": "Modellierung von Kapital- und Zinstilgungsplänen über 10 bis 30 Jahre.",
      "metaDescription": "Berechnen Sie vor Ort die monatlichen Kreditzahlungen und Tilgungspläne für Kapital und Zinsen – kostenlos und privat. Anpassbare Laufzeiten bis zu 30 Jahre. Keine Server-Uploads."
    },
    "fr": {
      "title": "Calendrier d’amortissement des prêts hypothécaires et des prêts",
      "description": "Modèles de calendriers d’amortissement du capital et des intérêts sur 10 à 30 ans.",
      "metaDescription": "Calculez localement les remboursements mensuels du prêt et les calendriers d’amortissement du capital et des intérêts – gratuitement et en privé. Durées personnalisables jusqu'à 30 ans. Aucun téléchargement sur le serveur."
    },
    "pt": {
      "title": "Cronograma de amortização de hipotecas e empréstimos",
      "description": "Modelo de cronogramas de amortização de principal versus juros ao longo de 10 a 30 anos.",
      "metaDescription": "Calcule os pagamentos mensais do empréstimo e os cronogramas de amortização do principal versus juros localmente – gratuito e privado. Termos personalizáveis ​​de até 30 anos. Nenhum upload de servidor."
    },
    "ja": {
      "title": "住宅ローンとローンの返済スケジュール",
      "description": "10 ～ 30 年間にわたる元本と利息の償却スケジュールをモデル化します。",
      "metaDescription": "毎月のローン支払いと元本と利息の償却スケジュールをローカルで無料かつ非公開で計算します。最長 30 年の期間をカスタマイズ可能。サーバーへのアップロードはありません。"
    },
    "zh": {
      "title": "抵押贷款摊销时间表",
      "description": "对 10 至 30 年的本金与利息摊销时间表进行建模。",
      "metaDescription": "在本地计算每月贷款付款和本金与利息摊销时间表 - 免费且私密。可定制期限长达 30 年。没有服务器上传。"
    },
    "hi": {
      "title": "बंधक एवं ऋण परिशोधन अनुसूची",
      "description": "10 से 30 वर्षों में मॉडल मूलधन बनाम ब्याज परिशोधन कार्यक्रम।",
      "metaDescription": "स्थानीय स्तर पर मासिक ऋण भुगतान और मूलधन बनाम ब्याज परिशोधन कार्यक्रम की गणना करें - मुफ़्त और निजी। 30 वर्ष तक अनुकूलन योग्य शर्तें। कोई सर्वर अपलोड नहीं."
    },
    "it": {
      "title": "Piano di ammortamento di mutui e prestiti",
      "description": "Piani di ammortamento del capitale rispetto agli interessi del modello in un periodo da 10 a 30 anni.",
      "metaDescription": "Calcola i pagamenti mensili del prestito e i programmi di ammortamento del capitale e degli interessi a livello locale: in modo gratuito e privato. Termini personalizzabili fino a 30 anni. Nessun caricamento sul server."
    },
    "ar": {
      "title": "جدول الرهن العقاري واستهلاك القروض",
      "description": "النموذج الرئيسي مقابل جداول استهلاك الفائدة على مدى 10 إلى 30 سنة.",
      "metaDescription": "احسب دفعات القرض الشهرية وجداول استهلاك رأس المال مقابل الفائدة محليًا - مجانًا وخاصة. شروط قابلة للتخصيص تصل إلى 30 عامًا. لا توجد تحميلات الخادم."
    }
  },
  "cap-table": {
    "es": {
      "title": "Modelador de tablas de capitalización de inicio",
      "description": "Modele rondas de dilución de grupos de opciones sobre acciones y programas de dilución de precios de acciones.",
      "metaDescription": "Calcule la dilución del capital inicial ronda por ronda: gratis y privado. Agregue fundadores, modele rondas de inversión inicial y dimensione los grupos de opciones para empleados. No hay cargas del servidor."
    },
    "de": {
      "title": "Modellierer für Startkapitalisierungstabellen",
      "description": "Modellieren Sie Verwässerungsrunden für Aktienoptionspools und Verwässerungspläne für Aktienpreise.",
      "metaDescription": "Berechnen Sie die Verwässerung des Startup-Eigenkapitals Runde für Runde – kostenlos und privat. Fügen Sie Gründer hinzu, modellieren Sie Seed-Investitionsrunden und vergrößern Sie Optionspools für Mitarbeiter. Keine Server-Uploads."
    },
    "fr": {
      "title": "Modélisateur de table de capitalisation de démarrage",
      "description": "Modélisez les cycles de dilution des pools d’options d’achat d’actions et les calendriers de dilution du prix des actions.",
      "metaDescription": "Calculez la dilution des capitaux propres des startups tour par tour – gratuit et privé. Ajoutez des fondateurs, modélisez des cycles d’investissement de démarrage et dimensionnez les pools d’options pour les employés. Aucun téléchargement sur le serveur."
    },
    "pt": {
      "title": "Modelador de tabela de capitalização inicial",
      "description": "Modele rodadas diluidoras de pool de opções de ações e cronogramas de diluição de preços de ações.",
      "metaDescription": "Calcule a diluição do patrimônio inicial rodada por rodada - gratuita e privada. Adicione fundadores, modele rodadas de investimento inicial e dimensione conjuntos de opções de funcionários. Nenhum upload de servidor."
    },
    "ja": {
      "title": "スタートアップ資本化テーブル モデラー",
      "description": "ストック オプション プールの希薄化ラウンドと株価の希薄化スケジュールをモデル化します。",
      "metaDescription": "スタートアップ企業の株式の希薄化をラウンドごとに計算します - 無料かつ非公開です。創業者を追加し、シード投資ラウンドをモデル化し、従業員のオプションプールをサイズ設定します。サーバーへのアップロードはありません。"
    },
    "zh": {
      "title": "初创公司资本表建模器",
      "description": "模拟股票期权池稀释回合和股票定价稀释时间表。",
      "metaDescription": "逐轮计算初创企业股权稀释——免费且私密。添加创始人、模拟种子轮投资并调整员工期权池规模。没有服务器上传。"
    },
    "hi": {
      "title": "स्टार्टअप कैपिटलाइज़ेशन टेबल मॉडलर",
      "description": "मॉडल स्टॉक विकल्प पूल डाइल्यूटिव राउंड और शेयर मूल्य निर्धारण डाइल्यूशन शेड्यूल।",
      "metaDescription": "स्टार्टअप इक्विटी डाइल्यूशन की राउंड दर राउंड गणना करें - मुफ़्त और निजी। संस्थापकों को जोड़ें, मॉडल बीज निवेश दौर, और कर्मचारी विकल्प पूल को आकार दें। कोई सर्वर अपलोड नहीं."
    },
    "it": {
      "title": "Modellatore di tabelle di capitalizzazione di avvio",
      "description": "Modello di cicli di diluizione del pool di opzioni su azioni e programmi di diluizione dei prezzi delle azioni.",
      "metaDescription": "Calcola la diluizione del capitale di una startup round dopo round: gratuito e privato. Aggiungi fondatori, modella i round di investimento iniziale e dimensiona i pool di opzioni dei dipendenti. Nessun caricamento sul server."
    },
    "ar": {
      "title": "نموذج جدول الكتابة بالأحرف الكبيرة لبدء التشغيل",
      "description": "تجمع خيارات الأسهم النموذجية الجولات المخففة وجداول تخفيف تسعير الأسهم.",
      "metaDescription": "قم بحساب تخفيض قيمة أسهم الشركات الناشئة جولة تلو الأخرى - مجانًا وخاصًا. أضف المؤسسين، وجولات الاستثمار الأولية النموذجية، ومجموعات خيارات الموظفين. لا توجد تحميلات الخادم."
    }
  },
  "saas-ltv": {
    "es": {
      "title": "Modelador de retención SaaS CAC y LTV",
      "description": "Calcule el valor de vida del cliente (LTV), los ratios de eficiencia LTV:CAC y las curvas de caída de cohortes.",
      "metaDescription": "Analice la economía de las unidades de clientes de SaaS sin conexión: de forma gratuita y privada. Pronosticar LTV, ratios LTV:CAC, períodos de recuperación y curvas de caída de cohortes. No hay cargas del servidor."
    },
    "de": {
      "title": "SaaS CAC- und LTV-Retention-Modellierer",
      "description": "Berechnen Sie den Customer Lifetime Value (LTV), das LTV:CAC-Effizienzverhältnis und die Kohortenverfallskurven.",
      "metaDescription": "Analysieren Sie die Wirtschaftlichkeit von SaaS-Kundeneinheiten offline – kostenlos und privat. Prognostizieren Sie LTV, LTV:CAC-Verhältnisse, Amortisationszeiten und Kohorten-Abklingkurven. Keine Server-Uploads."
    },
    "fr": {
      "title": "Modélisateur de rétention SaaS CAC et LTV",
      "description": "Calculez la valeur à vie du client (LTV), les ratios d'efficacité LTV:CAC et les courbes de décroissance des cohortes.",
      "metaDescription": "Analysez l’économie des unités client SaaS hors ligne – gratuitement et en privé. Prévoyez les ratios LTV, LTV:CAC, les périodes de récupération et les courbes de décroissance des cohortes. Aucun téléchargement sur le serveur."
    },
    "pt": {
      "title": "Modelador de retenção SaaS CAC e LTV",
      "description": "Calcule o valor de vida do cliente (LTV), índices de eficiência LTV:CAC e curvas de decaimento de coorte.",
      "metaDescription": "Analise a economia da unidade do cliente SaaS off-line — de forma gratuita e privada. Previsão de LTV, índices LTV:CAC, períodos de retorno e curvas de decaimento de coorte. Nenhum upload de servidor."
    },
    "ja": {
      "title": "SaaS CAC および LTV リテンションモデラー",
      "description": "顧客生涯価値 (LTV)、LTV:CAC 効率比、およびコホート減衰曲線を計算します。",
      "metaDescription": "SaaS 顧客のユニット エコノミクスをオフラインで無料かつプライベートで分析します。 LTV、LTV:CAC 比率、回収期間、コホート減衰曲線を予測します。サーバーへのアップロードはありません。"
    },
    "zh": {
      "title": "SaaS CAC 和 LTV 保留建模器",
      "description": "计算客户生命周期价值 (LTV)、LTV:CAC 效率比和群组衰减曲线。",
      "metaDescription": "离线分析 SaaS 客户单位经济 — 免费且私密。预测 LTV、LTV:CAC 比率、投资回收期和群组衰减曲线。没有服务器上传。"
    },
    "hi": {
      "title": "सास सीएसी और एलटीवी रिटेंशन मॉडलर",
      "description": "ग्राहक आजीवन मूल्य (एलटीवी), एलटीवी:सीएसी दक्षता अनुपात और समूह क्षय वक्र की गणना करें।",
      "metaDescription": "SaaS ग्राहक इकाई अर्थशास्त्र का ऑफ़लाइन विश्लेषण करें - मुफ़्त और निजी। पूर्वानुमान एलटीवी, एलटीवी:सीएसी अनुपात, पेबैक अवधि और समूह क्षय वक्र। कोई सर्वर अपलोड नहीं."
    },
    "it": {
      "title": "SaaS CAC e modellatore di conservazione LTV",
      "description": "Calcola il Customer Lifetime Value (LTV), i rapporti di efficienza LTV:CAC e le curve di decadimento della coorte.",
      "metaDescription": "Analizza offline le economie delle unità cliente SaaS: in modo gratuito e privato. Previsioni LTV, rapporti LTV:CAC, periodi di ammortamento e curve di decadimento della coorte. Nessun caricamento sul server."
    },
    "ar": {
      "title": "SaaS CAC وLTV نموذج الاحتفاظ",
      "description": "حساب القيمة الدائمة للعميل (LTV)، ونسب كفاءة LTV:CAC، ومنحنيات تسوس المجموعة.",
      "metaDescription": "قم بتحليل اقتصاديات وحدة عملاء SaaS دون الاتصال بالإنترنت - مجانًا وخاصة. توقعات LTV، LTV: نسب CAC، وفترات الاسترداد، ومنحنيات تسوس المجموعة. لا توجد تحميلات الخادم."
    }
  },
  "break-even": {
    "es": {
      "title": "Calculadora de punto de equilibrio",
      "description": "Modele costos fijos versus costos variables, márgenes de contribución y líneas de equilibrio unitario.",
      "metaDescription": "Encuentre el punto de equilibrio de su negocio al instante, de forma gratuita y privada. Calcule unidades de equilibrio, valores de ventas, márgenes de contribución e intersecciones de líneas. No hay cargas del servidor."
    },
    "de": {
      "title": "Break-Even-Point-Rechner",
      "description": "Modellieren Sie feste und variable Kosten, Deckungsbeiträge und Break-Even-Linien für Einheiten.",
      "metaDescription": "Finden Sie sofort Ihren geschäftlichen Break-Even-Punkt – kostenlos und privat. Berechnen Sie Break-Even-Einheiten, Verkaufswerte, Deckungsbeiträge und Linienschnittpunkte. Keine Server-Uploads."
    },
    "fr": {
      "title": "Calculateur du seuil de rentabilité",
      "description": "Modélisez les coûts fixes et variables, les marges de contribution et les seuils de rentabilité des unités.",
      "metaDescription": "Trouvez instantanément le seuil de rentabilité de votre entreprise, gratuitement et en privé. Calculez les unités d'équilibre, les valeurs de ventes, les marges de contribution et les intersections de lignes. Aucun téléchargement sur le serveur."
    },
    "pt": {
      "title": "Calculadora de ponto de equilíbrio",
      "description": "Modele custos fixos versus variáveis, margens de contribuição e linhas de equilíbrio de unidades.",
      "metaDescription": "Encontre o ponto de equilíbrio do seu negócio instantaneamente – gratuito e privado. Calcule unidades de ponto de equilíbrio, valores de vendas, margens de contribuição e interseções de linhas. Nenhum upload de servidor."
    },
    "ja": {
      "title": "損益分岐点計算ツール",
      "description": "固定費と変動費、貢献利益、ユニットの損益分岐点をモデル化します。",
      "metaDescription": "ビジネスの損益分岐点を無料かつ非公開で即座に見つけます。損益分岐点単位、売上高、貢献利益、線の交差を計算します。サーバーへのアップロードはありません。"
    },
    "zh": {
      "title": "盈亏平衡点计算器",
      "description": "对固定成本与可变成本、边际贡献和单位盈亏平衡线进行建模。",
      "metaDescription": "立即找到您的业务收支平衡点——免费且私密。计算盈亏平衡单位、销售额、边际贡献和线交点。没有服务器上传。"
    },
    "hi": {
      "title": "ब्रेक-ईवन पॉइंट कैलकुलेटर",
      "description": "मॉडल निश्चित बनाम परिवर्तनीय लागत, योगदान मार्जिन, और इकाइयां ब्रेक-ईवन लाइनें।",
      "metaDescription": "अपने व्यवसाय का ब्रेक-ईवन बिंदु तुरंत ढूंढें - मुफ़्त और निजी। ब्रेक-ईवन इकाइयों, बिक्री मूल्यों, योगदान मार्जिन और लाइन इंटरसेक्शन की गणना करें। कोई सर्वर अपलोड नहीं."
    },
    "it": {
      "title": "Calcolatore del punto di pareggio",
      "description": "Modella costi fissi e variabili, margini di contribuzione e linee di pareggio delle unità.",
      "metaDescription": "Trova istantaneamente il punto di pareggio della tua azienda: in modo gratuito e privato. Calcola le unità di pareggio, i valori di vendita, i margini di contribuzione e le intersezioni delle linee. Nessun caricamento sul server."
    },
    "ar": {
      "title": "حاسبة نقطة التعادل",
      "description": "نموذج التكاليف الثابتة مقابل التكاليف المتغيرة، وهوامش المساهمة، وخطوط تعادل الوحدات.",
      "metaDescription": "ابحث عن نقطة التعادل لشركتك على الفور - مجانًا وبشكل خاص. حساب وحدات التعادل وقيم المبيعات وهوامش المساهمة وتقاطعات الخطوط. لا توجد تحميلات الخادم."
    }
  },
  "dice-roller": {
    "es": {
      "title": "Rodillo de dados 3D",
      "description": "Lanza múltiples dados 3D interactivos con lados personalizados, física animada y totales de conversión de texto a voz.",
      "metaDescription": "Rodillo de dados 3D interactivo gratuito. Tira varios dados de caras personalizadas al instante. Presenta animaciones elegantes, cálculos de sumas y anuncios de voz. 100% privado."
    },
    "de": {
      "title": "3D-Würfelroller",
      "description": "Lassen Sie mehrere interaktive 3D-Würfel mit benutzerdefinierten Seiten, animierter Physik und Text-zu-Sprache-Gesamtwerten rollen.",
      "metaDescription": "Kostenloser interaktiver 3D-Würfelroller. Werfen Sie sofort mehrere Würfel mit individueller Seite. Bietet elegante Animationen, Summenberechnung und Sprachansagen. 100 % privat."
    },
    "fr": {
      "title": "Rouleau de dés 3D",
      "description": "Lancez plusieurs dés 3D interactifs avec des faces personnalisées, une physique animée et des totaux de synthèse vocale.",
      "metaDescription": "Rouleau de dés 3D interactif gratuit. Lancez instantanément plusieurs dés à faces personnalisées. Comprend des animations élégantes, un calcul de somme et des annonces vocales. 100% privé."
    },
    "pt": {
      "title": "Rolo de dados 3D",
      "description": "Jogue vários dados 3D interativos com lados personalizados, física animada e totais de conversão de texto em fala.",
      "metaDescription": "Rolo de dados 3D interativo gratuito. Jogue vários dados personalizados instantaneamente. Apresenta animações elegantes, cálculo de soma e anúncios de voz. 100% privado."
    },
    "ja": {
      "title": "3Dダイスローラー",
      "description": "カスタム面、アニメーション化された物理演算、テキスト読み上げの合計を備えた複数のインタラクティブ 3D ダイスを転がします。",
      "metaDescription": "無料のインタラクティブな 3D サイコロ ローラー。複数のカスタム面のサイコロを瞬時に振ります。洗練されたアニメーション、合計計算、音声アナウンスが特徴です。 100%プライベートです。"
    },
    "zh": {
      "title": "3D 骰子滚筒",
      "description": "滚动多个交互式 3D 骰子，具有自定义面、动画物理效果和文本转语音总计。",
      "metaDescription": "免费交互式 3D 骰子滚轮。立即掷出多个定制面骰子。具有流畅的动画、总和计算和语音播报功能。 100% 私人。"
    },
    "hi": {
      "title": "3डी पासा रोलर",
      "description": "कस्टम पक्षों, एनिमेटेड भौतिकी और टेक्स्ट-टू-स्पीच योग के साथ एकाधिक इंटरैक्टिव 3डी पासा रोल करें।",
      "metaDescription": "निःशुल्क इंटरैक्टिव 3डी पासा रोलर। एकाधिक कस्टम-पक्षीय पासों को तुरंत रोल करें। आकर्षक एनिमेशन, योग गणना और ध्वनि घोषणाएँ सुविधाएँ। 100% निजी."
    },
    "it": {
      "title": "Rullo di dadi 3D",
      "description": "Lancia più dadi 3D interattivi con lati personalizzati, fisica animata e totali con sintesi vocale.",
      "metaDescription": "Rullo di dadi 3D interattivo gratuito. Lancia istantaneamente più dadi a facce personalizzate. Presenta animazioni eleganti, calcolo della somma e annunci vocali. 100% privato."
    },
    "ar": {
      "title": "بكرة النرد ثلاثية الأبعاد",
      "description": "قم برمي العديد من النرد التفاعلي ثلاثي الأبعاد بجوانب مخصصة وفيزياء متحركة وإجماليات تحويل النص إلى كلام.",
      "metaDescription": "بكرة النرد التفاعلية المجانية ثلاثية الأبعاد. قم برمي النرد المتعدد الجوانب على الفور. يتميز برسوم متحركة أنيقة وحساب المجموع والإعلانات الصوتية. خاص 100%."
    }
  },
  "random-team-generator": {
    "es": {
      "title": "Generador de equipos aleatorios",
      "description": "Divida una lista de nombres en equipos aleatorios sin esfuerzo.",
      "metaDescription": "Generador de equipos aleatorios online gratuito. Ingrese una lista de nombres y divídalos instantáneamente en equipos o grupos aleatorios. 100% privado y del lado del cliente."
    },
    "de": {
      "title": "Zufälliger Teamgenerator",
      "description": "Teilen Sie eine Liste mit Namen mühelos in zufällige Teams auf.",
      "metaDescription": "Kostenloser Online-Zufallsgenerator für Teams. Geben Sie eine Liste mit Namen ein und teilen Sie diese sofort in zufällige Teams oder Gruppen auf. 100 % privat und kundenseitig."
    },
    "fr": {
      "title": "Générateur d'équipe aléatoire",
      "description": "Divisez facilement une liste de noms en équipes randomisées.",
      "metaDescription": "Générateur d'équipes aléatoires en ligne gratuit. Entrez une liste de noms et divisez-les instantanément en équipes ou groupes aléatoires. 100% privé et côté client."
    },
    "pt": {
      "title": "Gerador de equipe aleatória",
      "description": "Divida uma lista de nomes em equipes aleatórias sem esforço.",
      "metaDescription": "Gerador de equipes aleatórias online gratuito. Insira uma lista de nomes e divida-os instantaneamente em equipes ou grupos aleatórios. 100% privado e do lado do cliente."
    },
    "ja": {
      "title": "ランダムチームジェネレーター",
      "description": "名前のリストをランダム化されたチームに簡単に分割します。",
      "metaDescription": "無料のオンラインランダムチームジェネレーター。名前のリストを入力すると、即座にランダムなチームまたはグループに分割されます。 100% プライベートでクライアント側です。"
    },
    "zh": {
      "title": "随机团队生成器",
      "description": "毫不费力地将名单分成随机小组。",
      "metaDescription": "免费在线随机团队生成器。输入姓名列表，然后立即将他们分成随机的团队或小组。 100% 私有和客户端。"
    },
    "hi": {
      "title": "रैंडम टीम जेनरेटर",
      "description": "नामों की सूची को आसानी से यादृच्छिक टीमों में विभाजित करें।",
      "metaDescription": "मुफ़्त ऑनलाइन रैंडम टीम जनरेटर। नामों की एक सूची दर्ज करें और तुरंत उन्हें यादृच्छिक टीमों या समूहों में विभाजित करें। 100% निजी और ग्राहक-पक्ष।"
    },
    "it": {
      "title": "Generatore di squadre casuali",
      "description": "Dividi facilmente un elenco di nomi in squadre casuali.",
      "metaDescription": "Generatore di squadre casuali online gratuito. Inserisci un elenco di nomi e dividili immediatamente in squadre o gruppi casuali. 100% privato e lato cliente."
    },
    "ar": {
      "title": "مولد فريق عشوائي",
      "description": "قم بتقسيم قائمة الأسماء إلى فرق عشوائية دون عناء.",
      "metaDescription": "مولد فريق عشوائي مجاني على الإنترنت. أدخل قائمة بالأسماء وقم بتقسيمها على الفور إلى فرق أو مجموعات عشوائية. 100% خاص ومن جانب العميل."
    }
  },
  "coin-flipper": {
    "es": {
      "title": "Aleta de monedas 3D",
      "description": "Lanza una moneda 3D realista al instante para obtener un resultado de cara o cruz verdaderamente aleatorio.",
      "metaDescription": "Lanzador de monedas 3D interactivo gratuito. Lanza una moneda virtual para obtener un resultado justo de cara o cruz al instante. Presenta física, animaciones y sonido realistas."
    },
    "de": {
      "title": "3D-Münzflipper",
      "description": "Werfen Sie sofort eine realistische 3D-Münze, um ein wirklich zufälliges Kopf- oder Zahl-Ergebnis zu erhalten.",
      "metaDescription": "Kostenloser interaktiver 3D-Münzwerfer. Wirf eine virtuelle Münze und erhalte sofort ein faires Kopf- oder Zahl-Ergebnis. Bietet realistische Physik, Animationen und Sound."
    },
    "fr": {
      "title": "Flipper de pièces modèle 3D",
      "description": "Lancez instantanément une pièce de monnaie 3D réaliste pour obtenir un résultat pile ou face vraiment aléatoire.",
      "metaDescription": "Lanceur de pièces 3D interactif gratuit. Lancez une pièce virtuelle pour obtenir instantanément un résultat pile ou face équitable. Présente une physique, des animations et un son réalistes."
    },
    "pt": {
      "title": "Lançador de moedas Modelo 3D",
      "description": "Jogue uma moeda 3D realista instantaneamente para obter um resultado verdadeiramente aleatório de cara ou coroa.",
      "metaDescription": "Fliper de moeda 3D interativo gratuito. Jogue uma moeda virtual para obter um resultado justo de cara ou coroa instantaneamente. Apresenta física, animações e som realistas."
    },
    "ja": {
      "title": "3Dコインフリッパー",
      "description": "リアルな 3D コインを瞬時に投げると、真にランダムな表か裏の結果が得られます。",
      "metaDescription": "無料のインタラクティブな 3D コイン投げ。仮想コインを投げると、即座に表か裏かが決まります。リアルな物理学、アニメーション、サウンドが特徴です。"
    },
    "zh": {
      "title": "3D 硬币翻转器",
      "description": "立即翻转逼真的 3D 硬币，以获得真正随机的正面或反面结果。",
      "metaDescription": "免费交互式 3D 硬币翻转器。翻转虚拟硬币，立即获得正面或反面的结果。具有逼真的物理、动画和声音。"
    },
    "hi": {
      "title": "3डी सिक्का फ्लिपर",
      "description": "वास्तव में यादृच्छिक चित या पट परिणाम के लिए तुरंत एक यथार्थवादी 3D सिक्का पलटें।",
      "metaDescription": "निःशुल्क इंटरैक्टिव 3डी सिक्का फ़्लिपर। तुरंत सही हेड या टेल परिणाम के लिए एक आभासी सिक्का पलटें। यथार्थवादी भौतिकी, एनिमेशन और ध्वनि सुविधाएँ।"
    },
    "it": {
      "title": "Lanciamonete 3D",
      "description": "Lancia istantaneamente una moneta 3D realistica per ottenere un risultato testa o croce davvero casuale.",
      "metaDescription": "Lanciamonete 3D interattivo gratuito. Lancia una moneta virtuale per ottenere immediatamente un bel risultato di testa o croce. Presenta fisica, animazioni e suoni realistici."
    },
    "ar": {
      "title": "3D عملة زعنفة",
      "description": "اقلب عملة ثلاثية الأبعاد واقعية على الفور للحصول على نتيجة عشوائية حقيقية للرؤوس أو الكتابة.",
      "metaDescription": "زعانف عملة تفاعلية مجانية ثلاثية الأبعاد. اقلب عملة افتراضية للحصول على نتيجة عادلة للرؤوس أو الكتابة على الفور. تتميز بفيزياء واقعية ورسوم متحركة وصوت."
    }
  },
  "spin-the-wheel": {
    "es": {
      "title": "Ruleta de la Suerte",
      "description": "Crea una ruleta personalizada, añade opciones y deja que el destino decida con giros impulsados por la física.",
      "metaDescription": "Ruleta interactiva gratuita. Crea ruletas personalizadas con tus propias opciones y deja que los giros físicos decidan el resultado. 100% privado y del lado del cliente."
    },
    "de": {
      "title": "Glücksrad",
      "description": "Erstelle ein benutzerdefiniertes Glücksrad, füge Optionen hinzu und lass das Schicksal mit physikbasierten Drehungen entscheiden.",
      "metaDescription": "Kostenloses interaktives Glücksrad. Erstelle benutzerdefinierte Räder mit eigenen Optionen und lass physikbasierte Drehungen über das Ergebnis entscheiden. 100% privat und clientseitig."
    },
    "fr": {
      "title": "Roue de la Fortune",
      "description": "Créez une roue personnalisée, ajoutez des options et laissez le destin décider avec des tours basés sur la physique.",
      "metaDescription": "Roue interactive gratuite. Créez des roues personnalisées avec vos propres options et laissez les tours physiques décider du résultat. 100% privé et côté client."
    },
    "pt": {
      "title": "Roleta da Sorte",
      "description": "Crie uma roleta personalizada, adicione opções e deixe o destino decidir com giros impulsionados pela física.",
      "metaDescription": "Roleta interativa gratuita. Crie roletas personalizadas com suas próprias opções e deixe os giros físicos decidirem o resultado. 100% privado e do lado do cliente."
    },
    "ja": {
      "title": "スピン・ザ・ホイール",
      "description": "カスタムホイールを作成し、オプションを追加して、物理ベースのスピンで運命を決めましょう。",
      "metaDescription": "無料のインタラクティブホイール。独自のオプションでカスタムホイールを作成し、物理ベースのスピンで結果を決定します。100％プライベートでクライアントサイド。"
    },
    "zh": {
      "title": "命运转盘",
      "description": "创建自定义转盘，添加选项，让基于物理的旋转决定命运。",
      "metaDescription": "免费互动转盘。使用您自己的选项创建自定义转盘，让基于物理的旋转决定结果。100%私密且客户端运行。"
    },
    "hi": {
      "title": "स्पिन द व्हील",
      "description": "एक कस्टम स्पिन व्हील बनाएं, विकल्प जोड़ें, और भौतिकी-आधारित स्पिन के साथ भाग्य को निर्णय लेने दें।",
      "metaDescription": "मुफ्त इंटरैक्टिव स्पिन द व्हील। अपने स्वयं के विकल्पों के साथ कस्टम व्हील बनाएं और भौतिकी-आधारित स्पिन को परिणाम तय करने दें। 100% निजी और क्लाइंट-साइड।"
    },
    "it": {
      "title": "Ruota della Fortuna",
      "description": "Crea una ruota personalizzata, aggiungi opzioni e lascia che sia il destino a decidere con giri basati sulla fisica.",
      "metaDescription": "Ruota interattiva gratuita. Crea ruote personalizzate con le tue opzioni e lascia che i giri basati sulla fisica decidano il risultato. 100% privato e lato client."
    },
    "ar": {
      "title": "عجلة الحظ",
      "description": "قم بإنشاء عجلة دوارة مخصصة، وأضف خيارات، ودع القدر يقرر مع دورات مدفوعة بالفيزياء.",
      "metaDescription": "عجلة تفاعلية مجانية. قم بإنشاء عجلات مخصصة مع خياراتك الخاصة ودع الدورات الفيزيائية تحدد النتيجة. 100% خاصة ومن جانب العميل."
    }
  },
  "2048-game": {
    "es": {
      "title": "Juego 2048",
      "description": "Juega al clásico juego de rompecabezas 2048. ¡Desliza fichas, combina números iguales y apunta a la ficha 2048!",
      "metaDescription": "Juega al clásico juego de rompecabezas 2048 en línea. Desliza fichas, combina números iguales y apunta a la ficha 2048. Compatible con móviles, con puntuaciones máximas guardadas y 100% privado."
    },
    "de": {
      "title": "2048-Spiel",
      "description": "Spielen Sie das klassische 2048-Rätselspiel. Verschieben Sie Kacheln, führen Sie passende Zahlen zusammen und zielen Sie auf die Kachel 2048!",
      "metaDescription": "Spielen Sie das klassische 2048-Rätselspiel online. Verschieben Sie Kacheln, führen Sie passende Zahlen zusammen und zielen Sie auf die Kachel 2048. Mobilfreundlich mit gespeicherten Highscores und 100 % privat."
    },
    "fr": {
      "title": "Jeu 2048",
      "description": "Jouez au jeu de puzzle classique 2048. Faites glisser les tuiles, fusionnez les nombres correspondants et visez la tuile 2048 !",
      "metaDescription": "Jouez au jeu de puzzle classique 2048 en ligne. Faites glisser les tuiles, fusionnez les objets correspondants et visez la tuile 2048. Adapté aux mobiles, avec scores enregistrés et 100 % privé."
    },
    "pt": {
      "title": "Jogo 2048",
      "description": "Jogue o clássico jogo de quebra-cabeça 2048. Deslize os blocos, combine números idênticos e mire no bloco 2048!",
      "metaDescription": "Jogue o clássico jogo de quebra-cabeça 2048 online. Deslize os blocos, combine números idênticos e mire no bloco 2048. Amigável para dispositivos móveis com recordes salvos e 100% privado."
    },
    "ja": {
      "title": "2048ゲーム",
      "description": "クラシックな2048パズルゲームをプレイしましょう。タイルをスライドさせ、一致する数字を合体させて、2048のタイルを目指しましょう！",
      "metaDescription": "クラシックな2048パズルゲームをオンラインでプレイ。タイルをスライドさせ、一致する数字を合体させて、2048のタイルを目指します。モバイル対応、ハイスコア保存可能で100%プライベート。"
    },
    "zh": {
      "title": "2048 游戏",
      "description": "玩经典的 2048 益智游戏。滑动方块，合并相同的数字，并以 2048 方块为目标！",
      "metaDescription": "在线玩经典的 2048 益智游戏。滑动方块，合并相同的数字，并以 2048 方块为目标。手机友好，保存高分，100% 私密。"
    },
    "hi": {
      "title": "2048 गेम",
      "description": "क्लासिक 2048 पहेली खेल खेलें। टाइलें स्लाइड करें, मिलान करने वाले नंबरों को मर्ज करें, और 2048 टाइल का लक्ष्य रखें!",
      "metaDescription": "क्लासिक 2048 पहेली खेल ऑनलाइन खेलें। टाइलें स्लाइड करें, मिलान करने वाले नंबरों को मर्ज करें, और 2048 टाइल का लक्ष्य रखें। सहेजे गए उच्च स्कोर के साथ मोबाइल के अनुकूल और 100% निजी।"
    },
    "it": {
      "title": "Gioco 2048",
      "description": "Gioca al classico gioco puzzle 2048. Fai scorrere le tessere, unisci i numeri corrispondenti e mira alla tessera 2048!",
      "metaDescription": "Gioca al classico gioco puzzle 2048 online. Fai scorrere le tessere, unisci i numeri corrispondenti e mira alla tessera 2048. Ottimizzato per dispositivi mobili con punteggi massimi salvati e privato al 100%."
    },
    "ar": {
      "title": "لعبة 2048",
      "description": "العب لعبة الألغاز الكلاسيكية 2048. قم بتحريك البلاط، ودمج الأرقام المتطابقة، واهدف إلى الوصول إلى البلاط 2048!",
      "metaDescription": "العب لعبة الألغاز الكلاسيكية 2048 على الإنترنت. قم بتحريك البلاط، ودمج الأرقام المتطابقة، واهدف إلى البلاطة 2048. مناسبة للهواتف المحمولة مع حفظ أفضل النتائج وخاصة بنسبة 100%."
    }
  },
  "token-counter": {
    "es": {
      "title": "Contador de Tokens y Estimador de Costes",
      "description": "Cuente tokens utilizando tokenizadores de modelos SOTA y estime los costes de API del lado del cliente con 100% de privacidad.",
      "metaDescription": "Cuente tokens y estime costes de API localmente para modelos SOTA (GPT-5.5, o1, Claude 4.7, Gemini 2.5, LLaMA 4). Límites de tokens visuales alternativos, 100% privado."
    },
    "de": {
      "title": "Token-Zähler & Kostenschätzer",
      "description": "Zählen Sie Token mit SOTA-Modell-Tokenizern und schätzen Sie die API-Kosten clientseitig mit 100 % Datenschutz.",
      "metaDescription": "Zählen Sie Token und schätzen Sie API-Kosten lokal für SOTA-Modelle (GPT-5.5, o1, Claude 4.7, Gemini 2.5, LLaMA 4). Visuelle Token-Grenzen, 100 % privat."
    },
    "fr": {
      "title": "Compteur de Tokens & Estimateur de Coûts",
      "description": "Comptez les tokens à l'aide de tokeniseurs de modèles SOTA et estimez les coûts d'API côté client avec 100 % de confidentialité.",
      "metaDescription": "Comptez les tokens et estimez les coûts d'API localement pour les modèles SOTA (GPT-5.5, o1, Claude 4.7, Gemini 2.5, LLaMA 4). Limites de tokens visuelles, 100 % privé."
    },
    "pt": {
      "title": "Contador de Tokens e Estimador de Custos",
      "description": "Conte tokens usando tokenizadores de modelos SOTA e estime custos de API no lado do cliente com 100% de privacidade.",
      "metaDescription": "Conte tokens e estime custos de API localmente para modelos SOTA (GPT-5.5, o1, Claude 4.7, Gemini 2.5, LLaMA 4). Limites de tokens visuais alternados, 100% privado."
    },
    "ja": {
      "title": "トークンカウンター＆コスト見積もり",
      "description": "SOTAモデルのトークナイザーを使用してトークン数をカウントし、クライアント側で100%のプライバシーを守りながらAPIコストを見積もります。",
      "metaDescription": "SOTAモデル（GPT-5.5、o1、Claude 4.7、Gemini 2.5、LLaMA 4）のトークン数カウントとAPIコスト見積もりをローカルで実行。トークンの色分け表示、100%プライベート。"
    },
    "zh": {
      "title": "Token 计数器与成本估算器",
      "description": "使用 SOTA 模型分词器本地计算 Token 数量，并估算 API 成本，100% 保护隐私。",
      "metaDescription": "在本地针对 SOTA 模型（GPT-5.5、o1、Claude 4.7、Gemini 2.5、LLaMA 4）进行 Token 计数并估算 API 成本。交替颜色显示 Token 边界，100% 私密。"
    },
    "hi": {
      "title": "टोकन काउंटर और लागत अनुमानक",
      "description": "SOTA मॉडल टोकनाइज़र का उपयोग करके टोकन गिनें और 100% गोपनीयता के साथ क्लाइंट-साइड API लागत का अनुमान लगाएं।",
      "metaDescription": "SOTA मॉडल (GPT-5.5, o1, Claude 4.7, Gemini 2.5, LLaMA 4) के लिए स्थानीय रूप से टोकन गिनें और API लागत का अनुमान लगाएं। 100% सुरक्षित और निजी।"
    },
    "it": {
      "title": "Contatore di Token & Stimatore dei Costi",
      "description": "Conta i token utilizzando i tokenizzatori dei modelli SOTA e stima i costi delle API lato client con il 100% di privacy.",
      "metaDescription": "Conta i token e stima i costi delle API localmente per i modelli SOTA (GPT-5.5, o1, Claude 4.7, Gemini 2.5, LLaMA 4). Evidenziazione visiva dei token alternata, 100% privato."
    },
    "ar": {
      "title": "عداد الرموز ومقدّر التكلفة",
      "description": "قم بعدّ الرموز (Tokens) باستخدام أدوات النمذجة SOTA وتقدير تكاليف واجهة برمجة التطبيقات (API) محلياً مع خصوصية 100%.",
      "metaDescription": "احسب الرموز وقدر تكاليف الـ API محلياً للنماذج الحديثة (GPT-5.5، o1، Claude 4.7، Gemini 2.5، LLaMA 4). حدود رموز مرئية متناوبة، 100% خاص."
    }
  },
  "html-to-jsx": {
    "es": {
      "title": "Convertidor de HTML a JSX",
      "description": "Convierta plantillas y propiedades HTML estándar en elementos JSX compatibles con React del lado del cliente.",
      "metaDescription": "Convierta HTML a React JSX al instante: gratis y privado. Traduzca automáticamente clases, propiedades, estilos en línea y etiquetas de cierre automático. Sin cargas al servidor."
    },
    "de": {
      "title": "HTML-zu-JSX-Konverter",
      "description": "Konvertieren Sie Standard-HTML-Vorlagen und -Eigenschaften clientseitig in React-kompatible JSX-Elemente.",
      "metaDescription": "HTML sofort in React JSX konvertieren – kostenlos und privat. Übersetzen Sie Klassen, Eigenschaften, Inline-Styles und selbstschließende Tags automatisch. Keine Server-Uploads."
    },
    "fr": {
      "title": "Convertisseur HTML en JSX",
      "description": "Convertissez des modèles et propriétés HTML standard en éléments JSX compatibles avec React côté client.",
      "metaDescription": "Convertissez HTML en React JSX instantanément – gratuit et privé. Traduisez automatiquement les classes, les propriétés, les styles en ligne et les balises auto-fermantes. Aucun téléchargement sur le serveur."
    },
    "pt": {
      "title": "Conversor de HTML para JSX",
      "description": "Converta modelos e propriedades HTML padrão em elementos JSX compatíveis com React no lado do cliente.",
      "metaDescription": "Converta HTML para React JSX instantaneamente — gratuito e privado. Traduza automaticamente classes, propriedades, estilos inline e tags de fechamento automático. Sem uploads no servidor."
    },
    "ja": {
      "title": "HTMLからJSXへの変換ツール",
      "description": "標準のHTMLテンプレートやプロパティを、クライアント側でReact対応のJSX要素に変換します。",
      "metaDescription": "HTMLをReact JSXに即座に変換します。無料、プライベート、サーバーへのアップロード不要。クラス、属性、インラインスタイル、自己完結型タグを自動で変換。"
    },
    "zh": {
      "title": "HTML 转 JSX 转换器",
      "description": "在客户端将标准 HTML 模板和属性转换为与 React 兼容的 JSX 元素。",
      "metaDescription": "立即将 HTML 转换为 React JSX — 免费且私密。自动转换 class、属性、内联样式和自闭合标签。无需上传服务器。"
    },
    "hi": {
      "title": "HTML से JSX कनवर्टर",
      "description": "क्लाइंट-साइड पर मानक HTML टेम्पलेट्स और प्रॉपर्टीज़ को React-संगत JSX तत्वों में बदलें।",
      "metaDescription": "HTML को तुरंत React JSX में बदलें - मुफ़्त और निजी। क्लास, प्रॉपर्टीज़, इनलाइन स्टाइल और सेल्फ़-क्लोज़िंग टैग्स को कनवर्ट करें। कोई सर्ver अपलोड नहीं।"
    },
    "it": {
      "title": "Convertitore da HTML a JSX",
      "description": "Converti modelli e proprietà HTML standard in elementi JSX compatibili con React lato client.",
      "metaDescription": "Converti HTML in React JSX all'istante: gratuito e privato. Traduci automaticamente classi, proprietà, stili inline e tag di chiusura automatica. Nessun caricamento sul server."
    },
    "ar": {
      "title": "محول HTML إلى JSX",
      "description": "تحويل قوالب وخصائص HTML القياسية إلى عناصر JSX متوافقة مع React محلياً في المتصفح.",
      "metaDescription": "حول HTML إلى React JSX فوراً - مجاني وخاص. ترجمة تلقائية للفئات (class)، الخصائص، الأنماط المضمنة (inline styles)، والوسوم ذاتية الإغلاق. بدون رفع للملفات."
    }
  },
  "web-scraper": {
    "es": {
      "title": "Lector de artículos inteligente",
      "description": "Lea, extraiga y convierta cualquier artículo web en un descuento limpio y sin distracciones.",
      "metaDescription": "Extraiga texto de cualquier sitio web de forma privada. Sin servidores, sin seguimiento. Un raspador web local 100% seguro y un lector de artículos inteligente."
    },
    "de": {
      "title": "Intelligenter Artikelleser",
      "description": "Lesen, extrahieren und konvertieren Sie jeden Webartikel in einen sauberen, ablenkungsfreien Markdown.",
      "metaDescription": "Extrahieren Sie privat Text von jeder Website. Keine Server, kein Tracking. Ein 100 % sicherer lokaler Web-Scraper und intelligenter Artikelleser."
    },
    "fr": {
      "title": "Lecteur d'articles intelligent",
      "description": "Lisez, extrayez et convertissez n'importe quel article Web en une démarque propre et sans distraction.",
      "metaDescription": "Extrayez le texte de n’importe quel site Web en privé. Pas de serveurs, pas de suivi. Un grattoir Web local 100 % sécurisé et un lecteur d'articles intelligent."
    },
    "pt": {
      "title": "Leitor de artigos inteligente",
      "description": "Leia, extraia e converta qualquer artigo da web em descontos limpos e sem distrações.",
      "metaDescription": "Extraia texto de qualquer site de forma privada. Sem servidores, sem rastreamento. Um web scraper local 100% seguro e um leitor inteligente de artigos."
    },
    "ja": {
      "title": "スマート記事リーダー",
      "description": "あらゆる Web 記事を読み、抽出し、クリーンで気を散らすことのないマークダウンに変換します。",
      "metaDescription": "あらゆる Web サイトから非公開でテキストを抽出します。サーバーも追跡もありません。 100% 安全なローカル Web スクレーパーおよびスマートな記事リーダー。"
    },
    "zh": {
      "title": "智能文章阅读器",
      "description": "阅读、提取任何网络文章并将其转换为干净、无干扰的 Markdown。",
      "metaDescription": "从任何网站私下提取文本。没有服务器，没有跟踪。 100% 安全的本地网络抓取工具和智能文章阅读器。"
    },
    "hi": {
      "title": "स्मार्ट आर्टिकल रीडर",
      "description": "किसी भी वेब आलेख को पढ़ें, निकालें और उसे स्वच्छ, विकर्षण-मुक्त मार्कडाउन में परिवर्तित करें।",
      "metaDescription": "किसी भी वेबसाइट से निजी तौर पर टेक्स्ट निकालें। कोई सर्वर नहीं, कोई ट्रैकिंग नहीं. 100% सुरक्षित स्थानीय वेब स्क्रैपर और स्मार्ट आर्टिकल रीडर।"
    },
    "it": {
      "title": "Lettore di articoli intelligente",
      "description": "Leggi, estrai e converti qualsiasi articolo web in un markdown pulito e privo di distrazioni.",
      "metaDescription": "Estrai testo da qualsiasi sito web in privato. Nessun server, nessun tracciamento. Uno scraper web locale sicuro al 100% e un lettore di articoli intelligente."
    },
    "ar": {
      "title": "قارئ المادة الذكية",
      "description": "قراءة واستخراج وتحويل أي مقالة على شبكة الإنترنت إلى تخفيض السعر نظيف وخالي من التشتيت.",
      "metaDescription": "استخراج النص من أي موقع على شبكة الإنترنت. لا خوادم، لا تتبع. أداة استخراج صفحات ويب محلية آمنة بنسبة 100% وقارئ مقالات ذكي."
    }
  },
  "youtube-transcript": {
    "es": {
      "title": "Extractor de transcripciones de YouTube",
      "description": "Extraiga subtítulos y transcripciones de cualquier vídeo de YouTube al instante y guárdelos como SRT o texto.",
      "metaDescription": "Descargador gratuito de subtítulos y transcripciones de YouTube en línea. Evite los bloques de forma segura utilizando nuestra extensión complementaria para extraer texto localmente."
    },
    "de": {
      "title": "YouTube-Transkript-Extraktor",
      "description": "Extrahieren Sie Untertitel und Transkripte sofort aus jedem YouTube-Video und speichern Sie sie als SRT oder Text.",
      "metaDescription": "Kostenloser Online-Downloader für YouTube-Untertitel und Transkripte. Umgehen Sie Blöcke sicher mit unserer Begleiterweiterung, um Text lokal zu extrahieren."
    },
    "fr": {
      "title": "Extracteur de transcription YouTube",
      "description": "Extrayez instantanément les légendes et les transcriptions de n'importe quelle vidéo YouTube et enregistrez-les au format SRT ou texte.",
      "metaDescription": "Téléchargeur gratuit de sous-titres et de transcriptions YouTube en ligne. Contournez les blocages en toute sécurité à l’aide de notre extension compagnon pour extraire du texte localement."
    },
    "pt": {
      "title": "Extrator de transcrição do YouTube",
      "description": "Extraia legendas e transcrições de qualquer vídeo do YouTube instantaneamente e salve como SRT ou texto.",
      "metaDescription": "Downloader online gratuito de legendas e transcrições do YouTube. Ignore bloqueios com segurança usando nossa extensão complementar para extrair texto localmente."
    },
    "ja": {
      "title": "YouTube トランスクリプト抽出ツール",
      "description": "YouTube 動画からキャプションとトランスクリプトを即座に抽出し、SRT またはテキストとして保存します。",
      "metaDescription": "無料のオンライン YouTube 字幕およびトランスクリプト ダウンローダー。コンパニオン拡張機能を使用してブロックを安全にバイパスし、テキストをローカルに抽出します。"
    },
    "zh": {
      "title": "YouTube 转录提取器",
      "description": "立即从任何 YouTube 视频中提取字幕和文字记录并保存为 SRT 或文本。",
      "metaDescription": "免费在线 YouTube 字幕和文字记录下载器。使用我们的配套扩展安全地绕过阻止，在本地提取文本。"
    },
    "hi": {
      "title": "यूट्यूब ट्रांस्क्रिप्ट एक्सट्रैक्टर",
      "description": "किसी भी यूट्यूब वीडियो से तुरंत कैप्शन और ट्रांसक्रिप्ट निकालें और एसआरटी या टेक्स्ट के रूप में सहेजें।",
      "metaDescription": "मुफ़्त ऑनलाइन YouTube उपशीर्षक और प्रतिलेख डाउनलोडर। स्थानीय रूप से पाठ निकालने के लिए हमारे सहयोगी एक्सटेंशन का उपयोग करके सुरक्षित रूप से बायपास ब्लॉक करें।"
    },
    "it": {
      "title": "Estrattore di trascrizioni di YouTube",
      "description": "Estrai istantaneamente didascalie e trascrizioni da qualsiasi video di YouTube e salva come SRT o testo.",
      "metaDescription": "Downloader online gratuito di sottotitoli e trascrizioni per YouTube. Bypassa i blocchi in modo sicuro utilizzando la nostra estensione complementare per estrarre il testo localmente."
    },
    "ar": {
      "title": "يوتيوب نسخة النازع",
      "description": "استخرج التسميات التوضيحية والنصوص من أي فيديو على YouTube على الفور واحفظها بتنسيق SRT أو نص.",
      "metaDescription": "برنامج تنزيل الترجمة والنصوص مجانًا عبر الإنترنت من YouTube. تجاوز الكتل بشكل آمن باستخدام ملحقنا المصاحب لاستخراج النص محليًا."
    }
  },
  "resume-builder": {
    "es": {
      "title": "Creador de currículum profesional",
      "description": "Cree, obtenga una vista previa e imprima un currículum profesional impecable de varias páginas de forma nativa en su navegador.",
      "metaDescription": "Creador de currículums del lado del cliente 100% privado. Diseñe currículums de varias páginas impecables, profesionales y compatibles con ATS e imprima en PDF de forma nativa sin cargarlos en la nube."
    },
    "de": {
      "title": "Professioneller Lebenslaufersteller",
      "description": "Erstellen Sie einen makellosen, mehrseitigen professionellen Lebenslauf, zeigen Sie ihn in der Vorschau an und drucken Sie ihn nativ in Ihrem Browser aus.",
      "metaDescription": "100 % privater, kundenseitiger Lebenslaufersteller. Entwerfen Sie professionelle, ATS-freundliche, makellose mehrseitige Lebensläufe und drucken Sie sie nativ als PDF, ohne Cloud-Uploads."
    },
    "fr": {
      "title": "Générateur de CV professionnel",
      "description": "Créez, prévisualisez et imprimez un CV professionnel impeccable de plusieurs pages de manière native dans votre navigateur.",
      "metaDescription": "Générateur de CV 100 % privé côté client. Concevez des CV multipages professionnels, compatibles ATS et imprimez-les au format PDF de manière native sans téléchargement dans le cloud."
    },
    "pt": {
      "title": "Construtor de currículo profissional",
      "description": "Crie, visualize e imprima um currículo profissional impecável de várias páginas nativamente em seu navegador.",
      "metaDescription": "Construtor de currículos 100% privado do lado do cliente. Crie currículos de várias páginas profissionais, compatíveis com ATS e imprima em PDF nativamente, sem uploads na nuvem."
    },
    "ja": {
      "title": "プロの履歴書ビルダー",
      "description": "ブラウザーでネイティブの複数ページの職務経歴書を作成、プレビュー、印刷します。",
      "metaDescription": "100% プライベートのクライアント側の履歴書ビルダー。プロフェッショナルで ATS フレンドリーな、元の状態の複数ページの履歴書をデザインし、クラウドにアップロードせずにネイティブに PDF に印刷します。"
    },
    "zh": {
      "title": "专业简历制作者",
      "description": "在浏览器中本地构建、预览和打印原始的多页专业简历。",
      "metaDescription": "100% 私人客户端简历生成器。设计专业、ATS 友好、原始的多页简历并本地打印为 PDF，无需云上传。"
    },
    "hi": {
      "title": "पेशेवर बायोडाटा बिल्डर",
      "description": "अपने ब्राउज़र में मूल रूप से एक प्राचीन, बहु-पृष्ठ पेशेवर बायोडाटा बनाएं, पूर्वावलोकन करें और प्रिंट करें।",
      "metaDescription": "100% निजी क्लाइंट-साइड रेज़्युमे बिल्डर। पेशेवर डिज़ाइन, एटीएस-अनुकूल, प्राचीन बहु-पृष्ठ बायोडाटा और क्लाउड अपलोड के बिना मूल रूप से पीडीएफ में प्रिंट करें।"
    },
    "it": {
      "title": "Costruttore di curriculum professionale",
      "description": "Crea, visualizza in anteprima e stampa un curriculum professionale multipagina originale in modo nativo nel tuo browser.",
      "metaDescription": "Generatore di curriculum lato client privato al 100%. Progetta curriculum multipagina professionali, compatibili con ATS e intatti e stampa in PDF in modo nativo senza caricamenti nel cloud."
    },
    "ar": {
      "title": "منشئ السيرة الذاتية الاحترافي",
      "description": "يمكنك إنشاء سيرة ذاتية احترافية متعددة الصفحات ومعاينتها وطباعتها محليًا في متصفحك.",
      "metaDescription": "مُنشئ سيرة ذاتية خاص بنسبة 100% من جانب العميل. صمم سيرة ذاتية احترافية ومتعددة الصفحات وصديقة لـ ATS واطبعها إلى PDF محليًا بدون تحميلات على السحابة."
    }
  },
  "api-client": {
    "es": {
      "title": "Cliente API REST",
      "description": "Pruebe, depure y rastree las API REST de forma segura desde su navegador utilizando un cliente de red nativo avanzado.",
      "metaDescription": "Pruebe y depure las API REST directamente en su navegador. 100% privado, sin sincronización en la nube, evita CORS. Admite GET, POST, encabezados personalizados y solicitudes de host local."
    },
    "de": {
      "title": "REST-API-Client",
      "description": "Testen, debuggen und verfolgen Sie REST-APIs sicher von Ihrem Browser aus mit einem erweiterten nativen Netzwerk-Client.",
      "metaDescription": "Testen und debuggen Sie REST-APIs direkt in Ihrem Browser. 100 % privat, keine Cloud-Synchronisierung, umgeht CORS. Unterstützt GET, POST, benutzerdefinierte Header und Localhost-Anfragen."
    },
    "fr": {
      "title": "Client API REST",
      "description": "Testez, déboguez et tracez les API REST en toute sécurité depuis votre navigateur à l'aide d'un client réseau natif avancé.",
      "metaDescription": "Testez et déboguez les API REST directement dans votre navigateur. 100 % privé, pas de synchronisation cloud, contourne CORS. Prend en charge les requêtes GET, POST, les en-têtes personnalisés et localhost."
    },
    "pt": {
      "title": "Cliente API REST",
      "description": "Teste, depure e rastreie APIs REST com segurança em seu navegador usando um cliente de rede nativo avançado.",
      "metaDescription": "Teste e depure APIs REST diretamente no seu navegador. 100% privado, sem sincronização na nuvem, ignora CORS. Suporta GET, POST, cabeçalhos personalizados e solicitações de host local."
    },
    "ja": {
      "title": "REST APIクライアント",
      "description": "高度なネイティブ ネットワーク クライアントを使用して、ブラウザから REST API を安全にテスト、デバッグ、トレースします。",
      "metaDescription": "ブラウザで直接 REST API をテストおよびデバッグします。 100% プライベート、クラウド同期なし、CORS をバイパスします。 GET、POST、カスタム ヘッダー、および localhost リクエストをサポートします。"
    },
    "zh": {
      "title": "REST API 客户端",
      "description": "使用高级本机网络客户端从浏览器安全地测试、调试和跟踪 REST API。",
      "metaDescription": "直接在浏览器中测试和调试 REST API。 100% 私有，无云同步，绕过 CORS。支持 GET、POST、自定义标头和本地主机请求。"
    },
    "hi": {
      "title": "रेस्ट एपीआई क्लाइंट",
      "description": "उन्नत देशी नेटवर्क क्लाइंट का उपयोग करके अपने ब्राउज़र से REST API का सुरक्षित रूप से परीक्षण, डीबग और ट्रेस करें।",
      "metaDescription": "सीधे अपने ब्राउज़र में REST API का परीक्षण और डीबग करें। 100% निजी, कोई क्लाउड सिंकिंग नहीं, CORS को बायपास करता है। GET, POST, कस्टम हेडर और लोकलहोस्ट अनुरोधों का समर्थन करता है।"
    },
    "it": {
      "title": "Client API REST",
      "description": "Testa, esegui il debug e traccia le API REST in modo sicuro dal tuo browser utilizzando un client di rete nativo avanzato.",
      "metaDescription": "Testa ed esegui il debug delle API REST direttamente nel tuo browser. 100% privato, nessuna sincronizzazione cloud, ignora CORS. Supporta GET, POST, intestazioni personalizzate e richieste localhost."
    },
    "ar": {
      "title": "عميل REST API",
      "description": "اختبار وتصحيح وتتبع واجهات برمجة تطبيقات REST بشكل آمن من متصفحك باستخدام عميل شبكة أصلي متقدم.",
      "metaDescription": "اختبار وتصحيح واجهات برمجة تطبيقات REST مباشرة في متصفحك. خاص بنسبة 100%، ولا توجد مزامنة سحابية، ويتجاوز CORS. يدعم GET وPOST والرؤوس المخصصة وطلبات المضيف المحلي."
    }
  }
};

export function getLocalizedTool(tool: any, lang: string | undefined): any {
  if (!lang || lang === "en") return tool;
  const translation = TOOL_TRANSLATIONS[tool.id]?.[lang];
  if (translation) {
    return { ...tool, ...translation };
  }
  return tool;
}

export function getAlternateLanguages(path: string, allowedLocales?: string[]): Record<string, string> {
  const languages: Record<string, string> = {};
  const baseUrl = "https://zerowebtools.com";
  languages["en"] = `${baseUrl}${path}`;
  languages["x-default"] = `${baseUrl}${path}`;
  
  const targetLocales = allowedLocales || LOCALES.filter(l => l !== "en");
  
  targetLocales.filter(l => l !== "en").forEach(lang => {
    languages[lang] = `${baseUrl}/${lang}${path}`;
  });
  
  return languages;
}

