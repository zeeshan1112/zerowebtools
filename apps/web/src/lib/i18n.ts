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
,

  "pdf-split": {
    es: { title: "Dividir PDF", description: "Extrae páginas de documentos PDF.", metaDescription: "Extrae páginas de tu PDF al instante, gratis y privado." },
    de: { title: "PDF Teilen", description: "Seiten aus PDF-Dokumenten extrahieren.", metaDescription: "PDF-Seiten sofort extrahieren - kostenlos und privat." },
    fr: { title: "Diviser PDF", description: "Extraire des pages de documents PDF.", metaDescription: "Extraire des pages de votre PDF instantanément, gratuit et privé." },
    pt: { title: "Dividir PDF", description: "Extrair páginas de documentos PDF.", metaDescription: "Extrair páginas de PDF instantaneamente - grátis e privado." }
  },
  "pdf-compress": {
    es: { title: "Comprimir PDF", description: "Reduce el tamaño del PDF optimizando objetos.", metaDescription: "Reduce el tamaño de tu PDF gratis, rápido y privado." },
    de: { title: "PDF Komprimieren", description: "Reduzieren Sie die PDF-Dateigröße.", metaDescription: "PDF-Dateien kostenlos, schnell und privat verkleinern." },
    fr: { title: "Compresser PDF", description: "Réduire la taille du fichier PDF.", metaDescription: "Réduisez la taille de votre PDF gratuitement et en privé." },
    pt: { title: "Comprimir PDF", description: "Reduza o tamanho do arquivo PDF.", metaDescription: "Reduza o tamanho do PDF rapidamente, grátis e privado." }
  },
  "pdf-rotate": {
    es: { title: "Rotar PDF", description: "Gira las páginas del PDF.", metaDescription: "Rota páginas PDF al instante. Gratis y privado." },
    de: { title: "PDF Drehen", description: "PDF-Seiten sofort drehen.", metaDescription: "PDF-Seiten sofort drehen. Kostenlos und privat." },
    fr: { title: "Faire pivoter PDF", description: "Faire pivoter les pages PDF instantanément.", metaDescription: "Faites pivoter les pages PDF instantanément. Gratuit et privé." },
    pt: { title: "Girar PDF", description: "Gire páginas PDF instantaneamente.", metaDescription: "Gire páginas PDF instantaneamente. Grátis e privado." }
  },
  "pdf-to-jpg": {
    es: { title: "PDF a JPG", description: "Convierte PDF a imágenes JPG.", metaDescription: "Convierte páginas PDF a imágenes JPG de alta calidad." },
    de: { title: "PDF zu JPG", description: "Konvertieren Sie PDF-Seiten in JPG-Bilder.", metaDescription: "Konvertieren Sie PDF-Seiten in hochwertige JPG-Bilder." },
    fr: { title: "PDF en JPG", description: "Convertir un PDF en images JPG.", metaDescription: "Convertir des pages PDF en images JPG de haute qualité." },
    pt: { title: "PDF para JPG", description: "Converter PDF em imagens JPG.", metaDescription: "Converta páginas PDF em imagens JPG de alta qualidade." }
  },
  "jpg-to-pdf": {
    es: { title: "JPG a PDF", description: "Convierte imágenes JPG a PDF.", metaDescription: "Convierte imágenes JPG en un PDF. Gratis y privado." },
    de: { title: "JPG zu PDF", description: "Konvertieren Sie JPG-Bilder in PDF.", metaDescription: "Konvertieren Sie JPG-Bilder in PDF. Kostenlos und privat." },
    fr: { title: "JPG en PDF", description: "Convertir des images JPG en PDF.", metaDescription: "Convertissez des images JPG en un PDF. Gratuit et privé." },
    pt: { title: "JPG para PDF", description: "Converter imagens JPG em PDF.", metaDescription: "Converta imagens JPG em um PDF limpo. Grátis e privado." }
  },
  "pdf-protect": {
    es: { title: "Proteger PDF", description: "Añade encriptación con contraseña al PDF.", metaDescription: "Protege tu PDF con contraseña al instante." },
    de: { title: "PDF Schützen", description: "Passwortverschlüsselung hinzufügen.", metaDescription: "PDF-Dokumente mit Passwort schützen. Kostenlos und privat." },
    fr: { title: "Protéger PDF", description: "Ajouter un mot de passe de cryptage.", metaDescription: "Protégez votre PDF avec un mot de passe." },
    pt: { title: "Proteger PDF", description: "Adicionar senha e criptografia.", metaDescription: "Proteja seu PDF com senha em segundos." }
  },
  "pdf-watermark": {
    es: { title: "Añadir Marca de Agua", description: "Estampa marcas de agua en PDFs.", metaDescription: "Estampa marcas de agua en tu PDF gratis." },
    de: { title: "Wasserzeichen", description: "Wasserzeichen zu PDFs hinzufügen.", metaDescription: "Wasserzeichen auf PDF stempeln, kostenlos und privat." },
    fr: { title: "Filigrane", description: "Ajouter un filigrane au PDF.", metaDescription: "Ajoutez des filigranes sur votre PDF gratuitement." },
    pt: { title: "Marca d'água", description: "Adicionar marca d'água ao PDF.", metaDescription: "Insira marcas d'água no seu PDF grátis." }
  },
  "pdf-page-numbers": {
    es: { title: "Numerar Páginas", description: "Añade números de página al PDF.", metaDescription: "Numerar páginas PDF. Gratis, privado y rápido." },
    de: { title: "Seitenzahlen", description: "Seitenzahlen zu PDFs hinzufügen.", metaDescription: "Seitenzahlen in PDF einfügen. Kostenlos und privat." },
    fr: { title: "Numérotation", description: "Ajouter des numéros de page.", metaDescription: "Ajoutez des numéros de page à n'importe quel PDF." },
    pt: { title: "Numerar Páginas", description: "Adicionar números de página ao PDF.", metaDescription: "Numere páginas PDF instantaneamente." }
  },
  "pdf-organize": {
    es: { title: "Organizar PDF", description: "Reordena o elimina páginas PDF.", metaDescription: "Reordena páginas de tu PDF visualmente. Gratis." },
    de: { title: "PDF Organisieren", description: "PDF-Seiten neu anordnen.", metaDescription: "PDF-Seiten visuell neu anordnen oder löschen." },
    fr: { title: "Organiser PDF", description: "Réorganiser ou supprimer des pages.", metaDescription: "Organisez les pages de votre PDF visuellement." },
    pt: { title: "Organizar PDF", description: "Reordenar ou excluir páginas PDF.", metaDescription: "Organize páginas de PDF arrastando e soltando." }
  },
  "pdf-unlock": {
    es: { title: "Desbloquear PDF", description: "Elimina la contraseña de un PDF.", metaDescription: "Desbloquea archivos PDF gratis." },
    de: { title: "PDF Entsperren", description: "Passwortschutz entfernen.", metaDescription: "PDF Passwortschutz sofort entfernen." },
    fr: { title: "Déverrouiller PDF", description: "Supprimer le mot de passe d'un PDF.", metaDescription: "Déverrouillez les fichiers PDF gratuitement." },
    pt: { title: "Desbloquear PDF", description: "Remover senha do PDF.", metaDescription: "Desbloqueie arquivos PDF instantaneamente." }
  },
  "pdf-sign": {
    es: { title: "Firmar PDF", description: "Firma documentos PDF offline.", metaDescription: "Firma documentos PDF de forma segura." },
    de: { title: "PDF Unterschreiben", description: "PDF-Dokumente signieren.", metaDescription: "Unterschreiben Sie PDF-Dokumente kostenlos." },
    fr: { title: "Signer PDF", description: "Signer des documents PDF.", metaDescription: "Signez des documents PDF en toute sécurité." },
    pt: { title: "Assinar PDF", description: "Assinar documentos PDF offline.", metaDescription: "Assine documentos PDF de forma segura e privada." }
  },
  "pdf-crop": {
    es: { title: "Recortar PDF", description: "Recorta márgenes de PDF.", metaDescription: "Recorta márgenes de páginas PDF gratis." },
    de: { title: "PDF Zuschneiden", description: "PDF-Ränder zuschneiden.", metaDescription: "PDF-Seitenränder visuell zuschneiden." },
    fr: { title: "Recadrer PDF", description: "Recadrer les marges du PDF.", metaDescription: "Recadrez les marges de votre PDF." },
    pt: { title: "Recortar PDF", description: "Recortar margens do PDF.", metaDescription: "Recorte as margens das páginas PDF visualmente." }
  },
  "pdf-to-text": {
    es: { title: "Extraer Texto de PDF", description: "Convierte PDF a Texto sin formato.", metaDescription: "Extrae texto de documentos PDF al instante." },
    de: { title: "PDF zu Text", description: "Text aus PDF-Dokumenten extrahieren.", metaDescription: "Text aus PDFs schnell extrahieren." },
    fr: { title: "PDF en Texte", description: "Convertir PDF en texte.", metaDescription: "Extraire du texte à partir de documents PDF." },
    pt: { title: "Extrair Texto do PDF", description: "Converter PDF para Texto.", metaDescription: "Extraia texto de documentos PDF instantaneamente." }
  },
  "word-counter": {
    es: { title: "Contador de Palabras", description: "Cuenta palabras y caracteres.", metaDescription: "Contador de palabras privado con estadísticas SEO." },
    de: { title: "Wörter Zählen", description: "Zählt Wörter und Zeichen.", metaDescription: "Wortzähler mit SEO-Statistiken. Kostenlos." },
    fr: { title: "Compteur de Mots", description: "Compte les mots et caractères.", metaDescription: "Compteur de mots privé avec statistiques." },
    pt: { title: "Contador de Palavras", description: "Contar palavras e caracteres.", metaDescription: "Contador de palavras com estatísticas SEO." }
  },
  "text-cleaner": {
    es: { title: "Limpiador de Texto", description: "Limpia y da formato al texto.", metaDescription: "Formatea, ordena y busca texto. 100% privado." },
    de: { title: "Textbereiniger", description: "Text bereinigen und formatieren.", metaDescription: "Formatieren, sortieren und durchsuchen Sie Text." },
    fr: { title: "Nettoyeur de Texte", description: "Nettoie et formate le texte.", metaDescription: "Formatez, triez et nettoyez votre texte." },
    pt: { title: "Limpador de Texto", description: "Limpar e formatar texto.", metaDescription: "Formate, ordene e pesquise texto localmente." }
  },
  "voice-dictator": {
    es: { title: "Dictado por Voz", description: "Dicta texto usando la voz.", metaDescription: "Dictado por voz nativo en tu navegador." },
    de: { title: "Sprachdiktat", description: "Text per Sprache diktieren.", metaDescription: "Sprachdiktat im Browser ohne Server." },
    fr: { title: "Dictée Vocale", description: "Dictez du texte avec la voix.", metaDescription: "Dictée vocale native dans votre navigateur." },
    pt: { title: "Ditado por Voz", description: "Ditar texto usando a voz.", metaDescription: "Ditado por voz nativo no seu navegador." }
  },
  "markdown-converter": {
    es: { title: "Convertidor Markdown", description: "Convierte Markdown a HTML.", metaDescription: "Convierte entre Markdown y HTML al instante." },
    de: { title: "Markdown Konverter", description: "Markdown zu HTML konvertieren.", metaDescription: "Konvertieren Sie Markdown sofort in HTML." },
    fr: { title: "Convertisseur Markdown", description: "Convertir Markdown en HTML.", metaDescription: "Convertir entre Markdown et HTML instantanément." },
    pt: { title: "Conversor Markdown", description: "Converter Markdown para HTML.", metaDescription: "Converta de Markdown para HTML em segundos." }
  },
  "random-picker": {
    es: { title: "Selector Aleatorio", description: "Mezcla listas y elige al azar.", metaDescription: "Mezclador de listas aleatorio y sorteos." },
    de: { title: "Zufallsauswahl", description: "Listen mischen und zufällig auswählen.", metaDescription: "Listen mischen und Gewinner auslosen." },
    fr: { title: "Sélecteur Aléatoire", description: "Mélangez des listes et choisissez au hasard.", metaDescription: "Mélangeur de listes et générateur de tirage." },
    pt: { title: "Sorteio Aleatório", description: "Embaralhar listas e sortear.", metaDescription: "Misture listas e escolha itens aleatórios." }
  },
  "diff-checker": {
    es: { title: "Comparador de Código", description: "Compara textos de forma visual.", metaDescription: "Compara diferencias de texto o código (Diff)." },
    de: { title: "Diff-Checker", description: "Text visuell vergleichen.", metaDescription: "Text- und Codeunterschiede vergleichen (Diff)." },
    fr: { title: "Vérificateur de Différences", description: "Comparer du texte visuellement.", metaDescription: "Comparez les différences de texte ou code." },
    pt: { title: "Comparador de Código", description: "Comparar texto visualmente.", metaDescription: "Compare diferenças de texto ou código." }
  },
  "jwt-debugger": {
    es: { title: "Depurador JWT", description: "Decodifica tokens JWT localmente.", metaDescription: "Decodifica y depura JSON Web Tokens gratis." },
    de: { title: "JWT-Debugger", description: "JWT-Tokens lokal decodieren.", metaDescription: "JSON Web Tokens lokal decodieren und prüfen." },
    fr: { title: "Débogueur JWT", description: "Décoder les jetons JWT localement.", metaDescription: "Décodez les JWT localement en toute sécurité." },
    pt: { title: "Depurador JWT", description: "Decodificar tokens JWT localmente.", metaDescription: "Decodifique e analise JSON Web Tokens." }
  },
  "regex-tester": {
    es: { title: "Validador de Regex", description: "Prueba expresiones regulares.", metaDescription: "Prueba y depura Expresiones Regulares en tu navegador." },
    de: { title: "Regex-Tester", description: "Reguläre Ausdrücke testen.", metaDescription: "Testen Sie reguläre Ausdrücke im Browser." },
    fr: { title: "Testeur Regex", description: "Tester des expressions régulières.", metaDescription: "Testez les expressions régulières instantanément." },
    pt: { title: "Testador Regex", description: "Testar expressões regulares.", metaDescription: "Teste e valide Expressões Regulares." }
  },
  "sql-formatter": {
    es: { title: "Formateador SQL", description: "Da formato y limpieza a SQL.", metaDescription: "Formatea consultas SQL y embellece tu código." },
    de: { title: "SQL Formatierer", description: "SQL formatieren und bereinigen.", metaDescription: "SQL-Abfragen formatieren und Code verschönern." },
    fr: { title: "Formateur SQL", description: "Formater et nettoyer le SQL.", metaDescription: "Formatez et embellissez vos requêtes SQL." },
    pt: { title: "Formatador SQL", description: "Formatar e embelezar consultas SQL.", metaDescription: "Formate e embeleze código SQL grátis." }
  },
  "base64-encoder": {
    es: { title: "Codificador Base64", description: "Convierte Base64 a texto o viceversa.", metaDescription: "Codifica archivos a Base64 sin subir al servidor." },
    de: { title: "Base64 Encoder", description: "Base64 in Text konvertieren.", metaDescription: "Codieren Sie Dateien offline in Base64." },
    fr: { title: "Encodeur Base64", description: "Convertir Base64 en texte.", metaDescription: "Encodez des fichiers en Base64 sans serveur." },
    pt: { title: "Codificador Base64", description: "Converter Base64 para texto.", metaDescription: "Codifique texto ou arquivos para Base64 grátis." }
  },
  "url-encoder": {
    es: { title: "Codificador de URL", description: "Codifica o decodifica parámetros URL.", metaDescription: "Codifica y decodifica URLs con un editor de parámetros." },
    de: { title: "URL Encoder", description: "URL-Parameter codieren/decodieren.", metaDescription: "URLs codieren und Parameter im Raster bearbeiten." },
    fr: { title: "Encodeur URL", description: "Encoder/décoder des paramètres URL.", metaDescription: "Encodez et décodez les URL." },
    pt: { title: "Codificador URL", description: "Codificar ou decodificar parâmetros URL.", metaDescription: "Codifique e decodifique URLs visualmente." }
  },
  "file-hasher": {
    es: { title: "Generador de Hashes", description: "Calcula hashes MD5, SHA-256.", metaDescription: "Calcula el Hash MD5, SHA256 de archivos locales." },
    de: { title: "Datei-Hasher", description: "MD5, SHA-256 Hashes berechnen.", metaDescription: "Berechnen Sie MD5, SHA-256 Hashes lokal." },
    fr: { title: "Générateur de Hashes", description: "Calculer les hachages de fichiers.", metaDescription: "Calculez le hachage de vos fichiers (MD5, SHA256)." },
    pt: { title: "Gerador de Hash", description: "Calcular hashes MD5, SHA-256.", metaDescription: "Gere Hash MD5 e SHA256 de arquivos localmente." }
  },
  "password-generator": {
    es: { title: "Generador de Contraseñas", description: "Crea contraseñas seguras.", metaDescription: "Generador de contraseñas seguras y fuertes." },
    de: { title: "Passwort-Generator", description: "Sichere Passwörter erstellen.", metaDescription: "Generieren Sie starke, sichere Passwörter lokal." },
    fr: { title: "Générateur de Mot de Passe", description: "Créer des mots de passe sécurisés.", metaDescription: "Créez des mots de passe sécurisés et forts." },
    pt: { title: "Gerador de Senha", description: "Criar senhas seguras.", metaDescription: "Gerador de senhas aleatórias e seguras." }
  },
  "css-box-shadow": {
    es: { title: "Generador CSS Box-Shadow", description: "Crea sombras CSS interactivas.", metaDescription: "Generador visual de sombras (box-shadow) CSS." },
    de: { title: "CSS Box-Shadow Generator", description: "CSS Schatten interaktiv erstellen.", metaDescription: "CSS-Schatten visuell generieren." },
    fr: { title: "Générateur CSS Box-Shadow", description: "Créer des ombres CSS.", metaDescription: "Générateur visuel d'ombres CSS." },
    pt: { title: "Gerador CSS Box-Shadow", description: "Criar sombras CSS interativas.", metaDescription: "Gerador visual de CSS box-shadow grátis." }
  },
  "unix-timestamp-converter": {
    es: { title: "Convertidor Unix Timestamp", description: "Convierte Unix time a fechas.", metaDescription: "Convertidor de Timestamp de Unix a formato Fecha." },
    de: { title: "Unix Timestamp Konverter", description: "Unix-Zeit in Datum umwandeln.", metaDescription: "Unix-Timestamp in Datum formatieren." },
    fr: { title: "Convertisseur Unix Timestamp", description: "Convertir l'heure Unix en dates.", metaDescription: "Convertisseur de Timestamp Unix en Date." },
    pt: { title: "Conversor Unix Timestamp", description: "Converter tempo Unix para datas.", metaDescription: "Converta Unix timestamp para data humana." }
  },
  "cron-generator": {
    es: { title: "Generador de Cron", description: "Crea y analiza expresiones Cron.", metaDescription: "Generador y validador de expresiones CRON en español." },
    de: { title: "Cron-Generator", description: "Cron-Ausdrücke erstellen und analysieren.", metaDescription: "Cron-Ausdrücke visuell erstellen und prüfen." },
    fr: { title: "Générateur Cron", description: "Créer et analyser des expressions Cron.", metaDescription: "Générateur et analyseur d'expressions Cron." },
    pt: { title: "Gerador Cron", description: "Criar e analisar expressões Cron.", metaDescription: "Gerador e validador de expressões CRON." }
  },
  "bulk-image-resizer": {
    es: { title: "Redimensionar Imágenes en Lote", description: "Redimensiona fotos en bloque.", metaDescription: "Redimensiona imágenes y fotos masivamente gratis." },
    de: { title: "Stapel-Bildgrößenänderung", description: "Mehrere Bilder gleichzeitig in der Größe ändern.", metaDescription: "Bilder in großen Mengen komprimieren und skalieren." },
    fr: { title: "Redimensionner Images en Lot", description: "Redimensionnez les photos en masse.", metaDescription: "Redimensionner et compresser des images en masse." },
    pt: { title: "Redimensionar Imagens em Lote", description: "Redimensionar fotos em lote.", metaDescription: "Redimensione fotos em lote gratuitamente." }
  },
  "image-cropper": {
    es: { title: "Recortar Imagen", description: "Recorta fotos e imágenes online.", metaDescription: "Recortar imágenes, avatares o redimensionar fotos visualmente." },
    de: { title: "Bildausschnitt", description: "Fotos und Bilder zuschneiden.", metaDescription: "Bilder visuell zuschneiden und optimieren." },
    fr: { title: "Recadrer Image", description: "Recadrer des photos et des images.", metaDescription: "Recadrez des images visuellement en toute sécurité." },
    pt: { title: "Recortar Imagem", description: "Recortar fotos e imagens online.", metaDescription: "Recorte imagens e avatares gratuitamente e com privacidade." }
  },
  "svg-minifier": {
    es: { title: "Minificador SVG", description: "Comprime código SVG y ahorra tamaño.", metaDescription: "Minifica tus archivos y código SVG online, reduciendo el tamaño." },
    de: { title: "SVG Minifier", description: "SVG-Code komprimieren.", metaDescription: "SVG-Dateien komprimieren und optimieren." },
    fr: { title: "Minificateur SVG", description: "Compresser le code SVG.", metaDescription: "Minifiez le code SVG pour réduire la taille des fichiers." },
    pt: { title: "Minificador SVG", description: "Comprimir código SVG.", metaDescription: "Otimize seus arquivos SVG localmente e sem custo." }
  },
  "qr-code-generator": {
    es: { title: "Generador Código QR", description: "Crea códigos QR personalizados.", metaDescription: "Generador de Códigos QR gratis con colores personalizados." },
    de: { title: "QR-Code Generator", description: "Benutzerdefinierte QR-Codes erstellen.", metaDescription: "QR-Codes kostenlos erstellen und anpassen." },
    fr: { title: "Générateur Code QR", description: "Créer des codes QR personnalisés.", metaDescription: "Générateur de code QR personnalisable, gratuit et sans limite." },
    pt: { title: "Gerador de Código QR", description: "Criar códigos QR personalizados.", metaDescription: "Gere códigos QR com cores e logotipos grátis." }
  },
  "saas-mrr": {
    es: { title: "Proyecciones SaaS MRR", description: "Calcula ingresos recurrentes (MRR).", metaDescription: "Modelo de ingresos recurrentes MRR para startups SaaS." },
    de: { title: "SaaS MRR Modell", description: "Monatlich wiederkehrende Einnahmen berechnen.", metaDescription: "SaaS MRR Prognose Modell für Startups." },
    fr: { title: "Projections SaaS MRR", description: "Calculer les revenus récurrents (MRR).", metaDescription: "Modélisation de revenus récurrents (MRR) pour SaaS." },
    pt: { title: "Projeções SaaS MRR", description: "Calcular receita recorrente (MRR).", metaDescription: "Simule e projete a receita MRR e Churn de SaaS." }
  },
  "startup-equity": {
    es: { title: "Modelo de Vesting de Startup", description: "Calcula vesting y dilución de opciones.", metaDescription: "Calculadora de dilución y opciones de acciones para startups." },
    de: { title: "Startup-Equity-Modell", description: "Vesting und Optionen berechnen.", metaDescription: "Berechnen Sie Aktienoptionen und Vesting für Startups." },
    fr: { title: "Modèle d'Actions Startup", description: "Calculer l'acquisition d'actions.", metaDescription: "Calculatrice d'options d'achat d'actions pour startups." },
    pt: { title: "Modelo de Vesting Startup", description: "Calcular opções e vesting.", metaDescription: "Calculadora de Opções e Equity para Startups." }
  },
  "mortgage-calculator": {
    es: { title: "Calculadora de Hipotecas", description: "Tabla de amortización y cuotas.", metaDescription: "Calculadora hipotecaria con tabla de amortización." },
    de: { title: "Hypothekenrechner", description: "Tilgungsplan und Raten berechnen.", metaDescription: "Hypothekenrechner mit Tilgungsplan." },
    fr: { title: "Calculatrice Hypothécaire", description: "Amortissement et mensualités.", metaDescription: "Calculatrice de prêt avec tableau d'amortissement." },
    pt: { title: "Calculadora de Hipoteca", description: "Tabela de amortização e parcelas.", metaDescription: "Calcule a hipoteca e as parcelas do empréstimo." }
  },
  "cap-table": {
    es: { title: "Modelo Cap Table", description: "Modelado de dilución de rondas de inversión.", metaDescription: "Construye la Cap Table de tu startup y analiza dilución." },
    de: { title: "Cap Table Modell", description: "Verwässerung bei Investitionsrunden.", metaDescription: "Erstellen Sie die Cap Table für Ihr Startup." },
    fr: { title: "Modèle Cap Table", description: "Modélisation des cycles d'investissement.", metaDescription: "Créez la Table de Capitalisation de votre startup." },
    pt: { title: "Modelo Cap Table", description: "Diluição de rodadas de investimento.", metaDescription: "Modele o Cap Table e simule rodadas de investimento." }
  },
  "saas-ltv": {
    es: { title: "Modelo SaaS LTV", description: "Calcula LTV y coste de adquisición (CAC).", metaDescription: "Calculadora de Lifetime Value (LTV) y retención para SaaS." },
    de: { title: "SaaS LTV Modell", description: "LTV und Akquisitionskosten (CAC) berechnen.", metaDescription: "Berechnen Sie LTV und Kundenbindung für SaaS." },
    fr: { title: "Modèle SaaS LTV", description: "Calculer le LTV et CAC.", metaDescription: "Calculatrice de LTV et Rétention pour SaaS." },
    pt: { title: "Modelo SaaS LTV", description: "Calcular LTV e custo de aquisição (CAC).", metaDescription: "Calculadora de Lifetime Value (LTV) e CAC." }
  },
  "break-even": {
    es: { title: "Calculadora Umbral de Rentabilidad", description: "Calcula el Break-Even point (BEP).", metaDescription: "Calculadora del Punto de Equilibrio o Umbral de Rentabilidad." },
    de: { title: "Break-Even-Rechner", description: "Berechnen Sie den Break-Even Point (BEP).", metaDescription: "Kostenloser Break-Even-Rechner (BEP)." },
    fr: { title: "Calculatrice de Seuil de Rentabilité", description: "Calculer le point mort (Break-Even).", metaDescription: "Calculatrice du seuil de rentabilité (Break-Even Point)." },
    pt: { title: "Calculadora Ponto de Equilíbrio", description: "Calcular o Break-Even point (BEP).", metaDescription: "Calculadora do Ponto de Equilíbrio (Break-Even)." }
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
