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
  howToDesc: string;
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
    fun: "Fun",
    savedTools: "Your Saved Tools",
    spotlightUtilities: "Spotlight Utilities",
    guidesResources: "Guides & Resources",
    privacy: "Privacy",
    terms: "Terms",
    launch: "Launch",
    comingSoon: "Coming",
    toolFilter: "Tool Filter",
    privateBadge: "100% Private • {count} free online tools",
    faqTitle: "Frequently Asked Questions",
    faqSubtitle: "Everything you need to know about ZeroWebTools privacy and usage.",
    howToDesc: "Explore quick-start tutorials, visual multi-tool chaining recipes, and detailed privacy-first competitor comparisons."
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
    fun: "Diversión",
    savedTools: "Tus Herramientas Guardadas",
    spotlightUtilities: "Destacadas",
    guidesResources: "Guías y Recursos",
    privacy: "Privacidad",
    terms: "Términos",
    launch: "Abrir",
    comingSoon: "Próximamente",
    toolFilter: "Filtro",
    privateBadge: "100% Privado • {count} herramientas gratuitas",
    faqTitle: "Preguntas Frecuentes",
    faqSubtitle: "Todo lo que necesita saber sobre la privacidad de ZeroWebTools.",
    howToDesc: "Explore tutoriales de inicio rápido, recetas visuales de encadenamiento de herramientas y comparaciones detalladas de competidores que priorizan la privacidad."
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
    fun: "Spaß",
    savedTools: "Gespeicherte Tools",
    spotlightUtilities: "Im Rampenlicht",
    guidesResources: "Anleitungen",
    privacy: "Datenschutz",
    terms: "Bedingungen",
    launch: "Starten",
    comingSoon: "Demnächst",
    toolFilter: "Filter",
    privateBadge: "100% Privat • {count} kostenlose Tools",
    faqTitle: "Häufig gestellte Fragen",
    faqSubtitle: "Alles, was Sie über die ZeroWebTools wissen müssen.",
    howToDesc: "Entdecken Sie Schnellstart-Anleitungen, visuelle Rezepte zur Tool-Verkettung und detaillierte, datenschutzfreundliche Vergleiche mit Mitbewerbern."
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
    fun: "Amusement",
    savedTools: "Vos Outils Sauvegardés",
    spotlightUtilities: "À La Une",
    guidesResources: "Guides et Ressources",
    privacy: "Confidentialité",
    terms: "Conditions",
    launch: "Lancer",
    comingSoon: "Bientôt",
    toolFilter: "Filtre",
    privateBadge: "100% Privé • {count} outils gratuits",
    faqTitle: "Foire Aux Questions",
    faqSubtitle: "Tout ce que vous devez savoir sur ZeroWebTools.",
    howToDesc: "Explorez des tutoriels de démarrage rapide, des recettes visuelles d'enchaînement d'outils et des comparaisons détaillées de concurrents respectant la vie privée."
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
    fun: "Diversão",
    savedTools: "Ferramentas Salvas",
    spotlightUtilities: "Destaques",
    guidesResources: "Guias e Recursos",
    privacy: "Privacidade",
    terms: "Termos",
    launch: "Abrir",
    comingSoon: "Em Breve",
    toolFilter: "Filtro",
    privateBadge: "100% Privado • {count} ferramentas gratuitas",
    faqTitle: "Perguntas Frequentes",
    faqSubtitle: "Tudo o que você precisa saber sobre o ZeroWebTools.",
    howToDesc: "Explore tutoriais de início rápido, receitas visuais de encadeamento de ferramentas e comparações detalhadas de concorrentes com foco na privacidade."
  },
  ja: {
    homeTitle: "ブラウザで動くシンプルでプライベートなWebツール。",
    homeDesc: "PDFの編集、ファイル変換、画像のリサイズなど、安全で高速な無料ツール。すべてのツールはデバイス上でローカルに実行されるため、ファイルが外部に送信されることはありません。",
    searchPlaceholder: "ツールを検索 (例: PDF 結合)...",
    exploreAllTools: "すべてのツールを探索",
    allTools: "すべてのツール",
    pdfTools: "PDFツール",
    imageTools: "画像ツール",
    developerTools: "開発者ツール",
    generators: "ジェネレーター",
    textTools: "テキストツール",
    calculators: "計算ツール",
    fun: "楽しいツール",
    savedTools: "保存したツール",
    spotlightUtilities: "注目のユーティリティ",
    guidesResources: "ガイドとリソース",
    privacy: "プライバシー",
    terms: "利用規約",
    launch: "起動",
    comingSoon: "近日公開",
    toolFilter: "フィルター",
    privateBadge: "100% プライベート • {count} 個の無料オンラインツール",
    faqTitle: "よくある質問",
    faqSubtitle: "ZeroWebToolsのプライバシーと使用方法に関するすべての情報。",
    howToDesc: "プライバシーを重視したクイックスタートチュートリアル、複数のツールを組み合わせたビジュアルレシピ、競合他社との詳細な比較をご覧ください。"
  },
  zh: {
    homeTitle: "在浏览器中运行的简单、隐私网页工具。",
    homeDesc: "免费、快速且完全安全的工具，用于编辑 PDF、转换格式和调整图片大小。所有工具均在您的设备上本地运行，文件绝不会离开您的电脑。",
    searchPlaceholder: "搜索工具 (例如：合并 PDF)...",
    exploreAllTools: "探索所有工具",
    allTools: "所有工具",
    pdfTools: "PDF 工具",
    imageTools: "图片工具",
    developerTools: "开发者工具",
    generators: "生成器",
    textTools: "文本工具",
    calculators: "计算器",
    fun: "趣味工具",
    savedTools: "已保存的工具",
    spotlightUtilities: "精选工具",
    guidesResources: "指南与资源",
    privacy: "隐私政策",
    terms: "服务条款",
    launch: "启动",
    comingSoon: "即将推出",
    toolFilter: "筛选器",
    privateBadge: "100% 本地隐私 • {count} 个免费在线工具",
    faqTitle: "常见问题",
    faqSubtitle: "您需要了解的关于 ZeroWebTools 隐私和使用的所有信息。",
    howToDesc: "探索快速入门教程、可视化多工具链配方以及详细的隐私第一竞争对手比较。"
  },
  hi: {
    homeTitle: "आपके ब्राउज़र में सरल और निजी वेब टूल्स।",
    homeDesc: "PDF संपादित करने, फ़ॉर्मेट बदलने और छवियों का आकार बदलने के लिए मुफ़्त, तेज़ और पूरी तरह से सुरक्षित उपकरण। सभी उपकरण आपके डिवाइस पर स्थानीय रूप से चलते हैं।",
    searchPlaceholder: "टूल खोजें (जैसे: PDF जोड़ें)...",
    exploreAllTools: "सभी टूल्स देखें",
    allTools: "सभी टूल्स",
    pdfTools: "PDF टूल्स",
    imageTools: "इमेज टूल्स",
    developerTools: "डेवलपर टूल्स",
    generators: "जेनरेटर्स",
    textTools: "टेक्स्ट टूल्स",
    calculators: "कैलकुलेटर",
    fun: "मनोरंजन",
    savedTools: "आपके सहेजे गए टूल्स",
    spotlightUtilities: "स्पॉटलाइट यूटिलिटीज",
    guidesResources: "गाइड और संसाधन",
    privacy: "गोपनीयता",
    terms: "नियम व शर्तें",
    launch: "शुरू करें",
    comingSoon: "जल्د आ रहा है",
    toolFilter: "फिल्टर",
    privateBadge: "100% निजी • {count} मुफ़्त ऑनलाइन टूल्स",
    faqTitle: "अक्सर पूछे जाने वाले प्रश्न",
    faqSubtitle: "ZeroWebTools गोपनीयता और उपयोग के बारे में वह सब कुछ जो आपको जानना आवश्यक है।",
    howToDesc: "त्वरित-प्रारंभ ट्यूटोरियल, विज़ुअल मल्टी-टूल चेनिंग रेसिपी और विस्तृत गोपनीयता-प्रथम प्रतियोगी तुलनाओं का अन्वेषण करें।"
  },
  it: {
    homeTitle: "Strumenti web semplici e privati nel tuo browser.",
    homeDesc: "Strumenti gratuiti, veloci e sicuri per modificare PDF, convertire formati e ridimensionare immagini. Tutto funziona localmente senza caricare file.",
    searchPlaceholder: "Cerca uno strumento (es. unisci pdf)...",
    exploreAllTools: "Esplora tutti gli strumenti",
    allTools: "Tutti gli strumenti",
    pdfTools: "Strumenti PDF",
    imageTools: "Immagini",
    developerTools: "Sviluppatori",
    generators: "Generatori",
    textTools: "Testo",
    calculators: "Calcolatori",
    fun: "Divertimento",
    savedTools: "Strumenti Salvati",
    spotlightUtilities: "In evidenza",
    guidesResources: "Guide & Risorse",
    privacy: "Privacy",
    terms: "Termini",
    launch: "Avvia",
    comingSoon: "Prossimamente",
    toolFilter: "Filtra",
    privateBadge: "100% Privato • {count} strumenti online gratuiti",
    faqTitle: "Domande Frequenti",
    faqSubtitle: "Tutto quello che c'è da sapere sulla privacy e l'uso di ZeroWebTools.",
    howToDesc: "Esplora tutorial rapidi, ricette visive per concatenare più strumenti e confronti dettagliati dei concorrenti orientati alla privacy."
  },
  ar: {
    homeTitle: "أدوات ويب بسيطة وخاصة في متصفحك مباشرة.",
    homeDesc: "أدوات مجانية وسريعة وآمنة تماماً لتعديل ملفات PDF وتحويل التنسيقات وتغيير حجم الصور. تعمل جميع الأدوات محلياً بالكامل على جهازك دون رفع أي ملفات.",
    searchPlaceholder: "ابحث عن أداة (مثال: دمج PDF)...",
    exploreAllTools: "استكشف جميع الأدوات",
    allTools: "جميع الأدوات",
    pdfTools: "أدوات PDF",
    imageTools: "أدوات الصور",
    developerTools: "أدوات المطورين",
    generators: "المولدات",
    textTools: "أدوات النصوص",
    calculators: "الحاسبات",
    fun: "مرح",
    savedTools: "أدواتك المحفوظة",
    spotlightUtilities: "أدوات مميزة",
    guidesResources: "الأدلة والمصادر",
    privacy: "الخصوصية",
    terms: "الشروط",
    launch: "تشغيل",
    comingSoon: "قريباً",
    toolFilter: "تصفية",
    privateBadge: "خصوصية 100% • {count} أداة مجانية عبر الإنترنت",
    faqTitle: "الأسئلة الشائعة",
    faqSubtitle: "كل ما تحتاج لمعرفته حول خصوصية واستخدام ZeroWebTools.",
    howToDesc: "استكشف البرامج التعليمية لبدء التشغيل السريع، ووصفات تسلسل الأدوات المتعددة المرئية، والمقارنات التفصيلية للمنافسين التي تعطي الأولوية للخصوصية."
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

export function getAlternateLanguages(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  const baseUrl = "https://zerowebtools.com";
  languages["en"] = `${baseUrl}${path}`;
  languages["x-default"] = `${baseUrl}${path}`;
  
  LOCALES.filter(l => l !== "en").forEach(lang => {
    languages[lang] = `${baseUrl}/${lang}${path}`;
  });
  
  return languages;
}

