export type SupportedLocale = "en" | "es" | "de" | "fr" | "pt";

export const LOCALES: SupportedLocale[] = ["en", "es", "de", "fr", "pt"];

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
  savedTools: string;
  spotlightUtilities: string;
  guidesResources: string;
  privacy: string;
  terms: string;
  launch: string;
  comingSoon: string;
  toolFilter: string;
  privateBadge: string;
  faqTitle: string;
  faqSubtitle: string;
}

const DICTIONARIES: Record<SupportedLocale, TranslationDictionary> = {
  en: {
    homeTitle: "Simple, Private Web Tools Right in Your Browser.",
    homeDesc: "Free, fast, and completely secure tools to edit PDFs, convert formats, check MRR growth, and resize images. All tools run entirely locally on your device so your files never leave your computer.",
    searchPlaceholder: "Search for a tool (e.g. merge pdf)...",
    exploreAllTools: "Explore All Tools",
    allTools: "All Tools",
    pdfTools: "PDF Tools",
    imageTools: "Image Tools",
    developerTools: "Developer Tools",
    generators: "Generators",
    textTools: "Text Tools",
    calculators: "Calculators",
    savedTools: "Your Saved Tools",
    spotlightUtilities: "Spotlight Utilities",
    guidesResources: "Guides & Resources",
    privacy: "Privacy",
    terms: "Terms",
    launch: "Launch",
    comingSoon: "Coming",
    toolFilter: "Tool Filter",
    privateBadge: "100% Private • free online tools compiled",
    faqTitle: "Frequently Asked Questions",
    faqSubtitle: "Everything you need to know about ZeroWebTools privacy and usage."
  },
  es: {
    homeTitle: "Herramientas web simples y privadas en su navegador.",
    homeDesc: "Herramientas gratuitas, rápidas y seguras para editar PDF, convertir formatos y cambiar el tamaño de imágenes. Todo se ejecuta localmente en su dispositivo sin subir archivos.",
    searchPlaceholder: "Buscar una herramienta (ej. unir pdf)...",
    exploreAllTools: "Explorar Todas",
    allTools: "Todas",
    pdfTools: "Herramientas PDF",
    imageTools: "Imágenes",
    developerTools: "Desarrolladores",
    generators: "Generadores",
    textTools: "Texto",
    calculators: "Calculadoras",
    savedTools: "Tus Herramientas Guardadas",
    spotlightUtilities: "Destacadas",
    guidesResources: "Guías y Recursos",
    privacy: "Privacidad",
    terms: "Términos",
    launch: "Abrir",
    comingSoon: "Próximamente",
    toolFilter: "Filtro",
    privateBadge: "100% Privado • herramientas gratuitas",
    faqTitle: "Preguntas Frecuentes",
    faqSubtitle: "Todo lo que necesita saber sobre la privacidad de ZeroWebTools."
  },
  de: {
    homeTitle: "Einfache, private Web-Tools in Ihrem Browser.",
    homeDesc: "Kostenlose, schnelle und sichere Tools zum Bearbeiten von PDFs, Konvertieren von Formaten und Ändern der Bildgröße. Alles läuft lokal ohne Datei-Uploads.",
    searchPlaceholder: "Nach einem Tool suchen (z.B. PDF zusammenfügen)...",
    exploreAllTools: "Alle Tools entdecken",
    allTools: "Alle Tools",
    pdfTools: "PDF-Tools",
    imageTools: "Bild-Tools",
    developerTools: "Entwickler-Tools",
    generators: "Generatoren",
    textTools: "Text-Tools",
    calculators: "Rechner",
    savedTools: "Gespeicherte Tools",
    spotlightUtilities: "Im Rampenlicht",
    guidesResources: "Anleitungen",
    privacy: "Datenschutz",
    terms: "Bedingungen",
    launch: "Starten",
    comingSoon: "Demnächst",
    toolFilter: "Filter",
    privateBadge: "100% Privat • kostenlose Tools",
    faqTitle: "Häufig gestellte Fragen",
    faqSubtitle: "Alles, was Sie über die ZeroWebTools wissen müssen."
  },
  fr: {
    homeTitle: "Des outils web simples et privés dans votre navigateur.",
    homeDesc: "Outils gratuits, rapides et sécurisés pour éditer des PDF, convertir des formats et redimensionner des images. Tout fonctionne localement sans téléchargement.",
    searchPlaceholder: "Rechercher un outil (ex: fusionner pdf)...",
    exploreAllTools: "Explorer Tous Les Outils",
    allTools: "Tous",
    pdfTools: "Outils PDF",
    imageTools: "Images",
    developerTools: "Développeurs",
    generators: "Générateurs",
    textTools: "Texte",
    calculators: "Calculatrices",
    savedTools: "Vos Outils Sauvegardés",
    spotlightUtilities: "À La Une",
    guidesResources: "Guides et Ressources",
    privacy: "Confidentialité",
    terms: "Conditions",
    launch: "Lancer",
    comingSoon: "Bientôt",
    toolFilter: "Filtre",
    privateBadge: "100% Privé • outils gratuits",
    faqTitle: "Foire Aux Questions",
    faqSubtitle: "Tout ce que vous devez savoir sur ZeroWebTools."
  },
  pt: {
    homeTitle: "Ferramentas web simples e privadas no seu navegador.",
    homeDesc: "Ferramentas gratuitas, rápidas e seguras para editar PDFs, converter formatos e redimensionar imagens. Tudo roda localmente no seu dispositivo.",
    searchPlaceholder: "Pesquisar uma ferramenta (ex: juntar pdf)...",
    exploreAllTools: "Explorar Todas",
    allTools: "Todas",
    pdfTools: "Ferramentas PDF",
    imageTools: "Imagens",
    developerTools: "Desenvolvedores",
    generators: "Geradores",
    textTools: "Texto",
    calculators: "Calculadoras",
    savedTools: "Ferramentas Salvas",
    spotlightUtilities: "Destaques",
    guidesResources: "Guias e Recursos",
    privacy: "Privacidade",
    terms: "Termos",
    launch: "Abrir",
    comingSoon: "Em Breve",
    toolFilter: "Filtro",
    privateBadge: "100% Privado • ferramentas gratuitas",
    faqTitle: "Perguntas Frequentes",
    faqSubtitle: "Tudo o que você precisa saber sobre o ZeroWebTools."
  }
};

export function getTranslations(lang: string | undefined): TranslationDictionary {
  const safeLang = (lang as SupportedLocale) || "en";
  return DICTIONARIES[safeLang] || DICTIONARIES["en"];
}

// Map to handle dynamic translations for the 4 Spotlight tools to show how it's done for SEO
const TOOL_TRANSLATIONS: Record<string, Record<string, { title: string; description: string; metaDescription?: string }>> = {
  "pdf-merge": {
    es: { title: "Unir PDF", description: "Combina varios PDF en un solo documento.", metaDescription: "Une archivos PDF gratis y sin conexión." },
    de: { title: "PDF Zusammenfügen", description: "Mehrere PDFs zu einem Dokument kombinieren.", metaDescription: "PDF-Dateien kostenlos und offline zusammenführen." },
    fr: { title: "Fusionner PDF", description: "Combinez plusieurs PDF en un seul document.", metaDescription: "Fusionner des fichiers PDF gratuitement." },
    pt: { title: "Juntar PDF", description: "Combine vários PDFs em um único documento.", metaDescription: "Juntar arquivos PDF grátis." }
  },
  "heic-to-jpg": {
    es: { title: "Convertir HEIC a JPG", description: "Convierte fotos Apple HEIC a formato estándar JPG o PNG al instante en lote." },
    de: { title: "HEIC in JPG konvertieren", description: "Konvertieren Sie Apple HEIC-Fotos sofort stapelweise in das Standard-JPG- oder PNG-Format." },
    fr: { title: "Convertir HEIC en JPG", description: "Convertissez instantanément des photos Apple HEIC au format standard JPG ou PNG par lots." },
    pt: { title: "Converter HEIC para JPG", description: "Converta fotos Apple HEIC para o formato padrão JPG ou PNG instantaneamente em lote." }
  },
  "json-formatter": {
    es: { title: "Formateador JSON", description: "Valide, embellezca y minimice datos JSON con el explorador de estructura de árbol en tiempo real." },
    de: { title: "JSON-Formatierer", description: "JSON-Daten validieren, verschönern und minimieren mit dem Echtzeit-Baumstruktur-Explorer." },
    fr: { title: "Formateur JSON", description: "Validez, embellissez et minifiez les données JSON avec un explorateur d'arborescence en temps réel." },
    pt: { title: "Formatador JSON", description: "Valide, embeleze e minimize dados JSON com o explorador de estrutura de árvore em tempo real." }
  },
  "case-converter": {
    es: { title: "Convertidor de Mayúsculas", description: "Transforme convenciones de nomenclatura entre camelCase, snake_case, kebab-case y más." },
    de: { title: "Groß-/Kleinschreibung", description: "Transformieren Sie Namenskonventionen zwischen camelCase, snake_case, kebab-case und mehr." },
    fr: { title: "Convertisseur de Cas", description: "Transformez les conventions de dénomination entre camelCase, snake_case, kebab-case, et plus." },
    pt: { title: "Conversor de Maiúsculas", description: "Transforme convenções de nomenclatura entre camelCase, snake_case, kebab-case e muito mais." }
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
